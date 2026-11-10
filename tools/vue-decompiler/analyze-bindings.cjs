// AST 级 import 绑定分析：解析每个 chunk 的 Vue API 绑定与真实引用（排除遮蔽）
const fs = require('fs');
const P = require('./node_modules/@babel/parser');
const T = require('./node_modules/@babel/traverse').default;
const t = require('./node_modules/@babel/types');

const file = process.argv[2];
const src = fs.readFileSync(file, 'utf8');
const ast = P.parse(src, { sourceType: 'unambiguous' });

const out = [];  // { short, local, refs, usage }
T(ast, {
  Program(p) {
    for (const [localName, binding] of Object.entries(p.scope.bindings)) {
      if (binding.kind !== 'module') continue;
      const node = binding.path.node;
      // ImportSpecifier: { S as i }
      if (!t.isImportSpecifier(node) || !t.isIdentifier(node.imported)) continue;
      const decl = binding.path.parentPath.node;
      const mod = decl.source && decl.source.value;
      if (!mod || !mod.includes('vue-i18n.runtime')) continue;
      // 真实引用（babel scope 已排除被遮蔽的同名局部变量）
      const refs = binding.referencePaths;
      const usage = { call: 0, member: 0, arg: 0, other: 0 };
      const patterns = [];
      for (const rp of refs) {
        const par = rp.parentPath;
        if ((par.isCallExpression() || par.isOptionalCallExpression()) && par.node.callee === rp.node) {
          usage.call++;
          if (patterns.length < 3) {
            const a = par.node.arguments;
            const sig = a.map(x => t.isStringLiteral(x) ? 'str' : t.isIdentifier(x) ? 'id' : x.type.replace('Expression','').toLowerCase()).join(',');
            patterns.push(sig);
          }
        } else if ((par.isMemberExpression() || par.isOptionalMemberExpression()) && par.node.object === rp.node) usage.member++;
        else if (par.isCallExpression() && par.node.arguments.includes(rp.node)) usage.arg++;
        else usage.other++;
      }
      out.push({ short: node.imported.name, local: localName, refs: refs.length, usage, patterns });
    }
  },
});
console.log(JSON.stringify(out.sort((a,b)=>b.refs-a.refs), null, 0));
