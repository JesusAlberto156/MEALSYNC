//____________IMPORT/EXPORT____________
// Hooks de React
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
// Componentes de React externos
import { Tooltip } from "@mui/material";
// Contextos
import { ModalContext,ThemeModeContext,ModalViewContext } from "../../../../contexts/ViewsProvider";
// Hooks personalizados
import { HandleChangeModal } from "../../../../hooks/Views";
//__________ICONOS__________
// Icono para cerrar el modal
import { MdCancel } from "react-icons/md";
// Icono para realizar la función del modal
import { FaUserPlus } from "react-icons/fa";
//__________ICONOS__________
// Estilos personalizados
import { Container_Modal,Container_Form_500,Container_Row_90_Center,Container_Row_100_Center } from "../../../styled/Containers";
import { Text_Title_30_Center } from "../../../styled/Text";
import { Button_Icon_Blue_160,Button_Icon_Green_160 } from "../../../styled/Buttons";
import { Icon_White_26 } from "../../../styled/Icons";
//____________IMPORT/EXPORT____________


// Modal para ver la contraseña de usuarios
export default function User_Add(){
    // Constantes con el valor de los contextos
    const [themeMode] = useContext(ThemeModeContext);
    const [isModal] = useContext(ModalContext);
    const [currentMView] = useContext(ModalViewContext);
    // Constantes con la funcionalidad de los hooks
    const handleChangeModal = HandleChangeModal();
    // Estructura del componente
    return(
        <>
            {isModal ? (
                <>
                    <Container_Modal>
                        <Container_Form_500 ThemeMode={themeMode} className={currentMView === 'User-Add' ? 'roll-in-container-left' : 'roll-out-container-left'}>
                            <Container_Row_100_Center>
                                <Text_Title_30_Center ThemeMode={themeMode}>AGREGAR USUARIO</Text_Title_30_Center>
                            </Container_Row_100_Center>
                            <Container_Row_90_Center className={themeMode ? 'shadow-out-container-light-infinite' : 'shadow-out-container-dark-infinite'}>
                                <Tooltip title='Cancelar' placement='top'>
                                    <Button_Icon_Blue_160 ThemeMode={themeMode} onClick={() => handleChangeModal()}>
                                        <Icon_White_26><MdCancel/></Icon_White_26>
                                    </Button_Icon_Blue_160>
                                </Tooltip>
                                <Tooltip title='Agregar' placement='top'>
                                    <Button_Icon_Green_160 ThemeMode={themeMode}>
                                        <Icon_White_26><FaUserPlus/></Icon_White_26>
                                    </Button_Icon_Green_160>
                                </Tooltip>
                            </Container_Row_90_Center>
                        </Container_Form_500>
                    </Container_Modal>
                </>
            ):(
                <></>
            )}
        </>
    );
}