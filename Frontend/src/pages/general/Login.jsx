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
import { ThemeModeContext,LoginViewContext,ModalViewContext,ModalContext,SidebarViewContext } from "../../contexts/ViewsProvider";
import { TextFieldsContext } from "../../contexts/FormsProvider";
import { AnimationContext,ActionBlockContext } from '../../contexts/VariablesProvider';
import { LoggedLoggedContext,LoggedLogContext,LoggedTypeContext,LoggedUserContext,LoggedPermissionsContext,LoggedStatusContext } from "../../contexts/SessionProvider";
import { UsersContext,PermissionsContext,StatusContext } from "../../contexts/UsersProvider";
// Hooks personalizados
import { HandleLoginView } from "../../hooks/Views";
import { HandleLoggedLog } from "../../hooks/Form";
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
//__________IMAGES____________
import Logo_Hospital_Light from '../../components/imgs/Logo-Hospital-Light.png';
import Logo_Hospital_Dark from '../../components/imgs/Logo-Hospital-Dark.png';
//__________IMAGES____________
// Estilos personalizados
import { Container_Page,Container_Page_Login,Container_Form_400,Container_Column_90_Center,Container_Row_90_Center } from "../../components/styled/Containers";
import { Icon_White_26 } from "../../components/styled/Icons";
import { Img_Logo_Verical_Hospital_240 } from "../../components/styled/Imgs";
import { Text_Title_26_Center } from "../../components/styled/Text";
import { Button_Icon_Blue_140,Button_Icon_Blue_220,Button_Icon_Green_140 } from "../../components/styled/Buttons";
import { Alert_Greeting,Alert_Verification,Alert_Styles } from '../../components/styled/Alerts';
// Componentes personalizados
import Setting_Bar from '../../components/navegation/SettingBar';
import Footer from "../../components/navegation/Footer";
import Form_Login from "../../components/forms/Login";
//____________IMPORT/EXPORT____________

// Página para iniciar sesión
export default function Login(){
    // Constantes con el valor de los contextos
    const [themeMode] = useContext(ThemeModeContext);
    const [isAnimation] = useContext(AnimationContext);
    const [isUsers] = useContext(UsersContext);
    const [isPermissions] = useContext(PermissionsContext);
    const [isStatus] = useContext(StatusContext);
    const [isLoggedLog,setIsLoggedLog] = useContext(LoggedLogContext);
    const [isLoggedLogged,setIsLoggedLogged] = useContext(LoggedLoggedContext);
    const [isLoggedUser,setIsLoggedUser] = useContext(LoggedUserContext);
    const [isLoggedPermissions,setIsLoggedPermissions] = useContext(LoggedPermissionsContext);
    const [isLoggedStatus,setIsLoggedStatus] = useContext(LoggedStatusContext);
    const [isLoggedType] = useContext(LoggedTypeContext);
    const [isTextFields,setIsTextFields] = useContext(TextFieldsContext);
    const [isActionBlock,setIsActionBlock] = useContext(ActionBlockContext);
    const [currentLView] = useContext(LoginViewContext);
    const [currentMView,setCurrentMView] = useContext(ModalViewContext);
    const [currentSView,setCurrentSView] = useContext(SidebarViewContext);
    const [isModal,setIsModal] = useContext(ModalContext);
    // useEffect con el titulo de la página
    useEffect(() => {
        document.title = 'MEALSYNC';
        const showAlerts = async () => {
            const Image = themeMode ? Logo_Hospital_Light : Logo_Hospital_Dark;

            await Alert_Greeting('MEALSYNC','¡Te da la Bienvenida!',themeMode,Image);

            await Alert_Greeting('MEALSYNC','¡Inicia sesión para acceder a la pagina principal!',themeMode,Image);
        }

        showAlerts();
    },[]);
    // useEffect con el inicio de sesión del login
    useEffect(() => {
        if(isLoggedLog && !isLoggedLogged){
            const promise = new Promise(async (resolve,reject) => {
                try{
                    setIsActionBlock(true);
                    setTimeout(() => {
                        const existsUser = isUsers.find(user => user.usuario === isTextFields.user);
                        
                        if(existsUser && existsUser.contrasena === isTextFields.password){
                            let existsStatus = isStatus.find(user => user.idusuario === existsUser.idusuario);
                            const existsPermission = isPermissions.find(permissions => permissions.idusuario === existsUser.idusuario);

                            if(!existsStatus || !existsStatus.habilitado || existsStatus.activo || !existsPermission){
                                setIsLoggedLog(false);
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
                                        existsStatus = isStatus.find(user => user.idusuario === existsUser.idusuario);
                                    
                                        const jsonStatus = JSON.stringify(existsStatus);
                                        const encryptedStatus = encryptData(jsonStatus);
                
                                        if(encryptedStatus){
                                            sessionStorage.setItem('User',encryptedUser);
                                            sessionStorage.setItem('Permissions',encryptedPermission);
                                            sessionStorage.setItem('Status',encryptedStatus);
                                            sessionStorage.setItem('Type',isLoggedType);
                                            sessionStorage.setItem('Sidebar',true);

                                            setIsLoggedUser(JSON.parse(jsonUser));
                                            setIsLoggedPermissions(JSON.parse(jsonPermission));
                                            setIsLoggedStatus(JSON.parse(jsonStatus));

                                            setCurrentSView('Home');
                                            sessionStorage.setItem('Sidebar-View','Home');

                                            if(isLoggedType==='Administrator' || isLoggedType==='Chef' || isLoggedType==='Storekeeper'){
                                                sessionStorage.setItem('Route','/Administration/Home');
                                            }

                                            if(isLoggedType==='Cook' || isLoggedType==='Nutritionist' || isLoggedType==='Doctor'){
                                                sessionStorage.setItem('Route','/Kitchen/Home');
                                            }

                                            resolve('¡SESIÓN INICIADA!...');

                                            setIsModal(true);

                                            setTimeout(() => {
                                                setIsTextFields(prev => ({
                                                    ...prev,             
                                                    user: '',      
                                                    password: '',       
                                                }));
                                                setIsLoggedLog(false);
                                                setIsLoggedLogged(true);
                                                sessionStorage.setItem('Logged',true);
                                                setIsActionBlock(false);
                                                return navigate(sessionStorage.getItem('Route'),{ replace: true });
                                            },1000);
                                        }else{
                                            setIsLoggedLog(false);
                                            setIsActionBlock(false);
                                            return reject('¡Error al encriptar las credenciales!...');
                                        }
                                    },1500);
                                }else{
                                    setIsLoggedLog(false);
                                    setIsActionBlock(false);
                                    return reject('¡Error al encriptar las credenciales!...');
                                }
                            }else{
                                if(isLoggedType === 'Cook' && !existsPermission.cocinero || 
                                    isLoggedType === 'Nutritionist' && !existsPermission.nutriologo ||
                                    isLoggedType === 'Doctor' && !existsPermission.medico ||
                                    isLoggedType === 'Administrator' && !existsPermission.administrador ||
                                    isLoggedType === 'Chef' && !existsPermission.chef ||
                                    isLoggedType === 'Storekeeper' && !existsPermission.almacenista){
                                    setIsLoggedLog(false);
                                    setIsActionBlock(false);
                                    return reject('¡Tu usuario no cuenta con los permisos necesarios para acceder!...');
                                }
                                
                                const jsonUser = JSON.stringify(existsUser);
                                const jsonPermission = JSON.stringify(existsPermission);
                
                                const encryptedUser = encryptData(jsonUser);
                                const encryptedPermission = encryptData(jsonPermission);
                
                                if( encryptedUser && encryptedPermission){
                                    setTimeout(() => {
                                        existsStatus = isStatus.find(user => user.idusuario === existsUser.idusuario);
                                    
                                        const jsonStatus = JSON.stringify(existsStatus);
                                        const encryptedStatus = encryptData(jsonStatus);
                
                                        if(encryptedStatus){
                                            sessionStorage.setItem('User',encryptedUser);
                                            sessionStorage.setItem('Permissions',encryptedPermission);
                                            sessionStorage.setItem('Status',encryptedStatus);
                                            sessionStorage.setItem('Logged',true);
                                            sessionStorage.setItem('Type',isLoggedType);
                                            sessionStorage.setItem('Sidebar',true);
                                            
                                            setIsLoggedUser(JSON.parse(jsonUser));
                                            setIsLoggedPermissions(JSON.parse(jsonPermission));
                                            setIsLoggedStatus(JSON.parse(jsonStatus));

                                            setCurrentSView('Home');
                                            sessionStorage.setItem('Sidebar-View','Home');

                                            if(isLoggedType==='Administrator' || isLoggedType==='Chef' || isLoggedType==='Storekeeper'){
                                                sessionStorage.setItem('Route','/Administration/Home');
                                            }

                                            if(isLoggedType==='Cook' || isLoggedType==='Nutritionist' || isLoggedType==='Doctor'){
                                                sessionStorage.setItem('Route','/Kitchen/Home');
                                            }

                                            resolve('¡SESIÓN INICIADA!...');

                                            setIsModal(true);

                                            setTimeout(() => {
                                                setIsTextFields(prev => ({
                                                    ...prev,             
                                                    user: '',      
                                                    password: '',       
                                                }));
                                                setIsLoggedLogged(true);
                                                setIsLoggedLog(false);
                                                setIsActionBlock(false);
                                                return navigate(sessionStorage.getItem('Route'),{ replace: true });
                                            },2500);
                                        }else{
                                            setIsLoggedLog(false);
                                            setIsActionBlock(false);
                                            return reject('¡Error al encriptar las credenciales!...');
                                        }
                                    },500);
                                }else{
                                    setIsLoggedLog(false);
                                    setIsActionBlock(false);
                                    return reject('¡Error al encriptar las credenciales!...')
                                }
                            }
                        }else{
                            setIsLoggedLog(false);
                            setIsActionBlock(false);
                            return reject('¡Usuario o contraseña incorrectos!...');
                        }
                    },1000);
                }catch(error){
                    setIsLoggedLog(false);
                    setIsActionBlock(false);
                    return reject('¡Ocurrio un error inesperado!...');
                }
            });

            Alert_Verification(promise,'¡Verificando credenciales!...');
        }
    },[isLoggedLog]);
    // Constantes con la funcionalidad de los hooks
    const navigate = useNavigate();
    const handleLoginView = HandleLoginView();
    const handleLoggedLog = HandleLoggedLog();
    // Estructura del componente
    return(
        <>
            <Container_Page>
                <Container_Page_Login className='bg-pan-bl'>
                    <Setting_Bar/>
                    <Container_Form_400 ThemeMode={themeMode} className={isModal ? 'slide-out-container-top':'slide-in-container-top'}>
                        <Img_Logo_Verical_Hospital_240 ThemeMode={themeMode}/>
                        <Text_Title_26_Center ThemeMode={themeMode}>
                            {currentLView === '' ? 'BIENVENIDO(A)': currentLView === 'Administration' || currentLView === 'Kitchen' ? 'SELECCIÓN DE USUARIO' : 'INICIAR SESIÓN'}
                        </Text_Title_26_Center>
                        <Container_Column_90_Center className={themeMode ? 'shadow-out-container-light-infinite' : 'shadow-out-container-dark-infinite'}>
                            {currentLView === '' ? (
                                <>  
                                    <Tooltip title='Administración' placement="top">
                                        <Button_Icon_Blue_220 ThemeMode={themeMode} className={isAnimation ? 'roll-out-button-left' : 'roll-in-button-left'}
                                            onClick={() => handleLoginView('Administration','')}>
                                            <Icon_White_26><MdManageAccounts/></Icon_White_26>
                                        </Button_Icon_Blue_220>
                                    </Tooltip>
                                    <Tooltip title='Cocina' placement="top">
                                        <Button_Icon_Blue_220 ThemeMode={themeMode} className={isAnimation ? 'roll-out-button-left' : 'roll-in-button-left'}
                                            onClick={() => handleLoginView('Kitchen','')}>
                                            <Icon_White_26><GiRiceCooker/></Icon_White_26>
                                        </Button_Icon_Blue_220>
                                    </Tooltip>
                                </>
                            ):(
                                <></>
                            )}
                            {currentLView === 'Administration' ? (
                                <>
                                    <Tooltip title='Administrador' placement="top">
                                        <Button_Icon_Blue_220 ThemeMode={themeMode} className={isAnimation ? 'roll-in-button-left' : 'roll-out-button-left'}
                                            onClick={() => handleLoginView('Login','Administrator')}>
                                            <Icon_White_26><FaUserTie/></Icon_White_26>
                                        </Button_Icon_Blue_220>
                                    </Tooltip>
                                    <Tooltip title='Chef' placement="top">
                                        <Button_Icon_Blue_220 ThemeMode={themeMode} className={isAnimation ? 'roll-in-button-left' : 'roll-out-button-left'}
                                            onClick={() => handleLoginView('Login','Chef')}>
                                            <Icon_White_26><GiChefToque/></Icon_White_26>
                                        </Button_Icon_Blue_220>
                                    </Tooltip>    
                                    <Tooltip title='Almacenista' placement="top">
                                        <Button_Icon_Blue_220 ThemeMode={themeMode} className={isAnimation ? 'roll-in-button-left' : 'roll-out-button-left'}
                                            onClick={() => handleLoginView('Login','Storekeeper')}>
                                            <Icon_White_26><FaWarehouse/></Icon_White_26>
                                        </Button_Icon_Blue_220>
                                    </Tooltip> 
                                    <Tooltip title='Atrás' placement="top">
                                        <Button_Icon_Blue_220 ThemeMode={themeMode} className={isAnimation ? 'roll-in-button-left' : 'roll-out-button-left'}
                                            onClick={() => handleLoginView('','')}>
                                            <Icon_White_26><IoArrowBackCircle/></Icon_White_26>
                                        </Button_Icon_Blue_220>
                                    </Tooltip>
                                </>
                            ):(
                                <></>
                            )}
                            {currentLView === 'Kitchen' ? (
                                <>
                                    <Tooltip title='Cocinero' placement="top">
                                        <Button_Icon_Blue_220 ThemeMode={themeMode} className={isAnimation ? 'roll-in-button-left' : 'roll-out-button-left'}
                                            onClick={() => handleLoginView('Login','Cook')}>
                                            <Icon_White_26><GiCook/></Icon_White_26>
                                        </Button_Icon_Blue_220>
                                    </Tooltip>  
                                    <Tooltip title='Nutriólogo' placement="top">
                                        <Button_Icon_Blue_220 ThemeMode={themeMode} className={isAnimation ? 'roll-in-button-left' : 'roll-out-button-left'}
                                            onClick={() => handleLoginView('Login','Nutritionist')}>
                                            <Icon_White_26><IoNutrition/></Icon_White_26>
                                        </Button_Icon_Blue_220>
                                    </Tooltip> 
                                    <Tooltip title='Médico' placement="top">
                                        <Button_Icon_Blue_220 ThemeMode={themeMode} className={isAnimation ? 'roll-in-button-left' : 'roll-out-button-left'}
                                            onClick={() => handleLoginView('Login','Doctor')}>
                                            <Icon_White_26><FaUserDoctor/></Icon_White_26>
                                        </Button_Icon_Blue_220>
                                    </Tooltip> 
                                    <Tooltip title='Atrás' placement="top">
                                        <Button_Icon_Blue_220 ThemeMode={themeMode} className={isAnimation ? 'roll-in-button-left' : 'roll-out-button-left'}
                                            onClick={() => handleLoginView('','')}> 
                                            <Icon_White_26><IoArrowBackCircle/></Icon_White_26>
                                        </Button_Icon_Blue_220>
                                    </Tooltip> 
                                </>
                            ):(
                                <></>
                            )}
                            {currentLView === 'Login' ? (
                                <Form_Login/>
                            ):(
                                <></>
                            )}
                        </Container_Column_90_Center>
                        {currentLView === 'Login' ? (
                            <>
                                <Container_Row_90_Center className={themeMode ? 'shadow-out-container-light-infinite' : 'shadow-out-container-dark-infinite'}>
                                    <Tooltip title='Atrás' placement="top">
                                        <Button_Icon_Blue_140 ThemeMode={themeMode} className={isAnimation ? 'roll-out-button-left' : 'roll-in-button-left'}
                                            onClick={() => handleLoginView(isLoggedType === 'Cook' || isLoggedType === 'Nutritionist' || isLoggedType === 'Doctor' ? 'Kitchen' : 'Administration','')}>
                                            <Icon_White_26><IoArrowBackCircle/></Icon_White_26>
                                        </Button_Icon_Blue_140>
                                    </Tooltip>
                                    <Tooltip title='Iniciar sesión' placement="top">
                                        <Button_Icon_Green_140 ThemeMode={themeMode} className={isActionBlock ? 'roll-out-button-left' : 'roll-in-button-left'}
                                            onClick={() => handleLoggedLog()}>
                                            <Icon_White_26><MdLogin/></Icon_White_26>
                                        </Button_Icon_Green_140>
                                    </Tooltip>
                                </Container_Row_90_Center>
                            </>
                        ):(
                            <></>
                        )}
                    </Container_Form_400>
                </Container_Page_Login> 
                <Footer/>
            </Container_Page>  
            <Alert_Styles>
                <Toaster
                    visibleToasts={1}
                    richColors
                    theme='light'
                    position='top-right'
                />
            </Alert_Styles>  
        </>
    );
};