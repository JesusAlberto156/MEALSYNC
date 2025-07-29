//____________IMPORT/EXPORT____________
// Hooks de React
import { useState, useEffect, useContext } from "react";
import Keyboard from "react-simple-keyboard";
import "react-simple-keyboard/build/css/index.css";
// Contextos
import { RefKeyboardContext,RefKeyboardWritingContext } from '../../contexts/RefsProvider';
import { KeyboardViewContext } from "../../contexts/VariablesProvider";
// Estilos personalizados
import { Container_Keyboard } from "../styled/Containers";
//____________IMPORT/EXPORT____________

// Teclado numérico virtual
export default function Keyboard_Numeric({ value, onChange }) {
     // Constantes con el valor de los contextos
    const isKeyboard = useContext(RefKeyboardContext);
    const [isKeyboardView] = useContext(KeyboardViewContext);
    const isKeyboardWriting = useContext(RefKeyboardWritingContext);
    // Constantes con el valor de los useState
    const [layoutName] = useState("default");
    // Diseño numérico personalizado
    const numericLayout = {
        default: [
            "1 2 3",
            "4 5 6",
            "7 8 9",
            ". 0 {bksp}"
        ]
    };
    // Sincroniza valor externo con el teclado
    useEffect(() => {
        if (isKeyboardWriting.current) {
            isKeyboardWriting.current.setInput(value);
        }
    }, [value]);
    // Estructura del componente
    return (
        <Container_Keyboard
            ref={isKeyboard}
            className={isKeyboardView ? 'slide-in-container-bottom' : 'slide-out-container-bottom'}
        >
            <Keyboard
                keyboardRef={r => (isKeyboardWriting.current = r)}
                layoutName={layoutName}
                layout={numericLayout}
                display={{
                    "{bksp}": "🔙",
                }}
                onChange={onChange}
                onKeyPress={() => {}} // No necesitas shift en teclado numérico
            />
        </Container_Keyboard>
    );
}