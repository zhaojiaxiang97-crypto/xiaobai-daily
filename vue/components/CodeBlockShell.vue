<template>
<div><slot name="header-left" /><slot name="header-right" /></div><span>{{ event.copyText?u(`common.copied`)||`Copied`:`` }}</span>
</template>

<script setup>
// [符号说明] u=useConfigProviderContext
import { S_u as u } from '../shared.js';
const event = defineProps({
      showHeader: {
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
      enableFontSizeControl: {
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
      showTooltips: {
        type: Boolean,
        default: true
      },
      isDark: {
        type: Boolean,
        default: false
      },
      loading: {
        type: Boolean,
        default: false
      },
      stream: {
        type: Boolean,
        default: false
      },
      isCollapsed: {
        type: Boolean,
        default: false
      },
      isExpanded: {
        type: Boolean,
        default: false
      },
      copyText: {
        type: Boolean,
        default: false
      },
      isPreviewable: {
        type: Boolean,
        default: false
      },
      codeFontSize: {},
      codeFontMin: {},
      codeFontMax: {},
      defaultCodeFontSize: {},
      fontBaselineReady: {
        type: Boolean,
        default: false
      },
      diffStats: {},
      diffStatsAriaLabel: {}
    });
const n = event;
</script>
