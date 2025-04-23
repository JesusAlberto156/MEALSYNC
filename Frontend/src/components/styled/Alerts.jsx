//____________IMPORT/EXPORT____________
// Componentes de React externos
import styled from 'styled-components';
import Swal from 'sweetalert2';
import { toast } from 'sonner';
//__________ICONOS__________
// Icono para la alerta de advertencia
import { AiFillWarning } from "react-icons/ai";
//____________IMPORT/EXPORT____________

//____________STYLES____________
export const Alert_Styles = styled.div.withConfig({
    shouldForwardProp: (prop) => prop !== 'ThemeMode',
})`
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
        font-family: Century Gothic,Prompt;
        font-style: normal;
        border-radius: 40px;
        border: 3px solid white;
    }
`;
//____________STYLES____________
//____________GREETING____________
export const Alert_Greeting = (Title,Message,ThemeMode,Image) => {
    return Swal.fire({
        title: Title,
        text: Message,
        showConfirmButton: false,
        width: '400px',
        heightAuto: true,
        timer: 3000,
        backdrop: false,
        customClass: {
            popup: ThemeMode ? 'greeting-theme-light' : 'greeting-theme-dark',
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
export const Alert_Error = (Title,Message,ThemeMode,Image) => {
    return Swal.fire({
        title: Title,
        text: Message,
        showConfirmButton: false,
        width: '400px',
        heightAuto: true,
        timer: 3000,
        backdrop: false,
        customClass: {
            popup: ThemeMode ? 'error-theme-light' : 'error-theme-dark',
            title: ThemeMode ? 'error-title-light' : 'error-title-dark',
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
        imageWidth: 80,
        imageHeight: 80,
        position: 'center',
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
//____________MESSAGE____________
export const Alert_Message = (Title,Message,ThemeMode,Image) => {
    return Swal.fire({
        title: Title,
        text: Message,
        showConfirmButton: false,
        width: '400px',
        heightAuto: true,
        timer: 3000,
        backdrop: false,
        customClass: {
            popup: ThemeMode ? 'message-theme-light' : 'message-theme-dark',
            title: ThemeMode ? 'message-title-light' : 'message-title-dark',
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
        imageWidth: 90,
        imageHeight: 100,
        position: 'center',
    });
}
//____________LOGOUT____________
//____________LOGOUT____________
export const Alert_Logout = (Title,Message,ThemeMode,Image,Color,Hook) => {
    let remainingTime = 5;
    let timerInterval;

    Swal.fire({
        title: Title,
        text: `${Message} Tiempo restante: ${remainingTime}s`,
        showConfirmButton: false,
        showCancelButton: true,
        cancelButtonText: 'Cancelar',
        cancelButtonColor: Color,
        width: '400px',
        heightAuto: true,
        timer: 6000,
        backdrop: false,
        customClass: {
            popup: ThemeMode ? 'logout-theme-light' : 'logout-theme-dark',
            title: ThemeMode ? 'logout-title-light' : 'logout-title-dark',
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
        imageWidth: 90,
        imageHeight: 90,
        position: 'center',
        allowOutsideClick: false,
        willClose: () => clearInterval(timerInterval)
    }).then((result) => {
        if(result.dismiss === Swal.DismissReason.timer){
            Hook();
        }
        if(result.isDismissed){
            Swal.close();
        }
    });

    timerInterval = setInterval(() => {
        remainingTime = Math.max(0, remainingTime - 1);
        Swal.update({
            text: `${Message} Tiempo restante: ${remainingTime}s`
        });

        if (remainingTime === 0) {
            clearInterval(timerInterval);
        }
    }, 1000);
}
//____________LOGOUT____________