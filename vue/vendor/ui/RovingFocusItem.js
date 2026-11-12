import { I as e, j as t } from "./Switch.js";
import { An as n, Ct as r, Wt as i, Yt as a, b as o, gt as s, j as c, k as l, mt as u, rt as d, ut as f, v as p } from "../chunks/vue-i18n.runtime.js";
import { t as m } from "./Collection.js";
import { a as h, i as g, n as _, r as v } from "./RovingFocusGroup.js";
var y = c({
  __name: `RovingFocusItem`,
  props: {
    tabStopId: {
      type: String,
      required: false
    },
    focusable: {
      type: Boolean,
      required: false,
      default: true
    },
    active: {
      type: Boolean,
      required: false
    },
    allowShiftKey: {
      type: Boolean,
      required: false
    },
    asChild: {
      type: Boolean,
      required: false
    },
    as: {
      type: null,
      required: false,
      default: `span`
    }
  },
  setup(c) {
    let y = c,
      b = _(),
      x = e(),
      S = p(() => y.tabStopId || x),
      C = p(() => b.currentTabStopId.value === S.value),
      {
        getItems: w,
        CollectionItem: T
      } = m();
    f(() => {
      y.focusable && b.onFocusableItemAdd();
    }), u(() => {
      y.focusable && b.onFocusableItemRemove();
    }), i(() => y.focusable, (event, t) => {
      event !== t && (event ? b.onFocusableItemAdd() : b.onFocusableItemRemove());
    });
    function E(e) {
      if (e.key === `Tab` && e.shiftKey) {
        b.onItemShiftTab();
        return;
      }
      if (e.target !== e.currentTarget) return;
      let t = g(e, b.orientation.value, b.dir.value);
      if (t !== undefined) {
        if (e.metaKey || e.ctrlKey || e.altKey || !y.allowShiftKey && e.shiftKey) return;
        e.preventDefault();
        let items = [...w().map(item => item.ref).filter(item => item.dataset.disabled !== ``)];
        if (t === `last`) items.reverse();else if (t === `prev` || t === `next`) {
          t === `prev` && items.reverse();
          let r = items.indexOf(e.currentTarget);
          items = b.loop.value ? h(items, r + 1) : items.slice(r + 1);
        }
        d(() => v(items));
      }
    }
    return (e, i) => (s(), o(n(T), null, {
      default: a(() => [l(n(t), {
        tabindex: C.value ? 0 : -1,
        "data-orientation": n(b).orientation.value,
        "data-active": e.active ? `` : undefined,
        "data-disabled": e.focusable ? undefined : ``,
        as: e.as,
        "as-child": e.asChild,
        onMousedown: i[0] ||= t => {
          e.focusable ? n(b).onItemFocus(S.value) : t.preventDefault();
        },
        onFocus: i[1] ||= e => n(b).onItemFocus(S.value),
        onKeydown: E
      }, {
        default: a(() => [r(e.$slots, `default`)]),
        _: 3
      }, 8, [`tabindex`, `data-orientation`, `data-active`, `data-disabled`, `as`, `as-child`])]),
      _: 3
    }));
  }
});
export { y as t };