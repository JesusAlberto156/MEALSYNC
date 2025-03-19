import Logo from "../components/imgs/Logo-Vertical-Digital.png"
import { useEffect,useState,useContext } from "react";
import { useNavigate } from "react-router-dom";
import { optionsContext } from '../contexts/OptionsProvider'
import { nameLoginContext } from '../contexts/NameLoginProvider'
import { passwordLoginContext } from '../contexts/PasswordLoginProvider'
import { toastContext } from '../contexts/ToastProvider';
import { loggedContext } from "../contexts/LoggedProvider";
import { permissionContext } from "../contexts/PermissionProvider";
import { typeUserContext } from "../contexts/TypeUserProvider";
import { userContext } from "../contexts/UserProvider";
import { statusUserContext } from "../contexts/StatusUserProvider";

import { Toaster } from 'sonner';
import { useLoginOptions } from "../hooks/Options";
import { useLogin } from "../hooks/UserSession";

import { FaUserShield } from "react-icons/fa6";
import { MdSoupKitchen } from "react-icons/md";

import { FaUserSecret } from "react-icons/fa";
import { FaWarehouse } from "react-icons/fa6";
import { LuChefHat } from "react-icons/lu";

import { GiChefToque } from "react-icons/gi";
import { IoNutrition } from "react-icons/io5";
import { FaUserMd } from "react-icons/fa";

import { IoArrowBackCircle } from "react-icons/io5";
import { Tooltip } from "@mui/material";
import { MdLogin } from "react-icons/md";

import { Title_Fade_Login } from "../components/styled/Text";
import { Form_Login } from '../components/styled/Forms'
import { Input_Group_Login,Input_Login } from "../components/styled/Inputs";
import { Button_Blue_Login,Button_Green_Login,Button_Block_Login } from "../components/styled/Buttons";
import { Label_Login,Label_Popup_Login } from "../components/styled/Labels";
import { Whitespace_Login } from "../components/styled/Whitespaces";
import { Alert_Greeting,Toast_Styles } from '../components/styled/Notifications'

import Footer from '../components/footer/Footer';
import { Loading } from "./Loading";

import { decryptData } from "../services/Crypto";

export default function Login(){
    const [name,setName] = useContext(nameLoginContext);
    const [password,setPassword] = useContext(passwordLoginContext);
    const {
            loadingOption, isLoadingOption,
            loadingAdministration, isLoadingAdministration,
            loadingKitchen, isLoadingKitchen,
            loadingLogin, isLoadingLogin,
            loadingLoginAdministration, isLoadingLoginAdministration,
            loadingLoginKitchen, isLoadingLoginKitchen
        } = useContext(optionsContext);

    const [textName,setTextName] = useState(false);
    const [isFocusedName, setIsFocusedName] = useState(false);
    const [isFocusedNameColor, setIsFocusedNameColor] = useState(false);
    const [textPassword,setTextPassword] = useState(false);
    const [isFocusedPassword, setIsFocusedPassword] = useState(false);
    const [isFocusedPasswordColor, setIsFocusedPasswordColor] = useState(false);

    const [toast] = useContext(toastContext);

    const [user,setUser] = useContext(userContext);
    const [permission,setPermission] = useContext(permissionContext);
    const [isLogged,setIsLogged] = useContext(loggedContext);
    const [typeUser,setTypeUser] = useContext(typeUserContext);
    const [statusUser,setStatusUser] = useContext(statusUserContext);

    const navigate = useNavigate();

    const [loading,setLoading] = useState(false);

    useEffect(() => {
        const user = sessionStorage.getItem('User');
        const permissions = sessionStorage.getItem('Permission');
        const type = sessionStorage.getItem('Type');
        const status = sessionStorage.getItem('StatusUser');

        if(user && permissions && type && status){
            try{
                const decryptedUser = decryptData(user);
                const decryptedPermission = decryptData(permissions);
                const decryptedType = decryptData(type);
                const decryptedStatus = decryptData(status);

                if(decryptedUser && decryptedPermission && decryptedType && decryptedStatus){
                    setUser(JSON.parse(decryptedUser));
                    setPermission(JSON.parse(decryptedPermission));
                    setStatusUser(JSON.parse(decryptedStatus));
                    setTypeUser(decryptedType);
                    console.log('Credenciales cargadas correctamente.');
                }else{
                    console.log('Error al desencriptar datos almacenados.');
                }
            } catch (error) {
                console.error('Error procesando datos de sessionStorage:',error);
            }
        }
        setTimeout(() => {
            setLoading(true);
        },500);
    },[]);

    useEffect(() => {
        if(isLogged){
            if (permission.administrador && typeUser === "Administrador") navigate("/Administrator");
            if (permission.chef && typeUser === "Chef") navigate("/Administrator");
            if (permission.almacen && typeUser === "Almacen") navigate("/Administrator");
            if (permission.cocinero && typeUser === "Cocinero") navigate("/Menu");
            if (permission.nutriologo && typeUser === "Nutriologo") navigate("/Menu");
            if (permission.medico && typeUser === "Medico") navigate("/Menu");
        }
    },[isLogged,permission,typeUser,navigate])

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
    },[loading]);


    const { useOptionTypeUsers, useOptionUsers, useBackLogin} = useLoginOptions();
    const Login = useLogin();

    if(!loading) return <Loading/>

    return(
        <div className="app-container">
            <div className="background-login">
                <Form_Login>
                    <img src={Logo} alt="Logo de Hospital Puerta de Hierro" className="logo-form-1"/>
                    <Title_Fade_Login>Bienvenido(a)</Title_Fade_Login>
                    {loadingOption ? (
                        <>
                            <Tooltip title='Administración' placement="top">
                                <Button_Blue_Login onClick={() => useOptionTypeUsers('Administracion')}><FaUserShield/></Button_Blue_Login>
                            </Tooltip>
                            <Tooltip title='Cocina' placement="top">
                                <Button_Blue_Login onClick={() => useOptionTypeUsers('Cocina')}><MdSoupKitchen/></Button_Blue_Login>
                            </Tooltip>
                        </>
                    ):(
                        <></>
                    )}
                    {loadingAdministration ? (
                        <>
                            <Tooltip title='Administrador' placement="top">
                                <Button_Blue_Login onClick={() => useOptionUsers('Administracion','Administrador')}><FaUserSecret/></Button_Blue_Login>
                            </Tooltip>
                            <Tooltip title='Chef' placement="top">
                                <Button_Blue_Login onClick={() => useOptionUsers('Administracion','Chef')}><GiChefToque/></Button_Blue_Login>
                            </Tooltip>
                            <Tooltip title='Almacén' placement="top">
                                <Button_Blue_Login onClick={() => useOptionUsers('Administracion','Almacen')}><FaWarehouse/></Button_Blue_Login>
                            </Tooltip>
                            <Tooltip title='Atrás' placement="top">
                                <Button_Blue_Login onClick={() => useOptionTypeUsers('Administracion')}><IoArrowBackCircle/></Button_Blue_Login>
                            </Tooltip>
                        </>
                    ):(
                        <></>
                    )}
                    {loadingKitchen ? (
                        <>
                            <Tooltip title='Cocinero' placement="top">
                                <Button_Blue_Login onClick={() => useOptionUsers('Cocina','Cocinero')}><LuChefHat/></Button_Blue_Login>
                            </Tooltip>
                            <Tooltip title='Nutriólogo' placement="top">
                                <Button_Block_Login onClick={() => useOptionUsers('Cocina','Nutriologo')}><IoNutrition/></Button_Block_Login>
                            </Tooltip>
                            <Tooltip title='Médico' placement="top">
                                <Button_Blue_Login onClick={() => useOptionUsers('Cocina','Medico')}><FaUserMd/></Button_Blue_Login>
                            </Tooltip>
                            <Tooltip title='Atrás' placement="top">
                                <Button_Blue_Login onClick={() => useOptionTypeUsers('Cocina')}><IoArrowBackCircle/></Button_Blue_Login>
                            </Tooltip>
                        </>
                    ):(
                        <></>
                    )}
                    {loadingLogin ? (
                        <>
                            <Input_Group_Login>
                                <Label_Login
                                    isLabelUp={isFocusedName}
                                    isFocused={isFocusedNameColor}
                                >
                                    Nombre de usuario
                                </Label_Login>
                                <Input_Login
                                    value={name}
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
                                    onChange={(e) => setName(e.target.value)} 
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
                                    value={password}
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
                                    onChange={(e) => setPassword(e.target.value)} 
                                    type="password"
                                />
                                {textPassword && (
                                    <Label_Popup_Login>Escribe tú Contraseña</Label_Popup_Login>
                                )}
                            </Input_Group_Login>
                            <Tooltip title='Iniciar sesión' placement="top">
                                <Button_Green_Login onClick={Login}><MdLogin/></Button_Green_Login>
                            </Tooltip>
                        </>
                    ):(
                        <></>
                    )}
                    {loadingLoginAdministration ? (
                        <Tooltip title='Atrás' placement="top">
                            <Button_Blue_Login onClick={() => useBackLogin('Administracion')}><IoArrowBackCircle/></Button_Blue_Login>
                        </Tooltip>
                    ):(
                        <></>
                    )}
                    {loadingLoginKitchen ? (
                        <Tooltip title='Atrás' placement="top">
                            <Button_Blue_Login onClick={() => useBackLogin('Cocina')}><IoArrowBackCircle/></Button_Blue_Login>
                        </Tooltip>
                    ):(
                        <></>
                    )}
                    <Whitespace_Login/>
                </Form_Login>        
            </div>
            <Footer/>
            {toast ? (
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