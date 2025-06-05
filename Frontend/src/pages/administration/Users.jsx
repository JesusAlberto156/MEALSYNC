//____________IMPORT/EXPORT____________
// Hooks de React
import { useContext } from "react";
// Componentes de React externos

// Servicios

// Rutas

// Contextos
import { LoggedTypeContext } from "../../contexts/SessionProvider";
import { ThemeModeContext } from "../../contexts/ViewsProvider";
// Hooks personalizados

//__________ICONOS__________

//__________ICONOS__________
// Estilos personalizados
import { Container_Column_100_Center,Container_Row_100_Center } from "../../components/styled/Containers";
import { Text_Title_30_Center } from "../../components/styled/Text";
// Componentes personalizados
import Chart_Activity from "../../components/charts/users/Activity";
//____________IMPORT/EXPORT____________

// Componente para mostrar la seccion de inicio en administración/cocina
export default function Administration_Users(){
    // Constantes con el valor de los contextos 
    const [isLoggedType] = useContext(LoggedTypeContext);
    const [themeMode] = useContext(ThemeModeContext);
    // Estructura del componente
    return(
        <> 
            {isLoggedType === 'Administrator' ? (
                <Container_Column_100_Center>
                    <Container_Row_100_Center>
                        <Text_Title_30_Center ThemeMode={themeMode}>SECCIÓN DE USUARIOS</Text_Title_30_Center>
                    </Container_Row_100_Center>
                    <Container_Row_100_Center>
                        <Chart_Activity/>
                        <Container_Column_100_Center>

                        </Container_Column_100_Center>
                    </Container_Row_100_Center>
                </Container_Column_100_Center>  
            ):(
                <></>
            )}   
        </>
    )
}