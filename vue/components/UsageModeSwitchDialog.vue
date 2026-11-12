<template>
<component :is="_i" :open="flag.value" @update:open="e=>{e||f();}" />
</template>

<script setup>
import { S_is as is, S_flag as flag, S_e as e, S_f as f, S__i as _i } from '../shared.js';
</script>
