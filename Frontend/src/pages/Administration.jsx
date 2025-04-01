//____________IMPORT/EXPORT____________
// Hooks de React
import { useEffect,useContext } from "react";
// Componentes de React externos
import { Toaster } from 'sonner';
import { Tooltip } from "@mui/material";
// Servicios

// Rutas

// Contextos
import { modeContext } from "../contexts/VariablesProvider";
import { toastContext,visibleContext,modalContext,optionModalContext } from "../contexts/VariablesProvider";
import { userContext } from "../contexts/UsersProvider";
import { sidebarContext } from "../contexts/ViewsProvider";
// Hooks personalizados
import { useChangeMode } from "../hooks/Mode";
//__________ICONOS__________
// Icono para cambiar el modo de la interfaz
import { IoMdSunny } from "react-icons/io";
import { FaMoon } from "react-icons/fa";
//__________ICONOS__________
// Estilos personalizados
import { Container_Page,Container_Page_Elements,Container_Page_Administration_Light,Container_Page_Administration_Dark } from "../components/styled/Containers";
import { Alert_Greeting,Alert_Styles } from "../components/styled/Notifications";
import { Button_Icon_Light,Button_Icon_Dark } from "../components/styled/Buttons";
// Componentes personalizados
import Footer from '../components/footer/Footer'
import Sidebar from "../components/sidebar/Sidebar";
import OutLogin from "../components/modals/General/OutLogin";
import Home from "../components/pages/general/Home";
import Users from "../components/pages/administration/Users";
import PermissionsAdd from '../components/modals/permissions/PermissionsAdd';
import PermissionsEdit from '../components/modals/permissions/PermissionsEdit';
import PermissionsDelete from '../components/modals/permissions/PermissionsDelete';
import PermissionsSuperAdministrator from "../components/modals/permissions/PermissionsSuperAdministrator";
import StatusAdd from "../components/modals/status/StatusAdd";
import StatusEnable from "../components/modals/status/StatusEnable";
import StatusDelete from "../components/modals/status/StatusDelete";
//____________IMPORT/EXPORT____________

// Página para mostrar el área de administración
export default function Administration(){
    // Constantes con el valor de los contextos
    const [isMode] = useContext(modeContext);
    const [isModal] = useContext(modalContext);
    const [isOptionModal] = useContext(optionModalContext);
    const [isSidebar] = useContext(sidebarContext);
    const [isVisible] = useContext(visibleContext);
    const [isToast] = useContext(toastContext);
    const [isUser] = useContext(userContext);
    // useEffect con el titulo de la página
    useEffect(() => {
        document.title = "MEALSYNC_Administración_Inicio"
        Alert_Greeting("MEALSYNC",'¡Le ofrece las siguientes opciones de administración!...');
        Alert_Greeting('Bienvenido(a)',`¡${isUser.nombrecorto}!...`);
    },[]);
    // Constantes con la funcionalidad de los hooks
    const changeMode = useChangeMode();
    // Estructura del componente
    return(
        <Container_Page>
            <Sidebar/>
            {isMode ? (
                <>
                    <Container_Page_Administration_Light>
                        <Tooltip title='Modo Claro' placement="left">
                            <Button_Icon_Light onClick={() => changeMode()}><IoMdSunny/></Button_Icon_Light>
                        </Tooltip>
                        <Container_Page_Elements sidebarVisible={isVisible}>
                            {isSidebar === 'Home' ? (
                                <Home/>
                            ):(
                                <></>
                            )}
                            {isSidebar === 'Users' ? (
                                <Users/>
                            ):(
                                <></>
                            )}
                        </Container_Page_Elements>
                        {isOptionModal === 'Out-Login' ? (
                            isModal ? (
                                <OutLogin/>
                            ):(
                                <></>
                            )
                        ):(
                            <></>
                        )}
                        {isOptionModal === 'Permissions-Add' ?(
                            isModal ? (
                                <PermissionsAdd/>
                            ):(
                                <></>
                            )
                        ):(
                            <></>
                        )}
                        {isOptionModal === 'Permissions-Edit' ?(
                            isModal ? (
                                <PermissionsEdit/>
                            ):(
                                <></>
                            )
                        ):(
                            <></>
                        )}
                        {isOptionModal === 'Permissions-Delete' ?(
                            isModal ? (
                                <PermissionsDelete/>
                            ):(
                                <></>
                            )
                        ):(
                            <></>
                        )}
                        {isOptionModal === 'Permissions-Super-Administrator' ?(
                            isModal ? (
                                <PermissionsSuperAdministrator/>
                            ):(
                                <></>
                            )
                        ):(
                            <></>
                        )}
                        {isOptionModal === 'Status-Add' ? (
                            isModal ? (
                                <StatusAdd/>
                            ):(
                                <></>
                            )
                        ):(
                            <></>
                        )}
                        {isOptionModal === 'Status-Enable' ? (
                            isModal ? (
                                <StatusEnable/>
                            ):(
                                <></>
                            )   
                        ):(
                            <></>
                        )}
                        {isOptionModal === 'Status-Delete' ? (
                            isModal ? (
                                <StatusDelete/>
                            ):(
                                <></>
                            )   
                        ):(
                            <></>
                        )}
                        <Alert_Styles>
                            <Toaster
                                visibleToasts={3}
                                richColors
                                theme='light'
                                position='top-right'
                            />
                        </Alert_Styles>
                    </Container_Page_Administration_Light>
                </>
            ):(
                <>
                    <Container_Page_Administration_Dark>
                        <Tooltip title='Modo Oscuro' placement="left">
                            <Button_Icon_Dark onClick={() => changeMode()}><FaMoon/></Button_Icon_Dark>
                        </Tooltip>
                        <Container_Page_Elements sidebarVisible={isVisible}>
                            {isSidebar === 'Home' ? (
                                <Home/>
                            ):(
                                <></>
                            )}
                            {isSidebar === 'Users' ? (
                                <Users/>
                            ):(
                                <></>
                            )}
                        </Container_Page_Elements>
                        {isOptionModal === 'Out-Login' ? (
                            isModal ? (
                                <OutLogin/>
                            ):(
                                <></>
                            )
                        ):(
                            <></>
                        )}
                        {isOptionModal === 'Permissions-Add' ?(
                            isModal ? (
                                <PermissionsAdd/>
                            ):(
                                <></>
                            )
                        ):(
                            <></>
                        )}
                        {isOptionModal === 'Permissions-Edit' ?(
                            isModal ? (
                                <PermissionsEdit/>
                            ):(
                                <></>
                            )
                        ):(
                            <></>
                        )}
                        {isOptionModal === 'Permissions-Delete' ?(
                            isModal ? (
                                <PermissionsDelete/>
                            ):(
                                <></>
                            )
                        ):(
                            <></>
                        )}
                        {isOptionModal === 'Permissions-Super-Administrator' ?(
                            isModal ? (
                                <PermissionsSuperAdministrator/>
                            ):(
                                <></>
                            )
                        ):(
                            <></>
                        )}
                        {isOptionModal === 'Status-Add' ? (
                            isModal ? (
                                <StatusAdd/>
                            ):(
                                <></>
                            )
                        ):(
                            <></>
                        )}
                        {isOptionModal === 'Status-Enable' ? (
                            isModal ? (
                                <StatusEnable/>
                            ):(
                                <></>
                            )   
                        ):(
                            <></>
                        )}
                        {isOptionModal === 'Status-Delete' ? (
                            isModal ? (
                                <StatusDelete/>
                            ):(
                                <></>
                            )   
                        ):(
                            <></>
                        )}
                        <Alert_Styles>
                            <Toaster
                                visibleToasts={3}
                                richColors
                                theme='dark'
                                position='top-right'
                            />
                        </Alert_Styles>
                    </Container_Page_Administration_Dark>
                </>
            )}
            <Footer/>
        </Container_Page>
    );
}