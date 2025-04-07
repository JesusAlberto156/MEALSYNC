//____________IMPORT/EXPORT____________
// Hooks de React
import { useContext,useEffect,useState } from "react";
// Componentes de React externos

// Servicios

// Rutas

// Contextos
import { themeModeContext } from "../../../contexts/ViewsProvider";
import { selectedRowContext,actionBlockContext } from "../../../contexts/VariablesProvider";
import { usersContext } from "../../../contexts/UsersProvider";
import { refFormContext } from "../../../contexts/RefsProvider";
// Hooks personalizados
import { useChangeStatusEnable } from "../../../hooks/Form";
import { useChangeModalView } from "../../../hooks/Views";
//__________ICONOS__________
import { MdCancel } from "react-icons/md";
import { FaUnlock } from "react-icons/fa";
import { FaLock } from "react-icons/fa";
import { FaLockOpen } from "react-icons/fa";
import { FaExclamationCircle } from 'react-icons/fa';
//__________ICONOS__________
// Estilos personalizados
import { Container_Modal,Container_Form_400,Container_Button_Border_Row_350 } from "../../styled/Containers";
import { Text_Title_Fade_30,Text_P_Left_16 } from "../../styled/Text";
import { Button_Icon_Blue_150,Button_Icon_Green_150,Button_Icon_Red_150,Button_Icon_Block_150 } from "../../styled/Buttons";
import { Icon_Warning_Modal,Icon_Tooltip_Modal } from "../../styled/Icons";

// Componentes personalizados
import Form_Verification from "../../forms/Verification";
//____________IMPORT/EXPORT____________

export default function Status_Enable(){
    // Constantes con el valor de los contextos
    const [themeMode] = useContext(themeModeContext);
    const [isSelectedRow] = useContext(selectedRowContext);
    const [isUsers] = useContext(usersContext);
    const [isActionBlock] = useContext(actionBlockContext);
    const {Modal,Form,Button} = useContext(refFormContext);
    // Constantes con el valor de useState
    const [user,setUser] = useState('');
    // useEffect con el titulo del modal
    useEffect(() => {
        if(isSelectedRow.habilitado)document.title = "MEALSYNC_Administración_Usuarios_Estatus_Deshabilitar"
        if(!isSelectedRow.habilitado)document.title = "MEALSYNC_Administración_Usuarios_Estatus_Habilitar"
        if(isSelectedRow !== null){
            const isUser = isUsers.find(u => u.idusuario === isSelectedRow.idusuario);
            if(isUser){
                setUser(isUser.usuario);
            }
        }
    },[]);
    // Constantes con la funcionalidad de los hooks
    const changeModalView = useChangeModalView();
    const changeStatusEnable = useChangeStatusEnable();
    // Estructura del componente
    return(
        <>
            {isSelectedRow !== null ? (
                <Container_Modal ThemeMode={themeMode} ref={Modal}>
                    <Container_Form_400 ThemeMode={themeMode} ref={Form}>
                        <Text_Title_Fade_30 ThemeMode={themeMode}>{isSelectedRow.habilitado ? 'DESHABILITAR USUARIO' : 'HABILITAR USUARIO'}</Text_Title_Fade_30>
                        <Form_Verification/>
                        {isSelectedRow.habilitado ? <Text_P_Left_16 ThemeMode={themeMode}>Se deshabilitará a {user} </Text_P_Left_16> : <Text_P_Left_16 ThemeMode={themeMode}>Se habilitará a {user}...</Text_P_Left_16>}
                        <Container_Button_Border_Row_350 ThemeMode={themeMode}>
                                <Button_Icon_Blue_150 ThemeMode={themeMode} onClick={(e) => {
                                    e.stopPropagation();
                                    changeModalView();
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
                                        <Button_Icon_Block_150 ThemeMode={themeMode}><FaUnlock/></Button_Icon_Block_150>
                                    </>
                                )
                            )}
                        </Container_Button_Border_Row_350>
                    </Container_Form_400>
                </Container_Modal>
            ):(<></>)}
        </>
    );
}