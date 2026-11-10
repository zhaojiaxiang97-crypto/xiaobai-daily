import { Wt as e, bn as t, n, v as r } from "./vue-i18n.runtime.js";
function i(t, fn, r) {
  let i = crypto.randomUUID(),
    a = false,
    desktopSync = window.electronAPI.desktopSync,
    s = desktopSync.onChanged(async e => {
      if (e.id !== i || a) return;
      let t = false;
      try {
        (r?.background || !document.hidden) && (r?.active?.() ?? true) && (t = (await fn()) !== false);
      } catch {} finally {
        desktopSync.ack({
          id: i,
          deliveryId: e.deliveryId,
          applied: t
        });
      }
    }),
    c = false,
    l = () => {
      let e = !a && (r?.background || !document.hidden) && (r?.active?.() ?? true);
      e !== c && (c = !!e, e ? desktopSync.subscribe({
        id: i,
        topic: t,
        params: r?.params
      }).catch(() => undefined) : desktopSync.unsubscribe(i).catch(() => undefined));
    },
    u = e(() => r?.active?.() ?? true, l, {
      immediate: true
    });
  return document.addEventListener(`visibilitychange`, l), () => {
    a = true, u(), s(), document.removeEventListener(`visibilitychange`, l), l();
  };
}
var a = class extends Error {
  code;
  constructor(e, t) {
    super(t), this.name = `ApiError`, this.code = e;
  }
};
function o(result) {
  if (result.ok) return result.data;
  throw new a(result.error.code, result.error.message);
}
var s = {
    async login(e) {
      return o(await window.electronAPI.auth.login(e));
    },
    async register(e) {
      return o(await window.electronAPI.auth.register(e));
    },
    async logout() {
      o(await window.electronAPI.auth.logout());
    },
    async getSession() {
      return o(await window.electronAPI.auth.getSession());
    },
    async syncSubscription() {
      return o(await window.electronAPI.auth.syncSubscription());
    },
    async getSubscription() {
      return o(await window.electronAPI.auth.getSubscription());
    },
    async syncUser() {
      return o(await window.electronAPI.auth.syncUser());
    },
    async updateAvatar() {
      return o(await window.electronAPI.auth.updateAvatar());
    },
    async updateProfile(e) {
      return o(await window.electronAPI.auth.updateProfile(e));
    },
    async changePassword(e) {
      return o(await window.electronAPI.auth.changePassword(e));
    },
    async getCurrentDevice() {
      return o(await window.electronAPI.auth.currentDevice());
    },
    async checkDevice(e) {
      return o(await window.electronAPI.auth.checkDevice(e));
    },
    async sendVerificationCode(e) {
      let t = await window.electronAPI.auth.sendVerificationCode(e);
      if (t.ok) return t.data;
      throw new a(t.error.code, t.error.message);
    },
    async resetPassword(e) {
      return o(await window.electronAPI.auth.resetPassword(e));
    },
    async recoverAccount(e) {
      return o(await window.electronAPI.auth.recoverAccount(e));
    }
  },
  c = `https://xiaoheiribao.com/api`,
  l = {
    async claimWelcomeCredits(e) {
      return {
        credits: 0,
        claimed: true
      };
    }
  },
  u = t(null),
  d = t(null),
  f = t(false);
function p(fn) {
  return {
    planId: `free`,
    planName: fn(`composables.auth.freePlan`),
    isActive: false,
    expiresAt: null,
    paidAt: null,
    lastCheckedAt: ``,
    freeWorkRecordLimit: 30,
    freeReportLimit: 5,
    pointsBalance: 0
  };
}
var m = t(null),
  h = t(false),
  g = t(false),
  _ = t(false),
  v = t(``),
  y = t(false),
  b = t(``),
  x = t(false),
  S = false,
  C = null,
  w = null,
  T = null,
  E = null,
  D = null,
  O = 0,
  k = 15e3;
function A(e) {
  try {
    let {
      t
    } = n();
    return t(e);
  } catch {
    return e;
  }
}
function j() {
  let {
      t: e
    } = n(),
    t = r(() => true);
  function c(event) {
    if (event instanceof a) {
      let n = `composables.auth.error.${event.code}`,
        r = e(n);
      if (r !== n) throw Error(r);
    }
    throw event;
  }
  m.value ||= p(e);
  function j() {
    T ||= window.electronAPI?.auth?.onShouldRefreshSubscription?.(() => {
      P();
    }) ?? null;
  }
  function M() {
    E ||= window.electronAPI?.auth?.onTokenExpired?.(() => {
      t.value && (x.value = true);
    }) ?? null;
  }
  function N() {
    D ||= window.electronAPI?.auth?.onForcedLogout?.(n => {
      t.value && (X(), $(), b.value = n.message || e(`login.deviceCheck.mismatchDeviceMessage`), y.value = n.reason === `kicked`, x.value = n.reason !== `kicked`, u.value = null, m.value = p(e), window.electronAPI?.recorder?.stop?.());
    }) ?? null;
  }
  function P() {
    let e = Date.now();
    e - O < k || (O = e, V());
  }
  async function F() {
    let e = u.value?.token;
    if (e) {
      d.value = null, f.value = true;
      try {
        let t = await l.claimWelcomeCredits(e);
        u.value?.token === e && (d.value = t);
      } catch {} finally {
        f.value = false;
      }
    }
  }
  async function I() {
    if (!S) {
      h.value = true;
      try {
        let e = await s.getSession();
        if (e) {
          try {
            await s.syncUser(), u.value = await s.getSession();
          } catch {
            u.value = e;
          }
          await F();
          try {
            m.value = await s.syncSubscription();
          } catch {
            m.value = await s.getSubscription();
          }
          j(), M(), N(), Y(), Q();
        }
      } catch {} finally {
        h.value = false, S = true;
      }
    }
  }
  async function ee() {
    y.value = false, x.value = false, b.value = ``, u.value = await s.getSession(), S = true, await F();
    try {
      m.value = await s.syncSubscription();
    } catch {
      m.value = await s.getSubscription();
    }
    j(), M(), N(), Y(), Q();
  }
  async function L(e, t) {
    g.value = true, v.value = ``, y.value = false, b.value = ``;
    try {
      await s.login({
        email: e,
        password: t
      }), u.value = await s.getSession(), await F();
      try {
        m.value = await s.syncSubscription();
      } catch {
        m.value = await s.getSubscription();
      }
      j(), M(), N(), Y(), setTimeout(() => Q(), 2e3);
    } catch (e) {
      throw v.value = e instanceof Error ? e.message : A(`errors.loginFailed`), e;
    } finally {
      g.value = false;
    }
  }
  async function R(e, t, n, r, i, a) {
    _.value = true, v.value = ``, y.value = false, b.value = ``;
    try {
      let o = await s.register({
        email: e,
        password: t,
        code: n,
        nickname: r,
        jobTitle: i,
        deferRecorderStart: a?.deferRecorderStart
      });
      u.value = await s.getSession(), await F();
      try {
        m.value = await s.syncSubscription();
      } catch {
        m.value = await s.getSubscription();
      }
      return j(), M(), N(), Y(), setTimeout(() => Q(), 2e3), o;
    } catch (e) {
      throw v.value = e instanceof Error ? e.message : A(`errors.registerFailed`), e;
    } finally {
      _.value = false;
    }
  }
  async function z() {
    X(), $(), E?.(), E = null, D?.(), D = null, x.value = false, await s.logout(), u.value = null, m.value = p(e);
  }
  async function B() {
    x.value = false, await z();
  }
  async function V() {
    try {
      return m.value = await s.syncSubscription(), true;
    } catch {
      return m.value = await s.getSubscription(), false;
    }
  }
  async function H() {
    let e = await s.updateAvatar();
    e.avatarUrl && u.value && (u.value = {
      ...u.value,
      avatarUrl: e.avatarUrl
    });
  }
  async function U(e) {
    let t = await s.updateProfile(e);
    return u.value &&= {
      ...u.value,
      nickname: t.nickname,
      jobTitle: t.jobTitle
    }, t;
  }
  async function W(e) {
    let t = await s.changePassword(e);
    return await z(), t;
  }
  async function G(e) {
    try {
      return await s.sendVerificationCode(e);
    } catch (e) {
      c(e);
    }
  }
  async function K(e) {
    try {
      let t = await s.resetPassword(e);
      return await z(), t;
    } catch (e) {
      c(e);
    }
  }
  async function q(e) {
    try {
      return await s.recoverAccount(e);
    } catch (e) {
      c(e);
    }
  }
  async function J() {
    try {
      let e = await s.syncUser();
      return e && (u.value = e), !!e;
    } catch {
      return false;
    }
  }
  function Y() {
    X(), C = i(`account`, async () => (await Promise.all([J(), V()])).every(Boolean), {
      background: true
    });
  }
  function X() {
    C !== null && (C(), C = null);
  }
  async function Z() {
    if (t.value) try {
      let deviceId = o(await window.electronAPI.settings.get()).deviceId;
      if (!deviceId) {
        await z();
        return;
      }
      if (!(await s.checkDevice(deviceId)).isCurrentDevice) {
        b.value = e(`login.deviceCheck.mismatchDeviceMessage`), y.value = true, await z();
        return;
      }
    } catch {
      return false;
    }
  }
  function Q() {
    $(), Z(), w = i(`session`, Z, {
      background: true
    });
  }
  function $() {
    w !== null && (w(), w = null);
  }
  function te() {
    y.value = false, b.value = ``;
  }
  return {
    user: u,
    welcomeCredits: d,
    welcomeCreditsLoading: f,
    retryWelcomeCredits: F,
    subscription: m,
    isLoggedIn: t,
    isLoading: h,
    isLoggingIn: g,
    isRegistering: _,
    error: v,
    showKickoutDialog: y,
    kickoutMessage: b,
    showTokenExpiredDialog: x,
    loadSession: I,
    refreshAfterBrowserLogin: ee,
    login: L,
    register: R,
    logout: z,
    syncSubscription: V,
    syncUserInfo: J,
    stopPeriodicSync: X,
    updateAvatar: H,
    updateProfile: U,
    changePassword: W,
    sendVerificationCode: G,
    resetPassword: K,
    recoverAccount: q,
    dismissKickoutDialog: te,
    reloginFromExpired: B
  };
}
export { i as a, o as i, l as n, s as r, j as t };