import { BrowserWindow, Menu, } from 'electron';
import { format } from 'url';
import { join } from 'path';
import { topMenuTemplates } from './topMenuTemplates';
import { createProtocol } from 'vue-cli-plugin-electron-builder/lib'

let window;
function createMainWindow(width, height, titleName) {
	window = new BrowserWindow({
		width: width,
		height: height,
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
	}

	window.on('closed', () => {
		window = null
	});

	const mainMenu = Menu.buildFromTemplate(topMenuTemplates);
	Menu.setApplicationMenu(mainMenu);
}

function createWindow(width, height, titleName, fileName) {
	let window = new BrowserWindow({
		width: width,
		height: height,
		title: titleName
	});
	window.loadURL(format({
		pathname: join(__dirname, fileName),
		protocol: 'file:',
		slashes: true
	}));
}

export { createMainWindow, createWindow };