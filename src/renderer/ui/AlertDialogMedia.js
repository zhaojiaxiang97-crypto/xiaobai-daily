import { xt as uiSwitchXt } from "./Switch.js";
import { $n as vueN, An as vueAn, Ct as vueCt, S as vueS, gt as vueGt, j as vueJ } from "../chunks/vue-i18n.runtime.js";
var s = vueJ({
  __name: `AlertDialogMedia`,
  props: {
    class: {
      type: [Boolean, null, String, Object, Array]
    }
  },
  setup(props) {
    let s = props;
    return (ctx, renderCache) => (vueGt(), vueS(`div`, {
      "data-slot": `alert-dialog-media`,
      class: vueN(vueAn(uiSwitchXt)(`bg-muted mb-2 inline-flex size-10 items-center justify-center rounded-md sm:group-data-[size=default]/alert-dialog-content:row-span-2 *:[svg:not([class*=size-])]:size-6`, s.class))
    }, [vueCt(ctx.$slots, `default`)], 2));
  }
});
export { s as t };