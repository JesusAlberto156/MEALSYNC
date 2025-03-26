import { useEffect,useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Toaster } from 'sonner';

import { typeUserContext } from "../contexts/TypeUserProvider";
import { sidebarContext,navbarContext } from "../contexts/ViewsProvider";
import { toastContext,visibleContext,modalContext,optionModalContext,selectedRowContext,loadingOptionLoginContext,searchTermContext } from "../contexts/VariablesProvider";
import { userContext } from "../contexts/UsersProvider";
import { permissionContext } from "../contexts/PermissionsProvider";
import { statusUserContext } from "../contexts/StatusProvider";
import { loggedContext,enableContext,nameContext,passwordContext,logContext } from "../contexts/SessionProvider";

import { Alert_Greeting,Toast_Styles,Alert_Verification } from "../components/styled/Notifications";
import { Background_Menu } from "../components/styled/Backgrounds";

import OutLogin from "../components/modals/OutLogin";
import AlertMedico from "../components/modals/AlertMedico";
import ShoppingCart from "../components/modals/ShoppingCart";
import Home from '../components/pages/general/Home';
import OptionsMenu from '../components/pages/menu/OptionsMenu';
import Sidebar from "../components/sidebar/Sidebar";
import Footer from "../components/footer/Footer";

export default function Menu(){
    
    const [isLoadingOptionLogin,setIsLoadingOptionLogin] = useContext(loadingOptionLoginContext);
    const [isToast,setIsToast] = useContext(toastContext);
    const [isVisible,setIsVisible] = useContext(visibleContext);
    const [isSelectedRow,setIsSelectedRow] = useContext(selectedRowContext);
    const [isSearchTerm,setIsSearchTerm] = useContext(searchTermContext);
    const [isModal,setIsModal] = useContext(modalContext);
    const [isOptionModal,setIsOptionModal] = useContext(optionModalContext);

    const [isSidebar,setIsSidebar] = useContext(sidebarContext);
    const [isNavbar,setIsNavbar] = useContext(navbarContext);

    const [isTypeUser,setIsTypeUser] = useContext(typeUserContext);
    
    const [isLogged,setIsLogged] = useContext(loggedContext);
    const [isEnable,setIsEnable] = useContext(enableContext);
    const [isName,setIsName] = useContext(nameContext);
    const [isPassword,setIsPassword] = useContext(passwordContext);

    const [isUser,setIsUser] = useContext(userContext);
    const [isPermission,setIsPermission] = useContext(permissionContext);
    const [isStatusUser,setIsStatusUser] = useContext(statusUserContext);

    const [isLog,setIsLog] = useContext(logContext);

    const navigate = useNavigate();

    useEffect(() => {
            if(isTypeUser === 'Medico'){
                document.title = "MEALSYNC_Inicio_Comprobación"
            }else{
                document.title = "MEALSYNC_Menú_Inicio"
            }
            Alert_Greeting("MEALSYNC",'¡Le ofrece las siguientes opciones de menú!...','Blue');
            Alert_Greeting('Bienvenido(a)',`¡${isUser.nombrecorto}!...`,'Blue');
    },[]);

    useEffect(() => {
        if(!isLog && isLogged){
            document.title = "Cargando...";
            const promise = new Promise(async (resolve,reject) => {
                try{
                    setIsToast(true);
                    
                    setTimeout(() => {
                        resolve('¡MEALSYNC le agradece su estancia!...');
                    },1000);

                    setTimeout(() => {
                        setIsLoadingOptionLogin('');
                        setIsToast(false);
                        setIsVisible(true);
                        setIsSelectedRow(null);
                        setIsSearchTerm('');
                        setIsModal(false);
                        setIsOptionModal('');
                        
                        setIsSidebar('Inicio');
                        setIsNavbar('');
                        
                        setIsTypeUser('');

                        setIsLogged(false);
                        setIsEnable([]);
                        setIsName('');
                        setIsPassword('');

                        setIsPermission([]);
                        setIsStatusUser([]);

                        setTimeout(() => {
                            setIsUser([]);
                            setIsLog(null);
                            sessionStorage.clear();
                            navigate("/",{replace: true});
                        },200)
                    },2000)
                }catch(error){
                    reject('¡Ocurrio un error inesperado...');
                }
            });

            Alert_Verification(promise,'¡Cerrando sesión!...','Light');
        }
    },[isLog]);

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
                        {isOptionModal === 'Alerta-Medica' ? (
                            isModal ? (
                                <AlertMedico/>
                            ):(
                                <></>
                            )
                            
                        ):(
                            <></>
                        )}
                        {isOptionModal === 'Cerrar-Sesion' ? (
                            isModal ? (
                                <OutLogin/>
                            ):(
                                <></>
                            )
                        ):(
                            <></>
                        )}
                        {isOptionModal === 'Carro-Compras' ? (
                            isModal ? (
                                <ShoppingCart/>    
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