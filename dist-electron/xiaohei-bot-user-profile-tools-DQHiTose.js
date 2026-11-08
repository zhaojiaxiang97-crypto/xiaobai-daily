import { createRequire as __nodeCreateRequire } from "node:module";
__nodeCreateRequire(import.meta.url);
import { Pt as getOpenDatabaseConnection, xt as stringType, yt as objectType } from "./settings.repository-DnN-jwx0.js";
import { $t as BotMemoryRepository, d as userProfileMemoryRepository, en as memoryHash, v as XiaoheiDataToolError } from "./auth.service-DlN4Zn4h.js";
//#region electron/services/xiaohei-bot-user-profile-tools.ts
var PROFILE_TOTAL_LIMIT = 12e3;
var toolSchema = objectType({
	preferred_name: stringType().trim().min(1).max(100).optional(),
	aliases: stringType().trim().max(500).optional(),
	role_positioning: stringType().trim().max(4e3).optional(),
	organizations_and_titles: stringType().trim().max(4e3).optional(),
	projects_and_business: stringType().trim().max(4e3).optional(),
	responsibilities_and_work: stringType().trim().max(4e3).optional(),
	team_and_collaborators: stringType().trim().max(4e3).optional(),
	additional_context: stringType().trim().max(4e3).optional(),
	request_quote: stringType().trim().min(1).max(2e3)
}).strict().refine((value) => Object.keys(value).some((key) => key !== "request_quote"), { message: "至少提供一个要更新的资料字段" });
async function executeBotUserProfileTool(raw, context) {
	const parsed = toolSchema.safeParse(raw);
	if (!parsed.success) throw new XiaoheiDataToolError("INVALID_ARGUMENT", parsed.error.issues.map((issue) => issue.message).join("；"));
	context.assertActive();
	const connection = getOpenDatabaseConnection();
	if (!connection || connection.generation !== context.expectedDatabaseGeneration || (connection.ownerUserId ?? 0) !== context.expectedUserId) throw new XiaoheiDataToolError("DATASET_CHANGED", "账号已切换，请重新发起资料更新请求");
	const repository = new BotMemoryRepository(connection.database);
	const input = parsed.data;
	const trigger = context.triggerMessageId && repository.readUserMessage(context.botId, context.conversationId, context.triggerMessageId);
	if (!trigger || !trigger.content.includes(input.request_quote)) throw new XiaoheiDataToolError("ACCESS_DENIED", "用户资料修改必须引用当前用户消息中的明确请求，不能用系统消息或 Bot 发言授权");
	const hash = memoryHash({
		botId: context.botId,
		conversationId: context.conversationId,
		trigger: context.triggerMessageId,
		toolName: "xiaohei_update_user_profile",
		input
	});
	let result;
	try {
		result = repository.transaction(() => {
			const previous = connection.database.prepare(`SELECT bot_id, input_hash, result_json FROM xiaohei_bot_memory_operations
        WHERE request_id = ? AND tool_call_id = ?`).get(context.requestId, context.toolCallId);
			if (previous) {
				if (previous.bot_id !== context.botId || previous.input_hash !== hash) throw new Error("同一次资料工具调用的参数发生变化");
				return JSON.parse(previous.result_json);
			}
			const merged = { ...userProfileMemoryRepository.getOrEmpty() };
			const updatedFields = [];
			const assignments = [
				["preferredName", "preferred_name"],
				["aliases", "aliases"],
				["rolePositioning", "role_positioning"],
				["organizationsAndTitles", "organizations_and_titles"],
				["projectsAndBusiness", "projects_and_business"],
				["responsibilitiesAndWork", "responsibilities_and_work"],
				["teamAndCollaborators", "team_and_collaborators"],
				["additionalContext", "additional_context"]
			];
			for (const [target, source] of assignments) {
				const value = input[source];
				if (value !== void 0) {
					merged[target] = value;
					updatedFields.push(target);
				}
			}
			if (!merged.preferredName.trim()) throw new Error("资料中缺少称呼，请在 preferred_name 中提供用户希望使用的称呼");
			if (assignments.map(([target]) => merged[target]).reduce((sum, field) => sum + field.length, 0) > PROFILE_TOTAL_LIMIT) throw new Error("用户资料总长度超过 12000 字，请压缩内容");
			const value = { saved: {
				updatedFields,
				profile: userProfileMemoryRepository.save(merged)
			} };
			connection.database.prepare(`INSERT INTO xiaohei_bot_memory_operations(request_id, tool_call_id, bot_id, input_hash, result_json)
        VALUES (?, ?, ?, ?, ?)`).run(context.requestId, context.toolCallId, context.botId, hash, JSON.stringify(value));
			return value;
		});
	} catch (error) {
		throw new XiaoheiDataToolError("INVALID_ARGUMENT", error instanceof Error ? error.message : "用户资料更新失败");
	}
	const { botMemoryService } = await import("./auth.service-DlN4Zn4h.js").then((n) => n.g);
	botMemoryService.notify(context.botId);
	return result;
}
//#endregion
export { executeBotUserProfileTool };
