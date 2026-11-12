<template>
<div ref="b" :class="`settings-theme-scope relative pb-6 pl-3 pr-7 pt-2`"><component :is="wt" enter-active-class="transition duration-300 ease-out" enter-from-class="opacity-0 translate-y-[-10px]" enter-to-class="opacity-100 translate-y-0" leave-active-class="transition duration-200 ease-in" leave-from-class="opacity-100 translate-y-0" leave-to-class="opacity-0 translate-y-[-10px]" /><div><aside><nav :aria-label="i(`settings.categoryNavigation`)" :class="`flex flex-col gap-1`"></nav></aside><main><div><span :class="[`text-xs`,_.value]">{{ g.value }}</span></div><component :is="xN" /><component :is="oL" /><component :is="GL" /><component :is="RB" /><component :is="MTe" /><component :is="QDe" /><component :is="ANe" /><component :is="YLe" /><component :is="IBe" /><component :is="KVe" /><component :is="AHe" /><component :is="lWe" /></main></div><component :is="SWe" /><component :is="gM" :open="f" @update:open="e=>$e(f)?f.value=e:null" @balancechanged="e=>d.value=e" /></div>
</template>

<script setup>
import gM from './RechargeDialog.vue';
import xN from './GeneralSettingsSection.vue';
import oL from './RecordingSettingsSection.vue';
import GL from './AppUsageSettingsSection.vue';
import RB from './PrivacySettingsSection.vue';
import MTe from './AiModelSettingsSection.vue';
import QDe from './RecognitionSettingsSection.vue';
import ANe from './ReportTodoSettingsSection.vue';
import YLe from './IntegrationSettingsSection.vue';
import IBe from './DataManagementSettingsSection.vue';
import KVe from './ToolsSettingsSection.vue';
import AHe from './ExperimentSettingsSection.vue';
import lWe from './AboutSettingsSection.vue';
import SWe from './MacPermissionCheckDialog.vue';
import { S_to as to, S_is as is, S_xs as xs, S_pb as pb, S_out as out, S_i as i, S_d as d, S_f as f, S_g as g, S__ as _, S_y as y, S_b as b, S_$e as $e, S_wt as wt, S_pr as pr } from '../shared.js';
const e = defineProps({
      refreshKey: {},
      focusTarget: {}
    });
const n = e;
</script>
