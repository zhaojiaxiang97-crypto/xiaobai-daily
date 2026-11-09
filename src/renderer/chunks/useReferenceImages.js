import { At as uiSwitchAt } from "../ui/Switch.js";
import { $n as vueN, An as vueAn, S as vueS, St as vueSt, b as vueB, bn as vueBn, c as vueC, gt as vueGt, j as vueJ, k as vueK, ot as vueOt, rr as vueRr, v as vueV, vn as vueVn, x as vueX, y as vueY } from "./vue-i18n.runtime.js";
import { t as lucideT } from "../ui/icons/lucide-icons.js";
import { t as i18nT } from "../i18n/i18n-helper.js";
import { _ as beautifier } from "./screenshot-beautifier.js";
import { Ht as mainHt } from "./main.js";
import { t as ToolDropzoneT } from "../pages/ToolDropzone.js";
var S = {
    class: `flex flex-wrap items-stretch gap-2`
  },
  C = {
    class: `relative flex size-12 items-center justify-center overflow-hidden rounded-lg bg-muted text-muted-foreground`
  },
  w = [`src`, `alt`, `onError`],
  T = {
    class: `absolute left-[3px] top-[3px] inline-flex h-4 min-w-4 items-center justify-center rounded-[5px] bg-slate-900/70 px-1 text-[8px] font-bold text-white`
  },
  E = {
    key: 2,
    class: `absolute inset-0 flex items-center justify-center bg-slate-900/50 text-white`
  },
  D = {
    class: `min-w-0`
  },
  O = {
    class: `block truncate text-[10px] font-semibold`
  },
  k = {
    key: 0,
    class: `mt-1 block truncate text-[9px] text-destructive`
  },
  A = {
    key: 1,
    class: `mt-1 block truncate text-[9px] text-muted-foreground`
  },
  j = [`aria-label`, `onClick`],
  M = {
    key: 0,
    class: `mt-2 text-[11px] text-destructive`
  },
  N = vueJ({
    __name: `ReferenceImageUploader`,
    props: {
      items: {},
      error: {},
      maxMb: {},
      addFiles: {
        type: Function
      },
      remove: {
        type: Function
      }
    },
    setup(props) {
      let propsAlias = props,
        {
          t: p
        } = i18nT(),
        m = vueBn(null);
      function b(e) {
        return e <= 0 ? `0 KB` : e >= 1048576 ? `${(e / 1024 / 1024).toFixed(1)} MB` : `${Math.max(1, Math.round(e / 1024))} KB`;
      }
      function N(event) {
        let t = event.target,
          n = Array.from(t.files || []);
        t.value = ``, propsAlias.addFiles(n);
      }
      return (ctx, renderCache) => (vueGt(), vueS(vueC, null, [vueY(`input`, {
        ref_key: `input`,
        ref: m,
        class: `sr-only`,
        type: `file`,
        multiple: ``,
        accept: `image/jpeg,image/png,image/webp,image/bmp,image/tiff,image/gif,image/heic,image/heif,.heic,.heif`,
        onChange: N
      }, null, 544), vueY(`div`, S, [(vueGt(true), vueS(vueC, null, vueSt(propsAlias.items, (count, o) => (vueGt(), vueS(`article`, {
        key: count.id,
        class: vueN([`grid h-[78px] w-[250px] min-w-0 shrink-0 grid-cols-[48px_minmax(0,1fr)_26px] items-center gap-2 rounded-[10px] border bg-card p-[7px]`, count.error ? `border-destructive/45` : `border-border`])
      }, [vueY(`div`, C, [count.previewFailed ? (vueGt(), vueB(vueAn(uiSwitchAt), {
        key: 1,
        size: 24
      })) : (vueGt(), vueS(`img`, {
        key: 0,
        class: `size-full object-cover`,
        src: count.previewUrl,
        alt: count.name,
        onError: e => count.previewFailed = true
      }, null, 40, w)), vueY(`span`, T, vueRr(o + 1), 1), count.uploading ? (vueGt(), vueS(`span`, E, [vueK(vueAn(beautifier), {
        size: 18,
        class: `animate-spin`
      })])) : vueX(``, true)]), vueY(`div`, D, [vueY(`strong`, O, vueRr(count.name), 1), count.error ? (vueGt(), vueS(`span`, k, vueRr(count.error), 1)) : (vueGt(), vueS(`span`, A, vueRr(count.uploading ? vueAn(p)(`toolboxNative.uploading`) : b(count.size)), 1))]), vueY(`button`, {
        type: `button`,
        class: `inline-flex size-[26px] items-center justify-center rounded-[7px] text-muted-foreground transition-colors hover:bg-muted hover:text-destructive`,
        "aria-label": vueAn(p)(`toolboxNative.removeReferenceImage`),
        onClick: e => propsAlias.remove(count.id)
      }, [vueK(vueAn(lucideT), {
        size: 14
      })], 8, j)], 2))), 128)), propsAlias.items.length < 10 ? (vueGt(), vueB(ToolDropzoneT, {
        key: 0,
        class: `h-[78px] w-[340px] max-w-full shrink`,
        title: vueAn(p)(`toolboxNative.clickOrDropReferenceImagesHere`),
        hint: `${vueAn(p)(`toolboxNative.jpgPngWebpAndMoreMaximumPerImage`)} ${propsAlias.maxMb}MB`,
        onSelect: renderCache[0] ||= e => m.value?.click(),
        onDrop: propsAlias.addFiles
      }, null, 8, [`title`, `hint`, `onDrop`])) : vueX(``, true)]), propsAlias.error ? (vueGt(), vueS(`p`, M, vueRr(propsAlias.error), 1)) : vueX(``, true)], 64));
    }
  });
function P() {
  return typeof crypto.randomUUID == `function` ? crypto.randomUUID() : `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}
function F(e) {
  return new Set([`image/jpeg`, `image/png`, `image/webp`, `image/bmp`, `image/x-ms-bmp`, `image/tiff`, `image/gif`, `image/heic`, `image/heif`]).has(e.type.toLocaleLowerCase()) ? true : /\.(jpe?g|png|webp|bmp|tiff?|gif|heic|heif)$/i.test(e.name);
}
function I(e) {
  let t = vueBn([]),
    n = vueBn(``),
    r = new Map(),
    fallbackValue = e.maxCount ?? 10,
    a = vueV(() => t.value.some(item => item.uploading)),
    s = vueV(() => t.value.some(item => item.error || !item.token));
  async function c(t) {
    if (!e.user.value) return;
    t.uploading = true, t.error = ``;
    let formData = new FormData();
    formData.append(`file`, t.file, t.name);
    let abortController = new AbortController();
    r.set(t.id, abortController);
    try {
      let mainHtData = await mainHt(`reference-upload.php`, {
        method: `POST`,
        csrfToken: e.user.value.csrfToken,
        body: formData,
        signal: abortController.signal,
        timeoutMs: 12e4
      });
      abortController.signal.aborted || (t.token = mainHtData.token);
    } catch (n) {
      if (abortController.signal.aborted) return;
      t.error = n instanceof DOMException && n.name === `AbortError` ? e.t(`toolboxNative.uploadTimedOutRemoveTheFileAndTryAgain`) : n instanceof Error ? e.translateRemoteText(n.message) : e.t(`toolboxNative.uploadFailed`);
    } finally {
      r.delete(t.id), t.uploading = false;
    }
  }
  async function l(items) {
    if (n.value = ``, !e.user.value) {
      n.value = e.t(`toolboxNative.yourSessionExpiredPleaseReopenTheToolbox`);
      return;
    }
    let a = Math.max(0, fallbackValue - t.value.length);
    if (a === 0) {
      n.value = e.t(`toolboxNative.youCanUploadUpTo10ReferenceImages`);
      return;
    }
    items.length > a && (n.value = e.t(`toolboxNative.youCanAddCountMoreReferenceImages`, {
      count: a
    }));
    let emptyItems = [];
    for (let i of items.slice(0, a)) {
      if (!F(i)) {
        n.value = e.t(`toolboxNative.nameIsNotASupportedImageFormat`, {
          name: i.name
        });
        continue;
      }
      if (i.size <= 0 || i.size > e.maxBytes) {
        n.value = e.t(`toolboxNative.nameExceedsTheLimitMbLimit`, {
          name: i.name,
          limit: Math.round(e.maxBytes / 1024 / 1024)
        });
        continue;
      }
      let r = vueVn({
        id: P(),
        file: i,
        name: i.name,
        size: i.size,
        previewUrl: URL.createObjectURL(i),
        previewFailed: false,
        token: ``,
        uploading: true,
        error: ``
      });
      t.value.push(r), emptyItems.push(r);
    }
    await Promise.all(emptyItems.map(c));
  }
  function u(e) {
    let indexResult = t.value.findIndex(item => item.id === e);
    indexResult < 0 || (r.get(e)?.abort(), r.delete(e), URL.revokeObjectURL(t.value[indexResult].previewUrl), t.value.splice(indexResult, 1), n.value = ``);
  }
  function f() {
    r.forEach(item => item.abort()), r.clear(), t.value.forEach(item => URL.revokeObjectURL(item.previewUrl)), t.value = [], n.value = ``;
  }
  return vueOt(f), {
    items: t,
    error: n,
    hasPending: a,
    hasInvalid: s,
    addFiles: l,
    remove: u,
    clear: f
  };
}
export { N as n, I as t };