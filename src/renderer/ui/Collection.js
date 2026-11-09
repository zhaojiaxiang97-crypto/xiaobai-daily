import { A as uiSwitchA, J as uiSwitchJ, K as uiSwitchK, M as uiSwitchM } from "./Switch.js";
import { Gt as vueGt, H as vueH, Wt as vueWt, X as vueX, bn as vueBn, j as vueJ, mn as vueMn, mt as vueMt, ut as vueUt, v as vueV, vt as vueVt } from "../chunks/vue-i18n.runtime.js";
function h(e) {
  let t = uiSwitchK({
    dir: vueBn(`ltr`)
  });
  return vueV(() => e?.value || t.dir?.value || `ltr`);
}
function g(e) {
  let n = vueBn(),
    r = vueV(() => n.value?.width ?? 0),
    i = vueV(() => n.value?.height ?? 0),
    a;
  return vueUt(() => {
    let r = uiSwitchJ(e);
    r ? (n.value = {
      width: r.offsetWidth,
      height: r.offsetHeight
    }, a = new ResizeObserver(e => {
      if (!Array.isArray(e) || !e.length) return;
      let t = e[0],
        i,
        a;
      if (`borderBoxSize` in t) {
        let e = t.borderBoxSize,
          n = Array.isArray(e) ? e[0] : e;
        i = n.inlineSize, a = n.blockSize;
      } else i = r.offsetWidth, a = r.offsetHeight;
      n.value = {
        width: i,
        height: a
      };
    }), a.observe(r, {
      box: `border-box`
    })) : n.value = undefined;
  }), vueMt(() => {
    a?.disconnect(), a = undefined;
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
    h;
  if (d) {
    let e = vueBn(new Map());
    h = {
      collectionRef: vueBn(),
      itemMap: e
    }, vueVt(f, h);
  } else h = vueX(f);
  let g = (e = false) => {
      let t = h.collectionRef.value;
      if (!t) return [];
      let n = Array.from(t.querySelectorAll(`[${_}]`)),
        r = new Map(n.map((e, t) => [e, t])),
        i = Array.from(h.itemMap.value.values()).sort((e, t) => (r.get(e.ref) ?? -1) - (r.get(t.ref) ?? -1));
      return e ? i : i.filter(e => e.ref.dataset.disabled !== ``);
    },
    v = vueJ({
      name: `CollectionSlot`,
      inheritAttrs: false,
      setup(props, {
        slots: slots,
        attrs: attrs
      }) {
        let {
          primitiveElement: s,
          currentElement: c
        } = uiSwitchA();
        return vueWt(c, () => {
          h.collectionRef.value = c.value;
        }), () => vueH(uiSwitchM, {
          ref: s,
          ...attrs
        }, slots);
      }
    }),
    y = vueJ({
      name: `CollectionItem`,
      inheritAttrs: false,
      props: {
        value: {
          validator: () => true
        }
      },
      setup(props, {
        slots: slots,
        attrs: attrs
      }) {
        let {
          primitiveElement: s,
          currentElement: c
        } = uiSwitchA();
        return vueGt(e => {
          if (c.value) {
            let n = vueMn(c.value);
            h.itemMap.value.set(n, {
              ref: c.value,
              value: props.value
            }), e(() => h.itemMap.value.delete(n));
          }
        }), () => vueH(uiSwitchM, {
          ...attrs,
          [_]: ``,
          ref: s
        }, slots);
      }
    });
  return {
    getItems: g,
    reactiveItems: vueV(() => Array.from(h.itemMap.value.values())),
    itemMapSize: vueV(() => h.itemMap.value.size),
    CollectionSlot: v,
    CollectionItem: y
  };
}
export { g as n, h as r, v as t };