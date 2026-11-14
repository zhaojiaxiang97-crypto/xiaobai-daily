<template>
<component :is="fe" :ref="a" :as="n.as" :as-child="n.asChild" role="button" :aria-label="c?.value" data-reka-calendar-cell-trigger="" :aria-disabled="p?.value||l?.value?true:undefined" :data-selected="h?.value?true:undefined" :data-value="e.day.toString()" :data-disabled="p?.value?``:undefined" :data-unavailable="l?.value?``:undefined" :data-today="u?.value?``:undefined" :data-outside-view="d?.value?``:undefined" :data-outside-visible-view="f?.value?``:undefined" :data-focused="m?.value?``:undefined" :tabindex="m?.value?0:d?.value||p?.value?undefined:-1" @click="_" @keydown="xt(v,[`up`,`down`,`left`,`right`,`space`,`enter`])" />
</template>

<script setup>
import { S_is as is, S_as as as, S_up as up, S_e as e, S_a as a, S_fe as fe, S_xt as xt } from '../shared.js';
const t = defineProps({
      day: {
        type: null,
        required: true
      },
      month: {
        type: null,
        required: true
      },
      asChild: {
        type: Boolean,
        required: false
      },
      as: {
        type: null,
        required: false,
        default: `div`
      }
    });
const n = t;

// [兜底] 模板引用但无来源的符号
const c = { value: undefined };
const p = { value: undefined };
const l = { value: undefined };
const h = { value: undefined };
const u = { value: undefined };
const d = { value: undefined };
const f = { value: undefined };
const m = { value: undefined };

// [setup 还原] 原组件 setup 里初值不依赖 IPC 的声明
function _() {
  p.value || g(n.day);
}
function v(event) {
  if (p.value || (event.code === r.ENTER || event.code === r.SPACE_CODE) && (event.ctrlKey || event.metaKey || event.altKey)) return;
  event.preventDefault(), event.stopPropagation();
  let value = i.parentElement.value,
    a = i.dir.value === `rtl` ? -1 : 1;
  switch (event.code) {
    case r.ARROW_RIGHT:
      o(n.day, a);
      break;
    case r.ARROW_LEFT:
      o(n.day, -a);
      break;
    case r.ARROW_UP:
      o(n.day, -7);
      break;
    case r.ARROW_DOWN:
      o(n.day, 7);
      break;
    case r.ENTER:
    case r.SPACE_CODE:
      g(n.day);
  }
  function o(e, n) {
    let r = e.add({
      days: n
    });
    if (i.minValue.value && r.compare(i.minValue.value) < 0 || i.maxValue.value && r.compare(i.maxValue.value) > 0) return;
    let selector = value.querySelector(`[data-value='${r.toString()}']:not([data-outside-view])`);
    if (!selector) {
      if (n > 0) {
        if (i.isNextButtonDisabled()) return;
        i.nextPage();
      } else {
        if (i.isPrevButtonDisabled()) return;
        i.prevPage();
      }
      ut(() => {
        o(e, n);
      });
      return;
    }
    if (selector && selector.hasAttribute(`data-disabled`)) return o(r, n);
    i.onPlaceholderChange(r), selector?.focus();
  }
}
</script>
