//____________IMPORT/EXPORT____________
// Hooks de React
import { useContext,useEffect } from "react";
// Componentes de React externos

// Servicios

// Rutas

// Contextos
import { ThemeModeContext } from "../../contexts/ViewsProvider";
// Hooks personalizados

//__________ICONOS__________

//__________ICONOS__________
// Estilos personalizados

// Componentes personalizados
import Nav_Bar from "../../components/navegation/NavBar";
import Search_Bar from '../../components/navegation/SearchBar';
import { Outlet } from "react-router-dom";
//____________IMPORT/EXPORT____________

// Componente para mostrar la seccion de inventario en administración
export default function Inventory(){
    // Constantes con el valor de los contextos 
    const [themeMode] = useContext(ThemeModeContext);
    // useEffect con el titulo de la página
    useEffect(() => {
        document.title = 'MEALSYNC_Administración'
    },[]);
    // Estructura del componente
    return(
        <> 
            <Nav_Bar/>     
            <Search_Bar/>    
            <Outlet/>     
        </>
    )
}