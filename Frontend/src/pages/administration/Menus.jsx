//____________IMPORT/EXPORT____________
// Hooks de React
import { useContext,useEffect } from "react";
// Componentes de React externos

// Servicios

// Rutas

// Contextos
import { ThemeModeContext } from "../../contexts/ViewsProvider";
// Hooks personalizados

//__________ICONOS__________

//__________ICONOS__________
// Estilos personalizados

// Componentes personalizados

//____________IMPORT/EXPORT____________

// Componente para mostrar la seccion de menus en administración
export default function Menus(){
    // Constantes con el valor de los contextos 
    const [themeMode] = useContext(ThemeModeContext);
    // useEffect con el titulo de la página
    useEffect(() => {
        document.title = 'MEALSYNC_Administración'
    },[]);
    // Estructura del componente
    return(
        <> 
            <h1>Modulo de Menús</h1>          
        </>
    )
}