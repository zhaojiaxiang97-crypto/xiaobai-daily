import { ct as vueCt, it as vueIt, ot as vueOt } from "./vue-i18n.runtime.js";
import { r as telemetryR } from "./use-telemetry.js";
import { t as useAuthT } from "./useAuth.js";
function a() {
  let {
      user: a
    } = useAuthT(),
    o = true,
    s = 0;
  vueIt(() => {
    o = true;
  });
  let c = () => {
    o = false, s += 1;
  };
  vueCt(c), vueOt(c);
  function l() {
    let e = a.value?.userId,
      t = a.value?.token,
      n = s;
    return (text, c = {}) => {
      if (e && t && a.value?.userId === e && a.value.token === t && (!text.endsWith(`_view_loaded`) && !text.endsWith(`_detail_view`) && text !== `report_market_preview_loaded` && text !== `todo_assignee_viewed` && (text !== `tool_action_success` || c.action !== `markdown_opened`) || o && !document.hidden && n === s)) try {
        telemetryR(`action`, text, c);
      } catch {}
    };
  }
  return {
    captureGrowthObservation: l
  };
}
export { a as t };