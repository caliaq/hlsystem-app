"use strict";
const electron = require("electron");
electron.contextBridge.exposeInMainWorld("electronAPI", {
  printReceipt: (data) => electron.ipcRenderer.invoke("print-receipt", data),
  getPrinters: () => electron.ipcRenderer.invoke("get-printers"),
  startRTSPStream: (rtspUrl, streamId) => electron.ipcRenderer.invoke("start-rtsp-stream", rtspUrl, streamId),
  stopRTSPStream: (streamId) => electron.ipcRenderer.invoke("stop-rtsp-stream", streamId),
  getStreamPort: (streamId) => electron.ipcRenderer.invoke("get-stream-port", streamId),
  // RTSP diagnostics
  rtspDiagnostics: () => electron.ipcRenderer.invoke("rtsp-diagnostics"),
  // Auto-updater APIs
  checkForUpdates: () => electron.ipcRenderer.invoke("check-for-updates"),
  restartApp: () => electron.ipcRenderer.invoke("restart-app"),
  onCheckingForUpdate: (callback) => electron.ipcRenderer.on("checking-for-update", (_event) => callback()),
  onUpdateAvailable: (callback) => electron.ipcRenderer.on("update-available", (_event, info) => callback(info)),
  onUpdateNotAvailable: (callback) => electron.ipcRenderer.on("update-not-available", (_event, info) => callback(info)),
  onUpdateDownloaded: (callback) => electron.ipcRenderer.on("update-downloaded", (_event, info) => callback(info)),
  onDownloadProgress: (callback) => electron.ipcRenderer.on("download-progress", (_event, progress) => callback(progress)),
  onUpdateError: (callback) => electron.ipcRenderer.on("update-error", (_event, error) => callback(error)),
  removeAllListeners: (channel) => electron.ipcRenderer.removeAllListeners(channel)
});
