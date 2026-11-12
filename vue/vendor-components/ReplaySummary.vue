<template>
<div><div><h3>{{ c_3(`dayReplay.summaryTitle`) }}</h3><span>{{ event.dateLabel }}</span></div><div></div><div><div>{{ c_3(`dayReplay.summaryTop`) }}</div><div></div></div><p>{{ c_3(`dayReplay.noScreenshotHint`) }}</p><div><button type="button" :class="`h-8 rounded-md px-3 text-xs text-[#666] transition-colors hover:bg-black/[0.04] dark:text-muted-foreground dark:hover:bg-white/5`" @click="e=>s_2(`close`)">{{ c_3(`dayReplay.close`) }}</button><button type="button" :class="`flex h-8 items-center gap-1.5 rounded-md bg-[#111] px-3 text-xs text-white transition-colors hover:bg-[#333] dark:bg-foreground dark:text-background dark:hover:bg-foreground/85`" @click="e=>s_2(`replay`)"><span v-text="h(le,{size:13})" />{{ ` `+y(c_3(`dayReplay.replay`)) }}</button></div></div>
</template>

<script setup>
import { h, normalizeClass as e, unref as t, createTextVNode as r, createElementBlock as i, renderList as a, watch as o, createBlock as l, Fragment as d, openBlock as p, defineComponent as m, toDisplayString as y, computed as x, createCommentVNode as C, createElementVNode as w } from 'vue';
import { Cn as le } from '../vendor/chunks/main.js';

const event = defineProps({
  summary: {},
  street: {},
  colors: {},
  dateLabel: {},
  hasScreenshots: {
    type: Boolean
  }
});
const o_0 = event;
function At() {
  let {
    t: e,
    duration: t,
    cellName: n
  } = A();
  function r(r, i) {
    let {
      longest: a
    } = r;
    return [{
      label: e(`dayReplay.summaryActive`),
      value: r.activeSec > 0 ? t(r.activeSec) : `--`,
      detail: ``
    }, {
      label: e(`dayReplay.summaryLongest`),
      value: a ? t(a.minutes * 60) : `--`,
      detail: a ? n(i, a.value) : ``
    }, {
      label: e(`dayReplay.summarySpan`),
      value: r.firstMinute !== null && r.lastMinute !== null ? `${ve(r.firstMinute)} – ${r.lastMinute >= 1440 ? `24:00` : ve(r.lastMinute)}` : `--`,
      detail: ``
    }, {
      label: e(`dayReplay.summaryRecords`),
      value: String(r.recordCount),
      detail: ``
    }];
  }
  function i(state, r, i) {
    return state.top.map(item => ({
      key: item.value,
      name: n(r, item.value),
      color: i[item.value] ?? `#999999`,
      duration: t(item.activeSec)
    }));
  }
  return {
    t: e,
    summaryItems: r,
    topItems: i
  };
}
var jt = {
  class: `w-[380px] max-w-[calc(100%-32px)] rounded-[10px] border border-black/8 bg-white p-5 shadow-lg dark:border-border dark:bg-card`
};
var Mt = {
  class: `flex items-baseline justify-between gap-3`
};
var Nt = {
  class: `text-sm font-semibold text-(--foreground)`
};
var Pt = {
  class: `text-xs text-[#999] dark:text-muted-foreground`
};
var Ft = {
  class: `mt-4 grid grid-cols-2 gap-x-5 gap-y-4`
};
var It = {
  class: `text-lg font-semibold leading-tight text-(--foreground)`
};
var Lt = {
  class: `mt-1 truncate text-xs leading-none text-[#999] dark:text-muted-foreground`
};
var Rt = {
  key: 0,
  class: `mt-4 border-t border-black/6 pt-3 dark:border-border`
};
var zt = {
  class: `text-xs text-[#999] dark:text-muted-foreground`
};
var Bt = {
  class: `mt-2 flex flex-col gap-1.5`
};
var Vt = {
  class: `min-w-0 flex-1 truncate text-[#555] dark:text-foreground`
};
var Ht = {
  class: `text-[#aaa] dark:text-muted-foreground`
};
var Ut = {
  key: 1,
  class: `mt-4 text-xs leading-relaxed text-[#aaa] dark:text-muted-foreground`
};
var Wt = {
  class: `mt-5 flex justify-end gap-2`
};
let o_0_1 = event,
  s_2 = n,
  {
    t: c_3,
    summaryItems: l_4,
    topItems: u_5
  } = At(),
  f_6 = x(() => l_4(o_0_1.summary, o_0_1.street)),
  m_7 = x(() => u_5(o_0_1.summary, o_0_1.street, o_0_1.colors));
</script>
