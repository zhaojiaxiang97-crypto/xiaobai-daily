import { gt as uiSwitchGt } from "../ui/Switch.js";
import { t as isequalT } from "./is-equal.js";
function n(items, r) {
  return uiSwitchGt(items) ? false : Array.isArray(items) ? items.some(e => isequalT(e, r)) : isequalT(items, r);
}
export { n as t };