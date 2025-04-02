//____________IMPORT/EXPORT____________
// Hooks de React
import { useContext } from "react";
// Componentes de React externos

// Servicios

// Rutas

// Contextos
import { sidebarContext,navbarContext } from "../../../contexts/ViewsProvider";
// Hooks personalizados

//__________ICONOS__________

//__________ICONOS__________
// Estilos personalizados

// Componentes personalizados
import Setting from "../../setting/Setting";
import Navbar from "../../navbar/Navbar"
import SearchBar from '../../searchbar/SearchBar'
import TableUsers from "../../tables/TableUsers";
import TablePermissions from "../../tables/TablePermissions";
import TableStatus from '../../tables/TableStatus';
//____________IMPORT/EXPORT____________

// Componente para mostrar la seccion de usuarios en administración
export default function Users(){
    // Constantes con el valor de los contextos 
    const [isSidebar] = useContext(sidebarContext);
    const [isNavbar] = useContext(navbarContext);
    // Estructura del componente
    return(
        <> 
            <Setting/>
            <Navbar/> 
            <SearchBar/>  
            
        </>
    )
}