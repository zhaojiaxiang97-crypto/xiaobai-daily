import './styles/variables.css';
import { createApp, h, ref } from 'vue';
import WANTED from './wanted.json';

window.__TRACE__ = [];
const T = m => window.__TRACE__.push(m);
const MAIN = import.meta.glob('./components/*.vue');
const pick = (map, name) => {
  const k = Object.keys(map).find(x => x.endsWith('/' + name + '.vue'));
  return k ? map[k] : null;
};
const ITEMS = [];
for (const [name, group] of WANTED.slice(0, 3)) {
  const l = group === 'components' ? pick(MAIN, name) : null;
  if (l) ITEMS.push({ name, loader: l });
}
T('items=' + ITEMS.length);

const app = createApp({
  setup() {
    const v = ref(0);
    const names = ref([]);   // 只存字符串，不存组件对象
    for (const it of ITEMS) {
      it.loader()
        .then(mod => {
          T('loaded ' + it.name + ' keys=' + Object.keys(mod).join(','));
          names.value = [...names.value, it.name];
        })
        .catch(e => { T('failed ' + it.name + ': ' + String(e && e.message || e).slice(0, 60)); })
        .finally(() => { v.value++; });
    }
    return () => {
      T('render v=' + v.value + ' names=' + names.value.length);
      return h('div', { class: 'gallery' }, (names.value.length ? names.value : ['pending']).map(n => h('div', null, n)));
    };
  },
});
app.config.warnHandler = () => {};
app.config.errorHandler = (e) => { (window.__ERRS__ ||= []).push(String(e && e.message || e).slice(0, 150)); };
app.mount('#app');
