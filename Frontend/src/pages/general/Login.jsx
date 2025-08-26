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
import { SocketContext } from "../../contexts/SocketProvider";
import { LoginViewContext,ModalViewContext,ModalContext,SidebarViewContext } from "../../contexts/ViewsProvider";
import { TextFieldsUserContext } from "../../contexts/FormsProvider";
import { ActionBlockContext,AnimationContext } from '../../contexts/VariablesProvider';
import { LoggedLoggedContext,LoggedLogContext,LoggedTypeContext,LoggedUserContext,LoggedPermissionsContext,LoggedStatusContext } from "../../contexts/SessionProvider";
import { PermissionsContext,StatusContext,UsersContext } from "../../contexts/UsersProvider";
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
import Logo_Vertical_Hospital from '../../components/imgs/Logo-Vertical-Hospital.png';
//__________IMAGES____________
// Estilos personalizados
import { Container_Page,Container_Page_Login,Container_Page_White,Container_Login_Form_White_Auto,Container_Login_Form_White,Container_Login_Form,Container_Row_100_Center } from "../../components/styled/Containers";
import { Icon_20 } from "../../components/styled/Icons";
import { Image_Login_Auto } from "../../components/styled/Imgs";
import { Text_Fade_Title_20_Black,Text_Span_16_Justify_Black } from "../../components/styled/Text";
import { Button_Icon_Blue_200,Button_Icon_Blue_Auto_40,Button_Icon_Green_Auto_40 } from "../../components/styled/Buttons";
import { Alert_Swal_Greeting,Alert_Sonner_Loading,Alert_Sonner_Success,Alert_Sonner_Error,Alert_Sonner_Styles,Alert_Swal_Confirm } from '../../components/styled/Alerts';
// Componentes personalizados
import Footer from "../../components/navegation/Footer";
import Form_Login from "../../components/forms/Login";
import { Keyboard_Verification } from "../../components/keyboards/Verificacion";
//____________IMPORT/EXPORT____________

// Página para iniciar sesión
export default function Login(){
    // Constantes con el valor de los contextos
    const [socket] = useContext(SocketContext);
    const [isUsers] = useContext(UsersContext);
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
    const [currentSView,setCurrentSView] = useContext(SidebarViewContext);
    const [currentMView,setCurrentMView] = useContext(ModalViewContext);
    const [isModal,setIsModal] = useContext(ModalContext);
    const [isAnimation,setIsAnimation] = useContext(AnimationContext);
    // useEffect con el titulo de la página
    useEffect(() => {
        document.title = 'MEALSYNC';
        const showAlerts = async () => {
            await Alert_Swal_Greeting('¡Te da la Bienvenida!');
            await Alert_Swal_Greeting('¡Inicia sesión para acceder a la pagina principal!');
        }
        showAlerts();
    },[]);
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

                            if(!existsStatus || !existsStatus.habilitado || !existsPermission){
                                setIsActionBlock(false);
                                setIsLoggedLog(false);
                                return reject('¡No es posible utilizar este usuario!');
                            }
                                
                            if (isLoggedType === 'Cocinero' && !existsPermission.cocinero || 
                                isLoggedType === 'Nutriólogo' && !existsPermission.nutriologo ||
                                isLoggedType === 'Médico' && !existsPermission.medico ||
                                isLoggedType === 'Administrador' && !existsPermission.administrador ||
                                isLoggedType === 'Chef' && !existsPermission.chef ||
                                isLoggedType === 'Almacenista' && !existsPermission.almacenista){
                                setIsLoggedLog(false);
                                setIsActionBlock(false);
                                return reject('¡Tu usuario no cuenta con los permisos necesarios para acceder!');
                            }

                            if(existsStatus.activo){
                                reject('¡El usuario ya se encuentra activo!');
                                setIsLoggedLog(false);
                            }
                            
                            if(!existsStatus.activo){
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
                                            
                                            setIsLoggedUser(JSON.parse(jsonUser));
                                            setIsLoggedPermissions(JSON.parse(jsonPermission));
                                            setIsLoggedStatus(JSON.parse(jsonStatus));

                                            resolve('¡SESIÓN INICIADA!');
                                            
                                            if(isLoggedType === 'Médico'){
                                                setCurrentMView('Alerta-Médico');
                                                sessionStorage.setItem('Vista del Modal','Alerta-Médico');
                                            }
                                
                                            setIsModal(true);
                                            sessionStorage.setItem('Estado del Modal',true);

                                            setIsAnimation(true);

                                            setTimeout(() => {
                                                setIsTextFieldsUser(prev => ({
                                                    ...prev,             
                                                    usuario: '',      
                                                    contrasena: '',       
                                                }));
                                                setIsLoggedLogged(true);
                                                setIsLoggedLog(false);
                                                setIsActionBlock(false);
                                                setCurrentSView('Inicio');
                                                sessionStorage.setItem('Vista del Sidebar','Inicio');
                                                sessionStorage.setItem('Ruta',isLoggedType === 'Cocinero' || isLoggedType === 'Nutriólogo' ? '/Kitchen/Home' : isLoggedType === 'Médico'  ? '/Kitchen/Index/Verification' : '/Administration/Home');
                                                setIsAnimation(false);
                                                return navigate('/',{ replace: true });
                                            },2500);
                                        }else{
                                            setIsLoggedLog(false);
                                            setIsActionBlock(false);
                                            return reject('¡Error al encriptar las credenciales!');
                                        }
                                    },1000);
                                }else{
                                    setIsLoggedLog(false);
                                    setIsActionBlock(false);
                                    return reject('¡Error al encriptar las credenciales!')
                                }
                            }
                        }else{
                            setIsLoggedLog(false);
                            setIsActionBlock(false);
                            return reject('¡Usuario o contraseña incorrectos!');
                        }
                    },1000);
                }catch(e){
                    setIsLoggedLog(false);
                    setIsActionBlock(false);
                    setIsModal(false);
                    setIsLoggedLogged(false);
                    setCurrentSView('');
                    sessionStorage.clear();
                    return reject('¡Ocurrio un error inesperado!');
                }
            });

            Alert_Sonner_Loading('¡Verificando credenciales!',{id: 'Promise'});

            promise
                .then((msg) => {
                    Alert_Sonner_Success(msg,{id: 'Promise'});
                })
                .catch((msj) => {
                    Alert_Sonner_Error(msj,{id: 'Promise'});
                    if(msj === '¡El usuario ya se encuentra activo!'){
                        setTimeout(() => {
                            Alert_Swal_Confirm('¿Desea cerrar la sesión activa del usuario?',onConfirm,onCancel);
                        },2500);
                    }
                });
            
            const onConfirm = async () => {
                const iduser = isUsers.find(user => user.usuario === isTextFieldsUser.usuario)?.idusuario;
                const idstatus = isStatus.find(status => status.idusuario === iduser)?.idestatus;

                socket.emit('Update-Status-Log',iduser,idstatus,0,(response) => {
                    if(response.success){
                        Alert_Sonner_Success('¡Sesión cerrada correctamente!',{});
                        setTimeout(() => {
                            setIsActionBlock(false);
                        },2500);
                    } else {
                        Alert_Sonner_Error('¡Ha ocurrido un error inseperado!',{});
                        setTimeout(() => {
                            setIsActionBlock(false);
                        },2500);
                    }
                });
            };
            const onCancel = async () => {
                setIsActionBlock(false);
            };
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
                <Container_Page_Login>
                    <Container_Page_White>
                        <Container_Login_Form_White_Auto className={!isAnimation ? 'slide-in-container-top' : 'slide-out-container-top'}>
                            <Container_Login_Form_White>
                                <Container_Login_Form>
                                    <Image_Login_Auto src={Logo_Vertical_Hospital}/>
                                    {currentLView === '' ? (
                                        <>
                                            <Text_Fade_Title_20_Black>BIENVENIDO(A)</Text_Fade_Title_20_Black>
                                        </>
                                    ):(
                                        <></>
                                    )}
                                    {currentLView === 'Administration' || currentLView === 'Kitchen' ? (
                                        <>
                                            <Text_Fade_Title_20_Black>SELECCIÓN DE USUARIO</Text_Fade_Title_20_Black>
                                        </>
                                    ):(
                                        <></>
                                    )}
                                    {currentLView === 'Login' ? (
                                        <>
                                            <Text_Fade_Title_20_Black>INICIAR SESIÓN</Text_Fade_Title_20_Black>
                                            <Text_Span_16_Justify_Black>{isLoggedType}</Text_Span_16_Justify_Black>
                                        </>
                                    ):(
                                        <></>
                                    )}
                                    {currentLView === '' || currentLView === 'Administration' || currentLView === 'Kitchen' ? (
                                        <>
                                            {currentLView === '' ? (
                                                <>  
                                                    <Tooltip title='Administración' placement="top">
                                                        <Button_Icon_Blue_200
                                                            onClick={() => handleLoginView('Administration','')}
                                                        >
                                                            <Icon_20><MdManageAccounts/></Icon_20>
                                                        </Button_Icon_Blue_200>
                                                    </Tooltip>
                                                    <Tooltip title='Cocina' placement="top">
                                                        <Button_Icon_Blue_200
                                                            onClick={() => handleLoginView('Kitchen','')}
                                                        >
                                                            <Icon_20><GiRiceCooker/></Icon_20>
                                                        </Button_Icon_Blue_200>
                                                    </Tooltip>
                                                </>
                                            ):(
                                                <></>
                                            )}
                                            {currentLView === 'Administration' ? (
                                                <>
                                                    <Tooltip title='Administrador' placement="top">
                                                        <Button_Icon_Blue_200
                                                            onClick={() => handleLoginView('Login','Administrador')}
                                                        >
                                                            <Icon_20><FaUserTie/></Icon_20>
                                                        </Button_Icon_Blue_200>
                                                    </Tooltip>
                                                    <Tooltip title='Chef' placement="top">
                                                        <Button_Icon_Blue_200
                                                            onClick={() => handleLoginView('Login','Chef')}
                                                        >
                                                            <Icon_20><GiChefToque/></Icon_20>
                                                        </Button_Icon_Blue_200>
                                                    </Tooltip>    
                                                    <Tooltip title='Almacenista' placement="top">
                                                        <Button_Icon_Blue_200
                                                            onClick={() => handleLoginView('Login','Almacenista')}
                                                        >
                                                            <Icon_20><FaWarehouse/></Icon_20>
                                                        </Button_Icon_Blue_200>
                                                    </Tooltip> 
                                                    <Tooltip title='Atrás' placement="top">
                                                        <Button_Icon_Blue_200
                                                            onClick={() => handleLoginView('','')}  
                                                        >
                                                            <Icon_20><IoArrowBackCircle/></Icon_20>
                                                        </Button_Icon_Blue_200>
                                                    </Tooltip>
                                                </>
                                            ):(
                                                <></>
                                            )}
                                            {currentLView === 'Kitchen' ? (
                                                <>
                                                    <Tooltip title='Cocinero' placement="top">
                                                        <Button_Icon_Blue_200
                                                            onClick={() => handleLoginView('Login','Cocinero')}
                                                        >
                                                            <Icon_20><GiCook/></Icon_20>
                                                        </Button_Icon_Blue_200>
                                                    </Tooltip> 
                                                    <Button_Icon_Blue_200
                                                        disabled
                                                        onClick={() => handleLoginView('Login','Nutriólogo')}   
                                                    >
                                                        <Icon_20><IoNutrition/></Icon_20>
                                                    </Button_Icon_Blue_200>
                                                    <Tooltip title='Médico' placement="top">
                                                        <Button_Icon_Blue_200
                                                            onClick={() => handleLoginView('Login','Médico')} 
                                                        >
                                                            <Icon_20><FaUserDoctor/></Icon_20>
                                                        </Button_Icon_Blue_200>
                                                    </Tooltip> 
                                                    <Tooltip title='Atrás' placement="top">
                                                        <Button_Icon_Blue_200
                                                            onClick={() => handleLoginView('','')}  
                                                        > 
                                                            <Icon_20><IoArrowBackCircle/></Icon_20>
                                                        </Button_Icon_Blue_200>
                                                    </Tooltip> 
                                                </>
                                            ):(
                                                <></>
                                            )}
                                        </>
                                    ):(
                                        <></>
                                    )}
                                    {currentLView === 'Login' ? (
                                        <>
                                            <Form_Login/>
                                            {isActionBlock ? (
                                                <Container_Row_100_Center>
                                                    <Button_Icon_Blue_Auto_40 disabled>
                                                        <Icon_20><IoArrowBackCircle/></Icon_20>
                                                    </Button_Icon_Blue_Auto_40>
                                                    <Button_Icon_Green_Auto_40 disabled>
                                                        <Icon_20><MdLogin/></Icon_20>
                                                    </Button_Icon_Green_Auto_40>
                                                </Container_Row_100_Center>
                                            ):(
                                                <Container_Row_100_Center>
                                                    <Tooltip title='Atrás' placement="top">
                                                        <Button_Icon_Blue_Auto_40
                                                            onClick={() => handleLoginView(isLoggedType === 'Cocinero' || isLoggedType === 'Nutriólogo' || isLoggedType === 'Médico' ? 'Kitchen' : 'Administration','')}
                                                        >
                                                            <Icon_20><IoArrowBackCircle/></Icon_20>
                                                        </Button_Icon_Blue_Auto_40>
                                                    </Tooltip>
                                                    <Tooltip title='Iniciar sesión' placement="top">
                                                        <Button_Icon_Green_Auto_40
                                                            onClick={() => handleLoggedLog()}
                                                        >
                                                            <Icon_20><MdLogin/></Icon_20>
                                                        </Button_Icon_Green_Auto_40>
                                                    </Tooltip>
                                                </Container_Row_100_Center>
                                            )}
                                        </>
                                    ):(
                                        <></>
                                    )}
                                </Container_Login_Form>
                            </Container_Login_Form_White>
                        </Container_Login_Form_White_Auto>
                        <Keyboard_Verification/>
                        <Footer/>
                    </Container_Page_White>
                </Container_Page_Login> 
            </Container_Page>  
            <Alert_Sonner_Styles>
                <Toaster
                    visibleToasts={5}
                    richColors
                    expand={true}
                />
            </Alert_Sonner_Styles>  
        </>
    );
};