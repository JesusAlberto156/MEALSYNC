//____________IMPORT/EXPORT____________
// Hooks de React
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
// Contextos
import { LoggedTypeContext } from "../../contexts/SessionProvider";
import { ThemeModeContext } from "../../contexts/ViewsProvider";
// Hooks personalizados
import { HandleNavbarView } from "../../hooks/Views";
import { HandleSidebarView } from "../../hooks/Views";
// Estilos personalizados
import { Container_Column_100_Center,Container_Row_100_Center,Container_Row_NG_100_Center,Container_Column_NG_100_Center } from "../../components/styled/Containers";
import { Button_Link_Blue } from "../../components/styled/Buttons";
// Componentes personalizados
import MyRadialBarChart from "../../components/charts/suppliers/RatedSuppliers";
//____________IMPORT/EXPORT____________

// Componente para mostrar la seccion de inicio en administración/cocina
export default function Administration_Suppliers(){
    // Constantes con el valor de los contextos 
    const [isLoggedType] = useContext(LoggedTypeContext);
    const [themeMode] = useContext(ThemeModeContext);
    // Constantes con la funcionalidad de los hooks
    const navigate = useNavigate();
    const handleSidebarView = HandleSidebarView();
    const handleNavbarView = HandleNavbarView();
    // Estructura del componente
    return(
        <> 
            {isLoggedType === 'Administrator' ? (
                <Container_Column_100_Center className={themeMode ? 'shadow-out-container-light-infinite' : 'shadow-out-container-dark-infinite'}>
                    
                    <MyRadialBarChart/>
                        
                </Container_Column_100_Center>  
            ):(
                <></>
            )}   
        </>
    )
}