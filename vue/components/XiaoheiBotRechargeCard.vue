<template>
<component data-v-42829643 :is="JL" :value="String(e.amount)" :class="`recharge-option`" />
</template>

<script setup>
import JL from './ToggleGroupItem.vue';
import { S_is as is } from '../shared.js';
const e = defineProps({});
</script>

<style>
/* 从原应用 CSS 恢复（data-v-42829643） */
[data-v-42829643]{text-align:left;width:min(380px,100%);margin-top:12px}
[data-v-42829643]{align-items:center;gap:6px;display:flex}
[data-v-42829643]{flex:1;min-width:0}
[data-v-42829643]{letter-spacing:.06em;color:var(--primary);align-items:center;gap:5px;margin-bottom:9px;font-size:10px;display:flex}
[data-v-42829643]{object-fit:contain;flex-shrink:0;width:104px;height:104px}
[data-v-42829643]{grid-template-columns:repeat(4,minmax(0,1fr));width:100%;display:grid}
[data-v-42829643] .recharge-option{flex-direction:column;gap:4px;min-width:0;height:auto;min-height:60px;padding:9px 6px;display:flex}
[data-v-42829643] .recharge-option[data-state=on]{border-color:var(--primary);background:color-mix(in srgb, var(--primary) 6%, var(--card));color:var(--primary)}
[data-v-42829643]{color:var(--muted-foreground);white-space:normal;text-align:center;font-size:10px;font-weight:400;line-height:1.3}
[data-v-42829643]{width:80px;height:80px}
</style>
