// 组件生成器：render → template + props + 导入，输出 .vue
const fs = require('fs');
const { execSync } = require('child_process');
const file = process.argv[2];
const tplFile = '/tmp/tpl.txt';
// 复用转换器输出
const path = require('path');
try { execSync(`node "${path.join(__dirname,'render2tpl.cjs')}" "${file}" > ${tplFile} 2>/dev/null`); } catch {}
const tpl = fs.readFileSync(tplFile, 'utf8').trim();
if (!tpl || tpl === '(未转换)') { console.error('无模板'); process.exit(1); }
// 组件名
const src = fs.readFileSync(file, 'utf8');
const m = src.match(/__name:\s*[`'"]([\w-]+)[`'"]/);
const name = m ? m[1] : 'Component';
// props
const propsM = src.match(/props:\s*\{([\s\S]{0,600}?)\}\s*,\s*setup/);
let propsBlock = '';
if (propsM) {
  const body = propsM[1].trim();
  if (body) propsBlock = `defineProps({\n${body}\n})`;
}
// 提取 import（保留组件与工具的导入，去掉 Vue API 导入）
const imports = [];
const impRe = /import\s*\{([^}]+)\}\s*from\s*["']([^"']+)["'];?/g;
let im;
while ((im = impRe.exec(src))) {
  const from = im[2];
  if (from.includes('vue-i18n.runtime')) continue;
  const specs = im[1].split(',').map(x => x.trim()).filter(Boolean)
    .filter(x => !/^(createElement|render|unref|normalizeClass|toDisplayString|withCtx|openBlock|defineComponent|resolveComponent|computed|watch|onMounted|onUnmounted|onBeforeMount|Fragment)/.test(x.split(' as ').pop()));
  if (specs.length) imports.push(`import { ${specs.join(', ')} } from '${from}'`);
}
const vue = `<template>
${tpl}
</template>

<script setup>
${imports.join('\n')}
${propsBlock || '// 无 props'}
</script>
`;
const out = `/tmp/${name}.vue`;
fs.writeFileSync(out, vue);
console.log('生成:', out, vue.length, '字节');
console.log(vue.slice(0, 300));
