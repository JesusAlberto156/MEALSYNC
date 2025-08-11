//____________IMPORT/EXPORT____________
// Componentes personalizados
import Administration_Users from "./Users";
import Administration_Suppliers from "./Suppliers";
import Administration_Supplies from "./Supplies";
import Administration_Orders from "./Orders";
//____________IMPORT/EXPORT____________

// Componente para mostrar la seccion de inicio en administración/cocina
export default function Administration_Home(){
    // Constantes con el valor de los contextos 

    // Estructura del componente
    return(
        <> 
            <Administration_Users/>
            <Administration_Suppliers/>
            <Administration_Supplies/>
            <Administration_Orders/>
        </>
    )
}