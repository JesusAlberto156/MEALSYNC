//____________IMPORT/EXPORT____________
// Hooks de React
import { useCallback } from 'react';
//____________IMPORT/EXPORT____________

export function Dates() {
    // Función para obtener la hora exacta del sistema para insertar las tablas
    const insertDate = useCallback((hoursOffset = -7) => {
        const now = new Date();
        now.setHours(now.getHours() + hoursOffset);
        const pad = (n) => n.toString().padStart(2, '0');
        const year = now.getFullYear();
        const month = pad(now.getMonth() + 1);
        const day = pad(now.getDate());
        const hours = pad(now.getHours());
        const minutes = pad(now.getMinutes());
        const seconds = pad(now.getSeconds());
        return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    }, []);

    // Funcion para dar formato a la fecha y mostrarla en el sistema
    const getDate = useCallback((fechaInput) => {
        const fecha = new Date(fechaInput);
        fecha.setHours(fecha.getHours() + 7);

        const opcionesFecha = { day: '2-digit', month: 'long', year: 'numeric' };
        const opcionesHora = { hour: '2-digit', minute: '2-digit', hour12: false };

        const fechaLegible = fecha.toLocaleDateString('es-MX', opcionesFecha);
        const horaLegible = fecha.toLocaleTimeString('es-MX', opcionesHora);

        return `${fechaLegible}, ${horaLegible}`;
    }, []);

    return { insertDate, getDate };
}