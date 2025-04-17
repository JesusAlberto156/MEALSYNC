//____________IMPORT/EXPORT____________
// Componentes de React externos
import styled from 'styled-components';
// Estilos personalizados
import { Rotate_Animation } from './Animations';
//____________IMPORT/EXPORT____________

//____________BUTTON____________
//---------- Black
export const Icon_Button_Black_30 = styled.button.withConfig({
    shouldForwardProp: (prop) => prop !== 'ThemeMode',
})`
    font-size: 30px;
    border: none;
    background-color: transparent;
    cursor: pointer;
    color: ${({ ThemeMode }) => (ThemeMode ? 'black' : 'white')};

    @media (max-width: 768px) {
        font-size: 28px;
    }

    @media (max-width: 480px) {
        font-size: 26px;
    }
`;
export const Icon_Button_Black_26 = styled.button.withConfig({
    shouldForwardProp: (prop) => prop !== 'ThemeMode',
})`
    font-size: 26px;
    border: none;
    background-color: transparent;
    cursor: pointer;
    color: ${({ ThemeMode }) => (ThemeMode ? 'black' : 'white')};

    @media (max-width: 768px) {
        font-size: 24px;
    }

    @media (max-width: 480px) {
        font-size: 22px;
    }
`;
export const Icon_Button_Black_22 = styled.button.withConfig({
    shouldForwardProp: (prop) => prop !== 'ThemeMode',
})`
    font-size: 22px;
    border: none;
    background-color: transparent;
    cursor: pointer;
    color: ${({ ThemeMode }) => (ThemeMode ? 'black' : 'white')};

    @media (max-width: 768px) {
        font-size: 20px;
    }

    @media (max-width: 480px) {
        font-size: 18px;
    }
`;
export const Icon_Button_Black_18 = styled.button.withConfig({
    shouldForwardProp: (prop) => prop !== 'ThemeMode',
})`
    font-size: 18px;
    border: none;
    background-color: transparent;
    cursor: pointer;
    color: ${({ ThemeMode }) => (ThemeMode ? 'black' : 'white')};

    @media (max-width: 768px) {
        font-size: 16px;
    }

    @media (max-width: 480px) {
        font-size: 14px;
    }
`;
//---------- Black
//____________BUTTON____________
//____________COLOR____________
//---------- Sin color
export const Icon_30 = styled.div`
    font-size: 30px;

    @media (max-width: 768px) {
        font-size: 28px;
    }

    @media (max-width: 480px) {
        font-size: 26px;
    }
`;
export const Icon_26 = styled.div`
    font-size: 26px;

    @media (max-width: 768px) {
        font-size: 24px;
    }

    @media (max-width: 480px) {
        font-size: 22px;
    }
`;
export const Icon_22 = styled.div`
    font-size: 22px;

    @media (max-width: 768px) {
        font-size: 20px;
    }

    @media (max-width: 480px) {
        font-size: 18px;
    }
`;
export const Icon_18 = styled.div`
    font-size: 18px;

    @media (max-width: 768px) {
        font-size: 16px;
    }

    @media (max-width: 480px) {
        font-size: 14px;
    }
`;
//---------- Sin color
//---------- White
export const Icon_White_30 = styled.div`
    font-size: 30px;
    color: white;

    @media (max-width: 768px) {
        font-size: 28px;
    }

    @media (max-width: 480px) {
        font-size: 26px;
    }
`;
export const Icon_White_26 = styled.div`
    font-size: 26px;
    color: white;

    @media (max-width: 768px) {
        font-size: 24px;
    }

    @media (max-width: 480px) {
        font-size: 22px;
    }
`;
export const Icon_White_22 = styled.div`
    font-size: 22px;
    color: white;

    @media (max-width: 768px) {
        font-size: 20px;
    }

    @media (max-width: 480px) {
        font-size: 18px;
    }
`;
export const Icon_White_18 = styled.div`
    font-size: 18px;
    color: white;

    @media (max-width: 768px) {
        font-size: 16px;
    }

    @media (max-width: 480px) {
        font-size: 14px;
    }
`;
export const Icon_White_14 = styled.div`
    font-size: 14px;
    color: white;

    @media (max-width: 768px) {
        font-size: 12px;
    }

    @media (max-width: 480px) {
        font-size: 10px;
    }
`;
//---------- White
//---------- Black
export const Icon_Black_30 = styled.div`
    font-size: 30px;
    color: black;

    @media (max-width: 768px) {
        font-size: 28px;
    }

    @media (max-width: 480px) {
        font-size: 26px;
    }
`;
export const Icon_Black_26 = styled.div`
    font-size: 26px;
    color: black;

    @media (max-width: 768px) {
        font-size: 24px;
    }

    @media (max-width: 480px) {
        font-size: 22px;
    }
`;
export const Icon_Black_22 = styled.div`
    font-size: 22px;
    color: black;

    @media (max-width: 768px) {
        font-size: 20px;
    }

    @media (max-width: 480px) {
        font-size: 18px;
    }
`;
export const Icon_Black_18 = styled.div`
    font-size: 18px;
    color: black;

    @media (max-width: 768px) {
        font-size: 16px;
    }

    @media (max-width: 480px) {
        font-size: 14px;
    }
`;
//---------- Black
//---------- White/Black
export const Icon_White_Black_30 = styled.div.withConfig({
    shouldForwardProp: (prop) => prop !== 'ThemeMode',
})`
    font-size: 30px;
    color: ${({ ThemeMode }) => (ThemeMode ? 'white' : 'black')};

    @media (max-width: 768px) {
        font-size: 28px;
    }

    @media (max-width: 480px) {
        font-size: 26px;
    }
`;
export const Icon_White_Black_26 = styled.div.withConfig({
    shouldForwardProp: (prop) => prop !== 'ThemeMode',
})`
    font-size: 26px;
    color: ${({ ThemeMode }) => (ThemeMode ? 'white' : 'black')};

    @media (max-width: 768px) {
        font-size: 24px;
    }

    @media (max-width: 480px) {
        font-size: 22px;
    }
`;
export const Icon_White_Black_22 = styled.div.withConfig({
    shouldForwardProp: (prop) => prop !== 'ThemeMode',
})`
    font-size: 22px;
    color: ${({ ThemeMode }) => (ThemeMode ? 'white' : 'black')};

    @media (max-width: 768px) {
        font-size: 20px;
    }

    @media (max-width: 480px) {
        font-size: 18px;
    }
`;
export const Icon_White_Black_18 = styled.div.withConfig({
    shouldForwardProp: (prop) => prop !== 'ThemeMode',
})`
    font-size: 18px;
    color: ${({ ThemeMode }) => (ThemeMode ? 'white' : 'black')};

    @media (max-width: 768px) {
        font-size: 16px;
    }

    @media (max-width: 480px) {
        font-size: 14px;
    }
`;
//---------- White/Black
//---------- Black/White
export const Icon_Black_White_30 = styled.div.withConfig({
    shouldForwardProp: (prop) => prop !== 'ThemeMode',
})`
    font-size: 30px;
    color: ${({ ThemeMode }) => (ThemeMode ? 'black' : 'white')};

    @media (max-width: 768px) {
        font-size: 28px;
    }

    @media (max-width: 480px) {
        font-size: 26px;
    }
`;
export const Icon_Black_White_26 = styled.div.withConfig({
    shouldForwardProp: (prop) => prop !== 'ThemeMode',
})`
    font-size: 26px;
    color: ${({ ThemeMode }) => (ThemeMode ? 'black' : 'white')};

    @media (max-width: 768px) {
        font-size: 24px;
    }

    @media (max-width: 480px) {
        font-size: 22px;
    }
`;
export const Icon_Black_White_22 = styled.div.withConfig({
    shouldForwardProp: (prop) => prop !== 'ThemeMode',
})`
    font-size: 22px;
    color: ${({ ThemeMode }) => (ThemeMode ? 'black' : 'white')};

    @media (max-width: 768px) {
        font-size: 20px;
    }

    @media (max-width: 480px) {
        font-size: 18px;
    }
`;
export const Icon_Black_White_18 = styled.div.withConfig({
    shouldForwardProp: (prop) => prop !== 'ThemeMode',
})`
    font-size: 18px;
    color: ${({ ThemeMode }) => (ThemeMode ? 'black' : 'white')};

    @media (max-width: 768px) {
        font-size: 16px;
    }

    @media (max-width: 480px) {
        font-size: 14px;
    }
`;
//---------- Black/White
//---------- Green
export const Icon_Green_30 = styled.div.withConfig({
    shouldForwardProp: (prop) => prop !== 'ThemeMode',
})`
    font-size: 30px;
    color: ${({ ThemeMode }) => (ThemeMode ? 'rgb(20, 165, 76)' : 'rgb(60, 188, 109)')};

    @media (max-width: 768px) {
        font-size: 28px;
    }

    @media (max-width: 480px) {
        font-size: 26px;
    }
`;
export const Icon_Green_26 = styled.div.withConfig({
    shouldForwardProp: (prop) => prop !== 'ThemeMode',
})`
    font-size: 26px;
    color: ${({ ThemeMode }) => (ThemeMode ? 'rgb(20, 165, 76)' : 'rgb(60, 188, 109)')};

    @media (max-width: 768px) {
        font-size: 24px;
    }

    @media (max-width: 480px) {
        font-size: 22px;
    }
`;
export const Icon_Green_22 = styled.div.withConfig({
    shouldForwardProp: (prop) => prop !== 'ThemeMode',
})`
    font-size: 22px;
    color: ${({ ThemeMode }) => (ThemeMode ? 'rgb(20, 165, 76)' : 'rgb(60, 188, 109)')};

    @media (max-width: 768px) {
        font-size: 20px;
    }

    @media (max-width: 480px) {
        font-size: 18px;
    }
`;
export const Icon_Green_18 = styled.div.withConfig({
    shouldForwardProp: (prop) => prop !== 'ThemeMode',
})`
    font-size: 18px;
    color: ${({ ThemeMode }) => (ThemeMode ? 'rgb(20, 165, 76)' : 'rgb(60, 188, 109)')};

    @media (max-width: 768px) {
        font-size: 16px;
    }

    @media (max-width: 480px) {
        font-size: 14px;
    }
`;
//---------- Green
//---------- Red
export const Icon_Red_30 = styled.div.withConfig({
    shouldForwardProp: (prop) => prop !== 'ThemeMode',
})`
    font-size: 30px;
    color: ${({ ThemeMode }) => (ThemeMode ? 'rgb(155, 9, 9)' : 'rgb(208, 31, 31)')};

    @media (max-width: 768px) {
        font-size: 28px;
    }

    @media (max-width: 480px) {
        font-size: 26px;
    }
`;
export const Icon_Red_26 = styled.div.withConfig({
    shouldForwardProp: (prop) => prop !== 'ThemeMode',
})`
    font-size: 26px;
    color: ${({ ThemeMode }) => (ThemeMode ? 'rgb(155, 9, 9)' : 'rgb(208, 31, 31)')};

    @media (max-width: 768px) {
        font-size: 24px;
    }

    @media (max-width: 480px) {
        font-size: 22px;
    }
`;
export const Icon_Red_22 = styled.div.withConfig({
    shouldForwardProp: (prop) => prop !== 'ThemeMode',
})`
    font-size: 22px;
    color: ${({ ThemeMode }) => (ThemeMode ? 'rgb(155, 9, 9)' : 'rgb(208, 31, 31)')};

    @media (max-width: 768px) {
        font-size: 20px;
    }

    @media (max-width: 480px) {
        font-size: 18px;
    }
`;
export const Icon_Red_18 = styled.div.withConfig({
    shouldForwardProp: (prop) => prop !== 'ThemeMode',
})`
    font-size: 18px;
    color: ${({ ThemeMode }) => (ThemeMode ? 'rgb(155, 9, 9)' : 'rgb(208, 31, 31)')};

    @media (max-width: 768px) {
        font-size: 16px;
    }

    @media (max-width: 480px) {
        font-size: 14px;
    }
`;
//---------- Red
//____________COLOR____________

export const Icon_25 = styled.div`
    font-size: 25px;

    @media (max-width: 768px) {
        font-size: 20px;
    }

    @media (max-width: 480px) {
        font-size: 15px;
    }
`;
// Color Verde
export const Icon_Green_16 = styled.div.withConfig({
    shouldForwardProp: (prop) => prop !== 'ThemeMode',
})`
    font-size: 16px;
    color: ${({ ThemeMode }) => (ThemeMode ? 'rgb(20, 165, 76)' : 'rgb(60, 188, 109)')};

    @media (max-width: 768px) {
        font-size: 14px;
    }

    @media (max-width: 480px) {
        font-size: 12px;
    }
`;
// Color Rojo
export const Icon_Red_16 = styled.div.withConfig({
    shouldForwardProp: (prop) => prop !== 'ThemeMode',
})`
    font-size: 16px;
    color: ${({ ThemeMode }) => (ThemeMode ? 'rgb(155, 9, 9)' : 'rgb(208, 31, 31)')};

    @media (max-width: 768px) {
        font-size: 14px;
    }

    @media (max-width: 480px) {
        font-size: 12px;
    }
`;
// Color Amarillo
export const Icon_Yellow_250 = styled.div.withConfig({
    shouldForwardProp: (prop) => prop !== 'ThemeMode',
})`
    font-size: 250px;
    color: ${({ ThemeMode }) => (ThemeMode ? 'rgb(235, 197, 24)' : 'rgb(194, 161, 15)')};

    @media (max-width: 768px) {
        font-size: 200px;
    }

    @media (max-width: 480px) {
        font-size: 150px;
    }
`;
// Color Gris
export const Icon_Gray_Rotate_50 = styled.div.withConfig({
    shouldForwardProp: (prop) => prop !== 'ThemeMode',
})`
    width: 50px;
    height: 50px;    
    font-size: 50px;
    color: ${({ ThemeMode }) => (ThemeMode ? 'rgb(92, 93, 94)' : 'rgb(164, 166, 168)')};
    text-align: center;
    box-sizing: border-box;
    animation: ${Rotate_Animation} 1s linear infinite;
    transform-origin: center center;

    @media (max-width: 768px) {
        width: 40px;
        height: 40px;
        font-size: 40px;
    }

    @media (max-width: 480px) {
        width: 30px;
        height: 30px;    
        font-size: 30px;
    }
`;
// Funcionalidad de botón

//____________IMAGE____________
export const Icon_Image_Profile_Dark = styled.img`
    width: 80px; 
    height: 80px;
    border-radius: 50%;
    object-fit: contain;
    border: 4px solid white;
    background-color: transparent;

    @media (max-width: 768px) {
        width: 70px; 
        height: 70px;
    }

    @media (max-width: 480px) {
        width: 60px; 
        height: 60px;
    }
`;
export const Icon_Image_Profile_Light = styled.img`
    width: 80px; 
    height: 80px;
    border-radius: 50%;
    object-fit: contain;
    border: 4px solid black;
    background-color: transparent;
    margin-top: 0px;

    @media (max-width: 768px) {
        width: 70px; 
        height: 70px;
    }

    @media (max-width: 480px) {
        width: 60px; 
        height: 60px;
    }
`;
//____________IMAGE____________


//--------MODAL--------
export const Icon_Warning_Modal = styled.div`
    position: relative;
    display: inline-block;
    cursor: pointer;
    color: #e74c3c; /* Rojo de advertencia */
    font-size: 20px;

    &:hover > div, &:focus > div {
        visibility: visible;
        opacity: 1;
        transform: translateY(0);
    }

    @media (max-width: 768px) {
        font-size: 15px;
    }

    @media (max-width: 480px) {
        font-size: 10px;
    }
`;
export const Icon_Tooltip_Modal = styled.div`
    visibility: hidden;
    opacity: 0;
    position: absolute;
    left: -1100%;
    top: -180%;
    transform: translateX(-50%) translateY(10px);
    background-color: #333;
    color: #fff;
    text-align: center;
    padding: 8px;
    border-radius: 5px;
    white-space: nowrap;
    z-index: 10;
    transition: opacity 0.3s, transform 0.3s;

    &::after {
        content: '';
        position: absolute;
        top: 50%;
        right: 100%;
        margin-top: -5px;
        border-width: 5px;
        border-style: solid;
        border-color: #333 transparent transparent transparent;
    }
    
    @media (max-width: 768px) {
        left: -1250%;
        top: -220%;
    }

    @media (max-width: 480px) {
        left: -1400%;
        top: -260%;
    }
`;
//--------MODAL--------