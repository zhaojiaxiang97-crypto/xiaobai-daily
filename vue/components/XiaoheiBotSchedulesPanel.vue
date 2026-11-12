<template>
<aside data-v-09b664fa :class="`bot-schedule-panel`" :aria-label="r(`botUi.schedules`)"><header><span><component :is="qa" :size="16" :stroke-width="1.8" /></span><strong>{{ r(`botUi.schedules`) }}</strong><component :is="Qr" :delay-duration="120" /></header><div><p>{{ h.value }}</p><p><component :is="Wa" :size="14" :class="`shrink-0`" />{{ g.value }}</p><div><component :is="P" variant="ghost" size="sm" :class="`schedule-back`" :disabled="p.value" @click="e=>{u.value=null,g.value=``,h.value=``;}" /><component :is="Qr" :delay-duration="120" /></div><div><div><strong>{{ u.value.enabled?r(`botUi.enabled`):r(`botUi.paused`) }}</strong><p>{{ u.value.enabled?r(`botUi.enabledHint`):r(`botUi.pausedHint`) }}</p></div><component :is="Te" :modelValue="u.value.enabled" @update:modelvalue="e=>u.value.enabled=e" :disabled="p.value" :aria-label="r(`botUi.enableTask`)" /></div><div><label><span>{{ r(`botUi.taskName`) }}</span><component :is="Lp" :modelValue="u.value.name" @update:modelvalue="e=>u.value.name=e" maxlength="80" :placeholder="r(`botUi.namePlaceholder`)" /></label><label><span>{{ r(`botUi.instruction`) }}</span><component :is="Rp" :modelValue="u.value.instruction" @update:modelvalue="e=>u.value.instruction=e" :class="`schedule-instruction`" :rows="5" maxlength="20000" :placeholder="r(`botUi.instructionPlaceholder`)" /></label><section><h3><component :is="Ft" :size="14" />{{ r(`botUi.runTime`) }}</h3><div><label>{{ r(`botUi.frequency`) }}</label><component :is="By" :modelValue="u.value.rule.frequency" @update:modelvalue="e=>u.value.rule.frequency=e" /></div><div><span>{{ r(`botUi.date`) }}</span><component :is="CP" :model-value="u.value.rule.date??``" @update:modelvalue="e=>u.value.rule.date=e" :label="r(`botUi.date`)" mode="date" value-format="date" align="end" compact="" :show-quick-dates="false" :disabled="p.value" trigger-class="!w-full !h-9 !rounded-lg !text-xs" /></div><label><span>{{ r(`botUi.minutes`) }}</span><component :is="Lp" :modelValue="u.value.rule.intervalMinutes" @update:modelvalue="e=>u.value.rule.intervalMinutes=e" :modelModifiers="({number:true})" type="number" min="1" max="525600" /></label><div><div><span>{{ r(`botUi.weekdays`) }}</span><component :is="P" variant="ghost" size="sm" :class="`h-7 px-2 text-xs`" @click="e=>u.value.rule.weekdays=[1,2,3,4,5]" /></div><div></div></div><div><span>{{ r(`botUi.monthDays`) }}</span><div></div><component :is="P" size="sm" :class="`w-full text-xs`" :variant="u.value.rule.monthDays?.includes(-1)?`default`:`outline`" :aria-pressed="u.value.rule.monthDays?.includes(-1)" @click="e=>C(`monthDays`,-1)" /><p>{{ r(`botUi.skipDates`) }}</p></div></section></div><p>{{ r(`botUi.catchUp`) }}</p><section><component :is="P" variant="ghost" size="sm" :aria-expanded="f.value" @click="e=>{f.value=!f.value,f.value&&x(true);}" /><div><p>{{ r(`botUi.emptyHistory`) }}</p></div></section></div><footer><div :class="[`schedule-footer__actions`,{'schedule-footer__actions--single':!u.value.id}]"><component :is="P" :disabled="p.value" data-credit-feature="bot_schedule" data-credit-action="schedule" @click="T" /><component :is="P" variant="outline" :disabled="p.value||d.value.some(item=>item.status===`running`)" data-credit-feature="bot_schedule" data-credit-action="run" @click="D" /></div><p>{{ r(`botUi.runNowHint`) }}</p></footer></aside>
</template>

<script setup>
import By from './Select.vue';
import CP from './DateTimePickerField.vue';
// [符号说明] u=useConfigProviderContext, f=useConfigProviderContext, D=useConfigProviderContext
import { S_Wa as Wa, S_qa as qa, S_is as is, S_xs as xs, S_sm as sm, S_lg as lg, S_px as px, S_r as r, S_u as u, S_d as d, S_f as f, S_p as p, S_g as g, S_x as x, S_C as C, S_w as w, S_T as T, S_D as D, S_P as P, S_Te as Te, S_Ft as Ft, S_Qr as Qr } from '../shared.js';
const e = defineProps({
      conversationId: {},
      botId: {},
      botName: {}
    });
const s = e;
</script>

<style>
/* 从原应用 CSS 恢复（data-v-09b664fa） */
[data-v-09b664fa]{background:var(--background);flex-direction:column;flex:1;width:100%;min-width:0;min-height:0;display:flex;overflow:hidden}
[data-v-09b664fa]{border-bottom:1px solid var(--border);flex-shrink:0;align-items:center;gap:9px;height:50px;padding:0 12px 0 16px;display:flex}
[data-v-09b664fa]{font-size:13px;font-weight:600}
[data-v-09b664fa]{color:var(--muted-foreground);place-items:center;display:grid}
[data-v-09b664fa]{scrollbar-gutter:stable;flex:1;min-height:0;padding:18px 16px 24px;overflow:hidden auto}
[data-v-09b664fa]{margin-bottom:22px}
[data-v-09b664fa]{overflow-wrap:anywhere;font-size:13px;font-weight:500;line-height:1.6}
[data-v-09b664fa]{color:var(--muted-foreground);margin-top:6px;font-size:12px;line-height:1.8}
[data-v-09b664fa]{justify-content:space-between;align-items:center;gap:8px;margin-bottom:12px;display:flex}
[data-v-09b664fa]{color:var(--muted-foreground);align-items:center;gap:7px;font-size:12px;display:flex}
[data-v-09b664fa]{font-variant-numeric:tabular-nums;font-size:11px}
[data-v-09b664fa]{height:30px;padding-inline:10px;font-size:12px}
[data-v-09b664fa]{flex-direction:column;gap:10px;display:flex}
[data-v-09b664fa]{border:1px solid var(--border);border-radius:10px;transition:border-color .15s,background .15s;position:relative;overflow:hidden}
[data-v-09b664fa]:hover{border-color:color-mix(in srgb, var(--muted-foreground) 30%, var(--border));background:color-mix(in srgb, var(--muted) 45%, var(--background))}
[data-v-09b664fa]{text-align:left;cursor:pointer;flex-direction:column;gap:5px;width:100%;padding:14px 48px 14px 13px;display:flex}
[data-v-09b664fa]:focus-visible{outline:2px solid var(--ring);outline-offset:-2px;border-radius:10px}
[data-v-09b664fa]{overflow-wrap:anywhere;font-size:13px;font-weight:550;line-height:1.6}
[data-v-09b664fa]{color:var(--muted-foreground);overflow-wrap:anywhere;font-size:11px;line-height:1.6}
[data-v-09b664fa]{align-items:center;gap:5px;margin-top:3px;display:flex}
[data-v-09b664fa]{color:var(--muted-foreground);opacity:.5;position:absolute;bottom:17px;right:17px}
[data-v-09b664fa]{align-items:center;display:flex;position:absolute;top:16px;right:12px}
[data-v-09b664fa]{color:var(--muted-foreground)}
[data-v-09b664fa]{text-align:center;flex-direction:column;align-items:center;padding:36px 0;display:flex}
[data-v-09b664fa]{background:var(--muted);width:46px;height:46px;color:var(--muted-foreground);border-radius:14px;place-items:center;margin-bottom:14px;display:grid}
[data-v-09b664fa]{font-size:13px;font-weight:500}
[data-v-09b664fa]{color:var(--muted-foreground);margin-top:7px;font-size:12px;line-height:1.8}
[data-v-09b664fa]{justify-content:space-between;align-items:center;margin:-5px -5px 14px;display:flex}
[data-v-09b664fa]{color:var(--muted-foreground);padding-inline:5px;font-size:12px}
[data-v-09b664fa]{color:var(--muted-foreground)}
[data-v-09b664fa]:hover{color:var(--destructive);background:color-mix(in srgb, var(--destructive) 8%, var(--background))}
[data-v-09b664fa]{border:1px solid var(--border);background:color-mix(in srgb, var(--muted) 40%, var(--background));border-radius:10px;justify-content:space-between;align-items:center;gap:12px;margin-bottom:22px;padding:12px;display:flex}
[data-v-09b664fa]{font-size:12px;font-weight:500}
[data-v-09b664fa]{color:var(--muted-foreground);margin-top:3px;font-size:11px}
[data-v-09b664fa]{flex-direction:column;gap:20px;display:flex}
[data-v-09b664fa]{flex-direction:column;gap:8px;min-width:0;font-size:12px;display:flex}
[data-v-09b664fa],.schedule-field>label[data-v-09b664fa]{color:var(--muted-foreground);font-weight:500}
[data-v-09b664fa] input,.schedule-field[data-v-09b664fa] textarea,.schedule-field[data-v-09b664fa] [data-slot=select-trigger]{border-radius:9px;width:100%;min-width:0;font-size:13px}
[data-v-09b664fa] input,.schedule-field[data-v-09b664fa] [data-slot=select-trigger]{min-height:36px}
[data-v-09b664fa]{resize:vertical;min-height:126px;line-height:1.8}
[data-v-09b664fa]{border-top:1px solid var(--border);flex-direction:column;gap:16px;padding-top:18px;display:flex}
[data-v-09b664fa]{align-items:center;gap:7px;font-size:12px;font-weight:600;display:flex}
[data-v-09b664fa]{color:var(--muted-foreground)}
[data-v-09b664fa]{color:var(--muted-foreground);justify-content:space-between;align-items:center;display:flex}
[data-v-09b664fa]{grid-template-columns:repeat(7,minmax(0,1fr));gap:4px;display:grid}
[data-v-09b664fa]{font-variant-numeric:tabular-nums;border-radius:7px;min-width:0;height:30px;padding:0;font-size:12px}
[data-v-09b664fa]{color:var(--muted-foreground);font-size:11px;line-height:1.8}
[data-v-09b664fa]{margin-top:18px}
[data-v-09b664fa]{border-top:1px solid var(--border);margin-top:24px;padding-top:18px}
[data-v-09b664fa]{margin-bottom:12px;font-size:12px;font-weight:500}
[data-v-09b664fa]{color:var(--muted-foreground);font-size:11px}
[data-v-09b664fa]{border-bottom:1px solid var(--border);padding:12px 0}
[data-v-09b664fa]:last-child{border-bottom:0;padding-bottom:0}
[data-v-09b664fa]{color:var(--muted-foreground);flex-wrap:wrap;align-items:center;gap:6px;font-size:10px;display:flex}
[data-v-09b664fa]{font-variant-numeric:tabular-nums;margin-left:auto}
[data-v-09b664fa]{color:var(--foreground);font-size:11px}
[data-v-09b664fa]{color:var(--destructive)}
[data-v-09b664fa]{-webkit-line-clamp:3;color:var(--muted-foreground);overflow-wrap:anywhere;-webkit-box-orient:vertical;margin-top:6px;font-size:12px;line-height:1.7;display:-webkit-box;overflow:hidden}
[data-v-09b664fa]{border-top:1px solid var(--border);background:var(--background);flex-shrink:0;padding:14px 16px}
[data-v-09b664fa]{grid-template-columns:repeat(2,minmax(0,1fr));gap:8px;display:grid}
[data-v-09b664fa]{grid-template-columns:minmax(0,1fr)}
[data-v-09b664fa] button{border-radius:9px;min-width:0;height:34px;padding-inline:8px;font-size:12px}
[data-v-09b664fa]{text-align:center;color:var(--muted-foreground);margin-top:8px;font-size:10px;line-height:1.6}
[data-v-09b664fa]{background:var(--muted);color:var(--muted-foreground);border-radius:8px;align-items:flex-start;gap:7px;margin-bottom:16px;padding:10px;font-size:12px;line-height:1.7;display:flex}
[data-v-09b664fa]{margin-top:3px}
[data-v-09b664fa]{color:var(--destructive);background:color-mix(in srgb, var(--destructive) 8%, var(--background))}
[data-v-09b664fa]{transition:none}
</style>
