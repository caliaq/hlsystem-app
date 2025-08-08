# PowerShell script to create self-signed certificate for code signing
# Run as Administrator

$certName = "HLSystem Code Signing Certificate"
$certPath = "C:\caliaq\hlsystem-app\certs"

# Create directory for certificates
if (!(Test-Path $certPath)) {
    New-Item -ItemType Directory -Path $certPath -Force
}

# Create self-signed certificate
$cert = New-SelfSignedCertificate -Subject "CN=$certName" `
    -Type CodeSigningCert `
    -KeyUsage DigitalSignature `
    -FriendlyName $certName `
    -CertStoreLocation "Cert:\CurrentUser\My" `
    -KeyExportPolicy ExportableEncrypted `
    -KeySpec Signature `
    -KeyLength 2048 `
    -KeyAlgorithm RSA `
    -HashAlgorithm SHA256 `
    -Provider "Microsoft Enhanced RSA and AES Cryptographic Provider" `
    -NotAfter (Get-Date).AddYears(3)

Write-Host "Certificate created with thumbprint: $($cert.Thumbprint)"

# Export certificate to PFX file (with private key)
$pfxPassword = ConvertTo-SecureString -String "hlsystem2024" -Force -AsPlainText
$pfxPath = "$certPath\hlsystem-codesign.pfx"

Export-PfxCertificate -Cert $cert -FilePath $pfxPath -Password $pfxPassword
Write-Host "Certificate exported to: $pfxPath"

# Export public certificate
$cerPath = "$certPath\hlsystem-codesign.cer"
Export-Certificate -Cert $cert -FilePath $cerPath
Write-Host "Public certificate exported to: $cerPath"

# Add to Trusted Root Certification Authorities (for Windows to trust it)
$rootStore = Get-Item -Path "Cert:\CurrentUser\Root"
$rootStore.Open("ReadWrite")
$rootStore.Add($cert)
$rootStore.Close()

Write-Host "Certificate added to Trusted Root store"
Write-Host ""
Write-Host "=== NEXT STEPS ==="
Write-Host "1. Certificate password: hlsystem2024"
Write-Host "2. PFX file location: $pfxPath"
Write-Host "3. Update electron-builder.json5 with signing configuration"
Write-Host ""
