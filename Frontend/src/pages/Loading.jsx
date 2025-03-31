//____________IMPORT/EXPORT____________
// Hooks de React
import { useContext } from "react";
// Componentes de React externos

// Servicios

// Rutas

// Contextos
import { modeContext } from "../contexts/VariablesProvider";
// Hooks personalizados

//__________ICONOS__________
// Icono de carga
import { IoSettings } from "react-icons/io5";
//__________ICONOS__________
// Estilos personalizados
import { Container_Page_Loading_Light,Container_Page_Loading_Dark,Container_Text_20 } from "../components/styled/Containers";
import { Text_Title_Fade_50_Light,Text_Title_Fade_50_Dark } from "../components/styled/Text";
import { Icon_Settings_50_Light,Icon_Settings_50_Dark } from "../components/styled/Icons";
// Componentes personalizados

//____________IMPORT/EXPORT____________

// Página para cargar otra página
const Loading = () => {
    // Constantes con el valor de los contextos 
    const [isMode] = useContext(modeContext);
    // Estructura del componente
    return(
        <>
            {isMode ? (
                <>
                    <Container_Page_Loading_Light>
                        <Container_Text_20>
                            <Text_Title_Fade_50_Light>Cargando...</Text_Title_Fade_50_Light>
                            <Icon_Settings_50_Light><IoSettings/></Icon_Settings_50_Light>
                        </Container_Text_20>
                    </Container_Page_Loading_Light>
                </>
            ):(
                <>
                    <Container_Page_Loading_Dark>
                        <Container_Text_20>
                            <Text_Title_Fade_50_Dark>Cargando...</Text_Title_Fade_50_Dark>
                            <Icon_Settings_50_Dark><IoSettings/></Icon_Settings_50_Dark>
                        </Container_Text_20>
                    </Container_Page_Loading_Dark>
                </>
            )}
        </>
    );
}

export default Loading;