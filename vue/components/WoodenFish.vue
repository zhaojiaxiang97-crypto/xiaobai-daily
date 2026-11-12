<template>
<component data-v-83bf586a :is="wt" name="fish-fade" />
</template>

<script setup>
import { S_is as is, S_wt as wt } from '../shared.js';
</script>

<style>
/* 从原应用 CSS 恢复（data-v-83bf586a） */
[data-v-83bf586a]{z-index:9999;pointer-events:auto;cursor:grab;flex-direction:column;align-items:center;display:flex;position:fixed;top:0;left:0}
[data-v-83bf586a]:active{cursor:grabbing}
[data-v-83bf586a]{cursor:pointer;background:0 0;border:none;border-radius:50%;outline:none;justify-content:center;align-items:center;width:64px;height:64px;padding:0;transition:transform .15s;display:flex;position:relative}
[data-v-83bf586a]:hover{transform:scale(1.06)}
[data-v-83bf586a]{cursor:grabbing;transform:none!important}
[data-v-83bf586a]{width:62px;height:52px;position:relative}
[data-v-83bf586a],.fish-fade-leave-active[data-v-83bf586a]{transition:opacity .3s,transform .3s cubic-bezier(.34,1.56,.64,1)}
[data-v-83bf586a],.fish-fade-leave-to[data-v-83bf586a]{opacity:0;transform:scale(.75)}
[data-v-83bf586a],.fish-fade-leave-from[data-v-83bf586a]{opacity:1;transform:scale(1)}
</style>
