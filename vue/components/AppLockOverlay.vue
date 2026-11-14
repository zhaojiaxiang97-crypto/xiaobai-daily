<template>
<div><div><div><button :class="`size-3 rounded-full bg-[#ff5f57] [-webkit-app-region:no-drag]`" :aria-label="i(`app.close`)" @click="te"></button><button :class="`size-3 rounded-full bg-[#febc2e] [-webkit-app-region:no-drag]`" :aria-label="i(`app.minimize`)" @click="j"></button><button :class="`size-3 rounded-full bg-[#28c840] [-webkit-app-region:no-drag]`" :aria-label="i(`app.maximize`)" @click="ee"></button></div><span>{{ i(`common.appName`) }}</span><div><button :class="`h-8 w-10 text-muted-foreground hover:bg-black/5 dark:hover:bg-accent`" @click="j">—</button><button :class="`h-8 w-10 text-muted-foreground hover:bg-black/5 dark:hover:bg-accent`" @click="ee">□</button><button :class="`h-8 w-10 text-muted-foreground hover:bg-red-500 hover:text-white`" @click="te">×</button></div></div><div><form :class="[`w-full rounded-2xl border border-black/[0.06] bg-white/95 dark:border-border dark:bg-card`,o===`unlock`?`max-w-[380px] p-7`:`max-w-[420px] p-6`]" @submit="withDirectives(A,[`prevent`])"><div :class="[`flex flex-col items-center text-center`,o===`unlock`?`mb-7 gap-3`:`mb-5 gap-2.5`]"><span><component :is="Vo" :size="28" :stroke-width="1.8" /></span><h1>{{ o===`unlock`?i(`appLock.lockedTitle`):i(`appLock.recoverTitle`) }}</h1><p>{{ i(`appLock.lockedDesc`) }}</p></div><div><label>{{ i(`appLock.password`) }}</label><component :is="gz" :modelValue="s" @update:modelvalue="e=>s=e" :placeholder="i(`appLock.passwordPlaceholder`)" autocomplete="current-password" autofocus="" /></div><p>{{ d }}</p><div><component :is="P" type="button" variant="outline" :class="`h-10 gap-1.5`" :disabled="u" @click="O" /><component :is="P" :class="`h-10 gap-2`" type="submit" :disabled="S?.value" /></div><button type="button" :class="`mt-5 w-full py-1 text-center text-xs text-muted-foreground transition-colors hover:text-primary`" @click="e=>o===`unlock`?T():w()">{{ o===`unlock`?i(`appLock.forgotPassword`):i(`appLock.backToUnlock`) }}</button></form></div></div>
</template>

<script setup>
import { withDirectives } from 'vue';
import gz from './PasswordInput.vue';
import { S_no as no, S_Vo as Vo, S_is as is, S_xs as xs, S_state as state, S_h1 as h1, S_i as i, S_P as P, S_mt as mt } from '../shared.js';
const e = defineProps({
      state: {}
    });
const n = e;

// [兜底] 模板引用但无来源的符号
const S = { value: undefined };
import { ref, computed } from 'vue';

// [setup 还原] 原组件 setup 里初值不依赖 IPC 的声明
let o = ref(`unlock`);
let s = ref(``);
let c = ref(``);
let l = ref(``);
let u = ref(false);
let d = ref(``);
let f = ref(Date.now());
let p = ref(0);
let m = ref(null);
let h = ref(0);
let _ = ref(``);
let y = computed(() => Math.max(0, Math.ceil((p.value - f.value) / 1e3)));
function w() {
  o.value = `unlock`, C();
}
async function T() {
  if (o.value = `recover`, C(), !b.value) {
    u.value = true;
    try {
      m.value = await ZR.startRecoveryChallenge();
    } catch (e) {
      d.value = e instanceof Error ? e.message : i(`appLock.operationFailed`), await k();
    } finally {
      u.value = false;
    }
  }
}
function O() {
  h.value > 0 && --h.value, d.value = ``;
}
async function A() {
  if (!S.value) {
    if (d.value = ``, o.value === `recover` && !b.value) {
      if (h.value < 2) {
        D();
        return;
      }
      if (h.value === 2 && m.value) {
        u.value = true;
        try {
          let verifyRecoveryChallenge = await ZR.verifyRecoveryChallenge({
            challengeId: m.value.challengeId,
            selectedOptionIds: g.value
          });
          _.value = verifyRecoveryChallenge.verificationToken, h.value = 3;
        } catch (e) {
          d.value = e instanceof Error ? e.message : i(`appLock.operationFailed`), await k();
        } finally {
          u.value = false;
        }
        return;
      }
    }
    u.value = true;
    try {
      if (o.value === `unlock`) {
        r(`state-changed`, await ZR.unlock({
          password: s.value
        })), s.value = ``;
        return;
      }
      m.value && r(`state-changed`, await ZR.resetPasswordWithRecovery({
        verificationToken: _.value,
        newPassword: c.value
      })), C();
    } catch (e) {
      d.value = e instanceof Error ? e.message : i(`appLock.operationFailed`), !b.value && o.value === `recover` && (m.value = null, h.value = 0, g.value = [], _.value = ``), await k();
    } finally {
      u.value = false;
    }
  }
}
function j() {
  window.electronAPI.minimize();
}
function ee() {
  window.electronAPI.maximize();
}
function te() {
  window.electronAPI.close();
}
</script>
