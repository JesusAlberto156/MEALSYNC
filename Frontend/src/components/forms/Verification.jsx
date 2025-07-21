//____________IMPORT/EXPORT____________
// Hooks de React
import { useContext,useEffect,useState } from "react";
// Contextos
import { TextFieldsUserContext } from "../../contexts/FormsProvider";
import { VerificationBlockContext,KeyboardContext,KeyboardViewContext,TouchContext,ActionBlockContext } from "../../contexts/VariablesProvider";
import { RefKeyboardContext,RefKeyboardTouchContext } from "../../contexts/RefsProvider";
// Hooks personalizados
import { HandleKeyboard } from "../../hooks/Views";
//__________ICONOS__________
// Iconos del boton de comprobar
import { MdCancel } from "react-icons/md";
//__________ICONOS__________
// Estilos personalizados
import { Container_Column_100_Left,Container_Row_100_Center,Container_Row_NG_Auto_Center } from "../styled/Containers";
import { Text_Span_16_Center_Black,Text_Color_Blue_16,Text_Span_16_Left_Black } from "../styled/Text";
import { Input_Group, Input_Text_100_Black } from "../styled/Inputs";
import { Icon_Button_Blue_16 } from "../styled/Icons";
import { Label_Text_12_Black } from "../styled/Labels";
// Componentes personalizados
import { Modal_Form_Button_Verification } from "./Button";
//____________IMPORT/EXPORT____________

// Formulario para iniciar sesión
export default function Form_Verification(){
    // Constantes con el valor de los contextos
    const [isTextFieldsUser,setIsTextFieldsUser] = useContext(TextFieldsUserContext);
    const [isVerificationBlock] = useContext(VerificationBlockContext);
    const [isKeyboard,setIsKeyboard] = useContext(KeyboardContext);
    const [isKeyboardView,setIsKeyboardView] = useContext(KeyboardViewContext);
    const Keyboard = useContext(RefKeyboardContext);
    const [isTouch] = useContext(TouchContext);
    const isKeyboardTouch = useContext(RefKeyboardTouchContext);
    const [isActionBlock] = useContext(ActionBlockContext);
    // Constantes con la funcionalidad de los hooks
    const { KeyboardView,KeyboardClick } = HandleKeyboard();
    // Constantes con el valor de useState
    const [isTotalUser,setIsTotalUser] = useState(0);
    const [isTotalPassword,setIsTotalPassword] = useState(0);
    // useEffect para controlar el teclado
    useEffect(() => {
        KeyboardView();
    },[]);
    useEffect(() => {
        KeyboardClick();
    },[Keyboard]);
    useEffect(() => {
        isKeyboardTouch.current = isTouch;
    },[isTouch]);
    // UseEffects para el limite de caracteres de los campos del formulario
    useEffect(() => {
        setIsTotalUser(isTextFieldsUser.usuario.length)
    },[isTextFieldsUser.usuario]);
    useEffect(() => {
        setIsTotalPassword(isTextFieldsUser.contrasena.length);
    },[isTextFieldsUser.contrasena]);
    // Estructura del componente
    return(
        <> 
            <Container_Row_NG_Auto_Center>
                <Text_Color_Blue_16>MEALSYNC</Text_Color_Blue_16>   
                <Text_Span_16_Center_Black>: Datos de sesión</Text_Span_16_Center_Black>
            </Container_Row_NG_Auto_Center>
            <Container_Column_100_Left>
                <Container_Row_100_Center>
                    <Text_Span_16_Left_Black>Usuario:</Text_Span_16_Left_Black>
                    <Input_Group>
                        <Input_Text_100_Black
                            id="Input-Usuario"
                            placeholder="..."
                            type="text"
                            maxLength={25}
                            value={isTextFieldsUser.usuario}
                            onChange={(e) => setIsTextFieldsUser(prev => ({...prev, usuario: e.target.value}))}
                            disabled={isVerificationBlock || isActionBlock}
                            onFocus={() => {
                                if(isKeyboardTouch.current){
                                    setIsKeyboard(true);
                                    setIsKeyboardView('Usuario');
                                }
                            }}
                        />
                        <Label_Text_12_Black>{isTotalUser}/25</Label_Text_12_Black>
                    </Input_Group>
                    <Icon_Button_Blue_16
                        onClick={() => setIsTextFieldsUser(prev => ({...prev, usuario: ''}))}
                        disabled={isVerificationBlock || isActionBlock}
                    >
                        <MdCancel/>
                    </Icon_Button_Blue_16>
                </Container_Row_100_Center>
                <Container_Row_100_Center>
                    <Text_Span_16_Left_Black>Contraseña:</Text_Span_16_Left_Black>
                    <Input_Group>
                        <Input_Text_100_Black
                            id="Input-Contraseña"
                            placeholder="..."
                            type="password"
                            maxLength={15}
                            value={isTextFieldsUser.contrasena}
                            onChange={(e) => setIsTextFieldsUser(prev => ({...prev, contrasena: e.target.value}))}
                            disabled={isVerificationBlock || isActionBlock}
                            onFocus={() => {
                                if(isKeyboardTouch.current){
                                    setIsKeyboard(true);
                                    setIsKeyboardView('Contraseña');
                                }
                            }}
                        />
                        <Label_Text_12_Black>{isTotalPassword}/15</Label_Text_12_Black>
                    </Input_Group>
                    <Icon_Button_Blue_16
                        onClick={() => setIsTextFieldsUser(prev => ({...prev, contrasena: ''}))}
                        disabled={isVerificationBlock || isActionBlock}
                    >
                        <MdCancel/>
                    </Icon_Button_Blue_16>
                </Container_Row_100_Center>
            </Container_Column_100_Left>
            <Modal_Form_Button_Verification/>            
        </>  
    );
}