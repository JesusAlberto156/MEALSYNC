//____________IMPORT/EXPORT____________
// Hooks de React
import { useContext } from "react";
// Componentes de React externos

// Servicios

// Rutas

// Contextos
import { sidebarViewContext,navbarViewContext,themeModeContext } from "../../contexts/ViewsProvider";
// Hooks personalizados

//__________ICONOS__________

//__________ICONOS__________
// Estilos personalizados
import { Img_Logo_Horizontal_Hospital_450 } from "../../components/styled/Imgs";
// Componentes personalizados
import Nav_Bar from "../../components/navegation/NavBar"
import Search_Bar from '../../components/navegation/SearchBar'
import TableUsers from "../../components/tables/TableUsers";
import TablePermissions from "../../components/tables/TablePermissions";
import TableStatus from '../../components/tables/TableStatus';
//____________IMPORT/EXPORT____________

// Componente para mostrar la seccion de usuarios en administración
export default function Users(){
    // Constantes con el valor de los contextos 
    const [themeMode] = useContext(themeModeContext);
    const [currentNView] = useContext(navbarViewContext);
    const [currentSView] = useContext(sidebarViewContext);
    // Estructura del componente
    return(
        <> 
            <Nav_Bar/> 
            <Search_Bar/>  
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
            <Img_Logo_Horizontal_Hospital_450 ThemeMode={themeMode}/>
        </>
    )
}