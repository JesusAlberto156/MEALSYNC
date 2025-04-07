//____________IMPORT/EXPORT____________
// Hooks de React
import { useContext,useEffect } from "react";
// Componentes de React externos
import { Tooltip } from "@mui/material";
// Servicios

// Contextos
import { themeModeContext } from "../../../contexts/ViewsProvider";
import { typeUserContext,actionBlockContext } from "../../../contexts/VariablesProvider";
// Hooks personalizados
import { useChangeModalView } from "../../../hooks/Views";
import { useChangeLog } from "../../../hooks/Form";
//__________ICONOS__________
// Icono para cerrar el modal
import { MdCancel } from "react-icons/md";
// Icono para realizar la función del modal
import { ImExit } from "react-icons/im";
//__________ICONOS__________
// Estilos personalizados
import { Container_Modal,Container_Form_400,Container_Button_Border_Row_350 } from "../../styled/Containers";
import { Text_Title_Fade_30,Text_P_Left_20 } from "../../styled/Text";
import { Button_Icon_Blue_150,Button_Icon_Red_150,Button_Icon_Block_150 } from "../../styled/Buttons";
// Componentes personalizados

//____________IMPORT/EXPORT____________

// Modal para cerrar sesión
export default function Out_Login(){
    // Constantes con el valor de los contextos 
    const [themeMode] = useContext(themeModeContext);
    const [isTypeUser] = useContext(typeUserContext);
    const [isActionBlock] = useContext(actionBlockContext);
    // useEffect con el titulo del modal
    useEffect(() => {
        if(isTypeUser === 'Cook' || isTypeUser === 'Nutritionist' || isTypeUser === 'Doctor'){
            document.title = "MEALSYNC_Menú_Cerrar_Sesión";
        }else{
            document.title = "MEALSYNC_Administración_Cerrar_Sesión";
        }
    },[]);
    // Constantes con la funcionalidad de los hooks
    const chanheModalView = useChangeModalView();
    const changeLog = useChangeLog();
    // Estructura del componente
    return(
        <>
            <Container_Modal>
                <Container_Form_400 ThemeMode={themeMode}>
                        <Text_Title_Fade_30 ThemeMode={themeMode}>¿ESTAS SEGURO?</Text_Title_Fade_30>
                        <Text_P_Left_20 ThemeMode={themeMode}>Cerrará la sesión...</Text_P_Left_20>
                        <Container_Button_Border_Row_350 ThemeMode={themeMode}>
                            <Tooltip title="Cancelar" placement="top">
                                <Button_Icon_Blue_150 ThemeMode={themeMode} onClick={() => chanheModalView('')}><MdCancel/></Button_Icon_Blue_150>
                            </Tooltip>
                            {isActionBlock ? (
                                <>
                                    <Button_Icon_Block_150 ThemeMode={themeMode}><ImExit/></Button_Icon_Block_150>
                                </> 
                            ):(
                                <>
                                    <Tooltip title="Cerrar sesión" placement="top">
                                        <Button_Icon_Red_150 ThemeMode={themeMode} onClick={() => changeLog()}><ImExit/></Button_Icon_Red_150>
                                    </Tooltip>  
                                </>
                            )}
                        </Container_Button_Border_Row_350>
                </Container_Form_400>
            </Container_Modal>
        </>
    );
}