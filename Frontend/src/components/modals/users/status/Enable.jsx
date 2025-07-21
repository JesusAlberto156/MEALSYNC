//____________IMPORT/EXPORT____________
// Hooks de React
import { useContext,useEffect } from "react";
import { useNavigate } from "react-router-dom";
// Contextos
import { ModalContext,ModalViewContext,SidebarContext } from "../../../../contexts/ViewsProvider";
import { ActionBlockContext,VerificationBlockContext,FunctionBlockContext } from "../../../../contexts/VariablesProvider";
import { SelectedRowContext } from "../../../../contexts/SelectedesProvider";
import { StatusEnableContext } from "../../../../contexts/UsersProvider";
import { SocketContext } from "../../../../contexts/SocketProvider";
import { RefModalContext,RefFormContext } from "../../../../contexts/RefsProvider";
import { TextFieldsStatusContext } from "../../../../contexts/FormsProvider";
import { LoggedUserContext } from "../../../../contexts/SessionProvider";
// Hooks personalizados
import { HandleStatusEnable } from "../../../../hooks/users/Forms";
import { HandleModalViewUsers } from "../../../../hooks/users/Views";
//__________IMAGENES__________
import Logo_Hospital from '../../../imgs/Logo-Hospital.png'
//__________IMAGENES__________
//__________ICONOS__________
// Icono para realizar la función del modal
import { FaLock } from "react-icons/fa";
import { FaLockOpen } from "react-icons/fa";
//__________ICONOS__________
// Estilos personalizados
import { Container_Modal_Background_Black,Container_Modal_Image,Container_Row_NG_Auto_Center,Container_Modal_Form_White_500,Container_Modal_Form_White,Container_Modal_Form } from "../../../styled/Containers";
import { Text_Span_16_Center_Black,Text_Span_12_Justify_Black,Text_Title_28_Black,Text_Color_Green_16 } from "../../../styled/Text";
import { Alert_Sonner_Promise } from "../../../styled/Alerts";
import { Image_Modal_Fixed } from "../../../styled/Imgs";
// Componentes personalizados
import Form_Verification from "../../../forms/Verification";
import Error_Enable from "../../errors/Enable";
import { Keyboard_Verification } from "../../../keyboards/Verificacion";
import { Modal_Form_Button_Enable_Verification,Modal_Form_Button_Disable_Verification } from "../../../forms/Button";
//____________IMPORT/EXPORT____________

// Modal para habilitar/deshabilitar usuarios
export default function Status_Enable(){
    // Constantes con el valor de los contextos
    const [isSelectedRow,setIsSelectedRow] = useContext(SelectedRowContext);
    const [isActionBlock,setIsActionBlock] = useContext(ActionBlockContext);
    const [currentMView,setCurrentMView] = useContext(ModalViewContext);
    const [isModal,setIsModal] = useContext(ModalContext);
    const [isVerificationBlock,setIsVerificationBlock] = useContext(VerificationBlockContext);
    const [socket] = useContext(SocketContext);
    const [isStatusEnable,setIsStatusEnable] = useContext(StatusEnableContext);
    const Modal = useContext(RefModalContext);
    const isForm = useContext(RefFormContext); 
    const [isTextFieldsStatus] = useContext(TextFieldsStatusContext);
    const [isLoggedUser] = useContext(LoggedUserContext);
    const [isFunctionBlock,setIsFunctionBlock] = useContext(FunctionBlockContext);
    const [isSidebar,setIsSidebar] = useContext(SidebarContext); 
    // Constantes con la funcionalidad de los hooks
    const navigate = useNavigate();
    const handleModalViewUsers = HandleModalViewUsers();
    const handleStatusEnable = HandleStatusEnable();
    // UseEffect para editar datos a la base de datos
    useEffect(() => {
        if(isStatusEnable){
            const promise = new Promise((resolve,reject) => {
                try{ 
                    setTimeout(() => {
                        socket.emit('Update-Status-Enable',isLoggedUser.idusuario,isTextFieldsStatus.idestatus,isTextFieldsStatus.estatus === 'Habilitado' ? 0:1,isTextFieldsStatus.idusuario);

                        if(isTextFieldsStatus.estatus === 'Habilitado'){
                            resolve('¡Deshabilitó al usuario!');
                        }else{
                            resolve('¡Habilitó al usuario!');
                        }

                        setIsStatusEnable(false);

                        const route = sessionStorage.getItem('Ruta');
                        const sidebar = sessionStorage.getItem('Estado del Sidebar');

                        setCurrentMView('');
                        sessionStorage.setItem('Vista del Modal','');
                        setTimeout(() => {
                            if(sidebar === 'true'){
                                setIsSidebar(true);
                            }
                            setIsModal(false);
                            sessionStorage.setItem('Estado del Modal',false);
                            setIsActionBlock(false);
                            setIsVerificationBlock(false);
                            setIsFunctionBlock(false);
                            sessionStorage.removeItem('Función del Bloqueo');
                            sessionStorage.removeItem('Verificación del Bloqueo');
                            setIsSelectedRow(null);
                            return navigate(route,{ replace: true });
                        },750);
                    },1000);
                }catch(e){
                    setIsActionBlock(false);
                    setIsStatusEnable(false);
                    return reject('¡Ocurrio un error inesperado!');
                }
            });

            return Alert_Sonner_Promise(promise,isTextFieldsStatus.estatus === 'Habilitado' ? '¡Deshabilitando usuario!' : '¡Habilitando usuario!','2');
        }
    },[isStatusEnable]);
    // Estructura del componente
    return(
        <>
            {isModal && isSelectedRow !== null ? (
                <Container_Modal_Background_Black ref={Modal}>
                    <Container_Modal_Image>
                        <Image_Modal_Fixed src={Logo_Hospital}/>
                    </Container_Modal_Image>
                    <Container_Modal_Form_White_500 ref={isForm}  className={currentMView === 'Estatus-Habilitar' ? 'slide-in-container-top' : 'slide-out-container-top'}>
                        <Container_Modal_Form_White>
                            <Container_Modal_Form>
                                <Text_Title_28_Black>{isTextFieldsStatus.estatus === 'Habilitado' ? 'DESHABILITAR USUARIO' : 'HABILITAR USUARIO'}</Text_Title_28_Black>
                                <Form_Verification/>
                                <Container_Row_NG_Auto_Center>
                                    <Text_Color_Green_16>Usuario</Text_Color_Green_16>
                                    <Text_Span_16_Center_Black>: {isTextFieldsStatus?.usuario || 'Desconocido'}</Text_Span_16_Center_Black>
                                </Container_Row_NG_Auto_Center>
                                {isTextFieldsStatus.estatus === 'Habilitado' ? (
                                    <>
                                        <Text_Span_12_Justify_Black>Al deshabilitar al usuario, se forzará el cierre inmediato de la sesión del usuario si se encuentra activo.</Text_Span_12_Justify_Black>
                                        <Modal_Form_Button_Disable_Verification
                                            onCancel={() => handleModalViewUsers('')}
                                            onAction={() => handleStatusEnable()}
                                            Icon={<FaLock/>}
                                        />
                                    </>
                                ):(
                                    <Modal_Form_Button_Enable_Verification
                                        onCancel={() => handleModalViewUsers('')}
                                        onAction={() => handleStatusEnable()}
                                        Icon={<FaLockOpen/>}
                                    />
                                )}
                            </Container_Modal_Form>
                        </Container_Modal_Form_White>
                    </Container_Modal_Form_White_500>
                    <Keyboard_Verification/>
                </Container_Modal_Background_Black>
            ):(
                currentMView === 'Estatus-Habilitar' ? (
                    <>
                        <Error_Enable/>
                    </>
                ):(
                    <></>
                )
            )}
        </>
    );
}