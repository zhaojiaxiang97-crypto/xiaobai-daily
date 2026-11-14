<template>
<div><div><component :is="ks" :size="16" :stroke-width="1.5" :class="`text-[#999]`" /><h1>{{ n(`lobster.title`) }}</h1></div><section><div><div><div :class="[`flex items-center justify-center w-7 h-7 rounded-md`,o?`bg-green-50`:`bg-red-50`]"><component :is="Ts" :size="13" :class="o?`text-green-600`:`text-red-500`" /></div><div><p>{{ o?n(`lobster.serviceRunning`):n(`lobster.serviceStopped`) }}</p><p>{{ o?n(`lobster.serviceRunningDesc`):n(`lobster.serviceStoppedDesc`) }}</p></div></div><div><div><span>{{ n(`lobster.enableService`) }}</span><component :is="Te" :model-value="s" @update:modelvalue="D" /></div><div><button type="button" :class="[`h-6 px-2 text-xs rounded-[5px] transition-colors`,c===`lan`?`bg-white text-(--foreground) shadow-sm`:`text-[#888] hover:text-(--foreground)`]" :disabled="!s" @click="e=>O(`lan`)">{{ n(`lobster.lanMode`) }}</button><button type="button" :class="[`h-6 px-2 text-xs rounded-[5px] transition-colors`,c===`local`?`bg-white text-(--foreground) shadow-sm`:`text-[#888] hover:text-(--foreground)`]" :disabled="!s" @click="e=>O(`local`)">{{ n(`lobster.localMode`) }}</button></div><component :is="P" variant="ghost" size="sm" :class="`h-7 text-xs gap-1 text-[#555] hover:text-(--foreground)`" :disabled="!s" @click="w" /><div><component :is="Fo" :size="12" :class="`text-[#bbb]`" /><code>{{ i }}</code></div></div></div></section><section><div><div><component :is="Bn" :size="14" :stroke-width="1.5" :class="`text-[#999]`" /><h2>{{ n(`lobster.agentPromptTitle`) }}</h2></div><component :is="P" variant="ghost" size="sm" :class="`h-7 text-xs gap-1.5 text-[#555] hover:text-(--foreground)`" @click="y" /></div><div><div><pre>{{ v?.value }}</pre></div></div><p>{{ n(`lobster.copyHint`) }}</p></section><component :is="ui" :open="d" @update:open="e=>d=e" /></div>
</template>

<script setup>
import md from './BaseSeparator.vue';

// [兜底] 模板引用但无来源的符号
// [符号说明] n~computed
import { S_Fo as Fo, S_is as is, S_xs as xs, S_Ts as Ts, S_ks as ks, S_sm as sm, S_pre as pre, S_px as px, S_h1 as h1, S_h2 as h2, S_e as e, S_n as n, S_p as p, S_P as P, S_Te as Te, S_Bn as Bn, S_ui as ui } from '../shared.js';
const v = { value: undefined };
import { ref } from 'vue';

// [setup 还原] 原组件 setup 里初值不依赖 IPC 的声明
let i = ref(``);
let o = ref(false);
let s = ref(true);
let c = ref(`lan`);
let d = ref(false);
function y() {
  navigator.clipboard.writeText(v.value).then(() => {
    a.value = true, setTimeout(() => a.value = false, 2e3);
  });
}
function w() {
  d.value = true, b();
}
async function D(e) {
  let value = s.value;
  u++, s.value = e, o.value = false;
  try {
    let t = await window.electronAPI.settings?.update?.({
      enableLobsterService: e
    });
    if (!t?.ok) throw Error(t?.error?.message || n(`lobster.serviceSaveFailed`));
    await A();
  } catch (e) {
    s.value = value, await k(), console.error(`切换服务状态失败:`, e);
  }
}
async function O(e) {
  if (c.value === e) return;
  let value = c.value;
  u++, c.value = e, o.value = false;
  try {
    let t = await window.electronAPI.settings?.update?.({
      lobsterBindMode: e
    });
    if (!t?.ok || !t.data) throw Error(t?.error?.message || n(`lobster.bindModeSaveFailed`));
    c.value = t.data.lobsterBindMode, await A();
  } catch (e) {
    c.value = value, await k(), console.error(`切换服务监听地址失败:`, e);
  }
}
</script>
