const { app, session, BrowserWindow } = require('electron')
const path = require('path')

function isDev() {
  return process.argv[2] == '--dev';
}

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