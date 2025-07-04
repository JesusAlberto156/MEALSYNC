//____________IMPORT/EXPORT____________
// Hooks de React
import { useContext,useEffect,useState } from "react";
import { useNavigate } from "react-router-dom";
// Contextos
import { ModalContext,ModalViewContext } from "../../../contexts/ViewsProvider";
// Estilos personalizados
import { Container_Modal,Container_Column_90_Center } from "../../styled/Containers";
import { Text_Title_36_White,Text_Title_40_White } from "../../styled/Text";
import { Alert_Verification } from "../../styled/Alerts";
//____________IMPORT/EXPORT____________

// Modal para el error de editar de los modales
export default function Error_Edit(){
    // Constantes con el valor de los contextos
    const [isModal,setIsModal] = useContext(ModalContext);
    const [currentMView,setCurrentMView] = useContext(ModalViewContext);
    // Constantes con el valor de los useState
    const [contador,setContador] = useState(5);
    // Constantes con la funcionalidad de los hooks
    const navigate = useNavigate();
    // useEffect con cuenta regresiva para regresar
    useEffect(() => {
        if(contador === 0){
            const promise = new Promise((resolve,reject) => {
                try{
                    setTimeout(() => {
                        resolve('¡Página encontrada!...');
                    },1000);
                    setTimeout(() => {
                        setIsModal(false);
                        sessionStorage.setItem('Estado del Modal',false);
                        setCurrentMView('');
                        sessionStorage.setItem('Vista del Modal','');
                        navigate('/',{replace: true});
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
    },[contador]);
    // Estructura del componente
    return(
        <>
            <Container_Modal>
                <Container_Column_90_Center>
                    <Text_Title_36_White>¡Ha perdido los datos para editar!</Text_Title_36_White>
                    <Text_Title_36_White>Redirigiendo en...</Text_Title_36_White>
                    <Text_Title_40_White>{contador}</Text_Title_40_White>
                </Container_Column_90_Center>
            </Container_Modal>
        </>
    );
}