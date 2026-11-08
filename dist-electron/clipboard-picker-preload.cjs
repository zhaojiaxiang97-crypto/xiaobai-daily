const { contextBridge, ipcRenderer } = require('electron')

// 剪贴板助手快捷浮窗只暴露浮窗自己需要的接口
contextBridge.exposeInMainWorld('clipboardPickerAPI', {
  platform: process.platform,
  search: (input) => ipcRenderer.invoke('clipboard-picker:search', input),
  copy: (input) => ipcRenderer.invoke('clipboard-picker:copy', input),
  detail: (input) => ipcRenderer.invoke('clipboard-picker:detail', input),
  hide: () => ipcRenderer.send('clipboard-picker:hide'),
  onOpen: (callback) => {
    const listener = (_event, payload) => callback(payload)
    ipcRenderer.on('clipboard-picker:open', listener)
    return () => ipcRenderer.removeListener('clipboard-picker:open', listener)
  },
})
