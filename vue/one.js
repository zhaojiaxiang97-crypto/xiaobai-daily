import './styles/variables.css';
import { createApp, h } from 'vue';

const MAIN = import.meta.glob('./components/*.vue');
const VENDOR = import.meta.glob('./vendor-components/*.vue');

const params = new URLSearchParams(location.search);
const name = params.get('name') || '';
const group = params.get('group') || 'components';

const map = group === 'components' ? MAIN : VENDOR;
const key = Object.keys(map).find(k => k.endsWith('/' + name + '.vue'));

const root = document.getElementById('app');
window.__STATUS__ = 'start';

if (!key) {
  window.__STATUS__ = 'notfound';
  root.textContent = 'not found: ' + name;
} else {
  map[key]()
    .then(mod => {
      const C = mod.default || mod;
      try {
        const app = createApp({ render: () => h(C, {}, { default: () => '示例内容' }) });
        app.config.warnHandler = () => {};
        app.config.errorHandler = (e) => { window.__STATUS__ = 'ERR:' + String(e && e.message || e).slice(0, 80); };
        app.mount(root);
        if (window.__STATUS__ === 'start') window.__STATUS__ = 'OK:' + root.innerHTML.length;
      } catch (e) {
        window.__STATUS__ = 'THROW:' + String(e && e.message || e).slice(0, 80);
      }
    })
    .catch(e => { window.__STATUS__ = 'LOAD:' + String(e && e.message || e).slice(0, 80); });
}
