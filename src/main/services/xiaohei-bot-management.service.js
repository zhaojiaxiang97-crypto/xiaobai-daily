import { createRequire as __nodeCreateRequire } from "node:module";
__nodeCreateRequire(import.meta.url);
import { Pt as getOpenDatabaseConnection, dt as booleanType, mt as enumType, ut as arrayType, vt as numberType, xt as stringType, yt as objectType } from "./settings.repository.js";
import { F as xiaoheiBotEventLogRepository, P as xiaoheiBotRepository, R as DEFAULT_XIAOHEI_BOT_ID, z as isProtectedXiaoheiBot } from "./telemetry.service.js";
import { c as consultationToolSchemas, o as botConsultationService } from "./xiaohei-bot-schedule.service.js";
import { m as managementToolsFor, s as xiaoheiBotCloudService, v as XiaoheiDataToolError } from "./auth.service.js";
import { createHash, randomUUID } from "node:crypto";
//#region electron/services/xiaohei-bot-management.service.ts
var id = stringType().trim().min(1).max(160);
var name = stringType().trim().min(1).max(40);
var page = {
  keyword: stringType().trim().max(100).optional(),
  offset: numberType().int().min(0).default(0),
  limit: numberType().int().min(1).max(50).default(20)
};
var avatarFields = {
  avatar_id: id.optional(),
  avatar_url: stringType().url().max(2048).refine(url => {
    const parsed = new URL(url);
    return parsed.protocol === "https:" && !parsed.username && !parsed.password;
  }, "头像必须是无凭据的 HTTPS 图片地址").optional(),
  avatar_color: stringType().regex(/^#[0-9a-fA-F]{6}$/).optional(),
  avatar_shape: enumType(["circle", "oval", "rounded", "pill", "triangle", "hexagon", "cloud", "drop"]).optional()
};
var botFields = {
  name: name.optional(),
  description: stringType().trim().min(1).max(1e3).optional(),
  tags: arrayType(stringType().trim().min(1).max(80)).max(30).optional(),
  response_style: enumType(["natural", "direct", "warm", "professional", "lively", "coach"]).optional(),
  provider_id: stringType().trim().min(1).max(120).optional(),
  model_id: stringType().trim().min(1).max(240).optional(),
  thinking_level: enumType(["off", "minimal", "low", "medium", "high", "xhigh", "max"]).optional(),
  ...avatarFields
};
var groupFields = {
  name: name.optional(),
  description: stringType().trim().max(1e3).optional(),
  default_bot_id: id.optional(),
  ...avatarFields
};
var operation = {
  operation_key: stringType().trim().min(1).max(120).optional()
};
var handoffFields = {
  role: stringType().trim().max(1e3).default(""),
  context: stringType().trim().max(6e3).default(""),
  initial_task: stringType().trim().max(6e3).default(""),
  start_task: booleanType().default(false)
};
var handoffSchema = objectType({
  bot_id: id,
  ...handoffFields
}).strict().refine(item => !item.start_task || Boolean(item.initial_task), "启动任务必须填写 initial_task");
var teamMemberSchema = objectType({
  key: id,
  existing_bot_id: id.optional(),
  bot: objectType({
    ...botFields,
    name,
    description: stringType().trim().min(1).max(1e3),
    permission_mode: enumType(["default", "full"]).optional()
  }).strict().optional(),
  ...handoffFields
}).strict().refine(item => Boolean(item.existing_bot_id) !== Boolean(item.bot), "每个角色需要提供 existing_bot_id 或 bot，不能同时提供").refine(item => !item.start_task || Boolean(item.initial_task), "启动任务必须填写 initial_task");
var teamSchema = objectType({
  plan_key: id,
  group: objectType({
    ...groupFields,
    name
  }).strict().optional(),
  existing_group_id: id.optional(),
  members: arrayType(teamMemberSchema).min(1).max(10)
}).strict().refine(plan => Boolean(plan.group) !== Boolean(plan.existing_group_id), "group 和 existing_group_id 二选一").refine(plan => new Set(plan.members.map(item => item.key)).size === plan.members.length, "角色 key 不可重复");
var schemas = {
  xiaohei_complete_profile: objectType({
    mode: enumType(["fill_empty", "user_requested"]).default("fill_empty"),
    expected_version: numberType().int().positive(),
    evidence: stringType().trim().min(2).max(1e3),
    name: name.optional(),
    description: stringType().trim().min(1).max(1e3).optional(),
    tags: arrayType(stringType().trim().min(1).max(80)).min(1).max(5).optional()
  }).strict().refine(value => value.name !== undefined || value.description !== undefined || value.tags !== undefined, "请提供待补齐字段"),
  ...consultationToolSchemas,
  xiaohei_create_team: teamSchema,
  xiaohei_resume_team: objectType({
    plan_id: id
  }).strict(),
  xiaohei_list_teams: objectType(page).strict(),
  xiaohei_handoff_members: objectType({
    ...operation,
    group_id: id,
    handoffs: arrayType(handoffSchema).min(1).max(30)
  }).strict(),
  xiaohei_list_bots: objectType(page).strict(),
  xiaohei_list_models: objectType(page).strict(),
  xiaohei_list_avatars: objectType(page).strict(),
  xiaohei_create_bot: objectType({
    ...botFields,
    ...operation,
    permission_mode: enumType(["default", "full"]).optional(),
    name,
    description: stringType().trim().min(1).max(1e3)
  }).strict(),
  xiaohei_update_bot: objectType({
    ...botFields,
    ...operation,
    bot_id: id,
    permission_mode: enumType(["default", "full"]).optional(),
    management_permissions: objectType({
      create_bots: booleanType().optional(),
      manage_groups: booleanType().optional()
    }).strict().optional(),
    notifications_enabled: booleanType().optional(),
    evidence: stringType().trim().min(2).max(1e3).optional(),
    expected_version: numberType().int().positive().optional()
  }).strict(),
  xiaohei_list_groups: objectType(page).strict(),
  xiaohei_create_group: objectType({
    ...groupFields,
    ...operation,
    name,
    bot_ids: arrayType(id).max(29).default([])
  }).strict(),
  xiaohei_update_group: objectType({
    ...groupFields,
    ...operation,
    group_id: id
  }).strict(),
  xiaohei_add_group_members: objectType({
    ...operation,
    group_id: id,
    handoffs: arrayType(handoffSchema).max(30).optional(),
    bot_ids: arrayType(id).min(1).max(30)
  }).strict(),
  xiaohei_update_group_member: objectType({
    ...operation,
    group_id: id,
    bot_id: id,
    participation_mode: enumType(["auto", "mention-only", "context-only"]),
    is_default_responder: booleanType().optional()
  }).strict(),
  xiaohei_send_group_task: objectType({
    ...operation,
    group_id: id,
    content: stringType().trim().min(1).max(1e4),
    bot_ids: arrayType(id).min(1).max(29).optional()
  }).strict(),
  xiaohei_read_group_messages: objectType({
    group_id: id,
    message_id: id.optional(),
    content_offset: numberType().int().min(0).default(0),
    limit: numberType().int().min(1).max(50).default(20),
    before_seq: numberType().int().min(1).optional()
  }).strict()
};
function isManagementTool(name) {
  return Object.hasOwn(schemas, name);
}
function invalid(message) {
  throw new XiaoheiDataToolError("INVALID_ARGUMENT", message);
}
function denied(message) {
  throw new XiaoheiDataToolError("ACCESS_DENIED", message);
}
function json(value) {
  return JSON.parse(JSON.stringify(value));
}
function digest(value) {
  const stable = item => Array.isArray(item) ? item.map(stable) : item && typeof item === "object" ? Object.fromEntries(Object.entries(item).sort(([a], [b]) => a.localeCompare(b)).map(([key, val]) => [key, stable(val)])) : item;
  return createHash("sha256").update(JSON.stringify(stable(value))).digest("hex");
}
function paginate(sourceItems, input) {
  const filtered = input.keyword ? sourceItems.filter(item => JSON.stringify(item).toLocaleLowerCase().includes(input.keyword.toLocaleLowerCase())) : sourceItems;
  const items = [];
  let bytes = 0;
  for (const item of filtered.slice(input.offset, input.offset + input.limit)) {
    const size = Buffer.byteLength(JSON.stringify(item), "utf8");
    if (items.length && bytes + size > 49152) break;
    items.push(item);
    bytes += size;
  }
  const nextOffset = input.offset + items.length;
  return {
    items,
    total: filtered.length,
    next_offset: nextOffset < filtered.length ? nextOffset : null
  };
}
function publicBot(bot) {
  return {
    bot_id: bot.id,
    name: bot.name,
    description: bot.description,
    tags: bot.tags,
    provider_id: bot.providerId,
    model_id: bot.modelId,
    identity_version: bot.identityVersion,
    notifications_enabled: xiaoheiBotRepository.listConversations().find(item => item.kind === "direct" && item.directBotId === bot.id && !item.parentConversationId)?.notificationsEnabled,
    thinking_level: bot.thinkingLevel,
    permission_mode: bot.permissionMode,
    response_style: bot.responseStyle,
    management_permissions: bot.managementPermissions,
    creator_bot_id: bot.creatorBotId,
    avatar: bot.avatar?.startsWith("https://") ? bot.avatar : undefined,
    has_custom_avatar: Boolean(bot.avatar),
    avatar_color: bot.avatarColor,
    avatar_shape: bot.avatarShape,
    conversation_id: xiaoheiBotRepository.listConversations().find(conversation => conversation.kind === "direct" && conversation.directBotId === bot.id && !conversation.parentConversationId)?.id
  };
}
function publicGroup(group) {
  return {
    id: group.id,
    title: group.title,
    description: group.description,
    creator_bot_id: group.creatorBotId,
    default_bot_id: group.defaultBotId,
    avatar: group.avatar?.startsWith("https://") ? group.avatar : undefined,
    has_custom_avatar: Boolean(group.avatar),
    avatar_color: group.avatarColor,
    avatar_shape: group.avatarShape,
    members: group.members.map(member => ({
      bot_id: member.botId,
      name: member.name,
      participation_mode: member.participationMode,
      is_default_responder: member.isDefaultResponder,
      administrator: isProtectedXiaoheiBot(member.botId),
      handoff_role: member.handoffRole
    }))
  };
}
function configuredProviders() {
  return xiaoheiBotRepository.listProviders().filter(provider => provider.isBuiltin || provider.authType === "none" || provider.hasCredential);
}
function chooseModel(input, actor) {
  if (Boolean(input.provider_id) !== Boolean(input.model_id)) invalid("provider_id 和 model_id 必须同时提供");
  const providers = configuredProviders();
  const find = (providerId, modelId) => {
    const provider = providers.find(item => item.id === providerId);
    const model = provider?.models.find(item => item.id === modelId);
    return provider && model ? {
      provider,
      model
    } : undefined;
  };
  const defaultModel = xiaoheiBotCloudService.getState().defaultModel;
  const cloudDefault = defaultModel ? find(defaultModel.providerId, defaultModel.modelId) : undefined;
  const selected = input.provider_id ? find(input.provider_id, input.model_id) : cloudDefault ?? providers.filter(provider => provider.isBuiltin).flatMap(provider => provider.models.map(model => ({
    provider,
    model
  })))[0] ?? find(actor.providerId, actor.modelId) ?? providers.flatMap(provider => provider.models.map(model => ({
    provider,
    model
  })))[0];
  if (!selected) invalid("没有可用的已配置模型，请先在模型设置中配置或登录账号");
  if (input.thinking_level && !selected.model.thinkingLevels.includes(input.thinking_level)) invalid(`此模型支持的思考档位：${selected.model.thinkingLevels.join("、")}`);
  return {
    providerId: selected.provider.id,
    modelId: selected.model.id,
    thinkingLevel: input.thinking_level ?? (selected.model.thinkingLevels.includes(actor.thinkingLevel) ? actor.thinkingLevel : selected.model.thinkingLevels[0] ?? "off")
  };
}
var XiaoheiBotManagementService = class {
  runningPlans = /* @__PURE__ */new Set();
  async executeTool(toolName, raw, context, planScope) {
    if (!isManagementTool(toolName)) invalid("未知团队管理工具");
    const parsed = schemas[toolName].safeParse(raw);
    if (!parsed.success) invalid(parsed.error.issues.map(issue => `${issue.path.join(".")}: ${issue.message}`).join("; "));
    const input = parsed.data;
    const assertAccess = () => {
      context.assertActive();
      const connection = getOpenDatabaseConnection();
      if (!connection || connection.generation !== context.expectedDatabaseGeneration || (connection.ownerUserId ?? 0) !== context.expectedUserId) throw new XiaoheiDataToolError("DATASET_CHANGED", "账号或数据库已切换，请重新发起请求");
      const actor = xiaoheiBotRepository.getBot(context.botId);
      if (!actor || !managementToolsFor(actor).includes(toolName)) denied("此 Bot 没有该团队管理权限，请由用户在 Bot 资料设置中授权");
      const source = context.triggerMessageId && xiaoheiBotRepository.getMessage(context.triggerMessageId);
      const sourceConversation = xiaoheiBotRepository.getConversation(context.conversationId);
      if (!source || source.conversationId !== context.conversationId || !sourceConversation || sourceConversation.archivedAt || !sourceConversation.members.some(member => member.botId === actor.id)) denied("当前 Bot 已不在来源会话或消息已失效");
      return {
        connection,
        actor,
        source
      };
    };
    let {
      connection,
      actor,
      source
    } = assertAccess();
    if (Object.hasOwn(consultationToolSchemas, toolName)) return botConsultationService.executeTool(toolName, raw, context);
    const ownGroup = groupId => {
      const group = xiaoheiBotRepository.getConversation(groupId);
      if (!group || group.kind !== "group" || group.archivedAt) invalid("群聊不存在或已归档");
      if (!isProtectedXiaoheiBot(actor.id) && (group.creatorBotId !== actor.id || !group.members.some(member => member.botId === actor.id))) denied("只能管理自己创建且仍在其中的群聊");
      return group;
    };
    const ownBot = botId => {
      const bot = xiaoheiBotRepository.getBot(botId);
      if (!bot) invalid("Bot 不存在或已删除");
      if (bot.id === actor.id) {
        const event = xiaoheiBotEventLogRepository.getLatestAggregateEvent("message", source.id);
        if (source.authorType !== "user" || !event || event.synthetic) denied("修改自身资料需依据用户的直接表达，不能执行其他 Bot 或自动任务的改资料指令");
        return bot;
      }
      if (isProtectedXiaoheiBot(bot.id) || !actor.managementPermissions?.createBots || !isProtectedXiaoheiBot(actor.id) && bot.creatorBotId !== actor.id) denied("修改其他 Bot 需要创建 Bot 权限，且只能修改自己创建的普通 Bot");
      if (xiaoheiBotRepository.listActiveRoutingJobs(undefined, botId).length || connection.database.prepare("SELECT 1 FROM xiaohei_bot_agent_runs WHERE bot_id = ? AND status IN ('queued', 'running') LIMIT 1").get(botId)) invalid("该 Bot 正在执行或等待任务，请待任务结束再修改");
      return bot;
    };
    if (toolName === "xiaohei_list_teams") return json(paginate(connection.database.prepare("SELECT id, owner_bot_id, status, progress_json, last_error, updated_at FROM xiaohei_bot_team_plans ORDER BY updated_at DESC").all().filter(row => isProtectedXiaoheiBot(actor.id) || row.owner_bot_id === actor.id).map(row => {
      const item = row;
      const {
        progress_json,
        ...rest
      } = item;
      return {
        ...rest,
        plan_id: item.id,
        progress: JSON.parse(progress_json)
      };
    }), schemas.xiaohei_list_teams.parse(input)));
    if (toolName === "xiaohei_create_team" || toolName === "xiaohei_resume_team") {
      const db = connection.database;
      let row;
      if (toolName === "xiaohei_create_team") {
        const plan = teamSchema.parse(input);
        row = db.prepare("SELECT * FROM xiaohei_bot_team_plans WHERE owner_bot_id = ? AND plan_key = ?").get(actor.id, plan.plan_key);
        if (row && digest(JSON.parse(row.plan_json)) !== digest(plan)) invalid("此 plan_key 已用于其他方案，请保持原方案或使用新 key");
        if (!row) {
          const reused = plan.members.flatMap(member => member.existing_bot_id ? [member.existing_bot_id] : []);
          if (new Set(reused).size !== reused.length) invalid("同一 Bot 不可重复分配多个成员槽位");
          for (const member of plan.members) {
            if (member.existing_bot_id && !xiaoheiBotRepository.getBot(member.existing_bot_id)) invalid("复用的 Bot 不存在");
            if (member.bot) chooseModel(member.bot, actor);
          }
          const existing = plan.existing_group_id ? ownGroup(plan.existing_group_id) : undefined;
          if (plan.group?.default_bot_id && ![actor.id, "xiaohei-assistant", ...reused].includes(plan.group.default_bot_id)) invalid("默认回复成员必须是本次复用的 Bot 或创建者、小白");
          for (const member of plan.members.filter(item => item.start_task)) {
            if (member.existing_bot_id === actor.id) invalid("不能向自己启动交接任务，请关闭该成员的 start_task");
            if (existing?.members.find(item => item.botId === member.existing_bot_id)?.participationMode === "context-only") invalid("仅上下文成员不能立即执行交接任务");
            if (source.hopDepth >= xiaoheiBotRepository.getSettings().maxBotChainDepth) invalid("已达接力上限，请关闭 start_task");
          }
          if ((/* @__PURE__ */new Set([...(existing?.members.map(m => m.botId) ?? []), actor.id, "xiaohei-assistant", ...reused])).size + plan.members.filter(item => item.bot).length > 30) invalid("组队后群成员超过 30 人");
          const planId = randomUUID(),
            now = (/* @__PURE__ */new Date()).toISOString();
          db.prepare("INSERT INTO xiaohei_bot_team_plans (id, owner_bot_id, plan_key, root_message_id, source_conversation_id, plan_json, progress_json, status, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)").run(planId, actor.id, plan.plan_key, source.causalRootMessageId ?? source.id, context.conversationId, JSON.stringify(plan), JSON.stringify({
            bots: {},
            handedOff: {}
          }), "pending", now, now);
          row = db.prepare("SELECT * FROM xiaohei_bot_team_plans WHERE id = ?").get(planId);
        }
      } else row = db.prepare("SELECT * FROM xiaohei_bot_team_plans WHERE id = ?").get(schemas.xiaohei_resume_team.parse(input).plan_id);
      if (!row) invalid("组队方案不存在");
      if (row.owner_bot_id !== actor.id && !isProtectedXiaoheiBot(actor.id)) denied("只能恢复自己的组队方案");
      const plan = teamSchema.parse(JSON.parse(row.plan_json));
      const progress = JSON.parse(row.progress_json);
      const lock = `${connection.generation}:${row.id}`;
      const report = (status, error) => json({
        plan_id: row.id,
        status,
        group_id: progress.groupId,
        members: plan.members.map(event => ({
          key: event.key,
          bot_id: progress.bots[event.key],
          handed_off: Boolean(progress.handedOff[event.key])
        })),
        error,
        next_action: status === "completed" ? "组队与交接已完成；已排队的任务需另查执行结果" : "调用 xiaohei_resume_team 并沿用 plan_id；不要重新创建团队"
      });
      if (this.runningPlans.has(lock)) return report("running");
      this.runningPlans.add(lock);
      const save = (status, error) => {
        assertAccess();
        db.prepare("UPDATE xiaohei_bot_team_plans SET progress_json = ?, status = ?, last_error = ?, updated_at = ? WHERE id = ?").run(JSON.stringify(progress), status, error ?? null, (/* @__PURE__ */new Date()).toISOString(), row.id);
      };
      const invoke = async (tool, args, key) => {
        const value = await this.executeTool(tool, {
          ...args,
          operation_key: `team:${digest([row.id, key])}`
        }, context, {
          id: row.id,
          rootId: row.root_message_id
        });
        const result = value.reused ? value.result : value;
        return result.bot ?? result.group ?? result;
      };
      try {
        let steps = 0;
        for (const member of plan.members) {
          if (progress.bots[member.key]) {
            if (!xiaoheiBotRepository.getBot(progress.bots[member.key])) invalid("已创建成员被删除，请建立新方案");
            continue;
          }
          if (steps >= 3) {
            save("pending");
            return report("pending");
          }
          const result = member.existing_bot_id ? {
            bot_id: member.existing_bot_id
          } : await invoke("xiaohei_create_bot", member.bot, `bot:${member.key}`);
          if (!xiaoheiBotRepository.getBot(result.bot_id)) invalid("成员不存在或已删除");
          progress.bots[member.key] = result.bot_id;
          steps++;
          save("pending");
        }
        if (!progress.groupId) {
          if (steps >= 3) {
            save("pending");
            return report("pending");
          }
          progress.groupId = (plan.existing_group_id ? {
            id: ownGroup(plan.existing_group_id).id
          } : await invoke("xiaohei_create_group", {
            ...plan.group,
            bot_ids: Object.values(progress.bots)
          }, "group")).id;
          progress.joined = !plan.existing_group_id;
          steps++;
          save("pending");
        }
        ownGroup(progress.groupId);
        if (!progress.joined) {
          if (steps >= 3) {
            save("pending");
            return report("pending");
          }
          await invoke("xiaohei_add_group_members", {
            group_id: progress.groupId,
            bot_ids: Object.values(progress.bots)
          }, "members");
          progress.joined = true;
          steps++;
          save("pending");
        }
        const group = ownGroup(progress.groupId);
        if (Object.values(progress.bots).some(botId => !group.members.some(item => item.botId === botId))) invalid("已组队成员被移出群聊，请先恢复成员后重试");
        for (const member of plan.members) {
          if (progress.handedOff[member.key]) continue;
          if (member.role || member.context || member.initial_task) {
            if (steps >= 3) {
              save("pending");
              return report("pending");
            }
            await invoke("xiaohei_handoff_members", {
              group_id: progress.groupId,
              handoffs: [{
                bot_id: progress.bots[member.key],
                role: member.role,
                context: member.context,
                initial_task: member.initial_task,
                start_task: member.start_task
              }]
            }, `handoff:${member.key}`);
            steps++;
          }
          progress.handedOff[member.key] = true;
          save("pending");
        }
        save("completed");
        return report("completed");
      } catch (error) {
        const message = error instanceof Error ? error.message : String(error);
        save("failed", message);
        return report("failed", message);
      } finally {
        this.runningPlans.delete(lock);
      }
    }
    if (toolName === "xiaohei_list_bots") return json(paginate(xiaoheiBotRepository.listBots().map(bot => ({
      ...publicBot(bot),
      is_self: bot.id === actor.id
    })), schemas.xiaohei_list_bots.parse(input)));
    if (toolName === "xiaohei_list_models") return json(paginate(configuredProviders().flatMap(provider => provider.models.map(model => ({
      provider_id: provider.id,
      provider_name: provider.name,
      model_id: model.id,
      name: model.name,
      thinking_levels: model.thinkingLevels,
      vision: model.vision
    }))), schemas.xiaohei_list_models.parse(input)));
    if (toolName === "xiaohei_list_avatars") {
      const avatars = await xiaoheiBotCloudService.listDefaultAvatars().catch(() => []);
      assertAccess();
      return json({
        ...paginate(avatars, schemas.xiaohei_list_avatars.parse(input)),
        fallback_avatar_id: "default",
        catalog_available: avatars.length > 0
      });
    }
    if (toolName === "xiaohei_list_groups") return json(paginate(xiaoheiBotRepository.listConversations().filter(group => group.kind === "group" && !group.archivedAt && (isProtectedXiaoheiBot(actor.id) || group.creatorBotId === actor.id && group.members.some(member => member.botId === actor.id))).map(publicGroup), schemas.xiaohei_list_groups.parse(input)));
    if (toolName === "xiaohei_read_group_messages") {
      const params = schemas.xiaohei_read_group_messages.parse(input);
      const group = ownGroup(params.group_id);
      const joinedSeq = isProtectedXiaoheiBot(actor.id) ? -1 : group.members.find(member => member.botId === actor.id).joinedMessageSeq;
      if (params.message_id) {
        const message = xiaoheiBotRepository.getMessage(params.message_id);
        if (!message || message.conversationId !== group.id || message.seq <= joinedSeq) denied("该消息不存在或不在当前可读取范围");
        const content = message.content.slice(params.content_offset, params.content_offset + 12e3);
        return json({
          group_id: group.id,
          message_id: message.id,
          author_name: message.authorName,
          status: message.status,
          content,
          next_content_offset: params.content_offset + content.length < message.content.length ? params.content_offset + content.length : null
        });
      }
      if (params.content_offset) invalid("content_offset 需要配合 message_id 使用");
      const page = xiaoheiBotRepository.listDisplayMessages(group.id, params.before_seq, params.limit);
      return json({
        group_id: group.id,
        messages: page.messages.filter(message => message.seq > joinedSeq).map(message => ({
          message_id: message.id,
          seq: message.seq,
          author_type: message.authorType,
          author_bot_id: message.authorBotId,
          author_name: message.authorName,
          content: message.content.slice(0, Math.floor(16e3 / params.limit)),
          content_truncated: message.content.length > Math.floor(16e3 / params.limit),
          status: message.status,
          created_at: message.createdAt
        })),
        active_runs: connection.database.prepare("SELECT bot_id, status, trigger_message_id FROM xiaohei_bot_agent_runs WHERE conversation_id = ? AND status IN ('queued', 'running') ORDER BY created_at LIMIT 100").all(group.id),
        has_more: page.hasMore && (page.nextBeforeSeq ?? 0) > joinedSeq,
        before_seq: page.nextBeforeSeq
      });
    }
    const rootId = planScope?.rootId ?? source.causalRootMessageId ?? source.id;
    const {
      operation_key: suppliedKey,
      ...payload
    } = input;
    const hash = digest(payload);
    const operationKey = digest([planScope?.id ?? actor.id, rootId, toolName, suppliedKey ?? hash]);
    const database = connection.database;
    const syncMobileCreatedGroup = async value => {
      if (toolName !== "xiaohei_create_group" || !source.originMessageId?.startsWith("mobile:") || !value || typeof value !== "object" || Array.isArray(value)) return undefined;
      const group = value.group;
      if (!group || typeof group !== "object" || Array.isArray(group) || typeof group.id !== "string") return undefined;
      try {
        const {
          xiaoheiBotSyncService
        } = await import("./auth.service.js").then(n => n.i);
        await xiaoheiBotSyncService.setGroupMobileSync(group.id, true);
        return xiaoheiBotSyncService.getMobileSyncSnapshot();
      } catch (error) {
        console.error("[XiaoheiBot] 手机端对话建群同步排队失败:", error);
        return;
      }
    };
    const previousResult = () => {
      const previous = database.prepare("SELECT payload_hash, result_json FROM xiaohei_bot_management_operations WHERE operation_key = ?").get(operationKey);
      if (previous && previous.payload_hash !== hash) invalid("operation_key 已用于不同参数；重试请保持原参数");
      return previous ? JSON.parse(previous.result_json) : undefined;
    };
    const previous = previousResult();
    if (previous !== undefined) {
      await syncMobileCreatedGroup(previous);
      return json({
        result: previous,
        reused: true
      });
    }
    const avatars = ("avatar_id" in input || toolName === "xiaohei_create_bot" || toolName === "xiaohei_create_group") && !("avatar_url" in input) && (!("avatar_id" in input) || input.avatar_id !== "default") ? await xiaoheiBotCloudService.listDefaultAvatars().catch(() => []) : [];
    const {
      xiaoheiBotService
    } = await import("./auth.service.js").then(n => n.o);
    ({
      connection,
      actor,
      source
    } = assertAccess());
    const appearance = (params, existing) => {
      if (params.avatar_id && params.avatar_url) invalid("avatar_id 和 avatar_url 只能提供一个");
      let avatar = existing?.avatar;
      if (typeof params.avatar_url === "string") avatar = params.avatar_url;else if (params.avatar_id === "default") avatar = undefined;else if (typeof params.avatar_id === "string") {
        const selected = avatars.find(item => item.id === params.avatar_id);
        if (!selected) invalid("指定默认头像不存在或图库暂时不可用；可查询头像或使用 default");
        avatar = selected.url;
      } else if (!existing && avatars.length) {
        const used = new Set([...xiaoheiBotRepository.listBots(), ...xiaoheiBotRepository.listConversations()].map(item => item.avatar));
        const choices = avatars.filter(item => !used.has(item.url));
        const pool = choices.length ? choices : avatars;
        avatar = pool[parseInt(hash.slice(0, 8), 16) % pool.length].url;
      }
      const colors = ["#f59e0b", "#2f80ed", "#8b5cf6", "#10b981", "#ec4899", "#f97316"];
      return {
        avatar,
        avatarColor: params.avatar_color ?? existing?.avatarColor ?? colors[parseInt(hash.slice(0, 4), 16) % colors.length],
        avatarShape: params.avatar_shape ?? existing?.avatarShape ?? "circle"
      };
    };
    const actorContext = {
      botId: actor.id,
      sourceConversationId: context.conversationId
    };
    const quota = (name, maximum) => {
      if (database.prepare("SELECT COUNT(*) AS count FROM xiaohei_bot_management_operations WHERE root_message_id = ? AND tool_name = ?").get(rootId, name).count >= maximum) throw new XiaoheiDataToolError("QUOTA_EXCEEDED", `同一任务最多执行 ${maximum} 次 ${name}，请由用户发起新任务`);
    };
    const syncBots = /* @__PURE__ */new Set();
    const syncGroups = /* @__PURE__ */new Set();
    database.exec("BEGIN IMMEDIATE");
    let result;
    try {
      const previous = previousResult();
      if (previous !== undefined) {
        database.exec("ROLLBACK");
        await syncMobileCreatedGroup(previous);
        return json({
          result: previous,
          reused: true
        });
      }
      quota(toolName, toolName === "xiaohei_create_bot" ? planScope ? 10 : 5 : toolName === "xiaohei_create_group" ? 3 : toolName === "xiaohei_send_group_task" ? 5 : 20);
      switch (toolName) {
        case "xiaohei_create_bot":
          {
            const params = schemas.xiaohei_create_bot.parse(input);
            const allowedLocalPermission = actor.permissionMode === "full" && xiaoheiBotRepository.getSettings().permissionMode === "full" ? "full" : "default";
            if (params.permission_mode === "full" && allowedLocalPermission !== "full") denied("新 Bot 的本地工具权限不能超过创建者及全局权限");
            const permissionMode = params.permission_mode ?? allowedLocalPermission;
            const created = xiaoheiBotService.createManagedBot({
              name: params.name,
              description: params.description,
              tags: params.tags ?? [],
              responseStyle: params.response_style ?? "natural",
              ...chooseModel({
                ...params,
                bot_id: actor.id
              }, actor),
              permissionMode,
              ...appearance(params)
            }, actorContext);
            result = json({
              bot: publicBot(created.bot),
              conversation_id: created.conversation.id,
              permission_mode: permissionMode,
              management_permissions: created.bot.managementPermissions
            });
            break;
          }
        case "xiaohei_complete_profile":
          {
            const params = schemas.xiaohei_complete_profile.parse(input);
            const sourceEvent = xiaoheiBotEventLogRepository.getLatestAggregateEvent("message", source.id);
            if (source.authorType !== "user" || !sourceEvent || sourceEvent.synthetic || xiaoheiBotRepository.getConversation(context.conversationId)?.kind !== "direct") denied("仅允许根据用户单聊中的直接表达补齐资料");
            if (!source.content.includes(params.evidence)) invalid("需要提供本轮用户原话作为职责依据");
            const current = xiaoheiBotRepository.getBot(actor.id);
            if (current.identityVersion !== params.expected_version) invalid("资料已变化，请重新读取，不要覆盖用户修改");
            if ((params.name === undefined || params.name === current.name) && (params.description === undefined || params.description === current.description) && (params.tags === undefined || JSON.stringify(params.tags) === JSON.stringify(current.tags))) {
              result = json({
                bot: publicBot(current),
                status: "unchanged",
                message: "资料没有变化，无需重复更新"
              });
              break;
            }
            if (!current.providerId || !current.modelId) invalid("Bot 模型不可用");
            const updated = xiaoheiBotRepository.updateBot({
              ...current,
              botId: current.id,
              providerId: current.providerId,
              modelId: current.modelId,
              expectedIdentityVersion: params.expected_version,
              name: params.name ?? current.name,
              description: params.description ?? current.description,
              tags: params.tags ?? current.tags
            }, actorContext);
            syncBots.add(updated.id);
            result = json({
              bot: publicBot(updated),
              status: "completed",
              message: "资料已保存；已有内容仅在用户明确要求修改时更新"
            });
            break;
          }
        case "xiaohei_update_bot":
          {
            const params = schemas.xiaohei_update_bot.parse(input);
            const bot = ownBot(params.bot_id);
            const changesSettings = params.permission_mode !== undefined || params.management_permissions !== undefined || params.notifications_enabled !== undefined;
            if (changesSettings) {
              const event = xiaoheiBotEventLogRepository.getLatestAggregateEvent("message", source.id);
              if (source.authorType !== "user" || !event || event.synthetic || !params.evidence || !source.content.includes(params.evidence)) denied("修改配置开关必须依据本轮用户明确要求，并提供对应原话 evidence");
              if (params.expected_version === undefined) invalid("修改配置开关请提供当前 identity_version，避免覆盖用户设置");
            }
            const conversation = xiaoheiBotRepository.listConversations().find(item => item.kind === "direct" && item.directBotId === bot.id && !item.parentConversationId);
            if (params.notifications_enabled !== undefined && !conversation) invalid("没有找到该 Bot 的私聊会话");
            if (Boolean(params.provider_id) !== Boolean(params.model_id)) invalid("provider_id 和 model_id 必须同时提供");
            const updated = xiaoheiBotRepository.updateBot({
              ...bot,
              botId: bot.id,
              name: params.name ?? bot.name,
              description: params.description ?? bot.description,
              tags: params.tags ?? bot.tags,
              responseStyle: params.response_style ?? bot.responseStyle,
              expectedIdentityVersion: params.expected_version,
              permissionMode: params.permission_mode ?? bot.permissionMode,
              managementPermissions: {
                createBots: params.management_permissions?.create_bots ?? bot.managementPermissions?.createBots ?? false,
                manageGroups: params.management_permissions?.manage_groups ?? bot.managementPermissions?.manageGroups ?? false
              },
              ...chooseModel({
                ...params,
                provider_id: params.provider_id ?? bot.providerId ?? undefined,
                model_id: params.model_id ?? bot.modelId ?? undefined
              }, bot),
              ...appearance(params, bot)
            }, actorContext, changesSettings);
            if (params.notifications_enabled !== undefined && conversation) xiaoheiBotRepository.setConversationNotifications(conversation.id, params.notifications_enabled, true);
            syncBots.add(updated.id);
            result = json({
              bot: publicBot(updated)
            });
            break;
          }
        case "xiaohei_create_group":
          {
            const params = schemas.xiaohei_create_group.parse(input);
            const botIds = [... /* @__PURE__ */new Set([actor.id, ...params.bot_ids, DEFAULT_XIAOHEI_BOT_ID])];
            if (params.default_bot_id && !botIds.includes(params.default_bot_id)) invalid("默认回复 Bot 必须在初始群成员中");
            result = json({
              group: publicGroup(xiaoheiBotRepository.createGroup({
                name: params.name,
                description: params.description ?? "",
                botIds,
                defaultBotId: params.default_bot_id ?? actor.id,
                ...appearance(params)
              }, actorContext)),
              status: "created",
              task_started: false
            });
            break;
          }
        case "xiaohei_update_group":
          {
            const params = schemas.xiaohei_update_group.parse(input);
            const group = ownGroup(params.group_id);
            syncGroups.add(group.id);
            result = json({
              group: publicGroup(xiaoheiBotRepository.updateGroup({
                conversationId: group.id,
                name: params.name ?? group.title,
                description: params.description ?? group.description,
                notificationsEnabled: group.notificationsEnabled,
                defaultBotId: params.default_bot_id ?? group.defaultBotId,
                ...appearance(params, group)
              }, actorContext))
            });
            break;
          }
        case "xiaohei_add_group_members":
          {
            const params = schemas.xiaohei_add_group_members.parse(input);
            const group = ownGroup(params.group_id);
            const botIds = [...new Set(params.bot_ids)].filter(botId => !group.members.some(member => member.botId === botId));
            if (group.members.length + botIds.length > 30) invalid("群聊最多支持 30 个 Bot");
            if (params.handoffs?.some(item => !params.bot_ids.includes(item.bot_id))) invalid("交接对象必须在本次添加的成员列表中");
            const updated = botIds.length ? xiaoheiBotRepository.addGroupMembers({
              conversationId: group.id,
              botIds
            }, actorContext) : group;
            if (botIds.length) syncGroups.add(group.id);
            const messageIds = xiaoheiBotService.prepareMemberHandoffs(updated, (params.handoffs ?? []).filter(item => botIds.includes(item.bot_id)).map(item => ({
              botId: item.bot_id,
              role: item.role,
              context: item.context,
              initialTask: item.initial_task,
              startTask: item.start_task
            })), actor, source);
            result = json({
              group: publicGroup(xiaoheiBotRepository.getConversation(group.id)),
              added_bot_ids: botIds,
              handoff_message_ids: messageIds
            });
            break;
          }
        case "xiaohei_handoff_members":
          {
            const params = schemas.xiaohei_handoff_members.parse(input);
            const group = ownGroup(params.group_id);
            const messageIds = xiaoheiBotService.prepareMemberHandoffs(group, params.handoffs.map(item => ({
              botId: item.bot_id,
              role: item.role,
              context: item.context,
              initialTask: item.initial_task,
              startTask: item.start_task
            })), actor, source);
            result = json({
              group: publicGroup(xiaoheiBotRepository.getConversation(group.id)),
              handoff_message_ids: messageIds
            });
            break;
          }
        case "xiaohei_update_group_member":
          {
            const params = schemas.xiaohei_update_group_member.parse(input);
            const group = ownGroup(params.group_id);
            syncGroups.add(group.id);
            result = json({
              group: publicGroup(xiaoheiBotRepository.updateGroupMember({
                conversationId: group.id,
                botId: params.bot_id,
                participationMode: params.participation_mode,
                isDefaultResponder: params.is_default_responder
              }, actorContext))
            });
            break;
          }
        case "xiaohei_send_group_task":
          {
            const params = schemas.xiaohei_send_group_task.parse(input);
            const group = ownGroup(params.group_id);
            if (source.hopDepth >= Math.min(3, xiaoheiBotRepository.getSettings().maxBotChainDepth)) denied("已达到 Bot 自动接力上限，请由用户继续发起任务");
            if (group.id === source.conversationId) denied("当前群内请直接回复并提及成员，不要用群任务工具再次投递到当前群");
            const targets = [...new Set(params.bot_ids ?? group.members.filter(member => member.botId !== actor.id && member.participationMode !== "context-only").map(member => member.botId))];
            if (!targets.length) invalid("群中没有可接收任务的其他 Bot，请先添加成员");
            if (targets.some(botId => botId === actor.id || !group.members.some(member => member.botId === botId && member.participationMode !== "context-only"))) invalid("任务接收者必须是群内可回复的其他 Bot");
            for (const botId of targets) {
              const target = xiaoheiBotRepository.getBot(botId);
              if (!target) invalid("接收 Bot 已删除");
              if (!target.providerId || !target.modelId) invalid("接收 Bot 尚未配置模型");
              chooseModel({
                bot_id: botId,
                provider_id: target.providerId ?? undefined,
                model_id: target.modelId ?? undefined
              }, target);
            }
            result = json(xiaoheiBotService.prepareManagedGroupTask(group, actor, source, params.content, targets));
            break;
          }
        default:
          invalid("未知团队管理写入工具");
      }
      assertAccess();
      database.prepare("INSERT INTO xiaohei_bot_management_operations (operation_key, bot_id, root_message_id, conversation_id, request_id, tool_call_id, tool_name, payload_hash, result_json, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)").run(operationKey, actor.id, rootId, context.conversationId, context.requestId, context.toolCallId, toolName, hash, JSON.stringify(result), (/* @__PURE__ */new Date()).toISOString());
      database.exec("COMMIT");
    } catch (error) {
      database.exec("ROLLBACK");
      const code = error && typeof error === "object" && "code" in error ? String(error.code) : "";
      if (code.startsWith("ERR_SQLITE") || code.startsWith("SQLITE_")) throw new XiaoheiDataToolError("INTERNAL", `本地数据库写入失败：${error instanceof Error ? error.message : code}`);
      throw error instanceof XiaoheiDataToolError ? error : new XiaoheiDataToolError("INVALID_ARGUMENT", error instanceof Error ? error.message : "团队操作失败");
    }
    if (syncBots.size || syncGroups.size) try {
      const {
        xiaoheiBotSyncService
      } = await import("./auth.service.js").then(n => n.i);
      for (const botId of syncBots) xiaoheiBotSyncService.scheduleLocalProfileSync(botId);
      for (const groupId of syncGroups) xiaoheiBotSyncService.scheduleLocalGroupSync(groupId);
    } catch (error) {
      console.error("[XiaoheiBot] 管理工具改动同步排队失败:", error);
    }
    const record = result && typeof result === "object" && !Array.isArray(result) ? result : null;
    const mobileSync = await syncMobileCreatedGroup(result);
    xiaoheiBotService.notifyManagementDirectoryChanged(toolName === "xiaohei_create_bot" && typeof record?.conversation_id === "string" ? record.conversation_id : undefined, mobileSync);
    if (Array.isArray(record?.handoff_message_ids)) xiaoheiBotService.notifyMemberHandoffs(record.handoff_message_ids.filter(item => typeof item === "string"));
    if (toolName === "xiaohei_send_group_task" && result && typeof result === "object" && !Array.isArray(result) && typeof result.message_id === "string") xiaoheiBotService.resumeManagedGroupTask(result.message_id);
    return result;
  }
};
var xiaoheiBotManagementService = new XiaoheiBotManagementService();
//#endregion
export { isManagementTool, xiaoheiBotManagementService };