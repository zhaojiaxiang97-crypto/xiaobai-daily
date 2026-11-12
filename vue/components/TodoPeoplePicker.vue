<template>
<div><div><component :is="Cs" :size="14" :stroke-width="1.8" :class="`shrink-0 text-[#9ca3af]`" /><span v-text="Xe(createElementVNode(`input`,{'onUpdate:modelValue':n[0]||=e=>a.value=e,class:`h-10 min-w-0 flex-1 bg-transparent text-sm text-[#111827] outline-none placeholder:text-[#9ca3af]`,placeholder:i(`todo.newTask.peopleSearchPlaceholder`),onInput:n[1]||=e=>{s.value=null,c.value=``;},onKeydown:xt(x,[`enter`])},null,40,qce),[[yt,a.value]])" /><component :is="zn" :size="14" :stroke-width="1.8" :class="`shrink-0 animate-spin text-[#9ca3af]`" /></div><div><button type="button" :class="`flex w-full items-center gap-2 rounded-md px-2 py-2 text-left text-sm text-[#16a34a] transition-colors hover:bg-[#f0fdf4] disabled:opacity-60`" :disabled="o.value" @click="y"><component :is="Cs" :size="14" :stroke-width="1.8" :class="`shrink-0`" /><span><span v-text="i(`todo.newTask.lookupEmail`,{email:a.value.trim()})" /></span></button><p>{{ m.value?i(`todo.newTask.peopleNoMatch`):i(`todo.assigneeDialog.emptyFriends`) }}</p></div><div><component :is="W_" compact="" :name="event.displayName(s.value)" :email="s.value.email" :avatar-url="event.avatarUrl(s.value)" :initial="event.initial(s.value)" :selected="f(s.value)" :show-add-friend="event.canAddFriend(s.value)" :adding-friend="event.isAddingFriend(s.value)" :add-friend-label="i(`todo.assigneeDialog.addFriend`)" :add-friend-title="event.addFriendTitle" @select="e=>v(s.value)" @addfriend="e=>b(s.value)" /></div><div>{{ c.value }}</div></div>
</template>

<script setup>
import { createElementVNode } from 'vue';
import md from './BaseSeparator.vue';
import W_ from './TodoPersonSearchResult.vue';
import { S_is as is, S_Cs as Cs, S_sm as sm, S_qce as qce, S_px as px, S_e as e, S_i as i, S_a as a, S_o as o, S_s as s, S_c as c, S_f as f, S_p as p, S_m as m, S_v as v, S_y as y, S_b as b, S_x as x, S_w as w, S_Xe as Xe, S_yt as yt, S_xt as xt, S_zn as zn } from '../shared.js';
const event = defineProps({
      selected: {},
      options: {},
      displayName: {
        type: Function
      },
      avatarUrl: {
        type: Function
      },
      initial: {
        type: Function
      },
      resolveEmail: {
        type: Function
      },
      canAddFriend: {
        type: Function
      },
      isAddingFriend: {
        type: Function
      },
      addFriend: {
        type: Function
      },
      addFriendTitle: {}
    });
const n = event;
</script>
