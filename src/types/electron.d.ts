interface Window {
  ipcRenderer?: {
    on: (channel: string, listener: (event: any, ...args: any[]) => void) => void;
    send: (channel: string, ...args: any[]) => void;
    invoke: (channel: string, ...args: any[]) => Promise<any>;
  };
}