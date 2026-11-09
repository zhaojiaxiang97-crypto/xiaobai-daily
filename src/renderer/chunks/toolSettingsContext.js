import { X as vueX, bn as vueBn, mt as vueMt, n as vueN, ut as vueUt, v as vueV, vt as vueVt, z as vueZ } from "./vue-i18n.runtime.js";
import { n as toolIconN, r as toolIconR } from "./tool-icons.js";
import { t as pointsT } from "./points.js";
function d(result) {
  if (result.ok) return result.data;
  throw Error(result.error.message);
}
var f = {
  async getMacStatus() {
    return d(await window.electronAPI.permissions.getMacStatus());
  },
  async openMacSettings(macValue) {
    return d(await window.electronAPI.permissions.openMacSettings(macValue));
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
  h = vueV(() => window.electronAPI?.platform === `win32`),
  g = vueV(() => window.electronAPI?.platform === `darwin`),
  _ = vueV(() => h.value || g.value),
  v = vueV(() => h.value || g.value),
  y = Symbol(`settings-page-context`);
function b(items, t) {
  items.push(t), vueZ() && vueMt(() => {
    let n = items.indexOf(t);
    n >= 0 && items.splice(n, 1);
  });
}
function x(event) {
  let {
      t: translate
    } = vueN(),
    {
      isLoading: c,
      isSaving: d,
      loadSettings: p,
      settings: h
    } = toolIconR(),
    v = vueV(() => c.value || d.value),
    emptyItems = [],
    S = [],
    C = vueBn(0),
    w = vueBn(false),
    T = vueBn(false);
  async function E() {
    try {
      w.value = true, C.value = await pointsT.getCreditsBalance();
    } catch {
      C.value = 0;
    } finally {
      w.value = false;
    }
  }
  let D = vueBn(null),
    O = vueBn(false),
    k = vueBn(``),
    A = vueBn(null),
    j = vueBn(false);
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
        k.value = e instanceof Error ? e.message : translate(`settings.permissionCheck.loadFailed`);
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
  let I = vueBn(null),
    L = vueV(() => [`checking`, `downloading`, `verifying`, `starting`, `updating`, `stopping`].includes(I.value?.status || ``)),
    R;
  vueUt(() => {
    M(), N(), _.value ? (m.getStatus().then(result => {
      I.value = result;
    }), R = m.onStatusChanged(e => {
      I.value = e;
    })) : (h.value.enableEnterKeyListener || !h.value.enterKeyLegacyMigrationHandled) && m.disable().then(() => p());
  }), vueMt(() => {
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
  return vueVt(y, options), {
    ...options,
    runRefreshLoaders: () => {
      emptyItems.forEach(item => item());
    }
  };
}
function S() {
  let t = vueX(y);
  if (!t) throw Error(`useSettingsPageContext() 只能在设置页分区组件中使用`);
  return t;
}
function C() {
  return vueX(y, null);
}
var w = Symbol(`app-navigate`);
function T(e) {
  vueVt(w, e);
}
function E() {
  return vueX(w, () => undefined);
}
var D = [`checking`, `downloading`, `verifying`, `starting`, `updating`, `stopping`];
function O() {
  let {
      isLoading: e,
      isSaving: r
    } = toolIconR(),
    o = E(),
    {
      check: s
    } = toolIconN(),
    u = vueBn(null),
    d;
  return vueUt(() => {
    _.value && (m.getStatus().then(result => {
      u.value = result;
    }).catch(() => undefined), d = m.onStatusChanged(e => {
      u.value = e;
    }));
  }), vueMt(() => {
    d?.();
  }), {
    controlsDisabled: vueV(() => e.value || r.value),
    highlightedItem: vueBn(null),
    navigate: o,
    checkAccessibility: s,
    enterKeyComponentState: u,
    enterKeyComponentBusy: vueV(() => D.includes(u.value?.status || ``))
  };
}
function k() {
  return C() ?? O();
}
export { _ as a, h as c, S as i, m as l, T as n, g as o, x as r, v as s, k as t, f as u };