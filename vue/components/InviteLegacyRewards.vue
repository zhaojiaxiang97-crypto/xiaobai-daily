<template>
<div :class="`flex justify-between gap-3 text-xs`"><span>{{ toDisplayString(e.date)+` · `+toDisplayString(e.type===`convert`?o?.value?`Converted`:`转积分`:e.status===`paid`?o?.value?`Paid`:`已打款`:o?.value?`Processing`:`处理中`) }}</span><strong>{{ `¥`+toDisplayString(e.amount.toFixed(2)) }}<span>{{ ` → `+toDisplayString(e.creditsAmount?.toLocaleString())+` `+toDisplayString(o?.value?`credits`:`积分`) }}</span></strong></div>
</template>

<script setup>
import { toDisplayString } from 'vue';
import { S_xs as xs } from '../shared.js';
const e = defineProps({
      token: {}
    });
const n = e;

// [兜底] 模板引用但无来源的符号
const o = { value: undefined };
</script>
