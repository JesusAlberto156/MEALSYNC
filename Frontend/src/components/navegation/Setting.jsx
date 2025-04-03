//____________IMPORT/EXPORT____________
// Hooks de React
import { useContext } from "react";
// Componentes de React externos
import { Tooltip } from "@mui/material";
// Servicios

// Rutas

// Contextos
import { themeModeContext,sidebarVisibleContext } from "../../contexts/ViewsProvider";
import { loggedContext } from "../../contexts/SessionProvider";
// Hooks personalizados
import { useChangeThemeMode,useToggleSidebar,useChangeModalView } from "../../hooks/Views";
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
import { Container_Button_90 } from "../styled/Containers";
import { Button_Icon_Toggle,Button_Icon_Logout,Button_Icon_Theme_40 } from "../styled/Buttons";
// Componentes personalizados

//____________IMPORT/EXPORT____________

// Componente para la configuración visual de la página o cerrar sesión
export default function Setting(){
    // Constantes con el valor de los contextos
    const [themeMode] = useContext(themeModeContext);
    const [isSidebarVisible] = useContext(sidebarVisibleContext);
    const [isLogged] = useContext(loggedContext);
    // Constantes con la funcionalidad de los hooks
    const changeThemeMode = useChangeThemeMode();
    const toggleSidebar = useToggleSidebar();
    const changeModalView = useChangeModalView();
    // Estructura del componente
    return(
        <>
            <Container_Button_90>
                {isLogged ? (
                    <>
                        <Tooltip title={isSidebarVisible ? 'Ocultar' : 'Mostrar'} placement="bottom">
                            <Button_Icon_Toggle ThemeMode={themeMode} onClick={() => toggleSidebar()}>{isSidebarVisible ? <BsToggleOn /> : <BsToggleOff/>}</Button_Icon_Toggle>
                        </Tooltip>
                        <Tooltip title='Salir' placement="bottom">
                            <Button_Icon_Logout ThemeMode={themeMode} onClick={() => changeModalView('Out-Login')}><FaSignOutAlt/></Button_Icon_Logout>
                        </Tooltip>
                    </>
                ):(
                    <></>
                )}
                <Tooltip title={themeMode ? 'Modo Claro' : 'Modo Oscuro'} placement="left">
                    <Button_Icon_Theme_40 ThemeMode={themeMode} onClick={() => changeThemeMode()}>
                        {themeMode ? <IoMdSunny/> : <FaMoon/>}
                    </Button_Icon_Theme_40>
                </Tooltip>
            </Container_Button_90>
        </>
    );
}