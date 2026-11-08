const { contextBridge, ipcRenderer } = require('electron')

// 悬浮待办窗口只暴露它用到的接口，结构与主窗口 preload.cjs 的同名字段保持一致。
contextBridge.exposeInMainWorld('electronAPI', {
  platform: process.platform,
  desktopSync: {
    subscribe: (input) => ipcRenderer.invoke('desktop-sync:subscribe', input),
    unsubscribe: (id) => ipcRenderer.invoke('desktop-sync:unsubscribe', id),
    ack: (input) => ipcRenderer.send('desktop-sync:ack', input),
    onChanged: (callback) => {
      const listener = (_event, notice) => { void callback(notice) }
      ipcRenderer.on('desktop-sync:changed', listener)
      return () => ipcRenderer.removeListener('desktop-sync:changed', listener)
    },
  },
  auth: {
    getSession: () => ipcRenderer.invoke('auth:get-session'),
  },
  todos: {
    list: (input) => ipcRenderer.invoke('todos:list', input),
    get: (input) => ipcRenderer.invoke('todos:get', input),
    create: (input) => ipcRenderer.invoke('todos:create', input),
    update: (input) => ipcRenderer.invoke('todos:update', input),
    patchStatus: (input) => ipcRenderer.invoke('todos:patch-status', input),
    patchPin: (input) => ipcRenderer.invoke('todos:patch-pin', input),
    listFriends: () => ipcRenderer.invoke('todos:list-friends'),
    listProjectHistory: () => ipcRenderer.invoke('todos:list-project-history'),
    rememberProjectHistory: (input) => ipcRenderer.invoke('todos:remember-project-history', input),
    onChanged: (callback) => {
      const listener = () => callback()
      ipcRenderer.on('todos:changed', listener)
      return () => ipcRenderer.removeListener('todos:changed', listener)
    },
  },
  todoFloating: {
    getState: () => ipcRenderer.invoke('todo-floating:get-state'),
    expand: (input) => ipcRenderer.invoke('todo-floating:expand', input),
    collapse: () => ipcRenderer.invoke('todo-floating:collapse'),
    toggle: () => ipcRenderer.invoke('todo-floating:toggle'),
    setLocked: (input) => ipcRenderer.invoke('todo-floating:set-locked', input),
    openMainTodo: (input) => ipcRenderer.invoke('todo-floating:open-main-todo', input),
    showMenu: (input) => ipcRenderer.send('todo-floating:show-menu', input),
    dragStart: (input) => ipcRenderer.send('todo-floating:drag-start', input),
    dragMove: (input) => ipcRenderer.send('todo-floating:drag-move', input),
    dragEnd: () => ipcRenderer.send('todo-floating:drag-end'),
    onStateChanged: (callback) => {
      const listener = (_event, state) => callback(state)
      ipcRenderer.on('todo-floating:state-changed', listener)
      return () => ipcRenderer.removeListener('todo-floating:state-changed', listener)
    },
  },
})
