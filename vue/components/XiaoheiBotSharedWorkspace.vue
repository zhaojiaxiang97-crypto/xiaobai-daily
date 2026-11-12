<template>
<div :class="`flex flex-wrap items-center justify-between gap-2 text-sm`"><span>{{ toDisplayString(new Date(e.createdAt).toLocaleString())+` · `+toDisplayString(e.actor===`user`?t(`xiaoheiBot.sharedWorkspace.user`):e.actor===`external`?t(`xiaoheiBot.sharedWorkspace.external`):t(`xiaoheiBot.sharedWorkspace.bot`)) }}</span><component :is="P" variant="outline" size="xs" :disabled="c||a" @click="t=>b(e.id)" /></div>
</template>

<script setup>
import { toDisplayString } from 'vue';
import { S_is as is, S_xs as xs, S_sm as sm, S_e as e, S_t as t, S_a as a, S_c as c, S_b as b, S_P as P } from '../shared.js';
</script>
