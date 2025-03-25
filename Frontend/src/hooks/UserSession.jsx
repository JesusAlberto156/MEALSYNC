import { useContext } from "react";
import { useNavigate } from "react-router-dom";

import { userContext } from "../contexts/UsersProvider";
import { permissionContext } from "../contexts/PermissionsProvider";
import { statusUserContext } from "../contexts/StatusProvider";
import { typeUserContext } from "../contexts/TypeUserProvider";
import { loggedContext,nameContext,passwordContext } from "../contexts/SessionProvider";
import { loginContext,toastContext,visibleContext,searchTermContext,selectedRowContext } from "../contexts/VariablesProvider";
import { navbarContext,sidebarContext } from "../contexts/ViewsProvider";
import { modalOutLoginContext,modalAlertMedicoContext,modalShoppingCartContext } from "../contexts/ModalsProvider";

import { Alert_Verification } from "../components/styled/Notifications";

export const useLogin = () => {
    const [isLogged,setIsLogged] = useContext(loggedContext);

    const login = async () => {
        setIsLogged(true);
    }

    return login;
}

export const useOutLogin = () => {
    const {
            loadingOption, isLoadingOption,
            loadingAdministration, isLoadingAdministration,
            loadingKitchen, isLoadingKitchen,
            loadingLogin, isLoadingLogin,
            loadingLoginAdministration, isLoadingLoginAdministration,
            loadingLoginKitchen, isLoadingLoginKitchen
        } = useContext(loginContext);
    const [toast,setToast] = useContext(toastContext); 
    const [visible,setVisible] = useContext(visibleContext);
    const [selectedRow,setSelectedRow] = useContext(selectedRowContext);
    const [searchTerm,setSearchTerm] = useContext(searchTermContext);

    const [navbar,setNavbar] = useContext(navbarContext);
    const [sidebar,setSidebar] = useContext(sidebarContext);

    const [modalOutLogin,setModalOutLogin] = useContext(modalOutLoginContext);
    const [modalAlertMedico,setModalAlertMedico] = useContext(modalAlertMedicoContext);
    const [modalShoppingCart,setModalShoppingCart] = useContext(modalShoppingCartContext);

    const [name,setName] = useContext(nameContext);
    const [password,setPassword] = useContext(passwordContext);

    const [typeUser,setTypeUser] = useContext(typeUserContext);
    
    const [isLogged,setIsLogged] = useContext(loggedContext);

    const [statusUser,setStatusUser] = useContext(statusUserContext);
    const [user,setUser] = useContext(userContext);
    const [permission,setPermission] = useContext(permissionContext);
    
    const navigate = useNavigate();

    const outLogin = async () => {
        document.title = "Cargando...";
        const promise = new Promise(async (resolve,reject) => {
            try{
                setToast(true);
                setTimeout(() => {
                    resolve('¡MEALSYNC le agradece su estancia!...')
                },1000)
                setTimeout(() => {
                    isLoadingOption(true);
                    isLoadingAdministration(false);
                    isLoadingKitchen(false);
                    isLoadingLogin(false);
                    isLoadingLoginAdministration(false);
                    isLoadingLoginKitchen(false);
                    setToast(false);
                    setVisible(true);
                    setSelectedRow(null);
                    setSearchTerm('');

                    setNavbar('');
                    setSidebar('Inicio');

                    setModalOutLogin(false);
                    setModalAlertMedico(true);
                    setModalShoppingCart(false);

                    setName('');
                    setPassword('');

                    setTypeUser('');
                    sessionStorage.removeItem('TypeUser');

                    setIsLogged(false);
                    sessionStorage.removeItem('Logged');
                    
                    setStatusUser([]);
                    sessionStorage.removeItem('StatusUser') ;

                    setTimeout(() => {
                        setUser([]);
                        sessionStorage.removeItem('User');
                        setPermission([]);
                        sessionStorage.removeItem('Permission');
                        navigate("/",{replace: true});
                    },200)
                },2000)
            }catch(error){
                reject('¡Ocurrio un error inesperado...');
            }
        });
        Alert_Verification(promise,'¡Cerrando sesión!...','Light');
    }

    return outLogin;
}