<template>
<component data-v-b1b9ee0a :is="SGt" :open="c.sharedRoleOpen.value" @update:open="e=>c.sharedRoleOpen.value=e" :card="c.sharedRole.value" :error="c.sharedRoleError.value" :busy="c.sharedRoleBusy.value" @add="c.addSharedRole" />
</template>

<script setup>
import SGt from './XiaoheiBotShareImportDialog.vue';
import { S_is as is, S_c as c } from '../shared.js';
const e = defineProps({
      contactPanelTarget: {},
      active: {
        type: Boolean,
        default: true
      },
      sidebarCollapsed: {
        type: Boolean,
        default: false
      }
    });
</script>

<style>
/* 从原应用 CSS 恢复（data-v-b1b9ee0a） */
[data-v-b1b9ee0a]{width:100%;height:100%;min-height:0;color:var(--foreground);background:var(--background);display:grid;position:relative;overflow:hidden}
[data-v-b1b9ee0a]{cursor:col-resize;-webkit-user-select:none;user-select:none}
[data-v-b1b9ee0a]{min-width:0;display:flex}
[data-v-b1b9ee0a]{width:100%}
[data-v-b1b9ee0a],.contact-panel-workspace--docked .contact-panel[data-v-b1b9ee0a]{background:0 0}
[data-v-b1b9ee0a] .contact-panel__header{-webkit-app-region:no-drag;padding:4px 4px 8px}
[data-v-b1b9ee0a] .contact-panel__title-row{padding-bottom:0}
[data-v-b1b9ee0a] .contact-list{padding:2px 0 2px 4px}
[data-v-b1b9ee0a] .contact-panel__footer{margin:0 4px}
[data-v-b1b9ee0a]:after{z-index:4;content:"";cursor:col-resize;-webkit-app-region:no-drag;position:absolute;inset:0}
[data-v-b1b9ee0a]{min-width:0;min-height:0;overflow:hidden}
[data-v-b1b9ee0a]{grid-template-columns:minmax(0,1fr);width:100%;min-width:0;height:100%;min-height:0;display:grid;position:relative;overflow:hidden}
[data-v-b1b9ee0a],.conversation-panel[data-v-b1b9ee0a]{min-width:0;min-height:0}
[data-v-b1b9ee0a]{background:color-mix(in srgb, var(--muted) 34%, var(--background));flex-direction:column;height:100%;display:flex}
[data-v-b1b9ee0a]{z-index:5;cursor:col-resize;touch-action:none;-webkit-app-region:no-drag;background:0 0;border:0;outline:none;width:12px;position:absolute;top:0;bottom:0}
[data-v-b1b9ee0a]:before{content:"";background:0 0;border-radius:999px;width:2px;height:34px;transition:background-color .14s;position:absolute;top:50%;left:50%;transform:translate(-50%,-50%)}
[data-v-b1b9ee0a]:hover:before,.contact-panel__resizer[data-v-b1b9ee0a]:focus-visible:before,.xiaohei-bot-page--resizing .contact-panel__resizer[data-v-b1b9ee0a]:before{background:color-mix(in srgb, var(--foreground) 20%, transparent)}
</style>
