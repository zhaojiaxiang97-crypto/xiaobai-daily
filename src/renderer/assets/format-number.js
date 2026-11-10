import { l as e, p as t } from "./work-motivator.js";
var n = 6e4,
  r = 60 * n,
  i = 24 * r,
  a = 6 * r,
  o = 21.75,
  s = `2024-01-01`;
function c(items) {
  return Number(items.slice(0, 2)) * 60 + Number(items.slice(3, 5));
}
function l(e) {
  return new Date(e.getFullYear(), e.getMonth(), e.getDate());
}
function u(e, t) {
  return new Date(e.getFullYear(), e.getMonth(), e.getDate() + t);
}
function d(e, t) {
  return new Date(e.getFullYear(), e.getMonth(), e.getDate(), 0, t).getTime();
}
function f(e, n) {
  let r = n.getDay();
  return e.weekPattern === `double` ? r >= 1 && r <= 5 : e.weekPattern === `single` ? r >= 1 && r <= 6 : t({
    days: [1, 2, 3, 4, 5, 6],
    anchorMonday: e.bigWeekMonday || s,
    secondWeekDays: [1, 2, 3, 4, 5]
  }, n).includes(r);
}
function p(e) {
  let t = c(e.startTime),
    n = c(e.endTime);
  if (n <= t && (n += 1440), !e.lunchEnabled) return [{
    start: t,
    end: n
  }];
  let r = c(e.lunchStart),
    i = c(e.lunchEnd);
  return r < t && (r += 1440), i <= r && (i += 1440), r >= n || i <= t ? [{
    start: t,
    end: n
  }] : [{
    start: t,
    end: Math.max(t, r)
  }, {
    start: Math.min(n, i),
    end: n
  }].filter(item => item.end > item.start);
}
function m(e) {
  return p(e).reduce((acc, cur) => acc + cur.end - cur.start, 0);
}
function h(e, t) {
  return p(e).map(item => ({
    start: d(t, item.start),
    end: d(t, item.end)
  }));
}
function g(e, t, n) {
  let date = new Date(t, n + 1, 0).getDate(),
    i = 0;
  for (let a = 1; a <= date; a++) f(e, new Date(t, n, a)) && i++;
  return i;
}
function _(e, t) {
  let i = m(e) * n;
  if (e.salaryAmount <= 0) return 0;
  if (e.salaryMode === `hourly`) return e.salaryAmount / r;
  if (i <= 0) return 0;
  if (e.salaryMode === `daily`) return e.salaryAmount / i;
  let a = e.monthBasis === `standard` ? o : e.monthBasis === `custom` ? e.customMonthDays : g(e, t.getFullYear(), t.getMonth());
  return a > 0 ? e.salaryAmount / a / i : 0;
}
function v(e) {
  return e.overtime === `stop` ? 0 : e.overtime === `custom` ? e.customOvertimeFactor : Number(e.overtime);
}
function y(e, t, n) {
  for (let r = 0; r <= 15; r++) {
    let i = u(t, r);
    if (!f(e, i)) continue;
    let a = h(e, i);
    if (a.length && a[0].start > n) return a[0].start;
  }
  return null;
}
function b(e, t = Date.now()) {
  let i = l(new Date(t)),
    o = u(i, -1),
    s = i;
  if (f(e, o)) {
    let n = h(e, o);
    n.length && n[n.length - 1].end > t && (s = o);
  }
  let c = _(e, s),
    d = m(e) * n,
    p = y(e, i, t),
    g = p === null ? 0 : p - t,
    options = {
      day: s,
      hourlyRate: c * r,
      nextStartAt: p
    };
  if (!f(e, s)) return {
    ...options,
    status: `rest`,
    earnedToday: 0,
    earningPerMs: 0,
    workedMs: 0,
    scheduledMs: 0,
    countdownMs: g
  };
  let x = h(e, s);
  if (!x.length) return {
    ...options,
    status: `rest`,
    earnedToday: 0,
    earningPerMs: 0,
    workedMs: 0,
    scheduledMs: 0,
    countdownMs: g
  };
  let S = x.reduce((acc, cur) => acc + Math.max(0, Math.min(t, cur.end) - cur.start), 0),
    start = x[0].start,
    w = x[x.length - 1].end,
    T = S * c;
  if (t < start) return {
    ...options,
    status: `before`,
    earnedToday: 0,
    earningPerMs: 0,
    workedMs: 0,
    scheduledMs: d,
    countdownMs: start - t
  };
  if (t >= w) {
    let n = v(e);
    if (n > 0) {
      let e = Math.min(t - w, a),
        r = e * c * n;
      return t - w < 216e5 ? {
        ...options,
        status: `overtime`,
        earnedToday: T + r,
        earningPerMs: c * n,
        workedMs: S + e,
        scheduledMs: d,
        countdownMs: e
      } : {
        ...options,
        status: `off`,
        earnedToday: T + r,
        earningPerMs: 0,
        workedMs: S + e,
        scheduledMs: d,
        countdownMs: g
      };
    }
    return {
      ...options,
      status: `off`,
      earnedToday: T,
      earningPerMs: 0,
      workedMs: S,
      scheduledMs: d,
      countdownMs: g
    };
  }
  if (x.find(item => t >= item.start && t < item.end)) return {
    ...options,
    status: `working`,
    earnedToday: T,
    earningPerMs: c,
    workedMs: S,
    scheduledMs: d,
    countdownMs: w - t
  };
  let E = x.find(item => item.start > t);
  return {
    ...options,
    status: `lunch`,
    earnedToday: T,
    earningPerMs: 0,
    workedMs: S,
    scheduledMs: d,
    countdownMs: E ? E.start - t : 0
  };
}
function x(e, t) {
  return _(e, t) * (m(e) * n + a * v(e));
}
function S(text) {
  let [t, n, r] = text.split(`-`).map(Number);
  return !t || !n || !r ? null : new Date(t, n - 1, r);
}
function C(e, t, r) {
  let i = S(t);
  if (!i || i.getTime() > r.day.getTime()) return 0;
  let a = m(e) * n,
    o = new Map(),
    s = 0,
    c = i;
  for (let t = 0; t < 3660 && c.getTime() < r.day.getTime(); t++) {
    if (f(e, c)) {
      let t = `${c.getFullYear()}-${c.getMonth()}`,
        n = o.get(t);
      n === undefined && (n = _(e, c), o.set(t, n)), s += a * n;
    }
    c = u(c, 1);
  }
  return s + r.earnedToday;
}
function w(e, t) {
  return e === `week` ? u(t, -((t.getDay() + 6) % 7)) : e === `month` ? new Date(t.getFullYear(), t.getMonth(), 1) : l(t);
}
function T(t, n) {
  return t.earnedRange === `today` ? n.earnedToday : C(t, e(w(t.earnedRange, n.day)), n);
}
function E(e, t) {
  if (e.earnedRange === `today`) return x(e, t);
  let r = w(e.earnedRange, t),
    i = e.earnedRange === `week` ? u(r, 7) : new Date(r.getFullYear(), r.getMonth() + 1, 1),
    o = m(e) * n,
    s = a * v(e),
    c = new Map(),
    l = 0,
    d = 0;
  for (let t = r; t.getTime() < i.getTime(); t = u(t, 1)) {
    if (!f(e, t)) continue;
    let n = c.get(t.getMonth());
    n === undefined && (n = _(e, t), c.set(t.getMonth(), n)), l += n * o, d = Math.max(d, n * s);
  }
  return l + d;
}
function D(e, t, n) {
  let i = t.savedAmount + C(e, t.startDate, n),
    a = Math.max(0, t.amount - i),
    o = n.hourlyRate / r;
  return {
    wish: t,
    progressAmount: i,
    ratio: t.amount > 0 ? Math.min(1, i / t.amount) : 0,
    remainingAmount: a,
    remainingWorkMs: o > 0 ? a / o : null
  };
}
function O(e) {
  return e.wishes.find(item => item.id === e.activeWishId && !item.completedAt) ?? e.wishes.find(item => !item.completedAt) ?? null;
}
function k(e, t) {
  return Math.round((l(t).getTime() - l(e).getTime()) / i);
}
function A(e, t = Date.now()) {
  let n = l(new Date(t));
  if (e.countdownShown === `none`) return null;
  if (e.countdownShown === `weekend`) {
    if (!f(e, n)) return {
      kind: `weekend`,
      days: 0
    };
    for (let t = 1; t <= 14; t++) if (!f(e, u(n, t))) return {
      kind: `weekend`,
      days: t
    };
    return null;
  }
  if (e.countdownShown === `payday`) {
    let handler = (t, n) => new Date(t, n, Math.min(e.payday, new Date(t, n + 1, 0).getDate())),
      r = handler(n.getFullYear(), n.getMonth());
    return r.getTime() < n.getTime() && (r = handler(n.getFullYear(), n.getMonth() + 1)), {
      kind: `payday`,
      days: k(n, r)
    };
  }
  let r = e.countdownShown.slice(7),
    i = e.countdowns.find(item => item.id === r),
    a = i ? S(i.date) : null;
  return !i || !a ? null : {
    kind: `custom`,
    name: i.name,
    days: k(n, a)
  };
}
var j = 6e4;
function M(e, t, n, r = 2) {
  let toLocaleString = Math.max(0, t).toLocaleString(n, {
    minimumFractionDigits: r,
    maximumFractionDigits: r
  });
  return `${e.currency}${toLocaleString}`;
}
function N(fn, t, n = true) {
  let r = Math.max(0, Math.ceil(t / j)),
    i = Math.floor(r / 1440),
    a = Math.floor(r % 1440 / 60),
    o = r % 60;
  if (n && i > 0) return fn(`DurationDH`, {
    d: i,
    h: a
  });
  let s = Math.floor(r / 60);
  return s > 0 ? fn(`DurationHM`, {
    h: s,
    m: String(o).padStart(2, `0`)
  }) : fn(`DurationM`, {
    m: o
  });
}
function P(fn, t) {
  return fn({
    rest: `StatusRest`,
    before: `StatusBefore`,
    working: `StatusWorking`,
    lunch: `StatusLunch`,
    overtime: `StatusOvertime`,
    off: `StatusOff`
  }[t]);
}
function F(fn, t) {
  return fn({
    today: `Earned`,
    week: `EarnedWeek`,
    month: `EarnedMonth`
  }[t]);
}
function I(fn, t) {
  let n = N(fn, t.countdownMs);
  return t.status === `working` ? fn(`ToOffWork`, {
    time: n
  }) : t.status === `lunch` ? fn(`ToLunchEnd`, {
    time: n
  }) : t.status === `overtime` ? fn(`OvertimeFor`, {
    time: N(fn, t.countdownMs - j + 1)
  }) : t.nextStartAt === null ? `` : fn(`ToStart`, {
    time: n
  });
}
function L(e) {
  return e === `working` || e === `overtime`;
}
function R(fn, t) {
  return t.ratio >= 1 ? fn(`WishDone`) : t.remainingWorkMs === null ? `` : fn(`WishRemaining`, {
    time: N(fn, t.remainingWorkMs, false)
  });
}
function z(fn, t) {
  return t ? t.kind === `weekend` ? t.days <= 0 ? fn(`CountdownWeekendToday`) : t.days === 1 ? fn(`CountdownWeekendTomorrow`) : fn(`CountdownWeekend`, {
    days: t.days
  }) : t.kind === `payday` ? t.days <= 0 ? fn(`CountdownPaydayToday`) : fn(`CountdownPayday`, {
    days: t.days
  }) : t.days === 0 ? fn(`CountdownCustomToday`, {
    name: t.name
  }) : t.days < 0 ? fn(`CountdownCustomPast`, {
    name: t.name,
    days: -t.days
  }) : fn(`CountdownCustom`, {
    name: t.name,
    days: t.days
  }) : ``;
}
function B(e) {
  return `${(Math.max(0, e) * 100).toFixed(1)}%`;
}
function V(e) {
  return (Math.max(0, e) / 36e5).toFixed(2);
}
function H(fn, t, n) {
  return fn(`DateLabel`, {
    month: t.getMonth() + 1,
    day: t.getDate(),
    weekday: t.toLocaleDateString(n, {
      weekday: `short`
    }),
    monthName: t.toLocaleDateString(n, {
      month: `short`
    })
  });
}
function U(e) {
  return [e.getHours(), e.getMinutes(), e.getSeconds()].map(item => String(item).padStart(2, `0`)).join(`:`);
}
export { T as _, M as a, B as c, R as d, O as f, C as g, D as h, F as i, I as l, b as m, z as n, V as o, A as p, H as r, L as s, U as t, P as u, E as v, m as y };