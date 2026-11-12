<template>
<component :is="l" :value="({textValue:p.value})" />
</template>

<script setup>
import { S_is as is, S_as as as, S_l as l, S_p as p } from '../shared.js';
</script>
