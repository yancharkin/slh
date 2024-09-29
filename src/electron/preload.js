const { ipcRenderer  } = require ("electron");
const { contextBridge } = require("electron");

contextBridge.exposeInMainWorld('Electron', {
    loadColorScheme: (color) => {
        ipcRenderer.send ("color-scheme-loaded", color);
    }
});
