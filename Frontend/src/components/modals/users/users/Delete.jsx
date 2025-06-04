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
import { ActionBlockContext,VerificationBlockContext } from "../../../../contexts/VariablesProvider";
import { SelectedRowContext } from "../../../../contexts/SelectedesProvider";
import { RefUsersContext } from '../../../../contexts/RefsProvider';
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
import { Container_Modal,Container_Form_500,Container_Row_100_Center,Container_Row_95_Center,Container_Row_NG_95_Left } from "../../../styled/Containers";
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
    const {Modal,Form,Button_Edit_U,Button_Delete_U} = useContext(RefUsersContext);
    const [isUserDelete,setIsUserDelete] = useContext(UserDeleteContext);
    const [isVerificationBlock,setIsVerificationBlock] = useContext(VerificationBlockContext);
    // Constantes con la funcionalidad de los hooks
    const navigate = useNavigate();
    const handleModalView = HandleModalView();
    const handleUserDelete = HandleUserDelete();
    // UseEffect para editar datos a la base de datos
    useEffect(() => {
        if(isUserDelete){
            const promise = new Promise((resolve,reject) => {
                try{
                    setTimeout(() => {
                        socket.emit('User-Delete-Insert',isTextFieldsUser.iduser,isSelectedRow.usuario)

                        resolve('¡MEALSYNC elimino al usuario!...');

                        const route = sessionStorage.getItem('Route');

                        setCurrentMView('');
                        sessionStorage.setItem('Modal-View','');
                        setTimeout(() => {
                            setIsModal(false);
                            sessionStorage.setItem('Modal',false);
                            sessionStorage.removeItem('Action-Block');
                            sessionStorage.removeItem('Verification-Block');
                            setIsVerificationBlock(false);
                            setIsActionBlock(false);
                            setIsUserDelete(false)
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

            Alert_Verification(promise,'Eliminando un usuario!...');
        }
    },[isUserDelete])
    // UseEffect para resetiar campos para el registro de verificación
    useEffect(() => {
        setIsTextFieldsUser((prev) => ({
            ...prev,
            user: '',
            password: '',
        }))
    },[])
    // UseEffect para quitar la suscrpcion de socket
    useEffect(() => {
        const handleUserDeleteInsert = (message,user) => {
            console.log(message,user);
            socket.emit('Delete-Users');
        };

        socket.on('User-Delete-Insert',handleUserDeleteInsert);
        
        return () => {
            socket.off('User-Delete-Insert',handleUserDeleteInsert);
        }
    },[socket])
    // Estructura del componente
    return(
        <>
            {isModal && isSelectedRow !== null ? (
                <>
                    <Container_Modal ref={Modal}>
                        <Container_Form_500 ref={Form} ThemeMode={themeMode} className={currentMView === 'User-Delete' ? 'slide-in-container-top' : 'slide-out-container-top'}>
                            <Container_Row_100_Center>
                                <Text_Title_30_Center ThemeMode={themeMode}>ELIMINAR USUARIO</Text_Title_30_Center>
                            </Container_Row_100_Center>
                            <Form_Verification/>
                            <Container_Row_NG_95_Left>
                                <Text_Blue_16_Left ThemeMode={themeMode}>MEALSYNC</Text_Blue_16_Left>
                                <Text_A_16_Left ThemeMode={themeMode}>- Usuario: {isUsers.find(user => user.idusuario === isTextFieldsUser.iduser)?.usuario || 'Desconocido'}</Text_A_16_Left>
                            </Container_Row_NG_95_Left>
                            <Container_Row_95_Center>
                                <Tooltip title='Cancelar' placement='top'>
                                    <Button_Icon_Blue_210 ThemeMode={themeMode} className='pulsate-buttom'
                                        onClick={() => handleModalView('')}
                                        disabled={!isActionBlock && isVerificationBlock}  
                                    >
                                        <Icon_White_22><MdCancel/></Icon_White_22>
                                    </Button_Icon_Blue_210>
                                </Tooltip>
                                <Tooltip title='Eliminar' placement='top'>
                                    <Button_Icon_Red_210 ThemeMode={themeMode} className={!isActionBlock ? 'roll-out-button-left' : 'roll-in-button-left'}
                                        onClick={() => handleUserDelete()}
                                        disabled={!isActionBlock}    
                                    >
                                        <Icon_White_22><MdDelete/></Icon_White_22>
                                    </Button_Icon_Red_210>
                                </Tooltip>
                            </Container_Row_95_Center>
                        </Container_Form_500>
                    </Container_Modal>
                </>
            ):(
                currentMView === 'User-Delete' ? (
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