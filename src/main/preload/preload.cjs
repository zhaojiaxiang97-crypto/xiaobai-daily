const { contextBridge, ipcRenderer, webUtils } = require('electron')

// 从 preload 启动即接收点击，避免 App 尚在初始化时丢失一次性的 IPC。
const nativeActionCallbacks = new Set()
const pendingNativeActions = []
ipcRenderer.on('notifications:native-action', (_event, data) => {
  if (!nativeActionCallbacks.size) {
    pendingNativeActions.push(data)
    if (pendingNativeActions.length > 20) pendingNativeActions.shift()
    return
  }
  for (const callback of nativeActionCallbacks) callback(data)
})

contextBridge.exposeInMainWorld('electronAPI', {
  platform: process.platform,
  desktopSync: {
    inviteRead: (input) => ipcRenderer.invoke('desktop-sync:invite-read', input),
    subscribe: (input) => ipcRenderer.invoke('desktop-sync:subscribe', input),
    unsubscribe: (id) => ipcRenderer.invoke('desktop-sync:unsubscribe', id),
    ack: (input) => ipcRenderer.send('desktop-sync:ack', input),
    onChanged: (callback) => {
      const listener = (_event, notice) => { void callback(notice) }
      ipcRenderer.on('desktop-sync:changed', listener)
      return () => ipcRenderer.removeListener('desktop-sync:changed', listener)
    },
  },
  minimize: () => ipcRenderer.send('window-minimize'),
  maximize: () => ipcRenderer.send('window-maximize'),
  close: () => ipcRenderer.send('window-close'),
  app: {
    confirmQuit: () => ipcRenderer.invoke('app:confirm-quit'),
    cancelQuitCheck: () => ipcRenderer.invoke('app:cancel-quit-check'),
    showQuitReminder: () => ipcRenderer.invoke('app:show-quit-reminder'),
    onQuitRequested: (callback) => {
      const listener = () => callback()
      ipcRenderer.on('app:quit-requested', listener)
      return () => ipcRenderer.removeListener('app:quit-requested', listener)
    },
  },
  getAppVersion: () => ipcRenderer.invoke('app:get-version'),
  getAppArch: () => ipcRenderer.invoke('app:get-arch'),
  getPermissionOnboardingState: () => ipcRenderer.invoke('app:get-permission-onboarding-state'),
  checkAccessibility: () => ipcRenderer.invoke('app:check-accessibility'),
  requestAccessibility: () => ipcRenderer.invoke('app:request-accessibility'),
  openNotificationSettings: () => ipcRenderer.invoke('app:open-notification-settings'),
  openExternal: (url) => ipcRenderer.invoke('app:open-external', url),
  growth: {
    image: (url) => ipcRenderer.invoke('growth:image', url), summary: () => ipcRenderer.invoke('growth:summary'), open: () => ipcRenderer.invoke('growth:open'),
    consumeBotOpen: () => ipcRenderer.invoke('growth:consume-bot-open'),
    onBotOpenPending: (callback) => {
      const listener = () => callback()
      ipcRenderer.on('growth:bot-open-pending', listener)
      return () => ipcRenderer.removeListener('growth:bot-open-pending', listener)
    }
  },
  efficiencyFestival: {
    open: () => ipcRenderer.invoke('efficiency-festival:open'),
  },
  openStudentVerification: () => ipcRenderer.invoke('app:open-student-verification'),
  permissions: {
    getMacStatus: () => ipcRenderer.invoke('permissions:mac-status'),
    openMacSettings: (key) => ipcRenderer.invoke('permissions:open-mac-settings', key),
  },
  onWindowStateChanged: (callback) => {
    const listener = (_event, state) => callback(state)
    ipcRenderer.on('window-state-changed', listener)
    return () => ipcRenderer.removeListener('window-state-changed', listener)
  },
  onQuotaExhausted: (callback) => {
    const listener = (_event, data) => callback(data)
    ipcRenderer.on('quota:exhausted', listener)
    return () => ipcRenderer.removeListener('quota:exhausted', listener)
  },
  onAlert: (callback) => {
    const listener = (_event, data) => callback(data)
    ipcRenderer.on('app:alert', listener)
    return () => ipcRenderer.removeListener('app:alert', listener)
  },
  updater: {
    check: () => ipcRenderer.invoke('updater:check'),
    download: () => ipcRenderer.invoke('updater:download'),
    startUpdate: () => ipcRenderer.invoke('updater:start-update'),
    dismissUpdate: (isForceUpdate) => ipcRenderer.invoke('updater:dismiss-update', isForceUpdate),
    quitAndInstall: () => ipcRenderer.invoke('updater:quit-and-install'),
    getPendingDialog: () => ipcRenderer.invoke('updater:get-pending-dialog'),
    getState: () => ipcRenderer.invoke('updater:get-state'),
    retry: () => ipcRenderer.invoke('updater:retry'),
    redownload: () => ipcRenderer.invoke('updater:redownload'),
    clearCache: () => ipcRenderer.invoke('updater:clear-cache'),
    moveToApplications: () => ipcRenderer.invoke('updater:move-to-applications'),
    openApplications: () => ipcRenderer.invoke('updater:open-applications'),
    manualFallback: () => ipcRenderer.invoke('updater:manual-fallback'),
    exportDiagnostics: () => ipcRenderer.invoke('updater:export-diagnostics'),
    onStateChanged: (callback) => {
      const listener = (_event, state) => callback(state)
      ipcRenderer.on('updater:state-changed', listener)
      return () => ipcRenderer.removeListener('updater:state-changed', listener)
    },
    onStatus: (callback) => {
      const listener = (_event, status) => callback(status)
      ipcRenderer.on('updater:status', listener)
      return () => ipcRenderer.removeListener('updater:status', listener)
    },
    onDialog: (callback) => {
      const listener = (_event, data) => callback(data)
      ipcRenderer.on('updater:dialog', listener)
      return () => ipcRenderer.removeListener('updater:dialog', listener)
    },
    onDialogDismiss: (callback) => {
      const listener = (_event, data) => callback(data)
      ipcRenderer.on('updater:dialog-dismiss', listener)
      return () => ipcRenderer.removeListener('updater:dialog-dismiss', listener)
    },
    getChangelog: () => ipcRenderer.invoke('updater:changelog'),
  },
  ai: {
    testModels: (input) => ipcRenderer.invoke('ai:test-models', input),
    diagnoseModelTest: (input) => ipcRenderer.invoke('ai:diagnose-model-test', input),
    testConnection: (input) => ipcRenderer.invoke('ai:test-connection', input),
    analyzeCurrentScreenshots: (input) => ipcRenderer.invoke('ai:analyze-current-screenshots', input),
    getCloudModelConfig: () => ipcRenderer.invoke('ai:get-cloud-model-config'),
    generateTemplate: (input) => ipcRenderer.invoke('ai:generate-template', input),
    onTemplateStreamChunk: (callback) => {
      const listener = (_event, data) => callback(data)
      ipcRenderer.on('ai:template-stream-chunk', listener)
      return () => ipcRenderer.removeListener('ai:template-stream-chunk', listener)
    },
    onTemplateStatusChanged: (callback) => {
      const listener = (_event, data) => callback(data)
      ipcRenderer.on('ai:template-status-changed', listener)
      return () => ipcRenderer.removeListener('ai:template-status-changed', listener)
    },
  },
  appConfig: {
    get: (key) => ipcRenderer.invoke('app-config:get', key),
    refresh: (key) => ipcRenderer.invoke('app-config:refresh', key),
  },
  auth: {
    browserStart: () => ipcRenderer.invoke('auth:browser-start'),
    browserPoll: () => ipcRenderer.invoke('auth:browser-poll'),
    browserReopen: () => ipcRenderer.invoke('auth:browser-reopen'),
    browserCancel: () => ipcRenderer.invoke('auth:browser-cancel'),
    login: (input) => ipcRenderer.invoke('auth:login', input),
    register: (input) => ipcRenderer.invoke('auth:register', input),

    logout: () => ipcRenderer.invoke('auth:logout'),
    getSession: () => ipcRenderer.invoke('auth:get-session'),
    syncSubscription: () => ipcRenderer.invoke('auth:sync-subscription'),
    getSubscription: () => ipcRenderer.invoke('auth:get-subscription'),
    syncUser: () => ipcRenderer.invoke('auth:sync-user'),
    updateAvatar: () => ipcRenderer.invoke('auth:update-avatar'),
    updateProfile: (input) => ipcRenderer.invoke('auth:update-profile', input),
    changePassword: (input) => ipcRenderer.invoke('auth:change-password', input),
    currentDevice: () => ipcRenderer.invoke('auth:current-device'),
    checkDevice: (deviceId) => ipcRenderer.invoke('auth:check-device', deviceId),
    sendVerificationCode: (input) => ipcRenderer.invoke('auth:send-verification-code', input),
    resetPassword: (input) => ipcRenderer.invoke('auth:reset-password', input),
    recoverAccount: (input) => ipcRenderer.invoke('auth:recover-account', input),
    onShouldRefreshSubscription: (callback) => {
      const listener = (_event) => callback()
      ipcRenderer.on('subscription:should-refresh', listener)
      return () => ipcRenderer.removeListener('subscription:should-refresh', listener)
    },
    onTokenExpired: (callback) => {
      const listener = (_event) => callback()
      ipcRenderer.on('auth:token-expired', listener)
      return () => ipcRenderer.removeListener('auth:token-expired', listener)
    },
    onForcedLogout: (callback) => {
      const listener = (_event, data) => callback(data)
      ipcRenderer.on('auth:forced-logout', listener)
      return () => ipcRenderer.removeListener('auth:forced-logout', listener)
    },
  },
  toolbox: {
    trackActivity: (input) => ipcRenderer.invoke('toolbox:track-activity', input),
    request: (input) => ipcRenderer.invoke('toolbox:request', input),
    uploadSignedPart: (input) => ipcRenderer.invoke('toolbox:upload-signed-part', input),
    download: (input) => ipcRenderer.invoke('toolbox:download', input),
  },
  toolboxLocal: {
    openWhiteboard: (input) => ipcRenderer.invoke('toolbox-local:whiteboard-open', input),
    saveFile: (input) => ipcRenderer.invoke('toolbox-local:save-file', input),
    saveFiles: (input) => ipcRenderer.invoke('toolbox-local:save-files', input),
    storeImageJob: (input) => ipcRenderer.invoke('toolbox-local:image-job-store', input),
    latestImageJob: (input) => ipcRenderer.invoke('toolbox-local:image-job-latest', input),
    clearImageJob: (input) => ipcRenderer.invoke('toolbox-local:image-job-clear', input),
    selectPdfs: (input) => ipcRenderer.invoke('toolbox-local:pdf-select', input),
    importPdfs: (files, locale) => ipcRenderer.invoke('toolbox-local:pdf-import', {
      filePaths: Array.from(files || []).map((file) => {
        try { return webUtils.getPathForFile(file) } catch { return '' }
      }).filter(Boolean),
      locale,
    }),
    compressPdfs: (input) => ipcRenderer.invoke('toolbox-local:pdf-compress', input),
    savePdfResult: (input) => ipcRenderer.invoke('toolbox-local:pdf-save', input),
    savePdfResults: (input) => ipcRenderer.invoke('toolbox-local:pdf-save-all', input),
    clearPdfJob: (input) => ipcRenderer.invoke('toolbox-local:pdf-clear-job', input),
  },
  clipboardAssistant: {
    getState: () => ipcRenderer.invoke('clipboard-assistant:get-state'),
    updateSettings: (input) => ipcRenderer.invoke('clipboard-assistant:update-settings', input),
    setShortcutEditing: (editing) => ipcRenderer.invoke('clipboard-assistant:set-shortcut-editing', editing),
    listHistory: (input) => ipcRenderer.invoke('clipboard-assistant:list-history', input),
    copyHistory: (input) => ipcRenderer.invoke('clipboard-assistant:copy-history', input),
    pinHistory: (input) => ipcRenderer.invoke('clipboard-assistant:pin-history', input),
    deleteHistory: (input) => ipcRenderer.invoke('clipboard-assistant:delete-history', input),
    clearHistory: () => ipcRenderer.invoke('clipboard-assistant:clear-history'),
    listPhrases: () => ipcRenderer.invoke('clipboard-assistant:list-phrases'),
    savePhrase: (input) => ipcRenderer.invoke('clipboard-assistant:save-phrase', input),
    deletePhrase: (input) => ipcRenderer.invoke('clipboard-assistant:delete-phrase', input),
    reorderPhrases: (input) => ipcRenderer.invoke('clipboard-assistant:reorder-phrases', input),
    copyPhrase: (input) => ipcRenderer.invoke('clipboard-assistant:copy-phrase', input),
    onChanged: (callback) => {
      const listener = (_event, payload) => callback(payload)
      ipcRenderer.on('clipboard-assistant:changed', listener)
      return () => ipcRenderer.removeListener('clipboard-assistant:changed', listener)
    },
  },
  screenshotBeautifier: {
    getState: () => ipcRenderer.invoke('screenshot-beautifier:get-state'),
    updateSettings: (input) => ipcRenderer.invoke('screenshot-beautifier:update-settings', input),
    setShortcutEditing: (editing) => ipcRenderer.invoke('screenshot-beautifier:set-shortcut-editing', editing),
    startCapture: () => ipcRenderer.invoke('screenshot-beautifier:start-capture'),
    importFile: () => ipcRenderer.invoke('screenshot-beautifier:import-file'),
    importImage: (data) => ipcRenderer.invoke('screenshot-beautifier:import-image', data),
    listHistory: () => ipcRenderer.invoke('screenshot-beautifier:list-history'),
    openHistory: (input) => ipcRenderer.invoke('screenshot-beautifier:open-history', input),
    copyHistory: (input) => ipcRenderer.invoke('screenshot-beautifier:copy-history', input),
    deleteHistory: (input) => ipcRenderer.invoke('screenshot-beautifier:delete-history', input),
    clearHistory: () => ipcRenderer.invoke('screenshot-beautifier:clear-history'),
    chooseSaveDirectory: () => ipcRenderer.invoke('screenshot-beautifier:choose-save-directory'),
    resetSaveDirectory: () => ipcRenderer.invoke('screenshot-beautifier:reset-save-directory'),
    openSaveDirectory: () => ipcRenderer.invoke('screenshot-beautifier:open-save-directory'),
    openScreenPermission: () => ipcRenderer.invoke('screenshot-beautifier:open-screen-permission'),
    consumeBotAttachments: () => ipcRenderer.invoke('screenshot-beautifier:consume-bot-attachments'),
    onChanged: (callback) => {
      const listener = (_event, payload) => callback(payload)
      ipcRenderer.on('screenshot-beautifier:changed', listener)
      return () => ipcRenderer.removeListener('screenshot-beautifier:changed', listener)
    },
    onBotAttachmentsPending: (callback) => {
      const listener = () => callback()
      ipcRenderer.on('screenshot-beautifier:bot-attachments-pending', listener)
      return () => ipcRenderer.removeListener('screenshot-beautifier:bot-attachments-pending', listener)
    },
  },
  publisher: {
    getPathForFile: (file) => webUtils.getPathForFile(file),
    selectVideo: (input) => ipcRenderer.invoke('publisher:select-video', input),
    selectCover: (input) => ipcRenderer.invoke('publisher:select-cover', input),
    listAccounts: () => ipcRenderer.invoke('publisher:accounts'),
    startBinding: (input) => ipcRenderer.invoke('publisher:binding-start', input),
    getBindingStatus: (input) => ipcRenderer.invoke('publisher:binding-status', input),
    refreshAccount: (input) => ipcRenderer.invoke('publisher:account-refresh', input),
    removeAccount: (input) => ipcRenderer.invoke('publisher:account-remove', input),
    createTask: (input) => ipcRenderer.invoke('publisher:task-create', input),
    getTask: (input) => ipcRenderer.invoke('publisher:task-get', input),
    cancelTask: (input) => ipcRenderer.invoke('publisher:task-cancel', input),
    listHistory: (input) => ipcRenderer.invoke('publisher:history', input),
    onChanged: (callback) => {
      const listener = (_event, data) => callback(data)
      ipcRenderer.on('publisher:changed', listener)
      return () => ipcRenderer.removeListener('publisher:changed', listener)
    },
  },
  markdownReader: {
    select: (dialogText) => ipcRenderer.invoke('markdown-reader:select', dialogText),
    read: (filePath, options) => ipcRenderer.invoke('markdown-reader:read', filePath, options),
    openDropped: (filePath) => ipcRenderer.invoke('markdown-reader:open-dropped', filePath),
    getPathForFile: (file) => { try { return webUtils.getPathForFile(file) } catch { return '' } },
    save: (input) => ipcRenderer.invoke('markdown-reader:save', input),
    saveAs: (input) => ipcRenderer.invoke('markdown-reader:save-as', input),
    exportDocument: (input) => ipcRenderer.invoke('markdown-reader:export', input),
    recent: () => ipcRenderer.invoke('markdown-reader:recent'),
    removeRecent: (filePath) => ipcRenderer.invoke('markdown-reader:remove-recent', filePath),
    readAsset: (input) => ipcRenderer.invoke('markdown-reader:asset', input),
    openLinked: (input) => ipcRenderer.invoke('markdown-reader:open-linked', input),
    openLocalFile: (input) => ipcRenderer.invoke('markdown-reader:open-local-file', input),
    reveal: (filePath) => ipcRenderer.invoke('markdown-reader:reveal', filePath),
    openExternal: (url) => ipcRenderer.invoke('markdown-reader:open-external', url),
    watch: (filePath) => ipcRenderer.invoke('markdown-reader:watch', filePath),
    onFileChanged: (callback) => {
      const listener = (_event, payload) => callback(payload)
      ipcRenderer.on('markdown-reader:file-changed', listener)
      return () => ipcRenderer.removeListener('markdown-reader:file-changed', listener)
    },
    consumePendingOpen: () => ipcRenderer.invoke('markdown-reader:consume-pending'),
    onOpenFilePending: (callback) => {
      const listener = () => callback()
      ipcRenderer.on('markdown-reader:open-file-pending', listener)
      return () => ipcRenderer.removeListener('markdown-reader:open-file-pending', listener)
    },
  },
  telemetry: {
    track: (event) => ipcRenderer.send('telemetry:track', event),
  },
  clientException: {
    reportApiRequest: (input) => ipcRenderer.invoke('client-exception:report-api-request', input),
  },
  settings: {
    get: () => ipcRenderer.invoke('settings:get'),
    update: (input) => ipcRenderer.invoke('settings:update', input),
    switchUsageMode: (input) => ipcRenderer.invoke('settings:switch-usage-mode', input),
    runAutoReportTask: (input) => ipcRenderer.invoke('settings:run-auto-report-task', input),
    setCaptureShortcutEditing: (editing) => ipcRenderer.invoke('settings:capture-shortcut-editing', editing),
    testProxy: (targetUrl) => ipcRenderer.invoke('settings:test-proxy', targetUrl),
    selectPreservePath: () => ipcRenderer.invoke('settings:select-preserve-path'),
    getUserProfileMemory: () => ipcRenderer.invoke('settings:get-user-profile-memory'),
    updateUserProfileMemory: (input) => ipcRenderer.invoke('settings:update-user-profile-memory', input),
    getUserProfileContext: () => ipcRenderer.invoke('settings:get-user-profile-context'),
    onChanged: (callback) => {
      const listener = (_event, data) => callback(data)
      ipcRenderer.on('settings:changed', listener)
      return () => ipcRenderer.removeListener('settings:changed', listener)
    },
  },
  enterKeyComponent: {
    getStatus: () => ipcRenderer.invoke('enter-key-component:get-status'),
    prepare: () => ipcRenderer.invoke('enter-key-component:prepare'),
    enable: () => ipcRenderer.invoke('enter-key-component:enable'),
    disable: () => ipcRenderer.invoke('enter-key-component:disable'),
    retry: () => ipcRenderer.invoke('enter-key-component:retry'),
    onStatusChanged: (callback) => {
      const listener = (_event, data) => callback(data)
      ipcRenderer.on('enter-key-component:status-changed', listener)
      return () => ipcRenderer.removeListener('enter-key-component:status-changed', listener)
    },
  },
  keyboardHeatmap: {
    getState: () => ipcRenderer.invoke('keyboard-heatmap:get-state'),
    prepare: () => ipcRenderer.invoke('keyboard-heatmap:prepare'),
    enable: () => ipcRenderer.invoke('keyboard-heatmap:enable'),
    disable: () => ipcRenderer.invoke('keyboard-heatmap:disable'),
    retry: () => ipcRenderer.invoke('keyboard-heatmap:retry'),
    query: (input) => ipcRenderer.invoke('keyboard-heatmap:query', input),
    onStateChanged: (callback) => {
      const listener = (_event, data) => callback(data)
      ipcRenderer.on('keyboard-heatmap:state-changed', listener)
      return () => ipcRenderer.removeListener('keyboard-heatmap:state-changed', listener)
    },
  },
  mechanicalKeyboardSound: {
    prepare: () => ipcRenderer.invoke('mechanical-keyboard:prepare'),
    enable: () => ipcRenderer.invoke('mechanical-keyboard:enable'),
    disable: () => ipcRenderer.invoke('mechanical-keyboard:disable'),
    retry: () => ipcRenderer.invoke('mechanical-keyboard:retry'),
    getCustomInfo: () => ipcRenderer.invoke('mechanical-keyboard:custom:get-info'),
    selectCustomFile: () => ipcRenderer.invoke('mechanical-keyboard:custom:select-file'),
    commitCustomFile: (token, processedDurationMs) => ipcRenderer.invoke('mechanical-keyboard:custom:commit', { token, processedDurationMs }),
    discardCustomFile: (token) => ipcRenderer.invoke('mechanical-keyboard:custom:discard', { token }),
    loadCustomFile: () => ipcRenderer.invoke('mechanical-keyboard:custom:load'),
    deleteCustomFile: () => ipcRenderer.invoke('mechanical-keyboard:custom:delete'),
  },
  keyboardSoundPlayer: {
    configure: (payload) => ipcRenderer.invoke('keyboard-sound-player:configure', payload),
    preview: (switchType) => ipcRenderer.invoke('keyboard-sound-player:preview', switchType),
    previewCustom: (data) => ipcRenderer.invoke('keyboard-sound-player:preview-custom', data),
    invalidateCustom: () => ipcRenderer.invoke('keyboard-sound-player:invalidate-custom'),
    isCustomAvailable: () => ipcRenderer.invoke('keyboard-sound-player:is-custom-available'),
    sync: () => ipcRenderer.invoke('keyboard-sound-player:sync'),
  },
  appLock: {
    getState: () => ipcRenderer.invoke('app-lock:get-state'),
    getRecoveryWordSuggestions: () => ipcRenderer.invoke('app-lock:get-recovery-word-suggestions'),
    setup: (input) => ipcRenderer.invoke('app-lock:setup', input),
    enable: () => ipcRenderer.invoke('app-lock:enable'),
    unlock: (input) => ipcRenderer.invoke('app-lock:unlock', input),
    changePassword: (input) => ipcRenderer.invoke('app-lock:change-password', input),
    changeRecoveryWords: (input) => ipcRenderer.invoke('app-lock:change-recovery-words', input),
    startRecoveryChallenge: () => ipcRenderer.invoke('app-lock:start-recovery-challenge'),
    verifyRecoveryChallenge: (input) => ipcRenderer.invoke('app-lock:verify-recovery-challenge', input),
    resetPasswordWithRecovery: (input) => ipcRenderer.invoke('app-lock:reset-password-with-recovery', input),
    disable: (input) => ipcRenderer.invoke('app-lock:disable', input),
    onStateChanged: (callback) => {
      const listener = (_event, state) => callback(state)
      ipcRenderer.on('app-lock:state-changed', listener)
      return () => ipcRenderer.removeListener('app-lock:state-changed', listener)
    },
  },
  firstReportGuide: {
    getState: () => ipcRenderer.invoke('first-report-guide:get-state'),
    markShown: () => ipcRenderer.invoke('first-report-guide:mark-shown'),
    dismiss: () => ipcRenderer.invoke('first-report-guide:dismiss'),
    evaluateExitReminder: () => ipcRenderer.invoke('first-report-guide:evaluate-exit-reminder'),
    markExitReminderShown: () => ipcRenderer.invoke('first-report-guide:mark-exit-reminder-shown'),
    setSuppressExitReminder: (input) => ipcRenderer.invoke('first-report-guide:set-suppress-exit-reminder', input),
    resetPrefs: () => ipcRenderer.invoke('first-report-guide:reset-prefs'),
  },
  reportCc: {
    unreadCount: () => ipcRenderer.invoke('report-cc:unread-count'),
    inbox: (input) => ipcRenderer.invoke('report-cc:inbox', input),
    sent: (input) => ipcRenderer.invoke('report-cc:sent', input),
    docStats: (input) => ipcRenderer.invoke('report-cc:doc-stats', input),
    shareState: (input) => ipcRenderer.invoke('report-cc:share-state', input),
    send: (input) => ipcRenderer.invoke('report-cc:send', input),
    updateDoc: (input) => ipcRenderer.invoke('report-cc:update-doc', input),
    localExists: (input) => ipcRenderer.invoke('report-cc:local-exists', input),
    onAutoShared: (callback) => {
      const listener = (_event, data) => callback(data)
      ipcRenderer.on('report-cc:auto-shared', listener)
      return () => ipcRenderer.removeListener('report-cc:auto-shared', listener)
    },
    withdraw: (input) => ipcRenderer.invoke('report-cc:withdraw', input),
    detail: (input) => ipcRenderer.invoke('report-cc:detail', input),
    like: (input) => ipcRenderer.invoke('report-cc:like', input),
    addComment: (input) => ipcRenderer.invoke('report-cc:add-comment', input),
    deleteComment: (input) => ipcRenderer.invoke('report-cc:delete-comment', input),
    materials: (input) => ipcRenderer.invoke('report-cc:materials', input),
    summaryTemplates: () => ipcRenderer.invoke('report-cc:summary-templates'),
    saveSummaryTemplate: (input) => ipcRenderer.invoke('report-cc:save-summary-template', input),
    deleteSummaryTemplate: (input) => ipcRenderer.invoke('report-cc:delete-summary-template', input),
    summaryPrefs: () => ipcRenderer.invoke('report-cc:summary-prefs'),
    saveSummaryPrefs: (input) => ipcRenderer.invoke('report-cc:save-summary-prefs', input),
    generateSummary: (input) => ipcRenderer.invoke('report-cc:generate-summary', input),
  },
  reports: {
    progress: (id) => ipcRenderer.invoke('reports:progress', { id }),
    estimateCredits: (input) => ipcRenderer.invoke('reports:estimate-credits', input),
    generate: (input) => ipcRenderer.invoke('reports:generate', input),
    generateFact: (input) => ipcRenderer.invoke('reports:generate-fact', input),
    list: (input) => ipcRenderer.invoke('reports:list', input),
    delete: (input) => ipcRenderer.invoke('reports:delete', input),
    exportToFile: (input) => ipcRenderer.invoke('report:export-to-file', input),
    visualReportPricing: () => ipcRenderer.invoke('reports:visual-report-pricing'),
    visualReportQuote: (input) => ipcRenderer.invoke('reports:visual-report-quote', input),
    selectVisualReportSavePath: (input) => ipcRenderer.invoke('reports:select-visual-report-save-path', input),
    generateVisualReport: (input) => ipcRenderer.invoke('reports:generate-visual-report', input),
    openVisualReportFile: (input) => ipcRenderer.invoke('reports:open-visual-report-file', input),
    updateTitle: (input) => ipcRenderer.invoke('reports:updateTitle', input),
    updateContent: (input) => ipcRenderer.invoke('reports:updateContent', input),
    onStatusChanged: (callback) => {
      const listener = (_event, report) => callback(report)
      ipcRenderer.on('report:status-changed', listener)
      return () => ipcRenderer.removeListener('report:status-changed', listener)
    },
    onStreamChunk: (callback) => {
      const listener = (_event, data) => callback(data)
      ipcRenderer.on('report:stream-chunk', listener)
      return () => ipcRenderer.removeListener('report:stream-chunk', listener)
    },
    onVisualReportStreamUpdate: (callback) => {
      const listener = (_event, data) => callback(data)
      ipcRenderer.on('report:visual-report-stream-update', listener)
      return () => ipcRenderer.removeListener('report:visual-report-stream-update', listener)
    },
  },
  reportTemplates: {
    list: (input) => ipcRenderer.invoke('report-templates:list', input),
    create: (input) => ipcRenderer.invoke('report-templates:create', input),
    update: (input) => ipcRenderer.invoke('report-templates:update', input),
    delete: (input) => ipcRenderer.invoke('report-templates:delete', input),
  },
  templateMarket: {
    list: (input) => ipcRenderer.invoke('template-market:list', input),
    detail: (input) => ipcRenderer.invoke('template-market:detail', input),
    publish: (input) => ipcRenderer.invoke('template-market:publish', input),
    update: (input) => ipcRenderer.invoke('template-market:update', input),
    delete: (input) => ipcRenderer.invoke('template-market:delete', input),
    purchase: (input) => ipcRenderer.invoke('template-market:purchase', input),
    transactions: (input) => ipcRenderer.invoke('template-market:transactions', input),
    use: (input) => ipcRenderer.invoke('template-market:use', input),
  },
  screenshotPromptTemplates: {
    list: (input) => ipcRenderer.invoke('screenshot-prompt-templates:list', input),
    detail: (input) => ipcRenderer.invoke('screenshot-prompt-templates:detail', input),
    create: (input) => ipcRenderer.invoke('screenshot-prompt-templates:create', input),
    update: (input) => ipcRenderer.invoke('screenshot-prompt-templates:update', input),
    delete: (input) => ipcRenderer.invoke('screenshot-prompt-templates:delete', input),
    saveOverride: (input) => ipcRenderer.invoke('screenshot-prompt-templates:save-override', input),
    deleteOverride: (input) => ipcRenderer.invoke('screenshot-prompt-templates:delete-override', input),
  },
  screenshots: {
    getDisplays: () => ipcRenderer.invoke('screenshots:displays'),
    runSmokeTest: () => ipcRenderer.invoke('screenshots:smoke-test'),
  },
  upload: {
    fromClipboard: () => ipcRenderer.invoke('upload:from-clipboard'),
    fromFile: () => ipcRenderer.invoke('upload:from-file'),
  },
  audioTranscription: {
    getCapability: () => ipcRenderer.invoke('audio-transcription:capability'),
    selectFile: () => ipcRenderer.invoke('audio-transcription:select-file'),
    transcribe: (input) => ipcRenderer.invoke('audio-transcription:transcribe', input),
    clearFile: (input) => ipcRenderer.invoke('audio-transcription:clear-file', input),
  },
  recorder: {
    start: () => ipcRenderer.invoke('recorder:start'),
    stop: () => ipcRenderer.invoke('recorder:stop'),
    resume: () => ipcRenderer.invoke('recorder:resume'),
    getStatus: () => ipcRenderer.invoke('recorder:status'),
  },
  dataManagement: {
    getStorageLocation: () => ipcRenderer.invoke('data-management:storage-location'),
    changeStorageLocation: () => ipcRenderer.invoke('data-management:change-storage-location'),
    restoreDefaultStorageLocation: () => ipcRenderer.invoke('data-management:restore-default-storage-location'),
    getLocalStats: () => ipcRenderer.invoke('data-management:local-stats'),
    getGroupCounts: (input) => ipcRenderer.invoke('data-management:group-counts', input),
    analyzeImport: (input) => ipcRenderer.invoke('data-management:analyze-import', input),
    previewClear: (input) => ipcRenderer.invoke('data-management:preview-clear', input),
    exportBackup: (input) => ipcRenderer.invoke('data-management:export', input),
    exportDayData: (input) => ipcRenderer.invoke('data-management:export-day', input),
    previewImportBackup: () => ipcRenderer.invoke('data-management:preview-import'),
    importBackup: (input) => ipcRenderer.invoke('data-management:import', input),
    exportFullBackup: (input) => ipcRenderer.invoke('data-management:export-full-backup', input),
    previewFullRestore: () => ipcRenderer.invoke('data-management:preview-full-restore'),
    applyFullRestore: (input) => ipcRenderer.invoke('data-management:apply-full-restore', input),
    consumeFullRestoreState: () => ipcRenderer.invoke('data-management:consume-full-restore-state'),
    onFullBackupProgress: (callback) => {
      const listener = (_event, progress) => callback(progress)
      ipcRenderer.on('data-management:full-backup-progress', listener)
      return () => ipcRenderer.removeListener('data-management:full-backup-progress', listener)
    },
    clearData: (input) => ipcRenderer.invoke('data-management:clear', input),
  },
  workRecords: {
    list: (input) => ipcRenderer.invoke('work-records:list', input),
    create: (input) => ipcRenderer.invoke('work-records:create', input),
    update: (input) => ipcRenderer.invoke('work-records:update', input),
    replaceText: (input) => ipcRenderer.invoke('work-records:replace-text', input),
    delete: (input) => ipcRenderer.invoke('work-records:delete', input),
    getDailySummary: (input) => ipcRenderer.invoke('work-records:daily-summary', input),
    getDailyOverview: (input) => ipcRenderer.invoke('work-records:daily-overview', input),
    getDailySummaries: (input) => ipcRenderer.invoke('work-records:daily-summaries', input),
    getUsageStats: () => ipcRenderer.invoke('work-records:usage-stats'),
    onChanged: (callback) => {
      const listener = () => callback()
      ipcRenderer.on('work-records:changed', listener)
      return () => ipcRenderer.removeListener('work-records:changed', listener)
    },
  },
  recordingBox: {
    list: () => ipcRenderer.invoke('recording-box:list'),
    add: (input) => ipcRenderer.invoke('recording-box:add', input),
    update: (input) => ipcRenderer.invoke('recording-box:update', input),
    remove: (input) => ipcRenderer.invoke('recording-box:remove', input),
    sync: (input) => ipcRenderer.invoke('recording-box:sync', input),
    getBindingStatuses: (input) => ipcRenderer.invoke('recording-box:binding-status', input),
    bindAccount: (input) => ipcRenderer.invoke('recording-box:bind-account', input),
    unbindAccount: (input) => ipcRenderer.invoke('recording-box:unbind-account', input),
    onChanged: (callback) => {
      const listener = () => callback()
      ipcRenderer.on('recording-box:changed', listener)
      return () => ipcRenderer.removeListener('recording-box:changed', listener)
    },
  },
  agentSessionImport: {
    getStatus: () => ipcRenderer.invoke('agent-session-import:status'),
    runNow: () => ipcRenderer.invoke('agent-session-import:run'),
    previewManual: (input) => ipcRenderer.invoke('agent-session-import:preview-manual', input),
    importManual: (input) => ipcRenderer.invoke('agent-session-import:import-manual', input),
    discardManualPreview: () => ipcRenderer.invoke('agent-session-import:discard-manual-preview'),
    onChanged: (callback) => {
      const listener = () => callback()
      ipcRenderer.on('agent-session-import:changed', listener)
      return () => ipcRenderer.removeListener('agent-session-import:changed', listener)
    },
  },
  workRecordCategories: {
    list: (input) => ipcRenderer.invoke('work-record-categories:list', input),
    create: (input) => ipcRenderer.invoke('work-record-categories:create', input),
    update: (input) => ipcRenderer.invoke('work-record-categories:update', input),
    delete: (input) => ipcRenderer.invoke('work-record-categories:delete', input),
  },
  appUsage: {
    list: (input) => ipcRenderer.invoke('app-usage:list', input),
    summary: (input) => ipcRenderer.invoke('app-usage:summary', input),
    overview: (input) => ipcRenderer.invoke('app-usage:overview', input),
    flows: (input) => ipcRenderer.invoke('app-usage:flows', input),
    barcode: (input) => ipcRenderer.invoke('app-usage:barcode', input),
    screenHeatmap: (input) => ipcRenderer.invoke('app-usage:screen-heatmap', input),
    mouseHeatmap: (input) => ipcRenderer.invoke('app-usage:mouse-heatmap', input),
    detail: (input) => ipcRenderer.invoke('app-usage:detail', input),
    contexts: (input) => ipcRenderer.invoke('app-usage:contexts', input),
    clear: (input) => ipcRenderer.invoke('app-usage:clear', input),
    distinctAppNames: () => ipcRenderer.invoke('app-usage:distinct-app-names'),
    checkPermission: () => ipcRenderer.invoke('app-usage:check-permission'),
    diagnostics: () => ipcRenderer.invoke('app-usage:diagnostics'),
    openAccessibility: () => ipcRenderer.invoke('app-usage:open-accessibility'),
    openScreenRecordingSettings: () => ipcRenderer.invoke('app-usage:open-screen-recording'),
  },
  badges: {
    getList: () => ipcRenderer.invoke('badges:get-list'),
    markNotified: (badgeId) => ipcRenderer.invoke('badges:mark-notified', { badgeId }),
    triggerEvent: (event, payload) => ipcRenderer.invoke('badges:trigger-event', { event, payload }),
    onUnlocked: (callback) => {
      const listener = (_event, data) => callback(data)
      ipcRenderer.on('badge:unlocked', listener)
      return () => ipcRenderer.removeListener('badge:unlocked', listener)
    },
  },
  lobster: {
    getLogs: (input) => ipcRenderer.invoke('lobster:get-logs', input),
    clearLogs: () => ipcRenderer.invoke('lobster:clear-logs'),
    getServerUrl: () => ipcRenderer.invoke('lobster:get-server-url'),
    getServerStatus: () => ipcRenderer.invoke('lobster:get-server-status'),
  },
  scheduledReport: {
    runOnce: () => ipcRenderer.invoke('scheduled-report:run-once'),
    preview: (input) => ipcRenderer.invoke('scheduled-report:preview', input),
    getLogs: (input) => ipcRenderer.invoke('scheduled-report:get-logs', input),
    clearLogs: () => ipcRenderer.invoke('scheduled-report:clear-logs'),
  },
  miniProgramSync: {
    getStatus: () => ipcRenderer.invoke('miniprogram-sync:get-status'),
    syncNow: () => ipcRenderer.invoke('miniprogram-sync:sync-now'),
    purgeCloud: () => ipcRenderer.invoke('miniprogram-sync:purge-cloud'),
  },
  leaderboard: {
    getConsentState: () => ipcRenderer.invoke('leaderboard:get-consent-state'),
    acceptConsent: (input) => ipcRenderer.invoke('leaderboard:accept-consent', input),
    updateProfileVisibility: (input) => ipcRenderer.invoke('leaderboard:update-profile-visibility', input),
    updateDailyDigest: (input) => ipcRenderer.invoke('leaderboard:update-daily-digest', input),
    leave: () => ipcRenderer.invoke('leaderboard:leave'),
    getDaily: (input) => ipcRenderer.invoke('leaderboard:daily', input),
  },
  points: {
    getCreditCampaign: () => ipcRenderer.invoke('points:get-credit-campaign'),
    claimCreditCampaign: (id) => ipcRenderer.invoke('points:claim-credit-campaign', id),
    getBalance: () => ipcRenderer.invoke('points:get-balance'),
    getCreditsBalance: () => ipcRenderer.invoke('points:get-credits-balance'),
    getCoreBillingProfile: () => ipcRenderer.invoke('points:get-core-billing-profile'),
    getCreditsExchangePolicy: () => ipcRenderer.invoke('points:get-credits-exchange-policy'),
    getModelConfigs: (lang) => ipcRenderer.invoke('points:get-model-configs', lang),
    getRechargeConfig: () => ipcRenderer.invoke('points:get-recharge-config'),
    getCreditRechargeConfig: () => ipcRenderer.invoke('points:get-credit-recharge-config'),
    getFeaturePricing: () => ipcRenderer.invoke('points:get-feature-pricing'),
    getUsageRecords: (page, pageSize, source) => ipcRenderer.invoke('points:get-usage-records', page, pageSize, source),
    getCreditLedger: (query) => ipcRenderer.invoke('points:get-credit-ledger', query),
    getCreditUsageRecords: (page, pageSize, source) => ipcRenderer.invoke('points:get-credit-usage-records', page, pageSize, source),
    consumeWordCloud: () => ipcRenderer.invoke('points:consume-word-cloud'),
    consumeCompression: (input) => ipcRenderer.invoke('points:consume-compression', input),
    settleCompression: (input) => ipcRenderer.invoke('points:settle-compression', input),
  },
  wordCloudHistory: {
    list: () => ipcRenderer.invoke('word-cloud-history:list'),
    create: (input) => ipcRenderer.invoke('word-cloud-history:create', input),
  },
  todos: {
    conversation: (input) => ipcRenderer.invoke('todos:conversation', input),
    list: (input) => ipcRenderer.invoke('todos:list', input),
    get: (input) => ipcRenderer.invoke('todos:get', input),
    getStats: (input) => ipcRenderer.invoke('todos:stats', input),
    listLabels: (input) => ipcRenderer.invoke('todos:list-labels', input),
    removeLabelHistory: (input) => ipcRenderer.invoke('todos:remove-label-history', input),
    create: (input) => ipcRenderer.invoke('todos:create', input),
    update: (input) => ipcRenderer.invoke('todos:update', input),
    patchStatus: (input) => ipcRenderer.invoke('todos:patch-status', input),
    patchPin: (input) => ipcRenderer.invoke('todos:patch-pin', input),
    reorder: (input) => ipcRenderer.invoke('todos:reorder', input),
    delete: (input) => ipcRenderer.invoke('todos:delete', input),
    resolveAssignee: (input) => ipcRenderer.invoke('todos:resolve-assignee', input),
    listAssigneeContacts: () => ipcRenderer.invoke('todos:list-assignee-contacts'),
    uploadAttachment: (input) => ipcRenderer.invoke('todos:upload-attachment', input),
    uploadClipboardAttachment: (input) => ipcRenderer.invoke('todos:upload-clipboard-attachment', input),
    selectPendingAttachmentFile: () => ipcRenderer.invoke('todos:select-pending-attachment-file'),
    prepareDroppedAttachmentFiles: (files) => ipcRenderer.invoke('todos:prepare-dropped-attachment-files', {
      filePaths: Array.from(files || []).map((file) => {
        try { return webUtils.getPathForFile(file) } catch { return '' }
      }).filter(Boolean),
    }),
    readPendingClipboardAttachment: () => ipcRenderer.invoke('todos:read-pending-clipboard-attachment'),
    uploadPendingAttachment: (input) => ipcRenderer.invoke('todos:upload-pending-attachment', input),
    clearPendingAttachment: (input) => ipcRenderer.invoke('todos:clear-pending-attachment', input),
    downloadAttachment: (input) => ipcRenderer.invoke('todos:download-attachment', input),
    openHtmlAttachment: (input) => ipcRenderer.invoke('todos:open-html-attachment', input),
    deleteAttachment: (input) => ipcRenderer.invoke('todos:delete-attachment', input),
    listActivities: (input) => ipcRenderer.invoke('todos:list-activities', input),
    activitySummary: (input) => ipcRenderer.invoke('todos:activity-summary', input),
    addComment: (input) => ipcRenderer.invoke('todos:add-comment', input),
    deleteComment: (input) => ipcRenderer.invoke('todos:delete-comment', input),
    listFriends: () => ipcRenderer.invoke('todos:list-friends'),
    searchFriendUser: (input) => ipcRenderer.invoke('todos:search-friend-user', input),
    addFriend: (input) => ipcRenderer.invoke('todos:add-friend', input),
    sendFriendRequest: (input) => ipcRenderer.invoke('todos:send-friend-request', input),
    listFriendRequests: () => ipcRenderer.invoke('todos:list-friend-requests'),
    acceptFriendRequest: (input) => ipcRenderer.invoke('todos:accept-friend-request', input),
    rejectFriendRequest: (input) => ipcRenderer.invoke('todos:reject-friend-request', input),
    cancelFriendRequest: (input) => ipcRenderer.invoke('todos:cancel-friend-request', input),
    updateFriendRemark: (input) => ipcRenderer.invoke('todos:update-friend-remark', input),
    removeFriend: (input) => ipcRenderer.invoke('todos:remove-friend', input),
    getExtractPreview: (input) => ipcRenderer.invoke('todos:extract-preview', input),
    extractFromTimeline: (input) => ipcRenderer.invoke('todos:extract-from-timeline', input),
    getAutoCompletionPreview: () => ipcRenderer.invoke('todos:auto-completion-preview'),
    runAutoCompletion: () => ipcRenderer.invoke('todos:auto-completion-run'),
    listAutoCompletionRecords: (input) => ipcRenderer.invoke('todos:auto-completion-records', input),
    getAutoCompletionStatus: () => ipcRenderer.invoke('todos:auto-completion-status'),
    listProjectHistory: () => ipcRenderer.invoke('todos:list-project-history'),
    rememberProjectHistory: (input) => ipcRenderer.invoke('todos:remember-project-history', input),
    mergeProjectHistory: (input) => ipcRenderer.invoke('todos:merge-project-history', input),
    removeProjectHistory: (input) => ipcRenderer.invoke('todos:remove-project-history', input),
    onChanged: (callback) => {
      const listener = () => callback()
      ipcRenderer.on('todos:changed', listener)
      return () => ipcRenderer.removeListener('todos:changed', listener)
    },
    onAutoCompletionStatus: (callback) => {
      const listener = (_event, data) => callback(data)
      ipcRenderer.on('todos:auto-completion-status', listener)
      return () => ipcRenderer.removeListener('todos:auto-completion-status', listener)
    },
  },
  todoFloating: {
    getState: () => ipcRenderer.invoke('todo-floating:get-state'),
    enable: () => ipcRenderer.invoke('todo-floating:enable'),
    disable: () => ipcRenderer.invoke('todo-floating:disable'),
    collapse: () => ipcRenderer.invoke('todo-floating:collapse'),
    onStateChanged: (callback) => {
      const listener = (_event, state) => callback(state)
      ipcRenderer.on('todo-floating:state-changed', listener)
      return () => ipcRenderer.removeListener('todo-floating:state-changed', listener)
    },
    onOpenMainTodo: (callback) => {
      const listener = (_event, payload) => callback(payload)
      ipcRenderer.on('todo-floating:open-main-todo', listener)
      return () => ipcRenderer.removeListener('todo-floating:open-main-todo', listener)
    },
  },
  woodenFish: {
    getState: () => ipcRenderer.invoke('wooden-fish:get-state'),
    showAgain: () => ipcRenderer.invoke('wooden-fish:show-again'),
    setHostReady: (input) => ipcRenderer.send('wooden-fish:set-host-ready', input),
    showMenu: (input) => ipcRenderer.send('wooden-fish:show-menu', input),
    onStateChanged: (callback) => {
      const listener = (_event, state) => callback(state)
      ipcRenderer.on('wooden-fish:state-changed', listener)
      return () => ipcRenderer.removeListener('wooden-fish:state-changed', listener)
    },
  },
  workMotivator: {
    getState: () => ipcRenderer.invoke('work-motivator:get-state'),
    showAgain: () => ipcRenderer.invoke('work-motivator:show-again'),
    setShortcutEditing: (input) => ipcRenderer.invoke('work-motivator:set-shortcut-editing', input),
    setHostReady: (input) => ipcRenderer.send('work-motivator:set-host-ready', input),
    onStateChanged: (callback) => {
      const listener = (_event, state) => callback(state)
      ipcRenderer.on('work-motivator:state-changed', listener)
      return () => ipcRenderer.removeListener('work-motivator:state-changed', listener)
    },
    onOpenTool: (callback) => {
      const listener = (_event, payload) => callback(payload)
      ipcRenderer.on('toolbox:open-tool', listener)
      return () => ipcRenderer.removeListener('toolbox:open-tool', listener)
    },
  },
  appMenu: {
    onNavigate: (callback) => {
      const listener = (_event, payload) => callback(payload)
      ipcRenderer.on('menu:navigate', listener)
      return () => ipcRenderer.removeListener('menu:navigate', listener)
    },
    onAction: (callback) => {
      const listener = (_event, payload) => callback(payload)
      ipcRenderer.on('menu:action', listener)
      return () => ipcRenderer.removeListener('menu:action', listener)
    },
  },
  tokenUsage: {
    getSummary: () => ipcRenderer.invoke('token-usage:summary'),
    list: (input) => ipcRenderer.invoke('token-usage:list', input),
  },
  frameDedupLog: {
    list: (input) => ipcRenderer.invoke('frame-dedup-log:list', input),
  },
  captureDebug: {
    list: (input) => ipcRenderer.invoke('capture-debug:list', input),
    getImages: (input) => ipcRenderer.invoke('capture-debug:get-images', input),
    clear: () => ipcRenderer.invoke('capture-debug:clear'),
  },
  pipelineLog: {
    openDir: () => ipcRenderer.invoke('pipeline-log:open-dir'),
    clear: () => ipcRenderer.invoke('pipeline-log:clear'),
  },
  notifications: {
    sync: () => ipcRenderer.invoke('notifications:sync'),
    list: () => ipcRenderer.invoke('notifications:list'),
    unreadCount: () => ipcRenderer.invoke('notifications:unread-count'),
    markRead: (notificationId) => ipcRenderer.invoke('notifications:mark-read', { notificationId }),
    markAllRead: () => ipcRenderer.invoke('notifications:mark-all-read'),
    restoreReadStatus: () => ipcRenderer.invoke('notifications:restore-read-status'),
    addMonthlyRecap: (input) => ipcRenderer.invoke('notifications:add-monthly-recap', input),
    onChanged: (callback) => {
      const listener = () => callback()
      ipcRenderer.on('notifications:changed', listener)
      return () => ipcRenderer.removeListener('notifications:changed', listener)
    },
    onNativeAction: (callback) => {
      nativeActionCallbacks.add(callback)
      for (const data of pendingNativeActions.splice(0)) callback(data)
      return () => nativeActionCallbacks.delete(callback)
    },
  },
  surveys: {
    getActive: () => ipcRenderer.invoke('surveys:active'),
    markSeen: (surveyId) => ipcRenderer.invoke('surveys:seen', { surveyId }),
    submit: (surveyId, answers) => ipcRenderer.invoke('surveys:submit', { surveyId, answers }),
    skip: (surveyId) => ipcRenderer.invoke('surveys:skip', { surveyId }),
  },
  xiaoheiBot: {
    getTutorial: (input) => ipcRenderer.invoke('xiaohei-bot:tutorial-get', input),
    updateTutorial: (input) => ipcRenderer.invoke('xiaohei-bot:tutorial-update', input),
    startTutorial: (input) => ipcRenderer.invoke('xiaohei-bot:tutorial-start', input),
    openTutorialArtifact: (input) => ipcRenderer.invoke('xiaohei-bot:tutorial-open-artifact', input),
    listMemories: (input) => ipcRenderer.invoke('xiaohei-bot:memories-list', input),
    saveMemory: (input) => ipcRenderer.invoke('xiaohei-bot:memories-save', input),
    deleteMemory: (input) => ipcRenderer.invoke('xiaohei-bot:memories-delete', input),
    retryMemoryExtraction: (input) => ipcRenderer.invoke('xiaohei-bot:memories-retry', input),
    onMemoriesChanged: (callback) => {
      const handler = (_event, payload) => callback(payload)
      ipcRenderer.on('xiaohei-bot:memories-changed', handler)
      return () => ipcRenderer.removeListener('xiaohei-bot:memories-changed', handler)
    },
    listSchedules: (input) => ipcRenderer.invoke('xiaohei-bot:schedules-list', input),
    saveSchedule: (input) => ipcRenderer.invoke('xiaohei-bot:schedules-save', input),
    deleteSchedule: (input) => ipcRenderer.invoke('xiaohei-bot:schedules-delete', input),
    runSchedule: (input) => ipcRenderer.invoke('xiaohei-bot:schedules-run', input),
    scheduleHistory: (input) => ipcRenderer.invoke('xiaohei-bot:schedules-history', input),
    setVisibleConversation: (conversationId) => ipcRenderer.invoke('xiaohei-bot:visible-conversation', { conversationId }),
    onSchedulesChanged: (callback) => {
      const handler = () => callback()
      ipcRenderer.on('xiaohei-bot:schedules-changed', handler)
      return () => ipcRenderer.removeListener('xiaohei-bot:schedules-changed', handler)
    },
    listConsultations: (input) => ipcRenderer.invoke('xiaohei-bot:consultations', input),
    consultationDetail: (input) => ipcRenderer.invoke('xiaohei-bot:consultation-detail', input),
    cancelConsultation: (id) => ipcRenderer.invoke('xiaohei-bot:consultation-cancel', id),
    deleteConsultation: (id) => ipcRenderer.invoke('xiaohei-bot:consultation-delete', id),
    listSideTopics: (input) => ipcRenderer.invoke('xiaohei-bot:side-topics', input),
    getOrCreateSideTopic: (input) => ipcRenderer.invoke('xiaohei-bot:side-topic', input),
    showReplyFileMenu: (input) => ipcRenderer.invoke('xiaohei-bot:reply-file-menu', input),
    resolveReplyPaths: (input) => ipcRenderer.invoke('xiaohei-bot:resolve-reply-paths', input),
    loadDraft: (id) => ipcRenderer.invoke('xiaohei-bot:load-draft', id),
    draftPreviews: (ids) => ipcRenderer.invoke('xiaohei-bot:draft-previews', ids),
    saveDraft: (input) => ipcRenderer.invoke('xiaohei-bot:save-draft', input),
    openReplyPath: (input) => ipcRenderer.invoke('xiaohei-bot:open-reply-path', input),
    getAttachmentPath: (file) => { try { return webUtils.getPathForFile(file) } catch { return '' } },
    importAttachments: (paths) => ipcRenderer.invoke('xiaohei-bot:import-attachments', paths),
    clipboardAttachments: () => ipcRenderer.invoke('xiaohei-bot:clipboard-attachments'),
    selectFolders: () => ipcRenderer.invoke('xiaohei-bot:select-folders'),
    wechatState: () => ipcRenderer.invoke('xiaohei-bot:wechat-state'),
    wechatBegin: (input) => ipcRenderer.invoke('xiaohei-bot:wechat-begin', input),
    wechatCancel: (input) => ipcRenderer.invoke('xiaohei-bot:wechat-cancel', input),
    wechatVerify: (input) => ipcRenderer.invoke('xiaohei-bot:wechat-verify', input),
    wechatReconnect: (input) => ipcRenderer.invoke('xiaohei-bot:wechat-reconnect', input),
    wechatUnbind: (input) => ipcRenderer.invoke('xiaohei-bot:wechat-unbind', input),
    refreshModelCatalog: () => ipcRenderer.invoke('xiaohei-bot:refresh-model-catalog'),
    bootstrap: () => ipcRenderer.invoke('xiaohei-bot:bootstrap'),
    getActiveConversationIds: () => ipcRenderer.invoke('xiaohei-bot:active-conversations'),
    getUnreadConversationIds: () => ipcRenderer.invoke('xiaohei-bot:unread-conversations'),
    listCommonRoles: () => ipcRenderer.invoke('xiaohei-bot:list-common-roles'),
    refreshDefaultRoles: () => ipcRenderer.invoke('xiaohei-bot:refresh-default-roles'),
    consumeSharedRole: () => ipcRenderer.invoke('xiaohei-bot:consume-shared-role'),
    readSharedRole: (id) => ipcRenderer.invoke('xiaohei-bot:read-shared-role', id),
    importSharedRole: (input) => ipcRenderer.invoke('xiaohei-bot:import-shared-role', input),
    onSharedRolePending: (callback) => {
      const listener = () => callback()
      ipcRenderer.on('xiaohei-bot:share-open-pending', listener)
      return () => ipcRenderer.removeListener('xiaohei-bot:share-open-pending', listener)
    },
    addCommonRole: (input) => ipcRenderer.invoke('xiaohei-bot:add-common-role', input),
    listDefaultAvatars: () => ipcRenderer.invoke('xiaohei-bot:list-default-avatars'),
    listMessages: (input) => ipcRenderer.invoke('xiaohei-bot:list-messages', input),
    createBot: (input) => ipcRenderer.invoke('xiaohei-bot:create-bot', input),
    updateBot: (input) => ipcRenderer.invoke('xiaohei-bot:update-bot', input),
    deleteBot: (input) => ipcRenderer.invoke('xiaohei-bot:delete-bot', input),
    createGroup: (input) => ipcRenderer.invoke('xiaohei-bot:create-group', input),
    updateGroup: (input) => ipcRenderer.invoke('xiaohei-bot:update-group', input),
    addMembers: (input) => ipcRenderer.invoke('xiaohei-bot:add-members', input),
    updateMember: (input) => ipcRenderer.invoke('xiaohei-bot:update-member', input),
    removeMember: (input) => ipcRenderer.invoke('xiaohei-bot:remove-member', input),
    deleteGroup: (input) => ipcRenderer.invoke('xiaohei-bot:delete-group', input),
    setNotifications: (input) => ipcRenderer.invoke('xiaohei-bot:set-notifications', input),
    setMobileSync: (input) => ipcRenderer.invoke('xiaohei-bot:set-mobile-sync', input),
    markRead: (input) => ipcRenderer.invoke('xiaohei-bot:mark-read', input),
    markUnread: (input) => ipcRenderer.invoke('xiaohei-bot:mark-unread', input),
    setPinned: (input) => ipcRenderer.invoke('xiaohei-bot:set-pinned', input),
    setSidebarHidden: (input) => ipcRenderer.invoke('xiaohei-bot:set-sidebar-hidden', input),
    setDefaultRoleListRemoved: (input) => ipcRenderer.invoke('xiaohei-bot:set-default-role-list-removed', input),
    saveProvider: (input) => ipcRenderer.invoke('xiaohei-bot:save-provider', input),
    deleteProvider: (input) => ipcRenderer.invoke('xiaohei-bot:delete-provider', input),
    listProviderCatalog: () => ipcRenderer.invoke('xiaohei-bot:list-provider-catalog'),
    listMcp: () => ipcRenderer.invoke('xiaohei-bot:mcp-list'),
    readMcpConfig: (input) => ipcRenderer.invoke('xiaohei-bot:mcp-read-config', input),
    manageMcp: (input) => ipcRenderer.invoke('xiaohei-bot:mcp-manage', input),
    checkMcp: (input) => ipcRenderer.invoke('xiaohei-bot:mcp-check', input),
    onMcpChanged: (callback) => {
      const listener = () => callback()
      ipcRenderer.on('xiaohei-bot:mcp-changed', listener)
      return () => ipcRenderer.removeListener('xiaohei-bot:mcp-changed', listener)
    },
    loginProvider: (input) => ipcRenderer.invoke('xiaohei-bot:login-provider', input),
    logoutProvider: (input) => ipcRenderer.invoke('xiaohei-bot:logout-provider', input),
    respondProviderAuth: (input) => ipcRenderer.invoke('xiaohei-bot:respond-provider-auth', input),
    cancelProviderAuth: (input) => ipcRenderer.invoke('xiaohei-bot:cancel-provider-auth', input),
    sendMessage: (input) => ipcRenderer.invoke('xiaohei-bot:send-message', input),
    abortConversation: (input) => ipcRenderer.invoke('xiaohei-bot:abort-conversation', input),
    updateSettings: (input) => ipcRenderer.invoke('xiaohei-bot:update-settings', input),
    sharedWorkspace: () => ipcRenderer.invoke('xiaohei-bot:shared-workspace-view'),
    readSharedFile: (input) => ipcRenderer.invoke('xiaohei-bot:shared-workspace-read', input),
    saveSharedFile: (input) => ipcRenderer.invoke('xiaohei-bot:shared-workspace-save', input),
    sharedFileHistory: (input) => ipcRenderer.invoke('xiaohei-bot:shared-workspace-history', input),
    sharedFileVersion: (input) => ipcRenderer.invoke('xiaohei-bot:shared-workspace-version', input),
    openSharedWorkspace: (input) => ipcRenderer.invoke('xiaohei-bot:shared-workspace-open', input),
    selectSharedWorkspace: (input) => ipcRenderer.invoke('xiaohei-bot:shared-workspace-select', input),
    onSharedWorkspaceChanged: (callback) => {
      const listener = () => callback()
      ipcRenderer.on('xiaohei-bot:shared-workspace-changed', listener)
      return () => ipcRenderer.removeListener('xiaohei-bot:shared-workspace-changed', listener)
    },
    listEvents: (input) => ipcRenderer.invoke('xiaohei-bot:list-events', input),
    traceEvent: (input) => ipcRenderer.invoke('xiaohei-bot:trace-event', input),
    verifyLog: (input) => ipcRenderer.invoke('xiaohei-bot:verify-log', input),
    listDiagnosticChunks: (input) => ipcRenderer.invoke('xiaohei-bot:list-diagnostic-chunks', input),
    createLogSnapshot: (input) => ipcRenderer.invoke('xiaohei-bot:create-log-snapshot', input),
    exportLog: (input) => ipcRenderer.invoke('xiaohei-bot:export-log', input),
    selectWorkingDirectory: (input) => ipcRenderer.invoke('xiaohei-bot:select-working-directory', input),
    resetWorkingDirectory: (input) => ipcRenderer.invoke('xiaohei-bot:reset-working-directory', input),
    openWorkingDirectory: (input) => ipcRenderer.invoke('xiaohei-bot:open-working-directory', input),
    openExternal: (input) => ipcRenderer.invoke('xiaohei-bot:open-external', input),
    openAttachment: (input) => ipcRenderer.invoke('xiaohei-bot:open-attachment', input),
    downloadAttachment: (input) => ipcRenderer.invoke('xiaohei-bot:download-attachment', input),
    onEvent: (callback) => {
      const listener = (_event, data) => callback(data)
      ipcRenderer.on('xiaohei-bot:event', listener)
      return () => ipcRenderer.removeListener('xiaohei-bot:event', listener)
    },
  },
  saveImage: (dataUrl, options) => ipcRenderer.invoke('save-image', dataUrl, options),
  showImageContextMenu: (input) => ipcRenderer.invoke('image-context-menu:show', input),
  fetchImageAsBase64: (url) => ipcRenderer.invoke('fetch-image-as-base64', url),
  readLocalImage: (filePath) => ipcRenderer.invoke('file:read-as-base64', filePath),
  dayReplay: {
    thumbnails: (input) => ipcRenderer.invoke('day-replay:thumbnails', input),
    saveVideo: (input) => ipcRenderer.invoke('day-replay:save-video', input),
  },
  webAccounts: {
    list: () => ipcRenderer.invoke('web-accounts:list'),
    authorize: (input) => ipcRenderer.invoke('web-accounts:authorize', input),
    reauthorize: (input) => ipcRenderer.invoke('web-accounts:reauthorize', input),
    update: (input) => ipcRenderer.invoke('web-accounts:update', input),
    remove: (input) => ipcRenderer.invoke('web-accounts:remove', input),
    onChanged: (callback) => {
      const listener = () => callback()
      ipcRenderer.on('web-accounts:changed', listener)
      return () => ipcRenderer.removeListener('web-accounts:changed', listener)
    },
  },
  deepseekChat: {
    open: (input) => ipcRenderer.invoke('deepseek-chat:open', input),
    openLogin: () => ipcRenderer.invoke('deepseek-chat:open-login'),
    onStatusChanged: (callback) => {
      const listener = (_event, data) => callback(data)
      ipcRenderer.on('deepseek-chat:status-changed', listener)
      return () => ipcRenderer.removeListener('deepseek-chat:status-changed', listener)
    },
    onResult: (callback) => {
      const listener = (_event, data) => callback(data)
      ipcRenderer.once('deepseek-chat:result', listener)
      return () => ipcRenderer.removeListener('deepseek-chat:result', listener)
    },
  },
  chatgptChat: {
    open: (input) => ipcRenderer.invoke('chatgpt-chat:open', input),
    openLogin: () => ipcRenderer.invoke('chatgpt-chat:open-login'),
    onStatusChanged: (callback) => {
      const listener = (_event, data) => callback(data)
      ipcRenderer.on('chatgpt-chat:status-changed', listener)
      return () => ipcRenderer.removeListener('chatgpt-chat:status-changed', listener)
    },
    onResult: (callback) => {
      const listener = (_event, data) => callback(data)
      ipcRenderer.once('chatgpt-chat:result', listener)
      return () => ipcRenderer.removeListener('chatgpt-chat:result', listener)
    },
  },
})
