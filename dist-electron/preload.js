import { contextBridge, ipcRenderer } from "electron";
contextBridge.exposeInMainWorld("electronAPI", {
  printReceipt: (data) => ipcRenderer.invoke("print-receipt", data),
  getPrinters: () => ipcRenderer.invoke("get-printers")
});
