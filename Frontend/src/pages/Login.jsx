import { useEffect,useState,useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Toaster } from 'sonner';
import { Tooltip } from "@mui/material";
import { encryptData } from "../services/Crypto";

import { loadingOptionLoginContext,toastContext,visibleContext,selectedRowContext,searchTermContext,modalContext,optionModalContext } from '../contexts/VariablesProvider'
import { loggedContext,nameContext,passwordContext,logContext,enableContext } from "../contexts/SessionProvider";
import { permissionContext,permissionsContext } from "../contexts/PermissionsProvider";
import { typeUserContext } from "../contexts/TypeUserProvider";
import { usersContext,userContext } from "../contexts/UsersProvider";
import { statusAllContext,statusUserContext } from "../contexts/StatusProvider";
import { sidebarContext,navbarContext } from "../contexts/ViewsProvider";

import { useOptionsLogin,useLogin } from "../hooks/OptionsLogin";

import { FaUserShield } from "react-icons/fa6";
import { MdSoupKitchen } from "react-icons/md";
import { FaUserSecret } from "react-icons/fa";
import { FaWarehouse } from "react-icons/fa6";
import { LuChefHat } from "react-icons/lu";
import { GiChefToque } from "react-icons/gi";
import { IoNutrition } from "react-icons/io5";
import { FaUserMd } from "react-icons/fa";
import { IoArrowBackCircle } from "react-icons/io5";
import { MdLogin } from "react-icons/md";

import { Title_Fade_Login } from "../components/styled/Text";
import { Form_Login } from '../components/styled/Forms'
import { Input_Group_Login,Input_Login } from "../components/styled/Inputs";
import { Button_Blue_Login,Button_Green_Login,Button_Block_Login } from "../components/styled/Buttons";
import { Label_Login,Label_Popup_Login } from "../components/styled/Labels";
import { Whitespace_Login } from "../components/styled/Whitespaces";
import { Alert_Greeting,Toast_Styles,Alert_Verification } from '../components/styled/Notifications'

import Logo from "../components/imgs/Logo-Vertical-Digital.png"
import Footer from '../components/footer/Footer';
import Loading from "./Loading";

export default function Login(){
    const [isName,setIsName] = useContext(nameContext);
    const [isPassword,setIsPassword] = useContext(passwordContext);
    const [isLoadingOptionLogin,setIsLoadingOptionLogin] = useContext(loadingOptionLoginContext);
    const [isTypeUser,setIsTypeUser] = useContext(typeUserContext);
    const [isToast,setIsToast] = useContext(toastContext);
    const [isLog,setIsLog] = useContext(logContext);
    const [isVisible,setIsVisible] = useContext(visibleContext);
    const [isSelectedRow,setIsSelectedRow] = useContext(selectedRowContext);
    const [isSearchTerm,setIsSearchTerm] = useContext(searchTermContext);
    const [isModal,setIsModal] = useContext(modalContext);
    const [isOptionModal,setIsOptionModal] = useContext(optionModalContext);
    const [isSidebar,setIsSidebar] = useContext(sidebarContext);
    const [isNavbar,setIsNavbar] = useContext(navbarContext);
    const [isEnable,setIsEnable] = useContext(enableContext);

    const [isUsers] = useContext(usersContext);
    const [isPermissions] = useContext(permissionsContext);
    const [isStatusAll] = useContext(statusAllContext);
    const [isUser,setIsUser] = useContext(userContext);
    const [isPermission,setIsPermission] = useContext(permissionContext);
    const [isStatusUser,setIsStatusUser] = useContext(statusUserContext);

    const [isLogged,setIsLogged] = useContext(loggedContext);
    
    const [textName,setTextName] = useState(false);
    const [isFocusedName, setIsFocusedName] = useState(false);
    const [isFocusedNameColor, setIsFocusedNameColor] = useState(false);
    const [textPassword,setTextPassword] = useState(false);
    const [isFocusedPassword, setIsFocusedPassword] = useState(false);
    const [isFocusedPasswordColor, setIsFocusedPasswordColor] = useState(false);

    const [isLoading,setIsLoading] = useState(false);
    
    const navigate = useNavigate();

    const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

    useEffect(() => {
        setTimeout(() => {
            setIsLoading(true);
        },500);
    },[]);
    useEffect(() => {
        document.title='MEALSYNC_Cargando'
        setTimeout(() => {
            document.title = "MEALSYNC_Iniciar_Sesión"
        },1000)
        Alert_Greeting("MEALSYNC",'¡Inicia sesión para acceder a la pagina principal!...','Blue');
        Alert_Greeting("MEALSYNC",'¡Te da la Bienvenida!...','Blue');
    }, []);
    useEffect(() => {
        document.title = "MEALSYNC_Iniciar_Sesión"
        Alert_Greeting("MEALSYNC",'¡Inicia sesión para acceder a la pagina principal!...','Blue');
        Alert_Greeting("MEALSYNC",'¡Te da la Bienvenida!...','Blue');
    },[isLoading]);

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

                        if(existsPermission.superAdmon){
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
    
                                            if(isTypeUser === 'Medico'){
                                                setIsModal(true);
                                                setIsOptionModal('Alerta-Medica');
                                            }
                                            
                                            console.log('¡Credenciales encriptadas correctamente!...');
                                            navigate(isTypeUser === 'Cocinero' || isTypeUser === 'Nutriologo' || isTypeUser === 'Medico' ? '/Menu' : '/Administrator',{ replace: true });
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
                        if(isTypeUser === 'Cocinero' && !existsPermission.cocinero){
                            setIsLog(false);
                            return reject('¡Este usuario no cuenta con el rol de COCINERO!...');
                        }
                        if(isTypeUser === 'Nutriologo' && !existsPermission.nutriologo){
                            setIsLog(false);
                            return reject('¡Este usuario no cuenta con el rol de NUTRIÓLOGO!...');
                        }
                        if(isTypeUser === 'Medico' && !existsPermission.medico){
                            setIsLog(false);
                            return reject('¡Este usuario no cuenta con el rol de MÉDICO!...');
                        }
                        if(isTypeUser === 'Administrador' && !existsPermission.administrador){
                            setIsLog(false);
                            return reject('¡Este usuario no cuenta con el rol de ADMINISTRADOR!...');
                        }
                        if(isTypeUser === 'Chef' && !existsPermission.chef){
                            setIsLog(false);
                            return reject('¡Este usuario no cuenta con el rol de CHEF!...');
                        }
                        if(isTypeUser === 'Almacen' && !existsPermission.almacen){
                            setIsLog(false);
                            return reject('¡Este usuario no cuenta con el rol de ALMACÉN!...');
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

                                        if(isTypeUser === 'Medico'){
                                            setIsModal(true);
                                            setIsOptionModal('Alerta-Medica');
                                        }
                                        
                                        console.log('¡Credenciales encriptadas correctamente!...');
                                        navigate(isTypeUser === 'Cocinero' || isTypeUser === 'Nutriologo' || isTypeUser === 'Medico' ? '/Menu' : '/Administrator',{ replace: true });
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
            Alert_Verification(promise,'Verificando credenciales...','Light');

            document.title = "MEALSYNC_Iniciar_Sesión";
        }
    },[isLog]);

    const optionsLogin = useOptionsLogin();
    const login = useLogin();

    if(!isLoading) return <Loading/>

    return(
        <div className="app-container">
            <div className="background-login">
                <Form_Login>
                    <img src={Logo} alt="Logo de Hospital Puerta de Hierro" className="logo-form-1"/>
                    <Title_Fade_Login>Bienvenido(a)</Title_Fade_Login>
                    {isLoadingOptionLogin === '' ? (
                        <>
                            <Tooltip title='Administración' placement="top">
                                <Button_Blue_Login onClick={() => optionsLogin('Administration','')}><FaUserShield/></Button_Blue_Login>
                            </Tooltip>
                            <Tooltip title='Cocina' placement="top">
                                <Button_Blue_Login onClick={() => optionsLogin('Kitchen','')}><MdSoupKitchen/></Button_Blue_Login>
                            </Tooltip>
                        </>
                    ):(
                        <></>
                    )}
                    {isLoadingOptionLogin === 'Administration' ? (
                        <>
                            <Tooltip title='Administrador' placement="top">
                                <Button_Blue_Login onClick={() => optionsLogin('Login','Administrador')}><FaUserSecret/></Button_Blue_Login>
                            </Tooltip>
                            <Tooltip title='Chef' placement="top">
                                <Button_Blue_Login onClick={() => optionsLogin('Login','Chef')}><GiChefToque/></Button_Blue_Login>
                            </Tooltip>
                            <Tooltip title='Almacén' placement="top">
                                <Button_Blue_Login onClick={() => optionsLogin('Login','Almacen')}><FaWarehouse/></Button_Blue_Login>
                            </Tooltip>
                            <Tooltip title='Atrás' placement="top">
                                <Button_Blue_Login onClick={() => optionsLogin('','')}><IoArrowBackCircle/></Button_Blue_Login>
                            </Tooltip>
                        </>
                    ):(
                        <></>
                    )}
                    {isLoadingOptionLogin === 'Kitchen' ? (
                        <>
                            <Tooltip title='Cocinero' placement="top">
                                <Button_Blue_Login onClick={() => optionsLogin('Login','Cocinero')}><LuChefHat/></Button_Blue_Login>
                            </Tooltip>
                            <Tooltip title='Nutriólogo' placement="top">
                                <Button_Block_Login onClick={() => optionsLogin('Login','Nutriologo')}><IoNutrition/></Button_Block_Login>
                            </Tooltip>
                            <Tooltip title='Médico' placement="top">
                                <Button_Blue_Login onClick={() => optionsLogin('Login','Medico')}><FaUserMd/></Button_Blue_Login>
                            </Tooltip>
                            <Tooltip title='Atrás' placement="top">
                                <Button_Blue_Login onClick={() => optionsLogin('','')}><IoArrowBackCircle/></Button_Blue_Login>
                            </Tooltip>
                        </>
                    ):(
                        <></>
                    )}
                    {isLoadingOptionLogin === 'Login' ? (
                        <>
                            <Input_Group_Login>
                                <Label_Login
                                    isLabelUp={isFocusedName}
                                    isFocused={isFocusedNameColor}
                                >
                                    Nombre de usuario
                                </Label_Login>
                                <Input_Login
                                    value={isName}
                                    onClick={(e) => {
                                        setTextName(true);
                                        setIsFocusedNameColor(true);
                                        setIsFocusedName(true);
                                    }}
                                    onBlur={(e) => {
                                        setTextName(false);
                                        setIsFocusedNameColor(false);
                                        if (e.target.value === ''){
                                            setIsFocusedName(false);
                                        }else{
                                            setIsFocusedName(true);
                                        }
                                    }}   
                                    onChange={(e) => setIsName(e.target.value)} 
                                />
                                {textName && (
                                    <Label_Popup_Login>Escribe tú nombre de usuario</Label_Popup_Login>
                                )}
                            </Input_Group_Login>
                            <Input_Group_Login>
                                <Label_Login 
                                    isLabelUp={isFocusedPassword}
                                    isFocused={isFocusedPasswordColor}
                                >
                                    Contraseña
                                </Label_Login>
                                <Input_Login
                                    value={isPassword}
                                    onClick={(e) => {
                                        setTextPassword(true);
                                        setIsFocusedPasswordColor(true);
                                        setIsFocusedPassword(true);
                                    }}
                                    onBlur={(e) => {
                                        setTextPassword(false);
                                        setIsFocusedPasswordColor(false);
                                        if (e.target.value === ''){
                                            setIsFocusedPassword(false);
                                        }else{
                                            setIsFocusedPassword(true);
                                        }
                                    }}   
                                    onChange={(e) => setIsPassword(e.target.value)} 
                                    type="password"
                                />
                                {textPassword && (
                                    <Label_Popup_Login>Escribe tú Contraseña</Label_Popup_Login>
                                )}
                            </Input_Group_Login>
                            <Tooltip title='Iniciar sesión' placement="top">
                                <Button_Green_Login onClick={() => login()}><MdLogin/></Button_Green_Login>
                            </Tooltip>
                        </>
                    ):(
                        <></>
                    )}
                    {isLoadingOptionLogin === 'Login' ? (
                        isTypeUser === 'Cocinero' || isTypeUser === 'Nutriologo' || isTypeUser === 'Medico' ? (
                            <>
                                <Tooltip title='Atrás' placement="top">
                                    <Button_Blue_Login onClick={() => optionsLogin('Kitchen','')}><IoArrowBackCircle/></Button_Blue_Login>
                                </Tooltip>   
                            </>    
                        ):(
                            <>
                                <Tooltip title='Atrás' placement="top">
                                    <Button_Blue_Login onClick={() => optionsLogin('Administration','')}><IoArrowBackCircle/></Button_Blue_Login>
                                </Tooltip>
                            </>
                        )
                    ):(
                        <></>
                    )}
                    <Whitespace_Login/>
                </Form_Login>        
            </div>
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
        </div>
    );
};