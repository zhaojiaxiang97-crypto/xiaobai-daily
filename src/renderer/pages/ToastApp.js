import { An as vueAn, Cn as vueCn, O as vueO, S as vueS, gt as vueGt, j as vueJ, k as vueK, ot as vueOt, rr as vueRr, ut as vueUt, v as vueV, x as vueX, y as vueY } from "../chunks/vue-i18n.runtime.js";
import { n as lucideN, t as lucideT } from "../ui/icons/lucide-icons.js";
import { t as checkT } from "../chunks/check.js";
import { t as penlineT } from "../chunks/pen-line.js";
import { a as screenshotToolA, n as screenshotToolN, t as screenshotToolT } from "../chunks/screenshotTool.js";
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
  k = vueJ({
    __name: `ToastApp`,
    setup(props) {
      let toast = window.screenshotToolAPI.toast,
        A = vueCn(null),
        emptyItems = [],
        M = vueV(() => A.value?.kind === `saved` ? screenshotToolA(`ToastCardSaved`) : screenshotToolA(`ToastCardCopied`));
      return vueUt(() => {
        emptyItems.push(toast.onOpen(e => {
          screenshotToolN(e), A.value = e;
        }), window.screenshotToolAPI.onTheme(({
          dark: e
        }) => screenshotToolT(e))), window.screenshotToolAPI.ready();
      }), vueOt(() => {
        for (let e of emptyItems) e();
      }), (t, renderCache) => (vueGt(), vueS(`div`, {
        class: `fixed inset-0 p-3`,
        onMouseenter: renderCache[4] ||= t => vueAn(toast).hover(true),
        onMouseleave: renderCache[5] ||= t => vueAn(toast).hover(false)
      }, [A.value ? (vueGt(), vueS(`div`, b, [vueY(`button`, {
        type: `button`,
        class: `flex min-h-0 flex-1 items-center justify-center bg-zinc-100 px-3 pt-3 dark:bg-zinc-800`,
        title: vueAn(screenshotToolA)(`ToastCardEdit`),
        onClick: renderCache[0] ||= t => vueAn(toast).action(`edit`)
      }, [vueY(`img`, {
        src: A.value.thumbnail,
        alt: ``,
        draggable: `false`,
        class: `max-h-full max-w-full rounded-md object-contain shadow-sm`
      }, null, 8, S)], 8, x), vueY(`div`, C, [vueY(`span`, w, [vueK(vueAn(checkT), {
        size: 14,
        class: `shrink-0 text-emerald-600`
      }), vueY(`span`, T, vueRr(M.value), 1)]), vueY(`div`, E, [vueY(`button`, {
        type: `button`,
        class: `inline-flex h-7 items-center gap-1 rounded-md px-2 text-xs hover:bg-black/[0.06] dark:hover:bg-white/10`,
        onClick: renderCache[1] ||= t => vueAn(toast).action(`edit`)
      }, [vueK(vueAn(penlineT), {
        size: 13
      }), vueO(vueRr(vueAn(screenshotToolA)(`ToastCardEdit`)), 1)]), vueY(`button`, {
        type: `button`,
        class: `inline-flex size-7 items-center justify-center rounded-md hover:bg-black/[0.06] dark:hover:bg-white/10`,
        title: vueAn(screenshotToolA)(`ToastCardPin`),
        onClick: renderCache[2] ||= t => vueAn(toast).action(`pin`)
      }, [vueK(vueAn(lucideN), {
        size: 13
      })], 8, D), vueY(`button`, {
        type: `button`,
        class: `inline-flex size-7 items-center justify-center rounded-md text-zinc-500 hover:bg-black/[0.06] dark:hover:bg-white/10`,
        title: vueAn(screenshotToolA)(`ToastCardClose`),
        onClick: renderCache[3] ||= t => vueAn(toast).action(`close`)
      }, [vueK(vueAn(lucideT), {
        size: 13
      })], 8, O)])])])) : vueX(``, true)], 32));
    }
  });
export { k as default };