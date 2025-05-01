//____________IMPORT/EXPORT____________
// Hooks de React
import React, { useRef,useState,useEffect,useContext } from "react";
import Keyboard from "react-simple-keyboard";
import "react-simple-keyboard/build/css/index.css";
// Componentes de React externos
import layout from "simple-keyboard-layouts/build/layouts/spanish";
// Contextos
import { RefKeyboardContext } from '../../contexts/RefsProvider';
import { KeyboardViewContext } from "../../contexts/VariablesProvider";
// Estilos personalizados
import { Container_Row_80_Center } from '../styled/Containers';
//____________IMPORT/EXPORT____________

// Teclado virtual
export default function Virtual_Keyboard ({ value, onChange }) {
    // Constantes con el valor de los contextos
    const isKeyboard = useContext(RefKeyboardContext);
    const [isKeyboardView] = useContext(KeyboardViewContext);
    // Constantes con el valor de los useRef
    const keyboardRef = useRef(null);
    // Constantes con el valor de los useState
    const [layoutName, setLayoutName] = useState("default");
    // UseEffect sincronizar el valor del input externo al teclado
    useEffect(() => {
        if (keyboardRef.current) {
            keyboardRef.current.setInput(value);
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
            <Container_Row_80_Center ref={isKeyboard} className={isKeyboardView ? 'slide-in-container-bottom' : 'slide-out-container-bottom'}>
                <Keyboard
                    keyboardRef={(r) => (keyboardRef.current = r)}
                    layoutName={layoutName}
                    layout={layout.layout}
                    display={{
                        "{bksp}": "🔙",
                        "{enter}": "↩️",
                        "{shift}": "⬆️",
                        "{lock}": "🅰️",
                        "{space}": "[____________________]",
                        "{tab}": "⏩",
                    }}
                    onChange={onChange}
                    onKeyPress={handleKeyPress}
                />
            </Container_Row_80_Center>
        </>
    );
};