//____________IMPORT/EXPORT____________
// Hooks de React
import { useContext,useEffect } from "react";
// Componentes de React externos

// Servicios

// Rutas

// Contextos

// Hooks personalizados

//__________ICONOS__________

//__________ICONOS__________
// Estilos personalizados

// Componentes personalizados
import Administration_Users from "./Users";
import Administration_Suppliers from "./Suppliers";
//____________IMPORT/EXPORT____________

// Componente para mostrar la seccion de inicio en administración/cocina
export default function Administration_Home(){
    // Constantes con el valor de los contextos 

    // Estructura del componente
    return(
        <> 
            <Administration_Users/>
            <Administration_Suppliers/>
        </>
    )
}