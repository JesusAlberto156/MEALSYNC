//____________IMPORT/EXPORT____________
// Hooks de React
import { useEffect,useContext } from "react";
// Componentes de React externos
import { Toaster } from 'sonner';
// Servicios

// Rutas

// Contextos
import { modeContext } from "../contexts/VariablesProvider";
import { toastContext,visibleContext,modalContext,optionModalContext } from "../contexts/VariablesProvider";
import { userContext } from "../contexts/UsersProvider";
import { sidebarContext } from "../contexts/ViewsProvider";
// Hooks personalizados

//__________ICONOS__________

//__________ICONOS__________
// Estilos personalizados
import { Container_Page,Container_Page_Elements,Container_Page_Administration_Light,Container_Page_Administration_Dark } from "../components/styled/Containers";
import { Alert_Greeting,Toast_Styles } from "../components/styled/Notifications";
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
    // Estructura del componente
    return(
        <Container_Page>
            {isMode ? (
                <>
                    <Container_Page_Administration_Light>
                        <Sidebar/>
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
                        <Footer/>
                        {isToast ? (
                            <Toast_Styles>
                                <Toaster
                                visibleToasts={3}
                                richColors
                                theme='light'
                                position='top-right'
                                />
                            </Toast_Styles>
                        ):(
                            <Toast_Styles>
                                <Toaster
                                visibleToasts={3}
                                richColors
                                theme='dark'
                                position='top-right'
                                />
                            </Toast_Styles>
                        )}
                    </Container_Page_Administration_Light>
                </>
            ):(
                <>
                    <Container_Page_Administration_Dark>
                        <Sidebar/>
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
                        <Footer/>
                        {isToast ? (
                            <Toast_Styles>
                                <Toaster
                                visibleToasts={3}
                                richColors
                                theme='light'
                                position='top-right'
                                />
                            </Toast_Styles>
                        ):(
                            <Toast_Styles>
                                <Toaster
                                visibleToasts={3}
                                richColors
                                theme='dark'
                                position='top-right'
                                />
                            </Toast_Styles>
                        )}
                    </Container_Page_Administration_Dark>
                </>
            )}
        </Container_Page>
    );
}