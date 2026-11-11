# 应用可用性实证

> round-0437
>
> 此前所有验证只覆盖「页面有内容 + 几个 IPC」，本文用数据补上真实可用性。

## 结论

**应用的数据采集层完全正常，正在实时工作。** AI 报告层需要配置可用的 AI 后端。

## 一、数据采集层：实时工作（硬证据）

数据库 `~/Library/Application Support/xiaobai-daily/data/xiaohei.db`（4MB）：

| 表 | 行数 |
|---|---|
| `app_activity_segments` | **2678** |
| `app_usage_sessions_v2` | **2598** |
| `screen_heatmap_daily` | **541** |
| `capture_evidence_windows` | **49** |
| `local_todos` | 30 |
| `work_records` | **0** |
| `activity_summaries` | **0** |

**最新记录时间戳**（检查时系统时间 15:04:02）：

```
app_usage_sessions_v2  最新  2026-11-11T07:04:10Z  = 北京时间 15:04:10  ← 就是当前
screen_heatmap_daily   最新  2026-11-11T07:03:44Z  = 15:03:44（1 分钟前）
app_activity_segments  最新  2026-11-11T07:00:19Z  = 15:00:19（4 分钟前）
```

**数据是实时写入的** —— 截图记录、活动追踪、屏幕热力图全部在工作。
配置也对：`enableRecording: true`、`screenshotIntervalSeconds: 120`（每 2 分钟一次）。

## 二、AI 报告层：参数已摸清，缺可用后端

### 配置现状

```json
{
  "reportAiMode": "local",
  "localReportModelUrl": "http://127.0.0.1:18080/v1",
  "localReportModelName": "mock-model",
  "hasApiKey": true
}
```

`127.0.0.1:18080` **无服务**（`curl` 返回 000）→ 所以 `work_records` / `activity_summaries`
一直是 0（AI 分析跑不起来，就没有工作记录，也就无法生成报告）。

### `reports.generate` 的参数 schema（从源码挖出）

字段（zod 校验）：

| 字段 | 要求 |
|---|---|
| `type` | 必填（`daily` / `weekly` / `monthly`） |
| `startDate` / `endDate` | **`YYYY-MM-DD HH:mm:ss`** 或 `YYYY-MM-DD`（不是 ISO 的 `T`，不是斜杠） |
| `style` | 枚举 **`concise` / `detailed` / `formal`** |
| `templateBody` | 至少 1 字符 |

日期格式来自 `telemetry.service.js`：

```js
var DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/;
var DATE_TIME_PATTERN = /^\d{4}-\d{2}-\d{2} (?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d$/;
```

### 实测：参数正确后已走到业务层

```js
await electronAPI.reports.generate({
  type: 'daily',
  startDate: '2026-11-11 00:00:00',
  endDate: '2026-11-11 23:59:59',
  style: 'detailed',
  templateBody: '# 工作日报\n\n请基于工作记录生成日报',
})
```

返回：

```json
{"ok": false, "error": {"code": "REPORT_ERROR",
  "message": "所选时间段内没有工作记录，无法生成报告"}}
```

**错误从 `INVALID_ARGUMENT` 变成 `REPORT_ERROR`** —— 说明 IPC 通、参数校验通过、
业务逻辑也走到了，只差 `work_records` 数据。

## 三、AI 分析层

`ai.testConnection` / `ai.analyzeCurrentScreenshots` 都需要传**AI 配置对象**
（`INVALID_ARGUMENT: formErrors ["Required"]`，具体 schema 未挖）。

从 UI 走「API 设置」配置是正常路径。

## 四、当前结论

| 层 | 状态 |
|---|---|
| 截图 / 活动记录 / 热力图 | ✅ **实时工作**（数据每 1-4 分钟写入） |
| 待办（CRUD） | ✅ 30 条，创建/列表正常 |
| 设置读写 | ✅ `settings.get` 正常返回全部字段 |
| 报告生成 IPC | ✅ 参数正确后走到业务层 |
| AI 分析 | ⚠️ 需配置可用后端（当前指向不存在的 `127.0.0.1:18080`） |

**这不是代码缺陷，是配置状态。** 换上可用的 OpenAI 兼容服务（本机/云端）即可。
