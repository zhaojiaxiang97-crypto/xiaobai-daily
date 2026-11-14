<template>
<div><section><div><h2><component :is="uo" :class="`size-4 text-primary`" />{{ a(s(`methodTitle`)) }}</h2><p>{{ a(s(`methodDesc`)) }}</p></div><div><p><component :is="zn" :class="`size-3.5 animate-spin`" />{{ a(s(`loadingTemplates`)) }}</p></div></section><section><h2><component :is="rn" :class="`size-4 text-primary`" />{{ a(s(`frequencyTitle`)) }}</h2><p>{{ a(s(`frequencyDesc`)) }}</p><div :class="`mt-3 grid grid-cols-1 gap-2 sm:grid-cols-3`" role="radiogroup" :aria-label="a(s(`frequencyTitle`))"></div><p>{{ C?.value }}</p><p><component :is="sr" :class="`mt-1 size-3 shrink-0`" />{{ a(s(`estimateNote`)) }}</p></section><p>{{ a(s(`moreSettingsHint`)) }}</p><footer><component :is="P" variant="ghost" :class="`h-9 cursor-pointer gap-1.5 px-3`" :disabled="!!v" @click="e=>i(`back`)" /><div><p>{{ y }}</p><component :is="P" variant="outline" :class="`h-9 cursor-pointer gap-2 px-4`" :disabled="!x" @click="e=>E(true)" /><component :is="P" :class="`h-9 cursor-pointer gap-2 px-4`" :disabled="!x" data-testid="onboarding-recording-start" @click="e=>E(false)" /></div></footer><component :is="gh" :open="g" @update:open="e=>g=e" :templates="c" :selected-id="m" @select="T" /></div>
</template>

<script setup>
import gh from './OnboardingTemplatePicker.vue';

// [兜底] 模板引用但无来源的符号
import { S_uo as uo, S_is as is, S_sm as sm, S_px as px, S_h2 as h2, S_e as e, S_i as i, S_a as a, S_s as s, S_c as c, S_p as p, S_P as P, S_mt as mt, S_rn as rn, S_zn as zn, S_sr as sr } from '../shared.js';
const C = { value: undefined };
import { ref, computed } from 'vue';

// [setup 还原] 原组件 setup 里初值不依赖 IPC 的声明
let m = ref(``);
let h = ref(false);
let g = ref(false);
let v = ref(null);
let y = ref(``);
let x = computed(() => h.value && !v.value);
function T(e) {
  m.value = e, _.value = false;
}
async function E(e) {
  if (x.value) {
    v.value = e ? `settings` : `start`, y.value = ``;
    try {
      let value = b.value;
      if (!(await f({
        ...(value ? {
          activeScreenshotPromptTemplateId: value.id,
          activeScreenshotPromptContent: value.content
        } : {}),
        screenshotIntervalSeconds: r.value,
        enableRecording: true,
        recordingAuthorizationPending: false,
        promptPreferenceOnboardingUserId: 0
      }))) {
        y.value = p.value || a(`promptOnboarding.saveFailed`);
        return;
      }
      i(e ? `open-settings` : `complete`);
    } catch (e) {
      y.value = e instanceof Error ? e.message : a(`promptOnboarding.saveFailed`);
    } finally {
      v.value = null;
    }
  }
}
</script>
