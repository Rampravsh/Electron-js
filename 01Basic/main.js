const { app, BrowserWindow } = require("electron");
const windowStateKeeper = require("electron-window-state");

function createWindow() {
  const mainWindowState = windowStateKeeper({
    defaultWidth: 600,
    defaultHeight: 400,
  });

  const win = new BrowserWindow({
    width: mainWindowState.width,
    height: mainWindowState.height,
    x: mainWindowState.x,
    y: mainWindowState.y,
    // frame: false,
    title: "Electron js",
    autoHideMenuBar: true,
    // alwaysOnTop: true,
    webPreferences: {
      nodeIntegration: true,
    },
  });

  win.loadFile("index.html");
  mainWindowState.manage(win);
}

app.whenReady().then(() => {
  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
