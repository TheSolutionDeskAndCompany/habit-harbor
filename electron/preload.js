const { contextBridge, ipcRenderer } = require('electron');

// Expose protected methods that allow the renderer process to use
// the ipcRenderer without exposing the entire object
contextBridge.exposeInMainWorld('electronAPI', {
  // Data operations
  loadHabits: () => ipcRenderer.invoke('load-habits'),
  saveHabits: (data) => ipcRenderer.invoke('save-habits', data),
  
  // Notifications
  showNotification: (options) => ipcRenderer.invoke('show-notification', options),
  
  // App info
  getAppInfo: () => ipcRenderer.invoke('get-app-info'),
  
  // Menu actions - listen for events from main process
  onShowAddHabitModal: (callback) => {
    ipcRenderer.on('show-add-habit-modal', callback);
  },
  
  onShowSettings: (callback) => {
    ipcRenderer.on('show-settings', callback);
  },
  
  onShowAbout: (callback) => {
    ipcRenderer.on('show-about', callback);
  },
  
  onExportData: (callback) => {
    ipcRenderer.on('export-data', callback);
  },
  
  onImportData: (callback) => {
    ipcRenderer.on('import-data', callback);
  },
  
  // Remove listeners
  removeAllListeners: (channel) => {
    ipcRenderer.removeAllListeners(channel);
  },
  
  // Platform info
  platform: process.platform,
  
  // Version info
  versions: {
    node: process.versions.node,
    chrome: process.versions.chrome,
    electron: process.versions.electron
  }
});
