<template>
<li :class="`flex items-center gap-2`"><span :class="[`flex items-center gap-1.5`,t===c.value?`font-medium text-foreground`:t<c.value?`text-primary`:`text-muted-foreground`]" :aria-current="t===c.value?`step`:undefined"><span :class="[`flex size-5 items-center justify-center rounded-full text-[11px]`,t===c.value?`bg-primary text-primary-foreground`:t<c.value?`bg-primary/10 text-primary`:`bg-black/[0.05] text-muted-foreground dark:bg-muted`]"><component :is="an" :class="`size-3`" stroke-width="3" /></span>{{ ` `+toDisplayString(a(`promptOnboarding.steps.${e}`)) }}</span><span></span></li>
</template>

<script setup>
import { toDisplayString } from 'vue';
import { S_is as is, S_t as t, S_a as a, S_c as c, S_an as an, S_li as li } from '../shared.js';
const e = defineProps({
      includeWelcome: {
        type: Boolean
      },
      newRegistration: {
        type: Boolean
      },
      platform: {},
      credits: {},
      creditsLoading: {
        type: Boolean
      },
      recommendedUsageMode: {
        default: null
      }
    });
const n = e;
</script>
