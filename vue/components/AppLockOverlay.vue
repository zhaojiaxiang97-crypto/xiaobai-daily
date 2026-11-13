<template>
<div><div><div><button :class="`size-3 rounded-full bg-[#ff5f57] [-webkit-app-region:no-drag]`" :aria-label="i(`app.close`)" @click="te"></button><button :class="`size-3 rounded-full bg-[#febc2e] [-webkit-app-region:no-drag]`" :aria-label="i(`app.minimize`)" @click="j"></button><button :class="`size-3 rounded-full bg-[#28c840] [-webkit-app-region:no-drag]`" :aria-label="i(`app.maximize`)" @click="ee"></button></div><span>{{ i(`common.appName`) }}</span><div><button :class="`h-8 w-10 text-muted-foreground hover:bg-black/5 dark:hover:bg-accent`" @click="j">—</button><button :class="`h-8 w-10 text-muted-foreground hover:bg-black/5 dark:hover:bg-accent`" @click="ee">□</button><button :class="`h-8 w-10 text-muted-foreground hover:bg-red-500 hover:text-white`" @click="te">×</button></div></div><div><form :class="[`w-full rounded-2xl border border-black/[0.06] bg-white/95 dark:border-border dark:bg-card`,o.value===`unlock`?`max-w-[380px] p-7`:`max-w-[420px] p-6`]" @submit="withDirectives(A,[`prevent`])"><div :class="[`flex flex-col items-center text-center`,o.value===`unlock`?`mb-7 gap-3`:`mb-5 gap-2.5`]"><span><component :is="Vo" :size="28" :stroke-width="1.8" /></span><h1>{{ o.value===`unlock`?i(`appLock.lockedTitle`):i(`appLock.recoverTitle`) }}</h1><p>{{ i(`appLock.lockedDesc`) }}</p></div><div><label>{{ i(`appLock.password`) }}</label><component :is="gz" :modelValue="s.value" @update:modelvalue="e=>s.value=e" :placeholder="i(`appLock.passwordPlaceholder`)" autocomplete="current-password" autofocus="" /></div><p>{{ d.value }}</p><div><component :is="P" type="button" variant="outline" :class="`h-10 gap-1.5`" :disabled="u.value" @click="O" /><component :is="P" :class="`h-10 gap-2`" type="submit" :disabled="S.value" /></div><button type="button" :class="`mt-5 w-full py-1 text-center text-xs text-muted-foreground transition-colors hover:text-primary`" @click="e=>o.value===`unlock`?T():w()">{{ o.value===`unlock`?i(`appLock.forgotPassword`):i(`appLock.backToUnlock`) }}</button></form></div></div>
</template>

<script setup>
import { withDirectives } from 'vue';
import gz from './PasswordInput.vue';
// [符号说明] u=useConfigProviderContext
import { S_no as no, S_Vo as Vo, S_is as is, S_xs as xs, S_state as state, S_h1 as h1, S_i as i, S_o as o, S_s as s, S_u as u, S_d as d, S_p as p, S_S as S, S_w as w, S_T as T, S_O as O, S_A as A, S_j as j, S_ee as ee, S_te as te, S_P as P, S_mt as mt } from '../shared.js';
const e = defineProps({
      state: {}
    });
const n = e;
</script>
