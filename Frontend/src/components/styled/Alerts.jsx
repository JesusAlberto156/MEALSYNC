//____________IMPORT/EXPORT____________
// Componentes de React externos
import styled from 'styled-components';
import Swal from 'sweetalert2';
import { toast } from 'sonner';
//__________IMAGENES__________
import Logo_Hospital from '../../components/imgs/Logo-Hospital.png';
import Icon_Success from '../../components/imgs/Icon-Success.png';
import Icon_Warning from '../../components/imgs/Icon-Warning.webp';
import Icon_Error from '../../components/imgs/Icon-Error.png';
//__________IMAGENES__________
// Componentes personalizados
import { Text_Span_16_Left_Black,Text_Color_Blue_16,Text_Color_Green_16,Text_Color_Yellow_16,Text_Color_Red_16 } from './Text';
//____________IMPORT/EXPORT____________

//____________SWAL____________
export const Alert_Swal_Greeting = (Message) => {
    return Swal.fire({
        title: 'MEALSYNC',
        text: Message,
        showConfirmButton: false,
        showCloseButton: true,
        heightAuto: true,
        timer: 3000,
        backdrop: false,
        customClass: {
            popup: 'greeting-theme',
            title: 'greeting-title',
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
        imageUrl: Logo_Hospital,
        imageWidth: 'auto',
        imageHeight: '15vh',
        position: 'top-end',
    });
};
export const Alert_Swal_Success = (Message) => {
    return Swal.fire({
        title: 'MEALSYNC',
        text: Message,
        showConfirmButton: false,
        showCloseButton: true,
        heightAuto: true,
        timer: 3000,
        backdrop: false,
        customClass: {
            popup: 'success-theme',
            title: 'success-title',
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
        imageUrl: Icon_Success,
        imageWidth: 'auto',
        imageHeight: '15vh',
        position: 'center',
    });
};
export const Alert_Swal_Warning = (Message) => {
    return Swal.fire({
        title: 'MEALSYNC',
        text: Message,
        showConfirmButton: false,
        showCloseButton: true,
        heightAuto: true,
        timer: 3000,
        backdrop: false,
        customClass: {
            popup: 'warning-theme',
            title: 'warning-title',
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
        imageUrl: Icon_Warning,
        imageWidth: 'auto',
        imageHeight: '15vh',
        position: 'center',
    });
}
export const Alert_Swal_Error = (Message) => {
    return Swal.fire({
        title: 'MEALSYNC',
        text: Message,
        showConfirmButton: false,
        showCloseButton: true,
        heightAuto: true,
        timer: 3000,
        backdrop: false,
        customClass: {
            popup: 'error-theme',
            title: 'error-title',
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
        imageUrl: Icon_Error,
        imageWidth: 'auto',
        imageHeight: '15vh',
        position: 'center',
    });
}
export const Alert_Swal_Confirm = (Message,onConfirm = () => {},onCancel = () => {}) => {
    return Swal.fire({
        title: 'MEALSYNC',
        text: Message,
        showCancelButton: true,
        cancelButtonText: 'Cancelar',
        cancelButtonAriaLabel: 'Century Gothic',
        cancelButtonColor: 'rgb(58,93,174)',
        showConfirmButton: true,
        confirmButtonText: 'Confirmar',
        confirmButtonAriaLabel: 'Century Gothic',
        confirmButtonColor: 'rgb(20, 165, 76)',
        showCloseButton: false,
        heightAuto: true,
        backdrop: false,
        customClass: {
            popup: 'confirm-theme',
            title: 'confirm-title',
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
        position: 'top-right',
    }).then((result) => {
        if(result.isConfirmed){
            onConfirm();
        }
        if(result.isDismissed){
            onCancel();
        }
    })
}
//____________SWAL____________
//____________SONNER____________
export const Alert_Sonner_Styles = styled.div`
    .Loading {
        font-family: Century Gothic,Prompt;
        border-top-right-radius: 50px;
        border-bottom-right-radius: 50px;
        border: 2px solid rgb(0, 0, 0);
        border-bottom: 8px solid rgb(0, 0, 0);
        border-right: 8px solid rgb(0, 0, 0);
    }

    .Info {
        font-family: Century Gothic,Prompt;
        border-top-right-radius: 50px;
        border-bottom-right-radius: 50px;
        border: 2px solid rgb(58,93,174);
        border-bottom: 8px solid rgb(58,93,174);
        border-right: 8px solid rgb(58,93,174);
    }

    .Success {
        font-family: Century Gothic,Prompt;
        border-top-right-radius: 50px;
        border-bottom-right-radius: 50px;
        border: 2px solid rgb(20, 165, 76);
        border-bottom: 8px solid rgb(20, 165, 76);
        border-right: 8px solid rgb(20, 165, 76);
    }

    .Warning {
        font-family: Century Gothic,Prompt;
        border-top-right-radius: 50px;
        border-bottom-right-radius: 50px;
        border: 2px solid rgb(255, 193, 10);
        border-bottom: 8px solid rgb(255, 193, 10);
        border-right: 8px solid rgb(255, 193, 10);
    }

    .Error {
        font-family: Century Gothic,Prompt;
        border-top-right-radius: 50px;
        border-bottom-right-radius: 50px;
        border: 2px solid rgb(155, 9, 9);
        border-bottom: 8px solid rgb(155, 9, 9);
        border-right: 8px solid rgb(155, 9, 9);
    }
`;
export const Alert_Sonner_Info = (Message) => {
    toast.info(<Text_Color_Blue_16 style={{ justifyContent: 'flex-start'}}>MEALSYNC</Text_Color_Blue_16>,{
        description: <Text_Span_16_Left_Black>{Message}</Text_Span_16_Left_Black>,
        duration:4000,
        className:'Error',
        position: 'top-right',
        closeButton: true,
    });
};
export const Alert_Sonner_Success = (Message,Options = {}) => {
    toast.success(<Text_Color_Green_16 style={{ justifyContent: 'flex-start'}}>MEALSYNC</Text_Color_Green_16>,{
        description: <Text_Span_16_Left_Black>{Message}</Text_Span_16_Left_Black>,
        duration:2000,
        className:'Success',
        position: 'top-right',
        closeButton: true,
        ...Options,
    });
};
export const Alert_Sonner_Warning = (Message) => {
    toast.warning(<Text_Color_Yellow_16 style={{ justifyContent: 'flex-start'}}>MEALSYNC</Text_Color_Yellow_16>,{
        description: <Text_Span_16_Left_Black>{Message}</Text_Span_16_Left_Black>,
        duration:4000,
        className:'Warning',
        position: 'top-right',
        closeButton: true,
    });
};
export const Alert_Sonner_Error = (Message,Options = {}) => {
    toast.error(<Text_Color_Red_16 style={{ justifyContent: 'flex-start'}}>MEALSYNC</Text_Color_Red_16>,{
        description: <Text_Span_16_Left_Black>{Message}</Text_Span_16_Left_Black>,
        duration:2000,
        className:'Error',
        position: 'top-right',
        closeButton: true,
        ...Options,
    });
};
export const Alert_Sonner_Loading = (Message,Options = {}) => {
    toast.loading(<Text_Color_Blue_16 style={{ justifyContent: 'flex-start'}}>MEALSYNC</Text_Color_Blue_16>,{
        description: <Text_Span_16_Left_Black>{Message}</Text_Span_16_Left_Black>,
        duration:2000,
        className:'Loading',
        position: 'top-right',
        closeButton: true,
        ...Options,
    });
};
export const Alert_Sonner_Promise = (promise,message,id) => {
    Alert_Sonner_Loading(message,{id: id});
                                    
    promise
        .then((msg) => {
            Alert_Sonner_Success(msg,{id: id});
        })
        .catch((msj) => {
            Alert_Sonner_Error(msj,{id: id});
        });
};
//____________SONNER____________


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