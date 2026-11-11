#!/usr/bin/env node
// 全量渲染验证：为每个组件自动生成 props mock，在浏览器里批量挂载并统计
//
// 输出：
//   <outDir>/index.html      测试页面
//   <outDir>/src/test-main.js  批量挂载 + 统计
//   <outDir>/props.json       每个组件的 props 定义（供排查）
const fs = require('fs');
const path = require('path');
const P = require('@babel/parser');
const T = require('@babel/traverse').default;
const t = require('@babel/types');

const [,, projDir] = process.argv;
const compDir = path.join(projDir, 'src/components');
const files = fs.readdirSync(compDir).filter(f => f.endsWith('.vue'));

// 1) 从每个 .vue 的 defineProps 提取 prop 名（含类型线索）
function extractProps(vueSrc) {
  const m = vueSrc.match(/defineProps\(\s*(\{[\s\S]*?\})\s*\)/);
  if (!m) return {};
  let ast;
  try { ast = P.parse('(' + m[1] + ')', { sourceType: 'script' }); } catch { return {}; }
  const out = {};
  T(ast, {
    ObjectProperty(p) {
      const k = t.isIdentifier(p.node.key) ? p.node.key.name
        : (t.isStringLiteral(p.node.key) ? p.node.key.value : null);
      if (!k) return;
      // 类型线索：找 type: [String, ...] 或 type: Boolean
      let typeHint = 'unknown';
      const v = p.node.value;
      if (t.isObjectExpression(v)) {
        for (const pr of v.properties) {
          if (t.isObjectProperty(pr) && t.isIdentifier(pr.key, { name: 'type' })) {
            const tv = pr.value;
            const names = [];
            const collect = n => {
              if (t.isIdentifier(n)) names.push(n.name);
              else if (t.isArrayExpression(n)) n.elements.forEach(collect);
            };
            collect(tv);
            if (names.includes('Boolean')) typeHint = 'boolean';
            else if (names.includes('String')) typeHint = 'string';
            else if (names.includes('Number')) typeHint = 'number';
            else if (names.includes('Array')) typeHint = 'array';
            else if (names.includes('Object')) typeHint = 'object';
            else if (names.includes('Function')) typeHint = 'function';
          }
        }
      }
      out[k] = typeHint;
    },
  });
  return out;
}

// 2) 按名字 + 类型生成 mock 值（字符串形式，写进测试 JS）
const NAME_HINTS = [
  [/^(node|tree)$/i, `{ type:{name:'paragraph'}, kind:'note', children:[], value:'' }`],
  [/^(nodes|content|children|items|list|rows|data|categories|sources|messages)$/i, '[]'],
  [/^(id|customId|uid|key)$/i, `'mock-id'`],
  [/^(indexKey|index)$/i, `'0'`],
  [/^(class)$/i, `''`],
  [/^(title|label|text|name|placeholder|description|message|content2)$/i, `'mock'`],
  [/^(visible|open|disabled|checked|active|loading|typewriter|asChild|inset|modal|defaultOpen)$/i, 'false'],
  [/^(count|total|max|min|size|width|height|level|depth|duration|interval|index2)$/i, '1'],
  [/^(url|href|src|path|icon|image)$/i, `''`],
  [/^(options|config|settings|style|attrs|props2)$/i, '{}'],
  [/^(on[A-Z]\w*|callback)$/, '() => {}'],
];
function mockFor(name, typeHint) {
  for (const [re, val] of NAME_HINTS) if (re.test(name)) return val;
  switch (typeHint) {
    case 'boolean': return 'false';
    case 'number': return '1';
    case 'string': return `'mock'`;
    case 'array': return '[]';
    case 'object': return '{}';
    case 'function': return '() => {}';
    default: return `''`;
  }
}

// 3) 生成测试入口
const entries = [];
const propsDefs = {};
for (const f of files) {
  const name = f.replace(/\.vue$/, '');
  let src;
  try { src = fs.readFileSync(path.join(compDir, f), 'utf8'); } catch { continue; }
  const props = extractProps(src);
  propsDefs[name] = props;
  const propsJs = Object.entries(props).map(([k, th]) => `${JSON.stringify(k)}: ${mockFor(k, th)}`).join(', ');
  entries.push({ name, propsJs });
}

fs.writeFileSync(path.join(projDir, 'props.json'), JSON.stringify(propsDefs, null, 1));

const imports = entries.map(e => `import ${e.name.replace(/[^\w]/g, '_')} from './components/${e.name}.vue';`).join('\n');
const cases = entries.map(e => `  ['${e.name}', ${e.name.replace(/[^\w]/g, '_')}, {${e.propsJs}}],`).join('\n');

const testMain = `import { createApp, h } from 'vue';
${imports}

const CASES = [
${cases}
];

const out = document.getElementById('app');
const results = [];
for (const [name, Comp, props] of CASES) {
  const host = document.createElement('div');
  document.body.appendChild(host);
  let status = 'EMPTY', html = '', err = '';
  try {
    const app = createApp({ render: () => h(Comp, props, { default: () => 'SLOT' }) });
    app.config.errorHandler = (e) => { err = String(e && e.message || e).slice(0, 120); status = 'ERR'; };
    app.config.warnHandler = () => {};
    app.mount(host);
    html = host.innerHTML;
    if (status !== 'ERR') status = html.length > 20 ? 'OK' : 'EMPTY';
  } catch (e) { status = 'THROW'; err = String(e && e.message || e).slice(0, 120); }
  results.push({ name, status, len: html.length, head: html.slice(0, 160), err });
}
const ok = results.filter(r => r.status === 'OK').length;
const empty = results.filter(r => r.status === 'EMPTY').length;
const errN = results.filter(r => r.status === 'ERR' || r.status === 'THROW').length;
window.__RESULTS__ = {
  total: results.length, ok, empty, err: errN,
  detail: results,
};
out.innerHTML = '<pre id="summary">' +
  'total=' + results.length + ' ok=' + ok + ' empty=' + empty + ' err=' + errN +
  '</pre><pre id="detail">' +
  results.map(r => r.status + ' | ' + r.len + 'B | ' + r.name + (r.err ? ' | ' + r.err : '')).join('\\n') +
  '</pre>';
`;

fs.writeFileSync(path.join(projDir, 'src/test-main.js'), testMain);
fs.writeFileSync(path.join(projDir, 'test.html'),
  '<!doctype html><html><head><meta charset="UTF-8"><title>render-all</title></head>' +
  '<body><div id="app"></div><script type="module" src="/src/test-main.js"></script></body></html>');

console.error(`生成测试入口：${entries.length} 个组件`);
