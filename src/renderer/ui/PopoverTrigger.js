import { B as e, I as t, K as n, L as r, N as i, O as a, V as o, W as s, _ as c, at as l, j as u, k as d, lt as f, xt as p, yt as m, z as h } from "./Switch.js";
import { An as g, Ct as _, Dn as ee, Et as te, V as ne, Wt as re, Yt as v, b as y, bn as b, gt as x, j as S, k as ie, nt as C, tr as ae, ut as oe, v as w } from "../chunks/vue-i18n.runtime.js";
import { E as se } from "../i18n/en-US-player.js";
import { r as ce } from "./icons/lucide-icons.js";
import { a as le, i as ue, n as de, o as fe } from "./PopperContent.js";
var pe = ce(`chevron-right`, [[`path`, {
  d: `m9 18 6-6-6-6`,
  key: `mthhwq`
}]]);
function T(e, t) {
  return e - t * Math.floor(e / t);
}
var me = 1721426;
function E(e, t, n, r) {
  t = O(e, t);
  let i = t - 1,
    a = -2;
  return n <= 2 ? a = 0 : D(t) && (a = -1), 1721425 + 365 * i + Math.floor(i / 4) - Math.floor(i / 100) + Math.floor(i / 400) + Math.floor((367 * n - 362) / 12 + a + r);
}
function D(e) {
  return e % 4 == 0 && (e % 100 != 0 || e % 400 == 0);
}
function O(e, t) {
  return e === `BC` ? 1 - t : t;
}
function he(e) {
  let t = `AD`;
  return e <= 0 && (t = `BC`, e = 1 - e), [t, e];
}
var ge = {
    standard: [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
    leapyear: [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
  },
  k = class {
    fromJulianDay(e) {
      let t = e,
        n = t - me,
        r = Math.floor(n / 146097),
        i = T(n, 146097),
        a = Math.floor(i / 36524),
        o = T(i, 36524),
        s = Math.floor(o / 1461),
        c = T(o, 1461),
        l = Math.floor(c / 365),
        [u, d] = he(r * 400 + a * 100 + s * 4 + l + +(a !== 4 && l !== 4)),
        f = t - E(u, d, 1, 1),
        p = 2;
      t < E(u, d, 3, 1) ? p = 0 : D(d) && (p = 1);
      let m = Math.floor(((f + p) * 12 + 373) / 367);
      return new B(u, d, m, t - E(u, d, m, 1) + 1);
    }
    toJulianDay(e) {
      return E(e.era, e.year, e.month, e.day);
    }
    getDaysInMonth(e) {
      return ge[D(e.year) ? `leapyear` : `standard`][e.month - 1];
    }
    getMonthsInYear(e) {
      return 12;
    }
    getDaysInYear(e) {
      return D(e.year) ? 366 : 365;
    }
    getMaximumMonthsInYear() {
      return 12;
    }
    getMaximumDaysInMonth() {
      return 31;
    }
    getYearsInEra(e) {
      return 9999;
    }
    getEras() {
      return [`BC`, `AD`];
    }
    isInverseEra(e) {
      return e.era === `BC`;
    }
    balanceDate(e) {
      e.year <= 0 && (e.era = e.era === `BC` ? `AD` : `BC`, e.year = 1 - e.year);
    }
    constructor() {
      this.identifier = `gregory`;
    }
  },
  _e = {
    "001": 1,
    AD: 1,
    AE: 6,
    AF: 6,
    AI: 1,
    AL: 1,
    AM: 1,
    AN: 1,
    AR: 1,
    AT: 1,
    AU: 1,
    AX: 1,
    AZ: 1,
    BA: 1,
    BE: 1,
    BG: 1,
    BH: 6,
    BM: 1,
    BN: 1,
    BY: 1,
    CH: 1,
    CL: 1,
    CM: 1,
    CN: 1,
    CR: 1,
    CY: 1,
    CZ: 1,
    DE: 1,
    DJ: 6,
    DK: 1,
    DZ: 6,
    EC: 1,
    EE: 1,
    EG: 6,
    ES: 1,
    FI: 1,
    FJ: 1,
    FO: 1,
    FR: 1,
    GB: 1,
    GE: 1,
    GF: 1,
    GP: 1,
    GR: 1,
    HR: 1,
    HU: 1,
    IE: 1,
    IQ: 6,
    IR: 6,
    IS: 1,
    IT: 1,
    JO: 6,
    KG: 1,
    KW: 6,
    KZ: 1,
    LB: 1,
    LI: 1,
    LK: 1,
    LT: 1,
    LU: 1,
    LV: 1,
    LY: 6,
    MC: 1,
    MD: 1,
    ME: 1,
    MK: 1,
    MN: 1,
    MQ: 1,
    MV: 5,
    MY: 1,
    NL: 1,
    NO: 1,
    NZ: 1,
    OM: 6,
    PL: 1,
    QA: 6,
    RE: 1,
    RO: 1,
    RS: 1,
    RU: 1,
    SD: 6,
    SE: 1,
    SI: 1,
    SK: 1,
    SM: 1,
    SY: 6,
    TJ: 1,
    TM: 1,
    TR: 1,
    UA: 1,
    UY: 1,
    UZ: 1,
    VA: 1,
    VN: 1,
    XK: 1
  };
function ve(e, t) {
  return t = F(t, e.calendar), e.era === t.era && e.year === t.year && e.month === t.month && e.day === t.day;
}
function ye(e, t) {
  return t = F(t, e.calendar), e = A(e), t = A(t), e.era === t.era && e.year === t.year && e.month === t.month;
}
function be(e, t) {
  return Se(e.calendar, t.calendar) && ve(e, t);
}
function xe(e, t) {
  return Se(e.calendar, t.calendar) && ye(e, t);
}
function Se(e, t) {
  return e.isEqual?.(t) ?? t.isEqual?.(e) ?? e.identifier === t.identifier;
}
function Ce(e, t) {
  return ve(e, De(t));
}
var we = {
  sun: 0,
  mon: 1,
  tue: 2,
  wed: 3,
  thu: 4,
  fri: 5,
  sat: 6
};
function Te(e, t, n) {
  let r = e.calendar.toJulianDay(e),
    i = n ? we[n] : Be(t),
    a = Math.ceil(r + 1 - i) % 7;
  return a < 0 && (a += 7), a;
}
function Ee(e) {
  return N(Date.now(), e);
}
function De(e) {
  return Ye(Ee(e));
}
function Oe(e, t) {
  return e.calendar.toJulianDay(e) - t.calendar.toJulianDay(t);
}
function ke(e, t) {
  return Ae(e) - Ae(t);
}
function Ae(e) {
  return e.hour * 36e5 + e.minute * 6e4 + e.second * 1e3 + e.millisecond;
}
var je = null,
  Me = false;
function Ne() {
  return je ??= new Intl.DateTimeFormat().resolvedOptions().timeZone, je;
}
function Pe() {
  return Me;
}
function A(e) {
  return e.subtract({
    days: e.day - 1
  });
}
function Fe(e) {
  return e.add({
    days: e.calendar.getDaysInMonth(e) - e.day
  });
}
function Ie(e) {
  return A(e.subtract({
    months: e.month - 1
  }));
}
var Le = new Map(),
  Re = new Map();
function ze(e) {
  if (Intl.Locale) {
    let t = Le.get(e);
    return t || (t = new Intl.Locale(e).maximize().region, t && Le.set(e, t)), t;
  }
  let t = e.split(`-`)[1];
  return t === `u` ? undefined : t;
}
function Be(e) {
  let t = Re.get(e);
  if (!t) {
    if (Intl.Locale) {
      let n = new Intl.Locale(e);
      if (`getWeekInfo` in n && (t = n.getWeekInfo(), t)) return Re.set(e, t), t.firstDay;
    }
    let n = ze(e);
    if (e.includes(`-fw-`)) {
      let n = e.split(`-fw-`)[1].split(`-`)[0];
      t = n === `mon` ? {
        firstDay: 1
      } : n === `tue` ? {
        firstDay: 2
      } : n === `wed` ? {
        firstDay: 3
      } : n === `thu` ? {
        firstDay: 4
      } : n === `fri` ? {
        firstDay: 5
      } : n === `sat` ? {
        firstDay: 6
      } : {
        firstDay: 0
      };
    } else t = e.includes(`-ca-iso8601`) ? {
      firstDay: 1
    } : {
      firstDay: n && _e[n] || 0
    };
    Re.set(e, t);
  }
  return t.firstDay;
}
function j(e) {
  return e = F(e, new k()), Ve(O(e.era, e.year), e.month, e.day, e.hour, e.minute, e.second, e.millisecond);
}
function Ve(e, t, n, r, i, a, o) {
  let s = new Date();
  return s.setUTCHours(r, i, a, o), s.setUTCFullYear(e, t - 1, n), s.getTime();
}
function He(e, t) {
  if (t === `UTC`) return 0;
  if (e > 0 && t === Ne() && !Pe()) return new Date(e).getTimezoneOffset() * -6e4;
  let {
    year: n,
    month: r,
    day: i,
    hour: a,
    minute: o,
    second: s
  } = We(e, t);
  return Ve(n, r, i, a, o, s, 0) - Math.floor(e / 1e3) * 1e3;
}
var Ue = new Map();
function We(e, t) {
  let n = Ue.get(t);
  n || (n = new Intl.DateTimeFormat(`en-US`, {
    timeZone: t,
    hour12: false,
    era: `short`,
    year: `numeric`,
    month: `numeric`,
    day: `numeric`,
    hour: `numeric`,
    minute: `numeric`,
    second: `numeric`
  }), Ue.set(t, n));
  let r = n.formatToParts(new Date(e)),
    i = {};
  for (let e of r) e.type !== `literal` && (i[e.type] = e.value);
  return {
    year: i.era === `BC` || i.era === `B` ? -i.year + 1 : +i.year,
    month: +i.month,
    day: +i.day,
    hour: i.hour === `24` ? 0 : +i.hour,
    minute: +i.minute,
    second: +i.second
  };
}
var Ge = 864e5;
function Ke(e, t, n, r) {
  return (n === r ? [n] : [n, r]).filter(item => qe(e, t, item));
}
function qe(e, t, n) {
  let r = We(n, t);
  return e.year === r.year && e.month === r.month && e.day === r.day && e.hour === r.hour && e.minute === r.minute && e.second === r.second;
}
function M(e, t, n = `compatible`) {
  let r = P(e);
  if (t === `UTC`) return j(r);
  if (t === Ne() && n === `compatible` && !Pe()) {
    r = F(r, new k());
    let e = new Date(),
      t = O(r.era, r.year);
    return e.setFullYear(t, r.month - 1, r.day), e.setHours(r.hour, r.minute, r.second, r.millisecond), e.getTime();
  }
  let i = j(r),
    a = He(i - Ge, t),
    o = He(i + Ge, t),
    s = Ke(r, t, i - a, i - o);
  if (s.length === 1) return s[0];
  if (s.length > 1) switch (n) {
    case `compatible`:
    case `earlier`:
      return s[0];
    case `later`:
      return s[s.length - 1];
    case `reject`:
      throw RangeError(`Multiple possible absolute times found`);
  }
  switch (n) {
    case `earlier`:
      return Math.min(i - a, i - o);
    case `compatible`:
    case `later`:
      return Math.max(i - a, i - o);
    case `reject`:
      throw RangeError(`No such absolute time found`);
  }
}
function Je(e, t, n = `compatible`) {
  return new Date(M(e, t, n));
}
function N(e, t) {
  let n = He(e, t),
    r = new Date(e + n),
    i = r.getUTCFullYear(),
    a = r.getUTCMonth() + 1,
    o = r.getUTCDate(),
    s = r.getUTCHours(),
    c = r.getUTCMinutes(),
    l = r.getUTCSeconds(),
    u = r.getUTCMilliseconds();
  return new At(i < 1 ? `BC` : `AD`, i < 1 ? -i + 1 : i, a, o, t, n, s, c, l, u);
}
function Ye(e) {
  return new B(e.calendar, e.era, e.year, e.month, e.day);
}
function P(e, t) {
  let n = 0,
    r = 0,
    i = 0,
    a = 0;
  if (`timeZone` in e) ({
    hour: n,
    minute: r,
    second: i,
    millisecond: a
  } = e);else if (`hour` in e && !t) return e;
  return t && ({
    hour: n,
    minute: r,
    second: i,
    millisecond: a
  } = t), new kt(e.calendar, e.era, e.year, e.month, e.day, n, r, i, a);
}
function F(e, t) {
  if (Se(e.calendar, t)) return e;
  let n = t.fromJulianDay(e.calendar.toJulianDay(e)),
    r = e.copy();
  return r.calendar = t, r.era = n.era, r.year = n.year, r.month = n.month, r.day = n.day, L(r), r;
}
function Xe(e, t, n) {
  return e instanceof At ? e.timeZone === t ? e : Qe(e, t) : N(M(e, t, n), t);
}
function Ze(e) {
  let t = j(e) - e.offset;
  return new Date(t);
}
function Qe(e, t) {
  return F(N(j(e) - e.offset, t), e.calendar);
}
var I = 36e5;
function $e(e, t) {
  let n = e.copy(),
    r = `hour` in n ? dt(n, t) : 0;
  et(n, t.years || 0), n.calendar.balanceYearMonth && n.calendar.balanceYearMonth(n, e), n.month += t.months || 0, tt(n), rt(n), n.day += (t.weeks || 0) * 7, n.day += t.days || 0, n.day += r, nt(n), n.calendar.balanceDate && n.calendar.balanceDate(n), n.year < 1 && (n.year = 1, n.month = 1, n.day = 1);
  let i = n.calendar.getYearsInEra(n);
  if (n.year > i) {
    let e = n.calendar.isInverseEra?.(n);
    n.year = i, n.month = e ? 1 : n.calendar.getMonthsInYear(n), n.day = e ? 1 : n.calendar.getDaysInMonth(n);
  }
  n.month < 1 && (n.month = 1, n.day = 1);
  let a = n.calendar.getMonthsInYear(n);
  return n.month > a && (n.month = a, n.day = n.calendar.getDaysInMonth(n)), n.day = Math.max(1, Math.min(n.calendar.getDaysInMonth(n), n.day)), n;
}
function et(e, t) {
  e.calendar.isInverseEra?.(e) && (t = -t), e.year += t;
}
function tt(e) {
  for (; e.month < 1;) et(e, -1), e.month += e.calendar.getMonthsInYear(e);
  let t = 0;
  for (; e.month > (t = e.calendar.getMonthsInYear(e));) e.month -= t, et(e, 1);
}
function nt(e) {
  for (; e.day < 1;) e.month--, tt(e), e.day += e.calendar.getDaysInMonth(e);
  for (; e.day > e.calendar.getDaysInMonth(e);) e.day -= e.calendar.getDaysInMonth(e), e.month++, tt(e);
}
function rt(e) {
  e.month = Math.max(1, Math.min(e.calendar.getMonthsInYear(e), e.month)), e.day = Math.max(1, Math.min(e.calendar.getDaysInMonth(e), e.day));
}
function L(e) {
  e.calendar.constrainDate && e.calendar.constrainDate(e), e.year = Math.max(1, Math.min(e.calendar.getYearsInEra(e), e.year)), rt(e);
}
function it(e) {
  let t = {};
  for (let n in e) typeof e[n] == `number` && (t[n] = -e[n]);
  return t;
}
function at(e, t) {
  return $e(e, it(t));
}
function ot(e, t) {
  let n = e.copy();
  return t.era != null && (n.era = t.era), t.year != null && (n.year = t.year), t.month != null && (n.month = t.month), t.day != null && (n.day = t.day), L(n), n;
}
function st(e, t) {
  let n = e.copy();
  return t.hour != null && (n.hour = t.hour), t.minute != null && (n.minute = t.minute), t.second != null && (n.second = t.second), t.millisecond != null && (n.millisecond = t.millisecond), lt(n), n;
}
function ct(e) {
  e.second += Math.floor(e.millisecond / 1e3), e.millisecond = ut(e.millisecond, 1e3), e.minute += Math.floor(e.second / 60), e.second = ut(e.second, 60), e.hour += Math.floor(e.minute / 60), e.minute = ut(e.minute, 60);
  let t = Math.floor(e.hour / 24);
  return e.hour = ut(e.hour, 24), t;
}
function lt(e) {
  e.millisecond = Math.max(0, Math.min(e.millisecond, 999)), e.second = Math.max(0, Math.min(e.second, 59)), e.minute = Math.max(0, Math.min(e.minute, 59)), e.hour = Math.max(0, Math.min(e.hour, 23));
}
function ut(e, t) {
  let n = e % t;
  return n < 0 && (n += t), n;
}
function dt(e, t) {
  return e.hour += t.hours || 0, e.minute += t.minutes || 0, e.second += t.seconds || 0, e.millisecond += t.milliseconds || 0, ct(e);
}
function ft(e, t, n, r) {
  let i = e.copy();
  switch (t) {
    case `era`:
      {
        let t = e.calendar.getEras(),
          a = t.indexOf(e.era);
        if (a < 0) throw Error(`Invalid era: ` + e.era);
        a = R(a, n, 0, t.length - 1, r?.round), i.era = t[a], L(i);
        break;
      }
    case `year`:
      i.calendar.isInverseEra?.(i) && (n = -n), i.year = R(e.year, n, -1 / 0, 9999, r?.round), i.year === -1 / 0 && (i.year = 1), i.calendar.balanceYearMonth && i.calendar.balanceYearMonth(i, e);
      break;
    case `month`:
      i.month = R(e.month, n, 1, e.calendar.getMonthsInYear(e), r?.round);
      break;
    case `day`:
      i.day = R(e.day, n, 1, e.calendar.getDaysInMonth(e), r?.round);
      break;
    default:
      throw Error(`Unsupported field ` + t);
  }
  return e.calendar.balanceDate && e.calendar.balanceDate(i), L(i), i;
}
function pt(e, t, n, r) {
  let i = e.copy();
  switch (t) {
    case `hour`:
      {
        let hour = e.hour,
          a = 0,
          o = 23;
        if (r?.hourCycle === 12) {
          let e = hour >= 12;
          a = e ? 12 : 0, o = e ? 23 : 11;
        }
        i.hour = R(hour, n, a, o, r?.round);
        break;
      }
    case `minute`:
      i.minute = R(e.minute, n, 0, 59, r?.round);
      break;
    case `second`:
      i.second = R(e.second, n, 0, 59, r?.round);
      break;
    case `millisecond`:
      i.millisecond = R(e.millisecond, n, 0, 999, r?.round);
      break;
    default:
      throw Error(`Unsupported field ` + t);
  }
  return i;
}
function R(e, t, n, r, i = false) {
  if (i) {
    e += Math.sign(t), e < n && (e = r);
    let i = Math.abs(t);
    e = t > 0 ? Math.ceil(e / i) * i : Math.floor(e / i) * i, e > r && (e = n);
  } else e += t, e < n ? e = r - (n - e - 1) : e > r && (e = n + (e - r - 1));
  return e;
}
function mt(e, t) {
  let n;
  return n = t.years != null && t.years !== 0 || t.months != null && t.months !== 0 || t.weeks != null && t.weeks !== 0 || t.days != null && t.days !== 0 ? M($e(P(e), {
    years: t.years,
    months: t.months,
    weeks: t.weeks,
    days: t.days
  }), e.timeZone) : j(e) - e.offset, n += t.milliseconds || 0, n += (t.seconds || 0) * 1e3, n += (t.minutes || 0) * 6e4, n += (t.hours || 0) * 36e5, F(N(n, e.timeZone), e.calendar);
}
function ht(e, t) {
  return mt(e, it(t));
}
function gt(e, t, n, r) {
  switch (t) {
    case `hour`:
      {
        let t = 0,
          i = 23;
        if (r?.hourCycle === 12) {
          let n = e.hour >= 12;
          t = n ? 12 : 0, i = n ? 23 : 11;
        }
        let a = P(e),
          o = F(st(a, {
            hour: t
          }), new k()),
          s = [M(o, e.timeZone, `earlier`), M(o, e.timeZone, `later`)].filter(item => N(item, e.timeZone).day === o.day)[0],
          c = F(st(a, {
            hour: i
          }), new k()),
          l = [M(c, e.timeZone, `earlier`), M(c, e.timeZone, `later`)].filter(item => N(item, e.timeZone).day === c.day).pop(),
          u = j(e) - e.offset,
          d = Math.floor(u / I),
          f = u % I;
        return u = R(d, n, Math.floor(s / I), Math.floor(l / I), r?.round) * I + f, F(N(u, e.timeZone), e.calendar);
      }
    case `minute`:
    case `second`:
    case `millisecond`:
      return pt(e, t, n, r);
    case `era`:
    case `year`:
    case `month`:
    case `day`:
      return F(N(M(ft(P(e), t, n, r), e.timeZone), e.timeZone), e.calendar);
    default:
      throw Error(`Unsupported field ` + t);
  }
}
function _t(e, t, n) {
  let r = P(e),
    i = st(ot(r, t), t);
  return i.compare(r) === 0 ? e : F(N(M(i, e.timeZone, n), e.timeZone), e.calendar);
}
var vt = /^([+-]\d{6}|\d{4})-(\d{2})-(\d{2})$/,
  yt = /^([+-]\d{6}|\d{4})-(\d{2})-(\d{2})(?:T(\d{2}))?(?::(\d{2}))?(?::(\d{2}))?(\.\d+)?$/,
  bt = /^([+-]\d{6}|\d{4})-(\d{2})-(\d{2})(?:T(\d{2}))?(?::(\d{2}))?(?::(\d{2}))?(\.\d+)?(?:(?:([+-]\d{2})(?::?(\d{2}))?)|Z)$/;
function xt(e) {
  let t = e.match(vt);
  if (!t) throw bt.test(e) ? Error(`Invalid ISO 8601 date string: ${e}. Use parseAbsolute() instead.`) : Error(`Invalid ISO 8601 date string: ` + e);
  let n = new B(z(t[1], 0, 9999), z(t[2], 1, 12), 1);
  return n.day = z(t[3], 1, n.calendar.getDaysInMonth(n)), n;
}
function St(e) {
  let t = e.match(yt);
  if (!t) throw bt.test(e) ? Error(`Invalid ISO 8601 date time string: ${e}. Use parseAbsolute() instead.`) : Error(`Invalid ISO 8601 date time string: ` + e);
  let n = z(t[1], -9999, 9999),
    r = new kt(n < 1 ? `BC` : `AD`, n < 1 ? -n + 1 : n, z(t[2], 1, 12), 1, t[4] ? z(t[4], 0, 23) : 0, t[5] ? z(t[5], 0, 59) : 0, t[6] ? z(t[6], 0, 59) : 0, t[7] ? z(t[7], 0, 1 / 0) * 1e3 : 0);
  return r.day = z(t[3], 0, r.calendar.getDaysInMonth(r)), r;
}
function z(e, t, n) {
  let r = Number(e);
  if (r < t || r > n) throw RangeError(`Value out of range: ${t} <= ${r} <= ${n}`);
  return r;
}
function Ct(e) {
  return `${String(e.hour).padStart(2, `0`)}:${String(e.minute).padStart(2, `0`)}:${String(e.second).padStart(2, `0`)}${e.millisecond ? String(e.millisecond / 1e3).slice(1) : ``}`;
}
function wt(e) {
  let t = F(e, new k()),
    n;
  return n = t.era === `BC` ? t.year === 1 ? `0000` : `-` + String(Math.abs(1 - t.year)).padStart(6, `00`) : String(t.year).padStart(4, `0`), `${n}-${String(t.month).padStart(2, `0`)}-${String(t.day).padStart(2, `0`)}`;
}
function Tt(e) {
  return `${wt(e)}T${Ct(e)}`;
}
function Et(e) {
  let t = Math.sign(e) < 0 ? `-` : `+`;
  e = Math.abs(e);
  let n = Math.floor(e / 36e5),
    r = Math.floor(e % 36e5 / 6e4),
    i = Math.floor(e % 36e5 % 6e4 / 1e3),
    a = `${t}${String(n).padStart(2, `0`)}:${String(r).padStart(2, `0`)}`;
  return i !== 0 && (a += `:${String(i).padStart(2, `0`)}`), a;
}
function Dt(e) {
  return `${Tt(e)}${Et(e.offset)}[${e.timeZone}]`;
}
function Ot(e) {
  let t = typeof e[0] == `object` ? e.shift() : new k(),
    n;
  if (typeof e[0] == `string`) n = e.shift();else {
    let e = t.getEras();
    n = e[e.length - 1];
  }
  let r = e.shift(),
    i = e.shift(),
    a = e.shift();
  return [t, n, r, i, a];
}
var B = class e {
    constructor(...e) {
      let [t, n, r, i, a] = Ot(e);
      this.calendar = t, this.era = n, this.year = r, this.month = i, this.day = a, L(this);
    }
    copy() {
      return this.era ? new e(this.calendar, this.era, this.year, this.month, this.day) : new e(this.calendar, this.year, this.month, this.day);
    }
    add(e) {
      return $e(this, e);
    }
    subtract(e) {
      return at(this, e);
    }
    set(e) {
      return ot(this, e);
    }
    cycle(e, t, n) {
      return ft(this, e, t, n);
    }
    toDate(e) {
      return Je(this, e);
    }
    toString() {
      return wt(this);
    }
    compare(e) {
      return Oe(this, e);
    }
  },
  kt = class e {
    constructor(...e) {
      let [t, n, r, i, a] = Ot(e);
      this.calendar = t, this.era = n, this.year = r, this.month = i, this.day = a, this.hour = e.shift() || 0, this.minute = e.shift() || 0, this.second = e.shift() || 0, this.millisecond = e.shift() || 0, L(this);
    }
    copy() {
      return this.era ? new e(this.calendar, this.era, this.year, this.month, this.day, this.hour, this.minute, this.second, this.millisecond) : new e(this.calendar, this.year, this.month, this.day, this.hour, this.minute, this.second, this.millisecond);
    }
    add(e) {
      return $e(this, e);
    }
    subtract(e) {
      return at(this, e);
    }
    set(e) {
      return ot(st(this, e), e);
    }
    cycle(e, t, n) {
      switch (e) {
        case `era`:
        case `year`:
        case `month`:
        case `day`:
          return ft(this, e, t, n);
        default:
          return pt(this, e, t, n);
      }
    }
    toDate(e, t) {
      return Je(this, e, t);
    }
    toString() {
      return Tt(this);
    }
    compare(e) {
      let t = Oe(this, e);
      return t === 0 ? ke(this, P(e)) : t;
    }
  },
  At = class e {
    constructor(...e) {
      let [t, n, r, i, a] = Ot(e),
        o = e.shift(),
        s = e.shift();
      this.calendar = t, this.era = n, this.year = r, this.month = i, this.day = a, this.timeZone = o, this.offset = s, this.hour = e.shift() || 0, this.minute = e.shift() || 0, this.second = e.shift() || 0, this.millisecond = e.shift() || 0, L(this);
    }
    copy() {
      return this.era ? new e(this.calendar, this.era, this.year, this.month, this.day, this.timeZone, this.offset, this.hour, this.minute, this.second, this.millisecond) : new e(this.calendar, this.year, this.month, this.day, this.timeZone, this.offset, this.hour, this.minute, this.second, this.millisecond);
    }
    add(e) {
      return mt(this, e);
    }
    subtract(e) {
      return ht(this, e);
    }
    set(e, t) {
      return _t(this, e, t);
    }
    cycle(e, t, n) {
      return gt(this, e, t, n);
    }
    toDate() {
      return Ze(this);
    }
    toString() {
      return Dt(this);
    }
    toAbsoluteString() {
      return this.toDate().toISOString();
    }
    compare(e) {
      return this.toDate().getTime() - Xe(e, this.timeZone).toDate().getTime();
    }
  },
  V = [[1868, 9, 8], [1912, 7, 30], [1926, 12, 25], [1989, 1, 8], [2019, 5, 1]],
  jt = [[1912, 7, 29], [1926, 12, 24], [1989, 1, 7], [2019, 4, 30]],
  Mt = [1867, 1911, 1925, 1988, 2018],
  H = [`meiji`, `taisho`, `showa`, `heisei`, `reiwa`];
function Nt(e) {
  let t = V.findIndex(([t, n, r]) => e.year < t || e.year === t && e.month < n || e.year === t && e.month === n && e.day < r);
  return t === -1 ? V.length - 1 : t === 0 ? 0 : t - 1;
}
function Pt(e) {
  let t = Mt[H.indexOf(e.era)];
  if (!t) throw Error(`Unknown era: ` + e.era);
  return new B(e.year + t, e.month, e.day);
}
var Ft = class extends k {
  fromJulianDay(e) {
    let t = super.fromJulianDay(e),
      n = Nt(t);
    return new B(this, H[n], t.year - Mt[n], t.month, t.day);
  }
  toJulianDay(e) {
    return super.toJulianDay(Pt(e));
  }
  balanceDate(e) {
    let t = Pt(e),
      n = Nt(t);
    H[n] !== e.era && (e.era = H[n], e.year = t.year - Mt[n]), this.constrainDate(e);
  }
  constrainDate(e) {
    let t = H.indexOf(e.era),
      n = jt[t];
    if (n != null) {
      let [r, i, a] = n,
        o = r - Mt[t];
      e.year = Math.max(1, Math.min(o, e.year)), e.year === o && (e.month = Math.min(i, e.month), e.month === i && (e.day = Math.min(a, e.day)));
    }
    if (e.year === 1 && t >= 0) {
      let [, n, r] = V[t];
      e.month = Math.max(n, e.month), e.month === n && (e.day = Math.max(r, e.day));
    }
  }
  getEras() {
    return H;
  }
  getYearsInEra(e) {
    let t = H.indexOf(e.era),
      n = V[t],
      r = V[t + 1];
    if (r == null) return 9999 - n[0] + 1;
    let i = r[0] - n[0];
    return (e.month < r[1] || e.month === r[1] && e.day < r[2]) && i++, i;
  }
  getDaysInMonth(e) {
    return super.getDaysInMonth(Pt(e));
  }
  getMinimumMonthInYear(e) {
    let t = It(e);
    return t ? t[1] : 1;
  }
  getMinimumDayInMonth(e) {
    let t = It(e);
    return t && e.month === t[1] ? t[2] : 1;
  }
  constructor(...e) {
    super(...e), this.identifier = `japanese`;
  }
};
function It(e) {
  if (e.year === 1) return V[H.indexOf(e.era)];
}
var Lt = -543,
  Rt = class extends k {
    fromJulianDay(e) {
      let t = super.fromJulianDay(e),
        n = O(t.era, t.year);
      return new B(this, n - Lt, t.month, t.day);
    }
    toJulianDay(e) {
      return super.toJulianDay(zt(e));
    }
    getEras() {
      return [`BE`];
    }
    getDaysInMonth(e) {
      return super.getDaysInMonth(zt(e));
    }
    balanceDate() {}
    constructor(...e) {
      super(...e), this.identifier = `buddhist`;
    }
  };
function zt(e) {
  let [t, n] = he(e.year + Lt);
  return new B(t, n, e.month, e.day);
}
var Bt = 1911;
function Vt(e) {
  return e.era === `minguo` ? e.year + Bt : 1 - e.year + Bt;
}
function Ht(e) {
  let t = e - Bt;
  return t > 0 ? [`minguo`, t] : [`before_minguo`, 1 - t];
}
var Ut = class extends k {
  fromJulianDay(e) {
    let t = super.fromJulianDay(e),
      [n, r] = Ht(O(t.era, t.year));
    return new B(this, n, r, t.month, t.day);
  }
  toJulianDay(e) {
    return super.toJulianDay(Wt(e));
  }
  getEras() {
    return [`before_minguo`, `minguo`];
  }
  balanceDate(e) {
    let [t, n] = Ht(Vt(e));
    e.era = t, e.year = n;
  }
  isInverseEra(e) {
    return e.era === `before_minguo`;
  }
  getDaysInMonth(e) {
    return super.getDaysInMonth(Wt(e));
  }
  getYearsInEra(e) {
    return e.era === `before_minguo` ? 9999 : 8088;
  }
  constructor(...e) {
    super(...e), this.identifier = `roc`;
  }
};
function Wt(e) {
  let [t, n] = he(Vt(e));
  return new B(t, n, e.month, e.day);
}
var Gt = 1948320,
  Kt = [0, 31, 62, 93, 124, 155, 186, 216, 246, 276, 306, 336],
  qt = class {
    fromJulianDay(e) {
      let t = e - Gt,
        n = 1 + Math.floor((33 * t + 3) / 12053),
        r = t - (365 * (n - 1) + Math.floor((8 * n + 21) / 33)),
        i = Math.floor(r < 216 ? r / 31 : (r - 6) / 30),
        a = r - Kt[i] + 1;
      return new B(this, n, i + 1, a);
    }
    toJulianDay(e) {
      let t = 1948319 + 365 * (e.year - 1) + Math.floor((8 * e.year + 21) / 33);
      return t += Kt[e.month - 1], t += e.day, t;
    }
    getMonthsInYear() {
      return 12;
    }
    getDaysInMonth(e) {
      return e.month <= 6 ? 31 : e.month <= 11 || T(25 * e.year + 11, 33) < 8 ? 30 : 29;
    }
    getMaximumMonthsInYear() {
      return 12;
    }
    getMaximumDaysInMonth() {
      return 31;
    }
    getEras() {
      return [`AP`];
    }
    getYearsInEra() {
      return 9377;
    }
    constructor() {
      this.identifier = `persian`;
    }
  },
  Jt = 78,
  Yt = 80,
  Xt = class extends k {
    fromJulianDay(e) {
      let t = super.fromJulianDay(e),
        n = t.year - Jt,
        r = e - E(t.era, t.year, 1, 1),
        i;
      r < Yt ? (n--, i = D(t.year - 1) ? 31 : 30, r += i + 155 + 90 + 10) : (i = D(t.year) ? 31 : 30, r -= Yt);
      let a, o;
      if (r < i) a = 1, o = r + 1;else {
        let e = r - i;
        e < 155 ? (a = Math.floor(e / 31) + 2, o = e % 31 + 1) : (e -= 155, a = Math.floor(e / 30) + 7, o = e % 30 + 1);
      }
      return new B(this, n, a, o);
    }
    toJulianDay(e) {
      let [t, n] = he(e.year + Jt),
        r,
        i;
      return D(n) ? (r = 31, i = E(t, n, 3, 21)) : (r = 30, i = E(t, n, 3, 22)), e.month === 1 ? i + e.day - 1 : (i += r + Math.min(e.month - 2, 5) * 31, e.month >= 8 && (i += (e.month - 7) * 30), i += e.day - 1, i);
    }
    getDaysInMonth(e) {
      return e.month === 1 && D(e.year + Jt) || e.month >= 2 && e.month <= 6 ? 31 : 30;
    }
    getYearsInEra() {
      return 9919;
    }
    getEras() {
      return [`saka`];
    }
    balanceDate() {}
    constructor(...e) {
      super(...e), this.identifier = `indian`;
    }
  },
  Zt = 1948440,
  Qt = 1948439,
  U = 1300,
  W = 1600,
  $t = 460322;
function en(e, t, n, r) {
  return r + Math.ceil(29.5 * (n - 1)) + (t - 1) * 354 + Math.floor((3 + 11 * t) / 30) + e - 1;
}
function tn(e, t, n) {
  let r = Math.floor((30 * (n - t) + 10646) / 10631),
    i = Math.min(12, Math.ceil((n - (29 + en(t, r, 1, 1))) / 29.5) + 1);
  return new B(e, r, i, n - en(t, r, i, 1) + 1);
}
function nn(e) {
  return (14 + 11 * e) % 30 < 11;
}
var rn = class {
    fromJulianDay(e) {
      return tn(this, Zt, e);
    }
    toJulianDay(e) {
      return en(Zt, e.year, e.month, e.day);
    }
    getDaysInMonth(e) {
      let t = 29 + e.month % 2;
      return e.month === 12 && nn(e.year) && t++, t;
    }
    getMonthsInYear() {
      return 12;
    }
    getDaysInYear(e) {
      return nn(e.year) ? 355 : 354;
    }
    getMaximumMonthsInYear() {
      return 12;
    }
    getMaximumDaysInMonth() {
      return 30;
    }
    getYearsInEra() {
      return 9665;
    }
    getEras() {
      return [`AH`];
    }
    constructor() {
      this.identifier = `islamic-civil`;
    }
  },
  an = class extends rn {
    fromJulianDay(e) {
      return tn(this, Qt, e);
    }
    toJulianDay(e) {
      return en(Qt, e.year, e.month, e.day);
    }
    constructor(...e) {
      super(...e), this.identifier = `islamic-tbla`;
    }
  },
  on = `qgpUDckO1AbqBmwDrQpVBakGkgepC9QF2gpcBS0NlQZKB1QLagutBa4ETwoXBYsGpQbVCtYCWwmdBE0KJg2VDawFtgm6AlsKKwWVCsoG6Qr0AnYJtgJWCcoKpAvSC9kF3AJtCU0FpQpSC6ULtAW2CVcFlwJLBaMGUgdlC2oFqworBZUMSg2lDcoF1gpXCasESwmlClILagt1BXYCtwhbBFUFqQW0BdoJ3QRuAjYJqgpUDbIN1QXaAlsJqwRVCkkLZAtxC7QFtQpVCiUNkg7JDtQG6QprCasEkwpJDaQNsg25CroEWworBZUKKgtVC1wFvQQ9Ah0JlQpKC1oLbQW2AjsJmwRVBqkGVAdqC2wFrQpVBSkLkgupC9QF2gpaBasKlQVJB2QHqgu1BbYCVgpNDiULUgtqC60FrgIvCZcESwalBqwG1gpdBZ0ETQoWDZUNqgW1BdoCWwmtBJUFygbkBuoK9QS2AlYJqgpUC9IL2QXqAm0JrQSVCkoLpQuyBbUJ1gSXCkcFkwZJB1ULagVrCisFiwpGDaMNygXWCtsEawJLCaUKUgtpC3UFdgG3CFsCKwVlBbQF2gntBG0BtgimClINqQ3UBdoKWwmrBFMGKQdiB6kLsgW1ClUFJQuSDckO0gbpCmsFqwRVCikNVA2qDbUJugQ7CpsETQqqCtUK2gJdCV4ELgqaDFUNsga5BroEXQotBZUKUguoC7QLuQXaAloJSgukDdEO6AZqC20FNQWVBkoNqA3UDdoGWwWdAisGFQtKC5ULqgWuCi4JjwwnBZUGqgbWCl0FnQI=`,
  sn,
  G;
function cn(e) {
  return $t + G[e - U];
}
function ln(e, t) {
  let n = e - U,
    r = 1 << 11 - (t - 1);
  return (sn[n] & r) === 0 ? 29 : 30;
}
function un(e, t) {
  let n = cn(e);
  for (let r = 1; r < t; r++) n += ln(e, r);
  return n;
}
function dn(e) {
  return G[e + 1 - U] - G[e - U];
}
var fn = class extends rn {
    constructor() {
      if (super(), this.identifier = `islamic-umalqura`, sn ||= new Uint16Array(Uint8Array.from(atob(on), e => e.charCodeAt(0)).buffer), !G) {
        G = new Uint32Array(301);
        let e = 0;
        for (let t = U; t <= W; t++) {
          G[t - U] = e;
          for (let n = 1; n <= 12; n++) e += ln(t, n);
        }
      }
    }
    fromJulianDay(e) {
      let t = e - Zt,
        n = cn(U),
        r = cn(W);
      if (t < n || t > r) return super.fromJulianDay(e);
      {
        let e = 1299,
          n = 1,
          r = 1;
        for (; r > 0;) {
          e++, r = t - cn(e) + 1;
          let i = dn(e);
          if (r === i) {
            n = 12;
            break;
          }
          if (r < i) {
            let t = ln(e, n);
            for (n = 1; r > t;) r -= t, n++, t = ln(e, n);
            break;
          }
        }
        return new B(this, e, n, t - un(e, n) + 1);
      }
    }
    toJulianDay(e) {
      return e.year < U || e.year > W ? super.toJulianDay(e) : Zt + un(e.year, e.month) + (e.day - 1);
    }
    getDaysInMonth(e) {
      return e.year < U || e.year > W ? super.getDaysInMonth(e) : ln(e.year, e.month);
    }
    getDaysInYear(e) {
      return e.year < U || e.year > W ? super.getDaysInYear(e) : dn(e.year);
    }
  },
  pn = 347997,
  mn = 25920,
  hn = 765433;
function K(e) {
  return T(e * 7 + 1, 19) < 7;
}
function gn(e) {
  let t = Math.floor((235 * e - 234) / 19),
    n = 12084 + 13753 * t,
    r = t * 29 + Math.floor(n / 25920);
  return T(3 * (r + 1), 7) < 3 && (r += 1), r;
}
function _n(e) {
  let t = gn(e - 1),
    n = gn(e);
  return gn(e + 1) - n === 356 ? 2 : +(n - t === 382);
}
function q(e) {
  return gn(e) + _n(e);
}
function vn(e) {
  return q(e + 1) - q(e);
}
function yn(e) {
  let t = vn(e);
  switch (t > 380 && (t -= 30), t) {
    case 353:
      return 0;
    case 354:
      return 1;
    case 355:
      return 2;
  }
}
function bn(e, t) {
  if (t >= 6 && !K(e) && t++, t === 4 || t === 7 || t === 9 || t === 11 || t === 13) return 29;
  let n = yn(e);
  return t === 2 ? n === 2 ? 30 : 29 : t === 3 ? n === 0 ? 29 : 30 : t === 6 ? K(e) ? 30 : 0 : 30;
}
var xn = class {
    fromJulianDay(e) {
      let t = e - pn,
        n = t * mn / hn,
        r = Math.floor((19 * n + 234) / 235) + 1,
        i = q(r),
        a = Math.floor(t - i);
      for (; a < 1;) r--, i = q(r), a = Math.floor(t - i);
      let o = 1,
        s = 0;
      for (; s < a;) s += bn(r, o), o++;
      o--, s -= bn(r, o);
      let c = a - s;
      return new B(this, r, o, c);
    }
    toJulianDay(e) {
      let t = q(e.year);
      for (let n = 1; n < e.month; n++) t += bn(e.year, n);
      return t + e.day + pn;
    }
    getDaysInMonth(e) {
      return bn(e.year, e.month);
    }
    getMonthsInYear(e) {
      return K(e.year) ? 13 : 12;
    }
    getDaysInYear(e) {
      return vn(e.year);
    }
    getMaximumMonthsInYear() {
      return 13;
    }
    getMaximumDaysInMonth() {
      return 30;
    }
    getYearsInEra() {
      return 9999;
    }
    getEras() {
      return [`AM`];
    }
    balanceYearMonth(e, t) {
      t.year !== e.year && (K(t.year) && !K(e.year) && t.month > 6 ? e.month-- : !K(t.year) && K(e.year) && t.month > 6 && e.month++);
    }
    constructor() {
      this.identifier = `hebrew`;
    }
  },
  Sn = 1723856,
  Cn = 1824665,
  wn = 5500;
function Tn(e, t, n, r) {
  return e + 365 * t + Math.floor(t / 4) + 30 * (n - 1) + r - 1;
}
function En(e, t) {
  let n = Math.floor(4 * (t - e) / 1461);
  t >= Tn(e, n + 1, 1, 1) && n++;
  let r = 1 + Math.floor((t - Tn(e, n, 1, 1)) / 30),
    i = t + 1 - Tn(e, n, r, 1);
  return [n, r, i];
}
function Dn(e) {
  return Math.floor(e % 4 / 3);
}
function On(e, t) {
  return t % 13 == 0 ? Dn(e) + 5 : 30;
}
var kn = class {
    fromJulianDay(e) {
      let [t, n, r] = En(Sn, e),
        i = `AM`;
      return t <= 0 && (i = `AA`, t += wn), new B(this, i, t, n, r);
    }
    toJulianDay(e) {
      let year = e.year;
      return e.era === `AA` && (year -= wn), Tn(Sn, year, e.month, e.day);
    }
    getDaysInMonth(e) {
      return On(e.year, e.month);
    }
    getMonthsInYear() {
      return 13;
    }
    getDaysInYear(e) {
      return 365 + Dn(e.year);
    }
    getMaximumMonthsInYear() {
      return 13;
    }
    getMaximumDaysInMonth() {
      return 30;
    }
    getYearsInEra(e) {
      return e.era === `AA` ? 9999 : 9991;
    }
    getEras() {
      return [`AA`, `AM`];
    }
    constructor() {
      this.identifier = `ethiopic`;
    }
  },
  An = class extends kn {
    fromJulianDay(e) {
      let [t, n, r] = En(Sn, e);
      return t += wn, new B(this, `AA`, t, n, r);
    }
    getEras() {
      return [`AA`];
    }
    getYearsInEra() {
      return 9999;
    }
    constructor(...e) {
      super(...e), this.identifier = `ethioaa`;
    }
  },
  jn = class extends kn {
    fromJulianDay(e) {
      let [t, n, r] = En(Cn, e),
        i = `CE`;
      return t <= 0 && (i = `BCE`, t = 1 - t), new B(this, i, t, n, r);
    }
    toJulianDay(e) {
      let year = e.year;
      return e.era === `BCE` && (year = 1 - year), Tn(Cn, year, e.month, e.day);
    }
    getDaysInMonth(e) {
      let year = e.year;
      return e.era === `BCE` && (year = 1 - year), On(year, e.month);
    }
    isInverseEra(e) {
      return e.era === `BCE`;
    }
    balanceDate(e) {
      e.year <= 0 && (e.era = e.era === `BCE` ? `CE` : `BCE`, e.year = 1 - e.year);
    }
    getEras() {
      return [`BCE`, `CE`];
    }
    getYearsInEra(e) {
      return e.era === `BCE` ? 9999 : 9715;
    }
    constructor(...e) {
      super(...e), this.identifier = `coptic`;
    }
  };
function Mn(e) {
  switch (e) {
    case `buddhist`:
      return new Rt();
    case `ethiopic`:
      return new kn();
    case `ethioaa`:
      return new An();
    case `coptic`:
      return new jn();
    case `hebrew`:
      return new xn();
    case `indian`:
      return new Xt();
    case `islamic-civil`:
      return new rn();
    case `islamic-tbla`:
      return new an();
    case `islamic-umalqura`:
      return new fn();
    case `japanese`:
      return new Ft();
    case `persian`:
      return new qt();
    case `roc`:
      return new Ut();
    default:
      return new k();
  }
}
var Nn = new Map(),
  J = class {
    constructor(e, t = {}) {
      this.formatter = Fn(e, t), this.options = t;
    }
    format(e) {
      return this.formatter.format(e);
    }
    formatToParts(e) {
      return this.formatter.formatToParts(e);
    }
    formatRange(e, t) {
      if (typeof this.formatter.formatRange == `function`) return this.formatter.formatRange(e, t);
      if (t < e) throw RangeError(`End date must be >= start date`);
      return `${this.formatter.format(e)}null${this.formatter.format(t)}`;
    }
    formatRangeToParts(e, t) {
      if (typeof this.formatter.formatRangeToParts == `function`) return this.formatter.formatRangeToParts(e, t);
      if (t < e) throw RangeError(`End date must be >= start date`);
      let n = this.formatter.formatToParts(e),
        r = this.formatter.formatToParts(t);
      return [...n.map(item => ({
        ...item,
        source: `startRange`
      })), {
        type: `literal`,
        value: ` – `,
        source: `shared`
      }, ...r.map(item => ({
        ...item,
        source: `endRange`
      }))];
    }
    resolvedOptions() {
      let e = this.formatter.resolvedOptions();
      return zn() && (this.resolvedHourCycle ||= Bn(e.locale, this.options), e.hourCycle = this.resolvedHourCycle, e.hour12 = this.resolvedHourCycle === `h11` || this.resolvedHourCycle === `h12`), e.calendar === `ethiopic-amete-alem` && (e.calendar = `ethioaa`), e;
    }
  },
  Pn = {
    true: {
      ja: `h11`
    },
    false: {}
  };
function Fn(e, t = {}) {
  if (typeof t.hour12 == `boolean` && Ln()) {
    t = {
      ...t
    };
    let n = Pn[String(t.hour12)][e.split(`-`)[0]],
      r = t.hour12 ? `h12` : `h23`;
    t.hourCycle = n ?? r, delete t.hour12;
  }
  let n = e + (t ? Object.entries(t).sort((left, right) => left[0] < right[0] ? -1 : 1).join() : ``);
  if (Nn.has(n)) return Nn.get(n);
  let r = new Intl.DateTimeFormat(e, t);
  return Nn.set(n, r), r;
}
var In = null;
function Ln() {
  return In ??= new Intl.DateTimeFormat(`en-US`, {
    hour: `numeric`,
    hour12: false
  }).format(new Date(2020, 2, 3, 0)) === `24`, In;
}
var Rn = null;
function zn() {
  return Rn ??= new Intl.DateTimeFormat(`fr`, {
    hour: `numeric`,
    hour12: false
  }).resolvedOptions().hourCycle === `h12`, Rn;
}
function Bn(e, t) {
  if (!t.timeStyle && !t.hour) return;
  e = e.replace(/(-u-)?-nu-[a-zA-Z0-9]+/, ``), e += (e.includes(`-u-`) ? `` : `-u`) + `-nu-latn`;
  let n = Fn(e, {
      ...t,
      timeZone: undefined
    }),
    r = parseInt(n.formatToParts(new Date(2020, 2, 3, 0)).find(item => item.type === `hour`).value, 10),
    i = parseInt(n.formatToParts(new Date(2020, 2, 3, 23)).find(item => item.type === `hour`).value, 10);
  if (r === 0 && i === 23) return `h23`;
  if (r === 24 && i === 23) return `h24`;
  if (r === 0 && i === 11) return `h11`;
  if (r === 12 && i === 11) return `h12`;
  throw Error(`Unexpected hour cycle result`);
}
function Y(e, t = Ne()) {
  return Hn(e) ? e.toDate() : e.toDate(t);
}
function Vn(e) {
  return e instanceof kt;
}
function Hn(e) {
  return e instanceof At;
}
function Un(e) {
  return Vn(e) || Hn(e);
}
function X(e) {
  if (e instanceof Date) {
    let t = e.getFullYear(),
      n = e.getMonth() + 1;
    return new Date(t, n, 0).getDate();
  }
  return e.set({
    day: 100
  }).day;
}
function Z(e, t) {
  return e.compare(t) < 0;
}
function Wn(e, t) {
  return e.compare(t) > 0;
}
function Gn(e, t) {
  return e.compare(t) <= 0;
}
function Kn(e, t) {
  return e.compare(t) >= 0;
}
function qn(e, t, n) {
  return Kn(e, t) && Gn(e, n);
}
function Jn(e, t, n) {
  return Wn(e, t) && Z(e, n);
}
function Yn(e, t, n) {
  let r = Te(e, n, `sun`);
  return t > r ? e.subtract({
    days: r + 7 - t
  }) : t === r ? e : e.subtract({
    days: r - t
  });
}
function Xn(e, t, n) {
  let r = Te(e, n, `sun`),
    i = t === 0 ? 6 : t - 1;
  return r === i ? e : r > i ? e.add({
    days: 7 - r + i
  }) : e.add({
    days: i - r
  });
}
function Zn(e, t, n, r, i) {
  if (n === undefined && r === undefined && i === undefined) return true;
  let a = e.add({
    days: 1
  });
  if ((r?.(a) || n?.(a)) && !i?.(a)) return false;
  let o = t;
  for (; a.compare(o) < 0;) if (a = a.add({
    days: 1
  }), (r?.(a) || n?.(a)) && !i?.(a)) return false;
  return true;
}
function Qn(e) {
  let {
    defaultValue: t,
    defaultPlaceholder: n,
    granularity: r = `day`,
    locale: i = `en`
  } = e;
  if (Array.isArray(t) && t.length) return t.at(-1).copy();
  if (t && !Array.isArray(t)) return t.copy();
  if (n) return n.copy();
  let a = new Date(),
    o = a.getFullYear(),
    s = a.getMonth() + 1,
    c = a.getDate(),
    l = [`hour`, `minute`, `second`],
    u = Mn(new J(i).resolvedOptions().calendar);
  return l.includes(r ?? `day`) ? F(new kt(o, s, c, 0, 0, 0), u) : F(new B(o, s, c), u);
}
function $n(e, t) {
  let n = [];
  for (let r = 0; r < e.length; r += t) n.push(e.slice(r, r + t));
  return n;
}
function er(e) {
  let t = e.querySelector(`[data-selected]`);
  if (t) return t.focus();
  let n = e.querySelector(`[data-today]`);
  if (n) return n.focus();
  let r = e.querySelector(`[data-value]:not([data-outside-view]):not([data-disabled])`);
  if (r) return r.focus();
}
function tr(e, t) {
  let n = [],
    r = e.add({
      days: 1
    }),
    i = t;
  for (; r.compare(i) < 0;) n.push(r), r = r.add({
    days: 1
  });
  return n;
}
function nr(e) {
  let {
      dateObj: t,
      weekStartsOn: n,
      fixedWeeks: r,
      locale: i
    } = e,
    a = X(t),
    o = Array.from({
      length: a
    }, (e, n) => t.set({
      day: n + 1
    })),
    s = A(t),
    c = Fe(t),
    l = Yn(s, n, i),
    u = Xn(c, n, i),
    d = tr(l.subtract({
      days: 1
    }), s),
    f = tr(c, u.add({
      days: 1
    })),
    p = d.length + o.length + f.length;
  if (r && p < 42) {
    let e = 42 - p,
      n = f.at(-1);
    n ||= Fe(t);
    let r = Array.from({
      length: e
    }, (e, t) => {
      let r = t + 1;
      return n.add({
        days: r
      });
    });
    f.push(...r);
  }
  let m = d.concat(o, f);
  return {
    value: t,
    cells: m,
    rows: $n(m, 7)
  };
}
function rr(e) {
  let {
    dateObj: t,
    numberOfMonths: n = 1,
    pagedNavigation: r = false
  } = e;
  return n && r ? Array.from({
    length: Math.floor(12 / n)
  }, (e, r) => A(t.set({
    month: r * n + 1
  }))) : Array.from({
    length: 12
  }, (e, n) => A(t.set({
    month: n + 1
  })));
}
function Q(e) {
  let {
      numberOfMonths: t,
      dateObj: n,
      ...r
    } = e,
    i = [];
  if (!t || t === 1) return i.push(nr({
    ...r,
    dateObj: n
  })), i;
  i.push(nr({
    ...r,
    dateObj: n
  }));
  for (let e = 1; e < t; e++) {
    let t = n.add({
      months: e
    });
    i.push(nr({
      ...r,
      dateObj: t
    }));
  }
  return i;
}
function ir({
  start: e,
  end: t
}) {
  let n = [];
  if (!e || !t) return n;
  let r = Ie(e);
  for (; r.compare(t) <= 0;) n.push(r), r = Ie(r.add({
    years: 1
  }));
  return n;
}
function ar(e) {
  return (1 - Te(new B(2025, 1, 6), e) + 7) % 7;
}
function or(e, t = {}) {
  let n = b(e);
  function r() {
    return n.value;
  }
  function i(e) {
    n.value = e;
  }
  function a(e, r) {
    return new J(n.value, {
      ...t,
      ...r
    }).format(e);
  }
  function o(e, t = true) {
    return Un(e) && t ? a(Y(e), {
      dateStyle: `long`,
      timeStyle: `long`
    }) : a(Y(e), {
      dateStyle: `long`
    });
  }
  function s(e, r = {}) {
    return new J(n.value, {
      ...t,
      month: `long`,
      year: `numeric`,
      ...r
    }).format(e);
  }
  function c(e, r = {}) {
    return new J(n.value, {
      ...t,
      month: `long`,
      ...r
    }).format(e);
  }
  function l() {
    let e = De(Ne());
    return [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(item => ({
      label: c(Y(e.set({
        month: item
      }))),
      value: item
    }));
  }
  function u(e, r = {}) {
    return new J(n.value, {
      ...t,
      year: `numeric`,
      ...r
    }).format(e);
  }
  function d(e, r) {
    return Hn(e) ? new J(n.value, {
      ...t,
      ...r,
      timeZone: e.timeZone
    }).formatToParts(Y(e)) : new J(n.value, {
      ...t,
      ...r
    }).formatToParts(Y(e));
  }
  function f(e, r = `narrow`) {
    return new J(n.value, {
      ...t,
      weekday: r
    }).format(e);
  }
  function p(e) {
    let r = new J(n.value, {
      ...t,
      hour: `numeric`,
      minute: `numeric`
    }).formatToParts(e).find(item => item.type === `dayPeriod`)?.value;
    return r === `PM` || r === `pm` || r === `p.m.` ? `PM` : `AM`;
  }
  let m = {
    year: `numeric`,
    month: `numeric`,
    day: `numeric`,
    hour: `numeric`,
    minute: `numeric`,
    second: `numeric`
  };
  function h(e, t, n = {}) {
    let r = d(e, {
      ...m,
      ...n
    }).find(item => item.type === t);
    return r ? r.value : ``;
  }
  return {
    setLocale: i,
    getLocale: r,
    fullMonth: c,
    fullYear: u,
    fullMonthAndYear: s,
    toParts: d,
    custom: a,
    part: h,
    dayPeriod: p,
    selectedDate: o,
    dayOfWeek: f,
    getMonths: l
  };
}
function sr() {
  return {
    ALT: `Alt`,
    ARROW_DOWN: `ArrowDown`,
    ARROW_LEFT: `ArrowLeft`,
    ARROW_RIGHT: `ArrowRight`,
    ARROW_UP: `ArrowUp`,
    BACKSPACE: `Backspace`,
    CAPS_LOCK: `CapsLock`,
    CONTROL: `Control`,
    DELETE: `Delete`,
    END: `End`,
    ENTER: `Enter`,
    ESCAPE: `Escape`,
    F1: `F1`,
    F10: `F10`,
    F11: `F11`,
    F12: `F12`,
    F2: `F2`,
    F3: `F3`,
    F4: `F4`,
    F5: `F5`,
    F6: `F6`,
    F7: `F7`,
    F8: `F8`,
    F9: `F9`,
    HOME: `Home`,
    META: `Meta`,
    PAGE_DOWN: `PageDown`,
    PAGE_UP: `PageUp`,
    SHIFT: `Shift`,
    SPACE: ` `,
    TAB: `Tab`,
    CTRL: `Control`,
    ASTERISK: `*`,
    SPACE_CODE: `Space`
  };
}
function cr(e) {
  let t = n({
    locale: b(`en`)
  });
  return w(() => e?.value || t.locale?.value || `en`);
}
function lr(e) {
  function t(t) {
    return Array.isArray(e.date.value) ? e.date.value.some(item => ve(item, t)) : e.date.value ? ve(e.date.value, t) : false;
  }
  return {
    isDateSelected: t,
    isInvalid: w(() => {
      if (Array.isArray(e.date.value)) {
        if (!e.date.value.length) return false;
        for (let t of e.date.value) if (e.isDateDisabled?.(t) || e.isDateUnavailable?.(t)) return true;
      } else {
        if (!e.date.value) return false;
        if (e.isDateDisabled?.(e.date.value) || e.isDateUnavailable?.(e.date.value)) return true;
      }
      return false;
    }),
    hasSelectedDate: w(() => Array.isArray(e.date.value) ? e.date.value.length > 0 : !!e.date.value),
    isSelectedDateDisabled: w(() => Array.isArray(e.date.value) ? e.date.value.length ? e.date.value.some(item => e.isDateDisabled?.(item)) : false : e.date.value ? !!e.isDateDisabled?.(e.date.value) : false)
  };
}
function ur(e, t) {
  let n = t(e),
    r = n.compare(e),
    i = {};
  return r >= 7 && (i.day = 1), r >= X(e) && (i.month = 1), n.set({
    ...i
  });
}
function dr(e, t) {
  let n = t(e),
    r = e.compare(n),
    i = {};
  return r >= 7 && (i.day = 35), r >= X(e) && (i.month = 13), n.set({
    ...i
  });
}
function fr(e, t) {
  return t(e);
}
function pr(e, t) {
  return t(e);
}
function mr(e) {
  let t = or(e.locale.value),
    n = w(() => {
      let t = {
        calendar: e.placeholder.value.calendar.identifier
      };
      return e.placeholder.value.calendar.identifier === `gregory` && e.placeholder.value.era === `BC` && (t.era = `short`), t;
    }),
    r = b(Q({
      dateObj: e.placeholder.value,
      weekStartsOn: e.weekStartsOn.value,
      locale: e.locale.value,
      fixedWeeks: e.fixedWeeks.value,
      numberOfMonths: e.numberOfMonths.value
    })),
    i = w(() => r.value.map(item => item.value));
  function a(e) {
    return !i.value.some(item => xe(e, item));
  }
  let o = t => {
      if (!e.maxValue.value || !r.value.length) return false;
      if (e.disabled.value) return true;
      let value = r.value.at(-1).value;
      return !t && !e.nextPage.value ? Wn(value.add({
        months: 1
      }).set({
        day: 1
      }), e.maxValue.value) : Wn(ur(value, t || e.nextPage.value), e.maxValue.value);
    },
    s = t => {
      if (!e.minValue.value || !r.value.length) return false;
      if (e.disabled.value) return true;
      let value = r.value[0].value;
      return !t && !e.prevPage.value ? Z(value.subtract({
        months: 1
      }).set({
        day: 35
      }), e.minValue.value) : Z(dr(value, t || e.prevPage.value), e.minValue.value);
    };
  function c(t) {
    return !!(e.isDateDisabled?.(t) || e.disabled.value || e.maxValue.value && Wn(t, e.maxValue.value) || e.minValue.value && Z(t, e.minValue.value));
  }
  let l = t => !!e.isDateUnavailable?.(t),
    u = w(() => r.value.length ? r.value[0].rows[0].map(item => t.dayOfWeek(Y(item), e.weekdayFormat.value)) : []),
    d = t => {
      let value = r.value[0].value;
      if (!t && !e.nextPage.value) {
        let t = Q({
          dateObj: value.add({
            months: e.pagedNavigation.value ? e.numberOfMonths.value : 1
          }),
          weekStartsOn: e.weekStartsOn.value,
          locale: e.locale.value,
          fixedWeeks: e.fixedWeeks.value,
          numberOfMonths: e.numberOfMonths.value
        });
        r.value = t, e.placeholder.value = t[0].value.set({
          day: 1
        });
        return;
      }
      let i = Q({
        dateObj: fr(value, t || e.nextPage.value),
        weekStartsOn: e.weekStartsOn.value,
        locale: e.locale.value,
        fixedWeeks: e.fixedWeeks.value,
        numberOfMonths: e.numberOfMonths.value
      });
      r.value = i;
      let a = {};
      if (!t) {
        let e = i[0].value.compare(value);
        e >= X(value) && (a.day = 1), e >= 365 && (a.month = 1);
      }
      e.placeholder.value = i[0].value.set({
        ...a
      });
    },
    f = t => {
      let value = r.value[0].value;
      if (!t && !e.prevPage.value) {
        let t = Q({
          dateObj: value.subtract({
            months: e.pagedNavigation.value ? e.numberOfMonths.value : 1
          }),
          weekStartsOn: e.weekStartsOn.value,
          locale: e.locale.value,
          fixedWeeks: e.fixedWeeks.value,
          numberOfMonths: e.numberOfMonths.value
        });
        r.value = t, e.placeholder.value = t[0].value.set({
          day: 1
        });
        return;
      }
      let i = Q({
        dateObj: pr(value, t || e.prevPage.value),
        weekStartsOn: e.weekStartsOn.value,
        locale: e.locale.value,
        fixedWeeks: e.fixedWeeks.value,
        numberOfMonths: e.numberOfMonths.value
      });
      r.value = i;
      let a = {};
      if (!t) {
        let e = value.compare(i[0].value);
        e >= X(value) && (a.day = 1), e >= 365 && (a.month = 1);
      }
      e.placeholder.value = i[0].value.set({
        ...a
      });
    };
  re(e.placeholder, t => {
    i.value.some(item => xe(item, t)) || (r.value = Q({
      dateObj: t,
      weekStartsOn: e.weekStartsOn.value,
      locale: e.locale.value,
      fixedWeeks: e.fixedWeeks.value,
      numberOfMonths: e.numberOfMonths.value
    }));
  }), re([e.locale, e.weekStartsOn, e.fixedWeeks, e.numberOfMonths], () => {
    r.value = Q({
      dateObj: e.placeholder.value,
      weekStartsOn: e.weekStartsOn.value,
      locale: e.locale.value,
      fixedWeeks: e.fixedWeeks.value,
      numberOfMonths: e.numberOfMonths.value
    });
  });
  let p = w(() => {
    if (!r.value.length) return ``;
    if (e.locale.value !== t.getLocale() && t.setLocale(e.locale.value), r.value.length === 1) {
      let value = r.value[0].value;
      return `${t.fullMonthAndYear(Y(value), n.value)}`;
    }
    let i = Y(r.value[0].value),
      a = Y(r.value.at(-1).value),
      o = t.fullMonth(i, n.value),
      s = t.fullMonth(a, n.value),
      c = t.fullYear(i, n.value),
      l = t.fullYear(a, n.value);
    return c === l ? `${o} - ${s} ${l}` : `${o} ${c} - ${s} ${l}`;
  });
  return {
    isDateDisabled: c,
    isDateUnavailable: l,
    isNextButtonDisabled: o,
    isPrevButtonDisabled: s,
    grid: r,
    weekdays: u,
    visibleView: i,
    isOutsideVisibleView: a,
    formatter: t,
    nextPage: d,
    prevPage: f,
    headingValue: p,
    fullCalendarLabel: w(() => `${e.calendarLabel.value ?? `Event Date`}, ${p.value}`),
    isPlaceholderFocusable: w(() => !(c(e.placeholder.value) || l(e.placeholder.value) || a(e.placeholder.value))),
    firstFocusableDate: w(() => {
      for (let t of r.value) {
        if (e.minValue.value && Z(t.value, e.minValue.value)) continue;
        let n = X(t.value),
          r = e.minValue.value && ye(e.minValue.value, t.value) ? e.minValue.value.day : 1;
        for (let e = r; e <= n; e++) {
          let n = t.value.set({
            day: e
          });
          if (!(c(n) || l(n))) return n;
        }
      }
    })
  };
}
var [$, hr] = m(`PopoverRoot`),
  gr = S({
    __name: `PopoverRoot`,
    props: {
      defaultOpen: {
        type: Boolean,
        required: false,
        default: false
      },
      open: {
        type: Boolean,
        required: false,
        default: undefined
      },
      modal: {
        type: Boolean,
        required: false,
        default: false
      }
    },
    emits: [`update:open`],
    setup(e, {
      emit: t
    }) {
      let n = e,
        r = t,
        {
          modal: i
        } = ee(n),
        a = l(n, `open`, r, {
          defaultValue: n.defaultOpen,
          passive: n.open === undefined
        });
      return hr({
        contentId: ``,
        triggerId: ``,
        modal: i,
        open: a,
        onOpenChange: e => {
          a.value = e;
        },
        onOpenToggle: () => {
          a.value = !a.value;
        },
        triggerElement: b(),
        hasCustomAnchor: b(false)
      }), (e, t) => (x(), y(g(le), null, {
        default: v(() => [_(e.$slots, `default`, {
          open: g(a),
          close: () => a.value = false
        })]),
        _: 3
      }));
    }
  }),
  _r = S({
    __name: `PopoverContentImpl`,
    props: {
      trapFocus: {
        type: Boolean,
        required: false
      },
      memoDependencies: {
        type: Array,
        required: false
      },
      side: {
        type: null,
        required: false
      },
      sideOffset: {
        type: Number,
        required: false
      },
      sideFlip: {
        type: Boolean,
        required: false
      },
      align: {
        type: null,
        required: false
      },
      alignOffset: {
        type: Number,
        required: false
      },
      alignFlip: {
        type: Boolean,
        required: false
      },
      avoidCollisions: {
        type: Boolean,
        required: false
      },
      collisionBoundary: {
        type: null,
        required: false
      },
      collisionPadding: {
        type: [Number, Object],
        required: false
      },
      arrowPadding: {
        type: Number,
        required: false
      },
      hideShiftedArrow: {
        type: Boolean,
        required: false
      },
      sticky: {
        type: String,
        required: false
      },
      hideWhenDetached: {
        type: Boolean,
        required: false
      },
      positionStrategy: {
        type: String,
        required: false
      },
      updatePositionStrategy: {
        type: String,
        required: false
      },
      disableUpdateOnLayoutShift: {
        type: Boolean,
        required: false
      },
      prioritizePosition: {
        type: Boolean,
        required: false
      },
      reference: {
        type: null,
        required: false
      },
      dir: {
        type: String,
        required: false
      },
      asChild: {
        type: Boolean,
        required: false
      },
      as: {
        type: null,
        required: false
      },
      disableOutsidePointerEvents: {
        type: Boolean,
        required: false
      }
    },
    emits: [`escapeKeyDown`, `pointerDownOutside`, `focusOutside`, `interactOutside`, `openAutoFocus`, `closeAutoFocus`],
    setup(t, {
      emit: n
    }) {
      let r = t,
        i = n,
        s = e(f(r, `trapFocus`, `disableOutsidePointerEvents`)),
        {
          forwardRef: c
        } = o(),
        l = $();
      return fe(), (e, t) => (x(), y(g(a), {
        "as-child": ``,
        loop: ``,
        trapped: e.trapFocus,
        onMountAutoFocus: t[5] ||= e => i(`openAutoFocus`, e),
        onUnmountAutoFocus: t[6] ||= e => i(`closeAutoFocus`, e)
      }, {
        default: v(() => [ie(g(d), {
          "as-child": ``,
          "disable-outside-pointer-events": e.disableOutsidePointerEvents,
          onPointerDownOutside: t[0] ||= e => i(`pointerDownOutside`, e),
          onInteractOutside: t[1] ||= e => i(`interactOutside`, e),
          onEscapeKeyDown: t[2] ||= e => i(`escapeKeyDown`, e),
          onFocusOutside: t[3] ||= e => i(`focusOutside`, e),
          onDismiss: t[4] ||= e => g(l).onOpenChange(false)
        }, {
          default: v(() => [ie(g(de), C(g(s), {
            id: g(l).contentId,
            ref: g(c),
            "data-state": g(l).open.value ? `open` : `closed`,
            "aria-labelledby": g(l).triggerId,
            style: {
              "--reka-popover-content-transform-origin": `var(--reka-popper-transform-origin)`,
              "--reka-popover-content-available-width": `var(--reka-popper-available-width)`,
              "--reka-popover-content-available-height": `var(--reka-popper-available-height)`,
              "--reka-popover-trigger-width": `var(--reka-popper-anchor-width)`,
              "--reka-popover-trigger-height": `var(--reka-popper-anchor-height)`
            },
            role: `dialog`
          }), {
            default: v(() => [_(e.$slots, `default`)]),
            _: 3
          }, 16, [`id`, `data-state`, `aria-labelledby`])]),
          _: 3
        }, 8, [`disable-outside-pointer-events`])]),
        _: 3
      }, 8, [`trapped`]));
    }
  }),
  vr = S({
    __name: `PopoverContentModal`,
    props: {
      memoDependencies: {
        type: Array,
        required: false
      },
      side: {
        type: null,
        required: false
      },
      sideOffset: {
        type: Number,
        required: false
      },
      sideFlip: {
        type: Boolean,
        required: false
      },
      align: {
        type: null,
        required: false
      },
      alignOffset: {
        type: Number,
        required: false
      },
      alignFlip: {
        type: Boolean,
        required: false
      },
      avoidCollisions: {
        type: Boolean,
        required: false
      },
      collisionBoundary: {
        type: null,
        required: false
      },
      collisionPadding: {
        type: [Number, Object],
        required: false
      },
      arrowPadding: {
        type: Number,
        required: false
      },
      hideShiftedArrow: {
        type: Boolean,
        required: false
      },
      sticky: {
        type: String,
        required: false
      },
      hideWhenDetached: {
        type: Boolean,
        required: false
      },
      positionStrategy: {
        type: String,
        required: false
      },
      updatePositionStrategy: {
        type: String,
        required: false
      },
      disableUpdateOnLayoutShift: {
        type: Boolean,
        required: false
      },
      prioritizePosition: {
        type: Boolean,
        required: false
      },
      reference: {
        type: null,
        required: false
      },
      dir: {
        type: String,
        required: false
      },
      asChild: {
        type: Boolean,
        required: false
      },
      as: {
        type: null,
        required: false
      },
      disableOutsidePointerEvents: {
        type: Boolean,
        required: false
      }
    },
    emits: [`escapeKeyDown`, `pointerDownOutside`, `focusOutside`, `interactOutside`, `openAutoFocus`, `closeAutoFocus`],
    setup(e, {
      emit: t
    }) {
      let n = e,
        i = t,
        a = $(),
        c = b(false);
      s(true);
      let l = h(n, i),
        {
          forwardRef: u,
          currentElement: d
        } = o();
      return r(d), (e, t) => (x(), y(_r, C(g(l), {
        ref: g(u),
        "trap-focus": g(a).open.value,
        "disable-outside-pointer-events": ``,
        onCloseAutoFocus: t[0] ||= se(e => {
          i(`closeAutoFocus`, e), c.value || g(a).triggerElement.value?.focus();
        }, [`prevent`]),
        onPointerDownOutside: t[1] ||= e => {
          i(`pointerDownOutside`, e);
          let originalEvent = e.detail.originalEvent,
            n = originalEvent.button === 0 && originalEvent.ctrlKey === true,
            r = originalEvent.button === 2 || n;
          c.value = r;
        },
        onFocusOutside: t[2] ||= se(() => {}, [`prevent`])
      }), {
        default: v(() => [_(e.$slots, `default`)]),
        _: 3
      }, 16, [`trap-focus`]));
    }
  }),
  yr = S({
    __name: `PopoverContentNonModal`,
    props: {
      memoDependencies: {
        type: Array,
        required: false
      },
      side: {
        type: null,
        required: false
      },
      sideOffset: {
        type: Number,
        required: false
      },
      sideFlip: {
        type: Boolean,
        required: false
      },
      align: {
        type: null,
        required: false
      },
      alignOffset: {
        type: Number,
        required: false
      },
      alignFlip: {
        type: Boolean,
        required: false
      },
      avoidCollisions: {
        type: Boolean,
        required: false
      },
      collisionBoundary: {
        type: null,
        required: false
      },
      collisionPadding: {
        type: [Number, Object],
        required: false
      },
      arrowPadding: {
        type: Number,
        required: false
      },
      hideShiftedArrow: {
        type: Boolean,
        required: false
      },
      sticky: {
        type: String,
        required: false
      },
      hideWhenDetached: {
        type: Boolean,
        required: false
      },
      positionStrategy: {
        type: String,
        required: false
      },
      updatePositionStrategy: {
        type: String,
        required: false
      },
      disableUpdateOnLayoutShift: {
        type: Boolean,
        required: false
      },
      prioritizePosition: {
        type: Boolean,
        required: false
      },
      reference: {
        type: null,
        required: false
      },
      dir: {
        type: String,
        required: false
      },
      asChild: {
        type: Boolean,
        required: false
      },
      as: {
        type: null,
        required: false
      },
      disableOutsidePointerEvents: {
        type: Boolean,
        required: false
      }
    },
    emits: [`escapeKeyDown`, `pointerDownOutside`, `focusOutside`, `interactOutside`, `openAutoFocus`, `closeAutoFocus`],
    setup(e, {
      emit: t
    }) {
      let n = e,
        r = t,
        i = $(),
        a = b(false),
        o = b(false),
        s = h(n, r);
      return (e, t) => (x(), y(_r, C(g(s), {
        "trap-focus": false,
        "disable-outside-pointer-events": false,
        onCloseAutoFocus: t[0] ||= e => {
          r(`closeAutoFocus`, e), e.defaultPrevented || (a.value || g(i).triggerElement.value?.focus(), e.preventDefault()), a.value = false, o.value = false;
        },
        onInteractOutside: t[1] ||= async e => {
          r(`interactOutside`, e), e.defaultPrevented || (a.value = true, e.detail.originalEvent.type === `pointerdown` && (o.value = true));
          let target = e.target;
          g(i).triggerElement.value?.contains(target) && e.preventDefault(), e.detail.originalEvent.type === `focusin` && o.value && e.preventDefault();
        }
      }), {
        default: v(() => [_(e.$slots, `default`)]),
        _: 3
      }, 16));
    }
  }),
  br = S({
    __name: `PopoverContent`,
    props: {
      forceMount: {
        type: Boolean,
        required: false
      },
      memoDependencies: {
        type: Array,
        required: false
      },
      side: {
        type: null,
        required: false
      },
      sideOffset: {
        type: Number,
        required: false
      },
      sideFlip: {
        type: Boolean,
        required: false
      },
      align: {
        type: null,
        required: false
      },
      alignOffset: {
        type: Number,
        required: false
      },
      alignFlip: {
        type: Boolean,
        required: false
      },
      avoidCollisions: {
        type: Boolean,
        required: false
      },
      collisionBoundary: {
        type: null,
        required: false
      },
      collisionPadding: {
        type: [Number, Object],
        required: false
      },
      arrowPadding: {
        type: Number,
        required: false
      },
      hideShiftedArrow: {
        type: Boolean,
        required: false
      },
      sticky: {
        type: String,
        required: false
      },
      hideWhenDetached: {
        type: Boolean,
        required: false
      },
      positionStrategy: {
        type: String,
        required: false
      },
      updatePositionStrategy: {
        type: String,
        required: false
      },
      disableUpdateOnLayoutShift: {
        type: Boolean,
        required: false
      },
      prioritizePosition: {
        type: Boolean,
        required: false
      },
      reference: {
        type: null,
        required: false
      },
      dir: {
        type: String,
        required: false
      },
      asChild: {
        type: Boolean,
        required: false
      },
      as: {
        type: null,
        required: false
      },
      disableOutsidePointerEvents: {
        type: Boolean,
        required: false
      }
    },
    emits: [`escapeKeyDown`, `pointerDownOutside`, `focusOutside`, `interactOutside`, `openAutoFocus`, `closeAutoFocus`],
    setup(e, {
      emit: n
    }) {
      let r = e,
        a = n,
        s = $(),
        c = h(r, a),
        {
          forwardRef: l
        } = o();
      return s.contentId ||= t(undefined, `reka-popover-content`), (e, t) => (x(), y(g(i), {
        present: e.forceMount || g(s).open.value
      }, {
        default: v(() => [g(s).modal.value ? (x(), y(vr, C({
          key: 0
        }, g(c), {
          ref: g(l)
        }), {
          default: v(() => [_(e.$slots, `default`)]),
          _: 3
        }, 16)) : (x(), y(yr, C({
          key: 1
        }, g(c), {
          ref: g(l)
        }), {
          default: v(() => [_(e.$slots, `default`)]),
          _: 3
        }, 16))]),
        _: 3
      }, 8, [`present`]));
    }
  }),
  xr = S({
    __name: `PopoverPortal`,
    props: {
      to: {
        type: null,
        required: false
      },
      disabled: {
        type: Boolean,
        required: false
      },
      defer: {
        type: Boolean,
        required: false
      },
      forceMount: {
        type: Boolean,
        required: false
      }
    },
    setup(e) {
      let t = e;
      return (e, n) => (x(), y(g(c), ae(ne(t)), {
        default: v(() => [_(e.$slots, `default`)]),
        _: 3
      }, 16));
    }
  }),
  Sr = S({
    __name: `PopoverTrigger`,
    props: {
      asChild: {
        type: Boolean,
        required: false
      },
      as: {
        type: null,
        required: false,
        default: `button`
      }
    },
    setup(e) {
      let n = e,
        r = $(),
        {
          forwardRef: i,
          currentElement: a
        } = o();
      return r.triggerId ||= t(undefined, `reka-popover-trigger`), r.contentId ||= t(undefined, `reka-popover-content`), oe(() => {
        r.triggerElement.value = a.value;
      }), (e, t) => (x(), y(te(g(r).hasCustomAnchor.value ? g(u) : g(ue)), {
        "as-child": ``
      }, {
        default: v(() => [ie(g(u), {
          id: g(r).triggerId,
          ref: g(i),
          type: e.as === `button` ? `button` : undefined,
          "aria-haspopup": `dialog`,
          "aria-expanded": g(r).open.value,
          "aria-controls": g(r).open.value ? g(r).contentId : undefined,
          "data-state": g(r).open.value ? `open` : `closed`,
          as: e.as,
          "as-child": n.asChild,
          onClick: g(r).onOpenToggle
        }, {
          default: v(() => [_(e.$slots, `default`)]),
          _: 3
        }, 8, [`id`, `type`, `aria-expanded`, `aria-controls`, `data-state`, `as`, `as-child`, `onClick`])]),
        _: 3
      }));
    }
  }),
  Cr = S({
    __name: `Popover`,
    props: {
      defaultOpen: {
        type: Boolean
      },
      open: {
        type: Boolean
      },
      modal: {
        type: Boolean
      }
    },
    emits: [`update:open`],
    setup(e, {
      emit: t
    }) {
      let n = h(e, t);
      return (e, t) => (x(), y(g(gr), C({
        "data-slot": `popover`
      }, g(n)), {
        default: v(t => [_(e.$slots, `default`, ae(ne(t)))]),
        _: 3
      }, 16));
    }
  }),
  wr = S({
    inheritAttrs: false,
    __name: `PopoverContent`,
    props: {
      forceMount: {
        type: Boolean
      },
      memoDependencies: {},
      side: {},
      sideOffset: {
        default: 4
      },
      sideFlip: {
        type: Boolean
      },
      align: {
        default: `center`
      },
      alignOffset: {},
      alignFlip: {
        type: Boolean
      },
      avoidCollisions: {
        type: Boolean
      },
      collisionBoundary: {},
      collisionPadding: {},
      arrowPadding: {},
      hideShiftedArrow: {
        type: Boolean
      },
      sticky: {},
      hideWhenDetached: {
        type: Boolean
      },
      positionStrategy: {},
      updatePositionStrategy: {},
      disableUpdateOnLayoutShift: {
        type: Boolean
      },
      prioritizePosition: {
        type: Boolean
      },
      reference: {},
      dir: {},
      asChild: {
        type: Boolean
      },
      as: {},
      disableOutsidePointerEvents: {
        type: Boolean
      },
      class: {
        type: [Boolean, null, String, Object, Array]
      }
    },
    emits: [`escapeKeyDown`, `pointerDownOutside`, `focusOutside`, `interactOutside`, `openAutoFocus`, `closeAutoFocus`],
    setup(e, {
      emit: t
    }) {
      let n = e,
        r = t,
        i = f(n, `class`),
        a = h(i, r);
      return (e, t) => (x(), y(g(xr), null, {
        default: v(() => [ie(g(br), C({
          "data-slot": `popover-content`
        }, {
          ...e.$attrs,
          ...g(a)
        }, {
          class: g(p)(`bg-popover text-popover-foreground data-open:animate-in data-closed:animate-out data-closed:fade-out-0 data-open:fade-in-0 data-closed:zoom-out-95 data-open:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 ring-foreground/10 flex flex-col gap-2.5 rounded-lg p-2.5 text-sm shadow-md ring-1 duration-100 z-50 w-72 origin-(--reka-popover-content-transform-origin) outline-hidden`, n.class)
        }), {
          default: v(() => [_(e.$slots, `default`)]),
          _: 3
        }, 16, [`class`])]),
        _: 3
      }));
    }
  }),
  Tr = S({
    __name: `PopoverTrigger`,
    props: {
      asChild: {
        type: Boolean
      },
      as: {}
    },
    setup(e) {
      let t = e;
      return (e, n) => (x(), y(g(Sr), C({
        "data-slot": `popover-trigger`
      }, t), {
        default: v(() => [_(e.$slots, `default`)]),
        _: 3
      }, 16));
    }
  });
export { pe as A, xt as C, Ne as D, ye as E, De as O, St as S, be as T, Z as _, mr as a, Y as b, sr as c, ir as d, tr as f, Qn as g, Zn as h, $ as i, ve as k, or as l, er as m, wr as n, lr as o, ar as p, Cr as r, cr as s, Tr as t, rr as u, Jn as v, Ce as w, B as x, qn as y };