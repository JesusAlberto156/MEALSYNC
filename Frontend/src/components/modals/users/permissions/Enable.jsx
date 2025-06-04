//____________IMPORT/EXPORT____________
// Hooks de React
import { useContext,useEffect } from "react";
import { useNavigate } from "react-router-dom";
// Componentes de React externos
import { Tooltip } from "@mui/material";
// Contextos
import { ThemeModeContext,ModalContext,ModalViewContext } from "../../../../contexts/ViewsProvider";
import { PermissionsEnableContext } from "../../../../contexts/UsersProvider";
import { ActionBlockContext,VerificationBlockContext } from "../../../../contexts/VariablesProvider";
import { SelectedRowContext } from "../../../../contexts/SelectedesProvider";
import { RefPermissionsContext } from "../../../../contexts/RefsProvider";
import { SocketContext } from "../../../../contexts/SocketProvider";
import { TextFieldsPermissionsContext } from "../../../../contexts/FormsProvider";
// Hooks personalizados
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
    const [isModal,setIsModal] = useContext(ModalContext);
    const [currentMView,setCurrentMView] = useContext(ModalViewContext);
    const {Modal_Permissions,Form_Permissions,Button_Edit_Permissions,Button_Enable_Permissions} = useContext(RefPermissionsContext);
    const [isVerificationBlock,setIsVerificationBlock] = useContext(VerificationBlockContext);
    const [isPermissionsEnable,setIsPermissionsEnable] = useContext(PermissionsEnableContext);
    const [socket] = useContext(SocketContext);
    const [isTextFieldsPermissions] = useContext(TextFieldsPermissionsContext);
    // Constantes con la funcionalidad de los hooks
    const navigate = useNavigate();
    const handleModalView = HandleModalView();
    const handlePermissionsEnable = HandlePermissionsEnable();
    // UseEffect para editar datos a la base de datos
    useEffect(() => {
        if(isPermissionsEnable){
            const promise = new Promise((resolve,reject) => {
                try{
                    setTimeout(() => {
                        socket.emit('Permission-Update',isTextFieldsPermissions.iduser,isTextFieldsPermissions.user,isSelectedRow.superadministrador ? 0:1);
                        socket.emit('Message-Permission',isTextFieldsPermissions.user);

                        if(isSelectedRow.superadministrador){
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
                            setIsPermissionsEnable(false);
                            setIsSelectedRow(null);
                            sessionStorage.removeItem('Action-Block');
                            sessionStorage.removeItem('Verification-Block');
                            setIsVerificationBlock(false);
                            navigate(route,{ replace: true });
                        },750);
                    },2000);
                }catch(e){
                    setIsActionBlock(true);
                    setIsPermissionsEnable(false);
                    return reject('¡Ocurrio un error inesperado!...');
                }
            }); 
            
            Alert_Verification(promise,isSelectedRow.superadministrador ? '¡Deshabilitando el super administrador a un usuario!...' : '¡Habilitando el super administrador a un usuario!...');
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
                    <Container_Modal ref={Modal_Permissions}>
                        <Container_Form_450 ref={Form_Permissions} ThemeMode={themeMode} className={currentMView === 'Permissions-Enable' ? 'slide-in-container-top' : 'slide-out-container-top'}>
                            <Text_Title_30_Center ThemeMode={themeMode}>{isSelectedRow.superadministrador ? 'DESHABILITAR SUPER ADMINISTRADOR':'HABILITAR SUPER ADMINISTRADOR'}</Text_Title_30_Center>
                            <Form_Verification/>
                            <Container_Row_NG_90_Left>
                                <Text_Blue_16_Left ThemeMode={themeMode}>MEALSYNC</Text_Blue_16_Left>
                                <Text_P_16_Left ThemeMode={themeMode}>- Usuario: {isTextFieldsPermissions.user}</Text_P_16_Left>
                            </Container_Row_NG_90_Left>
                            <Container_Row_90_Center>
                                <Tooltip title='Cancelar' placement="top">
                                    <Button_Icon_Blue_180 ThemeMode={themeMode} className='pulsate-buttom'
                                        onClick={() => handleModalView('')}
                                        disabled={!isActionBlock && isVerificationBlock}
                                    >
                                        <Icon_White_22><MdCancel/></Icon_White_22>
                                    </Button_Icon_Blue_180>
                                </Tooltip>
                                {isSelectedRow.superadministrador ? (
                                    <>
                                        <Tooltip title='Deshabilitar' placement="top">
                                            <Button_Icon_Red_180 ThemeMode={themeMode} className={isActionBlock ? 'roll-in-button-left' : 'roll-out-button-left'}
                                                onClick={() => handlePermissionsEnable()}
                                                disabled={!isActionBlock}    
                                            >
                                                <Icon_White_22><FaUserTie/></Icon_White_22>
                                            </Button_Icon_Red_180>
                                        </Tooltip>
                                    </>
                                ):(
                                    <>
                                        <Tooltip title='Habilitar' placement="top">
                                            <Button_Icon_Green_180 ThemeMode={themeMode} className={isActionBlock ? 'roll-in-button-left' : 'roll-out-button-left'}
                                                onClick={() => handlePermissionsEnable()}
                                                disabled={!isActionBlock} 
                                            >
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