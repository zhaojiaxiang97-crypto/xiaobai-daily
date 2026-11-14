<template>
<section><div><component :is="cw" /><div><component :is="By" :modelValue="f" @update:modelvalue="e=>f=e" /><div><component :is="Cs" :size="13" :class="`absolute left-2.5 top-1/2 -translate-y-1/2 text-[#bbb]`" /><component :is="Lp" :modelValue="p" @update:modelvalue="e=>p=e" :placeholder="a(`reportCc.searchPlaceholder`)" :class="`h-7 w-[180px] pl-8 text-xs`" /></div><component :is="P" size="icon-sm" variant="ghost" :title="a(`common.refresh`)" :disabled="C" @click="e=>D(b)" /><component :is="P" size="sm" variant="outline" :class="`h-7 gap-1 px-2.5 text-xs`" @click="e=>ye=true" /></div></div></section><section><div><div><component :is="Be(u?.value?o:Oo)" :size="14" :stroke-width="1.5" :class="`text-[#999]`" /><h2>{{ u?.value?a(`reportCc.sentList`):a(`reportCc.receivedList`) }}</h2><component :is="zn" :size="12" :class="`animate-spin text-[#bbb]`" /></div><div><button type="button" :class="`inline-flex items-center gap-1.5 text-xs text-[#666] hover:text-(--foreground)`" @click="Te"><span :class="[`flex size-3.5 items-center justify-center rounded-[3px] border`,we?.value?`border-primary bg-primary text-primary-foreground`:`border-black/20 bg-white dark:bg-background`]"><component :is="an" :size="10" :stroke-width="3" /></span>{{ ` `+toDisplayString(a(`reportCc.selectPage`)) }}</button><span :class="[`text-xs`,be.size?`text-(--foreground)`:`text-[#999]`]"><span v-text="be.size?a(`reportCc.selectedCount`,{reports:be.size,members:Ee?.value}):a(`reportCc.selectHint`)" /></span><component :is="P" size="sm" variant="ghost" :class="`h-7 px-2 text-xs text-[#666]`" @click="Se" /><component :is="P" size="sm" :class="`h-7 gap-1 px-3 text-xs`" :disabled="!be.size" @click="e=>ke([...be.value.values()])" /></div></div><div><component :is="zn" :size="16" :class="`animate-spin`" /></div></section><component :is="v5" :open="le" @update:open="e=>le=e" :report-id="ue.id" :title="ue.title" @changed="_e" /><component :is="zy" :open="Me" @update:open="e=>Me=e" context="todo" />
</template>

<script setup>
import { toDisplayString } from 'vue';
import zy from './FriendManagerDialog.vue';
import By from './Select.vue';
import cw from './ButtonGroup.vue';
import v5 from './ReportCcShareDialog.vue';
import { S_Oo as Oo, S_is as is, S_xs as xs, S_Cs as Cs, S_sm as sm, S_px as px, S_h2 as h2, S_e as e, S_a as a, S_o as o, S_y as y, S_w as w, S_P as P, S_Be as Be, S_an as an, S_zn as zn } from '../shared.js';
const text = defineProps({
      mode: {}
    });
const r = text;

// [兜底] 模板引用但无来源的符号
const u = { value: undefined };
const Lp = { value: undefined };
const we = { value: undefined };
const Ee = { value: undefined };
import { ref } from 'vue';

// [setup 还原] 原组件 setup 里初值不依赖 IPC 的声明
let f = ref(`all`);
let p = ref(``);
let v = ref([]);
let b = ref(1);
let C = ref(false);
async function D(e = b.value) {
  let t = ++T;
  C.value = true, w.value = ``;
  try {
    if (u.value) {
      let n = await vm.sent({
        page: e,
        pageSize: T5,
        type: d.value,
        keyword: m.value
      });
      if (t !== T) return;
      v.value = n.items, counter.value = n.total;
      let r = await vm.localExists(n.items.map(item => item.clientReportId)).catch(() => ({}));
      if (t !== T) return;
      S.value = {
        ...S.value,
        ...r
      };
    } else {
      let n = await vm.inbox({
        page: e,
        pageSize: T5,
        type: d.value,
        keyword: m.value,
        ownerUserId: f.value === `all` ? null : Number(f.value)
      });
      if (t !== T) return;
      v.value = n.items, counter.value = n.total, x.value = n.senders, c(n.unread);
    }
    b.value = e;
  } catch (e) {
    if (t !== T) return;
    w.value = _5(a, e, `reportCc.loadFailed`);
  } finally {
    t === T && (C.value = false);
  }
}
let le = ref(false);
let ue = ref(null);
function _e() {
  D(b.value), i(`changed`);
}
let ye = ref(false);
let be = ref(new Map());
function Se() {
  ye.value = false, be.value = new Map();
}
function Te() {
  let e = new Map(be.value);
  if (we.value) for (let t of v.value) e.delete(t.docId);else for (let t of v.value) {
    if (e.size >= 60) {
      Ai(a(`reportCc.summary.tooMany`, {
        max: 60
      }));
      break;
    }
    e.set(t.docId, xe(t));
  }
  be.value = e;
}
function ke(e) {
  e.length && (Oe.value = e, De.value = true);
}
let Me = ref(false);
</script>
