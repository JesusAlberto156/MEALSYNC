//____________IMPORT/EXPORT____________
// Componentes de React
import { useContext } from 'react';
import { Outlet } from 'react-router-dom';
// Componentes de React externos
import { Toaster } from 'sonner';
// Servicios

// Contextos
import { themeModeContext,modalViewContext } from '../../contexts/ViewsProvider';
import { loggedContext } from '../../contexts/SessionProvider';
import { typeUserContext } from '../../contexts/VariablesProvider';
// Hooks personalizados

//__________ICONOS__________

//__________ICONOS__________
// Estilos personalizados
import { Container_Page,Container_Page_Background } from "../../components/styled/Containers";
// Componentes personalizados
import Footer from "../../components/navegation/Footer";
import Setting_Bar from '../../components/navegation/SettingBar';
import Side_Bar from '../../components/navegation/Sidebar';
import Out_Login from '../../components/modals/General/OutLogin';
//____________IMPORT/EXPORT____________

// Página para gestionar la parte principal de las paginas
export default function Index_Main(){
    // Constantes con el valor de los contextos
    const [themeMode] = useContext(themeModeContext);
    const [isLogged] = useContext(loggedContext);
    const [isTypeUser] = useContext(typeUserContext);
    const [currentMView] = useContext(modalViewContext);
    // Estructura del componente
    return(
        <>
            <Container_Page>
                {isLogged ? (
                    <>
                        <Side_Bar/>
                        <Container_Page_Background ThemeMode={themeMode} TypeUser={isTypeUser} Logged={isLogged}>
                            <Outlet/>
                            {currentMView === 'Out-Login' ? (
                                <Out_Login/>
                            ):(
                                <></>
                            )}
                        </Container_Page_Background> 
                    </>
                ):(
                    <>
                        <Container_Page_Background ThemeMode={themeMode} TypeUser={isTypeUser} Logged={isLogged}>
                            <Setting_Bar/>
                            <Outlet/>
                        </Container_Page_Background> 
                    </>
                )}
                <Footer/>
            </Container_Page>
        </>
    );
};