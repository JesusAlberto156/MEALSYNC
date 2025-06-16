//____________IMPORT/EXPORT____________
// Hooks de React
import { useContext,useRef,useEffect } from "react";
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
import { Container_Column_90_Center,Container_Row_100_Center,Container_Row_NG_95_Left } from "../styled/Containers";
import { Text_A_16_Left,Text_Blue_16_Left } from "../styled/Text";
import { Input_Text_Black_100 } from "../styled/Inputs";
import { Button_Icon_Blue_220 } from "../styled/Buttons";
import { Icon_White_22 } from "../styled/Icons";
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
    // UseEffect que determina la visibilidad del teclado
    useEffect(() => {
        const handleTouchStart = () => {
            lastTouchTimeRef.current = Date.now();
            setIsTouch(true);
        };
    
        const handleMouseOrKey = () => {
            const now = Date.now();
            const timeSinceLastTouch = now - lastTouchTimeRef.current;
    
            // Solo desactiva touch si ha pasado más de 500ms desde el último touch
            if (timeSinceLastTouch > 500) {
                setIsTouch(false);
            }
        };

        window.addEventListener('touchstart', handleTouchStart);
        window.addEventListener('mousedown', handleMouseOrKey);
        window.addEventListener('keydown', handleMouseOrKey);

        return () => {
            window.removeEventListener('touchstart', handleTouchStart);
            window.removeEventListener('mousedown', handleMouseOrKey);
            window.removeEventListener('keydown', handleMouseOrKey);
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
            <Container_Row_NG_95_Left>
                <Text_Blue_16_Left ThemeMode={themeMode}>MEALSYNC</Text_Blue_16_Left>   
                <Text_A_16_Left ThemeMode={themeMode}>- Ingresa los datos de tu sesión...</Text_A_16_Left>
            </Container_Row_NG_95_Left>
            <Container_Column_90_Center className={themeMode ? 'shadow-out-container-light-infinite' : 'shadow-out-container-dark-infinite'}>
                <Container_Row_100_Center>
                    <Text_A_16_Left ThemeMode={themeMode}>Usuario:</Text_A_16_Left>
                    <Input_Text_Black_100 ThemeMode={themeMode}
                        id="Input-User"
                        placeholder="..."
                        type="text"
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
                </Container_Row_100_Center>
                <Container_Row_100_Center>
                    <Text_A_16_Left ThemeMode={themeMode}>Contraseña:</Text_A_16_Left>
                    <Input_Text_Black_100 ThemeMode={themeMode}
                        id="Input-Password"
                        placeholder="..."
                        type="password"
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
                </Container_Row_100_Center>
                <Tooltip title='Verificar' placement="top">
                    <Button_Icon_Blue_220 ThemeMode={themeMode}  className={isVerificationBlock ? 'roll-out-button-left' : 'roll-in-button-left'} 
                    onClick={() => {
                        handleVerificationBlock();
                    }}>
                        <Icon_White_22><FaUserCheck/></Icon_White_22>
                    </Button_Icon_Blue_220>
                </Tooltip>
            </Container_Column_90_Center>
        </>  
    );
}