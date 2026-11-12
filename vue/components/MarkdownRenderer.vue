<template>
<div data-v-75b20e9b :class="`markdown-body text-[15px] leading-[1.8] text-[#1a1a1a] dark:text-foreground`" @click="te" @contextmenu="ee" @mouseover="j" @mouseleave="A" @focusin="j" @focusout="A" v-html="T.value"></div><component :is="Qe" to="body" />
</template>

<script setup>
import { S_to as to, S_is as is, S_v as v, S_T as T, S_A as A, S_j as j, S_ee as ee, S_te as te, S_Qe as Qe } from '../shared.js';
</script>

<style>
/* 从原应用 CSS 恢复（data-v-75b20e9b） */
[data-v-75b20e9b] h1,.markdown-body[data-v-75b20e9b] h2,.markdown-body[data-v-75b20e9b] h3{color:var(--markdown-heading);font-weight:600;line-height:1.35}
[data-v-75b20e9b] h1{margin-top:1.25em;margin-bottom:.6em;font-size:1.35em}
[data-v-75b20e9b] h2{margin-top:1.1em;margin-bottom:.5em;font-size:1.2em}
[data-v-75b20e9b] h3{margin-top:1em;margin-bottom:.45em;font-size:1.05em}
[data-v-75b20e9b] p{margin:.75em 0}
[data-v-75b20e9b] ul{margin:.6em 0;padding-left:1.8em;list-style-type:disc}
[data-v-75b20e9b] ol{margin:.6em 0;padding-left:1.5em;list-style-type:decimal}
[data-v-75b20e9b] li{margin:.35em 0}
[data-v-75b20e9b] ul>li::marker{color:var(--markdown-marker);font-size:.85em}
[data-v-75b20e9b] code{background:var(--markdown-code-background);border-radius:4px;padding:.15em .4em;font-family:Geist Mono,monospace;font-size:.875em}
[data-v-75b20e9b] pre{background:var(--markdown-pre-background);border-radius:8px;margin:.9em 0;padding:1em 1.1em;overflow-x:auto}
[data-v-75b20e9b] pre code{background:0 0;border-radius:0;padding:0;font-size:.8em}
[data-v-75b20e9b] blockquote{border-left:3px solid var(--markdown-quote-border);color:var(--markdown-muted);margin:.75em 0;padding-left:.75em}
[data-v-75b20e9b] table{border-collapse:collapse;width:100%;margin:.75em 0;font-size:.875em}
[data-v-75b20e9b] th,.markdown-body[data-v-75b20e9b] td{border:1px solid var(--markdown-table-border);text-align:left;padding:.4em .75em}
[data-v-75b20e9b] th{background:var(--markdown-table-heading-background);font-weight:500}
[data-v-75b20e9b] strong{font-weight:600}
[data-v-75b20e9b] hr{border:none;border-top:1px solid var(--markdown-divider);margin:1em 0}
[data-v-75b20e9b] a.markdown-local-file{color:var(--primary);cursor:pointer;overflow-wrap:anywhere;font-family:inherit;text-decoration:none}
[data-v-75b20e9b] a.markdown-local-file:hover{text-underline-offset:3px;-webkit-text-decoration:underline dashed;text-decoration:underline dashed}
[data-v-75b20e9b] .markdown-path-icon{vertical-align:-1px;width:13px;height:13px;-webkit-mask:var(--path-icon) center / contain no-repeat;mask:var(--path-icon) center / contain no-repeat;background:currentColor;margin-right:4px;display:inline-block}
[data-v-75b20e9b] .markdown-path-icon--file{--path-icon:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='black' stroke-width='1.7' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8zM14 2v6h6M8 13h8M8 17h5'/%3E%3C/svg%3E")}
[data-v-75b20e9b] .markdown-path-icon--folder{--path-icon:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='black' stroke-width='1.7' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M20 20H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h5l2 2h9a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2Z'/%3E%3C/svg%3E")}
[data-v-75b20e9b]{z-index:10000;pointer-events:none;overflow-wrap:anywhere;border-radius:14px;width:max-content;max-width:min(320px,100vw - 16px);padding:8px 10px;font-size:12px;line-height:1.5;position:fixed}
</style>
