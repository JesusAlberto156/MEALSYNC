//____________IMPORT/EXPORT____________
// Hooks de React
import { useEffect,useContext } from "react";
import { useNavigate } from "react-router-dom";
// Componentes de React externos
import { Toaster } from 'sonner';
// Servicios

// Rutas

// Contextos
import { typeUserContext } from "../contexts/TypeUserProvider";
import { sidebarContext,navbarContext } from "../contexts/ViewsProvider";
import { modeContext,visibleContext,modalContext,optionModalContext,selectedRowContext,loadingOptionLoginContext,searchTermContext } from "../contexts/VariablesProvider";
import { userContext } from "../contexts/UsersProvider";
import { permissionContext } from "../contexts/PermissionsProvider";
import { statusUserContext,statusEnableContext } from "../contexts/StatusProvider";
import { loggedContext,nameContext,passwordContext,logContext } from "../contexts/SessionProvider";
// Hooks personalizados

//__________ICONOS__________

//__________ICONOS__________
// Estilos personalizados
import { Container_Page,Container_Page_Elements,Container_Page_Administration_Light,Container_Page_Administration_Dark } from "../components/styled/Containers";
import { Alert_Greeting_Light,Alert_Greeting_Dark,Alert_Verification,Alert_Styles } from "../components/styled/Alerts";
// Componentes personalizados
import Footer from '../components/footer/Footer'
import Sidebar from "../components/sidebar/Sidebar";
import OutLogin from "../components/modals/General/OutLogin";
import Home from "../components/pages/general/Home";
import Users from "../components/pages/administration/Users";
import PermissionsAdd from '../components/modals/permissions/PermissionsAdd';
import PermissionsEdit from '../components/modals/permissions/PermissionsEdit';
import PermissionsSuperAdministrator from "../components/modals/permissions/PermissionsSuperAdministrator";
import StatusAdd from "../components/modals/status/StatusAdd";
import StatusEnable from "../components/modals/status/StatusEnable";
//____________IMPORT/EXPORT____________

// Página para mostrar el área de administración
export default function Administration(){
    // Constantes con el valor de los contextos
    const [isMode] = useContext(modeContext);
    const [isLoadingOptionLogin,setIsLoadingOptionLogin] = useContext(loadingOptionLoginContext);
    const [isVisible,setIsVisible] = useContext(visibleContext);
    const [isSelectedRow,setIsSelectedRow] = useContext(selectedRowContext);
    const [isSearchTerm,setIsSearchTerm] = useContext(searchTermContext);
    const [isModal,setIsModal] = useContext(modalContext);
    const [isOptionModal,setIsOptionModal] = useContext(optionModalContext);
    const [isSidebar,setIsSidebar] = useContext(sidebarContext);
    const [isNavbar,setIsNavbar] = useContext(navbarContext);
    const [isTypeUser,setIsTypeUser] = useContext(typeUserContext);
    const [isLogged,setIsLogged] = useContext(loggedContext);
    const [isStatusEnable,setIsStatusEnable] = useContext(statusEnableContext);
    const [isName,setIsName] = useContext(nameContext);
    const [isPassword,setIsPassword] = useContext(passwordContext);
    const [isUser,setIsUser] = useContext(userContext);
    const [isPermission,setIsPermission] = useContext(permissionContext);
    const [isStatusUser,setIsStatusUser] = useContext(statusUserContext);
    const [isLog] = useContext(logContext);
    // useEffect con el titulo de la página
    useEffect(() => {
        document.title = "MEALSYNC_Administración_Inicio"
        if(isMode){
            Alert_Greeting_Light("MEALSYNC",'¡Le ofrece las siguientes opciones de administración!...');
            Alert_Greeting_Light('Bienvenido(a)',`¡${isUser.nombrecorto}!...`);
        }else{
            Alert_Greeting_Dark("MEALSYNC",'¡Le ofrece las siguientes opciones de administración!...');
            Alert_Greeting_Dark('Bienvenido(a)',`¡${isUser.nombrecorto}!...`);
        }
    },[]);
    // useEffect con el cerrado de sesión de administración
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
                        setIsModal(false);
                        setIsOptionModal('');
                        
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
                            sessionStorage.clear();
                            navigate("/",{replace: true});
                        },500)
                    },2000)
                }catch(error){
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
            <Sidebar/>
            {isMode ? (
                <>
                    <Container_Page_Administration_Light>
                        <Container_Page_Elements sidebarVisible={isVisible}>
                            {isSidebar === 'Home' ? (
                                <Home/>
                            ):(
                                <></>
                            )}
                            {isSidebar === 'Users' ? (
                                <Users/>
                            ):(
                                <></>
                            )}
                        </Container_Page_Elements>
                        {isOptionModal === 'Out-Login' ? (
                            isModal ? (
                                <OutLogin/>
                            ):(
                                <></>
                            )
                        ):(
                            <></>
                        )}
                        {isOptionModal === 'Permissions-Add' ?(
                            isModal ? (
                                <PermissionsAdd/>
                            ):(
                                <></>
                            )
                        ):(
                            <></>
                        )}
                        {isOptionModal === 'Permissions-Edit' ?(
                            isModal ? (
                                <PermissionsEdit/>
                            ):(
                                <></>
                            )
                        ):(
                            <></>
                        )}
                        {isOptionModal === 'Permissions-Super-Administrator' ?(
                            isModal ? (
                                <PermissionsSuperAdministrator/>
                            ):(
                                <></>
                            )
                        ):(
                            <></>
                        )}
                        {isOptionModal === 'Status-Add' ? (
                            isModal ? (
                                <StatusAdd/>
                            ):(
                                <></>
                            )
                        ):(
                            <></>
                        )}
                        {isOptionModal === 'Status-Enable' ? (
                            isModal ? (
                                <StatusEnable/>
                            ):(
                                <></>
                            )   
                        ):(
                            <></>
                        )}
                    </Container_Page_Administration_Light>
                </>
            ):(
                <>
                    <Container_Page_Administration_Dark>
                        <Container_Page_Elements sidebarVisible={isVisible}>
                            {isSidebar === 'Home' ? (
                                <Home/>
                            ):(
                                <></>
                            )}
                            {isSidebar === 'Users' ? (
                                <Users/>
                            ):(
                                <></>
                            )}
                        </Container_Page_Elements>
                        {isOptionModal === 'Out-Login' ? (
                            isModal ? (
                                <OutLogin/>
                            ):(
                                <></>
                            )
                        ):(
                            <></>
                        )}
                        {isOptionModal === 'Permissions-Add' ?(
                            isModal ? (
                                <PermissionsAdd/>
                            ):(
                                <></>
                            )
                        ):(
                            <></>
                        )}
                        {isOptionModal === 'Permissions-Edit' ?(
                            isModal ? (
                                <PermissionsEdit/>
                            ):(
                                <></>
                            )
                        ):(
                            <></>
                        )}
                        {isOptionModal === 'Permissions-Super-Administrator' ?(
                            isModal ? (
                                <PermissionsSuperAdministrator/>
                            ):(
                                <></>
                            )
                        ):(
                            <></>
                        )}
                        {isOptionModal === 'Status-Add' ? (
                            isModal ? (
                                <StatusAdd/>
                            ):(
                                <></>
                            )
                        ):(
                            <></>
                        )}
                        {isOptionModal === 'Status-Enable' ? (
                            isModal ? (
                                <StatusEnable/>
                            ):(
                                <></>
                            )   
                        ):(
                            <></>
                        )}
                    </Container_Page_Administration_Dark>
                </>
            )}
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