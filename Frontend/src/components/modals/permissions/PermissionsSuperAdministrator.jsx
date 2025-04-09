//____________IMPORT/EXPORT____________
// Hooks de React
import { useContext,useEffect,useState } from "react";
// Componentes de React externos
import { Tooltip } from "@mui/material";
// Contextos
import { themeModeContext } from "../../../contexts/ViewsProvider";
import { usersContext } from "../../../contexts/UsersProvider";
import { actionBlockContext,selectedRowContext } from "../../../contexts/VariablesProvider";
import { refFormPermissionsContext } from '../../../contexts/RefsProvider';
// Hooks personalizados
import { useChangeModalView } from "../../../hooks/Views";
import { useChangePermissionsEnable } from "../../../hooks/Form";
//__________ICONOS__________
// Icono para cerrar el modal
import { MdCancel } from "react-icons/md";
// Icono para realizar la función del modal
import { MdAdminPanelSettings } from "react-icons/md";
//__________ICONOS__________
// Estilos personalizados
import { Container_Modal,Container_Form_400,Container_Button_Border_Row_350 } from "../../styled/Containers";
import { Text_P_Left_16, Text_Title_Fade_30 } from "../../styled/Text";
import { Button_Icon_Blue_150,Button_Icon_Red_150,Button_Icon_Green_150,Button_Icon_Block_150 } from "../../styled/Buttons";
// Componentes personalizados
import Form_Verification from '../../forms/Verification';
//____________IMPORT/EXPORT____________

// Modal para agregar permiso de super administrador a los usuarios
export default function Permissions_Super_Administrator(){
    // Constantes con el valor de los contextos
        const [themeMode] = useContext(themeModeContext);
        const [isActionBlock] = useContext(actionBlockContext);
        const [isSelectedRow] = useContext(selectedRowContext);
        const [isUsers] = useContext(usersContext);
        const {Modal,Form} = useContext(refFormPermissionsContext);
        // Constantes con el valor de useState
        const [user,setUser] = useState('');
        // useEffect con el titulo del modal
        useEffect(() => {
            document.title = "MEALSYNC_Administración_Usuarios_Permisos_Super-Administrador"
            if(isSelectedRow !== null){
                const isUser = isUsers.find(u => u.idusuario === isSelectedRow.idusuario);
                if(isUser){
                    setUser(isUser.usuario);
                }
            }
        },[]);
        // Constantes con la funcionalidad de los hooks
        const changeModalView = useChangeModalView();
        const changePermissionsEnable = useChangePermissionsEnable();
        // Estructura del componente
    return(
        <>
            {isSelectedRow !== null ? (
                <>
                    <Container_Modal ref={Modal}>
                        <Container_Form_400 ThemeMode={themeMode} ref={Form}>
                            <Text_Title_Fade_30 ThemeMode={themeMode}>{isSelectedRow.superadministrador ? 'DESHABILITAR PERMISO':'HABILITAR PERMISO'}</Text_Title_Fade_30>
                            <Form_Verification/>
                            {isSelectedRow.superadministrador ? <Text_P_Left_16 ThemeMode={themeMode}>Se deshabilitará a {user}</Text_P_Left_16>:<Text_P_Left_16 ThemeMode={themeMode}>Se habilitará a {user}</Text_P_Left_16>}
                            <Container_Button_Border_Row_350 ThemeMode={themeMode}>
                                <Button_Icon_Blue_150 ThemeMode={themeMode} onClick={(e) => {
                                    e.stopPropagation();
                                    changeModalView('');
                                }}>
                                    <MdCancel/>
                                </Button_Icon_Blue_150>
                                {isActionBlock ? (
                                    isSelectedRow.superadministrador ? (
                                        <>
                                            <Button_Icon_Red_150 ThemeMode={themeMode} onClick={(e) => {
                                                e.stopPropagation();
                                                changePermissionsEnable();
                                            }}>
                                                <MdAdminPanelSettings/>
                                            </Button_Icon_Red_150>
                                        </>
                                    ):(
                                        <>
                                            <Button_Icon_Green_150 ThemeMode={themeMode} onClick={(e) => {
                                                e.stopPropagation();
                                                changePermissionsEnable();
                                            }}>
                                                <MdAdminPanelSettings/>
                                            </Button_Icon_Green_150>
                                        </>
                                    )
                                ):(
                                    <>
                                        <Button_Icon_Block_150 ThemeMode={themeMode}><MdAdminPanelSettings/></Button_Icon_Block_150>
                                    </>
                                )}
                            </Container_Button_Border_Row_350>
                        </Container_Form_400>
                    </Container_Modal>  
                </>
            ):(
                <></>
            )}
        </>
    );
}