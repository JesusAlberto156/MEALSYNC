import Logo from "../components/imgs/Logo digital.png"

import { useEffect,useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import { RiAccountCircleFill } from "react-icons/ri";
import { ImSpinner9 } from "react-icons/im";
import { Tooltip } from "@mui/material";

import { Form,Title,Input,Label,Input_Group,Label_Popup,Button,Whitespace,Link,Spinner_Link } from '../components/styled/Forms'
import { Alerta_Azul } from '../components/styled/Notifications'

import Footer from '../components/footer/Footer';

export default function CreateAccounts () {

    const [textEmail,setTextEmail] = useState(false);
    const [isFocusedEmail, setIsFocusedEmail] = useState(false);
    const [isFocusedEmailColor, setIsFocusedEmailColor] = useState(false);
    const [textPassword,setTextPassword] = useState(false);
    const [isFocusedPassword, setIsFocusedPassword] = useState(false);
    const [isFocusedPasswordColor, setIsFocusedPasswordColor] = useState(false);

    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');

    useEffect(() => {
        document.title = "SXW - CREAR CUENTA"
        
        Alerta_Azul("¡Bienvenido(a) a Sonido Xaviers Web!");
        Alerta_Azul("¡Crea tu cuenta para acceder a la pagina principal!");
    },[]);

    const navigate = useNavigate();
    const [loadingLogin, setLoadingLogin] = useState(false);

    const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

    const Login = async () => {
        setLoadingLogin(true);
        document.title = "Cargando...";
        await delay(1000);
        navigate("/Login",{replace: true});
        document.title = "SXW - INICIAR SESIÓN";
        setLoadingLogin(false);
    };

    return(
        <div className="app-container">
            <div className="background-create-accounts">
                <ToastContainer
                    position="top-right"
                    autoClose={5000}
                    closeOnClick
                    pauseOnHover
                    dragga
                    limit={5}
                />
                <Form>
                    <img src={Logo} alt="Logo de SXW" className="logo-form-1"/>
                    <Title>CREA TU CUENTA</Title>
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
                    <Whitespace/>
                    <Tooltip title='Crear cuenta' placement="top">
                        <Button><RiAccountCircleFill/></Button>
                    </Tooltip>
                    {loadingLogin ? (
                        <Spinner_Link><ImSpinner9/></Spinner_Link>
                    ) : (
                        <Link onClick={Login}>Iniciar sesión</Link>
                    )}
                    <Whitespace/>
                </Form>        
            </div>
            <Footer/>
        </div>
    );
};