#!/usr/bin/env node
// 组件注册表生成器：建立 变量名 → 组件 __name 映射（用于还原 <component :is="YM"/>）
// 用法: node tools/vue-decompiler/registry.cjs <srcDir> <outJson>
const fs = require('fs');
const path = require('path');
const P = require('@babel/parser');
const T = require('@babel/traverse').default;
const t = require('@babel/types');

const root = process.argv[2];
const outFile = process.argv[3] || '/tmp/registry.json';
const files = [];
(function walk(d) {
  for (const e of fs.readdirSync(d, { withFileTypes: true })) {
    const p = path.join(d, e.name);
    if (e.isDirectory()) walk(p);
    else if (e.name.endsWith('.js')) files.push(p);
  }
})(root);

const registry = {};       // localVarName -> { component, file }
const exportsByFile = {};  // file -> { exportedName: componentName }

for (const f of files) {
  let src, ast;
  try { src = fs.readFileSync(f, 'utf8'); } catch { continue; }
  try { ast = P.parse(src, { sourceType: 'unambiguous' }); } catch { continue; }
  const rel = path.relative(root, f);
  T(ast, {
    VariableDeclarator(p) {
      const { id, init } = p.node;
      if (!t.isIdentifier(id) || !init) return;
      if (!(t.isCallExpression(init) || t.isOptionalCallExpression(init))) return;
      if (!t.isIdentifier(init.callee, { name: 'defineComponent' })) return;
      const arg = init.arguments[0];
      if (!arg || !t.isObjectExpression(arg)) return;
      let compName = null;
      for (const prop of arg.properties) {
        if (t.isObjectProperty(prop) && t.isIdentifier(prop.key, { name: '__name' })) {
          const v = prop.value;
          compName = t.isStringLiteral(v) ? v.value
                   : (t.isTemplateLiteral(v) && v.expressions.length === 0 ? v.quasis[0].value.cooked : null);
        }
      }
      if (!compName) return;
      registry[id.name] = { component: compName, file: rel };
    },
    ExportNamedDeclaration(p) {
      for (const sp of p.node.specifiers) {
        if (t.isExportSpecifier(sp) && t.isIdentifier(sp.local) && t.isIdentifier(sp.exported)) {
          const reg = registry[sp.local.name];
          if (reg) (exportsByFile[rel] = exportsByFile[rel] || {})[sp.exported.name] = reg.component;
        }
      }
    },
  });
}
fs.writeFileSync(outFile, JSON.stringify({ registry, exportsByFile }, null, 1));
console.error(`注册组件 ${Object.keys(registry).length} 个 → ${outFile}`);
