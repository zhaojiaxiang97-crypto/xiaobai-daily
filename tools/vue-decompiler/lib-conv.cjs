#!/usr/bin/env node
// 独立 chunk → 可运行 .vue：复用 convert-component 的模板转换，补齐真实 import
const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');
const P = require('@babel/parser');
const T = require('@babel/traverse').default;
const t = require('@babel/types');

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

const [,, file, outDir, convPath, mapPath] = process.argv;
// 组件映射表： "相对路径::导出名" -> 组件名（用于跨 chunk import 重定向到 .vue）
let COMP_MAP = {};
if (mapPath) { try { COMP_MAP = JSON.parse(fs.readFileSync(mapPath, 'utf8')); } catch {} }
// 源文件所在目录（ui/blocks/pages/chunks），用于拼 vendor 内路径
const srcDirName = path.basename(path.dirname(file));
const src = fs.readFileSync(file, 'utf8');
const ast = P.parse(src, { sourceType: 'module' });

const imports = {};
T(ast, {
  ImportDeclaration(p) {
    const from = p.node.source.value;
    for (const sp of p.node.specifiers) {
      if (t.isImportSpecifier(sp) && t.isIdentifier(sp.local) && t.isIdentifier(sp.imported)) {
        imports[sp.local.name] = { imported: sp.imported.name, from };
      } else if (t.isImportDefaultSpecifier(sp) && t.isIdentifier(sp.local)) {
        imports[sp.local.name] = { imported: 'default', from };
      }
    }
  },
});
const isRuntime = f => /vue-i18n\.runtime/.test(f || '');

// 提取组件名 + props + setup 参数
const comps = [];
T(ast, {
  VariableDeclarator(p) {
    const { id, init } = p.node;
    if (!t.isIdentifier(id) || !init || !(t.isCallExpression(init))) return;
    const callee = t.isIdentifier(init.callee) ? init.callee.name : null;
    if (!callee) return;
    // 先经 import 表解析成本地语义（o → j → defineComponent）
    const imp = imports[callee];
    // import 解析优先：本地名可能与 Vue 语义名撞车（如 dialog.js 里 h = defineComponent），
    // 先按 import 表解析才能得到真实语义；SEM 只作无 import 时的兜底。
    let sem = null;
    if (imp) {
      if (isRuntime(imp.from)) sem = VUE_API_MAP[imp.imported] || (SEM.has(imp.imported) ? imp.imported : null);
      else sem = SEM.has(imp.imported) ? imp.imported : null;
    }
    if (sem === null && SEM.has(callee)) sem = callee;
    if (sem !== 'defineComponent') return;
    const arg = init.arguments[0];
    if (!arg || !t.isObjectExpression(arg)) return;
    let name = null, propsCode = '{}', setupParam = null, alias = null;
    for (const pr of arg.properties) {
      if (!t.isObjectProperty(pr)) continue;
      const k = t.isIdentifier(pr.key) ? pr.key.name : (t.isStringLiteral(pr.key) ? pr.key.value : null);
      if (k === '__name') {
        const v = pr.value;
        name = t.isStringLiteral(v) ? v.value : (t.isTemplateLiteral(v) && v.expressions.length === 0 ? v.quasis[0].value.cooked : null);
      }
      if (k === 'props') propsCode = src.slice(pr.value.start, pr.value.end);
      if (k === 'setup' && (t.isFunctionExpression(pr.value) || t.isArrowFunctionExpression(pr.value))) {
        const fp = pr.value.params[0];
        if (t.isIdentifier(fp)) setupParam = fp.name;
        const bodySrc = src.slice(pr.value.start, pr.value.end);
        const m = bodySrc.match(/let\s+([\w$]+)\s*=\s*([\w$]+)\s*[,;]/);
        if (m && m[2] === setupParam) alias = m[1];
      }
    }
    // 形态二：ObjectMethod setup(o) { ... }（Kbd 等用的是这种）
    if (!setupParam) {
      for (const pr of arg.properties) {
        if (t.isObjectMethod(pr) && t.isIdentifier(pr.key, { name: 'setup' })) {
          const fp = pr.params[0];
          if (t.isIdentifier(fp)) {
            setupParam = fp.name;
            const bodySrc = src.slice(pr.start, pr.end);
            const m = bodySrc.match(/let\s+([\w$]+)\s*=\s*([\w$]+)\s*[,;]/);
            if (m && m[2] === setupParam) alias = m[1];
          }
        }
      }
    }
    if (name) comps.push({ name, propsCode, setupParam, alias });
  },
});
if (!comps.length) { console.error('no-component'); process.exit(0); }

fs.mkdirSync(outDir, { recursive: true });
let made = 0;
for (const c of comps) {
  // 用成熟转换器拿 template
  let tpl = '';
  try {
    tpl = execFileSync('node', [convPath, file], { encoding: 'utf8', env: process.env }).trim();
  } catch (e) { }
  if (!tpl) continue;

  const vueDeps = [...SEM].filter(a => new RegExp('(?<![\\w$])' + a + '\\s*\\(').test(tpl));
  const byFrom = {};
  for (const [local, info] of Object.entries(imports)) {
    if (isRuntime(info.from)) continue;
    if (!new RegExp('(?<![\\w$])' + local + '(?![\\w$])').test(tpl)) continue;
    const from = info.from;
    // 查映射表：该 chunk 的这个导出是否已被转换成 .vue（是则重定向 import）
    let redirected = null;
    if (Object.keys(COMP_MAP).length && from.startsWith('.')) {
      const rendererRoot = path.dirname(path.dirname(path.resolve(file)));
      const targetAbs = path.resolve(path.dirname(path.resolve(file)), from);
      const relToRoot = path.relative(rendererRoot, targetAbs).split(path.sep).join('/');
      const key = relToRoot + '::' + info.imported;
      const target = COMP_MAP[key];
      // 只有目标 .vue 确实存在时才重定向（避免指向未生成的组件）
      if (target && fs.existsSync(path.join(outDir, target + '.vue'))) redirected = target;
    }
    // 组件在 src/components/，vendor 在同级 src/vendor/ → 需要 ../
    const rel = from.startsWith('../')
      ? '../vendor/' + from.slice(3)                                   // ../chunks/x → ../vendor/chunks/x
      : `../vendor/${srcDirName}/` + from.replace(/^\.\//, '');      // ./x → ../vendor/ui/x
    if (redirected) {
      // → import Foo from './Foo.vue'（同目录）
      byFrom[`__vue__${redirected}`] = byFrom[`__vue__${redirected}`] || [];
      byFrom[`__vue__${redirected}`].push(local);
    } else {
      (byFrom[rel] = byFrom[rel] || []).push(info.imported === local ? local : `${info.imported} as ${local}`);
    }
  }
  // 冲突检测：props 代码里已声明的标识符，不能与 import 别名重名
  const propIds = new Set((c.propsCode.match(/[A-Za-z_$][\w$]*/g) || []));
  let tpl2 = tpl;
  const renamed = new Map();   // 原别名 → 新别名
  for (const local of Object.keys(imports)) {
    if (isRuntime(imports[local].from)) continue;
    if (!propIds.has(local)) continue;
    if (!new RegExp('(?<![\\w$])' + local + '(?![\\w$])').test(tpl2)) continue;
    renamed.set(local, '__' + local);
  }
  let script = '';
  if (vueDeps.length) script += `import { ${[...new Set(vueDeps)].join(', ')} } from 'vue';\n`;
  for (const [f2, specs] of Object.entries(byFrom)) {
    // 重定向到已转换的组件 .vue（默认导出，同目录）
    if (f2.startsWith('__vue__')) {
      const compName = f2.slice(7);
      script += `import ${specs[0]} from './${compName}.vue';\n`;
      continue;
    }
    const fixed = specs.map(sp => {
      const m = sp.match(/^(.*)\s+as\s+(\w+)$/);
      const name = m ? m[2] : sp;
      if (renamed.has(name)) return (m ? m[1] : sp) + ' as ' + renamed.get(name);
      return sp;
    });
    script += `import { ${fixed.join(', ')} } from '${f2}';\n`;
  }
  // 同步替换模板里的引用
  for (const [oldN, newN] of renamed) {
    tpl2 = tpl2.replace(new RegExp('(?<![\\w$])' + oldN + '(?![\\w$])', 'g'), newN);
  }
  const usedNames = new Set((tpl2.match(/[A-Za-z_$][\w$]*/g) || []));
  const importLocals = new Set(Object.keys(imports).filter(k => !isRuntime(imports[k].from)));
  if (c.setupParam && (usedNames.has(c.setupParam) || (c.alias && usedNames.has(c.alias)))) {
    let paramName = c.setupParam;
    let aliasName = c.alias;
    // 与 import 别名冲突 → 统一改名为 props / p
    if (importLocals.has(paramName) || importLocals.has(aliasName || '')) {
      const propBodyIds = new Set((c.propsCode.match(/[A-Za-z_$][\w$]*/g) || []));
      const replacement = (importLocals.has('props') || propBodyIds.has('props')) ? '__props' : 'props';
      tpl2 = tpl2.replace(new RegExp('(?<![\\w$])' + paramName + '(?![\\w$])', 'g'), replacement);
      if (aliasName) tpl2 = tpl2.replace(new RegExp('(?<![\\w$])' + aliasName + '(?![\\w$])', 'g'), replacement);
      aliasName = null;
      paramName = replacement;
    }
    script += `const ${paramName} = defineProps(${c.propsCode});\n`;
    if (aliasName && aliasName !== paramName) script += `const ${aliasName} = ${paramName};\n`;
  }
  fs.writeFileSync(path.join(outDir, `${c.name}.vue`),
    `<template>\n${tpl2}\n</template>\n\n<script setup>\n${script}</script>\n`);
  made++;
}
console.error(`${path.basename(file)}: ${made} 个组件`);
