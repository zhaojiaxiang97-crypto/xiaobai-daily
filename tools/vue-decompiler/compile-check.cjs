const { parse, compileTemplate } = require('@vue/compiler-sfc');
const fs = require('fs');
for (const f of process.argv.slice(2)) {
  const src = fs.readFileSync(f, 'utf8');
  const { descriptor, errors } = parse(src, { filename: f });
  if (errors.length) { console.log(`❌ ${f}: SFC 解析失败`, String(errors[0]).slice(0,120)); continue; }
  const c = compileTemplate({ source: descriptor.template.content, filename: f, id: 'x' });
  if (c.errors.length) { console.log(`❌ ${f}: 模板编译失败`, String(c.errors[0]).slice(0,150)); continue; }
  console.log(`✅ ${f}: 解析+编译 OK (${c.code.length}B)`);
}
