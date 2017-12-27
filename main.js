// This file mainly deals with entry points and setting up the environment correctly
// Code grabbed from generic Electron starter code.

const {app, BrowserWindow} = require('electron')
const path = require('path')
const url = require('url')

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win

function createWindow () {

    // Create the browser window.
    win = new BrowserWindow({
	width: 800,
	height: 800,
	resizable: false,
	fullscreen: false,
	titleBarStyle: 'hidden',
	webPreferences: {
	    nodeIntegration: true
	}
    })

    // and load the index.html of the app.
    win.loadURL(url.format({
	pathname: path.join(__dirname, 'index.html'),
	protocol: 'file:',
	slashes: true
    }))

    // Open the DevTools.
    //win.webContents.openDevTools()
    
    // Emitted when the window is closed.
    win.on('closed', () => {
	// Dereference the window object, usually you would store windows
	// in an array if your app supports multi windows, this is the time
	// when you should delete the corresponding element.
	win = null
    })

}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
	app.quit()
    }
})

app.on('activate', () => {
    if (win === null) {
	createWindow()
    }
})
