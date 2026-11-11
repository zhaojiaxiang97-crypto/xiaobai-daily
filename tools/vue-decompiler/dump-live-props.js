(() => {
  const app = document.querySelector('#app')?.__vue_app__;
  if (!app) return { err: 'no vue app' };
  const out = {};
  const seen = new Set();

  const sanitize = (v, depth = 0) => {
    if (v === null || v === undefined) return null;
    if (depth > 3) return '<deep>';
    const t = typeof v;
    if (t === 'string' || t === 'number' || t === 'boolean') return v;
    if (t === 'function') return '<fn>';
    if (t === 'symbol') return '<sym>';
    if (Array.isArray(v)) return v.slice(0, 3).map(x => sanitize(x, depth + 1));
    if (t === 'object') {
      if (v.__v_isRef) return { __ref: sanitize(v.value, depth + 1) };
      const keys = Object.keys(v).slice(0, 8);
      const o = {};
      for (const k of keys) {
        try { o[k] = sanitize(v[k], depth + 1); } catch (e) { o[k] = '<err>'; }
      }
      return o;
    }
    return String(v);
  };

  const walk = (vnode, guard = 0) => {
    if (!vnode || guard > 60) return;
    if (typeof vnode !== 'object') return;
    const inst = vnode.component;
    if (inst && inst.type) {
      const nm = inst.type.__name || inst.type.name || null;
      if (nm && !out[nm]) {
        out[nm] = { props: sanitize(vnode.props || {}), hasSlots: !!(vnode.children && typeof vnode.children === 'object') };
      }
    }
    if (vnode.subTree) walk(vnode.subTree, guard + 1);
    const ch = vnode.children;
    if (Array.isArray(ch)) for (const c of ch) walk(c, guard + 1);
    else if (ch && typeof ch === 'object' && ch.default) {
      try { const kids = ch.default(); if (Array.isArray(kids)) for (const c of kids) walk(c, guard + 1); } catch (e) {}
    }
  };

  walk(app._instance?.subTree);
  // 也从根实例本身取
  if (app._instance?.type) {
    const nm = app._instance.type.__name || app._instance.type.name;
    if (nm && !out[nm]) out[nm] = { props: sanitize(app._instance.props || {}) };
  }
  return { count: Object.keys(out).length, components: out };
})()
