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
  setup(props) {
    let propsAlias = props,
      b = _(),
      x = e(),
      S = p(() => propsAlias.tabStopId || x),
      C = p(() => b.currentTabStopId.value === S.value),
      {
        getItems: w,
        CollectionItem: T
      } = m();
    f(() => {
      propsAlias.focusable && b.onFocusableItemAdd();
    }), u(() => {
      propsAlias.focusable && b.onFocusableItemRemove();
    }), i(() => propsAlias.focusable, (e, t) => {
      e !== t && (e ? b.onFocusableItemAdd() : b.onFocusableItemRemove());
    });
    function E(event) {
      if (event.key === `Tab` && event.shiftKey) {
        b.onItemShiftTab();
        return;
      }
      if (event.target !== event.currentTarget) return;
      let t = g(event, b.orientation.value, b.dir.value);
      if (t !== undefined) {
        if (event.metaKey || event.ctrlKey || event.altKey || !propsAlias.allowShiftKey && event.shiftKey) return;
        event.preventDefault();
        let n = [...w().map(item => item.ref).filter(item => item.dataset.disabled !== ``)];
        if (t === `last`) n.reverse();else if (t === `prev` || t === `next`) {
          t === `prev` && n.reverse();
          let r = n.indexOf(event.currentTarget);
          n = b.loop.value ? h(n, r + 1) : n.slice(r + 1);
        }
        d(() => v(n));
      }
    }
    return (ctx, renderCache) => (s(), o(n(T), null, {
      default: a(() => [l(n(t), {
        tabindex: C.value ? 0 : -1,
        "data-orientation": n(b).orientation.value,
        "data-active": ctx.active ? `` : undefined,
        "data-disabled": ctx.focusable ? undefined : ``,
        as: ctx.as,
        "as-child": ctx.asChild,
        onMousedown: renderCache[0] ||= event => {
          ctx.focusable ? n(b).onItemFocus(S.value) : event.preventDefault();
        },
        onFocus: renderCache[1] ||= e => n(b).onItemFocus(S.value),
        onKeydown: E
      }, {
        default: a(() => [r(ctx.$slots, `default`)]),
        _: 3
      }, 8, [`tabindex`, `data-orientation`, `data-active`, `data-disabled`, `as`, `as-child`])]),
      _: 3
    }));
  }
});
export { y as t };