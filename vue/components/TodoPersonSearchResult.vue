<template>
<div :class="[`flex items-center gap-2 rounded-lg border border-[#e5e7eb] bg-[#f9fafb] transition-colors hover:border-[#86efac] hover:bg-[#f0fdf4]`,e.compact?`px-2.5 py-2`:`px-3 py-2`]"><button type="button" :class="[`flex min-w-0 flex-1 items-center gap-2 text-left`,{'cursor-not-allowed opacity-60':e.selected}]" :disabled="e.selected" @click="e=>t.$emit(`select`)"><span :class="[`flex shrink-0 items-center justify-center overflow-hidden rounded-full bg-primary/10 font-bold text-primary`,e.compact?`size-7 text-xs`:`size-8 text-sm`]"><img :src="e.avatarUrl" :class="`size-full object-cover`" /></span><span><span>{{ e.name }}</span><span>{{ e.email }}</span></span></button><button type="button" :class="`inline-flex h-7 shrink-0 items-center gap-1 whitespace-nowrap rounded-lg border border-[#bbf7d0] bg-[#f0fdf4] px-2 text-xs font-semibold text-[#16a34a] transition-colors hover:bg-[#dcfce7] disabled:cursor-not-allowed disabled:opacity-60`" :title="e.addFriendTitle||e.addFriendLabel" :disabled="e.addingFriend" @click="withDirectives(e=>t.$emit(`addFriend`),[`stop`])"><component :is="zn" :size="13" :stroke-width="1.8" :class="`animate-spin`" />{{ ` `+toDisplayString(e.addFriendLabel) }}</button></div>
</template>

<script setup>
import { toDisplayString, withDirectives } from 'vue';
import { S_is as is, S_xs as xs, S_sm as sm, S_lg as lg, S_px as px, S_t as t, S_w as w, S_zn as zn } from '../shared.js';
const e = defineProps({
      name: {},
      email: {},
      avatarUrl: {},
      initial: {},
      selected: {
        type: Boolean
      },
      showAddFriend: {
        type: Boolean
      },
      addingFriend: {
        type: Boolean
      },
      addFriendLabel: {},
      addFriendTitle: {},
      compact: {
        type: Boolean
      }
    });
</script>
