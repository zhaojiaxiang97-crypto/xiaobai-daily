<template>
<aside data-v-6ecb36b3><p> 预览模式：按会话随机展示 App 手机角标（确认后关闭 preview-platform-origin.ts） </p><div><div><div><h2>{{ t(`xiaoheiBot.conversations`) }}</h2><span :class="`contact-panel__count`" :aria-label="i?t(`xiaoheiBot.contactCount`,{count:l.length}):t(`common.loading`)">{{ i?l.length:t(`common.loading`) }}</span></div><div><component :is="P" type="button" variant="ghost" size="icon" :class="`icon-button`" :title="t(`xiaoheiBot.searchPlaceholder`)" :aria-label="t(`xiaoheiBot.searchPlaceholder`)" @click="e=>ne.value=true" /><component :is="P" type="button" data-notification-trigger="" :class="`icon-button contact-panel__activity relative`" size="icon" :variant="ge?`secondary`:`ghost`" :title="t(`botUi.activity`)" :aria-label="t(`botUi.activity`)" :aria-pressed="ge" @click="withDirectives(he,[`stop`])" /><component :is="Wr" /></div></div></div><div><div><component :is="Cs" :size="20" :stroke-width="1.5" /><span>{{ t(`xiaoheiBot.noContacts`) }}</span></div></div><footer><component :is="P" type="button" variant="ghost" :class="`contact-settings-button cursor-pointer`" :disabled="!i||te.loading.value" :aria-label="t(`xiaoheiBot.capabilityTutorial.entry`)" @click="e=>te.show(true)" /><component :is="P" type="button" variant="ghost" :class="`contact-settings-button cursor-pointer`" :title="t(`xiaoheiBot.settings.entry`)" :aria-label="t(`xiaoheiBot.settings.entry`)" @click="ee" /></footer></aside>
</template>

<script setup>
import { withDirectives } from 'vue';
import { S_ts as ts, S_is as is, S_Cs as Cs, S_h2 as h2, S_e as e, S_t as t, S_i as i, S_l as l, S_p as p, S_ee as ee, S_te as te, S_ne as ne, S_he as he, S_ge as ge, S_P as P, S_Wr as Wr } from '../shared.js';
</script>

<style>
/* 从原应用 CSS 恢复（data-v-6ecb36b3） */
[data-v-6ecb36b3]{flex-direction:column;width:100%;min-width:0;height:100%;min-height:0;display:flex}
[data-v-6ecb36b3]{color:#e5443c;font-style:normal}
[data-v-6ecb36b3]{color:color-mix(in srgb, var(--primary) 75%, var(--foreground));background:color-mix(in srgb, var(--primary) 8%, var(--background));border-bottom:1px solid color-mix(in srgb, var(--primary) 18%, transparent);margin:0;padding:6px 12px;font-size:11px;line-height:1.35}
[data-v-6ecb36b3]{-webkit-app-region:drag;flex:none;padding:14px 12px 12px}
[data-v-6ecb36b3]{padding:0 2px 12px calc(2px + var(--xiaohei-bot-left-controls-width,0px));justify-content:space-between;align-items:center;gap:12px;display:flex}
[data-v-6ecb36b3]{margin:0;font-size:14px;font-weight:600;line-height:1.4}
[data-v-6ecb36b3]{-webkit-app-region:no-drag;flex-shrink:0;align-items:center;gap:6px;display:flex}
[data-v-6ecb36b3]{align-items:baseline;gap:6px;min-width:0;display:flex}
[data-v-6ecb36b3]{color:var(--muted-foreground);white-space:nowrap;font-variant-numeric:tabular-nums;font-size:11px;line-height:1.3}
[data-v-6ecb36b3]{cursor:pointer;-webkit-app-region:no-drag;width:30px;height:30px}
[data-v-6ecb36b3]{border-top:1px solid var(--border);-webkit-app-region:no-drag;flex:none;justify-content:flex-start;align-items:center;gap:8px;margin:0 12px;padding:12px 0;display:flex}
[data-v-6ecb36b3]:focus-visible,.conversation-header__identity[data-v-6ecb36b3]:focus-visible,.profile-panel__close[data-v-6ecb36b3]:focus-visible,.attachment-button[data-v-6ecb36b3]:focus-visible,.send-button[data-v-6ecb36b3]:focus-visible{outline:2px solid color-mix(in srgb, var(--ring) 52%, transparent);outline-offset:2px}
[data-v-6ecb36b3]{scrollbar-width:thin;flex:1;min-height:0;padding:8px;overflow-y:auto}
[data-v-6ecb36b3]{overflow:hidden}
[data-v-6ecb36b3]{align-items:center;gap:10px;padding:9px 8px;display:flex}
[data-v-6ecb36b3]{margin-top:2px}
[data-v-6ecb36b3],.contact-skeleton__line[data-v-6ecb36b3]{background:color-mix(in srgb, var(--muted-foreground) 14%, var(--muted));border-radius:999px}
[data-v-6ecb36b3]{flex:none;width:36px;height:36px}
[data-v-6ecb36b3]{flex-direction:column;flex:1;gap:8px;min-width:0;display:flex}
[data-v-6ecb36b3]{border-radius:6px;height:10px;display:block}
[data-v-6ecb36b3]{width:58%}
[data-v-6ecb36b3]{width:82%}
[data-v-6ecb36b3],.contact-skeleton__line[data-v-6ecb36b3]{animation:1.2s ease-in-out infinite contact-skeleton-pulse-6ecb36b3}
[data-v-6ecb36b3]{min-width:0;position:relative}
[data-v-6ecb36b3]{margin-top:2px}
[data-v-6ecb36b3]{width:100%;min-width:0;color:var(--foreground);cursor:pointer;text-align:left;background:0 0;border:0;border-radius:9px;outline:none;align-items:center;gap:10px;padding:9px 8px;transition:background-color .12s,transform .12s cubic-bezier(.23,1,.32,1);display:flex}
[data-v-6ecb36b3],.contact-item-shell--menu-open .contact-item--with-menu[data-v-6ecb36b3]{padding-right:36px}
[data-v-6ecb36b3]{padding-right:36px}
[data-v-6ecb36b3]:hover{background:color-mix(in srgb, var(--accent) 76%, transparent)}
[data-v-6ecb36b3]:active{transform:scale(.985)}
[data-v-6ecb36b3],.contact-item--active[data-v-6ecb36b3]:hover{background:var(--app-sidebar-nav-active-background)}
[data-v-6ecb36b3],.message-avatar[data-v-6ecb36b3]{color:var(--foreground);background:var(--muted);border-radius:50%;flex:none;justify-content:center;align-items:center;font-size:13px;font-weight:600;display:inline-flex;position:relative;overflow:hidden}
[data-v-6ecb36b3]{width:38px;height:38px}
[data-v-6ecb36b3],.message-avatar img[data-v-6ecb36b3]{border-radius:inherit;object-fit:cover;width:100%;height:100%}
[data-v-6ecb36b3]{border:1px solid var(--border);background:#fff}
[data-v-6ecb36b3]{color:color-mix(in srgb, var(--primary) 82%, var(--foreground));background:color-mix(in srgb, var(--primary) 13%, var(--background))}
[data-v-6ecb36b3]{color:var(--foreground);background:color-mix(in srgb, var(--muted) 80%, var(--border))}
[data-v-6ecb36b3]{flex-direction:column;flex:1;gap:4px;min-width:0;display:flex}
[data-v-6ecb36b3],.contact-item__bottomline[data-v-6ecb36b3]{align-items:center;gap:8px;min-width:0;display:flex}
[data-v-6ecb36b3]{flex:1;align-items:center;gap:5px;min-width:0;display:flex}
[data-v-6ecb36b3]{min-width:0;font-size:var(--xiaohei-bot-text-body);text-overflow:ellipsis;white-space:nowrap;font-weight:600;line-height:1.25;overflow:hidden}
[data-v-6ecb36b3]{color:var(--muted-foreground);font-size:var(--xiaohei-bot-text-caption);flex:none;transition:opacity .1s}
[data-v-6ecb36b3]{width:12px;height:12px;color:var(--muted-foreground);flex:none}
[data-v-6ecb36b3]{width:28px;height:28px;color:var(--muted-foreground);background:color-mix(in srgb, var(--background) 80%, transparent);cursor:pointer;opacity:0;pointer-events:none;-webkit-app-region:no-drag;border:0;border-radius:7px;outline:none;justify-content:center;align-items:center;padding:0;transition:opacity .1s,color .1s,background-color .1s;display:inline-flex;position:absolute;top:7px;right:6px}
[data-v-6ecb36b3],.contact-item__menu-button[data-state=open][data-v-6ecb36b3]{opacity:1;pointer-events:auto}
[data-v-6ecb36b3]{opacity:1;pointer-events:auto}
[data-v-6ecb36b3]:hover,.contact-item__menu-button[data-v-6ecb36b3]:focus-visible,.contact-item__menu-button[data-state=open][data-v-6ecb36b3]{color:var(--foreground);background:var(--background);box-shadow:0 0 0 1px var(--border)}
[data-v-6ecb36b3],.contact-item-shell--menu-open .contact-item--with-menu .contact-item__topline time[data-v-6ecb36b3]{opacity:0}
[data-v-6ecb36b3]{opacity:0}
[data-v-6ecb36b3]{min-width:0;color:var(--muted-foreground);text-overflow:ellipsis;white-space:nowrap;flex:1;font-size:13px;line-height:1.25;overflow:hidden}
[data-v-6ecb36b3]{background:var(--conversation-status-color);border-radius:50%;flex:0 0 8px;width:8px;height:8px;margin:0 4px;display:inline-block}
[data-v-6ecb36b3]{border:1.5px solid var(--muted-foreground);background:0 0;border-right-color:#0000;flex-basis:12px;width:12px;height:12px;margin:0 2px;animation:.9s linear infinite conversation-status-spin-6ecb36b3}
[data-v-6ecb36b3]{animation:none}
[data-v-6ecb36b3]{--conversation-status-color:#f5a623}
[data-v-6ecb36b3]{--conversation-status-color:#5296df}
[data-v-6ecb36b3],.conversation-empty[data-v-6ecb36b3]{color:var(--muted-foreground);justify-content:center;align-items:center;display:flex}
[data-v-6ecb36b3]{font-size:var(--xiaohei-bot-text-body);flex-direction:column;gap:8px;padding:48px 12px}
[data-v-6ecb36b3],.contact-item[data-v-6ecb36b3],.conversation-header__identity[data-v-6ecb36b3],.profile-panel__close[data-v-6ecb36b3],.profile-edit-avatar-button[data-v-6ecb36b3],.message-attachment[data-v-6ecb36b3],.message-copy-button[data-v-6ecb36b3],button.composer-attachment__preview[data-v-6ecb36b3],.composer-attachment__remove[data-v-6ecb36b3],.attachment-button[data-v-6ecb36b3],.send-button[data-v-6ecb36b3],.avatar-preset-button[data-v-6ecb36b3],.avatar-color-button[data-v-6ecb36b3]{transition:background-color .1s,border-color .1s,opacity .1s}
[data-v-6ecb36b3]:active,.contact-item[data-v-6ecb36b3]:active,.conversation-header__identity[data-v-6ecb36b3]:active,.profile-panel__close[data-v-6ecb36b3]:active,.profile-edit-avatar-button[data-v-6ecb36b3]:active,.message-attachment[data-v-6ecb36b3]:active,.message-copy-button[data-v-6ecb36b3]:active,button.composer-attachment__preview[data-v-6ecb36b3]:active,.composer-attachment__remove[data-v-6ecb36b3]:active,.attachment-button[data-v-6ecb36b3]:active,.send-button[data-v-6ecb36b3]:active:not(:disabled),.avatar-preset-button[data-v-6ecb36b3]:active,.avatar-color-button[data-v-6ecb36b3]:active{transform:none}
[data-v-6ecb36b3]{transition:none}
[data-v-6ecb36b3]{animation:none}
</style>
