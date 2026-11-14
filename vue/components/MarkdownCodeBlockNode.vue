<template>
<div data-v-4d9ce96f ref="l" :style="at(D?.value)" :class="[`code-block-container rounded-lg border overflow-hidden`,{dark:n.isDark}]"><component :is="i$" :show-header="n.showHeader" :show-collapse-button="n.showCollapseButton" :show-font-size-buttons="n.showFontSizeButtons" :enable-font-size-control="n.enableFontSizeControl" :show-copy-button="n.showCopyButton" :show-expand-button="n.showExpandButton" :show-preview-button="n.showPreviewButton" :show-tooltips="n.showTooltips" :is-dark="n.isDark" :loading="n.loading" :stream="n.stream" :is-collapsed="c?.value" :is-expanded="s?.value" :copy-text="o?.value" :is-previewable="E?.value" :code-font-size="S?.value" :code-font-min="10" :code-font-max="36" :default-code-font-size="x?.value" :font-baseline-ready="C?.value" @togglecollapse="he" @decreasefont="_e" @resetfont="ve" @increasefont="ge" @copy="pe" @toggleexpand="me" @preview="ye" /></div>
</template>

<script setup>
import i$ from './CodeBlockShell.vue';
// [符号说明] l~computed
import { S_is as is, S_lg as lg, S_l as l, S_pe as pe, S_me as me, S_he as he, S_ge as ge, S__e as _e, S_ve as ve, S_ye as ye, S_at as at } from '../shared.js';
const event = defineProps({
      node: {},
      loading: {
        type: Boolean,
        default: true
      },
      stream: {
        type: Boolean,
        default: true
      },
      darkTheme: {
        default: `vitesse-dark`
      },
      lightTheme: {
        default: `vitesse-light`
      },
      isDark: {
        type: Boolean,
        default: false
      },
      isShowPreview: {
        type: Boolean,
        default: true
      },
      enableFontSizeControl: {
        type: Boolean,
        default: true
      },
      minWidth: {
        default: undefined
      },
      maxWidth: {
        default: undefined
      },
      themes: {},
      showHeader: {
        type: Boolean,
        default: true
      },
      showCopyButton: {
        type: Boolean,
        default: true
      },
      showExpandButton: {
        type: Boolean,
        default: true
      },
      showPreviewButton: {
        type: Boolean,
        default: true
      },
      showCollapseButton: {
        type: Boolean,
        default: true
      },
      showFontSizeButtons: {
        type: Boolean,
        default: true
      },
      showTooltips: {
        type: Boolean
      },
      autoScrollOnUpdate: {
        type: Boolean,
        default: true
      },
      autoScrollInitial: {
        type: Boolean,
        default: true
      },
      estimatedHeightPx: {},
      estimatedContentHeightPx: {}
    });
const n = event;

// [兜底] 模板引用但无来源的符号
const D = { value: undefined };
const c = { value: undefined };
const s = { value: undefined };
const o = { value: undefined };
const E = { value: undefined };
const S = { value: undefined };
const x = { value: undefined };
const C = { value: undefined };
</script>

<style>
/* 从原应用 CSS 恢复（data-v-4d9ce96f） */
[data-v-4d9ce96f]{max-height:min(70vh,var(--ms-size-code-max-height));transition:max-height var(--ms-duration-slow) var(--ms-ease-standard);font-family:var(--markstream-code-font-family,ui-monospace, SFMono-Regular, SF Mono, Menlo, Monaco, Consolas, Liberation Mono, Courier New, monospace);font-size:var(--vscode-editor-font-size,14px);line-height:var(--vscode-editor-line-height,1.5);display:grid;overflow:auto}
[data-v-4d9ce96f],.code-fallback-plain[data-v-4d9ce96f]{grid-area:1/1;min-width:0}
[data-v-4d9ce96f]{min-height:1px}
[data-v-4d9ce96f] .code-block-render pre,[data-v-4d9ce96f] .code-block-content .shiki{font-family:inherit;font-size:inherit;line-height:inherit}
[data-v-4d9ce96f] .code-block-content pre{box-sizing:border-box;font-family:inherit;font-size:inherit;line-height:inherit;margin:0;padding:1rem}
[data-v-4d9ce96f] .code-block-content .shiki-fallback{color:inherit;white-space:pre;background:0 0}
[data-v-4d9ce96f]{white-space:pre;color:inherit;font-size:inherit;line-height:inherit;background:0 0;font-family:inherit;overflow:auto}
[data-v-4d9ce96f]{min-height:var(--ms-size-skeleton-min-height);padding:1rem}
[data-v-4d9ce96f]{flex-direction:column;gap:.75rem;display:flex}
[data-v-4d9ce96f]{background:linear-gradient(90deg,var(--loading-shimmer) 25%,hsl(var(--ms-muted-foreground) / .12) 37%,var(--loading-shimmer) 63%);border-radius:calc(var(--ms-radius) * .5);background-size:400% 100%;height:1rem;animation:1.2s ease-in-out infinite code-skeleton-shimmer-4d9ce96f}
[data-v-4d9ce96f]{width:60%}
</style>
