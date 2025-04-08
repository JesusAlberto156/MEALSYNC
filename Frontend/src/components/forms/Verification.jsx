//____________IMPORT/EXPORT____________
// Hooks de React
import { useContext,useState } from "react";
// Componentes de React externos

// Servicios

// Rutas

// Contextos
import { themeModeContext } from "../../contexts/ViewsProvider";
import { nameContext,passwordContext } from "../../contexts/FormsProvider";
import { formComprobationContext } from "../../contexts/VariablesProvider";
// Hooks personalizados
import { useSessionVerification } from "../../hooks/Form";
//__________ICONOS__________
// Iconos del boton de comprobar
import { FaUser } from "react-icons/fa6";
import { FaUserCheck } from "react-icons/fa6";
//__________ICONOS__________
// Estilos personalizados
import { Container_Button_Border_Column_350,Container_Button_Row_300 } from "../styled/Containers";
import { Text_P_Left_20 } from "../styled/Text";
import { Input_Group_80,Input_Text_260 } from "../styled/Inputs";
import { Label_Text_20,Label_Popup_14 } from "../styled/Labels";
import { Button_Icon_Blue_220,Button_Icon_Block_220 } from "../styled/Buttons";
// Componentes personalizados

//____________IMPORT/EXPORT____________

// Formulario para iniciar sesión
export default function Form_Verification(){
    // Constantes con el valor de los contextos
    const [themeMode] = useContext(themeModeContext);
    const [isName,setIsName] = useContext(nameContext);
    const [isPassword,setIsPassword] = useContext(passwordContext);
    const [isFormComprobation] = useContext(formComprobationContext);
    // Constantes con el valor de useState
    const [textName,setTextName] = useState(false);
    const [isFocusedName, setIsFocusedName] = useState(false);
    const [isFocusedNameColor, setIsFocusedNameColor] = useState(false);
    const [textPassword,setTextPassword] = useState(false);
    const [isFocusedPassword, setIsFocusedPassword] = useState(false);
    const [isFocusedPasswordColor, setIsFocusedPasswordColor] = useState(false);
    // Constantes con la funcionalidad de los hooks
    const sessionVerification = useSessionVerification();
    // Estructura del componente
    return(
        <> 
            <Text_P_Left_20 ThemeMode={themeMode}>Ingresa tus datos...</Text_P_Left_20>
            <Container_Button_Border_Column_350 ThemeMode={themeMode}>
                <Input_Group_80>
                    <Label_Text_20
                        ThemeMode={themeMode}
                        isLabelUp={isFocusedName}
                        isFocused={isFocusedNameColor}
                    >
                        Nombre de usuario
                    </Label_Text_20>
                    <Input_Text_260 
                        ThemeMode={themeMode}
                        type="text"
                        value={isName}
                        onClick={(e) => {
                            setTextName(true);
                            setIsFocusedNameColor(true);
                            setIsFocusedName(true);
                        }}
                        onBlur={(e) => {
                            setTextName(false);
                            setIsFocusedNameColor(false);
                            if (e.target.value === ''){
                                setIsFocusedName(false);
                            }else{
                                setIsFocusedName(true);
                            }
                        }}   
                        onChange={(e) => setIsName(e.target.value)} 
                    />
                    {textName && (
                        <Label_Popup_14 ThemeMode={themeMode}>Escribe tú nombre de usuario</Label_Popup_14>
                    )}
                </Input_Group_80>
                <Input_Group_80>
                    <Label_Text_20 
                        ThemeMode={themeMode}
                        isLabelUp={isFocusedPassword}
                        isFocused={isFocusedPasswordColor}
                    >
                        Contraseña
                    </Label_Text_20>
                    <Input_Text_260 
                        ThemeMode={themeMode}
                        type='password'
                        value={isPassword}
                        onClick={(e) => {
                            setTextPassword(true);
                            setIsFocusedPasswordColor(true);
                            setIsFocusedPassword(true);
                        }}
                        onBlur={(e) => {
                            setTextPassword(false);
                            setIsFocusedPasswordColor(false);
                            if (e.target.value === ''){
                                setIsFocusedPassword(false);
                            }else{
                                setIsFocusedPassword(true);
                            }
                        }}   
                        onChange={(e) => setIsPassword(e.target.value)} 
                    />
                    {textPassword && (
                        <Label_Popup_14 ThemeMode={themeMode}>Escribe tú Contraseña</Label_Popup_14>
                    )}
                </Input_Group_80>
                <Container_Button_Row_300>
                    {isFormComprobation ? (
                        <>
                            <Button_Icon_Block_220 ThemeMode={themeMode}><FaUserCheck/></Button_Icon_Block_220>
                        </>
                    ):(
                        <>
                            <Button_Icon_Blue_220 ThemeMode={themeMode} onClick={(e) => {
                                e.stopPropagation();
                                sessionVerification();
                            }}>
                                <FaUser/>
                            </Button_Icon_Blue_220>
                        </>
                    )}
                </Container_Button_Row_300>
            </Container_Button_Border_Column_350>
        </>  
    );
}