//____________IMPORT/EXPORT____________
// Hooks de React
import { useContext,useRef,useEffect,useState } from "react";
// Componentes de React externos
import { Tooltip } from "@mui/material";
// Contextos
import { ThemeModeContext } from "../../contexts/ViewsProvider";
import { TextFieldsUserContext } from "../../contexts/FormsProvider";
import { VerificationBlockContext,KeyboardContext,KeyboardViewContext,TouchContext } from "../../contexts/VariablesProvider";
import { RefKeyboardContext } from "../../contexts/RefsProvider";
// Hooks personalizados
import { HandleVerificationBlock } from "../../hooks/Forms";
//__________ICONOS__________
// Iconos del boton de comprobar
import { FaUserCheck } from "react-icons/fa6";
//__________ICONOS__________
// Estilos personalizados
import { Container_Column_90_Center,Container_Row_100_Center,Container_Row_NG_95_Center } from "../styled/Containers";
import { Text_A_16_Left,Text_Blue_16_Left } from "../styled/Text";
import { Input_Group, Input_Text_Black_100 } from "../styled/Inputs";
import { Button_Icon_Blue_220 } from "../styled/Buttons";
import { Icon_White_22 } from "../styled/Icons";
import { Label_Total_Text_12_Center } from "../styled/Labels";
import { Alert_Warning_Sonner } from "../styled/Alerts";
//____________IMPORT/EXPORT____________

// Formulario para iniciar sesión
export default function Form_Verification(){
    // Constantes con el valor de los contextos
    const [themeMode] = useContext(ThemeModeContext);
    const [isTextFieldsUser,setIsTextFieldsUser] = useContext(TextFieldsUserContext);
    const [isVerificationBlock] = useContext(VerificationBlockContext);
    const [isKeyboard,setIsKeyboard] = useContext(KeyboardContext);
    const [isKeyboardView,setIsKeyboardView] = useContext(KeyboardViewContext);
    const Keyboard = useContext(RefKeyboardContext);
    const [isTouch,setIsTouch] = useContext(TouchContext);
    // Constantes con la funcionalidad de los hooks
    const handleVerificationBlock = HandleVerificationBlock();
    // Constantes con el valor de useRef
    const lastTouchTimeRef = useRef(0);
    const isTouchRef = useRef(isTouch);
    // Constantes con el valor de useState
    const [isTotalUser,setIsTotalUser] = useState(0);
    const [isTotalPassword,setIsTotalPassword] = useState(0);
    // useEffect para calcular el total escrito en los campos
    useEffect(() => {
        setIsTotalUser(isTextFieldsUser.usuario.length)
        if(isTextFieldsUser.usuario.length === 25){
            Alert_Warning_Sonner('¡MEALSYNC ha alcanzado el límite de caracteres permitido en el usuario!...')
        }
    },[isTextFieldsUser.usuario]);
    useEffect(() => {
        setIsTotalPassword(isTextFieldsUser.contrasena.length);
        if(isTextFieldsUser.contrasena.length === 15){
            Alert_Warning_Sonner('¡MEALSYNC ha alcanzado el límite de caracteres permitido en la contraseña!...')
        }
    },[isTextFieldsUser.contrasena]);
    // UseEffect que determina la visibilidad del teclado
    useEffect(() => {
        const handleTouchStart = () => {
            lastTouchTimeRef.current = Date.now();
            setIsTouch(true);
        };

        const handleMouseDown = () => {
            const now = Date.now();
            const timeSinceLastTouch = now - lastTouchTimeRef.current;

            // Solo si no hubo un touch reciente, considera que es mouse
            if (timeSinceLastTouch > 500) {
                setIsTouch(false);
            }
        };

        window.addEventListener('touchstart', handleTouchStart);
        window.addEventListener('mousedown', handleMouseDown);

        return () => {
            window.removeEventListener('touchstart', handleTouchStart);
            window.removeEventListener('mousedown', handleMouseDown);
        };
    },[]);
    // UseEffect que determina que se mantenga visible del teclado
    useEffect(() => {
        const handleClickOutside = (event) => {
            setTimeout(() => {
                const inputUser = document.getElementById("Input-User");
                const inputPassword = document.getElementById("Input-Password");
                const keyboard = Keyboard.current && Keyboard.current.contains(event.target);
    
                const clickInsideInputs = 
                    (inputUser && inputUser.contains(event.target)) ||
                    (inputPassword && inputPassword.contains(event.target));
    
                if (!clickInsideInputs && !keyboard) {
                    setIsKeyboardView('');
                    setTimeout(() => {
                        setIsKeyboard(false);
                    }, 500);
                }
            }, 0);
        };
    
        document.addEventListener("mousedown", handleClickOutside);
        document.addEventListener("touchstart", handleClickOutside);
    
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
            document.removeEventListener("touchstart", handleClickOutside);
        };
    }, [Keyboard]);
    // useEffect para mantener el touch actualizado
    useEffect(() => {
        isTouchRef.current = isTouch;
    }, [isTouch]);
    // Estructura del componente
    return(
        <> 
            <Container_Row_NG_95_Center>
                <Text_Blue_16_Left ThemeMode={themeMode}>MEALSYNC</Text_Blue_16_Left>   
                <Text_A_16_Left ThemeMode={themeMode}>- Datos de sesión...</Text_A_16_Left>
            </Container_Row_NG_95_Center>
            <Container_Column_90_Center className={themeMode ? 'shadow-out-container-light-infinite' : 'shadow-out-container-dark-infinite'}>
                <Container_Row_100_Center>
                    <Text_A_16_Left ThemeMode={themeMode}>Usuario:</Text_A_16_Left>
                    <Input_Group>
                        <Input_Text_Black_100 ThemeMode={themeMode}
                            id="Input-User"
                            placeholder="..."
                            type="text"
                            maxLength={25}
                            value={isTextFieldsUser.usuario}
                            onChange={(e) => setIsTextFieldsUser(prev => ({...prev, usuario: e.target.value}))}
                            disabled={isVerificationBlock}
                            onFocus={() => {
                                if(isTouchRef.current){
                                    setIsKeyboard(true);
                                    setIsKeyboardView('User');
                                }
                            }}
                        />
                        <Label_Total_Text_12_Center ThemeMode={themeMode}>{isTotalUser}/25</Label_Total_Text_12_Center>
                    </Input_Group>
                </Container_Row_100_Center>
                <Container_Row_100_Center>
                    <Text_A_16_Left ThemeMode={themeMode}>Contraseña:</Text_A_16_Left>
                    <Input_Group>
                        <Input_Text_Black_100 ThemeMode={themeMode}
                            id="Input-Password"
                            placeholder="..."
                            type="password"
                            maxLength={15}
                            value={isTextFieldsUser.contrasena}
                            onChange={(e) => setIsTextFieldsUser(prev => ({...prev, contrasena: e.target.value}))}
                            disabled={isVerificationBlock}
                            onFocus={() => {
                                if(isTouchRef.current){
                                    setIsKeyboard(true);
                                    setIsKeyboardView('Password');
                                }
                            }}
                        />
                        <Label_Total_Text_12_Center ThemeMode={themeMode}>{isTotalPassword}/15</Label_Total_Text_12_Center>
                    </Input_Group>
                </Container_Row_100_Center>
                <Tooltip title='Verificar' placement="top">
                    <span>
                        <Button_Icon_Blue_220 ThemeMode={themeMode}  className='pulsate-buttom' 
                            disabled={isVerificationBlock}
                            onClick={() => {
                                handleVerificationBlock();
                            }}
                        >
                            <Icon_White_22><FaUserCheck/></Icon_White_22>
                        </Button_Icon_Blue_220>
                    </span>
                </Tooltip>
            </Container_Column_90_Center>
        </>  
    );
}