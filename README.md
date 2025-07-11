# HLSystem - Pokladní aplikace

Electron aplikace pro správu pokladny s automatickými aktualizacemi.

## 🚀 Funkce

- **Automatické aktualizace**: Aplikace se automaticky aktualizuje při spuštění
- **GitHub Releases**: Automatické vytváření releaseů při tagování verzí
- **Multi-platform**: Podpora Windows, macOS a Linux
- **Moderní UI**: React + TypeScript + Tailwind CSS

## 📦 Instalace a vývoj

```bash
# Instalace závislostí
npm install

# Spuštění vývojového prostředí
npm run dev

# Build pro vývoj (bez auto-updater)
npm run build:dev

# Build pro produkci (s auto-updater)
npm run build

# Build s automatickým publikováním na GitHub
npm run build:publish
```

## 🔄 Automatické verzování a releases

### Manuální vytvoření nové verze:

```bash
# Patch verze (1.0.0 → 1.0.1)
npm run release:patch

# Minor verze (1.0.0 → 1.1.0)  
npm run release:minor

# Major verze (1.0.0 → 2.0.0)
npm run release:major
```

### Automatické verzování přes GitHub Actions:

1. **Push na main/master branch**: Automaticky vytvoří patch verzi
2. **Manuální spuštění**: V GitHub Actions můžete vybrat typ verze (patch/minor/major)
3. **Commit zprávy**: 
   - `feat:` nebo `feature:` → minor verze
   - `breaking change:` nebo `major:` → major verze
   - ostatní → patch verze

## 🏗️ Konfigurace pro GitHub

### 1. Aktualizujte konfigurace

V `electron-builder.json5` změňte:
```json
{
  "publish": {
    "provider": "github",
    "owner": "your-github-username",  // ← Změňte na váš GitHub username
    "repo": "hlsystem-app"            // ← Změňte na název vašeho repo
  }
}
```

V `package.json` změňte:
```json
{
  "homepage": "https://github.com/your-github-username/hlsystem-app",
  "repository": {
    "type": "git", 
    "url": "https://github.com/your-github-username/hlsystem-app.git"
  }
}
```

### 2. GitHub Token

GitHub Actions automaticky použije `GITHUB_TOKEN`, který má přístup k vytváření releases.

### 3. Workflow spuštění

Po push tagu (např. `v1.0.0`) se automaticky spustí:
1. Build pro všechny platformy
2. Vytvoření GitHub Release s build soubory
3. Publikování pro auto-updater

## 🔧 Auto-updater

### Konfigurace

Auto-updater je nakonfigurován automaticky:
- ✅ Kontrola aktualizací při spuštění aplikace
- ✅ Progress indikátor během stahování
- ✅ Dialog s možností restartovat aplikaci
- ✅ Manuální kontrola aktualizací v UI

### Funkce v aplikaci

- **Automatická kontrola**: Při spuštění (pouze v produkci)
- **Manuální kontrola**: Tlačítko "🔄 Zkontrolovat aktualizace"
- **Stahování**: Progress bar s rychlostí a velikostí
- **Instalace**: Dialog s možností okamžitého restartu

## 📁 Struktur projektu

```
├── .github/workflows/          # GitHub Actions
│   ├── auto-version.yml       # Automatické verzování
│   └── build-and-release.yml  # Build a release
├── electron/                  # Electron main proces
│   ├── main.ts               # Main proces s auto-updater
│   └── preload.ts            # Preload script
├── src/
│   ├── components/
│   │   └── UpdateManager.tsx # UI komponenta pro aktualizace
│   └── types/
│       └── electron.d.ts     # TypeScript definice
├── electron-builder.json5     # Produkční konfigurace
├── electron-builder.dev.json5 # Vývojová konfigurace
└── package.json
```

## 🐛 Troubleshooting

### Auto-updater nefunguje
1. Zkontrolujte, že je aplikace buildována s produkční konfigurací
2. Ověřte GitHub repository nastavení v `electron-builder.json5`
3. Zkontrolujte, že existuje GitHub Release s build soubory

### GitHub Actions selhal
1. Zkontrolujte přístupová práva GITHUB_TOKEN
2. Ověřte správnost workflow syntaxe
3. Zkontrolujte logy v GitHub Actions

### Build chyby
1. Zkontrolujte Node.js verzi (doporučeno 18+)
2. Vyčistěte `node_modules` a reinstalujte: `rm -rf node_modules package-lock.json && npm install`
3. Zkontrolujte TypeScript chyby: `npm run lint`
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
  },
}
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list
