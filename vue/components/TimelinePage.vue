<template>
<div data-v-b1f9f784><div ref="t" :class="`timeline-intro pt-4 pb-0.5`"><p>{{ r(`timeline.desc`) }}</p></div><section><div><div><component :is="Ect" :start="M?.value" :end="ne?.value" :max-date="w(new Date())" @change="N" /><div><component :is="Cs" :size="13" :class="`absolute left-2.5 top-1/2 -translate-y-1/2 text-[#bbb]`" /><component :is="Lp" :modelValue="y" @update:modelvalue="e=>$e(y)?y.value=e:null" :placeholder="r(`timeline.searchPlaceholder`)" :class="`h-7 w-[180px] pl-8 text-xs`" /></div></div><div><component :is="P" size="sm" variant="outline" :class="`h-7 gap-1.5 text-xs`" @click="e=>A.value=w(f?.value)" /><component :is="P" size="sm" variant="outline" :class="`h-7 gap-1.5 text-xs`" @click="ht" /><component :is="P" size="icon-sm" variant="outline" :title="r(`timeline.exportData`)" :aria-label="r(`timeline.exportData`)" @click="e=>ie.value=true" /></div></div></section><section><div><div><div><span>{{ Jn.value.totalRecords }}</span><span>{{ r(`timeline.recordCount`) }}</span></div><div><span>{{ Jn.value.focusLabel }}</span><span>{{ r(`timeline.focusHours`) }}</span></div><div><span>{{ Jn.value.activePeriod }}</span><span>{{ r(`timeline.activePeriod`) }}</span></div></div><div><div><component :is="P" size="sm" variant="outline" :class="`h-7 gap-1.5 text-xs`" @click="e=>Xn.value=true" /></div><label><component :is="sg" :modelValue="$n?.value" @update:modelvalue="e=>$n.value=e" :class="`size-3.5`" /><span>{{ r(`timeline.showCategoryDistribution`) }}</span></label></div></div></section><span v-text="Xe(createElementVNode(`section`,vut,[createElementVNode(`div`,yut,[createElementVNode(`div`,but,[resolveComponent(Ja,{size:14,'stroke-width':1.5,class:`text-[#999]`}),createElementVNode(`h2`,xut,toDisplayString(r(`timeline.categoryDistribution`)),1)]),createElementVNode(`div`,Sut,[resolveComponent(P,{size:`icon-sm`,variant:`ghost`,class:normalizeClass([`h-6 w-6`,{'bg-black/5':nr?.value===`flow`}]),title:r(`timeline.categoryFlowView`),onClick:i[5]||=e=>er.value=`flow`},{default:H(()=>[resolveComponent(Ps,{size:13,class:`rotate-90`})]),_:1},8,[`class`,`title`]),resolveComponent(P,{size:`icon-sm`,variant:`ghost`,class:normalizeClass([`h-6 w-6`,{'bg-black/5':nr?.value===`list`}]),onClick:i[6]||=e=>er.value=`list`},{default:H(()=>[resolveComponent(Ia,{size:13})]),_:1},8,[`class`]),resolveComponent(P,{size:`icon-sm`,variant:`ghost`,class:normalizeClass([`h-6 w-6`,{'bg-black/5':nr?.value===`pie`}]),onClick:i[7]||=e=>er.value=`pie`},{default:H(()=>[resolveComponent(Ra,{size:13})]),_:1},8,[`class`]),tr?.value?createCommentVNode(``,true):(openBlock(),createBlock(P,{key:0,size:`icon-sm`,variant:`ghost`,class:normalizeClass([`h-6 w-6`,{'bg-black/5':nr?.value===`3d`}]),title:r(`timeline.categoryHour3dView`),onClick:i[8]||=e=>er.value=`3d`},{default:H(()=>[resolveComponent(Ta,{size:13})]),_:1},8,[`class`,`title`]))])]),createElementVNode(`div`,Cut,[ir.value.length===0?(openBlock(),createElementBlock(`div`,wut,toDisplayString(r(`timeline.noCategoryData`)),1)):(openBlock(),createElementBlock(Fragment,{key:1},[nr?.value===`flow`?(openBlock(),createBlock(I3,{key:0,sources:mr.value.sources,targets:mr.value.targets,links:mr.value.links,'source-title':r(`timeline.flowPeriodColumn`),'target-title':r(`timeline.flowCategoryColumn`),'format-value':hr,'link-color-by':`target`},null,8,[`sources`,`targets`,`links`,`source-title`,`target-title`])):nr?.value===`list`?(openBlock(),createElementBlock(`div`,Tut,[(openBlock(true),createElementBlock(Fragment,null,renderList(or?.value,e=>(openBlock(),createElementBlock(`div`,{key:e.name,class:`flex items-center gap-3`},[createElementVNode(`span`,{class:`text-xs text-[#555] w-[60px] shrink-0 truncate`,title:e.label},toDisplayString(e.label),9,Eut),createElementVNode(`div`,Dut,[createElementVNode(`div`,{class:`h-2 rounded-full transition-all`,style:at({background:e.color,width:e.percentage+`%`})},null,4)]),createElementVNode(`span`,Out,toDisplayString(e.durationLabel),1)]))),128))])):nr?.value===`3d`?(openBlock(),createBlock(rr,{key:2,rows:pr?.value,'column-labels':cr,'row-pitch':1.15,hint:r(`timeline.categoryHour3dHint`),onUnavailable:i[9]||=e=>tr.value=true,onCellClick:_r},null,8,[`rows`,`column-labels`,`hint`])):(openBlock(),createElementBlock(`div`,kut,[createElementVNode(`div`,Aut,[createElementVNode(`div`,jut,[resolveComponent(D3,{data:xr?.value,options:Cr},null,8,[`data`])])]),createElementVNode(`div`,{class:`grid max-h-full gap-x-8 gap-y-2.5 overflow-y-auto pr-1`,style:at({gridAutoFlow:`column`,gridTemplateRows:`repeat(${yr?.value}, auto)`})},[(openBlock(true),createElementBlock(Fragment,null,renderList(ir?.value,e=>(openBlock(),createElementBlock(`div`,{key:e.name,class:normalizeClass([`flex items-center gap-2 cursor-pointer select-none`,{'opacity-40':vr.value.has(e.name)}]),title:e.label,onClick:t=>br(e.name)},[createElementVNode(`span`,{class:`w-2.5 h-2.5 rounded-full shrink-0`,style:at({background:e.color})},null,4),createElementVNode(`span`,Nut,toDisplayString(s(e.label)),1)],10,Mut))),128))],4)])),nr?.value!==`pie`&&ir.value.length>o6?(openBlock(),createElementBlock(`button`,{key:4,type:`button`,class:`mx-auto flex items-center gap-1 pt-1 text-xs text-[#999] transition-colors hover:text-[#555]`,onClick:i[10]||=e=>ar.value=!ar?.value},[createTextVNode(toDisplayString(ar?.value?r(`timeline.collapseCategories`):r(`timeline.expandAllCategories`,{count:ir.value.length}))+` `,1),resolveComponent(un,{size:13,class:normalizeClass([`transition-transform`,{'rotate-180':ar?.value}])},null,8,[`class`])])):createCommentVNode(``,true)],64))])],512),[[Tt,$n?.value]])" /><section ref="gr" :class="`scroll-mt-4 rounded-[10px] bg-black/[0.02] p-5 px-[18px]`"><div><component :is="oa" :size="14" :stroke-width="1.5" :class="`text-[#999]`" /><h2>{{ r(`timeline.activityTimeline`) }}</h2><component :is="By" :modelValue="ee?.value" @update:modelvalue="e=>ee.value=e" /><div ref="n" :class="`inline-flex`"><component :is="P" size="sm" variant="outline" :class="`h-7 gap-1.5 text-xs`" @click="e=>{trackActionEvent(`feature_map_record_click`,{entry:`timeline`}),ge.value=true;}" /></div><component :is="P" size="sm" variant="outline" :class="`h-7 gap-1.5 text-xs`" @click="Dn" /><component :is="P" size="sm" variant="secondary" :class="`h-7 gap-1.5 text-xs`" :title="r(`timeline.clearCategoryHourFilter`)" @click="e=>nn.value=null" /><span>{{ r(`timeline.copyLogsToClipboard`) }}</span><component :is="cw" /></div><div><div>{{ r(`timeline.loadingRecords`) }}</div></div></section><component :is="ui" :open="ge?.value" @update:open="e=>ge.value=e" /><component :is="Olt" :open="_e?.value" @update:open="e=>_e.value=e" /><component :is="ui" :open="ye?.value" @update:open="Ze" /><component :is="ui" :open="se?.value" @update:open="e=>se.value=e" /><component :is="ui" :open="on?.value" @update:open="e=>on.value=e" /><component :is="ui" :open="ie?.value" @update:open="e=>ie.value=e" /><component :is="ict" :open="Xn?.value" @update:open="e=>Xn.value=e" :records="tn?.value" :range-start="M?.value" :range-end="ne?.value" :generate-signal="Zn?.value" @select="Qn" @requestgenerate="e=>Yn.value=true" /><component :is="Hlt" :open="Yn?.value" @update:open="e=>Yn.value=e" :record-count="tn.value.length" @confirmed="e=>Zn.value+=1" /><component :is="ui" :open="Ar?.value" @update:open="e=>Ar.value=e" /><component :is="ui" :open="Br?.value" @update:open="e=>Br.value=e" /><component :is="ui" :open="vt?.value" @update:open="e=>vt.value=e" /><component :is="ui" :open="ot?.value" @update:open="e=>ot.value=e" /><component :is="_i" :open="Yr?.value" @update:open="e=>Yr.value=e" /><component :is="gM" :open="Ie?.value" @update:open="e=>Ie.value=e" @balancechanged="nt" /><component :is="k" :date="A?.value" source="timeline" @close="e=>A.value=null" /></div>
</template>

<script setup>
import { openBlock, createElementBlock, createElementVNode, createBlock, createTextVNode, createCommentVNode, renderList, normalizeClass, toDisplayString, resolveComponent } from 'vue';
import pie from './Sidebar.vue';
import sg from './Checkbox.vue';
import By from './Select.vue';
import cw from './ButtonGroup.vue';
import gM from './RechargeDialog.vue';
import ict from './TimelineWordCloudDialog.vue';
import I3 from './SankeyChart.vue';
import Ect from './TimelineDateRangeBar.vue';
import Olt from './AgentSessionManualImportDialog.vue';

// [兜底] 模板引用但无来源的符号
// [符号说明] n~computed, k~ref
import { S_oa as oa, S_Ta as Ta, S_Ia as Ia, S_Ra as Ra, S_Ja as Ja, S_is as is, S_xs as xs, S_Cs as Cs, S_Ps as Ps, S_trackActionEvent as trackActionEvent, S_sm as sm, S_by as by, S_pb as pb, S_px as px, S_mx as mx, S_h2 as h2, S_D3 as D3, S_vut as vut, S_yut as yut, S_but as but, S_xut as xut, S_Sut as Sut, S_Cut as Cut, S_wut as wut, S_Tut as Tut, S_Eut as Eut, S_Dut as Dut, S_Out as Out, S_kut as kut, S_Aut as Aut, S_jut as jut, S_Mut as Mut, S_Nut as Nut, S_o6 as o6, S_e as e, S_t as t, S_n as n, S_r as r, S_i as i, S_s as s, S_p as p, S__ as _, S_v as v, S_y as y, S_x as x, S_w as w, S_k as k, S_N as N, S_P as P, S_H as H, S_Xe as Xe, S_Ze as Ze, S_$e as $e, S_nt as nt, S_at as at, S_mt as mt, S_ht as ht, S_Tt as Tt, S_un as un, S_Dn as Dn, S_Qn as Qn, S_rr as rr, S_cr as cr, S_pr as pr, S_hr as hr, S_gr as gr, S__r as _r, S_br as br, S_Cr as Cr, S_ui as ui, S__i as _i } from '../shared.js';
const Jn = { value: undefined };
const M = { value: undefined };
const ne = { value: undefined };
const Lp = { value: undefined };
const A = { value: undefined };
const f = { value: undefined };
const ie = { value: undefined };
const Xn = { value: undefined };
const $n = { value: undefined };
const nr = { value: undefined };
const er = { value: undefined };
const tr = { value: undefined };
const ir = { value: undefined };
const Fragment = { value: undefined };
const mr = { value: undefined };
const or = { value: undefined };
const xr = { value: undefined };
const yr = { value: undefined };
const vr = { value: undefined };
const ar = { value: undefined };
const ee = { value: undefined };
const ge = { value: undefined };
const nn = { value: undefined };
const _e = { value: undefined };
const ye = { value: undefined };
const se = { value: undefined };
const on = { value: undefined };
const tn = { value: undefined };
const Zn = { value: undefined };
const Yn = { value: undefined };
const Hlt = { value: undefined };
const Ar = { value: undefined };
const Br = { value: undefined };
const vt = { value: undefined };
const ot = { value: undefined };
const Yr = { value: undefined };
const Ie = { value: undefined };
</script>

<style>
/* 从原应用 CSS 恢复（data-v-b1f9f784） */
[data-v-b1f9f784]{padding-right:92px;position:relative}
[data-v-b1f9f784]{position:absolute;top:-20px;right:0}
</style>
