import { createContext, useState } from "react"
import { decryptData } from "../services/Crypto";

export const typeUserContext = createContext(null);

export const TypeUser = ({ children }) => {

    const [typeUser,setTypeUser] = useState(() => {
        const StoredData = sessionStorage.getItem('TypeUser');

        if(StoredData){
            try{
                const decryptedData = decryptData(StoredData);

                if(decryptedData){
                    console.log('Tipo de usuario cargado correctamente...');
                    return decryptedData;
                }else{
                    console.log('Error al desencriptar el tipo de usuario...');
                    return '';
                }
            } catch (error) {
                console.error('Error procesando datos de sessionStorage:',error);
                return '';
            }
        }else{
            return '';
        }
    });

    return (
        <typeUserContext.Provider value={[typeUser,setTypeUser]}>
            {children}
        </typeUserContext.Provider>
    );
}