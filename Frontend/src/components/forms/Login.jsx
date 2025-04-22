//____________IMPORT/EXPORT____________
// Hooks de React
import { useContext } from "react";
// Contextos
import { ThemeModeContext } from "../../contexts/ViewsProvider";
import { TextFieldsContext } from "../../contexts/FormsProvider";
import { AnimationContext } from "../../contexts/VariablesProvider";
// Estilos personalizados
import { Container_Row_100_Left,Container_Row_90_Left,Container_Column_Border_90_Center } from "../styled/Containers";
import { Text_P_16_Left } from "../styled/Text";
import { Input_Text_70,Input_Text_60 } from "../styled/Inputs";
//____________IMPORT/EXPORT____________

// Formulario para iniciar sesión
export default function Form_Login(){
    // Constantes con el valor de los contextos
    const [themeMode] = useContext(ThemeModeContext);
    const [isTextFields,setIsTextFields] = useContext(TextFieldsContext);
    const [isAnimation] = useContext(AnimationContext);
    // Estructura del componente
    return(
        <> 
            <Container_Row_90_Left>
                <Text_P_16_Left ThemeMode={themeMode} className={themeMode ? 'text-shadow-drop-infinite-light' : 'text-shadow-drop-infinite-dark'}>Ingresar tus datos...</Text_P_16_Left>
            </Container_Row_90_Left>
            <Container_Column_Border_90_Center ThemeMode={themeMode} className={themeMode ? 'shadow-in-infinite-light' : 'shadow-in-infinite-dark'}>
                <Container_Row_100_Left>
                    <Text_P_16_Left ThemeMode={themeMode} className={themeMode ? 'text-shadow-drop-infinite-light' : 'text-shadow-drop-infinite-dark'}>Usuario:</Text_P_16_Left>
                    <Input_Text_70 ThemeMode={themeMode} className={isAnimation ? 'roll-out-left' : 'roll-in-left'}
                        placeholder="Escribir aquí..."
                        type="text"
                        value={isTextFields.user}
                        onChange={(e) => setIsTextFields(prev => ({...prev, user: e.target.value}))}
                    />
                </Container_Row_100_Left>
                <Container_Row_100_Left>
                    <Text_P_16_Left ThemeMode={themeMode} className={themeMode ? 'text-shadow-drop-infinite-light' : 'text-shadow-drop-infinite-dark'}>Contraseña:</Text_P_16_Left>
                    <Input_Text_60 ThemeMode={themeMode} className={isAnimation ? 'roll-out-left' : 'roll-in-left'}
                        placeholder="Escribir aquí..."
                        type="password"
                        value={isTextFields.password}
                        onChange={(e) => setIsTextFields(prev => ({...prev, password: e.target.value}))}
                    />
                </Container_Row_100_Left>
            </Container_Column_Border_90_Center>
        </>  
    );
}