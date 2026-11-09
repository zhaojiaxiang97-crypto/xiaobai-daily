import { createRequire as __nodeCreateRequire } from "node:module";
__nodeCreateRequire(import.meta.url);
import { i as t, n as settingsRepository } from "./settings.repository.js";
import { t as webAccountSchedulerService } from "./web-account-scheduler.service.js";
import { a as chatWindowPositionService, r as getWebAccountLoginState, t as WEB_ACCOUNT_URLS } from "./web-account-auth.service.js";
import { BrowserWindow, clipboard, nativeImage, session } from "electron";
//#region electron/services/web-account-recognition.service.ts
var LOAD_TIMEOUT_MS = 3e4;
var LOGIN_WAIT_MS = 8e3;
var PASTE_INTERVAL_MS = 900;
var AFTER_PASTE_SETTLE_MS = 5e3;
var FRESH_CONVERSATION_SETTLE_MS = 1500;
var RECOGNITION_TIMEOUT_MS = 6e4;
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
function getLanguage() {
  return settingsRepository.getSettings().language || "zh-CN";
}
function providerLabel(provider, lang) {
  return t(`webAccount.providerName.${provider}`, lang);
}
var WebAccountRecognitionTimeoutError = class extends Error {
  constructor(lang) {
    super(t("webAccount.recognizeTimeout", lang).replace("{seconds}", String(RECOGNITION_TIMEOUT_MS / 1e3)));
    this.name = "WebAccountRecognitionTimeoutError";
  }
};
function isRecognitionTimeoutError(error) {
  return error instanceof WebAccountRecognitionTimeoutError || error instanceof Error && error.name === "WebAccountRecognitionTimeoutError";
}
async function withRecognitionTimeout(operation, lang) {
  let timeoutId = null;
  try {
    return await Promise.race([operation, new Promise((_, reject) => {
      timeoutId = setTimeout(() => reject(new WebAccountRecognitionTimeoutError(lang)), RECOGNITION_TIMEOUT_MS);
    })]);
  } finally {
    if (timeoutId) clearTimeout(timeoutId);
  }
}
function createRecognitionWindow(partition) {
  const visible = settingsRepository.getSettings().showWebAccountWindow;
  const window = new BrowserWindow({
    width: 1100,
    height: 760,
    show: visible,
    webPreferences: {
      session: session.fromPartition(partition),
      contextIsolation: true,
      nodeIntegration: false
    }
  });
  if (visible) chatWindowPositionService.arrange(window);
  return window;
}
async function waitForLoad(window, url) {
  await Promise.race([window.loadURL(url), sleep(LOAD_TIMEOUT_MS)]);
}
function buildFreshConversationScript(provider) {
  return `
    (async () => {
      const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
      const targetUrl = ${JSON.stringify(WEB_ACCOUNT_URLS[provider])};
      const inputSelectors = ${JSON.stringify(provider === "yuanbao" ? ["[contenteditable=\"true\"].ql-editor", "[contenteditable=\"true\"]"] : provider === "deepseek" ? ["textarea"] : ["textarea", "[contenteditable=\"true\"]"])};
      const messageSelectors = ${JSON.stringify(provider === "doubao" ? [".list_items .v_list_row", ".v_list_row", "[data-message-id]"] : provider === "yuanbao" ? [".agent-chat__list__item[data-conv-idx]", "[data-conv-speaker][data-conv-idx]"] : ["[data-virtual-list-item-key]"])};
      const visible = (el) => !!el && el.getClientRects().length > 0;
      const textOf = (el) => [
        el.getAttribute('aria-label'),
        el.getAttribute('title'),
        el.innerText,
        el.textContent,
      ].filter(Boolean).join(' ').replace(/\\s+/g, ' ').trim();
      const metaOf = (el) => [
        el.id,
        el.className,
        el.getAttribute('href'),
        el.getAttribute('data-testid'),
      ].filter(Boolean).join(' ');
      const hasInput = () => inputSelectors.some((selector) =>
        Array.from(document.querySelectorAll(selector)).some((el) => visible(el) && !el.disabled)
      );
      const messageCount = () => messageSelectors
        .flatMap((selector) => Array.from(document.querySelectorAll(selector)))
        .filter((el, index, list) => list.indexOf(el) === index)
        .filter(visible)
        .length;
      const messagesBefore = messageCount();
      if (hasInput() && messagesBefore === 0) {
        return { status: 'already_fresh', messages: messagesBefore, hasInput: true };
      }

      const controls = Array.from(document.querySelectorAll('button,a,[role="button"]')).filter(visible);
      const newChat = controls.find((el) => {
        const text = textOf(el);
        const meta = metaOf(el);
        if (/登录|发送|上传|附件|搜索|历史|Login|Sign in|Send|Upload|Attach|Search|History/i.test(text)) return false;
        if (/new[-_\\s]?chat|new[-_\\s]?conversation|create[-_\\s]?chat/i.test(meta)) return true;
        return /新对话|新建对话|新聊天|新建聊天|开启新对话|发起新对话|New chat|Start new chat/i.test(text) && text.length <= 40;
      });

      if (newChat) {
        newChat.click();
        await sleep(1200);
        return { status: 'clicked', messages: messageCount(), hasInput: hasInput() };
      }

      if (location.href !== targetUrl && !location.href.startsWith(targetUrl + '?')) {
        location.assign(targetUrl);
        return { status: 'navigating', messages: messagesBefore, hasInput: hasInput() };
      }

      return { status: 'not_found', messages: messagesBefore, hasInput: hasInput() };
    })()
  `;
}
async function prepareFreshConversation(window, provider) {
  await window.webContents.executeJavaScript(buildFreshConversationScript(provider)).catch(() => null);
  await sleep(FRESH_CONVERSATION_SETTLE_MS);
}
/** 通过剪贴板把截图逐张粘贴进对话输入框（规避文件选择拦截失效） */
async function pasteImages(window, images, focusScript) {
  const snapshot = {
    text: clipboard.readText(),
    html: clipboard.readHTML(),
    image: clipboard.readImage()
  };
  try {
    for (const image of images) {
      const img = nativeImage.createFromDataURL(image.dataUrl);
      if (img.isEmpty()) continue;
      window.webContents.focus();
      await window.webContents.executeJavaScript(focusScript).catch(() => false);
      clipboard.writeImage(img);
      window.webContents.paste();
      await sleep(PASTE_INTERVAL_MS);
    }
  } finally {
    const restore = {};
    if (snapshot.text) restore.text = snapshot.text;
    if (snapshot.html) restore.html = snapshot.html;
    if (!snapshot.image.isEmpty()) restore.image = snapshot.image;
    clipboard.write(restore);
  }
}
var FOCUS_INPUT_SCRIPTS = {
  doubao: `
    (() => {
      const textarea = Array.from(document.querySelectorAll('textarea')).find((el) => el.offsetParent !== null);
      const input = textarea || Array.from(document.querySelectorAll('[contenteditable="true"]')).find((el) => el.offsetParent !== null);
      if (!input) return false;
      input.focus();
      return true;
    })()
  `,
  yuanbao: `
    (() => {
      const input = Array.from(document.querySelectorAll('[contenteditable="true"]')).find((el) => el.classList.contains('ql-editor') && el.offsetParent !== null)
        || Array.from(document.querySelectorAll('[contenteditable="true"]')).find((el) => el.offsetParent !== null);
      if (!input) return false;
      input.focus();
      return true;
    })()
  `,
  deepseek: `
    (() => {
      const textareas = Array.from(document.querySelectorAll('textarea')).filter((el) => el.getClientRects().length > 0);
      const input = textareas[textareas.length - 1];
      if (!input) return false;
      input.focus();
      return true;
    })()
  `
};
var DEEPSEEK_VISION_MODE_SCRIPT = `
  (async () => {
    const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
    const visible = (el) => !!el && el.getClientRects().length > 0;
    const deadline = Date.now() + 8000;
    while (Date.now() < deadline) {
      // 1) 官方模式单选按钮
      const radio = document.querySelector('[data-model-type="vision"][role="radio"]');
      if (radio) {
        if (radio.getAttribute('aria-checked') !== 'true') { radio.click(); await sleep(400); }
        return { status: 'done', via: 'radio' };
      }
      // 2) 文案匹配的模式切换控件（图片识别/识图/看图/vision）
      const target = Array.from(document.querySelectorAll('button,[role="button"],[role="radio"],[role="switch"],label,span,div'))
        .filter(visible)
        .find((el) => {
          const label = (el.getAttribute('aria-label') || el.getAttribute('title') || el.innerText || el.textContent || '').trim();
          return /图片识别|识图|图像识别|看图|vision/i.test(label) && !/上传|附件|发送/.test(label) && label.length <= 12;
        });
      if (target) {
        const checked = target.getAttribute('aria-checked') === 'true' || target.getAttribute('aria-pressed') === 'true';
        if (!checked) { target.click(); await sleep(400); }
        return { status: 'done', via: 'text' };
      }
      await sleep(200);
    }
    return { status: 'mode_missing' };
  })()
`;
function buildRecognizeScript(provider, prompt) {
  const promptLiteral = JSON.stringify(prompt);
  if (provider === "doubao") return `
      (async () => {
        const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
        const prompt = ${promptLiteral};
        const visible = (el) => !!el && el.getClientRects().length > 0;
        function findInput() {
          const textarea = Array.from(document.querySelectorAll('textarea')).find((el) => visible(el) && !el.disabled);
          if (textarea) return textarea;
          return Array.from(document.querySelectorAll('[contenteditable="true"]')).find((el) => visible(el)) || null;
        }
        function setText(input, value) {
          input.focus();
          const proto = input instanceof HTMLTextAreaElement ? HTMLTextAreaElement.prototype : null;
          const setter = proto && Object.getOwnPropertyDescriptor(proto, 'value')?.set;
          if (setter) setter.call(input, value);
          else input.textContent = value;
          input.dispatchEvent(new InputEvent('input', { bubbles: true, inputType: 'insertText', data: value }));
          input.dispatchEvent(new Event('change', { bubbles: true }));
        }
        function findSend() {
          const direct = document.querySelector('#flow-end-msg-send');
          if (direct && visible(direct)) return direct;
          const btns = Array.from(document.querySelectorAll('button,[role="button"]')).filter(visible);
          return btns.find((el) => /send|发送/i.test([el.id, el.getAttribute('aria-label'), el.className].join(' '))) || null;
        }
        // 豆包消息列表是虚拟列表，DOM 顺序不等于消息顺序，必须按 --cls 里的 r-N- 序号定位。
        function getMessageRows() {
          return Array.from(document.querySelectorAll('.list_items .v_list_row, .v_list_row'))
            .filter((row) => row.querySelector('[data-message-id]') || row.getAttribute('data-observe-row'));
        }
        function getMessageRowOrder(row, fallbackIndex) {
          if (!row) return fallbackIndex ?? -1;
          const clsValue = row.style?.getPropertyValue('--cls') || row.getAttribute('style') || '';
          const clsMatch = clsValue.match(/r-([0-9]+)-/);
          if (clsMatch) return Number(clsMatch[1]);
          const classMatch = String(row.className || '').match(/r-([0-9]+)-/);
          if (classMatch) return Number(classMatch[1]);
          return fallbackIndex ?? getMessageRows().indexOf(row);
        }
        function getLatestMessageRowOrder() {
          const rows = getMessageRows();
          if (rows.length === 0) return -1;
          return Math.max(...rows.map((row, index) => getMessageRowOrder(row, index)));
        }
        function hasCompletedReceiveActionBar(row) {
          const actionBars = Array.from(row?.querySelectorAll('[data-foundation-type="receive-message-action-bar"]') || [])
            .filter((bar) => bar.closest('.v_list_row') === row);
          if (actionBars.length === 0) return false;
          return actionBars.some((bar) => {
            const hasRealActionBar = !!bar.querySelector('[class*="message-action-bar"]');
            const buttons = Array.from(bar.querySelectorAll('button')).filter(visible);
            return hasRealActionBar || buttons.length >= 3;
          });
        }
        function getLatestCompletedReceiveRowAfter(previousLastRowOrder) {
          const rows = getMessageRows()
            .map((row, index) => ({ row, order: getMessageRowOrder(row, index) }))
            .filter(({ row, order }) => order > previousLastRowOrder && hasCompletedReceiveActionBar(row))
            .sort((a, b) => a.order - b.order);
          return rows[rows.length - 1]?.row || null;
        }
        function extractAnswerText(row) {
          if (!row) return '';
          const candidates = Array.from(row.querySelectorAll('.md-box-root, [data-streaming], [data-container-type="block-v2"]'))
            .filter((el) => el.closest('.v_list_row') === row)
            .filter((el) => !el.closest('[data-foundation-type="receive-message-action-bar"]'))
            .filter((el) => (el.textContent || '').trim().length > 0);
          const answers = candidates.filter((el) => {
            return !el.matches('[data-locate="ignore"], [data-thinking-box], [data-plugin-identifier*="thinking_block"]')
              && !el.closest('[data-locate="ignore"], [data-thinking-box], [data-plugin-identifier*="thinking_block"]');
          });
          const target = answers[answers.length - 1] || candidates[candidates.length - 1] || row;
          const clone = target.cloneNode(true);
          clone.querySelectorAll([
            '[data-locate="ignore"]',
            '[data-thinking-box]',
            '[data-plugin-identifier*="thinking_block"]',
            '[data-foundation-type="receive-message-action-bar"]',
            '[data-foundation-type="receive-message-suggest-foundation"]',
            '[data-foundation-type="send-message-action-bar"]',
            'button',
            'svg'
          ].join(', ')).forEach((el) => el.remove());
          return (clone.innerText || clone.textContent || '').trim();
        }
        const input = findInput();
        if (!input) return { status: 'input_missing' };
        setText(input, prompt);
        await sleep(600);
        const previousLastRowOrder = getLatestMessageRowOrder();
        const btn = findSend();
        if (btn) btn.click(); else {
          input.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', keyCode: 13, bubbles: true }));
        }
        const deadline = Date.now() + 300000;
        let last = '';
        let stableSince = 0;
        await sleep(1500);
        while (Date.now() < deadline) {
          const targetRow = getLatestCompletedReceiveRowAfter(previousLastRowOrder);
          if (targetRow) {
            const text = extractAnswerText(targetRow);
            if (text !== last) { last = text; stableSince = Date.now(); }
            if (text && Date.now() - stableSince >= 2500) {
              return { status: 'done', text };
            }
          }
          await sleep(500);
        }
        return last ? { status: 'done', text: last } : { status: 'output_empty' };
      })()
    `;
  if (provider === "deepseek") return `
      (async () => {
        const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
        const prompt = ${promptLiteral};
        const visible = (el) => !!el && el.getClientRects().length > 0;
        function findTextarea() {
          const ts = Array.from(document.querySelectorAll('textarea')).filter(visible);
          return ts[ts.length - 1] || null;
        }
        function setNativeValue(el, value) {
          const setter = Object.getOwnPropertyDescriptor(window.HTMLTextAreaElement.prototype, 'value')?.set;
          if (setter) setter.call(el, value); else el.value = value;
        }
        function items() {
          return Array.from(document.querySelectorAll('[data-virtual-list-item-key]'))
            .map((el) => ({ el, key: Number(el.getAttribute('data-virtual-list-item-key')) }))
            .filter((i) => Number.isFinite(i.key)).sort((a, b) => a.key - b.key);
        }
        function complete(item) {
          if (!item?.el?.querySelector('.ds-assistant-message-main-content')) return false;
          return Array.from(item.el.querySelectorAll('[role="button"].ds-button--iconLabelTertiary')).filter(visible).length >= 3;
        }
        // 扫描所有基线之后的已完成回答项，而不是只盯最新一项（列表尾部可能出现非回答项）
        function completedAfter(prevKey) {
          const list = items().filter((i) => i.key > prevKey && complete(i));
          return list[list.length - 1] || null;
        }
        function markdown(item) {
          const c = item?.el?.querySelector('.ds-assistant-message-main-content');
          return c ? (c.innerText || c.textContent || '').trim() : '';
        }
        const ta = findTextarea();
        if (!ta) return { status: 'input_missing' };
        const prevKey = items().at(-1)?.key ?? -1;
        ta.focus();
        setNativeValue(ta, prompt);
        ta.dispatchEvent(new Event('input', { bubbles: true }));
        await sleep(600);
        const send = Array.from(document.querySelectorAll('div[role="button"].ds-button--primary.ds-button--circle')).filter(visible)[0];
        if (send) send.click(); else {
          ta.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', keyCode: 13, bubbles: true }));
        }
        const deadline = Date.now() + 300000;
        await sleep(1500);
        while (Date.now() < deadline) {
          const done = completedAfter(prevKey);
          if (done) {
            const text = markdown(done);
            if (text) return { status: 'done', text };
          }
          await sleep(500);
        }
        const latest = completedAfter(prevKey) || items().at(-1);
        const text = latest ? markdown(latest) : '';
        return text ? { status: 'done', text } : { status: 'output_empty' };
      })()
    `;
  return `
    (async () => {
      const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
      const prompt = ${promptLiteral};
      const visible = (el) => !!el && el.getClientRects().length > 0;
      function findInput() {
        const editors = Array.from(document.querySelectorAll('[contenteditable="true"]'));
        return editors.find((el) => el.classList.contains('ql-editor') && el.offsetParent !== null)
          || editors.find((el) => el.offsetParent !== null) || null;
      }
      // 元宝需要同时定位会话项并判断回复是否完成。
      function items() {
        const list = document.querySelector('.agent-chat__list__content');
        const nodes = list
          ? Array.from(list.children).filter((el) => el.matches && el.matches('[data-conv-idx]'))
          : Array.from(document.querySelectorAll('.agent-chat__list__item[data-conv-idx], [data-conv-speaker][data-conv-idx]'));
        return nodes
          .map((el) => ({ el, idx: Number(el.getAttribute('data-conv-idx')) }))
          .filter((i) => Number.isFinite(i.idx)).sort((a, b) => a.idx - b.idx);
      }
      function isAi(item) {
        const el = item?.el;
        if (!el) return false;
        return el.getAttribute('data-conv-speaker') === 'ai'
          || el.classList.contains('agent-chat__list__item--ai')
          || !!el.querySelector('.agent-chat__conv--ai__speech_show');
      }
      function hasOwnToolbar(item) {
        return Array.from(item.el.querySelectorAll('.agent-chat__conv--ai__toolbar'))
          .some((toolbar) => toolbar.closest('[data-conv-idx]') === item.el);
      }
      // toolbar 可能早于正文完全渲染出现，需同时确认没有未完成的 markdown 块
      function isOutputting(item) {
        const el = item.el;
        return el.getAttribute('data-conv-outputting') === 'true'
          || !!el.querySelector('.hyc-content-md:not(.hyc-content-md-done)')
          || !!el.querySelector('[data-conv-outputting="true"],[class*="outputting"],[class*="generating"]');
      }
      function complete(item) {
        return isAi(item) && hasOwnToolbar(item) && !isOutputting(item);
      }
      function completedAfter(prevIdx) {
        const list = items().filter((i) => i.idx > prevIdx && complete(i));
        return list[list.length - 1] || null;
      }
      // 取最后一个非思考 markdown 块；深度搜索的思考内容包在 deepsearch-cot__think 容器里，必须排除
      function markdown(item) {
        const candidates = Array.from(item.el.querySelectorAll('.hyc-common-markdown-style'))
          .filter((el) => el.closest('[data-conv-idx]') === item.el)
          .filter((el) => !el.classList.contains('hyc-common-markdown-style-cot')
            && !el.closest('.hyc-component-deepsearch-cot__think, .hyc-component-deepsearch-cot__think__content, .hyc-common-markdown-style-cot')
            && (el.textContent || '').trim().length > 0);
        const el = candidates[candidates.length - 1];
        if (!el) return '';
        const clone = el.cloneNode(true);
        clone.querySelectorAll('.hyc-component-deepsearch-cot__think,.hyc-component-deepsearch-cot__think__content,.hyc-common-markdown-style-cot,.agent-chat__conv--ai__toolbar,.agent-chat__toolbar,.agent-chat__question-toolbar').forEach((n) => n.remove());
        return (clone.innerText || clone.textContent || '').trim();
      }
      const input = findInput();
      if (!input) return { status: 'input_missing' };
      input.focus();
      document.execCommand('insertText', false, prompt);
      input.dispatchEvent(new Event('input', { bubbles: true }));
      await sleep(600);
      const prevIdx = items().at(-1)?.idx ?? -1;
      const send = Array.from(document.querySelectorAll('a[class*="send-btn"],[class*="send-btn"]'))
        .find((b) => b.offsetParent !== null && !/disabled/.test(b.className) && b.querySelector('[class*="icon-send"]'));
      if (send) send.click();
      const deadline = Date.now() + 300000;
      await sleep(1500);
      let last = '';
      let stableSince = 0;
      while (Date.now() < deadline) {
        const done = completedAfter(prevIdx);
        if (done) {
          const text = markdown(done);
          if (text !== last) { last = text; stableSince = Date.now(); }
          if (text && Date.now() - stableSince >= 2000) return { status: 'done', text };
        }
        await sleep(500);
      }
      return last ? { status: 'done', text: last } : { status: 'output_empty' };
    })()
  `;
}
var WebAccountRecognitionService = class {
  activeAccountIds = /* @__PURE__ */new Set();
  accountReleaseWaiters = [];
  clipboardQueue = Promise.resolve();
  /** 轮循可用账号做网页自动化识别，失败自动冷却并换下一个账号 */
  async recognize(images, prompt) {
    return this.recognizeWithCandidates(images, prompt);
  }
  async withClipboardLock(operation) {
    const previous = this.clipboardQueue;
    let release;
    this.clipboardQueue = new Promise(resolve => {
      release = resolve;
    });
    await previous.catch(() => {});
    try {
      return await operation();
    } finally {
      release();
    }
  }
  waitForAccountRelease() {
    return new Promise(resolve => {
      this.accountReleaseWaiters.push(resolve);
    });
  }
  releaseAccount(accountId) {
    this.activeAccountIds.delete(accountId);
    this.accountReleaseWaiters.splice(0).forEach(resolve => resolve());
  }
  async acquireAccount(attemptedAccountIds, lang) {
    while (true) {
      const candidates = webAccountSchedulerService.pickCandidates("capture").filter(account => !attemptedAccountIds.has(account.id));
      const idle = candidates.find(account => !this.activeAccountIds.has(account.id));
      if (idle) {
        webAccountSchedulerService.markAttempted(idle.id);
        this.activeAccountIds.add(idle.id);
        return idle;
      }
      if (candidates.length === 0) return null;
      await this.waitForAccountRelease();
      if (webAccountSchedulerService.pickCandidates("capture").length === 0) throw new Error(t("webAccount.noAvailableAccount", lang));
    }
  }
  async recognizeWithCandidates(images, prompt) {
    const lang = getLanguage();
    let lastError = t("webAccount.recognizeFailed", lang);
    const attemptedAccountIds = /* @__PURE__ */new Set();
    while (true) {
      const account = await this.acquireAccount(attemptedAccountIds, lang);
      if (!account) {
        if (attemptedAccountIds.size === 0) throw new Error(t("webAccount.noAvailableAccount", lang));
        throw new Error(lastError);
      }
      attemptedAccountIds.add(account.id);
      try {
        const text = await this.runOnce(account, images, prompt);
        if (text) {
          webAccountSchedulerService.markUsed(account.id);
          return {
            text,
            provider: providerLabel(account.provider, lang),
            accountId: account.accountId
          };
        }
        lastError = t("webAccount.recognizeFailed", lang);
        webAccountSchedulerService.recordFailure(account.id, lastError);
      } catch (error) {
        lastError = error.message || t("webAccount.recognizeFailed", lang);
        if (/login|登录/i.test(lastError)) webAccountSchedulerService.markLoginRequired(account.id, lastError);else if (isRecognitionTimeoutError(error)) {
          webAccountSchedulerService.recordFailure(account.id, lastError);
          throw error;
        } else webAccountSchedulerService.recordFailure(account.id, lastError);
      } finally {
        this.releaseAccount(account.id);
      }
    }
  }
  async runOnce(account, images, prompt) {
    const lang = getLanguage();
    const window = createRecognitionWindow(account.partition);
    try {
      return await withRecognitionTimeout(this.runOnceInWindow(window, account, images, prompt, lang), lang);
    } finally {
      if (!window.isDestroyed()) {
        window.removeAllListeners("closed");
        window.destroy();
      }
    }
  }
  async runOnceInWindow(window, account, images, prompt, lang) {
    await waitForLoad(window, WEB_ACCOUNT_URLS[account.provider]);
    const loginDeadline = Date.now() + LOGIN_WAIT_MS;
    let loggedIn = false;
    while (Date.now() < loginDeadline) {
      if ((await getWebAccountLoginState(window, account.provider)).loggedIn) {
        loggedIn = true;
        break;
      }
      await sleep(1e3);
    }
    if (!loggedIn) throw new Error(t("webAccount.loginRequired", lang));
    await prepareFreshConversation(window, account.provider);
    if (account.provider === "deepseek") {
      await window.webContents.executeJavaScript(DEEPSEEK_VISION_MODE_SCRIPT).catch(() => null);
      await sleep(600);
    }
    await this.withClipboardLock(() => pasteImages(window, images, FOCUS_INPUT_SCRIPTS[account.provider]));
    await sleep(AFTER_PASTE_SETTLE_MS);
    const result = await window.webContents.executeJavaScript(buildRecognizeScript(account.provider, prompt));
    if (result?.status === "done" && result.text?.trim()) return result.text.trim();
    return "";
  }
};
var webAccountRecognitionService = new WebAccountRecognitionService();
//#endregion
export { webAccountRecognitionService };