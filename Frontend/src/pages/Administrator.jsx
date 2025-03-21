import { useEffect,useContext } from "react";
import { Toaster } from 'sonner';

import { toastContext,visibleContext } from "../contexts/VariablesProvider";
import { userContext } from "../contexts/UsersProvider";
import { modalOutLoginContext } from "../contexts/ModalsProvider";
import { sidebarContext } from "../contexts/ViewsProvider";

import { Background_Administration } from "../components/styled/Backgrounds";
import { Alert_Greeting,Toast_Styles } from "../components/styled/Notifications";

import Footer from '../components/footer/Footer'
import Sidebar from "../components/sidebar/Sidebar";
import OutLogin from "../components/modals/OutLogin";
import Home from "../components/pages/general/Home";
import Users from "../components/pages/administration/Users";

export default function Administrator(){
    const [isModalOutLogin] = useContext(modalOutLoginContext);
    const [sidebar] = useContext(sidebarContext);
    const [visible] = useContext(visibleContext);
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
                        <Background_Administration sidebarVisible={visible}>
                            {sidebar === 'Inicio' ? (
                                <Home/>
                            ):(
                                <></>
                            )}
                            {sidebar === 'Usuarios' ? (
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