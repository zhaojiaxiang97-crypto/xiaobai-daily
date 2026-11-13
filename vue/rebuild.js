import './styles/variables.css';
import { createApp, h, Teleport, BaseTransition, Transition, KeepAlive, Suspense } from 'vue';
import TREE from './today-tree.json';

const MAIN = import.meta.glob('./components/*.vue');
const VENDOR_COMP = import.meta.glob('./vendor-components/*.vue');
const VENDOR_MODS = import.meta.glob('./vendor/ui/*.js');

// Vue 自带的内置组件
const BUILTIN = { Teleport, BaseTransition, Transition, KeepAlive, Suspense };

const findVue = (name) => {
  for (const map of [MAIN, VENDOR_COMP]) {
    const k = Object.keys(map).find(x => x.endsWith('/' + name + '.vue'));
    if (k) return map[k];
  }
  return null;
};

window.__STATUS__ = 'loading';

(async () => {
  const COMPONENTS = {};
  // 1) 从 .vue 加载
  const names = new Set();
  (function collect(n) { if (n.name) names.add(n.name); n.children.forEach(collect); })(TREE);
  for (const name of names) {
    const loader = findVue(name);
    if (!loader) continue;
    try { const m = await loader(); COMPONENTS[name] = m.default || m; } catch (e) {}
  }
  // 2) 从 vendor chunk 按 __name 索引补齐
  const vendorIndex = {};
  for (const key of Object.keys(VENDOR_MODS)) {
    try {
      const mod = await VENDOR_MODS[key]();
      for (const v of Object.values(mod)) {
        const nm = v && (v.__name || v.name);
        if (nm && !COMPONENTS[nm] && !vendorIndex[nm]) vendorIndex[nm] = v;
      }
    } catch (e) {}
  }
  Object.assign(COMPONENTS, vendorIndex);
  window.__INDEXED__ = Object.keys(COMPONENTS).length;
  window.__STATUS__ = 'loaded';

  const fixProps = (props) => {
    const p = {};
    for (const [k, v] of Object.entries(props || {})) {
      if (v === null || typeof v === 'function') continue;
      p[k] = v;
    }
    if ('open' in p) p.open = true;
    if ('defaultOpen' in p) p.defaultOpen = true;
    return p;
  };

  // 透明容器：缺失时直接渲染子节点，避免破坏 DOM 结构
  const TRANSPARENT = new Set(['Presence', 'Teleport', 'BaseTransition', 'AsyncComponentWrapper',
    'Primitive', 'PrimitiveSlot', 'CollectionItem', 'CollectionSlot', 'Transition', 'Suspense', 'KeepAlive']);

  const MAXD = parseInt(new URLSearchParams(location.search).get('depth') || '99', 10);
  const build = (n, d = 0) => {
    if (d >= MAXD) return n.name ? h('span', { style: 'color:#999' }, '[' + n.name + ']') : null;
    const kids = n.children.map(c => build(c, d + 1)).filter(x => x !== null && x !== undefined);
    if (TRANSPARENT.has(n.name)) {
      if (kids.length === 1) return kids[0];
      return kids.length ? h('div', kids) : null;
    }
    if (n.name) {
      const C = COMPONENTS[n.name];
      if (C) {
        try { return h(C, fixProps(n.props), kids.length ? { default: () => kids } : undefined); }
        catch (e) { return h('div', { 'data-err': String(e && e.message || e).slice(0, 30) }); }
      }
      return kids.length ? h('div', { 'data-missing': n.name }, kids) : null;
    }
    return kids.length ? h('div', kids) : null;
  };

  const root = document.getElementById('app');
  try {
    const app = createApp({ render: () => build(TREE) });
    app.config.warnHandler = () => {};
    app.config.errorHandler = (e) => { (window.__ERRS__ ||= []).push(String(e && e.message || e).slice(0, 90)); };
    app.mount(root);
    window.__STATUS__ = 'OK:' + root.innerHTML.length + ':' + root.innerText.length;
  } catch (e) { window.__STATUS__ = 'THROW:' + String(e && e.message || e).slice(0, 80); }
})();
