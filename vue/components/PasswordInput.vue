<template>
<div><component :is="Lp" :modelValue="o?.value" @update:modelvalue="e=>o.value=e" :type="a?`text`:`password`" :class="`h-10 pr-10`" :placeholder="e.placeholder" :autocomplete="e.autocomplete" :autofocus="e.autofocus" /><button type="button" :class="`absolute right-1.5 top-1/2 flex size-7 -translate-y-1/2 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-black/5 hover:text-foreground dark:hover:bg-accent`" :aria-label="a?i(`common.hide`):i(`common.show`)" @click="e=>a=!a"><component :is="Kn" :size="16" /></button></div>
</template>

<script setup>
import md from './BaseSeparator.vue';
import { S_is as is, S_i as i, S_y as y, S_Kn as Kn, S_pr as pr } from '../shared.js';
const e = defineProps({
      modelValue: {},
      placeholder: {
        default: ``
      },
      autocomplete: {
        default: `off`
      },
      autofocus: {
        type: Boolean,
        default: false
      }
    });
const n = e;

// [兜底] 模板引用但无来源的符号
const Lp = { value: undefined };
const o = { value: undefined };
import { ref } from 'vue';

// [setup 还原] 原组件 setup 里初值不依赖 IPC 的声明
let a = ref(false);
</script>
