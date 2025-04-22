//____________IMPORT/EXPORT____________
// Hooks de React
import { useEffect,useContext } from "react";
import { Outlet, useNavigate } from "react-router-dom";
// Componentes de React externos

// Contextos
import { ThemeModeContext,SidebarContext } from "../../contexts/ViewsProvider";
//__________IMAGES____________
import Logo_Hospital_Light from '../../components/imgs/Logo-Hospital-Light.png';
import Logo_Hospital_Dark from '../../components/imgs/Logo-Hospital-Dark.png';
//__________IMAGES____________
// Estilos personalizados
import { Container_Page_Elements } from "../../components/styled/Containers";
import { Alert_Greeting } from "../../components/styled/Alerts";
// Componentes personalizados
import Setting_Bar from "../../components/navegation/SettingBar";
//____________IMPORT/EXPORT____________

// Página para mostrar el área de administración
export default function Index_Administration(){
    // Constantes con el valor de los contextos
    const [themeMode] = useContext(ThemeModeContext);
    const [isSidebar] = useContext(SidebarContext);
    // useEffect con el titulo de la página
    useEffect(() => {
        document.title = 'MEALSYNC_Administración';
        const showAlerts = async () => {
            const Image = themeMode ? Logo_Hospital_Light : Logo_Hospital_Dark;
            const Color = themeMode ? '#3a5dae' : '#527ee7';
            
            await Alert_Greeting('MEALSYNC',`¡Bienvenido(a)! ${isUser.nombre}`,themeMode,Image,Color);

            await Alert_Greeting('MEALSYNC','¡Le ofrece las siguientes funcionaidades!',themeMode,Image,Color);
        }

        showAlerts();
    },[]);
    // Constantes con la funcionalidad de los hooks
    const navigate = useNavigate();
    // Estructura del componente
    return(
        <>
            <Container_Page_Elements sidebarVisible={isSidebar}>
                <Setting_Bar/>
                <Outlet/>
            </Container_Page_Elements>
        </>
    );
}