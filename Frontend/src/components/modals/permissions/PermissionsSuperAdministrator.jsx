//____________IMPORT/EXPORT____________
// Hooks de React
import { useContext,useEffect } from "react";
// Componentes de React externos
import { Tooltip } from "@mui/material";
// Contextos
import { themeModeContext } from "../../../contexts/ViewsProvider";
import { actionBlockContext,selectedRowContext } from "../../../contexts/VariablesProvider";
import { refFormPermissionsContext } from '../../../contexts/RefsProvider';
// Hooks personalizados
import { useChangeModalView } from "../../../hooks/Views";
//__________ICONOS__________
// Icono para cerrar el modal
import { MdCancel } from "react-icons/md";
// Icono para realizar la función del modal
import { MdAdminPanelSettings } from "react-icons/md";
//__________ICONOS__________
// Estilos personalizados
import { Container_Modal,Container_Form_400,Container_Button_Border_Row_350 } from "../../styled/Containers";
import { Text_P_Left_20, Text_Title_Fade_30 } from "../../styled/Text";
import { Button_Icon_Blue_150,Button_Icon_Red_150,Button_Icon_Block_150 } from "../../styled/Buttons";
//____________IMPORT/EXPORT____________

// Modal para agregar permiso de super administrador a los usuarios
export default function Permissions_Super_Administrator(){
    // Constantes con el valor de los contextos
        const [themeMode] = useContext(themeModeContext);
        const [isActionBlock] = useContext(actionBlockContext);
        const [isSelectedRow] = useContext(selectedRowContext);
        const {Modal,Form} = useContext(refFormPermissionsContext);
        // useEffect con el titulo del modal
        useEffect(() => {
            document.title = "MEALSYNC_Administración_Usuarios_Permisos_Super-Administrador"
        },[]);
        // Constantes con la funcionalidad de los hooks
        const changeModalView = useChangeModalView();
        // Estructura del componente
    return(
        <>
            <Container_Modal ref={Modal}>
                <Container_Form_400 ThemeMode={themeMode} ref={Form}>
                    <Text_Title_Fade_30 ThemeMode={themeMode}>{isSelectedRow.superadministrador ? 'DESHABILITAR PERMISO':'HABILITAR PERMISO'}</Text_Title_Fade_30>
                    <Container_Button_Border_Row_350 ThemeMode={themeMode}>
                        <Tooltip title='Cancelar' placement="top">
                            <Button_Icon_Red_150 ThemeMode={themeMode} onClick={() => changeModalView('')}><MdCancel/></Button_Icon_Red_150>
                        </Tooltip>
                        {isActionBlock ? (
                            <>
                                <Button_Icon_Block_150 ThemeMode={themeMode}><MdAdminPanelSettings/></Button_Icon_Block_150>
                            </>
                        ):(
                            <>
                                <Tooltip title='Habilitar' placement="top">
                                    <Button_Icon_Blue_150 ThemeMode={themeMode}><MdAdminPanelSettings/></Button_Icon_Blue_150>
                                </Tooltip>
                            </>
                        )}
                    </Container_Button_Border_Row_350>
                </Container_Form_400>
            </Container_Modal>
        </>
    );
}