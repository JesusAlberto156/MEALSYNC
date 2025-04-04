//____________IMPORT/EXPORT____________
// Hooks de React
import { useContext,useEffect } from "react";
import { useNavigate } from "react-router-dom";
// Componentes de React externos
import { Toaster } from 'sonner';
// Servicios

// Rutas

// Contextos

// Hooks personalizados

//__________ICONOS__________
// Icono de carga
import { IoSettings } from "react-icons/io5";
//__________ICONOS__________
// Estilos personalizados
import { Container_Page_Loading_Light,Container_Page_Loading_Dark,Container_Text_20 } from "../components/styled/Containers";
import { Text_Title_Fade_50_Light,Text_Title_Fade_50_Dark } from "../components/styled/Text";
import { Icon_Settings_50_Light,Icon_Settings_50_Dark } from "../components/styled/Icons";
import { Alert_Greeting_Light,Alert_Greeting_Dark,Alert_Styles } from '../components/styled/Alerts';
// Componentes personalizados

//____________IMPORT/EXPORT____________

// Página para cargar otra página
const Loading = () => {
    // Constantes con el valor de los contextos 

    // useEffect con el titulo de la página
    useEffect(() => {
        document.title = "MEALSYNC_Cargando...";
        if(true){
            Alert_Greeting_Light("MEALSYNC",'¡Cargando!...');
        }else{
            Alert_Greeting_Dark("MEALSYNC",'¡Cargando!...');
        }
        setTimeout(() => {
            navigate('/Login',{ replace: true });                            
        },500);
    },[]);
    // Constantes con la funcionalidad de los hooks
    const navigate = useNavigate();
    // Estructura del componente
    return(
        <>
                    <Container_Page_Loading_Light>
                        <Container_Text_20>
                            <Text_Title_Fade_50_Light>Cargando...</Text_Title_Fade_50_Light>
                            <Icon_Settings_50_Light><IoSettings/></Icon_Settings_50_Light>
                        </Container_Text_20>
                        <Alert_Styles>
                            <Toaster
                                visibleToasts={3}
                                richColors
                                theme='dark'
                                position='top-right'
                            />
                        </Alert_Styles> 
                    </Container_Page_Loading_Light>
        </>
    );
}

export default Loading;