import { useEffect,useContext } from "react";
import { Toaster } from 'sonner';

import { typeUserContext } from "../contexts/TypeUserProvider";
import { sidebarContext } from "../contexts/ViewsProvider";
import { toastContext,visibleContext,modalContext } from "../contexts/VariablesProvider";
import { userContext } from "../contexts/UsersProvider";

import { Alert_Greeting,Toast_Styles } from "../components/styled/Notifications";
import { Background_Menu } from "../components/styled/Backgrounds";

import OutLogin from "../components/modals/OutLogin";
import AlertMedico from "../components/modals/AlertMedico";
import ShoppingCart from "../components/modals/ShoppingCart";
import Home from '../components/pages/general/Home';
import OptionsMenu from '../components/pages/menu/OptionsMenu';
import Sidebar from "../components/sidebar/Sidebar";
import Footer from "../components/footer/Footer";

export default function Menu(){
    
    const [isTypeUser] = useContext(typeUserContext);
    const [isSidebar] = useContext(sidebarContext);
    const [isVisible] = useContext(visibleContext);
    const [isUser] = useContext(userContext);
    const [isModal] = useContext(modalContext);
    const [isToast] = useContext(toastContext);

    useEffect(() => {
            if(isTypeUser === 'Medico'){
                document.title = "MEALSYNC_Inicio_Comprobación"
            }else{
                document.title = "MEALSYNC_Menú_Inicio"
            }
            Alert_Greeting("MEALSYNC",'¡Le ofrece las siguientes opciones de menú!...','Blue');
            Alert_Greeting('Bienvenido(a)',`¡${isUser.nombrecorto}!...`,'Blue');
    },[]);

    return(
        <div className="app-container">
            <div className="background-menu">
                <Sidebar/>
                <div id="content">
                    <div id="main-content">
                        <Background_Menu sidebarVisible={isVisible}>
                            {isSidebar === 'Inicio' ? (
                                <Home/>
                            ):(
                                <OptionsMenu/>
                            )}
                        </Background_Menu>
                        {isTypeUser === 'Medico' ? (
                            <AlertMedico/>
                        ):(
                            <></>
                        )}
                        {isSidebar === 'OutLogin' ? (
                            isModal ? (
                                <OutLogin/>
                            ):(
                                <></>
                            )
                        ):(
                            isModal ? (
                                <ShoppingCart/>    
                            ):(
                                <></>
                            )
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