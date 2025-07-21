//____________IMPORT/EXPORT____________
// Hooks de React
import { useContext,useEffect } from "react";
import { useNavigate } from "react-router-dom";
// Contextos
import { ModalContext,ModalViewContext,SidebarContext } from "../../../../contexts/ViewsProvider";
import { PermissionsEnableContext } from "../../../../contexts/UsersProvider";
import { ActionBlockContext,VerificationBlockContext,FunctionBlockContext } from "../../../../contexts/VariablesProvider";
import { SelectedRowContext } from "../../../../contexts/SelectedesProvider";
import { RefModalContext,RefFormContext } from "../../../../contexts/RefsProvider";
import { SocketContext } from "../../../../contexts/SocketProvider";
import { TextFieldsPermissionsContext } from "../../../../contexts/FormsProvider";
import { LoggedUserContext } from "../../../../contexts/SessionProvider";
import { UsersContext } from "../../../../contexts/UsersProvider";
// Hooks personalizados
import { HandleModalViewUsers } from "../../../../hooks/users/Views";
import { HandlePermissionsEnable } from "../../../../hooks/users/Forms";
//__________IMAGENES__________
import Logo_Hospital from '../../../imgs/Logo-Hospital.png'
//__________IMAGENES__________
//__________ICONOS__________
// Icono para realizar la función del modal
import { FaUserTie } from "react-icons/fa6";
//__________ICONOS__________
// Estilos personalizados
import { Container_Modal_Background_Black,Container_Modal_Image,Container_Row_NG_Auto_Center, Container_Modal_Form_White_500,Container_Modal_Form_White,Container_Modal_Form } from "../../../styled/Containers";
import { Text_Span_12_Justify_Black,Text_Title_28_Black,Text_Color_Green_16,Text_Span_16_Center_Black } from "../../../styled/Text";
import { Alert_Sonner_Promise } from "../../../styled/Alerts";
import { Image_Modal_Fixed } from "../../../styled/Imgs";
// Componentes personalizados
import Form_Verification from '../../../forms/Verification';
import Error_Enable from "../../errors/Enable";
import { Modal_Form_Button_Enable_Verification,Modal_Form_Button_Disable_Verification } from "../../../forms/Button";
import { Keyboard_Verification } from "../../../keyboards/Verificacion";
//____________IMPORT/EXPORT____________

// Modal para habilitar/deshabilitar el permiso de super administrador a los usuarios
export default function Permissions_Enable(){
    // Constantes con el valor de los contextos
    const [isActionBlock,setIsActionBlock] = useContext(ActionBlockContext);
    const [isFunctionBlock,setIsFunctionBlock] = useContext(FunctionBlockContext);
    const [isSidebar,setIsSidebar] = useContext(SidebarContext);
    const [isSelectedRow,setIsSelectedRow] = useContext(SelectedRowContext);
    const [isModal,setIsModal] = useContext(ModalContext);
    const [currentMView,setCurrentMView] = useContext(ModalViewContext);
    const Modal = useContext(RefModalContext);
    const isForm = useContext(RefFormContext);
    const [isVerificationBlock,setIsVerificationBlock] = useContext(VerificationBlockContext);
    const [isPermissionsEnable,setIsPermissionsEnable] = useContext(PermissionsEnableContext);
    const [socket] = useContext(SocketContext);
    const [isTextFieldsPermissions] = useContext(TextFieldsPermissionsContext);
    const [isLoggedUser] = useContext(LoggedUserContext);
    const [isUsers] = useContext(UsersContext);
    // Constantes con la funcionalidad de los hooks
    const navigate = useNavigate();
    const handleModalViewUsers = HandleModalViewUsers();
    const handlePermissionsEnable = HandlePermissionsEnable();
    // UseEffect para editar datos a la base de datos
    useEffect(() => {
        if(isPermissionsEnable){
            const promise = new Promise((resolve,reject) => {
                try{
                    setTimeout(() => {
                        socket.emit('Update-Permission',isUsers.find(user => user.idusuario === isTextFieldsPermissions.idusuario)?.usuario,isLoggedUser.idusuario,isTextFieldsPermissions.idpermiso,isTextFieldsPermissions.superadministrador ? 0:1,isTextFieldsPermissions.idusuario);

                        if(isTextFieldsPermissions.superadministrador){
                            resolve('¡Deshabilita el super administrador al usuario!');
                        }else{
                            resolve('¡Habilita el super administrador al usuario!');
                        }
                        
                        setIsPermissionsEnable(false);
                        
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
                            setIsSelectedRow(null);
                            setIsFunctionBlock(false);
                            sessionStorage.removeItem('Función del Bloqueo');
                            sessionStorage.removeItem('Verificación del Bloqueo');
                            setIsVerificationBlock(false);
                            return navigate(route,{ replace: true });
                        },750);
                    },1000);
                }catch(e){
                    setIsActionBlock(false);
                    setIsPermissionsEnable(false);
                    return reject('¡Ocurrio un error inesperado!');
                }
            }); 
            
            return Alert_Sonner_Promise(promise,isTextFieldsPermissions.superadministrador ? '¡Deshabilitando el super administrador a un usuario!' : '¡Habilitando el super administrador a un usuario!','2');
        }
    },[isPermissionsEnable]);
    // Estructura del componente
    return(
        <>
            {isModal && isSelectedRow !== null ? (
                <>
                    <Container_Modal_Background_Black ref={Modal}>
                        <Container_Modal_Image>
                            <Image_Modal_Fixed src={Logo_Hospital}/>
                        </Container_Modal_Image>
                        <Container_Modal_Form_White_500 ref={isForm} className={currentMView === 'Permiso-Super-Administrador' ? 'slide-in-container-top' : 'slide-out-container-top'}>
                            <Container_Modal_Form_White>
                                <Container_Modal_Form>
                                    <Text_Title_28_Black>{isTextFieldsPermissions.superadministrador ? 'DESHABILITAR SUPER ADMINISTRADOR':'HABILITAR SUPER ADMINISTRADOR'}</Text_Title_28_Black>
                                    <Form_Verification/>
                                    <Container_Row_NG_Auto_Center>
                                        <Text_Color_Green_16>Usuario</Text_Color_Green_16>
                                        <Text_Span_16_Center_Black>: {isTextFieldsPermissions.usuario}</Text_Span_16_Center_Black>
                                    </Container_Row_NG_Auto_Center>
                                    <Text_Span_12_Justify_Black>Al {isTextFieldsPermissions.superadministrador ? 'deshabilitar':'habilitar'} el rol de superadministrador, se forzará el cierre inmediato de la sesión del usuario si se encuentra activo.</Text_Span_12_Justify_Black>
                                    {isTextFieldsPermissions.superadministrador ? (
                                        <Modal_Form_Button_Disable_Verification
                                            onCancel={() => handleModalViewUsers('')}
                                            onAction={() => handlePermissionsEnable()}
                                            Icon={<FaUserTie/>}
                                        />
                                    ):(
                                        <Modal_Form_Button_Enable_Verification
                                            onCancel={() => handleModalViewUsers('')}
                                            onAction={() => handlePermissionsEnable()}
                                            Icon={<FaUserTie/>}
                                        />
                                    )}
                                </Container_Modal_Form>
                            </Container_Modal_Form_White>
                        </Container_Modal_Form_White_500>
                        <Keyboard_Verification/>
                    </Container_Modal_Background_Black>  
                </>
            ):(
                currentMView === 'Permiso-Super-Administrador' ? (
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