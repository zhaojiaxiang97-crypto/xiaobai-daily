import { An as e, At as t, B as n, Bn as r, C as i, Dt as a, Fn as o, Gn as s, H as c, Hn as l, In as u, Jn as d, Kn as f, Ln as p, Mn as m, Nn as h, Pn as ee, Qn as g, Rn as _, T as v, Tn as y, Un as b, Vn as x, Vt as te, Wn as ne, Wt as re, Xn as S, Yn as C, Zn as w, ar as ie, bt as ae, c as oe, er as se, h as ce, ht as le, i as ue, j as de, jn as fe, k as pe, mt as me, qn as he, r as ge, rt as _e, st as ve, u as ye, ut as be, z as T, zn as xe } from "../chunks/vue-i18n.runtime.js";
var E = undefined,
  Se = typeof window < `u` && window.trustedTypes;
if (Se) try {
  E = Se.createPolicy(`vue`, {
    createHTML: e => e
  });
} catch {}
var Ce = E ? e => E.createHTML(e) : e => e,
  we = `http://www.w3.org/2000/svg`,
  Te = `http://www.w3.org/1998/Math/MathML`,
  D = typeof document < `u` ? document : null,
  Ee = D && D.createElement(`template`),
  De = {
    insert: (e, t, n) => {
      t.insertBefore(e, n || null);
    },
    remove: e => {
      let parentNode = e.parentNode;
      parentNode && parentNode.removeChild(e);
    },
    createElement: (e, t, n, r) => {
      let i = t === `svg` ? D.createElementNS(we, e) : t === `mathml` ? D.createElementNS(Te, e) : n ? D.createElement(e, {
        is: n
      }) : D.createElement(e);
      return e === `select` && r && r.multiple != null && i.setAttribute(`multiple`, r.multiple), i;
    },
    createText: e => D.createTextNode(e),
    createComment: e => D.createComment(e),
    setText: (e, t) => {
      e.nodeValue = t;
    },
    setElementText: (e, t) => {
      e.textContent = t;
    },
    parentNode: e => e.parentNode,
    nextSibling: e => e.nextSibling,
    querySelector: e => D.querySelector(e),
    setScopeId(e, t) {
      e.setAttribute(t, ``);
    },
    insertStaticContent(e, t, n, r, i, a) {
      let o = n ? n.previousSibling : t.lastChild;
      if (i && (i === a || i.nextSibling)) for (; t.insertBefore(i.cloneNode(true), n), i !== a && (i = i.nextSibling););else {
        Ee.innerHTML = Ce(r === `svg` ? `<svg>${e}</svg>` : r === `mathml` ? `<math>${e}</math>` : e);
        let content = Ee.content;
        if (r === `svg` || r === `mathml`) {
          let firstChild = content.firstChild;
          for (; firstChild.firstChild;) content.appendChild(firstChild.firstChild);
          content.removeChild(firstChild);
        }
        t.insertBefore(content, n);
      }
      return [o ? o.nextSibling : t.firstChild, n ? n.previousSibling : t.lastChild];
    }
  },
  O = `transition`,
  k = `animation`,
  A = Symbol(`_vtc`),
  Oe = {
    name: String,
    type: String,
    css: {
      type: Boolean,
      default: true
    },
    duration: [String, Number, Object],
    enterFromClass: String,
    enterActiveClass: String,
    enterToClass: String,
    appearFromClass: String,
    appearActiveClass: String,
    appearToClass: String,
    leaveFromClass: String,
    leaveActiveClass: String,
    leaveToClass: String
  },
  ke = o({}, ue, Oe),
  Ae = (e => (e.displayName = `Transition`, e.props = ke, e))((e, {
    slots: t
  }) => c(ge, Me(e), t)),
  j = (e, t = []) => {
    r(e) ? e.forEach(item => item(...t)) : e && e(...t);
  },
  je = e => e ? r(e) ? e.some(item => item.length > 1) : e.length > 1 : false;
function Me(e) {
  let t = {};
  for (let n in e) n in Oe || (t[n] = e[n]);
  if (e.css === false) return t;
  let {
      name: n = `v`,
      type: r,
      duration: i,
      enterFromClass: a = `${n}-enter-from`,
      enterActiveClass: s = `${n}-enter-active`,
      enterToClass: c = `${n}-enter-to`,
      appearFromClass: l = a,
      appearActiveClass: u = s,
      appearToClass: d = c,
      leaveFromClass: f = `${n}-leave-from`,
      leaveActiveClass: p = `${n}-leave-active`,
      leaveToClass: m = `${n}-leave-to`
    } = e,
    h = Ne(i),
    ee = h && h[0],
    g = h && h[1],
    {
      onBeforeEnter: _,
      onEnter: v,
      onEnterCancelled: y,
      onLeave: b,
      onLeaveCancelled: x,
      onBeforeAppear: te = _,
      onAppear: ne = v,
      onAppearCancelled: re = y
    } = t,
    S = (e, t, n, r) => {
      e._enterCancelled = r, P(e, t ? d : c), P(e, t ? u : s), n && n();
    },
    C = (e, t) => {
      e._isLeaving = false, P(e, f), P(e, m), P(e, p), t && t();
    },
    w = e => (t, n) => {
      let i = e ? ne : v,
        o = () => S(t, e, n);
      j(i, [t, o]), Pe(() => {
        P(t, e ? l : a), N(t, e ? d : c), je(i) || Ie(t, r, ee, o);
      });
    };
  return o(t, {
    onBeforeEnter(e) {
      j(_, [e]), N(e, a), N(e, s);
    },
    onBeforeAppear(e) {
      j(te, [e]), N(e, l), N(e, u);
    },
    onEnter: w(false),
    onAppear: w(true),
    onLeave(e, t) {
      e._isLeaving = true;
      let n = () => C(e, t);
      N(e, f), e._enterCancelled ? (N(e, p), F(e)) : (F(e), N(e, p)), Pe(() => {
        e._isLeaving && (P(e, f), N(e, m), je(b) || Ie(e, r, g, n));
      }), j(b, [e, n]);
    },
    onEnterCancelled(e) {
      S(e, false, undefined, true), j(y, [e]);
    },
    onAppearCancelled(e) {
      S(e, true, undefined, true), j(re, [e]);
    },
    onLeaveCancelled(e) {
      C(e), j(x, [e]);
    }
  });
}
function Ne(e) {
  if (e == null) return null;
  if (b(e)) return [M(e.enter), M(e.leave)];
  {
    let t = M(e);
    return [t, t];
  }
}
function M(e) {
  return ie(e);
}
function N(e, t) {
  t.split(/\s+/).forEach(item => item && e.classList.add(item)), (e[A] || (e[A] = new Set())).add(t);
}
function P(e, t) {
  t.split(/\s+/).forEach(item => item && e.classList.remove(item));
  let n = e[A];
  n && (n.delete(t), n.size || (e[A] = undefined));
}
function Pe(e) {
  requestAnimationFrame(() => {
    requestAnimationFrame(e);
  });
}
var Fe = 0;
function Ie(e, t, n, r) {
  let i = e._endId = ++Fe,
    a = () => {
      i === e._endId && r();
    };
  if (n != null) return setTimeout(a, n);
  let {
    type: o,
    timeout: s,
    propCount: c
  } = Le(e, t);
  if (!o) return r();
  let l = o + `end`,
    u = 0,
    d = () => {
      e.removeEventListener(l, f), a();
    },
    f = t => {
      t.target === e && ++u >= c && d();
    };
  setTimeout(() => {
    u < c && d();
  }, s + 1), e.addEventListener(l, f);
}
function Le(e, t) {
  let n = window.getComputedStyle(e),
    r = e => (n[e] || ``).split(`, `),
    i = r(`${O}Delay`),
    a = r(`${O}Duration`),
    o = Re(i, a),
    s = r(`${k}Delay`),
    c = r(`${k}Duration`),
    l = Re(s, c),
    u = null,
    d = 0,
    f = 0;
  t === O ? o > 0 && (u = O, d = o, f = a.length) : t === k ? l > 0 && (u = k, d = l, f = c.length) : (d = Math.max(o, l), u = d > 0 ? o > l ? O : k : null, f = u ? u === O ? a.length : c.length : 0);
  let p = u === O && /\b(?:transform|all)(?:,|$)/.test(r(`${O}Property`).toString());
  return {
    type: u,
    timeout: d,
    propCount: f,
    hasTransform: p
  };
}
function Re(e, t) {
  for (; e.length < t.length;) e = e.concat(e);
  return Math.max(...t.map((item, n) => ze(item) + ze(e[n])));
}
function ze(e) {
  return e === `auto` ? 0 : Number(e.slice(0, -1).replace(`,`, `.`)) * 1e3;
}
function F(e) {
  return (e ? e.ownerDocument : document).body.offsetHeight;
}
function Be(e, t, n) {
  let r = e[A];
  r && (t = (t ? [t, ...r] : [...r]).join(` `)), t == null ? e.removeAttribute(`class`) : n ? e.setAttribute(`class`, t) : e.className = t;
}
var I = Symbol(`_vod`),
  L = Symbol(`_vsh`),
  Ve = {
    name: `show`,
    beforeMount(e, {
      value: t
    }, {
      transition: n
    }) {
      e[I] = e.style.display === `none` ? `` : e.style.display, n && t ? n.beforeEnter(e) : R(e, t);
    },
    mounted(e, {
      value: t
    }, {
      transition: n
    }) {
      n && t && n.enter(e);
    },
    updated(e, {
      value: t,
      oldValue: n
    }, {
      transition: r
    }) {
      !t != !n && (r ? t ? (r.beforeEnter(e), R(e, true), r.enter(e)) : r.leave(e, () => {
        R(e, false);
      }) : R(e, t));
    },
    beforeUnmount(e, {
      value: t
    }) {
      R(e, t);
    }
  };
function R(e, t) {
  e.style.display = t ? e[I] : `none`, e[L] = !t;
}
function He() {
  Ve.getSSRProps = ({
    value: e
  }) => {
    if (!e) return {
      style: {
        display: `none`
      }
    };
  };
}
var Ue = Symbol(``);
function We(e) {
  let t = T();
  if (!t) return;
  let n = t.ut = (n = e(t.proxy)) => {
      Array.from(document.querySelectorAll(`[data-v-owner="${t.uid}"]`)).forEach(item => B(item, n));
    },
    r = () => {
      let r = e(t.proxy);
      t.ce ? B(t.ce, r) : z(t.subTree, r), n(r);
    };
  ve(() => {
    ae(r);
  }), be(() => {
    re(r, m, {
      flush: `post`
    });
    let e = new MutationObserver(r);
    e.observe(t.subTree.el.parentNode, {
      childList: true
    }), me(() => e.disconnect());
  });
}
function z(e, t) {
  if (e.shapeFlag & 128) {
    let suspense = e.suspense;
    e = suspense.activeBranch, suspense.pendingBranch && !suspense.isHydrating && suspense.effects.push(() => {
      z(suspense.activeBranch, t);
    });
  }
  for (; e.component;) e = e.component.subTree;
  if (e.shapeFlag & 1 && e.el) B(e.el, t);else if (e.type === oe) e.children.forEach(item => z(item, t));else if (e.type === ye) {
    let {
      el: n,
      anchor: r
    } = e;
    for (; n && (B(n, t), n !== r);) n = n.nextSibling;
  }
}
function B(e, t) {
  if (e.nodeType === 1) {
    let style = e.style,
      r = ``;
    for (let e in t) {
      let i = se(t[e]);
      style.setProperty(`--${e}`, i), r += `--${e}: ${i};`;
    }
    style[Ue] = r;
  }
}
var Ge = /(?:^|;)\s*display\s*:/;
function Ke(e, t, n) {
  let style = e.style,
    i = d(n),
    a = false;
  if (n && !i) {
    if (t) {
      if (d(t)) for (let e of t.split(`;`)) {
        let t = e.slice(0, e.indexOf(`:`)).trim();
        n[t] ?? H(style, t, ``);
      } else for (let e in t) n[e] ?? H(style, e, ``);
    }
    for (let i in n) {
      i === `display` && (a = true);
      let o = n[i];
      o == null ? H(style, i, ``) : Ye(e, i, !d(t) && t ? t[i] : undefined, o) || H(style, i, o);
    }
  } else if (i) {
    if (t !== n) {
      let e = style[Ue];
      e && (n += `;` + e), style.cssText = n, a = Ge.test(n);
    }
  } else t && e.removeAttribute(`style`);
  I in e && (e[I] = a ? style.display : ``, e[L] && (style.display = `none`));
}
var V = /\s*!important$/;
function H(e, t, n) {
  if (r(n)) n.forEach(item => H(e, t, item));else if (n ??= ``, t.startsWith(`--`)) V.test(n) ? e.setProperty(t, n.replace(V, ``), `important`) : e.setProperty(t, n);else {
    let r = Je(e, t);
    V.test(n) ? e.setProperty(p(r), n.replace(V, ``), `important`) : e[r] = n;
  }
}
var qe = [`Webkit`, `Moz`, `ms`],
  U = {};
function Je(e, t) {
  let n = U[t];
  if (n) return n;
  let r = h(t);
  if (r !== `filter` && r in e) return U[t] = r;
  r = ee(r);
  for (let n = 0; n < qe.length; n++) {
    let i = qe[n] + r;
    if (i in e) return U[t] = i;
  }
  return t;
}
function Ye(e, t, n, r) {
  return e.tagName === `TEXTAREA` && (t === `width` || t === `height`) && d(r) && n === r;
}
var Xe = `http://www.w3.org/1999/xlink`;
function Ze(e, t, n, r, i, a = he(t)) {
  r && t.startsWith(`xlink:`) ? n == null ? e.removeAttributeNS(Xe, t.slice(6, t.length)) : e.setAttributeNS(Xe, t, n) : n == null || a && !_(n) ? e.removeAttribute(t) : e.setAttribute(t, a ? `` : C(n) ? String(n) : n);
}
function Qe(e, t, n, r, i) {
  if (t === `innerHTML` || t === `textContent`) {
    n != null && (e[t] = t === `innerHTML` ? Ce(n) : n);
    return;
  }
  let tagName = e.tagName;
  if (t === `value` && tagName !== `PROGRESS` && !tagName.includes(`-`)) {
    let r = tagName === `OPTION` ? e.getAttribute(`value`) || `` : e.value,
      i = n == null ? e.type === `checkbox` ? `on` : `` : String(n);
    (r !== i || !(`_value` in e)) && (e.value = i), n ?? e.removeAttribute(t), e._value = n;
    return;
  }
  let o = false;
  if (n === `` || n == null) {
    let r = typeof e[t];
    r === `boolean` ? n = _(n) : n == null && r === `string` ? (n = ``, o = true) : r === `number` && (n = 0, o = true);
  }
  try {
    e[t] = n;
  } catch {}
  o && e.removeAttribute(i || t);
}
function W(e, t, n, r) {
  e.addEventListener(t, n, r);
}
function $e(e, t, n, r) {
  e.removeEventListener(t, n, r);
}
var et = Symbol(`_vei`);
function tt(e, t, n, r, i = null) {
  let a = e[et] || (e[et] = {}),
    o = a[t];
  if (r && o) o.value = r;else {
    let [n, s] = it(t);
    r ? W(e, n, a[t] = ct(r, i), s) : o && ($e(e, n, o, s), a[t] = undefined);
  }
}
var nt = /(Once|Passive|Capture)$/,
  rt = /^on:?(?:Once|Passive|Capture)$/;
function it(e) {
  let t, n;
  for (; (n = e.match(nt)) && !rt.test(e);) t ||= {}, e = e.slice(0, e.length - n[1].length), t[n[1].toLowerCase()] = true;
  return [e[2] === `:` ? e.slice(3) : p(e.slice(2)), t];
}
var at = 0,
  ot = Promise.resolve(),
  st = () => at ||= (ot.then(() => at = 0), Date.now());
function ct(e, t) {
  let n = e => {
    if (!e._vts) e._vts = Date.now();else if (e._vts <= n.attached) return;
    let value = n.value;
    if (r(value)) {
      let stopImmediatePropagation = e.stopImmediatePropagation;
      e.stopImmediatePropagation = () => {
        stopImmediatePropagation.call(e), e._stopped = true;
      };
      let r = value.slice(),
        a = [e];
      for (let n = 0; n < r.length && !e._stopped; n++) {
        let e = r[n];
        e && ce(e, t, 5, a);
      }
    } else ce(value, t, 5, [e]);
  };
  return n.value = e, n.attached = st(), n;
}
var lt = e => e.charCodeAt(0) === 111 && e.charCodeAt(1) === 110 && e.charCodeAt(2) > 96 && e.charCodeAt(2) < 123,
  ut = (e, t, n, r, i, a) => {
    let o = i === `svg`;
    t === `class` ? Be(e, r, o) : t === `style` ? Ke(e, n, r) : ne(t) ? l(t) || tt(e, t, n, r, a) : (t[0] === `.` ? (t = t.slice(1), 1) : t[0] === `^` ? (t = t.slice(1), 0) : dt(e, t, r, o)) ? (Qe(e, t, r), !e.tagName.includes(`-`) && (t === `value` || t === `checked` || t === `selected`) && Ze(e, t, r, o, a, t !== `value`)) : e._isVueCE && (ft(e, t) || e._def.__asyncLoader && (/[A-Z]/.test(t) || !d(r))) ? Qe(e, h(t), r, a, t) : (t === `true-value` ? e._trueValue = r : t === `false-value` && (e._falseValue = r), Ze(e, t, r, o));
  };
function dt(e, t, n, r) {
  if (r) return !!(t === `innerHTML` || t === `textContent` || t in e && lt(t) && x(n));
  if (t === `spellcheck` || t === `draggable` || t === `translate` || t === `autocorrect` || t === `sandbox` && e.tagName === `IFRAME` || t === `form` || t === `list` && e.tagName === `INPUT` || t === `type` && e.tagName === `TEXTAREA`) return false;
  if (t === `width` || t === `height`) {
    let tagName = e.tagName;
    if (tagName === `IMG` || tagName === `VIDEO` || tagName === `CANVAS` || tagName === `SOURCE`) return false;
  }
  return lt(t) && d(n) ? false : t in e;
}
function ft(e, t) {
  let n = e._def.props;
  if (!n) return false;
  let r = h(t);
  return Array.isArray(n) ? n.some(item => h(item) === r) : Object.keys(n).some(item => h(item) === r);
}
var pt = {};
function mt(e, t, n) {
  let r = de(e, t);
  s(r) && (r = o({}, r, t));
  class i extends _t {
    constructor(e) {
      super(r, e, n);
    }
  }
  return i.def = r, i;
}
var ht = (e, t) => mt(e, t, en),
  gt = typeof HTMLElement < `u` ? HTMLElement : class {},
  _t = class t extends gt {
    constructor(e, t = {}, n = $) {
      super(), this._def = e, this._props = t, this._createApp = n, this._isVueCE = true, this._instance = null, this._app = null, this._nonce = this._def.nonce, this._connected = false, this._resolved = false, this._patching = false, this._dirty = false, this._numberProps = null, this._styleChildren = new WeakSet(), this._styleAnchors = new WeakMap(), this._ob = null, this.shadowRoot && n !== $ ? this._root = this.shadowRoot : e.shadowRoot === false ? this._root = this : (this.attachShadow(o({}, e.shadowRootOptions, {
        mode: `open`
      })), this._root = this.shadowRoot);
    }
    connectedCallback() {
      if (!this.isConnected) return;
      !this.shadowRoot && !this._resolved && this._parseSlots(), this._connected = true;
      let e = this;
      for (; e &&= e.assignedSlot || e.parentNode || e.host;) if (e instanceof t) {
        this._parent = e;
        break;
      }
      this._instance || (this._resolved ? this._mount(this._def) : e && e._pendingResolve ? this._pendingResolve = e._pendingResolve.then(() => {
        if (this._pendingResolve = undefined, this.isConnected) return this._resolveDef();
      }) : this._resolveDef());
    }
    _setParent(e = this._parent) {
      e && (this._instance.parent = e._instance, this._inheritParentContext(e));
    }
    _inheritParentContext(e = this._parent) {
      e && this._app && Object.setPrototypeOf(this._app._context.provides, e._instance.provides);
    }
    disconnectedCallback() {
      this._connected = false, _e(() => {
        this._connected || (this._ob &&= (this._ob.disconnect(), null), this._app && this._app.unmount(), this._instance && (this._instance.ce = undefined), this._app = this._instance = null, this._teleportTargets &&= (this._teleportTargets.clear(), undefined));
      });
    }
    _processMutations(e) {
      for (let t of e) this._setAttr(t.attributeName);
    }
    _resolveDef() {
      if (this._pendingResolve) return this._pendingResolve;
      for (let e = 0; e < this.attributes.length; e++) this._setAttr(this.attributes[e].name);
      this._ob = new MutationObserver(this._processMutations.bind(this)), this._ob.observe(this, {
        attributes: true
      });
      let e = (e, t = false) => {
          this._resolved = true, this._pendingResolve = undefined;
          let {
              props: n,
              styles: i
            } = e,
            a;
          if (n && !r(n)) for (let e in n) {
            let t = n[e];
            (t === Number || t && t.type === Number) && (e in this._props && (this._props[e] = ie(this._props[e])), (a ||= Object.create(null))[h(e)] = true);
          }
          this._numberProps = a, this._resolveProps(e), this.shadowRoot && this._applyStyles(i), this._mount(e);
        },
        t = this._def.__asyncLoader;
      if (t) return this._pendingResolve = t().then(result => {
        result.configureApp = this._def.configureApp, e(this._def = result, true);
      }), this._pendingResolve;
      e(this._def);
    }
    _mount(t) {
      this._app = this._createApp(t), this._inheritParentContext(), t.configureApp && t.configureApp(this._app), this._app._ceVNode = this._createVNode(), this._app.mount(this._root);
      let n = this._instance && this._instance.exposed;
      if (n) for (let t in n) u(this, t) || Object.defineProperty(this, t, {
        get: () => e(n[t])
      });
    }
    _resolveProps(e) {
      let {
          props: t
        } = e,
        n = r(t) ? t : Object.keys(t || {});
      for (let e of Object.keys(this)) e[0] !== `_` && n.includes(e) && this._setProp(e, this[e]);
      for (let e of n.map(h)) Object.defineProperty(this, e, {
        get() {
          return this._getProp(e);
        },
        set(t) {
          this._setProp(e, t, true, !this._patching);
        }
      });
    }
    _setAttr(e) {
      if (e.startsWith(`data-v-`)) return;
      let t = this.hasAttribute(e),
        n = t ? this.getAttribute(e) : pt,
        r = h(e);
      t && this._numberProps && this._numberProps[r] && (n = ie(n)), this._setProp(r, n, false, true);
    }
    _getProp(e) {
      return this._props[e];
    }
    _setProp(e, t, n = true, r = false) {
      if (t !== this._props[e] && (this._dirty = true, t === pt ? delete this._props[e] : (this._props[e] = t, e === `key` && this._app && (this._app._ceVNode.key = t)), r && this._instance && this._update(), n)) {
        let n = this._ob;
        n && (this._processMutations(n.takeRecords()), n.disconnect()), t === true ? this.setAttribute(p(e), ``) : typeof t == `string` || typeof t == `number` ? this.setAttribute(p(e), t + ``) : t || this.removeAttribute(p(e)), n && n.observe(this, {
          attributes: true
        });
      }
    }
    _update() {
      let e = this._createVNode();
      this._app && (e.appContext = this._app._context), Qt(e, this._root);
    }
    _createVNode() {
      let e = {};
      this.shadowRoot || (e.onVnodeMounted = e.onVnodeUpdated = this._renderSlots.bind(this));
      let t = pe(this._def, o(e, this._props));
      return this._instance || (t.ce = e => {
        this._instance = e, e.ce = this, e.isCE = true;
        let t = (e, t) => {
          this.dispatchEvent(new CustomEvent(e, s(t[0]) ? o({
            detail: t
          }, t[0]) : {
            detail: t
          }));
        };
        e.emit = (e, ...n) => {
          t(e, n), p(e) !== e && t(p(e), n);
        }, this._setParent();
      }), t;
    }
    _applyStyles(e, t, n) {
      if (!e) return;
      if (t) {
        if (t === this._def || this._styleChildren.has(t)) return;
        this._styleChildren.add(t);
      }
      let r = this._nonce,
        shadowRoot = this.shadowRoot,
        a = n ? this._getStyleAnchor(n) || this._getStyleAnchor(this._def) : this._getRootStyleInsertionAnchor(shadowRoot),
        o = null;
      for (let s = e.length - 1; s >= 0; s--) {
        let c = document.createElement(`style`);
        r && c.setAttribute(`nonce`, r), c.textContent = e[s], shadowRoot.insertBefore(c, o || a), o = c, s === 0 && (n || this._styleAnchors.set(this._def, c), t && this._styleAnchors.set(t, c));
      }
    }
    _getStyleAnchor(e) {
      if (!e) return null;
      let t = this._styleAnchors.get(e);
      return t && t.parentNode === this.shadowRoot ? t : (t && this._styleAnchors.delete(e), null);
    }
    _getRootStyleInsertionAnchor(e) {
      for (let t = 0; t < e.childNodes.length; t++) {
        let n = e.childNodes[t];
        if (!(n instanceof HTMLStyleElement)) return n;
      }
      return null;
    }
    _parseSlots() {
      let e = this._slots = {},
        t;
      for (; t = this.firstChild;) {
        let n = t.nodeType === 1 && t.getAttribute(`slot`) || `default`;
        (e[n] || (e[n] = [])).push(t), this.removeChild(t);
      }
    }
    _renderSlots() {
      let e = this._getSlots(),
        t = this._instance.type.__scopeId;
      for (let n = 0; n < e.length; n++) {
        let r = e[n],
          i = r.getAttribute(`name`) || `default`,
          a = this._slots[i],
          parentNode = r.parentNode;
        if (a) for (let e of a) {
          if (t && e.nodeType === 1) {
            let n = t + `-s`,
              r = document.createTreeWalker(e, 1);
            e.setAttribute(n, ``);
            let i;
            for (; i = r.nextNode();) i.setAttribute(n, ``);
          }
          parentNode.insertBefore(e, r);
        } else for (; r.firstChild;) parentNode.insertBefore(r.firstChild, r);
        parentNode.removeChild(r);
      }
    }
    _getSlots() {
      let e = [this];
      this._teleportTargets && e.push(...this._teleportTargets);
      let t = new Set();
      for (let n of e) {
        let e = n.querySelectorAll(`slot`);
        for (let n = 0; n < e.length; n++) t.add(e[n]);
      }
      return Array.from(t);
    }
    _injectChildStyle(e, t) {
      this._applyStyles(e.styles, e, t);
    }
    _beginPatch() {
      this._patching = true, this._dirty = false;
    }
    _endPatch() {
      this._patching = false, this._dirty && this._instance && this._update();
    }
    _hasShadowRoot() {
      return this._def.shadowRoot !== false;
    }
    _removeChildStyle(e) {}
  };
function vt(e) {
  let t = T();
  return t && t.ce || null;
}
function yt() {
  let e = vt();
  return e && e.shadowRoot;
}
function bt(e = `$style`) {
  {
    let t = T();
    if (!t) return fe;
    let n = t.type.__cssModules;
    return n && n[e] || fe;
  }
}
var xt = new WeakMap(),
  St = new WeakMap(),
  G = Symbol(`_moveCb`),
  Ct = Symbol(`_enterCb`),
  wt = (e => (delete e.props.mode, e))({
    name: `TransitionGroup`,
    props: o({}, ke, {
      tag: String,
      moveClass: String
    }),
    setup(e, {
      slots: r
    }) {
      let i = T(),
        o = te(),
        s,
        c;
      return le(() => {
        if (!s.length) return;
        let t = e.moveClass || `${e.name || `v`}-move`;
        if (!kt(s[0].el, i.vnode.el, t)) {
          s = [];
          return;
        }
        s.forEach(Tt), s.forEach(Et);
        let n = s.filter(Dt);
        F(i.vnode.el), n.forEach(item => {
          let n = item.el,
            style = n.style;
          N(n, t), style.transform = style.webkitTransform = style.transitionDuration = ``;
          let i = n[G] = e => {
            e && e.target !== n || (!e || e.propertyName.endsWith(`transform`)) && (n.removeEventListener(`transitionend`, i), n[G] = null, P(n, t));
          };
          n.addEventListener(`transitionend`, i);
        }), s = [];
      }), () => {
        let l = y(e),
          u = Me(l),
          d = l.tag || oe;
        if (s = [], c) for (let e = 0; e < c.length; e++) {
          let n = c[e];
          n.el && n.el instanceof Element && !n.el[L] && (s.push(n), t(n, a(n, u, o, i)), xt.set(n, Ot(n.el)));
        }
        c = r.default ? n(r.default()) : [];
        for (let e = 0; e < c.length; e++) {
          let n = c[e];
          n.key != null && t(n, a(n, u, o, i));
        }
        return pe(d, null, c);
      };
    }
  });
function Tt(e) {
  let t = e.el;
  t[G] && t[G](), t[Ct] && t[Ct]();
}
function Et(e) {
  St.set(e, Ot(e.el));
}
function Dt(e) {
  let t = xt.get(e),
    n = St.get(e),
    r = t.left - n.left,
    i = t.top - n.top;
  if (r || i) {
    let t = e.el,
      style = t.style,
      a = t.getBoundingClientRect(),
      o = 1,
      s = 1;
    return t.offsetWidth && (o = a.width / t.offsetWidth), t.offsetHeight && (s = a.height / t.offsetHeight), (!Number.isFinite(o) || o === 0) && (o = 1), (!Number.isFinite(s) || s === 0) && (s = 1), Math.abs(o - 1) < .01 && (o = 1), Math.abs(s - 1) < .01 && (s = 1), style.transform = style.webkitTransform = `translate(${r / o}px,${i / s}px)`, style.transitionDuration = `0s`, e;
  }
}
function Ot(e) {
  let t = e.getBoundingClientRect();
  return {
    left: t.left,
    top: t.top
  };
}
function kt(e, t, n) {
  let r = e.cloneNode(),
    i = e[A];
  i && i.forEach(item => {
    item.split(/\s+/).forEach(e => e && r.classList.remove(e));
  }), n.split(/\s+/).forEach(item => item && r.classList.add(item)), r.style.display = `none`;
  let a = t.nodeType === 1 ? t : t.parentNode;
  a.appendChild(r);
  let {
    hasTransform: o
  } = Le(r);
  return a.removeChild(r), o;
}
var K = e => {
  let t = e.props[`onUpdate:modelValue`] || false;
  return r(t) ? e => xe(t, e) : t;
};
function At(e) {
  e.target.composing = true;
}
function jt(e) {
  let target = e.target;
  target.composing && (target.composing = false, target.dispatchEvent(new Event(`input`)));
}
var q = Symbol(`_assign`),
  J = Symbol(`_initialValue`);
function Mt(e, t, n) {
  return t && (e = e.trim()), n && (e = g(e)), e;
}
var Y = {
    created(e, {
      modifiers: {
        lazy: t,
        trim: n,
        number: r
      }
    }, i) {
      e.parentNode && (e.type === `text` ? e[J] = e.defaultValue.replace(/[\r\n]/g, ``) : e.type === `textarea` && (e[J] = e.defaultValue.replace(/\r\n?/g, `
`))), e[q] = K(i);
      let a = r || i.props && i.props.type === `number`;
      W(e, t ? `change` : `input`, t => {
        t.target.composing || e[q](Mt(e.value, n, a));
      }), (n || a) && W(e, `change`, () => {
        e.value = Mt(e.value, n, a);
      }), t || (W(e, `compositionstart`, At), W(e, `compositionend`, jt), W(e, `change`, jt));
    },
    mounted(e, {
      value: t,
      modifiers: {
        trim: n,
        number: r
      }
    }) {
      let i = t ?? ``,
        a = e[J];
      delete e[J], a !== undefined && (e.type === `text` || e.type === `textarea`) && e.value !== a ? e[q](Mt(e.value, n, r)) : e.value = i;
    },
    beforeUpdate(e, {
      value: t,
      oldValue: n,
      modifiers: {
        lazy: r,
        trim: i,
        number: a
      }
    }, o) {
      if (e[q] = K(o), e.composing) return;
      let s = (a || e.type === `number`) && !/^0\d/.test(e.value) ? g(e.value) : e.value,
        c = t ?? ``;
      if (s === c) return;
      let l = e.getRootNode();
      (l instanceof Document || l instanceof ShadowRoot) && l.activeElement === e && e.type !== `range` && (r && t === n || i && e.value.trim() === c) || (e.value = c);
    }
  },
  Nt = {
    deep: true,
    created(e, t, n) {
      e[q] = K(n), W(e, `change`, () => {
        let t = e._modelValue,
          n = X(e),
          checked = e.checked,
          a = e[q];
        if (r(t)) {
          let e = w(t, n),
            r = e !== -1;
          if (checked && !r) a(t.concat(n));else if (!checked && r) {
            let n = [...t];
            n.splice(e, 1), a(n);
          }
        } else if (f(t)) {
          let e = new Set(t);
          checked ? e.add(n) : e.delete(n), a(e);
        } else a(zt(e, checked));
      });
    },
    mounted: Pt,
    beforeUpdate(e, t, n) {
      e[q] = K(n), Pt(e, t, n);
    }
  };
function Pt(e, {
  value: t,
  oldValue: n
}, i) {
  e._modelValue = t;
  let a;
  if (r(t)) a = w(t, i.props.value) > -1;else if (f(t)) a = t.has(i.props.value);else {
    if (t === n) return;
    a = S(t, zt(e, true));
  }
  e.checked !== a && (e.checked = a);
}
var Ft = {
    created(e, {
      value: t
    }, n) {
      e.checked = S(t, n.props.value), e[q] = K(n), W(e, `change`, () => {
        e[q](X(e));
      });
    },
    beforeUpdate(e, {
      value: t,
      oldValue: n
    }, r) {
      e[q] = K(r), t !== n && (e.checked = S(t, r.props.value));
    }
  },
  It = {
    deep: true,
    created(e, {
      value: t,
      modifiers: {
        number: n
      }
    }, i) {
      e._modelValue = t, W(e, `change`, () => {
        let t = Array.prototype.filter.call(e.options, e => e.selected).map(item => n ? g(X(item)) : X(item)),
          multiple = e.multiple,
          a = multiple ? f(e._modelValue) ? new Set(t) : t : t[0],
          o = e._pendingValue = [multiple, multiple ? r(a) ? t.slice() : t : a];
        try {
          e[q](a);
        } finally {
          _e(() => {
            e._pendingValue === o && (e._pendingValue = undefined);
          });
        }
      }), e[q] = K(i);
    },
    mounted(e, {
      value: t
    }) {
      Rt(e, t);
    },
    beforeUpdate(e, {
      value: t
    }, n) {
      e._modelValue = t, e[q] = K(n);
    },
    updated(e, {
      value: t
    }) {
      let n = e._pendingValue;
      e._pendingValue = undefined, (!n || n[0] !== e.multiple || !Lt(t, n[1], n[0])) && Rt(e, t);
    }
  };
function Lt(e, t, n) {
  if (!n || r(e)) return S(e, t);
  if (f(e)) {
    if (e.size !== t.length) return false;
    for (let n of t) if (!e.has(n)) return false;
    return true;
  }
  return false;
}
function Rt(e, t) {
  let multiple = e.multiple,
    i = r(t);
  if (!multiple || i || f(t)) {
    for (let r = 0, length = e.options.length; r < length; r++) {
      let a = e.options[r],
        o = X(a);
      if (multiple) {
        if (i) {
          let e = typeof o;
          a.selected = e === `string` || e === `number` ? t.some(item => String(item) === String(o)) : w(t, o) > -1;
        } else a.selected = t.has(o);
      } else if (S(X(a), t)) {
        e.selectedIndex !== r && (e.selectedIndex = r);
        return;
      }
    }
    !multiple && e.selectedIndex !== -1 && (e.selectedIndex = -1);
  }
}
function X(e) {
  return `_value` in e ? e._value : e.value;
}
function zt(e, t) {
  let n = t ? `_trueValue` : `_falseValue`;
  return n in e ? e[n] : t;
}
var Bt = {
  created(e, t, n) {
    Z(e, t, n, null, `created`);
  },
  mounted(e, t, n) {
    Z(e, t, n, null, `mounted`);
  },
  beforeUpdate(e, t, n, r) {
    Z(e, t, n, r, `beforeUpdate`);
  },
  updated(e, t, n, r) {
    Z(e, t, n, r, `updated`);
  }
};
function Vt(e, t) {
  switch (e) {
    case `SELECT`:
      return It;
    case `TEXTAREA`:
      return Y;
    default:
      switch (t) {
        case `checkbox`:
          return Nt;
        case `radio`:
          return Ft;
        default:
          return Y;
      }
  }
}
function Z(e, t, n, r, i) {
  let a = Vt(e.tagName, n.props && n.props.type)[i];
  a && a(e, t, n, r);
}
function Ht() {
  Y.getSSRProps = ({
    value: e
  }) => ({
    value: e
  }), Ft.getSSRProps = ({
    value: e
  }, t) => {
    if (t.props && S(t.props.value, e)) return {
      checked: true
    };
  }, Nt.getSSRProps = ({
    value: e
  }, t) => {
    if (r(e)) {
      if (t.props && w(e, t.props.value) > -1) return {
        checked: true
      };
    } else if (f(e)) {
      if (t.props && e.has(t.props.value)) return {
        checked: true
      };
    } else if (e) return {
      checked: true
    };
  }, Bt.getSSRProps = (e, t) => {
    if (typeof t.type != `string`) return;
    let n = Vt(t.type.toUpperCase(), t.props && t.props.type);
    if (n.getSSRProps) return n.getSSRProps(e, t);
  };
}
var Ut = [`ctrl`, `shift`, `alt`, `meta`],
  Wt = {
    stop: e => e.stopPropagation(),
    prevent: e => e.preventDefault(),
    self: e => e.target !== e.currentTarget,
    ctrl: e => !e.ctrlKey,
    shift: e => !e.shiftKey,
    alt: e => !e.altKey,
    meta: e => !e.metaKey,
    left: e => `button` in e && e.button !== 0,
    middle: e => `button` in e && e.button !== 1,
    right: e => `button` in e && e.button !== 2,
    exact: (e, t) => Ut.some(item => e[`${item}Key`] && !t.includes(item))
  },
  Gt = (e, t) => {
    if (!e) return e;
    let n = e._withMods ||= {},
      r = t.join(`.`);
    return n[r] || (n[r] = (n, ...r) => {
      for (let e = 0; e < t.length; e++) {
        let r = Wt[t[e]];
        if (r && r(n, t)) return;
      }
      return e(n, ...r);
    });
  },
  Kt = {
    esc: `escape`,
    space: ` `,
    up: `arrow-up`,
    left: `arrow-left`,
    right: `arrow-right`,
    down: `arrow-down`,
    delete: `backspace`
  },
  qt = (e, t) => {
    let n = e._withKeys ||= {},
      r = t.join(`.`);
    return n[r] || (n[r] = n => {
      if (!(`key` in n)) return;
      let r = p(n.key);
      if (t.some(item => item === r || Kt[item] === r)) return e(n);
    });
  },
  Jt = o({
    patchProp: ut
  }, De),
  Q,
  Yt = false;
function Xt() {
  return Q ||= v(Jt);
}
function Zt() {
  return Q = Yt ? Q : i(Jt), Yt = true, Q;
}
var Qt = (...e) => {
    Xt().render(...e);
  },
  $t = (...e) => {
    Zt().hydrate(...e);
  },
  $ = (...e) => {
    let t = Xt().createApp(...e),
      {
        mount: n
      } = t;
    return t.mount = e => {
      let r = nn(e);
      if (!r) return;
      let i = t._component;
      !x(i) && !i.render && !i.template && (i.template = r.innerHTML), r.nodeType === 1 && (r.textContent = ``);
      let a = n(r, false, tn(r));
      return r instanceof Element && (r.removeAttribute(`v-cloak`), r.setAttribute(`data-v-app`, ``)), a;
    }, t;
  },
  en = (...e) => {
    let t = Zt().createApp(...e),
      {
        mount: n
      } = t;
    return t.mount = e => {
      let t = nn(e);
      if (t) return n(t, true, tn(t));
    }, t;
  };
function tn(e) {
  if (e instanceof SVGElement) return `svg`;
  if (typeof MathMLElement == `function` && e instanceof MathMLElement) return `mathml`;
}
function nn(e) {
  return d(e) ? document.querySelector(e) : e;
}
var rn = false,
  an = () => {
    rn || (rn = true, Ht(), He());
  },
  on = {
    xiaoheiToolbox: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `小白工具箱`
      }
    },
    xiaoheiToolboxHome: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `小白工具箱首页`
      }
    },
    xiaoheiDailyAssistant: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `小白日报`
      }
    },
    allTools: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `全部工具`
      }
    },
    topUp: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `账户充值`
      }
    },
    mainNavigation: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `主导航`
      }
    },
    balance: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `积分`
      }
    },
    signOut: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `退出登录`
      }
    },
    signIn: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `登录`
      }
    },
    openMenu: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `打开菜单`
      }
    },
    accountSignIn: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `账号登录`
      }
    },
    oneAccountPayAsYouGo: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `一个账号，随用随付`
      }
    },
    toolbox: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `工具箱`
      }
    },
    toolList: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `工具列表`
      }
    },
    usefulToolCollection: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `实用工具集合`
      }
    },
    findTheToolYouNeed: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `找到你需要的工具`
      }
    },
    toolCategories: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `工具分类`
      }
    },
    searchTools: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `搜索你需要的工具`
      }
    },
    searchToolsAriaLabel: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `搜索工具`
      }
    },
    clearSearch: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `清空搜索`
      }
    },
    loadingTools: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `正在加载工具…`
      }
    },
    couldNotConnectToTheToolbox: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `工具箱暂时没有连接成功`
      }
    },
    reload: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `重新加载`
      }
    },
    cancel: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `取消`
      }
    },
    confirmDelete: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `确认删除`
      }
    },
    noMatchingTools: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `没有找到匹配的工具`
      }
    },
    tryAnotherKeywordOrCategory: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `换个关键词或分类试试`
      }
    },
    generate: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `生成 `
      }
    },
    per10kCharactersAndUp: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `/ 万字符起`
      }
    },
    clone: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `克隆 `
      }
    },
    voice: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `/ 个`
      }
    },
    oneAccount: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `统一账户`
      }
    },
    sharedBalanceAcrossDesktopAndWeb: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `客户端和网页积分互通`
      }
    },
    usageBased: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `按量使用`
      }
    },
    noComplicatedPlans: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `无需购买复杂套餐`
      }
    },
    alwaysGrowing: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `持续增加`
      }
    },
    moreUsefulToolsAreOnTheWay: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `更多实用工具陆续上线`
      }
    },
    termsOfService: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `用户协议`
      }
    },
    privacyPolicy: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `隐私政策`
      }
    },
    shanghaiTingwuIntelligentTechnologyCoLtd: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `上海听悟智能科技有限公司`
      }
    },
    backToToolbox: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `返回工具箱`
      }
    },
    available: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `可使用`
      }
    },
    myVoiceLibrary: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `我的音色库`
      }
    },
    voiceActivity: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `声音记录`
      }
    },
    generationHistory: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `生成记录`
      }
    },
    signInToUse: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `登录后使用`
      }
    },
    aiImageGenerator: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `AI 图片生成`
      }
    },
    turnYourIdeasIntoImages: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `把你的想法变成图片`
      }
    },
    describeTheSubjectSceneStyleCompositionAndAspectRatio: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `描述画面主体、场景、风格、构图和比例，`
      }
    },
    aHighQualityImageWillBeGeneratedFromYourPrompt: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `会根据你的输入生成一张高质量图片。`
      }
    },
    currentOption: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `当前规格`
      }
    },
    image: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `/张`
      }
    },
    describeTheImageYouWant: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `描述你想要的画面`
      }
    },
    moreDetailUsuallyProducesMoreConsistentResults: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `信息越具体，生成结果通常越稳定`
      }
    },
    useExample: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `填入示例`
      }
    },
    imagePrompt: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `图片描述`
      }
    },
    addReferenceImagesOptional: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `添加参考图（可选）`
      }
    },
    useOneOrMoreReferenceImagesUpTo10: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `支持单图或多图参考，最多 10 张`
      }
    },
    removeReferenceImage: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `删除参考图`
      }
    },
    clickOrDropReferenceImagesHere: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `点击选择或拖拽参考图`
      }
    },
    jpgPngWebpAndMoreMaximumPerImage: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `支持 JPG、PNG、WebP 等格式，单张不超过`
      }
    },
    generationSettings: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `设置生成参数`
      }
    },
    pricingVariesByResolution: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `不同清晰度使用独立价格`
      }
    },
    aspectRatio: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `图片比例`
      }
    },
    imageResolution: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `图片清晰度`
      }
    },
    imageSize: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `图片规格`
      }
    },
    fileFormat: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `文件格式`
      }
    },
    generationMode: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `生成模式`
      }
    },
    addAnAiGeneratedWatermark: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `在图片右下角添加“AI 生成”水印`
      }
    },
    price: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `本次价格`
      }
    },
    perImageSpaced: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `/ 张`
      }
    },
    result: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `生成结果`
      }
    },
    downloadTheOriginalWhenComplete: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `完成后可下载并保存原图`
      }
    },
    generatingImage: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `正在创作图片`
      }
    },
    aiGeneratedResult: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `AI 生成结果`
      }
    },
    complete: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `生成完成`
      }
    },
    charged: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `· 已扣 `
      }
    },
    imageLinksRemainAvailableFor: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `图片链接仅保留`
      }
    },
    hoursPleaseSaveTheOriginalsPromptly: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `小时，请及时打开并保存原图。`
      }
    },
    yourResultWillAppearHere: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `生成结果会显示在这里`
      }
    },
    configureTheOptionsAndStartGeneratingToSeeTheResultHere: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `完成设置并开始生成，你可以在这里查看结果。`
      }
    },
    aiVideoGenerator: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `AI 视频生成`
      }
    },
    createCompleteVideosFromMultimodalReferences: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `用多模态参考，生成完整视频`
      }
    },
    enterAPromptAndOptionallyAddImageVideoOrAudioReferences: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `输入创意描述，可选图片、视频和音频作为参考，让画面、动作与声音更贴合你的创意。`
      }
    },
    currentOptionWithSeparator: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `当前规格 ·`
      }
    },
    millionTokens: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `/百万 Token`
      }
    },
    describeTheVideoYouWant: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `描述你想生成的视频`
      }
    },
    includeTheSubjectActionCameraSettingAndSound: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `建议写清主体、动作、镜头、环境和声音`
      }
    },
    videoPrompt: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `视频描述`
      }
    },
    addReferenceMediaOptional: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `添加参考素材（可选）`
      }
    },
    upTo5Images1VideoAnd1AudioFile: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `图片最多 5 张，视频和音频各 1 个`
      }
    },
    clickOrDropImagesVideoOrAudioHere: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `点击选择，或把图片、视频、音频拖到这里`
      }
    },
    images15mbVideo100mbAudio15mbDuration215sTotal200mb: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `图片 ≤15MB · 视频 ≤100MB · 音频 ≤15MB · 音视频时长 2～15 秒 · 总计 ≤200MB`
      }
    },
    audioRequiresAtLeastOneImageOrVideoReference: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `音频不能单独使用，请同时上传至少 1 张图片或 1 个视频`
      }
    },
    s: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `秒`
      }
    },
    removeReferenceMedia: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `删除参考素材`
      }
    },
    audioCannotBeUsedAloneAddAtLeastOneImageOrVideo: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `不可单独输入音频，应至少包含 1 个参考视频或图片。`
      }
    },
    theMostUsefulOutputSettings: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `只保留出片最常用的设置`
      }
    },
    frameAspectRatio: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `画面比例`
      }
    },
    videoAspectRatio: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `视频比例`
      }
    },
    resolution: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `清晰度`
      }
    },
    videoResolution: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `视频清晰度`
      }
    },
    duration: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `视频时长`
      }
    },
    generateAudio: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `生成声音`
      }
    },
    addAiWatermark: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `添加 AI 生成水印`
      }
    },
    keepAnAiContentLabelInTheVideo: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `在成片中保留 AI 内容标识`
      }
    },
    currentRate: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `当前计费 ·`
      }
    },
    perMillionTokensSpaced: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `/ 百万 Token`
      }
    },
    finalChargeIsBasedOnActualTokenUsage: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `生成成功后按实际消耗 Token 结算`
      }
    },
    previewAndDownloadWhenComplete: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `生成完成后可在线预览并下载`
      }
    },
    seedanceIsGeneratingYourVideo: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Seedance 正在生成视频`
      }
    },
    highResolutionOrLongerVideosTakeMoreTimeBillingCompletesAutomatically: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `高分辨率或长视频需要更多时间，完成后会自动结算。`
      }
    },
    usage: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `本次消耗`
      }
    },
    tokensCharged: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Token · 扣除 `
      }
    },
    videoCompletePleaseDownloadAndSaveItPromptly: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `视频生成完成，请尽快下载并妥善保存。`
      }
    },
    yourVideoWillAppearHere: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `生成的视频会显示在这里`
      }
    },
    describeYourIdeaAndAddReferenceMediaAsNeeded: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `描述创意并按需添加参考素材。`
      }
    },
    voiceStudio: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `声音创作中心`
      }
    },
    voicePricing: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `声音服务定价`
      }
    },
    generateSpeech: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `生成语音`
      }
    },
    cloneVoice: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `克隆音色`
      }
    },
    speechPricingLabel: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `语音生成`
      }
    },
    voiceClonePricingLabel: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `声音克隆`
      }
    },
    per10kChars: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `/ 万字符`
      }
    },
    perVoice: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `/ 个音色`
      }
    },
    enterTextChooseAVoiceAndGenerateAudio: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `输入文字，选择音色并生成音频`
      }
    },
    cloneAndManageVoices: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `克隆与管理音色`
      }
    },
    createTrainAndManageCustomVoices: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `创建、训练和管理专属音色`
      }
    },
    voiceTools: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `声音功能`
      }
    },
    newVoice: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `新增音色`
      }
    },
    createACustomVoiceTheFirstSubmissionIsCharged: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `创建一个新的专属音色，首次提交收取音色费用`
      }
    },
    trainAnExistingVoice: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `训练已有音色`
      }
    },
    chooseALanguageAndRecordingForANewTrainingRun: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `重新选择语言和录音，提交本次新的训练`
      }
    },
    chooseAnAction: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `请选择要进行的操作`
      }
    },
    createAVoiceOrSelectOneFromYourLibraryToTrain: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `创建新音色，或者从音色库选择一个已有音色进行本次训练。`
      }
    },
    managingAnExistingVoice: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `正在管理已有音色`
      }
    },
    statusUpdatesPausedCheckTheTrainingResultAgain: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `状态查询已暂停，请重新查询训练结果`
      }
    },
    aNewPreviewIsBeingGenerated: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `新的试听正在生成，完成后可以继续管理`
      }
    },
    chooseALanguageAndUploadARecordingToUpdateThePreview: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `重新选择语言并上传录音；成功后会更新当前试听`
      }
    },
    createVoice: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `新建音色`
      }
    },
    voiceName: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `音色名称`
      }
    },
    forExampleMyNarrator: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `例如：我的旁白声`
      }
    },
    recordingLanguage: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `录音语言`
      }
    },
    uploadRecording: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `上传声音录音`
      }
    },
    naturalSpeechAQuietRoomAndOneSpeakerWorkBest: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `自然说话、环境安静、只有一位说话人效果更好`
      }
    },
    clickToReplaceTheRecording: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `点击可更换录音`
      }
    },
    recordingTranscriptRecommended: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `录音文字（推荐填写）`
      }
    },
    enterTheExactSpokenWordsForMoreAccurateProcessing: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `填写录音中实际说出的内容，文字与录音一致更有助于准确处理。`
      }
    },
    previewText: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `设置试听内容`
      }
    },
    usePreviewTextInTheSelectedRecordingLanguage: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `试听文字请使用与所选录音语言一致的内容`
      }
    },
    restoreExample: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `恢复示例`
      }
    },
    voicePreviewText: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `试听文字`
      }
    },
    reduceBackgroundNoise: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `减少环境杂音`
      }
    },
    recommendedWhenTheRecordingHasLightBackgroundNoise: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `录音中有轻微底噪时建议开启`
      }
    },
    preserveOriginalVolume: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `保留原始音量`
      }
    },
    keepTheRecordingCloseToItsOriginalVolume: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `尽量保留录音原有的声音大小`
      }
    },
    iConfirmThatIHavePermissionToUseThisVoiceAndRecording: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `我确认已获得这段声音及说话人的合法授权，并同意将其用于创建音色。`
      }
    },
    createVoiceAction: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `创建音色`
      }
    },
    chargedAfterTheSubmissionIsAccepted: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `提交被接受后扣费`
      }
    },
    thisTrainingRun: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `本次训练`
      }
    },
    free: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `不收费`
      }
    },
    noDuplicateVoiceFee: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `不会重复收取音色费用`
      }
    },
    checkStatusAgain: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `重新查询状态`
      }
    },
    finalized: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `已定稿`
      }
    },
    trainingLocked: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `不可再训练`
      }
    },
    trainingRunsUsed: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `已复刻训练次数`
      }
    },
    runs: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `次`
      }
    },
    statusUpdatesPaused: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `状态查询已暂停`
      }
    },
    theResultIsCurrentlyUnavailableSelectCheckStatusAgain: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `暂时无法确认训练结果，请点击左侧的“重新查询状态”。`
      }
    },
    preparingANewPreview: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `正在准备新的试听`
      }
    },
    youCanStayHereThePreviewWillAppearAutomatically: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `你可以停留在这里等待，完成后会自动显示。`
      }
    },
    finalizeVoice: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `转正音色`
      }
    },
    generateWithThisVoice: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `用此音色生成语音`
      }
    },
    noPreviewAvailableYet: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `还没有可试听的声音`
      }
    },
    voiceId: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `音色 ID`
      }
    },
    thePreviewWillAppearHere: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `试听会显示在这里`
      }
    },
    enterTheDetailsAndUploadARecordingToCreateYourFirstVoice: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `填写信息并上传录音，开始创建你的第一个音色。`
      }
    },
    enterTextToSynthesize: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `输入合成内容`
      }
    },
    punctuationAndParagraphsAffectPauses: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `标点和分段会影响停顿，请按实际朗读方式填写`
      }
    },
    text: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `合成内容`
      }
    },
    chooseAVoice: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `选择音色`
      }
    },
    curatedAndCustomVoicesArePricedSeparately: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `精选音色和你的专属音色分别计价，生成前会显示预计费用`
      }
    },
    curatedVoices: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `精选音色`
      }
    },
    myVoices: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `我的音色`
      }
    },
    voiceSource: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `音色来源`
      }
    },
    searchVoices: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `搜索音色`
      }
    },
    searchByNameUseCaseOrLanguage: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `搜索音色、声音特点或支持语言`
      }
    },
    loadingVoices: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `正在加载音色…`
      }
    },
    signInToChooseAVoice: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `登录后选择音色`
      }
    },
    signInToUseCuratedAndCustomVoices: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `登录后可以使用精选音色和你已创建的专属音色。`
      }
    },
    createACustomVoice: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `创建专属音色`
      }
    },
    noMatchingVoices: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `没有找到匹配的音色`
      }
    },
    tryAnotherNameUseCaseOrLanguage: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `换个名称、场景或语言试试。`
      }
    },
    featured: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `推荐`
      }
    },
    femaleVoice: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `女声`
      }
    },
    maleVoice: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `男声`
      }
    },
    childAge: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `儿童`
      }
    },
    teenAge: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `少年/少女`
      }
    },
    youngAdultAge: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `青年`
      }
    },
    middleAgedAge: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `中年`
      }
    },
    seniorAge: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `老年`
      }
    },
    outputSettings: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `调整输出`
      }
    },
    unchangedOptionsUseSystemDefaults: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `未调整的能力会使用系统默认效果`
      }
    },
    spokenLanguage: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `朗读语言`
      }
    },
    speechRate: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `语速`
      }
    },
    slower: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `较慢`
      }
    },
    reset: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `恢复正常`
      }
    },
    faster: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `较快`
      }
    },
    estimatedCost: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `预计费用`
      }
    },
    chargedByProcessedCharactersAnyExcessIsRefunded: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `按实际合成字符结算，多扣部分自动退回`
      }
    },
    theEstimateIsReservedFirstFailedJobsAreRefundedAndSuccessfulJobs: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `提交时会先预扣预计费用；生成失败会自动退回，成功后按照实际处理字符数结算。`
      }
    },
    audioResult: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `语音结果`
      }
    },
    youCanLeaveAfterSubmittingProgressResumesWhenYouReturn: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `任务提交后可离开页面，再次进入会继续同步结果`
      }
    },
    synthesisComplete: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `合成完成`
      }
    },
    thisVoiceWasFinalizedAutomaticallyAndCanNoLongerBeTrained: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `该音色已自动转为正式音色，后续无法继续训练。`
      }
    },
    characters: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `个字符`
      }
    },
    actualCharge: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `实际扣除 `
      }
    },
    synthesisFailed: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `本次合成未成功`
      }
    },
    theChargeWasRefundedAdjustTheTextOrVoiceAndTryAgain: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `费用已经自动退回，可以调整内容或更换音色后重试。`
      }
    },
    generatedAudioWillAppearHere: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `生成的语音会显示在这里`
      }
    },
    enterTextChooseAVoiceAndStartGenerating: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `输入文字、选择音色，然后开始生成。`
      }
    },
    close: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `关闭`
      }
    },
    loadingVoiceLibrary: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `正在加载音色库…`
      }
    },
    retrainingRunsLeft: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `· 重新训练次数余额`
      }
    },
    reviewSynthesisAndVoiceTrainingResultsInOnePlace: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `统一查看生成语音和音色训练的处理结果`
      }
    },
    synthesis: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `语音生成`
      }
    },
    voiceTraining: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `音色训练`
      }
    },
    activityType: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `记录类型`
      }
    },
    loadingHistory: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `正在加载生成记录…`
      }
    },
    failedToLoad: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `加载失败`
      }
    },
    noHistoryYet: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `还没有生成记录`
      }
    },
    yourFirstSubmissionWillAppearHere: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `完成第一次提交后会显示在这里。`
      }
    },
    run: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `第`
      }
    },
    trainingAttemptSuffix: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `次训练`
      }
    },
    recording: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `录音：`
      }
    },
    viewVoice: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `查看音色`
      }
    },
    yourFirstSynthesisWillAppearHere: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `完成第一次语音生成后会显示在这里。`
      }
    },
    thisVoiceWasFinalizedAutomaticallyAfterTheSuccessfulGeneration: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `本次生成成功后，该音色已自动转为正式音色。`
      }
    },
    charactersWithSeparator: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `个字符 ·`
      }
    },
    actual: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `· 实际 `
      }
    },
    thisVoiceWillBeLockedAfterGeneration: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `生成后将锁定此音色`
      }
    },
    onlyASuccessfulGenerationWillFinalize: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `只有本次生成成功，音色“`
      }
    },
    youCanContinueGeneratingAudioButCannotUploadSamplesOrTrainIt: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `”才会转为正式音色。之后仍可继续生成语音，但无法再上传样本或继续训练。`
      }
    },
    notNow: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `暂不生成`
      }
    },
    confirmAndGenerate: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `确认并生成`
      }
    },
    confirmGenerationWithClonedVoice: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `确认使用克隆音色生成语音`
      }
    },
    finalizeThisVoice: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `确认转正此音色？`
      }
    },
    afterFinalizingYouCannotUploadMoreSamplesOrContinueTrainingThisCannot: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `转正后将无法继续上传声音样本或进行训练，当前试听效果将作为最终版本。此操作不可撤销。`
      }
    },
    doNotFinalizeYet: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `暂不转正`
      }
    },
    recentGenerations: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `的最近生成记录`
      }
    },
    yourFirstGenerationWillAppearHere: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `完成第一次生成后会显示在这里。`
      }
    },
    generatedImage: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `历史生成图片`
      }
    },
    viewGeneratedImage: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `查看生成图片`
      }
    },
    generatedVideoCover: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `历史生成视频封面`
      }
    },
    playGeneratedVideo: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `播放历史生成视频`
      }
    },
    resultLinkExpired: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `结果链接已过期`
      }
    },
    downloaded: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `已下载`
      }
    },
    generated: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `生成于`
      }
    },
    cost: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `本次费用`
      }
    },
    pending: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `待结算`
      }
    },
    notCharged: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `未扣费`
      }
    },
    tokenUsage: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Token 消耗`
      }
    },
    previous: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `上一页`
      }
    },
    tenPerPage: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `页 · 每页 10 条`
      }
    },
    next: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `下一页`
      }
    },
    signInToXiaoheiToolbox: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `登录小白工具箱`
      }
    },
    useYourXiaoheiDailyAssistantAccountBalanceAndTopUpsSyncAutomatically: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `使用小白日报账号，积分和充值记录自动同步。`
      }
    },
    email: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `邮箱`
      }
    },
    enterYourEmail: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `请输入注册邮箱`
      }
    },
    password: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `密码`
      }
    },
    enterYourPassword: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `请输入密码`
      }
    },
    iHaveReadAndAgreeToThe: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `我已阅读并同意`
      }
    },
    and: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `和`
      }
    },
    registrationAndPasswordRecoveryAreAvailableInTheDesktopApp: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `暂不支持网页注册和找回密码，请在小白日报客户端完成。`
      }
    },
    topUpsAreAddedToTheSharedBalanceForTheAppAnd: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `充值金额会按当前比例兑换为账户积分，可在客户端和工具箱中使用。`
      }
    },
    currentBalance: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `当前积分`
      }
    },
    credit: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `到账 `
      }
    },
    payWithWechat: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `微信扫码支付`
      }
    },
    scanWithWechatYourBalanceUpdatesAutomaticallyAfterPayment: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `请使用微信扫描二维码，支付成功后积分会自动到账。`
      }
    },
    waitingForPayment: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `等待支付结果…`
      }
    },
    order: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `订单号：`
      }
    },
    topUpComplete: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `充值成功`
      }
    },
    hasBeenAddedToYourBalance: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `已兑换为你的账户积分。`
      }
    },
    newBalance: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `最新积分`
      }
    },
    done: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `完成`
      }
    },
    x: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `小`
      }
    },
    seedance20BilledByActualTokenUsage: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Seedance 2.0 · 按实际 Token 结算`
      }
    },
    gptImage2PayPerGeneration: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `GPT Image 2 · 按次付费`
      }
    },
    seedream50ProPayPerGeneration: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Seedream 5.0 Pro · 按次付费`
      }
    },
    youCanUploadUpTo10ReferenceImages: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `参考图最多上传 10 张`
      }
    },
    youCanUploadUpTo5ReferenceImages: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `参考图最多上传 5 张`
      }
    },
    youCanUpload1ReferenceVideo: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `参考视频最多上传 1 个`
      }
    },
    youCanUpload1ReferenceAudioFile: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `参考音频最多上传 1 个`
      }
    },
    referenceMediaCannotExceed200mbInTotal: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `全部参考素材总大小不能超过 200MB`
      }
    },
    audioRequiresAtLeastOneReferenceImageOrVideo: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `不可单独输入音频，应至少包含 1 个参考视频或图片`
      }
    },
    videoGenerationFailedYouWillNotBeCharged: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `视频生成未成功，本次费用不会扣除`
      }
    },
    pleaseAgreeToTheTermsOfServiceAndPrivacyPolicy: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `请先阅读并同意用户协议和隐私政策`
      }
    },
    enterYourEmailAndPassword: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `请输入邮箱和密码`
      }
    },
    imageGenerationFailedTheChargeWasRefunded: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `图片生成失败，本次费用已自动退回`
      }
    },
    aPreviewIsBeingPreparedFromYourRecordingThisUsuallyTakesA: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `系统正在根据录音准备试听效果，通常需要几分钟。`
      }
    },
    finalizeTheVoiceWhenSatisfiedOrUploadAnotherRecordingToImproveIt: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `试听满意后可以直接转正，也可以更换录音继续优化。`
      }
    },
    tryAgainWithAClearerRecordingFromAQuieterEnvironment: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `建议更换一段更清晰、环境更安静的录音后重试。`
      }
    },
    thisVoiceWasFinalizedAfterASuccessfulGenerationAndCannotBeTrained: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `该音色已在成功生成语音后自动转正，无法再继续训练。`
      }
    },
    thisVoiceIsFinalizedAndRemainsAvailableForPreviewAndDownload: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `该音色已完成定稿，可以长期试听和下载。`
      }
    },
    noUsablePreviewWasGeneratedPleaseContactSupport: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `没有生成可用试听，请联系客服协助处理。`
      }
    },
    theLastSubmissionFailedAndWasNotChargedYouCanSubmitAgain: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `上次提交未成功，本次未扣费，可以直接重新提交。`
      }
    },
    uploadARecordingToBegin: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `上传一段录音即可开始。`
      }
    },
    onlyWavMp3OggM4aAndAacAreSupported: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `仅支持 WAV、MP3、OGG、M4A 和 AAC 格式`
      }
    },
    theRecordingCannotExceed10mb: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `录音文件不能超过 10MB`
      }
    },
    enterAVoiceNameWithAtLeast2Characters: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `请给音色起一个至少 2 个字符的名称`
      }
    },
    chooseARecordingToClone: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `请先选择一段用于复刻的录音`
      }
    },
    previewTextMustContainAtLeast4Characters: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `试听文字至少需要 4 个字符`
      }
    },
    confirmThatYouHavePermissionToUseThisVoice: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `请先确认你拥有这段声音的使用授权`
      }
    },
    synthesisFailedAndTheChargeWasRefundedPleaseTryAgain: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `本次合成未成功，费用已自动退回，请重新尝试。`
      }
    },
    couldNotCheckSynthesisStatusRetryingAutomatically: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `合成状态查询暂时失败，系统会自动重试`
      }
    },
    chooseAVoiceFirst: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `请先选择一个音色`
      }
    },
    switchToLightMode: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `切换浅色模式`
      }
    },
    switchToDarkMode: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `切换深色模式`
      }
    },
    onePlaceForEverySmallTask: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `一个入口，解决每个小任务`
      }
    },
    fileProcessingKnowledgeOrganizationContentGenerationAndMoreUsefulToolsAreOnTheWay: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `文件处理、知识整理、内容生成，还有更多实用工具会持续加入。`
      }
    },
    imageVideoAndVoiceToolsAreAvailableWithPayAsYouGo: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `图片、视频和声音工具已开放，使用账户积分按需扣除。`
      }
    },
    useImageVideoVoiceAndProductivityToolsFromOnePlace: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `把常用的图片、视频、声音与效率能力集中到一个入口，按需使用。`
      }
    },
    testing: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `测试中`
      }
    },
    comingSoon: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `即将上线`
      }
    },
    copyright2026XiaoheiDailyAssistant: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `© 2026 小白日报`
      }
    },
    uploading: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `正在上传…`
      }
    },
    uploadingReferenceImages: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `参考图上传中…`
      }
    },
    generateNow: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `立即生成`
      }
    },
    signInToGenerate: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `登录后生成`
      }
    },
    keepThisPageOpenWhileTheImageIsGeneratedTheResultWill: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `图片生成期间请保持页面打开，完成后会在右侧显示结果。`
      }
    },
    theSelectedOptionIsChargedOnTheServerFailedGenerationsAreRefunded: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `服务端按所选规格扣费；生成失败会自动退回本次费用。`
      }
    },
    generatingThisMayTakeAMoment: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `生成需要一点时间，请耐心等待…`
      }
    },
    standardModeMayTakeTensOfSecondsKeepThisPageOpen: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `标准模式可能需要几十秒，请保持页面打开。`
      }
    },
    preparingDownload: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `准备下载…`
      }
    },
    downloadOriginal: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `下载原图`
      }
    },
    imageMediaType: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `图片`
      }
    },
    video: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `视频`
      }
    },
    audio: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `音频`
      }
    },
    uploadingMedia: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `正在上传素材…`
      }
    },
    referenceAudioAddedAudioGenerationMustStayEnabled: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `已添加参考音频，需要保持开启`
      }
    },
    generateAmbienceDialogueOrMusicWithTheVideo: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `让模型同步生成环境音、对白或配乐`
      }
    },
    mediaUploadInProgress: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `素材上传中…`
      }
    },
    generateVideo: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `立即生成视频`
      }
    },
    videoGenerationUsuallyTakesSeveralMinutesKeepThisPageOpen: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `视频通常需要数分钟生成，请保持页面打开等待结果。`
      }
    },
    failedOrCancelledJobsAreNotChargedSuccessfulJobsAreBilledBy: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `生成失败或任务取消不会扣费；只有生成成功才会按照实际 Token 结算。`
      }
    },
    downloadVideo: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `下载视频`
      }
    },
    turnTextIntoNaturalSpeech: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `把文字变成自然的声音`
      }
    },
    createYourOwnCustomVoice: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `创建属于你的专属音色`
      }
    },
    generateSpeechWithCuratedOrCustomVoicesThenPreviewAndDownloadIt: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `使用精选音色或自己的克隆音色生成语音，完成后可直接试听与下载。`
      }
    },
    uploadAClearVoiceRecordingToCreateAPreviewAndUseIt: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `上传一段清晰的人声生成试听，满意后可直接用于语音创作。`
      }
    },
    createANewVoice: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `创建新的音色`
      }
    },
    chooseANewLanguageAndRecordingForEachTrainingRun: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `每次训练都可以重新选择录音语言和录音内容`
      }
    },
    theNameIsOnlyUsedToOrganizeYourVoices: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `名称仅用于你自己区分和管理`
      }
    },
    clickOrDropARecordingHere: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `点击选择，或把录音拖到这里`
      }
    },
    wavMp3OggM4aOrAacMaximum10mb: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `支持 WAV、MP3、OGG、M4A、AAC，文件不超过 10MB`
      }
    },
    submitting: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `正在提交…`
      }
    },
    preparingPreview: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `正在准备试听…`
      }
    },
    submitTraining: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `提交本次训练`
      }
    },
    createAndTrain: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `创建并开始训练`
      }
    },
    signInToCreate: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `登录后创建`
      }
    },
    localValidationErrorsAndFailedSubmissionsAreNotCharged: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `本地检查或提交未成功不会扣费。`
      }
    },
    thisRunUsesTheSelectedLanguageAndRecordingThePreviewUpdatesWhen: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `本次只处理当前选择的语言和录音；成功后更新当前试听，次数余额请在音色库查看。`
      }
    },
    finalVoice: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `正式音色`
      }
    },
    voicePreview: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `音色试听`
      }
    },
    finalizedAndAlwaysAvailableForPreviewAndDownload: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `已完成定稿，可随时试听和下载`
      }
    },
    availableForPreviewAndDownloadAfterCompletion: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `成功后可长期试听与下载`
      }
    },
    updatesPaused: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `查询已暂停`
      }
    },
    theTrainingResultIsUnavailableCheckTheStatusAgain: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `暂时无法确认训练结果，请重新查询状态。`
      }
    },
    latestPreview: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `最新试听`
      }
    },
    previewOfTheFinalizedVoice: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `当前正式音色的试听效果`
      }
    },
    previewOfTheLatestTrainingRun: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `当前音色的最新训练效果`
      }
    },
    downloadPreview: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `下载试听`
      }
    },
    thePreviewRemainsAvailableForPlaybackAndDownload: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `试听文件将持续保存，可随时试听和下载。`
      }
    },
    thePreviewIsSavedAndUpdatesAfterASuccessfulTrainingRun: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `试听文件将持续保存；后续训练成功后会自动更新为最新版本。`
      }
    },
    tryAgainWithAClearerRecording: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `更换一段清晰录音再试一次。`
      }
    },
    yourPreviewWillAppearHereAfterTheFirstTrainingRun: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `完成第一次训练后，试听会显示在这里。`
      }
    },
    noCustomVoicesAvailable: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `还没有可用的专属音色`
      }
    },
    noVoicesAvailable: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `暂无可用音色`
      }
    },
    afterCreatingAVoiceGenerateSpeechWithoutLeavingThisTool: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `创建音色后，无需离开当前工具即可直接生成语音。`
      }
    },
    theVoiceIsStillBeingPreparedCheckBackLater: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `音色正在准备中，请稍后再来。`
      }
    },
    myCustomVoices: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `我的专属音色`
      }
    },
    naturalClearCuratedVoices: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `自然清晰的精选音色`
      }
    },
    hidePreview: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `收起试听`
      }
    },
    preview: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `试听`
      }
    },
    synthesizing: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `正在合成…`
      }
    },
    downloadAudio: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `下载音频`
      }
    },
    audioGeneratedAndSavedForFutureAccess: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `语音已经生成，正在为你长期保存。`
      }
    },
    longerTextTakesMoreTimeYouCanLeaveAndCheckTheHistory: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `内容越长需要的时间越久，你可以离开页面后再到生成记录查看。`
      }
    },
    chooseAnExistingVoiceToTrain: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `选择已有音色进行训练`
      }
    },
    chooseAnExistingVoice: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `选择已有音色`
      }
    },
    chooseAVoiceForThisTrainingRun: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `选择一个音色，进入本次训练`
      }
    },
    viewAndManageYourVoices: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `查看和管理已创建的音色`
      }
    },
    noTrainableVoices: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `没有可训练的音色`
      }
    },
    noVoicesAvailableYet: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `还没有可用音色`
      }
    },
    createAndTrainAVoiceBeforeSelectingItHere: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `请先新增一个音色，训练成功后可再次从这里选择。`
      }
    },
    aVoiceAppearsHereAfterItsFirstSuccessfulTrainingRun: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `音色首次训练成功后，会显示在这里。`
      }
    },
    createYourFirstVoice: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `创建第一个音色`
      }
    },
    selectForTraining: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `选择训练`
      }
    },
    trainVoice: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `训练音色`
      }
    },
    loading: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `加载中…`
      }
    },
    loadMore: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `加载更多`
      }
    },
    preparing: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `准备中…`
      }
    },
    download: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `下载`
      }
    },
    finalizing: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `正在转正…`
      }
    },
    confirmFinalization: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `确认转正`
      }
    },
    downloadResult: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `下载结果`
      }
    },
    signingIn: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `正在登录…`
      }
    },
    creatingOrder: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `正在创建订单…`
      }
    },
    retryingAutomatically: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `正在自动重试`
      }
    },
    theSystemWillRetryAutomatically: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `系统会自动重试`
      }
    },
    speechTtsprice10kCharactersAndUpNewVoiceVoiceprice: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3,
          v: `语音生成 `
        }, {
          t: 4,
          k: `ttsPrice`
        }, {
          t: 3,
          v: ` 积分 / 万字符起 · 新建音色 `
        }, {
          t: 4,
          k: `voicePrice`
        }, {
          t: 3,
          v: ` 积分 / 个`
        }]
      }
    },
    withVideoWithvideoMillionTokensWithoutVideoWithoutvideoMillionTokens: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3,
          v: `输入含视频 `
        }, {
          t: 4,
          k: `withVideo`
        }, {
          t: 3,
          v: ` 积分/百万 Token · 输入不含视频 `
        }, {
          t: 4,
          k: `withoutVideo`
        }, {
          t: 3,
          v: ` 积分/百万 Token`
        }]
      }
    },
    creditsUnit: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `积分`
      }
    },
    youCanAddCountMoreReferenceImages: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3,
          v: `最多还能添加 `
        }, {
          t: 4,
          k: `count`
        }, {
          t: 3,
          v: ` 张参考图`
        }]
      }
    },
    nameIsNotASupportedImageFormat: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 4,
          k: `name`
        }, {
          t: 3,
          v: ` 不是支持的图片格式`
        }]
      }
    },
    nameExceedsTheLimitMbLimit: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 4,
          k: `name`
        }, {
          t: 3,
          v: ` 超过 `
        }, {
          t: 4,
          k: `limit`
        }, {
          t: 3,
          v: `MB 限制`
        }]
      }
    },
    nameIsNotASupportedImageVideoOrAudioFormat: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 4,
          k: `name`
        }, {
          t: 3,
          v: ` 不是支持的图片、视频或音频格式`
        }]
      }
    },
    nameHasAlreadyBeenAdded: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 4,
          k: `name`
        }, {
          t: 3,
          v: ` 已添加，无需重复上传`
        }]
      }
    },
    nameMustBeBetween2And15SecondsLong: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 4,
          k: `name`
        }, {
          t: 3,
          v: ` 的时长需在 2～15 秒之间`
        }]
      }
    },
    fasterValue: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3,
          v: `加快 `
        }, {
          t: 4,
          k: `value`
        }, {
          t: 3,
          v: `%`
        }]
      }
    },
    slowerValue: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3,
          v: `放慢 `
        }, {
          t: 4,
          k: `value`
        }, {
          t: 3,
          v: `%`
        }]
      }
    },
    languageAndCountLanguages: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 4,
          k: `language`
        }, {
          t: 3,
          v: `等`
        }, {
          t: 4,
          k: `count`
        }, {
          t: 3,
          v: `种`
        }]
      }
    },
    enterBetween1AndCountCharacters: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3,
          v: `请输入 1～`
        }, {
          t: 4,
          k: `count`
        }, {
          t: 3,
          v: ` 个字符的内容`
        }]
      }
    },
    countTrainableVoices: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3,
          v: `共 `
        }, {
          t: 4,
          k: `count`
        }, {
          t: 3,
          v: ` 个可训练音色`
        }]
      }
    },
    countVoices: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3,
          v: `共 `
        }, {
          t: 4,
          k: `count`
        }, {
          t: 3,
          v: ` 个音色`
        }]
      }
    },
    payAmountWithWechat: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3,
          v: `微信支付 ¥`
        }, {
          t: 4,
          k: `amount`
        }]
      }
    },
    chinese: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `中文`
      }
    },
    english: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `英文`
      }
    },
    japanese: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `日语`
      }
    },
    korean: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `韩语`
      }
    },
    spanish: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `西班牙语`
      }
    },
    french: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `法语`
      }
    },
    german: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `德语`
      }
    },
    russian: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `俄语`
      }
    },
    portuguese: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `葡萄牙语`
      }
    },
    indonesian: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `印尼语`
      }
    },
    outputResolution: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `分辨率`
      }
    },
    outputDuration: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `时长`
      }
    },
    referenceMedia: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `参考素材`
      }
    },
    referenceImages: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `参考图`
      }
    },
    aiWatermark: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `AI 水印`
      }
    },
    added: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `已添加`
      }
    },
    notAdded: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `未添加`
      }
    },
    standard: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `标准`
      }
    },
    fast: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `快速`
      }
    },
    on: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `开启`
      }
    },
    off: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `已关闭`
      }
    },
    images: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `张`
      }
    },
    pleaseSignIn: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `请先登录`
      }
    },
    yourSessionExpiredPleaseSignInAgain: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `登录状态已失效，请重新登录`
      }
    },
    toolboxAuthorizationFailedPleaseTryAgain: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `工具箱授权失败，请稍后重试`
      }
    },
    toolboxRequestFailedPleaseTryAgain: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `工具箱请求失败，请稍后重试`
      }
    },
    downloadFailedPleaseTryAgain: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `文件下载失败，请稍后重试`
      }
    },
    mediaUploadFailedPleaseTryAgain: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `素材分片上传失败，请重试`
      }
    },
    invalidMediaUploadAddress: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `素材上传地址无效`
      }
    },
    invalidToolboxApiAddress: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `工具箱接口地址无效`
      }
    },
    invalidToolboxDownloadAddress: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `工具箱下载地址无效`
      }
    },
    playbackProgress: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `播放进度`
      }
    },
    pause: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `暂停`
      }
    },
    play: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `播放`
      }
    },
    audioUnavailable: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `音频不可用`
      }
    },
    mute: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `静音`
      }
    },
    unmute: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `取消静音`
      }
    },
    mayEveryThoughtfulExpressionBeHeardWithCare: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `愿每一次认真表达，都能被温柔地听见。`
      }
    },
    autoDetect: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `自动识别`
      }
    },
    auto: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `自动`
      }
    },
    adaptive: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `智能适配`
      }
    },
    standardQualityFirst: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `标准 · 质量优先`
      }
    },
    fastSpeedFirst: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `快速 · 速度优先`
      }
    },
    aspectRatio1To1Square: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `1:1 · 方形`
      }
    },
    aspectRatio3To2Landscape: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `3:2 · 横向`
      }
    },
    frameAspectRatioTo3Portrait: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `2:3 · 竖向`
      }
    },
    aspectRatio4To3Landscape: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `4:3 · 横向`
      }
    },
    aspectRatio3To4Portrait: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `3:4 · 竖向`
      }
    },
    aspectRatio16To9Widescreen: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `16:9 · 宽屏`
      }
    },
    aspectRatio16To9Landscape: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `16:9 · 横屏`
      }
    },
    aspectRatio9To16Portrait: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `9:16 · 竖屏`
      }
    },
    includesVideoInput: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `输入含视频`
      }
    },
    noVideoInput: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `输入不含视频`
      }
    },
    resolution4kUltraHd: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `4K · 超高清`
      }
    },
    resolution1080pFullHd: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `1080p · 全高清`
      }
    },
    resolution720pHd: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `720p · 高清`
      }
    },
    unknownTime: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `时间未知`
      }
    },
    completedStatus: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `已完成`
      }
    },
    generationFailed: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `生成失败`
      }
    },
    cancelled: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `已取消`
      }
    },
    generating: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `生成中`
      }
    },
    submittingStatus: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `正在提交`
      }
    },
    generatingPreview: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `正在生成试听`
      }
    },
    canBeImproved: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `可继续优化`
      }
    },
    unsuccessful: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `本次未成功`
      }
    },
    formalizedStatus: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `已转正`
      }
    },
    noTrainingRunsLeft: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `训练次数已用完`
      }
    },
    notStarted: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `待开始`
      }
    },
    failed: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `未成功`
      }
    },
    rejected: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `未被接受`
      }
    },
    processing: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `处理中`
      }
    },
    normal: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `正常`
      }
    },
    pleaseSignInToUseTheToolbox: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `请先登录后再使用工具箱`
      }
    },
    yourSessionExpiredPleaseReopenTheToolbox: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `客户端登录状态已失效，请重新进入工具箱`
      }
    },
    signInBeforeUploadingReferenceImages: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `请先登录后上传参考图`
      }
    },
    enterAnImagePrompt: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `请先输入图片描述`
      }
    },
    enterAVideoPrompt: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `请先输入视频描述`
      }
    },
    referenceImagesAreStillUploading: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `参考图仍在上传，请稍候`
      }
    },
    referenceMediaIsStillUploading: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `参考素材仍在上传，请稍候`
      }
    },
    aReferenceImageFailedToUploadRemoveItAndTryAgain: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `有参考图上传失败，请删除后重新添加`
      }
    },
    referenceMediaFailedToUploadRemoveItAndTryAgain: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `有参考素材上传失败，请删除后重新添加`
      }
    },
    insufficientBalancePleaseTopUpFirst: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `账户积分不足，请先充值`
      }
    },
    uploadTimedOutRemoveTheFileAndTryAgain: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `上传超时，请删除后重试`
      }
    },
    uploadFailed: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `上传失败`
      }
    },
    mediaValidationFailedAddTheFileAgain: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `素材校验失败，请重新添加`
      }
    },
    thisClientCannotValidateTheMediaPleaseUpdateAndTryAgain: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `当前环境无法校验素材，请升级客户端后重试`
      }
    },
    imageDownloadFailedPleaseTryAgain: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `图片下载失败，请稍后重试`
      }
    },
    videoDownloadFailedPleaseTryAgain: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `视频下载失败，请稍后重试`
      }
    },
    couldNotPrepareTheDownloadPleaseTryAgain: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `下载准备失败，请稍后重试`
      }
    },
    statusCheckFailedRetryingAutomatically: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `状态查询失败，正在自动重试`
      }
    },
    failedToLoadTheToolbox: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `工具箱加载失败`
      }
    },
    signInFailed: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `登录失败`
      }
    },
    imageGenerationFailed: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `图片生成失败`
      }
    },
    videoGenerationFailed: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `视频生成失败`
      }
    },
    submissionFailedPleaseTryAgain: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `提交失败，请稍后重试`
      }
    },
    failedToLoadGenerationHistory: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `生成记录加载失败`
      }
    },
    failedToLoadVoices: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `音色列表加载失败`
      }
    },
    failedToLoadVoicesPleaseTryAgain: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `音色加载失败，请稍后重试`
      }
    },
    voiceStatusCheckFailedTryAgain: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `音色状态查询失败，请重新查询`
      }
    },
    couldNotFinalizeTheVoicePleaseTryAgain: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `转正失败，请稍后重试`
      }
    },
    synthesisFailedShort: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `合成失败`
      }
    },
    savingAudio: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `正在保存音频`
      }
    },
    synthesizingStatus: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `正在合成`
      }
    },
    failedToLoadTopUpOptions: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `充值档位加载失败`
      }
    },
    couldNotCreateTheTopUpOrder: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `充值下单失败`
      }
    },
    markdownReader: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Markdown 阅读器`
      }
    },
    productivityCategory: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `效率工具`
      }
    },
    markdownReaderDescription: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `在本地阅读、编辑和另存 Markdown 文档，支持常见 Markdown 与 GFM 格式。`
      }
    },
    markdownReaderInputHint: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `选择本机的 .md 或 .markdown 文件开始阅读和编辑。`
      }
    },
    documentsCategory: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `文档`
      }
    },
    localTool: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `本地工具`
      }
    },
    freeTool: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `免费`
      }
    },
    untitledMarkdownDocument: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `未命名文档`
      }
    },
    markdownUnsaved: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `未保存`
      }
    },
    markdownSaved: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `已保存`
      }
    },
    markdownNewDocumentHint: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `新文档会在第一次保存时选择位置`
      }
    },
    openDocument: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `打开`
      }
    },
    saveDocument: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `保存`
      }
    },
    saveDocumentAs: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `另存为…`
      }
    },
    searchRecentDocuments: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `搜索最近文件`
      }
    },
    markdownRecentFiles: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `最近文件`
      }
    },
    markdownFileMissing: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `文件已移动或删除`
      }
    },
    removeFromRecent: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `从列表移除`
      }
    },
    noRecentMarkdownDocuments: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `还没有打开过 Markdown 文档`
      }
    },
    markdownNoSearchResults: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `没有匹配的文件`
      }
    },
    markdownClearSearch: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `清空搜索`
      }
    },
    markdownLocalPrivacyNote: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `本地处理，内容不上云`
      }
    },
    markdownShowPanel: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `显示侧栏`
      }
    },
    markdownHidePanel: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `隐藏侧栏`
      }
    },
    readMode: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `阅读`
      }
    },
    editMode: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `编辑`
      }
    },
    splitMode: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `分栏`
      }
    },
    markdownViewMode: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `查看方式`
      }
    },
    documentOutline: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `目录`
      }
    },
    markdownOutlineEmpty: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `文档里还没有标题`
      }
    },
    markdownUntitledHeading: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `（无标题）`
      }
    },
    reloadDocument: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `重新载入`
      }
    },
    showInFolder: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `在文件夹中显示`
      }
    },
    moreActions: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `更多操作`
      }
    },
    loadingMarkdownDocument: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `正在打开文档…`
      }
    },
    markdownEmptyTitle: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `打开一份 Markdown 文档`
      }
    },
    markdownReaderWelcome: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `阅读、编辑本机的 .md 文档，支持目录、表格、代码块、任务清单和本地图片。`
      }
    },
    markdownEmptyHint: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3,
          v: `也可以把文件拖到这里 · `
        }, {
          t: 4,
          k: `open`
        }, {
          t: 3,
          v: ` 打开 · `
        }, {
          t: 4,
          k: `create`
        }, {
          t: 3,
          v: ` 新建`
        }]
      }
    },
    markdownOpenFile: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `打开文件…`
      }
    },
    markdownOpenMenu: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `新建或打开`
      }
    },
    createMarkdownDocument: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `新建文档`
      }
    },
    markdownOpenDialogTitle: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `打开 Markdown 文档`
      }
    },
    markdownSaveAsDialogTitle: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `另存为`
      }
    },
    markdownFileFilterName: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Markdown 和文本文件`
      }
    },
    markdownEditorPlaceholder: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `从标题开始写，例如：# 本周复盘`
      }
    },
    markdownEditorLabel: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Markdown 编辑区`
      }
    },
    markdownPreviewEmpty: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `在编辑区输入内容，这里会实时预览`
      }
    },
    markdownFormattingTools: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `格式工具`
      }
    },
    markdownShowLineNumbers: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `显示行号`
      }
    },
    markdownSyncScroll: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `分栏同步滚动`
      }
    },
    markdownSoftBreaks: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `单个换行显示为换行`
      }
    },
    markdownResizeSplitPanes: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `调整编辑区和预览区宽度`
      }
    },
    markdownResizeSplitPanesHint: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `拖动调整宽度，双击恢复各占一半`
      }
    },
    markdownHeading1: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `一级标题`
      }
    },
    markdownHeading2: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `二级标题`
      }
    },
    markdownHeading3: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `三级标题`
      }
    },
    markdownBold: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `加粗`
      }
    },
    markdownItalic: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `斜体`
      }
    },
    markdownStrike: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `删除线`
      }
    },
    markdownUnorderedList: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `无序列表`
      }
    },
    markdownOrderedList: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `有序列表`
      }
    },
    markdownTaskList: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `任务清单`
      }
    },
    markdownQuote: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `引用`
      }
    },
    markdownCode: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `代码`
      }
    },
    markdownLink: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `链接`
      }
    },
    markdownLineCount: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 4,
          k: `count`
        }, {
          t: 3,
          v: ` 行`
        }]
      }
    },
    markdownCharacterCount: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 4,
          k: `count`
        }, {
          t: 3,
          v: ` 字`
        }]
      }
    },
    markdownFind: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `查找`
      }
    },
    markdownFindPlaceholder: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `在文档中查找`
      }
    },
    markdownFindPrevious: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `上一个`
      }
    },
    markdownFindNext: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `下一个`
      }
    },
    markdownFindClose: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `关闭查找`
      }
    },
    markdownCopyMarkdown: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `复制全文（Markdown）`
      }
    },
    markdownCopyRichText: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `复制为富文本`
      }
    },
    markdownCopiedMarkdown: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `已复制全文`
      }
    },
    markdownCopiedRichText: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `已复制，可以直接粘贴到飞书、微信等`
      }
    },
    markdownCopyFailed: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `复制失败，请重试`
      }
    },
    markdownExportPdf: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `导出为 PDF…`
      }
    },
    markdownExportHtml: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `导出为 HTML…`
      }
    },
    markdownExportPdfTitle: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `导出为 PDF`
      }
    },
    markdownExportHtmlTitle: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `导出为 HTML`
      }
    },
    markdownExporting: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `正在导出…`
      }
    },
    markdownExported: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3,
          v: `已导出「`
        }, {
          t: 4,
          k: `name`
        }, {
          t: 3,
          v: `」`
        }]
      }
    },
    markdownExportFailed: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `导出失败，请重试`
      }
    },
    markdownSavedAs: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3,
          v: `已保存为「`
        }, {
          t: 4,
          k: `name`
        }, {
          t: 3,
          v: `」`
        }]
      }
    },
    markdownCloseDocument: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `关闭文档`
      }
    },
    markdownBackToDocument: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3,
          v: `返回「`
        }, {
          t: 4,
          k: `name`
        }, {
          t: 3,
          v: `」`
        }]
      }
    },
    markdownDropToOpen: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `松开即可打开文档`
      }
    },
    markdownDropUnsupported: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `只能打开 Markdown 或纯文本文件`
      }
    },
    markdownExternalModified: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3,
          v: `「`
        }, {
          t: 4,
          k: `name`
        }, {
          t: 3,
          v: `」已被其他程序修改。`
        }]
      }
    },
    markdownExternalDeleted: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3,
          v: `「`
        }, {
          t: 4,
          k: `name`
        }, {
          t: 3,
          v: `」已被移动或删除，可以另存一份保留当前内容。`
        }]
      }
    },
    markdownExternalReloaded: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `文档已在外部更新，已自动刷新`
      }
    },
    markdownLoadExternalVersion: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `载入外部版本`
      }
    },
    markdownKeepMyChanges: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `保留我的修改`
      }
    },
    markdownDismiss: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `知道了`
      }
    },
    markdownSaveBeforeLink: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `先保存文档，才能打开文档里的本地链接`
      }
    },
    markdownLinkRevealed: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `已在文件夹中定位到这个文件`
      }
    },
    markdownImagePreview: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `图片预览`
      }
    },
    markdownCloseImagePreview: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `关闭图片预览`
      }
    },
    markdownUnsavedChangesConfirm: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `如果不保存，这次的修改会丢失。`
      }
    },
    markdownFileChangedConfirm: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `保存会用当前内容覆盖其他程序的修改；也可以放弃你的修改，载入外部版本。`
      }
    },
    markdownDiscardChangesTitle: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3,
          v: `要保存对「`
        }, {
          t: 4,
          k: `name`
        }, {
          t: 3,
          v: `」的修改吗？`
        }]
      }
    },
    markdownSaveChangesAction: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `保存`
      }
    },
    markdownDiscardChangesAction: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `不保存`
      }
    },
    markdownOverwriteChangesTitle: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `文件已被其他程序修改`
      }
    },
    markdownOverwriteChangesAction: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `覆盖保存`
      }
    },
    markdownConfirmCancel: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `取消`
      }
    },
    markdownOpenFailed: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `文档打开失败`
      }
    },
    markdownSaveFailed: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `文档保存失败`
      }
    },
    markdownReloadFailed: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `文档重新载入失败`
      }
    },
    markdownRecentRemoveFailed: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `从列表移除失败`
      }
    },
    markdownRevealFailed: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `无法显示文档所在位置`
      }
    },
    markdownLinkedOpenFailed: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `链接里的文件打开失败`
      }
    },
    markdownErrorAccessDenied: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `访问权限已失效，请重新打开文件`
      }
    },
    markdownErrorFileNotFound: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `文件不存在或已被移动`
      }
    },
    markdownErrorFileTooLarge: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `文件超过 10MB，暂不支持打开`
      }
    },
    markdownErrorUnsupportedFile: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `只支持 Markdown 和纯文本文件`
      }
    },
    markdownErrorInvalidLink: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `链接地址无效`
      }
    },
    markdownErrorLinkedFileMissing: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `链接指向的文件不存在`
      }
    },
    markdownErrorLinkedFileOpenFailed: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `系统无法打开链接指向的文件`
      }
    },
    markdownErrorExportTooLarge: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `文档内容过大，无法导出`
      }
    },
    copyCode: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `复制代码`
      }
    },
    copiedCode: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `已复制`
      }
    },
    markdownRenderFailed: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `文档渲染失败`
      }
    },
    markdownCodeCopyFailed: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `代码复制失败`
      }
    },
    markdownImageLoadFailed: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3,
          v: `图片无法加载：`
        }, {
          t: 4,
          k: `source`
        }]
      }
    },
    localUse: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `本地使用`
      }
    },
    pdfCompressToolName: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `PDF 压缩`
      }
    },
    pdfCompressToolDescription: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `支持无损、智能、极致和自定义方案，PDF 全程在本机处理。`
      }
    },
    imageCompressToolName: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `图片压缩`
      }
    },
    imageCompressToolDescription: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `批量压缩 JPG、PNG、WebP、BMP 与 AVIF，可灵活设置画质、尺寸和输出格式。`
      }
    },
    pdfCompressKicker: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `PDF 压缩工具`
      }
    },
    pdfCompressTitle: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `让你的 PDF 文件更轻巧`
      }
    },
    pdfCompressDescription: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `上传一个或多个 PDF，选择合适的压缩方式后即可开始处理。`
      }
    },
    pdfCompressLocalOnly: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `文件只在本机处理，不会上传`
      }
    },
    pdfCompressSelectTitle: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `上传 PDF 文件`
      }
    },
    pdfCompressSelectDescription: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `支持拖拽上传，最多 10 个文件，总计不超过 220 MB`
      }
    },
    pdfCompressClearAndReselect: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `清空并重选`
      }
    },
    pdfCompressSelecting: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `正在读取文件…`
      }
    },
    pdfCompressChooseFiles: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `点击选择或拖拽 PDF 文件`
      }
    },
    pdfCompressChooseFilesHint: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `选择或拖入 PDF 文件`
      }
    },
    pdfCompressPdfOnly: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `仅支持 PDF 格式`
      }
    },
    pdfCompressPageCount: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 4,
          k: `count`
        }, {
          t: 3,
          v: ` 页`
        }]
      }
    },
    pdfCompressSourceVector: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `矢量型`
      }
    },
    pdfCompressSourceImage: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `扫描型`
      }
    },
    pdfCompressSourceMixed: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `混合型`
      }
    },
    pdfCompressRemoveFile: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `移除文件`
      }
    },
    pdfCompressReselectFiles: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `重新选择文件`
      }
    },
    pdfCompressSettingsTitle: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `选择压缩方式`
      }
    },
    pdfCompressSettingsDescription: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `可先选择压缩方式，上传 PDF 后会自动分析预计效果`
      }
    },
    pdfCompressCompressionMode: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `压缩方式`
      }
    },
    pdfCompressModeLight: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `轻度压缩`
      }
    },
    pdfCompressModeLightDescription: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `无损整理，保留文字结构`
      }
    },
    pdfCompressModeRecommended: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `智能压缩（系统推荐）`
      }
    },
    pdfCompressModeRecommendedDescription: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `自动识别并匹配参数`
      }
    },
    pdfCompressModeExtreme: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `极致压缩`
      }
    },
    pdfCompressModeExtremeDescription: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `60 DPI · 灰度 · 最小体积`
      }
    },
    pdfCompressModeCustom: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `自定义压缩`
      }
    },
    pdfCompressModeCustomDescription: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `自行设置页面分辨率和图片质量`
      }
    },
    pdfCompressPageResolution: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `页面分辨率`
      }
    },
    pdfCompressResolutionPlaceholder: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `请选择页面分辨率`
      }
    },
    pdfCompressResolutionOriginal: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `保持原始分辨率`
      }
    },
    pdfCompressImageQuality: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `图片质量`
      }
    },
    pdfCompressQualityPlaceholder: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `请选择图片质量`
      }
    },
    pdfCompressQualityHighest: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `最高质量`
      }
    },
    pdfCompressPageRange: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `页面范围`
      }
    },
    pdfCompressOptional: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `（可选）`
      }
    },
    pdfCompressPageRangePlaceholder: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `例如 1-5, 8, 12-16；留空处理全部页面`
      }
    },
    pdfCompressPreserveMetadata: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `保留文档信息`
      }
    },
    pdfCompressPreserveMetadataDescription: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `保留标题、作者和主题等元数据`
      }
    },
    pdfCompressIncludeAnnotations: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `保留批注与表单`
      }
    },
    pdfCompressIncludeAnnotationsDescription: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `保留原文档中的注释和交互内容`
      }
    },
    pdfCompressStartTitle: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `开始处理`
      }
    },
    pdfCompressStartDescription: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `压缩完成后可逐个保存或批量保存。`
      }
    },
    pdfCompressProcessing: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `正在压缩 PDF`
      }
    },
    pdfCompressProcessingHint: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `处理大型或扫描型 PDF 可能需要一些时间，请保持应用开启。`
      }
    },
    pdfCompressAnalysisLoadingTitle: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `正在分析 PDF`
      }
    },
    pdfCompressAnalysisLoadingDescription: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `正在识别文件内容和页面结构…`
      }
    },
    pdfCompressAnalysisComplete: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `智能分析完成`
      }
    },
    pdfCompressRecommendedBadge: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `已推荐`
      }
    },
    pdfCompressEstimateSavingLabel: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `预计节省`
      }
    },
    pdfCompressEstimateDisclaimer: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `预计大小根据当前压缩方式、文件结构和页面内容计算，实际结果以压缩完成后为准。`
      }
    },
    pdfCompressAnalysisFailed: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `暂时无法完成智能分析`
      }
    },
    pdfCompressAnalysisRetryDescription: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `请重试或直接开始压缩`
      }
    },
    pdfCompressRetry: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `重新分析`
      }
    },
    pdfCompressCurrentTask: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `当前任务`
      }
    },
    pdfCompressPrechargePrice: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `预扣价格`
      }
    },
    pdfCompressPricingLoading: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `正在读取线上价格…`
      }
    },
    pdfCompressPricingUnavailable: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `暂时无法获取价格`
      }
    },
    pdfCompressUnitPrice: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3,
          v: `单价 `
        }, {
          t: 4,
          k: `credits`
        }, {
          t: 3,
          v: ` 积分 / 个 PDF`
        }]
      }
    },
    pdfCompressPrechargeSummary: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 4,
          k: `credits`
        }, {
          t: 3,
          v: ` 积分 · `
        }, {
          t: 4,
          k: `count`
        }, {
          t: 3,
          v: ` 个 PDF`
        }]
      }
    },
    pdfCompressSignInRequired: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `请先登录后再压缩 PDF。`
      }
    },
    pdfCompressInsufficientBalance: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `积分余额不足，请先充值。`
      }
    },
    pdfCompressPriceUnit: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `个 PDF`
      }
    },
    pdfCompressStartAction: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `开始压缩 PDF`
      }
    },
    pdfCompressCompressing: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `正在压缩…`
      }
    },
    pdfCompressResultsTitle: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `压缩结果`
      }
    },
    pdfCompressResultsDescription: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `完成压缩后，可在这里查看数据并选择文件保存位置`
      }
    },
    pdfCompressResultsPlaceholder: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `结果会显示在这里`
      }
    },
    pdfCompressResultsPlaceholderDescription: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `上传 PDF 并选择压缩方式，然后点击开始压缩。`
      }
    },
    pdfCompressProcessingReading: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `正在读取文件结构`
      }
    },
    pdfCompressResultComplete: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `PDF 文件已被压缩`
      }
    },
    pdfCompressSingleResultComplete: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `PDF 压缩完成`
      }
    },
    pdfCompressMultipleResultComplete: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 4,
          k: `count`
        }, {
          t: 3,
          v: ` 个 PDF 已压缩`
        }]
      }
    },
    pdfCompressResultReady: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `文件已准备好下载`
      }
    },
    pdfCompressRetentionDescription: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `压缩结果仅保留在当前页面，离开后不可恢复，请及时保存文件。`
      }
    },
    pdfCompressUnsavedResultsTitle: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `还有压缩结果未保存`
      }
    },
    pdfCompressUnsavedResultsDescription: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3,
          v: `仍有 `
        }, {
          t: 4,
          k: `count`
        }, {
          t: 3,
          v: ` 个压缩文件没有保存。离开后这些文件将被删除，且无法恢复。`
        }]
      }
    },
    pdfCompressDiscardAndLeave: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `放弃并离开`
      }
    },
    pdfCompressContinueSaving: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `继续保存`
      }
    },
    pdfCompressSavedLabel: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `已节省`
      }
    },
    pdfCompressOverallSaved: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `整体节省`
      }
    },
    pdfCompressReducedBy: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3,
          v: `减少 `
        }, {
          t: 4,
          k: `size`
        }]
      }
    },
    pdfCompressBatchResultSummary: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3,
          v: `共 `
        }, {
          t: 4,
          k: `count`
        }, {
          t: 3,
          v: ` 个压缩文件`
        }]
      }
    },
    pdfCompressSaveAllToFolder: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `统一目录保存`
      }
    },
    pdfCompressOptimized: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `PDF 已完成优化`
      }
    },
    pdfCompressSaveLocation: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `保存文件`
      }
    },
    pdfCompressOperationFailed: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `操作失败`
      }
    },
    pdfCompressNotice: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `提示`
      }
    },
    pdfCompressInvalidFile: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3,
          v: `“`
        }, {
          t: 4,
          k: `name`
        }, {
          t: 3,
          v: `”不是 PDF 文件`
        }]
      }
    },
    pdfCompressFileLimit: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3,
          v: `一次最多处理 `
        }, {
          t: 4,
          k: `count`
        }, {
          t: 3,
          v: ` 个 PDF`
        }]
      }
    },
    pdfCompressTotalSizeLimit: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `文件总大小不能超过 220 MB`
      }
    },
    pdfCompressDuplicateSingle: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3,
          v: `已忽略重复文件：`
        }, {
          t: 4,
          k: `name`
        }]
      }
    },
    pdfCompressDuplicateMultiple: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3,
          v: `已忽略 `
        }, {
          t: 4,
          k: `count`
        }, {
          t: 3,
          v: ` 个重复 PDF 文件`
        }]
      }
    },
    pdfCompressDuplicateTitle: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `发现重复 PDF`
      }
    },
    pdfCompressRecognizedFiles: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3,
          v: `已识别 `
        }, {
          t: 4,
          k: `count`
        }, {
          t: 3,
          v: ` 个 PDF，选择压缩方式后会自动分析预计效果`
        }]
      }
    },
    pdfCompressRemoveNamedFile: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3,
          v: `移除 `
        }, {
          t: 4,
          k: `name`
        }]
      }
    },
    pdfCompressRecommendedReached: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `已达系统推荐效果`
      }
    },
    pdfCompressAnalysisModeDescription: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3,
          v: `当前已选择`
        }, {
          t: 4,
          k: `mode`
        }, {
          t: 3,
          v: `，上传文件后将自动分析压缩效果`
        }]
      }
    },
    pdfCompressFileStrategyLabel: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `处理策略`
      }
    },
    pdfCompressFileStrategyVector: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `保留文字与矢量结构`
      }
    },
    pdfCompressFileStrategyImage: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `优化扫描图片资源`
      }
    },
    pdfCompressFileStrategyMixed: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `保留文字并优化图片`
      }
    },
    pdfCompressFileStrategyLight: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `无损整理文档对象`
      }
    },
    pdfCompressFileStrategyExtreme: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `灰度重建页面内容`
      }
    },
    pdfCompressFileStrategyCustom: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 4,
          k: `resolution`
        }, {
          t: 3,
          v: `% 分辨率 · `
        }, {
          t: 4,
          k: `quality`
        }, {
          t: 3,
          v: `% 画质`
        }]
      }
    },
    pdfCompressCustomParametersTitle: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `请选择自定义压缩参数`
      }
    },
    pdfCompressCustomParametersDescription: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `选择页面分辨率和图片质量后，将自动显示预估结果`
      }
    },
    pdfCompressCalculatingMode: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3,
          v: `正在计算`
        }, {
          t: 4,
          k: `mode`
        }, {
          t: 3,
          v: `预期`
        }]
      }
    },
    pdfCompressProcessingOptimizing: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `正在优化页面资源`
      }
    },
    pdfCompressProcessingRecompressing: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `正在重新压缩内容`
      }
    },
    pdfCompressProcessingGenerating: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `正在生成下载文件`
      }
    },
    pdfCompressSelectFirst: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `请先选择 PDF 文件`
      }
    },
    pdfCompressSaveFailedTitle: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `保存失败`
      }
    },
    pdfCompressOutputSuffix: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `_已压缩`
      }
    },
    pdfCompressOriginalSize: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `原始大小`
      }
    },
    pdfCompressCompressedSize: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `压缩后`
      }
    },
    pdfCompressSaved: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `节省`
      }
    },
    pdfCompressSavedPercent: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3,
          v: `节省 `
        }, {
          t: 4,
          k: `percent`
        }, {
          t: 3,
          v: `%`
        }]
      }
    },
    pdfCompressSaveFile: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `保存`
      }
    },
    pdfCompressSaveAll: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `全部保存`
      }
    },
    pdfCompressSaving: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `正在保存…`
      }
    },
    pdfCompressEstimate: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `预计`
      }
    },
    pdfCompressEstimateOriginal: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `原始文件合计`
      }
    },
    pdfCompressEstimateResult: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `预计压缩后`
      }
    },
    pdfCompressEstimateSaving: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3,
          v: `预计可节省约 `
        }, {
          t: 4,
          k: `percent`
        }, {
          t: 3,
          v: `%`
        }]
      }
    },
    pdfCompressSelectFailed: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `无法读取所选 PDF，请确认文件未损坏且没有超过大小限制。`
      }
    },
    pdfCompressCompressionFailed: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `PDF 压缩失败，请调整设置或重新选择文件后再试。`
      }
    },
    pdfCompressSaveFailed: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `保存失败，请重新选择保存位置。`
      }
    },
    pdfCompressSaveAllFailed: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `批量保存失败，请重新选择保存位置。`
      }
    },
    pdfCompressSaveSucceeded: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `压缩文件已保存。`
      }
    },
    pdfCompressSaveAllSucceeded: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3,
          v: `已保存 `
        }, {
          t: 4,
          k: `count`
        }, {
          t: 3,
          v: ` 个压缩文件。`
        }]
      }
    },
    operationFailed: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `操作失败`
      }
    },
    imageCompressRecommendedSuffix: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `（推荐）`
      }
    },
    imageCompressKeepOriginalSize: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `保持原始尺寸`
      }
    },
    imageCompressCustomResolution: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `自定义分辨率`
      }
    },
    imageCompressLightMode: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `轻度压缩`
      }
    },
    imageCompressBalancedMode: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `均衡压缩`
      }
    },
    imageCompressBalancedRecommended: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `均衡压缩（推荐）`
      }
    },
    imageCompressExtremeMode: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `极致压缩`
      }
    },
    imageCompressCustomMode: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `自定义压缩`
      }
    },
    imageCompressLightModeDescription: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `保留更多画质，适合日常查看`
      }
    },
    imageCompressBalancedModeDescription: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `兼顾图片画质和文件大小`
      }
    },
    imageCompressExtremeModeDescription: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `优先获得更小的文件`
      }
    },
    imageCompressCustomModeDescription: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `自行设置输出分辨率和图片质量`
      }
    },
    imageCompressStageReading: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `正在读取图片信息`
      }
    },
    imageCompressStageApplying: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `正在应用压缩参数`
      }
    },
    imageCompressStageGenerating: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `正在生成压缩图片`
      }
    },
    imageCompressStageFinishing: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `正在完成处理`
      }
    },
    imageCompressUnsupportedFormat: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 4,
          k: `name`
        }, {
          t: 3,
          v: `：格式不支持`
        }]
      }
    },
    imageCompressFileTooLarge: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 4,
          k: `name`
        }, {
          t: 3,
          v: `：超过 40 MB`
        }]
      }
    },
    imageCompressUnreadableFile: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 4,
          k: `name`
        }, {
          t: 3,
          v: `：图片无法读取或已损坏`
        }]
      }
    },
    imageCompressDuplicateSingle: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `该图片已在列表中，未重复添加`
      }
    },
    imageCompressDuplicateMultiple: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 4,
          k: `count`
        }, {
          t: 3,
          v: ` 张重复图片已忽略`
        }]
      }
    },
    imageCompressFileLimit: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3,
          v: `一次最多处理 `
        }, {
          t: 4,
          k: `count`
        }, {
          t: 3,
          v: ` 张图片`
        }]
      }
    },
    imageCompressNotice: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `提示`
      }
    },
    imageCompressExtremeModeLocked: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `图片已极致压缩，无法切换压缩方式。`
      }
    },
    imageCompressPngProcessingUnavailable: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `当前环境无法处理 PNG 图片`
      }
    },
    imageCompressPngResizeUnavailable: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `当前环境无法调整 PNG 尺寸`
      }
    },
    imageCompressFormatGenerationUnavailable: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `当前环境无法生成所选格式`
      }
    },
    imageCompressCompressionAnalysisUnavailable: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `当前环境无法分析图片压缩状态`
      }
    },
    imageCompressCanvasUnavailable: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `无法创建图片处理画布`
      }
    },
    imageCompressExtremeSingleNotice: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `图片已极致压缩，无需再次压缩。`
      }
    },
    imageCompressExtremeBatchNotice: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3,
          v: `其中 `
        }, {
          t: 4,
          k: `count`
        }, {
          t: 3,
          v: ` 张图片已经过极致压缩，批量结果将输出这些原文件。`
        }]
      }
    },
    imageCompressNoBenefitAllNotice: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `当前设置无法生成更小的图片，请调整格式、画质或分辨率。`
      }
    },
    imageCompressNoBenefitSomeNotice: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3,
          v: `其中 `
        }, {
          t: 4,
          k: `count`
        }, {
          t: 3,
          v: ` 张图片在当前设置下没有压缩收益，将跳过这些图片。`
        }]
      }
    },
    imageCompressCompressionFailed: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `压缩失败`
      }
    },
    imageCompressExtremeOriginalResults: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 4,
          k: `count`
        }, {
          t: 3,
          v: ` 张图片已是极致压缩状态，未再次压缩，结果中输出原文件。`
        }]
      }
    },
    imageCompressSaved: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `已保存`
      }
    },
    imageCompressSaveFailed: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `保存失败`
      }
    },
    imageCompressBatchSaveFailed: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `批量保存失败`
      }
    },
    imageCompressKicker: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `本地图片压缩`
      }
    },
    imageCompressTitle: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `让你的图片更轻`
      }
    },
    imageCompressDescription: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `支持 JPG、PNG、WebP、BMP 与 AVIF 批量处理，图片全程只在你的电脑中。`
      }
    },
    imageCompressUploadTitle: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `上传图片`
      }
    },
    imageCompressUploadDescription: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `支持拖拽上传，单张不超过 40 MB，一次最多 30 张`
      }
    },
    imageCompressClearAndReselect: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `清空并重选`
      }
    },
    imageCompressOriginalRetained: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `已极致压缩，输出原文件`
      }
    },
    imageCompressSavedLowercase: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `已节省`
      }
    },
    imageCompressNoSizeReduction: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `当前设置未减小体积`
      }
    },
    imageCompressCompressing: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `正在压缩…`
      }
    },
    imageCompressReady: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `等待压缩`
      }
    },
    imageCompressDone: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `已完成`
      }
    },
    imageCompressRetry: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `重试`
      }
    },
    imageCompressRemove: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `移除`
      }
    },
    imageCompressDropImages: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `点击选择或拖拽图片`
      }
    },
    imageCompressDropMoreImages: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `点击选择或拖拽更多图片`
      }
    },
    imageCompressSupportedFormats: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `支持 JPG、PNG、WebP、BMP 与 AVIF`
      }
    },
    imageCompressChooseMode: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `选择压缩方式`
      }
    },
    imageCompressChooseModeDescription: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `可先选择压缩方式，上传图片后会自动生成压缩预估`
      }
    },
    imageCompressImagesSelected: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3,
          v: `已识别 `
        }, {
          t: 4,
          k: `count`
        }, {
          t: 3,
          v: ` 张图片，请选择适合的压缩强度`
        }]
      }
    },
    imageCompressCompressionMode: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `压缩方式`
      }
    },
    imageCompressOutputResolution: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `输出分辨率`
      }
    },
    imageCompressImageQuality: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `图片质量`
      }
    },
    imageCompressOutputFormat: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `输出格式`
      }
    },
    imageCompressWidth: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `宽度`
      }
    },
    imageCompressHeight: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `高度`
      }
    },
    imageCompressEstimating: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `正在生成真实预估`
      }
    },
    imageCompressExtremeDetected: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `检测到已极致压缩图片`
      }
    },
    imageCompressNoBenefit: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `当前设置没有压缩收益`
      }
    },
    imageCompressEstimateReady: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `压缩预估完成`
      }
    },
    imageCompressEstimatePartialFailed: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `部分图片无法预估`
      }
    },
    imageCompressEstimateDescription: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `使用与最终压缩相同的编码参数生成预期结果`
      }
    },
    imageCompressAnalyzing: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `分析中`
      }
    },
    imageCompressNoBenefitShort: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `无收益`
      }
    },
    imageCompressRecommended: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `推荐`
      }
    },
    imageCompressCalculated: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `已计算`
      }
    },
    imageCompressOriginalSize: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `原始大小`
      }
    },
    imageCompressEstimatedSize: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `预计压缩后`
      }
    },
    imageCompressOriginalFiles: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `输出原文件`
      }
    },
    imageCompressNoCompressionNeeded: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `无需压缩`
      }
    },
    imageCompressEstimatedSaving: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `预计节省`
      }
    },
    imageCompressAlreadyExtreme: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `已极致压缩`
      }
    },
    imageCompressQuantizingColors: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `正在量化颜色`
      }
    },
    imageCompressColorQuality: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3,
          v: `颜色质量 `
        }, {
          t: 4,
          k: `value`
        }, {
          t: 3,
          v: `%`
        }]
      }
    },
    imageCompressLossyPngQuality: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3,
          v: `有损 PNG · `
        }, {
          t: 4,
          k: `value`
        }, {
          t: 3,
          v: `%`
        }]
      }
    },
    imageCompressMatchingQuality: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `正在匹配画质`
      }
    },
    imageCompressQualityValue: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3,
          v: `图片质量 `
        }, {
          t: 4,
          k: `value`
        }, {
          t: 3,
          v: `%`
        }]
      }
    },
    imageCompressEffectiveQuality: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3,
          v: `实际画质 `
        }, {
          t: 4,
          k: `value`
        }, {
          t: 3,
          v: `%`
        }]
      }
    },
    imageCompressAnalysisFailed: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `分析失败`
      }
    },
    imageCompressEstimate: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `预计`
      }
    },
    imageCompressNoFurtherCompression: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `无需继续压缩`
      }
    },
    imageCompressLargerOutputRejected: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `不会输出更大文件`
      }
    },
    imageCompressSavedPercent: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3,
          v: `节省 `
        }, {
          t: 4,
          k: `value`
        }, {
          t: 3,
          v: `%`
        }]
      }
    },
    imageCompressLargerPercent: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3,
          v: `增加 `
        }, {
          t: 4,
          k: `value`
        }, {
          t: 3,
          v: `%`
        }]
      }
    },
    imageCompressExtremeMixedNotice: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3,
          v: `检测到 `
        }, {
          t: 4,
          k: `count`
        }, {
          t: 3,
          v: ` 张已极致压缩图片，将在结果中输出原文件；其余图片正常压缩。`
        }]
      }
    },
    imageCompressNoBenefitSkipped: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `部分图片在当前设置下无法变得更小，将跳过且不会输出更大的文件。`
      }
    },
    imageCompressCurrentTask: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `当前任务`
      }
    },
    imageCompressPrechargePrice: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `预扣价格`
      }
    },
    imageCompressPricingLoading: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `正在读取线上价格…`
      }
    },
    imageCompressPricingUnavailable: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `暂时无法获取价格`
      }
    },
    imageCompressUnitPrice: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3,
          v: `单价 `
        }, {
          t: 4,
          k: `credits`
        }, {
          t: 3,
          v: ` 积分 / 张图片`
        }]
      }
    },
    imageCompressPrechargeSummary: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 4,
          k: `credits`
        }, {
          t: 3,
          v: ` 积分 · `
        }, {
          t: 4,
          k: `count`
        }, {
          t: 3,
          v: ` 张有效图片`
        }]
      }
    },
    imageCompressSignInRequired: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `请先登录后再压缩图片。`
      }
    },
    imageCompressInsufficientBalance: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `积分余额不足，请先充值。`
      }
    },
    imageCompressPriceUnit: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `张图片`
      }
    },
    imageCompressProcessing: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `正在处理…`
      }
    },
    imageCompressAnalyzingImages: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `正在分析图片…`
      }
    },
    imageCompressCurrentImageNoCompression: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `当前图片无需压缩`
      }
    },
    imageCompressPrepareOriginalFiles: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3,
          v: `生成 `
        }, {
          t: 4,
          k: `count`
        }, {
          t: 3,
          v: ` 张原图结果`
        }]
      }
    },
    imageCompressCompressAgain: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `重新压缩`
      }
    },
    imageCompressProcessUnfinished: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `继续处理未完成图片`
      }
    },
    imageCompressProcessImages: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3,
          v: `开始处理 `
        }, {
          t: 4,
          k: `count`
        }, {
          t: 3,
          v: ` 张图片`
        }]
      }
    },
    imageCompressResultsTitle: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `压缩结果`
      }
    },
    imageCompressResultsDescription: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `完成压缩后，可在这里查看数据并选择图片保存位置`
      }
    },
    imageCompressCompressingImages: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `正在压缩图片`
      }
    },
    imageCompressKeepPageOpen: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `请保持此页面打开，处理完成后会自动显示结果`
      }
    },
    imageCompressResultsPlaceholder: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `压缩结果会显示在这里`
      }
    },
    imageCompressSelectSettingsToStart: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `选择压缩方式和输出格式，然后点击开始压缩。`
      }
    },
    imageCompressUploadToStart: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `上传图片并选择压缩方式，然后点击开始压缩。`
      }
    },
    imageCompressImagesProcessed: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `图片处理完成`
      }
    },
    imageCompressImagesCompressed: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `图片已被压缩`
      }
    },
    imageCompressSomeImagesCompleted: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `部分图片已完成`
      }
    },
    imageCompressImagesReadyToSave: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 4,
          k: `count`
        }, {
          t: 3,
          v: ` 张图片已准备好保存`
        }]
      }
    },
    imageCompressProcessedCount: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3,
          v: `共处理 `
        }, {
          t: 4,
          k: `count`
        }, {
          t: 3,
          v: ` 张图片`
        }]
      }
    },
    imageCompressOverallSaved: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `整体节省`
      }
    },
    imageCompressReducedBy: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3,
          v: `减少 `
        }, {
          t: 4,
          k: `size`
        }]
      }
    },
    imageCompressBatchResultSummary: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3,
          v: `共 `
        }, {
          t: 4,
          k: `count`
        }, {
          t: 3,
          v: ` 个压缩文件`
        }]
      }
    },
    imageCompressOpenPreview: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `打开图片预览`
      }
    },
    imageCompressOriginalKeptFormat: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 4,
          k: `format`
        }, {
          t: 3,
          v: ` · 保留原图`
        }]
      }
    },
    imageCompressSaveFile: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `保存文件`
      }
    },
    imageCompressSave: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `保存`
      }
    },
    imageCompressSaving: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `正在保存…`
      }
    },
    imageCompressSaveAllFiles: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `保存全部文件`
      }
    },
    imageCompressSaveAllToFolder: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `统一目录保存`
      }
    },
    imageCompressUnsavedResultsTitle: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `还有图片压缩结果未保存`
      }
    },
    imageCompressUnsavedResultsDescription: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3,
          v: `仍有 `
        }, {
          t: 4,
          k: `count`
        }, {
          t: 3,
          v: ` 个压缩图片没有保存。离开后这些图片将被删除，且无法恢复。`
        }]
      }
    },
    imageCompressDiscardAndLeave: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `放弃并离开`
      }
    },
    imageCompressContinueSaving: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `继续保存`
      }
    },
    imageCompressDeleteResults: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `删除结果`
      }
    },
    whiteboardToolName: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `白板工具`
      }
    },
    whiteboardToolDescription: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `自由绘制、标注与多页整理，可打开现有 PNG 并将画板导出为 PNG。`
      }
    },
    whiteboardOpen: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `打开白板`
      }
    },
    whiteboardOpenShort: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `打开`
      }
    },
    whiteboardSave: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `保存白板`
      }
    },
    whiteboardSaveShort: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `保存`
      }
    },
    whiteboardSaveAs: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `白板另存为`
      }
    },
    whiteboardSaveAsShort: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `另存为`
      }
    },
    whiteboardUntitledBoard: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `未命名白板`
      }
    },
    whiteboardBoardNumber: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3,
          v: `画板 `
        }, {
          t: 4,
          k: `number`
        }]
      }
    },
    whiteboardShapeLine: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `直线`
      }
    },
    whiteboardShapeCurve: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `曲线`
      }
    },
    whiteboardShapeEllipse: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `圆形`
      }
    },
    whiteboardShapeRectangle: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `矩形`
      }
    },
    whiteboardShapeTriangle: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `三角形`
      }
    },
    whiteboardShapeDiamond: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `菱形`
      }
    },
    whiteboardShapePentagon: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `五边形`
      }
    },
    whiteboardShapeStar: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `星形`
      }
    },
    whiteboardShapeSpeech: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `对话框`
      }
    },
    whiteboardShapeCloud: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `云形`
      }
    },
    whiteboardSizeThin: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `细`
      }
    },
    whiteboardSizeMedium: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `中`
      }
    },
    whiteboardSizeThick: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `粗`
      }
    },
    whiteboardSizeSmall: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `小`
      }
    },
    whiteboardSizeLarge: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `大`
      }
    },
    whiteboardClearedUndoAvailable: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `已清空当前白板，可撤销恢复`
      }
    },
    whiteboardSelectionEmpty: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `圈选范围内没有内容`
      }
    },
    whiteboardDesktopOpenRequired: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `请在 Electron 桌面端中使用打开功能`
      }
    },
    whiteboardDesktopSaveRequired: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `请在 Electron 桌面端中使用保存功能`
      }
    },
    whiteboardPngOpened: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `PNG 图片已打开`
      }
    },
    whiteboardImageSaved: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `图片已保存`
      }
    },
    whiteboardProjectSaved: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `可编辑白板已保存`
      }
    },
    whiteboardSaveFailed: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `白板保存失败，请检查文件是否可写或使用另存为`
      }
    },
    whiteboardAlreadySaved: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `当前文件已是最新版本`
      }
    },
    whiteboardUnsavedTitle: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `白板还有未保存的修改`
      }
    },
    whiteboardUnsavedDescription: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `离开后当前画板内容将被清空。你可以先保存为 PNG，或放弃修改后离开。`
      }
    },
    whiteboardCancel: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `取消`
      }
    },
    whiteboardDiscardAndLeave: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `放弃并离开`
      }
    },
    whiteboardSaveAndLeave: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `保存并离开`
      }
    },
    whiteboardSaveAsImage: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `另存为图片`
      }
    },
    whiteboardSaveAsDescription: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `选择背景样式后设置新的保存路径`
      }
    },
    whiteboardCloseSaveDialog: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `关闭保存窗口`
      }
    },
    whiteboardExportBoardBackground: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `导出白板背景图片`
      }
    },
    whiteboardExportBoardBackgroundDescription: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `保留浅色点阵网格 · PNG`
      }
    },
    whiteboardExportWhiteBackground: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `导出白色背景图片`
      }
    },
    whiteboardExportWhiteBackgroundDescription: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `纯白底，适合打印 · PNG`
      }
    },
    whiteboardCanvasAriaLabel: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `白板绘图区域`
      }
    },
    whiteboardTextInputAriaLabel: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `输入文字`
      }
    },
    whiteboardEditingTextAriaLabel: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `正在输入文字`
      }
    },
    whiteboardResizeTextAriaLabel: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `拖动调整文字大小`
      }
    },
    whiteboardStartDrawing: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `从一笔开始`
      }
    },
    whiteboardStartDrawingDescription: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `选择下方工具，在画布上自由记录想法`
      }
    },
    whiteboardZoomOut: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `缩小`
      }
    },
    whiteboardZoomIn: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `放大`
      }
    },
    whiteboardPenSize: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `画笔粗细`
      }
    },
    whiteboardEraserSize: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `橡皮大小`
      }
    },
    whiteboardClose: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `关闭`
      }
    },
    whiteboardChooseShape: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `选择图形`
      }
    },
    whiteboardToolbar: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `白板工具栏`
      }
    },
    whiteboardPreviousPage: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `上一页`
      }
    },
    whiteboardNextPage: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `下一页`
      }
    },
    whiteboardAddBoard: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `新增画板`
      }
    },
    whiteboardPenColor: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `画笔颜色`
      }
    },
    whiteboardChooseColor: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3,
          v: `选择颜色 `
        }, {
          t: 4,
          k: `color`
        }]
      }
    },
    whiteboardPen: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `画笔`
      }
    },
    whiteboardEraser: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `橡皮`
      }
    },
    whiteboardShape: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `图形`
      }
    },
    whiteboardText: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `文字`
      }
    },
    whiteboardSelect: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `圈选`
      }
    },
    whiteboardUndo: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `撤销`
      }
    },
    whiteboardClearBoard: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `清空当前白板`
      }
    },
    whiteboardDeleteSelected: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `删除所选内容`
      }
    },
    whiteboardHelp: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `帮助`
      }
    },
    whiteboardCollapseToolbar: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `收起工具栏`
      }
    },
    whiteboardExpandToolbar: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `展开工具栏`
      }
    },
    whiteboardQuickStart: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `快速上手`
      }
    },
    whiteboardDesktopShortcuts: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `桌面端快捷操作`
      }
    },
    whiteboardCloseHelp: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `关闭帮助`
      }
    },
    whiteboardDraw: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `绘画`
      }
    },
    whiteboardEraseElements: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `擦除元素`
      }
    },
    whiteboardDrawShapes: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `绘制图形`
      }
    },
    whiteboardAddText: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `添加文字`
      }
    },
    whiteboardSelectContent: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `圈选内容`
      }
    },
    whiteboardMoveCanvas: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `移动画布`
      }
    },
    whiteboardLeftMouseButton: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `鼠标左键`
      }
    },
    whiteboardZoomCanvas: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `缩放画布`
      }
    },
    whiteboardHorizontalScroll: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `横向移动画布`
      }
    },
    whiteboardMouseWheel: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `鼠标滚轮`
      }
    },
    multiPlatformPublisherToolName: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `多平台视频发布`
      }
    },
    multiPlatformPublisherToolDescription: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `一次准备视频、文案和封面，并为多个平台账号打开独立发布窗口。`
      }
    },
    publisherPriceUnit: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `次`
      }
    },
    publisherEstimatedCost: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `预计消耗`
      }
    },
    publisherCreditsUnit: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `积分`
      }
    },
    publisherFixedTaskPrice: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `每次任务固定计费，全部失败自动退回`
      }
    },
    publisherLoginRequiredTitle: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `请先登录`
      }
    },
    publisherLoginRequiredDescription: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `多平台发布需要登录后使用积分结算。`
      }
    },
    publisherInsufficientCreditsTitle: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `积分不足`
      }
    },
    publisherInsufficientCreditsDescription: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3,
          v: `本次需要 `
        }, {
          t: 4,
          k: `cost`
        }, {
          t: 3,
          v: ` 积分，当前余额 `
        }, {
          t: 4,
          k: `balance`
        }, {
          t: 3,
          v: ` 积分，请先充值。`
        }]
      }
    },
    publisherHistory: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `发布历史`
      }
    },
    publisherKicker: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `多平台发布`
      }
    },
    publisherTitle: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `一次准备，多平台同步发布`
      }
    },
    publisherDescription: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `统一填写视频资料，小白为每个账号打开独立平台窗口；最后一步由你检查并确认发布。`
      }
    },
    publisherContentCleared: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `内容已清空`
      }
    },
    publisherUploadAndContent: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `上传视频与填写内容`
      }
    },
    publisherPrepareContent: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `先准备本次发布内容`
      }
    },
    publisherRecords: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `发布记录`
      }
    },
    publisherClearContent: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `清空内容`
      }
    },
    publisherVideoFile: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `视频文件`
      }
    },
    publisherChooseVideo: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `点击选择视频文件`
      }
    },
    publisherVideoFormats: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `支持 MP4、MOV、WebM、AVI、MKV`
      }
    },
    publisherBrowseFiles: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `浏览文件`
      }
    },
    publisherPreviewFailed: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `视频预览加载失败，请重新选择文件。`
      }
    },
    publisherComponentUnavailable: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `视频组件尚未完成加载，请重启小白后再试。`
      }
    },
    publisherLocalPreview: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `本地预览`
      }
    },
    publisherHorizontal: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `横屏`
      }
    },
    publisherVertical: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `竖屏`
      }
    },
    publisherReadingVideo: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `正在读取视频信息…`
      }
    },
    publisherReplaceVideo: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `更换视频`
      }
    },
    publisherCommonTitle: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `通用标题`
      }
    },
    publisherCustomPlatformTitles: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `自定义平台标题`
      }
    },
    publisherCommonTitlePlaceholder: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `默认用于所有平台，也可以单独自定义`
      }
    },
    publisherCustomTitlesSummary: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3,
          v: `已自定义 `
        }, {
          t: 4,
          k: `count`
        }, {
          t: 3,
          v: ` 项，其余使用通用标题`
        }]
      }
    },
    publisherCommonTitleDefault: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `默认使用通用标题`
      }
    },
    publisherFixedTopic: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `固定标签`
      }
    },
    publisherFixedTopicPlaceholder: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `例如：小白日报`
      }
    },
    publisherTopics: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `话题 / 标签`
      }
    },
    publisherTopicsPlaceholder: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `多个话题用空格、逗号或 # 分隔`
      }
    },
    publisherTopicsExample: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `例如：#美食 #探店 #旅行`
      }
    },
    publisherTopicInputPlaceholder: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `输入标签，按回车添加`
      }
    },
    publisherTopicAdd: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `添加标签`
      }
    },
    publisherTopicCount: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 4,
          k: `count`
        }, {
          t: 3,
          v: ` / `
        }, {
          t: 4,
          k: `max`
        }]
      }
    },
    publisherTopicHint: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `拖动标签调整顺序，点击图钉可固定到下次继续使用`
      }
    },
    publisherTopicPin: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `设为固定标签`
      }
    },
    publisherTopicUnpin: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `取消固定标签`
      }
    },
    publisherTopicRemove: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `移除标签`
      }
    },
    publisherDescriptionField: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `作品简介`
      }
    },
    publisherDescriptionPlaceholder: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `输入作品简介；视频号不会使用此简介`
      }
    },
    publisherChooseAccounts: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `选择本次发布账号`
      }
    },
    publisherChooseAccountsHint: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `在这里绑定、选择和管理所有发布账号`
      }
    },
    publisherChooseAccountPlatform: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `选择需要绑定的平台`
      }
    },
    publisherAllPlatforms: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `全部平台`
      }
    },
    publisherFilterPlatform: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `筛选账号平台`
      }
    },
    publisherSearchAccounts: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `搜索账号昵称或备注`
      }
    },
    publisherClearAccountSearch: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `清空账号搜索`
      }
    },
    publisherAccountRemark: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3,
          v: `备注：`
        }, {
          t: 4,
          k: `remark`
        }]
      }
    },
    publisherNoAccountRemark: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `暂无备注`
      }
    },
    publisherSelectAccount: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `选择这个账号`
      }
    },
    publisherDeselectAccount: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `取消选择这个账号`
      }
    },
    publisherNoAccounts: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `暂无已绑定账号`
      }
    },
    publisherNoAccountsHint: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `点击右上角“绑定新账号”添加第一个账号`
      }
    },
    publisherNoMatchingAccounts: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `没有匹配的账号`
      }
    },
    publisherNoMatchingAccountsHint: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `尝试其他关键词或平台筛选`
      }
    },
    publisherLoadingAccounts: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `正在加载账号`
      }
    },
    publisherAccountCount: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 4,
          k: `count`
        }, {
          t: 3,
          v: ` 个账号`
        }]
      }
    },
    publisherCoverAndDeclarations: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `封面与声明`
      }
    },
    publisherCoverHint: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `封面可留空，届时使用平台默认封面`
      }
    },
    publisherCoverLabel: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 4,
          k: `ratio`
        }, {
          t: 3,
          v: ` 封面`
        }]
      }
    },
    publisherChooseImage: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `点击选择图片`
      }
    },
    publisherRemove: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `移除`
      }
    },
    publisherContentDeclaration: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 4,
          k: `platform`
        }, {
          t: 3,
          v: `内容声明`
        }]
      }
    },
    publisherChooseDeclaration: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `选择内容声明`
      }
    },
    publisherXhsOriginal: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `小红书声明原创`
      }
    },
    publisherXhsOriginalHint: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `勾选后，仅同步至小红书的原创声明`
      }
    },
    publisherChannelsHideLocation: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `视频号不显示位置`
      }
    },
    publisherChannelsHideLocationHint: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `开启后，发布视频号时将定位设为“不显示位置”`
      }
    },
    publisherChannelsOriginal: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `视频号声明原创`
      }
    },
    publisherChannelsOriginalHint: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `开启后，仅同步至视频号的原创声明`
      }
    },
    publisherScheduledTime: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `定时发布时间`
      }
    },
    publisherScheduledTimeHint: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `可选，每个平台可以设置不同时间`
      }
    },
    publisherEnabled: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `已开启`
      }
    },
    publisherDisabled: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `未开启`
      }
    },
    publisherCommonSchedule: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `通用发布时间`
      }
    },
    publisherCommonScheduleHint: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `平台未单独设置时使用`
      }
    },
    publisherChooseDate: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `选择日期`
      }
    },
    publisherHour: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `时`
      }
    },
    publisherMinute: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `分`
      }
    },
    publisherCommonDateLabel: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `通用发布日期`
      }
    },
    publisherCommonHourLabel: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `通用发布小时`
      }
    },
    publisherCommonMinuteLabel: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `通用发布分钟`
      }
    },
    publisherPlatformSchedule: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 4,
          k: `platform`
        }, {
          t: 3,
          v: `发布时间`
        }]
      }
    },
    publisherPlatformDateLabel: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 4,
          k: `platform`
        }, {
          t: 3,
          v: `发布日期`
        }]
      }
    },
    publisherPlatformHourLabel: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 4,
          k: `platform`
        }, {
          t: 3,
          v: `发布小时`
        }]
      }
    },
    publisherPlatformMinuteLabel: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 4,
          k: `platform`
        }, {
          t: 3,
          v: `发布分钟`
        }]
      }
    },
    publisherUseCommonSchedule: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `留空使用通用时间`
      }
    },
    publisherScheduleEmpty: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `选择发布账号后，可为对应平台设置独立发布时间`
      }
    },
    publisherScheduleNote: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `抖音需至少提前 2 小时，小红书至少提前 1 小时；工具只会选好定时时间并保留页面，不会点击最终发布。`
      }
    },
    publisherImmediateDefault: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `默认立即准备发布`
      }
    },
    publisherImmediateHint: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `开启后，小白会在每个平台发布页选择计划时间。`
      }
    },
    publisherCheckAndStart: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `检查并启动`
      }
    },
    publisherLaunchEntryHint: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `确认本次内容后打开各平台发布窗口`
      }
    },
    publisherVideo: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `视频`
      }
    },
    publisherNotSelected: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `未选择`
      }
    },
    publisherTargets: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `发布目标`
      }
    },
    publisherCustomCovers: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `自定义封面`
      }
    },
    publisherCoverRatioCount: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 4,
          k: `count`
        }, {
          t: 3,
          v: ` 种比例`
        }]
      }
    },
    publisherUsePlatformDefault: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `使用平台默认`
      }
    },
    publisherMethod: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `发布方式`
      }
    },
    publisherScheduledPublish: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `定时发布`
      }
    },
    publisherPrepareNow: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `立即准备`
      }
    },
    publisherSafetyTip: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `小白会完成上传、标题、简介、话题、封面和声明；请在打开的平台窗口中检查无误后手动发布。`
      }
    },
    publisherCreatingTask: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `正在创建任务`
      }
    },
    publisherOpenWindows: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3,
          v: `打开 `
        }, {
          t: 4,
          k: `count`
        }, {
          t: 3,
          v: ` 个发布窗口`
        }]
      }
    },
    publisherStart: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `检查并启动发布`
      }
    },
    publisherCancelTask: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `取消任务`
      }
    },
    publisherPlanned: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `计划`
      }
    },
    publisherBindNewAccount: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `绑定新账号`
      }
    },
    publisherBindAccountHint: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `选择平台并填写可选备注，登录成功后会自动加入账号列表`
      }
    },
    publisherAccountPlatformLabel: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `账号平台`
      }
    },
    publisherAccountRemarkLabel: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `账号备注`
      }
    },
    publisherAccountRemarkOptional: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `选填，用于区分同平台的不同账号`
      }
    },
    publisherReady: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `可发布`
      }
    },
    publisherNeedsLogin: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `需登录`
      }
    },
    publisherRelogin: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `重新登录`
      }
    },
    publisherDelete: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `删除`
      }
    },
    publisherDeleteAccountTitle: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `删除这个账号？`
      }
    },
    publisherDeleteAccountDescription: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3,
          v: `确定删除“`
        }, {
          t: 4,
          k: `account`
        }, {
          t: 3,
          v: `”吗？本机保存的登录状态也会一并删除。`
        }]
      }
    },
    publisherDeleting: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `正在删除`
      }
    },
    publisherConfirmDelete: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `确认删除`
      }
    },
    publisherXhsRiskTitle: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `小红书账号风控风险提示`
      }
    },
    publisherXhsRiskDescription: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `小红书平台存在账号风控风险，不建议使用本工具进行登录或自动发布。如果仍要继续，请自行承担可能发生的账号限制、验证或封禁等风险。`
      }
    },
    publisherContinueRisk: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `了解风险，继续`
      }
    },
    publisherPlatformTitleHint: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `未填写的平台自动使用通用标题`
      }
    },
    publisherClose: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `关闭`
      }
    },
    publisherShortTitlePlaceholder: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `选填，最多16字，逗号自动转为空格`
      }
    },
    publisherTitlePlaceholder: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3,
          v: `留空则使用通用标题，最多`
        }, {
          t: 4,
          k: `limit`
        }, {
          t: 3,
          v: `字`
        }]
      }
    },
    publisherUseCommonTitle: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `未填写时默认使用通用标题`
      }
    },
    publisherSave: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `保存`
      }
    },
    publisherBackToRecords: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `返回记录列表`
      }
    },
    publisherDetails: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `发布详情`
      }
    },
    publisherDetailsHint: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `查看各平台账号的处理结果与状态`
      }
    },
    publisherHistoryTotal: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3,
          v: `本地共保存 `
        }, {
          t: 4,
          k: `count`
        }, {
          t: 3,
          v: ` 条发布记录`
        }]
      }
    },
    publisherLoadingHistory: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `正在读取发布记录`
      }
    },
    publisherNoHistory: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `还没有发布记录`
      }
    },
    publisherNoHistoryHint: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `启动第一个发布任务后会自动保存在这里。`
      }
    },
    publisherUntitledTask: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `未命名发布任务`
      }
    },
    publisherProcessed: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `已处理`
      }
    },
    publisherRefreshingDetails: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `正在刷新详情`
      }
    },
    publisherTaskProgress: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `任务进度`
      }
    },
    publisherVideoFileLabel: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `视频文件`
      }
    },
    publisherCreatedAt: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `创建时间`
      }
    },
    publisherCompletedAt: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `完成时间`
      }
    },
    publisherResult: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `处理结果`
      }
    },
    publisherNeedsCheckCount: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 4,
          k: `count`
        }, {
          t: 3,
          v: ` 个需检查`
        }]
      }
    },
    publisherNoFailedAccounts: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `无失败账号`
      }
    },
    publisherPlatformDetails: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `平台处理明细`
      }
    },
    publisherTargetCount: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 4,
          k: `count`
        }, {
          t: 3,
          v: ` 个发布目标`
        }]
      }
    },
    publisherNoDetails: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `暂无处理信息`
      }
    },
    publisherPlannedAt: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `计划发布：`
      }
    },
    publisherGotIt: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `我知道了`
      }
    },
    publisherStatusRunning: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `处理中`
      }
    },
    publisherStatusReady: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `待人工发布`
      }
    },
    publisherStatusPartial: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `部分需检查`
      }
    },
    publisherStatusFailed: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `处理失败`
      }
    },
    publisherStatusCancelled: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `已取消`
      }
    },
    publisherStatusInterrupted: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `已中断`
      }
    },
    publisherItemQueued: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `等待启动`
      }
    },
    publisherItemLaunching: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `启动浏览器`
      }
    },
    publisherItemBrowserOpened: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `浏览器已打开`
      }
    },
    publisherItemNavigating: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `进入上传页`
      }
    },
    publisherItemUploading: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `上传视频`
      }
    },
    publisherItemFilling: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `填写资料`
      }
    },
    publisherItemCover: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `设置封面`
      }
    },
    publisherItemOriginal: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `设置原创`
      }
    },
    publisherItemLocation: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `设置位置`
      }
    },
    publisherItemScheduling: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `设置定时发布`
      }
    },
    publisherItemReady: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `等待发布`
      }
    },
    publisherItemFailed: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `需要检查`
      }
    },
    publisherItemCancelled: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `已取消`
      }
    },
    publisherErrorLoginExpired: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `账号登录已失效`
      }
    },
    publisherErrorWindowClosed: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `发布窗口已关闭`
      }
    },
    publisherErrorPageTimeout: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `平台响应超时`
      }
    },
    publisherErrorNetwork: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `网络连接异常`
      }
    },
    publisherErrorChrome: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `浏览器不可用`
      }
    },
    publisherErrorFile: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `本地文件不可用`
      }
    },
    publisherErrorPageChanged: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `平台页面已变化`
      }
    },
    publisherErrorAutomation: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `自动填写未完成`
      }
    },
    publisherDouyin: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `抖音`
      }
    },
    publisherXiaohongshu: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `小红书`
      }
    },
    publisherChannels: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `视频号`
      }
    },
    publisherBilibili: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `哔哩哔哩`
      }
    },
    publisherDouyinTitle: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `抖音标题`
      }
    },
    publisherXiaohongshuTitle: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `小红书标题`
      }
    },
    publisherChannelsTitle: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `视频号标题`
      }
    },
    publisherChannelsShortTitle: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `视频号短标题`
      }
    },
    publisherBilibiliTitle: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `B站标题`
      }
    },
    publisherDouyinRemark: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `可选备注，例如：品牌主账号`
      }
    },
    publisherXhsRemark: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `可选备注，例如：生活分享号`
      }
    },
    publisherChannelsRemark: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `可选备注，例如：企业视频号`
      }
    },
    publisherBilibiliRemark: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `可选备注，例如：知识分享号`
      }
    },
    publisherCancel: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `取消`
      }
    },
    publisherCommon: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `通用`
      }
    },
    publisherScheduleCompleteError: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3,
          v: `请选择完整的`
        }, {
          t: 4,
          k: `platform`
        }, {
          t: 3,
          v: `定时发布日期和时间`
        }]
      }
    },
    publisherScheduleInvalid: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 4,
          k: `platform`
        }, {
          t: 3,
          v: `定时发布时间无效，请重新选择`
        }]
      }
    },
    publisherScheduleLeadHours: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 4,
          k: `platform`
        }, {
          t: 3,
          v: `定时发布时间至少需要晚于当前时间 `
        }, {
          t: 4,
          k: `count`
        }, {
          t: 3,
          v: ` 小时`
        }]
      }
    },
    publisherScheduleLeadMinutes: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 4,
          k: `platform`
        }, {
          t: 3,
          v: `定时发布时间至少需要晚于当前时间 `
        }, {
          t: 4,
          k: `count`
        }, {
          t: 3,
          v: ` 分钟`
        }]
      }
    },
    publisherScheduleMaxDays: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 4,
          k: `platform`
        }, {
          t: 3,
          v: `定时发布时间不能超过当前时间 `
        }, {
          t: 4,
          k: `count`
        }, {
          t: 3,
          v: ` 天`
        }]
      }
    },
    publisherScheduleMinuteStep: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 4,
          k: `platform`
        }, {
          t: 3,
          v: `发布时间的分钟只能选择 00、05、10…55`
        }]
      }
    },
    publisherAccountDisabledTitle: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 4,
          k: `platform`
        }, {
          t: 3,
          v: `账号未启用`
        }]
      }
    },
    publisherAccountDisabled: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3,
          v: `你填写了`
        }, {
          t: 4,
          k: `platform`
        }, {
          t: 3,
          v: `独立内容，但尚未勾选该平台账号。请选择一个可发布账号，或清空该平台的独立内容。`
        }]
      }
    },
    publisherAccountUnavailable: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 4,
          k: `platform`
        }, {
          t: 3,
          v: `没有已启用或已登录的账号。请先到账号管理完成登录，或清空该平台的独立内容。`
        }]
      }
    },
    publisherNoVideoTitle: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `还没有选择视频`
      }
    },
    publisherNoVideoDescription: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `请先选择一个需要发布的视频文件。`
      }
    },
    publisherNoTargetTitle: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `还没有选择发布账号`
      }
    },
    publisherNoTargetDescription: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `请至少勾选一个已登录并可发布的平台账号。`
      }
    },
    publisherMissingTitle: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 4,
          k: `platform`
        }, {
          t: 3,
          v: `缺少标题`
        }]
      }
    },
    publisherMissingTitleDescription: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3,
          v: `请填写通用标题，或填写`
        }, {
          t: 4,
          k: `platform`
        }, {
          t: 3,
          v: `独立标题。`
        }]
      }
    },
    publisherShortTitleInvalid: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `视频号短标题不符合要求`
      }
    },
    publisherShortTitleInvalidDescription: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `短标题最多16个字，仅支持文字、数字、空格以及书名号、引号、冒号、加号、问号、百分号和摄氏度。`
      }
    },
    publisherScheduleErrorTitle: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `定时发布时间有误`
      }
    },
    publisherScheduleIncompleteTitle: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `定时发布时间未设置完整`
      }
    },
    publisherScheduleIncompleteDescription: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3,
          v: `请设置通用发布时间，或单独设置`
        }, {
          t: 4,
          k: `platform`
        }, {
          t: 3,
          v: `发布时间。`
        }]
      }
    },
    publisherBindingIncomplete: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `账号绑定未完成`
      }
    },
    publisherBindingRetry: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `请重新点击登录并完成平台验证。`
      }
    },
    publisherBindingStatusFailed: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `登录状态读取失败`
      }
    },
    publisherOpenLoginFailed: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `无法打开登录窗口，请稍后重试。`
      }
    },
    publisherStartLoginFailed: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `无法开始账号登录`
      }
    },
    publisherRemoveAccountFailed: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `账号移除失败`
      }
    },
    publisherStartTaskFailed: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `发布任务未能启动`
      }
    },
    publisherCheckContent: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `请检查填写内容后重试。`
      }
    },
    publisherCancelTaskFailed: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `任务取消失败`
      }
    },
    publisherLoadHistoryFailed: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `发布记录读取失败`
      }
    },
    publisherLoadDetailsFailed: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `记录详情读取失败`
      }
    },
    publisherLoadDetailsRetry: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `请稍后重新打开发布记录。`
      }
    },
    publisherDeclarationDouyinNone: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `无需添加自主声明`
      }
    },
    publisherDeclarationAi: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `内容由AI生成`
      }
    },
    publisherDeclarationOpinion: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `内容为个人观点或见解`
      }
    },
    publisherDeclarationRepost: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `内容为转载信息`
      }
    },
    publisherDeclarationMarketing: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `内容含营销推广信息`
      }
    },
    publisherDeclarationFiction: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `虚构演绎，仅供娱乐`
      }
    },
    publisherDeclarationXhsNone: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `无需内容标注`
      }
    },
    publisherDeclarationXhsAi: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `笔记含AI合成内容`
      }
    },
    publisherDeclarationXhsMarketing: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `内容包含营销广告`
      }
    },
    publisherDeclarationSource: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `内容来源声明`
      }
    },
    publisherDeclarationChannelsNone: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `无需标注`
      }
    },
    publisherDeclarationChannelsAi: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `含AI生成内容`
      }
    },
    publisherDeclarationChannelsFiction: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `内容为虚构剧情，仅供娱乐`
      }
    },
    publisherDeclarationReference: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `个人观点，仅供参考`
      }
    },
    publisherDeclarationSelfFilmed: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `内容为自行拍摄`
      }
    },
    publisherDeclarationBilibiliNone: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `内容无需标注`
      }
    },
    publisherDeclarationBilibiliAi: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `含AI生成内容`
      }
    },
    publisherDeclarationBilibiliFiction: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `含虚构演绎内容`
      }
    },
    publisherDeclarationBilibiliMarketing: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `内容含营销信息`
      }
    },
    publisherDeclarationBilibiliRepost: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `内容为转载`
      }
    },
    publisherRemoteBindingOpened: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `已打开平台登录窗口`
      }
    },
    publisherRemoteBindingDetected: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `已检测到登录成功，正在采集账号昵称和头像`
      }
    },
    publisherRemoteLaunching: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `正在启动独立 Chrome 窗口`
      }
    },
    publisherRemoteBrowserOpened: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Chrome 已打开，正在进入平台上传页`
      }
    },
    publisherRemoteLocatingUpload: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `正在定位视频上传位置`
      }
    },
    publisherRemoteUploading: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `正在上传视频并等待平台处理`
      }
    },
    publisherRemoteFormReady: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `上传页已就绪`
      }
    },
    publisherRemoteFilling: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `正在填写标题、话题与简介`
      }
    },
    publisherRemoteCover: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `正在设置封面与内容声明`
      }
    },
    publisherRemoteReady: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `资料填写完成，等待人工检查并发布`
      }
    },
    publisherRemoteScheduledReady: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `资料与定时时间已填写，等待人工检查并发布`
      }
    },
    publisherRemoteAllReady: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `全部账号已准备完成，等待人工检查并发布`
      }
    },
    publisherRemoteAllScheduledReady: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `全部账号的资料与定时时间已准备完成，等待人工检查并发布`
      }
    },
    publisherRemoteTaskCancelled: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `任务已取消`
      }
    },
    publisherRemoteTaskCancelledWindows: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `任务已取消，已关闭对应浏览器窗口`
      }
    },
    publisherRemoteChromeUnavailable: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `没有找到可用的 Google Chrome，请安装或更新 Chrome 后重试。`
      }
    },
    publisherRemoteFileUnavailable: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `视频或封面文件已被移动或删除，请重新选择文件后发布。`
      }
    },
    publisherRemoteLoginInvalid: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `该账号登录失效，请到平台账号页面重新登录`
      }
    },
    clipboardAssistantToolName: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `剪贴板助手`
      }
    },
    clipboardAssistantToolDescription: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `自动保存复制过的文字，快捷键唤出浮窗，一键复制历史内容和常用语。`
      }
    },
    clipboardAssistantKicker: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `本地剪贴板`
      }
    },
    clipboardAssistantHeroDesc: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3,
          v: `复制过的文字保存在本机，在任意应用中按 `
        }, {
          t: 4,
          k: `shortcut`
        }, {
          t: 3,
          v: ` 唤出浮窗，选中即复制到剪贴板。图片和文件不会记录。`
        }]
      }
    },
    clipboardAssistantRecordTitle: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `记录剪贴板文字`
      }
    },
    clipboardAssistantRecordDesc: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `只保存纯文本；密码管理器标记为隐私的内容会自动跳过。`
      }
    },
    clipboardAssistantShortcutTitle: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `唤起快捷键`
      }
    },
    clipboardAssistantShortcutDesc: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `点击组合键可修改，在任意应用中按下即可弹出浮窗。`
      }
    },
    clipboardAssistantShortcutDisabledHint: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `开启「记录剪贴板文字」后生效。`
      }
    },
    clipboardAssistantShortcutChange: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `点击修改快捷键`
      }
    },
    clipboardAssistantShortcutReset: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `恢复默认`
      }
    },
    clipboardAssistantShortcutPress: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `请按下组合键…`
      }
    },
    clipboardAssistantShortcutInvalid: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `需要 1～2 个修饰键（至少含 Ctrl、Alt 或 ⌘）加一个字母，按 Esc 取消。`
      }
    },
    clipboardAssistantShortcutSaved: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `快捷键已更新`
      }
    },
    clipboardAssistantShortcutInactive: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3,
          v: `快捷键未生效：`
        }, {
          t: 4,
          k: `reason`
        }]
      }
    },
    clipboardAssistantTimelineTitle: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `同步到时间线`
      }
    },
    clipboardAssistantTimelineDesc: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `复制的文字同时记一条时间线，分类为「剪贴板记录」，不消耗记录次数；会随时间线同步到云端。`
      }
    },
    clipboardAssistantTimelineCloudBadge: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `会上传云端`
      }
    },
    clipboardAssistantRetentionTitle: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `历史保留时间`
      }
    },
    clipboardAssistantRetentionDesc: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `超过期限的记录自动删除，置顶的记录一直保留。`
      }
    },
    clipboardAssistantRetentionForever: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `永久保留`
      }
    },
    clipboardAssistantRetentionDays: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 4,
          k: `n`
        }, {
          t: 3,
          v: ` 天`
        }]
      }
    },
    clipboardAssistantRetentionYear: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `1 年`
      }
    },
    clipboardAssistantTabHistory: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `剪贴板历史`
      }
    },
    clipboardAssistantTabPhrases: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `常用语`
      }
    },
    clipboardAssistantSearchPlaceholder: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `搜索剪贴板历史`
      }
    },
    clipboardAssistantClearSearch: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `清除搜索`
      }
    },
    clipboardAssistantClearHistory: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `清空历史`
      }
    },
    clipboardAssistantNewPhrase: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `新建常用语`
      }
    },
    clipboardAssistantHistoryEmpty: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `还没有剪贴板记录`
      }
    },
    clipboardAssistantHistoryEmptyDesc: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `复制一段文字试试，它会出现在这里。`
      }
    },
    clipboardAssistantHistoryDisabledDesc: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `开启「记录剪贴板文字」后，复制的文字会出现在这里。`
      }
    },
    clipboardAssistantHistoryNoMatch: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `没有找到匹配的记录`
      }
    },
    clipboardAssistantPhrasesEmpty: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `还没有常用语`
      }
    },
    clipboardAssistantPhrasesEmptyDesc: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `把常用的回复、地址、签名存成常用语，在浮窗里一键复制。`
      }
    },
    clipboardAssistantCharacters: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 4,
          k: `n`
        }, {
          t: 3,
          v: ` 字`
        }]
      }
    },
    clipboardAssistantCopyCount: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3,
          v: `复制 `
        }, {
          t: 4,
          k: `n`
        }, {
          t: 3,
          v: ` 次`
        }]
      }
    },
    clipboardAssistantUseCount: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3,
          v: `使用 `
        }, {
          t: 4,
          k: `n`
        }, {
          t: 3,
          v: ` 次`
        }]
      }
    },
    clipboardAssistantCopy: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `复制`
      }
    },
    clipboardAssistantCopied: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `已复制到剪贴板`
      }
    },
    clipboardAssistantPin: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `置顶`
      }
    },
    clipboardAssistantUnpin: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `取消置顶`
      }
    },
    clipboardAssistantDelete: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `删除`
      }
    },
    clipboardAssistantEdit: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `编辑`
      }
    },
    clipboardAssistantDragToSort: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `拖动排序`
      }
    },
    clipboardAssistantLoading: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `正在加载…`
      }
    },
    clipboardAssistantLoadingMore: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `正在加载更多…`
      }
    },
    clipboardAssistantYesterday: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `昨天`
      }
    },
    clipboardAssistantPhraseEditorCreate: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `新建常用语`
      }
    },
    clipboardAssistantPhraseEditorEdit: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `编辑常用语`
      }
    },
    clipboardAssistantPhraseTitleLabel: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `标题（可选）`
      }
    },
    clipboardAssistantPhraseTitlePlaceholder: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `例如：公司地址`
      }
    },
    clipboardAssistantPhraseContentLabel: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `内容`
      }
    },
    clipboardAssistantPhraseContentPlaceholder: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `输入要复制的文字`
      }
    },
    clipboardAssistantPhraseContentRequired: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `请填写常用语内容`
      }
    },
    clipboardAssistantPhraseSaveHint: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 4,
          k: `key`
        }, {
          t: 3,
          v: ` 保存`
        }]
      }
    },
    clipboardAssistantSave: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `保存`
      }
    },
    clipboardAssistantCancel: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `取消`
      }
    },
    clipboardAssistantConfirmEnableTitle: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `开启剪贴板记录？`
      }
    },
    clipboardAssistantConfirmEnableDesc: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `开启后，复制的文字会保存在本机（不含图片和文件），账号、验证码、聊天内容等也可能被保存。密码管理器标记为隐私的内容会自动跳过，你可以随时关闭或清空。`
      }
    },
    clipboardAssistantConfirmEnableAction: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `开启记录`
      }
    },
    clipboardAssistantConfirmTimelineTitle: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `同步到时间线并上传云端？`
      }
    },
    clipboardAssistantConfirmTimelineDesc1: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `开启后，每次复制的文字都会另存一条时间线记录，分类为「剪贴板记录」，不消耗记录次数。`
      }
    },
    clipboardAssistantConfirmTimelineDesc2: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `这些时间线记录会和其他记录一样同步到云端（例如小程序同步），生成日报、周报等 AI 功能也会读取这些内容。`
      }
    },
    clipboardAssistantConfirmTimelineDesc3: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `复制的内容可能包含密码、验证码、证件号、聊天记录等敏感信息，请确认可以接受上传后再开启。关闭后不再写入新记录，已写入的记录需要在时间线中手动删除。`
      }
    },
    clipboardAssistantConfirmTimelineAction: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `我已了解，开启同步`
      }
    },
    clipboardAssistantConfirmClearTitle: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `清空剪贴板历史？`
      }
    },
    clipboardAssistantConfirmClearDesc: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `未置顶的记录将被永久删除，置顶的记录会保留；已同步到时间线的记录不受影响。`
      }
    },
    clipboardAssistantConfirmClearAction: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `清空`
      }
    },
    clipboardAssistantConfirmDeletePhraseTitle: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `删除这条常用语？`
      }
    },
    clipboardAssistantConfirmDeletePhraseDesc: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `删除后无法恢复。`
      }
    },
    clipboardAssistantConfirmDeleteAction: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `删除`
      }
    },
    clipboardAssistantOperationFailed: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `操作失败，请重试`
      }
    },
    clipboardPickerSearchHistory: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `搜索剪贴板历史`
      }
    },
    clipboardPickerSearchPhrases: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `搜索常用语`
      }
    },
    clipboardPickerTabHistory: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `历史`
      }
    },
    clipboardPickerTabPhrases: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `常用语`
      }
    },
    clipboardPickerEmptyHistory: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `还没有剪贴板记录，复制文字后会出现在这里`
      }
    },
    clipboardPickerEmptyPhrases: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `还没有常用语，可在「工具箱 › 剪贴板助手」中添加`
      }
    },
    clipboardPickerNoMatch: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `没有匹配的内容`
      }
    },
    clipboardPickerHintSelect: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `选择`
      }
    },
    clipboardPickerHintCopy: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `复制`
      }
    },
    clipboardPickerHintSwitch: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `切换`
      }
    },
    clipboardPickerHintClose: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `关闭`
      }
    },
    clipboardPickerHintQuick: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `快速复制`
      }
    },
    clipboardPickerYesterday: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `昨天`
      }
    },
    clipboardPickerCopyFailed: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `复制失败`
      }
    },
    clipboardPickerPreviewLabel: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `完整内容`
      }
    },
    clipboardPickerPreviewEmpty: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `把鼠标移到左侧条目上查看完整内容`
      }
    },
    clipboardPickerPreviewTruncated: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3,
          v: `内容较长，仅显示前 `
        }, {
          t: 4,
          k: `n`
        }, {
          t: 3,
          v: ` 字`
        }]
      }
    },
    clipboardPickerCharacters: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 4,
          k: `n`
        }, {
          t: 3,
          v: ` 字`
        }]
      }
    },
    clipboardPickerCopyCount: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3,
          v: `复制 `
        }, {
          t: 4,
          k: `n`
        }, {
          t: 3,
          v: ` 次`
        }]
      }
    },
    clipboardPickerUseCount: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3,
          v: `使用 `
        }, {
          t: 4,
          k: `n`
        }, {
          t: 3,
          v: ` 次`
        }]
      }
    },
    widgetsCategory: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `小工具`
      }
    },
    desktopWidgetsSyncNote: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `这里的开关和选项与「设置 → 小工具」是同一份，在任一处修改都会立即生效。`
      }
    },
    desktopWidgetsMacAccessibility: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `macOS 需要授予「辅助功能」权限后才能识别按键。`
      }
    },
    desktopWidgetsGrantAccess: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `去授权`
      }
    },
    desktopWidgetsOn: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `已开启`
      }
    },
    desktopWidgetsOff: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `未开启`
      }
    },
    woodenFishToolName: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `木鱼`
      }
    },
    woodenFishToolDescription: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `敲一敲木鱼解压，可悬浮在桌面上随意拖动。`
      }
    },
    woodenFishToolIntro: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `点一下敲一下，解压放松。可以悬浮在桌面最上层，也可以只在应用内显示，右键木鱼查看更多选项。`
      }
    },
    woodenFishStageHint: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `点击木鱼敲一下，功德与桌面上的木鱼共用`
      }
    },
    woodenFishTodayMerit: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `今日功德`
      }
    },
    woodenFishTotalMerit: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `累计功德`
      }
    },
    woodenFishSoundDesc: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `敲木鱼时播放清脆的木鱼声`
      }
    },
    keyboardSoundToolName: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `模拟键盘音效`
      }
    },
    keyboardSoundToolDescription: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `在任意应用中敲击键盘时播放机械轴体、手机或数码按键音。`
      }
    },
    keyboardSoundToolIntro: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `敲键盘时在任意应用里播放按键音。有机械轴、手机、打字机等多种音色，也能导入自己的音效。`
      }
    },
    keyboardSoundTypesHint: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `点选即切换并试听；只想听听可以点右侧的播放按钮。`
      }
    },
    keyboardSoundInUse: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `使用中`
      }
    },
    keyboardSoundCustomTitle: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `自定义音效`
      }
    },
    keyboardSoundCustomHint: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `选择一段本地音频作为按键音`
      }
    },
    keyboardSoundCustomUse: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `使用`
      }
    },
    keyboardSoundTryTitle: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `试一试`
      }
    },
    keyboardSoundTryHint: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `在输入框里敲几下，听听当前音效和音量`
      }
    },
    keyboardSoundTryPlaceholder: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `在这里敲键盘试试…`
      }
    },
    keyboardHeatmapToolName: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `按键热力统计`
      }
    },
    keyboardHeatmapToolDescription: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `统计每天各物理键位的敲击次数，在热力图页面查看。`
      }
    },
    keyboardHeatmapToolIntro: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `按天统计每个物理键位的敲击次数，看看你最常敲哪些键。只记次数，不记内容。`
      }
    },
    keyboardHeatmapDataTitle: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `统计数据`
      }
    },
    keyboardHeatmapOpenPage: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `在热力图中查看`
      }
    },
    keyboardHeatmapPreviewTitle: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `开启后，这里会画出你的键盘热力`
      }
    },
    keyboardHeatmapPreviewDesc: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `下面是示意效果，颜色越深表示敲得越多。`
      }
    },
    keyboardHeatmapSample: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `示意`
      }
    },
    keyboardHeatmapPointCountTitle: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `只统计次数`
      }
    },
    keyboardHeatmapPointCountDesc: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `记录每个物理键位每天被按下多少次，按住不放到松开只算一次`
      }
    },
    keyboardHeatmapPointPrivacyTitle: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `不记录内容`
      }
    },
    keyboardHeatmapPointPrivacyDesc: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `不记录输入的文字、按键顺序、精确时间、窗口或应用`
      }
    },
    keyboardHeatmapPointLocalTitle: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `只存本机`
      }
    },
    keyboardHeatmapPointLocalDesc: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `数据保存在当前账号的本地数据库，不会上传云端`
      }
    },
    keyboardHeatmapEnableAction: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `开启统计`
      }
    },
    mouseHeatmapToolName: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `鼠标热力`
      }
    },
    mouseHeatmapToolDescription: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `统计每天的左右键点击和滚动次数，把光标常去的位置画成屏幕热区。`
      }
    },
    mouseHeatmapToolIntro: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `看看你最常点屏幕的哪儿、左右键各点了多少、滚了多少下。只记次数和大致位置，不记内容。`
      }
    },
    mouseHeatmapDataTitle: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `统计数据`
      }
    },
    mouseHeatmapOpenPage: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `在热力图中查看`
      }
    },
    mouseHeatmapPreviewTitle: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `开启后，这里会画出你的鼠标热力`
      }
    },
    mouseHeatmapPreviewDesc: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `下面是示意效果，颜色越深表示点得越多。`
      }
    },
    mouseHeatmapSample: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `示意`
      }
    },
    mouseHeatmapPointCountTitle: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `统计点击和滚动`
      }
    },
    mouseHeatmapPointCountDesc: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `按天统计左右键点击和滚动次数，位置只按屏幕网格累计`
      }
    },
    mouseHeatmapPointPrivacyTitle: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `不记录内容`
      }
    },
    mouseHeatmapPointPrivacyDesc: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `不记录点击时间、窗口、应用或屏幕上的内容`
      }
    },
    mouseHeatmapPointLocalTitle: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `只存本机`
      }
    },
    mouseHeatmapPointLocalDesc: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `数据保存在当前账号的本地数据库，不会上传云端`
      }
    },
    mouseHeatmapEnableAction: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `开启统计`
      }
    },
    screenshotToolName: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `截图美化`
      }
    },
    screenshotToolDescription: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `截图后自动加上背景、圆角和阴影，还能标注、打码、钉图和识别文字。`
      }
    },
    screenshotKicker: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `本地截图`
      }
    },
    screenshotHeroDesc: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `截图后自动加上背景、圆角和阴影，一键复制就能发出去；还能标注、打码、钉在桌面、识别文字。全部在本机完成，截图不会上传，也不占记录次数。`
      }
    },
    screenshotImportImage: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `打开图片`
      }
    },
    screenshotStartCapture: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `开始截图`
      }
    },
    screenshotPermissionMissing: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `macOS 需要授予「屏幕录制」权限后才能截图。`
      }
    },
    screenshotPermissionOpen: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `去授权`
      }
    },
    screenshotStepCapture: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `按快捷键截图`
      }
    },
    screenshotStepCaptureKey: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 4,
          k: `shortcut`
        }]
      }
    },
    screenshotStepSelect: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `点选窗口或拖动框选`
      }
    },
    screenshotStepSelectKey: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `方向键可微调选区`
      }
    },
    screenshotStepBeautify: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `自动美化，可再标注`
      }
    },
    screenshotStepCopy: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `复制后直接粘贴`
      }
    },
    screenshotDropTitle: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `拖入或粘贴一张图片来美化`
      }
    },
    screenshotDropHint: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3,
          v: `支持 PNG、JPG、WebP，在这个页面按 `
        }, {
          t: 4,
          k: `modifier`
        }, {
          t: 3,
          v: `V 也可以直接粘贴`
        }]
      }
    },
    screenshotShortcutTitle: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `截图快捷键`
      }
    },
    screenshotShortcutDesc: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `在任意应用中按下即可截图；点击组合键可修改，支持字母、数字和 F1–F12。`
      }
    },
    screenshotShortcutOffDesc: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `开启后可在任意应用中用快捷键截图；关闭时也能用上方「开始截图」或托盘菜单。`
      }
    },
    screenshotShortcutChange: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `点击修改快捷键`
      }
    },
    screenshotShortcutPress: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `请按下组合键…`
      }
    },
    screenshotShortcutReset: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `恢复默认`
      }
    },
    screenshotShortcutSaved: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `快捷键已更新`
      }
    },
    screenshotShortcutInvalid: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `字母和数字需要搭配 Ctrl、Alt 或 ⌘，F1–F12 可以单独使用；不能占用 Ctrl+C 这类常用组合键`
      }
    },
    screenshotShortcutInactive: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3,
          v: `快捷键暂未生效：`
        }, {
          t: 4,
          k: `reason`
        }]
      }
    },
    screenshotAfterCaptureTitle: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `按 Enter 后`
      }
    },
    screenshotAfterCaptureEditor: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `打开美化编辑器`
      }
    },
    screenshotAfterCaptureCopy: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `直接复制美化图`
      }
    },
    screenshotAfterCaptureEditorDesc: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `在编辑器里调整样式、加标注，按 Enter 复制并关闭。`
      }
    },
    screenshotAfterCaptureCopyDesc: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `按上次的样式美化后直接复制，右下角提示卡里可以再点开编辑。`
      }
    },
    screenshotAutoCopyTitle: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `打开编辑器时自动复制`
      }
    },
    screenshotAutoCopyDesc: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `编辑器一打开就把美化好的图片放进剪贴板，不改样式可以直接粘贴。`
      }
    },
    screenshotSaveDirectoryTitle: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `保存位置`
      }
    },
    screenshotSaveDirectoryChange: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `更改`
      }
    },
    screenshotSaveDirectoryReset: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `恢复默认`
      }
    },
    screenshotSaveDirectoryOpen: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `打开文件夹`
      }
    },
    screenshotHistoryLimitTitle: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `截图历史`
      }
    },
    screenshotHistoryLimitDesc: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `保存在本机，可以随时打开继续编辑；超出数量时自动删除最早的。`
      }
    },
    screenshotHistoryLimitOff: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `不保留`
      }
    },
    screenshotHistoryLimitCount: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3,
          v: `最近 `
        }, {
          t: 4,
          k: `n`
        }, {
          t: 3,
          v: ` 张`
        }]
      }
    },
    screenshotHistoryTitle: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `最近截图`
      }
    },
    screenshotHistoryClear: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `清空`
      }
    },
    screenshotHistoryEmpty: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `还没有截图`
      }
    },
    screenshotHistoryEmptyDesc: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `截图或导入图片后会出现在这里，点开可以继续编辑。`
      }
    },
    screenshotHistoryOffDesc: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `当前设置为不保留历史。`
      }
    },
    screenshotHistoryOpen: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `在编辑器中打开`
      }
    },
    screenshotHistoryCopyOutput: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `复制最近一次导出的图片`
      }
    },
    screenshotHistoryCopySource: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `复制原图`
      }
    },
    screenshotHistoryDelete: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `删除`
      }
    },
    screenshotHistoryCopied: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `已复制到剪贴板`
      }
    },
    screenshotHistoryClearTitle: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `清空截图历史？`
      }
    },
    screenshotHistoryClearDesc: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `本机保存的截图历史会全部删除，已经保存到文件夹里的图片不受影响。`
      }
    },
    screenshotHistoryClearAction: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `清空`
      }
    },
    screenshotPrivacyNote: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `截图、美化、标注和文字识别都在本机完成，不会上传到云端，也不会出现在时间线里。`
      }
    },
    screenshotLoading: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `加载中…`
      }
    },
    screenshotCancel: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `取消`
      }
    },
    screenshotYesterday: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `昨天`
      }
    },
    screenshotOperationFailed: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `操作失败，请重试`
      }
    },
    screenshotImportNotImage: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `请选择图片文件`
      }
    },
    screenshotImportTooLarge: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `图片太大了，请选择 40MB 以内的图片`
      }
    },
    screenshotOverlayHint: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `单击选中窗口，拖动框选区域 · Esc 退出`
      }
    },
    screenshotOverlayBeautify: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `美化`
      }
    },
    screenshotOverlayBeautifyCopy: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `美化并复制`
      }
    },
    screenshotOverlayCopy: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `复制原图`
      }
    },
    screenshotOverlayPin: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `钉到桌面`
      }
    },
    screenshotOverlayOcr: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `识别文字`
      }
    },
    screenshotOverlaySave: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `保存`
      }
    },
    screenshotOverlayCancel: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `取消`
      }
    },
    screenshotOverlayCopyColorHint: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `按 C 复制颜色`
      }
    },
    screenshotOverlayColorCopied: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3,
          v: `已复制颜色 `
        }, {
          t: 4,
          k: `color`
        }]
      }
    },
    screenshotEditorTitle: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `截图美化`
      }
    },
    screenshotEditorLoading: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `正在打开截图…`
      }
    },
    screenshotToolSelect: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `选择`
      }
    },
    screenshotToolRect: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `矩形`
      }
    },
    screenshotToolEllipse: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `椭圆`
      }
    },
    screenshotToolArrow: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `箭头`
      }
    },
    screenshotToolLine: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `直线`
      }
    },
    screenshotToolPen: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `画笔`
      }
    },
    screenshotToolHighlighter: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `荧光笔`
      }
    },
    screenshotToolText: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `文字`
      }
    },
    screenshotToolNumber: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `序号`
      }
    },
    screenshotToolMosaic: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `马赛克`
      }
    },
    screenshotSizeSmall: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `细`
      }
    },
    screenshotSizeMedium: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `中`
      }
    },
    screenshotSizeLarge: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `粗`
      }
    },
    screenshotUndo: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `撤销`
      }
    },
    screenshotRedo: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `重做`
      }
    },
    screenshotDelete: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `删除选中的标注`
      }
    },
    screenshotTextPlaceholder: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `输入文字`
      }
    },
    screenshotStatusIdle: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `按 Enter 复制并关闭`
      }
    },
    screenshotStatusCopied: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `已复制到剪贴板，可以直接粘贴`
      }
    },
    screenshotStatusChanged: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `有新改动，按 Enter 复制最新效果`
      }
    },
    screenshotStatusExporting: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `正在生成图片…`
      }
    },
    screenshotActionCopy: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `复制`
      }
    },
    screenshotActionCopyHint: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Enter 复制并关闭`
      }
    },
    screenshotActionSave: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `保存`
      }
    },
    screenshotActionSaveToFolder: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `保存到截图文件夹`
      }
    },
    screenshotActionSaveAs: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `另存为…`
      }
    },
    screenshotActionPin: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `钉到桌面`
      }
    },
    screenshotActionSendToBot: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `发给超能伙伴`
      }
    },
    screenshotActionFailed: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `操作失败，请重试`
      }
    },
    screenshotToastCopied: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `已复制`
      }
    },
    screenshotToastSaved: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3,
          v: `已保存 `
        }, {
          t: 4,
          k: `name`
        }]
      }
    },
    screenshotToastReveal: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `打开文件夹`
      }
    },
    screenshotToastPinned: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `已钉到桌面`
      }
    },
    screenshotToastFailed: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3,
          v: `操作失败：`
        }, {
          t: 4,
          k: `reason`
        }]
      }
    },
    screenshotTabStyle: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `样式`
      }
    },
    screenshotTabText: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `文字识别`
      }
    },
    screenshotStyleEnabled: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `美化`
      }
    },
    screenshotStyleEnabledDesc: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `关掉后只导出截图和标注`
      }
    },
    screenshotPresets: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `预设`
      }
    },
    screenshotPresetSave: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `保存当前样式`
      }
    },
    screenshotPresetNamePlaceholder: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `给预设起个名字`
      }
    },
    screenshotPresetSaveConfirm: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `保存`
      }
    },
    screenshotPresetSaved: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `预设已保存`
      }
    },
    screenshotPresetDelete: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `删除预设`
      }
    },
    screenshotPresetSoft: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `柔和模糊`
      }
    },
    screenshotPresetClean: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `简洁浅灰`
      }
    },
    screenshotPresetWindow: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `窗口`
      }
    },
    screenshotPresetDark: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `深色`
      }
    },
    screenshotPresetBrand: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `薄荷`
      }
    },
    screenshotPresetPlain: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `无背景`
      }
    },
    screenshotBackground: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `背景`
      }
    },
    screenshotBackgroundBlur: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `模糊`
      }
    },
    screenshotBackgroundSolid: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `纯色`
      }
    },
    screenshotBackgroundGradient: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `渐变`
      }
    },
    screenshotBackgroundTransparent: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `透明`
      }
    },
    screenshotBackgroundImage: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `图片`
      }
    },
    screenshotBackgroundChooseImage: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `选择图片`
      }
    },
    screenshotBackgroundLoadSystem: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `读取系统壁纸`
      }
    },
    screenshotBackgroundLoading: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `正在加载…`
      }
    },
    screenshotBackgroundImageEmptyHint: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `请先选择图片，或点右上角读取系统壁纸。`
      }
    },
    screenshotBackgroundImageDesc: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `本机图片，不上传；已选会记住。`
      }
    },
    screenshotBackgroundSystemEmpty: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `未找到可用系统壁纸。`
      }
    },
    screenshotBackgroundImageFailed: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `无法读取此图片，请选择其他图片。`
      }
    },
    screenshotBackgroundBlurDesc: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `用截图本身模糊后做背景，颜色和内容自然协调。`
      }
    },
    screenshotBackgroundTransparentDesc: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `导出带透明背景的 PNG，只保留圆角和阴影。`
      }
    },
    screenshotCustomColor: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `自定义颜色`
      }
    },
    screenshotPadding: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `内边距`
      }
    },
    screenshotRadius: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `圆角`
      }
    },
    screenshotShadow: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `阴影`
      }
    },
    screenshotFrame: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `窗口外框`
      }
    },
    screenshotFrameNone: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `无`
      }
    },
    screenshotFrameMacLight: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `浅色窗口`
      }
    },
    screenshotFrameMacDark: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `深色窗口`
      }
    },
    screenshotFrameBrowserLight: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `浅色浏览器`
      }
    },
    screenshotFrameBrowserDark: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `深色浏览器`
      }
    },
    screenshotRatio: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `比例`
      }
    },
    screenshotRatioAuto: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `自动`
      }
    },
    screenshotBalance: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `自动居中`
      }
    },
    screenshotBalanceDesc: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `裁掉截图边缘的纯色留白，四周对齐后再居中`
      }
    },
    screenshotOcrHint: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `在本机识别截图里的文字，不上传、不消耗积分。`
      }
    },
    screenshotOcrUnsupported: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `当前系统不支持文字识别。`
      }
    },
    screenshotOcrRun: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `识别文字`
      }
    },
    screenshotOcrRerun: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `重新识别`
      }
    },
    screenshotOcrRunning: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `正在识别…`
      }
    },
    screenshotOcrEmpty: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `没有识别到文字`
      }
    },
    screenshotOcrCopy: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `复制全部`
      }
    },
    screenshotOcrCopied: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `已复制文字`
      }
    },
    screenshotToastCardCopied: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `已复制到剪贴板`
      }
    },
    screenshotToastCardSaved: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `已保存到截图文件夹`
      }
    },
    screenshotToastCardEdit: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `编辑`
      }
    },
    screenshotToastCardPin: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `钉到桌面`
      }
    },
    screenshotToastCardClose: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `关闭`
      }
    },
    workMotivatorToolName: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `上班鼓励器`
      }
    },
    workMotivatorToolDescription: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `实时滚动今天赚了多少钱，下班倒计时、攒钱心愿，悬浮在桌面上。`
      }
    },
    workMotivatorToolIntro: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `设好薪资和上下班时间，桌面上的机械计数器会按秒滚动今天已赚的钱，还能看下班倒计时、工时进度和攒钱心愿。双击悬浮窗展开或收起，右键查看更多选项。`
      }
    },
    workMotivatorPrivacyNote: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `薪资、心愿和倒计时只保存在这台电脑上，会跟着完整备份和 JSON 导出一起备份，不会上传云端。`
      }
    },
    workMotivatorHiddenForSession: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `悬浮窗本次已隐藏，重启应用后会自动出现。`
      }
    },
    workMotivatorShowAgain: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `重新显示`
      }
    },
    workMotivatorClickThroughOnHint: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `鼠标穿透已开启，悬浮窗不响应点击，只能在这里关闭。`
      }
    },
    workMotivatorClickThroughOff: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `关闭穿透`
      }
    },
    workMotivatorEarned: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `今日已赚`
      }
    },
    workMotivatorEarnedWeek: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `本周已赚`
      }
    },
    workMotivatorEarnedMonth: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `本月已赚`
      }
    },
    workMotivatorHourlyRate: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3,
          v: `时薪 `
        }, {
          t: 4,
          k: `amount`
        }]
      }
    },
    workMotivatorStatusRest: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `休息日`
      }
    },
    workMotivatorStatusBefore: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `未上班`
      }
    },
    workMotivatorStatusWorking: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `上班中`
      }
    },
    workMotivatorStatusLunch: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `午休中`
      }
    },
    workMotivatorStatusOvertime: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `加班中`
      }
    },
    workMotivatorStatusOff: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `已下班`
      }
    },
    workMotivatorToOffWork: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3,
          v: `距下班 `
        }, {
          t: 4,
          k: `time`
        }]
      }
    },
    workMotivatorToStart: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3,
          v: `距上班 `
        }, {
          t: 4,
          k: `time`
        }]
      }
    },
    workMotivatorToLunchEnd: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3,
          v: `午休还剩 `
        }, {
          t: 4,
          k: `time`
        }]
      }
    },
    workMotivatorOvertimeFor: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3,
          v: `已加班 `
        }, {
          t: 4,
          k: `time`
        }]
      }
    },
    workMotivatorDurationDH: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 4,
          k: `d`
        }, {
          t: 3,
          v: `天`
        }, {
          t: 4,
          k: `h`
        }, {
          t: 3,
          v: `小时`
        }]
      }
    },
    workMotivatorDurationHM: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 4,
          k: `h`
        }, {
          t: 3,
          v: `小时`
        }, {
          t: 4,
          k: `m`
        }, {
          t: 3,
          v: `分`
        }]
      }
    },
    workMotivatorDurationM: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 4,
          k: `m`
        }, {
          t: 3,
          v: `分钟`
        }]
      }
    },
    workMotivatorDateLabel: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 4,
          k: `month`
        }, {
          t: 3,
          v: `月`
        }, {
          t: 4,
          k: `day`
        }, {
          t: 3,
          v: `日 `
        }, {
          t: 4,
          k: `weekday`
        }]
      }
    },
    workMotivatorWishTitle: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3,
          v: `小心愿 · `
        }, {
          t: 4,
          k: `name`
        }]
      }
    },
    workMotivatorWishRemaining: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3,
          v: `再工作 `
        }, {
          t: 4,
          k: `time`
        }, {
          t: 3,
          v: `，就能拿下`
        }]
      }
    },
    workMotivatorWishDone: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `已经攒够了，去实现它吧`
      }
    },
    workMotivatorWishEmpty: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `还没有小心愿`
      }
    },
    workMotivatorWishEmptyHint: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `在设置里加一个目标，攒钱更有动力`
      }
    },
    workMotivatorWorkHours: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `今日工时`
      }
    },
    workMotivatorWorkHoursValue: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3,
          v: `已工作 `
        }, {
          t: 4,
          k: `worked`
        }, {
          t: 3,
          v: ` / `
        }, {
          t: 4,
          k: `total`
        }, {
          t: 3,
          v: ` 小时`
        }]
      }
    },
    workMotivatorDailyHours: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3,
          v: `每天 `
        }, {
          t: 4,
          k: `hours`
        }, {
          t: 3,
          v: ` 小时，午休不计入`
        }]
      }
    },
    workMotivatorCountdownWeekendToday: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `今天休息，好好放松`
      }
    },
    workMotivatorCountdownWeekendTomorrow: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `明天就休息啦`
      }
    },
    workMotivatorCountdownWeekend: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3,
          v: `距周末还有 `
        }, {
          t: 4,
          k: `days`
        }, {
          t: 3,
          v: ` 天`
        }]
      }
    },
    workMotivatorCountdownPaydayToday: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `今天发薪`
      }
    },
    workMotivatorCountdownPayday: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3,
          v: `距发薪日还有 `
        }, {
          t: 4,
          k: `days`
        }, {
          t: 3,
          v: ` 天`
        }]
      }
    },
    workMotivatorCountdownCustom: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3,
          v: `距`
        }, {
          t: 4,
          k: `name`
        }, {
          t: 3,
          v: `还有 `
        }, {
          t: 4,
          k: `days`
        }, {
          t: 3,
          v: ` 天`
        }]
      }
    },
    workMotivatorCountdownCustomToday: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3,
          v: `今天就是`
        }, {
          t: 4,
          k: `name`
        }]
      }
    },
    workMotivatorCountdownCustomPast: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 4,
          k: `name`
        }, {
          t: 3,
          v: `已过去 `
        }, {
          t: 4,
          k: `days`
        }, {
          t: 3,
          v: ` 天`
        }]
      }
    },
    workMotivatorAmountHidden: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `金额已隐藏`
      }
    },
    workMotivatorPeriodEarned: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3,
          v: `本月已赚 `
        }, {
          t: 4,
          k: `month`
        }, {
          t: 3,
          v: ` · 今年已赚 `
        }, {
          t: 4,
          k: `year`
        }]
      }
    },
    workMotivatorButtonPin: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `置顶显示`
      }
    },
    workMotivatorButtonUnpin: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `取消置顶`
      }
    },
    workMotivatorButtonHideAmount: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `隐藏金额`
      }
    },
    workMotivatorButtonShowAmount: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `显示金额`
      }
    },
    workMotivatorButtonExpand: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `展开`
      }
    },
    workMotivatorButtonCollapse: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `收起`
      }
    },
    workMotivatorButtonSettings: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `设置`
      }
    },
    workMotivatorButtonClose: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `隐藏本次`
      }
    },
    workMotivatorSalarySection: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `薪资与工作时间`
      }
    },
    workMotivatorSalary: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `薪资`
      }
    },
    workMotivatorSalaryDesc: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `按月薪、日薪或时薪填写，税前、到手都可以`
      }
    },
    workMotivatorSalaryMonthly: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `月薪`
      }
    },
    workMotivatorSalaryDaily: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `日薪`
      }
    },
    workMotivatorSalaryHourly: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `时薪`
      }
    },
    workMotivatorMonthBasis: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `月薪折算`
      }
    },
    workMotivatorMonthBasisDesc: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `把月薪分摊到每个工作日`
      }
    },
    workMotivatorMonthBasisStandard: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `按 21.75 天（法定计薪天数）`
      }
    },
    workMotivatorMonthBasisActual: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `按当月实际工作日`
      }
    },
    workMotivatorMonthBasisCustom: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `自定义天数`
      }
    },
    workMotivatorCustomMonthDays: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `每月计薪天数`
      }
    },
    workMotivatorCustomMonthDaysUnit: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `天`
      }
    },
    workMotivatorCustomMonthDaysInvalid: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `请填写 1–31 之间的天数`
      }
    },
    workMotivatorWorkTime: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `上下班时间`
      }
    },
    workMotivatorStartTime: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `上班时间`
      }
    },
    workMotivatorEndTime: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `下班时间`
      }
    },
    workMotivatorLunch: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `午休`
      }
    },
    workMotivatorLunchDesc: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `午休时间不计薪、不算工时`
      }
    },
    workMotivatorLunchInvalid: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `午休开始和结束时间不能相同`
      }
    },
    workMotivatorLunchStart: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `午休开始`
      }
    },
    workMotivatorLunchEnd: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `午休结束`
      }
    },
    workMotivatorWeekPattern: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `工作日`
      }
    },
    workMotivatorWeekPatternDesc: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `休息日不计薪`
      }
    },
    workMotivatorWeekAlternateDesc: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `大周上六天、小周上五天，两周交替`
      }
    },
    workMotivatorWeekDouble: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `双休`
      }
    },
    workMotivatorWeekSingle: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `单休`
      }
    },
    workMotivatorWeekAlternate: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `大小周`
      }
    },
    workMotivatorThisWeekBig: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `本周是大周`
      }
    },
    workMotivatorThisWeekSmall: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `本周是小周`
      }
    },
    workMotivatorOvertime: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `下班后`
      }
    },
    workMotivatorOvertimeDesc: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `继续计算时最多按 6 小时算`
      }
    },
    workMotivatorOvertimeStop: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `停止计算`
      }
    },
    workMotivatorOvertimeFactor: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3,
          v: `按 `
        }, {
          t: 4,
          k: `factor`
        }, {
          t: 3,
          v: ` 倍继续算`
        }]
      }
    },
    workMotivatorOvertimeCustom: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `自定义倍数`
      }
    },
    workMotivatorOvertimeCustomFactor: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `加班倍数`
      }
    },
    workMotivatorOvertimeCustomUnit: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `倍`
      }
    },
    workMotivatorOvertimeCustomInvalid: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `请填写 0.1–10 之间的倍数`
      }
    },
    workMotivatorPayday: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `发薪日`
      }
    },
    workMotivatorPaydayDesc: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `用于「距发薪日」倒计时，超过当月天数按月底算`
      }
    },
    workMotivatorPaydayOption: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3,
          v: `每月 `
        }, {
          t: 4,
          k: `day`
        }, {
          t: 3,
          v: ` 号`
        }]
      }
    },
    workMotivatorWishSection: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `小心愿`
      }
    },
    workMotivatorWishSectionDesc: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `定一个攒钱目标，看看还要工作多久才能拿下`
      }
    },
    workMotivatorWishAdd: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `添加心愿`
      }
    },
    workMotivatorWishName: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `心愿`
      }
    },
    workMotivatorWishNamePlaceholder: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `例如：青岛威海游`
      }
    },
    workMotivatorWishAmount: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `目标金额`
      }
    },
    workMotivatorWishAmountPlaceholder: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `例如：3000`
      }
    },
    workMotivatorWishSaved: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `已攒金额（可选）`
      }
    },
    workMotivatorWishStartDate: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `从哪天开始攒`
      }
    },
    workMotivatorWishFormHint: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `从开始日起按薪资和工作日累计收入`
      }
    },
    workMotivatorWishNameRequired: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `请填写心愿名称`
      }
    },
    workMotivatorWishAmountInvalid: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `请填写有效的金额`
      }
    },
    workMotivatorWishListEmpty: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `还没有心愿，加一个目标吧。`
      }
    },
    workMotivatorWishShown: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `悬浮窗显示中`
      }
    },
    workMotivatorWishShow: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `显示在悬浮窗`
      }
    },
    workMotivatorWishComplete: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `标记为已完成`
      }
    },
    workMotivatorWishCompleted: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3,
          v: `已完成的心愿（`
        }, {
          t: 4,
          k: `count`
        }, {
          t: 3,
          v: `）`
        }]
      }
    },
    workMotivatorWishReopen: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `恢复为进行中`
      }
    },
    workMotivatorCancel: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `取消`
      }
    },
    workMotivatorSave: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `保存`
      }
    },
    workMotivatorEdit: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `编辑`
      }
    },
    workMotivatorDelete: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `删除`
      }
    },
    workMotivatorCountdownSection: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `倒计时`
      }
    },
    workMotivatorCountdownSectionDesc: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `展开后的悬浮窗底部显示一项`
      }
    },
    workMotivatorCountdownNone: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `不显示`
      }
    },
    workMotivatorCountdownShowWeekend: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `距周末`
      }
    },
    workMotivatorCountdownShowPayday: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `距发薪日`
      }
    },
    workMotivatorCountdownAdd: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `添加倒计时`
      }
    },
    workMotivatorCountdownName: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `名称`
      }
    },
    workMotivatorCountdownNamePlaceholder: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `例如：国庆假期`
      }
    },
    workMotivatorCountdownDate: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `日期`
      }
    },
    workMotivatorCountdownNameRequired: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `请填写名称和日期`
      }
    },
    workMotivatorFinish: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `机身配色`
      }
    },
    workMotivatorFinishGraphite: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `石墨黑`
      }
    },
    workMotivatorFinishSilver: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `铝银白`
      }
    },
    workMotivatorFinishSlate: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `岩灰`
      }
    },
    workMotivatorFinishForest: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `墨绿`
      }
    },
    workMotivatorFinishCocoa: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `可可`
      }
    },
    workMotivatorFinishIvory: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `暖白`
      }
    },
    workMotivatorSize: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `大小`
      }
    },
    workMotivatorSizeSmall: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `小`
      }
    },
    workMotivatorSizeMedium: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `中`
      }
    },
    workMotivatorSizeLarge: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `大`
      }
    },
    workMotivatorOpacity: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `不透明度`
      }
    },
    workMotivatorEarnedRange: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `已赚金额`
      }
    },
    workMotivatorEarnedRangeToday: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `今日`
      }
    },
    workMotivatorEarnedRangeWeek: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `本周`
      }
    },
    workMotivatorEarnedRangeMonth: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `本月`
      }
    },
    workMotivatorEarnedRangeDesc: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `今天之前的日子按排班满勤计算，不含加班`
      }
    },
    workMotivatorDecimals: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `小数位`
      }
    },
    workMotivatorDecimalsOption: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3,
          v: `保留 `
        }, {
          t: 4,
          k: `count`
        }, {
          t: 3,
          v: ` 位小数`
        }]
      }
    },
    workMotivatorCurrency: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `币种`
      }
    },
    workMotivatorAlwaysOnTop: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `置顶显示`
      }
    },
    workMotivatorAlwaysOnTopDesc: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `悬浮窗始终在其他窗口上面`
      }
    },
    workMotivatorExpanded: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `展开详情`
      }
    },
    workMotivatorExpandedDesc: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `显示时间、状态、心愿和工时；收起只留计数器`
      }
    },
    workMotivatorLocked: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `锁定位置`
      }
    },
    workMotivatorLockedDesc: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `锁定后不能拖动`
      }
    },
    workMotivatorClickThrough: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `鼠标穿透`
      }
    },
    workMotivatorClickThroughDesc: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `点击会穿过悬浮窗，开启后只能在这里关闭`
      }
    },
    workMotivatorCelebrate: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `赚钱彩蛋`
      }
    },
    workMotivatorCelebrateDesc: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3,
          v: `每赚满 `
        }, {
          t: 4,
          k: `amount`
        }, {
          t: 3,
          v: ` 放一次彩蛋，当天越往后越热闹，共 6 级`
        }]
      }
    },
    workMotivatorCelebrateAmount: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `每赚满多少放一次`
      }
    },
    workMotivatorCelebrateAmountInvalid: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `请填写大于 0 的金额`
      }
    },
    workMotivatorCelebrateBurst: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3,
          v: `+`
        }, {
          t: 4,
          k: `amount`
        }]
      }
    },
    workMotivatorCelebrateMilestone: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3,
          v: `今日已赚 `
        }, {
          t: 4,
          k: `amount`
        }]
      }
    },
    workMotivatorNotifyOffWork: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `下班提醒`
      }
    },
    workMotivatorNotifyOffWorkDesc: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `到下班时间发一条系统通知`
      }
    },
    workMotivatorHideAmount: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `隐藏金额`
      }
    },
    workMotivatorHideAmountDesc: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `数字被遮住，适合有人路过时`
      }
    },
    workMotivatorShortcutTitle: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `隐藏/显示金额快捷键`
      }
    },
    workMotivatorShortcutChange: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `点击后按下新的组合键`
      }
    },
    workMotivatorShortcutPress: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `请按下组合键`
      }
    },
    workMotivatorShortcutNone: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `未设置`
      }
    },
    workMotivatorShortcutClear: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `清除`
      }
    },
    workMotivatorShortcutInvalid: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `需要 Ctrl、Alt 或 ⌘ 加一个字母，且不能是复制、粘贴等常用快捷键`
      }
    }
  },
  sn = {
    xiaoheiToolbox: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Xiaohei Toolbox`
      }
    },
    xiaoheiToolboxHome: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Xiaohei Toolbox home`
      }
    },
    xiaoheiDailyAssistant: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Xiaobai Daily`
      }
    },
    allTools: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `All tools`
      }
    },
    topUp: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Top up`
      }
    },
    mainNavigation: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Main navigation`
      }
    },
    balance: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Credits`
      }
    },
    signOut: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Sign out`
      }
    },
    signIn: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Sign in`
      }
    },
    openMenu: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Open menu`
      }
    },
    accountSignIn: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Account sign-in`
      }
    },
    oneAccountPayAsYouGo: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `One account, pay as you go`
      }
    },
    toolbox: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Toolbox`
      }
    },
    toolList: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Tool list`
      }
    },
    usefulToolCollection: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Useful tool collection`
      }
    },
    findTheToolYouNeed: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Find the tool you need`
      }
    },
    toolCategories: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Tool categories`
      }
    },
    searchTools: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Search tools`
      }
    },
    searchToolsAriaLabel: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Search tools`
      }
    },
    clearSearch: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Clear search`
      }
    },
    loadingTools: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Loading tools...`
      }
    },
    couldNotConnectToTheToolbox: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Could not connect to the toolbox`
      }
    },
    reload: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Reload`
      }
    },
    cancel: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Cancel`
      }
    },
    confirmDelete: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Delete`
      }
    },
    noMatchingTools: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `No matching tools`
      }
    },
    tryAnotherKeywordOrCategory: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Try another keyword or category`
      }
    },
    generate: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Generate `
      }
    },
    per10kCharactersAndUp: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `/ 10k characters and up`
      }
    },
    clone: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Clone `
      }
    },
    voice: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `/ voice`
      }
    },
    oneAccount: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `One account`
      }
    },
    sharedBalanceAcrossDesktopAndWeb: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Shared credits across desktop and web`
      }
    },
    usageBased: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Usage based`
      }
    },
    noComplicatedPlans: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `No complicated plans`
      }
    },
    alwaysGrowing: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Always growing`
      }
    },
    moreUsefulToolsAreOnTheWay: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `More useful tools are on the way`
      }
    },
    termsOfService: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Terms of Service`
      }
    },
    privacyPolicy: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Privacy Policy`
      }
    },
    shanghaiTingwuIntelligentTechnologyCoLtd: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Shanghai Tingwu Intelligent Technology Co., Ltd.`
      }
    },
    backToToolbox: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Back to toolbox`
      }
    },
    available: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Available`
      }
    },
    myVoiceLibrary: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `My voice library`
      }
    },
    voiceActivity: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Voice activity`
      }
    },
    generationHistory: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Generation history`
      }
    },
    signInToUse: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Sign in to use`
      }
    },
    aiImageGenerator: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `AI Image Generator`
      }
    },
    turnYourIdeasIntoImages: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Turn your ideas into images`
      }
    },
    describeTheSubjectSceneStyleCompositionAndAspectRatio: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Describe the subject, scene, style, composition, and aspect ratio. `
      }
    },
    aHighQualityImageWillBeGeneratedFromYourPrompt: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `A high-quality image will be generated from your prompt.`
      }
    },
    currentOption: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Current option`
      }
    },
    image: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `/ image`
      }
    },
    describeTheImageYouWant: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Describe the image you want`
      }
    },
    moreDetailUsuallyProducesMoreConsistentResults: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `More detail usually produces more consistent results`
      }
    },
    useExample: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Use example`
      }
    },
    imagePrompt: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Image prompt`
      }
    },
    addReferenceImagesOptional: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Add reference images (optional)`
      }
    },
    useOneOrMoreReferenceImagesUpTo10: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Use one or more reference images, up to 10`
      }
    },
    removeReferenceImage: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Remove reference image`
      }
    },
    clickOrDropReferenceImagesHere: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Click or drop reference images here`
      }
    },
    jpgPngWebpAndMoreMaximumPerImage: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `JPG, PNG, WebP, and more; maximum per image:`
      }
    },
    generationSettings: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Generation settings`
      }
    },
    pricingVariesByResolution: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Pricing varies by resolution`
      }
    },
    aspectRatio: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Aspect ratio`
      }
    },
    imageResolution: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Image resolution`
      }
    },
    imageSize: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Image size`
      }
    },
    fileFormat: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `File format`
      }
    },
    generationMode: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Generation mode`
      }
    },
    addAnAiGeneratedWatermark: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Add an "AI generated" watermark`
      }
    },
    price: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Price`
      }
    },
    perImageSpaced: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `/ image`
      }
    },
    result: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Result`
      }
    },
    downloadTheOriginalWhenComplete: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Download the original when complete`
      }
    },
    generatingImage: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Generating image`
      }
    },
    aiGeneratedResult: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `AI-generated result`
      }
    },
    complete: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Complete`
      }
    },
    charged: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `· Charged `
      }
    },
    imageLinksRemainAvailableFor: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Image links remain available for`
      }
    },
    hoursPleaseSaveTheOriginalsPromptly: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `hours. Please save the originals promptly.`
      }
    },
    yourResultWillAppearHere: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Your result will appear here`
      }
    },
    configureTheOptionsAndStartGeneratingToSeeTheResultHere: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Configure the options and start generating to see the result here.`
      }
    },
    aiVideoGenerator: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `AI Video Generator`
      }
    },
    createCompleteVideosFromMultimodalReferences: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Create complete videos from multimodal references`
      }
    },
    enterAPromptAndOptionallyAddImageVideoOrAudioReferences: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Enter a prompt and optionally add image, video, or audio references.`
      }
    },
    currentOptionWithSeparator: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Current option ·`
      }
    },
    millionTokens: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `/ million tokens`
      }
    },
    describeTheVideoYouWant: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Describe the video you want`
      }
    },
    includeTheSubjectActionCameraSettingAndSound: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Include the subject, action, camera, setting, and sound`
      }
    },
    videoPrompt: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Video prompt`
      }
    },
    addReferenceMediaOptional: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Add reference media (optional)`
      }
    },
    upTo5Images1VideoAnd1AudioFile: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Up to 5 images, 1 video, and 1 audio file`
      }
    },
    clickOrDropImagesVideoOrAudioHere: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Click or drop images, video, or audio here`
      }
    },
    images15mbVideo100mbAudio15mbDuration215sTotal200mb: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Images ≤15MB · Video ≤100MB · Audio ≤15MB · Duration 2-15s · Total ≤200MB`
      }
    },
    audioRequiresAtLeastOneImageOrVideoReference: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Audio requires at least one image or video reference`
      }
    },
    s: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `s`
      }
    },
    removeReferenceMedia: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Remove reference media`
      }
    },
    audioCannotBeUsedAloneAddAtLeastOneImageOrVideo: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Audio cannot be used alone. Add at least one image or video.`
      }
    },
    theMostUsefulOutputSettings: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `The most useful output settings`
      }
    },
    frameAspectRatio: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Aspect ratio`
      }
    },
    videoAspectRatio: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Video aspect ratio`
      }
    },
    resolution: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Resolution`
      }
    },
    videoResolution: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Video resolution`
      }
    },
    duration: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Duration`
      }
    },
    generateAudio: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Generate audio`
      }
    },
    addAiWatermark: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Add AI watermark`
      }
    },
    keepAnAiContentLabelInTheVideo: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Keep an AI-content label in the video`
      }
    },
    currentRate: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Current rate ·`
      }
    },
    perMillionTokensSpaced: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `/ million tokens`
      }
    },
    finalChargeIsBasedOnActualTokenUsage: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Final charge is based on actual token usage`
      }
    },
    previewAndDownloadWhenComplete: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Preview and download when complete`
      }
    },
    seedanceIsGeneratingYourVideo: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Seedance is generating your video`
      }
    },
    highResolutionOrLongerVideosTakeMoreTimeBillingCompletesAutomatically: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `High-resolution or longer videos take more time. Billing completes automatically.`
      }
    },
    usage: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Usage`
      }
    },
    tokensCharged: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `tokens · Charged `
      }
    },
    videoCompletePleaseDownloadAndSaveItPromptly: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Video complete. Please download and save it promptly.`
      }
    },
    yourVideoWillAppearHere: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Your video will appear here`
      }
    },
    describeYourIdeaAndAddReferenceMediaAsNeeded: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Describe your idea and add reference media as needed.`
      }
    },
    voiceStudio: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Voice Studio`
      }
    },
    voicePricing: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Pricing`
      }
    },
    generateSpeech: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Generate speech`
      }
    },
    cloneVoice: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Clone voice`
      }
    },
    speechPricingLabel: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Speech`
      }
    },
    voiceClonePricingLabel: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Voice clone`
      }
    },
    per10kChars: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `/ 10k chars`
      }
    },
    perVoice: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `/ voice`
      }
    },
    enterTextChooseAVoiceAndGenerateAudio: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Enter text, choose a voice, and generate audio`
      }
    },
    cloneAndManageVoices: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Clone and manage voices`
      }
    },
    createTrainAndManageCustomVoices: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Create, train, and manage custom voices`
      }
    },
    voiceTools: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Voice tools`
      }
    },
    newVoice: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `New voice`
      }
    },
    createACustomVoiceTheFirstSubmissionIsCharged: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Create a custom voice; the first submission is charged`
      }
    },
    trainAnExistingVoice: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Train an existing voice`
      }
    },
    chooseALanguageAndRecordingForANewTrainingRun: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Choose a language and recording for a new training run`
      }
    },
    chooseAnAction: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Choose an action`
      }
    },
    createAVoiceOrSelectOneFromYourLibraryToTrain: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Create a voice or select one from your library to train.`
      }
    },
    managingAnExistingVoice: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Managing an existing voice`
      }
    },
    statusUpdatesPausedCheckTheTrainingResultAgain: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Status updates paused. Check the training result again.`
      }
    },
    aNewPreviewIsBeingGenerated: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `A new preview is being generated`
      }
    },
    chooseALanguageAndUploadARecordingToUpdateThePreview: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Choose a language and upload a recording to update the preview`
      }
    },
    createVoice: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Create voice`
      }
    },
    voiceName: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Voice name`
      }
    },
    forExampleMyNarrator: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `For example: My narrator`
      }
    },
    recordingLanguage: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Recording language`
      }
    },
    uploadRecording: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Upload recording`
      }
    },
    naturalSpeechAQuietRoomAndOneSpeakerWorkBest: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Natural speech, a quiet room, and one speaker work best`
      }
    },
    clickToReplaceTheRecording: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Click to replace the recording`
      }
    },
    recordingTranscriptRecommended: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Recording transcript (recommended)`
      }
    },
    enterTheExactSpokenWordsForMoreAccurateProcessing: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Enter the exact spoken words for more accurate processing.`
      }
    },
    previewText: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Preview text`
      }
    },
    usePreviewTextInTheSelectedRecordingLanguage: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Use preview text in the selected recording language`
      }
    },
    restoreExample: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Restore example`
      }
    },
    voicePreviewText: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Preview text`
      }
    },
    reduceBackgroundNoise: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Reduce background noise`
      }
    },
    recommendedWhenTheRecordingHasLightBackgroundNoise: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Recommended when the recording has light background noise`
      }
    },
    preserveOriginalVolume: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Preserve original volume`
      }
    },
    keepTheRecordingCloseToItsOriginalVolume: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Keep the recording close to its original volume`
      }
    },
    iConfirmThatIHavePermissionToUseThisVoiceAndRecording: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `I confirm that I have permission to use this voice and recording to create a custom voice.`
      }
    },
    createVoiceAction: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Create voice`
      }
    },
    chargedAfterTheSubmissionIsAccepted: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Charged after the submission is accepted`
      }
    },
    thisTrainingRun: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `This training run`
      }
    },
    free: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Free`
      }
    },
    noDuplicateVoiceFee: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `No duplicate voice fee`
      }
    },
    checkStatusAgain: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Check status again`
      }
    },
    finalized: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Finalized`
      }
    },
    trainingLocked: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Training locked`
      }
    },
    trainingRunsUsed: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Training runs used`
      }
    },
    runs: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `runs`
      }
    },
    statusUpdatesPaused: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Status updates paused`
      }
    },
    theResultIsCurrentlyUnavailableSelectCheckStatusAgain: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `The result is currently unavailable. Select "Check status again".`
      }
    },
    preparingANewPreview: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Preparing a new preview`
      }
    },
    youCanStayHereThePreviewWillAppearAutomatically: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `You can stay here; the preview will appear automatically.`
      }
    },
    finalizeVoice: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Finalize voice`
      }
    },
    generateWithThisVoice: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Generate with this voice`
      }
    },
    noPreviewAvailableYet: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `No preview available yet`
      }
    },
    voiceId: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Voice ID`
      }
    },
    thePreviewWillAppearHere: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `The preview will appear here`
      }
    },
    enterTheDetailsAndUploadARecordingToCreateYourFirstVoice: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Enter the details and upload a recording to create your first voice.`
      }
    },
    enterTextToSynthesize: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Enter text to synthesize`
      }
    },
    punctuationAndParagraphsAffectPauses: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Punctuation and paragraphs affect pauses`
      }
    },
    text: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Text`
      }
    },
    chooseAVoice: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Choose a voice`
      }
    },
    curatedAndCustomVoicesArePricedSeparately: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Curated and custom voices are priced separately`
      }
    },
    curatedVoices: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Curated voices`
      }
    },
    myVoices: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `My voices`
      }
    },
    voiceSource: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Voice source`
      }
    },
    searchVoices: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Search voices`
      }
    },
    searchByNameUseCaseOrLanguage: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Search voices, voice traits, or supported languages`
      }
    },
    loadingVoices: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Loading voices...`
      }
    },
    signInToChooseAVoice: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Sign in to choose a voice`
      }
    },
    signInToUseCuratedAndCustomVoices: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Sign in to use curated and custom voices.`
      }
    },
    createACustomVoice: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Create a custom voice`
      }
    },
    noMatchingVoices: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `No matching voices`
      }
    },
    tryAnotherNameUseCaseOrLanguage: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Try another name, use case, or language.`
      }
    },
    featured: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Featured`
      }
    },
    femaleVoice: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Female`
      }
    },
    maleVoice: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Male`
      }
    },
    childAge: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Child`
      }
    },
    teenAge: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Teen`
      }
    },
    youngAdultAge: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Young adult`
      }
    },
    middleAgedAge: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Middle-aged`
      }
    },
    seniorAge: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Senior`
      }
    },
    outputSettings: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Output settings`
      }
    },
    unchangedOptionsUseSystemDefaults: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Unchanged options use system defaults`
      }
    },
    spokenLanguage: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Spoken language`
      }
    },
    speechRate: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Speech rate`
      }
    },
    slower: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Slower`
      }
    },
    reset: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Reset`
      }
    },
    faster: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Faster`
      }
    },
    estimatedCost: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Estimated cost`
      }
    },
    chargedByProcessedCharactersAnyExcessIsRefunded: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Charged by processed characters; any excess is refunded`
      }
    },
    theEstimateIsReservedFirstFailedJobsAreRefundedAndSuccessfulJobs: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `The estimate is reserved first. Failed jobs are refunded and successful jobs are settled by actual character count.`
      }
    },
    audioResult: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Audio result`
      }
    },
    youCanLeaveAfterSubmittingProgressResumesWhenYouReturn: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `You can leave after submitting; progress resumes when you return`
      }
    },
    synthesisComplete: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Synthesis complete`
      }
    },
    thisVoiceWasFinalizedAutomaticallyAndCanNoLongerBeTrained: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `This voice was finalized automatically and can no longer be trained.`
      }
    },
    characters: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `characters`
      }
    },
    actualCharge: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Actual charge `
      }
    },
    synthesisFailed: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Synthesis failed`
      }
    },
    theChargeWasRefundedAdjustTheTextOrVoiceAndTryAgain: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `The charge was refunded. Adjust the text or voice and try again.`
      }
    },
    generatedAudioWillAppearHere: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Generated audio will appear here`
      }
    },
    enterTextChooseAVoiceAndStartGenerating: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Enter text, choose a voice, and start generating.`
      }
    },
    close: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Close`
      }
    },
    loadingVoiceLibrary: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Loading voice library...`
      }
    },
    retrainingRunsLeft: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `· retraining runs left`
      }
    },
    reviewSynthesisAndVoiceTrainingResultsInOnePlace: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Review synthesis and voice-training results in one place`
      }
    },
    synthesis: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Synthesis`
      }
    },
    voiceTraining: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Voice training`
      }
    },
    activityType: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Activity type`
      }
    },
    loadingHistory: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Loading history...`
      }
    },
    failedToLoad: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Failed to load`
      }
    },
    noHistoryYet: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `No history yet`
      }
    },
    yourFirstSubmissionWillAppearHere: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Your first submission will appear here.`
      }
    },
    run: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Run`
      }
    },
    trainingAttemptSuffix: {
      t: 0,
      b: {
        static: ``,
        t: 2,
        i: []
      }
    },
    recording: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Recording:`
      }
    },
    viewVoice: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `View voice`
      }
    },
    yourFirstSynthesisWillAppearHere: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Your first synthesis will appear here.`
      }
    },
    thisVoiceWasFinalizedAutomaticallyAfterTheSuccessfulGeneration: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `This voice was finalized automatically after the successful generation.`
      }
    },
    charactersWithSeparator: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `characters ·`
      }
    },
    actual: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `· Actual `
      }
    },
    thisVoiceWillBeLockedAfterGeneration: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `This voice will be locked after generation`
      }
    },
    onlyASuccessfulGenerationWillFinalize: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Only a successful generation will finalize "`
      }
    },
    youCanContinueGeneratingAudioButCannotUploadSamplesOrTrainIt: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `". You can continue generating audio, but cannot upload samples or train it again.`
      }
    },
    notNow: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Not now`
      }
    },
    confirmAndGenerate: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Confirm and generate`
      }
    },
    confirmGenerationWithClonedVoice: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Confirm generation with cloned voice`
      }
    },
    finalizeThisVoice: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Finalize this voice?`
      }
    },
    afterFinalizingYouCannotUploadMoreSamplesOrContinueTrainingThisCannot: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `After finalizing, you cannot upload more samples or continue training. This cannot be undone.`
      }
    },
    doNotFinalizeYet: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Not now`
      }
    },
    recentGenerations: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: ` recent generations`
      }
    },
    yourFirstGenerationWillAppearHere: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Your first generation will appear here.`
      }
    },
    generatedImage: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Generated image`
      }
    },
    viewGeneratedImage: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `View generated image`
      }
    },
    generatedVideoCover: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Generated video cover`
      }
    },
    playGeneratedVideo: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Play generated video`
      }
    },
    resultLinkExpired: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Result link expired`
      }
    },
    downloaded: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Downloaded`
      }
    },
    generated: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Generated`
      }
    },
    cost: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Cost`
      }
    },
    pending: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Pending`
      }
    },
    notCharged: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Not charged`
      }
    },
    tokenUsage: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Token usage`
      }
    },
    previous: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Previous`
      }
    },
    tenPerPage: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: ` · 10 per page`
      }
    },
    next: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Next`
      }
    },
    signInToXiaoheiToolbox: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Sign in to Xiaohei Toolbox`
      }
    },
    useYourXiaoheiDailyAssistantAccountBalanceAndTopUpsSyncAutomatically: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Use your Xiaobai Daily account. Credits and top-ups sync automatically.`
      }
    },
    email: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Email`
      }
    },
    enterYourEmail: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Enter your email`
      }
    },
    password: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Password`
      }
    },
    enterYourPassword: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Enter your password`
      }
    },
    iHaveReadAndAgreeToThe: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `I have read and agree to the`
      }
    },
    and: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `and`
      }
    },
    registrationAndPasswordRecoveryAreAvailableInTheDesktopApp: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Registration and password recovery are available in the desktop app.`
      }
    },
    topUpsAreAddedToTheSharedBalanceForTheAppAnd: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Top-ups are converted to account credits for the app and toolbox.`
      }
    },
    currentBalance: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Current credits`
      }
    },
    credit: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Credit `
      }
    },
    payWithWechat: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Pay with WeChat`
      }
    },
    scanWithWechatYourBalanceUpdatesAutomaticallyAfterPayment: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Scan with WeChat. Your credits update automatically after payment.`
      }
    },
    waitingForPayment: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Waiting for payment...`
      }
    },
    order: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Order:`
      }
    },
    topUpComplete: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Top-up complete`
      }
    },
    hasBeenAddedToYourBalance: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `has been converted to account credits.`
      }
    },
    newBalance: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `New credits`
      }
    },
    done: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Done`
      }
    },
    x: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `X`
      }
    },
    seedance20BilledByActualTokenUsage: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Seedance 2.0 · Billed by actual token usage`
      }
    },
    gptImage2PayPerGeneration: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `GPT Image 2 · Pay per generation`
      }
    },
    seedream50ProPayPerGeneration: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Seedream 5.0 Pro · Pay per generation`
      }
    },
    youCanUploadUpTo10ReferenceImages: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `You can upload up to 10 reference images`
      }
    },
    youCanUploadUpTo5ReferenceImages: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `You can upload up to 5 reference images`
      }
    },
    youCanUpload1ReferenceVideo: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `You can upload 1 reference video`
      }
    },
    youCanUpload1ReferenceAudioFile: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `You can upload 1 reference audio file`
      }
    },
    referenceMediaCannotExceed200mbInTotal: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Reference media cannot exceed 200MB in total`
      }
    },
    audioRequiresAtLeastOneReferenceImageOrVideo: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Audio requires at least one reference image or video`
      }
    },
    videoGenerationFailedYouWillNotBeCharged: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Video generation failed. You will not be charged.`
      }
    },
    pleaseAgreeToTheTermsOfServiceAndPrivacyPolicy: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Please agree to the Terms of Service and Privacy Policy`
      }
    },
    enterYourEmailAndPassword: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Enter your email and password`
      }
    },
    imageGenerationFailedTheChargeWasRefunded: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Image generation failed. The charge was refunded.`
      }
    },
    aPreviewIsBeingPreparedFromYourRecordingThisUsuallyTakesA: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `A preview is being prepared from your recording. This usually takes a few minutes.`
      }
    },
    finalizeTheVoiceWhenSatisfiedOrUploadAnotherRecordingToImproveIt: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Finalize the voice when satisfied, or upload another recording to improve it.`
      }
    },
    tryAgainWithAClearerRecordingFromAQuieterEnvironment: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Try again with a clearer recording from a quieter environment.`
      }
    },
    thisVoiceWasFinalizedAfterASuccessfulGenerationAndCannotBeTrained: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `This voice was finalized after a successful generation and cannot be trained again.`
      }
    },
    thisVoiceIsFinalizedAndRemainsAvailableForPreviewAndDownload: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `This voice is finalized and remains available for preview and download.`
      }
    },
    noUsablePreviewWasGeneratedPleaseContactSupport: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `No usable preview was generated. Please contact support.`
      }
    },
    theLastSubmissionFailedAndWasNotChargedYouCanSubmitAgain: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `The last submission failed and was not charged. You can submit again.`
      }
    },
    uploadARecordingToBegin: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Upload a recording to begin.`
      }
    },
    onlyWavMp3OggM4aAndAacAreSupported: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Only WAV, MP3, OGG, M4A, and AAC are supported`
      }
    },
    theRecordingCannotExceed10mb: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `The recording cannot exceed 10MB`
      }
    },
    enterAVoiceNameWithAtLeast2Characters: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Enter a voice name with at least 2 characters`
      }
    },
    chooseARecordingToClone: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Choose a recording to clone`
      }
    },
    previewTextMustContainAtLeast4Characters: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Preview text must contain at least 4 characters`
      }
    },
    confirmThatYouHavePermissionToUseThisVoice: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Confirm that you have permission to use this voice`
      }
    },
    synthesisFailedAndTheChargeWasRefundedPleaseTryAgain: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Synthesis failed and the charge was refunded. Please try again.`
      }
    },
    couldNotCheckSynthesisStatusRetryingAutomatically: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Could not check synthesis status. Retrying automatically.`
      }
    },
    chooseAVoiceFirst: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Choose a voice first`
      }
    },
    switchToLightMode: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Switch to light mode`
      }
    },
    switchToDarkMode: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Switch to dark mode`
      }
    },
    onePlaceForEverySmallTask: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `One place for every small task`
      }
    },
    fileProcessingKnowledgeOrganizationContentGenerationAndMoreUsefulToolsAreOnTheWay: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `File handling, knowledge organization, content generation, and more useful tools are on the way.`
      }
    },
    imageVideoAndVoiceToolsAreAvailableWithPayAsYouGo: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Image, video, and voice tools are available with pay-as-you-go credits.`
      }
    },
    useImageVideoVoiceAndProductivityToolsFromOnePlace: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Use image, video, voice, and productivity tools from one place.`
      }
    },
    testing: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Testing`
      }
    },
    comingSoon: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Coming soon`
      }
    },
    copyright2026XiaoheiDailyAssistant: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `© 2026 Xiaobai Daily`
      }
    },
    uploading: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Uploading...`
      }
    },
    uploadingReferenceImages: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Uploading reference images...`
      }
    },
    generateNow: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Generate now`
      }
    },
    signInToGenerate: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Sign in to generate`
      }
    },
    keepThisPageOpenWhileTheImageIsGeneratedTheResultWill: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Keep this page open while the image is generated. The result will appear on the right.`
      }
    },
    theSelectedOptionIsChargedOnTheServerFailedGenerationsAreRefunded: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `The selected option is charged on the server. Failed generations are refunded.`
      }
    },
    generatingThisMayTakeAMoment: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Generating. This may take a moment...`
      }
    },
    standardModeMayTakeTensOfSecondsKeepThisPageOpen: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Standard mode may take tens of seconds. Keep this page open.`
      }
    },
    preparingDownload: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Preparing download...`
      }
    },
    downloadOriginal: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Download original`
      }
    },
    imageMediaType: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Image`
      }
    },
    video: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Video`
      }
    },
    audio: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Audio`
      }
    },
    uploadingMedia: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Uploading media...`
      }
    },
    referenceAudioAddedAudioGenerationMustStayEnabled: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Reference audio added; audio generation must stay enabled`
      }
    },
    generateAmbienceDialogueOrMusicWithTheVideo: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Generate ambience, dialogue, or music with the video`
      }
    },
    mediaUploadInProgress: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Uploading media...`
      }
    },
    generateVideo: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Generate video`
      }
    },
    videoGenerationUsuallyTakesSeveralMinutesKeepThisPageOpen: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Video generation usually takes several minutes. Keep this page open.`
      }
    },
    failedOrCancelledJobsAreNotChargedSuccessfulJobsAreBilledBy: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Failed or cancelled jobs are not charged. Successful jobs are billed by actual token usage.`
      }
    },
    downloadVideo: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Download video`
      }
    },
    turnTextIntoNaturalSpeech: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Turn text into natural speech`
      }
    },
    createYourOwnCustomVoice: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Create your own custom voice`
      }
    },
    generateSpeechWithCuratedOrCustomVoicesThenPreviewAndDownloadIt: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Generate speech with curated or custom voices, then preview and download it.`
      }
    },
    uploadAClearVoiceRecordingToCreateAPreviewAndUseIt: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Upload a clear voice recording to create a preview and use it for speech generation.`
      }
    },
    createANewVoice: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Create a new voice`
      }
    },
    chooseANewLanguageAndRecordingForEachTrainingRun: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Choose a new language and recording for each training run`
      }
    },
    theNameIsOnlyUsedToOrganizeYourVoices: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `The name is only used to organize your voices`
      }
    },
    clickOrDropARecordingHere: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Click or drop a recording here`
      }
    },
    wavMp3OggM4aOrAacMaximum10mb: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `WAV, MP3, OGG, M4A, or AAC; maximum 10MB`
      }
    },
    submitting: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Submitting...`
      }
    },
    preparingPreview: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Preparing preview...`
      }
    },
    submitTraining: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Submit training`
      }
    },
    createAndTrain: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Create and train`
      }
    },
    signInToCreate: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Sign in to create`
      }
    },
    localValidationErrorsAndFailedSubmissionsAreNotCharged: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Local validation errors and failed submissions are not charged.`
      }
    },
    thisRunUsesTheSelectedLanguageAndRecordingThePreviewUpdatesWhen: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `This run uses the selected language and recording. The preview updates when complete.`
      }
    },
    finalVoice: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Final voice`
      }
    },
    voicePreview: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Voice preview`
      }
    },
    finalizedAndAlwaysAvailableForPreviewAndDownload: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Finalized and always available for preview and download`
      }
    },
    availableForPreviewAndDownloadAfterCompletion: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Available for preview and download after completion`
      }
    },
    updatesPaused: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Updates paused`
      }
    },
    theTrainingResultIsUnavailableCheckTheStatusAgain: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `The training result is unavailable. Check the status again.`
      }
    },
    latestPreview: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Latest preview`
      }
    },
    previewOfTheFinalizedVoice: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Preview of the finalized voice`
      }
    },
    previewOfTheLatestTrainingRun: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Preview of the latest training run`
      }
    },
    downloadPreview: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Download preview`
      }
    },
    thePreviewRemainsAvailableForPlaybackAndDownload: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `The preview remains available for playback and download.`
      }
    },
    thePreviewIsSavedAndUpdatesAfterASuccessfulTrainingRun: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `The preview is saved and updates after a successful training run.`
      }
    },
    tryAgainWithAClearerRecording: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Try again with a clearer recording.`
      }
    },
    yourPreviewWillAppearHereAfterTheFirstTrainingRun: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Your preview will appear here after the first training run.`
      }
    },
    noCustomVoicesAvailable: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `No custom voices available`
      }
    },
    noVoicesAvailable: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `No voices available`
      }
    },
    afterCreatingAVoiceGenerateSpeechWithoutLeavingThisTool: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `After creating a voice, generate speech without leaving this tool.`
      }
    },
    theVoiceIsStillBeingPreparedCheckBackLater: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `The voice is still being prepared. Check back later.`
      }
    },
    myCustomVoices: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `My custom voices`
      }
    },
    naturalClearCuratedVoices: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Natural, clear curated voices`
      }
    },
    hidePreview: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Hide preview`
      }
    },
    preview: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Preview`
      }
    },
    synthesizing: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Synthesizing...`
      }
    },
    downloadAudio: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Download audio`
      }
    },
    audioGeneratedAndSavedForFutureAccess: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Audio generated and saved for future access.`
      }
    },
    longerTextTakesMoreTimeYouCanLeaveAndCheckTheHistory: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Longer text takes more time. You can leave and check the history later.`
      }
    },
    chooseAnExistingVoiceToTrain: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Choose an existing voice to train`
      }
    },
    chooseAnExistingVoice: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Choose an existing voice`
      }
    },
    chooseAVoiceForThisTrainingRun: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Choose a voice for this training run`
      }
    },
    viewAndManageYourVoices: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `View and manage your voices`
      }
    },
    noTrainableVoices: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `No trainable voices`
      }
    },
    noVoicesAvailableYet: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `No voices available yet`
      }
    },
    createAndTrainAVoiceBeforeSelectingItHere: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Create and train a voice before selecting it here.`
      }
    },
    aVoiceAppearsHereAfterItsFirstSuccessfulTrainingRun: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `A voice appears here after its first successful training run.`
      }
    },
    createYourFirstVoice: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Create your first voice`
      }
    },
    selectForTraining: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Select for training`
      }
    },
    trainVoice: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Train voice`
      }
    },
    loading: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Loading...`
      }
    },
    loadMore: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Load more`
      }
    },
    preparing: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Preparing...`
      }
    },
    download: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Download`
      }
    },
    finalizing: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Finalizing...`
      }
    },
    confirmFinalization: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Confirm finalization`
      }
    },
    downloadResult: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Download result`
      }
    },
    signingIn: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Signing in...`
      }
    },
    creatingOrder: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Creating order...`
      }
    },
    retryingAutomatically: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Retrying automatically`
      }
    },
    theSystemWillRetryAutomatically: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `The system will retry automatically`
      }
    },
    speechTtsprice10kCharactersAndUpNewVoiceVoiceprice: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3,
          v: `Speech `
        }, {
          t: 4,
          k: `ttsPrice`
        }, {
          t: 3,
          v: ` credits / 10k characters and up · New voice `
        }, {
          t: 4,
          k: `voicePrice`
        }, {
          t: 3,
          v: ` credits`
        }]
      }
    },
    withVideoWithvideoMillionTokensWithoutVideoWithoutvideoMillionTokens: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3,
          v: `With video `
        }, {
          t: 4,
          k: `withVideo`
        }, {
          t: 3,
          v: ` credits/million tokens · Without video `
        }, {
          t: 4,
          k: `withoutVideo`
        }, {
          t: 3,
          v: ` credits/million tokens`
        }]
      }
    },
    creditsUnit: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `credits`
      }
    },
    youCanAddCountMoreReferenceImages: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3,
          v: `You can add `
        }, {
          t: 4,
          k: `count`
        }, {
          t: 3,
          v: ` more reference images`
        }]
      }
    },
    nameIsNotASupportedImageFormat: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 4,
          k: `name`
        }, {
          t: 3,
          v: ` is not a supported image format`
        }]
      }
    },
    nameExceedsTheLimitMbLimit: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 4,
          k: `name`
        }, {
          t: 3,
          v: ` exceeds the `
        }, {
          t: 4,
          k: `limit`
        }, {
          t: 3,
          v: `MB limit`
        }]
      }
    },
    nameIsNotASupportedImageVideoOrAudioFormat: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 4,
          k: `name`
        }, {
          t: 3,
          v: ` is not a supported image, video, or audio format`
        }]
      }
    },
    nameHasAlreadyBeenAdded: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 4,
          k: `name`
        }, {
          t: 3,
          v: ` has already been added`
        }]
      }
    },
    nameMustBeBetween2And15SecondsLong: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 4,
          k: `name`
        }, {
          t: 3,
          v: ` must be between 2 and 15 seconds long`
        }]
      }
    },
    fasterValue: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3,
          v: `Faster `
        }, {
          t: 4,
          k: `value`
        }, {
          t: 3,
          v: `%`
        }]
      }
    },
    slowerValue: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3,
          v: `Slower `
        }, {
          t: 4,
          k: `value`
        }, {
          t: 3,
          v: `%`
        }]
      }
    },
    languageAndCountLanguages: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 4,
          k: `language`
        }, {
          t: 3,
          v: ` and `
        }, {
          t: 4,
          k: `count`
        }, {
          t: 3,
          v: ` languages`
        }]
      }
    },
    enterBetween1AndCountCharacters: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3,
          v: `Enter between 1 and `
        }, {
          t: 4,
          k: `count`
        }, {
          t: 3,
          v: ` characters`
        }]
      }
    },
    countTrainableVoices: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 4,
          k: `count`
        }, {
          t: 3,
          v: ` trainable voices`
        }]
      }
    },
    countVoices: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 4,
          k: `count`
        }, {
          t: 3,
          v: ` voices`
        }]
      }
    },
    payAmountWithWechat: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3,
          v: `Pay ¥`
        }, {
          t: 4,
          k: `amount`
        }, {
          t: 3,
          v: ` with WeChat`
        }]
      }
    },
    chinese: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Chinese`
      }
    },
    english: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `English`
      }
    },
    japanese: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Japanese`
      }
    },
    korean: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Korean`
      }
    },
    spanish: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Spanish`
      }
    },
    french: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `French`
      }
    },
    german: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `German`
      }
    },
    russian: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Russian`
      }
    },
    portuguese: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Portuguese`
      }
    },
    indonesian: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Indonesian`
      }
    },
    outputResolution: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Resolution`
      }
    },
    outputDuration: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Duration`
      }
    },
    referenceMedia: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Reference media`
      }
    },
    referenceImages: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Reference images`
      }
    },
    aiWatermark: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `AI watermark`
      }
    },
    added: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Added`
      }
    },
    notAdded: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Not added`
      }
    },
    standard: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Standard`
      }
    },
    fast: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Fast`
      }
    },
    on: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `On`
      }
    },
    off: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Off`
      }
    },
    images: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `images`
      }
    },
    pleaseSignIn: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Please sign in`
      }
    },
    yourSessionExpiredPleaseSignInAgain: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Your session expired. Please sign in again.`
      }
    },
    toolboxAuthorizationFailedPleaseTryAgain: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Toolbox authorization failed. Please try again.`
      }
    },
    toolboxRequestFailedPleaseTryAgain: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Toolbox request failed. Please try again.`
      }
    },
    downloadFailedPleaseTryAgain: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Download failed. Please try again.`
      }
    },
    mediaUploadFailedPleaseTryAgain: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Media upload failed. Please try again.`
      }
    },
    invalidMediaUploadAddress: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Invalid media upload address`
      }
    },
    invalidToolboxApiAddress: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Invalid toolbox API address`
      }
    },
    invalidToolboxDownloadAddress: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Invalid toolbox download address`
      }
    },
    playbackProgress: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Playback progress`
      }
    },
    pause: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Pause`
      }
    },
    play: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Play`
      }
    },
    audioUnavailable: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Audio unavailable`
      }
    },
    mute: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Mute`
      }
    },
    unmute: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Unmute`
      }
    },
    mayEveryThoughtfulExpressionBeHeardWithCare: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `May every thoughtful expression be heard with care.`
      }
    },
    autoDetect: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Auto detect`
      }
    },
    auto: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Auto`
      }
    },
    adaptive: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Adaptive`
      }
    },
    standardQualityFirst: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Standard · Quality first`
      }
    },
    fastSpeedFirst: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Fast · Speed first`
      }
    },
    aspectRatio1To1Square: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `1:1 · Square`
      }
    },
    aspectRatio3To2Landscape: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `3:2 · Landscape`
      }
    },
    frameAspectRatioTo3Portrait: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `2:3 · Portrait`
      }
    },
    aspectRatio4To3Landscape: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `4:3 · Landscape`
      }
    },
    aspectRatio3To4Portrait: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `3:4 · Portrait`
      }
    },
    aspectRatio16To9Widescreen: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `16:9 · Widescreen`
      }
    },
    aspectRatio16To9Landscape: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `16:9 · Landscape`
      }
    },
    aspectRatio9To16Portrait: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `9:16 · Portrait`
      }
    },
    includesVideoInput: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Includes video input`
      }
    },
    noVideoInput: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `No video input`
      }
    },
    resolution4kUltraHd: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `4K · Ultra HD`
      }
    },
    resolution1080pFullHd: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `1080p · Full HD`
      }
    },
    resolution720pHd: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `720p · HD`
      }
    },
    unknownTime: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Unknown time`
      }
    },
    completedStatus: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Complete`
      }
    },
    generationFailed: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Generation failed`
      }
    },
    cancelled: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Cancelled`
      }
    },
    generating: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Generating`
      }
    },
    submittingStatus: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Submitting`
      }
    },
    generatingPreview: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Generating preview`
      }
    },
    canBeImproved: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Can be improved`
      }
    },
    unsuccessful: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Unsuccessful`
      }
    },
    formalizedStatus: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Finalized`
      }
    },
    noTrainingRunsLeft: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `No training runs left`
      }
    },
    notStarted: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Not started`
      }
    },
    failed: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Failed`
      }
    },
    rejected: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Rejected`
      }
    },
    processing: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Processing`
      }
    },
    normal: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Normal`
      }
    },
    pleaseSignInToUseTheToolbox: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Please sign in to use the toolbox`
      }
    },
    yourSessionExpiredPleaseReopenTheToolbox: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Your session expired. Please reopen the toolbox.`
      }
    },
    signInBeforeUploadingReferenceImages: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Sign in before uploading reference images`
      }
    },
    enterAnImagePrompt: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Enter an image prompt`
      }
    },
    enterAVideoPrompt: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Enter a video prompt`
      }
    },
    referenceImagesAreStillUploading: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Reference images are still uploading`
      }
    },
    referenceMediaIsStillUploading: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Reference media is still uploading`
      }
    },
    aReferenceImageFailedToUploadRemoveItAndTryAgain: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `A reference image failed to upload. Remove it and try again.`
      }
    },
    referenceMediaFailedToUploadRemoveItAndTryAgain: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Reference media failed to upload. Remove it and try again.`
      }
    },
    insufficientBalancePleaseTopUpFirst: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Insufficient credits. Please top up first.`
      }
    },
    uploadTimedOutRemoveTheFileAndTryAgain: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Upload timed out. Remove the file and try again.`
      }
    },
    uploadFailed: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Upload failed`
      }
    },
    mediaValidationFailedAddTheFileAgain: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Media validation failed. Add the file again.`
      }
    },
    thisClientCannotValidateTheMediaPleaseUpdateAndTryAgain: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `This client cannot validate the media. Please update and try again.`
      }
    },
    imageDownloadFailedPleaseTryAgain: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Image download failed. Please try again.`
      }
    },
    videoDownloadFailedPleaseTryAgain: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Video download failed. Please try again.`
      }
    },
    couldNotPrepareTheDownloadPleaseTryAgain: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Could not prepare the download. Please try again.`
      }
    },
    statusCheckFailedRetryingAutomatically: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Status check failed. Retrying automatically.`
      }
    },
    failedToLoadTheToolbox: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Failed to load the toolbox`
      }
    },
    signInFailed: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Sign-in failed`
      }
    },
    imageGenerationFailed: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Image generation failed`
      }
    },
    videoGenerationFailed: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Video generation failed`
      }
    },
    submissionFailedPleaseTryAgain: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Submission failed. Please try again.`
      }
    },
    failedToLoadGenerationHistory: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Failed to load generation history`
      }
    },
    failedToLoadVoices: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Failed to load voices`
      }
    },
    failedToLoadVoicesPleaseTryAgain: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Failed to load voices. Please try again.`
      }
    },
    voiceStatusCheckFailedTryAgain: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Voice status check failed. Try again.`
      }
    },
    couldNotFinalizeTheVoicePleaseTryAgain: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Could not finalize the voice. Please try again.`
      }
    },
    synthesisFailedShort: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Synthesis failed`
      }
    },
    savingAudio: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Saving audio`
      }
    },
    synthesizingStatus: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Synthesizing`
      }
    },
    failedToLoadTopUpOptions: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Failed to load top-up options`
      }
    },
    couldNotCreateTheTopUpOrder: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Could not create the top-up order`
      }
    },
    markdownReader: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Markdown Reader`
      }
    },
    productivityCategory: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Productivity`
      }
    },
    markdownReaderDescription: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Read, edit, and save local Markdown documents with common Markdown and GFM support.`
      }
    },
    markdownReaderInputHint: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Choose a local .md or .markdown file to start reading and editing.`
      }
    },
    documentsCategory: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Documents`
      }
    },
    localTool: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Local tool`
      }
    },
    freeTool: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Free`
      }
    },
    untitledMarkdownDocument: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Untitled`
      }
    },
    markdownUnsaved: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Unsaved`
      }
    },
    markdownSaved: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Saved`
      }
    },
    markdownNewDocumentHint: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `You'll choose a location the first time you save`
      }
    },
    openDocument: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Open`
      }
    },
    saveDocument: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Save`
      }
    },
    saveDocumentAs: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Save as…`
      }
    },
    searchRecentDocuments: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Search recent files`
      }
    },
    markdownRecentFiles: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Recent`
      }
    },
    markdownFileMissing: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `File was moved or deleted`
      }
    },
    removeFromRecent: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Remove from list`
      }
    },
    noRecentMarkdownDocuments: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `No Markdown documents opened yet`
      }
    },
    markdownNoSearchResults: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `No matching files`
      }
    },
    markdownClearSearch: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Clear search`
      }
    },
    markdownLocalPrivacyNote: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Processed locally, never uploaded`
      }
    },
    markdownShowPanel: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Show sidebar`
      }
    },
    markdownHidePanel: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Hide sidebar`
      }
    },
    readMode: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Read`
      }
    },
    editMode: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Edit`
      }
    },
    splitMode: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Split`
      }
    },
    markdownViewMode: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `View mode`
      }
    },
    documentOutline: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Outline`
      }
    },
    markdownOutlineEmpty: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `This document has no headings yet`
      }
    },
    markdownUntitledHeading: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `(Untitled)`
      }
    },
    reloadDocument: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Reload`
      }
    },
    showInFolder: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Show in folder`
      }
    },
    moreActions: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `More actions`
      }
    },
    loadingMarkdownDocument: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Opening document…`
      }
    },
    markdownEmptyTitle: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Open a Markdown document`
      }
    },
    markdownReaderWelcome: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Read and edit local .md files with outline, tables, code blocks, task lists, and local images.`
      }
    },
    markdownEmptyHint: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3,
          v: `Or drop a file here · `
        }, {
          t: 4,
          k: `open`
        }, {
          t: 3,
          v: ` to open · `
        }, {
          t: 4,
          k: `create`
        }, {
          t: 3,
          v: ` for new`
        }]
      }
    },
    markdownOpenFile: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Open file…`
      }
    },
    markdownOpenMenu: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `New or open`
      }
    },
    createMarkdownDocument: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `New document`
      }
    },
    markdownOpenDialogTitle: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Open Markdown document`
      }
    },
    markdownSaveAsDialogTitle: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Save as`
      }
    },
    markdownFileFilterName: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Markdown and text files`
      }
    },
    markdownEditorPlaceholder: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Start with a heading, e.g. # Weekly review`
      }
    },
    markdownEditorLabel: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Markdown editor`
      }
    },
    markdownPreviewEmpty: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Type in the editor and the preview appears here`
      }
    },
    markdownFormattingTools: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Formatting tools`
      }
    },
    markdownShowLineNumbers: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Show line numbers`
      }
    },
    markdownSyncScroll: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Sync scrolling in split view`
      }
    },
    markdownSoftBreaks: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Show single line breaks`
      }
    },
    markdownResizeSplitPanes: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Resize editor and preview panes`
      }
    },
    markdownResizeSplitPanesHint: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Drag to resize; double-click to split evenly`
      }
    },
    markdownHeading1: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Heading 1`
      }
    },
    markdownHeading2: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Heading 2`
      }
    },
    markdownHeading3: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Heading 3`
      }
    },
    markdownBold: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Bold`
      }
    },
    markdownItalic: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Italic`
      }
    },
    markdownStrike: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Strikethrough`
      }
    },
    markdownUnorderedList: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Bulleted list`
      }
    },
    markdownOrderedList: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Numbered list`
      }
    },
    markdownTaskList: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Task list`
      }
    },
    markdownQuote: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Quote`
      }
    },
    markdownCode: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Code`
      }
    },
    markdownLink: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Link`
      }
    },
    markdownLineCount: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 4,
          k: `count`
        }, {
          t: 3,
          v: ` lines`
        }]
      }
    },
    markdownCharacterCount: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 4,
          k: `count`
        }, {
          t: 3,
          v: ` characters`
        }]
      }
    },
    markdownFind: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Find`
      }
    },
    markdownFindPlaceholder: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Find in document`
      }
    },
    markdownFindPrevious: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Previous match`
      }
    },
    markdownFindNext: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Next match`
      }
    },
    markdownFindClose: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Close find`
      }
    },
    markdownCopyMarkdown: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Copy all (Markdown)`
      }
    },
    markdownCopyRichText: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Copy as rich text`
      }
    },
    markdownCopiedMarkdown: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Copied the whole document`
      }
    },
    markdownCopiedRichText: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Copied. Paste it into any rich text editor`
      }
    },
    markdownCopyFailed: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Copy failed. Please try again`
      }
    },
    markdownExportPdf: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Export as PDF…`
      }
    },
    markdownExportHtml: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Export as HTML…`
      }
    },
    markdownExportPdfTitle: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Export as PDF`
      }
    },
    markdownExportHtmlTitle: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Export as HTML`
      }
    },
    markdownExporting: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Exporting…`
      }
    },
    markdownExported: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3,
          v: `Exported “`
        }, {
          t: 4,
          k: `name`
        }, {
          t: 3,
          v: `”`
        }]
      }
    },
    markdownExportFailed: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Export failed. Please try again`
      }
    },
    markdownSavedAs: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3,
          v: `Saved as “`
        }, {
          t: 4,
          k: `name`
        }, {
          t: 3,
          v: `”`
        }]
      }
    },
    markdownCloseDocument: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Close document`
      }
    },
    markdownBackToDocument: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3,
          v: `Back to “`
        }, {
          t: 4,
          k: `name`
        }, {
          t: 3,
          v: `”`
        }]
      }
    },
    markdownDropToOpen: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Drop to open the document`
      }
    },
    markdownDropUnsupported: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Only Markdown or plain text files can be opened`
      }
    },
    markdownExternalModified: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3,
          v: `“`
        }, {
          t: 4,
          k: `name`
        }, {
          t: 3,
          v: `” was changed by another app.`
        }]
      }
    },
    markdownExternalDeleted: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3,
          v: `“`
        }, {
          t: 4,
          k: `name`
        }, {
          t: 3,
          v: `” was moved or deleted. Save a copy to keep the current content.`
        }]
      }
    },
    markdownExternalReloaded: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `The document changed on disk and was refreshed`
      }
    },
    markdownLoadExternalVersion: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Load their version`
      }
    },
    markdownKeepMyChanges: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Keep my changes`
      }
    },
    markdownDismiss: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Dismiss`
      }
    },
    markdownSaveBeforeLink: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Save the document first to open its local links`
      }
    },
    markdownLinkRevealed: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Showed the linked file in its folder`
      }
    },
    markdownImagePreview: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Image preview`
      }
    },
    markdownCloseImagePreview: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Close image preview`
      }
    },
    markdownUnsavedChangesConfirm: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Your changes will be lost if you don't save them.`
      }
    },
    markdownFileChangedConfirm: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Saving will overwrite the changes made by another app. You can also discard your changes and load their version.`
      }
    },
    markdownDiscardChangesTitle: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3,
          v: `Save changes to “`
        }, {
          t: 4,
          k: `name`
        }, {
          t: 3,
          v: `”?`
        }]
      }
    },
    markdownSaveChangesAction: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Save`
      }
    },
    markdownDiscardChangesAction: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Don't save`
      }
    },
    markdownOverwriteChangesTitle: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `The file was changed by another app`
      }
    },
    markdownOverwriteChangesAction: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Overwrite`
      }
    },
    markdownConfirmCancel: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Cancel`
      }
    },
    markdownOpenFailed: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Failed to open the document`
      }
    },
    markdownSaveFailed: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Failed to save the document`
      }
    },
    markdownReloadFailed: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Failed to reload the document`
      }
    },
    markdownRecentRemoveFailed: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Failed to remove it from the list`
      }
    },
    markdownRevealFailed: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Could not show the document location`
      }
    },
    markdownLinkedOpenFailed: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Failed to open the linked file`
      }
    },
    markdownErrorAccessDenied: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Access expired. Please open the file again`
      }
    },
    markdownErrorFileNotFound: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `The file doesn't exist or was moved`
      }
    },
    markdownErrorFileTooLarge: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Files larger than 10 MB aren't supported`
      }
    },
    markdownErrorUnsupportedFile: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Only Markdown and plain text files are supported`
      }
    },
    markdownErrorInvalidLink: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `The link address is invalid`
      }
    },
    markdownErrorLinkedFileMissing: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `The linked file doesn't exist`
      }
    },
    markdownErrorLinkedFileOpenFailed: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `The system couldn't open the linked file`
      }
    },
    markdownErrorExportTooLarge: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `The document is too large to export`
      }
    },
    copyCode: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Copy code`
      }
    },
    copiedCode: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Copied`
      }
    },
    markdownRenderFailed: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Failed to render the document`
      }
    },
    markdownCodeCopyFailed: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Failed to copy code`
      }
    },
    markdownImageLoadFailed: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3,
          v: `Image could not be loaded: `
        }, {
          t: 4,
          k: `source`
        }]
      }
    },
    localUse: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Local use`
      }
    },
    pdfCompressToolName: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `PDF Compressor`
      }
    },
    pdfCompressToolDescription: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Compress PDFs locally with lossless, smart, extreme, and custom modes.`
      }
    },
    imageCompressToolName: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Image Compressor`
      }
    },
    imageCompressToolDescription: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Batch compress JPG, PNG, WebP, BMP, and AVIF with flexible quality, size, and format settings.`
      }
    },
    pdfCompressKicker: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `PDF COMPRESSOR`
      }
    },
    pdfCompressTitle: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Make your PDF files lighter`
      }
    },
    pdfCompressDescription: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Add one or more PDFs, choose a compression mode, and start processing.`
      }
    },
    pdfCompressLocalOnly: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Files are processed on this device and never uploaded`
      }
    },
    pdfCompressSelectTitle: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Upload PDF files`
      }
    },
    pdfCompressSelectDescription: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Drag and drop up to 10 files, with a 220 MB combined limit`
      }
    },
    pdfCompressClearAndReselect: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Clear and choose again`
      }
    },
    pdfCompressSelecting: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Reading files…`
      }
    },
    pdfCompressChooseFiles: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Choose or drag PDF files here`
      }
    },
    pdfCompressChooseFilesHint: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Choose or drag PDF files`
      }
    },
    pdfCompressPdfOnly: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `PDF files only`
      }
    },
    pdfCompressPageCount: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 4,
          k: `count`
        }, {
          t: 3,
          v: ` pages`
        }]
      }
    },
    pdfCompressSourceVector: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Vector`
      }
    },
    pdfCompressSourceImage: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Scanned`
      }
    },
    pdfCompressSourceMixed: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Mixed`
      }
    },
    pdfCompressRemoveFile: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Remove file`
      }
    },
    pdfCompressReselectFiles: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Choose different files`
      }
    },
    pdfCompressSettingsTitle: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Choose a compression mode`
      }
    },
    pdfCompressSettingsDescription: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Choose a mode first. An estimate will appear automatically after PDFs are added.`
      }
    },
    pdfCompressCompressionMode: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Compression mode`
      }
    },
    pdfCompressModeLight: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Light compression`
      }
    },
    pdfCompressModeLightDescription: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Lossless cleanup that preserves text structure`
      }
    },
    pdfCompressModeRecommended: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Smart compression (System recommended)`
      }
    },
    pdfCompressModeRecommendedDescription: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Automatically detects and matches settings`
      }
    },
    pdfCompressModeExtreme: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Extreme compression`
      }
    },
    pdfCompressModeExtremeDescription: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `60 DPI · Grayscale · Smallest size`
      }
    },
    pdfCompressModeCustom: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Custom compression`
      }
    },
    pdfCompressModeCustomDescription: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Set page resolution and image quality yourself`
      }
    },
    pdfCompressPageResolution: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Page resolution`
      }
    },
    pdfCompressResolutionPlaceholder: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Choose page resolution`
      }
    },
    pdfCompressResolutionOriginal: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Keep original resolution`
      }
    },
    pdfCompressImageQuality: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Image quality`
      }
    },
    pdfCompressQualityPlaceholder: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Choose image quality`
      }
    },
    pdfCompressQualityHighest: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Highest quality`
      }
    },
    pdfCompressPageRange: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Page range`
      }
    },
    pdfCompressOptional: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `(Optional)`
      }
    },
    pdfCompressPageRangePlaceholder: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `For example 1-5, 8, 12-16; leave empty for all pages`
      }
    },
    pdfCompressPreserveMetadata: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Keep document information`
      }
    },
    pdfCompressPreserveMetadataDescription: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Keep metadata such as title, author, and subject`
      }
    },
    pdfCompressIncludeAnnotations: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Keep annotations and forms`
      }
    },
    pdfCompressIncludeAnnotationsDescription: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Preserve comments and interactive content`
      }
    },
    pdfCompressStartTitle: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Start processing`
      }
    },
    pdfCompressStartDescription: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Save files individually or together when compression finishes.`
      }
    },
    pdfCompressProcessing: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Compressing PDFs`
      }
    },
    pdfCompressProcessingHint: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Large or scanned PDFs can take a while. Keep the app open during processing.`
      }
    },
    pdfCompressAnalysisLoadingTitle: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Analyzing PDFs`
      }
    },
    pdfCompressAnalysisLoadingDescription: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Inspecting file content and page structure…`
      }
    },
    pdfCompressAnalysisComplete: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Smart analysis complete`
      }
    },
    pdfCompressRecommendedBadge: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Recommended`
      }
    },
    pdfCompressEstimateSavingLabel: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Estimated saving`
      }
    },
    pdfCompressEstimateDisclaimer: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Estimated size is based on the selected mode, file structure, and page content. The final result may differ.`
      }
    },
    pdfCompressAnalysisFailed: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Smart analysis is temporarily unavailable`
      }
    },
    pdfCompressAnalysisRetryDescription: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Try again or start compression directly`
      }
    },
    pdfCompressRetry: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Analyze again`
      }
    },
    pdfCompressCurrentTask: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Current task`
      }
    },
    pdfCompressPrechargePrice: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Precharge`
      }
    },
    pdfCompressPricingLoading: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Loading online pricing…`
      }
    },
    pdfCompressPricingUnavailable: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Pricing is temporarily unavailable`
      }
    },
    pdfCompressUnitPrice: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 4,
          k: `credits`
        }, {
          t: 3,
          v: ` credits per PDF`
        }]
      }
    },
    pdfCompressPrechargeSummary: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 4,
          k: `credits`
        }, {
          t: 3,
          v: ` credits · `
        }, {
          t: 4,
          k: `count`
        }, {
          t: 3,
          v: ` PDFs`
        }]
      }
    },
    pdfCompressSignInRequired: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Sign in before compressing PDFs.`
      }
    },
    pdfCompressInsufficientBalance: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Not enough credits. Top up to continue.`
      }
    },
    pdfCompressPriceUnit: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `per PDF`
      }
    },
    pdfCompressStartAction: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Compress PDFs`
      }
    },
    pdfCompressCompressing: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Compressing…`
      }
    },
    pdfCompressResultsTitle: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Compression results`
      }
    },
    pdfCompressResultsDescription: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Review the results and choose where to save the files`
      }
    },
    pdfCompressResultsPlaceholder: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Results will appear here`
      }
    },
    pdfCompressResultsPlaceholderDescription: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Upload PDFs, choose a mode, then start compression.`
      }
    },
    pdfCompressProcessingReading: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Reading file structure`
      }
    },
    pdfCompressResultComplete: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `PDF files compressed`
      }
    },
    pdfCompressSingleResultComplete: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `PDF compression complete`
      }
    },
    pdfCompressMultipleResultComplete: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 4,
          k: `count`
        }, {
          t: 3,
          v: ` PDFs compressed`
        }]
      }
    },
    pdfCompressResultReady: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Files are ready to save`
      }
    },
    pdfCompressRetentionDescription: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Results stay on this page only and cannot be recovered after leaving. Save them promptly.`
      }
    },
    pdfCompressUnsavedResultsTitle: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Some compressed files are not saved`
      }
    },
    pdfCompressUnsavedResultsDescription: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 4,
          k: `count`
        }, {
          t: 3,
          v: ` compressed files have not been saved. They will be deleted and cannot be recovered if you leave.`
        }]
      }
    },
    pdfCompressDiscardAndLeave: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Discard and leave`
      }
    },
    pdfCompressContinueSaving: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Continue saving`
      }
    },
    pdfCompressSavedLabel: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Saved`
      }
    },
    pdfCompressOverallSaved: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Overall saving`
      }
    },
    pdfCompressReducedBy: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3,
          v: `Reduced by `
        }, {
          t: 4,
          k: `size`
        }]
      }
    },
    pdfCompressBatchResultSummary: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 4,
          k: `count`
        }, {
          t: 3,
          v: ` compressed files`
        }]
      }
    },
    pdfCompressSaveAllToFolder: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Save all to one folder`
      }
    },
    pdfCompressOptimized: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `PDF optimization complete`
      }
    },
    pdfCompressSaveLocation: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Save file`
      }
    },
    pdfCompressOperationFailed: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Operation failed`
      }
    },
    pdfCompressNotice: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Notice`
      }
    },
    pdfCompressInvalidFile: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3,
          v: `“`
        }, {
          t: 4,
          k: `name`
        }, {
          t: 3,
          v: `” is not a PDF file`
        }]
      }
    },
    pdfCompressFileLimit: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3,
          v: `Up to `
        }, {
          t: 4,
          k: `count`
        }, {
          t: 3,
          v: ` PDFs can be processed at once`
        }]
      }
    },
    pdfCompressTotalSizeLimit: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `The combined file size cannot exceed 220 MB`
      }
    },
    pdfCompressDuplicateSingle: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3,
          v: `Duplicate file ignored: `
        }, {
          t: 4,
          k: `name`
        }]
      }
    },
    pdfCompressDuplicateMultiple: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 4,
          k: `count`
        }, {
          t: 3,
          v: ` duplicate PDF files were ignored`
        }]
      }
    },
    pdfCompressDuplicateTitle: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Duplicate PDFs found`
      }
    },
    pdfCompressRecognizedFiles: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 4,
          k: `count`
        }, {
          t: 3,
          v: ` PDFs recognized. Choose a compression mode to estimate the result.`
        }]
      }
    },
    pdfCompressRemoveNamedFile: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3,
          v: `Remove `
        }, {
          t: 4,
          k: `name`
        }]
      }
    },
    pdfCompressRecommendedReached: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Already at the recommended result`
      }
    },
    pdfCompressAnalysisModeDescription: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 4,
          k: `mode`
        }, {
          t: 3,
          v: ` is selected. The result will be estimated automatically after upload.`
        }]
      }
    },
    pdfCompressFileStrategyLabel: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Processing plan`
      }
    },
    pdfCompressFileStrategyVector: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Preserve text and vector structure`
      }
    },
    pdfCompressFileStrategyImage: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Optimize scanned image resources`
      }
    },
    pdfCompressFileStrategyMixed: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Preserve text and optimize images`
      }
    },
    pdfCompressFileStrategyLight: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Losslessly reorganize document objects`
      }
    },
    pdfCompressFileStrategyExtreme: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Rebuild pages in grayscale`
      }
    },
    pdfCompressFileStrategyCustom: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 4,
          k: `resolution`
        }, {
          t: 3,
          v: `% resolution · `
        }, {
          t: 4,
          k: `quality`
        }, {
          t: 3,
          v: `% quality`
        }]
      }
    },
    pdfCompressCustomParametersTitle: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Choose custom compression settings`
      }
    },
    pdfCompressCustomParametersDescription: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Choose page resolution and image quality to see an estimate.`
      }
    },
    pdfCompressCalculatingMode: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3,
          v: `Calculating the `
        }, {
          t: 4,
          k: `mode`
        }, {
          t: 3,
          v: ` estimate`
        }]
      }
    },
    pdfCompressProcessingOptimizing: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Optimizing page resources`
      }
    },
    pdfCompressProcessingRecompressing: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Recompressing content`
      }
    },
    pdfCompressProcessingGenerating: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Generating download files`
      }
    },
    pdfCompressSelectFirst: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Choose PDF files first`
      }
    },
    pdfCompressSaveFailedTitle: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Save failed`
      }
    },
    pdfCompressOutputSuffix: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `_compressed`
      }
    },
    pdfCompressOriginalSize: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Original`
      }
    },
    pdfCompressCompressedSize: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Compressed`
      }
    },
    pdfCompressSaved: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Saved`
      }
    },
    pdfCompressSavedPercent: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3,
          v: `Saved `
        }, {
          t: 4,
          k: `percent`
        }, {
          t: 3,
          v: `%`
        }]
      }
    },
    pdfCompressSaveFile: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Save`
      }
    },
    pdfCompressSaveAll: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Save all`
      }
    },
    pdfCompressSaving: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Saving…`
      }
    },
    pdfCompressEstimate: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Estimate`
      }
    },
    pdfCompressEstimateOriginal: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Original total`
      }
    },
    pdfCompressEstimateResult: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Estimated result`
      }
    },
    pdfCompressEstimateSaving: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3,
          v: `Estimated saving: about `
        }, {
          t: 4,
          k: `percent`
        }, {
          t: 3,
          v: `%`
        }]
      }
    },
    pdfCompressSelectFailed: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `The selected PDFs could not be read. Check that they are valid and within the size limit.`
      }
    },
    pdfCompressCompressionFailed: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `PDF compression failed. Adjust the settings or choose the files again.`
      }
    },
    pdfCompressSaveFailed: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `The file could not be saved. Choose a different location and try again.`
      }
    },
    pdfCompressSaveAllFailed: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `The files could not be saved. Choose a different location and try again.`
      }
    },
    pdfCompressSaveSucceeded: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `The compressed PDF was saved.`
      }
    },
    pdfCompressSaveAllSucceeded: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3,
          v: `Saved `
        }, {
          t: 4,
          k: `count`
        }, {
          t: 3,
          v: ` compressed PDFs.`
        }]
      }
    },
    operationFailed: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Operation failed`
      }
    },
    imageCompressRecommendedSuffix: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: ` (Recommended)`
      }
    },
    imageCompressKeepOriginalSize: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Keep original size`
      }
    },
    imageCompressCustomResolution: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Custom resolution`
      }
    },
    imageCompressLightMode: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Light compression`
      }
    },
    imageCompressBalancedMode: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Balanced compression`
      }
    },
    imageCompressBalancedRecommended: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Balanced (Recommended)`
      }
    },
    imageCompressExtremeMode: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Extreme compression`
      }
    },
    imageCompressCustomMode: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Custom compression`
      }
    },
    imageCompressLightModeDescription: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Keeps more detail for everyday viewing`
      }
    },
    imageCompressBalancedModeDescription: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Balances image quality and file size`
      }
    },
    imageCompressExtremeModeDescription: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Prioritizes the smallest file`
      }
    },
    imageCompressCustomModeDescription: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Set output resolution and image quality`
      }
    },
    imageCompressStageReading: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Reading image information`
      }
    },
    imageCompressStageApplying: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Applying compression settings`
      }
    },
    imageCompressStageGenerating: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Generating compressed images`
      }
    },
    imageCompressStageFinishing: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Finishing up`
      }
    },
    imageCompressUnsupportedFormat: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 4,
          k: `name`
        }, {
          t: 3,
          v: `: unsupported format`
        }]
      }
    },
    imageCompressFileTooLarge: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 4,
          k: `name`
        }, {
          t: 3,
          v: `: larger than 40 MB`
        }]
      }
    },
    imageCompressUnreadableFile: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 4,
          k: `name`
        }, {
          t: 3,
          v: `: unreadable or damaged image`
        }]
      }
    },
    imageCompressDuplicateSingle: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `This image is already in the list`
      }
    },
    imageCompressDuplicateMultiple: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 4,
          k: `count`
        }, {
          t: 3,
          v: ` duplicate images were ignored`
        }]
      }
    },
    imageCompressFileLimit: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3,
          v: `Up to `
        }, {
          t: 4,
          k: `count`
        }, {
          t: 3,
          v: ` images can be processed at once`
        }]
      }
    },
    imageCompressNotice: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Notice`
      }
    },
    imageCompressExtremeModeLocked: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `The image is already extremely compressed. Compression mode cannot be changed.`
      }
    },
    imageCompressPngProcessingUnavailable: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `PNG processing is unavailable in this environment`
      }
    },
    imageCompressPngResizeUnavailable: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `PNG resizing is unavailable in this environment`
      }
    },
    imageCompressFormatGenerationUnavailable: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `The selected format cannot be generated in this environment`
      }
    },
    imageCompressCompressionAnalysisUnavailable: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Unable to analyze image compression in this environment`
      }
    },
    imageCompressCanvasUnavailable: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Unable to create an image processing canvas`
      }
    },
    imageCompressExtremeSingleNotice: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `The image is already extremely compressed and needs no further compression.`
      }
    },
    imageCompressExtremeBatchNotice: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 4,
          k: `count`
        }, {
          t: 3,
          v: ` images are already extremely compressed and will be output unchanged in the batch result.`
        }]
      }
    },
    imageCompressNoBenefitAllNotice: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `The current settings cannot produce a smaller image. Adjust format, quality, or resolution.`
      }
    },
    imageCompressNoBenefitSomeNotice: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 4,
          k: `count`
        }, {
          t: 3,
          v: ` images have no compression benefit with the current settings and will be skipped.`
        }]
      }
    },
    imageCompressCompressionFailed: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Compression failed`
      }
    },
    imageCompressExtremeOriginalResults: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 4,
          k: `count`
        }, {
          t: 3,
          v: ` images were already extremely compressed and were output unchanged.`
        }]
      }
    },
    imageCompressSaved: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Saved`
      }
    },
    imageCompressSaveFailed: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Save failed`
      }
    },
    imageCompressBatchSaveFailed: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Batch save failed`
      }
    },
    imageCompressKicker: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Local image compression`
      }
    },
    imageCompressTitle: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Make your images lighter`
      }
    },
    imageCompressDescription: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Batch process JPG, PNG, WebP, BMP, and AVIF. Images never leave your computer.`
      }
    },
    imageCompressUploadTitle: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Upload images`
      }
    },
    imageCompressUploadDescription: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Drag and drop up to 30 images, 40 MB each`
      }
    },
    imageCompressClearAndReselect: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Clear and reselect`
      }
    },
    imageCompressOriginalRetained: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `original retained after extreme compression`
      }
    },
    imageCompressSavedLowercase: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `saved`
      }
    },
    imageCompressNoSizeReduction: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `no size reduction`
      }
    },
    imageCompressCompressing: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Compressing…`
      }
    },
    imageCompressReady: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Ready`
      }
    },
    imageCompressDone: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Done`
      }
    },
    imageCompressRetry: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Retry`
      }
    },
    imageCompressRemove: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Remove`
      }
    },
    imageCompressDropImages: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Click or drop images`
      }
    },
    imageCompressDropMoreImages: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Click or drop more images`
      }
    },
    imageCompressSupportedFormats: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `JPG, PNG, WebP, BMP, and AVIF`
      }
    },
    imageCompressChooseMode: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Choose compression mode`
      }
    },
    imageCompressChooseModeDescription: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Choose a mode now; an estimate will be generated after images are added`
      }
    },
    imageCompressImagesSelected: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 4,
          k: `count`
        }, {
          t: 3,
          v: ` images selected; choose a compression level`
        }]
      }
    },
    imageCompressCompressionMode: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Compression mode`
      }
    },
    imageCompressOutputResolution: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Output resolution`
      }
    },
    imageCompressImageQuality: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Image quality`
      }
    },
    imageCompressOutputFormat: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Output format`
      }
    },
    imageCompressWidth: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Width`
      }
    },
    imageCompressHeight: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Height`
      }
    },
    imageCompressEstimating: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Generating actual estimate`
      }
    },
    imageCompressExtremeDetected: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Extremely compressed images detected`
      }
    },
    imageCompressNoBenefit: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `No compression benefit with current settings`
      }
    },
    imageCompressEstimateReady: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Compression estimate ready`
      }
    },
    imageCompressEstimatePartialFailed: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Some images could not be estimated`
      }
    },
    imageCompressEstimateDescription: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Uses the same encoding parameters as final compression`
      }
    },
    imageCompressAnalyzing: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Analyzing`
      }
    },
    imageCompressNoBenefitShort: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `No benefit`
      }
    },
    imageCompressRecommended: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Recommended`
      }
    },
    imageCompressCalculated: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Calculated`
      }
    },
    imageCompressOriginalSize: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Original size`
      }
    },
    imageCompressEstimatedSize: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Estimated size`
      }
    },
    imageCompressOriginalFiles: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Original files`
      }
    },
    imageCompressNoCompressionNeeded: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `No compression needed`
      }
    },
    imageCompressEstimatedSaving: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Estimated saving`
      }
    },
    imageCompressAlreadyExtreme: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Already extremely compressed`
      }
    },
    imageCompressQuantizingColors: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Quantizing colors`
      }
    },
    imageCompressColorQuality: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 4,
          k: `value`
        }, {
          t: 3,
          v: `% color quality`
        }]
      }
    },
    imageCompressLossyPngQuality: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3,
          v: `Lossy PNG · `
        }, {
          t: 4,
          k: `value`
        }, {
          t: 3,
          v: `%`
        }]
      }
    },
    imageCompressMatchingQuality: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Matching quality`
      }
    },
    imageCompressQualityValue: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 4,
          k: `value`
        }, {
          t: 3,
          v: `% image quality`
        }]
      }
    },
    imageCompressEffectiveQuality: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 4,
          k: `value`
        }, {
          t: 3,
          v: `% effective quality`
        }]
      }
    },
    imageCompressAnalysisFailed: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Analysis failed`
      }
    },
    imageCompressEstimate: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Estimate`
      }
    },
    imageCompressNoFurtherCompression: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `No further compression`
      }
    },
    imageCompressLargerOutputRejected: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Larger output rejected`
      }
    },
    imageCompressSavedPercent: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 4,
          k: `value`
        }, {
          t: 3,
          v: `% saved`
        }]
      }
    },
    imageCompressLargerPercent: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 4,
          k: `value`
        }, {
          t: 3,
          v: `% larger`
        }]
      }
    },
    imageCompressExtremeMixedNotice: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 4,
          k: `count`
        }, {
          t: 3,
          v: ` extremely compressed images will be output unchanged; other images will be compressed normally.`
        }]
      }
    },
    imageCompressNoBenefitSkipped: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Some images cannot be made smaller with the current settings and will be skipped; no larger files will be output.`
      }
    },
    imageCompressCurrentTask: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Current task`
      }
    },
    imageCompressPrechargePrice: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Precharge`
      }
    },
    imageCompressPricingLoading: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Loading online pricing…`
      }
    },
    imageCompressPricingUnavailable: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Pricing is temporarily unavailable`
      }
    },
    imageCompressUnitPrice: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 4,
          k: `credits`
        }, {
          t: 3,
          v: ` credits per image`
        }]
      }
    },
    imageCompressPrechargeSummary: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 4,
          k: `credits`
        }, {
          t: 3,
          v: ` credits · `
        }, {
          t: 4,
          k: `count`
        }, {
          t: 3,
          v: ` eligible images`
        }]
      }
    },
    imageCompressSignInRequired: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Sign in before compressing images.`
      }
    },
    imageCompressInsufficientBalance: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Not enough credits. Top up to continue.`
      }
    },
    imageCompressPriceUnit: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `per image`
      }
    },
    imageCompressProcessing: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Processing…`
      }
    },
    imageCompressAnalyzingImages: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Analyzing images…`
      }
    },
    imageCompressCurrentImageNoCompression: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `This image needs no compression`
      }
    },
    imageCompressPrepareOriginalFiles: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3,
          v: `Prepare `
        }, {
          t: 4,
          k: `count`
        }, {
          t: 3,
          v: ` original files`
        }]
      }
    },
    imageCompressCompressAgain: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Compress again`
      }
    },
    imageCompressProcessUnfinished: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Process unfinished images`
      }
    },
    imageCompressProcessImages: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3,
          v: `Process `
        }, {
          t: 4,
          k: `count`
        }, {
          t: 3,
          v: ` images`
        }]
      }
    },
    imageCompressResultsTitle: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Compression results`
      }
    },
    imageCompressResultsDescription: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `View results and choose where to save images`
      }
    },
    imageCompressCompressingImages: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Compressing images`
      }
    },
    imageCompressKeepPageOpen: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Keep this page open. Results will appear automatically when processing is complete.`
      }
    },
    imageCompressResultsPlaceholder: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Compression results will appear here`
      }
    },
    imageCompressSelectSettingsToStart: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Choose a compression mode and output format, then start compression.`
      }
    },
    imageCompressUploadToStart: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Upload images, choose a compression mode, then start compression.`
      }
    },
    imageCompressImagesProcessed: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Images processed`
      }
    },
    imageCompressImagesCompressed: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Images have been compressed`
      }
    },
    imageCompressSomeImagesCompleted: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Some images completed`
      }
    },
    imageCompressImagesReadyToSave: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 4,
          k: `count`
        }, {
          t: 3,
          v: ` images are ready to save`
        }]
      }
    },
    imageCompressProcessedCount: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 4,
          k: `count`
        }, {
          t: 3,
          v: ` images processed`
        }]
      }
    },
    imageCompressOverallSaved: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Overall saving`
      }
    },
    imageCompressReducedBy: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3,
          v: `Reduced by `
        }, {
          t: 4,
          k: `size`
        }]
      }
    },
    imageCompressBatchResultSummary: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 4,
          k: `count`
        }, {
          t: 3,
          v: ` compressed files`
        }]
      }
    },
    imageCompressOpenPreview: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Open image preview`
      }
    },
    imageCompressOriginalKeptFormat: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 4,
          k: `format`
        }, {
          t: 3,
          v: ` · original kept`
        }]
      }
    },
    imageCompressSaveFile: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Save file`
      }
    },
    imageCompressSave: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Save`
      }
    },
    imageCompressSaving: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Saving…`
      }
    },
    imageCompressSaveAllFiles: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Save all files`
      }
    },
    imageCompressSaveAllToFolder: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Save all to one folder`
      }
    },
    imageCompressUnsavedResultsTitle: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Some compressed images are not saved`
      }
    },
    imageCompressUnsavedResultsDescription: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 4,
          k: `count`
        }, {
          t: 3,
          v: ` compressed images have not been saved. They will be deleted and cannot be recovered if you leave.`
        }]
      }
    },
    imageCompressDiscardAndLeave: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Discard and leave`
      }
    },
    imageCompressContinueSaving: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Continue saving`
      }
    },
    imageCompressDeleteResults: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Delete results`
      }
    },
    whiteboardToolName: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Whiteboard`
      }
    },
    whiteboardToolDescription: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Draw, annotate, and organize multiple boards. Open an existing PNG and export your canvas as PNG.`
      }
    },
    whiteboardOpen: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Open whiteboard`
      }
    },
    whiteboardOpenShort: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Open`
      }
    },
    whiteboardSave: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Save whiteboard`
      }
    },
    whiteboardSaveShort: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Save`
      }
    },
    whiteboardSaveAs: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Save whiteboard as`
      }
    },
    whiteboardSaveAsShort: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Save as`
      }
    },
    whiteboardUntitledBoard: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Untitled whiteboard`
      }
    },
    whiteboardBoardNumber: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3,
          v: `Board `
        }, {
          t: 4,
          k: `number`
        }]
      }
    },
    whiteboardShapeLine: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Line`
      }
    },
    whiteboardShapeCurve: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Curve`
      }
    },
    whiteboardShapeEllipse: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Ellipse`
      }
    },
    whiteboardShapeRectangle: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Rectangle`
      }
    },
    whiteboardShapeTriangle: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Triangle`
      }
    },
    whiteboardShapeDiamond: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Diamond`
      }
    },
    whiteboardShapePentagon: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Pentagon`
      }
    },
    whiteboardShapeStar: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Star`
      }
    },
    whiteboardShapeSpeech: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Speech bubble`
      }
    },
    whiteboardShapeCloud: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Cloud`
      }
    },
    whiteboardSizeThin: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Thin`
      }
    },
    whiteboardSizeMedium: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Medium`
      }
    },
    whiteboardSizeThick: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Thick`
      }
    },
    whiteboardSizeSmall: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Small`
      }
    },
    whiteboardSizeLarge: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Large`
      }
    },
    whiteboardClearedUndoAvailable: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `The current board was cleared. You can undo this action.`
      }
    },
    whiteboardSelectionEmpty: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `There is no content inside the selection.`
      }
    },
    whiteboardDesktopOpenRequired: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Use the Electron desktop app to open a file.`
      }
    },
    whiteboardDesktopSaveRequired: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Use the Electron desktop app to save a file.`
      }
    },
    whiteboardPngOpened: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `PNG image opened`
      }
    },
    whiteboardImageSaved: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Image saved`
      }
    },
    whiteboardProjectSaved: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Editable whiteboard saved`
      }
    },
    whiteboardSaveFailed: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `The whiteboard could not be saved. Check the file permissions or use Save as.`
      }
    },
    whiteboardAlreadySaved: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `The current file is already up to date.`
      }
    },
    whiteboardUnsavedTitle: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `This whiteboard has unsaved changes`
      }
    },
    whiteboardUnsavedDescription: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Leaving clears the current canvas. Save it as a PNG first, or discard the changes and leave.`
      }
    },
    whiteboardCancel: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Cancel`
      }
    },
    whiteboardDiscardAndLeave: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Discard and leave`
      }
    },
    whiteboardSaveAndLeave: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Save and leave`
      }
    },
    whiteboardSaveAsImage: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Save as image`
      }
    },
    whiteboardSaveAsDescription: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Choose a background style, then select a new save location.`
      }
    },
    whiteboardCloseSaveDialog: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Close save dialog`
      }
    },
    whiteboardExportBoardBackground: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Export with whiteboard background`
      }
    },
    whiteboardExportBoardBackgroundDescription: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Keep the light dotted grid · PNG`
      }
    },
    whiteboardExportWhiteBackground: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Export with white background`
      }
    },
    whiteboardExportWhiteBackgroundDescription: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Plain white, suitable for printing · PNG`
      }
    },
    whiteboardCanvasAriaLabel: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Whiteboard drawing area`
      }
    },
    whiteboardTextInputAriaLabel: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Enter text`
      }
    },
    whiteboardEditingTextAriaLabel: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Editing text`
      }
    },
    whiteboardResizeTextAriaLabel: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Drag to resize text`
      }
    },
    whiteboardStartDrawing: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Start with a stroke`
      }
    },
    whiteboardStartDrawingDescription: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Choose a tool below and capture your ideas freely on the canvas.`
      }
    },
    whiteboardZoomOut: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Zoom out`
      }
    },
    whiteboardZoomIn: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Zoom in`
      }
    },
    whiteboardPenSize: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Pen width`
      }
    },
    whiteboardEraserSize: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Eraser size`
      }
    },
    whiteboardClose: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Close`
      }
    },
    whiteboardChooseShape: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Choose a shape`
      }
    },
    whiteboardToolbar: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Whiteboard toolbar`
      }
    },
    whiteboardPreviousPage: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Previous page`
      }
    },
    whiteboardNextPage: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Next page`
      }
    },
    whiteboardAddBoard: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Add board`
      }
    },
    whiteboardPenColor: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Pen color`
      }
    },
    whiteboardChooseColor: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3,
          v: `Choose color `
        }, {
          t: 4,
          k: `color`
        }]
      }
    },
    whiteboardPen: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Pen`
      }
    },
    whiteboardEraser: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Eraser`
      }
    },
    whiteboardShape: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Shape`
      }
    },
    whiteboardText: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Text`
      }
    },
    whiteboardSelect: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Select`
      }
    },
    whiteboardUndo: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Undo`
      }
    },
    whiteboardClearBoard: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Clear current board`
      }
    },
    whiteboardDeleteSelected: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Delete selected content`
      }
    },
    whiteboardHelp: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Help`
      }
    },
    whiteboardCollapseToolbar: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Collapse toolbar`
      }
    },
    whiteboardExpandToolbar: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Expand toolbar`
      }
    },
    whiteboardQuickStart: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Quick start`
      }
    },
    whiteboardDesktopShortcuts: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Desktop shortcuts`
      }
    },
    whiteboardCloseHelp: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Close help`
      }
    },
    whiteboardDraw: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Draw`
      }
    },
    whiteboardEraseElements: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Erase elements`
      }
    },
    whiteboardDrawShapes: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Draw shapes`
      }
    },
    whiteboardAddText: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Add text`
      }
    },
    whiteboardSelectContent: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Select content`
      }
    },
    whiteboardMoveCanvas: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Move canvas`
      }
    },
    whiteboardLeftMouseButton: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Left mouse button`
      }
    },
    whiteboardZoomCanvas: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Zoom canvas`
      }
    },
    whiteboardHorizontalScroll: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Move canvas horizontally`
      }
    },
    whiteboardMouseWheel: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Mouse wheel`
      }
    },
    multiPlatformPublisherToolName: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Multi-platform Publisher`
      }
    },
    multiPlatformPublisherToolDescription: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Prepare a video, copy, and cover once, then open separate publishing windows for multiple accounts.`
      }
    },
    publisherPriceUnit: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `task`
      }
    },
    publisherEstimatedCost: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Estimated cost`
      }
    },
    publisherCreditsUnit: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `credits`
      }
    },
    publisherFixedTaskPrice: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Fixed per task; refunded if all targets fail`
      }
    },
    publisherLoginRequiredTitle: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Sign in required`
      }
    },
    publisherLoginRequiredDescription: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Sign in to use credits for multi-platform publishing.`
      }
    },
    publisherInsufficientCreditsTitle: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Insufficient credits`
      }
    },
    publisherInsufficientCreditsDescription: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3,
          v: `This task requires `
        }, {
          t: 4,
          k: `cost`
        }, {
          t: 3,
          v: ` credits. Your current balance is `
        }, {
          t: 4,
          k: `balance`
        }, {
          t: 3,
          v: `. Please recharge first.`
        }]
      }
    },
    publisherHistory: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Publishing history`
      }
    },
    publisherKicker: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `MULTI-PLATFORM PUBLISHING`
      }
    },
    publisherTitle: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Prepare once, publish everywhere`
      }
    },
    publisherDescription: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Enter the video details once. Xiaohei opens a separate platform window for each account, and you review and publish manually.`
      }
    },
    publisherContentCleared: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Content cleared`
      }
    },
    publisherUploadAndContent: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Upload video and enter details`
      }
    },
    publisherPrepareContent: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Prepare the content for this publishing task`
      }
    },
    publisherRecords: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `History`
      }
    },
    publisherClearContent: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Clear`
      }
    },
    publisherVideoFile: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Video file`
      }
    },
    publisherChooseVideo: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Choose a video file`
      }
    },
    publisherVideoFormats: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `MP4, MOV, WebM, AVI, and MKV`
      }
    },
    publisherBrowseFiles: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Browse files`
      }
    },
    publisherPreviewFailed: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `The video preview failed to load. Choose the file again.`
      }
    },
    publisherComponentUnavailable: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `The video component has not finished loading. Restart Xiaohei and try again.`
      }
    },
    publisherLocalPreview: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Local preview`
      }
    },
    publisherHorizontal: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Landscape`
      }
    },
    publisherVertical: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Portrait`
      }
    },
    publisherReadingVideo: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Reading video details…`
      }
    },
    publisherReplaceVideo: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Change video`
      }
    },
    publisherCommonTitle: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Common title`
      }
    },
    publisherCustomPlatformTitles: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Customize platform titles`
      }
    },
    publisherCommonTitlePlaceholder: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Used on every platform unless customized below`
      }
    },
    publisherCustomTitlesSummary: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 4,
          k: `count`
        }, {
          t: 3,
          v: ` customized; the rest use the common title`
        }]
      }
    },
    publisherCommonTitleDefault: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Using the common title by default`
      }
    },
    publisherFixedTopic: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Fixed tag`
      }
    },
    publisherFixedTopicPlaceholder: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `For example: Xiaobai Daily`
      }
    },
    publisherTopics: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Topics / tags`
      }
    },
    publisherTopicsPlaceholder: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Separate topics with spaces, commas, or #`
      }
    },
    publisherTopicsExample: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `For example: #food #travel #review`
      }
    },
    publisherTopicInputPlaceholder: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Enter a tag and press Enter`
      }
    },
    publisherTopicAdd: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Add tag`
      }
    },
    publisherTopicCount: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 4,
          k: `count`
        }, {
          t: 3,
          v: ` / `
        }, {
          t: 4,
          k: `max`
        }]
      }
    },
    publisherTopicHint: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Drag tags to reorder them. Pin a tag to keep it for the next task.`
      }
    },
    publisherTopicPin: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Keep for future tasks`
      }
    },
    publisherTopicUnpin: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Stop keeping this tag`
      }
    },
    publisherTopicRemove: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Remove tag`
      }
    },
    publisherDescriptionField: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Description`
      }
    },
    publisherDescriptionPlaceholder: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Enter the description; Channels does not use this field`
      }
    },
    publisherChooseAccounts: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Choose publishing accounts`
      }
    },
    publisherChooseAccountsHint: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Connect, select, and manage all publishing accounts here`
      }
    },
    publisherChooseAccountPlatform: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Choose a platform to connect`
      }
    },
    publisherAllPlatforms: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `All platforms`
      }
    },
    publisherFilterPlatform: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Filter account platform`
      }
    },
    publisherSearchAccounts: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Search account name or note`
      }
    },
    publisherClearAccountSearch: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Clear account search`
      }
    },
    publisherAccountRemark: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3,
          v: `Note: `
        }, {
          t: 4,
          k: `remark`
        }]
      }
    },
    publisherNoAccountRemark: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `No note`
      }
    },
    publisherSelectAccount: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Select this account`
      }
    },
    publisherDeselectAccount: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Deselect this account`
      }
    },
    publisherNoAccounts: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `No connected accounts`
      }
    },
    publisherNoAccountsHint: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Use “Connect account” above to add your first account`
      }
    },
    publisherNoMatchingAccounts: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `No matching accounts`
      }
    },
    publisherNoMatchingAccountsHint: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Try another keyword or platform filter`
      }
    },
    publisherLoadingAccounts: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Loading accounts`
      }
    },
    publisherAccountCount: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 4,
          k: `count`
        }, {
          t: 3,
          v: ` accounts`
        }]
      }
    },
    publisherCoverAndDeclarations: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Covers and declarations`
      }
    },
    publisherCoverHint: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Covers are optional. Leave them empty to use each platform's default.`
      }
    },
    publisherCoverLabel: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 4,
          k: `ratio`
        }, {
          t: 3,
          v: ` cover`
        }]
      }
    },
    publisherChooseImage: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Choose an image`
      }
    },
    publisherRemove: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Remove`
      }
    },
    publisherContentDeclaration: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 4,
          k: `platform`
        }, {
          t: 3,
          v: ` content declaration`
        }]
      }
    },
    publisherChooseDeclaration: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Choose a declaration`
      }
    },
    publisherXhsOriginal: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Declare original on Xiaohongshu`
      }
    },
    publisherXhsOriginalHint: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Applies only to the Xiaohongshu original-content declaration`
      }
    },
    publisherChannelsHideLocation: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Hide location on Channels`
      }
    },
    publisherChannelsHideLocationHint: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Sets the Channels location option to “Do not show location”`
      }
    },
    publisherChannelsOriginal: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Declare original on Channels`
      }
    },
    publisherChannelsOriginalHint: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Applies only to the Channels original-content declaration`
      }
    },
    publisherScheduledTime: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Scheduled publishing time`
      }
    },
    publisherScheduledTimeHint: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Optional; each platform can use a different time`
      }
    },
    publisherEnabled: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `On`
      }
    },
    publisherDisabled: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Off`
      }
    },
    publisherCommonSchedule: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Common publishing time`
      }
    },
    publisherCommonScheduleHint: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Used when a platform has no custom time`
      }
    },
    publisherChooseDate: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Choose date`
      }
    },
    publisherHour: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Hr`
      }
    },
    publisherMinute: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Min`
      }
    },
    publisherCommonDateLabel: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Common publishing date`
      }
    },
    publisherCommonHourLabel: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Common publishing hour`
      }
    },
    publisherCommonMinuteLabel: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Common publishing minute`
      }
    },
    publisherPlatformSchedule: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 4,
          k: `platform`
        }, {
          t: 3,
          v: ` publishing time`
        }]
      }
    },
    publisherPlatformDateLabel: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 4,
          k: `platform`
        }, {
          t: 3,
          v: ` publishing date`
        }]
      }
    },
    publisherPlatformHourLabel: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 4,
          k: `platform`
        }, {
          t: 3,
          v: ` publishing hour`
        }]
      }
    },
    publisherPlatformMinuteLabel: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 4,
          k: `platform`
        }, {
          t: 3,
          v: ` publishing minute`
        }]
      }
    },
    publisherUseCommonSchedule: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Leave empty to use the common time`
      }
    },
    publisherScheduleEmpty: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Choose accounts to set platform-specific publishing times`
      }
    },
    publisherScheduleNote: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Douyin requires at least 2 hours' notice and Xiaohongshu at least 1 hour. Xiaohei selects the time but never clicks the final publish button.`
      }
    },
    publisherImmediateDefault: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Prepare for immediate publishing`
      }
    },
    publisherImmediateHint: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Turn scheduling on to select a planned time on each platform.`
      }
    },
    publisherCheckAndStart: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Review and start`
      }
    },
    publisherLaunchEntryHint: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Review this task before opening each platform window`
      }
    },
    publisherVideo: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Video`
      }
    },
    publisherNotSelected: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Not selected`
      }
    },
    publisherTargets: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Targets`
      }
    },
    publisherCustomCovers: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Custom covers`
      }
    },
    publisherCoverRatioCount: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 4,
          k: `count`
        }, {
          t: 3,
          v: ` ratios`
        }]
      }
    },
    publisherUsePlatformDefault: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Use platform defaults`
      }
    },
    publisherMethod: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Publishing method`
      }
    },
    publisherScheduledPublish: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Scheduled`
      }
    },
    publisherPrepareNow: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Prepare now`
      }
    },
    publisherSafetyTip: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Xiaohei fills in uploads, titles, descriptions, topics, covers, and declarations. Review every opened platform window and publish manually.`
      }
    },
    publisherCreatingTask: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Creating task`
      }
    },
    publisherOpenWindows: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3,
          v: `Open `
        }, {
          t: 4,
          k: `count`
        }, {
          t: 3,
          v: ` publishing windows`
        }]
      }
    },
    publisherStart: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Review and start`
      }
    },
    publisherCancelTask: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Cancel task`
      }
    },
    publisherPlanned: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Scheduled`
      }
    },
    publisherBindNewAccount: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Connect account`
      }
    },
    publisherBindAccountHint: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Choose a platform and add an optional note. The account will appear here after sign-in.`
      }
    },
    publisherAccountPlatformLabel: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Platform`
      }
    },
    publisherAccountRemarkLabel: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Account note`
      }
    },
    publisherAccountRemarkOptional: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Optional, for distinguishing accounts on the same platform`
      }
    },
    publisherReady: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Ready`
      }
    },
    publisherNeedsLogin: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Sign in`
      }
    },
    publisherRelogin: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Sign in again`
      }
    },
    publisherDelete: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Delete`
      }
    },
    publisherDeleteAccountTitle: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Delete this account?`
      }
    },
    publisherDeleteAccountDescription: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3,
          v: `Delete “`
        }, {
          t: 4,
          k: `account`
        }, {
          t: 3,
          v: `”? Its locally saved sign-in state will also be removed.`
        }]
      }
    },
    publisherDeleting: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Deleting`
      }
    },
    publisherConfirmDelete: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Delete account`
      }
    },
    publisherXhsRiskTitle: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Xiaohongshu account risk notice`
      }
    },
    publisherXhsRiskDescription: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Xiaohongshu may apply account risk controls. We do not recommend using this tool to sign in or automate publishing. Continue only if you accept the risk of restrictions, verification, or suspension.`
      }
    },
    publisherContinueRisk: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Accept risk and continue`
      }
    },
    publisherPlatformTitleHint: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Platforms left empty use the common title`
      }
    },
    publisherClose: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Close`
      }
    },
    publisherShortTitlePlaceholder: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Optional, up to 16 characters; commas become spaces`
      }
    },
    publisherTitlePlaceholder: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3,
          v: `Leave empty to use the common title, up to `
        }, {
          t: 4,
          k: `limit`
        }, {
          t: 3,
          v: ` characters`
        }]
      }
    },
    publisherUseCommonTitle: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Empty fields use the common title`
      }
    },
    publisherSave: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Save`
      }
    },
    publisherBackToRecords: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Back to history`
      }
    },
    publisherDetails: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Publishing details`
      }
    },
    publisherDetailsHint: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Review the result and status for every platform account`
      }
    },
    publisherHistoryTotal: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 4,
          k: `count`
        }, {
          t: 3,
          v: ` publishing records saved locally`
        }]
      }
    },
    publisherLoadingHistory: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Loading publishing history`
      }
    },
    publisherNoHistory: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `No publishing history yet`
      }
    },
    publisherNoHistoryHint: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Your first publishing task will be saved here automatically.`
      }
    },
    publisherUntitledTask: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Untitled publishing task`
      }
    },
    publisherProcessed: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Processed`
      }
    },
    publisherRefreshingDetails: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Refreshing details`
      }
    },
    publisherTaskProgress: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Task progress`
      }
    },
    publisherVideoFileLabel: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Video file`
      }
    },
    publisherCreatedAt: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Created`
      }
    },
    publisherCompletedAt: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Completed`
      }
    },
    publisherResult: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Result`
      }
    },
    publisherNeedsCheckCount: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 4,
          k: `count`
        }, {
          t: 3,
          v: ` need review`
        }]
      }
    },
    publisherNoFailedAccounts: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `No failed accounts`
      }
    },
    publisherPlatformDetails: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Platform details`
      }
    },
    publisherTargetCount: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 4,
          k: `count`
        }, {
          t: 3,
          v: ` publishing targets`
        }]
      }
    },
    publisherNoDetails: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `No details yet`
      }
    },
    publisherPlannedAt: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Scheduled: `
      }
    },
    publisherGotIt: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Got it`
      }
    },
    publisherStatusRunning: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Processing`
      }
    },
    publisherStatusReady: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Ready for manual publish`
      }
    },
    publisherStatusPartial: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Some need review`
      }
    },
    publisherStatusFailed: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Failed`
      }
    },
    publisherStatusCancelled: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Cancelled`
      }
    },
    publisherStatusInterrupted: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Interrupted`
      }
    },
    publisherItemQueued: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Queued`
      }
    },
    publisherItemLaunching: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Starting browser`
      }
    },
    publisherItemBrowserOpened: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Browser opened`
      }
    },
    publisherItemNavigating: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Opening upload page`
      }
    },
    publisherItemUploading: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Uploading video`
      }
    },
    publisherItemFilling: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Entering details`
      }
    },
    publisherItemCover: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Setting cover`
      }
    },
    publisherItemOriginal: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Setting original declaration`
      }
    },
    publisherItemLocation: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Setting location`
      }
    },
    publisherItemScheduling: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Setting schedule`
      }
    },
    publisherItemReady: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Awaiting publish`
      }
    },
    publisherItemFailed: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Needs review`
      }
    },
    publisherItemCancelled: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Cancelled`
      }
    },
    publisherErrorLoginExpired: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Account sign-in expired`
      }
    },
    publisherErrorWindowClosed: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Publishing window closed`
      }
    },
    publisherErrorPageTimeout: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Platform timed out`
      }
    },
    publisherErrorNetwork: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Network error`
      }
    },
    publisherErrorChrome: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Browser unavailable`
      }
    },
    publisherErrorFile: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Local file unavailable`
      }
    },
    publisherErrorPageChanged: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Platform page changed`
      }
    },
    publisherErrorAutomation: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Automatic entry incomplete`
      }
    },
    publisherDouyin: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Douyin`
      }
    },
    publisherXiaohongshu: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Xiaohongshu`
      }
    },
    publisherChannels: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `WeChat Channels`
      }
    },
    publisherBilibili: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Bilibili`
      }
    },
    publisherDouyinTitle: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Douyin title`
      }
    },
    publisherXiaohongshuTitle: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Xiaohongshu title`
      }
    },
    publisherChannelsTitle: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Channels title`
      }
    },
    publisherChannelsShortTitle: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Channels short title`
      }
    },
    publisherBilibiliTitle: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Bilibili title`
      }
    },
    publisherDouyinRemark: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Optional note, for example: Main brand account`
      }
    },
    publisherXhsRemark: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Optional note, for example: Lifestyle account`
      }
    },
    publisherChannelsRemark: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Optional note, for example: Company Channels`
      }
    },
    publisherBilibiliRemark: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Optional note, for example: Knowledge account`
      }
    },
    publisherCancel: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Cancel`
      }
    },
    publisherCommon: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Common`
      }
    },
    publisherScheduleCompleteError: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3,
          v: `Choose a complete publishing date and time for `
        }, {
          t: 4,
          k: `platform`
        }]
      }
    },
    publisherScheduleInvalid: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3,
          v: `The scheduled publishing time for `
        }, {
          t: 4,
          k: `platform`
        }, {
          t: 3,
          v: ` is invalid. Choose it again.`
        }]
      }
    },
    publisherScheduleLeadHours: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3,
          v: `The `
        }, {
          t: 4,
          k: `platform`
        }, {
          t: 3,
          v: ` publishing time must be at least `
        }, {
          t: 4,
          k: `count`
        }, {
          t: 3,
          v: ` hours from now`
        }]
      }
    },
    publisherScheduleLeadMinutes: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3,
          v: `The `
        }, {
          t: 4,
          k: `platform`
        }, {
          t: 3,
          v: ` publishing time must be at least `
        }, {
          t: 4,
          k: `count`
        }, {
          t: 3,
          v: ` minutes from now`
        }]
      }
    },
    publisherScheduleMaxDays: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3,
          v: `The `
        }, {
          t: 4,
          k: `platform`
        }, {
          t: 3,
          v: ` publishing time cannot be more than `
        }, {
          t: 4,
          k: `count`
        }, {
          t: 3,
          v: ` days from now`
        }]
      }
    },
    publisherScheduleMinuteStep: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3,
          v: `The minute for `
        }, {
          t: 4,
          k: `platform`
        }, {
          t: 3,
          v: ` must be 00, 05, 10…55`
        }]
      }
    },
    publisherAccountDisabledTitle: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 4,
          k: `platform`
        }, {
          t: 3,
          v: ` account not enabled`
        }]
      }
    },
    publisherAccountDisabled: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3,
          v: `You entered custom `
        }, {
          t: 4,
          k: `platform`
        }, {
          t: 3,
          v: ` content but did not select an account on that platform. Select an available account or clear the custom content.`
        }]
      }
    },
    publisherAccountUnavailable: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 4,
          k: `platform`
        }, {
          t: 3,
          v: ` has no enabled, signed-in account. Sign in from account management or clear the custom content.`
        }]
      }
    },
    publisherNoVideoTitle: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `No video selected`
      }
    },
    publisherNoVideoDescription: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Choose a video file to publish.`
      }
    },
    publisherNoTargetTitle: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `No publishing account selected`
      }
    },
    publisherNoTargetDescription: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Select at least one signed-in account that is ready to publish.`
      }
    },
    publisherMissingTitle: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 4,
          k: `platform`
        }, {
          t: 3,
          v: ` needs a title`
        }]
      }
    },
    publisherMissingTitleDescription: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3,
          v: `Enter a common title or a custom title for `
        }, {
          t: 4,
          k: `platform`
        }, {
          t: 3,
          v: `.`
        }]
      }
    },
    publisherShortTitleInvalid: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `The Channels short title is invalid`
      }
    },
    publisherShortTitleInvalidDescription: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Use at most 16 characters. Only letters, numbers, spaces, and supported punctuation are allowed.`
      }
    },
    publisherScheduleErrorTitle: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Scheduled publishing time is invalid`
      }
    },
    publisherScheduleIncompleteTitle: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Scheduled publishing time is incomplete`
      }
    },
    publisherScheduleIncompleteDescription: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3,
          v: `Set a common publishing time or a separate time for `
        }, {
          t: 4,
          k: `platform`
        }, {
          t: 3,
          v: `.`
        }]
      }
    },
    publisherBindingIncomplete: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Account connection incomplete`
      }
    },
    publisherBindingRetry: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Start sign-in again and complete the platform verification.`
      }
    },
    publisherBindingStatusFailed: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Could not read sign-in status`
      }
    },
    publisherOpenLoginFailed: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `The sign-in window could not be opened. Try again later.`
      }
    },
    publisherStartLoginFailed: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Could not start account sign-in`
      }
    },
    publisherRemoveAccountFailed: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Could not remove the account`
      }
    },
    publisherStartTaskFailed: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `The publishing task could not start`
      }
    },
    publisherCheckContent: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Review the entered details and try again.`
      }
    },
    publisherCancelTaskFailed: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Could not cancel the task`
      }
    },
    publisherLoadHistoryFailed: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Could not load publishing history`
      }
    },
    publisherLoadDetailsFailed: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Could not load record details`
      }
    },
    publisherLoadDetailsRetry: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Reopen publishing history and try again later.`
      }
    },
    publisherDeclarationDouyinNone: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `No declaration`
      }
    },
    publisherDeclarationAi: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `AI-generated content`
      }
    },
    publisherDeclarationOpinion: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Personal opinion or commentary`
      }
    },
    publisherDeclarationRepost: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Reposted information`
      }
    },
    publisherDeclarationMarketing: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Contains marketing or promotion`
      }
    },
    publisherDeclarationFiction: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Fictional performance for entertainment`
      }
    },
    publisherDeclarationXhsNone: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `No content label`
      }
    },
    publisherDeclarationXhsAi: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Contains AI-generated content`
      }
    },
    publisherDeclarationXhsMarketing: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Contains advertising`
      }
    },
    publisherDeclarationSource: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Content source declaration`
      }
    },
    publisherDeclarationChannelsNone: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `No label`
      }
    },
    publisherDeclarationChannelsAi: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Contains AI-generated content`
      }
    },
    publisherDeclarationChannelsFiction: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Fictional story for entertainment`
      }
    },
    publisherDeclarationReference: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Personal opinion for reference only`
      }
    },
    publisherDeclarationSelfFilmed: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Self-filmed content`
      }
    },
    publisherDeclarationBilibiliNone: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `No content label`
      }
    },
    publisherDeclarationBilibiliAi: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Contains AI-generated content`
      }
    },
    publisherDeclarationBilibiliFiction: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Contains fictional performance`
      }
    },
    publisherDeclarationBilibiliMarketing: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Contains marketing`
      }
    },
    publisherDeclarationBilibiliRepost: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Reposted content`
      }
    },
    publisherRemoteBindingOpened: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Platform sign-in window opened`
      }
    },
    publisherRemoteBindingDetected: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Sign-in detected. Capturing the account nickname and avatar…`
      }
    },
    publisherRemoteLaunching: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Starting a separate Chrome window`
      }
    },
    publisherRemoteBrowserOpened: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Chrome opened. Entering the platform upload page…`
      }
    },
    publisherRemoteLocatingUpload: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Locating the video upload field`
      }
    },
    publisherRemoteUploading: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Uploading the video and waiting for platform processing`
      }
    },
    publisherRemoteFormReady: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Upload page is ready`
      }
    },
    publisherRemoteFilling: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Entering the title, topics, and description`
      }
    },
    publisherRemoteCover: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Setting the cover and content declaration`
      }
    },
    publisherRemoteReady: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Details are ready for manual review and publishing`
      }
    },
    publisherRemoteScheduledReady: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Details and schedule are ready for manual review and publishing`
      }
    },
    publisherRemoteAllReady: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `All accounts are ready for manual review and publishing`
      }
    },
    publisherRemoteAllScheduledReady: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `All account details and schedules are ready for manual review and publishing`
      }
    },
    publisherRemoteTaskCancelled: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Task cancelled`
      }
    },
    publisherRemoteTaskCancelledWindows: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Task cancelled and publishing windows closed`
      }
    },
    publisherRemoteChromeUnavailable: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `No usable Google Chrome installation was found. Install or update Chrome and try again.`
      }
    },
    publisherRemoteFileUnavailable: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `The video or cover was moved or deleted. Choose the files again.`
      }
    },
    publisherRemoteLoginInvalid: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `This account's sign-in expired. Sign in again from platform account management.`
      }
    },
    clipboardAssistantToolName: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Clipboard Assistant`
      }
    },
    clipboardAssistantToolDescription: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Keeps the text you copy, opens a quick panel with a shortcut, and copies history or saved phrases in one click.`
      }
    },
    clipboardAssistantKicker: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `LOCAL CLIPBOARD`
      }
    },
    clipboardAssistantHeroDesc: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3,
          v: `Copied text stays on this computer. Press `
        }, {
          t: 4,
          k: `shortcut`
        }, {
          t: 3,
          v: ` in any app to open the panel and copy an item back to the clipboard. Images and files are never saved.`
        }]
      }
    },
    clipboardAssistantRecordTitle: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Save copied text`
      }
    },
    clipboardAssistantRecordDesc: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Plain text only. Content marked private by password managers is skipped.`
      }
    },
    clipboardAssistantShortcutTitle: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Panel shortcut`
      }
    },
    clipboardAssistantShortcutDesc: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Click the keys to change them. Press the shortcut in any app to open the panel.`
      }
    },
    clipboardAssistantShortcutDisabledHint: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Works after you turn on "Save copied text".`
      }
    },
    clipboardAssistantShortcutChange: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Click to change the shortcut`
      }
    },
    clipboardAssistantShortcutReset: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Reset`
      }
    },
    clipboardAssistantShortcutPress: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Press keys…`
      }
    },
    clipboardAssistantShortcutInvalid: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Use 1–2 modifiers (including Ctrl, Alt or ⌘) plus a letter. Press Esc to cancel.`
      }
    },
    clipboardAssistantShortcutSaved: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Shortcut updated`
      }
    },
    clipboardAssistantShortcutInactive: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3,
          v: `Shortcut not active: `
        }, {
          t: 4,
          k: `reason`
        }]
      }
    },
    clipboardAssistantTimelineTitle: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Sync to timeline`
      }
    },
    clipboardAssistantTimelineDesc: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Also adds copied text to the timeline under "Clipboard" without using record quota. Timeline records sync to the cloud.`
      }
    },
    clipboardAssistantTimelineCloudBadge: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Uploads to cloud`
      }
    },
    clipboardAssistantRetentionTitle: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Keep history for`
      }
    },
    clipboardAssistantRetentionDesc: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Older items are deleted automatically. Pinned items are always kept.`
      }
    },
    clipboardAssistantRetentionForever: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Forever`
      }
    },
    clipboardAssistantRetentionDays: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 4,
          k: `n`
        }, {
          t: 3,
          v: ` days`
        }]
      }
    },
    clipboardAssistantRetentionYear: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `1 year`
      }
    },
    clipboardAssistantTabHistory: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Clipboard history`
      }
    },
    clipboardAssistantTabPhrases: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Phrases`
      }
    },
    clipboardAssistantSearchPlaceholder: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Search clipboard history`
      }
    },
    clipboardAssistantClearSearch: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Clear search`
      }
    },
    clipboardAssistantClearHistory: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Clear history`
      }
    },
    clipboardAssistantNewPhrase: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `New phrase`
      }
    },
    clipboardAssistantHistoryEmpty: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `No clipboard items yet`
      }
    },
    clipboardAssistantHistoryEmptyDesc: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Copy some text and it will show up here.`
      }
    },
    clipboardAssistantHistoryDisabledDesc: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Turn on "Save copied text" and copied text will show up here.`
      }
    },
    clipboardAssistantHistoryNoMatch: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `No matching items`
      }
    },
    clipboardAssistantPhrasesEmpty: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `No phrases yet`
      }
    },
    clipboardAssistantPhrasesEmptyDesc: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Save replies, addresses or signatures you use often and copy them from the panel in one click.`
      }
    },
    clipboardAssistantCharacters: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 4,
          k: `n`
        }, {
          t: 3,
          v: ` chars`
        }]
      }
    },
    clipboardAssistantCopyCount: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3,
          v: `Copied `
        }, {
          t: 4,
          k: `n`
        }, {
          t: 3,
          v: ` times`
        }]
      }
    },
    clipboardAssistantUseCount: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3,
          v: `Used `
        }, {
          t: 4,
          k: `n`
        }, {
          t: 3,
          v: ` times`
        }]
      }
    },
    clipboardAssistantCopy: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Copy`
      }
    },
    clipboardAssistantCopied: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Copied to clipboard`
      }
    },
    clipboardAssistantPin: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Pin`
      }
    },
    clipboardAssistantUnpin: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Unpin`
      }
    },
    clipboardAssistantDelete: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Delete`
      }
    },
    clipboardAssistantEdit: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Edit`
      }
    },
    clipboardAssistantDragToSort: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Drag to reorder`
      }
    },
    clipboardAssistantLoading: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Loading…`
      }
    },
    clipboardAssistantLoadingMore: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Loading more…`
      }
    },
    clipboardAssistantYesterday: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Yesterday`
      }
    },
    clipboardAssistantPhraseEditorCreate: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `New phrase`
      }
    },
    clipboardAssistantPhraseEditorEdit: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Edit phrase`
      }
    },
    clipboardAssistantPhraseTitleLabel: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Title (optional)`
      }
    },
    clipboardAssistantPhraseTitlePlaceholder: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `e.g. Office address`
      }
    },
    clipboardAssistantPhraseContentLabel: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Content`
      }
    },
    clipboardAssistantPhraseContentPlaceholder: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Enter the text to copy`
      }
    },
    clipboardAssistantPhraseContentRequired: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Please enter the phrase content`
      }
    },
    clipboardAssistantPhraseSaveHint: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 4,
          k: `key`
        }, {
          t: 3,
          v: ` to save`
        }]
      }
    },
    clipboardAssistantSave: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Save`
      }
    },
    clipboardAssistantCancel: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Cancel`
      }
    },
    clipboardAssistantConfirmEnableTitle: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Save copied text?`
      }
    },
    clipboardAssistantConfirmEnableDesc: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Copied text (not images or files) will be saved on this computer, which may include accounts, verification codes or messages. Content marked private by password managers is skipped. You can turn this off or clear the history at any time.`
      }
    },
    clipboardAssistantConfirmEnableAction: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Turn on`
      }
    },
    clipboardAssistantConfirmTimelineTitle: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Sync to timeline and upload to the cloud?`
      }
    },
    clipboardAssistantConfirmTimelineDesc1: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Each piece of copied text will also be saved as a timeline record under "Clipboard", without using record quota.`
      }
    },
    clipboardAssistantConfirmTimelineDesc2: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Like other timeline records, they sync to the cloud (for example Mini Program sync), and AI features such as daily and weekly reports will read them.`
      }
    },
    clipboardAssistantConfirmTimelineDesc3: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Copied content may include passwords, verification codes, ID numbers or private messages. Only turn this on if you are fine with uploading it. Turning it off stops new records; existing ones must be deleted from the timeline manually.`
      }
    },
    clipboardAssistantConfirmTimelineAction: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `I understand, turn on`
      }
    },
    clipboardAssistantConfirmClearTitle: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Clear clipboard history?`
      }
    },
    clipboardAssistantConfirmClearDesc: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Unpinned items will be permanently deleted. Pinned items are kept, and records already synced to the timeline are not affected.`
      }
    },
    clipboardAssistantConfirmClearAction: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Clear`
      }
    },
    clipboardAssistantConfirmDeletePhraseTitle: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Delete this phrase?`
      }
    },
    clipboardAssistantConfirmDeletePhraseDesc: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `This cannot be undone.`
      }
    },
    clipboardAssistantConfirmDeleteAction: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Delete`
      }
    },
    clipboardAssistantOperationFailed: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Something went wrong. Please try again.`
      }
    },
    clipboardPickerSearchHistory: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Search clipboard history`
      }
    },
    clipboardPickerSearchPhrases: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Search phrases`
      }
    },
    clipboardPickerTabHistory: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `History`
      }
    },
    clipboardPickerTabPhrases: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Phrases`
      }
    },
    clipboardPickerEmptyHistory: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `No clipboard items yet. Copied text will show up here.`
      }
    },
    clipboardPickerEmptyPhrases: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `No phrases yet. Add some in Toolbox › Clipboard Assistant.`
      }
    },
    clipboardPickerNoMatch: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `No matches`
      }
    },
    clipboardPickerHintSelect: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Select`
      }
    },
    clipboardPickerHintCopy: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Copy`
      }
    },
    clipboardPickerHintSwitch: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Switch`
      }
    },
    clipboardPickerHintClose: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Close`
      }
    },
    clipboardPickerHintQuick: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Quick copy`
      }
    },
    clipboardPickerYesterday: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Yesterday`
      }
    },
    clipboardPickerCopyFailed: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Copy failed`
      }
    },
    clipboardPickerPreviewLabel: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Full text`
      }
    },
    clipboardPickerPreviewEmpty: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Hover an item on the left to see its full text`
      }
    },
    clipboardPickerPreviewTruncated: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3,
          v: `Long text, showing the first `
        }, {
          t: 4,
          k: `n`
        }, {
          t: 3,
          v: ` characters`
        }]
      }
    },
    clipboardPickerCharacters: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 4,
          k: `n`
        }, {
          t: 3,
          v: ` chars`
        }]
      }
    },
    clipboardPickerCopyCount: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3,
          v: `Copied `
        }, {
          t: 4,
          k: `n`
        }, {
          t: 3,
          v: ` times`
        }]
      }
    },
    clipboardPickerUseCount: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3,
          v: `Used `
        }, {
          t: 4,
          k: `n`
        }, {
          t: 3,
          v: ` times`
        }]
      }
    },
    widgetsCategory: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Widgets`
      }
    },
    desktopWidgetsSyncNote: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `These switches and options are the same as Settings → Tools. Changes in either place apply immediately.`
      }
    },
    desktopWidgetsMacAccessibility: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `macOS needs Accessibility permission before key presses can be detected.`
      }
    },
    desktopWidgetsGrantAccess: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Grant access`
      }
    },
    desktopWidgetsOn: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `On`
      }
    },
    desktopWidgetsOff: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Off`
      }
    },
    woodenFishToolName: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Wooden Fish`
      }
    },
    woodenFishToolDescription: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Tap a wooden fish to unwind. It can float on your desktop and be dragged anywhere.`
      }
    },
    woodenFishToolIntro: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Tap to unwind. It can float above everything on your desktop or stay inside the app. Right-click it for more options.`
      }
    },
    woodenFishStageHint: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Click the wooden fish to tap it. Merit is shared with the floating wooden fish.`
      }
    },
    woodenFishTodayMerit: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Merit today`
      }
    },
    woodenFishTotalMerit: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Total merit`
      }
    },
    woodenFishSoundDesc: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Play a crisp knock when you tap.`
      }
    },
    keyboardSoundToolName: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Keyboard Sounds`
      }
    },
    keyboardSoundToolDescription: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Play mechanical, phone or digital key sounds whenever you type in any app.`
      }
    },
    keyboardSoundToolIntro: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Play a key sound whenever you type in any app. Choose from mechanical switches, phone taps, a typewriter and more, or import your own.`
      }
    },
    keyboardSoundTypesHint: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Click a sound to switch to it and hear it. Use the play button to just preview.`
      }
    },
    keyboardSoundInUse: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `In use`
      }
    },
    keyboardSoundCustomTitle: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Custom sound`
      }
    },
    keyboardSoundCustomHint: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Use a local audio clip as your key sound.`
      }
    },
    keyboardSoundCustomUse: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Use`
      }
    },
    keyboardSoundTryTitle: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Try it`
      }
    },
    keyboardSoundTryHint: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Type a few keys here to hear the current sound and volume.`
      }
    },
    keyboardSoundTryPlaceholder: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Type here to try…`
      }
    },
    keyboardHeatmapToolName: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Key Heatmap`
      }
    },
    keyboardHeatmapToolDescription: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Count daily presses for each physical key and view them on the Heatmap page.`
      }
    },
    keyboardHeatmapToolIntro: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Counts daily presses for each physical key so you can see which keys you use most. Only counts are kept, never what you type.`
      }
    },
    keyboardHeatmapDataTitle: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Statistics`
      }
    },
    keyboardHeatmapOpenPage: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Open in Heatmap`
      }
    },
    keyboardHeatmapPreviewTitle: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Your keyboard heatmap will appear here once it's on`
      }
    },
    keyboardHeatmapPreviewDesc: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `This is a sample. Darker keys are pressed more often.`
      }
    },
    keyboardHeatmapSample: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Sample`
      }
    },
    keyboardHeatmapPointCountTitle: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Counts only`
      }
    },
    keyboardHeatmapPointCountDesc: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Records how many times each physical key is pressed per day. Holding a key down counts once.`
      }
    },
    keyboardHeatmapPointPrivacyTitle: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `No content`
      }
    },
    keyboardHeatmapPointPrivacyDesc: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Never records typed text, key order, exact times, windows or apps.`
      }
    },
    keyboardHeatmapPointLocalTitle: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Stays on this device`
      }
    },
    keyboardHeatmapPointLocalDesc: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Saved in this account's local database and never uploaded.`
      }
    },
    keyboardHeatmapEnableAction: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Turn on`
      }
    },
    mouseHeatmapToolName: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Mouse Heatmap`
      }
    },
    mouseHeatmapToolDescription: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Count daily left and right clicks and scrolls, and map where your cursor goes on screen.`
      }
    },
    mouseHeatmapToolIntro: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `See where you click most, how your left and right clicks split and how much you scroll. Only counts and rough positions are kept, never content.`
      }
    },
    mouseHeatmapDataTitle: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Stats`
      }
    },
    mouseHeatmapOpenPage: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `View in Heatmap`
      }
    },
    mouseHeatmapPreviewTitle: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Your mouse heatmap will appear here`
      }
    },
    mouseHeatmapPreviewDesc: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `This is a sample. Darker areas mean more clicks.`
      }
    },
    mouseHeatmapSample: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Sample`
      }
    },
    mouseHeatmapPointCountTitle: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Clicks and scrolls`
      }
    },
    mouseHeatmapPointCountDesc: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Counts daily left and right clicks and scrolls. Positions are only tallied per screen grid cell`
      }
    },
    mouseHeatmapPointPrivacyTitle: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `No content recorded`
      }
    },
    mouseHeatmapPointPrivacyDesc: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Click times, windows, apps and screen content are never stored`
      }
    },
    mouseHeatmapPointLocalTitle: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Stays on this device`
      }
    },
    mouseHeatmapPointLocalDesc: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Data is saved in the current account's local database and never uploaded`
      }
    },
    mouseHeatmapEnableAction: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Turn on`
      }
    },
    screenshotToolName: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Screenshot Beautifier`
      }
    },
    screenshotToolDescription: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Adds a background, rounded corners and a shadow to every screenshot, with markup, pixelate, pins and text recognition.`
      }
    },
    screenshotKicker: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Local screenshots`
      }
    },
    screenshotHeroDesc: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Screenshots get a background, rounded corners and a shadow automatically, ready to paste anywhere. Mark them up, pixelate private details, pin them to the desktop or pull out the text. Everything runs on this computer; screenshots are never uploaded and do not use record quota.`
      }
    },
    screenshotImportImage: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Open Image`
      }
    },
    screenshotStartCapture: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Take Screenshot`
      }
    },
    screenshotPermissionMissing: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `macOS needs Screen Recording permission before screenshots can be taken.`
      }
    },
    screenshotPermissionOpen: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Grant Access`
      }
    },
    screenshotStepCapture: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Press the shortcut`
      }
    },
    screenshotStepCaptureKey: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 4,
          k: `shortcut`
        }]
      }
    },
    screenshotStepSelect: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Click a window or drag an area`
      }
    },
    screenshotStepSelectKey: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Arrow keys fine-tune the area`
      }
    },
    screenshotStepBeautify: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Beautified, ready to mark up`
      }
    },
    screenshotStepCopy: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Copy and paste anywhere`
      }
    },
    screenshotDropTitle: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Drop or paste an image to beautify`
      }
    },
    screenshotDropHint: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3,
          v: `PNG, JPG or WebP. You can also press `
        }, {
          t: 4,
          k: `modifier`
        }, {
          t: 3,
          v: `V on this page.`
        }]
      }
    },
    screenshotShortcutTitle: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Screenshot shortcut`
      }
    },
    screenshotShortcutDesc: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Press it in any app to take a screenshot. Click the keys to change them; letters, digits and F1–F12 are supported.`
      }
    },
    screenshotShortcutOffDesc: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Turn on to take screenshots from any app. While off, use Take Screenshot above or the tray menu.`
      }
    },
    screenshotShortcutChange: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Click to change the shortcut`
      }
    },
    screenshotShortcutPress: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Press keys…`
      }
    },
    screenshotShortcutReset: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Reset`
      }
    },
    screenshotShortcutSaved: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Shortcut updated`
      }
    },
    screenshotShortcutInvalid: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Letters and digits need Ctrl, Alt or ⌘; F1–F12 can be used alone. Common keys such as Ctrl+C cannot be used.`
      }
    },
    screenshotShortcutInactive: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3,
          v: `Shortcut not active: `
        }, {
          t: 4,
          k: `reason`
        }]
      }
    },
    screenshotAfterCaptureTitle: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `After pressing Enter`
      }
    },
    screenshotAfterCaptureEditor: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Open the editor`
      }
    },
    screenshotAfterCaptureCopy: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Copy beautified image`
      }
    },
    screenshotAfterCaptureEditorDesc: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Adjust the style and add markup in the editor, then press Enter to copy and close.`
      }
    },
    screenshotAfterCaptureCopyDesc: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Copies the image right away with your last style. Click the card in the corner to edit it.`
      }
    },
    screenshotAutoCopyTitle: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Copy when the editor opens`
      }
    },
    screenshotAutoCopyDesc: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Puts the beautified image on the clipboard as soon as the editor opens, so you can paste without changing anything.`
      }
    },
    screenshotSaveDirectoryTitle: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Save location`
      }
    },
    screenshotSaveDirectoryChange: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Change`
      }
    },
    screenshotSaveDirectoryReset: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Reset`
      }
    },
    screenshotSaveDirectoryOpen: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Open Folder`
      }
    },
    screenshotHistoryLimitTitle: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Screenshot history`
      }
    },
    screenshotHistoryLimitDesc: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Kept on this computer so you can reopen and keep editing. The oldest are removed beyond the limit.`
      }
    },
    screenshotHistoryLimitOff: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Off`
      }
    },
    screenshotHistoryLimitCount: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3,
          v: `Last `
        }, {
          t: 4,
          k: `n`
        }]
      }
    },
    screenshotHistoryTitle: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Recent screenshots`
      }
    },
    screenshotHistoryClear: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Clear`
      }
    },
    screenshotHistoryEmpty: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `No screenshots yet`
      }
    },
    screenshotHistoryEmptyDesc: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Screenshots and imported images appear here. Click one to keep editing.`
      }
    },
    screenshotHistoryOffDesc: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `History is turned off.`
      }
    },
    screenshotHistoryOpen: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Open in editor`
      }
    },
    screenshotHistoryCopyOutput: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Copy the last exported image`
      }
    },
    screenshotHistoryCopySource: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Copy original`
      }
    },
    screenshotHistoryDelete: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Delete`
      }
    },
    screenshotHistoryCopied: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Copied to clipboard`
      }
    },
    screenshotHistoryClearTitle: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Clear screenshot history?`
      }
    },
    screenshotHistoryClearDesc: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `All history on this computer will be deleted. Images already saved to folders are not affected.`
      }
    },
    screenshotHistoryClearAction: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Clear`
      }
    },
    screenshotPrivacyNote: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Capturing, beautifying, markup and text recognition all happen on this computer. Nothing is uploaded or added to your timeline.`
      }
    },
    screenshotLoading: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Loading…`
      }
    },
    screenshotCancel: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Cancel`
      }
    },
    screenshotYesterday: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Yesterday`
      }
    },
    screenshotOperationFailed: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Something went wrong. Please try again.`
      }
    },
    screenshotImportNotImage: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Please choose an image file`
      }
    },
    screenshotImportTooLarge: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `The image is too large. Please choose one under 40 MB.`
      }
    },
    screenshotOverlayHint: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Click a window or drag an area · Esc to exit`
      }
    },
    screenshotOverlayBeautify: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Beautify`
      }
    },
    screenshotOverlayBeautifyCopy: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Beautify & Copy`
      }
    },
    screenshotOverlayCopy: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Copy original`
      }
    },
    screenshotOverlayPin: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Pin to desktop`
      }
    },
    screenshotOverlayOcr: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Recognize text`
      }
    },
    screenshotOverlaySave: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Save`
      }
    },
    screenshotOverlayCancel: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Cancel`
      }
    },
    screenshotOverlayCopyColorHint: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Press C to copy color`
      }
    },
    screenshotOverlayColorCopied: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3,
          v: `Copied `
        }, {
          t: 4,
          k: `color`
        }]
      }
    },
    screenshotEditorTitle: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Screenshot Beautifier`
      }
    },
    screenshotEditorLoading: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Opening screenshot…`
      }
    },
    screenshotToolSelect: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Select`
      }
    },
    screenshotToolRect: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Rectangle`
      }
    },
    screenshotToolEllipse: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Ellipse`
      }
    },
    screenshotToolArrow: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Arrow`
      }
    },
    screenshotToolLine: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Line`
      }
    },
    screenshotToolPen: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Pen`
      }
    },
    screenshotToolHighlighter: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Highlighter`
      }
    },
    screenshotToolText: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Text`
      }
    },
    screenshotToolNumber: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Step number`
      }
    },
    screenshotToolMosaic: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Pixelate`
      }
    },
    screenshotSizeSmall: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Thin`
      }
    },
    screenshotSizeMedium: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Medium`
      }
    },
    screenshotSizeLarge: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Thick`
      }
    },
    screenshotUndo: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Undo`
      }
    },
    screenshotRedo: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Redo`
      }
    },
    screenshotDelete: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Delete selected markup`
      }
    },
    screenshotTextPlaceholder: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Type text`
      }
    },
    screenshotStatusIdle: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Press Enter to copy and close`
      }
    },
    screenshotStatusCopied: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Copied to clipboard, ready to paste`
      }
    },
    screenshotStatusChanged: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Changed since the last copy. Press Enter to copy again.`
      }
    },
    screenshotStatusExporting: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Creating image…`
      }
    },
    screenshotActionCopy: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Copy`
      }
    },
    screenshotActionCopyHint: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Enter to copy and close`
      }
    },
    screenshotActionSave: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Save`
      }
    },
    screenshotActionSaveToFolder: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Save to screenshot folder`
      }
    },
    screenshotActionSaveAs: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Save As…`
      }
    },
    screenshotActionPin: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Pin to desktop`
      }
    },
    screenshotActionSendToBot: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Send to AI Mate`
      }
    },
    screenshotActionFailed: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Something went wrong. Please try again.`
      }
    },
    screenshotToastCopied: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Copied`
      }
    },
    screenshotToastSaved: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3,
          v: `Saved `
        }, {
          t: 4,
          k: `name`
        }]
      }
    },
    screenshotToastReveal: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Show in folder`
      }
    },
    screenshotToastPinned: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Pinned to desktop`
      }
    },
    screenshotToastFailed: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3,
          v: `Failed: `
        }, {
          t: 4,
          k: `reason`
        }]
      }
    },
    screenshotTabStyle: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Style`
      }
    },
    screenshotTabText: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Text`
      }
    },
    screenshotStyleEnabled: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Beautify`
      }
    },
    screenshotStyleEnabledDesc: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Turn off to export only the screenshot and markup`
      }
    },
    screenshotPresets: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Presets`
      }
    },
    screenshotPresetSave: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Save current style`
      }
    },
    screenshotPresetNamePlaceholder: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Preset name`
      }
    },
    screenshotPresetSaveConfirm: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Save`
      }
    },
    screenshotPresetSaved: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Preset saved`
      }
    },
    screenshotPresetDelete: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Delete preset`
      }
    },
    screenshotPresetSoft: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Soft blur`
      }
    },
    screenshotPresetClean: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Clean gray`
      }
    },
    screenshotPresetWindow: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Window`
      }
    },
    screenshotPresetDark: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Dark`
      }
    },
    screenshotPresetBrand: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Mint`
      }
    },
    screenshotPresetPlain: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `No background`
      }
    },
    screenshotBackground: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Background`
      }
    },
    screenshotBackgroundBlur: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Blur`
      }
    },
    screenshotBackgroundSolid: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Solid`
      }
    },
    screenshotBackgroundGradient: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Gradient`
      }
    },
    screenshotBackgroundTransparent: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `None`
      }
    },
    screenshotBackgroundImage: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Image`
      }
    },
    screenshotBackgroundChooseImage: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Choose image`
      }
    },
    screenshotBackgroundLoadSystem: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Load system wallpapers`
      }
    },
    screenshotBackgroundLoading: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Loading…`
      }
    },
    screenshotBackgroundImageEmptyHint: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Choose an image, or load system wallpapers from the top right.`
      }
    },
    screenshotBackgroundImageDesc: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Local images only, not uploaded. Your choice is saved.`
      }
    },
    screenshotBackgroundSystemEmpty: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `No system wallpapers found.`
      }
    },
    screenshotBackgroundImageFailed: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Unable to read this image. Please choose another.`
      }
    },
    screenshotBackgroundBlurDesc: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Uses a blurred copy of the screenshot, so the colors always match.`
      }
    },
    screenshotBackgroundTransparentDesc: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Exports a PNG with a transparent background, keeping the rounded corners and shadow.`
      }
    },
    screenshotCustomColor: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Custom color`
      }
    },
    screenshotPadding: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Padding`
      }
    },
    screenshotRadius: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Corners`
      }
    },
    screenshotShadow: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Shadow`
      }
    },
    screenshotFrame: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Window frame`
      }
    },
    screenshotFrameNone: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `None`
      }
    },
    screenshotFrameMacLight: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Light window`
      }
    },
    screenshotFrameMacDark: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Dark window`
      }
    },
    screenshotFrameBrowserLight: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Light browser`
      }
    },
    screenshotFrameBrowserDark: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Dark browser`
      }
    },
    screenshotRatio: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Aspect ratio`
      }
    },
    screenshotRatioAuto: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Auto`
      }
    },
    screenshotBalance: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Auto balance`
      }
    },
    screenshotBalanceDesc: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Trims plain margins around the screenshot and centers the content evenly`
      }
    },
    screenshotOcrHint: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Recognizes text on this computer. Nothing is uploaded and no credits are used.`
      }
    },
    screenshotOcrUnsupported: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Text recognition is not supported on this system.`
      }
    },
    screenshotOcrRun: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Recognize Text`
      }
    },
    screenshotOcrRerun: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Recognize Again`
      }
    },
    screenshotOcrRunning: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Recognizing…`
      }
    },
    screenshotOcrEmpty: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `No text found`
      }
    },
    screenshotOcrCopy: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Copy All`
      }
    },
    screenshotOcrCopied: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Text copied`
      }
    },
    screenshotToastCardCopied: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Copied to clipboard`
      }
    },
    screenshotToastCardSaved: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Saved to screenshot folder`
      }
    },
    screenshotToastCardEdit: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Edit`
      }
    },
    screenshotToastCardPin: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Pin to desktop`
      }
    },
    screenshotToastCardClose: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Close`
      }
    },
    workMotivatorToolName: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Work Motivator`
      }
    },
    workMotivatorToolDescription: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Watch today's earnings tick up live, with a clock-out countdown and savings goals, floating on your desktop.`
      }
    },
    workMotivatorToolIntro: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Set your pay and working hours, and a mechanical counter on your desktop rolls up what you've earned today, second by second. It also shows a clock-out countdown, hours worked and your savings goal. Double-click it to expand or collapse; right-click for more options.`
      }
    },
    workMotivatorPrivacyNote: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Pay, goals and countdowns are stored only on this computer. They are included in full backups and JSON exports, and never uploaded to the cloud.`
      }
    },
    workMotivatorHiddenForSession: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Hidden for now. It will come back after the app restarts.`
      }
    },
    workMotivatorShowAgain: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Show again`
      }
    },
    workMotivatorClickThroughOnHint: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Click-through is on, so the widget ignores clicks. Turn it off here.`
      }
    },
    workMotivatorClickThroughOff: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Turn off`
      }
    },
    workMotivatorEarned: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Earned today`
      }
    },
    workMotivatorEarnedWeek: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Earned this week`
      }
    },
    workMotivatorEarnedMonth: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Earned this month`
      }
    },
    workMotivatorHourlyRate: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 4,
          k: `amount`
        }, {
          t: 3,
          v: `/h`
        }]
      }
    },
    workMotivatorStatusRest: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Day off`
      }
    },
    workMotivatorStatusBefore: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Not started`
      }
    },
    workMotivatorStatusWorking: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `At work`
      }
    },
    workMotivatorStatusLunch: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Lunch break`
      }
    },
    workMotivatorStatusOvertime: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Overtime`
      }
    },
    workMotivatorStatusOff: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Off work`
      }
    },
    workMotivatorToOffWork: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 4,
          k: `time`
        }, {
          t: 3,
          v: ` to clock-out`
        }]
      }
    },
    workMotivatorToStart: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 4,
          k: `time`
        }, {
          t: 3,
          v: ` to start`
        }]
      }
    },
    workMotivatorToLunchEnd: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 4,
          k: `time`
        }, {
          t: 3,
          v: ` of break left`
        }]
      }
    },
    workMotivatorOvertimeFor: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 4,
          k: `time`
        }, {
          t: 3,
          v: ` overtime`
        }]
      }
    },
    workMotivatorDurationDH: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 4,
          k: `d`
        }, {
          t: 3,
          v: `d `
        }, {
          t: 4,
          k: `h`
        }, {
          t: 3,
          v: `h`
        }]
      }
    },
    workMotivatorDurationHM: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 4,
          k: `h`
        }, {
          t: 3,
          v: `h `
        }, {
          t: 4,
          k: `m`
        }, {
          t: 3,
          v: `m`
        }]
      }
    },
    workMotivatorDurationM: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 4,
          k: `m`
        }, {
          t: 3,
          v: `m`
        }]
      }
    },
    workMotivatorDateLabel: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 4,
          k: `weekday`
        }, {
          t: 3,
          v: `, `
        }, {
          t: 4,
          k: `monthName`
        }, {
          t: 3,
          v: ` `
        }, {
          t: 4,
          k: `day`
        }]
      }
    },
    workMotivatorWishTitle: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3,
          v: `Goal · `
        }, {
          t: 4,
          k: `name`
        }]
      }
    },
    workMotivatorWishRemaining: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 4,
          k: `time`
        }, {
          t: 3,
          v: ` more work to get it`
        }]
      }
    },
    workMotivatorWishDone: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `You've saved enough. Go for it!`
      }
    },
    workMotivatorWishEmpty: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `No goal yet`
      }
    },
    workMotivatorWishEmptyHint: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Add one in settings to stay motivated`
      }
    },
    workMotivatorWorkHours: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Hours today`
      }
    },
    workMotivatorWorkHoursValue: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 4,
          k: `worked`
        }, {
          t: 3,
          v: ` / `
        }, {
          t: 4,
          k: `total`
        }, {
          t: 3,
          v: ` h worked`
        }]
      }
    },
    workMotivatorDailyHours: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 4,
          k: `hours`
        }, {
          t: 3,
          v: ` h a day, lunch excluded`
        }]
      }
    },
    workMotivatorCountdownWeekendToday: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Day off. Enjoy it`
      }
    },
    workMotivatorCountdownWeekendTomorrow: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Day off tomorrow`
      }
    },
    workMotivatorCountdownWeekend: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 4,
          k: `days`
        }, {
          t: 3,
          v: ` days to the weekend`
        }]
      }
    },
    workMotivatorCountdownPaydayToday: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Payday today`
      }
    },
    workMotivatorCountdownPayday: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 4,
          k: `days`
        }, {
          t: 3,
          v: ` days to payday`
        }]
      }
    },
    workMotivatorCountdownCustom: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 4,
          k: `days`
        }, {
          t: 3,
          v: ` days to `
        }, {
          t: 4,
          k: `name`
        }]
      }
    },
    workMotivatorCountdownCustomToday: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 4,
          k: `name`
        }, {
          t: 3,
          v: ` is today`
        }]
      }
    },
    workMotivatorCountdownCustomPast: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 4,
          k: `name`
        }, {
          t: 3,
          v: ` was `
        }, {
          t: 4,
          k: `days`
        }, {
          t: 3,
          v: ` days ago`
        }]
      }
    },
    workMotivatorAmountHidden: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Amount hidden`
      }
    },
    workMotivatorPeriodEarned: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3,
          v: `This month `
        }, {
          t: 4,
          k: `month`
        }, {
          t: 3,
          v: ` · This year `
        }, {
          t: 4,
          k: `year`
        }]
      }
    },
    workMotivatorButtonPin: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Always on top`
      }
    },
    workMotivatorButtonUnpin: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Unpin`
      }
    },
    workMotivatorButtonHideAmount: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Hide amount`
      }
    },
    workMotivatorButtonShowAmount: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Show amount`
      }
    },
    workMotivatorButtonExpand: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Expand`
      }
    },
    workMotivatorButtonCollapse: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Collapse`
      }
    },
    workMotivatorButtonSettings: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Settings`
      }
    },
    workMotivatorButtonClose: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Hide for now`
      }
    },
    workMotivatorSalarySection: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Pay and working hours`
      }
    },
    workMotivatorSalary: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Pay`
      }
    },
    workMotivatorSalaryDesc: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Monthly, daily or hourly, before or after tax`
      }
    },
    workMotivatorSalaryMonthly: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Monthly`
      }
    },
    workMotivatorSalaryDaily: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Daily`
      }
    },
    workMotivatorSalaryHourly: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Hourly`
      }
    },
    workMotivatorMonthBasis: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Monthly pay basis`
      }
    },
    workMotivatorMonthBasisDesc: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `How monthly pay is split across workdays`
      }
    },
    workMotivatorMonthBasisStandard: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `21.75 days (statutory)`
      }
    },
    workMotivatorMonthBasisActual: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Actual workdays that month`
      }
    },
    workMotivatorMonthBasisCustom: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Custom days`
      }
    },
    workMotivatorCustomMonthDays: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Paid days per month`
      }
    },
    workMotivatorCustomMonthDaysUnit: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `d`
      }
    },
    workMotivatorCustomMonthDaysInvalid: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Enter a number of days from 1 to 31`
      }
    },
    workMotivatorWorkTime: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Working hours`
      }
    },
    workMotivatorStartTime: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Start time`
      }
    },
    workMotivatorEndTime: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `End time`
      }
    },
    workMotivatorLunch: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Lunch break`
      }
    },
    workMotivatorLunchDesc: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Unpaid and not counted as work time`
      }
    },
    workMotivatorLunchInvalid: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Lunch start and end can't be the same`
      }
    },
    workMotivatorLunchStart: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Lunch starts`
      }
    },
    workMotivatorLunchEnd: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Lunch ends`
      }
    },
    workMotivatorWeekPattern: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Workdays`
      }
    },
    workMotivatorWeekPatternDesc: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Days off are unpaid`
      }
    },
    workMotivatorWeekAlternateDesc: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Six days one week, five the next, alternating`
      }
    },
    workMotivatorWeekDouble: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Mon–Fri`
      }
    },
    workMotivatorWeekSingle: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Mon–Sat`
      }
    },
    workMotivatorWeekAlternate: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Alternating`
      }
    },
    workMotivatorThisWeekBig: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `6-day week now`
      }
    },
    workMotivatorThisWeekSmall: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `5-day week now`
      }
    },
    workMotivatorOvertime: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `After hours`
      }
    },
    workMotivatorOvertimeDesc: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Counts up to 6 hours`
      }
    },
    workMotivatorOvertimeStop: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Stop counting`
      }
    },
    workMotivatorOvertimeFactor: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3,
          v: `Keep counting at `
        }, {
          t: 4,
          k: `factor`
        }, {
          t: 3,
          v: `x`
        }]
      }
    },
    workMotivatorOvertimeCustom: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Custom rate`
      }
    },
    workMotivatorOvertimeCustomFactor: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Overtime rate`
      }
    },
    workMotivatorOvertimeCustomUnit: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `x`
      }
    },
    workMotivatorOvertimeCustomInvalid: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Enter a rate from 0.1 to 10`
      }
    },
    workMotivatorPayday: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Payday`
      }
    },
    workMotivatorPaydayDesc: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Used for the payday countdown; falls back to month end`
      }
    },
    workMotivatorPaydayOption: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3,
          v: `Day `
        }, {
          t: 4,
          k: `day`
        }]
      }
    },
    workMotivatorWishSection: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Savings goals`
      }
    },
    workMotivatorWishSectionDesc: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Set a goal and see how much more work it takes`
      }
    },
    workMotivatorWishAdd: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Add goal`
      }
    },
    workMotivatorWishName: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Goal`
      }
    },
    workMotivatorWishNamePlaceholder: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `e.g. Weekend trip`
      }
    },
    workMotivatorWishAmount: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Target amount`
      }
    },
    workMotivatorWishAmountPlaceholder: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `e.g. 3000`
      }
    },
    workMotivatorWishSaved: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Already saved (optional)`
      }
    },
    workMotivatorWishStartDate: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Start saving from`
      }
    },
    workMotivatorWishFormHint: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Earnings add up from the start date, based on your pay and workdays`
      }
    },
    workMotivatorWishNameRequired: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Enter a goal name`
      }
    },
    workMotivatorWishAmountInvalid: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Enter a valid amount`
      }
    },
    workMotivatorWishListEmpty: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `No goals yet. Add one.`
      }
    },
    workMotivatorWishShown: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `On widget`
      }
    },
    workMotivatorWishShow: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Show on widget`
      }
    },
    workMotivatorWishComplete: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Mark as done`
      }
    },
    workMotivatorWishCompleted: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3,
          v: `Completed goals (`
        }, {
          t: 4,
          k: `count`
        }, {
          t: 3,
          v: `)`
        }]
      }
    },
    workMotivatorWishReopen: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Mark as in progress`
      }
    },
    workMotivatorCancel: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Cancel`
      }
    },
    workMotivatorSave: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Save`
      }
    },
    workMotivatorEdit: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Edit`
      }
    },
    workMotivatorDelete: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Delete`
      }
    },
    workMotivatorCountdownSection: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Countdown`
      }
    },
    workMotivatorCountdownSectionDesc: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `One is shown at the bottom of the expanded widget`
      }
    },
    workMotivatorCountdownNone: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `None`
      }
    },
    workMotivatorCountdownShowWeekend: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `To the weekend`
      }
    },
    workMotivatorCountdownShowPayday: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `To payday`
      }
    },
    workMotivatorCountdownAdd: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Add countdown`
      }
    },
    workMotivatorCountdownName: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Name`
      }
    },
    workMotivatorCountdownNamePlaceholder: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `e.g. Holiday`
      }
    },
    workMotivatorCountdownDate: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Date`
      }
    },
    workMotivatorCountdownNameRequired: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Enter a name and date`
      }
    },
    workMotivatorFinish: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Finish`
      }
    },
    workMotivatorFinishGraphite: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Graphite`
      }
    },
    workMotivatorFinishSilver: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Silver`
      }
    },
    workMotivatorFinishSlate: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Slate`
      }
    },
    workMotivatorFinishForest: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Forest`
      }
    },
    workMotivatorFinishCocoa: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Cocoa`
      }
    },
    workMotivatorFinishIvory: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Ivory`
      }
    },
    workMotivatorSize: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Size`
      }
    },
    workMotivatorSizeSmall: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `S`
      }
    },
    workMotivatorSizeMedium: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `M`
      }
    },
    workMotivatorSizeLarge: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `L`
      }
    },
    workMotivatorOpacity: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Opacity`
      }
    },
    workMotivatorEarnedRange: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Earnings`
      }
    },
    workMotivatorEarnedRangeToday: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Today`
      }
    },
    workMotivatorEarnedRangeWeek: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Week`
      }
    },
    workMotivatorEarnedRangeMonth: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Month`
      }
    },
    workMotivatorEarnedRangeDesc: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Days before today count as full scheduled days, without overtime`
      }
    },
    workMotivatorDecimals: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Decimals`
      }
    },
    workMotivatorDecimalsOption: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 4,
          k: `count`
        }, {
          t: 3,
          v: ` decimal places`
        }]
      }
    },
    workMotivatorCurrency: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Currency`
      }
    },
    workMotivatorAlwaysOnTop: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Always on top`
      }
    },
    workMotivatorAlwaysOnTopDesc: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Keep the widget above other windows`
      }
    },
    workMotivatorExpanded: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Show details`
      }
    },
    workMotivatorExpandedDesc: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Time, status, goal and hours; collapsed shows only the counter`
      }
    },
    workMotivatorLocked: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Lock position`
      }
    },
    workMotivatorLockedDesc: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Prevent dragging`
      }
    },
    workMotivatorClickThrough: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Click-through`
      }
    },
    workMotivatorClickThroughDesc: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Clicks pass through the widget; turn it off here`
      }
    },
    workMotivatorCelebrate: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Earnings celebration`
      }
    },
    workMotivatorCelebrateDesc: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3,
          v: `Celebrates every `
        }, {
          t: 4,
          k: `amount`
        }, {
          t: 3,
          v: ` earned, getting bigger through the day (6 levels)`
        }]
      }
    },
    workMotivatorCelebrateAmount: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Celebrate every`
      }
    },
    workMotivatorCelebrateAmountInvalid: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Enter an amount greater than 0`
      }
    },
    workMotivatorCelebrateBurst: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3,
          v: `+`
        }, {
          t: 4,
          k: `amount`
        }]
      }
    },
    workMotivatorCelebrateMilestone: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 4,
          k: `amount`
        }, {
          t: 3,
          v: ` earned today`
        }]
      }
    },
    workMotivatorNotifyOffWork: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Clock-out reminder`
      }
    },
    workMotivatorNotifyOffWorkDesc: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Get a system notification at the end of the day`
      }
    },
    workMotivatorHideAmount: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Hide amount`
      }
    },
    workMotivatorHideAmountDesc: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Cover the numbers when someone walks by`
      }
    },
    workMotivatorShortcutTitle: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Hide/show shortcut`
      }
    },
    workMotivatorShortcutChange: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Click, then press a new key combination`
      }
    },
    workMotivatorShortcutPress: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Press keys`
      }
    },
    workMotivatorShortcutNone: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Not set`
      }
    },
    workMotivatorShortcutClear: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Clear`
      }
    },
    workMotivatorShortcutInvalid: {
      t: 0,
      b: {
        t: 2,
        i: [{
          t: 3
        }],
        s: `Use Ctrl, Alt or ⌘ plus a letter, but not common shortcuts like copy or paste`
      }
    }
  };
export { Y as C, Gt as E, It as S, qt as T, vt as _, _t as a, Bt as b, mt as c, an as d, De as f, We as g, bt as h, wt as i, ht as l, Qt as m, on as n, $ as o, ut as p, Ae as r, en as s, sn as t, $t as u, yt as v, Ve as w, Ft as x, Nt as y };