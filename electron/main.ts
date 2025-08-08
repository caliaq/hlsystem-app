import { app, BrowserWindow, ipcMain, dialog } from 'electron'
import { autoUpdater } from 'electron-updater'
import { fileURLToPath } from 'node:url'
import path from 'node:path'
import './printer' // Import printer module
import { rtspStreamServer } from './rtspServer'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

// The built directory structure
//
// ├─┬─┬ dist
// │ │ └── index.html
// │ │
// │ ├─┬ dist-electron
// │ │ ├── main.js
// │ │ └── preload.mjs
// │
process.env.APP_ROOT = path.join(__dirname, '..')

// 🚧 Use ['ENV_NAME'] avoid vite:define plugin - Vite@2.x
export const VITE_DEV_SERVER_URL = process.env['VITE_DEV_SERVER_URL']
export const MAIN_DIST = path.join(process.env.APP_ROOT, 'dist-electron')
export const RENDERER_DIST = path.join(process.env.APP_ROOT, 'dist')

process.env.VITE_PUBLIC = VITE_DEV_SERVER_URL ? path.join(process.env.APP_ROOT, 'public') : RENDERER_DIST

let win: BrowserWindow | null

// Auto-updater configuration
autoUpdater.autoDownload = false;
autoUpdater.autoInstallOnAppQuit = false; // Changed to false for manual control

// Development settings
console.log('Configuring auto-updater...');
console.log('App version:', app.getVersion());
console.log('Is packaged:', app.isPackaged);

// Auto-updater events
autoUpdater.on('checking-for-update', () => {
  console.log('Checking for update...')
  win?.webContents.send('checking-for-update')
})

autoUpdater.on('update-available', (info) => {
  console.log('Update available:', info)
  win?.webContents.send('update-available', info)
  // Automatically start download
  autoUpdater.downloadUpdate()
})

autoUpdater.on('update-not-available', (info) => {
  console.log('Update not available:', info)
  win?.webContents.send('update-not-available', info)
})

autoUpdater.on('error', (err) => {
  console.log('Error in auto-updater:', err)
  
  // Check if error is related to signature verification
  if (err.message && err.message.includes('not signed')) {
    console.log('Signature verification error - this is expected in development');
    console.log('To fix this for production, you need to code sign your application');
    win?.webContents.send('update-error', 'Aplikace není digitálně podepsána. Pro produkční nasazení je třeba konfigurovat code signing.');
  } else {
    win?.webContents.send('update-error', err.message)
  }
})

autoUpdater.on('download-progress', (progressObj) => {
  let log_message = "Download speed: " + progressObj.bytesPerSecond
  log_message = log_message + ' - Downloaded ' + progressObj.percent + '%'
  log_message = log_message + ' (' + progressObj.transferred + "/" + progressObj.total + ')'
  console.log(log_message)
  console.log('Progress object:', JSON.stringify(progressObj))
  win?.webContents.send('download-progress', progressObj)
})

autoUpdater.on('update-downloaded', (info) => {
  console.log('Update downloaded:', info)
  console.log('Sending update-downloaded event to renderer...')
  win?.webContents.send('update-downloaded', info)
  
  console.log('Showing restart dialog...')
  
  // Try immediate restart first, then show dialog as backup
  setTimeout(() => {
    console.log('Auto-restarting in 3 seconds...')
    try {
      console.log('Calling autoUpdater.quitAndInstall()...')
      autoUpdater.quitAndInstall(true, true) // Force restart immediately
    } catch (error) {
      console.error('Error in quitAndInstall:', error)
      console.log('Falling back to app.quit()...')
      app.relaunch()
      app.quit()
    }
  }, 3000)
  
  // Also show dialog
  dialog.showMessageBox(win!, {
    type: 'info',
    title: 'Aktualizace připravena',
    message: 'Aktualizace byla stažena. Aplikace se automaticky restartuje za 3 sekundy, nebo klikněte "Restartovat nyní".',
    buttons: ['Restartovat nyní', 'Později']
  }).then((result) => {
    console.log('Dialog result:', result)
    if (result.response === 0) {
      console.log('User chose to restart immediately - calling quitAndInstall...')
      try {
        autoUpdater.quitAndInstall(true, true)
      } catch (error) {
        console.error('Error in quitAndInstall from dialog:', error)
        app.relaunch()
        app.quit()
      }
    } else {
      console.log('User chose to restart later')
    }
  }).catch((error) => {
    console.error('Error showing dialog:', error)
    // If dialog fails, force restart anyway
    console.log('Dialog failed, forcing restart...')
    try {
      autoUpdater.quitAndInstall(true, true)
    } catch (restartError) {
      console.error('Error in fallback quitAndInstall:', restartError)
      app.relaunch()
      app.quit()
    }
  })
})

function createWindow() {
  win = new BrowserWindow({
    width: 1200,
    height: 900,
    show: false,
    titleBarStyle: 'default',
    icon: path.join(process.env.VITE_PUBLIC, 'logo.png'),
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: false,
      contextIsolation: true
    },
  })

  // Show window when ready
  win.once('ready-to-show', () => {
    win?.show()
    win?.focus()
  })

  // Test active push message to Renderer-process.
  win.webContents.on('did-finish-load', () => {
    win?.webContents.send('main-process-message', (new Date).toLocaleString())
  })

  if (VITE_DEV_SERVER_URL) {
    console.log('Loading dev server URL:', VITE_DEV_SERVER_URL)
    win.loadURL(VITE_DEV_SERVER_URL)
  } else {
    console.log('Loading production build')
    win.loadFile(path.join(RENDERER_DIST, 'index.html'))
  }
}

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
    win = null
  }
})

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})

app.whenReady().then(() => {
  createWindow()
  
  // Setup IPC handlers for RTSP streams
  ipcMain.handle('start-rtsp-stream', async (event, rtspUrl: string, streamId: string) => {
    try {
      const port = await rtspStreamServer.startStream(rtspUrl, streamId);
      return { success: true, port };
    } catch (error) {
      console.error('Error starting RTSP stream:', error);
      return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
    }
  });

  ipcMain.handle('stop-rtsp-stream', (event, streamId: string) => {
    try {
      rtspStreamServer.stopStream(streamId);
      return { success: true };
    } catch (error) {
      console.error('Error stopping RTSP stream:', error);
      return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
    }
  });

  ipcMain.handle('get-stream-port', (event, streamId: string) => {
    const port = rtspStreamServer.getStreamPort(streamId);
    return { success: true, port };
  });

  // RTSP diagnostics handler
  ipcMain.handle('rtsp-diagnostics', async () => {
    try {
      const diagnostics = await (rtspStreamServer as any).runDiagnostics();
      return { success: true, diagnostics };
    } catch (error) {
      return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
    }
  });

  // Auto-updater IPC handlers
  ipcMain.handle('check-for-updates', async () => {
    try {
      console.log('IPC: check-for-updates called');
      win?.webContents.send('checking-for-update')
      const result = await autoUpdater.checkForUpdates();
      console.log('IPC: checkForUpdates result:', result);
      return { success: true, result };
    } catch (error) {
      console.error('IPC: Error checking for updates:', error);
      win?.webContents.send('update-error', error instanceof Error ? error.message : 'Unknown error')
      return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
    }
  })

  ipcMain.handle('restart-app', () => {
    console.log('IPC: restart-app called');
    try {
      console.log('Attempting quitAndInstall...')
      autoUpdater.quitAndInstall(true, true) // Force restart immediately
      
      // Fallback - force quit after timeout
      setTimeout(() => {
        console.log('quitAndInstall timeout - forcing app quit...')
        app.relaunch()
        app.quit()
      }, 2000)
      
      return { success: true };
    } catch (error) {
      console.error('Error in restart-app:', error)
      // Force quit as last resort
      try {
        app.relaunch()
        app.quit()
      } catch (finalError) {
        console.error('Final error in restart:', finalError)
        process.exit(0)
      }
      return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
    }
  })
})

// Cleanup streams on quit
app.on('before-quit', () => {
  rtspStreamServer.stopAllStreams();
});
