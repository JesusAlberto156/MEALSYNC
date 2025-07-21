//____________IMPORT/EXPORT____________
// Hooks de React
import { Outlet } from "react-router-dom";
// Componentes personalizados
import Nav_Bar from "../../components/navegation/Navbar";
import Search_Bar from '../../components/navegation/SearchBar'
//____________IMPORT/EXPORT____________

// Componente para mostrar la seccion de usuarios en administración
export default function Administration_Index(){
    // Estructura del componente
    return(
        <> 
            <Nav_Bar/> 
            <Search_Bar/>
            <Outlet/>
        </>
    )
}