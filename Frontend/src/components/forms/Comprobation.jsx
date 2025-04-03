//____________IMPORT/EXPORT____________
// Hooks de React
import { useContext,useState } from "react";
// Componentes de React externos

// Servicios

// Rutas

// Contextos
import { themeModeContext } from "../../contexts/ViewsProvider";
import { nameContext,passwordContext } from "../../contexts/FormsProvider";
import { formContext } from "../../contexts/RefsProvider";
// Hooks personalizados

//__________ICONOS__________
// Iconos del boton de comprobar
import { FaUser } from "react-icons/fa6";
import { FaUserCheck } from "react-icons/fa6";
//__________ICONOS__________
// Estilos personalizados
import { Container_Input_Border_250,Container_Button_Row_300 } from "../styled/Containers";
import { Text_P_Left_20 } from "../styled/Text";
import { Input_Group_80,Input_Text_220 } from "../styled/Inputs";
import { Label_Text_20,Label_Popup_14 } from "../styled/Labels";
import { Button_Icon_Blue_150 } from "../styled/Buttons";
import { Button_Icon_Blue_80_Light,Button_Icon_Block_80_Light,Button_Icon_Blue_80_Dark,Button_Icon_Block_80_Dark } from "../styled/Buttons";
// Componentes personalizados

//____________IMPORT/EXPORT____________

// Formulario para iniciar sesión
export default function FormComprobation(){
    // Constantes con el valor de los contextos
    const [themeMode,setThemeMode] = useContext(themeModeContext);
    const [isName,setIsName] = useContext(nameContext);
    const [isPassword,setIsPassword] = useContext(passwordContext);
    const [isBlock] = useContext(blockContext);
    const isForm = useContext(formContext);
    // Constantes con el valor de useState
    const [textName,setTextName] = useState(false);
    const [isFocusedName, setIsFocusedName] = useState(false);
    const [isFocusedNameColor, setIsFocusedNameColor] = useState(false);
    const [textPassword,setTextPassword] = useState(false);
    const [isFocusedPassword, setIsFocusedPassword] = useState(false);
    const [isFocusedPasswordColor, setIsFocusedPasswordColor] = useState(false);
    // Constantes con la funcionalidad de los hooks
    const comprobation = useComprobation();
    // Estructura del componente
    return(
        <> 
            <Text_P_Left_20 ThemeMode={themeMode}>Ingresa tus datos...</Text_P_Left_20>
            <Container_Input_Border_250 ThemeMode={themeMode}>
                <Input_Group_80>
                    <Label_Text_20
                        ThemeMode={themeMode}
                        isLabelUp={isFocusedName}
                        isFocused={isFocusedNameColor}
                    >
                        Nombre de usuario
                    </Label_Text_20>
                    <Input_Text_220 
                        ThemeMode={themeMode}
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
                    <Input_Text_220 
                        ThemeMode={themeMode}
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
                        type="password"
                    />
                    {textPassword && (
                        <Label_Popup_14 ThemeMode={themeMode}>Escribe tú Contraseña</Label_Popup_14>
                    )}
                </Input_Group_80>
                <Container_Button_Row_300>
                {isBlock ? (
                    <>
                        <Button_Icon_Block_80_Light><FaUserCheck/></Button_Icon_Block_80_Light>
                    </>
                ):(
                    <>
                        <Button_Icon_Blue_80_Light onClick={(e) => {
                            e.stopPropagation();
                            comprobation();
                        }}>
                            <FaUser/>
                        </Button_Icon_Blue_80_Light>
                    </>
                )}
                    <Button_Icon_Blue_150><FaUser/></Button_Icon_Blue_150>
                </Container_Button_Row_300>
            </Container_Input_Border_250>
        </>  
    );
}