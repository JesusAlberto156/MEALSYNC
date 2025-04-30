import { app, BrowserWindow, ipcMain, screen } from 'electron';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Función para crear la ventana
function createWindow(monitor) {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
          preload: path.join(__dirname, 'preload.js'), // Asegúrate de que la ruta sea correcta
          nodeIntegration: false,  // Esto debe estar desactivado por razones de seguridad
          contextIsolation: true, // Asegúrate de que el aislamiento de contexto esté habilitado
        },
      });

  // Cargar la URL de desarrollo en modo de desarrollo, o el archivo HTML en producción
  if (process.env.VITE_DEV_SERVER_URL) {
    win.loadURL(process.env.VITE_DEV_SERVER_URL);
  } else {
    win.loadFile(path.join(__dirname, '../index.html'));
  }

  // Para abrir las DevTools (útil para depuración)
  // win.webContents.openDevTools();
}

// Evento cuando Electron esté listo
app.whenReady().then(() => {
  createWindow(screen.getPrimaryDisplay()); // Crea una ventana en el monitor principal

  // Si hay más monitores, puedes abrir una ventana en el segundo monitor
  const displays = screen.getAllDisplays();
  if (displays.length > 1) {
    const targetMonitor = displays[1];
    createWindow(targetMonitor);
  }
});

// Cerramos la app cuando todas las ventanas se cierran
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

// Escuchar el evento de abrir una nueva ventana desde React
ipcMain.on('open-new-window', () => {
  const displays = screen.getAllDisplays();
  const targetMonitor = displays.length > 1 ? displays[1] : displays[0]; // Abre la ventana en el segundo monitor si existe
  createWindow(targetMonitor); // Llama a la función para abrir la nueva ventana
});