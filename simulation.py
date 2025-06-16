import socket
import threading
import time
import re
from datetime import datetime
from typing import Dict, List, Optional

class ESCPOSSimulator:
    def __init__(self, host='localhost', port=9100):
        self.host = host
        self.port = port
        self.server_socket = None
        self.running = False
        self.receipt_buffer = []
        self.current_alignment = 'left'
        self.current_size = (1, 1)
        self.bold_mode = False
        self.charset = 'utf-8'
        
        # ESC/POS příkazy
        self.ESC = b'\x1b'
        self.GS = b'\x1d'
        self.commands = {
            b'\x1b@': self.initialize,           # ESC @
            b'\x1ba': self.set_alignment,        # ESC a
            b'\x1bE': self.set_bold,            # ESC E
            b'\x1d!': self.set_character_size,   # GS !
            b'\x1dV': self.cut_paper,           # GS V
            b'\x0a': self.line_feed,            # LF
            b'\x0d': self.carriage_return,      # CR
        }

    def start_server(self):
        """Spustí simulátor tiskárny"""
        try:
            self.server_socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
            self.server_socket.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)
            self.server_socket.bind((self.host, self.port))
            self.server_socket.listen(5)
            self.running = True
            
            print(f"🖨️  Simulátor tiskárny spuštěn na {self.host}:{self.port}")
            print("📄 Čeká na připojení...")
            
            while self.running:
                try:
                    client_socket, address = self.server_socket.accept()
                    print(f"🔗 Připojeno z {address}")
                    
                    # Zpracuj klienta v novém vlákně
                    client_thread = threading.Thread(
                        target=self.handle_client,
                        args=(client_socket, address)
                    )
                    client_thread.daemon = True
                    client_thread.start()
                    
                except socket.error as e:
                    if self.running:
                        print(f"❌ Chyba při přijímání spojení: {e}")
                        
        except Exception as e:
            print(f"❌ Chyba při spuštění serveru: {e}")

    def handle_client(self, client_socket, address):
        """Zpracuje připojení klienta"""
        try:
            while self.running:
                data = client_socket.recv(1024)
                if not data:
                    break
                    
                self.process_data(data)
                
        except socket.error:
            pass
        finally:
            client_socket.close()
            print(f"🔌 Odpojeno od {address}")

    def process_data(self, data: bytes):
        """Zpracuje příchozí ESC/POS data"""
        i = 0
        while i < len(data):
            # Hledej ESC/POS příkazy
            command_found = False
            
            # Kontrola 2-byte příkazů
            if i < len(data) - 1:
                two_byte_cmd = data[i:i+2]
                if two_byte_cmd in self.commands:
                    self.commands[two_byte_cmd](data, i)
                    i += 2
                    command_found = True
            
            # Kontrola 1-byte příkazů
            if not command_found:
                one_byte_cmd = data[i:i+1]
                if one_byte_cmd in self.commands:
                    self.commands[one_byte_cmd](data, i)
                    i += 1
                    command_found = True
            
            # Pokud není příkaz, je to text
            if not command_found:
                if data[i:i+1].isascii() and data[i] >= 32:  # Tisknutelné znaky
                    self.add_text(chr(data[i]))
                i += 1

    def add_text(self, text: str):
        """Přidá text do bufferu"""
        if text.strip():  # Pouze neprázdný text
            formatted_text = self.format_text(text)
            self.receipt_buffer.append(formatted_text)

    def format_text(self, text: str) -> str:
        """Formátuje text podle aktuálních nastavení"""
        formatted = text
        
        # Použij bold
        if self.bold_mode:
            formatted = f"**{formatted}**"
        
        # Použij velikost
        if self.current_size != (1, 1):
            size_indicator = f"[{self.current_size[0]}x{self.current_size[1]}]"
            formatted = f"{size_indicator}{formatted}"
        
        # Použij zarovnání
        if self.current_alignment == 'center':
            formatted = f"    {formatted.center(40)}"
        elif self.current_alignment == 'right':
            formatted = f"{formatted.rjust(48)}"
        
        return formatted

    # ESC/POS příkazy
    def initialize(self, data: bytes, pos: int):
        """ESC @ - Inicializuj tiskárnu"""
        self.receipt_buffer = []
        self.current_alignment = 'left'
        self.current_size = (1, 1)
        self.bold_mode = False
        print("🔄 Tiskárna inicializována")

    def set_alignment(self, data: bytes, pos: int):
        """ESC a - Nastav zarovnání"""
        if pos + 2 < len(data):
            align_value = data[pos + 2]
            if align_value == 0:
                self.current_alignment = 'left'
            elif align_value == 1:
                self.current_alignment = 'center'
            elif align_value == 2:
                self.current_alignment = 'right'

    def set_bold(self, data: bytes, pos: int):
        """ESC E - Nastav tučné písmo"""
        if pos + 2 < len(data):
            self.bold_mode = data[pos + 2] == 1

    def set_character_size(self, data: bytes, pos: int):
        """GS ! - Nastav velikost znaků"""
        if pos + 2 < len(data):
            size_byte = data[pos + 2]
            width = (size_byte & 0x0F) + 1
            height = ((size_byte & 0xF0) >> 4) + 1
            self.current_size = (width, height)

    def line_feed(self, data: bytes, pos: int):
        """LF - Nový řádek"""
        self.receipt_buffer.append("")

    def carriage_return(self, data: bytes, pos: int):
        """CR - Návrat na začátek řádku"""
        pass

    def cut_paper(self, data: bytes, pos: int):
        """GS V - Řež papír"""
        self.print_receipt()
        self.receipt_buffer = []

    def print_receipt(self):
        """Vytiskne (zobrazí) účtenku"""
        print("\n" + "="*50)
        print("📄 VYTIŠTĚNÁ ÚČTENKA")
        print("="*50)
        
        for line in self.receipt_buffer:
            if line.strip():
                print(line)
            else:
                print()
        
        print("="*50)
        print(f"⏰ Vytisknuto: {datetime.now().strftime('%H:%M:%S')}")
        print("="*50 + "\n")

    def stop_server(self):
        """Zastaví server"""
        self.running = False
        if self.server_socket:
            self.server_socket.close()
        print("🛑 Simulátor tiskárny zastaven")


class ThermalPrinterSimulator:
    """Jednodušší simulátor pro node-thermal-printer"""
    
    def __init__(self):
        self.content = []
        self.alignment = 'left'
        self.bold = False
        self.text_size = (1, 1)
    
    def simulate_node_thermal_printer(self, print_data: Dict):
        """Simuluje tisk z node-thermal-printer"""
        print("\n" + "="*60)
        print("🖨️  NODE-THERMAL-PRINTER SIMULÁTOR")
        print("="*60)
        
        # Hlavička
        if 'storeName' in print_data:
            print(f"         {print_data['storeName']}")
        if 'storeAddress' in print_data:
            print(f"         {print_data['storeAddress']}")
        
        print("-" * 40)
        
        # Info o objednávce
        print(f"Objednávka: {print_data.get('orderNumber', 'N/A')}")
        print(f"Datum: {print_data.get('date', 'N/A')}")
        print("-" * 40)
        
        # Položky
        print("Položka                    Ks      Cena")
        print("-" * 40)
        
        total = 0
        for item in print_data.get('items', []):
            name = item.get('name', '')[:20]  # Omezeň na 20 znaků
            quantity = item.get('quantity', 0)
            price = item.get('price', 0)
            item_total = item.get('total', 0)
            
            if quantity > 0:  # Pouze položky s množstvím
                print(f"{name:<20} {quantity:>3}x  {item_total:>8.2f} Kč")
            elif name.strip():  # Textové řádky bez množství
                print(f"{name}")
            
            total += item_total
        
        print("-" * 40)
        print(f"CELKEM:                    {print_data.get('totalAmount', total):>8.2f} Kč")
        print()
        print("         Děkujeme za návštěvu!")
        print()
        print("="*60)
        print(f"⏰ Vytisknuto: {datetime.now().strftime('%d.%m.%Y %H:%M:%S')}")
        print("="*60 + "\n")


def main():
    """Hlavní funkce"""
    print("🖨️  SIMULÁTOR POKLADNÍ TISKÁRNY")
    print("================================")
    print("1. ESC/POS Server (port 9100)")
    print("2. Node-Thermal-Printer Test")
    print("3. Spustit oba")
    
    choice = input("\nVyberte možnost (1-3): ").strip()
    
    if choice == "1":
        # Spustí ESC/POS server
        simulator = ESCPOSSimulator()
        try:
            simulator.start_server()
        except KeyboardInterrupt:
            simulator.stop_server()
            print("\n👋 Simulátor ukončen")
    
    elif choice == "2":
        # Test node-thermal-printer formátu
        thermal_sim = ThermalPrinterSimulator()
        
        # Testovací data
        test_data = {
            'orderNumber': 'TEST-12345',
            'date': datetime.now().strftime('%d.%m.%Y %H:%M:%S'),
            'storeName': 'Hradišťský Vrch',
            'storeAddress': 'Testovací adresa 123',
            'items': [
                {'name': 'Káva', 'quantity': 2, 'price': 25.0, 'total': 50.0},
                {'name': 'Čaj', 'quantity': 1, 'price': 20.0, 'total': 20.0},
                {'name': 'Zákusek', 'quantity': 3, 'price': 45.0, 'total': 135.0},
            ],
            'totalAmount': 205.0
        }
        
        thermal_sim.simulate_node_thermal_printer(test_data)
        
        # Test metrik
        print("\n🔄 Test metrik:")
        metrics_data = {
            'orderNumber': 'PŘEHLED-67890',
            'date': datetime.now().strftime('%d.%m.%Y %H:%M:%S'),
            'storeName': 'Hradišťský Vrch',
            'storeAddress': 'Období: 01.01.2024 - 31.01.2024',
            'items': [
                {'name': 'Káva', 'quantity': 25, 'price': 20.0, 'total': 500.0},
                {'name': 'Čaj', 'quantity': 15, 'price': 20.0, 'total': 300.0},
                {'name': 'Zákusek', 'quantity': 10, 'price': 45.0, 'total': 450.0},
            ],
            'totalAmount': 1250.0
        }
        
        thermal_sim.simulate_node_thermal_printer(metrics_data)
    
    elif choice == "3":
        # Spustí ESC/POS server v background
        simulator = ESCPOSSimulator()
        server_thread = threading.Thread(target=simulator.start_server)
        server_thread.daemon = True
        server_thread.start()
        
        # Spustí interaktivní test
        thermal_sim = ThermalPrinterSimulator()
        
        print("\n📟 ESC/POS server běží na pozadí")
        print("💡 Můžete testovat node-thermal-printer příkazy\n")
        
        try:
            while True:
                input("Stiskněte Enter pro test tisk (Ctrl+C pro ukončení)...")
                
                test_data = {
                    'orderNumber': f'TEST-{int(time.time())}',
                    'date': datetime.now().strftime('%d.%m.%Y %H:%M:%S'),
                    'storeName': 'Hradišťský Vrch',
                    'storeAddress': 'Test simulace',
                    'items': [
                        {'name': 'Test položka', 'quantity': 1, 'price': 25.0, 'total': 25.0},
                    ],
                    'totalAmount': 25.0
                }
                
                thermal_sim.simulate_node_thermal_printer(test_data)
                
        except KeyboardInterrupt:
            simulator.stop_server()
            print("\n👋 Simulátor ukončen")
    
    else:
        print("❌ Neplatná volba")


if __name__ == "__main__":
    main()