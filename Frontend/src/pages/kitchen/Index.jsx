//____________IMPORT/EXPORT____________
// Hooks de React
import { Outlet } from "react-router-dom";
// Componentes personalizados
import Search_Bar from '../../components/navegation/searchbar/SearchBar'
//____________IMPORT/EXPORT____________

// Componente para mostrar la seccion de usuarios en cocina
export default function Kitchen_Index(){
    // Estructura del componente
    return(
        <> 
            <Search_Bar/>
            <Outlet/>
        </>
    )
}