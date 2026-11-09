import { createRequire as __nodeCreateRequire } from "node:module";
__nodeCreateRequire(import.meta.url);
import { BrowserWindow, app, powerMonitor } from "electron";
import os from "node:os";
import fs, { existsSync } from "node:fs";
import path from "node:path";
import { execFile, spawn } from "node:child_process";
import { performance } from "node:perf_hooks";
//#region electron/services/dev-performance-monitor.service.ts
var SAMPLE_INTERVAL_MS = 1e4;
var EXTERNAL_PROCESS_SAMPLE_INTERVAL_MS = 3e4;
var EVENT_LOOP_LAG_INTERVAL_MS = 1e3;
var MAX_SLOW_OPERATIONS = 8;
var LOG_FILE_NAME = "dev-performance.jsonl";
var PREVIOUS_LOG_FILE_NAME = "dev-performance.previous.jsonl";
var NOOP_OPERATION = Object.freeze({
  end: () => {}
});
function round(value, digits = 2) {
  if (!Number.isFinite(value)) return 0;
  const factor = 10 ** digits;
  return Math.round(value * factor) / factor;
}
function bytesToMb(bytes) {
  return round(bytes / 1024 / 1024);
}
function kbToMb(kb) {
  return round(kb / 1024);
}
function percentile(values, percent) {
  if (values.length === 0) return 0;
  const sorted = [...values].sort((left, right) => left - right);
  return sorted[Math.min(sorted.length - 1, Math.ceil(percent / 100 * sorted.length) - 1)];
}
function sanitizeMetricName(value) {
  return value.replace(/[^a-zA-Z0-9_.:-]/g, "_").slice(0, 80);
}
function sanitizeLabels(labels) {
  if (!labels) return undefined;
  const entries = Object.entries(labels).slice(0, 8).flatMap(([rawKey, rawValue]) => {
    if (rawValue === undefined) return [];
    const metricName = sanitizeMetricName(rawKey);
    if (!metricName) return [];
    return [[metricName, typeof rawValue === "string" ? rawValue.slice(0, 80) : rawValue]];
  });
  return entries.length > 0 ? Object.fromEntries(entries) : undefined;
}
function runPs(pids) {
  if (process.platform !== "darwin" || pids.length === 0) return Promise.resolve(/* @__PURE__ */new Map());
  return new Promise(resolve => {
    execFile("/bin/ps", ["-p", pids.join(","), "-o", "pid=,%cpu=,rss="], {
      timeout: 2e3,
      maxBuffer: 65536
    }, (error, stdout) => {
      if (error) {
        resolve(/* @__PURE__ */new Map());
        return;
      }
      const result = /* @__PURE__ */new Map();
      for (const line of stdout.split(/\r?\n/)) {
        const [pidText, cpuText, rssText] = line.trim().split(/\s+/);
        const pid = Number(pidText);
        const cpuPercent = Number(cpuText);
        const rssKb = Number(rssText);
        if (!Number.isFinite(pid) || !Number.isFinite(cpuPercent) || !Number.isFinite(rssKb)) continue;
        result.set(pid, {
          cpuPercent: round(cpuPercent),
          rssMb: kbToMb(rssKb)
        });
      }
      resolve(result);
    });
  });
}
var DevPerformanceMonitorService = class {
  running = false;
  sampleInFlight = false;
  interval = null;
  startupTimer = null;
  eventLoopLagTimer = null;
  nextEventLoopLagCheckAt = 0;
  eventLoopLagSamples = [];
  previousCpuUsage = process.cpuUsage();
  previousCpuSampleAt = performance.now();
  startedAt = 0;
  logPath = null;
  counters = /* @__PURE__ */new Map();
  gauges = /* @__PURE__ */new Map();
  operations = /* @__PURE__ */new Map();
  slowOperations = [];
  externalProcesses = /* @__PURE__ */new Map();
  lastExternalProcessSampleAt = 0;
  isEnabled() {
    return !app.isPackaged && Boolean(process.env.VITE_DEV_SERVER_URL);
  }
  isRunning() {
    return this.running;
  }
  getLogPath() {
    return this.logPath;
  }
  start() {
    if (this.running || !this.isEnabled()) return;
    const logDirectory = path.join(app.getAppPath(), "logs");
    const logPath = path.join(logDirectory, LOG_FILE_NAME);
    const previousLogPath = path.join(logDirectory, PREVIOUS_LOG_FILE_NAME);
    try {
      fs.mkdirSync(logDirectory, {
        recursive: true
      });
      if (fs.existsSync(logPath)) fs.copyFileSync(logPath, previousLogPath);
      fs.writeFileSync(logPath, "", "utf8");
    } catch (error) {
      console.error("[DevPerformance] 无法创建性能日志:", error);
      return;
    }
    this.running = true;
    this.startedAt = Date.now();
    this.lastExternalProcessSampleAt = this.startedAt;
    this.logPath = logPath;
    this.previousCpuUsage = process.cpuUsage();
    this.previousCpuSampleAt = performance.now();
    app.getAppMetrics();
    this.writeRecord({
      type: "session_start",
      timestamp: (/* @__PURE__ */new Date()).toISOString(),
      pid: process.pid,
      platform: process.platform,
      arch: process.arch,
      electronVersion: process.versions.electron,
      nodeVersion: process.versions.node,
      sampleIntervalMs: SAMPLE_INTERVAL_MS
    });
    this.startupTimer = setTimeout(() => {
      this.startupTimer = null;
      this.collectSample("startup");
    }, 1e3);
    this.startupTimer.unref?.();
    this.interval = setInterval(() => void this.collectSample("interval"), SAMPLE_INTERVAL_MS);
    this.interval.unref?.();
    this.nextEventLoopLagCheckAt = performance.now() + EVENT_LOOP_LAG_INTERVAL_MS;
    this.eventLoopLagTimer = setInterval(() => {
      const now = performance.now();
      this.eventLoopLagSamples.push(Math.max(0, now - this.nextEventLoopLagCheckAt));
      this.nextEventLoopLagCheckAt = now + EVENT_LOOP_LAG_INTERVAL_MS;
    }, EVENT_LOOP_LAG_INTERVAL_MS);
    this.eventLoopLagTimer.unref?.();
    console.info(`[DevPerformance] 开发态性能监控已启动: ${logPath}`);
  }
  stop() {
    if (!this.running) return;
    if (this.startupTimer) clearTimeout(this.startupTimer);
    if (this.interval) clearInterval(this.interval);
    if (this.eventLoopLagTimer) clearInterval(this.eventLoopLagTimer);
    this.startupTimer = null;
    this.interval = null;
    this.eventLoopLagTimer = null;
    this.writeRecord({
      type: "session_stop",
      timestamp: (/* @__PURE__ */new Date()).toISOString(),
      durationMs: Date.now() - this.startedAt
    });
    this.running = false;
    this.eventLoopLagSamples = [];
    this.counters.clear();
    this.gauges.clear();
    this.operations.clear();
    this.slowOperations = [];
  }
  increment(name, amount = 1) {
    if (!this.running || !Number.isFinite(amount)) return;
    const safeName = sanitizeMetricName(name);
    if (!safeName) return;
    this.counters.set(safeName, (this.counters.get(safeName) ?? 0) + amount);
  }
  setGauge(name, value) {
    if (!this.running || !Number.isFinite(value)) return;
    const safeName = sanitizeMetricName(name);
    if (!safeName) return;
    this.gauges.set(safeName, value);
  }
  startOperation(name, labels) {
    if (!this.running) return NOOP_OPERATION;
    const safeName = sanitizeMetricName(name);
    if (!safeName) return NOOP_OPERATION;
    const startedAt = performance.now();
    const initialLabels = sanitizeLabels(labels);
    let ended = false;
    return {
      end: (result = {}) => {
        if (ended || !this.running) return;
        ended = true;
        const durationMs = Math.max(0, performance.now() - startedAt);
        const bucket = this.operations.get(safeName) ?? {
          count: 0,
          errorCount: 0,
          totalDurationMs: 0,
          maxDurationMs: 0,
          measurements: {}
        };
        bucket.count += 1;
        if (result.ok === false) bucket.errorCount += 1;
        bucket.totalDurationMs += durationMs;
        bucket.maxDurationMs = Math.max(bucket.maxDurationMs, durationMs);
        for (const [rawMeasurementName, rawValue] of Object.entries(result.measurements ?? {})) {
          if (rawValue === undefined || !Number.isFinite(rawValue)) continue;
          const measurementName = sanitizeMetricName(rawMeasurementName);
          if (!measurementName) continue;
          const measurement = bucket.measurements[measurementName] ?? {
            sum: 0,
            max: 0
          };
          measurement.sum += rawValue;
          measurement.max = Math.max(measurement.max, rawValue);
          bucket.measurements[measurementName] = measurement;
        }
        this.operations.set(safeName, bucket);
        const slowOperation = {
          name: safeName,
          durationMs: round(durationMs),
          ok: result.ok !== false,
          labels: sanitizeLabels({
            ...initialLabels,
            ...result.labels
          })
        };
        this.slowOperations.push(slowOperation);
        this.slowOperations.sort((left, right) => right.durationMs - left.durationMs);
        if (this.slowOperations.length > MAX_SLOW_OPERATIONS) this.slowOperations.length = MAX_SLOW_OPERATIONS;
      }
    };
  }
  registerExternalProcess(name, getPid) {
    const safeName = sanitizeMetricName(name);
    if (!safeName) return () => {};
    const registration = {
      name: safeName,
      getPid
    };
    this.externalProcesses.set(safeName, registration);
    return () => {
      if (this.externalProcesses.get(safeName) === registration) this.externalProcesses.delete(safeName);
    };
  }
  async collectSample(reason) {
    if (!this.running || this.sampleInFlight) return;
    this.sampleInFlight = true;
    const collectionStartedAt = performance.now();
    const collectionCpuStartedAt = process.cpuUsage();
    try {
      const now = Date.now();
      let externalProcessSamples = [];
      let rendererRuntimeSamples = [];
      const metrics = app.getAppMetrics().map(metric => ({
        pid: metric.pid,
        type: metric.type,
        name: metric.name || metric.serviceName || null,
        cpuPercent: round(metric.cpu.percentCPUUsage),
        idleWakeupsPerSecond: round(metric.cpu.idleWakeupsPerSecond),
        workingSetMb: kbToMb(metric.memory.workingSetSize)
      }));
      const totalCpuPercent = metrics.reduce((acc, metric) => acc + metric.cpuPercent, 0);
      const totalIdleWakeupsPerSecond = metrics.reduce((acc, metric) => acc + metric.idleWakeupsPerSecond, 0);
      const totalWorkingSetMb = metrics.reduce((acc, metric) => acc + metric.workingSetMb, 0);
      const currentCpuUsage = process.cpuUsage();
      const currentCpuSampleAt = performance.now();
      const elapsedMicros = Math.max(1, (currentCpuSampleAt - this.previousCpuSampleAt) * 1e3);
      const cpuDelta = process.cpuUsage(this.previousCpuUsage);
      const mainNodeCpuPercent = (cpuDelta.user + cpuDelta.system) / elapsedMicros * 100;
      this.previousCpuUsage = currentCpuUsage;
      this.previousCpuSampleAt = currentCpuSampleAt;
      if (now - this.lastExternalProcessSampleAt >= EXTERNAL_PROCESS_SAMPLE_INTERVAL_MS) {
        this.lastExternalProcessSampleAt = now;
        const registrations = [...this.externalProcesses.values()].map(registration => ({
          ...registration,
          pid: registration.getPid() ?? null
        })).filter(registration => typeof registration.pid === "number" && Number.isInteger(registration.pid) && registration.pid > 0);
        const samples = await runPs([...new Set(registrations.map(registration => registration.pid))]);
        externalProcessSamples = registrations.flatMap(registration => {
          const sample = samples.get(registration.pid);
          return sample ? [{
            name: registration.name,
            pid: registration.pid,
            ...sample
          }] : [];
        });
        rendererRuntimeSamples = await this.collectRendererRuntimeSamples();
      }
      const memory = process.memoryUsage();
      const eventLoopLagSamples = [...this.eventLoopLagSamples];
      const counters = Object.fromEntries([...this.counters.entries()].sort(([left], [right]) => left.localeCompare(right)));
      const gauges = Object.fromEntries([...this.gauges.entries()].sort(([left], [right]) => left.localeCompare(right)));
      const operations = Object.fromEntries([...this.operations.entries()].sort(([left], [right]) => left.localeCompare(right)).map(([name, operation]) => [name, {
        count: operation.count,
        errorCount: operation.errorCount,
        totalDurationMs: round(operation.totalDurationMs),
        averageDurationMs: round(operation.totalDurationMs / operation.count),
        maxDurationMs: round(operation.maxDurationMs),
        measurements: Object.fromEntries(Object.entries(operation.measurements).map(([measurementName, measurement]) => [measurementName, {
          sum: round(measurement.sum),
          max: round(measurement.max)
        }]))
      }]));
      this.writeRecord({
        type: "sample",
        timestamp: new Date(now).toISOString(),
        reason,
        elapsedMs: now - this.startedAt,
        processTotals: {
          cpuPercent: round(totalCpuPercent),
          idleWakeupsPerSecond: round(totalIdleWakeupsPerSecond),
          workingSetMb: round(totalWorkingSetMb)
        },
        processes: metrics,
        mainProcess: {
          nodeCpuPercent: round(mainNodeCpuPercent),
          rssMb: bytesToMb(memory.rss),
          heapUsedMb: bytesToMb(memory.heapUsed),
          heapTotalMb: bytesToMb(memory.heapTotal),
          externalMb: bytesToMb(memory.external)
        },
        eventLoop: {
          lagSampleCount: eventLoopLagSamples.length,
          lagMeanMs: round(eventLoopLagSamples.length > 0 ? eventLoopLagSamples.reduce((acc, value) => acc + value, 0) / eventLoopLagSamples.length : 0),
          lagP50Ms: round(percentile(eventLoopLagSamples, 50)),
          lagP95Ms: round(percentile(eventLoopLagSamples, 95)),
          lagP99Ms: round(percentile(eventLoopLagSamples, 99)),
          lagMaxMs: round(Math.max(0, ...eventLoopLagSamples))
        },
        appState: {
          windowCount: BrowserWindow.getAllWindows().length,
          visibleWindowCount: BrowserWindow.getAllWindows().filter(window => window.isVisible()).length,
          systemIdleSeconds: powerMonitor.getSystemIdleTime()
        },
        system: {
          freeMemoryMb: bytesToMb(os.freemem()),
          totalMemoryMb: bytesToMb(os.totalmem()),
          loadAverage: os.loadavg().map(value => round(value))
        },
        externalProcesses: externalProcessSamples,
        rendererWindows: rendererRuntimeSamples,
        counters,
        gauges,
        operations,
        slowOperations: this.slowOperations,
        monitorOverhead: {
          wallTimeMs: round(performance.now() - collectionStartedAt),
          cpuTimeMs: (() => {
            const cpuUsage = process.cpuUsage(collectionCpuStartedAt);
            return round((cpuUsage.user + cpuUsage.system) / 1e3);
          })()
        }
      });
      this.counters.clear();
      this.gauges.clear();
      this.operations.clear();
      this.slowOperations = [];
      this.eventLoopLagSamples = [];
    } catch (error) {
      this.writeRecord({
        type: "monitor_error",
        timestamp: (/* @__PURE__ */new Date()).toISOString(),
        errorType: error instanceof Error ? error.name : typeof error
      });
    } finally {
      this.sampleInFlight = false;
    }
  }
  writeRecord(record) {
    if (!this.logPath) return;
    try {
      fs.appendFileSync(this.logPath, `${JSON.stringify(record)}\n`, "utf8");
    } catch (error) {
      console.error("[DevPerformance] 写入性能日志失败:", error);
    }
  }
  async collectRendererRuntimeSamples() {
    const windows = BrowserWindow.getAllWindows().filter(window => !window.isDestroyed());
    return await Promise.all(windows.map(async window => {
      let documentVisibility = null;
      let domNodeCount = 0;
      let runningAnimationCount = 0;
      let runningTransitionCount = 0;
      let runningAnimationNames = [];
      try {
        const rawProbe = await new Promise(resolve => {
          const timeout = setTimeout(() => resolve(null), 250);
          timeout.unref?.();
          window.webContents.executeJavaScript(`(() => {
          const running = document.getAnimations().filter((animation) => animation.playState === 'running')
          const names = running
            .map((animation) => 'animationName' in animation ? animation.animationName : '')
            .filter((name) => typeof name === 'string' && name.length > 0)
          return {
            documentVisibility: document.visibilityState,
            domNodeCount: document.getElementsByTagName('*').length,
            runningAnimationCount: running.length,
            runningTransitionCount: running.filter((animation) => 'transitionProperty' in animation).length,
            runningAnimationNames: [...new Set(names)].slice(0, 12),
          }
        })()`).then(value => {
            clearTimeout(timeout);
            resolve(value);
          }, () => {
            clearTimeout(timeout);
            resolve(null);
          });
        });
        if (rawProbe && typeof rawProbe === "object") {
          const probe = rawProbe;
          documentVisibility = typeof probe.documentVisibility === "string" ? probe.documentVisibility.slice(0, 24) : null;
          domNodeCount = typeof probe.domNodeCount === "number" && Number.isFinite(probe.domNodeCount) ? probe.domNodeCount : 0;
          runningAnimationCount = typeof probe.runningAnimationCount === "number" && Number.isFinite(probe.runningAnimationCount) ? probe.runningAnimationCount : 0;
          runningTransitionCount = typeof probe.runningTransitionCount === "number" && Number.isFinite(probe.runningTransitionCount) ? probe.runningTransitionCount : 0;
          runningAnimationNames = Array.isArray(probe.runningAnimationNames) ? probe.runningAnimationNames.filter(name => typeof name === "string").map(name => sanitizeMetricName(name)).filter(Boolean).slice(0, 12) : [];
        }
      } catch {}
      return {
        windowId: window.id,
        visible: window.isVisible(),
        minimized: window.isMinimized(),
        focused: window.isFocused(),
        backgroundThrottlingEnabled: window.webContents.getBackgroundThrottling(),
        currentlyAudible: window.webContents.isCurrentlyAudible(),
        documentVisibility,
        domNodeCount,
        runningAnimationCount,
        runningTransitionCount,
        runningAnimationNames
      };
    }));
  }
};
var devPerformanceMonitorService = new DevPerformanceMonitorService();
//#endregion
//#region electron/services/native-active-context-collector.service.ts
var maxMouseSampleValues = 4e3;
var maxMouseClickValues = 6e3;
function isFiniteNumberArray(value, maxLength) {
  return Array.isArray(value) && value.length <= maxLength && value.every(item => typeof item === "number" && Number.isFinite(item));
}
function parseMouseBatch(value) {
  if (value.platform !== "macos" && value.platform !== "windows") return null;
  if (!isFiniteNumberArray(value.samples, maxMouseSampleValues) || value.samples.length % 2 !== 0) return null;
  if (!isFiniteNumberArray(value.clicks, maxMouseClickValues) || value.clicks.length % 3 !== 0) return null;
  for (let index = 2; index < value.clicks.length; index += 3) {
    const button = value.clicks[index];
    if (!Number.isInteger(button) || button < 0 || button > 3) return null;
  }
  const hiddenClicks = value.hiddenClicks === undefined ? [0, 0, 0, 0] : value.hiddenClicks;
  if (!isFiniteNumberArray(hiddenClicks, 4) || hiddenClicks.length !== 4 || hiddenClicks.some(count => count < 0)) return null;
  const scrolls = value.scrolls === undefined ? 0 : value.scrolls;
  if (typeof scrolls !== "number" || !Number.isFinite(scrolls) || scrolls < 0 || scrolls > 1e6) return null;
  const scrollsUp = value.scrollsUp === undefined ? 0 : value.scrollsUp;
  const scrollsDown = value.scrollsDown === undefined ? 0 : value.scrollsDown;
  if (typeof scrollsUp !== "number" || !Number.isFinite(scrollsUp) || scrollsUp < 0 || scrollsUp > scrolls) return null;
  if (typeof scrollsDown !== "number" || !Number.isFinite(scrollsDown) || scrollsDown < 0 || scrollsUp + scrollsDown > scrolls) return null;
  return {
    type: "mouse",
    platform: value.platform,
    samples: value.samples,
    clicks: value.clicks,
    hiddenClicks,
    scrolls,
    scrollsUp,
    scrollsDown
  };
}
var requestTimeoutMs = 4e3;
var maxOutputBufferLength = 1048576;
var initialRestartDelayMs = 1e3;
var maxRestartDelayMs = 3e4;
var stableRuntimeForRestartResetMs = 3e4;
var temporaryIdleStopMs = 6e4;
function isNativeCommandMessage(value) {
  if (typeof value.requestId !== "string") return false;
  if (value.type === "foreground") {
    const owner = value.owner;
    if (owner !== null && (!owner || typeof owner !== "object" || typeof owner.name !== "string" || typeof owner.path !== "string")) return false;
    const window = value.window;
    if (window !== null && (!window || typeof window !== "object" || typeof window.id !== "string" || typeof window.title !== "string" || !isFiniteBounds(window.bounds))) return false;
    return true;
  }
  if (value.type === "windows") return Array.isArray(value.windows) && value.windows.length <= 256 && value.windows.every(item => item && typeof item.appName === "string" && item.bounds !== null && isFiniteBounds(item.bounds));
  if (value.type === "wallpaper") return typeof value.success === "boolean" && Array.isArray(value.paths) && value.paths.every(item => typeof item === "string") && (value.photoPaths === undefined || Array.isArray(value.photoPaths) && value.photoPaths.every(item => typeof item === "string"));
  if (value.type === "signature") return typeof value.status === "string" && (value.thumbprint === null || typeof value.thumbprint === "string");
  return false;
}
function sameOptions(left, right) {
  return left.includeWindowContext === right.includeWindowContext && left.includeBrowserDomain === right.includeBrowserDomain && left.includeAccessibilityEvents === right.includeAccessibilityEvents && left.includeWindowBounds === right.includeWindowBounds && left.includeMouseHeatmap === right.includeMouseHeatmap;
}
function isFiniteBounds(value) {
  if (value === null) return true;
  if (!value || typeof value !== "object") return false;
  const bounds = value;
  return ["x", "y", "width", "height"].every(item => typeof bounds[item] === "number" && Number.isFinite(bounds[item]));
}
function parseMessage(line) {
  try {
    const value = JSON.parse(line);
    if (value.type === "activity_event") {
      if (value.platform !== "macos") return null;
      if (typeof value.observedAt !== "string" || !Number.isFinite(Date.parse(value.observedAt))) return null;
      if (!["app_activated", "focused_window_changed", "window_title_changed", "focused_element_changed", "value_changed", "selection_changed"].includes(String(value.eventType ?? ""))) return null;
      const appValue = value.app;
      if (appValue !== null) {
        if (!appValue || typeof appValue !== "object" || Array.isArray(appValue)) return null;
        const eventApp = appValue;
        if (typeof eventApp.bundleId !== "string" || typeof eventApp.name !== "string") return null;
        if (eventApp.processId !== null && typeof eventApp.processId !== "number") return null;
      }
      const windowValue = value.window;
      if (windowValue !== null) {
        if (!windowValue || typeof windowValue !== "object" || Array.isArray(windowValue)) return null;
        const eventWindow = windowValue;
        if (typeof eventWindow.id !== "string" || typeof eventWindow.title !== "string") return null;
      }
      const elementValue = value.element;
      if (elementValue !== null) {
        if (!elementValue || typeof elementValue !== "object" || Array.isArray(elementValue)) return null;
        const element = elementValue;
        if (typeof element.role !== "string" || typeof element.subrole !== "string") return null;
        if (typeof element.label !== "string" || typeof element.secure !== "boolean") return null;
      }
      if (value.actionName !== null && typeof value.actionName !== "string") return null;
      if (value.metadata !== null && (!value.metadata || typeof value.metadata !== "object" || Array.isArray(value.metadata))) return null;
      return value;
    }
    if (value.type !== "snapshot") return null;
    if (value.platform !== "macos" && value.platform !== "windows") return null;
    if (typeof value.observedAt !== "string" || !Number.isFinite(Date.parse(value.observedAt))) return null;
    if (!["event", "poll", "query", "resume", "config"].includes(String(value.reason ?? ""))) return null;
    if (value.requestId !== null && typeof value.requestId !== "string") return null;
    const ownerValue = value.owner;
    if (ownerValue !== null) {
      if (!ownerValue || typeof ownerValue !== "object" || Array.isArray(ownerValue)) return null;
      const owner = ownerValue;
      if (typeof owner.name !== "string" || typeof owner.processName !== "string") return null;
      if (typeof owner.path !== "string" || typeof owner.bundleId !== "string") return null;
      if (typeof owner.appUserModelId !== "string" || typeof owner.packageFamilyName !== "string") return null;
      if (owner.processId !== null && typeof owner.processId !== "number") return null;
    }
    const windowValue = value.window;
    if (windowValue !== null) {
      if (!windowValue || typeof windowValue !== "object" || Array.isArray(windowValue)) return null;
      const window = windowValue;
      if (typeof window.id !== "string" || typeof window.title !== "string") return null;
      if (!isFiniteBounds(window.bounds)) return null;
    }
    if (value.url !== null && typeof value.url !== "string") return null;
    return value;
  } catch {
    return null;
  }
}
var NativeActiveContextCollectorService = class {
  child = null;
  childReady = null;
  outputBuffer = "";
  current = null;
  options = {
    includeWindowContext: false,
    includeBrowserDomain: false,
    includeAccessibilityEvents: false,
    includeWindowBounds: false,
    includeMouseHeatmap: false
  };
  privacyPending = /* @__PURE__ */new Map();
  pending = /* @__PURE__ */new Map();
  commandPending = /* @__PURE__ */new Map();
  idleStopTimer = null;
  listeners = /* @__PURE__ */new Set();
  activityEventListeners = /* @__PURE__ */new Set();
  mouseBatchListeners = /* @__PURE__ */new Set();
  requestSequence = 0;
  keepAlive = false;
  paused = false;
  stopping = false;
  restartTimer = null;
  restartDelayMs = initialRestartDelayMs;
  childStartedAt = 0;
  unavailableUntil = 0;
  commandBackoffUntil = 0;
  start(options) {
    this.clearIdleStopTimer();
    this.keepAlive = true;
    this.paused = false;
    this.configure(options);
    this.ensureChild().then(() => {
      this.writeCommand("RESUME");
    }).catch(() => {});
  }
  configure(options) {
    const changed = !sameOptions(this.options, options);
    this.options = {
      ...options
    };
    if (!changed) return;
    this.current = null;
    if (this.child) this.writeConfiguration();
  }
  pause() {
    this.paused = true;
    this.current = null;
    if (this.child) this.writeCommand("PAUSE");
  }
  resume(options) {
    this.start(options);
  }
  stop() {
    this.keepAlive = false;
    this.paused = false;
    this.stopping = true;
    this.current = null;
    this.childStartedAt = 0;
    this.restartDelayMs = initialRestartDelayMs;
    this.unavailableUntil = 0;
    this.clearRestartTimer();
    this.clearIdleStopTimer();
    this.rejectPending(/* @__PURE__ */new Error("ACTIVE_CONTEXT_COLLECTOR_STOPPED"));
    const child = this.child;
    this.child = null;
    this.childReady = null;
    if (child) {
      if (!child.stdin.destroyed && child.stdin.writable) {
        child.stdin.write("QUIT\n", () => {});
        child.stdin.end();
      }
      setTimeout(() => {
        if (!child.killed) child.kill();
      }, 500).unref?.();
    }
    this.stopping = false;
  }
  getCached(options) {
    if (!sameOptions(this.options, options)) return null;
    return this.current;
  }
  async query(options) {
    const operation = devPerformanceMonitorService.startOperation("active_context.helper_query");
    let operationOk = false;
    this.configure(options);
    const temporary = !this.keepAlive;
    try {
      await this.ensureChild();
      const requestId = String(++this.requestSequence);
      const message = await new Promise((resolve, reject) => {
        const timer = setTimeout(() => {
          this.pending.delete(requestId);
          devPerformanceMonitorService.increment("active_context.helper_query_timeout");
          reject(/* @__PURE__ */new Error("ACTIVE_CONTEXT_HELPER_TIMEOUT"));
          this.restartChild();
        }, requestTimeoutMs);
        timer.unref?.();
        this.pending.set(requestId, {
          resolve,
          reject,
          timer
        });
        this.writeCommand(`QUERY ${requestId}`);
      });
      operationOk = true;
      return message;
    } finally {
      if (temporary && !this.keepAlive && !this.hasPendingRequests()) this.stop();
      operation.end({
        ok: operationOk
      });
    }
  }
  /** Independent command: privacy reads never change tracking options or populate the context cache. */
  async queryBrowserPrivacy(allWindows, browserApps) {
    const temporary = !this.keepAlive;
    try {
      await this.ensureChild();
      const requestId = String(++this.requestSequence);
      return await new Promise((resolve, reject) => {
        const timer = setTimeout(() => {
          this.privacyPending.delete(requestId);
          reject(/* @__PURE__ */new Error("BROWSER_PRIVACY_TIMEOUT"));
          this.restartChild();
        }, requestTimeoutMs);
        this.privacyPending.set(requestId, {
          resolve,
          reject,
          timer
        });
        const identities = browserApps.map(value => Buffer.from(value, "utf8").toString("hex")).join(",") || "-";
        this.writeCommand(`PRIVACY ${requestId} ${allWindows ? 1 : 0} ${identities}`);
      });
    } finally {
      if (temporary && !this.keepAlive && !this.hasPendingRequests()) this.stop();
    }
  }
  /**
  * 前台窗口读取，独立于采集配置：Windows 替代原 PowerShell 查询，macOS 替代 osascript。
  * 坐标在 Windows 上为物理像素，在 macOS 上为点（与 Electron 屏幕坐标一致）。
  */
  async queryForeground() {
    return await this.sendCommand("foreground", "FOREGROUND");
  }
  /** 可见窗口枚举；坐标单位同 queryForeground。 */
  async queryVisibleWindows() {
    return await this.sendCommand("windows", "WINDOWS");
  }
  async queryWallpaper() {
    return await this.sendCommand("wallpaper", "WALLPAPER");
  }
  async extractWallpaperFrame(source, output) {
    const args = [source, output].map(value => Buffer.from(value, "utf8").toString("hex"));
    if (!(await this.sendCommand("wallpaper", "WALLPAPER_FRAME", args, 2e4)).success) throw new Error("WALLPAPER_FRAME_FAILED");
  }
  /** Windows Authenticode 校验，状态名与 Get-AuthenticodeSignature 一致。 */
  async verifySignature(filePath) {
    const encodedPath = Buffer.from(filePath, "utf8").toString("hex");
    return await this.sendCommand("signature", "SIGNATURE", [encodedPath], 15e3);
  }
  /** Helper 可执行文件路径；Windows 提权更新会以一次性模式复用它。 */
  getHelperPath() {
    const executable = this.helperPath();
    return executable && existsSync(executable) ? executable : null;
  }
  async sendCommand(type, commandName, args = [], timeoutMs = requestTimeoutMs) {
    const isMac = process.platform === "darwin";
    if (process.platform !== "win32" && !(isMac && type !== "signature")) throw new Error("ACTIVE_CONTEXT_COMMAND_UNSUPPORTED");
    if (isMac && Date.now() < this.commandBackoffUntil) throw new Error("ACTIVE_CONTEXT_COMMAND_BACKOFF");
    this.clearIdleStopTimer();
    try {
      await this.ensureChild();
      const requestId = String(++this.requestSequence);
      return await new Promise((resolve, reject) => {
        const timer = setTimeout(() => {
          this.commandPending.delete(requestId);
          reject(/* @__PURE__ */new Error("ACTIVE_CONTEXT_COMMAND_TIMEOUT"));
          if (isMac) this.commandBackoffUntil = Date.now() + 6e5;else this.restartChild();
        }, timeoutMs);
        timer.unref?.();
        this.commandPending.set(requestId, {
          type,
          resolve,
          reject,
          timer
        });
        this.writeCommand([commandName, requestId, ...args].join(" "));
      });
    } finally {
      this.scheduleIdleStop();
    }
  }
  hasPendingRequests() {
    return this.pending.size > 0 || this.privacyPending.size > 0 || this.commandPending.size > 0;
  }
  scheduleIdleStop() {
    if (this.keepAlive || !this.child) return;
    this.clearIdleStopTimer();
    this.idleStopTimer = setTimeout(() => {
      this.idleStopTimer = null;
      if (!this.keepAlive && !this.hasPendingRequests()) this.stop();
    }, temporaryIdleStopMs);
    this.idleStopTimer.unref?.();
  }
  clearIdleStopTimer() {
    if (this.idleStopTimer) clearTimeout(this.idleStopTimer);
    this.idleStopTimer = null;
  }
  getProcessId() {
    const pid = this.child?.pid;
    return typeof pid === "number" && pid > 0 ? pid : null;
  }
  subscribe(listener) {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }
  subscribeActivityEvents(listener) {
    this.activityEventListeners.add(listener);
    return () => this.activityEventListeners.delete(listener);
  }
  subscribeMouseBatches(listener) {
    this.mouseBatchListeners.add(listener);
    return () => this.mouseBatchListeners.delete(listener);
  }
  helperPath() {
    if (process.platform !== "darwin" && process.platform !== "win32") return null;
    const platformDirectory = process.platform === "darwin" ? "darwin" : "win32";
    const fileName = process.platform === "darwin" ? "xiaohei-active-context" : "xiaohei-active-context.exe";
    const baseDirectory = app.isPackaged ? process.resourcesPath : path.join(app.getAppPath(), "resources");
    return path.join(baseDirectory, "native-context", platformDirectory, fileName);
  }
  async ensureChild() {
    if (this.child && this.childReady) return await this.childReady;
    if (this.restartTimer) throw new Error("ACTIVE_CONTEXT_HELPER_RESTART_PENDING");
    if (Date.now() < this.unavailableUntil) throw new Error("ACTIVE_CONTEXT_HELPER_BACKOFF");
    const executable = this.helperPath();
    if (!executable || !existsSync(executable)) {
      this.unavailableUntil = Date.now() + 6e4;
      throw new Error("ACTIVE_CONTEXT_HELPER_UNAVAILABLE");
    }
    this.clearRestartTimer();
    this.stopping = false;
    this.outputBuffer = "";
    this.childStartedAt = 0;
    const child = spawn(executable, [], {
      stdio: ["pipe", "pipe", "pipe"],
      windowsHide: true
    });
    child.stdin.on("error", () => {});
    const spawnOperation = devPerformanceMonitorService.startOperation("active_context.helper_spawn");
    this.child = child;
    this.childReady = new Promise((resolve, reject) => {
      let settled = false;
      child.once("spawn", () => {
        settled = true;
        this.childStartedAt = Date.now();
        this.unavailableUntil = 0;
        this.writeConfiguration();
        if (this.paused) this.writeCommand("PAUSE");
        devPerformanceMonitorService.increment("active_context.helper_spawned");
        spawnOperation.end({
          ok: true
        });
        resolve();
      });
      child.once("error", error => {
        spawnOperation.end({
          ok: false
        });
        if (!settled) reject(error);
        this.handleChildExit(child, error);
      });
    });
    child.stdout.setEncoding("utf8");
    child.stdout.on("data", chunk => this.handleOutput(child, chunk));
    child.stderr.on("data", () => {});
    child.once("exit", () => this.handleChildExit(child));
    return await this.childReady;
  }
  handleOutput(child, chunk) {
    if (this.child !== child) return;
    this.outputBuffer += chunk;
    if (this.outputBuffer.length > maxOutputBufferLength) {
      this.outputBuffer = "";
      this.restartChild();
      return;
    }
    let newlineIndex = this.outputBuffer.indexOf("\n");
    while (newlineIndex >= 0) {
      const line = this.outputBuffer.slice(0, newlineIndex).trim();
      this.outputBuffer = this.outputBuffer.slice(newlineIndex + 1);
      if (line) this.handleLine(line);
      newlineIndex = this.outputBuffer.indexOf("\n");
    }
  }
  handleLine(line) {
    try {
      const parsed = JSON.parse(line);
      if (parsed.type === "foreground" || parsed.type === "windows" || parsed.type === "signature" || parsed.type === "wallpaper") {
        const pending = typeof parsed.requestId === "string" ? this.commandPending.get(parsed.requestId) : undefined;
        if (!pending || pending.type !== parsed.type) return;
        clearTimeout(pending.timer);
        this.commandPending.delete(parsed.requestId);
        if (isNativeCommandMessage(parsed)) pending.resolve(parsed);else pending.reject(/* @__PURE__ */new Error("ACTIVE_CONTEXT_COMMAND_INVALID"));
        return;
      }
      const privacy = parsed;
      if (privacy.type === "privacy") {
        if (Array.isArray(privacy.windows)) {
          for (const window of privacy.windows) if (window && window.url === undefined) window.url = null;
        }
        if (typeof privacy.requestId !== "string" || typeof privacy.complete !== "boolean" || typeof privacy.foregroundId !== "string" || privacy.foregroundAppName !== undefined && typeof privacy.foregroundAppName !== "string" || !Array.isArray(privacy.windows) || privacy.windows.length > 256 || !privacy.windows.every(item => item && typeof item.id === "string" && typeof item.appName === "string" && typeof item.appIdentity === "string" && typeof item.foreground === "boolean" && (item.url === null || typeof item.url === "string" && item.url.length <= 32768) && (item.bounds === undefined || isFiniteBounds(item.bounds)))) return;
        const pending = this.privacyPending.get(privacy.requestId);
        if (pending) {
          clearTimeout(pending.timer);
          this.privacyPending.delete(privacy.requestId);
          pending.resolve(privacy);
        }
        return;
      }
      if (parsed.type === "mouse") {
        const batch = parseMouseBatch(parsed);
        if (!batch) {
          devPerformanceMonitorService.increment("active_context.helper_invalid_mouse_batch");
          return;
        }
        this.resetRestartDelayIfStable();
        if (this.paused || !this.options.includeMouseHeatmap) return;
        for (const listener of this.mouseBatchListeners) try {
          listener(batch);
        } catch {}
        return;
      }
    } catch {
      return;
    }
    const message = parseMessage(line);
    if (!message) {
      devPerformanceMonitorService.increment("active_context.helper_invalid_message");
      return;
    }
    if (message.type === "activity_event") {
      devPerformanceMonitorService.increment(`active_context.helper_activity_event.${message.eventType}`);
      this.resetRestartDelayIfStable();
      if (!this.paused && this.options.includeAccessibilityEvents) for (const listener of this.activityEventListeners) try {
        listener(message);
      } catch {}
      return;
    }
    devPerformanceMonitorService.increment(`active_context.helper_message.${message.reason}`);
    this.resetRestartDelayIfStable();
    if (!this.paused) this.current = message;
    if (message.requestId) {
      const pending = this.pending.get(message.requestId);
      if (pending) {
        clearTimeout(pending.timer);
        this.pending.delete(message.requestId);
        pending.resolve(message);
      }
    }
    if (message.reason !== "query") for (const listener of this.listeners) try {
      listener();
    } catch {}
  }
  handleChildExit(child, error) {
    if (this.child !== child) return;
    devPerformanceMonitorService.increment("active_context.helper_exit");
    this.resetRestartDelayIfStable();
    this.child = null;
    this.childReady = null;
    this.childStartedAt = 0;
    this.current = null;
    this.outputBuffer = "";
    this.rejectPending(error ?? /* @__PURE__ */new Error("ACTIVE_CONTEXT_HELPER_EXITED"));
    if (this.stopping || !this.keepAlive || this.paused) return;
    this.scheduleRestart();
  }
  restartChild() {
    devPerformanceMonitorService.increment("active_context.helper_restart");
    const child = this.child;
    if (child) {
      this.resetRestartDelayIfStable();
      this.child = null;
      this.childReady = null;
      this.childStartedAt = 0;
      this.current = null;
      this.rejectPending(/* @__PURE__ */new Error("ACTIVE_CONTEXT_HELPER_RESTARTED"));
      try {
        child.kill();
      } catch {}
    }
    if (this.keepAlive && !this.paused) this.scheduleRestart();
  }
  scheduleRestart() {
    if (this.restartTimer || !this.keepAlive || this.paused) return;
    const delay = this.restartDelayMs;
    this.restartDelayMs = Math.min(maxRestartDelayMs, this.restartDelayMs * 2);
    this.restartTimer = setTimeout(() => {
      this.restartTimer = null;
      this.ensureChild().catch(() => this.scheduleRestart());
    }, delay);
    this.restartTimer.unref?.();
  }
  clearRestartTimer() {
    if (this.restartTimer) clearTimeout(this.restartTimer);
    this.restartTimer = null;
  }
  resetRestartDelayIfStable() {
    if (this.childStartedAt > 0 && Date.now() - this.childStartedAt >= stableRuntimeForRestartResetMs) this.restartDelayMs = initialRestartDelayMs;
  }
  writeConfiguration() {
    const base = `CONFIG ${this.options.includeWindowContext ? 1 : 0} ${this.options.includeBrowserDomain ? 1 : 0}`;
    const windowBounds = this.options.includeWindowBounds ? 1 : 0;
    const mouseHeatmap = this.options.includeMouseHeatmap ? 1 : 0;
    this.writeCommand(process.platform === "darwin" ? `${base} ${this.options.includeAccessibilityEvents ? 1 : 0} ${windowBounds} ${mouseHeatmap}` : `${base} ${windowBounds} ${mouseHeatmap}`);
  }
  writeCommand(command) {
    if (!this.child || this.child.stdin.destroyed || !this.child.stdin.writable) return;
    try {
      this.child.stdin.write(`${command}\n`);
    } catch {}
  }
  rejectPending(error) {
    for (const pending of this.commandPending.values()) {
      clearTimeout(pending.timer);
      pending.reject(error);
    }
    this.commandPending.clear();
    for (const pending of this.privacyPending.values()) {
      clearTimeout(pending.timer);
      pending.reject(error);
    }
    this.privacyPending.clear();
    for (const pending of this.pending.values()) {
      clearTimeout(pending.timer);
      pending.reject(error);
    }
    this.pending.clear();
  }
};
var nativeActiveContextCollectorService = new NativeActiveContextCollectorService();
devPerformanceMonitorService.registerExternalProcess("active-context-helper", () => nativeActiveContextCollectorService.getProcessId());
//#endregion
export { devPerformanceMonitorService as n, nativeActiveContextCollectorService as t };