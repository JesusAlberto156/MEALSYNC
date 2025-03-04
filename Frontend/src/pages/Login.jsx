import Logo from "../components/imgs/Logo-Vertical-Digital.png"

import { useEffect,useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import { FaUserShield } from "react-icons/fa6";
import { MdSoupKitchen } from "react-icons/md";

import { FaUserSecret } from "react-icons/fa";
import { FaWarehouse } from "react-icons/fa6";
import { LuChefHat } from "react-icons/lu";

import { GiChefToque } from "react-icons/gi";
import { IoNutrition } from "react-icons/io5";
import { FaUserMd } from "react-icons/fa";

import { IoArrowBackCircle } from "react-icons/io5";
import { ImSpinner9 } from "react-icons/im";
import { Tooltip } from "@mui/material";
import { MdLogin } from "react-icons/md";

import { Form,Input,Label,Input_Group,Label_Popup,Button_Blue,Button_Green,Button_Block,Whitespace,Spinner_Blue, Title_Fade } from '../components/styled/Forms'
import { Alert_Blue} from '../components/styled/Notifications'

import Footer from '../components/footer/Footer';
import { io } from "socket.io-client";

const socket = io('http://localhost:3500/');

export default function Login(){

    const [loading, isLoading] = useState(false);
    const [loadingOption,isLoadingOption] = useState(false);
    const [loadingAdministration,isLoadingAdministration] = useState(false);
    const [loadingKitchen,isLoadingKitchen] = useState(false);

    const [user,setUser] = useState('');
    const [loadingLogin,isLoadingLogin] = useState(false);
    const [loadingLoginAdministration,isLoadingLoginAdministration] = useState(false);
    const [loadingLoginKitchen,isLoadingLoginKitchen] = useState(false);

    const [textName,setTextName] = useState(false);
    const [isFocusedName, setIsFocusedName] = useState(false);
    const [isFocusedNameColor, setIsFocusedNameColor] = useState(false);
    const [textPassword,setTextPassword] = useState(false);
    const [isFocusedPassword, setIsFocusedPassword] = useState(false);
    const [isFocusedPasswordColor, setIsFocusedPasswordColor] = useState(false);

    const [name,setName] = useState('');
    const [password,setPassword] = useState('');

    const [users, setUsers] = useState([]);
    const [permissions, setPermissions] = useState([]);

    useEffect(() => {
        socket.on("connect", () => {
            console.log("Conectado al servidor de socket.io");
        });
        
        socket.on("users", (data) => {
            console.log("Usuarios recibidos:", data);
            setUsers(data);
        });

        return () => {
            socket.off("users");
        };
    }, []);
    

    useEffect(() => {
        document.title = "MEALSYNC_Iniciar_Sesión"
    
        Alert_Blue("¡Bienvenido(a) a MEALSYNC!");
        Alert_Blue("¡Inicia sesión para acceder a la pagina principal!");
    },[]);

    const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));
    
    const navigate = useNavigate();

    const Administration = async () => {
        isLoadingOption(true);
        isLoading(true);
        await delay(1000);
        isLoadingAdministration(true);
        isLoading(false);
    }
    const UserAdministrator = async () => {
        setUser('Administrador');
        isLoading(true);
        console.log(users);
        isLoadingAdministration(false);
        await delay(1000);
        isLoadingLogin(true);
        isLoadingLoginAdministration(true);
        isLoading(false);
    }
    const UserWareHouse = async () => {
        setUser('Almacen');
        isLoading(true);
        isLoadingAdministration(false);
        await delay(1000);
        isLoadingLogin(true);
        isLoadingLoginAdministration(true);
        isLoading(false);
    }
    const UserChefMaster = async () => {
        setUser('Chef');
        isLoading(true);
        isLoadingAdministration(false);
        await delay(1000);
        isLoadingLogin(true);
        isLoadingLoginAdministration(true);
        isLoading(false);
    }
    const BackAdministration = async () => {
        setUser('');
        isLoading(true);
        isLoadingLogin(false);
        isLoadingLoginAdministration(false);
        await delay(1000);
        isLoadingAdministration(true);
        isLoading(false);
    }

    const Kitchen = async () => {
        isLoadingOption(true);
        isLoading(true);
        await delay(1000);
        isLoadingKitchen(true);
        isLoading(false);
    }
    const UserChef = async () => {
        setUser('Cocinero');
        isLoading(true);
        isLoadingKitchen(false);
        await delay(1000);
        isLoadingLogin(true);
        isLoadingLoginKitchen(true);
        isLoading(false);
    }
    const UserNutritionist = async () => {
        setUser('Nutriologo');
        isLoading(true);
        isLoadingKitchen(false);
        await delay(1000);
        isLoadingLogin(true);
        isLoadingLoginKitchen(true);
        isLoading(false);
    }
    const UserDoctor = async () => {
        setUser('Medico');
        isLoading(true);
        isLoadingKitchen(false);
        await delay(1000);
        isLoadingLogin(true);
        isLoadingLoginKitchen(true);
        isLoading(false);
    }
    const BackKitchen = async () => {
        setUser('');
        isLoading(true);
        isLoadingLogin(false);
        isLoadingLoginKitchen(false);
        await delay(1000);
        isLoadingKitchen(true);
        isLoading(false);

    }

    const Back = async () => {
        isLoadingAdministration(false);
        isLoadingKitchen(false);
        isLoading(true);
        await delay(1000);
        isLoadingOption(false);
        isLoading(false);
    }

    const Login = async () => {
        document.title = "Cargando...";
        if(user === 'Cocinero' || user === 'Nutriologo' || user === 'Medico'){
            isLoadingLogin(false);
            isLoadingLoginAdministration(false);
            isLoadingLoginKitchen(false);
            isLoading(true);
            await delay(1000);
            
            navigate("/Menu",{replace: true,state: {user}});
        }
    }

    return(
        <div className="app-container">
            <div className="background-login">
                <ToastContainer
                    position="top-right"
                    autoClose={5000}
                    closeOnClick
                    pauseOnHover
                    dragga
                    limit={5}
                />
                <Form>
                    <img src={Logo} alt="Logo de Hospital Puerta de Hierro" className="logo-form-1"/>
                    <Title_Fade>Bienvenido(a)</Title_Fade>
                    {loading ? (
                        <Spinner_Blue><ImSpinner9/></Spinner_Blue>
                    ):(
                        <></>
                    )}
                    {loadingOption ? (
                        <></>
                    ):(
                        <>
                            <Tooltip title='Administración' placement="top">
                                <Button_Blue onClick={Administration}><FaUserShield/></Button_Blue>
                            </Tooltip>
                            <Tooltip title='Cocina' placement="top">
                                <Button_Blue onClick={Kitchen}><MdSoupKitchen/></Button_Blue>
                            </Tooltip>
                        </>
                    )}
                    {loadingAdministration ? (
                        <>
                            <Tooltip title='Administrador' placement="top">
                                <Button_Blue onClick={UserAdministrator}><FaUserSecret/></Button_Blue>
                            </Tooltip>
                            <Tooltip title='Chef' placement="top">
                                <Button_Blue onClick={UserChefMaster}><GiChefToque/></Button_Blue>
                            </Tooltip>
                            <Tooltip title='Almacén' placement="top">
                                <Button_Blue onClick={UserWareHouse}><FaWarehouse/></Button_Blue>
                            </Tooltip>
                            <Tooltip title='Atrás' placement="top">
                                <Button_Blue onClick={Back}><IoArrowBackCircle/></Button_Blue>
                            </Tooltip>
                        </>
                    ):(
                        <></>
                    )}
                    {loadingKitchen ? (
                        <>
                            <Tooltip title='Cocinero' placement="top">
                                <Button_Blue onClick={UserChef}><LuChefHat/></Button_Blue>
                            </Tooltip>
                            <Tooltip title='Nutriólogo' placement="top">
                                <Button_Block onClick={UserNutritionist}><IoNutrition/></Button_Block>
                            </Tooltip>
                            <Tooltip title='Médico' placement="top">
                                <Button_Blue onClick={UserDoctor}><FaUserMd/></Button_Blue>
                            </Tooltip>
                            <Tooltip title='Atrás' placement="top">
                                <Button_Blue onClick={Back}><IoArrowBackCircle/></Button_Blue>
                            </Tooltip>
                        </>
                    ):(
                        <></>
                    )}
                    {loadingLogin ? (
                        <>
                            <Input_Group>
                                <Label 
                                    isLabelUp={isFocusedName}
                                    isFocused={isFocusedNameColor}
                                >
                                    Nombre de usuario
                                </Label>
                                <Input
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
                                    <Label_Popup>Escribe tú nombre de usuario</Label_Popup>
                                )}
                            </Input_Group>
                            <Input_Group>
                                <Label 
                                    isLabelUp={isFocusedPassword}
                                    isFocused={isFocusedPasswordColor}
                                >
                                    Contraseña
                                </Label>
                                <Input
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
                                />
                                {textPassword && (
                                    <Label_Popup>Escribe tú Contraseña</Label_Popup>
                                )}
                            </Input_Group>
                            <Tooltip title='Iniciar sesión' placement="top">
                                <Button_Green onClick={Login}><MdLogin/></Button_Green>
                            </Tooltip>
                        </>
                    ):(
                        <></>
                    )}
                    {loadingLoginAdministration ? (
                        <Tooltip title='Atrás' placement="top">
                            <Button_Blue onClick={BackAdministration}><IoArrowBackCircle/></Button_Blue>
                        </Tooltip>
                    ):(
                        <></>
                    )}
                    {loadingLoginKitchen ? (
                        <Tooltip title='Atrás' placement="top">
                            <Button_Blue onClick={BackKitchen}><IoArrowBackCircle/></Button_Blue>
                        </Tooltip>
                    ):(
                        <></>
                    )}
                    <Whitespace/>
                </Form>        
            </div>
            <Footer/>
        </div>
    );
};