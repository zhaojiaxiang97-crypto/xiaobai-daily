import { Ct as vueCt, S as vueS, Wt as vueWt, Yt as vueYt, b as vueB, bn as vueBn, gt as vueGt, j as vueJ, ot as vueOt, rr as vueRr, ut as vueUt, v as vueV, x as vueX, y as vueY } from "../chunks/vue-i18n.runtime.js";
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
  w = [`innerHTML`],
  T = {
    key: 1,
    class: `math-inline math-inline--fallback`
  },
  options = {
    class: `math-inline__loading`,
    role: `status`,
    "aria-live": `polite`
  },
  D = mainV(vueJ({
    __name: `MathInlineNode`,
    props: {
      node: {}
    },
    setup(props) {
      let propsAlias = props,
        D = vueBn(null),
        O = typeof window > `u`,
        k = vueV(() => propsAlias.node.markup === `$$`),
        A = vueV(() => mainO(propsAlias.node.content)),
        j = function () {
          if (!propsAlias.node.content || !O) return {
            html: ``,
            text: propsAlias.node.raw,
            loading: false
          };
          let e = mainL();
          if (!e) return {
            html: ``,
            text: propsAlias.node.raw,
            loading: false
          };
          try {
            return {
              html: e.renderToString(A.value, {
                throwOnError: propsAlias.node.loading,
                displayMode: k.value
              }),
              text: ``,
              loading: false
            };
          } catch {
            return {
              html: ``,
              text: propsAlias.node.raw,
              loading: false
            };
          }
        }(),
        M = vueBn(j.html),
        N = vueBn(j.text),
        P = false,
        F = 0,
        I = false,
        L = null,
        R = vueBn(j.loading),
        z = mainX(),
        B = null;
      function V() {
        return handler(this, null, function* () {
          if (I) return;
          if (!propsAlias.node.content) return R.value = false, M.value = ``, N.value = propsAlias.node.raw, void (P = true);
          L &&= (L.abort(), null);
          let e = ++F,
            abortController = new AbortController();
          if (L = abortController, !P) try {
            !B && D.value && (B = z(D.value)), yield B?.whenVisible;
          } catch {}
          mainH(A.value, k.value, {
            timeout: 1500,
            waitTimeout: 0,
            maxRetries: 0,
            signal: abortController.signal
          }).then(result => {
            I || e !== F || (M.value = result, N.value = ``, R.value = false, P = true);
          }).catch(event => handler(null, null, function* () {
            if (I || e !== F) return;
            let fallbackValue = event?.code || event?.name,
              r = fallbackValue === `KATEX_DISABLED`;
            if (fallbackValue === `WORKER_INIT_ERROR` || event?.fallbackToRenderer || fallbackValue === `WORKER_BUSY` || fallbackValue === `WORKER_TIMEOUT`) {
              let e = yield mainS();
              if (e) {
                try {
                  let toStringResult = e.renderToString(A.value, {
                    throwOnError: propsAlias.node.loading,
                    displayMode: k.value
                  });
                  M.value = toStringResult, N.value = ``, R.value = false, P = true, mainW(A.value, k.value, toStringResult);
                } catch {}
                return;
              }
            }
            if (r) return R.value = false, M.value = ``, void (N.value = propsAlias.node.raw);
            P || (R.value = !r), propsAlias.node.loading ? r && (M.value = ``, N.value = propsAlias.node.raw) : (R.value = false, M.value = ``, N.value = propsAlias.node.raw);
          }));
        });
      }
      return (j.html || j.text) && (P = true), vueWt(() => propsAlias.node.content, () => {
        V();
      }), vueUt(() => {
        O || M.value || V();
      }), vueOt(() => {
        var e;
        I = true, L &&= (L.abort(), null), (e = B?.destroy) == null || e.call(B), B = null;
      }), (n, renderCache) => (vueGt(), vueS(`span`, {
        ref_key: `containerEl`,
        ref: D,
        class: `math-inline-wrapper`,
        "data-markstream-math": `inline`,
        "data-markstream-mode": M.value ? `katex` : N.value ? `fallback` : `loading`
      }, [M.value ? (vueGt(), vueS(`span`, {
        key: 0,
        class: `math-inline`,
        innerHTML: M.value
      }, null, 8, w)) : N.value ? (vueGt(), vueS(`span`, T, vueRr(N.value), 1)) : R.value ? (vueGt(), vueB(playerR, {
        key: 2,
        name: `table-node-fade`
      }, {
        default: vueYt(() => [vueY(`span`, options, [vueCt(n.$slots, `loading`, {
          isLoading: R.value
        }, () => [renderCache[0] ||= vueY(`span`, {
          class: `math-inline__spinner animate-spin`,
          "aria-hidden": `true`
        }, null, -1), renderCache[1] ||= vueY(`span`, {
          class: `sr-only`
        }, `Loading`, -1)], true)])]),
        _: 3
      })) : vueX(``, true)], 8, C));
    }
  }), [[`__scopeId`, `data-v-6c6e62e1`]]);
D.install = e => {
  e.component(D.__name, D);
};
export { D as default };