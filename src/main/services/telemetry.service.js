import { createRequire as __nodeCreateRequire } from "node:module";
__nodeCreateRequire(import.meta.url);
import { n as __exportAll } from "../lib/rolldown-runtime.js";
import { Dt as matchesWebsiteUrl, Et as browserPrivacySnapshotSignature, Ft as isDatabaseGenerationCurrent, Gt as decryptString, It as switchDatabase, Kt as encryptString, Lt as decryptCredential, Mt as getDatabase, Nt as getDatabaseGeneration, Ot as normalizeWebsiteUrl, Pt as getOpenDatabaseConnection, Rt as encryptCredential, Vt as getDatabaseDataDir, d as resolveCommonAppName, i as t, n as settingsRepository } from "./settings.repository.js";
import { n as devPerformanceMonitorService, t as nativeActiveContextCollectorService } from "./native-active-context-collector.service.js";
import { t as workRecordRepository } from "./work-record.repository.js";
import { n as appText } from "../lib/app-language.js";
import crypto, { createHash, randomBytes, randomUUID } from "node:crypto";
import { BrowserWindow, Notification, app, ipcMain, powerMonitor, screen, shell, systemPreferences } from "electron";
import os from "node:os";
import fs, { existsSync, readFileSync, readdirSync, renameSync, statSync, writeFileSync } from "node:fs";
import path from "node:path";
import { createRequire } from "node:module";
import { exec, execFile, spawn } from "node:child_process";
import { performance } from "node:perf_hooks";
import { fileURLToPath } from "node:url";
import { promisify } from "node:util";
import process$1 from "node:process";
//#region electron/repositories/auth.repository.ts
function encryptToken(token) {
  if (!token) return token;
  return encryptString(token);
}
function decryptToken(token) {
  if (!token) return "";
  return decryptString(token);
}
function mapSessionRow(row) {
  return {
    userId: row.user_id,
    email: row.email,
    nickname: row.nickname,
    jobTitle: row.job_title,
    avatarUrl: row.avatar_url,
    token: decryptToken(row.token),
    loggedInAt: row.logged_in_at,
    createdAt: row.created_at ?? "",
    educationVerified: row.education_verified === 1
  };
}
function mapSubscriptionRow(row) {
  return {
    planId: row.plan_id,
    planName: row.plan_name,
    isActive: row.is_active === 1,
    expiresAt: row.expires_at,
    paidAt: row.paid_at ?? null,
    lastCheckedAt: row.last_checked_at ?? "",
    freeWorkRecordLimit: row.free_work_record_limit ?? 30,
    freeReportLimit: row.free_report_limit ?? 5,
    pointsBalance: row.points_balance ?? 0
  };
}
var AuthRepository = class {
  getSession() {
    const row = getDatabase().prepare("SELECT * FROM auth_session WHERE id = 1").get();
    return row ? mapSessionRow(row) : null;
  }
  saveSession(session) {
    const database = getDatabase();
    const now = (/* @__PURE__ */new Date()).toISOString();
    database.exec("BEGIN");
    try {
      database.prepare(`
        INSERT INTO auth_session (id, user_id, email, nickname, job_title, avatar_url, token, logged_in_at, created_at, updated_at, education_verified)
        VALUES (1, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        ON CONFLICT(id) DO UPDATE SET
          user_id = excluded.user_id,
          email = excluded.email,
          nickname = excluded.nickname,
          job_title = excluded.job_title,
          avatar_url = excluded.avatar_url,
          token = excluded.token,
          logged_in_at = excluded.logged_in_at,
          created_at = excluded.created_at,
          updated_at = excluded.updated_at,
          education_verified = excluded.education_verified
      `).run(session.userId, session.email, session.nickname, session.jobTitle, session.avatarUrl, encryptToken(session.token), session.loggedInAt, session.createdAt, now, session.educationVerified ? 1 : 0);
      database.exec("COMMIT");
    } catch (error) {
      database.exec("ROLLBACK");
      throw error;
    }
  }
  clearSession() {
    getDatabase().prepare("DELETE FROM auth_session WHERE id = 1").run();
  }
  getSubscriptionCache() {
    const row = getDatabase().prepare("SELECT * FROM subscription_cache WHERE id = 1").get();
    if (!row) return {
      planId: "free",
      planName: "免费版",
      isActive: false,
      expiresAt: null,
      paidAt: null,
      lastCheckedAt: "",
      freeWorkRecordLimit: 30,
      freeReportLimit: 5,
      pointsBalance: 0
    };
    return mapSubscriptionRow(row);
  }
  saveSubscriptionCache(sub) {
    const database = getDatabase();
    const now = (/* @__PURE__ */new Date()).toISOString();
    database.prepare(`
      INSERT INTO subscription_cache (id, plan_id, plan_name, is_active, expires_at, paid_at, last_checked_at, free_work_record_limit, free_report_limit, points_balance, updated_at)
      VALUES (1, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      ON CONFLICT(id) DO UPDATE SET
        plan_id = excluded.plan_id,
        plan_name = excluded.plan_name,
        is_active = excluded.is_active,
        expires_at = excluded.expires_at,
        paid_at = excluded.paid_at,
        last_checked_at = excluded.last_checked_at,
        free_work_record_limit = excluded.free_work_record_limit,
        free_report_limit = excluded.free_report_limit,
        points_balance = excluded.points_balance,
        updated_at = excluded.updated_at
    `).run(sub.planId, sub.planName, sub.isActive ? 1 : 0, sub.expiresAt, sub.paidAt, sub.lastCheckedAt || now, sub.freeWorkRecordLimit, sub.freeReportLimit, sub.pointsBalance, now);
  }
  clearSubscriptionCache() {
    getDatabase().prepare("DELETE FROM subscription_cache WHERE id = 1").run();
  }
};
var authRepository = new AuthRepository();
//#endregion
//#region electron/services/empty-response-log.service.ts
var API_BASE$1 = "https://xiaoheiribao.com/api";
var redactedValue = "[redacted]";
var maxStringLength = 4e3;
var maxArrayLength = 20;
var maxDepth = 6;
var reportTimeoutMs = 5e3;
var sensitiveKeyPattern = /(api[-_]?key|authorization|token|password|secret|credential)/i;
var sensitiveTextPattern = /(api[-_]?key|authorization|token|password|secret|credential)(["':=\s]+)([^"',\s}\]]+)/gi;
var imagePayloadKeys = /* @__PURE__ */new Set(["image", "images", "dataurl", "data_url", "base64", "imageurl", "image_url", "pngbuffer", "originalpngbuffer", "screenshotbase64", "screenshotdata"]);
function redactSensitiveText(value) {
  return value.replace(/Bearer\s+[A-Za-z0-9._~+/=-]+/gi, "Bearer [redacted]").replace(sensitiveTextPattern, "$1$2[redacted]").replace(/data:image\/[a-z0-9.+-]+;base64,[a-z0-9+/=]+/gi, "[redacted:image]");
}
function serializeError$1(error) {
  if (error instanceof Error) return {
    errorName: error.name || "Error",
    errorMessage: error.message,
    errorStack: error.stack || ""
  };
  return {
    errorName: "NonError",
    errorMessage: typeof error === "string" ? error : String(error),
    errorStack: ""
  };
}
function sanitizeLogValue(value, key = "", depth = 0) {
  if (sensitiveKeyPattern.test(key)) return redactedValue;
  if (imagePayloadKeys.has(key.toLowerCase())) return "[redacted:image]";
  if (value === null || value === undefined) return value;
  if (typeof value === "string") {
    if (value.startsWith("data:image/") || value.length > 2e4) return `[redacted:large-string length=${value.length}]`;
    const redacted = redactSensitiveText(value);
    return redacted.length > maxStringLength ? `${redacted.slice(0, maxStringLength)}... [truncated ${redacted.length}]` : redacted;
  }
  if (typeof value !== "object") return value;
  if (depth >= maxDepth) return "[truncated:max-depth]";
  if (Array.isArray(value)) return value.slice(0, maxArrayLength).map((item, index) => sanitizeLogValue(item, `${key}.${index}`, depth + 1));
  const output = {};
  for (const [entryKey, entryValue] of Object.entries(value)) output[entryKey] = sanitizeLogValue(entryValue, entryKey, depth + 1);
  return output;
}
function sanitizeRecord(value) {
  if (!value) return undefined;
  const sanitized = sanitizeLogValue(value);
  return sanitized && typeof sanitized === "object" && !Array.isArray(sanitized) ? sanitized : undefined;
}
function buildClientInfo() {
  const settings = settingsRepository.getSettings();
  const appVersion = app.getVersion();
  const osVersion = `${os.type()} ${os.release()}`;
  return {
    clientVersion: appVersion,
    appVersion,
    electronVersion: process.versions.electron,
    chromeVersion: process.versions.chrome,
    nodeVersion: process.versions.node,
    v8Version: process.versions.v8,
    platform: process.platform,
    arch: process.arch,
    osVersion,
    osPlatform: os.platform(),
    osRelease: os.release(),
    osType: os.type(),
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    locale: app.getLocale(),
    language: settings.language,
    deviceId: settings.deviceId || "",
    enableRecording: settings.enableRecording,
    autoStart: settings.autoStart,
    screenshotIntervalSeconds: settings.screenshotIntervalSeconds,
    autoPause: settings.autoPause,
    idleMinutes: settings.idleMinutes,
    aiMode: settings.aiMode,
    screenshotAiMode: settings.screenshotAiMode,
    reportAiMode: settings.reportAiMode,
    screenshotModelName: settings.screenshotModelName,
    localScreenshotModelName: settings.localScreenshotModelName,
    customScreenshotModelName: settings.customScreenshotModelName,
    enabledDisplayIds: settings.enabledDisplayIds,
    knownDisplayIds: settings.knownDisplayIds,
    enableEnterKeyListener: settings.enableEnterKeyListener,
    enableUserProfileInScreenshot: settings.enableUserProfileInScreenshot,
    screenshotHistoryCount: settings.screenshotHistoryCount
  };
}
async function logEmptyResponse(input) {
  try {
    const session = authRepository.getSession();
    if (!session?.token) return;
    const settings = settingsRepository.getSettings();
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), reportTimeoutMs);
    fetch(`${API_BASE$1}/log-empty-response.php`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-User-Token": session.token
      },
      body: JSON.stringify({
        eventType: input.eventType ?? "empty_response",
        type: input.type,
        requestPayload: sanitizeRecord(input.requestPayload),
        responseText: sanitizeLogValue(input.responseText),
        subscriptionStatus: sanitizeLogValue(input.subscriptionStatus),
        deviceId: settings.deviceId || "",
        errorName: input.errorName,
        errorMessage: sanitizeLogValue(input.errorMessage),
        errorStack: sanitizeLogValue(input.errorStack),
        clientInfo: sanitizeRecord(input.clientInfo),
        context: sanitizeRecord(input.context)
      }),
      signal: controller.signal
    }).catch(() => {}).finally(() => {
      clearTimeout(timeoutId);
    });
  } catch {}
}
async function logClientException(input) {
  const subscription = authRepository.getSubscriptionCache();
  const serialized = serializeError$1(input.error);
  await logEmptyResponse({
    type: input.type,
    eventType: "client_exception",
    requestPayload: input.requestPayload ?? {
      event: "client_exception",
      scope: input.type
    },
    responseText: serialized.errorMessage,
    subscriptionStatus: {
      isActive: subscription.isActive,
      planId: subscription.planId,
      expiresAt: subscription.expiresAt,
      planName: subscription.planName
    },
    timestamp: input.timestamp ?? (/* @__PURE__ */new Date()).toISOString(),
    ...serialized,
    clientInfo: buildClientInfo(),
    context: input.context
  });
}
//#endregion
//#region electron/services/api-exception-report.service.ts
var DEFAULT_DEDUPE_MS = 3e5;
var MAX_RESPONSE_PREVIEW = 500;
var recentReports = /* @__PURE__ */new Map();
var sensitiveQueryPattern = /(api[-_]?key|authorization|token|password|secret|credential|code|ticket)/i;
var imageKeyPattern = /(image|base64|dataurl|data_url|screenshot|pngbuffer)/i;
var rendererBodySummaryMarker = "__apiReportBodySummary";
function serializeError(input) {
  if (input.error instanceof Error) return {
    name: input.error.name || input.errorName || "Error",
    message: sanitizeText$1(input.error.message || input.errorMessage || "API request failed", 1e3),
    stack: sanitizeText$1(input.error.stack || input.errorStack || "", 4e3)
  };
  return {
    name: input.errorName || (input.httpStatus ? "ApiResponseError" : "ApiRequestError"),
    message: sanitizeText$1(input.errorMessage || input.businessMessage || (typeof input.error === "string" ? input.error : "API request failed"), 1e3),
    stack: sanitizeText$1(input.errorStack || "", 4e3)
  };
}
function safeUrl(urlText) {
  try {
    return new URL(urlText);
  } catch {
    return null;
  }
}
function summarizeQueryKeys(url) {
  return Array.from(new Set(Array.from(url.searchParams.keys()))).map(key => sensitiveQueryPattern.test(key) ? `${key}:[redacted]` : key);
}
function summarizeRequestBody(body) {
  if (body === undefined || body === null) return {};
  if (body && typeof body === "object" && !Array.isArray(body) && body[rendererBodySummaryMarker] === true) {
    const summary = body;
    return {
      requestBodyType: summary.requestBodyType,
      requestBodyKeys: summary.requestBodyKeys,
      requestBodySize: summary.requestBodySize
    };
  }
  if (typeof FormData !== "undefined" && body instanceof FormData) return {
    requestBodyType: "form-data",
    requestBodyKeys: Array.from(new Set(Array.from(body.keys()))).map(key => imageKeyPattern.test(key) || sensitiveQueryPattern.test(key) ? `${key}:[redacted]` : key)
  };
  if (typeof URLSearchParams !== "undefined" && body instanceof URLSearchParams) return {
    requestBodyType: "url-search-params",
    requestBodyKeys: Array.from(new Set(Array.from(body.keys()))).map(key => sensitiveQueryPattern.test(key) ? `${key}:[redacted]` : key)
  };
  if (typeof body === "string") {
    const result = {
      requestBodyType: "string",
      requestBodySize: body.length
    };
    try {
      const parsed = JSON.parse(body);
      if (parsed && typeof parsed === "object" && !Array.isArray(parsed)) result.requestBodyKeys = Object.keys(parsed).map(key => imageKeyPattern.test(key) || sensitiveQueryPattern.test(key) ? `${key}:[redacted]` : key);
    } catch {}
    return result;
  }
  if (body && typeof body === "object" && !Array.isArray(body)) return {
    requestBodyType: "object",
    requestBodyKeys: Object.keys(body).map(key => imageKeyPattern.test(key) || sensitiveQueryPattern.test(key) ? `${key}:[redacted]` : key)
  };
  if (Array.isArray(body)) return {
    requestBodyType: "array",
    requestBodySize: body.length
  };
  return {
    requestBodyType: typeof body
  };
}
function sanitizeText$1(text, limit = MAX_RESPONSE_PREVIEW) {
  if (!text) return "";
  return text.replace(/Bearer\s+[A-Za-z0-9._~+/=-]+/gi, "Bearer [redacted]").replace(/(authorization|token|password|secret|credential|api[-_]?key)["':=\s]+[^"',\s}]+/gi, "$1=[redacted]").replace(/data:image\/[a-z0-9.+-]+;base64,[a-z0-9+/=]+/gi, "[redacted:image]").replace(/\s+/g, " ").slice(0, limit);
}
function sanitizePreview(text) {
  return sanitizeText$1(text, MAX_RESPONSE_PREVIEW);
}
function shouldSkipUrl(urlText) {
  const url = safeUrl(urlText);
  if (!url) return false;
  return url.pathname.endsWith("/log-empty-response.php");
}
function shouldReport(fingerprint, dedupeMs) {
  const now = Date.now();
  if (now - (recentReports.get(fingerprint) ?? 0) < dedupeMs) return false;
  recentReports.set(fingerprint, now);
  if (recentReports.size > 200) {
    const cutoff = now - 36e5;
    for (const [key, value] of recentReports.entries()) if (value < cutoff) recentReports.delete(key);
  }
  return true;
}
function buildApiRequestSummary(input) {
  const url = safeUrl(input.url);
  const requestBodySummary = summarizeRequestBody(input.requestBody);
  return {
    source: input.source ?? "main",
    module: input.module,
    action: input.action,
    method: (input.method || "GET").toUpperCase(),
    urlHost: url?.host || "",
    urlPath: url?.pathname || input.url,
    queryKeys: url ? summarizeQueryKeys(url) : [],
    httpStatus: input.httpStatus,
    businessCode: input.businessCode,
    businessMessage: input.businessMessage,
    responsePreview: sanitizePreview(input.responseText || input.businessMessage || input.errorMessage),
    durationMs: input.durationMs,
    timeoutMs: input.timeoutMs,
    retryCount: input.retryCount,
    ...requestBodySummary
  };
}
async function reportApiRequestException(input) {
  try {
    if (!input.url || shouldSkipUrl(input.url)) return;
    const error = serializeError(input);
    const summary = buildApiRequestSummary(input);
    if (!shouldReport([summary.source, summary.module, summary.urlHost, summary.urlPath, summary.action, summary.httpStatus, input.businessCode, error.name, error.message].filter(Boolean).join("|"), input.dedupeMs ?? DEFAULT_DEDUPE_MS)) return;
    logClientException({
      type: "api_request",
      error: Object.assign(new Error(error.message), {
        name: error.name,
        stack: error.stack
      }),
      requestPayload: summary,
      context: {
        source: input.source ?? "main",
        module: input.module,
        action: input.action,
        ...input.context
      },
      timestamp: (/* @__PURE__ */new Date()).toISOString()
    }).catch(() => {});
  } catch {}
}
//#endregion
//#region electron/services/ai-model-config.service.ts
var API_BASE = "https://xiaoheiribao.com/api";
var AiModelConfigService = class {
  appStartAt = "";
  lastActivityAt = "";
  screenshotCount = 0;
  setAppStartAt(appValue) {
    this.appStartAt = appValue;
  }
  setLastActivityAt(last) {
    this.lastActivityAt = last;
  }
  incrementScreenshotCount() {
    this.screenshotCount++;
  }
  setScreenshotCount(screenshot) {
    this.screenshotCount = screenshot;
  }
  getCache() {
    this.ensureTable();
    const row = getDatabase().prepare("SELECT model_name, report_model_name, overview_model_name, overview_interval_min, provider, screenshot_provider, report_provider, overview_provider, region, fallback_model, fetched_at, expires_at FROM ai_model_config_cache WHERE id = 1").get();
    if (!row) return null;
    return {
      modelName: row.model_name,
      reportModelName: row.report_model_name ?? "",
      overviewModelName: row.overview_model_name ?? "",
      overviewIntervalMin: row.overview_interval_min ?? 180,
      provider: row.provider,
      screenshotProvider: row.screenshot_provider || row.provider || "volcengine",
      reportProvider: row.report_provider || row.provider || "volcengine",
      overviewProvider: row.overview_provider || row.provider || "volcengine",
      region: row.region,
      fallbackModel: row.fallback_model ?? "",
      fetchedAt: row.fetched_at,
      expiresAt: row.expires_at
    };
  }
  ensureTable() {
    getDatabase().exec(`
      CREATE TABLE IF NOT EXISTS ai_model_config_cache (
        id INTEGER PRIMARY KEY CHECK (id = 1),
        model_name TEXT NOT NULL,
        report_model_name TEXT,
        overview_model_name TEXT,
        overview_interval_min INTEGER NOT NULL DEFAULT 180,
        provider TEXT NOT NULL DEFAULT 'volcengine',
        region TEXT NOT NULL DEFAULT 'cn-north-1',
        fallback_model TEXT,
        fetched_at TEXT NOT NULL,
        expires_at TEXT NOT NULL
      )
    `);
    const columns = getDatabase().prepare("PRAGMA table_info(ai_model_config_cache)").all();
    const colSet = new Set(columns.map(item => item.name));
    if (!colSet.has("screenshot_provider")) getDatabase().exec(`ALTER TABLE ai_model_config_cache ADD COLUMN screenshot_provider TEXT DEFAULT NULL`);
    if (!colSet.has("report_provider")) getDatabase().exec(`ALTER TABLE ai_model_config_cache ADD COLUMN report_provider TEXT DEFAULT NULL`);
    if (!colSet.has("overview_provider")) getDatabase().exec(`ALTER TABLE ai_model_config_cache ADD COLUMN overview_provider TEXT DEFAULT NULL`);
    if (colSet.has("screenshot_subscribed")) getDatabase().exec(`ALTER TABLE ai_model_config_cache DROP COLUMN screenshot_subscribed`);
    if (colSet.has("report_subscribed")) getDatabase().exec(`ALTER TABLE ai_model_config_cache DROP COLUMN report_subscribed`);
    if (colSet.has("overview_subscribed")) getDatabase().exec(`ALTER TABLE ai_model_config_cache DROP COLUMN overview_subscribed`);
    if (colSet.has("screenshot_unsubscribed_model_name")) getDatabase().exec(`ALTER TABLE ai_model_config_cache DROP COLUMN screenshot_unsubscribed_model_name`);
    if (colSet.has("report_unsubscribed_model_name")) getDatabase().exec(`ALTER TABLE ai_model_config_cache DROP COLUMN report_unsubscribed_model_name`);
    if (colSet.has("overview_unsubscribed_model_name")) getDatabase().exec(`ALTER TABLE ai_model_config_cache DROP COLUMN overview_unsubscribed_model_name`);
  }
  saveCache(config) {
    this.ensureTable();
    getDatabase().prepare(`
        INSERT INTO ai_model_config_cache (
          id, model_name, report_model_name, overview_model_name, overview_interval_min,
          provider, screenshot_provider, report_provider, overview_provider,
          region, fallback_model, fetched_at, expires_at
        )
        VALUES (1, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        ON CONFLICT(id) DO UPDATE SET
          model_name = excluded.model_name,
          report_model_name = excluded.report_model_name,
          overview_model_name = excluded.overview_model_name,
          overview_interval_min = excluded.overview_interval_min,
          provider = excluded.provider,
          screenshot_provider = excluded.screenshot_provider,
          report_provider = excluded.report_provider,
          overview_provider = excluded.overview_provider,
          region = excluded.region,
          fallback_model = excluded.fallback_model,
          fetched_at = excluded.fetched_at,
          expires_at = excluded.expires_at
      `).run(config.modelName, config.reportModelName || null, config.overviewModelName || null, config.overviewIntervalMin, config.provider, config.screenshotProvider || null, config.reportProvider || null, config.overviewProvider || null, config.region, config.fallbackModel || null, config.fetchedAt, config.expiresAt);
  }
  clearCache() {
    getDatabase().prepare("DELETE FROM ai_model_config_cache WHERE id = 1").run();
  }
  buildRequestParams() {
    const settings = settingsRepository.getSettings();
    const session = authRepository.getSession();
    return {
      clientVersion: app.getVersion(),
      platform: process.platform,
      arch: process.arch,
      osVersion: `${os.platform()} ${os.release()}`,
      deviceId: settings.deviceId,
      userId: session ? String(session.userId) : "",
      userEmail: session ? session.email : "",
      timestamp: (/* @__PURE__ */new Date()).toISOString(),
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      language: settings.language || "zh-CN",
      appStartAt: this.appStartAt,
      lastActivityAt: this.lastActivityAt,
      screenshotCount: String(this.screenshotCount)
    };
  }
  async fetchModelConfig(force = false) {
    if (force) this.clearCache();
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5e3);
    const startedAt = Date.now();
    let url = "";
    let responseText = "";
    let httpStatus;
    let businessCode;
    let businessMessage;
    try {
      url = `${API_BASE}/ai-model-config.php?${new URLSearchParams(this.buildRequestParams()).toString()}`;
      const response = await fetch(url, {
        signal: controller.signal
      });
      httpStatus = response.status;
      responseText = await response.text();
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const json = JSON.parse(responseText);
      businessCode = json.error?.code;
      businessMessage = json.error?.message;
      if (!json.ok || !json.data) {
        const lang = settingsRepository.getSettings().language || "zh-CN";
        throw new Error(json.error?.message || t("aiModelConfig.serverError", lang));
      }
      const data = json.data;
      const cache = {
        modelName: data.modelName,
        reportModelName: data.reportModelName ?? "",
        overviewModelName: data.overviewModelName ?? "",
        overviewIntervalMin: data.overviewIntervalMin ?? 180,
        provider: data.provider,
        screenshotProvider: data.screenshotProvider || data.provider || "volcengine",
        reportProvider: data.reportProvider || data.provider || "volcengine",
        overviewProvider: data.overviewProvider || data.provider || "volcengine",
        region: data.region,
        fallbackModel: data.fallbackModel ?? "",
        fetchedAt: (/* @__PURE__ */new Date()).toISOString(),
        expiresAt: data.expiresAt
      };
      this.saveCache(cache);
      if (data.notice) console.log("[AiModelConfig] server notice:", data.notice);
      return cache;
    } catch (error) {
      await reportApiRequestException({
        source: "main",
        module: "ai-model-config",
        action: "fetch",
        method: "GET",
        url: url || `https://xiaoheiribao.com/api/ai-model-config.php`,
        error,
        httpStatus,
        businessCode,
        businessMessage,
        responseText,
        durationMs: Date.now() - startedAt,
        timeoutMs: 5e3,
        context: {
          force,
          aborted: controller.signal.aborted
        }
      });
      if (error instanceof Error && error.name === "AbortError") console.warn("[AiModelConfig] fetch timeout (5s), will fallback to cache or default model");else console.error("[AiModelConfig] fetch failed:", error);
      return null;
    } finally {
      clearTimeout(timeoutId);
    }
  }
  /**
  * 获取当前应使用的模型配置。
  * 优先使用本地缓存（未过期）；缓存不存在或已过期时向服务端拉取；
  * 拉取失败时返回过期缓存；无缓存时返回 null。
  */
  async getEffectiveModelConfig() {
    const cache = this.getCache();
    const now = /* @__PURE__ */new Date();
    if (cache) {
      if (now < new Date(cache.expiresAt)) return cache;
    }
    const fetched = await this.fetchModelConfig();
    if (fetched) return fetched;
    return cache;
  }
  /**
  * 用于自动暂停期间持续上报心跳。
  * 内部实际就是一次模型配置拉取，服务端会同时记录心跳。
  */
  async reportHeartbeat() {
    await this.fetchModelConfig();
  }
};
var aiModelConfigService = new AiModelConfigService();
//#endregion
//#region electron/services/app-config.service.ts
var AppConfigService = class {
  async requestConfig(key, language) {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5e3);
    const startedAt = Date.now();
    let url = "";
    let responseText = "";
    let httpStatus;
    let businessCode;
    let businessMessage;
    try {
      const lang = language || settingsRepository.getSettings().language || "zh-CN";
      url = `${API_BASE}/app-config.php?${new URLSearchParams({
        key,
        clientVersion: app.getVersion(),
        lang
      }).toString()}`;
      const response = await fetch(url, {
        signal: controller.signal
      });
      httpStatus = response.status;
      responseText = await response.text();
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const json = JSON.parse(responseText);
      businessCode = json.error?.code;
      businessMessage = json.error?.message;
      if (!json.ok || !json.data) {
        const lang = settingsRepository.getSettings().language || "zh-CN";
        throw new Error(json.error?.message || t("aiModelConfig.serverError", lang));
      }
      return json.data.value;
    } catch (error) {
      await reportApiRequestException({
        source: "main",
        module: "app-config",
        action: "get",
        method: "GET",
        url: url || `https://xiaoheiribao.com/api/app-config.php`,
        error,
        httpStatus,
        businessCode,
        businessMessage,
        responseText,
        durationMs: Date.now() - startedAt,
        timeoutMs: 5e3,
        context: {
          key,
          aborted: controller.signal.aborted
        }
      });
      if (error instanceof Error && error.name === "AbortError") console.warn("[AppConfig] fetch timeout (5s)");else console.error("[AppConfig] fetch failed:", error);
      return null;
    } finally {
      clearTimeout(timeoutId);
    }
  }
  /**
  * 获取指定 key 的云端配置值。优先使用本地缓存；缓存不存在或已过期时向服务端拉取。
  */
  async getConfigValue(key, language) {
    return this.requestConfig(key, language);
  }
  /**
  * 强制从云端刷新指定 key 的配置值。
  */
  async refreshConfigValue(key, language) {
    return this.requestConfig(key, language);
  }
};
var appConfigService = new AppConfigService();
//#endregion
//#region electron/services/pipeline-log.service.ts
/**
* 截图识别链路日志：拉取配置 → 截图 → 请求识别 → 本地入库 → 回传服务器。
* 默认关闭，由设置项 pipelineLogEnabled 控制；开启后每行一条 JSON 写入 userData/logs/pipeline.log。
* 日志不得影响主流程：所有写入失败一律静默。
*/
var PIPELINE_LOG_FILE = "pipeline.log";
var PIPELINE_LOG_MAX_BYTES = 10485760;
var PIPELINE_LOG_RETENTION_MS = 6048e5;
var MAX_STRING_LENGTH = 500;
var MAX_DEPTH = 5;
var SENSITIVE_KEY_PATTERN$1 = /api[-_]?key|token|authorization|secret|password|cookie/i;
var DATA_URL_PATTERN = /^data:[\w/+.-]+;base64,/i;
var runtimeRequire$1 = createRequire(import.meta.url);
function logsDirectory() {
  return path.join(app.getPath("userData"), "logs");
}
function maskSecret(value) {
  return value.length > 8 ? `***${value.slice(-4)}` : "***";
}
function sanitizeUrl(value) {
  try {
    const url = new URL(value);
    return `${url.protocol}//${url.host}${url.pathname}`;
  } catch {
    return value;
  }
}
function sanitizeString(value) {
  if (DATA_URL_PATTERN.test(value)) return `[image ${value.length} chars]`;
  const text = /^https?:\/\//i.test(value) ? sanitizeUrl(value) : value;
  return text.length > MAX_STRING_LENGTH ? `${text.slice(0, MAX_STRING_LENGTH)}…(${text.length})` : text;
}
function sanitizeValue(value, depth = 0) {
  if (value === null || value === undefined) return value;
  if (typeof value === "string") return sanitizeString(value);
  if (typeof value === "number" || typeof value === "boolean") return value;
  if (typeof value === "bigint") return value.toString();
  if (depth >= MAX_DEPTH) return "[depth limit]";
  if (Array.isArray(value)) return value.slice(0, 50).map(item => sanitizeValue(item, depth + 1));
  if (value instanceof Error) return describeError(value);
  if (typeof value === "object") {
    const result = {};
    for (const [key, item] of Object.entries(value)) {
      if (item === undefined || typeof item === "function") continue;
      if (SENSITIVE_KEY_PATTERN$1.test(key) && typeof item !== "number" && typeof item !== "boolean") {
        result[key] = typeof item === "string" ? maskSecret(item) : "***";
        continue;
      }
      result[key] = sanitizeValue(item, depth + 1);
    }
    return result;
  }
}
function describeError(error) {
  if (error instanceof Error) {
    const code = error.code;
    return {
      name: error.name,
      message: sanitizeString(error.message),
      ...(typeof code === "string" ? {
        code
      } : {})
    };
  }
  return {
    message: sanitizeString(String(error))
  };
}
var PipelineLogService = class {
  enabled = false;
  logger = null;
  initFailed = false;
  isEnabled() {
    return this.enabled;
  }
  /** 由设置服务在读取/更新设置时同步开关；关闭时不创建 logger，也不写任何文件。 */
  setEnabled(next) {
    if (this.enabled === next) return;
    this.enabled = next;
    if (next) this.ensureLogger();
  }
  newTrace(source) {
    const traceId = randomBytes(4).toString("hex");
    this.event(traceId, "round", "start", {
      source
    });
    return traceId;
  }
  event(traceId, stage, event, details = {}, level = "info") {
    if (!this.enabled) return;
    try {
      const logger = this.ensureLogger();
      if (!logger) return;
      const line = {
        ts: (/* @__PURE__ */new Date()).toISOString(),
        lvl: level,
        trace: traceId || "-",
        stage,
        event,
        ...sanitizeValue(details)
      };
      logger.info(JSON.stringify(line));
    } catch {}
  }
  span(traceId, stage, event, details = {}) {
    const startedAt = Date.now();
    this.event(traceId, stage, `${event}.start`, details);
    return {
      ok: (extra = {}) => this.event(traceId, stage, `${event}.done`, {
        ms: Date.now() - startedAt,
        ...extra
      }),
      fail: (error, extra = {}) => this.event(traceId, stage, `${event}.fail`, {
        ms: Date.now() - startedAt,
        error: describeError(error),
        ...extra
      }, "error")
    };
  }
  getLogDirectory() {
    return logsDirectory();
  }
  async openLogDirectory() {
    const dir = logsDirectory();
    await fs.promises.mkdir(dir, {
      recursive: true
    });
    const error = await shell.openPath(dir);
    if (error) throw new Error(error);
  }
  async clear() {
    const dir = logsDirectory();
    let names = [];
    try {
      names = await fs.promises.readdir(dir);
    } catch {
      return;
    }
    await Promise.all(names.filter(name => name.startsWith("pipeline") && name.endsWith(".log")).map(name => fs.promises.rm(path.join(dir, name), {
      force: true
    })));
  }
  ensureLogger() {
    if (this.logger) return this.logger;
    if (this.initFailed) return null;
    try {
      fs.mkdirSync(logsDirectory(), {
        recursive: true
      });
      const loadedModule = runtimeRequire$1("electron-log/main");
      const logger = (loadedModule.default ?? loadedModule).create({
        logId: "pipeline"
      });
      logger.transports.file.resolvePathFn = () => path.join(logsDirectory(), PIPELINE_LOG_FILE);
      logger.transports.file.level = "info";
      logger.transports.file.maxSize = PIPELINE_LOG_MAX_BYTES;
      logger.transports.file.format = "{text}";
      logger.transports.console.level = false;
      this.cleanupExpiredLogs();
      this.logger = logger;
      return logger;
    } catch (error) {
      this.initFailed = true;
      console.warn("[PipelineLog] 初始化失败，本次运行已关闭链路日志:", describeError(error));
      return null;
    }
  }
  cleanupExpiredLogs() {
    try {
      const dir = logsDirectory();
      const threshold = Date.now() - PIPELINE_LOG_RETENTION_MS;
      for (const name of fs.readdirSync(dir)) {
        if (!name.startsWith("pipeline") || !name.endsWith(".log")) continue;
        const filePath = path.join(dir, name);
        if (fs.statSync(filePath).mtimeMs < threshold) fs.rmSync(filePath, {
          force: true
        });
      }
    } catch {}
  }
};
var pipelineLog = new PipelineLogService();
//#endregion
//#region electron/services/windows-auto-start.service.ts
var WINDOWS_AUTO_START_TASK_NAME = "XiaoheiDailyAssistant AutoStart";
var HIGH_INTEGRITY_SID = "S-1-16-12288";
var ELEVATED_TASK_VERIFY_TIMEOUT_MS = 5e3;
var ELEVATED_TASK_VERIFY_INTERVAL_MS = 500;
function runCommand(command, args) {
  return new Promise(resolve => {
    let child;
    try {
      child = spawn(command, args, {
        windowsHide: true
      });
    } catch {
      resolve({
        code: -1,
        stdout: "",
        stderr: ""
      });
      return;
    }
    let stdout = "";
    let stderr = "";
    child.stdout?.on("data", chunk => {
      stdout += String(chunk);
    });
    child.stderr?.on("data", chunk => {
      stderr += String(chunk);
    });
    child.once("error", () => resolve({
      code: -1,
      stdout,
      stderr
    }));
    child.once("close", code => resolve({
      code: code ?? -1,
      stdout,
      stderr
    }));
  });
}
function delay$1(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
async function isProcessElevated() {
  const result = await runCommand("whoami.exe", ["/groups"]);
  return result.code === 0 && result.stdout.includes(HIGH_INTEGRITY_SID);
}
async function isExeFlaggedRunAsAdmin(exePath) {
  const layersKey = "Software\\Microsoft\\Windows NT\\CurrentVersion\\AppCompatFlags\\Layers";
  for (const hive of ["HKCU", "HKLM"]) {
    const result = await runCommand("reg.exe", ["query", `${hive}\\${layersKey}`]);
    if (result.code !== 0) continue;
    for (const line of result.stdout.split(/\r?\n/)) {
      const match = line.match(/^\s*(.+?)\s+REG_SZ\s+(.*)$/i);
      if (!match) continue;
      if (match[1].trim().toLowerCase() === exePath.toLowerCase() && /runasadmin/i.test(match[2])) return true;
    }
  }
  return false;
}
function taskRunAs() {
  const username = os.userInfo().username;
  const domain = process.env.USERDOMAIN;
  return domain ? `${domain}\\${username}` : username;
}
function schtasksCreateArgs(exePath, launchArg) {
  return ["/Create", "/TN", WINDOWS_AUTO_START_TASK_NAME, "/TR", `"${exePath}" ${launchArg}`, "/SC", "ONLOGON", "/RL", "HIGHEST", "/RU", taskRunAs(), "/IT", "/F"];
}
async function queryTaskExists() {
  return (await runCommand("schtasks.exe", ["/Query", "/TN", WINDOWS_AUTO_START_TASK_NAME])).code === 0;
}
async function createTaskElevated(args) {
  const helperPath = nativeActiveContextCollectorService.getHelperPath();
  if (!helperPath) return false;
  const schtasks = path.join(process.env.SystemRoot || "C:\\Windows", "System32", "schtasks.exe");
  const parameters = args.map(value => /\s/.test(value) ? `"${value.replace(/"/g, "\\\"")}"` : value).join(" ");
  const encode = value => Buffer.from(value, "utf8").toString("hex") || "-";
  const result = await runCommand(helperPath, ["--elevate", encode(schtasks), encode(parameters)]);
  try {
    if (JSON.parse(result.stdout.trim().split(/\r?\n/).at(-1) || "{}").ok !== true) return false;
  } catch {
    return false;
  }
  const deadline = Date.now() + ELEVATED_TASK_VERIFY_TIMEOUT_MS;
  while (Date.now() < deadline) {
    if (await queryTaskExists()) return true;
    await delay$1(ELEVATED_TASK_VERIFY_INTERVAL_MS);
  }
  return false;
}
var WindowsAutoStartService = class {
  /** 应用是否以管理员形态运行（当前进程已提权或 exe 被兼容模式标记）。 */
  async requiresElevation(exePath) {
    return (await isProcessElevated()) || (await isExeFlaggedRunAsAdmin(exePath));
  }
  /**
  * 通过任务计划程序注册「登录时以最高权限运行」任务。
  * Run 键启动项无法拉起需要 UAC 的程序，计划任务是官方支持的方式。
  */
  async register(exePath, launchArg) {
    const args = schtasksCreateArgs(exePath, launchArg);
    if ((await runCommand("schtasks.exe", args)).code === 0) return true;
    if (await isProcessElevated()) return false;
    return await createTaskElevated(args);
  }
  async remove() {
    await runCommand("schtasks.exe", ["/Delete", "/TN", WINDOWS_AUTO_START_TASK_NAME, "/F"]);
  }
};
var windowsAutoStartService = new WindowsAutoStartService();
//#endregion
//#region shared/constants/prompts.ts
var DEFAULT_SCREENSHOT_PROMPT_ZH = `根据当前电脑屏幕截图，记录此刻正在进行的工作活动。

核心目标：
1. 尽可能记录有日报价值的工作内容。
2. 保留工作主题、任务名称、项目方向、需求内容、技术问题、交付物、进展、待办。
3. 保护员工隐私：不记录私人聊天细节，不记录联系人身份，不记录账号、密钥、完整链接等敏感信息。
4. 不要因为隐私保护而把所有内容都写成空泛描述。只需要脱敏“身份信息”和“敏感字段”，工作任务本身要尽量保留。

优先级：
1. 隐私与敏感信息脱敏
2. 保留工作任务信息
3. 准确描述当前活动
4. 简洁输出

你应该记录什么：
1. 当前正在做的具体工作任务。
2. 当前正在阅读、编辑、核对、调试、整理、沟通的内容主题。
3. 当前任务属于哪个工作方向，例如：产品设计、代码开发、运营分析、数据复盘、客户支持、项目管理、日报整理、资料研究等。
4. 能用于日报的具体进展。
5. 如果是在聊天工具里处理工作，要提取“工作事项”和“任务含义”，但不要复述聊天原文。

你不应该记录什么：
1. 不要描述桌面壁纸、系统状态栏、时间、电量、天气、Dock、任务栏等无关信息。
2. 不要输出联系人昵称、群名、备注名、头像文字、账号名。
3. 不要逐字复述聊天消息。
4. 不要输出私人聊天细节。
5. 不要输出手机号、邮箱、身份证、银行卡、地址、验证码、密码、Token、API Key、Cookie。
6. 不要输出客户个人身份、员工个人身份、具体薪酬绩效、敏感财务明细。

关于聊天和沟通界面的处理：
如果截图中出现微信、飞书、钉钉、Slack、Telegram、邮件、私信、群聊、文件传输助手、评论区等沟通界面：

允许输出：
1. 沟通的工作主题。
2. 沟通涉及的任务方向。
3. 可识别出的工作需求、待办、结论、进展。
4. 文件或链接的大致用途。
5. 员工正在处理这些沟通信息的行为。

禁止输出：
1. 联系人是谁。
2. 群名是什么。
3. 对方原话是什么。
4. 聊天消息逐字内容。
5. 完整链接、账号、手机号、邮箱、订单号、密钥等。

示例：
如果截图里聊天内容是：
“做一个 ios 的原生 app 原型”
可以输出：
“正在整理或沟通 iOS 原生 App 原型设计相关任务。”

如果截图里聊天内容是：
“做海龟策略回测”
可以输出：
“正在处理量化交易策略回测相关任务。”

如果截图里聊天内容是：
“@某人: 某某仓库/web-design”
可以输出：
“正在通过沟通工具同步一个 Web 设计或前端页面相关的代码/设计任务。”
不要输出具体人员、账号、仓库完整名称。

如果截图里聊天内容是私人闲聊、家庭、朋友、情感、生活琐事：
只输出：
“当前包含私人沟通内容，具体内容已脱敏，不纳入日报。”

以下内容必须脱敏：
1. 具体人员身份。
2. 具体群名、客户名、公司内部名称。
3. 完整链接、账号、仓库完整路径。
4. 密钥、Token、验证码、密码。
5. 私人聊天原文。
6. 敏感业务数据明细。

输出要求：
1. 内容要对日报有用。
2. 允许保留工作任务细节。
3. 不要泄露个人身份和敏感字段。
4. 不要逐字复述聊天内容。
5. 不要输出无关桌面环境。
6. 不要编造截图中不存在的内容。
7. 如果隐私和工作记录冲突，优先保留“脱敏后的工作事项”，而不是完全隐藏。

请严格按照以上规则输出。`;
var DEFAULT_SCREENSHOT_PROMPT_EN = `Based on the current computer screen screenshot, record the work activity being performed at this moment.

Core Objectives:
1. Record as much work content as possible that is valuable for daily reports.
2. Preserve work themes, task names, project directions, requirements, technical issues, deliverables, progress, and to-dos.
3. Protect employee privacy: do not record private chat details, contact identities, accounts, passwords, complete links, or other sensitive information.
4. Do not write all content as vague descriptions due to privacy protection. Only anonymize "identity information" and "sensitive fields"; the work tasks themselves should be preserved as much as possible.

Priority:
1. Privacy and sensitive information anonymization
2. Preserve work task information
3. Accurately describe current activity
4. Concise output

What you should record:
1. The specific work task currently being performed.
2. The theme of the content currently being read, edited, reviewed, debugged, organized, or communicated.
3. Which work direction the current task belongs to, such as: product design, code development, operations analysis, data review, customer support, project management, daily report organization, research, etc.
4. Specific progress that can be used in daily reports.
5. If processing work in chat tools, extract "work items" and "task meanings", but do not repeat chat content verbatim.

What you should NOT record:
1. Do not describe desktop wallpapers, system status bars, time, battery, weather, Dock, taskbar, or other irrelevant information.
2. Do not output contact nicknames, group names, remarks, avatar text, or account names.
3. Do not repeat chat messages verbatim.
4. Do not output private chat details.
5. Do not output phone numbers, emails, IDs, bank cards, addresses, verification codes, passwords, Tokens, API Keys, or Cookies.
6. Do not output client personal identities, employee personal identities, specific salary or performance details, or sensitive financial details.

Handling chat and communication interfaces:
If the screenshot contains WeChat, Feishu, DingTalk, Slack, Telegram, email, private messages, group chats, file transfer assistants, comment sections, or other communication interfaces:

Allowed output:
1. The work topic of the communication.
2. The task direction involved in the communication.
3. Identifiable work requirements, to-dos, conclusions, and progress.
4. The general purpose of files or links.
5. The behavior of the employee processing these communication messages.

Prohibited output:
1. Who the contact is.
2. What the group name is.
3. What the other person's original words are.
4. Verbatim chat message content.
5. Complete links, accounts, phone numbers, emails, order numbers, keys, etc.

Examples:
If the chat content in the screenshot is:
"Make a native iOS app prototype"
Can output:
"Organizing or communicating tasks related to iOS native app prototype design."

If the chat content in the screenshot is:
"Do a turtle strategy backtest"
Can output:
"Processing tasks related to quantitative trading strategy backtesting."

If the chat content in the screenshot is:
"@someone: some-repo/web-design"
Can output:
"Synchronizing a Web design or front-end page related code/design task through communication tools."
Do not output specific personnel, accounts, or complete repository names.

If the chat content in the screenshot is private small talk, family, friends, emotions, or everyday personal matters:
Only output:
"Current content contains private communication, details have been anonymized and will not be included in the daily report."

The following content must be anonymized:
1. Specific personnel identities.
2. Specific group names, client names, or internal company names.
3. Complete links, accounts, or complete repository paths.
4. Keys, Tokens, verification codes, passwords.
5. Private chat original text.
6. Sensitive business data details.

Output Requirements:
1. Content should be useful for daily reports.
2. Work task details may be retained.
3. Do not leak personal identities and sensitive fields.
4. Do not repeat chat content verbatim.
5. Do not output irrelevant desktop environment information.
6. Do not fabricate content that does not exist in the screenshot.
7. If privacy and work recording conflict, prioritize retaining "anonymized work items" rather than completely hiding them.

Please strictly follow the above rules when outputting.`;
var DEFAULT_SCREENSHOT_PROMPT_STUDENT_ZH = `根据当前电脑屏幕截图，记录此刻正在进行的学习活动。

核心目标：
1. 尽可能记录有学习日志价值的内容：课程、作业、复习、刷题、阅读、论文、科研项目、社团和求职准备。
2. 保留课程名、章节/知识点、作业或题目主题、阅读材料主题、项目方向、进展、待办。
3. 保护隐私：不记录私人聊天细节，不记录联系人身份，不记录账号、密钥、完整链接等敏感信息。
4. 不要因为隐私保护而把所有内容都写成空泛描述。只需要脱敏“身份信息”和“敏感字段”，学习任务本身要尽量保留。

优先级：
1. 隐私与敏感信息脱敏
2. 保留学习任务信息
3. 准确描述当前活动
4. 简洁输出

你应该记录什么：
1. 当前正在学习或处理的具体内容：哪门课、哪个章节或知识点、什么作业或题目、读什么材料、做什么项目。
2. 当前活动属于哪类学习：上课/网课、写作业、复习备考、刷题、阅读文献、写论文、做实验或项目、社团活动、实习求职等。
3. 能用于学习日志的具体进展，例如完成了几道题、看到第几章、写到哪一部分。
4. 如果是在 B 站、YouTube、慕课、学习通、雨课堂等平台看课程或教程，记录为学习活动并写明主题，不要当作娱乐。
5. 如果是在聊天工具里讨论课程、小组作业或项目，要提取“学习事项”和“任务含义”，但不要复述聊天原文。

你不应该记录什么：
1. 不要描述桌面壁纸、系统状态栏、时间、电量、天气、Dock、任务栏等无关信息。
2. 不要输出联系人昵称、群名、备注名、头像文字、账号名。
3. 不要逐字复述聊天消息。
4. 不要输出私人聊天细节。
5. 不要输出手机号、邮箱、身份证、学号、银行卡、地址、验证码、密码、Token、API Key、Cookie。
6. 不要输出成绩单明细、他人个人身份等敏感信息。

关于聊天和沟通界面的处理：
如果截图中出现微信、QQ、飞书、钉钉、邮件、私信、群聊、评论区等沟通界面：

允许输出：
1. 沟通涉及的课程、作业或项目主题。
2. 可识别出的学习任务、截止安排、结论、进展。
3. 文件或链接的大致用途。

禁止输出：
1. 联系人是谁、群名是什么。
2. 对方原话或聊天消息逐字内容。
3. 完整链接、账号、手机号、邮箱、密钥等。

如果截图里是纯娱乐、刷视频、游戏、购物或私人闲聊：
只输出：
“当前为非学习内容，具体内容已脱敏，不纳入学习日志。”

输出要求：
1. 内容要对学习日志有用。
2. 允许保留学习任务细节。
3. 不要泄露个人身份和敏感字段。
4. 不要逐字复述聊天内容。
5. 不要输出无关桌面环境。
6. 不要编造截图中不存在的内容。
7. 如果隐私和学习记录冲突，优先保留“脱敏后的学习事项”，而不是完全隐藏。

请严格按照以上规则输出。`;
var DEFAULT_SCREENSHOT_PROMPT_STUDENT_EN = `Based on the current computer screen screenshot, record the study activity being performed at this moment.

Core Objectives:
1. Record content that is valuable for a study log: courses, assignments, revision, practice problems, reading, papers, research projects, club activities and job/internship preparation.
2. Preserve course names, chapters/topics, assignment or problem themes, reading material topics, project directions, progress and to-dos.
3. Protect privacy: do not record private chat details, contact identities, accounts, passwords, complete links or other sensitive information.
4. Do not turn everything into vague descriptions because of privacy protection. Only anonymize "identity information" and "sensitive fields"; the study task itself should be preserved as much as possible.

Priority:
1. Privacy and sensitive information anonymization
2. Preserve study task information
3. Accurately describe the current activity
4. Concise output

What you should record:
1. The specific content being studied or worked on: which course, which chapter or topic, which assignment or problem, what material is being read, what project is being done.
2. Which type of study activity it belongs to: lectures/online courses, homework, revision, practice problems, reading, paper writing, experiments or projects, club activities, internship or job hunting, etc.
3. Concrete progress usable in a study log, e.g. how many problems were solved, which chapter was reached, which section was written.
4. If watching courses or tutorials on Bilibili, YouTube, MOOC or similar platforms, record it as a study activity with its topic; do not treat it as entertainment.
5. If discussing courses, group assignments or projects in chat tools, extract the "study items" and "task meaning" without quoting the chat verbatim.

What you should NOT record:
1. Desktop wallpapers, system status bars, time, battery, weather, Dock, taskbar or other irrelevant information.
2. Contact nicknames, group names, remarks, avatar text or account names.
3. Verbatim chat messages or private chat details.
4. Phone numbers, emails, ID numbers, student IDs, bank cards, addresses, verification codes, passwords, tokens, API keys or cookies.
5. Grade sheets or other people's personal identities.

Handling chat and communication interfaces:
If the screenshot contains WeChat, QQ, Feishu, DingTalk, email, private messages, group chats or comment sections:

Allowed output:
1. The course, assignment or project topic being discussed.
2. Identifiable study tasks, deadlines, conclusions and progress.
3. The general purpose of files or links.

Prohibited output:
1. Who the contact is or what the group name is.
2. The other person's original words or verbatim messages.
3. Complete links, accounts, phone numbers, emails, keys, etc.

If the screenshot shows pure entertainment, short videos, games, shopping or private chatting:
Only output:
"Current content is not study-related; details have been anonymized and will not be included in the study log."

Output Requirements:
1. Content should be useful for a study log.
2. Study task details may be retained.
3. Do not leak personal identities or sensitive fields.
4. Do not quote chat content verbatim.
5. Do not output irrelevant desktop environment information.
6. Do not fabricate content that does not exist in the screenshot.
7. If privacy and study recording conflict, prioritize retaining "anonymized study items" rather than hiding them completely.

Please strictly follow the above rules when outputting.`;
/** mode 不传或为 work 时返回职场版，保持旧调用方行为不变 */
function getDefaultScreenshotPrompt(lang, mode) {
  const en = lang === "en-US";
  if (mode === "student") return en ? DEFAULT_SCREENSHOT_PROMPT_STUDENT_EN : DEFAULT_SCREENSHOT_PROMPT_STUDENT_ZH;
  return en ? DEFAULT_SCREENSHOT_PROMPT_EN : DEFAULT_SCREENSHOT_PROMPT_ZH;
}
//#endregion
//#region electron/services/settings.service.ts
var DOCK_HIDE_MIN_INTERVAL_MS = 1100;
var DOCK_STATE_SETTLE_MS = 100;
var AUTO_START_HIDDEN_ARG = "--xiaohei-auto-start-hidden";
function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
function generateStableDeviceId() {
  const interfaces = os.networkInterfaces();
  const macs = [];
  for (const ifaceList of Object.values(interfaces)) {
    if (!ifaceList) continue;
    for (const info of ifaceList) if (!info.internal && info.mac && info.mac !== "00:00:00:00:00:00") macs.push(info.mac);
  }
  if (macs.length > 0) {
    macs.sort();
    return `xda-${crypto.createHash("sha256").update(macs.join(",")).digest("hex").slice(0, 20)}`;
  }
  return crypto.randomUUID();
}
function cleanSettings(input) {
  const nextInput = {};
  for (const [key, value] of Object.entries(input)) {
    if (value === undefined) continue;
    nextInput[key] = typeof value === "string" ? value.trim() : value;
  }
  return nextInput;
}
var SettingsService = class {
  dockSyncQueue = Promise.resolve();
  dockSyncRequestId = 0;
  lastDockHideAt = 0;
  getSettings() {
    let settings = settingsRepository.getSettings();
    if (!settings.deviceId) settings = settingsRepository.updateSettings({
      deviceId: generateStableDeviceId()
    });
    if (app.isPackaged && settings.captureDebugSaveImages) settings = settingsRepository.updateSettings({
      captureDebugSaveImages: false
    });
    pipelineLog.setEnabled(settings.pipelineLogEnabled);
    if (!settings.screenshotPreservePath) settings = {
      ...settings,
      screenshotPreservePath: path.join(app.getPath("home"), "xiaohei-daily")
    };
    return settings;
  }
  updateSettings(input) {
    let mergedInput = cleanSettings(input);
    if (app.isPackaged && "captureDebugSaveImages" in mergedInput) mergedInput = {
      ...mergedInput,
      captureDebugSaveImages: false
    };
    let settings = settingsRepository.updateSettings(mergedInput);
    if (!settings.screenshotPreservePath) settings = {
      ...settings,
      screenshotPreservePath: path.join(app.getPath("home"), "xiaohei-daily")
    };
    pipelineLog.setEnabled(settings.pipelineLogEnabled);
    if (typeof input.autoStart === "boolean") this.syncAutoStart(settings);
    if (typeof input.showDockIcon === "boolean") this.syncDockIcon(settings);
    return settings;
  }
  async syncAutoStart(settings = this.getSettings()) {
    if (!app.isReady()) return;
    if (!app.isPackaged) {
      app.setLoginItemSettings({
        openAtLogin: false,
        ...(process.platform === "win32" ? {
          args: [AUTO_START_HIDDEN_ARG]
        } : {})
      });
      return;
    }
    if (process.platform === "win32") return await this.syncWindowsAutoStart(settings);
    app.setLoginItemSettings({
      openAtLogin: settings.autoStart,
      openAsHidden: true
    });
  }
  /**
  * Windows 自启动。Run 键登录项无法拉起需要 UAC 提权的程序（登录阶段无法弹窗，
  * 系统会静默跳过），因此当应用以管理员形态运行时改用「登录时以最高权限运行」
  * 的计划任务；普通形态仍走 Run 键。
  */
  async syncWindowsAutoStart(settings) {
    const loginItemArgs = {
      args: [AUTO_START_HIDDEN_ARG]
    };
    try {
      if (!settings.autoStart) {
        app.setLoginItemSettings({
          openAtLogin: false,
          ...loginItemArgs
        });
        await windowsAutoStartService.remove();
        return;
      }
      if (!(await windowsAutoStartService.requiresElevation(process.execPath))) {
        await windowsAutoStartService.remove();
        app.setLoginItemSettings({
          openAtLogin: true,
          ...loginItemArgs
        });
        return;
      }
      const registered = await windowsAutoStartService.register(process.execPath, AUTO_START_HIDDEN_ARG);
      if (!registered) console.warn("[SettingsService] elevated auto-start task registration failed, falling back to Run key");
      app.setLoginItemSettings({
        openAtLogin: !registered,
        ...loginItemArgs
      });
    } catch (error) {
      console.error("[SettingsService] syncAutoStart failed:", error);
      app.setLoginItemSettings({
        openAtLogin: settings.autoStart,
        ...loginItemArgs
      });
    }
  }
  syncDockIcon(settings = this.getSettings()) {
    if (process.platform !== "darwin" || !app.isReady() || !app.dock) return Promise.resolve();
    const shouldShow = settings.showDockIcon;
    const requestId = ++this.dockSyncRequestId;
    this.dockSyncQueue = this.dockSyncQueue.catch(() => undefined).then(async () => {
      if (requestId !== this.dockSyncRequestId) return;
      const dock = app.dock;
      if (!dock) return;
      if (shouldShow) await dock.show();else await this.hideDockIcon(dock, requestId);
    }).catch(error => {
      console.error("[SettingsService] syncDockIcon failed:", error);
    });
    return this.dockSyncQueue;
  }
  waitForDockSync() {
    return this.dockSyncQueue;
  }
  async hideDockIcon(dock, requestId) {
    for (let attempt = 0; attempt < 2; attempt += 1) {
      const waitMs = Math.max(0, this.lastDockHideAt + DOCK_HIDE_MIN_INTERVAL_MS - Date.now());
      if (waitMs > 0) await delay(waitMs);
      if (requestId !== this.dockSyncRequestId) return;
      dock.hide();
      this.lastDockHideAt = Date.now();
      await delay(DOCK_STATE_SETTLE_MS);
      if (requestId !== this.dockSyncRequestId || !dock.isVisible()) return;
    }
    console.warn("[SettingsService] Dock icon remained visible after hide retry");
  }
  /**
  * 应用启动时初始化默认值。
  * 如果本地 activeScreenshotPromptContent 为空，则用默认提示词初始化。
  */
  initPromptDefaults() {
    const settings = this.getSettings();
    if (settings.activeScreenshotPromptContent) return;
    const defaultPrompt = getDefaultScreenshotPrompt(settings.language || "zh-CN", settings.usageMode);
    settingsRepository.updateSettings({
      activeScreenshotPromptContent: defaultPrompt
    });
    console.log("[SettingsService] initialized activeScreenshotPromptContent with default prompt");
  }
  /**
  * 应用启动时初始化云端默认值（兼容老版本）。
  */
  async initCloudDefaults() {
    if (this.getSettings().screenshotPrompt) return;
    try {
      const cloudPrompt = await appConfigService.getConfigValue("screenshot_prompt");
      if (cloudPrompt) settingsRepository.updateSettings({
        screenshotPrompt: cloudPrompt
      });
    } catch (error) {
      console.error("[SettingsService] failed to init cloud defaults:", error);
    }
  }
};
var settingsService = new SettingsService();
//#endregion
//#region shared/utils/bot-telemetry.ts
var BOT_ERROR_CATEGORIES = ["none", "model_unconfigured", "credential_missing", "authentication", "insufficient_credits", "permission_denied", "rate_limit", "network", "timeout", "model_unavailable", "invalid_input", "storage", "user_cancelled", "process_interrupted", "empty_response", "unknown"];
function botErrorCategory(error) {
  const text = error instanceof Error ? error.message : typeof error === "string" ? error : "";
  if (/停止|取消|abort|cancel/i.test(text)) return "user_cancelled";
  if (/积分|余额|credits|balance|payment|402/i.test(text)) return "insufficient_credits";
  if (/未.*配置.*模型|没有配置模型|model.*not.*configured/i.test(text)) return "model_unconfigured";
  if (/凭据|尚未连接|api.?key.*missing|not connected|no credentials/i.test(text)) return "credential_missing";
  if (/401|unauthorized|authentication|登录|token.*expired|log ?in|sign ?in/i.test(text)) return "authentication";
  if (/403|permission|权限|EACCES/i.test(text)) return "permission_denied";
  if (/429|rate.?limit|限流/i.test(text)) return "rate_limit";
  if (/timeout|timed out|超时/i.test(text)) return "timeout";
  if (/fetch|network|ECONN|ENOTFOUND|网络/i.test(text)) return "network";
  if (/维护|不可用|not found|503|502|maintenance|unavailable/i.test(text)) return "model_unavailable";
  if (/附件|不能为空|不能超过|invalid|attachment|cannot be empty|cannot exceed/i.test(text)) return "invalid_input";
  if (/SQLITE|ENOSPC|磁盘|保存失败/i.test(text)) return "storage";
  if (/没有.*正文|空.*回复|empty response|no final answer/i.test(text)) return "empty_response";
  return "unknown";
}
function botModelSource(provider) {
  return !provider ? "unknown" : provider.isBuiltin ? "platform" : provider.kind === "pi-native" || provider.authType === "oauth" ? "connected_account" : "custom_api";
}
function botToolCategory(name) {
  if (["xiaohei_update_memory", "xiaohei_daily_overview", "xiaohei_timeline", "xiaohei_heat_map", "xiaohei_app_usage", "xiaohei_record_work"].includes(name)) return "work_memory";
  if (name === "xiaohei_reports" || name === "xiaohei_shared_reports") return "report_query";
  if (["read", "grep", "find", "ls"].includes(name)) return "file_read";
  if (["write", "edit"].includes(name)) return "file_write";
  if (["bash", "powershell"].includes(name)) return "command";
  if (name.startsWith("xiaohei_todo_")) return "todo";
  if (["xiaohei_list_schedules", "xiaohei_save_schedule", "xiaohei_delete_schedule"].includes(name)) return "schedule";
  if (name === "xiaohei_request_confirmation") return "confirmation";
  if (["xiaohei_consult_bot", "xiaohei_send_group_task", "xiaohei_handoff_members", "xiaohei_create_team", "xiaohei_resume_team"].includes(name)) return "collaboration";
  return "other";
}
var enums = {
  error_code: ["UNCLASSIFIED", "USER_ABORTED", "MODEL_UNCONFIGURED", "INSUFFICIENT_CREDITS", "PERMISSION_DENIED"],
  model_source: ["platform", "custom_api", "connected_account", "mixed", "unknown"],
  trigger_source: ["user_message", "scheduled_task", "bot_collaboration"],
  conversation_kind: ["direct", "group"],
  conversation_type: ["direct", "group"],
  status: ["success", "failed", "cancelled", "interrupted", "needs_confirmation", "no_reply"],
  error_category: BOT_ERROR_CATEGORIES,
  tool_category: ["work_memory", "report_query", "file_read", "file_write", "command", "todo", "schedule", "confirmation", "collaboration", "other"],
  permission_mode: ["default", "full"],
  previous_permission_mode: ["default", "full"],
  permission_scope: ["global", "bot"],
  role_source: ["builtin", "custom", "group"],
  validation_stage: ["local_config", "account_auth", "execution"],
  feedback: ["useful", "not_useful"],
  entry: ["sidebar", "desktop", "wechat", "conversation", "contact-panel", "settings", "schedule", "collaboration"],
  exposure_kind: ["live", "history"]
};
var ids = /* @__PURE__ */new Set(["task_id", "bot_request_id", "conversation_id", "bot_id", "run_id", "call_id", "tool_call_id", "parent_task_id", "config_attempt_id"]);
var numbers = /* @__PURE__ */new Set(["duration_ms", "queue_ms", "execution_ms", "total_ms", "participant_count", "measurement_version"]);
var booleans = /* @__PURE__ */new Set(["has_text", "has_attachment", "requires_confirmation", "handoff", "is_test", "accepted", "started"]);
function sanitizeBotTelemetry(input = {}) {
  const result = {};
  for (const [key, value] of Object.entries(input)) if (key === "execution_ms" && value === null) result[key] = null;else if (enums[key] && typeof value === "string" && enums[key].includes(value)) result[key] = value;else if (ids.has(key) && typeof value === "string" && /^[A-Za-z0-9_-]{1,160}$/.test(value)) result[key] = value;else if (numbers.has(key) && typeof value === "number" && Number.isFinite(value) && value >= 0) result[key] = Math.min(Math.round(value), 2592e6);else if (booleans.has(key) && typeof value === "boolean") result[key] = value;
  return result;
}
//#endregion
//#region shared/utils/report-time.ts
var DEFAULT_REPORT_START_TIME = "00:00";
var DEFAULT_REPORT_END_TIME = "23:59";
var DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/;
var DATE_TIME_PATTERN = /^\d{4}-\d{2}-\d{2} (?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d$/;
function combineReportDateTime(date, time, isEnd = false) {
  return `${date} ${time}:${isEnd ? "59" : "00"}`;
}
function normalizeReportDateTime(value, isEnd = false) {
  if (DATE_TIME_PATTERN.test(value)) return value;
  if (DATE_PATTERN.test(value)) return combineReportDateTime(value, isEnd ? DEFAULT_REPORT_END_TIME : DEFAULT_REPORT_START_TIME, isEnd);
  throw new Error("Invalid report date or time range");
}
function getReportDate(value) {
  return normalizeReportDateTime(value).slice(0, 10);
}
function createLocalDateTime(value, isEnd = false) {
  const [dateValue, timeValue] = normalizeReportDateTime(value, isEnd).split(" ");
  const [year, month, day] = dateValue.split("-").map(Number);
  const [hour, minute, second] = timeValue.split(":").map(Number);
  const date = new Date(year, month - 1, day, hour, minute, second);
  if (date.getFullYear() !== year || date.getMonth() !== month - 1 || date.getDate() !== day || date.getHours() !== hour || date.getMinutes() !== minute || date.getSeconds() !== second) throw new Error("Invalid report date or time range");
  return date;
}
function getReportDateTimeRange(input) {
  const start = createLocalDateTime(input.startDate);
  const end = createLocalDateTime(input.endDate, true);
  if (end.getTime() < start.getTime()) throw new Error("Invalid report date or time range");
  return {
    startedAt: start.toISOString(),
    endedAt: new Date(end.getTime() + 1e3).toISOString()
  };
}
function formatReportDateTime(value, isEnd = false) {
  return normalizeReportDateTime(value, isEnd).slice(0, 16);
}
//#endregion
//#region electron/repositories/report.repository.ts
function parseFactSummary(value) {
  if (!value) return null;
  try {
    const parsed = JSON.parse(value);
    return (parsed.version === 1 || parsed.version === 2) && parsed.range && parsed.workRecords && parsed.privacy ? parsed : null;
  } catch {
    return null;
  }
}
function parseSummarySources(value) {
  if (!value) return null;
  try {
    const parsed = JSON.parse(value);
    if (!Array.isArray(parsed)) return null;
    const sources = parsed.filter(item => Boolean(item) && typeof item === "object" && Number.isFinite(Number(item.docId)));
    return sources.length > 0 ? sources : null;
  } catch {
    return null;
  }
}
function serializeSummarySources(sources) {
  return sources && sources.length > 0 ? JSON.stringify(sources) : null;
}
function mapRow(row) {
  return {
    id: row.id,
    type: row.type,
    title: row.title,
    content: row.content,
    startDate: normalizeReportDateTime(row.start_date),
    endDate: normalizeReportDateTime(row.end_date, true),
    style: row.style,
    templateId: row.template_id,
    templateName: row.template_name,
    templateBody: row.template_body,
    customInstruction: row.custom_instruction,
    language: row.language,
    model: row.model,
    factSummary: parseFactSummary(row.fact_summary_json),
    summarySources: parseSummarySources(row.summary_sources),
    status: row.status,
    errorMessage: row.error_message,
    createdAt: row.created_at,
    updatedAt: row.updated_at
  };
}
function localDayIsoRange(dateStr) {
  const [year, month, day] = dateStr.split("-").map(Number);
  const start = new Date(year, month - 1, day);
  const end = new Date(year, month - 1, day + 1);
  return {
    start: start.toISOString(),
    end: end.toISOString()
  };
}
function buildWhereClause(input) {
  const conditions = [];
  const params = [];
  if (input.type && input.type !== "all") {
    conditions.push("type = ?");
    params.push(input.type);
  }
  if (input.query?.trim()) {
    conditions.push("(title LIKE ? OR content LIKE ?)");
    const pattern = `%${input.query.trim()}%`;
    params.push(pattern, pattern);
  }
  if (input.coveredDate) {
    const range = localDayIsoRange(input.coveredDate);
    conditions.push("((substr(start_date, 1, 10) <= ? AND substr(end_date, 1, 10) >= ?) OR (created_at >= ? AND created_at < ?))");
    params.push(input.coveredDate, input.coveredDate, range.start, range.end);
  } else if (input.startDate) {
    conditions.push("created_at >= ?");
    params.push(localDayIsoRange(input.startDate).start);
  }
  if (!input.coveredDate && input.endDate) {
    conditions.push("created_at < ?");
    params.push(localDayIsoRange(input.endDate).end);
  }
  return {
    where: conditions.length > 0 ? `WHERE ${conditions.join(" AND ")}` : "",
    params
  };
}
var ReportRepository = class {
  createPending(input, title, factSummary = null, summarySources = null) {
    const now = (/* @__PURE__ */new Date()).toISOString();
    const randomUUIDResult = crypto.randomUUID();
    getDatabase().prepare(`
        INSERT INTO reports (
          id, type, title, content, start_date, end_date, style,
          template_id, template_name, template_body, custom_instruction, language, model, fact_summary_json,
          summary_sources, status, error_message, created_at, updated_at
        )
        VALUES (?, ?, ?, '', ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'pending', NULL, ?, ?)
      `).run(randomUUIDResult, input.type, title, input.startDate, input.endDate, input.style, input.templateId ?? null, input.templateName ?? null, input.templateBody ?? "", input.customInstruction?.trim() || null, input.language ?? "zh-CN", input.model ?? null, factSummary ? JSON.stringify(factSummary) : null, serializeSummarySources(summarySources), now, now);
    return {
      id: randomUUIDResult,
      type: input.type,
      title,
      content: "",
      startDate: input.startDate,
      endDate: input.endDate,
      style: input.style,
      templateId: input.templateId ?? null,
      templateName: input.templateName ?? null,
      templateBody: input.templateBody ?? "",
      customInstruction: input.customInstruction?.trim() || null,
      language: input.language ?? "zh-CN",
      model: input.model ?? null,
      factSummary,
      summarySources: summarySources && summarySources.length > 0 ? summarySources : null,
      status: "pending",
      errorMessage: null,
      createdAt: now,
      updatedAt: now
    };
  }
  createCompleted(input, title, content, factSummary = null, summarySources = null) {
    const now = (/* @__PURE__ */new Date()).toISOString();
    const randomUUIDResult = crypto.randomUUID();
    getDatabase().prepare(`
        INSERT INTO reports (
          id, type, title, content, start_date, end_date, style,
          template_id, template_name, template_body, custom_instruction, language, model, fact_summary_json,
          summary_sources, status, error_message, created_at, updated_at
        )
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'completed', NULL, ?, ?)
      `).run(randomUUIDResult, input.type, title, content, input.startDate, input.endDate, input.style, input.templateId ?? null, input.templateName ?? null, input.templateBody ?? "", input.customInstruction?.trim() || null, input.language ?? "zh-CN", input.model ?? null, factSummary ? JSON.stringify(factSummary) : null, serializeSummarySources(summarySources), now, now);
    return {
      id: randomUUIDResult,
      type: input.type,
      title,
      content,
      startDate: input.startDate,
      endDate: input.endDate,
      style: input.style,
      templateId: input.templateId ?? null,
      templateName: input.templateName ?? null,
      templateBody: input.templateBody ?? "",
      customInstruction: input.customInstruction?.trim() || null,
      language: input.language ?? "zh-CN",
      model: input.model ?? null,
      factSummary,
      summarySources: summarySources && summarySources.length > 0 ? summarySources : null,
      status: "completed",
      errorMessage: null,
      createdAt: now,
      updatedAt: now
    };
  }
  updateStatus(statusValue, status, errorMessage = null) {
    const now = (/* @__PURE__ */new Date()).toISOString();
    getDatabase().prepare("UPDATE reports SET status = ?, error_message = ?, updated_at = ? WHERE id = ?").run(status, errorMessage, now, statusValue);
  }
  updateFactSummary(fact, factSummary) {
    getDatabase().prepare("UPDATE reports SET fact_summary_json = ? WHERE id = ?").run(JSON.stringify(factSummary), fact);
  }
  updateContent(contentValue, title, content) {
    const now = (/* @__PURE__ */new Date()).toISOString();
    getDatabase().prepare("UPDATE reports SET title = ?, content = ?, status = 'completed', error_message = NULL, updated_at = ? WHERE id = ?").run(title, content, now, contentValue);
  }
  updateTitle(titleValue, title) {
    const now = (/* @__PURE__ */new Date()).toISOString();
    getDatabase().prepare("UPDATE reports SET title = ?, updated_at = ? WHERE id = ?").run(title, now, titleValue);
  }
  findPending() {
    const row = getDatabase().prepare("SELECT * FROM reports WHERE status = 'pending' ORDER BY created_at ASC LIMIT 1").get();
    return row ? mapRow(row) : null;
  }
  resetStuckProcessing() {
    getDatabase().prepare("UPDATE reports SET status = 'pending', error_message = NULL WHERE status = 'processing'").run();
  }
  findById(id) {
    const row = getDatabase().prepare("SELECT * FROM reports WHERE id = ?").get(id);
    return row ? mapRow(row) : null;
  }
  list(input) {
    const limit = Math.min(Math.max(input.limit ?? 50, 1), 200);
    const offset = Math.max(input.offset ?? 0, 0);
    const {
      where,
      params
    } = buildWhereClause(input);
    const database = getDatabase();
    const rows = database.prepare(`
        SELECT *
        FROM reports
        ${where}
        ORDER BY created_at DESC
        LIMIT ? OFFSET ?
      `).all(...params, limit, offset);
    const totalRow = database.prepare(`SELECT COUNT(*) AS total FROM reports ${where}`).get(...params);
    return {
      reports: rows.map(mapRow),
      total: totalRow.total
    };
  }
  listByCoveredRange(input) {
    const limit = Math.min(Math.max(input.limit ?? 50, 1), 200);
    const offset = Math.max(input.offset ?? 0, 0);
    const conditions = ["substr(start_date, 1, 10) <= ?", "substr(end_date, 1, 10) >= ?"];
    const params = [input.endDate, input.startDate];
    if (input.type && input.type !== "all") {
      conditions.push("type = ?");
      params.push(input.type);
    }
    if (input.query?.trim()) {
      const pattern = `%${input.query.trim()}%`;
      conditions.push("(title LIKE ? OR content LIKE ?)");
      params.push(pattern, pattern);
    }
    const where = `WHERE ${conditions.join(" AND ")}`;
    const database = getDatabase();
    const rows = database.prepare(`
        SELECT *
        FROM reports
        ${where}
        ORDER BY created_at DESC, id DESC
        LIMIT ? OFFSET ?
      `).all(...params, limit, offset);
    const totalRow = database.prepare(`SELECT COUNT(*) AS total FROM reports ${where}`).get(...params);
    return {
      reports: rows.map(mapRow),
      total: totalRow.total
    };
  }
  listForDayUpload(dateStr, limit, includeLocalFacts) {
    const cappedLimit = Math.min(Math.max(limit, 1), 200);
    const range = localDayIsoRange(dateStr);
    return getDatabase().prepare(`
        SELECT *
        FROM reports
        WHERE status = 'completed'
          AND content <> ''
          ${includeLocalFacts ? "" : "AND COALESCE(model, '') <> 'local-facts'"}
          AND (
            (substr(start_date, 1, 10) <= ? AND substr(end_date, 1, 10) >= ?)
            OR (created_at >= ? AND created_at < ?)
          )
        ORDER BY created_at DESC
        LIMIT ?
      `).all(dateStr, dateStr, range.start, range.end, cappedLimit).map(mapRow);
  }
  /**
  * 是否已有同类型、同起止日期的报告（定时生成报告去重用）：失败的、本地事实报告、共享报告汇总不算。
  * startDate / endDate 取 YYYY-MM-DD 部分比较。
  */
  hasReportForDates(type, startDate, endDate) {
    const row = getDatabase().prepare(`
        SELECT 1 AS found
        FROM reports
        WHERE type = ?
          AND substr(start_date, 1, 10) = ?
          AND substr(end_date, 1, 10) = ?
          AND status <> 'failed'
          AND COALESCE(model, '') <> 'local-facts'
          AND summary_sources IS NULL
        LIMIT 1
      `).get(type, startDate.slice(0, 10), endDate.slice(0, 10));
    return Boolean(row);
  }
  listForScheduledUpload(dateStr, limit = 200) {
    return this.listForDayUpload(dateStr, limit, false);
  }
  listForMiniProgramSync(dateStr, limit = 200) {
    return this.listForDayUpload(dateStr, limit, true);
  }
  count() {
    return getDatabase().prepare("SELECT COUNT(*) AS total FROM reports").get()?.total ?? 0;
  }
  countQuotaEligible() {
    return getDatabase().prepare("SELECT COUNT(*) AS total FROM reports WHERE COALESCE(model, '') <> 'local-facts'").get()?.total ?? 0;
  }
  getEarliestCreatedAt() {
    return getDatabase().prepare("SELECT MIN(created_at) AS earliest FROM reports WHERE status = 'completed' AND content <> ''").get()?.earliest ?? null;
  }
  /** 指定时间之后被创建/修改过的报告的日期信息，用于增量重传涉及的日期 */
  listDatesUpdatedSince(sinceIso, limit = 200) {
    return getDatabase().prepare(`
        SELECT start_date, end_date, created_at
        FROM reports
        WHERE status = 'completed' AND content <> '' AND updated_at > ?
        LIMIT ?
      `).all(sinceIso, limit).map(row => ({
      startDate: getReportDate(row.start_date),
      endDate: getReportDate(row.end_date),
      createdAt: row.created_at
    }));
  }
  /** 旧版小程序同步遗漏的事实报告日期，供升级后的增量同步补传。 */
  listLocalFactDates() {
    return getDatabase().prepare("SELECT start_date, created_at FROM reports WHERE status = 'completed' AND content <> '' AND model = 'local-facts'").all().map(row => ({
      startDate: getReportDate(row.start_date),
      createdAt: row.created_at
    }));
  }
  delete(deleteValue) {
    return getDatabase().prepare("DELETE FROM reports WHERE id = ?").run(deleteValue).changes > 0;
  }
  hasSuccessfulReport() {
    return (getDatabase().prepare("SELECT COUNT(*) AS total FROM reports WHERE status = 'completed' AND trim(content) <> ''").get()?.total ?? 0) > 0;
  }
  hasProcessingReport() {
    return (getDatabase().prepare("SELECT COUNT(*) AS total FROM reports WHERE status IN ('pending', 'processing')").get()?.total ?? 0) > 0;
  }
  getLatestSuccessfulUpdatedAt() {
    return getDatabase().prepare("SELECT MAX(updated_at) AS latest FROM reports WHERE status = 'completed' AND trim(content) <> ''").get()?.latest ?? null;
  }
  hasSuccessfulReportWithinMinutes(minutes) {
    const since = (/* @__PURE__ */new Date(Date.now() - minutes * 60 * 1e3)).toISOString();
    return (getDatabase().prepare("SELECT COUNT(*) AS total FROM reports WHERE status = 'completed' AND trim(content) <> '' AND updated_at > ?").get(since)?.total ?? 0) > 0;
  }
};
var reportRepository = new ReportRepository();
//#endregion
//#region shared/notification-link.ts
/** 通知中心和原生通知共用的应用内定位链接。 */
var UPDATE_NOTIFICATION_LINK_PREFIX = "xiaohei://update/";
/** 月度工作卡提醒，路径是月份 YYYY-MM，点开后生成该月的分享卡。 */
var SHARE_CARD_MONTH_LINK_PREFIX = "xiaohei://share-card/month/";
function getNotificationTodoId(link) {
  if (!link) return null;
  try {
    const url = new URL(link);
    if (url.protocol !== "xiaohei:" || url.hostname !== "todo") return null;
    if (!/^\/[1-9]\d*$/.test(url.pathname)) return null;
    const id = Number(url.pathname.slice(1));
    return Number.isSafeInteger(id) ? id : null;
  } catch {
    return null;
  }
}
//#endregion
//#region electron/repositories/notification.repository.ts
function mapNotificationRow(row) {
  return {
    id: row.id,
    title: row.title,
    content: row.content,
    type: row.type,
    priority: row.priority,
    link: row.link,
    startAt: row.start_at,
    endAt: row.end_at,
    createdAt: row.created_at,
    fetchedAt: row.fetched_at
  };
}
function mapReadRow(row) {
  return {
    notificationId: row.notification_id,
    readAt: row.read_at,
    synced: row.synced
  };
}
function parseNotificationTime(value) {
  if (!value) return 0;
  const direct = Date.parse(value);
  if (Number.isFinite(direct)) return direct;
  const normalized = value.replace(" ", "T");
  const fallback = Date.parse(normalized);
  return Number.isFinite(fallback) ? fallback : 0;
}
function sortNotificationsDesc(items) {
  return [...items].sort((row, right) => {
    const aTime = parseNotificationTime(row.createdAt) || parseNotificationTime(row.startAt) || parseNotificationTime(row.fetchedAt);
    const bTime = parseNotificationTime(right.createdAt) || parseNotificationTime(right.startAt) || parseNotificationTime(right.fetchedAt);
    if (bTime !== aTime) return bTime - aTime;
    return right.id - row.id;
  });
}
var NotificationRepository = class {
  nextLocalNotificationId() {
    return (getDatabase().prepare("SELECT MIN(id) as min_id FROM notifications WHERE id < 0").get()?.min_id ?? 0) - 1;
  }
  /**
  * 全量同步：保存所有云端通知，并删除本地多余的记录
  */
  syncAll(notifications) {
    const database = getDatabase();
    const now = (/* @__PURE__ */new Date()).toISOString();
    database.exec("BEGIN");
    try {
      const saveStmt = database.prepare(`
        INSERT INTO notifications (id, title, content, type, priority, link, start_at, end_at, created_at, fetched_at)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        ON CONFLICT(id) DO UPDATE SET
          title = excluded.title,
          content = excluded.content,
          type = excluded.type,
          priority = excluded.priority,
          link = excluded.link,
          start_at = excluded.start_at,
          end_at = excluded.end_at,
          created_at = excluded.created_at,
          fetched_at = excluded.fetched_at
      `);
      for (const n of notifications) saveStmt.run(n.id, n.title, n.content, n.type, n.priority, n.link, n.start_at, n.end_at, n.created_at, now);
      if (notifications.length > 0) {
        const ids = notifications.map(item => item.id).join(",");
        database.prepare(`DELETE FROM notifications WHERE id > 0 AND id NOT IN (${ids})`).run();
      } else database.prepare("DELETE FROM notifications WHERE id > 0").run();
      database.exec("COMMIT");
    } catch (error) {
      database.exec("ROLLBACK");
      throw error;
    }
  }
  createLocalNotification(input) {
    const database = getDatabase();
    const now = (/* @__PURE__ */new Date()).toISOString();
    const nextLocalNotificationId = this.nextLocalNotificationId();
    const type = input.type ?? "system";
    const priority = input.priority ?? "normal";
    const link = input.link ?? null;
    database.prepare(`
      INSERT INTO notifications (id, title, content, type, priority, link, start_at, end_at, created_at, fetched_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, NULL, ?, ?)
    `).run(nextLocalNotificationId, input.title, input.content, type, priority, link, now, now, now);
    return {
      id: nextLocalNotificationId,
      title: input.title,
      content: input.content,
      type,
      priority,
      link,
      startAt: now,
      endAt: null,
      createdAt: now,
      fetchedAt: now,
      isRead: false,
      readAt: null
    };
  }
  hasLocalNotificationWithLink(link) {
    return Boolean(getDatabase().prepare("SELECT 1 FROM notifications WHERE id < 0 AND link = ? LIMIT 1").get(link));
  }
  expireLocalUpdateNotifications(activeLink) {
    return Number(getDatabase().prepare(`
      UPDATE notifications SET end_at = ?
      WHERE id < 0 AND type = 'update' AND link LIKE ? AND end_at IS NULL
        AND (? IS NULL OR link <> ?)
    `).run((/* @__PURE__ */new Date()).toISOString(), `${UPDATE_NOTIFICATION_LINK_PREFIX}%`, activeLink, activeLink).changes);
  }
  listNotifications() {
    const now = (/* @__PURE__ */new Date()).toISOString();
    return sortNotificationsDesc(getDatabase().prepare(`
        SELECT
          n.id, n.title, n.content, n.type, n.priority, n.link,
          n.start_at, n.end_at, n.created_at, n.fetched_at,
          CASE WHEN r.notification_id IS NOT NULL THEN 1 ELSE 0 END as is_read,
          r.read_at
        FROM notifications n
        LEFT JOIN notification_reads r ON n.id = r.notification_id
        WHERE n.start_at <= ? AND (n.end_at IS NULL OR n.end_at > ?)
        ORDER BY datetime(n.created_at) DESC, n.id DESC
      `).all(now, now).map(row => ({
      ...mapNotificationRow(row),
      isRead: row.is_read === 1,
      readAt: row.read_at
    })));
  }
  getUnreadCount() {
    const now = (/* @__PURE__ */new Date()).toISOString();
    return getDatabase().prepare(`
        SELECT COUNT(*) as cnt
        FROM notifications n
        LEFT JOIN notification_reads r ON n.id = r.notification_id
        WHERE n.start_at <= ? AND (n.end_at IS NULL OR n.end_at > ?)
        AND r.notification_id IS NULL
      `).get(now, now)?.cnt ?? 0;
  }
  markRead(notificationId) {
    const database = getDatabase();
    const now = (/* @__PURE__ */new Date()).toISOString();
    database.prepare(`
      INSERT INTO notification_reads (notification_id, read_at, synced)
      VALUES (?, ?, ?)
      ON CONFLICT(notification_id) DO UPDATE SET
        read_at = excluded.read_at,
        synced = excluded.synced
    `).run(notificationId, now, notificationId > 0 ? 0 : 1);
  }
  markAllRead() {
    const database = getDatabase();
    const now = (/* @__PURE__ */new Date()).toISOString();
    database.exec("BEGIN");
    try {
      const ids = database.prepare(`
        SELECT n.id
        FROM notifications n
        LEFT JOIN notification_reads r ON n.id = r.notification_id
        WHERE r.notification_id IS NULL
      `).all().map(item => item.id);
      const stmt = database.prepare(`
        INSERT INTO notification_reads (notification_id, read_at, synced)
        VALUES (?, ?, ?)
        ON CONFLICT(notification_id) DO UPDATE SET
          read_at = excluded.read_at,
          synced = excluded.synced
      `);
      for (const id of ids) stmt.run(id, now, id > 0 ? 0 : 1);
      database.exec("COMMIT");
      return ids;
    } catch (error) {
      database.exec("ROLLBACK");
      throw error;
    }
  }
  getUnsyncedReads() {
    return getDatabase().prepare("SELECT notification_id, read_at, synced FROM notification_reads WHERE synced = 0 AND notification_id > 0").all().map(mapReadRow);
  }
  markSynced(notificationIds) {
    const database = getDatabase();
    const stmt = database.prepare("UPDATE notification_reads SET synced = 1 WHERE notification_id = ?");
    database.exec("BEGIN");
    try {
      for (const id of notificationIds) stmt.run(id);
      database.exec("COMMIT");
    } catch (error) {
      database.exec("ROLLBACK");
      throw error;
    }
  }
  importCloudReads(reads) {
    const database = getDatabase();
    const stmt = database.prepare(`
      INSERT INTO notification_reads (notification_id, read_at, synced)
      VALUES (?, ?, 1)
      ON CONFLICT(notification_id) DO NOTHING
    `);
    database.exec("BEGIN");
    try {
      for (const replacedValue of reads) stmt.run(replacedValue.notification_id, replacedValue.read_at);
      database.exec("COMMIT");
    } catch (error) {
      database.exec("ROLLBACK");
      throw error;
    }
  }
  clearAll() {
    const database = getDatabase();
    database.exec("DELETE FROM notification_reads");
    database.exec("DELETE FROM notifications");
  }
};
var notificationRepository = new NotificationRepository();
//#endregion
//#region shared/utils/xiaohei-bot-identity.ts
var DEFAULT_XIAOHEI_BOT_ID = "xiaohei-assistant";
function isProtectedXiaoheiBot(botId) {
  return botId === DEFAULT_XIAOHEI_BOT_ID;
}
//#endregion
//#region node_modules/marked/lib/marked.esm.js
/**
* marked v18.0.13 - a markdown parser
* Copyright (c) 2018-2026, MarkedJS. (MIT License)
* Copyright (c) 2011-2018, Christopher Jeffrey. (MIT License)
* https://github.com/markedjs/marked
*/
/**
* DO NOT EDIT THIS FILE
* The code in this file is generated from files in ./src/
*/
function A() {
  return {
    async: false,
    breaks: false,
    extensions: null,
    gfm: true,
    hooks: null,
    pedantic: false,
    renderer: null,
    silent: false,
    tokenizer: null,
    walkTokens: null
  };
}
var T = A();
function U(l) {
  T = l;
}
var E = {
  exec: () => null
};
function I(fn) {
  let emptyItems = [];
  return t => {
    let n = Math.max(0, Math.min(3, t - 1)),
      i = emptyItems[n];
    return i || (i = fn(n), emptyItems[n] = i), i;
  };
}
function d(l, e = "") {
  let t = typeof l == "string" ? l : l.source,
    n = {
      replace: (i, r) => {
        let o = typeof r == "string" ? r : r.source;
        return o = o.replace(options.caret, "$1"), t = t.replace(i, o), n;
      },
      getRegex: () => new RegExp(t, e)
    };
  return n;
}
var we = ((l = "") => {
  try {
    return !!new RegExp("(?<=1)(?<!1)" + l);
  } catch {
    return false;
  }
})();
var options = {
  codeRemoveIndent: /^(?: {0,3}\t| {1,4})/gm,
  outputLinkReplace: /\\([\[\]])/g,
  indentCodeCompensation: /^(\s+)(?:```)/,
  beginningSpace: /^\s+/,
  endingHash: /#$/,
  startingSpaceChar: /^ /,
  endingSpaceChar: / $/,
  endingSpaceTabChar: /[ \t]$/,
  nonSpaceChar: /[^ ]/,
  newLineCharGlobal: /\n/g,
  tabCharGlobal: /\t/g,
  multipleSpaceGlobal: /\s+/g,
  blankLine: /^[ \t]*$/,
  doubleBlankLine: /\n[ \t]*\n[ \t]*$/,
  blockquoteStart: /^ {0,3}>/,
  blockquoteSetextReplace: /\n {0,3}((?:=+|-+) *)(?=\n|$)/g,
  blockquoteSetextReplace2: /^ {0,3}>[ \t]?/gm,
  listReplaceNesting: /^ {1,4}(?=( {4})*[^ ])/g,
  listIsTask: /^\[[ xX]\] +\S/,
  listReplaceTask: /^\[[ xX]\] +/,
  listTaskCheckbox: /\[[ xX]\]/,
  anyLine: /\n.*\n/,
  hrefBrackets: /^<(.*)>$/,
  tableDelimiter: /[:|]/,
  tableAlignChars: /^\||\| *$/g,
  tableRowBlankLine: /\n[ \t]*$/,
  tableAlignRight: /^ *-+: *$/,
  tableAlignCenter: /^ *:-+: *$/,
  tableAlignLeft: /^ *:-+ *$/,
  startATag: /^<a /i,
  endATag: /^<\/a>/i,
  startPreScriptTag: /^<(pre|code|kbd|script)(\s|>)/i,
  endPreScriptTag: /^<\/(pre|code|kbd|script)(\s|>)/i,
  startAngleBracket: /^</,
  endAngleBracket: />$/,
  pedanticHrefTitle: /^([^'"]*[^\s])\s+(['"])(.*)\2/,
  unicodeAlphaNumeric: /[\p{L}\p{N}]/u,
  escapeTest: /[&<>"']/,
  escapeReplace: /[&<>"']/g,
  escapeTestNoEncode: /[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/,
  escapeReplaceNoEncode: /[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/g,
  caret: /(^|[^\[])\^/g,
  percentDecode: /%25/g,
  findPipe: /\|/g,
  splitPipe: / \|/,
  slashPipe: /\\\|/g,
  carriageReturn: /\r\n|\r/g,
  spaceLine: /^ +$/gm,
  notSpaceStart: /^\S*/,
  endingNewline: /\n$/,
  listItemRegex: l => new RegExp(`^( {0,3}${l})((?:[	 ][^\\n]*)?(?:\\n|$))`),
  nextBulletRegex: I(l => new RegExp(`^ {0,${l}}(?:[*+-]|\\d{1,9}[.)])((?:[ 	][^\\n]*)?(?:\\n|$))`)),
  hrRegex: I(l => new RegExp(`^ {0,${l}}((?:-[ 	]*){3,}|(?:_[ 	]*){3,}|(?:\\*[ 	]*){3,})(?:\\n+|$)`)),
  fencesBeginRegex: I(l => new RegExp(`^ {0,${l}}(?:\`\`\`|~~~)`)),
  headingBeginRegex: I(l => new RegExp(`^ {0,${l}}#`)),
  htmlBeginRegex: I(l => new RegExp(`^ {0,${l}}(?:</?(?:${H})(?: +|$|/?>)|<(?:script|pre|style|textarea|!--))`, "i")),
  blockquoteBeginRegex: I(l => new RegExp(`^ {0,${l}}>`))
};
var ye = /^(?:[ \t]*(?:\n|$))+/;
var Pe = /^((?: {4}| {0,3}\t)[^\n]+(?:\n(?:[ \t]*(?:\n|$))*)?)+/;
var Se = /^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}\1[~`]* *(?=\n|$)|$)/;
var v = /^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/;
var _e = /^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/;
var K = / {0,3}(?:[*+-]|\d{1,9}[.)])/;
var le = /^(?!bull |blockCode|fences|blockquote|heading|html|table)((?:.|\n(?!\s*?\n|bull |blockCode|fences|blockquote|heading|html|table))+?)\n {0,3}(=+|-+) *(?:\n+|$)/;
var regex = d(le).replace(/bull/g, K).replace(/blockCode/g, /(?: {4}| {0,3}\t)/).replace(/fences/g, / {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g, / {0,3}>/).replace(/heading/g, / {0,3}#{1,6}(?:\s|$)/).replace(/html/g, / {0,3}<[^\n>]+>\n/).replace(/\|table/g, "").getRegex();
var $e = d(le).replace(/bull/g, K).replace(/blockCode/g, /(?: {4}| {0,3}\t)/).replace(/fences/g, / {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g, / {0,3}>/).replace(/heading/g, / {0,3}#{1,6}(?:\s|$)/).replace(/html/g, / {0,3}<[^\n>]+>\n/).replace(/table/g, / {0,3}\|?(?:[:\- ]*\|)+[\:\- ]*\n/).getRegex();
var W = /^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table|[ \t]+\n)[^\n]+)*)/;
var Le = /^[^\n]+/;
var X = /(?!\s*\])(?:\\[\s\S]|[^\[\]\\])+/;
var regexResult = d(/^ {0,3}\[(label)\]: *(?:\n[ \t]*)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n[ \t]*)?| *\n[ \t]*)(title))? *(?:\n+|$)/).replace("label", X).replace("title", /(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/).getRegex();
var Ee = d(/^(bull)([ \t][^\n]*?)?(?:\n|$)/).replace(/bull/g, K).getRegex();
var H = "address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|search|section|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul";
var J = /<!--(?:-?>|[\s\S]*?(?:-->|$))/;
var Me = d("^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n*|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>[^\\n]*\\n*|$)|<![A-Z][\\s\\S]*?(?:>[^\\n]*\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>[^\\n]*\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n[ \t]*)+\\n|$)|<(?!script|pre|style|textarea)([a-z][a-z0-9-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ \t]*)+\\n|$)|</(?!script|pre|style|textarea)[a-z][a-z0-9-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ \t]*)+\\n|$))", "i").replace("comment", J).replace("tag", H).replace("attribute", / +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex();
var handler = l => d(W).replace("hr", v).replace("heading", " {0,3}#{1,6}(?:\\s|$)").replace("|lheading", "").replace("|table", "").replace("blockquote", " {0,3}>").replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*(?:\\n|$))|~~~)[^\\n]*(?:\\n|$)").replace("list", l).replace("html", "</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag", H).getRegex();
var Ae = handler(/ {0,3}(?:[*+-]|1[.)])[ \t]+[^ \t\n]/);
var Ie = handler(/ {0,3}(?:[*+-]|\d{1,9}[.)])(?:[ \t]|\n|$)/);
var V = {
  blockquote: d(/^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/).replace("paragraph", Ie).getRegex(),
  code: Pe,
  def: regexResult,
  fences: Se,
  heading: _e,
  hr: v,
  html: Me,
  lheading: regex,
  list: Ee,
  newline: ye,
  paragraph: Ae,
  table: E,
  text: Le
};
var ie = d("^ *([^\\n ].*)\\n {0,3}((?:\\| *)?:?-+:? *(?:\\| *:?-+:? *)*(?:\\| *)?)(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)").replace("hr", v).replace("heading", " {0,3}#{1,6}(?:\\s|$)").replace("blockquote", " {0,3}>").replace("code", "(?: {4}| {0,3}\t)[^\\n]").replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*(?:\\n|$))|~~~)[^\\n]*(?:\\n|$)").replace("list", " {0,3}(?:[*+-]|1[.)])[ \\t]").replace("html", "</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag", H).getRegex();
var Be = {
  ...V,
  lheading: $e,
  table: ie,
  paragraph: d(W).replace("hr", v).replace("heading", " {0,3}#{1,6}(?:\\s|$)").replace("|lheading", "").replace("table", ie).replace("blockquote", " {0,3}>").replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*(?:\\n|$))|~~~)[^\\n]*(?:\\n|$)").replace("list", " {0,3}(?:[*+-]|1[.)])[ \\t]+[^ \\t\\n]").replace("html", "</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag", H).getRegex()
};
var De = {
  ...V,
  html: d(`^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:"[^"]*"|'[^']*'|\\s[^'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))`).replace("comment", J).replace(/tag/g, "(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(),
  def: /^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,
  heading: /^(#{1,6})(.*)(?:\n+|$)/,
  fences: E,
  lheading: /^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/,
  paragraph: d(W).replace("hr", v).replace("heading", ` *#{1,6} *[^
]`).replace("lheading", regex).replace("|table", "").replace("blockquote", " {0,3}>").replace("|fences", "").replace("|list", "").replace("|html", "").replace("|tag", "").getRegex()
};
var qe = /^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/;
var ve = /^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/;
var ce = /^( {2,}|\\)\n(?!\s*$)[ \t]*/;
var He = /^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/;
var _ = /[\p{P}\p{S}]/u;
var C = /[\s\p{P}\p{S}]/u;
var Z = /[^\s\p{P}\p{S}]/u;
var Ze = d(/^((?![*_])punctSpace)/, "u").replace(/punctSpace/g, C).getRegex();
var Ge = /[\p{Pi}\p{Ps}"']/u;
var he = /(?!~)[\p{P}\p{S}]/u;
var Qe = /(?!~)[\s\p{P}\p{S}]/u;
var Ne = /(?:[^\s\p{P}\p{S}]|~)/u;
var je = d(/link|precode-code|html/, "g").replace("link", /\[(?:[^\[\]`]|(?<a>`+)[^`]+\k<a>(?!`))*?\]\((?:\\[\s\S]|[^\\\(\)]|\((?:\\[\s\S]|[^\\\(\)])*\))*\)/).replace("precode-", we ? "(?<!`)()" : "(^^|[^`])").replace("code", /(?<b>`+)[^`]+\k<b>(?!`)/).replace("html", /<(?! )[^<>]*?>/).getRegex();
var de = /^(?:\*+(?:((?!\*)punct)|([^\s*]))?)|^_+(?:((?!_)punct)|([^\s_]))?/;
var Ue = d(de, "u").replace(/punct/g, _).getRegex();
var Fe = d(de, "u").replace(/punct/g, he).getRegex();
var We = d(/^(?:\*+(?:((?!\*)(?!openQuote)punct)|([^\s*]))?)|^_+(?:((?!_)(?!openQuote)punct)|([^\s_]))?/, "u").replace(/openQuote/g, Ge).replace(/punct/g, _).getRegex();
var ke = "^[^_*]*?__[^_*]*?\\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\\*)punct(\\*+)(?=[\\s]|$)|notPunctSpace(\\*+)(?!\\*)(?=punctSpace|$)|(?!\\*)punctSpace(\\*+)(?=notPunctSpace)|[\\s](\\*+)(?!\\*)(?=punct)|(?!\\*)punct(\\*+)(?!\\*)(?=punct)|notPunctSpace(\\*+)(?=notPunctSpace)";
var Xe = d(ke, "gu").replace(/notPunctSpace/g, Z).replace(/punctSpace/g, C).replace(/punct/g, _).getRegex();
var Je = d(ke, "gu").replace(/notPunctSpace/g, Ne).replace(/punctSpace/g, Qe).replace(/punct/g, he).getRegex();
var Ye = d("^[^_*]*?__[^_*]*?\\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\\*)punct(\\*+)(?=[\\s]|$)|notPunctSpace(\\*+)(?!\\*)(?=punctSpace|$)|(?!\\*)[\\s](\\*+)(?=notPunctSpace)|[\\s](\\*+)(?!\\*)(?=punct)|(?!\\*)punct(\\*+)(?!\\*)(?=punct)|(?:(?!\\*)punct|notPunctSpace)(\\*+)(?!\\*)(?=notPunctSpace)", "gu").replace(/notPunctSpace/g, Z).replace(/punctSpace/g, C).replace(/punct/g, _).getRegex();
var et = d("^[^_*]*?\\*\\*[^_*]*?_[^_*]*?(?=\\*\\*)|[^_]+(?=[^_])|(?!_)punct(_+)(?=[\\s]|$)|notPunctSpace(_+)(?!_)(?=punctSpace|$)|(?!_)punctSpace(_+)(?=notPunctSpace)|[\\s](_+)(?!_)(?=punct)|(?!_)punct(_+)(?!_)(?=punct)", "gu").replace(/notPunctSpace/g, Z).replace(/punctSpace/g, C).replace(/punct/g, _).getRegex();
var nt = d("^[^_*]*?\\*\\*[^_*]*?_[^_*]*?(?=\\*\\*)|[^_]+(?=[^_])|(?!_)punct(_+)(?=[\\s]|$)|notPunctSpace(_+)(?!_)(?=punctSpace|$)|(?!_)[\\s](_+)(?=notPunctSpace)|[\\s](_+)(?!_)(?=punct)|(?!_)punct(_+)(?!_)(?=punct)|(?:(?!_)punct|notPunctSpace)(_+)(?!_)(?=notPunctSpace)", "gu").replace(/notPunctSpace/g, Z).replace(/punctSpace/g, C).replace(/punct/g, _).getRegex();
var rt = d(/^~~?(?:((?!~)punct)|[^\s~])/, "u").replace(/punct/g, _).getRegex();
var it = d("^[^~]+(?=[^~])|(?!~)punct(~~?)(?=[\\s]|$)|notPunctSpace(~~?)(?!~)(?=punctSpace|$)|(?!~)punctSpace(~~?)(?=notPunctSpace)|[\\s](~~?)(?!~)(?=punct)|(?!~)punct(~~?)(?!~)(?=punct)|notPunctSpace(~~?)(?=notPunctSpace)", "gu").replace(/notPunctSpace/g, Z).replace(/punctSpace/g, C).replace(/punct/g, _).getRegex();
var ot = d(/\\(punct)/, "gu").replace(/punct/g, _).getRegex();
var at = d(/^<(scheme:[^\s\x00-\x1f<>]*|email)>/).replace("scheme", /[a-zA-Z][a-zA-Z0-9+.-]{1,31}/).replace("email", /[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/).getRegex();
var lt = d(J).replace("(?:-->|$)", "-->").getRegex();
var ut = d("^comment|^</[a-zA-Z][a-zA-Z0-9-]*\\s*>|^<[a-zA-Z][a-zA-Z0-9-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>").replace("comment", lt).replace("attribute", /\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/).getRegex();
var ge = /\[(?:\\[\s\S]|[^\[\]\\])*\]/;
var N = d(/(?:\[(?:brackets|\\[\s\S]|[^\[\]\\])*\]|\\[\s\S]|`+(?!`)[^`]*?`+(?!`)|``+(?=\])|[^\[\]\\`])*?/).replace("brackets", ge).getRegex();
var pt = d(/^!?\[(label)\]\(\s*(href)(?:(?:[ \t]+(?:\n[ \t]*)?|\n[ \t]*)(title))?\s*\)/).replace("label", N).replace("href", /<(?:\\.|[^\n<>\\])+>|[^ \t\n\x00-\x1f]+|(?=\))/).replace("title", /"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/).getRegex();
var ct = d(/^!?\[(label)\]\[(ref)\]/).replace("label", N).replace("ref", X).getRegex();
var ht = d(/^!?\[(ref)\](?:\[\])?/).replace("ref", X).getRegex();
var oe = /(?!\s*\])(?:\\[\s\S]|[^\[\]\\]){1,999}/;
var dt = d(/(?:[^\[\]\\`]*(?:\[(?:brackets|\\[\s\S]|[^\[\]\\])*\]|\\[\s\S]|`+(?!`)[^`]*?`+(?!`)|``+(?=\]))){0,999}?[^\[\]\\`]*?/).replace("brackets", ge).getRegex();
var kt = d("reflink|nolink(?!\\()", "g").replace("reflink", d(/^!?\[(label)\]\[(ref)\]/).replace("label", dt).replace("ref", oe).getRegex()).replace("nolink", d(/^!?\[(ref)\](?:\[\])?/).replace("ref", oe).getRegex()).getRegex();
var ae = /[hH][tT][tT][pP][sS]?|[fF][tT][pP]/;
var Y = {
  _backpedal: E,
  anyPunctuation: ot,
  autolink: at,
  blockSkip: je,
  br: ce,
  code: ve,
  del: E,
  delLDelim: E,
  delRDelim: E,
  emStrongLDelim: Ue,
  emStrongRDelimAst: Xe,
  emStrongRDelimUnd: et,
  escape: qe,
  link: pt,
  nolink: ht,
  punctuation: Ze,
  reflink: ct,
  reflinkSearch: kt,
  tag: ut,
  text: He,
  url: E
};
var gt = {
  ...Y,
  emStrongLDelim: We,
  emStrongRDelimAst: Ye,
  emStrongRDelimUnd: nt,
  link: d(/^!?\[(label)\]\((.*?)\)/).replace("label", N).getRegex(),
  reflink: d(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label", N).getRegex()
};
var request = {
  ...Y,
  emStrongRDelimAst: Je,
  emStrongLDelim: Fe,
  delLDelim: rt,
  delRDelim: it,
  url: d(/^((?:protocol):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/).replace("protocol", ae).replace("email", /[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![\w-])/).getRegex(),
  _backpedal: /(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/,
  del: /^(~~?)(?=[^\s~])((?:\\[\s\S]|[^\\])*?(?:\\[\s\S]|[^\s~\\]))\1(?=[^~]|$)/,
  text: d(/^(`+|~+|[^`~])(?:(?=[`~])|(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|protocol:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/).replace("protocol", ae).getRegex()
};
var ft = {
  ...request,
  br: d(ce).replace("{2,}", "*").getRegex(),
  text: d(request.text).replace("\\b_", "\\b_| {2,}\\n").replace(/\{2,\}/g, "*").getRegex()
};
var G = {
  normal: V,
  gfm: Be,
  pedantic: De
};
var B = {
  normal: Y,
  gfm: request,
  breaks: ft,
  pedantic: gt
};
var mt = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  "\"": "&quot;",
  "'": "&#39;"
};
var fe = l => mt[l];
function R(l, e) {
  if (e) {
    if (options.escapeTest.test(l)) return l.replace(options.escapeReplace, fe);
  } else if (options.escapeTestNoEncode.test(l)) return l.replace(options.escapeReplaceNoEncode, fe);
  return l;
}
function ee(l) {
  try {
    l = encodeURI(l).replace(options.percentDecode, "%");
  } catch {
    return null;
  }
  return l;
}
function te(l, e) {
  let parts = l.replace(options.findPipe, (r, o, s) => {
      let u = false,
        a = o;
      for (; --a >= 0 && s[a] === "\\";) u = !u;
      return u ? "|" : " |";
    }).split(options.splitPipe),
    i = 0;
  if (parts[0].trim() || parts.shift(), parts.length > 0 && !parts.at(-1)?.trim() && parts.pop(), e) if (parts.length > e) parts.splice(e);else for (; parts.length < e;) parts.push("");
  for (; i < parts.length; i++) parts[i] = parts[i].trim().replace(options.slashPipe, "|");
  return parts;
}
function $(items, e, t) {
  let n = items.length;
  if (n === 0) return "";
  let i = 0;
  for (; i < n;) {
    let r = items.charAt(n - i - 1);
    if (r === e && !t) i++;else if (r !== e && t) i++;else break;
  }
  return items.slice(0, n - i);
}
function ne(text) {
  let parts = text.split(`
`),
    t = parts.length - 1;
  for (; t >= 0 && options.blankLine.test(parts[t]);) t--;
  return parts.length - t <= 2 ? text : parts.slice(0, t + 1).join(`
`);
}
function D(text) {
  return text.toLowerCase().toUpperCase().toLowerCase();
}
function me(items, e) {
  if (items.indexOf(e[1]) === -1) return -1;
  let t = 0;
  for (let n = 0; n < items.length; n++) if (items[n] === "\\") n++;else if (items[n] === e[0]) t++;else if (items[n] === e[1] && (t--, t < 0)) return n;
  return t > 0 ? -2 : -1;
}
function xe(l, e = 0) {
  let t = e,
    n = "";
  for (let diff of l) if (diff === "\t") {
    let r = 4 - t % 4;
    n += " ".repeat(r), t += r;
  } else n += diff, t++;
  return n;
}
function be(l, e, t, n, i) {
  let href = e.href,
    fallbackValue = e.title || null,
    replaced = l[1].replace(i.other.outputLinkReplace, "$1"),
    u = l[0].charAt(0) === "!";
  n.state.inLink = true;
  let linkEmitted = n.state.linkEmitted,
    inRawBlock = n.state.inRawBlock;
  n.state.linkEmitted = false;
  let inlineTokens = n.inlineTokens(replaced),
    h = n.state.linkEmitted;
  if (n.state.linkEmitted = linkEmitted, n.state.inLink = false, !u) {
    if (h) {
      n.state.inRawBlock = inRawBlock;
      return;
    }
    n.state.linkEmitted = true;
  }
  return {
    type: u ? "image" : "link",
    raw: t,
    href: href,
    title: fallbackValue,
    text: replaced,
    tokens: inlineTokens
  };
}
function xt(l, text, t) {
  let n = l.match(t.other.indentCodeCompensation);
  if (n === null) return text;
  let i = n[1];
  return text.split(`
`).map(items => {
    let o = items.match(t.other.beginningSpace);
    if (o === null) return items;
    let [s] = o;
    return items.slice(Math.min(s.length, i.length));
  }).join(`
`);
}
function Re(items, e, t, n) {
  if (!e.includes("<")) return false;
  for (let i = 0; i < e.length; i++) {
    if (e[i] === "\\") {
      i++;
      continue;
    }
    if (e[i] === "`") {
      let s = n.inline.code.exec(e.slice(i));
      if (s) {
        i += s[0].length - 1;
        continue;
      }
    }
    if (e[i] !== "<") continue;
    let part = items.slice(t + i),
      fallbackValue = n.inline.tag.exec(part) || n.inline.autolink.exec(part);
    if (fallbackValue) {
      if (fallbackValue[0].length > e.length - i) return true;
      i += fallbackValue[0].length - 1;
    }
  }
  return false;
}
var y = class {
  options;
  rules;
  lexer;
  constructor(constructor) {
    this.options = constructor || T;
  }
  space(e) {
    let t = this.rules.block.newline.exec(e);
    if (t && t[0].length > 0) return {
      type: "space",
      raw: t[0]
    };
  }
  code(e) {
    let t = this.rules.block.code.exec(e);
    if (t) {
      let n = this.options.pedantic ? t[0] : ne(t[0]);
      return {
        type: "code",
        raw: n,
        codeBlockStyle: "indented",
        text: n.replace(this.rules.other.codeRemoveIndent, "")
      };
    }
  }
  fences(fences) {
    let t = this.rules.block.fences.exec(fences);
    if (t) {
      let n = t[0],
        i = xt(n, t[3] || "", this.rules);
      return {
        type: "code",
        raw: n,
        lang: t[2] ? t[2].trim().replace(this.rules.inline.anyPunctuation, "$1") : t[2],
        text: i
      };
    }
  }
  heading(heading) {
    let t = this.rules.block.heading.exec(heading);
    if (t) {
      let trimmed = t[2].trim();
      if (this.rules.other.endingHash.test(trimmed)) {
        let i = $(trimmed, "#");
        (this.options.pedantic || !i || this.rules.other.endingSpaceTabChar.test(i)) && (trimmed = i.trim());
      }
      return {
        type: "heading",
        raw: $(t[0], `
`),
        depth: t[1].length,
        text: trimmed,
        tokens: this.lexer.inline(trimmed)
      };
    }
  }
  hr(e) {
    let t = this.rules.block.hr.exec(e);
    if (t) return {
      type: "hr",
      raw: $(t[0], `
`)
    };
  }
  blockquote(blockquote) {
    let t = this.rules.block.blockquote.exec(blockquote);
    if (t) {
      let parts = $(t[0], `
`).split(`
`),
        i = "",
        r = "",
        emptyItems = [];
      for (; parts.length > 0;) {
        let s = false,
          length = [],
          a = 0;
        for (; a < parts.length; a++) if (this.rules.other.blockquoteStart.test(parts[a])) length.push(parts[a]), s = true;else if (!s) length.push(parts[a]);else break;
        parts = parts.slice(a);
        let joined = length.join(`
`),
          replaced = joined.replace(this.rules.other.blockquoteSetextReplace, `
    $1`).replace(this.rules.other.blockquoteSetextReplace2, "");
        i = i ? `${i}
${joined}` : joined, r = r ? `${r}
${replaced}` : replaced;
        let h = this.lexer.state.top;
        if (this.lexer.state.top = true, this.lexer.blockTokens(replaced, emptyItems, true), this.lexer.state.top = h, parts.length === 0) break;
        let k = emptyItems.at(-1);
        if (k?.type === "code") break;
        if (k?.type === "blockquote") {
          let O = k,
            g = parts.join(`
`),
            w = O.raw + `
` + g.replace(this.rules.other.blockquoteSetextReplace2, ""),
            blockquoteResult = this.blockquote(w);
          emptyItems[emptyItems.length - 1] = blockquoteResult, i = `${i}
${g}`, r = r.substring(0, r.length - O.text.length) + blockquoteResult.text;
          break;
        } else if (k?.type === "list") {
          let O = k,
            g = O.raw + `
` + parts.join(`
`),
            w = this.list(g);
          emptyItems[emptyItems.length - 1] = w, i = i.substring(0, i.length - k.raw.length) + w.raw, r = r.substring(0, r.length - O.raw.length) + w.raw, parts = g.substring(emptyItems.at(-1).raw.length).split(`
`);
          continue;
        }
      }
      return {
        type: "blockquote",
        raw: i,
        tokens: emptyItems,
        text: r
      };
    }
  }
  list(text) {
    let t = this.rules.block.list.exec(text);
    if (t) {
      let trimmed = t[1].trim(),
        i = trimmed.length > 1,
        r = {
          type: "list",
          raw: "",
          ordered: i,
          start: i ? +trimmed.slice(0, -1) : "",
          loose: false,
          items: []
        };
      trimmed = i ? `\\d{1,9}\\${trimmed.slice(-1)}` : `\\${trimmed}`, this.options.pedantic && (trimmed = i ? trimmed : "[*+-]");
      let itemRegex = this.rules.other.listItemRegex(trimmed),
        s = false;
      for (; text;) {
        let a = false,
          p = "",
          c = "";
        if (!(t = itemRegex.exec(text)) || this.rules.block.hr.test(text)) break;
        p = t[0], text = text.substring(p.length);
        let h = xe(t[2].split(`
`, 1)[0], t[1].length),
          k = text.split(`
`, 1)[0],
          O = !h.trim(),
          g = 0;
        if (this.options.pedantic ? (g = 2, c = h.trimStart()) : O ? g = t[1].length + 1 : (g = h.search(this.rules.other.nonSpaceChar), g = g > 4 ? 1 : g, c = h.slice(g), g += t[1].length), O && this.rules.other.blankLine.test(k) && (p += k + `
`, text = text.substring(k.length + 1), a = true), !a) {
          let nextBulletRegex = this.rules.other.nextBulletRegex(g),
            z = this.rules.other.hrRegex(g),
            fencesBeginRegex = this.rules.other.fencesBeginRegex(g),
            headingBeginRegex = this.rules.other.headingBeginRegex(g),
            Te = this.rules.other.htmlBeginRegex(g),
            Oe = this.rules.other.blockquoteBeginRegex(g);
          for (; text;) {
            let j = text.split(`
`, 1)[0],
              q;
            if (k = j, this.options.pedantic ? (k = k.replace(this.rules.other.listReplaceNesting, "  "), q = k) : q = k.replace(this.rules.other.tabCharGlobal, "    "), fencesBeginRegex.test(k) || headingBeginRegex.test(k) || Te.test(k) || Oe.test(k) || nextBulletRegex.test(k) || z.test(k)) break;
            if (q.search(this.rules.other.nonSpaceChar) >= g || !k.trim()) c += `
` + q.slice(g);else {
              if (O || h.replace(this.rules.other.tabCharGlobal, "    ").search(this.rules.other.nonSpaceChar) >= 4 || fencesBeginRegex.test(h) || headingBeginRegex.test(h) || z.test(h)) break;
              c += `
` + k;
            }
            O = !k.trim(), p += j + `
`, text = text.substring(j.length + 1), h = q.slice(g);
          }
        }
        r.loose || (s ? r.loose = true : this.rules.other.doubleBlankLine.test(p) && (s = true)), r.items.push({
          type: "list_item",
          raw: p,
          task: !!this.options.gfm && this.rules.other.listIsTask.test(c),
          loose: false,
          text: c,
          tokens: []
        }), r.raw += p;
      }
      let u = r.items.at(-1);
      if (u) u.raw = u.raw.trimEnd(), u.text = u.text.trimEnd();else return;
      r.raw = r.raw.trimEnd();
      for (let flag of r.items) if (this.lexer.state.top = false, flag.tokens = this.lexer.blockTokens(flag.text, []), !r.loose) {
        let filtered = flag.tokens.filter(item => item.type === "space");
        r.loose = filtered.length > 0 && filtered.some(item => this.rules.other.anyLine.test(item.raw));
      }
      for (let flag of r.items) {
        let p = flag.tokens[0];
        if (flag.task && (p?.type === "text" || p?.type === "paragraph")) {
          flag.text = flag.text.replace(this.rules.other.listReplaceTask, ""), p.raw = p.raw.replace(this.rules.other.listReplaceTask, ""), p.text = p.text.replace(this.rules.other.listReplaceTask, "");
          for (let h = this.lexer.inlineQueue.length - 1; h >= 0; h--) if (this.rules.other.listIsTask.test(this.lexer.inlineQueue[h].src)) {
            this.lexer.inlineQueue[h].src = this.lexer.inlineQueue[h].src.replace(this.rules.other.listReplaceTask, "");
            break;
          }
          let c = this.rules.other.listTaskCheckbox.exec(flag.raw);
          if (c) {
            let h = {
              type: "checkbox",
              raw: c[0] + " ",
              checked: c[0] !== "[ ]"
            };
            flag.checked = h.checked, r.loose ? flag.tokens[0] && ["paragraph", "text"].includes(flag.tokens[0].type) && "tokens" in flag.tokens[0] && flag.tokens[0].tokens ? (flag.tokens[0].raw = h.raw + flag.tokens[0].raw, flag.tokens[0].text = h.raw + flag.tokens[0].text, flag.tokens[0].tokens.unshift(h)) : flag.tokens.unshift({
              type: "paragraph",
              raw: h.raw,
              text: h.raw,
              tokens: [h]
            }) : flag.tokens.unshift(h);
          }
        } else flag.task && (flag.task = false);
      }
      if (r.loose) for (let flag of r.items) {
        flag.loose = true;
        for (let total of flag.tokens) total.type === "text" && (total.type = "paragraph");
      }
      return r;
    }
  }
  html(e) {
    let t = this.rules.block.html.exec(e);
    if (t) {
      let n = ne(t[0]);
      return {
        type: "html",
        block: true,
        raw: n,
        pre: t[1] === "pre" || t[1] === "script" || t[1] === "style",
        text: n
      };
    }
  }
  def(e) {
    let t = this.rules.block.def.exec(e);
    if (t) {
      let replaced = D(t[1]).replace(this.rules.other.multipleSpaceGlobal, " "),
        i = t[2] ? t[2].replace(this.rules.other.hrefBrackets, "$1").replace(this.rules.inline.anyPunctuation, "$1") : "",
        r = t[3] ? t[3].substring(1, t[3].length - 1).replace(this.rules.inline.anyPunctuation, "$1") : t[3];
      return {
        type: "def",
        tag: replaced,
        raw: $(t[0], `
`),
        href: i,
        title: r
      };
    }
  }
  table(e) {
    let t = this.rules.block.table.exec(e);
    if (!t || !this.rules.other.tableDelimiter.test(t[2])) return;
    let n = te(t[1]),
      parts = t[2].replace(this.rules.other.tableAlignChars, "").split("|"),
      r = t[3]?.trim() ? t[3].replace(this.rules.other.tableRowBlankLine, "").split(`
`) : [],
      o = {
        type: "table",
        raw: $(t[0], `
`),
        header: [],
        align: [],
        rows: []
      };
    if (n.length === parts.length) {
      for (let flag of parts) this.rules.other.tableAlignRight.test(flag) ? o.align.push("right") : this.rules.other.tableAlignCenter.test(flag) ? o.align.push("center") : this.rules.other.tableAlignLeft.test(flag) ? o.align.push("left") : o.align.push(null);
      for (let s = 0; s < n.length; s++) o.header.push({
        text: n[s],
        tokens: this.lexer.inline(n[s]),
        header: true,
        align: o.align[s]
      });
      for (let flag of r) o.rows.push(te(flag, o.header.length).map((item, a) => ({
        text: item,
        tokens: this.lexer.inline(item),
        header: false,
        align: o.align[a]
      })));
      return o;
    }
  }
  lheading(lheading) {
    let t = this.rules.block.lheading.exec(lheading);
    if (t) {
      let trimmed = t[1].trim();
      return {
        type: "heading",
        raw: $(t[0], `
`),
        depth: t[2].charAt(0) === "=" ? 1 : 2,
        text: trimmed,
        tokens: this.lexer.inline(trimmed)
      };
    }
  }
  paragraph(paragraph) {
    let t = this.rules.block.paragraph.exec(paragraph);
    if (t) {
      let n = t[1].charAt(t[1].length - 1) === `
` ? t[1].slice(0, -1) : t[1];
      return {
        type: "paragraph",
        raw: t[0],
        text: n,
        tokens: this.lexer.inline(n)
      };
    }
  }
  text(e) {
    let t = this.rules.block.text.exec(e);
    if (t) return {
      type: "text",
      raw: t[0],
      text: t[0],
      tokens: this.lexer.inline(t[0])
    };
  }
  escape(escapeValue) {
    let t = this.rules.inline.escape.exec(escapeValue);
    if (t) return {
      type: "escape",
      raw: t[0],
      text: t[1]
    };
  }
  tag(e) {
    let t = this.rules.inline.tag.exec(e);
    if (t) return !this.lexer.state.inLink && this.rules.other.startATag.test(t[0]) ? this.lexer.state.inLink = true : this.lexer.state.inLink && this.rules.other.endATag.test(t[0]) && (this.lexer.state.inLink = false), !this.lexer.state.inRawBlock && this.rules.other.startPreScriptTag.test(t[0]) ? this.lexer.state.inRawBlock = true : this.lexer.state.inRawBlock && this.rules.other.endPreScriptTag.test(t[0]) && (this.lexer.state.inRawBlock = false), {
      type: "html",
      raw: t[0],
      inLink: this.lexer.state.inLink,
      inRawBlock: this.lexer.state.inRawBlock,
      block: false,
      text: t[0]
    };
  }
  link(e) {
    let t = this.rules.inline.link.exec(e);
    if (t) {
      let n = t[0].charAt(0) === "!" ? 2 : 1;
      if (!this.options.pedantic && Re(e, t[1], n, this.rules)) return;
      let trimmed = t[2].trim();
      if (!this.options.pedantic && this.rules.other.startAngleBracket.test(trimmed)) {
        if (!this.rules.other.endAngleBracket.test(trimmed)) return;
        let s = $(trimmed.slice(0, -1), "\\");
        if ((trimmed.length - s.length) % 2 === 0) return;
      } else {
        let s = me(t[2], "()");
        if (s === -2) return;
        if (s > -1) {
          let a = (t[0].indexOf("!") === 0 ? 5 : 4) + t[1].length + s;
          t[2] = t[2].substring(0, s), t[0] = t[0].substring(0, a).trim(), t[3] = "";
        }
      }
      let r = t[2],
        o = "";
      if (this.options.pedantic) {
        let s = this.rules.other.pedanticHrefTitle.exec(r);
        s && (r = s[1], o = s[3]);
      } else o = t[3] ? t[3].slice(1, -1) : "";
      return r = r.trim(), this.rules.other.startAngleBracket.test(r) && (this.options.pedantic && !this.rules.other.endAngleBracket.test(trimmed) ? r = r.slice(1) : r = r.slice(1, -1)), be(t, {
        href: r && r.replace(this.rules.inline.anyPunctuation, "$1"),
        title: o && o.replace(this.rules.inline.anyPunctuation, "$1")
      }, t[0], this.lexer, this.rules);
    }
  }
  reflink(reflink, reflinkValue) {
    let n;
    if ((n = this.rules.inline.reflink.exec(reflink)) || (n = this.rules.inline.nolink.exec(reflink))) {
      let i = n[0].charAt(0) === "!" ? 2 : 1;
      if (!this.options.pedantic && Re(reflink, n[1], i, this.rules)) return;
      let o = reflinkValue[D((n[2] || n[1]).replace(this.rules.other.multipleSpaceGlobal, " "))];
      if (!o) {
        let s = n[0].charAt(0);
        return {
          type: "text",
          raw: s,
          text: s
        };
      }
      return be(n, o, n[0], this.lexer, this.rules);
    }
  }
  emStrong(items, strong, n = "") {
    let i = this.rules.inline.emStrongLDelim.exec(items);
    if (!i || !i[1] && !i[2] && !i[3] && !i[4] || i[4] && n.match(this.rules.other.unicodeAlphaNumeric)) return;
    if (!(i[1] || i[3] || "") || !n || this.rules.inline.punctuation.exec(n)) {
      let o = [...i[0]].length - 1,
        flag,
        length,
        a = o,
        p = 0,
        c = i[0][0],
        h = n === c,
        k = c === "*" ? this.rules.inline.emStrongRDelimAst : this.rules.inline.emStrongRDelimUnd;
      for (k.lastIndex = 0, strong = strong.slice(-1 * items.length + o); (i = k.exec(strong)) !== null;) {
        if (flag = i[1] || i[2] || i[3] || i[4] || i[5] || i[6], !flag) continue;
        if (length = [...flag].length, i[3] || i[4]) {
          a += length;
          continue;
        } else if (i[5] || i[6]) {
          if (o % 3 && !((o + length) % 3)) {
            p += length;
            continue;
          }
          if (h) break;
        }
        if (a -= length, a > 0) continue;
        length = Math.min(length, length + a + p);
        let O = [...i[0]][0].length,
          part = items.slice(0, o + i.index + O + length);
        if (Math.min(o, length) % 2) {
          let z = part.slice(1, -1);
          return {
            type: "em",
            raw: part,
            text: z,
            tokens: this.lexer.inlineTokens(z)
          };
        }
        let w = part.slice(2, -2);
        return {
          type: "strong",
          raw: part,
          text: w,
          tokens: this.lexer.inlineTokens(w)
        };
      }
    }
  }
  codespan(codespan) {
    let t = this.rules.inline.code.exec(codespan);
    if (t) {
      let replaced = t[2].replace(this.rules.other.newLineCharGlobal, " "),
        i = this.rules.other.nonSpaceChar.test(replaced),
        r = this.rules.other.startingSpaceChar.test(replaced) && this.rules.other.endingSpaceChar.test(replaced);
      return i && r && (replaced = replaced.substring(1, replaced.length - 1)), {
        type: "codespan",
        raw: t[0],
        text: replaced
      };
    }
  }
  br(e) {
    let t = this.rules.inline.br.exec(e);
    if (t) return {
      type: "br",
      raw: t[0]
    };
  }
  del(items, t, n = "") {
    let i = this.rules.inline.delLDelim.exec(items);
    if (!i) return;
    if (!(i[1] || "") || !n || this.rules.inline.punctuation.exec(n)) {
      let o = [...i[0]].length - 1,
        flag,
        length,
        a = o,
        delRDelim = this.rules.inline.delRDelim;
      for (delRDelim.lastIndex = 0, t = t.slice(-1 * items.length + o); (i = delRDelim.exec(t)) !== null;) {
        if (flag = i[1] || i[2] || i[3] || i[4] || i[5] || i[6], !flag || (length = [...flag].length, length !== o)) continue;
        if (i[3] || i[4]) {
          a += length;
          continue;
        }
        if (a -= length, a > 0) continue;
        length = Math.min(length, length + a);
        let c = [...i[0]][0].length,
          part = items.slice(0, o + i.index + c + length),
          k = part.slice(o, -o);
        return {
          type: "del",
          raw: part,
          text: k,
          tokens: this.lexer.inlineTokens(k)
        };
      }
    }
  }
  autolink(autolink) {
    let t = this.rules.inline.autolink.exec(autolink);
    if (t) {
      let n, diff;
      return t[2] === "@" ? (n = t[1], diff = "mailto:" + n) : (n = t[1], diff = n), {
        type: "link",
        raw: t[0],
        text: n,
        href: diff,
        autolink: true,
        tokens: [{
          type: "text",
          raw: n,
          text: n
        }]
      };
    }
  }
  url(e) {
    let t;
    if (t = this.rules.inline.url.exec(e)) {
      let n, diff;
      if (t[2] === "@") n = t[0], diff = "mailto:" + n;else {
        let replacedValue;
        do replacedValue = t[0], t[0] = this.rules.inline._backpedal.exec(t[0])?.[0] ?? ""; while (replacedValue !== t[0]);
        n = t[0], t[1] === "www." ? diff = "http://" + t[0] : diff = t[0];
      }
      return {
        type: "link",
        raw: t[0],
        text: n,
        href: diff,
        autolink: true,
        tokens: [{
          type: "text",
          raw: n,
          text: n
        }]
      };
    }
  }
  inlineText(inline) {
    let t = this.rules.inline.text.exec(inline);
    if (t) {
      let inRawBlock = this.lexer.state.inRawBlock;
      return {
        type: "text",
        raw: t[0],
        text: t[0],
        escaped: inRawBlock
      };
    }
  }
};
var x = class l {
  tokens;
  options;
  state;
  inlineQueue;
  tokenizer;
  constructor(constructor) {
    this.tokens = [], this.tokens.links = Object.create(null), this.options = constructor || T, this.options.tokenizer = this.options.tokenizer || new y(), this.tokenizer = this.options.tokenizer, this.tokenizer.options = this.options, this.tokenizer.lexer = this, this.inlineQueue = [], this.state = {
      inLink: false,
      inRawBlock: false,
      linkEmitted: false,
      top: true
    };
    let t = {
      other: options,
      block: G.normal,
      inline: B.normal
    };
    this.options.pedantic ? (t.block = G.pedantic, t.inline = B.pedantic) : this.options.gfm && (t.block = G.gfm, this.options.breaks ? t.inline = B.breaks : t.inline = B.gfm), this.tokenizer.rules = t;
  }
  static get rules() {
    return {
      block: G,
      inline: B
    };
  }
  static lex(e, t) {
    return new l(t).lex(e);
  }
  static lexInline(lex, inline) {
    return new l(inline).inlineTokens(lex);
  }
  lex(e) {
    e = e.replace(options.carriageReturn, `
`), this.blockTokens(e, this.tokens);
    for (let t = 0; t < this.inlineQueue.length; t++) {
      let n = this.inlineQueue[t];
      this.inlineTokens(n.src, n.tokens);
    }
    return this.inlineQueue = [], this.tokens;
  }
  blockTokens(items, t = [], n = false) {
    this.tokenizer.lexer = this, this.options.pedantic && (items = items.replace(options.tabCharGlobal, "    ").replace(options.spaceLine, ""));
    let i = 1 / 0;
    for (; items;) {
      if (items.length < i) i = items.length;else {
        this.infiniteLoopError(items.charCodeAt(0));
        break;
      }
      let replacedValue;
      if (this.options.extensions?.block?.some(s => (replacedValue = s.call({
        lexer: this
      }, items, t)) ? (items = items.substring(replacedValue.raw.length), t.push(replacedValue), true) : false)) continue;
      if (replacedValue = this.tokenizer.space(items)) {
        items = items.substring(replacedValue.raw.length);
        let s = t.at(-1);
        replacedValue.raw.length === 1 && s !== undefined ? s.raw += `
` : t.push(replacedValue);
        continue;
      }
      if (replacedValue = this.tokenizer.code(items)) {
        items = items.substring(replacedValue.raw.length);
        let s = t.at(-1);
        s?.type === "paragraph" || s?.type === "text" ? (s.raw += (s.raw.endsWith(`
`) ? "" : `
`) + replacedValue.raw, s.text += `
` + replacedValue.text, this.inlineQueue.at(-1).src = s.text) : t.push(replacedValue);
        continue;
      }
      if (replacedValue = this.tokenizer.fences(items)) {
        items = items.substring(replacedValue.raw.length), t.push(replacedValue);
        continue;
      }
      if (replacedValue = this.tokenizer.heading(items)) {
        items = items.substring(replacedValue.raw.length), t.push(replacedValue);
        continue;
      }
      if (replacedValue = this.tokenizer.hr(items)) {
        items = items.substring(replacedValue.raw.length), t.push(replacedValue);
        continue;
      }
      if (replacedValue = this.tokenizer.blockquote(items)) {
        items = items.substring(replacedValue.raw.length), t.push(replacedValue);
        continue;
      }
      if (replacedValue = this.tokenizer.list(items)) {
        items = items.substring(replacedValue.raw.length), t.push(replacedValue);
        continue;
      }
      if (replacedValue = this.tokenizer.html(items)) {
        items = items.substring(replacedValue.raw.length), t.push(replacedValue);
        continue;
      }
      if (replacedValue = this.tokenizer.def(items)) {
        items = items.substring(replacedValue.raw.length);
        let s = t.at(-1);
        s?.type === "paragraph" || s?.type === "text" ? (s.raw += (s.raw.endsWith(`
`) ? "" : `
`) + replacedValue.raw, s.text += `
` + replacedValue.raw, this.inlineQueue.at(-1).src = s.text) : this.tokens.links[replacedValue.tag] || (this.tokens.links[replacedValue.tag] = {
          href: replacedValue.href,
          title: replacedValue.title
        }, t.push(replacedValue));
        continue;
      }
      if (replacedValue = this.tokenizer.table(items)) {
        items = items.substring(replacedValue.raw.length), t.push(replacedValue);
        continue;
      }
      if (replacedValue = this.tokenizer.lheading(items)) {
        items = items.substring(replacedValue.raw.length), t.push(replacedValue);
        continue;
      }
      let itemsAlias = items;
      if (this.options.extensions?.startBlock) {
        let s = 1 / 0,
          part = items.slice(1),
          flag;
        this.options.extensions.startBlock.forEach(item => {
          flag = item.call({
            lexer: this
          }, part), typeof flag == "number" && flag >= 0 && (s = Math.min(s, flag));
        }), s < 1 / 0 && s >= 0 && (itemsAlias = items.substring(0, s + 1));
      }
      if (this.state.top && (replacedValue = this.tokenizer.paragraph(itemsAlias))) {
        let s = t.at(-1);
        n && s?.type === "paragraph" ? (s.raw += (s.raw.endsWith(`
`) ? "" : `
`) + replacedValue.raw, s.text += `
` + replacedValue.text, this.inlineQueue.pop(), this.inlineQueue.at(-1).src = s.text) : t.push(replacedValue), n = itemsAlias.length !== items.length, items = items.substring(replacedValue.raw.length);
        continue;
      }
      if (replacedValue = this.tokenizer.text(items)) {
        items = items.substring(replacedValue.raw.length);
        let s = t.at(-1);
        s?.type === "text" ? (s.raw += (s.raw.endsWith(`
`) ? "" : `
`) + replacedValue.raw, s.text += `
` + replacedValue.text, this.inlineQueue.pop(), this.inlineQueue.at(-1).src = s.text) : t.push(replacedValue);
        continue;
      }
      if (items) {
        this.infiniteLoopError(items.charCodeAt(0));
        break;
      }
    }
    return this.state.top = true, t;
  }
  inline(inline, t = []) {
    return this.inlineQueue.push({
      src: inline,
      tokens: t
    }), t;
  }
  linkInText(text) {
    if (!text.includes("[")) return false;
    let link = this.tokenizer.rules.inline.link;
    for (let n of text.matchAll(this.tokenizer.rules.inline.blockSkip)) if (link.test(n[0]) && text.charAt(n.index - 1) !== "!") return true;
    for (let n of text.matchAll(this.tokenizer.rules.inline.reflinkSearch)) {
      let i = n[0],
        lastIndexOf = i.lastIndexOf("[");
      if (!(i.charAt(0) === "!" || !Object.hasOwn(this.tokens.links, D(i.slice(lastIndexOf + 1, -1)))) && !(lastIndexOf > 1 && this.linkInText(i.slice(1, lastIndexOf - 1)))) return true;
    }
    return false;
  }
  inlineTokens(items, t = []) {
    this.tokenizer.lexer = this;
    let itemsAlias = items;
    if (this.tokens.links && items.includes("[")) {
      let reflinkSearch = this.tokenizer.rules.inline.reflinkSearch,
        u = a => {
          let lastIndexOf = a.lastIndexOf("[");
          if (!Object.hasOwn(this.tokens.links, D(a.slice(lastIndexOf + 1, -1)))) return a;
          if (lastIndexOf > 1 && a.charAt(0) !== "!") {
            let part = a.slice(1, lastIndexOf - 1);
            if (this.linkInText(part)) return "[" + part.replace(reflinkSearch, u) + "][" + "a".repeat(a.length - lastIndexOf - 2) + "]";
          }
          return "[" + "a".repeat(a.length - 2) + "]";
        };
      itemsAlias = itemsAlias.replace(reflinkSearch, u);
    }
    itemsAlias = itemsAlias.replace(this.tokenizer.rules.inline.anyPunctuation, count => "+".repeat(count.length)), itemsAlias = itemsAlias.replace(this.tokenizer.rules.inline.blockSkip, (s, u, count) => {
      let p = count ? count.length : 0;
      return s.slice(0, p) + "[" + "a".repeat(s.length - p - 2) + "]";
    }), itemsAlias = this.options.hooks?.emStrongMask?.call({
      lexer: this
    }, itemsAlias) ?? itemsAlias;
    let i = false,
      r = "",
      o = 1 / 0;
    for (; items;) {
      if (items.length < o) o = items.length;else {
        this.infiniteLoopError(items.charCodeAt(0));
        break;
      }
      i || (r = ""), i = false;
      let flag;
      if (this.options.extensions?.inline?.some(a => (flag = a.call({
        lexer: this
      }, items, t)) ? (items = items.substring(flag.raw.length), t.push(flag), true) : false)) continue;
      if (flag = this.tokenizer.escape(items)) {
        items = items.substring(flag.raw.length), t.push(flag);
        continue;
      }
      if (flag = this.tokenizer.tag(items)) {
        items = items.substring(flag.raw.length), t.push(flag);
        continue;
      }
      if (flag = this.tokenizer.link(items)) {
        items = items.substring(flag.raw.length), t.push(flag);
        continue;
      }
      if (flag = this.tokenizer.reflink(items, this.tokens.links)) {
        items = items.substring(flag.raw.length);
        let a = t.at(-1);
        flag.type === "text" && a?.type === "text" ? (a.raw += flag.raw, a.text += flag.text) : t.push(flag);
        continue;
      }
      if (flag = this.tokenizer.emStrong(items, itemsAlias, r)) {
        items = items.substring(flag.raw.length), t.push(flag);
        continue;
      }
      if (flag = this.tokenizer.codespan(items)) {
        items = items.substring(flag.raw.length), t.push(flag);
        continue;
      }
      if (flag = this.tokenizer.br(items)) {
        items = items.substring(flag.raw.length), t.push(flag);
        continue;
      }
      if (flag = this.tokenizer.del(items, itemsAlias, r)) {
        items = items.substring(flag.raw.length), t.push(flag);
        continue;
      }
      if (flag = this.tokenizer.autolink(items)) {
        items = items.substring(flag.raw.length), t.push(flag);
        continue;
      }
      if (!this.state.inLink && (flag = this.tokenizer.url(items))) {
        items = items.substring(flag.raw.length), t.push(flag);
        continue;
      }
      let u = items;
      if (this.options.extensions?.startInline) {
        let a = 1 / 0,
          part = items.slice(1),
          text;
        this.options.extensions.startInline.forEach(item => {
          text = item.call({
            lexer: this
          }, part), typeof text == "number" && text >= 0 && (a = Math.min(a, text));
        }), a < 1 / 0 && a >= 0 && (u = items.substring(0, a + 1));
      }
      if (flag = this.tokenizer.inlineText(u)) {
        items = items.substring(flag.raw.length), flag.raw.slice(-1) !== "_" && (r = flag.raw.slice(-1)), i = true;
        let a = t.at(-1);
        a?.type === "text" ? (a.raw += flag.raw, a.text += flag.text) : t.push(flag);
        continue;
      }
      if (items) {
        this.infiniteLoopError(items.charCodeAt(0));
        break;
      }
    }
    return t;
  }
  infiniteLoopError(infinite) {
    let t = "Infinite loop on byte: " + infinite;
    if (this.options.silent) console.error(t);else throw new Error(t);
  }
};
var P = class {
  options;
  parser;
  constructor(constructor) {
    this.options = constructor || T;
  }
  space(e) {
    return "";
  }
  code({
    text: e,
    lang: t,
    escaped: n
  }) {
    let i = (t || "").match(options.notSpaceStart)?.[0],
      r = e ? e.replace(options.endingNewline, "") + `
` : "";
    return i ? "<pre><code class=\"language-" + R(i) + "\">" + (n ? r : R(r, true)) + `</code></pre>
` : "<pre><code>" + (n ? r : R(r, true)) + `</code></pre>
`;
  }
  blockquote({
    tokens: e
  }) {
    return `<blockquote>
${this.parser.parse(e)}</blockquote>
`;
  }
  html({
    text: e
  }) {
    return e;
  }
  def(e) {
    return "";
  }
  heading({
    tokens: e,
    depth: t
  }) {
    return `<h${t}>${this.parser.parseInline(e)}</h${t}>
`;
  }
  hr(e) {
    return `<hr>
`;
  }
  list(e) {
    let ordered = e.ordered,
      n = e.start,
      i = "";
    for (let s = 0; s < e.items.length; s++) {
      let u = e.items[s];
      i += this.listitem(u);
    }
    let r = ordered ? "ol" : "ul",
      o = ordered && n !== 1 ? " start=\"" + n + "\"" : "";
    return "<" + r + o + `>
` + i + "</" + r + `>
`;
  }
  listitem(item) {
    return `<li>${this.parser.parse(item.tokens)}</li>
`;
  }
  checkbox({
    checked: e
  }) {
    return "<input " + (e ? "checked=\"\" " : "") + "disabled=\"\" type=\"checkbox\"> ";
  }
  paragraph({
    tokens: e
  }) {
    return `<p>${this.parser.parseInline(e)}</p>
`;
  }
  table(e) {
    let t = "",
      n = "";
    for (let r = 0; r < e.header.length; r++) n += this.tablecell(e.header[r]);
    t += this.tablerow({
      text: n
    });
    let i = "";
    for (let r = 0; r < e.rows.length; r++) {
      let o = e.rows[r];
      n = "";
      for (let s = 0; s < o.length; s++) n += this.tablecell(o[s]);
      i += this.tablerow({
        text: n
      });
    }
    return i && (i = `<tbody>${i}</tbody>`), `<table>
<thead>
` + t + `</thead>
` + i + `</table>
`;
  }
  tablerow({
    text: e
  }) {
    return `<tr>
${e}</tr>
`;
  }
  tablecell(tablecell) {
    let inline = this.parser.parseInline(tablecell.tokens),
      n = tablecell.header ? "th" : "td";
    return (tablecell.align ? `<${n} align="${tablecell.align}">` : `<${n}>`) + inline + `</${n}>
`;
  }
  strong({
    tokens: e
  }) {
    return `<strong>${this.parser.parseInline(e)}</strong>`;
  }
  em({
    tokens: e
  }) {
    return `<em>${this.parser.parseInline(e)}</em>`;
  }
  codespan({
    text: e
  }) {
    return `<code>${R(e, true)}</code>`;
  }
  br(e) {
    return "<br>";
  }
  del({
    tokens: e
  }) {
    return `<del>${this.parser.parseInline(e)}</del>`;
  }
  link({
    href: e,
    title: t,
    text: n,
    tokens: i,
    autolink: r
  }) {
    let o = r ? R(n, true) : this.parser.parseInline(i),
      s = ee(e);
    if (s === null) return o;
    e = R(s, r);
    let u = "<a href=\"" + e + "\"";
    return t && (u += " title=\"" + R(t) + "\""), u += ">" + o + "</a>", u;
  }
  image({
    href: e,
    title: t,
    text: n,
    tokens: i
  }) {
    i && (n = this.parser.parseInline(i, this.parser.textRenderer));
    let r = ee(e);
    if (r === null) return R(n);
    e = r;
    let o = `<img src="${R(e)}" alt="${R(n)}"`;
    return t && (o += ` title="${R(t)}"`), o += ">", o;
  }
  text(e) {
    return "tokens" in e && e.tokens ? this.parser.parseInline(e.tokens) : "escaped" in e && e.escaped ? e.text : R(e.text);
  }
};
var L = class {
  strong({
    text: e
  }) {
    return e;
  }
  em({
    text: e
  }) {
    return e;
  }
  codespan({
    text: e
  }) {
    return e;
  }
  del({
    text: e
  }) {
    return e;
  }
  html({
    text: e
  }) {
    return e;
  }
  text({
    text: e
  }) {
    return e;
  }
  link({
    text: e
  }) {
    return "" + e;
  }
  image({
    text: e
  }) {
    return "" + e;
  }
  br() {
    return "";
  }
  checkbox({
    raw: e
  }) {
    return e;
  }
};
var b = class l {
  options;
  renderer;
  textRenderer;
  constructor(constructor) {
    this.options = constructor || T, this.options.renderer = this.options.renderer || new P(), this.renderer = this.options.renderer, this.renderer.options = this.options, this.renderer.parser = this, this.textRenderer = new L();
  }
  static parse(e, t) {
    return new l(t).parse(e);
  }
  static parseInline(inline, inlineValue) {
    return new l(inlineValue).parseInline(inline);
  }
  parse(count) {
    this.renderer.parser = this;
    let t = "";
    for (let n = 0; n < count.length; n++) {
      let i = count[n];
      if (this.options.extensions?.renderers?.[i.type]) {
        let o = i,
          s = this.options.extensions.renderers[o.type].call({
            parser: this
          }, o);
        if (s !== false || !["space", "hr", "heading", "code", "table", "blockquote", "list", "checkbox", "html", "def", "paragraph", "text"].includes(o.type)) {
          t += s || "";
          continue;
        }
      }
      let r = i;
      switch (r.type) {
        case "space":
          t += this.renderer.space(r);
          break;
        case "hr":
          t += this.renderer.hr(r);
          break;
        case "heading":
          t += this.renderer.heading(r);
          break;
        case "code":
          t += this.renderer.code(r);
          break;
        case "table":
          t += this.renderer.table(r);
          break;
        case "blockquote":
          t += this.renderer.blockquote(r);
          break;
        case "list":
          t += this.renderer.list(r);
          break;
        case "checkbox":
          t += this.renderer.checkbox(r);
          break;
        case "html":
          t += this.renderer.html(r);
          break;
        case "def":
          t += this.renderer.def(r);
          break;
        case "paragraph":
          t += this.renderer.paragraph(r);
          break;
        case "text":
          t += this.renderer.text(r);
          break;
        default:
          {
            let o = "Token with \"" + r.type + "\" type was not found.";
            if (this.options.silent) return console.error(o), "";
            throw new Error(o);
          }
      }
    }
    return t;
  }
  parseInline(count, t = this.renderer) {
    this.renderer.parser = this;
    let n = "";
    for (let i = 0; i < count.length; i++) {
      let r = count[i];
      if (this.options.extensions?.renderers?.[r.type]) {
        let s = this.options.extensions.renderers[r.type].call({
          parser: this
        }, r);
        if (s !== false || !["escape", "html", "link", "image", "checkbox", "strong", "em", "codespan", "br", "del", "text"].includes(r.type)) {
          n += s || "";
          continue;
        }
      }
      let o = r;
      switch (o.type) {
        case "escape":
          n += t.text(o);
          break;
        case "html":
          n += t.html(o);
          break;
        case "link":
          n += t.link(o);
          break;
        case "image":
          n += t.image(o);
          break;
        case "checkbox":
          n += t.checkbox(o);
          break;
        case "strong":
          n += t.strong(o);
          break;
        case "em":
          n += t.em(o);
          break;
        case "codespan":
          n += t.codespan(o);
          break;
        case "br":
          n += t.br(o);
          break;
        case "del":
          n += t.del(o);
          break;
        case "text":
          n += t.text(o);
          break;
        default:
          {
            let s = "Token with \"" + o.type + "\" type was not found.";
            if (this.options.silent) return console.error(s), "";
            throw new Error(s);
          }
      }
    }
    return n;
  }
};
var S = class {
  options;
  block;
  constructor(constructor) {
    this.options = constructor || T;
  }
  static passThroughHooks = /* @__PURE__ */new Set(["preprocess", "postprocess", "processAllTokens", "emStrongMask"]);
  static passThroughHooksRespectAsync = /* @__PURE__ */new Set(["preprocess", "postprocess", "processAllTokens"]);
  preprocess(preprocess) {
    return preprocess;
  }
  postprocess(processValue) {
    return processValue;
  }
  processAllTokens(all) {
    return all;
  }
  emStrongMask(strong) {
    return strong;
  }
  provideLexer(e = this.block) {
    return e ? x.lex : x.lexInline;
  }
  provideParser(e = this.block) {
    return e ? b.parse : b.parseInline;
  }
};
var Q = class {
  defaults = A();
  options = this.setOptions;
  parse = this.parseMarkdown(true);
  parseInline = this.parseMarkdown(false);
  Parser = b;
  Renderer = P;
  TextRenderer = L;
  Lexer = x;
  Tokenizer = y;
  Hooks = S;
  constructor(...e) {
    this.use(...e);
  }
  walkTokens(walk, tokens) {
    let emptyItems = [];
    for (let diff of walk) switch (emptyItems = emptyItems.concat(tokens.call(this, diff)), diff.type) {
      case "table":
        {
          let r = diff;
          for (let resolvedValue of r.header) emptyItems = emptyItems.concat(this.walkTokens(resolvedValue.tokens, tokens));
          for (let resolvedValue of r.rows) for (let flag of resolvedValue) emptyItems = emptyItems.concat(this.walkTokens(flag.tokens, tokens));
          break;
        }
      case "list":
        {
          let r = diff;
          emptyItems = emptyItems.concat(this.walkTokens(r.items, tokens));
          break;
        }
      default:
        {
          let r = diff;
          this.defaults.extensions?.childTokens?.[r.type] ? this.defaults.extensions.childTokens[r.type].forEach(item => {
            let s = r[item].flat(1 / 0);
            emptyItems = emptyItems.concat(this.walkTokens(s, tokens));
          }) : r.tokens && (emptyItems = emptyItems.concat(this.walkTokens(r.tokens, tokens)));
        }
    }
    return emptyItems;
  }
  use(...e) {
    let fallbackValue = this.defaults.extensions || {
      renderers: {},
      childTokens: {}
    };
    return e.forEach(item => {
      let i = {
        ...item
      };
      if (i.async = this.defaults.async || i.async || false, item.extensions && (item.extensions.forEach(r => {
        if (!r.name) throw new Error("extension name required");
        if ("renderer" in r) {
          let o = fallbackValue.renderers[r.name];
          o ? fallbackValue.renderers[r.name] = function (...s) {
            let u = r.renderer.apply(this, s);
            return u === false && (u = o.apply(this, s)), u;
          } : fallbackValue.renderers[r.name] = r.renderer;
        }
        if ("tokenizer" in r) {
          if (!r.level || r.level !== "block" && r.level !== "inline") throw new Error("extension level must be 'block' or 'inline'");
          let o = fallbackValue[r.level];
          o ? o.unshift(r.tokenizer) : fallbackValue[r.level] = [r.tokenizer], r.start && (r.level === "block" ? fallbackValue.startBlock ? fallbackValue.startBlock.push(r.start) : fallbackValue.startBlock = [r.start] : r.level === "inline" && (fallbackValue.startInline ? fallbackValue.startInline.push(r.start) : fallbackValue.startInline = [r.start]));
        }
        "childTokens" in r && r.childTokens && (fallbackValue.childTokens[r.name] = r.childTokens);
      }), i.extensions = fallbackValue), item.renderer) {
        let r = this.defaults.renderer || new P(this.defaults);
        for (let resolvedValue in item.renderer) {
          if (!(resolvedValue in r)) throw new Error(`renderer '${resolvedValue}' does not exist`);
          if (["options", "parser"].includes(resolvedValue)) continue;
          let s = resolvedValue,
            u = item.renderer[s],
            a = r[s];
          r[s] = (...p) => {
            let c = u.apply(r, p);
            return c === false && (c = a.apply(r, p)), c || "";
          };
        }
        i.renderer = r;
      }
      if (item.tokenizer) {
        let r = this.defaults.tokenizer || new y(this.defaults);
        for (let resolvedValue in item.tokenizer) {
          if (!(resolvedValue in r)) throw new Error(`tokenizer '${resolvedValue}' does not exist`);
          if (["options", "rules", "lexer"].includes(resolvedValue)) continue;
          let s = resolvedValue,
            u = item.tokenizer[s],
            a = r[s];
          r[s] = (...p) => {
            let c = u.apply(r, p);
            return c === false && (c = a.apply(r, p)), c;
          };
        }
        i.tokenizer = r;
      }
      if (item.hooks) {
        let r = this.defaults.hooks || new S();
        for (let resolvedValue in item.hooks) {
          if (!(resolvedValue in r)) throw new Error(`hook '${resolvedValue}' does not exist`);
          if (["options", "block"].includes(resolvedValue)) continue;
          let s = resolvedValue,
            u = item.hooks[s],
            a = r[s];
          S.passThroughHooks.has(resolvedValue) ? r[s] = p => {
            if (this.defaults.async && S.passThroughHooksRespectAsync.has(resolvedValue)) return (async () => {
              let h = await u.call(r, p);
              return a.call(r, h);
            })();
            let c = u.call(r, p);
            return a.call(r, c);
          } : r[s] = (...p) => {
            if (this.defaults.async) return (async () => {
              let h = await u.apply(r, p);
              return h === false && (h = await a.apply(r, p)), h;
            })();
            let c = u.apply(r, p);
            return c === false && (c = a.apply(r, p)), c;
          };
        }
        i.hooks = r;
      }
      if (item.walkTokens) {
        let walkTokens = this.defaults.walkTokens,
          o = item.walkTokens;
        i.walkTokens = function (s) {
          let emptyItems = [];
          return emptyItems.push(o.call(this, s)), walkTokens && (emptyItems = emptyItems.concat(walkTokens.call(this, s))), emptyItems;
        };
      }
      this.defaults = {
        ...this.defaults,
        ...i
      };
    }), this;
  }
  setOptions(options) {
    return this.defaults = {
      ...this.defaults,
      ...options
    }, this;
  }
  lexer(e, t) {
    return x.lex(e, t ?? this.defaults);
  }
  parser(e, t) {
    return b.parse(e, t ?? this.defaults);
  }
  parseMarkdown(markdown) {
    return (n, i) => {
      let r = {
          ...i
        },
        o = {
          ...this.defaults,
          ...r
        },
        s = this.onError(!!o.silent, !!o.async);
      if (this.defaults.async === true && r.async === false) return s(/* @__PURE__ */new Error("marked(): The async option was set to true by an extension. Remove async: false from the parse options object to return a Promise."));
      if (typeof n > "u" || n === null) return s(/* @__PURE__ */new Error("marked(): input parameter is undefined or null"));
      if (typeof n != "string") return s(/* @__PURE__ */new Error("marked(): input parameter is of type " + Object.prototype.toString.call(n) + ", string expected"));
      if (o.hooks && (o.hooks.options = o, o.hooks.block = markdown), o.async) return (async () => {
        let u = o.hooks ? await o.hooks.preprocess(n) : n,
          p = await (o.hooks ? await o.hooks.provideLexer(markdown) : markdown ? x.lex : x.lexInline)(u, o),
          c = o.hooks ? await o.hooks.processAllTokens(p) : p;
        o.walkTokens && (await Promise.all(this.walkTokens(c, o.walkTokens)));
        let k = await (o.hooks ? await o.hooks.provideParser(markdown) : markdown ? b.parse : b.parseInline)(c, o);
        return o.hooks ? await o.hooks.postprocess(k) : k;
      })().catch(s);
      try {
        o.hooks && (n = o.hooks.preprocess(n));
        let a = (o.hooks ? o.hooks.provideLexer(markdown) : markdown ? x.lex : x.lexInline)(n, o);
        o.hooks && (a = o.hooks.processAllTokens(a)), o.walkTokens && this.walkTokens(a, o.walkTokens);
        let c = (o.hooks ? o.hooks.provideParser(markdown) : markdown ? b.parse : b.parseInline)(a, o);
        return o.hooks && (c = o.hooks.postprocess(c)), c;
      } catch (u) {
        return s(u);
      }
    };
  }
  onError(error, errorValue) {
    return n => {
      if (n.message += `
Please report this to https://github.com/markedjs/marked.`, error) {
        let i = "<p>An error occurred:</p><pre>" + R(n.message + "", true) + "</pre>";
        return errorValue ? Promise.resolve(i) : i;
      }
      if (errorValue) return Promise.reject(n);
      throw n;
    };
  }
};
var M = new Q();
function f(l, e) {
  return M.parse(l, e);
}
f.options = f.setOptions = function (l) {
  return M.setOptions(l), f.defaults = M.defaults, U(f.defaults), f;
};
f.getDefaults = A;
f.defaults = T;
function bt(...l) {
  return M.use(...l), f.defaults = M.defaults, U(f.defaults), f;
}
f.use = bt;
f.walkTokens = function (l, e) {
  return M.walkTokens(l, e);
};
f.parseInline = M.parseInline;
f.Parser = b;
f.parser = b.parse;
f.Renderer = P;
f.TextRenderer = L;
f.Lexer = x;
f.lexer = x.lex;
f.Tokenizer = y;
f.Hooks = S;
f.parse = f;
f.options;
f.setOptions;
f.walkTokens;
f.parseInline;
b.parse;
x.lex;
//#endregion
//#region shared/utils/xiaohei-bot-message-preview.ts
var MESSAGE_PREVIEW_SOURCE_LIMIT = 4096;
var MESSAGE_PREVIEW_LENGTH_LIMIT = 240;
var MARKDOWN_PREVIEW_HINT = /(^|\n)\s{0,3}(?:#{1,6}\s|>|[-+*]\s|\d+[.)]\s|```|~~~)|[*_~`\[\]<>\\]/m;
var MarkdownPreviewTextRenderer = class extends L {
  br() {
    return " ";
  }
};
var markdownPreviewTextRenderer = new MarkdownPreviewTextRenderer();
var markdownPreviewParser = new b();
function inlineMarkdownPreview(tokens) {
  return markdownPreviewParser.parseInline(tokens, markdownPreviewTextRenderer);
}
function markdownTokensToPreview(tokens) {
  return tokens.map(token => {
    switch (token.type) {
      case "heading":
      case "paragraph":
        return inlineMarkdownPreview(token.tokens ?? []);
      case "blockquote":
        return markdownTokensToPreview(token.tokens ?? []);
      case "list":
        return token.items.map(item => markdownTokensToPreview(item.tokens ?? [])).join(" ");
      case "table":
        return [...token.header, ...token.rows.flat()].map(cell => inlineMarkdownPreview(cell.tokens)).join(" ");
      case "code":
      case "html":
        return token.text;
      case "text":
        return token.tokens ? inlineMarkdownPreview(token.tokens) : token.text;
      default:
        return "";
    }
  }).join(" ");
}
function markdownToPreviewText(content) {
  const source = content.slice(0, MESSAGE_PREVIEW_SOURCE_LIMIT);
  let plain = source;
  if (MARKDOWN_PREVIEW_HINT.test(source)) try {
    plain = markdownTokensToPreview(x.lex(source));
  } catch {}
  return plain.replace(/<!--[\s\S]*?-->/g, " ").replace(/<\/?[A-Za-z][^>]*>/g, " ").replace(/\s+/g, " ").trim();
}
function xiaoheiBotMessagePreview(content, mentions, attachmentCount = 0) {
  let plain = content;
  for (const mention of mentions) plain = plain.replaceAll(`[[xiaohei-mention:${mention.token}]]`, `@${mention.label}`);
  plain = markdownToPreviewText(plain);
  return plain.slice(0, MESSAGE_PREVIEW_LENGTH_LIMIT) || (attachmentCount > 0 ? `[${attachmentCount} 个附件]` : "");
}
//#endregion
//#region electron/repositories/xiaohei-bot-context.repository.ts
function recordContextOperation(database, scope, operation) {
  if (!database.prepare(`SELECT id FROM xiaohei_bot_agent_runs WHERE id = ? AND bot_id = ? AND conversation_id = ?`).get(operation.requestId, scope.botId, scope.conversationId)) return;
  const tokens = value => Number.isFinite(value) ? Math.max(0, Math.floor(value)) : 0;
  database.prepare(`INSERT INTO xiaohei_bot_context_operations
    (id, request_id, conversation_id, bot_id, kind, status, input_tokens, output_tokens,
      cache_read_tokens, cache_write_tokens, usage_known, details_json, updated_at)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    ON CONFLICT(id) DO UPDATE SET status = excluded.status,
      input_tokens = MAX(input_tokens, excluded.input_tokens), output_tokens = MAX(output_tokens, excluded.output_tokens),
      cache_read_tokens = MAX(cache_read_tokens, excluded.cache_read_tokens), cache_write_tokens = MAX(cache_write_tokens, excluded.cache_write_tokens),
      usage_known = MAX(usage_known, excluded.usage_known), details_json = excluded.details_json, updated_at = excluded.updated_at
    WHERE excluded.request_id = request_id AND excluded.bot_id = bot_id AND excluded.conversation_id = conversation_id
      AND (status = 'running' OR excluded.status != 'running')`).run(operation.id, operation.requestId, scope.conversationId, scope.botId, operation.kind, operation.status, tokens(operation.usage?.input), tokens(operation.usage?.output), tokens(operation.usage?.cacheRead), tokens(operation.usage?.cacheWrite), operation.usage && Object.values(operation.usage).some(value => typeof value === "number" && value > 0) ? 1 : 0, JSON.stringify(operation), (/* @__PURE__ */new Date()).toISOString());
}
function conversationContextUsage(database, conversationId) {
  return database.prepare(`WITH attempts AS (
      SELECT request_id, SUM(input_tokens) AS input_tokens, SUM(output_tokens) AS output_tokens,
        SUM(cache_read_tokens) AS cache_read_tokens, SUM(cache_write_tokens) AS cache_write_tokens
      FROM xiaohei_bot_context_operations WHERE conversation_id = ? AND kind = 'agent-attempt' GROUP BY request_id
    ), usage AS (
      SELECT MAX(r.input_tokens, COALESCE(a.input_tokens, 0)) AS input_tokens,
        MAX(r.output_tokens, COALESCE(a.output_tokens, 0)) AS output_tokens,
        MAX(r.cache_read_tokens, COALESCE(a.cache_read_tokens, 0)) AS cache_read_tokens,
        MAX(r.cache_write_tokens, COALESCE(a.cache_write_tokens, 0)) AS cache_write_tokens
      FROM xiaohei_bot_agent_runs r LEFT JOIN attempts a ON a.request_id = r.id WHERE r.conversation_id = ?
      UNION ALL SELECT input_tokens, output_tokens, cache_read_tokens, cache_write_tokens
      FROM xiaohei_bot_context_operations WHERE conversation_id = ? AND kind = 'context-summary'
    ) SELECT COALESCE(SUM(input_tokens), 0) AS inputTokens, COALESCE(SUM(output_tokens), 0) AS outputTokens,
      COALESCE(SUM(cache_read_tokens), 0) AS cacheReadTokens, COALESCE(SUM(cache_write_tokens), 0) AS cacheWriteTokens FROM usage`).get(conversationId, conversationId, conversationId);
}
//#endregion
//#region electron/repositories/xiaohei-bot-event-log.repository.ts
var EVENT_SCHEMA_VERSION = 1;
var MAX_SEARCH_TEXT_CHARACTERS = 64e3;
var MAX_TOOL_SEARCH_TEXT_CHARACTERS = 8e3;
var SENSITIVE_KEY_PATTERN = /(?:api[_-]?key|authorization|credential|cookie|password|secret|session[_-]?token|access[_-]?token|refresh[_-]?token)/iu;
var SENSITIVE_VALUE_PATTERNS = [/\bBearer\s+[A-Za-z0-9._~+/=-]{8,}\b/giu, /\bsk-[A-Za-z0-9_-]{8,}\b/giu, /\b(?:api[_-]?key|access[_-]?token|refresh[_-]?token|password|secret)\s*[:=]\s*[^\s,;]+/giu];
function eventSequenceRange(rows) {
  if (rows.length === 0) return {
    first: null,
    last: null
  };
  let first = Number.POSITIVE_INFINITY;
  let last = Number.NEGATIVE_INFINITY;
  for (const row of rows) {
    const sequence = Number(row.global_seq);
    first = Math.min(first, sequence);
    last = Math.max(last, sequence);
  }
  return {
    first,
    last
  };
}
function sha256(value) {
  return createHash("sha256").update(value).digest("hex");
}
function redactAndNormalize(value, key = "") {
  if (SENSITIVE_KEY_PATTERN.test(key)) return "[credential]";
  if (value === null || typeof value === "boolean") return value;
  if (typeof value === "string") {
    let redacted = value;
    for (const pattern of SENSITIVE_VALUE_PATTERNS) redacted = redacted.replace(pattern, "[credential]");
    return redacted;
  }
  if (typeof value === "number") return Number.isFinite(value) ? value : null;
  if (typeof value === "bigint") return value.toString();
  if (value instanceof Date) return value.toISOString();
  if (value instanceof Uint8Array) return {
    bytes: value.byteLength,
    sha256: sha256(value)
  };
  if (Array.isArray(value)) return value.map(item => redactAndNormalize(item));
  if (typeof value === "object") {
    const result = {};
    for (const [childKey, childValue] of Object.entries(value).sort(([left], [right]) => left.localeCompare(right))) {
      if (childValue === undefined || typeof childValue === "function") continue;
      result[childKey] = redactAndNormalize(childValue, childKey);
    }
    return result;
  }
  return String(value);
}
function stableStringify(value) {
  if (value === null || typeof value !== "object") return JSON.stringify(value);
  if (Array.isArray(value)) return `[${value.map(item => stableStringify(item)).join(",")}]`;
  return `{${Object.entries(value).sort(([left], [right]) => left.localeCompare(right)).map(([entryKey, entryValue]) => `${JSON.stringify(entryKey)}:${stableStringify(entryValue)}`).join(",")}}`;
}
function parseJsonObject(value) {
  try {
    const parsed = JSON.parse(value);
    return parsed && typeof parsed === "object" && !Array.isArray(parsed) ? parsed : {};
  } catch {
    return {};
  }
}
function parseNumberArray(value) {
  try {
    const parsed = JSON.parse(value);
    return Array.isArray(parsed) ? parsed.filter(item => typeof item === "number" && Number.isSafeInteger(item) && item >= 0) : [];
  } catch {
    return [];
  }
}
function textFromJson(value, result = [], budget = {
  remaining: Number.POSITIVE_INFINITY
}) {
  if (budget.remaining <= 0) return result;
  if (typeof value === "string") {
    const text = value.length > budget.remaining ? value.slice(0, budget.remaining) : value;
    result.push(text);
    budget.remaining -= text.length + 1;
  } else if (Array.isArray(value)) for (const item of value) textFromJson(item, result, budget);else if (value && typeof value === "object") for (const child of Object.values(value)) textFromJson(child, result, budget);
  return result;
}
function eventHashMaterial(input) {
  return stableStringify(redactAndNormalize(input));
}
function mapEvent$1(row) {
  return {
    globalSeq: Number(row.global_seq),
    eventId: row.event_id,
    streamId: row.stream_id,
    streamSeq: Number(row.stream_seq),
    conversationId: row.conversation_id,
    eventType: row.event_type,
    schemaVersion: Number(row.schema_version),
    occurredAt: row.occurred_at,
    actorType: row.actor_type,
    actorId: row.actor_id,
    aggregateType: row.aggregate_type,
    aggregateId: row.aggregate_id,
    correlationId: row.correlation_id,
    causationEventId: row.causation_event_id,
    parentEventId: row.parent_event_id,
    branchId: row.branch_id,
    retentionClass: row.retention_class,
    sourceEventSeqs: parseNumberArray(row.source_event_seqs_json),
    payload: parseJsonObject(row.payload_json),
    payloadSha256: row.payload_sha256,
    previousEventHash: row.previous_event_hash,
    eventHash: row.event_hash,
    synthetic: row.is_synthetic === 1
  };
}
function defaultStreamId(input) {
  if (input.streamId?.trim()) return input.streamId.trim();
  if (input.conversationId) return `conversation:${input.conversationId}`;
  return `${input.aggregateType}:${input.aggregateId}`;
}
function appendXiaoheiBotEvent(database, input) {
  const eventId = input.eventId ?? randomUUID();
  const streamId = defaultStreamId(input);
  const conversationId = input.conversationId ?? null;
  const eventType = input.eventType.trim();
  const schemaVersion = input.schemaVersion ?? EVENT_SCHEMA_VERSION;
  const occurredAt = input.occurredAt ?? (/* @__PURE__ */new Date()).toISOString();
  const actorType = input.actorType ?? "system";
  const actorId = input.actorId ?? null;
  const correlationId = input.correlationId ?? null;
  const causationEventId = input.causationEventId ?? null;
  const parentEventId = input.parentEventId ?? null;
  const branchId = input.branchId ?? null;
  const retentionClass = input.retentionClass ?? "canonical";
  const sourceEventSeqs = [...new Set(input.sourceEventSeqs ?? [])].filter(value => Number.isSafeInteger(value) && value >= 0);
  const normalizedPayload = redactAndNormalize(input.payload ?? {});
  const payload = normalizedPayload && typeof normalizedPayload === "object" && !Array.isArray(normalizedPayload) ? normalizedPayload : {};
  const payloadJson = stableStringify(payload);
  const payloadSha256 = sha256(payloadJson);
  const previous = database.prepare(`SELECT stream_seq, event_hash FROM xiaohei_bot_events
       WHERE stream_id = ? ORDER BY stream_seq DESC LIMIT 1`).get(streamId);
  const streamSeq = Number(previous?.stream_seq ?? 0) + 1;
  const previousEventHash = previous?.event_hash ?? null;
  const synthetic = input.synthetic === true;
  const eventHash = sha256(eventHashMaterial({
    eventId,
    streamId,
    streamSeq,
    conversationId,
    eventType,
    schemaVersion,
    occurredAt,
    actorType,
    actorId,
    aggregateType: input.aggregateType,
    aggregateId: input.aggregateId,
    correlationId,
    causationEventId,
    parentEventId,
    branchId,
    retentionClass,
    sourceEventSeqs,
    payloadSha256,
    previousEventHash,
    synthetic
  }));
  const searchLimit = input.aggregateType === "tool-call" ? MAX_TOOL_SEARCH_TEXT_CHARACTERS : MAX_SEARCH_TEXT_CHARACTERS;
  const searchPrefix = [eventType, input.aggregateType, input.aggregateId, (input.searchText ?? "").slice(0, searchLimit)].join(" ");
  const searchText = `${searchPrefix} ${textFromJson(payload, [], {
    remaining: Math.max(0, searchLimit - searchPrefix.length)
  }).join(" ")}`.slice(0, searchLimit);
  database.prepare(`INSERT INTO xiaohei_bot_events (
        event_id, stream_id, stream_seq, conversation_id, event_type,
        schema_version, occurred_at, actor_type, actor_id, aggregate_type,
        aggregate_id, correlation_id, causation_event_id, parent_event_id,
        branch_id, retention_class, source_event_seqs_json, payload_json,
        search_text, payload_sha256, previous_event_hash, event_hash, is_synthetic
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`).run(eventId, streamId, streamSeq, conversationId, eventType, schemaVersion, occurredAt, actorType, actorId, input.aggregateType, input.aggregateId, correlationId, causationEventId, parentEventId, branchId, retentionClass, JSON.stringify(sourceEventSeqs), payloadJson, searchText, payloadSha256, previousEventHash, eventHash, synthetic ? 1 : 0);
  const row = database.prepare("SELECT * FROM xiaohei_bot_events WHERE event_id = ?").get(eventId);
  if (!row) throw new Error("超能伙伴事件写入失败");
  return mapEvent$1(row);
}
var XiaoheiBotEventLogRepository = class {
  append(input) {
    return appendXiaoheiBotEvent(getDatabase(), input);
  }
  appendPiCheckpoint(input, link) {
    const database = getDatabase();
    const timestamp = input.occurredAt ?? (/* @__PURE__ */new Date()).toISOString();
    database.exec("BEGIN IMMEDIATE");
    try {
      const event = appendXiaoheiBotEvent(database, {
        ...input,
        occurredAt: timestamp
      });
      database.prepare(`INSERT INTO xiaohei_bot_pi_event_links (
            run_id, business_event_id, conversation_id, bot_id, pi_session_id,
            pi_session_file, pi_leaf_entry_id, created_at, updated_at
          ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
          ON CONFLICT(business_event_id) DO UPDATE SET
            run_id = excluded.run_id,
            pi_session_id = COALESCE(excluded.pi_session_id, pi_session_id),
            pi_session_file = COALESCE(excluded.pi_session_file, pi_session_file),
            pi_leaf_entry_id = COALESCE(excluded.pi_leaf_entry_id, pi_leaf_entry_id),
            updated_at = excluded.updated_at`).run(link.runId, event.eventId, link.conversationId, link.botId, link.piSessionId ?? null, link.piSessionFile ?? null, link.piLeafEntryId ?? null, timestamp, timestamp);
      database.exec("COMMIT");
      return event;
    } catch (error) {
      database.exec("ROLLBACK");
      throw error;
    }
  }
  latestGlobalSeq() {
    const row = getDatabase().prepare("SELECT COALESCE(MAX(global_seq), 0) AS seq FROM xiaohei_bot_events").get();
    return Number(row.seq ?? 0);
  }
  activeBranchId(conversationId) {
    return getDatabase().prepare(`SELECT id FROM xiaohei_bot_branches
         WHERE conversation_id = ? AND is_active = 1
         ORDER BY created_at DESC LIMIT 1`).get(conversationId)?.id ?? null;
  }
  getEvent(eventId) {
    const row = getDatabase().prepare("SELECT * FROM xiaohei_bot_events WHERE event_id = ?").get(eventId);
    return row ? mapEvent$1(row) : null;
  }
  getLatestAggregateEvent(aggregateType, aggregateId) {
    const row = getDatabase().prepare(`SELECT * FROM xiaohei_bot_events
         WHERE aggregate_type = ? AND aggregate_id = ?
         ORDER BY global_seq DESC LIMIT 1`).get(aggregateType, aggregateId);
    return row ? mapEvent$1(row) : null;
  }
  ensureLegacyBackfill() {
    const database = getDatabase();
    if (database.prepare("SELECT value FROM settings WHERE key = 'xiaohei_bot_event_ledger_backfill_v1'").get()) return {
      imported: 0,
      alreadyComplete: true
    };
    let imported = 0;
    database.exec("BEGIN IMMEDIATE");
    try {
      const conversations = database.prepare(`SELECT id, kind, title, description, notifications_enabled,
                  direct_bot_id, default_bot_id, created_at, updated_at
           FROM xiaohei_bot_conversations ORDER BY created_at ASC, id ASC`).all();
      for (const conversation of conversations) {
        const conversationId = String(conversation.id);
        database.prepare(`INSERT OR IGNORE INTO xiaohei_bot_branches (
              id, conversation_id, label, is_active, created_by, created_at
            ) VALUES (?, ?, '主线', 1, 'system', ?)`).run(`main:${conversationId}`, conversationId, String(conversation.created_at));
        if (!database.prepare(`SELECT event_id FROM xiaohei_bot_events
             WHERE aggregate_type = 'conversation' AND aggregate_id = ? LIMIT 1`).get(conversationId)) {
          appendXiaoheiBotEvent(database, {
            conversationId,
            eventType: "legacy.conversation.imported",
            occurredAt: String(conversation.created_at),
            actorType: "system",
            aggregateType: "conversation",
            aggregateId: conversationId,
            branchId: `main:${conversationId}`,
            payload: conversation,
            synthetic: true
          });
          imported += 1;
        }
      }
      const messages = database.prepare(`SELECT * FROM xiaohei_bot_messages
           WHERE origin_event_id IS NULL
           ORDER BY conversation_id ASC, seq ASC`).all();
      for (const message of messages) {
        const messageId = String(message.id);
        const conversationId = String(message.conversation_id);
        const mentions = database.prepare(`SELECT mention_type, bot_id, label, token
             FROM xiaohei_bot_message_mentions WHERE message_id = ?`).all(messageId);
        const attachments = database.prepare(`SELECT id, name, size, mime_type, is_image, local_path,
                    asset_id, sha256, integrity_status
             FROM xiaohei_bot_attachments WHERE message_id = ?`).all(messageId);
        const event = appendXiaoheiBotEvent(database, {
          conversationId,
          eventType: "legacy.message.imported",
          occurredAt: String(message.created_at),
          actorType: message.author_type === "user" ? "user" : message.author_type === "bot" ? "bot" : "system",
          actorId: message.author_type === "bot" ? message.author_bot_id : null,
          aggregateType: "message",
          aggregateId: messageId,
          branchId: `main:${conversationId}`,
          payload: {
            message,
            mentions,
            attachments
          },
          searchText: String(message.content ?? ""),
          synthetic: true
        });
        database.prepare(`UPDATE xiaohei_bot_messages
             SET origin_event_id = ?, origin_message_id = COALESCE(origin_message_id, id)
             WHERE id = ?`).run(event.eventId, messageId);
        imported += 1;
      }
      const runs = database.prepare(`SELECT * FROM xiaohei_bot_agent_runs
           WHERE request_event_id IS NULL ORDER BY created_at ASC, id ASC`).all();
      for (const run of runs) {
        const runId = String(run.id);
        const conversationId = String(run.conversation_id);
        const event = appendXiaoheiBotEvent(database, {
          conversationId,
          eventType: "legacy.agent-run.imported",
          occurredAt: String(run.created_at),
          actorType: "runtime",
          actorId: String(run.bot_id),
          aggregateType: "agent-run",
          aggregateId: runId,
          correlationId: runId,
          branchId: `main:${conversationId}`,
          payload: run,
          synthetic: true
        });
        database.prepare(`UPDATE xiaohei_bot_agent_runs SET request_event_id = ? WHERE id = ?`).run(event.eventId, runId);
        imported += 1;
      }
      appendXiaoheiBotEvent(database, {
        streamId: "system:xiaohei-bot-ledger",
        eventType: "legacy.backfill.completed",
        actorType: "system",
        aggregateType: "event-ledger",
        aggregateId: "xiaohei-bot",
        payload: {
          imported
        },
        synthetic: true
      });
      database.prepare(`INSERT INTO settings (key, value, updated_at) VALUES (?, ?, ?)`).run("xiaohei_bot_event_ledger_backfill_v1", JSON.stringify({
        imported,
        completedAt: (/* @__PURE__ */new Date()).toISOString()
      }), (/* @__PURE__ */new Date()).toISOString());
      database.exec("COMMIT");
      return {
        imported,
        alreadyComplete: false
      };
    } catch (error) {
      database.exec("ROLLBACK");
      throw error;
    }
  }
  list(input = {}) {
    const database = getDatabase();
    const values = [];
    const where = [];
    const limit = Math.max(1, Math.min(500, Math.round(input.limit ?? 100)));
    let from = "xiaohei_bot_events events";
    if (input.search?.trim()) {
      from += " JOIN xiaohei_bot_events_fts search ON search.rowid = events.global_seq";
      const terms = input.search.trim().split(/\s+/u).filter(Boolean);
      for (const term of terms) {
        where.push("search.search_text LIKE ? ESCAPE '\\'");
        values.push(`%${term.replaceAll("\\", "\\\\").replaceAll("%", "\\%").replaceAll("_", "\\_")}%`);
      }
    }
    if (input.conversationId) {
      where.push("events.conversation_id = ?");
      values.push(input.conversationId);
    }
    if (input.afterGlobalSeq !== undefined) {
      where.push("events.global_seq > ?");
      values.push(Math.max(0, Math.round(input.afterGlobalSeq)));
    }
    if (input.beforeGlobalSeq !== undefined) {
      where.push("events.global_seq < ?");
      values.push(Math.max(0, Math.round(input.beforeGlobalSeq)));
    }
    if (input.correlationId) {
      where.push("events.correlation_id = ?");
      values.push(input.correlationId);
    }
    if (input.eventTypes?.length) {
      where.push(`events.event_type IN (${input.eventTypes.map(() => "?").join(", ")})`);
      values.push(...input.eventTypes);
    }
    if (input.retentionClasses?.length) {
      where.push(`events.retention_class IN (${input.retentionClasses.map(() => "?").join(", ")})`);
      values.push(...input.retentionClasses);
    }
    const descending = input.afterGlobalSeq === undefined;
    const rows = database.prepare(`SELECT events.* FROM ${from}
         ${where.length ? `WHERE ${where.join(" AND ")}` : ""}
         ORDER BY events.global_seq ${descending ? "DESC" : "ASC"}
         LIMIT ?`).all(...values, limit + 1);
    const hasMore = rows.length > limit;
    const selected = rows.slice(0, limit);
    if (descending) selected.reverse();
    return {
      events: selected.map(mapEvent$1),
      latestGlobalSeq: this.latestGlobalSeq(),
      hasMore
    };
  }
  trace(eventId, windowSize = 5) {
    const event = this.getEvent(eventId);
    if (!event) throw new Error("日志事件不存在");
    const database = getDatabase();
    const size = Math.max(0, Math.min(50, Math.round(windowSize)));
    const before = database.prepare(`SELECT * FROM xiaohei_bot_events
         WHERE stream_id = ? AND stream_seq < ?
         ORDER BY stream_seq DESC LIMIT ?`).all(event.streamId, event.streamSeq, size);
    const after = database.prepare(`SELECT * FROM xiaohei_bot_events
         WHERE stream_id = ? AND stream_seq > ?
         ORDER BY stream_seq ASC LIMIT ?`).all(event.streamId, event.streamSeq, size);
    const sourceRows = event.sourceEventSeqs.length ? database.prepare(`SELECT * FROM xiaohei_bot_events
             WHERE stream_id = ? AND stream_seq IN (${event.sourceEventSeqs.map(() => "?").join(", ")}) ORDER BY stream_seq ASC`).all(event.streamId, ...event.sourceEventSeqs) : [];
    const causedRows = database.prepare(`SELECT * FROM xiaohei_bot_events
         WHERE causation_event_id = ? OR parent_event_id = ?
         ORDER BY global_seq ASC LIMIT 100`).all(event.eventId, event.eventId);
    return {
      event,
      before: before.reverse().map(mapEvent$1),
      after: after.map(mapEvent$1),
      sources: sourceRows.map(mapEvent$1),
      caused: causedRows.map(mapEvent$1)
    };
  }
  verifyIntegrity(conversationId) {
    const database = getDatabase();
    const rows = conversationId ? database.prepare(`SELECT * FROM xiaohei_bot_events
             WHERE stream_id IN (
               SELECT DISTINCT stream_id FROM xiaohei_bot_events
               WHERE conversation_id = ?
             )
             ORDER BY stream_id, stream_seq`).all(conversationId) : database.prepare("SELECT * FROM xiaohei_bot_events ORDER BY stream_id, stream_seq").all();
    const previousByStream = /* @__PURE__ */new Map();
    for (const row of rows) {
      const event = mapEvent$1(row);
      if (sha256(stableStringify(event.payload)) !== event.payloadSha256) return this.integrityFailure(rows, event, "事件内容哈希不匹配");
      const expectedPrevious = previousByStream.get(event.streamId) ?? null;
      if (event.previousEventHash !== expectedPrevious) return this.integrityFailure(rows, event, "事件哈希链断裂");
      if (sha256(eventHashMaterial({
        eventId: event.eventId,
        streamId: event.streamId,
        streamSeq: event.streamSeq,
        conversationId: event.conversationId,
        eventType: event.eventType,
        schemaVersion: event.schemaVersion,
        occurredAt: event.occurredAt,
        actorType: event.actorType,
        actorId: event.actorId,
        aggregateType: event.aggregateType,
        aggregateId: event.aggregateId,
        correlationId: event.correlationId,
        causationEventId: event.causationEventId,
        parentEventId: event.parentEventId,
        branchId: event.branchId,
        retentionClass: event.retentionClass,
        sourceEventSeqs: event.sourceEventSeqs,
        payloadSha256: event.payloadSha256,
        previousEventHash: event.previousEventHash,
        synthetic: event.synthetic
      })) !== event.eventHash) return this.integrityFailure(rows, event, "事件封装哈希不匹配");
      previousByStream.set(event.streamId, event.eventHash);
    }
    const sequenceRange = eventSequenceRange(rows);
    return {
      ok: true,
      checkedEvents: rows.length,
      firstGlobalSeq: sequenceRange.first,
      lastGlobalSeq: sequenceRange.last,
      brokenEventId: null,
      reason: null
    };
  }
  integrityFailure(rows, event, reason) {
    const sequenceRange = eventSequenceRange(rows);
    return {
      ok: false,
      checkedEvents: rows.findIndex(row => row.event_id === event.eventId) + 1,
      firstGlobalSeq: sequenceRange.first,
      lastGlobalSeq: event.globalSeq,
      brokenEventId: event.eventId,
      reason
    };
  }
  createSnapshot(conversationId) {
    const database = getDatabase();
    const conversation = database.prepare("SELECT * FROM xiaohei_bot_conversations WHERE id = ?").get(conversationId);
    if (!conversation) throw new Error("会话不存在");
    const members = database.prepare(`SELECT * FROM xiaohei_bot_conversation_members
         WHERE conversation_id = ? ORDER BY joined_at ASC`).all(conversationId);
    const messages = database.prepare(`SELECT id, seq, author_type, author_bot_id, content, process_items_json,
                status, reply_to_message_id, causal_root_message_id, hop_depth,
                error_message, revision, withdrawn_at, created_at, updated_at
         FROM xiaohei_bot_messages WHERE conversation_id = ? ORDER BY seq ASC`).all(conversationId);
    const mentions = database.prepare(`SELECT mentions.* FROM xiaohei_bot_message_mentions mentions
         JOIN xiaohei_bot_messages messages ON messages.id = mentions.message_id
         WHERE messages.conversation_id = ? ORDER BY messages.seq ASC`).all(conversationId);
    const attachments = database.prepare(`SELECT attachments.id, attachments.message_id, attachments.name,
                attachments.size, attachments.mime_type, attachments.is_image,
                attachments.asset_id, attachments.sha256,
                attachments.integrity_status, attachments.verified_at
         FROM xiaohei_bot_attachments attachments
         JOIN xiaohei_bot_messages messages ON messages.id = attachments.message_id
         WHERE messages.conversation_id = ? ORDER BY messages.seq ASC`).all(conversationId);
    const sessions = database.prepare(`SELECT bot_id, conversation_id, pi_session_id, pi_session_file,
                pi_leaf_entry_id, last_seen_seq, identity_version, provider_id,
                model_id, last_event_global_seq, recovery_state, created_at, updated_at
         FROM xiaohei_bot_sessions WHERE conversation_id = ?`).all(conversationId);
    const throughGlobalSeq = Number(database.prepare(`SELECT COALESCE(MAX(global_seq), 0) AS seq
             FROM xiaohei_bot_events WHERE conversation_id = ?`).get(conversationId).seq);
    if (throughGlobalSeq === 0) return null;
    const stateJson = stableStringify(redactAndNormalize({
      conversation,
      members,
      messages,
      mentions,
      attachments,
      sessions
    }));
    const stateSha256 = sha256(stateJson);
    const createdAt = (/* @__PURE__ */new Date()).toISOString();
    return {
      throughGlobalSeq,
      stateSha256,
      createdAt,
      created: database.prepare(`INSERT OR IGNORE INTO xiaohei_bot_event_snapshots (
          conversation_id, through_global_seq, state_json, state_sha256, created_at
        ) VALUES (?, ?, ?, ?, ?)`).run(conversationId, throughGlobalSeq, stateJson, stateSha256, createdAt).changes > 0
    };
  }
  maybeCreateSnapshot(conversationId, interval = 100) {
    const database = getDatabase();
    const current = Number(database.prepare(`SELECT COALESCE(MAX(global_seq), 0) AS seq
             FROM xiaohei_bot_events WHERE conversation_id = ?`).get(conversationId).seq);
    const previous = Number(database.prepare(`SELECT COALESCE(MAX(through_global_seq), 0) AS seq
             FROM xiaohei_bot_event_snapshots WHERE conversation_id = ?`).get(conversationId).seq);
    if (current === 0 || current - previous < Math.max(10, interval)) return false;
    this.createSnapshot(conversationId);
    return true;
  }
  appendDiagnosticChunk(input) {
    return this.appendDiagnosticChunks([input])[0];
  }
  appendDiagnosticChunks(inputs) {
    if (inputs.length === 0) return [];
    const database = getDatabase();
    const traceIds = [];
    const statement = database.prepare(`INSERT INTO xiaohei_bot_diagnostic_chunks (
          trace_id, conversation_id, run_id, message_id, item_id, kind,
          chunk_seq, occurred_at, payload_json, payload_sha256, expires_at
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`);
    database.exec("BEGIN IMMEDIATE");
    try {
      for (const input of inputs) {
        const traceId = randomUUID();
        const payloadJson = stableStringify(redactAndNormalize(input.payload));
        statement.run(traceId, input.conversationId, input.runId, input.messageId ?? null, input.itemId ?? null, input.kind, input.chunkSeq, input.occurredAt ?? (/* @__PURE__ */new Date()).toISOString(), payloadJson, sha256(payloadJson), input.expiresAt ?? null);
        traceIds.push(traceId);
      }
      database.exec("COMMIT");
      return traceIds;
    } catch (error) {
      database.exec("ROLLBACK");
      throw error;
    }
  }
  listDiagnosticChunks(runId) {
    return getDatabase().prepare(`SELECT trace_id, item_id, kind, chunk_seq, occurred_at,
                payload_json, payload_sha256
         FROM xiaohei_bot_diagnostic_chunks
         WHERE run_id = ? ORDER BY chunk_seq ASC`).all(runId).map(row => ({
      traceId: row.trace_id,
      itemId: row.item_id,
      kind: row.kind,
      chunkSeq: Number(row.chunk_seq),
      occurredAt: row.occurred_at,
      payload: parseJsonObject(row.payload_json),
      payloadSha256: row.payload_sha256
    }));
  }
  pruneDiagnosticEvents(retentionDays) {
    if (!Number.isFinite(retentionDays) || retentionDays < 1) return 0;
    const now = (/* @__PURE__ */new Date()).toISOString();
    const cutoff = (/* @__PURE__ */new Date(Date.now() - retentionDays * 864e5)).toISOString();
    const statement = getDatabase().prepare(`DELETE FROM xiaohei_bot_diagnostic_chunks
       WHERE trace_id IN (
         SELECT trace_id FROM xiaohei_bot_diagnostic_chunks
         WHERE (expires_at IS NOT NULL AND expires_at <= ?)
            OR (expires_at IS NULL AND occurred_at < ?)
         LIMIT 2000
       )`);
    let total = 0;
    for (;;) {
      const changes = Number(statement.run(now, cutoff).changes);
      total += changes;
      if (changes < 2e3) return total;
    }
  }
  exportJsonl(conversationId) {
    const database = getDatabase();
    const allEvents = (conversationId ? database.prepare(`SELECT * FROM xiaohei_bot_events
             WHERE conversation_id = ? ORDER BY global_seq ASC`).all(conversationId) : database.prepare("SELECT * FROM xiaohei_bot_events ORDER BY global_seq ASC").all()).map(mapEvent$1);
    const assets = conversationId ? database.prepare(`SELECT DISTINCT assets.asset_id, assets.sha256, assets.storage_key,
                    assets.size, assets.mime_type, assets.integrity_status
             FROM xiaohei_bot_assets assets
             JOIN xiaohei_bot_attachments attachments ON attachments.asset_id = assets.asset_id
             JOIN xiaohei_bot_messages messages ON messages.id = attachments.message_id
             WHERE messages.conversation_id = ? ORDER BY assets.asset_id`).all(conversationId) : database.prepare(`SELECT asset_id, sha256, storage_key, size, mime_type, integrity_status
             FROM xiaohei_bot_assets ORDER BY asset_id`).all();
    const manifest = {
      type: "xiaohei-bot-log-manifest",
      formatVersion: 1,
      exportedAt: (/* @__PURE__ */new Date()).toISOString(),
      conversationId: conversationId ?? null,
      eventCount: allEvents.length,
      assetCount: assets.length,
      assets
    };
    return {
      content: [JSON.stringify(manifest), ...allEvents.map(event => JSON.stringify(event))].join("\n"),
      eventCount: allEvents.length,
      assetCount: assets.length
    };
  }
};
var xiaoheiBotEventLogRepository = new XiaoheiBotEventLogRepository();
//#endregion
//#region electron/repositories/xiaohei-bot.repository.ts
function now() {
  return (/* @__PURE__ */new Date()).toISOString();
}
function activeBranchId(database, conversationId) {
  return database.prepare(`SELECT id FROM xiaohei_bot_branches
       WHERE conversation_id = ? AND is_active = 1
       ORDER BY created_at DESC LIMIT 1`).get(conversationId)?.id ?? `main:${conversationId}`;
}
function ensureMainBranch(database, conversationId, createdAt) {
  const branchId = `main:${conversationId}`;
  database.prepare(`INSERT OR IGNORE INTO xiaohei_bot_branches (
        id, conversation_id, label, is_active, created_by, created_at
      ) VALUES (?, ?, '主线', 1, 'system', ?)`).run(branchId, conversationId, createdAt);
  return branchId;
}
function parseStringArray(value) {
  try {
    const parsed = JSON.parse(value);
    return Array.isArray(parsed) ? parsed.filter(item => typeof item === "string") : [];
  } catch {
    return [];
  }
}
function parseJsonRecord(value) {
  if (typeof value !== "string" || !value.trim()) return null;
  try {
    const parsed = JSON.parse(value);
    return parsed && typeof parsed === "object" && !Array.isArray(parsed) ? parsed : null;
  } catch {
    return null;
  }
}
function parseJsonValue(value) {
  if (typeof value !== "string" || !value.trim()) return null;
  try {
    return JSON.parse(value);
  } catch {
    return value;
  }
}
function parseProcessItems(value) {
  try {
    const parsed = JSON.parse(value ?? "[]");
    if (!Array.isArray(parsed)) return [];
    const validStatuses = /* @__PURE__ */new Set(["streaming", "running", "completed", "failed", "cancelled"]);
    return parsed.filter(item => {
      if (!item || typeof item !== "object") return false;
      const candidate = item;
      return typeof candidate.id === "string" && (candidate.kind === "thinking" || candidate.kind === "text" || candidate.kind === "tool") && validStatuses.has(candidate.status) && typeof candidate.content === "string" && typeof candidate.startedAt === "string";
    });
  } catch {
    return [];
  }
}
function ensureLegacyTimelineText(row, items) {
  if (row.author_type !== "bot" || !row.content.trim() || items.some(item => item.kind === "text")) return items;
  const status = row.status === "complete" ? "completed" : row.status === "failed" || row.status === "cancelled" ? row.status : "streaming";
  const terminal = status !== "streaming";
  return [...items, {
    id: `legacy-text:${row.id}`,
    kind: "text",
    status,
    content: row.content,
    startedAt: row.updated_at,
    completedAt: terminal ? row.updated_at : null,
    durationMs: terminal ? 0 : null
  }];
}
var ALL_THINKING_LEVELS = ["off", "minimal", "low", "medium", "high", "xhigh", "max"];
var DEFAULT_REASONING_THINKING_LEVELS = ["off", "minimal", "low", "medium", "high"];
function modelThinkingLevels(reasoning, providerId, requestedLevels) {
  if (!reasoning) return ["off"];
  const normalized = ALL_THINKING_LEVELS.filter(level => requestedLevels?.includes(level));
  if (normalized.length > 0) return normalized;
  if (reasoning && providerId === "xiaohei-bot-glm-cloud") return ["low", "high", "max"];
  if (reasoning && providerId === "xiaohei-bot-cloud") return ["off", "low", "high", "max"];
  return [...DEFAULT_REASONING_THINKING_LEVELS];
}
function clampThinkingLevel(requested, supportedLevels) {
  if (supportedLevels.includes(requested)) return requested;
  const requestedIndex = ALL_THINKING_LEVELS.indexOf(requested);
  if (requestedIndex < 0) return supportedLevels[0] ?? "off";
  for (let index = requestedIndex; index < ALL_THINKING_LEVELS.length; index += 1) {
    const candidate = ALL_THINKING_LEVELS[index];
    if (supportedLevels.includes(candidate)) return candidate;
  }
  for (let index = requestedIndex - 1; index >= 0; index -= 1) {
    const candidate = ALL_THINKING_LEVELS[index];
    if (supportedLevels.includes(candidate)) return candidate;
  }
  return supportedLevels[0] ?? "off";
}
function mapBot(row) {
  return {
    id: row.id,
    name: row.name,
    description: row.description,
    responseStyle: row.response_style,
    tags: parseStringArray(row.tags_json),
    providerId: row.provider_id,
    modelId: row.model_id,
    thinkingLevel: row.thinking_level,
    permissionMode: row.permission_mode,
    managementPermissions: JSON.parse(row.management_permissions_json || "{\"createBots\":true,\"manageGroups\":true}"),
    creatorBotId: row.creator_bot_id,
    sourceConversationId: row.source_conversation_id,
    workingDirectory: row.working_directory,
    workingDirectoryIsCustom: row.working_directory_is_custom === 1,
    isBuiltin: row.is_builtin === 1,
    profileCompletion: JSON.parse(row.profile_completion_json || "{\"name\":false,\"description\":true,\"tags\":true}"),
    identityVersion: row.identity_version,
    avatar: row.avatar ?? undefined,
    avatarColor: row.avatar_color ?? undefined,
    avatarShape: row.avatar_shape ?? undefined,
    createdAt: row.created_at,
    updatedAt: row.updated_at
  };
}
var XiaoheiBotRepository = class {
  listProviders() {
    const database = getDatabase();
    const providers = database.prepare("SELECT * FROM xiaohei_bot_model_providers ORDER BY is_builtin DESC, created_at ASC").all();
    const modelStatement = database.prepare(`
      SELECT * FROM xiaohei_bot_models WHERE provider_id = ? ORDER BY created_at ASC
    `);
    return providers.map(provider => {
      const models = modelStatement.all(provider.id);
      return {
        id: provider.id,
        name: provider.name,
        api: provider.api,
        baseUrl: provider.base_url,
        authType: provider.auth_type,
        kind: provider.provider_kind,
        runtimeProviderId: provider.runtime_provider_id,
        isSubscription: provider.is_subscription === 1,
        isBuiltin: provider.is_builtin === 1,
        hasCredential: provider.is_builtin === 1 || provider.auth_type === "none" || (provider.runtime_provider_id ? this.hasProviderCredential(provider.runtime_provider_id) : false) || Boolean(provider.encrypted_credential && decryptCredential(provider.encrypted_credential)),
        models: models.map(model => ({
          id: model.id,
          name: model.name,
          api: model.api ?? provider.api,
          reasoning: model.reasoning === 1,
          vision: model.vision === 1,
          thinkingLevels: modelThinkingLevels(model.reasoning === 1, provider.id, model.thinking_levels_json ? parseStringArray(model.thinking_levels_json) : undefined),
          contextWindow: model.context_window,
          maxTokens: model.max_tokens
        })),
        createdAt: provider.created_at,
        updatedAt: provider.updated_at
      };
    });
  }
  getProvider(providerId) {
    return this.listProviders().find(provider => provider.id === providerId) ?? null;
  }
  getProviderCredential(providerId) {
    const row = getDatabase().prepare("SELECT encrypted_credential FROM xiaohei_bot_model_providers WHERE id = ?").get(providerId);
    if (!row?.encrypted_credential) return "";
    return decryptCredential(row.encrypted_credential);
  }
  listProviderCredentials() {
    const rows = getDatabase().prepare(`SELECT provider_id, encrypted_credential
         FROM xiaohei_bot_provider_credentials
         ORDER BY provider_id ASC`).all();
    const credentials = [];
    for (const row of rows) try {
      const parsed = JSON.parse(decryptCredential(row.encrypted_credential));
      if (parsed?.type !== "api_key" && parsed?.type !== "oauth") continue;
      credentials.push({
        providerId: row.provider_id,
        credential: parsed
      });
    } catch {}
    return credentials;
  }
  hasProviderCredential(providerId) {
    return Boolean(getDatabase().prepare(`SELECT 1 FROM xiaohei_bot_provider_credentials
           WHERE provider_id = ? LIMIT 1`).get(providerId));
  }
  saveProviderCredential(providerId, credential) {
    const timestamp = now();
    getDatabase().prepare(`INSERT INTO xiaohei_bot_provider_credentials (
           provider_id, credential_type, encrypted_credential, created_at, updated_at
         ) VALUES (?, ?, ?, ?, ?)
         ON CONFLICT(provider_id) DO UPDATE SET
           credential_type = excluded.credential_type,
           encrypted_credential = excluded.encrypted_credential,
           updated_at = excluded.updated_at`).run(providerId, credential.type, encryptCredential(JSON.stringify(credential)), timestamp, timestamp);
  }
  deleteProviderCredential(providerId) {
    getDatabase().prepare("DELETE FROM xiaohei_bot_provider_credentials WHERE provider_id = ?").run(providerId);
  }
  saveProvider(input) {
    const database = getDatabase();
    const timestamp = now();
    const providerId = input.id || this.uniqueProviderId(input.name);
    const existing = database.prepare("SELECT encrypted_credential, created_at, is_builtin FROM xiaohei_bot_model_providers WHERE id = ?").get(providerId);
    const previousProvider = this.getProvider(providerId);
    if (existing?.is_builtin === 1) throw new Error(appText("botRepo.builtinReadOnly"));
    const encryptedCredential = input.authType === "none" ? "" : input.apiKey === undefined ? existing?.encrypted_credential ?? "" : input.apiKey.trim() ? encryptCredential(input.apiKey.trim()) : "";
    database.exec("BEGIN");
    try {
      database.prepare(`
        INSERT INTO xiaohei_bot_model_providers (
          id, name, api, base_url, auth_type, encrypted_credential, created_at, updated_at
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        ON CONFLICT(id) DO UPDATE SET
          name = excluded.name,
          api = excluded.api,
          base_url = excluded.base_url,
          auth_type = excluded.auth_type,
          encrypted_credential = excluded.encrypted_credential,
          updated_at = excluded.updated_at
      `).run(providerId, input.name.trim(), input.api, input.baseUrl.trim().replace(/\/+$/u, ""), input.authType, encryptedCredential, existing?.created_at ?? timestamp, timestamp);
      const keepModelIds = /* @__PURE__ */new Set();
      const upsertModel = database.prepare(`
        INSERT INTO xiaohei_bot_models (
          provider_id, id, name, api, thinking_levels_json, reasoning, vision,
          context_window, max_tokens, created_at, updated_at
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        ON CONFLICT(provider_id, id) DO UPDATE SET
          name = excluded.name,
          api = excluded.api,
          thinking_levels_json = excluded.thinking_levels_json,
          reasoning = excluded.reasoning,
          vision = excluded.vision,
          context_window = excluded.context_window,
          max_tokens = excluded.max_tokens,
          updated_at = excluded.updated_at
      `);
      for (const model of input.models) {
        const modelId = model.id.trim();
        if (!modelId || keepModelIds.has(modelId)) continue;
        keepModelIds.add(modelId);
        upsertModel.run(providerId, modelId, model.name.trim() || modelId, input.api, JSON.stringify(modelThinkingLevels(model.reasoning, providerId, model.thinkingLevels)), model.reasoning ? 1 : 0, model.vision ? 1 : 0, Math.max(4096, Math.round(model.contextWindow ?? 128e3)), Math.max(512, Math.round(model.maxTokens ?? 4096)), timestamp, timestamp);
      }
      const currentModels = database.prepare("SELECT id FROM xiaohei_bot_models WHERE provider_id = ?").all(providerId);
      const deleteModel = database.prepare("DELETE FROM xiaohei_bot_models WHERE provider_id = ? AND id = ?");
      for (const model of currentModels) if (!keepModelIds.has(model.id)) deleteModel.run(providerId, model.id);
      const updatedProvider = this.getProvider(providerId);
      if (!updatedProvider) throw new Error(appText("botRepo.providerSaveFailed"));
      appendXiaoheiBotEvent(database, {
        streamId: `provider:${providerId}`,
        eventType: existing ? "provider.updated" : "provider.created",
        occurredAt: timestamp,
        actorType: "user",
        aggregateType: "model-provider",
        aggregateId: providerId,
        retentionClass: "security",
        payload: {
          before: previousProvider,
          after: updatedProvider,
          credentialPresent: input.authType === "none" || Boolean(encryptedCredential)
        }
      });
      database.exec("COMMIT");
    } catch (error) {
      database.exec("ROLLBACK");
      throw error;
    }
    const provider = this.getProvider(providerId);
    if (!provider) throw new Error(appText("botRepo.providerSaveFailed"));
    return provider;
  }
  syncNativeProvider(catalog) {
    if (!catalog.supportsOAuth || catalog.models.length === 0) throw new Error(appText("botRepo.accountNoModels"));
    const database = getDatabase();
    const providerId = `pi:${catalog.providerId}`;
    const timestamp = now();
    const existing = database.prepare(`SELECT created_at FROM xiaohei_bot_model_providers WHERE id = ?`).get(providerId);
    const firstModel = catalog.models[0];
    const providerApi = firstModel.api === "openai-codex-responses" ? "openai-responses" : firstModel.api;
    database.exec("BEGIN IMMEDIATE");
    try {
      database.prepare(`INSERT INTO xiaohei_bot_model_providers (
             id, name, api, base_url, auth_type, encrypted_credential,
             is_builtin, provider_kind, runtime_provider_id, is_subscription,
             created_at, updated_at
           ) VALUES (?, ?, ?, ?, 'oauth', '', 0, 'pi-native', ?, ?, ?, ?)
           ON CONFLICT(id) DO UPDATE SET
             name = excluded.name,
             api = excluded.api,
             base_url = excluded.base_url,
             auth_type = 'oauth',
             encrypted_credential = '',
             provider_kind = 'pi-native',
             runtime_provider_id = excluded.runtime_provider_id,
             is_subscription = excluded.is_subscription,
             updated_at = excluded.updated_at`).run(providerId, catalog.name, providerApi, catalog.baseUrl, catalog.providerId, catalog.isSubscription ? 1 : 0, existing?.created_at ?? timestamp, timestamp);
      const keepModelIds = /* @__PURE__ */new Set();
      const upsertModel = database.prepare(`INSERT INTO xiaohei_bot_models (
           provider_id, id, name, api, thinking_levels_json, reasoning, vision,
           context_window, max_tokens, created_at, updated_at
         ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
         ON CONFLICT(provider_id, id) DO UPDATE SET
           name = excluded.name,
           api = excluded.api,
           thinking_levels_json = excluded.thinking_levels_json,
           reasoning = excluded.reasoning,
           vision = excluded.vision,
           context_window = excluded.context_window,
           max_tokens = excluded.max_tokens,
           updated_at = excluded.updated_at`);
      for (const model of catalog.models) {
        if (!model.id || keepModelIds.has(model.id)) continue;
        keepModelIds.add(model.id);
        upsertModel.run(providerId, model.id, model.name || model.id, model.api, JSON.stringify(model.thinkingLevels), model.reasoning ? 1 : 0, model.vision ? 1 : 0, model.contextWindow, model.maxTokens, timestamp, timestamp);
      }
      const deleteModel = database.prepare("DELETE FROM xiaohei_bot_models WHERE provider_id = ? AND id = ?");
      const existingModels = database.prepare("SELECT id FROM xiaohei_bot_models WHERE provider_id = ?").all(providerId);
      for (const model of existingModels) if (!keepModelIds.has(model.id)) deleteModel.run(providerId, model.id);
      database.exec("COMMIT");
    } catch (error) {
      database.exec("ROLLBACK");
      throw error;
    }
    const provider = this.getProvider(providerId);
    if (!provider) throw new Error(appText("botRepo.accountCatalogSyncFailed"));
    return provider;
  }
  deleteProvider(providerId) {
    const database = getDatabase();
    const provider = this.getProvider(providerId);
    if (!provider) throw new Error(appText("botRepo.providerMissing"));
    if (provider.isBuiltin) throw new Error(appText("botRepo.builtinCannotDelete"));
    const timestamp = now();
    database.exec("BEGIN IMMEDIATE");
    try {
      appendXiaoheiBotEvent(database, {
        streamId: `provider:${providerId}`,
        eventType: "provider.deleted",
        occurredAt: timestamp,
        actorType: "user",
        aggregateType: "model-provider",
        aggregateId: providerId,
        retentionClass: "security",
        payload: {
          provider
        }
      });
      database.prepare("DELETE FROM xiaohei_bot_model_providers WHERE id = ?").run(providerId);
      database.exec("COMMIT");
    } catch (error) {
      database.exec("ROLLBACK");
      throw error;
    }
  }
  syncBuiltinCatalog(providers, defaultModel, migrateLegacyDefault = false) {
    const database = getDatabase();
    database.exec("SAVEPOINT builtin_catalog");
    try {
      for (const provider of providers) this.syncBuiltinProvider(provider);
      if (defaultModel && this.getProvider(defaultModel.providerId)?.models.some(model => model.id === defaultModel.modelId)) {
        const policy = database.prepare("SELECT cloud_default_model_migration_version AS version FROM xiaohei_bot_settings WHERE id = 1").get();
        const migrate = migrateLegacyDefault && policy.version < 1;
        for (const bot of this.listBots()) {
          if (!(migrate && bot.providerId === "xiaohei-bot-cloud" && bot.modelId === "deepseek-v4-flash-vision-exp") && (bot.providerId || bot.modelId)) continue;
          this.updateBot({
            ...bot,
            botId: bot.id,
            ...defaultModel
          });
        }
        if (migrate) database.prepare("UPDATE xiaohei_bot_settings SET cloud_default_model_migration_version = 1 WHERE id = 1").run();
      }
      database.exec("RELEASE builtin_catalog");
    } catch (error) {
      database.exec("ROLLBACK TO builtin_catalog; RELEASE builtin_catalog");
      throw error;
    }
  }
  syncBuiltinProvider(input) {
    const providerId = input.id.trim();
    if (!["xiaohei-bot-cloud", "xiaohei-bot-glm-cloud"].includes(providerId)) throw new Error("内置模型供应商标识无效");
    const database = getDatabase();
    const timestamp = now();
    database.exec("SAVEPOINT builtin_provider");
    try {
      database.prepare(`
          INSERT INTO xiaohei_bot_model_providers (
            id, name, api, base_url, auth_type, encrypted_credential, is_builtin, provider_kind, created_at, updated_at
          ) VALUES (?, ?, ?, ?, 'api-key', '', 1, 'managed', ?, ?)
          ON CONFLICT(id) DO UPDATE SET
            name = excluded.name,
            api = excluded.api,
            base_url = excluded.base_url,
            auth_type = excluded.auth_type,
            encrypted_credential = '',
            is_builtin = 1,
            provider_kind = 'managed',
            updated_at = excluded.updated_at
        `).run(providerId, input.name.trim() || appText("botRepo.builtinProviderName"), input.api, input.baseUrl.trim().replace(/\/+$/u, ""), timestamp, timestamp);
      const upsertModel = database.prepare(`
        INSERT INTO xiaohei_bot_models (
          provider_id, id, name, api, thinking_levels_json, reasoning, vision,
          context_window, max_tokens, created_at, updated_at
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        ON CONFLICT(provider_id, id) DO UPDATE SET
          name = excluded.name,
          api = excluded.api,
          thinking_levels_json = excluded.thinking_levels_json,
          reasoning = excluded.reasoning,
          vision = excluded.vision,
          context_window = excluded.context_window,
          max_tokens = excluded.max_tokens,
          updated_at = excluded.updated_at
      `);
      const keepModelIds = /* @__PURE__ */new Set();
      for (const model of input.models) {
        const modelId = model.id.trim();
        if (!modelId || keepModelIds.has(modelId)) continue;
        keepModelIds.add(modelId);
        upsertModel.run(providerId, modelId, model.name.trim() || modelId, model.api ?? input.api, JSON.stringify(modelThinkingLevels(model.reasoning, providerId, model.thinkingLevels)), model.reasoning ? 1 : 0, model.vision ? 1 : 0, Math.max(4096, Math.round(model.contextWindow)), Math.max(256, Math.round(model.maxTokens)), timestamp, timestamp);
      }
      const currentModels = database.prepare("SELECT id FROM xiaohei_bot_models WHERE provider_id = ?").all(providerId);
      const deleteModel = database.prepare("DELETE FROM xiaohei_bot_models WHERE provider_id = ? AND id = ?");
      for (const model of currentModels) if (!keepModelIds.has(model.id)) deleteModel.run(providerId, model.id);
      database.exec("RELEASE builtin_provider");
    } catch (error) {
      database.exec("ROLLBACK TO builtin_provider; RELEASE builtin_provider");
      throw error;
    }
    const provider = this.getProvider(providerId);
    if (!provider) throw new Error(appText("botRepo.builtinSyncFailed"));
    return provider;
  }
  uniqueProviderId(name) {
    const base = name.trim().toLocaleLowerCase().replace(/[^a-z0-9]+/gu, "-").replace(/^-+|-+$/gu, "") || `provider-${Date.now()}`;
    const database = getDatabase();
    let candidate = base;
    let suffix = 2;
    while (database.prepare("SELECT 1 FROM xiaohei_bot_model_providers WHERE id = ?").get(candidate)) {
      candidate = `${base}-${suffix}`;
      suffix += 1;
    }
    return candidate;
  }
  listBots() {
    return getDatabase().prepare(`SELECT * FROM xiaohei_bot_profiles WHERE deleted_at IS NULL
           ORDER BY is_builtin DESC, created_at ASC`).all().map(mapBot);
  }
  getBot(botId) {
    const row = getDatabase().prepare("SELECT * FROM xiaohei_bot_profiles WHERE id = ? AND deleted_at IS NULL").get(botId);
    return row ? mapBot(row) : null;
  }
  createBot(input, actor) {
    const database = getDatabase();
    const timestamp = now();
    const botId = randomUUID();
    const conversationId = `direct-${botId}`;
    const configuredModel = this.getProvider(input.providerId)?.models.find(model => model.id === input.modelId);
    if (!configuredModel) throw new Error(appText("botRepo.modelUnavailable"));
    const thinkingLevel = clampThinkingLevel(input.thinkingLevel ?? "medium", configuredModel.thinkingLevels);
    database.exec("SAVEPOINT management_createBot");
    try {
      database.prepare(`
        INSERT INTO xiaohei_bot_profiles (
          id, name, description, response_style, tags_json,
          avatar, avatar_color, avatar_shape, provider_id, model_id, thinking_level,
          permission_mode, is_builtin, identity_version, created_at, updated_at
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 0, 1, ?, ?)
      `).run(botId, input.name.trim(), input.description.trim(), input.responseStyle, JSON.stringify(input.tags), input.avatar ?? null, input.avatarColor ?? null, input.avatarShape ?? null, input.providerId, input.modelId, thinkingLevel, input.permissionMode ?? "full", timestamp, timestamp);
      database.prepare(`
        INSERT INTO xiaohei_bot_conversations (
          id, kind, title, description, avatar, avatar_color, avatar_shape,
          notifications_enabled, direct_bot_id, default_bot_id, created_at, updated_at
        ) VALUES (?, 'direct', ?, ?, ?, ?, ?, 1, ?, ?, ?, ?)
      `).run(conversationId, input.name.trim(), input.description.trim(), input.avatar ?? null, input.avatarColor ?? null, input.avatarShape ?? null, botId, botId, timestamp, timestamp);
      database.prepare(`
        INSERT INTO xiaohei_bot_conversation_members (
          conversation_id, bot_id, participation_mode, is_default_responder, joined_message_seq, joined_at
        ) VALUES (?, ?, 'auto', 1, 0, ?)
      `).run(conversationId, botId, timestamp);
      if (actor) {
        database.prepare("UPDATE xiaohei_bot_profiles SET creator_bot_id = ?, source_conversation_id = ? WHERE id = ?").run(actor.botId, actor.sourceConversationId, botId);
        database.prepare("UPDATE xiaohei_bot_conversations SET creator_bot_id = ?, source_conversation_id = ? WHERE id = ?").run(actor.botId, actor.sourceConversationId, conversationId);
      }
      database.prepare("UPDATE xiaohei_bot_profiles SET management_permissions_json = ? WHERE id = ?").run(JSON.stringify({
        createBots: true,
        manageGroups: true
      }), botId);
      database.prepare("UPDATE xiaohei_bot_profiles SET profile_completion_json = ? WHERE id = ?").run(JSON.stringify(!actor && input.profileCompletion ? input.profileCompletion : {
        name: false,
        description: true,
        tags: true
      }), botId);
      const branchId = ensureMainBranch(database, conversationId, timestamp);
      const botEvent = appendXiaoheiBotEvent(database, {
        streamId: `bot:${botId}`,
        conversationId,
        eventType: "bot.created",
        occurredAt: timestamp,
        actorType: actor ? "bot" : "user",
        actorId: actor?.botId,
        aggregateType: "bot",
        aggregateId: botId,
        branchId,
        payload: {
          id: botId,
          name: input.name.trim(),
          description: input.description.trim(),
          responseStyle: input.responseStyle,
          tags: input.tags,
          providerId: input.providerId,
          modelId: input.modelId,
          thinkingLevel,
          permissionMode: input.permissionMode ?? "full"
        }
      });
      appendXiaoheiBotEvent(database, {
        conversationId,
        eventType: "conversation.created",
        occurredAt: timestamp,
        actorType: actor ? "bot" : "user",
        actorId: actor?.botId,
        aggregateType: "conversation",
        aggregateId: conversationId,
        causationEventId: botEvent.eventId,
        branchId,
        payload: {
          id: conversationId,
          kind: "direct",
          title: input.name.trim(),
          directBotId: botId,
          defaultBotId: botId,
          memberBotIds: [botId]
        }
      });
      database.exec("RELEASE management_createBot");
    } catch (error) {
      database.exec("ROLLBACK TO management_createBot; RELEASE management_createBot");
      throw error;
    }
    const bot = this.getBot(botId);
    const conversation = this.getConversation(conversationId);
    if (!bot || !conversation) throw new Error(appText("botRepo.botCreateFailed"));
    return {
      bot,
      conversation
    };
  }
  updateBot(input, actor, allowManagementPermissions = false) {
    const previous = this.getBot(input.botId);
    if (!previous) throw new Error(appText("botMain.botMissing"));
    if (input.expectedIdentityVersion !== undefined && previous.identityVersion !== input.expectedIdentityVersion) throw new Error(appText("botRepo.profileChanged"));
    const completion = {
      name: false,
      description: true,
      tags: true,
      ...previous.profileCompletion,
      ...(!actor ? input.profileCompletion : undefined)
    };
    const timestamp = now();
    const database = getDatabase();
    const configuredModel = this.getProvider(input.providerId)?.models.find(model => model.id === input.modelId);
    if (!configuredModel) throw new Error(appText("botRepo.modelUnavailable"));
    const thinkingLevel = clampThinkingLevel(input.thinkingLevel, configuredModel.thinkingLevels);
    database.exec("SAVEPOINT management_updateBot");
    try {
      if (database.prepare(`
        UPDATE xiaohei_bot_profiles SET
          name = ?, description = ?, response_style = ?, tags_json = ?,
          avatar = ?, avatar_color = ?, avatar_shape = ?, provider_id = ?, model_id = ?,
          thinking_level = ?, permission_mode = ?, identity_version = identity_version + 1,
          updated_at = ?
        WHERE id = ? AND deleted_at IS NULL
      `).run(input.name.trim(), input.description.trim(), input.responseStyle, JSON.stringify(input.tags), input.avatar ?? null, input.avatarColor ?? null, input.avatarShape ?? null, input.providerId, input.modelId, thinkingLevel, input.permissionMode, timestamp, input.botId).changes === 0) throw new Error(appText("botMain.botMissing"));
      database.prepare("UPDATE xiaohei_bot_profiles SET profile_completion_json = ? WHERE id = ?").run(JSON.stringify(completion), input.botId);
      if (input.managementPermissions && (!actor || allowManagementPermissions)) database.prepare("UPDATE xiaohei_bot_profiles SET management_permissions_json = ? WHERE id = ?").run(JSON.stringify(input.managementPermissions), input.botId);
      database.prepare(`
        UPDATE xiaohei_bot_conversations SET
          title = ?, description = ?, avatar = ?, avatar_color = ?, avatar_shape = ?, updated_at = ?
        WHERE kind = 'direct' AND direct_bot_id = ? AND is_consultation = 0 AND parent_conversation_id IS NULL
      `).run(input.name.trim(), input.description.trim(), input.avatar ?? null, input.avatarColor ?? null, input.avatarShape ?? null, timestamp, input.botId);
      const directConversation = database.prepare(`SELECT id FROM xiaohei_bot_conversations
           WHERE kind = 'direct' AND direct_bot_id = ? AND is_consultation = 0 AND parent_conversation_id IS NULL LIMIT 1`).get(input.botId);
      appendXiaoheiBotEvent(database, {
        streamId: `bot:${input.botId}`,
        conversationId: directConversation?.id ?? null,
        eventType: "bot.updated",
        occurredAt: timestamp,
        actorType: actor ? "bot" : "user",
        actorId: actor?.botId,
        aggregateType: "bot",
        aggregateId: input.botId,
        branchId: directConversation ? activeBranchId(database, directConversation.id) : null,
        payload: {
          name: input.name.trim(),
          description: input.description.trim(),
          responseStyle: input.responseStyle,
          tags: input.tags,
          providerId: input.providerId,
          modelId: input.modelId,
          thinkingLevel,
          permissionMode: input.permissionMode,
          managementPermissions: input.managementPermissions ?? this.getBot(input.botId)?.managementPermissions
        }
      });
      database.exec("RELEASE management_updateBot");
    } catch (error) {
      database.exec("ROLLBACK TO management_updateBot; RELEASE management_updateBot");
      throw error;
    }
    const bot = this.getBot(input.botId);
    if (!bot) throw new Error(appText("botRepo.botUpdateFailed"));
    return bot;
  }
  deleteBot(botId) {
    if (isProtectedXiaoheiBot(botId)) throw new Error(appText("botMain.defaultBotCannotDelete"));
    const bot = this.getBot(botId);
    if (!bot) throw new Error(appText("botMain.botMissing"));
    const database = getDatabase();
    const timestamp = now();
    const directConversationIds = database.prepare(`SELECT id FROM xiaohei_bot_conversations
           WHERE kind = 'direct' AND direct_bot_id = ? AND archived_at IS NULL
           ORDER BY created_at ASC`).all(botId).map(row => row.id);
    const groupConversationIds = database.prepare(`SELECT DISTINCT conversations.id
           FROM xiaohei_bot_conversations conversations
           JOIN xiaohei_bot_conversation_members members
             ON members.conversation_id = conversations.id
           WHERE conversations.kind = 'group'
             AND conversations.archived_at IS NULL
             AND members.bot_id = ?
           ORDER BY conversations.created_at ASC`).all(botId).map(row => row.id);
    const groupFallbacks = groupConversationIds.map(conversationId => {
      return {
        conversationId,
        defaultBotId: database.prepare(`SELECT members.bot_id AS bot_id
           FROM xiaohei_bot_conversation_members members
           JOIN xiaohei_bot_profiles profiles ON profiles.id = members.bot_id
           WHERE members.conversation_id = ?
             AND members.bot_id <> ?
             AND profiles.deleted_at IS NULL
           ORDER BY members.is_default_responder DESC, members.joined_at ASC
           LIMIT 1`).get(conversationId, botId)?.bot_id ?? null
      };
    });
    const conversationIds = [... /* @__PURE__ */new Set([...directConversationIds, ...groupConversationIds])];
    const primaryConversationId = directConversationIds[0] ?? null;
    const conversationPlaceholders = directConversationIds.map(() => "?").join(", ");
    const count = (sql, ...values) => {
      const row = database.prepare(sql).get(...values);
      return Number(row?.count ?? 0);
    };
    const retainedCounts = {
      messages: count(directConversationIds.length > 0 ? `SELECT COUNT(*) AS count FROM xiaohei_bot_messages
             WHERE author_bot_id = ? OR conversation_id IN (${conversationPlaceholders})` : "SELECT COUNT(*) AS count FROM xiaohei_bot_messages WHERE author_bot_id = ?", botId, ...directConversationIds),
      sessions: count("SELECT COUNT(*) AS count FROM xiaohei_bot_sessions WHERE bot_id = ?", botId),
      agentRuns: count("SELECT COUNT(*) AS count FROM xiaohei_bot_agent_runs WHERE bot_id = ?", botId),
      piEventLinks: count("SELECT COUNT(*) AS count FROM xiaohei_bot_pi_event_links WHERE bot_id = ?", botId),
      events: count(directConversationIds.length > 0 ? `SELECT COUNT(*) AS count FROM xiaohei_bot_events
             WHERE aggregate_id = ? OR actor_id = ? OR conversation_id IN (${conversationPlaceholders})` : "SELECT COUNT(*) AS count FROM xiaohei_bot_events WHERE aggregate_id = ? OR actor_id = ?", botId, botId, ...directConversationIds),
      diagnosticChunks: count(directConversationIds.length > 0 ? `SELECT COUNT(*) AS count FROM xiaohei_bot_diagnostic_chunks
             WHERE conversation_id IN (${conversationPlaceholders})` : "SELECT 0 AS count", ...directConversationIds),
      snapshots: count(directConversationIds.length > 0 ? `SELECT COUNT(*) AS count FROM xiaohei_bot_event_snapshots
             WHERE conversation_id IN (${conversationPlaceholders})` : "SELECT 0 AS count", ...directConversationIds)
    };
    database.exec("BEGIN IMMEDIATE");
    try {
      appendXiaoheiBotEvent(database, {
        streamId: `bot:${botId}`,
        conversationId: primaryConversationId,
        eventType: "bot.deleted",
        occurredAt: timestamp,
        actorType: "user",
        aggregateType: "bot",
        aggregateId: botId,
        branchId: primaryConversationId ? activeBranchId(database, primaryConversationId) : null,
        retentionClass: "security",
        payload: {
          bot,
          directConversationIds,
          groupConversationIds,
          retainedCounts,
          deletionMode: "retained-tombstone"
        }
      });
      if (database.prepare(`UPDATE xiaohei_bot_profiles
           SET deleted_at = ?, updated_at = ?
           WHERE id = ? AND deleted_at IS NULL`).run(timestamp, timestamp, botId).changes === 0) throw new Error(appText("botMain.botMissing"));
      database.prepare(`UPDATE xiaohei_bot_conversations
           SET archived_at = ?, sidebar_hidden_at = ?, pinned_at = NULL, updated_at = ?
           WHERE kind = 'direct' AND direct_bot_id = ? AND archived_at IS NULL`).run(timestamp, timestamp, timestamp, botId);
      const updateGroupDefault = database.prepare(`UPDATE xiaohei_bot_conversations
         SET default_bot_id = ?, updated_at = ?
         WHERE id = ? AND kind = 'group' AND archived_at IS NULL`);
      const updateGroupMembers = database.prepare(`UPDATE xiaohei_bot_conversation_members
         SET is_default_responder = CASE WHEN bot_id = ? THEN 1 ELSE 0 END,
             participation_mode = CASE
               WHEN bot_id = ? THEN 'auto'
               ELSE participation_mode
             END
         WHERE conversation_id = ?`);
      for (const fallback of groupFallbacks) {
        updateGroupDefault.run(fallback.defaultBotId, timestamp, fallback.conversationId);
        updateGroupMembers.run(fallback.defaultBotId, fallback.defaultBotId, fallback.conversationId);
        appendXiaoheiBotEvent(database, {
          conversationId: fallback.conversationId,
          eventType: "conversation.bot-deleted",
          occurredAt: timestamp,
          actorType: "user",
          aggregateType: "conversation",
          aggregateId: fallback.conversationId,
          branchId: activeBranchId(database, fallback.conversationId),
          retentionClass: "security",
          payload: {
            botId,
            defaultBotId: fallback.defaultBotId,
            retainedHistory: true
          }
        });
      }
      database.exec("COMMIT");
    } catch (error) {
      database.exec("ROLLBACK");
      throw error;
    }
    return {
      deleted: true,
      botId,
      conversationIds
    };
  }
  /**
  * 恢复旧版本里被删除的预设角色（预设角色现在不能删除，只能移出列表）：取消删除、恢复删除时一起归档的单聊。
  * 删除时已经从群聊里移出，恢复后不回到这些群。返回原来的删除时间；没有被删除时返回 null。
  */
  restoreDeletedBot(botId) {
    if (isProtectedXiaoheiBot(botId)) return null;
    const database = getDatabase();
    const row = database.prepare("SELECT deleted_at FROM xiaohei_bot_profiles WHERE id = ? AND deleted_at IS NOT NULL").get(botId);
    if (!row) return null;
    const timestamp = now();
    database.exec("BEGIN IMMEDIATE");
    try {
      database.prepare("UPDATE xiaohei_bot_profiles SET deleted_at = NULL, updated_at = ? WHERE id = ? AND deleted_at IS NOT NULL").run(timestamp, botId);
      database.prepare(`DELETE FROM xiaohei_bot_conversation_members
           WHERE bot_id = ? AND conversation_id IN (SELECT id FROM xiaohei_bot_conversations WHERE kind = 'group')`).run(botId);
      database.prepare(`UPDATE xiaohei_bot_conversations
           SET archived_at = NULL, sidebar_hidden_at = NULL, updated_at = ?
           WHERE kind = 'direct' AND direct_bot_id = ? AND archived_at = ?`).run(timestamp, botId, row.deleted_at);
      const primaryConversationId = database.prepare(`SELECT id FROM xiaohei_bot_conversations
             WHERE kind = 'direct' AND direct_bot_id = ? AND parent_conversation_id IS NULL AND archived_at IS NULL
             ORDER BY created_at ASC LIMIT 1`).get(botId)?.id ?? null;
      appendXiaoheiBotEvent(database, {
        streamId: `bot:${botId}`,
        conversationId: primaryConversationId,
        branchId: primaryConversationId ? activeBranchId(database, primaryConversationId) : null,
        eventType: "bot.restored",
        occurredAt: timestamp,
        actorType: "system",
        aggregateType: "bot",
        aggregateId: botId,
        retentionClass: "security",
        payload: {
          deletedAt: row.deleted_at,
          reason: "default-role-list-removed"
        }
      });
      database.exec("COMMIT");
    } catch (error) {
      database.exec("ROLLBACK");
      throw error;
    }
    return row.deleted_at;
  }
  setBotWorkingDirectory(botId, workingDirectory, isCustom, actor) {
    const database = getDatabase();
    const timestamp = now();
    database.exec(actor ? "SAVEPOINT management_workspace" : "BEGIN IMMEDIATE");
    try {
      if (database.prepare(`
      UPDATE xiaohei_bot_profiles SET
        working_directory = ?, working_directory_is_custom = ?, updated_at = ?
      WHERE id = ? AND deleted_at IS NULL
    `).run(workingDirectory, isCustom ? 1 : 0, timestamp, botId).changes === 0) throw new Error(appText("botMain.botMissing"));
      appendXiaoheiBotEvent(database, {
        streamId: `bot:${botId}`,
        eventType: "bot.working-directory-updated",
        occurredAt: timestamp,
        actorType: actor ? "bot" : "user",
        actorId: actor?.botId,
        aggregateType: "bot",
        aggregateId: botId,
        retentionClass: "security",
        payload: {
          workingDirectory,
          isCustom
        }
      });
      database.exec(actor ? "RELEASE management_workspace" : "COMMIT");
    } catch (error) {
      database.exec(actor ? "ROLLBACK TO management_workspace; RELEASE management_workspace" : "ROLLBACK");
      throw error;
    }
    const bot = this.getBot(botId);
    if (!bot) throw new Error(appText("botRepo.workingDirectorySaveFailed"));
    return bot;
  }
  createConsultationConversation(consultation, ownerId, targetId) {
    const database = getDatabase(),
      timestamp = (/* @__PURE__ */new Date()).toISOString();
    database.prepare(`INSERT INTO xiaohei_bot_conversations (id, kind, title, description, notifications_enabled, direct_bot_id, default_bot_id, is_consultation, created_at, updated_at) VALUES (?, 'direct', ?, ?, 0, ?, ?, 1, ?, ?)`).run(consultation, appText("botRepo.consultationTitle"), appText("botRepo.consultationDescription"), targetId, targetId, timestamp, timestamp);
    for (const botId of [ownerId, targetId]) database.prepare(`INSERT INTO xiaohei_bot_conversation_members (conversation_id, bot_id, participation_mode, is_default_responder, joined_message_seq, joined_at) VALUES (?, ?, ?, ?, 0, ?)`).run(consultation, botId, botId === targetId ? "auto" : "context-only", botId === targetId ? 1 : 0, timestamp);
    ensureMainBranch(database, consultation, timestamp);
  }
  getSideTopicBySource(parentConversationId, sourceMessageId) {
    const row = getDatabase().prepare(`SELECT * FROM xiaohei_bot_conversations
         WHERE parent_conversation_id = ? AND forked_from_message_id = ? AND archived_at IS NULL`).get(parentConversationId, sourceMessageId);
    return row ? this.mapConversation(row) : null;
  }
  listSideTopics(parentConversationId) {
    return getDatabase().prepare(`SELECT c.id, c.parent_conversation_id AS parentConversationId, c.forked_from_message_id AS sourceMessageId,
             (SELECT COUNT(*) FROM xiaohei_bot_messages m
              WHERE m.conversation_id = c.id
                AND m.author_type IN ('user', 'bot')
                AND m.withdrawn_at IS NULL
                AND (c.forked_from_message_id IS NULL OR m.id != c.forked_from_message_id)
                AND (
                  TRIM(COALESCE(m.content, '')) != ''
                  OR m.status IN ('pending', 'streaming', 'failed', 'cancelled')
                )) AS replyCount
           FROM xiaohei_bot_conversations c
           WHERE c.parent_conversation_id = ? AND c.archived_at IS NULL
           ORDER BY c.created_at ASC`).all(parentConversationId).filter(row => row.sourceMessageId);
  }
  createSideTopicConversation(parent, source) {
    const existing = this.getSideTopicBySource(parent.id, source.id);
    if (existing) return existing;
    const database = getDatabase();
    const timestamp = now();
    const conversationId = `side-${randomUUID()}`;
    database.exec("SAVEPOINT bot_side_topic_create");
    try {
      database.prepare(`INSERT INTO xiaohei_bot_conversations (
            id, kind, title, description, avatar, avatar_color, avatar_shape,
            notifications_enabled, direct_bot_id, default_bot_id, is_consultation,
            parent_conversation_id, forked_from_message_id, forked_from_event_id, lineage_depth,
            created_at, updated_at
          ) VALUES (?, 'direct', ?, ?, ?, ?, ?, 0, ?, ?, 0, ?, ?, ?, 1, ?, ?)`).run(conversationId, parent.title, parent.description, parent.avatar ?? null, parent.avatarColor ?? null, parent.avatarShape ?? null, parent.directBotId, parent.defaultBotId ?? parent.directBotId, parent.id, source.id, source.originEventId ?? null, timestamp, timestamp);
      const insertMember = database.prepare(`
        INSERT INTO xiaohei_bot_conversation_members (
          conversation_id, bot_id, participation_mode, is_default_responder, joined_message_seq, joined_at
        ) VALUES (?, ?, ?, ?, 0, ?)
      `);
      for (const member of parent.members) insertMember.run(conversationId, member.botId, member.participationMode, member.isDefaultResponder ? 1 : 0, timestamp);
      appendXiaoheiBotEvent(database, {
        conversationId,
        eventType: "conversation.created",
        occurredAt: timestamp,
        actorType: "user",
        aggregateType: "conversation",
        aggregateId: conversationId,
        branchId: ensureMainBranch(database, conversationId, timestamp),
        payload: {
          id: conversationId,
          kind: "direct",
          title: parent.title,
          parentConversationId: parent.id,
          forkedFromMessageId: source.id
        }
      });
      database.exec("RELEASE bot_side_topic_create");
    } catch (error) {
      database.exec("ROLLBACK TO bot_side_topic_create; RELEASE bot_side_topic_create");
      const raced = this.getSideTopicBySource(parent.id, source.id);
      if (raced) return raced;
      throw error;
    }
    const conversation = this.getConversation(conversationId);
    if (!conversation) throw new Error(appText("botRepo.sideTopicCreateFailed"));
    return conversation;
  }
  listConversations() {
    return getDatabase().prepare(`SELECT * FROM xiaohei_bot_conversations
           WHERE archived_at IS NULL AND is_consultation = 0 AND parent_conversation_id IS NULL
           ORDER BY
             CASE WHEN pinned_at IS NULL THEN 1 ELSE 0 END ASC,
             pinned_at DESC,
             MAX(COALESCE(last_message_at, updated_at), COALESCE(sidebar_restored_at, '')) DESC`).all().map(row => this.mapConversation(row));
  }
  getUnreadConversationIds() {
    return getDatabase().prepare(`SELECT id FROM xiaohei_bot_conversations
       WHERE archived_at IS NULL AND is_consultation = 0 AND parent_conversation_id IS NULL
         AND sidebar_hidden_at IS NULL AND unread_count > 0
         AND NOT EXISTS (SELECT 1 FROM xiaohei_bot_default_role_links links
           WHERE links.bot_id = xiaohei_bot_conversations.direct_bot_id AND links.list_removed_at IS NOT NULL)`).all().map(row => row.id);
  }
  getConversation(conversationId) {
    const row = getDatabase().prepare(`SELECT * FROM xiaohei_bot_conversations WHERE id = ? AND archived_at IS NULL`).get(conversationId);
    return row ? this.mapConversation(row) : null;
  }
  mapConversation(row) {
    const defaultRoleLink = row.kind === "direct" && !row.parent_conversation_id ? getDatabase().prepare("SELECT role_id, greeting, sort_order, list_removed_at FROM xiaohei_bot_default_role_links WHERE bot_id = ?").get(row.direct_bot_id) : undefined;
    const defaultRole = defaultRoleLink && !row.last_message_at && !row.sidebar_restored_at ? defaultRoleLink : undefined;
    const latest = getDatabase().prepare(`
      SELECT seq, author_type, status FROM xiaohei_bot_messages
      WHERE conversation_id = ? AND author_type IN ('user', 'bot')
      ORDER BY seq DESC LIMIT 1
    `).get(row.id);
    return {
      latestMessageSeq: latest?.seq ?? 0,
      latestGenerationStatus: latest?.author_type === "bot" ? latest.status : null,
      id: row.id,
      kind: row.kind,
      title: row.title,
      description: row.description,
      notificationsEnabled: row.notifications_enabled === 1,
      directBotId: row.direct_bot_id,
      defaultBotId: row.default_bot_id,
      creatorBotId: row.creator_bot_id,
      sourceConversationId: row.source_conversation_id,
      members: this.listConversationMembers(row.id),
      lastMessagePreview: xiaoheiBotMessagePreview(row.last_message_preview || defaultRole?.greeting || "", []),
      defaultRoleSortOrder: defaultRole?.sort_order,
      defaultRoleId: defaultRoleLink?.role_id,
      defaultRoleListRemovedAt: defaultRoleLink ? defaultRoleLink.list_removed_at ?? null : undefined,
      lastMessageAt: row.last_message_at,
      unreadCount: row.unread_count,
      pinnedAt: row.pinned_at,
      sidebarHiddenAt: row.sidebar_hidden_at,
      sidebarRestoredAt: row.sidebar_restored_at,
      parentConversationId: row.parent_conversation_id,
      forkedFromMessageId: row.forked_from_message_id,
      forkedFromEventId: row.forked_from_event_id,
      lineageDepth: Number(row.lineage_depth ?? 0),
      archivedAt: row.archived_at,
      avatar: row.avatar ?? undefined,
      avatarColor: row.avatar_color ?? undefined,
      avatarShape: row.avatar_shape ?? undefined,
      createdAt: row.created_at,
      updatedAt: row.updated_at
    };
  }
  listConversationMembers(conversationId) {
    return getDatabase().prepare(`
      SELECT m.*, b.name, b.avatar, b.avatar_color, b.avatar_shape
      FROM xiaohei_bot_conversation_members m
      JOIN xiaohei_bot_profiles b ON b.id = m.bot_id
      WHERE m.conversation_id = ? AND b.deleted_at IS NULL
      ORDER BY m.is_default_responder DESC, m.joined_at ASC
    `).all(conversationId).map(row => ({
      botId: row.bot_id,
      name: row.name,
      participationMode: row.participation_mode,
      isDefaultResponder: row.is_default_responder === 1,
      joinedAt: row.joined_at,
      joinedMessageSeq: row.joined_message_seq,
      handoffRole: row.handoff_role,
      handoffContext: row.handoff_context,
      handoffTask: row.handoff_task,
      avatar: row.avatar ?? undefined,
      avatarColor: row.avatar_color ?? undefined,
      avatarShape: row.avatar_shape ?? undefined
    }));
  }
  createGroup(input, actor) {
    const database = getDatabase();
    const timestamp = now();
    const conversationId = randomUUID();
    const botIds = [... /* @__PURE__ */new Set([...input.botIds, DEFAULT_XIAOHEI_BOT_ID])];
    if (botIds.length > 30) throw new Error(appText("botRepo.groupMaxBots"));
    if (botIds.length === 0) throw new Error(appText("botRepo.groupNeedsBot"));
    if (botIds.some(botId => !this.getBot(botId))) throw new Error(appText("botRepo.groupHasMissingBot"));
    const defaultBotId = botIds.includes(input.defaultBotId ?? "") ? input.defaultBotId : botIds[0];
    database.exec("SAVEPOINT management_createGroup");
    try {
      database.prepare(`
        INSERT INTO xiaohei_bot_conversations (
          id, kind, title, description, avatar, avatar_color, avatar_shape,
          notifications_enabled, default_bot_id, created_at, updated_at
        ) VALUES (?, 'group', ?, ?, ?, ?, ?, 1, ?, ?, ?)
      `).run(conversationId, input.name.trim(), input.description.trim(), input.avatar ?? null, input.avatarColor ?? null, input.avatarShape ?? null, defaultBotId, timestamp, timestamp);
      const insertMember = database.prepare(`
        INSERT INTO xiaohei_bot_conversation_members (
          conversation_id, bot_id, participation_mode, is_default_responder, joined_message_seq, joined_at
        ) VALUES (?, ?, ?, ?, 0, ?)
      `);
      for (const botId of botIds) insertMember.run(conversationId, botId, botId === defaultBotId ? "auto" : "mention-only", botId === defaultBotId ? 1 : 0, timestamp);
      if (actor) database.prepare("UPDATE xiaohei_bot_conversations SET creator_bot_id = ?, source_conversation_id = ? WHERE id = ?").run(actor.botId, actor.sourceConversationId, conversationId);
      const branchId = ensureMainBranch(database, conversationId, timestamp);
      appendXiaoheiBotEvent(database, {
        conversationId,
        eventType: "conversation.created",
        occurredAt: timestamp,
        actorType: actor ? "bot" : "user",
        actorId: actor?.botId,
        aggregateType: "conversation",
        aggregateId: conversationId,
        branchId,
        payload: {
          id: conversationId,
          kind: "group",
          title: input.name.trim(),
          description: input.description.trim(),
          defaultBotId,
          memberBotIds: botIds
        }
      });
      database.exec("RELEASE management_createGroup");
    } catch (error) {
      database.exec("ROLLBACK TO management_createGroup; RELEASE management_createGroup");
      throw error;
    }
    const conversation = this.getConversation(conversationId);
    if (!conversation) throw new Error(appText("botRepo.groupCreateFailed"));
    return conversation;
  }
  updateGroup(input, actor) {
    const timestamp = now();
    const database = getDatabase();
    const existing = this.getConversation(input.conversationId);
    if (!existing || existing.kind !== "group") throw new Error(appText("botMain.groupMissing"));
    const defaultBotId = input.defaultBotId ?? existing.defaultBotId ?? existing.members[0]?.botId;
    if (!defaultBotId || !existing.members.some(member => member.botId === defaultBotId)) throw new Error(appText("botRepo.defaultResponderNotMember"));
    database.exec("SAVEPOINT management_updateGroup");
    try {
      if (database.prepare(`
        UPDATE xiaohei_bot_conversations SET
          title = ?, description = ?, avatar = ?, avatar_color = ?, avatar_shape = ?,
          notifications_enabled = ?, default_bot_id = ?, updated_at = ?
        WHERE id = ? AND kind = 'group'
      `).run(input.name.trim(), input.description.trim(), input.avatar ?? null, input.avatarColor ?? null, input.avatarShape ?? null, input.notificationsEnabled ? 1 : 0, defaultBotId, timestamp, input.conversationId).changes === 0) throw new Error(appText("botMain.groupMissing"));
      this.setDefaultResponder(database, input.conversationId, defaultBotId);
      appendXiaoheiBotEvent(database, {
        conversationId: input.conversationId,
        eventType: "conversation.settings-updated",
        occurredAt: timestamp,
        actorType: actor ? "bot" : "user",
        actorId: actor?.botId,
        aggregateType: "conversation",
        aggregateId: input.conversationId,
        branchId: activeBranchId(database, input.conversationId),
        payload: {
          before: existing,
          after: {
            title: input.name.trim(),
            description: input.description.trim(),
            notificationsEnabled: input.notificationsEnabled,
            defaultBotId
          }
        }
      });
      database.exec("RELEASE management_updateGroup");
    } catch (error) {
      database.exec("ROLLBACK TO management_updateGroup; RELEASE management_updateGroup");
      throw error;
    }
    const conversation = this.getConversation(input.conversationId);
    if (!conversation) throw new Error(appText("botRepo.groupUpdateFailed"));
    return conversation;
  }
  addGroupMembers(input, actor) {
    const database = getDatabase();
    const timestamp = now();
    const existing = this.getConversation(input.conversationId);
    if (!existing || existing.kind !== "group") throw new Error(appText("botMain.groupMissing"));
    const botIds = [...new Set(input.botIds)].filter(item => !existing.members.some(member => member.botId === item));
    if (botIds.length && existing.members.length + botIds.length > 30) throw new Error(appText("botRepo.groupMaxBots"));
    if (botIds.some(botId => !this.getBot(botId))) throw new Error(appText("botRepo.addingMissingBot"));
    database.exec("SAVEPOINT management_addGroupMembers");
    try {
      const seqRow = database.prepare(`
        SELECT COALESCE(MAX(seq), 0) AS seq FROM xiaohei_bot_messages WHERE conversation_id = ?
      `).get(input.conversationId);
      const statement = database.prepare(`
        INSERT OR IGNORE INTO xiaohei_bot_conversation_members (
          conversation_id, bot_id, participation_mode, is_default_responder, joined_message_seq, joined_at
        ) VALUES (?, ?, 'mention-only', 0, ?, ?)
      `);
      for (const botId of botIds) statement.run(input.conversationId, botId, seqRow.seq, timestamp);
      database.prepare(`UPDATE xiaohei_bot_conversations SET updated_at = ? WHERE id = ?`).run(timestamp, input.conversationId);
      appendXiaoheiBotEvent(database, {
        conversationId: input.conversationId,
        eventType: "conversation.members-added",
        occurredAt: timestamp,
        actorType: actor ? "bot" : "user",
        actorId: actor?.botId,
        aggregateType: "conversation",
        aggregateId: input.conversationId,
        branchId: activeBranchId(database, input.conversationId),
        payload: {
          botIds,
          joinedMessageSeq: Number(seqRow.seq)
        }
      });
      database.exec("RELEASE management_addGroupMembers");
    } catch (error) {
      database.exec("ROLLBACK TO management_addGroupMembers; RELEASE management_addGroupMembers");
      throw error;
    }
    const conversation = this.getConversation(input.conversationId);
    if (!conversation) throw new Error(appText("botMain.groupMissing"));
    return conversation;
  }
  saveMemberHandoffs(conversationId, handoffs, actor) {
    const database = getDatabase();
    for (const handoff of handoffs) {
      if (!database.prepare(`UPDATE xiaohei_bot_conversation_members SET handoff_role = ?, handoff_context = ?, handoff_task = ? WHERE conversation_id = ? AND bot_id = ?`).run(handoff.role, handoff.context, handoff.initialTask, conversationId, handoff.botId).changes) throw new Error(appText("botRepo.handoffTargetNotMember"));
      appendXiaoheiBotEvent(database, {
        conversationId,
        eventType: "conversation.member-handoff",
        actorType: actor ? "bot" : "user",
        actorId: actor?.botId,
        aggregateType: "conversation-member",
        aggregateId: `${conversationId}:${handoff.botId}`,
        branchId: activeBranchId(database, conversationId),
        payload: {
          botId: handoff.botId,
          role: handoff.role,
          context: handoff.context,
          initialTask: handoff.initialTask,
          startTask: handoff.startTask
        }
      });
    }
  }
  updateGroupMember(input, actor) {
    const database = getDatabase();
    const existing = this.getConversation(input.conversationId);
    if (!existing || existing.kind !== "group") throw new Error(appText("botMain.groupMissing"));
    const existingMember = existing.members.find(member => member.botId === input.botId);
    if (!existingMember) throw new Error(appText("botRepo.memberMissing"));
    if (input.isDefaultResponder && input.participationMode !== "auto") throw new Error(appText("botRepo.defaultResponderAuto"));
    if (existingMember.isDefaultResponder && !input.isDefaultResponder && input.participationMode !== "auto") throw new Error(appText("botRepo.setNewDefaultResponder"));
    database.exec("SAVEPOINT management_updateGroupMember");
    try {
      if (database.prepare(`
        UPDATE xiaohei_bot_conversation_members SET participation_mode = ?
        WHERE conversation_id = ? AND bot_id = ?
      `).run(input.participationMode, input.conversationId, input.botId).changes === 0) throw new Error(appText("botRepo.memberMissing"));
      if (input.isDefaultResponder) this.setDefaultResponder(database, input.conversationId, input.botId);
      appendXiaoheiBotEvent(database, {
        conversationId: input.conversationId,
        eventType: "conversation.member-updated",
        actorType: actor ? "bot" : "user",
        actorId: actor?.botId,
        aggregateType: "conversation-member",
        aggregateId: `${input.conversationId}:${input.botId}`,
        branchId: activeBranchId(database, input.conversationId),
        payload: {
          before: existingMember,
          after: {
            participationMode: input.participationMode,
            isDefaultResponder: input.isDefaultResponder ?? existingMember.isDefaultResponder
          }
        }
      });
      database.exec("RELEASE management_updateGroupMember");
    } catch (error) {
      database.exec("ROLLBACK TO management_updateGroupMember; RELEASE management_updateGroupMember");
      throw error;
    }
    const conversation = this.getConversation(input.conversationId);
    if (!conversation) throw new Error(appText("botMain.groupMissing"));
    return conversation;
  }
  setDefaultResponder(database, conversationId, botId) {
    database.prepare(`
      UPDATE xiaohei_bot_conversation_members SET
        is_default_responder = CASE WHEN bot_id = ? THEN 1 ELSE 0 END,
        participation_mode = CASE WHEN bot_id = ? THEN 'auto' ELSE participation_mode END
      WHERE conversation_id = ?
    `).run(botId, botId, conversationId);
    database.prepare(`
      UPDATE xiaohei_bot_conversations SET default_bot_id = ?, updated_at = ? WHERE id = ?
    `).run(botId, now(), conversationId);
  }
  removeGroupMember(conversationId, botId) {
    if (isProtectedXiaoheiBot(botId)) throw new Error(appText("botMain.defaultBotCannotLeave"));
    const database = getDatabase();
    const conversation = this.getConversation(conversationId);
    if (!conversation || conversation.kind !== "group") throw new Error(appText("botMain.groupMissing"));
    if (conversation.members.length <= 1) throw new Error(appText("botRepo.groupKeepOneBot"));
    const previousSession = this.getSession(botId, conversationId);
    database.exec("BEGIN IMMEDIATE");
    try {
      if (database.prepare(`
        DELETE FROM xiaohei_bot_conversation_members WHERE conversation_id = ? AND bot_id = ?
      `).run(conversationId, botId).changes === 0) throw new Error(appText("botRepo.memberMissing"));
      database.prepare(`DELETE FROM xiaohei_bot_sessions WHERE conversation_id = ? AND bot_id = ?`).run(conversationId, botId);
      if (conversation.defaultBotId === botId) {
        const fallback = this.listConversationMembers(conversationId)[0];
        if (fallback) this.setDefaultResponder(database, conversationId, fallback.botId);
      }
      database.prepare(`UPDATE xiaohei_bot_conversations SET updated_at = ? WHERE id = ?`).run(now(), conversationId);
      appendXiaoheiBotEvent(database, {
        conversationId,
        eventType: "conversation.member-removed",
        actorType: "user",
        aggregateType: "conversation-member",
        aggregateId: `${conversationId}:${botId}`,
        branchId: activeBranchId(database, conversationId),
        payload: {
          botId,
          previousMember: conversation.members.find(member => member.botId === botId) ?? null,
          previousDefaultBotId: conversation.defaultBotId,
          discardedSession: previousSession
        }
      });
      database.exec("COMMIT");
    } catch (error) {
      database.exec("ROLLBACK");
      throw error;
    }
    const updated = this.getConversation(conversationId);
    if (!updated) throw new Error(appText("botMain.groupMissing"));
    return updated;
  }
  deleteGroup(conversationId) {
    const conversation = this.getConversation(conversationId);
    if (!conversation || conversation.kind !== "group") throw new Error(appText("botMain.groupMissing"));
    const database = getDatabase();
    const timestamp = now();
    database.exec("BEGIN IMMEDIATE");
    try {
      const counts = database.prepare(`SELECT
             (SELECT COUNT(*) FROM xiaohei_bot_messages WHERE conversation_id = ?) AS message_count,
             (SELECT COUNT(*) FROM xiaohei_bot_sessions WHERE conversation_id = ?) AS session_count`).get(conversationId, conversationId);
      const assetReferences = database.prepare(`SELECT attachments.asset_id AS asset_id, COUNT(*) AS reference_count
           FROM xiaohei_bot_attachments attachments
           JOIN xiaohei_bot_messages messages ON messages.id = attachments.message_id
           WHERE messages.conversation_id = ? AND attachments.asset_id IS NOT NULL
           GROUP BY attachments.asset_id`).all(conversationId);
      appendXiaoheiBotEvent(database, {
        conversationId,
        eventType: "conversation.deleted",
        occurredAt: timestamp,
        actorType: "user",
        aggregateType: "conversation",
        aggregateId: conversationId,
        branchId: activeBranchId(database, conversationId),
        retentionClass: "security",
        payload: {
          conversation,
          messageCount: Number(counts.message_count),
          sessionCount: Number(counts.session_count),
          assetReferences: assetReferences.map(reference => ({
            assetId: reference.asset_id,
            referenceCount: Number(reference.reference_count)
          }))
        }
      });
      const decrementAssetReference = database.prepare(`UPDATE xiaohei_bot_assets
         SET reference_count = MAX(0, reference_count - ?)
         WHERE asset_id = ?`);
      for (const reference of assetReferences) decrementAssetReference.run(Number(reference.reference_count), reference.asset_id);
      if (database.prepare("DELETE FROM xiaohei_bot_conversations WHERE id = ? AND kind = 'group'").run(conversationId).changes === 0) throw new Error(appText("botMain.groupMissing"));
      database.exec("COMMIT");
    } catch (error) {
      database.exec("ROLLBACK");
      throw error;
    }
  }
  setConversationPinned(conversationId, pinned) {
    if (!this.getConversation(conversationId)) throw new Error(appText("botMain.conversationMissing"));
    const database = getDatabase();
    const timestamp = now();
    database.exec("BEGIN IMMEDIATE");
    try {
      if (database.prepare(`UPDATE xiaohei_bot_conversations
           SET pinned_at = ?
           WHERE id = ? AND archived_at IS NULL`).run(pinned ? timestamp : null, conversationId).changes === 0) throw new Error(appText("botMain.conversationMissing"));
      appendXiaoheiBotEvent(database, {
        conversationId,
        eventType: pinned ? "conversation.pinned" : "conversation.unpinned",
        occurredAt: timestamp,
        actorType: "user",
        aggregateType: "conversation",
        aggregateId: conversationId,
        branchId: activeBranchId(database, conversationId),
        retentionClass: "diagnostic",
        payload: {
          pinned,
          pinnedAt: pinned ? timestamp : null
        }
      });
      database.exec("COMMIT");
    } catch (error) {
      database.exec("ROLLBACK");
      throw error;
    }
    const updated = this.getConversation(conversationId);
    if (!updated) throw new Error(appText("botMain.conversationMissing"));
    return updated;
  }
  setConversationSidebarHidden(conversationId, hidden) {
    const conversation = this.getConversation(conversationId);
    if (!conversation) throw new Error(appText("botMain.conversationMissing"));
    const database = getDatabase();
    const timestamp = now();
    const restoring = !hidden && Boolean(conversation.sidebarHiddenAt);
    database.exec("BEGIN IMMEDIATE");
    try {
      if (database.prepare(`UPDATE xiaohei_bot_conversations
           SET sidebar_hidden_at = ?,
               sidebar_restored_at = CASE WHEN ? THEN ? ELSE sidebar_restored_at END,
               pinned_at = CASE WHEN ? AND pinned_at IS NOT NULL THEN ? ELSE pinned_at END
           WHERE id = ? AND archived_at IS NULL`).run(hidden ? timestamp : null, restoring ? 1 : 0, timestamp, restoring ? 1 : 0, timestamp, conversationId).changes === 0) throw new Error(appText("botMain.conversationMissing"));
      appendXiaoheiBotEvent(database, {
        conversationId,
        eventType: hidden ? "conversation.sidebar-hidden" : "conversation.sidebar-restored",
        occurredAt: timestamp,
        actorType: "user",
        aggregateType: "conversation",
        aggregateId: conversationId,
        branchId: activeBranchId(database, conversationId),
        retentionClass: "diagnostic",
        payload: {
          hidden,
          sidebarHiddenAt: hidden ? timestamp : null,
          sidebarRestoredAt: restoring ? timestamp : conversation.sidebarRestoredAt ?? null
        }
      });
      database.exec("COMMIT");
    } catch (error) {
      database.exec("ROLLBACK");
      throw error;
    }
    const updated = this.getConversation(conversationId);
    if (!updated) throw new Error(appText("botMain.conversationMissing"));
    return updated;
  }
  setConversationNotifications(conversationId, enabled, withinTransaction = false) {
    const database = getDatabase();
    const timestamp = now();
    database.exec(withinTransaction ? "SAVEPOINT bot_notifications" : "BEGIN IMMEDIATE");
    try {
      database.prepare(`
      UPDATE xiaohei_bot_conversations
      SET notifications_enabled = ?, updated_at = ?
      WHERE id = ? AND archived_at IS NULL
    `).run(enabled ? 1 : 0, timestamp, conversationId);
      appendXiaoheiBotEvent(database, {
        conversationId,
        eventType: "conversation.notifications-updated",
        occurredAt: timestamp,
        actorType: "user",
        aggregateType: "conversation",
        aggregateId: conversationId,
        branchId: activeBranchId(database, conversationId),
        payload: {
          enabled
        }
      });
      database.exec(withinTransaction ? "RELEASE bot_notifications" : "COMMIT");
    } catch (error) {
      database.exec(withinTransaction ? "ROLLBACK TO bot_notifications; RELEASE bot_notifications" : "ROLLBACK");
      throw error;
    }
    const conversation = this.getConversation(conversationId);
    if (!conversation) throw new Error(appText("botMain.conversationMissing"));
    return conversation;
  }
  markConversationRead(conversationId) {
    const database = getDatabase();
    const timestamp = now();
    database.exec("BEGIN IMMEDIATE");
    try {
      if (database.prepare(`UPDATE xiaohei_bot_conversations
         SET unread_count = 0
         WHERE id = ? AND archived_at IS NULL`).run(conversationId).changes === 0) throw new Error(appText("botMain.conversationMissing"));
      appendXiaoheiBotEvent(database, {
        conversationId,
        eventType: "conversation.read",
        occurredAt: timestamp,
        actorType: "user",
        aggregateType: "conversation",
        aggregateId: conversationId,
        branchId: activeBranchId(database, conversationId),
        retentionClass: "diagnostic",
        payload: {
          unreadCount: 0
        }
      });
      database.exec("COMMIT");
    } catch (error) {
      database.exec("ROLLBACK");
      throw error;
    }
    const conversation = this.getConversation(conversationId);
    if (!conversation) throw new Error(appText("botMain.conversationMissing"));
    return conversation;
  }
  markConversationUnread(conversationId) {
    const database = getDatabase();
    const timestamp = now();
    database.exec("BEGIN IMMEDIATE");
    try {
      if (database.prepare(`UPDATE xiaohei_bot_conversations
           SET unread_count = MAX(unread_count, 1)
           WHERE id = ? AND archived_at IS NULL`).run(conversationId).changes === 0) throw new Error(appText("botMain.conversationMissing"));
      const unreadRow = database.prepare("SELECT unread_count FROM xiaohei_bot_conversations WHERE id = ?").get(conversationId);
      appendXiaoheiBotEvent(database, {
        conversationId,
        eventType: "conversation.unread",
        occurredAt: timestamp,
        actorType: "user",
        aggregateType: "conversation",
        aggregateId: conversationId,
        branchId: activeBranchId(database, conversationId),
        retentionClass: "diagnostic",
        payload: {
          unreadCount: Number(unreadRow.unread_count)
        }
      });
      database.exec("COMMIT");
    } catch (error) {
      database.exec("ROLLBACK");
      throw error;
    }
    const conversation = this.getConversation(conversationId);
    if (!conversation) throw new Error(appText("botMain.conversationMissing"));
    return conversation;
  }
  listDisplayMessages(conversationId, beforeSeq, limit = 50) {
    const pageSize = Math.min(100, Math.max(1, limit));
    const hasCursor = Number.isInteger(beforeSeq) && Number(beforeSeq) > 0;
    const rows = getDatabase().prepare(`
      SELECT * FROM (
        SELECT * FROM xiaohei_bot_messages
        WHERE conversation_id = ?
          ${hasCursor ? "AND seq < ?" : ""}
        ORDER BY seq DESC
        LIMIT ?
      ) ORDER BY seq ASC
    `).all(conversationId, ...(hasCursor ? [Number(beforeSeq)] : []), pageSize + 1);
    const messages = rows.slice(-pageSize).map(row => this.mapMessage(row));
    return {
      messages,
      hasMore: rows.length > pageSize,
      nextBeforeSeq: messages.at(0)?.seq ?? null
    };
  }
  listMessages(conversationId, limit = 100, beforeSeq = null) {
    return getDatabase().prepare(`
      SELECT * FROM (
        SELECT * FROM xiaohei_bot_messages WHERE conversation_id = ? AND (? IS NULL OR seq < ?) ORDER BY seq DESC LIMIT ?
      ) ORDER BY seq ASC
    `).all(conversationId, beforeSeq, beforeSeq, Math.min(500, Math.max(1, limit))).map(row => this.mapMessage(row));
  }
  getMessage(messageId) {
    const row = getDatabase().prepare("SELECT * FROM xiaohei_bot_messages WHERE id = ?").get(messageId);
    return row ? this.mapMessage(row) : null;
  }
  listUnseenMessages(botId, conversationId, joinedMessageSeq, throughSeq) {
    return getDatabase().prepare(`
      SELECT m.*
      FROM xiaohei_bot_messages m
      LEFT JOIN xiaohei_bot_session_messages seen
        ON seen.bot_id = ?
        AND seen.conversation_id = m.conversation_id
        AND seen.message_id = m.id
      WHERE m.conversation_id = ?
        AND m.seq > ?
        AND m.seq <= ?
        AND m.status = 'complete'
        AND seen.message_id IS NULL
      ORDER BY m.seq ASC
    `).all(botId, conversationId, joinedMessageSeq, throughSeq).map(row => this.mapMessage(row));
  }
  createMessage(input, withinTransaction = false) {
    const database = getDatabase();
    const timestamp = now();
    const messageId = input.id ?? randomUUID();
    database.exec(withinTransaction ? "SAVEPOINT management_createMessage" : "BEGIN IMMEDIATE");
    try {
      if (input.authorType === "user" && !input.synthetic) database.prepare(`UPDATE xiaohei_bot_profiles SET profile_completion_json = json_set(profile_completion_json, '$.onboarding', json('false'))
          WHERE id = (SELECT direct_bot_id FROM xiaohei_bot_conversations WHERE id = ? AND kind = 'direct' AND is_consultation = 0 AND parent_conversation_id IS NULL)
          AND json_extract(profile_completion_json, '$.onboarding') = 1`).run(input.conversationId);
      const seqRow = database.prepare(`
        SELECT COALESCE(MAX(seq), 0) + 1 AS seq FROM xiaohei_bot_messages WHERE conversation_id = ?
      `).get(input.conversationId);
      database.prepare(`
        INSERT INTO xiaohei_bot_messages (
          id, conversation_id, seq, author_type, author_bot_id, author_name, content,
          process_items_json, status, reply_to_message_id, causal_root_message_id,
          hop_depth, origin_message_id, delivery_mode, revision, created_at, updated_at
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 1, ?, ?)
      `).run(messageId, input.conversationId, seqRow.seq, input.authorType, input.authorBotId ?? null, input.authorName, input.content, JSON.stringify(input.processItems ?? []), input.status ?? "complete", input.replyToMessageId ?? null, input.causalRootMessageId ?? messageId, input.hopDepth ?? 0, input.originMessageId ?? messageId, input.deliveryMode ?? "normal", timestamp, timestamp);
      const mentionStatement = database.prepare(`
        INSERT INTO xiaohei_bot_message_mentions (
          message_id, mention_type, bot_id, label, token
        ) VALUES (?, ?, ?, ?, ?)
      `);
      for (const mention of input.mentions ?? []) mentionStatement.run(messageId, mention.type, mention.botId ?? null, mention.label, mention.token);
      const attachmentStatement = database.prepare(`
        INSERT INTO xiaohei_bot_attachments (
          id, message_id, name, size, mime_type, is_image, local_path, created_at,
          asset_id, sha256, integrity_status, verified_at
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `);
      for (const attachment of input.attachments ?? []) {
        database.prepare(`INSERT INTO xiaohei_bot_assets (
              asset_id, sha256, storage_key, size, mime_type, integrity_status,
              reference_count, created_at, verified_at, last_accessed_at
            ) VALUES (?, ?, ?, ?, ?, ?, 1, ?, ?, ?)
            ON CONFLICT(sha256) DO UPDATE SET
              storage_key = excluded.storage_key,
              size = excluded.size,
              mime_type = excluded.mime_type,
              integrity_status = excluded.integrity_status,
              reference_count = xiaohei_bot_assets.reference_count + 1,
              verified_at = COALESCE(excluded.verified_at, xiaohei_bot_assets.verified_at),
              last_accessed_at = excluded.last_accessed_at`).run(attachment.assetId, attachment.sha256, attachment.storageKey, attachment.size, attachment.mimeType, attachment.integrityStatus, timestamp, attachment.verifiedAt ?? null, timestamp);
        attachmentStatement.run(attachment.id, messageId, attachment.name, attachment.size, attachment.mimeType, attachment.isImage ? 1 : 0, attachment.localPath, timestamp, attachment.assetId, attachment.sha256, attachment.integrityStatus, attachment.verifiedAt ?? null);
      }
      const preview = xiaoheiBotMessagePreview(input.content, input.mentions ?? [], input.attachments?.length ?? 0);
      if (preview) {
        const shouldIncrementUnread = input.incrementUnread ?? (input.authorType === "bot" && (input.status ?? "complete") === "complete");
        database.prepare(`
          UPDATE xiaohei_bot_conversations SET
            last_message_preview = ?, last_message_at = ?,
            unread_count = unread_count + ?, updated_at = ? WHERE id = ?
        `).run(preview, timestamp, shouldIncrementUnread ? 1 : 0, timestamp, input.conversationId);
      }
      const branchId = input.branchId ?? (() => {
        ensureMainBranch(database, input.conversationId, timestamp);
        return activeBranchId(database, input.conversationId);
      })();
      const event = appendXiaoheiBotEvent(database, {
        conversationId: input.conversationId,
        eventType: input.eventType ?? (input.authorType === "user" ? "message.accepted" : input.authorType === "bot" ? (input.status ?? "complete") === "complete" ? "assistant.message.completed" : "assistant.message.created" : "system.message.created"),
        occurredAt: timestamp,
        actorType: input.actorType ?? (input.authorType === "user" ? "user" : input.authorType === "bot" ? "bot" : "system"),
        actorId: input.actorId ?? input.authorBotId ?? null,
        aggregateType: "message",
        aggregateId: messageId,
        correlationId: input.correlationId ?? null,
        causationEventId: input.causationEventId ?? null,
        parentEventId: input.parentEventId ?? null,
        branchId,
        sourceEventSeqs: input.sourceEventSeqs,
        payload: {
          message: {
            id: messageId,
            conversationId: input.conversationId,
            seq: Number(seqRow.seq),
            authorType: input.authorType,
            authorBotId: input.authorBotId ?? null,
            authorName: input.authorName,
            content: input.content,
            processItems: input.processItems ?? [],
            status: input.status ?? "complete",
            deliveryMode: input.deliveryMode ?? "normal",
            replyToMessageId: input.replyToMessageId ?? null,
            causalRootMessageId: input.causalRootMessageId ?? messageId,
            hopDepth: input.hopDepth ?? 0,
            originMessageId: input.originMessageId ?? messageId,
            revision: 1
          },
          mentions: input.mentions ?? [],
          attachments: (input.attachments ?? []).map(attachment => ({
            id: attachment.id,
            assetId: attachment.assetId,
            sha256: attachment.sha256,
            name: attachment.name,
            size: attachment.size,
            mimeType: attachment.mimeType,
            integrityStatus: attachment.integrityStatus
          }))
        },
        searchText: input.content,
        synthetic: input.synthetic
      });
      database.prepare(`UPDATE xiaohei_bot_messages
           SET origin_event_id = COALESCE(origin_event_id, ?)
           WHERE id = ?`).run(event.eventId, messageId);
      database.exec(withinTransaction ? "RELEASE management_createMessage" : "COMMIT");
    } catch (error) {
      database.exec(withinTransaction ? "ROLLBACK TO management_createMessage; RELEASE management_createMessage" : "ROLLBACK");
      throw error;
    }
    const message = this.getMessage(messageId);
    if (!message) throw new Error(appText("botRepo.messageSaveFailed"));
    return message;
  }
  updateMessage(messageId, input) {
    const existing = this.getMessage(messageId);
    if (!existing) throw new Error(appText("botRepo.messageMissing"));
    const timestamp = now();
    const database = getDatabase();
    const nextContent = input.content ?? existing.content;
    const nextStatus = input.status ?? existing.status;
    const nextProcessItems = input.processItems ?? existing.processItems;
    const nextErrorMessage = input.errorMessage === undefined ? existing.errorMessage : input.errorMessage;
    const nextWithdrawnAt = input.withdrawnAt === undefined ? existing.withdrawnAt : input.withdrawnAt;
    database.exec("BEGIN IMMEDIATE");
    try {
      database.prepare(`
        UPDATE xiaohei_bot_messages SET
          content = ?, process_items_json = ?, status = ?, error_message = ?,
          withdrawn_at = ?, revision = revision + 1, updated_at = ?
        WHERE id = ?
      `).run(nextContent, JSON.stringify(nextProcessItems), nextStatus, nextErrorMessage, nextWithdrawnAt ?? null, timestamp, messageId);
      if (nextStatus === "complete" && nextContent.trim()) {
        const incrementUnread = existing.authorType === "bot" && existing.status !== "complete" ? 1 : 0;
        database.prepare(`
          UPDATE xiaohei_bot_conversations SET
            last_message_preview = ?, last_message_at = ?,
            unread_count = unread_count + ?, updated_at = ? WHERE id = ?
        `).run(xiaoheiBotMessagePreview(nextContent, existing.mentions), timestamp, incrementUnread, timestamp, existing.conversationId);
      }
      const eventType = input.eventType ?? (nextWithdrawnAt ? "message.withdrawn" : nextStatus === "complete" ? existing.authorType === "bot" ? "assistant.message.completed" : "message.revised" : nextStatus === "failed" ? "assistant.message.failed" : nextStatus === "cancelled" ? "assistant.message.cancelled" : "message.updated");
      appendXiaoheiBotEvent(database, {
        conversationId: existing.conversationId,
        eventType,
        occurredAt: timestamp,
        actorType: input.actorType ?? (existing.authorType === "bot" ? "bot" : existing.authorType === "user" ? "user" : "system"),
        actorId: input.actorId ?? existing.authorBotId,
        aggregateType: "message",
        aggregateId: messageId,
        correlationId: input.correlationId ?? null,
        causationEventId: input.causationEventId ?? existing.originEventId ?? null,
        parentEventId: input.parentEventId ?? null,
        branchId: input.branchId ?? activeBranchId(database, existing.conversationId),
        sourceEventSeqs: input.sourceEventSeqs,
        payload: {
          before: {
            content: existing.content,
            processItems: existing.processItems,
            status: existing.status,
            errorMessage: existing.errorMessage,
            revision: existing.revision ?? 1,
            withdrawnAt: existing.withdrawnAt ?? null
          },
          after: {
            content: nextContent,
            processItems: nextProcessItems,
            status: nextStatus,
            errorMessage: nextErrorMessage,
            revision: (existing.revision ?? 1) + 1,
            withdrawnAt: nextWithdrawnAt ?? null
          }
        },
        searchText: nextContent,
        synthetic: input.synthetic
      });
      database.exec("COMMIT");
    } catch (error) {
      database.exec("ROLLBACK");
      throw error;
    }
    const message = this.getMessage(messageId);
    if (!message) throw new Error(appText("botRepo.messageUpdateFailed"));
    return message;
  }
  addMessageMentions(messageId, mentions) {
    const database = getDatabase();
    if (!this.getMessage(messageId)) throw new Error(appText("botRepo.messageMissing"));
    database.exec("BEGIN IMMEDIATE");
    try {
      const statement = database.prepare(`
      INSERT OR IGNORE INTO xiaohei_bot_message_mentions (
        message_id, mention_type, bot_id, label, token
      ) VALUES (?, ?, ?, ?, ?)
    `);
      for (const mention of mentions) statement.run(messageId, mention.type, mention.botId ?? null, mention.label, mention.token);
      const message = this.getMessage(messageId);
      if (!message) throw new Error(appText("botRepo.messageMissing"));
      if (message.status === "complete" && message.content.trim()) database.prepare(`
        UPDATE xiaohei_bot_conversations SET last_message_preview = ?, updated_at = ? WHERE id = ?
      `).run(xiaoheiBotMessagePreview(message.content, message.mentions), now(), message.conversationId);
      appendXiaoheiBotEvent(database, {
        conversationId: message.conversationId,
        eventType: "message.mentions-attached",
        actorType: message.authorType === "bot" ? "bot" : "user",
        actorId: message.authorBotId,
        aggregateType: "message",
        aggregateId: messageId,
        causationEventId: message.originEventId ?? null,
        branchId: activeBranchId(database, message.conversationId),
        payload: {
          mentions
        }
      });
      database.exec("COMMIT");
      return message;
    } catch (error) {
      database.exec("ROLLBACK");
      throw error;
    }
  }
  mapMessage(row) {
    const mentions = getDatabase().prepare(`
      SELECT mention_type, bot_id, label, token FROM xiaohei_bot_message_mentions WHERE message_id = ?
    `).all(row.id);
    const attachments = getDatabase().prepare(`
      SELECT id, name, size, mime_type, is_image, local_path,
             asset_id, sha256, integrity_status, verified_at
      FROM xiaohei_bot_attachments WHERE message_id = ?
    `).all(row.id);
    return {
      id: row.id,
      conversationId: row.conversation_id,
      seq: row.seq,
      authorType: row.author_type,
      authorBotId: row.author_bot_id,
      authorName: row.author_name,
      content: row.content,
      mentions: mentions.map(mention => ({
        type: mention.mention_type,
        botId: mention.bot_id ?? undefined,
        label: mention.label,
        token: mention.token
      })),
      attachments: attachments.map(attachment => ({
        id: attachment.id,
        name: attachment.name,
        size: attachment.size,
        mimeType: attachment.mime_type,
        isImage: attachment.is_image === 1,
        localUrl: `xiaohei-bot-attachment://file/${encodeURIComponent(attachment.id)}`,
        assetId: attachment.asset_id,
        sha256: attachment.sha256,
        integrityStatus: attachment.integrity_status ?? "pending"
      })),
      processItems: ensureLegacyTimelineText(row, parseProcessItems(row.process_items_json)),
      status: row.status,
      deliveryMode: row.delivery_mode ?? "normal",
      replyToMessageId: row.reply_to_message_id,
      causalRootMessageId: row.causal_root_message_id,
      hopDepth: row.hop_depth,
      errorMessage: row.error_message,
      originMessageId: row.origin_message_id,
      originEventId: row.origin_event_id,
      revision: Number(row.revision ?? 1),
      withdrawnAt: row.withdrawn_at,
      createdAt: row.created_at,
      updatedAt: row.updated_at
    };
  }
  getAttachmentPath(attachmentId) {
    return getDatabase().prepare(`
      SELECT local_path FROM xiaohei_bot_attachments WHERE id = ?
    `).get(attachmentId)?.local_path ?? null;
  }
  assetReferenceCount(assetId) {
    const row = getDatabase().prepare(`SELECT reference_count FROM xiaohei_bot_assets WHERE asset_id = ?`).get(assetId);
    return Number(row?.reference_count ?? 0);
  }
  listAttachmentsNeedingAssetReconciliation() {
    return getDatabase().prepare(`SELECT attachments.id, attachments.message_id, messages.conversation_id,
                attachments.name, attachments.size, attachments.mime_type,
                attachments.local_path, attachments.asset_id, attachments.sha256,
                attachments.integrity_status, attachments.verified_at
         FROM xiaohei_bot_attachments attachments
         JOIN xiaohei_bot_messages messages ON messages.id = attachments.message_id
         WHERE attachments.asset_id IS NULL
            OR attachments.sha256 IS NULL
            OR attachments.integrity_status <> 'verified'
            OR attachments.verified_at IS NULL
         ORDER BY attachments.created_at ASC`).all().map(row => ({
      id: String(row.id),
      messageId: String(row.message_id),
      conversationId: String(row.conversation_id),
      name: String(row.name),
      size: Number(row.size),
      mimeType: String(row.mime_type),
      localPath: String(row.local_path),
      assetId: typeof row.asset_id === "string" ? row.asset_id : null,
      sha256: typeof row.sha256 === "string" ? row.sha256 : null,
      integrityStatus: row.integrity_status ?? "pending",
      verifiedAt: typeof row.verified_at === "string" ? row.verified_at : null
    }));
  }
  reconcileAttachmentAsset(input) {
    const database = getDatabase();
    const attachment = database.prepare(`SELECT attachments.*, messages.conversation_id
         FROM xiaohei_bot_attachments attachments
         JOIN xiaohei_bot_messages messages ON messages.id = attachments.message_id
         WHERE attachments.id = ?`).get(input.attachmentId);
    if (!attachment) throw new Error(appText("botMain.attachmentMissing"));
    const timestamp = now();
    database.exec("BEGIN IMMEDIATE");
    try {
      database.prepare(`INSERT INTO xiaohei_bot_assets (
            asset_id, sha256, storage_key, size, mime_type, integrity_status,
            reference_count, created_at, verified_at, last_accessed_at
          ) VALUES (?, ?, ?, ?, ?, ?, 1, ?, ?, ?)
          ON CONFLICT(sha256) DO UPDATE SET
            storage_key = excluded.storage_key,
            size = excluded.size,
            mime_type = excluded.mime_type,
            integrity_status = excluded.integrity_status,
            reference_count = CASE
              WHEN xiaohei_bot_assets.asset_id = ?
                THEN xiaohei_bot_assets.reference_count
              ELSE xiaohei_bot_assets.reference_count + 1
            END,
            verified_at = excluded.verified_at,
            last_accessed_at = excluded.last_accessed_at`).run(input.assetId, input.sha256, input.storageKey, input.size, input.mimeType, input.integrityStatus, timestamp, input.verifiedAt ?? null, timestamp, typeof attachment.asset_id === "string" ? attachment.asset_id : "");
      database.prepare(`UPDATE xiaohei_bot_attachments
           SET asset_id = ?, sha256 = ?, local_path = ?, integrity_status = ?,
               verified_at = ? WHERE id = ?`).run(input.assetId, input.sha256, input.localPath, input.integrityStatus, input.verifiedAt ?? null, input.attachmentId);
      appendXiaoheiBotEvent(database, {
        conversationId: String(attachment.conversation_id),
        eventType: "asset.reconciled",
        occurredAt: timestamp,
        actorType: "system",
        aggregateType: "asset",
        aggregateId: input.assetId,
        causationEventId: database.prepare("SELECT origin_event_id FROM xiaohei_bot_messages WHERE id = ?").get(String(attachment.message_id))?.origin_event_id ?? null,
        branchId: activeBranchId(database, String(attachment.conversation_id)),
        payload: {
          attachmentId: input.attachmentId,
          messageId: attachment.message_id,
          assetId: input.assetId,
          sha256: input.sha256,
          size: input.size,
          mimeType: input.mimeType,
          integrityStatus: input.integrityStatus,
          previousLocalPath: attachment.local_path,
          storageKey: input.storageKey
        }
      });
      database.exec("COMMIT");
    } catch (error) {
      database.exec("ROLLBACK");
      throw error;
    }
  }
  markAttachmentIntegrity(attachmentId, status, reason) {
    const database = getDatabase();
    const attachment = database.prepare(`SELECT attachments.*, messages.conversation_id
         FROM xiaohei_bot_attachments attachments
         JOIN xiaohei_bot_messages messages ON messages.id = attachments.message_id
         WHERE attachments.id = ?`).get(attachmentId);
    if (!attachment) return;
    if (attachment.integrity_status === status) return;
    const timestamp = now();
    database.exec("BEGIN IMMEDIATE");
    try {
      database.prepare(`UPDATE xiaohei_bot_attachments
           SET integrity_status = ?, verified_at = NULL WHERE id = ?`).run(status, attachmentId);
      if (attachment.asset_id) database.prepare(`UPDATE xiaohei_bot_assets
             SET integrity_status = ?, verified_at = NULL WHERE asset_id = ?`).run(status, String(attachment.asset_id));
      appendXiaoheiBotEvent(database, {
        conversationId: String(attachment.conversation_id),
        eventType: `asset.${status}`,
        occurredAt: timestamp,
        actorType: "system",
        aggregateType: "asset",
        aggregateId: typeof attachment.asset_id === "string" ? attachment.asset_id : attachmentId,
        branchId: activeBranchId(database, String(attachment.conversation_id)),
        retentionClass: "security",
        payload: {
          attachmentId,
          messageId: attachment.message_id,
          localPath: attachment.local_path,
          status,
          reason
        }
      });
      database.exec("COMMIT");
    } catch (error) {
      database.exec("ROLLBACK");
      throw error;
    }
  }
  getSession(botId, conversationId) {
    const row = getDatabase().prepare(`
      SELECT * FROM xiaohei_bot_sessions WHERE bot_id = ? AND conversation_id = ?
    `).get(botId, conversationId);
    if (!row) return null;
    return {
      botId: row.bot_id,
      conversationId: row.conversation_id,
      piSessionId: row.pi_session_id,
      piSessionFile: row.pi_session_file,
      lastSeenSeq: row.last_seen_seq,
      identityVersion: row.identity_version,
      providerId: row.provider_id,
      modelId: row.model_id,
      piLeafEntryId: row.pi_leaf_entry_id,
      lastEventGlobalSeq: Number(row.last_event_global_seq ?? 0),
      recoveryState: row.recovery_state ?? "clean",
      createdAt: row.created_at,
      updatedAt: row.updated_at
    };
  }
  clearSession(botId, conversationId, context = {}) {
    const database = getDatabase();
    const existing = this.getSession(botId, conversationId);
    if (!existing) return;
    const timestamp = now();
    database.exec("BEGIN IMMEDIATE");
    try {
      appendXiaoheiBotEvent(database, {
        conversationId,
        eventType: context.eventType ?? "agent.session.cleared",
        occurredAt: timestamp,
        actorType: context.actorType ?? "runtime",
        actorId: context.actorId ?? botId,
        aggregateType: "agent-session",
        aggregateId: `${conversationId}:${botId}`,
        correlationId: context.correlationId ?? null,
        causationEventId: context.causationEventId ?? null,
        parentEventId: context.parentEventId ?? null,
        branchId: context.branchId ?? activeBranchId(database, conversationId),
        sourceEventSeqs: context.sourceEventSeqs,
        retentionClass: "security",
        payload: {
          reason: context.reason ?? "reset",
          previousSession: existing
        },
        synthetic: context.synthetic
      });
      database.prepare(`DELETE FROM xiaohei_bot_sessions
           WHERE bot_id = ? AND conversation_id = ?`).run(botId, conversationId);
      database.exec("COMMIT");
    } catch (error) {
      database.exec("ROLLBACK");
      throw error;
    }
  }
  upsertSession(input, seenMessageIds = []) {
    const existing = this.getSession(input.botId, input.conversationId);
    const advancesSession = !existing || input.lastSeenSeq >= existing.lastSeenSeq;
    const effectivePiSessionId = advancesSession ? input.piSessionId ?? existing?.piSessionId ?? null : existing.piSessionId;
    const effectivePiSessionFile = advancesSession ? input.piSessionFile ?? existing?.piSessionFile ?? null : existing.piSessionFile;
    const effectivePiLeafEntryId = advancesSession ? input.piLeafEntryId ?? existing?.piLeafEntryId ?? null : existing.piLeafEntryId;
    const effectiveIdentityVersion = advancesSession ? input.identityVersion : existing.identityVersion;
    const effectiveProviderId = advancesSession ? input.providerId ?? existing?.providerId ?? null : existing.providerId;
    const effectiveModelId = advancesSession ? input.modelId ?? existing?.modelId ?? null : existing.modelId;
    const effectiveRecoveryState = advancesSession ? input.recoveryState ?? "clean" : existing.recoveryState;
    const effectiveLastSeenSeq = Math.max(existing?.lastSeenSeq ?? 0, input.lastSeenSeq);
    const timestamp = now();
    const database = getDatabase();
    database.exec("BEGIN IMMEDIATE");
    try {
      database.prepare(`
        INSERT INTO xiaohei_bot_sessions (
          bot_id, conversation_id, pi_session_id, pi_session_file, last_seen_seq,
          identity_version, provider_id, model_id, pi_leaf_entry_id,
          recovery_state, created_at, updated_at
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        ON CONFLICT(bot_id, conversation_id) DO UPDATE SET
          pi_session_id = CASE
            WHEN excluded.last_seen_seq >= xiaohei_bot_sessions.last_seen_seq
              THEN excluded.pi_session_id ELSE xiaohei_bot_sessions.pi_session_id END,
          pi_session_file = CASE
            WHEN excluded.last_seen_seq >= xiaohei_bot_sessions.last_seen_seq
              THEN excluded.pi_session_file ELSE xiaohei_bot_sessions.pi_session_file END,
          last_seen_seq = MAX(
            xiaohei_bot_sessions.last_seen_seq,
            excluded.last_seen_seq
          ),
          identity_version = CASE
            WHEN excluded.last_seen_seq >= xiaohei_bot_sessions.last_seen_seq
              THEN excluded.identity_version ELSE xiaohei_bot_sessions.identity_version END,
          provider_id = CASE
            WHEN excluded.last_seen_seq >= xiaohei_bot_sessions.last_seen_seq
              THEN excluded.provider_id ELSE xiaohei_bot_sessions.provider_id END,
          model_id = CASE
            WHEN excluded.last_seen_seq >= xiaohei_bot_sessions.last_seen_seq
              THEN excluded.model_id ELSE xiaohei_bot_sessions.model_id END,
          pi_leaf_entry_id = CASE
            WHEN excluded.last_seen_seq >= xiaohei_bot_sessions.last_seen_seq
              THEN excluded.pi_leaf_entry_id ELSE xiaohei_bot_sessions.pi_leaf_entry_id END,
          recovery_state = CASE
            WHEN excluded.last_seen_seq >= xiaohei_bot_sessions.last_seen_seq
              THEN excluded.recovery_state ELSE xiaohei_bot_sessions.recovery_state END,
          updated_at = excluded.updated_at
      `).run(input.botId, input.conversationId, effectivePiSessionId, effectivePiSessionFile, input.lastSeenSeq, effectiveIdentityVersion, effectiveProviderId, effectiveModelId, effectivePiLeafEntryId, effectiveRecoveryState, existing?.createdAt ?? timestamp, timestamp);
      const markSeen = database.prepare(`
        INSERT OR IGNORE INTO xiaohei_bot_session_messages (
          bot_id, conversation_id, message_id, seen_at
        ) VALUES (?, ?, ?, ?)
      `);
      for (const messageId of [...new Set(seenMessageIds)]) markSeen.run(input.botId, input.conversationId, messageId, timestamp);
      const checkpointEvent = appendXiaoheiBotEvent(database, {
        conversationId: input.conversationId,
        eventType: input.eventType ?? "agent.session.checkpointed",
        occurredAt: timestamp,
        actorType: input.actorType ?? "runtime",
        actorId: input.actorId ?? input.botId,
        aggregateType: "agent-session",
        aggregateId: `${input.conversationId}:${input.botId}`,
        correlationId: input.correlationId ?? null,
        causationEventId: input.causationEventId ?? null,
        parentEventId: input.parentEventId ?? null,
        branchId: input.branchId ?? activeBranchId(database, input.conversationId),
        sourceEventSeqs: input.sourceEventSeqs,
        payload: {
          botId: input.botId,
          conversationId: input.conversationId,
          piSessionId: effectivePiSessionId,
          piSessionFile: effectivePiSessionFile,
          piLeafEntryId: effectivePiLeafEntryId,
          lastSeenSeq: effectiveLastSeenSeq,
          identityVersion: effectiveIdentityVersion,
          providerId: effectiveProviderId,
          modelId: effectiveModelId,
          seenMessageIds: [...new Set(seenMessageIds)],
          recoveryState: effectiveRecoveryState
        },
        synthetic: input.synthetic
      });
      database.prepare(`UPDATE xiaohei_bot_sessions SET last_event_global_seq = ?
           WHERE bot_id = ? AND conversation_id = ?`).run(checkpointEvent.globalSeq, input.botId, input.conversationId);
      database.exec("COMMIT");
    } catch (error) {
      database.exec("ROLLBACK");
      throw error;
    }
    const session = this.getSession(input.botId, input.conversationId);
    if (!session) throw new Error(appText("botRepo.sessionSaveFailed"));
    return session;
  }
  getSettings() {
    const row = getDatabase().prepare("SELECT * FROM xiaohei_bot_settings WHERE id = 1").get();
    return {
      systemNotificationsEnabled: row.system_notifications_enabled === 1,
      permissionMode: row.permission_mode,
      maxAutomaticResponders: row.max_automatic_responders,
      maxBotChainDepth: row.max_bot_chain_depth,
      crossConversationHistoryEnabled: row.cross_conversation_history_enabled === 1,
      crossConversationHistoryRoundLimit: row.cross_conversation_history_round_limit,
      timelineSummaryContextEnabled: row.timeline_summary_context_enabled === 1,
      timelineSummaryContextCount: row.timeline_summary_context_count
    };
  }
  updateSettings(input) {
    const database = getDatabase();
    const previous = this.getSettings();
    const historyEnabled = input.crossConversationHistoryEnabled ?? previous.crossConversationHistoryEnabled;
    const historyRoundLimit = input.crossConversationHistoryRoundLimit ?? previous.crossConversationHistoryRoundLimit;
    if (typeof historyEnabled !== "boolean" || !Number.isSafeInteger(historyRoundLimit) || historyRoundLimit < 1) throw new Error(appText("botRepo.historyRoundsInvalid"));
    const timelineEnabled = input.timelineSummaryContextEnabled ?? previous.timelineSummaryContextEnabled;
    const timelineCount = input.timelineSummaryContextCount ?? previous.timelineSummaryContextCount;
    if (typeof timelineEnabled !== "boolean" || !Number.isSafeInteger(timelineCount) || timelineCount < 1) throw new Error(appText("botRepo.timelineSummaryCountInvalid"));
    const timestamp = now();
    database.exec("BEGIN IMMEDIATE");
    try {
      database.prepare(`
      UPDATE xiaohei_bot_settings SET
        system_notifications_enabled = ?, permission_mode = ?, max_automatic_responders = ?,
        max_bot_chain_depth = ?, cross_conversation_history_enabled = ?,
        cross_conversation_history_round_limit = ?, timeline_summary_context_enabled = ?,
        timeline_summary_context_count = ?, updated_at = ?
      WHERE id = 1
    `).run(input.systemNotificationsEnabled ? 1 : 0, input.permissionMode, Math.max(1, Math.min(4, Math.round(input.maxAutomaticResponders))), Math.max(0, Math.min(3, Math.round(input.maxBotChainDepth))), historyEnabled ? 1 : 0, historyRoundLimit, timelineEnabled ? 1 : 0, timelineCount, timestamp);
      appendXiaoheiBotEvent(database, {
        streamId: "settings:xiaohei-bot",
        eventType: "settings.updated",
        occurredAt: timestamp,
        actorType: "user",
        aggregateType: "settings",
        aggregateId: "xiaohei-bot",
        payload: {
          before: previous,
          after: input
        }
      });
      database.exec("COMMIT");
    } catch (error) {
      database.exec("ROLLBACK");
      throw error;
    }
    return this.getSettings();
  }
  createAgentRun(input) {
    const run = this.createAgentRuns([input])[0];
    if (!run) throw new Error("Agent 运行记录创建失败");
    return run;
  }
  createRoutingJob(input) {
    const database = getDatabase();
    const timestamp = now();
    const randomUUIDResult = randomUUID();
    database.exec("BEGIN IMMEDIATE");
    try {
      if (database.prepare(`INSERT OR IGNORE INTO xiaohei_bot_routing_jobs (
            id, conversation_id, trigger_message_id, receptionist_bot_id,
            status, candidate_snapshot_json, created_at, updated_at
          ) VALUES (?, ?, ?, ?, 'queued', ?, ?, ?)`).run(randomUUIDResult, input.conversationId, input.triggerMessageId, input.receptionistBotId, JSON.stringify(input.candidateSnapshot), timestamp, timestamp).changes > 0) appendXiaoheiBotEvent(database, {
        conversationId: input.conversationId,
        eventType: input.eventType ?? "routing.reception.queued",
        occurredAt: timestamp,
        actorType: input.actorType ?? "system",
        actorId: input.actorId ?? input.receptionistBotId,
        aggregateType: "routing-job",
        aggregateId: randomUUIDResult,
        correlationId: input.correlationId ?? input.triggerMessageId,
        causationEventId: input.causationEventId ?? null,
        parentEventId: input.parentEventId ?? null,
        branchId: input.branchId ?? activeBranchId(database, input.conversationId),
        payload: {
          id: randomUUIDResult,
          conversationId: input.conversationId,
          triggerMessageId: input.triggerMessageId,
          receptionistBotId: input.receptionistBotId,
          status: "queued",
          candidateSnapshot: input.candidateSnapshot
        }
      });
      database.exec("COMMIT");
    } catch (error) {
      database.exec("ROLLBACK");
      throw error;
    }
    const job = this.getRoutingJobByTrigger(input.triggerMessageId);
    if (!job) throw new Error("接待路由任务创建失败");
    return job;
  }
  getRoutingJob(jobId) {
    const row = getDatabase().prepare("SELECT * FROM xiaohei_bot_routing_jobs WHERE id = ?").get(jobId);
    return row ? this.mapRoutingJob(row) : null;
  }
  getRoutingJobByTrigger(triggerMessageId) {
    const row = getDatabase().prepare("SELECT * FROM xiaohei_bot_routing_jobs WHERE trigger_message_id = ?").get(triggerMessageId);
    return row ? this.mapRoutingJob(row) : null;
  }
  listQueuedRoutingJobs(conversationId) {
    return getDatabase().prepare(`SELECT jobs.*
         FROM xiaohei_bot_routing_jobs jobs
         JOIN xiaohei_bot_messages messages
           ON messages.id = jobs.trigger_message_id
         WHERE jobs.status = 'queued'
           ${conversationId ? "AND jobs.conversation_id = ?" : ""}
         ORDER BY jobs.conversation_id ASC, messages.seq ASC,
                  jobs.created_at ASC, jobs.id ASC`).all(...(conversationId ? [conversationId] : [])).map(row => this.mapRoutingJob(row));
  }
  listActiveRoutingJobs(conversationId, botId) {
    return getDatabase().prepare(`SELECT * FROM xiaohei_bot_routing_jobs
         WHERE status IN ('queued', 'running')
           AND (? IS NULL OR conversation_id = ?)
           AND (? IS NULL OR receptionist_bot_id = ? OR selected_bot_id = ?)
         ORDER BY created_at ASC, id ASC`).all(conversationId ?? null, conversationId ?? null, botId ?? null, botId ?? null, botId ?? null).map(row => this.mapRoutingJob(row));
  }
  claimRoutingJob(jobId) {
    const database = getDatabase();
    const timestamp = now();
    let claimed = false;
    database.exec("BEGIN IMMEDIATE");
    try {
      const existing = database.prepare("SELECT * FROM xiaohei_bot_routing_jobs WHERE id = ?").get(jobId);
      if (existing) {
        const existingJob = this.mapRoutingJob(existing);
        claimed = database.prepare(`UPDATE xiaohei_bot_routing_jobs SET
               status = 'running',
               error_message = NULL,
               started_at = COALESCE(started_at, ?),
               completed_at = NULL,
               updated_at = ?
             WHERE id = ? AND status = 'queued'`).run(timestamp, timestamp, jobId).changes === 1;
        if (claimed) appendXiaoheiBotEvent(database, {
          conversationId: existingJob.conversationId,
          eventType: "routing.reception.running",
          occurredAt: timestamp,
          actorType: "system",
          actorId: existingJob.receptionistBotId,
          aggregateType: "routing-job",
          aggregateId: jobId,
          correlationId: existingJob.triggerMessageId,
          branchId: activeBranchId(database, existingJob.conversationId),
          payload: {
            previousStatus: "queued",
            status: "running",
            selectedBotId: existingJob.selectedBotId,
            decisionSource: existingJob.decisionSource,
            decisionReason: existingJob.decisionReason,
            errorMessage: null
          }
        });
      }
      database.exec("COMMIT");
    } catch (error) {
      database.exec("ROLLBACK");
      throw error;
    }
    if (!claimed) return null;
    const job = this.getRoutingJob(jobId);
    if (!job) throw new Error("接待路由任务认领后丢失");
    return job;
  }
  updateRoutingJob(jobId, input) {
    const database = getDatabase();
    database.exec("BEGIN IMMEDIATE");
    try {
      const existing = database.prepare("SELECT * FROM xiaohei_bot_routing_jobs WHERE id = ?").get(jobId);
      if (!existing) throw new Error("接待路由任务不存在");
      const existingJob = this.mapRoutingJob(existing);
      if (["completed", "failed", "cancelled"].includes(existingJob.status)) {
        database.exec("COMMIT");
        return existingJob;
      }
      const timestamp = now();
      const startedAt = input.status === "running" ? timestamp : null;
      const completedAt = ["completed", "failed", "cancelled"].includes(input.status) ? timestamp : null;
      database.prepare(`UPDATE xiaohei_bot_routing_jobs SET
             status = ?,
             selected_bot_id = COALESCE(?, selected_bot_id),
             selected_bot_ids_json = COALESCE(?, selected_bot_ids_json),
             decision_source = COALESCE(?, decision_source),
             decision_reason = COALESCE(?, decision_reason),
             error_message = ?,
             started_at = COALESCE(started_at, ?),
             completed_at = ?,
             updated_at = ?
           WHERE id = ?`).run(input.status, input.selectedBotIds?.[0] ?? input.selectedBotId ?? null, input.selectedBotIds ? JSON.stringify([...new Set(input.selectedBotIds)]) : input.selectedBotId ? JSON.stringify([input.selectedBotId]) : null, input.decisionSource ?? null, input.decisionReason ?? null, input.errorMessage ?? null, startedAt, completedAt, timestamp, jobId);
      appendXiaoheiBotEvent(database, {
        conversationId: existingJob.conversationId,
        eventType: input.eventType ?? `routing.reception.${input.status}`,
        occurredAt: timestamp,
        actorType: input.actorType ?? "system",
        actorId: input.actorId ?? existingJob.receptionistBotId,
        aggregateType: "routing-job",
        aggregateId: jobId,
        correlationId: input.correlationId ?? existingJob.triggerMessageId,
        causationEventId: input.causationEventId ?? null,
        parentEventId: input.parentEventId ?? null,
        branchId: input.branchId ?? activeBranchId(database, existingJob.conversationId),
        payload: {
          previousStatus: existingJob.status,
          status: input.status,
          selectedBotId: input.selectedBotIds?.[0] ?? input.selectedBotId ?? existingJob.selectedBotId,
          selectedBotIds: input.selectedBotIds ?? (input.selectedBotId ? [input.selectedBotId] : existingJob.selectedBotIds),
          decisionSource: input.decisionSource ?? existingJob.decisionSource,
          decisionReason: input.decisionReason ?? existingJob.decisionReason,
          errorMessage: input.errorMessage ?? null
        }
      });
      const updated = database.prepare("SELECT * FROM xiaohei_bot_routing_jobs WHERE id = ?").get(jobId);
      if (!updated) throw new Error("接待路由任务更新失败");
      database.exec("COMMIT");
      return this.mapRoutingJob(updated);
    } catch (error) {
      database.exec("ROLLBACK");
      throw error;
    }
  }
  cancelRoutingJobs(conversationId) {
    return this.listActiveRoutingJobs(conversationId).map(job => this.updateRoutingJob(job.id, {
      status: "cancelled",
      eventType: "routing.reception.cancelled",
      correlationId: job.triggerMessageId
    }));
  }
  recoverInterruptedRoutingJobs() {
    const jobs = getDatabase().prepare("SELECT * FROM xiaohei_bot_routing_jobs WHERE status = 'running' ORDER BY created_at ASC").all();
    for (const row of jobs) {
      const job = this.mapRoutingJob(row);
      this.updateRoutingJob(job.id, {
        status: "queued",
        eventType: "recovery.routing-requeued",
        correlationId: job.triggerMessageId,
        errorMessage: "客户端重启后重新执行无工具接待路由"
      });
    }
    return jobs.length;
  }
  createAgentRuns(inputs, withinTransaction = false) {
    if (inputs.length === 0) return [];
    const database = getDatabase();
    const timestamp = now();
    const prepared = inputs.map(input => ({
      input,
      id: randomUUID()
    }));
    database.exec(withinTransaction ? "SAVEPOINT management_createAgentRuns" : "BEGIN IMMEDIATE");
    try {
      const insert = database.prepare(`
      INSERT OR IGNORE INTO xiaohei_bot_agent_runs (
        id, conversation_id, bot_id, trigger_message_id, status, mandatory_reply,
        delivery_mode, route_order, provider_id, model_id, created_at, updated_at
      ) VALUES (?, ?, ?, ?, 'queued', ?, ?, ?, ?, ?, ?, ?)
    `);
      for (const {
        input,
        id
      } of prepared) if (insert.run(id, input.conversationId, input.botId, input.triggerMessageId, input.mandatoryReply ? 1 : 0, input.deliveryMode ?? "normal", input.routeOrder ?? 0, input.providerId ?? null, input.modelId ?? null, timestamp, timestamp).changes > 0) appendXiaoheiBotEvent(database, {
        conversationId: input.conversationId,
        eventType: input.eventType ?? "agent.run.queued",
        occurredAt: timestamp,
        actorType: input.actorType ?? "runtime",
        actorId: input.actorId ?? input.botId,
        aggregateType: "agent-run",
        aggregateId: id,
        correlationId: input.correlationId ?? input.triggerMessageId,
        causationEventId: input.causationEventId ?? null,
        parentEventId: input.parentEventId ?? null,
        branchId: input.branchId ?? activeBranchId(database, input.conversationId),
        sourceEventSeqs: input.sourceEventSeqs,
        payload: {
          id,
          conversationId: input.conversationId,
          botId: input.botId,
          triggerMessageId: input.triggerMessageId,
          status: "queued",
          mandatoryReply: input.mandatoryReply,
          deliveryMode: input.deliveryMode ?? "normal",
          routeOrder: input.routeOrder ?? 0,
          providerId: input.providerId ?? null,
          modelId: input.modelId ?? null
        },
        synthetic: input.synthetic
      });
      database.exec(withinTransaction ? "RELEASE management_createAgentRuns" : "COMMIT");
    } catch (error) {
      database.exec(withinTransaction ? "ROLLBACK TO management_createAgentRuns; RELEASE management_createAgentRuns" : "ROLLBACK");
      throw error;
    }
    const select = database.prepare(`SELECT * FROM xiaohei_bot_agent_runs
       WHERE trigger_message_id = ? AND bot_id = ?`);
    return inputs.map(input => this.mapAgentRun(select.get(input.triggerMessageId, input.botId)));
  }
  getAgentRun(runId) {
    const row = getDatabase().prepare("SELECT * FROM xiaohei_bot_agent_runs WHERE id = ?").get(runId);
    return row ? this.mapAgentRun(row) : null;
  }
  listAgentRunsForTrigger(triggerMessageId) {
    return getDatabase().prepare(`SELECT * FROM xiaohei_bot_agent_runs
         WHERE trigger_message_id = ?
         ORDER BY route_order ASC, created_at ASC, id ASC`).all(triggerMessageId).map(row => this.mapAgentRun(row));
  }
  listAgentRunsForMessageTree(rootMessageId) {
    return getDatabase().prepare(`
      SELECT runs.* FROM xiaohei_bot_agent_runs runs
      JOIN xiaohei_bot_messages trigger_message ON trigger_message.id = runs.trigger_message_id
      WHERE trigger_message.id = ? OR trigger_message.causal_root_message_id = ?
      ORDER BY runs.created_at ASC, runs.route_order ASC, runs.id ASC
    `).all(rootMessageId, rootMessageId).map(row => this.mapAgentRun(row));
  }
  listQueuedAgentRuns(conversationId) {
    return getDatabase().prepare(`SELECT runs.*
         FROM xiaohei_bot_agent_runs runs
         JOIN xiaohei_bot_messages messages
           ON messages.id = runs.trigger_message_id
         WHERE runs.status = 'queued'
           ${conversationId ? "AND runs.conversation_id = ?" : ""}
         ORDER BY runs.conversation_id ASC, messages.seq ASC,
                  runs.route_order ASC, runs.created_at ASC, runs.id ASC`).all(...(conversationId ? [conversationId] : [])).map(row => this.mapAgentRun(row));
  }
  updateAgentRun(runId, input) {
    const database = getDatabase();
    const existing = database.prepare("SELECT * FROM xiaohei_bot_agent_runs WHERE id = ?").get(runId);
    if (!existing) throw new Error("Agent 运行记录不存在");
    const timestamp = now();
    const startedAt = input.status === "running" ? timestamp : null;
    const completedAt = ["completed", "skipped", "failed", "cancelled"].includes(input.status) ? timestamp : null;
    database.exec("BEGIN IMMEDIATE");
    try {
      database.prepare(`
      UPDATE xiaohei_bot_agent_runs SET
        status = ?, response_message_id = COALESCE(?, response_message_id),
        input_tokens = ?, output_tokens = ?, cache_read_tokens = ?, cache_write_tokens = ?,
        ttft_ms = ?, ttft_samples = ?, decode_ms = ?, decode_tokens = ?,
        error_message = ?, tool_executions_json = COALESCE(?, tool_executions_json),
        request_event_id = COALESCE(?, request_event_id),
        request_hash = COALESCE(?, request_hash),
        request_snapshot_json = COALESCE(?, request_snapshot_json),
        pi_leaf_entry_id = COALESCE(?, pi_leaf_entry_id),
        recovery_state = COALESCE(?, recovery_state),
        started_at = COALESCE(started_at, ?), completed_at = ?, updated_at = ?
      WHERE id = ?
    `).run(input.status, input.responseMessageId ?? null, input.usage?.input ?? 0, input.usage?.output ?? 0, input.usage?.cacheRead ?? 0, input.usage?.cacheWrite ?? 0, input.performance?.ttftMs ?? 0, input.performance?.ttftSamples ?? 0, input.performance?.decodeMs ?? 0, input.performance?.decodeTokens ?? 0, input.errorMessage ?? null, input.toolExecutions === undefined ? null : JSON.stringify(input.toolExecutions), input.requestEventId ?? null, input.requestHash ?? null, input.requestSnapshot === undefined ? null : JSON.stringify(input.requestSnapshot), input.piLeafEntryId ?? null, input.recoveryState ?? null, startedAt, completedAt, timestamp, runId);
      appendXiaoheiBotEvent(database, {
        conversationId: String(existing.conversation_id),
        eventType: input.eventType ?? `agent.run.${input.status}`,
        occurredAt: timestamp,
        actorType: input.actorType ?? "runtime",
        actorId: input.actorId ?? String(existing.bot_id),
        aggregateType: "agent-run",
        aggregateId: runId,
        correlationId: input.correlationId ?? runId,
        causationEventId: input.causationEventId ?? existing.request_event_id ?? null,
        parentEventId: input.parentEventId ?? null,
        branchId: input.branchId ?? activeBranchId(database, String(existing.conversation_id)),
        sourceEventSeqs: input.sourceEventSeqs,
        payload: {
          beforeStatus: existing.status,
          status: input.status,
          responseMessageId: input.responseMessageId ?? existing.response_message_id ?? null,
          usage: input.usage ?? null,
          performance: input.performance ?? null,
          errorMessage: input.errorMessage ?? null,
          toolExecutions: input.toolExecutions ?? null,
          requestEventId: input.requestEventId ?? existing.request_event_id ?? null,
          requestHash: input.requestHash ?? existing.request_hash ?? null,
          piLeafEntryId: input.piLeafEntryId ?? existing.pi_leaf_entry_id ?? null,
          recoveryState: input.recoveryState ?? existing.recovery_state ?? "clean"
        },
        synthetic: input.synthetic
      });
      database.exec("COMMIT");
    } catch (error) {
      database.exec("ROLLBACK");
      throw error;
    }
  }
  getConversationStats(conversationId) {
    const row = getDatabase().prepare(`
      SELECT
        COALESCE(SUM(input_tokens), 0) AS input_tokens,
        COALESCE(SUM(output_tokens), 0) AS output_tokens,
        COALESCE(SUM(cache_read_tokens), 0) AS cache_read_tokens,
        COALESCE(SUM(cache_write_tokens), 0) AS cache_write_tokens,
        COALESCE(SUM(ttft_ms), 0) AS ttft_ms,
        COALESCE(SUM(ttft_samples), 0) AS ttft_samples,
        COALESCE(SUM(decode_ms), 0) AS decode_ms,
        COALESCE(SUM(decode_tokens), 0) AS decode_tokens
      FROM xiaohei_bot_agent_runs
      WHERE conversation_id = ? AND status = 'completed'
    `).get(conversationId);
    return {
      conversationId,
      ...conversationContextUsage(getDatabase(), conversationId),
      ttftTotalMs: Number(row?.ttft_ms ?? 0),
      ttftSampleCount: Number(row?.ttft_samples ?? 0),
      decodeTotalMs: Number(row?.decode_ms ?? 0),
      decodeTokens: Number(row?.decode_tokens ?? 0)
    };
  }
  recordAgentRequestSnapshot(runId, snapshot, context = {}) {
    const database = getDatabase();
    const run = database.prepare("SELECT * FROM xiaohei_bot_agent_runs WHERE id = ?").get(runId);
    if (!run) throw new Error("Agent 运行记录不存在");
    const timestamp = now();
    database.exec("BEGIN IMMEDIATE");
    try {
      const event = appendXiaoheiBotEvent(database, {
        conversationId: String(run.conversation_id),
        eventType: context.eventType ?? "agent.request.snapshot",
        occurredAt: timestamp,
        actorType: context.actorType ?? "runtime",
        actorId: context.actorId ?? String(run.bot_id),
        aggregateType: "agent-run",
        aggregateId: runId,
        correlationId: context.correlationId ?? runId,
        causationEventId: context.causationEventId ?? null,
        parentEventId: context.parentEventId ?? null,
        branchId: context.branchId ?? activeBranchId(database, String(run.conversation_id)),
        sourceEventSeqs: context.sourceEventSeqs,
        payload: snapshot,
        synthetic: context.synthetic
      });
      database.prepare(`UPDATE xiaohei_bot_agent_runs
           SET request_event_id = ?, request_hash = ?, request_snapshot_json = ?,
               updated_at = ? WHERE id = ?`).run(event.eventId, event.payloadSha256, JSON.stringify(snapshot), timestamp, runId);
      database.exec("COMMIT");
      return {
        eventId: event.eventId,
        payloadSha256: event.payloadSha256,
        globalSeq: event.globalSeq
      };
    } catch (error) {
      database.exec("ROLLBACK");
      throw error;
    }
  }
  recoverInterruptedRuns() {
    const database = getDatabase();
    const timestamp = now();
    const errorMessage = appText("botRepo.interruptedByQuit");
    const interruptedRuns = database.prepare(`SELECT * FROM xiaohei_bot_agent_runs
         WHERE status = 'running'
         ORDER BY created_at ASC, id ASC`).all();
    let recoveredMessages = 0;
    database.exec("BEGIN IMMEDIATE");
    try {
      for (const run of interruptedRuns) {
        const runId = String(run.id);
        const conversationId = String(run.conversation_id);
        const botId = String(run.bot_id);
        ensureMainBranch(database, conversationId, String(run.created_at));
        database.prepare(`UPDATE xiaohei_bot_sessions
             SET recovery_state = 'interrupted', updated_at = ?
             WHERE bot_id = ? AND conversation_id = ?`).run(timestamp, botId, conversationId);
        const responseMessageId = typeof run.response_message_id === "string" ? run.response_message_id : null;
        if (responseMessageId) {
          const message = database.prepare("SELECT * FROM xiaohei_bot_messages WHERE id = ?").get(responseMessageId);
          if (message && (message.status === "pending" || message.status === "streaming")) {
            database.prepare(`UPDATE xiaohei_bot_messages
                 SET status = 'failed', error_message = ?, revision = revision + 1,
                     updated_at = ? WHERE id = ?`).run(errorMessage, timestamp, responseMessageId);
            appendXiaoheiBotEvent(database, {
              conversationId,
              eventType: "recovery.message-interrupted",
              occurredAt: timestamp,
              actorType: "system",
              aggregateType: "message",
              aggregateId: responseMessageId,
              correlationId: runId,
              causationEventId: run.request_event_id ?? null,
              branchId: activeBranchId(database, conversationId),
              payload: {
                previousStatus: message.status,
                status: "failed",
                errorMessage,
                processItems: parseJsonValue(message.process_items_json)
              }
            });
            recoveredMessages += 1;
          }
        }
        database.prepare(`UPDATE xiaohei_bot_agent_runs
             SET status = 'failed', error_message = ?, recovery_state = 'interrupted',
                 completed_at = ?, updated_at = ? WHERE id = ?`).run(errorMessage, timestamp, timestamp, runId);
        appendXiaoheiBotEvent(database, {
          conversationId,
          eventType: "recovery.run-interrupted",
          occurredAt: timestamp,
          actorType: "system",
          aggregateType: "agent-run",
          aggregateId: runId,
          correlationId: runId,
          causationEventId: run.request_event_id ?? null,
          branchId: activeBranchId(database, conversationId),
          retentionClass: "security",
          payload: {
            previousStatus: run.status,
            status: "failed",
            recoveryState: "interrupted",
            errorMessage,
            piSessionId: run.pi_session_id ?? null,
            piLeafEntryId: run.pi_leaf_entry_id ?? null,
            toolExecutions: parseJsonValue(run.tool_executions_json) ?? [],
            toolOutcome: "unknown-after-crash",
            sessionPointerPreserved: true
          }
        });
      }
      const orphanMessages = database.prepare(`SELECT messages.* FROM xiaohei_bot_messages messages
           LEFT JOIN xiaohei_bot_agent_runs runs
             ON runs.response_message_id = messages.id
           WHERE messages.status IN ('pending', 'streaming')
             AND runs.id IS NULL`).all();
      for (const message of orphanMessages) {
        const messageId = String(message.id);
        const conversationId = String(message.conversation_id);
        database.prepare(`UPDATE xiaohei_bot_messages
             SET status = 'failed', error_message = ?, revision = revision + 1,
                 updated_at = ? WHERE id = ?`).run(errorMessage, timestamp, messageId);
        appendXiaoheiBotEvent(database, {
          conversationId,
          eventType: "recovery.orphan-message-interrupted",
          occurredAt: timestamp,
          actorType: "system",
          aggregateType: "message",
          aggregateId: messageId,
          causationEventId: message.origin_event_id ?? null,
          branchId: activeBranchId(database, conversationId),
          payload: {
            previousStatus: message.status,
            status: "failed",
            errorMessage
          }
        });
        recoveredMessages += 1;
      }
      database.exec("COMMIT");
    } catch (error) {
      database.exec("ROLLBACK");
      throw error;
    }
    return {
      recoveredRuns: interruptedRuns.length,
      recoveredMessages
    };
  }
  mapAgentRun(row) {
    return {
      id: row.id,
      conversationId: row.conversation_id,
      botId: row.bot_id,
      triggerMessageId: row.trigger_message_id,
      responseMessageId: row.response_message_id,
      status: row.status,
      mandatoryReply: row.mandatory_reply === 1,
      deliveryMode: row.delivery_mode ?? "normal",
      routeOrder: Number(row.route_order ?? 0),
      providerId: row.provider_id,
      modelId: row.model_id,
      requestEventId: row.request_event_id,
      requestHash: row.request_hash,
      requestSnapshot: parseJsonRecord(row.request_snapshot_json),
      piLeafEntryId: row.pi_leaf_entry_id,
      recoveryState: row.recovery_state ?? "clean",
      createdAt: row.created_at,
      updatedAt: row.updated_at
    };
  }
  mapRoutingJob(row) {
    const parsedCandidates = parseJsonValue(row.candidate_snapshot_json);
    return {
      id: row.id,
      conversationId: row.conversation_id,
      triggerMessageId: row.trigger_message_id,
      receptionistBotId: row.receptionist_bot_id,
      status: row.status,
      candidateSnapshot: Array.isArray(parsedCandidates) ? parsedCandidates.filter(candidate => Boolean(candidate) && typeof candidate === "object" && !Array.isArray(candidate)) : [],
      selectedBotId: row.selected_bot_id,
      selectedBotIds: parseStringArray(row.selected_bot_ids_json ?? "[]"),
      decisionSource: row.decision_source ?? null,
      decisionReason: row.decision_reason,
      errorMessage: row.error_message,
      createdAt: row.created_at,
      updatedAt: row.updated_at
    };
  }
};
var xiaoheiBotRepository = new XiaoheiBotRepository();
//#endregion
//#region electron/services/notification.service.ts
var NotificationService = class {
  v3UnavailableUntil = 0;
  deltaOwner = "";
  deltaCache = /* @__PURE__ */new Map();
  syncPending = null;
  readStatusDirtyToken = null;
  readUploadRevision = 0;
  templateMarketMaxId = null;
  async syncDelta(token) {
    if (Date.now() < this.v3UnavailableUntil) return false;
    if (this.deltaOwner !== token) {
      this.deltaOwner = token;
      this.deltaCache.clear();
    }
    const staged = /* @__PURE__ */new Map();
    const reads = [];
    let beforeId = 0;
    let marketMaxId = null;
    do {
      const known = Object.fromEntries([...this.deltaCache].filter(([id]) => !beforeId || id < beforeId).sort(([a], [b]) => b - a).slice(0, 100).map(([id, value]) => [id, value.version]));
      const response = await fetch(`${API_BASE}/v3/notifications.php`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          ...this.getClientTarget(),
          known,
          beforeId
        }),
        signal: AbortSignal.timeout(3e4)
      });
      if (this.getToken() !== token) throw new Error("Notification owner changed");
      if ([404, 405, 413, 501, 503].includes(response.status)) {
        this.v3UnavailableUntil = Date.now() + 18e5;
        return false;
      }
      const payload = await response.json();
      const data = payload.data;
      if (!response.ok || !payload.ok || !data || !Array.isArray(data.ids) || !Array.isArray(data.items) || !Array.isArray(data.reads)) throw new Error(appText("ipcErrors.notificationSyncPending"));
      if (typeof data.templateMarketMaxId === "number") marketMaxId = data.templateMarketMaxId;
      const items = new Map(data.items.map(item => [Number(item.id), item]));
      for (const {
        id,
        version
      } of data.ids) {
        const cached = this.deltaCache.get(id);
        const item = items.get(id) ?? (cached?.version === version ? cached.item : undefined);
        if (!item || !Number.isInteger(id) || id <= 0 || typeof version !== "string") throw new Error("Invalid notification delta");
        staged.set(id, {
          version,
          item
        });
      }
      reads.push(...data.reads);
      if (!data.hasMore) break;
      if (!data.beforeId || beforeId && data.beforeId >= beforeId) throw new Error("Notification cursor stalled");
      beforeId = data.beforeId;
    } while (true);
    if (this.getToken() !== token) throw new Error("Notification owner changed");
    notificationRepository.syncAll([...staged.values()].map(({
      item
    }) => ({
      ...item,
      type: item.source === "todo" ? "todo" : item.type
    })));
    notificationRepository.importCloudReads(reads);
    this.deltaCache = staged;
    this.templateMarketMaxId = marketMaxId;
    this.notifyChanged();
    return true;
  }
  getClientTarget() {
    return {
      platform: ["darwin", "win32"].includes(process.platform) ? process.platform : "all",
      arch: ["arm64", "x64"].includes(process.arch) ? process.arch : "all",
      appVersion: app.getVersion()
    };
  }
  notifyChanged() {
    for (const win of BrowserWindow.getAllWindows()) {
      if (win.isDestroyed() || win.webContents.isDestroyed() || win.webContents.isLoadingMainFrame()) continue;
      try {
        const mainFrame = win.webContents.mainFrame;
        if (mainFrame.detached || mainFrame.isDestroyed()) continue;
        mainFrame.send("notifications:changed");
      } catch {}
    }
  }
  getToken() {
    return authRepository.getSession()?.token ?? null;
  }
  async callApi(endpoint, body, method = "POST") {
    const token = this.getToken();
    if (!token) throw new Error(appText("ipcErrors.loginRequired"));
    const headers = {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    };
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3e4);
    const startedAt = Date.now();
    const action = typeof body?.action === "string" ? body.action : endpoint;
    let requestUrl = `${API_BASE}/${endpoint}`;
    let responseText = "";
    let httpStatus;
    let businessCode;
    let businessMessage;
    try {
      const url = `${API_BASE}/${endpoint}`;
      const options = {
        method,
        headers,
        signal: controller.signal
      };
      if (method === "GET" && body) {
        const params = new URLSearchParams();
        for (const [key, value] of Object.entries(body)) if (value !== undefined && value !== null) params.append(key, String(value));
        const getUrl = `${url}?${params.toString()}`;
        requestUrl = getUrl;
        const response = await fetch(getUrl, {
          ...options,
          method: "GET"
        });
        httpStatus = response.status;
        responseText = await response.text();
        const json = JSON.parse(responseText || "{}");
        businessCode = json.error?.code;
        businessMessage = json.error?.message;
        if (!response.ok || !json.ok || !json.data) throw new Error(json.error?.message || appText("aiErrors.requestFailed"));
        return json.data;
      }
      if (body) options.body = JSON.stringify(body);
      const response = await fetch(url, options);
      httpStatus = response.status;
      responseText = await response.text();
      const json = JSON.parse(responseText || "{}");
      businessCode = json.error?.code;
      businessMessage = json.error?.message;
      if (!response.ok || !json.ok) throw new Error(json.error?.message || appText("aiErrors.requestFailed"));
      return json.data;
    } catch (error) {
      await reportApiRequestException({
        source: "main",
        module: "notifications",
        action,
        method,
        url: requestUrl,
        error,
        httpStatus,
        businessCode,
        businessMessage,
        responseText,
        requestBody: body,
        durationMs: Date.now() - startedAt,
        timeoutMs: 3e4,
        context: {
          endpoint,
          aborted: controller.signal.aborted
        }
      });
      throw error;
    } finally {
      clearTimeout(timeoutId);
    }
  }
  syncFromCloud() {
    if (this.syncPending) return this.syncPending;
    const task = this.runCloudSync().finally(() => {
      if (this.syncPending === task) this.syncPending = null;
    });
    this.syncPending = task;
    return task;
  }
  async runCloudSync() {
    const token = this.getToken();
    if (!token) return false;
    if (await this.syncDelta(token)) return true;
    const allNotifications = [];
    let page = 1;
    const pageSize = 50;
    let marketMaxId = null;
    const clientTarget = this.getClientTarget();
    while (true) {
      const data = await this.callApi("notifications.php", {
        action: "list",
        page,
        pageSize,
        ...clientTarget
      }, "GET");
      allNotifications.push(...data.list);
      if (typeof data.templateMarketMaxId === "number") marketMaxId = data.templateMarketMaxId;
      if (page >= data.totalPages || data.list.length === 0) break;
      page++;
    }
    if (this.getToken() !== token) throw new Error("Notification owner changed");
    notificationRepository.syncAll(allNotifications.map(notification => ({
      ...notification,
      type: notification.source === "todo" ? "todo" : notification.type
    })));
    this.templateMarketMaxId = marketMaxId;
    this.notifyChanged();
    return false;
  }
  getTemplateMarketMaxId() {
    return this.templateMarketMaxId;
  }
  needsReadStatusRestore() {
    return this.readStatusDirtyToken !== null && this.readStatusDirtyToken === this.getToken();
  }
  async syncReadStatusToCloud() {
    const token = this.getToken();
    if (!token) return false;
    const unsynced = notificationRepository.getUnsyncedReads();
    if (unsynced.length === 0) return false;
    const ids = unsynced.map(item => item.notificationId);
    const clientTarget = this.getClientTarget();
    try {
      if (ids.length === 1) await this.callApi("notifications.php", {
        action: "mark-read",
        notificationId: ids[0],
        ...clientTarget
      });else await this.callApi("notifications.php", {
        action: "mark-all-read",
        ...clientTarget
      });
      if (this.getToken() === token) {
        notificationRepository.markSynced(ids);
        this.readStatusDirtyToken = token;
        this.readUploadRevision++;
      }
      return this.getToken() === token;
    } catch (error) {
      console.warn("[NotificationService] 同步已读状态到云端失败:", error);
      throw error;
    }
  }
  async restoreReadStatusFromCloud() {
    const token = this.getToken();
    if (!token) return false;
    const writeRevision = this.readUploadRevision;
    try {
      const data = await this.callApi("notifications.php", {
        action: "read-status",
        ...this.getClientTarget()
      }, "GET");
      if (this.getToken() === token && data.reads.length > 0) {
        notificationRepository.importCloudReads(data.reads);
        this.notifyChanged();
      }
      if (this.getToken() === token && this.readUploadRevision === writeRevision) this.readStatusDirtyToken = null;
      return this.getToken() === token && !this.needsReadStatusRestore();
    } catch (error) {
      console.warn("[NotificationService] 从云端恢复已读状态失败:", error);
      return false;
    }
  }
  getNotifications() {
    const notifications = notificationRepository.listNotifications();
    if (!notifications.some(item => item.id < 0 && item.type === "xiaohei_bot")) return notifications;
    const bots = xiaoheiBotRepository.listBots();
    return notifications.map(notification => {
      if (notification.id >= 0 || notification.type !== "xiaohei_bot") return notification;
      let botId = null;
      let conversationId = null;
      try {
        if (notification.link) {
          const link = new URL(notification.link);
          if (link.protocol === "xiaohei-bot:" && link.hostname === "conversation") {
            botId = link.searchParams.get("botId");
            conversationId = decodeURIComponent(link.pathname.slice(1));
          }
        }
      } catch {
        return notification;
      }
      if (!botId && conversationId) botId = xiaoheiBotRepository.getConversation(conversationId)?.directBotId ?? null;
      const matches = botId ? bots.filter(bot => bot.id === botId) : bots.filter(bot => notification.title === bot.name || notification.title.endsWith(` · ${bot.name}`));
      return {
        ...notification,
        avatar: matches.length === 1 ? matches[0].avatar : undefined
      };
    });
  }
  getUnreadCount() {
    return notificationRepository.getUnreadCount();
  }
  markRead(notificationId) {
    notificationRepository.markRead(notificationId);
    this.notifyChanged();
    this.syncReadStatusToCloud().catch(() => {});
  }
  markBotConversationRead(conversationId) {
    const notifications = notificationRepository.listNotifications();
    let changed = false;
    for (const notification of notifications) {
      if (notification.id >= 0 || notification.type !== "xiaohei_bot" || notification.isRead || !notification.link) continue;
      try {
        const link = new URL(notification.link);
        if (link.protocol !== "xiaohei-bot:" || link.hostname !== "conversation" || decodeURIComponent(link.pathname.slice(1)) !== conversationId) continue;
      } catch {
        continue;
      }
      notificationRepository.markRead(notification.id);
      changed = true;
    }
    if (changed) this.notifyChanged();
  }
  markAllRead() {
    const ids = notificationRepository.markAllRead();
    this.notifyChanged();
    this.syncReadStatusToCloud().catch(() => {});
    return ids;
  }
  addLocalNotification(input) {
    const notification = notificationRepository.createLocalNotification(input);
    this.notifyChanged();
    return notification;
  }
  /** 每月初的月度工作卡提醒，同一个月只写一条，换设备或清缓存后也不会重复 */
  addMonthlyRecapNotification(input) {
    const link = `${SHARE_CARD_MONTH_LINK_PREFIX}${input.month}`;
    if (notificationRepository.hasLocalNotificationWithLink(link)) return false;
    this.addLocalNotification({
      title: input.title,
      content: input.content,
      type: "system",
      link
    });
    return true;
  }
  expireLocalUpdateNotifications(activeLink) {
    if (notificationRepository.expireLocalUpdateNotifications(activeLink) > 0) this.notifyChanged();
  }
};
var notificationService = new NotificationService();
//#endregion
//#region electron/services/system-notification.service.ts
var SYSTEM_NOTIFICATION_BODY_MAX_LENGTH = 80;
/**
* 系统通知提醒服务。
*
* 用于向用户推送需要主动处理的重要事件（如登录过期需要重新登录）。
* 点击通知会唤起并聚焦主窗口。
*
* 当用户关闭系统原生通知时，提醒会写入应用内通知中心。
*/
function resolveIconPath() {
  const currentDir = path.dirname(fileURLToPath(import.meta.url));
  return process.env.VITE_DEV_SERVER_URL ? path.join(currentDir, "../resources/icons", "icon.png") : path.join(process.resourcesPath, "icons", "icon.png");
}
function getMainWindow() {
  const win = BrowserWindow.getAllWindows()[0];
  return win && !win.isDestroyed() ? win : null;
}
function focusMainWindow() {
  const win = getMainWindow();
  if (!win) return;
  if (win.isMinimized()) win.restore();
  win.show();
  win.focus();
}
var SystemNotificationService = class {
  current = null;
  lastNotifiedUpdateVersion = null;
  updateNotification = null;
  workRecordLimitNotified = false;
  captureErrorNotified = false;
  /**
  * 发送一条提醒。开启系统通知时走操作系统原生通知；关闭时写入通知中心。
  *
  * - 开关开启且系统支持时，始终尝试发送原生通知，即使主窗口已在前台聚焦。
  * - 发新通知前会关掉上一条，保证不叠加。
  *
  * @returns 是否成功发出或写入
  */
  show(title, body, options = {}) {
    const settings = settingsRepository.getSettings();
    let persisted = false;
    if (options.persistToCenter) persisted = this.showInNotificationCenter(title, body);
    if (!settings.enableSystemNotifications) return options.alreadyInCenter || persisted || this.showInNotificationCenter(title, body);
    if (!Notification.isSupported()) return options.alreadyInCenter || persisted || this.showInNotificationCenter(title, body);
    this.current?.close();
    this.current = null;
    const bodyCharacters = Array.from(new Intl.Segmenter(undefined, {
      granularity: "grapheme"
    }).segment(body.replace(/\s+/gu, " ").trim()), ({
      segment
    }) => segment);
    const displayBody = bodyCharacters.length > SYSTEM_NOTIFICATION_BODY_MAX_LENGTH ? `${bodyCharacters.slice(0, 79).join("")}…` : bodyCharacters.join("");
    const notification = new Notification({
      title,
      body: displayBody,
      ...(process.platform === "darwin" ? {} : {
        icon: resolveIconPath()
      })
    });
    const clear = () => {
      if (this.current === notification) this.current = null;
    };
    notification.on("click", () => {
      focusMainWindow();
      if (options.action) getMainWindow()?.webContents.send("notifications:native-action", {
        action: options.action,
        todoId: options.todoId,
        notificationId: options.notificationId,
        leaderboardDate: options.leaderboardDate
      });
      notification.close();
      clear();
    });
    if (options.creditError) {
      const errorKind = options.creditError;
      notification.once("show", () => {
        Promise.resolve().then(() => telemetry_service_exports).then(({
          trackEvent
        }) => trackEvent({
          type: "action",
          name: "credit_insufficient_view",
          page: "system-notification",
          props: {
            feature_key: "screenshot",
            error_kind: errorKind,
            trigger: "automatic"
          }
        })).catch(() => undefined);
      });
    }
    notification.show();
    this.current = notification;
    return true;
  }
  showInNotificationCenter(title, body) {
    try {
      notificationService.addLocalNotification({
        title,
        content: body,
        type: "system",
        priority: "normal"
      });
      return true;
    } catch (error) {
      console.warn("[SystemNotificationService] 写入通知中心失败:", error);
      return false;
    }
  }
  /** 登录过期提醒（每次调用都会弹）。 */
  notifyTokenExpired() {
    const lang = settingsRepository.getSettings().language || "zh-CN";
    this.show(t("systemNotification.tokenExpiredTitle", lang), t("systemNotification.tokenExpiredBody", lang));
  }
  /** 展示已同步到通知中心的具体消息；show 会先撤销上一条原生通知。 */
  notifyMessage(notification) {
    if (!settingsRepository.getSettings().enableSystemNotifications) return;
    const todoId = notification.type === "todo" ? getNotificationTodoId(notification.link) : null;
    this.show(notification.title, notification.content, {
      action: todoId ? "todo" : "notification-center",
      todoId: todoId ?? undefined,
      notificationId: notification.id,
      alreadyInCenter: true
    });
  }
  /** 只有确认强制更新才提醒；撤销、改为普通更新或换版本时收起旧通知。 */
  notifyUpdateAvailable(version, isForceUpdate) {
    try {
      const activeVersion = isForceUpdate && version ? version : null;
      const link = activeVersion ? `${UPDATE_NOTIFICATION_LINK_PREFIX}${encodeURIComponent(activeVersion)}` : null;
      notificationService.expireLocalUpdateNotifications(link);
      if (this.updateNotification && this.updateNotification.version !== activeVersion) {
        this.updateNotification.notification.close();
        if (this.current === this.updateNotification.notification) this.current = null;
        this.updateNotification = null;
      }
      if (!activeVersion) {
        this.lastNotifiedUpdateVersion = null;
        return;
      }
      if (activeVersion === this.lastNotifiedUpdateVersion) return;
      if (notificationService.getNotifications().some(item => item.id < 0 && item.type === "update" && item.link === link)) {
        this.lastNotifiedUpdateVersion = activeVersion;
        return;
      }
      const lang = settingsRepository.getSettings().language || "zh-CN";
      const title = t("systemNotification.forceUpdateTitle", lang);
      const body = t("systemNotification.forceUpdateBody", lang).replace("{version}", activeVersion);
      const notice = notificationService.addLocalNotification({
        title,
        content: body,
        type: "update",
        priority: "high",
        link
      });
      this.lastNotifiedUpdateVersion = activeVersion;
      const previousNative = this.current;
      if (this.show(title, body, {
        alreadyInCenter: true,
        action: "update",
        notificationId: notice.id
      }) && this.current && this.current !== previousNative) this.updateNotification = {
        version: activeVersion,
        notification: this.current
      };
    } catch (error) {
      console.warn("[SystemNotificationService] 强制更新提醒失败:", error);
    }
  }
  /** 工作记录达免费上限、自动记录暂停提醒（去重，恢复后由 resetWorkRecordLimitNotice 复位）。 */
  notifyWorkRecordLimit(limit) {
    if (this.workRecordLimitNotified) return;
    const lang = settingsRepository.getSettings().language || "zh-CN";
    if (this.show(t("systemNotification.workRecordLimitTitle", lang), t("systemNotification.workRecordLimitBody", lang).replace("{limit}", String(limit)), {
      creditError: "quota"
    })) this.workRecordLimitNotified = true;
  }
  resetWorkRecordLimitNotice() {
    this.workRecordLimitNotified = false;
  }
  /** 余额不足、截图间隔被自动降速提醒。 */
  notifyBalanceLowDowngrade() {
    const lang = settingsRepository.getSettings().language || "zh-CN";
    this.show(t("systemNotification.balanceLowTitle", lang), t("systemNotification.balanceLowBody", lang), {
      creditError: "credits"
    });
  }
  /** 截图分析连续出错提醒（去重，成功截图后由 resetCaptureErrorNotice 复位）。 */
  notifyCaptureError(kind = "unknown") {
    if (this.captureErrorNotified) return;
    const lang = settingsRepository.getSettings().language || "zh-CN";
    const bodyKey = {
      network: "captureErrorNetworkBody",
      server: "captureErrorServerBody",
      auth: "captureErrorAuthBody",
      permission: "captureErrorPermissionBody",
      unknown: "captureErrorBody"
    }[kind];
    if (this.show(t("systemNotification.captureErrorTitle", lang), t(`systemNotification.${bodyKey}`, lang))) this.captureErrorNotified = true;
  }
  resetCaptureErrorNotice() {
    this.captureErrorNotified = false;
  }
  /** 自动日报生成成功提醒。 */
  /** 定时报告生成完成提醒；reportTitle 为空表示当天的日报，沿用原来的「今日日报已生成」 */
  notifyDailyReportDone(reportTitle) {
    const lang = settingsRepository.getSettings().language || "zh-CN";
    this.show(t(reportTitle ? "systemNotification.scheduledReportDoneTitle" : "systemNotification.dailyReportDoneTitle", lang), reportTitle ? t("systemNotification.scheduledReportDoneBody", lang).replace("{title}", reportTitle) : t("systemNotification.dailyReportDoneBody", lang), {
      action: "history",
      persistToCenter: true
    });
  }
  /** 自动日报生成失败提醒。 */
  notifyDailyReportFailed(error, reportTitle) {
    const lang = settingsRepository.getSettings().language || "zh-CN";
    const reason = this.getDailyReportFailureReason(error, lang);
    const baseBody = reportTitle ? t("systemNotification.scheduledReportFailedBody", lang).replace("{title}", reportTitle) : t("systemNotification.dailyReportFailedBody", lang);
    const body = reason ? `${baseBody}\n\n${t("systemNotification.dailyReportFailedReason", lang).replace("{reason}", reason)}` : baseBody;
    this.show(t(reportTitle ? "systemNotification.scheduledReportFailedTitle" : "systemNotification.dailyReportFailedTitle", lang), body, {
      action: "notification-center",
      persistToCenter: true
    });
  }
  /** 报告生成失败的原因（错误码转成文案）；定时生成报告也用它记录「上次结果」 */
  getDailyReportFailureReason(error, lang) {
    const trimmed = (error instanceof Error ? error.message : typeof error === "string" ? error : "").trim();
    if (!trimmed) return "";
    const key = /^[a-z_]+$/.test(trimmed) ? `systemNotification.dailyReportFailureCode.${trimmed}` : "";
    const localized = key ? t(key, lang) : "";
    const reason = key && localized !== key ? localized : trimmed;
    return reason.length > 500 ? `${reason.slice(0, 500)}…` : reason;
  }
};
var systemNotificationService = new SystemNotificationService();
//#endregion
//#region electron/services/website-privacy.service.ts
var WebsitePrivacyCaptureError = class extends Error {
  reason;
  constructor(reason) {
    super(reason);
    this.reason = reason;
    this.name = "WebsitePrivacyCaptureError";
  }
};
var runtimeRequire = createRequire(import.meta.url);
var WebsitePrivacyService = class {
  queue = Promise.resolve();
  logger = null;
  logSkip(check, detail) {
    const name = (check.snapshot?.windows[0]?.appName || check.snapshot?.foregroundAppName || "当前应用").replace(/[\r\n]/g, " ");
    let message;
    if (check.reason === "website-excluded") message = `排除网站：当前应用「${name}」的网址包含已设置的「${check.matchedRule?.replace(/[\r\n]/g, " ") ?? "排除网址"}」。`;else if (check.reason === "website-changed") message = `截图期间${detail || "页面或排除设置发生变化"}，已丢弃本次截图。`;else {
      const diagnostic = check.snapshot?.issues?.[0] || check.snapshot?.windows.find(window => !window.url)?.diagnostic || "";
      message = `无法确认网站：当前应用「${name}」，${detail || {
        "accessibility-denied": "未获得辅助功能权限",
        "screen-capture-denied": "未获得屏幕录制权限",
        "foreground-changed": "前台应用正在切换",
        "address-editing": "地址栏正在编辑，暂时无法确认已打开的网址",
        "ax-window-not-found": "暂时无法读取当前窗口的地址信息",
        "ax-window-ambiguous": "无法确定当前浏览器窗口",
        "uia-window-unavailable": "暂时无法读取当前窗口的地址信息",
        "address-not-found": "未读到浏览器网址",
        "address-empty-or-non-http": "网址为空或不是普通网页地址",
        "address-ambiguous": "读取到了多个候选地址，无法确定当前网址",
        "document-ambiguous": "读取到了多个页面地址，无法确定当前网址",
        "private-window": "当前为隐私浏览窗口，无法确认网址",
        "scan-limit": "读取浏览器地址超时或超出扫描范围"
      }[diagnostic] || "暂时无法读取当前窗口或浏览器网址"}，稍后重试。`;
    }
    const text = `[截图] 跳过截图｜${message}`;
    try {
      if (!this.logger) {
        const module = runtimeRequire("electron-log/main");
        this.logger = (module.default ?? module).create({
          logId: "website-privacy"
        });
        this.logger.transports.file.resolvePathFn = () => path.join(app.getPath("userData"), "logs", "website-privacy.log");
        this.logger.transports.file.maxSize = 2097152;
        this.logger.transports.file.level = "info";
        this.logger.transports.console.level = "info";
      }
      this.logger.info(text);
    } catch {
      console.info(text);
    }
  }
  enabled() {
    return settingsRepository.getSettings().screenshotExcludeDomains.length > 0;
  }
  inspect(allWindows) {
    const operation = this.queue.then(() => this.read(allWindows));
    this.queue = operation.catch(() => {});
    return operation;
  }
  async read(allWindows) {
    const settings = settingsRepository.getSettings();
    const configuration = JSON.stringify([settings.screenshotExcludeDomains, settings.screenshotAllowDomains, settings.websiteBrowserApps]);
    const base = {
      blocked: false,
      reason: null,
      signature: "",
      configuration,
      snapshot: null
    };
    if (!settings.screenshotExcludeDomains.length) return base;
    try {
      let snapshot = await nativeActiveContextCollectorService.queryBrowserPrivacy(false, settings.websiteBrowserApps);
      if (snapshot.complete && snapshot.windows.some(window => !window.url && ["ax-window-not-found", "address-not-found", "uia-window-unavailable", "address-editing"].includes(window.diagnostic ?? "")) || snapshot.issues?.length && snapshot.issues.every(issue => issue === "foreground-changed")) {
        await new Promise(resolve => setTimeout(resolve, 250));
        snapshot = await nativeActiveContextCollectorService.queryBrowserPrivacy(false, settings.websiteBrowserApps);
      }
      const windows = snapshot.windows.map(window => ({
        ...window,
        url: window.url ? normalizeWebsiteUrl(window.url) : null
      }));
      const signature = browserPrivacySnapshotSignature({
        ...snapshot,
        windows
      }, allWindows ? "capture" : "activity");
      const latest = settingsRepository.getSettings();
      let reason = null;
      if (configuration !== JSON.stringify([latest.screenshotExcludeDomains, latest.screenshotAllowDomains, latest.websiteBrowserApps])) reason = "website-changed";
      const riskyWindows = windows.filter(window => !window.url || !matchesWebsiteUrl(window.url, settings.screenshotAllowDomains) && matchesWebsiteUrl(window.url, settings.screenshotExcludeDomains));
      if (!reason && !snapshot.complete) reason = "website-unavailable";
      if (!reason && riskyWindows.length) reason = riskyWindows.some(window => window.url) ? "website-excluded" : "website-unavailable";
      const result = {
        blocked: reason !== null,
        reason,
        signature,
        configuration,
        snapshot: {
          ...snapshot,
          windows
        },
        matchedRule: settings.screenshotExcludeDomains.find(rule => riskyWindows.some(window => window.url && matchesWebsiteUrl(window.url, [rule])))
      };
      if (allWindows && result.blocked) this.logSkip(result);
      return result;
    } catch (error) {
      const result = {
        ...base,
        blocked: true,
        reason: "website-unavailable"
      };
      if (allWindows) this.logSkip(result, error instanceof Error && error.message.includes("TIMEOUT") ? "读取浏览器网址超时" : "浏览器地址读取服务暂不可用");
      return result;
    }
  }
  async recheck(previous, allWindows = true) {
    const current = await this.inspect(allWindows);
    if (!current.blocked && (previous.configuration !== current.configuration || previous.signature !== current.signature)) {
      const result = {
        ...current,
        blocked: true,
        reason: "website-changed"
      };
      if (allWindows) {
        const detail = previous.configuration !== current.configuration ? "排除设置发生变化" : previous.snapshot?.foregroundId !== current.snapshot?.foregroundId ? "前台窗口发生切换" : "浏览器页面发生变化";
        this.logSkip(result, detail);
      }
      return result;
    }
    return current;
  }
};
var websitePrivacyService = new WebsitePrivacyService();
//#endregion
//#region electron/services/foreground-app.ts
var execAsync = promisify(exec);
var execFileAsync = promisify(execFile);
var cache$1 = null;
var cacheTtlMs = 5e3;
var windowsContextCache = null;
var windowsContextCacheTtlMs = 1500;
var windowsPowerShellFallbackIntervalMs = 3e5;
var windowsPowerShellFallbackAt = 0;
var WindowsPowerShellRunError = class extends Error {
  attempts;
  constructor(attempts) {
    super("Windows PowerShell command failed");
    this.name = "WindowsPowerShellRunError";
    this.attempts = attempts;
  }
};
var lastDetectionFailure = null;
function emptyAppInfo() {
  return {
    name: null,
    displayedName: null,
    bundleIdentifier: null,
    processId: null,
    executablePath: null,
    windowId: null
  };
}
function parseAppleScriptInfo(stdout) {
  const [name = "", displayedName = "", bundleIdentifier = ""] = stdout.split("\n");
  return {
    name: name.trim() || null,
    displayedName: displayedName.trim() || null,
    bundleIdentifier: bundleIdentifier.trim() || null,
    processId: null,
    executablePath: null,
    windowId: null
  };
}
function emptyWindowsContextInfo() {
  return {
    ...emptyAppInfo(),
    title: null,
    bounds: null
  };
}
function canReuseWindowsContextCache(options) {
  if (!windowsContextCache || Date.now() - windowsContextCache.timestamp >= windowsContextCacheTtlMs) return false;
  if (options.includeTitle && !windowsContextCache.includeTitle) return false;
  if (options.includeBounds && !windowsContextCache.includeBounds) return false;
  return true;
}
function parseWindowsForegroundContext(stdout) {
  const raw = stdout.trim();
  if (!raw) return emptyWindowsContextInfo();
  try {
    const parsed = JSON.parse(raw);
    const name = typeof parsed.Name === "string" ? parsed.Name.trim() || null : null;
    const processId = typeof parsed.ProcessId === "number" && Number.isFinite(parsed.ProcessId) ? parsed.ProcessId : null;
    const executablePath = typeof parsed.ExecutablePath === "string" ? parsed.ExecutablePath.trim() || null : null;
    const windowId = typeof parsed.WindowId === "string" ? parsed.WindowId.trim() || null : null;
    const title = typeof parsed.Title === "string" ? parsed.Title.replace(/[\r\n\t]+/g, " ").trim() || null : null;
    const rawBounds = parsed.Bounds;
    const physicalBounds = rawBounds && [rawBounds.X, rawBounds.Y, rawBounds.Width, rawBounds.Height].every(value => typeof value === "number" && Number.isFinite(value)) && Number(rawBounds.Width) > 0 && Number(rawBounds.Height) > 0 ? {
      x: Number(rawBounds.X),
      y: Number(rawBounds.Y),
      width: Number(rawBounds.Width),
      height: Number(rawBounds.Height)
    } : null;
    return {
      name,
      displayedName: name,
      bundleIdentifier: null,
      processId,
      executablePath,
      windowId,
      title,
      bounds: physicalBounds ? screen.screenToDipRect(null, physicalBounds) : null
    };
  } catch {
    return emptyWindowsContextInfo();
  }
}
/**
* Windows 前台上下文的轻量查询。
* 默认只读取 HWND、PID、进程名和路径；标题、窗口尺寸严格按业务开关读取。
*/
async function getWindowsForegroundContextInfo(options) {
  if (process$1.platform !== "win32") return emptyWindowsContextInfo();
  if (canReuseWindowsContextCache(options)) return windowsContextCache.info;
  let helperError;
  try {
    return storeWindowsContext(fromNativeForeground(await nativeActiveContextCollectorService.queryForeground(), options), options);
  } catch (error) {
    helperError = error;
  }
  if (Date.now() - windowsPowerShellFallbackAt < windowsPowerShellFallbackIntervalMs) {
    setLastDetectionFailure({
      code: "WINDOWS_HELPER_UNAVAILABLE",
      message: "The built-in foreground app helper is unavailable.",
      attempts: [{
        method: "native-helper",
        command: "xiaohei-active-context.exe FOREGROUND",
        error: formatCommandError(helperError)
      }]
    });
    return emptyWindowsContextInfo();
  }
  windowsPowerShellFallbackAt = Date.now();
  return await readWindowsForegroundContextWithPowerShell(options);
}
function fromNativeForeground(message, options) {
  if (!message.owner) return emptyWindowsContextInfo();
  const name = message.owner.name.trim() || message.owner.processName.trim() || null;
  const title = options.includeTitle ? message.window?.title.replace(/[\r\n\t]+/g, " ").trim() || null : null;
  const physicalBounds = options.includeBounds ? message.window?.bounds ?? null : null;
  return {
    name,
    displayedName: name,
    bundleIdentifier: null,
    processId: message.owner.processId,
    executablePath: message.owner.path.trim() || null,
    windowId: message.window?.id ?? null,
    title,
    bounds: physicalBounds && physicalBounds.width > 0 && physicalBounds.height > 0 ? screen.screenToDipRect(null, physicalBounds) : null
  };
}
function storeWindowsContext(info, options) {
  windowsContextCache = {
    info,
    includeTitle: options.includeTitle,
    includeBounds: options.includeBounds,
    timestamp: Date.now()
  };
  if (!info.name) setLastDetectionFailure({
    code: "WINDOWS_FOREGROUND_EMPTY",
    message: "Windows foreground query ran successfully, but no foreground app name was returned.",
    attempts: []
  });else clearLastDetectionFailure();
  return info;
}
async function readWindowsForegroundContextWithPowerShell(options) {
  const psScript = `[Console]::OutputEncoding = [System.Text.Encoding]::UTF8
$ProgressPreference = 'SilentlyContinue'
Add-Type -TypeDefinition @'
using System;
using System.Diagnostics;
using System.Globalization;
using System.IO;
using System.Runtime.InteropServices;
using System.Text;

public sealed class XiaoheiForegroundBounds {
  public int X;
  public int Y;
  public int Width;
  public int Height;
}

public sealed class XiaoheiForegroundContext {
  public string WindowId;
  public int ProcessId;
  public string Name;
  public string ExecutablePath;
  public string Title;
  public XiaoheiForegroundBounds Bounds;
}

public static class XiaoheiForegroundWindow {
  private const uint PROCESS_QUERY_LIMITED_INFORMATION = 0x1000;
  private const int DWMWA_EXTENDED_FRAME_BOUNDS = 9;

  [StructLayout(LayoutKind.Sequential)]
  private struct RECT { public int Left; public int Top; public int Right; public int Bottom; }

  [DllImport("user32.dll")]
  private static extern IntPtr GetForegroundWindow();

  [DllImport("user32.dll")]
  private static extern uint GetWindowThreadProcessId(IntPtr hWnd, out uint processId);

  [DllImport("user32.dll", CharSet = CharSet.Unicode)]
  private static extern int GetWindowTextW(IntPtr hWnd, StringBuilder text, int count);

  [DllImport("user32.dll")]
  private static extern bool GetWindowRect(IntPtr hWnd, out RECT rect);

  [DllImport("dwmapi.dll")]
  private static extern int DwmGetWindowAttribute(IntPtr hWnd, int attribute, out RECT value, int size);

  [DllImport("kernel32.dll")]
  private static extern IntPtr OpenProcess(uint access, bool inheritHandle, uint processId);

  [DllImport("kernel32.dll", CharSet = CharSet.Unicode)]
  private static extern bool QueryFullProcessImageNameW(IntPtr process, uint flags, StringBuilder path, ref uint size);

  [DllImport("kernel32.dll")]
  private static extern bool CloseHandle(IntPtr handle);

  public static XiaoheiForegroundContext Read(bool includeTitle, bool includeBounds) {
    IntPtr window = GetForegroundWindow();
    if (window == IntPtr.Zero) return null;

    uint processId;
    GetWindowThreadProcessId(window, out processId);
    if (processId == 0) return null;

    string executablePath = null;
    IntPtr process = OpenProcess(PROCESS_QUERY_LIMITED_INFORMATION, false, processId);
    if (process != IntPtr.Zero) {
      try {
        uint capacity = 32768;
        var path = new StringBuilder((int)capacity);
        if (QueryFullProcessImageNameW(process, 0, path, ref capacity)) executablePath = path.ToString();
      } finally {
        CloseHandle(process);
      }
    }

    string name = null;
    if (!String.IsNullOrWhiteSpace(executablePath)) name = Path.GetFileNameWithoutExtension(executablePath);
    if (String.IsNullOrWhiteSpace(name)) {
      try { name = Process.GetProcessById((int)processId).ProcessName; } catch {}
    }

    string title = null;
    if (includeTitle) {
      var text = new StringBuilder(512);
      GetWindowTextW(window, text, text.Capacity);
      title = text.ToString();
    }

    XiaoheiForegroundBounds bounds = null;
    if (includeBounds) {
      RECT rect;
      if (DwmGetWindowAttribute(window, DWMWA_EXTENDED_FRAME_BOUNDS, out rect, Marshal.SizeOf(typeof(RECT))) != 0
          && !GetWindowRect(window, out rect)) {
        rect = new RECT();
      }
      if (rect.Right > rect.Left && rect.Bottom > rect.Top) {
        bounds = new XiaoheiForegroundBounds {
          X = rect.Left,
          Y = rect.Top,
          Width = rect.Right - rect.Left,
          Height = rect.Bottom - rect.Top
        };
      }
    }

    return new XiaoheiForegroundContext {
      WindowId = window.ToInt64().ToString(CultureInfo.InvariantCulture),
      ProcessId = (int)processId,
      Name = name,
      ExecutablePath = executablePath,
      Title = title,
      Bounds = bounds
    };
  }
}
'@
$result = [XiaoheiForegroundWindow]::Read(${options.includeTitle ? "$true" : "$false"}, ${options.includeBounds ? "$true" : "$false"})
if ($null -ne $result) { $result | ConvertTo-Json -Compress -Depth 3 }`;
  try {
    return storeWindowsContext(parseWindowsForegroundContext(await runWindowsPowerShellScript(psScript, 3e3)), options);
  } catch (error) {
    setLastDetectionFailure({
      code: "WINDOWS_COMMAND_UNAVAILABLE",
      message: "Unable to run the foreground app helper or PowerShell.",
      attempts: error instanceof WindowsPowerShellRunError ? error.attempts : []
    });
    return emptyWindowsContextInfo();
  }
}
function uniqueStrings(values) {
  const seen = /* @__PURE__ */new Set();
  const result = [];
  for (const value of values) {
    const normalized = value?.trim();
    if (!normalized || seen.has(normalized.toLowerCase())) continue;
    seen.add(normalized.toLowerCase());
    result.push(normalized);
  }
  return result;
}
function getWindowsDir() {
  return process$1.env.SystemRoot || process$1.env.WINDIR || "C:\\Windows";
}
function getPowerShellAbsoluteCandidates() {
  const windowsDir = getWindowsDir();
  return uniqueStrings([path.join(windowsDir, "System32", "WindowsPowerShell", "v1.0", "powershell.exe"), path.join(windowsDir, "Sysnative", "WindowsPowerShell", "v1.0", "powershell.exe"), path.join(windowsDir, "SysWOW64", "WindowsPowerShell", "v1.0", "powershell.exe"), process$1.env.ProgramFiles ? path.join(process$1.env.ProgramFiles, "PowerShell", "7", "pwsh.exe") : null, process$1.env.ProgramW6432 ? path.join(process$1.env.ProgramW6432, "PowerShell", "7", "pwsh.exe") : null]).filter(candidate => existsSync(candidate));
}
function formatCommandError(error) {
  const err = error;
  const parts = [];
  const stderr = Buffer.isBuffer(err.stderr) ? err.stderr.toString("utf8") : err.stderr;
  if (stderr?.trim()) parts.push(stderr.trim());
  if (err.code) parts.push(`code=${err.code}`);
  if (err.signal) parts.push(`signal=${err.signal}`);
  if (err.killed) parts.push("timeout");
  if (err.message) parts.push(err.message);
  return (parts.join("；") || String(error)).slice(0, 600);
}
async function execFileUtf8(command, args, timeout) {
  const {
    stdout
  } = await execFileAsync(command, args, {
    timeout,
    encoding: "utf8",
    windowsHide: true,
    maxBuffer: 1048576
  });
  return String(stdout ?? "");
}
async function runAttempt(method, command, args, displayCommand, timeout, attempts) {
  try {
    return await execFileUtf8(command, args, timeout);
  } catch (error) {
    attempts.push({
      method,
      command: displayCommand,
      error: formatCommandError(error)
    });
    return null;
  }
}
/**
* 仅作为 Helper 不可用时的兜底：直接启动 powershell.exe，不经过 cmd 外壳，也不再附加 ExecutionPolicy Bypass，
* 这两项正是安全软件「利用 PowerShell 执行可疑脚本」规则的典型特征。
*/
async function runWindowsPowerShellScript(script, timeout) {
  const psArgs = ["-NoProfile", "-NonInteractive", "-EncodedCommand", Buffer.from(script, "utf16le").toString("base64")];
  const attempts = [];
  const candidates = getPowerShellAbsoluteCandidates();
  for (const powershellPath of candidates.length > 0 ? candidates : ["powershell.exe"]) {
    const stdout = await runAttempt("powershell", powershellPath, psArgs, `${powershellPath} -NoProfile -NonInteractive -EncodedCommand <encoded>`, timeout, attempts);
    if (stdout !== null) return stdout;
  }
  throw new WindowsPowerShellRunError(attempts);
}
function setLastDetectionFailure(failure) {
  lastDetectionFailure = {
    ...failure,
    checkedAt: (/* @__PURE__ */new Date()).toISOString()
  };
}
function clearLastDetectionFailure() {
  lastDetectionFailure = null;
}
function getLastForegroundAppDetectionFailure() {
  return lastDetectionFailure;
}
/**
* Get the name of the currently focused (frontmost) application.
* Returns null if detection fails or is unsupported on the current platform.
*/
async function getForegroundAppInfo() {
  try {
    if (cache$1 && Date.now() - cache$1.timestamp < cacheTtlMs) return {
      name: cache$1.name,
      displayedName: cache$1.displayedName,
      bundleIdentifier: cache$1.bundleIdentifier,
      processId: cache$1.processId,
      executablePath: cache$1.executablePath,
      windowId: cache$1.windowId
    };
    let result = emptyAppInfo();
    if (process$1.platform === "darwin") {
      const {
        stdout
      } = await execAsync(`osascript -e 'tell application "System Events"
  set frontApp to first process whose frontmost is true
  set appName to name of frontApp
  set appDisplayedName to displayed name of frontApp
  if appDisplayedName is missing value then set appDisplayedName to appName
  set appBundleId to bundle identifier of frontApp
  if appBundleId is missing value then set appBundleId to ""
  return appName & linefeed & appDisplayedName & linefeed & appBundleId
end tell'`, {
        timeout: 3e3,
        encoding: "utf-8"
      });
      result = parseAppleScriptInfo(stdout);
    } else if (process$1.platform === "win32") {
      const context = await getWindowsForegroundContextInfo({
        includeTitle: false,
        includeBounds: false
      });
      result = {
        name: context.name,
        displayedName: context.displayedName,
        bundleIdentifier: null,
        processId: context.processId,
        executablePath: context.executablePath,
        windowId: context.windowId
      };
    }
    cache$1 = {
      ...result,
      timestamp: Date.now()
    };
    return result;
  } catch (error) {
    if (process$1.platform === "win32") setLastDetectionFailure({
      code: "WINDOWS_COMMAND_UNAVAILABLE",
      message: "Unable to run the foreground app helper or PowerShell.",
      attempts: error instanceof WindowsPowerShellRunError ? error.attempts : []
    });
    return emptyAppInfo();
  }
}
async function getForegroundAppName() {
  return (await getForegroundAppInfo()).name;
}
function getForegroundMatchNames(foregroundApp) {
  return [foregroundApp.name, foregroundApp.displayedName, resolveCommonAppName(foregroundApp.displayedName || foregroundApp.name)].map(name => name?.trim()).filter(name => Boolean(name));
}
function findMatchedKeyword(keywords, matchNames) {
  return keywords.find(keyword => {
    const lowerKeyword = keyword.toLowerCase();
    return matchNames.some(name => name.toLowerCase().includes(lowerKeyword));
  });
}
/**
* Check if the current foreground app matches any entry in the exclusion list.
* Allow-list keywords take priority over exclusion keywords.
* Matching is case-insensitive and checks if the app name contains the keyword.
* Returns the matched keyword if excluded, otherwise undefined.
*/
async function isForegroundAppExcluded(excludeApps, allowApps = []) {
  return isAppInfoExcluded(await getForegroundAppInfo(), excludeApps, allowApps);
}
/**
* 使用已经读取到的前台应用信息执行隐私排除匹配，避免采集链路为同一次采样重复调用系统命令。
*/
function isAppInfoExcluded(foregroundApp, excludeApps, allowApps = []) {
  const excludeKeywords = excludeApps.map(keyword => keyword.trim()).filter(Boolean);
  if (excludeKeywords.length === 0) return undefined;
  const matchNames = getForegroundMatchNames(foregroundApp);
  if (matchNames.length === 0) return undefined;
  if (findMatchedKeyword(allowApps.map(keyword => keyword.trim()).filter(Boolean), matchNames)) return undefined;
  return findMatchedKeyword(excludeKeywords, matchNames);
}
function parseWindowRect(output) {
  const [x, y, width, height] = output.trim().split(",").map(part => Number.parseInt(part.trim(), 10));
  if ([x, y, width, height].some(value => !Number.isFinite(value))) return null;
  if (width <= 0 || height <= 0) return null;
  return {
    x,
    y,
    width,
    height
  };
}
function emptyWindowInfo() {
  return {
    title: null,
    bounds: null
  };
}
function parseWindowInfo(stdout) {
  const lines = stdout.split("\n");
  while (lines.length > 0 && lines[lines.length - 1].trim() === "") lines.pop();
  if (lines.length < 2) return emptyWindowInfo();
  const rectLine = lines.pop();
  return {
    title: lines.join(" ").trim() || null,
    bounds: parseWindowRect(rectLine)
  };
}
/**
* macOS 通过原生 Helper 读取前台窗口（CGWindowList，不再启动 osascript）。
* 坐标与 Electron 屏幕坐标同为「主屏左上角原点、点单位」，无需换算；Helper 不可用时返回 null。
*/
async function readMacForegroundWindowFromHelper() {
  let message;
  try {
    message = await nativeActiveContextCollectorService.queryForeground();
  } catch {
    return null;
  }
  const window = message.window;
  if (!message.owner || !window) return emptyWindowInfo();
  const bounds = window.bounds && window.bounds.width > 0 && window.bounds.height > 0 ? {
    x: Math.round(window.bounds.x),
    y: Math.round(window.bounds.y),
    width: Math.round(window.bounds.width),
    height: Math.round(window.bounds.height)
  } : null;
  return {
    title: window.title.replace(/[\r\n\t]+/g, " ").trim() || null,
    bounds
  };
}
/**
* Get the title and bounds of the current foreground window in one system call.
* Returns nulls if detection fails or is unsupported on the current platform.
*/
async function getForegroundWindowInfo() {
  try {
    if (process$1.platform === "darwin") {
      const nativeInfo = await readMacForegroundWindowFromHelper();
      if (nativeInfo) return nativeInfo;
      const {
        stdout
      } = await execAsync(`osascript -e 'tell application "System Events"
  set frontApp to first process whose frontmost is true
  set frontWindow to front window of frontApp
  set winTitle to name of frontWindow
  if winTitle is missing value then set winTitle to ""
  set {posX, posY} to position of frontWindow
  set {sizeW, sizeH} to size of frontWindow
  return winTitle & linefeed & (posX as text) & "," & (posY as text) & "," & (sizeW as text) & "," & (sizeH as text)
end tell'`, {
        timeout: 3e3,
        encoding: "utf-8"
      });
      return parseWindowInfo(stdout);
    }
    if (process$1.platform === "win32") {
      const info = await getWindowsForegroundContextInfo({
        includeTitle: true,
        includeBounds: true
      });
      return {
        title: info.title,
        bounds: info.bounds
      };
    }
    return emptyWindowInfo();
  } catch {
    return emptyWindowInfo();
  }
}
/**
* Get the display id (matching Electron display ids) that contains the foreground window.
* Returns null when the window bounds cannot be determined.
*/
async function getForegroundWindowDisplayId() {
  const {
    bounds
  } = await getForegroundWindowInfo();
  if (!bounds) return null;
  try {
    return String(screen.getDisplayMatching(bounds).id);
  } catch {
    return null;
  }
}
/**
* Check if the current foreground app matches any entry in the allow list.
* Returns the matched keyword, otherwise undefined.
*/
async function isForegroundAppAllowListed(allowApps) {
  const allowKeywords = allowApps.map(keyword => keyword.trim()).filter(Boolean);
  if (allowKeywords.length === 0) return undefined;
  const matchNames = getForegroundMatchNames(await getForegroundAppInfo());
  if (matchNames.length === 0) return undefined;
  return findMatchedKeyword(allowKeywords, matchNames);
}
//#endregion
//#region electron/services/active-context.service.ts
var browserNamePattern = /(chrome|chromium|edge|brave|safari|firefox|opera|vivaldi|arc|wavebox|sidekick)/i;
var privateWindowPattern$1 = /(incognito|inprivate|private browsing|private window|navigation privée|navegaci[oó]n privada|navega[cç][aã]o privada|privates fenster|privater modus|navigazione privata|gizli pencere|无痕|無痕|隐私浏览|私人瀏覽|シークレット|プライベート|시크릿|비공개 브라우징)/i;
var nativeSnapshotCacheMaxAgeMs = 3e4;
var legacyFallbackMinIntervalMs = 6e4;
var legacyFallbackCache = null;
function withTimeout(promise, timeoutMs) {
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => reject(/* @__PURE__ */new Error("ACTIVE_CONTEXT_TIMEOUT")), timeoutMs);
    promise.then(value => {
      clearTimeout(timer);
      resolve(value);
    }, error => {
      clearTimeout(timer);
      reject(error);
    });
  });
}
function sanitizeTitle(value) {
  const title = value?.replace(/[\r\n\t]+/g, " ").replace(/\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b/gi, "[email]").replace(/\b(token|access_token|api[_-]?key|session|code)=([^\s&]+)/gi, "$1=[redacted]").replace(/(https?:\/\/[^\s?#]+)[?#][^\s]*/gi, "$1").replace(/\s+/g, " ").trim();
  return title ? title.slice(0, 240) : null;
}
function inferDocumentHint(title, appName) {
  if (!title) return null;
  return (title.split(/\s+[—–|-]\s+/).map(part => part.trim()).filter(Boolean).find(part => part.toLowerCase() !== appName.toLowerCase()) ?? null)?.slice(0, 160) ?? null;
}
function sanitizeDomain(url) {
  if (!url) return null;
  try {
    const parsed = new URL(url);
    if (parsed.protocol !== "http:" && parsed.protocol !== "https:") return null;
    return parsed.hostname.toLowerCase().replace(/^www\./, "").slice(0, 253) || null;
  } catch {
    return null;
  }
}
function stableKeyFor(result) {
  if (result.platform === "macos" && result.owner.bundleId) return `bundle:${result.owner.bundleId.toLowerCase()}`;
  if (result.owner.path) return `path:${result.owner.path.toLowerCase()}`;
  return `process:${result.owner.name.toLowerCase()}`;
}
function stableIdFor(platform, stableKey) {
  return crypto.createHash("sha256").update(`${platform}:${stableKey}`).digest("hex");
}
function resolveDisplayId(bounds) {
  try {
    return String(screen.getDisplayMatching(bounds).id);
  } catch {
    return null;
  }
}
function toNativeCollectorOptions(options) {
  return {
    includeWindowContext: options.includeWindowContext,
    includeBrowserDomain: options.includeBrowserDomain,
    includeAccessibilityEvents: process.platform === "darwin" && options.includeAccessibilityEvents,
    includeWindowBounds: options.includeWindowBounds,
    includeMouseHeatmap: options.includeMouseHeatmap
  };
}
function sameContextOptions(left, right) {
  return left.includeWindowContext === right.includeWindowContext && left.includeBrowserDomain === right.includeBrowserDomain && left.includeAccessibilityEvents === right.includeAccessibilityEvents && left.includeWindowBounds === right.includeWindowBounds && left.includeMouseHeatmap === right.includeMouseHeatmap;
}
function wantsWindowBounds(options) {
  return options.includeWindowContext || options.includeWindowBounds;
}
function normalizeCollectorBounds(message) {
  const bounds = message.window?.bounds ?? null;
  if (!bounds || message.platform !== "windows") return bounds;
  try {
    return screen.screenToDipRect(null, bounds);
  } catch {
    return bounds;
  }
}
function fromCollectorMessage(message, options) {
  const owner = message.owner;
  if (!owner) return null;
  const platform = message.platform === "windows" ? "win32" : "darwin";
  const rawName = owner.name.trim() || owner.processName.trim() || null;
  if (!rawName) return null;
  const executablePath = owner.path.trim() || null;
  const bundleIdentifier = platform === "darwin" ? owner.bundleId.trim() || null : null;
  const stableKey = bundleIdentifier ? `bundle:${bundleIdentifier.toLowerCase()}` : executablePath ? `path:${executablePath.toLowerCase()}` : `process:${(owner.processName.trim() || rawName).toLowerCase()}`;
  const observedTitle = options.includeWindowContext || options.includeBrowserDomain ? sanitizeTitle(message.window?.title) : null;
  const browserName = browserNamePattern.test(`${rawName} ${owner.processName}`) ? rawName : null;
  const isPrivate = browserName && observedTitle ? privateWindowPattern$1.test(observedTitle) : null;
  const isPrivateMacBrowser = platform === "darwin" && isPrivate === true;
  const title = options.includeWindowContext && !isPrivateMacBrowser ? observedTitle : null;
  const domain = options.includeBrowserDomain && browserName && isPrivate === false ? sanitizeDomain(message.url ?? undefined) : null;
  const bounds = isPrivateMacBrowser ? null : normalizeCollectorBounds(message);
  return {
    observedAt: (/* @__PURE__ */new Date()).toISOString(),
    platform,
    app: {
      stableId: stableIdFor(platform, stableKey),
      stableKey,
      rawName,
      displayName: resolveCommonAppName(rawName) || rawName,
      processName: owner.processName.trim() || rawName,
      processId: typeof owner.processId === "number" && Number.isFinite(owner.processId) ? owner.processId : null,
      executablePath,
      bundleIdentifier,
      appUserModelId: platform === "win32" ? owner.appUserModelId.trim() || null : null,
      packageFamilyName: platform === "win32" ? owner.packageFamilyName.trim() || null : null
    },
    window: options.includeWindowContext && !isPrivateMacBrowser ? {
      id: message.window?.id || null,
      title,
      documentHint: inferDocumentHint(title, rawName),
      bounds,
      displayId: bounds ? resolveDisplayId(bounds) : null
    } : null,
    windowBounds: wantsWindowBounds(options) ? bounds : null,
    browser: options.includeBrowserDomain && browserName ? {
      name: browserName,
      domain,
      isPrivate
    } : null,
    source: message.reason === "event" ? "native-event" : "native-query",
    confidence: platform === "win32" && options.includeBrowserDomain ? "medium" : "high"
  };
}
function fromNativeResult(result, options) {
  const platform = process.platform === "win32" ? "win32" : "darwin";
  const rawName = result.owner.name.trim() || null;
  const displayName = resolveCommonAppName(rawName) || rawName;
  const stableKey = stableKeyFor(result);
  const observedTitle = options.includeWindowContext || options.includeBrowserDomain ? sanitizeTitle(result.title) : null;
  const browserName = rawName && browserNamePattern.test(rawName) ? rawName : null;
  const isPrivate = browserName && observedTitle ? privateWindowPattern$1.test(observedTitle) : null;
  const title = options.includeWindowContext && isPrivate !== true ? observedTitle : null;
  const domain = options.includeBrowserDomain && browserName && isPrivate === false && result.platform === "macos" ? sanitizeDomain(result.url) : null;
  return {
    observedAt: (/* @__PURE__ */new Date()).toISOString(),
    platform,
    app: {
      stableId: stableIdFor(platform, stableKey),
      stableKey,
      rawName,
      displayName,
      processName: rawName,
      processId: Number.isFinite(result.owner.processId) ? result.owner.processId : null,
      executablePath: result.owner.path || null,
      bundleIdentifier: result.platform === "macos" ? result.owner.bundleId || null : null,
      appUserModelId: null,
      packageFamilyName: null
    },
    window: options.includeWindowContext && isPrivate !== true ? {
      id: Number.isFinite(result.id) ? String(result.id) : null,
      title,
      documentHint: inferDocumentHint(title, rawName ?? ""),
      bounds: result.bounds,
      displayId: resolveDisplayId(result.bounds)
    } : null,
    windowBounds: wantsWindowBounds(options) && result.bounds ? result.bounds : null,
    browser: options.includeBrowserDomain && browserName ? {
      name: browserName,
      domain,
      isPrivate
    } : null,
    source: "native-query",
    confidence: "high"
  };
}
async function readMacContextWithGetWindows(options) {
  if (process.platform !== "darwin") return null;
  try {
    const {
      activeWindow
    } = await import("get-windows");
    const result = await withTimeout(activeWindow({
      accessibilityPermission: options.includeBrowserDomain,
      screenRecordingPermission: options.includeWindowContext || options.includeBrowserDomain
    }), 3e3);
    if (!result) return null;
    return fromNativeResult(result, options);
  } catch {
    return null;
  }
}
async function readWindowsContext(options) {
  const info = await getWindowsForegroundContextInfo({
    includeTitle: options.includeWindowContext || options.includeBrowserDomain,
    includeBounds: wantsWindowBounds(options)
  });
  const rawName = info.displayedName || info.name;
  if (!rawName) return null;
  const platform = "win32";
  const stableKey = info.executablePath ? `path:${info.executablePath.toLowerCase()}` : `process:${rawName.toLowerCase()}`;
  const observedTitle = options.includeWindowContext || options.includeBrowserDomain ? sanitizeTitle(info.title ?? undefined) : null;
  const title = options.includeWindowContext ? observedTitle : null;
  const browserName = browserNamePattern.test(rawName) ? rawName : null;
  const isPrivate = browserName && observedTitle ? privateWindowPattern$1.test(observedTitle) : null;
  return {
    observedAt: (/* @__PURE__ */new Date()).toISOString(),
    platform,
    app: {
      stableId: stableIdFor(platform, stableKey),
      stableKey,
      rawName,
      displayName: resolveCommonAppName(rawName) || rawName,
      processName: info.name,
      processId: info.processId,
      executablePath: info.executablePath,
      bundleIdentifier: null,
      appUserModelId: null,
      packageFamilyName: null
    },
    window: options.includeWindowContext ? {
      id: info.windowId,
      title,
      documentHint: inferDocumentHint(title, rawName),
      bounds: info.bounds,
      displayId: info.bounds ? resolveDisplayId(info.bounds) : null
    } : null,
    windowBounds: wantsWindowBounds(options) ? info.bounds : null,
    browser: options.includeBrowserDomain && browserName ? {
      name: browserName,
      domain: null,
      isPrivate
    } : null,
    source: "native-query",
    confidence: options.includeBrowserDomain ? "medium" : "high"
  };
}
async function readFallback(options) {
  const info = await getForegroundAppInfo();
  const rawName = info.displayedName || info.name;
  if (!rawName) return null;
  const platform = process.platform === "win32" ? "win32" : "darwin";
  const stableKey = info.bundleIdentifier ? `bundle:${info.bundleIdentifier.toLowerCase()}` : `process:${rawName.toLowerCase()}`;
  const windowInfo = options.includeWindowContext ? await getForegroundWindowInfo() : null;
  const observedTitle = sanitizeTitle(windowInfo?.title ?? undefined);
  const browserName = browserNamePattern.test(rawName) ? rawName : null;
  const isPrivate = browserName && observedTitle ? privateWindowPattern$1.test(observedTitle) : null;
  const title = isPrivate === true ? null : observedTitle;
  return {
    observedAt: (/* @__PURE__ */new Date()).toISOString(),
    platform,
    app: {
      stableId: stableIdFor(platform, stableKey),
      stableKey,
      rawName,
      displayName: resolveCommonAppName(rawName),
      processName: info.name,
      processId: null,
      executablePath: null,
      bundleIdentifier: info.bundleIdentifier,
      appUserModelId: null,
      packageFamilyName: null
    },
    window: windowInfo && isPrivate !== true ? {
      id: null,
      title,
      documentHint: inferDocumentHint(title, rawName),
      bounds: windowInfo.bounds,
      displayId: windowInfo.bounds ? resolveDisplayId(windowInfo.bounds) : null
    } : null,
    windowBounds: windowInfo && isPrivate !== true ? windowInfo.bounds ?? null : null,
    browser: options.includeBrowserDomain && browserName ? {
      name: browserName,
      domain: null,
      isPrivate
    } : null,
    source: "polling-fallback",
    confidence: "low"
  };
}
async function readLegacyContext(options, force) {
  if (!force && legacyFallbackCache && sameContextOptions(legacyFallbackCache.options, options) && Date.now() - legacyFallbackCache.cachedAt < legacyFallbackMinIntervalMs) return legacyFallbackCache.snapshot ? {
    ...legacyFallbackCache.snapshot,
    observedAt: (/* @__PURE__ */new Date()).toISOString()
  } : null;
  let snapshot = null;
  try {
    snapshot = process.platform === "win32" ? await readWindowsContext(options) : (await readMacContextWithGetWindows(options)) ?? (await readFallback(options));
  } catch {}
  if (snapshot) snapshot = {
    ...snapshot,
    source: "polling-fallback",
    confidence: "low"
  };
  legacyFallbackCache = {
    options: {
      ...options
    },
    snapshot,
    cachedAt: Date.now()
  };
  return snapshot;
}
async function getActiveContextSnapshot(options) {
  if (process.platform !== "darwin" && process.platform !== "win32") return null;
  const collectorOptions = toNativeCollectorOptions(options);
  try {
    const cached = nativeActiveContextCollectorService.getCached(collectorOptions);
    const cacheHit = Boolean(cached && Date.now() - Date.parse(cached.observedAt) <= nativeSnapshotCacheMaxAgeMs);
    devPerformanceMonitorService.increment(cacheHit ? "active_context.cache_hit" : "active_context.cache_miss");
    const snapshot = fromCollectorMessage(cacheHit && cached ? cached : await nativeActiveContextCollectorService.query(collectorOptions), options);
    if (snapshot?.app) {
      devPerformanceMonitorService.increment("active_context.native_success");
      legacyFallbackCache = null;
      return snapshot;
    }
  } catch {
    devPerformanceMonitorService.increment("active_context.native_failure");
  }
  const fallbackOperation = devPerformanceMonitorService.startOperation("active_context.legacy_fallback");
  const fallback = await readLegacyContext(options, false);
  devPerformanceMonitorService.increment(fallback ? "active_context.fallback_success" : "active_context.fallback_empty");
  fallbackOperation.end({
    measurements: {
      found: fallback ? 1 : 0
    }
  });
  return fallback;
}
async function getFreshActiveContextSnapshot(options) {
  if (process.platform !== "darwin" && process.platform !== "win32") return null;
  try {
    const snapshot = fromCollectorMessage(await nativeActiveContextCollectorService.query(toNativeCollectorOptions(options)), options);
    if (snapshot?.app) {
      devPerformanceMonitorService.increment("active_context.fresh_native_success");
      legacyFallbackCache = null;
      return snapshot;
    }
  } catch {
    devPerformanceMonitorService.increment("active_context.fresh_native_failure");
  }
  const fallbackOperation = devPerformanceMonitorService.startOperation("active_context.fresh_legacy_fallback");
  const fallback = await readLegacyContext(options, true);
  devPerformanceMonitorService.increment(fallback ? "active_context.fresh_fallback_success" : "active_context.fresh_fallback_empty");
  fallbackOperation.end({
    measurements: {
      found: fallback ? 1 : 0
    }
  });
  return fallback;
}
function startActiveContextCollection(options) {
  if (process.platform !== "darwin" && process.platform !== "win32") return;
  nativeActiveContextCollectorService.start(toNativeCollectorOptions(options));
}
function configureActiveContextCollection(options) {
  if (process.platform !== "darwin" && process.platform !== "win32") return;
  nativeActiveContextCollectorService.configure(toNativeCollectorOptions(options));
}
function pauseActiveContextCollection() {
  nativeActiveContextCollectorService.pause();
}
function stopActiveContextCollection() {
  nativeActiveContextCollectorService.stop();
}
function subscribeActiveContextChanges(listener) {
  return nativeActiveContextCollectorService.subscribe(listener);
}
function subscribeMouseHeatmapBatches(listener) {
  return nativeActiveContextCollectorService.subscribeMouseBatches(listener);
}
//#endregion
//#region electron/repositories/app-usage.repository.ts
function stateDisplayName(state) {
  if (state === "unknown") return appText("appUsageState.unknown");
  if (state === "excluded") return appText("appUsageState.excluded");
  if (state === "locked") return appText("appUsageState.locked");
  if (state === "suspended") return appText("appUsageState.suspended");
  return appText("appUsageState.unknownApp");
}
function normalizedDisplayKey(value) {
  return value.trim().toLocaleLowerCase();
}
function isLegacyApplicationId(applicationId) {
  return applicationId?.startsWith("legacy-app:") === true;
}
function mergeEquivalentAppUsageSummaries(source) {
  const merged = /* @__PURE__ */new Map();
  for (const item of source) {
    const key = normalizedDisplayKey(item.appName);
    const existing = merged.get(key);
    if (!existing) {
      merged.set(key, {
        ...item
      });
      continue;
    }
    if (isLegacyApplicationId(existing.applicationId) && !isLegacyApplicationId(item.applicationId)) {
      existing.applicationId = item.applicationId;
      existing.rawName = item.rawName;
    }
    existing.totalDurationSec += item.totalDurationSec;
    existing.activeDurationSec += item.activeDurationSec;
    existing.idleDurationSec += item.idleDurationSec;
    existing.sessionCount += item.sessionCount;
    existing.switchCount += item.switchCount;
    existing.longestSessionDurationSec = Math.max(existing.longestSessionDurationSec, item.longestSessionDurationSec);
    if (item.firstUsedAt < existing.firstUsedAt) existing.firstUsedAt = item.firstUsedAt;
    if (item.lastUsedAt > existing.lastUsedAt) existing.lastUsedAt = item.lastUsedAt;
    existing.averageSessionDurationSec = Math.round(existing.activeDurationSec / Math.max(1, existing.sessionCount));
  }
  return Array.from(merged.values()).sort((left, right) => right.activeDurationSec - left.activeDurationSec);
}
function mapSession(row) {
  return {
    id: row.id,
    applicationId: row.application_id,
    activityState: row.activity_state,
    appName: row.display_name ? resolveCommonAppName(row.display_name) : stateDisplayName(row.activity_state),
    rawName: row.raw_name,
    startedAt: row.started_at,
    endedAt: row.ended_at,
    durationSec: Math.max(0, Math.round(row.duration_ms / 1e3)),
    activeDurationSec: Math.max(0, Math.round(row.active_duration_ms / 1e3)),
    idleDurationSec: Math.max(0, Math.round(row.idle_duration_ms / 1e3)),
    longestActiveDurationSec: Math.max(0, Math.round(row.longest_active_duration_ms / 1e3)),
    sampleCount: row.sample_count,
    contextSwitchCount: row.context_switch_count,
    startReason: row.start_reason,
    endReason: row.end_reason,
    detectionSource: row.detection_source,
    confidence: row.confidence,
    createdAt: row.created_at,
    isOpen: row.is_open === 1
  };
}
function getSqliteCode(error) {
  if (!error || typeof error !== "object" || !("code" in error)) return undefined;
  return typeof error.code === "string" ? error.code : undefined;
}
function isForeignKeyError(error) {
  return error instanceof Error && error.message.includes("FOREIGN KEY constraint failed");
}
var AppUsageRepository = class {
  upsertApplication(app, observedAt, expectedDatabaseGeneration) {
    const connection = getOpenDatabaseConnection();
    if (!connection || connection.generation !== expectedDatabaseGeneration) return null;
    const database = connection.database;
    database.prepare(`
      INSERT INTO tracked_applications (
        id, platform, stable_key, raw_name, display_name, process_name, process_id,
        bundle_identifier, app_user_model_id, package_family_name, executable_path,
        first_seen_at, last_seen_at, created_at, updated_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      ON CONFLICT(platform, stable_key) DO UPDATE SET
        raw_name = COALESCE(excluded.raw_name, tracked_applications.raw_name),
        display_name = COALESCE(excluded.display_name, tracked_applications.display_name),
        process_name = COALESCE(excluded.process_name, tracked_applications.process_name),
        process_id = COALESCE(excluded.process_id, tracked_applications.process_id),
        bundle_identifier = COALESCE(excluded.bundle_identifier, tracked_applications.bundle_identifier),
        app_user_model_id = COALESCE(excluded.app_user_model_id, tracked_applications.app_user_model_id),
        package_family_name = COALESCE(excluded.package_family_name, tracked_applications.package_family_name),
        executable_path = COALESCE(excluded.executable_path, tracked_applications.executable_path),
        last_seen_at = excluded.last_seen_at,
        updated_at = excluded.updated_at
    `).run(app.stableId, process.platform, app.stableKey, app.rawName, app.displayName, app.processName, app.processId, app.bundleIdentifier, app.appUserModelId, app.packageFamilyName, app.executablePath, observedAt, observedAt, observedAt, observedAt);
    const row = database.prepare(`
      SELECT id FROM tracked_applications WHERE platform = ? AND stable_key = ?
    `).get(process.platform, app.stableKey);
    if (app.displayName && !app.stableKey.startsWith("process:")) {
      database.prepare(`
        UPDATE app_usage_sessions_v2
        SET application_id = ?, updated_at = ?
        WHERE application_id IN (
          SELECT id FROM tracked_applications
          WHERE (platform = 'legacy' OR stable_key LIKE 'process:%')
            AND lower(trim(COALESCE(display_name, raw_name, ''))) = lower(trim(?))
            AND id != ?
        )
      `).run(row.id, observedAt, app.displayName, row.id);
      database.prepare(`
        DELETE FROM tracked_applications
        WHERE (platform = 'legacy' OR stable_key LIKE 'process:%')
          AND lower(trim(COALESCE(display_name, raw_name, ''))) = lower(trim(?))
          AND id != ?
          AND NOT EXISTS (
            SELECT 1 FROM app_usage_sessions_v2
            WHERE application_id = tracked_applications.id
          )
      `).run(app.displayName, row.id);
    }
    return row.id;
  }
  persistSnapshot(snapshot, expectedDatabaseGeneration) {
    const {
      session,
      contextSegment,
      activitySegment
    } = snapshot;
    if (contextSegment && contextSegment.sessionId !== session.id || activitySegment && activitySegment.sessionId !== session.id) return {
      ok: false,
      code: "SESSION_ID_MISMATCH",
      rolledBack: false
    };
    const connection = getOpenDatabaseConnection();
    if (!connection) return {
      ok: false,
      code: "DATABASE_UNAVAILABLE",
      rolledBack: false
    };
    if (connection.generation !== expectedDatabaseGeneration) return {
      ok: false,
      code: "DATABASE_GENERATION_MISMATCH",
      rolledBack: false
    };
    const database = connection.database;
    let transactionStarted = false;
    try {
      database.exec("BEGIN");
      transactionStarted = true;
      if (session.applicationId) {
        if (!database.prepare("SELECT 1 FROM tracked_applications WHERE id = ?").get(session.applicationId)) {
          database.exec("ROLLBACK");
          transactionStarted = false;
          return {
            ok: false,
            code: "APPLICATION_MISSING",
            rolledBack: true
          };
        }
      }
      if (contextSegment && !this.segmentOwnerMatches(database, "app_context_segments", contextSegment.id, session.id) || activitySegment && !this.segmentOwnerMatches(database, "app_activity_segments", activitySegment.id, session.id)) {
        database.exec("ROLLBACK");
        transactionStarted = false;
        return {
          ok: false,
          code: "SESSION_ID_MISMATCH",
          rolledBack: true
        };
      }
      if (session.isOpen) database.prepare(`
          UPDATE app_usage_sessions_v2
          SET is_open = 0,
              end_reason = COALESCE(end_reason, 'superseded'),
              updated_at = ?
          WHERE is_open = 1 AND id != ?
        `).run(session.updatedAt, session.id);
      this.writeSession(database, session);
      if (!database.prepare("SELECT 1 FROM app_usage_sessions_v2 WHERE id = ?").get(session.id)) {
        database.exec("ROLLBACK");
        transactionStarted = false;
        return {
          ok: false,
          code: "PARENT_MISSING",
          rolledBack: true
        };
      }
      if (contextSegment) this.writeContextSegment(database, contextSegment);
      if (activitySegment) this.writeActivitySegment(database, activitySegment);
      database.exec("COMMIT");
      transactionStarted = false;
      return {
        ok: true
      };
    } catch (error) {
      let rolledBack = false;
      if (transactionStarted) try {
        database.exec("ROLLBACK");
        rolledBack = true;
      } catch {}
      return {
        ok: false,
        code: isForeignKeyError(error) ? "FOREIGN_KEY_FAILED" : "WRITE_FAILED",
        rolledBack,
        sqliteCode: getSqliteCode(error)
      };
    }
  }
  segmentOwnerMatches(database, table, segmentId, sessionId) {
    const existing = database.prepare(`SELECT session_id FROM ${table} WHERE id = ?`).get(segmentId);
    return !existing || existing.session_id === sessionId;
  }
  writeSession(database, session) {
    database.prepare(`
      INSERT INTO app_usage_sessions_v2 (
        id, application_id, activity_state, started_at, ended_at, duration_ms,
        active_duration_ms, idle_duration_ms, longest_active_duration_ms, sample_count, context_switch_count,
        start_reason, end_reason, detection_source, confidence, is_open,
        created_at, updated_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      ON CONFLICT(id) DO UPDATE SET
        application_id = excluded.application_id,
        activity_state = excluded.activity_state,
        ended_at = excluded.ended_at,
        duration_ms = excluded.duration_ms,
        active_duration_ms = excluded.active_duration_ms,
        idle_duration_ms = excluded.idle_duration_ms,
        longest_active_duration_ms = excluded.longest_active_duration_ms,
        sample_count = excluded.sample_count,
        context_switch_count = excluded.context_switch_count,
        end_reason = excluded.end_reason,
        detection_source = excluded.detection_source,
        confidence = excluded.confidence,
        is_open = excluded.is_open,
        updated_at = excluded.updated_at
    `).run(session.id, session.applicationId, session.activityState, session.startedAt, session.endedAt, session.durationMs, session.activeDurationMs, session.idleDurationMs, session.longestActiveDurationMs, session.sampleCount, session.contextSwitchCount, session.startReason, session.endReason, session.detectionSource, session.confidence, session.isOpen ? 1 : 0, session.createdAt, session.updatedAt);
  }
  writeContextSegment(database, segment) {
    database.prepare(`
      INSERT INTO app_context_segments (
        id, session_id, window_id, window_title, document_hint, browser_name,
        browser_domain, display_id, window_x, window_y, window_width, window_height,
        started_at, ended_at, active_duration_ms, created_at, updated_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      ON CONFLICT(id) DO UPDATE SET
        ended_at = excluded.ended_at,
        active_duration_ms = excluded.active_duration_ms,
        updated_at = excluded.updated_at
    `).run(segment.id, segment.sessionId, segment.windowId, segment.windowTitle, segment.documentHint, segment.browserName, segment.browserDomain, segment.displayId, segment.bounds?.x ?? null, segment.bounds?.y ?? null, segment.bounds?.width ?? null, segment.bounds?.height ?? null, segment.startedAt, segment.endedAt, segment.activeDurationMs, segment.startedAt, segment.endedAt);
  }
  writeActivitySegment(database, segment) {
    database.prepare(`
      INSERT INTO app_activity_segments (
        id, session_id, activity_state, started_at, ended_at, duration_ms, created_at, updated_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
      ON CONFLICT(id) DO UPDATE SET
        ended_at = excluded.ended_at,
        duration_ms = excluded.duration_ms,
        updated_at = excluded.updated_at
    `).run(segment.id, segment.sessionId, segment.activityState, segment.startedAt, segment.endedAt, segment.durationMs, segment.startedAt, segment.endedAt);
  }
  closeStaleOpenSessions() {
    const now = (/* @__PURE__ */new Date()).toISOString();
    getDatabase().prepare(`
      UPDATE app_usage_sessions_v2
      SET is_open = 0,
          end_reason = COALESCE(end_reason, 'crash-recovery'),
          updated_at = ?
      WHERE is_open = 1
    `).run(now);
  }
  listByRange(startedAt, endedAt, limit = 5e4) {
    return getDatabase().prepare(`
      SELECT s.*, a.display_name, a.raw_name
      FROM app_usage_sessions_v2 s
      LEFT JOIN tracked_applications a ON a.id = s.application_id
      WHERE s.started_at < ? AND s.ended_at > ?
      ORDER BY s.started_at ASC, s.id ASC
      LIMIT ?
    `).all(endedAt, startedAt, limit).map(mapSession);
  }
  countByRange(startedAt, endedAt) {
    return getDatabase().prepare(`
      SELECT COUNT(*) AS total
      FROM app_usage_sessions_v2
      WHERE started_at < ? AND ended_at > ?
    `).get(endedAt, startedAt)?.total ?? 0;
  }
  listPageByRange(input) {
    const conditions = ["s.started_at < ?", "s.ended_at > ?"];
    const params = [input.endedAt, input.startedAt];
    if (input.cursor) {
      conditions.push("(s.started_at < ? OR (s.started_at = ? AND s.id < ?))");
      params.push(input.cursor.startedAt, input.cursor.startedAt, input.cursor.id);
    }
    if (input.applicationId) {
      conditions.push(`lower(trim(COALESCE(a.display_name, a.raw_name, ''))) = (
        SELECT lower(trim(COALESCE(selected.display_name, selected.raw_name, '')))
        FROM tracked_applications selected
        WHERE selected.id = ?
      )`);
      params.push(input.applicationId);
    }
    if (input.activityState === "active") conditions.push("s.activity_state = 'app' AND s.active_duration_ms > 0");else if (input.activityState === "idle") conditions.push("s.activity_state = 'app' AND s.idle_duration_ms > 0");else if (input.activityState) {
      conditions.push("s.activity_state = ?");
      params.push(input.activityState);
    }
    params.push(input.limit);
    return getDatabase().prepare(`
      SELECT s.*, a.display_name, a.raw_name
      FROM app_usage_sessions_v2 s
      LEFT JOIN tracked_applications a ON a.id = s.application_id
      WHERE ${conditions.join(" AND ")}
      ORDER BY s.started_at DESC, s.id DESC
      LIMIT ?
    `).all(...params).map(mapSession);
  }
  getSummary(startedAt, endedAt, sessionLimit = 5e4) {
    const rangeStart = Date.parse(startedAt);
    const rangeEnd = Date.parse(endedAt);
    const statisticalTimeline = this.listByRange(startedAt, endedAt, sessionLimit).map(session => {
      const originalStart = Date.parse(session.startedAt);
      const originalEnd = Date.parse(session.endedAt);
      const clippedStart = Math.max(rangeStart, originalStart);
      const clippedEnd = Math.min(rangeEnd, originalEnd);
      const ratio = (clippedEnd - clippedStart) / Math.max(1, originalEnd - originalStart);
      return {
        ...session,
        startedAt: new Date(clippedStart).toISOString(),
        endedAt: new Date(clippedEnd).toISOString(),
        durationSec: Math.max(0, Math.round((clippedEnd - clippedStart) / 1e3)),
        activeDurationSec: Math.max(0, Math.round(session.activeDurationSec * ratio)),
        idleDurationSec: Math.max(0, Math.round(session.idleDurationSec * ratio)),
        longestActiveDurationSec: Math.max(0, Math.round(session.longestActiveDurationSec * ratio))
      };
    }).filter(session => session.activityState !== "app" || session.durationSec >= 2 || session.sampleCount > 1);
    const sessions = statisticalTimeline.filter(session => session.activityState === "app");
    const summaries = /* @__PURE__ */new Map();
    for (const session of sessions) {
      if (!session.applicationId) continue;
      const existing = summaries.get(session.applicationId);
      if (!existing) {
        summaries.set(session.applicationId, {
          applicationId: session.applicationId,
          appName: session.appName,
          rawName: session.rawName,
          totalDurationSec: session.activeDurationSec,
          activeDurationSec: session.activeDurationSec,
          idleDurationSec: session.idleDurationSec,
          sessionCount: 1,
          switchCount: 0,
          averageSessionDurationSec: session.activeDurationSec,
          longestSessionDurationSec: session.longestActiveDurationSec,
          firstUsedAt: session.startedAt,
          lastUsedAt: session.endedAt
        });
        continue;
      }
      existing.totalDurationSec += session.activeDurationSec;
      existing.activeDurationSec += session.activeDurationSec;
      existing.idleDurationSec += session.idleDurationSec;
      existing.sessionCount += 1;
      existing.averageSessionDurationSec = Math.round(existing.activeDurationSec / existing.sessionCount);
      existing.longestSessionDurationSec = Math.max(existing.longestSessionDurationSec, session.longestActiveDurationSec);
      if (session.startedAt < existing.firstUsedAt) existing.firstUsedAt = session.startedAt;
      if (session.endedAt > existing.lastUsedAt) existing.lastUsedAt = session.endedAt;
    }
    for (let index = 1; index < statisticalTimeline.length; index += 1) {
      const previous = statisticalTimeline[index - 1];
      const current = statisticalTimeline[index];
      if (previous?.activityState === "app" && current?.activityState === "app" && previous.applicationId && current.applicationId && previous.applicationId !== current.applicationId && normalizedDisplayKey(previous.appName) !== normalizedDisplayKey(current.appName)) {
        const summary = summaries.get(current.applicationId);
        if (summary) summary.switchCount += 1;
      }
    }
    return mergeEquivalentAppUsageSummaries(Array.from(summaries.values()));
  }
  listActivitySegments(sessionIds) {
    if (sessionIds.length === 0) return [];
    const placeholders = sessionIds.map(() => "?").join(", ");
    return getDatabase().prepare(`
      SELECT id, session_id, activity_state, started_at, ended_at, duration_ms
      FROM app_activity_segments
      WHERE session_id IN (${placeholders})
      ORDER BY started_at ASC, id ASC
    `).all(...sessionIds).map(row => ({
      id: row.id,
      sessionId: row.session_id,
      activityState: row.activity_state,
      startedAt: row.started_at,
      endedAt: row.ended_at,
      durationMs: row.duration_ms
    }));
  }
  listContextSegments(sessionIds) {
    if (sessionIds.length === 0) return [];
    const placeholders = sessionIds.map(() => "?").join(", ");
    return getDatabase().prepare(`
      SELECT * FROM app_context_segments
      WHERE session_id IN (${placeholders})
      ORDER BY started_at ASC
    `).all(...sessionIds).map(row => ({
      id: row.id,
      sessionId: row.session_id,
      windowId: row.window_id,
      windowTitle: row.window_title,
      documentHint: row.document_hint,
      browserName: row.browser_name,
      browserDomain: row.browser_domain,
      displayId: row.display_id,
      bounds: row.window_x === null || row.window_y === null || row.window_width === null || row.window_height === null ? null : {
        x: row.window_x,
        y: row.window_y,
        width: row.window_width,
        height: row.window_height
      },
      startedAt: row.started_at,
      endedAt: row.ended_at,
      activeDurationMs: row.active_duration_ms
    }));
  }
  getApplication(applicationId) {
    const row = getDatabase().prepare(`
      SELECT id, display_name, raw_name, platform, stable_key, process_name,
             bundle_identifier, app_user_model_id, package_family_name, executable_path
      FROM tracked_applications WHERE id = ?
    `).get(applicationId);
    if (!row) return null;
    return {
      applicationId: row.id,
      appName: resolveCommonAppName(row.display_name || row.raw_name) || appText("appUsageState.unknownApp"),
      rawName: row.raw_name,
      platform: row.platform,
      stableKey: row.stable_key,
      processName: row.process_name,
      bundleIdentifier: row.bundle_identifier,
      appUserModelId: row.app_user_model_id,
      packageFamilyName: row.package_family_name,
      executablePath: row.executable_path
    };
  }
  getEarliestStartedAt() {
    return getDatabase().prepare(`
      SELECT MIN(started_at) AS earliest FROM app_usage_sessions_v2
    `).get()?.earliest ?? null;
  }
  getDistinctAppNames() {
    return getDatabase().prepare(`
      SELECT COALESCE(a.display_name, a.raw_name) AS app_name,
             SUM(s.active_duration_ms) AS total_duration_ms
      FROM app_usage_sessions_v2 s
      JOIN tracked_applications a ON a.id = s.application_id
      GROUP BY a.id
      ORDER BY total_duration_ms DESC
    `).all().map(row => resolveCommonAppName(row.app_name));
  }
  clearContextData(kind) {
    const database = getDatabase();
    const now = (/* @__PURE__ */new Date()).toISOString();
    if (kind === "all") {
      const result = database.prepare("DELETE FROM app_context_segments").run();
      return Number(result.changes);
    }
    const result = kind === "window" ? database.prepare(`
          UPDATE app_context_segments
          SET window_title = NULL, document_hint = NULL,
              window_id = NULL, display_id = NULL,
              window_x = NULL, window_y = NULL, window_width = NULL, window_height = NULL,
              updated_at = ?
        `).run(now) : database.prepare(`
          UPDATE app_context_segments
          SET browser_name = NULL, browser_domain = NULL, updated_at = ?
        `).run(now);
    return Number(result.changes);
  }
  clearAllUsageData() {
    const database = getDatabase();
    database.exec("BEGIN");
    try {
      database.exec(`
        DELETE FROM app_context_segments;
        DELETE FROM app_activity_segments;
        DELETE FROM app_usage_sessions_v2;
        DELETE FROM tracked_applications;
        DELETE FROM app_usage_sessions;
      `);
      database.exec("COMMIT");
    } catch (error) {
      database.exec("ROLLBACK");
      throw error;
    }
  }
  purgeExpiredContext(retentionDays) {
    const cutoff = (/* @__PURE__ */new Date(Date.now() - retentionDays * 24 * 60 * 60 * 1e3)).toISOString();
    const result = getDatabase().prepare(`
      DELETE FROM app_context_segments WHERE ended_at < ?
    `).run(cutoff);
    return Number(result.changes);
  }
};
var appUsageRepository = new AppUsageRepository();
//#endregion
//#region shared/types/app-usage-flow.ts
/** 应用记录桑基图的数据：时段 → 应用的时长流向，以及应用之间的切换流向。 */
/** 一天按本地时间切成四个时段，顺序即图中从上到下的顺序 */
var APP_USAGE_DAY_PERIODS = [{
  period: "dawn",
  endHour: 6
}, {
  period: "morning",
  endHour: 12
}, {
  period: "afternoon",
  endHour: 18
}, {
  period: "evening",
  endHour: 24
}];
//#endregion
//#region electron/repositories/activity-evidence.repository.ts
var SQLITE_ID_QUERY_CHUNK_SIZE = 500;
function parseJson(value, fallback) {
  if (!value) return fallback;
  try {
    return JSON.parse(value);
  } catch {
    return fallback;
  }
}
function mapEvent(row) {
  return {
    id: row.id,
    eventType: row.event_type,
    observedAt: row.observed_at,
    appBundleId: row.app_bundle_id,
    appName: row.app_name,
    windowId: row.window_id,
    windowTitle: row.window_title,
    elementRole: row.element_role,
    elementSubrole: row.element_subrole,
    elementLabel: row.element_label,
    actionName: row.action_name,
    metadata: parseJson(row.metadata_json, null),
    createdAt: row.created_at
  };
}
function mapWindow(row) {
  return {
    id: row.id,
    startedAt: row.started_at,
    endedAt: row.ended_at,
    trigger: row.trigger,
    status: row.status,
    activityBlocks: parseJson(row.activity_blocks_json, []),
    sourceRefs: parseJson(row.source_refs_json, {
      sessionIds: [],
      contextIds: [],
      eventIds: []
    }),
    coverage: parseJson(row.coverage_json, {
      sessionCount: 0,
      contextCount: 0,
      eventCount: 0,
      activeDurationSec: 0,
      idleDurationSec: 0,
      appSwitchCount: 0
    }),
    hasTaskBoundary: row.has_task_boundary === 1,
    longGap: row.long_gap === 1,
    createdAt: row.created_at,
    updatedAt: row.updated_at
  };
}
function mapSummary(row) {
  return {
    id: row.id,
    level: row.level,
    trigger: row.trigger,
    startedAt: row.started_at,
    endedAt: row.ended_at,
    title: row.title,
    summary: row.summary,
    applications: parseJson(row.applications_json, []),
    evidenceUsage: parseJson(row.evidence_usage_json, {
      usedAccessibilityEvents: false,
      usedWindowTitles: false,
      usedBrowserDomains: false
    }),
    evidenceWindowIds: parseJson(row.evidence_window_ids_json, []),
    createdAt: row.created_at,
    updatedAt: row.updated_at
  };
}
var ActivityEvidenceRepository = class {
  createEvent(input) {
    const fallbackValue = input.id ?? crypto.randomUUID();
    const createdAt = (/* @__PURE__ */new Date()).toISOString();
    getDatabase().prepare(`
      INSERT INTO mac_activity_events (
        id, event_type, observed_at, app_bundle_id, app_name, window_id, window_title,
        element_role, element_subrole, element_label, action_name, metadata_json, created_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).run(fallbackValue, input.eventType, input.observedAt, input.appBundleId, input.appName, input.windowId, input.windowTitle, input.elementRole, input.elementSubrole, input.elementLabel, input.actionName, input.metadata ? JSON.stringify(input.metadata) : null, createdAt);
    return {
      ...input,
      id: fallbackValue,
      createdAt
    };
  }
  listEventsByRange(startedAt, endedAt, limit = 1e4) {
    return getDatabase().prepare(`
      SELECT * FROM (
        SELECT * FROM mac_activity_events
        WHERE observed_at >= ? AND observed_at < ?
        ORDER BY observed_at DESC, id DESC
        LIMIT ?
      )
      ORDER BY observed_at ASC, id ASC
    `).all(startedAt, endedAt, limit).map(mapEvent);
  }
  purgeEventsBefore(cutoff) {
    return Number(getDatabase().prepare(`
      DELETE FROM mac_activity_events WHERE observed_at < ? OR created_at < ?
    `).run(cutoff, cutoff).changes);
  }
  clearContextData(kind) {
    const database = getDatabase();
    const now = (/* @__PURE__ */new Date()).toISOString();
    let changed = 0;
    database.exec("BEGIN");
    try {
      if (kind === "all" || kind === "window") {
        const eventResult = kind === "all" ? database.prepare("DELETE FROM mac_activity_events").run() : database.prepare(`
              UPDATE mac_activity_events
              SET window_id = NULL, window_title = NULL, element_label = NULL
            `).run();
        changed += Number(eventResult.changes);
      }
      const rows = database.prepare(`
        SELECT id, activity_blocks_json, source_refs_json FROM capture_evidence_windows
      `).all();
      const update = database.prepare(`
        UPDATE capture_evidence_windows
        SET activity_blocks_json = ?, source_refs_json = ?, updated_at = ?
        WHERE id = ?
      `);
      for (const row of rows) {
        const blocks = parseJson(row.activity_blocks_json, []);
        const sourceRefs = parseJson(row.source_refs_json, {
          sessionIds: [],
          contextIds: [],
          eventIds: []
        });
        const redacted = blocks.map(block => kind === "browser" ? {
          ...block,
          browserDomain: null
        } : {
          ...block,
          windowTitle: null,
          documentHint: null,
          ...(kind === "all" ? {
            browserDomain: null,
            interactionCount: 0,
            interactionTypes: [],
            sourceEventIds: []
          } : {})
        });
        const nextSourceRefs = kind === "all" ? {
          ...sourceRefs,
          eventIds: []
        } : sourceRefs;
        if (JSON.stringify(redacted) === JSON.stringify(blocks) && JSON.stringify(nextSourceRefs) === JSON.stringify(sourceRefs)) continue;
        changed += Number(update.run(JSON.stringify(redacted), JSON.stringify(nextSourceRefs), now, row.id).changes);
      }
      changed += Number(database.prepare(`
        DELETE FROM work_record_evidence_links WHERE evidence_type = 'activity_summary'
      `).run().changes);
      changed += Number(database.prepare("DELETE FROM activity_summaries").run().changes);
      database.exec("COMMIT");
      return changed;
    } catch (error) {
      database.exec("ROLLBACK");
      throw error;
    }
  }
  clearAllEvidenceData() {
    const database = getDatabase();
    database.exec("BEGIN");
    try {
      database.exec(`
        DELETE FROM work_record_evidence_links;
        DELETE FROM activity_summaries;
        DELETE FROM capture_evidence_windows;
        DELETE FROM mac_activity_events;
      `);
      database.exec("COMMIT");
    } catch (error) {
      database.exec("ROLLBACK");
      throw error;
    }
  }
  purgeContextBefore(cutoff) {
    const database = getDatabase();
    database.exec("BEGIN");
    try {
      const rows = database.prepare(`
        SELECT id, activity_blocks_json FROM capture_evidence_windows WHERE started_at < ?
      `).all(cutoff);
      const update = database.prepare(`
        UPDATE capture_evidence_windows SET activity_blocks_json = ?, updated_at = ? WHERE id = ?
      `);
      const now = (/* @__PURE__ */new Date()).toISOString();
      let changed = 0;
      for (const row of rows) {
        const blocks = parseJson(row.activity_blocks_json, []);
        const redacted = blocks.map(block => ({
          ...block,
          windowTitle: null,
          documentHint: null,
          browserDomain: null
        }));
        if (JSON.stringify(redacted) === JSON.stringify(blocks)) continue;
        changed += Number(update.run(JSON.stringify(redacted), now, row.id).changes);
      }
      changed += Number(database.prepare(`
        DELETE FROM work_record_evidence_links
        WHERE evidence_type = 'activity_summary'
          AND evidence_id IN (SELECT id FROM activity_summaries WHERE started_at < ?)
      `).run(cutoff).changes);
      changed += Number(database.prepare("DELETE FROM activity_summaries WHERE started_at < ?").run(cutoff).changes);
      database.exec("COMMIT");
      return changed;
    } catch (error) {
      database.exec("ROLLBACK");
      throw error;
    }
  }
  createWindow(input) {
    const fallbackValue = input.id ?? crypto.randomUUID();
    const now = (/* @__PURE__ */new Date()).toISOString();
    getDatabase().prepare(`
      INSERT INTO capture_evidence_windows (
        id, started_at, ended_at, trigger, status, activity_blocks_json,
        source_refs_json, coverage_json, has_task_boundary, long_gap, created_at, updated_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).run(fallbackValue, input.startedAt, input.endedAt, input.trigger, input.status, JSON.stringify(input.activityBlocks), JSON.stringify(input.sourceRefs), JSON.stringify(input.coverage), input.hasTaskBoundary ? 1 : 0, input.longGap ? 1 : 0, now, now);
    return {
      ...input,
      id: fallbackValue,
      createdAt: now,
      updatedAt: now
    };
  }
  updateWindowStatus(windowValue, status) {
    getDatabase().prepare(`
      UPDATE capture_evidence_windows SET status = ?, updated_at = ? WHERE id = ?
    `).run(status, (/* @__PURE__ */new Date()).toISOString(), windowValue);
  }
  failPendingWindowsBefore(cutoff) {
    return Number(getDatabase().prepare(`
      UPDATE capture_evidence_windows
      SET status = 'failed', updated_at = ?
      WHERE status = 'pending' AND (ended_at < ? OR created_at < ?)
    `).run((/* @__PURE__ */new Date()).toISOString(), cutoff, cutoff).changes);
  }
  failAllPendingWindows() {
    return Number(getDatabase().prepare(`
      UPDATE capture_evidence_windows
      SET status = 'failed', updated_at = ?
      WHERE status = 'pending'
    `).run((/* @__PURE__ */new Date()).toISOString()).changes);
  }
  findWindowById(windowValue) {
    const row = getDatabase().prepare("SELECT * FROM capture_evidence_windows WHERE id = ?").get(windowValue);
    return row ? mapWindow(row) : null;
  }
  findLatestPendingWindow() {
    const row = getDatabase().prepare(`
      SELECT * FROM capture_evidence_windows
      WHERE status = 'pending'
      ORDER BY ended_at DESC, created_at DESC LIMIT 1
    `).get();
    return row ? mapWindow(row) : null;
  }
  findLatestSettledWindow(beforeOrAt) {
    const row = beforeOrAt ? getDatabase().prepare(`
          SELECT * FROM capture_evidence_windows
          WHERE status IN ('analyzed', 'skipped') AND ended_at <= ?
          ORDER BY ended_at DESC, created_at DESC LIMIT 1
        `).get(beforeOrAt) : getDatabase().prepare(`
          SELECT * FROM capture_evidence_windows
          WHERE status IN ('analyzed', 'skipped')
          ORDER BY ended_at DESC, created_at DESC LIMIT 1
        `).get();
    return row ? mapWindow(row) : null;
  }
  findLatestAnalyzedWindow(beforeOrAt) {
    const row = getDatabase().prepare(`
      SELECT * FROM capture_evidence_windows
      WHERE status = 'analyzed' AND ended_at <= ?
      ORDER BY ended_at DESC, created_at DESC LIMIT 1
    `).get(beforeOrAt);
    return row ? mapWindow(row) : null;
  }
  listWindowsByRange(startedAt, endedAt) {
    return getDatabase().prepare(`
      SELECT * FROM capture_evidence_windows
      WHERE started_at < ? AND ended_at > ? AND status IN ('analyzed', 'skipped')
      ORDER BY started_at ASC, id ASC
    `).all(endedAt, startedAt).map(mapWindow);
  }
  linkWorkRecord(input) {
    getDatabase().prepare(`
      INSERT OR IGNORE INTO work_record_evidence_links (
        id, work_record_id, evidence_type, evidence_id, relation_type,
        activity_index, started_at, ended_at, created_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).run(crypto.randomUUID(), input.workRecordId, input.evidenceType, input.evidenceId, input.relationType, input.activityIndex ?? null, input.startedAt, input.endedAt, (/* @__PURE__ */new Date()).toISOString());
  }
  listLinkedWorkRecords(evidenceWindowIds) {
    if (evidenceWindowIds.length === 0) return [];
    const uniqueIds = Array.from(new Set(evidenceWindowIds));
    const rows = [];
    for (let offset = 0; offset < uniqueIds.length; offset += SQLITE_ID_QUERY_CHUNK_SIZE) {
      const ids = uniqueIds.slice(offset, offset + SQLITE_ID_QUERY_CHUNK_SIZE);
      const placeholders = ids.map(() => "?").join(", ");
      rows.push(...getDatabase().prepare(`
        SELECT
          work_records.id,
          work_records.started_at,
          work_records.ended_at,
          work_records.summary,
          work_record_evidence_links.evidence_id
        FROM work_record_evidence_links
        INNER JOIN work_records ON work_records.id = work_record_evidence_links.work_record_id
        WHERE work_record_evidence_links.evidence_type = 'capture_window'
          AND work_record_evidence_links.evidence_id IN (${placeholders})
      `).all(...ids));
    }
    return rows.map(row => ({
      id: row.id,
      startedAt: row.started_at,
      endedAt: row.ended_at,
      summary: row.summary,
      evidenceId: row.evidence_id
    })).sort((left, right) => left.startedAt.localeCompare(right.startedAt) || left.id.localeCompare(right.id) || left.evidenceId.localeCompare(right.evidenceId));
  }
  upsertSummary(input) {
    const randomUUIDResult = crypto.randomUUID();
    const now = (/* @__PURE__ */new Date()).toISOString();
    getDatabase().prepare(`
      INSERT INTO activity_summaries (
        id, level, trigger, started_at, ended_at, title, summary,
        applications_json, evidence_usage_json, evidence_window_ids_json, created_at, updated_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      ON CONFLICT(level, started_at, ended_at) DO UPDATE SET
        trigger = excluded.trigger,
        title = excluded.title,
        summary = excluded.summary,
        applications_json = excluded.applications_json,
        evidence_usage_json = excluded.evidence_usage_json,
        evidence_window_ids_json = excluded.evidence_window_ids_json,
        updated_at = excluded.updated_at
    `).run(randomUUIDResult, input.level, input.trigger, input.startedAt, input.endedAt, input.title, input.summary, JSON.stringify(input.applications), JSON.stringify(input.evidenceUsage), JSON.stringify(input.evidenceWindowIds), now, now);
    return mapSummary(getDatabase().prepare(`
      SELECT * FROM activity_summaries WHERE level = ? AND started_at = ? AND ended_at = ?
    `).get(input.level, input.startedAt, input.endedAt));
  }
  listSummariesByRange(startedAt, endedAt, level) {
    return (level ? getDatabase().prepare(`
          SELECT * FROM activity_summaries
          WHERE level = ? AND started_at < ? AND ended_at > ?
          ORDER BY started_at ASC, id ASC
        `).all(level, endedAt, startedAt) : getDatabase().prepare(`
          SELECT * FROM activity_summaries
          WHERE started_at < ? AND ended_at > ?
          ORDER BY started_at ASC, id ASC
        `).all(endedAt, startedAt)).map(mapSummary);
  }
};
var activityEvidenceRepository = new ActivityEvidenceRepository();
//#endregion
//#region electron/services/mac-activity-event.service.ts
var EVENT_RETENTION_MS = 1728e5;
var PURGE_INTERVAL_MS = 36e5;
var DEDUPE_INTERVAL_MS = 1e3;
var privateWindowPattern = /(incognito|inprivate|private browsing|private window|navigation privée|navegaci[oó]n privada|navega[cç][aã]o privada|privates fenster|privater modus|navigazione privata|gizli pencere|无痕|無痕|隐私浏览|私人瀏覽|シークレット|プライベート|시크릿|비공개 브라우징)/i;
var sensitiveRolePattern = /(secure|password)/i;
var browserIdentityPattern = /(chrome|chromium|safari|firefox|brave|edgemac|microsoft edge|opera|vivaldi|\barc\b|thebrowser|wavebox|sidekick|orion)/i;
function sanitizeText(value, maxLength) {
  const normalized = value?.replace(/[\r\n\t]+/g, " ").replace(/\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b/gi, "[email]").replace(/\b(token|access_token|api[_-]?key|session|code)=([^\s&]+)/gi, "$1=[redacted]").replace(/(https?:\/\/[^\s?#]+)[?#][^\s]*/gi, "$1").replace(/\s+/g, " ").trim();
  return normalized ? normalized.slice(0, maxLength) : null;
}
function appIsExcluded(message) {
  const settings = settingsRepository.getSettings();
  const names = [message.app?.name, message.app?.bundleId].map(value => value?.trim().toLocaleLowerCase()).filter(value => Boolean(value));
  const matches = keyword => {
    const normalized = keyword.trim().toLocaleLowerCase();
    return normalized.length > 0 && names.some(name => name.includes(normalized));
  };
  if (settings.screenshotExcludeAllowApps.some(matches)) return false;
  return settings.screenshotExcludeApps.some(matches);
}
function sanitizeMetadata(metadata) {
  if (!metadata) return null;
  const allowedKeys = /* @__PURE__ */new Set(["interaction", "eventCount", "valueLength", "selectionLength", "browserPrivacyChecked"]);
  const sanitized = {};
  for (const [key, value] of Object.entries(metadata)) {
    if (!allowedKeys.has(key)) continue;
    if (typeof value === "boolean" || typeof value === "number" || value === null) sanitized[key] = value;
  }
  return Object.keys(sanitized).length > 0 ? sanitized : null;
}
var MacActivityEventService = class {
  checkingWebsitePrivacy = false;
  unsubscribe = null;
  recentFingerprints = /* @__PURE__ */new Map();
  lastPurgedAt = 0;
  retentionTimer = null;
  start() {
    if (process.platform !== "darwin" || this.unsubscribe) return;
    this.ensureRetentionTimer();
    this.unsubscribe = nativeActiveContextCollectorService.subscribeActivityEvents(message => {
      this.persistWithWebsitePrivacy(message);
    });
    this.purgeIfNeeded(true);
  }
  stop() {
    this.unsubscribe?.();
    this.unsubscribe = null;
    this.recentFingerprints.clear();
    this.purgeIfNeeded(true);
  }
  refresh() {
    this.purgeIfNeeded(true);
    const settings = settingsRepository.getSettings();
    if (process.platform === "darwin" && settings.enableMacAccessibilityEvents && settings.enableMacActivityEvidence && settings.enableAppUsageTracking) this.start();else this.stop();
  }
  applyRetentionPolicy() {
    if (process.platform !== "darwin") return;
    this.ensureRetentionTimer();
    this.purgeIfNeeded(true);
  }
  ensureRetentionTimer() {
    if (this.retentionTimer) return;
    this.retentionTimer = setInterval(() => this.purgeIfNeeded(true), PURGE_INTERVAL_MS);
    this.retentionTimer.unref?.();
  }
  async persistWithWebsitePrivacy(message) {
    if (!websitePrivacyService.enabled()) {
      this.persist(message);
      return;
    }
    if (this.checkingWebsitePrivacy) return;
    this.checkingWebsitePrivacy = true;
    const generation = getDatabaseGeneration();
    try {
      const privacy = await websitePrivacyService.inspect(false);
      if (!this.unsubscribe || !isDatabaseGenerationCurrent(generation) || privacy.blocked) return;
      if (!message.window?.id || privacy.snapshot?.foregroundId !== message.window.id) return;
      if (privacy.snapshot.windows.some(window => window.foreground)) return;
      this.persist(message);
    } catch {} finally {
      this.checkingWebsitePrivacy = false;
    }
  }
  persist(message) {
    const settings = settingsRepository.getSettings();
    if (!settings.enableMacActivityEvidence || !settings.enableMacAccessibilityEvents || !settings.enableAppUsageTracking) return;
    if (appIsExcluded(message)) return;
    if (message.element?.secure || sensitiveRolePattern.test(`${message.element?.role ?? ""} ${message.element?.subrole ?? ""}`)) return;
    if (message.window?.title && privateWindowPattern.test(message.window.title)) return;
    const appIdentity = `${message.app?.name ?? ""} ${message.app?.bundleId ?? ""}`;
    if (browserIdentityPattern.test(appIdentity) && message.metadata?.browserPrivacyChecked !== true) return;
    const windowTitle = settings.enableAppWindowContext ? sanitizeText(message.window?.title, 240) : null;
    const elementLabel = sanitizeText(message.element?.label, 120);
    const fingerprint = JSON.stringify([message.eventType, message.app?.bundleId ?? "", message.window?.id ?? "", message.element?.role ?? "", elementLabel ?? ""]);
    const now = Date.now();
    if (now - (this.recentFingerprints.get(fingerprint) ?? 0) < DEDUPE_INTERVAL_MS) return;
    try {
      activityEvidenceRepository.createEvent({
        eventType: message.eventType,
        observedAt: message.observedAt,
        appBundleId: sanitizeText(message.app?.bundleId, 200),
        appName: sanitizeText(message.app?.name, 100),
        windowId: sanitizeText(message.window?.id, 100),
        windowTitle,
        elementRole: sanitizeText(message.element?.role, 80),
        elementSubrole: sanitizeText(message.element?.subrole, 80),
        elementLabel,
        actionName: sanitizeText(message.actionName, 80),
        metadata: sanitizeMetadata(message.metadata)
      });
      this.recentFingerprints.set(fingerprint, now);
      if (this.recentFingerprints.size > 500) {
        for (const [key, timestamp] of this.recentFingerprints) if (now - timestamp > 6e4) this.recentFingerprints.delete(key);
      }
      this.purgeIfNeeded(false);
    } catch (error) {
      console.error("[MacActivityEvent] 写入脱敏事件失败:", error);
    }
  }
  purgeIfNeeded(force) {
    const now = Date.now();
    if (!force && now - this.lastPurgedAt < PURGE_INTERVAL_MS) return;
    this.lastPurgedAt = now;
    try {
      activityEvidenceRepository.purgeEventsBefore((/* @__PURE__ */new Date(now - EVENT_RETENTION_MS)).toISOString());
    } catch (error) {
      console.error("[MacActivityEvent] 清理过期事件失败:", error);
    }
  }
};
var macActivityEventService = new MacActivityEventService();
//#endregion
//#region electron/repositories/screen-heatmap.repository.ts
var ScreenHeatmapRepository = class {
  incrementBatch(entries, displays) {
    if (entries.length === 0 && displays.length === 0) return;
    const database = getDatabase();
    const increment = database.prepare(`
      INSERT INTO screen_heatmap_daily (
        stat_date, display_key, app_key, app_name, cell_x, cell_y, cell_width, cell_height, active_ms, updated_at
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      ON CONFLICT(stat_date, display_key, app_key, cell_x, cell_y, cell_width, cell_height) DO UPDATE SET
        active_ms = active_ms + excluded.active_ms,
        app_name = excluded.app_name,
        updated_at = excluded.updated_at
    `);
    const upsertDisplay = database.prepare(`
      INSERT INTO screen_heatmap_displays (
        display_key, label, bounds_x, bounds_y, bounds_width, bounds_height,
        scale_factor, is_primary, first_seen_at, last_seen_at
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      ON CONFLICT(display_key) DO UPDATE SET
        label = excluded.label,
        bounds_x = excluded.bounds_x,
        bounds_y = excluded.bounds_y,
        bounds_width = excluded.bounds_width,
        bounds_height = excluded.bounds_height,
        scale_factor = excluded.scale_factor,
        is_primary = excluded.is_primary,
        last_seen_at = excluded.last_seen_at
    `);
    const updatedAt = (/* @__PURE__ */new Date()).toISOString();
    database.exec("BEGIN");
    try {
      for (const display of displays) upsertDisplay.run(display.displayKey, display.label, display.x, display.y, display.width, display.height, display.scaleFactor, display.isPrimary ? 1 : 0, display.lastSeenAt, display.lastSeenAt);
      for (const entry of entries) increment.run(entry.date, entry.displayKey, entry.appKey, entry.appName, entry.x, entry.y, entry.width, entry.height, Math.max(0, Math.round(entry.activeMs)), updatedAt);
      database.exec("COMMIT");
    } catch (error) {
      database.exec("ROLLBACK");
      throw error;
    }
  }
  listDisplays() {
    return getDatabase().prepare(`
      SELECT display_key, label, bounds_x, bounds_y, bounds_width, bounds_height,
             scale_factor, is_primary, last_seen_at
      FROM screen_heatmap_displays
    `).all().map(row => ({
      displayKey: row.display_key,
      label: row.label,
      x: Number(row.bounds_x),
      y: Number(row.bounds_y),
      width: Number(row.bounds_width),
      height: Number(row.bounds_height),
      scaleFactor: Number(row.scale_factor) || 1,
      isPrimary: Number(row.is_primary) === 1,
      lastSeenAt: row.last_seen_at
    }));
  }
  /** 区间内按显示器、应用和区域合并后的覆盖时长，按时长从多到少取前 limit 条 */
  listRects(startDate, endDate, limit) {
    return getDatabase().prepare(`
      SELECT display_key, app_key, MAX(app_name) AS app_name,
             cell_x, cell_y, cell_width, cell_height, SUM(active_ms) AS active_ms
      FROM screen_heatmap_daily
      WHERE stat_date BETWEEN ? AND ?
      GROUP BY display_key, app_key, cell_x, cell_y, cell_width, cell_height
      ORDER BY active_ms DESC
      LIMIT ?
    `).all(startDate, endDate, limit).map(row => ({
      displayKey: row.display_key,
      appKey: row.app_key,
      appName: row.app_name,
      x: Number(row.cell_x),
      y: Number(row.cell_y),
      width: Number(row.cell_width),
      height: Number(row.cell_height),
      activeMs: Number(row.active_ms)
    }));
  }
  sumByDisplay(startDate, endDate) {
    return getDatabase().prepare(`
      SELECT display_key AS key, SUM(active_ms) AS active_ms
      FROM screen_heatmap_daily
      WHERE stat_date BETWEEN ? AND ?
      GROUP BY display_key
    `).all(startDate, endDate).map(row => ({
      key: row.key,
      activeMs: Number(row.active_ms)
    }));
  }
  sumByApp(startDate, endDate) {
    return getDatabase().prepare(`
      SELECT app_key AS key, MAX(app_name) AS name, SUM(active_ms) AS active_ms
      FROM screen_heatmap_daily
      WHERE stat_date BETWEEN ? AND ?
      GROUP BY app_key
    `).all(startDate, endDate).map(row => ({
      key: row.key,
      name: row.name,
      activeMs: Number(row.active_ms)
    }));
  }
  countActiveDays(startDate, endDate) {
    const row = getDatabase().prepare(`
      SELECT COUNT(DISTINCT stat_date) AS count
      FROM screen_heatmap_daily
      WHERE stat_date BETWEEN ? AND ? AND active_ms > 0
    `).get(startDate, endDate);
    return Number(row?.count ?? 0);
  }
  clear() {
    const database = getDatabase();
    database.exec("BEGIN");
    try {
      const result = database.prepare("DELETE FROM screen_heatmap_daily").run();
      database.prepare("DELETE FROM screen_heatmap_displays").run();
      database.exec("COMMIT");
      return Number(result.changes);
    } catch (error) {
      database.exec("ROLLBACK");
      throw error;
    }
  }
};
var screenHeatmapRepository = new ScreenHeatmapRepository();
//#endregion
//#region electron/services/display-identity.ts
/**
* Electron 的 display.id 不保证固定：Windows 上显示器休眠后重连、拔插副屏、显卡驱动重置等
* 都可能让系统重新编号，同一块屏就换了 id。按 id 保存的数据和设置要靠这里认回同一块屏。
*
* 判断同一块屏：名称相同、物理分辨率相同（换了缩放比例也认得出）；名称为空时还要求位置相同。
*/
var PHYSICAL_SIZE_TOLERANCE = 2;
function normalizedLabel(display) {
  return display.label.trim().toLocaleLowerCase();
}
function physicalSize(display) {
  const scale = display.scaleFactor > 0 ? display.scaleFactor : 1;
  return [Math.round(display.width * scale), Math.round(display.height * scale)];
}
function positionDistance(left, right) {
  return Math.hypot(left.x - right.x, left.y - right.y);
}
function isSameDisplay(left, right, requirePosition = false) {
  const label = normalizedLabel(left);
  if (label !== normalizedLabel(right)) return false;
  const [leftWidth, leftHeight] = physicalSize(left);
  const [rightWidth, rightHeight] = physicalSize(right);
  if (Math.abs(leftWidth - rightWidth) > PHYSICAL_SIZE_TOLERANCE) return false;
  if (Math.abs(leftHeight - rightHeight) > PHYSICAL_SIZE_TOLERANCE) return false;
  if (label !== "" && !requirePosition) return true;
  return left.x === right.x && left.y === right.y;
}
/** 候选里和它是同一块屏的；两块同型号的屏都对得上时，取位置最近的那块 */
function findSameDisplay(target, candidates) {
  let found = null;
  for (const candidate of candidates) {
    if (!isSameDisplay(target, candidate)) continue;
    if (!found || positionDistance(target, candidate) < positionDistance(target, found)) found = candidate;
  }
  return found;
}
/**
* 热区数据按 display.id 存，换过编号后旧 id 下的数据会被当成一块「未连接」的屏。
* 查询时把同一块屏的新旧记录合在一起，库里的数据原样保留：能对上当前连接的屏就并到它身上，
* 按当前排列来画；对不上的旧记录之间，名称、分辨率、位置都相同才合并。
* 返回所有已知 key（当前连接的和库里记过的）→ 合并后的显示器；不在结果里的 key 没有显示器信息，查询时跳过。
*/
function resolveHeatmapDisplays(connected, stored) {
  const resolved = /* @__PURE__ */new Map();
  const liveRows = Array.from(connected.values());
  for (const row of liveRows) resolved.set(row.displayKey, {
    key: row.displayKey,
    row,
    connected: true
  });
  const orphans = Array.from(stored.values()).filter(row => !connected.has(row.displayKey)).sort((left, right) => right.lastSeenAt.localeCompare(left.lastSeenAt));
  const disconnected = [];
  for (const row of orphans) {
    const live = findSameDisplay(row, liveRows);
    if (live) {
      resolved.set(row.displayKey, resolved.get(live.displayKey));
      continue;
    }
    const group = disconnected.find(entry => isSameDisplay(row, entry.row, true));
    if (group) {
      resolved.set(row.displayKey, group);
      continue;
    }
    const entry = {
      key: row.displayKey,
      row,
      connected: false
    };
    disconnected.push(entry);
    resolved.set(row.displayKey, entry);
  }
  return resolved;
}
//#endregion
//#region electron/services/screen-heatmap.service.ts
var FLUSH_INTERVAL_MS$1 = 6e4;
var MAX_RECTS = 8e3;
var GRID_EPSILON = 1e-6;
function localDateString$1(date) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}
/** 跨过零点的区间按本地日期拆开 */
function splitByLocalDay(startedAt, durationMs) {
  const parts = [];
  const end = startedAt + durationMs;
  let cursor = startedAt;
  while (cursor < end) {
    const date = new Date(cursor);
    const nextDay = new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1).getTime();
    const sliceEnd = Math.min(end, nextDay);
    parts.push([localDateString$1(date), sliceEnd - cursor]);
    cursor = sliceEnd;
  }
  return parts;
}
function clampGrid(value) {
  return Math.min(200, Math.max(0, value));
}
/** 窗口裁到所在显示器内，再换算成显示器内的网格坐标；完全在屏幕外时返回 null */
function toGridRect(bounds, display) {
  if (display.width <= 0 || display.height <= 0) return null;
  const left = Math.max(bounds.x, display.x);
  const top = Math.max(bounds.y, display.y);
  const right = Math.min(bounds.x + bounds.width, display.x + display.width);
  const bottom = Math.min(bounds.y + bounds.height, display.y + display.height);
  if (right - left < 1 || bottom - top < 1) return null;
  const clampGridResult = clampGrid(Math.floor((left - display.x) / display.width * 200 + GRID_EPSILON));
  const y0 = clampGrid(Math.floor((top - display.y) / display.height * 200 + GRID_EPSILON));
  const x1 = clampGrid(Math.ceil((right - display.x) / display.width * 200 - GRID_EPSILON));
  const y1 = clampGrid(Math.ceil((bottom - display.y) / display.height * 200 - GRID_EPSILON));
  if (x1 <= clampGridResult || y1 <= y0) return null;
  return {
    x: clampGridResult,
    y: y0,
    width: x1 - clampGridResult,
    height: y1 - y0
  };
}
function incrementKey(entry) {
  return [entry.date, entry.displayKey, entry.appKey, entry.x, entry.y, entry.width, entry.height].join("\0");
}
function toDisplayRow(display, primaryId, seenAt) {
  return {
    displayKey: String(display.id),
    label: (display.label ?? "").trim().slice(0, 120),
    x: Math.round(display.bounds.x),
    y: Math.round(display.bounds.y),
    width: Math.round(display.bounds.width),
    height: Math.round(display.bounds.height),
    scaleFactor: Number.isFinite(display.scaleFactor) && display.scaleFactor > 0 ? display.scaleFactor : 1,
    isPrimary: display.id === primaryId,
    isInternal: typeof display.internal === "boolean" ? display.internal : null,
    lastSeenAt: seenAt
  };
}
function listConnectedDisplays() {
  const seenAt = (/* @__PURE__ */new Date()).toISOString();
  try {
    const primaryId = screen.getPrimaryDisplay().id;
    return new Map(screen.getAllDisplays().map(display => {
      const row = toDisplayRow(display, primaryId, seenAt);
      return [row.displayKey, row];
    }));
  } catch {
    return /* @__PURE__ */new Map();
  }
}
var ScreenHeatmapService = class {
  pending = /* @__PURE__ */new Map();
  pendingDisplays = /* @__PURE__ */new Map();
  pendingGeneration = null;
  flushTimer = null;
  /** 前台窗口在 [startedAt, startedAt + durationMs) 内处于活跃状态；出错只记日志，不影响应用使用记录 */
  record(sample, startedAt, durationMs) {
    try {
      this.accumulate(sample, startedAt, durationMs);
    } catch (error) {
      console.error("[ScreenHeatmap] 记录窗口位置失败:", error instanceof Error ? error.message : error);
    }
  }
  accumulate(sample, startedAt, durationMs) {
    if (!(durationMs > 0) || !Number.isFinite(startedAt)) return;
    const appName = resolveCommonAppName(sample.appName).trim();
    if (!appName) return;
    let display;
    let primaryId;
    try {
      display = screen.getDisplayMatching(sample.bounds);
      primaryId = screen.getPrimaryDisplay().id;
    } catch {
      return;
    }
    const rect = toGridRect(sample.bounds, display.bounds);
    if (!rect) return;
    const generation = getDatabaseGeneration();
    if (this.pendingGeneration !== null && this.pendingGeneration !== generation) {
      this.pending.clear();
      this.pendingDisplays.clear();
    }
    this.pendingGeneration = generation;
    const displayRow = toDisplayRow(display, primaryId, (/* @__PURE__ */new Date()).toISOString());
    this.pendingDisplays.set(displayRow.displayKey, displayRow);
    const appKey = appName.toLocaleLowerCase();
    for (const [date, activeMs] of splitByLocalDay(startedAt, durationMs)) {
      const entry = {
        date,
        displayKey: displayRow.displayKey,
        appKey,
        appName,
        ...rect,
        activeMs
      };
      const key = incrementKey(entry);
      const existing = this.pending.get(key);
      if (existing) existing.activeMs += activeMs;else this.pending.set(key, entry);
    }
    this.ensureTimer();
  }
  flush() {
    if (this.pending.size === 0 && this.pendingDisplays.size === 0) return;
    const generation = this.pendingGeneration;
    if (generation === null || !isDatabaseGenerationCurrent(generation)) {
      this.discardPending();
      return;
    }
    const entries = Array.from(this.pending.values());
    const displays = Array.from(this.pendingDisplays.values());
    this.pending.clear();
    this.pendingDisplays.clear();
    try {
      screenHeatmapRepository.incrementBatch(entries, displays);
      this.pendingGeneration = null;
    } catch (error) {
      for (const entry of entries) {
        const key = incrementKey(entry);
        const existing = this.pending.get(key);
        if (existing) existing.activeMs += entry.activeMs;else this.pending.set(key, entry);
      }
      for (const display of displays) if (!this.pendingDisplays.has(display.displayKey)) this.pendingDisplays.set(display.displayKey, display);
      throw error;
    }
  }
  stop() {
    if (this.flushTimer) clearInterval(this.flushTimer);
    this.flushTimer = null;
    this.flushSafely("停止采集");
  }
  clear() {
    this.discardPending();
    return screenHeatmapRepository.clear();
  }
  query(input) {
    this.flushSafely("查询");
    const connected = listConnectedDisplays();
    const stored = new Map(screenHeatmapRepository.listDisplays().map(row => [row.displayKey, row]));
    const resolved = resolveHeatmapDisplays(connected, stored);
    const totals = /* @__PURE__ */new Map();
    for (const total of screenHeatmapRepository.sumByDisplay(input.startDate, input.endDate)) {
      const display = resolved.get(total.key);
      if (!display || !(total.activeMs > 0)) continue;
      const merged = totals.get(display.key);
      if (merged) merged.activeMs += total.activeMs;else totals.set(display.key, {
        display,
        activeMs: total.activeMs
      });
    }
    const displays = Array.from(totals.values()).sort((left, right) => right.activeMs - left.activeMs).map(({
      display,
      activeMs
    }) => {
      const {
        row
      } = display;
      return {
        key: display.key,
        label: row.label || stored.get(display.key)?.label || "",
        bounds: {
          x: row.x,
          y: row.y,
          width: row.width,
          height: row.height
        },
        scaleFactor: row.scaleFactor,
        isPrimary: row.isPrimary,
        connected: display.connected,
        activeMs
      };
    });
    const displayIndex = new Map(displays.map((display, index) => [display.key, index]));
    const apps = screenHeatmapRepository.sumByApp(input.startDate, input.endDate).filter(total => total.activeMs > 0).sort((left, right) => right.activeMs - left.activeMs).map(total => ({
      key: total.key,
      name: total.name,
      activeMs: total.activeMs
    }));
    const appIndex = new Map(apps.map((app, index) => [app.key, index]));
    const rects = /* @__PURE__ */new Map();
    for (const row of screenHeatmapRepository.listRects(input.startDate, input.endDate, MAX_RECTS)) {
      const resolvedKey = resolved.get(row.displayKey)?.key;
      const display = resolvedKey === undefined ? undefined : displayIndex.get(resolvedKey);
      const app = appIndex.get(row.appKey);
      if (display === undefined || app === undefined || row.activeMs <= 0) continue;
      const key = [display, app, row.x, row.y, row.width, row.height].join("\0");
      const existing = rects.get(key);
      if (existing) existing.activeMs += row.activeMs;else rects.set(key, {
        display,
        app,
        x: row.x,
        y: row.y,
        width: row.width,
        height: row.height,
        activeMs: row.activeMs
      });
    }
    return {
      startDate: input.startDate,
      endDate: input.endDate,
      grid: 200,
      displays,
      apps,
      rects: Array.from(rects.values()),
      totalActiveMs: displays.reduce((sum, display) => sum + display.activeMs, 0),
      activeDays: screenHeatmapRepository.countActiveDays(input.startDate, input.endDate),
      generatedAt: (/* @__PURE__ */new Date()).toISOString()
    };
  }
  discardPending() {
    this.pending.clear();
    this.pendingDisplays.clear();
    this.pendingGeneration = null;
  }
  ensureTimer() {
    if (this.flushTimer) return;
    this.flushTimer = setInterval(() => {
      this.flushSafely("定时写入");
    }, FLUSH_INTERVAL_MS$1);
  }
  flushSafely(operation) {
    try {
      this.flush();
    } catch (error) {
      console.error("[ScreenHeatmap] 批量写入失败，已保留待写入数据:", {
        operation,
        pendingRectCount: this.pending.size,
        errorType: error instanceof Error ? error.name : typeof error
      });
    }
  }
};
var screenHeatmapService = new ScreenHeatmapService();
//#endregion
//#region shared/types/mouse-heatmap.ts
var MOUSE_HEATMAP_LAYERS = ["move", "left", "right", "other"];
//#endregion
//#region electron/repositories/mouse-heatmap-cells.ts
var CELL_COUNT$1 = 25600;
function writeVarint(output, value) {
  let rest = Math.max(0, Math.floor(value));
  while (rest >= 128) {
    output.push(rest % 128 | 128);
    rest = Math.floor(rest / 128);
  }
  output.push(rest);
}
function encodeCells(counts) {
  const entries = Array.from(counts).filter(([cell, count]) => Number.isInteger(cell) && cell >= 0 && cell < CELL_COUNT$1 && count >= 1).sort((left, right) => left[0] - right[0]);
  const bytes = [];
  let previous = -1;
  for (const [cell, count] of entries) {
    writeVarint(bytes, cell - previous - 1);
    writeVarint(bytes, Math.round(count));
    previous = cell;
  }
  return Buffer.from(bytes).toString("base64");
}
/** 逐个读出格子和次数；遇到损坏的数据就停在那里，前面读到的照常使用 */
function forEachEncodedCell(text, visit) {
  if (!text) return;
  const bytes = Buffer.from(text, "base64");
  let offset = 0;
  const readVarint = () => {
    let value = 0;
    let multiplier = 1;
    while (offset < bytes.length) {
      const byte = bytes[offset];
      offset += 1;
      value += (byte & 127) * multiplier;
      if ((byte & 128) === 0) return value;
      multiplier *= 128;
      if (multiplier > 2 ** 49) return null;
    }
    return null;
  };
  let cell = -1;
  while (offset < bytes.length) {
    const gap = readVarint();
    const count = readVarint();
    if (gap === null || count === null) return;
    cell += gap + 1;
    if (cell >= CELL_COUNT$1) return;
    if (count > 0) visit(cell, count);
  }
}
function decodeCells(text) {
  const counts = /* @__PURE__ */new Map();
  forEachEncodedCell(text, (cell, count) => counts.set(cell, (counts.get(cell) ?? 0) + count));
  return counts;
}
/** 累加到按格子序号排列的数组里，返回这一段的总次数 */
function addEncodedCells(text, target) {
  let total = 0;
  forEachEncodedCell(text, (cell, count) => {
    target[cell] += count;
    total += count;
  });
  return total;
}
//#endregion
//#region electron/repositories/mouse-heatmap.repository.ts
var knownLayers = new Set(MOUSE_HEATMAP_LAYERS);
var MouseHeatmapRepository = class {
  applyBatch(cells, stats, displays) {
    if (cells.length === 0 && stats.length === 0 && displays.length === 0) return;
    const database = getDatabase();
    const upsertDisplay = database.prepare(`
      INSERT INTO mouse_heatmap_displays (
        display_key, label, bounds_x, bounds_y, bounds_width, bounds_height,
        scale_factor, is_primary, is_internal, first_seen_at, last_seen_at
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      ON CONFLICT(display_key) DO UPDATE SET
        label = excluded.label,
        bounds_x = excluded.bounds_x,
        bounds_y = excluded.bounds_y,
        bounds_width = excluded.bounds_width,
        bounds_height = excluded.bounds_height,
        scale_factor = excluded.scale_factor,
        is_primary = excluded.is_primary,
        is_internal = COALESCE(excluded.is_internal, is_internal),
        last_seen_at = excluded.last_seen_at
    `);
    const selectCells = database.prepare(`
      SELECT cells FROM mouse_heatmap_daily WHERE stat_date = ? AND display_key = ? AND layer = ?
    `);
    const upsertCells = database.prepare(`
      INSERT INTO mouse_heatmap_daily (stat_date, display_key, layer, cells, total_count, updated_at)
      VALUES (?, ?, ?, ?, ?, ?)
      ON CONFLICT(stat_date, display_key, layer) DO UPDATE SET
        cells = excluded.cells,
        total_count = excluded.total_count,
        updated_at = excluded.updated_at
    `);
    const incrementStats = database.prepare(`
      INSERT INTO mouse_daily_stats (
        stat_date, left_clicks, right_clicks, middle_clicks, other_clicks, scrolls, scrolls_up, scrolls_down, updated_at
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
      ON CONFLICT(stat_date) DO UPDATE SET
        left_clicks = left_clicks + excluded.left_clicks,
        right_clicks = right_clicks + excluded.right_clicks,
        middle_clicks = middle_clicks + excluded.middle_clicks,
        other_clicks = other_clicks + excluded.other_clicks,
        scrolls = scrolls + excluded.scrolls,
        scrolls_up = COALESCE(scrolls_up, 0) + excluded.scrolls_up,
        scrolls_down = COALESCE(scrolls_down, 0) + excluded.scrolls_down,
        updated_at = excluded.updated_at
    `);
    const updatedAt = (/* @__PURE__ */new Date()).toISOString();
    database.exec("BEGIN");
    try {
      for (const display of displays) upsertDisplay.run(display.displayKey, display.label, display.x, display.y, display.width, display.height, display.scaleFactor, display.isPrimary ? 1 : 0, typeof display.isInternal === "boolean" ? display.isInternal ? 1 : 0 : null, display.lastSeenAt, display.lastSeenAt);
      for (const entry of cells) {
        const merged = decodeCells(selectCells.get(entry.date, entry.displayKey, entry.layer)?.cells ?? "");
        for (const [cell, count] of entry.cells) merged.set(cell, (merged.get(cell) ?? 0) + count);
        let total = 0;
        for (const count of merged.values()) total += count;
        upsertCells.run(entry.date, entry.displayKey, entry.layer, encodeCells(merged), Math.round(total), updatedAt);
      }
      for (const entry of stats) incrementStats.run(entry.date, Math.max(0, Math.round(entry.leftClicks)), Math.max(0, Math.round(entry.rightClicks)), Math.max(0, Math.round(entry.middleClicks)), Math.max(0, Math.round(entry.otherClicks)), Math.max(0, Math.round(entry.scrolls)), Math.max(0, Math.round(entry.scrollsUp)), Math.max(0, Math.round(entry.scrollsDown)), updatedAt);
      database.exec("COMMIT");
    } catch (error) {
      database.exec("ROLLBACK");
      throw error;
    }
  }
  listDisplays() {
    return getDatabase().prepare(`
      SELECT display_key, label, bounds_x, bounds_y, bounds_width, bounds_height,
             scale_factor, is_primary, is_internal, last_seen_at
      FROM mouse_heatmap_displays
    `).all().map(row => ({
      displayKey: row.display_key,
      label: row.label,
      x: Number(row.bounds_x),
      y: Number(row.bounds_y),
      width: Number(row.bounds_width),
      height: Number(row.bounds_height),
      scaleFactor: Number(row.scale_factor) || 1,
      isPrimary: Number(row.is_primary) === 1,
      isInternal: row.is_internal === null || row.is_internal === undefined ? null : Number(row.is_internal) === 1,
      lastSeenAt: row.last_seen_at
    }));
  }
  /** 区间内每天每块屏每个图层的一行格子数据，逐行读出，避免一年的数据一次全放进内存 */
  *iterateCells(startDate, endDate) {
    const statement = getDatabase().prepare(`
      SELECT display_key, layer, cells
      FROM mouse_heatmap_daily
      WHERE stat_date BETWEEN ? AND ? AND total_count > 0
    `);
    for (const row of statement.iterate(startDate, endDate)) {
      if (!knownLayers.has(row.layer)) continue;
      yield {
        displayKey: row.display_key,
        layer: row.layer,
        cells: row.cells
      };
    }
  }
  sumStats(startDate, endDate) {
    const row = getDatabase().prepare(`
      SELECT SUM(left_clicks) AS left_clicks, SUM(right_clicks) AS right_clicks,
             SUM(middle_clicks) AS middle_clicks, SUM(other_clicks) AS other_clicks,
             SUM(scrolls) AS scrolls, SUM(scrolls_up) AS scrolls_up, SUM(scrolls_down) AS scrolls_down
      FROM mouse_daily_stats
      WHERE stat_date BETWEEN ? AND ?
    `).get(startDate, endDate);
    return {
      leftClicks: Number(row?.left_clicks ?? 0),
      rightClicks: Number(row?.right_clicks ?? 0),
      middleClicks: Number(row?.middle_clicks ?? 0),
      otherClicks: Number(row?.other_clicks ?? 0),
      scrolls: Number(row?.scrolls ?? 0),
      scrollsUp: Number(row?.scrolls_up ?? 0),
      scrollsDown: Number(row?.scrolls_down ?? 0)
    };
  }
  /** 有点击、滚动或光标移动的天数 */
  countActiveDays(startDate, endDate) {
    const row = getDatabase().prepare(`
      SELECT COUNT(*) AS count FROM (
        SELECT stat_date FROM mouse_daily_stats
        WHERE stat_date BETWEEN ? AND ? AND left_clicks + right_clicks + middle_clicks + other_clicks + scrolls > 0
        UNION
        SELECT stat_date FROM mouse_heatmap_daily
        WHERE stat_date BETWEEN ? AND ? AND total_count > 0
      )
    `).get(startDate, endDate, startDate, endDate);
    return Number(row?.count ?? 0);
  }
  clear() {
    const database = getDatabase();
    database.exec("BEGIN");
    try {
      const cells = database.prepare("DELETE FROM mouse_heatmap_daily").run();
      const stats = database.prepare("DELETE FROM mouse_daily_stats").run();
      database.prepare("DELETE FROM mouse_heatmap_displays").run();
      database.exec("COMMIT");
      return Number(cells.changes) + Number(stats.changes);
    } catch (error) {
      database.exec("ROLLBACK");
      throw error;
    }
  }
};
var mouseHeatmapRepository = new MouseHeatmapRepository();
//#endregion
//#region electron/services/device-battery.ts
var CHECK_TIMEOUT_MS = 1e4;
var cached = null;
var pending = null;
function run(file, args) {
  return new Promise(resolve => {
    execFile(file, args, {
      timeout: CHECK_TIMEOUT_MS,
      windowsHide: true
    }, (error, stdout) => {
      resolve(error ? null : String(stdout || ""));
    });
  });
}
async function detect() {
  if (process.platform === "darwin") {
    const output = await run("/usr/bin/pmset", ["-g", "batt"]);
    return output === null ? null : /InternalBattery/i.test(output);
  }
  if (process.platform === "win32") {
    const systemRoot = process.env.SystemRoot || "C:\\Windows";
    const output = await run(path.join(systemRoot, "System32", "WindowsPowerShell", "v1.0", "powershell.exe"), ["-NoProfile", "-NonInteractive", "-Command", "@(Get-CimInstance -ClassName Win32_Battery -ErrorAction SilentlyContinue).Count"]);
    const count = output === null ? NaN : Number.parseInt(output.trim(), 10);
    return Number.isFinite(count) ? count > 0 : null;
  }
  return null;
}
/** 开始检测（重复调用只查一次） */
function detectDeviceBattery() {
  if (!pending) pending = detect().catch(() => null).then(value => {
    cached = value;
    return value;
  });
  return pending;
}
/** 已查到的结果；还没查完或查不到时为 null */
function cachedDeviceBattery() {
  return cached;
}
//#endregion
//#region electron/services/mouse-heatmap.service.ts
var FLUSH_INTERVAL_MS = 6e4;
var CELL_COUNT = 25600;
var CLICK_LAYERS = ["left", "right", "other", "other"];
var CLICK_LAYER_SET = new Set(CLICK_LAYERS);
var INTERNAL_LABEL = /内建|內建|内置|built-?in|color lcd/i;
function localDateString(date) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}
function shiftLocalDate(value, days) {
  const [year, month, day] = value.split("-").map(Number);
  return localDateString(new Date(year, month - 1, day + days));
}
function countDays(startDate, endDate) {
  const [startYear, startMonth, startDay] = startDate.split("-").map(Number);
  const [endYear, endMonth, endDay] = endDate.split("-").map(Number);
  return Math.round((Date.UTC(endYear, endMonth - 1, endDay) - Date.UTC(startYear, startMonth - 1, startDay)) / 864e5) + 1;
}
function emptyStats(date) {
  return {
    date,
    leftClicks: 0,
    rightClicks: 0,
    middleClicks: 0,
    otherClicks: 0,
    scrolls: 0,
    scrollsUp: 0,
    scrollsDown: 0
  };
}
function addClick(stats, button, count) {
  if (button === 0) stats.leftClicks += count;else if (button === 1) stats.rightClicks += count;else if (button === 2) stats.middleClicks += count;else stats.otherClicks += count;
}
function clampCell(value) {
  return Math.min(159, Math.max(0, value));
}
function containsPoint(display, point) {
  const {
    x,
    y,
    width,
    height
  } = display.bounds;
  return point.x >= x && point.y >= y && point.x < x + width && point.y < y + height;
}
/** 自带屏 + 有电池画成笔记本；没电池的是 iMac、一体机，和外接屏一样画成显示器。电池还没查到时先按笔记本画 */
function displayForm(isInternal, label) {
  if (!(typeof isInternal === "boolean" ? isInternal : INTERNAL_LABEL.test(label))) return "monitor";
  detectDeviceBattery();
  return cachedDeviceBattery() === false ? "monitor" : "laptop";
}
function cellKey(date, displayKey, layer) {
  return [date, displayKey, layer].join("\0");
}
var MouseHeatmapService = class {
  pendingCells = /* @__PURE__ */new Map();
  pendingStats = /* @__PURE__ */new Map();
  pendingDisplays = /* @__PURE__ */new Map();
  pendingGeneration = null;
  flushTimer = null;
  /** 出错只记日志，不影响应用使用记录 */
  record(batch) {
    try {
      this.accumulate(batch);
    } catch (error) {
      console.error("[MouseHeatmap] 记录鼠标数据失败:", error instanceof Error ? error.message : error);
    }
  }
  accumulate(batch) {
    const now = Date.now();
    let displays;
    let primaryId;
    try {
      displays = screen.getAllDisplays();
      primaryId = screen.getPrimaryDisplay().id;
    } catch {
      return;
    }
    if (displays.length === 0) return;
    const generation = getDatabaseGeneration();
    if (this.pendingGeneration !== null && this.pendingGeneration !== generation) this.discardPending();
    this.pendingGeneration = generation;
    const date = localDateString(new Date(now));
    const seenAt = new Date(now).toISOString();
    const stats = this.statsFor(date);
    const rows = /* @__PURE__ */new Map();
    const toDip = point => batch.platform === "windows" ? screen.screenToDipPoint(point) : point;
    const locate = point => {
      let display = displays.find(item => containsPoint(item, point));
      if (!display) try {
        display = screen.getDisplayNearestPoint({
          x: Math.round(point.x),
          y: Math.round(point.y)
        });
      } catch {
        return null;
      }
      const {
        x,
        y,
        width,
        height
      } = display.bounds;
      if (width <= 0 || height <= 0) return null;
      let row = rows.get(display.id);
      if (!row) {
        row = toDisplayRow(display, primaryId, seenAt);
        rows.set(display.id, row);
        if (row.isInternal) detectDeviceBattery();
        this.pendingDisplays.set(row.displayKey, row);
      }
      const column = clampCell(Math.floor((point.x - x) / width * 160));
      const line = clampCell(Math.floor((point.y - y) / height * 160));
      return {
        displayKey: row.displayKey,
        cell: line * 160 + column
      };
    };
    for (let index = 0; index + 1 < batch.samples.length; index += 2) {
      const located = locate(toDip({
        x: batch.samples[index],
        y: batch.samples[index + 1]
      }));
      if (located) this.addCell(date, located.displayKey, "move", located.cell);
    }
    for (let index = 0; index + 2 < batch.clicks.length; index += 3) {
      const button = batch.clicks[index + 2];
      addClick(stats, button, 1);
      const located = locate(toDip({
        x: batch.clicks[index],
        y: batch.clicks[index + 1]
      }));
      if (located) this.addCell(date, located.displayKey, CLICK_LAYERS[button] ?? "other", located.cell);
    }
    batch.hiddenClicks.forEach((count, button) => addClick(stats, button, Math.round(count)));
    stats.scrolls += Math.round(batch.scrolls);
    stats.scrollsUp += Math.round(batch.scrollsUp);
    stats.scrollsDown += Math.round(batch.scrollsDown);
    this.ensureTimer();
  }
  flush() {
    if (this.pendingCells.size === 0 && this.pendingStats.size === 0 && this.pendingDisplays.size === 0) return;
    const generation = this.pendingGeneration;
    if (generation === null || !isDatabaseGenerationCurrent(generation)) {
      this.discardPending();
      return;
    }
    const cells = Array.from(this.pendingCells.values());
    const stats = Array.from(this.pendingStats.values());
    const displays = Array.from(this.pendingDisplays.values());
    this.pendingCells.clear();
    this.pendingStats.clear();
    this.pendingDisplays.clear();
    try {
      mouseHeatmapRepository.applyBatch(cells, stats, displays);
      this.pendingGeneration = null;
    } catch (error) {
      for (const entry of cells) for (const [cell, count] of entry.cells) this.addCell(entry.date, entry.displayKey, entry.layer, cell, count);
      for (const entry of stats) {
        const target = this.statsFor(entry.date);
        target.leftClicks += entry.leftClicks;
        target.rightClicks += entry.rightClicks;
        target.middleClicks += entry.middleClicks;
        target.otherClicks += entry.otherClicks;
        target.scrolls += entry.scrolls;
        target.scrollsUp += entry.scrollsUp;
        target.scrollsDown += entry.scrollsDown;
      }
      for (const display of displays) if (!this.pendingDisplays.has(display.displayKey)) this.pendingDisplays.set(display.displayKey, display);
      throw error;
    }
  }
  stop() {
    if (this.flushTimer) clearInterval(this.flushTimer);
    this.flushTimer = null;
    this.flushSafely("停止采集");
  }
  clear() {
    this.discardPending();
    return mouseHeatmapRepository.clear();
  }
  query(input) {
    this.flushSafely("查询");
    const connected = listConnectedDisplays();
    const stored = new Map(mouseHeatmapRepository.listDisplays().map(row => [row.displayKey, row]));
    const resolved = resolveHeatmapDisplays(connected, stored);
    const accumulators = /* @__PURE__ */new Map();
    for (const row of mouseHeatmapRepository.iterateCells(input.startDate, input.endDate)) {
      const display = resolved.get(row.displayKey);
      if (!display) continue;
      let entry = accumulators.get(display.key);
      if (!entry) {
        entry = {
          display,
          layers: /* @__PURE__ */new Map()
        };
        accumulators.set(display.key, entry);
      }
      let accumulator = entry.layers.get(row.layer);
      if (!accumulator) {
        accumulator = {
          values: new Float64Array(CELL_COUNT),
          total: 0
        };
        entry.layers.set(row.layer, accumulator);
      }
      accumulator.total += addEncodedCells(row.cells, accumulator.values);
    }
    const ranked = Array.from(accumulators.values(), ({
      display,
      layers
    }) => {
      let clicks = 0;
      for (const [layer, accumulator] of layers) if (CLICK_LAYER_SET.has(layer)) clicks += accumulator.total;
      return {
        display,
        layers,
        clicks,
        moves: layers.get("move")?.total ?? 0
      };
    }).filter(item => item.clicks + item.moves > 0).sort((left, right) => right.clicks - left.clicks || right.moves - left.moves);
    const displays = [];
    const layers = [];
    for (const item of ranked) {
      const {
        key,
        row
      } = item.display;
      const display = displays.length;
      const label = row.label || stored.get(key)?.label || "";
      displays.push({
        key,
        label,
        bounds: {
          x: row.x,
          y: row.y,
          width: row.width,
          height: row.height
        },
        scaleFactor: row.scaleFactor,
        isPrimary: row.isPrimary,
        connected: item.display.connected,
        form: displayForm(row.isInternal ?? stored.get(key)?.isInternal, label),
        clicks: item.clicks,
        moves: item.moves
      });
      for (const layer of MOUSE_HEATMAP_LAYERS) {
        const accumulator = item.layers.get(layer);
        if (!accumulator || accumulator.total <= 0) continue;
        const cells = [];
        for (let cell = 0; cell < CELL_COUNT; cell += 1) {
          const count = accumulator.values[cell];
          if (count > 0) cells.push(cell, count);
        }
        layers.push({
          display,
          layer,
          cells
        });
      }
    }
    const days = countDays(input.startDate, input.endDate);
    const previousEnd = shiftLocalDate(input.startDate, -1);
    const previousStart = shiftLocalDate(previousEnd, -(days - 1));
    return {
      startDate: input.startDate,
      endDate: input.endDate,
      grid: 160,
      displays,
      layers,
      totals: mouseHeatmapRepository.sumStats(input.startDate, input.endDate),
      previousTotals: mouseHeatmapRepository.sumStats(previousStart, previousEnd),
      activeDays: mouseHeatmapRepository.countActiveDays(input.startDate, input.endDate),
      generatedAt: (/* @__PURE__ */new Date()).toISOString()
    };
  }
  statsFor(date) {
    let stats = this.pendingStats.get(date);
    if (!stats) {
      stats = emptyStats(date);
      this.pendingStats.set(date, stats);
    }
    return stats;
  }
  addCell(date, displayKey, layer, cell, count = 1) {
    const key = cellKey(date, displayKey, layer);
    let entry = this.pendingCells.get(key);
    if (!entry) {
      entry = {
        date,
        displayKey,
        layer,
        cells: /* @__PURE__ */new Map()
      };
      this.pendingCells.set(key, entry);
    }
    entry.cells.set(cell, (entry.cells.get(cell) ?? 0) + count);
  }
  discardPending() {
    this.pendingCells.clear();
    this.pendingStats.clear();
    this.pendingDisplays.clear();
    this.pendingGeneration = null;
  }
  ensureTimer() {
    if (this.flushTimer) return;
    this.flushTimer = setInterval(() => {
      this.flushSafely("定时写入");
    }, FLUSH_INTERVAL_MS);
  }
  flushSafely(operation) {
    try {
      this.flush();
    } catch (error) {
      console.error("[MouseHeatmap] 批量写入失败，已保留待写入数据:", {
        operation,
        pendingCellRows: this.pendingCells.size,
        errorType: error instanceof Error ? error.name : typeof error
      });
    }
  }
};
var mouseHeatmapService = new MouseHeatmapService();
//#endregion
//#region electron/services/app-usage.service.ts
var detectIntervalMs = 3e3;
var heartbeatIntervalMs = 15e3;
var detectionFailureGraceMs = 1e4;
var maxQueryLimit = 5e4;
var maxAccountedIntervalMs = 6e4;
function activeContextOptions(settings) {
  return {
    includeWindowContext: settings.enableAppWindowContext,
    includeBrowserDomain: settings.enableBrowserDomainTracking,
    includeAccessibilityEvents: settings.enableMacActivityEvidence && settings.enableMacAccessibilityEvents,
    includeWindowBounds: settings.enableScreenHeatmap,
    includeMouseHeatmap: settings.enableMouseHeatmap
  };
}
function encodeSessionCursor(session) {
  return Buffer.from(JSON.stringify({
    startedAt: session.startedAt,
    id: session.id
  })).toString("base64url");
}
function decodeSessionCursor(cursor) {
  if (!cursor) return null;
  try {
    const parsed = JSON.parse(Buffer.from(cursor, "base64url").toString("utf8"));
    if (typeof parsed.startedAt !== "string" || typeof parsed.id !== "string") return null;
    if (!Number.isFinite(Date.parse(parsed.startedAt)) || !parsed.id) return null;
    return {
      startedAt: parsed.startedAt,
      id: parsed.id
    };
  } catch {
    return null;
  }
}
function matchesPrivacyRule(snapshot) {
  if (!snapshot.app) return false;
  const settings = settingsRepository.getSettings();
  const names = [snapshot.app.rawName, snapshot.app.displayName, snapshot.app.processName].map(name => name?.trim().toLowerCase()).filter(name => Boolean(name));
  if (settings.screenshotExcludeAllowApps.map(keyword => keyword.trim().toLowerCase()).filter(Boolean).some(keyword => names.some(name => name.includes(keyword)))) return false;
  return settings.screenshotExcludeApps.map(keyword => keyword.trim().toLowerCase()).filter(Boolean).some(keyword => names.some(name => name.includes(keyword)));
}
function contextKey(snapshot) {
  return JSON.stringify({
    windowId: snapshot.window?.id ?? null,
    title: snapshot.window?.title ?? null,
    document: snapshot.window?.documentHint ?? null,
    domain: snapshot.browser?.domain ?? null,
    displayId: snapshot.window?.displayId ?? null
  });
}
function runtimeToSession(session) {
  const app = session.applicationId ? appUsageRepository.getApplication(session.applicationId) : null;
  const stateName = session.activityState === "unknown" ? appText("appUsageState.unknown") : session.activityState === "excluded" ? appText("appUsageState.excluded") : session.activityState === "locked" ? appText("appUsageState.locked") : session.activityState === "suspended" ? appText("appUsageState.suspended") : appText("appUsageState.unknownApp");
  return {
    id: session.id,
    applicationId: session.applicationId,
    activityState: session.activityState,
    appName: app?.appName ?? stateName,
    rawName: app?.rawName ?? null,
    startedAt: session.startedAt,
    endedAt: session.endedAt,
    durationSec: Math.max(0, Math.round(session.durationMs / 1e3)),
    activeDurationSec: Math.max(0, Math.round(session.activeDurationMs / 1e3)),
    idleDurationSec: Math.max(0, Math.round(session.idleDurationMs / 1e3)),
    longestActiveDurationSec: Math.max(0, Math.round(session.longestActiveDurationMs / 1e3)),
    sampleCount: session.sampleCount,
    contextSwitchCount: session.contextSwitchCount,
    startReason: session.startReason,
    endReason: session.endReason,
    detectionSource: session.detectionSource,
    confidence: session.confidence,
    createdAt: session.createdAt,
    isOpen: session.isOpen
  };
}
var AppUsageService = class {
  current = null;
  currentContext = null;
  currentActivity = null;
  pendingContext = null;
  currentSnapshot = null;
  detectTimer = null;
  heartbeatTimer = null;
  isDetecting = false;
  running = false;
  runGeneration = 0;
  databaseGeneration = null;
  failureStartedAt = null;
  consecutiveFailures = 0;
  lastSuccessfulDetectionAt = null;
  lastPersistedAt = null;
  pausedInterval = null;
  lastContextPurgeAt = 0;
  unsubscribeActiveContextChanges = null;
  unsubscribeMouseHeatmapBatches = null;
  start(reason = "app-start") {
    if (this.running || this.pausedInterval) return;
    try {
      const settings = settingsRepository.getSettings();
      if (!settings.enableAppUsageTracking) return;
      this.databaseGeneration = getDatabaseGeneration();
      this.running = true;
      this.runGeneration += 1;
      this.unsubscribeActiveContextChanges?.();
      this.unsubscribeActiveContextChanges = subscribeActiveContextChanges(() => {
        if (this.running) this.detect("native-event");
      });
      this.unsubscribeMouseHeatmapBatches?.();
      this.unsubscribeMouseHeatmapBatches = subscribeMouseHeatmapBatches(batch => mouseHeatmapService.record(batch));
      startActiveContextCollection(activeContextOptions(settings));
      macActivityEventService.refresh();
      appUsageRepository.closeStaleOpenSessions();
      this.purgeExpiredContextIfNeeded();
      this.startTimers();
      this.detect(reason);
    } catch (error) {
      this.running = false;
      this.runGeneration += 1;
      this.databaseGeneration = null;
      this.stopTimers();
      this.unsubscribeActiveContextChanges?.();
      this.unsubscribeActiveContextChanges = null;
      this.stopMouseHeatmap();
      stopActiveContextCollection();
      macActivityEventService.stop();
      this.resetRuntimeState();
      this.logDiagnostic("start", "APP_USAGE_START_FAILED", error);
    }
  }
  stop(reason = "stop") {
    const hadRuntimeState = this.running || this.current !== null || this.currentContext !== null || this.currentActivity !== null || this.pausedInterval !== null;
    this.running = false;
    if (hadRuntimeState) this.runGeneration += 1;
    try {
      this.stopTimers();
      this.unsubscribeActiveContextChanges?.();
      this.unsubscribeActiveContextChanges = null;
      this.stopMouseHeatmap();
      stopActiveContextCollection();
      macActivityEventService.stop();
      const now = Date.now();
      this.advanceCurrent(now, performance.now());
      this.closeCurrent(reason);
      if (this.pausedInterval) this.persistClosedStateInterval(this.pausedInterval, now, "stop");
      screenHeatmapService.stop();
    } catch (error) {
      this.logDiagnostic("stop", "APP_USAGE_STOP_FAILED", error);
    } finally {
      this.resetRuntimeState();
      this.pausedInterval = null;
      this.databaseGeneration = null;
      this.resetFailure();
    }
  }
  pause(state, reason) {
    if (!this.running || this.pausedInterval) return;
    const now = Date.now();
    const databaseGeneration = this.databaseGeneration;
    this.running = false;
    this.runGeneration += 1;
    try {
      this.stopTimers();
      this.unsubscribeActiveContextChanges?.();
      this.unsubscribeActiveContextChanges = null;
      this.stopMouseHeatmap();
      pauseActiveContextCollection();
      macActivityEventService.stop();
      this.advanceCurrent(now, performance.now());
      this.closeCurrent(reason);
      screenHeatmapService.stop();
    } catch (error) {
      this.logDiagnostic("pause", "APP_USAGE_PAUSE_FAILED", error);
      this.resetRuntimeState();
    }
    if (databaseGeneration !== null) this.pausedInterval = {
      state,
      startedAt: now,
      reason,
      databaseGeneration
    };
  }
  resume(reason = "resume") {
    const paused = this.pausedInterval;
    this.pausedInterval = null;
    if (paused) this.persistClosedStateInterval(paused, Date.now(), "resume");
    this.start(reason);
  }
  isRunning() {
    return this.running;
  }
  refreshPrivacyRules() {
    if (!this.running) return;
    const now = Date.now();
    this.advanceCurrent(now, performance.now());
    this.closeCurrent("privacy-rule-changed");
    this.detect("privacy-rule-changed");
  }
  refreshCaptureLevel() {
    this.closeCurrentContext();
    if (!this.running) return;
    configureActiveContextCollection(activeContextOptions(settingsRepository.getSettings()));
    macActivityEventService.refresh();
    this.detect("capture-level-changed");
  }
  /** 鼠标热力开关变化：只改 Helper 的采集配置，不像 refreshCaptureLevel 那样切断当前窗口上下文 */
  refreshMouseHeatmap() {
    const settings = settingsRepository.getSettings();
    if (!settings.enableMouseHeatmap) mouseHeatmapService.stop();
    if (!this.running) return;
    configureActiveContextCollection(activeContextOptions(settings));
  }
  stopMouseHeatmap() {
    this.unsubscribeMouseHeatmapBatches?.();
    this.unsubscribeMouseHeatmapBatches = null;
    mouseHeatmapService.stop();
  }
  applyRetentionPolicy() {
    this.lastContextPurgeAt = 0;
    this.purgeExpiredContextIfNeeded();
  }
  clearContextData(kind) {
    this.closeCurrentContext();
    const screenHeatmapChanged = kind === "browser" ? 0 : screenHeatmapService.clear();
    return appUsageRepository.clearContextData(kind) + screenHeatmapChanged;
  }
  getDiagnosticsState() {
    const settings = settingsRepository.getSettings();
    return {
      running: this.running,
      lastSuccessfulDetectionAt: this.lastSuccessfulDetectionAt,
      lastPersistedAt: this.lastPersistedAt,
      consecutiveFailures: this.consecutiveFailures,
      idleSeconds: this.getSystemIdleSeconds(),
      source: this.currentSnapshot?.source ?? null,
      confidence: this.currentSnapshot?.confidence ?? null,
      trackingLevel: settings.enableBrowserDomainTracking ? "browser-domain" : settings.enableAppWindowContext ? "window-context" : "basic"
    };
  }
  async detect(startReason = "foreground") {
    if (!this.running || this.isDetecting) return;
    this.isDetecting = true;
    const runGeneration = this.runGeneration;
    const operation = devPerformanceMonitorService.startOperation("app_usage.detect", {
      reason: startReason
    });
    let operationOk = true;
    try {
      const settings = settingsRepository.getSettings();
      const websiteRulesEnabled = websitePrivacyService.enabled();
      const beforeWebsitePrivacy = await websitePrivacyService.inspect(false);
      if (!this.running || runGeneration !== this.runGeneration || !this.refreshDatabaseOwnership("detect")) return;
      if (beforeWebsitePrivacy.blocked) {
        const now = Date.now();
        const monotonicNow = performance.now();
        this.resetFailure();
        this.advanceCurrent(now, monotonicNow);
        this.handleSyntheticState("excluded", null, now, monotonicNow, startReason);
        return;
      }
      const snapshot = await (websiteRulesEnabled ? getFreshActiveContextSnapshot : getActiveContextSnapshot)(activeContextOptions(settings));
      if (!this.running || runGeneration !== this.runGeneration) return;
      if (!this.refreshDatabaseOwnership("detect")) return;
      const now = Date.now();
      const monotonicNow = performance.now();
      if (!snapshot?.app) {
        this.handleDetectionFailure(now, monotonicNow);
        return;
      }
      this.lastSuccessfulDetectionAt = snapshot.observedAt;
      const recoveredFromFailure = this.failureStartedAt !== null && now - this.failureStartedAt >= detectionFailureGraceMs;
      this.resetFailure();
      this.advanceCurrent(now, monotonicNow);
      if (recoveredFromFailure && this.current?.activityState === "unknown") this.closeCurrent("recovered");
      const websitePrivacy = await websitePrivacyService.recheck(beforeWebsitePrivacy, false);
      if (!this.running || runGeneration !== this.runGeneration || !this.refreshDatabaseOwnership("detect")) return;
      const changedWindow = websiteRulesEnabled && snapshot.window?.id && websitePrivacy.snapshot && snapshot.window.id !== websitePrivacy.snapshot.foregroundId;
      if (websitePrivacy.blocked || changedWindow || matchesPrivacyRule(snapshot)) {
        this.handleSyntheticState("excluded", snapshot, now, monotonicNow, startReason);
        return;
      }
      const applicationId = this.current?.activityState === "app" && this.current.applicationId && this.currentSnapshot?.app?.stableKey === snapshot.app.stableKey ? this.current.applicationId : appUsageRepository.upsertApplication(snapshot.app, snapshot.observedAt, this.databaseGeneration);
      if (!applicationId) {
        this.logDiagnostic("persist", "APP_USAGE_DATABASE_GENERATION_MISMATCH");
        this.resetRuntimeState();
        return;
      }
      const currentDisplayName = this.currentSnapshot?.app?.displayName?.trim().toLocaleLowerCase();
      const nextDisplayName = snapshot.app.displayName?.trim().toLocaleLowerCase();
      if (this.current?.activityState === "app" && Boolean(currentDisplayName) && currentDisplayName === nextDisplayName && this.current && this.current.applicationId !== applicationId) this.current.applicationId = applicationId;
      if (!this.current || this.current.activityState !== "app" || this.current.applicationId !== applicationId) {
        if (this.current) this.closeCurrent(this.current.activityState === "app" ? "switch" : "state-ended");
        this.beginSession("app", applicationId, snapshot, startReason, now, monotonicNow);
      } else if (this.current) {
        this.currentSnapshot = snapshot;
        this.current.sampleCount += 1;
        this.current.detectionSource = snapshot.source;
        this.current.confidence = snapshot.confidence;
        this.updateContext(snapshot, now, monotonicNow);
      }
    } catch (error) {
      operationOk = false;
      this.logDiagnostic("detect", "APP_USAGE_DETECTION_FAILED", error);
    } finally {
      operation.end({
        ok: operationOk,
        measurements: {
          consecutiveFailures: this.consecutiveFailures
        }
      });
      this.isDetecting = false;
      if (this.running && runGeneration !== this.runGeneration) this.detect("restart");
    }
  }
  handleDetectionFailure(now, monotonicNow) {
    this.consecutiveFailures += 1;
    if (this.failureStartedAt === null) {
      this.advanceCurrent(now, monotonicNow);
      this.failureStartedAt = now;
      return;
    }
    if (now - this.failureStartedAt < detectionFailureGraceMs) return;
    if (this.current?.activityState !== "unknown") {
      this.closeCurrent("error");
      this.beginSession("unknown", null, null, "detection-failed", this.failureStartedAt, monotonicNow - (now - this.failureStartedAt));
    }
    this.advanceCurrent(now, monotonicNow);
  }
  handleSyntheticState(state, snapshot, now, monotonicNow, startReason) {
    if (this.current?.activityState !== state) {
      if (this.current) this.closeCurrent("privacy-excluded");
      this.beginSession(state, null, null, startReason, now, monotonicNow);
    } else this.current.sampleCount += 1;
    this.currentSnapshot = null;
  }
  beginSession(state, applicationId, snapshot, startReason, startedAt, monotonicAt) {
    if (this.databaseGeneration === null || !isDatabaseGenerationCurrent(this.databaseGeneration)) {
      this.logDiagnostic("persist", "APP_USAGE_DATABASE_GENERATION_MISMATCH");
      this.resetRuntimeState();
      return;
    }
    const iso = new Date(startedAt).toISOString();
    this.current = {
      id: crypto.randomUUID(),
      applicationId,
      activityState: state,
      startedAt: iso,
      endedAt: iso,
      durationMs: 0,
      activeDurationMs: 0,
      idleDurationMs: 0,
      longestActiveDurationMs: 0,
      sampleCount: 1,
      contextSwitchCount: 0,
      startReason,
      endReason: null,
      detectionSource: snapshot?.source ?? "polling-fallback",
      confidence: snapshot?.confidence ?? "low",
      isOpen: true,
      createdAt: iso,
      updatedAt: iso,
      databaseGeneration: this.databaseGeneration,
      lastMonotonicAt: monotonicAt,
      activeStreakMs: 0
    };
    this.currentSnapshot = snapshot;
    if (!this.persistCurrent("begin")) {
      this.resetRuntimeState();
      return;
    }
    if (snapshot) this.updateContext(snapshot, startedAt, monotonicAt);
  }
  advanceCurrent(now, monotonicNow) {
    if (!this.current) return;
    const elapsed = Math.max(0, Math.min(maxAccountedIntervalMs, monotonicNow - this.current.lastMonotonicAt));
    this.current.lastMonotonicAt = monotonicNow;
    this.current.endedAt = new Date(now).toISOString();
    this.current.durationMs += elapsed;
    if (this.current.activityState === "app") {
      const settings = settingsRepository.getSettings();
      const thresholdSeconds = settings.idleMinutes * 60;
      const idleSeconds = this.getSystemIdleSeconds();
      const idlePart = idleSeconds >= thresholdSeconds ? Math.min(elapsed, (idleSeconds - thresholdSeconds) * 1e3) : 0;
      const activePart = elapsed - idlePart;
      this.current.activeDurationMs += activePart;
      this.current.idleDurationMs += idlePart;
      this.current.activeStreakMs += activePart;
      this.current.longestActiveDurationMs = Math.max(this.current.longestActiveDurationMs, this.current.activeStreakMs);
      if (idlePart > 0) this.current.activeStreakMs = 0;
      const intervalStartedAt = now - elapsed;
      const windowBounds = this.currentSnapshot?.windowBounds;
      if (activePart > 0 && settings.enableScreenHeatmap && windowBounds) screenHeatmapService.record({
        appName: this.currentSnapshot?.app?.displayName ?? null,
        bounds: windowBounds
      }, intervalStartedAt, activePart);
      if (activePart > 0) {
        this.appendActivityDuration("active", intervalStartedAt, intervalStartedAt + activePart, activePart, monotonicNow);
        if (!this.current) return;
      }
      if (idlePart > 0) {
        this.appendActivityDuration("idle", intervalStartedAt + activePart, now, idlePart, monotonicNow);
        if (!this.current) return;
      }
      if (this.currentContext) {
        this.currentContext.endedAt = this.current.endedAt;
        this.currentContext.activeDurationMs += activePart;
        this.currentContext.lastMonotonicAt = monotonicNow;
      }
    }
    this.current.updatedAt = (/* @__PURE__ */new Date()).toISOString();
  }
  closeCurrent(reason) {
    if (!this.current) {
      if (this.currentContext || this.currentActivity) {
        this.logDiagnostic("close", "APP_USAGE_ORPHAN_RUNTIME_DROPPED");
        this.resetRuntimeState();
      }
      return;
    }
    this.current.isOpen = false;
    this.current.endReason = reason;
    this.current.updatedAt = (/* @__PURE__ */new Date()).toISOString();
    this.persistCurrent("close");
    this.resetRuntimeState();
  }
  updateContext(snapshot, now, monotonicNow) {
    const settings = settingsRepository.getSettings();
    if (process.platform === "darwin" && snapshot.browser?.isPrivate === true) {
      this.closeCurrentContext();
      return;
    }
    if (!this.current || this.current.activityState !== "app" || !settings.enableAppWindowContext && !settings.enableBrowserDomainTracking) {
      this.closeCurrentContext();
      return;
    }
    const key = contextKey(snapshot);
    if (this.currentContext?.key === key) {
      this.pendingContext = null;
      return;
    }
    if (this.currentContext) {
      if (this.pendingContext?.key !== key) {
        this.pendingContext = {
          key,
          snapshot,
          firstSeenAt: now
        };
        return;
      }
      if (now - this.pendingContext.firstSeenAt < 3e3) return;
      snapshot = this.pendingContext.snapshot;
      this.pendingContext = null;
    }
    const hadContext = Boolean(this.currentContext);
    this.closeCurrentContext();
    if (!this.current) return;
    const iso = new Date(now).toISOString();
    if (hadContext) this.current.contextSwitchCount += 1;
    this.currentContext = {
      id: crypto.randomUUID(),
      sessionId: this.current.id,
      key,
      windowId: settings.enableAppWindowContext ? snapshot.window?.id ?? null : null,
      windowTitle: settings.enableAppWindowContext ? snapshot.window?.title ?? null : null,
      documentHint: settings.enableAppWindowContext ? snapshot.window?.documentHint ?? null : null,
      browserName: settings.enableBrowserDomainTracking ? snapshot.browser?.name ?? null : null,
      browserDomain: settings.enableBrowserDomainTracking ? snapshot.browser?.domain ?? null : null,
      displayId: settings.enableAppWindowContext ? snapshot.window?.displayId ?? null : null,
      bounds: settings.enableAppWindowContext ? snapshot.window?.bounds ?? null : null,
      startedAt: iso,
      endedAt: iso,
      activeDurationMs: 0,
      lastMonotonicAt: monotonicNow
    };
    this.persistCurrent("context-start");
  }
  closeCurrentContext() {
    this.pendingContext = null;
    if (!this.currentContext) return;
    if (!this.current) {
      this.logDiagnostic("close", "APP_USAGE_ORPHAN_RUNTIME_DROPPED");
      this.currentContext = null;
      return;
    }
    this.persistCurrent("context-close");
    this.currentContext = null;
  }
  appendActivityDuration(state, startedAt, endedAt, durationMs, monotonicNow) {
    if (!this.current || this.current.activityState !== "app" || durationMs <= 0) return;
    if (this.currentActivity?.activityState === state) {
      this.currentActivity.endedAt = new Date(endedAt).toISOString();
      this.currentActivity.durationMs += durationMs;
      this.currentActivity.lastMonotonicAt = monotonicNow;
      return;
    }
    this.closeCurrentActivity();
    if (!this.current) return;
    const startedIso = new Date(startedAt).toISOString();
    this.currentActivity = {
      id: crypto.randomUUID(),
      sessionId: this.current.id,
      activityState: state,
      startedAt: startedIso,
      endedAt: new Date(endedAt).toISOString(),
      durationMs,
      lastMonotonicAt: monotonicNow
    };
    this.persistCurrent("activity-start");
  }
  closeCurrentActivity() {
    if (!this.currentActivity) return;
    if (!this.current) {
      this.logDiagnostic("close", "APP_USAGE_ORPHAN_RUNTIME_DROPPED");
      this.currentActivity = null;
      return;
    }
    this.persistCurrent("activity-close");
    this.currentActivity = null;
  }
  persistCurrent(operation = "persist") {
    if (!this.current) {
      if (this.currentContext || this.currentActivity) {
        this.logDiagnostic(operation, "APP_USAGE_ORPHAN_RUNTIME_DROPPED");
        this.resetRuntimeState();
      }
      return false;
    }
    if (this.databaseGeneration === null || this.current.databaseGeneration !== this.databaseGeneration || !isDatabaseGenerationCurrent(this.current.databaseGeneration)) {
      this.logDiagnostic(operation, "APP_USAGE_DATABASE_GENERATION_MISMATCH");
      this.resetRuntimeState();
      return false;
    }
    const {
      databaseGeneration,
      lastMonotonicAt: _lastMonotonicAt,
      activeStreakMs: _activeStreakMs,
      ...session
    } = this.current;
    const runtimeContext = this.currentContext;
    const runtimeActivity = this.currentActivity;
    const contextSegment = runtimeContext ? (() => {
      const {
        key: _key,
        lastMonotonicAt: _contextMonotonicAt,
        ...segment
      } = runtimeContext;
      return segment;
    })() : null;
    const activitySegment = runtimeActivity ? (() => {
      const {
        lastMonotonicAt: _activityMonotonicAt,
        ...segment
      } = runtimeActivity;
      return segment;
    })() : null;
    const result = appUsageRepository.persistSnapshot({
      session,
      contextSegment,
      activitySegment
    }, databaseGeneration);
    if (result.ok) {
      this.lastPersistedAt = (/* @__PURE__ */new Date()).toISOString();
      return true;
    }
    this.logPersistenceFailure(operation, result, Boolean(contextSegment), Boolean(activitySegment));
    if (result.code === "APPLICATION_MISSING" && this.current.activityState === "app") this.current.applicationId = null;
    if (result.code === "SESSION_ID_MISMATCH") {
      this.currentContext = null;
      this.currentActivity = null;
      this.pendingContext = null;
      this.logDiagnostic(operation, "APP_USAGE_ORPHAN_RUNTIME_DROPPED");
    }
    return false;
  }
  persistHeartbeat() {
    this.advanceCurrent(Date.now(), performance.now());
    this.persistCurrent();
    this.purgeExpiredContextIfNeeded();
  }
  persistClosedStateInterval(paused, endedAt, endReason) {
    if (endedAt <= paused.startedAt) return;
    if (!isDatabaseGenerationCurrent(paused.databaseGeneration)) {
      this.logDiagnostic("pause", "APP_USAGE_DATABASE_GENERATION_MISMATCH");
      return;
    }
    const startedIso = new Date(paused.startedAt).toISOString();
    const endedIso = new Date(endedAt).toISOString();
    const result = appUsageRepository.persistSnapshot({
      session: {
        id: crypto.randomUUID(),
        applicationId: null,
        activityState: paused.state,
        startedAt: startedIso,
        endedAt: endedIso,
        durationMs: endedAt - paused.startedAt,
        activeDurationMs: 0,
        idleDurationMs: 0,
        longestActiveDurationMs: 0,
        sampleCount: 1,
        contextSwitchCount: 0,
        startReason: paused.reason,
        endReason,
        detectionSource: "native-event",
        confidence: "high",
        isOpen: false,
        createdAt: startedIso,
        updatedAt: endedIso
      }
    }, paused.databaseGeneration);
    if (!result.ok) this.logPersistenceFailure("pause", result, false, false);
  }
  refreshDatabaseOwnership(operation) {
    const connection = getOpenDatabaseConnection();
    if (!connection) {
      this.logDiagnostic(operation, "APP_USAGE_DATABASE_UNAVAILABLE");
      this.resetRuntimeState();
      return false;
    }
    if (this.databaseGeneration === connection.generation) return true;
    this.logDiagnostic(operation, "APP_USAGE_DATABASE_GENERATION_MISMATCH");
    this.resetRuntimeState();
    this.databaseGeneration = connection.generation;
    return false;
  }
  resetRuntimeState() {
    this.current = null;
    this.currentContext = null;
    this.currentActivity = null;
    this.pendingContext = null;
    this.currentSnapshot = null;
  }
  logPersistenceFailure(operation, result, hasContextSegment, hasActivitySegment) {
    const diagnosticCode = result.code === "PARENT_MISSING" ? "APP_USAGE_PARENT_SESSION_MISSING" : result.code === "SESSION_ID_MISMATCH" ? "APP_USAGE_SESSION_ID_MISMATCH" : result.code === "DATABASE_GENERATION_MISMATCH" ? "APP_USAGE_DATABASE_GENERATION_MISMATCH" : result.code === "DATABASE_UNAVAILABLE" ? "APP_USAGE_DATABASE_UNAVAILABLE" : result.code === "APPLICATION_MISSING" ? "APP_USAGE_APPLICATION_MISSING" : result.code === "FOREIGN_KEY_FAILED" ? "APP_USAGE_FOREIGN_KEY_FAILED" : "APP_USAGE_TRANSACTION_ROLLED_BACK";
    console.warn("[AppUsage]", {
      operation,
      code: diagnosticCode,
      sqliteCode: result.sqliteCode ?? null,
      rolledBack: result.rolledBack,
      databaseGenerationMatch: this.databaseGeneration !== null && isDatabaseGenerationCurrent(this.databaseGeneration),
      hasParentSession: this.current !== null,
      hasContextSegment,
      hasActivitySegment
    });
  }
  logDiagnostic(operation, code, error) {
    console.warn("[AppUsage]", {
      operation,
      code,
      errorType: error instanceof Error ? error.name : error === undefined ? null : typeof error
    });
  }
  resetFailure() {
    this.failureStartedAt = null;
    this.consecutiveFailures = 0;
  }
  collectSessions(startedAt, endedAt) {
    if (this.current) this.advanceCurrent(Date.now(), performance.now());
    const rangeStart = Date.parse(startedAt);
    const rangeEnd = Math.min(Date.parse(endedAt), Date.now());
    if (!Number.isFinite(rangeStart) || !Number.isFinite(rangeEnd) || rangeEnd <= rangeStart) return [];
    const sessions = appUsageRepository.listByRange(new Date(rangeStart).toISOString(), new Date(rangeEnd).toISOString(), maxQueryLimit);
    if (this.current) {
      const live = runtimeToSession(this.current);
      const index = sessions.findIndex(session => session.id === live.id);
      if (index >= 0) sessions[index] = live;else sessions.push(live);
    }
    const mergedSessions = [];
    for (const session of sessions.sort((left, right) => left.startedAt.localeCompare(right.startedAt))) {
      const previous = mergedSessions.at(-1);
      if (previous && previous.detectionSource === "legacy-import" && session.detectionSource === "legacy-import" && previous.applicationId === session.applicationId && Date.parse(session.startedAt) - Date.parse(previous.endedAt) <= 250 && previous) {
        previous.endedAt = session.endedAt > previous.endedAt ? session.endedAt : previous.endedAt;
        previous.durationSec += session.durationSec;
        previous.activeDurationSec += session.activeDurationSec;
        previous.idleDurationSec += session.idleDurationSec;
        previous.longestActiveDurationSec = Math.max(previous.longestActiveDurationSec, session.longestActiveDurationSec);
        previous.sampleCount += session.sampleCount;
      } else mergedSessions.push({
        ...session
      });
    }
    const activityBySession = /* @__PURE__ */new Map();
    for (const segment of appUsageRepository.listActivitySegments(mergedSessions.map(session => session.id))) {
      const segments = activityBySession.get(segment.sessionId) ?? [];
      segments.push(segment);
      activityBySession.set(segment.sessionId, segments);
    }
    return mergedSessions.map(session => this.clipSession(session, rangeStart, rangeEnd, activityBySession.get(session.id))).filter(session => session !== null).sort((left, right) => left.startedAt.localeCompare(right.startedAt) || left.id.localeCompare(right.id));
  }
  clipSession(session, rangeStart, rangeEnd, activitySegments) {
    const originalStart = Date.parse(session.startedAt);
    const originalEnd = Date.parse(session.endedAt);
    if (!Number.isFinite(originalStart) || !Number.isFinite(originalEnd)) return null;
    const clippedStart = Math.max(originalStart, rangeStart);
    const clippedEnd = Math.min(originalEnd, rangeEnd);
    if (clippedEnd <= clippedStart) return null;
    const originalDuration = Math.max(1, originalEnd - originalStart);
    const ratio = (clippedEnd - clippedStart) / originalDuration;
    let activeDurationSec = Math.max(0, Math.round(session.activeDurationSec * ratio));
    let idleDurationSec = Math.max(0, Math.round(session.idleDurationSec * ratio));
    let longestActiveDurationSec = Math.max(0, Math.round(session.longestActiveDurationSec * ratio));
    if (activitySegments?.length) {
      let activeDurationMs = 0;
      let idleDurationMs = 0;
      let longestActiveDurationMs = 0;
      for (const segment of activitySegments) {
        const segmentStart = Date.parse(segment.startedAt);
        const segmentEnd = Date.parse(segment.endedAt);
        if (!Number.isFinite(segmentStart) || !Number.isFinite(segmentEnd) || segmentEnd <= segmentStart) continue;
        const overlapStart = Math.max(segmentStart, clippedStart);
        const overlapEnd = Math.min(segmentEnd, clippedEnd);
        if (overlapEnd <= overlapStart) continue;
        const overlapDurationMs = segment.durationMs * ((overlapEnd - overlapStart) / (segmentEnd - segmentStart));
        if (segment.activityState === "active") {
          activeDurationMs += overlapDurationMs;
          longestActiveDurationMs = Math.max(longestActiveDurationMs, overlapDurationMs);
        } else idleDurationMs += overlapDurationMs;
      }
      activeDurationSec = Math.max(0, Math.round(activeDurationMs / 1e3));
      idleDurationSec = Math.max(0, Math.round(idleDurationMs / 1e3));
      longestActiveDurationSec = Math.max(0, Math.round(longestActiveDurationMs / 1e3));
    }
    return {
      ...session,
      startedAt: new Date(clippedStart).toISOString(),
      endedAt: new Date(clippedEnd).toISOString(),
      durationSec: Math.max(0, Math.round((clippedEnd - clippedStart) / 1e3)),
      activeDurationSec,
      idleDurationSec,
      longestActiveDurationSec
    };
  }
  getEvidenceData(startedAt, endedAt) {
    const sessions = this.collectSessions(startedAt, endedAt);
    if (this.current) this.persistCurrent();
    const settings = settingsRepository.getSettings();
    return {
      sessions,
      contexts: settings.enableAppWindowContext || settings.enableBrowserDomainTracking ? appUsageRepository.listContextSegments(sessions.map(session => session.id)).map(context => ({
        ...context,
        windowId: settings.enableAppWindowContext ? context.windowId : null,
        windowTitle: settings.enableAppWindowContext ? context.windowTitle : null,
        documentHint: settings.enableAppWindowContext ? context.documentHint : null,
        displayId: settings.enableAppWindowContext ? context.displayId : null,
        bounds: settings.enableAppWindowContext ? context.bounds : null,
        browserName: settings.enableBrowserDomainTracking ? context.browserName : null,
        browserDomain: settings.enableBrowserDomainTracking ? context.browserDomain : null
      })) : []
    };
  }
  getFactData(startedAt, endedAt) {
    const {
      sessions,
      contexts
    } = this.getEvidenceData(startedAt, endedAt);
    return {
      sessions,
      contexts,
      summary: this.getSummary(startedAt, endedAt),
      overview: this.getOverview(startedAt, endedAt)
    };
  }
  listPage(startedAt, endedAt, limit = 50, cursor, applicationId, activityState) {
    const decodedCursor = decodeSessionCursor(cursor);
    const normalizedLimit = Math.min(100, Math.max(1, Math.trunc(limit)));
    const rangeStart = Date.parse(startedAt);
    const rangeEnd = Math.min(Date.parse(endedAt), Date.now());
    if (!Number.isFinite(rangeStart) || !Number.isFinite(rangeEnd) || rangeEnd <= rangeStart) return {
      items: [],
      nextCursor: null,
      hasMore: false
    };
    if (this.current) {
      this.advanceCurrent(Date.now(), performance.now());
      this.persistCurrent();
    }
    const rawSessions = appUsageRepository.listPageByRange({
      startedAt: new Date(rangeStart).toISOString(),
      endedAt: new Date(rangeEnd).toISOString(),
      limit: normalizedLimit + 1,
      cursor: decodedCursor,
      applicationId,
      activityState
    });
    const pageSessions = rawSessions.slice(0, normalizedLimit);
    const activityBySession = /* @__PURE__ */new Map();
    for (const segment of appUsageRepository.listActivitySegments(pageSessions.map(session => session.id))) {
      const segments = activityBySession.get(segment.sessionId) ?? [];
      segments.push(segment);
      activityBySession.set(segment.sessionId, segments);
    }
    const items = pageSessions.map(session => this.clipSession(session, rangeStart, rangeEnd, activityBySession.get(session.id))).filter(session => session !== null);
    const hasMore = rawSessions.length > normalizedLimit;
    const lastItem = pageSessions.at(-1);
    return {
      items,
      nextCursor: hasMore && lastItem ? encodeSessionCursor(lastItem) : null,
      hasMore
    };
  }
  getSummary(startedAt, endedAt) {
    const statisticalTimeline = this.collectSessions(startedAt, endedAt).filter(session => session.activityState !== "app" || session.durationSec >= 2 || session.sampleCount > 1);
    const sessions = statisticalTimeline.filter(session => session.activityState === "app");
    const summaries = /* @__PURE__ */new Map();
    for (const session of sessions) {
      if (!session.applicationId) continue;
      const existing = summaries.get(session.applicationId);
      if (!existing) summaries.set(session.applicationId, {
        applicationId: session.applicationId,
        appName: session.appName,
        rawName: session.rawName,
        totalDurationSec: session.activeDurationSec,
        activeDurationSec: session.activeDurationSec,
        idleDurationSec: session.idleDurationSec,
        sessionCount: 1,
        switchCount: 0,
        averageSessionDurationSec: session.activeDurationSec,
        longestSessionDurationSec: session.longestActiveDurationSec,
        firstUsedAt: session.startedAt,
        lastUsedAt: session.endedAt
      });else {
        existing.totalDurationSec += session.activeDurationSec;
        existing.activeDurationSec += session.activeDurationSec;
        existing.idleDurationSec += session.idleDurationSec;
        existing.sessionCount += 1;
        existing.longestSessionDurationSec = Math.max(existing.longestSessionDurationSec, session.longestActiveDurationSec);
        if (session.startedAt < existing.firstUsedAt) existing.firstUsedAt = session.startedAt;
        if (session.endedAt > existing.lastUsedAt) existing.lastUsedAt = session.endedAt;
      }
    }
    for (let index = 1; index < statisticalTimeline.length; index += 1) {
      const previous = statisticalTimeline[index - 1];
      const session = statisticalTimeline[index];
      if (previous?.activityState === "app" && session?.activityState === "app" && previous.applicationId && session.applicationId && previous.applicationId !== session.applicationId && previous.appName.trim().toLocaleLowerCase() !== session.appName.trim().toLocaleLowerCase()) {
        const summary = summaries.get(session.applicationId);
        if (summary) summary.switchCount += 1;
      }
    }
    for (const summary of summaries.values()) summary.averageSessionDurationSec = Math.round(summary.activeDurationSec / Math.max(1, summary.sessionCount));
    return mergeEquivalentAppUsageSummaries(Array.from(summaries.values()));
  }
  getOverview(startedAt, endedAt) {
    const summary = this.getSummary(startedAt, endedAt);
    const switchCount = summary.reduce((total, item) => total + item.switchCount, 0);
    const activeDurationSec = summary.reduce((total, item) => total + item.activeDurationSec, 0);
    const sessionCount = summary.reduce((total, item) => total + item.sessionCount, 0);
    const start = new Date(startedAt);
    const requestedEnd = new Date(endedAt);
    const end = new Date(Math.min(requestedEnd.getTime(), Date.now()));
    const startDay = Date.UTC(start.getFullYear(), start.getMonth(), start.getDate());
    const endDay = Date.UTC(end.getFullYear(), end.getMonth(), end.getDate());
    const elapsedDays = Number.isFinite(startDay) && Number.isFinite(endDay) && endDay >= startDay ? Math.floor((endDay - startDay) / 864e5) + 1 : 1;
    return {
      totalApps: summary.length,
      activeDurationSec,
      idleDurationSec: summary.reduce((total, item) => total + item.idleDurationSec, 0),
      sessionCount,
      switchCount,
      averageSessionDurationSec: Math.round(activeDurationSec / Math.max(1, sessionCount)),
      longestSessionDurationSec: summary.reduce((longest, item) => Math.max(longest, item.longestSessionDurationSec), 0),
      dailyAverageActiveDurationSec: Math.round(activeDurationSec / Math.max(1, elapsedDays))
    };
  }
  /** 桑基图用：各应用按时段拆分的时长，以及应用之间的切换流向；会话筛选与切换判定和 getSummary 一致 */
  getFlows(startedAt, endedAt) {
    const statisticalTimeline = this.collectSessions(startedAt, endedAt).filter(session => session.activityState !== "app" || session.durationSec >= 2 || session.sampleCount > 1);
    const appNames = /* @__PURE__ */new Map();
    const appKeyOf = session => {
      const key = session.appName.trim().toLocaleLowerCase();
      if (!appNames.has(key)) appNames.set(key, session.appName);
      return key;
    };
    const periodOfHour = hour => APP_USAGE_DAY_PERIODS.find(item => hour < item.endHour) ?? APP_USAGE_DAY_PERIODS[APP_USAGE_DAY_PERIODS.length - 1];
    const periodTotals = /* @__PURE__ */new Map();
    const addPeriodShare = (appKey, period, active, idle) => {
      const key = `${period}null${appKey}`;
      const total = periodTotals.get(key) ?? {
        appKey,
        period,
        active: 0,
        idle: 0
      };
      total.active += active;
      total.idle += idle;
      periodTotals.set(key, total);
    };
    for (const session of statisticalTimeline) {
      if (session.activityState !== "app" || !session.applicationId) continue;
      const appKey = appKeyOf(session);
      const sessionStart = Date.parse(session.startedAt);
      const sessionEnd = Date.parse(session.endedAt);
      if (sessionEnd <= sessionStart) {
        addPeriodShare(appKey, periodOfHour(new Date(sessionStart).getHours()).period, session.activeDurationSec, session.idleDurationSec);
        continue;
      }
      let cursor = sessionStart;
      while (cursor < sessionEnd) {
        const cursorDate = new Date(cursor);
        const {
          period,
          endHour
        } = periodOfHour(cursorDate.getHours());
        const periodEnd = new Date(cursorDate.getFullYear(), cursorDate.getMonth(), cursorDate.getDate(), endHour).getTime();
        const segmentEnd = Math.min(sessionEnd, periodEnd);
        const share = (segmentEnd - cursor) / (sessionEnd - sessionStart);
        addPeriodShare(appKey, period, session.activeDurationSec * share, session.idleDurationSec * share);
        cursor = segmentEnd;
      }
    }
    const switchTotals = /* @__PURE__ */new Map();
    for (let index = 1; index < statisticalTimeline.length; index += 1) {
      const previous = statisticalTimeline[index - 1];
      const session = statisticalTimeline[index];
      if (previous?.activityState === "app" && session?.activityState === "app" && previous.applicationId && session.applicationId && previous.applicationId !== session.applicationId && previous.appName.trim().toLocaleLowerCase() !== session.appName.trim().toLocaleLowerCase()) {
        const fromKey = appKeyOf(previous);
        const toKey = appKeyOf(session);
        const key = `${fromKey}null${toKey}`;
        const total = switchTotals.get(key) ?? {
          fromKey,
          toKey,
          count: 0
        };
        total.count += 1;
        switchTotals.set(key, total);
      }
    }
    return {
      periods: Array.from(periodTotals.values()).map(item => ({
        period: item.period,
        appName: appNames.get(item.appKey) ?? item.appKey,
        activeDurationSec: Math.round(item.active),
        idleDurationSec: Math.round(item.idle)
      })).filter(item => item.activeDurationSec > 0 || item.idleDurationSec > 0),
      switches: Array.from(switchTotals.values()).map(item => ({
        fromAppName: appNames.get(item.fromKey) ?? item.fromKey,
        toAppName: appNames.get(item.toKey) ?? item.toKey,
        count: item.count
      })).sort((left, right) => right.count - left.count)
    };
  }
  getDetail(applicationId, startedAt, endedAt) {
    const app = appUsageRepository.getApplication(applicationId);
    if (!app) return null;
    const timelineSessions = this.collectSessions(startedAt, endedAt);
    const allSessions = timelineSessions.filter(session => session.activityState === "app");
    const appDisplayKey = app.appName.trim().toLocaleLowerCase();
    const sessions = allSessions.filter(session => session.appName.trim().toLocaleLowerCase() === appDisplayKey);
    const dailyTotals = /* @__PURE__ */new Map();
    const hourlyActiveDurationSec = Array.from({
      length: 24
    }, () => 0);
    for (const session of sessions) {
      const sessionStart = Date.parse(session.startedAt);
      const sessionEnd = Date.parse(session.endedAt);
      const wallDuration = Math.max(1, sessionEnd - sessionStart);
      let cursor = sessionStart;
      while (cursor < sessionEnd) {
        const cursorDate = new Date(cursor);
        const nextHour = new Date(cursorDate.getFullYear(), cursorDate.getMonth(), cursorDate.getDate(), cursorDate.getHours() + 1).getTime();
        const segmentEnd = Math.min(sessionEnd, nextHour);
        const activeShare = session.activeDurationSec * ((segmentEnd - cursor) / wallDuration);
        hourlyActiveDurationSec[cursorDate.getHours()] += activeShare;
        const localDate = `${cursorDate.getFullYear()}-${String(cursorDate.getMonth() + 1).padStart(2, "0")}-${String(cursorDate.getDate()).padStart(2, "0")}`;
        dailyTotals.set(localDate, (dailyTotals.get(localDate) ?? 0) + activeShare);
        cursor = segmentEnd;
      }
    }
    for (let hour = 0; hour < hourlyActiveDurationSec.length; hour += 1) hourlyActiveDurationSec[hour] = Math.round(hourlyActiveDurationSec[hour]);
    const contexts = appUsageRepository.listContextSegments(sessions.map(session => session.id));
    const domainTotals = /* @__PURE__ */new Map();
    const contextTotals = /* @__PURE__ */new Map();
    const transitionTotals = /* @__PURE__ */new Map();
    for (const context of contexts) {
      const durationSec = Math.round(context.activeDurationMs / 1e3);
      if (context.browserDomain) domainTotals.set(context.browserDomain, (domainTotals.get(context.browserDomain) ?? 0) + durationSec);
      const title = context.documentHint || context.windowTitle;
      if (title) contextTotals.set(title, (contextTotals.get(title) ?? 0) + durationSec);
    }
    const sorted = map => Array.from(map.entries()).sort((left, right) => right[1] - left[1]).slice(0, 10);
    for (let index = 1; index < timelineSessions.length; index += 1) {
      const previous = timelineSessions[index - 1];
      const current = timelineSessions[index];
      if (!previous || !current || previous.activityState !== "app" || current.activityState !== "app" || previous.applicationId === current.applicationId || previous.appName.trim().toLocaleLowerCase() === current.appName.trim().toLocaleLowerCase()) continue;
      if (previous.applicationId === applicationId) transitionTotals.set(current.appName, (transitionTotals.get(current.appName) ?? 0) + 1);else if (current.applicationId === applicationId) transitionTotals.set(previous.appName, (transitionTotals.get(previous.appName) ?? 0) + 1);
    }
    return {
      ...app,
      dailyActiveDuration: Array.from(dailyTotals.entries()).sort((left, right) => left[0].localeCompare(right[0])).map(([date, durationSec]) => ({
        date,
        durationSec: Math.round(durationSec)
      })),
      hourlyActiveDurationSec,
      recentSessions: [...sessions].sort((left, right) => right.startedAt.localeCompare(left.startedAt)).slice(0, 20),
      commonDomains: sorted(domainTotals).map(([domain, durationSec]) => ({
        domain,
        durationSec
      })),
      commonContexts: sorted(contextTotals).map(([title, durationSec]) => ({
        title,
        durationSec
      })),
      frequentTransitions: sorted(transitionTotals).map(([appName, count]) => ({
        appName,
        count
      }))
    };
  }
  /** 把进行中的会话推进到当前时刻并写库，供直接按区间读库的统计（如作息条码）使用 */
  syncCurrentSession() {
    if (!this.current) return;
    this.advanceCurrent(Date.now(), performance.now());
    this.persistCurrent();
  }
  getRecentSegments(windowMs) {
    const now = Date.now();
    return this.collectSessions(new Date(now - windowMs).toISOString(), new Date(now).toISOString()).filter(session => session.activityState === "app" && session.activeDurationSec >= 5).slice(-10).map(session => ({
      appName: session.appName,
      durationSec: session.activeDurationSec
    }));
  }
  getSystemIdleSeconds() {
    try {
      return Math.max(0, powerMonitor.getSystemIdleTime());
    } catch {
      return 0;
    }
  }
  purgeExpiredContextIfNeeded() {
    if (Date.now() - this.lastContextPurgeAt < 864e5) return;
    const retentionDays = settingsRepository.getSettings().appUsageContextRetentionDays;
    appUsageRepository.purgeExpiredContext(retentionDays);
    activityEvidenceRepository.purgeContextBefore((/* @__PURE__ */new Date(Date.now() - retentionDays * 24 * 60 * 60 * 1e3)).toISOString());
    this.lastContextPurgeAt = Date.now();
  }
  startTimers() {
    this.stopTimers();
    this.detectTimer = setInterval(() => void this.detect(), detectIntervalMs);
    this.heartbeatTimer = setInterval(() => {
      try {
        this.persistHeartbeat();
      } catch (error) {
        this.logDiagnostic("persist", "APP_USAGE_HEARTBEAT_FAILED", error);
      }
    }, heartbeatIntervalMs);
  }
  stopTimers() {
    if (this.detectTimer) clearInterval(this.detectTimer);
    if (this.heartbeatTimer) clearInterval(this.heartbeatTimer);
    this.detectTimer = null;
    this.heartbeatTimer = null;
  }
};
var appUsageService = new AppUsageService();
async function checkAppUsagePermission() {
  const snapshot = await getFreshActiveContextSnapshot({
    includeWindowContext: false,
    includeBrowserDomain: false,
    includeAccessibilityEvents: false,
    includeWindowBounds: false,
    includeMouseHeatmap: false
  });
  return Boolean(snapshot?.app);
}
async function getAppUsageDiagnostics() {
  const snapshot = await getFreshActiveContextSnapshot(activeContextOptions(settingsRepository.getSettings()));
  const state = appUsageService.getDiagnosticsState();
  const permissionState = process.platform === "darwin" ? {
    accessibilityPermission: systemPreferences.isTrustedAccessibilityClient(false) ? "granted" : "denied",
    screenRecordingPermission: systemPreferences.getMediaAccessStatus("screen")
  } : {
    accessibilityPermission: "not-applicable",
    screenRecordingPermission: "not-applicable"
  };
  if (snapshot?.app) return {
    ok: true,
    platform: process.platform,
    foregroundApp: snapshot.app.displayName,
    checkedAt: (/* @__PURE__ */new Date()).toISOString(),
    nativeCollectorAvailable: snapshot.source === "native-query",
    ...permissionState,
    ...state
  };
  const failure = getLastForegroundAppDetectionFailure();
  return {
    ok: false,
    platform: process.platform,
    foregroundApp: null,
    code: failure?.code ?? "FOREGROUND_APP_UNAVAILABLE",
    message: failure?.message ?? "Foreground app detection is unavailable.",
    attempts: failure?.attempts ?? [],
    checkedAt: failure?.checkedAt ?? (/* @__PURE__ */new Date()).toISOString(),
    nativeCollectorAvailable: false,
    ...permissionState,
    ...state
  };
}
var growth_event_catalog_default = {
  schemaVersion: 1,
  modules: {
    "work_record": "工作记录",
    "report": "报告",
    "bot": "超能伙伴",
    "navigation": "页面访问",
    "todo": "待办",
    "settings": "设置",
    "insight": "工作洞察",
    "account": "账户与帮助",
    "tools": "工具箱"
  },
  events: /* @__PURE__ */JSON.parse("{\"record_create_success\":{\"label\":\"工作记录创建成功\",\"module\":\"work_record\",\"props\":{\"record_id\":{\"type\":\"identifier\",\"maxLength\":160},\"entity_id\":{\"type\":\"identifier\",\"maxLength\":160},\"business_date\":{\"type\":\"date\"},\"source\":{\"type\":\"enum\",\"values\":[\"screenshot\",\"enter_key\",\"shortcut\",\"manual\",\"import\",\"upload\",\"text\",\"audio\",\"recording_box\",\"agent\",\"summary\"]},\"record_count_delta\":{\"type\":\"integer\",\"min\":0,\"max\":10000},\"is_import\":{\"type\":\"boolean\"},\"duration_bucket\":{\"type\":\"enum\",\"values\":[\"0_15m\",\"15_30m\",\"30_60m\",\"60m_plus\"]},\"output_nonempty\":{\"type\":\"boolean\"}}},\"record_delete\":{\"label\":\"工作记录删除成功\",\"module\":\"work_record\",\"props\":{\"record_id\":{\"type\":\"identifier\",\"maxLength\":160},\"entity_id\":{\"type\":\"identifier\",\"maxLength\":160},\"business_date\":{\"type\":\"date\"},\"source\":{\"type\":\"enum\",\"values\":[\"screenshot\",\"enter_key\",\"shortcut\",\"manual\",\"import\",\"upload\",\"text\",\"audio\",\"recording_box\",\"agent\",\"summary\"]},\"is_import\":{\"type\":\"boolean\"}}},\"report_page_view\":{\"label\":\"查看报告生成页\",\"module\":\"report\",\"props\":{\"entry\":{\"type\":\"enum\",\"values\":[\"timeline\",\"sidebar\",\"generate_report\",\"history\",\"desktop\",\"schedule\",\"collaboration\",\"wechat\",\"conversation\",\"contact-panel\",\"bot\",\"api\",\"unknown\"]},\"has_records\":{\"type\":\"boolean\"},\"report_count_bucket\":{\"type\":\"enum\",\"values\":[\"0\",\"1_3\",\"4_10\",\"11_30\",\"31_plus\"]}}},\"report_type_select\":{\"label\":\"选择报告类型\",\"module\":\"report\",\"props\":{\"report_type\":{\"type\":\"enum\",\"values\":[\"daily\",\"weekly\",\"monthly\"]}}},\"report_template_select\":{\"label\":\"选择报告模板\",\"module\":\"report\",\"props\":{\"template_id\":{\"type\":\"identifier\",\"maxLength\":160},\"template_source\":{\"type\":\"enum\",\"values\":[\"default\",\"selected\",\"cloud\",\"custom\",\"template_market\"]}}},\"report_generate_start\":{\"label\":\"开始生成报告\",\"module\":\"report\",\"props\":{\"report_id\":{\"type\":\"identifier\",\"maxLength\":160},\"report_request_id\":{\"type\":\"identifier\",\"maxLength\":160},\"report_type\":{\"type\":\"enum\",\"values\":[\"daily\",\"weekly\",\"monthly\"]},\"business_date\":{\"type\":\"date\"},\"entity_id\":{\"type\":\"identifier\",\"maxLength\":160},\"generation_mode\":{\"type\":\"enum\",\"values\":[\"api\",\"web_account\",\"local\"]},\"provider_category\":{\"type\":\"enum\",\"values\":[\"api\",\"web_account\",\"local\",\"chatgpt\",\"deepseek\",\"platform\",\"custom_api\",\"connected_account\",\"unknown\"]},\"record_count_bucket\":{\"type\":\"enum\",\"values\":[\"0\",\"1_3\",\"4_10\",\"11_30\",\"31_plus\"]},\"template_source\":{\"type\":\"enum\",\"values\":[\"default\",\"selected\",\"cloud\",\"custom\",\"template_market\"]},\"has_activity_facts\":{\"type\":\"boolean\"}}},\"report_generate_success\":{\"label\":\"报告生成并保存成功\",\"module\":\"report\",\"props\":{\"report_id\":{\"type\":\"identifier\",\"maxLength\":160},\"report_request_id\":{\"type\":\"identifier\",\"maxLength\":160},\"report_type\":{\"type\":\"enum\",\"values\":[\"daily\",\"weekly\",\"monthly\"]},\"business_date\":{\"type\":\"date\"},\"entity_id\":{\"type\":\"identifier\",\"maxLength\":160},\"duration_ms\":{\"type\":\"integer\",\"min\":0,\"max\":604800000},\"provider_category\":{\"type\":\"enum\",\"values\":[\"api\",\"web_account\",\"local\",\"chatgpt\",\"deepseek\",\"platform\",\"custom_api\",\"connected_account\",\"unknown\"]},\"output_length_bucket\":{\"type\":\"enum\",\"values\":[\"0_499\",\"500_1499\",\"1500_2999\",\"3000_plus\"]},\"output_nonempty\":{\"type\":\"boolean\"},\"record_count\":{\"type\":\"integer\",\"min\":0,\"max\":10000000},\"period_end_date\":{\"type\":\"date\"}}},\"report_generate_fail\":{\"label\":\"报告生成失败\",\"module\":\"report\",\"props\":{\"report_id\":{\"type\":\"identifier\",\"maxLength\":160},\"report_request_id\":{\"type\":\"identifier\",\"maxLength\":160},\"report_type\":{\"type\":\"enum\",\"values\":[\"daily\",\"weekly\",\"monthly\"]},\"business_date\":{\"type\":\"date\"},\"entity_id\":{\"type\":\"identifier\",\"maxLength\":160},\"duration_ms\":{\"type\":\"integer\",\"min\":0,\"max\":604800000},\"error_code\":{\"type\":\"enum\",\"values\":[\"network_timeout\",\"auth_expired\",\"quota_exhausted\",\"model_empty_response\",\"model_rate_limit\",\"local_model_unavailable\",\"save_failed\",\"unknown\"]},\"stage\":{\"type\":\"enum\",\"values\":[\"unknown\",\"generation\",\"login\",\"save\",\"automation\",\"attachment\",\"attachment_prepare\",\"attachment_upload\",\"upload\",\"prepare\",\"request\",\"response\",\"stream\",\"parse\",\"persist\",\"api_request\",\"api_stream\",\"api_response\",\"web_account\",\"processing\",\"model_config_fetched\",\"streaming\",\"create-context\",\"prepare-upload\",\"send-message\"]}}},\"report_generate_cancel\":{\"label\":\"取消报告生成\",\"module\":\"report\",\"props\":{\"report_id\":{\"type\":\"identifier\",\"maxLength\":160},\"report_request_id\":{\"type\":\"identifier\",\"maxLength\":160},\"report_type\":{\"type\":\"enum\",\"values\":[\"daily\",\"weekly\",\"monthly\"]},\"business_date\":{\"type\":\"date\"},\"entity_id\":{\"type\":\"identifier\",\"maxLength\":160},\"stage\":{\"type\":\"enum\",\"values\":[\"unknown\",\"generation\",\"login\",\"save\",\"automation\",\"attachment\",\"attachment_prepare\",\"attachment_upload\",\"upload\",\"prepare\",\"request\",\"response\",\"stream\",\"parse\",\"persist\",\"api_request\",\"api_stream\",\"api_response\",\"web_account\",\"processing\",\"model_config_fetched\",\"streaming\",\"create-context\",\"prepare-upload\",\"send-message\"]}}},\"report_edit_save\":{\"label\":\"报告编辑保存成功\",\"module\":\"report\",\"props\":{\"report_id\":{\"type\":\"identifier\",\"maxLength\":160},\"report_request_id\":{\"type\":\"identifier\",\"maxLength\":160},\"report_type\":{\"type\":\"enum\",\"values\":[\"daily\",\"weekly\",\"monthly\"]},\"business_date\":{\"type\":\"date\"},\"entity_id\":{\"type\":\"identifier\",\"maxLength\":160},\"report_id_hash\":{\"type\":\"identifier\",\"maxLength\":160},\"edit_duration_bucket\":{\"type\":\"enum\",\"values\":[\"unknown\",\"0_1m\",\"1_5m\",\"5_15m\",\"15m_plus\"]},\"output_nonempty\":{\"type\":\"boolean\"},\"content_changed\":{\"type\":\"boolean\"}}},\"report_export_success\":{\"label\":\"报告导出成功\",\"module\":\"report\",\"props\":{\"report_id\":{\"type\":\"identifier\",\"maxLength\":160},\"report_request_id\":{\"type\":\"identifier\",\"maxLength\":160},\"report_type\":{\"type\":\"enum\",\"values\":[\"daily\",\"weekly\",\"monthly\"]},\"business_date\":{\"type\":\"date\"},\"entity_id\":{\"type\":\"identifier\",\"maxLength\":160},\"format\":{\"type\":\"enum\",\"values\":[\"txt\",\"md\",\"markdown\",\"pdf\",\"word\",\"docx\",\"html\"]},\"entry\":{\"type\":\"enum\",\"values\":[\"timeline\",\"sidebar\",\"generate_report\",\"history\",\"desktop\",\"schedule\",\"collaboration\",\"wechat\",\"conversation\",\"contact-panel\",\"bot\",\"api\",\"unknown\"]},\"valid_report\":{\"type\":\"boolean\"},\"output_nonempty\":{\"type\":\"boolean\"}}},\"report_copy_success\":{\"label\":\"报告复制成功\",\"module\":\"report\",\"props\":{\"report_id\":{\"type\":\"identifier\",\"maxLength\":160},\"report_request_id\":{\"type\":\"identifier\",\"maxLength\":160},\"report_type\":{\"type\":\"enum\",\"values\":[\"daily\",\"weekly\",\"monthly\"]},\"business_date\":{\"type\":\"date\"},\"entity_id\":{\"type\":\"identifier\",\"maxLength\":160},\"entry\":{\"type\":\"enum\",\"values\":[\"timeline\",\"sidebar\",\"generate_report\",\"history\",\"desktop\",\"schedule\",\"collaboration\",\"wechat\",\"conversation\",\"contact-panel\",\"bot\",\"api\",\"unknown\"]}}},\"bot_message_accepted\":{\"label\":\"Bot 接受任务\",\"module\":\"bot\",\"props\":{\"bot_request_id\":{\"type\":\"identifier\",\"maxLength\":160},\"task_id\":{\"type\":\"identifier\",\"maxLength\":160},\"conversation_id\":{\"type\":\"identifier\",\"maxLength\":160},\"bot_id\":{\"type\":\"identifier\",\"maxLength\":160},\"entity_id\":{\"type\":\"identifier\",\"maxLength\":160},\"entry\":{\"type\":\"enum\",\"values\":[\"timeline\",\"sidebar\",\"generate_report\",\"history\",\"desktop\",\"schedule\",\"collaboration\",\"wechat\",\"conversation\",\"contact-panel\",\"bot\",\"api\",\"unknown\"]},\"measurement_version\":{\"type\":\"integer\",\"min\":0,\"max\":100},\"conversation_type\":{\"type\":\"enum\",\"values\":[\"direct\",\"group\"]},\"role_source\":{\"type\":\"enum\",\"values\":[\"builtin\",\"custom\",\"group\",\"shared\"]},\"has_text\":{\"type\":\"boolean\"},\"has_attachment\":{\"type\":\"boolean\"},\"conversation_kind\":{\"type\":\"enum\",\"values\":[\"direct\",\"group\"]},\"trigger_source\":{\"type\":\"enum\",\"values\":[\"user_message\",\"scheduled_task\",\"bot_collaboration\"]},\"parent_task_id\":{\"type\":\"identifier\",\"maxLength\":160},\"model_source\":{\"type\":\"enum\",\"values\":[\"platform\",\"custom_api\",\"connected_account\",\"mixed\",\"unknown\"]}}},\"bot_task_success_visible\":{\"label\":\"Bot 成功结果可见\",\"module\":\"bot\",\"props\":{\"bot_request_id\":{\"type\":\"identifier\",\"maxLength\":160},\"task_id\":{\"type\":\"identifier\",\"maxLength\":160},\"conversation_id\":{\"type\":\"identifier\",\"maxLength\":160},\"bot_id\":{\"type\":\"identifier\",\"maxLength\":160},\"entity_id\":{\"type\":\"identifier\",\"maxLength\":160},\"entry\":{\"type\":\"enum\",\"values\":[\"timeline\",\"sidebar\",\"generate_report\",\"history\",\"desktop\",\"schedule\",\"collaboration\",\"wechat\",\"conversation\",\"contact-panel\",\"bot\",\"api\",\"unknown\"]}}},\"bot_task_failed\":{\"label\":\"Bot 任务失败\",\"module\":\"bot\",\"props\":{\"bot_request_id\":{\"type\":\"identifier\",\"maxLength\":160},\"task_id\":{\"type\":\"identifier\",\"maxLength\":160},\"conversation_id\":{\"type\":\"identifier\",\"maxLength\":160},\"bot_id\":{\"type\":\"identifier\",\"maxLength\":160},\"entity_id\":{\"type\":\"identifier\",\"maxLength\":160},\"entry\":{\"type\":\"enum\",\"values\":[\"timeline\",\"sidebar\",\"generate_report\",\"history\",\"desktop\",\"schedule\",\"collaboration\",\"wechat\",\"conversation\",\"contact-panel\",\"bot\",\"api\",\"unknown\"]},\"error_code\":{\"type\":\"enum\",\"values\":[\"UNCLASSIFIED\",\"USER_ABORTED\",\"MODEL_UNCONFIGURED\",\"INSUFFICIENT_CREDITS\",\"PERMISSION_DENIED\",\"none\",\"user_cancelled\",\"insufficient_credits\",\"model_unconfigured\",\"credential_missing\",\"authentication\",\"permission_denied\",\"rate_limit\",\"timeout\",\"network\",\"model_unavailable\",\"invalid_input\",\"storage\",\"empty_response\",\"unknown\"]}}},\"bot_task_aborted\":{\"label\":\"Bot 任务取消\",\"module\":\"bot\",\"props\":{\"bot_request_id\":{\"type\":\"identifier\",\"maxLength\":160},\"task_id\":{\"type\":\"identifier\",\"maxLength\":160},\"conversation_id\":{\"type\":\"identifier\",\"maxLength\":160},\"bot_id\":{\"type\":\"identifier\",\"maxLength\":160},\"entity_id\":{\"type\":\"identifier\",\"maxLength\":160},\"entry\":{\"type\":\"enum\",\"values\":[\"timeline\",\"sidebar\",\"generate_report\",\"history\",\"desktop\",\"schedule\",\"collaboration\",\"wechat\",\"conversation\",\"contact-panel\",\"bot\",\"api\",\"unknown\"]},\"error_code\":{\"type\":\"enum\",\"values\":[\"UNCLASSIFIED\",\"USER_ABORTED\",\"MODEL_UNCONFIGURED\",\"INSUFFICIENT_CREDITS\",\"PERMISSION_DENIED\",\"none\",\"user_cancelled\",\"insufficient_credits\",\"model_unconfigured\",\"credential_missing\",\"authentication\",\"permission_denied\",\"rate_limit\",\"timeout\",\"network\",\"model_unavailable\",\"invalid_input\",\"storage\",\"empty_response\",\"unknown\"]}}},\"bot_group_created\":{\"label\":\"Bot 群组创建成功\",\"module\":\"bot\",\"props\":{\"entry\":{\"type\":\"enum\",\"values\":[\"timeline\",\"sidebar\",\"generate_report\",\"history\",\"desktop\",\"schedule\",\"collaboration\",\"wechat\",\"conversation\",\"contact-panel\",\"bot\",\"api\",\"unknown\"]},\"conversation_id\":{\"type\":\"identifier\",\"maxLength\":160},\"entity_id\":{\"type\":\"identifier\",\"maxLength\":160}}},\"bot_custom_role_created\":{\"label\":\"自定义 Bot 创建成功\",\"module\":\"bot\",\"props\":{\"entry\":{\"type\":\"enum\",\"values\":[\"timeline\",\"sidebar\",\"generate_report\",\"history\",\"desktop\",\"schedule\",\"collaboration\",\"wechat\",\"conversation\",\"contact-panel\",\"bot\",\"api\",\"unknown\"]},\"bot_id\":{\"type\":\"identifier\",\"maxLength\":160},\"entity_id\":{\"type\":\"identifier\",\"maxLength\":160},\"role_source\":{\"type\":\"enum\",\"values\":[\"custom\",\"shared\"]}}},\"page_view\":{\"label\":\"查看功能页面\",\"module\":\"navigation\",\"props\":{\"pageId\":{\"type\":\"enum\",\"values\":[\"today-work\",\"todo\",\"generate-report\",\"timeline\",\"heat-map\",\"app-usage\",\"history\",\"lobster\",\"xiaohei-bot\",\"toolbox\",\"subscribe\",\"invite\",\"badges\",\"privacy\",\"settings\",\"profile\"]}},\"requiredProps\":[\"pageId\"]},\"todo_create_success\":{\"label\":\"待办创建成功\",\"module\":\"todo\",\"props\":{\"todo_id\":{\"type\":\"identifier\",\"maxLength\":160},\"entity_id\":{\"type\":\"identifier\",\"maxLength\":160},\"business_date\":{\"type\":\"date\"},\"source\":{\"type\":\"enum\",\"values\":[\"desktop\",\"web\",\"bot\",\"api\",\"timeline_extract\"]},\"is_recurring\":{\"type\":\"boolean\"},\"occurrence_id\":{\"type\":\"identifier\",\"maxLength\":160},\"is_own\":{\"type\":\"boolean\"},\"is_creator\":{\"type\":\"boolean\"},\"output_nonempty\":{\"type\":\"boolean\"},\"has_due_date\":{\"type\":\"boolean\"},\"has_project\":{\"type\":\"boolean\"},\"has_label\":{\"type\":\"boolean\"},\"subtask_count\":{\"type\":\"integer\",\"min\":0,\"max\":10000000},\"has_recurrence\":{\"type\":\"boolean\"},\"is_valid\":{\"type\":\"boolean\"}},\"legacyTelemetry\":false,\"serverOnly\":true},\"todo_complete_success\":{\"label\":\"待办完成成功\",\"module\":\"todo\",\"props\":{\"todo_id\":{\"type\":\"identifier\",\"maxLength\":160},\"entity_id\":{\"type\":\"identifier\",\"maxLength\":160},\"business_date\":{\"type\":\"date\"},\"source\":{\"type\":\"enum\",\"values\":[\"desktop\",\"web\",\"bot\",\"api\"]},\"is_recurring\":{\"type\":\"boolean\"},\"occurrence_id\":{\"type\":\"identifier\",\"maxLength\":160},\"is_own\":{\"type\":\"boolean\"},\"is_creator\":{\"type\":\"boolean\"},\"output_nonempty\":{\"type\":\"boolean\"},\"server_transition\":{\"type\":\"boolean\"}},\"legacyTelemetry\":false,\"serverOnly\":true},\"bot_task_finished\":{\"label\":\"Bot 任务结束\",\"module\":\"bot\",\"props\":{\"task_id\":{\"type\":\"identifier\",\"maxLength\":160},\"bot_request_id\":{\"type\":\"identifier\",\"maxLength\":160},\"conversation_id\":{\"type\":\"identifier\",\"maxLength\":160},\"parent_task_id\":{\"type\":\"identifier\",\"maxLength\":160},\"entity_id\":{\"type\":\"identifier\",\"maxLength\":160},\"conversation_kind\":{\"type\":\"enum\",\"values\":[\"direct\",\"group\"]},\"trigger_source\":{\"type\":\"enum\",\"values\":[\"user_message\",\"scheduled_task\",\"bot_collaboration\"]},\"model_source\":{\"type\":\"enum\",\"values\":[\"platform\",\"custom_api\",\"connected_account\",\"mixed\",\"unknown\"]},\"status\":{\"type\":\"enum\",\"values\":[\"success\",\"failed\",\"cancelled\",\"interrupted\",\"needs_confirmation\",\"no_reply\"]},\"error_category\":{\"type\":\"enum\",\"values\":[\"none\",\"model_unconfigured\",\"credential_missing\",\"authentication\",\"insufficient_credits\",\"permission_denied\",\"rate_limit\",\"network\",\"timeout\",\"model_unavailable\",\"invalid_input\",\"storage\",\"user_cancelled\",\"process_interrupted\",\"empty_response\",\"unknown\"]},\"queue_ms\":{\"type\":\"integer\",\"min\":0,\"max\":2592000000},\"execution_ms\":{\"type\":\"integer\",\"min\":0,\"max\":2592000000},\"total_ms\":{\"type\":\"integer\",\"min\":0,\"max\":2592000000},\"participant_count\":{\"type\":\"integer\",\"min\":0,\"max\":100000},\"handoff\":{\"type\":\"boolean\"},\"requires_confirmation\":{\"type\":\"boolean\"},\"accepted\":{\"type\":\"boolean\"},\"started\":{\"type\":\"boolean\"}}},\"record_update_success\":{\"label\":\"文本记录更新成功\",\"module\":\"work_record\",\"props\":{\"record_id\":{\"type\":\"identifier\",\"maxLength\":160},\"source\":{\"type\":\"enum\",\"values\":[\"text\",\"manual\"]},\"output_nonempty\":{\"type\":\"boolean\"}},\"legacyTelemetry\":false},\"timeline_query_success\":{\"label\":\"时间线查询成功\",\"module\":\"work_record\",\"props\":{\"query_kind\":{\"type\":\"enum\",\"values\":[\"date\",\"source\"]},\"business_date\":{\"type\":\"date\"},\"source\":{\"type\":\"enum\",\"values\":[\"screenshot\",\"enter_key\",\"shortcut\",\"manual\",\"import\",\"upload\",\"text\",\"audio\",\"recording_box\",\"agent\",\"summary\"]},\"result_count\":{\"type\":\"integer\",\"min\":0,\"max\":10000000}},\"legacyTelemetry\":false},\"timeline_detail_view\":{\"label\":\"时间线内容加载\",\"module\":\"work_record\",\"props\":{\"record_id\":{\"type\":\"identifier\",\"maxLength\":160},\"source\":{\"type\":\"enum\",\"values\":[\"screenshot\",\"enter_key\",\"shortcut\",\"manual\",\"import\",\"upload\",\"text\",\"audio\",\"recording_box\",\"agent\",\"summary\"]},\"view_kind\":{\"type\":\"enum\",\"values\":[\"expanded\",\"summary\"]},\"output_nonempty\":{\"type\":\"boolean\"},\"interaction\":{\"type\":\"enum\",\"values\":[\"explicit_open\"]}},\"legacyTelemetry\":false},\"timeline_copy_success\":{\"label\":\"时间线日志复制成功\",\"module\":\"work_record\",\"props\":{\"record_count\":{\"type\":\"integer\",\"min\":0,\"max\":10000000},\"output_nonempty\":{\"type\":\"boolean\"}},\"legacyTelemetry\":false},\"timeline_export_success\":{\"label\":\"时间线数据导出成功\",\"module\":\"work_record\",\"props\":{\"record_count\":{\"type\":\"integer\",\"min\":0,\"max\":10000000},\"format\":{\"type\":\"enum\",\"values\":[\"json\",\"txt\",\"simple-txt\"]}},\"legacyTelemetry\":false},\"audio_transcription_success\":{\"label\":\"音频转写成功\",\"module\":\"work_record\",\"props\":{\"output_nonempty\":{\"type\":\"boolean\"}},\"legacyTelemetry\":false},\"screen_capture_success\":{\"label\":\"手动屏幕识别成功\",\"module\":\"work_record\",\"props\":{\"record_id\":{\"type\":\"identifier\",\"maxLength\":160},\"trigger\":{\"type\":\"enum\",\"values\":[\"manual\"]},\"output_nonempty\":{\"type\":\"boolean\"}},\"legacyTelemetry\":false},\"report_detail_view\":{\"label\":\"历史报告正文加载\",\"module\":\"report\",\"props\":{\"report_id\":{\"type\":\"identifier\",\"maxLength\":160},\"report_type\":{\"type\":\"enum\",\"values\":[\"daily\",\"weekly\",\"monthly\"]},\"output_nonempty\":{\"type\":\"boolean\"}},\"legacyTelemetry\":false},\"report_range_applied\":{\"label\":\"报告日期范围应用\",\"module\":\"report\",\"props\":{\"start_date\":{\"type\":\"date\"},\"end_date\":{\"type\":\"date\"}},\"legacyTelemetry\":false},\"report_template_applied\":{\"label\":\"报告模板应用\",\"module\":\"report\",\"props\":{\"template_id\":{\"type\":\"identifier\",\"maxLength\":160},\"output_nonempty\":{\"type\":\"boolean\"}},\"legacyTelemetry\":false},\"report_template_created\":{\"label\":\"自定义报告模板保存成功\",\"module\":\"report\",\"props\":{\"template_id\":{\"type\":\"identifier\",\"maxLength\":160},\"output_nonempty\":{\"type\":\"boolean\"}},\"legacyTelemetry\":false},\"report_instruction_applied\":{\"label\":\"报告指令应用\",\"module\":\"report\",\"props\":{\"output_nonempty\":{\"type\":\"boolean\"}},\"legacyTelemetry\":false},\"report_market_preview_loaded\":{\"label\":\"市场模板效果预览加载\",\"module\":\"report\",\"props\":{\"template_id\":{\"type\":\"identifier\",\"maxLength\":160},\"output_nonempty\":{\"type\":\"boolean\"},\"interaction\":{\"type\":\"enum\",\"values\":[\"explicit_open\"]}},\"legacyTelemetry\":false},\"report_query_success\":{\"label\":\"历史报告查询成功\",\"module\":\"report\",\"props\":{\"query_kind\":{\"type\":\"enum\",\"values\":[\"keyword\",\"type\"]},\"report_type\":{\"type\":\"enum\",\"values\":[\"daily\",\"weekly\",\"monthly\"]},\"result_count\":{\"type\":\"integer\",\"min\":0,\"max\":10000000}},\"legacyTelemetry\":false},\"report_title_updated\":{\"label\":\"报告标题更新成功\",\"module\":\"report\",\"props\":{\"report_id\":{\"type\":\"identifier\",\"maxLength\":160},\"output_nonempty\":{\"type\":\"boolean\"}},\"legacyTelemetry\":false},\"report_full_copy_success\":{\"label\":\"有效报告全文复制成功\",\"module\":\"report\",\"props\":{\"report_id\":{\"type\":\"identifier\",\"maxLength\":160},\"output_nonempty\":{\"type\":\"boolean\"}},\"legacyTelemetry\":false},\"report_visual_saved\":{\"label\":\"可视化HTML文件保存成功\",\"module\":\"report\",\"props\":{\"output_nonempty\":{\"type\":\"boolean\"}},\"legacyTelemetry\":false},\"todo_update_success\":{\"label\":\"待办更新成功\",\"module\":\"todo\",\"props\":{\"todo_id\":{\"type\":\"identifier\",\"maxLength\":160},\"occurrence_id\":{\"type\":\"identifier\",\"maxLength\":160},\"is_own\":{\"type\":\"boolean\"},\"is_creator\":{\"type\":\"boolean\"},\"output_nonempty\":{\"type\":\"boolean\"},\"is_recurring\":{\"type\":\"boolean\"},\"source\":{\"type\":\"enum\",\"values\":[\"desktop\",\"web\",\"bot\",\"api\"]},\"due_date_changed\":{\"type\":\"boolean\"},\"priority_changed\":{\"type\":\"boolean\"},\"project_changed\":{\"type\":\"boolean\"},\"label_changed\":{\"type\":\"boolean\"},\"subtask_added\":{\"type\":\"boolean\"},\"recurrence_changed\":{\"type\":\"boolean\"},\"archived_completed\":{\"type\":\"boolean\"},\"restored\":{\"type\":\"boolean\"}},\"legacyTelemetry\":false,\"serverOnly\":true},\"todo_attachment_added\":{\"label\":\"待办附件保存成功\",\"module\":\"todo\",\"props\":{\"todo_id\":{\"type\":\"identifier\",\"maxLength\":160},\"occurrence_id\":{\"type\":\"identifier\",\"maxLength\":160},\"is_own\":{\"type\":\"boolean\"},\"is_creator\":{\"type\":\"boolean\"},\"output_nonempty\":{\"type\":\"boolean\"},\"is_recurring\":{\"type\":\"boolean\"},\"source\":{\"type\":\"enum\",\"values\":[\"desktop\",\"web\",\"bot\",\"api\"]},\"attachment_id\":{\"type\":\"identifier\",\"maxLength\":160}},\"legacyTelemetry\":false},\"todo_query_success\":{\"label\":\"待办查询成功\",\"module\":\"todo\",\"props\":{\"query_kind\":{\"type\":\"enum\",\"values\":[\"own_unfinished\",\"due_date_sort\"]},\"result_count\":{\"type\":\"integer\",\"min\":0,\"max\":10000000}},\"legacyTelemetry\":false},\"todo_view_loaded\":{\"label\":\"待办视图加载\",\"module\":\"todo\",\"props\":{\"view\":{\"type\":\"enum\",\"values\":[\"board\",\"gantt\"]},\"result_count\":{\"type\":\"integer\",\"min\":0,\"max\":10000000}},\"legacyTelemetry\":false},\"todo_assignee_viewed\":{\"label\":\"待办负责人信息加载\",\"module\":\"todo\",\"props\":{\"todo_id\":{\"type\":\"identifier\",\"maxLength\":160},\"interaction\":{\"type\":\"enum\",\"values\":[\"explicit_open\"]}},\"legacyTelemetry\":false},\"todo_floating_viewed\":{\"label\":\"桌面待办浮窗加载\",\"module\":\"todo\",\"props\":{\"view\":{\"type\":\"enum\",\"values\":[\"ball\"]},\"interaction\":{\"type\":\"enum\",\"values\":[\"explicit_open\"]}},\"legacyTelemetry\":false},\"settings_action_success\":{\"label\":\"设置操作成功\",\"module\":\"settings\",\"props\":{\"action\":{\"type\":\"enum\",\"values\":[\"appearance_changed\",\"language_changed\",\"work_context_saved\",\"excluded_apps_saved\",\"recording_schedule_saved\",\"screenshot_interval_saved\",\"category_created\",\"backup_exported\",\"keyboard_sound_previewed\",\"wooden_fish_changed\"]},\"entity_id\":{\"type\":\"identifier\",\"maxLength\":160}},\"requiredProps\":[\"action\"],\"legacyTelemetry\":false},\"settings_view_loaded\":{\"label\":\"设置内容加载成功\",\"module\":\"settings\",\"props\":{\"panel\":{\"type\":\"enum\",\"values\":[\"privacy\",\"recording_status\",\"enter_record\",\"capture_retention\",\"data_import\",\"app_retention\",\"token_usage\",\"model_connection\",\"app_lock\",\"agent_integration\",\"scheduled_upload_preview\",\"client_logs\",\"version\",\"report_automation\",\"todo_automation\"]},\"entity_id\":{\"type\":\"identifier\",\"maxLength\":160},\"interaction\":{\"type\":\"enum\",\"values\":[\"explicit_open\"]}},\"requiredProps\":[\"panel\"],\"legacyTelemetry\":false},\"insight_action_success\":{\"label\":\"工作洞察选项更新成功\",\"module\":\"insight\",\"props\":{\"action\":{\"type\":\"enum\",\"values\":[\"previous_days_changed\"]},\"entity_id\":{\"type\":\"identifier\",\"maxLength\":160}},\"requiredProps\":[\"action\"],\"legacyTelemetry\":false},\"insight_view_loaded\":{\"label\":\"工作洞察加载成功\",\"module\":\"insight\",\"props\":{\"panel\":{\"type\":\"enum\",\"values\":[\"today_overview\",\"heatmap_range\",\"heatmap_year\",\"app_usage_week\",\"app_detail\",\"keyboard_heatmap\",\"leaderboard\"]},\"entity_id\":{\"type\":\"identifier\",\"maxLength\":160}},\"requiredProps\":[\"panel\"],\"legacyTelemetry\":false},\"account_action_success\":{\"label\":\"账户操作成功\",\"module\":\"account\",\"props\":{\"action\":{\"type\":\"enum\",\"values\":[\"invite_link_copied\"]},\"entity_id\":{\"type\":\"identifier\",\"maxLength\":160}},\"requiredProps\":[\"action\"],\"legacyTelemetry\":false},\"account_view_loaded\":{\"label\":\"账户内容加载成功\",\"module\":\"account\",\"props\":{\"panel\":{\"type\":\"enum\",\"values\":[\"profile\",\"credit_ledger\",\"subscription\",\"tutorial\",\"help\"]},\"entity_id\":{\"type\":\"identifier\",\"maxLength\":160}},\"requiredProps\":[\"panel\"],\"legacyTelemetry\":false},\"bot_action_success\":{\"label\":\"Bot 操作成功\",\"module\":\"bot\",\"props\":{\"action\":{\"type\":\"enum\",\"values\":[\"reply_completed\",\"bot_created\",\"avatar_saved\",\"profile_saved\",\"style_saved\",\"memory_added\",\"memory_updated\",\"group_created\",\"consultation_completed\",\"schedule_created\",\"schedule_paused\",\"conversation_pinned\",\"conversation_hidden\",\"conversation_restored\"]},\"entity_id\":{\"type\":\"identifier\",\"maxLength\":160},\"task_id\":{\"type\":\"identifier\",\"maxLength\":160},\"has_attachment\":{\"type\":\"boolean\"},\"mentioned_bot\":{\"type\":\"boolean\"},\"summary_command\":{\"type\":\"boolean\"},\"output_nonempty\":{\"type\":\"boolean\"},\"interaction\":{\"type\":\"enum\",\"values\":[\"explicit_command\"]},\"state_changed\":{\"type\":\"boolean\"}},\"requiredProps\":[\"action\"],\"legacyTelemetry\":false},\"bot_view_loaded\":{\"label\":\"Bot 内容加载成功\",\"module\":\"bot\",\"props\":{\"panel\":{\"type\":\"enum\",\"values\":[\"common_role\",\"schedule_history\",\"notification_conversation\",\"permissions\",\"context\",\"models\",\"wechat\",\"processing_record\"]},\"entity_id\":{\"type\":\"identifier\",\"maxLength\":160},\"interaction\":{\"type\":\"enum\",\"values\":[\"explicit_open\"]}},\"requiredProps\":[\"panel\"],\"legacyTelemetry\":false},\"tool_action_success\":{\"label\":\"工具操作成功\",\"module\":\"tools\",\"props\":{\"action\":{\"type\":\"enum\",\"values\":[\"catalog_searched\",\"image_generated\",\"video_generated\",\"voice_generated\",\"whiteboard_saved\",\"pdf_compressed\",\"image_compressed\",\"markdown_opened\"]},\"entity_id\":{\"type\":\"identifier\",\"maxLength\":160}},\"requiredProps\":[\"action\"],\"legacyTelemetry\":false},\"tool_view_loaded\":{\"label\":\"工具内容加载成功\",\"module\":\"tools\",\"props\":{\"panel\":{\"type\":\"enum\",\"values\":[\"image_options\",\"voice_authorization\",\"publisher\",\"milestone\"]},\"entity_id\":{\"type\":\"identifier\",\"maxLength\":160},\"interaction\":{\"type\":\"enum\",\"values\":[\"explicit_open\"]}},\"requiredProps\":[\"panel\"],\"legacyTelemetry\":false}}")
};
//#endregion
//#region electron/repositories/growth-event.repository.ts
var initialized = /* @__PURE__ */new WeakSet();
function ownedDatabase(owner) {
  const connection = getOpenDatabaseConnection();
  if (!connection || connection.generation !== owner.generation || connection.ownerUserId !== owner.userId) throw new Error("GROWTH_EVENT_OWNER_CHANGED");
  const database = connection.database;
  if (!initialized.has(database)) {
    database.exec(`
      CREATE TABLE IF NOT EXISTS growth_event_outbox (
        event_id TEXT PRIMARY KEY,
        owner_user_id INTEGER NOT NULL,
        event_name TEXT NOT NULL,
        occurred_at INTEGER NOT NULL,
        props_json TEXT NOT NULL,
        device_id TEXT NOT NULL,
        app_version TEXT NOT NULL,
        platform TEXT NOT NULL,
        created_at INTEGER NOT NULL,
        attempt_count INTEGER NOT NULL DEFAULT 0,
        last_error_code TEXT,
        last_attempt_at INTEGER
      );
      CREATE INDEX IF NOT EXISTS idx_growth_event_outbox_owner
        ON growth_event_outbox(owner_user_id, created_at);
      CREATE TABLE IF NOT EXISTS growth_event_sync_state (
        owner_user_id INTEGER PRIMARY KEY,
        accepted_count INTEGER NOT NULL DEFAULT 0,
        duplicate_count INTEGER NOT NULL DEFAULT 0,
        rejected_count INTEGER NOT NULL DEFAULT 0,
        failed_batch_count INTEGER NOT NULL DEFAULT 0,
        retry_at INTEGER NOT NULL DEFAULT 0,
        last_error_code TEXT,
        last_error_at INTEGER
      );
      CREATE TABLE IF NOT EXISTS growth_event_rejections (
        event_id TEXT PRIMARY KEY,
        owner_user_id INTEGER NOT NULL,
        event_name TEXT NOT NULL,
        occurred_at INTEGER NOT NULL,
        props_json TEXT NOT NULL,
        code TEXT NOT NULL,
        rejected_at INTEGER NOT NULL
      );
    `);
    initialized.add(database);
  }
  return database;
}
var growthEventRepository = {
  enqueue(owner, event) {
    ownedDatabase(owner).prepare(`INSERT OR IGNORE INTO growth_event_outbox
      (event_id, owner_user_id, event_name, occurred_at, props_json, device_id, app_version, platform, created_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`).run(event.eventId, owner.userId, event.eventName, event.occurredAt, JSON.stringify(event.props), event.deviceId, event.appVersion, event.platform, Date.now());
  },
  pending(owner) {
    return Boolean(ownedDatabase(owner).prepare("SELECT 1 FROM growth_event_outbox WHERE owner_user_id = ? LIMIT 1").get(owner.userId));
  },
  retryAt(owner) {
    return ownedDatabase(owner).prepare("SELECT retry_at FROM growth_event_sync_state WHERE owner_user_id = ?").get(owner.userId)?.retry_at ?? 0;
  },
  batch(owner, limit) {
    const rows = ownedDatabase(owner).prepare(`SELECT event_id, event_name, occurred_at, props_json,
      device_id, app_version, platform FROM growth_event_outbox
      WHERE owner_user_id = ? ORDER BY created_at, rowid LIMIT ?`).all(owner.userId, Math.max(1, Math.min(50, limit)));
    const first = rows[0];
    if (!first) return [];
    return rows.filter(row => row.device_id === first.device_id && row.app_version === first.app_version && row.platform === first.platform).map(row => ({
      eventId: row.event_id,
      eventName: row.event_name,
      occurredAt: row.occurred_at,
      props: JSON.parse(row.props_json),
      deviceId: row.device_id,
      appVersion: row.app_version,
      platform: row.platform
    }));
  },
  acknowledge(owner, accepted, duplicates, rejected) {
    const database = ownedDatabase(owner);
    const now = Date.now();
    database.exec("SAVEPOINT growth_event_ack");
    try {
      const rejection = database.prepare(`INSERT OR IGNORE INTO growth_event_rejections
        (event_id, owner_user_id, event_name, occurred_at, props_json, code, rejected_at)
        SELECT event_id, owner_user_id, event_name, occurred_at, props_json, ?, ? FROM growth_event_outbox
        WHERE owner_user_id = ? AND event_id = ?`);
      for (const item of rejected) rejection.run(item.code, now, owner.userId, item.eventId);
      const remove = database.prepare("DELETE FROM growth_event_outbox WHERE owner_user_id = ? AND event_id = ?");
      for (const id of [...accepted, ...duplicates, ...rejected.map(item => item.eventId)]) remove.run(owner.userId, id);
      database.prepare(`INSERT INTO growth_event_sync_state
        (owner_user_id, accepted_count, duplicate_count, rejected_count) VALUES (?, ?, ?, ?)
        ON CONFLICT(owner_user_id) DO UPDATE SET
          accepted_count = accepted_count + excluded.accepted_count,
          duplicate_count = duplicate_count + excluded.duplicate_count,
          rejected_count = rejected_count + excluded.rejected_count,
          retry_at = 0`).run(owner.userId, accepted.length, duplicates.length, rejected.length);
      database.prepare(`DELETE FROM growth_event_rejections WHERE owner_user_id = ? AND event_id NOT IN
        (SELECT event_id FROM growth_event_rejections WHERE owner_user_id = ? ORDER BY rejected_at DESC, rowid DESC LIMIT 100)`).run(owner.userId, owner.userId);
      database.exec("RELEASE SAVEPOINT growth_event_ack");
    } catch (error) {
      database.exec("ROLLBACK TO SAVEPOINT growth_event_ack");
      database.exec("RELEASE SAVEPOINT growth_event_ack");
      throw error;
    }
  },
  defer(owner, eventIds, code, retryAt) {
    const database = ownedDatabase(owner);
    const now = Date.now();
    database.exec("SAVEPOINT growth_event_retry");
    try {
      database.prepare(`INSERT INTO growth_event_sync_state
        (owner_user_id, failed_batch_count, retry_at, last_error_code, last_error_at) VALUES (?, 1, ?, ?, ?)
        ON CONFLICT(owner_user_id) DO UPDATE SET failed_batch_count = failed_batch_count + 1,
          retry_at = excluded.retry_at, last_error_code = excluded.last_error_code, last_error_at = excluded.last_error_at`).run(owner.userId, retryAt, code, now);
      const update = database.prepare(`UPDATE growth_event_outbox SET attempt_count = attempt_count + 1,
        last_error_code = ?, last_attempt_at = ? WHERE owner_user_id = ? AND event_id = ?`);
      for (const id of eventIds) update.run(code, now, owner.userId, id);
      database.exec("RELEASE SAVEPOINT growth_event_retry");
    } catch (error) {
      database.exec("ROLLBACK TO SAVEPOINT growth_event_retry");
      database.exec("RELEASE SAVEPOINT growth_event_retry");
      throw error;
    }
  }
};
//#endregion
//#region electron/services/growth-events.service.ts
var catalog = growth_event_catalog_default;
var BATCH_SIZE = 50;
var COALESCE_MS = 1200;
var REQUEST_TIMEOUT_MS$1 = 15e3;
var MAX_BACKOFF_MS = 3e5;
var UNAVAILABLE_BACKOFF_MS = 18e5;
var PERMANENT_REJECTIONS = /* @__PURE__ */new Set(["INVALID_EVENT", "INVALID_EVENT_ID", "UNKNOWN_EVENT", "INVALID_OCCURRED_AT", "FUTURE_EVENT", "INVALID_PROPS", "MISSING_PROPERTY", "EVENT_ID_CONFLICT", "SERVER_EVENT_REQUIRED"]);
var active = null;
var lastStorageWarningAt = 0;
function captureGrowthEventActor() {
  try {
    const connection = getOpenDatabaseConnection();
    if (!connection?.ownerUserId) return null;
    const session = authRepository.getSession();
    if (!session?.token || session.userId !== connection.ownerUserId) return null;
    return {
      userId: session.userId,
      generation: connection.generation,
      token: session.token
    };
  } catch {
    return null;
  }
}
function isGrowthEventActorCurrent(actor) {
  try {
    if (!actor) return false;
    const connection = getOpenDatabaseConnection();
    if (!connection || connection.generation !== actor.generation || connection.ownerUserId !== actor.userId) return false;
    const session = authRepository.getSession();
    return session?.userId === actor.userId && session.token === actor.token;
  } catch {
    return false;
  }
}
function storageWarning() {
  if (Date.now() - lastStorageWarningAt < 6e4) return;
  lastStorageWarningAt = Date.now();
  console.warn("[GrowthEvents] 成长事件本地持久化失败，请检查数据库或磁盘状态。");
}
function sanitizeProperty(value, rule) {
  switch (rule.type) {
    case "boolean":
      return typeof value === "boolean" ? value : undefined;
    case "integer":
      return typeof value === "number" && Number.isSafeInteger(value) && value >= (rule.min ?? 0) && value <= (rule.max ?? Number.MAX_SAFE_INTEGER) ? value : undefined;
    case "enum":
      return typeof value === "string" && rule.values?.includes(value) ? value : undefined;
    case "identifier":
      {
        const identifier = typeof value === "number" && Number.isSafeInteger(value) && value >= 0 ? String(value) : value;
        return typeof identifier === "string" && identifier.length <= (rule.maxLength ?? 160) && /^[A-Za-z0-9][A-Za-z0-9_.:-]*$/.test(identifier) ? identifier : undefined;
      }
    case "date":
      {
        if (typeof value !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(value) || value < "1970-01-01") return undefined;
        const date = /* @__PURE__ */new Date(`${value}T00:00:00Z`);
        return Number.isFinite(date.getTime()) && date.toISOString().slice(0, 10) === value ? value : undefined;
      }
  }
}
/** 从既有遥测入口复用事件，不做首次判断、不处理任务奖励、不记录任意业务内容。 */
function recordGrowthEvent(event, actor) {
  let growthOnly = false;
  try {
    const eventName = event.eventName || event.name;
    const definition = Object.hasOwn(catalog.events, eventName) ? catalog.events[eventName] : undefined;
    if (!definition) return false;
    growthOnly = definition.legacyTelemetry === false;
    if (definition.serverOnly) return growthOnly;
    const owner = actor === undefined ? captureGrowthEventActor() : actor;
    if (!owner || !isGrowthEventActorCurrent(owner)) return growthOnly;
    const source = {
      ...event.props,
      ...(eventName === "page_view" ? {
        pageId: event.props?.pageId ?? event.page
      } : {})
    };
    const props = {};
    for (const [key, rule] of Object.entries(definition.props)) {
      const value = sanitizeProperty(source[key], rule);
      if (value !== undefined) props[key] = value;
    }
    if (definition.requiredProps?.some(key => props[key] === undefined)) return growthOnly;
    const timestamp = event.occurredAt ? Date.parse(event.occurredAt) : event.ts ?? Date.now();
    growthEventRepository.enqueue(owner, {
      eventId: crypto.randomUUID(),
      eventName,
      occurredAt: Number.isFinite(timestamp) ? timestamp : Date.now(),
      props,
      deviceId: settingsService.getSettings().deviceId,
      appVersion: app.getVersion(),
      platform: process.platform
    });
    if (active) schedule$1(active, COALESCE_MS);
  } catch {
    storageWarning();
  }
  return growthOnly;
}
function current(session) {
  return active === session && isGrowthEventActorCurrent(session.actor);
}
function schedule$1(session, delay) {
  if (!current(session) || session.timer || session.controller) return;
  const wait = Math.max(delay, session.nextAttemptAt - Date.now());
  session.timer = setTimeout(() => {
    session.timer = null;
    flush$1(session);
  }, wait);
  session.timer.unref?.();
}
function startGrowthEvents() {
  const actor = captureGrowthEventActor();
  if (!actor) {
    stopGrowthEvents();
    return;
  }
  if (active && active.actor.userId === actor.userId && active.actor.generation === actor.generation && active.actor.token === actor.token) return;
  stopGrowthEvents();
  const session = {
    actor,
    timer: null,
    controller: null,
    nextAttemptAt: 0,
    failures: 0
  };
  active = session;
  try {
    session.nextAttemptAt = Math.min(growthEventRepository.retryAt(actor), Date.now() + UNAVAILABLE_BACKOFF_MS);
    if (growthEventRepository.pending(actor)) schedule$1(session, COALESCE_MS);
  } catch {
    storageWarning();
  }
}
function stopGrowthEvents() {
  const session = active;
  active = null;
  if (session?.timer) clearTimeout(session.timer);
  session?.controller?.abort();
}
function retry(session, ids, code, minimumDelay = 0) {
  session.failures += 1;
  const backoff = Math.min(MAX_BACKOFF_MS, Math.round(5e3 * 2 ** Math.min(10, session.failures - 1) * (1 + Math.random() * .2)));
  session.nextAttemptAt = Date.now() + Math.max(minimumDelay, backoff);
  growthEventRepository.defer(session.actor, ids, code, session.nextAttemptAt);
}
function validResult(input, ids) {
  if (!input || typeof input !== "object") return false;
  const data = input;
  if (!Array.isArray(data.acceptedIds) || !Array.isArray(data.duplicateIds) || !Array.isArray(data.rejected)) return false;
  const seen = /* @__PURE__ */new Set();
  const validId = id => {
    if (typeof id !== "string" || !ids.has(id) || seen.has(id)) return false;
    seen.add(id);
    return true;
  };
  return data.acceptedIds.every(validId) && data.duplicateIds.every(validId) && data.rejected.every(item => item && validId(item.eventId) && typeof item.code === "string" && /^[A-Z0-9_]{1,64}$/.test(item.code));
}
function flush$1(session) {
  if (session.inFlight) return session.inFlight;
  const pending = performFlush(session).finally(() => {
    if (session.inFlight === pending) session.inFlight = undefined;
  });
  session.inFlight = pending;
  return pending;
}
/** Entering Growth must observe the user's preceding actions. Never bypass a server backoff. */
async function flushGrowthEventsNow(timeoutMs = 3e3) {
  startGrowthEvents();
  const session = active;
  if (!session) return false;
  const deadline = Date.now() + timeoutMs;
  const waitForUpload = async pending => {
    let timer;
    try {
      return await Promise.race([pending.then(() => true, () => false), new Promise(resolve => {
        timer = setTimeout(() => resolve(false), Math.max(0, deadline - Date.now()));
      })]);
    } finally {
      if (timer) clearTimeout(timer);
    }
  };
  if (session.inFlight && !(await waitForUpload(session.inFlight))) return false;
  for (let batch = 0; batch < 10 && current(session); batch++) {
    if (!growthEventRepository.pending(session.actor)) return true;
    if (Date.now() >= deadline) return false;
    if (session.nextAttemptAt > Date.now()) return false;
    if (session.timer) {
      clearTimeout(session.timer);
      session.timer = null;
    }
    if (!(await waitForUpload(flush$1(session)))) return false;
  }
  return current(session) && !growthEventRepository.pending(session.actor);
}
async function performFlush(session) {
  if (!current(session)) {
    if (active === session) stopGrowthEvents();
    return;
  }
  let batch = [];
  let timeout = null;
  try {
    batch = growthEventRepository.batch(session.actor, BATCH_SIZE);
    if (!batch.length) return;
    const controller = new AbortController();
    session.controller = controller;
    timeout = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS$1);
    const first = batch[0];
    const response = await fetch(`${API_BASE}/v2/growth-events.php`, {
      method: "POST",
      signal: controller.signal,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session.actor.token}`
      },
      body: JSON.stringify({
        schemaVersion: 1,
        deviceId: first.deviceId,
        appVersion: first.appVersion,
        platform: first.platform,
        events: batch.map(({
          eventId,
          eventName,
          occurredAt,
          props
        }) => ({
          eventId,
          eventName,
          occurredAt,
          props
        }))
      })
    });
    if (!current(session)) return;
    if (!response.ok) {
      response.body?.cancel().catch(() => undefined);
      const unavailable = response.status === 404 || response.status === 405 || response.status === 501;
      const retryAfter = response.headers.get("Retry-After");
      const requestedDelay = retryAfter && /^\d+$/.test(retryAfter) ? Number(retryAfter) * 1e3 : retryAfter ? Math.max(0, Date.parse(retryAfter) - Date.now()) : 0;
      const rateLimitDelay = response.status === 429 ? Math.min(UNAVAILABLE_BACKOFF_MS, Math.max(6e4, Number.isFinite(requestedDelay) ? requestedDelay : 0)) : 0;
      retry(session, batch.map(event => event.eventId), `HTTP_${response.status}`, unavailable ? UNAVAILABLE_BACKOFF_MS : response.status === 401 || response.status === 403 ? MAX_BACKOFF_MS : rateLimitDelay);
      return;
    }
    const payload = await response.json();
    if (!current(session)) return;
    if (payload.ok !== true || !validResult(payload.data, new Set(batch.map(event => event.eventId)))) {
      retry(session, batch.map(event => event.eventId), "INVALID_RESPONSE");
      return;
    }
    const data = payload.data;
    const permanent = data.rejected.filter(item => PERMANENT_REJECTIONS.has(item.code));
    const acknowledged = /* @__PURE__ */new Set([...data.acceptedIds, ...data.duplicateIds, ...permanent.map(item => item.eventId)]);
    growthEventRepository.acknowledge(session.actor, data.acceptedIds, data.duplicateIds, permanent);
    const pending = batch.filter(event => !acknowledged.has(event.eventId));
    if (pending.length) retry(session, pending.map(event => event.eventId), "PARTIAL_ACKNOWLEDGEMENT");else {
      session.failures = 0;
      session.nextAttemptAt = 0;
    }
  } catch {
    if (current(session)) try {
      retry(session, batch.map(event => event.eventId), session.controller?.signal.aborted ? "REQUEST_TIMEOUT" : "SYNC_FAILED");
    } catch {
      storageWarning();
    }
  } finally {
    if (timeout) clearTimeout(timeout);
    session.controller = null;
    if (current(session)) try {
      if (growthEventRepository.pending(session.actor)) schedule$1(session, COALESCE_MS);
    } catch {
      storageWarning();
    }
  }
}
//#endregion
//#region shared/types/desktop-sync.ts
/** Background timing only. Conditional transport reuses the legacy read contracts. */
var DESKTOP_SYNC_INTERVALS = {
  session: 6e4,
  account: 3e5,
  notifications: 18e4,
  todo: 3e4,
  leaderboard: 3e4,
  invite_rewards: 3e4,
  credit_campaign: 6e4,
  bot_default_roles: 3e4,
  bot_common_roles: 6e4,
  bot_catalog: 6e4,
  toolbox: 6e4,
  hardware_binding: 6e4,
  milestones: 6e4
};
//#endregion
//#region electron/services/desktop-read.service.ts
var cache = /* @__PURE__ */new Map();
var cacheOwner = "";
var queue$1 = [];
var timer;
var sending = false;
var unavailableUntil = 0;
var pulse;
function currentToken() {
  return authRepository.getSession()?.token ?? "";
}
function jsonResponse(text, status = 200) {
  return new Response(text, {
    status,
    headers: {
      "Content-Type": "application/json"
    }
  });
}
function schedule() {
  if (sending || timer || !queue$1.length && !pulse) return;
  timer = setTimeout(() => {
    timer = undefined;
    flush();
  }, 25);
}
function remember(key, value) {
  cache.delete(key);
  cache.set(key, value);
  while (cache.size > 64) cache.delete(cache.keys().next().value);
}
async function fallback(read) {
  try {
    if (currentToken() !== read.token) throw new Error(appText("ipcErrors.syncAccountChanged"));
    const response = await read.fallback();
    if (currentToken() !== read.token) throw new Error(appText("ipcErrors.syncAccountChanged"));
    read.resolve(response);
  } catch (error) {
    read.reject(error);
  }
}
async function flush() {
  if (sending) return;
  sending = true;
  const reads = queue$1.splice(0, 8);
  const beat = pulse;
  pulse = undefined;
  const token = reads[0]?.token ?? beat?.token ?? "";
  try {
    if (!token || currentToken() !== token || reads.some(read => read.token !== token)) throw new Error(appText("ipcErrors.syncAccountChanged"));
    if (cacheOwner !== token) {
      cache.clear();
      cacheOwner = token;
      unavailableUntil = 0;
    }
    if (Date.now() < unavailableUntil) throw new Error("使用兼容读取");
    const known = reads.map(read => cache.get(read.key));
    const batch = beat?.token === token ? beat.value.prepare() : undefined;
    const response = await fetch(`${API_BASE}/v3/desktop-sync.php`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        protocolVersion: 2,
        todoAttachmentLinks: true,
        reads: reads.map((read, item) => ({
          id: String(item),
          kind: read.kind,
          params: read.params,
          knownDigest: known[item]?.digest ?? ""
        })),
        ...(batch ? {
          device: batch.device,
          events: batch.events
        } : {})
      }),
      signal: AbortSignal.timeout(3e4)
    });
    if (currentToken() !== token) throw new Error(appText("ipcErrors.syncAccountChanged"));
    if ([401, 403].includes(response.status)) {
      beat?.value.unauthorized();
      for (const read of reads) read.resolve(jsonResponse(JSON.stringify({
        ok: false,
        error: {
          code: "UNAUTHORIZED",
          message: appText("ipcErrors.sessionExpired")
        }
      }), response.status));
      return;
    }
    if (!response.ok) {
      unavailableUntil = Date.now() + ([400, 404, 405, 501].includes(response.status) ? 18e5 : 3e4);
      throw new Error(`Desktop reads HTTP ${response.status}`);
    }
    const text = await response.text();
    if (Buffer.byteLength(text) > 5242880) throw new Error(appText("ipcErrors.syncResponseTooLarge"));
    const body = JSON.parse(text);
    if (currentToken() !== token) throw new Error(appText("ipcErrors.syncAccountChanged"));
    if (!body.ok || body.protocolVersion !== 2 || !body.results) throw new Error(appText("ipcErrors.syncProtocolUnavailable"));
    if (body.telemetryAccepted) batch?.accept();
    await Promise.all(reads.map(async (read, item) => {
      try {
        const result = body.results[String(item)];
        if (!result || result.fallback || !/^[a-f0-9]{64}$/.test(result.digest ?? "")) return fallback(read);
        let payload;
        if (result.changed && result.payload?.ok === true) payload = result.payload;else if (result.changed === false && known[item]?.digest === result.digest) payload = JSON.parse(known[item].text);else return fallback(read);
        if (result.volatile) {
          const {
            campaignLinks,
            todoAttachmentLinks,
            ...fields
          } = result.volatile;
          payload.data = {
            ...payload.data,
            ...fields
          };
          if (read.kind === "campaign.status" && Array.isArray(campaignLinks) && Array.isArray(payload.data.campaigns)) {
            const urls = new Map(campaignLinks.filter(link => link && typeof link.externalUrl === "string").map(link => [link.id, link.externalUrl]));
            payload.data.campaigns = payload.data.campaigns.map(campaign => ({
              ...campaign,
              externalUrl: urls.get(campaign.id) ?? campaign.externalUrl
            }));
            payload.data.campaign = payload.data.campaigns[0] ?? null;
          }
          if (["todo.list", "todo.get"].includes(read.kind) && todoAttachmentLinks && typeof todoAttachmentLinks === "object" && !Array.isArray(todoAttachmentLinks)) {
            const urls = new Map(Object.entries(todoAttachmentLinks));
            const attachment = item => {
              const url = urls.get(String(item.id));
              return typeof url === "string" ? {
                ...item,
                url
              } : item;
            };
            const task = item => ({
              ...item,
              ...(Array.isArray(item.attachments) ? {
                attachments: item.attachments.map(attachment)
              } : {}),
              ...(item.attachment ? {
                attachment: attachment(item.attachment)
              } : {})
            });
            if (Array.isArray(payload.data.tasks)) payload.data.tasks = payload.data.tasks.map(task);
            if (payload.data.task && typeof payload.data.task === "object") payload.data.task = task(payload.data.task);
          }
        }
        const value = JSON.stringify(payload);
        if (Buffer.byteLength(value) <= 524288) remember(read.key, {
          digest: result.digest,
          text: value
        });
        read.resolve(jsonResponse(value));
      } catch {
        await fallback(read);
      }
    }));
  } catch {
    if (currentToken() === token && Date.now() >= unavailableUntil) unavailableUntil = Date.now() + 3e4;
    await Promise.all(reads.map(fallback));
    if (beat && currentToken() === beat.token) await beat.value.fallback().catch(() => undefined);
  } finally {
    beat?.done();
    sending = false;
    schedule();
  }
}
function enqueueSyncPulse(value) {
  return new Promise(resolve => {
    pulse?.done();
    pulse = {
      token: currentToken(),
      value,
      done: resolve
    };
    schedule();
  });
}
function enqueue(kind, params, fallbackFetch, signal) {
  const token = currentToken();
  if (!token || queue$1.length >= 64) return fallbackFetch();
  if (signal?.aborted) return Promise.reject(new DOMException("Aborted", "AbortError"));
  return new Promise((resolve, reject) => {
    const abort = () => reject(new DOMException("Aborted", "AbortError"));
    const finish = (callback, value) => {
      signal?.removeEventListener("abort", abort);
      callback(value);
    };
    signal?.addEventListener("abort", abort, {
      once: true
    });
    queue$1.push({
      kind,
      params,
      token,
      key: JSON.stringify([kind, params]),
      resolve: response => finish(resolve, response),
      reject: error => finish(reject, error),
      fallback: () => signal?.aborted ? Promise.reject(new DOMException("Aborted", "AbortError")) : fallbackFetch()
    });
    schedule();
  });
}
/** The allowlist is intentionally small and lives beside the batch reader list. */
function desktopReadFetch(input, init = {}) {
  const url = new URL(String(input));
  const root = new URL(API_BASE);
  const legacy = () => fetch(input, init);
  if (url.origin !== root.origin || !url.pathname.startsWith(`${root.pathname}/`)) return legacy();
  const path = url.pathname.slice(root.pathname.length + 1);
  const method = (init.method ?? "GET").toUpperCase();
  const authorization = new Headers(init.headers).get("Authorization");
  if (authorization && authorization !== `Bearer ${currentToken()}`) return legacy();
  const query = Object.fromEntries(url.searchParams);
  let params = query;
  if (typeof init.body === "string") try {
    params = {
      ...query,
      ...JSON.parse(init.body)
    };
  } catch {
    return legacy();
  }
  let kind;
  if (path === "todos.php" && method === "POST" && ["list", "stats", "get"].includes(String(params.action))) kind = `todo.${params.action}`;
  if (method === "GET") {
    if (path === "leaderboard.php" && params.action === "daily") kind = "leaderboard.daily";
    if (path === "v2/invite-rewards.php" && ["status", "records"].includes(String(params.action ?? "status"))) kind = `invite.${params.action ?? "status"}`;
    if (path === "v2/credit-campaigns.php") kind = "campaign.status";
    if (path === "v2/xiaohei-bot/default-roles.php") kind = "bot.default_roles";
    if (path === "v2/xiaohei-bot/common-roles.php") kind = "bot.common_roles";
    if (path === "v2/xiaohei-bot/bootstrap.php") kind = "bot.bootstrap";
  }
  return kind ? enqueue(kind, params, legacy, init.signal) : legacy();
}
/** Renderer callers cannot supply arbitrary URLs or cross-account credentials. */
async function readInviteForRenderer(input) {
  if (!input || input.token !== currentToken() || typeof input.path !== "string" || input.path.length > 512) throw new Error(appText("ipcErrors.syncAccountChanged"));
  const url = new URL(input.path, `${API_BASE}/`);
  if (url.origin !== new URL("https://xiaoheiribao.com/api").origin || url.pathname !== `${new URL("https://xiaoheiribao.com/api").pathname}/v2/invite-rewards.php`) throw new Error(appText("ipcErrors.syncReadUnsupported"));
  const response = await desktopReadFetch(url, {
    headers: {
      Authorization: `Bearer ${input.token}`
    }
  });
  return {
    status: response.status,
    text: await response.text()
  };
}
//#endregion
//#region electron/services/desktop-sync.service.ts
var GRID = 3e4;
/** Timing only. Content validation belongs to the actual business read, not a
* separate preflight version request. No server-side revision tables required. */
var DesktopSyncService = class {
  consumers = /* @__PURE__ */new Map();
  timer;
  pulse;
  pulseDue = 0;
  registered = false;
  running = false;
  ownerToken = null;
  anchor = Date.now() + Math.floor(Math.random() * 2e3);
  setPulse(pulse) {
    this.pulse = pulse;
    this.pulseDue = this.align(Date.now());
    this.schedule();
  }
  subscribe(input, refresh, interval = DESKTOP_SYNC_INTERVALS[input.topic]) {
    if (!Object.hasOwn(DESKTOP_SYNC_INTERVALS, input.topic)) throw new Error("Unknown sync topic");
    const period = Math.ceil(Math.max(GRID, Number.isFinite(interval) ? interval : GRID) / GRID) * GRID;
    const c = {
      key: input.id,
      refresh,
      interval: period,
      due: this.align(Date.now() + period)
    };
    this.consumers.set(c.key, c);
    this.schedule();
    return () => {
      if (this.consumers.get(c.key) === c) this.consumers.delete(c.key);
      this.schedule();
    };
  }
  acknowledge(key, deliveryId) {
    if ((authRepository.getSession()?.token ?? null) !== this.ownerToken) return;
    const c = this.consumers.get(key);
    if (c?.pending?.id === deliveryId) c.pending = undefined;
  }
  align(time) {
    return this.anchor + Math.ceil((time - this.anchor) / GRID) * GRID;
  }
  advance(due, interval, now) {
    return due + Math.max(1, Math.floor((now - due) / interval) + 1) * interval;
  }
  schedule() {
    if (this.timer) clearTimeout(this.timer);
    this.timer = undefined;
    if (this.running || !this.consumers.size && !this.pulse) return;
    const due = Math.min(this.pulse ? this.pulseDue : Infinity, ...[...this.consumers.values()].map(item => item.due));
    this.timer = setTimeout(() => void this.tick(), Math.max(1e3, due - Date.now()));
    this.timer.unref?.();
  }
  async tick() {
    if (this.running) return;
    this.running = true;
    try {
      const now = Date.now();
      const token = authRepository.getSession()?.token ?? null;
      if (token !== this.ownerToken) {
        this.ownerToken = token;
        for (const text of this.consumers.values()) text.pending = undefined;
      }
      for (const text of this.consumers.values()) {
        if (text.due > now + 1e3) continue;
        text.due = this.advance(text.due, text.interval, now);
        if (!token || text.pending && now - text.pending.at < 6e4) continue;
        const randomUUIDResult = crypto.randomUUID();
        text.pending = {
          id: randomUUIDResult,
          at: now
        };
        try {
          const result = text.refresh({
            id: text.key,
            deliveryId: randomUUIDResult
          });
          if (result instanceof Promise) result.then(() => this.acknowledge(text.key, randomUUIDResult), () => this.acknowledge(text.key, randomUUIDResult));
        } catch {
          this.acknowledge(text.key, randomUUIDResult);
        }
      }
      if (this.pulse && this.pulseDue <= now + 1e3) {
        this.pulseDue = this.advance(this.pulseDue, GRID, now);
        if (token) await enqueueSyncPulse(this.pulse);
      }
    } catch (error) {
      console.warn("[DesktopSync] 调度失败，等待下次同步", error);
    } finally {
      this.running = false;
      this.schedule();
    }
  }
  registerIpc() {
    if (this.registered) return;
    this.registered = true;
    const owners = /* @__PURE__ */new Map();
    ipcMain.handle("desktop-sync:invite-read", (_event, input) => readInviteForRenderer(input));
    ipcMain.handle("desktop-sync:subscribe", (event, input) => {
      if (!input || typeof input.id !== "string" || input.id.length > 100 || !Object.hasOwn(DESKTOP_SYNC_INTERVALS, input.topic)) throw new Error("Invalid sync subscription");
      const owner = event.sender;
      const key = `renderer:${owner.id}:${input.id}`;
      if (!owners.get(owner.id)?.has(key) && (owners.get(owner.id)?.size ?? 0) >= 32) throw new Error("Too many sync subscriptions");
      if (!owners.has(owner.id)) {
        owners.set(owner.id, /* @__PURE__ */new Set());
        owner.once("destroyed", () => {
          for (const id of owners.get(owner.id) ?? []) this.consumers.delete(id);
          owners.delete(owner.id);
          this.schedule();
        });
      }
      owners.get(owner.id).add(key);
      this.subscribe({
        ...input,
        id: key
      }, notice => {
        if (!owner.isDestroyed()) owner.send("desktop-sync:changed", {
          ...notice,
          id: input.id
        });
      });
    });
    ipcMain.handle("desktop-sync:unsubscribe", (event, id) => {
      const key = `renderer:${event.sender.id}:${id}`;
      this.consumers.delete(key);
      owners.get(event.sender.id)?.delete(key);
      this.schedule();
    });
    ipcMain.on("desktop-sync:ack", (event, input) => {
      if (!input || typeof input.id !== "string" || typeof input.deliveryId !== "string") return;
      this.acknowledge(`renderer:${event.sender.id}:${input.id}`, input.deliveryId);
    });
  }
};
var desktopSyncService = new DesktopSyncService();
//#endregion
//#region electron/services/telemetry.service.ts
var telemetry_service_exports = /* @__PURE__ */__exportAll({
  claimAttributionToken: () => claimAttributionToken,
  getInstallationTelemetryId: () => getInstallationTelemetryId,
  initializeInstallationTelemetry: () => initializeInstallationTelemetry,
  logoutTelemetry: () => logoutTelemetry,
  startTelemetry: () => startTelemetry,
  stopTelemetry: () => stopTelemetry,
  trackEvent: () => trackEvent
});
var BOT_BUILD_ID = "16a3fe5f20f4";
var FLUSH_BATCH_SIZE = 50;
var BACKLOG_MAX_BATCHES = 10;
var QUEUE_CAP = 5e3;
var REQUEST_TIMEOUT_MS = 15e3;
var lastBatchAt = 0;
var running = false;
var handlingForcedLogout = false;
var queue = [];
var queueOwnerUserId = null;
var queueLoaded = false;
var flushInFlight = false;
var droppedEventCount = 0;
var devFlushTimer;
var installationState = null;
function queueFilePath() {
  return path.join(app.getPath("userData"), `telemetry-queue-${queueOwnerUserId ?? "anonymous"}.json`);
}
function installationFilePath() {
  return path.join(app.getPath("userData"), "installation-state.json");
}
function writeJsonAtomic(filePath, value) {
  const temporaryPath = `${filePath}.tmp`;
  writeFileSync(temporaryPath, JSON.stringify(value), "utf8");
  renameSync(temporaryPath, filePath);
}
function loadQueueForCurrentUser() {
  const userId = authRepository.getSession()?.userId ?? null;
  if (queueLoaded && queueOwnerUserId === userId) return;
  queueLoaded = true;
  queueOwnerUserId = userId;
  queue = [];
  droppedEventCount = loadInstallationState().telemetryDroppedCount;
  if (!userId) return;
  try {
    let savedQueue;
    try {
      savedQueue = readFileSync(queueFilePath(), "utf8");
    } catch {
      savedQueue = readFileSync(path.join(app.getPath("userData"), "telemetry-queue.json"), "utf8");
    }
    const stored = JSON.parse(savedQueue);
    if (stored.userId === userId && Array.isArray(stored.events)) {
      const oldestAllowed = Date.now() - 2592e6;
      const unexpiredEvents = stored.events.filter(event => !event.ts || event.ts >= oldestAllowed);
      const expiredCount = stored.events.length - unexpiredEvents.length;
      const overflowCount = Math.max(0, unexpiredEvents.length - QUEUE_CAP);
      queue = unexpiredEvents.slice(-5e3);
      droppedEventCount = Math.max(droppedEventCount, Math.max(0, Number(stored.droppedEventCount || 0))) + expiredCount + overflowCount;
      loadInstallationState().telemetryDroppedCount = droppedEventCount;
      writeJsonAtomic(queueFilePath(), {
        userId,
        events: queue,
        droppedEventCount
      });
      saveInstallationState();
    }
  } catch {}
}
function persistQueue() {
  const userId = queueOwnerUserId;
  if (!userId) return;
  try {
    writeJsonAtomic(queueFilePath(), {
      userId,
      events: queue,
      droppedEventCount
    });
    saveInstallationState();
  } catch {}
}
/**
* 除 initializeInstallationTelemetry 外的调用方都不知道当前是不是首次启动，
* 不传参创建时 migratedExistingInstall 置 null，留给首启判定落锤；
* 若直接写死 true，先到的调用会把新装误判成老安装，导致首次启动上报被永久抑制。
*/
function loadInstallationState(firstLaunch) {
  if (installationState) return installationState;
  try {
    const stored = JSON.parse(readFileSync(installationFilePath(), "utf8"));
    if (typeof stored.installationId === "string" && stored.installationId.length >= 16) {
      if (typeof stored.migratedExistingInstall !== "boolean") stored.migratedExistingInstall = null;
      stored.telemetryDroppedCount = Math.max(0, Number(stored.telemetryDroppedCount || 0));
      stored.telemetryEnqueuedCount = Math.max(0, Number(stored.telemetryEnqueuedCount || 0));
      stored.telemetrySuccessfulBatchCount = Math.max(0, Number(stored.telemetrySuccessfulBatchCount || 0));
      stored.telemetryFailedBatchCount = Math.max(0, Number(stored.telemetryFailedBatchCount || 0));
      stored.telemetryRetryCount = Math.max(0, Number(stored.telemetryRetryCount || 0));
      installationState = stored;
      return stored;
    }
  } catch {}
  installationState = {
    installationId: crypto.randomUUID(),
    createdAt: (/* @__PURE__ */new Date()).toISOString(),
    migratedExistingInstall: firstLaunch === undefined ? null : !firstLaunch,
    firstLaunchReportedAt: null,
    attributionClaimedAt: null,
    attributionTokenHash: null,
    telemetryDroppedCount: 0,
    telemetryEnqueuedCount: 0,
    telemetrySuccessfulBatchCount: 0,
    telemetryFailedBatchCount: 0,
    telemetryRetryCount: 0
  };
  try {
    writeJsonAtomic(installationFilePath(), installationState);
  } catch {}
  return installationState;
}
function saveInstallationState() {
  if (!installationState) return;
  try {
    writeJsonAtomic(installationFilePath(), installationState);
  } catch {}
}
function safeProperties(input) {
  if (!input) return undefined;
  const result = {};
  for (const [rawKey, value] of Object.entries(input).slice(0, 32)) {
    const key = rawKey.trim().slice(0, 64);
    if (!key) continue;
    if (value === null || typeof value === "number" || typeof value === "boolean") result[key] = value;else if (typeof value === "string") result[key] = value.slice(0, 256);
  }
  return Object.keys(result).length > 0 ? result : undefined;
}
function summarizeTelemetryBody(body) {
  if (!body || typeof body !== "object") return {};
  const record = body;
  return {
    eventCount: Array.isArray(record.events) ? record.events.length : undefined,
    hasDevice: Boolean(record.device)
  };
}
function safeCount(safe) {
  try {
    return safe();
  } catch {
    return 0;
  }
}
function safeOsVersion() {
  try {
    return os.version();
  } catch {
    return os.release();
  }
}
function collectDeviceDescriptor() {
  const settings = settingsService.getSettings();
  const cpus = os.cpus();
  const language = settingsRepository.getSettings().language || "zh-CN";
  return {
    deviceId: settings.deviceId,
    installationId: loadInstallationState().installationId,
    deviceName: "",
    osUsername: "",
    platform: process.platform,
    osType: os.type(),
    osRelease: os.release(),
    osVersion: safeOsVersion(),
    arch: process.arch,
    cpuModel: cpus[0]?.model?.trim() ?? "",
    cpuCount: cpus.length,
    totalMemory: os.totalmem(),
    locale: app.getLocale(),
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    language,
    appVersion: app.getVersion(),
    recordCount: safeCount(() => workRecordRepository.count()),
    reportCount: safeCount(() => reportRepository.count()),
    telemetryQueueSize: queue.length,
    telemetryDroppedCount: droppedEventCount,
    telemetryEnqueuedCount: loadInstallationState().telemetryEnqueuedCount,
    telemetrySuccessfulBatchCount: loadInstallationState().telemetrySuccessfulBatchCount,
    telemetryFailedBatchCount: loadInstallationState().telemetryFailedBatchCount,
    telemetryRetryCount: loadInstallationState().telemetryRetryCount
  };
}
function isUnauthorized(status, errorCode) {
  return status === 401 || errorCode === "UNAUTHORIZED" || errorCode === "DEVICE_MISMATCH";
}
async function postAuthed(path, body) {
  const session = authRepository.getSession();
  if (!session?.token) return {
    ok: false,
    status: 0
  };
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);
  const url = `${API_BASE}/${path}`;
  const startedAt = Date.now();
  let responseText = "";
  let httpStatus;
  let businessCode;
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session.token}`
      },
      body: JSON.stringify(body),
      signal: controller.signal
    });
    httpStatus = response.status;
    responseText = await response.text();
    const payload = responseText ? JSON.parse(responseText) : null;
    const errorCode = payload?.error?.code;
    businessCode = errorCode;
    if (isUnauthorized(response.status, errorCode)) return {
      ok: false,
      status: 401
    };
    const ok = response.ok && payload?.ok === true;
    if (!ok) reportApiRequestException({
      source: "main",
      module: "telemetry",
      action: path.replace(/\.php$/i, ""),
      method: "POST",
      url,
      errorName: "ApiResponseError",
      errorMessage: payload?.error?.code || `HTTP ${response.status}`,
      httpStatus,
      businessCode,
      responseText,
      requestBody: summarizeTelemetryBody(body),
      durationMs: Date.now() - startedAt,
      timeoutMs: REQUEST_TIMEOUT_MS,
      dedupeMs: 6e5
    });
    return {
      ok,
      status: response.status,
      accepted: payload?.data?.accepted,
      duplicate: payload?.data?.duplicate,
      rejected: payload?.data?.rejected
    };
  } catch (error) {
    reportApiRequestException({
      source: "main",
      module: "telemetry",
      action: path.replace(/\.php$/i, ""),
      method: "POST",
      url,
      error,
      httpStatus,
      businessCode,
      responseText,
      requestBody: summarizeTelemetryBody(body),
      durationMs: Date.now() - startedAt,
      timeoutMs: REQUEST_TIMEOUT_MS,
      context: {
        aborted: controller.signal.aborted
      },
      dedupeMs: 6e5
    });
    return {
      ok: false,
      status: httpStatus ?? 0
    };
  } finally {
    clearTimeout(timeoutId);
  }
}
function sendForcedLogout(payload) {
  for (const win of BrowserWindow.getAllWindows()) if (!win.isDestroyed()) {
    win.webContents.send("auth:forced-logout", payload);
    win.webContents.send("auth:token-expired");
  }
}
function clearTimers() {
  stopGrowthEvents();
  desktopSyncService.setPulse(undefined);
  running = false;
}
function handleForcedLogout(reason) {
  if (handlingForcedLogout) return;
  handlingForcedLogout = true;
  return;
  clearTimers();
  persistQueue();
  queue = [];
  queueLoaded = false;
  appUsageService.stop();
  authRepository.clearSession();
  authRepository.clearSubscriptionCache();
  switchDatabase(null);
  macActivityEventService.applyRetentionPolicy();
  appUsageService.applyRetentionPolicy();
  if (settingsRepository.getSettings().enableAppUsageTracking) appUsageService.start("forced-logout");
  import("./clipboard-assistant.service.js").then(result => result.n).then(({
    clipboardAssistantService
  }) => clipboardAssistantService.sync());
  import("./screenshot-beautifier.service.js").then(result => result.n).then(({
    screenshotBeautifierService
  }) => screenshotBeautifierService.sync());
  import("../main.js").then(result => result.t).then(({
    enterKeyComponentService
  }) => enterKeyComponentService.startIfEnabled());
  settingsService.syncDockIcon();
  sendForcedLogout({
    reason,
    message: reason === "kicked" ? appText("auth.kickedOffline") : appText("auth.sessionExpiredRelogin")
  });
  systemNotificationService.notifyTokenExpired();
}
function trackEvent(event, actor) {
  if (!event || typeof event.type !== "string" || typeof event.name !== "string") return;
  if (actor !== undefined) try {
    if (!isGrowthEventActorCurrent(actor)) return;
  } catch {
    return;
  }
  if (!authRepository.getSession()?.token) return;
  const occurredAt = event.occurredAt || (event.ts ? new Date(event.ts).toISOString() : (/* @__PURE__ */new Date()).toISOString());
  if (event.name === "report_generate_success" && event.props?.output_nonempty !== false) trackEvent({
    ...event,
    name: "feature_map_report_result",
    eventName: "feature_map_report_result",
    eventId: crypto.randomUUID(),
    props: {
      entry: "report_generation"
    }
  }, actor);
  const journeyName = {
    report_generate_start: "journey_report_start",
    bot_message_sent: "journey_bot_sent",
    bot_message_accepted: "journey_bot_accepted"
  }[event.name];
  if (journeyName) trackEvent({
    ...event,
    name: journeyName,
    eventName: journeyName,
    eventId: crypto.randomUUID(),
    props: {
      entry: event.name,
      report_request_id: event.props?.report_request_id,
      bot_request_id: event.props?.bot_request_id
    }
  }, actor);
  if (recordGrowthEvent({
    ...event,
    occurredAt
  }, actor)) return;
  loadQueueForCurrentUser();
  const settings = settingsService.getSettings();
  queue.push({
    ...event,
    eventId: event.eventId || crypto.randomUUID(),
    eventName: (event.eventName || event.name).slice(0, 96),
    eventSource: "desktop",
    schemaVersion: Math.max(1, event.schemaVersion || 1),
    buildId: BOT_BUILD_ID,
    telemetryVersion: 3,
    isTest: !app.isPackaged,
    occurredAt,
    name: event.name.slice(0, 64),
    page: event.page?.slice(0, 64),
    feature: event.feature?.slice(0, 64),
    elementId: event.elementId?.slice(0, 96),
    installationId: loadInstallationState().installationId,
    deviceId: settings.deviceId,
    appVersion: app.getVersion(),
    platform: process.platform,
    experimentId: event.experimentId?.slice(0, 64),
    variant: event.variant?.slice(0, 64),
    props: event.name.startsWith("bot_") ? sanitizeBotTelemetry({
      ...event.props,
      ...(event.props?.bot_request_id ? {
        task_id: event.props.bot_request_id
      } : {})
    }) : safeProperties(event.props),
    ts: event.ts ?? Date.now()
  });
  loadInstallationState().telemetryEnqueuedCount += 1;
  if (queue.length > QUEUE_CAP) {
    const overflow = queue.length - QUEUE_CAP;
    queue.splice(0, overflow);
    droppedEventCount += overflow;
    loadInstallationState().telemetryDroppedCount = droppedEventCount;
    saveInstallationState();
  }
  persistQueue();
  if (!app.isPackaged) {
    clearTimeout(devFlushTimer);
    devFlushTimer = setTimeout(() => {
      flushTelemetry(1).catch(() => undefined);
    }, 2e3);
  }
}
async function flushTelemetry(remainingBatches = BACKLOG_MAX_BATCHES) {
  if (handlingForcedLogout || queue.length === 0 || flushInFlight) return;
  if (!authRepository.getSession()?.token) return;
  flushInFlight = true;
  const ownerUserId = queueOwnerUserId;
  const ownerToken = authRepository.getSession()?.token;
  const batch = queue.slice(0, FLUSH_BATCH_SIZE);
  const sentAt = (/* @__PURE__ */new Date()).toISOString();
  let shouldContinue = false;
  try {
    const result = await postAuthed("telemetry.php", {
      device: collectDeviceDescriptor(),
      events: batch.map(event => ({
        ...event,
        sentAt
      }))
    });
    if (queueOwnerUserId !== ownerUserId || authRepository.getSession()?.userId !== ownerUserId || authRepository.getSession()?.token !== ownerToken) return;
    if (result.ok) {
      loadInstallationState().telemetrySuccessfulBatchCount += 1;
      saveInstallationState();
      const sent = new Set(batch);
      queue = queue.filter(event => !sent.has(event));
      persistQueue();
      shouldContinue = queue.length > 0;
      return;
    }
    loadInstallationState().telemetryFailedBatchCount += 1;
    loadInstallationState().telemetryRetryCount += 1;
    saveInstallationState();
    if (result.status === 401) handleForcedLogout("kicked");
  } finally {
    flushInFlight = false;
    if (shouldContinue && remainingBatches > 1 && !handlingForcedLogout) flushTelemetry(remainingBatches - 1).catch(() => undefined);
  }
}
var lastCapabilityKey = "";
async function heartbeat() {
  if (handlingForcedLogout || !authRepository.getSession()?.token) return;
  const ownerToken = authRepository.getSession()?.token;
  const capabilityKey = `${authRepository.getSession()?.userId}:${(/* @__PURE__ */new Date()).toISOString().slice(0, 13)}`;
  if (lastCapabilityKey !== capabilityKey) {
    lastCapabilityKey = capabilityKey;
    trackEvent({
      type: "action",
      name: "bot_telemetry_capability",
      feature: "bot-observability",
      props: {}
    });
  }
  if ((await postAuthed("heartbeat.php", {
    device: collectDeviceDescriptor()
  })).status === 401 && authRepository.getSession()?.token === ownerToken) handleForcedLogout("kicked");
}
function startTelemetry() {
  startGrowthEvents();
  if (running || !authRepository.getSession()?.token) return;
  loadQueueForCurrentUser();
  handlingForcedLogout = false;
  running = true;
  heartbeat();
  desktopSyncService.setPulse({
    prepare: () => {
      const ownerToken = authRepository.getSession()?.token;
      const capabilityKey = `${authRepository.getSession()?.userId}:${(/* @__PURE__ */new Date()).toISOString().slice(0, 13)}`;
      if (lastCapabilityKey !== capabilityKey) {
        lastCapabilityKey = capabilityKey;
        trackEvent({
          type: "action",
          name: "bot_telemetry_capability",
          feature: "bot-observability",
          props: {}
        });
      }
      const candidates = !flushInFlight && (queue.length >= FLUSH_BATCH_SIZE || Date.now() - lastBatchAt >= 6e4) ? queue.slice(0, FLUSH_BATCH_SIZE) : [];
      const batch = [];
      let bytes = 0;
      for (const event of candidates) {
        const size = Buffer.byteLength(JSON.stringify(event)) + 64;
        if (batch.length && bytes + size > 131072) break;
        batch.push(event);
        bytes += size;
      }
      return {
        device: collectDeviceDescriptor(),
        events: batch.length ? batch.map(event => ({
          ...event,
          sentAt: (/* @__PURE__ */new Date()).toISOString()
        })) : undefined,
        accept: () => {
          if (!batch.length || authRepository.getSession()?.token !== ownerToken) return;
          const sent = new Set(batch);
          queue = queue.filter(event => !sent.has(event));
          lastBatchAt = Date.now();
          loadInstallationState().telemetrySuccessfulBatchCount += 1;
          persistQueue();
          if (queue.length >= FLUSH_BATCH_SIZE) flushTelemetry().catch(() => undefined);
        }
      };
    },
    fallback: async () => {
      await heartbeat();
      await flushTelemetry();
    },
    unauthorized: () => handleForcedLogout("kicked")
  });
}
function stopTelemetry() {
  clearTimers();
  flushTelemetry();
}
async function logoutTelemetry() {
  const ownerUserId = queueOwnerUserId;
  clearTimers();
  try {
    await flushTelemetry();
    await postAuthed("heartbeat.php", {
      device: collectDeviceDescriptor(),
      offline: true
    });
  } catch {} finally {
    if (queueOwnerUserId === ownerUserId) {
      persistQueue();
      queue = [];
      queueLoaded = false;
      queueOwnerUserId = null;
    }
  }
}
async function postInstallationEvent(eventName, properties, occurredAt) {
  const state = loadInstallationState();
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);
  try {
    const response = await fetch(`${API_BASE}/installation-telemetry.php`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        eventId: crypto.randomUUID(),
        eventName,
        schemaVersion: 1,
        occurredAt: occurredAt || (/* @__PURE__ */new Date()).toISOString(),
        installationId: state.installationId,
        deviceId: settingsService.getSettings().deviceId,
        appVersion: app.getVersion(),
        platform: process.platform,
        arch: process.arch,
        properties
      }),
      signal: controller.signal
    });
    const payload = await response.json();
    return response.ok && payload.ok === true;
  } catch {
    return false;
  } finally {
    clearTimeout(timeoutId);
  }
}
/**
* migratedExistingInstall 被误写成 true 的实例找回：安装实例落盘时本机还没有数据库文件
* （首个 .db 与安装实例几乎同一时刻创建），说明它是被提前调用方误标成老安装的新装，
* 按实例创建时间补报首次启动。真正从旧版本迁移过来的安装，数据库比实例早很多，不会命中。
*/
var FRESH_INSTALL_STATE_DRIFT_MS = 6e5;
function isFreshInstallMarkedMigrated(state) {
  const createdAtMs = Date.parse(state.createdAt);
  if (!Number.isFinite(createdAtMs)) return false;
  try {
    const dataDir = getDatabaseDataDir();
    for (const filename of readdirSync(dataDir)) {
      if (filename !== "xiaohei.db" && !/^user_\d+\.db$/.test(filename)) continue;
      const dbCreatedAtMs = statSync(path.join(dataDir, filename)).birthtimeMs;
      if (dbCreatedAtMs > 0 && Math.abs(dbCreatedAtMs - createdAtMs) <= FRESH_INSTALL_STATE_DRIFT_MS) return true;
    }
  } catch {}
  return false;
}
async function initializeInstallationTelemetry(firstLaunch) {
  const state = loadInstallationState(firstLaunch);
  if (state.migratedExistingInstall === null) {
    state.migratedExistingInstall = !firstLaunch;
    saveInstallationState();
  }
  if (state.firstLaunchReportedAt) return;
  const recoverMisMarkedFreshInstall = state.migratedExistingInstall === true && isFreshInstallMarkedMigrated(state);
  if (state.migratedExistingInstall === true && !recoverMisMarkedFreshInstall) return;
  if (await postInstallationEvent("desktop_first_launch", undefined, recoverMisMarkedFreshInstall ? state.createdAt : undefined)) {
    state.firstLaunchReportedAt = (/* @__PURE__ */new Date()).toISOString();
    saveInstallationState();
  }
}
function getInstallationTelemetryId() {
  return loadInstallationState().installationId;
}
async function claimAttributionToken(token) {
  if (!/^[A-Za-z0-9_-]{20,256}$/.test(token)) return false;
  const state = loadInstallationState();
  const tokenHash = crypto.createHash("sha256").update(token).digest("hex");
  if (state.attributionTokenHash === tokenHash && state.attributionClaimedAt) return true;
  const session = authRepository.getSession();
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);
  try {
    const response = await fetch(`${API_BASE}/download-attribution.php`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(session?.token ? {
          Authorization: `Bearer ${session.token}`
        } : {})
      },
      body: JSON.stringify({
        action: "claim",
        token,
        installationId: state.installationId,
        deviceId: settingsService.getSettings().deviceId,
        appVersion: app.getVersion(),
        platform: process.platform
      }),
      signal: controller.signal
    });
    const payload = await response.json();
    if (!response.ok || payload.ok !== true) return false;
    state.attributionClaimedAt = (/* @__PURE__ */new Date()).toISOString();
    state.attributionTokenHash = tokenHash;
    saveInstallationState();
    return true;
  } catch {
    return false;
  } finally {
    clearTimeout(timeoutId);
  }
}
//#endregion
export { appConfigService as $, WebsitePrivacyCaptureError as A, reportRepository as B, appUsageRepository as C, getForegroundWindowInfo as D, getForegroundWindowDisplayId as E, xiaoheiBotEventLogRepository as F, botErrorCategory as G, getReportDate as H, recordContextOperation as I, AUTO_START_HIDDEN_ARG as J, botModelSource as K, xiaoheiBotMessagePreview as L, systemNotificationService as M, notificationService as N, isForegroundAppAllowListed as O, xiaoheiBotRepository as P, pipelineLog as Q, DEFAULT_XIAOHEI_BOT_ID as R, APP_USAGE_DAY_PERIODS as S, getForegroundAppName as T, getReportDateTimeRange as U, formatReportDateTime as V, normalizeReportDateTime as W, getDefaultScreenshotPrompt as X, settingsService as Y, describeError as Z, mouseHeatmapRepository as _, startTelemetry as a, authRepository as at, macActivityEventService as b, desktopSyncService as c, flushGrowthEventsNow as d, API_BASE as et, isGrowthEventActorCurrent as f, mouseHeatmapService as g, getAppUsageDiagnostics as h, logoutTelemetry as i, logEmptyResponse as it, websitePrivacyService as j, isForegroundAppExcluded as k, desktopReadFetch as l, checkAppUsagePermission as m, getInstallationTelemetryId as n, reportApiRequestException as nt, stopTelemetry as o, appUsageService as p, botToolCategory as q, initializeInstallationTelemetry as r, logClientException as rt, trackEvent as s, claimAttributionToken as t, aiModelConfigService as tt, captureGrowthEventActor as u, screenHeatmapService as v, getForegroundAppInfo as w, activityEvidenceRepository as x, findSameDisplay as y, isProtectedXiaoheiBot as z };