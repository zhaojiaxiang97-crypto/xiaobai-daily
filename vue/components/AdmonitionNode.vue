<template>
<div data-v-a3a8afce :class="[`admonition`,[`admonition-${r.node.kind}`]]"><div :id="c" :class="`admonition-legend`"><svg></svg><span>{{ a.value }}</span><button :class="`admonition-toggle`" :aria-expanded="!o.value" :aria-controls="`${c}-content`" @click="s"><svg :style="at({rotate:o.value?`0deg`:`90deg`})" xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></svg></button></div><span v-text="Xe(createElementVNode(`div`,{id:`${c}-content`,class:`admonition-content`,'aria-labelledby':c},[resolveComponent(s$,{'index-key':`admonition-${items.indexKey}`,nodes:r.node.children,'custom-id':r.customId,typewriter:r.typewriter,onCopy:n[0]||=e=>i(`copy`,e)},null,8,[`index-key`,`nodes`,`custom-id`,`typewriter`])],8,h3e),[[Tt,!o.value]])" /></div>
</template>

<script setup>
import { createElementVNode, resolveComponent } from 'vue';
// [符号说明] n~computed
import { S_s$ as s$, S_h3e as h3e, S_e as e, S_n as n, S_i as i, S_a as a, S_o as o, S_s as s, S_c as c, S_v as v, S_Xe as Xe, S_at as at, S_Tt as Tt } from '../shared.js';
const items = defineProps({
      node: {},
      indexKey: {},
      isDark: {
        type: Boolean
      },
      typewriter: {
        type: Boolean
      },
      customId: {}
    });
const r = items;
</script>

<style>
/* 从原应用 CSS 恢复（data-v-a3a8afce） */
[data-v-a3a8afce]{margin:var(--ms-flow-admonition-y) 0;border:1px solid var(--admonition-border);border-radius:var(--ms-radius);color:var(--admonition-fg);padding:.25em .75em .375em;position:relative}
[data-v-a3a8afce]{background-color:hsl(var(--ms-background));align-items:center;gap:.35em;padding:0 .5em;font-size:.8125rem;font-weight:600;line-height:1;display:inline-flex;position:absolute;top:0;left:.75em;transform:translateY(-50%)}
[data-v-a3a8afce]{flex-shrink:0}
[data-v-a3a8afce]{white-space:nowrap}
[data-v-a3a8afce]{color:var(--admonition-fg);padding-top:.25em}
[data-v-a3a8afce],.admonition-info[data-v-a3a8afce]{border-color:hsl(var(--ms-info) / .3);background-color:hsl(var(--ms-info) / .04)}
[data-v-a3a8afce],.admonition-info .admonition-legend[data-v-a3a8afce]{color:var(--admonition-note)}
[data-v-a3a8afce]{border-color:hsl(var(--ms-success) / .3);background-color:hsl(var(--ms-success) / .04)}
[data-v-a3a8afce]{color:var(--admonition-tip)}
[data-v-a3a8afce],.admonition-caution[data-v-a3a8afce]{border-color:hsl(var(--ms-warning) / .3);background-color:hsl(var(--ms-warning) / .04)}
[data-v-a3a8afce],.admonition-caution .admonition-legend[data-v-a3a8afce]{color:var(--admonition-warning)}
[data-v-a3a8afce],.admonition-error[data-v-a3a8afce]{border-color:hsl(var(--ms-destructive) / .3);background-color:hsl(var(--ms-destructive) / .04)}
[data-v-a3a8afce],.admonition-error .admonition-legend[data-v-a3a8afce]{color:var(--admonition-danger)}
[data-v-a3a8afce]{color:inherit;cursor:pointer;border-radius:calc(var(--ms-radius) * .5);transition:background-color var(--ms-duration-fast) var(--ms-ease-standard);background:0 0;border:none;align-items:center;margin-left:.25em;padding:.125rem;display:inline-flex}
[data-v-a3a8afce]:hover{background-color:hsl(var(--ms-accent))}
[data-v-a3a8afce]:focus-visible{outline:var(--ms-focus-ring-width) solid var(--focus-ring);outline-offset:var(--ms-focus-ring-offset)}
[data-v-a3a8afce] .markdown-renderer{content-visibility:visible;contain:content;contain-intrinsic-size:0px 0px}
</style>
