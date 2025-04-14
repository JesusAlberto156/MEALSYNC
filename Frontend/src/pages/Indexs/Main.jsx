//____________IMPORT/EXPORT____________
// Componentes de React
import { useContext } from 'react';
import { Outlet } from 'react-router-dom';
// Contextos
import { themeModeContext } from '../../contexts/ViewsProvider';
import { loggedContext } from '../../contexts/SessionProvider';
import { typeUserContext } from '../../contexts/VariablesProvider';
// Estilos personalizados
import { Container_Page,Container_Page_Login,Container_Page_Logged } from "../../components/styled/Containers";
// Componentes personalizados
import Footer from "../../components/navegation/Footer";
import Setting_Bar from '../../components/navegation/SettingBar';
import Side_Bar from '../../components/navegation/Sidebar';
//____________IMPORT/EXPORT____________

// Página para gestionar la parte principal de las paginas
export default function Index_Main(){
    // Constantes con el valor de los contextos
    const [themeMode] = useContext(themeModeContext);
    const [isLogged] = useContext(loggedContext);
    const [isTypeUser] = useContext(typeUserContext);
    // Estructura del componente
    return(
        <>
            <Container_Page>
                {isLogged ? (
                    <>
                        <Container_Page_Logged className='bg-pan-bl' ThemeMode={themeMode} TypeUser={isTypeUser} Logged={isLogged}>
                            <Side_Bar/>
                            <Outlet/>
                        </Container_Page_Logged> 
                    </>
                ):(
                    <>
                        <Container_Page_Login className='bg-pan-bl' ThemeMode={themeMode}>
                            <Setting_Bar/>
                            <Outlet/>
                        </Container_Page_Login> 
                    </>
                )}
                <Footer/>
            </Container_Page>
        </>
    );
};