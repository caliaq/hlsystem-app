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
autoUpdater.autoInstallOnAppQuit = true;

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
  win?.webContents.send('update-error', err.message)
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
  win?.webContents.send('update-downloaded', info)
  
  // Show dialog asking user to restart
  dialog.showMessageBox(win!, {
    type: 'info',
    title: 'Aktualizace připravena',
    message: 'Aktualizace byla stažena a je připravena k instalaci. Aplikace se restartuje.',
    buttons: ['Restartovat nyní', 'Později']
  }).then((result) => {
    if (result.response === 0) {
      autoUpdater.quitAndInstall()
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
    autoUpdater.quitAndInstall()
    return { success: true };
  })
})

// Cleanup streams on quit
app.on('before-quit', () => {
  rtspStreamServer.stopAllStreams();
});
