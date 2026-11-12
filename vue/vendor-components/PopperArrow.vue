<template>
<span ref="props => {
          x(n).onArrowChange(props ?? undefined);
        }" :style="ie({position:`absolute`,left:n.arrowX?.value?`${n.arrowX?.value}px`:undefined,top:n.arrowY?.value?`${n.arrowY?.value}px`:undefined,[r.value]:0,transformOrigin:{top:``,right:`0 0`,bottom:`center 0`,left:`100% 0`}[n.placedSide.value],transform:{top:`translateY(100%)`,right:`translateY(50%) rotate(90deg) translateX(-50%)`,bottom:`rotate(180deg)`,left:`translateY(50%) rotate(-90deg) translateX(50%)`}[n.placedSide.value],visibility:n.shouldHideArrow.value?`hidden`:undefined})"><span v-text="M(le,N(props.$attrs,{ref:t,style:{display:`block`},as:props.as,'as-child':props.asChild,rounded:props.rounded,width:props.width,height:props.height}),{default:D(()=>[S(props.$slots,`default`)]),_:3},16,[`as`,`as-child`,`rounded`,`width`,`height`])" /></span>
</template>

<script setup>
import { unref as x, renderSlot as S, createElementBlock as T, openBlock as A, computed as I } from 'vue';
// [符号说明] r=useConfigProviderContext
import { B as e, C as t, G as n, I as r, N as i, V as s, ut as _, xt as v } from '../vendor/ui/Switch.js';
// [符号说明] H=usePopperContentContext
import { r as H } from '../vendor/ui/PopperContent.js';

const props = defineProps({
  width: {
    type: Number,
    required: false
  },
  height: {
    type: Number,
    required: false
  },
  rounded: {
    type: Boolean,
    required: false
  },
  asChild: {
    type: Boolean,
    required: false
  },
  as: {
    type: null,
    required: false,
    default: `svg`
  }
});
var ue = {
  top: `bottom`,
  right: `left`,
  bottom: `top`,
  left: `right`
};
</script>
