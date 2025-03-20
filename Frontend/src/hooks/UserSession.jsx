import { useContext } from "react";
import { useNavigate } from "react-router-dom";

import { usersContext,userContext } from "../contexts/UsersProvider";
import { permissionsContext,permissionContext } from "../contexts/PermissionsProvider";
import { statusAllContext,statusUserContext } from "../contexts/StatusProvider";
import { typeUserContext } from "../contexts/TypeUserProvider";
import { loggedContext,enableContext,nameContext,passwordContext } from "../contexts/SessionProvider";

import { loginContext,toastContext,visibleContext,searchTermContext } from "../contexts/VariablesProvider";
import { navbarContext,sidebarContext } from "../contexts/ViewsProvider";
import { modalOutLoginContext,modalAlertMedicoContext,modalShoppingCartContext } from "../contexts/ModalsProvider";

import { socketContext } from "../contexts/SocketProvider";

import { Alert_Verification } from "../components/styled/Notifications";

import { encryptData } from "../services/Crypto";

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const useLogin = () => {
    const [typeUser,setTypeUser] = useContext(typeUserContext);
    const [isLogged,setIsLogged] = useContext(loggedContext);
    const [users, setUsers] = useContext(usersContext)
    const [permissions, setPermissions] = useContext(permissionsContext);
    const [user,setUser] = useContext(userContext);
    const [permission,setPermission] = useContext(permissionContext);
    const [statusUser,setStatusUser] = useContext(statusUserContext);
    const [statusAll,setStatusAll] = useContext(statusAllContext);
    const [isEnable,setIsEnable] = useContext(enableContext);
    const [toast,setToast] = useContext(toastContext);

    const [name] = useContext(nameContext);
    const [password] = useContext(passwordContext);

    const navigate = useNavigate();

    const login = async () => {
        document.title = "Cargando...";

        const promise = new Promise(async (resolve,reject) => {
            try{
                await delay(1000);
                
                const existsUser = users.find(user => user.usuario.trim() === name.trim());
                
                if(!existsUser) return reject('¡Usuario no encontrado!...')

                if(existsUser.contrasena === password){

                    const existsStatus = statusAll.find(user => user.idusuario === existsUser.idusuario);
                    if(!existsStatus) return reject('¡Usuario sin estatus!...');
                    if(!existsStatus.habilitado) return reject('¡Este usuario no se encuentra habilitado!...');

                    const existsPermission = permissions.find(permissions => permissions.idusuario === existsUser.idusuario);
                    if(!existsPermission) return reject('¡Este usuario no cuenta con roles asignados!...')
                
                    if(typeUser === 'Cocinero'){
                        if(!existsPermission.cocinero) return reject('¡Este usuario no cuenta con el rol de COCINERO!...');
                    }
                    if(typeUser === 'Nutriologo'){
                        if(!existsPermission.nutriologo) return reject('¡Este usuario no cuenta con el rol de NUTRIÓLOGO!...');
                    }
                    if(typeUser === 'Medico'){
                        if(!existsPermission.medico) return reject('¡Este usuario no cuenta con el rol de MÉDICO!...');
                    }
                    if(typeUser === 'Administrador'){
                        if(!existsPermission.administrador) return reject('¡Este usuario no cuenta con el rol de ADMINISTRADOR!...');
                    }
                    if(typeUser === 'Chef'){
                        if(!existsPermission.chef) return reject('¡Este usuario no cuenta con el rol de CHEF!...');
                    }
                    if(typeUser === 'Almacen'){
                        if(!existsPermission.almacen) return reject('¡Este usuario no cuenta con el rol de ALMACÉN!...');
                    }

                    setTimeout(() => {
                        const jsonUser = JSON.stringify(existsUser);
                        const jsonPermission = JSON.stringify(existsPermission);
                        const jsonStatus = JSON.stringify(existsStatus);

                        const encryptedUser = encryptData(jsonUser);
                        const encryptedPermission = encryptData(jsonPermission);
                        const encryptedStatus = encryptData(jsonStatus);
                        const encryptedLogged = encryptData('true');
                        const encryptedEnable = encryptData(existsStatus.habilitado ? 'true' : 'false');
                        const encryptedType = encryptData(typeUser);

                        if( encryptedUser && encryptedPermission && encryptedStatus && encryptedLogged && encryptedType && encryptedEnable){
                            console.log('¡Credenciales encriptadas correctamente!...')

                            resolve('¡SESIÓN INICIADA!...');
                            sessionStorage.setItem('User',encryptedUser);
                            sessionStorage.setItem('Permission',encryptedPermission);
                            sessionStorage.setItem('Logged',encryptedLogged);
                            sessionStorage.setItem('TypeUser',encryptedType);
                            sessionStorage.setItem('Enable',encryptedEnable);
                            sessionStorage.setItem('StatusUser',encryptedStatus);
                            setTimeout(() => {
                                setToast(false);
                            },1500);
                            setTimeout(() => {
                                setIsLogged(true);
                                setUser(existsUser);
                                setPermission(existsPermission);
                                setStatusUser(existsStatus);
                                setIsEnable(existsStatus.habilitado);
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
    const {
            loadingOption, isLoadingOption,
            loadingAdministration, isLoadingAdministration,
            loadingKitchen, isLoadingKitchen,
            loadingLogin, isLoadingLogin,
            loadingLoginAdministration, isLoadingLoginAdministration,
            loadingLoginKitchen, isLoadingLoginKitchen
        } = useContext(loginContext);
    const [typeUser,setTypeUser] = useContext(typeUserContext);
    const [isLogged,setIsLogged] = useContext(loggedContext);
    const [sidebar,setSidebar] = useContext(sidebarContext);
    const [navbar,setNavbar] = useContext(navbarContext);
    const [visible,setVisible] = useContext(visibleContext);
    const [modalAlertMedico,setModalAlertMedico] = useContext(modalAlertMedicoContext);
    const [modalOutLogin,setModalOutLogin] = useContext(modalOutLoginContext);
    const [modalShoppingCart,setModalShoppingCart] = useContext(modalShoppingCartContext);
    const [user,setUser] = useContext(userContext);
    const [permission,setPermission] = useContext(permissionContext);
    const [toast,setToast] = useContext(toastContext);
    const [searchTerm,setSearchTerm] = useContext(searchTermContext);

    const [statusUser,setStatusUser] = useContext(statusUserContext);
    const [isEnable,setIsEnable] = useContext(enableContext);

    const [name,setName] = useContext(nameContext);
    const [password,setPassword] = useContext(passwordContext);

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
                    setTypeUser('');
                    sessionStorage.removeItem('TypeUser');
                    setIsLogged(false);
                    sessionStorage.removeItem('Logged')
                    setSidebar('Inicio');
                    setNavbar('');
                    setVisible(true);
                    setModalAlertMedico(true);
                    setModalOutLogin(false);
                    setModalShoppingCart(false);
                    setUser([]);
                    sessionStorage.removeItem('User');
                    setPermission([]);
                    sessionStorage.removeItem('Permission');
                    setToast(false);
                    setSearchTerm('');
                    setStatusUser([]);
                    sessionStorage.removeItem('StatusUser')                   
                    setIsEnable(false);                   
                    sessionStorage.removeItem('Enable');
                    setName('');
                    setPassword('');
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