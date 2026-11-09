import { xt as uiSwitchXt } from "./Switch.js";
import { $n as vueN, An as vueAn, Ct as vueCt, S as vueS, gt as vueGt, j as vueJ } from "../chunks/vue-i18n.runtime.js";
var s = vueJ({
  __name: `Kbd`,
  props: {
    class: {
      type: [Boolean, null, String, Object, Array]
    }
  },
  setup(props) {
    let s = props;
    return (ctx, renderCache) => (vueGt(), vueS(`kbd`, {
      "data-slot": `kbd`,
      class: vueN(vueAn(uiSwitchXt)(`bg-muted text-muted-foreground in-data-[slot=tooltip-content]:bg-background/20 in-data-[slot=tooltip-content]:text-background dark:in-data-[slot=tooltip-content]:bg-background/10 h-5 w-fit min-w-5 gap-1 rounded-sm px-1 font-sans text-xs font-medium [&_svg:not([class*=size-])]:size-3 pointer-events-none inline-flex items-center justify-center select-none`, s.class))
    }, [vueCt(ctx.$slots, `default`)], 2));
  }
});
export { s as t };