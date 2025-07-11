import { contextBridge as o, ipcRenderer as t } from "electron";
o.exposeInMainWorld("electronAPI", {
  printReceipt: (e) => t.invoke("print-receipt", e),
  getPrinters: () => t.invoke("get-printers"),
  startRTSPStream: (e, r) => t.invoke("start-rtsp-stream", e, r),
  stopRTSPStream: (e) => t.invoke("stop-rtsp-stream", e),
  getStreamPort: (e) => t.invoke("get-stream-port", e),
  // Auto-updater APIs
  checkForUpdates: () => t.invoke("check-for-updates"),
  restartApp: () => t.invoke("restart-app"),
  onUpdateAvailable: (e) => t.on("update-available", e),
  onUpdateDownloaded: (e) => t.on("update-downloaded", e),
  onDownloadProgress: (e) => t.on("download-progress", e),
  removeAllListeners: (e) => t.removeAllListeners(e)
});
