//____________IMPORT/EXPORT____________
// Hooks de React
import { useEffect,useState,useContext } from "react";
import { useNavigate } from "react-router-dom";
// Componentes de React externos
import { Toaster } from 'sonner';
import { Tooltip } from "@mui/material";
// Servicios
import { encryptData } from "../services/Crypto";
// Rutas

// Contextos
import { modeContext,loadingOptionLoginContext,toastContext,modalContext,optionModalContext } from '../contexts/VariablesProvider'
import { loggedContext,nameContext,passwordContext,logContext } from "../contexts/SessionProvider";
import { permissionContext,permissionsContext } from "../contexts/PermissionsProvider";
import { typeUserContext } from "../contexts/TypeUserProvider";
import { usersContext,userContext } from "../contexts/UsersProvider";
import { statusAllContext,statusUserContext } from "../contexts/StatusProvider";
// Hooks personalizados
import { useOptionsLogin,useLogin } from "../hooks/Login";
import { useChangeMode } from "../hooks/Mode";
//__________ICONOS__________
// Icono para cambiar el modo de la interfaz
import { IoMdSunny } from "react-icons/io";
import { FaMoon } from "react-icons/fa";
// Iconos de la parte principal del login
import { MdManageAccounts } from "react-icons/md";
import { GiRiceCooker } from "react-icons/gi";
// Iconos de la sección de Administración del login
import { FaUserTie } from "react-icons/fa6";
import { GiChefToque } from "react-icons/gi";
import { FaWarehouse } from "react-icons/fa6";
// Iconos de la sección de Cocina del login
import { GiCook } from "react-icons/gi";
import { IoNutrition } from "react-icons/io5";
import { FaUserDoctor } from "react-icons/fa6";
// Iconos de la sección de Inicio de sesión del login
import { IoArrowBackCircle } from "react-icons/io5";
import { MdLogin } from "react-icons/md";
//__________ICONOS__________
// Estilos personalizados
import { Container_Page,Container_Button,Container_Page_Login_Dark,Container_Form_350_Dark,Container_Page_Login_Light,Container_Form_350_Light } from "../components/styled/Containers";
import { Img_Logo_Verical_Hospital_Dark,Img_Logo_Verical_Hospital_Light } from "../components/styled/Imgs";
import { Text_Title_Fade_20_Dark,Text_Title_Fade_20_Light } from "../components/styled/Text";
import { Button_Icon_Dark,Button_Icon_Blue_80_Dark,Button_Icon_Blue_50_Dark,Button_Icon_Block_80_Dark,Button_Icon_Green_50_Dark,Button_Icon_Light,Button_Icon_Blue_80_Light,Button_Icon_Blue_50_Light,Button_Icon_Block_80_Light,Button_Icon_Green_50_Light } from "../components/styled/Buttons";
import { Alert_Greeting,Toast_Styles,Alert_Verification } from '../components/styled/Notifications'
// Componentes personalizados
import Footer from '../components/footer/Footer';
import Loading from "./Loading";
import FormLogin from "../components/forms/FormLogin";
//____________IMPORT/EXPORT____________

// Página para
export default function Login(){
    // Constantes con el valor de los contextos
    const [isMode] = useContext(modeContext);
    const [isName,setIsName] = useContext(nameContext);
    const [isPassword,setIsPassword] = useContext(passwordContext);
    const [isLoadingOptionLogin] = useContext(loadingOptionLoginContext);
    const [isTypeUser] = useContext(typeUserContext);
    const [isToast,setIsToast] = useContext(toastContext);
    const [isLog,setIsLog] = useContext(logContext);
    const [isModal,setIsModal] = useContext(modalContext);
    const [isOptionModal,setIsOptionModal] = useContext(optionModalContext);
    const [isUsers] = useContext(usersContext);
    const [isPermissions] = useContext(permissionsContext);
    const [isStatusAll] = useContext(statusAllContext);
    const [isUser,setIsUser] = useContext(userContext);
    const [isPermission,setIsPermission] = useContext(permissionContext);
    const [isStatusUser,setIsStatusUser] = useContext(statusUserContext);
    const [isLogged,setIsLogged] = useContext(loggedContext);
    // Constantes con el valor de useState
    const [textName,setTextName] = useState(false);
    const [isFocusedName, setIsFocusedName] = useState(false);
    const [isFocusedNameColor, setIsFocusedNameColor] = useState(false);
    const [textPassword,setTextPassword] = useState(false);
    const [isFocusedPassword, setIsFocusedPassword] = useState(false);
    const [isFocusedPasswordColor, setIsFocusedPasswordColor] = useState(false);
    const [isLoading,setIsLoading] = useState(false);
    // useEffect con la página de carga
    useEffect(() => {
        setTimeout(() => {
            setIsLoading(true);
        },500);
    },[]);
    // useEffect con el titulo de la página
    useEffect(() => {
        document.title='MEALSYNC_Cargando'
        setTimeout(() => {
            document.title = "MEALSYNC_Iniciar_Sesión"
        },1000)
        Alert_Greeting("MEALSYNC",'¡Inicia sesión para acceder a la pagina principal!...');
        Alert_Greeting("MEALSYNC",'¡Te da la Bienvenida!...');
    }, []);
    // useEffect con el titulo de la página
    useEffect(() => {
        document.title = "MEALSYNC_Iniciar_Sesión"
        Alert_Greeting("MEALSYNC",'¡Inicia sesión para acceder a la pagina principal!...');
        Alert_Greeting("MEALSYNC",'¡Te da la Bienvenida!...');
    },[isLoading]);
    // useEffect con el inicio de sesión del login
    useEffect(() => {
        if(isLog && !isLogged){
            document.title = "Cargando...";
            const promise = new Promise(async (resolve,reject) => {
                try{
                    await delay(1000);
                    const existsUser = isUsers.find(user => user.usuario === isName);
                    
                    if(!existsUser) {
                        setIsLog(false);
                        return reject('¡Usuario no encontrado!...');
                    }
                    
                    if(existsUser.contrasena === isPassword){
                        let existsStatus = isStatusAll.find(user => user.idusuario === existsUser.idusuario);

                        if(!existsStatus){
                            setIsLog(false);
                            return reject('¡Usuario sin estatus!...');
                        }
                        if(!existsStatus.habilitado){
                            setIsLog(false);
                            return reject('¡Este usuario no se encuentra habilitado!...');
                        }
                        if(existsStatus.activo){
                            setIsLog(false);
                            return reject('¡Este usuario ya se encuentra activo!...');
                        }
            
                        const existsPermission = isPermissions.find(permissions => permissions.idusuario === existsUser.idusuario);

                        if(!existsPermission){ 
                            setIsLog(false);
                            return reject('¡Este usuario no cuenta con roles asignados!...')
                        }  

                        if(existsPermission.superadministrador){
                            setTimeout(() => {
                                const jsonUser = JSON.stringify(existsUser);
                                const jsonPermission = JSON.stringify(existsPermission);
                
                                const encryptedUser = encryptData(jsonUser);
                                const encryptedPermission = encryptData(jsonPermission);
                                const encryptedLogged = encryptData('true');
                                const encryptedLog = encryptData('true');
                                const encryptedType = encryptData(isTypeUser);
                
                                if( encryptedUser && encryptedPermission && encryptedLogged && encryptedLog && encryptedType){
                                    resolve('¡SESIÓN INICIADA!...');
                
                                    sessionStorage.setItem('User',encryptedUser);
                                    sessionStorage.setItem('Permission',encryptedPermission);
                                    sessionStorage.setItem('Logged',encryptedLogged);
                                    sessionStorage.setItem('Log',encryptedLog);
                                    sessionStorage.setItem('TypeUser',encryptedType);
                
                                    setTimeout(() => {
                                        setIsToast(false);
                                    },1500);
                
                                    setTimeout(() => {
                                        setIsUser(JSON.parse(jsonUser));
                                        setIsPermission(JSON.parse(jsonPermission));
                                        
                                        existsStatus = isStatusAll.find(user => user.idusuario === existsUser.idusuario);
                                        
                                        const jsonStatus = JSON.stringify(existsStatus);
                                        const encryptedStatus = encryptData(jsonStatus);
                
                                        if(encryptedStatus){
                                            sessionStorage.setItem('Status',encryptedStatus);
                                            setIsStatusUser(JSON.parse(jsonStatus));
                                            setIsLogged(true);
    
                                            if(isTypeUser === 'Doctor'){
                                                setIsModal(true);
                                                setIsOptionModal('Alert-Doctor');
                                            }
                                            
                                            console.log('¡Credenciales encriptadas correctamente!...');

                                            setIsName('');
                                            setIsPassword('');

                                            navigate(isTypeUser === 'Cook' || isTypeUser === 'Nutritionist' || isTypeUser === 'Doctor' ? '/Menu' : '/Administrator',{ replace: true });
                                        }else{
                                            setIsLog(false);
                                            return console.log('¡Error al encriptar el estatus de la sesión!...')
                                        }
                                    },1500);
                                }else{
                                    setIsLog(false);
                                    return console.log('¡Error al encriptar las credenciales!...')
                                }
                            },100)
                        }
                        if(isTypeUser === 'Cook' && !existsPermission.cocinero){
                            setIsLog(false);
                            return reject('¡Este usuario no cuenta con el rol de COCINERO!...');
                        }
                        if(isTypeUser === 'Nutritionist' && !existsPermission.nutriologo){
                            setIsLog(false);
                            return reject('¡Este usuario no cuenta con el rol de NUTRIÓLOGO!...');
                        }
                        if(isTypeUser === 'Doctor' && !existsPermission.medico){
                            setIsLog(false);
                            return reject('¡Este usuario no cuenta con el rol de MÉDICO!...');
                        }
                        if(isTypeUser === 'Administrator' && !existsPermission.administrador){
                            setIsLog(false);
                            return reject('¡Este usuario no cuenta con el rol de ADMINISTRADOR!...');
                        }
                        if(isTypeUser === 'Chef' && !existsPermission.chef){
                            setIsLog(false);
                            return reject('¡Este usuario no cuenta con el rol de CHEF!...');
                        }
                        if(isTypeUser === 'Storekeeper' && !existsPermission.almacenista){
                            setIsLog(false);
                            return reject('¡Este usuario no cuenta con el rol de ALMACENISTA!...');
                        }

                        setTimeout(() => {
                            const jsonUser = JSON.stringify(existsUser);
                            const jsonPermission = JSON.stringify(existsPermission);
            
                            const encryptedUser = encryptData(jsonUser);
                            const encryptedPermission = encryptData(jsonPermission);
                            const encryptedLogged = encryptData('true');
                            const encryptedLog = encryptData('true');
                            const encryptedType = encryptData(isTypeUser);
            
                            if( encryptedUser && encryptedPermission && encryptedLogged && encryptedLog && encryptedType){
                                resolve('¡SESIÓN INICIADA!...');
            
                                sessionStorage.setItem('User',encryptedUser);
                                sessionStorage.setItem('Permission',encryptedPermission);
                                sessionStorage.setItem('Logged',encryptedLogged);
                                sessionStorage.setItem('Log',encryptedLog);
                                sessionStorage.setItem('TypeUser',encryptedType);
            
                                setTimeout(() => {
                                    setIsToast(false);
                                },1500);
            
                                setTimeout(() => {
                                    setIsUser(JSON.parse(jsonUser));
                                    setIsPermission(JSON.parse(jsonPermission));
                                    
                                    existsStatus = isStatusAll.find(user => user.idusuario === existsUser.idusuario);
                                    
                                    const jsonStatus = JSON.stringify(existsStatus);
                                    const encryptedStatus = encryptData(jsonStatus);
            
                                    if(encryptedStatus){
                                        sessionStorage.setItem('Status',encryptedStatus);
                                        setIsStatusUser(JSON.parse(jsonStatus));
                                        setIsLogged(true);

                                        if(isTypeUser === 'Doctor'){
                                            setIsModal(true);
                                            setIsOptionModal('Alert-Doctor');
                                        }
                                        
                                        console.log('¡Credenciales encriptadas correctamente!...');

                                        setIsName('');
                                        setIsPassword('');

                                        navigate(isTypeUser === 'Cook' || isTypeUser === 'Nutritionist' || isTypeUser === 'Doctor' ? '/Menu' : '/Administrator',{ replace: true });
                                    }else{
                                        setIsLog(false);
                                        return console.log('¡Error al encriptar el estatus de la sesión!...')
                                    }
                                },1500);
                            }else{
                                setIsLog(false);
                                return console.log('¡Error al encriptar las credenciales!...')
                            }
                        },100)
                    }else{
                        setIsLog(false);
                        return reject('¡Usuario o contraseña incorrectos!...');
                    }
                }catch(error){
                    setIsLog(false);
                    reject('¡Ocurrio un error inesperado...');
                }
            });

            setIsToast(true);
            Alert_Verification(promise,'Verificando credenciales...');

            document.title = "MEALSYNC_Iniciar_Sesión";
        }
    },[isLog]);
    // Constantes con la funcionalidad de los hooks
    const navigate = useNavigate();
    const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));
    const optionsLogin = useOptionsLogin();
    const login = useLogin();
    const changeMode = useChangeMode();
    // Estructura del componente
    if(!isLoading) return <Loading/>
    // Estructura del componente
    return(
        <Container_Page>
            {isMode ? (
                <>
                    <Container_Page_Login_Light>
                        <Tooltip title='Modo Claro' placement="left">
                            <Button_Icon_Light onClick={() => changeMode()}><IoMdSunny/></Button_Icon_Light>
                        </Tooltip>
                        <Container_Form_350_Light>
                            <Img_Logo_Verical_Hospital_Light/>
                            <Text_Title_Fade_20_Light>Bienvenido(a)</Text_Title_Fade_20_Light>
                            {isLoadingOptionLogin === '' ? (
                                <>  
                                    <Container_Button>
                                        <Tooltip title='Administración' placement="top">
                                            <Button_Icon_Blue_80_Light onClick={() => optionsLogin('Administration','')}><MdManageAccounts/></Button_Icon_Blue_80_Light>
                                        </Tooltip>
                                    </Container_Button>
                                    <Container_Button>
                                        <Tooltip title='Cocina' placement="top">
                                            <Button_Icon_Blue_80_Light onClick={() => optionsLogin('Kitchen','')}><GiRiceCooker/></Button_Icon_Blue_80_Light>
                                        </Tooltip>
                                    </Container_Button>
                                </>
                            ):(
                                <></>
                            )}
                            {isLoadingOptionLogin === 'Administration' ? (
                                <>
                                    <Container_Button>
                                        <Tooltip title='Administrador' placement="top">
                                            <Button_Icon_Blue_80_Light onClick={() => optionsLogin('Login','Administrator')}><FaUserTie/></Button_Icon_Blue_80_Light>
                                        </Tooltip>    
                                    </Container_Button>
                                    <Container_Button>
                                        <Tooltip title='Chef' placement="top">
                                            <Button_Icon_Blue_80_Light onClick={() => optionsLogin('Login','Chef')}><GiChefToque/></Button_Icon_Blue_80_Light>
                                        </Tooltip>    
                                    </Container_Button>
                                    <Container_Button>
                                        <Tooltip title='Almacenista' placement="top">
                                            <Button_Icon_Blue_80_Light onClick={() => optionsLogin('Login','Storekeeper')}><FaWarehouse/></Button_Icon_Blue_80_Light>
                                        </Tooltip>    
                                    </Container_Button>
                                    <Container_Button>
                                        <Tooltip title='Atrás' placement="top">
                                            <Button_Icon_Blue_80_Light onClick={() => optionsLogin('','')}><IoArrowBackCircle/></Button_Icon_Blue_80_Light>
                                        </Tooltip>    
                                    </Container_Button>
                                </>
                            ):(
                                <></>
                            )}
                            {isLoadingOptionLogin === 'Kitchen' ? (
                                <>
                                    <Container_Button>
                                        <Tooltip title='Cocinero' placement="top">
                                            <Button_Icon_Blue_80_Light onClick={() => optionsLogin('Login','Cook')}><GiCook/></Button_Icon_Blue_80_Light>
                                        </Tooltip>    
                                    </Container_Button>
                                    <Container_Button>
                                        <Tooltip title='Nutriólogo' placement="top">
                                            <Button_Icon_Block_80_Light onClick={() => optionsLogin('Login','Nutritionist')}><IoNutrition/></Button_Icon_Block_80_Light>
                                        </Tooltip>    
                                    </Container_Button>
                                    <Container_Button>
                                        <Tooltip title='Médico' placement="top">
                                            <Button_Icon_Blue_80_Light onClick={() => optionsLogin('Login','Doctor')}><FaUserDoctor/></Button_Icon_Blue_80_Light>
                                        </Tooltip>    
                                    </Container_Button>
                                    <Container_Button>
                                        <Tooltip title='Atrás' placement="top">
                                            <Button_Icon_Blue_80_Light onClick={() => optionsLogin('','')}><IoArrowBackCircle/></Button_Icon_Blue_80_Light>
                                        </Tooltip>    
                                    </Container_Button>
                                </>
                            ):(
                                <></>
                            )}
                            {isLoadingOptionLogin === 'Login' ? (
                                <>
                                    <FormLogin/>
                                    <Container_Button>
                                        {isTypeUser === 'Cook' || isTypeUser === 'Nutritionist' || isTypeUser === 'Doctor' ? (
                                            <Tooltip title='Atrás' placement="top">
                                                <Button_Icon_Blue_50_Light onClick={() => optionsLogin('Kitchen','')}><IoArrowBackCircle/></Button_Icon_Blue_50_Light>
                                            </Tooltip>
                                        ):(
                                            <Tooltip title='Atrás' placement="top">
                                                <Button_Icon_Blue_50_Light onClick={() => optionsLogin('Administration','')}><IoArrowBackCircle/></Button_Icon_Blue_50_Light>
                                            </Tooltip>
                                        )}
                                        <Tooltip title='Iniciar sesión' placement="top">
                                            <Button_Icon_Green_50_Light onClick={() => login()}><MdLogin/></Button_Icon_Green_50_Light>
                                        </Tooltip>
                                    </Container_Button>
                                </>
                            ):(
                                <></>
                            )}
                        </Container_Form_350_Light>        
                    </Container_Page_Login_Light>
                </>
            ):(
                <>
                    <Container_Page_Login_Dark>
                        <Tooltip title='Modo Oscuro' placement="left">
                            <Button_Icon_Dark onClick={() => changeMode()}><FaMoon/></Button_Icon_Dark>
                        </Tooltip>
                        <Container_Form_350_Dark>
                            <Img_Logo_Verical_Hospital_Dark/>
                            <Text_Title_Fade_20_Dark>Bienvenido(a)</Text_Title_Fade_20_Dark>
                            {isLoadingOptionLogin === '' ? (
                                <>  
                                    <Container_Button>
                                        <Tooltip title='Administración' placement="top">
                                            <Button_Icon_Blue_80_Dark onClick={() => optionsLogin('Administration','')}><MdManageAccounts/></Button_Icon_Blue_80_Dark>
                                        </Tooltip>
                                    </Container_Button>
                                    <Container_Button>
                                        <Tooltip title='Cocina' placement="top">
                                            <Button_Icon_Blue_80_Dark onClick={() => optionsLogin('Kitchen','')}><GiRiceCooker/></Button_Icon_Blue_80_Dark>
                                        </Tooltip>
                                    </Container_Button>
                                </>
                            ):(
                                <></>
                            )}
                            {isLoadingOptionLogin === 'Administration' ? (
                                <>
                                    <Container_Button>
                                        <Tooltip title='Administrador' placement="top">
                                            <Button_Icon_Blue_80_Dark onClick={() => optionsLogin('Login','Administration')}><FaUserTie/></Button_Icon_Blue_80_Dark>
                                        </Tooltip>    
                                    </Container_Button>
                                    <Container_Button>
                                        <Tooltip title='Chef' placement="top">
                                            <Button_Icon_Blue_80_Dark onClick={() => optionsLogin('Login','Chef')}><GiChefToque/></Button_Icon_Blue_80_Dark>
                                        </Tooltip>    
                                    </Container_Button>
                                    <Container_Button>
                                        <Tooltip title='Almacenista' placement="top">
                                            <Button_Icon_Blue_80_Dark onClick={() => optionsLogin('Login','Storekeeper')}><FaWarehouse/></Button_Icon_Blue_80_Dark>
                                        </Tooltip>    
                                    </Container_Button>
                                    <Container_Button>
                                        <Tooltip title='Atrás' placement="top">
                                            <Button_Icon_Blue_80_Dark onClick={() => optionsLogin('','')}><IoArrowBackCircle/></Button_Icon_Blue_80_Dark>
                                        </Tooltip>    
                                    </Container_Button>
                                </>
                            ):(
                                <></>
                            )}
                            {isLoadingOptionLogin === 'Kitchen' ? (
                                <>
                                    <Container_Button>
                                        <Tooltip title='Cocinero' placement="top">
                                            <Button_Icon_Blue_80_Dark onClick={() => optionsLogin('Login','Cook')}><GiCook/></Button_Icon_Blue_80_Dark>
                                        </Tooltip>    
                                    </Container_Button>
                                    <Container_Button>
                                        <Tooltip title='Nutriólogo' placement="top">
                                            <Button_Icon_Block_80_Dark onClick={() => optionsLogin('Login','Nutritionist')}><IoNutrition/></Button_Icon_Block_80_Dark>
                                        </Tooltip>    
                                    </Container_Button>
                                    <Container_Button>
                                        <Tooltip title='Médico' placement="top">
                                            <Button_Icon_Blue_80_Dark onClick={() => optionsLogin('Login','Doctor')}><FaUserDoctor/></Button_Icon_Blue_80_Dark>
                                        </Tooltip>    
                                    </Container_Button>
                                    <Container_Button>
                                        <Tooltip title='Atrás' placement="top">
                                            <Button_Icon_Blue_80_Dark onClick={() => optionsLogin('','')}><IoArrowBackCircle/></Button_Icon_Blue_80_Dark>
                                        </Tooltip>    
                                    </Container_Button>
                                </>
                            ):(
                                <></>
                            )}
                            {isLoadingOptionLogin === 'Login' ? (
                                <>
                                    <FormLogin/>
                                    <Container_Button>
                                        {isTypeUser === 'Cook' || isTypeUser === 'Nutritionist' || isTypeUser === 'Doctor' ? (
                                            <Tooltip title='Atrás' placement="top">
                                                <Button_Icon_Blue_50_Dark onClick={() => optionsLogin('Kitchen','')}><IoArrowBackCircle/></Button_Icon_Blue_50_Dark>
                                            </Tooltip>
                                        ):(
                                            <Tooltip title='Atrás' placement="top">
                                                <Button_Icon_Blue_50_Dark onClick={() => optionsLogin('Administration','')}><IoArrowBackCircle/></Button_Icon_Blue_50_Dark>
                                            </Tooltip>
                                        )}
                                        <Tooltip title='Iniciar sesión' placement="top">
                                            <Button_Icon_Green_50_Dark onClick={() => login()}><MdLogin/></Button_Icon_Green_50_Dark>
                                        </Tooltip>
                                    </Container_Button>
                                </>
                            ):(
                                <></>
                            )}
                        </Container_Form_350_Dark>        
                    </Container_Page_Login_Dark>
                </>
            )}
            <Footer/>
            {isToast ? (
                <Toast_Styles>
                    <Toaster
                    visibleToasts={3}
                    richColors
                    theme='light'
                    position='top-right'
                    />
                </Toast_Styles>
            ):(
                <Toast_Styles>
                    <Toaster
                    visibleToasts={3}
                    richColors
                    theme='dark'
                    position='top-right'
                    />
                </Toast_Styles>
            )}
        </Container_Page>
    );
};