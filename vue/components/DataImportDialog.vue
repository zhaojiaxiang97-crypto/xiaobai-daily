<template>
<button type="button" :class="[`flex-col gap-0.5 px-3 py-2`,$H(l.value===e,e===`replace`?`danger`:`default`)]" :aria-pressed="l.value===e" :disabled="m.value" @click="t=>l.value=e"><span :class="[`absolute right-2.5 top-2.5 flex size-4 items-center justify-center rounded-full text-white`,e===`replace`?`bg-destructive`:`bg-primary`]"><component :is="an" :size="10" :stroke-width="3" /></span><span :class="[`pr-5 text-[13px] font-medium`,l.value===e?e===`replace`?`text-destructive`:`text-primary`:`text-(--foreground)`]"><span v-text="s(`settings.dataTransfer.import.modes.${e}.name`)" /></span><span><span v-text="s(`settings.dataTransfer.import.modes.${e}.desc`)" /></span></button>
</template>

<script setup>
import { S_is as is, S_px as px, S_t as t, S_s as s, S_l as l, S_m as m, S_v as v, S_an as an, S_pr as pr } from '../shared.js';
const e = defineProps({});
</script>
