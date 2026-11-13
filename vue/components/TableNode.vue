<template>
<th data-v-7a6d3bf6 dir="auto" :class="[n.align===`right`?`text-right`:n.align===`center`?`text-center`:`text-left`]"><component :is="s$" :nodes="n.children" :index-key="`table-th-${t.indexKey}`" :custom-id="t.customId" :typewriter="t.typewriter" @copy="e=>d.$emit(`copy`,e)" /><button type="button" :class="`table-node__resize-handle`" :aria-label="`Resize columns ${r+1} and ${r+2}`" @pointerdown="e=>function(e,t){if(t.button!==0)return;let n=function(){let e=i.value?.querySelectorAll(`thead th`);return Array.from(e??[],e=>Math.round(e.getBoundingClientRect().width));}(),r=n[e],s=n[e+1];r&&s&&(t.preventDefault(),o={index:e,startX:t.clientX,startWidth:r,nextStartWidth:s,widths:n},a.value=n,window.addEventListener(`pointermove`,l),window.addEventListener(`pointerup`,u),window.addEventListener(`pointercancel`,u));}(r,e)"></button></th>
</template>

<script setup>
import __ca_s from './NodeRenderer.vue';
// [符号说明] n~computed, l~computed, u=useConfigProviderContext
import { S_is as is, S_th as th, S_e as e, S_n as n, S_r as r, S_i as i, S_a as a, S_o as o, S_s as s, S_l as l, S_u as u, S_d as d } from '../shared.js';
const s$ = __ca_s;
const event = defineProps({
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
const t = event;
</script>

<style>
/* 从原应用 CSS 恢复（data-v-7a6d3bf6） */
[data-v-7a6d3bf6]{-webkit-overflow-scrolling:touch;overscroll-behavior-x:contain;overscroll-behavior-y:auto;scrollbar-gutter:stable;max-width:100%;position:relative;overflow-x:auto}
[data-v-7a6d3bf6]{border-collapse:separate;border-spacing:0;width:100%;margin:var(--ms-flow-table-y) 0;font-size:inherit;border:1px solid var(--table-border);border-radius:var(--ms-radius);box-shadow:var(--ms-shadow-subtle);overflow:hidden}
[data-v-7a6d3bf6] th,.table-node[data-v-7a6d3bf6] td{border-bottom:1px solid var(--table-border);border-right:1px solid var(--table-border);padding:var(--ms-flow-table-cell);white-space:normal;overflow-wrap:break-word;word-break:normal}
[data-v-7a6d3bf6] th:last-child,.table-node[data-v-7a6d3bf6] td:last-child{border-right:none}
[data-v-7a6d3bf6] tbody tr:last-child td{border-bottom:none}
[data-v-7a6d3bf6] thead th{background-color:var(--table-header-bg);border-bottom-width:2px;font-weight:600;position:relative}
[data-v-7a6d3bf6]{z-index:1;cursor:col-resize;touch-action:none;background:0 0;border:0;width:8px;padding:0;position:absolute;top:0;bottom:0;right:-4px}
[data-v-7a6d3bf6]:after{content:"";background:var(--table-border);border-radius:9999px;width:2px;position:absolute;top:.35em;bottom:.35em;left:50%}
[data-v-7a6d3bf6]:after{background:color-mix(in srgb,var(--table-border) 45%,hsl(var(--ms-foreground)))}
[data-v-7a6d3bf6]:after{opacity:0;transition:opacity var(--ms-duration-fast) var(--ms-ease-standard);transform:translate(-50%)}
[data-v-7a6d3bf6]:hover:after,.table-node__resize-handle[data-v-7a6d3bf6]:focus-visible:after{opacity:1}
[data-v-7a6d3bf6] tbody tr:nth-child(2n){background-color:hsl(var(--ms-muted) / .35)}
[data-v-7a6d3bf6] tbody tr:hover{background-color:var(--code-action-hover-bg)}
[data-v-7a6d3bf6]{position:relative;overflow:hidden}
[data-v-7a6d3bf6]>*{visibility:hidden}
[data-v-7a6d3bf6]:after{content:"";border-radius:calc(var(--ms-radius) * .5);background:linear-gradient(90deg,var(--loading-shimmer) 25%,var(--loading-shimmer) 50%,var(--loading-shimmer) 75%);will-change:background-position;background-size:200% 100%;animation:1.2s linear infinite table-node-shimmer-7a6d3bf6;position:absolute;inset:0}
[data-v-7a6d3bf6]{pointer-events:none;justify-content:center;align-items:center;display:flex;position:absolute;inset:0}
[data-v-7a6d3bf6]{border:2px solid var(--loading-spinner);border-radius:9999px;width:2.5rem;height:2.5rem}
[data-v-7a6d3bf6]{border:2px solid color-mix(in srgb,var(--loading-spinner) 25%,transparent)}
[data-v-7a6d3bf6]{border-top-color:var(--loading-spinner)}
[data-v-7a6d3bf6]{border-top-color:color-mix(in srgb,var(--loading-spinner) 80%,transparent)}
[data-v-7a6d3bf6]{will-change:transform}
[data-v-7a6d3bf6],.table-node-fade-leave-active[data-v-7a6d3bf6]{transition:opacity var(--ms-duration-standard) var(--ms-ease-standard)}
[data-v-7a6d3bf6],.table-node-fade-leave-to[data-v-7a6d3bf6]{opacity:0}
[data-v-7a6d3bf6] .table-node .markdown-renderer{content-visibility:visible;contain:content;contain-intrinsic-size:0px 0px;display:contents}
[data-v-7a6d3bf6] .table-node .markdown-renderer .node-slot,[data-v-7a6d3bf6] .table-node .markdown-renderer .node-content,[data-v-7a6d3bf6] .table-node .markdown-renderer .node-space{display:contents}
[data-v-7a6d3bf6] .table-node .text-node,[data-v-7a6d3bf6] .table-node code{white-space:inherit;overflow-wrap:inherit;word-break:inherit;max-width:none}
[data-v-7a6d3bf6],.hr+.table-node-wrapper .table-node[data-v-7a6d3bf6]{margin-top:0}
[data-v-7a6d3bf6]{clip:rect(0,0,0,0);white-space:nowrap;border:0;width:1px;height:1px;margin:-1px;padding:0;position:absolute;overflow:hidden}
</style>
