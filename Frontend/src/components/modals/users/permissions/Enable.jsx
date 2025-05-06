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
import { TextFieldsContext } from "../../../../contexts/FormsProvider";
// Hooks personalizados
import { HandleModalView } from "../../../../hooks/Views";
import { HandlePermissionsEnable } from "../../../../hooks/Form";
//__________ICONOS__________
// Icono para cerrar el modal
import { MdCancel } from "react-icons/md";
// Icono para realizar la función del modal
import { MdAdminPanelSettings } from "react-icons/md";
//__________ICONOS__________
// Estilos personalizados
import { Container_Modal,Container_Form_400,Container_Row_90_Left,Container_Row_90_Center } from "../../../styled/Containers";
import { Text_P_16_Left,Text_Title_30_Center } from "../../../styled/Text";
import { Button_Icon_Blue_160,Button_Icon_Red_160,Button_Icon_Green_160 } from "../../../styled/Buttons";
import { Icon_White_22 } from "../../../styled/Icons";
import { Alert_Verification } from "../../../styled/Alerts";
// Componentes personalizados
import Form_Verification from '../../../forms/Verification';
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
    const [isTextFields,setIsTextFields] = useContext(TextFieldsContext);
    // Constantes con el valor de useState
    const [user,setUser] = useState('');
    // Estados iniciales de los contextos
    const initialTextFields = {
        name: '',
        shortName: '',
        user: '',
        password: '',
        userTypes: 0,
    };
    // useEffect con el usuario
    useEffect(() => {
        if(isSelectedRow !== null){
            const isUser = isUsers.find(u => u.idusuario === isSelectedRow.idusuario);
            if(isUser){
                setUser(isUser.usuario);
            }
        }
    },[]);
    // Constantes con la funcionalidad de los hooks
    const navigate = useNavigate();
    const handleModalView = HandleModalView();
    const handlePermissionsEnable = HandlePermissionsEnable();
    // UseEffect para editar datos a la base de datos
    useEffect(() => {
        if(isPermissionsEnable.length !== 0){
            const user = isUsers.find(user => user.idusuario === isPermissionsEnable.idusuario);
            if(user){
                const promise = new Promise(async (resolve,reject) => {
                    try{
                        setTimeout(() => {
                            socket.emit('Permission-Update',isPermissionsEnable.idusuario,user.usuario,isPermissionsEnable.superadministrador ? 0:1);
                            
                            socket.on('Permission-Update',(message,user) => {
                                console.log(message,user);
                                socket.emit('Permissions');
                            });

                            if(isPermissionsEnable.superadministrador){
                                resolve('¡MEALSYNC deshabilito el super administrador al usuario!...');
                            }else{
                                resolve('¡MEALSYNC Habilito el super administrador al usuario!...');
                            }
                            
                            setCurrentMView('');
                            sessionStorage.setItem('Modal-View','');
                            setTimeout(() => {
                                setIsModal(false);
                                sessionStorage.setItem('Modal',false);
                                setIsActionBlock(false);
                                setIsPermissionsEnable([]);
                                setIsSelectedRow(null);
                                setIsTextFields(initialTextFields);
                                sessionStorage.removeItem('Action-Block');
                                sessionStorage.removeItem('Verification-Block');
                                setIsVerificationBlock(false);
                                navigate('/Administration/Users/Permissions',{ replace: true });
                            },750);

                            return () => {
                                socket.off('Permission-Update');
                            }
                        },2000);
                    }catch(error){
                        setIsActionBlock(true);
                        setIsPermissionsEnable([]);
                        return reject('¡Ocurrio un error inesperado!...');
                    }
                }); 
                
                Alert_Verification(promise,isPermissionsEnable.superadministrador ? '¡Deshabilitando el super administrador a un usuario!...' : '¡Habilitando el super administrador a un usuario!...');
            }
        }
    },[isPermissionsEnable]);
    // Estructura del componente
    return(
        <>
            {isModal && isSelectedRow !== null ? (
                <>
                    <Container_Modal ref={Modal}>
                        <Container_Form_400 ref={Form} ThemeMode={themeMode} className={currentMView === 'Permissions-Enable' ? 'slide-in-container-top' : 'slide-out-container-top'}>
                            <Text_Title_30_Center ThemeMode={themeMode}>{isSelectedRow.superadministrador ? 'DESHABILITAR SUPER ADMINISTRADOR':'HABILITAR SUPER ADMINISTRADOR'}</Text_Title_30_Center>
                            <Container_Row_90_Left>
                                {isSelectedRow.superadministrador ? <Text_P_16_Left ThemeMode={themeMode}>Se deshabilitará a {user}</Text_P_16_Left>:<Text_P_16_Left ThemeMode={themeMode}>Se habilitará a {user}</Text_P_16_Left>}
                            </Container_Row_90_Left>
                            <Form_Verification/>
                            <Container_Row_90_Center className={themeMode ? 'shadow-out-container-light-infinite' : 'shadow-out-container-dark-infinite'}>
                                <Tooltip title='Cancelar' placement="top">
                                    <Button_Icon_Blue_160 ThemeMode={themeMode} className='pulsate-buttom'
                                        onClick={() => handleModalView('')}>
                                        <Icon_White_22><MdCancel/></Icon_White_22>
                                    </Button_Icon_Blue_160>
                                </Tooltip>
                                {isSelectedRow.superadministrador ? (
                                    <>
                                        <Tooltip title='Deshabilitar' placement="top">
                                            <Button_Icon_Red_160 ThemeMode={themeMode} className={isActionBlock ? 'roll-in-button-left' : 'roll-out-button-left'}
                                                onClick={() => handlePermissionsEnable()}>
                                                <Icon_White_22><MdAdminPanelSettings/></Icon_White_22>
                                            </Button_Icon_Red_160>
                                        </Tooltip>
                                    </>
                                ):(
                                    <>
                                        <Tooltip title='Habilitar' placement="top">
                                            <Button_Icon_Green_160 ThemeMode={themeMode} className={isActionBlock ? 'roll-in-button-left' : 'roll-out-button-left'}
                                                onClick={() => handlePermissionsEnable()}>
                                                <Icon_White_22><MdAdminPanelSettings/></Icon_White_22>
                                            </Button_Icon_Green_160>
                                        </Tooltip>
                                    </>
                                )}
                            </Container_Row_90_Center>
                        </Container_Form_400>
                    </Container_Modal>  
                </>
            ):(
                <></>
            )}
        </>
    );
}