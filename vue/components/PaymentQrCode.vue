<template>
<div data-preserve-light-surface="" :class="`box-border flex items-center justify-center rounded-lg border border-black/10 bg-white p-3`" :style="s?.value"><img :src="n" :alt="text.alt" :class="`block`" :style="o?.value" @error="c" /></div>
</template>

<script setup>
import { S_lg as lg, S_alt as alt, S_p as p, S_at as at } from '../shared.js';
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

// [兜底] 模板引用但无来源的符号
const s = { value: undefined };
const o = { value: undefined };
import { ref } from 'vue';

// [setup 还原] 原组件 setup 里初值不依赖 IPC 的声明
let n = ref(``);
function c() {
  i.value = true, n.value = ``;
}
</script>
