//____________IMPORT/EXPORT____________
// Componentes de React externos
import styled from 'styled-components';
import Swal from 'sweetalert2';
import { toast } from 'sonner';
//__________ICONOS__________
// Icono para la alerta de advertencia
import { AiFillWarning } from "react-icons/ai";
// Icono para la alerta de error
import { BiSolidMessageAltError } from "react-icons/bi";
//__________ICONOS__________
//__________IMAGE__________

//__________IMAGE__________
// Estilos personalizados

//____________IMPORT/EXPORT____________

//____________STYLES____________
export const Alert_Styles = styled.div.withConfig({
    shouldForwardProp: (prop) => prop !== 'ThemeMode',
})`
    .Blue {
        font-size: 14px;
        font-family: "Prompt", sans-serif;
        font-weight: 300;
        font-style: normal;
        border-radius: 40px;
        background-color: ${({ ThemeMode }) => (ThemeMode ? 'rgb(58,93,174)' : 'rgb(82, 126, 231)')};
        border: ${({ ThemeMode }) => (ThemeMode ? '3px solid black' : '3px solid white')};
    }   

    .Red {
        font-size: 14px;
        font-family: "Prompt", sans-serif;
        font-weight: 300;
        font-style: normal;
        border-radius: 40px;
        background-color: ${({ ThemeMode }) => (ThemeMode ? 'rgb(125, 27, 27)' : 'rgb(229, 44, 44)')};
        border: ${({ ThemeMode }) => (ThemeMode ? '3px solid black' : '3px solid white')};
    } 

    .Yellow {
        font-size: 14px;
        font-family: "Prompt", sans-serif;
        font-weight: 300;
        font-style: normal;
        border-radius: 40px;
        background-color: ${({ ThemeMode }) => (ThemeMode ? 'rgb(122, 104, 21)' : 'rgb(182, 154, 31)')};
        border: ${({ ThemeMode }) => (ThemeMode ? '3px solid black' : '3px solid white')};
    } 

    .Verification {
        font-size: 14px;
        font-family: "Prompt", sans-serif;
        font-weight: 300;
        font-style: normal;
        border-radius: 40px;
        border: 3px solid white;
    }
`;
//____________STYLES____________
//____________GREETING____________
export const Alert_Greeting = (Title,Message,ThemeMode,Image,Color) => {
    return Swal.fire({
        title: Title,
        text: Message,
        showConfirmButton: false,
        confirmButtonColor: Color,
        confirmButtonText: 'Aceptar',
        width: '400px',
        heightAuto: true,
        timer: 2000,
        backdrop: false,
        customClass: {
            popup: ThemeMode ? 'greeting-light-theme' : 'greeting-dark-theme',
            title: ThemeMode ? 'greeting-title-light' : 'greeting-title-dark',
        },
        showClass: {
            popup: `
                animate__animated
                animate__fadeInUp
                animate__faster
            `
        },
        hideClass: {
            popup: `
                animate__animated
                animate__fadeOutDown
                animate__faster
            `
        },
        imageUrl: Image,
        imageWidth: 60,
        imageHeight: 70,
        position: 'top-end',
    });
};
//____________GREETING____________
//____________WARNING____________
export const Alert_Warning = (titulo,mensaje,themeMode) => {
    toast(titulo,{
        duration:4000,
        description: mensaje,
        className: 'Yellow',
        icon: themeMode ? <AiFillWarning style={{color:'rgb(182, 154, 31)',fontSize:'20px'}}/> : <AiFillWarning style={{color:'rgb(122, 104, 21)',fontSize:'20px'}}/>,
    }
    );
};
//____________WARNING____________
//____________ERROR____________
export const Alert_Error = (titulo,mensaje,themeMode) => {
    toast(titulo,{
        duration:4000,
        description: mensaje,
        className: 'Red',
        icon: themeMode ? <BiSolidMessageAltError style={{color:'rgb(229, 44, 44)',fontSize:'20px'}}/> : <BiSolidMessageAltError style={{color:'rgb(125, 27, 27)',fontSize:'20px'}}/>,
    });
}
//____________ERROR____________
//____________VERIICATION____________
export const Alert_Verification = (promesa,Verificacion) => {
    toast.promise(promesa,{
        loading: Verificacion,
        success: (msj) => {
            return `${msj}`;
        },
        error: (msj) => {
            return `${msj}`;
        },
        duration:1000,
        className:'Verification',
    });
};
//____________VERIICATION____________