<template>
<span :class="`inline-flex max-w-full items-center gap-1 rounded-md border border-border bg-muted/50 px-2 py-1 text-xs`"><span>{{ e }}</span><button :class="`shrink-0 cursor-pointer text-muted-foreground hover:text-foreground`" :disabled="u" :aria-label="i(`settings.websitePrivacy.remove`,{name:e})" @click="t=>a=a.filter(item=>item!==e)"><component :is="Nt" :size="12" /></button></span>
</template>

<script setup>
import md from './BaseSeparator.vue';
import { S_is as is, S_xs as xs, S_px as px, S_e as e, S_t as t, S_i as i, S_w as w, S_Nt as Nt } from '../shared.js';
const text = defineProps({
      open: {
        type: Boolean
      },
      domains: {},
      allowDomains: {},
      save: {
        type: Function
      }
    });
const n = text;
import { ref } from 'vue';

// [setup 还原] 原组件 setup 里初值不依赖 IPC 的声明
let a = ref([]);
let u = ref(false);
</script>
