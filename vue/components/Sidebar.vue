<template>
<aside data-v-a0bffcba :class="[`sidebar`,{'sidebar-collapsed':items.collapsed}]"><div :class="`sidebar-drag-area`" @dblclick="xe"><div :class="`traffic-lights`" @mouseenter="e=>oe=true" @mouseleave="e=>oe=false"><button :class="[`traffic-light traffic-light-close`,{'show-icon':oe}]" @click="Ce"></button><button :class="[`traffic-light traffic-light-minimize`,{'show-icon':oe}]" @click="Se"></button><button :class="[`traffic-light traffic-light-maximize`,{'show-icon':oe}]" @click="P"><component :is="Pr" :size="8" /></button></div><div :class="`sidebar-titlebar-actions`" @dblclick="withDirectives(()=>{},[`stop`])"><button :class="`titlebar-action-btn`" @click="we" :title="v(`common.collapseMenu`)"><component :is="os" :size="14" /></button></div><div></div></div><span v-text="Xe(createElementVNode(`div`,{id:`xiaohei-bot-sidebar-host`,ref_key:`contactPanelHost`,ref:o,class:`sidebar-bot-host`},null,512),[[Tt,ce?.value===`bot`]])" /><nav></nav><div>{{ v(`sidebar.more`) }}</div><nav></nav><div><span v-text="Xe(resolveComponent(Ip,{ref_key:`campaignCardRef`,ref:w,'user-id':s?.userId??null,onClaimed:l},null,8,[`user-id`,`onClaimed`]),[[Tt,!items.collapsed]])" /><div><component :is="An" :open="x" @update:open="e=>x=e" />{{ undefined }}</div></div></aside>
</template>

<script setup>
import { createElementVNode, withDirectives, resolveComponent } from 'vue';
import Ip from './CreditCampaignCard.vue';
// [符号说明] l~computed
import { S_is as is, S_os as os, S_bot as bot, S_e as e, S_s as s, S_l as l, S_v as v, S_Xe as Xe, S_Tt as Tt, S_An as An, S_Pr as Pr } from '../shared.js';
const items = defineProps({
      collapsed: {
        type: Boolean
      },
      activeNav: {}
    });

// [兜底] 模板引用但无来源的符号
const ce = { value: undefined };
import { ref } from 'vue';

// [setup 还原] 原组件 setup 里初值不依赖 IPC 的声明
let o = ref(null);
let x = ref(false);
let w = ref(null);
let oe = ref(false);
function xe() {
  electronAPI?.maximize?.();
}
function Se() {
  electronAPI?.minimize?.();
}
function P() {
  electronAPI?.maximize?.();
}
function Ce() {
  electronAPI?.close?.();
}
function we() {
  a(`update:collapsed`, !i.collapsed);
}
</script>

<style>
/* 从原应用 CSS 恢复（data-v-a0bffcba） */
[data-v-a0bffcba]{border:1px solid color-mix(in srgb, var(--border) 78%, transparent);background:color-mix(in srgb, var(--popover) 96%, transparent);box-shadow:0 16px 44px color-mix(in srgb, var(--foreground) 14%, transparent);-webkit-backdrop-filter:blur(18px);backdrop-filter:blur(18px);color:var(--app-sidebar-nav-color);font-family:var(--font-sans);letter-spacing:normal;border-radius:14px;font-size:12px}
[data-v-a0bffcba]{justify-content:space-between;align-items:flex-start;gap:10px;padding:8px 8px 10px;display:flex}
[data-v-a0bffcba]{flex-direction:column;gap:2px;min-width:0;display:flex}
[data-v-a0bffcba]{color:var(--foreground);text-overflow:ellipsis;white-space:nowrap;font-size:12px;font-weight:500;line-height:18px;overflow:hidden}
[data-v-a0bffcba]{color:var(--muted-foreground);text-overflow:ellipsis;white-space:nowrap;font-size:11px;line-height:16px;overflow:hidden}
[data-v-a0bffcba]{background:var(--foreground);max-width:82px;color:var(--background);text-overflow:ellipsis;white-space:nowrap;border-radius:6px;flex-shrink:0;padding:3px 7px;font-size:10px;font-weight:600;line-height:15px;overflow:hidden}
[data-v-a0bffcba]{flex-direction:column;gap:1px;display:flex}
[data-v-a0bffcba]{margin-top:4px;padding-top:8px;position:relative}
[data-v-a0bffcba]:before{content:"";background:color-mix(in srgb, var(--border) 36%, transparent);height:1px;position:absolute;top:0;left:12px;right:12px}
[data-v-a0bffcba]{width:100%;height:34px;color:var(--app-sidebar-nav-color);cursor:pointer;text-align:left;white-space:nowrap;background:0 0;border:0;border-radius:8px;grid-template-columns:16px minmax(72px,auto) minmax(0,1fr) 14px;align-items:center;gap:8px;padding:0 8px;transition:background-color .1s,color .1s;display:grid}
[data-v-a0bffcba]:hover,.account-menu-item[data-v-a0bffcba]:focus-visible{background:var(--app-sidebar-nav-hover-background);outline:none}
[data-v-a0bffcba]:last-child{color:var(--muted-foreground);grid-column:4;justify-self:end}
[data-v-a0bffcba]{color:var(--app-sidebar-section-color);text-align:right;text-overflow:ellipsis;white-space:nowrap;font-size:12px;line-height:1;overflow:hidden}
[data-v-a0bffcba]{cursor:default}
[data-v-a0bffcba]:hover{background:0 0}
[data-v-a0bffcba]{background:color-mix(in srgb, var(--foreground) 8%, transparent);box-shadow:inset 0 0 0 1px color-mix(in srgb, var(--foreground) 5%, transparent);border-radius:7px;grid-column:3/5;grid-auto-columns:1fr;grid-auto-flow:column;justify-self:end;padding:2px;display:grid;position:relative}
[data-v-a0bffcba]{width:calc((100% - 4px) / var(--switch-count));background:var(--background);box-shadow:0 1px 2px color-mix(in srgb, var(--foreground) 16%, transparent);transform:translateX(calc(var(--switch-index) * 100%));border-radius:5px;transition:transform .18s;position:absolute;top:2px;bottom:2px;left:2px}
[data-v-a0bffcba]{height:22px;color:var(--muted-foreground);cursor:pointer;background:0 0;border:0;border-radius:5px;justify-content:center;align-items:center;padding:0 9px;font-size:11px;line-height:1;transition:color .15s;display:flex;position:relative}
[data-v-a0bffcba]{width:26px;padding:0}
[data-v-a0bffcba]:hover,.account-menu-switch-option.is-active[data-v-a0bffcba]{color:var(--foreground)}
[data-v-a0bffcba]:focus-visible{outline:2px solid color-mix(in srgb, var(--ring) 60%, transparent);outline-offset:-1px}
[data-v-a0bffcba]{color:var(--destructive)}
[data-v-a0bffcba]{color:var(--destructive);opacity:1}
[data-v-a0bffcba]{justify-content:flex-end;align-items:center;gap:6px;display:flex}
[data-v-a0bffcba]{background:#ef4444;border-radius:999px;flex-shrink:0;width:6px;height:6px}
[data-v-a0bffcba]{background:var(--app-update-reminder-background);color:#fff;cursor:pointer;border:0;border-radius:6px;outline:none;flex-shrink:0;align-items:center;height:24px;margin-right:2px;padding:0 5px;font-size:12px;font-weight:500;line-height:1;transition:padding .18s;display:inline-flex}
[data-v-a0bffcba]{opacity:0;white-space:nowrap;max-width:0;margin-left:0;transition:max-width .18s,margin-left .18s,opacity .15s;overflow:hidden}
[data-v-a0bffcba]:hover,.sidebar-update-button[data-v-a0bffcba]:focus-visible{padding:0 8px}
[data-v-a0bffcba],.sidebar-update-button:focus-visible .sidebar-update-label[data-v-a0bffcba]{opacity:1;max-width:5em;margin-left:4px}
[data-v-a0bffcba]{width:var(--sidebar-expanded-w,220px);z-index:1;box-shadow:var(--app-sidebar-shadow);-webkit-user-select:none;user-select:none;border-radius:10px 0 0 10px;flex-direction:column;padding:0 24px 0 12px;transition:width .2s;display:flex;position:absolute;top:0;bottom:0;left:0;overflow:visible;background:var(--app-sidebar-background)!important}
[data-v-a0bffcba]{visibility:hidden;pointer-events:none}
[data-v-a0bffcba]{-webkit-app-region:no-drag}
[data-v-a0bffcba]{flex:1;min-width:0;min-height:0;margin-inline:-4px;overflow:hidden}
[data-v-a0bffcba]:after{content:"";background:var(--app-sidebar-extension-background);pointer-events:none;width:12px;position:absolute;top:0;bottom:0;right:-12px}
[data-v-a0bffcba]{-webkit-app-region:drag;flex-shrink:0;align-items:center;gap:8px;padding:10px 4px 6px;display:flex}
[data-v-a0bffcba]{-webkit-app-region:no-drag;align-items:center;gap:2px;display:flex}
[data-v-a0bffcba]{width:20px;height:20px;color:var(--app-sidebar-titlebar-color);cursor:pointer;background:0 0;border:none;border-radius:4px;outline:none;justify-content:center;align-items:center;padding:0;transition:color .15s,background-color .15s;display:flex}
[data-v-a0bffcba]:hover{color:var(--app-sidebar-titlebar-hover-color);background:var(--app-sidebar-titlebar-hover-background)}
[data-v-a0bffcba]:active{background:var(--app-sidebar-titlebar-active-background)}
[data-v-a0bffcba]{flex:1}
[data-v-a0bffcba]{-webkit-app-region:no-drag;z-index:10;gap:8px;display:flex}
[data-v-a0bffcba]{cursor:pointer;color:#0000;border:none;border-radius:50%;outline:none;justify-content:center;align-items:center;width:12px;height:12px;padding:0;transition:filter .15s;display:flex}
[data-v-a0bffcba]:active{filter:brightness(.7)}
[data-v-a0bffcba]{background:#ff5f57}
[data-v-a0bffcba]{background:#febc2e}
[data-v-a0bffcba]{background:#28c840}
[data-v-a0bffcba]{color:#00000073}
[data-v-a0bffcba]{background:#ff4136}
[data-v-a0bffcba]{background:#f5b400}
[data-v-a0bffcba]{background:#17ad31}
[data-v-a0bffcba]{-webkit-app-region:no-drag;flex-shrink:0;padding:6px 0 14px}
[data-v-a0bffcba] .sidebar-workspace-tabs{background:color-mix(in srgb, var(--foreground) 12%, var(--sidebar));box-shadow:inset 0 0 0 1px color-mix(in srgb, var(--foreground) 6%, transparent)}
[data-v-a0bffcba] .sidebar-workspace-tabs [data-state=active]{background:var(--background);box-shadow:0 1px 3px color-mix(in srgb, var(--foreground) 16%, transparent)}
[data-v-a0bffcba] .sidebar-bot-activity{width:10px!important;height:10px!important}
[data-v-a0bffcba]{pointer-events:none;background:#5296df;border-radius:50%;width:8px;height:8px;position:absolute;top:0;right:-10px}
[data-v-a0bffcba]{flex-direction:column;gap:1px;display:flex}
[data-v-a0bffcba]{height:34px;color:var(--app-sidebar-nav-color);cursor:pointer;text-align:left;white-space:nowrap;background:0 0;border:none;border-radius:8px;align-items:center;gap:8px;padding:0 8px;transition:background-color .1s,color .1s;display:flex}
[data-v-a0bffcba]:hover{background:var(--app-sidebar-nav-hover-background)}
[data-v-a0bffcba]{background:var(--app-sidebar-nav-active-background);color:var(--app-sidebar-nav-active-color)}
[data-v-a0bffcba]{opacity:.5;flex-shrink:0}
[data-v-a0bffcba]{opacity:.8}
[data-v-a0bffcba]{line-height:1}
[data-v-a0bffcba]{flex:1}
[data-v-a0bffcba]{color:var(--app-sidebar-section-color);letter-spacing:.02em;padding:10px 8px 4px;font-weight:400}
[data-v-a0bffcba]{flex-direction:column;gap:1px;margin-top:auto;padding-top:4px;padding-bottom:10px;display:flex}
</style>
