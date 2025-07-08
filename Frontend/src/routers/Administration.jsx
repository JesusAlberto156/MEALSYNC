//____________IMPORT/EXPORT____________
// Hooks de React
import { useContext,useEffect,useRef } from "react";
import { Outlet,useNavigate,Navigate } from "react-router-dom";
// Contextos
import { SidebarContext,ThemeModeContext,SidebarViewContext,NavbarViewContext,LoginViewContext,ModalViewContext,ModalContext,SubModalContext } from "../contexts/ViewsProvider";
import { LoggedUserContext,LoggedLogContext,LoggedLoggedContext,LoggedPermissionsContext,LoggedStatusContext,LoggedTypeContext } from "../contexts/SessionProvider";
import { ActionBlockContext,UserUpdatedContext,PermissionUpdatedContext } from "../contexts/VariablesProvider";
import { StatusContext } from "../contexts/UsersProvider";
import { SearchTermContext,SearchTerm2Context,SearchTerm1Context } from "../contexts/SearchsProvider";
import { SelectedRowContext,SelectedRow1Context,SelectedRow2Context,SelectedOptionSearchContext,SelectedOptionOrderContext,SelectedOptionOrderPlusContext,SelectedOptionOrderDirectionContext } from "../contexts/SelectedesProvider";
import { RefAlertGreetingContext } from "../contexts/RefsProvider";
import { SocketContext } from "../contexts/SocketProvider";
// Hooks personalizados
import { HandleLoggedLog } from "../hooks/Forms";
// Estilos personalizados
import { Alert_Logout,Alert_Swal_Warning,Alert_Sonner_Promise } from "../components/styled/Alerts";
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
    const [isPermissionUpdated,setIsPermissionUpdated] = useContext(PermissionUpdatedContext);
    // Constantes con el valor de los useRef
    const isLoggedLoggedRef = useRef(isLoggedLogged);
    const logoutInitiatedRef = useRef(false);
    const inactividadTimer = useRef(null);
    // Constantes
    const tiempoInactivoParaAccion = 900000;
    // Reiniciar temporizador de inactividad
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
                            setIsPermissionUpdated('');

                            setTimeout(() => {
                                sessionStorage.clear();
                                setIsLoggedUser([]);
                                setIsLoggedStatus([]);
                                setIsActionBlock(false);
                                setIsModal(false);
                                setIsSubModal(false)
                                logoutInitiatedRef.current = false;
                                isAlertGreeting.current = false;
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
            
            Alert_Sonner_Promise(promise,'¡Cerrando sesión!...');
        }
    },[isLoggedLog]);
    // Constantes con la funcionalidad de los hooks
    const navigate = useNavigate();
    const handleLoggedLog = HandleLoggedLog();
    // Función del componente
    if(!isLoggedLogged) return <Navigate to={'/'}/>;
    return isLoggedType==='Administrador' || isLoggedType==='Chef' || isLoggedType==='Almacenista' ? <Outlet/> : <Navigate to={'/'}/>;
}