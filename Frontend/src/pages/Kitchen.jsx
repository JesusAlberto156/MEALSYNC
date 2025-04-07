//____________IMPORT/EXPORT____________
// Hooks de React
import { useEffect,useContext } from "react";
import { useNavigate } from "react-router-dom";
// Componentes de React externos
import { Toaster } from 'sonner';
// Servicios

// Contextos
import { nameContext,passwordContext } from "../contexts/FormsProvider";
import { sidebarViewContext,navbarViewContext } from "../contexts/ViewsProvider";
import { typeUserContext,selectedRowContext,searchTermContext } from "../contexts/VariablesProvider";
import { userContext } from "../contexts/UsersProvider";
import { permissionContext } from "../contexts/PermissionsProvider";
import { statusUserContext,statusEnableContext } from "../contexts/StatusProvider";
import { loggedContext,logContext } from "../contexts/SessionProvider";
// Hooks personalizados

//__________ICONOS__________

//__________ICONOS__________
// Estilos personalizados
import { Alert_Greeting,Alert_Styles,Alert_Verification } from "../components/styled/Alerts";
import { Background_Menu } from "../components/styled/Backgrounds";
// Componentes personalizados
import Home from '../components/pages/general/Home';
import OptionsMenu from '../components/pages/menu/OptionsMenu';
import Sidebar from "../components/navegation/Sidebar";
import Footer from "../components/footer/Footer";
//____________IMPORT/EXPORT____________

export default function Kitchen(){
    
    const [isSelectedRow,setIsSelectedRow] = useContext(selectedRowContext);
    const [isSearchTerm,setIsSearchTerm] = useContext(searchTermContext);

    const [isSidebar,setIsSidebar] = useContext(sidebarViewContext);
    const [isNavbar,setIsNavbar] = useContext(navbarViewContext);

    const [isTypeUser,setIsTypeUser] = useContext(typeUserContext);
    
    const [isLogged,setIsLogged] = useContext(loggedContext);
    const [isStatusEnable,setIsStatusEnable] = useContext(statusEnableContext);
    const [isName,setIsName] = useContext(nameContext);
    const [isPassword,setIsPassword] = useContext(passwordContext);

    const [isUser,setIsUser] = useContext(userContext);
    const [isPermission,setIsPermission] = useContext(permissionContext);
    const [isStatusUser,setIsStatusUser] = useContext(statusUserContext);

    const [isLog,setIsLog] = useContext(logContext);

    const navigate = useNavigate();

    useEffect(() => {
        document.title = "MEALSYNC_Menú_Inicio"
        Alert_Greeting("MEALSYNC",'¡Le ofrece las siguientes opciones de menú!...');
        Alert_Greeting('Bienvenido(a)',`¡${isUser.nombrecorto}!...`);
    },[]);

    useEffect(() => {
        if(!isLog && isLogged){
            document.title = "Cargando...";
            const promise = new Promise(async (resolve,reject) => {
                try{
                    
                    setTimeout(() => {
                        resolve('¡MEALSYNC le agradece su estancia!...');
                    },1000);

                    setTimeout(() => {
                        setIsLoadingOptionLogin('');
                        setIsVisible(true);
                        setIsSelectedRow(null);
                        setIsSearchTerm('');
                        
                        setIsSidebar('Inicio');
                        setIsNavbar('');
                        
                        setIsTypeUser('');

                        setIsLogged(false);
                        setIsStatusEnable([]);
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
                    reject('¡Ocurrio un error inesperado!...');
                }
            });

            Alert_Verification(promise,'¡Cerrando sesión!...');
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
                        
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
    );
}