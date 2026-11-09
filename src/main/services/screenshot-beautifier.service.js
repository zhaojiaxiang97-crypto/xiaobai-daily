import { createRequire as __nodeCreateRequire } from "node:module";
__nodeCreateRequire(import.meta.url);
import { n as __exportAll } from "../lib/rolldown-runtime.js";
import { G as defaultScreenshotBeautifierShortcut, J as normalizeScreenshotStyle, K as normalizeScreenshotAnnotations, Pt as getOpenDatabaseConnection, V as SCREENSHOT_AFTER_CAPTURE_ACTIONS, W as SCREENSHOT_MAX_CANVAS_SIDE, Y as resolveScreenshotBeautifierShortcut, en as resolveClipboardAssistantShortcut, i as t, n as settingsRepository, q as normalizeScreenshotShortcut } from "./settings.repository.js";
import { t as nativeActiveContextCollectorService } from "./native-active-context-collector.service.js";
import { n as appText, t as appLanguage } from "../lib/app-language.js";
import { t as sendToLiveWindow } from "./window-messaging.js";
import { createHash, randomBytes } from "node:crypto";
import { BrowserWindow, Menu, app, clipboard, desktopCapturer, dialog, globalShortcut, nativeImage, nativeTheme, screen, shell, systemPreferences } from "electron";
import { existsSync, mkdirSync, mkdtempSync, readFileSync, readdirSync, rmSync, statSync, writeFileSync } from "node:fs";
import path from "node:path";
import { execFile } from "node:child_process";
import { promisify } from "node:util";
//#region electron/services/screenshot-beautifier-history.ts
var THUMBNAIL_MAX_WIDTH = 360;
var THUMBNAIL_MAX_HEIGHT = 240;
var ID_PATTERN = /^[a-z0-9]{6,16}-[a-f0-9]{8}$/;
function createId() {
	return `${Date.now().toString(36)}-${randomBytes(4).toString("hex")}`;
}
function isScreenshotHistoryId(id) {
	return ID_PATTERN.test(id);
}
/** 生成列表用的小缩略图（JPEG） */
function createScreenshotThumbnail(png) {
	const image = nativeImage.createFromBuffer(png);
	const size = image.getSize();
	if (size.width <= 0 || size.height <= 0) return Buffer.alloc(0);
	const ratio = Math.min(1, THUMBNAIL_MAX_WIDTH / size.width, THUMBNAIL_MAX_HEIGHT / size.height);
	return (ratio < 1 ? image.resize({
		width: Math.max(1, Math.round(size.width * ratio)),
		height: Math.max(1, Math.round(size.height * ratio)),
		quality: "good"
	}) : image).toJPEG(82);
}
/**
* 截图历史：每条一个目录（原图 source.png、缩略图 thumb.jpg、最近一次导出的 output.png、meta.json），
* 按账号分目录存放在 userData 下，只在本机，不进 JSON 备份。
*/
var ScreenshotHistoryStore = class {
	accountKey;
	constructor(accountKey) {
		this.accountKey = accountKey;
	}
	directory() {
		const key = this.accountKey();
		if (!key) return null;
		return path.join(app.getPath("userData"), "screenshot-beautifier", key, "history");
	}
	count() {
		const root = this.directory();
		if (!root || !existsSync(root)) return 0;
		return this.entryIds(root).length;
	}
	list() {
		const root = this.directory();
		if (!root || !existsSync(root)) return [];
		const items = [];
		for (const id of this.entryIds(root)) {
			const meta = this.readMeta(root, id);
			if (!meta) continue;
			let thumbnail = "";
			try {
				thumbnail = `data:image/jpeg;base64,${readFileSync(path.join(root, id, "thumb.jpg")).toString("base64")}`;
			} catch {}
			items.push({
				id,
				createdAt: meta.createdAt,
				updatedAt: meta.updatedAt,
				width: meta.width,
				height: meta.height,
				thumbnail,
				hasOutput: meta.hasOutput,
				origin: meta.origin
			});
		}
		return items.sort((left, right) => right.createdAt.localeCompare(left.createdAt));
	}
	create(input) {
		const root = this.directory();
		if (!root) return null;
		const id = createId();
		const folder = path.join(root, id);
		mkdirSync(folder, { recursive: true });
		const now = (/* @__PURE__ */ new Date()).toISOString();
		const meta = {
			id,
			createdAt: now,
			updatedAt: now,
			width: input.width,
			height: input.height,
			scale: input.scale,
			origin: input.origin,
			style: input.style,
			annotations: [],
			hasOutput: false
		};
		writeFileSync(path.join(folder, "source.png"), input.png);
		writeFileSync(path.join(folder, "thumb.jpg"), createScreenshotThumbnail(input.png));
		writeFileSync(path.join(folder, "meta.json"), JSON.stringify(meta));
		return id;
	}
	load(id) {
		const root = this.directory();
		if (!root || !isScreenshotHistoryId(id)) return null;
		const meta = this.readMeta(root, id);
		if (!meta) return null;
		try {
			return {
				meta,
				png: readFileSync(path.join(root, id, "source.png"))
			};
		} catch {
			return null;
		}
	}
	/** 编辑器里的样式和标注，关窗后下次打开可以接着改 */
	updateState(id, style, annotations) {
		const root = this.directory();
		if (!root || !isScreenshotHistoryId(id)) return;
		const meta = this.readMeta(root, id);
		if (!meta) return;
		meta.style = style;
		meta.annotations = annotations;
		meta.updatedAt = (/* @__PURE__ */ new Date()).toISOString();
		writeFileSync(path.join(root, id, "meta.json"), JSON.stringify(meta));
	}
	/** 保存最近一次复制或保存的成品，历史里的「复制」直接用它；缩略图同步换成成品 */
	writeOutput(id, png) {
		const root = this.directory();
		if (!root || !isScreenshotHistoryId(id)) return;
		const meta = this.readMeta(root, id);
		if (!meta) return;
		writeFileSync(path.join(root, id, "output.png"), png);
		writeFileSync(path.join(root, id, "thumb.jpg"), createScreenshotThumbnail(png));
		meta.hasOutput = true;
		meta.updatedAt = (/* @__PURE__ */ new Date()).toISOString();
		writeFileSync(path.join(root, id, "meta.json"), JSON.stringify(meta));
	}
	/** 有成品时返回成品，否则返回原图 */
	readBest(id) {
		const root = this.directory();
		if (!root || !isScreenshotHistoryId(id)) return null;
		for (const name of ["output.png", "source.png"]) try {
			return readFileSync(path.join(root, id, name));
		} catch {
			continue;
		}
		return null;
	}
	delete(id) {
		const root = this.directory();
		if (!root || !isScreenshotHistoryId(id)) return;
		rmSync(path.join(root, id), {
			recursive: true,
			force: true
		});
	}
	clear() {
		const root = this.directory();
		if (!root || !existsSync(root)) return 0;
		const ids = this.entryIds(root);
		for (const id of ids) rmSync(path.join(root, id), {
			recursive: true,
			force: true
		});
		return ids.length;
	}
	/** 只保留最新的 limit 条；limit 为 0 时全部删除 */
	enforceLimit(limit) {
		const root = this.directory();
		if (!root || !existsSync(root)) return 0;
		const removed = this.entryIds(root).sort().reverse().slice(Math.max(0, limit));
		for (const id of removed) rmSync(path.join(root, id), {
			recursive: true,
			force: true
		});
		return removed.length;
	}
	entryIds(root) {
		try {
			return readdirSync(root, { withFileTypes: true }).filter((entry) => entry.isDirectory() && isScreenshotHistoryId(entry.name)).map((entry) => entry.name);
		} catch {
			return [];
		}
	}
	readMeta(root, id) {
		try {
			const parsed = JSON.parse(readFileSync(path.join(root, id, "meta.json"), "utf8"));
			const width = Number(parsed.width);
			const height = Number(parsed.height);
			if (!Number.isFinite(width) || !Number.isFinite(height) || width <= 0 || height <= 0) return null;
			return {
				id,
				createdAt: typeof parsed.createdAt === "string" ? parsed.createdAt : (/* @__PURE__ */ new Date(0)).toISOString(),
				updatedAt: typeof parsed.updatedAt === "string" ? parsed.updatedAt : (/* @__PURE__ */ new Date(0)).toISOString(),
				width,
				height,
				scale: Number.isFinite(Number(parsed.scale)) && Number(parsed.scale) > 0 ? Number(parsed.scale) : 1,
				origin: parsed.origin === "import" ? "import" : "capture",
				style: normalizeScreenshotStyle(parsed.style),
				annotations: normalizeScreenshotAnnotations(parsed.annotations),
				hasOutput: parsed.hasOutput === true
			};
		} catch {
			return null;
		}
	}
};
//#endregion
//#region electron/services/screenshot-beautifier-ocr.ts
var OCR_TIMEOUT_MS = 3e4;
var UPSCALE_BELOW_PX = 1200;
var MAX_SIDE_PX = 9e3;
var ScreenshotOcrError = class extends Error {
	code;
	constructor(code, message) {
		super(message || code);
		this.code = code;
		this.name = "ScreenshotOcrError";
	}
};
function isScreenshotOcrSupported() {
	return process.platform === "win32" || process.platform === "darwin";
}
var WINDOWS_SCRIPT = String.raw`
$ErrorActionPreference = 'Stop'
Add-Type -AssemblyName System.Runtime.WindowsRuntime
$null = [Windows.Storage.StorageFile, Windows.Storage, ContentType = WindowsRuntime]
$null = [Windows.Media.Ocr.OcrEngine, Windows.Foundation, ContentType = WindowsRuntime]
$null = [Windows.Foundation.IAsyncOperation` + "`" + String.raw`1, Windows.Foundation, ContentType = WindowsRuntime]
$null = [Windows.Graphics.Imaging.SoftwareBitmap, Windows.Foundation, ContentType = WindowsRuntime]
$null = [Windows.Storage.Streams.RandomAccessStream, Windows.Storage.Streams, ContentType = WindowsRuntime]
$asTask = ([System.WindowsRuntimeSystemExtensions].GetMethods() | Where-Object {
  $_.Name -eq 'AsTask' -and $_.GetParameters().Count -eq 1 -and $_.GetParameters()[0].ParameterType.Name -eq 'IAsyncOperation` + "`" + String.raw`1'
})[0]
function Await($operation, [Type]$resultType) {
  $task = $asTask.MakeGenericMethod($resultType).Invoke($null, @($operation))
  $null = $task.Wait(-1)
  $task.Result
}
$engine = [Windows.Media.Ocr.OcrEngine]::TryCreateFromUserProfileLanguages()
if ($null -eq $engine) {
  [Console]::Out.WriteLine('XH_OCR_NO_LANGUAGE')
  exit 3
}
$file = Await ([Windows.Storage.StorageFile]::GetFileFromPathAsync($env:XH_OCR_IMAGE)) ([Windows.Storage.StorageFile])
$stream = Await ($file.OpenAsync([Windows.Storage.FileAccessMode]::Read)) ([Windows.Storage.Streams.IRandomAccessStream])
try {
  $decoder = Await ([Windows.Graphics.Imaging.BitmapDecoder]::CreateAsync($stream)) ([Windows.Graphics.Imaging.BitmapDecoder])
  $bitmap = Await ($decoder.GetSoftwareBitmapAsync()) ([Windows.Graphics.Imaging.SoftwareBitmap])
  $result = Await ($engine.RecognizeAsync($bitmap)) ([Windows.Media.Ocr.OcrResult])
  [Console]::Out.WriteLine('XH_OCR_BEGIN')
  foreach ($line in $result.Lines) {
    [Console]::Out.WriteLine([Convert]::ToBase64String([Text.Encoding]::UTF8.GetBytes($line.Text)))
  }
} finally {
  $stream.Dispose()
}
`;
var MAC_SCRIPT = String.raw`
ObjC.import('Foundation')
ObjC.import('Vision')
function run(argv) {
  const request = $.VNRecognizeTextRequest.alloc.init
  request.setRecognitionLevel(0)
  request.setUsesLanguageCorrection(true)
  const preferred = ['zh-Hans', 'zh-Hant', 'en-US', 'ja-JP', 'ko-KR']
  let languages = preferred
  try {
    const supported = ObjC.deepUnwrap(request.supportedRecognitionLanguagesAndReturnError(null)) || []
    const filtered = preferred.filter(function (language) { return supported.indexOf(language) >= 0 })
    if (filtered.length > 0) languages = filtered
  } catch (error) {}
  try { request.setRecognitionLanguages($(languages)) } catch (error) {}
  const handler = $.VNImageRequestHandler.alloc.initWithURLOptions($.NSURL.fileURLWithPath(argv[0]), $.NSDictionary.dictionary)
  const ok = handler.performRequestsError($.NSArray.arrayWithObject(request), null)
  if (!ok) throw new Error('XH_OCR_FAILED')
  const results = request.results
  const count = results ? results.count : 0
  const lines = []
  for (let index = 0; index < count; index += 1) {
    const observation = results.objectAtIndex(index)
    const candidates = observation.topCandidates(1)
    if (!candidates || candidates.count === 0) continue
    let top = 0
    let left = 0
    try {
      const box = observation.boundingBox
      top = 1 - (box.origin.y + box.size.height)
      left = box.origin.x
    } catch (error) {}
    lines.push({ text: candidates.objectAtIndex(0).string.js, top: top, left: left })
  }
  lines.sort(function (a, b) { return Math.abs(a.top - b.top) < 0.01 ? a.left - b.left : a.top - b.top })
  return JSON.stringify(lines.map(function (line) { return line.text }))
}
`;
var CJK = "\\u3000-\\u303f\\u3400-\\u4dbf\\u4e00-\\u9fff\\uf900-\\ufaff\\uff00-\\uffef";
var CJK_GAP = new RegExp(`([${CJK}])\\s+(?=[${CJK}])`, "g");
/** Windows 系统 OCR 会在每个汉字之间插空格，去掉汉字与汉字（含全角标点）之间的空白 */
function tidyLine(line) {
	return line.replace(CJK_GAP, "$1").trim();
}
function workDirectory() {
	const folder = path.join(app.getPath("temp"), "xiaohei-screenshot-ocr");
	mkdirSync(folder, { recursive: true });
	return folder;
}
function prepareImage(png) {
	const image = nativeImage.createFromBuffer(png);
	const size = image.getSize();
	if (size.width <= 0 || size.height <= 0) throw new ScreenshotOcrError("failed");
	const longest = Math.max(size.width, size.height);
	let ratio = 1;
	if (longest > MAX_SIDE_PX) ratio = MAX_SIDE_PX / longest;
	else if (process.platform === "win32" && longest < UPSCALE_BELOW_PX) ratio = Math.min(2, MAX_SIDE_PX / longest);
	if (ratio === 1) return png;
	return image.resize({
		width: Math.round(size.width * ratio),
		height: Math.round(size.height * ratio),
		quality: "best"
	}).toPNG();
}
function run(file, args, env) {
	return new Promise((resolve, reject) => {
		execFile(file, args, {
			timeout: OCR_TIMEOUT_MS,
			windowsHide: true,
			maxBuffer: 16777216,
			env
		}, (error, stdout) => {
			if (error && error.killed) {
				reject(new ScreenshotOcrError("timeout"));
				return;
			}
			const code = error && typeof error.code === "number" ? error.code : error ? 1 : 0;
			resolve({
				stdout: String(stdout || ""),
				code
			});
		});
	});
}
async function recognizeOnWindows(imagePath) {
	const encoded = Buffer.from(WINDOWS_SCRIPT, "utf16le").toString("base64");
	const systemRoot = process.env.SystemRoot || "C:\\Windows";
	const { stdout, code } = await run(path.join(systemRoot, "System32", "WindowsPowerShell", "v1.0", "powershell.exe"), [
		"-NoProfile",
		"-NonInteractive",
		"-ExecutionPolicy",
		"Bypass",
		"-EncodedCommand",
		encoded
	], {
		...process.env,
		XH_OCR_IMAGE: imagePath
	});
	const lines = stdout.split(/\r?\n/).map((line) => line.trim()).filter(Boolean);
	if (lines.includes("XH_OCR_NO_LANGUAGE")) throw new ScreenshotOcrError("no-language");
	const begin = lines.indexOf("XH_OCR_BEGIN");
	if (begin < 0) throw new ScreenshotOcrError("failed", `exit ${code}`);
	return lines.slice(begin + 1).map((line) => tidyLine(Buffer.from(line, "base64").toString("utf8")));
}
async function recognizeOnMac(imagePath) {
	const scriptPath = path.join(workDirectory(), "vision-ocr.js");
	writeFileSync(scriptPath, MAC_SCRIPT);
	const { stdout, code } = await run("/usr/bin/osascript", [
		"-l",
		"JavaScript",
		scriptPath,
		imagePath
	]);
	const text = stdout.trim();
	if (!text.startsWith("[")) throw new ScreenshotOcrError("failed", `exit ${code}`);
	const parsed = JSON.parse(text);
	if (!Array.isArray(parsed)) throw new ScreenshotOcrError("failed");
	return parsed.filter((line) => typeof line === "string").map((line) => line.trim());
}
/** 在本机识别图片里的文字，不上传、不消耗积分 */
async function recognizeScreenshotText(png) {
	if (!isScreenshotOcrSupported()) throw new ScreenshotOcrError("unsupported");
	const imagePath = path.join(workDirectory(), `ocr-${Date.now().toString(36)}-${randomBytes(4).toString("hex")}.png`);
	writeFileSync(imagePath, prepareImage(png));
	try {
		const lines = (process.platform === "win32" ? await recognizeOnWindows(imagePath) : await recognizeOnMac(imagePath)).filter((line) => line.length > 0);
		return {
			text: lines.join("\n"),
			lines
		};
	} finally {
		rmSync(imagePath, { force: true });
	}
}
//#endregion
//#region electron/services/screenshot-tool-window.ts
function screenshotToolWebPreferences(paths) {
	return {
		preload: paths.preloadPath,
		nodeIntegration: false,
		contextIsolation: true,
		sandbox: true,
		webSecurity: true,
		spellcheck: false,
		backgroundThrottling: false
	};
}
function loadScreenshotToolPage(window, paths, route) {
	window.webContents.setWindowOpenHandler(() => ({ action: "deny" }));
	window.webContents.on("will-navigate", (event, navigationUrl) => {
		if (navigationUrl !== (window.webContents.getURL() || "")) event.preventDefault();
	});
	if (paths.devServerUrl) window.loadURL(new URL(`screenshot-tool.html#${route}`, paths.devServerUrl).toString());
	else window.loadFile(paths.rendererPath, { hash: route });
}
/**
* 直接发给截图窗口。页面是否就绪由各服务自己记录（页面挂载好监听后发 screenshot-tool:ready）；
* 不用 sendToLiveWindow：did-finish-load 时 isLoadingMainFrame() 仍为 true，消息会被它丢掉。
*/
function sendToToolWindow(window, channel, payload) {
	try {
		if (window.isDestroyed() || window.webContents.isDestroyed()) return false;
		window.webContents.send(channel, payload);
		return true;
	} catch {
		return false;
	}
}
function screenshotWindowContext() {
	let language = "zh-CN";
	try {
		language = settingsRepository.getSettings().language || "zh-CN";
	} catch {}
	return {
		language,
		dark: nativeTheme.shouldUseDarkColors,
		platform: process.platform
	};
}
//#endregion
//#region electron/services/screenshot-editor-window.service.ts
var DEFAULT_WIDTH = 1200;
var DEFAULT_HEIGHT = 800;
var MIN_WIDTH = 920;
var MIN_HEIGHT = 600;
var IDLE_DESTROY_DELAY_MS$1 = 3e5;
function titleBarColors() {
	return nativeTheme.shouldUseDarkColors ? {
		color: "#18181b",
		symbolColor: "#e4e4e7"
	} : {
		color: "#fafafa",
		symbolColor: "#3f3f46"
	};
}
/**
* 美化编辑器：同一时间只有一个窗口，新截图直接替换内容。关窗只是隐藏，
* 页面同时清掉图片；一段时间不用再销毁窗口，下次打开更快。
*/
var ScreenshotEditorWindowService = class {
	paths = null;
	window = null;
	loaded = false;
	pending = null;
	presented = false;
	quitting = false;
	temporarilyHidden = false;
	idleDestroyTimer = null;
	onHidden = null;
	initialize(paths, onHidden) {
		this.paths = paths;
		this.onHidden = onHidden;
		app.on("before-quit", () => {
			this.quitting = true;
		});
		nativeTheme.on("updated", () => {
			const window = this.window;
			if (!window || window.isDestroyed()) return;
			if (process.platform === "win32") window.setTitleBarOverlay({
				...titleBarColors(),
				height: 48
			});
			if (this.loaded) sendToToolWindow(window, "screenshot-tool:theme", { dark: nativeTheme.shouldUseDarkColors });
		});
	}
	ownsWindow(candidate) {
		return this.window === candidate;
	}
	getWindow() {
		return this.window && !this.window.isDestroyed() ? this.window : null;
	}
	isEditorContents(sender) {
		return Boolean(this.window && !this.window.isDestroyed() && this.window.webContents.id === sender.id);
	}
	/** 页面挂载好、监听已注册：推送等着的截图并显示 */
	markReady(sender) {
		const window = this.window;
		if (!window || window.isDestroyed() || window.webContents.id !== sender.id) return false;
		this.loaded = true;
		const payload = this.pending;
		this.pending = null;
		if (payload) this.reveal(window, payload);
		return true;
	}
	isPresented() {
		return this.presented;
	}
	open(payload) {
		this.clearIdleDestroyTimer();
		this.temporarilyHidden = false;
		const firstOpen = !this.window || this.window.isDestroyed();
		const window = this.ensureWindow();
		if (!firstOpen && !window.isVisible() && !window.isMaximized()) {
			const [width, height] = window.getSize();
			window.setBounds(this.initialBounds(width, height), false);
		}
		this.presented = true;
		if (!this.loaded) {
			this.pending = payload;
			return;
		}
		this.reveal(window, payload);
	}
	/** 截图期间临时藏起编辑器，免得被截进去；截图取消后再恢复 */
	hideTemporarily() {
		const window = this.getWindow();
		if (!window || !this.presented || !window.isVisible()) return false;
		this.temporarilyHidden = true;
		window.hide();
		return true;
	}
	restoreTemporarilyHidden() {
		if (!this.temporarilyHidden) return;
		this.temporarilyHidden = false;
		const window = this.getWindow();
		if (!window || !this.presented) return;
		window.show();
		window.focus();
	}
	hide() {
		const wasPresented = this.presented;
		this.presented = false;
		this.pending = null;
		this.temporarilyHidden = false;
		const window = this.getWindow();
		if (!window) return;
		if (window.isVisible()) window.hide();
		if (this.loaded) sendToToolWindow(window, "screenshot-tool:editor-reset");
		this.scheduleIdleDestroy();
		if (wasPresented) this.onHidden?.();
	}
	dispose() {
		this.quitting = true;
		this.clearIdleDestroyTimer();
		const window = this.window;
		this.window = null;
		this.presented = false;
		if (window && !window.isDestroyed()) window.destroy();
	}
	reveal(window, payload) {
		if (window.isDestroyed() || !this.presented) return;
		sendToToolWindow(window, "screenshot-tool:editor-open", payload);
		if (window.isMinimized()) window.restore();
		window.show();
		window.focus();
		window.webContents.focus();
	}
	initialBounds(preferredWidth = DEFAULT_WIDTH, preferredHeight = DEFAULT_HEIGHT) {
		const workArea = screen.getDisplayNearestPoint(screen.getCursorScreenPoint()).workArea;
		const width = Math.max(Math.min(MIN_WIDTH, workArea.width), Math.min(preferredWidth, workArea.width - 80));
		const height = Math.max(Math.min(MIN_HEIGHT, workArea.height), Math.min(preferredHeight, workArea.height - 80));
		return {
			x: Math.round(workArea.x + (workArea.width - width) / 2),
			y: Math.round(workArea.y + (workArea.height - height) / 2),
			width: Math.round(width),
			height: Math.round(height)
		};
	}
	scheduleIdleDestroy() {
		this.clearIdleDestroyTimer();
		this.idleDestroyTimer = setTimeout(() => {
			this.idleDestroyTimer = null;
			const window = this.window;
			if (this.presented || !window || window.isDestroyed()) return;
			this.window = null;
			this.loaded = false;
			window.destroy();
		}, IDLE_DESTROY_DELAY_MS$1);
	}
	clearIdleDestroyTimer() {
		if (!this.idleDestroyTimer) return;
		clearTimeout(this.idleDestroyTimer);
		this.idleDestroyTimer = null;
	}
	ensureWindow() {
		if (this.window && !this.window.isDestroyed()) return this.window;
		if (!this.paths) throw new Error("截图编辑器尚未初始化");
		const isMac = process.platform === "darwin";
		const isWindows = process.platform === "win32";
		const colors = titleBarColors();
		const window = new BrowserWindow({
			...this.initialBounds(),
			minWidth: MIN_WIDTH,
			minHeight: MIN_HEIGHT,
			show: false,
			backgroundColor: colors.color,
			title: appText("screenshotBeautifier.trayCapture"),
			...isMac ? {
				titleBarStyle: "hiddenInset",
				trafficLightPosition: {
					x: 16,
					y: 16
				}
			} : {},
			...isWindows ? {
				titleBarStyle: "hidden",
				titleBarOverlay: {
					...colors,
					height: 48
				}
			} : {},
			webPreferences: screenshotToolWebPreferences(this.paths)
		});
		this.loaded = false;
		window.webContents.on("did-fail-load", (_event, _code, description, _url, isMainFrame) => {
			if (!isMainFrame) return;
			console.error("[ScreenshotEditor] 编辑器页面加载失败:", description);
			if (!window.isDestroyed()) window.destroy();
		});
		window.webContents.on("render-process-gone", (_event, details) => {
			console.error("[ScreenshotEditor] 编辑器渲染进程退出:", details.reason);
			if (!window.isDestroyed()) window.destroy();
		});
		window.on("close", (event) => {
			if (this.quitting || this.window !== window) return;
			event.preventDefault();
			this.hide();
		});
		window.on("closed", () => {
			if (this.window !== window) return;
			const wasPresented = this.presented;
			this.window = null;
			this.loaded = false;
			this.presented = false;
			this.pending = null;
			if (wasPresented) this.onHidden?.();
		});
		loadScreenshotToolPage(window, this.paths, "editor");
		this.window = window;
		return window;
	}
};
var screenshotEditorWindowService = new ScreenshotEditorWindowService();
var MIN_ZOOM = .1;
var MAX_ZOOM = 5;
var ZOOM_STEP = 1.1;
var MAX_PINS = 30;
var TOAST_THUMB_WIDTH = 272;
var TOAST_FOOTER_HEIGHT = 48;
var TOAST_DURATION_MS = 4500;
var TOAST_RESUME_MS = 2e3;
function clamp(value, min, max) {
	return Math.min(Math.max(value, min), max);
}
/** 钉在桌面上的截图（可以有多张）和截图后右下角的「已复制」提示卡 */
var ScreenshotFloatWindowService = class {
	paths = null;
	handlers = null;
	pins = /* @__PURE__ */ new Map();
	pinSequence = 0;
	toast = null;
	toastLoaded = false;
	toastPending = null;
	toastTimer = null;
	initialize(paths, handlers) {
		this.paths = paths;
		this.handlers = handlers;
	}
	ownsWindow(candidate) {
		if (this.toast === candidate) return true;
		for (const pin of this.pins.values()) if (pin.window === candidate) return true;
		return false;
	}
	/** at 为图片左上角的屏幕坐标（逻辑像素）；不传时放在鼠标所在屏幕的中间 */
	openPin(image, at) {
		if (!this.paths) return;
		if (this.pins.size >= MAX_PINS) {
			const oldest = this.pins.values().next().value;
			if (oldest) this.destroyPin(oldest);
		}
		const baseWidth = image.width / image.scale;
		const baseHeight = image.height / image.scale;
		const anchor = at ?? screen.getCursorScreenPoint();
		const workArea = screen.getDisplayNearestPoint({
			x: Math.round(anchor.x),
			y: Math.round(anchor.y)
		}).workArea;
		const zoom = Math.min(1, workArea.width * .85 / baseWidth, workArea.height * .85 / baseHeight);
		const width = Math.max(1, Math.round(baseWidth * zoom));
		const height = Math.max(1, Math.round(baseHeight * zoom));
		const x = at ? at.x : workArea.x + (workArea.width - width) / 2;
		const y = at ? at.y : workArea.y + (workArea.height - height) / 2;
		const id = ++this.pinSequence;
		const isMac = process.platform === "darwin";
		const window = new BrowserWindow({
			x: Math.round(x - 14),
			y: Math.round(y - 14),
			width: width + 28,
			height: height + 28,
			show: false,
			frame: false,
			transparent: true,
			backgroundColor: "#00000000",
			resizable: false,
			maximizable: false,
			minimizable: false,
			fullscreenable: false,
			skipTaskbar: true,
			alwaysOnTop: true,
			hasShadow: false,
			enableLargerThanScreen: true,
			acceptFirstMouse: true,
			...isMac ? { type: "panel" } : {
				thickFrame: false,
				roundedCorners: false
			},
			webPreferences: screenshotToolWebPreferences(this.paths)
		});
		window.setAlwaysOnTop(true, "floating");
		if (isMac) window.setVisibleOnAllWorkspaces(true, {
			visibleOnFullScreen: true,
			skipTransformProcessType: true
		});
		const entry = {
			...image,
			id,
			window,
			loaded: false,
			zoom,
			drag: null
		};
		window.webContents.on("did-fail-load", (_event, _code, _description, _url, isMainFrame) => {
			if (isMainFrame && !window.isDestroyed()) window.destroy();
		});
		window.webContents.on("render-process-gone", () => {
			if (!window.isDestroyed()) window.destroy();
		});
		window.on("closed", () => {
			if (this.pins.get(id)?.window === window) this.pins.delete(id);
		});
		loadScreenshotToolPage(window, this.paths, "pin");
		this.pins.set(id, entry);
	}
	/** 页面画好图片后再显示，避免闪一下空白 */
	markPinPainted(sender) {
		const pin = this.pinOf(sender);
		if (!pin || pin.window.isVisible()) return;
		pin.window.showInactive();
	}
	startDrag(sender, screenX, screenY) {
		const pin = this.pinOf(sender);
		if (!pin) return;
		const [x, y] = pin.window.getPosition();
		pin.drag = {
			mouseX: screenX,
			mouseY: screenY,
			x,
			y
		};
	}
	moveDrag(sender, screenX, screenY) {
		const pin = this.pinOf(sender);
		if (!pin?.drag) return;
		pin.window.setPosition(Math.round(pin.drag.x + screenX - pin.drag.mouseX), Math.round(pin.drag.y + screenY - pin.drag.mouseY), false);
	}
	endDrag(sender) {
		const pin = this.pinOf(sender);
		if (pin) pin.drag = null;
	}
	/** 滚轮缩放，鼠标所在的图片位置保持不动；anchor 是相对窗口左上角的逻辑像素 */
	zoom(sender, direction, anchorX, anchorY) {
		const pin = this.pinOf(sender);
		if (!pin || pin.drag) return;
		const nextZoom = clamp(direction > 0 ? pin.zoom * ZOOM_STEP : pin.zoom / ZOOM_STEP, MIN_ZOOM, MAX_ZOOM);
		if (nextZoom === pin.zoom) return;
		const bounds = pin.window.getBounds();
		const imageX = (anchorX - 14) / pin.zoom;
		const imageY = (anchorY - 14) / pin.zoom;
		const width = Math.max(1, Math.round(pin.width / pin.scale * nextZoom));
		const height = Math.max(1, Math.round(pin.height / pin.scale * nextZoom));
		pin.zoom = nextZoom;
		pin.window.setBounds({
			x: Math.round(bounds.x + anchorX - 14 - imageX * nextZoom),
			y: Math.round(bounds.y + anchorY - 14 - imageY * nextZoom),
			width: width + 28,
			height: height + 28
		}, false);
		sendToToolWindow(pin.window, "screenshot-tool:pin-zoom", { zoom: nextZoom });
	}
	showPinMenu(sender) {
		const pin = this.pinOf(sender);
		const handlers = this.handlers;
		if (!pin || !handlers) return;
		const labels = handlers.menuLabels();
		const opacity = Math.round(pin.window.getOpacity() * 100);
		const template = [
			{
				label: labels.copy,
				click: () => handlers.copyImage(pin.png)
			},
			{
				label: labels.save,
				click: () => handlers.saveImage(pin.png)
			},
			{
				label: labels.edit,
				click: () => {
					handlers.editImage({
						png: pin.png,
						width: pin.width,
						height: pin.height,
						scale: pin.scale,
						historyId: pin.historyId
					});
					this.destroyPin(pin);
				}
			},
			{ type: "separator" },
			{
				label: labels.opacity,
				submenu: [
					100,
					80,
					60,
					40
				].map((value) => ({
					label: `${value}%`,
					type: "radio",
					checked: Math.abs(opacity - value) < 5,
					click: () => {
						if (!pin.window.isDestroyed()) pin.window.setOpacity(value / 100);
					}
				}))
			},
			{ type: "separator" },
			{
				label: labels.close,
				click: () => this.destroyPin(pin)
			},
			...this.pins.size > 1 ? [{
				label: labels.closeAll,
				click: () => this.closeAllPins()
			}] : []
		];
		Menu.buildFromTemplate(template).popup({ window: pin.window });
	}
	closePin(sender) {
		const pin = this.pinOf(sender);
		if (pin) this.destroyPin(pin);
	}
	closeAllPins() {
		for (const pin of [...this.pins.values()]) this.destroyPin(pin);
	}
	/** 页面挂载好、监听已注册：钉图推送图片，提示卡推送等着的内容并显示 */
	markReady(sender) {
		const pin = this.pinOf(sender);
		if (pin) {
			pin.loaded = true;
			const payload = {
				...screenshotWindowContext(),
				pinId: pin.id,
				image: new Uint8Array(pin.png),
				width: pin.width,
				height: pin.height,
				scale: pin.scale
			};
			sendToToolWindow(pin.window, "screenshot-tool:pin-open", payload);
			return true;
		}
		const toast = this.toast;
		if (!toast || toast.isDestroyed() || toast.webContents.id !== sender.id) return false;
		this.toastLoaded = true;
		const payload = this.toastPending;
		this.toastPending = null;
		if (payload) {
			sendToToolWindow(toast, "screenshot-tool:toast-open", payload);
			toast.showInactive();
		}
		return true;
	}
	isPinContents(sender) {
		return this.pinOf(sender) !== null;
	}
	showToast(payload, display) {
		if (!this.paths) return;
		this.clearToastTimer();
		const thumbHeight = Math.round(clamp(TOAST_THUMB_WIDTH / Math.max(.1, payload.aspect), 96, 176));
		const width = 320;
		const height = 12 + thumbHeight + TOAST_FOOTER_HEIGHT + 24;
		const workArea = display.workArea;
		const bounds = {
			x: Math.round(workArea.x + workArea.width - width - 8),
			y: Math.round(workArea.y + workArea.height - height - 8),
			width,
			height
		};
		const window = this.ensureToast(bounds);
		window.setBounds(bounds, false);
		if (this.toastLoaded) {
			sendToToolWindow(window, "screenshot-tool:toast-open", payload);
			window.showInactive();
		} else this.toastPending = payload;
		this.scheduleToastClose(TOAST_DURATION_MS);
	}
	isToastContents(sender) {
		return Boolean(this.toast && !this.toast.isDestroyed() && this.toast.webContents.id === sender.id);
	}
	setToastHovered(hovered) {
		if (hovered) this.clearToastTimer();
		else this.scheduleToastClose(TOAST_RESUME_MS);
	}
	hideToast() {
		this.clearToastTimer();
		this.toastPending = null;
		const window = this.toast;
		if (window && !window.isDestroyed() && window.isVisible()) window.hide();
	}
	dispose() {
		this.clearToastTimer();
		this.closeAllPins();
		const toast = this.toast;
		this.toast = null;
		if (toast && !toast.isDestroyed()) toast.destroy();
	}
	ensureToast(bounds) {
		if (this.toast && !this.toast.isDestroyed()) return this.toast;
		if (!this.paths) throw new Error("截图提示卡尚未初始化");
		const isMac = process.platform === "darwin";
		const window = new BrowserWindow({
			...bounds,
			show: false,
			frame: false,
			transparent: true,
			backgroundColor: "#00000000",
			resizable: false,
			movable: false,
			maximizable: false,
			minimizable: false,
			fullscreenable: false,
			skipTaskbar: true,
			alwaysOnTop: true,
			hasShadow: false,
			focusable: false,
			acceptFirstMouse: true,
			...isMac ? { type: "panel" } : {
				thickFrame: false,
				roundedCorners: false
			},
			webPreferences: screenshotToolWebPreferences(this.paths)
		});
		window.setAlwaysOnTop(true, "pop-up-menu");
		if (isMac) window.setVisibleOnAllWorkspaces(true, {
			visibleOnFullScreen: true,
			skipTransformProcessType: true
		});
		this.toastLoaded = false;
		window.webContents.on("did-fail-load", (_event, _code, _description, _url, isMainFrame) => {
			if (isMainFrame && !window.isDestroyed()) window.destroy();
		});
		window.webContents.on("render-process-gone", () => {
			if (!window.isDestroyed()) window.destroy();
		});
		window.on("closed", () => {
			if (this.toast !== window) return;
			this.toast = null;
			this.toastLoaded = false;
		});
		loadScreenshotToolPage(window, this.paths, "toast");
		this.toast = window;
		return window;
	}
	scheduleToastClose(delay) {
		this.clearToastTimer();
		this.toastTimer = setTimeout(() => {
			this.toastTimer = null;
			this.hideToast();
		}, delay);
	}
	clearToastTimer() {
		if (!this.toastTimer) return;
		clearTimeout(this.toastTimer);
		this.toastTimer = null;
	}
	pinOf(sender) {
		for (const pin of this.pins.values()) if (!pin.window.isDestroyed() && pin.window.webContents.id === sender.id) return pin;
		return null;
	}
	destroyPin(pin) {
		this.pins.delete(pin.id);
		if (!pin.window.isDestroyed()) pin.window.destroy();
	}
};
var screenshotFloatWindowService = new ScreenshotFloatWindowService();
//#endregion
//#region electron/services/screenshot-overlay-window.service.ts
var IDLE_DESTROY_DELAY_MS = 6e5;
var PRESENT_TIMEOUT_MS = 8e3;
/**
* 截图遮罩：每块屏幕一个全屏窗口，显示截图时冻结的画面，在上面选择区域。
* 先截好全部屏幕再显示遮罩，所以遮罩本身不会被截进去。
*/
var ScreenshotOverlayWindowService = class {
	paths = null;
	handlers = null;
	entries = /* @__PURE__ */ new Map();
	sessionId = 0;
	focusDisplayId = "";
	active = false;
	escapeRegistered = false;
	idleDestroyTimer = null;
	presentTimer = null;
	initialize(paths, handlers) {
		this.paths = paths;
		this.handlers = handlers;
	}
	isActive() {
		return this.active;
	}
	ownsWindow(candidate) {
		for (const entry of this.entries.values()) if (entry.window === candidate) return true;
		return false;
	}
	/** 发消息的遮罩对应哪块屏幕；不是遮罩时返回 null */
	displayIdOf(sender) {
		for (const entry of this.entries.values()) if (!entry.window.isDestroyed() && entry.window.webContents.id === sender.id) return entry.displayId;
		return null;
	}
	present(items, focusDisplayId) {
		this.clearIdleDestroyTimer();
		this.active = true;
		this.sessionId = items[0]?.payload.sessionId ?? 0;
		this.focusDisplayId = focusDisplayId;
		const keep = new Set(items.map((item) => String(item.display.id)));
		for (const [displayId, entry] of this.entries) {
			if (keep.has(displayId)) continue;
			this.entries.delete(displayId);
			if (!entry.window.isDestroyed()) entry.window.destroy();
		}
		for (const { display, payload } of items) {
			const entry = this.ensureEntry(display);
			entry.window.setBounds(display.bounds, false);
			if (entry.loaded) sendToToolWindow(entry.window, "screenshot-tool:overlay-open", payload);
			else entry.pending = payload;
		}
		this.registerEscape();
		this.clearPresentTimer();
		this.presentTimer = setTimeout(() => {
			this.presentTimer = null;
			if (!this.active || this.sessionId !== items[0]?.payload.sessionId) return;
			if ([...this.entries.values()].some((entry) => !entry.window.isDestroyed() && entry.window.isVisible())) return;
			console.warn("[ScreenshotOverlay] 遮罩没有显示出来，放弃这次截图");
			this.handlers?.onLost();
		}, PRESENT_TIMEOUT_MS);
	}
	/** 页面挂载好、监听已注册：推送等着的截图 */
	markReady(sender) {
		const displayId = this.displayIdOf(sender);
		const entry = displayId ? this.entries.get(displayId) : null;
		if (!entry) return false;
		entry.loaded = true;
		const payload = entry.pending;
		entry.pending = null;
		if (payload && this.active && payload.sessionId === this.sessionId) sendToToolWindow(entry.window, "screenshot-tool:overlay-open", payload);
		return true;
	}
	/** 页面画好这次的截图后再显示窗口，避免闪出上一次的画面 */
	markPainted(sender, sessionId) {
		if (!this.active || sessionId !== this.sessionId) return;
		const displayId = this.displayIdOf(sender);
		const entry = displayId ? this.entries.get(displayId) : null;
		if (!entry || entry.window.isDestroyed()) return;
		const { window } = entry;
		const bounds = window.getBounds();
		if (displayId === this.focusDisplayId) {
			if (process.platform === "darwin") window.showInactive();
			else window.show();
			window.focus();
			window.webContents.focus();
		} else window.showInactive();
		window.setBounds(bounds, false);
	}
	/** 鼠标移到哪块屏，就让哪块屏的遮罩接收键盘 */
	focus(sender) {
		const displayId = this.displayIdOf(sender);
		const entry = displayId ? this.entries.get(displayId) : null;
		if (!this.active || !entry || entry.window.isDestroyed() || entry.window.isFocused()) return;
		entry.window.focus();
		entry.window.webContents.focus();
	}
	/** 发给除 sender 以外的其他遮罩，例如一块屏开始框选时让其他屏清掉高亮 */
	broadcast(channel, payload, except) {
		for (const entry of this.entries.values()) {
			if (except && !entry.window.isDestroyed() && entry.window.webContents.id === except.id) continue;
			sendToToolWindow(entry.window, channel, payload);
		}
	}
	hide() {
		if (!this.active) return;
		this.active = false;
		this.unregisterEscape();
		this.clearPresentTimer();
		for (const entry of this.entries.values()) {
			entry.pending = null;
			if (entry.window.isDestroyed()) continue;
			if (entry.window.isVisible()) entry.window.hide();
			if (entry.loaded) sendToToolWindow(entry.window, "screenshot-tool:overlay-reset");
		}
		this.scheduleIdleDestroy();
	}
	dispose() {
		this.active = false;
		this.unregisterEscape();
		this.clearIdleDestroyTimer();
		this.clearPresentTimer();
		for (const entry of this.entries.values()) if (!entry.window.isDestroyed()) entry.window.destroy();
		this.entries.clear();
	}
	registerEscape() {
		if (this.escapeRegistered) return;
		try {
			this.escapeRegistered = globalShortcut.register("Escape", () => this.handlers?.onEscape());
		} catch {
			this.escapeRegistered = false;
		}
	}
	unregisterEscape() {
		if (!this.escapeRegistered) return;
		this.escapeRegistered = false;
		try {
			globalShortcut.unregister("Escape");
		} catch {}
	}
	scheduleIdleDestroy() {
		this.clearIdleDestroyTimer();
		this.idleDestroyTimer = setTimeout(() => {
			this.idleDestroyTimer = null;
			if (this.active) return;
			for (const entry of this.entries.values()) if (!entry.window.isDestroyed()) entry.window.destroy();
			this.entries.clear();
		}, IDLE_DESTROY_DELAY_MS);
	}
	clearPresentTimer() {
		if (!this.presentTimer) return;
		clearTimeout(this.presentTimer);
		this.presentTimer = null;
	}
	clearIdleDestroyTimer() {
		if (!this.idleDestroyTimer) return;
		clearTimeout(this.idleDestroyTimer);
		this.idleDestroyTimer = null;
	}
	ensureEntry(display) {
		const displayId = String(display.id);
		const existing = this.entries.get(displayId);
		if (existing && !existing.window.isDestroyed()) return existing;
		if (!this.paths) throw new Error("截图遮罩尚未初始化");
		const isMac = process.platform === "darwin";
		const window = new BrowserWindow({
			...display.bounds,
			show: false,
			frame: false,
			transparent: false,
			backgroundColor: "#000000",
			resizable: false,
			movable: false,
			minimizable: false,
			maximizable: false,
			fullscreenable: false,
			skipTaskbar: true,
			alwaysOnTop: true,
			hasShadow: false,
			enableLargerThanScreen: true,
			acceptFirstMouse: true,
			roundedCorners: false,
			...isMac ? { type: "panel" } : { thickFrame: false },
			webPreferences: screenshotToolWebPreferences(this.paths)
		});
		window.setAlwaysOnTop(true, "screen-saver");
		if (isMac) {
			window.setVisibleOnAllWorkspaces(true, {
				visibleOnFullScreen: true,
				skipTransformProcessType: true
			});
			window.setHiddenInMissionControl(true);
		}
		const entry = {
			displayId,
			window,
			loaded: false,
			pending: null
		};
		window.webContents.on("did-fail-load", (_event, _code, description, _url, isMainFrame) => {
			if (!isMainFrame) return;
			console.error("[ScreenshotOverlay] 遮罩页面加载失败:", description);
			if (!window.isDestroyed()) window.destroy();
		});
		window.webContents.on("render-process-gone", (_event, details) => {
			console.error("[ScreenshotOverlay] 遮罩渲染进程退出:", details.reason);
			if (!window.isDestroyed()) window.destroy();
		});
		window.on("closed", () => {
			if (this.entries.get(displayId)?.window !== window) return;
			this.entries.delete(displayId);
			if (this.active) this.handlers?.onLost();
		});
		loadScreenshotToolPage(window, this.paths, "overlay");
		this.entries.set(displayId, entry);
		return entry;
	}
};
var screenshotOverlayWindowService = new ScreenshotOverlayWindowService();
function libraryPath() {
	return path.join(app.getPath("userData"), "screenshot-background-library.json");
}
function screenshotBackgroundId(file) {
	return createHash("sha1").update(path.resolve(file).toLowerCase()).digest("hex");
}
function normalizeStored(entry) {
	if (!entry || typeof entry !== "object") return null;
	const source = entry;
	if (typeof source.id !== "string" || typeof source.file !== "string" || typeof source.name !== "string" || typeof source.thumbnail !== "string") return null;
	if (!source.thumbnail.startsWith("data:image/jpeg;base64,")) return null;
	if (!existsSync(source.file)) return null;
	return {
		id: source.id,
		file: source.file,
		name: source.name.slice(0, 200),
		thumbnail: source.thumbnail,
		touchedAt: typeof source.touchedAt === "number" && Number.isFinite(source.touchedAt) ? source.touchedAt : 0
	};
}
function readScreenshotBackgroundLibrary() {
	try {
		const parsed = JSON.parse(readFileSync(libraryPath(), "utf8"));
		if (!Array.isArray(parsed)) return [];
		return parsed.map(normalizeStored).filter((item) => item !== null).sort((a, b) => b.touchedAt - a.touchedAt).slice(0, 48);
	} catch {
		return [];
	}
}
function mergeScreenshotBackgroundLibrary(items, touchIds = []) {
	const now = Date.now();
	const map = /* @__PURE__ */ new Map();
	for (const entry of readScreenshotBackgroundLibrary()) map.set(entry.id, entry);
	for (const item of items) {
		if (!existsSync(item.file)) continue;
		const id = item.id || screenshotBackgroundId(item.file);
		map.set(id, {
			id,
			file: item.file,
			name: item.name,
			thumbnail: item.thumbnail,
			touchedAt: touchIds.includes(id) ? now : map.get(id)?.touchedAt ?? now
		});
	}
	for (const id of touchIds) {
		const entry = map.get(id);
		if (entry) map.set(id, {
			...entry,
			touchedAt: now
		});
	}
	const merged = [...map.values()].sort((a, b) => b.touchedAt - a.touchedAt).slice(0, 48);
	writeFileSync(libraryPath(), JSON.stringify(merged));
	return merged;
}
function toScreenshotBackgroundImages(entries, currentFiles = /* @__PURE__ */ new Set()) {
	return entries.map((entry) => ({
		id: entry.id,
		file: entry.file,
		name: entry.name,
		thumbnail: entry.thumbnail,
		available: true,
		current: currentFiles.has(path.resolve(entry.file).toLowerCase())
	}));
}
//#endregion
//#region electron/services/screenshot-wallpapers.ts
/** 只发现本地文件；调用方必须先完成墙纸读取授权。 */
async function discoverScreenshotWallpapers() {
	if (process.platform === "win32") return discoverWindowsWallpapers();
	return discoverMacOrLinuxWallpapers();
}
async function discoverMacOrLinuxWallpapers() {
	const files = [];
	const candidates = [];
	let currentPaths = [];
	if (process.platform === "darwin") {
		let photoPaths = [];
		try {
			const wallpaper = await nativeActiveContextCollectorService.queryWallpaper();
			currentPaths = wallpaper.paths;
			photoPaths = wallpaper.photoPaths || [];
		} catch {}
		const personalCache = path.join(app.getPath("home"), "Library/Containers/com.apple.wallpaper.extension.image/Data/Library/Caches");
		try {
			for (const entry of readdirSync(personalCache, { withFileTypes: true })) if (entry.isFile() && (/^[a-f0-9-]{36}$/i.test(entry.name) || /\.(png|jpe?g|heic|webp)$/i.test(entry.name))) photoPaths.push(path.join(personalCache, entry.name));
		} catch {}
		for (const file of new Set(photoPaths)) {
			if (!existsSync(file) || !statSync(file).isFile()) continue;
			candidates.push({
				file,
				name: path.extname(file) ? path.basename(file, path.extname(file)) : appText("screenshotBeautifier.personalWallpaper"),
				current: currentPaths.includes(file)
			});
		}
		const aerialRoots = [path.join(app.getPath("home"), "Library/Application Support/com.apple.wallpaper/aerials"), "/Library/Application Support/com.apple.idleassetsd"];
		for (const root of aerialRoots) try {
			const manifestPath = [path.join(root, "manifest/entries.json"), path.join(root, "Customer/entries.json")].find((file) => existsSync(file));
			if (!manifestPath) continue;
			const manifest = JSON.parse(readFileSync(manifestPath, "utf8"));
			let names = {};
			try {
				const table = path.join(path.dirname(manifestPath), "TVIdleScreenStrings.bundle/Contents/Resources/Localizable.nocache.loctable");
				const { stdout } = await promisify(execFile)("/usr/bin/plutil", [
					"-convert",
					"json",
					"-o",
					"-",
					table
				], {
					maxBuffer: 10485760,
					timeout: 5e3
				});
				names = JSON.parse(stdout)[appLanguage().startsWith("zh") ? "zh_CN" : "en"] || {};
			} catch {}
			for (const asset of manifest.assets || []) {
				if (!asset.id || !/^[a-z0-9-]+$/i.test(asset.id)) continue;
				const video = [path.join(root, "videos", `${asset.id}.mov`), path.join(root, "Customer/4KSDR240FPS", `${asset.id}.mov`)].find((file) => existsSync(file));
				const preview = [path.join(root, "thumbnails", `${asset.id}.png`), path.join(root, "Customer/thumbnails", `${asset.id}.jpg`)].find((file) => existsSync(file));
				if (!video) continue;
				const current = !!video && currentPaths.some((file) => file === video || path.basename(file, path.extname(file)) === asset.id || path.basename(path.dirname(file)) === asset.accessibilityLabel);
				candidates.push({
					file: video,
					preview,
					name: names[asset.localizedNameKey || ""] || asset.accessibilityLabel || asset.id,
					current
				});
			}
		} catch {}
		for (const file of currentPaths) if (existsSync(file) && /\.(png|jpe?g|webp|heic|mov|mp4)$/i.test(file) && !candidates.some((item) => item.file === file || item.current)) candidates.unshift({
			file,
			name: path.basename(file, path.extname(file)),
			current: true
		});
	}
	const roots = process.platform === "darwin" ? [
		"/System/Library/Desktop Pictures",
		"/Library/Desktop Pictures",
		"/System/Library/AssetsV2/com_apple_MobileAsset_DesktopPicture",
		"/Library/Apple/System/Library/AssetsV2/com_apple_MobileAsset_DesktopPicture"
	] : ["/usr/share/backgrounds", "/usr/share/wallpapers"];
	const collect = (directory, depth) => {
		if (depth > 8) return;
		try {
			for (const entry of readdirSync(directory, { withFileTypes: true })) {
				const file = path.join(directory, entry.name);
				if (/thumbnail|preview|poster|test|calibration/i.test(entry.name) || entry.name === "Solid Colors") continue;
				if (entry.isDirectory() && (!entry.name.startsWith(".") || entry.name === ".wallpapers")) collect(file, depth + 1);
				else if (entry.isFile() && /\.(png|jpe?g|webp|heic|mov|mp4)$/i.test(entry.name)) files.push(file);
			}
		} catch {}
	};
	if (process.platform !== "darwin" || !candidates.some((item) => item.preview || /\.(mov|mp4)$/i.test(item.file || ""))) for (const root of roots) collect(root, 0);
	for (const file of new Set(files)) if (!candidates.some((item) => item.file === file)) candidates.push({
		file,
		name: path.basename(file, path.extname(file)),
		current: currentPaths.includes(file)
	});
	return candidates;
}
async function discoverWindowsWallpapers() {
	const candidates = [];
	const known = /* @__PURE__ */ new Set();
	const add = (file, current = false) => {
		const key = path.resolve(file).toLowerCase();
		if (known.has(key)) return;
		try {
			if (!statSync(file).isFile()) return;
			known.add(key);
			candidates.push({
				file,
				name: path.extname(file) ? path.basename(file, path.extname(file)) : appText("screenshotBeautifier.personalWallpaper"),
				current
			});
		} catch {}
	};
	let hasCurrent = false;
	try {
		const wallpaper = await nativeActiveContextCollectorService.queryWallpaper();
		for (const file of wallpaper.paths) add(file, true);
		hasCurrent = candidates.some((item) => item.current);
		for (const file of wallpaper.photoPaths || []) add(file);
	} catch {}
	const themes = path.join(app.getPath("appData"), "Microsoft", "Windows", "Themes");
	add(path.join(themes, "TranscodedWallpaper"), !hasCurrent);
	const collect = (directory, depth = 0, allowCacheNames = false) => {
		if (depth > 8) return;
		try {
			for (const entry of readdirSync(directory, { withFileTypes: true })) {
				const file = path.join(directory, entry.name);
				if (entry.isDirectory()) collect(file, depth + 1, allowCacheNames);
				else if (entry.isFile() && (/\.(png|jpe?g|bmp|webp|gif)$/i.test(entry.name) || allowCacheNames && /^Transcoded_\d+$/i.test(entry.name))) add(file);
			}
		} catch {}
	};
	const windowsDirectory = process.env.SystemRoot || process.env.WINDIR;
	if (windowsDirectory) collect(path.join(windowsDirectory, "Web", "Wallpaper"));
	collect(themes, 0, true);
	if (process.env.LOCALAPPDATA) collect(path.join(process.env.LOCALAPPDATA, "Microsoft", "Windows", "Themes"));
	return candidates;
}
//#endregion
//#region electron/services/screenshot-beautifier.service.ts
var screenshot_beautifier_service_exports = /* @__PURE__ */ __exportAll({
	ScreenshotBeautifierService: () => ScreenshotBeautifierService,
	screenshotBeautifierService: () => screenshotBeautifierService
});
var WINDOW_QUERY_TIMEOUT_MS = 700;
var HIDE_MAIN_WINDOW_DELAY_MS = 260;
var HIDE_EDITOR_DELAY_MS = 150;
var OUTBOX_RETENTION_MS = 2592e5;
var PNG_SIGNATURE = Buffer.from([
	137,
	80,
	78,
	71,
	13,
	10,
	26,
	10
]);
var MAX_EXPORT_BYTES = 209715200;
function language() {
	try {
		return settingsRepository.getSettings().language || "zh-CN";
	} catch {
		return "zh-CN";
	}
}
function message(key, params = {}) {
	let text = t(`screenshotBeautifier.${key}`, language());
	for (const [name, value] of Object.entries(params)) text = text.replaceAll(`{${name}}`, String(value));
	return text;
}
function delay(ms) {
	return new Promise((resolve) => setTimeout(resolve, ms));
}
function temporaryId() {
	return `tmp-${Date.now().toString(36)}-${randomBytes(4).toString("hex")}`;
}
function pad(value) {
	return String(value).padStart(2, "0");
}
function timestampName() {
	const now = /* @__PURE__ */ new Date();
	return message("fileName", {
		date: `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}`,
		time: `${pad(now.getHours())}.${pad(now.getMinutes())}.${pad(now.getSeconds())}`
	});
}
function uniqueFilePath(directory, baseName) {
	let candidate = path.join(directory, `${baseName}.png`);
	for (let index = 2; existsSync(candidate); index += 1) candidate = path.join(directory, `${baseName} (${index}).png`);
	return candidate;
}
function assertPng(data) {
	const buffer = Buffer.from(data.buffer, data.byteOffset, data.byteLength);
	if (buffer.length < PNG_SIGNATURE.length || buffer.length > MAX_EXPORT_BYTES || !buffer.subarray(0, 8).equals(PNG_SIGNATURE)) throw new Error(message("imageInvalid"));
	return Buffer.from(buffer);
}
function intersect(rect, bounds) {
	const left = Math.max(rect.x, bounds.x);
	const top = Math.max(rect.y, bounds.y);
	const right = Math.min(rect.x + rect.width, bounds.x + bounds.width);
	const bottom = Math.min(rect.y + rect.height, bounds.y + bounds.height);
	if (right - left < 1 || bottom - top < 1) return null;
	return {
		x: left,
		y: top,
		width: right - left,
		height: bottom - top
	};
}
/**
* 截图美化：全局快捷键 → 冻结屏幕框选 → 美化编辑 / 复制 / 保存 / 钉图 / 识别文字。
* 全部在本机完成；只在已登录账号下运行，登录、退出、导入备份后由调用方执行 sync()。
*/
var ScreenshotBeautifierService = class {
	handlers = null;
	enabled = false;
	accountKey = null;
	databaseGeneration = -1;
	registeredShortcut = "";
	shortcutError = null;
	shortcutSuspended = false;
	capturing = false;
	sessionSequence = 0;
	session = null;
	editorSession = null;
	toastSession = null;
	pendingBotPaths = [];
	savedFiles = /* @__PURE__ */ new Set();
	pendingChangeReasons = /* @__PURE__ */ new Set();
	changeTimer = null;
	editorReleaseTimer = null;
	history = new ScreenshotHistoryStore(() => this.accountKey);
	initialize(handlers) {
		this.handlers = handlers;
		screenshotOverlayWindowService.initialize(handlers.paths, {
			onEscape: () => this.handleEscape(),
			onLost: () => this.cancelCapture()
		});
		screenshotEditorWindowService.initialize(handlers.paths, () => this.handleEditorHidden());
		screenshotFloatWindowService.initialize(handlers.paths, {
			copyImage: (png) => this.writeImageToClipboard(png),
			saveImage: (png) => {
				this.saveImageQuietly(png);
			},
			editImage: (image) => this.editPinnedImage(image),
			menuLabels: () => ({
				copy: message("pinMenuCopy"),
				save: message("pinMenuSave"),
				edit: message("pinMenuEdit"),
				opacity: message("pinMenuOpacity"),
				close: message("pinMenuClose"),
				closeAll: message("pinMenuCloseAll")
			})
		});
	}
	/** 重新读取当前账号的设置：注册快捷键、按保留条数清理历史；换账号时收起所有截图窗口 */
	sync() {
		if (!app.isReady()) return;
		let settings;
		try {
			settings = settingsRepository.getSettings();
		} catch (error) {
			console.warn("[截图美化] 读取设置失败:", error);
			return;
		}
		const connection = getOpenDatabaseConnection();
		const generation = connection?.generation ?? -1;
		const accountChanged = this.databaseGeneration !== -1 && this.databaseGeneration !== generation;
		this.databaseGeneration = generation;
		this.accountKey = connection && connection.ownerUserId !== null ? String(connection.ownerUserId) : null;
		if (accountChanged) this.closeEverything();
		this.enabled = settings.enableScreenshotBeautifier && this.accountKey !== null;
		this.syncShortcut(settings);
		if (this.accountKey) try {
			if (this.history.enforceLimit(settings.screenshotBeautifierHistoryLimit) > 0) this.queueChanged("history");
		} catch (error) {
			console.warn("[截图美化] 清理历史失败:", error);
		}
		this.cleanupOutbox();
	}
	dispose() {
		if (this.registeredShortcut) globalShortcut.unregister(this.registeredShortcut);
		this.registeredShortcut = "";
		if (this.changeTimer) clearTimeout(this.changeTimer);
		if (this.editorReleaseTimer) clearTimeout(this.editorReleaseTimer);
		this.changeTimer = null;
		this.editorReleaseTimer = null;
		this.session = null;
	}
	/** 当前生效的快捷键（未开启或没注册上时为空），供托盘菜单显示 */
	activeShortcut() {
		return this.registeredShortcut;
	}
	getState() {
		const settings = settingsRepository.getSettings();
		return {
			enabled: settings.enableScreenshotBeautifier,
			shortcut: settings.screenshotBeautifierShortcut,
			effectiveShortcut: resolveScreenshotBeautifierShortcut(settings.screenshotBeautifierShortcut, process.platform),
			defaultShortcut: defaultScreenshotBeautifierShortcut(process.platform),
			shortcutRegistered: Boolean(this.registeredShortcut),
			shortcutError: settings.enableScreenshotBeautifier ? this.shortcutError : null,
			afterCapture: settings.screenshotBeautifierAfterCapture,
			autoCopy: settings.screenshotBeautifierAutoCopy,
			saveDirectory: this.saveDirectory(settings),
			saveDirectoryIsDefault: !settings.screenshotBeautifierSaveDirectory,
			historyLimit: settings.screenshotBeautifierHistoryLimit,
			historyCount: this.history.count(),
			screenPermission: this.screenPermission(),
			ocrSupported: isScreenshotOcrSupported()
		};
	}
	updateSettings(input) {
		const previous = settingsRepository.getSettings();
		const patch = {};
		if (input.enabled !== void 0) patch.enableScreenshotBeautifier = input.enabled;
		if (input.afterCapture !== void 0 && SCREENSHOT_AFTER_CAPTURE_ACTIONS.includes(input.afterCapture)) patch.screenshotBeautifierAfterCapture = input.afterCapture;
		if (input.autoCopy !== void 0) patch.screenshotBeautifierAutoCopy = input.autoCopy;
		if (input.historyLimit !== void 0) patch.screenshotBeautifierHistoryLimit = input.historyLimit;
		const shortcutChanged = input.shortcut !== void 0 && input.shortcut !== previous.screenshotBeautifierShortcut;
		if (input.shortcut !== void 0) {
			this.assertShortcutAllowed(input.shortcut, previous);
			patch.screenshotBeautifierShortcut = input.shortcut;
		}
		settingsRepository.updateSettings(patch);
		this.sync();
		if (shortcutChanged && this.enabled && !this.shortcutSuspended && this.shortcutError) {
			const reason = this.shortcutError;
			settingsRepository.updateSettings({ screenshotBeautifierShortcut: previous.screenshotBeautifierShortcut });
			this.sync();
			throw new Error(reason);
		}
		this.queueChanged(input.historyLimit !== void 0 ? "history" : "settings");
		return this.getState();
	}
	/** 录入新快捷键期间暂停已注册的组合键，避免按下时开始截图 */
	setShortcutSuspended(value) {
		if (this.shortcutSuspended === value) return;
		this.shortcutSuspended = value;
		try {
			this.syncShortcut(settingsRepository.getSettings());
		} catch (error) {
			console.warn("[截图美化] 快捷键同步失败:", error);
		}
	}
	/** 其他功能（剪贴板助手）修改快捷键时用来检查是否与截图快捷键重复 */
	effectiveShortcutForConflict(settings) {
		return settings.enableScreenshotBeautifier ? resolveScreenshotBeautifierShortcut(settings.screenshotBeautifierShortcut, process.platform) : "";
	}
	async startCapture(trigger) {
		if (this.capturing || screenshotOverlayWindowService.isActive()) return;
		if (!this.accountKey) {
			if (trigger !== "shortcut") this.handlers?.showMainWindow();
			return;
		}
		if (process.platform === "darwin") {
			const status = systemPreferences.getMediaAccessStatus("screen");
			if (status === "denied" || status === "restricted") {
				this.promptScreenPermission();
				return;
			}
		}
		this.capturing = true;
		const sessionId = ++this.sessionSequence;
		let restoreMainWindow = false;
		let restoreEditor = false;
		try {
			screenshotFloatWindowService.hideToast();
			const mainWindow = this.handlers?.getMainWindow() ?? null;
			if (trigger === "toolbox" && mainWindow && mainWindow.isVisible() && !mainWindow.isMinimized()) {
				mainWindow.hide();
				restoreMainWindow = true;
			}
			restoreEditor = screenshotEditorWindowService.hideTemporarily();
			if (restoreMainWindow) await delay(HIDE_MAIN_WINDOW_DELAY_MS);
			else if (restoreEditor) await delay(HIDE_EDITOR_DELAY_MS);
			const displays = screen.getAllDisplays();
			const windowsPromise = this.queryVisibleWindows();
			const captured = await this.captureDisplays(displays);
			if (captured.size === 0) throw new Error(appText("screenshotBeautifier.noScreen"));
			const windows = await windowsPromise;
			const settings = settingsRepository.getSettings();
			const context = screenshotWindowContext();
			const afterCapture = settings.screenshotBeautifierAfterCapture;
			const cursor = screen.getCursorScreenPoint();
			const items = [...captured.values()].map((entry) => {
				const size = entry.image.getSize();
				const { bounds } = entry.display;
				const cursorInside = cursor.x >= bounds.x && cursor.x < bounds.x + bounds.width && cursor.y >= bounds.y && cursor.y < bounds.y + bounds.height;
				return {
					display: entry.display,
					payload: {
						...context,
						sessionId,
						width: size.width,
						height: size.height,
						bitmap: entry.image.toBitmap(),
						scale: entry.scale,
						windows: this.windowsOnDisplay(windows, entry.display),
						cursor: cursorInside ? {
							x: cursor.x - bounds.x,
							y: cursor.y - bounds.y
						} : null,
						afterCapture,
						style: settings.screenshotBeautifierStyle
					}
				};
			});
			this.session = {
				id: sessionId,
				displays: captured,
				restoreMainWindow,
				restoreEditor,
				selectionDisplayId: null
			};
			const cursorDisplay = screen.getDisplayNearestPoint(cursor);
			screenshotOverlayWindowService.present(items, String(cursorDisplay.id));
		} catch (error) {
			console.error("[截图美化] 截图失败:", error);
			this.session = null;
			screenshotOverlayWindowService.hide();
			this.restoreWindows({
				restoreMainWindow,
				restoreEditor
			}, false);
			dialog.showMessageBox({
				type: "warning",
				message: message("captureFailed"),
				detail: message("captureFailedDetail")
			});
		} finally {
			this.capturing = false;
		}
	}
	overlayPainted(sender, sessionId) {
		screenshotOverlayWindowService.markPainted(sender, sessionId);
	}
	overlayFocus(sender) {
		screenshotOverlayWindowService.focus(sender);
	}
	/** 一块屏开始或清掉选区时调用；开始框选时让其他屏清掉高亮 */
	overlaySelection(sender, hasSelection) {
		const session = this.session;
		const displayId = screenshotOverlayWindowService.displayIdOf(sender);
		if (!session || !displayId) return;
		if (hasSelection) {
			session.selectionDisplayId = displayId;
			screenshotOverlayWindowService.broadcast("screenshot-tool:overlay-clear", null, sender);
		} else if (session.selectionDisplayId === displayId) session.selectionDisplayId = null;
	}
	overlayCancel(sender) {
		if (screenshotOverlayWindowService.displayIdOf(sender)) this.cancelCapture();
	}
	copyColor(sender, color) {
		if (!screenshotOverlayWindowService.displayIdOf(sender)) return;
		clipboard.writeText(color);
	}
	async overlayFinish(sender, input) {
		const session = this.session;
		const displayId = screenshotOverlayWindowService.displayIdOf(sender);
		if (!session || session.id !== input.sessionId || !displayId) return;
		const entry = session.displays.get(displayId);
		if (!entry) return;
		const size = entry.image.getSize();
		const x = Math.max(0, Math.min(size.width - 1, Math.round(input.rect.x)));
		const y = Math.max(0, Math.min(size.height - 1, Math.round(input.rect.y)));
		const width = Math.max(1, Math.min(size.width - x, Math.round(input.rect.width)));
		const height = Math.max(1, Math.min(size.height - y, Math.round(input.rect.height)));
		this.session = null;
		screenshotOverlayWindowService.hide();
		const settings = settingsRepository.getSettings();
		const afterCapture = settings.screenshotBeautifierAfterCapture;
		const opensEditor = input.action === "ocr" || input.action === "beautify" && afterCapture === "editor";
		this.restoreWindows(session, opensEditor);
		const png = entry.image.crop({
			x,
			y,
			width,
			height
		}).toPNG();
		const image = this.recordImage({
			png,
			width,
			height,
			scale: entry.scale,
			origin: "capture",
			style: settings.screenshotBeautifierStyle
		});
		const screenPoint = {
			x: entry.display.bounds.x + x / entry.scale,
			y: entry.display.bounds.y + y / entry.scale
		};
		try {
			switch (input.action) {
				case "copy":
					this.writeImageToClipboard(png);
					this.showToast("copied", image, png, entry.display);
					break;
				case "save":
					await this.saveToDirectory(png);
					this.showToast("saved", image, png, entry.display);
					break;
				case "pin":
					screenshotFloatWindowService.openPin({
						png,
						width,
						height,
						scale: entry.scale,
						historyId: image.persisted ? image.id : null
					}, screenPoint);
					break;
				case "ocr":
					this.openEditor(image, { runOcr: true });
					break;
				case "beautify": if (afterCapture === "copy" && input.rendered && input.rendered.byteLength > 0) {
					const rendered = assertPng(input.rendered);
					this.writeImageToClipboard(rendered);
					if (image.persisted) this.history.writeOutput(image.id, rendered);
					this.showToast("copied", image, rendered, entry.display);
				} else this.openEditor(image, { runOcr: false });
			}
		} catch (error) {
			console.error("[截图美化] 处理截图失败:", error);
			dialog.showMessageBox({
				type: "warning",
				message: error instanceof Error && error.message ? error.message : message("actionFailed")
			});
		}
		this.queueChanged("history");
	}
	cancelCapture() {
		const session = this.session;
		this.session = null;
		screenshotOverlayWindowService.hide();
		if (session) this.restoreWindows(session, false);
	}
	handleEscape() {
		const session = this.session;
		if (!session) {
			screenshotOverlayWindowService.hide();
			return;
		}
		if (session.selectionDisplayId) {
			screenshotOverlayWindowService.broadcast("screenshot-tool:overlay-escape", { displayId: session.selectionDisplayId });
			return;
		}
		this.cancelCapture();
	}
	restoreWindows(session, opensEditor) {
		if (session.restoreMainWindow) {
			const mainWindow = this.handlers?.getMainWindow();
			if (mainWindow && !mainWindow.isDestroyed()) {
				if (opensEditor) mainWindow.showInactive();
				else mainWindow.show();
			}
		}
		if (session.restoreEditor && !opensEditor) screenshotEditorWindowService.restoreTemporarilyHidden();
	}
	/** 按每块屏的物理分辨率截图；分辨率不同的屏分开截，避免小屏被放大后再缩回去变糊 */
	async captureDisplays(displays) {
		const targets = displays.map((display) => ({
			display,
			width: Math.max(1, Math.round(display.bounds.width * display.scaleFactor)),
			height: Math.max(1, Math.round(display.bounds.height * display.scaleFactor))
		}));
		const groups = /* @__PURE__ */ new Map();
		for (const target of targets) {
			const key = `${target.width}x${target.height}`;
			groups.set(key, [...groups.get(key) ?? [], target]);
		}
		const result = /* @__PURE__ */ new Map();
		for (const group of groups.values()) {
			const { width, height } = group[0];
			const sources = await desktopCapturer.getSources({
				types: ["screen"],
				thumbnailSize: {
					width,
					height
				},
				fetchWindowIcons: false
			});
			const unmatched = sources.filter((source) => !displays.some((display) => String(display.id) === source.display_id));
			for (const target of group) {
				const displayId = String(target.display.id);
				const source = sources.find((item) => item.display_id === displayId) ?? (unmatched.length > 0 && (displays.length === 1 || unmatched.length === group.length) ? unmatched[group.indexOf(target)] : void 0);
				if (!source || source.thumbnail.isEmpty()) continue;
				let image = source.thumbnail;
				const size = image.getSize();
				if (Math.abs(size.width - target.width) > 1 || Math.abs(size.height - target.height) > 1) image = image.resize({
					width: target.width,
					height: target.height,
					quality: "best"
				});
				result.set(displayId, {
					display: target.display,
					image,
					scale: image.getSize().width / target.display.bounds.width
				});
			}
		}
		return result;
	}
	async queryVisibleWindows() {
		if (process.platform !== "win32" && process.platform !== "darwin") return [];
		try {
			const result = await Promise.race([nativeActiveContextCollectorService.queryVisibleWindows(), delay(WINDOW_QUERY_TIMEOUT_MS).then(() => null)]);
			if (!result) return [];
			return result.windows.map(({ bounds }) => process.platform === "win32" ? screen.screenToDipRect(null, bounds) : bounds).filter((bounds) => bounds.width >= 40 && bounds.height >= 40);
		} catch {
			return [];
		}
	}
	/** 转成相对这块屏左上角的坐标，保留层级顺序（从前到后） */
	windowsOnDisplay(windows, display) {
		const result = [];
		for (const window of windows) {
			const visible = intersect(window, display.bounds);
			if (!visible || visible.width < 40 || visible.height < 40) continue;
			result.push({
				x: Math.round(visible.x - display.bounds.x),
				y: Math.round(visible.y - display.bounds.y),
				width: Math.round(visible.width),
				height: Math.round(visible.height)
			});
		}
		return result.slice(0, 200);
	}
	screenPermission() {
		if (process.platform !== "darwin") return "not-applicable";
		try {
			return systemPreferences.getMediaAccessStatus("screen");
		} catch {
			return "unknown";
		}
	}
	async promptScreenPermission() {
		if ((await dialog.showMessageBox({
			type: "info",
			message: message("permissionTitle"),
			detail: message("permissionDetail"),
			buttons: [message("permissionOpen"), message("cancel")],
			defaultId: 0,
			cancelId: 1
		})).response === 0) this.openScreenPermissionSettings();
	}
	openScreenPermissionSettings() {
		if (process.platform !== "darwin") return;
		shell.openExternal("x-apple.systempreferences:com.apple.preference.security?Privacy_ScreenCapture");
	}
	recordImage(input) {
		const limit = settingsRepository.getSettings().screenshotBeautifierHistoryLimit;
		if (this.accountKey && limit > 0) try {
			const id = this.history.create(input);
			if (id) {
				this.history.enforceLimit(limit);
				return {
					id,
					persisted: true,
					png: input.png,
					width: input.width,
					height: input.height,
					scale: input.scale
				};
			}
		} catch (error) {
			console.warn("[截图美化] 写入历史失败:", error);
		}
		return {
			id: temporaryId(),
			persisted: false,
			png: input.png,
			width: input.width,
			height: input.height,
			scale: input.scale
		};
	}
	openEditor(image, options) {
		if (this.editorReleaseTimer) {
			clearTimeout(this.editorReleaseTimer);
			this.editorReleaseTimer = null;
		}
		const settings = settingsRepository.getSettings();
		this.editorSession = image;
		screenshotEditorWindowService.open({
			...screenshotWindowContext(),
			id: image.id,
			persisted: image.persisted,
			image: image.png,
			width: image.width,
			height: image.height,
			scale: image.scale,
			style: options.style ?? settings.screenshotBeautifierStyle,
			presets: settings.screenshotBeautifierPresets,
			backgroundLibrary: toScreenshotBackgroundImages(readScreenshotBackgroundLibrary()),
			annotations: options.annotations ?? [],
			autoCopy: settings.screenshotBeautifierAutoCopy && !options.runOcr,
			runOcr: options.runOcr,
			ocrSupported: isScreenshotOcrSupported()
		});
		const editor = screenshotEditorWindowService.getWindow();
		if (editor) this.registerBackgroundLibrary(editor.webContents);
	}
	handleEditorHidden() {
		if (this.editorReleaseTimer) clearTimeout(this.editorReleaseTimer);
		this.editorReleaseTimer = setTimeout(() => {
			this.editorReleaseTimer = null;
			if (!screenshotEditorWindowService.isPresented()) this.editorSession = null;
		}, 5e3);
	}
	editorImage(sender, id) {
		const session = this.editorSession;
		if (!screenshotEditorWindowService.isEditorContents(sender) || !session || session.id !== id) throw new Error(message("sessionExpired"));
		return session;
	}
	openHistory(id) {
		const entry = this.history.load(id);
		if (!entry) throw new Error(message("historyNotFound"));
		this.openEditor({
			id,
			persisted: true,
			png: entry.png,
			width: entry.meta.width,
			height: entry.meta.height,
			scale: entry.meta.scale
		}, {
			runOcr: false,
			style: entry.meta.style,
			annotations: entry.meta.annotations
		});
	}
	/** 拖入、粘贴或选择的图片：按主屏缩放倍数当作截图，超大的图先缩小 */
	importImage(data) {
		if (!this.accountKey) throw new Error(message("notLoggedIn"));
		if (data.byteLength === 0 || data.byteLength > 41943040) throw new Error(message("imageTooLarge"));
		let image = nativeImage.createFromBuffer(Buffer.from(data.buffer, data.byteOffset, data.byteLength));
		if (image.isEmpty()) throw new Error(message("imageInvalid"));
		let size = image.getSize();
		const longest = Math.max(size.width, size.height);
		if (longest > 12e3) {
			const ratio = SCREENSHOT_MAX_CANVAS_SIDE / longest;
			image = image.resize({
				width: Math.round(size.width * ratio),
				height: Math.round(size.height * ratio),
				quality: "best"
			});
			size = image.getSize();
		}
		const png = image.toPNG();
		const settings = settingsRepository.getSettings();
		const record = this.recordImage({
			png,
			width: size.width,
			height: size.height,
			scale: Math.max(1, screen.getPrimaryDisplay().scaleFactor || 1),
			origin: "import",
			style: settings.screenshotBeautifierStyle
		});
		this.openEditor(record, { runOcr: false });
		this.queueChanged("history");
	}
	async importImageFromDialog() {
		const owner = this.handlers?.getMainWindow();
		const options = {
			title: message("importDialogTitle"),
			properties: ["openFile"],
			filters: [{
				name: message("imageFilter"),
				extensions: [
					"png",
					"jpg",
					"jpeg",
					"webp",
					"bmp",
					"gif"
				]
			}]
		};
		const result = owner ? await dialog.showOpenDialog(owner, options) : await dialog.showOpenDialog(options);
		const filePath = result.filePaths[0];
		if (result.canceled || !filePath) return false;
		if (statSync(filePath).size > 41943040) throw new Error(message("imageTooLarge"));
		this.importImage(readFileSync(filePath));
		return true;
	}
	editorCopy(sender, input) {
		const session = this.editorImage(sender, input.id);
		const png = assertPng(input.image);
		this.writeImageToClipboard(png);
		this.persistOutput(session, png);
	}
	async editorSave(sender, input, saveAs) {
		const session = this.editorImage(sender, input.id);
		const png = assertPng(input.image);
		let filePath;
		if (saveAs) {
			const owner = screenshotEditorWindowService.getWindow();
			const directory = this.saveDirectory(settingsRepository.getSettings());
			const options = {
				title: message("saveDialogTitle"),
				defaultPath: path.join(directory, `${timestampName()}.png`),
				filters: [{
					name: "PNG",
					extensions: ["png"]
				}]
			};
			const result = owner ? await dialog.showSaveDialog(owner, options) : await dialog.showSaveDialog(options);
			if (result.canceled || !result.filePath) return null;
			filePath = result.filePath.toLowerCase().endsWith(".png") ? result.filePath : `${result.filePath}.png`;
			writeFileSync(filePath, png);
			this.savedFiles.add(filePath);
		} else filePath = await this.saveToDirectory(png);
		this.persistOutput(session, png);
		return { filePath };
	}
	editorPin(sender, input) {
		const session = this.editorImage(sender, input.id);
		const png = assertPng(input.image);
		const size = nativeImage.createFromBuffer(png).getSize();
		this.persistOutput(session, png);
		screenshotFloatWindowService.openPin({
			png,
			width: size.width,
			height: size.height,
			scale: session.scale,
			historyId: session.persisted ? session.id : null
		});
	}
	editorSendToBot(sender, input) {
		const session = this.editorImage(sender, input.id);
		const png = assertPng(input.image);
		const directory = this.outboxDirectory();
		if (!directory) throw new Error(message("notLoggedIn"));
		mkdirSync(directory, { recursive: true });
		const filePath = uniqueFilePath(directory, timestampName());
		writeFileSync(filePath, png);
		this.persistOutput(session, png);
		this.pendingBotPaths = [...this.pendingBotPaths, filePath].slice(-12);
		screenshotEditorWindowService.hide();
		this.handlers?.showMainWindow();
		const mainWindow = this.handlers?.getMainWindow();
		if (mainWindow) sendToLiveWindow(mainWindow, "screenshot-beautifier:bot-attachments-pending");
	}
	consumeBotAttachments() {
		const paths = this.pendingBotPaths.filter((filePath) => existsSync(filePath));
		this.pendingBotPaths = [];
		return paths;
	}
	async editorOcr(sender, id) {
		const session = this.editorImage(sender, id);
		try {
			return await recognizeScreenshotText(session.png);
		} catch (error) {
			if (error instanceof ScreenshotOcrError) {
				const key = error.code === "no-language" ? "ocrNoLanguage" : error.code === "unsupported" ? "ocrUnsupported" : error.code === "timeout" ? "ocrTimeout" : "ocrFailed";
				throw new Error(message(key));
			}
			console.warn("[截图美化] 文字识别失败:", error);
			throw new Error(message("ocrFailed"));
		}
	}
	editorUpdateState(sender, input) {
		const session = this.editorSession;
		if (!session || session.id !== input.id) return;
		if (!screenshotEditorWindowService.isEditorContents(sender)) return;
		const style = normalizeScreenshotStyle(input.style);
		const annotations = normalizeScreenshotAnnotations(input.annotations);
		if (session.persisted) try {
			this.history.updateState(session.id, style, annotations);
		} catch (error) {
			console.warn("[截图美化] 保存编辑状态失败:", error);
		}
		const current = settingsRepository.getSettings().screenshotBeautifierStyle;
		if (JSON.stringify(current) !== JSON.stringify(style)) settingsRepository.updateSettings({ screenshotBeautifierStyle: style });
	}
	backgroundFiles = /* @__PURE__ */ new Map();
	registerBackgroundLibrary(sender) {
		for (const entry of readScreenshotBackgroundLibrary()) if (existsSync(entry.file)) this.backgroundFiles.set(entry.id, {
			file: entry.file,
			owner: sender.id
		});
	}
	async chooseBackgrounds(sender, source) {
		if (!screenshotEditorWindowService.isEditorContents(sender)) throw new Error(message("sessionExpired"));
		this.registerBackgroundLibrary(sender);
		const owner = BrowserWindow.fromWebContents(sender);
		if (!owner) return toScreenshotBackgroundImages(readScreenshotBackgroundLibrary());
		let files = [];
		const candidates = [];
		if (source === "custom") {
			const result = await dialog.showOpenDialog(owner, {
				properties: ["openFile"],
				filters: [{
					name: "Images",
					extensions: [
						"png",
						"jpg",
						"jpeg",
						"webp",
						"bmp",
						"heic"
					]
				}]
			});
			if (result.canceled) return toScreenshotBackgroundImages(readScreenshotBackgroundLibrary());
			files = result.filePaths;
		} else {
			const consentFile = path.join(app.getPath("userData"), "screenshot-wallpaper-consent.json");
			let consent = false;
			try {
				consent = JSON.parse(readFileSync(consentFile, "utf8")).allowed === true;
			} catch {}
			if (!consent) {
				if ((await dialog.showMessageBox(owner, {
					type: "question",
					message: appText("screenshotBeautifier.wallpaperPermissionTitle"),
					detail: appText("screenshotBeautifier.wallpaperPermissionDetail"),
					buttons: [appText("screenshotBeautifier.wallpaperAllow"), appText("screenshotBeautifier.wallpaperCancel")],
					defaultId: 1,
					cancelId: 1,
					noLink: true
				})).response !== 0) return toScreenshotBackgroundImages(readScreenshotBackgroundLibrary());
				writeFileSync(consentFile, JSON.stringify({ allowed: true }));
			}
			candidates.push(...await discoverScreenshotWallpapers());
			this.backgroundFiles.clear();
		}
		const images = [];
		for (const file of [...new Set(files)]) if (!candidates.some((item) => item.file === file)) candidates.push({
			file,
			name: path.basename(file, path.extname(file)),
			current: false
		});
		candidates.sort((a, b) => Number(b.current) - Number(a.current) || Number(!!b.file) - Number(!!a.file));
		const seenThumbnails = /* @__PURE__ */ new Set();
		for (const candidate of candidates) try {
			const file = candidate.preview || candidate.file;
			if (!file) continue;
			let thumbnail = nativeImage.createEmpty();
			const isVideo = /\.(mov|mp4)$/i.test(file);
			if (!isVideo && statSync(file).size <= 41943040) thumbnail = nativeImage.createFromBuffer(readFileSync(file));
			if (thumbnail.isEmpty() && process.platform === "darwin" && !isVideo) {
				const temporary = mkdtempSync(path.join(app.getPath("temp"), "screenshot-wallpaper-thumbnail-"));
				try {
					const converted = path.join(temporary, "thumbnail.jpg");
					await promisify(execFile)("/usr/bin/sips", [
						"-s",
						"format",
						"jpeg",
						"-Z",
						"240",
						file,
						"--out",
						converted
					], { timeout: 1e4 });
					thumbnail = nativeImage.createFromBuffer(readFileSync(converted));
				} finally {
					rmSync(temporary, {
						recursive: true,
						force: true
					});
				}
			}
			if (thumbnail.isEmpty()) thumbnail = await nativeImage.createThumbnailFromPath(file, {
				width: 240,
				height: 150
			});
			if (thumbnail.isEmpty()) continue;
			thumbnail = thumbnail.resize({ width: 240 });
			const thumbData = thumbnail.toJPEG(80);
			const signature = createHash("sha1").update(thumbData).digest("hex");
			if (seenThumbnails.has(signature)) continue;
			seenThumbnails.add(signature);
			if (!candidate.file) continue;
			const id = screenshotBackgroundId(candidate.file);
			this.backgroundFiles.set(id, {
				file: candidate.file,
				owner: sender.id
			});
			images.push({
				id,
				file: candidate.file,
				name: candidate.name,
				thumbnail: `data:image/jpeg;base64,${thumbData.toString("base64")}`,
				available: true,
				current: candidate.current
			});
		} catch {}
		if (!images.length && files.length && source === "custom") throw new Error(appText("screenshotBeautifier.backgroundImageFailed"));
		const currentFiles = new Set(candidates.filter((item) => item.current && item.file).map((item) => path.resolve(item.file).toLowerCase()));
		const stored = mergeScreenshotBackgroundLibrary(images.map((item) => ({
			id: item.id,
			file: item.file,
			name: item.name,
			thumbnail: item.thumbnail
		})), images.map((item) => item.id));
		this.registerBackgroundLibrary(sender);
		return toScreenshotBackgroundImages(stored, currentFiles);
	}
	async loadBackground(sender, id) {
		const entry = this.backgroundFiles.get(id);
		if (!screenshotEditorWindowService.isEditorContents(sender) || !entry || entry.owner !== sender.id) throw new Error(message("sessionExpired"));
		const isVideo = process.platform === "darwin" && /\.(mov|mp4)$/i.test(entry.file);
		if (!isVideo && statSync(entry.file).size > 41943040) throw new Error(appText("screenshotBeautifier.backgroundImageFailed"));
		let image;
		if (isVideo || process.platform === "darwin" && (/\.heic$/i.test(entry.file) || !path.extname(entry.file))) {
			const temporary = mkdtempSync(path.join(app.getPath("temp"), "screenshot-wallpaper-"));
			try {
				const converted = path.join(temporary, "wallpaper.jpg");
				if (isVideo) await nativeActiveContextCollectorService.extractWallpaperFrame(entry.file, converted);
				else await promisify(execFile)("/usr/bin/sips", [
					"-s",
					"format",
					"jpeg",
					"-s",
					"formatOptions",
					"95",
					entry.file,
					"--out",
					converted
				], { timeout: 2e4 });
				image = nativeImage.createFromPath(converted);
			} finally {
				rmSync(temporary, {
					recursive: true,
					force: true
				});
			}
		} else {
			image = nativeImage.createFromPath(entry.file);
			if (image.isEmpty()) image = nativeImage.createFromBuffer(readFileSync(entry.file));
		}
		if (image.isEmpty()) throw new Error(appText("screenshotBeautifier.backgroundImageFailed"));
		const size = image.getSize();
		if (Math.max(size.width, size.height) > 12e3) image = image.resize(size.width >= size.height ? { width: SCREENSHOT_MAX_CANVAS_SIDE } : { height: SCREENSHOT_MAX_CANVAS_SIDE });
		const data = image.toJPEG(95);
		if (data.length > 48e6) throw new Error(appText("screenshotBeautifier.backgroundImageFailed"));
		mergeScreenshotBackgroundLibrary([], [id]);
		return `data:image/jpeg;base64,${data.toString("base64")}`;
	}
	savePreset(sender, name, style) {
		if (!screenshotEditorWindowService.isEditorContents(sender)) throw new Error(message("sessionExpired"));
		const trimmed = name.trim().slice(0, 20);
		if (!trimmed) throw new Error(message("presetNameRequired"));
		const presets = settingsRepository.getSettings().screenshotBeautifierPresets;
		if (presets.length >= 12) throw new Error(message("presetLimitReached", { n: 12 }));
		const next = [...presets, {
			id: `preset-${Date.now().toString(36)}-${randomBytes(3).toString("hex")}`,
			name: trimmed,
			style: normalizeScreenshotStyle(style)
		}];
		return settingsRepository.updateSettings({ screenshotBeautifierPresets: next }).screenshotBeautifierPresets;
	}
	deletePreset(sender, id) {
		if (!screenshotEditorWindowService.isEditorContents(sender)) throw new Error(message("sessionExpired"));
		const presets = settingsRepository.getSettings().screenshotBeautifierPresets.filter((preset) => preset.id !== id);
		return settingsRepository.updateSettings({ screenshotBeautifierPresets: presets }).screenshotBeautifierPresets;
	}
	editorClose(sender) {
		if (screenshotEditorWindowService.isEditorContents(sender)) screenshotEditorWindowService.hide();
	}
	revealFile(filePath) {
		if (this.savedFiles.has(filePath) && existsSync(filePath)) shell.showItemInFolder(filePath);
	}
	persistOutput(session, png) {
		if (!session.persisted) return;
		try {
			this.history.writeOutput(session.id, png);
			this.queueChanged("history");
		} catch (error) {
			console.warn("[截图美化] 保存成品失败:", error);
		}
	}
	editPinnedImage(image) {
		if (image.historyId) try {
			this.openHistory(image.historyId);
			return;
		} catch {}
		this.openEditor({
			id: temporaryId(),
			persisted: false,
			png: image.png,
			width: image.width,
			height: image.height,
			scale: image.scale
		}, { runOcr: false });
	}
	showToast(kind, image, shown, display) {
		const thumbnail = createScreenshotThumbnail(shown);
		if (thumbnail.length === 0) return;
		const size = nativeImage.createFromBuffer(shown).getSize();
		this.toastSession = {
			image,
			shown
		};
		screenshotFloatWindowService.showToast({
			...screenshotWindowContext(),
			kind,
			thumbnail: `data:image/jpeg;base64,${thumbnail.toString("base64")}`,
			aspect: size.height > 0 ? size.width / size.height : 1
		}, display);
	}
	toastAction(sender, action) {
		if (!screenshotFloatWindowService.isToastContents(sender)) return;
		const session = this.toastSession;
		screenshotFloatWindowService.hideToast();
		if (!session || action === "close") return;
		if (action === "edit") {
			if (session.image.persisted) try {
				this.openHistory(session.image.id);
				return;
			} catch {}
			this.openEditor(session.image, { runOcr: false });
			return;
		}
		const size = nativeImage.createFromBuffer(session.shown).getSize();
		screenshotFloatWindowService.openPin({
			png: session.shown,
			width: size.width,
			height: size.height,
			scale: session.image.scale,
			historyId: session.image.persisted ? session.image.id : null
		});
	}
	toastHover(sender, hovered) {
		if (screenshotFloatWindowService.isToastContents(sender)) screenshotFloatWindowService.setToastHovered(hovered);
	}
	listHistory() {
		return this.history.list();
	}
	copyHistory(id) {
		const png = this.history.readBest(id);
		if (!png) throw new Error(message("historyNotFound"));
		this.writeImageToClipboard(png);
	}
	deleteHistory(id) {
		this.history.delete(id);
		this.queueChanged("history");
	}
	clearHistory() {
		const removed = this.history.clear();
		this.queueChanged("history");
		return removed;
	}
	async chooseSaveDirectory() {
		const owner = this.handlers?.getMainWindow();
		const options = {
			title: message("chooseFolderTitle"),
			defaultPath: this.saveDirectory(settingsRepository.getSettings()),
			properties: ["openDirectory", "createDirectory"]
		};
		const result = owner ? await dialog.showOpenDialog(owner, options) : await dialog.showOpenDialog(options);
		const directory = result.filePaths[0];
		if (!result.canceled && directory) {
			settingsRepository.updateSettings({ screenshotBeautifierSaveDirectory: directory });
			this.queueChanged("settings");
		}
		return this.getState();
	}
	resetSaveDirectory() {
		settingsRepository.updateSettings({ screenshotBeautifierSaveDirectory: "" });
		this.queueChanged("settings");
		return this.getState();
	}
	async openSaveDirectory() {
		const directory = this.saveDirectory(settingsRepository.getSettings());
		mkdirSync(directory, { recursive: true });
		const error = await shell.openPath(directory);
		if (error) throw new Error(error);
	}
	saveDirectory(settings) {
		const custom = settings.screenshotBeautifierSaveDirectory.trim();
		if (custom && path.isAbsolute(custom)) return custom;
		return path.join(app.getPath("pictures"), message("defaultFolder"));
	}
	async saveToDirectory(png) {
		const directory = this.saveDirectory(settingsRepository.getSettings());
		mkdirSync(directory, { recursive: true });
		const filePath = uniqueFilePath(directory, timestampName());
		writeFileSync(filePath, png);
		this.savedFiles.add(filePath);
		return filePath;
	}
	async saveImageQuietly(png) {
		try {
			await this.saveToDirectory(png);
			const point = screen.getCursorScreenPoint();
			const image = {
				id: temporaryId(),
				persisted: false,
				png,
				width: 0,
				height: 0,
				scale: 1
			};
			const size = nativeImage.createFromBuffer(png).getSize();
			image.width = size.width;
			image.height = size.height;
			this.showToast("saved", image, png, screen.getDisplayNearestPoint(point));
		} catch (error) {
			dialog.showMessageBox({
				type: "warning",
				message: error instanceof Error && error.message ? error.message : message("actionFailed")
			});
		}
	}
	writeImageToClipboard(png) {
		clipboard.writeImage(nativeImage.createFromBuffer(png));
	}
	outboxDirectory() {
		if (!this.accountKey) return null;
		return path.join(app.getPath("userData"), "screenshot-beautifier", this.accountKey, "outbox");
	}
	/** 发给超能伙伴的图片在附件里另有一份，本地临时文件几天后清掉 */
	cleanupOutbox() {
		const directory = this.outboxDirectory();
		if (!directory || !existsSync(directory)) return;
		try {
			const now = Date.now();
			for (const name of readdirSync(directory)) {
				const filePath = path.join(directory, name);
				const info = statSync(filePath);
				if (info.isFile() && now - info.mtimeMs > OUTBOX_RETENTION_MS) rmSync(filePath, { force: true });
			}
		} catch (error) {
			console.warn("[截图美化] 清理临时文件失败:", error);
		}
	}
	closeEverything() {
		this.cancelCapture();
		screenshotEditorWindowService.hide();
		screenshotFloatWindowService.closeAllPins();
		screenshotFloatWindowService.hideToast();
		this.editorSession = null;
		this.toastSession = null;
		this.pendingBotPaths = [];
	}
	conflictMessage(shortcut, settings) {
		if (settings.enableCaptureShortcut && settings.captureShortcut === shortcut) return message("shortcutSameAsCapture");
		if (settings.enableClipboardAssistant && resolveClipboardAssistantShortcut(settings.clipboardAssistantShortcut, process.platform) === shortcut) return message("shortcutSameAsClipboard");
		return null;
	}
	assertShortcutAllowed(shortcut, settings) {
		if (!shortcut) return;
		if (normalizeScreenshotShortcut(shortcut) !== shortcut) throw new Error(message("shortcutInvalid"));
		const parts = shortcut.split("+");
		if (process.platform !== "darwin" && parts.includes("Command")) throw new Error(message("shortcutCommandUnsupported"));
		if (process.platform === "darwin" && parts.includes("Super")) throw new Error(message("shortcutSuperOnMac"));
		const conflict = this.conflictMessage(resolveScreenshotBeautifierShortcut(shortcut, process.platform), settings);
		if (conflict) throw new Error(conflict);
	}
	syncShortcut(settings) {
		const next = this.enabled && !this.shortcutSuspended ? resolveScreenshotBeautifierShortcut(settings.screenshotBeautifierShortcut, process.platform) : "";
		if (this.registeredShortcut === next && (!next || globalShortcut.isRegistered(next))) return;
		if (this.registeredShortcut) globalShortcut.unregister(this.registeredShortcut);
		this.registeredShortcut = "";
		if (!next) {
			if (!this.shortcutSuspended) this.shortcutError = null;
			return;
		}
		const conflict = this.conflictMessage(next, settings);
		if (conflict) {
			this.shortcutError = conflict;
			return;
		}
		try {
			if (globalShortcut.register(next, () => {
				this.startCapture("shortcut");
			})) {
				this.registeredShortcut = next;
				this.shortcutError = null;
				console.info(`[截图美化] 快捷键已注册｜${next}。`);
			} else {
				this.shortcutError = message("shortcutOccupied");
				console.warn(`[截图美化] 快捷键注册失败｜${next} 已被系统或其他应用占用。`);
			}
		} catch (error) {
			this.shortcutError = error instanceof Error && error.message ? error.message : message("shortcutRegisterFailed");
		}
	}
	queueChanged(reason) {
		this.pendingChangeReasons.add(reason);
		if (this.changeTimer) return;
		this.changeTimer = setTimeout(() => {
			this.changeTimer = null;
			const reasons = [...this.pendingChangeReasons];
			this.pendingChangeReasons.clear();
			const mainWindow = this.handlers?.getMainWindow();
			if (mainWindow) sendToLiveWindow(mainWindow, "screenshot-beautifier:changed", { reasons });
		}, 120);
	}
};
var screenshotBeautifierService = new ScreenshotBeautifierService();
//#endregion
export { screenshotEditorWindowService as a, screenshotFloatWindowService as i, screenshot_beautifier_service_exports as n, screenshotOverlayWindowService as r, screenshotBeautifierService as t };
