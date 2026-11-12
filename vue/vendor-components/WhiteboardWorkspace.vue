<template>
<main><section ref="k" :class="`absolute inset-0 touch-none overflow-hidden bg-background bg-[radial-gradient(circle,color-mix(in_srgb,var(--muted-foreground)_24%,transparent)_1px,transparent_1.15px)]`" :style="_({backgroundPosition:`${P.x}px ${P.y}px`,backgroundSize:`${24*N.value}px ${24*N.value}px`})" :aria-label="handler(`CanvasAriaLabel`)" @wheel="vi"><canvas ref="A" :class="`absolute inset-0 size-full touch-none select-none dark:hue-rotate-180 dark:invert-[.9]`" :style="_({cursor:Dr.value})" @pointerdown="fi" @pointermove="pi" @pointerup="mi" @pointercancel="mi" @pointerenter="hi" @pointerleave="gi" @dblclick="Yr" @contextmenu="S(()=>{},[`prevent`])"></canvas><span v-text="z.open?ee((h(),d_16(`textarea`,{key:0,ref_key:`textInputRef`,ref:Gn,'onUpdate:modelValue':r_4[1]||=e=>z.value=e,class:`absolute z-[16] m-0 cursor-text resize-none overflow-hidden rounded-[2px] border border-dashed border-current/65 bg-white/10 px-1 py-[3px] font-medium shadow-none outline-none [caret-color:currentColor] [font-family:'PingFang_SC','Microsoft_YaHei',sans-serif] dark:bg-black/15`,style:_(K.value),'aria-label':handler(`TextInputAriaLabel`),wrap:`off`,onKeydown:ei,onBlur:$,onPointerdown:r_4[2]||=S(()=>{},[`stop`])},null,44,Ke)),[[ce,z.value]]):undefined" /><div :class="`pointer-events-none absolute z-[17]`" :style="_(Er.value)" :aria-label="handler(`EditingTextAriaLabel`)"></div><div :class="`pointer-events-none absolute z-[17] border border-dashed border-primary`" :style="_(kr.value)" aria-hidden="true"></div><div :class="`pointer-events-none absolute z-[12] size-0 text-gray-800 will-change-[left,top] dark:text-gray-100`" :style="_({left:`${F.x}px`,top:`${F.y}px`})" aria-hidden="true"><span :class="[`absolute -bottom-px -left-0.5 grid origin-bottom-left place-items-center dark:drop-shadow-[0_0_1px_rgb(255_255_255/0.95)]`,{'dark:!text-white':M.value===sn[0]}]" :style="_({color:M.value,transform:`scale(${Math.min(1.25,.68+Xn.value/20)})`})"><span v-text="g(t_1_2,{size:17,'stroke-width':1.9})" /></span></div><div><strong>{{ handler(`StartDrawing`) }}</strong><p>{{ handler(`StartDrawingDescription`) }}</p></div></section><aside :class="`absolute z-[32] flex min-h-[42px] min-w-[130px] items-center rounded-[10px] border border-border bg-card p-1 shadow-[0_8px_24px_rgb(20_28_23/0.10)] animate-in fade-in-0 slide-in-from-bottom-1`" :style="_(or)" :aria-label="B.value===`pen`?handler(`PenSize`):B.value===`eraser`?handler(`EraserSize`):handler(`Text`)"><div></div></aside><aside :class="`absolute z-[32] w-[326px] max-w-[calc(100%-20px)] rounded-[10px] border border-border bg-card p-1 shadow-[0_8px_24px_rgb(20_28_23/0.10)] animate-in fade-in-0 slide-in-from-bottom-1`" :style="_(or)" :aria-label="handler(`ChooseShape`)"><div></div></aside><span v-text="g(le,{'enter-active-class':`origin-left transition duration-200 ease-[cubic-bezier(.22,1,.36,1)]`,'leave-active-class':`origin-left transition duration-200 ease-[cubic-bezier(.22,1,.36,1)]`,'enter-from-class':`-translate-x-4 scale-x-[.96] opacity-0`,'leave-to-class':`-translate-x-4 scale-x-[.96] opacity-0`},{default:p(()=>[V.value?(h(),d_16(`footer`,{key:0,class:`no-scrollbar absolute bottom-2.5 left-[66px] z-20 flex h-[46px] w-max max-w-[calc(100%-78px)] items-center overflow-x-auto rounded-[10px] border border-border bg-card px-1.5 shadow-[0_8px_24px_rgb(20_28_23/0.10)]`,'aria-label':handler(`Toolbar`)},[x(`div`,st,[x(`button`,{type:`button`,class:`grid size-[27px] place-items-center rounded-lg hover:bg-primary/10 hover:text-primary`,'aria-label':handler(`ZoomOut`),onClick:r_4[3]||=e=>{B.value=null,_i(N.value-.1);}},[g(Ue,{size:16})],8,ct),x(`span`,lt,v(Tr.value),1),x(`button`,{type:`button`,class:`grid size-[27px] place-items-center rounded-lg hover:bg-primary/10 hover:text-primary`,'aria-label':handler(`ZoomIn`),onClick:r_4[4]||=e=>{B.value=null,_i(N.value+.1);}},[g(He,{size:16})],8,ut)]),r_4[16]||=x(`div`,{class:`mx-[5px] h-[22px] w-px shrink-0 bg-border`},null,-1),x(`div`,{class:`flex shrink-0 items-center gap-[7px]`,'aria-label':handler(`PenColor`)},[(h(),d_16(ne,null,f_17(sn,e=>x(`button`,{key:e,type:`button`,class:s_8_12([`relative grid size-[17px] place-items-center rounded-full border transition-transform hover:scale-110`,[e===`#ffffff`?`border-[#cfd4d1] dark:border-[#69716c]`:`border-transparent`,M.value===e?`outline-2 outline-offset-1 hover:scale-100`:``,M.value===e&&(e===`#ffffff`||e===`#171717`)?`dark:!outline-white`:``]]),style:_({backgroundColor:e,outlineColor:M.value===e?e===`#ffffff`?`#171717`:e:undefined}),'aria-label':handler(`ChooseColor`,{color:e}),onClick:t_1_2=>Br(e)},null,14,ft)),64))],8,dt),r_4[17]||=x(`div`,{class:`mx-[5px] h-[22px] w-px shrink-0 bg-border`},null,-1),x(`div`,pt,[x(`button`,{ref_key:`penToolRef`,ref:Kn,class:s_8_12(q(j.value===`pen`)),type:`button`,title:`${handler(`Pen`)} P`,'aria-label':handler(`Pen`),onClick:r_4[5]||=S(e=>Q(`pen`),[`stop`])},[g(ge,{size:19})],10,mt),x(`button`,{ref_key:`eraserToolRef`,ref:qn,class:s_8_12(q(j.value===`eraser`)),type:`button`,title:`${handler(`Eraser`)} E`,'aria-label':handler(`Eraser`),onClick:r_4[6]||=S(e=>Q(`eraser`),[`stop`])},[g(Le,{size:19})],10,ht),x(`button`,{ref_key:`shapeToolRef`,ref:Jn,class:s_8_12(q(j.value===`shape`)),type:`button`,title:`${handler(`Shape`)} S`,'aria-label':handler(`Shape`),onClick:r_4[7]||=S(e=>Q(`shape`),[`stop`])},[g(ze,{size:19})],10,gt),x(`button`,{ref_key:`textToolRef`,ref:Yn,class:s_8_12(q(j.value===`text`)),type:`button`,title:`${handler(`Text`)} T`,'aria-label':handler(`Text`),onClick:r_4[8]||=S(e=>Q(`text`),[`stop`])},[g(e,{size:19})],10,_t),x(`button`,{class:s_8_12(q(j.value===`select`)),type:`button`,title:`${handler(`Select`)} V`,'aria-label':handler(`Select`),onClick:r_4[9]||=S(e=>Q(`select`),[`stop`])},[g(Fe,{size:19})],10,vt)]),r_4[18]||=x(`div`,{class:`mx-[5px] h-[22px] w-px shrink-0 bg-border`},null,-1),x(`div`,yt,[x(`button`,{class:s_8_12(q(false)),type:`button`,title:`${handler(`Undo`)} Ctrl+Z`,'aria-label':handler(`Undo`),disabled:!H[O.value.id]?.length,onClick:r_4[10]||=e=>{B.value=null,Ir();}},[g(he,{size:18})],10,bt),x(`button`,{class:s_8_12(q(false)),type:`button`,title:handler(`ClearBoard`),'aria-label':handler(`ClearBoard`),onClick:r_4[11]||=e=>{B.value=null,Rr();}},[g(o_7_11,{size:18})],10,xt),L.value.length?(h(),d_16(`button`,{key:0,class:s_8_12(q(false)),type:`button`,title:`${handler(`DeleteSelected`)} Delete`,'aria-label':handler(`DeleteSelected`),onClick:r_4[12]||=e=>{B.value=null,yi();}},[g(o_7_11,{size:18})],10,St)):b(``,true),x(`button`,{class:s_8_12(q(fr.value)),type:`button`,title:handler(`Help`),'aria-label':handler(`Help`),onClick:r_4[13]||=e=>{B.value=null,fr.value=!fr.value;}},[g(fe,{size:18})],10,Ct)])],8,ot)):b(``,true)]),_:1})" /><button :class="`absolute bottom-2.5 left-3 z-[24] grid size-[46px] place-items-center rounded-full bg-primary text-primary-foreground shadow-[0_8px_20px_rgb(22_163_74/0.26)] transition-[transform,background-color] hover:-translate-x-px hover:bg-primary/90 active:scale-[.96]`" type="button" :aria-label="V.value?handler(`CollapseToolbar`):handler(`ExpandToolbar`)" :aria-expanded="V.value" :title="handler(`Toolbar`)" @click="Hr"><component :is="ue" :size="18" :stroke-width="2" /></button><aside><div><strong>{{ handler(`QuickStart`) }}</strong><span>{{ handler(`DesktopShortcuts`) }}</span></div><div><p><span><span v-text="g(me,{size:16})" />{{ handler(`MoveCanvas`) }}</span><span><span v-text="g(w,null,{default:p(()=>[...(r_4[19]||=[u_15(`Ctrl`,-1)])]),_:1})" /><span :class="`relative block h-[27px] w-5 overflow-hidden rounded-[9px_9px_8px_8px] border border-b-2 border-border bg-muted before:absolute before:inset-x-0 before:top-[9px] before:h-px before:bg-border before:content-[''] after:absolute after:left-1/2 after:top-0 after:h-[9px] after:w-px after:bg-border after:content-['']`" role="img" :aria-label="handler(`LeftMouseButton`)"></span></span></p><p><span><span v-text="g(He,{size:16})" />{{ handler(`ZoomCanvas`) }}</span><span><span v-text="g(w,null,{default:p(()=>[...(r_4[22]||=[u_15(`Ctrl`,-1)])]),_:1})" /><span v-text="g(w,null,{default:p(()=>[u_15(v(handler(`MouseWheel`)),1)]),_:1})" /></span></p><p><span><span v-text="g(me,{size:16})" />{{ handler(`HorizontalScroll`) }}</span><span><span v-text="g(w,null,{default:p(()=>[...(r_4[24]||=[u_15(`Shift`,-1)])]),_:1})" /><span v-text="g(w,null,{default:p(()=>[u_15(v(handler(`MouseWheel`)),1)]),_:1})" /></span></p><p><span><span v-text="g(he,{size:16})" />{{ handler(`Undo`) }}</span><span><span v-text="g(w,null,{default:p(()=>[...(r_4[26]||=[u_15(`Ctrl`,-1)])]),_:1})" /><span v-text="g(w,null,{default:p(()=>[...(r_4[27]||=[u_15(`Z`,-1)])]),_:1})" /></span></p></div></aside><span v-text="g(ve,{open:sr.value,'onUpdate:open':r_4[14]||=e=>{e||Ei();}},{default:p(()=>[g(ye,{class:`sm:max-w-[420px]`},{default:p(()=>[g(be,{class:`flex-row items-center gap-[11px] pr-8`},{default:p(()=>[x(`span`,Wt,[g(pe,{size:20})]),x(`div`,Gt,[g(xe,{class:`text-base font-semibold`},{default:p(()=>[u_15(v(handler(`SaveAsImage`)),1)]),_:1}),g(Ne,{class:`mt-1 text-sm`},{default:p(()=>[u_15(v(handler(`SaveAsDescription`)),1)]),_:1})])]),_:1}),x(`div`,Kt,[(h(),d_16(ne,null,f_17(dn,e=>x(`button`,{key:e.value,type:`button`,class:`flex flex-col gap-[9px] rounded-[10px] border border-border bg-card p-2.5 text-left transition-[border-color,background-color,transform] hover:-translate-y-px hover:border-primary/50 hover:bg-primary/[0.04]`,onClick:t_1_2=>Ti(e.value)},[x(`span`,{class:s_8_12([`relative h-[76px] w-full overflow-hidden rounded-[9px] border border-black/10`,e.previewClass])},[...(r_4[29]||=[x(`i_5_9`,{class:`absolute left-[26%] top-[48%] h-[3px] w-[48%] -rotate-[8deg] rounded-full bg-[#1d2420]`},null,-1),x(`i_5_9`,{class:`absolute left-[56%] top-[36%] h-[3px] w-[17%] rotate-[40deg] rounded-full bg-[#1d2420]`},null,-1)])],2),x(`span`,Jt,[x(`strong`,Yt,v(handler(e.title)),1),x(`small`,Xt,v(handler(e.description)),1)])],8,qt)),64))])]),_:1})]),_:1},8,[`open`])" /><span v-text="g(Ce,{open:cr.value,'onUpdate:open':Ni},{default:p(()=>[g(Se,null,{default:p(()=>[g(Te,null,{default:p(()=>[g(De,null,{default:p(()=>[u_15(v(handler(`UnsavedTitle`)),1)]),_:1}),g(we,null,{default:p(()=>[u_15(v(handler(`UnsavedDescription`)),1)]),_:1})]),_:1}),g(Ee,null,{default:p(()=>[g(a_6_10,{variant:`outline`,onClick:Mi},{default:p(()=>[u_15(v(handler(`Cancel`)),1)]),_:1}),g(a_6_10,{variant:`destructive`,onClick:ji},{default:p(()=>[u_15(v(handler(`DiscardAndLeave`)),1)]),_:1}),g(a_6_10,{onClick:Ai},{default:p(()=>[u_15(v(handler(`SaveAndLeave`)),1)]),_:1})]),_:1})]),_:1})]),_:1},8,[`open`])" /></main>
</template>

<script setup>
import { h, normalizeClass as s, unref as c, createTextVNode as u, createElementBlock as d, renderList as f, createBlock as te, Fragment as ne, defineComponent as re, onMounted as ie, toDisplayString as v, onBeforeMount as oe, computed as y, createCommentVNode as b, createElementVNode as x } from 'vue';
import { Ct as e, Ot as t, jt as r, kt as i, r as a, wt as o } from '../vendor/ui/Switch.js';
import { C as ce, E as S, r as le } from '../vendor/i18n/en-US-player.js';
import { r as C, t as ue } from '../vendor/ui/icons/lucide-icons.js';
import { t as de } from '../vendor/i18n/i18n-helper.js';
import { t as fe } from '../vendor/chunks/circle-question-mark.js';
import { t as pe } from '../vendor/chunks/image-down.js';
import { n as me, t as he } from '../vendor/chunks/undo-2.js';
import { t as ge } from '../vendor/chunks/pen-line.js';
import { t as _e } from '../vendor/pages/ToolboxWorkspaceHeader.js';
import { a as ve, i as ye, n as be, t as xe } from '../vendor/chunks/dialog.js';
import { a as Se, c as Ce, i as we, n as Te, r as Ee, t as De } from '../vendor/ui/alert-dialog.js';
import { n as Oe } from '../vendor/chunks/alert.js';
import { t as ke } from '../vendor/chunks/useGrowthTelemetry.js';
import { In as Ae, On as je, bn as Me, gn as Ne } from '../vendor/chunks/main.js';
import { t as Pe } from '../vendor/chunks/toolbox-local.js';
import { t as w } from '../vendor/ui/Kbd.js';

var Fe = C(`circle-dashed`, [[`path`, {
  d: `M10.1 2.182a10 10 0 0 1 3.8 0`,
  key: `5ilxe3`
}], [`path`, {
  d: `M13.9 21.818a10 10 0 0 1-3.8 0`,
  key: `11zvb9`
}], [`path`, {
  d: `M17.609 3.721a10 10 0 0 1 2.69 2.7`,
  key: `1iw5b2`
}], [`path`, {
  d: `M2.182 13.9a10 10 0 0 1 0-3.8`,
  key: `c0bmvh`
}], [`path`, {
  d: `M20.279 17.609a10 10 0 0 1-2.7 2.69`,
  key: `1ruxm7`
}], [`path`, {
  d: `M21.818 10.1a10 10 0 0 1 0 3.8`,
  key: `qkgqxc`
}], [`path`, {
  d: `M3.721 6.391a10 10 0 0 1 2.7-2.69`,
  key: `1mcia2`
}], [`path`, {
  d: `M6.391 20.279a10 10 0 0 1-2.69-2.7`,
  key: `1fvljs`
}]]);
var Ie = C(`diamond`, [[`path`, {
  d: `M2.7 10.3a2.41 2.41 0 0 0 0 3.41l7.59 7.59a2.41 2.41 0 0 0 3.41 0l7.59-7.59a2.41 2.41 0 0 0 0-3.41l-7.59-7.59a2.41 2.41 0 0 0-3.41 0Z`,
  key: `1f1r0c`
}]]);
var Le = C(`eraser`, [[`path`, {
  d: `M21 21H8a2 2 0 0 1-1.42-.587l-3.994-3.999a2 2 0 0 1 0-2.828l10-10a2 2 0 0 1 2.829 0l5.999 6a2 2 0 0 1 0 2.828L12.834 21`,
  key: `g5wo59`
}], [`path`, {
  d: `m5.082 11.09 8.828 8.828`,
  key: `1wx5vj`
}]]);
var Re = C(`pentagon`, [[`path`, {
  d: `M10.83 2.38a2 2 0 0 1 2.34 0l8 5.74a2 2 0 0 1 .73 2.25l-3.04 9.26a2 2 0 0 1-1.9 1.37H7.04a2 2 0 0 1-1.9-1.37L2.1 10.37a2 2 0 0 1 .73-2.25z`,
  key: `2hea0t`
}]]);
var ze = C(`shapes`, [[`path`, {
  d: `M8.3 10a.7.7 0 0 1-.626-1.079L11.4 3a.7.7 0 0 1 1.198-.043L16.3 8.9a.7.7 0 0 1-.572 1.1Z`,
  key: `1bo67w`
}], [`rect`, {
  x: `3`,
  y: `14`,
  width: `7`,
  height: `7`,
  rx: `1`,
  key: `1bkyp8`
}], [`circle`, {
  cx: `17.5`,
  cy: `17.5`,
  r: `3.5`,
  key: `w3z12y`
}]]);
var Be = C(`spline`, [[`circle`, {
  cx: `19`,
  cy: `5`,
  r: `2`,
  key: `mhkx31`
}], [`circle`, {
  cx: `5`,
  cy: `19`,
  r: `2`,
  key: `v8kfzx`
}], [`path`, {
  d: `M5 17A12 12 0 0 1 17 5`,
  key: `1okkup`
}]]);
var Ve = C(`triangle`, [[`path`, {
  d: `M13.73 4a2 2 0 0 0-3.46 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z`,
  key: `14u9p9`
}]]);
var He = C(`zoom-in`, [[`circle`, {
  cx: `11`,
  cy: `11`,
  r: `8`,
  key: `4ej97u`
}], [`line`, {
  x1: `21`,
  x2: `16.65`,
  y1: `21`,
  y2: `16.65`,
  key: `13gj7c`
}], [`line`, {
  x1: `11`,
  x2: `11`,
  y1: `8`,
  y2: `14`,
  key: `1vmskp`
}], [`line`, {
  x1: `8`,
  x2: `14`,
  y1: `11`,
  y2: `11`,
  key: `durymu`
}]]);
var Ue = C(`zoom-out`, [[`circle`, {
  cx: `11`,
  cy: `11`,
  r: `8`,
  key: `4ej97u`
}], [`line`, {
  x1: `21`,
  x2: `16.65`,
  y1: `21`,
  y2: `16.65`,
  key: `13gj7c`
}], [`line`, {
  x1: `8`,
  x2: `14`,
  y1: `11`,
  y2: `11`,
  key: `durymu`
}]]);
var We = {
  "data-whiteboard-shell": ``,
  class: `relative h-0 min-h-0 w-full flex-1 overflow-hidden bg-background text-sm text-foreground`
};
var Ge = [`aria-label`];
var Ke = [`aria-label`];
var qe = [`aria-label`];
var Je = [`aria-label`, `onPointerdown`];
var Ye = [`onPointerdown`];
var Xe = {
  key: 4,
  class: `pointer-events-none absolute left-1/2 top-[47%] flex -translate-x-1/2 -translate-y-1/2 flex-col items-center text-center opacity-80`,
  "aria-hidden": `true`
};
var Ze = {
  class: `text-sm font-semibold leading-snug text-muted-foreground`
};
var Qe = {
  class: `mt-1.5 max-w-[260px] text-xs leading-relaxed text-muted-foreground/80`
};
var $e = [`aria-label`];
var et = {
  class: `flex items-center gap-0.5`
};
var tt = [`aria-label`, `onClick`];
var nt = {
  class: `grid size-6 place-items-center`
};
var rt = [`aria-label`];
var it = {
  class: `grid grid-cols-[repeat(10,minmax(28px,1fr))] gap-0.5`
};
var at = [`title`, `onClick`];
var ot = [`aria-label`];
var st = {
  class: `flex h-[34px] shrink-0 items-center gap-0.5`
};
var ct = [`aria-label`];
var lt = {
  class: `w-12 text-center text-xs font-semibold leading-none tabular-nums text-muted-foreground`
};
var ut = [`aria-label`];
var dt = [`aria-label`];
var ft = [`aria-label`, `onClick`];
var pt = {
  class: `flex shrink-0 items-center`
};
var mt = [`title`, `aria-label`];
var ht = [`title`, `aria-label`];
var gt = [`title`, `aria-label`];
var _t = [`title`, `aria-label`];
var vt = [`title`, `aria-label`];
var yt = {
  class: `flex shrink-0 items-center`
};
var bt = [`title`, `aria-label`, `disabled`];
var xt = [`title`, `aria-label`];
var St = [`title`, `aria-label`];
var Ct = [`title`, `aria-label`];
var wt = [`aria-label`, `aria-expanded`, `title`];
var Tt = {
  key: 2,
  class: `absolute bottom-[82px] right-[82px] z-40 w-[286px] max-w-[calc(100%-16px)] rounded-[10px] border border-border bg-card p-[18px] shadow-[0_12px_32px_rgb(20_28_23/0.14)] animate-in fade-in-0 slide-in-from-bottom-2`
};
var Et = {
  class: `flex flex-col items-start gap-0.5 border-b border-border px-0.5 pb-[11px]`
};
var Dt = {
  class: `text-sm font-semibold leading-snug`
};
var Ot = {
  class: `text-xs text-muted-foreground`
};
var kt = {
  class: `pt-2 text-xs text-muted-foreground`
};
var At = {
  class: `flex items-center gap-2`
};
var jt = {
  class: `flex items-center justify-between border-b border-border/60 px-0.5 py-[9px]`
};
var Mt = {
  class: `flex items-center gap-2`
};
var Nt = {
  class: `flex items-center gap-1`
};
var Pt = [`aria-label`];
var Ft = {
  class: `flex items-center justify-between border-b border-border/60 px-0.5 py-[9px]`
};
var It = {
  class: `flex items-center gap-2`
};
var Lt = {
  class: `flex items-center gap-1`
};
var Rt = {
  class: `flex items-center justify-between border-b border-border/60 px-0.5 py-[9px]`
};
var zt = {
  class: `flex items-center gap-2`
};
var Bt = {
  class: `flex items-center gap-1`
};
var Vt = {
  class: `flex items-center justify-between px-0.5 py-[9px]`
};
var Ht = {
  class: `flex items-center gap-2`
};
var Ut = {
  class: `flex items-center gap-1`
};
var Wt = {
  class: `grid size-[38px] shrink-0 place-items-center rounded-[10px] bg-primary/10 text-primary`
};
var Gt = {
  class: `min-w-0`
};
var Kt = {
  class: `grid grid-cols-2 gap-2.5`
};
var qt = [`onClick`];
var Jt = {
  class: `flex flex-col gap-[3px]`
};
var Yt = {
  class: `text-sm font-semibold leading-snug`
};
var Xt = {
  class: `text-xs leading-normal text-muted-foreground`
};
var Zt = `"PingFang SC", "Microsoft YaHei", sans-serif`;
var Qt = 12;
var $t = 72;
var en = 2;
let {
    captureGrowthObservation: _e_0
  } = ke(),
  {
    locale: tn,
    t: nn
  } = de(),
  handler = (row, el = {}) => nn(`toolboxNative.whiteboard${row}`, el);
let t_1 = window.atob(String(e || ``).split(`,`)[1] || ``),
  items = new Uint8Array(t_1.length);
let on = {
    async openBoard() {
      let whiteboard = await Pe.openWhiteboard(tn?.value === `en-US` ? `en-US` : `zh-CN`);
      return whiteboard.cancelled || !whiteboard.content ? {
        canceled: true
      } : {
        canceled: false,
        imageDataUrl: whiteboard.content,
        fileName: whiteboard.fileName,
        filePath: whiteboard.filePath
      };
    },
    async saveBoard(options) {
      let t_1_2 = options?.mode === `image`,
        n_3 = t_1_2 ? rn(options.pngDataUrl) : new TextEncoder().encode(JSON.stringify(options.board)).buffer,
        r_4 = t_1_2 ? `png` : `whiteboard`,
        i_5_9 = options?.name || handler(`UntitledBoard`),
        a_6_10 = an(),
        o_7_11 = options?.filePath ? `${i_5_9}.${r_4}` : options?.openedImageFile ? `${i_5_9}_${a_6_10}.${r_4}` : `XHDW${a_6_10}.${r_4}`,
        s_8_12 = await Pe.saveFile({
          kind: t_1_2 ? `png` : `whiteboard`,
          suggestedName: o_7_11,
          data: n_3,
          filePath: options?.filePath || undefined,
          locale: tn?.value === `en-US` ? `en-US` : `zh-CN`
        });
      return {
        canceled: s_8_12.cancelled,
        type: t_1_2 ? `image` : `board`,
        filePath: s_8_12.filePath
      };
    }
  },
  sn = [`#171717`, `#ffffff`, `#ef4444`, `#f97316`, `#eab308`, `#16a34a`, `#06b6d4`, `#2563eb`, `#7c3aed`, `#db2777`],
  cn = [`top-left`, `top-right`, `bottom-left`, `bottom-right`],
  options = {
    "top-left": `-left-[5px] -top-[5px] cursor-nwse-resize`,
    "top-right": `-right-[5px] -top-[5px] cursor-nesw-resize`,
    "bottom-left": `-bottom-[5px] -left-[5px] cursor-nesw-resize`,
    "bottom-right": `-bottom-[5px] -right-[5px] cursor-nwse-resize`
  },
  un = [{
    key: `P`,
    label: `Draw`,
    icon: ge
  }, {
    key: `E`,
    label: `EraseElements`,
    icon: Le
  }, {
    key: `S`,
    label: `DrawShapes`,
    icon: ze
  }, {
    key: `T`,
    label: `AddText`,
    icon: e
  }, {
    key: `V`,
    label: `SelectContent`,
    icon: me
  }],
  dn = [{
    value: `board`,
    title: `ExportBoardBackground`,
    description: `ExportBoardBackgroundDescription`,
    previewClass: `bg-[#fcfdfc] bg-[radial-gradient(circle,rgba(110,142,122,.28)_1px,transparent_1.15px)] bg-[length:14px_14px]`
  }, {
    value: `white`,
    title: `ExportWhiteBackground`,
    description: `ExportWhiteBackgroundDescription`,
    previewClass: `bg-white`
  }],
  fn = new Map(),
  pn = null,
  mn = () => Math.random().toString(36).slice(2, 10),
  E = e => JSON.parse(JSON.stringify(e)),
  hn = e => ({
    id: mn(),
    name: handler(`BoardNumber`, {
      number: e
    }),
    strokes: []
  }),
  gn = () => ({
    pages: [hn(1)],
    pageIndex: 0
  });
let t_1_2 = options?.mode === `image`,
  n_3 = t_1_2 ? rn(options.pngDataUrl) : new TextEncoder().encode(JSON.stringify(options.board)).buffer,
  r_4 = t_1_2 ? `png` : `whiteboard`,
  i_5 = options?.name || handler(`UntitledBoard`),
  a_6 = an(),
  o_7 = options?.filePath ? `${i_5}.${r_4}` : options?.openedImageFile ? `${i_5}_${a_6}.${r_4}` : `XHDW${a_6}.${r_4}`,
  s_8 = await Pe.saveFile({
    kind: t_1_2 ? `png` : `whiteboard`,
    suggestedName: o_7,
    data: n_3,
    filePath: options?.filePath || undefined,
    locale: tn?.value === `en-US` ? `en-US` : `zh-CN`
  });
let i_5_9 = t_1.x - e.x,
  a_6_10 = t_1.y - e.y,
  o_7_11 = r_4.x - n_3.x,
  s_8_12 = r_4.y - n_3.y,
  c_13 = i_5_9 * s_8_12 - a_6_10 * o_7_11;
let l_14 = n_3.x - e.x,
  u_15 = n_3.y - e.y,
  d_16 = (l_14 * s_8 - u_15 * o_7) / c_13,
  f_17 = (l_14 * a_6 - u_15 * i_5) / c_13;
let Wn = Un(),
  O = y(() => Hn.value.pages[Hn.value.pageIndex]),
  k = m(null),
  A = m(null),
  Gn = m(null),
  Kn = m(null),
  qn = m(null),
  Jn = m(null),
  Yn = m(null),
  j = m(null),
  M = m(`#171717`),
  Xn = m(4),
  Zn = m(28),
  Qn = m(24),
  $n = m(`line`),
  N = m(1),
  P = se({
    x: 0,
    y: 0
  }),
  F = se({
    visible: false,
    down: false,
    x: 0,
    y: 0
  }),
  I = m(null),
  er = m(false),
  L = m([]),
  tr = m(false),
  nr = m(false),
  rr = m(null),
  R = m(null),
  ir = m(null),
  z = se({
    open: false,
    value: ``,
    x: 0,
    y: 0,
    fontSize: 24
  }),
  ar = m(null),
  B = m(null),
  or = se({
    left: `12px`,
    bottom: `99px`,
    transform: `none`
  }),
  sr = m(false),
  cr = m(false),
  lr = m(null),
  ur = m(`white`),
  dr = m(false),
  fr = m(false),
  V = m(true),
  H = se({}),
  U = se({}),
  W = se({
    drawing: false,
    mode: null,
    last: null,
    start: null,
    historyRecorded: false,
    basePan: null,
    baseStrokes: null,
    dragIds: null,
    originalSelection: null
  }),
  pr,
  mr,
  hr = 0,
  gr = null,
  _r = null,
  vr = {
    x: 0,
    y: 0
  },
  yr = null,
  br = null,
  G = null,
  xr = null,
  Sr = y(() => [[`line`, handler(`ShapeLine`), i_5], [`curve`, handler(`ShapeCurve`), Be], [`ellipse`, handler(`ShapeEllipse`), r_4], [`rectangle`, handler(`ShapeRectangle`), n_3], [`triangle`, handler(`ShapeTriangle`), Ve], [`diamond`, handler(`ShapeDiamond`), Ie], [`pentagon`, handler(`ShapePentagon`), Re], [`star`, handler(`ShapeStar`), Me], [`speech`, handler(`ShapeSpeech`), je], [`cloud`, handler(`ShapeCloud`), Ae]]),
  Cr = y(() => B.value === `pen` ? [{
    value: 2,
    label: handler(`SizeThin`),
    previewSize: 4
  }, {
    value: 4,
    label: handler(`SizeMedium`),
    previewSize: 8
  }, {
    value: 8,
    label: handler(`SizeThick`),
    previewSize: 12
  }] : B.value === `text` ? [{
    value: 16,
    label: handler(`SizeSmall`),
    previewSize: 4
  }, {
    value: 24,
    label: handler(`SizeMedium`),
    previewSize: 8
  }, {
    value: 32,
    label: handler(`SizeLarge`),
    previewSize: 12
  }] : [{
    value: 16,
    label: handler(`SizeSmall`),
    previewSize: 10
  }, {
    value: 28,
    label: handler(`SizeMedium`),
    previewSize: 17
  }, {
    value: 48,
    label: handler(`SizeLarge`),
    previewSize: 24
  }]),
  wr = y(() => B.value === `pen` ? Xn.value : B.value === `text` ? Qn.value : Zn.value),
  Tr = y(() => `${Math.round(N.value * 100)}%`),
  K = y(() => {
    let fontSize = z.fontSize,
      t_1 = String(z.value || ``).split(`
`);
    pn ||= document.createElement(`canvas`).getContext(`2d`), pn.font = `500 ${fontSize}px ${Zt}`;
    let n_3 = z.value ? Math.max(...t_1.map(item => pn.measureText(item || ` `).width)) : 8,
      r_4 = z.x * N.value + P.x,
      i_5 = z.y * N.value + P.y,
      a_6 = Math.max(30, (k.value?.clientWidth || 520) - r_4 - 10),
      o_7 = Math.min(Math.max(30, n_3 * N.value + 12), a_6),
      s_8 = Math.max(32, t_1.length * fontSize * 1.4 * N.value + 8);
    return {
      left: `${r_4 - 5}px`,
      top: `${i_5 - 4}px`,
      width: `${o_7}px`,
      height: `${s_8}px`,
      color: M.value,
      fontSize: `${fontSize * N.value}px`,
      lineHeight: 1.4
    };
  }),
  Er = y(() => ({
    left: K.value.left,
    top: K.value.top,
    width: K.value.width,
    height: K.value.height,
    color: K.value.color
  })),
  Dr = y(() => {
    if (F.visible && [`pen`, `eraser`].includes(j.value)) return `none`;
    if (j.value === `pen`) return `crosshair`;
    if (j.value === `eraser`) return `cell`;
    if (j.value === `shape`) return W.mode === `move-shape` ? `grabbing` : rr.value ? `move` : `crosshair`;
    if (j.value === `text`) return z.open ? `default` : W.mode === `move-text` ? `grabbing` : ir.value ? `move` : `crosshair`;
    if (j.value === `select`) return nr.value ? `grabbing` : tr.value ? `move` : `default`;
  });
function q(e) {
  let t_1 = `flex h-[34px] min-w-[34px] items-center justify-center rounded-lg px-1 transition-[background-color,color,transform] disabled:cursor-default disabled:text-muted-foreground/40`;
  return e ? `${t_1} bg-primary/10 text-primary` : `${t_1} text-foreground hover:-translate-y-px hover:bg-primary/[0.06] disabled:hover:translate-y-0 disabled:hover:bg-transparent`;
}
let Or = y(() => O.value.strokes.find(item => item.id === R.value && item.kind === `shape`) || null),
  kr = y(() => {
    let value = Or.value;
    if (!value) return {};
    let t_1 = In(Mn(value)),
      n_3 = t_1.left * N.value + P.x,
      r_4 = t_1.top * N.value + P.y,
      i_5 = Math.max(8, (t_1.right - t_1.left) * N.value),
      a_6 = Math.max(8, (t_1.bottom - t_1.top) * N.value);
    return {
      left: `${n_3 - (i_5 === 8 ? 4 : 0)}px`,
      top: `${r_4 - (a_6 === 8 ? 4 : 0)}px`,
      width: `${i_5}px`,
      height: `${a_6}px`
    };
  });
let value = Or.value;
function Ir() {
  let e = O.value.id;
  H[e]?.length && (U[e] ||= [], U[e].push({
    strokes: E(O.value.strokes),
    backgroundImage: O.value.backgroundImage || null
  }), Fr(H[e].pop()), Z(), J());
}
function Rr() {
  let e = O.value.strokes.length > 0 || !!O.value.backgroundImage;
  (e || z.open) && (e && X(), Xr(), O.value.strokes = [], O.value.backgroundImage = null, R.value = null, jr() || (Wn = Un()), Z(), J(), Y(handler(`ClearedUndoAvailable`)));
}
function Z() {
  I.value = null, er.value = false, L.value = [], tr.value = false, J();
}
function Q(e) {
  if (j.value === e) {
    if ([`pen`, `eraser`, `shape`, `text`].includes(e)) {
      B.value = B.value === e ? null : e, B.value && ae(() => Vr(e));
      return;
    }
    zr();
    return;
  }
  z.open && $(), j.value = e, e !== `shape` && (R.value = null), B.value = [`pen`, `eraser`, `shape`, `text`].includes(e) ? e : null, e !== `select` && Z(), B.value && ae(() => Vr(e));
}
function Br(e) {
  M.value = e, B.value = null, z.open && requestAnimationFrame(() => Gn.value?.focus());
}
function Hr() {
  V.value = !V.value, !V.value && (B.value = null, fr.value = false);
}
function Yr(event) {
  if (j.value !== `text` || z.open) return;
  let t_1 = ti(ri(event));
  t_1 && (event.preventDefault(), event.stopPropagation(), Jr(t_1));
}
function $() {
  if (!z.open) return;
  let e = z.value.replace(/\r/g, ``).trim(),
    t_1 = {
      x: z.x,
      y: z.y
    },
    fontSize = z.fontSize,
    value = ar.value;
  yr = null, z.open = false, z.value = ``, ar.value = null, (e || value) && (X(), value ? O.value.strokes = O.value.strokes.flatMap(item => item.id === value ? e ? [{
    ...item,
    text: e,
    color: M.value,
    fontSize: fontSize,
    points: [t_1],
    offset: {
      x: 0,
      y: 0
    },
    clips: []
  }] : [] : [item]) : O.value.strokes.push({
    id: mn(),
    kind: `text`,
    text: e,
    color: M.value,
    fontSize: fontSize,
    width: 1,
    points: [t_1],
    offset: {
      x: 0,
      y: 0
    }
  }), J());
}
function ei(event) {
  if (event.stopPropagation(), event.key === `Escape`) {
    event.preventDefault(), Xr();
    return;
  }
  if (event.key === `Enter` && !event.isComposing) {
    event.preventDefault();
    let value = Gn.value,
      n_3 = value?.selectionStart ?? z.value.length,
      r_4 = value?.selectionEnd ?? n_3;
    z.value = `${z.value.slice(0, n_3)}\n${z.value.slice(r_4)}`, ae(() => {
      value?.focus(), value?.setSelectionRange(n_3 + 1, n_3 + 1);
    });
  }
}
function fi(event) {
  if (event.button !== 0) return;
  if (z.open) {
    $();
    return;
  }
  A.value.setPointerCapture(event.pointerId), F.down = true, F.visible = event.pointerType !== `touch`;
  let t_1 = ii(event),
    n_3 = ri(event);
  if (W.drawing = true, W.last = n_3, W.start = n_3, W.historyRecorded = false, event.ctrlKey) {
    W.mode = `pan`, W.start = t_1, W.basePan = {
      x: P.x,
      y: P.y
    };
    return;
  }
  if (j.value === `select`) {
    if (er.value && I.value?.length && L.value.length && D(n_3, I.value)) {
      let e = Vn(O.value.strokes, I.value);
      W.mode = `move-selection`, W.baseStrokes = E(e.strokes), W.dragIds = e.ids, W.originalSelection = E(I.value), _r = new Set(e.ids), vr = {
        x: 0,
        y: 0
      };
      let t_1 = W.baseStrokes.filter(item => _r.has(item.id));
      gr = ui(W.baseStrokes.filter(item => !_r.has(item.id)), t_1), nr.value = true;
    } else W.mode = `lasso`, I.value = [n_3], er.value = false, L.value = [];
    J();
    return;
  }
  if (j.value === `text`) {
    let t_1 = ti(n_3);
    if (t_1) W.mode = `move-text`, W.baseStrokes = E(O.value.strokes), W.dragIds = [t_1.id], ir.value = t_1.id;else {
      W.drawing = false, W.mode = null, F.down = false;
      try {
        A.value.releasePointerCapture(event.pointerId);
      } catch {}
      qr(n_3);
    }
    return;
  }
  if (![`pen`, `shape`, `eraser`].includes(j.value)) {
    W.drawing = false, W.mode = null, F.down = false;
    try {
      A.value.releasePointerCapture(event.pointerId);
    } catch {}
    return;
  }
  if (j.value === `shape`) {
    let e = ni(n_3);
    if (e) {
      R.value = e.id, W.mode = `move-shape`, W.baseStrokes = E(O.value.strokes), W.dragIds = [e.id], rr.value = e.id;
      return;
    }
  }
  if (X(), W.historyRecorded = true, j.value === `pen`) W.mode = `pen`, O.value.strokes.push({
    id: mn(),
    kind: `pen`,
    color: M.value,
    width: Xn.value,
    points: [n_3],
    offset: {
      x: 0,
      y: 0
    }
  });else if (j.value === `shape`) {
    W.mode = `shape`;
    let e = {
      id: mn(),
      kind: `shape`,
      shape: $n.value,
      color: M.value,
      width: Xn.value,
      points: [n_3, n_3],
      offset: {
        x: 0,
        y: 0
      }
    };
    O.value.strokes.push(e), R.value = e.id;
  } else j.value === `eraser` && (W.mode = `eraser`, di(n_3, n_3));
  J();
}
function pi(e) {
  let t_1 = ii(e);
  F.x = t_1.x, F.y = t_1.y, F.visible = e.pointerType !== `touch`;
  let n_3 = ri(e);
  if (!W.drawing) {
    tr.value = !!(j.value === `select` && er.value && I.value && L.value.length && D(n_3, I.value)), rr.value = j.value === `shape` && ni(n_3)?.id || null, ir.value = j.value === `text` && ti(n_3)?.id || null;
    return;
  }
  if (W.mode === `pan`) P.x = W.basePan.x + t_1.x - W.start.x, P.y = W.basePan.y + t_1.y - W.start.y, J();else if (W.mode === `pen`) Math.hypot(n_3.x - W.last.x, n_3.y - W.last.y) >= .8 / N.value && (O.value.strokes[O.value.strokes.length - 1].points.push(n_3), W.last = n_3, J());else if (W.mode === `shape`) O.value.strokes[O.value.strokes.length - 1].points[1] = n_3, W.last = n_3, J();else if (W.mode === `eraser`) {
    let e = Math.max(2, Zn.value / 5) / N.value;
    Math.hypot(n_3.x - W.last.x, n_3.y - W.last.y) >= e && (di(W.last, n_3), W.last = n_3, J());
  } else if (W.mode === `lasso`) Math.hypot(n_3.x - W.last.x, n_3.y - W.last.y) >= 2.5 / N.value && (I.value.push(n_3), W.last = n_3, J());else if (W.mode === `move-selection`) {
    let e = {
      x: n_3.x - W.start.x,
      y: n_3.y - W.start.y
    };
    !W.historyRecorded && Math.hypot(e.x, e.y) > .5 / N.value && (X(), W.historyRecorded = true), W.historyRecorded && Math.hypot(n_3.x - W.last.x, n_3.y - W.last.y) >= .75 / N.value && (vr = e, L.value = [...W.dragIds], I.value = W.originalSelection.map(item => ({
      x: item.x + e.x,
      y: item.y + e.y
    })), W.last = n_3, J());
  } else if (W.mode === `move-text` || W.mode === `move-shape`) {
    let e = {
      x: n_3.x - W.start.x,
      y: n_3.y - W.start.y
    };
    if (!W.historyRecorded && Math.hypot(e.x, e.y) > .5 / N.value && (X(), W.historyRecorded = true), W.historyRecorded) {
      let t_1 = W.dragIds[0];
      O.value.strokes = W.baseStrokes.map(item => t_1 === item.id ? {
        ...item,
        offset: {
          x: (item.offset?.x || 0) + e.x,
          y: (item.offset?.y || 0) + e.y
        }
      } : item), W.last = n_3, J();
    }
  }
}
function mi(e) {
  if (!W.drawing) return;
  let mode = W.mode;
  if (mode === `eraser` && W.last) {
    let t_1 = ri(e);
    Math.hypot(t_1.x - W.last.x, t_1.y - W.last.y) > .01 / N.value && di(W.last, t_1);
  }
  if (W.mode === `lasso`) {
    let e = Bn(I.value || [], Math.max(1.25, 2 / N.value));
    e.length >= 3 ? (I.value = e, er.value = true, L.value = O.value.strokes.filter(item => Fn(item, e)).map(item => item.id), L.value.length || Y(handler(`SelectionEmpty`))) : Z();
  }
  mode === `move-selection` && W.historyRecorded && W.baseStrokes && _r && (O.value.strokes = W.baseStrokes.map(item => _r.has(item.id) ? {
    ...item,
    offset: {
      x: (item.offset?.x || 0) + vr.x,
      y: (item.offset?.y || 0) + vr.y
    }
  } : item), Z()), W.drawing = false, W.mode = null, W.baseStrokes = null, W.dragIds = null, W.originalSelection = null, gr = null, _r = null, vr = {
    x: 0,
    y: 0
  }, nr.value = false, rr.value = null, F.down = false, mode === `eraser` && (O.value.strokes = O.value.strokes.filter(oi)), [`pen`, `shape`, `eraser`].includes(mode) || [`move-selection`, `move-text`, `move-shape`].includes(mode) && W.historyRecorded, J();
  try {
    A.value.releasePointerCapture(e.pointerId);
  } catch {}
}
function hi(e) {
  F.visible = e.pointerType !== `touch`, pi(e);
}
function gi() {
  W.drawing || (F.visible = false), nr.value || (tr.value = false), W.mode !== `move-text` && (ir.value = null);
}
function _i(e, t_1 = null) {
  let n_3 = Math.max(.05, Math.min(2, Number(e.toFixed(2))));
  if (n_3 === N.value || !k.value) return;
  let r_4 = t_1 || {
      x: k.value.clientWidth / 2,
      y: k.value.clientHeight / 2
    },
    i_5 = n_3 / N.value;
  P.x = r_4.x - (r_4.x - P.x) * i_5, P.y = r_4.y - (r_4.y - P.y) * i_5, N.value = n_3, J();
}
function vi(event) {
  if (event.ctrlKey || event.metaKey) {
    event.preventDefault();
    let t_1 = k.value?.getBoundingClientRect();
    if (!t_1) return;
    let n_3 = {
        x: event.clientX - t_1.left,
        y: event.clientY - t_1.top
      },
      r_4 = Math.exp(-event.deltaY * .002);
    _i(N.value * r_4, n_3);
    return;
  }
  if (event.shiftKey) {
    event.preventDefault();
    let t_1 = Math.abs(event.deltaX) > Math.abs(event.deltaY) ? event.deltaX : event.deltaY;
    P.x -= t_1, J();
  }
}
function yi() {
  L.value.length && (X(), O.value.strokes = O.value.strokes.filter(item => !L.value.includes(item.id)), Z(), J());
}
async function Ti(e) {
  let t_1 = await wi(e, `image`, null);
  if (t_1 !== `saved` || !G) return t_1;
  Di();
  let n_3 = G;
  return G = null, n_3(`saved`), t_1;
}
function Ei() {
  if (sr.value = false, !G) return;
  let e = G;
  G = null, e(`cancelled`);
}
async function Ai() {
  if (cr.value = false, (await Oi()) === `saved`) {
    ki(true);
    return;
  }
  xr && (cr.value = true);
}
function ji() {
  Di(), ki(true);
}
function Mi() {
  ki(false);
}
function Ni(e) {
  cr.value = e, !e && xr && ki(false);
}
function rn(e) {
  let t_1 = window.atob(String(e || ``).split(`,`)[1] || ``),
    items = new Uint8Array(t_1.length);
  for (let e = 0; e < t_1.length; e += 1) items[e] = t_1.charCodeAt(e);
  return items.buffer;
}
function an(e = new Date()) {
  let t_1 = (e, t_1 = 2) => String(e).padStart(t_1, `0`);
  return `${e.getFullYear()}${t_1(e.getMonth() + 1)}${t_1(e.getDate())}${t_1(e.getHours())}${t_1(e.getMinutes())}${t_1(e.getSeconds())}`;
}
function D(e, t_1) {
  let n_3 = false;
  for (let r_4 = 0, i_5 = t_1.length - 1; r_4 < t_1.length; i_5 = r_4++) {
    let a_6 = t_1[r_4],
      o_7 = t_1[i_5];
    a_6.y > e.y != o_7.y > e.y && e.x < (o_7.x - a_6.x) * (e.y - a_6.y) / (o_7.y - a_6.y || 2 ** -52) + a_6.x && (n_3 = !n_3);
  }
  return n_3;
}
function Mn(e) {
  let [t_1, n_3 = t_1] = e.points,
    r_4 = Math.min(t_1.x, n_3.x),
    i_5 = Math.max(t_1.x, n_3.x),
    a_6 = Math.min(t_1.y, n_3.y),
    o_7 = Math.max(t_1.y, n_3.y),
    s_8 = (r_4 + i_5) / 2,
    c_13 = (a_6 + o_7) / 2,
    l_14 = (i_5 - r_4) / 2,
    u_15 = (o_7 - a_6) / 2,
    d_16;
  switch (e.shape) {
    case `rectangle`:
      d_16 = [{
        x: r_4,
        y: a_6
      }, {
        x: i_5,
        y: a_6
      }, {
        x: i_5,
        y: o_7
      }, {
        x: r_4,
        y: o_7
      }, {
        x: r_4,
        y: a_6
      }];
      break;
    case `roundedRectangle`:
      {
        let e = Math.min(i_5 - r_4, o_7 - a_6) * .2;
        d_16 = [], [[i_5 - e, a_6 + e, -Math.PI / 2], [i_5 - e, o_7 - e, 0], [r_4 + e, o_7 - e, Math.PI / 2], [r_4 + e, a_6 + e, Math.PI]].forEach(([t_1, n_3, r_4]) => {
          for (let i_5 = 0; i_5 <= 5; i_5 += 1) d_16.push({
            x: t_1 + Math.cos(r_4 + i_5 / 5 * Math.PI / 2) * e,
            y: n_3 + Math.sin(r_4 + i_5 / 5 * Math.PI / 2) * e
          });
        }), d_16.push(d_16[0]);
        break;
      }
    case `parallelogram`:
      {
        let e = (i_5 - r_4) * .22;
        d_16 = [{
          x: r_4 + e,
          y: a_6
        }, {
          x: i_5,
          y: a_6
        }, {
          x: i_5 - e,
          y: o_7
        }, {
          x: r_4,
          y: o_7
        }, {
          x: r_4 + e,
          y: a_6
        }];
        break;
      }
    case `ellipse`:
      d_16 = Array.from({
        length: 49
      }, (e, t_1) => ({
        x: s_8 + Math.cos(t_1 / 48 * Math.PI * 2) * l_14,
        y: c_13 + Math.sin(t_1 / 48 * Math.PI * 2) * u_15
      }));
      break;
    case `curve`:
      d_16 = Array.from({
        length: 33
      }, (e, r_4) => {
        let i_5 = r_4 / 32,
          a_6 = 1 - i_5;
        return {
          x: a_6 ** 3 * t_1.x + 3 * a_6 ** 2 * i_5 * s_8 + 3 * a_6 * i_5 ** 2 * s_8 + i_5 ** 3 * n_3.x,
          y: a_6 ** 3 * t_1.y + 3 * a_6 ** 2 * i_5 * t_1.y + 3 * a_6 * i_5 ** 2 * n_3.y + i_5 ** 3 * n_3.y
        };
      });
      break;
    case `triangle`:
      d_16 = [{
        x: s_8,
        y: a_6
      }, {
        x: i_5,
        y: o_7
      }, {
        x: r_4,
        y: o_7
      }, {
        x: s_8,
        y: a_6
      }];
      break;
    case `rightTriangle`:
      d_16 = [{
        x: r_4,
        y: a_6
      }, {
        x: i_5,
        y: o_7
      }, {
        x: r_4,
        y: o_7
      }, {
        x: r_4,
        y: a_6
      }];
      break;
    case `diamond`:
      d_16 = [{
        x: s_8,
        y: a_6
      }, {
        x: i_5,
        y: c_13
      }, {
        x: s_8,
        y: o_7
      }, {
        x: r_4,
        y: c_13
      }, {
        x: s_8,
        y: a_6
      }];
      break;
    case `pentagon`:
      d_16 = jn(r_4, a_6, i_5, o_7, 5);
      break;
    case `hexagon`:
      d_16 = jn(r_4, a_6, i_5, o_7, 6);
      break;
    case `star`:
      d_16 = jn(r_4, a_6, i_5, o_7, 10, .45);
      break;
    case `speech`:
      d_16 = [{
        x: r_4,
        y: a_6
      }, {
        x: i_5,
        y: a_6
      }, {
        x: i_5,
        y: o_7 - u_15 * .35
      }, {
        x: r_4 + (i_5 - r_4) * .48,
        y: o_7 - u_15 * .35
      }, {
        x: r_4 + (i_5 - r_4) * .28,
        y: o_7
      }, {
        x: r_4 + (i_5 - r_4) * .28,
        y: o_7 - u_15 * .35
      }, {
        x: r_4,
        y: o_7 - u_15 * .35
      }, {
        x: r_4,
        y: a_6
      }];
      break;
    case `cloud`:
      d_16 = Array.from({
        length: 61
      }, (e, t_1) => {
        let n_3 = t_1 / 60 * Math.PI * 2,
          r_4 = 1 + .1 * Math.sin(n_3 * 6);
        return {
          x: s_8 + Math.cos(n_3) * l_14 * r_4,
          y: c_13 + Math.sin(n_3) * u_15 * r_4
        };
      });
      break;
    case `arrowLeft`:
      d_16 = [{
        x: i_5,
        y: c_13
      }, {
        x: r_4,
        y: c_13
      }, {
        x: r_4 + l_14 * .65,
        y: c_13 - u_15 * .5
      }, {
        x: r_4,
        y: c_13
      }, {
        x: r_4 + l_14 * .65,
        y: c_13 + u_15 * .5
      }];
      break;
    case `arrowRight`:
      d_16 = [{
        x: r_4,
        y: c_13
      }, {
        x: i_5,
        y: c_13
      }, {
        x: i_5 - l_14 * .65,
        y: c_13 - u_15 * .5
      }, {
        x: i_5,
        y: c_13
      }, {
        x: i_5 - l_14 * .65,
        y: c_13 + u_15 * .5
      }];
      break;
    case `arrowUp`:
      d_16 = [{
        x: s_8,
        y: o_7
      }, {
        x: s_8,
        y: a_6
      }, {
        x: s_8 - l_14 * .5,
        y: a_6 + u_15 * .65
      }, {
        x: s_8,
        y: a_6
      }, {
        x: s_8 + l_14 * .5,
        y: a_6 + u_15 * .65
      }];
      break;
    case `arrowDown`:
      d_16 = [{
        x: s_8,
        y: a_6
      }, {
        x: s_8,
        y: o_7
      }, {
        x: s_8 - l_14 * .5,
        y: o_7 - u_15 * .65
      }, {
        x: s_8,
        y: o_7
      }, {
        x: s_8 + l_14 * .5,
        y: o_7 - u_15 * .65
      }];
      break;
    default:
      d_16 = [t_1, n_3];
  }
  return Tn(d_16, e);
}
function Fn(e, t_1) {
  let n_3 = Nn(e),
    r_4 = In(t_1);
  if (!Ln(Rn(In(n_3), e.width / 2), r_4)) return false;
  if (n_3.some(item => On(e, item) && D(item, t_1))) return true;
  for (let r_4 = 1; r_4 < n_3.length; r_4 += 1) {
    let i_5 = vn(n_3[r_4 - 1], n_3[r_4], .5);
    for (let a_6 = 0; a_6 < t_1.length; a_6 += 1) if (wn(n_3[r_4 - 1], n_3[r_4], t_1[a_6], t_1[(a_6 + 1) % t_1.length]) <= e.width / 2 && On(e, i_5)) return true;
  }
  return false;
}
function In(items) {
  let t_1 = 1 / 0,
    n_3 = -1 / 0,
    r_4 = 1 / 0,
    i_5 = -1 / 0;
  return items.forEach(item => {
    t_1 = Math.min(t_1, item.x), n_3 = Math.max(n_3, item.x), r_4 = Math.min(r_4, item.y), i_5 = Math.max(i_5, item.y);
  }), {
    left: t_1,
    right: n_3,
    top: r_4,
    bottom: i_5
  };
}
function Bn(items, t_1) {
  if (items.length <= 3) return items;
  let n_3 = items[0],
    r_4 = items[items.length - 1],
    i_5 = 0,
    a_6 = 0;
  for (let t_1 = 1; t_1 < items.length - 1; t_1 += 1) {
    let o_7 = zn(items[t_1], n_3, r_4);
    o_7 > i_5 && (i_5 = o_7, a_6 = t_1);
  }
  if (i_5 <= t_1) return [n_3, r_4];
  let o_7 = Bn(items.slice(0, a_6 + 1), t_1),
    s_8 = Bn(items.slice(a_6), t_1);
  return o_7.slice(0, -1).concat(s_8);
}
function Vn(items, t_1) {
  let n_3 = [],
    count = [];
  return items.forEach(item => {
    if (item.kind === `pen` || item.kind === `shape`) {
      let i_5 = bn(Nn(item), t_1);
      if (i_5.length > 1 || i_5.some(e => e.inside)) {
        i_5.filter(e => e.points.length > 1).forEach(i_5 => {
          let a_6 = {
            id: mn(),
            kind: `pen`,
            color: item.color,
            width: item.width,
            points: i_5.points,
            offset: {
              x: 0,
              y: 0
            },
            clips: [...kn(item), {
              include: i_5.inside,
              polygon: E(t_1)
            }]
          };
          n_3.push(a_6), i_5.inside && count.push(a_6.id);
        });
        return;
      }
    }
    let i_5 = E(item);
    n_3.push(i_5), Fn(item, t_1) && count.push(i_5.id);
  }), {
    strokes: n_3,
    ids: count
  };
}
let Hn = m(_n());
function Un(e = Hn.value) {
  return JSON.stringify(e.pages.map(item => ({
    id: item.id,
    name: item.name,
    backgroundImage: item.backgroundImage ? {
      present: true,
      x: item.backgroundImage.x || 0,
      y: item.backgroundImage.y || 0,
      width: item.backgroundImage.width || 0,
      height: item.backgroundImage.height || 0,
      fitStage: !!item.backgroundImage.fitStage
    } : null,
    strokes: item.strokes
  })));
}
function J() {
  hr ||= requestAnimationFrame(() => {
    hr = 0, ci();
  });
}
function jr() {
  return Hn.value.pages.some(item => !!item.backgroundImage || item.strokes.some(oi));
}
function Y(e) {
  Oe(e);
}
function X() {
  let e = O.value.id;
  H[e] ||= [], H[e].push({
    strokes: E(O.value.strokes),
    backgroundImage: O.value.backgroundImage || null
  }), H[e].length > 60 && H[e].shift(), U[e] = [];
}
function Fr(e) {
  O.value.strokes = E(e?.strokes || []), O.value.backgroundImage = e?.backgroundImage || null;
}
function zr() {
  z.open && $(), j.value = null, B.value = null, R.value = null, Z(), ir.value = null;
}
function Vr(e = B.value) {
  let t_1 = {
    pen: Kn.value,
    eraser: qn.value,
    shape: Jn.value,
    text: Yn.value
  }[e];
  if (!t_1) return;
  let boundingClientRect = t_1.getBoundingClientRect(),
    r_4 = t_1.closest(`[data-whiteboard-shell]`)?.getBoundingClientRect(),
    i_5 = e === `shape` ? 326 : 130,
    a_6 = r_4?.left ?? 0,
    o_7 = r_4?.width ?? window.innerWidth,
    s_8 = boundingClientRect.left - a_6 + boundingClientRect.width / 2,
    c_13 = Math.max(12, Math.min(o_7 - i_5 - 12, s_8 - i_5 / 2));
  or.left = `${Math.round(c_13)}px`, or.bottom = `${Math.round((r_4?.bottom ?? window.innerHeight) - boundingClientRect.top + 9)}px`;
}
function qr(e) {
  ar.value = null, z.open = true, z.value = ``, z.x = e.x, z.y = e.y, z.fontSize = Qn.value, ae(() => {
    requestAnimationFrame(() => Gn.value?.focus());
  });
}
function Jr(e) {
  let t_1 = En(e);
  ar.value = e.id, z.open = true, z.value = e.text, z.x = t_1.x, z.y = t_1.y, z.fontSize = e.fontSize, M.value = e.color, J(), ae(() => {
    requestAnimationFrame(() => {
      Gn.value?.focus(), Gn.value?.setSelectionRange(z.value.length, z.value.length);
    });
  });
}
function Xr() {
  yr = null, z.open = false, z.value = ``, ar.value = null, J();
}
function ti(e) {
  let t_1 = 6 / N.value;
  for (let n_3 = O.value.strokes.length - 1; n_3 >= 0; --n_3) {
    let r_4 = O.value.strokes[n_3];
    if (r_4.kind !== `text`) continue;
    let i_5 = Rn(Dn(r_4), t_1);
    if (e.x >= i_5.left && e.x <= i_5.right && e.y >= i_5.top && e.y <= i_5.bottom) return r_4;
  }
  return null;
}
function ni(e) {
  let t_1 = 7 / N.value;
  for (let n_3 = O.value.strokes.length - 1; n_3 >= 0; --n_3) {
    let r_4 = O.value.strokes[n_3];
    if (r_4.kind !== `shape`) continue;
    let i_5 = Mn(r_4);
    if (![`line`, `curve`].includes(r_4.shape) && D(e, i_5) || Pn(r_4, e, e, t_1)) return r_4;
  }
  return null;
}
function ri(event) {
  let t_1 = k.value.getBoundingClientRect();
  return {
    x: (event.clientX - t_1.left - P.x) / N.value,
    y: (event.clientY - t_1.top - P.y) / N.value
  };
}
function ii(event) {
  let t_1 = k.value.getBoundingClientRect();
  return {
    x: event.clientX - t_1.left,
    y: event.clientY - t_1.top
  };
}
function oi(e) {
  let t_1 = Nn(e);
  if (!t_1.length) return false;
  let n_3 = Math.max(4, e.width * 2),
    r_4 = Rn(In(t_1), n_3),
    i_5 = Math.max(1, r_4.right - r_4.left),
    a_6 = Math.max(1, r_4.bottom - r_4.top),
    o_7 = Math.min(1, 1024 / i_5, 1024 / a_6),
    element = document.createElement(`canvas`);
  element.width = Math.max(1, Math.ceil(i_5 * o_7)), element.height = Math.max(1, Math.ceil(a_6 * o_7));
  let context = element.getContext(`2d`, {
    willReadFrequently: true
  });
  context.setTransform(o_7, 0, 0, o_7, -r_4.left * o_7, -r_4.top * o_7), ai(context, e);
  let data = context.getImageData(0, 0, element.width, element.height).data,
    u_15 = 0;
  for (let e = 3; e < data.length; e += 4) if (data[e] > 12 && ++u_15 >= 2) return true;
  return false;
}
function ui(e, t_1) {
  return {
    background: li(e, true),
    selected: li(t_1)
  };
}
function di(e, t_1) {
  let n_3 = Zn.value / 2 / N.value,
    r_4 = Sn(e, t_1, n_3);
  O.value.strokes = O.value.strokes.map(item => {
    if (!Pn(item, e, t_1, n_3)) return item;
    let a_6 = item.offset || {
        x: 0,
        y: 0
      },
      o_7 = r_4.map(e => ({
        x: e.x - a_6.x,
        y: e.y - a_6.y
      }));
    return {
      ...item,
      clips: [...(item.clips || []), {
        include: false,
        polygon: o_7
      }]
    };
  });
}
async function wi(e, t_1 = `image`, n_3 = null) {
  let r_4 = _e_0(),
    i_5 = !!(O.value.strokes.length || O.value.backgroundImage);
  if (!on) return Y(handler(`DesktopSaveRequired`)), `failed`;
  try {
    let a_6 = await on.saveBoard({
      name: O.value.name,
      board: t_1 === `image` ? null : E(Hn.value),
      mode: t_1,
      background: e,
      pngDataUrl: t_1 === `image` ? Ci(e) : null,
      filePath: n_3,
      openedImageFile: dr.value
    });
    return a_6?.canceled ? `cancelled` : (a_6?.filePath && i_5 && r_4(`tool_action_success`, {
      action: `whiteboard_saved`
    }), t_1 === `image` && (lr.value = a_6.filePath || n_3 || null, ur.value = e), Wn = Un(), sr.value = false, Y(a_6.type === `image` ? handler(`ImageSaved`) : handler(`ProjectSaved`)), `saved`);
  } catch {
    return Y(handler(`SaveFailed`)), `failed`;
  }
}
function Di() {
  Xr(), Hn.value = gn(), R.value = null, Wn = Un(), lr.value = null, ur.value = `white`, dr.value = false, Object.keys(H).forEach(item => delete H[item]), Object.keys(U).forEach(item => delete U[item]), Z(), Ar(), J();
}
async function Oi() {
  if ($(), lr.value) {
    let e = await wi(dr.value ? `board` : ur.value, `image`, lr.value);
    return e === `saved` && Di(), e;
  }
  return sr.value = true, await new Promise(e => {
    G = e;
  });
}
function ki(e) {
  let t_1 = xr;
  xr = null, cr.value = false, t_1?.(e);
}
function _n() {
  return gn();
}
let vn = (e, t_1, n_3) => ({
  x: e.x + (t_1.x - e.x) * n_3,
  y: e.y + (t_1.y - e.y) * n_3
});
function bn(e, items) {
  if (e.length < 2) return e.length ? [{
    inside: D(e[0], items),
    points: e
  }] : [];
  let emptyItems = [];
  for (let r_4 = 1; r_4 < e.length; r_4 += 1) {
    let i_5 = e[r_4 - 1],
      a_6 = e[r_4],
      o_7 = [0, 1];
    items.forEach((item, n_3) => {
      let r_4 = yn(i_5, a_6, item, items[(n_3 + 1) % items.length]);
      r_4 !== null && r_4 > 1e-6 && r_4 < .999999 && o_7.push(r_4);
    });
    let s_8 = o_7.sort((left, right) => left - right).filter((item, t_1, n_3) => t_1 === 0 || Math.abs(item - n_3[t_1 - 1]) > 1e-6);
    for (let e = 1; e < s_8.length; e += 1) {
      let r_4 = vn(i_5, a_6, s_8[e - 1]),
        o_7 = vn(i_5, a_6, s_8[e]),
        c_13 = D(vn(r_4, o_7, .5), items),
        l_14 = emptyItems[emptyItems.length - 1];
      l_14?.inside === c_13 ? l_14.points.push(o_7) : emptyItems.push({
        inside: c_13,
        points: [r_4, o_7]
      });
    }
  }
  return emptyItems;
}
function Sn(e, t_1, n_3) {
  let r_4 = t_1.x - e.x,
    i_5 = t_1.y - e.y;
  if (Math.hypot(r_4, i_5) < 1e-6) return Array.from({
    length: 24
  }, (t_1, r_4) => {
    let i_5 = r_4 / 24 * Math.PI * 2;
    return {
      x: e.x + Math.cos(i_5) * n_3,
      y: e.y + Math.sin(i_5) * n_3
    };
  });
  let a_6 = Math.atan2(i_5, r_4),
    o_7 = [];
  for (let t_1 = 0; t_1 <= 12; t_1 += 1) {
    let r_4 = a_6 + Math.PI / 2 + t_1 / 12 * Math.PI;
    o_7.push({
      x: e.x + Math.cos(r_4) * n_3,
      y: e.y + Math.sin(r_4) * n_3
    });
  }
  for (let e = 0; e <= 12; e += 1) {
    let r_4 = a_6 - Math.PI / 2 + e / 12 * Math.PI;
    o_7.push({
      x: t_1.x + Math.cos(r_4) * n_3,
      y: t_1.y + Math.sin(r_4) * n_3
    });
  }
  return o_7;
}
function wn(e, t_1, n_3, r_4) {
  return Cn(e, t_1, n_3, r_4) ? 0 : Math.min(xn(e, n_3, r_4), xn(t_1, n_3, r_4), xn(n_3, e, t_1), xn(r_4, e, t_1));
}
function Tn(items, t_1) {
  let n_3 = t_1.offset || {
    x: 0,
    y: 0
  };
  return items.map(item => ({
    x: item.x + n_3.x,
    y: item.y + n_3.y
  }));
}
function En(e) {
  let t_1 = Number(e.fontSize) || 22,
    n_3 = t_1 * 1.4,
    r_4 = String(e.text || ``).split(`
`),
    i_5 = e.points?.[0] || {
      x: 0,
      y: 0
    },
    a_6 = e.offset || {
      x: 0,
      y: 0
    };
  pn ||= document.createElement(`canvas`).getContext(`2d`);
  let o_7 = `500 ${t_1}px ${Zt}`;
  pn.font = o_7;
  let s_8 = Math.max(t_1 * .5, ...r_4.map(item => pn.measureText(item || ` `).width));
  return {
    x: i_5.x + a_6.x,
    y: i_5.y + a_6.y,
    width: s_8,
    height: Math.max(n_3, r_4.length * n_3),
    font: o_7,
    fontSize: t_1,
    lineHeight: n_3,
    lines: r_4
  };
}
function Dn(e) {
  let t_1 = En(e);
  return {
    left: t_1.x,
    right: t_1.x + t_1.width,
    top: t_1.y,
    bottom: t_1.y + t_1.height
  };
}
function On(e, t_1) {
  let n_3 = e.offset || {
      x: 0,
      y: 0
    },
    r_4 = {
      x: t_1.x - n_3.x,
      y: t_1.y - n_3.y
    };
  return (e.clips || []).every(item => D(r_4, item.polygon) === item.include);
}
function kn(e) {
  return (e.clips || []).map(item => ({
    ...item,
    polygon: Tn(item.polygon, e)
  }));
}
function jn(e, t_1, n_3, r_4, i_5, a_6 = 1) {
  let o_7 = (e + n_3) / 2,
    s_8 = (t_1 + r_4) / 2,
    c_13 = (n_3 - e) / 2,
    l_14 = (r_4 - t_1) / 2;
  return Array.from({
    length: i_5 + 1
  }, (e, t_1) => {
    let n_3 = t_1 % i_5,
      r_4 = -Math.PI / 2 + n_3 / i_5 * Math.PI * 2,
      u_15 = i_5 === 10 && n_3 % 2 ? a_6 : 1;
    return {
      x: o_7 + Math.cos(r_4) * c_13 * u_15,
      y: s_8 + Math.sin(r_4) * l_14 * u_15
    };
  });
}
function Nn(e) {
  if (e.kind === `text`) {
    let t_1 = Dn(e);
    return [{
      x: t_1.left,
      y: t_1.top
    }, {
      x: t_1.right,
      y: t_1.top
    }, {
      x: t_1.right,
      y: t_1.bottom
    }, {
      x: t_1.left,
      y: t_1.bottom
    }, {
      x: t_1.left,
      y: t_1.top
    }];
  }
  return e.kind === `shape` ? Mn(e) : Tn(e.points, e);
}
function Pn(e, t_1, n_3, r_4) {
  if (e.kind === `text`) {
    let i_5 = Rn(Dn(e), r_4),
      a_6 = e => e.x >= i_5.left && e.x <= i_5.right && e.y >= i_5.top && e.y <= i_5.bottom;
    if (a_6(t_1) || a_6(n_3)) return true;
    let o_7 = [{
      x: i_5.left,
      y: i_5.top
    }, {
      x: i_5.right,
      y: i_5.top
    }, {
      x: i_5.right,
      y: i_5.bottom
    }, {
      x: i_5.left,
      y: i_5.bottom
    }];
    return o_7.some((item, r_4) => Cn(t_1, n_3, item, o_7[(r_4 + 1) % o_7.length]));
  }
  let i_5 = Nn(e);
  if (i_5.length === 1) return xn(i_5[0], t_1, n_3) <= r_4 + e.width / 2;
  for (let a_6 = 1; a_6 < i_5.length; a_6 += 1) if (wn(i_5[a_6 - 1], i_5[a_6], t_1, n_3) <= r_4 + e.width / 2) return true;
  return false;
}
function Ln(e, t_1) {
  return e.left <= t_1.right && e.right >= t_1.left && e.top <= t_1.bottom && e.bottom >= t_1.top;
}
function Rn(e, t_1) {
  return {
    left: e.left - t_1,
    right: e.right + t_1,
    top: e.top - t_1,
    bottom: e.bottom + t_1
  };
}
function zn(e, t_1, n_3) {
  return xn(e, t_1, n_3);
}
function Ar() {
  clearTimeout(mr), mr = null;
}
function ai(e, t_1) {
  if (t_1.kind === `text`) {
    let n_3 = En(t_1);
    e.save(), e.fillStyle = t_1.color, e.font = n_3.font, e.textAlign = `left`, e.textBaseline = `top`, An(e, t_1);
    let r_4 = (n_3.lineHeight - n_3.fontSize) / 2 + en / N.value;
    n_3.lines.forEach((item, i_5) => e.fillText(item, n_3.x, n_3.y + r_4 + i_5 * n_3.lineHeight)), e.restore();
    return;
  }
  let n_3 = t_1.offset || {
      x: 0,
      y: 0
    },
    r_4 = t_1.kind === `shape` ? Mn(t_1) : t_1.points;
  if (!r_4.length) return;
  e.save(), e.strokeStyle = t_1.color, e.lineWidth = t_1.width;
  let i_5 = t_1.capStart || `round`,
    a_6 = t_1.capEnd || `round`,
    o_7 = i_5 !== a_6;
  e.lineCap = o_7 ? `butt` : i_5, e.lineJoin = `round`, An(e, t_1), e.beginPath();
  let s_8 = t_1.kind !== `shape`,
    c_13 = r_4.map(item => ({
      x: item.x + (s_8 ? n_3.x : 0),
      y: item.y + (s_8 ? n_3.y : 0)
    }));
  e.moveTo(c_13[0].x, c_13[0].y);
  for (let t_1 = 1; t_1 < r_4.length; t_1 += 1) e.lineTo(c_13[t_1].x, c_13[t_1].y);
  r_4.length === 1 && e.lineTo(c_13[0].x + .01, c_13[0].y + .01), e.stroke(), o_7 && (e.fillStyle = t_1.color, [i_5 === `round` ? c_13[0] : null, a_6 === `round` ? c_13[c_13.length - 1] : null].filter(Boolean).forEach(item => {
    e.beginPath(), e.arc(item.x, item.y, t_1.width / 2, 0, Math.PI * 2), e.fill();
  })), e.restore();
}
function ci() {
  let e = si();
  if (!e) return;
  let {
    ctx: t_1,
    width: n_3,
    height: r_4,
    dpr: i_5
  } = e;
  gr && W.mode === `move-selection` && W.historyRecorded ? (t_1.save(), t_1.setTransform(1, 0, 0, 1, 0, 0), t_1.drawImage(gr.background, 0, 0), t_1.drawImage(gr.selected, vr.x * N.value * i_5, vr.y * N.value * i_5), t_1.restore()) : (t_1.save(), t_1.translate(P.x, P.y), t_1.scale(N.value, N.value), Pr(t_1, O.value.backgroundImage, n_3, r_4), O.value.strokes.forEach(item => {
    (!z.open || item.id !== ar.value) && ai(t_1, item);
  }), t_1.restore()), I.value?.length > 1 && (t_1.save(), t_1.translate(P.x, P.y), t_1.scale(N.value, N.value), t_1.strokeStyle = `#2f7dff`, t_1.lineWidth = 1.25 / N.value, t_1.setLineDash([6 / N.value, 5 / N.value]), t_1.beginPath(), t_1.moveTo(I.value[0].x, I.value[0].y), I.value.slice(1).forEach(item => t_1.lineTo(item.x, item.y)), er.value && t_1.lineTo(I.value[0].x, I.value[0].y), t_1.stroke(), t_1.restore());
}
function li(items, t_1 = false) {
  let value = A.value;
  if (!value) return null;
  let elementResult = document.createElement(`canvas`);
  elementResult.width = value.width, elementResult.height = value.height;
  let i_5 = elementResult.getContext(`2d`),
    a_6 = window.devicePixelRatio || 1;
  return i_5.setTransform(a_6, 0, 0, a_6, 0, 0), i_5.translate(P.x, P.y), i_5.scale(N.value, N.value), t_1 && Pr(i_5, O.value.backgroundImage, value.width / a_6, value.height / a_6), items.forEach(item => ai(i_5, item)), elementResult;
}
function Ci(e) {
  if (dr.value && O.value.backgroundImage) return Si(e);
  let value = A.value,
    n_3 = document.createElement(`canvas`);
  n_3.width = value.width, n_3.height = value.height;
  let r_4 = window.devicePixelRatio || 1,
    i_5 = n_3.getContext(`2d`);
  if (i_5.fillStyle = e === `board` ? `#fcfdfc` : `#ffffff`, i_5.fillRect(0, 0, n_3.width, n_3.height), e === `board`) {
    let e = 24 * N.value * r_4,
      t_1 = (P.x * r_4 % e + e) % e,
      a_6 = (P.y * r_4 % e + e) % e;
    i_5.fillStyle = `rgba(110,142,122,.19)`;
    for (let o_7 = t_1; o_7 < n_3.width; o_7 += e) for (let t_1 = a_6; t_1 < n_3.height; t_1 += e) i_5.beginPath(), i_5.arc(o_7, t_1, Math.max(1, r_4), 0, Math.PI * 2), i_5.fill();
  }
  return i_5.setTransform(r_4, 0, 0, r_4, 0, 0), i_5.translate(P.x, P.y), i_5.scale(N.value, N.value), Pr(i_5, O.value.backgroundImage, value.width / r_4, value.height / r_4), O.value.strokes.forEach(item => ai(i_5, item)), n_3.toDataURL(`image/png`);
}
function yn(e, t_1, n_3, r_4) {
  let i_5 = t_1.x - e.x,
    a_6 = t_1.y - e.y,
    o_7 = r_4.x - n_3.x,
    s_8 = r_4.y - n_3.y,
    c_13 = i_5 * s_8 - a_6 * o_7;
  if (Math.abs(c_13) < 1e-6) return null;
  let l_14 = n_3.x - e.x,
    u_15 = n_3.y - e.y,
    d_16 = (l_14 * s_8 - u_15 * o_7) / c_13,
    f_17 = (l_14 * a_6 - u_15 * i_5) / c_13;
  return d_16 >= 0 && d_16 <= 1 && f_17 >= 0 && f_17 <= 1 ? d_16 : null;
}
function xn(e, t_1, n_3) {
  let r_4 = n_3.x - t_1.x,
    i_5 = n_3.y - t_1.y,
    a_6 = r_4 * r_4 + i_5 * i_5;
  if (!a_6) return Math.hypot(e.x - t_1.x, e.y - t_1.y);
  let o_7 = Math.max(0, Math.min(1, ((e.x - t_1.x) * r_4 + (e.y - t_1.y) * i_5) / a_6));
  return Math.hypot(e.x - (t_1.x + o_7 * r_4), e.y - (t_1.y + o_7 * i_5));
}
function Cn(e, t_1, n_3, r_4) {
  return yn(e, t_1, n_3, r_4) !== null;
}
function An(e, t_1) {
  let n_3 = t_1.offset || {
    x: 0,
    y: 0
  };
  (t_1.clips || []).forEach(item => {
    if (!item.polygon?.length) return;
    let i_5 = item.polygon.map(e => ({
      x: e.x + n_3.x,
      y: e.y + n_3.y
    }));
    if (e.beginPath(), !item.include) {
      let n_3 = Rn(In([...Nn(t_1), ...i_5]), Math.max(16, t_1.width * 2));
      e.rect(n_3.left, n_3.top, n_3.right - n_3.left, n_3.bottom - n_3.top);
    }
    e.moveTo(i_5[0].x, i_5[0].y);
    for (let t_1 = 1; t_1 < i_5.length; t_1 += 1) e.lineTo(i_5[t_1].x, i_5[t_1].y);
    e.closePath(), e.clip(item.include ? `nonzero` : `evenodd`);
  });
}
function Pr(e, t_1, n_3, r_4) {
  let i_5 = Nr(t_1?.dataUrl);
  if (i_5?.complete && i_5.naturalWidth) {
    if (t_1.fitStage) {
      e.drawImage(i_5, 0, 0, n_3, r_4);
      return;
    }
    e.drawImage(i_5, t_1.x, t_1.y, t_1.width, t_1.height);
  }
}
function si(e = A.value) {
  if (!e || !k.value) return null;
  let clientWidth = k.value.clientWidth,
    clientHeight = k.value.clientHeight,
    r_4 = window.devicePixelRatio || 1;
  (e.width !== Math.round(clientWidth * r_4) || e.height !== Math.round(clientHeight * r_4)) && (e.width = Math.round(clientWidth * r_4), e.height = Math.round(clientHeight * r_4));
  let contextResult = e.getContext(`2d`);
  return contextResult.setTransform(1, 0, 0, 1, 0, 0), contextResult.globalAlpha = 1, contextResult.globalCompositeOperation = `source-over`, contextResult.clearRect(0, 0, e.width, e.height), contextResult.setTransform(r_4, 0, 0, r_4, 0, 0), {
    ctx: contextResult,
    width: clientWidth,
    height: clientHeight,
    dpr: r_4
  };
}
function Si(e) {
  let t_1 = xi(),
    n_3 = document.createElement(`canvas`);
  n_3.width = Math.max(1, t_1.right - t_1.left), n_3.height = Math.max(1, t_1.bottom - t_1.top);
  let r_4 = n_3.getContext(`2d`);
  if (r_4.fillStyle = e === `board` ? `#fcfdfc` : `#ffffff`, r_4.fillRect(0, 0, n_3.width, n_3.height), e === `board`) {
    let e = (-t_1.left % 24 + 24) % 24,
      i_5 = (-t_1.top % 24 + 24) % 24;
    r_4.fillStyle = `rgba(110,142,122,.19)`;
    for (let t_1 = e; t_1 < n_3.width; t_1 += 24) for (let e = i_5; e < n_3.height; e += 24) r_4.beginPath(), r_4.arc(t_1, e, 1, 0, Math.PI * 2), r_4.fill();
  }
  return r_4.translate(-t_1.left, -t_1.top), Pr(r_4, O.value.backgroundImage, n_3.width, n_3.height), O.value.strokes.forEach(item => ai(r_4, item)), n_3.toDataURL(`image/png`);
}
function Nr(e) {
  if (!e) return null;
  if (fn.has(e)) return fn.get(e);
  let t_1 = new Image();
  return fn.set(e, t_1), t_1.onload = J, t_1.src = e, t_1;
}
function xi() {
  let backgroundImage = O.value.backgroundImage,
    t_1 = {
      left: backgroundImage.x || 0,
      top: backgroundImage.y || 0,
      right: (backgroundImage.x || 0) + backgroundImage.width,
      bottom: (backgroundImage.y || 0) + backgroundImage.height
    };
  for (let e of O.value.strokes) {
    let n_3 = Nn(e);
    if (!n_3.length || !oi(e)) continue;
    let r_4 = e.kind === `text` ? 2 : Math.max(2, Number(e.width || 1) / 2 + 1),
      i_5 = Rn(In(n_3), r_4);
    t_1 = {
      left: Math.min(t_1.left, i_5.left),
      top: Math.min(t_1.top, i_5.top),
      right: Math.max(t_1.right, i_5.right),
      bottom: Math.max(t_1.bottom, i_5.bottom)
    };
  }
  return {
    left: Math.floor(t_1.left),
    top: Math.floor(t_1.top),
    right: Math.ceil(t_1.right),
    bottom: Math.ceil(t_1.bottom)
  };
}
</script>
