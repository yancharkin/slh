const path = require('path')
const electron = require('electron')
const { app, BrowserWindow, ipcMain } = require('electron')
const fs = require('fs');
var win;

ipcMain.on ("color-scheme-loaded", (event, themeColor ) => {
    win.setTitleBarOverlay({color: themeColor});
});

function createWindow () {
    win = new BrowserWindow({
        titleBarStyle: 'hidden',
        titleBarOverlay: {
            height: 28,
            color: '#656bff',
            symbolColor: '#fff'
        },
        backgroundColor: "#000",
        frame: false, // default system titlebar, etc.
        resizable: true,
        width: 1024,
        height: 576,
        icon: path.join(__dirname, 'assets/images/icon.png'),
        webPreferences: {
            preload: path.join(__dirname, 'js/preload.js')
        }
    })
    win.on('close', () => app.quit());
    try {
        win.loadFile('index.html');
    } catch (error) {
        win.loadURL(`file://${__dirname}/index.html`);
    }
    //win.webContents.openDevTools();
}
try {
    app.whenReady().then(createWindow);
} catch (error) {
    try {
        app.on('ready', createWindow);
    } catch (error) {
        console.log(error);
    }
}
