<template>
<div><h3>{{ c_2(`dayReplay.exportVideo`) }}</h3><div></div><div><p>{{ v_7.value }}</p><p>{{ c_2(`dayReplay.exportPrivacyHint`) }}</p></div><div><button type="button" :class="`h_5-8 rounded-md px-3 text-xs text-[#666] transition-colors hover:bg-black/[0.05] dark:text-muted-foreground dark:hover:bg-white/5`" @click="e=>s_1(`cancel`)">{{ c_2(`dayReplay.exportCancel`) }}</button><button type="button" :class="`h_5-8 rounded-md bg-[#111] px-3 text-xs text-white transition-colors hover:bg-[#333] dark:bg-foreground dark:text-background dark:hover:bg-foreground/85`" @click="T">{{ c_2(`dayReplay.exportStart`) }}</button></div></div>
</template>

<script setup>
import { normalizeClass as e, unref as t, createTextVNode as r, createElementBlock as i, renderList as a, watch as o, createBlock as l, Fragment as d, openBlock as p, onMounted as v, toDisplayString as y, onBeforeMount as b, computed as x, createCommentVNode as C, createElementVNode as w } from 'vue';
import { E as T } from '../vendor/i18n/en-US-player.js';

var B = [`none`, `corner`, `main`];
var V = [`timelapse`, `hold`];
var H = [.5, 1, 2, 4];
var Le = [720, 1080, 1440];
var U = [30, 60];
var W = 2800;
var ze = {
  720: 2e6,
  1080: 35e5,
  1440: 6e6
};
var G = {
  none: 1,
  corner: 1.4,
  main: 2
};
function q(e) {
  return {
    width: Math.round(e * 16 / 9),
    height: e
  };
}
function J(e) {
  let t_8 = e.frameRate === 30 ? .65 : 1;
  return Math.round(ze[e.resolution] * t_8 * G[e.screenshots]);
}
function Ve(e, t_8) {
  return e / t_8;
}
function He(e, t_8) {
  return 900 + Ve(e, t_8) + W;
}
function Ue(e, t_8) {
  return J(t_8) / 8 * (He(e, t_8.speed) / 1e3);
}
var Ke = {
  class: `w-[440px] max-w-[calc(100%-32px)] rounded-[10px] border border-black/8 bg-white p-5 shadow-lg dark:border-border dark:bg-card`
};
var qe = {
  class: `text-sm font-semibold text-(--foreground)`
};
var Je = {
  class: `mt-4 grid grid-cols-[auto_1fr] items-start gap-x-3 gap-y-3`
};
var Ye = [`aria-label`, `aria-disabled`];
var Xe = [`aria-checked`, `disabled`, `onClick`];
var Ze = {
  key: 0,
  class: `mt-1 text-xs text-[#bbb] dark:text-muted-foreground/70`
};
var Qe = {
  class: `mt-4 border-t border-black/6 pt-3 dark:border-border`
};
var $e = {
  class: `text-xs tabular-nums text-[#666] dark:text-muted-foreground`
};
var et = {
  key: 0,
  class: `mt-1 text-xs leading-relaxed text-[#999] dark:text-muted-foreground`
};
var tt = {
  class: `mt-4 flex items-center justify-end gap-2`
};
let o_0 = state,
  s_1 = r,
  {
    t: c_2
  } = g(),
  l_3 = S({
    ...o_0.options
  }),
  promise = x(() => ({
    ...l_3,
    screenshots: o_0.hasScreenshots ? l_3.screenshots : `none`
  })),
  f_4 = {
    720: `720p`,
    1080: `1080p`,
    1440: `2K`
  },
  options = {
    none: `dayReplay.exportScreenshotNone`,
    corner: `dayReplay.exportScreenshotCorner`,
    main: `dayReplay.exportScreenshotMain`
  },
  h_5 = {
    timelapse: `dayReplay.exportPaceTimelapse`,
    hold: `dayReplay.exportPaceHold`
  },
  __6 = x(() => [{
    key: `screenshots`,
    label: c_2(`dayReplay.exportScreenshots`),
    choices: B.map(item => ({
      value: item,
      label: c_2(options[item]),
      disabled: item !== `none` && !o_0.hasScreenshots
    })),
    hint: o_0.hasScreenshots ? undefined : c_2(`dayReplay.exportNoScreenshots`)
  }, {
    key: `pace`,
    label: c_2(`dayReplay.exportPace`),
    choices: V.map(item => ({
      value: item,
      label: c_2(h_5[item])
    })),
    disabled: promise.value.screenshots === `none`
  }, {
    key: `speed`,
    label: c_2(`dayReplay.exportSpeed`),
    choices: H.map(item => ({
      value: item,
      label: `${item}×`
    }))
  }, {
    key: `resolution`,
    label: c_2(`dayReplay.exportResolution`),
    choices: Le.map(item => ({
      value: item,
      label: f_4[item]
    }))
  }, {
    key: `frameRate`,
    label: c_2(`dayReplay.exportFrameRate`),
    choices: U.map(item => ({
      value: item,
      label: c_2(`dayReplay.exportFrameRateValue`, {
        fps: item
      })
    }))
  }]),
  v_7 = x(() => {
    let value = promise.value,
      t_8 = q(value.resolution),
      n_9 = Ue(o_0.timelineDurationMs, value) / 1024 / 1024;
    return c_2(`dayReplay.exportEstimate`, {
      seconds: Math.ceil(He(o_0.timelineDurationMs, value.speed) / 1e3),
      width: t_8.width,
      height: t_8.height,
      size: n_9 < 10 ? n_9.toFixed(1) : Math.round(n_9)
    });
  });
let value = promise.value,
  t_8 = q(value.resolution),
  n_9 = Ue(o_0.timelineDurationMs, value) / 1024 / 1024;
</script>
