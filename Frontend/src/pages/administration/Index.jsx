//____________IMPORT/EXPORT____________
// Hooks de React
import { useContext } from "react";
import { Outlet } from "react-router-dom";
// Contextos
import { ThemeModeContext,NavbarViewContext } from "../../contexts/ViewsProvider";
// Estilos personalizados
import { Img_Logo_Horizontal_Hospital_400 } from "../../components/styled/Imgs";
// Componentes personalizados
import Nav_Bar from "../../components/navegation/Navbar";
import Search_Bar from '../../components/navegation/SearchBar'
//____________IMPORT/EXPORT____________

// Componente para mostrar la seccion de usuarios en administración
export default function Administration_Index(){
    // Constantes con el valor de los contextos 
    const [themeMode] = useContext(ThemeModeContext);
    const [currentNView] = useContext(NavbarViewContext);
    // Estructura del componente
    return(
        <> 
            <Nav_Bar/> 
            {currentNView !== 'Tipos-Insumo' ? (
                <>
                    <Search_Bar/>
                </>
            ):(
                <></>
            )}
            <Outlet/>
            <Img_Logo_Horizontal_Hospital_400 ThemeMode={themeMode} className='pulsate-image'/>
        </>
    )
}