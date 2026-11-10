#!/usr/bin/env node
// main bundle → Vue 工程（declarator 粒度切分）
const fs=require('fs'), path=require('path');
const {execFileSync}=require('child_process');
const P=require('@babel/parser'), T=require('@babel/traverse').default, t=require('@babel/types');
const G=require('@babel/generator').default;

const [,, mainFile, convPath, outDir] = process.argv;
const src=fs.readFileSync(mainFile,'utf8');
const ast=P.parse(src,{sourceType:'unambiguous'});

const VUE_API_MAP={'$n':'normalizeClass','An':'unref','Ct':'renderSlot','O':'createTextVNode','S':'createElementBlock','St':'renderList','Wt':'watch','b':'createBlock','c':'Fragment','gt':'openBlock','j':'defineComponent','mt':'onUnmounted','ot':'onMounted','rr':'toDisplayString','ut':'onBeforeMount','v':'computed','x':'createCommentVNode','y':'createElementVNode','H':'createElementVNode','D':'createStaticVNode','A':'defineAsyncComponent','Bn':'isArray'};
const SEM=new Set(['openBlock','createElementBlock','createElementVNode','createBlock','createVNode','createTextVNode','createCommentVNode','createStaticVNode','renderSlot','renderList','normalizeClass','toDisplayString','unref','withCtx','withDirectives','defineComponent','resolveComponent','Fragment','computed','watch','onMounted','onUnmounted','onBeforeMount','isArray','defineAsyncComponent','ref','reactive','nextTick','inject','provide','h','toRef','toRefs']);

const ranges=[];
T(ast,{CallExpression(p){
  const c=p.node.callee; const nm=t.isIdentifier(c)?c.name:null;
  if(!nm) return;
  const sem=VUE_API_MAP[nm]||(SEM.has(nm)?nm:null);
  if(sem!=='defineComponent') return;
  const arg=p.node.arguments[0];
  if(!arg||!t.isObjectExpression(arg)) return;
  if(arg.properties.some(pr=>t.isObjectProperty(pr)&&((t.isIdentifier(pr.key)&&pr.key.name==='__name')||(t.isStringLiteral(pr.key)&&pr.key.value==='__name')))) ranges.push([p.node.start,p.node.end]);
}});
const inComp=(s,e)=>ranges.some(([a,b])=>s<b&&e>a);

const importMap={};
T(ast,{ImportDeclaration(p){
  const from=p.node.source.value;
  for(const sp of p.node.specifiers){
    if(t.isImportSpecifier(sp)&&t.isIdentifier(sp.local)&&t.isIdentifier(sp.imported)) importMap[sp.local.name]={imported:sp.imported.name,from};
    else if(t.isImportDefaultSpecifier(sp)&&t.isIdentifier(sp.local)) importMap[sp.local.name]={imported:'default',from};
  }
}});

const kept=[]; const sharedNames=new Set(); let dropped=0;
T(ast,{
  VariableDeclaration(p){
    if(!p.parentPath.isProgram()) return;
    const normal=p.node.declarations.filter(d=>!inComp(d.start,d.end));
    dropped += p.node.declarations.length - normal.length;
    if(!normal.length) return;
    try{
      kept.push(G(t.variableDeclaration(p.node.kind, normal.map(d=>t.cloneNode(d,true,true))),{compact:false,comments:true,jsescOption:{minimal:true}}).code);
      for(const d of normal) if(t.isIdentifier(d.id)) sharedNames.add(d.id.name);
    }catch{}
  },
  FunctionDeclaration(p){
    if(!p.parentPath.isProgram()||!p.node.id) return;
    if(inComp(p.node.start,p.node.end)){ dropped++; return; }
    kept.push(src.slice(p.node.start,p.node.end));
    sharedNames.add(p.node.id.name);
  },
});

const comps=[];
T(ast,{CallExpression(p){
  if(!ranges.some(([a,b])=>p.node.start>=a&&p.node.end<=b)) return;
  const c=p.node.callee; const nm=t.isIdentifier(c)?c.name:null;
  if(!nm) return;
  const sem=VUE_API_MAP[nm]||(SEM.has(nm)?nm:null);
  if(sem!=='defineComponent') return;
  const arg=p.node.arguments[0];
  if(!arg||!t.isObjectExpression(arg)) return;
  let name=null;
  for(const pr of arg.properties){
    if(t.isObjectProperty(pr)&&t.isIdentifier(pr.key,{name:'__name'})){
      const v=pr.value;
      name=t.isStringLiteral(v)?v.value:(t.isTemplateLiteral(v)&&v.expressions.length===0?v.quasis[0].value.cooked:null);
    }
  }
  if(name) comps.push({name, start:arg.start, end:arg.end});
}});

fs.mkdirSync(outDir+'/src/components',{recursive:true});
fs.mkdirSync(outDir+'/src/vendor',{recursive:true});

let body=kept.join('\n\n');
const baseIndex={};
(function walk(d,rel){
  for(const e of fs.readdirSync(d,{withFileTypes:true})){
    const p2=path.join(d,e.name), r2=rel?rel+'/'+e.name:e.name;
    if(e.isDirectory()) walk(p2,r2); else baseIndex[e.name]='./vendor/'+r2;
  }
})(path.dirname(path.dirname(mainFile)),'');
body=body.replace(/(["'`])(\.\.?\/[^"'`]+\.(?:js|css|webp|png|jpg|ico|ogg))\1/g,(m,q,ref)=>{
  const base=ref.split('/').pop();
  const hit=baseIndex[base];
  if(hit) return q+hit+q;
  return q+'./vendor/_removed.js'+q;
});
try{
  const ast2=P.parse(body,{sourceType:'module'});
  let n=0;
  T(ast2,{Identifier(ip){
    if(!ip.isReferencedIdentifier()) return;
    const nm2=ip.node.name;
    if(!SEM.has(nm2)) return;
    const par=ip.parentPath;
    if((par.isMemberExpression()||par.isOptionalMemberExpression())&&par.node.property===ip.node&&!par.node.computed) return;
    if(par.isObjectProperty()&&par.node.key===ip.node&&!par.node.computed) return;
    if(par.isVariableDeclarator()&&par.node.id===ip.node) return;
    ip.replaceWith(t.memberExpression(t.identifier('__vue'),t.identifier(nm2))); n++;
  }});
  if(n) body=G(ast2,{compact:false,jsescOption:{minimal:true}}).code;
  console.error('Vue API 改写:',n);
}catch(e){ console.error('Vue 改写失败:',String(e.message).slice(0,50)); }

const crossImports=[]; const crossExport=[];
for(const [local,info] of Object.entries(importMap)){
  const isRT=/vue-i18n\.runtime/.test(info.from||'');
  if(SEM.has(local)) continue;
  if(isRT && (VUE_API_MAP[info.imported]||SEM.has(info.imported))) continue;
  let rel=info.from||'';
  if(rel.startsWith('../')) rel='./vendor/'+rel.slice(3);
  else if(rel.startsWith('./')) rel='./vendor/chunks/'+rel.slice(2);
  else rel='./vendor/'+rel;
  // shared 自身也声明了这个名字 → 重命名 import 避免冲突
  let target=local;
  if(sharedNames.has(local)){
    target='__imp_'+local;
    body=body.replace(new RegExp('(?<![\\w$.`])'+local+'(?![\\w$])','g'), target);
  }
  const spec=info.imported==='default'?`default as ${target}`:(info.imported===target?target:`${info.imported} as ${target}`);
  crossImports.push(`import { ${spec} } from '${rel}';`);
  crossExport.push(`export { ${target} };`);
}
const sharedCode='// 自动生成：main bundle 共享符号（declarator 粒度切分）\nimport * as __vue from \'vue\';\n'+crossImports.join('\n')+'\n\n'+body+'\n\n'+[...sharedNames].filter(n=>/^[A-Za-z_$][\w$]*$/.test(n)).map(n=>'export { '+n+' };').join('\n')+'\n'+crossExport.join('\n')+'\n';
fs.writeFileSync(outDir+'/src/shared.js',sharedCode);
fs.writeFileSync(outDir+'/src/vendor/_removed.js','export default {};\n');
console.error('shared.js '+(sharedCode.length/1024/1024).toFixed(1)+' MB, 符号 '+sharedNames.size+', 剔除组件声明 '+dropped);

let made=0; const seen=new Set();
for(const c of comps){
  if(seen.has(c.name)) continue;
  seen.add(c.name);
  const tmp='/tmp/_c_'+c.name+'.js';
  fs.writeFileSync(tmp, 'var __c = ' + src.slice(c.start, c.end) + ';\nexport default {};\n');
  let tpl='';
  try{ tpl=execFileSync('node',[convPath,tmp],{encoding:'utf8'}).trim(); }catch(e){}
  if(!tpl) continue;
  const vueDeps=[...SEM].filter(a=>new RegExp('(?<![\\w$])'+a+'\\s*\\(').test(tpl));
  const otherDeps=Object.entries(importMap).filter(([l,inf])=>!/vue-i18n\.runtime/.test(inf.from||'')&&new RegExp('(?<![\\w$])'+l+'(?![\\w$])').test(tpl));
  let script='';
  if(vueDeps.length) script+='import { '+[...new Set(vueDeps)].join(', ')+" } from 'vue';\n";
  if(otherDeps.length) script+='import { '+otherDeps.map(([l,inf])=>inf.imported===l?l:inf.imported+' as '+l).join(', ')+" } from '../shared.js';\n";
  fs.writeFileSync(outDir+'/src/components/'+c.name+'.vue','<template>\n'+tpl+'\n</template>\n\n<script setup>\n'+script+'</script>\n');
  made++;
}
console.error('生成组件: '+made);
