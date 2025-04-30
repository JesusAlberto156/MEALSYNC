//____________IMPORT/EXPORT____________
// Hooks de React
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
// Componentes de React externos
import { Tooltip } from "@mui/material";
// Contextos
import { ThemeModeContext,SidebarContext } from "../../contexts/ViewsProvider";
import { LoggedLoggedContext,LoggedTypeContext } from "../../contexts/SessionProvider";
// Hooks personalizados
import { ToggleThemeMode,ToggleSidebar,HandleModalView } from "../../hooks/Views";
//__________ICONOS__________
// Icono para cambiar el modo de la interfaz
import { IoMdSunny } from "react-icons/io";
import { FaMoon } from "react-icons/fa";
// Iconos para el toggle
import { BiSolidToggleLeft } from "react-icons/bi";
import { BiSolidToggleRight } from "react-icons/bi";
// Icono para el logout
import { ImExit } from "react-icons/im";
//__________ICONOS__________
// Estilos personalizados
import { Container_Row_90_Right } from "../styled/Containers";
import { Button_Icon_Blue_80,Button_Icon_Red_80 } from "../styled/Buttons";
import { Icon_Button_Black_30,Icon_White_18 } from "../styled/Icons";
//____________IMPORT/EXPORT____________

// Componente para la configuración visual de la página o cerrar sesión
export default function Setting_Bar(){
    // Constantes con el valor de los contextos
    const [themeMode] = useContext(ThemeModeContext);
    const [isSidebar] = useContext(SidebarContext);
    const [isLogged] = useContext(LoggedLoggedContext);
    const [isTypeUser] = useContext(LoggedTypeContext);
    // Constantes con la funcionalidad de los hooks
    const navigate = useNavigate();
    const toggleThemeMode = ToggleThemeMode();
    const toggleSidebar = ToggleSidebar();
    const handleModalView = HandleModalView();
    // Estructura del componente
    return(
        <>
            <Container_Row_90_Right>
                {isLogged ? (
                    <>  
                        <Tooltip title='Salir' placement="bottom">
                            <Button_Icon_Red_80 ThemeMode={themeMode} onClick={() => {
                                handleModalView('Out-Login');
                                navigate(isTypeUser === 'Cook' || isTypeUser === 'Nutritionist' || isTypeUser === 'Doctor' ? '/Kitchen/Out_Login' : '/Administration/Out_Login',{ replace: true });
                            }}>
                                <Icon_White_18><ImExit/></Icon_White_18>
                            </Button_Icon_Red_80>
                        </Tooltip>
                        <Tooltip title={isSidebar ? 'Ocultar' : 'Mostrar'} placement="bottom">
                            <Button_Icon_Blue_80 ThemeMode={themeMode} onClick={() => toggleSidebar()}>
                                {isSidebar ? <Icon_White_18><BiSolidToggleRight/></Icon_White_18> : <Icon_White_18><BiSolidToggleLeft/></Icon_White_18>}
                            </Button_Icon_Blue_80>
                        </Tooltip>
                    </>
                ):(
                    <></>
                )}
                <Tooltip title={themeMode ? 'Modo Claro' : 'Modo Oscuro'} placement="left">
                    <Icon_Button_Black_30 ThemeMode={themeMode} onClick={() => toggleThemeMode()}>
                        {themeMode ? <IoMdSunny/> : <FaMoon/>}
                    </Icon_Button_Black_30>
                </Tooltip>
            </Container_Row_90_Right>
        </>
    );
}