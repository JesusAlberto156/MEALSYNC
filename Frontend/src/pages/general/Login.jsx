//____________IMPORT/EXPORT____________
// Hooks de React
import { useEffect,useContext } from "react";
import { useNavigate } from "react-router-dom";
// Componentes de React externos
import { Toaster } from 'sonner';
import { Tooltip } from "@mui/material";
// Servicios
import { encryptData } from "../../services/Crypto";
// Contextos
import { themeModeContext,loginViewContext,modalViewContext } from "../../contexts/ViewsProvider";
import { textFieldsContext } from "../../contexts/FormsProvider";
import { typeUserContext,animationContext,actionBlockContext } from '../../contexts/VariablesProvider';
import { loggedContext,logContext } from "../../contexts/SessionProvider";
import { permissionContext,permissionsContext } from "../../contexts/PermissionsProvider";
import { usersContext,userContext } from "../../contexts/UsersProvider";
import { statusAllContext,statusUserContext } from "../../contexts/StatusProvider";
// Hooks personalizados
import { HandleChangeLogin } from "../../hooks/Views";
import { HandleChangeLog } from "../../hooks/Form";
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
import { Container_Form_400,Container_Column_90_Center,Container_Row_90_Center } from "../../components/styled/Containers";
import { Icon_White_26 } from "../../components/styled/Icons";
import { Img_Logo_Verical_Hospital_240,Img_Logo_Hospital_140,Img_Logo_Hospital_100 } from "../../components/styled/Imgs";
import { Text_Title_25,Text_Title_20 } from "../../components/styled/Text";
import { Button_Icon_Blue_140,Button_Icon_Blue_220,Button_Icon_Green_140 } from "../../components/styled/Buttons";
import { Alert_Greeting,Alert_Verification,Alert_Styles } from '../../components/styled/Alerts';
// Componentes personalizados
import Form_Login from "../../components/forms/Login";
//____________IMPORT/EXPORT____________

// Página para iniciar sesión
export default function Login(){
    // Constantes con el valor de los contextos
    const [isFormText,setIsFormText] = useContext(textFieldsContext);
    const [isAnimation,setIsAnimation] = useContext(animationContext);
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
        document.title = "MEALSYNC";
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
                        const existsUser = isUsers.find(user => user.usuario === isFormText.user);
                        
                        if(existsUser && existsUser.contrasena === isFormText.password){
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
                                                setIsFormText(prev => ({
                                                    ...prev,             
                                                    user: '',      
                                                    password: '',       
                                                }));
                                                setIsLog(false);
                                                setIsLogged(true);
                                                setIsActionBlock(false);
                                                navigate(isTypeUser === 'Cook' || isTypeUser === 'Nutritionist' || isTypeUser === 'Doctor' ? '/Kitchen/Home' : '/Administration/Home',{ replace: true });
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
                                                setIsFormText(prev => ({
                                                    ...prev,             
                                                    user: '',      
                                                    password: '',       
                                                }));
                                                setIsLog(false);
                                                setIsLogged(true);
                                                setIsActionBlock(false);
                                                navigate(isTypeUser === 'Cook' || isTypeUser === 'Nutritionist' || isTypeUser === 'Doctor' ? '/Kitchen/Home' : '/Administration/Home',{ replace: true });
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
    const handleChangeLogin = HandleChangeLogin();
    const handleChangeLog = HandleChangeLog();
    // Estructura del componente
    return(
        <>
            <Container_Form_400 ThemeMode={themeMode} className={isLogged ? 'roll-out-left' : themeMode ? 'roll-in-left-shadow-pop-light' : 'roll-in-left-shadow-pop-dark'}>
                {currentLView === '' ? (
                    <>  
                        <Img_Logo_Verical_Hospital_240 ThemeMode={themeMode} className={isAnimation ? 'roll-out-image-left' : 'roll-in-image-left'}/>
                        <Container_Row_90_Center>
                            <Text_Title_25 ThemeMode={themeMode} className={themeMode ? 'text-shadow-drop-infinite-light' : 'text-shadow-drop-infinite-dark'}>BIENVENIDO(A)</Text_Title_25>
                        </Container_Row_90_Center>
                        <Container_Column_90_Center className={themeMode ? "shadow-out-infinite-light" : "shadow-out-infinite-dark"}>
                            <Tooltip title='Administración' placement="top">
                                <Button_Icon_Blue_220 ThemeMode={themeMode} className={isAnimation ? 'roll-out-left' : 'roll-in-left'}
                                    onClick={() => handleChangeLogin('Administration','')}>
                                    <Icon_White_26><MdManageAccounts/></Icon_White_26>
                                </Button_Icon_Blue_220>
                            </Tooltip>
                            <Tooltip title='Cocina' placement="top">
                                <Button_Icon_Blue_220 ThemeMode={themeMode} className={isAnimation ? 'roll-out-left' : 'roll-in-left'}
                                    onClick={() => handleChangeLogin('Kitchen','')}>
                                    <Icon_White_26><GiRiceCooker/></Icon_White_26>
                                </Button_Icon_Blue_220>
                            </Tooltip>
                        </Container_Column_90_Center>
                    </>
                ):(
                    <></>
                )}
                {currentLView === 'Administration' ? (
                    <>
                        <Img_Logo_Hospital_140 ThemeMode={themeMode} className={isAnimation ? 'roll-in-image-left' : 'roll-out-image-left'}/>
                        <Container_Row_90_Center>
                            <Text_Title_20 ThemeMode={themeMode} className={themeMode ? 'text-shadow-drop-infinite-light' : 'text-shadow-drop-infinite-dark'}>SELECCIÓN DE USUARIO</Text_Title_20>
                        </Container_Row_90_Center>
                        <Container_Column_90_Center className={themeMode ? "shadow-out-infinite-light" : "shadow-out-infinite-dark"}>
                            <Tooltip title='Administrador' placement="top">
                                <Button_Icon_Blue_220 ThemeMode={themeMode} className={isAnimation ? 'roll-in-left' : 'roll-out-left'}
                                    onClick={() => handleChangeLogin('Login','Administrator')}>
                                    <Icon_White_26><FaUserTie/></Icon_White_26>
                                </Button_Icon_Blue_220>
                            </Tooltip>
                            <Tooltip title='Chef' placement="top">
                                <Button_Icon_Blue_220 ThemeMode={themeMode} className={isAnimation ? 'roll-in-left' : 'roll-out-left'}
                                    onClick={() => handleChangeLogin('Login','Chef')}>
                                    <Icon_White_26><GiChefToque/></Icon_White_26>
                                </Button_Icon_Blue_220>
                            </Tooltip>    
                            <Tooltip title='Almacenista' placement="top">
                                <Button_Icon_Blue_220 ThemeMode={themeMode} className={isAnimation ? 'roll-in-left' : 'roll-out-left'}
                                    onClick={() => handleChangeLogin('Login','Storekeeper')}>
                                    <Icon_White_26><FaWarehouse/></Icon_White_26>
                                </Button_Icon_Blue_220>
                            </Tooltip> 
                            <Tooltip title='Atrás' placement="top">
                                <Button_Icon_Blue_220 ThemeMode={themeMode} className={isAnimation ? 'roll-in-left' : 'roll-out-left'}
                                    onClick={() => handleChangeLogin('','')}>
                                    <Icon_White_26><IoArrowBackCircle/></Icon_White_26>
                                </Button_Icon_Blue_220>
                            </Tooltip>
                        </Container_Column_90_Center>
                    </>
                ):(
                    <></>
                )}
                {currentLView === 'Kitchen' ? (
                    <>
                        <Img_Logo_Hospital_140 ThemeMode={themeMode} className={isAnimation ? 'roll-in-image-left' : 'roll-out-image-left'}/>
                        <Container_Row_90_Center>
                            <Text_Title_20 ThemeMode={themeMode} className={themeMode ? 'text-shadow-drop-infinite-light' : 'text-shadow-drop-infinite-dark'}>SELECCIÓN DE USUARIO</Text_Title_20>
                        </Container_Row_90_Center>
                        <Container_Column_90_Center className={themeMode ? "shadow-out-infinite-light" : "shadow-out-infinite-dark"}>
                            <Tooltip title='Cocinero' placement="top">
                                <Button_Icon_Blue_220 ThemeMode={themeMode} className={isAnimation ? 'roll-in-left' : 'roll-out-left'}
                                    onClick={() => handleChangeLogin('Login','Cook')}>
                                    <Icon_White_26><GiCook/></Icon_White_26>
                                </Button_Icon_Blue_220>
                            </Tooltip>  
                            <Tooltip title='Nutriólogo' placement="top">
                                <Button_Icon_Blue_220 ThemeMode={themeMode} className={isAnimation ? 'roll-in-left' : 'roll-out-left'}
                                    onClick={() => handleChangeLogin('Login','Nutritionist')}>
                                    <Icon_White_26><IoNutrition/></Icon_White_26>
                                </Button_Icon_Blue_220>
                            </Tooltip> 
                            <Tooltip title='Médico' placement="top">
                                <Button_Icon_Blue_220 ThemeMode={themeMode} className={isAnimation ? 'roll-in-left' : 'roll-out-left'}
                                    onClick={() => handleChangeLogin('Login','Doctor')}>
                                    <Icon_White_26><FaUserDoctor/></Icon_White_26>
                                </Button_Icon_Blue_220>
                            </Tooltip> 
                            <Tooltip title='Atrás' placement="top">
                                <Button_Icon_Blue_220 ThemeMode={themeMode} className={isAnimation ? 'roll-in-left' : 'roll-out-left'}
                                    onClick={() => handleChangeLogin('','')}> 
                                    <Icon_White_26><IoArrowBackCircle/></Icon_White_26>
                                </Button_Icon_Blue_220>
                            </Tooltip> 
                        </Container_Column_90_Center>
                    </>
                ):(
                    <></>
                )}
                {currentLView === 'Login' ? (
                    <>
                        <Img_Logo_Hospital_100 ThemeMode={themeMode} className={isAnimation ? 'roll-out-image-left' : 'roll-in-image-left'}/>
                        <Container_Row_90_Center>
                            <Text_Title_25 ThemeMode={themeMode} className={themeMode ? 'text-shadow-drop-infinite-light' : 'text-shadow-drop-infinite-dark'}>INICIAR SESIÓN</Text_Title_25>
                        </Container_Row_90_Center>
                        <Form_Login/>
                        <Container_Row_90_Center className={themeMode ? "shadow-out-infinite-light" : "shadow-out-infinite-dark"}>
                            <Tooltip title='Atrás' placement="top">
                                <Button_Icon_Blue_140 ThemeMode={themeMode} className={isAnimation ? 'roll-out-left' : 'roll-in-left'}
                                    onClick={() => handleChangeLogin(isTypeUser === 'Cook' || isTypeUser === 'Nutritionist' || isTypeUser === 'Doctor' ? 'Kitchen' : 'Administration','')}>
                                    <Icon_White_26><IoArrowBackCircle/></Icon_White_26>
                                </Button_Icon_Blue_140>
                            </Tooltip>
                            <Tooltip title='Iniciar sesión' placement="top">
                                <Button_Icon_Green_140 ThemeMode={themeMode} className={isActionBlock ? 'roll-out-left' : 'roll-in-left'}
                                    onClick={() => handleChangeLog()}>
                                    <Icon_White_26><MdLogin/></Icon_White_26>
                                </Button_Icon_Green_140>
                            </Tooltip>
                        </Container_Row_90_Center>
                    </>
                ):(
                    <></>
                )}
            </Container_Form_400>  
            <Alert_Styles ThemeMode={themeMode}>
                <Toaster
                    visibleToasts={3}
                    richColors
                    theme='dark'
                    position='top-right'
                />
            </Alert_Styles>  
        </>
    );
};