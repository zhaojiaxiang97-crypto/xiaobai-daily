import { createRequire as __nodeCreateRequire } from "node:module";
__nodeCreateRequire(import.meta.url);
import { Mt as getDatabase, k as resolveAiMode, n as settingsRepository } from "./settings.repository-DnN-jwx0.js";
import { n as appText } from "./app-language-D20gdHrZ.js";
import crypto from "node:crypto";
function supportsTimelineSummary(settings) {
	return [
		"local",
		"custom",
		"subscription"
	].includes(resolveAiMode(settings, "screenshot"));
}
function isTimelineSummaryEnabled(settings) {
	return settings.enableTimelineSummary !== false && supportsTimelineSummary(settings);
}
function timelineSummaryCount(settings) {
	const count = settings.timelineSummaryRecordCount;
	return Number.isInteger(count) && count >= 2 && count <= 1e3 ? count : 50;
}
//#endregion
//#region shared/utils/work-record-text-replace.ts
function pattern(find, caseSensitive) {
	const escaped = find.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
	return new RegExp(escaped, caseSensitive ? "g" : "gi");
}
function occurrences(value, find, caseSensitive) {
	if (!find) return [];
	return [...value.matchAll(pattern(find, caseSensitive))];
}
function replaceEvery(value, find, replacement, caseSensitive) {
	return value.replace(pattern(find, caseSensitive), () => replacement);
}
function replaceOccurrence(value, find, replacement, caseSensitive, index) {
	const match = occurrences(value, find, caseSensitive)[index];
	if (!match || match.index === void 0) return value;
	return value.slice(0, match.index) + replacement + value.slice(match.index + match[0].length);
}
function listWorkRecordTextMatches(record, find, caseSensitive, replacement) {
	if (!find) return [];
	const fields = [["summary", record.summary]];
	if (typeof record.details?.title === "string") fields.push(["title", record.details.title]);
	return fields.flatMap(([field, value]) => occurrences(value, find, caseSensitive).filter((match) => replacement === void 0 || match[0] !== replacement).map((match) => {
		const start = match.index ?? 0;
		const contextStart = Math.max(0, start - 28);
		const contextEnd = Math.min(value.length, start + match[0].length + 40);
		return {
			field,
			start,
			text: match[0],
			before: `${contextStart ? "…" : ""}${value.slice(contextStart, start).replace(/\s+/g, " ")}`,
			after: `${value.slice(start + match[0].length, contextEnd).replace(/\s+/g, " ")}${contextEnd < value.length ? "…" : ""}`
		};
	}));
}
function replaceWorkRecordText(record, find, replacement, caseSensitive, selected) {
	const matches = listWorkRecordTextMatches(record, find, caseSensitive, replacement);
	const selectedMatch = selected ? matches.find((match) => match.field === selected.field && match.start === selected.start) : void 0;
	if (!matches.length || selected && !selectedMatch) return {
		changed: false,
		summary: record.summary,
		details: record.details,
		matchCount: 0
	};
	let summary = record.summary;
	const details = record.details ? { ...record.details } : null;
	if (!selected) {
		const hasSummaryMatch = matches.some((match) => match.field === "summary");
		const hasTitleMatch = matches.some((match) => match.field === "title");
		if (hasSummaryMatch) summary = replaceEvery(summary, find, replacement, caseSensitive);
		if (details) {
			if (hasTitleMatch && typeof details.title === "string") details.title = replaceEvery(details.title, find, replacement, caseSensitive);
			if (hasSummaryMatch) for (const field of ["richContent", "preview"]) {
				const value = details[field];
				if (typeof value === "string") details[field] = replaceEvery(value, find, replacement, caseSensitive);
			}
		}
		return {
			changed: true,
			summary,
			details,
			matchCount: matches.length
		};
	}
	if (selected.field === "title") {
		if (details && typeof details.title === "string") {
			const index = occurrences(details.title, find, caseSensitive).findIndex((match) => match.index === selected.start);
			details.title = replaceOccurrence(details.title, find, replacement, caseSensitive, index);
		}
	} else {
		const index = occurrences(summary, find, caseSensitive).findIndex((match) => match.index === selected.start);
		summary = replaceOccurrence(summary, find, replacement, caseSensitive, index);
		if (details) for (const field of ["richContent", "preview"]) {
			const value = details[field];
			if (typeof value === "string") details[field] = value === record.summary ? summary : replaceOccurrence(value, find, replacement, caseSensitive, index);
		}
	}
	return {
		changed: true,
		summary,
		details,
		matchCount: 1
	};
}
//#endregion
//#region electron/repositories/work-record.repository.ts
function appendSourceFilter(conditions, params, filter) {
	if (filter.source) {
		conditions.push("source = ?");
		params.push(filter.source);
	}
	if (filter.excludeSummary) conditions.push("source <> 'summary'");
}
function parseDetails(detailsJson) {
	if (!detailsJson) return null;
	try {
		const details = JSON.parse(detailsJson);
		return details && typeof details === "object" && !Array.isArray(details) ? details : null;
	} catch {
		return null;
	}
}
function mapRow(row) {
	return {
		id: row.id,
		startedAt: row.started_at,
		endedAt: row.ended_at,
		category: row.category,
		summary: row.summary,
		details: parseDetails(row.details_json),
		confidence: row.confidence,
		source: row.source,
		screenshotPath: row.screenshot_path,
		createdAt: row.created_at,
		updatedAt: row.updated_at
	};
}
var WorkRecordRepository = class {
	replaceText(input) {
		const db = getDatabase();
		const find = db.prepare("SELECT * FROM work_records WHERE id = ?");
		const update = db.prepare("UPDATE work_records SET summary = ?, details_json = ?, updated_at = ? WHERE id = ? AND updated_at = ?");
		let recordCount = 0;
		let matchCount = 0;
		let updatedRecord;
		db.exec("SAVEPOINT work_record_text_replace");
		try {
			for (const target of input.targets) {
				const row = find.get(target.id);
				if (!row || row.updated_at !== target.updatedAt) throw new Error(appText("ipcErrors.replaceRecordChanged"));
				const result = replaceWorkRecordText(mapRow(row), input.find, input.replacement, input.caseSensitive, input.mode === "single" ? input.selected : void 0);
				if (!result.changed) throw new Error(appText("ipcErrors.replacePreviewExpired"));
				if (!result.summary.trim()) throw new Error(appText("ipcErrors.replaceEmptyRecord"));
				const updatedAt = new Date(Math.max(Date.now(), Date.parse(row.updated_at) + 1)).toISOString();
				if (update.run(result.summary, result.details ? JSON.stringify(result.details) : null, updatedAt, target.id, target.updatedAt).changes !== 1) throw new Error(appText("ipcErrors.replaceRecordChanged"));
				recordCount += 1;
				matchCount += result.matchCount;
				if (input.mode === "single") updatedRecord = {
					...mapRow(row),
					summary: result.summary,
					details: result.details,
					updatedAt
				};
			}
			db.exec("RELEASE work_record_text_replace");
			return {
				recordCount,
				matchCount,
				updatedRecord
			};
		} catch (error) {
			db.exec("ROLLBACK TO work_record_text_replace; RELEASE work_record_text_replace");
			throw error;
		}
	}
	listByRange(startedAt, endedAt, keyword, limit = 1e4, filter = {}) {
		const conditions = ["started_at < ?", "ended_at > ?"];
		const params = [endedAt, startedAt];
		if (keyword?.trim()) {
			conditions.push("(summary LIKE ? OR category LIKE ?)");
			params.push(`%${keyword.trim()}%`, `%${keyword.trim()}%`);
		}
		appendSourceFilter(conditions, params, filter);
		params.push(limit);
		return getDatabase().prepare(`SELECT * FROM work_records WHERE ${conditions.join(" AND ")}
      ORDER BY ended_at DESC, created_at DESC, id DESC LIMIT ?`).all(...params).map(mapRow);
	}
	listPageByRange(input) {
		const conditions = ["started_at < ?", "ended_at > ?"];
		const params = [input.endedAt, input.startedAt];
		const keyword = input.keyword?.trim();
		if (keyword) {
			const likePattern = `%${keyword}%`;
			conditions.push("(summary LIKE ? OR category LIKE ? OR details_json LIKE ?)");
			params.push(likePattern, likePattern, likePattern);
		}
		appendSourceFilter(conditions, params, input);
		if (input.cursor) {
			conditions.push(`(
        ended_at < ?
        OR (ended_at = ? AND created_at < ?)
        OR (ended_at = ? AND created_at = ? AND id < ?)
      )`);
			params.push(input.cursor.endedAt, input.cursor.endedAt, input.cursor.createdAt, input.cursor.endedAt, input.cursor.createdAt, input.cursor.id);
		}
		params.push(input.limit);
		return getDatabase().prepare(`
        SELECT *
        FROM work_records
        WHERE ${conditions.join(" AND ")}
        ORDER BY ended_at DESC, created_at DESC, id DESC
        LIMIT ?
      `).all(...params).map(mapRow);
	}
	countByRange(startedAt, endedAt, keyword, filter = {}) {
		const conditions = ["started_at < ?", "ended_at > ?"];
		const params = [endedAt, startedAt];
		appendSourceFilter(conditions, params, filter);
		const normalizedKeyword = keyword?.trim();
		if (normalizedKeyword) {
			const likePattern = `%${normalizedKeyword}%`;
			conditions.push("(summary LIKE ? OR category LIKE ? OR details_json LIKE ?)");
			params.push(likePattern, likePattern, likePattern);
		}
		return getDatabase().prepare(`
        SELECT COUNT(*) AS total
        FROM work_records
        WHERE ${conditions.join(" AND ")}
      `).get(...params)?.total ?? 0;
	}
	count() {
		return getDatabase().prepare("SELECT COUNT(*) AS total FROM work_records WHERE source <> 'summary'").get()?.total ?? 0;
	}
	/** 剪贴板同步时间线去重：某时刻之后是否已写过同一内容 */
	hasClipboardRecordSince(contentHash, sinceIso) {
		return getDatabase().prepare(`
        SELECT 1 AS matched
        FROM work_records
        WHERE source = 'clipboard'
          AND started_at >= ?
          AND json_valid(details_json)
          AND json_extract(details_json, '$.contentHash') = ?
        LIMIT 1
      `).get(sinceIso, contentHash)?.matched === 1;
	}
	countNonImported() {
		return getDatabase().prepare("SELECT COUNT(*) AS total FROM work_records WHERE source NOT IN ('import', 'summary')").get()?.total ?? 0;
	}
	getEarliestStartedAt() {
		return getDatabase().prepare("SELECT MIN(started_at) AS earliest FROM work_records").get()?.earliest ?? null;
	}
	/**
	* 指定时间之后被创建/修改过的记录所在的本地日期，用于增量重传涉及的日期。
	* 直接按日期去重：关闭同步几天后再打开，变更记录可能上千条，但日期只有几个，不能按条数截断而漏掉日期。
	*/
	listLocalDatesUpdatedSince(sinceIso) {
		return getDatabase().prepare(`
        SELECT DISTINCT date(started_at, 'localtime') AS day
        FROM work_records
        WHERE updated_at > ?
      `).all(sinceIso).flatMap((row) => row.day ? [row.day] : []);
	}
	/** 指定时间之后有记录的本地日期（不含 AI 汇总记录），用于计算连续记录天数 */
	listLocalRecordDatesSince(sinceIso) {
		return getDatabase().prepare(`
        SELECT DISTINCT date(started_at, 'localtime') AS day
        FROM work_records
        WHERE started_at >= ? AND source <> 'summary'
      `).all(sinceIso).flatMap((row) => row.day ? [row.day] : []);
	}
	listUpdatedSince(sinceIso, limit = 500) {
		return getDatabase().prepare(`
        SELECT *
        FROM work_records
        WHERE updated_at > ?
        ORDER BY updated_at ASC, id ASC
        LIMIT ?
      `).all(sinceIso, limit).map(mapRow);
	}
	getAllCategories() {
		return getDatabase().prepare("SELECT DISTINCT category FROM work_records ORDER BY category").all().map((row) => row.category);
	}
	findLatestBySources(sources) {
		if (sources.length === 0) return null;
		const placeholders = sources.map(() => "?").join(", ");
		const row = getDatabase().prepare(`
        SELECT *
        FROM work_records
        WHERE source IN (${placeholders})
        ORDER BY ended_at DESC, created_at DESC
        LIMIT 1
      `).get(...sources);
		return row ? mapRow(row) : null;
	}
	updateEndedAt(id, endedAt, details) {
		if (details !== void 0) {
			getDatabase().prepare("UPDATE work_records SET ended_at = ?, details_json = ?, updated_at = ? WHERE id = ?").run(endedAt, details ? JSON.stringify(details) : null, (/* @__PURE__ */ new Date()).toISOString(), id);
			return;
		}
		getDatabase().prepare("UPDATE work_records SET ended_at = ?, updated_at = ? WHERE id = ?").run(endedAt, (/* @__PURE__ */ new Date()).toISOString(), id);
	}
	findById(id) {
		const row = getDatabase().prepare("SELECT * FROM work_records WHERE id = ?").get(id);
		return row ? mapRow(row) : null;
	}
	updateCategory(id, category) {
		getDatabase().prepare("UPDATE work_records SET category = ?, updated_at = ? WHERE id = ?").run(category, (/* @__PURE__ */ new Date()).toISOString(), id);
	}
	update(id, category, summary, details, startedAt, endedAt) {
		const fields = ["category = ?", "summary = ?"];
		const values = [category, summary];
		if (details !== void 0) {
			fields.push("details_json = ?");
			values.push(details ? JSON.stringify(details) : null);
		}
		if (startedAt !== void 0) {
			fields.push("started_at = ?");
			values.push(startedAt);
		}
		if (endedAt !== void 0) {
			fields.push("ended_at = ?");
			values.push(endedAt);
		}
		fields.push("updated_at = ?");
		values.push((/* @__PURE__ */ new Date()).toISOString());
		values.push(id);
		getDatabase().prepare(`UPDATE work_records SET ${fields.join(", ")} WHERE id = ?`).run(...values);
	}
	updateScreenshotPath(id, screenshotPath) {
		getDatabase().prepare("UPDATE work_records SET screenshot_path = ?, updated_at = ? WHERE id = ?").run(screenshotPath, (/* @__PURE__ */ new Date()).toISOString(), id);
	}
	create(input) {
		const now = (/* @__PURE__ */ new Date()).toISOString();
		const id = input.id ?? crypto.randomUUID();
		const source = input.source ?? "screenshot";
		const db = getDatabase();
		const enqueue = source !== "summary" && source !== "import" && source !== "clipboard" && isTimelineSummaryEnabled(settingsRepository.getSettings());
		db.exec("SAVEPOINT work_record_create");
		try {
			db.prepare(`
        INSERT INTO work_records (
          id,
          started_at,
          ended_at,
          category,
          summary,
          details_json,
          confidence,
          source,
          screenshot_path,
          created_at,
          updated_at
        )
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `).run(id, input.startedAt, input.endedAt, input.category, input.summary, input.details ? JSON.stringify(input.details) : null, input.confidence ?? null, source, input.screenshotPath ?? null, now, now);
			if (enqueue) db.prepare("INSERT OR IGNORE INTO timeline_summary_queue (record_id) VALUES (?)").run(id);
			db.exec("RELEASE work_record_create");
		} catch (error) {
			db.exec("ROLLBACK TO work_record_create; RELEASE work_record_create");
			throw error;
		}
		return {
			id,
			startedAt: input.startedAt,
			endedAt: input.endedAt,
			category: input.category,
			summary: input.summary,
			details: input.details ?? null,
			confidence: input.confidence ?? null,
			source,
			screenshotPath: input.screenshotPath ?? null,
			createdAt: now,
			updatedAt: now
		};
	}
	delete(id) {
		getDatabase().prepare("DELETE FROM work_records WHERE id = ?").run(id);
	}
	batchCreate(inputs) {
		if (inputs.length === 0) return [];
		const db = getDatabase();
		const now = (/* @__PURE__ */ new Date()).toISOString();
		const insert = db.prepare(`
      INSERT INTO work_records (
        id,
        started_at,
        ended_at,
        category,
        summary,
        details_json,
        confidence,
        source,
        screenshot_path,
        created_at,
        updated_at
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);
		const records = [];
		const enqueue = isTimelineSummaryEnabled(settingsRepository.getSettings());
		db.exec("BEGIN");
		try {
			for (const input of inputs) {
				const id = input.id ?? crypto.randomUUID();
				const source = input.source ?? "screenshot";
				insert.run(id, input.startedAt, input.endedAt, input.category, input.summary, input.details ? JSON.stringify(input.details) : null, input.confidence ?? null, source, input.screenshotPath ?? null, now, now);
				if (enqueue && source !== "import" && source !== "summary") db.prepare("INSERT OR IGNORE INTO timeline_summary_queue (record_id) VALUES (?)").run(id);
				records.push({
					id,
					startedAt: input.startedAt,
					endedAt: input.endedAt,
					category: input.category,
					summary: input.summary,
					details: input.details ?? null,
					confidence: input.confidence ?? null,
					source,
					screenshotPath: input.screenshotPath ?? null,
					createdAt: now,
					updatedAt: now
				});
			}
			db.exec("COMMIT");
		} catch (error) {
			db.exec("ROLLBACK");
			throw error;
		}
		return records;
	}
};
var workRecordRepository = new WorkRecordRepository();
//#endregion
export { timelineSummaryCount as i, isTimelineSummaryEnabled as n, supportsTimelineSummary as r, workRecordRepository as t };
