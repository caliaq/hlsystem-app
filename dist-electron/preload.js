"use strict";
const electron = require("electron");
electron.contextBridge.exposeInMainWorld("electronAPI", {
  printReceipt: (data) => electron.ipcRenderer.invoke("print-receipt", data),
  getPrinters: () => electron.ipcRenderer.invoke("get-printers"),
  startRTSPStream: (rtspUrl, streamId) => electron.ipcRenderer.invoke("start-rtsp-stream", rtspUrl, streamId),
  stopRTSPStream: (streamId) => electron.ipcRenderer.invoke("stop-rtsp-stream", streamId),
  getStreamPort: (streamId) => electron.ipcRenderer.invoke("get-stream-port", streamId),
  // Auto-updater APIs
  checkForUpdates: () => electron.ipcRenderer.invoke("check-for-updates"),
  restartApp: () => electron.ipcRenderer.invoke("restart-app"),
  onUpdateAvailable: (callback) => electron.ipcRenderer.on("update-available", callback),
  onUpdateDownloaded: (callback) => electron.ipcRenderer.on("update-downloaded", callback),
  onDownloadProgress: (callback) => electron.ipcRenderer.on("download-progress", callback),
  removeAllListeners: (channel) => electron.ipcRenderer.removeAllListeners(channel)
});
