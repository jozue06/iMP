import { BrowserWindow, Menu, screen, } from 'electron';
import { format } from 'url';
import { join } from 'path';
import { autoUpdater } from "electron-updater"
import { topMenuTemplates } from '../constants/topMenuTemplates';
import { createProtocol } from 'vue-cli-plugin-electron-builder/lib'

let window;
function createMainWindow(height, width, minHeight, minWidth, titleName) {
	window = new BrowserWindow({
		width: width,
		height: height,
		minHeight: minHeight,
		minWidth: minWidth,
		title: titleName,
		webPreferences: {
			nodeIntegration: true
		}
	});

	if (process.env.WEBPACK_DEV_SERVER_URL) {
		// Load the url of the dev server if in development mode
		window.loadURL(process.env.WEBPACK_DEV_SERVER_URL)
	} else {
		createProtocol('app')
		// Load the index.html when not in development
		window.loadURL('app://./index.html')
		autoUpdater.checkForUpdatesAndNotify()
	}

	window.center();
	
	window.on('closed', () => {
		window = null
	});

	const mainMenu = Menu.buildFromTemplate(topMenuTemplates);
	Menu.setApplicationMenu(mainMenu);
}

export { createMainWindow };