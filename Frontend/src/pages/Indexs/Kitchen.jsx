//____________IMPORT/EXPORT____________
// Hooks de React
import { useEffect,useContext } from "react";
import { Outlet, useNavigate } from "react-router-dom";
// Componentes de React externos
import { Toaster } from "sonner";
// Contextos
import { ThemeModeContext,SidebarContext } from "../../contexts/ViewsProvider";
// Estilos personalizados
import { Container_Page_Elements } from "../../components/styled/Containers";
import { Alert_Styles } from "../../components/styled/Alerts";
// Componentes personalizados
import Setting_Bar from "../../components/navegation/SettingBar";
//____________IMPORT/EXPORT____________

export default function Index_Kitchen(){
    // Constantes con el valor de los contextos
    const [themeMode] = useContext(ThemeModeContext);
    const [isSidebar] = useContext(SidebarContext);
    // Constantes con la funcionalidad de los hooks
    const navigate = useNavigate();
    // Estructura del componente
    return(
        <>
            <Container_Page_Elements sidebarVisible={isSidebar}>
                <Setting_Bar/>
                <Outlet/>
            </Container_Page_Elements>
            <Alert_Styles ThemeMode={themeMode}>
                <Toaster
                    visibleToasts={3}
                    richColors
                    theme='dark'
                    position='top-right'
                />
            </Alert_Styles> 
        </>
    );
}