//____________IMPORT/EXPORT____________
// Hooks de React
import { useContext } from "react";
// Componentes de React externos
import { Tooltip } from "@mui/material";
// Servicios

// Contextos
import { themeModeContext,modalViewContext,modalContext } from "../../../contexts/ViewsProvider";
import { actionBlockContext } from "../../../contexts/VariablesProvider";
// Hooks personalizados
import { HandleChangeModal } from "../../../hooks/Views";
import { HandleChangeLog } from "../../../hooks/Form";
//__________ICONOS__________
// Icono para cerrar el modal
import { MdCancel } from "react-icons/md";
// Icono para realizar la función del modal
import { ImExit } from "react-icons/im";
//__________ICONOS__________
// Estilos personalizados
import { Container_Modal,Container_Form_400,Container_Row_90_Left,Container_Row_Border_90_Center } from "../../styled/Containers";
import { Text_Title_30, Text_P_16 } from "../../styled/Text";
import { Button_Icon_Blue_150,Button_Icon_Red_150,Button_Icon_Block_150 } from "../../styled/Buttons";
import { Icon_26 } from "../../styled/Icons";
// Componentes personalizados

//____________IMPORT/EXPORT____________

// Modal para cerrar sesión
export default function Out_Login(){
    // Constantes con el valor de los contextos 
    const [themeMode] = useContext(themeModeContext);
    const [isActionBlock] = useContext(actionBlockContext);
    const [currentMView] = useContext(modalViewContext);
    const [isModal] = useContext(modalContext);
    // Constantes con la funcionalidad de los hooks
    const handleChangeModal = HandleChangeModal();
    const changeLog = HandleChangeLog();
    // Estructura del componente
    return(
        <>
            {isModal ? (
                <>
                    <Container_Modal>
                        <Container_Form_400 className={currentMView === 'Out-Login' ? themeMode ? 'roll-in-left-shadow-pop-light' : 'roll-in-left-shadow-pop-dark' : 'roll-out-left'} ThemeMode={themeMode}>
                                <Text_Title_30 className={themeMode ? 'text-pop-light' : 'text-pop-dark'} ThemeMode={themeMode}>¿ESTAS SEGURO?</Text_Title_30>
                                <Container_Row_90_Left>
                                    <Text_P_16 ThemeMode={themeMode}>Cerrará la sesión...</Text_P_16>
                                </Container_Row_90_Left>
                                <Container_Row_Border_90_Center className={themeMode ? 'shadow-out-infinite-light' : 'shadow-out-infinite-dark'} ThemeMode={themeMode}>
                                    <Tooltip title="Cancelar" placement="top">
                                        <Button_Icon_Blue_150 ThemeMode={themeMode} onClick={() => handleChangeModal('')}>
                                            <Icon_26><MdCancel/></Icon_26>
                                        </Button_Icon_Blue_150>
                                    </Tooltip>
                                    {isActionBlock ? (
                                        <>
                                            <Button_Icon_Block_150 ThemeMode={themeMode}>
                                                <Icon_26><MdCancel/></Icon_26>
                                            </Button_Icon_Block_150>
                                        </> 
                                    ):(
                                        <>
                                            <Tooltip title="Cerrar sesión" placement="top">
                                                <Button_Icon_Red_150 ThemeMode={themeMode} onClick={() => changeLog()}>
                                                    <Icon_26><ImExit/></Icon_26>
                                                </Button_Icon_Red_150>
                                            </Tooltip>  
                                        </>
                                    )}
                                </Container_Row_Border_90_Center>
                        </Container_Form_400>
                    </Container_Modal>  
                </>
            ):(
                <></>
            )}
        </>
    );
}