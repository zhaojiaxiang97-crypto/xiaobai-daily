<template>
<div data-v-b99a1a49 :class="[`flex flex-col gap-1.5 min-h-[120px] overflow-hidden`,n.class]"><div><button type="button" :title="o(`richEditor.bold`)" :class="[`h-6 w-6 flex items-center justify-center transition-colors`,v(`bold`)]" @mousedown="withDirectives(e=>d(`bold`),[`prevent`])"><component :is="$t" :size="12" /></button><button type="button" :title="o(`richEditor.italic`)" :class="[`h-6 w-6 flex items-center justify-center transition-colors`,v(`italic`)]" @mousedown="withDirectives(e=>d(`italic`),[`prevent`])"><component :is="ko" :size="12" /></button><button type="button" :title="o(`richEditor.underline`)" :class="[`h-6 w-6 flex items-center justify-center transition-colors`,v(`underline`)]" @mousedown="withDirectives(e=>d(`underline`),[`prevent`])"><component :is="Zs" :size="12" /></button><button type="button" :title="o(`richEditor.strikethrough`)" :class="[`h-6 w-6 flex items-center justify-center transition-colors`,v(`strikeThrough`)]" @mousedown="withDirectives(e=>d(`strikeThrough`),[`prevent`])"><component :is="zs" :size="12" /></button><button type="button" :title="o(`richEditor.bulletList`)" :class="[`h-6 w-6 flex items-center justify-center transition-colors`,v(`insertUnorderedList`)]" @mousedown="withDirectives(e=>d(`insertUnorderedList`),[`prevent`])"><component :is="en" :size="12" /></button><button type="button" :title="o(`richEditor.numberedList`)" :class="[`h-6 w-6 flex items-center justify-center transition-colors`,v(`insertOrderedList`)]" @mousedown="withDirectives(e=>d(`insertOrderedList`),[`prevent`])"><component :is="Mr" :size="12" /></button><button type="button" :title="o(`richEditor.divider`)" :class="`h-6 w-6 flex items-center justify-center rounded hover:bg-black/5 transition-colors`" @mousedown="withDirectives(e=>d(`insertHorizontalRule`),[`prevent`])"><component :is="he" :size="12" /></button><button type="button" :title="o(`richEditor.heading1`)" :class="[`h-6 w-6 flex items-center justify-center transition-colors text-[10px] font-bold`,v(`formatBlock`,`h1`)]" @mousedown="withDirectives(e=>d(`formatBlock`,`<h1>`),[`prevent`])"><component :is="So" :size="12" /></button><button type="button" :title="o(`richEditor.heading2`)" :class="[`h-6 w-6 flex items-center justify-center transition-colors text-[10px] font-bold`,v(`formatBlock`,`h2`)]" @mousedown="withDirectives(e=>d(`formatBlock`,`<h2>`),[`prevent`])"><component :is="Co" :size="12" /></button><button type="button" :title="o(`richEditor.heading3`)" :class="[`h-6 w-6 flex items-center justify-center transition-colors text-[10px] font-bold`,v(`formatBlock`,`h3`)]" @mousedown="withDirectives(e=>d(`formatBlock`,`<h3>`),[`prevent`])"><component :is="wo" :size="12" /></button><button type="button" :title="o(`richEditor.paragraph`)" :class="[`h-6 w-6 flex items-center justify-center transition-colors`,v(`formatBlock`,`p`)]" @mousedown="withDirectives(e=>d(`formatBlock`,`<p>`),[`prevent`])"><component :is="i" :size="12" /></button></div><div ref="a" contenteditable="true" :class="[`min-h-0 flex-1 overflow-y-auto p-3 rounded-md border text-sm leading-relaxed outline-none transition-all`,s.value?`border-primary/50 ring-2 ring-primary/10`:`border-black/10`]" :data-placeholder="event.placeholder" @input="f" @blur="p" @focus="m" @paste="g"></div></div>
</template>

<script setup>
import { withDirectives } from 'vue';
import md from './BaseSeparator.vue';
// [符号说明] f=useConfigProviderContext
import { S_So as So, S_Co as Co, S_wo as wo, S_ko as ko, S_is as is, S_zs as zs, S_Zs as Zs, S_sm as sm, S_h1 as h1, S_h2 as h2, S_h3 as h3, S_e as e, S_i as i, S_a as a, S_o as o, S_s as s, S_d as d, S_f as f, S_p as p, S_m as m, S_g as g, S_v as v, S_y as y, S_w as w, S_he as he, S_$t as $t, S_en as en, S_Mr as Mr } from '../shared.js';
const event = defineProps({
      modelValue: {},
      placeholder: {},
      class: {}
    });
const n = event;
</script>

<style>
/* 从原应用 CSS 恢复（data-v-b99a1a49） */
[data-v-b99a1a49]:empty:before{content:attr(data-placeholder);color:#bbb;pointer-events:none}
[data-v-b99a1a49] ul{margin:.25rem 0;padding-left:1.25rem;list-style-type:disc}
[data-v-b99a1a49] ol{margin:.25rem 0;padding-left:1.25rem;list-style-type:decimal}
[data-v-b99a1a49] b,[contenteditable][data-v-b99a1a49] strong{font-weight:600}
[data-v-b99a1a49] i,[contenteditable][data-v-b99a1a49] em{font-style:italic}
[data-v-b99a1a49] u{text-decoration:underline}
[data-v-b99a1a49] s,[contenteditable][data-v-b99a1a49] strike,[contenteditable][data-v-b99a1a49] del{text-decoration:line-through}
[data-v-b99a1a49] hr{border:none;border-top:1px solid #ddd;margin:.5rem 0}
[data-v-b99a1a49] h1{margin:.75rem 0;font-size:1.5rem;font-weight:700}
[data-v-b99a1a49] h2{margin:.6rem 0;font-size:1.25rem;font-weight:600}
[data-v-b99a1a49] h3{margin:.5rem 0;font-size:1.125rem;font-weight:600}
</style>
