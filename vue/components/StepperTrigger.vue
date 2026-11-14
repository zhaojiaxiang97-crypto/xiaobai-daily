<template>
<component :is="fe" :ref="s" :type="e.as===`button`?`button`:undefined" :as="e.as" :as-child="e.asChild" :data-state="n.state.value" :disabled="n.disabled.value||!n.isFocusable.value?``:undefined" :data-disabled="n.disabled.value||!n.isFocusable.value?``:undefined" :data-orientation="t.orientation.value" :tabindex="n.isFocusable.value?0:-1" :aria-describedby="n.descriptionId" :aria-labelledby="n.titleId" @mousedown="withDirectives(a,[`left`])" @keydown="xt(o,[`enter`,`space`,`left`,`right`,`up`,`down`])" />
</template>

<script setup>
import { withDirectives } from 'vue';

// [setup 还原] 原组件 setup 里初值不依赖 IPC 的声明
function a(e) {
  if (!n.disabled.value) {
    if (t.linear.value) {
      if ((n.step.value <= t.modelValue.value || n.step.value === t.modelValue.value + 1) && e.ctrlKey === false) {
        t.changeModelValue(n.step.value);
        return;
      }
    } else if (e.ctrlKey === false) {
      t.changeModelValue(n.step.value);
      return;
    }
    e.preventDefault();
  }
}
function o(e) {
  e.preventDefault(), !n.disabled.value && ((e.key === r.ENTER || e.key === r.SPACE) && !e.ctrlKey && !e.shiftKey && t.changeModelValue(n.step.value), [r.ARROW_LEFT, r.ARROW_RIGHT, r.ARROW_UP, r.ARROW_DOWN].includes(e.key) && Vr(e, ke(), undefined, {
    itemsArray: i.value,
    focus: true,
    loop: false,
    arrowKeyOptions: t.orientation.value,
    dir: t.dir.value
  }));
}
// [符号说明] n~computed
import { S_is as is, S_as as as, S_up as up, S_state as state, S_e as e, S_t as t, S_n as n, S_s as s, S_fe as fe, S_xt as xt } from '../shared.js';
</script>
