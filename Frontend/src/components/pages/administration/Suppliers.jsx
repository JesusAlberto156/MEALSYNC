//____________IMPORT/EXPORT____________
// Hooks de React
import { useContext } from "react";
// Componentes de React externos

// Servicios

// Rutas

// Contextos
import { themeModeContext } from "../../../contexts/ViewsProvider";
// Hooks personalizados

//__________ICONOS__________

//__________ICONOS__________
// Estilos personalizados

// Componentes personalizados
import Setting_Bar from "../../navegation/SettingBar";
//____________IMPORT/EXPORT____________

// Componente para mostrar la seccion de proveedores en administración
export default function Suppliers(){
    // Constantes con el valor de los contextos 
    const [themeMode] = useContext(themeModeContext);
    // Estructura del componente
    return(
        <> 
            <Setting_Bar/>
            <h1>Modulo de Proveedores</h1>          
        </>
    )
}