<template>
<code data-v-4f389e00><span>{{ c?.value }}</span><span :class="[`inline-code-stream-delta`,[m]]" @animationend="p">{{ l }}</span></code>
</template>

<script setup>

// [兜底] 模板引用但无来源的符号
const c = { value: undefined };
import { ref, computed } from 'vue';

// [setup 还原] 原组件 setup 里初值不依赖 IPC 的声明
let l = ref(``);
let counter = ref(0);
function p() {
  l.value &&= (c.value = d(), ``);
}
let m = computed(() => counter.value % 2 == 0 ? `inline-code-stream-delta--a` : `inline-code-stream-delta--b`);
</script>

<style>
/* 从原应用 CSS 恢复（data-v-4f389e00） */
[data-v-4f389e00]{font-family:var(--ms-font-mono);font-size:.8125em;line-height:inherit;color:var(--inline-code-fg);background-color:var(--inline-code-bg);white-space:normal;word-break:break-word;-webkit-box-decoration-break:clone;box-decoration-break:clone;border-radius:.25em;max-width:100%;padding:.15em .35em;display:inline}
[data-v-4f389e00]{animation-duration:var(--stream-update-fade-duration,var(--typewriter-fade-duration,.9s));animation-timing-function:var(--stream-update-fade-ease,var(--typewriter-fade-ease,ease-out));will-change:opacity;animation-fill-mode:both}
[data-v-4f389e00]{animation-name:inline-code-stream-update-fade-a-4f389e00}
[data-v-4f389e00]{animation-name:inline-code-stream-update-fade-b-4f389e00}
[data-v-4f389e00]{animation:none!important}
</style>
