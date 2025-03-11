import styled from 'styled-components';
import { toast } from "react-toastify";

export const Alert_Blue = (mensaje) => {
    toast(mensaje, {
        autoClose:3000,
        style: { 
            background: "rgb(58,93,174)", 
            color: "#fff",
            fontSize: "20px",
            padding: "10px",
            width: "300px", 
            minHeight: "60px", 
            borderRadius: "15px", 
            textAlign: "center",
        },
        theme:'dark',
        progress:undefined,
    });
};

export const Alert_Verification = (promesa) => {
    toast.promise(promesa,{
        pending: 'Verificando datos...',
        success: (msj) => {
            return `${msj}`;
        },
        error: (msj) => {
            return `${msj}`;
        }
    }, {
        autoClose:3000,
        style: { 
            fontSize: "20px",
            padding: "10px",
            width: "300px", 
            minHeight: "60px", 
            borderRadius: "15px", 
            textAlign: "center",
        },
        theme:'colored',
        progress:undefined,
    });
};

const Toast_Yellow = styled.div.withConfig({
    shouldForwardProp: (prop) => !['closeToast', 'toastProps', 'isPaused'].includes(prop)
})`
    @media (max-width: 768px) {
        font-size: 18px;
        width: 250px;
    }

    @media (max-width: 480px) {
        font-size: 16px;
        width: 200px;
    }
`;
export const Alert_Yellow = (mensaje) => {
    toast(<Toast_Yellow>{mensaje}</Toast_Yellow>, {
        autoClose:3000,
        style: { 
            background: "rgb(223, 184, 14)", 
            color: "#fff",
            fontSize: "20px",
            padding: "10px",
            width: "300px", 
            minHeight: "60px", 
            borderRadius: "15px", 
            textAlign: "center",
        },
        theme:'dark',
        progress:undefined,
    });
};

const Toast_Red = styled.div.withConfig({
    shouldForwardProp: (prop) => !['closeToast', 'toastProps', 'isPaused'].includes(prop)
})`
    background: darkred;
    color: #fff;
    font-size: 18px;
    padding: 5px 10px;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
    border-radius: 8px;
    top: 5px;
    text-align: center;
    word-wrap: break-word;
    max-width: 90vw;

    @media (max-width: 768px) {
        font-size: 16px;
        margin-top: 5px;
        top: 10px;
        left: 16px;
    }

    @media (max-width: 480px) {
        font-size: 14px;
        margin-top: 5px;
        top: 10px;
        left: 16px;
    }
`;
export const Alert_Red = (mensaje) => {
    toast(<Toast_Red>{mensaje}</Toast_Red>, {
        style:{
            background:'darkred'
        },
        autoClose:3000,
        closeOnClick:true
    });
};