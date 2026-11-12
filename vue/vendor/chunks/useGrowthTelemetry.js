import { ct as e, it as t, ot as n } from "./vue-i18n.runtime.js";
import { r } from "./use-telemetry.js";
import { t as i } from "./useAuth.js";
function a() {
  let {
      user: a
    } = i(),
    o = true,
    s = 0;
  t(() => {
    o = true;
  });
  let handler = () => {
    o = false, s += 1;
  };
  e(handler), n(handler);
  function l() {
    let e = a.value?.userId,
      t = a.value?.token,
      n = s;
    return (text, c = {}) => {
      if (e && t && a.value?.userId === e && a.value.token === t && (!text.endsWith(`_view_loaded`) && !text.endsWith(`_detail_view`) && text !== `report_market_preview_loaded` && text !== `todo_assignee_viewed` && (text !== `tool_action_success` || c.action !== `markdown_opened`) || o && !document.hidden && n === s)) try {
        r(`action`, text, c);
      } catch {}
    };
  }
  return {
    captureGrowthObservation: l
  };
}
export { a as t };