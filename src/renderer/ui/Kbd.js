import { xt as e } from "./Switch.js";
import { $n as t, An as n, Ct as r, S as i, gt as a, j as o } from "../chunks/vue-i18n.runtime.js";
var s = o({
  __name: `Kbd`,
  props: {
    class: {
      type: [Boolean, null, String, Object, Array]
    }
  },
  setup(props) {
    let s = props;
    return (ctx, renderCache) => (a(), i(`kbd`, {
      "data-slot": `kbd`,
      class: t(n(e)(`bg-muted text-muted-foreground in-data-[slot=tooltip-content]:bg-background/20 in-data-[slot=tooltip-content]:text-background dark:in-data-[slot=tooltip-content]:bg-background/10 h-5 w-fit min-w-5 gap-1 rounded-sm px-1 font-sans text-xs font-medium [&_svg:not([class*=size-])]:size-3 pointer-events-none inline-flex items-center justify-center select-none`, s.class))
    }, [r(ctx.$slots, `default`)], 2));
  }
});
export { s as t };