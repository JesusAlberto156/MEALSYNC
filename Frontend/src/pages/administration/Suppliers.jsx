//____________IMPORT/EXPORT____________
// Hooks de React
import { useContext,useEffect } from "react";
// Componentes de React externos

// Servicios

// Rutas

// Contextos
import { themeModeContext } from "../../contexts/ViewsProvider";
// Hooks personalizados

//__________ICONOS__________

//__________ICONOS__________
// Estilos personalizados

// Componentes personalizados
//____________IMPORT/EXPORT____________

// Componente para mostrar la seccion de proveedores en administración
export default function Suppliers(){
    // Constantes con el valor de los contextos 
    const [themeMode] = useContext(themeModeContext);
    // useEffect con el titulo de la página
    useEffect(() => {
        document.title = 'MEALSYNC_Administración'
    },[]);
    // Estructura del componente
    return(
        <> 
            <h1>Modulo de Proveedores</h1>          
        </>
    )
}