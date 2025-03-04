import { useLocation } from "react-router-dom";
import { useState,useEffect } from "react";
import { ToastContainer } from "react-toastify";

import Home from '../components/menu/Home';
import OptionsMenu from '../components/menu/Menu';

import { Alert_Blue,Alert_Green } from "../components/styled/Notifications";
import OutLogin from "../components/modals/OutLogin";
import { Background } from "../components/styled/Menu";

import Sidebar from "../components/sidebar/Sidebar";
import Navbar from "../components/navbar/Navbar";
import Footer from "../components/footer/Footer";
import Medico from "../components/modals/Medico";

export default function Menu(){

    const location = useLocation();
    const user = location.state?.user || '';
    
    const [activeView, setActiveView] = useState('Inicio')
    const switchView = (view) => setActiveView(view);
 
    const[activeOption, setActiveOption] = useState('Inicio')

    const [modalOutLogin,setModalOutLogin] = useState(false);
    const [modalMedico,setModalMedico] = useState(true);

    useEffect(() => {
            document.title = "MEALSYNC_Menú"
            Alert_Green('¡Sesión iniciada!')
            Alert_Blue("¡Bienvenido(a) a MEALSYNC!");
    },[]);

    const [sidebarVisible,isSidebarVisible] = useState(true);

    return(
        <div className="app-container">
                <div className="background-menu">
                <ToastContainer
                    position="top-right"
                    autoClose={5000}
                    closeOnClick
                    pauseOnHover
                    dragga
                    limit={5}
                />
                <Sidebar 
                    user={user} 
                    onSwitchView={switchView} 
                    isModalOutLogin={setModalOutLogin} 
                    isSidebarVisible={isSidebarVisible}
                    setActiveOption={setActiveOption}
                />
                    <div id="content">
                        <div id="main-content">
                            <Background sidebarVisible={sidebarVisible}>
                                {activeOption === 'Inicio' ? (
                                    <></>
                                ):(
                                    <Navbar setActiveOption={activeOption}/>
                                )}
                            {activeView === 'Inicio' ? (
                                <Home/>
                            ):(
                                <></>
                            )}
                            {activeView === 'Menu' ? (
                                <OptionsMenu/>
                            ):(
                                <></>
                            )}
                            {user === 'Medico' ? (
                                <Medico isModal={setModalMedico}/>
                            ):(
                                <></>
                            )}
                            </Background>
                            {modalOutLogin ? (
                                <OutLogin isModal={setModalOutLogin}/>
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