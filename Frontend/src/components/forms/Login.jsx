//____________IMPORT/EXPORT____________
// Hooks de React
import { useContext,useEffect } from "react";
import { useRef } from "react";
// Contextos
import { ThemeModeContext } from "../../contexts/ViewsProvider";
import { TextFieldsUserContext } from "../../contexts/FormsProvider";
import { AnimationContext,KeyboardContext,KeyboardViewContext,TouchContext,ActionBlockContext } from "../../contexts/VariablesProvider";
import { RefKeyboardContext } from "../../contexts/RefsProvider";
// Estilos personalizados
import { Container_Row_100_Center,Container_Column_90_Center,Container_Row_NG_95_Left } from "../styled/Containers";
import { Text_Span_16_Left_Black,Text_Color_Blue_16 } from "../styled/Text";
import { Input_Text_Black_100 } from "../styled/Inputs";
//____________IMPORT/EXPORT____________

// Formulario para iniciar sesión
export default function Form_Login(){
    // Constantes con el valor de los contextos
    const [themeMode] = useContext(ThemeModeContext);
    const [isTextFieldsUser,setIsTextFieldsUser] = useContext(TextFieldsUserContext);
    const [isAnimation] = useContext(AnimationContext);
    const [isActionBlock] = useContext(ActionBlockContext);
    const [isKeyboard,setIsKeyboard] = useContext(KeyboardContext);
    const [isKeyboardView,setIsKeyboardView] = useContext(KeyboardViewContext);
    const Keyboard = useContext(RefKeyboardContext);
    const [isTouch,setIsTouch] = useContext(TouchContext);
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
                <Text_Color_Blue_16 ThemeMode={themeMode}>MEALSYNC </Text_Color_Blue_16>
                <Text_Span_16_Left_Black ThemeMode={themeMode}>- Ingresar tus datos...</Text_Span_16_Left_Black>
            </Container_Row_NG_95_Left>
            <Container_Column_90_Center className={themeMode ? 'shadow-out-container-light-infinite' : 'shadow-out-container-dark-infinite'}>
                <Container_Row_100_Center>
                    <Text_Span_16_Left_Black ThemeMode={themeMode} className={isAnimation ? 'roll-out-text-left' : 'roll-in-text-left'}>Usuario:</Text_Span_16_Left_Black>
                    <Input_Text_Black_100 ThemeMode={themeMode} className={isAnimation ? 'roll-out-button-left' : 'roll-in-button-left'}
                        placeholder="..."
                        type="text"
                        id="Input-User"
                        value={isTextFieldsUser.usuario}
                        onChange={(e) => setIsTextFieldsUser(prev => ({...prev, usuario: e.target.value}))}
                        onFocus={() => {
                            if(isTouchRef.current){
                                setIsKeyboard(true);
                                setIsKeyboardView('User');
                            }
                        }}
                        disabled={isActionBlock}
                    />
                </Container_Row_100_Center>
                <Container_Row_100_Center>
                    <Text_Span_16_Left_Black ThemeMode={themeMode} className={isAnimation ? 'roll-out-text-left' : 'roll-in-text-left'}>Contraseña:</Text_Span_16_Left_Black>
                    <Input_Text_Black_100 ThemeMode={themeMode} className={isAnimation ? 'roll-out-button-left' : 'roll-in-button-left'}
                        placeholder="..."
                        type="password"
                        id="Input-Password"
                        value={isTextFieldsUser.contrasena}
                        onChange={(e) => setIsTextFieldsUser(prev => ({...prev, contrasena: e.target.value}))}
                        onFocus={() => {
                            if(isTouchRef.current){
                                setIsKeyboard(true);
                                setIsKeyboardView('Password');
                            }
                        }}
                        disabled={isActionBlock}
                    />
                </Container_Row_100_Center>
            </Container_Column_90_Center>
        </>  
    );
}