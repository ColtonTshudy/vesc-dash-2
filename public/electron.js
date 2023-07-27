const electron = require("electron");
const path = require("path");
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
let mainWindow;

function createWindow() {
    // Create the browser window.
    mainWindow = new BrowserWindow({
        width: 1024,
        height: 600,
        webPreferences: { nodeIntegration: true, contextIsolation: false },
        kiosk: true,
        frame: false,
    });
    // and load the index.html of the app.
    console.log(__dirname);
    mainWindow.loadFile(path.join(__dirname, "../build/index.html"));
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", createWindow);

// Workaround to close all processes / sub-processes after closing the app
electron.app.once('window-all-closed', electron.app.quit);
electron.app.once('before-quit', () => {
    window.removeAllListeners('close');
});