<template>
<label data-v-08e14cdb :class="[`member-candidate create-group-bot-option`,{'create-group-bot-option--selected':f.includes(e.id)}]" @click="withDirectives(t=>l(e.id,!f.includes(e.id)),[`prevent`])"><component :is="sg" :model-value="f.includes(e.id)" :aria-label="e.name" @click="withDirectives(()=>{},[`stop`])" @update:modelvalue="t=>l(e.id,t)" /><span><img :src="c(e)" alt="" /></span><span><strong>{{ e.name }}</strong><span>{{ t(`xiaoheiBot.profileTypeBot`) }}</span></span><component :is="Pp" variant="secondary" /></label>
</template>

<script setup>
import { withDirectives } from 'vue';
import Pp from './Badge.vue';
import sg from './Checkbox.vue';
// [符号说明] f=useConfigProviderContext
import { S_is as is, S_alt as alt, S_t as t, S_c as c, S_l as l, S_f as f } from '../shared.js';
const e = defineProps({});
</script>

<style>
/* 从原应用 CSS 恢复（data-v-08e14cdb） */
[data-v-08e14cdb]{flex-direction:column;min-height:0;max-height:calc(100vh - 40px);display:flex}
[data-v-08e14cdb]{border-bottom:1px solid var(--border);flex:none;padding:20px 22px 16px}
[data-v-08e14cdb] [data-slot=dialog-title]{font-size:18px}
[data-v-08e14cdb] [data-slot=dialog-description]{margin-top:4px;font-size:12px}
[data-v-08e14cdb]{scrollbar-width:thin;flex:auto;min-height:0;padding:18px 22px 20px;overflow:hidden auto}
[data-v-08e14cdb]{gap:17px}
[data-v-08e14cdb] [data-slot=field]{gap:7px}
[data-v-08e14cdb] [data-slot=field-label]{font-size:12px;font-weight:600}
[data-v-08e14cdb] [data-slot=field-description]{font-size:11px}
[data-v-08e14cdb] [data-slot=input],.creation-form-fields[data-v-08e14cdb] [data-slot=select-trigger]{min-height:36px}
[data-v-08e14cdb]{border:1px solid var(--border);background:color-mix(in srgb, var(--muted) 34%, var(--background));border-radius:11px;align-items:center;gap:12px;min-width:0;padding:11px 12px;display:flex}
[data-v-08e14cdb]{flex:none;width:54px;height:54px}
[data-v-08e14cdb]{width:25px;height:25px}
[data-v-08e14cdb]{flex-direction:column;flex:1;gap:2px;min-width:0;display:flex}
[data-v-08e14cdb]{font-size:12px;font-weight:600;line-height:1.35}
[data-v-08e14cdb]{color:var(--muted-foreground);font-size:10px;line-height:1.45}
[data-v-08e14cdb]{border:1px solid var(--border);background:color-mix(in srgb, var(--muted) 34%, var(--background));cursor:pointer;border-radius:11px;align-items:center;gap:12px;min-width:0;padding:11px 12px;display:flex}
[data-v-08e14cdb]{background:var(--background);width:34px;height:34px;color:var(--muted-foreground);border-radius:50%;flex:none;justify-content:center;align-items:center;display:inline-flex}
[data-v-08e14cdb]{width:17px;height:17px}
[data-v-08e14cdb]{flex-direction:column;flex:1;gap:2px;min-width:0;display:flex}
[data-v-08e14cdb]{font-size:12px;font-weight:600;line-height:1.35}
[data-v-08e14cdb]{color:var(--muted-foreground);font-size:10px;line-height:1.45}
[data-v-08e14cdb]{resize:vertical;min-height:78px;max-height:126px}
[data-v-08e14cdb]{border-top:1px solid var(--border);background:color-mix(in srgb, var(--muted) 34%, var(--background));flex:none;min-height:60px;margin:0;padding:13px 22px 15px}
[data-v-08e14cdb]{padding-bottom:18px}
[data-v-08e14cdb]{border:1px solid var(--border);background:color-mix(in srgb, var(--muted) 24%, var(--background));border-radius:12px;padding:13px;gap:10px!important}
[data-v-08e14cdb]{justify-content:space-between;align-items:flex-start;gap:12px;display:flex}
[data-v-08e14cdb]{flex-direction:column;gap:3px;min-width:0;display:flex}
[data-v-08e14cdb]{background:var(--background);height:36px}
[data-v-08e14cdb]{flex-wrap:wrap;gap:6px;display:flex}
[data-v-08e14cdb]{border:1px solid var(--border);max-width:100%;color:var(--foreground);background:var(--background);border-radius:999px;align-items:center;gap:6px;padding:3px 3px 3px 5px;font-size:11px;line-height:1.2;display:inline-flex}
[data-v-08e14cdb]:nth-child(2){text-overflow:ellipsis;white-space:nowrap;max-width:132px;overflow:hidden}
[data-v-08e14cdb]{width:22px;height:22px}
[data-v-08e14cdb] [data-slot=button]{border-radius:50%;width:22px;height:22px}
[data-v-08e14cdb]{border:1px solid var(--border);background:var(--background);border-radius:10px;overflow:hidden}
[data-v-08e14cdb]{border-bottom:1px solid var(--border);justify-content:space-between;align-items:center;gap:12px;min-height:39px;padding:7px 9px 7px 11px;display:flex}
[data-v-08e14cdb]{color:var(--muted-foreground);cursor:pointer;align-items:center;gap:8px;font-size:11px;display:inline-flex}
[data-v-08e14cdb]{overscroll-behavior:contain;max-height:220px;overflow-y:auto}
[data-v-08e14cdb]{margin:2px 5px;padding:8px 7px}
[data-v-08e14cdb]{background:var(--accent)}
[data-v-08e14cdb] [data-slot=badge]{flex:none}
[data-v-08e14cdb]{min-height:180px;padding:24px}
[data-v-08e14cdb]{justify-content:space-between;align-items:center}
[data-v-08e14cdb]{color:var(--muted-foreground);font-size:11px}
[data-v-08e14cdb]{gap:8px;display:flex}
[data-v-08e14cdb] [data-slot=select-value]{flex:1;min-width:0}
[data-v-08e14cdb]{flex:1;align-items:center;gap:8px;min-width:0;display:flex}
[data-v-08e14cdb]{text-overflow:ellipsis;white-space:nowrap;min-width:0;overflow:hidden}
[data-v-08e14cdb]{flex:none;align-items:center;gap:4px;display:inline-flex}
[data-v-08e14cdb] [data-slot=badge]{height:18px;padding-inline:6px;font-size:9px}
</style>
