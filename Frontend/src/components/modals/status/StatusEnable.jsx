//____________IMPORT/EXPORT____________
// Hooks de React
import { useContext,useEffect,useState } from "react";
import { useNavigate } from "react-router-dom";
// Componentes de React externos

// Servicios

// Rutas

// Contextos
import { ThemeModeContext } from "../../../contexts/ViewsProvider";
import { SelectedRowContext,ActionBlockContext } from "../../../contexts/VariablesProvider";
import { UsersContext } from "../../../contexts/UsersProvider";
// Hooks personalizados
import { useChangeStatusEnable } from "../../../hooks/Form";
import { HandleChangeModal } from "../../../hooks/Views";
//__________ICONOS__________
import { MdCancel } from "react-icons/md";
import { FaUnlock } from "react-icons/fa";
import { FaLock } from "react-icons/fa";
import { FaLockOpen } from "react-icons/fa";
import { FaExclamationCircle } from 'react-icons/fa';
//__________ICONOS__________
// Estilos personalizados
import { Container_Modal,Container_Form_400,Container_Row_Border_90_Center } from "../../styled/Containers";
import { Text_Title_30_Center,Text_P_16_Left } from "../../styled/Text";
import { Button_Icon_Blue_150,Button_Icon_Green_150,Button_Icon_Red_150 } from "../../styled/Buttons";
import { Icon_Warning_Modal,Icon_Tooltip_Modal } from "../../styled/Icons";

// Componentes personalizados
import Form_Verification from "../../forms/Verification";
//____________IMPORT/EXPORT____________

export default function Status_Enable(){
    // Constantes con el valor de los contextos
    const [themeMode] = useContext(ThemeModeContext);
    const [isSelectedRow] = useContext(SelectedRowContext);
    const [isUsers] = useContext(UsersContext);
    const [isActionBlock] = useContext(ActionBlockContext);
    // Constantes con el valor de useState
    const [user,setUser] = useState('');
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
    const changeModalView = HandleChangeModal();
    const changeStatusEnable = useChangeStatusEnable();
    // Estructura del componente
    return(
        <>
            {isSelectedRow !== null ? (
                <Container_Modal ThemeMode={themeMode}>
                    <Container_Form_400 ThemeMode={themeMode}>
                        <Text_Title_30_Center ThemeMode={themeMode}>{isSelectedRow.habilitado ? 'DESHABILITAR USUARIO' : 'HABILITAR USUARIO'}</Text_Title_30_Center>
                        <Form_Verification/>
                        {isSelectedRow.habilitado ? <Text_P_16_Left ThemeMode={themeMode}>Se deshabilitará a {user} </Text_P_16_Left> : <Text_P_16_Left ThemeMode={themeMode}>Se habilitará a {user}...</Text_P_16_Left>}
                        <Container_Row_Border_90_Center ThemeMode={themeMode}>
                            <Button_Icon_Blue_150 ThemeMode={themeMode} onClick={(e) => {
                                e.stopPropagation();
                                changeModalView('')
                                navigate('/Administration/Users/Status',{ replace: true });    
                            }}>
                                <MdCancel/>
                            </Button_Icon_Blue_150>
                            {isSelectedRow.habilitado ? (
                                isActionBlock ? (
                                    <>
                                        <Button_Icon_Red_150 ThemeMode={themeMode} onClick={(e) => {
                                            e.stopPropagation();
                                            changeStatusEnable();
                                        }}>
                                            <FaLock/>
                                        </Button_Icon_Red_150>
                                    </>
                                ):(
                                    <>
                                        <Button_Icon_Block_150 ThemeMode={themeMode}><FaUnlock/></Button_Icon_Block_150>
                                    </>
                                )
                            ):(
                                isActionBlock ? (
                                    <>
                                        <Button_Icon_Green_150 ThemeMode={themeMode} onClick={(e) => {
                                            e.stopPropagation();
                                            changeStatusEnable();
                                        }}>
                                            <FaLockOpen/>
                                        </Button_Icon_Green_150>
                                    </>
                                ):(
                                    <>
                                    
                                    </>
                                )
                            )}
                        </Container_Row_Border_90_Center>
                    </Container_Form_400>
                </Container_Modal>
            ):(<></>)}
        </>
    );
}