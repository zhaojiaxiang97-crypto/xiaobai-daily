import { createRequire as __nodeCreateRequire } from "node:module";
__nodeCreateRequire(import.meta.url);
import { Mt as getDatabase, n as settingsRepository } from "./settings.repository.js";
import { randomUUID } from "node:crypto";
//#region electron/repositories/web-account.repository.ts
function mapRow(row) {
	return {
		id: row.id,
		provider: row.provider,
		accountId: row.account_id,
		accountName: row.account_name,
		avatarUrl: row.avatar_url,
		partition: row.partition,
		enabledForCapture: row.enabled_for_capture === 1,
		enabledForReport: row.enabled_for_report === 1,
		status: row.status,
		cooldownUntil: row.cooldown_until,
		failureReason: row.failure_reason,
		consecutiveFailures: row.consecutive_failures ?? 0,
		lastUsedAt: row.last_used_at,
		createdAt: row.created_at,
		updatedAt: row.updated_at
	};
}
var WebAccountRepository = class {
	list() {
		return getDatabase().prepare("SELECT * FROM web_accounts ORDER BY provider, created_at").all().map(mapRow);
	}
	getById(id) {
		const row = getDatabase().prepare("SELECT * FROM web_accounts WHERE id = ?").get(id);
		return row ? mapRow(row) : null;
	}
	findByProviderAccountId(provider, accountId) {
		if (!accountId) return null;
		const row = getDatabase().prepare("SELECT * FROM web_accounts WHERE provider = ? AND account_id = ?").get(provider, accountId);
		return row ? mapRow(row) : null;
	}
	create(input) {
		const now = (/* @__PURE__ */ new Date()).toISOString();
		const id = randomUUID();
		getDatabase().prepare(`
        INSERT INTO web_accounts (
          id, provider, account_id, account_name, avatar_url, partition,
          enabled_for_capture, enabled_for_report, status, created_at, updated_at
        ) VALUES (?, ?, ?, ?, ?, ?, 1, 1, 'healthy', ?, ?)
      `).run(id, input.provider, input.accountId ?? "", input.accountName ?? "", input.avatarUrl ?? "", input.partition, now, now);
		return this.getById(id);
	}
	update(id, input) {
		const existing = this.getById(id);
		if (!existing) return null;
		const now = (/* @__PURE__ */ new Date()).toISOString();
		getDatabase().prepare(`
        UPDATE web_accounts SET
          account_id = ?,
          account_name = ?,
          avatar_url = ?,
          enabled_for_capture = ?,
          enabled_for_report = ?,
          status = ?,
          cooldown_until = ?,
          failure_reason = ?,
          consecutive_failures = ?,
          last_used_at = ?,
          updated_at = ?
        WHERE id = ?
      `).run(input.accountId ?? existing.accountId, input.accountName ?? existing.accountName, input.avatarUrl ?? existing.avatarUrl, input.enabledForCapture ?? existing.enabledForCapture ? 1 : 0, input.enabledForReport ?? existing.enabledForReport ? 1 : 0, input.status ?? existing.status, input.cooldownUntil === void 0 ? existing.cooldownUntil : input.cooldownUntil, input.failureReason === void 0 ? existing.failureReason : input.failureReason, input.consecutiveFailures === void 0 ? existing.consecutiveFailures : input.consecutiveFailures, input.lastUsedAt === void 0 ? existing.lastUsedAt : input.lastUsedAt, now, id);
		return this.getById(id);
	}
	delete(id) {
		const result = getDatabase().prepare("DELETE FROM web_accounts WHERE id = ?").run(id);
		return Number(result.changes) > 0;
	}
};
var webAccountRepository = new WebAccountRepository();
//#endregion
//#region electron/services/web-account-scheduler.service.ts
var COOLDOWN_MS = 6e5;
var FAILURES_TO_COOLDOWN = 5;
var FAILURES_TO_DISABLE = 10;
function taskEnabled(account, task) {
	return task === "capture" ? account.enabledForCapture : account.enabledForReport;
}
function isAvailable(account, now = Date.now()) {
	if (account.status === "disabled" || account.status === "login_required") return false;
	if (account.cooldownUntil && new Date(account.cooldownUntil).getTime() > now) return false;
	return true;
}
function lastUsedTime(account) {
	return account.lastUsedAt ? new Date(account.lastUsedAt).getTime() : 0;
}
var WebAccountSchedulerService = class {
	/**
	* 按轮循策略返回可用账号的候选序列（识别失败时按序换下一个账号重试）。
	* sequential：最久未用优先；random：随机打乱。
	*/
	pickCandidates(task, provider) {
		const strategy = settingsRepository.getSettings().webAccountRotationStrategy;
		const candidates = webAccountRepository.list().filter((account) => provider ? account.provider === provider : true).filter((account) => taskEnabled(account, task)).filter((account) => isAvailable(account));
		if (strategy === "random") {
			for (let i = candidates.length - 1; i > 0; i--) {
				const j = Math.floor(Math.random() * (i + 1));
				[candidates[i], candidates[j]] = [candidates[j], candidates[i]];
			}
			return candidates;
		}
		return candidates.sort((a, b) => {
			const used = lastUsedTime(a) - lastUsedTime(b);
			if (used !== 0) return used;
			return a.createdAt.localeCompare(b.createdAt);
		});
	}
	pickAccount(task, provider) {
		return this.pickCandidates(task, provider)[0] ?? null;
	}
	/** 开始尝试识别即视为使用过一次，避免失败账号在顺序轮循中连续抢占下一次任务 */
	markAttempted(accountId) {
		webAccountRepository.update(accountId, { lastUsedAt: (/* @__PURE__ */ new Date()).toISOString() });
	}
	/** 识别成功：清零连续失败计数并恢复健康 */
	markUsed(accountId) {
		webAccountRepository.update(accountId, {
			status: "healthy",
			lastUsedAt: (/* @__PURE__ */ new Date()).toISOString(),
			cooldownUntil: null,
			failureReason: null,
			consecutiveFailures: 0
		});
	}
	/**
	* 识别失败：累加连续失败次数。
	* 未达阈值只计数、账号仍可用（下次继续轮循）；连续 5 次进入冷却；累计 10 次置为「需重新登录」。
	*/
	recordFailure(accountId, reason) {
		const account = webAccountRepository.getById(accountId);
		if (!account) return;
		const failures = (account.consecutiveFailures ?? 0) + 1;
		if (failures >= FAILURES_TO_DISABLE) {
			webAccountRepository.update(accountId, {
				status: "login_required",
				cooldownUntil: null,
				failureReason: reason,
				consecutiveFailures: failures
			});
			return;
		}
		if (failures >= FAILURES_TO_COOLDOWN) {
			webAccountRepository.update(accountId, {
				status: "cooldown",
				cooldownUntil: new Date(Date.now() + COOLDOWN_MS).toISOString(),
				failureReason: reason,
				consecutiveFailures: failures
			});
			return;
		}
		webAccountRepository.update(accountId, {
			status: "healthy",
			failureReason: reason,
			consecutiveFailures: failures
		});
	}
	/** 登录态失效等硬性不可用：立即置为「需重新登录」 */
	markLoginRequired(accountId, reason) {
		webAccountRepository.update(accountId, {
			status: "login_required",
			cooldownUntil: null,
			failureReason: reason
		});
	}
};
var webAccountSchedulerService = new WebAccountSchedulerService();
//#endregion
export { webAccountRepository as n, webAccountSchedulerService as t };
