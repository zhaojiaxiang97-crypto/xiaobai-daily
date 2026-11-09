import { createRequire as __nodeCreateRequire } from "node:module";
__nodeCreateRequire(import.meta.url);
import { Pt as getOpenDatabaseConnection, mt as enumType, vt as numberType, xt as stringType, yt as objectType } from "./settings.repository.js";
import { an as sharedHash, nn as notifySharedWorkspaceChanged, on as sharedRelativePath, rn as SHARED_TEXT_LIMIT, tn as botSharedWorkspaceStore, v as XiaoheiDataToolError } from "./auth.service.js";
//#region electron/services/xiaohei-bot-shared-workspace-tools.ts
var sharedWorkspaceToolSchema = objectType({
  action: enumType(["list", "read", "save", "edit", "history", "version"]),
  root: stringType().min(1).max(2e3),
  path: stringType().max(500).default(""),
  offset: numberType().int().min(0).default(0),
  content: stringType().max(64e3).optional(),
  expected_revision: stringType().max(64).optional(),
  old_text: stringType().min(1).max(64e3).optional(),
  new_text: stringType().max(64e3).optional(),
  version_id: numberType().int().positive().optional(),
  request_quote: stringType().min(1).max(2e3).optional()
}).strict();
function executeSharedWorkspaceTool(raw, context) {
  try {
    const input = sharedWorkspaceToolSchema.parse(raw);
    context.assertActive();
    const connection = getOpenDatabaseConnection();
    if (!connection || connection.generation !== context.expectedDatabaseGeneration || (connection.ownerUserId ?? 0) !== context.expectedUserId) throw new Error("账号已切换，请重新发起请求");
    const store = botSharedWorkspaceStore(context.expectedUserId);
    const scope = {
      accountId: context.expectedUserId,
      root: input.root
    };
    store.assertScope(scope);
    const conversation = connection.database.prepare("SELECT c.is_consultation FROM xiaohei_bot_conversations c JOIN xiaohei_bot_conversation_members m ON m.conversation_id=c.id WHERE c.id=? AND m.bot_id=?").get(context.conversationId, context.botId);
    if (!conversation) throw new Error("当前 Bot 无权访问此会话");
    if ((input.action === "save" || input.action === "edit") && conversation.is_consultation) throw new Error("内部咨询只允许读取公共资料");
    if (input.action === "list") return {
      ...scope,
      ...store.list(scope, input.path, input.offset)
    };
    input.path = sharedRelativePath(input.path);
    if (input.action === "read") return store.read(scope, input.path, input.offset);
    if (input.action === "history") return store.history(scope, input.path);
    if (input.action === "version") {
      if (!input.version_id) throw new Error("请选择历史版本");
      const value = store.version(scope, input.path, input.version_id);
      return {
        ...value,
        content: value.content.slice(input.offset, input.offset + 12e3),
        nextOffset: input.offset + 12e3 < value.content.length ? input.offset + 12e3 : null
      };
    }
    if (input.path.toLowerCase() === "agents.md") {
      const message = connection.database.prepare("SELECT content FROM xiaohei_bot_messages WHERE id=? AND conversation_id=? AND author_type='user' AND withdrawn_at IS NULL AND status='complete'").get(context.triggerMessageId ?? "", context.conversationId);
      if (!input.request_quote || !message?.content.includes(input.request_quote)) throw new Error("修改公共协作约定必须引用当前用户消息中的明确要求");
    }
    const hash = sharedHash(JSON.stringify({
      botId: context.botId,
      conversationId: context.conversationId,
      input
    }));
    const operation = connection.database.prepare("SELECT input_hash, result_json FROM xiaohei_bot_shared_operations WHERE request_id=? AND tool_call_id=?").get(context.requestId, context.toolCallId);
    if (operation) {
      if (operation.input_hash !== hash) throw new Error("同一次公共空间操作的参数发生变化");
      return JSON.parse(operation.result_json);
    }
    if (!input.expected_revision) throw new Error("保存前请读取文件版本；创建新文件使用 missing");
    let content = input.content;
    if (input.action === "edit") {
      if (!input.old_text || input.new_text === undefined) throw new Error("局部编辑需要 old_text 和 new_text");
      const file = store.read(scope, input.path, 0, SHARED_TEXT_LIMIT);
      if (file.revision !== input.expected_revision) throw new Error("文件已被修改，请重新读取并合并后再保存");
      const index = file.content.indexOf(input.old_text);
      if (index < 0 || file.content.indexOf(input.old_text, index + 1) >= 0) throw new Error("old_text 必须在当前文件中唯一匹配");
      content = file.content.slice(0, index) + input.new_text + file.content.slice(index + input.old_text.length);
    }
    if (content === undefined) throw new Error("保存需要 content");
    const file = store.save({
      ...scope,
      path: input.path,
      expectedRevision: input.expected_revision,
      content
    }, `bot:${context.botId}`);
    const result = {
      path: file.path,
      revision: file.revision,
      saved: true
    };
    connection.database.prepare("INSERT INTO xiaohei_bot_shared_operations(request_id,tool_call_id,input_hash,result_json) VALUES (?,?,?,?)").run(context.requestId, context.toolCallId, hash, JSON.stringify(result));
    notifySharedWorkspaceChanged();
    return result;
  } catch (error) {
    throw new XiaoheiDataToolError("INVALID_ARGUMENT", error instanceof Error ? error.message : "公共空间操作失败");
  }
}
//#endregion
export { executeSharedWorkspaceTool };