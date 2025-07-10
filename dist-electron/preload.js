const { contextBridge, ipcRenderer } = require("electron");
contextBridge.exposeInMainWorld("electronAPI", {
  printReceipt: (data) => ipcRenderer.invoke("print-receipt", data),
  getPrinters: () => ipcRenderer.invoke("get-printers"),
  startRTSPStream: (rtspUrl, streamId) => ipcRenderer.invoke("start-rtsp-stream", rtspUrl, streamId),
  stopRTSPStream: (streamId) => ipcRenderer.invoke("stop-rtsp-stream", streamId),
  getStreamPort: (streamId) => ipcRenderer.invoke("get-stream-port", streamId)
});
