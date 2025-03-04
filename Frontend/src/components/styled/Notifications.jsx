import styled from 'styled-components';
import { toast } from "react-toastify";

const Toast_Blue = styled.div.withConfig({
    shouldForwardProp: (prop) => !['closeToast', 'toastProps', 'isPaused'].includes(prop)
})`
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
export const Alert_Blue = (mensaje) => {
    toast(<Toast_Blue>{mensaje}</Toast_Blue>, {
        style:{
            background:'darkblue'
        },
        autoClose:3000,
        closeOnClick:true
    });
};
const Toast_Green = styled.div.withConfig({
    shouldForwardProp: (prop) => !['closeToast', 'toastProps', 'isPaused'].includes(prop)
})`
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
export const Alert_Green = (mensaje) => {
    toast(<Toast_Green>{mensaje}</Toast_Green>, {
        style:{
            background:'darkgreen'
        },
        autoClose:3000,
        closeOnClick:true
    });
};
const Toast_Yellow = styled.div.withConfig({
    shouldForwardProp: (prop) => !['closeToast', 'toastProps', 'isPaused'].includes(prop)
})`
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
export const Alert_Yellow = (mensaje) => {
    toast(<Toast_Yellow>{mensaje}</Toast_Yellow>, {
        style:{
            background:'darkgoldenrod'
        },
        autoClose:3000,
        closeOnClick:true
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