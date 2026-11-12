<template>
<component :is="Ti" as-child="" :orientation="i.orientation.value" :dir="i.dir.value" :loop="t" />
</template>

<script setup>
import { S_is as is, S_as as as, S_t as t, S_i as i, S_Ti as Ti } from '../shared.js';
</script>
