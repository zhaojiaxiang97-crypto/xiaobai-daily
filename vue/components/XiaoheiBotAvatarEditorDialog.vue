<template>
<button data-v-51190838 type="button" :class="[`avatar-cloud-button`,{'avatar-cloud-button--active':l.avatar===e.url}]" :aria-label="e.name" :aria-pressed="l.avatar===e.url" @click="t=>p(e)"><img :src="e.url" alt="" loading="lazy" decoding="async" /><span><component :is="an" :size="13" :stroke-width="2.5" /></span></button>
</template>

<script setup>
import { S_is as is, S_alt as alt, S_t as t, S_l as l, S_p as p, S_an as an } from '../shared.js';
const e = defineProps({});
</script>

<style>
/* 从原应用 CSS 恢复（data-v-51190838） */
[data-v-51190838]{background:color-mix(in srgb, var(--muted) 34%, var(--background));margin:0;padding:13px 20px 16px}
[data-v-51190838]{justify-content:center;padding:0 20px 14px;display:flex}
[data-v-51190838]{width:76px;height:76px}
[data-v-51190838]{gap:0;padding:0 20px}
[data-v-51190838]{width:100%}
[data-v-51190838]{min-height:276px;padding:18px 4px 14px}
[data-v-51190838]{overscroll-behavior:contain;max-height:304px;padding:2px 3px 5px;overflow-y:auto}
[data-v-51190838]{grid-template-columns:repeat(4,1fr);gap:10px;display:grid}
[data-v-51190838]{aspect-ratio:1;background:color-mix(in srgb, var(--muted) 56%, var(--background));cursor:pointer;border:1px solid #0000;border-radius:10px;outline:none;justify-content:center;align-items:center;padding:0;transition:border-color .14s,background-color .14s,transform .12s cubic-bezier(.23,1,.32,1);display:flex;position:relative;overflow:hidden}
[data-v-51190838]{object-fit:cover;width:100%;height:100%}
[data-v-51190838]:hover{border-color:color-mix(in srgb, var(--foreground) 18%, transparent)}
[data-v-51190838]:active{transform:scale(.97)}
[data-v-51190838]{border-color:color-mix(in srgb, var(--primary) 56%, var(--border));box-shadow:0 0 0 2px color-mix(in srgb, var(--primary) 16%, transparent)}
[data-v-51190838]{border:2px solid var(--background);width:22px;height:22px;color:var(--primary-foreground);background:var(--primary);border-radius:50%;justify-content:center;align-items:center;display:inline-flex;position:absolute;bottom:6px;right:6px;box-shadow:0 2px 6px #00000029}
[data-v-51190838]:focus-visible,.avatar-upload-zone[data-v-51190838]:focus-visible{outline:2px solid color-mix(in srgb, var(--ring) 52%, transparent);outline-offset:2px}
[data-v-51190838]{border:1px dashed var(--border);min-height:226px;color:var(--muted-foreground);text-align:center;border-radius:12px;flex-direction:column;justify-content:center;align-items:center;gap:9px;padding:22px;display:flex}
[data-v-51190838]{color:var(--foreground);font-size:12px;font-weight:500}
[data-v-51190838],.avatar-cloud-warning[data-v-51190838]{font-size:10px}
[data-v-51190838]{animation:.8s linear infinite avatar-cloud-spin-51190838}
[data-v-51190838]{color:var(--muted-foreground);text-align:center;margin:8px 0 0}
[data-v-51190838]{margin:14px auto 0;display:flex}
[data-v-51190838]{clip:rect(0 0 0 0);clip-path:inset(50%);white-space:nowrap;width:1px;height:1px;position:absolute;overflow:hidden}
[data-v-51190838]{border:1px dashed color-mix(in srgb, var(--border) 86%, var(--foreground));min-height:244px;color:var(--muted-foreground);cursor:pointer;border-radius:12px;outline:none;flex-direction:column;justify-content:center;align-items:center;gap:8px;padding:22px;transition:border-color .14s,background-color .14s;display:flex}
[data-v-51190838]:hover{border-color:var(--ring);background:color-mix(in srgb, var(--accent) 46%, transparent)}
[data-v-51190838]{width:38px;height:38px;color:var(--foreground);background:var(--muted);border-radius:10px;justify-content:center;align-items:center;margin-bottom:2px;display:inline-flex}
[data-v-51190838]{color:var(--foreground);font-size:12px;font-weight:500}
[data-v-51190838]:not(.avatar-upload-zone__icon),.avatar-upload-zone small[data-v-51190838]{font-size:10px}
[data-v-51190838]{color:var(--destructive);text-align:center;margin:8px 0 0;font-size:10px}
[data-v-51190838],.contact-item[data-v-51190838],.conversation-header__identity[data-v-51190838],.profile-panel__close[data-v-51190838],.profile-edit-avatar-button[data-v-51190838],.message-attachment[data-v-51190838],.message-copy-button[data-v-51190838],button.composer-attachment__preview[data-v-51190838],.composer-attachment__remove[data-v-51190838],.attachment-button[data-v-51190838],.send-button[data-v-51190838],.avatar-cloud-button[data-v-51190838]{transition:background-color .1s,border-color .1s,opacity .1s}
[data-v-51190838]:active,.contact-item[data-v-51190838]:active,.conversation-header__identity[data-v-51190838]:active,.profile-panel__close[data-v-51190838]:active,.profile-edit-avatar-button[data-v-51190838]:active,.message-attachment[data-v-51190838]:active,.message-copy-button[data-v-51190838]:active,button.composer-attachment__preview[data-v-51190838]:active,.composer-attachment__remove[data-v-51190838]:active,.attachment-button[data-v-51190838]:active,.send-button[data-v-51190838]:active:not(:disabled),.avatar-cloud-button[data-v-51190838]:active{transform:none}
[data-v-51190838]{transition:none}
[data-v-51190838],.avatar-cloud-state__spinner[data-v-51190838]{animation:none}
</style>
