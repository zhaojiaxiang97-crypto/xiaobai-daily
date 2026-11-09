#!/usr/bin/env node
// 反混淆统一入口：对所有 src/**/*.js 应用一组语义等价转换。
// 用法: node tools/deobf.cjs [--only=computed|params|locals|final] [--dry]
// 依赖: npm i @babel/parser @babel/traverse @babel/generator @babel/types
const fs = require('fs');
const path = require('path');
const P = require('@babel/parser');
const traverse = require('@babel/traverse').default;
const generate = require('@babel/generator').default;
const t = require('@babel/types');

const argv = process.argv.slice(2);
const only = (argv.find(a => a.startsWith('--only=')) || '').split('=')[1] || null;
const dry = argv.includes('--dry');
const ROOT = path.resolve(__dirname, '..', 'src');

const KEYWORDS = new Set(['debugger','default','class','function','delete','new','in','do','if','else','for','while','switch','case','break','continue','return','throw','try','catch','finally','var','let','const','typeof','instanceof','of','this','super','extends','implements','interface','package','private','protected','public','static','yield','await','enum','export','import','with','void','null','true','false','async','arguments','eval','window','document','globalThis','require','module','exports']);
const GENERIC = new Set(['value','target','currentTarget','data','type','name','length','size','width','height','left','right','top','bottom','x','y','z','key','code','style','items','children','parent','toString','then','call','apply','bind','id','url','status','text','json','error','message','result','count','index','start','end','map','filter','find','slice','push','pop','shift','unshift','splice','concat','join','split','replace','trim','includes','indexOf','forEach','some','every','reduce','sort','reverse','test','exec','match','matchAll','search','charAt','charCodeAt','at','raw','constructor','prototype']);
const COMPRESSED = /^[a-zA-Z]$|^[a-zA-Z][0-9]$|^[a-z]{2}$|^_0x[0-9a-f]+$/;
const IDENT = /^[A-Za-z_$][\w$]*$/;

const stats = { computed: 0, undef: 0, bool: 0, params: 0, locals: 0, files: 0 };

// ---- 参数画像 ----
function inferParam(paramName, fnPath) {
  const props = new Set(), methods = new Set();
  let called = false, indexed = false, lenCmp = false, spread = false;
  fnPath.traverse({
    Identifier(pp) {
      if (pp.node.name !== paramName) return;
      const parent = pp.parentPath;
      if ((parent.isMemberExpression() || parent.isOptionalMemberExpression()) && parent.node.object === pp.node) {
        const k = parent.node.computed ? null : (t.isIdentifier(parent.node.property) ? parent.node.property.name : null);
        if (k) {
          const gp = parent.parentPath;
          if ((gp.isCallExpression() || gp.isOptionalCallExpression()) && gp.node.callee === parent.node) methods.add(k);
          else { props.add(k); if (k === 'length' || k === 'size') lenCmp = true; }
        }
      } else if ((parent.isCallExpression() || parent.isOptionalCallExpression()) && parent.node.callee === pp.node) called = true;
      else if (parent.isMemberExpression() && parent.node.object === pp.node && parent.node.computed) indexed = true;
      else if (parent.isSpreadElement()) spread = true;
    },
  });
  const has = (...ks) => ks.some(k => props.has(k) || methods.has(k));
  if (has('preventDefault','stopPropagation','clientX','clientY','key','code','target','currentTarget','shiftKey','metaKey','altKey','ctrlKey')) return 'event';
  if (has('getAttribute','setAttribute','classList','getBoundingClientRect','appendChild','querySelector','style','dataset','parentElement','innerHTML','textContent')) return 'el';
  if (has('map','filter','reduce','find','some','every','forEach','push','concat','slice','indexOf') || (spread && indexed)) return 'items';
  if (has('toLowerCase','toUpperCase','startsWith','endsWith','trim','split','padStart','padEnd','replaceAll')) return 'text';
  if (has('ok','headers') && has('json','text','status')) return 'response';
  if (has('id') && has('createdAt','updatedAt','created_at','updated_at')) return 'row';
  if (props.has('data') && props.has('error')) return 'result';
  if (lenCmp && !indexed) return 'count';
  if (called) return 'fn';
  if (has('options','config','settings','mode','enabled','muted')) return 'options';
  return null;
}

function processFile(file) {
  let src;
  try { src = fs.readFileSync(file, 'utf8'); } catch { return; }
  if (!/\[\s*["'`]|void 0|!0|!1|\\x[0-9a-fA-F]{2}|\\u[0-9a-fA-F]{4}/.test(src)) return;
  let ast;
  try { ast = P.parse(src, { sourceType: 'unambiguous' }); } catch { console.error('parse fail:', file); return; }
  let n = 0;

  // 1) 括号属性 → 点访问
  if (!only || only === 'computed') {
    traverse(ast, {
      MemberExpression(pp) {
        const nd = pp.node;
        if (!nd.computed || !t.isStringLiteral(nd.property) || !IDENT.test(nd.property.value)) return;
        nd.property = t.identifier(nd.property.value); nd.computed = false; stats.computed++; n++;
      },
      OptionalMemberExpression(pp) {
        const nd = pp.node;
        if (!nd.computed || !t.isStringLiteral(nd.property) || !IDENT.test(nd.property.value)) return;
        nd.property = t.identifier(nd.property.value); nd.computed = false; stats.computed++; n++;
      },
    });
  }

  // 2) void 0 / !0 / !1 / 字符串转义
  if (!only || only === 'final') {
    traverse(ast, {
      UnaryExpression(pp) {
        const nd = pp.node;
        if (nd.operator === 'void' && t.isNumericLiteral(nd.argument, { value: 0 })) { pp.replaceWith(t.identifier('undefined')); stats.undef++; n++; }
        else if (nd.operator === '!' && t.isNumericLiteral(nd.argument) && (nd.argument.value === 0 || nd.argument.value === 1)) { pp.replaceWith(t.booleanLiteral(nd.argument.value === 0)); stats.bool++; n++; }
      },
      StringLiteral(pp) { if (pp.node.extra) { delete pp.node.extra; n++; } },
    });
  }

  // 3) 参数语义化
  if (!only || only === 'params') {
    traverse(ast, {
      Function(pp) {
        if (!pp.node.params.length || pp.node.params.length > 6) return;
        const used = new Set(Object.keys(pp.scope.bindings));
        for (const param of pp.node.params) {
          if (!t.isIdentifier(param) || !COMPRESSED.test(param.name)) continue;
          if (!pp.scope.getOwnBinding(param.name)) continue;
          const cand = inferParam(param.name, pp);
          if (!cand || KEYWORDS.has(cand) || used.has(cand) || pp.scope.hasBinding(cand)) continue;
          try { pp.scope.rename(param.name, cand); stats.params++; used.add(cand); n++; } catch {}
        }
      },
    });
  }

  // 4) 局部变量按 prop 形态命名
  if (!only || only === 'locals') {
    traverse(ast, {
      VariableDeclarator(pp) {
        const { id, init } = pp.node;
        if (!t.isIdentifier(id) || !COMPRESSED.test(id.name)) return;
        if (!t.isMemberExpression(init) || init.computed || !t.isIdentifier(init.property)) return;
        const prop = init.property.name;
        if (prop.length < 4 || GENERIC.has(prop) || KEYWORDS.has(prop)) return;
        const cand = prop[0].toLowerCase() + prop.slice(1);
        if (pp.scope.hasBinding(cand) || !pp.scope.getOwnBinding(id.name)) return;
        try { pp.scope.rename(id.name, cand); stats.locals++; n++; } catch {}
      },
    });
  }

  if (n > 0 && !dry) {
    fs.writeFileSync(file, generate(ast, { compact: false, comments: true, jsescOption: { minimal: true } }).code);
    stats.files++;
  }
}

(function walk(dir) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p);
    else if (e.name.endsWith('.js') || e.name.endsWith('.cjs')) processFile(p);
  }
})(ROOT);
console.log(JSON.stringify(stats, null, 2));
