import { $n as vueN, S as vueS, Wt as vueWt, Yt as vueYt, bn as vueBn, gt as vueGt, j as vueJ, k as vueK, ot as vueOt, rr as vueRr, ut as vueUt, v as vueV, x as vueX, y as vueY } from "../chunks/vue-i18n.runtime.js";
import { r as playerR } from "../i18n/en-US-player.js";
import { H as mainH, L as mainL, O as mainO, S as mainS, X as mainX, v as mainV, w as mainW } from "../chunks/main.js";
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
  D = mainV(vueJ({
    __name: `MathBlockNode`,
    props: {
      node: {}
    },
    setup(props) {
      let propsAlias = props,
        D = vueBn(null),
        O = vueV(() => mainO(propsAlias.node.content)),
        k = function () {
          if (!propsAlias.node.content) return {
            html: ``,
            text: propsAlias.node.raw,
            loading: false
          };
          let e = mainL();
          if (!e) return {
            html: ``,
            text: propsAlias.node.loading ? `` : propsAlias.node.raw,
            loading: propsAlias.node.loading
          };
          try {
            return {
              html: e.renderToString(O.value, {
                throwOnError: propsAlias.node.loading,
                displayMode: true
              }),
              text: ``,
              loading: false
            };
          } catch {
            return {
              html: ``,
              text: propsAlias.node.loading ? `` : propsAlias.node.raw,
              loading: propsAlias.node.loading
            };
          }
        }(),
        A = vueBn(k.html),
        j = vueBn(k.text),
        M = false,
        N = 0,
        P = false,
        F = null,
        I = mainX(),
        L = null,
        R = vueBn(k.loading);
      function z() {
        return handler(this, null, function* () {
          if (P) return;
          if (!propsAlias.node.content) return R.value = false, A.value = ``, j.value = propsAlias.node.raw, void (M = true);
          if (!M) try {
            !L && D.value && (L = I(D.value)), yield L?.whenVisible;
          } catch {}
          F &&= (F.abort(), null);
          let e = ++N,
            abortController = new AbortController();
          F = abortController, mainH(O.value, true, {
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
              let e = yield mainS();
              if (e) {
                try {
                  let toStringResult = e.renderToString(O.value, {
                    throwOnError: propsAlias.node.loading,
                    displayMode: true
                  });
                  A.value = toStringResult, j.value = ``, M = true, R.value = false, mainW(O.value, true, toStringResult);
                } catch {}
                return;
              }
            }
            if (r) return R.value = false, A.value = ``, void (j.value = propsAlias.node.raw);
            M || (R.value = true), propsAlias.node.loading || (R.value = false, A.value = ``, j.value = propsAlias.node.raw);
          }));
        });
      }
      return (k.html || k.text) && (M = true), vueWt(() => propsAlias.node.content, () => {
        z();
      }), vueUt(() => {
        A.value || z();
      }), vueOt(() => {
        var e;
        P = true, F &&= (F.abort(), null), (e = L?.destroy) == null || e.call(L), L = null;
      }), (n, renderCache) => (vueGt(), vueS(`div`, {
        ref_key: `containerEl`,
        ref: D,
        class: `math-block text-center overflow-x-auto relative`,
        "data-markstream-math": `block`,
        "data-markstream-mode": A.value ? `katex` : j.value ? `fallback` : `loading`
      }, [vueK(playerR, {
        name: `math-fade`
      }, {
        default: vueYt(() => [!R.value || A.value || j.value ? vueX(``, true) : (vueGt(), vueS(`div`, w, [...(renderCache[0] ||= [vueY(`div`, {
          class: `math-loading-spinner`
        }, null, -1)])]))]),
        _: 1
      }), A.value ? (vueGt(), vueS(`div`, {
        key: 0,
        class: vueN([`math-block__content`, {
          "math-rendering": R.value
        }]),
        innerHTML: A.value
      }, null, 10, T)) : j.value ? (vueGt(), vueS(`pre`, E, vueRr(j.value), 1)) : (vueGt(), vueS(`div`, {
        key: 2,
        class: vueN([`math-block__content`, {
          "math-rendering": R.value
        }])
      }, null, 2))], 8, C));
    }
  }), [[`__scopeId`, `data-v-914b800f`]]);
D.install = e => {
  e.component(D.__name, D);
};
export { D as default };