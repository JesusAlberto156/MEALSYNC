import { useEffect,useContext } from "react";
import { Toaster } from 'sonner';
import { Alert_Greeting,Toast_Styles } from "../components/styled/Notifications";
import { toastContext } from '../contexts/ToastProvider';
import { userContext } from "../contexts/UserProvider";
import { modalOutLoginContext } from "../contexts/ModalsProvider";
import { sidebarVisibleContext } from "../contexts/SidebarVisibleProvider";
import { viewSidebarContext } from "../contexts/SwitchViewSidebarProvider";

import { Background_Administration } from "../components/styled/Backgrounds";

import Footer from '../components/footer/Footer'
import Sidebar from "../components/sidebar/Sidebar";
import OutLogin from "../components/modals/OutLogin";
import Home from "../components/pages/general/Home";
import Users from "../components/pages/administration/Users";

export default function Administrator(){
    const [isModalOutLogin] = useContext(modalOutLoginContext);
    const [viewSidebar] = useContext(viewSidebarContext);
    const [sidebarVisible] = useContext(sidebarVisibleContext);
    const [toast] = useContext(toastContext);
    const [user,setUser] = useContext(userContext);
    
    useEffect(() => {
        document.title = "MEALSYNC_Administración_Inicio"
        Alert_Greeting("MEALSYNC",'¡Le ofrece las siguientes opciones de administración!...','Blue');
        Alert_Greeting('Bienvenido(a)',`¡${user.nombrecorto}!...`,'Blue');
    },[]);

    return(
        <div className="app-container">
            <div className="background-administrator">
                <Sidebar/>
                <div id="content">
                    <div id="main-content">
                        <Background_Administration sidebarVisible={sidebarVisible}>
                            {viewSidebar === 'Inicio' ? (
                                <Home/>
                            ):(
                                <></>
                            )}
                            {viewSidebar === 'Usuarios' ? (
                                <Users/>
                            ):(
                                <></>
                            )}
                        </Background_Administration>
                        {isModalOutLogin ? (
                            <OutLogin/>
                        ):(
                            <></>
                        )}
                    </div>
                </div>
            </div>
            <Footer/>
            {toast ? (
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