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
const GLOBALS = new Set(['window','document','globalThis','global','process','console','module','exports','require','__dirname','__filename','undefined','NaN','Infinity','self','top','parent','frames','location','navigator','history','screen','localStorage','sessionStorage','indexedDB','fetch','XMLHttpRequest','WebSocket','Worker','Element','Node','Event','CustomEvent','Promise','Symbol','Proxy','Reflect','Map','Set','WeakMap','WeakSet','Array','Object','String','Number','Boolean','Date','RegExp','Error','JSON','Math','Intl','Buffer','setTimeout','setInterval','clearTimeout','clearInterval','requestAnimationFrame','queueMicrotask','structuredClone','atob','btoa','crypto','performance','electron','ipcMain','ipcRenderer','shell','dialog','Menu','Tray','BrowserWindow','webContents','nativeImage','clipboard','protocol','net','systemPreferences','contextBridge','webFrame','MessageChannel','MessagePort','BroadcastChannel','AbortController','AbortSignal','URL','URLSearchParams','FormData','Blob','File','FileReader','TextEncoder','TextDecoder','EventTarget','ResizeObserver','IntersectionObserver','MutationObserver','HTMLElement','SVGElement','Image','Audio','Video','Storage','Cache']);
const COMPRESSED = /^[a-zA-Z]$|^[a-zA-Z][0-9]$|^[a-z]{2}$|^_0x[0-9a-f]+$/;
const IDENT = /^[A-Za-z_$][\w$]*$/;

const stats = { computed: 0, undef: 0, bool: 0, params: 0, locals: 0, forms: 0, callbacks: 0, byfunc: 0, files: 0 };

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

// ---- 回调位置命名 ----
const CALLBACK_MAP = {
  then: ['result'], catch: ['err'], map: ['item'], filter: ['item'],
  forEach: ['item'], find: ['item'], findIndex: ['item'], some: ['item'],
  every: ['item'], flatMap: ['item'], reduce: ['acc', 'cur'],
  reduceRight: ['acc', 'cur'], sort: ['left', 'right'], toSorted: ['left', 'right'],
  on: ['event'], once: ['event'], addEventListener: ['event'], subscribe: ['state'],
};
function applyCallbacks(ast) {
  let n = 0;
  traverse(ast, {
    CallExpression(pp) {
      const callee = pp.node.callee;
      let method = null;
      if (t.isMemberExpression(callee) && !callee.computed && t.isIdentifier(callee.property)) method = callee.property.name;
      else if (t.isIdentifier(callee)) method = callee.name;
      const cands = CALLBACK_MAP[method];
      if (!cands) return;
      for (const arg of pp.node.arguments) {
        if (!t.isArrowFunctionExpression(arg) && !t.isFunctionExpression(arg)) continue;
        const cbPath = pp.get('arguments').find(a => a.node === arg);
        if (!cbPath) continue;
        (arg.params || []).forEach((pr, idx) => {
          if (!t.isIdentifier(pr) || !COMPRESSED.test(pr.name)) return;
          const cand = cands[idx] || cands[0];
          if (!cand || KEYWORDS.has(cand) || cbPath.scope.hasBinding(cand)) return;
          try { cbPath.scope.rename(pr.name, cand); stats.callbacks++; n++; } catch {}
        });
      }
    },
  });
  return n;
}

// ---- await / new / ref 形态 ----
function deverb(name) {
  const m = name.match(/^(get|load|fetch|read|resolve|create|build|make|generate|compute|parse|format|normalize|find|query|list|select|extract|open|init)([A-Z]\w*)$/);
  return m ? m[2][0].toLowerCase() + m[2].slice(1) : null;
}
function applyForms(ast) {
  let n = 0;
  traverse(ast, {
    VariableDeclarator(pp) {
      const id = pp.node.id, init = pp.node.init;
      if (!t.isIdentifier(id) || !COMPRESSED.test(id.name) || !init) return;
      let cands = null;
      if (t.isAwaitExpression(init) && (t.isCallExpression(init.argument) || t.isOptionalCallExpression(init.argument))) {
        const callee = init.argument.callee;
        let fname = null;
        if (t.isIdentifier(callee)) fname = callee.name;
        else if (t.isMemberExpression(callee) && !callee.computed && t.isIdentifier(callee.property)) fname = callee.property.name;
        if (fname) {
          const d = deverb(fname);
          cands = d && d.length >= 4 ? [d, d + 'Data'] : (fname.length >= 6 ? [fname, fname + 'Data'] : null);
        }
      } else if (t.isNewExpression(init) && t.isIdentifier(init.callee)) {
        const cls = init.callee.name;
        if (cls.length >= 4) cands = [cls[0].toLowerCase() + cls.slice(1)];
      } else if (t.isCallExpression(init) && t.isIdentifier(init.callee) && /^(ref|shallowRef|reactive)$/.test(init.callee.name)) {
        const arg = init.arguments[0];
        if (!arg) cands = ['state'];
        else if (t.isArrayExpression(arg)) cands = [arg.elements.length ? 'list' : 'items'];
        else if (t.isObjectExpression(arg)) cands = ['state'];
        else if (t.isNullLiteral(arg)) cands = ['target'];
        else if (t.isBooleanLiteral(arg)) cands = ['flag'];
        else if (t.isStringLiteral(arg)) cands = ['label'];
        else if (t.isNumericLiteral(arg)) cands = ['counter'];
      }
      if (!cands) return;
      const sc = pp.scope;
      if (!sc.getOwnBinding(id.name)) return;
      for (const cand of cands) {
        if (!cand || KEYWORDS.has(cand) || GENERIC.has(cand)) continue;
        if (!/^[a-z][A-Za-z0-9]{2,28}$/.test(cand)) continue;
        if (sc.hasBinding(cand)) continue;
        try { sc.rename(id.name, cand); stats.forms++; n++; break; } catch {}
      }
    },
  });
  return n;
}

// ---- 名词/别名/方法结果命名 ----
const VERBS = /^(get|set|load|save|fetch|read|write|resolve|create|build|make|generate|compute|parse|format|normalize|find|query|list|select|extract|open|close|init|handle|process|update|delete|remove|add|run|start|stop|emit|register|sync|upload|download|analyze|capture|execute|post|put|patch|render|mount|unmount|watch|observe|track|merge|split|validate|verify|assert|ensure|apply|check|is|has|should|on|can|will|to|from|with|use|bind|unbind|toggle|show|hide|push|pop|insert|append|prepend|serialize|deserialize|encode|decode|encrypt|decrypt|copy|move|rename|link|unlink|exists|count|sum|calc|calculate|estimate|dedupe|dedup|redact|sanitize|escape|unescape|mask|unmask|persist|restore|backup|migrate|seed|reset|clear|flush|drain|poll|schedule|queue|dispatch|record|log|warn|error|debug|trace|notify|broadcast|relay|forward|proxy)/;
const METHOD_RESULT = {
  parse: ['parsed'], stringify: ['serialized'], join: ['joined'], split: ['parts'],
  trim: ['trimmed'], toLowerCase: ['lowercased'], toUpperCase: ['uppercased'],
  slice: ['part'], substring: ['part'], replace: ['replaced'], replaceAll: ['replaced'],
  filter: ['filtered'], map: ['mapped'], reduce: ['reduced'], find: ['found'],
  concat: ['combined'], toISOString: ['isoString'], keys: ['keyList'],
  values: ['valueList'], entries: ['entryList'], toString: ['text'],
};
function nounsFromFuncName(fn) {
  if (!fn || fn.length < 6) return [];
  let rest = fn, changed = true;
  while (changed) {
    changed = false;
    const m = rest.match(VERBS);
    if (m && m[0].length < rest.length) { rest = rest.slice(m[0].length); changed = true; }
  }
  if (!rest || rest.length < 3) return [];
  return rest.split(/(?=[A-Z])/).map(w => w.toLowerCase()).filter(w => w.length >= 3);
}
function applyByFunc(ast) {
  let n = 0;
  traverse(ast, {
    Function(pp) {
      const fnName = (pp.node.id && pp.node.id.name) || (t.isIdentifier(pp.node.key) ? pp.node.key.name : null) || (pp.node.key && t.isStringLiteral(pp.node.key) ? pp.node.key.value : null);
      if (!fnName) return;
      const nouns = nounsFromFuncName(fnName);
      if (!nouns.length) return;
      pp.node.params.forEach((pr, idx) => {
        if (!t.isIdentifier(pr) || !COMPRESSED.test(pr.name)) return;
        const noun = nouns[Math.min(idx, nouns.length - 1)];
        if (!noun) return;
        for (const cand of [noun, noun + 'Value', noun + 'Input']) {
          if (GLOBALS.has(cand) || KEYWORDS.has(cand)) continue;
          if (!/^[a-z][A-Za-z0-9]{2,28}$/.test(cand)) continue;
          if (pp.scope.hasBinding(cand)) continue;
          try { pp.scope.rename(pr.name, cand); stats.byfunc++; n++; break; } catch {}
        }
      });
    },
    VariableDeclarator(pp) {
      const { id, init } = pp.node;
      if (!t.isIdentifier(id) || !COMPRESSED.test(id.name) || !init) return;
      let cands = null;
      if (t.isIdentifier(init) && init.name !== id.name && !COMPRESSED.test(init.name) && init.name.length >= 4) {
        cands = [init.name, init.name + 'Alias'];
      } else if (t.isCallExpression(init) || t.isOptionalCallExpression(init)) {
        const callee = init.callee;
        if (t.isMemberExpression(callee) && !callee.computed && t.isIdentifier(callee.property)) {
          const mkey = callee.property.name;
          if (Object.prototype.hasOwnProperty.call(METHOD_RESULT, mkey)) cands = METHOD_RESULT[mkey];
        }
      }
      if (!cands) return;
      for (const cand of cands) {
        if (GLOBALS.has(cand) || KEYWORDS.has(cand)) continue;
        if (!/^[a-z][A-Za-z0-9]{2,28}$/.test(cand)) continue;
        if (pp.scope.hasBinding(cand)) continue;
        try { pp.scope.rename(id.name, cand); stats.byfunc++; n++; break; } catch {}
      }
    },
  });
  return n;
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

  // 5) await/new/ref 形态命名
  if (!only || only === 'forms') { n += applyForms(ast); }
  // 6) 回调位置命名
  if (!only || only === 'callbacks') { n += applyCallbacks(ast); }
  // 7) 名词/别名/方法结果命名
  if (!only || only === 'byfunc') { n += applyByFunc(ast); }

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
