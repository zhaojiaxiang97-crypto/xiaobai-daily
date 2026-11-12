<template>
<component :is="Ei" :checked="l.value" :disabled="s.value" as-child="" :focusable="!s.value" :active="l.value" />
</template>

<script setup>
// [符号说明] l~computed
import { S_is as is, S_as as as, S_s as s, S_l as l, S_Ei as Ei } from '../shared.js';
</script>
