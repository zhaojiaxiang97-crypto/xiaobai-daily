#!/usr/bin/env node
// 实验脚本：把某个组件的 setup 顶层语句「全量」还原进 <script setup>（含拉数据/副作用逻辑）。
//
// 实测结论（2026-11，真 Electron 外壳 + 真 preload，App 组件）：
//   - 70/70 条顶层语句都能找到符号来源（shared 导入 34 个），脚本语法可过
//   - 但首屏反而退化：#app 从 8246B 掉到 1809B（只剩 loading）
//     原因：useI18n()/store hook 在真外壳里也会抛（i18n 实例没装上），
//     异常打断 setup；`at` 这类模板辅助函数的语义在 shared 里被同名符号覆盖。
//   - 目前只有「安全子集」（见 gen-main.cjs 的 restoreSafeSetup）是正收益。
//
// 保留原因：符号可解析性检查（declaredNames/resolvable/迭代剔除）是可复用的，
// 将来补上 hook 兜底与辅助函数映射后可以再试。
//
// 用法: node restore-full-setup.cjs <组件名> <目标 .vue> <shared.js>
// 目的：让拉数据的初始化逻辑真的执行 —— 真外壳里 IPC 是真的，只要跑起来就能拿到真数据
const fs = require('fs');
const P = require('/tmp/w509/nm/node_modules/@babel/parser');
const T = require('/tmp/w509/nm/node_modules/@babel/traverse').default;
const t = require('/tmp/w509/nm/node_modules/@babel/types');
const G = require('/tmp/w509/nm/node_modules/@babel/generator').default;

const mainFile = '/tmp/w509/ex/src/renderer/chunks/main.js';
const compName = process.argv[2] || 'App';
const vueFile = process.argv[3];
const sharedFile = process.argv[4];

const src = fs.readFileSync(mainFile, 'utf8');
const ast = P.parse(src, { sourceType: 'unambiguous' });

let range = null;
T(ast, {
  CallExpression(p) {
    const arg = p.node.arguments[0];
    if (!t.isObjectExpression(arg)) return;
    let name = null;
    for (const pr of arg.properties) {
      if (t.isObjectProperty(pr) && t.isIdentifier(pr.key, { name: '__name' })) {
        const v = pr.value;
        if (t.isStringLiteral(v)) name = v.value;
        else if (t.isTemplateLiteral(v) && !v.expressions.length) name = v.quasis[0].value.cooked;
      }
    }
    if (name === compName) range = [p.node.start, p.node.end];
  },
});
if (!range) { console.log('未找到组件'); process.exit(1); }

const compAst = P.parse('(' + src.slice(range[0], range[1]) + ')', { sourceType: 'script' });
let setupBody = null;
T(compAst, { ObjectMethod(p) { if (t.isIdentifier(p.node.key, { name: 'setup' })) setupBody = p.node.body; } });
if (!setupBody) { console.log('无 setup'); process.exit(1); }

// shared 导出名
const sharedSrc = fs.readFileSync(sharedFile, 'utf8');
const exported = new Set();
for (const m of sharedSrc.matchAll(/^export \{ [\w$]+ as ([\w$]+) \};/gm)) exported.add(m[1]);

const VUE_APIS = new Set(['ref','shallowRef','reactive','computed','toRef','toRefs','readonly','markRaw',
  'customRef','watch','watchEffect','onMounted','onUnmounted','onBeforeMount','onActivated','onDeactivated',
  'nextTick','inject','provide','unref','triggerRef','h','defineComponent','useSlots','useAttrs','toRaw',
  'isRef','shallowReactive','createElementVNode','withCtx','renderList','toDisplayString','normalizeClass',
  'withDirectives','openBlock','createElementBlock','createBlock','createTextVNode','createCommentVNode','Fragment']);
const GLOBALS = new Set(['window','document','console','localStorage','sessionStorage','setTimeout',
  'clearTimeout','setInterval','clearInterval','fetch','URL','URLSearchParams','crypto','navigator','location',
  'performance','requestAnimationFrame','cancelAnimationFrame','structuredClone','Math','JSON','Object','Array',
  'Promise','Intl','Date','Error','TypeError','Number','String','Boolean','RegExp','parseInt','parseFloat',
  'undefined','NaN','Infinity','Symbol','Map','Set','WeakMap','WeakSet','Proxy','Reflect','isNaN','isFinite',
  'encodeURIComponent','decodeURIComponent','TextEncoder','TextDecoder','Blob','File','FileReader','FormData',
  'AbortController','Image','Audio','MutationObserver','IntersectionObserver','ResizeObserver','queueMicrotask',
  'globalThis','arguments','Element','Node','HTMLElement','Uint8Array','ArrayBuffer','btoa','atob']);

// 顶层语句（VariableDeclaration / ExpressionStatement / FunctionDeclaration）
const stmts = [];
for (const st of setupBody.body) {
  if (t.isVariableDeclaration(st) || t.isExpressionStatement(st)) stmts.push(st);
  else if (t.isFunctionDeclaration(st) && st.id) stmts.push(st);
}

function declaredNames(st) {
  if (t.isFunctionDeclaration(st)) return st.id ? [st.id.name] : [];
  if (!t.isVariableDeclaration(st)) return [];
  const acc = [];
  for (const d of st.declarations) {
    if (t.isIdentifier(d.id)) acc.push(d.id.name);
    else if (t.isObjectPattern(d.id)) for (const pr of d.id.properties) {
      if (t.isObjectProperty(pr) && t.isIdentifier(pr.value)) acc.push(pr.value.name);
      else if (t.isRestElement(pr) && t.isIdentifier(pr.argument)) acc.push(pr.argument.name);
    }
  }
  return acc;
}
function freeRefs(st, localNames) {
  const refs = new Set();
  T(t.file(t.program([t.cloneNode(st, true, true)])), {
    Identifier(ip) {
      if (!ip.isReferencedIdentifier()) return;
      const nm = ip.node.name;
      if (ip.scope.hasBinding(nm)) return;
      if (localNames.has(nm)) { refs.add(nm); return; }
      refs.add(nm);
    },
  });
  return refs;
}

// 迭代剔除：语句引用了「无法解析」的符号就丢掉
let keep = stmts.slice();
const nameOwner = new Map();
for (const st of stmts) for (const n of declaredNames(st)) if (!nameOwner.has(n)) nameOwner.set(n, st);

const resolvable = nm => {
  if (GLOBALS.has(nm)) return true;
  if (VUE_APIS.has(nm)) return true;
  if (exported.has('S_' + nm)) return true;
  if (exported.has(nm)) return true;
  return false;
};

let changed = true;
const dropped = [];
while (changed) {
  changed = false;
  const keptDecls = new Set();
  for (const st of keep) for (const n of declaredNames(st)) keptDecls.add(n);
  for (const st of [...keep]) {
    const refs = freeRefs(st, new Set());
    for (const nm of refs) {
      if (keptDecls.has(nm)) continue;
      if (resolvable(nm)) continue;
      keep = keep.filter(x => x !== st);
      dropped.push(nm);
      changed = true;
      break;
    }
  }
  // 依赖被丢掉的声明也要一起丢
  for (;;) {
    const keptDecls2 = new Set();
    for (const st of keep) for (const n of declaredNames(st)) keptDecls2.add(n);
    const bad = keep.filter(st => {
      const refs = freeRefs(st, new Set());
      for (const nm of refs) if (!keptDecls2.has(nm) && !resolvable(nm)) return true;
      return false;
    });
    if (!bad.length) break;
    keep = keep.filter(st => !bad.includes(st));
    changed = true;
  }
}

// 生成代码
const parts = [];
const vueApis = new Set();
const sharedSpecs = new Set();
const refLike = [];
// 先算出本次还原会本地声明的全部名字：这些不能再从 shared 导入（否则重复声明）
const declaredNamesAll = new Set();
for (const st of keep) for (const n of declaredNames(st)) declaredNamesAll.add(n);
// hook 调用兜底：顶层直接调用导入函数（it()/Li()/am()/Ie() 等）时包一层
// 否则 useI18n() 在没有 i18n 实例时抛 NOT_INSTALLED，异常直接打断整个 setup
function guardTopCalls(st) {
  const clone = t.cloneNode(st, true, true);
  T(t.file(t.program([clone])), {
    CallExpression(p2) {
      if (p2.parentPath.isCallExpression() && p2.parentPath.node.callee === p2.node) return;
      if (!p2.parentPath.isVariableDeclarator() && !p2.parentPath.isExpressionStatement()
          && !p2.parentPath.isAssignmentPattern()) return;
      if (!t.isIdentifier(p2.node.callee)) return;
      if (!p2.node.arguments.length) return;
      if (p2.node.__guarded) return;
      const callee = p2.node.callee;
      if (!exported.has('S_' + callee.name) && !exported.has(callee.name)) return;
      p2.replaceWith(t.callExpression(t.identifier('__safe'), [t.cloneNode(p2.node, true, true)]));
    },
  });
  return clone;
}

for (const st of keep) {
  const st2 = (t.isVariableDeclaration(st) || t.isExpressionStatement(st)) ? guardTopCalls(st) : st;
  parts.push(G(st2, { compact: false, comments: false, jsescOption: { minimal: true } }).code);
  if (t.isVariableDeclaration(st)) {
    for (const d of st.declarations) {
      if (t.isIdentifier(d.id) && d.init && t.isCallExpression(d.init) && t.isIdentifier(d.init.callee)
          && ['ref','shallowRef','computed','customRef','toRef'].includes(d.init.callee.name)) {
        refLike.push(d.id.name);
      }
    }
  }
  const refs = freeRefs(st, new Set());
  for (const nm of refs) {
    if (declaredNamesAll.has(nm)) continue;   // 本地已有声明
    if (VUE_APIS.has(nm)) vueApis.add(nm);
    else if (exported.has('S_' + nm)) sharedSpecs.add(`S_${nm} as ${nm}`);
    else if (exported.has(nm)) sharedSpecs.add(nm);
  }
}
const code = parts.join('\n');

// 改 App.vue：把 [setup 还原] 块换成全量版，模板里对这些 ref 去掉 .value
let vueSrc = fs.readFileSync(vueFile, 'utf8');
const tplM = /^<template>\n?([\s\S]*?)\n?<\/template>/.exec(vueSrc);
let tpl = tplM[1];
for (const nm of refLike) {
  const esc = nm.replace(/\$/g, '\\$');
  tpl = tpl.replace(new RegExp('(?<![A-Za-z0-9_$.])' + esc + '\\.value(?![A-Za-z0-9_$])', 'g'), nm);
}
const scriptM = /<script setup>([\s\S]*?)<\/script>/.exec(vueSrc);
const script = scriptM[1];
const declared = new Set();
for (const st of keep) for (const n of declaredNames(st)) declared.add(n);

// 组件 import 原样保留
const compImports = [...script.matchAll(/^import [\w$]+ from '\.\/[\w$]+\.vue';$/gm)].map(m => m[0]);

// 模板真正需要的 shared 符号 = 旧 shared import 里「没被本次还原接管」的那些
const oldSharedBody = (script.match(/import \{([\s\S]*?)\} from '\.\.\/shared\.js';/) || [, ''])[1];
const oldSpecs = oldSharedBody.split(',').map(x => x.trim()).filter(Boolean);
const nameOfSpec = sp => { const m = /as ([\w$]+)$/.exec(sp); return m ? m[1] : sp; };
const keptShared = oldSpecs.filter(sp => !declared.has(nameOfSpec(sp)));

const sharedAll = [...new Set([...sharedSpecs, ...keptShared])];
const vueAll = [...new Set([...vueApis, 'ref', 'computed'].filter(a => !declared.has(a) || true))];

const vueImport = `import { ${vueAll.join(', ')} } from 'vue';\n`;
const sharedImport = sharedAll.length ? `import { ${sharedAll.join(', ')} } from '../shared.js';\n` : '';

const safeHelper = "const __safe = (fn) => { try { return fn() ?? {}; } catch (e) { return {}; } };\n";
let newScript = `${vueImport}${compImports.join('\n')}\n${sharedImport}\n// [setup 还原-全量] ${keep.length}/${stmts.length} 条顶层语句\n${safeHelper}${code}\n`;

const styleM = /(<style>[\s\S]*<\/style>)/.exec(vueSrc);
if (!fs.existsSync(vueFile + '.bak2')) fs.writeFileSync(vueFile + '.bak2', vueSrc);
fs.writeFileSync(vueFile, `<template>\n${tpl}\n</template>\n\n<script setup>\n${newScript}</script>\n${styleM ? styleM[1] : ''}`);

console.log(`${compName}: 顶层语句 ${stmts.length} → 保留 ${keep.length}（丢弃 ${dropped.length} 处引用）`);
console.log(`  新增 Vue API: ${[...vueApis].join(',') || '-'}`);
console.log(`  新增 shared: ${[...sharedSpecs].slice(0,8).join(',') || '-'} (${sharedSpecs.size})`);
console.log(`  ref 型绑定 ${refLike.length}: ${refLike.slice(0,12).join(',')}`);
console.log(`  代码 ${code.length} 字节`);
