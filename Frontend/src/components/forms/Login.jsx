//____________IMPORT/EXPORT____________
// Hooks de React
import { useContext } from "react";
// Componentes de React externos

// Servicios

// Rutas

// Contextos
import { themeModeContext } from "../../contexts/ViewsProvider";
import { formTextContext } from "../../contexts/FormsProvider";
import { refKeyboardContext } from '../../contexts/RefsProvider';
// Hooks personalizados

//__________ICONOS__________

//__________ICONOS__________
// Estilos personalizados
import { Container_Row_100_Left,Container_Row_90_Left,Container_Column_Border_90_Center } from "../styled/Containers";
import { Text_P_16 } from "../styled/Text";
import { Input_Text_65,Input_Text_55 } from "../styled/Inputs";
// Componentes personalizados

//____________IMPORT/EXPORT____________

// Formulario para iniciar sesión
export default function Form_Login(){
    // Constantes con el valor de los contextos
    const [themeMode] = useContext(themeModeContext);
    const [isFormText,setIsFormText] = useContext(formTextContext);
    const {user,password} = useContext(refKeyboardContext);
    // Estructura del componente
    return(
        <> 
            <Container_Row_90_Left>
                <Text_P_16 ThemeMode={themeMode}>Ingresa tus datos...</Text_P_16>
            </Container_Row_90_Left>
            <Container_Column_Border_90_Center ThemeMode={themeMode}>
                <Container_Row_100_Left>
                    <Text_P_16 ThemeMode={themeMode}>Usuario:</Text_P_16>
                    <Input_Text_65 ThemeMode={themeMode}
                        id="user"
                        ref={user}
                        placeholder="Ingresar usuario..."
                        type="text"
                        value={isFormText.user}
                        onChange={(e) => setIsFormText(prev => ({...prev, user: e.target.value}))}
                    />
                </Container_Row_100_Left>
                <Container_Row_100_Left>
                    <Text_P_16 ThemeMode={themeMode}>Contraseña:</Text_P_16>
                    <Input_Text_55 ThemeMode={themeMode}
                        id="password"
                        ref={password}
                        placeholder="Ingresar contraseña..."
                        type="password"
                        value={isFormText.password}
                        onChange={(e) => setIsFormText(prev => ({...prev, password: e.target.value}))}
                    />
                </Container_Row_100_Left>
            </Container_Column_Border_90_Center>
        </>  
    );
}