import { X as e, bn as t, mt as n, n as r, ut as i, v as a, vt as o, z as s } from "./vue-i18n.runtime.js";
import { n as c, r as l } from "./tool-icons.js";
import { t as u } from "./points.js";
function d(result) {
  if (result.ok) return result.data;
  throw Error(result.error.message);
}
var f = {
  async getMacStatus() {
    return d(await window.electronAPI.permissions.getMacStatus());
  },
  async openMacSettings(mac) {
    return d(await window.electronAPI.permissions.openMacSettings(mac));
  }
};
function p(result) {
  if (result.ok) return result.data;
  throw Error(result.error.message);
}
var m = {
    async getStatus() {
      return p(await window.electronAPI.enterKeyComponent.getStatus());
    },
    async enable() {
      return p(await window.electronAPI.enterKeyComponent.enable());
    },
    async prepare() {
      return p(await window.electronAPI.enterKeyComponent.prepare());
    },
    async disable() {
      return p(await window.electronAPI.enterKeyComponent.disable());
    },
    async retry() {
      return p(await window.electronAPI.enterKeyComponent.retry());
    },
    onStatusChanged(status) {
      return window.electronAPI.enterKeyComponent.onStatusChanged(status);
    }
  },
  h = a(() => window.electronAPI?.platform === `win32`),
  g = a(() => window.electronAPI?.platform === `darwin`),
  _ = a(() => h.value || g.value),
  v = a(() => h.value || g.value),
  y = Symbol(`settings-page-context`);
function b(items, t) {
  items.push(t), s() && n(() => {
    let n = items.indexOf(t);
    n >= 0 && items.splice(n, 1);
  });
}
function x(event) {
  let {
      t: s
    } = r(),
    {
      isLoading: c,
      isSaving: d,
      loadSettings: p,
      settings: h
    } = l(),
    v = a(() => c.value || d.value),
    emptyItems = [],
    S = [],
    C = t(0),
    w = t(false),
    T = t(false);
  async function E() {
    try {
      w.value = true, C.value = await u.getCreditsBalance();
    } catch {
      C.value = 0;
    } finally {
      w.value = false;
    }
  }
  let D = t(null),
    O = t(false),
    k = t(``),
    A = t(null),
    j = t(false);
  async function M() {
    if (g.value) try {
      A.value = await window.electronAPI.checkAccessibility();
    } catch {
      A.value = {
        required: true,
        granted: false
      };
    }
  }
  async function N() {
    if (g.value) {
      O.value = true, k.value = ``;
      try {
        D.value = await f.getMacStatus();
        let found = D.value.items.find(item => item.key === `accessibility`);
        found && (A.value = {
          required: found.required,
          granted: found.granted
        });
      } catch (e) {
        k.value = e instanceof Error ? e.message : s(`settings.permissionCheck.loadFailed`);
      } finally {
        O.value = false;
      }
    }
  }
  async function P() {
    if (g.value) try {
      let requestAccessibility = await window.electronAPI.requestAccessibility();
      A.value = {
        required: true,
        granted: requestAccessibility
      }, N();
    } catch {
      A.value = {
        required: true,
        granted: false
      };
    }
  }
  function F() {
    g.value && (j.value = true, N());
  }
  let I = t(null),
    L = a(() => [`checking`, `downloading`, `verifying`, `starting`, `updating`, `stopping`].includes(I.value?.status || ``)),
    R;
  i(() => {
    M(), N(), _.value ? (m.getStatus().then(result => {
      I.value = result;
    }), R = m.onStatusChanged(e => {
      I.value = e;
    })) : (h.value.enableEnterKeyListener || !h.value.enterKeyLegacyMigrationHandled) && m.disable().then(() => p());
  }), n(() => {
    R?.();
  });
  let options = {
    controlsDisabled: v,
    growthSettingsLoaded: event.growthSettingsLoaded,
    highlightedItem: event.highlightedItem,
    refresh: event.refresh,
    onRefresh: e => b(emptyItems, e),
    onLocalDataChanged: e => b(S, e),
    notifyLocalDataChanged: () => {
      S.forEach(item => item());
    },
    navigate: event.navigate,
    openUpdate: event.openUpdate,
    pointsBalance: C,
    isLoadingBalance: w,
    loadPointsBalance: E,
    showRechargeDialog: T,
    macPermissionsStatus: D,
    isLoadingMacPermissions: O,
    macPermissionsError: k,
    accessibilityStatus: A,
    showPermissionCheckDialog: j,
    loadMacPermissions: N,
    checkAccessibility: M,
    requestAccessibility: P,
    openPermissionCheckDialog: F,
    enterKeyComponentState: I,
    enterKeyComponentBusy: L
  };
  return o(y, options), {
    ...options,
    runRefreshLoaders: () => {
      emptyItems.forEach(item => item());
    }
  };
}
function S() {
  let t = e(y);
  if (!t) throw Error(`useSettingsPageContext() 只能在设置页分区组件中使用`);
  return t;
}
function C() {
  return e(y, null);
}
var w = Symbol(`app-navigate`);
function T(e) {
  o(w, e);
}
function E() {
  return e(w, () => undefined);
}
var D = [`checking`, `downloading`, `verifying`, `starting`, `updating`, `stopping`];
function O() {
  let {
      isLoading: e,
      isSaving: r
    } = l(),
    o = E(),
    {
      check: s
    } = c(),
    u = t(null),
    d;
  return i(() => {
    _.value && (m.getStatus().then(result => {
      u.value = result;
    }).catch(() => undefined), d = m.onStatusChanged(e => {
      u.value = e;
    }));
  }), n(() => {
    d?.();
  }), {
    controlsDisabled: a(() => e.value || r.value),
    highlightedItem: t(null),
    navigate: o,
    checkAccessibility: s,
    enterKeyComponentState: u,
    enterKeyComponentBusy: a(() => D.includes(u.value?.status || ``))
  };
}
function k() {
  return C() ?? O();
}
export { _ as a, h as c, S as i, m as l, T as n, g as o, x as r, v as s, k as t, f as u };