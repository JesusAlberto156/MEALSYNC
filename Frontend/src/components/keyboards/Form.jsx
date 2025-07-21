//____________IMPORT/EXPORT____________
// Hooks de React
import { useContext } from "react";
// Contextos
import { KeyboardContext,KeyboardViewContext } from "../../contexts/VariablesProvider";
import { TextFieldsUserContext,TextFieldsMenuTypeContext } from "../../contexts/FormsProvider";
// Hooks personalizados 
import { HandleKeyboard } from "../../hooks/Views";
// Componentes perzonalizados
import Keyboard_Default from "./Defaullt";
//____________IMPORT/EXPORT____________

export const Keyboard_Form_User = () => {
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
                        value={isKeyboardView === 'Nombre-Usuario' ? isTextFieldsUser.nombre :
                               isKeyboardView === 'Nombre-Corto-Usuario' ? isTextFieldsUser.nombrecorto :
                               isKeyboardView === 'Usuario' ? isTextFieldsUser.usuario :
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

export const Keyboard_Form_Menu = () => {
    // Constantes con el valor de los contextos
    const [isTextFieldsMenuType] = useContext(TextFieldsMenuTypeContext); 
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
                        value={isKeyboardView === 'Nombre-Menu' ? isTextFieldsMenuType.nombre : null} 
                        onChange={handleKeyboard}
                    />  
                </>
            ):(
                <></>
            )}
        </>
    );
};