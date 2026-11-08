import { createRequire as __nodeCreateRequire } from "node:module";
__nodeCreateRequire(import.meta.url);
import { Pt as getOpenDatabaseConnection, yt as objectType } from "./settings.repository-DnN-jwx0.js";
import { P as xiaoheiBotRepository, at as authRepository, et as API_BASE } from "./telemetry.service-BTMk6ZSl.js";
import { _ as roleShareCardSchema, a as describeBotSchedule, b as roleShareTemplateSchema, r as botScheduleService } from "./xiaohei-bot-schedule.service-CT9HAQ0F.js";
import { createHash } from "node:crypto";
import { nativeImage, net } from "electron";
//#region electron/services/xiaohei-bot-share-tools.ts
async function avatarThemeColor(avatar, fallback) {
	if (!avatar) return fallback;
	try {
		let image;
		if (avatar.startsWith("data:image/")) image = nativeImage.createFromDataURL(avatar);
		else {
			const response = await net.fetch(avatar, {
				signal: AbortSignal.timeout(5e3),
				credentials: "omit"
			});
			if (!response.ok || !response.headers.get("content-type")?.startsWith("image/")) return fallback;
			const reader = response.body?.getReader();
			if (!reader) return fallback;
			const chunks = [];
			let size = 0;
			while (true) {
				const { done, value } = await reader.read();
				if (done) break;
				size += value.length;
				if (size > 2097152) {
					await reader.cancel();
					return fallback;
				}
				chunks.push(value);
			}
			image = nativeImage.createFromBuffer(Buffer.concat(chunks));
		}
		if (image.isEmpty()) return fallback;
		const pixels = image.resize({
			width: 40,
			height: 40
		}).toBitmap();
		const buckets = /* @__PURE__ */ new Map();
		for (let i = 0; i < pixels.length; i += 4) {
			const b = pixels[i], g = pixels[i + 1], r = pixels[i + 2], a = pixels[i + 3];
			const high = Math.max(r, g, b), low = Math.min(r, g, b);
			if (a < 128 || high < 35 || low > 235 || high - low < 18) continue;
			const weight = a / 255 * (1 + (high - low) / 64);
			const key = (r >> 5) * 64 + (g >> 5) * 8 + (b >> 5);
			const bucket = buckets.get(key) ?? {
				weight: 0,
				r: 0,
				g: 0,
				b: 0
			};
			bucket.weight += weight;
			bucket.r += r * weight;
			bucket.g += g * weight;
			bucket.b += b * weight;
			buckets.set(key, bucket);
		}
		const dominant = [...buckets.values()].sort((a, b) => b.weight - a.weight)[0];
		if (!dominant) return fallback;
		return "#" + [
			dominant.r,
			dominant.g,
			dominant.b
		].map((value) => Math.round(value / dominant.weight * .45 + 140.25).toString(16).padStart(2, "0")).join("");
	} catch {
		return fallback;
	}
}
async function executeBotShareTool(raw, context) {
	objectType({}).strict().parse(raw);
	const assertCurrent = () => {
		context.assertActive();
		const connection = getOpenDatabaseConnection();
		if (!connection || connection.generation !== context.expectedDatabaseGeneration || (connection.ownerUserId ?? 0) !== context.expectedUserId) throw new Error("账号已切换，请重新发起分享");
	};
	assertCurrent();
	const conversation = xiaoheiBotRepository.getConversation(context.conversationId);
	const bot = xiaoheiBotRepository.getBot(context.botId);
	if (!bot || conversation?.kind !== "direct" || conversation.directBotId !== bot.id) throw new Error("只能分享当前单聊中的角色");
	const session = authRepository.getSession();
	if (!session?.token) throw new Error("请先登录后分享角色");
	let avatar = bot.avatar || "https://xiaoheiribao.com/assets/bot-share-default-avatar.png";
	if (avatar?.startsWith("data:image/")) {
		const image = nativeImage.createFromDataURL(avatar);
		if (image.isEmpty()) throw new Error("角色头像无法读取，请重新设置头像");
		avatar = image.resize({
			width: 96,
			height: 96,
			quality: "best"
		}).toDataURL();
	} else if (!avatar?.startsWith("https://")) avatar = void 0;
	const avatarColor = await avatarThemeColor(avatar, /^#[\da-f]{6}$/i.test(bot.avatarColor || "") ? bot.avatarColor : "#fff2e8");
	assertCurrent();
	const template = roleShareTemplateSchema.parse({
		...avatar ? { avatar } : {},
		name: bot.name,
		description: bot.description || "正在了解你的需求，还没有固定设定。",
		avatarColor,
		responseStyle: bot.responseStyle,
		tags: bot.tags,
		schedules: botScheduleService.listForBot(bot.id).map((task) => ({
			name: task.name,
			instruction: task.instruction,
			schedule: describeBotSchedule(task.rule),
			enabled: false
		}))
	});
	const text = JSON.stringify({
		...template,
		avatar: void 0
	});
	if (Buffer.byteLength(JSON.stringify(template), "utf8") > 85e3) throw new Error("角色模板内容过多，请精简后再分享");
	if (Buffer.byteLength(text, "utf8") > 6e4) throw new Error("角色模板内容过多，请精简设定或例行任务后再分享");
	if (/(?:sk-[a-zA-Z0-9_-]{16,}|Bearer\s+[a-zA-Z0-9._-]+|-----BEGIN .*PRIVATE KEY|(?:api[_ -]?key|password|密码|密钥|token)\s*[:：=]\s*\S+|[A-Za-z]:\\\\|\/Users\/|\/home\/|[\w.+-]+@[\w.-]+\.[a-z]{2,}|https?:\/\/)/i.test(text)) throw new Error("角色设定或例行任务中包含账号、链接、路径或疑似密钥，请先移除这些内容再分享");
	const response = await fetch(`${API_BASE}/v2/xiaohei-bot/role-shares.php?url_format=short`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${session.token}`
		},
		body: JSON.stringify({
			requestId: createHash("sha256").update(`${context.triggerMessageId || context.toolCallId}:${bot.id}`).digest("hex"),
			template
		}),
		signal: AbortSignal.timeout(2e4)
	});
	assertCurrent();
	const body = await response.json().catch(() => null);
	assertCurrent();
	if (!response.ok || !body?.ok) throw new Error(body?.error?.message || "分享服务暂时不可用，请稍后重试");
	const card = roleShareCardSchema.safeParse(body.data);
	if (!card.success) throw new Error("分享服务返回的模板或链接无效，请稍后重试");
	return card.data;
}
//#endregion
export { executeBotShareTool };
