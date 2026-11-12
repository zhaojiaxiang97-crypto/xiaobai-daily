<template>
<div data-v-9bc4361e :class="`profile-member`"><span :class="[`contact-avatar contact-avatar--member`,`contact-avatar--${e.kind}`]"><img :src="le(e)" alt="" /></span><span><strong :title="e.handoffRole"><span>{{ e.name }}</span><component :is="Pp" variant="secondary" :class="`profile-member__admin`" /></strong><span>{{ ue(e) }}</span></span><component :is="Pp" variant="secondary" :class="`profile-member__owner`" /><component :is="Pp" variant="secondary" :class="`profile-member__owner`" /><component :is="P" type="button" variant="ghost" size="icon-xs" :class="`profile-member__remove`" :title="t(`xiaoheiBot.removeGroupMember`,{name:e.name})" :aria-label="t(`xiaoheiBot.removeGroupMember`,{name:e.name})" @click="withDirectives(t=>me(e),[`stop`])" /></div>
</template>

<script setup>
import { withDirectives } from 'vue';
import Pp from './Badge.vue';
import { S_is as is, S_xs as xs, S_alt as alt, S_t as t, S_le as le, S_ue as ue, S_me as me, S_P as P } from '../shared.js';
const e = defineProps({});
</script>

<style>
/* 从原应用 CSS 恢复（data-v-9bc4361e） */
[data-v-9bc4361e]{border-bottom:1px solid var(--border);-webkit-user-select:none;user-select:none;flex-direction:row;flex:0 0 50px;justify-content:space-between;align-items:center;gap:12px;padding:0 16px;display:flex}
[data-v-9bc4361e] [data-slot=sheet-title]{margin:0;font-size:16px;font-weight:600;line-height:1.3}
[data-v-9bc4361e]{-webkit-app-region:no-drag;align-items:center;gap:2px;display:flex}
[data-v-9bc4361e]{width:28px;height:28px;color:var(--muted-foreground);cursor:pointer;-webkit-app-region:no-drag;background:0 0;border:0;border-radius:8px;outline:none;flex:none;justify-content:center;align-items:center;padding:0;transition:color .12s,background-color .12s,transform .12s cubic-bezier(.23,1,.32,1);display:inline-flex}
[data-v-9bc4361e]:hover{color:var(--foreground);background:var(--accent)}
[data-v-9bc4361e]:active{transform:scale(.94)}
[data-v-9bc4361e]{overscroll-behavior:contain;scrollbar-width:thin;flex:1;min-height:0;padding:16px;overflow-y:auto}
[data-v-9bc4361e]{flex-direction:column;min-height:100%;display:flex}
[data-v-9bc4361e]{flex-direction:column;align-items:center;padding:10px 8px 18px;display:flex}
[data-v-9bc4361e]{cursor:pointer;background:0 0;border:0;border-radius:50%;outline:none;padding:0;transition:transform .14s cubic-bezier(.23,1,.32,1);display:inline-flex;position:relative}
[data-v-9bc4361e]:active{transform:scale(.97)}
[data-v-9bc4361e]:focus-visible{outline:2px solid color-mix(in srgb, var(--ring) 52%, transparent);outline-offset:3px}
[data-v-9bc4361e]{border:2px solid color-mix(in srgb, var(--muted) 34%, var(--background));width:23px;height:23px;color:var(--primary-foreground);background:var(--primary);border-radius:50%;justify-content:center;align-items:center;display:inline-flex;position:absolute;bottom:8px;right:-1px}
[data-v-9bc4361e]{color:var(--muted-foreground);font-size:var(--xiaohei-bot-text-caption);margin-top:-3px;line-height:1.4}
[data-v-9bc4361e]{gap:14px;padding-bottom:16px}
[data-v-9bc4361e] [data-slot=field-label]{font-weight:500}
[data-v-9bc4361e] [data-slot=input],.profile-edit-fields[data-v-9bc4361e] [data-slot=textarea],.profile-edit-fields[data-v-9bc4361e] [data-slot=select-trigger]{background:color-mix(in srgb, var(--background) 92%, var(--muted))}
[data-v-9bc4361e]{resize:vertical;min-height:104px}
[data-v-9bc4361e]{background:color-mix(in srgb, var(--background) 90%, var(--muted));border-radius:12px;justify-content:space-between;align-items:center;gap:14px;padding:12px}
[data-v-9bc4361e]{min-width:0}
[data-v-9bc4361e]{color:var(--muted-foreground);margin:3px 0 0;font-size:13px;line-height:1.5}
[data-v-9bc4361e]{background:var(--background);border-top:1px solid var(--border);justify-content:flex-end;gap:8px;margin-top:auto;padding:12px 0;display:flex;position:sticky;bottom:-16px}
[data-v-9bc4361e]{align-items:center;gap:14px;padding:4px 0 20px;display:flex}
[data-v-9bc4361e]{flex-wrap:wrap}
[data-v-9bc4361e]{margin-left:auto}
[data-v-9bc4361e]{flex:0 0 56px;width:56px;height:56px;font-size:18px}
[data-v-9bc4361e]{flex-direction:column;flex:1;align-items:flex-start;min-width:0;display:flex}
[data-v-9bc4361e]{text-overflow:ellipsis;white-space:nowrap;max-width:100%;font-size:14px;font-weight:600;line-height:1.35;overflow:hidden}
[data-v-9bc4361e]{color:var(--muted-foreground);margin-top:4px;font-size:10px;line-height:1.3}
[data-v-9bc4361e]{flex-wrap:wrap;gap:5px;margin-top:8px;display:flex}
[data-v-9bc4361e]{background:color-mix(in srgb, var(--background) 90%, var(--muted));border-radius:12px;padding:13px 14px}
[data-v-9bc4361e]{margin-top:10px}
[data-v-9bc4361e]{color:var(--foreground);margin:0;font-size:11px;font-weight:600;line-height:1.4}
[data-v-9bc4361e]{color:var(--muted-foreground);overflow-wrap:anywhere;margin:7px 0 0;font-size:11px;line-height:1.6}
[data-v-9bc4361e]{flex-direction:column;gap:14px;display:flex}
[data-v-9bc4361e]{justify-content:space-between;align-items:center;gap:12px;display:flex}
[data-v-9bc4361e]{color:var(--muted-foreground);flex-shrink:0;font-size:11px;line-height:1.4}
[data-v-9bc4361e]{flex-wrap:wrap;align-items:center;gap:6px;margin-top:7px;display:flex}
[data-v-9bc4361e]{min-width:0;color:var(--muted-foreground);overflow-wrap:anywhere;margin:0;font-size:11px;line-height:1.6}
[data-v-9bc4361e] [data-slot=select-value]{flex:1;min-width:0}
[data-v-9bc4361e]{flex:1;align-items:center;gap:8px;min-width:0;display:flex}
[data-v-9bc4361e]{text-overflow:ellipsis;white-space:nowrap;min-width:0;overflow:hidden}
[data-v-9bc4361e]{flex:none;align-items:center;gap:4px;display:inline-flex}
[data-v-9bc4361e] [data-slot=badge]{height:18px;padding-inline:6px;font-size:9px}
[data-v-9bc4361e]{flex-wrap:wrap}
[data-v-9bc4361e]{justify-content:space-between;align-items:center;gap:12px;display:flex}
[data-v-9bc4361e]{min-width:0}
[data-v-9bc4361e]{color:var(--muted-foreground);margin-top:2px;font-size:9px;line-height:1.3;display:block}
[data-v-9bc4361e]{width:30px;height:30px;color:var(--foreground);background:var(--muted);border-radius:9px;flex:none;justify-content:center;align-items:center;display:inline-flex}
[data-v-9bc4361e]{justify-content:space-between;align-items:center;gap:12px;display:flex}
[data-v-9bc4361e]{min-width:0}
[data-v-9bc4361e]{color:var(--muted-foreground);margin:4px 0 0;font-size:10px;line-height:1.45}
[data-v-9bc4361e]{border:1px solid color-mix(in srgb, var(--destructive) 18%, transparent);background:color-mix(in srgb, var(--destructive) 4%, var(--background))}
[data-v-9bc4361e]{color:var(--destructive)}
[data-v-9bc4361e]{gap:4px;margin-top:9px;display:grid}
[data-v-9bc4361e]{border:1px dashed var(--border);border-radius:8px;align-items:center;gap:9px;min-width:0;padding:5px 4px;display:flex}
[data-v-9bc4361e]:hover{background:color-mix(in srgb, var(--accent) 58%, transparent)}
[data-v-9bc4361e]{width:28px;height:28px;font-size:10px}
[data-v-9bc4361e]{flex-direction:column;flex:1;gap:1px;min-width:0;display:flex}
[data-v-9bc4361e]{text-overflow:ellipsis;white-space:nowrap;align-items:center;gap:6px;min-width:0;font-size:11px;font-weight:500;line-height:1.35;display:flex;overflow:hidden}
[data-v-9bc4361e]{height:18px;color:var(--foreground);background:color-mix(in srgb, var(--foreground) 10%, var(--background));align-self:center;padding:0 5px;font-size:10px;line-height:1}
[data-v-9bc4361e]{color:var(--muted-foreground);font-size:9px;line-height:1.3}
[data-v-9bc4361e]{height:18px;padding-inline:6px;font-size:8px;font-weight:500}
[data-v-9bc4361e]{height:22px;color:var(--muted-foreground);padding-inline:5px;font-size:8px}
[data-v-9bc4361e]{min-width:88px;max-width:160px;height:24px;padding-inline:7px;font-size:9px}
[data-v-9bc4361e]{color:var(--muted-foreground);transition:color .12s,background-color .12s}
[data-v-9bc4361e]:hover{color:var(--destructive)}
[data-v-9bc4361e]{grid-template-columns:minmax(0,1fr) auto;column-gap:12px;display:grid}
[data-v-9bc4361e]{grid-area:1/1;align-items:center;gap:5px;min-width:0;display:flex}
[data-v-9bc4361e]{min-width:0}
[data-v-9bc4361e]{border:1px solid var(--border);width:100%;height:34px;color:var(--muted-foreground);background:var(--background);cursor:pointer;text-align:left;border-radius:8px;grid-column:1/-1;align-items:center;gap:7px;margin-top:8px;padding:0 10px;transition:color .12s,background-color .12s,transform .12s cubic-bezier(.23,1,.32,1);display:flex}
[data-v-9bc4361e]:disabled{cursor:default;opacity:.62}
[data-v-9bc4361e]:not(:disabled):hover{color:var(--foreground);background:var(--accent)}
[data-v-9bc4361e]:not(:disabled):active{transform:translateY(1px)}
[data-v-9bc4361e]{color:var(--muted-foreground);flex:none}
[data-v-9bc4361e]{min-width:0;font-size:var(--xiaohei-bot-text-body);text-overflow:ellipsis;white-space:nowrap;font-weight:400;line-height:1.4;overflow:hidden}
[data-v-9bc4361e]{grid-area:1/2;align-self:center;gap:6px;display:flex}
[data-v-9bc4361e] [data-slot=button]{height:28px;color:var(--foreground);font-size:var(--xiaohei-bot-text-caption);gap:6px;padding-inline:9px;font-weight:500;line-height:1}
[data-v-9bc4361e]{opacity:1}
[data-v-9bc4361e],.contact-item[data-v-9bc4361e],.conversation-header__identity[data-v-9bc4361e],.profile-panel__close[data-v-9bc4361e],.profile-edit-avatar-button[data-v-9bc4361e],.message-attachment[data-v-9bc4361e],.message-copy-button[data-v-9bc4361e],button.composer-attachment__preview[data-v-9bc4361e],.composer-attachment__remove[data-v-9bc4361e],.attachment-button[data-v-9bc4361e],.send-button[data-v-9bc4361e],.avatar-preset-button[data-v-9bc4361e],.avatar-color-button[data-v-9bc4361e]{transition:background-color .1s,border-color .1s,opacity .1s}
[data-v-9bc4361e]:active,.contact-item[data-v-9bc4361e]:active,.conversation-header__identity[data-v-9bc4361e]:active,.profile-panel__close[data-v-9bc4361e]:active,.profile-edit-avatar-button[data-v-9bc4361e]:active,.message-attachment[data-v-9bc4361e]:active,.message-copy-button[data-v-9bc4361e]:active,button.composer-attachment__preview[data-v-9bc4361e]:active,.composer-attachment__remove[data-v-9bc4361e]:active,.attachment-button[data-v-9bc4361e]:active,.send-button[data-v-9bc4361e]:active:not(:disabled),.avatar-preset-button[data-v-9bc4361e]:active,.avatar-color-button[data-v-9bc4361e]:active{transform:none}
[data-v-9bc4361e]{transition:none}
[data-v-9bc4361e]{animation:none}
</style>
