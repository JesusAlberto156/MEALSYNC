//____________IMPORT/EXPORT____________
// Hooks de React
import { useEffect,useContext } from "react";
import { useNavigate } from "react-router-dom";
// Componentes de React externos
import { Toaster } from "sonner";
// Contextos 
import { SocketContext } from "../../contexts/SocketProvider";
//__________ICONOS__________
// Iconos de decoración de la página
import { IoIosWarning } from "react-icons/io";
import { IoSettings } from "react-icons/io5";
//__________ICONOS__________
// Estilos personalizados
import { Container_Page_Error,Container_Row_100_Center } from "../../components/styled/Containers";
import { Icon_Rotate_Gray_50,Icon_Yellow_250 } from "../../components/styled/Icons";
import { Text_Title_52_White } from "../../components/styled/Text";
import { Alert_Sonner_Styles,Alert_Sonner_Error, Alert_Swal_Success } from "../../components/styled/Alerts";
// Componentes personalizados
import { Image_Modal } from "../../components/styled/Imgs";
//____________IMPORT/EXPORT____________

// Página para captar los errores ocasionados por una mala ruta escrita
export default function Disconect(){
    // Constantes con el valor de los useState
    const [socket] = useContext(SocketContext);
    // Constantes con la funcionalidad de los hooks
    const navigate = useNavigate();
    // useEffect con el titulo de la página
    useEffect(() => {
        document.title = 'MEALSYNC_Error...'
        Alert_Sonner_Error('¡Error, Servidor no disponible!');

        const handleReconnect = () => {
            Alert_Swal_Success('¡Servidor reconectado! Redirigiendo...');
            setTimeout(() => navigate("/", { replace: true }), 5000);
        };

        socket.on("connect", handleReconnect);

        return () => {
            socket.off("connect", handleReconnect);
        };
    },[]);
    // Estructura del componente
    return(
        <>
            <Container_Page_Error>
                <Image_Modal/>
                <Icon_Yellow_250><IoIosWarning/></Icon_Yellow_250>
                <Container_Row_100_Center>
                    <Text_Title_52_White>Servidor no disponible...</Text_Title_52_White>
                    <Icon_Rotate_Gray_50><IoSettings/></Icon_Rotate_Gray_50>
                </Container_Row_100_Center>
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