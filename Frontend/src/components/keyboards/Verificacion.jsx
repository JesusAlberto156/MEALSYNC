//____________IMPORT/EXPORT____________
// Hooks de React
import { useContext } from "react";
// Contextos
import { KeyboardContext,KeyboardViewContext } from "../../contexts/VariablesProvider";
import { TextFieldsUserContext } from "../../contexts/FormsProvider";
// Hooks personalizados 
import { HandleKeyboard } from "../../hooks/Views";
// Componentes perzonalizados
import Keyboard_Default from "./Defaullt";
//____________IMPORT/EXPORT____________

export const Keyboard_Verification = () => {
    // Constantes con el valor de los contextos
    const [isTextFieldsUser] = useContext(TextFieldsUserContext);
    const [isKeyboard] = useContext(KeyboardContext);
    const [isKeyboardView] = useContext(KeyboardViewContext);
    // Constantes con la funcionalidad de los hooks
    const { handleKeyboard } = HandleKeyboard();
    // Estructura del componente
    return (
        <>
            {isKeyboard ? (
                <>
                    <Keyboard_Default 
                        value={isKeyboardView === 'Usuario' ? isTextFieldsUser.usuario :
                               isKeyboardView === 'Contraseña' ? isTextFieldsUser.contrasena : null} 
                        onChange={handleKeyboard}
                    />  
                </>
            ):(
                <></>
            )}
        </>
    );
};