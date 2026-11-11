// 建立 (chunk 相对路径, 导出名) → 组件名 的映射
const fs = require('fs'), path = require('path');
const P = require('@babel/parser');
const T = require('@babel/traverse').default;
const t = require('@babel/types');

const root = process.argv[2];
const map = {};   // "ui/Switch.js::xt" -> "Switch"
let comps = 0, files = 0;

function walk(d) {
  for (const e of fs.readdirSync(d, { withFileTypes: true })) {
    const p = path.join(d, e.name);
    if (e.isDirectory()) walk(p);
    else if (e.name.endsWith('.js')) analyze(p);
  }
}
function analyze(file) {
  let src, ast;
  try { src = fs.readFileSync(file, 'utf8'); } catch { return; }
  try { ast = P.parse(src, { sourceType: 'unambiguous' }); } catch { return; }
  const rel = path.relative(root, file);
  files++;
  // 1) 收集 var X = defineComponent({__name:'Y'})
  const varToName = new Map();
  T(ast, {
    VariableDeclarator(p) {
      const { id, init } = p.node;
      if (!t.isIdentifier(id) || !init) return;
      const findName = n => {
        if (!n) return null;
        if (t.isCallExpression(n)) {
          for (const a of n.arguments) {
            if (t.isObjectExpression(a)) {
              for (const pr of a.properties) {
                if (t.isObjectProperty(pr) && t.isIdentifier(pr.key, { name: '__name' })) {
                  const v = pr.value;
                  const nm = t.isStringLiteral(v) ? v.value
                    : (t.isTemplateLiteral(v) && v.expressions.length === 0 ? v.quasis[0].value.cooked : null);
                  if (nm) return nm;
                }
              }
            }
            const inner = findName(a);
            if (inner) return inner;
          }
        }
        return null;
      };
      const nm = findName(init);
      if (nm) { varToName.set(id.name, nm); comps++; }
    },
  });
  // 2) export { X as Y } → map["rel::Y"] = varToName.get(X)
  T(ast, {
    ExportNamedDeclaration(p) {
      for (const sp of p.node.specifiers) {
        if (!t.isExportSpecifier(sp) || !t.isIdentifier(sp.local) || !t.isIdentifier(sp.exported)) continue;
        const nm = varToName.get(sp.local.name);
        if (nm) map[`${rel}::${sp.exported.name}`] = nm;
      }
    },
  });
}

walk(root);
fs.writeFileSync(process.argv[3], JSON.stringify(map, null, 1));
console.error(`扫描 ${files} 个 chunk，组件 ${comps} 个，导出映射 ${Object.keys(map).length} 条`);
