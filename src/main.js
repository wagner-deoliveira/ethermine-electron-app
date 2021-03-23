const { app, BrowserWindow } = require('electron')

try {
    require('electron-reloader')(module)
} catch (_) {}


function createWindow () {
    const win = new BrowserWindow({
        width: 1000,
        height: 800,
        webPreferences: {
            nodeIntegration: true
        },
        allowRunningInsecureContent: true
    })

    win.loadFile('src/index.html')
}

app.whenReady().then(createWindow)

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow()
    }
})
