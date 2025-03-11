import { useContext } from "react";
import { typeUserContext } from "../contexts/TypeUserProvider";
import { loggedContext } from "../contexts/LoggedProvider";
import { loadingContext } from "../contexts/LoadingProvider";
import { optionsContext } from '../contexts/OptionsProvider';
import { nameLoginContext } from '../contexts/NameLoginProvider';
import { passwordLoginContext } from '../contexts/PasswordLoginProvider';
import { viewSidebarContext } from "../contexts/SwitchViewSidebarProvider";
import { activeOptionContext } from "../contexts/ActiveOptionProvider";
import { sidebarVisibleContext } from "../contexts/SidebarVisibleProvider";
import { modalOutLoginContext,modalShoppingCartContext, modalAlertMedicoContext } from "../contexts/ModalsProvider";
import { viewNavbarContext } from "../contexts/SwitchViewNavbarProvider";
import { permissionsContext } from '../contexts/PermissionsProvider';
import { usersContext } from '../contexts/UsersProvider';
import { userContext } from "../contexts/UserProvider";
import { permissionContext } from "../contexts/PermissionProvider";

import { useNavigate } from "react-router-dom";

import { Alert_Red,Alert_Yellow,Alert_Verification,Alert_Blue } from "../components/styled/Notifications";

export const useLogin = () => {
    const [typeUser,setTypeUser] = useContext(typeUserContext);
    const [isLogged,setIsLogged] = useContext(loggedContext);
    const [isLoading,setIsLoading] = useContext(loadingContext);
    const [name,setName] = useContext(nameLoginContext);
    const [password,setPassword] = useContext(passwordLoginContext);
    const [users, setUsers] = useContext(usersContext)
    const [permissions, setPermissions] = useContext(permissionsContext);
    const [user,setUser] = useContext(userContext);
    const [permission,setPermission] = useContext(permissionContext);

    const {
        loadingOption, isLoadingOption,
        loadingAdministration, isLoadingAdministration,
        loadingKitchen, isLoadingKitchen,
        loadingLogin, isLoadingLogin,
        loadingLoginAdministration, isLoadingLoginAdministration,
        loadingLoginKitchen, isLoadingLoginKitchen
    } = useContext(optionsContext);

    const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));
    const navigate = useNavigate();

    const login = async () => {
        document.title = "Cargando...";

        const promise = new Promise(async (resolve,reject) => {
            try{
                await delay(1000);

                const existsUser = users.find(user => user.usuario === name);
                if(!existsUser) return reject('¡Usuario no encontrado!')
                
                if(existsUser.contrasena === password){
                    const existsPermissions = permissions.find(permissions => permissions.idusuario === existsUser.idusuario);
                    if(!existsPermissions) return reject('¡Este usuario no cuenta con roles asignados!')
                    
                    if(typeUser === 'Cocinero'){
                        if(!existsPermissions.cocinero) return reject('¡Este usuario no cuenta con el rol de COCINERO!');
                    }
                    if(typeUser === 'Nutriologo'){
                        if(!existsPermissions.nutriologo) return reject('¡Este usuario no cuenta con el rol de NUTRIÓLOGO!');
                    }
                    if(typeUser === 'Medico'){
                        if(!existsPermissions.medico) return reject('¡Este usuario no cuenta con el rol de MÉDICO!');
                    }
                    if(typeUser === 'Administrador'){
                        if(!existsPermissions.administrador) return reject('¡Este usuario no cuenta con el rol de ADMINISTRADOR!');
                    }
                    if(typeUser === 'Chef'){
                        if(!existsPermissions.chef) return reject('¡Este usuario no cuenta con el rol de CHEF!');
                    }
                    if(typeUser === 'Almacen'){
                        if(!existsPermissions.almacen) return reject('¡Este usuario no cuenta con el rol de ALMACÉN!');
                    }
                    resolve('¡SESIÓN INICIADA!');
                    Alert_Blue(`Bienvenido ${existsUser.nombrecorto}`);

                    setTimeout(() => {
                        setIsLoading(false);
                        setIsLogged(true);
                        setUser(existsUser);
                        setPermission(existsPermissions);
                        navigate(typeUser === 'Cocinero' || typeUser === 'Nutriologo' || typeUser === 'Medico' ? '/Menu' : '/Administrator',{ replace: true });
                    },3000)
                }else{
                    return reject('¡Usuario o contraseña incorrectos!');
                }
            } catch (error){
                reject('¡Ocurrio un error inesperado');
            }
        })

        Alert_Verification(promise);
        document.title = "MEALSYNC_Iniciar_Sesión";
    }

    return login;
}
export const useOutLogin = () => {
    const [name,setName] = useContext(nameLoginContext);
    const [password,setPassword] = useContext(passwordLoginContext);
    const [isLoading,setIsLoading] = useContext(loadingContext);
    const {
            loadingOption, isLoadingOption,
            loadingAdministration, isLoadingAdministration,
            loadingKitchen, isLoadingKitchen,
            loadingLogin, isLoadingLogin,
            loadingLoginAdministration, isLoadingLoginAdministration,
            loadingLoginKitchen, isLoadingLoginKitchen
        } = useContext(optionsContext);
    const [typeUser,setTypeUser] = useContext(typeUserContext);
    const [isLogged,setIsLogged] = useContext(loggedContext);
    const [viewSidebar,setViewSidebar] = useContext(viewSidebarContext);
    const [viewNavbar,setViewNavbar] = useContext(viewNavbarContext);
    const [sidebarVisible,setSidebarVisible] = useContext(sidebarVisibleContext);
    const [activeOption,setActiveOption] = useContext(activeOptionContext);
    const [modalAlertMedico,setModalAlertMedico] = useContext(modalAlertMedicoContext);
    const [modalOutLogin,setModalOutLogin] = useContext(modalOutLoginContext);
    const [modalShoppingCart,setModalShoppingCart] = useContext(modalShoppingCartContext);
    const [user,setUser] = useContext(userContext);
    const [permission,setPermission] = useContext(permissionContext);

    const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));
    const navigate = useNavigate();

    const outLogin = async () => {
        document.title = "Cargando...";
        setIsLoading(true);
        Alert_Red('¡SESIÓN CERRADA!')
        await delay(3000);
        setName('');
        setPassword('');
        setTypeUser('');
        setViewSidebar('');
        setViewNavbar('');
        setActiveOption('');
        setSidebarVisible(true);
        setModalAlertMedico(true);
        setModalOutLogin(false);
        setModalShoppingCart(false);
        isLoadingOption(true);
        isLoadingAdministration(false);
        isLoadingKitchen(false);
        isLoadingLogin(false);
        isLoadingLoginAdministration(false);
        isLoadingLoginKitchen(false);
        setIsLogged(false);
        setUser([]);
        setPermission([]);
        setIsLoading(false);
        navigate("/",{replace: true});
    }

    return outLogin;
}