const electron = require('electron');
const express = require('express');
const bodyParser = require('body-parser');
const db = require('mongoose');
const cors = require('cors');
const path = require('path');
const multer = require('multer');
const url = require('url');

const app = electron.app;
const server = express();
const BrowserWindow = electron.BrowserWindow;

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '/../public/uploads'));
    },
    filename: (req, file, cb) => {
        let ext = `.${file.mimetype.replace(/.*\//, '')}`;
        cb(null, file.fieldname + '-' + Date.now() + ext);
    }
});

const upload = multer({ storage: storage });
server.use(upload.single('img'));
const api = require('./api/routes')(express);

db.connect('mongodb://localhost/agenda-de-cobro');
server.use(cors());
server.use(bodyParser.urlencoded({extended: true}));
server.use(bodyParser.json());
server.use('/', api);

let mainWindow;

const createWindow = () => {
    mainWindow = new BrowserWindow({ width: 800, height: 600 });

    const startUrl = process.env.ELECTRON_START_URL || url.format({
        pathname: path.join(__dirname, '/../build/index.html'),
        protocol: 'file:',
        slashes: true
    });

    mainWindow.loadURL(startUrl);
    // mainWindow.webContents.openDevTools();

    mainWindow.on('closed', function () {
        mainWindow = null
    });
}

server.listen(8000, (err) => {
    if (err) {
        console.log(err)
    }

    app.on('ready', createWindow);
    
    app.on('window-all-closed', function () {
        if (process.platform !== 'darwin') {
            app.quit()
        }
    });
    
    app.on('activate', function () {
        if (mainWindow === null) {
            createWindow()
        }
    });
});