(function () {
  let e = document.createElement(`link`).relList;
  if (e && e.supports && e.supports(`modulepreload`)) return;
  for (let e of document.querySelectorAll(`link[rel="modulepreload"]`)) n(e);
  new MutationObserver(e => {
    for (let t of e) if (t.type === `childList`) for (let e of t.addedNodes) e.tagName === `LINK` && e.rel === `modulepreload` && n(e);
  }).observe(document, {
    childList: true,
    subtree: true
  });
  function t(e) {
    let t = {};
    return e.integrity && (t.integrity = e.integrity), e.referrerPolicy && (t.referrerPolicy = e.referrerPolicy), t.credentials = e.crossOrigin === `use-credentials` ? `include` : e.crossOrigin === `anonymous` ? `omit` : `same-origin`, t;
  }
  function n(e) {
    if (e.ep) return;
    e.ep = true;
    let n = t(e);
    fetch(e.href, n);
  }
})();
function e(e) {
  let t = Object.create(null);
  for (let n of e.split(`,`)) t[n] = 1;
  return e => e in t;
}
var t = {},
  n = [],
  r = () => {},
  i = () => false,
  a = e => e.charCodeAt(0) === 111 && e.charCodeAt(1) === 110 && (e.charCodeAt(2) > 122 || e.charCodeAt(2) < 97),
  o = e => e.startsWith(`onUpdate:`),
  s = Object.assign,
  c = (e, t) => {
    let n = e.indexOf(t);
    n > -1 && e.splice(n, 1);
  },
  l = Object.prototype.hasOwnProperty,
  u = (e, t) => l.call(e, t),
  d = Array.isArray,
  f = e => S(e) === `[object Map]`,
  p = e => S(e) === `[object Set]`,
  m = e => S(e) === `[object Date]`,
  h = e => S(e) === `[object RegExp]`,
  g = e => typeof e == `function`,
  _ = e => typeof e == `string`,
  v = e => typeof e == `symbol`,
  y = e => typeof e == `object` && !!e,
  b = e => (y(e) || g(e)) && g(e.then) && g(e.catch),
  x = Object.prototype.toString,
  S = e => x.call(e),
  C = e => S(e).slice(8, -1),
  w = e => S(e) === `[object Object]`,
  T = e => _(e) && e !== `NaN` && e[0] !== `-` && `` + parseInt(e, 10) === e,
  E = e(`,key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted`),
  D = e => {
    let t = Object.create(null);
    return n => t[n] || (t[n] = e(n));
  },
  O = /-\w/g,
  k = D(e => e.replace(O, e => e.slice(1).toUpperCase())),
  ee = /\B([A-Z])/g,
  te = D(e => e.replace(ee, `-$1`).toLowerCase()),
  ne = D(e => e.charAt(0).toUpperCase() + e.slice(1)),
  re = D(e => e ? `on${ne(e)}` : ``),
  A = (e, t) => !Object.is(e, t),
  j = (e, ...t) => {
    for (let n = 0; n < e.length; n++) e[n](...t);
  },
  ie = (e, t, n, r = false) => {
    Object.defineProperty(e, t, {
      configurable: true,
      enumerable: false,
      writable: r,
      value: n
    });
  },
  ae = e => {
    let t = parseFloat(e);
    return isNaN(t) ? e : t;
  },
  oe = e => {
    let t = _(e) ? Number(e) : NaN;
    return isNaN(t) ? e : t;
  },
  se,
  ce = () => se ||= typeof globalThis < `u` ? globalThis : typeof self < `u` ? self : typeof window < `u` ? window : typeof global < `u` ? global : {},
  le = e(`Infinity,undefined,NaN,isFinite,isNaN,parseFloat,parseInt,decodeURI,decodeURIComponent,encodeURI,encodeURIComponent,Math,Number,Date,Array,Object,Boolean,String,RegExp,Map,Set,JSON,Intl,BigInt,console,Error,Symbol`);
function ue(e) {
  if (d(e)) {
    let t = {};
    for (let n = 0; n < e.length; n++) {
      let r = e[n],
        i = _(r) ? me(r) : ue(r);
      if (i) for (let e in i) t[e] = i[e];
    }
    return t;
  }
  if (_(e) || y(e)) return e;
}
var de = /;(?![^(]*\))/g,
  fe = /:([^]+)/,
  pe = /"(?:[^"\\]|\\[^])*"|'(?:[^'\\]|\\[^])*'|\\[^]|\/\*[^]*?\*\//g;
function me(e) {
  let t = {};
  return e.replace(pe, e => e.startsWith(`/*`) ? `` : e).split(de).forEach(e => {
    if (e) {
      let n = e.split(fe);
      n.length > 1 && (t[n[0].trim()] = n[1].trim());
    }
  }), t;
}
function he(e) {
  let t = ``;
  if (_(e)) t = e;else if (d(e)) for (let n = 0; n < e.length; n++) {
    let r = he(e[n]);
    r && (t += r + ` `);
  } else if (y(e)) for (let n in e) e[n] && (t += n + ` `);
  return t.trim();
}
function ge(e) {
  if (!e) return null;
  let {
    class: t,
    style: n
  } = e;
  return t && !_(t) && (e.class = he(t)), n && (e.style = ue(n)), e;
}
var _e = `itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly`,
  ve = e(_e);
_e + ``;
function ye(e) {
  return !!e || e === ``;
}
function be(e, t, n) {
  if (e.length !== t.length) return false;
  let r = true;
  for (let i = 0; r && i < e.length; i++) r = we(e[i], t[i], n);
  return r;
}
function xe(e, t, n) {
  if (e.size !== t.size) return false;
  let r = Array.from(t),
    i = new Uint8Array(r.length);
  for (let t of e) {
    let e = -1;
    for (let a = 0; a < r.length; a++) if (!i[a] && we(t, r[a], n)) {
      e = a;
      break;
    }
    if (e < 0) return false;
    i[e] = 1;
  }
  return true;
}
function Se(e, t, n) {
  let r = f(e),
    i = f(t);
  if (r || i || (r = p(e), i = p(t), r || i)) return r && i ? xe(e, t, n) : false;
  if (Object.keys(e).length !== Object.keys(t).length) return false;
  for (let r in e) {
    let i = e.hasOwnProperty(r),
      a = t.hasOwnProperty(r);
    if (i && !a || !i && a || !we(e[r], t[r], n)) return false;
  }
  return String(e) === String(t);
}
function Ce(e, t, n, r) {
  n ||= [new Map(), new Map()];
  let [i, a] = n;
  if (i.has(e) || a.has(t)) return i.get(e) === t && a.get(t) === e;
  i.set(e, t), a.set(t, e);
  let o = r(e, t, n);
  return i.delete(e), a.delete(t), o;
}
function we(e, t, n) {
  if (e === t) return true;
  let r = m(e),
    i = m(t);
  return r || i ? r && i ? e.getTime() === t.getTime() : false : (r = v(e), i = v(t), r || i ? e === t : (r = d(e), i = d(t), r || i ? r && i ? Ce(e, t, n, be) : false : (r = y(e), i = y(t), r || i ? !r || !i ? false : Ce(e, t, n, Se) : String(e) === String(t))));
}
function Te(e, t) {
  return e.findIndex(e => we(e, t));
}
var M = e => !!(e && e.__v_isRef === true),
  Ee = e => _(e) ? e : e == null ? `` : d(e) || y(e) && (e.toString === x || !g(e.toString)) ? M(e) ? Ee(e.value) : JSON.stringify(e, De, 2) : String(e),
  De = (e, t) => M(t) ? De(e, t.value) : f(t) ? {
    [`Map(${t.size})`]: [...t.entries()].reduce((e, [t, n], r) => (e[Oe(t, r) + ` =>`] = n, e), {})
  } : p(t) ? {
    [`Set(${t.size})`]: [...t.values()].map(e => Oe(e))
  } : v(t) ? Oe(t) : y(t) && !d(t) && !w(t) ? String(t) : t,
  Oe = (e, t = ``) => v(e) ? `Symbol(${e.description ?? t})` : e;
function ke(e) {
  return e == null ? `initial` : typeof e == `string` ? e === `` ? ` ` : e : String(e);
}
var N,
  Ae = class {
    constructor(e = false) {
      this.detached = e, this._active = true, this._on = 0, this.effects = [], this.cleanups = [], this._isPaused = false, this._warnOnRun = true, this.__v_skip = true, !e && N && (N.active ? (this.parent = N, this.index = (N.scopes || (N.scopes = [])).push(this) - 1) : (this._active = false, this._warnOnRun = false));
    }
    get active() {
      return this._active;
    }
    pause() {
      if (this._active) {
        this._isPaused = true;
        let e, t;
        if (this.scopes) {
          let n = this.scopes.slice();
          for (e = 0, t = n.length; e < t; e++) n[e].pause();
        }
        for (e = 0, t = this.effects.length; e < t; e++) this.effects[e].pause();
      }
    }
    resume() {
      if (this._active && this._isPaused) {
        this._isPaused = false;
        let e, t;
        if (this.scopes) {
          let n = this.scopes.slice();
          for (e = 0, t = n.length; e < t; e++) n[e].resume();
        }
        let n = this.effects.slice();
        for (e = 0, t = n.length; e < t; e++) n[e].resume();
      }
    }
    run(e) {
      if (this._active) {
        let t = N;
        try {
          return N = this, e();
        } finally {
          N = t;
        }
      }
    }
    on() {
      ++this._on === 1 && (this.prevScope = N, N = this);
    }
    off() {
      if (this._on > 0 && --this._on === 0) {
        if (N === this) N = this.prevScope;else {
          let e = N;
          for (; e;) {
            if (e.prevScope === this) {
              e.prevScope = this.prevScope;
              break;
            }
            e = e.prevScope;
          }
        }
        this.prevScope = undefined;
      }
    }
    stop(e) {
      if (this._active) {
        this._active = false;
        let t, n;
        for (t = 0, n = this.effects.length; t < n; t++) this.effects[t].stop();
        for (this.effects.length = 0, t = 0, n = this.cleanups.length; t < n; t++) this.cleanups[t]();
        if (this.cleanups.length = 0, this.scopes) {
          let e = this.scopes.slice();
          for (t = 0, n = e.length; t < n; t++) e[t].stop(true);
          this.scopes.length = 0;
        }
        if (!this.detached && this.parent && !e) {
          let e = this.parent.scopes.pop();
          e && e !== this && (this.parent.scopes[this.index] = e, e.index = this.index);
        }
        this.parent = undefined;
      }
    }
  };
function je(e) {
  return new Ae(e);
}
function Me() {
  return N;
}
function Ne(e, t = false) {
  N && N.cleanups.push(e);
}
var P,
  Pe = new WeakSet(),
  Fe = class {
    constructor(e) {
      this.fn = e, this.deps = undefined, this.depsTail = undefined, this.flags = 5, this.next = undefined, this.cleanup = undefined, this.scheduler = undefined, N && (N.active ? N.effects.push(this) : this.flags &= -2);
    }
    pause() {
      this.flags |= 64;
    }
    resume() {
      this.flags & 64 && (this.flags &= -65, Pe.has(this) && (Pe.delete(this), this.trigger()));
    }
    notify() {
      this.flags & 2 && !(this.flags & 32) || this.flags & 8 || ze(this);
    }
    run() {
      if (!(this.flags & 1)) return this.fn();
      this.flags |= 2, et(this), He(this);
      let e = P,
        t = Xe;
      P = this, Xe = true;
      try {
        return this.fn();
      } finally {
        Ue(this), P = e, Xe = t, this.flags &= -3;
      }
    }
    stop() {
      if (this.flags & 1) {
        for (let e = this.deps; e; e = e.nextDep) Ke(e);
        this.deps = this.depsTail = undefined, et(this), this.onStop && this.onStop(), this.flags &= -2;
      }
    }
    trigger() {
      this.flags & 64 ? Pe.add(this) : this.scheduler ? this.scheduler() : this.runIfDirty();
    }
    runIfDirty() {
      We(this) && this.run();
    }
    get dirty() {
      return We(this);
    }
  },
  Ie = 0,
  Le,
  Re;
function ze(e, t = false) {
  if (e.flags |= 8, t) {
    e.next = Re, Re = e;
    return;
  }
  e.next = Le, Le = e;
}
function Be() {
  Ie++;
}
function Ve() {
  if (--Ie > 0) return;
  if (Re) {
    let e = Re;
    for (Re = undefined; e;) {
      let t = e.next;
      e.next = undefined, e.flags &= -9, e = t;
    }
  }
  let e;
  for (; Le;) {
    let t = Le;
    for (Le = undefined; t;) {
      let n = t.next;
      if (t.next = undefined, t.flags &= -9, t.flags & 1) try {
        t.trigger();
      } catch (t) {
        e ||= t;
      }
      t = n;
    }
  }
  if (e) throw e;
}
function He(e) {
  for (let t = e.deps; t; t = t.nextDep) t.version = -1, t.prevActiveLink = t.dep.activeLink, t.dep.activeLink = t;
}
function Ue(e) {
  let t,
    n = e.depsTail,
    r = n;
  for (; r;) {
    let e = r.prevDep;
    r.version === -1 ? (r === n && (n = e), Ke(r), qe(r)) : t = r, r.dep.activeLink = r.prevActiveLink, r.prevActiveLink = undefined, r = e;
  }
  e.deps = t, e.depsTail = n;
}
function We(e) {
  for (let t = e.deps; t; t = t.nextDep) if (t.dep.version !== t.version || t.dep.computed && (Ge(t.dep.computed) || t.dep.version !== t.version)) return true;
  return !!e._dirty;
}
function Ge(e) {
  if (e.flags & 4 && !(e.flags & 16) || (e.flags &= -17, e.globalVersion === tt) || (e.globalVersion = tt, !e.isSSR && e.flags & 128 && (!e.deps && !e._dirty || !We(e)))) return;
  e.flags |= 2;
  let t = e.dep,
    n = P,
    r = Xe;
  P = e, Xe = true;
  try {
    He(e);
    let n = e.fn(e._value);
    (t.version === 0 || A(n, e._value)) && (e.flags |= 128, e._value = n, t.version++);
  } catch (e) {
    throw t.version++, e;
  } finally {
    P = n, Xe = r, Ue(e), e.flags &= -3;
  }
}
function Ke(e, t = false) {
  let {
    dep: n,
    prevSub: r,
    nextSub: i
  } = e;
  if (r && (r.nextSub = i, e.prevSub = undefined), i && (i.prevSub = r, e.nextSub = undefined), n.subs === e && (n.subs = r, !r && n.computed)) {
    n.computed.flags &= -5;
    for (let e = n.computed.deps; e; e = e.nextDep) Ke(e, true);
  }
  !t && ! --n.sc && n.map && n.map.delete(n.key);
}
function qe(e) {
  let {
    prevDep: t,
    nextDep: n
  } = e;
  t && (t.nextDep = n, e.prevDep = undefined), n && (n.prevDep = t, e.nextDep = undefined);
}
function Je(e, t) {
  e.effect instanceof Fe && (e = e.effect.fn);
  let n = new Fe(e);
  t && s(n, t);
  try {
    n.run();
  } catch (e) {
    throw n.stop(), e;
  }
  let r = n.run.bind(n);
  return r.effect = n, r;
}
function Ye(e) {
  e.effect.stop();
}
var Xe = true,
  Ze = [];
function Qe() {
  Ze.push(Xe), Xe = false;
}
function $e() {
  let e = Ze.pop();
  Xe = e === undefined || e;
}
function et(e) {
  let {
    cleanup: t
  } = e;
  if (e.cleanup = undefined, t) {
    let e = P;
    P = undefined;
    try {
      t();
    } finally {
      P = e;
    }
  }
}
var tt = 0,
  nt = class {
    constructor(e, t) {
      this.sub = e, this.dep = t, this.version = t.version, this.nextDep = this.prevDep = this.nextSub = this.prevSub = this.prevActiveLink = undefined;
    }
  },
  rt = class {
    constructor(e) {
      this.computed = e, this.version = 0, this.activeLink = undefined, this.subs = undefined, this.map = undefined, this.key = undefined, this.sc = 0, this.__v_skip = true;
    }
    track(e) {
      if (!P || !Xe || P === this.computed) return;
      let t = this.activeLink;
      if (t === undefined || t.sub !== P) t = this.activeLink = new nt(P, this), P.deps ? (t.prevDep = P.depsTail, P.depsTail.nextDep = t, P.depsTail = t) : P.deps = P.depsTail = t, it(t);else if (t.version === -1 && (t.version = this.version, t.nextDep)) {
        let e = t.nextDep;
        e.prevDep = t.prevDep, t.prevDep && (t.prevDep.nextDep = e), t.prevDep = P.depsTail, t.nextDep = undefined, P.depsTail.nextDep = t, P.depsTail = t, P.deps === t && (P.deps = e);
      }
      return t;
    }
    trigger(e) {
      this.version++, tt++, this.notify(e);
    }
    notify(e) {
      Be();
      try {
        for (let e = this.subs; e; e = e.prevSub) e.sub.notify() && e.sub.dep.notify();
      } finally {
        Ve();
      }
    }
  };
function it(e) {
  if (e.dep.sc++, e.sub.flags & 4) {
    let t = e.dep.computed;
    if (t && !e.dep.subs) {
      t.flags |= 20;
      for (let e = t.deps; e; e = e.nextDep) it(e);
    }
    let n = e.dep.subs;
    n !== e && (e.prevSub = n, n && (n.nextSub = e)), e.dep.subs = e;
  }
}
var at = new WeakMap(),
  ot = Symbol(``),
  st = Symbol(``),
  ct = Symbol(``);
function lt(e, t, n) {
  if (Xe && P) {
    let t = at.get(e);
    t || at.set(e, t = new Map());
    let r = t.get(n);
    r || (t.set(n, r = new rt()), r.map = t, r.key = n), r.track();
  }
}
function ut(e, t, n, r, i, a) {
  let o = at.get(e);
  if (!o) {
    tt++;
    return;
  }
  let s = e => {
    e && e.trigger();
  };
  if (Be(), t === `clear`) o.forEach(s);else {
    let i = d(e),
      a = i && T(n);
    if (i && n === `length`) {
      let e = Number(r);
      o.forEach((t, n) => {
        (n === `length` || n === ct || !v(n) && n >= e) && s(t);
      });
    } else switch ((n !== undefined || o.has(undefined)) && s(o.get(n)), a && s(o.get(ct)), t) {
      case `add`:
        i ? a && s(o.get(`length`)) : (s(o.get(ot)), f(e) && s(o.get(st)));
        break;
      case `delete`:
        i || (s(o.get(ot)), f(e) && s(o.get(st)));
        break;
      case `set`:
        f(e) && s(o.get(ot));
    }
  }
  Ve();
}
function dt(e, t) {
  let n = at.get(e);
  return n && n.get(t);
}
function ft(e) {
  let t = F(e);
  return t === e || (lt(t, `iterate`, ct), en(e)) ? t : $t(e) ? Qt(e) ? t.map(e => an(rn(e))) : t.map(an) : t.map(rn);
}
function pt(e) {
  return lt(e = F(e), `iterate`, ct), e;
}
function mt(e, t) {
  return $t(e) ? an(Qt(e) ? rn(t) : t) : rn(t);
}
var ht = {
  __proto__: null,
  [Symbol.iterator]() {
    return gt(this, Symbol.iterator, e => mt(this, e));
  },
  concat(...e) {
    return ft(this).concat(...e.map(e => d(e) ? ft(e) : e));
  },
  entries() {
    return gt(this, `entries`, e => (e[1] = mt(this, e[1]), e));
  },
  every(e, t) {
    return vt(this, `every`, e, t, undefined, arguments);
  },
  filter(e, t) {
    return vt(this, `filter`, e, t, e => e.map(e => mt(this, e)), arguments);
  },
  find(e, t) {
    return vt(this, `find`, e, t, e => mt(this, e), arguments);
  },
  findIndex(e, t) {
    return vt(this, `findIndex`, e, t, undefined, arguments);
  },
  findLast(e, t) {
    return vt(this, `findLast`, e, t, e => mt(this, e), arguments);
  },
  findLastIndex(e, t) {
    return vt(this, `findLastIndex`, e, t, undefined, arguments);
  },
  forEach(e, t) {
    return vt(this, `forEach`, e, t, undefined, arguments);
  },
  includes(...e) {
    return bt(this, `includes`, e);
  },
  indexOf(...e) {
    return bt(this, `indexOf`, e);
  },
  join(e) {
    return ft(this).join(e);
  },
  lastIndexOf(...e) {
    return bt(this, `lastIndexOf`, e);
  },
  map(e, t) {
    return vt(this, `map`, e, t, undefined, arguments);
  },
  pop() {
    return xt(this, `pop`);
  },
  push(...e) {
    return xt(this, `push`, e);
  },
  reduce(e, ...t) {
    return yt(this, `reduce`, e, t);
  },
  reduceRight(e, ...t) {
    return yt(this, `reduceRight`, e, t);
  },
  shift() {
    return xt(this, `shift`);
  },
  some(e, t) {
    return vt(this, `some`, e, t, undefined, arguments);
  },
  splice(...e) {
    return xt(this, `splice`, e);
  },
  toReversed() {
    return ft(this).toReversed();
  },
  toSorted(e) {
    return ft(this).toSorted(e);
  },
  toSpliced(...e) {
    return ft(this).toSpliced(...e);
  },
  unshift(...e) {
    return xt(this, `unshift`, e);
  },
  values() {
    return gt(this, `values`, e => mt(this, e));
  }
};
function gt(e, t, n) {
  let r = pt(e),
    i = r[t]();
  return r !== e && !en(e) && (i._next = i.next, i.next = () => {
    let e = i._next();
    return e.done || (e.value = n(e.value)), e;
  }), i;
}
var _t = Array.prototype;
function vt(e, t, n, r, i, a) {
  let o = pt(e),
    s = o !== e && !en(e),
    c = o[t];
  if (c !== _t[t]) {
    let t = c.apply(e, a);
    return s ? rn(t) : t;
  }
  let l = n;
  o !== e && (s ? l = function (t, r) {
    return n.call(this, mt(e, t), r, e);
  } : n.length > 2 && (l = function (t, r) {
    return n.call(this, t, r, e);
  }));
  let u = c.call(o, l, r);
  return s && i ? i(u) : u;
}
function yt(e, t, n, r) {
  let i = pt(e),
    a = i !== e && !en(e),
    o = n,
    s = false;
  i !== e && (a ? (s = r.length === 0, o = function (t, r, i) {
    return s && (s = false, t = mt(e, t)), n.call(this, t, mt(e, r), i, e);
  }) : n.length > 3 && (o = function (t, r, i) {
    return n.call(this, t, r, i, e);
  }));
  let c = i[t](o, ...r);
  return s ? mt(e, c) : c;
}
function bt(e, t, n) {
  let r = F(e);
  lt(r, `iterate`, ct);
  let i = r[t](...n);
  return (i === -1 || i === false) && tn(n[0]) ? (n[0] = F(n[0]), r[t](...n)) : i;
}
function xt(e, t, n = []) {
  Qe(), Be();
  let r = F(e)[t].apply(e, n);
  return Ve(), $e(), r;
}
var St = e(`__proto__,__v_isRef,__isVue`),
  Ct = new Set(Object.getOwnPropertyNames(Symbol).filter(e => e !== `arguments` && e !== `caller`).map(e => Symbol[e]).filter(v));
function wt(e) {
  v(e) || (e = String(e));
  let t = F(this);
  return lt(t, `has`, e), t.hasOwnProperty(e);
}
var Tt = class {
    constructor(e = false, t = false) {
      this._isReadonly = e, this._isShallow = t;
    }
    get(e, t, n) {
      if (t === `__v_skip`) return e.__v_skip;
      let r = this._isReadonly,
        i = this._isShallow;
      if (t === `__v_isReactive`) return !r;
      if (t === `__v_isReadonly`) return r;
      if (t === `__v_isShallow`) return i;
      if (t === `__v_raw`) return n === (r ? i ? Gt : Wt : i ? Ut : Ht).get(e) || Object.getPrototypeOf(e) === Object.getPrototypeOf(n) ? e : undefined;
      let a = d(e);
      if (!r) {
        let e;
        if (a && (e = ht[t])) return e;
        if (t === `hasOwnProperty`) return wt;
      }
      let o = Reflect.get(e, t, I(e) ? e : n);
      if ((v(t) ? Ct.has(t) : St(t)) || (r || lt(e, `get`, t), i)) return o;
      if (I(o)) {
        let e = a && T(t) ? o : o.value;
        return r && y(e) ? Yt(e) : e;
      }
      return y(o) ? r ? Yt(o) : qt(o) : o;
    }
  },
  Et = class extends Tt {
    constructor(e = false) {
      super(false, e);
    }
    set(e, t, n, r) {
      let i = e[t],
        a = d(e) && T(t);
      if (!this._isShallow) {
        let e = $t(i);
        if (!en(n) && !$t(n) && (i = F(i), n = F(n)), !a && I(i) && !I(n)) return e || (i.value = n), true;
      }
      let o = a ? Number(t) < e.length : u(e, t),
        s = Reflect.set(e, t, n, I(e) ? e : r);
      return e === F(r) && s && (o ? A(n, i) && ut(e, `set`, t, n, i) : ut(e, `add`, t, n)), s;
    }
    deleteProperty(e, t) {
      let n = u(e, t),
        r = e[t],
        i = Reflect.deleteProperty(e, t);
      return i && n && ut(e, `delete`, t, undefined, r), i;
    }
    has(e, t) {
      let n = Reflect.has(e, t);
      return (!v(t) || !Ct.has(t)) && lt(e, `has`, t), n;
    }
    ownKeys(e) {
      return lt(e, `iterate`, d(e) ? `length` : ot), Reflect.ownKeys(e);
    }
  },
  Dt = class extends Tt {
    constructor(e = false) {
      super(true, e);
    }
    set(e, t) {
      return true;
    }
    deleteProperty(e, t) {
      return true;
    }
  },
  Ot = new Et(),
  kt = new Dt(),
  At = new Et(true),
  jt = new Dt(true),
  Mt = e => e,
  Nt = e => Reflect.getPrototypeOf(e);
function Pt(e, t, n) {
  return function (...r) {
    let i = this.__v_raw,
      a = F(i),
      o = f(a),
      c = e === `entries` || e === Symbol.iterator && o,
      l = e === `keys` && o,
      u = i[e](...r),
      d = n ? Mt : t ? an : rn;
    return !t && lt(a, `iterate`, l ? st : ot), s(Object.create(u), {
      next() {
        let {
          value: e,
          done: t
        } = u.next();
        return t ? {
          value: e,
          done: t
        } : {
          value: c ? [d(e[0]), d(e[1])] : d(e),
          done: t
        };
      }
    });
  };
}
function Ft(e) {
  return function (...t) {
    return e === `delete` ? false : e === `clear` ? undefined : this;
  };
}
function It(e, t) {
  let n = {
    get(n) {
      let r = this.__v_raw,
        i = F(r),
        a = F(n);
      e || (A(n, a) && lt(i, `get`, n), lt(i, `get`, a));
      let {
          has: o
        } = Nt(i),
        s = t ? Mt : e ? an : rn;
      if (o.call(i, n)) return s(r.get(n));
      if (o.call(i, a)) return s(r.get(a));
      r !== i && r.get(n);
    },
    get size() {
      let t = this.__v_raw;
      return !e && lt(F(t), `iterate`, ot), t.size;
    },
    has(t) {
      let n = this.__v_raw,
        r = F(n),
        i = F(t);
      return e || (A(t, i) && lt(r, `has`, t), lt(r, `has`, i)), t === i ? n.has(t) : n.has(t) || n.has(i);
    },
    forEach(n, r) {
      let i = this,
        a = i.__v_raw,
        o = F(a),
        s = t ? Mt : e ? an : rn;
      return !e && lt(o, `iterate`, ot), a.forEach((e, t) => n.call(r, s(e), s(t), i));
    }
  };
  return s(n, e ? {
    add: Ft(`add`),
    set: Ft(`set`),
    delete: Ft(`delete`),
    clear: Ft(`clear`)
  } : {
    add(e) {
      let n = F(this),
        r = Nt(n),
        i = F(e),
        a = !t && !en(e) && !$t(e) ? i : e;
      return r.has.call(n, a) || A(e, a) && r.has.call(n, e) || A(i, a) && r.has.call(n, i) || (n.add(a), ut(n, `add`, a, a)), this;
    },
    set(e, n) {
      !t && !en(n) && !$t(n) && (n = F(n));
      let r = F(this),
        {
          has: i,
          get: a
        } = Nt(r),
        o = i.call(r, e);
      o ||= (e = F(e), i.call(r, e));
      let s = a.call(r, e);
      return r.set(e, n), o ? A(n, s) && ut(r, `set`, e, n, s) : ut(r, `add`, e, n), this;
    },
    delete(e) {
      let t = F(this),
        {
          has: n,
          get: r
        } = Nt(t),
        i = n.call(t, e);
      i ||= (e = F(e), n.call(t, e));
      let a = r ? r.call(t, e) : undefined,
        o = t.delete(e);
      return i && ut(t, `delete`, e, undefined, a), o;
    },
    clear() {
      let e = F(this),
        t = e.size !== 0,
        n = e.clear();
      return t && ut(e, `clear`, undefined, undefined, undefined), n;
    }
  }), [`keys`, `values`, `entries`, Symbol.iterator].forEach(r => {
    n[r] = Pt(r, e, t);
  }), n;
}
function Lt(e, t) {
  let n = It(e, t);
  return (t, r, i) => r === `__v_isReactive` ? !e : r === `__v_isReadonly` ? e : r === `__v_raw` ? t : Reflect.get(u(n, r) && r in t ? n : t, r, i);
}
var Rt = {
    get: Lt(false, false)
  },
  zt = {
    get: Lt(false, true)
  },
  Bt = {
    get: Lt(true, false)
  },
  Vt = {
    get: Lt(true, true)
  },
  Ht = new WeakMap(),
  Ut = new WeakMap(),
  Wt = new WeakMap(),
  Gt = new WeakMap();
function Kt(e) {
  switch (e) {
    case `Object`:
    case `Array`:
      return 1;
    case `Map`:
    case `Set`:
    case `WeakMap`:
    case `WeakSet`:
      return 2;
    default:
      return 0;
  }
}
function qt(e) {
  return $t(e) ? e : Zt(e, false, Ot, Rt, Ht);
}
function Jt(e) {
  return Zt(e, false, At, zt, Ut);
}
function Yt(e) {
  return Zt(e, true, kt, Bt, Wt);
}
function Xt(e) {
  return Zt(e, true, jt, Vt, Gt);
}
function Zt(e, t, n, r, i) {
  if (!y(e) || e.__v_raw && !(t && e.__v_isReactive) || e.__v_skip || !Object.isExtensible(e)) return e;
  let a = i.get(e);
  if (a) return a;
  let o = Kt(C(e));
  if (o === 0) return e;
  let s = new Proxy(e, o === 2 ? r : n);
  return i.set(e, s), s;
}
function Qt(e) {
  return $t(e) ? Qt(e.__v_raw) : !!(e && e.__v_isReactive);
}
function $t(e) {
  return !!(e && e.__v_isReadonly);
}
function en(e) {
  return !!(e && e.__v_isShallow);
}
function tn(e) {
  return e ? !!e.__v_raw : false;
}
function F(e) {
  let t = e && e.__v_raw;
  return t ? F(t) : e;
}
function nn(e) {
  return !u(e, `__v_skip`) && Object.isExtensible(e) && ie(e, `__v_skip`, true), e;
}
var rn = e => y(e) ? qt(e) : e,
  an = e => y(e) ? Yt(e) : e;
function I(e) {
  return e ? e.__v_isRef === true : false;
}
function on(e) {
  return cn(e, false);
}
function sn(e) {
  return cn(e, true);
}
function cn(e, t) {
  return I(e) ? e : new ln(e, t);
}
var ln = class {
  constructor(e, t) {
    this.dep = new rt(), this.__v_isRef = true, this.__v_isShallow = false, this._rawValue = t ? e : F(e), this._value = t ? e : rn(e), this.__v_isShallow = t;
  }
  get value() {
    return this.dep.track(), this._value;
  }
  set value(e) {
    let t = this._rawValue,
      n = this.__v_isShallow || en(e) || $t(e);
    e = n ? e : F(e), A(e, t) && (this._rawValue = e, this._value = n ? e : rn(e), this.dep.trigger());
  }
};
function un(e) {
  e.dep && e.dep.trigger();
}
function dn(e) {
  return I(e) ? e.value : e;
}
function fn(e) {
  return g(e) ? e() : dn(e);
}
var pn = {
  get: (e, t, n) => t === `__v_raw` ? e : dn(Reflect.get(e, t, n)),
  set: (e, t, n, r) => {
    let i = e[t];
    return I(i) && !I(n) ? (i.value = n, true) : Reflect.set(e, t, n, r);
  }
};
function mn(e) {
  return Qt(e) ? e : new Proxy(e, pn);
}
var hn = class {
  constructor(e) {
    this.__v_isRef = true, this._value = undefined;
    let t = this.dep = new rt(),
      {
        get: n,
        set: r
      } = e(t.track.bind(t), t.trigger.bind(t));
    this._get = n, this._set = r;
  }
  get value() {
    return this._value = this._get();
  }
  set value(e) {
    this._set(e);
  }
};
function gn(e) {
  return new hn(e);
}
function _n(e) {
  let t = d(e) ? Array(e.length) : {};
  for (let n in e) t[n] = xn(e, n);
  return t;
}
var vn = class {
    constructor(e, t, n) {
      this._object = e, this._defaultValue = n, this.__v_isRef = true, this._value = undefined, this._key = v(t) ? t : String(t), this._raw = F(e);
      let r = true,
        i = e;
      if (!d(e) || v(this._key) || !T(this._key)) do r = !tn(i) || en(i); while (r && (i = i.__v_raw));
      this._shallow = r;
    }
    get value() {
      let e = this._object[this._key];
      return this._shallow && (e = dn(e)), this._value = e === undefined ? this._defaultValue : e;
    }
    set value(e) {
      if (this._shallow && I(this._raw[this._key])) {
        let t = this._object[this._key];
        if (I(t)) {
          t.value = e;
          return;
        }
      }
      this._object[this._key] = e;
    }
    get dep() {
      return dt(this._raw, this._key);
    }
  },
  yn = class {
    constructor(e) {
      this._getter = e, this.__v_isRef = true, this.__v_isReadonly = true, this._value = undefined;
    }
    get value() {
      return this._value = this._getter();
    }
  };
function bn(e, t, n) {
  return I(e) ? e : g(e) ? new yn(e) : y(e) && arguments.length > 1 ? xn(e, t, n) : on(e);
}
function xn(e, t, n) {
  return new vn(e, t, n);
}
var Sn = class {
  constructor(e, t, n) {
    this.fn = e, this.setter = t, this._value = undefined, this.dep = new rt(this), this.__v_isRef = true, this.deps = undefined, this.depsTail = undefined, this.flags = 16, this.globalVersion = tt - 1, this.next = undefined, this.effect = this, this.__v_isReadonly = !t, this.isSSR = n;
  }
  notify() {
    if (this.flags |= 16, !(this.flags & 8) && P !== this) return ze(this, true), true;
  }
  get value() {
    let e = this.dep.track();
    return Ge(this), e && (e.version = this.dep.version), this._value;
  }
  set value(e) {
    this.setter && this.setter(e);
  }
};
function Cn(e, t, n = false) {
  let r, i;
  return g(e) ? r = e : (r = e.get, i = e.set), new Sn(r, i, n);
}
var wn = {
    GET: `get`,
    HAS: `has`,
    ITERATE: `iterate`
  },
  Tn = {
    SET: `set`,
    ADD: `add`,
    DELETE: `delete`,
    CLEAR: `clear`
  },
  En = {},
  Dn = new WeakMap(),
  On = undefined;
function kn() {
  return On;
}
function An(e, t = false, n = On) {
  if (n) {
    let t = Dn.get(n);
    t || Dn.set(n, t = []), t.push(e);
  }
}
function jn(e, n, i = t) {
  let {
      immediate: a,
      deep: o,
      once: s,
      scheduler: l,
      augmentJob: u,
      call: f
    } = i,
    p = e => o ? e : en(e) || o === false || o === 0 ? Mn(e, 1) : Mn(e),
    m,
    h,
    _,
    v,
    y = false,
    b = false;
  if (I(e) ? (h = () => e.value, y = en(e)) : Qt(e) ? (h = () => p(e), y = true) : d(e) ? (b = true, y = e.some(e => Qt(e) || en(e)), h = () => e.map(e => {
    if (I(e)) return e.value;
    if (Qt(e)) return p(e);
    if (g(e)) return f ? f(e, 2) : e();
  })) : h = g(e) ? n ? f ? () => f(e, 2) : e : () => {
    if (_) {
      Qe();
      try {
        _();
      } finally {
        $e();
      }
    }
    let t = On;
    On = m;
    try {
      return f ? f(e, 3, [v]) : e(v);
    } finally {
      On = t;
    }
  } : r, n && o) {
    let e = h,
      t = o === true ? 1 / 0 : o;
    h = () => Mn(e(), t);
  }
  let x = Me(),
    S = () => {
      m.stop(), x && x.active && c(x.effects, m);
    };
  if (s && n) {
    let e = n;
    n = (...t) => {
      let n = e(...t);
      return S(), n;
    };
  }
  let C = b ? Array(e.length).fill(En) : En,
    w = e => {
      if (m.flags & 1 && (m.dirty || e)) {
        if (n) {
          let t = m.run();
          if (e || o || y || (b ? t.some((e, t) => A(e, C[t])) : A(t, C))) {
            _ && _();
            let e = On;
            On = m;
            try {
              let e = [t, C === En ? undefined : b && C[0] === En ? [] : C, v];
              C = t, f ? f(n, 3, e) : n(...e);
            } finally {
              On = e;
            }
          }
        } else m.run();
      }
    };
  return u && u(w), m = new Fe(h), m.scheduler = l ? () => l(w, false) : w, v = e => An(e, false, m), _ = m.onStop = () => {
    let e = Dn.get(m);
    if (e) {
      if (f) f(e, 4);else for (let t of e) t();
      Dn.delete(m);
    }
  }, n ? a ? w(true) : C = m.run() : l ? l(w.bind(null, true), true) : m.run(), S.pause = m.pause.bind(m), S.resume = m.resume.bind(m), S.stop = S, S;
}
function Mn(e, t = 1 / 0, n) {
  if (t <= 0 || !y(e) || e.__v_skip || (n ||= new Map(), (n.get(e) || 0) >= t)) return e;
  if (n.set(e, t), t--, I(e)) Mn(e.value, t, n);else if (d(e)) for (let r = 0; r < e.length; r++) Mn(e[r], t, n);else if (p(e) || f(e)) e.forEach(e => {
    Mn(e, t, n);
  });else if (w(e)) {
    for (let r in e) Mn(e[r], t, n);
    for (let r of Object.getOwnPropertySymbols(e)) Object.prototype.propertyIsEnumerable.call(e, r) && Mn(e[r], t, n);
  }
  return e;
}
var Nn = [];
function Pn(e) {
  Nn.push(e);
}
function Fn() {
  Nn.pop();
}
function In(e, t) {}
var Ln = {
    SETUP_FUNCTION: 0,
    0: `SETUP_FUNCTION`,
    RENDER_FUNCTION: 1,
    1: `RENDER_FUNCTION`,
    NATIVE_EVENT_HANDLER: 5,
    5: `NATIVE_EVENT_HANDLER`,
    COMPONENT_EVENT_HANDLER: 6,
    6: `COMPONENT_EVENT_HANDLER`,
    VNODE_HOOK: 7,
    7: `VNODE_HOOK`,
    DIRECTIVE_HOOK: 8,
    8: `DIRECTIVE_HOOK`,
    TRANSITION_HOOK: 9,
    9: `TRANSITION_HOOK`,
    APP_ERROR_HANDLER: 10,
    10: `APP_ERROR_HANDLER`,
    APP_WARN_HANDLER: 11,
    11: `APP_WARN_HANDLER`,
    FUNCTION_REF: 12,
    12: `FUNCTION_REF`,
    ASYNC_COMPONENT_LOADER: 13,
    13: `ASYNC_COMPONENT_LOADER`,
    SCHEDULER: 14,
    14: `SCHEDULER`,
    COMPONENT_UPDATE: 15,
    15: `COMPONENT_UPDATE`,
    APP_UNMOUNT_CLEANUP: 16,
    16: `APP_UNMOUNT_CLEANUP`
  },
  Rn = {
    sp: `serverPrefetch hook`,
    bc: `beforeCreate hook`,
    c: `created hook`,
    bm: `beforeMount hook`,
    m: `mounted hook`,
    bu: `beforeUpdate hook`,
    u: `updated`,
    bum: `beforeUnmount hook`,
    um: `unmounted hook`,
    a: `activated hook`,
    da: `deactivated hook`,
    ec: `errorCaptured hook`,
    rtc: `renderTracked hook`,
    rtg: `renderTriggered hook`,
    0: `setup function`,
    1: `render function`,
    2: `watcher getter`,
    3: `watcher callback`,
    4: `watcher cleanup function`,
    5: `native event handler`,
    6: `component event handler`,
    7: `vnode hook`,
    8: `directive hook`,
    9: `transition hook`,
    10: `app errorHandler`,
    11: `app warnHandler`,
    12: `ref function`,
    13: `async component loader`,
    14: `scheduler flush`,
    15: `component update`,
    16: `app unmount cleanup function`
  };
function zn(e, t, n, r) {
  try {
    return r ? e(...r) : e();
  } catch (e) {
    Vn(e, t, n);
  }
}
function Bn(e, t, n, r) {
  if (g(e)) {
    let i = zn(e, t, n, r);
    return i && b(i) && i.catch(e => {
      Vn(e, t, n);
    }), i;
  }
  if (d(e)) {
    let i = [];
    for (let a = 0; a < e.length; a++) i.push(Bn(e[a], t, n, r));
    return i;
  }
}
function Vn(e, n, r, i = true) {
  let a = n ? n.vnode : null,
    {
      errorHandler: o,
      throwUnhandledErrorInProduction: s
    } = n && n.appContext.config || t;
  if (n) {
    let t = n.parent,
      i = n.proxy,
      a = `https://vuejs.org/error-reference/#runtime-${r}`;
    for (; t;) {
      let n = t.ec;
      if (n) {
        for (let t = 0; t < n.length; t++) if (n[t](e, i, a) === false) return;
      }
      t = t.parent;
    }
    if (o) {
      Qe(), zn(o, null, 10, [e, i, a]), $e();
      return;
    }
  }
  Hn(e, r, a, i, s);
}
function Hn(e, t, n, r = true, i = false) {
  if (i) throw e;
  console.error(e);
}
var Un = [],
  Wn = -1,
  Gn = [],
  Kn = null,
  qn = 0,
  Jn = Promise.resolve(),
  Yn = null;
function Xn(e) {
  let t = Yn || Jn;
  return e ? t.then(this ? e.bind(this) : e) : t;
}
function Zn(e) {
  let t = Wn + 1,
    n = Un.length;
  for (; t < n;) {
    let r = t + n >>> 1,
      i = Un[r],
      a = rr(i);
    a < e || a === e && i.flags & 2 ? t = r + 1 : n = r;
  }
  return t;
}
function Qn(e) {
  if (!(e.flags & 1)) {
    let t = rr(e),
      n = Un[Un.length - 1];
    !n || !(e.flags & 2) && t >= rr(n) ? Un.push(e) : Un.splice(Zn(t), 0, e), e.flags |= 1, $n();
  }
}
function $n() {
  Yn ||= Jn.then(ir);
}
function er(e) {
  if (!d(e)) Kn && e.id === -1 ? Kn.splice(qn + 1, 0, e) : e.flags & 1 || (Gn.push(e), e.flags |= 1);else for (let t = 0; t < e.length; t++) Gn.push(e[t]);
  $n();
}
function tr(e, t, n = Wn + 1) {
  for (; n < Un.length; n++) {
    let t = Un[n];
    if (t && t.flags & 2) {
      if (e && t.id !== e.uid) continue;
      Un.splice(n, 1), n--, t.flags & 4 && (t.flags &= -2), t(), t.flags & 4 || (t.flags &= -2);
    }
  }
}
function nr(e) {
  if (Gn.length) {
    let e = [...new Set(Gn)].sort((e, t) => rr(e) - rr(t));
    if (Gn.length = 0, Kn) {
      for (let t = 0; t < e.length; t++) Kn.push(e[t]);
      return;
    }
    for (Kn = e, qn = 0; qn < Kn.length; qn++) {
      let e = Kn[qn];
      e.flags & 4 && (e.flags &= -2), e.flags & 8 || e(), e.flags &= -2;
    }
    Kn = null, qn = 0;
  }
}
var rr = e => e.id == null ? e.flags & 2 ? -1 : 1 / 0 : e.id;
function ir(e) {
  try {
    for (Wn = 0; Wn < Un.length; Wn++) {
      let e = Un[Wn];
      e && !(e.flags & 8) && (e.flags & 4 && (e.flags &= -2), zn(e, e.i, e.i ? 15 : 14), e.flags & 4 || (e.flags &= -2));
    }
  } finally {
    for (; Wn < Un.length; Wn++) {
      let e = Un[Wn];
      e && (e.flags &= -2);
    }
    Wn = -1, Un.length = 0, nr(e), Yn = null, (Un.length || Gn.length) && ir(e);
  }
}
var ar,
  or = [];
function sr(e, t) {
  ar = e, ar ? (ar.enabled = true, or.forEach(({
    event: e,
    args: t
  }) => ar.emit(e, ...t)), or = []) : typeof window < `u` && window.HTMLElement && !window.navigator?.userAgent?.includes(`jsdom`) ? ((t.__VUE_DEVTOOLS_HOOK_REPLAY__ = t.__VUE_DEVTOOLS_HOOK_REPLAY__ || []).push(e => {
    sr(e, t);
  }), setTimeout(() => {
    ar || (t.__VUE_DEVTOOLS_HOOK_REPLAY__ = null, or = []);
  }, 3e3)) : or = [];
}
var L = null,
  cr = null;
function lr(e) {
  let t = L;
  return L = e, cr = e && e.type.__scopeId || null, t;
}
function ur(e) {
  cr = e;
}
function dr() {
  cr = null;
}
var fr = e => pr;
function pr(e, t = L, n) {
  if (!t || e._n) return e;
  let r = (...n) => {
    r._d && ps(-1);
    let i = lr(t),
      a = cs.length,
      o;
    try {
      o = e(...n);
    } finally {
      for (let e = cs.length; e > a; e--) ds();
      lr(i), r._d && ps(1);
    }
    return o;
  };
  return r._n = true, r._c = true, r._d = true, r;
}
function mr(e, n) {
  if (L === null) return e;
  let r = ec(L),
    i = e.dirs ||= [];
  for (let e = 0; e < n.length; e++) {
    let [a, o, s, c = t] = n[e];
    a && (g(a) && (a = {
      mounted: a,
      updated: a
    }), a.deep && Mn(o), i.push({
      dir: a,
      instance: r,
      value: o,
      oldValue: undefined,
      arg: s,
      modifiers: c
    }));
  }
  return e;
}
function hr(e, t, n, r) {
  let i = e.dirs,
    a = t && t.dirs;
  for (let o = 0; o < i.length; o++) {
    let s = i[o];
    a && (s.oldValue = a[o].value);
    let c = s.dir[r];
    c && (Qe(), Bn(c, n, 8, [e.el, s, e, t]), $e());
  }
}
function gr(e, t) {
  if (H) {
    let n = H.provides,
      r = H.parent && H.parent.provides;
    r === n && (n = H.provides = Object.create(r)), n[e] = t;
  }
}
function _r(e, t, n = false) {
  let r = Ls();
  if (r || no) {
    let i = no ? no._context.provides : r ? r.parent == null || r.ce ? r.vnode.appContext && r.vnode.appContext.provides : r.parent.provides : undefined;
    if (i && e in i) return i[e];
    if (arguments.length > 1) return n && g(t) ? t.call(r && r.proxy) : t;
  }
}
function vr() {
  return !!(Ls() || no);
}
var yr = Symbol.for(`v-scx`),
  br = () => _r(yr);
function xr(e, t) {
  return Tr(e, null, t);
}
function Sr(e, t) {
  return Tr(e, null, {
    flush: `post`
  });
}
function Cr(e, t) {
  return Tr(e, null, {
    flush: `sync`
  });
}
function wr(e, t, n) {
  return Tr(e, t, n);
}
function Tr(e, n, i = t) {
  let {
      immediate: a,
      deep: o,
      flush: c,
      once: l
    } = i,
    u = s({}, i),
    d = n && a || !n && c !== `post`,
    f;
  if (Us) {
    if (c === `sync`) {
      let e = br();
      f = e.__watcherHandles ||= [];
    } else if (!d) {
      let e = () => {};
      return e.stop = r, e.resume = r, e.pause = r, e;
    }
  }
  let p = H;
  u.call = (e, t, n) => Bn(e, p, t, n);
  let m = false;
  c === `post` ? u.scheduler = e => {
    R(e, p && p.suspense);
  } : c !== `sync` && (m = true, u.scheduler = (e, t) => {
    t ? e() : Qn(e);
  }), u.augmentJob = e => {
    n && (e.flags |= 4), m && (e.flags |= 2, p && (e.id = p.uid, e.i = p));
  };
  let h = jn(e, n, u);
  return Us && (f ? f.push(h) : d && h()), h;
}
function Er(e, t, n) {
  let r = this.proxy,
    i = _(e) ? e.includes(`.`) ? Dr(r, e) : () => r[e] : e.bind(r, r),
    a;
  g(t) ? a = t : (a = t.handler, n = t);
  let o = Bs(this),
    s = Tr(i, a.bind(r), n);
  return o(), s;
}
function Dr(e, t) {
  let n = t.split(`.`);
  return () => {
    let t = e;
    for (let e = 0; e < n.length && t; e++) t = t[n[e]];
    return t;
  };
}
var Or = new WeakMap(),
  kr = Symbol(`_vte`),
  Ar = e => e.__isTeleport,
  jr = e => e && (e.disabled || e.disabled === ``),
  Mr = e => e && (e.defer || e.defer === ``),
  Nr = e => typeof SVGElement < `u` && e instanceof SVGElement,
  Pr = e => typeof MathMLElement == `function` && e instanceof MathMLElement,
  Fr = (e, t) => {
    let n = e && e.to;
    return _(n) ? t ? t(n) : null : n;
  },
  Ir = {
    name: `Teleport`,
    __isTeleport: true,
    process(e, t, n, r, i, a, o, s, c, l) {
      let {
          mc: u,
          pc: d,
          pbc: f,
          o: {
            insert: p,
            querySelector: m,
            createText: h,
            createComment: g,
            parentNode: _
          }
        } = l,
        v = jr(t.props),
        {
          dynamicChildren: y
        } = t,
        b = (e, t, n) => {
          e.shapeFlag & 16 && u(e.children, t, n, i, a, o, s, c);
        },
        x = (e = t) => {
          let n = jr(e.props),
            r = e.target = Fr(e.props, m),
            a = Vr(r, e, h, p);
          r && (o !== `svg` && Nr(r) ? o = `svg` : o !== `mathml` && Pr(r) && (o = `mathml`), i && i.isCE && (i.ce._teleportTargets || (i.ce._teleportTargets = new Set())).add(r), n || (b(e, r, a), Br(e, false)));
        },
        S = e => {
          let t = () => {
            if (Or.get(e) === t) {
              if (Or.delete(e), jr(e.props)) {
                let t = _(e.el) || n;
                b(e, t, e.anchor), Br(e, true);
              }
              x(e);
            }
          };
          Or.set(e, t), R(t, a);
        };
      if (e == null) {
        let e = t.el = h(``),
          i = t.anchor = h(``);
        if (p(e, n, r), p(i, n, r), Mr(t.props) || a && a.pendingBranch) {
          S(t);
          return;
        }
        v && (b(t, n, i), Br(t, true)), x();
      } else {
        t.el = e.el;
        let r = t.anchor = e.anchor,
          u = Or.get(e);
        if (u) {
          u.flags |= 8, Or.delete(e), S(t);
          return;
        }
        t.targetStart = e.targetStart;
        let p = t.target = e.target,
          h = t.targetAnchor = e.targetAnchor,
          g = jr(e.props),
          _ = g ? n : p,
          b = g ? r : h;
        if (o === `svg` || Nr(p) ? o = `svg` : (o === `mathml` || Pr(p)) && (o = `mathml`), y ? (f(e.dynamicChildren, y, _, i, a, o, s), Ho(e, t, true)) : c || d(e, t, _, b, i, a, o, s, false), v) g ? t.props && e.props && t.props.to !== e.props.to && (t.props.to = e.props.to) : Lr(t, n, r, l, 1);else if ((t.props && t.props.to) !== (e.props && e.props.to)) {
          let e = Fr(t.props, m);
          e && (t.target = e, Lr(t, e, null, l, 0));
        } else g && Lr(t, p, h, l, 1);
        Br(t, v);
      }
    },
    remove(e, t, n, {
      um: r,
      o: {
        remove: i
      }
    }, a) {
      let {
          shapeFlag: o,
          children: s,
          anchor: c,
          targetStart: l,
          targetAnchor: u,
          target: d,
          props: f
        } = e,
        p = jr(f),
        m = a || !p,
        h = Or.get(e);
      if (h && (h.flags |= 8, Or.delete(e)), d && (i(l), i(u)), a && i(c), !h && (p || d) && o & 16) for (let e = 0; e < s.length; e++) {
        let i = s[e];
        r(i, t, n, m, !!i.dynamicChildren);
      }
    },
    move: Lr,
    hydrate: Rr
  };
function Lr(e, t, n, {
  o: {
    insert: r
  },
  m: i
}, a = 2) {
  a === 0 && r(e.targetAnchor, t, n);
  let {
      el: o,
      anchor: s,
      shapeFlag: c,
      children: l,
      props: u
    } = e,
    d = a === 2;
  if (d && r(o, t, n), !Or.has(e) && (!d || jr(u)) && c & 16) for (let e = 0; e < l.length; e++) i(l[e], t, n, 2);
  d && r(s, t, n);
}
function Rr(e, t, n, r, i, a, {
  o: {
    nextSibling: o,
    parentNode: s,
    querySelector: c,
    insert: l,
    createText: u
  }
}, d) {
  function f(e, n) {
    let r = n;
    for (; r;) {
      if (r && r.nodeType === 8) {
        if (r.data === `teleport start anchor`) t.targetStart = r;else if (r.data === `teleport anchor`) {
          t.targetAnchor = r, e._lpa = t.targetAnchor && o(t.targetAnchor);
          break;
        }
      }
      r = o(r);
    }
  }
  function p(e, t) {
    t.anchor = d(o(e), t, s(e), n, r, i, a);
  }
  let m = t.target = Fr(t.props, c),
    h = jr(t.props);
  if (m) {
    let c = m._lpa || m.firstChild;
    t.shapeFlag & 16 && (h ? (p(e, t), f(m, c), t.targetAnchor || Vr(m, t, u, l, s(e) === m ? e : null)) : (t.anchor = o(e), f(m, c), t.targetAnchor || Vr(m, t, u, l), d(c && o(c), t, m, n, r, i, a))), Br(t, h);
  } else h && t.shapeFlag & 16 && (p(e, t), t.targetStart = e, t.targetAnchor = o(e));
  return t.anchor && o(t.anchor);
}
var zr = Ir;
function Br(e, t) {
  let n = e.ctx;
  if (n && n.ut) {
    let r, i;
    for (t ? (r = e.el, i = e.anchor) : (r = e.targetStart, i = e.targetAnchor); r && r !== i;) r.nodeType === 1 && r.setAttribute(`data-v-owner`, n.uid), r = r.nextSibling;
    n.ut();
  }
}
function Vr(e, t, n, r, i = null) {
  let a = t.targetStart = n(``),
    o = t.targetAnchor = n(``);
  return a[kr] = o, e && (r(a, e, i), r(o, e, i)), o;
}
var Hr = Symbol(`_leaveCb`),
  Ur = Symbol(`_enterCb`);
function Wr() {
  let e = {
    isMounted: false,
    isLeaving: false,
    isUnmounting: false,
    leavingVNodes: new Map()
  };
  return Xi(() => {
    e.isMounted = true;
  }), $i(() => {
    e.isUnmounting = true;
  }), e;
}
var Gr = [Function, Array],
  Kr = {
    mode: String,
    appear: Boolean,
    persisted: Boolean,
    onBeforeEnter: Gr,
    onEnter: Gr,
    onAfterEnter: Gr,
    onEnterCancelled: Gr,
    onBeforeLeave: Gr,
    onLeave: Gr,
    onAfterLeave: Gr,
    onLeaveCancelled: Gr,
    onBeforeAppear: Gr,
    onAppear: Gr,
    onAfterAppear: Gr,
    onAppearCancelled: Gr
  },
  qr = e => {
    let t = e.subTree;
    return t.component ? qr(t.component) : t;
  },
  Jr = {
    name: `BaseTransition`,
    props: Kr,
    setup(e, {
      slots: t
    }) {
      let n = Ls(),
        r = Wr();
      return () => {
        let i = t.default && ni(t.default(), true),
          a = i && i.length ? Yr(i) : n.subTree ? Os() : undefined;
        if (!a) return;
        let o = F(e),
          {
            mode: s
          } = o;
        if (r.isLeaving) return $r(a);
        let c = ei(a);
        if (!c) return $r(a);
        let l = Qr(c, o, r, n, e => l = e);
        c.type !== B && ti(c, l);
        let u = n.subTree && ei(n.subTree);
        if (u && u.type !== B && !vs(u, c) && qr(n).type !== B) {
          let e = Qr(u, o, r, n);
          if (ti(u, e), s === `out-in` && c.type !== B) return r.isLeaving = true, e.afterLeave = () => {
            r.isLeaving = false, n.job.flags & 8 || n.update(), delete e.afterLeave, u = undefined;
          }, $r(a);
          s === `in-out` && c.type !== B ? e.delayLeave = (e, t, n) => {
            let i = Zr(r, u);
            i[String(u.key)] = u, e[Hr] = () => {
              t(), e[Hr] = undefined, delete l.delayedLeave, u = undefined;
            }, l.delayedLeave = () => {
              n(), delete l.delayedLeave, u = undefined;
            };
          } : u = undefined;
        } else u &&= undefined;
        return a;
      };
    }
  };
function Yr(e) {
  let t = e[0];
  if (e.length > 1) {
    for (let n of e) if (n.type !== B) {
      t = n;
      break;
    }
  }
  return t;
}
var Xr = Jr;
function Zr(e, t) {
  let {
      leavingVNodes: n
    } = e,
    r = n.get(t.type);
  return r || (r = Object.create(null), n.set(t.type, r)), r;
}
function Qr(e, t, n, r, i) {
  let {
      appear: a,
      mode: o,
      persisted: s = false,
      onBeforeEnter: c,
      onEnter: l,
      onAfterEnter: u,
      onEnterCancelled: f,
      onBeforeLeave: p,
      onLeave: m,
      onAfterLeave: h,
      onLeaveCancelled: g,
      onBeforeAppear: _,
      onAppear: v,
      onAfterAppear: y,
      onAppearCancelled: b
    } = t,
    x = String(e.key),
    S = Zr(n, e),
    C = (e, t) => {
      e && Bn(e, r, 9, t);
    },
    w = (e, t) => {
      let n = t[1];
      C(e, t), d(e) ? e.every(e => e.length <= 1) && n() : e.length <= 1 && n();
    },
    T = {
      mode: o,
      persisted: s,
      beforeEnter(t) {
        let r = c;
        if (!n.isMounted) {
          if (a) r = _ || c;else return;
        }
        t[Hr] && t[Hr](true);
        let i = S[x];
        i && vs(e, i) && i.el[Hr] && i.el[Hr](), C(r, [t]);
      },
      enter(t) {
        if (S[x] === e) return;
        let r = l,
          i = u,
          o = f;
        if (!n.isMounted) {
          if (a) r = v || l, i = y || u, o = b || f;else return;
        }
        let s = false;
        t[Ur] = e => {
          s || (s = true, C(e ? o : i, [t]), T.delayedLeave && T.delayedLeave(), t[Ur] = undefined);
        };
        let c = t[Ur].bind(null, false);
        r ? w(r, [t, c]) : c();
      },
      leave(t, r) {
        let i = String(e.key);
        if (t[Ur] && t[Ur](true), n.isUnmounting) return r();
        C(p, [t]);
        let a = false;
        t[Hr] = n => {
          a || (a = true, r(), C(n ? g : h, [t]), t[Hr] = undefined, S[i] === e && delete S[i]);
        };
        let o = t[Hr].bind(null, false);
        S[i] = e, m ? w(m, [t, o]) : o();
      },
      clone(e) {
        let a = Qr(e, t, n, r, i);
        return i && i(a), a;
      }
    };
  return T;
}
function $r(e) {
  if (Ri(e)) return e = Ts(e), e.children = null, e;
}
function ei(e) {
  if (!Ri(e)) return Ar(e.type) && e.children ? Yr(e.children) : e;
  if (e.component) return e.component.subTree;
  let {
    shapeFlag: t,
    children: n
  } = e;
  if (n) {
    if (t & 16) return n[0];
    if (t & 32 && g(n.default)) return n.default();
  }
}
function ti(e, t) {
  if (e.shapeFlag & 6 && e.component) {
    e.transition = t;
    let n = e.component.subTree;
    ti(Ar(n.type) && ei(n) || n, t);
  } else e.shapeFlag & 128 ? (e.ssContent.transition = t.clone(e.ssContent), e.ssFallback.transition = t.clone(e.ssFallback)) : e.transition = t;
}
function ni(e, t = false, n) {
  let r = [],
    i = 0;
  for (let a = 0; a < e.length; a++) {
    let o = e[a],
      s = n == null ? o.key : String(n) + String(o.key == null ? a : o.key);
    o.type === z ? (o.patchFlag & 128 && i++, r = r.concat(ni(o.children, t, s))) : (t || o.type !== B) && r.push(s == null ? o : Ts(o, {
      key: s
    }));
  }
  if (i > 1) for (let e = 0; e < r.length; e++) r[e].patchFlag = -2;
  return r;
}
function ri(e, t) {
  return g(e) ? s({
    name: e.name
  }, t, {
    setup: e
  }) : e;
}
function ii() {
  let e = Ls();
  return e ? (e.appContext.config.idPrefix || `v`) + `-` + e.ids[0] + e.ids[1]++ : ``;
}
function ai(e) {
  e.ids = [e.ids[0] + e.ids[2]++ + `-`, 0, 0];
}
function oi(e) {
  let n = Ls(),
    r = sn(null);
  if (n) {
    let i = n.refs === t ? n.refs = {} : n.refs;
    Object.defineProperty(i, e, {
      enumerable: true,
      get: () => r.value,
      set: e => r.value = e
    });
  }
  return r;
}
function si(e, t) {
  let n;
  return !!((n = Object.getOwnPropertyDescriptor(e, t)) && !n.configurable);
}
var ci = new WeakMap();
function li(e, n, r, a, o = false) {
  if (d(e)) {
    e.forEach((e, t) => li(e, n && (d(n) ? n[t] : n), r, a, o));
    return;
  }
  if (Fi(a) && !o) {
    a.shapeFlag & 512 && a.type.__asyncResolved && a.component.subTree.component && li(e, n, r, a.component.subTree);
    return;
  }
  let s = a.shapeFlag & 4 ? ec(a.component) : a.el,
    l = o ? null : s,
    {
      i: f,
      r: p
    } = e,
    m = n && n.r,
    h = f.refs === t ? f.refs = {} : f.refs,
    v = f.setupState,
    y = F(v),
    b = v === t ? i : e => !si(h, e) && u(y, e),
    x = (e, t) => !(t && si(h, t));
  if (m != null && m !== p) {
    if (ui(n), _(m)) h[m] = null, b(m) && (v[m] = null);else if (I(m)) {
      let e = n;
      x(m, e.k) && (m.value = null), e.k && (h[e.k] = null);
    }
  }
  if (g(p)) zn(p, f, 12, [l, h]);else {
    let t = _(p),
      n = I(p);
    if (t || n) {
      let i = () => {
        if (e.f) {
          let n = t ? b(p) ? v[p] : h[p] : x(p) || !e.k ? p.value : h[e.k];
          if (o) d(n) && c(n, s);else if (d(n)) n.includes(s) || n.push(s);else if (t) h[p] = [s], b(p) && (v[p] = h[p]);else {
            let t = [s];
            x(p, e.k) && (p.value = t), e.k && (h[e.k] = t);
          }
        } else t ? (h[p] = l, b(p) && (v[p] = l)) : n && (x(p, e.k) && (p.value = l), e.k && (h[e.k] = l));
      };
      if (l) {
        let t = () => {
          i(), ci.delete(e);
        };
        t.id = -1, ci.set(e, t), R(t, r);
      } else ui(e), i();
    }
  }
}
function ui(e) {
  let t = ci.get(e);
  t && (t.flags |= 8, ci.delete(e));
}
var di = false,
  fi = () => {
    di ||= (console.error(`Hydration completed but contains mismatches.`), true);
  },
  pi = e => e.namespaceURI.includes(`svg`) && e.tagName !== `foreignObject`,
  mi = e => e.namespaceURI.includes(`MathML`),
  hi = e => {
    if (e.nodeType === 1) {
      if (pi(e)) return `svg`;
      if (mi(e)) return `mathml`;
    }
  },
  gi = e => e.nodeType === 8;
function _i(e) {
  let {
      mt: t,
      p: n,
      o: {
        patchProp: r,
        createText: i,
        nextSibling: o,
        parentNode: s,
        remove: c,
        insert: l,
        createComment: u
      }
    } = e,
    d = (e, t) => {
      if (!t.hasChildNodes()) {
        n(null, e, t), nr(), t._vnode = e;
        return;
      }
      f(t.firstChild, e, null, null, null), nr(), t._vnode = e;
    },
    f = (n, r, a, c, u, d = false) => {
      d ||= !!r.dynamicChildren;
      let b = gi(n) && n.data === `[`,
        x = () => g(n, r, a, c, u, b),
        {
          type: S,
          ref: C,
          shapeFlag: w,
          patchFlag: T
        } = r,
        E = n.nodeType;
      r.el = n, T === -2 && (d = false, r.dynamicChildren = null);
      let D = null;
      switch (S) {
        case os:
          E === 3 ? (n.data !== r.children && (fi(), n.data = r.children), D = o(n)) : r.children === `` ? (l(r.el = i(``), s(n), n), D = n) : D = x();
          break;
        case B:
          y(n) ? (D = o(n), v(r.el = n.content.firstChild, n, a)) : D = E !== 8 || b ? x() : o(n);
          break;
        case ss:
          if (b && (n = o(n), E = n.nodeType), E === 1 || E === 3) {
            D = n;
            let e = !r.children.length;
            for (let t = 0; t < r.staticCount; t++) e && (r.children += D.nodeType === 1 ? D.outerHTML : D.data), t === r.staticCount - 1 && (r.anchor = D), D = o(D);
            return b ? o(D) : D;
          }
          x();
          break;
        case z:
          D = b ? h(n, r, a, c, u, d) : x();
          break;
        default:
          if (w & 1) D = (E !== 1 || r.type.toLowerCase() !== n.tagName.toLowerCase()) && !y(n) ? x() : p(n, r, a, c, u, d);else if (w & 6) {
            r.slotScopeIds = u;
            let e = s(n);
            if (D = b ? _(n) : gi(n) && n.data === `teleport start` ? _(n, n.data, `teleport end`) : o(n), t(r, e, null, a, c, hi(e), d), (Fi(r) || r.component.asyncDep) && !r.component.subTree) {
              let t;
              b ? (t = V(ss), t.anchor = D ? D.previousSibling : e.lastChild) : t = n.nodeType === 3 ? Es(``) : V(n.nodeType === 8 ? B : `div`), t.el = n, r.component.subTree = t;
            }
          } else w & 64 ? D = E === 8 ? r.type.hydrate(n, r, a, c, u, d, e, m) : x() : w & 128 && (D = r.type.hydrate(n, r, a, c, hi(s(n)), u, d, e, f));
      }
      return C != null && li(C, null, c, r), D;
    },
    p = (e, t, n, i, o, s) => {
      s ||= !!t.dynamicChildren;
      let {
          type: l,
          dynamicProps: u,
          props: d,
          patchFlag: f,
          shapeFlag: p,
          dirs: h,
          transition: g
        } = t,
        _ = l === `input` || l === `option`,
        b = !!u;
      if (_ || b || f !== -1) {
        h && hr(t, null, n, `created`);
        let l = false;
        if (y(e)) {
          l = Vo(null, g) && n && n.vnode.props && n.vnode.props.appear;
          let r = e.content.firstChild;
          if (l) {
            let e = r.getAttribute(`class`);
            e && (r.$cls = e), g.beforeEnter(r);
          }
          v(r, e, n), t.el = e = r;
        }
        if (p & 16 && !(d && (d.innerHTML || d.textContent))) {
          let r = m(e.firstChild, t, e, n, i, o, s);
          for (r && !Si(e, 1) && fi(); r;) {
            let e = r;
            r = r.nextSibling, c(e);
          }
        } else if (p & 8) {
          let n = t.children;
          n[0] === `
` && (e.tagName === `PRE` || e.tagName === `TEXTAREA`) && (n = n.slice(1));
          let {
            textContent: r
          } = e;
          r !== n && r !== n.replace(/\r\n|\r/g, `
`) && (Si(e, 0) || fi(), e.textContent = t.children);
        }
        if (d) {
          if (_ || b || !s || f & 48) {
            let t = e.tagName.includes(`-`),
              i = e.namespaceURI.includes(`svg`) ? `svg` : e.namespaceURI.includes(`MathML`) ? `mathml` : undefined;
            for (let o in d) if (_ && (o.endsWith(`value`) || o === `indeterminate`) || a(o) && !E(o) || o[0] === `.` || t && !E(o) || u && u.includes(o)) {
              if (yi(e, o, d[o])) continue;
              r(e, o, null, d[o], i, n);
            }
          } else if (d.onClick) r(e, `onClick`, null, d.onClick, undefined, n);else if (f & 4 && Qt(d.style)) for (let e in d.style) d.style[e];
        }
        let x;
        (x = d && d.onVnodeBeforeMount) && Ns(x, n, t), h && hr(t, null, n, `beforeMount`), ((x = d && d.onVnodeMounted) || h || l) && rs(() => {
          x && Ns(x, n, t), l && g.enter(e), h && hr(t, null, n, `mounted`);
        }, i);
      }
      return e.nextSibling;
    },
    m = (e, t, r, a, s, c, u) => {
      u ||= !!t.dynamicChildren;
      let d = t.children,
        p = d.length,
        m = false;
      for (let t = 0; t < p; t++) {
        let h = u ? d[t] : d[t] = ks(d[t]),
          g = h.type === os;
        e ? (g && !u && t + 1 < p && ks(d[t + 1]).type === os && (l(i(e.data.slice(h.children.length)), r, o(e)), e.data = h.children), e = f(e, h, a, s, c, u)) : g && !h.children ? l(h.el = i(``), r) : (m || (m = true, Si(r, 1) || fi()), n(null, h, r, null, a, s, hi(r), c));
      }
      return e;
    },
    h = (e, t, n, r, i, a) => {
      let {
        slotScopeIds: c
      } = t;
      c && (i = i ? i.concat(c) : c);
      let d = s(e),
        f = m(o(e), t, d, n, r, i, a);
      return f && gi(f) && f.data === `]` ? o(t.anchor = f) : (fi(), l(t.anchor = u(`]`), d, f), f);
    },
    g = (e, t, r, i, a, l) => {
      if (wi(e, t) || fi(), t.el = null, l) {
        let t = _(e);
        for (;;) {
          let n = o(e);
          if (n && n !== t) c(n);else break;
        }
      }
      let u = o(e),
        d = s(e);
      return c(e), n(null, t, d, u, r, i, hi(d), a), r && (r.vnode.el = t.el, _o(r, t.el)), u;
    },
    _ = (e, t = `[`, n = `]`) => {
      let r = 0;
      for (; e;) if (e = o(e), e && gi(e) && (e.data === t && r++, e.data === n)) {
        if (r === 0) return o(e);
        r--;
      }
      return e;
    },
    v = (e, t, n) => {
      let r = t.parentNode;
      r && r.replaceChild(e, t);
      let i = n;
      for (; i;) i.vnode.el === t && (i.vnode.el = i.subTree.el = e), i = i.parent;
    },
    y = e => e.nodeType === 1 && e.tagName === `TEMPLATE`;
  return [d, f];
}
var vi = new Set([`src`, `srcset`, `href`, `poster`]);
function yi(e, t, n) {
  return vi.has(t) ? e.getAttribute(t) === (n == null ? null : `${n}`) : false;
}
var bi = `data-allow-mismatch`,
  xi = {
    0: `text`,
    1: `children`,
    2: `class`,
    3: `style`,
    4: `attribute`
  };
function Si(e, t) {
  if (t === 0 || t === 1) for (; e && !e.hasAttribute(bi);) e = e.parentElement;
  return Ci(e && e.getAttribute(bi), t);
}
function Ci(e, t) {
  if (e == null) return false;
  if (e === ``) return true;
  {
    let n = e.split(`,`);
    return t === 0 && n.includes(`children`) ? true : n.includes(xi[t]);
  }
}
function wi(e, t) {
  return Si(e.parentElement, 1) || Ti(e) || Ei(t);
}
function Ti(e) {
  return e.nodeType === 1 && Ci(e.getAttribute(bi), 1);
}
function Ei({
  props: e
}) {
  let t = e && e[bi];
  return typeof t == `string` && Ci(t, 1);
}
var Di = ce().requestIdleCallback || (e => setTimeout(e, 1)),
  Oi = ce().cancelIdleCallback || (e => clearTimeout(e)),
  ki = (e = 1e4) => t => {
    let n = Di(t, {
      timeout: e
    });
    return () => Oi(n);
  };
function Ai(e) {
  let {
      top: t,
      left: n,
      bottom: r,
      right: i
    } = e.getBoundingClientRect(),
    {
      innerHeight: a,
      innerWidth: o
    } = window;
  return (t > 0 && t < a || r > 0 && r < a) && (n > 0 && n < o || i > 0 && i < o);
}
var ji = e => (t, n) => {
    let r = new IntersectionObserver(e => {
      for (let n of e) if (n.isIntersecting) {
        r.disconnect(), t();
        break;
      }
    }, e);
    return n(e => {
      if (e instanceof Element) {
        if (Ai(e)) return t(), r.disconnect(), false;
        r.observe(e);
      }
    }), () => r.disconnect();
  },
  Mi = e => t => {
    if (e) {
      let n = matchMedia(e);
      if (n.matches) t();else return n.addEventListener(`change`, t, {
        once: true
      }), () => n.removeEventListener(`change`, t);
    }
  },
  Ni = (e = []) => (t, n) => {
    _(e) && (e = [e]);
    let r = false,
      i = e => {
        r || (r = true, a(), t(), e.target.dispatchEvent(new e.constructor(e.type, e)));
      },
      a = () => {
        n(t => {
          for (let n of e) t.removeEventListener(n, i);
        });
      };
    return n(t => {
      for (let n of e) t.addEventListener(n, i, {
        once: true
      });
    }), a;
  };
function Pi(e, t) {
  if (gi(e) && e.data === `[`) {
    let n = 1,
      r = e.nextSibling;
    for (; r;) {
      if (r.nodeType === 1) {
        if (t(r) === false) break;
      } else if (gi(r)) {
        if (r.data === `]`) {
          if (--n === 0) break;
        } else r.data === `[` && n++;
      }
      r = r.nextSibling;
    }
  } else t(e);
}
var Fi = e => !!e.type.__asyncLoader;
function Ii(e) {
  g(e) && (e = {
    loader: e
  });
  let {
      loader: t,
      loadingComponent: n,
      errorComponent: r,
      delay: i = 200,
      hydrate: a,
      timeout: o,
      suspensible: s = true,
      onError: c
    } = e,
    l = null,
    u,
    d = 0,
    f = () => (d++, l = null, p()),
    p = () => {
      let e;
      return l || (e = l = t().catch(e => {
        if (e = e instanceof Error ? e : Error(String(e)), c) return new Promise((t, n) => {
          c(e, () => t(f()), () => n(e), d + 1);
        });
        throw e;
      }).then(t => e !== l && l ? l : (t && (t.__esModule || t[Symbol.toStringTag] === `Module`) && (t = t.default), u = t, t)));
    };
  return ri({
    name: `AsyncComponentWrapper`,
    __asyncLoader: p,
    __asyncHydrate(e, t, n) {
      let r = e.isConnected,
        i = false;
      (t.bu ||= []).push(() => i = true);
      let o = () => {
          i || !e.parentNode || r && !e.isConnected || n();
        },
        s = a ? () => {
          let n = a(o, t => Pi(e, t));
          n && (t.bum ||= []).push(n);
        } : o;
      u ? s() : p().then(() => !t.isUnmounted && s());
    },
    get __asyncResolved() {
      return u;
    },
    setup() {
      let e = H;
      if (ai(e), u) return () => Li(u, e);
      let t = t => {
        l = null, Vn(t, e, 13, !r);
      };
      if (s && e.suspense || Us) return p().then(t => () => Li(t, e)).catch(e => (t(e), () => r ? V(r, {
        error: e
      }) : null));
      let a = on(false),
        c = on(),
        d = on(!!i),
        f,
        m;
      return ea(() => {
        f != null && clearTimeout(f), m != null && clearTimeout(m);
      }), i && (m = setTimeout(() => {
        e.isUnmounted || (d.value = false);
      }, i)), o != null && (f = setTimeout(() => {
        if (!e.isUnmounted && !a.value && !c.value) {
          let e = Error(`Async component timed out after ${o}ms.`);
          t(e), c.value = e;
        }
      }, o)), p().then(() => {
        e.isUnmounted || (a.value = true, e.parent && Ri(e.parent.vnode) && e.parent.update());
      }).catch(n => {
        if (e.isUnmounted) {
          l = null;
          return;
        }
        t(n), c.value = n;
      }), () => {
        if (a.value && u) return Li(u, e);
        if (c.value && r) return V(r, {
          error: c.value
        });
        if (n && !d.value) return Li(n, e);
      };
    }
  });
}
function Li(e, t) {
  let {
      ref: n,
      props: r,
      children: i,
      ce: a
    } = t.vnode,
    o = V(e, r, i);
  return o.ref = n, o.ce = a, delete t.vnode.ce, o;
}
var Ri = e => e.type.__isKeepAlive,
  zi = {
    name: `KeepAlive`,
    __isKeepAlive: true,
    props: {
      include: [String, RegExp, Array],
      exclude: [String, RegExp, Array],
      max: [String, Number]
    },
    setup(e, {
      slots: t
    }) {
      let n = Ls(),
        r = n.ctx;
      if (!r.renderer) return () => {
        let e = t.default && t.default();
        return e && e.length === 1 ? e[0] : e;
      };
      let i = new Map(),
        a = new Set(),
        o = null,
        s = n.suspense,
        {
          renderer: {
            p: c,
            m: l,
            um: u,
            o: {
              createElement: d
            }
          }
        } = r,
        f = d(`div`);
      r.activate = (e, t, n, r, i) => {
        let a = e.component;
        l(e, t, n, 0, s), c(a.vnode, e, t, n, a, s, r, e.slotScopeIds, i), R(() => {
          a.isDeactivated = false, a.a && j(a.a);
          let t = e.props && e.props.onVnodeMounted;
          t && Ns(t, a.parent, e);
        }, s);
      }, r.deactivate = e => {
        let t = e.component;
        Go(t.m), Go(t.a), l(e, f, null, 1, s), R(() => {
          t.da && j(t.da);
          let n = e.props && e.props.onVnodeUnmounted;
          n && Ns(n, t.parent, e), t.isDeactivated = true;
        }, s);
      };
      function p(e) {
        Gi(e), u(e, n, s, true);
      }
      function m(e) {
        i.forEach((t, n) => {
          let r = tc(Fi(t) ? t.type.__asyncResolved || {} : t.type);
          r && !e(r) && h(n);
        });
      }
      function h(e) {
        let t = i.get(e);
        t && (!o || !vs(t, o)) ? p(t) : o && Gi(o), i.delete(e), a.delete(e);
      }
      wr(() => [e.include, e.exclude], ([e, t]) => {
        e && m(t => Bi(e, t)), t && m(e => !Bi(t, e));
      }, {
        flush: `post`,
        deep: true
      });
      let g = null,
        _ = () => {
          g != null && (qo(n.subTree.type) ? R(() => {
            let e = Ki(n.subTree);
            e.component && i.set(g, e);
          }, n.subTree.suspense) : i.set(g, Ki(n.subTree)));
        };
      return Xi(_), Qi(_), $i(() => {
        i.forEach(e => {
          let {
              subTree: t,
              suspense: r
            } = n,
            i = Ki(t);
          if (e.type === i.type && e.key === i.key) {
            Gi(i);
            let e = i.component.da;
            e && R(e, r);
            return;
          }
          p(e);
        });
      }), () => {
        if (g = null, !t.default) return o = null;
        let n = t.default(),
          r = n[0];
        if (n.length > 1) return o = null, n;
        if (!_s(r) || !(r.shapeFlag & 4) && !(r.shapeFlag & 128)) return o = null, r;
        let s = Ki(r);
        if (s.type === B) return o = null, s;
        let c = s.type,
          l = tc(Fi(s) ? s.type.__asyncResolved || {} : c),
          {
            include: u,
            exclude: d,
            max: f
          } = e;
        if (u && (!l || !Bi(u, l)) || d && l && Bi(d, l)) return s.shapeFlag &= -257, o = s, r;
        let p = s.key == null ? c : s.key,
          m = i.get(p);
        return s.el && (s = Ts(s), r.shapeFlag & 128 && (r.ssContent = s)), g = p, m ? (s.el = m.el, s.component = m.component, s.transition && ti(s, s.transition), s.shapeFlag |= 512, a.delete(p), a.add(p)) : (a.add(p), f && a.size > parseInt(f, 10) && h(a.values().next().value)), s.shapeFlag |= 256, o = s, qo(r.type) ? r : s;
      };
    }
  };
function Bi(e, t) {
  return d(e) ? e.some(e => Bi(e, t)) : _(e) ? e.split(`,`).includes(t) : h(e) ? (e.lastIndex = 0, e.test(t)) : false;
}
function Vi(e, t) {
  Ui(e, `a`, t);
}
function Hi(e, t) {
  Ui(e, `da`, t);
}
function Ui(e, t, n = H) {
  let r = e.__wdc ||= () => {
    let t = n;
    for (; t;) {
      if (t.isDeactivated) return;
      t = t.parent;
    }
    return e();
  };
  if (qi(t, r, n), n) {
    let e = n.parent;
    for (; e && e.parent;) Ri(e.parent.vnode) && Wi(r, t, n, e), e = e.parent;
  }
}
function Wi(e, t, n, r) {
  let i = qi(t, e, r, true);
  ea(() => {
    c(r[t], i);
  }, n);
}
function Gi(e) {
  e.shapeFlag &= -257, e.shapeFlag &= -513;
}
function Ki(e) {
  return e.shapeFlag & 128 ? e.ssContent : e;
}
function qi(e, t, n = H, r = false) {
  if (n) {
    let i = n[e] || (n[e] = []),
      a = t.__weh ||= (...r) => {
        Qe();
        let i = Bs(n),
          a = Bn(t, n, e, r);
        return i(), $e(), a;
      };
    return r ? i.unshift(a) : i.push(a), a;
  }
}
var Ji = e => (t, n = H) => {
    (!Us || e === `sp`) && qi(e, (...e) => t(...e), n);
  },
  Yi = Ji(`bm`),
  Xi = Ji(`m`),
  Zi = Ji(`bu`),
  Qi = Ji(`u`),
  $i = Ji(`bum`),
  ea = Ji(`um`),
  ta = Ji(`sp`),
  na = Ji(`rtg`),
  ra = Ji(`rtc`);
function ia(e, t = H) {
  qi(`ec`, e, t);
}
var aa = `components`,
  oa = `directives`;
function sa(e, t) {
  return da(aa, e, true, t) || e;
}
var ca = Symbol.for(`v-ndc`);
function la(e) {
  return _(e) ? da(aa, e, false) || e : e || ca;
}
function ua(e) {
  return da(oa, e);
}
function da(e, t, n = true, r = false) {
  let i = L || H;
  if (i) {
    let n = i.type;
    if (e === aa) {
      let e = tc(n, false);
      if (e && (e === t || e === k(t) || e === ne(k(t)))) return n;
    }
    let a = fa(i[e] || n[e], t) || fa(i.appContext[e], t);
    return !a && r ? n : a;
  }
}
function fa(e, t) {
  return e && (e[t] || e[k(t)] || e[ne(k(t))]);
}
function pa(e, t, n, r) {
  let i,
    a = n && n[r],
    o = d(e);
  if (o || _(e)) {
    let n = o && Qt(e),
      r = false,
      s = false;
    n && (r = !en(e), s = $t(e), e = pt(e)), i = Array(e.length);
    for (let n = 0, o = e.length; n < o; n++) i[n] = t(r ? s ? an(rn(e[n])) : rn(e[n]) : e[n], n, undefined, a && a[n]);
  } else if (typeof e == `number`) {
    i = Array(e);
    for (let n = 0; n < e; n++) i[n] = t(n + 1, n, undefined, a && a[n]);
  } else if (y(e)) {
    if (e[Symbol.iterator]) i = Array.from(e, (e, n) => t(e, n, undefined, a && a[n]));else {
      let n = Object.keys(e);
      i = Array(n.length);
      for (let r = 0, o = n.length; r < o; r++) {
        let o = n[r];
        i[r] = t(e[o], o, r, a && a[r]);
      }
    }
  } else i = [];
  return n && (n[r] = i), i;
}
function ma(e, t) {
  for (let n = 0; n < t.length; n++) {
    let r = t[n];
    if (d(r)) for (let t = 0; t < r.length; t++) e[r[t].name] = r[t].fn;else r && (e[r.name] = r.key ? (...e) => {
      let t = r.fn(...e);
      return t && (t.key = r.key), t;
    } : r.fn);
  }
  return e;
}
function ha(e, t, n, r, i, a) {
  if (n ??= {}, L.ce || L.parent && Fi(L.parent) && L.parent.ce) {
    let e = a != null && n.key == null ? s({}, n, {
        key: a
      }) : n,
      i = Object.keys(e).length > 0;
    return t !== "default" && (e.name = t), us(), gs(z, null, [V(`slot`, e, r && r())], i ? -2 : 64);
  }
  let o = e[t];
  o && o._c && (o._d = false);
  let c = cs.length;
  us();
  let l;
  try {
    let i = o && ga(o(n)),
      s = n.key || a || i && i.key;
    l = gs(z, {
      key: (s && !v(s) ? s : `_${t}`) + (!i && r ? `_fb` : ``)
    }, i || (r ? r() : []), i && e._ === 1 ? 64 : -2);
  } catch (e) {
    for (let e = cs.length; e > c; e--) ds();
    throw e;
  } finally {
    o && o._c && (o._d = true);
  }
  return !i && l.scopeId && (l.slotScopeIds = [l.scopeId + `-s`]), l;
}
function ga(e) {
  return e.some(e => !_s(e) || !(e.type === B || e.type === z && !ga(e.children))) ? e : null;
}
function _a(e, t) {
  let n = {};
  for (let r in e) n[t && /[A-Z]/.test(r) ? `on:${r}` : re(r)] = e[r];
  return n;
}
var va = e => e ? Hs(e) ? ec(e) : va(e.parent) : null,
  ya = s(Object.create(null), {
    $: e => e,
    $el: e => e.vnode.el,
    $data: e => e.data,
    $props: e => e.props,
    $attrs: e => e.attrs,
    $slots: e => e.slots,
    $refs: e => e.refs,
    $parent: e => va(e.parent),
    $root: e => va(e.root),
    $host: e => e.ce,
    $emit: e => e.emit,
    $options: e => Ua(e),
    $forceUpdate: e => e.f ||= () => {
      Qn(e.update);
    },
    $nextTick: e => e.n ||= Xn.bind(e.proxy),
    $watch: e => Er.bind(e)
  }),
  ba = (e, n) => e !== t && !e.__isScriptSetup && u(e, n),
  xa = {
    get({
      _: e
    }, n) {
      if (n === `__v_skip`) return true;
      let {
        ctx: r,
        setupState: i,
        data: a,
        props: o,
        accessCache: s,
        type: c,
        appContext: l
      } = e;
      if (n[0] !== `$`) {
        let e = s[n];
        if (e !== undefined) switch (e) {
          case 1:
            return i[n];
          case 2:
            return a[n];
          case 4:
            return r[n];
          case 3:
            return o[n];
        } else if (ba(i, n)) return s[n] = 1, i[n];else if (a !== t && u(a, n)) return s[n] = 2, a[n];else if (u(o, n)) return s[n] = 3, o[n];else if (r !== t && u(r, n)) return s[n] = 4, r[n];else Ra && (s[n] = 0);
      }
      let d = ya[n],
        f,
        p;
      if (d) return n === `$attrs` && lt(e.attrs, `get`, ``), d(e);
      if ((f = c.__cssModules) && (f = f[n])) return f;
      if (r !== t && u(r, n)) return s[n] = 4, r[n];
      if (p = l.config.globalProperties, u(p, n)) return p[n];
    },
    set({
      _: e
    }, n, r) {
      let {
        data: i,
        setupState: a,
        ctx: o
      } = e;
      return ba(a, n) ? (a[n] = r, true) : i !== t && u(i, n) ? (i[n] = r, true) : u(e.props, n) || n[0] === `$` && n.slice(1) in e ? false : (o[n] = r, true);
    },
    has({
      _: {
        data: e,
        setupState: n,
        accessCache: r,
        ctx: i,
        appContext: a,
        props: o,
        type: s
      }
    }, c) {
      let l;
      return !!(r[c] || e !== t && c[0] !== `$` && u(e, c) || ba(n, c) || u(o, c) || u(i, c) || u(ya, c) || u(a.config.globalProperties, c) || (l = s.__cssModules) && l[c]);
    },
    defineProperty(e, t, n) {
      return n.get == null ? u(n, `value`) && this.set(e, t, n.value, null) : e._.accessCache[t] = 0, Reflect.defineProperty(e, t, n);
    }
  },
  Sa = s({}, xa, {
    get(e, t) {
      if (t !== Symbol.unscopables) return xa.get(e, t, e);
    },
    has(e, t) {
      return t[0] !== `_` && !le(t);
    }
  });
function Ca() {
  return null;
}
function wa() {
  return null;
}
function Ta(e) {}
function Ea(e) {}
function Da() {
  return null;
}
function Oa() {}
function ka(e, t) {
  return null;
}
function Aa() {
  return Ma(`useSlots`).slots;
}
function ja() {
  return Ma(`useAttrs`).attrs;
}
function Ma(e) {
  let t = Ls();
  return t.setupContext ||= $s(t);
}
function Na(e) {
  return d(e) ? e.reduce((e, t) => (e[t] = null, e), {}) : e;
}
function Pa(e, t) {
  let n = Na(e);
  for (let e in t) {
    if (e.startsWith(`__skip`)) continue;
    let r = n[e];
    r ? d(r) || g(r) ? r = n[e] = {
      type: r,
      default: t[e]
    } : r.default = t[e] : r === null && (r = n[e] = {
      default: t[e]
    }), r && t[`__skip_${e}`] && (r.skipFactory = true);
  }
  return n;
}
function Fa(e, t) {
  return !e || !t ? e || t : d(e) && d(t) ? e.concat(t) : s({}, Na(e), Na(t));
}
function Ia(e, t) {
  let n = {};
  for (let r in e) t.includes(r) || Object.defineProperty(n, r, {
    enumerable: true,
    get: () => e[r]
  });
  return n;
}
function La(e) {
  let t = Ls(),
    n = Us,
    r = e();
  Vs(), n && zs(false);
  let i = () => {
      Bs(t), n && zs(true);
    },
    a = () => {
      Ls() !== t && t.scope.off(), Vs(), n && zs(false);
    };
  return b(r) && (r = r.catch(e => {
    throw i(), Promise.resolve().then(() => Promise.resolve().then(a)), e;
  })), [r, () => {
    i(), Promise.resolve().then(a);
  }];
}
var Ra = true;
function za(e) {
  let t = Ua(e),
    n = e.proxy,
    i = e.ctx;
  Ra = false, t.beforeCreate && Va(t.beforeCreate, e, `bc`);
  let {
    data: a,
    computed: o,
    methods: s,
    watch: c,
    provide: l,
    inject: u,
    created: f,
    beforeMount: p,
    mounted: m,
    beforeUpdate: h,
    updated: _,
    activated: v,
    deactivated: b,
    beforeDestroy: x,
    beforeUnmount: S,
    destroyed: C,
    unmounted: w,
    render: T,
    renderTracked: E,
    renderTriggered: D,
    errorCaptured: O,
    serverPrefetch: k,
    expose: ee,
    inheritAttrs: te,
    components: ne,
    directives: re,
    filters: A
  } = t;
  if (u && Ba(u, i, null), s) for (let e in s) {
    let t = s[e];
    g(t) && (i[e] = t.bind(n));
  }
  if (a) {
    let t = a.call(n, n);
    y(t) && (e.data = qt(t));
  }
  if (Ra = true, o) for (let e in o) {
    let t = o[e],
      a = rc({
        get: g(t) ? t.bind(n, n) : g(t.get) ? t.get.bind(n, n) : r,
        set: !g(t) && g(t.set) ? t.set.bind(n) : r
      });
    Object.defineProperty(i, e, {
      enumerable: true,
      configurable: true,
      get: () => a.value,
      set: e => a.value = e
    });
  }
  if (c) for (let e in c) Ha(c[e], i, n, e);
  if (l) {
    let e = g(l) ? l.call(n) : l;
    Reflect.ownKeys(e).forEach(t => {
      gr(t, e[t]);
    });
  }
  f && Va(f, e, `c`);
  function j(e, t) {
    d(t) ? t.forEach(t => e(t.bind(n))) : t && e(t.bind(n));
  }
  if (j(Yi, p), j(Xi, m), j(Zi, h), j(Qi, _), j(Vi, v), j(Hi, b), j(ia, O), j(ra, E), j(na, D), j($i, S), j(ea, w), j(ta, k), d(ee)) {
    if (ee.length) {
      let t = e.exposed ||= {};
      ee.forEach(e => {
        Object.defineProperty(t, e, {
          get: () => n[e],
          set: t => n[e] = t,
          enumerable: true
        });
      });
    } else e.exposed ||= {};
  }
  T && e.render === r && (e.render = T), te != null && (e.inheritAttrs = te), ne && (e.components = ne), re && (e.directives = re), k && ai(e);
}
function Ba(e, t, n = r) {
  d(e) && (e = Ja(e));
  for (let n in e) {
    let r = e[n],
      i;
    i = y(r) ? `default` in r ? _r(r.from || n, r.default, true) : _r(r.from || n) : _r(r), I(i) ? Object.defineProperty(t, n, {
      enumerable: true,
      configurable: true,
      get: () => i.value,
      set: e => i.value = e
    }) : t[n] = i;
  }
}
function Va(e, t, n) {
  Bn(d(e) ? e.map(e => e.bind(t.proxy)) : e.bind(t.proxy), t, n);
}
function Ha(e, t, n, r) {
  let i = r.includes(`.`) ? Dr(n, r) : () => n[r];
  if (_(e)) {
    let n = t[e];
    g(n) && wr(i, n);
  } else if (g(e)) wr(i, e.bind(n));else if (y(e)) {
    if (d(e)) e.forEach(e => Ha(e, t, n, r));else {
      let r = g(e.handler) ? e.handler.bind(n) : t[e.handler];
      g(r) && wr(i, r, e);
    }
  }
}
function Ua(e) {
  let t = e.type,
    {
      mixins: n,
      extends: r
    } = t,
    {
      mixins: i,
      optionsCache: a,
      config: {
        optionMergeStrategies: o
      }
    } = e.appContext,
    s = a.get(t),
    c;
  return s ? c = s : !i.length && !n && !r ? c = t : (c = {}, i.length && i.forEach(e => Wa(c, e, o, true)), Wa(c, t, o)), y(t) && a.set(t, c), c;
}
function Wa(e, t, n, r = false) {
  let {
    mixins: i,
    extends: a
  } = t;
  a && Wa(e, a, n, true), i && i.forEach(t => Wa(e, t, n, true));
  for (let i in t) if (!(r && i === `expose`)) {
    let r = Ga[i] || n && n[i];
    e[i] = r ? r(e[i], t[i]) : t[i];
  }
  return e;
}
var Ga = {
  data: Ka,
  props: Za,
  emits: Za,
  methods: Xa,
  computed: Xa,
  beforeCreate: Ya,
  created: Ya,
  beforeMount: Ya,
  mounted: Ya,
  beforeUpdate: Ya,
  updated: Ya,
  beforeDestroy: Ya,
  beforeUnmount: Ya,
  destroyed: Ya,
  unmounted: Ya,
  activated: Ya,
  deactivated: Ya,
  errorCaptured: Ya,
  serverPrefetch: Ya,
  components: Xa,
  directives: Xa,
  watch: Qa,
  provide: Ka,
  inject: qa
};
function Ka(e, t) {
  return t ? e ? function () {
    return s(g(e) ? e.call(this, this) : e, g(t) ? t.call(this, this) : t);
  } : t : e;
}
function qa(e, t) {
  return Xa(Ja(e), Ja(t));
}
function Ja(e) {
  if (d(e)) {
    let t = {};
    for (let n = 0; n < e.length; n++) t[e[n]] = e[n];
    return t;
  }
  return e;
}
function Ya(e, t) {
  return e ? [...new Set([].concat(e, t))] : t;
}
function Xa(e, t) {
  return e ? s(Object.create(null), e, t) : t;
}
function Za(e, t) {
  return e ? d(e) && d(t) ? [...new Set([...e, ...t])] : s(Object.create(null), Na(e), Na(t ?? {})) : t;
}
function Qa(e, t) {
  if (!e) return t;
  if (!t) return e;
  let n = s(Object.create(null), e);
  for (let r in t) n[r] = Ya(e[r], t[r]);
  return n;
}
function $a() {
  return {
    app: null,
    config: {
      isNativeTag: i,
      performance: false,
      globalProperties: {},
      optionMergeStrategies: {},
      errorHandler: undefined,
      warnHandler: undefined,
      compilerOptions: {}
    },
    mixins: [],
    components: {},
    directives: {},
    provides: Object.create(null),
    optionsCache: new WeakMap(),
    propsCache: new WeakMap(),
    emitsCache: new WeakMap()
  };
}
var eo = 0;
function to(e, t) {
  return function (n, r = null) {
    g(n) || (n = s({}, n)), r != null && !y(r) && (r = null);
    let i = $a(),
      a = new WeakSet(),
      o = [],
      c = false,
      l = i.app = {
        _uid: eo++,
        _component: n,
        _props: r,
        _container: null,
        _context: i,
        _instance: null,
        version: cc,
        get config() {
          return i.config;
        },
        set config(e) {},
        use(e, ...t) {
          return a.has(e) || (e && g(e.install) ? (a.add(e), e.install(l, ...t)) : g(e) && (a.add(e), e(l, ...t))), l;
        },
        mixin(e) {
          return i.mixins.includes(e) || i.mixins.push(e), l;
        },
        component(e, t) {
          return t ? (i.components[e] = t, l) : i.components[e];
        },
        directive(e, t) {
          return t ? (i.directives[e] = t, l) : i.directives[e];
        },
        mount(a, o, s) {
          if (!c) {
            let u = l._ceVNode || V(n, r);
            return u.appContext = i, s === true ? s = `svg` : s === false && (s = undefined), o && t ? t(u, a) : e(u, a, s), c = true, l._container = a, a.__vue_app__ = l, ec(u.component);
          }
        },
        onUnmount(e) {
          o.push(e);
        },
        unmount() {
          c && (Bn(o, l._instance, 16), e(null, l._container), delete l._container.__vue_app__);
        },
        provide(e, t) {
          return i.provides[e] = t, l;
        },
        runWithContext(e) {
          let t = no;
          no = l;
          try {
            return e();
          } finally {
            no = t;
          }
        }
      };
    return l;
  };
}
var no = null;
function ro(e, n, r = t) {
  let i = Ls(),
    a = k(n),
    o = te(n),
    s = io(e, a),
    c = gn((s, c) => {
      let l,
        u = t,
        d;
      return Cr(() => {
        let t = e[a];
        A(l, t) && (l = t, c());
      }), {
        get() {
          return s(), r.get ? r.get(l) : l;
        },
        set(e) {
          let s = r.set ? r.set(e) : e;
          if (!A(s, l) && !(u !== t && A(e, u))) return;
          let f = i.vnode.props,
            p = !!(f && (n in f || a in f || o in f) && (`onUpdate:${n}` in f || `onUpdate:${a}` in f || `onUpdate:${o}` in f));
          p || (l = e, c()), i.emit(`update:${n}`, s), A(e, u) && (A(e, s) && !A(s, d) || p && u !== t && !A(s, l)) && c(), u = e, d = s;
        }
      };
    });
  return c[Symbol.iterator] = () => {
    let e = 0;
    return {
      next() {
        return e < 2 ? {
          value: e++ ? s || t : c,
          done: false
        } : {
          done: true
        };
      }
    };
  }, c;
}
var io = (e, t) => t === `modelValue` || t === `model-value` ? e.modelModifiers : e[`${t}Modifiers`] || e[`${k(t)}Modifiers`] || e[`${te(t)}Modifiers`];
function ao(e, n, ...r) {
  if (e.isUnmounted) return;
  let i = e.vnode.props || t,
    a = r,
    o = n.startsWith(`update:`),
    s = o && io(i, n.slice(7));
  s && (s.trim && (a = r.map(e => _(e) ? e.trim() : e)), s.number && (a = a.map(ae)));
  let c,
    l = i[c = re(n)] || i[c = re(k(n))];
  !l && o && (l = i[c = re(te(n))]), l && Bn(l, e, 6, a);
  let u = i[c + `Once`];
  if (u) {
    if (!e.emitted) e.emitted = {};else if (e.emitted[c]) return;
    e.emitted[c] = true, Bn(u, e, 6, a);
  }
}
var oo = new WeakMap();
function so(e, t, n = false) {
  let r = n ? oo : t.emitsCache,
    i = r.get(e);
  if (i !== undefined) return i;
  let a = e.emits,
    o = {},
    c = false;
  if (!g(e)) {
    let r = e => {
      let n = so(e, t, true);
      n && (c = true, s(o, n));
    };
    !n && t.mixins.length && t.mixins.forEach(r), e.extends && r(e.extends), e.mixins && e.mixins.forEach(r);
  }
  return !a && !c ? (y(e) && r.set(e, null), null) : (d(a) ? a.forEach(e => o[e] = null) : s(o, a), y(e) && r.set(e, o), o);
}
function co(e, t) {
  return !e || !a(t) ? false : (t = t.slice(2), t = t === `Once` ? t : t.replace(/Once$/, ``), u(e, t[0].toLowerCase() + t.slice(1)) || u(e, te(t)) || u(e, t));
}
function lo(e) {
  let {
      type: t,
      vnode: n,
      proxy: r,
      withProxy: i,
      propsOptions: [a],
      slots: s,
      attrs: c,
      emit: l,
      render: u,
      renderCache: d,
      props: f,
      data: p,
      setupState: m,
      ctx: h,
      inheritAttrs: g
    } = e,
    _ = lr(e),
    v,
    y;
  try {
    if (n.shapeFlag & 4) {
      let e = i || r,
        t = e;
      v = ks(u.call(t, e, d, f, m, p, h)), y = c;
    } else {
      let e = t;
      v = ks(e.length > 1 ? e(f, {
        attrs: c,
        slots: s,
        emit: l
      }) : e(f, null)), y = t.props ? c : fo(c);
    }
  } catch (t) {
    cs.length = 0, Vn(t, e, 1), v = V(B);
  }
  let b = v;
  if (y && g !== false) {
    let e = Object.keys(y),
      {
        shapeFlag: t
      } = b;
    e.length && t & 7 && (a && e.some(o) && (y = po(y, a)), b = Ts(b, y, false, true));
  }
  return n.dirs && (b = Ts(b, null, false, true), b.dirs = b.dirs ? b.dirs.concat(n.dirs) : n.dirs), n.transition && ti(Ar(b.type) && ei(b) || b, n.transition), v = b, lr(_), v;
}
function uo(e, t = true) {
  let n;
  for (let t = 0; t < e.length; t++) {
    let r = e[t];
    if (_s(r)) {
      if (r.type !== B || r.children === `v-if`) {
        if (n) return;
        n = r;
      }
    } else return;
  }
  return n;
}
var fo = e => {
    let t;
    for (let n in e) (n === `class` || n === `style` || a(n)) && ((t ||= {})[n] = e[n]);
    return t;
  },
  po = (e, t) => {
    let n = {};
    for (let r in e) (!o(r) || !(r.slice(9) in t)) && (n[r] = e[r]);
    return n;
  };
function mo(e, t, n) {
  let {
      props: r,
      children: i,
      component: a
    } = e,
    {
      props: o,
      children: s,
      patchFlag: c
    } = t,
    l = a.emitsOptions;
  if (t.dirs || t.transition) return true;
  if (n && c >= 0) {
    if (c & 1024) return true;
    if (c & 16) return r ? ho(r, o, l) : !!o;
    if (c & 8) {
      let e = t.dynamicProps;
      for (let t = 0; t < e.length; t++) {
        let n = e[t];
        if (go(o, r, n) && !co(l, n)) return true;
      }
    }
  } else return (i || s) && (!s || !s.$stable) ? true : r === o ? false : r ? !o || ho(r, o, l) : !!o;
  return false;
}
function ho(e, t, n) {
  let r = Object.keys(t);
  if (r.length !== Object.keys(e).length) return true;
  for (let i = 0; i < r.length; i++) {
    let a = r[i];
    if (go(t, e, a) && !co(n, a)) return true;
  }
  return false;
}
function go(e, t, n) {
  let r = e[n],
    i = t[n];
  return n === `style` && y(r) && y(i) ? !we(r, i) : r !== i;
}
function _o({
  vnode: e,
  parent: t,
  suspense: n
}, r) {
  for (; t;) {
    let n = t.subTree;
    if (n.suspense && n.suspense.activeBranch === e && (n.suspense.vnode.el = n.el = r, e = n), n === e) (e = t.vnode).el = r, t = t.parent;else break;
  }
  n && n.activeBranch === e && (n.vnode.el = r);
}
var vo = {},
  yo = () => Object.create(vo),
  bo = e => Object.getPrototypeOf(e) === vo;
function xo(e, t, n, r = false) {
  let i = {},
    a = yo();
  e.propsDefaults = Object.create(null), Co(e, t, i, a);
  for (let t in e.propsOptions[0]) t in i || (i[t] = undefined);
  e.props = n ? r ? i : Jt(i) : e.type.props ? i : a, e.attrs = a;
}
function So(e, t, n, r) {
  let {
      props: i,
      attrs: a,
      vnode: {
        patchFlag: o
      }
    } = e,
    s = F(i),
    [c] = e.propsOptions,
    l = false;
  if ((r || o > 0) && !(o & 16)) {
    if (o & 8) {
      let n = e.vnode.dynamicProps;
      for (let r = 0; r < n.length; r++) {
        let o = n[r];
        if (co(e.emitsOptions, o)) continue;
        let d = t[o];
        if (c) {
          if (u(a, o)) d !== a[o] && (a[o] = d, l = true);else {
            let t = k(o);
            i[t] = wo(c, s, t, d, e, false);
          }
        } else d !== a[o] && (a[o] = d, l = true);
      }
    }
  } else {
    Co(e, t, i, a) && (l = true);
    let r;
    for (let a in s) (!t || !u(t, a) && ((r = te(a)) === a || !u(t, r))) && (c ? n && (n[a] !== undefined || n[r] !== undefined) && (i[a] = wo(c, s, a, undefined, e, true)) : delete i[a]);
    if (a !== s) for (let e in a) (!t || !u(t, e)) && (delete a[e], l = true);
  }
  l && ut(e.attrs, `set`, ``);
}
function Co(e, n, r, i) {
  let [a, o] = e.propsOptions,
    s = false,
    c;
  if (n) for (let t in n) {
    if (E(t)) continue;
    let l = n[t],
      d;
    a && u(a, d = k(t)) ? !o || !o.includes(d) ? r[d] = l : (c ||= {})[d] = l : co(e.emitsOptions, t) || (!(t in i) || l !== i[t]) && (i[t] = l, s = true);
  }
  if (o) {
    let n = F(r),
      i = c || t;
    for (let t = 0; t < o.length; t++) {
      let s = o[t];
      r[s] = wo(a, n, s, i[s], e, !u(i, s));
    }
  }
  return s;
}
function wo(e, t, n, r, i, a) {
  let o = e[n];
  if (o != null) {
    let e = u(o, `default`);
    if (e && r === undefined) {
      let e = o.default;
      if (o.type !== Function && !o.skipFactory && g(e)) {
        let {
          propsDefaults: a
        } = i;
        if (n in a) r = a[n];else {
          let o = Bs(i);
          r = a[n] = e.call(null, t), o();
        }
      } else r = e;
      i.ce && i.ce._setProp(n, r);
    }
    o[0] && (a && !e ? r = false : o[1] && (r === `` || r === te(n)) && (r = true));
  }
  return r;
}
var To = new WeakMap();
function Eo(e, r, i = false) {
  let a = i ? To : r.propsCache,
    o = a.get(e);
  if (o) return o;
  let c = e.props,
    l = {},
    f = [],
    p = false;
  if (!g(e)) {
    let t = e => {
      p = true;
      let [t, n] = Eo(e, r, true);
      s(l, t), n && f.push(...n);
    };
    !i && r.mixins.length && r.mixins.forEach(t), e.extends && t(e.extends), e.mixins && e.mixins.forEach(t);
  }
  if (!c && !p) return y(e) && a.set(e, n), n;
  if (d(c)) for (let e = 0; e < c.length; e++) {
    let n = k(c[e]);
    Do(n) && (l[n] = t);
  } else if (c) for (let e in c) {
    let t = k(e);
    if (Do(t)) {
      let n = c[e],
        r = l[t] = d(n) || g(n) ? {
          type: n
        } : s({}, n),
        i = r.type,
        a = false,
        o = true;
      if (d(i)) for (let e = 0; e < i.length; ++e) {
        let t = i[e],
          n = g(t) && t.name;
        if (n === `Boolean`) {
          a = true;
          break;
        }
        n === `String` && (o = false);
      } else a = g(i) && i.name === `Boolean`;
      r[0] = a, r[1] = o, (a || u(r, `default`)) && f.push(t);
    }
  }
  let m = [l, f];
  return y(e) && a.set(e, m), m;
}
function Do(e) {
  return e[0] !== `$` && !E(e);
}
var Oo = e => e === `_` || e === `_ctx` || e === `$stable`,
  ko = e => d(e) ? e.map(ks) : [ks(e)],
  Ao = (e, t, n) => {
    if (t._n) return t;
    let r = pr((...e) => ko(t(...e)), n);
    return r._c = false, r;
  },
  jo = (e, t, n) => {
    let r = e._ctx;
    for (let n in e) {
      if (Oo(n)) continue;
      let i = e[n];
      if (g(i)) t[n] = Ao(n, i, r);else if (i != null) {
        let e = ko(i);
        t[n] = () => e;
      }
    }
  },
  Mo = (e, t) => {
    let n = ko(t);
    e.slots.default = () => n;
  },
  No = (e, t, n) => {
    for (let r in t) (n || !Oo(r)) && (e[r] = t[r]);
  },
  Po = (e, t, n) => {
    let r = e.slots = yo();
    if (e.vnode.shapeFlag & 32) {
      let e = t._;
      e ? (No(r, t, n), n && ie(r, `_`, e, true)) : jo(t, r);
    } else t && Mo(e, t);
  },
  Fo = (e, n, r) => {
    let {
        vnode: i,
        slots: a
      } = e,
      o = true,
      s = t;
    if (i.shapeFlag & 32) {
      let e = n._;
      e ? r && e === 1 ? o = false : No(a, n, r) : (o = !n.$stable, jo(n, a)), s = n;
    } else n && (Mo(e, n), s = {
      default: 1
    });
    if (o) for (let e in a) !Oo(e) && s[e] == null && delete a[e];
  },
  R = rs;
function Io(e) {
  return Ro(e);
}
function Lo(e) {
  return Ro(e, _i);
}
function Ro(e, i) {
  let a = ce();
  a.__VUE__ = true;
  let {
      insert: o,
      remove: s,
      patchProp: c,
      createElement: l,
      createText: u,
      createComment: d,
      setText: f,
      setElementText: p,
      parentNode: m,
      nextSibling: h,
      setScopeId: g = r,
      insertStaticContent: _
    } = e,
    v = (e, t, r, i = null, a = null, o = null, s = undefined, c = null, l = !!t.dynamicChildren) => {
      if (e === t) return;
      e && !vs(e, t) && (i = _e(e), fe(e, a, o, true), e = null), t.patchFlag === -2 && (l = false, t.dynamicChildren = null), t.dynamicChildren && e && e.dynamicChildren && e.dynamicChildren.hasOnce && (t.dynamicChildren === n && (t.dynamicChildren = []), t.dynamicChildren.hasOnce = true);
      let {
        type: u,
        ref: d,
        shapeFlag: f
      } = t;
      switch (u) {
        case os:
          y(e, t, r, i);
          break;
        case B:
          b(e, t, r, i);
          break;
        case ss:
          e ?? x(t, r, i, s);
          break;
        case z:
          ne(e, t, r, i, a, o, s, c, l);
          break;
        default:
          f & 1 ? w(e, t, r, i, a, o, s, c, l) : f & 6 ? re(e, t, r, i, a, o, s, c, l) : (f & 64 || f & 128) && u.process(e, t, r, i, a, o, s, c, l, be);
      }
      d != null && a ? li(d, e && e.ref, o, t || e, !t) : d == null && e && e.ref != null && li(e.ref, null, o, e, true);
    },
    y = (e, t, n, r) => {
      if (e == null) o(t.el = u(t.children), n, r);else {
        let n = t.el = e.el;
        t.children !== e.children && f(n, t.children);
      }
    },
    b = (e, t, n, r) => {
      e == null ? o(t.el = d(t.children || ``), n, r) : t.el = e.el;
    },
    x = (e, t, n, r) => {
      [e.el, e.anchor] = _(e.children, t, n, r, e.el, e.anchor);
    },
    S = ({
      el: e,
      anchor: t
    }, n, r) => {
      let i;
      for (; e && e !== t;) i = h(e), o(e, n, r), e = i;
      o(t, n, r);
    },
    C = ({
      el: e,
      anchor: t
    }) => {
      let n;
      for (; e && e !== t;) n = h(e), s(e), e = n;
      s(t);
    },
    w = (e, t, n, r, i, a, o, s, c) => {
      if (t.type === `svg` ? o = `svg` : t.type === `math` && (o = `mathml`), e == null) T(t, n, r, i, a, o, s, c);else {
        let n = e.el && e.el._isVueCE ? e.el : null;
        try {
          n && n._beginPatch(), k(e, t, i, a, o, s, c);
        } finally {
          n && n._endPatch();
        }
      }
    },
    T = (e, t, n, r, i, a, s, u) => {
      let d,
        f,
        {
          props: m,
          shapeFlag: h,
          transition: g,
          dirs: _
        } = e;
      if (d = e.el = l(e.type, a, m && m.is, m), h & 8 ? p(d, e.children) : h & 16 && O(e.children, d, null, r, i, zo(e, a), s, u), _ && hr(e, null, r, `created`), D(d, e, e.scopeId, s, r), m) {
        for (let e in m) e !== `value` && !E(e) && c(d, e, null, m[e], a, r);
        `value` in m && c(d, `value`, null, m.value, a), (f = m.onVnodeBeforeMount) && Ns(f, r, e);
      }
      _ && hr(e, null, r, `beforeMount`);
      let v = Vo(i, g);
      v && g.beforeEnter(d), o(d, t, n), ((f = m && m.onVnodeMounted) || v || _) && R(() => {
        try {
          f && Ns(f, r, e), v && g.enter(d), _ && hr(e, null, r, `mounted`);
        } finally {}
      }, i);
    },
    D = (e, t, n, r, i) => {
      if (n && g(e, n), r) for (let t = 0; t < r.length; t++) g(e, r[t]);
      if (i) {
        let n = i.subTree;
        if (t === n || qo(n.type) && (n.ssContent === t || n.ssFallback === t)) {
          let t = i.vnode;
          D(e, t, t.scopeId, t.slotScopeIds, i.parent);
        }
      }
    },
    O = (e, t, n, r, i, a, o, s, c = 0) => {
      for (let l = c; l < e.length; l++) {
        let c = e[l] = s ? As(e[l]) : ks(e[l]);
        v(null, c, t, n, r, i, a, o, s);
      }
    },
    k = (e, n, r, i, a, o, s) => {
      let l = n.el = e.el,
        {
          patchFlag: u,
          dynamicChildren: d,
          dirs: f
        } = n;
      u |= e.patchFlag & 16;
      let m = e.props || t,
        h = n.props || t,
        g;
      if (r && Bo(r, false), (g = h.onVnodeBeforeUpdate) && Ns(g, r, n, e), f && hr(n, e, r, `beforeUpdate`), r && Bo(r, true), d && (!e.dynamicChildren || e.dynamicChildren.length !== d.length) && (u = 0, s = false, d = null), (m.innerHTML && h.innerHTML == null || m.textContent && h.textContent == null) && p(l, ``), d ? ee(e.dynamicChildren, d, l, r, i, zo(n, a), o) : s || se(e, n, l, null, r, i, zo(n, a), o, false), u > 0) {
        if (u & 16) te(l, m, h, r, a);else if (u & 2 && m.class !== h.class && c(l, `class`, null, h.class, a), u & 4 && c(l, `style`, m.style, h.style, a), u & 8) {
          let e = n.dynamicProps;
          for (let t = 0; t < e.length; t++) {
            let n = e[t],
              i = m[n],
              o = h[n];
            (o !== i || n === `value`) && c(l, n, i, o, a, r);
          }
        }
        u & 1 && e.children !== n.children && p(l, n.children);
      } else !s && d == null && te(l, m, h, r, a);
      ((g = h.onVnodeUpdated) || f) && R(() => {
        g && Ns(g, r, n, e), f && hr(n, e, r, `updated`);
      }, i);
    },
    ee = (e, t, n, r, i, a, o) => {
      for (let s = 0; s < t.length; s++) {
        let c = e[s],
          l = t[s],
          u = c.el && (c.type === z || !vs(c, l) || c.shapeFlag & 198) ? m(c.el) : n;
        v(c, l, u, null, r, i, a, o, true);
      }
    },
    te = (e, n, r, i, a) => {
      if (n !== r) {
        if (n !== t) for (let t in n) !E(t) && !(t in r) && c(e, t, n[t], null, a, i);
        for (let t in r) {
          if (E(t)) continue;
          let o = r[t],
            s = n[t];
          o !== s && t !== `value` && c(e, t, s, o, a, i);
        }
        `value` in r && c(e, `value`, n.value, r.value, a);
      }
    },
    ne = (e, t, n, r, i, a, s, c, l) => {
      let d = t.el = e ? e.el : u(``),
        f = t.anchor = e ? e.anchor : u(``),
        {
          patchFlag: p,
          dynamicChildren: m,
          slotScopeIds: h
        } = t;
      h && (c = c ? c.concat(h) : h), e == null ? (o(d, n, r), o(f, n, r), O(t.children || [], n, f, i, a, s, c, l)) : p > 0 && p & 64 && m && e.dynamicChildren && e.dynamicChildren.length === m.length ? (ee(e.dynamicChildren, m, n, i, a, s, c), (t.key != null || i && t === i.subTree) && Ho(e, t, true)) : se(e, t, n, f, i, a, s, c, l);
    },
    re = (e, t, n, r, i, a, o, s, c) => {
      t.slotScopeIds = s, e == null ? t.shapeFlag & 512 ? i.ctx.activate(t, n, r, o, c) : A(t, n, r, i, a, o, c) : ie(e, t, c);
    },
    A = (e, t, n, r, i, a, o) => {
      let s = e.component = Is(e, r, i);
      if (Ri(e) && (s.ctx.renderer = be), Ws(s, false, o), s.asyncDep) {
        if (i && i.registerDep(s, ae, o), !e.el) {
          let r = s.subTree = V(B);
          b(null, r, t, n), e.placeholder = r.el;
        }
      } else ae(s, e, t, n, i, a, o);
    },
    ie = (e, t, n) => {
      let r = t.component = e.component;
      if (mo(e, t, n)) {
        if (r.asyncDep && !r.asyncResolved) {
          t.el = e.el, oe(r, t, n);
          return;
        }
        r.next = t, r.update();
      } else t.el = e.el, r.vnode = t;
    },
    ae = (e, t, n, r, i, a, o) => {
      let s = () => {
        if (e.isMounted) {
          let {
            next: t,
            bu: n,
            u: r,
            parent: s,
            vnode: c
          } = e;
          {
            let n = Wo(e);
            if (n) {
              t && (t.el = c.el, oe(e, t, o)), n.asyncDep.then(() => {
                R(() => {
                  e.isUnmounted || l();
                }, i);
              });
              return;
            }
          }
          let u = t,
            d;
          Bo(e, false), t ? (t.el = c.el, oe(e, t, o)) : t = c, n && j(n), (d = t.props && t.props.onVnodeBeforeUpdate) && Ns(d, s, t, c), Bo(e, true);
          let f = lo(e),
            p = e.subTree;
          e.subTree = f, v(p, f, m(p.el), _e(p), e, i, a), t.el = f.el, u === null && _o(e, f.el), r && R(r, i), (d = t.props && t.props.onVnodeUpdated) && R(() => Ns(d, s, t, c), i);
        } else {
          let o,
            {
              el: s,
              props: c
            } = t,
            {
              bm: l,
              m: u,
              parent: d,
              root: f,
              type: p
            } = e,
            m = Fi(t);
          if (Bo(e, false), l && j(l), !m && (o = c && c.onVnodeBeforeMount) && Ns(o, d, t), Bo(e, true), s && Se) {
            let t = () => {
              e.subTree = lo(e), Se(s, e.subTree, e, i, null);
            };
            m && p.__asyncHydrate ? p.__asyncHydrate(s, e, t) : t();
          } else {
            f.ce && f.ce._hasShadowRoot() && f.ce._injectChildStyle(p, e.parent ? e.parent.type : undefined);
            let o = e.subTree = lo(e);
            v(null, o, n, r, e, i, a), t.el = o.el;
          }
          if (u && R(u, i), !m && (o = c && c.onVnodeMounted)) {
            let e = t;
            R(() => Ns(o, d, e), i);
          }
          (t.shapeFlag & 256 || d && Fi(d.vnode) && d.vnode.shapeFlag & 256) && e.a && R(e.a, i), e.isMounted = true, t = n = r = null;
        }
      };
      e.scope.on();
      let c = e.effect = new Fe(s);
      e.scope.off();
      let l = e.update = c.run.bind(c),
        u = e.job = c.runIfDirty.bind(c);
      u.i = e, u.id = e.uid, c.scheduler = () => Qn(u), Bo(e, true), l();
    },
    oe = (e, t, n) => {
      t.component = e;
      let r = e.vnode.props;
      e.vnode = t, e.next = null, So(e, t.props, r, n), Fo(e, t.children, n), Qe(), tr(e), $e();
    },
    se = (e, t, n, r, i, a, o, s, c = false) => {
      let l = e && e.children,
        u = e ? e.shapeFlag : 0,
        d = t.children,
        {
          patchFlag: f,
          shapeFlag: m
        } = t;
      if (f > 0) {
        if (f & 128) {
          ue(l, d, n, r, i, a, o, s, c);
          return;
        }
        if (f & 256) {
          le(l, d, n, r, i, a, o, s, c);
          return;
        }
      }
      m & 8 ? (u & 16 && ge(l, i, a), d !== l && p(n, d)) : u & 16 ? m & 16 ? ue(l, d, n, r, i, a, o, s, c) : ge(l, i, a, true) : (u & 8 && p(n, ``), m & 16 && O(d, n, r, i, a, o, s, c));
    },
    le = (e, t, r, i, a, o, s, c, l) => {
      e ||= n, t ||= n;
      let u = e.length,
        d = t.length,
        f = Math.min(u, d),
        p = 0;
      for (; p < f; p++) {
        let n = t[p] = l ? As(t[p]) : ks(t[p]);
        v(e[p], n, r, null, a, o, s, c, l);
      }
      u > d ? ge(e, a, o, true, false, f) : O(t, r, i, a, o, s, c, l, f);
    },
    ue = (e, t, r, i, a, o, s, c, l) => {
      let u = 0,
        d = t.length,
        f = e.length - 1,
        p = d - 1;
      for (; u <= f && u <= p;) {
        let n = e[u],
          i = t[u] = l ? As(t[u]) : ks(t[u]);
        if (vs(n, i)) v(n, i, r, null, a, o, s, c, l);else break;
        u++;
      }
      for (; u <= f && u <= p;) {
        let n = e[f],
          i = t[p] = l ? As(t[p]) : ks(t[p]);
        if (vs(n, i)) v(n, i, r, null, a, o, s, c, l);else break;
        f--, p--;
      }
      if (u > f) {
        if (u <= p) {
          let e = p + 1,
            n = e < d ? t[e].el : i;
          for (; u <= p;) v(null, t[u] = l ? As(t[u]) : ks(t[u]), r, n, a, o, s, c, l), u++;
        }
      } else if (u > p) for (; u <= f;) fe(e[u], a, o, true), u++;else {
        let m = u,
          h = u,
          g = new Map();
        for (u = h; u <= p; u++) {
          let e = t[u] = l ? As(t[u]) : ks(t[u]);
          e.key != null && g.set(e.key, u);
        }
        let _,
          y = 0,
          b = p - h + 1,
          x = false,
          S = 0,
          C = Array(b);
        for (u = 0; u < b; u++) C[u] = 0;
        for (u = m; u <= f; u++) {
          let n = e[u];
          if (y >= b) {
            fe(n, a, o, true);
            continue;
          }
          let i;
          if (n.key != null) i = g.get(n.key);else for (_ = h; _ <= p; _++) if (C[_ - h] === 0 && vs(n, t[_])) {
            i = _;
            break;
          }
          i === undefined ? fe(n, a, o, true) : (C[i - h] = u + 1, i >= S ? S = i : x = true, v(n, t[i], r, null, a, o, s, c, l), y++);
        }
        let w = x ? Uo(C) : n;
        for (_ = w.length - 1, u = b - 1; u >= 0; u--) {
          let e = h + u,
            n = t[e],
            f = t[e + 1],
            p = e + 1 < d ? f.el || Ko(f) : i;
          C[u] === 0 ? v(null, n, r, p, a, o, s, c, l) : x && (_ < 0 || u !== w[_] ? de(n, r, p, 2) : _--);
        }
      }
    },
    de = (e, t, n, r, i = null) => {
      let {
        el: a,
        type: c,
        transition: l,
        children: u,
        shapeFlag: d
      } = e;
      if (d & 6) {
        de(e.component.subTree, t, n, r);
        return;
      }
      if (d & 128) {
        e.suspense.move(t, n, r);
        return;
      }
      if (d & 64) {
        c.move(e, t, n, be);
        return;
      }
      if (c === z) {
        o(a, t, n);
        for (let e = 0; e < u.length; e++) de(u[e], t, n, r);
        o(e.anchor, t, n);
        return;
      }
      if (c === ss) {
        S(e, t, n);
        return;
      }
      if (r !== 2 && d & 1 && l) {
        if (r === 0) l.persisted && !a[Hr] ? o(a, t, n) : (l.beforeEnter(a), o(a, t, n), R(() => l.enter(a), i));else {
          let {
              leave: r,
              delayLeave: i,
              afterLeave: c
            } = l,
            u = () => {
              e.ctx.isUnmounted ? s(a) : o(a, t, n);
            },
            d = () => {
              let e = a._isLeaving || !!a[Hr];
              a._isLeaving && a[Hr](true), l.persisted && !e ? u() : r(a, () => {
                u(), c && c();
              });
            };
          i ? i(a, u, d) : d();
        }
      } else o(a, t, n);
    },
    fe = (e, t, n, r = false, i = false) => {
      let {
        type: a,
        props: o,
        ref: s,
        children: c,
        dynamicChildren: l,
        shapeFlag: u,
        patchFlag: d,
        dirs: f,
        cacheIndex: p,
        memo: m
      } = e;
      if ((d === -2 || l && l.hasOnce) && (i = false), s != null && (Qe(), li(s, null, n, e, true), $e()), p != null && (!e.ctx || e.ctx === t) && (t.renderCache[p] = undefined), u & 256) {
        t.ctx.deactivate(e);
        return;
      }
      let h = u & 1 && f,
        g = !Fi(e),
        _;
      if (g && (_ = o && o.onVnodeBeforeUnmount) && Ns(_, t, e), u & 6) he(e.component, n, r);else {
        if (u & 128) {
          e.suspense.unmount(n, r);
          return;
        }
        h && hr(e, null, t, `beforeUnmount`), u & 64 ? e.type.remove(e, t, n, be, r) : l && !l.hasOnce && (a !== z || d > 0 && d & 64) ? ge(l, t, n, false, true) : (a === z && d & 384 || !i && u & 16) && ge(c, t, n), r && pe(e);
      }
      let v = m != null && p == null;
      (g && (_ = o && o.onVnodeUnmounted) || h || v) && R(() => {
        _ && Ns(_, t, e), h && hr(e, null, t, `unmounted`), v && (e.el = null);
      }, n);
    },
    pe = e => {
      let {
        type: t,
        el: n,
        anchor: r,
        transition: i
      } = e;
      if (t === z) {
        me(n, r);
        return;
      }
      if (t === ss) {
        C(e), i && !i.persisted && i.afterLeave && i.afterLeave();
        return;
      }
      let a = () => {
        s(n), i && !i.persisted && i.afterLeave && i.afterLeave();
      };
      if (e.shapeFlag & 1 && i && !i.persisted) {
        let {
            leave: t,
            delayLeave: r
          } = i,
          o = () => t(n, a);
        r ? r(e.el, a, o) : o();
      } else a();
    },
    me = (e, t) => {
      let n;
      for (; e !== t;) n = h(e), s(e), e = n;
      s(t);
    },
    he = (e, t, n) => {
      let {
        bum: r,
        scope: i,
        job: a,
        subTree: o,
        um: s,
        m: c,
        a: l
      } = e;
      Go(c), Go(l), r && j(r), i.stop(), a ? (a.flags |= 8, fe(o, e, t, n)) : e.vnode.el && o && (o.transition = e.vnode.transition, fe(o, e, t, n)), s && R(s, t), R(() => {
        e.isUnmounted = true;
      }, t);
    },
    ge = (e, t, n, r = false, i = false, a = 0) => {
      for (let o = a; o < e.length; o++) fe(e[o], t, n, r, i);
    },
    _e = e => {
      if (e.shapeFlag & 6) return _e(e.component.subTree);
      if (e.shapeFlag & 128) return e.suspense.next();
      let t = h(e.anchor || e.el),
        n = t && t[kr];
      return n ? h(n) : t;
    },
    ve = false,
    ye = (e, t, n) => {
      let r;
      e == null ? t._vnode && (fe(t._vnode, null, null, true), r = t._vnode.component) : v(t._vnode || null, e, t, null, null, null, n), t._vnode = e, ve ||= (ve = true, tr(r), nr(), false);
    },
    be = {
      p: v,
      um: fe,
      m: de,
      r: pe,
      mt: A,
      mc: O,
      pc: se,
      pbc: ee,
      n: _e,
      o: e
    },
    xe,
    Se;
  return i && ([xe, Se] = i(be)), {
    render: ye,
    hydrate: xe,
    createApp: to(ye, xe)
  };
}
function zo({
  type: e,
  props: t
}, n) {
  return n === `svg` && e === `foreignObject` || n === `mathml` && e === `annotation-xml` && t && t.encoding && t.encoding.includes(`html`) ? undefined : n;
}
function Bo({
  effect: e,
  job: t
}, n) {
  n ? (e.flags |= 32, t.flags |= 4) : (e.flags &= -33, t.flags &= -5);
}
function Vo(e, t) {
  return (!e || e && !e.pendingBranch) && t && !t.persisted;
}
function Ho(e, t, n = false) {
  let r = e.children,
    i = t.children;
  if (d(r) && d(i)) for (let e = 0; e < r.length; e++) {
    let t = r[e],
      a = i[e];
    a.shapeFlag & 1 && !a.dynamicChildren && ((a.patchFlag <= 0 || a.patchFlag === 32) && (a = i[e] = As(i[e]), a.el = t.el), !n && a.patchFlag !== -2 && Ho(t, a)), a.type === os && (a.patchFlag === -1 && (a = i[e] = As(a)), a.el = t.el), a.type === B && !a.el && (a.el = t.el);
  }
}
function Uo(e) {
  let t = e.slice(),
    n = [0],
    r,
    i,
    a,
    o,
    s,
    c = e.length;
  for (r = 0; r < c; r++) {
    let c = e[r];
    if (c !== 0) {
      if (i = n[n.length - 1], e[i] < c) {
        t[r] = i, n.push(r);
        continue;
      }
      for (a = 0, o = n.length - 1; a < o;) s = a + o >> 1, e[n[s]] < c ? a = s + 1 : o = s;
      c < e[n[a]] && (a > 0 && (t[r] = n[a - 1]), n[a] = r);
    }
  }
  for (a = n.length, o = n[a - 1]; a-- > 0;) n[a] = o, o = t[o];
  return n;
}
function Wo(e) {
  let t = e.subTree.component;
  if (t) return t.asyncDep && !t.asyncResolved ? t : Wo(t);
}
function Go(e) {
  if (e) for (let t = 0; t < e.length; t++) e[t].flags |= 8;
}
function Ko(e) {
  if (e.placeholder) return e.placeholder;
  let t = e.component;
  return t ? Ko(t.subTree) : null;
}
var qo = e => e.__isSuspense,
  Jo = 0,
  Yo = {
    name: `Suspense`,
    __isSuspense: true,
    process(e, t, n, r, i, a, o, s, c, l) {
      if (e == null) Zo(t, n, r, i, a, o, s, c, l);else {
        if (a && a.deps > 0 && !e.suspense.isInFallback && !a.isHydrating) {
          t.suspense = e.suspense, t.suspense.vnode = t, t.el = e.el;
          return;
        }
        Qo(e, t, n, r, i, o, s, c, l);
      }
    },
    hydrate: es,
    normalize: ts
  };
function Xo(e, t) {
  let n = e.props && e.props[t];
  g(n) && n();
}
function Zo(e, t, n, r, i, a, o, s, c) {
  let {
      p: l,
      o: {
        createElement: u
      }
    } = c,
    d = u(`div`),
    f = e.suspense = $o(e, i, r, t, d, n, a, o, s, c);
  l(null, f.pendingBranch = e.ssContent, d, null, r, f, a, o), f.deps > 0 ? (Xo(e, `onPending`), Xo(e, `onFallback`), l(null, e.ssFallback, t, n, r, null, a, o), is(f, e.ssFallback)) : f.resolve(false, true);
}
function Qo(e, t, n, r, i, a, o, s, {
  p: c,
  um: l,
  o: {
    createElement: u
  }
}) {
  let d = t.suspense = e.suspense;
  d.vnode = t, t.el = e.el;
  let f = t.ssContent,
    p = t.ssFallback,
    {
      activeBranch: m,
      pendingBranch: h,
      isInFallback: g,
      isHydrating: _
    } = d;
  if (h) d.pendingBranch = f, vs(h, f) ? (d.deps++, c(h, f, _ ? n : d.hiddenContainer, null, i, d, a, o, s), d.deps--, d.deps <= 0 ? d.resolve() : g && !_ && !d.isFallbackMountPending && (c(m, p, n, r, i, null, a, o, s), is(d, p))) : (d.pendingId = Jo++, _ ? (d.isHydrating = false, d.activeBranch = h) : l(h, i, d), d.deps = 0, d.effects.length = 0, d.hiddenContainer = u(`div`), g ? (c(null, f, d.hiddenContainer, null, i, d, a, o, s), d.deps <= 0 ? d.resolve() : d.isFallbackMountPending || (c(m, p, n, r, i, null, a, o, s), is(d, p))) : m && vs(m, f) ? (c(m, f, n, r, i, d, a, o, s), d.resolve(true)) : (c(null, f, d.hiddenContainer, null, i, d, a, o, s), d.deps <= 0 && d.resolve()));else if (m && vs(m, f)) c(m, f, n, r, i, d, a, o, s), is(d, f);else if (Xo(t, `onPending`), d.pendingBranch = f, d.pendingId = f.shapeFlag & 512 ? f.component.suspenseId : Jo++, c(null, f, d.hiddenContainer, null, i, d, a, o, s), d.deps <= 0) d.resolve();else {
    let {
      timeout: e,
      pendingId: t
    } = d;
    e > 0 ? setTimeout(() => {
      d.pendingId === t && d.fallback(p);
    }, e) : e === 0 && d.fallback(p);
  }
}
function $o(e, t, n, r, i, a, o, s, c, l, u = false) {
  let {
      p: d,
      m: f,
      um: p,
      n: m,
      o: {
        parentNode: h,
        remove: g
      }
    } = l,
    _,
    v = as(e);
  v && t && t.pendingBranch && (_ = t.pendingId, t.deps++);
  let y = e.props ? oe(e.props.timeout) : undefined,
    b = a,
    x = {
      vnode: e,
      parent: t,
      parentComponent: n,
      namespace: o,
      container: r,
      hiddenContainer: i,
      deps: 0,
      pendingId: Jo++,
      timeout: typeof y == `number` ? y : -1,
      activeBranch: null,
      isFallbackMountPending: false,
      pendingBranch: null,
      isInFallback: !u,
      isHydrating: u,
      isUnmounted: false,
      effects: [],
      resolve(e = false, n = false) {
        let {
            vnode: r,
            activeBranch: i,
            pendingBranch: o,
            pendingId: s,
            effects: c,
            parentComponent: l,
            container: u,
            isInFallback: d
          } = x,
          g = false;
        if (x.isHydrating) x.isHydrating = false;else if (!e) {
          g = i && o.transition && o.transition.mode === `out-in`;
          let e = false;
          g && (i.transition.afterLeave = () => {
            s === x.pendingId && (f(o, u, a === b && !e ? m(i) : a, 0), er(c), d && r.ssFallback && (r.ssFallback.el = null));
          }), i && !x.isFallbackMountPending && (h(i.el) === u && (a = m(i), e = true), p(i, l, x, true), !g && d && r.ssFallback && R(() => r.ssFallback.el = null, x)), g || f(o, u, a, 0);
        }
        x.isFallbackMountPending = false, is(x, o), x.pendingBranch = null, x.isInFallback = false;
        let y = x.parent,
          S = false;
        for (; y;) {
          if (y.pendingBranch) {
            for (let e = 0; e < c.length; e++) y.effects.push(c[e]);
            S = true;
            break;
          }
          y = y.parent;
        }
        !S && !g && er(c), x.effects = [], v && t && t.pendingBranch && _ === t.pendingId && (_ = undefined, t.deps--, t.deps === 0 && !n && t.resolve()), Xo(r, `onResolve`);
      },
      fallback(e) {
        if (!x.pendingBranch) return;
        let {
          vnode: t,
          activeBranch: n,
          parentComponent: r,
          container: i,
          namespace: a
        } = x;
        Xo(t, `onFallback`);
        let o = m(n),
          l = () => {
            if (x.isFallbackMountPending = false, !x.isInFallback) return;
            let e = x.vnode.ssFallback;
            d(null, e, i, o, r, null, a, s, c), is(x, e);
          },
          u = e.transition && e.transition.mode === `out-in`;
        u && (x.isFallbackMountPending = true, n.transition.afterLeave = l), x.isInFallback = true, p(n, r, null, true), u || l();
      },
      move(e, t, n) {
        x.activeBranch && f(x.activeBranch, e, t, n), x.container = e;
      },
      next() {
        return x.activeBranch && m(x.activeBranch);
      },
      registerDep(e, t, n) {
        let r = !!x.pendingBranch;
        r && x.deps++;
        let i = e.vnode.el;
        e.asyncDep.catch(t => {
          Vn(t, e, 0);
        }).then(a => {
          if (e.isUnmounted || x.isUnmounted || x.pendingId !== e.suspenseId) return;
          if (Vs(), i && !e.scope.active) {
            r && --x.deps === 0 && x.resolve();
            return;
          }
          e.asyncResolved = true;
          let {
            vnode: s
          } = e;
          Ks(e, a, false), i && (s.el = i);
          let c = !i && e.subTree.el;
          t(e, s, h(i || e.subTree.el), i ? null : m(e.subTree), x, o, n), c && (s.placeholder = null, g(c)), _o(e, s.el), r && --x.deps === 0 && x.resolve();
        });
      },
      unmount(e, t) {
        x.isUnmounted = true, x.activeBranch && p(x.activeBranch, n, e, t), x.pendingBranch && p(x.pendingBranch, n, e, t);
      }
    };
  return x;
}
function es(e, t, n, r, i, a, o, s, c) {
  let l = t.suspense = $o(t, r, n, e.parentNode, document.createElement(`div`), null, i, a, o, s, true),
    u = c(e, l.pendingBranch = t.ssContent, n, l, a, o);
  return l.deps === 0 && l.resolve(false, true), u;
}
function ts(e) {
  let {
      shapeFlag: t,
      children: n
    } = e,
    r = t & 32;
  e.ssContent = ns(r ? n.default : n), e.ssFallback = r ? ns(n.fallback) : V(B);
}
function ns(e) {
  let t;
  if (g(e)) {
    let n = fs && e._c;
    n && (e._d = false, us()), e = e(), n && (e._d = true, t = ls, ds());
  }
  return d(e) && (e = uo(e)), e = ks(e), t && !e.dynamicChildren && (e.dynamicChildren = t.filter(t => t !== e)), e;
}
function rs(e, t) {
  t && t.pendingBranch ? d(e) ? t.effects.push(...e) : t.effects.push(e) : er(e);
}
function is(e, t) {
  e.activeBranch = t;
  let {
      vnode: n,
      parentComponent: r
    } = e,
    i = t.el;
  for (; !i && t.component;) t = t.component.subTree, i = t.el;
  n.el = i, r && r.subTree === n && (r.vnode.el = i, _o(r, i));
}
function as(e) {
  let t = e.props && e.props.suspensible;
  return t != null && t !== false;
}
var z = Symbol.for(`v-fgt`),
  os = Symbol.for(`v-txt`),
  B = Symbol.for(`v-cmt`),
  ss = Symbol.for(`v-stc`),
  cs = [],
  ls = null;
function us(e = false) {
  cs.push(ls = e ? null : []);
}
function ds() {
  cs.pop(), ls = cs[cs.length - 1] || null;
}
var fs = 1;
function ps(e, t = false) {
  fs += e, e < 0 && ls && t && (ls.hasOnce = true);
}
function ms(e) {
  return e.dynamicChildren = fs > 0 ? ls || n : null, ds(), fs > 0 && ls && ls.push(e), e;
}
function hs(e, t, n, r, i, a) {
  return ms(Ss(e, t, n, r, i, a, true));
}
function gs(e, t, n, r, i) {
  return ms(V(e, t, n, r, i, true));
}
function _s(e) {
  return e ? e.__v_isVNode === true : false;
}
function vs(e, t) {
  return e.type === t.type && e.key === t.key;
}
function ys(e) {}
var bs = ({
    key: e
  }) => e ?? null,
  xs = ({
    ref: e,
    ref_key: t,
    ref_for: n
  }) => (typeof e == `number` && (e = `` + e), e == null ? null : _(e) || I(e) || g(e) ? {
    i: L,
    r: e,
    k: t,
    f: !!n
  } : e);
function Ss(e, t = null, n = null, r = 0, i = null, a = e === z ? 0 : 1, o = false, s = false) {
  let c = {
    __v_isVNode: true,
    __v_skip: true,
    type: e,
    props: t,
    key: t && bs(t),
    ref: t && xs(t),
    scopeId: cr,
    slotScopeIds: null,
    children: n,
    component: null,
    suspense: null,
    ssContent: null,
    ssFallback: null,
    dirs: null,
    transition: null,
    el: null,
    anchor: null,
    target: null,
    targetStart: null,
    targetAnchor: null,
    staticCount: 0,
    shapeFlag: a,
    patchFlag: r,
    dynamicProps: i,
    dynamicChildren: null,
    appContext: null,
    ctx: L
  };
  return s ? (js(c, n), a & 128 && e.normalize(c)) : n && (c.shapeFlag |= _(n) ? 8 : 16), fs > 0 && !o && ls && (c.patchFlag > 0 || a & 6) && c.patchFlag !== 32 && ls.push(c), c;
}
var V = Cs;
function Cs(e, t = null, n = null, r = 0, i = null, a = false) {
  if ((!e || e === ca) && (e = B), _s(e)) {
    let r = Ts(e, t, true);
    return n && js(r, n), fs > 0 && !a && ls && (r.shapeFlag & 6 ? ls[ls.indexOf(e)] = r : ls.push(r)), r.patchFlag = -2, r;
  }
  if (nc(e) && (e = e.__vccOpts), t) {
    t = ws(t);
    let {
      class: e,
      style: n
    } = t;
    e && !_(e) && (t.class = he(e)), y(n) && (tn(n) && !d(n) && (n = s({}, n)), t.style = ue(n));
  }
  let o = _(e) ? 1 : qo(e) ? 128 : Ar(e) ? 64 : y(e) ? 4 : g(e) ? 2 : 0;
  return Ss(e, t, n, r, i, o, a, true);
}
function ws(e) {
  return e ? tn(e) || bo(e) ? s({}, e) : e : null;
}
function Ts(e, t, n = false, r = false) {
  let {
      props: i,
      ref: a,
      patchFlag: o,
      children: s,
      transition: c
    } = e,
    l = t ? Ms(i || {}, t) : i,
    u = {
      __v_isVNode: true,
      __v_skip: true,
      type: e.type,
      props: l,
      key: l && bs(l),
      ref: t && t.ref ? n && a ? d(a) ? a.concat(xs(t)) : [a, xs(t)] : xs(t) : a,
      scopeId: e.scopeId,
      slotScopeIds: e.slotScopeIds,
      children: s,
      target: e.target,
      targetStart: e.targetStart,
      targetAnchor: e.targetAnchor,
      staticCount: e.staticCount,
      shapeFlag: e.shapeFlag,
      patchFlag: t && e.type !== z ? o === -1 ? 16 : o | 16 : o,
      dynamicProps: e.dynamicProps,
      dynamicChildren: e.dynamicChildren,
      appContext: e.appContext,
      dirs: e.dirs,
      transition: c,
      component: e.component,
      suspense: e.suspense,
      ssContent: e.ssContent && Ts(e.ssContent),
      ssFallback: e.ssFallback && Ts(e.ssFallback),
      placeholder: e.placeholder,
      el: e.el,
      anchor: e.anchor,
      ctx: e.ctx,
      ce: e.ce,
      cacheIndex: e.cacheIndex
    };
  return c && r && ti(u, c.clone(u)), u;
}
function Es(e = ` `, t = 0) {
  return V(os, null, e, t);
}
function Ds(e, t) {
  let n = V(ss, null, e);
  return n.staticCount = t, n;
}
function Os(e = ``, t = false) {
  return t ? (us(), gs(B, null, e)) : V(B, null, e);
}
function ks(e) {
  return e == null || typeof e == `boolean` ? V(B) : d(e) ? V(z, null, e.slice()) : _s(e) ? As(e) : V(os, null, String(e));
}
function As(e) {
  return e.el === null && e.patchFlag !== -1 || e.memo ? e : Ts(e);
}
function js(e, t) {
  let n = 0,
    {
      shapeFlag: r
    } = e;
  if (t == null) t = null;else if (d(t)) n = 16;else if (typeof t == `object`) {
    if (r & 65) {
      let n = t.default;
      n && (n._c && (n._d = false), js(e, n()), n._c && (n._d = true));
      return;
    }
    {
      n = 32;
      let r = t._;
      !r && !bo(t) ? t._ctx = L : r === 3 && L && (L.slots._ === 1 ? t._ = 1 : (t._ = 2, e.patchFlag |= 1024));
    }
  } else if (g(t)) {
    if (r & 65) {
      js(e, {
        default: t
      });
      return;
    }
    t = {
      default: t,
      _ctx: L
    }, n = 32;
  } else t = String(t), r & 64 ? (n = 16, t = [Es(t)]) : n = 8;
  e.children = t, e.shapeFlag |= n;
}
function Ms(...e) {
  let t = {};
  for (let n = 0; n < e.length; n++) {
    let r = e[n];
    for (let e in r) if (e === `class`) t.class !== r.class && (t.class = he([t.class, r.class]));else if (e === `style`) t.style = ue([t.style, r.style]);else if (a(e)) {
      let n = t[e],
        i = r[e];
      i && n !== i && !(d(n) && n.includes(i)) ? t[e] = n ? [].concat(n, i) : i : i == null && n == null && !o(e) && (t[e] = i);
    } else e !== `` && (t[e] = r[e]);
  }
  return t;
}
function Ns(e, t, n, r = null) {
  Bn(e, t, 7, [n, r]);
}
var Ps = $a(),
  Fs = 0;
function Is(e, n, r) {
  let i = e.type,
    a = (n ? n.appContext : e.appContext) || Ps,
    o = {
      uid: Fs++,
      vnode: e,
      type: i,
      parent: n,
      appContext: a,
      root: null,
      next: null,
      subTree: null,
      effect: null,
      update: null,
      job: null,
      scope: new Ae(true),
      render: null,
      proxy: null,
      exposed: null,
      exposeProxy: null,
      withProxy: null,
      provides: n ? n.provides : Object.create(a.provides),
      ids: n ? n.ids : [``, 0, 0],
      accessCache: null,
      renderCache: [],
      components: null,
      directives: null,
      propsOptions: Eo(i, a),
      emitsOptions: so(i, a),
      emit: null,
      emitted: null,
      propsDefaults: t,
      inheritAttrs: i.inheritAttrs,
      ctx: t,
      data: t,
      props: t,
      attrs: t,
      slots: t,
      refs: t,
      setupState: t,
      setupContext: null,
      suspense: r,
      suspenseId: r ? r.pendingId : 0,
      asyncDep: null,
      asyncResolved: false,
      isMounted: false,
      isUnmounted: false,
      isDeactivated: false,
      bc: null,
      c: null,
      bm: null,
      m: null,
      bu: null,
      u: null,
      um: null,
      bum: null,
      da: null,
      a: null,
      rtg: null,
      rtc: null,
      ec: null,
      sp: null
    };
  return o.ctx = {
    _: o
  }, o.root = n ? n.root : o, o.emit = ao.bind(null, o), e.ce && e.ce(o), o;
}
var H = null,
  Ls = () => H || L,
  Rs,
  zs;
{
  let e = ce(),
    t = (t, n) => {
      let r;
      return (r = e[t]) || (r = e[t] = []), r.push(n), e => {
        r.length > 1 ? r.forEach(t => t(e)) : r[0](e);
      };
    };
  Rs = t(`__VUE_INSTANCE_SETTERS__`, e => H = e), zs = t(`__VUE_SSR_SETTERS__`, e => Us = e);
}
var Bs = e => {
    let t = H;
    return Rs(e), e.scope.on(), () => {
      e.scope.off(), Rs(t);
    };
  },
  Vs = () => {
    H && H.scope.off(), Rs(null);
  };
function Hs(e) {
  return e.vnode.shapeFlag & 4;
}
var Us = false;
function Ws(e, t = false, n = false) {
  t && zs(t);
  let {
      props: r,
      children: i
    } = e.vnode,
    a = Hs(e);
  xo(e, r, a, t), Po(e, i, n || t);
  let o = a ? Gs(e, t) : undefined;
  return t && zs(false), o;
}
function Gs(e, t) {
  let n = e.type;
  e.accessCache = Object.create(null), e.proxy = new Proxy(e.ctx, xa);
  let {
    setup: r
  } = n;
  if (r) {
    Qe();
    let n = e.setupContext = r.length > 1 ? $s(e) : null,
      i = Bs(e),
      a = zn(r, e, 0, [e.props, n]),
      o = b(a);
    if ($e(), i(), (o || e.sp) && !Fi(e) && ai(e), o) {
      if (a.then(Vs, Vs), t) return a.then(n => {
        zs(true);
        try {
          Ks(e, n, t);
        } finally {
          zs(false);
        }
      }).catch(t => {
        Vn(t, e, 0);
      });
      e.asyncDep = a;
    } else Ks(e, a, t);
  } else Zs(e, t);
}
function Ks(e, t, n) {
  g(t) ? e.type.__ssrInlineRender ? e.ssrRender = t : e.render = t : y(t) && (e.setupState = mn(t)), Zs(e, n);
}
var qs, Js;
function Ys(e) {
  qs = e, Js = e => {
    e.render._rc && (e.withProxy = new Proxy(e.ctx, Sa));
  };
}
var Xs = () => !qs;
function Zs(e, t, n) {
  let i = e.type;
  if (!e.render) {
    if (!t && qs && !i.render) {
      let t = i.template || Ua(e).template;
      if (t) {
        let {
            isCustomElement: n,
            compilerOptions: r
          } = e.appContext.config,
          {
            delimiters: a,
            compilerOptions: o
          } = i,
          c = s(s({
            isCustomElement: n,
            delimiters: a
          }, r), o);
        i.render = qs(t, c);
      }
    }
    e.render = i.render || r, Js && Js(e);
  }
  {
    let t = Bs(e);
    Qe();
    try {
      za(e);
    } finally {
      $e(), t();
    }
  }
}
var Qs = {
  get(e, t) {
    return lt(e, `get`, ``), e[t];
  }
};
function $s(e) {
  return {
    attrs: new Proxy(e.attrs, Qs),
    slots: e.slots,
    emit: e.emit,
    expose: t => {
      e.exposed = t || {};
    }
  };
}
function ec(e) {
  return e.exposed ? e.exposeProxy ||= new Proxy(mn(nn(e.exposed)), {
    get(t, n) {
      if (n in t) return t[n];
      if (n in ya) return ya[n](e);
    },
    has(e, t) {
      return t in e || t in ya;
    }
  }) : e.proxy;
}
function tc(e, t = true) {
  return g(e) ? e.displayName || e.name : e.name || t && e.__name;
}
function nc(e) {
  return g(e) && `__vccOpts` in e;
}
var rc = (e, t) => Cn(e, t, Us);
function ic(e, t, n) {
  try {
    ps(-1);
    let r = arguments.length;
    return r === 2 ? y(t) && !d(t) ? _s(t) ? V(e, null, [t]) : V(e, t) : V(e, null, t) : (r > 3 ? n = Array.prototype.slice.call(arguments, 2) : r === 3 && _s(n) && (n = [n]), V(e, t, n));
  } finally {
    ps(1);
  }
}
function ac() {}
function oc(e, t, n, r) {
  let i = n[r];
  if (i && sc(i, e)) return i;
  let a = t();
  return a.memo = e.slice(), a.cacheIndex = r, n[r] = a;
}
function sc(e, t) {
  let n = e.memo;
  if (n.length != t.length) return false;
  for (let e = 0; e < n.length; e++) if (A(n[e], t[e])) return false;
  return fs > 0 && ls && ls.push(e), true;
}
var cc = `3.5.43`,
  lc = r,
  uc = Rn,
  dc = ar,
  fc = sr,
  pc = {
    createComponentInstance: Is,
    setupComponent: Ws,
    renderComponentRoot: lo,
    setCurrentRenderingInstance: lr,
    isVNode: _s,
    normalizeVNode: ks,
    getComponentPublicInstance: ec,
    ensureValidVNode: ga,
    pushWarningContext: Pn,
    popWarningContext: Fn
  },
  mc = typeof window < `u`,
  hc = (e, t = false) => t ? Symbol.for(e) : Symbol(e),
  gc = (e, t, n) => _c({
    l: e,
    k: t,
    s: n
  }),
  _c = e => JSON.stringify(e).replace(/\u2028/g, `null`).replace(/\u2029/g, `null`).replace(/\u0027/g, `null`),
  U = e => typeof e == `number` && isFinite(e),
  vc = e => Oc(e) === `[object Date]`,
  yc = e => Oc(e) === `[object RegExp]`,
  bc = e => Z(e) && Object.keys(e).length === 0,
  W = Object.assign,
  xc = Object.create,
  G = (e = null) => xc(e),
  Sc,
  Cc = () => Sc ||= typeof globalThis < `u` ? globalThis : typeof self < `u` ? self : typeof window < `u` ? window : typeof global < `u` ? global : G(),
  wc = Object.prototype.hasOwnProperty;
function Tc(e, t) {
  return wc.call(e, t);
}
var K = Array.isArray,
  q = e => typeof e == `function`,
  J = e => typeof e == `string`,
  Y = e => typeof e == `boolean`,
  X = e => typeof e == `object` && !!e,
  Ec = e => X(e) && q(e.then) && q(e.catch),
  Dc = Object.prototype.toString,
  Oc = e => Dc.call(e),
  Z = e => Oc(e) === `[object Object]`,
  kc = e => e == null ? `` : K(e) || Z(e) && e.toString === Dc ? JSON.stringify(e, null, 2) : String(e);
function Ac(e, t = ``) {
  return e.reduce((e, n, r) => r === 0 ? e + n : e + t + n, ``);
}
function jc(e, t) {
  typeof console < `u` && (console.warn(`[intlify] ` + e), t && console.warn(t.stack));
}
function Mc(e) {
  return e.replace(/&/g, `&amp;`).replace(/</g, `&lt;`).replace(/>/g, `&gt;`).replace(/"/g, `&quot;`).replace(/'/g, `&apos;`).replace(/\//g, `&#x2F;`).replace(/=/g, `&#x3D;`);
}
function Nc(e) {
  return e.replace(/&(?![a-z0-9#]{2,6};)/gi, `&amp;`).replace(/"/g, `&quot;`).replace(/'/g, `&apos;`).replace(/</g, `&lt;`).replace(/>/g, `&gt;`);
}
var Pc = /^javascript:/i,
  Fc = /^(?:href|src|action|formaction)$/i,
  Ic = /&#(?:x([0-9a-f]+)|(\d+));?/gi,
  Lc = /&(?:Tab|NewLine);/g,
  Rc = /&colon;?/gi,
  zc = /[\u0000-\u0020\u007f-\u009f]/g,
  Bc = /(?:^|[\s"'<>/])on\w+\s*=\s*["']?[^"'>]+["']?/i,
  Vc = /(^|[\s"'<>/])on(\w+\s*=)/gi,
  Hc = /(^|[\s"'<>/])((?:href|src|action|formaction)\s*=\s*)([^\s"'=<>`]+)/gi;
function Uc(e, t, n) {
  let r = t || n;
  if (!r) return e;
  let i = Number.parseInt(r, t ? 16 : 10);
  return i <= 127 ? String.fromCharCode(i) : e;
}
function Wc(e) {
  let t = e.replace(Ic, Uc).replace(Lc, ``).replace(Rc, `:`).replace(zc, ``);
  return Pc.test(t);
}
function Gc(e) {
  let t = /url\s*\(/gi,
    n = ``,
    r = 0,
    i;
  for (; (i = t.exec(e)) !== null;) {
    let a = i.index,
      o = t.lastIndex - 1,
      s = o + 1,
      c = 1,
      l = null;
    for (; s < e.length; s++) {
      let t = e[s];
      if (l) {
        t === l && (l = null);
        continue;
      }
      if (t === `"` || t === `'`) l = t;else if (t === `(`) c++;else if (t === `)` && (c--, c === 0)) break;
    }
    if (c !== 0) break;
    let u = e.slice(o + 1, s).trim(),
      d = u.startsWith(`"`) && u.endsWith(`"`) || u.startsWith(`'`) && u.endsWith(`'`) ? u.slice(1, -1).trim() : u;
    n += e.slice(r, a), n += Wc(d) ? `url(about:blank)` : e.slice(a, s + 1), r = s + 1;
  }
  return n + e.slice(r);
}
function Kc(e, t) {
  return Fc.test(e) && Wc(t) ? `about:blank` : Nc(e.toLowerCase() === `style` ? Gc(t) : t);
}
function qc(e) {
  return e = e.replace(/([\w:-]+)\s*=\s*"([^"]*)"/g, (e, t, n) => `${t}="${Kc(t, n)}"`), e = e.replace(/([\w:-]+)\s*=\s*'([^']*)'/g, (e, t, n) => `${t}='${Kc(t, n)}'`), Bc.test(e) && (e = e.replace(Vc, `$1&#111;n$2`)), e = e.replace(Hc, (e, t, n, r) => Wc(r) ? `${t}${n}about:blank` : e), e;
}
var Jc = e => !X(e) || K(e);
function Yc(e, t) {
  if (Jc(e) || Jc(t)) throw Error(`Invalid value`);
  let n = [{
    src: e,
    des: t
  }];
  for (; n.length;) {
    let {
      src: e,
      des: t
    } = n.pop();
    Object.keys(e).forEach(r => {
      if (r === `__proto__`) return;
      let i = e[r];
      if (K(i)) {
        let e = [];
        e.length = i.length, t[r] = e, n.push({
          src: i,
          des: e
        });
      } else X(i) ? ((!X(t[r]) || K(t[r])) && (t[r] = G()), n.push({
        src: i,
        des: t[r]
      })) : t[r] = i;
    });
  }
}
function Xc(e, t, n) {
  return {
    line: e,
    column: t,
    offset: n
  };
}
function Zc(e, t, n) {
  let r = {
    start: e,
    end: t
  };
  return n != null && (r.source = n), r;
}
var Q = {
  EXPECTED_TOKEN: 1,
  INVALID_TOKEN_IN_PLACEHOLDER: 2,
  UNTERMINATED_SINGLE_QUOTE_IN_PLACEHOLDER: 3,
  UNKNOWN_ESCAPE_SEQUENCE: 4,
  INVALID_UNICODE_ESCAPE_SEQUENCE: 5,
  UNBALANCED_CLOSING_BRACE: 6,
  UNTERMINATED_CLOSING_BRACE: 7,
  EMPTY_PLACEHOLDER: 8,
  NOT_ALLOW_NEST_PLACEHOLDER: 9,
  INVALID_LINKED_FORMAT: 10,
  MUST_HAVE_MESSAGES_IN_PLURAL: 11,
  UNEXPECTED_EMPTY_LINKED_MODIFIER: 12,
  UNEXPECTED_EMPTY_LINKED_KEY: 13,
  UNEXPECTED_LEXICAL_ANALYSIS: 14,
  UNHANDLED_CODEGEN_NODE_TYPE: 15,
  UNHANDLED_MINIFIER_NODE_TYPE: 16
};
Q.EXPECTED_TOKEN, Q.INVALID_TOKEN_IN_PLACEHOLDER, Q.UNTERMINATED_SINGLE_QUOTE_IN_PLACEHOLDER, Q.UNKNOWN_ESCAPE_SEQUENCE, Q.INVALID_UNICODE_ESCAPE_SEQUENCE, Q.UNBALANCED_CLOSING_BRACE, Q.UNTERMINATED_CLOSING_BRACE, Q.EMPTY_PLACEHOLDER, Q.NOT_ALLOW_NEST_PLACEHOLDER, Q.INVALID_LINKED_FORMAT, Q.MUST_HAVE_MESSAGES_IN_PLURAL, Q.UNEXPECTED_EMPTY_LINKED_MODIFIER, Q.UNEXPECTED_EMPTY_LINKED_KEY, Q.UNEXPECTED_LEXICAL_ANALYSIS, Q.UNHANDLED_CODEGEN_NODE_TYPE, Q.UNHANDLED_MINIFIER_NODE_TYPE;
function Qc(e, t, n = {}) {
  let {
      domain: r,
      messages: i,
      args: a
    } = n,
    o = SyntaxError(String(e));
  return o.code = e, t && (o.location = t), o.domain = r, o;
}
function $c(e) {
  throw e;
}
var el = ` `,
  tl = `\r`,
  nl = `
`,
  rl = `null`,
  il = `null`;
function al(e) {
  let t = e,
    n = 0,
    r = 1,
    i = 1,
    a = 0,
    o = e => t[e] === tl && t[e + 1] === nl,
    s = e => t[e] === nl,
    c = e => t[e] === il,
    l = e => t[e] === rl,
    u = e => o(e) || s(e) || c(e) || l(e),
    d = () => n,
    f = () => r,
    p = () => i,
    m = () => a,
    h = e => o(e) || c(e) || l(e) ? nl : t[e],
    g = () => h(n),
    _ = () => h(n + a);
  function v() {
    return a = 0, u(n) && (r++, i = 0), o(n) && n++, n++, i++, t[n];
  }
  function y() {
    return o(n + a) && a++, a++, t[n + a];
  }
  function b() {
    n = 0, r = 1, i = 1, a = 0;
  }
  function x(e = 0) {
    a = e;
  }
  function S() {
    let e = n + a;
    for (; e !== n;) v();
    a = 0;
  }
  return {
    index: d,
    line: f,
    column: p,
    peekOffset: m,
    charAt: h,
    currentChar: g,
    currentPeek: _,
    next: v,
    peek: y,
    reset: b,
    resetPeek: x,
    skipToPeek: S
  };
}
var ol = undefined,
  sl = `'`,
  cl = `tokenizer`;
function ll(e, t = {}) {
  let n = t.location !== false,
    r = al(e),
    i = () => r.index(),
    a = () => Xc(r.line(), r.column(), r.index()),
    o = a(),
    s = i(),
    c = {
      currentType: 13,
      offset: s,
      startLoc: o,
      endLoc: o,
      lastType: 13,
      lastOffset: s,
      lastStartLoc: o,
      lastEndLoc: o,
      braceNest: 0,
      inLinked: false,
      text: ``
    },
    l = () => c,
    {
      onError: u
    } = t;
  function d(e, t, r, ...i) {
    let a = l();
    if (t.column += r, t.offset += r, u) {
      let r = Qc(e, n ? Zc(a.startLoc, t) : null, {
        domain: cl,
        args: i
      });
      u(r);
    }
  }
  function f(e, t, r) {
    e.endLoc = a(), e.currentType = t;
    let i = {
      type: t
    };
    return n && (i.loc = Zc(e.startLoc, e.endLoc)), r != null && (i.value = r), i;
  }
  let p = e => f(e, 13);
  function m(e, t) {
    return e.currentChar() === t ? (e.next(), t) : (d(Q.EXPECTED_TOKEN, a(), 0, t), ``);
  }
  function h(e) {
    let t = ``;
    for (; e.currentPeek() === el || e.currentPeek() === nl;) t += e.currentPeek(), e.peek();
    return t;
  }
  function g(e) {
    let t = h(e);
    return e.skipToPeek(), t;
  }
  function _(e) {
    if (e === ol) return false;
    let t = e.charCodeAt(0);
    return t >= 97 && t <= 122 || t >= 65 && t <= 90 || t === 95;
  }
  function v(e) {
    if (e === ol) return false;
    let t = e.charCodeAt(0);
    return t >= 48 && t <= 57;
  }
  function y(e, t) {
    let {
      currentType: n
    } = t;
    if (n !== 2) return false;
    h(e);
    let r = _(e.currentPeek());
    return e.resetPeek(), r;
  }
  function b(e, t) {
    let {
      currentType: n
    } = t;
    if (n !== 2) return false;
    h(e);
    let r = v(e.currentPeek() === `-` ? e.peek() : e.currentPeek());
    return e.resetPeek(), r;
  }
  function x(e, t) {
    let {
      currentType: n
    } = t;
    if (n !== 2) return false;
    h(e);
    let r = e.currentPeek() === sl;
    return e.resetPeek(), r;
  }
  function S(e, t) {
    let {
      currentType: n
    } = t;
    if (n !== 7) return false;
    h(e);
    let r = e.currentPeek() === `.`;
    return e.resetPeek(), r;
  }
  function C(e, t) {
    let {
      currentType: n
    } = t;
    if (n !== 8) return false;
    h(e);
    let r = _(e.currentPeek());
    return e.resetPeek(), r;
  }
  function w(e, t) {
    let {
      currentType: n
    } = t;
    if (n !== 7 && n !== 11) return false;
    h(e);
    let r = e.currentPeek() === `:`;
    return e.resetPeek(), r;
  }
  function T(e, t) {
    let {
      currentType: n
    } = t;
    if (n !== 9) return false;
    let r = () => {
        let t = e.currentPeek();
        return t === `{` ? _(e.peek()) : t === `@` || t === `|` || t === `:` || t === `.` || t === el || !t ? false : t === nl ? (e.peek(), r()) : D(e, false);
      },
      i = r();
    return e.resetPeek(), i;
  }
  function E(e) {
    h(e);
    let t = e.currentPeek() === `|`;
    return e.resetPeek(), t;
  }
  function D(e, t = true) {
    let n = (t = false, r = ``) => {
        let i = e.currentPeek();
        return i === `{` || i === `@` || !i ? t : i === `|` ? r !== el && r !== nl : i === el ? (e.peek(), n(true, el)) : i !== nl || (e.peek(), n(true, nl));
      },
      r = n();
    return t && e.resetPeek(), r;
  }
  function O(e, t) {
    let n = e.currentChar();
    if (n !== ol) return t(n) ? (e.next(), n) : null;
  }
  function k(e) {
    let t = e.charCodeAt(0);
    return t >= 97 && t <= 122 || t >= 65 && t <= 90 || t >= 48 && t <= 57 || t === 95 || t === 36;
  }
  function ee(e) {
    return O(e, k);
  }
  function te(e) {
    let t = e.charCodeAt(0);
    return t >= 97 && t <= 122 || t >= 65 && t <= 90 || t >= 48 && t <= 57 || t === 95 || t === 36 || t === 45;
  }
  function ne(e) {
    return O(e, te);
  }
  function re(e) {
    let t = e.charCodeAt(0);
    return t >= 48 && t <= 57;
  }
  function A(e) {
    return O(e, re);
  }
  function j(e) {
    let t = e.charCodeAt(0);
    return t >= 48 && t <= 57 || t >= 65 && t <= 70 || t >= 97 && t <= 102;
  }
  function ie(e) {
    return O(e, j);
  }
  function ae(e) {
    let t = ``,
      n = ``;
    for (; t = A(e);) n += t;
    return n;
  }
  function oe(e) {
    let t = ``;
    for (;;) {
      let n = e.currentChar();
      if (n === `\\`) {
        let r = e.peek();
        r === `{` || r === `}` || r === `@` || r === `|` || r === `\\` ? (t += n + r, e.next(), e.next()) : (e.resetPeek(), t += n, e.next());
      } else if (n === `{` || n === `}` || n === `@` || n === `|` || !n) break;else if (n === el || n === nl) {
        if (D(e)) t += n, e.next();else if (E(e)) break;else t += n, e.next();
      } else t += n, e.next();
    }
    return t;
  }
  function se(e) {
    g(e);
    let t = ``,
      n = ``;
    for (; t = ne(e);) n += t;
    let r = e.currentChar();
    if (r && r !== `}` && r !== ol && r !== el && r !== nl && r !== `　`) {
      let t = me(e);
      return d(Q.INVALID_TOKEN_IN_PLACEHOLDER, a(), 0, n + t), n + t;
    }
    return e.currentChar() === ol && d(Q.UNTERMINATED_CLOSING_BRACE, a(), 0), n;
  }
  function ce(e) {
    g(e);
    let t = ``;
    return e.currentChar() === `-` ? (e.next(), t += `-${ae(e)}`) : t += ae(e), e.currentChar() === ol && d(Q.UNTERMINATED_CLOSING_BRACE, a(), 0), t;
  }
  function le(e) {
    return e !== sl && e !== nl;
  }
  function ue(e) {
    g(e), m(e, `'`);
    let t = ``,
      n = ``;
    for (; t = O(e, le);) n += t === `\\` ? de(e) : t;
    let r = e.currentChar();
    return r === nl || r === ol ? (d(Q.UNTERMINATED_SINGLE_QUOTE_IN_PLACEHOLDER, a(), 0), r === nl && (e.next(), m(e, `'`)), n) : (m(e, `'`), n);
  }
  function de(e) {
    let t = e.currentChar();
    switch (t) {
      case `\\`:
      case `'`:
        return e.next(), `\\${t}`;
      case `u`:
        return fe(e, t, 4);
      case `U`:
        return fe(e, t, 6);
      default:
        return d(Q.UNKNOWN_ESCAPE_SEQUENCE, a(), 0, t), ``;
    }
  }
  function fe(e, t, n) {
    m(e, t);
    let r = ``;
    for (let i = 0; i < n; i++) {
      let n = ie(e);
      if (!n) {
        d(Q.INVALID_UNICODE_ESCAPE_SEQUENCE, a(), 0, `\\${t}${r}${e.currentChar()}`);
        break;
      }
      r += n;
    }
    return `\\${t}${r}`;
  }
  function pe(e) {
    return e !== `{` && e !== `}` && e !== el && e !== nl;
  }
  function me(e) {
    g(e);
    let t = ``,
      n = ``;
    for (; t = O(e, pe);) n += t;
    return n;
  }
  function he(e) {
    let t = ``,
      n = ``;
    for (; t = ee(e);) n += t;
    return n;
  }
  function ge(e) {
    let t = n => {
      let r = e.currentChar();
      return r === `{` || r === `@` || r === `|` || r === `(` || r === `)` || !r || r === el ? n : (n += r, e.next(), t(n));
    };
    return t(``);
  }
  function _e(e) {
    g(e);
    let t = m(e, `|`);
    return g(e), t;
  }
  function ve(e, t) {
    let n = null;
    switch (e.currentChar()) {
      case `{`:
        return t.braceNest >= 1 && d(Q.NOT_ALLOW_NEST_PLACEHOLDER, a(), 0), e.next(), n = f(t, 2, `{`), g(e), t.braceNest++, n;
      case `}`:
        return t.braceNest > 0 && t.currentType === 2 && d(Q.EMPTY_PLACEHOLDER, a(), 0), e.next(), n = f(t, 3, `}`), t.braceNest--, t.braceNest > 0 && g(e), t.inLinked && t.braceNest === 0 && (t.inLinked = false), n;
      case `@`:
        return t.braceNest > 0 && d(Q.UNTERMINATED_CLOSING_BRACE, a(), 0), n = ye(e, t) || p(t), t.braceNest = 0, n;
      default:
        {
          let r = true,
            i = true,
            o = true;
          if (E(e)) return t.braceNest > 0 && d(Q.UNTERMINATED_CLOSING_BRACE, a(), 0), n = f(t, 1, _e(e)), t.braceNest = 0, t.inLinked = false, n;
          if (t.braceNest > 0 && (t.currentType === 4 || t.currentType === 5 || t.currentType === 6)) return d(Q.UNTERMINATED_CLOSING_BRACE, a(), 0), t.braceNest = 0, be(e, t);
          if (r = y(e, t)) return n = f(t, 4, se(e)), g(e), n;
          if (i = b(e, t)) return n = f(t, 5, ce(e)), g(e), n;
          if (o = x(e, t)) return n = f(t, 6, ue(e)), g(e), n;
          if (!r && !i && !o) return n = f(t, 12, me(e)), d(Q.INVALID_TOKEN_IN_PLACEHOLDER, a(), 0, n.value), g(e), n;
          break;
        }
    }
    return n;
  }
  function ye(e, t) {
    let {
        currentType: n
      } = t,
      r = null,
      i = e.currentChar();
    switch ((n === 7 || n === 8 || n === 11 || n === 9) && (i === nl || i === el) && d(Q.INVALID_LINKED_FORMAT, a(), 0), i) {
      case `@`:
        return e.next(), r = f(t, 7, `@`), t.inLinked = true, r;
      case `.`:
        return g(e), e.next(), f(t, 8, `.`);
      case `:`:
        return g(e), e.next(), f(t, 9, `:`);
      default:
        return E(e) ? (r = f(t, 1, _e(e)), t.braceNest = 0, t.inLinked = false, r) : S(e, t) || w(e, t) ? (g(e), ye(e, t)) : C(e, t) ? (g(e), f(t, 11, he(e))) : T(e, t) ? (g(e), i === `{` ? ve(e, t) || r : f(t, 10, ge(e))) : (n === 7 && d(Q.INVALID_LINKED_FORMAT, a(), 0), t.braceNest = 0, t.inLinked = false, be(e, t));
    }
  }
  function be(e, t) {
    let n = {
      type: 13
    };
    if (t.braceNest > 0) return ve(e, t) || p(t);
    if (t.inLinked) return ye(e, t) || p(t);
    switch (e.currentChar()) {
      case `{`:
        return ve(e, t) || p(t);
      case `}`:
        return d(Q.UNBALANCED_CLOSING_BRACE, a(), 0), e.next(), f(t, 3, `}`);
      case `@`:
        return ye(e, t) || p(t);
      default:
        if (E(e)) return n = f(t, 1, _e(e)), t.braceNest = 0, t.inLinked = false, n;
        if (D(e)) return f(t, 0, oe(e));
    }
    return n;
  }
  function xe() {
    let {
      currentType: e,
      offset: t,
      startLoc: n,
      endLoc: o
    } = c;
    return c.lastType = e, c.lastOffset = t, c.lastStartLoc = n, c.lastEndLoc = o, c.offset = i(), c.startLoc = a(), r.currentChar() === ol ? f(c, 13) : be(r, c);
  }
  return {
    nextToken: xe,
    currentOffset: i,
    currentPosition: a,
    context: l
  };
}
var ul = `parser`,
  dl = /(?:\\\\|\\'|\\u([0-9a-fA-F]{4})|\\U([0-9a-fA-F]{6}))/g,
  fl = /\\([\\@{}|])/g;
function pl(e, t) {
  return t;
}
function ml(e, t, n) {
  switch (e) {
    case `\\\\`:
      return `\\`;
    case `\\'`:
      return `'`;
    default:
      {
        let e = parseInt(t || n, 16);
        return e <= 55295 || e >= 57344 ? String.fromCodePoint(e) : `�`;
      }
  }
}
function hl(e = {}) {
  let t = e.location !== false,
    {
      onError: n
    } = e;
  function r(e, r, i, a, ...o) {
    let s = e.currentPosition();
    if (s.offset += a, s.column += a, n) {
      let e = Qc(r, t ? Zc(i, s) : null, {
        domain: ul,
        args: o
      });
      n(e);
    }
  }
  function i(e, n, r) {
    let i = {
      type: e
    };
    return t && (i.start = n, i.end = n, i.loc = {
      start: r,
      end: r
    }), i;
  }
  function a(e, n, r, i) {
    t && (e.end = n, e.loc && (e.loc.end = r));
  }
  function o(e, t) {
    let n = e.context(),
      r = i(3, n.offset, n.startLoc);
    return r.value = t.replace(fl, pl), a(r, e.currentOffset(), e.currentPosition()), r;
  }
  function s(e, t) {
    let {
        lastOffset: n,
        lastStartLoc: r
      } = e.context(),
      o = i(5, n, r);
    return o.index = parseInt(t, 10), e.nextToken(), a(o, e.currentOffset(), e.currentPosition()), o;
  }
  function c(e, t) {
    let {
        lastOffset: n,
        lastStartLoc: r
      } = e.context(),
      o = i(4, n, r);
    return o.key = t, e.nextToken(), a(o, e.currentOffset(), e.currentPosition()), o;
  }
  function l(e, t) {
    let {
        lastOffset: n,
        lastStartLoc: r
      } = e.context(),
      o = i(9, n, r);
    return o.value = t.replace(dl, ml), e.nextToken(), a(o, e.currentOffset(), e.currentPosition()), o;
  }
  function u(e) {
    let t = e.nextToken(),
      n = e.context(),
      {
        lastOffset: o,
        lastStartLoc: s
      } = n,
      c = i(8, o, s);
    return t.type === 11 ? (t.value ?? r(e, Q.UNEXPECTED_LEXICAL_ANALYSIS, n.lastStartLoc, 0, gl(t)), c.value = t.value || ``, a(c, e.currentOffset(), e.currentPosition()), {
      node: c
    }) : (r(e, Q.UNEXPECTED_EMPTY_LINKED_MODIFIER, n.lastStartLoc, 0), c.value = ``, a(c, o, s), {
      nextConsumeToken: t,
      node: c
    });
  }
  function d(e, t) {
    let n = e.context(),
      r = i(7, n.offset, n.startLoc);
    return r.value = t, a(r, e.currentOffset(), e.currentPosition()), r;
  }
  function f(e) {
    let t = e.context(),
      n = i(6, t.offset, t.startLoc),
      o = e.nextToken();
    if (o.type === 8) {
      let t = u(e);
      n.modifier = t.node, o = t.nextConsumeToken || e.nextToken();
    }
    switch (o.type !== 9 && r(e, Q.UNEXPECTED_LEXICAL_ANALYSIS, t.lastStartLoc, 0, gl(o)), o = e.nextToken(), o.type === 2 && (o = e.nextToken()), o.type) {
      case 10:
        o.value ?? r(e, Q.UNEXPECTED_LEXICAL_ANALYSIS, t.lastStartLoc, 0, gl(o)), n.key = d(e, o.value || ``);
        break;
      case 4:
        o.value ?? r(e, Q.UNEXPECTED_LEXICAL_ANALYSIS, t.lastStartLoc, 0, gl(o)), n.key = c(e, o.value || ``);
        break;
      case 5:
        o.value ?? r(e, Q.UNEXPECTED_LEXICAL_ANALYSIS, t.lastStartLoc, 0, gl(o)), n.key = s(e, o.value || ``);
        break;
      case 6:
        o.value ?? r(e, Q.UNEXPECTED_LEXICAL_ANALYSIS, t.lastStartLoc, 0, gl(o)), n.key = l(e, o.value || ``);
        break;
      default:
        {
          r(e, Q.UNEXPECTED_EMPTY_LINKED_KEY, t.lastStartLoc, 0);
          let s = e.context(),
            c = i(7, s.offset, s.startLoc);
          return c.value = ``, a(c, s.offset, s.startLoc), n.key = c, a(n, s.offset, s.startLoc), {
            nextConsumeToken: o,
            node: n
          };
        }
    }
    return a(n, e.currentOffset(), e.currentPosition()), {
      node: n
    };
  }
  function p(e) {
    let t = e.context(),
      n = i(2, t.currentType === 1 ? e.currentOffset() : t.offset, t.currentType === 1 ? t.endLoc : t.startLoc);
    n.items = [];
    let u = null;
    do {
      let i = u || e.nextToken();
      switch (u = null, i.type) {
        case 0:
          i.value ?? r(e, Q.UNEXPECTED_LEXICAL_ANALYSIS, t.lastStartLoc, 0, gl(i)), n.items.push(o(e, i.value || ``));
          break;
        case 5:
          i.value ?? r(e, Q.UNEXPECTED_LEXICAL_ANALYSIS, t.lastStartLoc, 0, gl(i)), n.items.push(s(e, i.value || ``));
          break;
        case 4:
          i.value ?? r(e, Q.UNEXPECTED_LEXICAL_ANALYSIS, t.lastStartLoc, 0, gl(i)), n.items.push(c(e, i.value || ``));
          break;
        case 6:
          i.value ?? r(e, Q.UNEXPECTED_LEXICAL_ANALYSIS, t.lastStartLoc, 0, gl(i)), n.items.push(l(e, i.value || ``));
          break;
        case 7:
          {
            let t = f(e);
            n.items.push(t.node), u = t.nextConsumeToken || null;
            break;
          }
      }
    } while (t.currentType !== 13 && t.currentType !== 1);
    return a(n, t.currentType === 1 ? t.lastOffset : e.currentOffset(), t.currentType === 1 ? t.lastEndLoc : e.currentPosition()), n;
  }
  function m(e, t, n, o) {
    let s = e.context(),
      c = o.items.length === 0,
      l = i(1, t, n);
    l.cases = [], l.cases.push(o);
    do {
      let t = p(e);
      c ||= t.items.length === 0, l.cases.push(t);
    } while (s.currentType !== 13);
    return c && r(e, Q.MUST_HAVE_MESSAGES_IN_PLURAL, n, 0), a(l, e.currentOffset(), e.currentPosition()), l;
  }
  function h(e) {
    let t = e.context(),
      {
        offset: n,
        startLoc: r
      } = t,
      i = p(e);
    return t.currentType === 13 ? i : m(e, n, r, i);
  }
  function g(n) {
    let o = ll(n, W({}, e)),
      s = o.context(),
      c = i(0, s.offset, s.startLoc);
    return t && c.loc && (c.loc.source = n), c.body = h(o), e.onCacheKey && (c.cacheKey = e.onCacheKey(n)), s.currentType !== 13 && r(o, Q.UNEXPECTED_LEXICAL_ANALYSIS, s.lastStartLoc, 0, n[s.offset] || ``), a(c, o.currentOffset(), o.currentPosition()), c;
  }
  return {
    parse: g
  };
}
function gl(e) {
  if (e.type === 13) return `EOF`;
  let t = (e.value || ``).replace(/\r?\n/gu, `\\n`);
  return t.length > 10 ? t.slice(0, 9) + `…` : t;
}
function _l(e, t = {}) {
  let n = {
    ast: e,
    helpers: new Set()
  };
  return {
    context: () => n,
    helper: e => (n.helpers.add(e), e)
  };
}
function vl(e, t) {
  for (let n = 0; n < e.length; n++) yl(e[n], t);
}
function yl(e, t) {
  switch (e.type) {
    case 1:
      vl(e.cases, t), t.helper(`plural`);
      break;
    case 2:
      vl(e.items, t);
      break;
    case 6:
      yl(e.key, t), t.helper(`linked`), t.helper(`type`);
      break;
    case 5:
      t.helper(`interpolate`), t.helper(`list`);
      break;
    case 4:
      t.helper(`interpolate`), t.helper(`named`);
  }
}
function bl(e, t = {}) {
  let n = _l(e);
  n.helper(`normalize`), e.body && yl(e.body, n);
  let r = n.context();
  e.helpers = Array.from(r.helpers);
}
function xl(e) {
  let t = e.body;
  return t.type === 2 ? Sl(t) : t.cases.forEach(e => Sl(e)), e;
}
function Sl(e) {
  if (e.items.length === 1) {
    let t = e.items[0];
    (t.type === 3 || t.type === 9) && (e.static = t.value, delete t.value);
  } else {
    let t = [];
    for (let n = 0; n < e.items.length; n++) {
      let r = e.items[n];
      if (r.type !== 3 && r.type !== 9 || r.value == null) break;
      t.push(r.value);
    }
    if (t.length === e.items.length) {
      e.static = Ac(t);
      for (let t = 0; t < e.items.length; t++) {
        let n = e.items[t];
        (n.type === 3 || n.type === 9) && delete n.value;
      }
    }
  }
}
function Cl(e) {
  switch (e.t = e.type, e.type) {
    case 0:
      {
        let t = e;
        Cl(t.body), t.b = t.body, delete t.body;
        break;
      }
    case 1:
      {
        let t = e,
          n = t.cases;
        for (let e = 0; e < n.length; e++) Cl(n[e]);
        t.c = n, delete t.cases;
        break;
      }
    case 2:
      {
        let t = e,
          n = t.items;
        for (let e = 0; e < n.length; e++) Cl(n[e]);
        t.i = n, delete t.items, t.static && (t.s = t.static, delete t.static);
        break;
      }
    case 3:
    case 9:
    case 8:
    case 7:
      {
        let t = e;
        t.value && (t.v = t.value, delete t.value);
        break;
      }
    case 6:
      {
        let t = e;
        Cl(t.key), t.k = t.key, delete t.key, t.modifier && (Cl(t.modifier), t.m = t.modifier, delete t.modifier);
        break;
      }
    case 5:
      {
        let t = e;
        t.i = t.index, delete t.index;
        break;
      }
    case 4:
      {
        let t = e;
        t.k = t.key, delete t.key;
        break;
      }
  }
  delete e.type;
}
function wl(e, t) {
  let {
      filename: n,
      breakLineCode: r,
      needIndent: i
    } = t,
    a = t.location !== false,
    o = {
      filename: n,
      code: ``,
      column: 1,
      line: 1,
      offset: 0,
      map: undefined,
      breakLineCode: r,
      needIndent: i,
      indentLevel: 0
    };
  a && e.loc && (o.source = e.loc.source);
  let s = () => o;
  function c(e, t) {
    o.code += e;
  }
  function l(e, t = true) {
    let n = t ? r : ``;
    c(i ? n + `  `.repeat(e) : n);
  }
  function u(e = true) {
    let t = ++o.indentLevel;
    e && l(t);
  }
  function d(e = true) {
    let t = --o.indentLevel;
    e && l(t);
  }
  function f() {
    l(o.indentLevel);
  }
  return {
    context: s,
    push: c,
    indent: u,
    deindent: d,
    newline: f,
    helper: e => `_${e}`,
    needIndent: () => o.needIndent
  };
}
function Tl(e, t) {
  let {
    helper: n
  } = e;
  e.push(`${n(`linked`)}(`), kl(e, t.key), t.modifier ? (e.push(`, `), kl(e, t.modifier), e.push(`, _type`)) : e.push(`, undefined, _type`), e.push(`)`);
}
function El(e, t) {
  let {
    helper: n,
    needIndent: r
  } = e;
  e.push(`${n(`normalize`)}([`), e.indent(r());
  let i = t.items.length;
  for (let n = 0; n < i && (kl(e, t.items[n]), n !== i - 1); n++) e.push(`, `);
  e.deindent(r()), e.push(`])`);
}
function Dl(e, t) {
  let {
    helper: n,
    needIndent: r
  } = e;
  if (t.cases.length > 1) {
    e.push(`${n(`plural`)}([`), e.indent(r());
    let i = t.cases.length;
    for (let n = 0; n < i && (kl(e, t.cases[n]), n !== i - 1); n++) e.push(`, `);
    e.deindent(r()), e.push(`])`);
  }
}
function Ol(e, t) {
  t.body ? kl(e, t.body) : e.push(`null`);
}
function kl(e, t) {
  let {
    helper: n
  } = e;
  switch (t.type) {
    case 0:
      Ol(e, t);
      break;
    case 1:
      Dl(e, t);
      break;
    case 2:
      El(e, t);
      break;
    case 6:
      Tl(e, t);
      break;
    case 8:
      e.push(JSON.stringify(t.value), t);
      break;
    case 7:
      e.push(JSON.stringify(t.value), t);
      break;
    case 5:
      e.push(`${n(`interpolate`)}(${n(`list`)}(${t.index}))`, t);
      break;
    case 4:
      e.push(`${n(`interpolate`)}(${n(`named`)}(${JSON.stringify(t.key)}))`, t);
      break;
    case 9:
      e.push(JSON.stringify(t.value), t);
      break;
    case 3:
      e.push(JSON.stringify(t.value), t);
  }
}
var Al = (e, t = {}) => {
  let n = J(t.mode) ? t.mode : `normal`,
    r = J(t.filename) ? t.filename : `message.intl`;
  t.sourceMap;
  let i = t.breakLineCode == null ? n === `arrow` ? `;` : `
` : t.breakLineCode,
    a = t.needIndent ? t.needIndent : n !== `arrow`,
    o = e.helpers || [],
    s = wl(e, {
      filename: r,
      breakLineCode: i,
      needIndent: a
    });
  s.push(n === `normal` ? `function __msg__ (ctx) {` : `(ctx) => {`), s.indent(a), o.length > 0 && (s.push(`const { ${Ac(o.map(e => `${e}: _${e}`), `, `)} } = ctx`), s.newline()), s.push(`return `), kl(s, e), s.deindent(a), s.push(`}`), delete e.helpers;
  let {
    code: c,
    map: l
  } = s.context();
  return {
    ast: e,
    code: c,
    map: l ? l.toJSON() : undefined
  };
};
function jl(e, t = {}) {
  let n = W({}, t),
    r = !!n.jit,
    i = !!n.minify,
    a = n.optimize == null || n.optimize,
    o = hl(n).parse(e);
  return r ? (a && xl(o), i && Cl(o), {
    ast: o,
    code: ``
  }) : (bl(o, n), Al(o, n));
}
function Ml() {
  typeof __INTLIFY_PROD_DEVTOOLS__ != `boolean` && (Cc().__INTLIFY_PROD_DEVTOOLS__ = false);
}
function Nl(e) {
  return X(e) && Ul(e) === 0 && (Tc(e, `b`) || Tc(e, `body`));
}
var Pl = [`b`, `body`];
function Fl(e) {
  return Xl(e, Pl);
}
var Il = [`c`, `cases`];
function Ll(e) {
  return Xl(e, Il, []);
}
var Rl = [`s`, `static`];
function zl(e) {
  return Xl(e, Rl);
}
var Bl = [`i`, `items`];
function Vl(e) {
  return Xl(e, Bl, []);
}
var Hl = [`t`, `type`];
function Ul(e) {
  return Xl(e, Hl);
}
var Wl = [`v`, `value`];
function Gl(e, t) {
  let n = Xl(e, Wl);
  if (n != null) return n;
  throw Ql(t);
}
var Kl = [`m`, `modifier`];
function ql(e) {
  return Xl(e, Kl);
}
var Jl = [`k`, `key`];
function Yl(e) {
  let t = Xl(e, Jl);
  if (t) return t;
  throw Ql(6);
}
function Xl(e, t, n) {
  for (let n = 0; n < t.length; n++) {
    let r = t[n];
    if (Tc(e, r) && e[r] != null) return e[r];
  }
  return n;
}
var Zl = [...Pl, ...Il, ...Rl, ...Bl, ...Jl, ...Kl, ...Wl, ...Hl];
function Ql(e) {
  return Error(`unhandled node type: ${e}`);
}
function $l(e) {
  return t => eu(t, e);
}
function eu(e, t) {
  let n = Fl(t);
  if (n == null) throw Ql(0);
  if (Ul(n) === 1) {
    let t = Ll(n);
    return e.plural(t.reduce((t, n) => [...t, tu(e, n)], []));
  }
  return tu(e, n);
}
function tu(e, t) {
  let n = zl(t);
  if (n != null) return e.type === `text` ? n : e.normalize([n]);
  {
    let n = Vl(t).reduce((t, n) => [...t, nu(e, n)], []);
    return e.normalize(n);
  }
}
function nu(e, t) {
  let n = Ul(t);
  switch (n) {
    case 3:
      return Gl(t, n);
    case 9:
      return Gl(t, n);
    case 4:
      {
        let r = t;
        if (Tc(r, `k`) && r.k) return e.interpolate(e.named(r.k));
        if (Tc(r, `key`) && r.key) return e.interpolate(e.named(r.key));
        throw Ql(n);
      }
    case 5:
      {
        let r = t;
        if (Tc(r, `i`) && U(r.i)) return e.interpolate(e.list(r.i));
        if (Tc(r, `index`) && U(r.index)) return e.interpolate(e.list(r.index));
        throw Ql(n);
      }
    case 6:
      {
        let n = t,
          r = ql(n),
          i = Yl(n);
        return e.linked(nu(e, i), r ? nu(e, r) : undefined, e.type);
      }
    case 7:
      return Gl(t, n);
    case 8:
      return Gl(t, n);
    default:
      throw Error(`unhandled node on format message part: ${n}`);
  }
}
var ru = e => e,
  iu = G();
function au(e, t = {}) {
  let n = false,
    r = t.onError || $c;
  return t.onError = e => {
    n = true, r(e);
  }, {
    ...jl(e, t),
    detectError: n
  };
}
function ou(e, t) {
  if (J(e)) {
    Y(t.warnHtmlMessage) && t.warnHtmlMessage;
    let n = (t.onCacheKey || ru)(e),
      r = iu[n];
    if (r) return r;
    let {
        ast: i,
        detectError: a
      } = au(e, {
        ...t,
        location: false,
        jit: true
      }),
      o = $l(i);
    return a ? o : iu[n] = o;
  }
  {
    let t = e.cacheKey;
    return t ? iu[t] || (iu[t] = $l(e)) : $l(e);
  }
}
var su = null;
function cu(e) {
  su = e;
}
function lu(e, t, n) {
  su && su.emit(`i18n:init`, {
    timestamp: Date.now(),
    i18n: e,
    version: t,
    meta: n
  });
}
var uu = du(`function:translate`);
function du(e) {
  return t => su && su.emit(e, t);
}
var fu = {
  INVALID_ARGUMENT: 17,
  INVALID_DATE_ARGUMENT: 18,
  INVALID_ISO_DATE_ARGUMENT: 19,
  NOT_SUPPORT_NON_STRING_MESSAGE: 20,
  NOT_SUPPORT_LOCALE_PROMISE_VALUE: 21,
  NOT_SUPPORT_LOCALE_ASYNC_FUNCTION: 22,
  NOT_SUPPORT_LOCALE_TYPE: 23
};
function pu(e) {
  return Qc(e, null, undefined);
}
fu.INVALID_ARGUMENT, fu.INVALID_DATE_ARGUMENT, fu.INVALID_ISO_DATE_ARGUMENT, fu.NOT_SUPPORT_NON_STRING_MESSAGE, fu.NOT_SUPPORT_LOCALE_PROMISE_VALUE, fu.NOT_SUPPORT_LOCALE_ASYNC_FUNCTION, fu.NOT_SUPPORT_LOCALE_TYPE;
function mu(e, t) {
  return t.locale == null ? gu(e.locale) : gu(t.locale);
}
var hu;
function gu(e) {
  if (J(e)) return e;
  if (q(e)) {
    if (e.resolvedOnce && hu != null) return hu;
    if (e.constructor.name === `Function`) {
      let t = e();
      if (Ec(t)) throw pu(fu.NOT_SUPPORT_LOCALE_PROMISE_VALUE);
      return hu = t;
    }
    throw pu(fu.NOT_SUPPORT_LOCALE_ASYNC_FUNCTION);
  }
  throw pu(fu.NOT_SUPPORT_LOCALE_TYPE);
}
function _u(e, t, n) {
  return [...new Set([n, ...(K(t) ? t : X(t) ? Object.keys(t).filter(e => e !== "default") : J(t) ? [t] : [n])])];
}
function vu(e, t, n) {
  let r = J(n) ? n : Pu,
    i = e,
    a;
  X(t) ? (i.__localeChainObjectCache ||= new WeakMap(), a = i.__localeChainObjectCache.get(t), a || (a = new Map(), i.__localeChainObjectCache.set(t, a))) : (i.__localeChainCache ||= new Map(), a = i.__localeChainCache.get(t), a || (a = new Map(), i.__localeChainCache.set(t, a)));
  let o = a.get(r);
  if (o) return o;
  let s = [],
    c = [n];
  for (; K(c);) c = yu(s, c, t);
  let l = K(t) || !Z(t) ? t : t.default ? t.default : null;
  return c = J(l) ? [l] : l, K(c) && yu(s, c, false), a.set(r, s), s;
}
function yu(e, t, n) {
  let r = true;
  for (let i = 0; i < t.length && Y(r); i++) {
    let a = t[i];
    J(a) && (r = bu(e, t[i], n));
  }
  return r;
}
function bu(e, t, n) {
  let r,
    i = t.split(`-`);
  do r = xu(e, i.join(`-`), n), i.splice(-1, 1); while (i.length && r === true);
  return r;
}
function xu(e, t, n) {
  let r = false;
  if (!e.includes(t) && (r = true, t)) {
    r = t[t.length - 1] !== `!`;
    let i = t.replace(/!/g, ``);
    e.push(i), (K(n) || Z(n)) && n[i] && (r = n[i]);
  }
  return r;
}
var Su = [];
Su[0] = {
  w: [0],
  i: [3, 0],
  "[": [4],
  o: [7]
}, Su[1] = {
  w: [1],
  ".": [2],
  "[": [4],
  o: [7]
}, Su[2] = {
  w: [2],
  i: [3, 0],
  0: [3, 0]
}, Su[3] = {
  i: [3, 0],
  0: [3, 0],
  w: [1, 1],
  ".": [2, 1],
  "[": [4, 1],
  o: [7, 1]
}, Su[4] = {
  "'": [5, 0],
  "\"": [6, 0],
  "[": [4, 2],
  "]": [1, 3],
  o: 8,
  l: [4, 0]
}, Su[5] = {
  "'": [4, 0],
  o: 8,
  l: [5, 0]
}, Su[6] = {
  "\"": [4, 0],
  o: 8,
  l: [6, 0]
};
var Cu = /^\s?(?:true|false|-?[\d.]+|'[^']*'|"[^"]*")\s?$/;
function wu(e) {
  return Cu.test(e);
}
function Tu(e) {
  let t = e.charCodeAt(0);
  return t === e.charCodeAt(e.length - 1) && (t === 34 || t === 39) ? e.slice(1, -1) : e;
}
function Eu(e) {
  if (e == null) return `o`;
  switch (e.charCodeAt(0)) {
    case 91:
    case 93:
    case 46:
    case 34:
    case 39:
      return e;
    case 95:
    case 36:
    case 45:
      return `i`;
    case 9:
    case 10:
    case 13:
    case 160:
    case 65279:
    case 8232:
    case 8233:
      return `w`;
  }
  return `i`;
}
function Du(e) {
  let t = e.trim();
  return e.charAt(0) === `0` && isNaN(parseInt(e)) ? false : wu(t) ? Tu(t) : `*` + t;
}
function Ou(e) {
  let t = [],
    n = -1,
    r = 0,
    i = 0,
    a,
    o,
    s,
    c,
    l,
    u,
    d,
    f = [];
  f[0] = () => {
    o === undefined ? o = s : o += s;
  }, f[1] = () => {
    o !== undefined && (t.push(o), o = undefined);
  }, f[2] = () => {
    f[0](), i++;
  }, f[3] = () => {
    if (i > 0) i--, r = 4, f[0]();else {
      if (i = 0, o === undefined || (o = Du(o), o === false)) return false;
      f[1]();
    }
  };
  function p() {
    let t = e[n + 1];
    if (r === 5 && t === `'` || r === 6 && t === `"`) return n++, s = `\\` + t, f[0](), true;
  }
  for (; r !== null;) if (n++, a = e[n], !(a === `\\` && p())) {
    if (c = Eu(a), d = Su[r], l = d[c] || d.l || 8, l === 8 || (r = l[0], l[1] !== undefined && (u = f[l[1]], u && (s = a, u() === false)))) return;
    if (r === 7) return t;
  }
}
var ku = new Map();
function Au(e, t) {
  return X(e) ? e[t] : null;
}
function ju(e, t) {
  if (!X(e)) return null;
  let n = ku.get(t);
  if (n || (n = Ou(t), n && ku.set(t, n)), !n) return null;
  let r = n.length,
    i = e,
    a = 0;
  for (; a < r;) {
    let e = n[a];
    if (Zl.includes(e) && Nl(i) || !X(i) || !Tc(i, e)) return null;
    let t = i[e];
    if (t === undefined || q(i)) return null;
    i = t, a++;
  }
  return i;
}
var Mu = {
  NOT_FOUND_KEY: 1,
  FALLBACK_TO_TRANSLATE: 2,
  CANNOT_FORMAT_NUMBER: 3,
  FALLBACK_TO_NUMBER_FORMAT: 4,
  CANNOT_FORMAT_DATE: 5,
  FALLBACK_TO_DATE_FORMAT: 6,
  EXPERIMENTAL_CUSTOM_MESSAGE_COMPILER: 7,
  INVALID_NUMBER_ARGUMENT: 8,
  INVALID_DATE_ARGUMENT: 9
};
Mu.NOT_FOUND_KEY, Mu.FALLBACK_TO_TRANSLATE, Mu.CANNOT_FORMAT_NUMBER, Mu.FALLBACK_TO_NUMBER_FORMAT, Mu.CANNOT_FORMAT_DATE, Mu.FALLBACK_TO_DATE_FORMAT, Mu.EXPERIMENTAL_CUSTOM_MESSAGE_COMPILER, Mu.INVALID_NUMBER_ARGUMENT, Mu.INVALID_DATE_ARGUMENT;
var Nu = `11.4.12`,
  Pu = `en-US`,
  Fu = e => `${e.charAt(0).toLocaleUpperCase()}${e.substr(1)}`;
function Iu() {
  return {
    upper: (e, t) => t === `text` && J(e) ? e.toUpperCase() : t === `vnode` && X(e) && `__v_isVNode` in e ? e.children.toUpperCase() : e,
    lower: (e, t) => t === `text` && J(e) ? e.toLowerCase() : t === `vnode` && X(e) && `__v_isVNode` in e ? e.children.toLowerCase() : e,
    capitalize: (e, t) => t === `text` && J(e) ? Fu(e) : t === `vnode` && X(e) && `__v_isVNode` in e ? Fu(e.children) : e
  };
}
var Lu;
function Ru(e) {
  Lu = e;
}
var zu;
function Bu(e) {
  zu = e;
}
var Vu;
function Hu(e) {
  Vu = e;
}
var Uu = null,
  Wu = () => Uu,
  Gu = null,
  Ku = e => {
    Gu = e;
  },
  qu = () => Gu,
  Ju = 0;
function Yu(e = {}) {
  let t = q(e.onWarn) ? e.onWarn : jc,
    n = J(e.version) ? e.version : Nu,
    r = J(e.locale) || q(e.locale) ? e.locale : Pu,
    i = q(r) ? Pu : r,
    a = K(e.fallbackLocale) || Z(e.fallbackLocale) || J(e.fallbackLocale) || e.fallbackLocale === false ? e.fallbackLocale : i,
    o = Z(e.messages) ? e.messages : Xu(i),
    s = Z(e.datetimeFormats) ? e.datetimeFormats : Xu(i),
    c = Z(e.numberFormats) ? e.numberFormats : Xu(i),
    l = W(G(), e.modifiers, Iu()),
    u = e.pluralRules || G(),
    d = q(e.missing) ? e.missing : null,
    f = Y(e.missingWarn) || yc(e.missingWarn) ? e.missingWarn : true,
    p = Y(e.fallbackWarn) || yc(e.fallbackWarn) ? e.fallbackWarn : true,
    m = !!e.fallbackFormat,
    h = !!e.unresolving,
    g = q(e.postTranslation) ? e.postTranslation : null,
    _ = Z(e.processor) ? e.processor : null,
    v = !Y(e.warnHtmlMessage) || e.warnHtmlMessage,
    y = !!e.escapeParameter,
    b = q(e.messageCompiler) ? e.messageCompiler : Lu,
    x = q(e.messageResolver) ? e.messageResolver : zu || Au,
    S = q(e.localeFallbacker) ? e.localeFallbacker : Vu || _u,
    C = X(e.fallbackContext) ? e.fallbackContext : undefined,
    w = e,
    T = X(w.__datetimeFormatters) ? w.__datetimeFormatters : new Map(),
    E = X(w.__numberFormatters) ? w.__numberFormatters : new Map(),
    D = X(w.__meta) ? w.__meta : {};
  Ju++;
  let O = {
    version: n,
    cid: Ju,
    locale: r,
    fallbackLocale: a,
    messages: o,
    modifiers: l,
    pluralRules: u,
    missing: d,
    missingWarn: f,
    fallbackWarn: p,
    fallbackFormat: m,
    unresolving: h,
    postTranslation: g,
    processor: _,
    warnHtmlMessage: v,
    escapeParameter: y,
    messageCompiler: b,
    messageResolver: x,
    localeFallbacker: S,
    fallbackContext: C,
    onWarn: t,
    __meta: D
  };
  return O.datetimeFormats = s, O.numberFormats = c, O.__datetimeFormatters = T, O.__numberFormatters = E, __INTLIFY_PROD_DEVTOOLS__ && lu(O, n, D), O;
}
var Xu = e => ({
  [e]: G()
});
function Zu(e, t, n, r, i) {
  let {
    missing: a,
    onWarn: o
  } = e;
  if (a !== null) {
    let r = a(e, n, t, i);
    return J(r) ? r : t;
  }
  return t;
}
function Qu(e, t) {
  let n = e;
  X(t) ? n.__localeChainObjectCache?.delete(t) : n.__localeChainCache?.delete(t);
}
function $u(e, t, n) {
  Qu(e, n), e.fallbackContext && Qu(e.fallbackContext, n), e.localeFallbacker(e, n, t);
}
function ed(e, t) {
  return e !== t && e.split(`-`)[0] === t.split(`-`)[0];
}
function td(e, t) {
  let n = t.indexOf(e);
  if (n === -1) return false;
  for (let r = n + 1; r < t.length; r++) if (ed(e, t[r])) return true;
  return false;
}
function nd(e, t, n, r, i, a, o) {
  let {
      fallbackLocale: s,
      localeFallbacker: c,
      onWarn: l
    } = e,
    u = c(e, s, n);
  for (let n = 0; n < u.length; n++) {
    let a = u[n],
      s = (r[a] || {})[t];
    if (Z(s) && J(a)) return a;
    Zu(e, t, a, i, o);
  }
  return null;
}
function rd(e, t, n) {
  let r = `${e}__${t}`;
  return Z(n) && !bc(n) && (r = `${r}__${JSON.stringify(n)}`), r;
}
function id(e, t, n) {
  for (let r in n) {
    let n = `${t}__${r}`;
    for (let t of e.keys()) (t === n || t.startsWith(`${n}__`)) && e.delete(t);
  }
}
function ad(e, t, n, r) {
  let [, i, a, o] = e,
    s = n;
  return J(i) ? t.key = i : Z(i) && Object.keys(i).forEach(e => {
    r.includes(e) ? s[e] = i[e] : t[e] = i[e];
  }), J(a) ? t.locale = a : Z(a) && (s = a), Z(o) && (s = o), s;
}
var od = typeof Intl < `u`;
od && Intl.DateTimeFormat, od && Intl.NumberFormat;
function sd(e, ...t) {
  let {
      datetimeFormats: n,
      unresolving: r,
      onWarn: i
    } = e,
    {
      __datetimeFormatters: a
    } = e;
  if (!J(t[0]) && !vc(t[0]) && !U(t[0])) return ``;
  let [o, s, c, l] = ld(...t),
    u = Y(c.missingWarn) ? c.missingWarn : e.missingWarn,
    d = Y(c.fallbackWarn) ? c.fallbackWarn : e.fallbackWarn,
    f = !!c.part,
    p = mu(e, c);
  if (!J(o) || o === ``) {
    let e = new Intl.DateTimeFormat(p.replace(/!/g, ``), l);
    return f ? e.formatToParts(s) : e.format(s);
  }
  let m = nd(e, o, p, n, u, d, `datetime format`);
  if (!J(m)) return r ? -1 : o;
  let h = n[m][o],
    g = rd(m, o, l),
    _ = a.get(g);
  return _ || (_ = new Intl.DateTimeFormat(m, W({}, h, l)), a.set(g, _)), f ? _.formatToParts(s) : _.format(s);
}
var cd = [`localeMatcher`, `weekday`, `era`, `year`, `month`, `day`, `hour`, `minute`, `second`, `timeZoneName`, `formatMatcher`, `hour12`, `timeZone`, `dateStyle`, `timeStyle`, `calendar`, `dayPeriod`, `numberingSystem`, `hourCycle`, `fractionalSecondDigits`];
function ld(...e) {
  let [t] = e,
    n = G(),
    r = G(),
    i;
  if (J(t)) {
    let e = t.match(/(\d{4}-\d{2}-\d{2})(T|\s)?(.*)/);
    if (!e) throw pu(fu.INVALID_ISO_DATE_ARGUMENT);
    let n = e[3] ? e[3].trim().startsWith(`T`) ? `${e[1].trim()}${e[3].trim()}` : `${e[1].trim()}T${e[3].trim()}` : e[1].trim();
    i = new Date(n);
    try {
      i.toISOString();
    } catch {
      throw pu(fu.INVALID_ISO_DATE_ARGUMENT);
    }
  } else if (vc(t)) {
    if (isNaN(t.getTime())) throw pu(fu.INVALID_DATE_ARGUMENT);
    i = t;
  } else if (U(t)) i = t;else throw pu(fu.INVALID_ARGUMENT);
  let a = ad(e, n, r, cd);
  return [n.key || ``, i, n, a];
}
function ud(e, t, n) {
  id(e.__datetimeFormatters, t, n);
}
function dd(e, ...t) {
  let {
      numberFormats: n,
      unresolving: r,
      onWarn: i
    } = e,
    {
      __numberFormatters: a
    } = e;
  if (!U(t[0])) return ``;
  let [o, s, c, l] = pd(...t),
    u = Y(c.missingWarn) ? c.missingWarn : e.missingWarn,
    d = Y(c.fallbackWarn) ? c.fallbackWarn : e.fallbackWarn,
    f = !!c.part,
    p = mu(e, c);
  if (!J(o) || o === ``) {
    let e = new Intl.NumberFormat(p.replace(/!/g, ``), l);
    return f ? e.formatToParts(s) : e.format(s);
  }
  let m = nd(e, o, p, n, u, d, `number format`);
  if (!J(m)) return r ? -1 : o;
  let h = n[m][o],
    g = rd(m, o, l),
    _ = a.get(g);
  return _ || (_ = new Intl.NumberFormat(m, W({}, h, l)), a.set(g, _)), f ? _.formatToParts(s) : _.format(s);
}
var fd = [`localeMatcher`, `style`, `currency`, `currencyDisplay`, `currencySign`, `useGrouping`, `minimumIntegerDigits`, `minimumFractionDigits`, `maximumFractionDigits`, `minimumSignificantDigits`, `maximumSignificantDigits`, `compactDisplay`, `notation`, `signDisplay`, `unit`, `unitDisplay`, `roundingMode`, `roundingPriority`, `roundingIncrement`, `trailingZeroDisplay`];
function pd(...e) {
  let [t] = e,
    n = G(),
    r = G();
  if (!U(t)) throw pu(fu.INVALID_ARGUMENT);
  let i = t,
    a = ad(e, n, r, fd);
  return [n.key || ``, i, n, a];
}
function md(e, t, n) {
  id(e.__numberFormatters, t, n);
}
var hd = e => e,
  gd = e => ``,
  _d = `text`,
  vd = e => e.length === 0 ? `` : Ac(e),
  yd = kc;
function bd(e, t) {
  return e = Math.abs(e), t === 2 ? e === 1 ? 0 : 1 : Math.min(e, 2);
}
function xd(e) {
  let t = U(e.pluralIndex) ? e.pluralIndex : -1;
  return U(e.named?.count) ? e.named.count : U(e.named?.n) ? e.named.n : t;
}
function Sd(e = {}) {
  let t = e.locale,
    n = xd(e),
    r = J(t) && q(e.pluralRules?.[t]) ? e.pluralRules[t] : bd,
    i = r === bd ? undefined : bd,
    a = e => e[r(n, e.length, i)],
    o = e.list || [],
    s = e => o[e],
    c = e.named || G();
  U(e.pluralIndex) && (c.count ||= e.pluralIndex, c.n ||= e.pluralIndex);
  let l = e => c[e];
  function u(t, n) {
    return (q(e.messages) ? e.messages(t, !!n) : X(e.messages) ? e.messages[t] : false) || (e.parent ? e.parent.message(t) : gd);
  }
  let d = t => e.modifiers ? e.modifiers[t] : hd,
    f = q(e.processor?.normalize) ? e.processor.normalize : vd,
    p = q(e.processor?.interpolate) ? e.processor.interpolate : yd,
    m = {
      list: s,
      named: l,
      plural: a,
      linked: (e, ...t) => {
        let [n, r] = t,
          i = `text`,
          a = ``;
        t.length === 1 ? X(n) ? (a = n.modifier || a, i = n.type || i) : J(n) && (a = n || a) : t.length === 2 && (J(n) && (a = n || a), J(r) && (i = r || i));
        let o = u(e, true)(m),
          s = o === `` || o === undefined ? e : o,
          c = i === `vnode` && K(s) && a ? s[0] : s;
        return a ? d(a)(c, i) : c;
      },
      message: u,
      type: J(e.processor?.type) ? e.processor.type : _d,
      interpolate: p,
      normalize: f,
      values: W(G(), o, c)
    };
  return m;
}
var Cd = () => ``,
  wd = e => q(e);
function Td(e, ...t) {
  let {
      fallbackFormat: n,
      postTranslation: r,
      unresolving: i,
      messageCompiler: a,
      fallbackLocale: o,
      messages: s
    } = e,
    [c, l] = Ad(...t),
    u = Y(l.missingWarn) ? l.missingWarn : e.missingWarn,
    d = Y(l.fallbackWarn) ? l.fallbackWarn : e.fallbackWarn,
    f = Y(l.escapeParameter) ? l.escapeParameter : e.escapeParameter,
    p = !!l.resolvedMessage,
    m = J(l.default) || Y(l.default) ? Y(l.default) ? a ? c : () => c : l.default : n ? a ? c : () => c : null,
    h = n || m != null && (J(m) || q(m)),
    g = mu(e, l);
  f && Ed(l);
  let [_, v, y] = p ? [c, g, s[g] || G()] : Dd(e, c, g, o, d, u),
    b = _,
    x = c;
  if (!p && !(J(b) || Nl(b) || wd(b)) && h && (b = m, x = b), !p && (!(J(b) || Nl(b) || wd(b)) || !J(v))) return i ? -1 : c;
  let S = false,
    C = wd(b) ? b : Od(e, c, v, b, x, () => {
      S = true;
    });
  if (S) return b;
  let w = kd(e, C, Sd(Md(e, v, y, l))),
    T = r ? r(w, c) : w;
  if (f && J(T) && (T = qc(T)), __INTLIFY_PROD_DEVTOOLS__) {
    let t = {
      timestamp: Date.now(),
      key: J(c) ? c : wd(b) ? b.key : ``,
      locale: v || (wd(b) ? b.locale : ``),
      format: J(b) ? b : wd(b) ? b.source : ``,
      message: T
    };
    t.meta = W({}, e.__meta, Wu() || {}), uu(t);
  }
  return T;
}
function Ed(e) {
  K(e.list) ? e.list = e.list.map(e => J(e) ? Mc(e) : e) : X(e.named) && Object.keys(e.named).forEach(t => {
    J(e.named[t]) && (e.named[t] = Mc(e.named[t]));
  });
}
function Dd(e, t, n, r, i, a) {
  let {
      messages: o,
      onWarn: s,
      messageResolver: c,
      localeFallbacker: l
    } = e,
    u = l(e, r, n),
    d = G(),
    f,
    p = null;
  for (let n = 0; n < u.length && (f = u[n], d = o[f] || G(), (p = c(d, t)) === null && (p = d[t]), !(J(p) || Nl(p) || wd(p))); n++) if (!td(f, u)) {
    let n = Zu(e, t, f, a, `translate`);
    n !== t && (p = n);
  }
  return [p, f, d];
}
function Od(e, t, n, r, i, a) {
  let {
    messageCompiler: o,
    warnHtmlMessage: s
  } = e;
  if (wd(r)) {
    let e = r;
    return e.locale = e.locale || n, e.key = e.key || t, e;
  }
  if (o == null) {
    let e = () => r;
    return e.locale = n, e.key = t, e;
  }
  let c = o(r, jd(e, n, i, r, s, a));
  return c.locale = n, c.key = t, c.source = r, c;
}
function kd(e, t, n) {
  return t(n);
}
function Ad(...e) {
  let [t, n, r] = e,
    i = G();
  if (!J(t) && !U(t) && !wd(t) && !Nl(t)) throw pu(fu.INVALID_ARGUMENT);
  let a = U(t) ? String(t) : (wd(t), t);
  return U(n) ? i.plural = n : J(n) ? i.default = n : Z(n) && !bc(n) ? i.named = n : K(n) && (i.list = n), U(r) ? i.plural = r : J(r) ? i.default = r : Z(r) && W(i, r), [a, i];
}
function jd(e, t, n, r, i, a) {
  return {
    locale: t,
    key: n,
    warnHtmlMessage: i,
    onError: e => {
      throw a && a(e), e;
    },
    onCacheKey: e => gc(t, n, e)
  };
}
function Md(e, t, n, r) {
  let {
      modifiers: i,
      pluralRules: a,
      messageResolver: o,
      fallbackLocale: s,
      fallbackWarn: c,
      missingWarn: l,
      fallbackContext: u
    } = e,
    d = {
      locale: t,
      modifiers: i,
      pluralRules: a,
      messages: (r, i) => {
        let a = o(n, r);
        if (a == null && (u || i)) {
          let [n,, i] = Dd(u || e, r, t, s, c, l);
          a = n ?? o(i, r);
        }
        if (J(a) || Nl(a)) {
          let n = false,
            i = Od(e, r, t, a, r, () => {
              n = true;
            });
          return n ? Cd : i;
        }
        return wd(a) ? a : Cd;
      }
    };
  return e.processor && (d.processor = e.processor), r.list && (d.list = r.list), r.named && (d.named = r.named), U(r.plural) && (d.pluralIndex = r.plural), d;
}
Ml();
var Nd = `11.4.12`;
function Pd() {
  typeof __INTLIFY_PROD_DEVTOOLS__ != `boolean` && (Cc().__INTLIFY_PROD_DEVTOOLS__ = false);
}
var $ = {
  UNEXPECTED_RETURN_TYPE: 24,
  INVALID_ARGUMENT: 25,
  MUST_BE_CALL_SETUP_TOP: 26,
  NOT_INSTALLED: 27,
  REQUIRED_VALUE: 28,
  INVALID_VALUE: 29,
  CANNOT_SETUP_VUE_DEVTOOLS_PLUGIN: 30,
  NOT_INSTALLED_WITH_PROVIDE: 31,
  UNEXPECTED_ERROR: 32,
  NOT_COMPATIBLE_LEGACY_VUE_I18N: 33,
  NOT_AVAILABLE_COMPOSITION_IN_LEGACY: 34
};
function Fd(e, ...t) {
  return Qc(e, null, undefined);
}
$.UNEXPECTED_RETURN_TYPE, $.INVALID_ARGUMENT, $.MUST_BE_CALL_SETUP_TOP, $.NOT_INSTALLED, $.UNEXPECTED_ERROR, $.REQUIRED_VALUE, $.INVALID_VALUE, $.CANNOT_SETUP_VUE_DEVTOOLS_PLUGIN, $.NOT_INSTALLED_WITH_PROVIDE, $.NOT_COMPATIBLE_LEGACY_VUE_I18N, $.NOT_AVAILABLE_COMPOSITION_IN_LEGACY;
var Id = hc(`__translateVNode`),
  Ld = hc(`__datetimeParts`),
  Rd = hc(`__numberParts`),
  zd = hc(`__setPluralRules`);
hc(`__intlifyMeta`);
var Bd = hc(`__injectWithOption`),
  Vd = hc(`__dispose`),
  Hd = {
    FALLBACK_TO_ROOT: 10,
    NOT_FOUND_PARENT_SCOPE: 11,
    IGNORE_OBJ_FLATTEN: 12,
    DEPRECATE_LEGACY_MODE: 13,
    DEPRECATE_TRANSLATE_CUSTOME_DIRECTIVE: 14,
    DUPLICATE_USE_I18N_CALLING: 15
  };
Hd.FALLBACK_TO_ROOT, Hd.NOT_FOUND_PARENT_SCOPE, Hd.IGNORE_OBJ_FLATTEN, Hd.DEPRECATE_LEGACY_MODE, Hd.DEPRECATE_TRANSLATE_CUSTOME_DIRECTIVE, Hd.DUPLICATE_USE_I18N_CALLING;
var Ud = null;
{
  let e = Cc().__VUE_INSTANCE_SETTERS__;
  K(e) && e.push(e => {
    Ud = e;
  });
}
function Wd(e) {
  if (!X(e) || Nl(e)) return e;
  for (let t in e) if (Tc(e, t)) {
    if (!t.includes(`.`)) X(e[t]) && Wd(e[t]);else {
      let n = t.split(`.`),
        r = n.length - 1,
        i = e,
        a = false;
      for (let e = 0; e < r; e++) {
        if (n[e] === `__proto__`) throw Error(`unsafe key: ${n[e]}`);
        if (n[e] in i || (i[n[e]] = G()), !X(i[n[e]])) {
          a = true;
          break;
        }
        i = i[n[e]];
      }
      if (a || (Nl(i) ? Zl.includes(n[r]) || delete e[t] : (i[n[r]] = e[t], delete e[t])), !Nl(i)) {
        let e = i[n[r]];
        X(e) && Wd(e);
      }
    }
  }
  return e;
}
function Gd(e, t) {
  let {
      messages: n,
      __i18n: r,
      messageResolver: i,
      flatJson: a
    } = t,
    o = Z(n) ? n : K(r) ? G() : {
      [e]: G()
    };
  if (K(r) && r.forEach(e => {
    if (`locale` in e && `resource` in e) {
      let {
        locale: t,
        resource: n
      } = e;
      t ? (o[t] = o[t] || G(), Yc(n, o[t])) : Yc(n, o);
    } else J(e) && Yc(JSON.parse(e), o);
  }), i == null && a) for (let e in o) Tc(o, e) && Wd(o[e]);
  return o;
}
function Kd(e) {
  return e.type;
}
function qd(e, t, n) {
  let r = X(t.messages) ? t.messages : G();
  `__i18nGlobal` in n && (r = Gd(e.locale.value, {
    messages: r,
    __i18n: n.__i18nGlobal
  }));
  let i = Object.keys(r);
  if (i.length && i.forEach(t => {
    e.mergeLocaleMessage(t, r[t]);
  }), X(t.datetimeFormats)) {
    let n = Object.keys(t.datetimeFormats);
    n.length && n.forEach(n => {
      e.mergeDateTimeFormat(n, t.datetimeFormats[n]);
    });
  }
  if (X(t.numberFormats)) {
    let n = Object.keys(t.numberFormats);
    n.length && n.forEach(n => {
      e.mergeNumberFormat(n, t.numberFormats[n]);
    });
  }
}
function Jd(e) {
  return V(os, null, e, 0);
}
function Yd() {
  return Ud ?? Ls();
}
var Xd = () => [],
  Zd = () => false,
  Qd = 0;
function $d(e) {
  return (t, n, r, i) => e(n, r, Yd() || undefined, i);
}
function ef(e = {}) {
  let {
      __root: t,
      __injectWithOption: n
    } = e,
    r = t === undefined,
    i = e.flatJson,
    a = mc ? on : sn,
    o = !Y(e.inheritLocale) || e.inheritLocale,
    s = a(t && o ? t.locale.value : J(e.locale) ? e.locale : Pu),
    c = a(t && o ? t.fallbackLocale.value : J(e.fallbackLocale) || K(e.fallbackLocale) || Z(e.fallbackLocale) || e.fallbackLocale === false ? e.fallbackLocale : s.value),
    l = a(Gd(s.value, e)),
    u = a(Z(e.datetimeFormats) ? e.datetimeFormats : {
      [s.value]: {}
    }),
    d = a(Z(e.numberFormats) ? e.numberFormats : {
      [s.value]: {}
    }),
    f = t ? t.missingWarn : Y(e.missingWarn) || yc(e.missingWarn) ? e.missingWarn : true,
    p = t ? t.fallbackWarn : Y(e.fallbackWarn) || yc(e.fallbackWarn) ? e.fallbackWarn : true,
    m = t ? t.fallbackRoot : !Y(e.fallbackRoot) || e.fallbackRoot,
    h = !!e.fallbackFormat,
    g = q(e.missing) ? e.missing : null,
    _ = q(e.missing) ? $d(e.missing) : null,
    v = q(e.postTranslation) ? e.postTranslation : null,
    y = t ? t.warnHtmlMessage : !Y(e.warnHtmlMessage) || e.warnHtmlMessage,
    b = !!e.escapeParameter,
    x = t ? t.modifiers : Z(e.modifiers) ? e.modifiers : {},
    S = e.pluralRules || t && t.pluralRules,
    C;
  C = (() => {
    r && Ku(null);
    let t = {
      version: Nd,
      locale: s.value,
      fallbackLocale: c.value,
      messages: l.value,
      modifiers: x,
      pluralRules: S,
      missing: _ === null ? undefined : _,
      missingWarn: f,
      fallbackWarn: p,
      fallbackFormat: h,
      unresolving: true,
      postTranslation: v === null ? undefined : v,
      warnHtmlMessage: y,
      escapeParameter: b,
      messageResolver: e.messageResolver,
      messageCompiler: e.messageCompiler,
      __meta: {
        framework: `vue`
      }
    };
    t.datetimeFormats = u.value, t.numberFormats = d.value, t.__datetimeFormatters = Z(C) ? C.__datetimeFormatters : undefined, t.__numberFormatters = Z(C) ? C.__numberFormatters : undefined;
    let n = Yu(t);
    return r && Ku(n), n;
  })(), $u(C, s.value, c.value);
  function w() {
    return [s.value, c.value, l.value, u.value, d.value];
  }
  let T = rc({
    get: () => s.value,
    set: e => {
      C.locale = e, s.value = e;
    }
  });
  function E(e) {
    r || (C.fallbackContext = t ? qu() : undefined);
    try {
      $u(C, s.value, e);
    } finally {
      r || (C.fallbackContext = undefined);
    }
  }
  let D = rc({
      get: () => c.value,
      set: e => {
        c.value = e, C.fallbackLocale = c.value, E(c.value);
      }
    }),
    O = rc(() => l.value),
    k = rc(() => u.value),
    ee = rc(() => d.value);
  function te() {
    return q(v) ? v : null;
  }
  function ne(e) {
    v = e, C.postTranslation = e;
  }
  function re() {
    return g;
  }
  function A(e) {
    e !== null && (_ = $d(e)), g = e, C.missing = _;
  }
  let j = (e, n, i, a, o, s) => {
    w();
    let c;
    try {
      __INTLIFY_PROD_DEVTOOLS__, r || (C.fallbackContext = t ? qu() : undefined), c = e(C);
    } finally {
      __INTLIFY_PROD_DEVTOOLS__, r || (C.fallbackContext = undefined);
    }
    if (i !== `translate exists` && U(c) && c === -1 || i === `translate exists` && !c) {
      let [e, r] = n();
      return t && m ? a(t) : o(e);
    }
    if (s(c)) return c;
    throw Fd($.UNEXPECTED_RETURN_TYPE);
  };
  function ie(...e) {
    return j(t => Reflect.apply(Td, null, [t, ...e]), () => Ad(...e), `translate`, t => Reflect.apply(t.t, t, [...e]), e => e, e => J(e));
  }
  function ae(...e) {
    let [t, n, r] = e;
    if (r && !X(r)) throw Fd($.INVALID_ARGUMENT);
    return ie(t, n, W({
      resolvedMessage: true
    }, r || {}));
  }
  function oe(...e) {
    return j(t => Reflect.apply(sd, null, [t, ...e]), () => ld(...e), `datetime format`, t => Reflect.apply(t.d, t, [...e]), () => ``, e => J(e) || K(e));
  }
  function se(...e) {
    return j(t => Reflect.apply(dd, null, [t, ...e]), () => pd(...e), `number format`, t => Reflect.apply(t.n, t, [...e]), () => ``, e => J(e) || K(e));
  }
  function ce(e) {
    return e.map(e => J(e) || U(e) || Y(e) ? Jd(String(e)) : e);
  }
  let le = {
    normalize: ce,
    interpolate: e => e,
    type: `vnode`
  };
  function ue(...e) {
    return j(t => {
      let n,
        r = t;
      try {
        r.processor = le, n = Reflect.apply(Td, null, [r, ...e]);
      } finally {
        r.processor = null;
      }
      return n;
    }, () => Ad(...e), `translate`, t => t[Id](...e), e => [Jd(e)], e => K(e));
  }
  function de(...e) {
    return j(t => Reflect.apply(dd, null, [t, ...e]), () => pd(...e), `number format`, t => t[Rd](...e), Xd, e => J(e) || K(e));
  }
  function fe(...e) {
    return j(t => Reflect.apply(sd, null, [t, ...e]), () => ld(...e), `datetime format`, t => t[Ld](...e), Xd, e => J(e) || K(e));
  }
  function pe(e) {
    S = e, C.pluralRules = S;
  }
  function me(e, t) {
    return j(() => {
      if (!e) return false;
      let n = J(t) ? t : s.value,
        r = J(t) ? [n] : vu(C, c.value, n);
      for (let t = 0; t < r.length; t++) {
        let n = _e(r[t]),
          i = C.messageResolver(n, e);
        if (i === null && (i = n[e]), Nl(i) || wd(i) || J(i)) return true;
      }
      return false;
    }, () => [e], `translate exists`, n => Reflect.apply(n.te, n, [e, t]), Zd, e => Y(e));
  }
  function he(e) {
    let t = null,
      n = vu(C, c.value, s.value);
    for (let r = 0; r < n.length; r++) {
      let i = l.value[n[r]] || {},
        a = C.messageResolver(i, e);
      if (a != null) {
        t = a;
        break;
      }
    }
    return t;
  }
  function ge(e) {
    return he(e) ?? (t && t.tm(e) || {});
  }
  function _e(e) {
    return l.value[e] || {};
  }
  function ve(e, t) {
    if (i) {
      let n = {
        [e]: t
      };
      for (let e in n) Tc(n, e) && Wd(n[e]);
      t = n[e];
    }
    l.value[e] = t, C.messages = l.value;
  }
  function ye(e, t) {
    l.value[e] = l.value[e] || {};
    let n = {
      [e]: t
    };
    if (i) for (let e in n) Tc(n, e) && Wd(n[e]);
    t = n[e], Yc(t, l.value[e]), C.messages = l.value;
  }
  function be(e) {
    return u.value[e] || {};
  }
  function xe(e, t) {
    u.value[e] = t, C.datetimeFormats = u.value, ud(C, e, t);
  }
  function Se(e, t) {
    u.value[e] = W(u.value[e] || {}, t), C.datetimeFormats = u.value, ud(C, e, t);
  }
  function Ce(e) {
    return d.value[e] || {};
  }
  function we(e, t) {
    d.value[e] = t, C.numberFormats = d.value, md(C, e, t);
  }
  function Te(e, t) {
    d.value[e] = W(d.value[e] || {}, t), C.numberFormats = d.value, md(C, e, t);
  }
  Qd++, wr(c, () => E(c.value), {
    deep: true,
    flush: `sync`
  }), t && mc && (wr(t.locale, e => {
    o && (s.value = e, C.locale = e, $u(C, s.value, c.value));
  }), wr(t.fallbackLocale, e => {
    o && (c.value = e, C.fallbackLocale = c.value, $u(C, s.value, c.value));
  }));
  let M = {
    id: Qd,
    locale: T,
    fallbackLocale: D,
    get inheritLocale() {
      return o;
    },
    set inheritLocale(e) {
      o = e, e && t && (T.value = t.locale.value, D.value = t.fallbackLocale.value);
    },
    get availableLocales() {
      return Object.keys(l.value).sort();
    },
    messages: O,
    get modifiers() {
      return x;
    },
    get pluralRules() {
      return S || {};
    },
    get isGlobal() {
      return r;
    },
    get missingWarn() {
      return f;
    },
    set missingWarn(e) {
      f = e, C.missingWarn = f;
    },
    get fallbackWarn() {
      return p;
    },
    set fallbackWarn(e) {
      p = e, C.fallbackWarn = p;
    },
    get fallbackRoot() {
      return m;
    },
    set fallbackRoot(e) {
      m = e;
    },
    get fallbackFormat() {
      return h;
    },
    set fallbackFormat(e) {
      h = e, C.fallbackFormat = h;
    },
    get warnHtmlMessage() {
      return y;
    },
    set warnHtmlMessage(e) {
      y = e, C.warnHtmlMessage = e;
    },
    get escapeParameter() {
      return b;
    },
    set escapeParameter(e) {
      b = e, C.escapeParameter = e;
    },
    t: ie,
    getLocaleMessage: _e,
    setLocaleMessage: ve,
    mergeLocaleMessage: ye,
    getPostTranslationHandler: te,
    setPostTranslationHandler: ne,
    getMissingHandler: re,
    setMissingHandler: A,
    [zd]: pe
  };
  return M.datetimeFormats = k, M.numberFormats = ee, M.rt = ae, M.te = me, M.tm = ge, M.d = oe, M.n = se, M.getDateTimeFormat = be, M.setDateTimeFormat = xe, M.mergeDateTimeFormat = Se, M.getNumberFormat = Ce, M.setNumberFormat = we, M.mergeNumberFormat = Te, M[Bd] = n, M[Id] = ue, M[Ld] = fe, M[Rd] = de, M;
}
var tf = {
  tag: {
    type: [String, Object]
  },
  locale: {
    type: String
  },
  scope: {
    type: String,
    validator: e => e === `parent` || e === `global`,
    default: `parent`
  },
  i18n: {
    type: Object
  }
};
function nf({
  slots: e
}, t) {
  return t.length === 1 && t[0] === "default" ? (e.default ? e.default() : []).reduce((e, t) => [...e, ...(t.type === z ? t.children : [t])], []) : t.reduce((t, n) => {
    let r = e[n];
    return r && (t[n] = r()), t;
  }, G());
}
function rf() {
  return z;
}
var af = ri({
  name: `i18n-t`,
  props: W({
    keypath: {
      type: String,
      required: true
    },
    plural: {
      type: [Number, String],
      validator: e => U(e) || !isNaN(e)
    }
  }, tf),
  setup(e, t) {
    let {
        slots: n,
        attrs: r
      } = t,
      i = e.i18n || gf({
        useScope: e.scope,
        __useComponent: true
      });
    return () => {
      let a = () => {
          let r = Object.keys(n).filter(e => e[0] !== `_`),
            a = G();
          e.locale && (a.locale = e.locale), e.plural !== undefined && (a.plural = J(e.plural) ? +e.plural : e.plural);
          let o = nf(t, r);
          return i[Id](e.keypath, o, a);
        },
        o = W(G(), r),
        s = J(e.tag) || X(e.tag) ? e.tag : rf();
      return X(s) ? ic(s, o, {
        default: a
      }) : ic(s, o, a());
    };
  }
});
function of(e) {
  return K(e) && !J(e[0]);
}
function sf(e, t, n, r) {
  let {
    slots: i,
    attrs: a
  } = t;
  return () => {
    let t = () => {
        let t = {
            part: true
          },
          a = G();
        e.locale && (t.locale = e.locale), J(e.format) ? t.key = e.format : X(e.format) && (J(e.format.key) && (t.key = e.format.key), a = Object.keys(e.format).reduce((t, r) => n.includes(r) ? W(G(), t, {
          [r]: e.format[r]
        }) : t, G()));
        let o = r(e.value, t, a),
          s = [t.key];
        return K(o) ? s = o.map((e, t) => {
          let n = i[e.type],
            r = n ? n({
              [e.type]: e.value,
              index: t,
              parts: o
            }) : [e.value];
          return of(r) && (r[0].key = `${e.type}-${t}`), r;
        }) : J(o) && (s = [o]), s;
      },
      o = W(G(), a),
      s = J(e.tag) || X(e.tag) ? e.tag : rf();
    return X(s) ? ic(s, o, {
      default: t
    }) : ic(s, o, t());
  };
}
var cf = ri({
  name: `i18n-n`,
  props: W({
    value: {
      type: Number,
      required: true
    },
    format: {
      type: [String, Object]
    }
  }, tf),
  setup(e, t) {
    let n = e.i18n || gf({
      useScope: e.scope,
      __useComponent: true
    });
    return sf(e, t, fd, (...e) => n[Rd](...e));
  }
});
function lf(e, t) {
  let n = e;
  if (e.mode === `composition`) return n.__getInstance(t) || e.global;
  {
    let r = n.__getInstance(t);
    return r == null ? e.global.__composer : r.__composer;
  }
}
function uf(e) {
  let t = t => {
    let {
      instance: n,
      value: r
    } = t;
    if (!n || !n.$) throw Fd($.UNEXPECTED_ERROR);
    let i = lf(e, n.$),
      a = df(r);
    return [Reflect.apply(i.t, i, [...ff(a)]), i];
  };
  return {
    created: (e, n) => {
      let [r, i] = t(n);
      mc && (e.__i18nWatcher = wr(i.locale, () => {
        n.instance && n.instance.$forceUpdate();
      })), e.__composer = i, e.textContent = r;
    },
    unmounted: e => {
      mc && e.__i18nWatcher && (e.__i18nWatcher(), e.__i18nWatcher = undefined, delete e.__i18nWatcher), e.__composer && (e.__composer = undefined, delete e.__composer);
    },
    beforeUpdate: (e, {
      value: t
    }) => {
      if (e.__composer) {
        let n = e.__composer,
          r = df(t);
        e.textContent = Reflect.apply(n.t, n, [...ff(r)]);
      }
    },
    getSSRProps: e => {
      let [n] = t(e);
      return {
        textContent: n
      };
    }
  };
}
function df(e) {
  if (J(e)) return {
    path: e
  };
  if (Z(e)) {
    if (!(`path` in e)) throw Fd($.REQUIRED_VALUE, `path`);
    return e;
  }
  throw Fd($.INVALID_VALUE);
}
function ff(e) {
  let {
      path: t,
      locale: n,
      args: r,
      choice: i,
      plural: a
    } = e,
    o = {},
    s = r || {};
  return J(n) && (o.locale = n), U(i) && (o.plural = i), U(a) && (o.plural = a), [t, s, o];
}
function pf(e, t, ...n) {
  let r = Z(n[0]) ? n[0] : {};
  (!Y(r.globalInstall) || r.globalInstall) && ([af.name, `I18nT`].forEach(t => e.component(t, af)), [cf.name, `I18nN`].forEach(t => e.component(t, cf)), [Df.name, `I18nD`].forEach(t => e.component(t, Df))), e.directive(`t`, uf(t));
}
var mf = hc(`global-vue-i18n`);
function hf(e = {}) {
  let t = !Y(e.globalInjection) || e.globalInjection,
    n = new Map(),
    [r, i] = _f(e, false),
    a = hc(``);
  function o(e) {
    return n.get(e) || null;
  }
  function s(e, t) {
    n.set(e, t);
  }
  function c(e) {
    n.delete(e);
  }
  let l = {
    get mode() {
      return `composition`;
    },
    async install(e, ...n) {
      if (e.__VUE_I18N_SYMBOL__ = a, e.provide(e.__VUE_I18N_SYMBOL__, l), Z(n[0])) {
        let e = n[0];
        l.__composerExtend = e.__composerExtend, l.__vueI18nExtend = e.__vueI18nExtend;
      }
      let r = null;
      t && (r = Ef(e, l.global)), pf(e, l, ...n);
      let i = e.unmount;
      e.unmount = () => {
        r && r(), l.dispose(), i();
      };
    },
    get global() {
      return i;
    },
    dispose() {
      r.stop();
    },
    __instances: n,
    __getInstance: o,
    __setInstance: s,
    __deleteInstance: c
  };
  return l;
}
function gf(e = {}) {
  let t = Yd();
  if (t == null) throw Fd($.MUST_BE_CALL_SETUP_TOP);
  if (!t.isCE && t.appContext.app != null && !t.appContext.app.__VUE_I18N_SYMBOL__) throw Fd($.NOT_INSTALLED);
  let n = vf(t),
    r = bf(n),
    i = Kd(t),
    a = yf(e, i);
  if (a === `global`) return qd(r, e, i), r;
  if (a === `parent`) {
    let i = xf(n, t, e.__useComponent);
    return i ??= r, i;
  }
  if (a === `isolated`) {
    if (n.mode !== `composition`) throw Fd($.NOT_AVAILABLE_COMPOSITION_IN_LEGACY);
    let i = n,
      a = W({}, e);
    a.__root = xf(n, t) || r;
    let o = ef(a);
    return i.__composerExtend && (o[Vd] = i.__composerExtend(o)), Me() && Ne(() => {
      let e = o[Vd];
      e && (e(), delete o[Vd]);
    }), o;
  }
  let o = n,
    s = o.__getInstance(t);
  if (s == null) {
    let n = W({}, e);
    `__i18n` in i && (n.__i18n = i.__i18n), r && (n.__root = r), s = ef(n), o.__composerExtend && (s[Vd] = o.__composerExtend(s)), Cf(o, t, s), o.__setInstance(t, s);
  }
  return s;
}
function _f(e, t) {
  let n = je(),
    r = n.run(() => ef(e));
  if (r == null) throw Fd($.UNEXPECTED_ERROR);
  return [n, r];
}
function vf(e) {
  let t = _r(e.isCE ? mf : e.appContext.app.__VUE_I18N_SYMBOL__);
  if (!t) throw Fd(e.isCE ? $.NOT_INSTALLED_WITH_PROVIDE : $.UNEXPECTED_ERROR);
  return t;
}
function yf(e, t) {
  return bc(e) ? `__i18n` in t ? `local` : `global` : e.useScope ? e.useScope : `local`;
}
function bf(e) {
  return e.mode === `composition` ? e.global : e.global.__composer;
}
function xf(e, t, n = false) {
  let r = null,
    i = t.root,
    a = Sf(t, n);
  for (; a != null;) {
    let t = e;
    if (e.mode === `composition` && (r = t.__getInstance(a)), r != null || i === a) break;
    a = a.parent;
  }
  return r;
}
function Sf(e, t = false) {
  return e == null ? null : t && e.vnode.ctx || e.parent;
}
function Cf(e, t, n) {
  Xi(() => {}, t), ea(() => {
    let r = n;
    e.__deleteInstance(t);
    let i = r[Vd];
    i && (i(), delete r[Vd]);
  }, t);
}
var wf = [`locale`, `fallbackLocale`, `availableLocales`],
  Tf = [`t`, `rt`, `d`, `n`, `tm`, `te`];
function Ef(e, t) {
  let n = Object.create(null);
  return wf.forEach(e => {
    let r = Object.getOwnPropertyDescriptor(t, e);
    if (!r) throw Fd($.UNEXPECTED_ERROR);
    let i = I(r.value) ? {
      get() {
        return r.value.value;
      },
      set(e) {
        r.value.value = e;
      }
    } : {
      get() {
        return r.get && r.get();
      }
    };
    Object.defineProperty(n, e, i);
  }), e.config.globalProperties.$i18n = n, Tf.forEach(n => {
    let r = Object.getOwnPropertyDescriptor(t, n);
    if (!r || !r.value) throw Fd($.UNEXPECTED_ERROR);
    Object.defineProperty(e.config.globalProperties, `$${n}`, r);
  }), () => {
    delete e.config.globalProperties.$i18n, Tf.forEach(t => {
      delete e.config.globalProperties[`$${t}`];
    });
  };
}
var Df = ri({
  name: `i18n-d`,
  props: W({
    value: {
      type: [Number, Date],
      required: true
    },
    format: {
      type: [String, Object]
    }
  }, tf),
  setup(e, t) {
    let n = e.i18n || gf({
      useScope: e.scope,
      __useComponent: true
    });
    return sf(e, t, cd, (...e) => n[Ld](...e));
  }
});
if (Pd(), Ru(ou), Bu(ju), Hu(vu), __INTLIFY_PROD_DEVTOOLS__) {
  let e = Cc();
  e.__INTLIFY__ = true, cu(e.__INTLIFY_DEVTOOLS_GLOBAL_HOOK__);
}
export { _s as $, he as $n, fr as $t, Ii as A, dn as An, ti as At, ni as B, d as Bn, oi as Bt, Lo as C, sn as Cn, ha as Ct, Ds as D, _n as Dn, Qr as Dt, ma as E, bn as En, la as Et, Ea as F, s as Fn, ja as Ft, ki as G, w as Gn, xr as Gt, ic as H, o as Hn, cc as Ht, Ca as I, u as In, ii as It, ji as J, _ as Jn, La as Jt, Ni as K, p as Kn, Sr as Kt, Da as L, te as Ln, ro as Lt, wa as M, r as Mn, pc as Mt, Ta as N, k as Nn, _a as Nt, Es as O, fn as On, ps as Ot, Oa as P, ne as Pn, ys as Pt, Xs as Q, ae as Qn, oc as Qt, dc as R, ye as Rn, br as Rt, hs as S, Xt as Sn, pa as St, Io as T, F as Tn, ua as Tt, Vn as U, y as Un, lc as Ut, ws as V, g as Vn, Wr as Vt, vr as W, a as Wn, wr as Wt, _r as X, we as Xn, ka as Xt, ac as Y, v as Yn, pr as Yt, sc as Z, Te as Zn, mr as Zt, Ts as _, mn as _n, dr as _t, B as a, Je as an, oe as ar, Yi as at, gs as b, on as bn, er as bt, z as c, kn as cn, Hi as ct, Yo as d, $t as dn, ra as dt, Ae as en, ke as er, Pa as et, zr as f, I as fn, na as ft, zn as g, An as gn, us as gt, Bn as h, Ne as hn, Qi as ht, Kr as i, gn as in, re as ir, Vi as it, ri as j, t as jn, yr as jt, V as k, un as kn, fc as kt, zi as l, tn as ln, ia as lt, In as m, nn as mn, ea as mt, gf as n, wn as nn, ue as nr, Ms as nt, Ln as o, je as on, $i as ot, os as p, en as pn, ta as pt, Mi as q, ve as qn, Cr as qt, Xr as r, Tn as rn, Ee as rr, Xn as rt, uc as s, Me as sn, Zi as st, hf as t, Fe as tn, ge as tr, Fa as tt, ss as u, Qt as un, Xi as ut, rc as v, qt as vn, gr as vt, Ia as w, Ye as wn, sa as wt, Os as x, Jt as xn, Ys as xt, Ss as y, Yt as yn, ur as yt, Ls as z, j as zn, Aa as zt };