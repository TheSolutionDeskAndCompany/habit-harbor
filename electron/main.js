const { app, BrowserWindow, Menu, Tray, nativeImage, ipcMain, dialog } = require('electron');
const path = require('path');
const fs = require('fs').promises;
const { autoUpdater } = require('electron-updater');

// Keep a global reference of the window object
let mainWindow;
let tray = null;
let isQuitting = false;

// Data storage path
const userDataPath = app.getPath('userData');
const habitsDataPath = path.join(userDataPath, 'habits.json');

class HabitHarborApp {
  constructor() {
    this.setupApp();
  }

  setupApp() {
    // This method will be called when Electron has finished initialization
    app.whenReady().then(() => {
      this.createWindow();
      this.createTray();
      this.setupMenu();
      this.setupIPC();
      
      // Handle app activation (macOS)
      app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
          this.createWindow();
        }
      });
    });

    // Quit when all windows are closed
    app.on('window-all-closed', () => {
      if (process.platform !== 'darwin') {
        app.quit();
      }
    });

    app.on('before-quit', () => {
      isQuitting = true;
    });
  }

  createWindow() {
    // Create the browser window
    mainWindow = new BrowserWindow({
      width: 1200,
      height: 800,
      minWidth: 800,
      minHeight: 600,
      icon: path.join(__dirname, '../assets/icon.png'),
      webPreferences: {
        nodeIntegration: false,
        contextIsolation: true,
        enableRemoteModule: false,
        sandbox: false,
        preload: path.join(__dirname, 'preload.js')
      },
      titleBarStyle: process.platform === 'darwin' ? 'hiddenInset' : 'default',
      show: false, // Don't show until ready
    });

    // Load the React app
    const isDev = process.env.NODE_ENV === 'development';
    if (isDev) {
      mainWindow.loadURL('http://localhost:3000');
      mainWindow.webContents.openDevTools();
    } else {
      mainWindow.loadFile(path.join(__dirname, '../dist/index.html'));
    }

    // Show window when ready to prevent visual flash
    mainWindow.once('ready-to-show', () => {
      mainWindow.show();
      
      if (isDev) {
        mainWindow.webContents.openDevTools();
      }
    });

    // Handle window close - minimize to tray instead of quitting
    mainWindow.on('close', (event) => {
      if (!isQuitting) {
        event.preventDefault();
        mainWindow.hide();
        
        // Show notification on first minimize
        if (process.platform === 'win32') {
          tray.displayBalloon({
            iconType: 'info',
            title: 'Habit Harbor',
            content: 'App was minimized to tray'
          });
        }
      }
    });

    mainWindow.on('closed', () => {
      mainWindow = null;
    });
  }

  createTray() {
    // Create tray icon
    const iconPath = path.join(__dirname, '../assets/tray-icon.png');
    const trayIcon = nativeImage.createFromPath(iconPath);
    tray = new Tray(trayIcon.resize({ width: 16, height: 16 }));
    
    const contextMenu = Menu.buildFromTemplate([
      {
        label: 'Show Habit Harbor',
        click: () => {
          mainWindow.show();
          mainWindow.focus();
        }
      },
      {
        label: 'Add Quick Habit',
        click: () => {
          mainWindow.show();
          mainWindow.focus();
          mainWindow.webContents.send('show-add-habit-modal');
        }
      },
      { type: 'separator' },
      {
        label: 'Settings',
        click: () => {
          mainWindow.show();
          mainWindow.focus();
          mainWindow.webContents.send('show-settings');
        }
      },
      { type: 'separator' },
      {
        label: 'Quit',
        click: () => {
          isQuitting = true;
          app.quit();
        }
      }
    ]);

    tray.setToolTip('Habit Harbor - Your Personal Habit Tracker');
    tray.setContextMenu(contextMenu);

    // Double-click to show window
    tray.on('double-click', () => {
      mainWindow.show();
      mainWindow.focus();
    });
  }

  setupMenu() {
    const template = [
      {
        label: 'File',
        submenu: [
          {
            label: 'New Habit',
            accelerator: 'CmdOrCtrl+N',
            click: () => {
              mainWindow.webContents.send('show-add-habit-modal');
            }
          },
          { type: 'separator' },
          {
            label: 'Export Data',
            click: async () => {
              const result = await dialog.showSaveDialog(mainWindow, {
                defaultPath: 'habit-harbor-backup.json',
                filters: [
                  { name: 'JSON Files', extensions: ['json'] }
                ]
              });
              
              if (!result.canceled) {
                mainWindow.webContents.send('export-data', result.filePath);
              }
            }
          },
          {
            label: 'Import Data',
            click: async () => {
              const result = await dialog.showOpenDialog(mainWindow, {
                filters: [
                  { name: 'JSON Files', extensions: ['json'] }
                ]
              });
              
              if (!result.canceled) {
                mainWindow.webContents.send('import-data', result.filePaths[0]);
              }
            }
          },
          { type: 'separator' },
          process.platform === 'darwin' ? { role: 'close' } : { role: 'quit' }
        ]
      },
      {
        label: 'Edit',
        submenu: [
          { role: 'undo' },
          { role: 'redo' },
          { type: 'separator' },
          { role: 'cut' },
          { role: 'copy' },
          { role: 'paste' }
        ]
      },
      {
        label: 'View',
        submenu: [
          { role: 'reload' },
          { role: 'forceReload' },
          { role: 'toggleDevTools' },
          { type: 'separator' },
          { role: 'resetZoom' },
          { role: 'zoomIn' },
          { role: 'zoomOut' },
          { type: 'separator' },
          { role: 'togglefullscreen' }
        ]
      },
      {
        label: 'Window',
        submenu: [
          { role: 'minimize' },
          { role: 'close' }
        ]
      },
      {
        label: 'Help',
        submenu: [
          {
            label: 'About Habit Harbor',
            click: () => {
              mainWindow.webContents.send('show-about');
            }
          },
          {
            label: 'Learn More',
            click: async () => {
              const { shell } = require('electron');
              await shell.openExternal('https://github.com/TheSolutionDeskAndCompany/habit-harbor');
            }
          }
        ]
      }
    ];

    const menu = Menu.buildFromTemplate(template);
    Menu.setApplicationMenu(menu);
  }

  setupIPC() {
    // Handle data operations
    ipcMain.handle('load-habits', async () => {
      try {
        const data = await fs.readFile(habitsDataPath, 'utf8');
        return JSON.parse(data);
      } catch (error) {
        // Return empty habits if file doesn't exist
        return { habits: [], settings: {} };
      }
    });

    ipcMain.handle('save-habits', async (event, data) => {
      try {
        await fs.writeFile(habitsDataPath, JSON.stringify(data, null, 2));
        return { success: true };
      } catch (error) {
        return { success: false, error: error.message };
      }
    });

    // Handle notifications
    ipcMain.handle('show-notification', (event, { title, body }) => {
      new Notification({
        title,
        body,
        icon: path.join(__dirname, '../assets/icon.png')
      }).show();
    });

    // Handle app info
    ipcMain.handle('get-app-info', () => {
      return {
        version: app.getVersion(),
        platform: process.platform,
        userDataPath: app.getPath('userData')
      };
    });
  }
}

// Create the app instance
new HabitHarborApp();

// Auto-updater events
autoUpdater.checkForUpdatesAndNotify();
