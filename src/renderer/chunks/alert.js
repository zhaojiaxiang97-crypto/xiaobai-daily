import { vn as e } from "./vue-i18n.runtime.js";
var t = 0,
  n = e([]);
function r(e) {
  let options = {
    id: ++t,
    type: `success`,
    message: e
  };
  n.push(options), setTimeout(() => {
    let index = n.findIndex(item => item.id === options.id);
    index !== -1 && n.splice(index, 1);
  }, 3e3);
}
function i(e, r, i = `unknown`) {
  let row = {
    id: ++t,
    type: `error`,
    message: e,
    creditFeature: r,
    creditTrigger: i
  };
  n.push(row), setTimeout(() => {
    let indexResult = n.findIndex(item => item.id === row.id);
    indexResult !== -1 && n.splice(indexResult, 1);
  }, 3e3);
}
export { r as n, n as r, i as t };