//____________IMPORT/EXPORT____________
// Hooks de React
import { useContext,useEffect } from "react";
// Componentes de React externos

// Servicios

// Rutas

// Contextos
import { LoggedPermissionsContext } from "../../contexts/SessionProvider";
// Hooks personalizados

//__________ICONOS__________

//__________ICONOS__________
// Estilos personalizados
import { Container_Home_Section_Title } from "../../components/styled/Containers";
import { Text_Title_28_Black } from "../../components/styled/Text";
// Componentes personalizados
import Table_Total_Supplies from "../../components/tables/totals/Invetory/Supplies";
//____________IMPORT/EXPORT____________

// Componente para mostrar la seccion de inicio en administración/cocina
export default function Doctor_Orders(){
    // Constantes con el valor de los contextos 
    const [isLoggedPermissions] = useContext(LoggedPermissionsContext); 
    // Estructura del componente
    return(
        <> 
            
        </>
    )
}