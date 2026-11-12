<template>
<div><p_7>{{ event.supported?G(`OcrHint`):G(`OcrUnsupported`) }}</p_7><component :is="c" variant="outline" size="sm" :class="`w-full text-xs`" :disabled="o_2.value" @click="__9" /><p_7>{{ l_4.value }}</p_7><p_7>{{ G(`OcrEmpty`) }}</p_7></div>
</template>

<script setup>
import { normalizeClass as d, unref as f, createTextVNode as h, createElementBlock as g, renderList as _, watch as v, createBlock as x, Fragment as C, openBlock as w, defineComponent as T, toDisplayString as k, createCommentVNode as M, createElementVNode as N } from 'vue';
import { Dt as n, jt as o, r as c, t as l } from '../vendor/ui/Switch.js';
import { C as P, E as F } from '../vendor/i18n/en-US-player.js';
import { t as ie } from '../vendor/chunks/check.js';
import { _ as R, y as ge } from '../vendor/chunks/screenshot-beautifier.js';
import { y as Pe } from '../vendor/chunks/compose.js';
import { a as G } from '../vendor/chunks/screenshotTool.js';

const event = defineProps({
  sessionId: {},
  supported: {
    type: Boolean
  },
  autoRun: {
    type: Boolean
  }
});
const row = event;
var K = {
  class: `flex h-full min-h-0 flex-col gap-3 px-4 pb-4 pt-4`
};
var Ke = {
  class: `text-[11px] leading-relaxed text-muted-foreground`
};
var qe = {
  key: 1,
  class: `rounded-md bg-destructive/10 px-2.5 py-2 text-[11px] leading-relaxed text-destructive`
};
var Je = {
  key: 0,
  class: `text-xs text-muted-foreground`
};
let row_0 = event,
  i_1 = n,
  editor = window.screenshotToolAPI.editor,
  o_2 = S(false),
  s_3 = S(``),
  l_4 = S(``),
  u_5 = S(false),
  d_6 = S(false),
  p_7 = 0,
  m_8 = null;
async function __9() {
  if (!row_0.supported || o_2.value || !row_0.sessionId) return;
  let e = ++p_7;
  o_2.value = true, l_4.value = ``;
  try {
    let t = await editor.ocr({
      id: row_0.sessionId
    });
    if (e !== p_7) return;
    if (!t.ok) {
      l_4.value = t.error.message;
      return;
    }
    s_3.value = t.data.text, u_5.value = true;
  } catch (t) {
    e === p_7 && (l_4.value = t instanceof Error ? t.message : String(t));
  } finally {
    e === p_7 && (o_2.value = false);
  }
}
</script>
