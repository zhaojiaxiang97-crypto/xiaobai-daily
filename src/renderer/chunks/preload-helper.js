var e = function (e, t) {
    return new URL(e, t).href;
  },
  t = {},
  n = function (n, r, i) {
    let a = Promise.resolve();
    if (r && r.length > 0) {
      let elementsByTagName = document.getElementsByTagName(`link`),
        selector = document.querySelector(`meta[property=csp-nonce]`),
        s = selector?.nonce || selector?.getAttribute(`nonce`);
      function c(e) {
        return Promise.all(e.map(item => Promise.resolve(item).then(result => ({
          status: `fulfilled`,
          value: result
        }), result => ({
          status: `rejected`,
          reason: result
        }))));
      }
      function l(e) {
        return import.meta.resolve ? import.meta.resolve(e) : new URL(e, import.meta.url).href;
      }
      a = c(r.map(item => {
        if (item = e(item, i), item = l(item), item in t) return;
        t[item] = true;
        let endsWith = item.endsWith(`.css`);
        for (let e = elementsByTagName.length - 1; e >= 0; e--) {
          let t = elementsByTagName[e];
          if (t.href === item && (!endsWith || t.rel === `stylesheet`)) return;
        }
        let element = document.createElement(`link`);
        if (element.rel = endsWith ? `stylesheet` : `modulepreload`, endsWith || (element.as = `script`), element.crossOrigin = ``, element.href = item, s && element.setAttribute(`nonce`, s), document.head.appendChild(element), endsWith) return new Promise((e, t) => {
          element.addEventListener(`load`, e), element.addEventListener(`error`, () => t(Error(`Unable to preload CSS for ${item}`)));
        });
      }).filter(item => item !== undefined));
    }
    function o(e) {
      let t = new Event(`vite:preloadError`, {
        cancelable: true
      });
      if (t.payload = e, window.dispatchEvent(t), !t.defaultPrevented) throw e;
    }
    return a.then(result => {
      for (let t of result || []) t.status === `rejected` && o(t.reason);
      return n().catch(o);
    });
  };
export { n as t };