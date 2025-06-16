import { ThermalPrinter, PrinterTypes, CharacterSet, BreakLine } from 'node-thermal-printer';
import { ipcMain } from 'electron';

export interface PrintReceiptData {
  orderNumber: string;
  date: string;
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

  constructor() {
    this.initializePrinter();
    this.setupIpcHandlers();
  }

  private initializePrinter() {
    try {
      this.printer = new ThermalPrinter({
        type: PrinterTypes.EPSON,
        interface: 'printer:Auto', // Automaticky najde tiskárnu
        characterSet: CharacterSet.PC852_LATIN2,
        removeSpecialCharacters: false,
        lineCharacter: "-",
        breakLine: BreakLine.WORD,
        options: {
          timeout: 5000
        }
      });
    } catch (error) {
      console.error('Failed to initialize printer:', error);
    }
  }

  private setupIpcHandlers() {
    ipcMain.handle('print-receipt', async (event, data: PrintReceiptData) => {
      return await this.printReceipt(data);
    });

    ipcMain.handle('get-printers', async () => {
      return await this.getAvailablePrinters();
    });
  }

  private async getAvailablePrinters() {
    try {
      if (!this.printer) return [];
      return await this.printer.getPrinters();
    } catch (error) {
      console.error('Failed to get printers:', error);
      return [];
    }
  }

  private async printReceipt(data: PrintReceiptData): Promise<{ success: boolean; error?: string }> {
    try {
      if (!this.printer) {
        throw new Error('Printer not initialized');
      }

      // Vyčištění bufferu
      this.printer.clear();

      // Hlavička
      this.printer.alignCenter();
      this.printer.setTextSize(1, 1);
      this.printer.bold(true);
      this.printer.println(data.storeName || 'Hradišťský Vrch');
      this.printer.bold(false);
      this.printer.setTextNormal();
      
      if (data.storeAddress) {
        this.printer.println(data.storeAddress);
      }
      
      this.printer.drawLine();
      
      // Informace o objednávce
      this.printer.alignLeft();
      this.printer.println(`Objednávka: ${data.orderNumber}`);
      this.printer.println(
        `Datum: ${data.date}`);
      this.printer.drawLine();

      // Položky
      this.printer.tableCustom([
        { text: 'Položka', align: 'LEFT', width: 0.5 },
        { text: 'Ks', align: 'CENTER', width: 0.15 },
        { text: 'Cena', align: 'RIGHT', width: 0.35 }
      ]);
      
      this.printer.drawLine();

      data.items.forEach(item => {
        // Název produktu
        this.printer.println(item.name);
        
        // Množství a cena na jednom řádku
        const quantityText = `${item.quantity}x`;
        const priceText = `${this.formatCurrency(item.price)}`;
        const totalText = `${this.formatCurrency(item.total)}`;
        
        this.printer.tableCustom([
          { text: '', align: 'LEFT', width: 0.3 },
          { text: quantityText, align: 'LEFT', width: 0.2 },
          { text: priceText, align: 'RIGHT', width: 0.25 },
          { text: totalText, align: 'RIGHT', width: 0.25 }
        ]);
      });

      this.printer.drawLine();
      
      // Celková suma
      this.printer.alignRight();
      this.printer.bold(true);
      this.printer.setTextSize(1, 1);
      this.printer.println(`CELKEM: ${this.formatCurrency(data.totalAmount)}`);
      this.printer.bold(false);
      this.printer.setTextNormal();

      // Patička
      this.printer.alignCenter();
      this.printer.println('');
      this.printer.println('Děkujeme za návštěvu!');
      this.printer.println('');
      
      // Řez papíru
      this.printer.cut();

      // Odeslání na tiskárnu
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
}

// Export singleton instance
export const receiptPrinter = new ReceiptPrinter();