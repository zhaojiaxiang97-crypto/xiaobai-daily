<template>
<component :is="An" :open="a.value" @update:open="e=>a.value=e" modal="" />
</template>

<script setup>
import { S_is as is, S_e as e, S_a as a, S_An as An } from '../shared.js';
</script>
