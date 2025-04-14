import CryptoJS from 'crypto-js';

const SECRET_KEY = import.meta.env.VITE_SECRET_KEY;

export const encryptData = (data) => {
    return CryptoJS.AES.encrypt(data, SECRET_KEY).toString();
};

export const decryptData = (encryptedData) => {
    try {
        if (!SECRET_KEY) throw new Error("SECRET_KEY no está definido");

        const bytes = CryptoJS.AES.decrypt(encryptedData, SECRET_KEY);
        const decryptedString = bytes.toString(CryptoJS.enc.Utf8);

        if (!decryptedString) throw new Error("Desencriptación fallida");

        return decryptedString;
    } catch (error) {
        console.error("Error al desencriptar los datos en el frontend:", error.message);
        return null;
    }
};