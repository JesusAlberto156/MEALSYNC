//____________IMPORT/EXPORT____________
// Hooks de React
import { useEffect,useContext,useState } from "react";
import { useNavigate } from "react-router-dom";
// Componentes de React externos
import { Toaster } from 'sonner';
import { Tooltip } from "@mui/material";
// Servicios
import { encryptData } from "../services/Crypto";
// Contextos
import { themeModeContext,loginViewContext,modalViewContext } from "../contexts/ViewsProvider";
import { nameContext,passwordContext } from "../contexts/FormsProvider";
import { typeUserContext,actionBlockContext } from '../contexts/VariablesProvider';
import { loggedContext,logContext } from "../contexts/SessionProvider";
import { permissionContext,permissionsContext } from "../contexts/PermissionsProvider";
import { usersContext,userContext } from "../contexts/UsersProvider";
import { statusAllContext,statusUserContext } from "../contexts/StatusProvider";
// Hooks personalizados
import { useChangeLoginView } from "../hooks/Views";
import { useChangeLog } from "../hooks/Form";
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
import { Button_Icon_Blue_220,Button_Icon_Block_220,Button_Icon_Blue_150,Button_Icon_Green_150,Button_Icon_Block_150 } from "../components/styled/Buttons";
import { Alert_Greeting,Alert_Verification,Alert_Styles } from '../components/styled/Alerts';
// Componentes personalizados
import Footer from '../components/footer/Footer';
import Form_Login from "../components/forms/Login";
import Setting_Bar from "../components/navegation/SettingBar";
//____________IMPORT/EXPORT____________

// Página para iniciar sesión
export default function Login(){
    // Constantes con el valor de los contextos
    const [isName,setIsName] = useContext(nameContext);
    const [isPassword,setIsPassword] = useContext(passwordContext);
    const [isPermissions] = useContext(permissionsContext);
    const [isPermission,setIsPermission] = useContext(permissionContext);
    const [isLog,setIsLog] = useContext(logContext);
    const [isLogged,setIsLogged] = useContext(loggedContext);
    const [isStatusAll] = useContext(statusAllContext);
    const [isStatusUser,setIsStatusUser] = useContext(statusUserContext);
    const [isUsers] = useContext(usersContext);
    const [isUser,setIsUser] = useContext(userContext);
    const [isTypeUser] = useContext(typeUserContext);
    const [isActionBlock,setIsActionBlock] = useContext(actionBlockContext);
    const [themeMode] = useContext(themeModeContext);
    const [currentLView] = useContext(loginViewContext);
    const [currentMView,setCurrentMView] = useContext(modalViewContext);
    // useEffect con el titulo de la página
    useEffect(() => {
        document.title = "MEALSYNC_Iniciar_Sesión";
        Alert_Greeting("MEALSYNC",'¡Inicia sesión para acceder a la pagina principal!...');
        Alert_Greeting("MEALSYNC",'¡Te da la Bienvenida!...');
    },[]);
    // useEffect con el inicio de sesión del login
    useEffect(() => {
        if(isLog && !isLogged){
            document.title = "Cargando...";
            const promise = new Promise(async (resolve,reject) => {
                try{
                    setIsActionBlock(true);
                    setTimeout(() => {
                        const existsUser = isUsers.find(user => user.usuario === isName);
                        
                        if(existsUser && existsUser.contrasena === isPassword){
                            let existsStatus = isStatusAll.find(user => user.idusuario === existsUser.idusuario);
                            const existsPermission = isPermissions.find(permissions => permissions.idusuario === existsUser.idusuario);

                            if(!existsStatus || !existsStatus.habilitado || existsStatus.activo || !existsPermission){
                                setIsLog(false);
                                setIsActionBlock(false);
                                return reject('¡No es posible utilizar este usuario!...');
                            }

                            if(existsPermission.superadministrador){
                                const jsonUser = JSON.stringify(existsUser);
                                const jsonPermission = JSON.stringify(existsPermission);
                
                                const encryptedUser = encryptData(jsonUser);
                                const encryptedPermission = encryptData(jsonPermission);
                
                                if( encryptedUser && encryptedPermission){
                                    setTimeout(() => {
                                        existsStatus = isStatusAll.find(user => user.idusuario === existsUser.idusuario);
                                    
                                        const jsonStatus = JSON.stringify(existsStatus);
                                        const encryptedStatus = encryptData(jsonStatus);
                
                                        if(encryptedStatus){
                                            sessionStorage.setItem('User',encryptedUser);
                                            sessionStorage.setItem('Permission',encryptedPermission);
                                            sessionStorage.setItem('Status',encryptedStatus);
                                            sessionStorage.setItem('Logged',true);
                                            sessionStorage.setItem('Type-User',isTypeUser);
                                            
                                            setIsUser(JSON.parse(jsonUser));
                                            setIsPermission(JSON.parse(jsonPermission));
                                            setIsStatusUser(JSON.parse(jsonStatus));

                                            if(isTypeUser === 'Doctor'){
                                                setCurrentMView('Alert-Doctor');
                                            }
                                            
                                            resolve('¡SESIÓN INICIADA!...');

                                            setTimeout(() => {
                                                setIsName('');
                                                setIsPassword('');
                                                setIsLog(false);
                                                setIsLogged(true);
                                                setIsActionBlock(false);
                                                navigate(isTypeUser === 'Cook' || isTypeUser === 'Nutritionist' || isTypeUser === 'Doctor' ? '/Kitchen' : '/Administration',{ replace: true });
                                            },2000);
                                        }else{
                                            setIsLog(false);
                                            setIsActionBlock(false);
                                            return reject('¡Error al encriptar las credenciales!...');
                                        }
                                    },500);
                                }else{
                                    setIsLog(false);
                                    setIsActionBlock(false);
                                    return reject('¡Error al encriptar las credenciales!...');
                                }
                            }else{
                                if(isTypeUser === 'Cook' && !existsPermission.cocinero || 
                                    isTypeUser === 'Nutritionist' && !existsPermission.nutriologo ||
                                    isTypeUser === 'Doctor' && !existsPermission.medico ||
                                    isTypeUser === 'Administrator' && !existsPermission.administrador ||
                                    isTypeUser === 'Chef' && !existsPermission.chef ||
                                    isTypeUser === 'Storekeeper' && !existsPermission.almacenista){
                                    setIsLog(false);
                                    setIsActionBlock(false);
                                    return reject('¡Tu usuario no cuenta con los permisos necesarios para acceder!...');
                                }
                                
                                const jsonUser = JSON.stringify(existsUser);
                                const jsonPermission = JSON.stringify(existsPermission);
                
                                const encryptedUser = encryptData(jsonUser);
                                const encryptedPermission = encryptData(jsonPermission);
                
                                if( encryptedUser && encryptedPermission){
                                    setTimeout(() => {
                                        existsStatus = isStatusAll.find(user => user.idusuario === existsUser.idusuario);
                                    
                                        const jsonStatus = JSON.stringify(existsStatus);
                                        const encryptedStatus = encryptData(jsonStatus);
                
                                        if(encryptedStatus){
                                            sessionStorage.setItem('User',encryptedUser);
                                            sessionStorage.setItem('Permission',encryptedPermission);
                                            sessionStorage.setItem('Status',encryptedStatus);
                                            sessionStorage.setItem('Logged',true);
                                            sessionStorage.setItem('Type-User',isTypeUser);
                                            
                                            setIsUser(JSON.parse(jsonUser));
                                            setIsPermission(JSON.parse(jsonPermission));
                                            setIsStatusUser(JSON.parse(jsonStatus));

                                            if(isTypeUser === 'Doctor'){
                                                setCurrentMView('Alert-Doctor');
                                            }
                                            
                                            resolve('¡SESIÓN INICIADA!...');

                                            setTimeout(() => {
                                                setIsName('');
                                                setIsPassword('');
                                                setIsLog(false);
                                                setIsLogged(true);
                                                setIsActionBlock(false);
                                                navigate(isTypeUser === 'Cook' || isTypeUser === 'Nutritionist' || isTypeUser === 'Doctor' ? '/Kitchen' : '/Administration',{ replace: true });
                                            },2000);
                                        }else{
                                            setIsLog(false);
                                            setIsActionBlock(false);
                                            return reject('¡Error al encriptar las credenciales!...');
                                        }
                                    },500);
                                }else{
                                    setIsLog(false);
                                    setIsActionBlock(false);
                                    return reject('¡Error al encriptar las credenciales!...')
                                }
                            }
                        }else{
                            setIsLog(false);
                            setIsActionBlock(false);
                            return reject('¡Usuario o contraseña incorrectos!...');
                        }
                    },1000);
                }catch(error){
                    setIsLog(false);
                    setIsActionBlock(false);
                    return reject('¡Ocurrio un error inesperado!...');
                }
            });

            Alert_Verification(promise,'¡Verificando credenciales!...');

            document.title = "MEALSYNC_Iniciar_Sesión";
        }
    },[isLog]);
    // Constantes con la funcionalidad de los hooks
    const navigate = useNavigate();
    const changeViewLogin = useChangeLoginView();
    const changeLog = useChangeLog();
    // Estructura del componente
    return(
        <Container_Page>
            <Container_Page_Login ThemeMode={themeMode}>
                <Setting_Bar/>
                <Container_Form_350 ThemeMode={themeMode}>
                    {currentLView === '' ? (
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
                    {currentLView === 'Administration' ? (
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
                    {currentLView === 'Kitchen' ? (
                        <>
                            <Img_Logo_Hospital_150 ThemeMode={themeMode}/>
                            <Text_Title_Fade_22 ThemeMode={themeMode}>Escoger usuario</Text_Title_Fade_22>
                            <Container_Button_Column_300>
                                <Tooltip title='Cocinero' placement="top">
                                    <Button_Icon_Blue_220 ThemeMode={themeMode} onClick={() => changeViewLogin('Login','Cook')}><GiCook/></Button_Icon_Blue_220>
                                </Tooltip>  
                                <Button_Icon_Block_220 ThemeMode={themeMode}><IoNutrition/></Button_Icon_Block_220>
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
                    {currentLView === 'Login' ? (
                        <>
                            <Img_Logo_Hospital_150 ThemeMode={themeMode}/>
                            <Text_Title_Fade_22 ThemeMode={themeMode}>Iniciar sesión</Text_Title_Fade_22>
                            <Form_Login/>
                            <Container_Button_Row_300>
                                <Tooltip title='Atrás' placement="top">
                                    <Button_Icon_Blue_150 ThemeMode={themeMode} onClick={() => changeViewLogin(
                                        isTypeUser === 'Cook' || isTypeUser === 'Nutritionist' || isTypeUser === 'Doctor' ? 'Kitchen' : 'Administration',''
                                    )}><IoArrowBackCircle/></Button_Icon_Blue_150>
                                </Tooltip>
                                {isActionBlock ? (
                                    <>
                                        <Button_Icon_Block_150 ThemeMode={themeMode}><MdLogin/></Button_Icon_Block_150>
                                    </>
                                ):(
                                    <>
                                        <Tooltip title='Iniciar sesión' placement="top">
                                            <Button_Icon_Green_150 ThemeMode={themeMode} onClick={() => changeLog()}><MdLogin/></Button_Icon_Green_150>
                                        </Tooltip>
                                    </>
                                )}
                            </Container_Button_Row_300>
                        </>
                    ):(
                        <></>
                    )}
                </Container_Form_350>    
            </Container_Page_Login>
            <Footer/>
            <Alert_Styles ThemeMode={themeMode}>
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