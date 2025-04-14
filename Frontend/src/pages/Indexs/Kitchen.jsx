//____________IMPORT/EXPORT____________
// Hooks de React
import { useEffect,useContext } from "react";
import { Outlet, useNavigate } from "react-router-dom";
// Componentes de React externos
import { Toaster } from "sonner";
// Contextos
import { themeModeContext,loginViewContext,navbarViewContext,sidebarViewContext,sidebarContext,modalViewContext } from "../../contexts/ViewsProvider";
import { nameContext,passwordContext } from "../../contexts/FormsProvider";
import { typeUserContext,searchTermContext,actionBlockContext } from "../../contexts/VariablesProvider";
import { userContext } from "../../contexts/UsersProvider";
import { permissionContext } from "../../contexts/PermissionsProvider";
import { statusUserContext } from "../../contexts/StatusProvider";
import { loggedContext,logContext } from "../../contexts/SessionProvider";
// Estilos personalizados
import { Container_Page_Elements } from "../../components/styled/Containers";
import { Alert_Verification,Alert_Styles } from "../../components/styled/Alerts";
// Componentes personalizados
import Setting_Bar from "../../components/navegation/SettingBar";
//____________IMPORT/EXPORT____________

export default function Index_Kitchen(){
    // Constantes con el valor de los contextos
    const [themeMode] = useContext(themeModeContext);
    const [currentLView,setCurrentLView] = useContext(loginViewContext);
    const [currentNView,setCurrentNView] = useContext(navbarViewContext);
    const [currentSView,setCurrentSView] = useContext(sidebarViewContext);
    const [isSidebar,setIsSidebar] = useContext(sidebarContext);
    const [currentMView,setCurrentMView] = useContext(modalViewContext);
    
    const [isName,setIsName] = useContext(nameContext);
    const [isPassword,setIsPassword] = useContext(passwordContext);

    const [isSearchTerm,setIsSearchTerm] = useContext(searchTermContext);
    const [isTypeUser,setIsTypeUser] = useContext(typeUserContext);
    const [isActionBlock,setIsActionBlock] = useContext(actionBlockContext);
    const [isLogged,setIsLogged] = useContext(loggedContext);
    const [isUser,setIsUser] = useContext(userContext);
    const [isPermission,setIsPermission] = useContext(permissionContext);
    const [isStatusUser,setIsStatusUser] = useContext(statusUserContext);
    const [isLog,setIsLog] = useContext(logContext);
    // useEffect con el cerrado de sesión de cocina
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
                        setCurrentSView('');
                        setIsSidebar(true);
                        setCurrentMView('');
                        
                        setIsName('');
                        setIsPassword('');

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
        <>
            <Container_Page_Elements sidebarVisible={isSidebar}>
                <Setting_Bar/>
                <Outlet/>
            </Container_Page_Elements>
            <Alert_Styles ThemeMode={themeMode}>
                <Toaster
                    visibleToasts={3}
                    richColors
                    theme='dark'
                    position='top-right'
                />
            </Alert_Styles> 
        </>
    );
}