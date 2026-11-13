import './styles/variables.css';
import { createApp, h } from 'vue';

window.__T__ = {};
(async () => {
  // 1) 最简对照
  try {
    const d = document.createElement('div'); document.body.appendChild(d);
    createApp({ render: () => h('div', 'control-ok') }).mount(d);
    window.__T__.control = d.innerHTML.slice(0, 40);
  } catch (e) { window.__T__.control = 'ERR:' + String(e.message).slice(0, 60); }

  // 2) App.vue
  try {
    const m = await import('./components/App.vue');
    const C = m.default || m;
    window.__T__.appType = typeof C + ':' + (C.__name || C.name || '?');
    const d = document.createElement('div'); document.body.appendChild(d);
    const errs = [];
    const app = createApp({ render: () => h(C, {}) });
    app.config.warnHandler = () => {};
    app.config.errorHandler = (e) => errs.push(String(e && e.message || e).slice(0, 70));
    app.mount(d);
    window.__T__.app = errs.length ? 'ERR:' + errs[0] : 'OK:' + d.innerText.length;
  } catch (e) { window.__T__.app = 'THROW:' + String(e && e.message || e).slice(0, 70); }

  // 3) 今日工作的几个已知组件
  for (const n of ['Sidebar', 'TodayWork', 'DialogRoot', 'DialogContent']) {
    try {
      const globs = [import.meta.glob('./components/*.vue'), import.meta.glob('./vendor-components/*.vue')];
      let loader = null;
      for (const g of globs) {
        const k = Object.keys(g).find(x => x.endsWith('/' + n + '.vue'));
        if (k) { loader = g[k]; break; }
      }
      if (!loader) { window.__T__[n] = 'notfound'; continue; }
      const m = await loader();
      const C = m.default || m;
      const d = document.createElement('div'); document.body.appendChild(d);
      const errs = [];
      const app = createApp({ render: () => h(C, { open: true }) });
      app.config.warnHandler = () => {};
      app.config.errorHandler = (e) => errs.push(String(e && e.message || e).slice(0, 70));
      app.mount(d);
      window.__T__[n] = errs.length ? 'ERR:' + errs[0] : 'OK:' + d.innerText.length;
    } catch (e) { window.__T__[n] = 'THROW:' + String(e && e.message || e).slice(0, 60); }
  }
  window.__DONE__ = true;
})();
