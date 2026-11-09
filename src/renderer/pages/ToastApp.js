import { An as e, Cn as t, O as n, S as r, gt as i, j as a, k as o, ot as s, rr as c, ut as l, v as u, x as d, y as f } from "../chunks/vue-i18n.runtime.js";
import { n as p, t as m } from "../ui/icons/lucide-icons.js";
import { t as h } from "../chunks/check.js";
import { t as g } from "../chunks/pen-line.js";
import { a as _, n as v, t as y } from "../chunks/screenshotTool.js";
var b = {
    key: 0,
    class: `flex h-full flex-col overflow-hidden rounded-xl border border-black/10 bg-white text-zinc-800 shadow-[0_10px_30px_rgb(0_0_0/0.22)] dark:border-white/10 dark:bg-zinc-900 dark:text-zinc-100`
  },
  x = [`title`],
  S = [`src`],
  C = {
    class: `flex h-12 shrink-0 items-center justify-between gap-2 px-3`
  },
  w = {
    class: `flex min-w-0 items-center gap-1.5 text-xs font-medium`
  },
  T = {
    class: `truncate`
  },
  E = {
    class: `flex shrink-0 items-center gap-0.5`
  },
  D = [`title`],
  O = [`title`],
  k = a({
    __name: `ToastApp`,
    setup(a) {
      let toast = window.screenshotToolAPI.toast,
        A = t(null),
        j = [],
        M = u(() => A.value?.kind === `saved` ? _(`ToastCardSaved`) : _(`ToastCardCopied`));
      return l(() => {
        j.push(toast.onOpen(e => {
          v(e), A.value = e;
        }), window.screenshotToolAPI.onTheme(({
          dark: e
        }) => y(e))), window.screenshotToolAPI.ready();
      }), s(() => {
        for (let e of j) e();
      }), (t, a) => (i(), r(`div`, {
        class: `fixed inset-0 p-3`,
        onMouseenter: a[4] ||= t => e(toast).hover(!0),
        onMouseleave: a[5] ||= t => e(toast).hover(!1)
      }, [A.value ? (i(), r(`div`, b, [f(`button`, {
        type: `button`,
        class: `flex min-h-0 flex-1 items-center justify-center bg-zinc-100 px-3 pt-3 dark:bg-zinc-800`,
        title: e(_)(`ToastCardEdit`),
        onClick: a[0] ||= t => e(toast).action(`edit`)
      }, [f(`img`, {
        src: A.value.thumbnail,
        alt: ``,
        draggable: `false`,
        class: `max-h-full max-w-full rounded-md object-contain shadow-sm`
      }, null, 8, S)], 8, x), f(`div`, C, [f(`span`, w, [o(e(h), {
        size: 14,
        class: `shrink-0 text-emerald-600`
      }), f(`span`, T, c(M.value), 1)]), f(`div`, E, [f(`button`, {
        type: `button`,
        class: `inline-flex h-7 items-center gap-1 rounded-md px-2 text-xs hover:bg-black/[0.06] dark:hover:bg-white/10`,
        onClick: a[1] ||= t => e(toast).action(`edit`)
      }, [o(e(g), {
        size: 13
      }), n(c(e(_)(`ToastCardEdit`)), 1)]), f(`button`, {
        type: `button`,
        class: `inline-flex size-7 items-center justify-center rounded-md hover:bg-black/[0.06] dark:hover:bg-white/10`,
        title: e(_)(`ToastCardPin`),
        onClick: a[2] ||= t => e(toast).action(`pin`)
      }, [o(e(p), {
        size: 13
      })], 8, D), f(`button`, {
        type: `button`,
        class: `inline-flex size-7 items-center justify-center rounded-md text-zinc-500 hover:bg-black/[0.06] dark:hover:bg-white/10`,
        title: e(_)(`ToastCardClose`),
        onClick: a[3] ||= t => e(toast).action(`close`)
      }, [o(e(m), {
        size: 13
      })], 8, O)])])])) : d(``, !0)], 32));
    }
  });
export { k as default };