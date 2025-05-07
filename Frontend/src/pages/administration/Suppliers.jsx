//____________IMPORT/EXPORT____________
// Componentes personalizados
import Nav_Bar from "../../components/navegation/Navbar";
import Search_Bar from '../../components/navegation/SearchBar';
import { Outlet } from "react-router-dom";
//____________IMPORT/EXPORT____________

// Componente para mostrar la seccion de proveedores en administración
export default function Suppliers(){
    // Estructura del componente
    return(
        <> 
            <Nav_Bar/>     
            <Search_Bar/>    
            <Outlet/> 
        </>
    )
}