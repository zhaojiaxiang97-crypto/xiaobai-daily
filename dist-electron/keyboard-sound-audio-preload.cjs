const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('keyboardSoundAudioAPI', {
  loadCustomFile: () => ipcRenderer.invoke('mechanical-keyboard:custom:load'),
  onCommand: (callback) => {
    const listener = (_event, command) => callback(command)
    ipcRenderer.on('keyboard-sound-audio:command', listener)
    return () => ipcRenderer.removeListener('keyboard-sound-audio:command', listener)
  },
  sendResponse: (response) => ipcRenderer.send('keyboard-sound-audio:response', response),
  signalReady: () => ipcRenderer.send('keyboard-sound-audio:ready'),
})
