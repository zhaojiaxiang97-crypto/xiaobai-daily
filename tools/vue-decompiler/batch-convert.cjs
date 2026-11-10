const fs=require('fs'),path=require('path');
const {parse,compileTemplate}=require('@vue/compiler-sfc');
const dir=process.argv[2];
const files=fs.readdirSync(dir).filter(f=>f.endsWith('.js'));
let ok=0,fail=0,empty=0;const fails=[];
for(const f of files){
  const out=require('child_process').execSync(`node ${__dirname}/convert-component.cjs ${path.join(dir,f)} 2>/dev/null`,{encoding:'utf8'}).trim();
  if(!out){empty++;continue;}
  const vue=`<template>\n${out}\n</template>\n<script setup>\n</script>\n`;
  try{
    const {descriptor,errors}=parse(vue,{filename:f});
    if(errors.length){fail++;fails.push([f,String(errors[0]).slice(0,70)]);continue;}
    const c=compileTemplate({source:descriptor.template.content,filename:f,id:'x'});
    if(c.errors.length){fail++;fails.push([f,String(c.errors[0]).slice(0,70)]);continue;}
    ok++;
  }catch(e){fail++;fails.push([f,String(e.message).slice(0,70)]);}
}
console.log(`组件总数 ${files.length}: 编译通过 ${ok}, 编译失败 ${fail}, 无模板 ${empty}`);
console.log('失败样例:'); fails.slice(0,6).forEach(([f,e])=>console.log(`  ${f}: ${e}`));
