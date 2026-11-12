<template>
<div :class="[`group relative rounded-md border cursor-pointer transition-all pl-3.5 py-3`,p.value===e.id?`border-primary bg-primary/[0.03] ring-1 ring-primary/20`:`border-[#eaeaea] hover:border-[#d5d5d5]`]" @click="t=>O(e.id)"><p>{{ e.name }}</p><p>{{ e.description }}</p><div><component :is="an" :class="`size-3 text-white`" stroke-width="3" /></div><div :class="`hidden group-hover:flex absolute top-2 right-2 items-center gap-0.5`" @click="withDirectives(()=>{},[`stop`])"><button :class="`inline-flex items-center justify-center size-6 rounded hover:bg-black/[0.05] text-[#999] hover:text-primary transition-colors cursor-pointer`" :title="n(`settings.promptTemplate.editTooltip`)" @click="withDirectives(t=>{O(e.id),A();},[`stop`])"><component :is="v" :class="`size-3`" /></button><button :class="`inline-flex items-center justify-center size-6 rounded hover:bg-red-50 text-[#999] hover:text-red-500 transition-colors cursor-pointer`" :title="n(`settings.promptTemplate.deleteTooltip`)" @click="withDirectives(t=>N(e.id),[`stop`])"><component :is="Ae" :class="`size-3`" /></button></div></div>
</template>

<script setup>
import { withDirectives } from 'vue';
import md from './BaseSeparator.vue';
import { S_is as is, S_e as e, S_t as t, S_n as n, S_p as p, S_v as v, S_O as O, S_A as A, S_N as N, S_Ae as Ae, S_an as an } from '../shared.js';
const items = defineProps({
      open: {
        type: Boolean
      },
      currentTemplateId: {},
      currentContent: {},
      language: {}
    });
</script>
