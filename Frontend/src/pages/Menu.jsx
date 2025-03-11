import { useEffect,useContext } from "react";
import { ToastContainer } from "react-toastify";
import { typeUserContext } from "../contexts/TypeUserProvider";
import { viewSidebarContext } from "../contexts/SwitchViewSidebarProvider";
import { modalOutLoginContext,modalShoppingCartContext } from "../contexts/ModalsProvider";
import { sidebarVisibleContext } from "../contexts/SidebarVisibleProvider";

import Home from '../components/menu/Home';
import OptionsMenu from '../components/menu/OptionsMenu';

import { Alert_Blue } from "../components/styled/Notifications";

import OutLogin from "../components/modals/OutLogin";
import AlertMedico from "../components/modals/AlertMedico";
import ShoppingCart from "../components/modals/ShoppingCart";

import { Background_Menu } from "../components/styled/Backgrounds";

import Sidebar from "../components/sidebar/Sidebar";
import Footer from "../components/footer/Footer";

export default function Menu(){
    const [typeUser] = useContext(typeUserContext);
    const [viewSidebar] = useContext(viewSidebarContext);
    const [isModalOutLogin] = useContext(modalOutLoginContext);
    const [isModalShoppingCart] = useContext(modalShoppingCartContext);
    const [sidebarVisible] = useContext(sidebarVisibleContext);
    
    useEffect(() => {
            document.title = "MEALSYNC_Menú_Inicio"
            Alert_Blue("¡Bienvenido(a) a MEALSYNC!");
    },[]);

    return(
        <div className="app-container">
            <div className="background-menu">
                <Sidebar/>
                <div id="content">
                    <div id="main-content">
                        <Background_Menu sidebarVisible={sidebarVisible}>
                            {viewSidebar === 'Menu' ? (
                                <OptionsMenu/>
                            ):(
                                <Home/>
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
        </div>
    );
}