//____________IMPORT/EXPORT____________
// Hooks de React
import { useContext,useEffect,useRef } from "react";
import { Outlet,useNavigate,Navigate } from "react-router-dom";
// Contextos
import { SidebarContext,ThemeModeContext,SidebarViewContext,NavbarViewContext,LoginViewContext,ModalViewContext,ModalContext,SubModalContext } from "../contexts/ViewsProvider";
import { LoggedUserContext,LoggedLogContext,LoggedLoggedContext,LoggedPermissionsContext,LoggedStatusContext,LoggedTypeContext } from "../contexts/SessionProvider";
import { ActionBlockContext,UserUpdatedContext } from "../contexts/VariablesProvider";
import { StatusContext } from "../contexts/UsersProvider";
import { SearchTermContext,SearchTerm2Context,SearchTerm1Context } from "../contexts/SearchsProvider";
import { SelectedRowContext,SelectedRow1Context,SelectedRow2Context,SelectedOptionSearchContext,SelectedOptionOrderContext,SelectedOptionOrderPlusContext,SelectedOptionOrderDirectionContext } from "../contexts/SelectedesProvider";
import { RefAlertGreetingContext } from "../contexts/RefsProvider";
import { SocketContext } from "../contexts/SocketProvider";
// Hooks personalizados
import { HandleLoggedLog } from "../hooks/Form";
//__________IMAGES____________
import Logo_Warning_Light from '../components/imgs/Logo-Warning-Light.png';
import Logo_Warning_Dark from '../components/imgs/Logo-Warning-Dark.webp';
import Logo_Logout_Light from '../components/imgs/Logo-Logout-Light.png';
import Logo_Logout_Dark from '../components/imgs/Logo-Logout-Dark.png';
//__________IMAGES____________
// Estilos personalizados
import { Alert_Logout,Alert_Warning,Alert_Verification } from "../components/styled/Alerts";
//____________IMPORT/EXPORT____________

// Componente para proteger las rutas de la pagina
export const PrivateRouteAdministration = () => {
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
    const [socket] = useContext(SocketContext);
    const [isStatus] = useContext(StatusContext);
    const [isSelectedRow1,setIsSelectedRow1] = useContext(SelectedRow1Context);
    const [isSelectedRow2,setIsSelectedRow2] = useContext(SelectedRow2Context);
    const [isSelectedOptionSearch,setIsSelectedOptionSearch] = useContext(SelectedOptionSearchContext);
    const [isSelectedOptionOrder,setIsSelectedOptionOrder] = useContext(SelectedOptionOrderContext);
    const [isSelectedOptionOrderPlus,setIsSelectedOptionOrderPlus] = useContext(SelectedOptionOrderPlusContext);
    const [isSelectedOptionOrderDirection,setIsSelectedOptionOrderDirection] = useContext(SelectedOptionOrderDirectionContext);
    const [isSearchTerm1,setIsSearchTerm1] = useContext(SearchTerm1Context);
    const [isSearchTerm2,setIsSearchTerm2] = useContext(SearchTerm2Context);
    const [isSubModal,setIsSubModal] = useContext(SubModalContext);
    const [isUserUpdated,setIsUserUpdated] = useContext(UserUpdatedContext);
    // Constantes con el valor de los useRef
    const isLoggedLoggedRef = useRef(isLoggedLogged);
    const logoutInitiatedRef = useRef(false);
    const inactividadTimer = useRef(null);
    // Constantes
    const tiempoInactivoParaAccion = 900000;
    // Función para obtener la hora exacta del sistema
    function getLocalDateTimeOffset(hoursOffset = -7) {
        const now = new Date();
        now.setHours(now.getHours() + hoursOffset); // Restar 7 horas
        const pad = (n) => n.toString().padStart(2, '0');
        const year = now.getFullYear();
        const month = pad(now.getMonth() + 1);
        const day = pad(now.getDate());
        const hours = pad(now.getHours());
        const minutes = pad(now.getMinutes());
        const seconds = pad(now.getSeconds());
        return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    }
    // Reiniciar temporizador de inactividad
    const ejecutarAccionFinal = () => {
        if(!isLoggedLoggedRef.current || logoutInitiatedRef.current) return;

        logoutInitiatedRef.current = true; 

        const showAlerts = async () => {
            const Image_Warning = themeMode ? Logo_Warning_Light : Logo_Warning_Dark;
            const Image_Logout = themeMode ? Logo_Logout_Light : Logo_Logout_Dark;
            const Color = themeMode ? '#3a5dae' : '#527ee7';

            await Alert_Warning('MEALSYNC',`¡${isLoggedUser.nombre}!`,themeMode,Image_Warning);

            await Alert_Logout('MEALSYNC',`¡Se esta cerrando la sesión!...`,themeMode,Image_Logout,Color,handleLoggedLog,resetInactividad);
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
            const promise = new Promise((resolve,reject) => {
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
                            setIsSearchTerm1('');
                            setIsSearchTerm2('');
                            setIsLoggedPermissions([]);
                            setIsLoggedStatus([]);
                            setIsLoggedLog(false);
                            setIsLoggedLogged(false);
                            setIsSelectedRow(null);
                            setIsSelectedRow1(null);
                            setIsSelectedRow2(null);
                            setIsSelectedOptionSearch('General');
                            setIsSelectedOptionOrder('');
                            setIsSelectedOptionOrderPlus('Normal');
                            setIsSelectedOptionOrderDirection('Asc');
                            setIsUserUpdated('');

                            setTimeout(() => {
                                sessionStorage.clear();
                                setIsLoggedUser([]);
                                setIsActionBlock(false);
                                setIsModal(false);
                                setIsSubModal(false)
                                logoutInitiatedRef.current = false;
                                isAlertGreeting.current = false;
                                socket.emit('Insert-Log-Status',isLoggedUser.usuario,getLocalDateTimeOffset(),'UPDATE',isStatus.find(status => status.idusuario === isLoggedUser.idusuario)?.idestatus,isLoggedUser.idusuario,'','0','');
                                navigate("/",{replace: true});
                            },700);
                        },750)
                    },2000);
                }catch(e){
                    setIsLoggedLog(false);
                    setIsActionBlock(false);
                    reject('¡Ocurrio un error inesperado!...');
                }
            });
            
            Alert_Verification(promise,'¡Cerrando sesión!...');
        }
    },[isLoggedLog]);
    // Constantes con la funcionalidad de los hooks
    const navigate = useNavigate();
    const handleLoggedLog = HandleLoggedLog();
    // Función del componente
    if(!isLoggedLogged) return <Navigate to={'/'}/>;
    return isLoggedType==='Administrador' || isLoggedType==='Chef' || isLoggedType==='Almacenista' ? <Outlet/> : <Navigate to={'/'}/>;
}