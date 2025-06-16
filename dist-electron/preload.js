import { contextBridge as i, ipcRenderer as e } from "electron";
i.exposeInMainWorld("electronAPI", {
  printReceipt: (r) => e.invoke("print-receipt", r),
  getPrinters: () => e.invoke("get-printers")
});
