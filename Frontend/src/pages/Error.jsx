//____________IMPORT/EXPORT____________
// Hooks de React
import { useContext, useEffect } from "react";
// Componentes de React externos
import { Toaster } from "sonner";
import { Tooltip } from "@mui/material";
// Servicios

// Rutas

// Contextos
import { modeContext } from "../contexts/VariablesProvider";
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
import { Container_Page_Error_Light,Container_Page_Error_Dark,Container_Text_20 } from "../components/styled/Containers";
import { Icon_Settings_50_Light,Icon_Warning_250_Light,Icon_Settings_50_Dark,Icon_Warning_250_Dark } from "../components/styled/Icons";
import { Text_Title_Fade_50_Light,Text_A_25_Light,Text_Title_Fade_50_Dark,Text_A_25_Dark } from "../components/styled/Text";
import { Button_Icon_White_200_Light,Button_Icon_White_200_Dark } from "../components/styled/Buttons";
import { Img_Logo_Error_Light,Img_Logo_Error_Dark } from "../components/styled/Imgs";
import { Alert_Error_Light,Alert_Error_Dark,Alert_Styles } from "../components/styled/Alerts";
// Componentes personalizados

//____________IMPORT/EXPORT____________

// Página para captar los errores ocasionados por una mala ruta escrita
export default function Error(){
    // Constantes con el valor de los contextos 
    const [isMode] = useContext(modeContext);
    // useEffect con el titulo de la página
    useEffect(() => {
        document.title='MEALSYNC_Error';
        if(isMode){
            Alert_Error_Light('MEALSYNC','¡Error, página no encontrada!...');
        }else{
            Alert_Error_Dark('MEALSYNC','¡Error, página no encontrada!...');
        }
    },[])
    // Constantes con la funcionalidad de los hooks
    const errorReturn = useErrorReturn();
    // Estructura del componente
    return(
        <>
            {isMode ? (
                <>
                    <Container_Page_Error_Light>
                        <Icon_Warning_250_Light><IoIosWarning/></Icon_Warning_250_Light>
                        <Container_Text_20>
                            <Text_Title_Fade_50_Light>Ooops...</Text_Title_Fade_50_Light>
                            <Icon_Settings_50_Light><IoSettings/></Icon_Settings_50_Light>
                        </Container_Text_20>
                        <Text_A_25_Light>Página no encotrada...</Text_A_25_Light>
                        <Tooltip title='Regresar' placement="top">
                            <Button_Icon_White_200_Light onClick={() => errorReturn()}><FaHome/></Button_Icon_White_200_Light>
                        </Tooltip>
                        <Img_Logo_Error_Light/>
                        <Alert_Styles>
                            <Toaster
                                visibleToasts={3}
                                richColors
                                theme='dark'
                                position='top-right'
                            />
                        </Alert_Styles>
                    </Container_Page_Error_Light>
                </>
            ):(
                <>
                    <Container_Page_Error_Dark>
                        <Icon_Warning_250_Dark><IoIosWarning/></Icon_Warning_250_Dark>
                        <Container_Text_20>
                            <Text_Title_Fade_50_Dark>Ooops...</Text_Title_Fade_50_Dark>
                            <Icon_Settings_50_Dark><IoSettings/></Icon_Settings_50_Dark>
                        </Container_Text_20>
                        <Text_A_25_Dark>Página no encotrada...</Text_A_25_Dark>
                        <Tooltip title='Regresar' placement="top">
                            <Button_Icon_White_200_Dark onClick={() => errorReturn()}><FaHome/></Button_Icon_White_200_Dark>
                        </Tooltip>
                        <Img_Logo_Error_Dark/>
                        <Alert_Styles>
                            <Toaster
                                visibleToasts={3}
                                richColors
                                theme='dark'
                                position='top-right'
                            />
                        </Alert_Styles>
                    </Container_Page_Error_Dark>
                </>
            )}
        </>
    );
}