# GitHub Token Setup & Manual Release

## 🔑 Nastavení GitHub Personal Access Token

### 1. Vytvoření GitHub Personal Access Token

1. **Přejděte na GitHub**:
   - Jděte na https://github.com/settings/tokens
   - Nebo: Avatar → Settings → Developer settings → Personal access tokens → Tokens (classic)

2. **Vytvořte nový token**:
   - Klikněte "Generate new token (classic)"
   - **Note**: `hlsystem-app-releases`
   - **Expiration**: Nastavte podle potřeby (např. 90 days nebo No expiration)
   
3. **Vyberte oprávnění**:
   - ✅ `repo` - Full control of private repositories
   - ✅ `write:packages` - Upload packages to GitHub Package Registry
   - ✅ `read:packages` - Download packages from GitHub Package Registry

4. **Zkopírujte token** - ukáže se pouze jednou!

### 2. Nastavení tokenu lokálně

#### **Windows (PowerShell):**
```powershell
# Dočasně pro current session
$env:GH_TOKEN = "your_token_here"

# Nebo permanentně
[Environment]::SetEnvironmentVariable("GH_TOKEN", "your_token_here", "User")
```

#### **Windows (Command Prompt):**
```cmd
set GH_TOKEN=your_token_here
```

#### **Linux/macOS:**
```bash
export GH_TOKEN=your_token_here

# Pro permanentní uložení do ~/.bashrc nebo ~/.zshrc
echo 'export GH_TOKEN=your_token_here' >> ~/.bashrc
```

### 3. Testování a publikování

```bash
# Test - sestaví bez publikování
npm run build:draft

# Publikování s tokenem
npm run build:publish
```

## 📦 Manuální publikování release

Pokud nechcete nastavovat token, můžete vytvořit GitHub Release manuálně:

### 1. Build lokálně
```bash
npm run build:draft
```

### 2. Najděte soubory
Instalační soubory jsou v: `release/1.0.1/`
- Windows: `pokladní aplikace - Hradišstký Vrch-Windows-1.0.1-Setup.exe`
- BlockMap: `pokladní aplikace - Hradišstký Vrch-Windows-1.0.1-Setup.exe.blockmap`

### 3. Vytvořte GitHub Release manuálně

1. **Jděte na váš GitHub repository**:
   https://github.com/caliaq/hlsystem-app/releases

2. **Klikněte "Create a new release"**

3. **Vyplňte údaje**:
   - **Tag version**: `v1.0.1`
   - **Release title**: `Release v1.0.1`
   - **Description**: 
     ```markdown
     ## Changes
     - ✅ Added automatic updater functionality
     - ✅ Implemented GitHub Actions for CI/CD
     - ✅ Added modern UpdateManager UI component
     - ✅ Configured multi-platform builds
     
     ## Installation
     Download and run the Setup.exe file for Windows.
     ```

4. **Upload soubory**:
   - Drag & drop oba soubory (.exe a .blockmap)
   - Nebo použijte "Choose files"

5. **Publikujte**: Klikněte "Publish release"

## 🔄 Automatické aktualizace po manuálním release

Po vytvoření GitHub Release s uploaded soubory:

1. **Auto-updater bude fungovat** - aplikace najde novou verzi
2. **Stahování bude funkční** - soubory jsou na GitHub
3. **Instalace proběhne automaticky**

## 🚀 GitHub Actions (pro budoucnost)

GitHub Actions workflows už jsou připravené a spustí se automaticky při:
- Push tagu (např. `v1.0.2`)
- Manuálním spuštění

Budou automaticky:
1. Sestavovat pro Windows, macOS, Linux
2. Vytvářet GitHub Release
3. Uploadovat všechny soubory

**Pokud chcete používat GitHub Actions**, stačí nastavit token jako GitHub Secret:
1. Repository → Settings → Secrets and variables → Actions
2. New repository secret: `GH_TOKEN` = váš token
