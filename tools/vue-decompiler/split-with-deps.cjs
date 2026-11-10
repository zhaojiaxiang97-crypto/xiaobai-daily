// 正确的自由变量分析：用 scope.hasBinding 判断
const fs = require('fs');
const P = require('@babel/parser');
const T = require('@babel/traverse').default;
const t = require('@babel/types');

const [,, srcFile, outDir] = process.argv;
const src = fs.readFileSync(srcFile, 'utf8');
const ast = P.parse(src, { sourceType: 'unambiguous' });
fs.mkdirSync(outDir, { recursive: true });

const comps = [];
T(ast, {
  CallExpression(p) {
    const c = p.node.callee;
    const name = t.isIdentifier(c) ? c.name : (t.isMemberExpression(c) && !c.computed && t.isIdentifier(c.property) ? c.property.name : null);
    if (!name || !/^(defineComponent|j|o)$/.test(name)) return;
    const arg = p.node.arguments[0];
    if (!arg || !t.isObjectExpression(arg)) return;
    let compName = null;
    for (const prop of arg.properties) {
      if (t.isObjectProperty(prop)) {
        const k = t.isIdentifier(prop.key) ? prop.key.name : (t.isStringLiteral(prop.key) ? prop.key.value : null);
        if (k === '__name') {
          const v = prop.value;
          if (t.isStringLiteral(v)) compName = v.value;
          else if (t.isTemplateLiteral(v) && v.expressions.length === 0) compName = v.quasis[0].value.cooked;
        }
      }
    }
    if (!compName) return;
    const body = src.slice(arg.start, arg.end);

    // 正确分析：把组件追加到一个临时 Program，用 scope 判断绑定
    const fileAst = t.file(t.program([t.variableDeclaration('var', [
      t.variableDeclarator(t.identifier('__c'), t.cloneNode(arg, true, true))
    ])]));
    const free = new Set();
    T(fileAst, {
      Identifier(ip) {
        if (!ip.isReferencedIdentifier()) return;
        const nm = ip.node.name;
        // 判断在该引用处是否有绑定（含函数参数、局部变量）
        if (ip.scope.hasBinding(nm)) return;
        free.add(nm);
      },
    });
    comps.push({ name: compName, body, free: [...free] });
  },
});
const seen = new Set();
const uniq = comps.filter(c => { if (seen.has(c.name)) return false; seen.add(c.name); return true; });
console.log(`提取 ${uniq.length} 个组件`);
for (const c of uniq) {
  fs.writeFileSync(`${outDir}/${c.name}.js`, `// 组件: ${c.name}\n// 外部依赖(${c.free.length}): ${c.free.join(', ')}\nvar __component = ${c.body};\nexport default __component;\n`);
}
