import { I as uiSwitchI, j as uiSwitchJ } from "./Switch.js";
import { An as vueAn, Ct as vueCt, Wt as vueWt, Yt as vueYt, b as vueB, gt as vueGt, j as vueJ, k as vueK, mt as vueMt, rt as vueRt, ut as vueUt, v as vueV } from "../chunks/vue-i18n.runtime.js";
import { t as CollectionT } from "./Collection.js";
import { a as RovingFocusGroupA, i as RovingFocusGroupI, n as RovingFocusGroupN, r as RovingFocusGroupR } from "./RovingFocusGroup.js";
var y = vueJ({
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
      b = RovingFocusGroupN(),
      x = uiSwitchI(),
      S = vueV(() => propsAlias.tabStopId || x),
      C = vueV(() => b.currentTabStopId.value === S.value),
      {
        getItems: w,
        CollectionItem: T
      } = CollectionT();
    vueUt(() => {
      propsAlias.focusable && b.onFocusableItemAdd();
    }), vueMt(() => {
      propsAlias.focusable && b.onFocusableItemRemove();
    }), vueWt(() => propsAlias.focusable, (e, t) => {
      e !== t && (e ? b.onFocusableItemAdd() : b.onFocusableItemRemove());
    });
    function E(event) {
      if (event.key === `Tab` && event.shiftKey) {
        b.onItemShiftTab();
        return;
      }
      if (event.target !== event.currentTarget) return;
      let t = RovingFocusGroupI(event, b.orientation.value, b.dir.value);
      if (t !== undefined) {
        if (event.metaKey || event.ctrlKey || event.altKey || !propsAlias.allowShiftKey && event.shiftKey) return;
        event.preventDefault();
        let n = [...w().map(item => item.ref).filter(item => item.dataset.disabled !== ``)];
        if (t === `last`) n.reverse();else if (t === `prev` || t === `next`) {
          t === `prev` && n.reverse();
          let r = n.indexOf(event.currentTarget);
          n = b.loop.value ? RovingFocusGroupA(n, r + 1) : n.slice(r + 1);
        }
        vueRt(() => RovingFocusGroupR(n));
      }
    }
    return (ctx, renderCache) => (vueGt(), vueB(vueAn(T), null, {
      default: vueYt(() => [vueK(vueAn(uiSwitchJ), {
        tabindex: C.value ? 0 : -1,
        "data-orientation": vueAn(b).orientation.value,
        "data-active": ctx.active ? `` : undefined,
        "data-disabled": ctx.focusable ? undefined : ``,
        as: ctx.as,
        "as-child": ctx.asChild,
        onMousedown: renderCache[0] ||= event => {
          ctx.focusable ? vueAn(b).onItemFocus(S.value) : event.preventDefault();
        },
        onFocus: renderCache[1] ||= e => vueAn(b).onItemFocus(S.value),
        onKeydown: E
      }, {
        default: vueYt(() => [vueCt(ctx.$slots, `default`)]),
        _: 3
      }, 8, [`tabindex`, `data-orientation`, `data-active`, `data-disabled`, `as`, `as-child`])]),
      _: 3
    }));
  }
});
export { y as t };