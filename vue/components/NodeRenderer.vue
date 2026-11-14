<template>
<div data-v-790646ac ref="t => function (e, t) {
          e < 1 || e > 6 || (c[e] = t);
        }(e, t)" :class="`node-content`" :data-probe="`heading-${e}`"><component :is="OZ" :node="rt(e)" :index-key="`probe-heading-${e}`" /></div>
</template>

<script setup>
import __ca_OZ from './HeadingNode.vue';
import { S_is as is, S_e as e, S_t as t, S_c as c } from '../shared.js';
const OZ = __ca_OZ;

// [兜底] 模板引用但无来源的符号
const rt = () => undefined;
</script>

<style>
/* 从原应用 CSS 恢复（data-v-790646ac） */
[data-v-790646ac]{contain:layout;content-visibility:auto;contain-intrinsic-size:800px 600px;position:relative}
[data-v-790646ac]{content-visibility:visible;contain-intrinsic-size:auto}
[data-v-790646ac]{visibility:hidden;pointer-events:none;z-index:-1;position:absolute;top:0;left:-100000px;overflow:hidden}
[data-v-790646ac],.node-content[data-v-790646ac]{width:100%}
[data-v-790646ac]{border-radius:var(--ms-radius);background-image:linear-gradient(90deg,var(--loading-shimmer),transparent,var(--loading-shimmer));background-size:200% 100%;width:100%;min-height:1rem;margin:.25rem 0;animation:1.1s ease-in-out infinite node-placeholder-shimmer-790646ac}
[data-v-790646ac]:first-child{margin-top:0}
[data-v-790646ac]{width:100%}
[data-v-790646ac]{color:hsl(var(--ms-muted-foreground));margin:var(--ms-flow-paragraph-y) 0;font-style:italic}
</style>
