<template>
<li :class="[`rounded-lg border`,x.has(e.key)?`border-primary/40 bg-primary/[0.03]`:`border-black/[0.08]`]" :data-testid="`agent-session-manual-import-session-${e.key}`"><div><label :class="[`flex min-w-0 flex-1 items-start gap-2.5`,e.newMessageCount>0?`cursor-pointer`:`cursor-default`]"><component :is="sg" :model-value="x.has(e.key)" :disabled="e.newMessageCount===0||p" :class="`mt-0.5 shrink-0`" @update:modelvalue="t=>ae(e.key,t)" /><div><div><span>{{ lr(e.providerId) }}</span><span :class="`truncate font-medium text-[#555]`" :title="e.cwd??undefined">{{ e.project }}</span><span><component :is="yo" :size="11" :class="`shrink-0`" /><span>{{ e.gitBranch }}</span></span><span>{{ M(e) }}</span><span>{{ j(e) }}</span></div><p :class="[`mt-1 truncate text-sm`,e.newMessageCount>0?`text-(--foreground)`:`text-[#999]`]" :title="e.title">{{ e.title }}</p><p>{{ ee(e) }}</p></div></label><component :is="P" type="button" size="sm" variant="ghost" :class="`h-6 shrink-0 gap-1 px-1.5 text-xs text-[#666]`" @click="t=>se(e.key)" /></div><ol></ol></li>
</template>

<script setup>
import ol from './CalendarHeadCell.vue';
import sg from './Checkbox.vue';
import { ref, computed } from 'vue';

// [setup 还原] 原组件 setup 里初值不依赖 IPC 的声明
let d = ref([]);
let p = ref(false);
let x = computed(() => new Set(d.value));
function j(e) {
  let t = A(e.firstMessageAt);
  return e.firstMessageAt === e.lastMessageAt ? t : `${t} – ${new Date(e.firstMessageAt).toDateString() === new Date(e.lastMessageAt).toDateString() ? k.value.format(new Date(e.lastMessageAt)) : A(e.lastMessageAt)}`;
}
function ee(e) {
  let length = e.messages.filter(item => item.state === `imported`).length,
    r = e.messages.filter(item => item.state === `deleted`).length,
    i = [e.newMessageCount > 0 ? n(`timeline.agentSessionImport.newMessages`, {
      count: e.newMessageCount
    }) : n(`timeline.agentSessionImport.allImported`)];
  return length > 0 && i.push(n(`timeline.agentSessionImport.importedMessages`, {
    count: length
  })), r > 0 && i.push(n(`timeline.agentSessionImport.deletedMessages`, {
    count: r
  })), i.join(` · `);
}
function M(e) {
  return e.environment === `wsl` ? n(`settings.agentSessionImport.providerWslRoot`, {
    distro: e.wslDistro ?? ``
  }) : n(`settings.agentSessionImport.providerNativeRoot`);
}
function ae(e, t) {
  let n = new Set(d.value);
  t === true ? n.add(e) : n.delete(e), d.value = [...n], m.value = ``;
}
function se(e) {
  f.value = S.value.has(e) ? f.value.filter(item => item !== e) : [...f.value, e];
}
import { S_yo as yo, S_is as is, S_xs as xs, S_sm as sm, S_lg as lg, S_px as px, S_e as e, S_t as t, S_w as w, S_P as P, S_mt as mt, S_lr as lr, S_li as li } from '../shared.js';
</script>
