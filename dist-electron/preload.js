const { contextBridge: i, ipcRenderer: t } = require("electron");
i.exposeInMainWorld("electronAPI", {
  printReceipt: (e) => t.invoke("print-receipt", e),
  getPrinters: () => t.invoke("get-printers"),
  startRTSPStream: (e, r) => t.invoke("start-rtsp-stream", e, r),
  stopRTSPStream: (e) => t.invoke("stop-rtsp-stream", e),
  getStreamPort: (e) => t.invoke("get-stream-port", e)
});
