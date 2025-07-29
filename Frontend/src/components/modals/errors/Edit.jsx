//____________IMPORT/EXPORT____________
// Hooks de React
import { useContext,useEffect,useState } from "react";
import { useNavigate } from "react-router-dom";
// Contextos
import { ModalContext,ModalViewContext,SidebarContext } from "../../../contexts/ViewsProvider";
// Estilos personalizados
import { Container_Modal_Background_Black,Container_Column_100_Center } from "../../styled/Containers";
import { Text_Title_40_White,Text_Title_44_White,Text_Title_52_White } from "../../styled/Text";
import { Alert_Sonner_Promise } from "../../styled/Alerts";
// Componentes personalizados
import { Image_Modal } from "../../styled/Imgs";
//____________IMPORT/EXPORT____________

// Modal para el error de editar de los modales
export default function Error_Edit(){
    // Constantes con el valor de los contextos
    const [isModal,setIsModal] = useContext(ModalContext);
    const [currentMView,setCurrentMView] = useContext(ModalViewContext);
    const [isSidebar,setIsSidebar] = useContext(SidebarContext);
    // Constantes con el valor de los useState
    const [contador,setContador] = useState(5);
    // Constantes con la funcionalidad de los hooks
    const navigate = useNavigate();
    // Useffect para controlar el sidebar
    useEffect(() => {
        if(isSidebar){
            setIsSidebar(false);
        }
    },[]);
    // useEffect con cuenta regresiva para regresar
    useEffect(() => {
        if(contador === 0){
            const promise = new Promise((resolve,reject) => {
                try{
                    setTimeout(() => {
                        resolve('¡Página encontrada!');
                    },1000);
                    setTimeout(() => {
                        setIsModal(false);
                        sessionStorage.setItem('Estado del Modal',false);
                        setCurrentMView('');
                        sessionStorage.setItem('Vista del Modal','');
                        return navigate('/',{replace: true});
                    },3500);
                } catch (e) {
                    return reject('¡Ocurrio un error inseperado!');
                }
            });
    
            return Alert_Sonner_Promise(promise,'¡Buscando página!','1');
        }

        const intervalo = setInterval(() => {
            setContador(prev => prev -1);
        },1000)

        return () => clearInterval(intervalo);
    },[contador]);
    // Estructura del componente
    return(
        <>
            <Container_Modal_Background_Black>
                <Image_Modal/>
                <Container_Column_100_Center>
                    <Text_Title_40_White>¡Ha perdido los datos para editar!</Text_Title_40_White>
                    <Text_Title_44_White>Redirigiendo en...</Text_Title_44_White>
                    <Text_Title_52_White>{contador}</Text_Title_52_White>
                </Container_Column_100_Center>
            </Container_Modal_Background_Black>
        </>
    );
}