//____________IMPORT/EXPORT____________
// Hooks de React
import { useContext } from "react";
// Componentes de React externos
import { Tooltip } from "@mui/material";
// Contextos
import { ThemeModeContext,ModalViewContext,ModalContext } from "../../../contexts/ViewsProvider";
import { ActionBlockContext,AnimationContext } from "../../../contexts/VariablesProvider";
// Hooks personalizados
import { HandleModalView } from "../../../hooks/Views";
import { HandleLoggedLog } from "../../../hooks/Forms";
//__________ICONOS__________
// Icono para cerrar el modal
import { MdCancel } from "react-icons/md";
// Icono para realizar la función del modal
import { ImExit } from "react-icons/im";
//__________ICONOS__________
// Estilos personalizados
import { Container_Modal_Background_Black,Container_Form_350,Container_Row_100_Center,Container_Row_NG_100_Center } from "../../styled/Containers";
import { Text_Title_32_Black,Text_Span_16_Center_Black,Text_Color_Blue_16 } from "../../styled/Text";
import { Button_Icon_Blue_120,Button_Icon_Red_120 } from "../../styled/Buttons";
import { Icon_20 } from "../../styled/Icons";
//____________IMPORT/EXPORT____________

// Modal para cerrar sesión
export default function Out_Login(){
    // Constantes con el valor de los contextos 
    const [themeMode] = useContext(ThemeModeContext);
    const [isAnimation] = useContext(AnimationContext);
    const [isActionBlock] = useContext(ActionBlockContext);
    const [currentMView] = useContext(ModalViewContext);
    const [isModal] = useContext(ModalContext);
    // Constantes con la funcionalidad de los hooks
    const handleModalView = HandleModalView();
    const handleLoggedLog = HandleLoggedLog();
    // Estructura del componente
    return(
        <>
            {isModal ? (
                <>
                    <Container_Modal_Background_Black>
                        <Container_Form_350 className={currentMView === 'Cerrar-Sesión' ? 'slide-in-container-top' : 'slide-out-container-top'} ThemeMode={themeMode}>
                                <Container_Row_100_Center>
                                    <Text_Title_32_Black ThemeMode={themeMode}>¿ESTAS SEGURO?</Text_Title_32_Black>
                                </Container_Row_100_Center>
                                <Container_Row_NG_100_Center>
                                    <Text_Color_Blue_16 ThemeMode={themeMode}>MEALSYNC</Text_Color_Blue_16>
                                    <Text_Span_16_Center_Black ThemeMode={themeMode}>- Cerrará la sesión...</Text_Span_16_Center_Black>
                                </Container_Row_NG_100_Center>
                                <Container_Row_100_Center className={themeMode ? 'shadow-out-container-light-infinite' : 'shadow-out-container-dark-infinite'}>
                                    <Tooltip title="Cancelar" placement="top">
                                        <Button_Icon_Blue_120 ThemeMode={themeMode} className={isAnimation ? 'roll-out-button-left' : 'roll-in-button-left'}
                                            onClick={() => handleModalView('')}>
                                            <Icon_20><MdCancel/></Icon_20>
                                        </Button_Icon_Blue_120>
                                    </Tooltip>
                                    <Tooltip title="Cerrar sesión" placement="top">
                                        <Button_Icon_Red_120 ThemeMode={themeMode} className={isActionBlock ? 'roll-out-button-left' : 'roll-in-button-left'}
                                            onClick={() => handleLoggedLog()}>
                                            <Icon_20><ImExit/></Icon_20>
                                        </Button_Icon_Red_120>
                                    </Tooltip>
                                </Container_Row_100_Center>
                        </Container_Form_350>
                    </Container_Modal_Background_Black>  
                </>
            ):(
                <></>
            )}
        </>
    );
}