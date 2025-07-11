# Testing Auto-Updater

## Testování automatických aktualizací

### 🧪 Lokální testování

1. **Build vývojové verze**:
   ```bash
   npm run build:dev
   ```

2. **Instalace z local build**:
   - Najděte soubor v `release/1.0.1/`
   - Nainstalujte aplikaci

3. **Vytvoření vyšší verze pro test**:
   ```bash
   npm run release:minor  # Vytvoří v1.1.0
   ```

4. **Spuštění nainstalované aplikace**:
   - Aplikace by měla automaticky detekovat novou verzi
   - Měl by se objevit progress bar
   - Po stažení dialog s možností restartu

### 🌐 GitHub Releases testování

1. **Vytvoření GitHub Release**:
   - Push tag automaticky vytvoří release
   - GitHub Actions sestaví aplikaci
   - Release obsahuje install soubory

2. **Test aktualizace**:
   - Nainstalujte starší verzi
   - Vytvořte nový release s vyšší verzí
   - Spusťte aplikaci → měla by se aktualizovat

### 🔧 Debug auto-updater

#### V development módu:
```javascript
// V dev konzoli prohlížeče (F12)
if (window.electronAPI) {
    console.log('Electron API dostupné');
    window.electronAPI.checkForUpdates();
}
```

#### V Electron main procesu:
```javascript
// Přidejte do electron/main.ts pro debug
autoUpdater.logger = require("electron-log");
autoUpdater.logger.transports.file.level = "info";
```

### 📋 Checklist pro testování

- [ ] ✅ Aplikace detekuje aktualizace při spuštění
- [ ] ✅ Progress bar se zobrazuje během stahování
- [ ] ✅ Dialog pro restart se zobrazí po stažení
- [ ] ✅ Aplikace se správně restartuje a aktualizuje
- [ ] ✅ Manuální kontrola aktualizací funguje
- [ ] ✅ GitHub Releases obsahují správné soubory

### 🚨 Častá úskalí

1. **Auto-updater nefunguje v dev módu**
   - Normální - funguje pouze v production builds

2. **"No published versions found"**
   - Zkontrolujte GitHub Releases
   - Ověřte repository nastavení v electron-builder.json5

3. **Update se nestahuje**
   - Zkontrolujte verzi v package.json
   - Nová verze musí být vyšší než aktuální

4. **CORS chyby**
   - Normální v dev prostředí
   - V produkci by neměly nastat

### 🎯 Production workflow

1. **Vývoj** → `npm run build:dev`
2. **Test** → Instalace a testování lokálně
3. **Release** → `npm run release:patch/minor/major`
4. **Auto-deploy** → GitHub Actions sestaví a publikuje
5. **Auto-update** → Uživatelé dostanou aktualizaci automaticky
