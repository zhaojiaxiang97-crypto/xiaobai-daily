(() => {
  const a = document.querySelector('#app').__vue_app__;
  const root = a._container && a._container._vnode && a._container._vnode.component;
  if (!root) return { err: 'no root instance' };
  const out = {};

  const sanitize = (v, depth = 0) => {
    if (v === null || v === undefined) return null;
    if (depth > 2) return '<deep>';
    const t = typeof v;
    if (t === 'string' || t === 'number' || t === 'boolean') return v;
    if (t === 'function') return '<fn>';
    if (t === 'symbol') return '<sym>';
    if (Array.isArray(v)) return { __arr: v.length, sample: v.slice(0, 2).map(x => sanitize(x, depth + 1)) };
    if (t === 'object') {
      try { if (v.__v_isRef) return { __ref: sanitize(v.value, depth + 1) }; } catch (e) {}
      const o = {};
      let n = 0;
      for (const k of Object.keys(v)) {
        if (n++ >= 6) break;
        try { o[k] = sanitize(v[k], depth + 1); } catch (e) { o[k] = '<err>'; }
      }
      return o;
    }
    return String(v);
  };

  const seenInst = new Set();
  const walkInst = (inst, depth = 0) => {
    if (!inst || depth > 80 || seenInst.has(inst)) return;
    seenInst.add(inst);
    const tp = inst.type;
    const nm = tp && (tp.__name || tp.name);
    if (nm && !out[nm]) {
      out[nm] = { props: sanitize(inst.props || {}), propKeys: Object.keys(inst.props || {}) };
    }
    // 子组件：从 subTree 里的 vnode.component 拿
    const walkVNode = (v, d = 0) => {
      if (!v || d > 80) return;
      if (v.component) walkInst(v.component, depth + 1);
      if (v.subTree) walkVNode(v.subTree, d + 1);
      const ch = v.children;
      if (Array.isArray(ch)) for (const c of ch) walkVNode(c, d + 1);
    };
    walkVNode(inst.subTree);
  };

  walkInst(root);
  return { count: Object.keys(out).length, names: Object.keys(out).slice(0, 30), components: out };
})()
