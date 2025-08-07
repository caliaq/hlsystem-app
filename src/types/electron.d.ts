export interface PrintReceiptData {
  orderNumber?: string;
  dateFrom?: string;
  dateTo?: string;
  date?: string; // Pro zpětnou kompatibilitu
  items: Array<{
    name: string;
    quantity: number;
    price: number;
    total: number;
  }>;
  totalAmount: number;
  storeName?: string;
  storeAddress?: string;
}

declare global {
  interface Window {
    ipcRenderer?: {
      on: (channel: string, listener: (event: unknown, ...args: unknown[]) => void) => void;
      send: (channel: string, ...args: unknown[]) => void;
      invoke: (channel: string, ...args: unknown[]) => Promise<unknown>;
    };
    electronAPI?: {
      printReceipt: (data: PrintReceiptData) => Promise<{ success: boolean; error?: string }>;
      getPrinters: () => Promise<unknown[]>;
      startRTSPStream: (rtspUrl: string, streamId: string) => Promise<{ success: boolean; port?: number; error?: string }>;
      stopRTSPStream: (streamId: string) => Promise<{ success: boolean; error?: string }>;
      getStreamPort: (streamId: string) => Promise<{ success: boolean; port?: number | null }>;
      // RTSP diagnostics
      rtspDiagnostics: () => Promise<{ success: boolean; diagnostics?: any; error?: string }>;
      // Auto-updater APIs
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
  }
}