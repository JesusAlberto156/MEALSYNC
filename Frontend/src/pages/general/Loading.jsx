//____________IMPORT/EXPORT____________
// Hooks de React
import { useEffect,useContext } from "react";
import { useNavigate } from "react-router-dom";
// Contextos
import { SidebarContext } from "../../contexts/ViewsProvider";
// Hooks personalizados
import { ResetSearchTerms,ResetSelectedTables,ResetSelectedOptions,ResetLogin } from "../../hooks/Texts";
import { ResetViewsAll,ResetVariablesAll,ResetLoggeds } from "../../hooks/Session";
//__________IMAGENES__________
import Logo_Hospital from '../../components/imgs/Logo-Hospital.png'
//__________IMAGENES__________
//__________ICONOS__________
// Icono de carga
import { IoSettings } from "react-icons/io5";
//__________ICONOS__________
// Estilos personalizados
import { Container_Page_Loading,Container_Row_100_Center,Container_Modal_Image } from "../../components/styled/Containers";
import { Text_Title_40_White } from "../../components/styled/Text";
import { Icon_Rotate_Gray_50 } from "../../components/styled/Icons";
import { Alert_Swal_Greeting } from '../../components/styled/Alerts';
import { Image_Modal_Fixed } from "../../components/styled/Imgs";
//____________IMPORT/EXPORT____________

// Página para cargar otra página
export default function Loading(){
    // Constante con el valor de los contextos
    const [isSidebar,setIsSidebar] = useContext(SidebarContext);
    // useEffect con el titulo de la página
    useEffect(() => {
        document.title = "MEALSYNC_Cargando...";

        Alert_Swal_Greeting('¡Cargando!');

        setTimeout(() => {
            const route = sessionStorage.getItem('Ruta');
            const sidebar = sessionStorage.getItem('Estado del Sidebar');

            if(route){
                resetSearchTerms();
                resetSelectedOptions();
                resetSelectedTables();
                if(sidebar === 'true'){
                    setIsSidebar(true);
                }
                return navigate(route,{ replace: true });
            }else{
                resetLogin();
                resetViewsAll();
                resetVariablesAll();
                resetLoggeds();
                resetSearchTerms();
                resetSelectedOptions();
                resetSelectedTables();
                return navigate('/Login',{replace: true});
            }                   
        },3500);
    },[]);
    // Constantes con la funcionalidad de los hooks
    const navigate = useNavigate();
    const resetSearchTerms = ResetSearchTerms();
    const resetSelectedOptions = ResetSelectedOptions();
    const resetSelectedTables = ResetSelectedTables();
    const resetLogin = ResetLogin();
    const resetViewsAll = ResetViewsAll();
    const resetVariablesAll = ResetVariablesAll();
    const resetLoggeds = ResetLoggeds();
    // Estructura del componente
    return(
        <>
            <Container_Page_Loading>
                <Container_Modal_Image>
                    <Image_Modal_Fixed src={Logo_Hospital}/>
                </Container_Modal_Image>
                <Container_Row_100_Center>
                    <Text_Title_40_White>Cargando...</Text_Title_40_White>
                    <Icon_Rotate_Gray_50><IoSettings/></Icon_Rotate_Gray_50>
                </Container_Row_100_Center>
            </Container_Page_Loading>
        </>
    );
}