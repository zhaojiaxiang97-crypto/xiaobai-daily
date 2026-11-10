#!/usr/bin/env node
// main bundle → Vue 工程（统一符号映射表版）
//
// 核心：一次算完「符号 → 导出名」映射表，在四个环节共用：
//   1) shared.js 的 cross-chunk import 别名
//   2) body 里对 cross-chunk 符号的引用
//   3) shared.js 的 export 列表
//   4) 组件的 import 语句
//
// 命名规则：shared.js 对外导出一律 `S_<原名>`，组件用 `import { S_x as x }` 还原。
// 这样本地声明与 import 别名即便同名也不会打架（它们在 shared.js 内部各自独立，
// 对外都从 S_ 前缀出去）。
const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');
const P = require('@babel/parser');
const T = require('@babel/traverse').default;
const t = require('@babel/types');
const G = require('@babel/generator').default;

const [,, mainFile, convPath, outDir] = process.argv;
const src = fs.readFileSync(mainFile, 'utf8');
const ast = P.parse(src, { sourceType: 'unambiguous' });

const VUE_API_MAP = {
  '$n':'normalizeClass','An':'unref','Ct':'renderSlot','O':'createTextVNode','S':'createElementBlock',
  'St':'renderList','Wt':'watch','b':'createBlock','c':'Fragment','gt':'openBlock','j':'defineComponent',
  'mt':'onUnmounted','ot':'onMounted','rr':'toDisplayString','ut':'onBeforeMount','v':'computed',
  'x':'createCommentVNode','y':'createElementVNode','H':'createElementVNode','D':'createStaticVNode',
  'A':'defineAsyncComponent','Bn':'isArray',
};
const SEM = new Set(['openBlock','createElementBlock','createElementVNode','createBlock','createVNode',
  'createTextVNode','createCommentVNode','createStaticVNode','renderSlot','renderList','normalizeClass',
  'toDisplayString','unref','withCtx','withDirectives','defineComponent','resolveComponent','Fragment',
  'computed','watch','onMounted','onUnmounted','onBeforeMount','isArray','defineAsyncComponent','ref',
  'reactive','nextTick','inject','provide','h','toRef','toRefs','shallowRef','triggerRef']);

// ---------- 1) 组件区间 ----------
const ranges = [];
T(ast, {
  CallExpression(p) {
    const c = p.node.callee;
    const nm = t.isIdentifier(c) ? c.name : null;
    if (!nm) return;
    const sem = VUE_API_MAP[nm] || (SEM.has(nm) ? nm : null);
    if (sem !== 'defineComponent') return;
    const arg = p.node.arguments[0];
    if (!arg || !t.isObjectExpression(arg)) return;
    if (arg.properties.some(pr => t.isObjectProperty(pr) &&
        ((t.isIdentifier(pr.key) && pr.key.name === '__name') ||
         (t.isStringLiteral(pr.key) && pr.key.value === '__name')))) {
      ranges.push([p.node.start, p.node.end]);
    }
  },
});
const inComp = (s, e) => ranges.some(([a, b]) => s < b && e > a);

// ---------- 2) import 表 ----------
const importMap = {};   // local -> { imported, from }
T(ast, {
  ImportDeclaration(p) {
    const from = p.node.source.value;
    for (const sp of p.node.specifiers) {
      if (t.isImportSpecifier(sp) && t.isIdentifier(sp.local) && t.isIdentifier(sp.imported)) {
        importMap[sp.local.name] = { imported: sp.imported.name, from };
      } else if (t.isImportDefaultSpecifier(sp) && t.isIdentifier(sp.local)) {
        importMap[sp.local.name] = { imported: 'default', from };
      }
    }
  },
});

// ---------- 3) 按 declarator 收集顶层声明 ----------
const keptVarDecls = [];       // { kind, declarators: [node] }
const keptFuncs = [];          // code
const keptExprs = [];          // code
const localNames = new Set();  // shared.js 内的真实声明名（可 export）
const assignedNames = new Set();  // 顶层赋值目标（不 export，仅作存在性参考）
let droppedCompDecls = 0;
const compVarNames = new Set();   // 被排除的组件变量名（如 vX）

T(ast, {
  VariableDeclaration(p) {
    if (!p.parentPath.isProgram()) return;
    const notComp = p.node.declarations.filter(d => !inComp(d.start, d.end));
    const comps = p.node.declarations.filter(d => inComp(d.start, d.end));
    droppedCompDecls += comps.length;
    for (const d of comps) if (t.isIdentifier(d.id)) compVarNames.add(d.id.name);
    // 引用已排除组件变量的 declarator（如 var OZ = DZ）也要排除
    const normal = [];
    for (const d of notComp) {
      let touches = false;
      if (d.init) {
        T(t.file(t.program([t.expressionStatement(t.cloneNode(d.init, true, true))])), {
          Identifier(ip) { if (ip.isReferencedIdentifier() && compVarNames.has(ip.node.name)) touches = true; },
        });
      }
      if (touches) { droppedCompDecls++; continue; }
      normal.push(d);
    }
    if (!normal.length) return;
    keptVarDecls.push({ kind: p.node.kind, declarators: normal, start: p.node.start });
    for (const d of normal) if (t.isIdentifier(d.id)) localNames.add(d.id.name);
  },
  FunctionDeclaration(p) {
    if (!p.parentPath.isProgram() || !p.node.id) return;
    if (inComp(p.node.start, p.node.end)) { droppedCompDecls++; return; }
    keptFuncs.push({ code: src.slice(p.node.start, p.node.end), start: p.node.start });
    localNames.add(p.node.id.name);
  },
  ExpressionStatement(p) {
    if (!p.parentPath.isProgram()) return;
    if (inComp(p.node.start, p.node.end)) { droppedCompDecls++; return; }
    // 该语句是否引用了已排除的组件变量（如 vX.install = e => ...）
    let touchesComp = false;
    T(t.file(t.program([t.cloneNode(p.node, true, true)])), {
      Identifier(ip) { if (ip.isReferencedIdentifier() && compVarNames.has(ip.node.name)) touchesComp = true; },
    });
    if (touchesComp) { droppedCompDecls++; return; }
    keptExprs.push({ code: src.slice(p.node.start, p.node.end), start: p.node.start });
    // 顶层赋值的目标名（如 yG ||= {}）单独记录：它们不是声明，不能进 export 列表
    T(t.file(t.program([t.cloneNode(p.node, true, true)])), {
      AssignmentExpression(ap) {
        if (t.isIdentifier(ap.node.left)) assignedNames.add(ap.node.left.name);
      },
    });
  },
});

// ---------- 4) 统一符号映射表 ----------
// 对外导出名：本地声明 S_<n>；cross-chunk S_<n>
// shared.js 内部 cross-chunk 别名：src_<n>
const crossList = [];   // { local, imported, from, innerName, exportName }
for (const [local, info] of Object.entries(importMap)) {
  const isRT = /vue-i18n\.runtime/.test(info.from || '');
  if (SEM.has(local)) continue;                                  // 已是 Vue 语义名 → 走 __vue
  if (isRT && (VUE_API_MAP[info.imported] || SEM.has(info.imported))) continue;
  let rel = info.from || '';
  if (rel.startsWith('../')) rel = './vendor/' + rel.slice(3);
  else if (rel.startsWith('./')) rel = './vendor/chunks/' + rel.slice(2);
  else rel = './vendor/' + rel;
  crossList.push({
    local, imported: info.imported, from: rel,
    innerName: 'src_' + local,
    exportName: 'S_' + local,
  });
}
const crossByLocal = new Map(crossList.map(c => [c.local, c]));
const exportTable = new Map();   // 原名 -> 导出名
for (const n of localNames) exportTable.set(n, 'S_' + n);
for (const c of crossList) if (!exportTable.has(c.local)) exportTable.set(c.local, c.exportName);

// ---------- 5) 组装 shared.js 的 body（AST 级改写） ----------
function buildBody() {
  // 关键：按源码原始位置排序拼接。分组拼接会破坏初始化顺序
  // （如 IIFE 枚举初始化被排到使用它的 var 之后 → EntityStart undefined）
  const items = [];
  for (const fd of keptVarDecls) {
    items.push({
      start: fd.start,
      code: G(t.variableDeclaration(fd.kind, fd.declarators.map(d => t.cloneNode(d, true, true))),
        { compact: false, comments: true, jsescOption: { minimal: true } }).code,
    });
  }
  for (const f of keptFuncs) items.push(f);
  for (const e of keptExprs) items.push(e);
  items.sort((a, b) => a.start - b.start);
  let body = items.map(i => i.code).join('\n\n');

  const baseIndex = {};
  (function walk(d, rel) {
    for (const e of fs.readdirSync(d, { withFileTypes: true })) {
      const p2 = path.join(d, e.name), r2 = rel ? rel + '/' + e.name : e.name;
      if (e.isDirectory()) walk(p2, r2);
      else baseIndex[e.name] = './vendor/' + r2;
    }
  })(path.dirname(path.dirname(mainFile)), '');

  const ast2 = P.parse(body, { sourceType: 'module' });

  // 5a) Vue API 引用 → __vue.xxx
  // 关键：不能只看名字是否在 SEM 里，必须看「该名字的绑定是否来自 vue-i18n.runtime」，
  // 因为同一个 API 可能有多个别名（如 H as createElementVNode 与 H as Ue 并存）。
  let vueRewrites = 0;
  T(ast2, {
    Identifier(ip) {
      if (!ip.isReferencedIdentifier()) return;
      const nm = ip.node.name;
      if (nm === '__vue') return;
      if (localNames.has(nm)) return;                 // 本地有声明 → 不动
      // body 里没有 import 语句，因此不能靠 scope 绑定判断；查原始 importMap
      if (ip.scope.hasBinding(nm)) return;            // body 内被局部遮蔽 → 不动
      const info = importMap[nm];
      if (!info) return;                              // 不是 import 来的（全局等）→ 不动
      if (!/vue-i18n\.runtime/.test(info.from || '')) return;
      // 语义名优先级：映射表 → imported 本身是语义名 → local 本身是语义名
      // （如 import { bn as ref }：bn 不可知，但 local 就是 Vue 的 ref）
      const semantic = VUE_API_MAP[info.imported]
        || (SEM.has(info.imported) ? info.imported : null)
        || (SEM.has(nm) ? nm : null);
      if (!semantic) return;                          // 运行时内部工具 → 走 cross chunk
      const par = ip.parentPath;
      if ((par.isMemberExpression() || par.isOptionalMemberExpression()) &&
          par.node.property === ip.node && !par.node.computed) return;
      if (par.isObjectProperty() && par.node.key === ip.node && !par.node.computed) return;
      if (par.isVariableDeclarator() && par.node.id === ip.node) return;
      ip.replaceWith(t.memberExpression(t.identifier('__vue'), t.identifier(semantic)));
      vueRewrites++;
    },
  });
  if (vueRewrites) body = G(ast2, { compact: false, comments: true, jsescOption: { minimal: true } }).code;

  // 5b) cross-chunk 引用 → src_xxx（仅当本地没有同名声明）
  const ast3 = P.parse(body, { sourceType: 'module' });
  let crossRewrites = 0;
  T(ast3, {
    Identifier(ip) {
      if (!ip.isReferencedIdentifier()) return;
      const nm = ip.node.name;
      const c = crossByLocal.get(nm);
      if (!c) return;
      if (localNames.has(nm)) return;      // 本地同名声明优先，不动
      const b = ip.scope.getBinding(nm);
      if (b && !b.path.isImportSpecifier() && !b.path.isImportDefaultSpecifier()) return;
      const par = ip.parentPath;
      if (par.isVariableDeclarator() && par.node.id === ip.node) return;
      if (par.isObjectProperty() && par.node.key === ip.node && !par.node.computed) return;
      if ((par.isMemberExpression() || par.isOptionalMemberExpression()) &&
          par.node.property === ip.node && !par.node.computed) return;
      ip.replaceWith(t.identifier(c.innerName));
      crossRewrites++;
    },
  });
  if (crossRewrites) body = G(ast3, { compact: false, comments: true, jsescOption: { minimal: true } }).code;

  // 5c) 路径重写（AST 级，只动字符串字面量）
  const ast4 = P.parse(body, { sourceType: 'module' });
  let pathFix = 0, pathDead = 0;
  const fix = val => {
    if (typeof val !== 'string') return null;
    if (!/^\.\.?\/[^"'`]+\.(js|css|webp|png|jpg|ico|ogg)$/.test(val)) return null;
    const base = val.split('/').pop();
    const hit = baseIndex[base];
    if (hit) { pathFix++; return hit; }
    pathDead++; return './vendor/_removed.js';
  };
  T(ast4, {
    StringLiteral(p) { const nv = fix(p.node.value); if (nv !== null) p.node.value = nv; },
    TemplateLiteral(p) {
      if (p.node.expressions.length) return;
      const q = p.node.quasis[0];
      const nv = fix(q.value.cooked);
      if (nv !== null) { q.value.cooked = nv; q.value.raw = nv; }
    },
  });
  if (pathFix || pathDead) body = G(ast4, { compact: false, comments: true, jsescOption: { minimal: true } }).code;

  return { body, vueRewrites, crossRewrites, pathFix, pathDead };
}

const { body, vueRewrites, crossRewrites, pathFix, pathDead } = buildBody();

const crossImports = crossList.map(c => {
  const spec = c.imported === 'default' ? `default as ${c.innerName}`
    : (c.imported === c.innerName ? c.innerName : `${c.imported} as ${c.innerName}`);
  return `import { ${spec} } from '${c.from}';`;
});

// 导出：本地声明导 n as S_n；跨 chunk（且本地无同名）导 src_n as S_n
const exportLines = [];
for (const n of localNames) exportLines.push(`export { ${n} as S_${n} };`);
for (const c of crossList) {
  if (localNames.has(c.local)) continue;      // 本地声明优先，跨 chunk 不再导出
  exportLines.push(`export { ${c.innerName} as ${c.exportName} };`);
}

fs.mkdirSync(outDir + '/src/components', { recursive: true });
fs.mkdirSync(outDir + '/src/vendor', { recursive: true });

const sharedCode = `// 自动生成：main bundle 共享符号（统一映射表版）
// 本地声明 ${localNames.size} 个 / 跨 chunk ${crossList.length} 个
import * as __vue from 'vue';
${crossImports.join('\n')}

${body}

${[...new Set(exportLines)].join('\n')}
`;
fs.writeFileSync(outDir + '/src/shared.js', sharedCode);
fs.writeFileSync(outDir + '/src/vendor/_removed.js', 'export default {};\n');
console.error(`shared.js ${(sharedCode.length / 1024 / 1024).toFixed(1)}MB | 本地 ${localNames.size} | 跨chunk ${crossList.length} | Vue改写 ${vueRewrites} | cross改写 ${crossRewrites} | 路径 ${pathFix}+${pathDead}死`);

// ---------- 6) 组件 ----------
const comps = [];
T(ast, {
  CallExpression(p) {
    if (!ranges.some(([a, b]) => p.node.start >= a && p.node.end <= b)) return;
    const c = p.node.callee;
    const nm = t.isIdentifier(c) ? c.name : null;
    if (!nm) return;
    const sem = VUE_API_MAP[nm] || (SEM.has(nm) ? nm : null);
    if (sem !== 'defineComponent') return;
    const arg = p.node.arguments[0];
    if (!arg || !t.isObjectExpression(arg)) return;
    let name = null;
    for (const pr of arg.properties) {
      if (t.isObjectProperty(pr) && t.isIdentifier(pr.key, { name: '__name' })) {
        const v = pr.value;
        name = t.isStringLiteral(v) ? v.value
          : (t.isTemplateLiteral(v) && v.expressions.length === 0 ? v.quasis[0].value.cooked : null);
      }
    }
    if (name) comps.push({ name, start: arg.start, end: arg.end });
  },
});

let made = 0;
const seen = new Set();
for (const c of comps) {
  if (seen.has(c.name)) continue;
  seen.add(c.name);
  const tmp = '/tmp/_g_' + c.name.replace(/[^\w]/g, '_') + '.js';
  fs.writeFileSync(tmp, 'var __c = ' + src.slice(c.start, c.end) + ';\nexport default {};\n');
  let tpl = '';
  try { tpl = execFileSync('node', [convPath, tmp], { encoding: 'utf8' }).trim(); } catch (e) {}
  if (!tpl) continue;

  // 组件需要的外部符号：模板里出现的、属于 shared.js 的
  const need = [];
  for (const [orig, exp] of exportTable) {
    if (localNames.has(orig) && !crossByLocal.has(orig)) {
      // 本地声明：仅当模板引用且无更近绑定
      if (new RegExp('(?<![\\w$])' + orig.replace(/[$]/g, '\\$') + '(?![\\w$])').test(tpl)) need.push({ exp, alias: orig });
    } else {
      if (new RegExp('(?<![\\w$])' + orig.replace(/[$]/g, '\\$') + '(?![\\w$])').test(tpl)) need.push({ exp, alias: orig });
    }
  }
  const vueDeps = [...SEM].filter(a => new RegExp('(?<![\\w$])' + a + '\\s*\\(').test(tpl));
  let script = '';
  if (vueDeps.length) script += `import { ${[...new Set(vueDeps)].join(', ')} } from 'vue';\n`;
  if (need.length) {
    const specs = need.map(n => n.exp === n.alias ? n.exp : `${n.exp} as ${n.alias}`);
    script += `import { ${specs.join(', ')} } from '../shared.js';\n`;
  }
  fs.writeFileSync(`${outDir}/src/components/${c.name}.vue`,
    `<template>\n${tpl}\n</template>\n\n<script setup>\n${script}</script>\n`);
  made++;
}
console.error(`组件 ${made}`);
