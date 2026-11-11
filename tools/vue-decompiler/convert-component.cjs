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
const G = require('@babel/generator').default;
// AST 级表达式重写：递归把 unref(x) 替换成 x（Vue 模板自动解包）
function rewriteExpr(node) {
  if (!node) return node;
  const clone = t.cloneNode(node, true, true);
  T(t.file(t.program([t.expressionStatement(clone)])), {
    CallExpression(p) {
      const c = p.node.callee;
      if (!t.isIdentifier(c)) return;
      const api = apiOf(c.name);
      if (api === 'unref' && p.node.arguments.length === 1) {
        p.replaceWith(t.cloneNode(p.node.arguments[0], true, true));
        p.skip();
      }
    },
  });
  return clone;
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
function dyn(n) {
  if (!n) return '';
  try {
    const rewritten = rewriteExpr(unwrap(n));
    const code = G(t.expressionStatement(rewritten), { compact: true, jsescOption: { minimal: true } }).code.replace(/;$/, '');
    return code.replace(/"/g, "'");
  } catch { return exprText(unwrap(n)); }
}
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
  if (/^on[A-Z]/.test(k)) {
    // Vue 编译器会把事件处理器缓存在 renderCache 里：X[i] ||= fn 或 [X[i]||=fn, other]
    // 这些形式在模板里不成立，需要取出真实函数
    let node = v;
    if (t.isArrayExpression(node) && node.elements.length) node = node.elements[0];
    if (t.isAssignmentExpression(node) && node.operator === '||=') node = node.right;
    return `@${k.slice(2).toLowerCase()}="${dyn(node)}"`;
  }
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
    const kids = args[2];
    const childToTpl = (e) => {
      if (!e) return '';
      if (t.isSpreadElement(e)) return '';
      const v = conv(e);
      if (v) return v;
      const x = unwrap(e);
      if (t.isStringLiteral(x)) return x.value;
      if (t.isTemplateLiteral(x) && x.expressions.length === 0) return x.quasis[0].value.cooked;
      if (t.isNumericLiteral(x)) return String(x.value);
      if (t.isCallExpression(x) && t.isIdentifier(x.callee) && apiOf(x.callee.name) === 'toDisplayString') {
        const e2 = dyn(x.arguments[0]);
        if (/[{}]/.test(e2)) return `<span v-text="${e2.replace(/"/g, "'")}" />`;
        return `{{ ${e2} }}`;
      }
      // resolveComponent(X, props) 出现在 children 里 → 模板中改为泛型组件
      // 注意：resolveComponent 是 render 函数专用 API，模板里不存在，
      // 原样搬进模板会导致运行时 "Cannot destructure property 'slots' of undefined"
      if (t.isCallExpression(x) && t.isIdentifier(x.callee) && apiOf(x.callee.name) === 'resolveComponent') {
        const target = x.arguments[0];
        const propsArg = x.arguments[1];
        const isName = target ? dyn(target) : 'undefined';
        let attrs = '';
        if (propsArg && t.isObjectExpression(propsArg)) {
          for (const pr of propsArg.properties) {
            if (!t.isObjectProperty(pr)) continue;
            const k = t.isIdentifier(pr.key) ? pr.key.name : (t.isStringLiteral(pr.key) ? pr.key.value : null);
            if (!k) continue;
            const a = attrFor(k, pr.value);
            if (a) attrs += ' ' + a;
          }
        }
        return `<component :is="${isName}"${attrs} />`;
      }
      if (t.isCallExpression(x) || t.isMemberExpression(x) || t.isIdentifier(x) || t.isLogicalExpression(x)
          || t.isConditionalExpression(x) || t.isBinaryExpression(x) || t.isTemplateLiteral(x)) {
        const e2 = dyn(x);
        // 含花括号的表达式不能放进 {{ }}（Vue 模板解析器会把 }} 当插值结束）
        if (/[{}]/.test(e2)) return `<span v-text="${e2.replace(/"/g, "'")}" />`;
        return `{{ ${e2} }}`;
      }
      return '';
    };
    if (kids) {
      if (t.isArrayExpression(kids)) inner = kids.elements.map(childToTpl).filter(Boolean).join('');
      else inner = childToTpl(kids);   // 单表达式 child（Vue 编译器会省略 createTextVNode 的包裹）
    }
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
