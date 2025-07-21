//____________IMPORT/EXPORT____________
// Hooks de React
import { useEffect,useState } from "react";
import { useNavigate } from "react-router-dom";
// Componentes de React externos
import { Toaster } from "sonner";
//__________IMAGENES__________
import Logo_Hospital from '../../components/imgs/Logo-Hospital.png'
//__________IMAGENES__________
//__________ICONOS__________
// Iconos de decoración de la página
import { IoIosWarning } from "react-icons/io";
import { IoSettings } from "react-icons/io5";
//__________ICONOS__________
// Estilos personalizados
import { Container_Page_Error,Container_Row_100_Center,Container_Modal_Image } from "../../components/styled/Containers";
import { Icon_Rotate_Gray_50,Icon_Yellow_250 } from "../../components/styled/Icons";
import { Text_Span_20_Center_White,Text_Title_40_White,Text_Title_52_White } from "../../components/styled/Text";
import { Alert_Sonner_Styles,Alert_Sonner_Error,Alert_Sonner_Promise } from "../../components/styled/Alerts";
import { Image_Modal_Fixed } from "../../components/styled/Imgs";
//____________IMPORT/EXPORT____________

// Página para captar los errores ocasionados por una mala ruta escrita
export default function Error(){
    // Constantes con el valor de los useState
    const [contador,setContador] = useState(5);
    // useEffect con el titulo de la página
    useEffect(() => {
        document.title = 'MEALSYNC_Error...'
        Alert_Sonner_Error('¡Error, página no encontrada!');
    },[])
    // useEffect con cuenta regresiva para regresar
    useEffect(() => {
        if(contador === 0){
            const promise = new Promise((resolve,reject) => {
                try{
                    setTimeout(() => {
                        resolve('¡Página encontrada!');

                        setTimeout(() => {
                             return navigate('/',{replace: true});
                        },2500);
                    },2000);
                } catch (e) {
                    return reject('¡Ocurrio un error inseperado!');
                }
            });
    
            return Alert_Sonner_Promise(promise,'¡Buscando página!','1');
        }

        if (contador > 0) {
            const intervalo = setInterval(() => {
                setContador((prev) => prev - 1);
            }, 1000);

            return () => clearInterval(intervalo);
        }
    },[contador]);
    // Constantes con la funcionalidad de los hooks
    const navigate = useNavigate();
    // Estructura del componente
    return(
        <>
            <Container_Page_Error>
                <Container_Modal_Image>
                    <Image_Modal_Fixed src={Logo_Hospital}/>
                </Container_Modal_Image>
                <Icon_Yellow_250><IoIosWarning/></Icon_Yellow_250>
                <Container_Row_100_Center>
                    <Text_Title_40_White>Ooops...</Text_Title_40_White>
                    <Icon_Rotate_Gray_50><IoSettings/></Icon_Rotate_Gray_50>
                </Container_Row_100_Center>
                <Text_Span_20_Center_White>Página no encotrada...</Text_Span_20_Center_White>
                <Text_Title_40_White>Redirigiendo en...</Text_Title_40_White>
                <Text_Title_52_White>{contador}</Text_Title_52_White>
                <Alert_Sonner_Styles>
                    <Toaster
                        visibleToasts={5}
                        richColors
                        expand={true}
                    />
                </Alert_Sonner_Styles>  
            </Container_Page_Error>
        </>
    );
}