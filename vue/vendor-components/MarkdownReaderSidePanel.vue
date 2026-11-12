<template>
<aside><span v-text="D(nt,{class:`shrink-0 px-2 pt-2`,'model-value':props.tab,'onUpdate:modelValue':t_1[0]||=e=>r_3(`update:tab`,e)},{default:y(()=>[D(Ye,{class:`w-full group-data-horizontal/tabs:h-8`},{default:y(()=>[D(qe,{value:`files`,class:`text-xs`},{default:y(()=>[h(A(a_5(`toolboxNative.markdownRecentFiles`)),1)]),_:1}),D(qe,{value:`outline`,class:`text-xs`},{default:y(()=>[h(A(a_5(`toolboxNative.documentOutline`))+` `,1),props.headings.length?(T(),g(`span`,cr,A(props.headings.length),1)):N(``,true)]),_:1})]),_:1})]),_:1},8,[`model-value`])" /><div><label><span v-text="D(We,{size:14,class:`pointer-events-none absolute left-2.5 top-1/2 -translate-y-1/2 text-muted-foreground`})" /><span v-text="b(P(`input`,{'onUpdate:modelValue':t_1[1]||=e=>o_6.value=e,type:`text`,class:`h-8 w-full rounded-lg border border-input bg-background pl-8 pr-7 text-xs text-foreground outline-none transition-colors placeholder:text-muted-foreground hover:border-black/15 focus:border-[#86efac] dark:hover:border-white/20 dark:focus:border-primary/60`,placeholder:a_5(`toolboxNative.searchRecentDocuments`),onKeydown:t_1[2]||=se(I(e=>o_6.value=``,[`stop`]),[`esc`])},null,40,dr),[[F,o_6.value]])" /><button type="button" :class="`absolute right-1 top-1/2 inline-flex size-6 -translate-y-1/2 items-center justify-center rounded-md text-muted-foreground hover:bg-black/5 hover:text-foreground dark:hover:bg-white/10`" :aria-label="a_5(`toolboxNative.markdownClearSearch`)" @click="e=>o_6.value=``"><span v-text="D(R,{size:13})" /></button></label></div><div><p_0>{{ o_6.value?a_5(`toolboxNative.markdownNoSearchResults`):a_5(`toolboxNative.noRecentMarkdownDocuments`) }}</p_0></div><p_0><span v-text="D(st,{size:13,class:`shrink-0`})" />{{ a_5(`toolboxNative.markdownLocalPrivacyNote`) }}</p_0></aside>
</template>

<script setup>
import { h, normalizeClass as u, unref as d, renderSlot as p, createElementBlock as g, renderList as _, watch as v, Fragment as C, openBlock as T, toDisplayString as A, computed as M, createCommentVNode as N, createElementVNode as P } from 'vue';
import { B as e, C as t, T as n, U as r, V as i, at as a, lt as o } from '../vendor/ui/Switch.js';
import { C as F, E as I, T as se } from '../vendor/i18n/en-US-player.js';
import { t as R } from '../vendor/ui/icons/lucide-icons.js';
import { t as ue } from '../vendor/i18n/i18n-helper.js';
import { Sn as We, dn as qe, fn as Ye, pn as nt, xn as st } from '../vendor/chunks/main.js';

const props = defineProps({
  tab: {},
  recentFiles: {},
  currentPath: {},
  headings: {},
  activeHeadingId: {}
});
var sr = {
  class: `flex h-full min-h-0 w-full flex-col rounded-[10px] bg-black/[0.02] dark:bg-white/[0.03]`
};
var cr = {
  key: 0,
  class: `tabular-nums text-muted-foreground`
};
var lr = {
  class: `shrink-0 px-2 pb-1 pt-2`
};
var ur = {
  class: `relative block`
};
var dr = [`placeholder`];
var fr = [`aria-label`];
var pr = {
  class: `min-h-0 flex-1 overflow-y-auto px-2 pb-2`
};
var mr = [`title`, `disabled`, `onClick`];
var hr = {
  class: `mt-0.5 flex min-w-0 items-center gap-1 text-xs text-muted-foreground`
};
var gr = {
  class: `truncate`
};
var _r = {
  class: `shrink-0 tabular-nums`
};
var vr = [`title`, `aria-label`, `onClick`];
var yr = {
  key: 0,
  class: `px-3 py-8 text-center text-xs leading-relaxed text-muted-foreground`
};
var br = {
  class: `flex shrink-0 items-center gap-1.5 px-3.5 pb-3 pt-1 text-xs text-muted-foreground`
};
var xr = [`aria-label`];
var Sr = [`title`, `aria-current`, `onClick`];
var Cr = {
  key: 0,
  class: `px-3 py-8 text-center text-xs leading-relaxed text-muted-foreground`
};
function p_0(e) {
  let t_1 = new Date(e);
  if (Number.isNaN(t_1.getTime())) return ``;
  let n_2 = new Date();
  return t_1.toDateString() === n_2.toDateString() ? t_1.toLocaleTimeString(c_8.value, {
    hour: `2-digit`,
    minute: `2-digit`
  }) : t_1.getFullYear() === n_2.getFullYear() ? t_1.toLocaleDateString(c_8.value, {
    month: `numeric`,
    day: `numeric`
  }) : t_1.toLocaleDateString(c_8.value, {
    year: `numeric`,
    month: `numeric`,
    day: `numeric`
  });
}
let value = s_7.value,
  t_1 = value?.querySelector(`[aria-current="location"]`);
let n_2 = el,
  r_3 = t_1,
  {
    locale: i_4,
    t: a_5
  } = ue(),
  o_6 = S(``),
  s_7 = S(null),
  c_8 = M(() => i_4?.value || `zh-CN`),
  l_9 = M(() => {
    let toLocaleLowerCase = o_6.value.trim().toLocaleLowerCase(c_8.value);
    return toLocaleLowerCase ? n_2.recentFiles.filter(item => `${item.name} ${item.filePath}`.toLocaleLowerCase(c_8.value).includes(toLocaleLowerCase)) : n_2.recentFiles;
  }),
  f_10 = M(() => n_2.headings.length ? Math.min(...n_2.headings.map(item => item.level)) : 1);
</script>
