//____________IMPORT/EXPORT____________
// Hooks de React
import { useContext } from "react";
// Componentes de React externos
import { Tooltip } from "@mui/material";
// Servicios

// Rutas

// Contextos
import { sidebarContext } from "../../contexts/ViewsProvider";
import { navbarContext } from "../../contexts/ViewsProvider";
import { modeContext } from "../../contexts/VariablesProvider";
import { useNavbarViews } from '../../hooks/Navbar'
// Hooks personalizados

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
    const [isMode] = useContext(modeContext);
    const [isSidebar] = useContext(sidebarContext);
    const [isNavbar] = useContext(navbarContext);
    // Constantes con la funcionalidad de los hooks
    const navbarViews = useNavbarViews();
    // Estructura del componente
    return(
        <>
            {isMode ? (
                <>
                    <Container_Navbar_Light> 
                        <Img_Logo_Hospital_Light/> 
                        <Container_Navbar_Button_Light>
                            {isSidebar === 'Users' ? (
                                <>
                                    <Tooltip title='Principal' placement="right-start">
                                        <Button_Icon_White_100_Light onClick={() => navbarViews('Principal')}><FaUserTag/></Button_Icon_White_100_Light>
                                    </Tooltip>
                                    <Tooltip title='Permisos' placement="right-start">
                                        <Button_Icon_White_100_Light onClick={() => navbarViews('Permissions')}><FaUserLock/></Button_Icon_White_100_Light>
                                    </Tooltip>
                                    <Tooltip title='Estatus' placement="right-start">
                                        <Button_Icon_White_100_Light onClick={() => navbarViews('Status')}><FaUserClock/></Button_Icon_White_100_Light>
                                    </Tooltip>
                                    {isNavbar === 'Principal' ? (
                                        <Text_Title_Fade_30__Light>USUARIOS</Text_Title_Fade_30__Light>
                                    ):(
                                        isNavbar === 'Permissions' ? (
                                            <Text_Title_Fade_30__Light>PERMISOS</Text_Title_Fade_30__Light>
                                        ):(
                                            isNavbar === 'Status' ? (
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