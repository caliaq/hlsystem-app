import { contextBridge, ipcRenderer } from 'electron'

// --------- Expose some API to the Renderer process ---------
// Force rebuild - CommonJS version
contextBridge.exposeInMainWorld('electronAPI', {
  printReceipt: (data: unknown) => ipcRenderer.invoke('print-receipt', data),
  getPrinters: () => ipcRenderer.invoke('get-printers'),
  startRTSPStream: (rtspUrl: string, streamId: string) => ipcRenderer.invoke('start-rtsp-stream', rtspUrl, streamId),
  stopRTSPStream: (streamId: string) => ipcRenderer.invoke('stop-rtsp-stream', streamId),
  getStreamPort: (streamId: string) => ipcRenderer.invoke('get-stream-port', streamId),
  // RTSP diagnostics
  rtspDiagnostics: () => ipcRenderer.invoke('rtsp-diagnostics'),
  // Auto-updater APIs
  checkForUpdates: () => ipcRenderer.invoke('check-for-updates'),
  restartApp: () => ipcRenderer.invoke('restart-app'),
  onCheckingForUpdate: (callback: () => void) => ipcRenderer.on('checking-for-update', (_event) => callback()),
  onUpdateAvailable: (callback: (info: unknown) => void) => ipcRenderer.on('update-available', (_event, info) => callback(info)),
  onUpdateNotAvailable: (callback: (info: unknown) => void) => ipcRenderer.on('update-not-available', (_event, info) => callback(info)),
  onUpdateDownloaded: (callback: (info: unknown) => void) => ipcRenderer.on('update-downloaded', (_event, info) => callback(info)),
  onDownloadProgress: (callback: (progress: unknown) => void) => ipcRenderer.on('download-progress', (_event, progress) => callback(progress)),
  onUpdateError: (callback: (error: string) => void) => ipcRenderer.on('update-error', (_event, error) => callback(error)),
  removeAllListeners: (channel: string) => ipcRenderer.removeAllListeners(channel),
})

// Extend the Window interface
export interface ElectronAPI {
  printReceipt: (data: unknown) => Promise<{ success: boolean; error?: string }>;
  getPrinters: () => Promise<unknown[]>;
  startRTSPStream: (rtspUrl: string, streamId: string) => Promise<{ success: boolean; port?: number; error?: string }>;
  stopRTSPStream: (streamId: string) => Promise<{ success: boolean; error?: string }>;
  getStreamPort: (streamId: string) => Promise<{ success: boolean; port?: number | null }>;
  rtspDiagnostics: () => Promise<{ success: boolean; diagnostics?: any; error?: string }>;
  checkForUpdates: () => Promise<void>;
  restartApp: () => Promise<void>;
  onCheckingForUpdate: (callback: () => void) => void;
  onUpdateAvailable: (callback: (info: unknown) => void) => void;
  onUpdateNotAvailable: (callback: (info: unknown) => void) => void;
  onUpdateDownloaded: (callback: (info: unknown) => void) => void;
  onDownloadProgress: (callback: (progress: unknown) => void) => void;
  onUpdateError: (callback: (error: string) => void) => void;
  removeAllListeners: (channel: string) => void;
}

declare global {
  interface Window {
    electronAPI: ElectronAPI;
  }
}
