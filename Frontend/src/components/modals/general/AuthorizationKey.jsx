//____________IMPORT/EXPORT____________
// Hooks de React
import { useContext,useEffect,useState } from "react";
// Contextos
import { ModalContext,ModalViewContext } from "../../../contexts/ViewsProvider";
import { SocketContext } from "../../../contexts/SocketProvider";
import { KeyContext } from "../../../contexts/KeyProvider";
import { LoggedUserContext } from "../../../contexts/SessionProvider";
// Hooks personalizados
import { HandleModalView } from "../../../hooks/Views";
// Estilos personalizados
import { Container_Modal_Background_Black, Container_Modal_Form, Container_Modal_Form_White, Container_Modal_Form_White_500 } from "../../styled/Containers";
import { Image_Modal } from "../../styled/Imgs";
import { Text_Span_16_Center_Black, Text_Title_28_Black, Text_Title_36_Black } from "../../styled/Text";
import { Modal_Form_Button_Return } from "../../forms/Button";
import { Alert_Sonner_Promise } from "../../styled/Alerts";
//____________IMPORT/EXPORT____________

// Modal para verificar la clave de autorización
export default function Authorization_Key(){
    // Constantes con el valor de los contextos
    const [currentMView] = useContext(ModalViewContext);
    const [isModal] = useContext(ModalContext);
    const [isKey] = useContext(KeyContext);
    const [socket] = useContext(SocketContext); 
    const [isLoggedUser] = useContext(LoggedUserContext);
    // Constantes con el valor de los useState
    const [contador,setContador] = useState(60);
    // Constantes con la funcionalidad de los hooks
    const handleModalView = HandleModalView();
    // Funcion para generar clave secreta
    function generateRandomKey(length = 10) {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let key = '';
        for (let i = 0; i < length; i++) {
            key += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return key;
    }
    // useEfect con el contador
    useEffect(() => {
        if(contador === 0){
            const promise = new Promise((resolve,reject) => {
                try{
                    setTimeout(() => {
                        socket.emit('Update-Key',isLoggedUser.idusuario,isKey[0].idclave,generateRandomKey());

                        setContador(60);

                        return resolve('¡Clave actualizada!');
                    },2000);
                } catch (e) {
                    return reject('¡Ocurrio un error inseperado!');
                }
            });

            return Alert_Sonner_Promise(promise,'¡Actualizando clave!','1');
        }

        if (contador > 0) {
            const intervalo = setInterval(() => {
                setContador((prev) => prev - 1);
            }, 1000);

            return () => clearInterval(intervalo);
        }
    },[contador]);
    // useEffect con la sobrecarga de la clave
    useEffect(() => {
        if(isKey.length !== 0){
            socket.emit('Update-Key',isLoggedUser.idusuario,isKey[0].idclave,generateRandomKey());
        }else{
            socket.emit('Insert-Key',isLoggedUser.idusuario,generateRandomKey());
        }
    },[])
    // Estructura del componente
    return(
        <>
            {isModal ? (
                <Container_Modal_Background_Black>
                    <Image_Modal/>
                    <Container_Modal_Form_White_500 className={currentMView === 'Clave-Secreta' ? 'slide-in-container-top' : 'slide-out-container-top'}>
                        <Container_Modal_Form_White>
                            <Container_Modal_Form>
                                <Text_Title_28_Black>CLAVE DE AUTORIZACIÓN</Text_Title_28_Black>
                                {isKey.length !== 0 ? (
                                    <Text_Span_16_Center_Black>{isKey[0].clave || 'Desconocida'}</Text_Span_16_Center_Black>
                                ):(
                                    <></>
                                )}
                                <Text_Title_36_Black>{contador}</Text_Title_36_Black>
                                <Modal_Form_Button_Return
                                    onHandleModalView={() => {
                                        handleModalView('');
                                        socket.emit('Update-Key',isLoggedUser.idusuario,isKey[0].idclave,generateRandomKey());
                                    }}
                                />
                            </Container_Modal_Form>
                        </Container_Modal_Form_White>
                    </Container_Modal_Form_White_500>
                </Container_Modal_Background_Black>
            ):(
                <></>
            )}  
        </>
    );
}