<template>
<p><span v-text="toDisplayString(t(`settings.dataTransfer.import.modes.${e}.name`))+toDisplayString(n.startsWith(`zh`)?`：`:`: `)+toDisplayString(t(`settings.dataTransfer.import.modes.${e}.desc`))" /></p>
</template>

<script setup>
import { toDisplayString } from 'vue';
import { S_zh as zh, S_e as e, S_t as t, S_n as n, S_p as p, S_v as v } from '../shared.js';
</script>
