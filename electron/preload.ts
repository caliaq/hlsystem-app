import { contextBridge, ipcRenderer } from 'electron'

// --------- Expose some API to the Renderer process ---------
// Force rebuild - CommonJS version
contextBridge.exposeInMainWorld('electronAPI', {
  printReceipt: (data: unknown) => ipcRenderer.invoke('print-receipt', data),
  getPrinters: () => ipcRenderer.invoke('get-printers'),
  startRTSPStream: (rtspUrl: string, streamId: string) => ipcRenderer.invoke('start-rtsp-stream', rtspUrl, streamId),
  stopRTSPStream: (streamId: string) => ipcRenderer.invoke('stop-rtsp-stream', streamId),
  getStreamPort: (streamId: string) => ipcRenderer.invoke('get-stream-port', streamId),
  // Auto-updater APIs
  checkForUpdates: () => ipcRenderer.invoke('check-for-updates'),
  restartApp: () => ipcRenderer.invoke('restart-app'),
  onUpdateAvailable: (callback: () => void) => ipcRenderer.on('update-available', callback),
  onUpdateDownloaded: (callback: () => void) => ipcRenderer.on('update-downloaded', callback),
  onDownloadProgress: (callback: (progress: unknown) => void) => ipcRenderer.on('download-progress', callback),
  removeAllListeners: (channel: string) => ipcRenderer.removeAllListeners(channel),
})

// Extend the Window interface
export interface ElectronAPI {
  printReceipt: (data: unknown) => Promise<{ success: boolean; error?: string }>;
  getPrinters: () => Promise<unknown[]>;
  startRTSPStream: (rtspUrl: string, streamId: string) => Promise<{ success: boolean; port?: number; error?: string }>;
  stopRTSPStream: (streamId: string) => Promise<{ success: boolean; error?: string }>;
  getStreamPort: (streamId: string) => Promise<{ success: boolean; port?: number | null }>;
  checkForUpdates: () => Promise<void>;
  restartApp: () => Promise<void>;
  onUpdateAvailable: (callback: () => void) => void;
  onUpdateDownloaded: (callback: () => void) => void;
  onDownloadProgress: (callback: (progress: unknown) => void) => void;
  removeAllListeners: (channel: string) => void;
}

declare global {
  interface Window {
    electronAPI: ElectronAPI;
  }
}
