const { contextBridge, ipcRenderer } = require('electron')

// --------- Expose some API to the Renderer process ---------
// Force rebuild - CommonJS version
contextBridge.exposeInMainWorld('electronAPI', {
  printReceipt: (data: any) => ipcRenderer.invoke('print-receipt', data),
  getPrinters: () => ipcRenderer.invoke('get-printers'),
  startRTSPStream: (rtspUrl: string, streamId: string) => ipcRenderer.invoke('start-rtsp-stream', rtspUrl, streamId),
  stopRTSPStream: (streamId: string) => ipcRenderer.invoke('stop-rtsp-stream', streamId),
  getStreamPort: (streamId: string) => ipcRenderer.invoke('get-stream-port', streamId),
})

// Extend the Window interface
declare global {
  interface Window {
    electronAPI: {
      printReceipt: (data: any) => Promise<{ success: boolean; error?: string }>;
      getPrinters: () => Promise<any[]>;
      startRTSPStream: (rtspUrl: string, streamId: string) => Promise<{ success: boolean; port?: number; error?: string }>;
      stopRTSPStream: (streamId: string) => Promise<{ success: boolean; error?: string }>;
      getStreamPort: (streamId: string) => Promise<{ success: boolean; port?: number | null }>;
    }
  }
}
