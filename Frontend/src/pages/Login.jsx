//____________IMPORT/EXPORT____________
// Hooks de React
import { useEffect,useContext } from "react";
import { useNavigate } from "react-router-dom";
// Componentes de React externos
import { Toaster } from 'sonner';
import { Tooltip } from "@mui/material";
// Servicios
import { encryptData } from "../services/Crypto";
// Rutas

// Contextos
import { themeModeContext,loginViewContext } from "../contexts/ViewsProvider";
import { modeContext,loadingOptionLoginContext,modalContext,optionModalContext } from '../contexts/VariablesProvider';
import { loggedContext,nameContext,passwordContext,logContext } from "../contexts/SessionProvider";
import { permissionContext,permissionsContext } from "../contexts/PermissionsProvider";
import { typeUserContext } from "../contexts/TypeUserProvider";
import { usersContext,userContext } from "../contexts/UsersProvider";
import { statusAllContext,statusUserContext } from "../contexts/StatusProvider";
// Hooks personalizados
import { useChangeLoginView } from "../hooks/Views";
import { useLogin } from '../hooks/Login'
//__________ICONOS__________
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
import { Container_Page,Container_Button_Column_300,Container_Button_Row_300,Container_Page_Login,Container_Form_350 } from "../components/styled/Containers";
import { Img_Logo_Verical_Hospital_250,Img_Logo_Hospital_150 } from "../components/styled/Imgs";
import { Text_Title_Fade_22 } from "../components/styled/Text";
import { Button_Icon_Blue_220,Button_Icon_Blue_150,Button_Icon_Green_150 } from "../components/styled/Buttons";
import { Alert_Greeting_Light,Alert_Greeting_Dark,Alert_Verification,Alert_Styles } from '../components/styled/Alerts';
// Componentes personalizados
import Setting from '../components/navegation/Setting';
import Footer from '../components/footer/Footer';
import FormLogin from "../components/forms/FormLogin";
//____________IMPORT/EXPORT____________

// Página para
export default function Login(){
    // Constantes con el valor de los contextos
    const [themeMode,setThemeMode] = useContext(themeModeContext);
    const [currentView,setCurrentView] = useContext(loginViewContext);
    const [isMode] = useContext(modeContext);
    const [isName,setIsName] = useContext(nameContext);
    const [isPassword,setIsPassword] = useContext(passwordContext);
    const [isLoadingOptionLogin] = useContext(loadingOptionLoginContext);
    const [isTypeUser] = useContext(typeUserContext);
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
    // useEffect con el titulo de la página
    useEffect(() => {
        document.title = "MEALSYNC_Iniciar_Sesión";
        if(isMode){
            Alert_Greeting_Light("MEALSYNC",'¡Inicia sesión para acceder a la pagina principal!...');
            Alert_Greeting_Light("MEALSYNC",'¡Te da la Bienvenida!...');
        }else{
            Alert_Greeting_Dark("MEALSYNC",'¡Inicia sesión para acceder a la pagina principal!...');
            Alert_Greeting_Dark("MEALSYNC",'¡Te da la Bienvenida!...');
        }
    },[]);
    // useEffect con el inicio de sesión del login
    useEffect(() => {
        if(isLog && !isLogged){
            document.title = "Cargando...";
            const promise = new Promise(async (resolve,reject) => {
                try{
                    setTimeout(() => {
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
                                return reject('¡Este usuario no cuenta con roles asignados!...');
                            }  

                            if(existsPermission.superadministrador){
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

                                            navigate(isTypeUser === 'Cook' || isTypeUser === 'Nutritionist' || isTypeUser === 'Doctor' ? '/Kitchen' : '/Administration',{ replace: true });
                                        }else{
                                            setIsLog(false);
                                            return console.log('¡Error al encriptar el estatus de la sesión!...')
                                        }
                                    },2000);
                                }else{
                                    setIsLog(false);
                                    return console.log('¡Error al encriptar las credenciales!...')
                                }
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

                                        navigate(isTypeUser === 'Cook' || isTypeUser === 'Nutritionist' || isTypeUser === 'Doctor' ? '/Kitchen' : '/Administration',{ replace: true });
                                    }else{
                                        setIsLog(false);
                                        return console.log('¡Error al encriptar el estatus de la sesión!...')
                                    }
                                },2000);
                            }else{
                                setIsLog(false);
                                return console.log('¡Error al encriptar las credenciales!...')
                            }
                        }else{
                            setIsLog(false);
                            return reject('¡Usuario o contraseña incorrectos!...');
                        }
                    },1000);
                }catch(error){
                    setIsLog(false);
                    reject('¡Ocurrio un error inesperado...');
                }
            });

            Alert_Verification(promise,'Verificando credenciales...');

            document.title = "MEALSYNC_Iniciar_Sesión";
        }
    },[isLog]);
    // Constantes con la funcionalidad de los hooks
    const navigate = useNavigate();
    const changeViewLogin = useChangeLoginView();
    const login = useLogin();
    // Estructura del componente
    return(
        <Container_Page>
            <Container_Page_Login ThemeMode={themeMode}>
                <Setting/>
                <Container_Form_350 ThemeMode={themeMode}>
                    {currentView === '' ? (
                        <>  
                            <Img_Logo_Verical_Hospital_250 ThemeMode={themeMode}/>
                            <Text_Title_Fade_22 ThemeMode={themeMode}>Bienvenido(a)</Text_Title_Fade_22>
                            <Container_Button_Column_300>
                                <Tooltip title='Administración' placement="top">
                                    <Button_Icon_Blue_220 ThemeMode={themeMode} onClick={() => changeViewLogin('Administration','')}><MdManageAccounts/></Button_Icon_Blue_220>
                                </Tooltip>
                                <Tooltip title='Cocina' placement="top">
                                    <Button_Icon_Blue_220 ThemeMode={themeMode} onClick={() => changeViewLogin('Kitchen','')}><GiRiceCooker/></Button_Icon_Blue_220>
                                </Tooltip>
                            </Container_Button_Column_300>
                        </>
                    ):(
                        <></>
                    )}
                    {currentView === 'Administration' ? (
                        <>
                            <Img_Logo_Hospital_150 ThemeMode={themeMode}/>
                            <Text_Title_Fade_22 ThemeMode={themeMode}>Escoger usuario</Text_Title_Fade_22>
                            <Container_Button_Column_300>
                                <Tooltip title='Administrador' placement="top">
                                    <Button_Icon_Blue_220 ThemeMode={themeMode} onClick={() => changeViewLogin('Login','Administrator')}><FaUserTie/></Button_Icon_Blue_220>
                                </Tooltip>
                                <Tooltip title='Chef' placement="top">
                                    <Button_Icon_Blue_220 ThemeMode={themeMode} onClick={() => changeViewLogin('Login','Chef')}><GiChefToque/></Button_Icon_Blue_220>
                                </Tooltip>    
                                <Tooltip title='Almacenista' placement="top">
                                    <Button_Icon_Blue_220 ThemeMode={themeMode} onClick={() => changeViewLogin('Login','Storekeeper')}><FaWarehouse/></Button_Icon_Blue_220>
                                </Tooltip> 
                                <Tooltip title='Atrás' placement="top">
                                    <Button_Icon_Blue_220 ThemeMode={themeMode} onClick={() => changeViewLogin('','')}><IoArrowBackCircle/></Button_Icon_Blue_220>
                                </Tooltip>
                            </Container_Button_Column_300>
                        </>
                    ):(
                        <></>
                    )}
                    {currentView === 'Kitchen' ? (
                        <>
                            <Img_Logo_Hospital_150 ThemeMode={themeMode}/>
                            <Text_Title_Fade_22 ThemeMode={themeMode}>Escoger usuario</Text_Title_Fade_22>
                            <Container_Button_Column_300>
                                <Tooltip title='Cocinero' placement="top">
                                    <Button_Icon_Blue_220 ThemeMode={themeMode} onClick={() => changeViewLogin('Login','Cook')}><GiCook/></Button_Icon_Blue_220>
                                </Tooltip>  
                                <Tooltip title='Nutriólogo' placement="top">
                                    <Button_Icon_Blue_220 ThemeMode={themeMode} onClick={() => changeViewLogin('Login','Nutritionist')}><IoNutrition/></Button_Icon_Blue_220>
                                </Tooltip> 
                                <Tooltip title='Médico' placement="top">
                                    <Button_Icon_Blue_220 ThemeMode={themeMode} onClick={() => changeViewLogin('Login','Doctor')}><FaUserDoctor/></Button_Icon_Blue_220>
                                </Tooltip> 
                                <Tooltip title='Atrás' placement="top">
                                    <Button_Icon_Blue_220 ThemeMode={themeMode} onClick={() => changeViewLogin('','')}><IoArrowBackCircle/></Button_Icon_Blue_220>
                                </Tooltip> 
                            </Container_Button_Column_300>
                        </>
                    ):(
                        <></>
                    )}
                    {currentView === 'Login' ? (
                        <>
                            <Img_Logo_Hospital_150 ThemeMode={themeMode}/>
                            <Text_Title_Fade_22 ThemeMode={themeMode}>Iniciar sesión</Text_Title_Fade_22>
                            <FormLogin/>
                            <Container_Button_Row_300>
                                <Tooltip title='Atrás' placement="top">
                                    <Button_Icon_Blue_150 ThemeMode={themeMode} onClick={() => changeViewLogin(
                                        isTypeUser === 'Cook' || isTypeUser === 'Nutritionist' || isTypeUser === 'Doctor' ? 'Kitchen' : 'Administration',''
                                    )}><IoArrowBackCircle/></Button_Icon_Blue_150>
                                </Tooltip>
                                <Tooltip title='Iniciar sesión' placement="top">
                                    <Button_Icon_Green_150 ThemeMode={themeMode} onClick={() => login()}><MdLogin/></Button_Icon_Green_150>
                                </Tooltip>
                            </Container_Button_Row_300>
                        </>
                    ):(
                        <></>
                    )}
                </Container_Form_350>    
            </Container_Page_Login>
            <Footer/>
            <Alert_Styles>
                <Toaster
                    visibleToasts={3}
                    richColors
                    theme='dark'
                    position='top-right'
                />
            </Alert_Styles>
        </Container_Page>
    );
};