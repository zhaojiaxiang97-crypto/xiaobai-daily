#!/usr/bin/env node
// 反向启发式命名器（round-0405~0407 验证有效的规则集合）
//
// 与 deobf.cjs 的区别：deobf.cjs 从「赋值右侧表达式」推断；本工具从
// 「变量的使用目标」反推，且所有候选都带后缀变体以规避绑定冲突。
//
// 用法: node tools/deobf-rules.cjs <文件> [--suffix-only] [--imports]
//   依赖: npm i @babel/parser @babel/traverse @babel/generator @babel/types
//
// 适用范围（实测边界，务必遵守）：
//   - 主进程 src/main/**：可安全使用全部规则（含 import 别名）
//   - 前端 src/renderer/**：仅 --suffix-only 且只处理函数内局部变量；
//     禁止改 import 别名与函数参数（会破坏 Vue 渲染，见 docs/ARCHITECTURE.md）
const fs = require('fs');
const P = require('@babel/parser');
const T = require('@babel/traverse').default;
const G = require('@babel/generator').default;
const t = require('@babel/types');

const [, , file, ...flags] = process.argv;
const suffixOnly = flags.includes('--suffix-only');
const doImports = flags.includes('--imports');

const src = fs.readFileSync(file, 'utf8');
const ast = P.parse(src, { sourceType: 'unambiguous' });

const NAME = /^_0x[0-9a-f]+$/;
const GLOBALS = new Set(['window','document','global','globalThis','process','console','module','exports',
  'require','undefined','NaN','Infinity','fetch','Promise','Symbol','Map','Set','Array','Object','String',
  'Number','Boolean','Date','RegExp','Error','JSON','Math','Intl','Buffer','event','items','text','props',
  'ctx','emit','attrs','slots','ref','computed','watch','el','id','ok','key','url','api','app','use',
  'nextTick','value','data','error','result','row','options','response','count','fn','fs','os','path','crypto']);
const KEYWORDS = new Set(['debugger','default','class','function','delete','new','in','do','if','else','for',
  'while','switch','case','break','continue','return','throw','try','catch','finally','var','let','const',
  'typeof','instanceof','of','this','super','extends','implements','interface','package','private',
  'protected','public','static','yield','await','enum','export','import','with','void','null','true',
  'false','async','arguments','eval']);
const SUFFIXES = ['', 'Value', 'Input', 'Arg', 'Data', 'Result', 'Item', 'Info', 'Ref'];

const used = new Set();
T(ast, { Program(p) { for (const k of Object.keys(p.scope.bindings)) used.add(k); } });

function renameWithSuffix(scope, old, stems) {
  if (!NAME.test(old) || !scope.getOwnBinding(old)) return false;
  for (const stem of stems) {
    if (!stem) continue;
    for (const suf of SUFFIXES) {
      const c = stem + suf;
      if (!c || GLOBALS.has(c) || KEYWORDS.has(c) || used.has(c) || scope.hasBinding(c)) continue;
      if (!/^[a-z][A-Za-z0-9]{2,28}$/.test(c)) continue;
      try { scope.rename(old, c); used.add(c); return true; } catch {}
    }
  }
  return false;
}

// ---- 画像 ----
const profile = new Map();
const prof = n => { if (!profile.has(n)) profile.set(n, { props: new Set(), methods: new Set(), initProp: null, callName: null, fnName: null, assignedProps: [] }); return profile.get(n); };
T(ast, {
  VariableDeclarator(p) {
    const { id, init } = p.node;
    if (!t.isIdentifier(id)) return;
    const i = prof(id.name);
    if (!init) return;
    if (t.isMemberExpression(init) && !init.computed && t.isIdentifier(init.property)) i.initProp = init.property.name;
    const calleeOf = node => {
      if (!node) return null;
      const c = node.callee;
      if (!c) return null;
      if (t.isIdentifier(c)) return c.name;
      if (t.isMemberExpression(c) && !c.computed && t.isIdentifier(c.property)) return c.property.name;
      return null;
    };
    if (t.isCallExpression(init) || t.isOptionalCallExpression(init)) i.callName = calleeOf(init);
    if (t.isAwaitExpression(init) && t.isCallExpression(init.argument)) i.callName = calleeOf(init.argument);
  },
  Function(p) {
    const fn = (p.node.id && p.node.id.name) || (t.isIdentifier(p.node.key) ? p.node.key.name : null);
    for (const pr of p.node.params) if (t.isIdentifier(pr)) prof(pr.name).fnName = fn;
  },
  AssignmentExpression(p) {
    const { left, right } = p.node;
    if (t.isIdentifier(right) && NAME.test(right.name) && t.isMemberExpression(left) && !left.computed && t.isIdentifier(left.property)) {
      prof(right.name).assignedProps.push(left.property.name);
    }
  },
  ObjectProperty(p) {
    const { key, value } = p.node;
    if (!t.isIdentifier(value) || !NAME.test(value.name)) return;
    const k = t.isIdentifier(key) ? key.name : (t.isStringLiteral(key) ? key.value : null);
    if (k) prof(value.name).assignedProps.push(k);
  },
  Identifier(p) {
    if (!p.isReferencedIdentifier() || !profile.has(p.node.name)) return;
    const par = p.parentPath;
    if ((par.isMemberExpression() || par.isOptionalMemberExpression()) && par.node.object === p.node && !par.node.computed && t.isIdentifier(par.node.property)) {
      const i = prof(p.node.name);
      const gp = par.parentPath;
      if ((gp.isCallExpression() || gp.isOptionalCallExpression()) && gp.node.callee === par.node) i.methods.add(par.node.property.name);
      else i.props.add(par.node.property.name);
    }
  },
});
const ENTITY = [
  [['preventDefault','stopPropagation','clientX','clientY','shiftKey','ctrlKey'], 'event'],
  [['getAttribute','classList','getBoundingClientRect','appendChild'], 'el'],
  [['map','filter','reduce','find','forEach','push'], 'items'],
  [['toLowerCase','toUpperCase','startsWith','trim','split'], 'text'],
  [['ok','headers'], 'response'],
  [['id','createdAt'], 'row'],
  [['data','error'], 'result'],
  [['options','config','settings'], 'options'],
];
const DEVERB = /^(get|load|fetch|read|resolve|create|build|make|generate|compute|parse|format|normalize|find|query|list|select|extract|open|init|handle|process|update|delete|remove|add|run|start|stop|emit|register|sync|analyze|capture|execute|render|watch|observe|track|merge|split|validate|verify|assert|ensure|apply|check|is|has|should|on|toggle|reset|clear|flush|poll|schedule|dispatch|record|notify)([A-Z]\w*)$/;
const VERBS = /^(get|set|load|save|fetch|read|write|resolve|create|build|make|generate|compute|parse|format|normalize|find|query|list|select|extract|open|close|init|handle|process|update|delete|remove|add|run|start|stop|emit|register|sync|upload|download|analyze|capture|execute|post|put|patch|render|mount|unmount|watch|observe|track|merge|split|validate|verify|assert|ensure|apply|check|is|has|should|on|toggle|serialize|deserialize|encode|decode|encrypt|decrypt|copy|move|rename|link|unlink|exists|count|sum|calc|reset|clear|flush|poll|schedule|queue|dispatch|record|log|notify)/;
function nounsOf(fn) {
  if (!fn || fn.length < 6) return [];
  let rest = fn, changed = true;
  while (changed) { changed = false; const m = rest.match(VERBS); if (m && m[0].length < rest.length) { rest = rest.slice(m[0].length); changed = true; } }
  if (!rest || rest.length < 3) return [];
  return rest.split(/(?=[A-Z])/).map(w => w.toLowerCase()).filter(w => w.length >= 3);
}

let applied = 0;
if (!suffixOnly) {
  T(ast, {
    Scope(p) {
      for (const [name, b] of Object.entries(p.scope.bindings)) {
        if (!NAME.test(name) || b.scope !== p.scope) continue;
        const i = profile.get(name);
        if (!i) continue;
        const stems = [];
        for (const [keys, ent] of ENTITY) {
          if (keys.some(k => i.props.has(k) || i.methods.has(k))) { stems.push(ent); break; }
        }
        // 属性名反向（本项目收益最高的单条规则）
        if (i.assignedProps.length) {
          const freq = {};
          for (const c of i.assignedProps) freq[c] = (freq[c] || 0) + 1;
          const best = Object.entries(freq).sort((a, b) => b[1] - a[1])[0][0];
          if (/^[a-z][A-Za-z0-9]{2,28}$/.test(best)) stems.push(best);
        }
        if (i.initProp && /^[a-z][A-Za-z0-9]{2,28}$/.test(i.initProp)) stems.push(i.initProp);
        if (i.callName) { const m = i.callName.match(DEVERB); if (m && m[2].length >= 4) stems.push(m[2][0].toLowerCase() + m[2].slice(1)); }
        const nos = nounsOf(i.fnName);
        if (nos.length) stems.push(nos[0]);
        if (stems.length && renameWithSuffix(p.scope, name, stems)) applied++;
      }
    },
  });
}

// import 别名（仅主进程）
if (doImports) {
  const alias = new Map();
  T(ast, {
    ImportDeclaration(p) {
      const mod = p.node.source.value;
      for (const sp of p.node.specifiers) {
        if (!t.isIdentifier(sp.local) || !NAME.test(sp.local.name)) continue;
        const imported = t.isImportSpecifier(sp) && t.isIdentifier(sp.imported) ? sp.imported.name
                       : (t.isImportDefaultSpecifier(sp) ? 'default' : null);
        if (imported) alias.set(sp.local.name, { mod, imported, methods: [], props: [], called: false });
      }
    },
  });
  T(ast, {
    MemberExpression(p) {
      const o = p.node.object;
      if (!t.isIdentifier(o) || !alias.has(o.name) || p.node.computed || !t.isIdentifier(p.node.property)) return;
      const info = alias.get(o.name);
      const inCall = p.parentPath.isCallExpression() && p.parentPath.node.callee === p.node;
      (inCall ? info.methods : info.props).push(p.node.property.name);
    },
    CallExpression(p) {
      const c = p.node.callee;
      if (t.isIdentifier(c) && alias.has(c.name)) alias.get(c.name).called = true;
    },
  });
  T(ast, {
    Program(p) {
      for (const [name, info] of alias) {
        const base = info.mod.split('/').pop().replace(/\.js$/, '').replace(/-[A-Za-z0-9_]{6,8}$/, '').replace(/[^A-Za-z0-9]/g, '');
        if (!base || base.length < 2) continue;
        const role = info.methods.length > info.props.length
          ? (/^(get|load|find|list|query)/.test(info.methods.join(' ')) ? 'Repo' : 'Service')
          : (info.props.length ? 'Const' : (info.called ? 'Fn' : 'Mod'));
        const stem = base[0].toLowerCase() + base.slice(1);
        const cands = SUFFIXES.map(s => stem + role + s).concat(SUFFIXES.map(s => stem + s));
        for (const cand of cands) {
          if (!cand || GLOBALS.has(cand) || KEYWORDS.has(cand) || used.has(cand) || p.scope.hasBinding(cand)) continue;
          if (!/^[a-z][A-Za-z0-9]{2,30}$/.test(cand)) continue;
          try { p.scope.rename(name, cand); used.add(cand); applied++; break; } catch {}
        }
      }
    },
  });
}

console.error(`${require('path').basename(file)}: ${applied}`);
if (applied) fs.writeFileSync(file, G(ast, { compact: false, comments: true, jsescOption: { minimal: true } }).code);
