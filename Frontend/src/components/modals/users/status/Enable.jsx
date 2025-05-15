//____________IMPORT/EXPORT____________
// Hooks de React
import { useContext,useEffect,useState } from "react";
import { useNavigate } from "react-router-dom";
// Componentes de React externos
import { Tooltip } from "@mui/material";
// Contextos
import { ThemeModeContext,ModalContext,ModalViewContext } from "../../../../contexts/ViewsProvider";
import { SelectedRowContext,ActionBlockContext,VerificationBlockContext } from "../../../../contexts/VariablesProvider";
import { UsersContext,StatusEnableContext } from "../../../../contexts/UsersProvider";
import { SocketContext } from "../../../../contexts/SocketProvider";
import { RefStatusContext } from "../../../../contexts/RefsProvider";
import { TextFieldsStatusContext } from "../../../../contexts/FormsProvider";
// Hooks personalizados
import { ResetTextFieldsUser } from "../../../../hooks/Texts";
import { HandleStatusEnable } from "../../../../hooks/Form";
import { HandleModalView } from "../../../../hooks/Views";
//__________ICONOS__________
import { MdCancel } from "react-icons/md";
import { FaLock } from "react-icons/fa";
import { FaLockOpen } from "react-icons/fa";
//__________ICONOS__________
// Estilos personalizados
import { Container_Modal,Container_Form_450,Container_Row_95_Center,Container_Row_NG_90_Left } from "../../../styled/Containers";
import { Text_Title_30_Center,Text_A_16_Left,Text_Blue_16_Left } from "../../../styled/Text";
import { Button_Icon_Blue_180,Button_Icon_Green_180,Button_Icon_Red_180 } from "../../../styled/Buttons";
import { Icon_White_22 } from "../../../styled/Icons";
import { Alert_Verification } from "../../../styled/Alerts";
// Componentes personalizados
import Form_Verification from "../../../forms/Verification";
import Error_Enable from "../../errors/Enable";
//____________IMPORT/EXPORT____________

export default function Status_Enable(){
    // Constantes con el valor de los contextos
    const [themeMode] = useContext(ThemeModeContext);
    const [isSelectedRow,setIsSelectedRow] = useContext(SelectedRowContext);
    const [isUsers] = useContext(UsersContext);
    const [isActionBlock,setIsActionBlock] = useContext(ActionBlockContext);
    const [currentMView,setCurrentMView] = useContext(ModalViewContext);
    const [isModal,setIsModal] = useContext(ModalContext);
    const [isVerificationBlock,setIsVerificationBlock] = useContext(VerificationBlockContext);
    const [socket] = useContext(SocketContext);
    const [isStatusEnable,setIsStatusEnable] = useContext(StatusEnableContext);
    const {Modal,Form,Button_Enable_S} = useContext(RefStatusContext);
    const [isTextFieldsStatus] = useContext(TextFieldsStatusContext);
    // Constantes con el valor de useState
    const [user,setUser] = useState('');
    // useEffect con el usuario
    useEffect(() => {
        if(isSelectedRow !== null){
            const isUser = isUsers.find(u => u.idusuario === isSelectedRow.idusuario);
            if(isUser){
                setUser(isUser);
            }
        }
    },[]);
    // Constantes con la funcionalidad de los hooks
    const navigate = useNavigate();
    const handleModalView = HandleModalView();
    const handleStatusEnable = HandleStatusEnable();
    const resetTextFieldsUser = ResetTextFieldsUser();
    // UseEffect para editar datos a la base de datos
    useEffect(() => {
        if(isStatusEnable.length !== 0){
            const promise = new Promise(async (resolve,reject) => {
                try{ 
                    setIsActionBlock(false); 
                    setTimeout(() => {
                        socket.emit('Status-Enable-Update',isTextFieldsStatus.iduser,isTextFieldsStatus.user,isTextFieldsStatus.status === 'Habilitado' ? 0:1);

                        socket.on('Status-Enable-Update',(message,user) => {
                            console.log(message,user);
                            socket.emit('Status');
                        });
                        
                        if(isStatusEnable.habilitado){
                            resolve('¡MEALSYNC deshabilito al usuario!...');
                        }else{
                            resolve('¡MEALSYNC habilito al usuario!...');
                        }

                        const route = sessionStorage.getItem('Route');

                        setCurrentMView('');
                        sessionStorage.setItem('Modal-View','');
                        setTimeout(() => {
                            setIsModal(false);
                            sessionStorage.setItem('Modal',false);
                            resetTextFieldsUser();
                            setIsActionBlock(false);
                            setIsVerificationBlock(false);
                            sessionStorage.removeItem('Action-Block');
                            sessionStorage.removeItem('Verification-Block');
                            setIsStatusEnable([]);
                            setIsSelectedRow(null);
                            navigate(route,{ replace: true });
                        },750);

                        return () => {
                            socket.off('Status-Enable-Update');
                        }
                    },2000);
                }catch(error){
                    setIsActionBlock(true);
                    setIsStatusEnable([]);
                    reject('¡Ocurrio un error inesperado!...');
                }
            });

            Alert_Verification(promise,isStatusEnable.habilitado ? '¡Deshabilitando usuario!...' : '¡Habilitando usuario!...');
        }
    },[isStatusEnable]);
    // Estructura del componente
    return(
        <>
            {isModal && isSelectedRow !== null ? (
                <Container_Modal ref={Modal}>
                    <Container_Form_450 ref={Form} ThemeMode={themeMode} className={currentMView === 'Status-Enable' ? 'slide-in-container-top' : 'slide-out-container-top'}>
                        <Text_Title_30_Center ThemeMode={themeMode}>{isSelectedRow.habilitado ? 'DESHABILITAR USUARIO' : 'HABILITAR USUARIO'}</Text_Title_30_Center>
                        <Container_Row_NG_90_Left className={themeMode ? 'shadow-out-container-light-infinite' : 'shadow-out-container-dark-infinite'}>
                            <Text_Blue_16_Left ThemeMode={themeMode}>MEALSYNC</Text_Blue_16_Left>
                            <Text_A_16_Left ThemeMode={themeMode}>- Usuario: {user.usuario}</Text_A_16_Left>
                        </Container_Row_NG_90_Left>
                        <Form_Verification/>
                        <Container_Row_95_Center>
                            <Tooltip title='Cancelar' placement="top">
                                <Button_Icon_Blue_180 ThemeMode={themeMode} className='pulsate-buttom'
                                    onClick={() => handleModalView('')}>
                                    <Icon_White_22><MdCancel/></Icon_White_22>
                                </Button_Icon_Blue_180>
                            </Tooltip>
                            {isSelectedRow.habilitado ? (
                                <>
                                    <Tooltip title='Deshabilitar' placement="top">
                                        <Button_Icon_Red_180 ThemeMode={themeMode} className={isActionBlock ? 'roll-in-button-left' : 'roll-out-button-left'}
                                            onClick={() => handleStatusEnable()}>
                                            <Icon_White_22><FaLock/></Icon_White_22>
                                        </Button_Icon_Red_180>
                                    </Tooltip>
                                </>
                            ):(
                                <>
                                    <Tooltip title='Habilitar' placement="top">
                                        <Button_Icon_Green_180 ThemeMode={themeMode} className={isActionBlock ? 'roll-in-button-left' : 'roll-out-button-left'}
                                            onClick={() => handleStatusEnable()}>
                                            <Icon_White_22><FaLockOpen/></Icon_White_22>
                                        </Button_Icon_Green_180>
                                    </Tooltip>
                                </>
                            )}
                        </Container_Row_95_Center>
                    </Container_Form_450>
                </Container_Modal>
            ):(
                currentMView === 'Status-Enable' ? (
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