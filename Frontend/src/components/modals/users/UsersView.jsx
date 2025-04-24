//____________IMPORT/EXPORT____________
// Hooks de React
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
// Componentes de React externos
import { Tooltip } from "@mui/material";
// Contextos
import { ThemeModeContext } from "../../../contexts/ViewsProvider";
import { ActionBlockContext } from "../../../contexts/VariablesProvider";
import { SelectContext,CheckboxContext } from "../../../contexts/FormsProvider";
// Hooks personalizados
import { HandleChangeModal } from "../../../hooks/Views";
import { useChangeViewPassword } from '../../../hooks/Form'; 
//__________ICONOS__________
// Icono para cerrar el modal
import { MdCancel } from "react-icons/md";
// Icono para realizar la función del modal
import { FaEye } from "react-icons/fa";
//__________ICONOS__________
// Estilos personalizados
import { Container_Modal,Container_Form_400,Container_Row_Border_90_Center } from "../../styled/Containers";
import { Button_Icon_Blue_170,Button_Icon_Green_170,Button_Icon_Block_170 } from "../../styled/Buttons";
import { Text_Title_30_Center,Text_P_20_Left } from "../../styled/Text";
// Componentes perzonalizados
import Form_Verification from "../../forms/Verification";
//____________IMPORT/EXPORT____________

// Modal para ver la contraseña de usuarios
export default function Users_View(){
    // Constantes con el valor de los contextos
    const [themeMode] = useContext(ThemeModeContext);
    const [isActionBlock] = useContext(ActionBlockContext);
    const [isSelect] = useContext(SelectContext);
    const [isCheckbox] = useContext(CheckboxContext);
    // Constantes con la funcionalidad de los hooks
    const navigate = useNavigate();
    const changeModalView = HandleChangeModal();
    const changeViewPassword = useChangeViewPassword();
    // Estructura del componente
    return(
        <>
            <Container_Modal>
                <Container_Form_400 ThemeMode={themeMode}>
                    <Text_Title_30_Center ThemeMode={themeMode}>VER CONTRASEÑAS</Text_Title_30_Center>
                    <Form_Verification/>
                    <Text_P_20_Left ThemeMode={themeMode}>Ver contraseñas...</Text_P_20_Left>
                    <Container_Row_Border_90_Center ThemeMode={themeMode}>
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
                    </Container_Row_Border_90_Center>
                </Container_Form_400>
            </Container_Modal>
        </>
    );
}