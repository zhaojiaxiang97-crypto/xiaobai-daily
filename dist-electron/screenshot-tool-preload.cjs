const { contextBridge, ipcRenderer } = require('electron')

function on(channel, callback) {
  const listener = (_event, payload) => callback(payload)
  ipcRenderer.on(channel, listener)
  return () => ipcRenderer.removeListener(channel, listener)
}

// 截图遮罩、美化编辑器、钉图、提示卡共用这一份接口；主进程按发送窗口逐个校验，不属于该窗口的调用会被忽略
contextBridge.exposeInMainWorld('screenshotToolAPI', {
  platform: process.platform,
  // 页面挂载好、监听都注册后调用一次，主进程才会推送内容
  ready: () => ipcRenderer.send('screenshot-tool:ready'),
  onTheme: (callback) => on('screenshot-tool:theme', callback),
  overlay: {
    onOpen: (callback) => on('screenshot-tool:overlay-open', callback),
    onReset: (callback) => on('screenshot-tool:overlay-reset', callback),
    onClear: (callback) => on('screenshot-tool:overlay-clear', callback),
    onEscape: (callback) => on('screenshot-tool:overlay-escape', callback),
    painted: (sessionId) => ipcRenderer.send('screenshot-tool:overlay-painted', { sessionId }),
    focus: () => ipcRenderer.send('screenshot-tool:overlay-focus'),
    selection: (hasSelection) => ipcRenderer.send('screenshot-tool:overlay-selection', { hasSelection }),
    cancel: () => ipcRenderer.send('screenshot-tool:overlay-cancel'),
    copyColor: (color) => ipcRenderer.send('screenshot-tool:overlay-copy-color', { color }),
    finish: (input) => ipcRenderer.invoke('screenshot-tool:overlay-finish', input),
  },
  editor: {
    loadBackground: (id) => ipcRenderer.invoke('screenshot-tool:editor-load-background', { id }),
    backgrounds: (source) => ipcRenderer.invoke('screenshot-tool:editor-backgrounds', { source }),
    onOpen: (callback) => on('screenshot-tool:editor-open', callback),
    onReset: (callback) => on('screenshot-tool:editor-reset', callback),
    copy: (input) => ipcRenderer.invoke('screenshot-tool:editor-copy', input),
    save: (input) => ipcRenderer.invoke('screenshot-tool:editor-save', input),
    pin: (input) => ipcRenderer.invoke('screenshot-tool:editor-pin', input),
    sendToBot: (input) => ipcRenderer.invoke('screenshot-tool:editor-send-to-bot', input),
    ocr: (input) => ipcRenderer.invoke('screenshot-tool:editor-ocr', input),
    updateState: (input) => ipcRenderer.send('screenshot-tool:editor-update-state', input),
    savePreset: (input) => ipcRenderer.invoke('screenshot-tool:editor-save-preset', input),
    deletePreset: (input) => ipcRenderer.invoke('screenshot-tool:editor-delete-preset', input),
    close: () => ipcRenderer.send('screenshot-tool:editor-close'),
    revealFile: (filePath) => ipcRenderer.send('screenshot-tool:editor-reveal-file', { filePath }),
  },
  pin: {
    onOpen: (callback) => on('screenshot-tool:pin-open', callback),
    onZoom: (callback) => on('screenshot-tool:pin-zoom', callback),
    painted: () => ipcRenderer.send('screenshot-tool:pin-painted'),
    dragStart: (input) => ipcRenderer.send('screenshot-tool:pin-drag-start', input),
    dragMove: (input) => ipcRenderer.send('screenshot-tool:pin-drag-move', input),
    dragEnd: () => ipcRenderer.send('screenshot-tool:pin-drag-end'),
    zoom: (input) => ipcRenderer.send('screenshot-tool:pin-zoom', input),
    menu: () => ipcRenderer.send('screenshot-tool:pin-menu'),
    close: () => ipcRenderer.send('screenshot-tool:pin-close'),
  },
  toast: {
    onOpen: (callback) => on('screenshot-tool:toast-open', callback),
    action: (action) => ipcRenderer.send('screenshot-tool:toast-action', { action }),
    hover: (hovered) => ipcRenderer.send('screenshot-tool:toast-hover', { hovered }),
  },
})
