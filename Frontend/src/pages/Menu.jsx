import { useEffect,useContext } from "react";
import { Toaster } from 'sonner';

import { typeUserContext } from "../contexts/TypeUserProvider";
import { modalOutLoginContext,modalShoppingCartContext } from "../contexts/ModalsProvider";
import { sidebarContext } from "../contexts/ViewsProvider";
import { toastContext,visibleContext } from "../contexts/VariablesProvider";
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
    const [typeUser] = useContext(typeUserContext);
    const [sidebar] = useContext(sidebarContext);
    const [isModalOutLogin] = useContext(modalOutLoginContext);
    const [isModalShoppingCart] = useContext(modalShoppingCartContext);
    const [visible] = useContext(visibleContext);
    const [user,setUser] = useContext(userContext);

    const [toast] = useContext(toastContext);

    useEffect(() => {
            if(typeUser === 'Medico'){
                document.title = "MEALSYNC_Inicio_Comprobación"
            }else{
                document.title = "MEALSYNC_Menú_Inicio"
            }
            Alert_Greeting("MEALSYNC",'¡Le ofrece las siguientes opciones de menú!...','Blue');
            Alert_Greeting('Bienvenido(a)',`¡${user.nombrecorto}!...`,'Blue');
    },[]);

    return(
        <div className="app-container">
            <div className="background-menu">
                <Sidebar/>
                <div id="content">
                    <div id="main-content">
                        <Background_Menu sidebarVisible={visible}>
                            {sidebar === 'Inicio' ? (
                                <Home/>
                            ):(
                                <OptionsMenu/>
                            )}
                        </Background_Menu>
                        {typeUser === 'Medico' ? (
                            <AlertMedico/>
                        ):(
                            <></>
                        )}
                        {isModalOutLogin ? (
                            <OutLogin/>
                        ):(
                            <></>
                        )}
                        {isModalShoppingCart ? (
                            <ShoppingCart/>
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