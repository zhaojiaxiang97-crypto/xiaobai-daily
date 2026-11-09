import { xt as e } from "../ui/Switch.js";
import { $n as t, An as n, Ct as r, S as i, bn as a, gt as o, j as s, k as c, rr as l, v as u, x as d, y as f } from "../chunks/vue-i18n.runtime.js";
import { E as p } from "../i18n/en-US-player.js";
import { Ln as m } from "../chunks/main.js";
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
  b = s({
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
        C = a(false),
        w = u(() => propsAlias.layout === `column` ? `min-h-24 flex-col items-center justify-center gap-1.5 px-4 py-5 text-center` : `min-h-[60px] items-center gap-3 px-3.5 py-3 text-left`),
        T = u(() => C.value ? `border-primary bg-primary/10` : propsAlias.selected ? `border-primary/40 bg-primary/[0.05] hover:border-primary hover:bg-primary/[0.08]` : `border-primary/35 bg-primary/[0.03] hover:border-primary hover:bg-primary/[0.07]`);
      function E(e) {
        C.value = false, !propsAlias.disabled && emitAlias(`drop`, Array.from(e.dataTransfer?.files || []));
      }
      return (ctx, renderCache) => (o(), i(`button`, {
        type: `button`,
        disabled: props.disabled,
        class: t(n(e)(`flex w-full rounded-[10px] border border-dashed transition-colors disabled:cursor-not-allowed disabled:opacity-60`, w.value, T.value, propsAlias.class)),
        onClick: renderCache[0] ||= e => emitAlias(`select`),
        onDragenter: renderCache[1] ||= p(e => C.value = !props.disabled, [`prevent`]),
        onDragover: renderCache[2] ||= p(e => C.value = !props.disabled, [`prevent`]),
        onDragleave: renderCache[3] ||= p(e => C.value = false, [`prevent`]),
        onDrop: p(E, [`prevent`])
      }, [f(`span`, g, [r(ctx.$slots, `icon`, {}, () => [c(n(m), {
        size: 18
      })])]), f(`span`, {
        class: t([`min-w-0`, props.layout === `column` ? `` : `flex-1`])
      }, [f(`strong`, _, l(props.title), 1), props.hint ? (o(), i(`small`, v, l(props.hint), 1)) : d(``, true)], 2), props.note ? (o(), i(`em`, y, l(props.note), 1)) : d(``, true)], 42, h));
    }
  });
export { b as t };