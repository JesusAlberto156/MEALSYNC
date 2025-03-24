import { useContext } from "react";
import { useNavigate } from "react-router-dom";

import { usersContext,userContext } from "../contexts/UsersProvider";
import { permissionsContext,permissionContext } from "../contexts/PermissionsProvider";
import { statusAllContext,statusUserContext } from "../contexts/StatusProvider";
import { typeUserContext } from "../contexts/TypeUserProvider";
import { loggedContext,enableContext,nameContext,passwordContext } from "../contexts/SessionProvider";
import { loginContext,toastContext,visibleContext,searchTermContext,selectedRowContext } from "../contexts/VariablesProvider";
import { navbarContext,sidebarContext } from "../contexts/ViewsProvider";
import { modalOutLoginContext,modalAlertMedicoContext,modalShoppingCartContext } from "../contexts/ModalsProvider";

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
                
                const existsUser = users.find(user => user.usuario === name);
                
                if(!existsUser) return reject('¡Usuario no encontrado!...')

                if(existsUser.contrasena === password){

                    let existsStatus = statusAll.find(user => user.idusuario === existsUser.idusuario);
                    if(!existsStatus) return reject('¡Usuario sin estatus!...');
                    if(!existsStatus.habilitado) return reject('¡Este usuario no se encuentra habilitado!...');
                    if(existsStatus.activo) return reject('¡Este usuario ya se encuentra activo!...');

                    const existsPermission = permissions.find(permissions => permissions.idusuario === existsUser.idusuario);
                    if(!existsPermission) return reject('¡Este usuario no cuenta con roles asignados!...')
                
                    if(typeUser === 'Cocinero' && !existsPermission.cocinero) return reject('¡Este usuario no cuenta con el rol de COCINERO!...');
                    if(typeUser === 'Nutriologo' && !existsPermission.nutriologo) return reject('¡Este usuario no cuenta con el rol de NUTRIÓLOGO!...');
                    if(typeUser === 'Medico' && !existsPermission.medico) return reject('¡Este usuario no cuenta con el rol de MÉDICO!...');
                    if(typeUser === 'Administrador' && !existsPermission.administrador) return reject('¡Este usuario no cuenta con el rol de ADMINISTRADOR!...');
                    if(typeUser === 'Chef' && !existsPermission.chef) return reject('¡Este usuario no cuenta con el rol de CHEF!...');
                    if(typeUser === 'Almacen' && !existsPermission.almacen) return reject('¡Este usuario no cuenta con el rol de ALMACÉN!...');
                    
                    setTimeout(() => {
                        const jsonUser = JSON.stringify(existsUser);
                        const jsonPermission = JSON.stringify(existsPermission);

                        const encryptedUser = encryptData(jsonUser);
                        const encryptedPermission = encryptData(jsonPermission);
                        const encryptedLogged = encryptData('true');
                        const encryptedType = encryptData(typeUser);
                        const encryptedEnable = encryptData(existsStatus.habilitado ? 'true' : 'false');

                        if( encryptedUser && encryptedPermission && encryptedLogged && encryptedType && encryptedEnable){
                            resolve('¡SESIÓN INICIADA!...');

                            sessionStorage.setItem('User',encryptedUser);
                            sessionStorage.setItem('Permission',encryptedPermission);
                            sessionStorage.setItem('Logged',encryptedLogged);
                            sessionStorage.setItem('TypeUser',encryptedType);
                            sessionStorage.setItem('Enable',encryptedEnable);

                            setTimeout(() => {
                                setToast(false);
                            },1500);
                            
                            setTimeout(() => {
                                setUser(JSON.parse(jsonUser));
                                setPermission(JSON.parse(jsonPermission));
                                setIsEnable(true);

                                existsStatus = statusAll.find(user => user.idusuario === existsUser.idusuario);
                                const jsonStatus = JSON.stringify(existsStatus);
                                const encryptedStatus = encryptData(jsonStatus);

                                if(encryptedStatus){
                                    sessionStorage.setItem('StatusUser',encryptedStatus);
                                    setStatusUser(JSON.parse(jsonStatus));
                                    setIsLogged(true);
                                    console.log('¡Credenciales encriptadas correctamente!...')
                                    navigate(typeUser === 'Cocinero' || typeUser === 'Nutriologo' || typeUser === 'Medico' ? '/Menu' : '/Administrator',{ replace: true });
                                }else{
                                    return console.log('¡Error al encriptar el estatus de la sesión!...')
                                }
                            },1500);
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
    const [isEnable,setIsEnable] = useContext(enableContext);

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
                    setIsEnable(null);
                    sessionStorage.removeItem('Enable');
                    
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