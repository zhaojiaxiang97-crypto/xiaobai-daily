<template>
<section><div><div><button type="button" :class="[`inline-flex size-7 shrink-0 items-center justify-center rounded-full transition-colors disabled:cursor-wait`,n.value.liked?`text-primary`:`text-[#999] hover:text-primary`]" :disabled="s" :aria-pressed="n.value.liked" :title="n.value.liked?r(`reportCc.social.unlike`):r(`reportCc.social.like`)" @click="l"><component :is="Ws" :size="17" :stroke-width="1.8" :fill="n.value.liked?`currentColor`:`none`" /></button><component :is="An" /><span>{{ c }}</span></div><component :is="An" /></div><div><h3>{{ toDisplayString(r(`reportCc.social.comments`))+` ` }}<span>{{ n.value.commentCount }}</span></h3><p>{{ r(`reportCc.social.noComments`) }}</p><div :class="[`mt-4 rounded-xl border transition-colors`,x?`border-primary/50 bg-white dark:bg-background`:`border-transparent bg-black/[0.04] dark:bg-white/5`]"><div><component :is="Qo" :size="13" :stroke-width="1.8" :class="`shrink-0`" /><span><span v-text="r(`reportCc.social.replyingTo`,{name:u5(S.author)})" /></span><button type="button" :class="`shrink-0 text-[#999] hover:text-(--foreground)`" :title="r(`reportCc.social.cancelReply`)" @click="e=>S=null"><component :is="Nt" :size="13" /></button></div><span v-text="Xe(createElementVNode(`textarea`,{ref_key:`textareaRef`,ref:C,'onUpdate:modelValue':t[1]||=e=>v=e,rows:`1`,class:`block max-h-[132px] min-h-[42px] w-full resize-none bg-transparent px-3.5 py-2.5 text-sm leading-6 text-(--foreground) outline-none placeholder:text-[#bbb]`,maxlength:l5,placeholder:r(`reportCc.social.commentPlaceholder`),onKeydown:ee,onInput:j,onFocus:t[2]||=e=>x=true,onBlur:t[3]||=e=>x=false},null,40,HAt),[[yt,v]])" /><div><span>{{ b }}</span><div><span>{{ toDisplayString(v.length)+`/`+toDisplayString(l5) }}</span><button type="button" :class="`inline-flex h-8 items-center gap-1.5 rounded-lg bg-primary px-3.5 text-xs font-medium text-primary-foreground transition-opacity disabled:cursor-not-allowed disabled:opacity-40`" :disabled="!O" @mousedown="withDirectives(()=>{},[`prevent`])" @click="te"><component :is="zn" :size="13" :class="`animate-spin`" />{{ ` `+toDisplayString(r(`reportCc.social.send`)) }}</button></div></div></div></div></section>
</template>

<script setup>
import { createElementVNode, toDisplayString, withDirectives } from 'vue';
import xl from './MenuRadioItem.vue';
import { S_Qo as Qo, S_is as is, S_xs as xs, S_Ws as Ws, S_sm as sm, S_lg as lg, S_px as px, S_h3 as h3, S_l5 as l5, S_u5 as u5, S_HAt as HAt, S_e as e, S_r as r, S_p as p, S_w as w, S_Xe as Xe, S_mt as mt, S_yt as yt, S_Nt as Nt, S_An as An, S_zn as zn } from '../shared.js';
const event = defineProps({});
const t = event;

// [兜底] 模板引用但无来源的符号
const n = { value: undefined };
import { ref, computed } from 'vue';

// [setup 还原] 原组件 setup 里初值不依赖 IPC 的声明
let s = ref(false);
let c = ref(``);
async function l() {
  if (s.value) return;
  let value = n.value,
    i = !value.liked,
    o = a.value?.userId ?? null,
    l = value.likes.filter(item => item.userId !== o),
    u = o === null ? null : value.likes.find(item => item.userId === o) ?? {
      userId: o,
      name: a.value?.nickname ?? ``,
      nickname: a.value?.nickname ?? ``,
      remark: ``,
      avatarUrl: a.value?.avatarUrl ?? null
    };
  n.value = {
    ...value,
    liked: i,
    likes: i && u ? [...l, u] : l,
    likeCount: Math.max(0, value.likeCount + (i ? 1 : -1))
  }, s.value = true, c.value = ``;
  try {
    n.value = await vm.like(t.docId, i);
  } catch (t) {
    n.value = value, c.value = _5(r, t, `reportCc.social.likeFailed`);
  } finally {
    s.value = false;
  }
}
let v = ref(``);
let y = ref(false);
let b = ref(``);
let x = ref(false);
let S = ref(null);
let C = ref(null);
let O = computed(() => !y.value && v.value.trim().length > 0 && v.value.length <= 1e3);
function j() {
  let value = C.value;
  value && (value.style.height = `auto`, value.style.height = `${Math.min(value.scrollHeight, 132)}px`);
}
function ee(e) {
  e.key !== `Enter` || e.shiftKey || e.isComposing || e.keyCode === 229 || (e.preventDefault(), te());
}
async function te() {
  if (O.value) {
    y.value = true, b.value = ``;
    try {
      n.value = await vm.addComment(t.docId, v.value.trim(), S.value?.id ?? null), v.value = ``, S.value = null, ut(j);
    } catch (e) {
      b.value = _5(r, e, `reportCc.social.sendFailed`);
    } finally {
      y.value = false;
    }
  }
}
</script>
