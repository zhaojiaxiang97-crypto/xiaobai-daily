import './styles/variables.css';
import { createApp, h } from 'vue';
import AlertTitle from './components/AlertTitle.vue';
import AlertDescription from './components/AlertDescription.vue';
import Card from './components/Card.vue';
import Kbd from './vendor-components/Kbd.vue';

createApp({
  render: () => h('div', { style: 'padding:24px;font-family:system-ui' }, [
    h('h3', null, '小白日报 v1.8.3 — 还原的 Vue 组件'),
    h(Card, null, {
      default: () => [
        h(AlertTitle, null, { default: () => '可渲染组件示例' }),
        h(AlertDescription, null, {
          default: () => '这些组件从 Electron 打包产物反编译而来，结构与 scoped 样式均已恢复。',
        }),
      ],
    }),
    h('p', null, ['按 ', h(Kbd, null, { default: () => 'Ctrl' }), ' + ', h(Kbd, null, { default: () => 'K' }), ' 打开命令面板']),
  ]),
}).mount('#app');
