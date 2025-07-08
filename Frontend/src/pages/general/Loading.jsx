//____________IMPORT/EXPORT____________
// Hooks de React
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
//__________ICONOS__________
// Icono de carga
import { IoSettings } from "react-icons/io5";
//__________ICONOS__________
// Estilos personalizados
import { Container_Page_Loading,Container_Row_100_Center } from "../../components/styled/Containers";
import { Text_Title_40_White } from "../../components/styled/Text";
import { Icon_Rotate_Gray_50 } from "../../components/styled/Icons";
import { Alert_Swal_Greeting } from '../../components/styled/Alerts';
//____________IMPORT/EXPORT____________

// Página para cargar otra página
export default function Loading(){
    // useEffect con el titulo de la página
    useEffect(() => {
        document.title = "MEALSYNC_Cargando...";

        Alert_Swal_Greeting('¡Cargando!');

        setTimeout(() => {
            const route = sessionStorage.getItem('Ruta');
                
            if(route){
                navigate(route,{ replace: true });
            }else{
                navigate('/Login',{replace: true});
            }                   
        },3500);
    },[]);
    // Constantes con la funcionalidad de los hooks
    const navigate = useNavigate();
    // Estructura del componente
    return(
        <>
            <Container_Page_Loading>
                <Container_Row_100_Center>
                    <Text_Title_40_White>Cargando...</Text_Title_40_White>
                    <Icon_Rotate_Gray_50><IoSettings/></Icon_Rotate_Gray_50>
                </Container_Row_100_Center>
            </Container_Page_Loading>
        </>
    );
}