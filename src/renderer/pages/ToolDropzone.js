import { xt as uiSwitchXt } from "../ui/Switch.js";
import { $n as vueN, An as vueAn, Ct as vueCt, S as vueS, bn as vueBn, gt as vueGt, j as vueJ, k as vueK, rr as vueRr, v as vueV, x as vueX, y as vueY } from "../chunks/vue-i18n.runtime.js";
import { E as playerE } from "../i18n/en-US-player.js";
import { Ln as mainLn } from "../chunks/main.js";
var h = [`disabled`],
  g = {
    class: `inline-flex size-8 shrink-0 items-center justify-center rounded-lg bg-background text-primary`
  },
  _ = {
    class: `block truncate text-xs font-semibold text-foreground`
  },
  v = {
    key: 0,
    class: `mt-0.5 block text-[11px] leading-snug text-muted-foreground`
  },
  y = {
    key: 0,
    class: `text-[10px] not-italic text-muted-foreground`
  },
  b = vueJ({
    __name: `ToolDropzone`,
    props: {
      title: {},
      hint: {},
      note: {},
      layout: {},
      disabled: {
        type: Boolean
      },
      selected: {
        type: Boolean
      },
      class: {
        type: [Boolean, null, String, Object, Array]
      }
    },
    emits: [`select`, `drop`],
    setup(props, {
      emit: emit
    }) {
      let propsAlias = props,
        emitAlias = emit,
        C = vueBn(false),
        w = vueV(() => propsAlias.layout === `column` ? `min-h-24 flex-col items-center justify-center gap-1.5 px-4 py-5 text-center` : `min-h-[60px] items-center gap-3 px-3.5 py-3 text-left`),
        T = vueV(() => C.value ? `border-primary bg-primary/10` : propsAlias.selected ? `border-primary/40 bg-primary/[0.05] hover:border-primary hover:bg-primary/[0.08]` : `border-primary/35 bg-primary/[0.03] hover:border-primary hover:bg-primary/[0.07]`);
      function E(e) {
        C.value = false, !propsAlias.disabled && emitAlias(`drop`, Array.from(e.dataTransfer?.files || []));
      }
      return (ctx, renderCache) => (vueGt(), vueS(`button`, {
        type: `button`,
        disabled: props.disabled,
        class: vueN(vueAn(uiSwitchXt)(`flex w-full rounded-[10px] border border-dashed transition-colors disabled:cursor-not-allowed disabled:opacity-60`, w.value, T.value, propsAlias.class)),
        onClick: renderCache[0] ||= e => emitAlias(`select`),
        onDragenter: renderCache[1] ||= playerE(e => C.value = !props.disabled, [`prevent`]),
        onDragover: renderCache[2] ||= playerE(e => C.value = !props.disabled, [`prevent`]),
        onDragleave: renderCache[3] ||= playerE(e => C.value = false, [`prevent`]),
        onDrop: playerE(E, [`prevent`])
      }, [vueY(`span`, g, [vueCt(ctx.$slots, `icon`, {}, () => [vueK(vueAn(mainLn), {
        size: 18
      })])]), vueY(`span`, {
        class: vueN([`min-w-0`, props.layout === `column` ? `` : `flex-1`])
      }, [vueY(`strong`, _, vueRr(props.title), 1), props.hint ? (vueGt(), vueS(`small`, v, vueRr(props.hint), 1)) : vueX(``, true)], 2), props.note ? (vueGt(), vueS(`em`, y, vueRr(props.note), 1)) : vueX(``, true)], 42, h));
    }
  });
export { b as t };