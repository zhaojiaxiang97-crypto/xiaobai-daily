const { contextBridge, ipcRenderer } = require('electron')

// 桌面悬浮木鱼窗口只暴露木鱼自己需要的接口
contextBridge.exposeInMainWorld('electronAPI', {
  platform: process.platform,
  woodenFish: {
    getWindowState: () => ipcRenderer.invoke('wooden-fish:get-window-state'),
    showMenu: (input) => ipcRenderer.send('wooden-fish:show-menu', input),
    setInteractive: (input) => ipcRenderer.send('wooden-fish:set-interactive', input),
    dragStart: (input) => ipcRenderer.send('wooden-fish:drag-start', input),
    dragMove: (input) => ipcRenderer.send('wooden-fish:drag-move', input),
    dragEnd: () => ipcRenderer.send('wooden-fish:drag-end'),
    onWindowState: (callback) => {
      const listener = (_event, state) => callback(state)
      ipcRenderer.on('wooden-fish:window-state', listener)
      return () => ipcRenderer.removeListener('wooden-fish:window-state', listener)
    },
  },
})
