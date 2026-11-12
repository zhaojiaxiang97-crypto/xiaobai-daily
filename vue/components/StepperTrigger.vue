<template>
<component :is="fe" :ref="s" :type="e.as===`button`?`button`:undefined" :as="e.as" :as-child="e.asChild" :data-state="n.state.value" :disabled="n.disabled.value||!n.isFocusable.value?``:undefined" :data-disabled="n.disabled.value||!n.isFocusable.value?``:undefined" :data-orientation="t.orientation.value" :tabindex="n.isFocusable.value?0:-1" :aria-describedby="n.descriptionId" :aria-labelledby="n.titleId" @mousedown="withDirectives(a,[`left`])" @keydown="xt(o,[`enter`,`space`,`left`,`right`,`up`,`down`])" />
</template>

<script setup>
import { withDirectives } from 'vue';
// [符号说明] n~computed
import { S_is as is, S_as as as, S_up as up, S_state as state, S_e as e, S_t as t, S_n as n, S_a as a, S_o as o, S_s as s, S_fe as fe, S_xt as xt } from '../shared.js';
</script>
