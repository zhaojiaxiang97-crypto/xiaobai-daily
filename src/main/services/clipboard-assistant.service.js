import { createRequire as __nodeCreateRequire } from "node:module";
__nodeCreateRequire(import.meta.url);
import { n as __exportAll } from "../lib/rolldown-runtime.js";
import { $t as defaultClipboardAssistantShortcut, Mt as getDatabase, Pt as getOpenDatabaseConnection, Qt as CLIPBOARD_WORK_RECORD_CATEGORY_ID, Xt as CLIPBOARD_PICKER_PREVIEW_MAX_LENGTH, Y as resolveScreenshotBeautifierShortcut, Zt as CLIPBOARD_WORK_RECORD_CATEGORY, an as builtinCategoriesForUsageMode, en as resolveClipboardAssistantShortcut, i as t, n as settingsRepository, nn as BUILTIN_WORK_RECORD_CATEGORY_PRESETS, rn as STUDENT_BUILTIN_WORK_RECORD_CATEGORY_PRESETS, sn as builtinWorkRecordCategoryId } from "./settings.repository.js";
import { t as workRecordRepository } from "./work-record.repository.js";
import { t as sendToLiveWindow } from "./window-messaging.js";
import crypto from "node:crypto";
import { BrowserWindow, app, clipboard, globalShortcut, powerMonitor } from "electron";
//#region electron/repositories/work-record-category.repository.ts
function parseKeywords(value) {
  try {
    const parsed = JSON.parse(value);
    return Array.isArray(parsed) ? parsed.filter(item => typeof item === "string") : [];
  } catch {
    return [];
  }
}
function mapRow(row) {
  return {
    id: row.id,
    name: row.name,
    keywords: parseKeywords(row.keywords_json),
    color: row.color,
    enabled: row.enabled === 1,
    sortOrder: row.sort_order,
    isBuiltin: row.is_builtin === 1,
    createdAt: row.created_at,
    updatedAt: row.updated_at
  };
}
var WorkRecordCategoryRepository = class {
  list(includeDisabled = true) {
    return getDatabase().prepare(`
        SELECT *
        FROM work_record_categories
        ${includeDisabled ? "" : "WHERE enabled = 1"}
        ORDER BY is_builtin DESC, sort_order ASC, created_at ASC
      `).all().map(mapRow);
  }
  findById(id) {
    const row = getDatabase().prepare("SELECT * FROM work_record_categories WHERE id = ?").get(id);
    return row ? mapRow(row) : null;
  }
  findByName(name) {
    const row = getDatabase().prepare("SELECT * FROM work_record_categories WHERE name = ?").get(name);
    return row ? mapRow(row) : null;
  }
  nextSortOrder() {
    return getDatabase().prepare("SELECT COALESCE(MAX(sort_order), 0) + 1 AS next_sort_order FROM work_record_categories").get()?.next_sort_order ?? 1;
  }
  create(input) {
    const now = (/* @__PURE__ */new Date()).toISOString();
    const id = crypto.randomUUID();
    const color = input.color ?? "zinc";
    const enabled = input.enabled === false ? 0 : 1;
    getDatabase().prepare(`
        INSERT INTO work_record_categories (
          id,
          name,
          keywords_json,
          color,
          enabled,
          sort_order,
          is_builtin,
          created_at,
          updated_at
        )
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
      `).run(id, input.name, JSON.stringify(input.keywords), color, enabled, input.sortOrder, 0, now, now);
    return {
      id,
      name: input.name,
      keywords: input.keywords,
      color,
      enabled: enabled === 1,
      sortOrder: input.sortOrder,
      isBuiltin: false,
      createdAt: now,
      updatedAt: now
    };
  }
  update(input) {
    const current = this.findById(input.id);
    if (!current) return null;
    const next = {
      ...current,
      name: input.name ?? current.name,
      keywords: input.keywords ?? current.keywords,
      color: input.color ?? current.color,
      enabled: input.enabled ?? current.enabled,
      updatedAt: (/* @__PURE__ */new Date()).toISOString()
    };
    getDatabase().prepare(`
        UPDATE work_record_categories
        SET name = ?,
            keywords_json = ?,
            color = ?,
            enabled = ?,
            updated_at = ?
        WHERE id = ?
      `).run(next.name, JSON.stringify(next.keywords), next.color, next.enabled ? 1 : 0, next.updatedAt, next.id);
    return next;
  }
  delete(id) {
    return getDatabase().prepare("DELETE FROM work_record_categories WHERE id = ?").run(id).changes > 0;
  }
  /**
  * 补齐缺失的内置分类行（切到学生模式前调用）：导入旧版本备份会清空分类表，用户也可能删过内置分类。
  * 只按 id 补插，同名分类（含用户自定义）已存在时跳过，不覆盖任何已有行。返回补插的行数。
  */
  ensureBuiltinPresets(presets, enabled) {
    const database = getDatabase();
    const findById = database.prepare("SELECT 1 FROM work_record_categories WHERE id = ?");
    const findByName = database.prepare("SELECT 1 FROM work_record_categories WHERE name = ?");
    const insert = database.prepare(`
      INSERT OR IGNORE INTO work_record_categories (
        id, name, keywords_json, color, enabled, sort_order, is_builtin, created_at, updated_at
      )
      VALUES (?, ?, ?, ?, ?, ?, 1, ?, ?)
    `);
    const now = (/* @__PURE__ */new Date()).toISOString();
    let inserted = 0;
    for (const preset of presets) {
      if (findById.get(preset.id) || findByName.get(preset.name)) continue;
      inserted += Number(insert.run(preset.id, preset.name, JSON.stringify(preset.keywords), preset.color, enabled ? 1 : 0, preset.sortOrder, now, now).changes);
    }
    return inserted;
  }
  /**
  * 清除数据或导入不带分类的旧备份后，分类表是空的：按使用模式补齐全部内置分类和「剪贴板记录」，
  * 当前模式用到的启用、另一模式专属的停用；已存在的行不动。返回补插的行数。
  */
  ensureBuiltinCategoriesForUsageMode(mode) {
    const enabledIds = new Set(builtinCategoriesForUsageMode(mode).map(builtinWorkRecordCategoryId));
    const presets = [...BUILTIN_WORK_RECORD_CATEGORY_PRESETS, ...STUDENT_BUILTIN_WORK_RECORD_CATEGORY_PRESETS];
    const clipboardPreset = {
      id: CLIPBOARD_WORK_RECORD_CATEGORY_ID,
      name: CLIPBOARD_WORK_RECORD_CATEGORY,
      keywords: [],
      color: "indigo",
      sortOrder: presets.length + 1
    };
    return this.ensureBuiltinPresets([...presets.filter(preset => enabledIds.has(preset.id)), clipboardPreset], true) + this.ensureBuiltinPresets(presets.filter(preset => !enabledIds.has(preset.id)), false);
  }
  /** 批量启停内置分类（切换使用模式用）；只动 is_builtin=1 的行，用户自定义分类不受影响 */
  setBuiltinEnabled(ids, enabled) {
    if (ids.length === 0) return 0;
    const statement = getDatabase().prepare(`
      UPDATE work_record_categories
      SET enabled = ?, updated_at = ?
      WHERE id = ? AND is_builtin = 1
    `);
    const now = (/* @__PURE__ */new Date()).toISOString();
    let changed = 0;
    for (const id of ids) changed += Number(statement.run(enabled ? 1 : 0, now, id).changes);
    return changed;
  }
};
var workRecordCategoryRepository = new WorkRecordCategoryRepository();
//#endregion
//#region shared/utils/capture-shortcut.ts
/** 只接受可安全注册的全局组合键，存储格式同时用于 Electron accelerator。 */
function normalizeCaptureShortcut(value) {
  const parts = value.split("+");
  const key = parts.pop()?.toUpperCase();
  if (!key || !/^[A-Z]$/.test(key)) return null;
  const modifiers = parts.map(part => part.toLowerCase());
  if (modifiers.length < 1 || modifiers.length > 2) return null;
  if (new Set(modifiers).size !== modifiers.length) return null;
  if (modifiers.some(part => !["ctrl", "alt", "shift", "command", "super"].includes(part))) return null;
  if (!modifiers.some(part => ["ctrl", "alt", "command", "super"].includes(part))) return null;
  if (modifiers.includes("command") && modifiers.includes("super")) return null;
  const commonKeys = /* @__PURE__ */new Set(["A", "C", "F", "L", "N", "P", "Q", "R", "S", "T", "V", "W", "X", "Z"]);
  if (modifiers.length === 1 && (modifiers.includes("ctrl") || modifiers.includes("command")) && commonKeys.has(key)) return null;
  if (modifiers.length === 1 && modifiers.includes("alt") && key === "F") return null;
  return [modifiers.includes("ctrl") && "Ctrl", modifiers.includes("alt") && "Alt", modifiers.includes("shift") && "Shift", modifiers.includes("command") && "Command", modifiers.includes("super") && "Super", key].filter(Boolean).join("+");
}
//#endregion
//#region electron/repositories/clipboard-assistant.repository.ts
var HISTORY_COLUMNS = `
  id, preview, character_count, copy_count, use_count, is_pinned,
  first_copied_at, copied_at, last_used_at
`;
function mapHistoryRow(row) {
  return {
    id: row.id,
    preview: row.preview,
    characterCount: row.character_count,
    copyCount: row.copy_count,
    useCount: row.use_count,
    isPinned: row.is_pinned === 1,
    firstCopiedAt: row.first_copied_at,
    copiedAt: row.copied_at,
    lastUsedAt: row.last_used_at
  };
}
function mapPhraseRow(row) {
  return {
    id: row.id,
    title: row.title,
    content: row.content,
    sortOrder: row.sort_order,
    useCount: row.use_count,
    lastUsedAt: row.last_used_at,
    createdAt: row.created_at,
    updatedAt: row.updated_at
  };
}
function escapeLikePattern(value) {
  return value.replace(/[\\%_]/g, "\\$&");
}
var ClipboardAssistantRepository = class {
  /** 同一内容只保留一行：再次复制时刷新复制时间和次数，置顶状态保持不变 */
  recordText(input) {
    getDatabase().prepare(`
      INSERT INTO clipboard_history (
        id, content_text, content_hash, preview, character_count, copy_count, use_count,
        is_pinned, first_copied_at, copied_at, last_used_at, created_at, updated_at
      )
      VALUES (?, ?, ?, ?, ?, 1, 0, 0, ?, ?, NULL, ?, ?)
      ON CONFLICT(content_hash) DO UPDATE SET
        copied_at = excluded.copied_at,
        copy_count = clipboard_history.copy_count + 1,
        updated_at = excluded.updated_at
    `).run(crypto.randomUUID(), input.text, input.contentHash, input.preview, input.characterCount, input.copiedAt, input.copiedAt, input.copiedAt, input.copiedAt);
  }
  listHistory(options) {
    const clauses = [];
    const values = [];
    const keyword = options.keyword?.trim();
    if (keyword) {
      clauses.push("content_text LIKE ? ESCAPE '\\'");
      values.push(`%${escapeLikePattern(keyword)}%`);
    }
    if (options.cursor) {
      const pinned = options.cursor.isPinned ? 1 : 0;
      clauses.push(`(
        is_pinned < ?
        OR (is_pinned = ? AND copied_at < ?)
        OR (is_pinned = ? AND copied_at = ? AND id < ?)
      )`);
      values.push(pinned, pinned, options.cursor.copiedAt, pinned, options.cursor.copiedAt, options.cursor.id);
    }
    return getDatabase().prepare(`
      SELECT ${HISTORY_COLUMNS}
      FROM clipboard_history
      ${clauses.length > 0 ? `WHERE ${clauses.join(" AND ")}` : ""}
      ORDER BY is_pinned DESC, copied_at DESC, id DESC
      LIMIT ?
    `).all(...values, options.limit).map(mapHistoryRow);
  }
  findHistoryDetail(id) {
    const row = getDatabase().prepare("SELECT content_text, character_count, copy_count, copied_at FROM clipboard_history WHERE id = ?").get(id);
    return row ? {
      text: row.content_text,
      characterCount: row.character_count,
      copyCount: row.copy_count,
      copiedAt: row.copied_at
    } : null;
  }
  findHistoryText(id) {
    return getDatabase().prepare("SELECT content_text FROM clipboard_history WHERE id = ?").get(id)?.content_text ?? null;
  }
  /** 从历史里重新复制：顶到最前面并累计使用次数 */
  markHistoryUsed(id, usedAt) {
    getDatabase().prepare(`
      UPDATE clipboard_history
      SET copied_at = ?, last_used_at = ?, use_count = use_count + 1, updated_at = ?
      WHERE id = ?
    `).run(usedAt, usedAt, usedAt, id);
  }
  setHistoryPinned(id, pinned) {
    const result = getDatabase().prepare("UPDATE clipboard_history SET is_pinned = ?, updated_at = ? WHERE id = ?").run(pinned ? 1 : 0, (/* @__PURE__ */new Date()).toISOString(), id);
    return Number(result.changes) > 0;
  }
  deleteHistory(id) {
    const result = getDatabase().prepare("DELETE FROM clipboard_history WHERE id = ?").run(id);
    return Number(result.changes) > 0;
  }
  /** 清空未置顶的历史，置顶的保留 */
  clearUnpinnedHistory() {
    const result = getDatabase().prepare("DELETE FROM clipboard_history WHERE is_pinned = 0").run();
    return Number(result.changes);
  }
  deleteUnpinnedHistoryBefore(beforeIso) {
    const result = getDatabase().prepare("DELETE FROM clipboard_history WHERE is_pinned = 0 AND copied_at < ?").run(beforeIso);
    return Number(result.changes);
  }
  countHistory() {
    const row = getDatabase().prepare(`
      SELECT COUNT(*) AS total, COALESCE(SUM(is_pinned), 0) AS pinned
      FROM clipboard_history
    `).get();
    return {
      total: row?.total ?? 0,
      pinned: row?.pinned ?? 0
    };
  }
  listPhrases() {
    return getDatabase().prepare(`
      SELECT id, title, content, sort_order, use_count, last_used_at, created_at, updated_at
      FROM clipboard_phrases
      ORDER BY sort_order ASC, created_at ASC
    `).all().map(mapPhraseRow);
  }
  findPhrase(id) {
    const row = getDatabase().prepare(`
      SELECT id, title, content, sort_order, use_count, last_used_at, created_at, updated_at
      FROM clipboard_phrases
      WHERE id = ?
    `).get(id);
    return row ? mapPhraseRow(row) : null;
  }
  countPhrases() {
    return getDatabase().prepare("SELECT COUNT(*) AS total FROM clipboard_phrases").get()?.total ?? 0;
  }
  createPhrase(input) {
    const database = getDatabase();
    const now = (/* @__PURE__ */new Date()).toISOString();
    const id = crypto.randomUUID();
    const nextSortOrder = database.prepare("SELECT COALESCE(MAX(sort_order), 0) + 1 AS next FROM clipboard_phrases").get().next;
    database.prepare(`
      INSERT INTO clipboard_phrases (id, title, content, sort_order, use_count, last_used_at, created_at, updated_at)
      VALUES (?, ?, ?, ?, 0, NULL, ?, ?)
    `).run(id, input.title, input.content, nextSortOrder, now, now);
    return this.findPhrase(id);
  }
  updatePhrase(id, input) {
    getDatabase().prepare("UPDATE clipboard_phrases SET title = ?, content = ?, updated_at = ? WHERE id = ?").run(input.title, input.content, (/* @__PURE__ */new Date()).toISOString(), id);
    return this.findPhrase(id);
  }
  deletePhrase(id) {
    const result = getDatabase().prepare("DELETE FROM clipboard_phrases WHERE id = ?").run(id);
    return Number(result.changes) > 0;
  }
  /** 按传入顺序重排；未出现在列表里的常用语排在后面，保持原有先后 */
  reorderPhrases(ids) {
    const database = getDatabase();
    const existing = this.listPhrases().map(phrase => phrase.id);
    const known = new Set(existing);
    const ordered = [...new Set(ids.filter(id => known.has(id)))];
    const orderedSet = new Set(ordered);
    const finalOrder = [...ordered, ...existing.filter(id => !orderedSet.has(id))];
    const now = (/* @__PURE__ */new Date()).toISOString();
    const statement = database.prepare("UPDATE clipboard_phrases SET sort_order = ?, updated_at = ? WHERE id = ?");
    database.exec("BEGIN");
    try {
      finalOrder.forEach((id, index) => statement.run(index + 1, now, id));
      database.exec("COMMIT");
    } catch (error) {
      database.exec("ROLLBACK");
      throw error;
    }
  }
  markPhraseUsed(id, usedAt) {
    getDatabase().prepare("UPDATE clipboard_phrases SET use_count = use_count + 1, last_used_at = ? WHERE id = ?").run(usedAt, id);
  }
};
var clipboardAssistantRepository = new ClipboardAssistantRepository();
//#endregion
//#region electron/services/clipboard-assistant.service.ts
var clipboard_assistant_service_exports = /* @__PURE__ */__exportAll({
  ClipboardAssistantService: () => ClipboardAssistantService,
  clipboardAssistantService: () => clipboardAssistantService
});
var POLL_INTERVAL_MS = 1e3;
var IDLE_PAUSE_SECONDS = 120;
var PREVIEW_MAX_CHARACTERS = 400;
var RETENTION_CLEANUP_INTERVAL_MS = 216e5;
var TIMELINE_MIN_CHARACTERS = 2;
var TIMELINE_MAX_CHARACTERS = 1e4;
var TIMELINE_DEDUP_WINDOW_MS = 6e5;
var CHANGE_NOTIFY_DELAY_MS = 400;
var WORK_RECORDS_NOTIFY_DELAY_MS = 2e3;
var HISTORY_PAGE_SIZE_MAX = 100;
var PICKER_HISTORY_LIMIT = 60;
var WINDOWS_CONCEALED_FORMATS = ["ExcludeClipboardContentFromMonitorProcessing", "Clipboard Viewer Ignore"];
var WINDOWS_HISTORY_FLAG_FORMAT = "CanIncludeInClipboardHistory";
var MAC_CONCEALED_FORMATS = ["org.nspasteboard.ConcealedType", "org.nspasteboard.TransientType", "org.nspasteboard.AutoGeneratedType", "com.agilebits.onepassword", "de.petermaurer.TransientPasteboardType"];
function language() {
  try {
    return settingsRepository.getSettings().language || "zh-CN";
  } catch {
    return "zh-CN";
  }
}
function message(key) {
  return t(`clipboardAssistant.${key}`, language());
}
/** 截图美化开启时它的快捷键，用来避免两边设成同一个组合键 */
function screenshotShortcutOf(settings) {
  return settings.enableScreenshotBeautifier ? resolveScreenshotBeautifierShortcut(settings.screenshotBeautifierShortcut, process.platform) : "";
}
function countCharacters(text) {
  let count = 0;
  for (const _ of text) count += 1;
  return count;
}
/** 按 Unicode 字符截断，避免切开代理对 */
function truncateCharacters(text, max) {
  let count = 0;
  let end = 0;
  for (const char of text) {
    if (count >= max) break;
    count += 1;
    end += char.length;
  }
  return text.slice(0, end);
}
function buildPreview(text) {
  const head = text.length > PREVIEW_MAX_CHARACTERS * 4 ? text.slice(0, PREVIEW_MAX_CHARACTERS * 4) : text;
  const normalized = head.replace(/\r\n?/g, "\n").replace(/\0/g, "").trim();
  const preview = truncateCharacters(normalized, PREVIEW_MAX_CHARACTERS);
  return preview.length < normalized.length || head.length < text.length ? `${preview}…` : preview;
}
function hashText(text) {
  return crypto.createHash("sha256").update(text, "utf8").digest("hex");
}
function encodeCursor(item) {
  const payload = {
    p: item.isPinned ? 1 : 0,
    c: item.copiedAt,
    i: item.id
  };
  return Buffer.from(JSON.stringify(payload), "utf8").toString("base64url");
}
function decodeCursor(value) {
  if (!value) return undefined;
  try {
    const payload = JSON.parse(Buffer.from(value, "base64url").toString("utf8"));
    if (payload.p !== 0 && payload.p !== 1 || typeof payload.c !== "string" || typeof payload.i !== "string") return undefined;
    return {
      isPinned: payload.p === 1,
      copiedAt: payload.c,
      id: payload.i
    };
  } catch {
    return;
  }
}
/** 剪贴板里带了「不要记录」标记（密码管理器、验证码工具等）时跳过 */
function isConcealedClipboard() {
  try {
    if (process.platform === "win32") {
      if (WINDOWS_CONCEALED_FORMATS.some(format => clipboard.has(format))) return true;
      if (clipboard.has(WINDOWS_HISTORY_FLAG_FORMAT)) try {
        const buffer = clipboard.readBuffer(WINDOWS_HISTORY_FLAG_FORMAT);
        return buffer.length < 4 || buffer.readUInt32LE(0) === 0;
      } catch {
        return true;
      }
      return false;
    }
    if (process.platform === "darwin") return MAC_CONCEALED_FORMATS.some(format => clipboard.has(format));
  } catch {}
  return false;
}
/**
* 剪贴板助手：后台记录复制的纯文本（图片、文件不记录），按快捷键唤起浮窗选择历史或常用语复制回剪贴板。
* 只在已登录账号的数据库里运行；登录、退出、导入备份后由调用方执行 sync() 重新读取设置。
*/
var ClipboardAssistantService = class {
  initialized = false;
  timer = null;
  enabled = false;
  syncToTimeline = false;
  retentionDays = 0;
  databaseGeneration = -1;
  systemPaused = false;
  lastText = null;
  lastCleanupAt = 0;
  lastReportedError = "";
  registeredShortcut = "";
  shortcutError = null;
  shortcutSuspended = false;
  pickerHandlers = null;
  pendingChangeReasons = /* @__PURE__ */new Set();
  changeNotifyTimer = null;
  workRecordsNotifyTimer = null;
  initialize(handlers) {
    this.pickerHandlers = handlers;
    if (this.initialized) return;
    this.initialized = true;
    powerMonitor.on("lock-screen", () => {
      this.systemPaused = true;
    });
    powerMonitor.on("suspend", () => {
      this.systemPaused = true;
    });
    powerMonitor.on("unlock-screen", () => this.resumeFromSystemPause());
    powerMonitor.on("resume", () => this.resumeFromSystemPause());
  }
  /** 重新读取当前账号的设置：启停监听、注册快捷键、按保留期清理 */
  sync() {
    if (!app.isReady()) return;
    let settings;
    try {
      settings = settingsRepository.getSettings();
    } catch (error) {
      console.warn("[ClipboardAssistant] 读取设置失败:", error);
      return;
    }
    const connection = getOpenDatabaseConnection();
    const generation = connection?.generation ?? -1;
    const accountChanged = this.databaseGeneration !== -1 && this.databaseGeneration !== generation;
    this.databaseGeneration = generation;
    const wasEnabled = this.enabled;
    this.enabled = settings.enableClipboardAssistant && connection !== null && connection.ownerUserId !== null;
    this.syncToTimeline = settings.clipboardSyncToTimeline;
    this.retentionDays = settings.clipboardHistoryRetentionDays;
    if (accountChanged || wasEnabled && !this.enabled) this.pickerHandlers?.hide();
    if (this.enabled) {
      this.startMonitor();
      this.cleanupRetention(true);
    } else this.stopMonitor();
    this.syncShortcut(settings);
  }
  dispose() {
    this.stopMonitor();
    if (this.registeredShortcut) globalShortcut.unregister(this.registeredShortcut);
    this.registeredShortcut = "";
    if (this.changeNotifyTimer) clearTimeout(this.changeNotifyTimer);
    if (this.workRecordsNotifyTimer) clearTimeout(this.workRecordsNotifyTimer);
    this.changeNotifyTimer = null;
    this.workRecordsNotifyTimer = null;
  }
  isEnabled() {
    return this.enabled;
  }
  getState() {
    const settings = settingsRepository.getSettings();
    const counts = clipboardAssistantRepository.countHistory();
    return {
      enabled: settings.enableClipboardAssistant,
      shortcut: settings.clipboardAssistantShortcut,
      effectiveShortcut: resolveClipboardAssistantShortcut(settings.clipboardAssistantShortcut, process.platform),
      defaultShortcut: defaultClipboardAssistantShortcut(process.platform),
      shortcutRegistered: Boolean(this.registeredShortcut),
      shortcutError: settings.enableClipboardAssistant ? this.shortcutError : null,
      syncToTimeline: settings.clipboardSyncToTimeline,
      retentionDays: settings.clipboardHistoryRetentionDays,
      historyCount: counts.total,
      pinnedCount: counts.pinned,
      phraseCount: clipboardAssistantRepository.countPhrases()
    };
  }
  updateSettings(input) {
    const previous = settingsRepository.getSettings();
    const patch = {};
    if (input.enabled !== undefined) patch.enableClipboardAssistant = input.enabled;
    if (input.syncToTimeline !== undefined) patch.clipboardSyncToTimeline = input.syncToTimeline;
    if (input.retentionDays !== undefined) patch.clipboardHistoryRetentionDays = input.retentionDays;
    const shortcutChanged = input.shortcut !== undefined && input.shortcut !== previous.clipboardAssistantShortcut;
    if (input.shortcut !== undefined) {
      this.assertShortcutAllowed(input.shortcut, previous);
      patch.clipboardAssistantShortcut = input.shortcut;
    }
    settingsRepository.updateSettings(patch);
    this.sync();
    if (shortcutChanged && this.enabled && !this.shortcutSuspended && this.shortcutError) {
      const reason = this.shortcutError;
      settingsRepository.updateSettings({
        clipboardAssistantShortcut: previous.clipboardAssistantShortcut
      });
      this.sync();
      throw new Error(reason);
    }
    this.queueChanged("settings");
    return this.getState();
  }
  /** 录入新快捷键期间暂停已注册的组合键，避免按下时弹出浮窗 */
  setShortcutSuspended(value) {
    if (this.shortcutSuspended === value) return;
    this.shortcutSuspended = value;
    try {
      this.syncShortcut(settingsRepository.getSettings());
    } catch (error) {
      console.warn("[ClipboardAssistant] 快捷键同步失败:", error);
    }
  }
  listHistory(input) {
    const pageSize = Math.min(HISTORY_PAGE_SIZE_MAX, Math.max(1, Math.floor(input.pageSize ?? 50)));
    const rows = clipboardAssistantRepository.listHistory({
      keyword: input.keyword,
      cursor: decodeCursor(input.cursor),
      limit: pageSize + 1
    });
    const hasMore = rows.length > pageSize;
    const items = hasMore ? rows.slice(0, pageSize) : rows;
    const last = items.at(-1);
    return {
      items,
      hasMore,
      nextCursor: hasMore && last ? encodeCursor(last) : null
    };
  }
  copyHistory(id) {
    const text = clipboardAssistantRepository.findHistoryText(id);
    if (text === null) throw new Error(message("historyNotFound"));
    this.writeToClipboard(text);
    clipboardAssistantRepository.markHistoryUsed(id, (/* @__PURE__ */new Date()).toISOString());
    this.queueChanged("history");
  }
  copyPhrase(id) {
    const phrase = clipboardAssistantRepository.findPhrase(id);
    if (!phrase) throw new Error(message("phraseNotFound"));
    this.writeToClipboard(phrase.content);
    clipboardAssistantRepository.markPhraseUsed(id, (/* @__PURE__ */new Date()).toISOString());
    this.queueChanged("phrases");
  }
  setHistoryPinned(id, pinned) {
    if (!clipboardAssistantRepository.setHistoryPinned(id, pinned)) throw new Error(message("historyNotFound"));
    this.queueChanged("history");
  }
  deleteHistory(id) {
    clipboardAssistantRepository.deleteHistory(id);
    this.queueChanged("history");
  }
  clearHistory() {
    const removed = clipboardAssistantRepository.clearUnpinnedHistory();
    this.queueChanged("history");
    return removed;
  }
  listPhrases() {
    return clipboardAssistantRepository.listPhrases();
  }
  savePhrase(input) {
    const title = input.title.replace(/\s+/g, " ").trim().slice(0, 60);
    const content = input.content.replace(/\r\n?/g, "\n");
    if (!content.trim()) throw new Error(message("phraseContentRequired"));
    if (content.length > 2e4) throw new Error(message("phraseTooLong"));
    let phrase;
    if (input.id) {
      phrase = clipboardAssistantRepository.updatePhrase(input.id, {
        title,
        content
      });
      if (!phrase) throw new Error(message("phraseNotFound"));
    } else {
      if (clipboardAssistantRepository.countPhrases() >= 500) throw new Error(message("phraseLimitReached"));
      phrase = clipboardAssistantRepository.createPhrase({
        title,
        content
      });
    }
    this.queueChanged("phrases");
    return phrase;
  }
  deletePhrase(id) {
    clipboardAssistantRepository.deletePhrase(id);
    this.queueChanged("phrases");
  }
  reorderPhrases(ids) {
    clipboardAssistantRepository.reorderPhrases(ids);
    this.queueChanged("phrases");
    return clipboardAssistantRepository.listPhrases();
  }
  pickerHistory(keyword) {
    return clipboardAssistantRepository.listHistory({
      keyword,
      limit: PICKER_HISTORY_LIMIT
    }).map(item => ({
      id: item.id,
      kind: "history",
      title: "",
      preview: item.preview,
      isPinned: item.isPinned,
      copiedAt: item.copiedAt
    }));
  }
  pickerPhrases() {
    return clipboardAssistantRepository.listPhrases().map(phrase => ({
      id: phrase.id,
      kind: "phrase",
      title: phrase.title,
      preview: buildPreview(phrase.content),
      isPinned: false,
      copiedAt: null
    }));
  }
  /** 浮窗右侧预览：读取完整内容，超长时只取前一段 */
  pickerDetail(kind, id) {
    if (kind === "history") {
      const history = clipboardAssistantRepository.findHistoryDetail(id);
      if (!history) return null;
      const content = truncateCharacters(history.text, CLIPBOARD_PICKER_PREVIEW_MAX_LENGTH);
      return {
        kind,
        id,
        title: "",
        content,
        truncated: content.length < history.text.length,
        characterCount: history.characterCount,
        count: history.copyCount,
        copiedAt: history.copiedAt
      };
    }
    const phrase = clipboardAssistantRepository.findPhrase(id);
    if (!phrase) return null;
    return {
      kind,
      id,
      title: phrase.title,
      content: phrase.content,
      truncated: false,
      characterCount: countCharacters(phrase.content),
      count: phrase.useCount,
      copiedAt: null
    };
  }
  handleShortcut() {
    if (!this.enabled) return;
    this.pickerHandlers?.toggle();
  }
  assertShortcutAllowed(shortcut, settings) {
    if (!shortcut) return;
    if (normalizeCaptureShortcut(shortcut) !== shortcut) throw new Error(message("shortcutInvalid"));
    const parts = shortcut.split("+");
    if (process.platform !== "darwin" && parts.includes("Command")) throw new Error(message("shortcutCommandUnsupported"));
    if (process.platform === "darwin" && parts.includes("Super")) throw new Error(message("shortcutSuperOnMac"));
    if (settings.enableCaptureShortcut && settings.captureShortcut === resolveClipboardAssistantShortcut(shortcut, process.platform)) throw new Error(message("shortcutSameAsCapture"));
    if (screenshotShortcutOf(settings) === resolveClipboardAssistantShortcut(shortcut, process.platform)) throw new Error(message("shortcutSameAsScreenshot"));
  }
  syncShortcut(settings) {
    const next = this.enabled && !this.shortcutSuspended ? resolveClipboardAssistantShortcut(settings.clipboardAssistantShortcut, process.platform) : "";
    if (this.registeredShortcut === next && (!next || globalShortcut.isRegistered(next))) return;
    if (this.registeredShortcut) globalShortcut.unregister(this.registeredShortcut);
    this.registeredShortcut = "";
    if (!next) {
      if (!this.shortcutSuspended) this.shortcutError = null;
      return;
    }
    if (settings.enableCaptureShortcut && settings.captureShortcut === next) {
      this.shortcutError = message("shortcutSameAsCapture");
      return;
    }
    if (screenshotShortcutOf(settings) === next) {
      this.shortcutError = message("shortcutSameAsScreenshot");
      return;
    }
    try {
      if (globalShortcut.register(next, () => this.handleShortcut())) {
        this.registeredShortcut = next;
        this.shortcutError = null;
        console.info(`[剪贴板助手] 快捷键已注册｜${next}。`);
      } else {
        this.shortcutError = message("shortcutOccupied");
        console.warn(`[剪贴板助手] 快捷键注册失败｜${next} 已被系统或其他应用占用。`);
      }
    } catch (error) {
      this.shortcutError = error instanceof Error && error.message ? error.message : message("shortcutRegisterFailed");
    }
  }
  startMonitor() {
    if (this.timer) return;
    this.lastText = this.readClipboardText();
    this.timer = setInterval(() => this.poll(), POLL_INTERVAL_MS);
    console.info("[剪贴板助手] 已开始记录剪贴板文本。");
  }
  stopMonitor() {
    if (!this.timer) return;
    clearInterval(this.timer);
    this.timer = null;
    this.lastText = null;
    console.info("[剪贴板助手] 已停止记录剪贴板文本。");
  }
  resumeFromSystemPause() {
    this.systemPaused = false;
  }
  readClipboardText() {
    try {
      return clipboard.readText();
    } catch {
      return null;
    }
  }
  /** 自己写入剪贴板的内容（从历史或常用语复制）不再当作新复制记录 */
  writeToClipboard(text) {
    clipboard.writeText(text);
    this.lastText = this.readClipboardText() ?? text;
  }
  poll() {
    if (!this.enabled || this.systemPaused) return;
    const connection = getOpenDatabaseConnection();
    if (connection && connection.generation !== this.databaseGeneration) {
      this.sync();
      return;
    }
    try {
      if (powerMonitor.getSystemIdleTime() >= IDLE_PAUSE_SECONDS) return;
    } catch {}
    const text = this.readClipboardText();
    if (text === null || text === this.lastText) return;
    this.lastText = text;
    if (!text.trim() || text.length > 2e5) return;
    if (isConcealedClipboard()) return;
    try {
      this.record(text);
      this.lastReportedError = "";
    } catch (error) {
      const reason = error instanceof Error ? error.message : String(error);
      if (reason !== this.lastReportedError) {
        this.lastReportedError = reason;
        console.warn("[ClipboardAssistant] 记录剪贴板失败:", reason);
      }
    }
  }
  record(text) {
    const now = (/* @__PURE__ */new Date()).toISOString();
    const contentHash = hashText(text);
    clipboardAssistantRepository.recordText({
      text,
      contentHash,
      preview: buildPreview(text),
      characterCount: countCharacters(text),
      copiedAt: now
    });
    this.cleanupRetention(false);
    this.queueChanged("history");
    if (this.syncToTimeline) this.writeTimelineRecord(text, contentHash, now);
  }
  /** 时间线里另存一份，不进时间线概括、不占记录次数；暂停记录时不写 */
  writeTimelineRecord(text, contentHash, now) {
    if (!settingsRepository.getSettings().enableRecording) return;
    const normalized = text.replace(/\r\n?/g, "\n").replace(/\0/g, "").trim();
    const characterCount = countCharacters(normalized);
    if (characterCount < TIMELINE_MIN_CHARACTERS) return;
    const since = (/* @__PURE__ */new Date(Date.now() - TIMELINE_DEDUP_WINDOW_MS)).toISOString();
    if (workRecordRepository.hasClipboardRecordSince(contentHash, since)) return;
    const truncated = characterCount > TIMELINE_MAX_CHARACTERS;
    workRecordRepository.create({
      startedAt: now,
      endedAt: now,
      category: workRecordCategoryRepository.findById(CLIPBOARD_WORK_RECORD_CATEGORY_ID)?.name ?? "剪贴板记录",
      summary: truncated ? `${truncateCharacters(normalized, TIMELINE_MAX_CHARACTERS)}…` : normalized,
      details: {
        inputMethod: "clipboard-assistant",
        contentHash,
        characterCount,
        truncated
      },
      source: "clipboard"
    });
    this.queueWorkRecordsChanged();
  }
  cleanupRetention(force) {
    if (this.retentionDays <= 0) return;
    const now = Date.now();
    if (!force && now - this.lastCleanupAt < RETENTION_CLEANUP_INTERVAL_MS) return;
    this.lastCleanupAt = now;
    try {
      if (clipboardAssistantRepository.deleteUnpinnedHistoryBefore((/* @__PURE__ */new Date(now - this.retentionDays * 24 * 60 * 60 * 1e3)).toISOString()) > 0) this.queueChanged("history");
    } catch (error) {
      console.warn("[ClipboardAssistant] 清理过期剪贴板历史失败:", error);
    }
  }
  queueChanged(reason) {
    this.pendingChangeReasons.add(reason);
    if (this.changeNotifyTimer) return;
    this.changeNotifyTimer = setTimeout(() => {
      this.changeNotifyTimer = null;
      const reasons = [...this.pendingChangeReasons];
      this.pendingChangeReasons.clear();
      for (const window of BrowserWindow.getAllWindows()) sendToLiveWindow(window, "clipboard-assistant:changed", {
        reasons
      });
    }, CHANGE_NOTIFY_DELAY_MS);
  }
  queueWorkRecordsChanged() {
    if (this.workRecordsNotifyTimer) return;
    this.workRecordsNotifyTimer = setTimeout(() => {
      this.workRecordsNotifyTimer = null;
      for (const window of BrowserWindow.getAllWindows()) sendToLiveWindow(window, "work-records:changed");
    }, WORK_RECORDS_NOTIFY_DELAY_MS);
  }
};
var clipboardAssistantService = new ClipboardAssistantService();
//#endregion
export { workRecordCategoryRepository as i, clipboard_assistant_service_exports as n, normalizeCaptureShortcut as r, clipboardAssistantService as t };