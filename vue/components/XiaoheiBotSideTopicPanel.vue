<template>
<aside data-v-bab976a3 :class="`side-topic-panel`" :aria-label="i(`xiaoheiBot.sideTopic.title`)"><header><div><div><strong>{{ i(`xiaoheiBot.sideTopic.title`) }}</strong></div><div><span><span v-text="i(`xiaoheiBot.sideTopic.replies`,{count:D?.value})" /></span><span>{{ i(`xiaoheiBot.sideTopic.independent`) }}</span></div></div><component :is="P" variant="ghost" size="icon-sm" :class="`side-topic-collapse-button`" :title="i(`xiaoheiBot.sideTopic.collapse`)" :aria-label="i(`xiaoheiBot.sideTopic.collapse`)" @click="e=>r(`close`)" /></header><div ref="h" :class="`consultation-side-scroll`" @scroll="k"><div ref="g" :class="`consultation-side-transcript`"><p>{{ p }}<component :is="P" variant="ghost" size="sm" :disabled="d||f" @click="e=>j()" /></p><div><component :is="zn" :size="20" :class="`animate-spin`" /><span>{{ i(`xiaoheiBot.sideTopic.loading`) }}</span></div><article><div><div><span><img :src="O(x.value.authorBotId)" alt="" /></span></div></div><div><span>{{ toDisplayString(x.value.authorName)+` ` }}<span>{{ i(`xiaoheiBot.sideTopic.sourceLabel`) }}</span></span><div><component :is="cp" :content="x.value.content" open-external-links="" @openlink="c" /></div></div></article><p>{{ i(`xiaoheiBot.sideTopic.empty`) }}</p></div></div><footer><div :class="[`composer`,{'is-busy':S?.value}]"><span v-text="Xe(createElementVNode(`textarea`,{ref_key:`composer`,ref:_,'onUpdate:modelValue':t[2]||=e=>m=e,class:`composer-editor`,rows:`1`,placeholder:i(`xiaoheiBot.sideTopic.composerPlaceholder`),disabled:f,onKeydown:M},null,40,NVt),[[yt,m]])" /><div><span>{{ i(`xiaoheiBot.sideTopic.composerHint`) }}</span><button type="button" :class="`send-button send-button--stop`" :title="i(`xiaoheiBot.sideTopic.stop`)" :aria-label="i(`xiaoheiBot.sideTopic.stop`)" @click="te"><component :is="w" :size="12" :stroke-width="0" fill="currentColor" /></button><button type="button" :class="`send-button`" :disabled="!m.trim()||f" :title="i(`xiaoheiBot.sideTopic.send`)" :aria-label="i(`xiaoheiBot.sideTopic.send`)" @click="ee"><component :is="ws" :size="16" :stroke-width="1.8" /></button></div></div></footer></aside>
</template>

<script setup>
import { createElementVNode, toDisplayString } from 'vue';
import cp from './MarkdownRenderer.vue';

// [兜底] 模板引用但无来源的符号
import { S_is as is, S_ws as ws, S_sm as sm, S_alt as alt, S_NVt as NVt, S_e as e, S_t as t, S_r as r, S_i as i, S_c as c, S_g as g, S_v as v, S_w as w, S_P as P, S_Xe as Xe, S_yt as yt, S_zn as zn } from '../shared.js';
const x = { value: undefined };
const D = { value: undefined };
const S = { value: undefined };
import { ref } from 'vue';

// [setup 还原] 原组件 setup 里初值不依赖 IPC 的声明
let d = ref(false);
let f = ref(false);
let p = ref(``);
let m = ref(``);
let _ = ref(null);
function T(e) {
  return [`pending`, `streaming`, `failed`, `cancelled`].includes(e.status) ? true : !!e.content.trim() || !!N5(e);
}
function O(e) {
  let t = o.value.find(item => item.kind === `xiaohei` && item.botId === e);
  return t ? s(t) : undefined;
}
function k() {
  let value = h.value;
  value && (v.value = value.scrollHeight - value.scrollTop - value.clientHeight < 64);
}
async function j() {
  let e = ++y;
  d.value = true;
  try {
    let messages = await window.electronAPI.xiaoheiBot.listMessages({
      conversationId: b.value
    });
    if (e !== y) return;
    if (!messages.ok) throw Error(messages.error.message);
    u.value = messages.data.messages, p.value = ``, await A();
  } catch (t) {
    e === y && (p.value = t instanceof Error ? t.message : String(t));
  } finally {
    e === y && (d.value = false);
  }
}
async function ee() {
  let e = m.value.trim();
  if (e && !f.value) {
    f.value = true, p.value = ``;
    try {
      let sendMessage = await window.electronAPI.xiaoheiBot.sendMessage({
        taskId: crypto.randomUUID(),
        conversationId: b.value,
        content: e,
        mentions: [],
        attachments: [],
        deliveryMode: S.value ? `append` : `normal`
      });
      if (!sendMessage.ok) throw Error(sendMessage.error.message);
      m.value = ``, ne(), v.value = true, await A(), _.value?.focus();
    } catch (e) {
      p.value = e instanceof Error ? e.message : String(e);
    } finally {
      f.value = false;
    }
  }
}
async function te() {
  if (!S.value) return;
  let abortConversation = await window.electronAPI.xiaoheiBot.abortConversation({
    conversationId: b.value
  });
  abortConversation.ok || (p.value = abortConversation.error.message);
}
function M(e) {
  e.key === `Enter` && !e.shiftKey && !e.isComposing && (e.preventDefault(), ee());
}
</script>

<style>
/* 从原应用 CSS 恢复（data-v-bab976a3） */
[data-v-bab976a3]{border-left:1px solid var(--border);background:var(--background);flex-direction:column;flex:0 0 360px;width:360px;min-width:0;height:100%;min-height:0;display:flex;overflow:hidden}
[data-v-bab976a3]{min-height:66px;padding:11px calc(46px + var(--xiaohei-bot-window-controls-width,0px)) 11px 14px;flex-shrink:0;align-items:center;gap:8px;display:flex;position:relative}
[data-v-bab976a3]{top:0;right:var(--xiaohei-bot-window-controls-width,0px);z-index:1;border-right:1px solid var(--border);border-radius:0;width:38px;height:38px;position:absolute}
[data-v-bab976a3]{flex-direction:column;flex:1;gap:7px;min-width:0;display:flex}
[data-v-bab976a3]{align-items:center;gap:6px;min-width:0;font-size:14px;line-height:20px;display:flex}
[data-v-bab976a3]{text-overflow:ellipsis;white-space:nowrap;min-width:0;font-weight:600;overflow:hidden}
[data-v-bab976a3]{align-items:center;gap:6px;display:flex}
[data-v-bab976a3]{border:1px solid var(--border);color:var(--muted-foreground);white-space:nowrap;border-radius:4px;align-self:flex-start;padding:2px 5px;font-size:10px;line-height:14px}
[data-v-bab976a3]{overscroll-behavior:contain;flex:1;min-height:0;overflow-y:auto}
[data-v-bab976a3]{flex-direction:column;gap:12px;padding:12px;display:flex}
[data-v-bab976a3]{color:var(--muted-foreground);justify-content:center;align-items:center;gap:8px;padding:40px 0;font-size:12px;display:flex}
[data-v-bab976a3]{align-items:flex-start;gap:6px;display:flex}
[data-v-bab976a3]{flex-direction:row-reverse}
[data-v-bab976a3]{flex:0 0 28px;align-self:flex-start;min-height:28px;display:flex}
[data-v-bab976a3]{flex:0 0 28px;width:28px;height:28px;display:flex}
[data-v-bab976a3]{background:var(--muted);border-radius:9px;flex-shrink:0;place-items:center;width:28px;height:28px;font-size:12px;display:grid;overflow:hidden}
[data-v-bab976a3]{object-fit:cover;width:100%;height:100%}
[data-v-bab976a3]{flex-direction:column;align-items:flex-start;gap:3px;min-width:0;max-width:calc(100% - 34px);display:flex}
[data-v-bab976a3]{align-items:flex-end}
[data-v-bab976a3]{color:var(--muted-foreground);align-items:center;gap:6px;font-size:11px;display:inline-flex}
[data-v-bab976a3]{background:var(--muted);overflow-wrap:anywhere;border-radius:3px 11px 11px;min-width:0;max-width:100%;padding:7px 10px}
[data-v-bab976a3]{background:color-mix(in srgb, var(--primary) 9%, var(--background));border-radius:11px 3px 11px 11px}
[data-v-bab976a3] .markdown-body{font-size:13px;line-height:1.6}
[data-v-bab976a3] .markdown-body>:first-child{margin-top:0}
[data-v-bab976a3] .markdown-body>:last-child{margin-bottom:0}
[data-v-bab976a3] .markdown-body p{margin-block:.4em}
[data-v-bab976a3] .markdown-body :is(ul,ol){margin-block:.4em;padding-left:1.45em}
[data-v-bab976a3] .markdown-body li{margin-block:.18em}
[data-v-bab976a3] pre{max-width:100%;overflow-x:auto}
[data-v-bab976a3]{color:var(--muted-foreground);opacity:.75;font-size:10px;line-height:14px}
[data-v-bab976a3]{color:var(--muted-foreground);margin:0;font-size:12px;line-height:1.5}
[data-v-bab976a3]{flex-shrink:0;padding:10px 12px 12px}
[data-v-bab976a3]{border:1px solid var(--border);background:var(--card);border-radius:12px;padding:9px 10px 8px 12px}
[data-v-bab976a3]:focus-within{border-color:var(--ring);box-shadow:0 0 0 2px color-mix(in srgb, var(--ring) 13%, transparent)}
[data-v-bab976a3]{resize:none;width:100%;height:28px;min-height:28px;max-height:168px;color:var(--foreground);font-family:inherit;font-size:var(--xiaohei-bot-text-body);background:0 0;border:0;outline:0;padding:1px 0 4px;line-height:1.55;display:block;overflow-y:auto}
[data-v-bab976a3]{align-items:center;gap:6px;min-height:28px;display:flex}
[data-v-bab976a3]{min-width:0;color:var(--muted-foreground);margin-right:auto;font-size:10px;line-height:14px}
[data-v-bab976a3]{width:28px;height:28px;color:var(--primary-foreground);background:var(--primary);cursor:pointer;border:0;border-radius:8px;flex:none;justify-content:center;align-items:center;padding:0;display:inline-flex}
[data-v-bab976a3]:active:not(:disabled){transform:scale(.94)}
[data-v-bab976a3]:disabled{cursor:default;opacity:.35}
[data-v-bab976a3]{color:var(--foreground);background:var(--accent)}
[data-v-bab976a3]{z-index:10;width:min(360px,100%);height:100%;position:absolute;top:0;right:0}
[data-v-bab976a3]{animation:none}
</style>
