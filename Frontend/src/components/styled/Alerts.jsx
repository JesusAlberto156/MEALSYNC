//____________IMPORT/EXPORT____________
// Componentes de React externos
import styled from 'styled-components';
import Swal from 'sweetalert2';
import { toast } from 'sonner';
import { Text_Span_16_Left_Black,Text_Title_20_Orange } from './Text';
//____________IMPORT/EXPORT____________

//____________STYLES____________
export const Alert_Styles = styled.div`
    .Verification {
        font-size: 14px;
        font-family: Century Gothic,Prompt;
        font-style: normal;
        border-radius: 40px;
        border: 3px solid white;
    }

    .Warning {
        font-family: Century Gothic,Prompt;
        border-top-right-radius: 50px;
        border-bottom-right-radius: 50px;
        background: rgb(255, 245, 101);
        border: 3px solid rgb(250, 184, 3);
        border-bottom: 8px solid rgb(250, 184, 3);
        border-right: 8px solid rgb(250, 184, 3);
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
//____________GREETING____________
export const Alert_Success = (Title,Message,ThemeMode,Image) => {
    return Swal.fire({
        title: Title,
        text: Message,
        showConfirmButton: false,
        width: '400px',
        heightAuto: true,
        timer: 3000,
        backdrop: false,
        customClass: {
            popup: ThemeMode ? 'success-theme-light' : 'success-theme-dark',
            title: ThemeMode ? 'success-title-light' : 'success-title-dark',
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
        imageWidth: 100,
        imageHeight: 100,
        position: 'center',
    });
};
//____________GREETING____________
//____________WARNING____________
//____________SONNER____________
export const Alert_Sonner_Warning = (Title,Message) => {
    toast.warning(<Text_Title_20_Orange>{Title}</Text_Title_20_Orange>,{
        description: <Text_Span_16_Left_Black>{Message}</Text_Span_16_Left_Black>,
        duration:5000,
        className:'Warning',
        position: 'top-right',
        closeButton: true,
    });
};
//____________SONNER____________
export const Alert_Warning = (Title,Message,ThemeMode,Image) => {
    return Swal.fire({
        title: Title,
        text: Message,
        showConfirmButton: false,
        width: '400px',
        heightAuto: true,
        timer: 3000,
        backdrop: false,
        customClass: {
            popup: ThemeMode ? 'warning-theme-light' : 'warning-theme-dark',
            title: ThemeMode ? 'warning-title-light' : 'warning-title-dark',
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
        imageWidth: 100,
        imageHeight: 100,
        position: 'center',
    });
}
export const Alert_Warning_Sonner = (Mensaje) => {
    toast.warning(Mensaje,{
        duration:3000,
        className:'Verification'
    });
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
        duration:2000,
        className:'Verification',
    });
};
//____________VERIICATION____________
//____________LOGOUT____________
export const Alert_Logout = (Title,Message,ThemeMode,Image,Color,HookLogout,HookReset) => {
    let remainingTime = 5;
    let timerInterval;

    Swal.fire({
        title: Title,
        html: `${Message}<br>Tiempo restante: ${remainingTime}s`,
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
        didOpen: () => {
            timerInterval = setInterval(() => {
                remainingTime--;
                Swal.update({
                    html: `${Message}<br>Tiempo restante: ${remainingTime}s`
                });

                if (remainingTime <= 0) {
                    clearInterval(timerInterval);
                }
            }, 1000);
        },
        willClose: () => {
            clearInterval(timerInterval);
        }
    }).then((result) => {
        // Verificamos qué lo cerró
        if (result.dismiss === Swal.DismissReason.timer) {
            HookLogout();
        } else if (result.dismiss === Swal.DismissReason.cancel) {
            HookReset();
        }
    });
}
//____________LOGOUT____________