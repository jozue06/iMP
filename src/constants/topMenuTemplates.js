import { app } from 'electron';

const topMenuTemplates = [
    {
        label: 'File',
        submenu: [
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
                click(focusedWindow) {
                    if (focusedWindow) {
                        focusedWindow.toggleDevTools()
                    }
                }
            }
        ]
    },
];

export { topMenuTemplates };