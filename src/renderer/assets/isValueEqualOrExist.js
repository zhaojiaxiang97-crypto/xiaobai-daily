import { gt as e } from "./Switch.js";
import { t } from "./is-equal.js";
function n(items, r) {
  return e(items) ? false : Array.isArray(items) ? items.some(item => t(item, r)) : t(items, r);
}
export { n as t };