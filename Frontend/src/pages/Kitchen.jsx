//____________IMPORT/EXPORT____________
// Hooks de React
import { useEffect,useContext } from "react";
import { useNavigate } from "react-router-dom";
// Componentes de React externos

// Servicios

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
import { Container_Page,Container_Page_Kitchen,Container_Page_Elements } from "../components/styled/Containers";
import { Alert_Greeting_Light,Alert_Greeting_Dark,Alert_Verification,Alert_Styles } from "../components/styled/Alerts";
// Componentes personalizados
import Home from '../components/pages/general/Home';
import Menu from '../components/pages/menu/Menu';
import Side_Bar from '../components/navegation/Sidebar'
import Footer from "../components/footer/Footer";
//____________IMPORT/EXPORT____________

export default function Kitchen(){
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
        document.title = "MEALSYNC_Menú_Inicio"
        Alert_Greeting_Light("MEALSYNC",'¡Le ofrece las siguientes opciones de menú!...');
        Alert_Greeting_Dark('Bienvenido(a)',`¡${isUser.nombrecorto}!...`);
    },[]);
    // useEffect con el cerrado de sesión de kitchen
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
            <Container_Page_Kitchen>
                <Container_Page_Elements sidebarVisible={isSidebarVisible}>
                    {isSidebarVisible === 'Inicio' ? (
                        <Home/>
                    ):(
                        <Menu/>
                    )}
                </Container_Page_Elements>
            </Container_Page_Kitchen>
            <Footer/>
        </Container_Page>
    );
}