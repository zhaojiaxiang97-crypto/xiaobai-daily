<template>
<div ref="state" :style="at({display:`flex`,flexDirection:`column`,position:`fixed`,zIndex:_.value})"><component :is="fe" /></div>
</template>

<script setup>
import { S_is as is, S_as as as, S_state as state, S__ as _, S_fe as fe, S_at as at } from '../shared.js';
</script>
