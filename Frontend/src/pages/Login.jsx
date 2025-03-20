import Logo from "../components/imgs/Logo-Vertical-Digital.png"
import { useEffect,useState,useContext } from "react";
import { useNavigate } from "react-router-dom";

import { Toaster } from 'sonner';
import { Tooltip } from "@mui/material";

import { loginContext,toastContext } from '../contexts/VariablesProvider'
import { useOptionsLogin } from "../hooks/OptionsLogin";
import { useLogin } from "../hooks/UserSession";

import { loggedContext } from "../contexts/LoggedProvider";
import { permissionContext } from "../contexts/PermissionProvider";
import { typeUserContext } from "../contexts/TypeUserProvider";

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
import { Alert_Greeting,Toast_Styles } from '../components/styled/Notifications'

import Footer from '../components/footer/Footer';
import Loading from "./Loading";

export default function Login(){
    const [name,setName] = useState('');
    const [password,setPassword] = useState('');

    const {
            loadingOption, isLoadingOption,
            loadingAdministration, isLoadingAdministration,
            loadingKitchen, isLoadingKitchen,
            loadingLogin, isLoadingLogin,
            loadingLoginAdministration, isLoadingLoginAdministration,
            loadingLoginKitchen, isLoadingLoginKitchen
        } = useContext(loginContext);

    const [textName,setTextName] = useState(false);
    const [isFocusedName, setIsFocusedName] = useState(false);
    const [isFocusedNameColor, setIsFocusedNameColor] = useState(false);
    const [textPassword,setTextPassword] = useState(false);
    const [isFocusedPassword, setIsFocusedPassword] = useState(false);
    const [isFocusedPasswordColor, setIsFocusedPasswordColor] = useState(false);

    const [loading,setLoading] = useState(false);

    const navigate = useNavigate();

    const [toast] = useContext(toastContext);

    const [permission,setPermission] = useContext(permissionContext);
    const [isLogged,setIsLogged] = useContext(loggedContext);
    const [typeUser,setTypeUser] = useContext(typeUserContext);

    useEffect(() => {
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

    const { useOptionTypeUsers, useOptionUsers, useBackLogin} = useOptionsLogin({ setName,setPassword});

    const Login = useLogin({ name,password });

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