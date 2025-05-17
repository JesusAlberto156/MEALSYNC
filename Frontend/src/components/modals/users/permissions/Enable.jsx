//____________IMPORT/EXPORT____________
// Hooks de React
import { useContext,useEffect,useState } from "react";
import { useNavigate } from "react-router-dom";
// Componentes de React externos
import { Tooltip } from "@mui/material";
// Contextos
import { ThemeModeContext,ModalContext,ModalViewContext } from "../../../../contexts/ViewsProvider";
import { UsersContext,PermissionsEnableContext } from "../../../../contexts/UsersProvider";
import { ActionBlockContext,SelectedRowContext,VerificationBlockContext } from "../../../../contexts/VariablesProvider";
import { RefPermissionsContext } from "../../../../contexts/RefsProvider";
import { SocketContext } from "../../../../contexts/SocketProvider";
import { TextFieldsPermissionsContext } from "../../../../contexts/FormsProvider";
// Hooks personalizados
import { ResetTextFieldsUser } from "../../../../hooks/Texts";
import { HandleModalView } from "../../../../hooks/Views";
import { HandlePermissionsEnable } from "../../../../hooks/Form";
//__________ICONOS__________
// Icono para cerrar el modal
import { MdCancel } from "react-icons/md";
// Icono para realizar la función del modal
import { FaUserTie } from "react-icons/fa6";
//__________ICONOS__________
// Estilos personalizados
import { Container_Modal,Container_Form_450,Container_Row_90_Center,Container_Row_NG_90_Left } from "../../../styled/Containers";
import { Text_P_16_Left,Text_Title_30_Center,Text_Blue_16_Left } from "../../../styled/Text";
import { Button_Icon_Blue_180,Button_Icon_Red_180,Button_Icon_Green_180 } from "../../../styled/Buttons";
import { Icon_White_22 } from "../../../styled/Icons";
import { Alert_Verification } from "../../../styled/Alerts";
// Componentes personalizados
import Form_Verification from '../../../forms/Verification';
import Error_Enable from "../../errors/Enable";
//____________IMPORT/EXPORT____________

// Modal para agregar permiso de super administrador a los usuarios
export default function Permissions_Enable(){
    // Constantes con el valor de los contextos
    const [themeMode] = useContext(ThemeModeContext);
    const [isActionBlock,setIsActionBlock] = useContext(ActionBlockContext);
    const [isSelectedRow,setIsSelectedRow] = useContext(SelectedRowContext);
    const [isUsers] = useContext(UsersContext);
    const [isModal,setIsModal] = useContext(ModalContext);
    const [currentMView,setCurrentMView] = useContext(ModalViewContext);
    const {Modal,Form,Button_Edit_P,Button_Enable_P} = useContext(RefPermissionsContext);
    const [isVerificationBlock,setIsVerificationBlock] = useContext(VerificationBlockContext);
    const [isPermissionsEnable,setIsPermissionsEnable] = useContext(PermissionsEnableContext);
    const [socket] = useContext(SocketContext);
    const [isTextFieldsPermissions] = useContext(TextFieldsPermissionsContext);
    // Constantes con la funcionalidad de los hooks
    const navigate = useNavigate();
    const handleModalView = HandleModalView();
    const handlePermissionsEnable = HandlePermissionsEnable();
    const resetTextFieldsUser = ResetTextFieldsUser();
    // UseEffect para editar datos a la base de datos
    useEffect(() => {
        if(isPermissionsEnable.length !== 0){
            const promise = new Promise(async (resolve,reject) => {
                try{
                    setTimeout(() => {
                        socket.emit('Permission-Update',isPermissionsEnable.idusuario,isTextFieldsPermissions.user,isPermissionsEnable.superadministrador ? 0:1);

                        if(isPermissionsEnable.superadministrador){
                            resolve('¡MEALSYNC deshabilito el super administrador al usuario!...');
                        }else{
                            resolve('¡MEALSYNC Habilito el super administrador al usuario!...');
                        }
                        
                        const route = sessionStorage.getItem('Route');

                        setCurrentMView('');
                        sessionStorage.setItem('Modal-View','');
                        setTimeout(() => {
                            setIsModal(false);
                            sessionStorage.setItem('Modal',false);
                            setIsActionBlock(false);
                            setIsPermissionsEnable([]);
                            setIsSelectedRow(null);
                            resetTextFieldsUser();
                            sessionStorage.removeItem('Action-Block');
                            sessionStorage.removeItem('Verification-Block');
                            setIsVerificationBlock(false);
                            navigate(route,{ replace: true });
                        },750);
                    },2000);
                }catch(error){
                    setIsActionBlock(true);
                    setIsPermissionsEnable([]);
                    return reject('¡Ocurrio un error inesperado!...');
                }
            }); 
            
            Alert_Verification(promise,isPermissionsEnable.superadministrador ? '¡Deshabilitando el super administrador a un usuario!...' : '¡Habilitando el super administrador a un usuario!...');
        }
    },[isPermissionsEnable]);
    // UseEffect para quitar la suscrpcion de socket
    useEffect(() => {
        const handlePermissionUpdate = (message,user) => {
            console.log(message,user);
            socket.emit('Permissions');
        };

        socket.on('Permission-Update',handlePermissionUpdate);
        
        return () => {
            socket.off('Permission-Update',handlePermissionUpdate);
        }
    },[socket])
    // Estructura del componente
    return(
        <>
            {isModal && isSelectedRow !== null ? (
                <>
                    <Container_Modal ref={Modal}>
                        <Container_Form_450 ref={Form} ThemeMode={themeMode} className={currentMView === 'Permissions-Enable' ? 'slide-in-container-top' : 'slide-out-container-top'}>
                            <Text_Title_30_Center ThemeMode={themeMode}>{isSelectedRow.superadministrador ? 'DESHABILITAR SUPER ADMINISTRADOR':'HABILITAR SUPER ADMINISTRADOR'}</Text_Title_30_Center>
                            <Container_Row_NG_90_Left className={themeMode ? 'shadow-out-container-light-infinite' : 'shadow-out-container-dark-infinite'}>
                                <Text_Blue_16_Left ThemeMode={themeMode}>MEALSYNC</Text_Blue_16_Left>
                                <Text_P_16_Left ThemeMode={themeMode}>- Usuario: {isTextFieldsPermissions.user}</Text_P_16_Left>
                            </Container_Row_NG_90_Left>
                            <Form_Verification/>
                            <Container_Row_90_Center>
                                <Tooltip title='Cancelar' placement="top">
                                    <Button_Icon_Blue_180 ThemeMode={themeMode} className='pulsate-buttom'
                                        onClick={() => handleModalView('')}>
                                        <Icon_White_22><MdCancel/></Icon_White_22>
                                    </Button_Icon_Blue_180>
                                </Tooltip>
                                {isSelectedRow.superadministrador ? (
                                    <>
                                        <Tooltip title='Deshabilitar' placement="top">
                                            <Button_Icon_Red_180 ThemeMode={themeMode} className={isActionBlock ? 'roll-in-button-left' : 'roll-out-button-left'}
                                                onClick={() => handlePermissionsEnable()}>
                                                <Icon_White_22><FaUserTie/></Icon_White_22>
                                            </Button_Icon_Red_180>
                                        </Tooltip>
                                    </>
                                ):(
                                    <>
                                        <Tooltip title='Habilitar' placement="top">
                                            <Button_Icon_Green_180 ThemeMode={themeMode} className={isActionBlock ? 'roll-in-button-left' : 'roll-out-button-left'}
                                                onClick={() => handlePermissionsEnable()}>
                                                <Icon_White_22><FaUserTie/></Icon_White_22>
                                            </Button_Icon_Green_180>
                                        </Tooltip>
                                    </>
                                )}
                            </Container_Row_90_Center>
                        </Container_Form_450>
                    </Container_Modal>  
                </>
            ):(
                currentMView === 'Permissions-Enable' ? (
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