import { at as uiSwitchAt, j as uiSwitchJ, vt as uiSwitchVt, yt as uiSwitchYt } from "./Switch.js";
import { An as vueAn, Ct as vueCt, Dn as vueDn, Yt as vueYt, b as vueB, bn as vueBn, gt as vueGt, j as vueJ, k as vueK } from "../chunks/vue-i18n.runtime.js";
import { r as CollectionR, t as CollectionT } from "./Collection.js";
var h = `rovingFocusGroup.onEntryFocus`,
  g = {
    bubbles: false,
    cancelable: true
  },
  options = {
    ArrowLeft: `prev`,
    ArrowUp: `prev`,
    ArrowRight: `next`,
    ArrowDown: `next`,
    PageUp: `first`,
    Home: `first`,
    PageDown: `last`,
    End: `last`
  };
function v(e, t) {
  return t === `rtl` ? e === `ArrowLeft` ? `ArrowRight` : e === `ArrowRight` ? `ArrowLeft` : e : e;
}
function y(event, t, n) {
  let r = v(event.key, n);
  if (!(t === `vertical` && [`ArrowLeft`, `ArrowRight`].includes(r)) && !(t === `horizontal` && [`ArrowUp`, `ArrowDown`].includes(r))) return options[r];
}
function b(e, t = false) {
  let r = uiSwitchVt();
  for (let i of e) if (i === r || (i.focus({
    preventScroll: t
  }), uiSwitchVt() !== r)) return;
}
function x(items, t) {
  return items.map((item, r) => items[(t + r) % items.length]);
}
var [S, C] = uiSwitchYt(`RovingFocusGroup`),
  w = vueJ({
    __name: `RovingFocusGroup`,
    props: {
      orientation: {
        type: String,
        required: false,
        default: undefined
      },
      dir: {
        type: String,
        required: false
      },
      loop: {
        type: Boolean,
        required: false,
        default: false
      },
      currentTabStopId: {
        type: [String, null],
        required: false
      },
      defaultCurrentTabStopId: {
        type: String,
        required: false
      },
      preventScrollOnEntryFocus: {
        type: Boolean,
        required: false,
        default: false
      },
      asChild: {
        type: Boolean,
        required: false
      },
      as: {
        type: null,
        required: false
      }
    },
    emits: [`entryFocus`, `update:currentTabStopId`],
    setup(props, {
      expose: expose,
      emit: emit
    }) {
      let _ = props,
        emitAlias = emit,
        {
          loop: y,
          orientation: x,
          dir: S
        } = vueDn(_),
        w = CollectionR(S),
        T = uiSwitchAt(_, `currentTabStopId`, emitAlias, {
          defaultValue: _.defaultCurrentTabStopId,
          passive: _.currentTabStopId === undefined
        }),
        E = vueBn(false),
        D = vueBn(false),
        O = vueBn(0),
        {
          getItems: k,
          CollectionSlot: A
        } = CollectionT({
          isProvider: true
        });
      function j(event) {
        let t = !D.value;
        if (event.currentTarget && event.target === event.currentTarget && t && !E.value) {
          let customEvent = new CustomEvent(h, g);
          if (event.currentTarget.dispatchEvent(customEvent), emitAlias(`entryFocus`, customEvent), !customEvent.defaultPrevented) {
            let filtered = k().map(item => item.ref).filter(item => item.dataset.disabled !== ``);
            b([filtered.find(item => item.getAttribute(`data-active`) === ``), filtered.find(item => item.getAttribute(`data-highlighted`) === ``), filtered.find(item => item.id === T.value), ...filtered].filter(Boolean), _.preventScrollOnEntryFocus);
          }
        }
        D.value = false;
      }
      function M() {
        setTimeout(() => {
          D.value = false;
        }, 1);
      }
      return expose({
        getItems: k
      }), C({
        loop: y,
        dir: w,
        orientation: x,
        currentTabStopId: T,
        onItemFocus: e => {
          T.value = e;
        },
        onItemShiftTab: () => {
          E.value = true;
        },
        onFocusableItemAdd: () => {
          O.value++;
        },
        onFocusableItemRemove: () => {
          O.value--;
        }
      }), (e, renderCache) => (vueGt(), vueB(vueAn(A), null, {
        default: vueYt(() => [vueK(vueAn(uiSwitchJ), {
          tabindex: E.value || O.value === 0 ? -1 : 0,
          "data-orientation": vueAn(x),
          as: e.as,
          "as-child": e.asChild,
          dir: vueAn(w),
          style: {
            outline: `none`
          },
          onMousedown: renderCache[0] ||= e => D.value = true,
          onMouseup: M,
          onFocus: j,
          onBlur: renderCache[1] ||= e => E.value = false
        }, {
          default: vueYt(() => [vueCt(e.$slots, `default`)]),
          _: 3
        }, 8, [`tabindex`, `data-orientation`, `as`, `as-child`, `dir`])]),
        _: 3
      }));
    }
  });
export { x as a, y as i, S as n, b as r, w as t };