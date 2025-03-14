import CryptoJS from "crypto-js";
import config from './config';

const SECRET_KEY = config.SECRET_KEY;

export const encryptData = (data) => {
    return CryptoJS.AES.encrypt(data, SECRET_KEY).toString();
};

export const decryptData = (encryptedData) => {
    try {
        if (!encryptedData) {
            throw new Error("No hay datos encriptados para desencriptar.");
        }

        const bytes = CryptoJS.AES.decrypt(encryptedData, SECRET_KEY);
        const decryptedString = bytes.toString(CryptoJS.enc.Utf8);

        if (!decryptedString) {
            throw new Error("La desencriptación falló. Posible clave incorrecta o datos corruptos.");
        }

        return decryptedString;
    } catch (error) {
        console.error("Error al desencriptar los datos:", error.message);
        return null;
    }
};