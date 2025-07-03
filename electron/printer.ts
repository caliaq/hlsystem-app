import { ThermalPrinter, PrinterTypes, CharacterSet, BreakLine } from 'node-thermal-printer';
import { ipcMain } from 'electron';
import { exec } from 'child_process';

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

class ReceiptPrinter {
  private printer: ThermalPrinter | null = null;
  private currentInterface: string = 'tcp://192.168.1.100:9100'; // RP-330-L PARTNER síťová tiskárna

  constructor() {
    this.initializePrinter();
    this.setupIpcHandlers();
  }

  private initializePrinter() {
    try {
      this.printer = new ThermalPrinter({
        type: PrinterTypes.EPSON,
        interface: this.currentInterface,
        characterSet: CharacterSet.PC852_LATIN2,
        removeSpecialCharacters: false,
        lineCharacter: "-",
        breakLine: BreakLine.WORD,
        options: {
        },
        width: 42 // Sníženo pro RP-330-L (standardně 32-40 znaků)
      });
    } catch (error) {
      console.error('Failed to initialize network printer:', error);
      this.tryAlternativeConfig();
    }
  }

  private tryAlternativeConfig() {
    try {
      // Pokus o připojení přes IP s jinou konfigurací
      this.printer = new ThermalPrinter({
        type: PrinterTypes.STAR,
        interface: 'tcp://192.168.1.100:9100',
        characterSet: CharacterSet.PC852_LATIN2,
        removeSpecialCharacters: false,
        lineCharacter: "-",
        breakLine: BreakLine.WORD,
        options: {
          timeout: 15000
        },
        width: 32 // Konzistentní šířka pro oba typy
      });
    } catch (error) {
      console.error('Failed to initialize printer with fallback config:', error);
    }
  }

  private setupIpcHandlers() {
    ipcMain.handle('print-receipt', async (event, data: PrintReceiptData) => {
      return await this.printReceipt(data);
    });

    ipcMain.handle('get-printers', async () => {
      return await this.getAvailablePrinters();
    });

    ipcMain.handle('test-printer-connection', async () => {
      return await this.testPrinterConnection();
    });

    ipcMain.handle('set-printer-interface', async (event, printerName: string) => {
      this.currentInterface = `printer:${printerName}`;
      this.initializePrinter();
      return { success: true, message: `Tiskárna nastavena na ${printerName}` };
    });
  }

  private async getAvailablePrinters(): Promise<string[]> {
    return new Promise((resolve) => {
      exec('wmic printer get name', (error, stdout) => {
        if (error) {
          console.error('Error getting printers:', error);
          return resolve([]);
        }
        const printers = stdout
          .split('\n')
          .map(line => line.trim())
          .filter(name => name && name !== 'Name');
        resolve(printers);
      });
    });
  }

  private async printReceipt(data: PrintReceiptData): Promise<{ success: boolean; error?: string }> {
    try {
      if (!this.printer) {
        throw new Error('Printer not initialized');
      }

      this.printer.clear();

      this.printer.alignCenter();
      this.printer.setTextSize(1, 1);
      this.printer.bold(true);
      this.printer.println('Hradišťský Vrch');
      this.printer.bold(false);
      this.printer.setTextNormal();

      this.printer.println("Konstantinovy Lázně");
      this.printer.println("Provozovatel: HÁJEK - Velin s.r.o.");
      this.printer.println("IČ: 611 73 517");

      this.printer.drawLine();

      this.printer.alignLeft();
      
      // Zobrazení data - buď rozsah nebo jednotlivé datum
      if (data.dateFrom && data.dateTo) {
        this.printer.println(`Přehled za období: ${data.dateFrom} - ${data.dateTo}`);
      } else if (data.date) {
        this.printer.println(`Datum: ${data.date}`);
      }

      this.printer.drawLine();

      data.items.forEach(item => {
        if (!this.printer) return;

        this.printer.bold(true);
        this.printer.println(item.name);
        this.printer.bold(false);

        const quantityText = `${item.quantity}x`;
        const priceText = `${this.formatCurrency(item.price)}`;
        const totalText = `${this.formatCurrency(item.total)}`;

        this.printer.tableCustom([
          { text: quantityText, align: 'LEFT', width: 0.2 },
          { text: priceText, align: 'RIGHT', width: 0.3 },
          { text: totalText, align: 'RIGHT', width: 0.4, bold: true }
        ]);
        this.printer.println("");
      });
      this.printer.drawLine();

      this.printer.alignCenter();
      this.printer.bold(true);
      this.printer.setTextSize(1, 1);
      this.printer.println(`CELKEM: ${this.formatCurrency(data.totalAmount)}`);
      this.printer.bold(false);
      this.printer.setTextNormal();

      this.printer.println('');
      this.printer.println('');

      this.printer.cut();

      await this.printer.execute();

      return { success: true };
    } catch (error) {
      console.error('Print error:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }

  private formatCurrency(amount: number): string {
    return new Intl.NumberFormat('cs-CZ', {
      style: 'currency',
      currency: 'CZK'
    }).format(amount);
  }

  public async testPrinterConnection(): Promise<{ success: boolean; message: string }> {
    try {
      if (!this.printer) {
        return { success: false, message: 'Tiskárna není inicializována' };
      }

      this.printer.clear();
      this.printer.alignCenter();
      this.printer.println('Test připojení RP-330-L');
      this.printer.println('IP: 192.168.1.100');
      this.printer.println('Tiskárna funguje správně');
      this.printer.cut();

      await this.printer.execute();

      return { success: true, message: 'Připojení k RP-330-L úspěšné (192.168.1.100)' };
    } catch (error) {
      console.error('Printer connection test failed:', error);
      return {
        success: false,
        message: `Test připojení selhal: ${error instanceof Error ? error.message : 'Neznámá chyba'}`
      };
    }
  }
}

export const receiptPrinter = new ReceiptPrinter();
