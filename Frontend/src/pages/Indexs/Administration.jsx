//____________IMPORT/EXPORT____________
// Hooks de React
import { useContext,useEffect } from "react";
import { Outlet } from "react-router-dom";
// Contextos
import { SidebarContext,ThemeModeContext } from "../../contexts/ViewsProvider";
import { LoggedUserContext } from "../../contexts/SessionProvider";
import { RefAlertGreetingContext } from "../../contexts/RefsProvider";
import { SocketContext } from "../../contexts/SocketProvider";
import { StatusContext } from "../../contexts/UsersProvider";
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
    const [isStatus] = useContext(StatusContext);
    const [socket] = useContext(SocketContext);
    // Función para obtener la hora exacta del sistema
    function getLocalDateTimeOffset(hoursOffset = -7) {
        const now = new Date();
        now.setHours(now.getHours() + hoursOffset); // Restar 7 horas
        const pad = (n) => n.toString().padStart(2, '0');
        const year = now.getFullYear();
        const month = pad(now.getMonth() + 1);
        const day = pad(now.getDate());
        const hours = pad(now.getHours());
        const minutes = pad(now.getMinutes());
        const seconds = pad(now.getSeconds());
        return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    }
    // useEffect con el titulo de la página
    useEffect(() => {
        document.title = 'MEALSYNC_Administración';
        if(sessionStorage.getItem('Login') === 'true') return
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
    useEffect(() => {
        if(isStatus.length !== 0){
            if(sessionStorage.getItem('Login') === 'true') return
            socket.emit('Insert-Log-Status',isLoggedUser.usuario,getLocalDateTimeOffset(),'UPDATE',isStatus.find(status => status.idusuario === isLoggedUser.idusuario)?.idestatus,isLoggedUser.idusuario,'','1','');
            sessionStorage.setItem('Login','true');
        }
    },[isStatus])
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