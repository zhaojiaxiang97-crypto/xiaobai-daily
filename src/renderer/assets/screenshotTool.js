const __vite__mapDeps = (items, m = __vite__mapDeps, d = m.f || (m.f = ["./OverlayApp.js", "./vue-i18n.runtime.js", "./en-US-player.js", "./lucide-icons.js", "./screenshot-beautifier.js", "./compose.js", "./EditorApp.js", "./Switch.js", "./check.js", "./PopperContent.js", "./Collection.js", "./DropdownMenuItem.js", "./DropdownMenuTrigger.js", "./RovingFocusGroup.js", "./undo-2.js", "./Slider.js", "./PinApp.js", "./ToastApp.js", "./pen-line.js"])) => items.map(item => d[item]);
import { t as e } from "./vue-i18n.runtime.js";
import { n as t, o as n, t as r } from "./en-US-player.js";
import { t as i } from "./preload-helper.js";
var a = e({
  legacy: false,
  locale: `zh-CN`,
  fallbackLocale: `zh-CN`,
  messages: {
    "zh-CN": {
      toolboxNative: t
    },
    "en-US": {
      toolboxNative: r
    }
  },
  missingWarn: false,
  fallbackWarn: false
});
function o(e, t = {}) {
  return a.global.t(`toolboxNative.screenshot${e}`, t);
}
function s(e) {
  a.global.locale.value = e.language === `en-US` ? `en-US` : `zh-CN`, document.documentElement.lang = a.global.locale.value, document.title = o(`EditorTitle`), c(e.dark);
}
function c(e) {
  document.documentElement.classList.toggle(`dark`, e);
}
var l = window.screenshotToolAPI ? window.screenshotToolAPI.platform === `darwin` : /mac/i.test(navigator.platform);
function u(event) {
  return l ? event.metaKey : event.ctrlKey;
}
var options = {
    overlay: () => i(() => import(`./OverlayApp.js`), __vite__mapDeps([0, 1, 2, 3, 4, 5]), import.meta.url),
    editor: () => i(() => import(`./EditorApp.js`), __vite__mapDeps([6, 7, 1, 2, 3, 8, 9, 10, 4, 11, 12, 13, 14, 5, 15]), import.meta.url),
    pin: () => i(() => import(`./PinApp.js`), __vite__mapDeps([16, 1]), import.meta.url),
    toast: () => i(() => import(`./ToastApp.js`), __vite__mapDeps([17, 1, 3, 8, 18]), import.meta.url)
  },
  replaced = window.location.hash.replace(/^#/, ``),
  p = replaced in options ? replaced : `editor`;
document.documentElement.dataset.screenshotRoute = p, c(window.matchMedia(`(prefers-color-scheme: dark)`).matches), options[p]().then(({
  default: e
}) => {
  n(e).use(a).mount(`#app`);
});
export { o as a, u as i, s as n, l as r, c as t };