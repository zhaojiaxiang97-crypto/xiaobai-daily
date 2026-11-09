import { $n as e, S as t, Wt as n, Yt as r, bn as i, gt as a, j as o, k as s, ot as c, rr as l, ut as u, v as d, x as f, y as p } from "../chunks/vue-i18n.runtime.js";
import { r as m } from "../i18n/en-US-player.js";
import { H as h, L as g, O as _, S as v, X as y, v as b, w as x } from "../chunks/main.js";
var handler = (e, t, n) => new Promise((fn, i) => {
    var a = e => {
        try {
          s(n.next(e));
        } catch (e) {
          i(e);
        }
      },
      o = e => {
        try {
          s(n.throw(e));
        } catch (e) {
          i(e);
        }
      },
      s = e => e.done ? fn(e.value) : Promise.resolve(e.value).then(a, o);
    s((n = n.apply(e, t)).next());
  }),
  C = [`data-markstream-mode`],
  w = {
    key: 0,
    class: `math-loading-overlay`
  },
  T = [`innerHTML`],
  E = {
    key: 1,
    class: `math-block__fallback text-left`
  },
  D = b(o({
    __name: `MathBlockNode`,
    props: {
      node: {}
    },
    setup(o) {
      let b = o,
        D = i(null),
        O = d(() => _(b.node.content)),
        k = function () {
          if (!b.node.content) return {
            html: ``,
            text: b.node.raw,
            loading: false
          };
          let e = g();
          if (!e) return {
            html: ``,
            text: b.node.loading ? `` : b.node.raw,
            loading: b.node.loading
          };
          try {
            return {
              html: e.renderToString(O.value, {
                throwOnError: b.node.loading,
                displayMode: true
              }),
              text: ``,
              loading: false
            };
          } catch {
            return {
              html: ``,
              text: b.node.loading ? `` : b.node.raw,
              loading: b.node.loading
            };
          }
        }(),
        A = i(k.html),
        j = i(k.text),
        M = false,
        N = 0,
        P = false,
        F = null,
        I = y(),
        L = null,
        R = i(k.loading);
      function z() {
        return handler(this, null, function* () {
          if (P) return;
          if (!b.node.content) return R.value = false, A.value = ``, j.value = b.node.raw, void (M = true);
          if (!M) try {
            !L && D.value && (L = I(D.value)), yield L?.whenVisible;
          } catch {}
          F &&= (F.abort(), null);
          let e = ++N,
            abortController = new AbortController();
          F = abortController, h(O.value, true, {
            timeout: 3e3,
            waitTimeout: 2e3,
            maxRetries: 1,
            signal: abortController.signal
          }).then(result => {
            P || e !== N || (A.value = result, j.value = ``, M = true, R.value = false);
          }).catch(event => handler(null, null, function* () {
            if (P || e !== N) return;
            let fallbackValue = event?.code || event?.name,
              r = fallbackValue === `KATEX_DISABLED`;
            if (fallbackValue === `WORKER_INIT_ERROR` || event?.fallbackToRenderer || fallbackValue === `WORKER_BUSY` || fallbackValue === `WORKER_TIMEOUT`) {
              let e = yield v();
              if (e) {
                try {
                  let toStringResult = e.renderToString(O.value, {
                    throwOnError: b.node.loading,
                    displayMode: true
                  });
                  A.value = toStringResult, j.value = ``, M = true, R.value = false, x(O.value, true, toStringResult);
                } catch {}
                return;
              }
            }
            if (r) return R.value = false, A.value = ``, void (j.value = b.node.raw);
            M || (R.value = true), b.node.loading || (R.value = false, A.value = ``, j.value = b.node.raw);
          }));
        });
      }
      return (k.html || k.text) && (M = true), n(() => b.node.content, () => {
        z();
      }), u(() => {
        A.value || z();
      }), c(() => {
        var e;
        P = true, F &&= (F.abort(), null), (e = L?.destroy) == null || e.call(L), L = null;
      }), (n, i) => (a(), t(`div`, {
        ref_key: `containerEl`,
        ref: D,
        class: `math-block text-center overflow-x-auto relative`,
        "data-markstream-math": `block`,
        "data-markstream-mode": A.value ? `katex` : j.value ? `fallback` : `loading`
      }, [s(m, {
        name: `math-fade`
      }, {
        default: r(() => [!R.value || A.value || j.value ? f(``, true) : (a(), t(`div`, w, [...(i[0] ||= [p(`div`, {
          class: `math-loading-spinner`
        }, null, -1)])]))]),
        _: 1
      }), A.value ? (a(), t(`div`, {
        key: 0,
        class: e([`math-block__content`, {
          "math-rendering": R.value
        }]),
        innerHTML: A.value
      }, null, 10, T)) : j.value ? (a(), t(`pre`, E, l(j.value), 1)) : (a(), t(`div`, {
        key: 2,
        class: e([`math-block__content`, {
          "math-rendering": R.value
        }])
      }, null, 2))], 8, C));
    }
  }), [[`__scopeId`, `data-v-914b800f`]]);
D.install = e => {
  e.component(D.__name, D);
};
export { D as default };