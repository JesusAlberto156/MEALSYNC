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
import { SocketContext,LogAddContext } from "../../../../contexts/SocketProvider";
import { TextFieldsPermissionsContext } from "../../../../contexts/FormsProvider";
import { LoggedUserContext } from "../../../../contexts/SessionProvider";
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
import { Container_Modal,Container_Form_450,Container_Row_90_Center,Container_Row_NG_90_Center } from "../../../styled/Containers";
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
    const [isLoggedUser] = useContext(LoggedUserContext);
    const [isLogAdd,setIsLogAdd] = useContext(LogAddContext);
    // Constantes con la funcionalidad de los hooks
    const navigate = useNavigate();
    const handleModalView = HandleModalView();
    const handlePermissionsEnable = HandlePermissionsEnable();
    // Función para obtener la hora exacta del sistema
    function getLocalDateTimeOffset(hoursOffset = -7) {
        const now = new Date();
        now.setHours(now.getHours() + hoursOffset); // Restar 7 horas
        const pad = (n) => n.toString().padStart(2, '0');
        const year = now.getFullYear();
        const month = pad(now.getMonth() + 1);
        const day = pad(now.getDate());
        const hours = pad(now.getHours());
        const minutes = pad(now.getMinutes());
        const seconds = pad(now.getSeconds());
        return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    }
    // UseEffect para editar datos a la base de datos
    useEffect(() => {
        if(isPermissionsEnable){
            const promise = new Promise((resolve,reject) => {
                try{
                    setTimeout(() => {
                        socket.emit('Update-Permission',isLoggedUser.usuario,isTextFieldsPermissions.usuario,isTextFieldsPermissions.idusuario,isTextFieldsPermissions.superadministrador ? 0:1);

                        if(isTextFieldsPermissions.superadministrador){
                            resolve('¡MEALSYNC deshabilita el super administrador al usuario!...');
                        }else{
                            resolve('¡MEALSYNC habilita el super administrador al usuario!...');
                        }
                        
                        setIsPermissionsEnable(false);
                        setIsLogAdd(true);
                    },2000);
                }catch(e){
                    setIsActionBlock(true);
                    setIsPermissionsEnable(false);
                    return reject('¡Ocurrio un error inesperado!...');
                }
            }); 
            
            Alert_Verification(promise,isTextFieldsPermissions.superadministrador ? '¡Deshabilitando el super administrador a un usuario!...' : '¡Habilitando el super administrador a un usuario!...');
        }
        if(isLogAdd){
            socket.emit('Insert-Log-Permissions',isLoggedUser.usuario,getLocalDateTimeOffset(),'UPDATE',isTextFieldsPermissions.idpermiso,isLoggedUser.idusuario,'','','','','','',isTextFieldsPermissions.superadministrador ? '0':'1',String(isTextFieldsPermissions.idusuario));
            setIsLogAdd(false);

            const route = sessionStorage.getItem('Ruta');

            setCurrentMView('');
            sessionStorage.setItem('Vista del Modal','');
            setTimeout(() => {
                setIsModal(false);
                sessionStorage.setItem('Estado del Modal',false);
                setIsActionBlock(false);
                setIsSelectedRow(null);
                sessionStorage.removeItem('Acción del Bloqueo');
                sessionStorage.removeItem('Verificación del Bloqueo');
                setIsVerificationBlock(false);
                navigate(route,{ replace: true });
            },750);
        }
    },[isPermissionsEnable,isLogAdd]);
    // Estructura del componente
    return(
        <>
            {isModal && isSelectedRow !== null ? (
                <>
                    <Container_Modal ref={Modal_Permissions}>
                        <Container_Form_450 ref={Form_Permissions} ThemeMode={themeMode} className={currentMView === 'Permiso-Super-Administrador' ? 'slide-in-container-top' : 'slide-out-container-top'}>
                            <Text_Title_30_Center ThemeMode={themeMode}>{isTextFieldsPermissions.superadministrador ? 'DESHABILITAR SUPER ADMINISTRADOR':'HABILITAR SUPER ADMINISTRADOR'}</Text_Title_30_Center>
                            <Form_Verification/>
                            <Container_Row_NG_90_Center>
                                <Text_Blue_16_Left ThemeMode={themeMode}>Usuario:</Text_Blue_16_Left>
                                <Text_P_16_Left ThemeMode={themeMode}> {isTextFieldsPermissions.usuario}</Text_P_16_Left>
                            </Container_Row_NG_90_Center>
                            <Container_Row_90_Center>
                                <Tooltip title='Cancelar' placement="top">
                                    <span>
                                        <Button_Icon_Blue_180 ThemeMode={themeMode} className='pulsate-buttom'
                                            onClick={() => handleModalView('')}
                                            disabled={!isActionBlock && isVerificationBlock}
                                        >
                                            <Icon_White_22><MdCancel/></Icon_White_22>
                                        </Button_Icon_Blue_180>
                                    </span>
                                </Tooltip>
                                {isSelectedRow.superadministrador ? (
                                    <>
                                        <Tooltip title='Deshabilitar' placement="top">
                                            <span>
                                                <Button_Icon_Red_180 ThemeMode={themeMode} className={isActionBlock ? 'roll-in-button-left' : 'roll-out-button-left'}
                                                    onClick={() => handlePermissionsEnable()}
                                                    disabled={!isActionBlock}    
                                                >
                                                    <Icon_White_22><FaUserTie/></Icon_White_22>
                                                </Button_Icon_Red_180>
                                            </span>
                                        </Tooltip>
                                    </>
                                ):(
                                    <>
                                        <Tooltip title='Habilitar' placement="top">
                                            <span>
                                                <Button_Icon_Green_180 ThemeMode={themeMode} className={isActionBlock ? 'roll-in-button-left' : 'roll-out-button-left'}
                                                    onClick={() => handlePermissionsEnable()}
                                                    disabled={!isActionBlock} 
                                                >
                                                    <Icon_White_22><FaUserTie/></Icon_White_22>
                                                </Button_Icon_Green_180>
                                            </span>
                                        </Tooltip>
                                    </>
                                )}
                            </Container_Row_90_Center>
                        </Container_Form_450>
                    </Container_Modal>  
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