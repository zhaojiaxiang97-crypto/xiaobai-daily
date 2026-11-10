// 从 main bundle 提取内联组件为独立文件（不改原文件）
const fs = require('fs');
const path = require('path');
const P = require('@babel/parser');
const T = require('@babel/traverse').default;
const G = require('@babel/generator').default;
const t = require('@babel/types');

const [,, srcFile, outDir] = process.argv;
const src = fs.readFileSync(srcFile, 'utf8');
const ast = P.parse(src, { sourceType: 'unambiguous' });
fs.mkdirSync(outDir, { recursive: true });

// 收集：组件定义（defineComponent 调用）
const comps = [];
T(ast, {
  CallExpression(p) {
    const c = p.node.callee;
    const name = t.isIdentifier(c) ? c.name : (t.isMemberExpression(c) && !c.computed && t.isIdentifier(c.property) ? c.property.name : null);
    if (!name || !/^(defineComponent|j|o)$/.test(name)) return;
    const arg = p.node.arguments[0];
    if (!arg || !t.isObjectExpression(arg)) return;
    // 找 __name
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
    // 提取组件体（只取 ObjectExpression 部分）
    const body = src.slice(arg.start, arg.end);
    // 依赖分析：组件体内引用的自由变量
    const free = new Set();
    const local = new Set();
    T(t.file(t.program([t.expressionStatement(t.cloneNode(arg))])), {
      Program(pp) {
        for (const [id, b] of Object.entries(pp.scope.bindings)) local.add(id);
      },
      Identifier(ip) {
        if (!ip.isReferencedIdentifier()) return;
        const nm = ip.node.name;
        if (local.has(nm)) return;
        free.add(nm);
      },
    });
    comps.push({ name: compName, body, free: [...free], start: p.node.start, end: p.node.end });
  },
});

// 去重（同名取第一个）
const seen = new Set();
const uniq = comps.filter(c => { if (seen.has(c.name)) return false; seen.add(c.name); return true; });
console.log(`提取组件: ${uniq.length}（原始 ${comps.length}）`);

// 写文件
for (const c of uniq) {
  const freeVars = c.free.filter(v => !/^(window|document|console|Object|Array|String|Number|Boolean|JSON|Math|Date|Error|Promise|Map|Set|Symbol|Reflect|Proxy|undefined|null|true|false|this|arguments|NaN|Infinity|globalThis|process|require|module|exports|import|eval|void|typeof|function|class|new|delete|in|of|instanceof|return|if|else|for|while|switch|case|break|continue|try|catch|finally|throw|var|let|const|yield|await|async|default|extends|super|do|with|enum|implements|interface|package|private|protected|public|static)$/.test(v));
  const content = `// 自动提取自 main bundle（round-0413）
// 组件: ${c.name}
// 外部依赖: ${freeVars.length} 个自由变量
// ${freeVars.slice(0, 20).join(', ')}
var __component = ${c.body};
export default __component;
`;
  fs.writeFileSync(path.join(outDir, `${c.name}.js`), content);
}
// 清单
fs.writeFileSync(path.join(outDir, '_index.json'), JSON.stringify(uniq.map(c => ({ name: c.name, free: c.free.length })), null, 1));
console.log('已写入', outDir);
