// render 函数 → Vue template 转换器
const fs = require('fs');
const P = require('@babel/parser');
const T = require('@babel/traverse').default;
const t = require('@babel/types');

const file = process.argv[2] || 'repo/src/renderer/ui/Kbd.js';
const src = fs.readFileSync(file, 'utf8');
const ast = P.parse(src, { sourceType: 'unambiguous' });

// 1) 收集本文件的 Vue API 本地名
const VUE_API_MAP = {
  '$n': 'normalizeClass', 'An': 'unref', 'Ct': 'renderSlot', 'O': 'createTextVNode',
  'S': 'createElementBlock', 'St': 'renderList', 'Wt': 'watch', 'b': 'createBlock',
  'c': 'Fragment', 'gt': 'openBlock', 'j': 'defineComponent', 'k': 'resolveComponent',
  'mt': 'onUnmounted', 'ot': 'onMounted', 'rr': 'toDisplayString', 'ut': 'onBeforeMount',
  'v': 'computed', 'x': 'createCommentVNode', 'y': 'createElementVNode',
};
const API = {};
const VUE_API = new Set(['normalizeClass','unref','renderSlot','createTextVNode','createElementBlock',
  'renderList','watch','createBlock','Fragment','openBlock','defineComponent','resolveComponent',
  'onUnmounted','onMounted','toDisplayString','onBeforeMount','computed','createCommentVNode','createElementVNode']);
T(ast, {
  Program(p) {
    for (const [local, b] of Object.entries(p.scope.bindings)) {
      if (b.kind !== 'module') continue;
      const n = b.path.node;
      if (!t.isImportSpecifier(n) || !t.isIdentifier(n.imported)) continue;
      const mod = b.path.parentPath.node.source && b.path.parentPath.node.source.value;
      if (!mod || !mod.includes('vue-i18n.runtime')) continue;
      API[local] = VUE_API_MAP[n.imported.name] || n.imported.name;
    }
  },
});
const apiOf = localName => API[localName] || null;

// 2) 工具
function txt(node) { return src.slice(node.start, node.end); }
// 递归把 unref(x) 还原为 x（Vue 模板自动解包 ref）
function exprText(node) {
  if (!node) return '';
  if (t.isCallExpression(node) && t.isIdentifier(node.callee) && apiOf(node.callee.name) === 'unref') {
    return exprText(node.arguments[0]);
  }
  if (t.isCallExpression(node)) {
    const calleeTxt = exprText(node.callee);
    const args = node.arguments.map(a => {
      if (t.isStringLiteral(a)) return "'" + a.value.replace(/'/g, "\\'") + "'";
      if (t.isTemplateLiteral(a) && a.expressions.length === 0) return "'" + a.quasis[0].value.cooked.replace(/'/g, "\\'") + "'";
      return exprText(a);
    }).join(', ');
    return `${calleeTxt}(${args})`;
  }
  return txt(node);
}
function unwrap(node) {
  // 去 unref(x) → x
  if (t.isCallExpression(node) && t.isIdentifier(node.callee) && apiOf(node.callee.name) === 'unref') return unwrap(node.arguments[0]);
  return node;
}
function strVal(node) {
  const n = unwrap(node);
  if (!n) return null;
  if (t.isStringLiteral(n)) return n.value;
  if (t.isTemplateLiteral(n) && n.expressions.length === 0) return n.quasis[0].value.cooked;
  return null;
}
function dynamicVal(node) {
  return exprText(unwrap(node));
}
// 处理 class: normalizeClass(a, b) → 合并
function classExpr(node) {
  const n = unwrap(node);
  if (t.isCallExpression(n) && t.isIdentifier(n.callee) && apiOf(n.callee.name) === 'normalizeClass') {
    return n.arguments.map(a => dynamicVal(a)).join(', ');
  }
  return dynamicVal(n);
}
// 属性生成
function attrString(key, valNode) {
  if (key === 'key' || key === 'ref_key' || key === 'ref_for') return null;
  if (key === 'ref') return null; // 单独处理
  if (/^on[A-Z]/.test(key)) {
    const ev = key.slice(2).toLowerCase();
    const v = unwrap(valNode);
    // 修饰符：withDirectives 包裹的 stop/prevent
    return `@${ev}="${dynamicVal(v)}"`;
  }
  if (key === 'class') return `:class="${classExpr(valNode)}"`;
  if (key === 'style') return `:style="${dynamicVal(valNode)}"`;
  if (key === 'innerHTML') return `v-html="${dynamicVal(valNode)}"`;
  const s = strVal(valNode);
  if (s !== null && !/^(on[A-Z]|class|style)$/.test(key)) {
    return `${key}="${s.replace(/"/g, '&quot;')}"`;
  }
  return `:${key}="${dynamicVal(valNode)}"`;
}
// 3) vnode 转换
function convert(node, depth = 0) {
  if (!node) return '';
  // 三元：cond ? A : B
  if (t.isConditionalExpression(node)) {
    const a = convert(unwrapSeq(node.consequent), depth);
    const b = convert(unwrapSeq(node.alternate), depth);
    if (!b && a) return `${a}`;   // 另一支是 comment → v-if
    if (!a && b) return `${b}`;
    return a || b;
  }
  // 序列：取最后一个表达式（openBlock(), xxx(...)）
  if (t.isSequenceExpression(node)) return convert(node.expressions[node.expressions.length - 1], depth);
  if (!t.isCallExpression(node)) return '';

  const callee = node.callee;
  const fn = t.isIdentifier(callee) ? callee.name : null;
  const api = fn ? apiOf(fn) : null;
  const args = node.arguments;

  if (api === 'createElementVNode' || api === 'createElementBlock' || api === 'createBlock' || api === 'resolveComponent') {
    const tagNode = args[0];
    // 动态组件：createBlock(resolveComponent(...), props, slots)
    if (api === 'createBlock' || (tagNode && t.isCallExpression(tagNode))) {
      const inner = convert(tagNode, depth);
      const m = inner.match(/<component :is="([^"]+)"[^>]*>/);
      const isName = m ? m[1] : dynamicVal(tagNode);
      const props = args[1];
      let attrs = '';
      if (props && t.isObjectExpression(props)) {
        for (const p of props.properties) {
          if (!t.isObjectProperty(p)) continue;
          const k = t.isIdentifier(p.key) ? p.key.name : (t.isStringLiteral(p.key) ? p.key.value : null);
          if (!k) continue;
          const a = attrString(k, p.value);
          if (a) attrs += ' ' + a;
        }
      }
      let inner2 = '';
      const slots = args[2];
      if (slots && t.isObjectExpression(slots)) {
        // { default: withCtx(() => [ ... ]) }
        for (const sp of slots.properties) {
          if (!t.isObjectProperty(sp)) continue;
          const sn = t.isIdentifier(sp.key) ? sp.key.name : (t.isStringLiteral(sp.key) ? sp.key.value : null);
          let v = sp.value;
          if (t.isCallExpression(v) && t.isIdentifier(v.callee) && apiOf(v.callee.name) === 'withCtx') v = v.arguments[0];
          if (t.isArrowFunctionExpression(v) && t.isArrayExpression(v.body)) {
            const kids = v.body.elements.map(e => convert(e, depth + 1)).filter(Boolean).join('');
            inner2 += sn === 'default' ? kids : `<template #${sn}>${kids}</template>`;
          }
        }
      }
      return `<component :is="${isName}"${attrs}>${inner2}</component>`;
    }
    // 普通元素
    const tag = strVal(tagNode);
    if (!tag) {
      // 可能是 Fragment
      if (tagNode && t.isIdentifier(tagNode) && apiOf(tagNode.name) === 'Fragment') {
        const kids = (args[1] && t.isArrayExpression(args[1])) ? args[1].elements.map(e => convert(e, depth)).filter(Boolean).join('') : '';
        return kids;
      }
      return '';
    }
    let attrs = '';
    const props = args[1];
    if (props && t.isObjectExpression(props)) {
      for (const p of props.properties) {
        if (!t.isObjectProperty(p)) continue;
        const k = t.isIdentifier(p.key) ? p.key.name : (t.isStringLiteral(p.key) ? p.key.value : null);
        if (!k) continue;
        // ref: xxx → ref="xxx"（需 ref_key 存在才输出）
        if (k === 'ref') { attrs += ` ref="${String(txt(p.value)).replace(/^unref\(|\)$/g, '')}"`; continue; }
        const a = attrString(k, p.value);
        if (a) attrs += ' ' + a;
      }
    }
    let inner = '';
    const kids = args[2];
    if (kids && t.isArrayExpression(kids)) {
      inner = kids.elements.map(e => convert(e, depth + 1)).filter(Boolean).join('');
    }
    const VOID = /^(br|img|input|hr|meta|link|area|base|col|embed|source|track|wbr)$/;
    if (VOID.test(tag) && !inner) return `<${tag}${attrs} />`;
    return `<${tag}${attrs}>${inner}</${tag}>`;
  }
  if (api === 'renderSlot') {
    const name = strVal(args[1]);
    return name && name !== 'default' ? `<slot name="${name}" />` : '<slot />';
  }
  if (api === 'createTextVNode') {
    const v = unwrap(args[0]);
    if (t.isStringLiteral(v)) return v.value;
    if (t.isTemplateLiteral(v) && v.expressions.length === 0) return v.quasis[0].value.cooked;
    // toDisplayString(x) → {{ x }}
    if (t.isCallExpression(v) && t.isIdentifier(v.callee) && apiOf(v.callee.name) === 'toDisplayString') {
      return `{{ ${dynamicVal(v.arguments[0])} }}`;
    }
    return `{{ ${dynamicVal(v)} }}`;
  }
  if (api === 'createCommentVNode') return '';
  if (api === 'renderList') {
    // 由父级处理；单独出现时忽略
    return '';
  }
  return '';
}
function unwrapSeq(n) { return t.isSequenceExpression(n) ? n.expressions[n.expressions.length - 1] : n; }

// 4) 找 setup 的 render 返回
let template = '';
const isVNodeCall = n => {
  const x = unwrapSeq(n);
  if (!t.isCallExpression(x)) return false;
  const c = x.callee;
  const nm = t.isIdentifier(c) ? c.name : null;
  const api = nm ? apiOf(nm) : null;
  return ['createElementBlock','createElementVNode','createBlock','createTextVNode','Fragment','renderSlot'].includes(api);
};
T(ast, {
  ArrowFunctionExpression(p) {
    if (!isVNodeCall(p.node.body)) return;
    const r = convert(unwrapSeq(p.node.body));
    if (r && r.length > template.length) template = r;
  },
  // 兼容：setup 内 return (ctx,cache) => ...
  ReturnStatement(p) {
    const a = p.node.argument;
    if (t.isArrowFunctionExpression(a) && isVNodeCall(a.body)) {
      const r = convert(unwrapSeq(a.body));
      if (r && r.length > template.length) template = r;
    }
  },
});
console.log(template || '(未转换)');
