//____________IMPORT/EXPORT____________
// Hooks de React
import { useContext,useEffect } from "react";
import { useNavigate } from "react-router-dom";
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
import { Container_Page_Loading,Container_Row_80_Center } from "../../components/styled/Containers";
import { Text_Title_42_Center } from "../../components/styled/Text";
import { Icon_Rotate_Gray_50 } from "../../components/styled/Icons";
import { Alert_Greeting } from '../../components/styled/Alerts';
//____________IMPORT/EXPORT____________

// Página para cargar otra página
export default function Loading(){
    // Constantes con el valor de los contextos 
    const [themeMode] = useContext(ThemeModeContext);
    const [isLoggedType] = useContext(LoggedTypeContext);
    // useEffect con el titulo de la página
    useEffect(() => {
        document.title = "MEALSYNC_Cargando...";

        const Image = themeMode ? Logo_Hospital_Light : Logo_Hospital_Dark;

        Alert_Greeting("MEALSYNC",'¡Cargando!...',themeMode,Image);

        setTimeout(() => {
            const route = sessionStorage.getItem('Route');
                
            if(route){
                navigate(route,{ replace: true });
            }else{
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
                <Container_Row_80_Center>
                    <Text_Title_42_Center ThemeMode={themeMode}>Cargando...</Text_Title_42_Center>
                    <Icon_Rotate_Gray_50><IoSettings/></Icon_Rotate_Gray_50>
                </Container_Row_80_Center>
            </Container_Page_Loading>
        </>
    );
}