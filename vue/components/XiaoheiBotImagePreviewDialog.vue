<template>
<component :is="ui" :open="n" @update:open="e=>$e(n)?n.value=e:null" />
</template>

<script setup>
// [符号说明] n~computed
import { S_is as is, S_n as n, S_$e as $e, S_ui as ui } from '../shared.js';
const e = defineProps({});
</script>
