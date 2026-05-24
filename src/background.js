'use strict'

import {app, protocol, BrowserWindow, globalShortcut} from 'electron'
import {createProtocol} from 'vue-cli-plugin-electron-builder/lib'
// import installExtension, {VUEJS3_DEVTOOLS} from 'electron-devtools-installer'
app.allowRendererProcessReuse = true
app.dirname = __dirname
// app.commandLine.appendSwitch('proxy-bypass-list','<local>;127.0.0.1:5020')


import path from 'path'
app.commandLine.appendSwitch('allow-file-access-from-files', true)
app.whenReady().then(() => {
    // 这个需要在app.ready触发之后使用
    protocol.registerFileProtocol('atom', (request, callback) => {
        const url = request.url.substr(7)
        callback(decodeURI(path.normalize(url)))
    })
})


// app.commandLine.appendSwitch('ignore-certificate-errors', 'true');


import { initialize, enable } from "@electron/remote/main";

initialize()
// app.commandLine.appendSwitch('proxy-server', `socks5://120.37.92.191:4224`);
// const ipcMain = require('electron').ipcMain
// ipcMain.on('proxy-server', function(event, arg) {
//     console.log("arg----",arg)
//     // app.commandLine.appendSwitch('proxy-server', 'socks5://127.0.0.1:7890');
//     // app.commandLine.appendSwitch('proxy-server', 'socks5://127.0.0.1:7890');
//     app.commandLine.appendSwitch('proxy-server', `socks5://122.246.88.171:4247`);
//     // app.commandLine.appendSwitch('proxy-server', `socks5://${arg}`);
// })



// const { ipcMain } = require("electron");
// ipcMain.on("asynchronous-message", (event, arg) => {
//     console.log(arg); // 打印 "ping"
//     event.sender.send("asynchronous-reply", "pong");
// });
//
// ipcMain.on("synchronous-message", (event, arg) => {
//     console.log(arg); // 打印 "ping"
//     event.returnValue = "pong";
// });

const isDevelopment = process.env.NODE_ENV !== 'production'

// Scheme must be registered before the app is ready
protocol.registerSchemesAsPrivileged([
    {scheme: 'app', privileges: {secure: true, standard: true}}
])

async function createWindow() {
    // Create the browser window.
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        // titleBarStyle: 'hidden',
        // titleBarOverlay: true,
        autoHideMenuBar: true,
        webPreferences: {
            webSecurity: false, //将禁用同源策略 (通常用来测试网站), 如果此选项不是由开发者设置的，还会把 allowRunningInsecureContent设置为 true. 默认值为 true。
            //允许开启webview
            webviewTag: true,
            plugins: true, //开启浏览器插件
            //开启node
            contextIsolation: false,
            nodeIntegration: true,
            enableRemoteModule: true, //可以渲染进程使用remote
            session: true //可以渲染进程使用remote
        }
    })
    
    enable(win.webContents)
    
    globalShortcut.register('CommandOrControl+F12', () => {
    // globalShortcut.register('F12', () => {
        let win = BrowserWindow.getFocusedWindow();
        if (!win) return;
        win.webContents.toggleDevTools();
    })
    // win.webContents.toggleDevTools()
    if (process.env.WEBPACK_DEV_SERVER_URL) {
        // Load the url of the dev server if in development mode
        await win.loadURL(process.env.WEBPACK_DEV_SERVER_URL)
        if (!process.env.IS_TEST) win.webContents.openDevTools()
    } else {
        createProtocol('app')
        // Load the index.html when not in development
        win.loadURL('app://./index.html')
    }
}


let contentTemp = null;
const newWindowListener = (e) => {
    e.preventDefault();
    // if(contentTemp){
    //     contentTemp.removeListener("new-window", newWindowListener)
    // }
};
app.on("web-contents-created", (e, webContents) => {
    webContents.addListener("new-window", newWindowListener);
    contentTemp = webContents;
})

app.on("will-navigate", (e, webContents) => {
    console.log("will-navigate",e)
})



// Quit when all windows are closed.
app.on('window-all-closed', () => {
    // On macOS it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
})

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', async () => {
    // if (isDevelopment && !process.env.IS_TEST) {
    //     // Install Vue Devtools
    //     try {
    //         await installExtension(VUEJS3_DEVTOOLS)
    //     } catch (e) {
    //         console.error('Vue Devtools failed to install:', e.toString())
    //     }
    // }
    createWindow()
})

// Exit cleanly on request from parent process in development mode.
if (isDevelopment) {
    if (process.platform === 'win32') {
        process.on('message', (data) => {
            if (data === 'graceful-exit') {
                app.quit()
            }
        })
    } else {
        process.on('SIGTERM', () => {
            app.quit()
        })
    }
}
