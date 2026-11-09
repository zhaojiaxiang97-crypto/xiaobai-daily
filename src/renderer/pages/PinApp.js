import { $n as e, An as t, S as n, bn as r, gt as i, j as a, nr as o, ot as s, rr as c, rt as l, ut as u, x as d, y as f } from "../chunks/vue-i18n.runtime.js";
import { n as p, t as m } from "../chunks/screenshotTool.js";
var h = [`src`],
  g = {
    key: 1,
    class: `pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-black/70 px-2.5 py-1 text-xs font-medium tabular-nums text-white`
  },
  _ = 14,
  v = a({
    __name: `PinApp`,
    setup(props) {
      let v = window.screenshotToolAPI.pin,
        y = r(``),
        b = r(document.hasFocus()),
        x = r(``),
        S = false,
        C = null,
        emptyItems = [];
      async function T(e) {
        p(e), y.value && URL.revokeObjectURL(y.value), y.value = URL.createObjectURL(new Blob([e.image], {
          type: `image/png`
        })), await l();
      }
      function E() {
        requestAnimationFrame(() => requestAnimationFrame(() => v.painted()));
      }
      function D(event) {
        event.button === 0 && (S = true, event.currentTarget.setPointerCapture(event.pointerId), v.dragStart({
          screenX: event.screenX,
          screenY: event.screenY
        }));
      }
      function O(e) {
        S && v.dragMove({
          screenX: e.screenX,
          screenY: e.screenY
        });
      }
      function k() {
        S && (S = false, v.dragEnd());
      }
      function A(event) {
        event.preventDefault(), event.deltaY !== 0 && v.zoom({
          direction: event.deltaY < 0 ? 1 : -1,
          x: event.clientX,
          y: event.clientY
        });
      }
      function j(event) {
        event.key === `Escape` && v.close();
      }
      function M(event) {
        event.preventDefault(), v.menu();
      }
      return u(() => {
        emptyItems.push(v.onOpen(e => {
          T(e);
        }), v.onZoom(({
          zoom: e
        }) => {
          x.value = `${Math.round(e * 100)}%`, C !== null && window.clearTimeout(C), C = window.setTimeout(() => {
            x.value = ``, C = null;
          }, 900);
        }), window.screenshotToolAPI.onTheme(({
          dark: e
        }) => m(e))), window.addEventListener(`keydown`, j), window.addEventListener(`focus`, () => {
          b.value = true;
        }), window.addEventListener(`blur`, () => {
          b.value = false;
        }), window.screenshotToolAPI.ready();
      }), s(() => {
        for (let e of emptyItems) e();
        window.removeEventListener(`keydown`, j), y.value && URL.revokeObjectURL(y.value), C !== null && window.clearTimeout(C);
      }), (r, a) => (i(), n(`div`, {
        class: `fixed inset-0 cursor-move`,
        style: o({
          padding: `${_}px`
        }),
        onPointerdown: D,
        onPointermove: O,
        onPointerup: k,
        onPointercancel: k,
        onWheel: A,
        onDblclick: a[0] ||= e => t(v).close(),
        onContextmenu: M
      }, [f(`div`, {
        class: e([`relative h-full w-full overflow-hidden rounded-[3px] transition-shadow`, b.value ? `shadow-[0_6px_20px_rgb(0_0_0/0.32),0_0_0_1.5px_rgb(16_185_129/0.9)]` : `shadow-[0_6px_18px_rgb(0_0_0/0.26),0_0_0_1px_rgb(0_0_0/0.1)]`])
      }, [y.value ? (i(), n(`img`, {
        key: 0,
        src: y.value,
        alt: ``,
        draggable: `false`,
        class: `pointer-events-none block h-full w-full select-none`,
        onLoad: E
      }, null, 40, h)) : d(``, true), x.value ? (i(), n(`span`, g, c(x.value), 1)) : d(``, true)], 2)], 36));
    }
  });
export { v as default };