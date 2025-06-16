import { contextBridge, ipcRenderer } from 'electron'

// --------- Expose some API to the Renderer process ---------
contextBridge.exposeInMainWorld('electronAPI', {
  printReceipt: (data: any) => ipcRenderer.invoke('print-receipt', data),
  getPrinters: () => ipcRenderer.invoke('get-printers'),
})

// Extend the Window interface
declare global {
  interface Window {
    electronAPI: {
      printReceipt: (data: any) => Promise<{ success: boolean; error?: string }>;
      getPrinters: () => Promise<any[]>;
    }
  }
}
