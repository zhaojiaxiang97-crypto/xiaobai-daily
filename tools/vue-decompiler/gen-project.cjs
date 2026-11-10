// 生成完整工程：shared.js（共享符号）+ 组件 .vue（含正确 import）
const fs = require('fs');
const path = require('path');
const P = require('@babel/parser');
const T = require('@babel/traverse').default;
const G = require('@babel/generator').default;
const t = require('@babel/types');

const [,, srcFile, compDir, outDir] = process.argv;
const src = fs.readFileSync(srcFile, 'utf8');
const ast = P.parse(src, { sourceType: 'unambiguous' });

const VUE_API = new Set(['openBlock','createElementBlock','createElementVNode','createBlock','createVNode',
  'createTextVNode','createCommentVNode','createStaticVNode','renderSlot','renderList','normalizeClass',
  'toDisplayString','unref','withCtx','withDirectives','defineComponent','resolveComponent','Fragment',
  'computed','watch','onMounted','onUnmounted','onBeforeMount','isArray','defineAsyncComponent','ref',
  'reactive','toRef','toRefs','nextTick','inject','provide','h','cloneVNode','mergeProps']);

// 1) 收集组件区间（避免把组件代码放进 shared）
const ranges = [];
T(ast, {
  CallExpression(p) {
    const c = p.node.callee;
    const nm = t.isIdentifier(c) ? c.name : (t.isMemberExpression(c) && !c.computed && t.isIdentifier(c.property) ? c.property.name : null);
    if (!nm || !/^(defineComponent|j|o)$/.test(nm)) return;
    const arg = p.node.arguments[0];
    if (!arg || !t.isObjectExpression(arg)) return;
    const hasName = arg.properties.some(pr => t.isObjectProperty(pr) &&
      ((t.isIdentifier(pr.key) && pr.key.name === '__name') || (t.isStringLiteral(pr.key) && pr.key.value === '__name')));
    if (hasName) ranges.push([p.node.start, p.node.end]);
  },
});
const inComp = pos => ranges.some(([a,b]) => pos >= a && pos < b);

// 2) 提取所有非组件的顶层声明
const sharedParts = [];
T(ast, {
  VariableDeclaration(p) {
    if (inComp(p.node.start)) return;
    if (!p.parentPath.isProgram()) return;
    sharedParts.push({ code: src.slice(p.node.start, p.node.end), names: p.node.declarations.map(d => t.isIdentifier(d.id) ? d.id.name : null).filter(Boolean) });
  },
  FunctionDeclaration(p) {
    if (inComp(p.node.start) || !p.node.id) return;
    if (!p.parentPath.isProgram()) return;
    sharedParts.push({ code: src.slice(p.node.start, p.node.end), names: [p.node.id.name] });
  },
});

// 2.5) 收集 main.js 的全部 import（跨 chunk 依赖也在此）
const importMap = {};   // localName -> { imported, from }
T(ast, {
  ImportDeclaration(p) {
    const from = p.node.source.value;
    for (const sp of p.node.specifiers) {
      if (!t.isIdentifier(sp.local)) continue;
      if (t.isImportSpecifier(sp) && t.isIdentifier(sp.imported)) {
        importMap[sp.local.name] = { imported: sp.imported.name, from };
      } else if (t.isImportDefaultSpecifier(sp)) {
        importMap[sp.local.name] = { imported: 'default', from };
      } else if (t.isImportNamespaceSpecifier(sp)) {
        importMap[sp.local.name] = { imported: '*', from };
      }
    }
  },
});
console.error('main.js import 表:', Object.keys(importMap).length);

fs.mkdirSync(outDir + '/src/components', { recursive: true });
const allSharedNames = new Set();
for (const sp of sharedParts) sp.names.forEach(n => allSharedNames.add(n));
console.error('共享符号:', allSharedNames.size);

// 3) 写 shared.js（全部导出）
const body = sharedParts.map(sp => sp.code).join('\n\n');
const exportLines = [...allSharedNames].filter(n => /^[A-Za-z_$][\w$]*$/.test(n))
  .map(n => `export { ${n} };`).join('\n');
fs.writeFileSync(outDir + '/src/shared.js', `// 从 main bundle 提取的共享符号（CSS 常量、工具函数等）\n// 共 ${allSharedNames.size} 个顶层声明\n${body}\n\n${exportLines}\n`);

// 4) 生成组件 .vue
let okCount = 0;
const depStats = {};
for (const f of fs.readdirSync(compDir).filter(x => x.endsWith('.js'))) {
  const compSrc = fs.readFileSync(path.join(compDir, f), 'utf8');
  const name = f.replace(/\.js$/, '');
  // 转 template
  let tpl = '';
  try {
    tpl = require('child_process').execSync(`node ${process.argv[5]} ${path.join(compDir, f)} 2>/dev/null`, { encoding: 'utf8', env: { ...process.env } }).trim();
  } catch (e) {}
  if (!tpl) continue;
  // 依赖
  const m = compSrc.match(/\/\/ 外部依赖\(\d+\): (.+)/);
  const deps = m ? m[1].split(',').map(x => x.trim()).filter(Boolean) : [];
  const vueDeps = deps.filter(d => VUE_API.has(d));
  const sharedDeps = deps.filter(d => !VUE_API.has(d) && allSharedNames.has(d));
  const importedDeps = deps.filter(d => !VUE_API.has(d) && !allSharedNames.has(d) && importMap[d]);
  const BROWSER_GLOBALS = new Set(['window','document','navigator','location','history','screen','localStorage',
    'sessionStorage','fetch','XMLHttpRequest','WebSocket','Worker','console','setTimeout','setInterval',
    'clearTimeout','clearInterval','requestAnimationFrame','cancelAnimationFrame','queueMicrotask',
    'URL','URLSearchParams','FormData','Blob','File','FileReader','TextEncoder','TextDecoder','atob','btoa',
    'crypto','performance','structuredClone','Intl','Math','JSON','Object','Array','String','Number',
    'Boolean','Date','RegExp','Error','Promise','Symbol','Map','Set','WeakMap','WeakSet','Proxy','Reflect',
    'process','require','module','exports','globalThis','undefined','NaN','Infinity','parseInt','parseFloat',
    'isNaN','isFinite','encodeURIComponent','decodeURIComponent','encodeURI','decodeURI','alert','prompt']);
  const unknown = deps.filter(d => !VUE_API.has(d) && !allSharedNames.has(d) && !importMap[d] && !BROWSER_GLOBALS.has(d));
  let script = '';
  if (vueDeps.length) script += `import { ${[...new Set(vueDeps)].join(', ')} } from 'vue';\n`;
  if (sharedDeps.length) script += `import { ${[...new Set(sharedDeps)].join(', ')} } from '../shared.js';\n`;
  // 跨 chunk：保留原别名以便组件内引用不变
  const byFrom = {};
  for (const d of importedDeps) {
    const { imported, from } = importMap[d];
    const rel = from.replace(/^\.\.\//, '../').replace(/^\.\//, './');
    (byFrom[rel] = byFrom[rel] || []).push(imported === d ? d : `${imported} as ${d}`);
  }
  for (const [f2, specs] of Object.entries(byFrom)) script += `import { ${specs.join(', ')} } from '${f2}';\n`;
  if (unknown.length) script += `// 未解析依赖: ${unknown.join(', ')}\n`;
  const vue = `<template>\n${tpl}\n</template>\n\n<script setup>\n${script || '// 无外部依赖\n'}\n</script>\n`;
  fs.writeFileSync(`${outDir}/src/components/${name}.vue`, vue);
  okCount++;
  const key = unknown.length ? 'has-unknown' : 'resolved';
  depStats[key] = (depStats[key] || 0) + 1;
}
console.error(`生成组件 ${okCount}，依赖状态:`, depStats);
