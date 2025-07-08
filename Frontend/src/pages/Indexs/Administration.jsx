//____________IMPORT/EXPORT____________
// Hooks de React
import { useContext,useEffect } from "react";
import { Outlet } from "react-router-dom";
// Contextos
import { SidebarContext } from "../../contexts/ViewsProvider";
import { LoggedUserContext } from "../../contexts/SessionProvider";
import { RefAlertGreetingContext } from "../../contexts/RefsProvider";
// Estilos personalizados
import { Container_Page_Elements } from "../../components/styled/Containers";
import { Alert_Swal_Greeting } from "../../components/styled/Alerts";
// Componentes personalizados
import Setting_Bar from "../../components/navegation/SettingBar";
import Footer from "../../components/navegation/Footer";
//____________IMPORT/EXPORT____________

// Página para mostrar el área de administración
export default function Index_Administration(){
    // Constantes con el valor de los contextos
    const [isSidebar] = useContext(SidebarContext);
    const [isLoggedUser] = useContext(LoggedUserContext);
    const isAlertGreeting = useContext(RefAlertGreetingContext);
    // useEffect con el titulo de la página
    useEffect(() => {
        document.title = 'MEALSYNC_Administración';
        if(sessionStorage.getItem('Login') === 'true') return
        const showAlerts = async () => {
            await Alert_Swal_Greeting(`¡Bienvenido(a)! ${isLoggedUser.nombrecorto}`);
            await Alert_Swal_Greeting('¡Le ofrece las siguientes funcionaidades!');
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
                <Footer/>
            </Container_Page_Elements> 
        </>
    );
}