import { createRequire as __nodeCreateRequire } from "node:module";
__nodeCreateRequire(import.meta.url);
import { Pt as getOpenDatabaseConnection, mt as enumType, vt as numberType, xt as stringType, yt as objectType } from "./settings.repository-DnN-jwx0.js";
import { $t as BotMemoryRepository, Xt as memoryContentSchema, Yt as memoryCategorySchema, en as memoryHash, v as XiaoheiDataToolError } from "./auth.service-DlN4Zn4h.js";
//#region electron/services/xiaohei-bot-memory-tools.ts
var toolSchema = objectType({
	action: enumType(["save", "delete"]),
	id: stringType().min(1).max(160).optional(),
	expected_revision: numberType().int().positive().optional(),
	content: memoryContentSchema.optional(),
	category: memoryCategorySchema.optional(),
	request_quote: stringType().trim().min(1).max(2e3),
	evidence_message_id: stringType().min(1).max(160).optional(),
	evidence_quote: stringType().trim().min(1).max(2e3).optional()
}).strict().superRefine((value, ctx) => {
	if (value.id && !value.expected_revision) ctx.addIssue({
		code: "custom",
		message: "更新或删除需要原条目的版本"
	});
	if (value.action === "delete" && !value.id) ctx.addIssue({
		code: "custom",
		message: "删除需要提供记忆 ID"
	});
	if (value.action === "save" && (!value.content || !value.category || !value.evidence_message_id || !value.evidence_quote)) ctx.addIssue({
		code: "custom",
		message: "保存需要内容、类别和用户原文证据"
	});
});
async function executeBotMemoryTool(raw, context) {
	const parsed = toolSchema.safeParse(raw);
	if (!parsed.success) throw new XiaoheiDataToolError("INVALID_ARGUMENT", parsed.error.issues.map((issue) => issue.message).join("；"));
	context.assertActive();
	const connection = getOpenDatabaseConnection();
	if (!connection || connection.generation !== context.expectedDatabaseGeneration || (connection.ownerUserId ?? 0) !== context.expectedUserId) throw new XiaoheiDataToolError("DATASET_CHANGED", "账号已切换，请重新发起记忆请求");
	const repository = new BotMemoryRepository(connection.database);
	const input = parsed.data;
	const trigger = context.triggerMessageId && repository.readUserMessage(context.botId, context.conversationId, context.triggerMessageId);
	if (!trigger || !trigger.content.includes(input.request_quote)) throw new XiaoheiDataToolError("ACCESS_DENIED", "记忆更新必须引用当前用户消息中的明确请求，不能用系统消息或 Bot 发言授权");
	const hash = memoryHash({
		botId: context.botId,
		conversationId: context.conversationId,
		trigger: context.triggerMessageId,
		input
	});
	let result;
	try {
		result = repository.transaction(() => {
			const previous = connection.database.prepare(`SELECT bot_id, input_hash, result_json FROM xiaohei_bot_memory_operations
        WHERE request_id = ? AND tool_call_id = ?`).get(context.requestId, context.toolCallId);
			if (previous) {
				if (previous.bot_id !== context.botId || previous.input_hash !== hash) throw new Error("同一次记忆工具调用的参数发生变化");
				return JSON.parse(previous.result_json);
			}
			let value;
			if (input.action === "delete") {
				repository.remove({
					botId: context.botId,
					id: input.id,
					expectedRevision: input.expected_revision
				});
				value = { deleted: input.id };
			} else {
				const evidence = repository.readUserMessage(context.botId, context.conversationId, input.evidence_message_id);
				if (!evidence || evidence.seq > trigger.seq || !evidence.content.includes(input.evidence_quote)) throw new Error("事实证据必须来自本会话中当前消息及之前可见的用户原文");
				const item = repository.save({
					botId: context.botId,
					id: input.id,
					expectedRevision: input.expected_revision,
					content: input.content,
					category: input.category
				}, "explicit", input.evidence_message_id);
				value = { saved: {
					id: item.id,
					content: item.content,
					category: item.category,
					revision: item.revision
				} };
			}
			connection.database.prepare(`INSERT INTO xiaohei_bot_memory_operations(request_id, tool_call_id, bot_id, input_hash, result_json)
        VALUES (?, ?, ?, ?, ?)`).run(context.requestId, context.toolCallId, context.botId, hash, JSON.stringify(value));
			return value;
		});
	} catch (error) {
		throw new XiaoheiDataToolError("INVALID_ARGUMENT", error instanceof Error ? error.message : "记忆更新失败");
	}
	const { botMemoryService } = await import("./auth.service-DlN4Zn4h.js").then((n) => n.g);
	botMemoryService.notify(context.botId);
	return result;
}
//#endregion
export { executeBotMemoryTool };
