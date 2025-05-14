//____________IMPORT/EXPORT____________
// Hooks de React
import { useContext } from "react";
// Componentes de React externos
import { Tooltip } from "@mui/material";
// Contextos
import { ThemeModeContext } from "../../contexts/ViewsProvider";
import { TextFieldsUserContext } from "../../contexts/FormsProvider";
import { VerificationBlockContext } from "../../contexts/VariablesProvider";
// Hooks personalizados
import { HandleVerificationBlock } from "../../hooks/Form";
//__________ICONOS__________
// Iconos del boton de comprobar
import { FaUserCheck } from "react-icons/fa6";
//__________ICONOS__________
// Estilos personalizados
import { Container_Column_90_Center,Container_Row_100_Center,Container_Row_NG_95_Left } from "../styled/Containers";
import { Text_A_16_Left,Text_Blue_16_Left } from "../styled/Text";
import { Input_Text_Black_100 } from "../styled/Inputs";
import { Button_Icon_Blue_220 } from "../styled/Buttons";
import { Icon_White_22 } from "../styled/Icons";
//____________IMPORT/EXPORT____________

// Formulario para iniciar sesión
export default function Form_Verification(){
    // Constantes con el valor de los contextos
    const [themeMode] = useContext(ThemeModeContext);
    const [isTextFieldsUser,setIsTextFieldsUser] = useContext(TextFieldsUserContext);
    const [isVerificationBlock] = useContext(VerificationBlockContext);
    // Constantes con la funcionalidad de los hooks
    const handleVerificationBlock = HandleVerificationBlock();
    // Estructura del componente
    return(
        <> 
            <Container_Row_NG_95_Left>
                <Text_Blue_16_Left ThemeMode={themeMode}>MEALSYNC</Text_Blue_16_Left>   
                <Text_A_16_Left ThemeMode={themeMode}>- Ingresa los datos de tu sesión...</Text_A_16_Left>
            </Container_Row_NG_95_Left>
            <Container_Column_90_Center className={themeMode ? 'shadow-out-container-light-infinite' : 'shadow-out-container-dark-infinite'}>
                <Container_Row_100_Center>
                    <Text_A_16_Left ThemeMode={themeMode}>Usuario:</Text_A_16_Left>
                    <Input_Text_Black_100 ThemeMode={themeMode}
                        placeholder="..."
                        type="text"
                        value={isTextFieldsUser.user}
                        onChange={(e) => setIsTextFieldsUser(prev => ({...prev, user: e.target.value}))}
                        disabled={isVerificationBlock}
                    />
                </Container_Row_100_Center>
                <Container_Row_100_Center>
                    <Text_A_16_Left ThemeMode={themeMode}>Contraseña:</Text_A_16_Left>
                    <Input_Text_Black_100 ThemeMode={themeMode}
                        placeholder="..."
                        type="password"
                        value={isTextFieldsUser.password}
                        onChange={(e) => setIsTextFieldsUser(prev => ({...prev, password: e.target.value}))}
                        disabled={isVerificationBlock}
                    />
                </Container_Row_100_Center>
                <Tooltip title='Verificar' placement="top">
                    <Button_Icon_Blue_220 ThemeMode={themeMode}  className={isVerificationBlock ? 'roll-out-button-left' : 'roll-in-button-left'} 
                    onClick={() => {
                        handleVerificationBlock();
                    }}>
                        <Icon_White_22><FaUserCheck/></Icon_White_22>
                    </Button_Icon_Blue_220>
                </Tooltip>
            </Container_Column_90_Center>
        </>  
    );
}