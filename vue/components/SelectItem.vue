<template>
<component :is="l" :value="({textValue:p.value})" />
</template>

<script setup>
// [符号说明] l~computed
import { S_is as is, S_as as as, S_l as l, S_p as p } from '../shared.js';
</script>
