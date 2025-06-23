//____________IMPORT/EXPORT____________
// Hooks de React
import { useRef, useState, useEffect, useContext } from "react";
import Keyboard from "react-simple-keyboard";
import "react-simple-keyboard/build/css/index.css";
// Contextos
import { RefKeyboardContext } from '../../contexts/RefsProvider';
import { KeyboardViewContext } from "../../contexts/VariablesProvider";
// Estilos personalizados
import { Container_Keyboard_Numeric } from "../styled/Containers";
//____________IMPORT/EXPORT____________

// Teclado numérico virtual
export default function Keyboard_Numeric({ value, onChange }) {
    const isKeyboard = useContext(RefKeyboardContext);
    const [isKeyboardView] = useContext(KeyboardViewContext);
    const keyboardRef = useRef(null);
    const [layoutName, setLayoutName] = useState("default");

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
        if (keyboardRef.current) {
            keyboardRef.current.setInput(value);
        }
    }, [value]);

    return (
        <Container_Keyboard_Numeric
            ref={isKeyboard}
            className={isKeyboardView ? 'slide-in-container-bottom' : 'slide-out-container-bottom'}
        >
            <Keyboard
                keyboardRef={r => (keyboardRef.current = r)}
                layoutName={layoutName}
                layout={numericLayout}
                display={{
                    "{bksp}": "🔙",
                }}
                onChange={onChange}
                onKeyPress={() => {}} // No necesitas shift en teclado numérico
            />
        </Container_Keyboard_Numeric>
    );
}