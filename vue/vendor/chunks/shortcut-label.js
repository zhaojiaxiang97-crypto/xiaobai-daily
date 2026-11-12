function e(text, t) {
  if (!text) return ``;
  let n = t === `darwin`,
    r = n ? {
      Ctrl: `⌃`,
      Alt: `⌥`,
      Shift: `⇧`,
      Command: `⌘`
    } : {
      Super: t === `win32` ? `Win` : `Super`
    },
    i = text.split(`+`),
    a = i.pop() || ``,
    o = n ? [`Ctrl`, `Alt`, `Shift`, `Command`] : [`Ctrl`, `Alt`, `Command`, `Super`, `Shift`];
  return i.sort((left, right) => o.indexOf(left) - o.indexOf(right)), [...i, a].filter(Boolean).map(item => r[item] || item).join(n ? `` : ` + `);
}
export { e as t };