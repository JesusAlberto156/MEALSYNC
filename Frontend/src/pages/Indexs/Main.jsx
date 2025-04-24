//____________IMPORT/EXPORT____________
// Componentes de React
import { useContext } from 'react';
import { Outlet } from 'react-router-dom';
// Componentes de React externos
import { Toaster } from "sonner";
// Contextos
import { ThemeModeContext } from '../../contexts/ViewsProvider';
import { LoggedLoggedContext,LoggedTypeContext } from '../../contexts/SessionProvider';
// Estilos personalizados
import { Container_Page,Container_Page_Logged } from "../../components/styled/Containers";
import { Alert_Styles } from '../../components/styled/Alerts';
// Componentes personalizados
import Footer from "../../components/navegation/Footer";
import Side_Bar from '../../components/navegation/Sidebar';
//____________IMPORT/EXPORT____________

// Página para gestionar la parte principal de las paginas
export default function Index_Main(){
    // Constantes con el valor de los contextos
    const [themeMode] = useContext(ThemeModeContext);
    const [isLoggedLogged] = useContext(LoggedLoggedContext);
    const [isLoggedType] = useContext(LoggedTypeContext);
    // Estructura del componente
    return(
        <>
            <Container_Page>
                <Container_Page_Logged className='bg-pan-bl' ThemeMode={themeMode} TypeUser={isLoggedType} Logged={isLoggedLogged}>
                    <Side_Bar/>
                    <Outlet/>
                </Container_Page_Logged> 
                <Footer/>
                <Alert_Styles>
                    <Toaster
                        visibleToasts={1}
                        richColors
                        theme='light'
                        position='top-right'
                    />
                </Alert_Styles> 
            </Container_Page>
        </>
    );
};