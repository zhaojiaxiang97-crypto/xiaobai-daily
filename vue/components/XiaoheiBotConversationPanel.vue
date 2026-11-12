<template>
<div data-v-2a6eae76><section :class="[`conversation-panel`,{'conversation-panel--with-side-panel':mt.active&&C.id&&(Ht.value||Ut.value),'conversation-panel--with-side-topic':mt.active&&C.id&&Ut.value}]" @dragenter="Yt" @dragover="Xt" @dragleave="e=>Jt.value=Math.max(0,Jt.value-1)" @drop="Zt" @dragend="e=>Jt.value=0"><div><component :is="$s" :size="28" /><strong>{{ l(`xiaoheiBot.dropAttachments`) }}</strong><span>{{ l(`xiaoheiBot.dropAttachmentsHint`) }}</span></div><header><div><component :is="Z5" :origin="C.cloudCreatedOrigin" :origin-key="C.botId??C.id" :synced="!!C.mobileSyncEnabled" badge-size="md" /><div><div><button type="button" :class="`conversation-header__profile-button`" :aria-expanded="S" aria-haspopup="dialog" @click="(...e)=>D&&D(...e)"><span>{{ C.unnamed?OHt(C.name):C.name }}</span><span><span v-text="l(`xiaoheiBot.groupBotCount`,{count:ln.value})" /></span><span>{{ l(`xiaoheiBot.mobileSyncTag`) }}</span></button></div><button type="button" :class="`conversation-header__description`" @click="(...e)=>D&&D(...e)">{{ C.description?.trim()||l(`xiaoheiBot.headerNoDescription`) }}</button></div></div><div :class="[`conversation-header__actions`,{'conversation-header__actions--mac':cn}]" @pointerdowncapture="Pt" @clickcapture="Pt" @pointermovecapture="Ft" @keydowncapture="xt(Ft,[`tab`])"><component :is="Qr" :delay-duration="120" /><component :is="Qr" :delay-duration="120" />{{ undefined }}<component :is="Qr" :delay-duration="120" /></div></header><div ref="un" :class="`message-viewport`" @scroll="(...e)=>ee&&ee(...e)" @wheelpassive="(...e)=>te&&te(...e)"><div ref="rn" :class="`message-list`"><div><component :is="zn" :size="16" :class="`animate-spin`" /><span>{{ l(`common.loading`) }}</span></div><div><component :is="zn" :size="13" :stroke-width="1.8" :class="`activity-spinner`" aria-hidden="true" /><span>{{ l(`xiaoheiBot.loadingOlderMessages`) }}</span></div><component :is="Qr" :delay-duration="120" /><div><span><img :src="u" alt="" /></span><component :is="lHt" /></div><span><span v-text="l(`xiaoheiBot.consultation.waitingFor`,{name:v.map(item=>item.targetName).join(`、`)})" /></span><div><span><component :is="Yo" :size="22" :stroke-width="1.5" /></span><strong>{{ l(`xiaoheiBot.emptyConversationTitle`) }}</strong><p><span v-text="l(`xiaoheiBot.emptyConversationDesc`,{name:C.name})" /></p></div></div></div><footer ref="Lt" :class="`composer-wrap`"><component :is="wt" name="scroll-to-bottom" /><component :is="An" :open="Me" @update:open="q" /></footer></section><component :is="OW" :open="mt.active&&Ot.value&&!!C.id" @update:open="e=>Ot.value=e" /><component :is="eVt" :id="Ht.value" @close="e=>Ht.value=null" /><component :is="RVt" :detail="Ut.value" @close="e=>Ut.value=null" /><component :is="OW" :open="mt.active&&m&&!!(C.kind===`group`||C.botId)" @update:open="e=>m.value=e" /></div>
</template>

<script setup>
import md from './BaseSeparator.vue';
import OW from './Sheet.vue';
import Z5 from './XiaoheiBotAvatarFrame.vue';
import eVt from './XiaoheiBotConsultationPanel.vue';
import RVt from './XiaoheiBotSideTopicPanel.vue';
import lHt from './XiaoheiBotOnboardingCard.vue';
import { S_to as to, S_Yo as Yo, S_is as is, S_$s as $s, S_alt as alt, S_e as e, S_l as l, S_u as u, S_p as p, S_m as m, S_v as v, S_S as S, S_C as C, S_D as D, S_ee as ee, S_te as te, S_Me as Me, S_xt as xt, S_wt as wt, S_Ot as Ot, S_Pt as Pt, S_Ft as Ft, S_Lt as Lt, S_Ht as Ht, S_Ut as Ut, S_Jt as Jt, S_Yt as Yt, S_Xt as Xt, S_Zt as Zt, S_rn as rn, S_cn as cn, S_ln as ln, S_un as un, S_An as An, S_zn as zn, S_Qr as Qr } from '../shared.js';
const event = defineProps({
      active: {
        type: Boolean,
        default: true
      }
    });
const mt = event;
</script>

<style>
/* 从原应用 CSS 恢复（data-v-2a6eae76） */
[data-v-2a6eae76]{width:100%;min-width:0;height:100%;min-height:0;display:flex;position:relative;container:bot-conversation/inline-size}
[data-v-2a6eae76]{--chat-content-max-width:1200px;background:var(--background);flex-direction:column;flex:1;min-width:0;height:100%;display:flex;position:relative;container:bot-chat/inline-size}
[data-v-2a6eae76]{min-height:0;color:var(--muted-foreground);flex-direction:column;flex:1;justify-content:center;align-items:center;gap:10px;font-size:13px;display:flex}
[data-v-2a6eae76]{width:calc(100% + var(--conversation-side-panel-width,310px));z-index:1}
[data-v-2a6eae76]{width:100%}
[data-v-2a6eae76]{padding:0 calc(18px + var(--xiaohei-bot-window-controls-width,0px)) 0 18px;background:color-mix(in srgb, var(--background) 94%, var(--muted));-webkit-user-select:none;user-select:none;-webkit-app-region:no-drag;flex:0 0 56px;justify-content:flex-start;align-items:center;display:flex;position:relative}
[data-v-2a6eae76]{inset:0 var(--xiaohei-bot-window-controls-width,0px) 0 0;z-index:0;-webkit-app-region:drag;position:absolute}
[data-v-2a6eae76]{z-index:1;text-align:left;min-width:0;max-width:min(300px,100% - 160px);color:var(--foreground);cursor:pointer;-webkit-app-region:no-drag;background:0 0;border:0;border-radius:10px;outline:none;align-items:center;gap:10px;margin-left:-4px;padding:4px 6px 4px 4px;transition:background-color .12s,transform .12s cubic-bezier(.23,1,.32,1);display:flex;position:relative}
[data-v-2a6eae76]{border-radius:50%;flex-shrink:0;width:34px;height:34px}
[data-v-2a6eae76]{flex-direction:column;align-items:stretch;gap:0;min-width:0;display:flex}
[data-v-2a6eae76]{align-items:center;gap:4px;min-width:0;height:24px;display:flex}
[data-v-2a6eae76]{min-width:0;font-size:var(--xiaohei-bot-text-body);white-space:nowrap;align-items:center;gap:6px;font-weight:600;line-height:1.25;display:flex}
[data-v-2a6eae76]{text-overflow:ellipsis;min-width:0;overflow:hidden}
[data-v-2a6eae76]:focus-visible,.conversation-header__description[data-v-2a6eae76]:focus-visible,.contact-avatar--header[data-v-2a6eae76]:focus-visible{outline:2px solid var(--ring);outline-offset:2px;border-radius:4px}
[data-v-2a6eae76]{flex:none}
[data-v-2a6eae76]{border:1px solid color-mix(in srgb, var(--muted-foreground) 24%, transparent);height:16px;color:color-mix(in srgb, var(--muted-foreground) 82%, transparent);pointer-events:none;border-radius:4px;flex:none;align-items:center;padding:0 5px;font-size:10px;font-weight:500;line-height:1;display:inline-flex}
[data-v-2a6eae76]{text-align:left;text-overflow:ellipsis;white-space:nowrap;width:100%;max-width:220px;color:var(--muted-foreground);font-size:11px;line-height:1.4;display:block;overflow:hidden}
[data-v-2a6eae76]{z-index:1;pointer-events:auto;-webkit-app-region:no-drag;flex:none;align-items:center;margin-left:5px;display:flex;position:relative}
[data-v-2a6eae76]{margin-left:auto}
[data-v-2a6eae76]{scrollbar-width:thin;flex:1;min-height:0;overflow:hidden auto}
[data-v-2a6eae76]{min-width:0;margin:4px 0 16px;padding-left:44px;position:relative}
[data-v-2a6eae76]{width:34px;height:34px;position:absolute;top:0;left:1px}
[data-v-2a6eae76]{object-fit:contain;width:100%;height:100%;display:block}
[data-v-2a6eae76]{width:100%;max-width:calc(var(--chat-content-max-width) + clamp(32px, 4cqw, 64px));min-height:100%;margin:0 auto;padding:22px clamp(16px,2cqw,32px) 30px}
[data-v-2a6eae76]{min-height:20px;color:var(--muted-foreground);font-size:var(--xiaohei-bot-text-caption);justify-content:center;align-items:center;gap:6px;margin:-8px 0 8px;line-height:1.4;display:flex}
[data-v-2a6eae76]{justify-content:center;align-items:center;margin:20px 0;display:flex}
[data-v-2a6eae76]{white-space:nowrap;color:var(--muted-foreground);flex-shrink:0;font-size:11px;line-height:1.4}
[data-v-2a6eae76]{align-items:flex-start;gap:9px;margin-top:14px;display:flex}
[data-v-2a6eae76]{justify-content:flex-end}
[data-v-2a6eae76]{width:34px;height:34px;display:flex;position:absolute;top:0;right:calc(100% + 9px)}
[data-v-2a6eae76]{justify-content:center;margin-top:16px}
[data-v-2a6eae76]{min-height:22px;color:var(--muted-foreground);background:color-mix(in srgb, var(--muted) 72%, transparent);border-radius:999px;padding:3px 10px;font-size:10px;line-height:1.4;display:inline-block}
[data-v-2a6eae76]{flex-direction:column;align-items:flex-start;gap:4px;min-width:0;max-width:min(78%,880px,100% - 43px);display:flex;position:relative}
[data-v-2a6eae76]:has(.bot-recharge-card){width:380px}
[data-v-2a6eae76]{margin-left:43px}
[data-v-2a6eae76]{align-items:flex-end}
[data-v-2a6eae76]{max-width:100%;color:var(--muted-foreground);overflow-wrap:anywhere;padding:0 2px;font-size:12px;font-weight:500;line-height:1.5;display:block;position:relative}
[data-v-2a6eae76]{flex-direction:column;align-items:flex-start;gap:6px;width:100%;display:flex}
[data-v-2a6eae76]{max-width:100%}
[data-v-2a6eae76]{flex-wrap:wrap;align-items:flex-start;gap:7px;max-width:100%;display:flex;position:relative}
[data-v-2a6eae76]{justify-content:flex-end}
[data-v-2a6eae76]{border:1px solid color-mix(in srgb, var(--border) 82%, transparent);cursor:pointer;border-radius:11px;outline:none;flex:0 0 74px;justify-content:center;align-items:center;width:74px;height:74px;padding:0;transition:border-color .14s,opacity .14s,transform .14s cubic-bezier(.23,1,.32,1);display:inline-flex;overflow:hidden}
[data-v-2a6eae76]:focus-visible{border-color:color-mix(in srgb, var(--foreground) 28%, var(--border));box-shadow:0 0 0 2px color-mix(in srgb, var(--ring) 24%, transparent)}
[data-v-2a6eae76]:active{transform:scale(.97)}
[data-v-2a6eae76]{background:var(--muted)}
[data-v-2a6eae76]{object-fit:cover;width:100%;height:100%}
[data-v-2a6eae76]{color:var(--foreground);background:color-mix(in srgb, var(--muted) 82%, var(--background));text-align:center;flex-direction:column;gap:2px;padding:7px 6px 6px}
[data-v-2a6eae76]{text-overflow:ellipsis;white-space:nowrap;max-width:100%;font-size:9px;font-weight:650;line-height:1.15;overflow:hidden}
[data-v-2a6eae76]{max-width:100%;color:var(--muted-foreground);overflow-wrap:anywhere;-webkit-line-clamp:2;-webkit-box-orient:vertical;font-size:8px;line-height:1.15;display:-webkit-box;overflow:hidden}
[data-v-2a6eae76]{width:40px;height:40px;color:var(--muted-foreground);background:color-mix(in srgb, var(--background) 78%, var(--muted));border-radius:8px;flex:0 0 40px;justify-content:center;align-items:center;display:inline-flex}
[data-v-2a6eae76]{flex-direction:column;flex:1;justify-content:center;gap:3px;min-width:0;display:flex}
[data-v-2a6eae76]{max-width:100%;color:var(--foreground);text-overflow:ellipsis;white-space:nowrap;font-size:11px;font-weight:600;line-height:1.25;display:block;overflow:hidden}
[data-v-2a6eae76]{max-width:100%;color:var(--muted-foreground);text-overflow:ellipsis;white-space:nowrap;font-size:9px;line-height:1.2;display:block;overflow:hidden}
[data-v-2a6eae76]{--message-markdown-inline-code-background:color-mix(in srgb, var(--foreground) 7%, transparent);--message-markdown-inline-code-border:color-mix(in srgb, var(--foreground) 9%, transparent);--message-markdown-code-background:color-mix(in srgb, var(--foreground) 6%, transparent);--message-markdown-code-border:color-mix(in srgb, var(--foreground) 11%, transparent);--message-markdown-code-foreground:var(--foreground);--message-markdown-link:color-mix(in srgb, var(--primary) 88%, var(--foreground));--message-markdown-muted:color-mix(in srgb, var(--foreground) 68%, transparent);--message-markdown-soft-border:color-mix(in srgb, var(--foreground) 13%, transparent);--message-markdown-table-heading:color-mix(in srgb, var(--foreground) 5%, transparent);--message-mention-background:color-mix(in srgb, var(--background) 76%, var(--muted));--message-mention-avatar-foreground:var(--muted-foreground);--message-mention-avatar-background:color-mix(in srgb, var(--foreground) 8%, var(--background));border:1px solid color-mix(in srgb, var(--border) 72%, transparent);min-width:0;max-width:100%;color:var(--foreground);background:var(--muted);font-size:var(--xiaohei-bot-text-body);overflow-wrap:anywhere;white-space:normal;border-radius:5px 12px 12px;padding:9px 12px;line-height:1.6;display:block;position:relative}
[data-v-2a6eae76]{justify-content:center;align-items:center;min-width:1px;height:36px;display:flex;position:relative}
[data-v-2a6eae76]{min-height:36px}
[data-v-2a6eae76]{height:0}
[data-v-2a6eae76]{background:0 0;border:0;overflow:visible}
[data-v-2a6eae76] .markdown-body,.system-message[data-v-2a6eae76] .markdown-body{color:inherit;font-size:inherit;line-height:inherit}
[data-v-2a6eae76] .markdown-body{min-width:0;line-height:1.68}
[data-v-2a6eae76] .markdown-body>:first-child,.system-message[data-v-2a6eae76] .markdown-body>:first-child{margin-top:0}
[data-v-2a6eae76] .markdown-body>:last-child,.system-message[data-v-2a6eae76] .markdown-body>:last-child{margin-bottom:0}
[data-v-2a6eae76] .markdown-body p{margin-block:.5em}
[data-v-2a6eae76] .markdown-body h1,.message-bubble[data-v-2a6eae76] .markdown-body h2,.message-bubble[data-v-2a6eae76] .markdown-body h3{color:inherit;letter-spacing:-.012em;margin-block:.9em .38em;font-weight:650;line-height:1.38}
[data-v-2a6eae76] .markdown-body h1{font-size:1.2em}
[data-v-2a6eae76] .markdown-body h2{font-size:1.12em}
[data-v-2a6eae76] .markdown-body h3{font-size:1.04em}
[data-v-2a6eae76] .markdown-body ul,.message-bubble[data-v-2a6eae76] .markdown-body ol{margin-block:.5em;padding-left:1.42em}
[data-v-2a6eae76] .markdown-body li{margin-block:.22em;padding-left:.08em}
[data-v-2a6eae76] .markdown-body li::marker{color:var(--message-markdown-muted)}
[data-v-2a6eae76] .markdown-body li>ul,.message-bubble[data-v-2a6eae76] .markdown-body li>ol{margin-block:.22em}
[data-v-2a6eae76] .markdown-body a:not(.markdown-local-file){color:var(--message-markdown-link);text-decoration:underline;-webkit-text-decoration-color:color-mix(in srgb, currentColor 45%, transparent);text-decoration-color:color-mix(in srgb, currentColor 45%, transparent);text-underline-offset:2px;font-weight:500;text-decoration-thickness:1px}
[data-v-2a6eae76] .markdown-mention-chip{max-width:min(180px,100%);height:1.65em;color:inherit;background:var(--message-mention-background);vertical-align:middle;white-space:nowrap;border-radius:.5em;align-items:center;gap:.32em;padding:.1em .5em .1em .16em;font-size:.94em;font-weight:550;line-height:1;display:inline-flex}
[data-v-2a6eae76] .markdown-mention-chip__avatar{width:1.32em;height:1.32em;color:var(--message-mention-avatar-foreground);background:var(--message-mention-avatar-background);border-radius:50%;flex:none;justify-content:center;align-items:center;font-size:.78em;font-weight:650;display:inline-flex;overflow:hidden}
[data-v-2a6eae76] .markdown-mention-chip__avatar img{object-fit:cover;width:100%;height:100%;display:block}
[data-v-2a6eae76] .markdown-mention-chip__name{text-overflow:ellipsis;min-width:0;overflow:hidden}
[data-v-2a6eae76] .markdown-body code{border:1px solid var(--message-markdown-inline-code-border);color:inherit;background:var(--message-markdown-inline-code-background);font-variant-ligatures:none;border-radius:5px;padding:.12em .38em;font-size:.88em}
[data-v-2a6eae76] .markdown-body pre{overscroll-behavior-inline:contain;border:1px solid var(--message-markdown-code-border);max-width:100%;color:var(--message-markdown-code-foreground);background:var(--message-markdown-code-background);scrollbar-width:thin;border-radius:9px;margin-block:.65em;padding:10px 12px;overflow-x:auto}
[data-v-2a6eae76] .markdown-body pre code,.message-row--self .message-bubble[data-v-2a6eae76] .markdown-body pre code{min-width:max-content;color:inherit;white-space:pre;overflow-wrap:normal;word-break:normal;tab-size:2;background:0 0;border:0;border-radius:0;padding:0;font-size:.88em;line-height:1.58;display:block}
[data-v-2a6eae76] .markdown-body blockquote{border-left:2px solid var(--message-markdown-soft-border);color:var(--message-markdown-muted);margin-block:.62em;padding:.08em 0 .08em .78em}
[data-v-2a6eae76] .markdown-body blockquote p{margin-block:.28em}
[data-v-2a6eae76] .markdown-body table{border:1px solid var(--message-markdown-code-border);border-collapse:separate;border-spacing:0;width:max-content;max-width:100%;color:var(--message-markdown-code-foreground);background:var(--message-markdown-code-background);scrollbar-width:thin;border-radius:8px;margin-block:.65em;display:block;overflow-x:auto}
[data-v-2a6eae76] .markdown-body th,.message-bubble[data-v-2a6eae76] .markdown-body td{border:0;border-right:1px solid var(--message-markdown-code-border);border-bottom:1px solid var(--message-markdown-code-border);white-space:normal;min-width:88px;padding:.48em .68em}
[data-v-2a6eae76] .markdown-body th{background:var(--message-markdown-table-heading);font-weight:600}
[data-v-2a6eae76] .markdown-body tr>:last-child{border-right:0}
[data-v-2a6eae76] .markdown-body tbody tr:last-child td{border-bottom:0}
[data-v-2a6eae76] .markdown-body hr{border-color:var(--message-markdown-soft-border);margin-block:.72em}
[data-v-2a6eae76]{--message-markdown-inline-code-background:color-mix(in srgb, var(--primary-foreground) 12%, transparent);--message-markdown-inline-code-border:color-mix(in srgb, var(--primary-foreground) 14%, transparent);--message-markdown-code-background:color-mix(in srgb, var(--primary-foreground) 9%, transparent);--message-markdown-code-border:color-mix(in srgb, var(--primary-foreground) 16%, transparent);--message-markdown-code-foreground:var(--primary-foreground);--message-markdown-link:var(--primary-foreground);--message-markdown-muted:color-mix(in srgb, var(--primary-foreground) 76%, transparent);--message-markdown-soft-border:color-mix(in srgb, var(--primary-foreground) 24%, transparent);--message-markdown-table-heading:color-mix(in srgb, var(--primary-foreground) 12%, transparent);--message-mention-background:color-mix(in srgb, var(--primary-foreground) 18%, transparent);--message-mention-avatar-foreground:var(--primary-foreground);--message-mention-avatar-background:color-mix(in srgb, var(--primary-foreground) 16%, transparent);color:var(--primary-foreground);background:var(--primary);border-color:#0000;border-radius:12px 5px 12px 12px}
[data-v-2a6eae76]{border:1px solid color-mix(in srgb, var(--border) 76%, transparent);min-height:18px;color:var(--muted-foreground);background:color-mix(in srgb, var(--muted) 48%, transparent);border-radius:999px;align-items:center;padding:2px 6px;font-size:9px;font-weight:500;line-height:1.2;display:inline-flex}
[data-v-2a6eae76]{color:color-mix(in srgb, var(--foreground) 84%, var(--muted-foreground))}
[data-v-2a6eae76]{opacity:0;pointer-events:none;align-items:center;gap:5px;min-width:66px;min-height:20px;transition:opacity .14s;display:inline-flex}
[data-v-2a6eae76]{justify-content:flex-end}
[data-v-2a6eae76]{opacity:1;pointer-events:auto}
[data-v-2a6eae76]{opacity:1;pointer-events:auto}
[data-v-2a6eae76]{color:var(--muted-foreground);padding:0 1px;font-size:9px;line-height:1.2}
[data-v-2a6eae76]{width:20px;height:20px;color:var(--muted-foreground);cursor:pointer;background:0 0;border:0;border-radius:5px;outline:none;flex:0 0 20px;justify-content:center;align-items:center;padding:0;transition:color .12s,background-color .12s,transform .12s cubic-bezier(.23,1,.32,1);display:inline-flex}
[data-v-2a6eae76]:focus-visible{color:var(--foreground);background:var(--accent);box-shadow:0 0 0 2px color-mix(in srgb, var(--ring) 22%, transparent)}
[data-v-2a6eae76]:active{transform:scale(.94)}
[data-v-2a6eae76]:disabled{cursor:default;opacity:.48}
[data-v-2a6eae76]{text-align:center;flex-direction:column;min-height:300px}
[data-v-2a6eae76]{width:42px;height:42px;color:var(--primary);background:color-mix(in srgb, var(--primary) 10%, var(--background));border-radius:12px;justify-content:center;align-items:center;margin-bottom:12px;display:inline-flex}
[data-v-2a6eae76]{color:var(--foreground);font-size:13px;font-weight:600}
[data-v-2a6eae76]{max-width:320px;margin:5px 0 0;font-size:11px;line-height:1.5}
[data-v-2a6eae76]{-webkit-app-region:no-drag;position:absolute;bottom:calc(100% + 16px);right:128px}
[data-v-2a6eae76],.scroll-to-bottom-leave-active[data-v-2a6eae76]{transition:opacity .22s}
[data-v-2a6eae76],.scroll-to-bottom-leave-to[data-v-2a6eae76]{opacity:0}
[data-v-2a6eae76]{pointer-events:none}
[data-v-2a6eae76],.scroll-to-bottom-leave-active[data-v-2a6eae76]{transition:none}
[data-v-2a6eae76]{background:0 0;flex:none;padding:12px clamp(16px,2cqw,32px) 14px;position:relative}
[data-v-2a6eae76]{width:100%;max-width:var(--chat-content-max-width);border:1px solid var(--border);background:var(--card);border-radius:12px;margin:0 auto;padding:9px 10px 8px 12px;transition:border-color .14s,box-shadow .14s;position:relative}
[data-v-2a6eae76]:focus-within{border-color:var(--ring);box-shadow:0 0 0 2px color-mix(in srgb, var(--ring) 13%, transparent)}
[data-v-2a6eae76]{overscroll-behavior-x:contain;scrollbar-width:none;flex-wrap:nowrap;align-items:flex-start;gap:9px;max-width:100%;padding:6px 6px 10px;display:flex;overflow-x:auto}
[data-v-2a6eae76]::-webkit-scrollbar{width:0;height:0;display:none}
[data-v-2a6eae76]{flex:0 0 62px;width:62px;height:62px;position:relative}
[data-v-2a6eae76]{flex:0 0 230px;width:230px;min-width:0;max-width:100%}
[data-v-2a6eae76]{border:1px solid var(--border);border-radius:9px;outline:none;justify-content:center;align-items:center;width:100%;height:100%;padding:0;transition:border-color .14s,transform .14s cubic-bezier(.23,1,.32,1);display:flex;overflow:hidden}
[data-v-2a6eae76]{cursor:pointer}
[data-v-2a6eae76]:focus-visible{border-color:color-mix(in srgb, var(--foreground) 28%, var(--border));box-shadow:0 0 0 2px color-mix(in srgb, var(--ring) 22%, transparent)}
[data-v-2a6eae76]:active{transform:scale(.97)}
[data-v-2a6eae76]{color:var(--foreground);background:var(--card);text-align:left;justify-content:flex-start;gap:9px;padding:7px}
[data-v-2a6eae76]{background:var(--muted);border-radius:7px;flex-basis:38px;width:38px;height:38px}
[data-v-2a6eae76]{border:1px solid var(--border);width:18px;height:18px;color:var(--foreground);background:var(--background);box-shadow:0 2px 7px color-mix(in srgb, var(--foreground) 12%, transparent);cursor:pointer;border-radius:50%;outline:none;justify-content:center;align-items:center;padding:0;transition:background-color .12s,transform .12s cubic-bezier(.23,1,.32,1);display:inline-flex;position:absolute;top:-4px;right:-4px}
[data-v-2a6eae76]:focus-visible{background:var(--accent);box-shadow:0 0 0 2px color-mix(in srgb, var(--ring) 22%, transparent)}
[data-v-2a6eae76]:active{transform:scale(.94)}
[data-v-2a6eae76]{-webkit-app-region:no-drag}
[data-v-2a6eae76]{flex-direction:column;gap:2px;min-width:0;display:flex}
[data-v-2a6eae76]{text-align:left;border-radius:9px;justify-content:flex-start;align-items:center;gap:9px;width:100%;height:auto;min-height:40px;padding:5px 8px;display:flex}
[data-v-2a6eae76]:hover,.mention-option--active[data-v-2a6eae76]{background:var(--accent)}
[data-v-2a6eae76]{width:30px;height:30px;font-size:10px}
[data-v-2a6eae76]{color:var(--muted-foreground);background:var(--muted);font-size:15px;font-weight:600}
[data-v-2a6eae76]{flex:1;min-width:0}
[data-v-2a6eae76]{font-size:var(--xiaohei-bot-text-body);text-overflow:ellipsis;white-space:nowrap;font-weight:500;line-height:1.35;display:block;overflow:hidden}
[data-v-2a6eae76]{height:auto;color:var(--muted-foreground);font-size:var(--xiaohei-bot-text-caption);background:0 0;border:0;flex:none;margin-left:auto;padding:0;font-weight:400}
[data-v-2a6eae76]{gap:0;min-height:76px;padding:16px}
[data-v-2a6eae76] [data-slot=empty-description]{margin:0;font-size:11px}
[data-v-2a6eae76]{min-width:0}
[data-v-2a6eae76]{width:100%;height:28px;min-height:28px;max-height:168px;color:var(--foreground);caret-color:var(--foreground);font-family:inherit;font-size:var(--xiaohei-bot-text-body);letter-spacing:normal;white-space:pre-wrap;overflow-wrap:anywhere;word-break:normal;tab-size:4;background:0 0;border:0;outline:0;padding:1px 0 4px;font-style:normal;font-weight:400;line-height:1.55;display:block;overflow-y:hidden}
[data-v-2a6eae76]:empty:before{color:var(--muted-foreground);content:attr(data-placeholder);opacity:1;pointer-events:none}
[data-v-2a6eae76]::selection{background:var(--accent)}
[data-v-2a6eae76] ::selection{background:var(--accent)}
[data-v-2a6eae76] .composer-mention-chip{max-width:180px;height:1.72em;color:var(--foreground);background:var(--muted);vertical-align:middle;white-space:nowrap;cursor:pointer;-webkit-user-select:all;user-select:all;border:0;border-radius:.5em;align-items:center;gap:5px;margin:0 2px;padding:.12em .55em .12em .18em;font-size:.94em;font-weight:500;line-height:1;display:inline-flex}
[data-v-2a6eae76] .composer-mention-chip__name{text-overflow:ellipsis;white-space:nowrap;min-width:0;overflow:hidden}
[data-v-2a6eae76] .composer-mention-chip__avatar{width:1em;height:1em;color:var(--foreground);background:var(--background);border-radius:50%;flex:none;justify-content:center;align-items:center;font-weight:600;line-height:1;display:inline-flex;overflow:hidden}
[data-v-2a6eae76] .composer-mention-chip__avatar--all{color:var(--muted-foreground);background:color-mix(in srgb, var(--background) 74%, var(--muted))}
[data-v-2a6eae76] .composer-mention-chip__initial{font-size:.72em;line-height:1;display:block}
[data-v-2a6eae76] .composer-mention-chip__avatar--all .composer-mention-chip__initial{font-size:.82em}
[data-v-2a6eae76] .composer-mention-chip__avatar img{object-fit:cover;width:100%;height:100%;display:block}
[data-v-2a6eae76]{justify-content:flex-start;align-items:center;gap:6px;min-height:28px;display:flex}
[data-v-2a6eae76],.composer__footer>.composer-delivery-actions[data-v-2a6eae76]{margin-left:auto}
[data-v-2a6eae76]{min-width:0;color:var(--muted-foreground);white-space:nowrap;align-items:center;gap:5px;margin-right:auto;font-size:11px;line-height:1;display:inline-flex;overflow:hidden}
[data-v-2a6eae76]{flex:none;animation:.9s linear infinite activity-spin-2a6eae76}
[data-v-2a6eae76]{text-overflow:ellipsis;overflow:hidden}
[data-v-2a6eae76]{display:none}
[data-v-2a6eae76]{width:28px;height:28px;color:var(--muted-foreground);cursor:pointer;background:0 0;border:0;border-radius:8px;outline:none;flex:none;justify-content:center;align-items:center;padding:0;transition:color .12s,background-color .12s,transform .12s cubic-bezier(.23,1,.32,1);display:inline-flex}
[data-v-2a6eae76]:hover{color:var(--foreground);background:var(--accent)}
[data-v-2a6eae76]:active{transform:scale(.94)}
[data-v-2a6eae76]{width:28px;height:28px;color:var(--primary-foreground);background:var(--primary);cursor:pointer;border:0;border-radius:8px;outline:none;flex:none;justify-content:center;align-items:center;padding:0;transition:opacity .12s,transform .12s cubic-bezier(.23,1,.32,1);display:inline-flex}
[data-v-2a6eae76]{-webkit-app-region:no-drag;align-items:center;gap:5px;display:inline-flex}
[data-v-2a6eae76]{height:28px;color:var(--muted-foreground);background:var(--accent);cursor:pointer;border:0;border-radius:8px;outline:none;justify-content:center;align-items:center;gap:5px;padding:0 9px;font-size:11px;font-weight:500;line-height:1;transition:opacity .12s,color .12s,background-color .12s,transform .12s cubic-bezier(.23,1,.32,1);display:inline-flex}
[data-v-2a6eae76]{color:var(--primary-foreground);background:var(--primary)}
[data-v-2a6eae76]:active:not(:disabled){transform:scale(.96)}
[data-v-2a6eae76]:disabled{cursor:default;opacity:.35}
[data-v-2a6eae76]:active:not(:disabled){transform:scale(.94)}
[data-v-2a6eae76]:disabled{cursor:default;opacity:.35}
[data-v-2a6eae76]{color:var(--foreground);background:var(--accent)}
[data-v-2a6eae76]:hover,button.composer-attachment__preview[data-v-2a6eae76]:hover{border-color:color-mix(in srgb, var(--foreground) 28%, var(--border))}
[data-v-2a6eae76]:hover{color:var(--foreground);background:var(--accent)}
[data-v-2a6eae76]:hover{background:var(--accent)}
[data-v-2a6eae76]{padding-top:12px}
[data-v-2a6eae76]{right:24px}
[data-v-2a6eae76]{max-width:min(88%,100% - 43px)}
[data-v-2a6eae76],.contact-item[data-v-2a6eae76],.conversation-header__identity[data-v-2a6eae76],.profile-panel__close[data-v-2a6eae76],.profile-edit-avatar-button[data-v-2a6eae76],.message-attachment[data-v-2a6eae76],.message-copy-button[data-v-2a6eae76],button.composer-attachment__preview[data-v-2a6eae76],.composer-attachment__remove[data-v-2a6eae76],.attachment-button[data-v-2a6eae76],.send-button[data-v-2a6eae76],.avatar-preset-button[data-v-2a6eae76],.avatar-color-button[data-v-2a6eae76]{transition:background-color .1s,border-color .1s,opacity .1s}
[data-v-2a6eae76]:active,.contact-item[data-v-2a6eae76]:active,.conversation-header__identity[data-v-2a6eae76]:active,.profile-panel__close[data-v-2a6eae76]:active,.profile-edit-avatar-button[data-v-2a6eae76]:active,.message-attachment[data-v-2a6eae76]:active,.message-copy-button[data-v-2a6eae76]:active,button.composer-attachment__preview[data-v-2a6eae76]:active,.composer-attachment__remove[data-v-2a6eae76]:active,.attachment-button[data-v-2a6eae76]:active,.send-button[data-v-2a6eae76]:active:not(:disabled),.avatar-preset-button[data-v-2a6eae76]:active,.avatar-color-button[data-v-2a6eae76]:active{transform:none}
[data-v-2a6eae76]{transition:none}
[data-v-2a6eae76]{animation:none}
[data-v-2a6eae76]{z-index:30;border:2px dashed var(--primary);background:color-mix(in srgb, var(--background) 94%, transparent);color:var(--foreground);pointer-events:none;border-radius:18px;flex-direction:column;justify-content:center;align-items:center;gap:12px;display:flex;position:absolute;inset:12px}
[data-v-2a6eae76],.attachment-import-status[data-v-2a6eae76]{color:var(--muted-foreground);font-size:12px}
[data-v-2a6eae76]{align-items:center;gap:6px;display:inline-flex}
[data-v-2a6eae76]{background:var(--card);padding:0}
[data-v-2a6eae76]{object-fit:cover;width:100%;height:100%;display:block}
[data-v-2a6eae76]:focus-visible{outline:2px solid var(--ring);outline-offset:2px}
[data-v-2a6eae76]{color:var(--muted-foreground);align-self:center;font-size:12px;line-height:1.6}
[data-v-2a6eae76]{flex-wrap:wrap;gap:6px;margin-top:5px;display:flex}
[data-v-2a6eae76]{border:1px solid var(--border);width:fit-content;max-width:100%;height:26px;color:var(--foreground);cursor:pointer;background:0 0;border-radius:6px;justify-content:flex-start;align-items:center;gap:5px;padding:0 8px;font-size:11px;font-weight:400;line-height:1;transition:background-color .15s;display:inline-flex}
[data-v-2a6eae76]{text-overflow:ellipsis;white-space:nowrap;overflow:hidden}
[data-v-2a6eae76]{flex-shrink:0}
[data-v-2a6eae76]:hover,.message-link-tag[aria-expanded=true][data-v-2a6eae76]{background:var(--muted)}
[data-v-2a6eae76]:focus-visible{outline:2px solid var(--ring);outline-offset:2px}
[data-v-2a6eae76]{animation:none}
</style>
