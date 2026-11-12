<template>
<component :is="fe" :ref="o" :as="e.as" :as-child="e.asChild" :value="i" :disabled="c.value?``:undefined" :data-disabled="c.value?``:undefined" :aria-disabled="c.value??undefined" :aria-activedescendant="state.value" type="text" @keydown="xt(_,[`down`,`up`,`home`,`end`])" @input="g" @compositionstart="h" @compositionupdate="p" @compositionend="m" />
</template>

<script setup>
import { S_is as is, S_as as as, S_up as up, S_state as state, S_e as e, S_i as i, S_o as o, S_c as c, S_p as p, S_m as m, S_g as g, S__ as _, S_fe as fe, S_xt as xt } from '../shared.js';
</script>
