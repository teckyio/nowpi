const { app, session, BrowserWindow } = require('electron')
const path = require('path')

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
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })

  mainWindow.setBackgroundColor("#000000");
  if (process.env.NODE_ENV === 'production') {
    mainWindow.loadFile('../build/index.html')
  } else {
    mainWindow.loadURL('http://localhost:3000')
    mainWindow.webContents.openDevTools()
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