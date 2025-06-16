//____________IMPORT/EXPORT____________
// Hooks de React
import { useContext,useEffect } from "react";
import { useNavigate } from "react-router-dom";
// Componentes de React externos
import { Tooltip } from "@mui/material";
// Contextos
import { ThemeModeContext,ModalContext,ModalViewContext } from "../../../../contexts/ViewsProvider";
import { PermissionsEnableContext } from "../../../../contexts/UsersProvider";
import { ActionBlockContext,VerificationBlockContext,KeyboardContext,KeyboardViewContext } from "../../../../contexts/VariablesProvider";
import { SelectedRowContext } from "../../../../contexts/SelectedesProvider";
import { RefPermissionsContext } from "../../../../contexts/RefsProvider";
import { SocketContext } from "../../../../contexts/SocketProvider";
import { TextFieldsPermissionsContext,TextFieldsUserContext } from "../../../../contexts/FormsProvider";
import { LoggedUserContext } from "../../../../contexts/SessionProvider";
import { UsersContext } from "../../../../contexts/UsersProvider";
// Hooks personalizados
import { HandleModalViewUsers } from "../../../../hooks/users/Views";
import { HandlePermissionsEnable } from "../../../../hooks/users/Forms";
//__________ICONOS__________
// Icono para cerrar el modal
import { MdCancel } from "react-icons/md";
// Icono para realizar la función del modal
import { FaUserTie } from "react-icons/fa6";
//__________ICONOS__________
// Estilos personalizados
import { Container_Modal,Container_Form_450,Container_Row_90_Center,Container_Row_NG_90_Center,Container_Row_95_Center } from "../../../styled/Containers";
import { Text_P_16_Left,Text_Title_30_Center,Text_Blue_16_Left,Text_A_12_Justify } from "../../../styled/Text";
import { Button_Icon_Blue_180,Button_Icon_Red_180,Button_Icon_Green_180 } from "../../../styled/Buttons";
import { Icon_White_22 } from "../../../styled/Icons";
import { Alert_Verification } from "../../../styled/Alerts";
// Componentes personalizados
import Form_Verification from '../../../forms/Verification';
import Error_Enable from "../../errors/Enable";
import Virtual_Keyboard from "../../../forms/Keyboard";
//____________IMPORT/EXPORT____________

// Modal para habilitar/deshabilitar el permiso de super administrador a los usuarios
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
    const [isUsers] = useContext(UsersContext);
    const [isKeyboard] = useContext(KeyboardContext);
    const [isKeyboardView] = useContext(KeyboardViewContext);
    const [isTextFieldsUser,setIsTextFieldsUser] = useContext(TextFieldsUserContext);
    // Constantes con la funcionalidad de los hooks
    const navigate = useNavigate();
    const handleModalViewUsers = HandleModalViewUsers();
    const handlePermissionsEnable = HandlePermissionsEnable();
    // useEffect para escribir en los campos del login
    const handleKeyboard = (newValue) => {
        if(isKeyboardView === 'User' ){
            setIsTextFieldsUser(prev => ({
                ...prev,
                usuario: newValue, 
            }));
        }else{
            setIsTextFieldsUser(prev => ({
                ...prev,
                contrasena: newValue,
            }));
        }
    };
    // UseEffect para editar datos a la base de datos
    useEffect(() => {
        if(isPermissionsEnable){
            const promise = new Promise((resolve,reject) => {
                try{
                    setTimeout(() => {
                        socket.emit('Update-Permission',isUsers.find(user => user.idusuario === isTextFieldsPermissions.idusuario)?.usuario,isLoggedUser.idusuario,isTextFieldsPermissions.idpermiso,isTextFieldsPermissions.superadministrador ? 0:1,isTextFieldsPermissions.idusuario);

                        if(isTextFieldsPermissions.superadministrador){
                            resolve('¡MEALSYNC deshabilita el super administrador al usuario!...');
                        }else{
                            resolve('¡MEALSYNC habilita el super administrador al usuario!...');
                        }
                        
                        setIsPermissionsEnable(false);
                        
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
                    },2000);
                }catch(e){
                    setIsActionBlock(true);
                    setIsPermissionsEnable(false);
                    return reject('¡Ocurrio un error inesperado!...');
                }
            }); 
            
            Alert_Verification(promise,isTextFieldsPermissions.superadministrador ? '¡Deshabilitando el super administrador a un usuario!...' : '¡Habilitando el super administrador a un usuario!...');
        }
    },[isPermissionsEnable]);
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
                            <Container_Row_95_Center>
                                <Text_A_12_Justify ThemeMode={themeMode}>Al {isTextFieldsPermissions.superadministrador ? 'deshabilitar':'habilitar'} el rol de superadministrador, se forzará el cierre inmediato de la sesión del usuario si se encuentra activo.</Text_A_12_Justify>
                            </Container_Row_95_Center>
                            <Container_Row_90_Center>
                                <Tooltip title='Cancelar' placement="top">
                                    <span>
                                        <Button_Icon_Blue_180 ThemeMode={themeMode} className='pulsate-buttom'
                                            onClick={() => handleModalViewUsers('')}
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
                        {isKeyboard ? (
                            <>
                                <Virtual_Keyboard value={isKeyboardView === 'User' ? isTextFieldsUser.usuario : isTextFieldsUser.contrasena} onChange={handleKeyboard}/>  
                            </>
                        ):(
                            <></>
                        )}
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