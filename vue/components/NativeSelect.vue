<template>
<div :class="`group/native-select relative w-fit has-[select:disabled]:opacity-50`" data-slot="native-select-wrapper" :data-size="n.size??`default`"><span v-text="Xe(createElementVNode(`select`,ot({...e.$attrs,...i},{'onUpdate:modelValue':t[0]||=e=>$e(r)?r.value=e:null,'data-slot':`native-select`,'data-size':n.size??`default`,class:je(`border-input placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 dark:hover:bg-input/50 focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:aria-invalid:border-destructive/50 h-8 w-full min-w-0 appearance-none rounded-lg border bg-transparent py-1 pr-8 pl-2.5 text-sm transition-colors select-none focus-visible:ring-3 aria-invalid:ring-3 data-[size=sm]:h-7 data-[size=sm]:rounded-[min(var(--radius-md),10px)] data-[size=sm]:py-0.5 outline-none disabled:pointer-events-none disabled:cursor-not-allowed`,n.class)}),[withCtx(e.$slots,`default`)],16,CN),[[bt,r]])" /><component :is="un" :class="`text-muted-foreground top-1/2 right-2.5 size-4 -translate-y-1/2 pointer-events-none absolute select-none`" aria-hidden="true" data-slot="native-select-icon" /></div>
</template>

<script setup>
import { createElementVNode, withCtx } from 'vue';
import md from './BaseSeparator.vue';
import { S_is as is, S_sm as sm, S_lg as lg, S_CN as CN, S_t as t, S_r as r, S_i as i, S_v as v, S_y as y, S_w as w, S_je as je, S_Xe as Xe, S_$e as $e, S_ot as ot, S_bt as bt, S_un as un, S_pr as pr } from '../shared.js';
const e = defineProps({
      modelValue: {},
      class: {
        type: [Boolean, null, String, Object, Array]
      },
      size: {}
    });
const n = e;
</script>
