<template>
<component :is="Wc" data-slot="avatar" :data-size="e.size??`default`" :class="je(QNt({size:e.size}),t.class)" />
</template>

<script setup>
import Wc from './AvatarRoot.vue';
import { S_is as is, S_QNt as QNt, S_je as je } from '../shared.js';
const e = defineProps({
      class: {
        type: [Boolean, null, String, Object, Array]
      },
      size: {}
    });
const t = e;
</script>
