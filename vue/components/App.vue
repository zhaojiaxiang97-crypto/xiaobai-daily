<template>
<div data-v-84811ec9 :class="[`app-layout`,{'app-layout--win':n===`win32`,'app-layout--maximized':n===`win32`&&r}]" :style="{'--sidebar-expanded-w':`${p}px`,'--sidebar-w':a||!se||!te||D?`0px`:`${p}px`}"><component :is="pie" :collapsed="a" @update:collapsed="e=>a=e" :active-nav="o" @update:activenav="vn" @showwechatqrcode="Ke" @openupdate="tt" @contactpaneltargetchange="e=>f.value=e" /><main><div :class="[`main-content`,{'main-content--win':n===`win32`,'main-content--toolbox-workspace':o===`toolbox`&&m,'main-content--toolbox-left-controls':o===`toolbox`&&m&&(!se||D||a),'main-content--xiaohei-bot':o===`xiaohei-bot`,'main-content--xiaohei-bot-left-controls':o===`xiaohei-bot`&&a}]"><div :class="`content-header`" @dblclick="on"><div><div :class="`traffic-lights`" @mouseenter="e=>i=true" @mouseleave="e=>i=false"><button :class="[`traffic-light traffic-light-close`,{'show-icon':i}]" @click="ln"></button><button :class="[`traffic-light traffic-light-minimize`,{'show-icon':i}]" @click="sn"></button><button :class="[`traffic-light traffic-light-maximize`,{'show-icon':i}]" @click="cn"><component :is="Pr" :size="8" /></button></div><div><button :class="`collapsed-action-btn`" @click="e=>a=false" :title="N(`common.expandMenu`)"><component :is="os" :size="14" /></button></div><span>{{ $?.value }}</span></div><div><button :class="`win-btn`" @click="sn" :title="N(`app.minimize`)"></button><button :class="`win-btn`" @click="cn" :title="r?N(`app.restore`):N(`app.maximize`)"><svg></svg></button><button :class="`win-btn win-btn-close`" @click="ln" :title="N(`app.close`)"></button></div></div><div><div><component :is="zn" :size="20" :class="`animate-spin`" /><span>{{ N(`common.loading`) }}</span></div></div></div></main><div></div><component :is="IQt" :open="ke" @update:open="e=>$e(ke)?ke.value=e:null" @opentodo="Sn" @openreportcc="xn" @openupdate="tt" @opensharecard="e=>iW({kind:`month`,month:e})" /></div><component :is="ZQt" /><component :is="Bie" :open="Ut" @update:open="e=>Ut=e" :snapshot="Wt" @generate="gn" @exit="hn" @suppresschange="_n" /><component :is="jZt" /><component :is="tQt" /><component :is="R$t" :state="We" @statechanged="e=>We=e" />
</template>

<script setup>
import pie from './Sidebar.vue';
import Bie from './ExitReportReminderDialog.vue';
import jZt from './ProfileShareHost.vue';
import tQt from './WoodenFish.vue';
import IQt from './NotificationPopover.vue';
import ZQt from './SurveyDialog.vue';
import R$t from './AppLockOverlay.vue';

// [兜底] 模板引用但无来源的符号
import { S_is as is, S_os as os, S_state as state, S_px as px, S_iW as iW, S_bot as bot, S_e as e, S_w as w, S_N as N, S_se as se, S_ke as ke, S_$e as $e, S_at as at, S_zn as zn, S_Pr as Pr } from '../shared.js';
const $ = { value: undefined };
const f = { value: undefined };
import { ref, computed } from 'vue';

// [setup 还原] 原组件 setup 里初值不依赖 IPC 的声明
let electronAPI = window.electronAPI;
let n = electronAPI?.platform ?? `darwin`;
let r = ref(false);
let i = ref(false);
let a = ref(false);
let o = ref(`today-work`);
let d = ref(292);
let p = computed(() => o.value === `xiaohei-bot` ? d.value : 220);
let m = ref(false);
let T = ref(false);
let E = ref(false);
let D = computed(() => T.value || E.value);
let te = ref(false);
let We = ref({
  configured: true,
  enabled: true,
  locked: true,
  retryAfterSeconds: 0,
  recoveryMode: `wordSelection`
});
function Ke(e = `service`) {
  He.value = e, Ue.value = `https://xiaoheiribao.com/api/qrcode.php?scene=client&t=${Date.now()}`, Ve.value = true;
}
async function tt() {
  ke.value = false;
  try {
    let e = await window.electronAPI?.updater?.check?.(),
      t = await window.electronAPI?.updater?.getState?.();
    if (t && q(t), !e?.hasUpdate) {
      e?.message && Oi(e.message);
      return;
    }
    Je.value = true;
  } catch (e) {
    Ai(e instanceof Error ? e.message : N(`updateDialog.updateFailedTitle`));
  }
}
let Ut = ref(false);
let Wt = ref(null);
function on() {
  electronAPI?.maximize?.();
}
function sn() {
  electronAPI?.minimize?.();
}
function cn() {
  electronAPI?.maximize?.();
}
function ln() {
  electronAPI?.close?.();
}
async function hn() {
  await Ht;
  try {
    await P_.markExitReminderShown();
  } catch (e) {
    console.warn(`[exit-report-reminder] 无法保存当天退出选择:`, e);
  }
  Ut.value = false, Ot(`action`, `exit_report_reminder_dismiss`), await P_.confirmQuit();
}
async function gn() {
  await Ht, Ut.value = false, await P_.cancelQuitCheck(), Ot(`action`, `exit_report_reminder_generate`), fn(`exit_reminder`);
}
function _n(e) {
  Gt.value = e, Ht = Ht.then(async () => {
    await P_.setSuppressExitReminder(e), e && Ot(`action`, `exit_report_reminder_suppress`);
  }).catch(err => {
    console.warn(`[exit-report-reminder] 无法保存退出提醒偏好:`, err);
  });
}
function vn(e) {
  if (!D.value) {
    if (e === `todo` && !z$t(oe.value?.userId)) {
      j.value = o.value, O.value = e, w.value = true;
      return;
    }
    e === `heat-map` && (s.value = `range`), o.value = e, S.value += 1, kt(e), e === `generate-report` ? Ot(`action`, `report_page_view`, {
      entry: `sidebar`
    }) : e === `subscribe` ? Ot(`action`, `pricing_page_view`, {
      entry: `sidebar`
    }) : e === `settings` ? trackActionEvent(`capture_control_impression`, {
      entry: `settings`
    }) : e === `privacy` && trackActionEvent(`capture_control_impression`, {
      entry: `privacy`
    });
  }
}
function xn(e) {
  rMt(e), o.value !== `history` && vn(`history`);
}
function Sn(e) {
  k.value = {
    taskId: e,
    requestId: ++A
  }, vn(`todo`);
}
</script>

<style>
/* 从原应用 CSS 恢复（data-v-84811ec9） */
[data-v-84811ec9]{height:100vh;font-family:var(--font-sans);color:var(--foreground);-webkit-font-smoothing:auto;-moz-osx-font-smoothing:auto;background:0 0;border-radius:10px;position:relative;overflow:hidden}
[data-v-84811ec9]{width:100%;height:100vh;box-shadow:none;border:0;border-radius:0}
[data-v-84811ec9]{z-index:50;isolation:isolate;border-radius:inherit;pointer-events:none;position:fixed;inset:0;overflow:clip}
[data-v-84811ec9] .sidebar,.app-layout--win .main-content[data-v-84811ec9]{border-radius:0}
[data-v-84811ec9]{box-shadow:none;border:0;border-radius:0}
[data-v-84811ec9] .sidebar,.app-layout--maximized .main-content[data-v-84811ec9]{border-radius:0}
[data-v-84811ec9]:hover{border-top-right-radius:0}
[data-v-84811ec9]{z-index:10;pointer-events:none;background:0 0;position:absolute;inset:0}
[data-v-84811ec9]{margin-left:max(0px, calc(var(--sidebar-w) - 12px));background:var(--background);pointer-events:auto;border-radius:10px;flex-direction:column;height:100%;transition:margin-left .2s;display:flex;position:relative;overflow:hidden}
[data-v-84811ec9]{z-index:30;pointer-events:none;height:38px;padding:0 0 0 16px;position:absolute;inset:0 0 auto}
[data-v-84811ec9],.main-content--toolbox-workspace .header-title[data-v-84811ec9]{display:none}
[data-v-84811ec9]{pointer-events:auto}
[data-v-84811ec9]{pointer-events:auto;margin-left:auto}
[data-v-84811ec9]{--toolbox-window-controls-width:138px;--toolbox-window-corner-radius:0px}
[data-v-84811ec9]{--toolbox-left-controls-width:104px}
[data-v-84811ec9]{--toolbox-left-controls-width:40px}
[data-v-84811ec9]{z-index:30;pointer-events:none;height:38px;padding:0 0 0 16px;position:absolute;inset:0 0 auto}
[data-v-84811ec9],.main-content--xiaohei-bot .header-title[data-v-84811ec9]{display:none}
[data-v-84811ec9],.main-content--xiaohei-bot .win-controls[data-v-84811ec9]{pointer-events:auto}
[data-v-84811ec9]{z-index:40;width:var(--xiaohei-bot-window-controls-width,138px);pointer-events:auto;-webkit-app-region:no-drag;height:38px;margin-left:0;position:absolute;top:0;right:0}
[data-v-84811ec9]{--xiaohei-bot-window-controls-width:138px}
[data-v-84811ec9],.main-content--win.main-content--xiaohei-bot .win-controls[data-v-84811ec9]{height:38px}
[data-v-84811ec9] .conversation-header__actions{top:0;right:var(--xiaohei-bot-window-controls-width,138px);-webkit-app-region:no-drag;gap:0;height:38px;margin:0;position:absolute}
[data-v-84811ec9] .conversation-header{padding-right:calc(18px + 184px + var(--xiaohei-bot-window-controls-width,138px))}
[data-v-84811ec9] .conversation-header__identity{flex-shrink:1;max-width:100%;overflow:hidden}
[data-v-84811ec9] .conversation-header__drag-region{right:calc(184px + var(--xiaohei-bot-window-controls-width,138px))}
[data-v-84811ec9] .conversation-header__action-button{width:28px;height:28px;color:var(--foreground);-webkit-app-region:no-drag;flex:0 0 28px;margin:0 9px;padding:0;translate:none}
[data-v-84811ec9] .conversation-header__action-button svg{width:16px;height:16px}
[data-v-84811ec9]{--xiaohei-bot-left-controls-width:104px}
[data-v-84811ec9]{--xiaohei-bot-left-controls-width:40px}
[data-v-84811ec9] .contact-panel__header{-webkit-app-region:no-drag}
[data-v-84811ec9] .conversation-header{padding-left:calc(18px + var(--xiaohei-bot-left-controls-width,0px))}
[data-v-84811ec9] .conversation-header__drag-region{left:calc(16px + var(--xiaohei-bot-left-controls-width,0px))}
[data-v-84811ec9]{z-index:30;-webkit-user-select:none;user-select:none;flex-shrink:0;justify-content:space-between;align-items:center;gap:8px;height:38px;padding:0 0 0 16px;display:flex;position:relative}
[data-v-84811ec9]{-webkit-app-region:drag;z-index:0;position:absolute;inset:0 400px 0 0}
[data-v-84811ec9]{z-index:1;-webkit-app-region:no-drag;align-items:center;gap:8px;display:flex;position:relative}
[data-v-84811ec9]{color:var(--muted-foreground);font-weight:500}
[data-v-84811ec9]{z-index:31;pointer-events:auto;-webkit-app-region:no-drag;height:100%;display:flex;position:relative}
[data-v-84811ec9]{width:46px;height:100%;color:var(--foreground);cursor:pointer;pointer-events:auto;-webkit-app-region:no-drag;background:0 0;border:none;outline:none;justify-content:center;align-items:center;transition:background-color .1s;display:flex}
[data-v-84811ec9]:hover{background:#0000000d}
[data-v-84811ec9]:hover{border-top-right-radius:0;color:#fff!important;background:#e81123!important}
[data-v-84811ec9]{z-index:0;flex:1;min-height:0;position:relative;overflow-y:auto}
[data-v-84811ec9]{justify-content:center;align-items:center;height:100%;display:flex}
[data-v-84811ec9]{color:#ccc}
[data-v-84811ec9]{-webkit-app-region:no-drag;align-items:center;gap:2px;display:flex}
[data-v-84811ec9]{width:20px;height:20px;color:var(--app-collapsed-action-color);cursor:pointer;background:0 0;border:none;border-radius:4px;outline:none;justify-content:center;align-items:center;padding:0;transition:color .15s,background-color .15s;display:flex}
[data-v-84811ec9]:hover{color:var(--app-collapsed-action-hover-color);background:var(--app-collapsed-action-hover-background)}
[data-v-84811ec9]:active{background:var(--app-collapsed-action-active-background)}
[data-v-84811ec9]{-webkit-app-region:no-drag;gap:8px;display:flex}
[data-v-84811ec9]{cursor:pointer;color:#0000;border:none;border-radius:50%;outline:none;justify-content:center;align-items:center;width:12px;height:12px;padding:0;transition:filter .15s;display:flex}
[data-v-84811ec9]:active{filter:brightness(.7)}
[data-v-84811ec9]{background:#ff5f57}
[data-v-84811ec9]{background:#febc2e}
[data-v-84811ec9]{background:#28c840}
[data-v-84811ec9]{color:#00000073}
[data-v-84811ec9]{background:#ff4136}
[data-v-84811ec9]{background:#f5b400}
[data-v-84811ec9]{background:#17ad31}
</style>
