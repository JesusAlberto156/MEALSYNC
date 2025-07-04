//____________IMPORT/EXPORT____________
// Hooks de React
import { useContext,useEffect,useState } from "react";
import { useNavigate } from "react-router-dom";
// Componentes de React externos
import { Toaster } from "sonner";
// Contextos
import { ThemeModeContext } from '../../contexts/ViewsProvider';
//__________ICONOS__________
// Iconos de decoración de la página
import { IoIosWarning } from "react-icons/io";
import { IoSettings } from "react-icons/io5";
//__________ICONOS__________
//__________IMAGES____________
import Logo_Error_Light from '../../components/imgs/Logo-Error-Light.png';
import Logo_Error_Dark from '../../components/imgs/Logo-Error-Dark.png';
//__________IMAGES____________
// Estilos personalizados
import { Container_Page_Error,Container_Row_100_Center,Container_Column_90_Center } from "../../components/styled/Containers";
import { Icon_Rotate_Gray_50,Icon_Yellow_250 } from "../../components/styled/Icons";
import { Text_Span_20_Center_White,Text_Span_24_Center_White,Text_Title_40_White } from "../../components/styled/Text";
import { Alert_Error,Alert_Styles,Alert_Verification } from "../../components/styled/Alerts";
//____________IMPORT/EXPORT____________

// Página para captar los errores ocasionados por una mala ruta escrita
export default function Error(){
    // Constantes con el valor de los contextos 
    const [themeMode] = useContext(ThemeModeContext);
    // Constantes con el valor de los useState
    const [contador,setContador] = useState(5);
    // useEffect con el titulo de la página
    useEffect(() => {
        document.title = 'MEALSYNC_Error...'
        const Image = themeMode ? Logo_Error_Light : Logo_Error_Dark
        Alert_Error('MEALSYNC','¡Error, página no encontrada!...',themeMode,Image);
    },[])
    // useEffect con cuenta regresiva para regresar
    useEffect(() => {
        if(contador === 0){
            const promise = new Promise((resolve,reject) => {
                try{
                    setTimeout(() => {
                        resolve('¡Página encontrada!...');
                    },1000);
                    setTimeout(() => {
                        navigate('/',{replace: true});
                    },2000);
                } catch (e) {
                    return reject('¡Ocurrio un error inseperado!...');
                }
            });
    
            return Alert_Verification(promise,'Buscando página...');
        }

        const intervalo = setInterval(() => {
            setContador(prev => prev -1);
        },1000)

        return () => clearInterval(intervalo);
    },[contador])
    // Constantes con la funcionalidad de los hooks
    const navigate = useNavigate();
    // Estructura del componente
    return(
        <>
            <Container_Page_Error ThemeMode={themeMode}>
                <Container_Column_90_Center>
                    <Container_Row_100_Center>
                        <Icon_Yellow_250 ThemeMode={themeMode}><IoIosWarning/></Icon_Yellow_250>
                    </Container_Row_100_Center>
                    <Container_Row_100_Center>
                        <Text_Title_40_White>Ooops...</Text_Title_40_White>
                        <Icon_Rotate_Gray_50><IoSettings/></Icon_Rotate_Gray_50>
                    </Container_Row_100_Center>
                    <Text_Span_20_Center_White>Página no encotrada...</Text_Span_20_Center_White>
                    <Text_Span_24_Center_White>Redirigiendo en...</Text_Span_24_Center_White>
                    <Text_Title_40_White>{contador}</Text_Title_40_White>
                </Container_Column_90_Center>
                <Alert_Styles>
                    <Toaster
                        visibleToasts={1}
                        richColors
                        theme='light'
                        position='top-right'
                    />
                </Alert_Styles>  
            </Container_Page_Error>
        </>
    );
}