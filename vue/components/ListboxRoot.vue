<template>
<component :is="fe" :ref="h" :as="event.as" :as-child="event.asChild" :dir="v" :data-disabled="u?``:undefined" @pointerleave="de" @focusout="async e=>{let t=e.relatedTarget||e.target;await ut(),D&&g&&!g.contains(t)&&de(e);}" />
</template>

<script setup>

// [兜底] 模板引用但无来源的符号
// [符号说明] u=useConfigProviderContext
import { S_is as is, S_as as as, S_by as by, S_e as e, S_t as t, S_u as u, S_g as g, S_v as v, S_fe as fe, S_ut as ut } from '../shared.js';
const h = { value: undefined };
const event = { value: undefined };
import { ref } from 'vue';

// [setup 还原] 原组件 setup 里初值不依赖 IPC 的声明
let D = ref(null);
function de(e) {
  let value = D.value;
  value?.isConnected && (O.value = value), D.value = null, a(`leave`, e);
}
</script>
