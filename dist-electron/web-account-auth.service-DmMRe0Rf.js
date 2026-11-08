import { createRequire as __nodeCreateRequire } from "node:module";
__nodeCreateRequire(import.meta.url);
import { Mt as getDatabase, i as t, n as settingsRepository } from "./settings.repository-DnN-jwx0.js";
import { n as webAccountRepository } from "./web-account-scheduler.service-B79fELcm.js";
import { randomUUID } from "node:crypto";
import { BrowserWindow, screen, session } from "electron";
//#region electron/services/chat-window-position.service.ts
var DEFAULT_WIDTH = 1280;
var DEFAULT_HEIGHT = 800;
var OFFSET_X = 160;
var OFFSET_Y = 100;
var ChatWindowPositionService = class {
	windows = /* @__PURE__ */ new Set();
	/**
	* 注册一个对话窗口，并根据当前已注册窗口数量自动错位排列，
	* 避免多个窗口同时打开时完全重叠遮挡。
	*/
	arrange(window) {
		this.windows.add(window);
		window.on("closed", () => {
			this.windows.delete(window);
		});
		const index = Array.from(this.windows).indexOf(window);
		const { width, height } = screen.getPrimaryDisplay().workAreaSize;
		const baseX = Math.round((width - DEFAULT_WIDTH) / 2);
		const baseY = Math.round((height - DEFAULT_HEIGHT) / 2);
		const x = Math.max(0, Math.min(baseX + index * OFFSET_X, width - DEFAULT_WIDTH));
		const y = Math.max(0, Math.min(baseY + index * OFFSET_Y, height - DEFAULT_HEIGHT));
		window.setPosition(x, y);
	}
};
var chatWindowPositionService = new ChatWindowPositionService();
//#endregion
//#region electron/services/web-account-auth.service.ts
var WEB_ACCOUNT_URLS = {
	doubao: "https://www.doubao.com/chat/",
	yuanbao: "https://yuanbao.tencent.com/",
	deepseek: "https://chat.deepseek.com/"
};
var LOGIN_POLL_INTERVAL_MS = 2e3;
var LOGIN_TIMEOUT_MS = 3e5;
var IDENTITY_SETTLE_MS = 2500;
function sendToRenderer(channel, ...args) {
	const win = BrowserWindow.getAllWindows()[0];
	if (win && !win.isDestroyed()) win.webContents.send(channel, ...args);
}
function emitWebAccountsChanged() {
	sendToRenderer("web-accounts:changed");
}
function getLanguage() {
	return settingsRepository.getSettings().language || "zh-CN";
}
function newPartition(provider) {
	return `persist:webacct-${provider}-${randomUUID()}`;
}
function readText(value) {
	if (typeof value === "string") return value.trim();
	if (typeof value === "number") return String(value);
	return "";
}
function parseDoubaoIdentity(json) {
	const data = json?.data;
	const source = data?.profile_brief ?? data ?? {};
	const accountId = readText(source.id) || readText(source.entity_id) || readText(source.user_id);
	if (!accountId) return null;
	return {
		accountId,
		accountName: readText(source.nickname) || readText(source.user_name) || readText(source.name),
		avatarUrl: readText(source.avatar_url) || readText(source.avatar)
	};
}
function parseYuanbaoIdentity(json) {
	const outer = json;
	const root = outer?.data ?? outer;
	const accountId = readText(root.userId) || readText(root.userName) || readText(root.nickName) || readText(root.phoneNumber);
	if (!accountId) return null;
	return {
		accountId,
		accountName: readText(root.nickName) || readText(root.userName) || readText(root.phoneNumber),
		avatarUrl: readText(root.profileImage) || readText(root.imageUrl)
	};
}
function parseDeepseekIdentity(json) {
	const data = json?.data;
	const bizData = data?.biz_data ?? {};
	const user = bizData.user ?? data?.user ?? bizData ?? {};
	const accountId = readText(user.id);
	if (!accountId) return null;
	return {
		accountId,
		accountName: readText(user.email) || readText(user.mobile_number) || readText(user.name),
		avatarUrl: ""
	};
}
var IDENTITY_URL_MATCHERS = {
	doubao: {
		match: (url) => url.includes("/alice/profile/self"),
		parse: parseDoubaoIdentity
	},
	yuanbao: {
		match: (url) => url.includes("/api/getuserinfo"),
		parse: parseYuanbaoIdentity
	},
	deepseek: {
		match: (url) => url.includes("/api/v0/users/current") || url.includes("/api/v0/users/login"),
		parse: parseDeepseekIdentity
	}
};
/** 通过 CDP 拦截平台的「当前用户」接口响应，自动识别账号昵称/头像，减少手动输入 */
function attachIdentityInterceptor(window, provider, onIdentity) {
	const matcher = IDENTITY_URL_MATCHERS[provider];
	if (!matcher) return;
	const wc = window.webContents;
	try {
		if (!wc.debugger.isAttached()) wc.debugger.attach("1.3");
		wc.debugger.sendCommand("Network.enable");
	} catch {
		return;
	}
	const pendingRequests = /* @__PURE__ */ new Map();
	wc.debugger.on("message", (_event, method, params) => {
		try {
			if (method === "Network.responseReceived") {
				const { requestId, response } = params;
				if (response.status === 200 && matcher.match(response.url)) pendingRequests.set(requestId, response.url);
				return;
			}
			if (method === "Network.loadingFinished") {
				const { requestId } = params;
				if (!pendingRequests.has(requestId)) return;
				pendingRequests.delete(requestId);
				wc.debugger.sendCommand("Network.getResponseBody", { requestId }).then((result) => {
					const { body, base64Encoded } = result;
					const text = base64Encoded ? Buffer.from(body, "base64").toString("utf-8") : body;
					const identity = matcher.parse(JSON.parse(text));
					if (identity) onIdentity(identity);
				}).catch(() => {});
			}
		} catch {}
	});
}
var LOGIN_STATE_SCRIPTS = {
	doubao: `
    (() => {
      const visible = (el) => !!el && el.getClientRects().length > 0;
      const buttons = Array.from(document.querySelectorAll('button'));
      const loginBtn = buttons.find((btn) => {
        if (!visible(btn)) return false;
        const content = btn.querySelector('.semi-button-content');
        const text = ((content ? content.textContent : btn.textContent) || '').trim();
        return text === '登录';
      });
      const profileBtn = buttons.find((btn) => visible(btn) && btn.querySelector('img.rounded-full'));
      const avatar = profileBtn ? profileBtn.querySelector('img.rounded-full') : null;
      return {
        loggedIn: !loginBtn && !!profileBtn,
        nickname: '',
        avatarUrl: avatar ? (avatar.currentSrc || avatar.src || '') : '',
      };
    })()
  `,
	yuanbao: `
    (() => {
      const byClass = document.querySelector('button[class*="login"]');
      const loginBtn = (byClass && byClass.offsetParent !== null && byClass.textContent.trim() === '登录')
        ? byClass
        : Array.from(document.querySelectorAll('button')).find((btn) => btn.offsetParent !== null && btn.textContent.trim() === '登录') || null;
      const nickEl = document.querySelector('[class*="nick-info-name"]');
      const nickText = nickEl ? (nickEl.textContent || '').trim() : '';
      const notLogged = nickText === '未登录';
      const editor = Array.from(document.querySelectorAll('[contenteditable="true"]')).find((el) => el.offsetParent !== null);
      const avatarImg = document.querySelector('[class*="nick-info"] img, img[class*="avatar"]');
      return {
        loggedIn: !loginBtn && !notLogged && !!editor,
        nickname: notLogged ? '' : nickText,
        avatarUrl: avatarImg ? (avatarImg.currentSrc || avatarImg.src || '') : '',
      };
    })()
  `,
	deepseek: `
    (() => {
      const hasSignIn = location.href.includes('/sign_in');
      const textarea = document.querySelector('textarea');
      return { loggedIn: !hasSignIn && !!textarea, nickname: '', avatarUrl: '' };
    })()
  `
};
async function getWebAccountLoginState(window, provider) {
	try {
		return await window.webContents.executeJavaScript(LOGIN_STATE_SCRIPTS[provider]);
	} catch {
		return {
			loggedIn: false,
			nickname: "",
			avatarUrl: ""
		};
	}
}
function buildLoginTipScript(tipText) {
	return `
    (() => {
      if (document.getElementById('electron-web-account-tip')) return;
      const tip = document.createElement('div');
      tip.id = 'electron-web-account-tip';
      tip.style.cssText = 'position:fixed;top:16px;left:50%;transform:translateX(-50%);z-index:99999;width:max-content;max-width:min(640px,calc(100% - 32px));box-sizing:border-box;background:#ffffff;border:1px solid #e5e5e5;border-radius:10px;padding:14px 18px;box-shadow:0 4px 20px rgba(0,0,0,0.08),0 1px 3px rgba(0,0,0,0.04);display:flex;align-items:center;gap:12px;font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif;font-size:14px;line-height:1.5;color:#171717;';
      const icon = document.createElement('div');
      icon.style.cssText = 'flex-shrink:0;width:22px;height:22px;border-radius:50%;background:#22c55e;display:flex;align-items:center;justify-content:center;';
      icon.innerHTML = '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>';
      const text = document.createElement('span');
      text.textContent = ${JSON.stringify(tipText)};
      tip.appendChild(icon);
      tip.appendChild(text);
      document.body.appendChild(tip);
    })()
  `;
}
function sleep(ms) {
	return new Promise((resolve) => setTimeout(resolve, ms));
}
async function clearPartitionData(partition) {
	try {
		await session.fromPartition(partition).clearStorageData();
	} catch {}
}
var WebAccountAuthService = class {
	authorizing = false;
	/**
	* 打开绑定窗口让用户登录平台账号。
	* 传 accountRowId 时为「重新登录」，复用原账号的 partition；否则创建新账号（新 partition）。
	*/
	async authorize(provider, accountRowId) {
		const lang = getLanguage();
		if (this.authorizing) return {
			bound: false,
			message: t("webAccount.operationFailed", lang)
		};
		const existing = accountRowId ? webAccountRepository.getById(accountRowId) : null;
		if (accountRowId && !existing) return {
			bound: false,
			message: t("webAccount.accountNotFound", lang)
		};
		const partition = existing?.partition ?? newPartition(provider);
		this.authorizing = true;
		const window = new BrowserWindow({
			width: 1100,
			height: 760,
			webPreferences: {
				session: session.fromPartition(partition),
				contextIsolation: true,
				nodeIntegration: false
			}
		});
		let detectedIdentity = null;
		attachIdentityInterceptor(window, provider, (identity) => {
			detectedIdentity = identity;
		});
		try {
			const result = await new Promise((resolve) => {
				let settled = false;
				let tipShown = false;
				const finish = (value) => {
					if (settled) return;
					settled = true;
					resolve(value);
				};
				window.on("closed", () => {
					finish({
						bound: false,
						message: t("webAccount.windowClosed", lang)
					});
				});
				const startedAt = Date.now();
				const poll = async () => {
					while (!settled) {
						if (window.isDestroyed()) return;
						if (Date.now() - startedAt > LOGIN_TIMEOUT_MS) {
							finish({
								bound: false,
								message: t("webAccount.loginTimeout", lang)
							});
							return;
						}
						if ((await getWebAccountLoginState(window, provider)).loggedIn) {
							await sleep(IDENTITY_SETTLE_MS);
							if (window.isDestroyed() || settled) return;
							const finalState = await getWebAccountLoginState(window, provider);
							const account = this.persistAccount(provider, partition, existing, detectedIdentity, finalState, lang);
							finish(account);
							return;
						}
						if (!tipShown) {
							tipShown = true;
							window.webContents.executeJavaScript(buildLoginTipScript(t("webAccount.loginTip", lang))).catch(() => {});
						}
						await sleep(LOGIN_POLL_INTERVAL_MS);
					}
				};
				window.loadURL(WEB_ACCOUNT_URLS[provider]).then(() => {
					poll();
				}).catch(() => {
					poll();
				});
			});
			emitWebAccountsChanged();
			return result;
		} finally {
			this.authorizing = false;
			if (!window.isDestroyed()) {
				window.removeAllListeners("closed");
				window.close();
			}
		}
	}
	persistAccount(provider, partition, existing, identity, loginState, lang) {
		const detectedName = identity?.accountName || loginState.nickname;
		const detectedAvatar = identity?.avatarUrl || loginState.avatarUrl;
		const detectedAccountId = identity?.accountId || "";
		if (existing) return {
			bound: true,
			account: webAccountRepository.update(existing.id, {
				accountId: detectedAccountId || existing.accountId,
				accountName: existing.accountName || detectedName,
				avatarUrl: detectedAvatar || existing.avatarUrl,
				status: "healthy",
				cooldownUntil: null,
				failureReason: null,
				consecutiveFailures: 0
			}) ?? existing
		};
		const duplicated = detectedAccountId ? webAccountRepository.findByProviderAccountId(provider, detectedAccountId) : null;
		if (duplicated) {
			const oldPartition = duplicated.partition;
			const updated = webAccountRepository.update(duplicated.id, {
				accountName: duplicated.accountName || detectedName,
				avatarUrl: detectedAvatar || duplicated.avatarUrl,
				status: "healthy",
				cooldownUntil: null,
				failureReason: null,
				consecutiveFailures: 0
			});
			if (oldPartition !== partition) {
				updateAccountPartition(duplicated.id, partition);
				clearPartitionData(oldPartition);
			}
			return {
				bound: true,
				account: updated ? {
					...updated,
					partition
				} : duplicated,
				message: t("webAccount.alreadyBound", lang)
			};
		}
		const providerLabel = t(`webAccount.providerName.${provider}`, lang);
		const fallbackName = t("webAccount.fallbackAccountName", lang).replace("{provider}", providerLabel).replace("{index}", String(webAccountRepository.list().filter((a) => a.provider === provider).length + 1));
		const accountId = detectedAccountId || `${provider}-${Date.now()}`;
		return {
			bound: true,
			account: webAccountRepository.create({
				provider,
				accountId,
				accountName: detectedName || fallbackName,
				avatarUrl: detectedAvatar,
				partition
			})
		};
	}
	async unbind(accountRowId) {
		const account = webAccountRepository.getById(accountRowId);
		if (!account) return false;
		webAccountRepository.delete(accountRowId);
		await clearPartitionData(account.partition);
		emitWebAccountsChanged();
		return true;
	}
};
function updateAccountPartition(accountRowId, partition) {
	getDatabase().prepare("UPDATE web_accounts SET partition = ?, updated_at = ? WHERE id = ?").run(partition, (/* @__PURE__ */ new Date()).toISOString(), accountRowId);
}
var webAccountAuthService = new WebAccountAuthService();
//#endregion
export { chatWindowPositionService as a, webAccountAuthService as i, emitWebAccountsChanged as n, getWebAccountLoginState as r, WEB_ACCOUNT_URLS as t };
