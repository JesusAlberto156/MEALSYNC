//____________IMPORT/EXPORT____________
// Hooks de React
import { useContext,useEffect } from "react";
import { useNavigate } from "react-router-dom";
// Componentes de React externos
import { Tooltip } from "@mui/material";
import { Toaster } from 'sonner';
// Servicios

// Rutas

// Contextos
import { modeContext } from "../contexts/VariablesProvider";
// Hooks personalizados
import { useChangeMode } from "../hooks/Mode";
//__________ICONOS__________
// Icono para cambiar el modo de la interfaz
import { IoMdSunny } from "react-icons/io";
import { FaMoon } from "react-icons/fa";
// Icono de carga
import { IoSettings } from "react-icons/io5";
//__________ICONOS__________
// Estilos personalizados
import { Container_Page_Loading_Light,Container_Page_Loading_Dark,Container_Text_20 } from "../components/styled/Containers";
import { Text_Title_Fade_50_Light,Text_Title_Fade_50_Dark } from "../components/styled/Text";
import { Icon_Settings_50_Light,Icon_Settings_50_Dark } from "../components/styled/Icons";
import { Button_Icon_Light,Button_Icon_Dark } from "../components/styled/Buttons";
import { Alert_Greeting_Light,Alert_Greeting_Dark,Alert_Styles } from '../components/styled/Notifications';
// Componentes personalizados

//____________IMPORT/EXPORT____________

// Página para cargar otra página
const Loading = () => {
    // Constantes con el valor de los contextos 
    const [isMode] = useContext(modeContext);
    // useEffect con el titulo de la página
    useEffect(() => {
        document.title = "MEALSYNC_Cargando...";
        if(isMode){
            Alert_Greeting_Light("MEALSYNC",'¡Cargando!...');
        }else{
            Alert_Greeting_Dark("MEALSYNC",'¡Cargando!...');
        }
        setTimeout(() => {
            navigate('/Login',{ replace: true });                            
        },500);
    });
    // Constantes con la funcionalidad de los hooks
    const navigate = useNavigate();
    const changeMode = useChangeMode();
    // Estructura del componente
    return(
        <>
            {isMode ? (
                <>
                    <Container_Page_Loading_Light>
                        <Tooltip title='Modo Claro' placement="left">
                            <Button_Icon_Light onClick={() => changeMode()}><IoMdSunny/></Button_Icon_Light>
                        </Tooltip>
                        <Container_Text_20>
                            <Text_Title_Fade_50_Light>Cargando...</Text_Title_Fade_50_Light>
                            <Icon_Settings_50_Light><IoSettings/></Icon_Settings_50_Light>
                        </Container_Text_20>
                        <Alert_Styles>
                            <Toaster
                                visibleToasts={3}
                                richColors
                                theme='light'
                                position='top-right'
                            />
                        </Alert_Styles> 
                    </Container_Page_Loading_Light>
                </>
            ):(
                <>
                    <Container_Page_Loading_Dark>
                        <Tooltip title='Modo Oscuro' placement="left">
                            <Button_Icon_Dark onClick={() => changeMode()}><FaMoon/></Button_Icon_Dark>
                        </Tooltip>
                        <Container_Text_20>
                            <Text_Title_Fade_50_Dark>Cargando...</Text_Title_Fade_50_Dark>
                            <Icon_Settings_50_Dark><IoSettings/></Icon_Settings_50_Dark>
                        </Container_Text_20>
                        <Alert_Styles>
                            <Toaster
                                visibleToasts={3}
                                richColors
                                theme='dark'
                                position='top-right'
                            />
                        </Alert_Styles> 
                    </Container_Page_Loading_Dark>
                </>
            )}
        </>
    );
}

export default Loading;