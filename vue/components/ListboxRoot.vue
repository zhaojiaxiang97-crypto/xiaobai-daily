<template>
<component :is="fe" :ref="h" :as="event.as" :as-child="event.asChild" :dir="v" :data-disabled="u?``:undefined" @pointerleave="de" @focusout="async e=>{let t=e.relatedTarget||e.target;await ut(),D.value&&g&&!g.contains(t)&&de(e);}" />
</template>

<script setup>
// [符号说明] u=useConfigProviderContext, D=useConfigProviderContext, de~shallowRef
import { S_is as is, S_as as as, S_by as by, S_e as e, S_t as t, S_u as u, S_g as g, S_v as v, S_D as D, S_de as de, S_fe as fe, S_ut as ut } from '../shared.js';
</script>
