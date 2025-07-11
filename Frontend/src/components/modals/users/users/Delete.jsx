//____________IMPORT/EXPORT____________
// Hooks de React
import { useContext,useEffect } from "react";
import { useNavigate } from "react-router-dom";
// Componentes de React externos
import { Tooltip } from "@mui/material";
// Contextos
import { SocketContext } from "../../../../contexts/SocketProvider";
import { ModalContext,ThemeModeContext,ModalViewContext } from "../../../../contexts/ViewsProvider";
import { TextFieldsUserContext } from "../../../../contexts/FormsProvider";
import { UserDeleteContext,UsersContext } from "../../../../contexts/UsersProvider";
import { ActionBlockContext,VerificationBlockContext,KeyboardContext,KeyboardViewContext } from "../../../../contexts/VariablesProvider";
import { SelectedRowContext } from "../../../../contexts/SelectedesProvider";
import { RefUsersContext } from '../../../../contexts/RefsProvider';
import { LoggedUserContext } from "../../../../contexts/SessionProvider";
// Hooks personalizados
import { HandleModalViewUsers } from "../../../../hooks/users/Views";
import { HandleUserDelete } from "../../../../hooks/users/Forms";
//__________ICONOS__________
// Icono para cerrar el modal
import { MdCancel } from "react-icons/md";
// Icono para realizar la función del modal
import { MdDelete } from "react-icons/md";
//__________ICONOS__________
// Estilos personalizados
import { Container_Modal_Background_Black,Container_Form_500,Container_Row_100_Center,Container_Row_NG_Auto_Center } from "../../../styled/Containers";
import { Text_Title_32_Black,Text_Span_16_Center_Black,Text_Color_Blue_16,Text_Span_12_Justify_Black } from "../../../styled/Text";
import { Button_Icon_Blue_210,Button_Icon_Red_210 } from "../../../styled/Buttons";
import { Icon_20 } from "../../../styled/Icons";
import { Alert_Sonner_Promise } from "../../../styled/Alerts";
// Componentes personalizados
import Error_Delete from "../../errors/Delete";
import Form_Verification from "../../../forms/Verification";
import Virtual_Keyboard from "../../../forms/Keyboard";
//____________IMPORT/EXPORT____________

// Modal para eliminar los usuarios de la tabla
export default function User_Delete(){
    // Constantes con el valor de los contextos
    const [themeMode] = useContext(ThemeModeContext);
    const [isUsers] = useContext(UsersContext);
    const [isModal,setIsModal] = useContext(ModalContext);
    const [currentMView,setCurrentMView] = useContext(ModalViewContext);
    const [isTextFieldsUser,setIsTextFieldsUser] = useContext(TextFieldsUserContext);
    const [isActionBlock,setIsActionBlock] = useContext(ActionBlockContext);
    const [socket] = useContext(SocketContext);
    const [isSelectedRow,setIsSelectedRow] = useContext(SelectedRowContext);
    const {Modal_Users,Form_Users,Button_Edit_Users,Button_Delete_Users} = useContext(RefUsersContext);
    const [isUserDelete,setIsUserDelete] = useContext(UserDeleteContext);
    const [isVerificationBlock,setIsVerificationBlock] = useContext(VerificationBlockContext);
    const [isLoggedUser] = useContext(LoggedUserContext);
    const [isKeyboard] = useContext(KeyboardContext);
    const [isKeyboardView] = useContext(KeyboardViewContext);
    // Constantes con la funcionalidad de los hooks
    const navigate = useNavigate();
    const handleModalViewUsers = HandleModalViewUsers();
    const handleUserDelete = HandleUserDelete();
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
    // UseEffect para eliminar datos a la base de datos
    useEffect(() => {
        if(isUserDelete){
            const promise = new Promise((resolve,reject) => {
                try{
                    setTimeout(() => {
                        socket.emit('Insert-Deleted-User',isLoggedUser.idusuario,isTextFieldsUser.idusuario)

                        resolve('¡MEALSYNC eliminó al usuario!...');

                        setIsUserDelete(false);

                        const route = sessionStorage.getItem('Ruta');

                        setCurrentMView('');
                        sessionStorage.setItem('Vista del Modal','');
                        setTimeout(() => {
                            setIsModal(false);
                            sessionStorage.setItem('Estado del Modal',false);
                            sessionStorage.removeItem('Acción del Bloqueo');
                            sessionStorage.removeItem('Verificación del Bloqueo');
                            setIsVerificationBlock(false);
                            setIsActionBlock(false);
                            setIsSelectedRow(null);
                            navigate(route,{ replace: true });
                        },750);
                    },2000);
                }catch(e){
                    setIsActionBlock(true);
                    setIsUserDelete(false);
                    return reject('¡Ocurrio un error inesperado!...');
                }
            });

            Alert_Sonner_Promise(promise,'Eliminando un usuario!...');
        }
    },[isUserDelete]);
    // UseEffect para resetiar campos para el registro de verificación
    useEffect(() => {
        setIsTextFieldsUser((prev) => ({
            ...prev,
            usuario: '',
            contrasena: '',
        }))
    },[]);
    // Estructura del componente
    return(
        <>
            {isModal && isSelectedRow !== null ? (
                <>
                    <Container_Modal_Background_Black ref={Modal_Users}>
                        <Container_Form_500 ref={Form_Users} ThemeMode={themeMode} className={currentMView === 'Usuario-Eliminar' ? 'slide-in-container-top' : 'slide-out-container-top'}>
                            <Container_Row_100_Center>
                                <Text_Title_32_Black ThemeMode={themeMode}>ELIMINAR USUARIO</Text_Title_32_Black>
                            </Container_Row_100_Center>
                            <Form_Verification/>
                            <Container_Row_NG_Auto_Center>
                                <Text_Color_Blue_16 ThemeMode={themeMode}>Usuario:</Text_Color_Blue_16>
                                <Text_Span_16_Center_Black ThemeMode={themeMode}> {isUsers.find(user => user.idusuario === isTextFieldsUser.idusuario)?.usuario || 'Desconocido'}</Text_Span_16_Center_Black>
                            </Container_Row_NG_Auto_Center>
                            <Container_Row_100_Center>
                                <Text_Span_12_Justify_Black ThemeMode={themeMode}>Al eliminar al usuario, su sesión se cerrará de forma inmediata si se encuentra activo y no podrá volver a acceder al sistema.</Text_Span_12_Justify_Black>
                            </Container_Row_100_Center>
                            <Container_Row_100_Center>
                                <Tooltip title='Cancelar' placement='top'>
                                    <span>
                                        <Button_Icon_Blue_210 ThemeMode={themeMode} className='pulsate-buttom'
                                            onClick={() => handleModalViewUsers('')}
                                            disabled={!isActionBlock && isVerificationBlock}  
                                        >
                                            <Icon_20><MdCancel/></Icon_20>
                                        </Button_Icon_Blue_210>
                                    </span>
                                </Tooltip>
                                <Tooltip title='Eliminar' placement='top'>
                                    <span>
                                        <Button_Icon_Red_210 ThemeMode={themeMode} className={!isActionBlock ? 'roll-out-button-left' : 'roll-in-button-left'}
                                            onClick={() => handleUserDelete()}
                                            disabled={!isActionBlock}    
                                        >
                                            <Icon_20><MdDelete/></Icon_20>
                                        </Button_Icon_Red_210>
                                    </span>
                                </Tooltip>
                            </Container_Row_100_Center>
                        </Container_Form_500>
                        {isKeyboard ? (
                            <>
                                <Virtual_Keyboard value={isKeyboardView === 'User' ? isTextFieldsUser.usuario : isTextFieldsUser.contrasena} onChange={handleKeyboard}/>  
                            </>
                        ):(
                            <></>
                        )}
                    </Container_Modal_Background_Black>
                </>
            ):(
                currentMView === 'Usuario-Eliminar' ? (
                    <>
                        <Error_Delete/>
                    </>
                ):(
                    <></>
                )
            )}
        </>
    );
}