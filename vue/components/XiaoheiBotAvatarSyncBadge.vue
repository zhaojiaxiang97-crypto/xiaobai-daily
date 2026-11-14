<template>
<span data-v-e225bcc7 :class="[`avatar-sync-badge`,`avatar-sync-badge--${e.size}`]" aria-hidden="true"><component :is="ns" :size="n?.value" :stroke-width="2" /></span>
</template>

<script setup>
import { S_ns as ns, S_is as is, S_sm as sm } from '../shared.js';
const e = defineProps({
      size: {
        default: `sm`
      }
    });
const t = e;

// [兜底] 模板引用但无来源的符号
const n = { value: undefined };
</script>

<style>
/* 从原应用 CSS 恢复（data-v-e225bcc7） */
[data-v-e225bcc7]{z-index:2;pointer-events:none;color:#fff;box-sizing:border-box;background:#8b7cf6;justify-content:center;align-items:center;display:inline-flex;position:absolute;bottom:0;right:0}
[data-v-e225bcc7]{border-radius:50%;width:12px;height:12px}
[data-v-e225bcc7]{border-radius:50%;width:13px;height:13px}
[data-v-e225bcc7] svg{display:block}
</style>
