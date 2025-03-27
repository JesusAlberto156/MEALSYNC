import { useEffect,useContext } from "react";
import { Toaster } from 'sonner';

import { toastContext,visibleContext,modalContext,optionModalContext } from "../contexts/VariablesProvider";
import { userContext } from "../contexts/UsersProvider";
import { sidebarContext } from "../contexts/ViewsProvider";

import { Background_Administration } from "../components/styled/Backgrounds";
import { Alert_Greeting,Toast_Styles } from "../components/styled/Notifications";

import Footer from '../components/footer/Footer'
import Sidebar from "../components/sidebar/Sidebar";
import OutLogin from "../components/modals/OutLogin";
import Home from "../components/pages/general/Home";
import Users from "../components/pages/administration/Users";
import PermissionsAdd from '../components/modals/permissions/PermissionsAdd'
import PermissionsEdit from '../components/modals/permissions/PermissionsEdit'
import PermissionsDelete from '../components/modals/permissions/PermissionsDelete'
import PermissionsSuperAdministrator from '../components/modals/permissions/PermissionsSuperAdministrator'
import StatusAdd from '../components/modals/status/StatusAdd';
import StatusEnable from '../components/modals/status/StatusEnable';
import StatusDelete from '../components/modals/status/StatusDelete';

export default function Administrator(){

    const [isModal] = useContext(modalContext);
    const [isOptionModal] = useContext(optionModalContext);
    const [isSidebar] = useContext(sidebarContext);
    const [isVisible] = useContext(visibleContext);
    const [isToast] = useContext(toastContext);
    const [isUser] = useContext(userContext);
    
    useEffect(() => {
        document.title = "MEALSYNC_Administración_Inicio"
        Alert_Greeting("MEALSYNC",'¡Le ofrece las siguientes opciones de administración!...');
        Alert_Greeting('Bienvenido(a)',`¡${isUser.nombrecorto}!...`);
    },[]);

    return(
        <div className="app-container">
            <div className="background-administrator">
                <Sidebar/>
                <div id="content">
                    <div id="main-content">
                        <Background_Administration sidebarVisible={isVisible}>
                            {isSidebar === 'Inicio' ? (
                                <Home/>
                            ):(
                                <></>
                            )}
                            {isSidebar === 'Usuarios' ? (
                                <Users/>
                            ):(
                                <></>
                            )}
                        </Background_Administration>
                        {isOptionModal === 'Cerrar-Sesion' ? (
                            isModal ? (
                                <OutLogin/>
                            ):(
                                <></>
                            )
                        ):(
                            <></>
                        )}
                        {isOptionModal === 'Agregar-Permisos' ? (
                            isModal ? (
                                <PermissionsAdd/>
                            ):(
                                <></>
                            )
                        ):(
                            <></>
                        )}
                        {isOptionModal === 'Editar-Permisos' ? (
                            isModal ? (
                                <PermissionsEdit/>
                            ):(
                                <></>
                            )
                        ):(
                            <></>
                        )}
                        {isOptionModal === 'Eliminar-Permisos' ? (
                            isModal ? (
                                <PermissionsDelete/>
                            ):(
                                <></>
                            )
                        ):(
                            <></>
                        )}
                        {isOptionModal === 'Super-Administrador-Permisos' ? (
                            isModal ? (
                                <PermissionsSuperAdministrator/>
                            ):(
                                <></>
                            )
                        ):(
                            <></>
                        )}
                        {isOptionModal === 'Agregar-Estatus' ? (
                            isModal ? (
                                <StatusAdd/>
                            ):(
                                <></>
                            )
                        ):(
                            <></>
                        )}
                        {isOptionModal === 'Habilitar-Estatus' ? (
                            isModal ? (
                                <StatusEnable/>
                            ):(
                                <></>
                            )
                        ):(
                            <></>
                        )}
                        {isOptionModal === 'Eliminar-Estatus' ? (
                            isModal ? (
                                <StatusDelete/>
                            ):(
                                <></>
                            )
                        ):(
                            <></>
                        )}
                    </div>
                </div>
            </div>
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
        </div>
    );
}