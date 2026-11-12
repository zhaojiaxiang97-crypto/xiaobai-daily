<template>
<div><component :is="eXt" :active="n.active" :markdown-open-request="n.markdownOpenRequest" :milestone-open-request="n.milestoneOpenRequest" :tool-open-request="n.toolOpenRequest" @opentodo="e=>r(`openTodo`,e)" @milestoneopenrequesthandled="e=>r(`milestoneOpenRequestHandled`,e)" @toolopenrequesthandled="e=>r(`toolOpenRequestHandled`,e)" @workspaceactivechange="e=>r(`workspaceActiveChange`,e)" @navigate="e=>r(`navigate`,e)" /></div>
</template>

<script setup>
import eXt from './ToolboxNativeApp.vue';
import { S_is as is, S_r as r } from '../shared.js';
const e = defineProps({
      active: {
        type: Boolean
      },
      markdownOpenRequest: {},
      milestoneOpenRequest: {},
      toolOpenRequest: {}
    });
const n = e;
</script>
