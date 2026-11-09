function e(e) {
  return Math.round(e).toLocaleString();
}
function t(e) {
  let t = Math.round(e);
  return t >= 1e6 ? `${(t / 1e6).toFixed(2)}M` : t >= 1e4 ? `${(t / 1e3).toFixed(1)}K` : t.toLocaleString();
}
function n(e) {
  return Math.round(e).toLocaleString();
}
function r(e) {
  return Math.max(0, Math.round(e)).toLocaleString();
}
function i(e) {
  return e >= 1073741824 ? `${(e / 1024 / 1024 / 1024).toFixed(2)} GB` : e >= 1048576 ? `${(e / 1024 / 1024).toFixed(1)} MB` : e >= 1024 ? `${(e / 1024).toFixed(1)} KB` : `${e} B`;
}
function a(e) {
  return `${(e / 1024 / 1024).toFixed(2)} MB`;
}
function o(e) {
  let t = typeof e == `string` ? new Date(e) : e;
  return `${t.getFullYear()}-${String(t.getMonth() + 1).padStart(2, `0`)}-${String(t.getDate()).padStart(2, `0`)} ${String(t.getHours()).padStart(2, `0`)}:${String(t.getMinutes()).padStart(2, `0`)}:${String(t.getSeconds()).padStart(2, `0`)}`;
}
function s(e) {
  let t = new Date(e);
  return `${String(t.getHours()).padStart(2, `0`)}:${String(t.getMinutes()).padStart(2, `0`)}:${String(t.getSeconds()).padStart(2, `0`)}`;
}
export { o as a, s as c, r as i, t as n, n as o, a as r, i as s, e as t };