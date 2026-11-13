import './styles/variables.css';
import { createApp, h } from 'vue';
import TREE from './tree-today.json';

const MAIN = import.meta.glob('./components/*.vue');
const VENDOR = import.meta.glob('./vendor-components/*.vue');

const findLoader = (name) => {
  for (const map of [MAIN, VENDOR]) {
    const k = Object.keys(map).find(x => x.endsWith('/' + name + '.vue'));
    if (k) return map[k];
  }
  return null;
};

// 预加载所有需要的组件
const needed = new Set();
(function collect(n) { if (n.usable) needed.add(n.name); n.children.forEach(collect); })(TREE);

const COMPONENTS = {};
let pending = needed.size;

const root = document.getElementById('app');
window.__STATUS__ = 'loading';

(async () => {
  for (const name of needed) {
    const loader = findLoader(name);
    if (!loader) continue;
    try {
      const mod = await loader();
      COMPONENTS[name] = mod.default || mod;
    } catch (e) { /* 单个失败不影响 */ }
  }
  window.__STATUS__ = 'loaded:' + Object.keys(COMPONENTS).length + '/' + needed.size;

  // 强制打开需要 open 的组件
  const fixProps = (props) => {
    const p = {};
    for (const [k, v] of Object.entries(props || {})) {
      if (v === '<fn>' || v === '<deep>' || v === '<sym>' || (v && typeof v === 'object' && v.__arr !== undefined)) continue;
      if (v && typeof v === 'object' && '__ref' in v) { p[k] = v.__ref; continue; }
      if (v === null) continue;
      p[k] = v;
    }
    if ('open' in p) p.open = true;
    if ('defaultOpen' in p) p.defaultOpen = true;
    return p;
  };

  const build = (n) => {
    const Comp = n.usable ? COMPONENTS[n.name] : null;
    const kids = n.children.filter(c => c.usable || c.children.length).map(build).filter(Boolean);
    if (Comp) {
      try {
        return h(Comp, fixProps(n.props), kids.length ? { default: () => kids } : undefined);
      } catch (e) {
        return h('div', { class: 'ph', 'data-err': String(e && e.message || e).slice(0, 40) });
      }
    }
    // 不可用节点：用 div 占位但承载子节点
    return kids.length ? h('div', { class: 'ph-wrap' }, kids) : null;
  };

  try {
    const app = createApp({ render: () => build(TREE) });
    app.config.warnHandler = () => {};
    app.config.errorHandler = (e) => { (window.__ERRS__ ||= []).push(String(e && e.message || e).slice(0, 100)); };
    app.mount(root);
    window.__STATUS__ = 'OK:' + root.innerHTML.length;
  } catch (e) {
    window.__STATUS__ = 'THROW:' + String(e && e.message || e).slice(0, 80);
  }
})();
