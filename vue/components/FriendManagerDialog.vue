<template>
<li data-v-ada2660e :class="[`fm-row`,{'is-new':C.value===e.userId,'is-active':w.value===e.userId||D.value===e.userId}]"><div><component :is="Ly" :name="ie(e)" :avatar-url="e.avatarUrl??null" :color-key="e.email" :size="32" /><div><span>{{ toDisplayString(ie(e))+` ` }}<span><span v-text="o(`friendManager.originalNickname`,{name:e.nickname})" /></span></span><span>{{ e.email }}</span></div><div><button type="button" :class="`fm-icon-button`" :title="o(`friendManager.remark`)" :aria-label="o(`friendManager.remark`)" @click="t=>xe(e)"><component :is="v" :size="14" /></button><button type="button" :class="`fm-icon-button is-danger`" :title="o(`friendManager.remove`)" :aria-label="o(`friendManager.remove`)" @click="t=>we(e)"><component :is="Ae" :size="14" /></button></div></div><div><span v-text="Xe(createElementVNode(`input`,{id:`friend-remark-${e.userId}`,'onUpdate:modelValue':n[5]||=e=>T.value=e,class:`fm-input`,maxlength:`64`,disabled:E.value,placeholder:o(`friendManager.remarkPlaceholder`),onKeydown:t=>Ce(t,e)},null,40,Zhe),[[yt,T.value]])" /><button type="button" :class="`fm-button`" :disabled="E.value" @click="Se">{{ o(`friendManager.cancel`) }}</button><button type="button" :class="`fm-button is-primary`" :disabled="E.value" @click="t=>P(e)"><component :is="zn" :size="14" :class="`animate-spin`" />{{ ` `+toDisplayString(o(`friendManager.save`)) }}</button></div><p>{{ k.value.message }}</p></li>
</template>

<script setup>
import { createElementVNode, toDisplayString } from 'vue';
import Ly from './LeaderboardAvatar.vue';
// [符号说明] D=useConfigProviderContext, k~ref, ie~shallowRef, we~指令
import { S_is as is, S_fm as fm, S_Zhe as Zhe, S_e as e, S_t as t, S_o as o, S_p as p, S_v as v, S_C as C, S_w as w, S_T as T, S_E as E, S_D as D, S_k as k, S_ie as ie, S_xe as xe, S_Se as Se, S_P as P, S_Ce as Ce, S_we as we, S_Ae as Ae, S_Xe as Xe, S_yt as yt, S_zn as zn, S_li as li } from '../shared.js';
const event = defineProps({});
const n = event;
</script>

<style>
/* 从原应用 CSS 恢复（data-v-ada2660e） */
[data-v-ada2660e]{color:var(--foreground)}
[data-v-ada2660e]{justify-content:space-between;align-items:flex-start;gap:16px;padding:18px 20px 14px;display:flex}
[data-v-ada2660e]{font-size:15px;font-weight:600}
[data-v-ada2660e]{color:#8c8c8c;margin-top:4px;font-size:12px;line-height:1.6}
[data-v-ada2660e]{border-bottom:1px solid var(--border);flex-direction:column;gap:10px;padding:0 20px 16px;display:flex}
[data-v-ada2660e]{gap:8px;display:flex}
[data-v-ada2660e],.fm-filter[data-v-ada2660e]{flex:1;align-items:center;min-width:0;display:flex;position:relative}
[data-v-ada2660e]{color:#a3a3a3;pointer-events:none;position:absolute;left:10px}
[data-v-ada2660e],.fm-filter input[data-v-ada2660e],.fm-input[data-v-ada2660e]{border:1px solid var(--border);background:var(--card);width:100%;height:34px;color:var(--foreground);border-radius:8px;outline:none;padding:0 10px 0 30px;font-size:13px;transition:border-color .14s,box-shadow .14s}
[data-v-ada2660e]{padding-left:10px}
[data-v-ada2660e]:focus,.fm-filter input[data-v-ada2660e]:focus,.fm-input[data-v-ada2660e]:focus{border-color:color-mix(in srgb, var(--primary) 60%, var(--border));box-shadow:0 0 0 3px color-mix(in srgb, var(--primary) 14%, transparent)}
[data-v-ada2660e]{max-width:200px}
[data-v-ada2660e]{height:28px;padding-left:26px;font-size:12px}
[data-v-ada2660e]{left:9px}
[data-v-ada2660e]{border:1px solid var(--border);background:var(--card);height:34px;color:var(--foreground);white-space:nowrap;cursor:pointer;border-radius:8px;flex-shrink:0;justify-content:center;align-items:center;gap:5px;padding:0 12px;font-size:12px;font-weight:500;transition:background .14s,opacity .14s;display:inline-flex}
[data-v-ada2660e]:hover:not(:disabled){background:var(--muted)}
[data-v-ada2660e]:disabled{cursor:not-allowed;opacity:.5}
[data-v-ada2660e]{background:var(--primary);color:var(--primary-foreground);border-color:#0000}
[data-v-ada2660e]:hover:not(:disabled){background:color-mix(in srgb, var(--primary) 88%, #000)}
[data-v-ada2660e]{color:#fff;background:#ef4444;border-color:#0000}
[data-v-ada2660e]:hover:not(:disabled){background:#dc2626}
[data-v-ada2660e]{height:30px}
[data-v-ada2660e]{border:1px solid var(--border);background:var(--card);border-radius:10px;align-items:center;gap:10px;padding:10px 12px;display:flex}
[data-v-ada2660e]{background:#10b9810f;border-color:#10b98159}
[data-v-ada2660e]{background:var(--muted);border-color:#0000}
[data-v-ada2660e]{background:var(--card);color:#8c8c8c;border-radius:999px;flex-shrink:0;justify-content:center;align-items:center;width:36px;height:36px;display:inline-flex}
[data-v-ada2660e]{flex-direction:column;flex:1;gap:2px;min-width:0;display:flex}
[data-v-ada2660e]{white-space:nowrap;text-overflow:ellipsis;font-size:13px;font-weight:600;overflow:hidden}
[data-v-ada2660e]{color:#a3a3a3;margin-left:6px;font-size:11px;font-weight:400}
[data-v-ada2660e]{white-space:nowrap;text-overflow:ellipsis;color:#8c8c8c;font-size:12px;overflow:hidden}
[data-v-ada2660e]{color:#047857;background:#10b9811a;border-radius:999px;flex-shrink:0;align-items:center;gap:3px;padding:3px 8px;font-size:12px;font-weight:500;display:inline-flex}
[data-v-ada2660e]{color:#6ee7b7}
[data-v-ada2660e]{color:#8c8c8c;font-size:12px}
[data-v-ada2660e]{color:#dc2626;word-break:break-all;font-size:12px}
[data-v-ada2660e]{padding:0 10px 8px 52px}
[data-v-ada2660e]{flex-direction:column;flex:1;min-height:0;padding:14px 20px 18px;display:flex}
[data-v-ada2660e]{justify-content:space-between;align-items:center;gap:12px;min-height:28px;margin-bottom:8px;display:flex}
[data-v-ada2660e]{align-items:center;gap:6px;font-size:13px;font-weight:600;display:flex}
[data-v-ada2660e]{background:var(--muted);color:#8c8c8c;border-radius:999px;padding:0 6px;font-size:11px;font-weight:500;line-height:18px}
[data-v-ada2660e]{color:#fff;background:#ef4444}
[data-v-ada2660e]{border-bottom:1px solid var(--border);padding:14px 20px 6px}
[data-v-ada2660e]{max-height:168px;margin:0 -6px;padding:0 6px 8px;overflow-y:auto}
[data-v-ada2660e]{flex-shrink:0;gap:6px;display:flex}
[data-v-ada2660e]{height:28px;padding:0 12px}
[data-v-ada2660e]{width:100%;height:34px}
[data-v-ada2660e]{min-height:160px;max-height:340px;margin:0 -6px;padding:0 6px;overflow-y:auto}
[data-v-ada2660e]{text-align:center;color:#8c8c8c;flex-direction:column;justify-content:center;align-items:center;gap:6px;min-height:160px;font-size:12px;display:flex}
[data-v-ada2660e]{color:var(--foreground);font-size:13px;font-weight:600}
[data-v-ada2660e]{color:var(--primary);cursor:pointer;background:0 0;border:0;font-size:12px;font-weight:500}
[data-v-ada2660e]{flex-direction:column;gap:2px;display:flex}
[data-v-ada2660e]{border-radius:8px;transition:background .6s}
[data-v-ada2660e]:hover,.fm-row.is-active[data-v-ada2660e]{background:var(--muted)}
[data-v-ada2660e]{background:#10b9811a}
[data-v-ada2660e]{align-items:center;gap:10px;padding:8px 10px;display:flex}
[data-v-ada2660e]{opacity:0;gap:2px;transition:opacity .12s;display:flex}
[data-v-ada2660e],.fm-row:focus-within .fm-row-actions[data-v-ada2660e]{opacity:1}
[data-v-ada2660e]{color:#8c8c8c;cursor:pointer;background:0 0;border:0;border-radius:6px;flex-shrink:0;justify-content:center;align-items:center;width:28px;height:28px;display:inline-flex}
[data-v-ada2660e]:hover{color:var(--foreground);background:#0000000d}
[data-v-ada2660e]:hover{background:#ffffff14}
[data-v-ada2660e]:hover{color:#dc2626;background:#ef44441a}
[data-v-ada2660e]{align-items:center;gap:6px;padding:0 10px 10px 52px;display:flex}
[data-v-ada2660e]{flex:1;height:30px}
[data-v-ada2660e]{color:#dc2626;flex:1;min-width:0;font-size:12px}
[data-v-ada2660e]{opacity:1}
</style>
