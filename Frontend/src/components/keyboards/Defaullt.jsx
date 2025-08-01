//____________IMPORT/EXPORT____________
// Hooks de React
import { useState,useEffect,useContext } from "react";
import Keyboard from "react-simple-keyboard";
import "react-simple-keyboard/build/css/index.css";
// Contextos
import { RefKeyboardContext,RefKeyboardWritingContext } from '../../contexts/RefsProvider';
import { KeyboardViewContext } from "../../contexts/VariablesProvider";
// Estilos personalizados
import { Container_Keyboard } from '../styled/Containers';
//____________IMPORT/EXPORT____________

// Teclado virtual
export default function Keyboard_Default ({ value, onChange }) {
    // Constantes con el valor de los contextos
    const isKeyboard = useContext(RefKeyboardContext);
    const [isKeyboardView] = useContext(KeyboardViewContext);
    const isKeyboardWriting = useContext(RefKeyboardWritingContext);
    // Constantes con el valor de los useState
    const [layoutName, setLayoutName] = useState("default");
    // Estilo del teclado
    const spanishCustomLayout = {
        default: [
            "º 1 2 3 4 5 6 7 8 9 0 ' ¡",
            "{tab} q w e r t y u i o p {bksp}",
            "a s d f g h j k l ñ ` + }",
            "z x c v b n m , . - { <",
            "@ .com {space} {shift}"
        ],
        shift: [
            "ª ! \" · $ % & / ( ) = ? ¿",
            "{tab} Q W E R T Y U I O P {bksp}",
            "A S D F G H J K L Ñ ^ * ]",
            "Z X C V B N M ; : _ [ >",
            "@ .com {space} {shift}"
        ]
    };
    // UseEffect sincronizar el valor del input externo al teclado
    useEffect(() => {
        if (isKeyboardWriting.current) {
            isKeyboardWriting.current.setInput(value);
        }
    }, [value]);
    // UseEffect para determinar la vista del teclado
    const handleKeyPress = (button) => {
        if (button === "{shift}" || button === "{lock}") {
            setLayoutName(prev => (prev === "default" ? "shift" : "default"));
        }
    };
    // Estructura del componente
    return (
        <>
            <Container_Keyboard ref={isKeyboard} className={isKeyboardView ? 'slide-in-container-bottom' : 'slide-out-container-bottom'}>
                <Keyboard
                    keyboardRef={(r) => (isKeyboardWriting.current = r)}
                    layoutName={layoutName}
                    layout={spanishCustomLayout}
                    display={{
                        "{bksp}": "🔙",
                        "{shift}": "⬆️",
                        "{space}": "[____________________]",
                        "{tab}": "⏩",
                    }}
                    onChange={onChange}
                    onKeyPress={handleKeyPress}
                />
            </Container_Keyboard>
        </>
    );
};