#!/usr/bin/env node
// 组件族包裹测试：子组件挂载在族容器内（让 provide/inject 生效）
const fs = require('fs');
const path = require('path');
const P = require('@babel/parser');
const T = require('@babel/traverse').default;
const t = require('@babel/types');

const [, , projDir] = process.argv;
const compDir = path.join(projDir, 'src/components');
const files = fs.readdirSync(compDir).filter(f => f.endsWith('.vue'));
const names = files.map(f => f.replace(/\.vue$/, ''));

const SUFFIX = /(Root|Trigger|Content|ItemIndicator|Item|Indicator|Portal|Overlay|Title|Description|Close|Group|Label|Separator|Viewport|Thumb|Track|Range|Header|Footer|Body|SubTrigger|SubContent|Arrow|Scrollbar|Corner|Field|List|Option|Value|Icon|Provider)$/;
const familyOf = n => {
  let b = n.replace(SUFFIX, '');
  while (b && b !== n) { n = b; b = b.replace(SUFFIX, ''); }
  return n || b;
};
const families = new Map();
for (const n of names) {
  const f = familyOf(n);
  if (!families.has(f)) families.set(f, []);
  families.get(f).push(n);
}
function containerOf(fam) {
  if (names.includes(fam + 'Root')) return fam + 'Root';
  if (names.includes(fam)) return fam;
  return null;
}

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
      let hint = 'unknown';
      const v = p.node.value;
      if (t.isObjectExpression(v)) {
        for (const pr of v.properties) {
          if (t.isObjectProperty(pr) && t.isIdentifier(pr.key, { name: 'type' })) {
            const arr = [];
            const collect = n => {
              if (t.isIdentifier(n)) arr.push(n.name);
              else if (t.isArrayExpression(n)) n.elements.forEach(collect);
            };
            collect(pr.value);
            if (arr.includes('Boolean')) hint = 'boolean';
            else if (arr.includes('String')) hint = 'string';
            else if (arr.includes('Number')) hint = 'number';
            else if (arr.includes('Array')) hint = 'array';
            else if (arr.includes('Object')) hint = 'object';
            else if (arr.includes('Function')) hint = 'function';
          }
        }
      }
      out[k] = hint;
    },
  });
  return out;
}

const HINTS = [
  [/^(node|tree)$/i, `{ type:{name:'paragraph'}, kind:'note', children:[], value:'' }`],
  [/^(nodes|content|children|items|list|rows|data|categories|sources|messages)$/i, '[]'],
  [/^(id|customId|uid|key)$/i, `'mock-id'`],
  [/^(indexKey|index)$/i, `'0'`],
  [/^class$/i, `''`],
  [/^(title|label|text|name|placeholder|description|message|icon|href|url|src|path)$/i, `''`],
  [/^(visible|open|disabled|checked|active|loading|typewriter|asChild|inset|modal|defaultOpen|required)$/i, 'false'],
  [/^(count|total|max|min|size|width|height|level|depth|duration|interval|step|modelValue|value)$/i, '1'],
  [/^(options|config|settings|style|attrs)$/i, '{}'],
  [/^(on[A-Z]\w*|callback)$/, '() => {}'],
];
function mockFor(name, hint) {
  for (const [re, v] of HINTS) if (re.test(name)) return v;
  const byType = { boolean: 'false', number: '1', string: `''`, array: '[]', object: '{}', function: '() => {}' };
  return byType[hint] || `''`;
}

const propsMap = {};
for (const f of files) {
  const n = f.replace(/\.vue$/, '');
  try { propsMap[n] = extractProps(fs.readFileSync(path.join(compDir, f), 'utf8')); } catch { propsMap[n] = {}; }
}
fs.writeFileSync(path.join(projDir, 'props.json'), JSON.stringify(propsMap, null, 1));

const aliasOf = n => n.replace(/[^\w]/g, '_');
const imports = names.map(n => `import ${aliasOf(n)} from './components/${n}.vue';`).join('\n');

const cases = [];
let wrapped = 0;
for (const n of names) {
  const fam = familyOf(n);
  const container = containerOf(fam);
  const selfProps = Object.entries(propsMap[n] || {}).map(([k, h]) => `${JSON.stringify(k)}: ${mockFor(k, h)}`).join(', ');
  if (container && container !== n) {
    const cProps = Object.entries(propsMap[container] || {}).map(([k, h]) => `${JSON.stringify(k)}: ${mockFor(k, h)}`).join(', ');
    cases.push(`  ['${n}', ${aliasOf(container)}, {${cProps}}, ${aliasOf(n)}, {${selfProps}}],`);
    wrapped++;
  } else {
    cases.push(`  ['${n}', null, null, ${aliasOf(n)}, {${selfProps}}],`);
  }
}

const testMain = `import { createApp, h } from 'vue';
${imports}

const CASES = [
${cases.join('\n')}
];

const out = document.getElementById('app');
const results = [];
for (const [name, Container, cProps, Comp, props] of CASES) {
  const host = document.createElement('div');
  document.body.appendChild(host);
  let status = 'EMPTY', html = '', err = '';
  try {
    const render = Container
      ? () => h(Container, cProps, { default: () => h(Comp, props, { default: () => 'S' }) })
      : () => h(Comp, props, { default: () => 'S' });
    const app = createApp({ render });
    app.config.errorHandler = (e) => { err = String(e && e.message || e).slice(0, 120); status = 'ERR'; };
    app.config.warnHandler = () => {};
    app.mount(host);
    html = host.innerHTML;
    if (status !== 'ERR') status = html.length > 20 ? 'OK' : 'EMPTY';
  } catch (e) { status = 'THROW'; err = String(e && e.message || e).slice(0, 120); }
  results.push({ name, status, len: html.length, wrapped: !!Container, err });
}
const ok = results.filter(r => r.status === 'OK').length;
window.__RESULTS__ = {
  total: results.length, ok,
  empty: results.filter(r => r.status === 'EMPTY').length,
  err: results.filter(r => r.status === 'ERR' || r.status === 'THROW').length,
  wrappedOk: results.filter(r => r.status === 'OK' && r.wrapped).length,
  wrappedTotal: results.filter(r => r.wrapped).length,
  detail: results,
};
out.innerHTML = '<pre id="summary">total=' + results.length + ' ok=' + ok +
  ' wrappedOk=' + window.__RESULTS__.wrappedOk + '/' + window.__RESULTS__.wrappedTotal +
  ' empty=' + window.__RESULTS__.empty + ' err=' + window.__RESULTS__.err + '</pre><pre id="detail">' +
  results.map(r => r.status + (r.wrapped ? '(w)' : '') + ' | ' + r.len + 'B | ' + r.name + (r.err ? ' | ' + r.err : '')).join('\\n') + '</pre>';
`;
fs.writeFileSync(path.join(projDir, 'src/test-main.js'), testMain);
fs.writeFileSync(path.join(projDir, 'test.html'),
  '<!doctype html><html><head><meta charset="UTF-8"></head><body><div id="app"></div><script type="module" src="/src/test-main.js"></script></body></html>');
console.error(`用例 ${names.length}（包裹式 ${wrapped}）`);
