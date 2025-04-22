//____________IMPORT/EXPORT____________
// Importamos la librería CryptoJS para poder realizar la encriptación y desencriptación.
import CryptoJS from "crypto-js";
//____________IMPORT/EXPORT____________

// Extraemos la clave secreta desde la configuración
const SECRET_KEY = import.meta.env.VITE_SECRET_KEY;
// Función para encriptar datos
export const encryptData = (data) => {
    return CryptoJS.AES.encrypt(data, SECRET_KEY).toString();
};
// Función para desencriptar datos
export const decryptData = (encryptedData) => {
    try {
        // Verificamos que se haya recibido algún dato
        if (!encryptedData) {
            throw new Error("No hay datos encriptados para desencriptar...");
        }
        // Desencriptamos los datos usando la clave secreta
        const bytes = CryptoJS.AES.decrypt(encryptedData, SECRET_KEY);
        // Convertimos el resultado a texto legible (UTF-8)
        const decryptedString = bytes.toString(CryptoJS.enc.Utf8);
         // Si el resultado está vacío, puede que la clave sea incorrecta o los datos estén corruptos
        if (!decryptedString) {
            throw new Error("La desencriptación falló. Posible clave incorrecta o datos corruptos...");
        }
        // Devolvemos el texto desencriptado
        return decryptedString;
    } catch (error) {
        console.error("Error al desencriptar los datos:", error.message);
        return null;
    }
};