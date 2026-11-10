// 验证 19 个已知映射：用全库调用签名交叉检验
const fs = require('fs');
const path = require('path');
const P = require('@babel/parser');
const T = require('@babel/traverse').default;
const t = require('@babel/types');

const KNOWN = {
  '$n': 'normalizeClass', 'An': 'unref', 'Ct': 'withCtx?|renderSlot', 'O': 'createTextVNode',
  'S': 'createElementBlock', 'St': 'renderList', 'Wt': 'watch', 'b': 'createBlock',
  'c': 'Fragment', 'gt': 'openBlock', 'j': 'defineComponent', 'k': 'resolveComponent',
  'mt': 'onUnmounted', 'ot': 'onMounted', 'rr': 'toDisplayString', 'ut': 'onBeforeMount',
  'v': 'computed', 'x': 'createCommentVNode', 'y': 'createElementVNode',
};
const root = process.argv[2];
const files = [];
(function walk(d) {
  for (const e of fs.readdirSync(d, { withFileTypes: true })) {
    const p = path.join(d, e.name);
    if (e.isDirectory()) walk(p);
    else if (e.name.endsWith('.js')) files.push(p);
  }
})(root);
const stats = {};
for (const short of Object.keys(KNOWN)) stats[short] = { sigs: {}, samples: [] };

for (const f of files) {
  let src, ast;
  try { src = fs.readFileSync(f, 'utf8'); } catch { continue; }
  try { ast = P.parse(src, { sourceType: 'unambiguous' }); } catch { continue; }
  T(ast, {
    Program(p) {
      for (const [local, binding] of Object.entries(p.scope.bindings)) {
        if (binding.kind !== 'module') continue;
        const node = binding.path.node;
        if (!t.isImportSpecifier(node) || !t.isIdentifier(node.imported)) continue;
        const mod = binding.path.parentPath.node.source && binding.path.parentPath.node.source.value;
        if (!mod || !mod.includes('vue-i18n.runtime')) continue;
        const short = node.imported.name;
        if (!stats[short]) continue;
        for (const rp of binding.referencePaths) {
          const par = rp.parentPath;
          if (!((par.isCallExpression() || par.isOptionalCallExpression()) && par.node.callee === rp.node)) continue;
          const args = par.node.arguments;
          const sig = args.map(x => {
            if (t.isStringLiteral(x) || (t.isTemplateLiteral(x) && x.expressions.length === 0)) return 'str';
            if (t.isObjectExpression(x)) return 'obj';
            if (t.isArrayExpression(x)) return 'arr';
            if (t.isNumericLiteral(x)) return 'num';
            if (t.isIdentifier(x)) return 'id';
            if (t.isCallExpression(x)) return 'call';
            if (t.isMemberExpression(x)) return 'member';
            if (t.isArrowFunctionExpression(x) || t.isFunctionExpression(x)) return 'fn';
            if (t.isBooleanLiteral(x)) return 'bool';
            if (t.isNullLiteral(x)) return 'null';
            return x.type.replace(/(Expression|Literal)$/, '').toLowerCase();
          }).join(',') || '(none)';
          stats[short].sigs[sig] = (stats[short].sigs[sig] || 0) + 1;
          if (stats[short].samples.length < 2) {
            stats[short].samples.push(src.slice(par.node.start, Math.min(par.node.end, par.node.start + 80)).replace(/\n/g, ' '));
          }
        }
      }
    },
  });
}
console.log('短名 | 声称语义 | 主签名(次数) | 判定');
console.log('-'.repeat(100));
for (const [short, claim] of Object.entries(KNOWN)) {
  const st = stats[short];
  const sigs = Object.entries(st.sigs).sort((a, b) => b[1] - a[1]);
  if (!sigs.length) { console.log(`${short} | ${claim} | (未找到调用) | SKIP`); continue; }
  const [topSig, topN] = sigs[0];
  // 一致性判定
  const EXPECT = {
    'normalizeClass': /^(call|str|id|arr)/, 'unref': /^id/, 'renderSlot': /^member/, 'withCtx': /^fn/,
    'createTextVNode': /^(str|id|call)/, 'createElementBlock': /^str,obj,arr/, 'createElementVNode': /^str,obj/,
    'renderList': /^(arr|id),fn/, 'watch': /^(id|fn|arr),fn/, 'createBlock': /^(id|str),obj/,
    'Fragment': /^(none|[a-z])/, 'openBlock': /^\(none\)/, 'defineComponent': /^obj/,
    'resolveComponent': /^(str|id)/, 'onUnmounted': /^fn/, 'onMounted': /^fn/, 'toDisplayString': /^id/,
    'onBeforeMount': /^fn/, 'computed': /^fn/, 'createCommentVNode': /^str/,
  };
  const re = EXPECT[claim.split('|')[0]];
  const ok = re ? re.test(topSig) : false;
  console.log(`${short} | ${claim} | ${topSig} (${topN}/${Object.values(st.sigs).reduce((a,b)=>a+b,0)}) | ${ok ? 'OK' : 'MISMATCH'}`);
  if (!ok && st.samples[0]) console.log(`    样例: ${st.samples[0].slice(0, 90)}`);
}
