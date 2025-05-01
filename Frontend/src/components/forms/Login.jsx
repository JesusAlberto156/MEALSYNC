//____________IMPORT/EXPORT____________
// Hooks de React
import { useContext,useEffect } from "react";
// Contextos
import { ThemeModeContext } from "../../contexts/ViewsProvider";
import { TextFieldsContext } from "../../contexts/FormsProvider";
import { AnimationContext,KeyboardContext,KeyboardViewContext } from "../../contexts/VariablesProvider";
import { RefKeyboardContext } from "../../contexts/RefsProvider";
// Estilos personalizados
import { Container_Row_100_Center,Container_Row_90_Left } from "../styled/Containers";
import { Text_P_16_Left,Text_A_16_Left } from "../styled/Text";
import { Input_Text_Black_100 } from "../styled/Inputs";
//____________IMPORT/EXPORT____________

// Formulario para iniciar sesión
export default function Form_Login(){
    // Constantes con el valor de los contextos
    const [themeMode] = useContext(ThemeModeContext);
    const [isTextFields,setIsTextFields] = useContext(TextFieldsContext);
    const [isAnimation] = useContext(AnimationContext);
    const [isKeyboard,setIsKeyboard] = useContext(KeyboardContext);
    const [isKeyboardView,setIsKeyboardView] = useContext(KeyboardViewContext);
    const Keyboard = useContext(RefKeyboardContext);
    // UseEffect que determina la visibilidad del teclado
    useEffect(() => {
        const handleClickOutside = (event) => {
            setTimeout(() => {
                const inputUser = document.getElementById("Input-User");
                const inputPassword = document.getElementById("Input-Password");
                const keyboard = Keyboard.current && Keyboard.current.contains(event.target);

                if (inputUser && !inputUser.contains(event.target) &&
                    inputPassword && !inputPassword.contains(event.target) &&
                    !keyboard) {
                    setIsKeyboardView('');
                    setTimeout(() => {
                        setIsKeyboard(false);
                    },500)
                }
            },0);
        };
    
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [Keyboard]);
    // Estructura del componente
    return(
        <> 
            <Container_Row_90_Left>
                <Text_P_16_Left ThemeMode={themeMode} className={isAnimation ? 'roll-out-text-left' : 'roll-in-text-left'}>Ingresar tus datos...</Text_P_16_Left>
            </Container_Row_90_Left>
            <Container_Row_100_Center>
                <Text_A_16_Left ThemeMode={themeMode} className={isAnimation ? 'roll-out-text-left' : 'roll-in-text-left'}>Usuario:</Text_A_16_Left>
                <Input_Text_Black_100 ThemeMode={themeMode} className={isAnimation ? 'roll-out-button-left' : 'roll-in-button-left'}
                    placeholder="Nombre de usuario..."
                    type="text"
                    id="Input-User"
                    value={isTextFields.user}
                    onChange={(e) => setIsTextFields(prev => ({...prev, user: e.target.value}))}
                    onFocus={() => {
                        setIsKeyboard(true);
                        setIsKeyboardView('User');
                    }}
                />
            </Container_Row_100_Center>
            <Container_Row_100_Center>
                <Text_A_16_Left ThemeMode={themeMode} className={isAnimation ? 'roll-out-text-left' : 'roll-in-text-left'}>Contraseña:</Text_A_16_Left>
                <Input_Text_Black_100 ThemeMode={themeMode} className={isAnimation ? 'roll-out-button-left' : 'roll-in-button-left'}
                    placeholder="Contraseña de usuario..."
                    type="password"
                    id="Input-Password"
                    value={isTextFields.password}
                    onChange={(e) => setIsTextFields(prev => ({...prev, password: e.target.value}))}
                    onFocus={() => {
                        setIsKeyboard(true);
                        setIsKeyboardView('Password');
                    }}
                />
            </Container_Row_100_Center>

        </>  
    );
}