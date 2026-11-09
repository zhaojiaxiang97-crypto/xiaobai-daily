import { at as e, j as t, vt as n, yt as r } from "./Switch.js";
import { An as i, Ct as a, Dn as o, Yt as s, b as c, bn as l, gt as u, j as d, k as f } from "../chunks/vue-i18n.runtime.js";
import { r as p, t as m } from "./Collection.js";
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
  let r = n();
  for (let i of e) if (i === r || (i.focus({
    preventScroll: t
  }), n() !== r)) return;
}
function x(items, t) {
  return items.map((item, r) => items[(t + r) % items.length]);
}
var [S, C] = r(`RovingFocusGroup`),
  w = d({
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
    setup(n, {
      expose: r,
      emit: d
    }) {
      let _ = n,
        v = d,
        {
          loop: y,
          orientation: x,
          dir: S
        } = o(_),
        w = p(S),
        T = e(_, `currentTabStopId`, v, {
          defaultValue: _.defaultCurrentTabStopId,
          passive: _.currentTabStopId === undefined
        }),
        E = l(false),
        D = l(false),
        O = l(0),
        {
          getItems: k,
          CollectionSlot: A
        } = m({
          isProvider: true
        });
      function j(event) {
        let t = !D.value;
        if (event.currentTarget && event.target === event.currentTarget && t && !E.value) {
          let customEvent = new CustomEvent(h, g);
          if (event.currentTarget.dispatchEvent(customEvent), v(`entryFocus`, customEvent), !customEvent.defaultPrevented) {
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
      return r({
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
      }), (e, n) => (u(), c(i(A), null, {
        default: s(() => [f(i(t), {
          tabindex: E.value || O.value === 0 ? -1 : 0,
          "data-orientation": i(x),
          as: e.as,
          "as-child": e.asChild,
          dir: i(w),
          style: {
            outline: `none`
          },
          onMousedown: n[0] ||= e => D.value = true,
          onMouseup: M,
          onFocus: j,
          onBlur: n[1] ||= e => E.value = false
        }, {
          default: s(() => [a(e.$slots, `default`)]),
          _: 3
        }, 8, [`tabindex`, `data-orientation`, `as`, `as-child`, `dir`])]),
        _: 3
      }));
    }
  });
export { x as a, y as i, S as n, b as r, w as t };