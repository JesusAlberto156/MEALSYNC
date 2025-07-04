//____________IMPORT/EXPORT____________
// Hooks de React
import { useContext,useEffect } from "react";
import { useNavigate } from "react-router-dom";
// Componentes de React externos
import { Tooltip } from "@mui/material";
// Contextos
import { ThemeModeContext,ModalContext,ModalViewContext } from "../../../../contexts/ViewsProvider";
import { ActionBlockContext,VerificationBlockContext,KeyboardContext,KeyboardViewContext } from "../../../../contexts/VariablesProvider";
import { SelectedRowContext } from "../../../../contexts/SelectedesProvider";
import { StatusEnableContext } from "../../../../contexts/UsersProvider";
import { SocketContext } from "../../../../contexts/SocketProvider";
import { RefStatusContext } from "../../../../contexts/RefsProvider";
import { TextFieldsStatusContext,TextFieldsUserContext } from "../../../../contexts/FormsProvider";
import { LoggedUserContext } from "../../../../contexts/SessionProvider";
// Hooks personalizados
import { HandleStatusEnable } from "../../../../hooks/users/Forms";
import { HandleModalViewUsers } from "../../../../hooks/users/Views";
//__________ICONOS__________
import { MdCancel } from "react-icons/md";
// Icono para realizar la función del modal
import { FaLock } from "react-icons/fa";
import { FaLockOpen } from "react-icons/fa";
//__________ICONOS__________
// Estilos personalizados
import { Container_Modal,Container_Form_450,Container_Row_95_Center, Container_Row_NG_90_Center } from "../../../styled/Containers";
import { Text_Title_32_Black,Text_Span_16_Center_Black,Text_Color_Blue_12,Text_Span_12_Justify_Black } from "../../../styled/Text";
import { Button_Icon_Blue_180,Button_Icon_Green_180,Button_Icon_Red_180 } from "../../../styled/Buttons";
import { Icon_White_22 } from "../../../styled/Icons";
import { Alert_Verification } from "../../../styled/Alerts";
// Componentes personalizados
import Form_Verification from "../../../forms/Verification";
import Error_Enable from "../../errors/Enable";
import Virtual_Keyboard from "../../../forms/Keyboard";
//____________IMPORT/EXPORT____________

// Modal para habilitar/deshabilitar usuarios
export default function Status_Enable(){
    // Constantes con el valor de los contextos
    const [themeMode] = useContext(ThemeModeContext);
    const [isSelectedRow,setIsSelectedRow] = useContext(SelectedRowContext);
    const [isActionBlock,setIsActionBlock] = useContext(ActionBlockContext);
    const [currentMView,setCurrentMView] = useContext(ModalViewContext);
    const [isModal,setIsModal] = useContext(ModalContext);
    const [isVerificationBlock,setIsVerificationBlock] = useContext(VerificationBlockContext);
    const [socket] = useContext(SocketContext);
    const [isStatusEnable,setIsStatusEnable] = useContext(StatusEnableContext);
    const {Modal_Status,Form_Status,Button_Enable_Status} = useContext(RefStatusContext);
    const [isTextFieldsStatus] = useContext(TextFieldsStatusContext);
    const [isLoggedUser] = useContext(LoggedUserContext);
    const [isKeyboard] = useContext(KeyboardContext);
    const [isKeyboardView] = useContext(KeyboardViewContext);
    const [isTextFieldsUser,setIsTextFieldsUser] = useContext(TextFieldsUserContext);
    // Constantes con la funcionalidad de los hooks
    const navigate = useNavigate();
    const handleModalViewUsers = HandleModalViewUsers();
    const handleStatusEnable = HandleStatusEnable();
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
        if(isStatusEnable){
            const promise = new Promise((resolve,reject) => {
                try{ 
                    setIsActionBlock(false); 
                    setTimeout(() => {
                        socket.emit('Update-Status-Enable',isLoggedUser.idusuario,isTextFieldsStatus.idestatus,isTextFieldsStatus.estatus === 'Habilitado' ? 0:1,isTextFieldsStatus.idusuario);

                        if(isTextFieldsStatus.estatus === 'Habilitado'){
                            resolve('¡MEALSYNC deshabilita al usuario!...');
                        }else{
                            resolve('¡MEALSYNC habilita al usuario!...');
                        }

                        setIsStatusEnable(false);

                        const route = sessionStorage.getItem('Ruta');

                        setCurrentMView('');
                        sessionStorage.setItem('Vista del Modal','');
                        setTimeout(() => {
                            setIsModal(false);
                            sessionStorage.setItem('Estado del Modal',false);
                            setIsActionBlock(false);
                            setIsVerificationBlock(false);
                            sessionStorage.removeItem('Acción del Bloqueo');
                            sessionStorage.removeItem('Verificación del Bloqueo');
                            setIsSelectedRow(null);
                            navigate(route,{ replace: true });
                        },750);
                    },2000);
                }catch(e){
                    setIsActionBlock(true);
                    setIsStatusEnable(false);
                    return reject('¡Ocurrio un error inesperado!...');
                }
            });

            Alert_Verification(promise,isTextFieldsStatus.estatus === 'Habilitado' ? '¡Deshabilitando usuario!...' : '¡Habilitando usuario!...');
        }
    },[isStatusEnable]);
    // Estructura del componente
    return(
        <>
            {isModal && isSelectedRow !== null ? (
                <Container_Modal ref={Modal_Status}>
                    <Container_Form_450 ref={Form_Status} ThemeMode={themeMode} className={currentMView === 'Estatus-Habilitar' ? 'slide-in-container-top' : 'slide-out-container-top'}>
                        <Text_Title_32_Black ThemeMode={themeMode}>{isTextFieldsStatus.estatus === 'Habilitado' ? 'DESHABILITAR USUARIO' : 'HABILITAR USUARIO'}</Text_Title_32_Black>
                        <Form_Verification/>
                        <Container_Row_NG_90_Center>
                            <Text_Color_Blue_12 ThemeMode={themeMode}>Usuario:</Text_Color_Blue_12>
                            <Text_Span_16_Center_Black ThemeMode={themeMode}> {isTextFieldsStatus.usuario}</Text_Span_16_Center_Black>
                        </Container_Row_NG_90_Center>
                        {isTextFieldsStatus.estatus === 'Habilitado' ? (
                            <>
                                <Container_Row_95_Center>
                                    <Text_Span_12_Justify_Black ThemeMode={themeMode}>Al deshabilitar al usuario, se forzará el cierre inmediato de la sesión del usuario si se encuentra activo.</Text_Span_12_Justify_Black>
                                </Container_Row_95_Center>  
                            </>
                        ):(
                            <></>
                        )}
                        <Container_Row_95_Center>
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
                            {isTextFieldsStatus.estatus === 'Habilitado' ? (
                                <>
                                    <Tooltip title='Deshabilitar' placement="top">
                                        <span>
                                            <Button_Icon_Red_180 ThemeMode={themeMode} className={isActionBlock ? 'roll-in-button-left' : 'roll-out-button-left'}
                                                onClick={() => handleStatusEnable()}
                                                disabled={!isActionBlock}    
                                            >
                                                <Icon_White_22><FaLock/></Icon_White_22>
                                            </Button_Icon_Red_180>
                                        </span>
                                    </Tooltip>
                                </>
                            ):(
                                <>
                                    <Tooltip title='Habilitar' placement="top">
                                        <span>
                                            <Button_Icon_Green_180 ThemeMode={themeMode} className={isActionBlock ? 'roll-in-button-left' : 'roll-out-button-left'}
                                                onClick={() => handleStatusEnable()}
                                                disabled={!isActionBlock}    
                                            >
                                                <Icon_White_22><FaLockOpen/></Icon_White_22>
                                            </Button_Icon_Green_180>
                                        </span>
                                    </Tooltip>
                                </>
                            )}
                        </Container_Row_95_Center>
                    </Container_Form_450>
                    {isKeyboard ? (
                        <>
                            <Virtual_Keyboard value={isKeyboardView === 'User' ? isTextFieldsUser.usuario : isTextFieldsUser.contrasena} onChange={handleKeyboard}/>  
                        </>
                    ):(
                        <></>
                    )}
                </Container_Modal>
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