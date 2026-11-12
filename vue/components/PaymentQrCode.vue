<template>
<div data-preserve-light-surface="" :class="`box-border flex items-center justify-center rounded-lg border border-black/10 bg-white p-3`" :style="at(s.value)"><img :src="n.value" :alt="text.alt" :class="`block`" :style="at(o.value)" @error="c" /></div>
</template>

<script setup>
// [符号说明] n~computed
import { S_lg as lg, S_alt as alt, S_n as n, S_o as o, S_s as s, S_c as c, S_p as p, S_at as at } from '../shared.js';
const text = defineProps({
      value: {},
      alt: {
        default: `支付二维码`
      },
      size: {
        default: 180
      },
      unavailableText: {
        default: `二维码生成失败`
      }
    });
const t = text;
</script>
