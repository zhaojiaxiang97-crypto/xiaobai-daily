<template>
<pre :class="[r?.value]" :aria-busy="true===e.node.loading" :aria-label="i?.value" :data-language="n?.value" data-markstream-pre="1" tabindex="0"><code translate="no" :textContent="toDisplayString(e.node.code)"></code></pre>
</template>

<script setup>
import { toDisplayString } from 'vue';
import { S_no as no, S_pre as pre } from '../shared.js';
const e = defineProps({
      node: {}
    });
const t = e;

// [兜底] 模板引用但无来源的符号
const r = { value: undefined };
const i = { value: undefined };
const n = { value: undefined };
</script>
