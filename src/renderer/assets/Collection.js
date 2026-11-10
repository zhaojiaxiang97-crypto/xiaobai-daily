import { A as e, J as t, K as n, M as r } from "./Switch.js";
import { Gt as i, H as a, Wt as o, X as s, bn as c, j as l, mn as u, mt as d, ut as f, v as p, vt as m } from "./vue-i18n.runtime.js";
function h(e) {
  let t = n({
    dir: c(`ltr`)
  });
  return p(() => e?.value || t.dir?.value || `ltr`);
}
function g(e) {
  let n = c(),
    r = p(() => n.value?.width ?? 0),
    i = p(() => n.value?.height ?? 0),
    blockSize;
  return f(() => {
    let r = t(e);
    r ? (n.value = {
      width: r.offsetWidth,
      height: r.offsetHeight
    }, blockSize = new ResizeObserver(e => {
      if (!Array.isArray(e) || !e.length) return;
      let t = e[0],
        inlineSize,
        offsetHeight;
      if (`borderBoxSize` in t) {
        let borderBoxSize = t.borderBoxSize,
          n = Array.isArray(borderBoxSize) ? borderBoxSize[0] : borderBoxSize;
        inlineSize = n.inlineSize, offsetHeight = n.blockSize;
      } else inlineSize = r.offsetWidth, offsetHeight = r.offsetHeight;
      n.value = {
        width: inlineSize,
        height: offsetHeight
      };
    }), blockSize.observe(r, {
      box: `border-box`
    })) : n.value = undefined;
  }), d(() => {
    blockSize?.disconnect(), blockSize = undefined;
  }), {
    width: r,
    height: i
  };
}
var _ = `data-reka-collection-item`;
function v(t = {}) {
  let {
      key: n = ``,
      isProvider: d = false
    } = t,
    f = `${n}CollectionProvider`,
    payload;
  if (d) {
    let e = c(new Map());
    payload = {
      collectionRef: c(),
      itemMap: e
    }, m(f, payload);
  } else payload = s(f);
  let handler = (e = false) => {
      let value = payload.collectionRef.value;
      if (!value) return [];
      let n = Array.from(value.querySelectorAll(`[${_}]`)),
        r = new Map(n.map((item, t) => [item, t])),
        i = Array.from(payload.itemMap.value.values()).sort((left, right) => (r.get(left.ref) ?? -1) - (r.get(right.ref) ?? -1));
      return e ? i : i.filter(item => item.ref.dataset.disabled !== ``);
    },
    v = l({
      name: `CollectionSlot`,
      inheritAttrs: false,
      setup(t, {
        slots: n,
        attrs: i
      }) {
        let {
          primitiveElement: s,
          currentElement: c
        } = e();
        return o(c, () => {
          payload.collectionRef.value = c.value;
        }), () => a(r, {
          ref: s,
          ...i
        }, n);
      }
    }),
    y = l({
      name: `CollectionItem`,
      inheritAttrs: false,
      props: {
        value: {
          validator: () => true
        }
      },
      setup(t, {
        slots: n,
        attrs: o
      }) {
        let {
          primitiveElement: s,
          currentElement: c
        } = e();
        return i(e => {
          if (c.value) {
            let n = u(c.value);
            payload.itemMap.value.set(n, {
              ref: c.value,
              value: t.value
            }), e(() => payload.itemMap.value.delete(n));
          }
        }), () => a(r, {
          ...o,
          [_]: ``,
          ref: s
        }, n);
      }
    });
  return {
    getItems: handler,
    reactiveItems: p(() => Array.from(payload.itemMap.value.values())),
    itemMapSize: p(() => payload.itemMap.value.size),
    CollectionSlot: v,
    CollectionItem: y
  };
}
export { g as n, h as r, v as t };