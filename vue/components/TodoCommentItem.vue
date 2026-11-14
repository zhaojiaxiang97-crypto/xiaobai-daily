<template>
<div :id="`todo-comment-${items.activity.id}`" :class="[`group flex items-start gap-2.5 rounded-lg px-2 py-1.5 transition-colors`,items.active?`bg-[#f0fdf4]`:`hover:bg-[#f9fafb]`]"><span :class="[`flex shrink-0 items-center justify-center overflow-hidden rounded-full bg-primary/10 font-bold text-primary`,items.reply?`size-6 text-[11px]`:`size-8 text-xs`]"><img :src="items.activity.user.avatarUrl" :class="`size-full object-cover`" /></span><div><div><span>{{ s?.value }}</span><span>{{ toDisplayString(i(`todo.activity.replyTo`))+` ` }}<span>{{ `@`+toDisplayString(d?.value) }}</span></span><span :class="`shrink-0 text-[#9ca3af]`" :title="Sv(items.activity.createdAt)">{{ l?.value }}</span><span><button type="button" :class="`inline-flex h-6 items-center justify-center rounded-md px-1 text-[#9ca3af] transition-colors hover:bg-[#f3f4f6] hover:text-[#111827]`" :title="i(`todo.activity.reply`)" @click="t=>r(`reply`,items.activity)"><component :is="Qo" :size="14" :stroke-width="1.8" /></button><button type="button" :class="[`inline-flex h-6 items-center justify-center gap-1 rounded-md px-1 text-xs transition-colors`,a?`bg-[#fef2f2] text-[#ef4444]`:`text-[#9ca3af] hover:bg-[#f3f4f6] hover:text-[#ef4444]`]" :title="i(`todo.activity.delete`)" @click="f"><component :is="Ae" :size="14" :stroke-width="1.8" /><span>{{ i(`todo.activity.confirmDelete`) }}</span></button></span></div><component :is="ple" :content="items.activity.content" :mention-names="u?.value" :class="`mt-0.5`" /></div></div>
</template>

<script setup>
import { toDisplayString } from 'vue';
import md from './BaseSeparator.vue';
import ple from './TodoCommentBody.vue';
import { S_Qo as Qo, S_is as is, S_xs as xs, S_lg as lg, S_Sv as Sv, S_px as px, S_t as t, S_r as r, S_i as i, S_Ae as Ae, S_mt as mt } from '../shared.js';
const items = defineProps({
      activity: {},
      now: {},
      reply: {
        type: Boolean
      },
      showReplyTarget: {
        type: Boolean
      },
      active: {
        type: Boolean
      }
    });
const n = items;

// [兜底] 模板引用但无来源的符号
const s = { value: undefined };
const d = { value: undefined };
const l = { value: undefined };
const u = { value: undefined };
import { ref } from 'vue';

// [setup 还原] 原组件 setup 里初值不依赖 IPC 的声明
let a = ref(false);
function f() {
  if (!a.value) {
    a.value = true, attributes = setTimeout(() => {
      a.value = false;
    }, 3e3);
    return;
  }
  attributes && clearTimeout(attributes), a.value = false, r(`remove`, n.activity);
}
</script>
