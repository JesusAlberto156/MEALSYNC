//____________IMPORT/EXPORT____________
// Hooks de React
import { useContext, useEffect } from "react";
import { Outlet } from "react-router-dom";
// Componentes de React externos

// Servicios

// Rutas

// Contextos
import { ThemeModeContext } from "../../contexts/ViewsProvider";
// Hooks personalizados

//__________ICONOS__________

//__________ICONOS__________
// Estilos personalizados
import { Img_Logo_Horizontal_Hospital_450 } from "../../components/styled/Imgs";
// Componentes personalizados
import Nav_Bar from "../../components/navegation/NavBar"
import Search_Bar from '../../components/navegation/SearchBar'

//____________IMPORT/EXPORT____________

// Componente para mostrar la seccion de usuarios en administración
export default function Users(){
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
            <Img_Logo_Horizontal_Hospital_450 ThemeMode={themeMode}/>
        </>
    )
}