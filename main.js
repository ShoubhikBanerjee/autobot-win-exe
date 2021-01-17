// Modules to control application life and create native browser window


const { app, BrowserWindow, ipcMain, screen, Tray, Menu } = require('electron')
const AutoLaunch = require('auto-launch');
const path = require('path')
const FirebaseEventHandler = require("./EventHandler")
let tray = null;
var mainWindow = null;
// this should be placed at top of main.js to handle setup events quickly
if (handleSquirrelEvent(app)) {
  // squirrel event handled and app will exit in 1000ms, so don't do anything else 
  return;
}


function createWindow() {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 360,
    height: 640,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: true
    }
  })
  // and load the index.html of the app.
  // mainWindow.hide()
  mainWindow.minimize()
  mainWindow.loadFile('index.html')
  mainWindow.setResizable(false);

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()

  mainWindow.removeMenu();
  // mainWindow.hide()



  // mainWindow.on('restore', () => {
  //   mainWindow.setSkipTaskbar(false)
  // })

  // mainWindow.on('minimize', () => {
  //   mainWindow.setSkipTaskbar(true)
  // })

  tray = new Tray('./assets/images/autobot_logo_small.ico')
  const trayMenu = Menu.buildFromTemplate([
    {
      label: 'Show',
      click: () => {
        mainWindow.restore()
      }
    },
    {
      label: 'Quit',
      role: 'quit'
    }
  ])
  tray.setToolTip('AutoBot - Desktop Client')
  tray.setContextMenu(trayMenu)
}




// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow()



  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})

app.on('ready', function () {
  let autoLaunch = new AutoLaunch({
    name: 'AutoBot - Desktop Client',
    path: app.getPath('exe'),
    isHidden: true
  });
  autoLaunch.isEnabled().then((isEnabled) => {
    if (!isEnabled) autoLaunch.enable();
  });
})
// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.

function handleSquirrelEvent(application) {
  if (process.argv.length === 1) {
    return false;
  }

  const ChildProcess = require('child_process');
  const path = require('path');

  const appFolder = path.resolve(process.execPath, '..');
  const rootAtomFolder = path.resolve(appFolder, '..');
  const updateDotExe = path.resolve(path.join(rootAtomFolder, 'Update.exe'));
  const exeName = path.basename(process.execPath);

  const spawn = function (command, args) {
    let spawnedProcess, error;

    try {
      spawnedProcess = ChildProcess.spawn(command, args, {
        detached: true
      });
    } catch (error) { }

    return spawnedProcess;
  };

  const spawnUpdate = function (args) {
    return spawn(updateDotExe, args);
  };

  const squirrelEvent = process.argv[1];
  switch (squirrelEvent) {
    case '--squirrel-install':
    case '--squirrel-updated':
      // Optionally do things such as:
      // - Add your .exe to the PATH
      // - Write to the registry for things like file associations and
      //   explorer context menus

      // Install desktop and start menu shortcuts
      spawnUpdate(['--createShortcut', exeName]);

      setTimeout(application.quit, 1000);
      return true;

    case '--squirrel-uninstall':
      // Undo anything you did in the --squirrel-install and
      // --squirrel-updated handlers

      // Remove desktop and start menu shortcuts
      spawnUpdate(['--removeShortcut', exeName]);

      setTimeout(application.quit, 1000);
      return true;

    case '--squirrel-obsolete':
      // This is called on the outgoing version of your app before
      // we update to the new version - it's the opposite of
      // --squirrel-updated

      application.quit();
      return true;
  }
};

