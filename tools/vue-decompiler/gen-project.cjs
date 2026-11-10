// 生成完整工程：shared.js（共享符号）+ 组件 .vue（含正确 import）
const fs = require('fs');
const path = require('path');
const P = require('@babel/parser');
const T = require('@babel/traverse').default;
const G = require('@babel/generator').default;
const t = require('@babel/types');

const [,, srcFile, compDir, outDir] = process.argv;
const src = fs.readFileSync(srcFile, 'utf8');
const srcRoot = path.dirname(path.dirname(srcFile));  // chunks/main.js → src/renderer
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
// 区间重叠判断：声明整体是否与组件区间相交（var X = defineComponent({...}) 的 start 在调用之前）
const overlapsComp = (start, end) => ranges.some(([a,b]) => start < b && end > a);

// 2) 按 declarator 粒度提取顶层声明（组件归 .vue，其余进 shared）
const kept = [];
const allSharedNames = new Set();
let droppedDecls = 0;
T(ast, {
  VariableDeclaration(p) {
    if (!p.parentPath.isProgram()) return;
    const normal = p.node.declarations.filter(d => !overlapsComp(d.start, d.end));
    const comps = p.node.declarations.filter(d => overlapsComp(d.start, d.end));
    droppedDecls += comps.length;
    if (!normal.length) return;
    try {
      const clone = t.variableDeclaration(p.node.kind, normal.map(d => t.cloneNode(d, true, true)));
      kept.push(G(clone, { compact: false, comments: true, jsescOption: { minimal: true } }).code);
      for (const d of normal) if (t.isIdentifier(d.id)) allSharedNames.add(d.id.name);
    } catch {}
  },
  FunctionDeclaration(p) {
    if (!p.parentPath.isProgram() || !p.node.id) return;
    if (overlapsComp(p.node.start, p.node.end)) { droppedDecls++; return; }
    kept.push(src.slice(p.node.start, p.node.end));
    allSharedNames.add(p.node.id.name);
  },
});
console.error('shared 符号:', allSharedNames.size, '| 剔除组件声明:', droppedDecls);

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
let body = kept.join('\n\n');
// 建立 basename → 真实相对路径 索引（renderer 内）
const baseIndex = {};
(function walkIdx(d, rel) {
  for (const e of fs.readdirSync(d, { withFileTypes: true })) {
    const p2 = path.join(d, e.name);
    const r2 = rel ? rel + '/' + e.name : e.name;
    if (e.isDirectory()) walkIdx(p2, r2);
    else baseIndex[e.name] = './vendor/' + r2;
  }
})(srcRoot, '');
const deadRefs = new Set();
body = body.replace(/(["'\`])(\.\.?\/[^"'\`]+)\1/g, (m, q, ref) => {
  const base = ref.split('/').pop();
  const hit = baseIndex[base];
  if (hit) return q + hit + q;
  // 找不到 → 已删除的死 chunk（round-0376 清理），替换为解析空对象的占位
  deadRefs.add(base);
  return q + './vendor/_removed.js' + q;
});
const exportLines = [...allSharedNames].filter(n => /^[A-Za-z_$][\w$]*$/.test(n))
  .map(n => `export { ${n} };`).join('\n');
// 跨 chunk 依赖：在 shared.js 里统一 re-export，组件只需 import shared.js
const reexportLines = [];
for (const [local, info] of Object.entries(importMap)) {
  // vue-i18n.runtime 里：映射表内的算 Vue API，其余（内部工具函数）仍需导入
  const isRuntime = /vue-i18n\.runtime/.test(info.from || '');
  if (isRuntime && (VUE_API.has(local) || VUE_API.has(info.imported))) continue;
  // 原路径相对 chunks/main.js → 转成相对工程 src/shared.js
  // 原路径是相对 chunks/main.js；工程里把 renderer 原样复制到 src/vendor/
  // 所以：../ui/X.js（= renderer/ui/X.js）→ ./vendor/ui/X.js
  let rel = info.from || '';
  if (rel.startsWith('../')) rel = './vendor/' + rel.slice(3);
  else if (rel.startsWith('./')) rel = './vendor/chunks/' + rel.slice(2);
  else rel = './vendor/' + rel;
  const spec = info.imported === 'default' ? `default as ${local}` : (info.imported === local ? local : `${info.imported} as ${local}`);
  // 关键：export { x } from '...' 不会在当前模块建立绑定，
  // 而 shared.js 的顶层代码（var oa = Mt(...)）需要本地绑定 → 必须先 import
  reexportLines.push(`import { ${spec} } from '${rel}';`);
}
fs.mkdirSync(outDir + '/src/vendor', { recursive: true });
fs.writeFileSync(outDir + '/src/vendor/_removed.js', 'export default {};\nexport const __removed = true;\n');
// shared.js 里可能用到 Vue API（组件已排除，但辅助代码会引用）
// 用命名空间导入彻底避免与 main.js 同名声明冲突，再 AST 改写 body 中的 Vue API 引用
const vueImportLine = "import * as __vue from 'vue';\n";
try {
  const ast2 = P.parse(body, { sourceType: 'module' });
  let renamed = 0;
  T(ast2, {
    Identifier(ip) {
      if (!ip.isReferencedIdentifier()) return;
      const nm = ip.node.name;
      if (!VUE_API.has(nm)) return;
      const par = ip.parentPath;
      if ((par.isMemberExpression() || par.isOptionalMemberExpression()) && par.node.property === ip.node && !par.node.computed) return;
      if (par.isObjectProperty() && par.node.key === ip.node && !par.node.computed) return;
      if (par.isVariableDeclarator() && par.node.id === ip.node) return;
      ip.replaceWith(t.memberExpression(t.identifier('__vue'), t.identifier(nm)));
      renamed++;
    },
  });
  if (renamed) body = G(ast2, { compact: false, jsescOption: { minimal: true } }).code;
} catch (e) { console.error('vue 改写失败:', String(e.message).slice(0, 60)); }
fs.writeFileSync(outDir + '/src/shared.js', `// 从 main bundle 提取的共享符号（CSS 常量、工具函数等）\n// 共 ${allSharedNames.size} 个顶层声明 + ${reexportLines.length} 个跨 chunk re-export\n${vueImportLine}${reexportLines.join('\n')}

${body}

${exportLines}
${Object.keys(importMap).filter(k => !/vue-i18n\.runtime/.test(importMap[k].from || '')).map(k => `export { ${k} };`).join('\n')}
`);

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
  const BROWSER = new Set(['window','document','navigator','location','history','screen','localStorage',
    'sessionStorage','fetch','console','setTimeout','setInterval','clearTimeout','clearInterval',
    'requestAnimationFrame','cancelAnimationFrame','queueMicrotask','URL','URLSearchParams','FormData',
    'Blob','File','FileReader','TextEncoder','TextDecoder','atob','btoa','crypto','performance',
    'structuredClone','Intl','Math','JSON','Object','Array','String','Number','Boolean','Date','RegExp',
    'Error','Promise','Symbol','Map','Set','WeakMap','WeakSet','Proxy','Reflect','process','require',
    'module','exports','globalThis','undefined','NaN','Infinity','parseInt','parseFloat','isNaN',
    'isFinite','encodeURIComponent','decodeURIComponent','encodeURI','decodeURI','alert','prompt']);
  // 非 Vue API 且非浏览器全局 → 一律从 shared.js 取（shared 已 re-export 跨 chunk 依赖）
  const sharedDeps = deps.filter(d => !VUE_API.has(d) && !BROWSER.has(d));
  const importedDeps = [];
  const BROWSER_GLOBALS = new Set(['window','document','navigator','location','history','screen','localStorage',
    'sessionStorage','fetch','XMLHttpRequest','WebSocket','Worker','console','setTimeout','setInterval',
    'clearTimeout','clearInterval','requestAnimationFrame','cancelAnimationFrame','queueMicrotask',
    'URL','URLSearchParams','FormData','Blob','File','FileReader','TextEncoder','TextDecoder','atob','btoa',
    'crypto','performance','structuredClone','Intl','Math','JSON','Object','Array','String','Number',
    'Boolean','Date','RegExp','Error','Promise','Symbol','Map','Set','WeakMap','WeakSet','Proxy','Reflect',
    'process','require','module','exports','globalThis','undefined','NaN','Infinity','parseInt','parseFloat',
    'isNaN','isFinite','encodeURIComponent','decodeURIComponent','encodeURI','decodeURI','alert','prompt']);
  const unknown = deps.filter(d => !VUE_API.has(d) && !allSharedNames.has(d) && !importMap[d] && !BROWSER_GLOBALS.has(d));
  // 提取 setup 参数与 props 别名（模板表达式里用的是这些名字）
  const compBody = compSrc;
  const setupM = compBody.match(/setup\s*\(\s*([\w$]+)/);
  const propsArg = setupM ? setupM[1] : null;
  const aliasM = compBody.match(/let\s+([\w$]+)\s*=\s*([\w$]+)\s*[,;]/);
  const propsAlias = (aliasM && propsArg && aliasM[2] === propsArg) ? aliasM[1] : null;
  let importsPart = '';
  let bodyPart = '';
  if (vueDeps.length) importsPart += `import { ${[...new Set(vueDeps)].join(', ')} } from 'vue';\n`;
  if (propsArg) bodyPart += `const ${propsArg} = defineProps({});\n`;
  if (propsAlias && propsAlias !== propsArg) bodyPart += `const ${propsAlias} = ${propsArg};\n`;
  if (sharedDeps.length) importsPart += `import { ${[...new Set(sharedDeps)].join(', ')} } from '../shared.js';\n`;
  // 跨 chunk：保留原别名以便组件内引用不变
  const byFrom = {};
  for (const d of importedDeps) {
    const { imported, from } = importMap[d];
    const rel = from.replace(/^\.\.\//, '../').replace(/^\.\//, './');
    (byFrom[rel] = byFrom[rel] || []).push(imported === d ? d : `${imported} as ${d}`);
  }
  // 跨 chunk 依赖统一由 shared.js re-export，组件只写 import { x } from '../shared.js'
  const script = importsPart + bodyPart + (unknown.length ? `// 未解析依赖: ${unknown.join(', ')}\n` : '');
  const vue = `<template>\n${tpl}\n</template>\n\n<script setup>\n${script || '// 无外部依赖\n'}\n</script>\n`;
  fs.writeFileSync(`${outDir}/src/components/${name}.vue`, vue);
  okCount++;
  const key = unknown.length ? 'has-unknown' : 'resolved';
  depStats[key] = (depStats[key] || 0) + 1;
}
console.error(`生成组件 ${okCount}，依赖状态:`, depStats);
