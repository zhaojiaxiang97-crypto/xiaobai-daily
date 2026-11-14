<template>
<div ref="r" :class="`generate-report-theme-scope subscribe-theme-scope flex flex-col gap-5 p-6 px-7 pb-10`"><div><img :src="v===`en-US`?u:c" alt="banner" :class="`w-full h-auto object-cover dark:hidden`" draggable="false" /><img :src="v===`en-US`?d:l" alt="banner" :class="`hidden w-full h-auto object-cover dark:block`" draggable="false" /></div><div><component :is="zn" :size="16" :class="`animate-spin`" /><span>{{ _(`subscribe.loadingPlans`) }}</span></div><p>{{ k }}</p><p>{{ ie }}</p><div><div><component :is="$a" :size="16" /></div><div><p>{{ _(`subscribe.creditsUsage.title`) }}</p><p>{{ _(`subscribe.creditsUsage.description`) }}</p></div></div><div><div><component :is="vo" :size="16" /><span>{{ _(`subscribe.limitedTimeOffer`) }}</span></div><div><div><span>{{ st(Pe.days) }}</span><span>{{ _(`subscribe.countdown.day`) }}</span><span>{{ st(Pe.hours) }}</span><span>{{ _(`subscribe.countdown.hour`) }}</span><span>{{ st(Pe.minutes) }}</span><span>{{ _(`subscribe.countdown.minute`) }}</span><span>{{ st(Pe.seconds) }}</span><span>{{ _(`subscribe.countdown.second`) }}</span></div></div><div><p>{{ p }}</p><p>{{ m }}</p></div></div><section><div><component :is="Ao" :size="14" :stroke-width="1.5" :class="`text-[#999]`" /><h2>{{ _(`subscribe.cdKey.title`) }}</h2></div><div><span v-text="Xe(createElementVNode(`input`,{'onUpdate:modelValue':t[0]||=e=>ue=e,type:`text`,placeholder:_(`subscribe.cdKey.placeholder`),class:`flex-1 h-9 px-3 text-sm rounded-lg border border-border bg-white outline-none focus:border-primary transition-colors`,disabled:de,onInput:At,onKeydown:t[1]||=xt(e=>jt(),[`enter`])},null,40,cE),[[yt,ue]])" /><component :is="P" size="sm" :class="`h-9 px-4`" :disabled="de||!ue" @click="e=>jt()" /></div><p>{{ _(`subscribe.cdKey.hint`) }}</p><p>{{ fe }}</p><p>{{ pe }}</p></section><component :is="Qe" to="body" /><section><div><div><component :is="vo" :size="14" :stroke-width="1.5" :class="`text-[#999]`" /><h2>{{ _(`subscribe.buyCard.title`) }}</h2></div><component :is="P" size="sm" variant="outline" :class="`h-7 gap-1 text-xs`" @click="Vt" /></div><p>{{ _(`subscribe.buyCard.subtitle`) }}</p><div></div><div><div><span>{{ _(`subscribe.buyCard.quantity`) }}</span><div><button type="button" :class="`w-7 h-8 flex items-center justify-center text-[#777] hover:bg-black/5 disabled:opacity-40`" :disabled="ve<=1" @click="e=>Rt(ve-1)"><component :is="he" :size="13" /></button><input :value="ve" type="text" inputmode="numeric" :class="`w-10 h-8 text-center text-sm outline-none border-x border-border`" @input="e=>Rt(Number(e.target.value))" /><button type="button" :class="`w-7 h-8 flex items-center justify-center text-[#777] hover:bg-black/5 disabled:opacity-40`" :disabled="ve>=100" @click="e=>Rt(ve+1)"><component :is="a" :size="13" /></button></div></div><component :is="P" :class="`h-9 px-4 gap-1 transition-colors duration-150 hover:bg-primary/85`" :disabled="ye||!It?.value" @click="zt" /></div><p>{{ _(`subscribe.buyCard.hint`) }}</p><p>{{ be }}</p></section><section><div><div><component :is="hs" :size="14" :stroke-width="1.5" :class="`text-[#999]`" /><h2>{{ _(`subscribe.orders.title`) }}</h2></div><component :is="P" size="sm" variant="outline" :class="`h-7 gap-1 text-xs`" @click="e=>o(`show-wechat-qrcode`)" /></div><div>{{ _(`subscribe.orders.loadingOrders`) }}</div></section><component :is="Qe" to="body" /><component :is="Qe" to="body" /><component :is="Qe" to="body" /></div>
</template>

<script setup>
import { createElementVNode } from 'vue';

// [兜底] 模板引用但无来源的符号
// [符号说明] l~computed, u=useConfigProviderContext
import { S_$a as $a, S_to as to, S_vo as vo, S_Ao as Ao, S_is as is, S_hs as hs, S_xs as xs, S_sm as sm, S_lg as lg, S_pb as pb, S_px as px, S_US as US, S_cE as cE, S_h2 as h2, S_alt as alt, S_e as e, S_t as t, S_r as r, S_a as a, S_o as o, S_c as c, S_l as l, S_u as u, S_d as d, S__ as _, S_v as v, S_x as x, S_he as he, S_P as P, S_Xe as Xe, S_Qe as Qe, S_yt as yt, S_xt as xt, S_en as en, S_zn as zn } from '../shared.js';
const It = { value: undefined };
import { ref } from 'vue';

// [setup 还原] 原组件 setup 里初值不依赖 IPC 的声明
let p = ref(``);
let m = ref(``);
let w = ref([]);
let k = ref(``);
let ie = ref(``);
let ue = ref(``);
let de = ref(false);
let fe = ref(``);
let pe = ref(``);
let ve = ref(1);
let ye = ref(false);
let be = ref(``);
let Pe = ref({
  days: 0,
  hours: 0,
  minutes: 0,
  seconds: 0
});
function st(e) {
  return e.toString().padStart(2, `0`);
}
function At(e) {
  let target = e.target,
    n = target.selectionStart || 0,
    value = target.value,
    i = kt(value);
  ue.value = i, requestAnimationFrame(() => {
    let e = i.length - value.length,
      a = Math.max(0, Math.min(i.length, n + e));
    target.setSelectionRange(a, a);
  });
}
async function jt(e = false) {
  if (!x.value?.token || de.value) return false;
  let t = ue.value.trim();
  if (!t) return fe.value = _(`subscribe.cdKey.inputRequired`), false;
  de.value = true, fe.value = ``, pe.value = ``;
  try {
    let n = await (await fetch(`${bO}/cdkey.php?action=redeem`, {
      method: `POST`,
      headers: q(),
      body: JSON.stringify({
        cdKey: t,
        creditsSchemaVersion: 2,
        confirmUpgrade: e,
        upgradeFromOrderId: e ? ge.value?.upgradeFromOrderId : undefined
      })
    })).json();
    if (!n.ok) return n.error?.code === `UPGRADE_CONFIRM_REQUIRED` && n.data ? (ge.value = n.data, me.value = true, fe.value = ``, false) : (fe.value = n.error?.message || _(`subscribe.cdKey.redeemFailed`), false);
    let data = n.data,
      i = data.newExpiresAt ? data.newExpiresAt.split(` `)[0] : _(`subscribe.cdKey.permanent`),
      a = data.durationDays > 0 ? data.durationDays + _(`subscribe.cdKey.day`) : ``;
    return pe.value = _(`subscribe.cdKey.redeemSuccess`, {
      planName: data.planName,
      duration: a,
      expiresAt: i
    }), ue.value = ``, me.value = false, ge.value = null, await C(), await dt(1), true;
  } catch (e) {
    return fe.value = e instanceof Error ? e.message : _(`subscribe.cdKey.redeemFailed`), false;
  } finally {
    de.value = false;
  }
}
function Rt(e) {
  ve.value = Math.max(1, Math.min(100, Math.floor(e) || 1));
}
async function zt() {
  let deviceId = y.value.deviceId,
    value = It.value;
  if (deviceId && x.value?.token && !ye.value && value) {
    ye.value = true, be.value = ``, Me.value = ``;
    try {
      let n = y.value.language || `zh-CN`,
        r = await (await fetch(`${bO}/orders.php`, {
          method: `POST`,
          headers: q(),
          body: JSON.stringify({
            action: `create`,
            deviceId: deviceId,
            planId: `cardkey`,
            cardPlanId: value.id,
            quantity: ve.value,
            creditsSchemaVersion: 2,
            lang: n
          })
        })).json();
      if (!r.ok || !r.data) throw Error(r.error?.message ?? _(`errors.unknownError`));
      let orderNo = r.data.orderNo,
        a = await (await fetch(`${xO}/pay.php`, {
          method: `POST`,
          headers: {
            "Content-Type": `application/json`
          },
          body: JSON.stringify({
            action: `create`,
            orderNo: orderNo,
            deviceId: deviceId
          })
        })).json();
      if (!a.ok || !a.data) throw Error(a.error?.message ?? _(`errors.unknownError`));
      ke.value = orderNo, Ae.value = r.data.planName, je.value = r.data.amount, Oe.value = a.data.codeUrl, xe = true, De.value = true, trackActionEvent(`feature_map_recharge_click`, {
        entry: `card_payment`
      }), dt(1), vt(orderNo);
    } catch (e) {
      be.value = e instanceof Error ? e.message : _(`subscribe.plansError`);
    } finally {
      ye.value = false;
    }
  }
}
function Vt() {
  Se.value = true, Bt();
}
</script>
