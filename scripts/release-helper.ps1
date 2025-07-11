# GitHub Release Helper - Simple Version

Write-Host "GitHub Release Helper" -ForegroundColor Cyan
Write-Host ""

# Get current version
$packageJson = Get-Content "package.json" | ConvertFrom-Json
$version = $packageJson.version
$tagName = "v$version"

Write-Host "Current version: $version" -ForegroundColor Green
Write-Host "Tag name: $tagName" -ForegroundColor Green
Write-Host ""

# Check if release files exist
$releaseDir = "release\$version"
if (-not (Test-Path $releaseDir)) {
    Write-Host "Release folder not found: $releaseDir" -ForegroundColor Red
    Write-Host "Run 'npm run build:draft' first" -ForegroundColor Yellow
    exit 1
}

$setupFile = Get-ChildItem "$releaseDir\*.exe" | Select-Object -First 1
$blockMapFile = Get-ChildItem "$releaseDir\*.blockmap" | Select-Object -First 1

if (-not $setupFile) {
    Write-Host "Setup.exe file not found in $releaseDir" -ForegroundColor Red
    exit 1
}

Write-Host "Found files:" -ForegroundColor Green
Write-Host "  $($setupFile.Name)" -ForegroundColor White
Write-Host "  $($blockMapFile.Name)" -ForegroundColor White
Write-Host ""

Write-Host "Next steps:" -ForegroundColor Cyan
Write-Host "1. Go to: https://github.com/caliaq/hlsystem-app/releases/new" -ForegroundColor White
Write-Host "2. Set tag: $tagName" -ForegroundColor White
Write-Host "3. Set title: Release $tagName" -ForegroundColor White
Write-Host "4. Upload the files from: $releaseDir" -ForegroundColor White
Write-Host "5. Click 'Publish release'" -ForegroundColor White
Write-Host ""

Write-Host "File paths to upload:" -ForegroundColor Yellow
Write-Host "$($setupFile.FullName)" -ForegroundColor White
Write-Host "$($blockMapFile.FullName)" -ForegroundColor White
