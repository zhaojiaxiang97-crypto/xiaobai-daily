<template>
<label data-v-bf56fc0d :class="[`member-candidate`,{'member-candidate--joined':A.has(e.id)}]" @click="withDirectives(t=>!A.has(e.id)&&ee(e.id,!j.includes(e.id)),[`prevent`])"><span :class="[`contact-avatar contact-avatar--member`,`contact-avatar--${e.kind}`]"><img :src="te(e)" alt="" /></span><span><strong>{{ e.name }}</strong><span>{{ M(e) }}</span></span><component :is="Pp" variant="secondary" /></label>
</template>

<script setup>
import { withDirectives } from 'vue';
import Pp from './Badge.vue';
// [符号说明] M~computed
import { S_is as is, S_alt as alt, S_t as t, S_A as A, S_j as j, S_ee as ee, S_te as te, S_M as M } from '../shared.js';
const e = defineProps({});
</script>

<style>
/* 从原应用 CSS 恢复（data-v-bf56fc0d） */
[data-v-bf56fc0d]{padding:4px 20px 16px}
[data-v-bf56fc0d]{height:34px}
[data-v-bf56fc0d]{scrollbar-width:thin;max-height:300px;margin-top:10px;overflow:hidden auto}
[data-v-bf56fc0d]{cursor:default}
[data-v-bf56fc0d]{color:var(--muted-foreground);text-align:center;padding:42px 16px;font-size:11px}
[data-v-bf56fc0d]{background:color-mix(in srgb, var(--muted) 34%, var(--background));margin:0;padding:13px 20px 16px}
[data-v-bf56fc0d]{gap:8px}
[data-v-bf56fc0d]{flex-wrap:nowrap}
[data-v-bf56fc0d]{width:36px;height:36px}
[data-v-bf56fc0d] [data-slot=item-content]{min-width:0}
[data-v-bf56fc0d] [data-slot=item-description]{-webkit-line-clamp:1;-webkit-box-orient:vertical;display:-webkit-box;overflow:hidden}
</style>
