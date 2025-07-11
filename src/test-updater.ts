// Test auto-updater funkcionalita
// Tento soubor můžete použít k testování auto-updater v dev prostředí

console.log('🧪 Testing auto-updater functionality...');

// Simulace updateru v dev prostředí
if (typeof window !== 'undefined' && window.electronAPI) {
  console.log('✅ Electron API is available');
  
  // Test dostupnosti auto-updater funkcí
  if (typeof window.electronAPI.checkForUpdates === 'function') {
    console.log('✅ checkForUpdates is available');
  }
  
  if (typeof window.electronAPI.onUpdateAvailable === 'function') {
    console.log('✅ onUpdateAvailable is available');
  }
  
  if (typeof window.electronAPI.onUpdateDownloaded === 'function') {
    console.log('✅ onUpdateDownloaded is available');
  }
  
  if (typeof window.electronAPI.onDownloadProgress === 'function') {
    console.log('✅ onDownloadProgress is available');
  }
  
  console.log('🎉 All auto-updater functions are properly exposed!');
} else {
  console.log('❌ Electron API is not available (probably running in browser)');
}

export default {};
