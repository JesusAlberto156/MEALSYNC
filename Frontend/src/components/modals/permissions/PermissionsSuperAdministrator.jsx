//____________IMPORT/EXPORT____________
// Hooks de React
import { useContext,useEffect } from "react";
// Componentes de React externos
import { Tooltip } from "@mui/material";
// Contextos
import { themeModeContext } from "../../../contexts/ViewsProvider";
import { actionBlockContext } from "../../../contexts/VariablesProvider";
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
import { Button_Icon_Blue_150,Button_Icon_Red_150,Button_Icon_Block_150 } from "../../styled/Buttons";
//____________IMPORT/EXPORT____________

// Modal para agregar permiso de super administrador a los usuarios
export default function PermissionsSuperAdministrator(){
    // Constantes con el valor de los contextos
        const [themeMode] = useContext(themeModeContext);
        const [isActiveBlock] = useContext(actionBlockContext);
        // useEffect con el titulo del modal
        useEffect(() => {
            document.title = "MEALSYNC_Administración_Permisos_Super-Administrador"
        },[]);
        // Constantes con la funcionalidad de los hooks
        const changeModalView = useChangeModalView();
        // Estructura del componente
    return(
        <>
            <Container_Modal>
                <Container_Form_400 ThemeMode={themeMode}>

                    <Container_Button_Border_Row_350 ThemeMode={themeMode}>
                        <Tooltip title='Cancelar' placement="top">
                            <Button_Icon_Red_150 ThemeMode={themeMode} onClick={() => changeModalView()}><MdCancel/></Button_Icon_Red_150>
                        </Tooltip>
                        {isActiveBlock ? (
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