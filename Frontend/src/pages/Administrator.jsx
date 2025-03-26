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
import UserEnable from '../components/modals/UserEnable';

export default function Administrator(){

    const [isModal] = useContext(modalContext);
    const [isOptionModal] = useContext(optionModalContext);
    const [isSidebar] = useContext(sidebarContext);
    const [isVisible] = useContext(visibleContext);
    const [isToast] = useContext(toastContext);
    const [isUser] = useContext(userContext);
    
    useEffect(() => {
        document.title = "MEALSYNC_Administración_Inicio"
        Alert_Greeting("MEALSYNC",'¡Le ofrece las siguientes opciones de administración!...','Blue');
        Alert_Greeting('Bienvenido(a)',`¡${isUser.nombrecorto}!...`,'Blue');
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
                        {isOptionModal === 'Habilitar-Usuario' ? (
                            isModal ? (
                                <UserEnable/>
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