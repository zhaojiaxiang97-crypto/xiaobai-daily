<template>
<div><section><span><component :is="vo" :size="22" /></span><div><p>{{ i(a(`giftTitle`)) }}</p><p><span>{{ u.value }}</span><span>{{ i(a(`giftCredits`)) }}</span><span><component :is="an" :size="12" />{{ i(a(`giftArrived`)) }}</span></p><p>{{ i(a(`giftUsage`)) }}</p></div></section><section :class="e.newRegistration?`mt-5`:``"><h2>{{ i(a(`capabilitiesTitle`)) }}</h2><ul></ul><p><component :is="sr" :class="`mt-0.5 size-3.5 shrink-0`" />{{ i(a(`screenPermissionMissing`)) }}</p></section><footer><component :is="P" :class="`h-9 cursor-pointer gap-2 px-4`" data-testid="onboarding-welcome-next" @click="e=>r(`next`)" /></footer></div>
</template>

<script setup>
import ul from './CalendarPrev.vue';
import { S_vo as vo, S_is as is, S_px as px, S_h2 as h2, S_r as r, S_i as i, S_a as a, S_u as u, S_p as p, S_P as P, S_mt as mt, S_an as an, S_sr as sr } from '../shared.js';
const e = defineProps({
      platform: {},
      newRegistration: {
        type: Boolean
      },
      credits: {},
      creditsLoading: {
        type: Boolean
      }
    });
const n = e;
</script>
