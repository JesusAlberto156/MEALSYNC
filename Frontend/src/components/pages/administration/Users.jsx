//____________IMPORT/EXPORT____________
// Hooks de React
import { useContext } from "react";
// Componentes de React externos

// Servicios

// Rutas

// Contextos
import { sidebarViewContext,navbarViewContext } from "../../../contexts/ViewsProvider";
// Hooks personalizados

//__________ICONOS__________

//__________ICONOS__________
// Estilos personalizados

// Componentes personalizados
import Setting from "../../navegation/Setting";
import Navbar from "../../navegation/Navbar"
import SearchBar from '../../navegation/SearchBar'
import TableUsers from "../../tables/TableUsers";
import TablePermissions from "../../tables/TablePermissions";
import TableStatus from '../../tables/TableStatus';
//____________IMPORT/EXPORT____________

// Componente para mostrar la seccion de usuarios en administración
export default function Users(){
    // Constantes con el valor de los contextos 
    const [currentNView] = useContext(navbarViewContext);
    const [currentSView] = useContext(sidebarViewContext);
    // Estructura del componente
    return(
        <> 
            <Setting/>
            <Navbar/> 
            <SearchBar/>  
            {currentSView === 'Users' && currentNView === 'Principal' ? (
                <TableUsers/>
            ):(
                <></>
            )}
            {currentSView === 'Users' && currentNView === 'Permissions' ? (
                <TablePermissions/>
            ):(
                <></>
            )}
            {currentSView === 'Users' && currentNView === 'Status' ? (
                <TableStatus/>
            ):(
                <></>
            )}
        </>
    )
}