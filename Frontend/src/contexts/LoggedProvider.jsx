import { createContext, useState,useEffect } from "react"
import { decryptData } from "../services/Crypto";

export const loggedContext = createContext(null);

export const LoggedProvider = ({ children }) => {

    const [isLogged,setIsLogged] = useState(() => {
        const logged = sessionStorage.getItem('Logged');

        if(logged){
            try{
                const decryptedData = decryptData(logged);

                if(decryptedData){
                    console.log('Inicio de sesión cargado correctamente.');
                    return true;
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
        <loggedContext.Provider value={[isLogged,setIsLogged]}>
            {children}
        </loggedContext.Provider>
    );
}