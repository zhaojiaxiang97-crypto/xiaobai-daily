const { contextBridge, ipcRenderer } = require('electron')

// 上班鼓励器桌面悬浮窗只暴露自己需要的接口
contextBridge.exposeInMainWorld('workMotivatorAPI', {
  platform: process.platform,
  getWindowState: () => ipcRenderer.invoke('work-motivator:get-window-state'),
  showMenu: (input) => ipcRenderer.send('work-motivator:show-menu', input),
  setExpanded: (input) => ipcRenderer.send('work-motivator:set-expanded', input),
  update: (input) => ipcRenderer.send('work-motivator:update', input),
  openSettings: () => ipcRenderer.send('work-motivator:open-settings'),
  hide: () => ipcRenderer.send('work-motivator:hide'),
  dragStart: (input) => ipcRenderer.send('work-motivator:drag-start', input),
  dragMove: (input) => ipcRenderer.send('work-motivator:drag-move', input),
  dragEnd: () => ipcRenderer.send('work-motivator:drag-end'),
  onWindowState: (callback) => {
    const listener = (_event, state) => callback(state)
    ipcRenderer.on('work-motivator:window-state', listener)
    return () => ipcRenderer.removeListener('work-motivator:window-state', listener)
  },
})
