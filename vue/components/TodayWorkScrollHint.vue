<template>
<component data-v-9cf0750d :is="wt" name="scroll-hint" />
</template>

<script setup>
import { S_is as is, S_wt as wt } from '../shared.js';
</script>

<style>
/* 从原应用 CSS 恢复（data-v-9cf0750d） */
[data-v-9cf0750d]{animation:1.4s ease-in-out .3s 3 scroll-hint-nudge-9cf0750d}
[data-v-9cf0750d]{transition:opacity .3s ease-out,transform .3s ease-out}
[data-v-9cf0750d]{transition:opacity .2s ease-in}
[data-v-9cf0750d]{opacity:0;transform:translateY(6px)}
[data-v-9cf0750d]{opacity:0}
[data-v-9cf0750d]{animation:none}
[data-v-9cf0750d]{transform:none}
</style>
