<template>
<section data-v-5fa5b663 :data-campaign-id="e.id" :class="`rounded-[10px] bg-black/[0.02] p-4 px-5 dark:bg-white/[0.03]`" :aria-label="i(`creditCampaign.sectionLabel`)"><div><div><component :is="vo" :size="14" :stroke-width="1.5" :class="`text-muted-foreground`" /><h3>{{ i(`creditCampaign.sectionLabel`) }}</h3></div><span><span v-text="i(`creditCampaign.endsOn`,{date:e.endDate})" /></span></div><div><p>{{ e.displayTitle||e.name }}</p><p>{{ e.name }}</p><p>{{ e.description }}</p><div><div><p>{{ toDisplayString(i(`creditCampaign.dailyPrefix`))+` ` }}<strong :class="`text-xl font-semibold text-primary`" :title="String(e.dailyCredits)">{{ T(e.dailyCredits) }}</strong>{{ ` `+toDisplayString(i(`creditCampaign.creditsUnit`)) }}</p><p>{{ toDisplayString(i(`creditCampaign.claimedDays`,{days:T(e.claimedDays)}))+` · `+toDisplayString(i(`creditCampaign.totalClaimedPrefix`))+` ` }}<span :title="String(e.totalCredits)">{{ T(e.totalCredits) }}</span>{{ ` `+toDisplayString(i(`creditCampaign.creditsUnit`)) }}</p></div><div><component :is="P" size="sm" :disabled="d.value||e.claimedToday" @click="t=>M(e)" /><component :is="P" size="sm" variant="outline" :class="`profile-external-button`" @click="t=>ne(e)" /></div></div></div></section>
</template>

<script setup>
import { toDisplayString } from 'vue';
import xl from './MenuRadioItem.vue';
// [符号说明] M~computed
import { S_vo as vo, S_is as is, S_sm as sm, S_px as px, S_e as e, S_t as t, S_i as i, S_d as d, S_p as p, S_v as v, S_T as T, S_M as M, S_ne as ne, S_P as P } from '../shared.js';
const text = defineProps({
      userId: {},
      variant: {},
      refreshKey: {}
    });
const r = text;
</script>

<style>
/* 从原应用 CSS 恢复（data-v-5fa5b663） */
[data-v-5fa5b663]{position:relative;overflow:visible}
[data-v-5fa5b663]{z-index:2;background:var(--primary);color:var(--primary-foreground);white-space:nowrap;pointer-events:none;border-radius:999px;padding:5px 10px;font-size:11px;font-weight:650;line-height:16px;display:block;position:absolute;top:-23px;right:-9px}
[data-v-5fa5b663]{z-index:20;box-shadow:0 8px 28px color-mix(in srgb, var(--foreground) 9%, transparent);-webkit-app-region:no-drag;border-radius:16px;gap:10px;padding:12px;position:absolute;bottom:70px;left:12px;right:24px}
[data-v-5fa5b663]:not(.campaign-expanded){gap:8px}
[data-v-5fa5b663]{grid-template-columns:minmax(0,1fr) auto;align-items:center;gap:6px;display:grid}
[data-v-5fa5b663]{width:16px;height:16px;color:var(--muted-foreground);position:absolute;top:12px;right:12px}
[data-v-5fa5b663]{color:var(--muted-foreground)}
[data-v-5fa5b663]{text-align:left;cursor:pointer;min-width:0;margin-right:24px}
[data-v-5fa5b663]{align-items:center;gap:2px;display:flex}
[data-v-5fa5b663]{white-space:normal;overflow-wrap:anywhere;flex:1;min-width:0;font-size:12px;font-weight:600;line-height:18px;display:block}
[data-v-5fa5b663]{color:var(--muted-foreground);flex-wrap:wrap;align-items:center;gap:2px;font-size:10px;display:flex}
[data-v-5fa5b663]{flex-shrink:0;height:26px;padding-inline:7px;font-size:10px}
[data-v-5fa5b663]{padding-top:26px}
[data-v-5fa5b663]{top:8px;right:8px}
[data-v-5fa5b663]{text-align:center;overflow-wrap:anywhere;margin:0;font-size:12px;font-weight:600;line-height:18px}
[data-v-5fa5b663]{color:var(--primary);justify-content:center;align-items:center;gap:10px;display:flex}
[data-v-5fa5b663]{opacity:.35;background:currentColor;flex-shrink:0;width:22px;height:44px;-webkit-mask:url("data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%2024%2048'%3e%3cpath%20d='M20%2045C9%2037%205%2021%2012%209C13.5%206.5%2015%204.8%2017%203'%20fill='none'%20stroke='%23000'%20stroke-width='.7'%20stroke-linecap='round'/%3e%3cpath%20d='M17%203C16%20.8%2018%20.1%2020%200C19.6%201.9%2018.6%203%2017%203Z%20M14%206.3C11.3%205.5%2011.9%202.4%2012.7%201C14.6%202.8%2015%204.4%2014%206.3Z%20M14%206.3C15%203.8%2018.5%204.1%2020%203.5C19.1%206%2016.5%207.1%2014%206.3Z%20M11.5%2010C8.4%209%208.8%205.9%209.2%204.4C11.4%206%2012.4%207.9%2011.5%2010Z%20M11.5%2010C12.9%207.6%2016%208%2017.8%207C17%209.9%2014%2011%2011.5%2010Z%20M9.5%2015C6.1%2013.8%205.9%2010.4%206.1%208.8C8.8%2010.3%2010.1%2012.4%209.5%2015Z%20M9.5%2015C11.2%2012.4%2014.4%2013%2015.9%2011.8C15.4%2015.1%2012.2%2016.3%209.5%2015Z%20M8.5%2020.5C5%2019.5%203.8%2016.2%203.6%2014.2C6.5%2015.4%208.5%2017.5%208.5%2020.5Z%20M8.5%2020.5C9.8%2017.5%2013.2%2017.9%2014.7%2016.4C14.7%2019.6%2011.8%2021.7%208.5%2020.5Z%20M8.8%2026C5%2025.7%203%2022.6%202.4%2020.7C5.6%2021.2%208%2023%208.8%2026Z%20M8.8%2026C9.5%2022.8%2012.9%2022.8%2014%2020.8C14.9%2024%2012.4%2026.5%208.8%2026Z%20M10.3%2031.7C6.7%2032%203.7%2029.7%202.8%2027.7C6.2%2027.6%209%2028.9%2010.3%2031.7Z%20M10.3%2031.7C10.2%2028.6%2013.5%2027.6%2014.1%2025.5C15.7%2028.5%2013.8%2031.7%2010.3%2031.7Z%20M12.8%2036.8C9.5%2038%206.1%2036.4%204.7%2034.8C7.9%2033.7%2011%2034.5%2012.8%2036.8Z%20M12.8%2036.8C11.9%2033.6%2014.8%2032%2014.9%2029.8C17.2%2032.4%2016.1%2035.9%2012.8%2036.8Z%20M16.2%2041.5C13.2%2043.3%209.8%2042.4%208%2041C10.8%2039.4%2014%2039.5%2016.2%2041.5Z%20M16.2%2041.5C14.6%2038.7%2016.8%2036.4%2016.4%2034.3C19.3%2036.3%2019.3%2039.7%2016.2%2041.5Z'/%3e%3c/svg%3e") 50%/contain no-repeat;mask:url("data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%2024%2048'%3e%3cpath%20d='M20%2045C9%2037%205%2021%2012%209C13.5%206.5%2015%204.8%2017%203'%20fill='none'%20stroke='%23000'%20stroke-width='.7'%20stroke-linecap='round'/%3e%3cpath%20d='M17%203C16%20.8%2018%20.1%2020%200C19.6%201.9%2018.6%203%2017%203Z%20M14%206.3C11.3%205.5%2011.9%202.4%2012.7%201C14.6%202.8%2015%204.4%2014%206.3Z%20M14%206.3C15%203.8%2018.5%204.1%2020%203.5C19.1%206%2016.5%207.1%2014%206.3Z%20M11.5%2010C8.4%209%208.8%205.9%209.2%204.4C11.4%206%2012.4%207.9%2011.5%2010Z%20M11.5%2010C12.9%207.6%2016%208%2017.8%207C17%209.9%2014%2011%2011.5%2010Z%20M9.5%2015C6.1%2013.8%205.9%2010.4%206.1%208.8C8.8%2010.3%2010.1%2012.4%209.5%2015Z%20M9.5%2015C11.2%2012.4%2014.4%2013%2015.9%2011.8C15.4%2015.1%2012.2%2016.3%209.5%2015Z%20M8.5%2020.5C5%2019.5%203.8%2016.2%203.6%2014.2C6.5%2015.4%208.5%2017.5%208.5%2020.5Z%20M8.5%2020.5C9.8%2017.5%2013.2%2017.9%2014.7%2016.4C14.7%2019.6%2011.8%2021.7%208.5%2020.5Z%20M8.8%2026C5%2025.7%203%2022.6%202.4%2020.7C5.6%2021.2%208%2023%208.8%2026Z%20M8.8%2026C9.5%2022.8%2012.9%2022.8%2014%2020.8C14.9%2024%2012.4%2026.5%208.8%2026Z%20M10.3%2031.7C6.7%2032%203.7%2029.7%202.8%2027.7C6.2%2027.6%209%2028.9%2010.3%2031.7Z%20M10.3%2031.7C10.2%2028.6%2013.5%2027.6%2014.1%2025.5C15.7%2028.5%2013.8%2031.7%2010.3%2031.7Z%20M12.8%2036.8C9.5%2038%206.1%2036.4%204.7%2034.8C7.9%2033.7%2011%2034.5%2012.8%2036.8Z%20M12.8%2036.8C11.9%2033.6%2014.8%2032%2014.9%2029.8C17.2%2032.4%2016.1%2035.9%2012.8%2036.8Z%20M16.2%2041.5C13.2%2043.3%209.8%2042.4%208%2041C10.8%2039.4%2014%2039.5%2016.2%2041.5Z%20M16.2%2041.5C14.6%2038.7%2016.8%2036.4%2016.4%2034.3C19.3%2036.3%2019.3%2039.7%2016.2%2041.5Z'/%3e%3c/svg%3e") 50%/contain no-repeat}
[data-v-5fa5b663]{transform:scaleX(-1)}
[data-v-5fa5b663]{font-variant-numeric:tabular-nums;font-size:32px;font-weight:600;line-height:1.2}
[data-v-5fa5b663]{color:var(--muted-foreground);text-align:center;overflow-wrap:anywhere;max-height:48px;font-size:11px;overflow:auto}
[data-v-5fa5b663]{color:var(--muted-foreground);flex-wrap:wrap;justify-content:center;gap:8px;font-size:10px;display:flex}
[data-v-5fa5b663]{color:var(--primary);font-weight:500}
[data-v-5fa5b663]{color:var(--muted-foreground);justify-content:space-between;align-items:center;gap:4px;font-size:10px;display:flex}
[data-v-5fa5b663]{overflow-wrap:anywhere;min-width:0}
[data-v-5fa5b663] [data-slot=badge]{flex-shrink:0;padding-inline:4px;font-size:10px}
[data-v-5fa5b663]{grid-template-columns:minmax(0,1fr);gap:6px;display:grid}
[data-v-5fa5b663]{grid-template-columns:repeat(2,minmax(0,1fr))}
[data-v-5fa5b663] button{min-width:0;padding-inline:4px;font-size:11px}
[data-v-5fa5b663]{color:var(--muted-foreground);justify-content:center;align-items:center;gap:12px;font-size:10px;display:flex}
[data-v-5fa5b663] button{width:22px;height:20px}
[data-v-5fa5b663]{max-height:calc(100dvh - 130px);overflow-y:auto}
</style>
