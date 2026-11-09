import { Ct as e, S as t, Wt as n, Yt as r, b as i, bn as a, gt as o, j as s, ot as c, rr as l, ut as u, v as d, x as f, y as p } from "../chunks/vue-i18n.runtime.js";
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
  D = b(s({
    __name: `MathInlineNode`,
    props: {
      node: {}
    },
    setup(props) {
      let propsAlias = props,
        D = a(null),
        O = typeof window > `u`,
        k = d(() => propsAlias.node.markup === `$$`),
        A = d(() => _(propsAlias.node.content)),
        j = function () {
          if (!propsAlias.node.content || !O) return {
            html: ``,
            text: propsAlias.node.raw,
            loading: false
          };
          let e = g();
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
        M = a(j.html),
        N = a(j.text),
        P = false,
        F = 0,
        I = false,
        L = null,
        R = a(j.loading),
        z = y(),
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
          h(A.value, k.value, {
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
              let e = yield v();
              if (e) {
                try {
                  let toStringResult = e.renderToString(A.value, {
                    throwOnError: propsAlias.node.loading,
                    displayMode: k.value
                  });
                  M.value = toStringResult, N.value = ``, R.value = false, P = true, x(A.value, k.value, toStringResult);
                } catch {}
                return;
              }
            }
            if (r) return R.value = false, M.value = ``, void (N.value = propsAlias.node.raw);
            P || (R.value = !r), propsAlias.node.loading ? r && (M.value = ``, N.value = propsAlias.node.raw) : (R.value = false, M.value = ``, N.value = propsAlias.node.raw);
          }));
        });
      }
      return (j.html || j.text) && (P = true), n(() => propsAlias.node.content, () => {
        V();
      }), u(() => {
        O || M.value || V();
      }), c(() => {
        var e;
        I = true, L &&= (L.abort(), null), (e = B?.destroy) == null || e.call(B), B = null;
      }), (n, a) => (o(), t(`span`, {
        ref_key: `containerEl`,
        ref: D,
        class: `math-inline-wrapper`,
        "data-markstream-math": `inline`,
        "data-markstream-mode": M.value ? `katex` : N.value ? `fallback` : `loading`
      }, [M.value ? (o(), t(`span`, {
        key: 0,
        class: `math-inline`,
        innerHTML: M.value
      }, null, 8, w)) : N.value ? (o(), t(`span`, T, l(N.value), 1)) : R.value ? (o(), i(m, {
        key: 2,
        name: `table-node-fade`
      }, {
        default: r(() => [p(`span`, options, [e(n.$slots, `loading`, {
          isLoading: R.value
        }, () => [a[0] ||= p(`span`, {
          class: `math-inline__spinner animate-spin`,
          "aria-hidden": `true`
        }, null, -1), a[1] ||= p(`span`, {
          class: `sr-only`
        }, `Loading`, -1)], true)])]),
        _: 3
      })) : f(``, true)], 8, C));
    }
  }), [[`__scopeId`, `data-v-6c6e62e1`]]);
D.install = e => {
  e.component(D.__name, D);
};
export { D as default };