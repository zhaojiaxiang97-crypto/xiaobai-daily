import { vn as vueVn } from "./vue-i18n.runtime.js";
var t = 0,
  n = vueVn([]);
function r(e) {
  let r = {
    id: ++t,
    type: `success`,
    message: e
  };
  n.push(r), setTimeout(() => {
    let e = n.findIndex(e => e.id === r.id);
    e !== -1 && n.splice(e, 1);
  }, 3e3);
}
function i(e, r, i = `unknown`) {
  let a = {
    id: ++t,
    type: `error`,
    message: e,
    creditFeature: r,
    creditTrigger: i
  };
  n.push(a), setTimeout(() => {
    let e = n.findIndex(e => e.id === a.id);
    e !== -1 && n.splice(e, 1);
  }, 3e3);
}
export { r as n, n as r, i as t };