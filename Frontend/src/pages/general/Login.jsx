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
import { ThemeModeContext,LoginViewContext,ModalViewContext,ModalContext } from "../../contexts/ViewsProvider";
import { TextFieldsUserContext } from "../../contexts/FormsProvider";
import { AnimationContext,ActionBlockContext,KeyboardContext,KeyboardViewContext } from '../../contexts/VariablesProvider';
import { LoggedLoggedContext,LoggedLogContext,LoggedTypeContext,LoggedUserContext,LoggedPermissionsContext,LoggedStatusContext } from "../../contexts/SessionProvider";
import { PermissionsContext,StatusContext } from "../../contexts/UsersProvider";
// Hooks personalizados
import { HandleLoginView } from "../../hooks/Views";
import { HandleLoggedLog } from "../../hooks/Forms";
import { TableActionsUsers } from "../../hooks/users/Tables";
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
import Logo_Hospital_Light from '../../components/imgs/Logo-Hospital.png';
//__________IMAGES____________
// Estilos personalizados
import { Container_Page,Container_Page_Login,Container_Form_400,Container_Column_90_Center,Container_Row_95_Center } from "../../components/styled/Containers";
import { Icon_White_22 } from "../../components/styled/Icons";
import { Img_Logo_Verical_Hospital_240 } from "../../components/styled/Imgs";
import { Text_Title_28_Black } from "../../components/styled/Text";
import { Button_Icon_Blue_150,Button_Icon_Blue_220,Button_Icon_Green_150 } from "../../components/styled/Buttons";
import { Alert_Greeting,Alert_Verification,Alert_Styles } from '../../components/styled/Alerts';
// Componentes personalizados
import Setting_Bar from '../../components/navegation/SettingBar';
import Footer from "../../components/navegation/Footer";
import Form_Login from "../../components/forms/Login";
import Virtual_Keyboard from "../../components/forms/Keyboard";
//____________IMPORT/EXPORT____________

// Página para iniciar sesión
export default function Login(){
    // Constantes con el valor de los contextos
    const [themeMode] = useContext(ThemeModeContext);
    const [isAnimation] = useContext(AnimationContext);
    const [isPermissions] = useContext(PermissionsContext);
    const [isStatus] = useContext(StatusContext);
    const [isLoggedLog,setIsLoggedLog] = useContext(LoggedLogContext);
    const [isLoggedLogged,setIsLoggedLogged] = useContext(LoggedLoggedContext);
    const [isLoggedUser,setIsLoggedUser] = useContext(LoggedUserContext);
    const [isLoggedPermissions,setIsLoggedPermissions] = useContext(LoggedPermissionsContext);
    const [isLoggedStatus,setIsLoggedStatus] = useContext(LoggedStatusContext);
    const [isLoggedType] = useContext(LoggedTypeContext);
    const [isTextFieldsUser,setIsTextFieldsUser] = useContext(TextFieldsUserContext);
    const [isActionBlock,setIsActionBlock] = useContext(ActionBlockContext);
    const [currentLView] = useContext(LoginViewContext);
    const [currentMView,setCurrentMView] = useContext(ModalViewContext);
    const [isModal,setIsModal] = useContext(ModalContext);
    const [isKeyboard] = useContext(KeyboardContext);
    const [isKeyboardView] = useContext(KeyboardViewContext);
    // useEffect con el titulo de la página
    useEffect(() => {
        document.title = 'MEALSYNC';
        const showAlerts = async () => {
            const Image = Logo_Hospital_Light;

            await Alert_Greeting('MEALSYNC','¡Te da la Bienvenida!',themeMode,Image);

            await Alert_Greeting('MEALSYNC','¡Inicia sesión para acceder a la pagina principal!',themeMode,Image);
        }

        showAlerts();
    },[]);
    // useEffect para escribir en los campos del login
    const handleKeyboard = (newValue) => {
        if(isKeyboardView === 'User' ){
            setIsTextFieldsUser(prev => ({
                ...prev,
                usuario: newValue, 
            }));
        }else{
            setIsTextFieldsUser(prev => ({
                ...prev,
                contrasena: newValue,
            }));
        }
    };
    // useEffect con el inicio de sesión del login
    useEffect(() => {
        if(isLoggedLog && !isLoggedLogged){
            const promise = new Promise((resolve,reject) => {
                try{
                    setIsActionBlock(true);
                    setTimeout(() => {
                        const existsUser = filteredRecordsUsers.find(user => user.usuario === isTextFieldsUser.usuario);
                        
                        if(existsUser && existsUser.contrasena === isTextFieldsUser.contrasena){
                            let existsStatus = isStatus.find(user => user.idusuario === existsUser.idusuario);
                            const existsPermission = isPermissions.find(permissions => permissions.idusuario === existsUser.idusuario);

                            if(!existsStatus || !existsStatus.habilitado || existsStatus.activo || !existsPermission){
                                setIsLoggedLog(false);
                                setIsActionBlock(false);
                                setIsModal(false);
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
                                            sessionStorage.setItem('Usuario',encryptedUser);
                                            sessionStorage.setItem('Permisos',encryptedPermission);
                                            sessionStorage.setItem('Estatus',encryptedStatus);
                                            sessionStorage.setItem('Sesión',true);
                                            sessionStorage.setItem('Tipo de usuario',isLoggedType);
                                            sessionStorage.setItem('Vista del Sidebar','Inicio');
                                            
                                            setIsLoggedUser(JSON.parse(jsonUser));
                                            setIsLoggedPermissions(JSON.parse(jsonPermission));
                                            setIsLoggedStatus(JSON.parse(jsonStatus));

                                            if(isLoggedType === 'Médico'){
                                                setCurrentMView('Alerta-Médico');
                                                sessionStorage.setItem('Vista del Modal','Alerta-Médico');
                                            }
                                            
                                            resolve('¡SESIÓN INICIADA!...');

                                            setIsModal(true);
                                            sessionStorage.setItem('Estado del Modal',true);

                                            setTimeout(() => {
                                                setIsTextFieldsUser(prev => ({
                                                    ...prev,             
                                                    usuario: '',      
                                                    contrasena: '',       
                                                }));
                                                setIsLoggedLog(false);
                                                setIsLoggedLogged(true);
                                                setIsActionBlock(false);
                                                sessionStorage.setItem('Ruta',isLoggedType === 'Cocinero' || isLoggedType === 'Nutriólogo' || isLoggedType === 'Médico' ? '/Kitchen/Home' : '/Administration/Home');
                                                return navigate('/',{ replace: true });
                                            },1000);
                                        }else{
                                            setIsLoggedLog(false);
                                            setIsActionBlock(false);
                                            setIsModal(false);
                                            return reject('¡Error al encriptar las credenciales!...');
                                        }
                                    },1500);
                                }else{
                                    setIsLoggedLog(false);
                                    setIsActionBlock(false);
                                    setIsModal(false);
                                    return reject('¡Error al encriptar las credenciales!...');
                                }
                            }else{
                                if (isLoggedType === 'Cocinero' && !existsPermission.cocinero || 
                                    isLoggedType === 'Nutriólogo' && !existsPermission.nutriologo ||
                                    isLoggedType === 'Médico' && !existsPermission.medico ||
                                    isLoggedType === 'Administrador' && !existsPermission.administrador ||
                                    isLoggedType === 'Chef' && !existsPermission.chef ||
                                    isLoggedType === 'Almacenista' && !existsPermission.almacenista){
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
                                            sessionStorage.setItem('Usuario',encryptedUser);
                                            sessionStorage.setItem('Permisos',encryptedPermission);
                                            sessionStorage.setItem('Estatus',encryptedStatus);
                                            sessionStorage.setItem('Sesión',true);
                                            sessionStorage.setItem('Tipo de usuario',isLoggedType);
                                            sessionStorage.setItem('Vista del Sidebar','Inicio');
                                            
                                            setIsLoggedUser(JSON.parse(jsonUser));
                                            setIsLoggedPermissions(JSON.parse(jsonPermission));
                                            setIsLoggedStatus(JSON.parse(jsonStatus));

                                            if(isLoggedType === 'Médico'){
                                                setCurrentMView('Alerta-Médico');
                                                sessionStorage.setItem('Vista del Modal','Alerta-Médico');
                                            }
                                            
                                            resolve('¡SESIÓN INICIADA!...');
                                  
                                            setIsModal(true);
                                            sessionStorage.setItem('Estado del Modal',true);

                                            setTimeout(() => {
                                                setIsTextFieldsUser(prev => ({
                                                    ...prev,             
                                                    usuario: '',      
                                                    contrasena: '',       
                                                }));
                                                setIsLoggedLogged(true);
                                                setIsLoggedLog(false);
                                                setIsActionBlock(false);
                                                sessionStorage.setItem('Ruta',isLoggedType === 'Cocinero' || isLoggedType === 'Nutriólogo' || isLoggedType === 'Médico' ? '/Kitchen/Home' : '/Administration/Home');
                                                return navigate('/',{ replace: true });
                                            },2500);
                                        }else{
                                            setIsLoggedLog(false);
                                            setIsActionBlock(false);
                                            setIsModal(false);
                                            return reject('¡Error al encriptar las credenciales!...');
                                        }
                                    },500);
                                }else{
                                    setIsLoggedLog(false);
                                    setIsActionBlock(false);
                                    setIsModal(false);
                                    return reject('¡Error al encriptar las credenciales!...')
                                }
                            }
                        }else{
                            setIsLoggedLog(false);
                            setIsActionBlock(false);
                            setIsModal(false);
                            return reject('¡Usuario o contraseña incorrectos!...');
                        }
                    },1000);
                }catch(e){
                    setIsLoggedLog(false);
                    setIsActionBlock(false);
                    setIsModal(false);
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
    const { filteredRecordsUsers } = TableActionsUsers();
    // Estructura del componente
    return(
        <>
            <Container_Page>
                <Container_Page_Login className='bg-pan-bl'>
                    <Setting_Bar/>
                    <Container_Form_400 ThemeMode={themeMode} className={isModal ? 'slide-out-container-top':'roll-in-container-left'}>
                        <Container_Row_95_Center>
                            <Img_Logo_Verical_Hospital_240 ThemeMode={themeMode}/>
                        </Container_Row_95_Center>
                        <Text_Title_28_Black ThemeMode={themeMode}>
                            {currentLView === '' ? 'BIENVENIDO(A)': currentLView === 'Administration' || currentLView === 'Kitchen' ? 'SELECCIÓN DE USUARIO' : 'INICIAR SESIÓN'}
                        </Text_Title_28_Black>
                        {currentLView === '' || currentLView === 'Administration' || currentLView === 'Kitchen' ? (
                            <>
                                <Container_Column_90_Center className={themeMode ? 'shadow-out-container-light-infinite' : 'shadow-out-container-dark-infinite'}>
                                    {currentLView === '' ? (
                                        <>  
                                            <Tooltip title='Administración' placement="top">
                                                <Button_Icon_Blue_220 ThemeMode={themeMode} className={isAnimation ? 'roll-out-button-left' : 'roll-in-button-left'}
                                                    onClick={() => handleLoginView('Administration','')}
                                                    disabled={isAnimation}
                                                >
                                                    <Icon_White_22><MdManageAccounts/></Icon_White_22>
                                                </Button_Icon_Blue_220>
                                            </Tooltip>
                                            <Tooltip title='Cocina' placement="top">
                                                <Button_Icon_Blue_220 ThemeMode={themeMode} className={isAnimation ? 'roll-out-button-left' : 'roll-in-button-left'}
                                                    onClick={() => handleLoginView('Kitchen','')}
                                                    disabled={isAnimation}
                                                >
                                                    <Icon_White_22><GiRiceCooker/></Icon_White_22>
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
                                                    onClick={() => handleLoginView('Login','Administrador')}
                                                    disabled={!isAnimation}
                                                >
                                                    <Icon_White_22><FaUserTie/></Icon_White_22>
                                                </Button_Icon_Blue_220>
                                            </Tooltip>
                                            <Tooltip title='Chef' placement="top">
                                                <Button_Icon_Blue_220 ThemeMode={themeMode} className={isAnimation ? 'roll-in-button-left' : 'roll-out-button-left'}
                                                    onClick={() => handleLoginView('Login','Chef')}
                                                    disabled={!isAnimation}
                                                >
                                                    <Icon_White_22><GiChefToque/></Icon_White_22>
                                                </Button_Icon_Blue_220>
                                            </Tooltip>    
                                            <Tooltip title='Almacenista' placement="top">
                                                <Button_Icon_Blue_220 ThemeMode={themeMode} className={isAnimation ? 'roll-in-button-left' : 'roll-out-button-left'}
                                                    onClick={() => handleLoginView('Login','Almacenista')}
                                                    disabled={!isAnimation}
                                                >
                                                    <Icon_White_22><FaWarehouse/></Icon_White_22>
                                                </Button_Icon_Blue_220>
                                            </Tooltip> 
                                            <Tooltip title='Atrás' placement="top">
                                                <Button_Icon_Blue_220 ThemeMode={themeMode} className={isAnimation ? 'roll-in-button-left' : 'roll-out-button-left'}
                                                    onClick={() => handleLoginView('','')}
                                                    disabled={!isAnimation}    
                                                >
                                                    <Icon_White_22><IoArrowBackCircle/></Icon_White_22>
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
                                                    onClick={() => handleLoginView('Login','Cocinero')}
                                                    disabled={!isAnimation}
                                                >
                                                    <Icon_White_22><GiCook/></Icon_White_22>
                                                </Button_Icon_Blue_220>
                                            </Tooltip>  
                                            <Tooltip title='Nutriólogo' placement="top">
                                                <Button_Icon_Blue_220 ThemeMode={themeMode} className={isAnimation ? 'roll-in-button-left' : 'roll-out-button-left'}
                                                    onClick={() => handleLoginView('Login','Nutriólogo')}
                                                    disabled={!isAnimation}    
                                                >
                                                    <Icon_White_22><IoNutrition/></Icon_White_22>
                                                </Button_Icon_Blue_220>
                                            </Tooltip> 
                                            <Tooltip title='Médico' placement="top">
                                                <Button_Icon_Blue_220 ThemeMode={themeMode} className={isAnimation ? 'roll-in-button-left' : 'roll-out-button-left'}
                                                    onClick={() => handleLoginView('Login','Médico')}
                                                    disabled={!isAnimation}    
                                                >
                                                    <Icon_White_22><FaUserDoctor/></Icon_White_22>
                                                </Button_Icon_Blue_220>
                                            </Tooltip> 
                                            <Tooltip title='Atrás' placement="top">
                                                <Button_Icon_Blue_220 ThemeMode={themeMode} className={isAnimation ? 'roll-in-button-left' : 'roll-out-button-left'}
                                                    onClick={() => handleLoginView('','')}
                                                    disabled={!isAnimation}    
                                                > 
                                                    <Icon_White_22><IoArrowBackCircle/></Icon_White_22>
                                                </Button_Icon_Blue_220>
                                            </Tooltip> 
                                        </>
                                    ):(
                                        <></>
                                    )}
                                </Container_Column_90_Center>   
                            </>
                        ):(
                            <></>
                        )}
                        {currentLView === 'Login' ? (
                            <>
                                <Form_Login/>
                                <Container_Row_95_Center>
                                    <Tooltip title='Atrás' placement="top">
                                        <Button_Icon_Blue_150 ThemeMode={themeMode} className={isAnimation ? 'roll-out-button-left' : 'roll-in-button-left'}
                                            onClick={() => handleLoginView(isLoggedType === 'Cocinero' || isLoggedType === 'Nutriólogo' || isLoggedType === 'Médico' ? 'Kitchen' : 'Administration','')}
                                            disabled={isActionBlock}
                                        >
                                            <Icon_White_22><IoArrowBackCircle/></Icon_White_22>
                                        </Button_Icon_Blue_150>
                                    </Tooltip>
                                    <Tooltip title='Iniciar sesión' placement="top">
                                        <Button_Icon_Green_150 ThemeMode={themeMode} className={isActionBlock ? 'roll-out-button-left' : 'roll-in-button-left'}
                                            onClick={() => handleLoggedLog()}
                                            disabled={isActionBlock}
                                        >
                                            <Icon_White_22><MdLogin/></Icon_White_22>
                                        </Button_Icon_Green_150>
                                    </Tooltip>
                                </Container_Row_95_Center>
                            </>
                        ):(
                            <></>
                        )}
                    </Container_Form_400>
                    {isKeyboard ? (
                        <>
                            <Virtual_Keyboard value={isKeyboardView === 'User' ? isTextFieldsUser.usuario : isTextFieldsUser.contrasena} onChange={handleKeyboard}/>  
                        </>
                    ):(
                        <></>
                    )}
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