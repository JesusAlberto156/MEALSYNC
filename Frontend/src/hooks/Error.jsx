//____________IMPORT/EXPORT____________
// Hooks de React
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
// Componentes de React externos

// Servicios

// Rutas

// Contextos
import { typeUserContext } from "../contexts/VariablesProvider";
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
    const [isTypeUser] = useContext(typeUserContext);
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
                    if(isTypeUser === 'Cook' || isTypeUser === 'Nutritionist' || isTypeUser === 'Doctor'){
                        navigate('/Kitchen/Home',{replace: true});
                    }else{
                        navigate('/Administration/Home',{replace: true});
                    }
                },2000);
            } catch (error) {
                return reject('¡Ocurrio un error inseperado!...');
            }
        });

        Alert_Verification(promise,'Buscando página...');
    }
    // Retorno de la función del hook
    return errorReturn;
}