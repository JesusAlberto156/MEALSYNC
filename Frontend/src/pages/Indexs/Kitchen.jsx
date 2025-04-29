//____________IMPORT/EXPORT____________
// Hooks de React
import { useContext,useEffect } from "react";
import { Outlet } from "react-router-dom";
// Contextos
import { SidebarContext,ThemeModeContext } from "../../contexts/ViewsProvider";
import { LoggedUserContext } from "../../contexts/SessionProvider";
//__________IMAGES____________
import Logo_Hospital_Light from '../../components/imgs/Logo-Hospital-Light.png';
import Logo_Hospital_Dark from '../../components/imgs/Logo-Hospital-Dark.png';
//__________IMAGES____________
// Estilos personalizados
import { Container_Page_Elements } from "../../components/styled/Containers";
import { Alert_Greeting } from "../../components/styled/Alerts";
import { RefAlertGreetingContext } from "../../contexts/RefsProvider";
// Componentes personalizados
import Setting_Bar from "../../components/navegation/SettingBar";
//____________IMPORT/EXPORT____________

// Página para mostrar el área de administración
export default function Index_Kitchen(){
    // Constantes con el valor de los contextos
    const [themeMode] = useContext(ThemeModeContext);
    const [isSidebar] = useContext(SidebarContext);
    const [isLoggedUser] = useContext(LoggedUserContext);
    const isAlertGreeting = useContext(RefAlertGreetingContext);
    // useEffect con el titulo de la página
    useEffect(() => {
        document.title = 'MEALSYNC_Cocina';

        const showAlerts = async () => {
            const Image = themeMode ? Logo_Hospital_Light : Logo_Hospital_Dark;
            
            await Alert_Greeting('MEALSYNC',`¡Bienvenido(a)! ${isLoggedUser.nombrecorto}`,themeMode,Image);

            await Alert_Greeting('MEALSYNC','¡Le ofrece las siguientes funcionaidades!',themeMode,Image);
        }

        if(!isAlertGreeting.current){
            showAlerts();
            isAlertGreeting.current = true;
        }
    },[]);
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