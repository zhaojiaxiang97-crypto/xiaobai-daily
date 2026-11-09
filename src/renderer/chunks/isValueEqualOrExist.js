import { gt as e } from "../ui/Switch.js";
import { t } from "./is-equal.js";
function n(items, r) {
  return e(items) ? !1 : Array.isArray(items) ? items.some(e => t(e, r)) : t(items, r);
}
export { n as t };