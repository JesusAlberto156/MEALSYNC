//____________IMPORT/EXPORT____________
// Hooks de React
import { useContext } from "react";
// Componentes de React externos
import { Tooltip } from "@mui/material";
// Servicios

// Rutas

// Contextos
import { themeModeContext,navbarViewContext,sidebarViewContext } from "../../contexts/ViewsProvider";
// Hooks personalizados
import { useChangeNavbarView } from "../../hooks/Views";
//__________ICONOS__________
// Iconos para la opcion de usuarios del navbar
import { FaUserTag } from "react-icons/fa6";
import { FaUserLock } from "react-icons/fa6";
import { FaUserClock } from "react-icons/fa6";
//__________ICONOS__________
// Estilos personalizados
import { Container_Navbar_Light,Container_Navbar_Button_Light,Container_Navbar_Dark,Container_Navbar_Button_Dark } from "../styled/Containers";
import { Img_Logo_Hospital_Light,Img_Logo_Hospital_Dark} from '../styled/Imgs';
import { Button_Icon_White_100_Light,Button_Icon_White_100_Dark } from '../styled/Buttons';
import { Text_Title_Fade_30__Light,Text_Title_Fade_30__Dark } from '../styled/Text';
// Componentes personalizados

//____________IMPORT/EXPORT____________

// Componente para navegar entre las paginas en la parte superior 
export default function Navbar(){
    // Constantes con el valor de los contextos 
    const [themeMode] = useContext(themeModeContext);
    const [currentNView] = useContext(navbarViewContext);
    const [currentSView] = useContext(sidebarViewContext);
    // Constantes con la funcionalidad de los hooks
    const changeNavbarView = useChangeNavbarView();
    // Estructura del componente
    return(
        <>
            {themeMode ? (
                <>
                    <Container_Navbar_Light> 
                        <Img_Logo_Hospital_Light/> 
                        <Container_Navbar_Button_Light>
                            {currentSView === 'Users' ? (
                                <>
                                    <Tooltip title='Principal' placement="right-start">
                                        <Button_Icon_White_100_Light onClick={() => changeNavbarView('Principal')}><FaUserTag/></Button_Icon_White_100_Light>
                                    </Tooltip>
                                    <Tooltip title='Permisos' placement="right-start">
                                        <Button_Icon_White_100_Light onClick={() => changeNavbarView('Permissions')}><FaUserLock/></Button_Icon_White_100_Light>
                                    </Tooltip>
                                    <Tooltip title='Estatus' placement="right-start">
                                        <Button_Icon_White_100_Light onClick={() => changeNavbarView('Status')}><FaUserClock/></Button_Icon_White_100_Light>
                                    </Tooltip>
                                    {currentNView === 'Principal' ? (
                                        <Text_Title_Fade_30__Light>USUARIOS</Text_Title_Fade_30__Light>
                                    ):(
                                        currentNView === 'Permissions' ? (
                                            <Text_Title_Fade_30__Light>PERMISOS</Text_Title_Fade_30__Light>
                                        ):(
                                            currentNView === 'Status' ? (
                                                <Text_Title_Fade_30__Light>ESTATUS</Text_Title_Fade_30__Light>
                                            ):(
                                                <></>
                                            )
                                        )
                                    )}
                                </>
                            ):(
                                <></>
                            )}
                        </Container_Navbar_Button_Light>
                    </Container_Navbar_Light>  
                </>
            ):(
                <>
                    <Container_Navbar_Dark> 
                        <Img_Logo_Hospital_Dark/> 
                        <Container_Navbar_Button_Dark>
                            {isSidebar === 'Users' ? (
                                <>
                                    <Tooltip title='Principal' placement="right-start">
                                        <Button_Icon_White_100_Dark onClick={() => navbarViews('Principal')}><FaUserTag/></Button_Icon_White_100_Dark>
                                    </Tooltip>
                                    <Tooltip title='Permisos' placement="right-start">
                                        <Button_Icon_White_100_Dark onClick={() => navbarViews('Permissions')}><FaUserLock/></Button_Icon_White_100_Dark>
                                    </Tooltip>
                                    <Tooltip title='Estatus' placement="right-start">
                                        <Button_Icon_White_100_Dark onClick={() => navbarViews('Status')}><FaUserClock/></Button_Icon_White_100_Dark>
                                    </Tooltip>
                                    {isNavbar === 'Principal' ? (
                                        <Text_Title_Fade_30__Dark>USUARIOS</Text_Title_Fade_30__Dark>
                                    ):(
                                        isNavbar === 'Permissions' ? (
                                            <Text_Title_Fade_30__Dark>PERMISOS</Text_Title_Fade_30__Dark>
                                        ):(
                                            isNavbar === 'Status' ? (
                                                <Text_Title_Fade_30__Dark>ESTATUS</Text_Title_Fade_30__Dark>
                                            ):(
                                                <></>
                                            )
                                        )
                                    )}
                                </>
                            ):(
                                <></>
                            )}
                        </Container_Navbar_Button_Dark>
                    </Container_Navbar_Dark>
                </>
            )}
        </>
    );
}