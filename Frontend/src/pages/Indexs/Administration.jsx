//____________IMPORT/EXPORT____________
// Hooks de React
import { useContext,useEffect } from "react";
import { Outlet } from "react-router-dom";
// Contextos
import { SidebarContext,ThemeModeContext } from "../../contexts/ViewsProvider";
import { LoggedUserContext } from "../../contexts/SessionProvider";
import { RefAlertGreetingContext } from "../../contexts/RefsProvider";
import { SocketContext } from "../../contexts/SocketProvider";
import { UserUpdatedContext } from "../../contexts/VariablesProvider";
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
    const [isLoggedUser] = useContext(LoggedUserContext);
    const isAlertGreeting = useContext(RefAlertGreetingContext);
    const [socket] = useContext(SocketContext);
    const [isUserUpdated,setIsUserUpdated] = useContext(UserUpdatedContext);
    // useEffect con el titulo de la página
    useEffect(() => {
        document.title = 'MEALSYNC_Administración';

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
    // useEffect para los eventos de socket
    useEffect(() => {
        const handleMessagePermission = (message,user) => {
            setIsUserUpdated(user)
            console.log(message,user);
        };

        const handleMessagePermissions = (message,user) => {
            setIsUserUpdated(user)
            console.log(message,user);
        };

        socket.on('Message-Permission',handleMessagePermission);
        socket.on('Message-Permissions',handleMessagePermissions);

        return () => {
            socket.off('Message-Permission',handleMessagePermission);
            socket.off('Message-Permissions',handleMessagePermissions);
        }
    },[socket]);
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