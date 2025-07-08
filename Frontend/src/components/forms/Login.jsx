//____________IMPORT/EXPORT____________
// Hooks de React
import { useContext,useEffect,useState } from "react";
// Contextos
import { TextFieldsUserContext } from "../../contexts/FormsProvider";
import { KeyboardContext,KeyboardViewContext,TouchContext,ActionBlockContext } from "../../contexts/VariablesProvider";
import { RefKeyboardContext,RefKeyboardTouchContext } from "../../contexts/RefsProvider";
// Hooks personalizados
import { HandleKeyboard } from "../../hooks/Views";
// Estilos personalizados
import { Container_Row_100_Center,Container_Column_100_Left } from "../styled/Containers";
import { Text_Span_16_Left_Black } from "../styled/Text";
import { Input_Text_100_Black,Input_Group } from "../styled/Inputs";
import { Label_Text_12_Black } from "../styled/Labels";
import { Alert_Sonner_Warning } from "../styled/Alerts";
//____________IMPORT/EXPORT____________

// Formulario para iniciar sesión
export default function Form_Login(){
    // Constantes con el valor de los contextos
    const [isTextFieldsUser,setIsTextFieldsUser] = useContext(TextFieldsUserContext);
    const [isActionBlock] = useContext(ActionBlockContext);
    const [isKeyboard,setIsKeyboard] = useContext(KeyboardContext);
    const [isKeyboardView,setIsKeyboardView] = useContext(KeyboardViewContext);
    const Keyboard = useContext(RefKeyboardContext);
    const [isTouch] = useContext(TouchContext);
    const isKeyboardTouch = useContext(RefKeyboardTouchContext);
    // Constantes con la funcionalidad de los hooks
    const { KeyboardView,KeyboardClick } = HandleKeyboard();
    // Constantes con el valor de useState
    const [isTotalUser,setIsTotalUser] = useState(0);
    const [isTotalPassword,setIsTotalPassword] = useState(0);
    // useEffect para controla el teclado
    useEffect(() => {
        KeyboardView();
    }, []);
    useEffect(() => {
        KeyboardClick();
    }, [Keyboard]);
    useEffect(() => {
        isKeyboardTouch.current = isTouch;
    }, [isTouch]);
    // UseEffects para advertir sobre el limite de caracteres de los campos del formulario
    useEffect(() => {
        setIsTotalUser(isTextFieldsUser.usuario.length);
        if(isTextFieldsUser.usuario.length === 25){
            Alert_Sonner_Warning('¡Ha alcanzado el límite de caracteres permitido en el usuario!');
        }
    },[isTextFieldsUser.usuario]);
    useEffect(() => {
        setIsTotalPassword(isTextFieldsUser.contrasena.length);
        if(isTextFieldsUser.contrasena.length === 15){
            Alert_Sonner_Warning('¡Ha alcanzado el límite de caracteres permitido en la contraseña!');
        }
    },[isTextFieldsUser.contrasena]);
    // Estructura del componente
    return(
        <> 
            <Container_Column_100_Left>
                    <Container_Row_100_Center>
                    <Text_Span_16_Left_Black>Usuario:</Text_Span_16_Left_Black>
                    <Input_Group>
                        <Input_Text_100_Black
                            placeholder="..."
                            type="text"
                            id="Input-User"
                            maxLength={25}
                            value={isTextFieldsUser.usuario}
                            onChange={(e) => setIsTextFieldsUser(prev => ({...prev, usuario: e.target.value}))}
                            onFocus={() => {
                                if(isKeyboardTouch.current){
                                    setIsKeyboard(true);
                                    setIsKeyboardView('User');
                                }
                            }}
                            disabled={isActionBlock}
                        />
                        <Label_Text_12_Black>{isTotalUser}/25</Label_Text_12_Black>
                    </Input_Group>
                </Container_Row_100_Center>
                <Container_Row_100_Center>
                    <Text_Span_16_Left_Black>Contraseña:</Text_Span_16_Left_Black>
                    <Input_Group>
                        <Input_Text_100_Black
                            placeholder="..."
                            type="password"
                            id="Input-Password"
                            maxLength={15}
                            value={isTextFieldsUser.contrasena}
                            onChange={(e) => setIsTextFieldsUser(prev => ({...prev, contrasena: e.target.value}))}
                            onFocus={() => {
                                if(isKeyboardTouch.current){
                                    setIsKeyboard(true);
                                    setIsKeyboardView('Password');
                                }
                            }}
                            disabled={isActionBlock}
                        />
                        <Label_Text_12_Black>{isTotalPassword}/15</Label_Text_12_Black>
                    </Input_Group>
                </Container_Row_100_Center>
            </Container_Column_100_Left>
        </>  
    );
}