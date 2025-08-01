//____________IMPORT/EXPORT____________
// Componentes de React
import { useContext } from 'react';
import { Outlet } from 'react-router-dom';
// Componentes de React externos
import { Toaster } from "sonner";
// Contextos
import { LoggedLoggedContext,LoggedTypeContext } from '../../contexts/SessionProvider';
import { SidebarViewContext,NavbarViewContext } from '../../contexts/ViewsProvider';
// Estilos personalizados
import { Container_Page,Container_Page_Logged } from "../../components/styled/Containers";
import { Alert_Sonner_Styles } from '../../components/styled/Alerts';
// Componentes personalizados
import Side_Bar from '../../components/navegation/sidebar/Sidebar';
//____________IMPORT/EXPORT____________

// Página para gestionar la parte principal de las paginas
export default function Index_Main(){
    // Constantes con el valor de los contextos
    const [isLoggedLogged] = useContext(LoggedLoggedContext);
    const [isLoggedType] = useContext(LoggedTypeContext);
    const [currentSView] = useContext(SidebarViewContext);
    const [currentNView] = useContext(NavbarViewContext);
    // Estructura del componente
    return(
        <>
            <Container_Page>
                <Container_Page_Logged TypeUser={isLoggedType} Logged={isLoggedLogged} Sidebar={currentSView} Navbar={currentNView}>
                    <Side_Bar/>
                    <Outlet/>
                </Container_Page_Logged> 
                <Alert_Sonner_Styles>
                    <Toaster
                        richColors
                        visibleToasts={5}
                        expand={true}
                    />
                </Alert_Sonner_Styles> 
            </Container_Page>
        </>
    );
};