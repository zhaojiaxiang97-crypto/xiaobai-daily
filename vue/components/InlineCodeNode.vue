<template>
<code data-v-4f389e00><span>{{ c.value }}</span><span :class="[`inline-code-stream-delta`,[m.value]]" @animationend="p">{{ l.value }}</span></code>
</template>

<script setup>
// [符号说明] l~computed
import { S_c as c, S_l as l, S_p as p, S_m as m } from '../shared.js';
</script>

<style>
/* 从原应用 CSS 恢复（data-v-4f389e00） */
[data-v-4f389e00]{font-family:var(--ms-font-mono);font-size:.8125em;line-height:inherit;color:var(--inline-code-fg);background-color:var(--inline-code-bg);white-space:normal;word-break:break-word;-webkit-box-decoration-break:clone;box-decoration-break:clone;border-radius:.25em;max-width:100%;padding:.15em .35em;display:inline}
[data-v-4f389e00]{animation-duration:var(--stream-update-fade-duration,var(--typewriter-fade-duration,.9s));animation-timing-function:var(--stream-update-fade-ease,var(--typewriter-fade-ease,ease-out));will-change:opacity;animation-fill-mode:both}
[data-v-4f389e00]{animation-name:inline-code-stream-update-fade-a-4f389e00}
[data-v-4f389e00]{animation-name:inline-code-stream-update-fade-b-4f389e00}
[data-v-4f389e00]{animation:none!important}
</style>
