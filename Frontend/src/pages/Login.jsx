import Logo from "../components/imgs/Logo vertical digital.png"

import { useEffect,useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import { FaUserShield } from "react-icons/fa6";
import { PiChefHat } from "react-icons/pi";
import { ImSpinner9 } from "react-icons/im";
import { Tooltip } from "@mui/material";

import { Form,Title,Input,Label,Input_Group,Label_Popup,ButtonBlue,Whitespace,Link,Spinner_Link } from '../components/styled/Forms'
import { Alerta_Azul } from '../components/styled/Notifications'

import Footer from '../components/footer/Footer';

export default function Login(){

    const [loadingAdministration,isLoadingAdministration] = useState(false);
    const [loadingFormAdministration,isloadingFormAdministration] = useState(false);


    const [loadingKitchen,isLoadingKitchen] = useState(false);

    const [textEmail,setTextEmail] = useState(false);
    const [isFocusedEmail, setIsFocusedEmail] = useState(false);
    const [isFocusedEmailColor, setIsFocusedEmailColor] = useState(false);
    const [textPassword,setTextPassword] = useState(false);
    const [isFocusedPassword, setIsFocusedPassword] = useState(false);
    const [isFocusedPasswordColor, setIsFocusedPasswordColor] = useState(false);

    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    
    useEffect(() => {
        document.title = "MEALSYNC_Iniciar_Sesión"
    
        Alerta_Azul("¡Bienvenido(a) a MEALSYNC!");
        Alerta_Azul("¡Inicia sesión para acceder a la pagina principal!");
    },[]);

    const navigate = useNavigate();
    const [loadingCreateAccounts, setLoadingCreateAccounts] = useState(false);

    const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

    const Administration = async () => {
        isLoadingAdministration(true);
        await delay(2000);
        isloadingFormAdministration(true);
    }

    const CreateAccounts = async () => {
        setLoadingCreateAccounts(true);
        document.title = "Cargando...";
        await delay(1000);
        navigate("/CreateAccounts",{replace: true});
        document.title = "SXW - CREAR CUENTA";
        setLoadingCreateAccounts(false);
    };

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
                    {loadingAdministration ? (
                        loadingFormAdministration ? (
                            <>
                            <Input_Group>
                        <Label 
                            isLabelUp={isFocusedEmail}
                            isFocused={isFocusedEmailColor}
                        >
                            E-mail
                        </Label>
                        <Input
                            value={email}
                            onClick={(e) => {
                                setTextEmail(true);
                                setIsFocusedEmailColor(true);
                                setIsFocusedEmail(true);
                            }}
                            onBlur={(e) => {
                                setTextEmail(false);
                                setIsFocusedEmailColor(false);
                                if (e.target.value === ''){
                                    setIsFocusedEmail(false);
                                }else{
                                    setIsFocusedEmail(true);
                                }
                            }}   
                            onChange={(e) => setEmail(e.target.value)} 
                        />
                        {textEmail && (
                            <Label_Popup>Escribe tú E-mail</Label_Popup>
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
                          
                        </>
                        ) : (
                            <Spinner_Link><ImSpinner9/></Spinner_Link>
                        )
                    ):(
                        <>
                            <Tooltip title='Administración' placement="top">
                                <ButtonBlue onClick={Administration}><FaUserShield/></ButtonBlue>
                            </Tooltip>
                            <Tooltip title='Cocina' placement="top">
                                <ButtonBlue><PiChefHat/></ButtonBlue>
                            </Tooltip>
                        </>
                    )}
                    {loadingCreateAccounts ? (
                        <Spinner_Link><ImSpinner9/></Spinner_Link>
                    ) : (
                        <Link onClick={CreateAccounts}>Crear cuenta</Link>
                    )}
                    <Whitespace/>
                </Form>        
            </div>
            <Footer/>
        </div>
    );
};