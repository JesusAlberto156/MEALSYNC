//____________IMPORT/EXPORT____________
// Hooks de React
import { useContext,useEffect,useRef } from "react";
import { Outlet,useNavigate,Navigate } from "react-router-dom";
// Contextos
import { SidebarContext,ThemeModeContext,SidebarViewContext,NavbarViewContext,LoginViewContext,ModalViewContext,ModalContext } from "../contexts/ViewsProvider";
import { LoggedUserContext,LoggedLogContext,LoggedLoggedContext,LoggedPermissionsContext,LoggedStatusContext,LoggedTypeContext } from "../contexts/SessionProvider";
import { ActionBlockContext } from "../contexts/VariablesProvider";
import { SearchTermContext } from "../contexts/SearchsProvider";
import { SelectedRowContext } from "../contexts/SelectedesProvider";
import { RefAlertGreetingContext } from "../contexts/RefsProvider";
// Hooks personalizados
import { HandleLoggedLog } from "../hooks/Forms";
// Estilos personalizados
import { Alert_Logout,Alert_Swal_Warning,Alert_Sonner_Promise } from "../components/styled/Alerts";
//____________IMPORT/EXPORT____________

// Componente para proteger las rutas de la pagina
export const PrivateRouteKitchen = () => {
    // Constantes con el valor de los contextos
    const [themeMode] = useContext(ThemeModeContext);
    const [isSidebar,setIsSidebar] = useContext(SidebarContext);
    const [isActionBlock,setIsActionBlock] = useContext(ActionBlockContext);
    const [currentMView,setCurrentMView] = useContext(ModalViewContext);
    const [currentLView,setCurrentLView] = useContext(LoginViewContext);
    const [currentNView,setCurrentNView] = useContext(NavbarViewContext);
    const [currentSView,setCurrentSView] = useContext(SidebarViewContext);
    const [isModal,setIsModal] = useContext(ModalContext);
    const [isLoggedLog,setIsLoggedLog] = useContext(LoggedLogContext);
    const [isLoggedLogged,setIsLoggedLogged] = useContext(LoggedLoggedContext);
    const [isSearchTerm,setIsSearchTerm] = useContext(SearchTermContext);
    const [isLoggedType,setIsLoggedType] = useContext(LoggedTypeContext);
    const [isLoggedUser,setIsLoggedUser] = useContext(LoggedUserContext);
    const [isLoggedPermissions,setIsLoggedPermissions] = useContext(LoggedPermissionsContext);
    const [isLoggedStatus,setIsLoggedStatus] = useContext(LoggedStatusContext);
    const [isSelectedRow,setIsSelectedRow] = useContext(SelectedRowContext);
    const isAlertGreeting = useContext(RefAlertGreetingContext);
    // Constantes con el valor de los useRef
    const isLoggedLoggedRef = useRef(isLoggedLogged);
    const logoutInitiatedRef = useRef(false);
    const inactividadTimer = useRef(null);
    // Constantes
    const tiempoInactivoParaAccion = 900000;
    // Reiniciar temporizador de inactividad
    const ejecutarAccionFinal = () => {
        if(!isLoggedLoggedRef.current || logoutInitiatedRef.current) return;

        logoutInitiatedRef.current = true; 

        const showAlerts = async () => {
            const Color = themeMode ? '#3a5dae' : '#527ee7';

            await Alert_Swal_Warning('MEALSYNC',`¡${isLoggedUser.nombre}!`,themeMode);

            await Alert_Logout('MEALSYNC',`¡Se esta cerrando la sesión!...`,themeMode,Color,handleLoggedLog,resetInactividad);
        }
        if(isLoggedLoggedRef.current){
            showAlerts();
        }
    };
    const resetInactividad = () => {
        logoutInitiatedRef.current = false;
        clearTimeout(inactividadTimer.current);
        inactividadTimer.current = setTimeout(ejecutarAccionFinal, tiempoInactivoParaAccion);
    };
    // UseEffect para actualizar el valor de logged
    useEffect(() => {
        isLoggedLoggedRef.current = isLoggedLogged;
    }, [isLoggedLogged]);
    // useEffect para detectar eventos
    useEffect(() => {
        const eventos = ['mousemove', 'keydown', 'scroll', 'click', 'touchstart', 'touchmove'];
        eventos.forEach(e => window.addEventListener(e, resetInactividad));
    
        const handleVisibilityChange = () => {
            if (document.hidden) {
                inactividadTimer.current = setTimeout(ejecutarAccionFinal, tiempoInactivoParaAccion);
            } else {
                resetInactividad();
            }
        };
    
        document.addEventListener('visibilitychange', handleVisibilityChange);
    
        resetInactividad();
    
        return () => {
            eventos.forEach(e => window.removeEventListener(e, resetInactividad));
            document.removeEventListener('visibilitychange', handleVisibilityChange);
            clearTimeout(inactividadTimer.current);
        };
    },[]);
    // useEffect con el cerrado de sesión
    useEffect(() => {
        if(isLoggedLog && isLoggedLogged){
            document.title = "Cargando...";
            const promise = new Promise(async (resolve,reject) => {
                try{       
                    setIsActionBlock(true);         
                    setTimeout(() => {
                        resolve('¡MEALSYNC le agradece su estancia!...');
                        
                        setCurrentMView('');
                        setTimeout(() => {
                            setCurrentLView('');
                            setCurrentNView('');
                            setCurrentSView('');
                            setIsSidebar(true);
                            setIsLoggedType('');
                            setIsSearchTerm('');
                            setIsLoggedPermissions([]);
                            setIsLoggedStatus([]);
                            setIsLoggedLog(false);
                            setIsLoggedLogged(false);
                            setIsSelectedRow(null);

                            setTimeout(() => {
                                sessionStorage.clear();
                                setIsLoggedUser([]);
                                setIsActionBlock(false);
                                setIsModal(false);
                                isAlertGreeting.current = false;
                                logoutInitiatedRef.current = false;
                                navigate("/",{replace: true});
                            },700);
                        },750)
                    },2000);
                }catch(error){
                    setIsLoggedLog(false);
                    setIsActionBlock(false);
                    reject('¡Ocurrio un error inesperado!...');
                }
            });
            
            Alert_Sonner_Promise(promise,'¡Cerrando sesión!...');
        }
    },[isLoggedLog]);
    // Constantes con la funcionalidad de los hooks
    const navigate = useNavigate();
    const handleLoggedLog = HandleLoggedLog();
    // Función del componente
    if(!isLoggedLogged) return <Navigate to={'/'}/>;
    return isLoggedType==='Cook' || isLoggedType==='Nutritionist' || isLoggedType==='Doctor' ? <Outlet/> : <Navigate to={'/'}/>;
}