import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('electronAPI', {
  openWindow: () => ipcRenderer.send('open-new-window'),  // Enviar mensaje
});