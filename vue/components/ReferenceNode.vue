<template>
<span data-v-775c65e4 :class="`reference-node cursor-pointer text-xs rounded-md px-1.5 mx-0.5`" role="button" tabindex="0" @click="n=>t.$emit(`click`,n,e.node.id,e.messageId,e.threadId)" @mouseenter="n=>t.$emit(`mouseEnter`,n,e.node.id,e.messageId,e.threadId)" @mouseleave="n=>t.$emit(`mouseLeave`,n,e.node.id,e.messageId,e.threadId)">{{ e.node.id }}</span>
</template>

<script setup>
import md from './BaseSeparator.vue';
import { S_xs as xs, S_px as px, S_mx as mx, S_e as e, S_t as t, S_n as n } from '../shared.js';
</script>

<style>
/* 从原应用 CSS 恢复（data-v-775c65e4） */
[data-v-775c65e4]{background-color:hsl(var(--ms-muted));color:hsl(var(--ms-muted-foreground))}
[data-v-775c65e4]:hover{background-color:hsl(var(--ms-secondary))}
</style>
