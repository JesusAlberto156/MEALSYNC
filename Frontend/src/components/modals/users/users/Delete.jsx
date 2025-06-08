//____________IMPORT/EXPORT____________
// Hooks de React
import { useContext,useEffect,useRef } from "react";
import { useNavigate } from "react-router-dom";
// Componentes de React externos
import { Tooltip } from "@mui/material";
// Contextos
import { SocketContext,LogAddContext } from "../../../../contexts/SocketProvider";
import { ModalContext,ThemeModeContext,ModalViewContext } from "../../../../contexts/ViewsProvider";
import { TextFieldsUserContext } from "../../../../contexts/FormsProvider";
import { UserDeleteContext,UsersContext,DeletedUsersContext } from "../../../../contexts/UsersProvider";
import { ActionBlockContext,VerificationBlockContext } from "../../../../contexts/VariablesProvider";
import { SelectedRowContext } from "../../../../contexts/SelectedesProvider";
import { RefUsersContext } from '../../../../contexts/RefsProvider';
import { LoggedUserContext } from "../../../../contexts/SessionProvider";
// Hooks personalizados
import { HandleModalView } from "../../../../hooks/Views";
import { HandleUserDelete } from "../../../../hooks/Form";
//__________ICONOS__________
// Icono para cerrar el modal
import { MdCancel } from "react-icons/md";
// Icono para realizar la función del modal
import { MdDelete } from "react-icons/md";
//__________ICONOS__________
// Estilos personalizados
import { Container_Modal,Container_Form_500,Container_Row_100_Center,Container_Row_95_Center,Container_Row_NG_95_Center } from "../../../styled/Containers";
import { Text_Title_30_Center,Text_A_16_Left,Text_Blue_16_Left } from "../../../styled/Text";
import { Button_Icon_Blue_210,Button_Icon_Red_210 } from "../../../styled/Buttons";
import { Icon_White_22 } from "../../../styled/Icons";
import { Alert_Verification } from "../../../styled/Alerts";
// Componentes personalizados
import Error_Delete from "../../errors/Delete";
import Form_Verification from "../../../forms/Verification";
//____________IMPORT/EXPORT____________

// Modal para editar los usuarios de la tabla
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
    const [isDeletedUsers] = useContext(DeletedUsersContext);
    const [isLogAdd,setIsLogAdd] = useContext(LogAddContext);
    // Constantes con los valores de useRef
    const User = useRef(false);
    // Constantes con la funcionalidad de los hooks
    const navigate = useNavigate();
    const handleModalView = HandleModalView();
    const handleUserDelete = HandleUserDelete();
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
        if(isUserDelete){
            const promise = new Promise((resolve,reject) => {
                try{
                    setTimeout(() => {
                        socket.emit('Insert-Deleted-User',isLoggedUser.usuario,isTextFieldsUser.usuario,isTextFieldsUser.idusuario)

                        resolve('¡MEALSYNC eliminó al usuario!...');

                        setIsUserDelete(false);
                    },2000);
                }catch(e){
                    setIsActionBlock(true);
                    setIsUserDelete(false);
                    return reject('¡Ocurrio un error inesperado!...');
                }
            });

            Alert_Verification(promise,'Eliminando un usuario!...');
        }
        if(isDeletedUsers.some(user => user.idusuario === isTextFieldsUser.idusuario)){
            setIsTextFieldsUser(prev => ({
                ...prev,
                ideliminado: isDeletedUsers.find(user => user.idusuario === isTextFieldsUser.idusuario)?.ideliminado
            }));
            setIsLogAdd(true);
        }
        if(isLogAdd && isTextFieldsUser.ideliminado !== 0 && !User.current){
            User.current = true;
            socket.emit('Insert-Log-Deleted-User',isLoggedUser.usuario,getLocalDateTimeOffset(),'INSERT',isTextFieldsUser.ideliminado,isLoggedUser.idusuario,String(isTextFieldsUser.idusuario));
            setIsLogAdd(false);

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
        }
    },[isUserDelete,isDeletedUsers,isTextFieldsUser.ideliminado]);
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
                    <Container_Modal ref={Modal_Users}>
                        <Container_Form_500 ref={Form_Users} ThemeMode={themeMode} className={currentMView === 'Usuario-Eliminar' ? 'slide-in-container-top' : 'slide-out-container-top'}>
                            <Container_Row_100_Center>
                                <Text_Title_30_Center ThemeMode={themeMode}>ELIMINAR USUARIO</Text_Title_30_Center>
                            </Container_Row_100_Center>
                            <Form_Verification/>
                            <Container_Row_NG_95_Center>
                                <Text_Blue_16_Left ThemeMode={themeMode}>Usuario:</Text_Blue_16_Left>
                                <Text_A_16_Left ThemeMode={themeMode}> {isUsers.find(user => user.idusuario === isTextFieldsUser.idusuario)?.usuario || 'Desconocido'}</Text_A_16_Left>
                            </Container_Row_NG_95_Center>
                            <Container_Row_95_Center>
                                <Tooltip title='Cancelar' placement='top'>
                                    <span>
                                        <Button_Icon_Blue_210 ThemeMode={themeMode} className='pulsate-buttom'
                                            onClick={() => handleModalView('')}
                                            disabled={!isActionBlock && isVerificationBlock}  
                                        >
                                            <Icon_White_22><MdCancel/></Icon_White_22>
                                        </Button_Icon_Blue_210>
                                    </span>
                                </Tooltip>
                                <Tooltip title='Eliminar' placement='top'>
                                    <span>
                                        <Button_Icon_Red_210 ThemeMode={themeMode} className={!isActionBlock ? 'roll-out-button-left' : 'roll-in-button-left'}
                                            onClick={() => handleUserDelete()}
                                            disabled={!isActionBlock}    
                                        >
                                            <Icon_White_22><MdDelete/></Icon_White_22>
                                        </Button_Icon_Red_210>
                                    </span>
                                </Tooltip>
                            </Container_Row_95_Center>
                        </Container_Form_500>
                    </Container_Modal>
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