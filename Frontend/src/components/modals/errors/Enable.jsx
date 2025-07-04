//____________IMPORT/EXPORT____________
// Hooks de React
import { useContext,useEffect,useState } from "react";
import { useNavigate } from "react-router-dom";
// Contextos
import { ModalContext,ModalViewContext } from "../../../contexts/ViewsProvider";
import { ActionBlockContext,VerificationBlockContext } from "../../../contexts/VariablesProvider";
import { SelectedRowContext,SelectedRow1Context,SelectedRow2Context } from "../../../contexts/SelectedesProvider";
//__________ICONOS__________
// Estilos personalizados
import { Container_Modal,Container_Column_90_Center } from "../../styled/Containers";
import { Text_Title_36_White,Text_Title_40_White } from "../../styled/Text";
import { Alert_Verification } from "../../styled/Alerts";
//____________IMPORT/EXPORT____________

// Modal para agregar permiso de super administrador a los usuarios
export default function Error_Enable(){
    // Constantes con el valor de los contextos
    const [isActionBlock,setIsActionBlock] = useContext(ActionBlockContext);
    const [isSelectedRow] = useContext(SelectedRowContext);
    const [isSelectedRow1] = useContext(SelectedRow1Context);
    const [isSelectedRow2] = useContext(SelectedRow2Context);
    const [isModal,setIsModal] = useContext(ModalContext);
    const [currentMView,setCurrentMView] = useContext(ModalViewContext);
    const [isVerificationBlock,setIsVerificationBlock] = useContext(VerificationBlockContext);
    // Constantes con el valor de useState
    const [contador,setContador] = useState(5);
    // Constantes con la funcionalidad de los hooks
    const navigate = useNavigate();
    // useEffect con cuenta regresiva para regresar
    useEffect(() => {
        if(isSelectedRow === null || isSelectedRow1 === null || isSelectedRow2 === null){
            if(contador === 0){
                const promise = new Promise((resolve,reject) => {
                    try{
                        const route = sessionStorage.getItem('Ruta');
                        setTimeout(() => {
                            resolve('¡Página encontrada!...');
                        },1000);
                        setTimeout(() => {
                            setIsModal(false);
                            sessionStorage.setItem('Estado del Modal',false);
                            setCurrentMView('');
                            sessionStorage.setItem('Vista del Modal','');
                            setIsActionBlock(false);
                            sessionStorage.removeItem('Acción del Bloqueo');
                            setIsVerificationBlock(false);
                            sessionStorage.removeItem('Verificación del Bloqueo');
                            navigate(route,{replace: true});
                        },2000);
                    } catch (e) {
                        return reject('¡Ocurrio un error inseperado!...');
                    }
                });
        
                return Alert_Verification(promise,'Buscando página...');
            }

            const intervalo = setInterval(() => {
                setContador(prev => prev -1);
            },1000)

            return () => clearInterval(intervalo);
        }
    },[contador]);
    // Estructura del componente
    return(
        <>
            <Container_Modal>
                <Container_Column_90_Center>
                    <Text_Title_36_White>¡Ha perdido los datos para habilitar/deshabilitar!</Text_Title_36_White>
                    <Text_Title_36_White>Redirigiendo en...</Text_Title_36_White>
                    <Text_Title_40_White>{contador}</Text_Title_40_White>
                </Container_Column_90_Center>
            </Container_Modal>
        </>
    );
}