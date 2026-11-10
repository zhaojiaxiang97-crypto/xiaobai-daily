// 对提取出的独立组件做 render → template 转换
const fs = require('fs');
const P = require('@babel/parser');
const T = require('@babel/traverse').default;
const t = require('@babel/types');

const VUE_API_MAP = {
  $n:'normalizeClass', An:'unref', Ct:'renderSlot', O:'createTextVNode', S:'createElementBlock',
  St:'renderList', Wt:'watch', b:'createBlock', c:'Fragment', gt:'openBlock', j:'defineComponent',
  mt:'onUnmounted', ot:'onMounted', rr:'toDisplayString', ut:'onBeforeMount', v:'computed',
  x:'createCommentVNode', y:'createElementVNode', H:'createElementVNode', D:'createStaticVNode',
  A:'defineAsyncComponent', Bn:'isArray',
};
// 已语义化的名字直接用
const SEMANTIC = new Set(['openBlock','createElementBlock','createElementVNode','createBlock','createVNode',
  'createTextVNode','createCommentVNode','createStaticVNode','renderSlot','renderList','normalizeClass',
  'toDisplayString','unref','withCtx','withDirectives','defineComponent','resolveComponent','Fragment',
  'computed','watch','onMounted','onUnmounted','onBeforeMount','isArray','defineAsyncComponent']);

const file = process.argv[2];
// 组件注册表：把 <component :is="YM"/> 还原成 <SettingsSection/>
let REGISTRY = {};
try { REGISTRY = JSON.parse(fs.readFileSync(process.env.REGISTRY_PATH || '/tmp/registry.json', 'utf8')).registry || {}; } catch {}
const src = fs.readFileSync(file, 'utf8');
const ast = P.parse(src, { sourceType: 'module' });
const API = {};
T(ast, {
  Program(p) {
    for (const [local, b] of Object.entries(p.scope.bindings)) {
      if (b.kind === 'module') {
        const n = b.path.node;
        if (t.isImportSpecifier(n) && t.isIdentifier(n.imported)) {
          API[local] = VUE_API_MAP[n.imported.name] || SEMANTIC.has(n.imported.name) ? (SEMANTIC.has(n.imported.name) ? n.imported.name : VUE_API_MAP[n.imported.name]) : n.imported.name;
        }
      }
    }
  },
});
const apiOf = n => SEMANTIC.has(n) ? n : (API[n] || VUE_API_MAP[n] || null);
function txt(node) { return src.slice(node.start, node.end); }
function unwrap(node) {
  if (t.isCallExpression(node) && t.isIdentifier(node.callee) && apiOf(node.callee.name) === 'unref') return unwrap(node.arguments[0]);
  return node;
}
function exprText(node) {
  if (!node) return '';
  if (t.isCallExpression(node) && t.isIdentifier(node.callee) && apiOf(node.callee.name) === 'unref') return exprText(node.arguments[0]);
  if (t.isCallExpression(node)) {
    const cn = exprText(node.callee);
    const args = node.arguments.map(a => {
      if (t.isStringLiteral(a)) return "'" + a.value.replace(/'/g, "\\'") + "'";
      if (t.isTemplateLiteral(a) && a.expressions.length === 0) return "'" + a.quasis[0].value.cooked.replace(/'/g, "\\'") + "'";
      return exprText(a);
    }).join(', ');
    return `${cn}(${args})`;
  }
  return txt(node).replace(/"/g, "'");
}
const dyn = n => exprText(unwrap(n));
function strVal(n) {
  const x = unwrap(n);
  if (!x) return null;
  if (t.isStringLiteral(x)) return x.value;
  if (t.isTemplateLiteral(x) && x.expressions.length === 0) return x.quasis[0].value.cooked;
  return null;
}
function classExpr(n) {
  const x = unwrap(n);
  if (t.isCallExpression(x) && t.isIdentifier(x.callee) && apiOf(x.callee.name) === 'normalizeClass')
    return x.arguments.map(a => dyn(a)).join(', ');
  return dyn(x);
}
function attrFor(k, v) {
  if (k === 'key' || k === 'ref_key' || k === 'ref_for') return null;
  if (/^on[A-Z]/.test(k)) return `@${k.slice(2).toLowerCase()}="${dyn(v)}"`;
  if (k === 'class') return `:class="${classExpr(v)}"`;
  if (k === 'style') return `:style="${dyn(v)}"`;
  if (k === 'innerHTML') return `v-html="${dyn(v)}"`;
  const s = strVal(v);
  if (s !== null) return `${k}="${s.replace(/"/g, '&quot;')}"`;
  return `:${k}="${dyn(v)}"`;
}
function seq(n) { return t.isSequenceExpression(n) ? n.expressions[n.expressions.length - 1] : n; }
function conv(node) {
  if (!node) return '';
  if (t.isSequenceExpression(node)) return conv(node.expressions[node.expressions.length - 1]);
  if (t.isConditionalExpression(node)) {
    const a = conv(seq(node.consequent)), b = conv(seq(node.alternate));
    return a || b;
  }
  if (!t.isCallExpression(node)) return '';
  const fn = t.isIdentifier(node.callee) ? node.callee.name : null;
  const api = fn ? apiOf(fn) : null;
  const args = node.arguments;
  if (['createElementVNode','createElementBlock','createBlock','createVNode'].includes(api)) {
    const tagN = args[0];
    const tag = tagN ? strVal(tagN) : null;
    if (!tag) {
      // 动态组件 / Fragment
      if (tagN && t.isIdentifier(tagN) && apiOf(tagN.name) === 'Fragment') {
        // Fragment 形态：createElementBlock(Fragment, null, [children]) —— children 在 args[2]
        const kidArg = args.find(a => t.isArrayExpression(a));
        return kidArg ? kidArg.elements.map(e => conv(e)).filter(Boolean).join('') : '';
      }
      let attrs = '';
      if (args[1] && t.isObjectExpression(args[1])) {
        for (const p of args[1].properties) {
          if (!t.isObjectProperty(p)) continue;
          const k = t.isIdentifier(p.key) ? p.key.name : (t.isStringLiteral(p.key) ? p.key.value : null);
          if (k) { const a = attrFor(k, p.value); if (a) attrs += ' ' + a; }
        }
      }
      const idName = tagN && t.isIdentifier(tagN) ? tagN.name : null;
      const known = idName ? REGISTRY[idName] : null;
      if (known) {
        let slotKids = (args[2] && t.isArrayExpression(args[2]))
          ? args[2].elements.map(e => conv(e)).filter(Boolean).join('') : '';
        if (!slotKids && args[2] && t.isObjectExpression(args[2])) {
          for (const sp of args[2].properties) {
            if (!t.isObjectProperty(sp)) continue;
            let v = sp.value;
            if (t.isCallExpression(v) && t.isIdentifier(v.callee)) v = v.arguments[0];
            if (t.isArrowFunctionExpression(v) && t.isArrayExpression(v.body)) {
              slotKids += v.body.elements.map(e => conv(e)).filter(Boolean).join('');
            }
          }
        }
        const ct = known.component;
        return slotKids ? `<${ct}${attrs}>${slotKids}</${ct}>` : `<${ct}${attrs} />`;
      }
      return `<component :is="${tagN ? dyn(tagN) : 'unknown'}"${attrs} />`;
    }
    if (!/^[a-z][\w-]*$/.test(tag)) return '';
    let attrs = '';
    if (args[1] && t.isObjectExpression(args[1])) {
      for (const p of args[1].properties) {
        if (!t.isObjectProperty(p)) continue;
        const k = t.isIdentifier(p.key) ? p.key.name : (t.isStringLiteral(p.key) ? p.key.value : null);
        if (!k) continue;
        if (k === 'ref') { attrs += ` ref="${txt(p.value)}"`; continue; }
        const a = attrFor(k, p.value);
        if (a) attrs += ' ' + a;
      }
    }
    let inner = '';
    if (args[2] && t.isArrayExpression(args[2])) inner = args[2].elements.map(e => conv(e)).filter(Boolean).join('');
    const VOID = /^(br|img|input|hr|meta|link|area|base|col|embed|source|track|wbr)$/;
    return VOID.test(tag) && !inner ? `<${tag}${attrs} />` : `<${tag}${attrs}>${inner}</${tag}>`;
  }
  if (api === 'createTextVNode') {
    const v = unwrap(args[0]);
    if (t.isStringLiteral(v)) return v.value;
    if (t.isTemplateLiteral(v) && v.expressions.length === 0) return v.quasis[0].value.cooked;
    if (t.isCallExpression(v) && t.isIdentifier(v.callee) && apiOf(v.callee.name) === 'toDisplayString') return `{{ ${dyn(v.arguments[0])} }}`;
    return `{{ ${dyn(v)} }}`;
  }
  // 用法驱动：首参形如 xxx.$slots → renderSlot（不看函数名，名字可能被历史误标）
  if (args.length >= 2 && args[0] && t.isMemberExpression(args[0]) && !args[0].computed
      && t.isIdentifier(args[0].property, { name: '$slots' })) {
    const nm = strVal(args[1]);
    return nm && nm !== 'default' ? `<slot name="${nm}" />` : '<slot />';
  }
  if (api === 'renderSlot') {
    const nm = strVal(args[1]);
    return nm && nm !== 'default' ? `<slot name="${nm}" />` : '<slot />';
  }
  return '';
}
// 找 render：setup 返回的箭头，或 render() {}
let best = '';
T(ast, {
  ArrowFunctionExpression(p) {
    const b = seq(p.node.body);
    if (!t.isCallExpression(b)) return;
    const fn = t.isIdentifier(b.callee) ? b.callee.name : null;
    const api = fn ? apiOf(fn) : null;
    if (!['createElementBlock','createElementVNode','createBlock','Fragment','createTextVNode'].includes(api)) return;
    const r = conv(b);
    if (r.length > best.length) best = r;
  },
});
console.log(best || '');
