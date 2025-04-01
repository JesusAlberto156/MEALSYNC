//____________IMPORT/EXPORT____________
// Hooks de React
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
// Componentes de React externos

// Servicios

// Rutas

// Contextos
import { modeContext } from '../contexts/VariablesProvider'
// Hooks personalizados

//__________ICONOS__________

//__________ICONOS__________
// Estilos personalizados
import { Alert_Verification } from "../components/styled/Alerts";
// Componentes personalizados

//____________IMPORT/EXPORT____________

// Hook para regresar a una página permitida
export const useErrorReturn = () => {
    // Constantes con el valor de los contextos
    const [isMode] = useContext(modeContext);
    // Constantes con el valor de los hooks
    const navigate = useNavigate();
    // Función del hook
    const errorReturn = () => {
        const promise = new Promise(async (resolve,reject) => {
            try{
                setTimeout(() => {
                    resolve('¡Página encontrada!...');
                },1000);
                setTimeout(() => {
                    navigate('/',{replace: true});
                },2000);
            } catch (error) {
                reject('¡Ocurrio un error inseperado!...');
            }
        });

        Alert_Verification(promise,'Buscando página...');
    }
    // Retorno de la función del hook
    return errorReturn;
}