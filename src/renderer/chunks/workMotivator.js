import { $n as vueN, An as vueAn, Cn as vueCn, O as vueO, S as vueS, St as vueSt, Wt as vueWt, b as vueB, bn as vueBn, c as vueC, gt as vueGt, j as vueJ, k as vueK, n as ee, nr as vueNr, ot as vueOt, rr as vueRr, rt as vueRt, t as vueT, ut as vueUt, v as vueV, x as vueX, y as vueY } from "./vue-i18n.runtime.js";
import { n as playerN, o as playerO, t as playerT } from "../i18n/en-US-player.js";
import { n as lucideN, r as lucideR, t as lucideT } from "../ui/icons/lucide-icons.js";
import { D as motivatorD, E as motivatorE, O as motivatorO, l as motivatorL, s as motivatorS } from "./work-motivator.js";
import { t as pluginvueexporthelperT } from "./_plugin-vue_export-helper.js";
import { _ as formatNum, a as formatNumA, c as formatNumC, d as formatNumD, f as formatNumF, g as formatNumG, h as formatNumH, i as formatNumI, l as formatNumL, m as formatNumM, n as formatNumN, o as formatNumO, p as formatNumP, r as formatNumR, s as formatNumS, t as formatNumT, u as formatNumU, v as formatNumV } from "./format-number.js";
var ke = lucideR(`chevrons-down-up`, [[`path`, {
    d: `m7 20 5-5 5 5`,
    key: `13a0gw`
  }], [`path`, {
    d: `m7 4 5 5 5-5`,
    key: `1kwcof`
  }]]),
  Ae = lucideR(`chevrons-up-down`, [[`path`, {
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
  M = pluginvueexporthelperT(vueJ({
    __name: `WorkMotivatorApp`,
    setup(props) {
      let workMotivatorAPI = window.workMotivatorAPI,
        {
          t: translate,
          locale: y
        } = ee(),
        handler = (e, t = {}) => translate(`toolboxNative.workMotivator${e}`, t),
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
        E = vueBn(null),
        D = vueBn(Date.now()),
        O = vueCn(null),
        k = vueBn(false),
        A = vueBn(false),
        j = vueBn(false),
        M = vueCn(null),
        N = vueBn(null),
        st = vueBn(null),
        P = vueBn(null),
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
        G = vueV(() => E.value?.decimals ?? 3),
        ft = vueV(() => {
          if (!E.value) return 3;
          let e = formatNumV(E.value, new Date());
          return Math.min(7, Math.max(3, String(Math.floor(e)).length));
        }),
        K = vueV(() => je(ft.value, G.value, E.value?.currency ?? `¥`)),
        pt = vueV(() => `${ft.value}-${G.value}-${K.value.cellWidth.toFixed(2)}`),
        mt = vueV(() => `${Math.min(26, K.value.cellWidth * 1.27).toFixed(1)}px`),
        q = vueV(() => !!E.value?.amountHidden),
        ht = vueV(() => !!(O.value && formatNumS(O.value.status))),
        gt = vueV(() => E.value && O.value ? formatNum(E.value, O.value) : 0),
        J = vueV(() => Math.max(0, gt.value * 10 ** G.value)),
        _t = vueV(() => formatNumI(handler, E.value?.earnedRange ?? `today`)),
        vt = vueV(() => !E.value || !O.value ? `` : formatNumA(E.value, gt.value, y.value, G.value)),
        yt = vueV(() => !E.value || !O.value ? `` : handler(`HourlyRate`, {
          amount: q.value ? `••••` : formatNumA(E.value, O.value.hourlyRate, y.value)
        })),
        bt = vueV(() => O.value ? formatNumU(handler, O.value.status) : ``),
        xt = vueV(() => O.value ? formatNumL(handler, O.value) : ``),
        St = vueV(() => formatNumR(handler, new Date(D.value), y.value)),
        Ct = vueV(() => formatNumT(new Date(D.value))),
        Y = vueV(() => {
          if (!E.value || !O.value) return null;
          let e = formatNumF(E.value);
          return e ? formatNumH(E.value, e, O.value) : null;
        }),
        wt = vueV(() => Y.value ? formatNumD(handler, Y.value) : ``),
        X = vueV(() => {
          let e = O.value;
          return !e || e.scheduledMs <= 0 ? 0 : e.workedMs / e.scheduledMs;
        }),
        Tt = vueV(() => {
          let e = O.value;
          return e ? handler(`WorkHoursValue`, {
            worked: formatNumO(e.workedMs),
            total: formatNumO(e.scheduledMs)
          }) : ``;
        }),
        Et = vueV(() => E.value ? formatNumN(handler, formatNumP(E.value, D.value)) : ``),
        Dt = vueV(() => {
          if (E.value && N.value && !q.value) return handler(`PeriodEarned`, {
            month: formatNumA(E.value, N.value.month, y.value),
            year: formatNumA(E.value, N.value.year, y.value)
          });
        });
      function Ot(e) {
        return e > G.value && Math.floor(J.value) < 10 ** e;
      }
      let kt = vueV(() => ({
          opacity: String((E.value?.opacity ?? 100) / 100),
          perspective: `${nt}px`,
          zoom: String(motivatorS[E.value?.size ?? `medium`])
        })),
        options = {
          left: `14px`,
          top: `14px`,
          width: `${w}px`
        },
        jt = vueV(() => E.value?.expanded ? 92 : 34),
        Mt = vueV(() => {
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
        Nt = vueV(() => ({
          left: `${16 + T / 2}px`,
          top: `${jt.value + 25}px`
        }));
      function Pt(options) {
        options && (E.value = options.config, options.language && options.language !== y.value && (y.value = options.language), Z());
      }
      function Z() {
        if (!E.value) return;
        let e = Date.now();
        D.value = e, O.value = formatNumM(E.value, e), k.value && It(), Q(false), Ft();
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
          month: formatNumG(E.value, motivatorL(new Date(t.getFullYear(), t.getMonth(), 1)), e),
          year: formatNumG(E.value, motivatorL(new Date(t.getFullYear(), 0, 1)), e)
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
        await vueRt();
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
            amount: formatNumA(t, t.celebrateAmount, y.value, i)
          }) : r.text === `milestone` ? handler(`CelebrateMilestone`, {
            amount: formatNumA(t, t.celebrateAmount * e, y.value, i)
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
        let pointerIdAlias = pointerId;
        pointerId = null, A.value = false, workMotivatorAPI?.dragEnd(), event && event.currentTarget?.releasePointerCapture?.(pointerIdAlias);
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
      return vueWt(pt, () => {
        Rt();
      }), vueWt(q, () => Q(true)), vueWt(() => E.value?.earnedRange, () => Q(true)), vueUt(async () => {
        document.documentElement.classList.add(`work-motivator-renderer`), document.body.classList.add(`work-motivator-renderer`), ut = workMotivatorAPI?.onWindowState(Pt) ?? null;
        try {
          let e = await workMotivatorAPI?.getWindowState();
          e?.ok && Pt(e.data);
        } catch {}
        await Rt(), Bt(), requestAnimationFrame(() => {
          j.value = true;
        }), window.addEventListener(`blur`, en), document.addEventListener(`visibilitychange`, $t);
      }), vueOt(() => {
        ut?.(), R !== null && window.clearTimeout(R), z !== null && window.clearTimeout(z), window.removeEventListener(`blur`, en), document.removeEventListener(`visibilitychange`, $t), I.dispose();
      }), (n, renderCache) => (vueGt(), vueS(`div`, {
        ref_key: `rootRef`,
        ref: st,
        class: vueN([`wm-root`, [`finish-${E.value?.finish ?? `graphite`}`, {
          "is-hovering": k.value,
          "is-active": ht.value,
          "is-locked": E.value?.locked
        }]]),
        style: vueNr(kt.value)
      }, [E.value ? (vueGt(), vueS(`div`, {
        key: 0,
        ref_key: `faceRef`,
        ref: P,
        class: vueN([`wm-face`, {
          "is-expanded": E.value.expanded,
          "is-ready": j.value,
          "is-dragging": A.value
        }]),
        style: options,
        onPointerenter: Ut,
        onPointerleave: Wt,
        onPointermove: qt,
        onPointerdown: Gt,
        onPointerup: $,
        onPointercancel: renderCache[3] ||= e => $(null),
        onLostpointercapture: renderCache[4] ||= e => $(null),
        onDblclick: Yt,
        onContextmenu: Xt
      }, [vueY(`div`, Ne, [vueY(`span`, Pe, vueRr(St.value), 1), vueY(`span`, Fe, vueRr(Ct.value), 1)]), vueY(`div`, Ie, [vueY(`span`, Le, [renderCache[5] ||= vueY(`i`, {
        class: `wm-led`
      }, null, -1), vueO(vueRr(bt.value), 1)]), vueY(`span`, Re, vueRr(xt.value), 1)]), vueY(`div`, ze, [vueY(`span`, Be, [renderCache[6] ||= vueY(`i`, {
        class: `wm-led wm-label-led`
      }, null, -1), vueO(vueRr(_t.value), 1)]), vueY(`span`, Ve, vueRr(yt.value), 1)]), vueY(`div`, {
        class: vueN([`wm-window`, M.value ? {
          "is-celebrating": true,
          "has-ring": M.value.setting.ringCount > 0,
          "has-pop": M.value.setting.pop && !M.value.setting.shake,
          "has-shake": M.value.setting.shake
        } : null]),
        style: vueNr(Mt.value),
        title: Dt.value
      }, [vueY(`span`, {
        class: vueN([`wm-currency`, {
          "is-covered": q.value
        }]),
        style: vueNr({
          left: `${K.value.currencyX}px`,
          width: `${K.value.currencyWidth}px`
        })
      }, vueRr(E.value.currency), 7), (vueGt(true), vueS(vueC, null, vueSt(K.value.cells, (n, r) => (vueGt(), vueS(`span`, {
        key: `${pt.value}-${n.power}`,
        class: vueN([`wm-reel`, {
          "is-decimal": n.decimal,
          "is-leading": Ot(n.power)
        }]),
        style: vueNr({
          left: `${n.x}px`,
          width: `${K.value.cellWidth}px`
        })
      }, [vueY(`span`, {
        class: `wm-reel-spin`,
        style: vueNr({
          "--wm-reel-index": r
        })
      }, [vueY(`span`, {
        class: `wm-reel-strip`,
        style: vueNr({
          fontSize: mt.value
        })
      }, [(vueGt(true), vueS(vueC, null, vueSt(vueAn(x), (e, n) => (vueGt(), vueS(`span`, {
        key: n,
        style: vueNr({
          height: `${vueAn(34)}px`
        })
      }, vueRr(e), 5))), 128))], 4)], 4)], 6))), 128)), K.value.dotX === null ? vueX(``, true) : (vueGt(), vueS(`i`, {
        key: 0,
        class: vueN([`wm-dot`, {
          "is-covered": q.value
        }]),
        style: vueNr({
          left: `${K.value.dotX}px`
        })
      }, null, 6)), vueY(`div`, {
        class: vueN([`wm-shutter`, {
          "is-closed": q.value
        }])
      }, [vueY(`span`, null, vueRr(handler(`AmountHidden`)), 1)], 2)], 14, He), M.value ? (vueGt(), vueS(vueC, {
        key: 0
      }, [M.value.text ? (vueGt(), vueS(`span`, {
        key: `burst-${M.value.id}`,
        class: vueN([`wm-burst`, {
          "is-large": M.value.level >= vueAn(6)
        }]),
        style: vueNr({
          top: `${jt.value - 4}px`
        })
      }, vueRr(M.value.text), 7)) : vueX(``, true), (vueGt(true), vueS(vueC, null, vueSt(M.value.sparks, count => (vueGt(), vueS(`i`, {
        key: `spark-${M.value.id}-${count.id}`,
        class: vueN([`wm-spark`, {
          "is-accent": count.accent
        }]),
        style: vueNr({
          ...Nt.value,
          width: `${count.size}px`,
          height: `${count.size}px`,
          "--wm-spark-x": `${count.dx}px`,
          "--wm-spark-y": `${count.dy}px`,
          animationDelay: `${count.delay}ms`
        })
      }, null, 6))), 128))], 64)) : vueX(``, true), vueY(`div`, {
        class: `wm-groove wm-collapsed-only`,
        title: Tt.value
      }, [vueY(`i`, {
        style: vueNr({
          width: `${Math.min(1, X.value) * 100}%`
        })
      }, null, 4)], 8, Ue), vueY(`div`, We, [Y.value ? (vueGt(), vueS(vueC, {
        key: 0
      }, [vueY(`div`, Ge, [vueY(`strong`, null, vueRr(handler(`WishTitle`, {
        name: Y.value.wish.name
      })), 1), vueY(`b`, null, vueRr(vueAn(formatNumC)(Y.value.ratio)), 1)]), vueY(`p`, null, vueRr(q.value ? handler(`AmountHidden`) : wt.value), 1), vueY(`div`, Ke, [vueY(`i`, {
        style: vueNr({
          width: `${Y.value.ratio * 100}%`
        })
      }, null, 4)])], 64)) : (vueGt(), vueS(`button`, {
        key: 1,
        type: `button`,
        class: `wm-empty-wish`,
        "data-no-drag": ``,
        onClick: renderCache[0] ||= e => vueAn(workMotivatorAPI)?.openSettings()
      }, [vueY(`strong`, null, vueRr(handler(`WishEmpty`)), 1), vueY(`p`, null, vueRr(handler(`WishEmptyHint`)), 1)]))]), vueY(`div`, qe, [vueY(`div`, Je, [vueY(`strong`, null, vueRr(handler(`WorkHours`)), 1), vueY(`b`, null, vueRr(vueAn(formatNumC)(X.value)), 1)]), vueY(`p`, null, vueRr(Tt.value), 1), vueY(`div`, Ye, [vueY(`i`, {
        style: vueNr({
          width: `${Math.min(1, X.value) * 100}%`
        })
      }, null, 4)])]), vueY(`div`, Xe, [vueY(`span`, null, vueRr(Et.value), 1)]), vueY(`div`, {
        class: vueN([`wm-actions`, {
          "is-visible": k.value && !A.value
        }]),
        "data-no-drag": ``
      }, [vueY(`button`, {
        type: `button`,
        class: vueN({
          "is-on": E.value.alwaysOnTop
        }),
        title: E.value.alwaysOnTop ? handler(`ButtonUnpin`) : handler(`ButtonPin`),
        onClick: Zt
      }, [vueK(vueAn(lucideN), {
        size: 13,
        "stroke-width": 2
      })], 10, Ze), vueY(`button`, {
        type: `button`,
        title: q.value ? handler(`ButtonShowAmount`) : handler(`ButtonHideAmount`),
        onClick: Qt
      }, [q.value ? (vueGt(), vueB(vueAn(motivatorD), {
        key: 1,
        size: 13,
        "stroke-width": 2
      })) : (vueGt(), vueB(vueAn(motivatorO), {
        key: 0,
        size: 13,
        "stroke-width": 2
      }))], 8, Qe), vueY(`button`, {
        type: `button`,
        title: E.value.expanded ? handler(`ButtonCollapse`) : handler(`ButtonExpand`),
        onClick: Jt
      }, [E.value.expanded ? (vueGt(), vueB(vueAn(ke), {
        key: 0,
        size: 13,
        "stroke-width": 2
      })) : (vueGt(), vueB(vueAn(Ae), {
        key: 1,
        size: 13,
        "stroke-width": 2
      }))], 8, $e), vueY(`button`, {
        type: `button`,
        title: handler(`ButtonSettings`),
        onClick: renderCache[1] ||= e => vueAn(workMotivatorAPI)?.openSettings()
      }, [vueK(vueAn(motivatorE), {
        size: 13,
        "stroke-width": 2
      })], 8, et), vueY(`button`, {
        type: `button`,
        title: handler(`ButtonClose`),
        onClick: renderCache[2] ||= e => vueAn(workMotivatorAPI)?.hide()
      }, [vueK(vueAn(lucideT), {
        size: 13,
        "stroke-width": 2
      })], 8, tt)], 2)], 34)) : vueX(``, true)], 6));
    }
  }), [[`__scopeId`, `data-v-9b077951`]]),
  N = vueT({
    legacy: false,
    locale: `zh-CN`,
    fallbackLocale: `zh-CN`,
    messages: {
      "zh-CN": {
        toolboxNative: playerN
      },
      "en-US": {
        toolboxNative: playerT
      }
    },
    missingWarn: false,
    fallbackWarn: false
  });
playerO(M).use(N).mount(`#app`);