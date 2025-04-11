//____________IMPORT/EXPORT____________
// Hooks de React
import { useContext, useEffect } from "react";
// Componentes de React externos
import { Toaster } from "sonner";
import { Tooltip } from "@mui/material";
// Servicios

// Rutas

// Contextos
import { themeModeContext } from '../contexts/ViewsProvider';
// Hooks personalizados
import { useErrorReturn } from "../hooks/Error";
//__________ICONOS__________
// Iconos de decoración de la página
import { IoIosWarning } from "react-icons/io";
import { IoSettings } from "react-icons/io5";
// Icono del boton de regreso a una página aceptada
import { FaHome } from "react-icons/fa";
//__________ICONOS__________
// Estilos personalizados
import { Container_Page_Error,Container_100_Right,Container_100_Left,Container_Text_20 } from "../components/styled/Containers";
import { Icon_Gray_Rotate_50,Icon_Yellow_250 } from "../components/styled/Icons";
import { Text_Title_Fade_50,Text_A_Left_25 } from "../components/styled/Text";
import { Button_Icon_White_200 } from "../components/styled/Buttons";
import { Img_Logo_Error } from "../components/styled/Imgs";
import { Alert_Error,Alert_Styles } from "../components/styled/Alerts";
// Componentes personalizados

//____________IMPORT/EXPORT____________

// Página para captar los errores ocasionados por una mala ruta escrita
export default function Error(){
    // Constantes con el valor de los contextos 
    const [themeMode] = useContext(themeModeContext);
    // useEffect con el titulo de la página
    useEffect(() => {
        document.title='MEALSYNC_Error';
        Alert_Error('MEALSYNC','¡Error, página no encontrada!...',themeMode);
    },[])
    // Constantes con la funcionalidad de los hooks
    const errorReturn = useErrorReturn();
    // Estructura del componente
    return(
        <>
            <Container_Page_Error ThemeMode={themeMode}>
                <Container_100_Right>
                    <Icon_Yellow_250 ThemeMode={themeMode}><IoIosWarning/></Icon_Yellow_250>
                </Container_100_Right>
                <Container_Text_20>
                    <Text_Title_Fade_50 ThemeMode={themeMode}>Ooops...</Text_Title_Fade_50>
                    <Icon_Gray_Rotate_50 ThemeMode={themeMode}><IoSettings/></Icon_Gray_Rotate_50>
                </Container_Text_20>
                <Text_A_Left_25 ThemeMode={themeMode}>Página no encotrada...</Text_A_Left_25>
                <Tooltip title='Regresar' placement="top">
                    <Button_Icon_White_200 ThemeMode={themeMode} onClick={() => errorReturn()}><FaHome/></Button_Icon_White_200>
                </Tooltip>
                <Container_100_Left>
                    <Img_Logo_Error ThemeMode={themeMode}/>
                </Container_100_Left>
                <Alert_Styles ThemeMode={themeMode}>
                    <Toaster
                        visibleToasts={3}
                        richColors
                        theme='dark'
                        position='top-right'
                    />
                </Alert_Styles>
            </Container_Page_Error>
        </>
    );
}