//____________IMPORT/EXPORT____________
// Hooks de React
import { useContext } from "react";
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

// Componente para mostrar la seccion de inventario en administración
export default function Inventory(){
    // Constantes con el valor de los contextos 
    const [themeMode] = useContext(themeModeContext);
    // Estructura del componente
    return(
        <> 
            <h1>Modulo de Inventario</h1>          
        </>
    )
}