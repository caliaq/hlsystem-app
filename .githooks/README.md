# Návod pro nastavení Git hooks

## Co jsou Git hooks?

Git hooks jsou skripty, které se automaticky spouštějí při určitých Git operacích (commit, push, atd.). Pomohou udržet kvalitu kódu.

## Instalace (Linux/macOS)

```bash
# Zkopírovat hooks do .git/hooks/
cp .githooks/* .git/hooks/

# Udělat je spustitelné
chmod +x .git/hooks/*
```

## Instalace (Windows)

```powershell
# Zkopírovat hooks do .git/hooks/
Copy-Item .githooks\* .git\hooks\

# Na Windows není potřeba měnit oprávnění
```

## Co hooks dělají

### Pre-commit hook
- Spustí ESLint kontrolu
- Spustí TypeScript kontrolu
- Zabrání commitu při chybách

## Zrušení hooks (dočasně)

Pokud potřebujete commitnout bez kontrol:

```bash
git commit --no-verify -m "commit message"
```

## Globální nastavení hooks

Pro všechny Git repozitáře:

```bash
git config --global core.hooksPath ~/.githooks
```
