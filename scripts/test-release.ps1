# Script pro lokální testování releases (PowerShell verze)
# Tento script vytvoří lokální "release" pro testování auto-updater funkcionality

Write-Host "🔧 Preparing local release test..." -ForegroundColor Cyan

# Zkontrolovat, že jsme v správném adresáři
if (-not (Test-Path "package.json")) {
    Write-Host "❌ Error: package.json not found. Run this script from the project root." -ForegroundColor Red
    exit 1
}

# Získat aktuální verzi
$packageJson = Get-Content "package.json" | ConvertFrom-Json
$currentVersion = $packageJson.version
Write-Host "📦 Current version: $currentVersion" -ForegroundColor Green

# Zvýšit patch verzi pro test
Write-Host "⬆️ Bumping version for test..." -ForegroundColor Yellow
npm version patch --no-git-tag-version

$packageJsonNew = Get-Content "package.json" | ConvertFrom-Json
$newVersion = $packageJsonNew.version
Write-Host "🆕 New version: $newVersion" -ForegroundColor Green

# Build aplikace
Write-Host "🏗️ Building application..." -ForegroundColor Yellow
npm run build:draft

# Vrátit původní verzi
Write-Host "🔄 Reverting version..." -ForegroundColor Yellow
npm version $currentVersion --no-git-tag-version

Write-Host "✅ Local release test prepared!" -ForegroundColor Green
Write-Host "📂 Check the release folder: release/$newVersion" -ForegroundColor Cyan
Write-Host ""
Write-Host "To test auto-updater:" -ForegroundColor White
Write-Host "1. Install the built version" -ForegroundColor White
Write-Host "2. Create a GitHub release with higher version" -ForegroundColor White
Write-Host "3. Run the installed app to test update" -ForegroundColor White
