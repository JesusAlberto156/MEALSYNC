//____________IMPORT/EXPORT____________
// Hooks de React
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
// Componentes de React externos
import { Tooltip } from "@mui/material";
// Servicios
import { encryptData } from "../../../services/Crypto";
// Contextos
import { ModalViewContext,ModalContext,SidebarViewContext } from "../../../contexts/ViewsProvider";
import { ActionBlockContext } from "../../../contexts/VariablesProvider";
import { TextFieldsUserContext } from "../../../contexts/FormsProvider";
import { SocketContext } from "../../../contexts/SocketProvider";
import { UsersContext,PermissionsContext,StatusContext } from "../../../contexts/UsersProvider";
import { LoggedUserContext,LoggedPermissionsContext,LoggedStatusContext,LoggedLoggedContext,LoggedTypeContext } from "../../../contexts/SessionProvider";
//__________IMAGENES__________
import Logo_Hospital from '../../imgs/Logo-Hospital.png'
//__________IMAGENES__________
//__________ICONOS__________
// Icono para cerrar el modal
import { MdCancel } from "react-icons/md";
// Icono para realizar la función del modal
import { MdLogin } from "react-icons/md";
//__________ICONOS__________
// Estilos personalizados
import { Container_Page,Container_Page_Login,Container_Modal_Background_Black,Container_Modal_Image,Container_Modal_Form_White_35,Container_Modal_Form,Container_Modal_Form_White,Container_Modal_Form_Button } from "../../styled/Containers";
import { Image_Modal_Fixed } from "../../styled/Imgs";
import { Text_Span_16_Justify_Black,Text_Title_28_Black } from "../../styled/Text";
import { Button_Icon_Blue_Auto_50,Button_Icon_Green_Auto_50 } from "../../styled/Buttons";
import { Icon_20 } from "../../styled/Icons";
import { Alert_Sonner_Loading,Alert_Sonner_Success,Alert_Sonner_Error } from "../../styled/Alerts";
//____________IMPORT/EXPORT____________

// Modal para cerrar sesión
export default function Verificacion_Login(){
    // Constantes con el valor de los contextos 
    const [isActionBlock,setIsActionBlock] = useContext(ActionBlockContext);
    const [currentMView,setCurrentMView] = useContext(ModalViewContext);
    const [currentSView,setCurrentSView] = useContext(SidebarViewContext);
    const [isModal,setIsModal] = useContext(ModalContext);
    const [isTextFieldsUser,setIsTextFieldsUser] = useContext(TextFieldsUserContext);
    const [socket] = useContext(SocketContext);
    const [isUsers] = useContext(UsersContext);
    const [isPermissions] = useContext(PermissionsContext);
    const [isStatus] = useContext(StatusContext);
    const [isLoggedUser,setIsLoggedUser] = useContext(LoggedUserContext);
    const [isLoggedPermissions,setIsLoggedPermissions] = useContext(LoggedPermissionsContext);
    const [isLoggedStatus,setIsLoggedStatus] = useContext(LoggedStatusContext);
    const [isLoggedLogged,setIsLoggedLogged] = useContext(LoggedLoggedContext);
    const [isLoggedType] = useContext(LoggedTypeContext);
    // Constantes con la funcionalidad de los hooks
    const navigate = useNavigate();
    // UseEffect para verificar que tenga los datos de sesión
    useEffect(() => {
        if(isTextFieldsUser.usuario === '' && isTextFieldsUser.contrasena === ''){
            setIsActionBlock(true);
            sessionStorage.clear();
            setCurrentMView('');
            setTimeout(() => {
                setIsActionBlock(false);
                return navigate('/',{ replace: true });
            },1000);
        }
    },[isTextFieldsUser.usuario,isTextFieldsUser.contrasena]);
    useEffect(() => {
        const promise = new Promise((resolve,reject) => {
            try{
                setIsActionBlock(true);
                setTimeout(() => {
                    const user = isUsers.find(user => user.usuario === isTextFieldsUser.usuario);
                    const permissions = isPermissions.find(permissions => permissions.idusuario === user.idusuario);
                    const status = isStatus.find(status => status.idusuario === user.idusuario);

                    const jsonUser = JSON.stringify(user);
                    const jsonPermission = JSON.stringify(permissions);
                    const jsonStatus = JSON.stringify(status);
                                                                            
                    const encryptedUser = encryptData(jsonUser);
                    const encryptedPermission = encryptData(jsonPermission);
                    const encryptedStatus = encryptData(jsonStatus);

                    if( encryptedUser && encryptedPermission && encryptedStatus){
                        sessionStorage.setItem('Usuario',encryptedUser);
                        sessionStorage.setItem('Permisos',encryptedPermission);
                        sessionStorage.setItem('Estatus',encryptedStatus);
                        sessionStorage.setItem('Sesión',true);
                        sessionStorage.setItem('Tipo de usuario',isLoggedType);
                        
                        setIsLoggedUser(JSON.parse(jsonUser));
                        setIsLoggedPermissions(JSON.parse(jsonPermission));
                        setIsLoggedStatus(JSON.parse(jsonStatus));
                        
                        resolve('¡SESIÓN INICIADA!');

                        setCurrentMView('');
                        sessionStorage.setItem('Vista del Modal','');

                        setTimeout(() => {
                            if(isLoggedType === 'Médico'){
                                setCurrentMView('Alerta-Médico');
                                sessionStorage.setItem('Vista del Modal','Alerta-Médico');
                            }

                            setIsModal(true);
                            sessionStorage.setItem('Estado del Modal',true);
                            setIsTextFieldsUser(prev => ({
                                ...prev,             
                                usuario: '',      
                                contrasena: '',       
                            }));
                            setIsLoggedLogged(true);
                            setIsActionBlock(false);
                            setCurrentSView('Inicio');
                            sessionStorage.setItem('Vista del Sidebar','Inicio');
                            sessionStorage.setItem('Ruta',isLoggedType === 'Cocinero' || isLoggedType === 'Nutriólogo' || isLoggedType === 'Médico' ? '/Kitchen/Home' : '/Administration/Home');
                            return navigate('/',{ replace: true });
                        },2500);
                    }else{
                        setIsActionBlock(false);
                        return reject('¡Error al encriptar las credenciales!');
                    }
                },1000);
            }catch(e){
                setIsActionBlock(false);
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
            });
    },[isStatus]);
    // Estructura del componente
    return(
        <>
            <Container_Page>
                <Container_Page_Login>
                    {isModal ? (
                        <>
                            <Container_Modal_Background_Black>
                                <Container_Modal_Image/>
                                <Image_Modal_Fixed src={Logo_Hospital}/>
                                <Container_Modal_Form_White_35 className={currentMView === 'Verificar-Sesión' ? 'slide-in-container-top' : 'slide-out-container-top'}>
                                    <Container_Modal_Form>
                                        <Text_Title_28_Black>INICIAR SESIÓN</Text_Title_28_Black>
                                        <Text_Span_16_Justify_Black>
                                            Ya existe una sesión activa para este usuario. Si continúa con el inicio de sesión en esta pestaña, se cerrará la sesión actual.
                                        </Text_Span_16_Justify_Black>
                                        <Container_Modal_Form_Button>
                                            <Tooltip title='Cancelar' placement='top'>
                                                <Button_Icon_Blue_Auto_50                                                   
                                                    disabled={isActionBlock} 
                                                    onClick={() => {
                                                        setIsActionBlock(true);
                                                        setIsTextFieldsUser(prev => ({
                                                            ...prev,             
                                                            usuario: '',      
                                                            contrasena: '',       
                                                        }));
                                                        sessionStorage.clear();
                                                        setCurrentMView('');
                                                        setTimeout(() => {
                                                            setIsActionBlock(false);
                                                            return navigate('/',{ replace: true });
                                                        },1000);
                                                    }}   
                                                >
                                                    <Icon_20><MdCancel/></Icon_20>
                                                </Button_Icon_Blue_Auto_50>
                                            </Tooltip>
                                            <Tooltip title='Iniciar sesión' placement="top">
                                                <Button_Icon_Green_Auto_50
                                                    disabled={isActionBlock}
                                                    onClick={() => {
                                                        const iduser = isUsers.find(user => user.usuario === isTextFieldsUser.usuario)?.idusuario
                                                        const idstatus = isStatus.find(status => status.idusuario === iduser)?.idestatus
                                                        socket.emit('Update-Status-Log',iduser,idstatus,0);
                                                    }}
                                                >
                                                    <Icon_20><MdLogin/></Icon_20>
                                                </Button_Icon_Green_Auto_50>
                                            </Tooltip>
                                        </Container_Modal_Form_Button>
                                    </Container_Modal_Form>
                                </Container_Modal_Form_White_35>
                            </Container_Modal_Background_Black>  
                        </>
                    ):(
                        <></>
                    )}
                </Container_Page_Login>
            </Container_Page>
        </>
    );
}