//____________IMPORT/EXPORT____________
// Hooks de React
import { useContext,useEffect } from "react";
import { useNavigate } from "react-router-dom";
// Componentes de React externos
import { Tooltip } from "@mui/material";
// Contextos
import { ThemeModeContext,ModalContext,ModalViewContext } from "../../../../contexts/ViewsProvider";
import { ActionBlockContext,VerificationBlockContext } from "../../../../contexts/VariablesProvider";
import { SelectedRowContext } from "../../../../contexts/SelectedesProvider";
import { StatusEnableContext } from "../../../../contexts/UsersProvider";
import { SocketContext } from "../../../../contexts/SocketProvider";
import { RefStatusContext } from "../../../../contexts/RefsProvider";
import { TextFieldsStatusContext } from "../../../../contexts/FormsProvider";
// Hooks personalizados
import { HandleStatusEnable } from "../../../../hooks/Form";
import { HandleModalView } from "../../../../hooks/Views";
//__________ICONOS__________
import { MdCancel } from "react-icons/md";
// Icono para realizar la función del modal
import { FaLock } from "react-icons/fa";
import { FaLockOpen } from "react-icons/fa";
//__________ICONOS__________
// Estilos personalizados
import { Container_Modal,Container_Form_450,Container_Row_95_Center, Container_Row_NG_90_Center } from "../../../styled/Containers";
import { Text_Title_30_Center,Text_A_16_Left,Text_Blue_16_Left } from "../../../styled/Text";
import { Button_Icon_Blue_180,Button_Icon_Green_180,Button_Icon_Red_180 } from "../../../styled/Buttons";
import { Icon_White_22 } from "../../../styled/Icons";
import { Alert_Verification } from "../../../styled/Alerts";
// Componentes personalizados
import Form_Verification from "../../../forms/Verification";
import Error_Enable from "../../errors/Enable";
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
    // Constantes con la funcionalidad de los hooks
    const navigate = useNavigate();
    const handleModalView = HandleModalView();
    const handleStatusEnable = HandleStatusEnable();
    // UseEffect para editar datos a la base de datos
    useEffect(() => {
        if(isStatusEnable){
            const promise = new Promise((resolve,reject) => {
                try{ 
                    setIsActionBlock(false); 
                    setTimeout(() => {
                        socket.emit('Status-Enable-Update',isTextFieldsStatus.iduser,isTextFieldsStatus.user,isTextFieldsStatus.status === 'Habilitado' ? 0:1);

                        if(isTextFieldsStatus.status === 'Habilitado'){
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
                            setIsActionBlock(false);
                            setIsVerificationBlock(false);
                            sessionStorage.removeItem('Action-Block');
                            sessionStorage.removeItem('Verification-Block');
                            setIsStatusEnable(false);
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

            Alert_Verification(promise,isTextFieldsStatus.status === 'Habilitado' ? '¡Deshabilitando usuario!...' : '¡Habilitando usuario!...');
        }
    },[isStatusEnable]);
    // UseEffect para quitar la suscrpcion de socket
    useEffect(() => {
        const handleStatusEnableUpdate = (message,user) => {
            console.log(message,user);
            socket.emit('Status');
        };

        socket.on('Status-Enable-Update',handleStatusEnableUpdate);
        
        return () => {
            socket.off('Status-Enable-Update',handleStatusEnableUpdate);
        }
    },[socket])
    // Estructura del componente
    return(
        <>
            {isModal && isSelectedRow !== null ? (
                <Container_Modal ref={Modal_Status}>
                    <Container_Form_450 ref={Form_Status} ThemeMode={themeMode} className={currentMView === 'Status-Enable' ? 'slide-in-container-top' : 'slide-out-container-top'}>
                        <Text_Title_30_Center ThemeMode={themeMode}>{isSelectedRow.habilitado ? 'DESHABILITAR USUARIO' : 'HABILITAR USUARIO'}</Text_Title_30_Center>
                        <Form_Verification/>
                        <Container_Row_NG_90_Center>
                            <Text_Blue_16_Left ThemeMode={themeMode}>Usuario:</Text_Blue_16_Left>
                            <Text_A_16_Left ThemeMode={themeMode}> {isTextFieldsStatus.user}</Text_A_16_Left>
                        </Container_Row_NG_90_Center>
                        <Container_Row_95_Center>
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
                            {isSelectedRow.habilitado ? (
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