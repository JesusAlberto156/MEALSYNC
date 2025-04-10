//____________IMPORT/EXPORT____________
// Hooks de React
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
// Componentes de React externos
import { Tooltip } from "@mui/material";
// Contextos
import { themeModeContext } from "../../../contexts/ViewsProvider";
import { actionBlockContext } from "../../../contexts/VariablesProvider";
import { selectContext,checkboxContext } from "../../../contexts/FormsProvider";
// Hooks personalizados
import { useChangeModalView } from "../../../hooks/Views";
import { useChangeViewPassword } from '../../../hooks/Form'; 
//__________ICONOS__________
// Icono para cerrar el modal
import { MdCancel } from "react-icons/md";
// Icono para realizar la función del modal
import { FaEye } from "react-icons/fa";
//__________ICONOS__________
// Estilos personalizados
import { Container_Modal,Container_Form_400,Container_Button_Border_Row_350 } from "../../styled/Containers";
import { Button_Icon_Blue_170,Button_Icon_Green_170,Button_Icon_Block_170 } from "../../styled/Buttons";
import { Text_Title_Fade_30,Text_P_Left_20 } from "../../styled/Text";
// Componentes perzonalizados
import Form_Verification from "../../forms/Verification";
//____________IMPORT/EXPORT____________

// Modal para ver la contraseña de usuarios
export default function Users_View(){
    // Constantes con el valor de los contextos
    const [themeMode] = useContext(themeModeContext);
    const [isActionBlock] = useContext(actionBlockContext);
    const [isSelect] = useContext(selectContext);
    const [isCheckbox] = useContext(checkboxContext);
    // Constantes con la funcionalidad de los hooks
    const navigate = useNavigate();
    const changeModalView = useChangeModalView();
    const changeViewPassword = useChangeViewPassword();
    // Estructura del componente
    return(
        <>
            <Container_Modal>
                <Container_Form_400 ThemeMode={themeMode}>
                    <Text_Title_Fade_30 ThemeMode={themeMode}>VER CONTRASEÑAS</Text_Title_Fade_30>
                    <Form_Verification/>
                    <Text_P_Left_20 ThemeMode={themeMode}>Ver contraseñas...</Text_P_Left_20>
                    <Container_Button_Border_Row_350 ThemeMode={themeMode}>
                        <Tooltip title='Cancelar' placement="top">
                            <Button_Icon_Blue_170 ThemeMode={themeMode} onClick={() => {
                                changeModalView('')
                                navigate('/Administration/Users/Principal',{ replace: true });
                            }}>
                                <MdCancel/>
                            </Button_Icon_Blue_170>
                        </Tooltip>
                        {isActionBlock ? (
                            <>
                                <Tooltip title='Ver' placement="top">
                                    <Button_Icon_Green_170 ThemeMode={themeMode} onClick={() => changeViewPassword()}><FaEye/></Button_Icon_Green_170>
                                </Tooltip>
                            </>
                        ):(
                            <>
                                <Button_Icon_Block_170 ThemeMode={themeMode}><FaEye/></Button_Icon_Block_170>
                            </>
                        )}
                    </Container_Button_Border_Row_350>
                </Container_Form_400>
            </Container_Modal>
        </>
    );
}