const fs = require('fs'), path = require('path');
const P = require('/tmp/d52/node_modules/@babel/parser');
const T = require('/tmp/d52/node_modules/@babel/traverse').default;
const t = require('/tmp/d52/node_modules/@babel/types');

// 通用词（无区分度，过滤掉）
const COMMON = new Set(['none','string','object','number','boolean','function','undefined','null','true','false',
  'auto','hidden','both','afterbegin','beforeend','span','div','divider','day','en','post','scroll','checked',
  'mounted','indeterminate','mouse','transformOrigin','rtl','string','Context','keydown','pointerdown',
  'pointerleave','arrow','ArrowDown','Alt','gregory','BC','[data-selected]','[data-today]','$el','#text','$el']);

const extract = code => {
  let ast;
  try { ast = P.parse(code, { sourceType: 'module', errorRecovery: true }); } catch (e) { return new Set(); }
  const out = new Set();
  T(ast, {
    StringLiteral(p) { const v = p.node.value; if (v && v.length > 3 && v.length < 60 && !COMMON.has(v)) out.add(v); },
    TemplateLiteral(p) { for (const q of p.node.quasis) { const v = q.value.cooked; if (v && v.length > 3 && v.length < 60 && !COMMON.has(v)) out.add(v); } },
  });
  return out;
};

const walk = (dir, out = []) => {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p, out);
    else if (e.name.endsWith('.js')) out.push(p);
  }
  return out;
};

// 参考库：文件名 → 字符串集合
const refLib = [];
for (const p of walk('/tmp/rk2/package/dist')) {
  let code;
  try { code = fs.readFileSync(p, 'utf8'); } catch (e) { continue; }
  if (code.length > 300000) continue;
  const strs = extract(code);
  if (strs.size) refLib.push({ name: path.basename(p, '.js'), strs, dir: path.basename(path.dirname(p)) });
}
console.log('参考库:', refLib.length, '个文件');

// 应用函数
const appDir = '/Users/zhaojiaxiang/reverse-tools/work/round-0481/repo/src/renderer/ui';
const results = [];
for (const f of fs.readdirSync(appDir)) {
  if (!f.endsWith('.js')) continue;
  const code = fs.readFileSync(path.join(appDir, f), 'utf8');
  let ast;
  try { ast = P.parse(code, { sourceType: 'module', errorRecovery: true }); } catch (e) { continue; }
  T(ast, {
    FunctionDeclaration(p) {
      if (!p.node.id) return;
      if (p.parentPath && !p.parentPath.isProgram()) return;
      const src = code.slice(p.node.start, p.node.end);
      const strs = extract('(' + src + ')');
      if (!strs.size) return;
      // 找交集最大的参考文件
      let best = null, bestHit = 0;
      for (const rf of refLib) {
        let hit = 0;
        for (const s of strs) if (rf.strs.has(s)) hit++;
        if (hit > bestHit) { bestHit = hit; best = rf; }
      }
      results.push({ short: p.node.id.name, file: f, match: best ? best.name : null, hits: bestHit,
        total: strs.size, strs: [...strs].slice(0, 4) });
    },
  });
}
results.sort((a, b) => b.hits - a.hits || (a.total - b.total));
console.log('\n=== 交集命中前 25 ===');
for (const r of results.slice(0, 25)) {
  console.log(`  ${r.short.padEnd(6)} → ${String(r.match).padEnd(28)} 命中${r.hits}/${r.total}  [${r.file}] ${r.strs.slice(0,2).join('|')}`);
}
const byHit = {};
for (const r of results) byHit[r.hits] = (byHit[r.hits]||0)+1;
console.log('\n命中分布:', JSON.stringify(byHit));
console.log('总函数:', results.length);
fs.writeFileSync('/tmp/symbol-map3.json', JSON.stringify(results, null, 1));
