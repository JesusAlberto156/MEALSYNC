//____________IMPORT/EXPORT____________
// Hooks de React
import { useContext,useEffect } from "react";
import { useNavigate } from "react-router-dom";
// Componentes de React externos
import { Toaster } from 'sonner';
// Servicios

// Rutas

// Contextos
import { themeModeContext } from "../contexts/ViewsProvider";
// Hooks personalizados

//__________ICONOS__________
// Icono de carga
import { IoSettings } from "react-icons/io5";
//__________ICONOS__________
// Estilos personalizados
import { Container_Page_Loading,Container_Text_20 } from "../components/styled/Containers";
import { Text_Title_Fade_50 } from "../components/styled/Text";
import { Icon_Gray_Rotate_50 } from "../components/styled/Icons";
import { Alert_Greeting,Alert_Styles } from '../components/styled/Alerts';
// Componentes personalizados

//____________IMPORT/EXPORT____________

// Página para cargar otra página
export default function Loading(){
    // Constantes con el valor de los contextos 
    const [themeMode] = useContext(themeModeContext);
    // useEffect con el titulo de la página
    useEffect(() => {
        document.title = "MEALSYNC_Cargando...";
        Alert_Greeting("MEALSYNC",'¡Cargando!...');
        setTimeout(() => {
            navigate('/Login',{ replace: true });                            
        },500);
    },[]);
    // Constantes con la funcionalidad de los hooks
    const navigate = useNavigate();
    // Estructura del componente
    return(
        <>
            <Container_Page_Loading ThemeMode={themeMode}>
                <Container_Text_20>
                    <Text_Title_Fade_50 ThemeMode={themeMode}>Cargando...</Text_Title_Fade_50>
                    <Icon_Gray_Rotate_50 ThemeMode={themeMode}><IoSettings/></Icon_Gray_Rotate_50>
                </Container_Text_20>
                <Alert_Styles ThemeMode={themeMode}>
                    <Toaster
                        visibleToasts={3}
                        richColors
                        theme='dark'
                        position='top-right'
                    />
                </Alert_Styles> 
            </Container_Page_Loading>
        </>
    );
}