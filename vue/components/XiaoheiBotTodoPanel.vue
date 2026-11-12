<template>
<aside data-v-d5b8b655 :class="`bot-todo-panel`" :aria-label="i(`botTodos.title`)"><header><component :is="P" variant="ghost" size="icon-sm" :disabled="d.value" :aria-label="i(`common.back`)" @click="ne" /><strong>{{ C.value }}</strong><span>{{ counter.value }}</span><div><component :is="P" variant="ghost" size="icon-sm" :disabled="d.value||u.value||m.value" :aria-label="i(`common.refresh`)" @click="N" /><component :is="P" variant="ghost" size="icon-sm" :aria-label="i(`common.close`)" @click="e=>r(`close`)" /></div></header><p>{{ f.value }}</p><form :class="`detail-layout`" @submit="withDirectives(M,[`prevent`])"><div><component :is="Rp" :modelValue="g.title" @update:modelvalue="e=>g.title=e" :class="`title-editor`" :aria-label="i(`botTodos.taskTitle`)" required="" maxlength="1000" rows="2" /><div><span :class="[`status-pill`,`status-${p.value.status}`]"><component :is="Wa" :size="12" />{{ D(p.value) }}</span><span><component :is="Vs" :size="12" />{{ p.value.categoryLabel||i(`todo.category.${p.value.category}`) }}</span><component :is="U_" :source="p.value.source" /></div><div><div><span><component :is="Ft" :size="14" />{{ i(`botTodos.dueDate`) }}</span><component :is="CP" :modelValue="w.value" @update:modelvalue="e=>w.value=e" :label="i(`botTodos.dueDate`)" mode="datetime" precision="minute" value-format="local" align="end" compact="" trigger-class="!w-full !min-h-8 !h-auto !rounded-lg !text-xs" /></div><div><span><component :is="Ar" :size="14" />{{ i(`botTodos.priority`) }}</span><component :is="By" :modelValue="g.priority" @update:modelvalue="e=>g.priority=e" /></div></div><section><h4><component :is="Us" :size="14" />{{ i(`botTodos.description`) }}</h4><component :is="Rp" :modelValue="g.description" @update:modelvalue="e=>g.description=e" :class="`description-editor`" :aria-label="i(`botTodos.description`)" maxlength="5000" rows="6" /></section><section><h4><component :is="Io" :size="14" />{{ i(`botTodos.subtasks`) }}<span>{{ toDisplayString(p.value.subtasks.filter(item=>item.done).length)+` / `+toDisplayString(p.value.subtasks.length) }}</span></h4></section><button type="button" :class="`open-full`" @click="e=>r(`openTodo`,p.value.id)">{{ i(`botTodos.openInTodos`) }}<component :is="Lt" :size="13" /></button></div><footer><span v-text="m.value?(openBlock(),createElementBlock(Fragment,{key:0},[resolveComponent(P,{type:`button`,variant:`outline`,size:`sm`,disabled:d.value,onClick:t[12]||=e=>m.value=false},{default:H(()=>[createTextVNode(toDisplayString(i(`common.cancel`)),1)]),_:1},8,[`disabled`]),resolveComponent(P,{type:`submit`,size:`sm`,disabled:d.value},{default:H(()=>[d.value?(openBlock(),createBlock(zn,{key:0,size:14,class:`animate-spin`})):createCommentVNode(``,true),createTextVNode(toDisplayString(i(`common.save`)),1)]),_:1},8,[`disabled`])],64)):(openBlock(),createElementBlock(Fragment,{key:1},[resolveComponent(P,{type:`button`,variant:`ghost`,size:`sm`,class:`mr-auto text-destructive`,disabled:d.value,onClick:t[13]||=e=>h.value=p.value},{default:H(()=>[createTextVNode(toDisplayString(i(`common.delete`)),1)]),_:1},8,[`disabled`]),resolveComponent(P,{type:`button`,variant:`outline`,size:`sm`,disabled:d.value,onClick:ee},{default:H(()=>[resolveComponent(v,{size:13}),createTextVNode(toDisplayString(i(`common.edit`)),1)]),_:1},8,[`disabled`]),resolveComponent(P,{type:`button`,size:`sm`,disabled:d.value,onClick:t[14]||=e=>te(`status`,{id:p.value.id,status:p.value.status===`done`?`todo`:`done`})},{default:H(()=>[resolveComponent(an,{size:14}),createTextVNode(toDisplayString(p.value.status===`done`?i(`botTodos.reopen`):i(`botTodos.complete`)),1)]),_:1},8,[`disabled`])],64))" /></footer></form><component :is="_i" :open="!!h.value" @update:open="e=>{e||(h.value=null);}" /></aside>
</template>

<script setup>
import { openBlock, createElementBlock, createBlock, createTextVNode, createCommentVNode, toDisplayString, withDirectives, resolveComponent } from 'vue';
import By from './Select.vue';
import CP from './DateTimePickerField.vue';
// [符号说明] u=useConfigProviderContext, f=useConfigProviderContext, D=useConfigProviderContext
import { S_Wa as Wa, S_Io as Io, S_is as is, S_xs as xs, S_Vs as Vs, S_Us as Us, S_sm as sm, S_lg as lg, S_counter as counter, S_e as e, S_t as t, S_r as r, S_i as i, S_u as u, S_d as d, S_f as f, S_p as p, S_m as m, S_g as g, S__ as _, S_v as v, S_C as C, S_w as w, S_D as D, S_ee as ee, S_te as te, S_M as M, S_ne as ne, S_N as N, S_P as P, S_H as H, S_Ft as Ft, S_Lt as Lt, S_an as an, S_zn as zn, S_mr as mr, S_Ar as Ar, S__i as _i } from '../shared.js';
</script>

<style>
/* 从原应用 CSS 恢复（data-v-d5b8b655） */
[data-v-d5b8b655]{background:var(--background);width:100%;min-width:0;min-height:0;color:var(--foreground);flex-direction:column;flex:1;display:flex;overflow:hidden}
[data-v-d5b8b655]{border-bottom:1px solid var(--border);flex-shrink:0;align-items:center;gap:8px;height:48px;padding:0 12px;display:flex}
[data-v-d5b8b655]{font-size:13px;font-weight:600}
[data-v-d5b8b655]{background:var(--muted);color:var(--muted-foreground);border-radius:5px;padding:1px 6px;font-size:11px}
[data-v-d5b8b655]{scrollbar-width:thin;flex:1;min-height:0;overflow:hidden auto}
[data-v-d5b8b655]{color:var(--muted-foreground);flex-wrap:wrap;justify-content:space-between;align-items:center;gap:8px;padding:16px 16px 8px;font-size:11px;display:flex}
[data-v-d5b8b655]{background:var(--muted);border-radius:8px;gap:2px;padding:3px;display:flex}
[data-v-d5b8b655]{cursor:pointer;border-radius:5px;padding:4px 9px;font-size:11px}
[data-v-d5b8b655]{background:var(--background);color:var(--foreground);box-shadow:0 1px 3px #00000012}
[data-v-d5b8b655]{padding:0 8px 16px}
[data-v-d5b8b655]{border-radius:10px;align-items:flex-start;gap:10px;padding:14px 8px;transition:background .12s;display:flex}
[data-v-d5b8b655]:hover{background:var(--muted)}
[data-v-d5b8b655]{border-top:1px solid color-mix(in srgb, var(--border) 65%, transparent)}
[data-v-d5b8b655]{text-align:left;flex:1;min-width:0}
[data-v-d5b8b655]{overflow-wrap:anywhere;font-size:13px;font-weight:600;line-height:1.6;display:block}
[data-v-d5b8b655]{color:var(--muted-foreground);flex-wrap:wrap;align-items:center;gap:6px 10px;margin-top:7px;font-size:11px;display:flex}
[data-v-d5b8b655]{max-width:100%}
[data-v-d5b8b655]{color:var(--muted-foreground);margin-right:-4px}
[data-v-d5b8b655]{border:1px solid color-mix(in srgb, var(--muted-foreground) 45%, var(--border));width:16px;height:16px;color:var(--primary-foreground);border-radius:4px;flex:0 0 16px;place-items:center;margin-top:3px;display:grid}
[data-v-d5b8b655]{background:var(--primary);border-color:var(--primary)}
[data-v-d5b8b655]:focus-visible{outline:2px solid var(--ring);outline-offset:2px}
[data-v-d5b8b655]{text-align:center;color:var(--muted-foreground);flex-direction:column;align-items:center;gap:10px;padding:60px 12px;font-size:12px;display:flex}
[data-v-d5b8b655]{background:var(--muted);border-radius:16px;place-items:center;width:52px;height:52px;margin-bottom:6px;display:grid}
[data-v-d5b8b655]{color:var(--foreground);font-size:13px;font-weight:500}
[data-v-d5b8b655]{flex-direction:column;flex:1;min-height:0;display:flex}
[data-v-d5b8b655]{padding:22px 20px 24px}
[data-v-d5b8b655]{overflow-wrap:anywhere;font-size:19px;font-weight:650;line-height:1.55}
[data-v-d5b8b655]{min-height:64px;box-shadow:none;border-radius:8px;padding:6px 8px;font-size:18px;font-weight:600;line-height:1.5}
[data-v-d5b8b655]{flex-wrap:wrap;align-items:center;gap:6px;margin-top:12px;display:flex}
[data-v-d5b8b655],.category-pill[data-v-d5b8b655]{background:var(--muted);color:var(--muted-foreground);border-radius:5px;align-items:center;gap:4px;padding:3px 7px;font-size:11px;line-height:1.4;display:inline-flex}
[data-v-d5b8b655],.category-pill[data-v-d5b8b655]{background:color-mix(in srgb, var(--primary) 10%, transparent);color:var(--primary)}
[data-v-d5b8b655]{color:#3b82f6;background:#3b82f61a}
[data-v-d5b8b655]{color:var(--destructive);background:color-mix(in srgb, var(--destructive) 10%, transparent)}
[data-v-d5b8b655]{gap:14px;margin-top:24px;display:grid}
[data-v-d5b8b655]{grid-template-columns:82px minmax(0,1fr);align-items:start;gap:10px;font-size:12px;display:grid}
[data-v-d5b8b655]{min-height:28px;color:var(--muted-foreground);white-space:nowrap;align-items:center;gap:7px;display:inline-flex}
[data-v-d5b8b655]{align-items:center;gap:6px;min-height:28px;font-weight:500;display:inline-flex}
[data-v-d5b8b655]{flex-wrap:wrap;align-items:center;gap:6px;min-height:28px;display:flex}
[data-v-d5b8b655]{border:1px solid var(--border);background:color-mix(in srgb, var(--muted) 45%, var(--background));border-radius:20px;align-items:center;gap:5px;max-width:100%;padding:3px 8px 3px 3px;font-size:11px;display:inline-flex}
[data-v-d5b8b655]{border-top:1px solid var(--border);margin-top:24px;padding-top:18px}
[data-v-d5b8b655]{color:var(--muted-foreground);align-items:center;gap:7px;margin-bottom:12px;font-size:12px;font-weight:500;display:flex}
[data-v-d5b8b655]{overflow-wrap:anywhere;font-size:13px;line-height:1.8}
[data-v-d5b8b655] .markdown-body,.description-content[data-v-d5b8b655] p{font-size:13px;line-height:1.8}
[data-v-d5b8b655]{box-shadow:none;border-radius:8px;font-size:13px;line-height:1.8}
[data-v-d5b8b655]{overflow-wrap:anywhere;align-items:flex-start;gap:8px;padding:6px 0;font-size:12px;line-height:1.6;display:flex}
[data-v-d5b8b655]{border:1px solid var(--border);border-radius:3px;flex:0 0 13px;place-items:center;height:13px;margin-top:3px;display:grid}
[data-v-d5b8b655]{background:var(--primary);color:var(--primary-foreground);border-color:var(--primary)}
[data-v-d5b8b655]{color:var(--muted-foreground);text-decoration:line-through}
[data-v-d5b8b655]{color:var(--muted-foreground);align-items:center;gap:5px;margin-top:24px;font-size:11px;display:inline-flex}
[data-v-d5b8b655]:hover{color:var(--primary)}
[data-v-d5b8b655]{border-top:1px solid var(--border);background:var(--background);flex-wrap:wrap;flex-shrink:0;justify-content:flex-end;align-items:center;gap:8px;padding:12px 16px;display:flex}
[data-v-d5b8b655]{color:#ef4444}
[data-v-d5b8b655]{color:#f59e0b}
[data-v-d5b8b655]{color:#3b82f6}
</style>
