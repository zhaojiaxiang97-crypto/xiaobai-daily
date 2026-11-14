<template>
<div ref="S" data-toolbox-scroll="" :class="`no-scrollbar absolute inset-0 overflow-y-auto overscroll-y-contain bg-background text-foreground`"><component :is="Be(k?.value)" :ref="C" :tool="x" :user="_" :credits-balance="D?.value" :credits-policy="b?.value" :active="n.active" :open-request="A?.value" @back="ce" @recharge="ue" @balanceupdated="le" @opentodo="e=>r(`openTodo`,e)" @openrequesthandled="e=>r(`milestoneOpenRequestHandled`,e)" /><component :is="gM" :open="w" @update:open="e=>w=e" @balancechanged="de" /></div>
</template>

<script setup>
import gM from './RechargeDialog.vue';
import { S_no as no, S_is as is, S_e as e, S_r as r, S_S as S, S_Be as Be } from '../shared.js';
const items = defineProps({
      active: {
        type: Boolean,
        default: true
      },
      markdownOpenRequest: {
        default: null
      },
      milestoneOpenRequest: {
        default: null
      },
      toolOpenRequest: {
        default: null
      }
    });
const n = items;

// [兜底] 模板引用但无来源的符号
const k = { value: undefined };
const D = { value: undefined };
const b = { value: undefined };
const A = { value: undefined };
import { ref } from 'vue';

// [setup 还原] 原组件 setup 里初值不依赖 IPC 的声明
let _ = ref(null);
let counter = ref(0);
let y = ref(false);
let x = ref(null);
let C = ref(null);
let w = ref(false);
async function ce() {
  (!C.value?.requestClose || (await C.value.requestClose())) && se();
}
function le(e) {
  _.value && (_.value.balance = e), re();
}
function ue() {
  _.value && (w.value = true);
}
function de(e) {
  counter.value = e, y.value = true, N().then(re).catch(() => undefined);
}
</script>
