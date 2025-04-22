//____________IMPORT/EXPORT____________
// Hooks de React
import { useContext,useEffect } from "react";
import { useNavigate } from "react-router-dom";
// Componentes de React externos
import { Toaster } from 'sonner';
// Servicios

// Rutas

// Contextos
import { ThemeModeContext } from "../../contexts/ViewsProvider";
import { LoggedTypeContext } from "../../contexts/SessionProvider";
//__________ICONOS__________
// Icono de carga
import { IoSettings } from "react-icons/io5";
//__________ICONOS__________
//__________IMAGES____________
import Logo_Hospital_Light from '../../components/imgs/Logo-Hospital-Light.png';
import Logo_Hospital_Dark from '../../components/imgs/Logo-Hospital-Dark.png';
//__________IMAGES____________
// Estilos personalizados
import { Container_Page_Loading,Container_Text_20 } from "../../components/styled/Containers";
import { Text_Title_42_Center } from "../../components/styled/Text";
import { Icon_Gray_Rotate_50 } from "../../components/styled/Icons";
import { Alert_Greeting,Alert_Styles } from '../../components/styled/Alerts';
// Componentes personalizados

//____________IMPORT/EXPORT____________

// Página para cargar otra página
export default function Loading(){
    // Constantes con el valor de los contextos 
    const [themeMode] = useContext(ThemeModeContext);
    const [isTypeUser] = useContext(LoggedTypeContext);
    // useEffect con el titulo de la página
    useEffect(() => {
        document.title = "MEALSYNC_Cargando...";

        const Image = themeMode ? Logo_Hospital_Light : Logo_Hospital_Dark;
        const Color = themeMode ? '#3a5dae' : '#527ee7';

        Alert_Greeting("MEALSYNC",'¡Cargando!...',themeMode,Image,Color);

        setTimeout(() => {
            if(isTypeUser === 'Cook' || isTypeUser === 'Nutritionist' || isTypeUser === 'Doctor'){
                navigate('/Kitchen/Home',{replace: true});
            }
            if(isTypeUser==='Administrator' || isTypeUser==='Chef' || isTypeUser==='Storekeeper'){
                navigate('/Administration/Home',{replace: true});
            }
            if(isTypeUser === ''){
                navigate('/Login',{replace: true});
            }                       
        },1000);
    },[]);
    // Constantes con la funcionalidad de los hooks
    const navigate = useNavigate();
    // Estructura del componente
    return(
        <>
            <Container_Page_Loading ThemeMode={themeMode}>
                <Container_Text_20>
                    <Text_Title_42_Center ThemeMode={themeMode}>Cargando...</Text_Title_42_Center>
                    <Icon_Gray_Rotate_50 ThemeMode={themeMode}><IoSettings/></Icon_Gray_Rotate_50>
                </Container_Text_20>
                <Alert_Styles ThemeMode={themeMode}>
                    <Toaster
                        visibleToasts={3}
                        richColors
                        theme='dark'
                        position='top-right'
                    />
                </Alert_Styles> 
            </Container_Page_Loading>
        </>
    );
}