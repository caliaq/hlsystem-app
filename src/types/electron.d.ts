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
      on: (channel: string, listener: (event: any, ...args: any[]) => void) => void;
      send: (channel: string, ...args: any[]) => void;
      invoke: (channel: string, ...args: any[]) => Promise<any>;
    };
    electronAPI?: {
      printReceipt: (data: PrintReceiptData) => Promise<{ success: boolean; error?: string }>;
      getPrinters: () => Promise<any[]>;
    }
  }
}