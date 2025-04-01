//____________IMPORT/EXPORT____________
// Hooks de React
import { useContext } from "react";
// Componentes de React externos
import { Tooltip } from "@mui/material";
// Servicios

// Rutas

// Contextos
import { modeContext } from "../../contexts/VariablesProvider";
import { visibleContext } from "../../contexts/VariablesProvider";
import { loggedContext } from "../../contexts/SessionProvider";
// Hooks personalizados
import { useChangeMode,useToggleSidebar } from "../../hooks/Setting";
import { useOpenModal } from "../../hooks/Modal";
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
import { Container_Setting_Light,Container_Setting_Dark } from "../styled/Containers";
import { Button_Icon_Toggle_Light,Button_Icon_Logout_Light,Button_Icon_Light,Button_Icon_Toggle_Dark,Button_Icon_Logout_Dark,Button_Icon_Dark } from "../styled/Buttons";
// Componentes personalizados

//____________IMPORT/EXPORT____________

// Componente para la configuración visual de la página o cerrar sesión
export default function Setting(){
    // Constantes con el valor de los contextos
    const [isMode] = useContext(modeContext);
    const [isVisible] = useContext(visibleContext);
    const [isLogged] = useContext(loggedContext);
    // Constantes con la funcionalidad de los hooks
    const changeMode = useChangeMode();
    const openModal = useOpenModal();
    const toggleSidebar = useToggleSidebar();
    // Estructura del componente
    return(
        <>
            {isMode ? (
                <>
                    <Container_Setting_Light>
                        {isLogged ? (
                            <>
                                {isVisible ? (
                                    <Tooltip title='Ocultar' placement="bottom">
                                        <Button_Icon_Toggle_Light onClick={() => toggleSidebar()}><BsToggleOn /></Button_Icon_Toggle_Light>
                                    </Tooltip>
                                ):(
                                    <Tooltip title='Mostrar' placement="bottom">
                                        <Button_Icon_Toggle_Light onClick={() => toggleSidebar()}><BsToggleOff /></Button_Icon_Toggle_Light>
                                    </Tooltip>
                                )}
                                <Tooltip title='Salir' placement="bottom">
                                    <Button_Icon_Logout_Light onClick={() => openModal('Out-Login')}><FaSignOutAlt/></Button_Icon_Logout_Light>
                                </Tooltip>
                            </>
                        ):(
                            <></>
                        )}
                        <Tooltip title='Modo Claro' placement="left">
                            <Button_Icon_Light onClick={() => changeMode()}><IoMdSunny/></Button_Icon_Light>
                        </Tooltip>
                    </Container_Setting_Light>
                </>
            ):(
                <>
                    <Container_Setting_Dark>
                        {isLogged ? (
                            <>
                                {isVisible ? (
                                    <Tooltip title='Ocultar' placement="bottom">
                                        <Button_Icon_Toggle_Dark onClick={() => toggleSidebar()}><BsToggleOn /></Button_Icon_Toggle_Dark>
                                    </Tooltip>
                                ):(
                                    <Tooltip title='Mostrar' placement="bottom">
                                        <Button_Icon_Toggle_Dark onClick={() => toggleSidebar()}><BsToggleOff /></Button_Icon_Toggle_Dark>
                                    </Tooltip>
                                )}
                                <Tooltip title='Salir' placement="bottom">
                                    <Button_Icon_Logout_Dark onClick={() => openModal('Out-Login')}><FaSignOutAlt/></Button_Icon_Logout_Dark>
                                </Tooltip>
                            </>
                        ):(
                            <></>
                        )}
                        <Tooltip title='Modo Oscuro' placement="left">
                            <Button_Icon_Dark onClick={() => changeMode()}><FaMoon/></Button_Icon_Dark>
                        </Tooltip>
                    </Container_Setting_Dark>
                </>
            )}
        </>
    );
}