import { useContext } from "react";
import { typeUserContext } from "../contexts/TypeUserProvider";
import { loggedContext } from "../contexts/LoggedProvider";
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
import { toastContext } from '../contexts/ToastProvider';

import { useNavigate } from "react-router-dom";

import { Alert_Verification } from "../components/styled/Notifications";

import { encryptData } from "../services/Crypto";

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const useLogin = () => {
    const [typeUser,setTypeUser] = useContext(typeUserContext);
    const [isLogged,setIsLogged] = useContext(loggedContext);
    const [name,setName] = useContext(nameLoginContext);
    const [password,setPassword] = useContext(passwordLoginContext);
    const [users, setUsers] = useContext(usersContext)
    const [permissions, setPermissions] = useContext(permissionsContext);
    const [user,setUser] = useContext(userContext);
    const [permission,setPermission] = useContext(permissionContext);

    const [toast,setToast] = useContext(toastContext);

    const navigate = useNavigate();

    const login = async () => {
        document.title = "Cargando...";

        const promise = new Promise(async (resolve,reject) => {
            try{
                await delay(1000);
                const existsUser = users.find(user => user.usuario === name);
                if(!existsUser) return reject('¡Usuario no encontrado!...')
                
                if(existsUser.contrasena === password){
                    const existsPermissions = permissions.find(permissions => permissions.idusuario === existsUser.idusuario);
                    if(!existsPermissions) return reject('¡Este usuario no cuenta con roles asignados!...')
                    
                    if(typeUser === 'Cocinero'){
                        if(!existsPermissions.cocinero) return reject('¡Este usuario no cuenta con el rol de COCINERO!...');
                    }
                    if(typeUser === 'Nutriologo'){
                        if(!existsPermissions.nutriologo) return reject('¡Este usuario no cuenta con el rol de NUTRIÓLOGO!...');
                    }
                    if(typeUser === 'Medico'){
                        if(!existsPermissions.medico) return reject('¡Este usuario no cuenta con el rol de MÉDICO!...');
                    }
                    if(typeUser === 'Administrador'){
                        if(!existsPermissions.administrador) return reject('¡Este usuario no cuenta con el rol de ADMINISTRADOR!...');
                    }
                    if(typeUser === 'Chef'){
                        if(!existsPermissions.chef) return reject('¡Este usuario no cuenta con el rol de CHEF!...');
                    }
                    if(typeUser === 'Almacen'){
                        if(!existsPermissions.almacen) return reject('¡Este usuario no cuenta con el rol de ALMACÉN!...');
                    }

                    setTimeout(() => {
                        const jsonUser = JSON.stringify(existsUser);
                        const jsonPermission = JSON.stringify(existsPermissions);

                        const encryptedUser = encryptData(jsonUser);
                        const encryptedPermission = encryptData(jsonPermission);
                        const encryptedLogged = encryptData('true');
                        const encryptedType = encryptData(typeUser);

                        if( encryptedUser && encryptedPermission && encryptedLogged && encryptedType){
                            console.log('¡Credenciales encriptadas correctamente!...')
                            resolve('¡SESIÓN INICIADA!...');
                            sessionStorage.setItem('User',encryptedUser);
                            sessionStorage.setItem('Permission',encryptedPermission);
                            sessionStorage.setItem('Logged',encryptedLogged);
                            sessionStorage.setItem('Type',encryptedType);
                            setTimeout(() => {
                                setToast(false);
                            },1500);
                            setTimeout(() => {
                                setIsLogged(true);
                                setUser(existsUser);
                                setPermission(existsPermissions);
                                navigate(typeUser === 'Cocinero' || typeUser === 'Nutriologo' || typeUser === 'Medico' ? '/Menu' : '/Administrator',{ replace: true });
                            },2000);
                        }else{
                            setIsLogged(false);
                            return console.log('¡Error al encriptar las credenciales!...')
                        }
                    },100)
                }else{
                    return reject('¡Usuario o contraseña incorrectos!...');
                }
            } catch (error){
                reject('¡Ocurrio un error inesperado...');
            }
        })

        setToast(true);
        Alert_Verification(promise,'Verificando credenciales...','Light');
        
        document.title = "MEALSYNC_Iniciar_Sesión";
    }

    return login;
}
export const useOutLogin = () => {
    const [name,setName] = useContext(nameLoginContext);
    const [password,setPassword] = useContext(passwordLoginContext);
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
    const [toast,setToast] = useContext(toastContext);

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
                    setToast(false);
                    sessionStorage.removeItem('User');
                    sessionStorage.removeItem('Permission');
                    sessionStorage.removeItem('Logged');
                    sessionStorage.removeItem('Type');
                    navigate("/",{replace: true});
                },2000)
            }catch(error){
                reject('¡Ocurrio un error inesperado...');
            }
        });
        Alert_Verification(promise,'¡Cerrando sesión!...','Light');
    }

    return outLogin;
}