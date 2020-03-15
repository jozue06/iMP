import { app } from 'electron';
import { createWindow } from '../utils/windowCreation';
const topMenuTemplates = [
    {
        label: 'File',
        submenu: [
            {
                label: 'Add shit',
                click() {
                    createWindow(500, 500, 'Add Shithuh?', 'addShitWindow.html');
                }
            },
            {
                label: 'Add more shit',
            },
            {
                label: 'Quit',
                accelerator: process.platform == 'darwin' ? 'Command+Q' : 'Ctrl+Q',
                click() {
                    app.quit();
                }
            }
        ]
    },
    {
        label: 'View',
        submenu: [
            {
                label: 'Close Window',
                accelerator: process.platform == 'darwin' ? 'Command+W' : 'Ctrl+W',
                role: 'close',
            },
            {
                label: 'Toggle Developer Tools',
                accelerator: process.platform === 'darwin' ? 'Command+J' : 'Ctrl+Shift+I',
                click(item, focusedWindow) {
                    if (focusedWindow) {
                        focusedWindow.toggleDevTools()
                    }
                }
            }
        ]
    },
];

export { topMenuTemplates };