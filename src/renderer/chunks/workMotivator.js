import { $n as e, An as t, Cn as n, O as r, S as i, St as a, Wt as o, b as s, bn as c, c as l, gt as u, j as d, k as f, n as ee, nr as p, ot as te, rr as m, rt as ne, t as h, ut as re, v as g, x as _, y as v } from "./vue-i18n.runtime.js";
import { n as ie, o as y, t as b } from "../i18n/en-US-player.js";
import { n as ae, r as x, t as oe } from "../ui/icons/lucide-icons.js";
import { D as se, E as ce, O as le, l as ue, s as de } from "./work-motivator.js";
import { t as fe } from "./_plugin-vue_export-helper.js";
import { _ as pe, a as S, c as me, d as he, f as ge, g as _e, h as ve, i as ye, l as be, m as xe, n as Se, o as C, p as Ce, r as we, s as Te, t as Ee, u as De, v as Oe } from "./format-number.js";
var ke = x(`chevrons-down-up`, [[`path`, {
    d: `m7 20 5-5 5 5`,
    key: `13a0gw`
  }], [`path`, {
    d: `m7 4 5 5 5-5`,
    key: `1kwcof`
  }]]),
  Ae = x(`chevrons-up-down`, [[`path`, {
    d: `m7 15 5 5 5-5`,
    key: `1hf1tw`
  }], [`path`, {
    d: `m7 9 5-5 5 5`,
    key: `sgt6xg`
  }]]),
  w = 320,
  T = w - 32,
  E = 2,
  D = 9;
function O(e) {
  return Array.from(e).length > 1 ? 34 : 20;
}
function je(e, t, n) {
  let r = O(n),
    i = e + t,
    a = T - 20 - r - (t ? D : 0),
    o = Math.min(25, a / i),
    s = o - E,
    c = (T - (r + o * i + (t ? D : 0))) / 2,
    l = c;
  c += r;
  let emptyItems = [];
  for (let n = 0; n < e; n++) emptyItems.push({
    x: c + E / 2,
    power: t + e - 1 - n,
    decimal: false
  }), c += o;
  let d = null;
  t && (d = c, c += D);
  for (let e = 0; e < t; e++) emptyItems.push({
    x: c + E / 2,
    power: t - 1 - e,
    decimal: true
  }), c += o;
  return {
    cellWidth: s,
    cells: emptyItems,
    currencyX: l,
    currencyWidth: r,
    dotX: d
  };
}
var k = .5,
  A = 380,
  j = `cubic-bezier(0.25, 0.9, 0.3, 1.15)`,
  Me = class {
    reels = [];
    windowHeight;
    baseUnits = 0;
    baseTime = 0;
    unitsPerMs = 0;
    carryTimer = null;
    constructor(constructor) {
      this.windowHeight = constructor;
    }
    attach(items, attach) {
      this.stopAll(), this.reels = items.map(item => ({
        ...item,
        index: 0,
        continuous: false,
        animation: null
      }));
      for (let e of this.reels) e.index = this.digitAt(attach, e.power), this.place(e, e.index);
    }
    sync(e, t, n) {
      this.clearCarryTimer(), this.baseUnits = Math.max(0, e), this.baseTime = performance.now(), this.unitsPerMs = Math.max(0, t);
      for (let e of this.reels) {
        let t = this.unitsPerMs * 1e3 / 10 ** e.power;
        if (t >= k) this.startContinuous(e, t);else {
          let t = this.digitAt(this.baseUnits, e.power);
          e.continuous ? this.stopContinuous(e, t) : this.stepTo(e, t, n);
        }
      }
      this.scheduleCarry();
    }
    dispose() {
      this.stopAll(), this.reels = [];
    }
    digitAt(digit, digitValue) {
      return Math.floor(digit / 10 ** digitValue + 1e-9) % 10;
    }
    offset(offset) {
      return `translateY(${this.windowHeight / 2 - (offset + .5) * 34}px)`;
    }
    place(e, t) {
      e.strip.style.transform = this.offset(t);
    }
    startContinuous(continuous, continuousValue) {
      continuous.animation?.cancel(), continuous.continuous = true;
      let n = this.baseUnits / 10 ** continuous.power % 10;
      continuous.animation = continuous.strip.animate([{
        transform: this.offset(n)
      }, {
        transform: this.offset(n + 10)
      }], {
        duration: 1e4 / continuousValue,
        iterations: 1 / 0,
        easing: `linear`
      });
    }
    stopContinuous(continuous, continuousValue) {
      continuous.continuous = false, continuous.animation?.cancel(), continuous.animation = null, continuous.index = continuousValue, this.place(continuous, continuousValue);
    }
    stepTo(step, stepValue, stepInput) {
      if (stepValue === step.index && !step.animation) return;
      step.animation?.cancel(), step.animation = null;
      let r = step.index;
      if (step.index = stepValue, !stepInput) {
        this.place(step, stepValue);
        return;
      }
      let i = stepValue >= r ? stepValue : stepValue + 10;
      this.place(step, stepValue);
      let a = step.strip.animate([{
        transform: this.offset(r)
      }, {
        transform: this.offset(i)
      }], {
        duration: A,
        easing: j
      });
      step.animation = a, a.onfinish = () => {
        step.animation === a && (step.animation = null);
      };
    }
    scheduleCarry() {
      if (this.unitsPerMs <= 0) return;
      let filtered = this.reels.filter(item => !item.continuous);
      if (!filtered.length) return;
      let t = 10 ** Math.min(...filtered.map(item => item.power)),
        n = this.baseUnits + this.unitsPerMs * (performance.now() - this.baseTime),
        r = (Math.floor(n / t + 1e-9) + 1) * t,
        i = Math.max(0, (r - this.baseUnits) / this.unitsPerMs - (performance.now() - this.baseTime));
      this.carryTimer = window.setTimeout(() => {
        this.carryTimer = null;
        for (let t of filtered) this.stepTo(t, this.digitAt(r, t.power), true);
        this.scheduleCarry();
      }, i);
    }
    clearCarryTimer() {
      this.carryTimer !== null && (window.clearTimeout(this.carryTimer), this.carryTimer = null);
    }
    stopAll() {
      this.clearCarryTimer();
      for (let e of this.reels) e.animation?.cancel(), e.animation = null, e.continuous = false;
    }
  },
  Ne = {
    class: `wm-row wm-header wm-expanded-only`
  },
  Pe = {
    class: `wm-date`
  },
  Fe = {
    class: `wm-clock wm-hover-swap`
  },
  Ie = {
    class: `wm-row wm-status wm-expanded-only`
  },
  Le = {
    class: `wm-status-label`
  },
  Re = {
    class: `wm-status-countdown`
  },
  ze = {
    class: `wm-row wm-label-row`
  },
  Be = {
    class: `wm-label`
  },
  Ve = {
    class: `wm-hourly`
  },
  He = [`title`],
  Ue = [`title`],
  We = {
    class: `wm-section wm-wish wm-expanded-only`
  },
  Ge = {
    class: `wm-section-head`
  },
  Ke = {
    class: `wm-bar`
  },
  qe = {
    class: `wm-section wm-hours wm-expanded-only`
  },
  Je = {
    class: `wm-section-head`
  },
  Ye = {
    class: `wm-bar`
  },
  Xe = {
    class: `wm-row wm-footer wm-expanded-only`
  },
  Ze = [`title`],
  Qe = [`title`],
  $e = [`title`],
  et = [`title`],
  tt = [`title`],
  nt = 1400,
  rt = 4,
  it = 4,
  at = 3e5,
  ot = 45,
  M = fe(d({
    __name: `WorkMotivatorApp`,
    setup(d) {
      let workMotivatorAPI = window.workMotivatorAPI,
        {
          t: ie,
          locale: y
        } = ee(),
        handler = (e, t = {}) => ie(`toolboxNative.workMotivator${e}`, t),
        x = Array.from({
          length: 64
        }, (e, t) => t % 10),
        fe = [{
          turns: 1,
          durationMs: 1100,
          ringCount: 0,
          pop: false,
          shake: false,
          text: `none`,
          sparks: 0
        }, {
          turns: 2,
          durationMs: 1300,
          ringCount: 1,
          pop: false,
          shake: false,
          text: `none`,
          sparks: 0
        }, {
          turns: 2,
          durationMs: 1400,
          ringCount: 1,
          pop: true,
          shake: false,
          text: `burst`,
          sparks: 0
        }, {
          turns: 3,
          durationMs: 1600,
          ringCount: 2,
          pop: true,
          shake: false,
          text: `burst`,
          sparks: 8
        }, {
          turns: 3,
          durationMs: 1800,
          ringCount: 2,
          pop: true,
          shake: true,
          text: `burst`,
          sparks: 12
        }, {
          turns: 4,
          durationMs: 2100,
          ringCount: 3,
          pop: true,
          shake: true,
          text: `milestone`,
          sparks: 18
        }],
        E = c(null),
        D = c(Date.now()),
        O = n(null),
        k = c(false),
        A = c(false),
        j = c(false),
        M = n(null),
        N = c(null),
        st = c(null),
        P = c(null),
        matchMedia = window.matchMedia(`(prefers-reduced-motion: reduce)`),
        I = new Me(50),
        L = false,
        R = null,
        z = null,
        B = ``,
        V = -1,
        ct = 0,
        lt = 0,
        ut = null,
        pointerId = null,
        U = 0,
        dt = 0,
        W = false,
        G = g(() => E.value?.decimals ?? 3),
        ft = g(() => {
          if (!E.value) return 3;
          let e = Oe(E.value, new Date());
          return Math.min(7, Math.max(3, String(Math.floor(e)).length));
        }),
        K = g(() => je(ft.value, G.value, E.value?.currency ?? `¥`)),
        pt = g(() => `${ft.value}-${G.value}-${K.value.cellWidth.toFixed(2)}`),
        mt = g(() => `${Math.min(26, K.value.cellWidth * 1.27).toFixed(1)}px`),
        q = g(() => !!E.value?.amountHidden),
        ht = g(() => !!(O.value && Te(O.value.status))),
        gt = g(() => E.value && O.value ? pe(E.value, O.value) : 0),
        J = g(() => Math.max(0, gt.value * 10 ** G.value)),
        _t = g(() => ye(handler, E.value?.earnedRange ?? `today`)),
        vt = g(() => !E.value || !O.value ? `` : S(E.value, gt.value, y.value, G.value)),
        yt = g(() => !E.value || !O.value ? `` : handler(`HourlyRate`, {
          amount: q.value ? `••••` : S(E.value, O.value.hourlyRate, y.value)
        })),
        bt = g(() => O.value ? De(handler, O.value.status) : ``),
        xt = g(() => O.value ? be(handler, O.value) : ``),
        St = g(() => we(handler, new Date(D.value), y.value)),
        Ct = g(() => Ee(new Date(D.value))),
        Y = g(() => {
          if (!E.value || !O.value) return null;
          let e = ge(E.value);
          return e ? ve(E.value, e, O.value) : null;
        }),
        wt = g(() => Y.value ? he(handler, Y.value) : ``),
        X = g(() => {
          let e = O.value;
          return !e || e.scheduledMs <= 0 ? 0 : e.workedMs / e.scheduledMs;
        }),
        Tt = g(() => {
          let e = O.value;
          return e ? handler(`WorkHoursValue`, {
            worked: C(e.workedMs),
            total: C(e.scheduledMs)
          }) : ``;
        }),
        Et = g(() => E.value ? Se(handler, Ce(E.value, D.value)) : ``),
        Dt = g(() => {
          if (E.value && N.value && !q.value) return handler(`PeriodEarned`, {
            month: S(E.value, N.value.month, y.value),
            year: S(E.value, N.value.year, y.value)
          });
        });
      function Ot(e) {
        return e > G.value && Math.floor(J.value) < 10 ** e;
      }
      let kt = g(() => ({
          opacity: String((E.value?.opacity ?? 100) / 100),
          perspective: `${nt}px`,
          zoom: String(de[E.value?.size ?? `medium`])
        })),
        At = {
          left: `14px`,
          top: `14px`,
          width: `${w}px`
        },
        jt = g(() => E.value?.expanded ? 92 : 34),
        Mt = g(() => {
          let e = M.value?.setting;
          return {
            left: `16px`,
            width: `${T}px`,
            height: `50px`,
            ...(e ? {
              "--wm-celebrate-distance": `${-e.turns * 10 * 34}px`,
              "--wm-celebrate-duration": `${e.durationMs}ms`,
              "--wm-ring-count": String(e.ringCount || 1)
            } : {})
          };
        }),
        Nt = g(() => ({
          left: `${16 + T / 2}px`,
          top: `${jt.value + 25}px`
        }));
      function Pt(options) {
        options && (E.value = options.config, options.language && options.language !== y.value && (y.value = options.language), Z());
      }
      function Z() {
        if (!E.value) return;
        let e = Date.now();
        D.value = e, O.value = xe(E.value, e), k.value && It(), Q(false), Ft();
      }
      function Ft() {
        let e = O.value,
          t = E.value;
        if (!e || !t) return;
        let celebrateAmount = t.celebrateAmount,
          r = Math.floor(e.earnedToday / celebrateAmount + 1e-9);
        V >= 0 && ct === celebrateAmount && r > V && t.celebrate && !q.value && !matchMedia.matches && zt(r), V = r, ct = celebrateAmount;
      }
      function It() {
        let e = O.value;
        if (!E.value || !e) return;
        let t = e.day;
        N.value = {
          month: _e(E.value, ue(new Date(t.getFullYear(), t.getMonth(), 1)), e),
          year: _e(E.value, ue(new Date(t.getFullYear(), 0, 1)), e)
        };
      }
      function Lt() {
        let e = O.value;
        return !e || q.value || matchMedia.matches ? 0 : e.earningPerMs * 10 ** G.value;
      }
      function Q(e) {
        if (!L) return;
        let t = Lt(),
          n = J.value,
          r = t > 0 ? `run|${t}|${Math.floor(Date.now() / at)}` : `idle|${Math.floor(n)}`;
        if (!e && r === B) return;
        let i = B !== `` && !matchMedia.matches;
        B = r, I.sync(n, t, i);
      }
      async function Rt() {
        await ne();
        let e = Array.from(P.value?.querySelectorAll(`.wm-reel-strip`) ?? []),
          cells = K.value.cells;
        e.length === cells.length && (I.attach(cells.map((item, n) => ({
          strip: e[n],
          power: item.power
        })), J.value), L = true, B = ``, Q(true));
      }
      function zt(e) {
        let t = E.value;
        if (!t) return;
        let n = Math.min(6, e),
          r = fe[n - 1],
          i = Number.isInteger(t.celebrateAmount) ? 0 : 2,
          a = r.text === `burst` ? handler(`CelebrateBurst`, {
            amount: S(t, t.celebrateAmount, y.value, i)
          }) : r.text === `milestone` ? handler(`CelebrateMilestone`, {
            amount: S(t, t.celebrateAmount * e, y.value, i)
          }) : ``,
          o = Array.from({
            length: r.sparks
          }, (e, t) => {
            let n = t / r.sparks * Math.PI * 2 + Math.random() * .5,
              i = 70 + Math.random() * 70;
            return {
              id: t,
              dx: Math.cos(n) * i,
              dy: Math.sin(n) * i * .45,
              delay: Math.random() * 160,
              size: 3 + Math.random() * 3,
              accent: t % 3 != 2
            };
          });
        M.value = null, z !== null && window.clearTimeout(z), requestAnimationFrame(() => requestAnimationFrame(() => {
          M.value = {
            id: ++lt,
            level: n,
            setting: r,
            text: a,
            sparks: o
          }, z = window.setTimeout(() => {
            z = null, M.value = null;
          }, r.durationMs + K.value.cells.length * ot + 400);
        }));
      }
      function Bt() {
        R !== null && window.clearTimeout(R), R = window.setTimeout(() => {
          R = null, Z(), Bt();
        }, 1e3 - Date.now() % 1e3 + 5);
      }
      function Vt(event) {
        let t = P.value,
          n = st.value;
        if (!t || !n || matchMedia.matches || A.value) return;
        let boundingClientRect = n.getBoundingClientRect(),
          i = Math.max(.01, boundingClientRect.width / (w + 28)),
          a = Math.max(1, t.getBoundingClientRect().height / i),
          o = Math.max(-1, Math.min(1, ((event.clientX - boundingClientRect.left) / i - 14) / w * 2 - 1)),
          s = Math.max(-1, Math.min(1, ((event.clientY - boundingClientRect.top) / i - 14) / a * 2 - 1)),
          c = w / Math.max(w, a * 2);
        t.style.transform = `rotateX(${(-s * rt * c).toFixed(2)}deg) rotateY(${(o * rt).toFixed(2)}deg)`;
      }
      function Ht() {
        P.value && (P.value.style.transform = ``);
      }
      function Ut() {
        k.value = true, It();
      }
      function Wt() {
        k.value = false, Ht();
      }
      function Gt(event) {
        event.button === 0 && workMotivatorAPI && (event.target?.closest(`[data-no-drag]`) || (pointerId = event.pointerId, U = event.screenX, dt = event.screenY, W = false, event.currentTarget?.setPointerCapture?.(event.pointerId), workMotivatorAPI.dragStart({
          screenX: event.screenX,
          screenY: event.screenY
        })));
      }
      function Kt(e) {
        if (pointerId === e.pointerId) {
          if (!(e.buttons & 1)) {
            $(e);
            return;
          }
          !W && Math.hypot(e.screenX - U, e.screenY - dt) >= it && (W = true, A.value = !E.value?.locked, Ht()), W && workMotivatorAPI?.dragMove({
            screenX: e.screenX,
            screenY: e.screenY
          });
        }
      }
      function $(event) {
        if (pointerId === null || event && pointerId !== event.pointerId) return;
        let t = pointerId;
        pointerId = null, A.value = false, workMotivatorAPI?.dragEnd(), event && event.currentTarget?.releasePointerCapture?.(t);
      }
      function qt(e) {
        Vt(e), Kt(e);
      }
      function Jt() {
        E.value && workMotivatorAPI?.setExpanded({
          expanded: !E.value.expanded
        });
      }
      function Yt(event) {
        event.target?.closest(`[data-no-drag]`) || Jt();
      }
      function Xt(event) {
        event.preventDefault(), $(null), workMotivatorAPI?.showMenu({
          earnedText: q.value ? `••••` : vt.value
        });
      }
      function Zt() {
        E.value && workMotivatorAPI?.update({
          alwaysOnTop: !E.value.alwaysOnTop
        });
      }
      function Qt() {
        E.value && workMotivatorAPI?.update({
          amountHidden: !E.value.amountHidden
        });
      }
      function $t() {
        document.visibilityState === `visible` && (Z(), Q(true));
      }
      function en() {
        $(null);
      }
      return o(pt, () => {
        Rt();
      }), o(q, () => Q(true)), o(() => E.value?.earnedRange, () => Q(true)), re(async () => {
        document.documentElement.classList.add(`work-motivator-renderer`), document.body.classList.add(`work-motivator-renderer`), ut = workMotivatorAPI?.onWindowState(Pt) ?? null;
        try {
          let e = await workMotivatorAPI?.getWindowState();
          e?.ok && Pt(e.data);
        } catch {}
        await Rt(), Bt(), requestAnimationFrame(() => {
          j.value = true;
        }), window.addEventListener(`blur`, en), document.addEventListener(`visibilitychange`, $t);
      }), te(() => {
        ut?.(), R !== null && window.clearTimeout(R), z !== null && window.clearTimeout(z), window.removeEventListener(`blur`, en), document.removeEventListener(`visibilitychange`, $t), I.dispose();
      }), (n, o) => (u(), i(`div`, {
        ref_key: `rootRef`,
        ref: st,
        class: e([`wm-root`, [`finish-${E.value?.finish ?? `graphite`}`, {
          "is-hovering": k.value,
          "is-active": ht.value,
          "is-locked": E.value?.locked
        }]]),
        style: p(kt.value)
      }, [E.value ? (u(), i(`div`, {
        key: 0,
        ref_key: `faceRef`,
        ref: P,
        class: e([`wm-face`, {
          "is-expanded": E.value.expanded,
          "is-ready": j.value,
          "is-dragging": A.value
        }]),
        style: At,
        onPointerenter: Ut,
        onPointerleave: Wt,
        onPointermove: qt,
        onPointerdown: Gt,
        onPointerup: $,
        onPointercancel: o[3] ||= e => $(null),
        onLostpointercapture: o[4] ||= e => $(null),
        onDblclick: Yt,
        onContextmenu: Xt
      }, [v(`div`, Ne, [v(`span`, Pe, m(St.value), 1), v(`span`, Fe, m(Ct.value), 1)]), v(`div`, Ie, [v(`span`, Le, [o[5] ||= v(`i`, {
        class: `wm-led`
      }, null, -1), r(m(bt.value), 1)]), v(`span`, Re, m(xt.value), 1)]), v(`div`, ze, [v(`span`, Be, [o[6] ||= v(`i`, {
        class: `wm-led wm-label-led`
      }, null, -1), r(m(_t.value), 1)]), v(`span`, Ve, m(yt.value), 1)]), v(`div`, {
        class: e([`wm-window`, M.value ? {
          "is-celebrating": true,
          "has-ring": M.value.setting.ringCount > 0,
          "has-pop": M.value.setting.pop && !M.value.setting.shake,
          "has-shake": M.value.setting.shake
        } : null]),
        style: p(Mt.value),
        title: Dt.value
      }, [v(`span`, {
        class: e([`wm-currency`, {
          "is-covered": q.value
        }]),
        style: p({
          left: `${K.value.currencyX}px`,
          width: `${K.value.currencyWidth}px`
        })
      }, m(E.value.currency), 7), (u(true), i(l, null, a(K.value.cells, (n, r) => (u(), i(`span`, {
        key: `${pt.value}-${n.power}`,
        class: e([`wm-reel`, {
          "is-decimal": n.decimal,
          "is-leading": Ot(n.power)
        }]),
        style: p({
          left: `${n.x}px`,
          width: `${K.value.cellWidth}px`
        })
      }, [v(`span`, {
        class: `wm-reel-spin`,
        style: p({
          "--wm-reel-index": r
        })
      }, [v(`span`, {
        class: `wm-reel-strip`,
        style: p({
          fontSize: mt.value
        })
      }, [(u(true), i(l, null, a(t(x), (e, n) => (u(), i(`span`, {
        key: n,
        style: p({
          height: `${t(34)}px`
        })
      }, m(e), 5))), 128))], 4)], 4)], 6))), 128)), K.value.dotX === null ? _(``, true) : (u(), i(`i`, {
        key: 0,
        class: e([`wm-dot`, {
          "is-covered": q.value
        }]),
        style: p({
          left: `${K.value.dotX}px`
        })
      }, null, 6)), v(`div`, {
        class: e([`wm-shutter`, {
          "is-closed": q.value
        }])
      }, [v(`span`, null, m(handler(`AmountHidden`)), 1)], 2)], 14, He), M.value ? (u(), i(l, {
        key: 0
      }, [M.value.text ? (u(), i(`span`, {
        key: `burst-${M.value.id}`,
        class: e([`wm-burst`, {
          "is-large": M.value.level >= t(6)
        }]),
        style: p({
          top: `${jt.value - 4}px`
        })
      }, m(M.value.text), 7)) : _(``, true), (u(true), i(l, null, a(M.value.sparks, count => (u(), i(`i`, {
        key: `spark-${M.value.id}-${count.id}`,
        class: e([`wm-spark`, {
          "is-accent": count.accent
        }]),
        style: p({
          ...Nt.value,
          width: `${count.size}px`,
          height: `${count.size}px`,
          "--wm-spark-x": `${count.dx}px`,
          "--wm-spark-y": `${count.dy}px`,
          animationDelay: `${count.delay}ms`
        })
      }, null, 6))), 128))], 64)) : _(``, true), v(`div`, {
        class: `wm-groove wm-collapsed-only`,
        title: Tt.value
      }, [v(`i`, {
        style: p({
          width: `${Math.min(1, X.value) * 100}%`
        })
      }, null, 4)], 8, Ue), v(`div`, We, [Y.value ? (u(), i(l, {
        key: 0
      }, [v(`div`, Ge, [v(`strong`, null, m(handler(`WishTitle`, {
        name: Y.value.wish.name
      })), 1), v(`b`, null, m(t(me)(Y.value.ratio)), 1)]), v(`p`, null, m(q.value ? handler(`AmountHidden`) : wt.value), 1), v(`div`, Ke, [v(`i`, {
        style: p({
          width: `${Y.value.ratio * 100}%`
        })
      }, null, 4)])], 64)) : (u(), i(`button`, {
        key: 1,
        type: `button`,
        class: `wm-empty-wish`,
        "data-no-drag": ``,
        onClick: o[0] ||= e => t(workMotivatorAPI)?.openSettings()
      }, [v(`strong`, null, m(handler(`WishEmpty`)), 1), v(`p`, null, m(handler(`WishEmptyHint`)), 1)]))]), v(`div`, qe, [v(`div`, Je, [v(`strong`, null, m(handler(`WorkHours`)), 1), v(`b`, null, m(t(me)(X.value)), 1)]), v(`p`, null, m(Tt.value), 1), v(`div`, Ye, [v(`i`, {
        style: p({
          width: `${Math.min(1, X.value) * 100}%`
        })
      }, null, 4)])]), v(`div`, Xe, [v(`span`, null, m(Et.value), 1)]), v(`div`, {
        class: e([`wm-actions`, {
          "is-visible": k.value && !A.value
        }]),
        "data-no-drag": ``
      }, [v(`button`, {
        type: `button`,
        class: e({
          "is-on": E.value.alwaysOnTop
        }),
        title: E.value.alwaysOnTop ? handler(`ButtonUnpin`) : handler(`ButtonPin`),
        onClick: Zt
      }, [f(t(ae), {
        size: 13,
        "stroke-width": 2
      })], 10, Ze), v(`button`, {
        type: `button`,
        title: q.value ? handler(`ButtonShowAmount`) : handler(`ButtonHideAmount`),
        onClick: Qt
      }, [q.value ? (u(), s(t(se), {
        key: 1,
        size: 13,
        "stroke-width": 2
      })) : (u(), s(t(le), {
        key: 0,
        size: 13,
        "stroke-width": 2
      }))], 8, Qe), v(`button`, {
        type: `button`,
        title: E.value.expanded ? handler(`ButtonCollapse`) : handler(`ButtonExpand`),
        onClick: Jt
      }, [E.value.expanded ? (u(), s(t(ke), {
        key: 0,
        size: 13,
        "stroke-width": 2
      })) : (u(), s(t(Ae), {
        key: 1,
        size: 13,
        "stroke-width": 2
      }))], 8, $e), v(`button`, {
        type: `button`,
        title: handler(`ButtonSettings`),
        onClick: o[1] ||= e => t(workMotivatorAPI)?.openSettings()
      }, [f(t(ce), {
        size: 13,
        "stroke-width": 2
      })], 8, et), v(`button`, {
        type: `button`,
        title: handler(`ButtonClose`),
        onClick: o[2] ||= e => t(workMotivatorAPI)?.hide()
      }, [f(t(oe), {
        size: 13,
        "stroke-width": 2
      })], 8, tt)], 2)], 34)) : _(``, true)], 6));
    }
  }), [[`__scopeId`, `data-v-9b077951`]]),
  N = h({
    legacy: false,
    locale: `zh-CN`,
    fallbackLocale: `zh-CN`,
    messages: {
      "zh-CN": {
        toolboxNative: ie
      },
      "en-US": {
        toolboxNative: b
      }
    },
    missingWarn: false,
    fallbackWarn: false
  });
y(M).use(N).mount(`#app`);