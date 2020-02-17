const electron = require('electron')
const url = require('url')
const path = require('path')

const {app, BrowserWindow} = electron

let mainWindow

app.on('ready', function(){
    //Cria a janela principal
    mainWindow = new BrowserWindow({
        webPreferences: {
            nodeIntegration: true
        }
    })

    //Carrega o index.html na janela principal
    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'index.html'),
        protocol: 'file:',
        slashes: true
    }))

    //Fechar app
    mainWindow.on('closed', function(){
        app.quit()
    })
})