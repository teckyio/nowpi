/**
 
===========================================================================

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program.  If not, see <https://www.gnu.org/licenses/>.

===========================================================================

Alex Lau
(c) Tecky Academy Limited 2019

===========================================================================

*/
const { app, session, BrowserWindow, ipcMain } = require('electron')
const { autoUpdater } = require("electron-updater");
const path = require('path')
const spawn = require('child_process').spawn

ipcMain.on('update-app', async (event) => {
  const version = autoUpdater.doCheckForUpdates();
  if (version.downloadPromise) {
    await version.downloadPromise;
    await autoUpdater.quitAndInstall(true, true);
  }
  
  event.reply('update-app-done')
})

function isDev() {
  return process.argv[2] == '--dev';
}

setInterval(() => {
  spawn('xset', ['-dpms']);
}, 60000);

let mainWindow;

function onReady() {
  if (process.env.NODE_ENV === 'production') {
    session.defaultSession.webRequest.onHeadersReceived((details, callback) => {
      callback({
        responseHeaders: {
          ...details.responseHeaders,
          'Content-Security-Policy': ['default-src \'none\'']
        }
      })
    })
  }

  createWindow();
}

function createWindow () {
  mainWindow = new BrowserWindow({
    fullscreen: true,
    autoHideMenuBar: true,
    webPreferences: {
      nodeIntegration: true,
      preload: path.join(__dirname, 'preload.js')
    }
  })

  mainWindow.setMenu(null);
  mainWindow.setBackgroundColor("#000000");
  if (isDev()) {
    mainWindow.loadURL('http://localhost:3000')
    mainWindow.webContents.openDevTools()
  } else {
    mainWindow.loadFile('./build/index.html')
    // mainWindow.webContents.openDevTools()
  }

  mainWindow.on('closed', function () {
    mainWindow = null
  })
}

app.on('ready', onReady)
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})
app.on('activate', function () {
  if (mainWindow === null) createWindow()
})