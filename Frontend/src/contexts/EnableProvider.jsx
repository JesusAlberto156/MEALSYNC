import { createContext, useState } from "react"
import { decryptData } from "../services/Crypto";

export const enableContext = createContext(null);

export const EnableProvider = ({ children }) => {

    const [isEnable,setIsEnable] = useState(() => {
        const enable = sessionStorage.getItem('Enable');

        if(enable){
            try{
                const decryptedData = decryptData(enable);

                if(decryptedData){
                    console.log('Estado de sesión cargado correctamente.');
                    if(decryptedData === 'false'){
                        return false;
                    }else{
                        return true;
                    }
                }else{
                    console.log('Error al desencriptar datos almacenados.');
                    return false;
                }
            } catch (error) {
                console.error('Error procesando datos de sessionStorage:',error);
                return false;
            }
        }
        return false;
    });

    return (
        <enableContext.Provider value={[isEnable,setIsEnable]}>
            {children}
        </enableContext.Provider>
    );
}