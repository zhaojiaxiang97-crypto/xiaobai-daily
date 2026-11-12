<template>
<div ref="S" data-toolbox-scroll="" :class="`no-scrollbar absolute inset-0 overflow-y-auto overscroll-y-contain bg-background text-foreground`"><component :is="Be(k.value)" :ref="C" :tool="x.value" :user="_.value" :credits-balance="D.value" :credits-policy="b.value" :active="n.active" :open-request="A.value" @back="ce" @recharge="ue" @balanceupdated="le" @opentodo="e=>r(`openTodo`,e)" @openrequesthandled="e=>r(`milestoneOpenRequestHandled`,e)" /><component :is="gM" :open="w.value" @update:open="e=>w.value=e" @balancechanged="de" /></div>
</template>

<script setup>
import gM from './RechargeDialog.vue';
// [符号说明] D=useConfigProviderContext, k~ref, ue~指令, de~shallowRef
import { S_no as no, S_is as is, S_e as e, S_r as r, S__ as _, S_y as y, S_b as b, S_x as x, S_S as S, S_C as C, S_w as w, S_D as D, S_k as k, S_A as A, S_ce as ce, S_le as le, S_ue as ue, S_de as de, S_Be as Be } from '../shared.js';
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
</script>
