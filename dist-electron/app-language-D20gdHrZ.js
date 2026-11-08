import { createRequire as __nodeCreateRequire } from "node:module";
__nodeCreateRequire(import.meta.url);
import { Pt as getOpenDatabaseConnection, i as t, n as settingsRepository } from "./settings.repository-DnN-jwx0.js";
//#region electron/utils/app-language.ts
var CACHE_TTL_MS = 2e3;
var cached = null;
/** 当前界面语言；账号数据库尚未打开（登录前、切换账号中）时按中文处理 */
function appLanguage() {
	try {
		const generation = getOpenDatabaseConnection()?.generation ?? -1;
		const revision = settingsRepository.getRevision();
		const now = Date.now();
		if (cached && cached.generation === generation && cached.revision === revision && now - cached.at < CACHE_TTL_MS) return cached.language;
		const language = settingsRepository.getSettings().language || "zh-CN";
		cached = {
			generation,
			revision,
			language,
			at: now
		};
		return language;
	} catch {
		return "zh-CN";
	}
}
/** 把文案里的 {name} 占位符替换成参数值，没有对应参数的占位符原样保留 */
function formatText(text, params) {
	if (!params) return text;
	return text.replace(/\{(\w+)\}/g, (match, name) => name in params ? String(params[name]) : match);
}
/** 按当前界面语言取主进程文案 */
function appText(key, params) {
	return formatText(t(key, appLanguage()), params);
}
//#endregion
export { appText as n, appLanguage as t };
