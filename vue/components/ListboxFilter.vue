<template>
<component :is="fe" :ref="o" :as="e.as" :as-child="e.asChild" :value="i" :disabled="c?.value?``:undefined" :data-disabled="c?.value?``:undefined" :aria-disabled="c?.value??undefined" :aria-activedescendant="state" type="text" @keydown="xt(_,[`down`,`up`,`home`,`end`])" @input="g" @compositionstart="h" @compositionupdate="p" @compositionend="m" />
</template>

<script setup>

// [兜底] 模板引用但无来源的符号
import { S_is as is, S_as as as, S_up as up, S_e as e, S_i as i, S_o as o, S_p as p, S_m as m, S_fe as fe, S_xt as xt } from '../shared.js';
const c = { value: undefined };
import { ref } from 'vue';

// [setup 还原] 原组件 setup 里初值不依赖 IPC 的声明
let state = ref();
function h() {
  a.onCompositionStart(), f();
}
function g(event) {
  d.value || (i.value = event.target.value, a.highlightFirstItem());
}
function _(event) {
  u.value || (event.preventDefault(), a.onKeydownNavigation(event));
}
</script>
