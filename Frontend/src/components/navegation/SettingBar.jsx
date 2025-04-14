//____________IMPORT/EXPORT____________
// Hooks de React
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
// Componentes de React externos
import { Tooltip } from "@mui/material";
// Contextos
import { themeModeContext,sidebarContext } from "../../contexts/ViewsProvider";
import { loggedContext } from "../../contexts/SessionProvider";
import { typeUserContext } from "../../contexts/VariablesProvider";
// Hooks personalizados
import { ToggleThemeMode,ToggleSidebar,HandleChangeModal } from "../../hooks/Views";
//__________ICONOS__________
// Icono para cambiar el modo de la interfaz
import { IoMdSunny } from "react-icons/io";
import { FaMoon } from "react-icons/fa";
// Iconos para el toggle
import { BsToggleOff } from "react-icons/bs";
import { BsToggleOn } from "react-icons/bs";
// Icono para el logout
import { FaSignOutAlt } from "react-icons/fa";
//__________ICONOS__________
// Estilos personalizados
import { Container_Row_90_Right } from "../styled/Containers";
import { Button_Icon_Blue_60,Button_Icon_Red_60 } from "../styled/Buttons";
import { Icon_Button_Black_26,Icon_18 } from "../styled/Icons";
//____________IMPORT/EXPORT____________

// Componente para la configuración visual de la página o cerrar sesión
export default function Setting_Bar(){
    // Constantes con el valor de los contextos
    const [themeMode] = useContext(themeModeContext);
    const [isSidebar] = useContext(sidebarContext);
    const [isLogged] = useContext(loggedContext);
    const [isTypeUser] = useContext(typeUserContext);
    // Constantes con la funcionalidad de los hooks
    const navigate = useNavigate();
    const toggleThemeMode = ToggleThemeMode();
    const toggleSidebar = ToggleSidebar();
    const handleChangeModal = HandleChangeModal();
    // Estructura del componente
    return(
        <>
            <Container_Row_90_Right>
                {isLogged ? (
                    <>  
                        <Tooltip title={isSidebar ? 'Ocultar' : 'Mostrar'} placement="bottom">
                            <Button_Icon_Blue_60 ThemeMode={themeMode} onClick={() => toggleSidebar()}>
                                {isSidebar ? <Icon_18><BsToggleOn/></Icon_18> : <Icon_18><BsToggleOff/></Icon_18>}
                            </Button_Icon_Blue_60>
                        </Tooltip>
                        <Tooltip title='Salir' placement="bottom">
                            <Button_Icon_Red_60 ThemeMode={themeMode} onClick={() => {
                                handleChangeModal('Out-Login');
                                navigate(isTypeUser === 'Cook' || isTypeUser === 'Nutritionist' || isTypeUser === 'Doctor' ? '/Kitchen/Out_Login' : '/Administration/Out_Login',{ replace: true });
                            }}>
                                <Icon_18><FaSignOutAlt/></Icon_18>
                            </Button_Icon_Red_60>
                        </Tooltip>
                    </>
                ):(
                    <></>
                )}
                <Tooltip title={themeMode ? 'Modo Claro' : 'Modo Oscuro'} placement="left">
                    <Icon_Button_Black_26 ThemeMode={themeMode} onClick={() => toggleThemeMode()}>
                        {themeMode ? <IoMdSunny/> : <FaMoon/>}
                    </Icon_Button_Black_26>
                </Tooltip>
            </Container_Row_90_Right>
        </>
    );
}