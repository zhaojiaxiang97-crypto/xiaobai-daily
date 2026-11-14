<template>
<div><div><component :is="Cs" :size="14" :stroke-width="1.8" :class="`shrink-0 text-[#9ca3af]`" /><span v-text="Xe(createElementVNode(`input`,{'onUpdate:modelValue':n[0]||=e=>a=e,class:`h-10 min-w-0 flex-1 bg-transparent text-sm text-[#111827] outline-none placeholder:text-[#9ca3af]`,placeholder:i(`todo.newTask.peopleSearchPlaceholder`),onInput:n[1]||=e=>{s=null,c=``;},onKeydown:xt(x,[`enter`])},null,40,qce),[[yt,a]])" /><component :is="zn" :size="14" :stroke-width="1.8" :class="`shrink-0 animate-spin text-[#9ca3af]`" /></div><div><button type="button" :class="`flex w-full items-center gap-2 rounded-md px-2 py-2 text-left text-sm text-[#16a34a] transition-colors hover:bg-[#f0fdf4] disabled:opacity-60`" :disabled="o" @click="y"><component :is="Cs" :size="14" :stroke-width="1.8" :class="`shrink-0`" /><span><span v-text="i(`todo.newTask.lookupEmail`,{email:a.trim()})" /></span></button><p>{{ m?.value?i(`todo.newTask.peopleNoMatch`):i(`todo.assigneeDialog.emptyFriends`) }}</p></div><div><component :is="W_" compact="" :name="event.displayName(s)" :email="s.email" :avatar-url="event.avatarUrl(s)" :initial="event.initial(s)" :selected="f(s)" :show-add-friend="event.canAddFriend(s)" :adding-friend="event.isAddingFriend(s)" :add-friend-label="i(`todo.assigneeDialog.addFriend`)" :add-friend-title="event.addFriendTitle" @select="e=>v(s)" @addfriend="e=>b(s)" /></div><div>{{ c }}</div></div>
</template>

<script setup>
import { createElementVNode } from 'vue';
import md from './BaseSeparator.vue';
import W_ from './TodoPersonSearchResult.vue';
// [符号说明] f=useConfigProviderContext
import { S_is as is, S_Cs as Cs, S_sm as sm, S_qce as qce, S_px as px, S_e as e, S_i as i, S_f as f, S_p as p, S_w as w, S_Xe as Xe, S_yt as yt, S_xt as xt, S_zn as zn } from '../shared.js';
const event = defineProps({
      selected: {},
      options: {},
      displayName: {
        type: Function
      },
      avatarUrl: {
        type: Function
      },
      initial: {
        type: Function
      },
      resolveEmail: {
        type: Function
      },
      canAddFriend: {
        type: Function
      },
      isAddingFriend: {
        type: Function
      },
      addFriend: {
        type: Function
      },
      addFriendTitle: {}
    });
const n = event;

// [兜底] 模板引用但无来源的符号
const m = { value: undefined };
import { ref } from 'vue';

// [setup 还原] 原组件 setup 里初值不依赖 IPC 的声明
let a = ref(``);
let o = ref(false);
let s = ref(null);
let c = ref(``);
function v(e) {
  f(e) || r(`add`, e), a.value = ``, s.value = null, c.value = ``;
}
async function y() {
  let e = a.value.trim();
  if (e && !o.value) {
    o.value = true, c.value = ``, s.value = null;
    try {
      s.value = await n.resolveEmail(e);
    } catch (e) {
      c.value = e instanceof Error ? e.message : i(`todo.error.resolveAssigneeFailed`);
    } finally {
      o.value = false;
    }
  }
}
async function b(e) {
  c.value = await n.addFriend(e), c.value || (a.value = ``, s.value = null);
}
function x(e) {
  if (e.isComposing || e.keyCode === 229) return;
  if (e.preventDefault(), g.value) {
    y();
    return;
  }
  let t = h.value.find(item => !f(item));
  t && v(t);
}
</script>
