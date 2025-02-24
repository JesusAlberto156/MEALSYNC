import styled from 'styled-components';
import { toast } from "react-toastify";

const Toast_Azul = styled.div`
    background: darkblue;
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
export const Alerta_Azul = (mensaje) => {
    toast(<Toast_Azul>{mensaje}</Toast_Azul>, {
        style:{
            background:'darkblue'
        },
        autoClose:3000,
        closeOnClick:true
    });
};
const Toast_Verde = styled.div`
    background: darkgreen;
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
export const Alerta_Verde = (mensaje) => {
    toast(<Toast_Verde>{mensaje}</Toast_Verde>, {
        style:{
            background:'darkgreen'
        },
        autoClose:3000,
        closeOnClick:true
    });
};
const Toast_Amarillo = styled.div`
    background: darkgoldenrod;
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
export const Alerta_Amarillo = (mensaje) => {
    toast(<Toast_Amarillo>{mensaje}</Toast_Amarillo>, {
        style:{
            background:'darkgoldenrod'
        },
        autoClose:3000,
        closeOnClick:true
    });
};
const Toast_Rojo = styled.div`
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
export const Alerta_Rojo = (mensaje) => {
    toast(<Toast_Rojo>{mensaje}</Toast_Rojo>, {
        style:{
            background:'darkred'
        },
        autoClose:3000,
        closeOnClick:true
    });
};