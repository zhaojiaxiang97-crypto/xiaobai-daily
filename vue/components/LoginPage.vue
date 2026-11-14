<template>
<section data-v-c8ac9b5f><main><img :class="`login-mascot`" :src="mie" alt="" aria-hidden="true" draggable="false" /><h1>{{ r(`login.browser.hero`) }}</h1><p>{{ r(`login.browser.subtitle`) }}</p><div><button type="button" :class="`login-button`" :disabled="a!==`idle`" @click="p"><component :is="zn" :size="16" :class="`animate-spin`" />{{ ` `+toDisplayString(r(`login.browser.${a===`idle`?`button`:a===`opening`?`opening`:a===`finishing`?`finishing`:`waiting`}`)) }}</button><div><button type="button" @click="h">{{ r(`login.browser.reopen`) }}</button><button type="button" @click="m">{{ r(`login.browser.cancel`) }}</button></div><p>{{ o }}</p></div></main><footer><button type="button" @click="e=>g(`privacy-policy`)">{{ r(`login.browser.privacy`) }}</button><button type="button" @click="e=>g(`user-agreement`)">{{ r(`login.browser.terms`) }}</button><button type="button" @click="e=>n(`show-wechat-qrcode`)">{{ r(`login.browser.support`) }}</button></footer></section>
</template>

<script setup>
import { toDisplayString } from 'vue';
// [符号说明] n~computed
import { S_is as is, S_mie as mie, S_h1 as h1, S_alt as alt, S_n as n, S_r as r, S_zn as zn } from '../shared.js';
const e = defineProps({});
import { ref } from 'vue';

// [setup 还原] 原组件 setup 里初值不依赖 IPC 的声明
let a = ref(`idle`);
let o = ref(``);
async function p() {
  if (a.value !== `idle`) return;
  let e = ++c;
  a.value = `opening`, o.value = ``;
  try {
    let t = Pi(await window.electronAPI.auth.browserStart());
    if (d || e !== c) return;
    l = t.expiresAt, u = t.intervalMs, a.value = `waiting`, f(e);
  } catch (t) {
    if (d || e !== c) return;
    a.value = `idle`, o.value = t instanceof Error ? t.message : r(`login.browser.retry`);
  }
}
async function m() {
  Pi(await window.electronAPI.auth.browserCancel()).success && (++c, clearTimeout(str), a.value = `idle`, o.value = ``);
}
async function h() {
  try {
    Pi(await window.electronAPI.auth.browserReopen()), o.value = ``;
  } catch (e) {
    o.value = e instanceof Error ? e.message : r(`login.browser.retry`);
  }
}
function g(e) {
  window.electronAPI.openExternal(`https://xiaoheiribao.com/legal/${e}.html`);
}
</script>

<style>
/* 从原应用 CSS 恢复（data-v-c8ac9b5f） */
[data-v-c8ac9b5f]{color:#191919;background:#fff;flex-direction:column;align-items:center;min-height:100%;padding:24px;display:flex}
[data-v-c8ac9b5f]{text-align:center;flex-direction:column;flex:1;justify-content:center;align-items:center;width:100%;padding:0 0 8vh;display:flex}
[data-v-c8ac9b5f]{object-fit:contain;-webkit-user-select:none;user-select:none;flex-shrink:0;width:clamp(168px,28vh,224px);height:clamp(168px,28vh,224px);margin-bottom:28px;display:block}
[data-v-c8ac9b5f]{letter-spacing:-.025em;font-size:clamp(24px,3vw,32px);font-weight:600;line-height:1.4}
[data-v-c8ac9b5f]{color:#888;margin-top:12px;font-size:13px}
[data-v-c8ac9b5f]{width:min(100%,310px);min-height:110px;margin-top:28px}
[data-v-c8ac9b5f]{color:#fff;background:#191919;border-radius:999px;justify-content:center;align-items:center;gap:8px;min-width:200px;max-width:100%;height:40px;padding:0 24px;font-size:14px;font-weight:500;line-height:20px;transition:background-color .15s;display:inline-flex}
[data-v-c8ac9b5f]:hover{background:#333}
[data-v-c8ac9b5f]:disabled{opacity:.65}
[data-v-c8ac9b5f]{color:#999;justify-content:center;gap:14px;margin-top:17px;font-size:12px;display:flex}
[data-v-c8ac9b5f]:hover,.login-footer button[data-v-c8ac9b5f]:hover{color:#222}
[data-v-c8ac9b5f]{color:#b84a4a;margin-top:12px;font-size:12px;line-height:1.6}
[data-v-c8ac9b5f]{color:#888;flex-wrap:wrap;justify-content:center;gap:24px;padding:16px 0 4px;font-size:11px;display:flex}
[data-v-c8ac9b5f]:focus-visible{outline-offset:4px;outline:2px solid #888}
[data-v-c8ac9b5f]{padding-bottom:0}
[data-v-c8ac9b5f]{margin-bottom:12px}
[data-v-c8ac9b5f]{margin-top:22px}
</style>
