//____________IMPORT/EXPORT____________
// Hooks de React
import { useEffect,useContext } from "react";
import { useNavigate } from "react-router-dom";
// Componentes de React externos
import { Toaster } from 'sonner';
// Servicios

// Rutas

// Contextos
import { themeModeContext,loginViewContext,navbarViewContext,sidebarViewContext,sidebarVisibleContext,modalViewContext } from "../contexts/ViewsProvider";
import { nameContext,passwordContext,selectContext,radioContext } from "../contexts/FormsProvider";
import { typeUserContext,searchTermContext,actionBlockContext } from "../contexts/VariablesProvider";
import { userContext } from "../contexts/UsersProvider";
import { permissionContext } from "../contexts/PermissionsProvider";
import { statusUserContext } from "../contexts/StatusProvider";
import { loggedContext,logContext } from "../contexts/SessionProvider";
// Hooks personalizados

//__________ICONOS__________

//__________ICONOS__________
// Estilos personalizados
import { Container_Page,Container_Page_Administration,Container_Page_Elements } from "../components/styled/Containers";
import { Alert_Greeting_Light,Alert_Greeting_Dark,Alert_Verification,Alert_Styles } from "../components/styled/Alerts";
// Componentes personalizados
import Footer from '../components/footer/Footer'
import Side_Bar from "../components/navegation/Sidebar";
import Out_Login from "../components/modals/General/OutLogin";
import Home from "../components/pages/general/Home";
import Users from "../components/pages/administration/Users";
import Permissions_Add from "../components/modals/permissions/PermissionsAdd";
import Permissions_Edit from "../components/modals/permissions/PermissionsEdit";
import Permissions_Super_Administrator from "../components/modals/permissions/PermissionsSuperAdministrator";
import Status_Add from "../components/modals/status/StatusAdd";
import Status_Enable from "../components/modals/status/StatusEnable";
//____________IMPORT/EXPORT____________

// Página para mostrar el área de administración
export default function Administration(){
    // Constantes con el valor de los contextos
    const [themeMode] = useContext(themeModeContext);
    const [currentLView,setCurrentLView] = useContext(loginViewContext);
    const [currentNView,setCurrentNView] = useContext(navbarViewContext);
    const [currentSView,setCurrentSView] = useContext(sidebarViewContext);
    const [isSidebarVisible,setIsSidebarVisible] = useContext(sidebarVisibleContext);
    const [currentMView,setCurrentMView] = useContext(modalViewContext);
    
    const [isName,setIsName] = useContext(nameContext);
    const [isPassword,setIsPassword] = useContext(passwordContext);
    const [isSelect,setIsSelect] = useContext(selectContext);
    const [iseRadio,setIsRadio] = useContext(radioContext);

    const [isSearchTerm,setIsSearchTerm] = useContext(searchTermContext);
    const [isTypeUser,setIsTypeUser] = useContext(typeUserContext);
    const [isActionBlock,setIsActionBlock] = useContext(actionBlockContext);
    const [isLogged,setIsLogged] = useContext(loggedContext);
    const [isUser,setIsUser] = useContext(userContext);
    const [isPermission,setIsPermission] = useContext(permissionContext);
    const [isStatusUser,setIsStatusUser] = useContext(statusUserContext);
    const [isLog,setIsLog] = useContext(logContext);
    // useEffect con el titulo de la página
    useEffect(() => {
        document.title = "MEALSYNC_Administración_Inicio"
        if(themeMode){
            Alert_Greeting_Light("MEALSYNC",'¡Le ofrece las siguientes opciones de administración!...');
            Alert_Greeting_Light('Bienvenido(a)',`¡${isUser.nombrecorto}!...`);
        }else{
            Alert_Greeting_Dark("MEALSYNC",'¡Le ofrece las siguientes opciones de administración!...');
            Alert_Greeting_Dark('Bienvenido(a)',`¡${isUser.nombrecorto}!...`);
        }
    },[]);
    // useEffect con el cerrado de sesión de administración
    useEffect(() => {
        if(isLog && isLogged){
            document.title = "Cargando...";
            const promise = new Promise(async (resolve,reject) => {
                try{       
                    setIsActionBlock(true);         
                    setTimeout(() => {
                        resolve('¡MEALSYNC le agradece su estancia!...');
                    },1000);

                    setTimeout(() => {
                        setCurrentLView('');
                        setCurrentNView('');
                        setCurrentSView('Home');
                        setIsSidebarVisible(true);
                        setCurrentMView('');
                        
                        setIsName('');
                        setIsPassword('');
                        setIsSelect([]);
                        setIsSelect('');

                        setIsTypeUser('');
                        setIsSearchTerm('');

                        setIsLogged(false);

                        setIsPermission([]);
                        setIsStatusUser([]);

                        setTimeout(() => {
                            setIsUser([]);
                            setIsLog(false);
                            sessionStorage.clear();
                            setIsActionBlock(false);
                            navigate("/",{replace: true});
                        },500)
                    },2000)
                }catch(error){
                    setIsLog(false);
                    setIsActionBlock(false);
                    reject('¡Ocurrio un error inesperado!...');
                }
            });
            
            Alert_Verification(promise,'¡Cerrando sesión!...');
        }
    },[isLog]);
    // Constantes con la funcionalidad de los hooks
    const navigate = useNavigate();
    // Estructura del componente
    return(
        <Container_Page>
            <Side_Bar/>
            <Container_Page_Administration ThemeMode={themeMode}>
                <Container_Page_Elements sidebarVisible={isSidebarVisible}>
                    {currentSView === 'Home' ? (
                        <Home/>
                    ):(
                        <></>
                    )}
                    {currentSView === 'Users' ? (
                        <Users/>
                    ):(
                        <></>
                    )}
                </Container_Page_Elements>
                {currentMView === 'Out-Login' ? (
                    <Out_Login/>
                ):(
                    <></>
                )}
                
                {currentMView === 'Permissions-Add' ? (
                    <Permissions_Add/>
                ):(
                    <></>
                )}
                {currentMView === 'Permissions-Edit' ? (
                    <Permissions_Edit/>
                ):(
                    <></>
                )}
                {currentMView === 'Permissions-Super-Administrator' ? (
                    <Permissions_Super_Administrator/>
                ):(
                    <></>
                )}
                {currentMView === 'Status-Add' ? (
                    <Status_Add/>
                ):(
                    <></>
                )}
                {currentMView === 'Status-Enable' ? (
                    <Status_Enable/> 
                ):(
                    <></>
                )}
            </Container_Page_Administration>
            <Alert_Styles>
                <Toaster
                    visibleToasts={3}
                    richColors
                    theme='dark'
                    position='top-right'
                />
            </Alert_Styles>
            <Footer/>
        </Container_Page>
    );
}