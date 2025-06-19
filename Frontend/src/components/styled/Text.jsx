//____________IMPORT/EXPORT____________
// Componentes de React externos
import styled from 'styled-components';
// Estilos personalizados
import { Fade_Animation } from './Animations';
//____________IMPORT/EXPORT____________

//____________BACKGROUND____________
//---------- BLUE
//------ CENTER
export const Text_Background_Blue_24_Center = styled.p.withConfig({
    shouldForwardProp: (prop) => prop !== 'ThemeMode',
})`
    color: white;
    background-color: ${({ ThemeMode }) => (ThemeMode ? 'rgb(58,93,174)' : 'rgb(82, 126, 231)')};
    border: ${({ ThemeMode }) => (ThemeMode ? '3px solid rgb(82, 126, 231)' : '3px solid rgb(58,93,174)')};
    border-radius: 15px;
    font-family: Century Gothic,Prompt;
    font-style: normal;
    font-size: 24px;
    text-align: center;
    display: flex;
    justify-content: center;
    padding: 10px;
    width: auto;
    margin: 0px;
    cursor: default;
    
    @media (max-width: 768px) {
        font-size: 22px;
        padding: 8px;
    }

    @media (max-width: 480px) {
        font-size: 20px;
        padding: 6px;
    }
`;
export const Text_Background_Blue_20_Center = styled.p.withConfig({
    shouldForwardProp: (prop) => prop !== 'ThemeMode',
})`
    color: white;
    background-color: ${({ ThemeMode }) => (ThemeMode ? 'rgb(58,93,174)' : 'rgb(82, 126, 231)')};
    border: ${({ ThemeMode }) => (ThemeMode ? '3px solid rgb(82, 126, 231)' : '3px solid rgb(58,93,174)')};
    border-radius: 15px;
    font-family: Century Gothic,Prompt;
    font-style: normal;
    font-size: 20px;
    text-align: center;
    display: flex;
    justify-content: center;
    padding: 10px;
    width: auto;
    margin: 0px;
    cursor: default;

    @media (max-width: 768px) {
        font-size: 18px;
        padding: 8px;
    }

    @media (max-width: 480px) {
        font-size: 16px;
        padding: 6px;
    }
`;
export const Text_Background_Blue_16_Center = styled.p.withConfig({
    shouldForwardProp: (prop) => prop !== 'ThemeMode',
})`
    color: white;
    background-color: ${({ ThemeMode }) => (ThemeMode ? 'rgb(58,93,174)' : 'rgb(82, 126, 231)')};
    border: ${({ ThemeMode }) => (ThemeMode ? '3px solid rgb(82, 126, 231)' : '3px solid rgb(58,93,174)')};
    border-radius: 15px;
    font-family: Century Gothic,Prompt;
    font-style: normal;
    font-size: 16px;
    text-align: center;
    display: flex;
    justify-content: center;
    padding: 10px;
    width: auto;
    margin: 0px;
    cursor: default;

    @media (max-width: 768px) {
        font-size: 14px;
        padding: 8px;
    }

    @media (max-width: 480px) {
        font-size: 12px;
        padding: 6px;
    }
`;
export const Text_Background_Blue_12_Center = styled.p.withConfig({
    shouldForwardProp: (prop) => prop !== 'ThemeMode',
})`
    color: white;
    background-color: ${({ ThemeMode }) => (ThemeMode ? 'rgb(58,93,174)' : 'rgb(82, 126, 231)')};
    border: ${({ ThemeMode }) => (ThemeMode ? '3px solid rgb(82, 126, 231)' : '3px solid rgb(58,93,174)')};
    border-radius: 15px;
    font-family: Century Gothic,Prompt;
    font-style: normal;
    font-size: 12px;
    text-align: center;
    display: flex;
    justify-content: center;
    padding: 10px;
    width: auto;
    margin: 0px;
    cursor: default;

    @media (max-width: 768px) {
        font-size: 10px;
        padding: 8px;
    }

    @media (max-width: 480px) {
        font-size: 8px;
        padding: 6px;
    }
`;
//------ CENTER
//---------- BLUE
//---------- RED
//------ CENTER
export const Text_Background_Red_24_Center = styled.p.withConfig({
    shouldForwardProp: (prop) => prop !== 'ThemeMode',
})`
    color: white;
    background-color: ${({ ThemeMode }) => (ThemeMode ? 'rgb(155, 9, 9)' : 'rgb(208, 31, 31)')};
    border: ${({ ThemeMode }) => (ThemeMode ? '3px solid rgb(208, 31, 31)' : '3px solid rgb(155, 9, 9)')};
    border-radius: 15px;
    font-family: Century Gothic,Prompt;
    font-style: normal;
    font-size: 24px;
    text-align: center;
    display: flex;
    justify-content: center;
    padding: 10px;
    width: auto;
    margin: 0px;
    cursor: default;

    @media (max-width: 768px) {
        font-size: 22px;
        padding: 8px;
    }

    @media (max-width: 480px) {
        font-size: 20px;
        padding: 6px;
    }
`;
export const Text_Background_Red_20_Center = styled.p.withConfig({
    shouldForwardProp: (prop) => prop !== 'ThemeMode',
})`
    color: white;
    background-color: ${({ ThemeMode }) => (ThemeMode ? 'rgb(155, 9, 9)' : 'rgb(208, 31, 31)')};
    border: ${({ ThemeMode }) => (ThemeMode ? '3px solid rgb(208, 31, 31)' : '3px solid rgb(155, 9, 9)')};
    border-radius: 15px;
    font-family: Century Gothic,Prompt;
    font-style: normal;
    font-size: 20px;
    text-align: center;
    display: flex;
    justify-content: center;
    padding: 10px;
    width: auto;
    margin: 0px;
    cursor: default;

    @media (max-width: 768px) {
        font-size: 18px;
        padding: 8px;
    }

    @media (max-width: 480px) {
        font-size: 16px;
        padding: 6px;
    }
`;
export const Text_Background_Red_16_Center = styled.p.withConfig({
    shouldForwardProp: (prop) => prop !== 'ThemeMode',
})`
    color: white;
    background-color: ${({ ThemeMode }) => (ThemeMode ? 'rgb(155, 9, 9)' : 'rgb(208, 31, 31)')};
    border: ${({ ThemeMode }) => (ThemeMode ? '3px solid rgb(208, 31, 31)' : '3px solid rgb(155, 9, 9)')};
    border-radius: 15px;
    font-family: Century Gothic,Prompt;
    font-style: normal;
    font-size: 16px;
    text-align: center;
    display: flex;
    justify-content: center;
    padding: 10px;
    width: auto;
    margin: 0px;
    cursor: default;

    @media (max-width: 768px) {
        font-size: 14px;
        padding: 8px;
    }

    @media (max-width: 480px) {
        font-size: 12px;
        padding: 6px;
    }
`;
export const Text_Background_Red_12_Center = styled.p.withConfig({
    shouldForwardProp: (prop) => prop !== 'ThemeMode',
})`
    color: white;
    background-color: ${({ ThemeMode }) => (ThemeMode ? 'rgb(155, 9, 9)' : 'rgb(208, 31, 31)')};
    border: ${({ ThemeMode }) => (ThemeMode ? '3px solid rgb(208, 31, 31)' : '3px solid rgb(155, 9, 9)')};
    border-radius: 15px;
    font-family: Century Gothic,Prompt;
    font-style: normal;
    font-size: 12px;
    text-align: center;
    display: flex;
    justify-content: center;
    padding: 10px;
    width: auto;
    margin: 0px;
    cursor: default;

    @media (max-width: 768px) {
        font-size: 10px;
        padding: 8px;
    }

    @media (max-width: 480px) {
        font-size: 8px;
        padding: 6px;
    }
`;
//------ CENTER
//---------- RED
//---------- GREEN
//------ CENTER
export const Text_Background_Green_24_Center = styled.p.withConfig({
    shouldForwardProp: (prop) => prop !== 'ThemeMode',
})`
    color: white;
    background-color: ${({ ThemeMode }) => (ThemeMode ? 'rgb(20, 165, 76)' : 'rgb(60, 188, 109)')};
    border: ${({ ThemeMode }) => (ThemeMode ? '3px solid rgb(60, 188, 109)' : '3px solid rgb(20, 165, 76)')};
    border-radius: 15px;
    font-family: Century Gothic,Prompt;
    font-style: normal;
    font-size: 24px;
    text-align: center;
    display: flex;
    justify-content: center;
    padding: 10px;
    width: auto;
    margin: 0px;
    cursor: default;

    @media (max-width: 768px) {
        font-size: 22px;
        padding: 8px;
    }

    @media (max-width: 480px) {
        font-size: 20px;
        padding: 6px;
    }
`;
export const Text_Background_Green_20_Center = styled.p.withConfig({
    shouldForwardProp: (prop) => prop !== 'ThemeMode',
})`
    color: white;
    background-color: ${({ ThemeMode }) => (ThemeMode ? 'rgb(20, 165, 76)' : 'rgb(60, 188, 109)')};
    border: ${({ ThemeMode }) => (ThemeMode ? '3px solid rgb(60, 188, 109)' : '3px solid rgb(20, 165, 76)')};
    border-radius: 15px;
    font-family: Century Gothic,Prompt;
    font-style: normal;
    font-size: 20px;
    text-align: center;
    display: flex;
    justify-content: center;
    padding: 10px;
    width: auto;
    margin: 0px;
    cursor: default;

    @media (max-width: 768px) {
        font-size: 18px;
        padding: 8px;
    }

    @media (max-width: 480px) {
        font-size: 16px;
        padding: 6px;
    }
`;
export const Text_Background_Green_16_Center = styled.p.withConfig({
    shouldForwardProp: (prop) => prop !== 'ThemeMode',
})`
    color: white;
    background-color: ${({ ThemeMode }) => (ThemeMode ? 'rgb(20, 165, 76)' : 'rgb(60, 188, 109)')};
    border: ${({ ThemeMode }) => (ThemeMode ? '3px solid rgb(60, 188, 109)' : '3px solid rgb(20, 165, 76)')};
    border-radius: 15px;
    font-family: Century Gothic,Prompt;
    font-style: normal;
    font-size: 16px;
    text-align: center;
    display: flex;
    justify-content: center;
    padding: 10px;
    width: auto;
    margin: 0px;
    cursor: default;

    @media (max-width: 768px) {
        font-size: 14px;
        padding: 8px;
    }

    @media (max-width: 480px) {
        font-size: 12px;
        padding: 6px;
    }
`;
export const Text_Background_Green_12_Center = styled.p.withConfig({
    shouldForwardProp: (prop) => prop !== 'ThemeMode',
})`
    color: white;
    background-color: ${({ ThemeMode }) => (ThemeMode ? 'rgb(20, 165, 76)' : 'rgb(60, 188, 109)')};
    border: ${({ ThemeMode }) => (ThemeMode ? '3px solid rgb(60, 188, 109)' : '3px solid rgb(20, 165, 76)')};
    border-radius: 15px;
    font-family: Century Gothic,Prompt;
    font-style: normal;
    font-size: 12px;
    text-align: center;
    display: flex;
    justify-content: center;
    padding: 10px;
    width: auto;
    margin: 0px;
    cursor: default;

    @media (max-width: 768px) {
        font-size: 10px;
        padding: 8px;
    }

    @media (max-width: 480px) {
        font-size: 8px;
        padding: 6px;
    }
`;
//------ CENTER
//---------- GREEN
//---------- YELLOW
//------ CENTER
export const Text_Background_Yellow_24_Center = styled.p.withConfig({
    shouldForwardProp: (prop) => prop !== 'ThemeMode',
})`
    color: white;
    background-color: ${({ ThemeMode }) => (ThemeMode ? 'rgb(250, 207, 66)' : 'rgb(235, 191, 71)')};
    border: ${({ ThemeMode }) => (ThemeMode ? '3px solid rgb(235, 191, 71)' : '3px solid rgb(250, 207, 66)')};
    border-radius: 15px;
    font-family: Century Gothic,Prompt;
    font-style: normal;
    font-size: 24px;
    text-align: center;
    display: flex;
    justify-content: center;
    padding: 10px;
    width: auto;
    margin: 0px;
    cursor: default;

    @media (max-width: 768px) {
        font-size: 22px;
        padding: 8px;
    }

    @media (max-width: 480px) {
        font-size: 20px;
        padding: 6px;
    }
`;
export const Text_Background_Yellow_20_Center = styled.p.withConfig({
    shouldForwardProp: (prop) => prop !== 'ThemeMode',
})`
    color: white;
    background-color: ${({ ThemeMode }) => (ThemeMode ? 'rgb(250, 207, 66)' : 'rgb(235, 191, 71)')};
    border: ${({ ThemeMode }) => (ThemeMode ? '3px solid rgb(235, 191, 71)' : '3px solid rgb(250, 207, 66)')};
    border-radius: 15px;
    font-family: Century Gothic,Prompt;
    font-style: normal;
    font-size: 20px;
    text-align: center;
    display: flex;
    justify-content: center;
    padding: 10px;
    width: auto;
    margin: 0px;
    cursor: default;

    @media (max-width: 768px) {
        font-size: 18px;
        padding: 8px;
    }

    @media (max-width: 480px) {
        font-size: 16px;
        padding: 6px;
    }
`;
export const Text_Background_Yellow_16_Center = styled.p.withConfig({
    shouldForwardProp: (prop) => prop !== 'ThemeMode',
})`
    color: white;
    background-color: ${({ ThemeMode }) => (ThemeMode ? 'rgb(250, 207, 66)' : 'rgb(235, 191, 71)')};
    border: ${({ ThemeMode }) => (ThemeMode ? '3px solid rgb(235, 191, 71)' : '3px solid rgb(250, 207, 66)')};
    border-radius: 15px;
    font-family: Century Gothic,Prompt;
    font-style: normal;
    font-size: 16px;
    text-align: center;
    display: flex;
    justify-content: center;
    padding: 10px;
    width: auto;
    margin: 0px;
    cursor: default;

    @media (max-width: 768px) {
        font-size: 14px;
        padding: 8px;
    }

    @media (max-width: 480px) {
        font-size: 12px;
        padding: 6px;
    }
`;
export const Text_Background_Yellow_12_Center = styled.p.withConfig({
    shouldForwardProp: (prop) => prop !== 'ThemeMode',
})`
    color: white;
    background-color: ${({ ThemeMode }) => (ThemeMode ? 'rgb(250, 207, 66)' : 'rgb(235, 191, 71)')};
    border: ${({ ThemeMode }) => (ThemeMode ? '3px solid rgb(235, 191, 71)' : '3px solid rgb(250, 207, 66)')};
    border-radius: 15px;
    font-family: Century Gothic,Prompt;
    font-style: normal;
    font-size: 12px;
    text-align: center;
    display: flex;
    justify-content: center;
    padding: 10px;
    width: auto;
    margin: 0px;
    cursor: default;

    @media (max-width: 768px) {
        font-size: 10px;
        padding: 8px;
    }

    @media (max-width: 480px) {
        font-size: 8px;
        padding: 6px;
    }
`;
//------ CENTER
//---------- YELLOW
//---------- ORANGE
export const Text_Background_Orange_24_Center = styled.p.withConfig({
    shouldForwardProp: (prop) => prop !== 'ThemeMode',
})`
    color: white;
    background-color: ${({ ThemeMode }) => (ThemeMode ? 'rgb(235, 108, 23)' : 'rgb(207, 122, 52)')};
    border: ${({ ThemeMode }) => (ThemeMode ? '3px solid rgb(207, 122, 52)' : '3px solid rgb(235, 108, 23)')};
    border-radius: 15px;
    font-family: Century Gothic,Prompt;
    font-style: normal;
    font-size: 24px;
    text-align: center;
    display: flex;
    justify-content: center;
    padding: 10px;
    width: auto;
    margin: 0px;
    cursor: default;

    @media (max-width: 768px) {
        font-size: 22px;
        padding: 8px;
    }

    @media (max-width: 480px) {
        font-size: 20px;
        padding: 6px;
    }
`;
export const Text_Background_Orange_20_Center = styled.p.withConfig({
    shouldForwardProp: (prop) => prop !== 'ThemeMode',
})`
    color: white;
    background-color: ${({ ThemeMode }) => (ThemeMode ? 'rgb(235, 108, 23)' : 'rgb(207, 122, 52)')};
    border: ${({ ThemeMode }) => (ThemeMode ? '3px solid rgb(207, 122, 52)' : '3px solid rgb(235, 108, 23)')};
    border-radius: 15px;
    font-family: Century Gothic,Prompt;
    font-style: normal;
    font-size: 20px;
    text-align: center;
    display: flex;
    justify-content: center;
    padding: 10px;
    width: auto;
    margin: 0px;
    cursor: default;

    @media (max-width: 768px) {
        font-size: 18px;
        padding: 8px;
    }

    @media (max-width: 480px) {
        font-size: 16px;
        padding: 6px;
    }
`;
export const Text_Background_Orange_16_Center = styled.p.withConfig({
    shouldForwardProp: (prop) => prop !== 'ThemeMode',
})`
    color: white;
    background-color: ${({ ThemeMode }) => (ThemeMode ? 'rgb(235, 108, 23)' : 'rgb(207, 122, 52)')};
    border: ${({ ThemeMode }) => (ThemeMode ? '3px solid rgb(207, 122, 52)' : '3px solid rgb(235, 108, 23)')};
    border-radius: 15px;
    font-family: Century Gothic,Prompt;
    font-style: normal;
    font-size: 16px;
    text-align: center;
    display: flex;
    justify-content: center;
    padding: 10px;
    width: auto;
    margin: 0px;
    cursor: default;

    @media (max-width: 768px) {
        font-size: 14px;
        padding: 8px;
    }

    @media (max-width: 480px) {
        font-size: 12px;
        padding: 6px;
    }
`;
export const Text_Background_Orange_12_Center = styled.p.withConfig({
    shouldForwardProp: (prop) => prop !== 'ThemeMode',
})`
    color: white;
    background-color: ${({ ThemeMode }) => (ThemeMode ? 'rgb(235, 108, 23)' : 'rgb(207, 122, 52)')};
    border: ${({ ThemeMode }) => (ThemeMode ? '3px solid rgb(207, 122, 52)' : '3px solid rgb(235, 108, 23)')};
    border-radius: 15px;
    font-family: Century Gothic,Prompt;
    font-style: normal;
    font-size: 12px;
    text-align: center;
    display: flex;
    justify-content: center;
    padding: 10px;
    width: auto;
    margin: 0px;
    cursor: default;

    @media (max-width: 768px) {
        font-size: 10px;
        padding: 8px;
    }

    @media (max-width: 480px) {
        font-size: 8px;
        padding: 6px;
    }
`;
//---------- ORANGE
//---------- LIME GREEN
export const Text_Background_Lime_Green_24_Center = styled.p.withConfig({
    shouldForwardProp: (prop) => prop !== 'ThemeMode',
})`
    color: white;
    background-color: ${({ ThemeMode }) => (ThemeMode ? 'rgb(160, 187, 39)' : 'rgb(174, 190, 100)')};
    border: ${({ ThemeMode }) => (ThemeMode ? '3px solid rgb(174, 190, 100)' : '3px solid rgb(160, 187, 39)')};
    border-radius: 15px;
    font-family: Century Gothic,Prompt;
    font-style: normal;
    font-size: 24px;
    text-align: center;
    display: flex;
    justify-content: center;
    padding: 10px;
    width: auto;
    margin: 0px;
    cursor: default;

    @media (max-width: 768px) {
        font-size: 22px;
        padding: 8px;
    }

    @media (max-width: 480px) {
        font-size: 20px;
        padding: 6px;
    }
`;
export const Text_Background_Lime_Green_20_Center = styled.p.withConfig({
    shouldForwardProp: (prop) => prop !== 'ThemeMode',
})`
    color: white;
    background-color: ${({ ThemeMode }) => (ThemeMode ? 'rgb(160, 187, 39)' : 'rgb(174, 190, 100)')};
    border: ${({ ThemeMode }) => (ThemeMode ? '3px solid rgb(174, 190, 100)' : '3px solid rgb(160, 187, 39)')};
    border-radius: 15px;
    font-family: Century Gothic,Prompt;
    font-style: normal;
    font-size: 20px;
    text-align: center;
    display: flex;
    justify-content: center;
    padding: 10px;
    width: auto;
    margin: 0px;
    cursor: default;

    @media (max-width: 768px) {
        font-size: 18px;
        padding: 8px;
    }

    @media (max-width: 480px) {
        font-size: 16px;
        padding: 6px;
    }
`;
export const Text_Background_Lime_Green_16_Center = styled.p.withConfig({
    shouldForwardProp: (prop) => prop !== 'ThemeMode',
})`
    color: white;
    background-color: ${({ ThemeMode }) => (ThemeMode ? 'rgb(160, 187, 39)' : 'rgb(174, 190, 100)')};
    border: ${({ ThemeMode }) => (ThemeMode ? '3px solid rgb(174, 190, 100)' : '3px solid rgb(160, 187, 39)')};
    border-radius: 15px;
    font-family: Century Gothic,Prompt;
    font-style: normal;
    font-size: 16px;
    text-align: center;
    display: flex;
    justify-content: center;
    padding: 10px;
    width: auto;
    margin: 0px;
    cursor: default;

    @media (max-width: 768px) {
        font-size: 14px;
        padding: 8px;
    }

    @media (max-width: 480px) {
        font-size: 12px;
        padding: 6px;
    }
`;
export const Text_Background_Lime_Green_12_Center = styled.p.withConfig({
    shouldForwardProp: (prop) => prop !== 'ThemeMode',
})`
    color: white;
    background-color: ${({ ThemeMode }) => (ThemeMode ? 'rgb(160, 187, 39)' : 'rgb(174, 190, 100)')};
    border: ${({ ThemeMode }) => (ThemeMode ? '3px solid rgb(174, 190, 100)' : '3px solid rgb(160, 187, 39)')};
    border-radius: 15px;
    font-family: Century Gothic,Prompt;
    font-style: normal;
    font-size: 12px;
    text-align: center;
    display: flex;
    justify-content: center;
    padding: 10px;
    width: auto;
    margin: 0px;
    cursor: default;

    @media (max-width: 768px) {
        font-size: 10px;
        padding: 8px;
    }

    @media (max-width: 480px) {
        font-size: 8px;
        padding: 6px;
    }
`;
//---------- LIME GREEN
//____________BACKGROUND____________
//____________COLOR____________
//---------- BLUE
//-------- CENTER
export const Text_Blue_24_Center = styled.h1.withConfig({
    shouldForwardProp: (prop) => prop !== 'ThemeMode',
})`
    color: ${({ ThemeMode }) => (ThemeMode ? 'rgb(58,93,174)' : 'rgb(82, 126, 231)')};
    font-family: Century Gothic,Prompt;
    font-style: normal;
    font-size: 24px;
    text-align: center;
    display: flex;
    justify-content: center;
    width: auto;
    margin: 0px;
    cursor: default;

    @media (max-width: 768px) {
        font-size: 22px;
    }

    @media (max-width: 480px) {
        font-size: 20px;
    }
`;
export const Text_Blue_20_Center = styled.h1.withConfig({
    shouldForwardProp: (prop) => prop !== 'ThemeMode',
})`
    color: ${({ ThemeMode }) => (ThemeMode ? 'rgb(58,93,174)' : 'rgb(82, 126, 231)')};
    font-family: Century Gothic,Prompt;
    font-style: normal;
    font-size: 20px;
    text-align: center;
    display: flex;
    justify-content: center;
    width: auto;
    margin: 0px;
    cursor: default;

    @media (max-width: 768px) {
        font-size: 18px;
    }

    @media (max-width: 480px) {
        font-size: 16px;
    }
`;
export const Text_Blue_16_Center = styled.h1.withConfig({
    shouldForwardProp: (prop) => prop !== 'ThemeMode',
})`
    color: ${({ ThemeMode }) => (ThemeMode ? 'rgb(58,93,174)' : 'rgb(82, 126, 231)')};
    font-family: Century Gothic,Prompt;
    font-style: normal;
    font-size: 16px;
    text-align: center;
    display: flex;
    justify-content: center;
    width: auto;
    margin: 0px;
    cursor: default;

    @media (max-width: 768px) {
        font-size: 14px;
    }

    @media (max-width: 480px) {
        font-size: 12px;
    }
`;
export const Text_Blue_12_Center = styled.h1.withConfig({
    shouldForwardProp: (prop) => prop !== 'ThemeMode',
})`
    color: ${({ ThemeMode }) => (ThemeMode ? 'black' : 'white')};
    font-family: Century Gothic,Prompt;
    font-style: normal;
    font-size: 12px;
    text-align: center;
    display: flex;
    justify-content: center;
    width: auto;
    margin: 0px;
    cursor: default;

    @media (max-width: 768px) {
        font-size: 10px;
    }

    @media (max-width: 480px) {
        font-size: 8px;
    }
`;
//-------- CENTER
//-------- JUSTIFY
export const Text_Blue_24_Justify = styled.h1.withConfig({
    shouldForwardProp: (prop) => prop !== 'ThemeMode',
})`
    color: ${({ ThemeMode }) => (ThemeMode ? 'rgb(58,93,174)' : 'rgb(82, 126, 231)')};
    font-family: Century Gothic,Prompt;
    font-style: normal;
    font-size: 24px;
    text-align: justify;
    display: flex;
    justify-content: center;
    width: auto;
    margin: 0px;
    cursor: default;

    @media (max-width: 768px) {
        font-size: 22px;
    }

    @media (max-width: 480px) {
        font-size: 20px;
    }
`;
export const Text_Blue_20_Justify = styled.h1.withConfig({
    shouldForwardProp: (prop) => prop !== 'ThemeMode',
})`
    color: ${({ ThemeMode }) => (ThemeMode ? 'rgb(58,93,174)' : 'rgb(82, 126, 231)')};
    font-family: Century Gothic,Prompt;
    font-style: normal;
    font-size: 20px;
    text-align: justify;
    display: flex;
    justify-content: center;
    width: auto;
    margin: 0px;
    cursor: default;

    @media (max-width: 768px) {
        font-size: 18px;
    }

    @media (max-width: 480px) {
        font-size: 16px;
    }
`;
export const Text_Blue_16_Justify = styled.h1.withConfig({
    shouldForwardProp: (prop) => prop !== 'ThemeMode',
})`
    color: ${({ ThemeMode }) => (ThemeMode ? 'rgb(58,93,174)' : 'rgb(82, 126, 231)')};
    font-family: Century Gothic,Prompt;
    font-style: normal;
    font-size: 16px;
    text-align: justify;
    display: flex;
    justify-content: center;
    width: auto;
    margin: 0px;
    cursor: default;

    @media (max-width: 768px) {
        font-size: 14px;
    }

    @media (max-width: 480px) {
        font-size: 12px;
    }
`;
export const Text_Blue_12_Justify = styled.h1.withConfig({
    shouldForwardProp: (prop) => prop !== 'ThemeMode',
})`
    color: ${({ ThemeMode }) => (ThemeMode ? 'rgb(58,93,174)' : 'rgb(82, 126, 231)')};
    font-family: Century Gothic,Prompt;
    font-style: normal;
    font-size: 12px;
    text-align: justify;
    display: flex;
    justify-content: center;
    width: auto;
    margin: 0px;
    cursor: default;

    @media (max-width: 768px) {
        font-size: 10px;
    }

    @media (max-width: 480px) {
        font-size: 8px;
    }
`;
//-------- JUSTIFY
//-------- LEFT
export const Text_Blue_24_Left = styled.h1.withConfig({
    shouldForwardProp: (prop) => prop !== 'ThemeMode',
})`
    color: ${({ ThemeMode }) => (ThemeMode ? 'rgb(58,93,174)' : 'rgb(82, 126, 231)')};
    font-family: Century Gothic,Prompt;
    font-style: normal;
    font-size: 24px;
    text-align: left;
    display: flex;
    justify-content: flex-start;
    width: auto;
    margin: 0px;
    cursor: default;

    @media (max-width: 768px) {
        font-size: 22px;
    }

    @media (max-width: 480px) {
        font-size: 20px;
    }
`;
export const Text_Blue_20_Left = styled.h1.withConfig({
    shouldForwardProp: (prop) => prop !== 'ThemeMode',
})`
    color: ${({ ThemeMode }) => (ThemeMode ? 'rgb(58,93,174)' : 'rgb(82, 126, 231)')};
    font-family: Century Gothic,Prompt;
    font-style: normal;
    font-size: 20px;
    text-align: left;
    display: flex;
    justify-content: flex-start;
    width: auto;
    margin: 0px;
    cursor: default;

    @media (max-width: 768px) {
        font-size: 18px;
    }

    @media (max-width: 480px) {
        font-size: 16px;
    }
`;
export const Text_Blue_16_Left = styled.h1.withConfig({
    shouldForwardProp: (prop) => prop !== 'ThemeMode',
})`
    color: ${({ ThemeMode }) => (ThemeMode ? 'rgb(58,93,174)' : 'rgb(82, 126, 231)')};
    font-family: Century Gothic,Prompt;
    font-style: normal;
    font-size: 16px;
    text-align: left;
    display: flex;
    justify-content: flex-start;
    width: auto;
    margin: 0px;
    cursor: default;

    @media (max-width: 768px) {
        font-size: 14px;
    }

    @media (max-width: 480px) {
        font-size: 12px;
    }
`;
export const Text_Blue_12_Left = styled.h1.withConfig({
    shouldForwardProp: (prop) => prop !== 'ThemeMode',
})`
    color: ${({ ThemeMode }) => (ThemeMode ? 'rgb(58,93,174)' : 'rgb(82, 126, 231)')};
    font-family: Century Gothic,Prompt;
    font-style: normal;
    font-size: 12px;
    text-align: left;
    display: flex;
    justify-content: flex-start;
    width: auto;
    margin: 0px;
    cursor: default;

    @media (max-width: 768px) {
        font-size: 10px;
    }

    @media (max-width: 480px) {
        font-size: 8px;
    }
`;
//-------- LEFT
//-------- RIGHT
export const Text_Blue_24_Right = styled.h1.withConfig({
    shouldForwardProp: (prop) => prop !== 'ThemeMode',
})`
    color: ${({ ThemeMode }) => (ThemeMode ? 'rgb(58,93,174)' : 'rgb(82, 126, 231)')};
    font-family: Century Gothic,Prompt;
    font-style: normal;
    font-size: 24px;
    text-align: right;
    display: flex;
    justify-content: flex-end;
    width: auto;
    margin: 0px;
    cursor: default;

    @media (max-width: 768px) {
        font-size: 22px;
    }

    @media (max-width: 480px) {
        font-size: 20px;
    }
`;
export const Text_Blue_20_Right = styled.h1.withConfig({
    shouldForwardProp: (prop) => prop !== 'ThemeMode',
})`
    color: ${({ ThemeMode }) => (ThemeMode ? 'rgb(58,93,174)' : 'rgb(82, 126, 231)')};
    font-family: Century Gothic,Prompt;
    font-style: normal;
    font-size: 20px;
    text-align: right;
    display: flex;
    justify-content: flex-end;
    width: auto;
    margin: 0px;
    cursor: default;

    @media (max-width: 768px) {
        font-size: 18px;
    }

    @media (max-width: 480px) {
        font-size: 16px;
    }
`;
export const Text_Blue_16_Right = styled.h1.withConfig({
    shouldForwardProp: (prop) => prop !== 'ThemeMode',
})`
    color: ${({ ThemeMode }) => (ThemeMode ? 'rgb(58,93,174)' : 'rgb(82, 126, 231)')};
    font-family: Century Gothic,Prompt;
    font-style: normal;
    font-size: 16px;
    text-align: right;
    display: flex;
    justify-content: flex-end;
    width: auto;
    margin: 0px;
    cursor: default;

    @media (max-width: 768px) {
        font-size: 14px;
    }

    @media (max-width: 480px) {
        font-size: 12px;
    }
`;
export const Text_Blue_12_Right = styled.h1.withConfig({
    shouldForwardProp: (prop) => prop !== 'ThemeMode',
})`
    color: ${({ ThemeMode }) => (ThemeMode ? 'rgb(58,93,174)' : 'rgb(82, 126, 231)')};
    font-family: Century Gothic,Prompt;
    font-style: normal;
    font-size: 12px;
    text-align: right;
    display: flex;
    justify-content: flex-end;
    width: auto;
    margin: 0px;
    cursor: default;

    @media (max-width: 768px) {
        font-size: 10px;
    }

    @media (max-width: 480px) {
        font-size: 8px;
    }
`;
//-------- RIGHT
//---------- BLUE
//---------- WHITE
export const Text_White_50_Center = styled.h1`
    color: white;
    font-family: Century Gothic,Prompt;
    font-style: normal;
    font-size: 50px;
    text-align: center;
    width: auto;
    padding: 10px;
    margin: 0px;
    cursor: default;

    @media (max-width: 768px) {
        font-size: 45px;
        padding: 8px;
    }

    @media (max-width: 480px) {
        font-size: 40px;
        padding: 6px;
    }
`;
export const Text_White_40_Center = styled.h1`
    color: white;
    font-family: Century Gothic,Prompt;
    font-style: normal;
    font-size: 40px;
    text-align: center;
    width: auto;
    padding: 10px;
    margin: 0px;
    cursor: default;

    @media (max-width: 768px) {
        font-size: 35px;
        padding: 8px;
    }

    @media (max-width: 480px) {
        font-size: 30px;
        padding: 6px;
    }
`;
//---------- WHITE
//---------- BLACK
export const Text_Black_50_Center = styled.h1`
    color: black;
    font-family: Century Gothic,Prompt;
    font-style: normal;
    font-size: 50px;
    text-align: center;
    width: auto;
    padding: 10px;
    margin: 0px;
    cursor: default;

    @media (max-width: 768px) {
        font-size: 45px;
        padding: 8px;
    }

    @media (max-width: 480px) {
        font-size: 40px;
        padding: 6px;
    }
`;
export const Text_Black_40_Center = styled.h1`
    color: black;
    font-family: Century Gothic,Prompt;
    font-style: normal;
    font-size: 40px;
    text-align: center;
    width: auto;
    padding: 10px;
    margin: 0px;
    cursor: default;

    @media (max-width: 768px) {
        font-size: 35px;
        padding: 8px;
    }

    @media (max-width: 480px) {
        font-size: 30px;
        padding: 6px;
    }
`;
//---------- BLACK
//---------- BLACK/WHITE
export const Text_Black_White_50_Center = styled.h1.withConfig({
    shouldForwardProp: (prop) => prop !== 'ThemeMode',
})`
    color: ${({ ThemeMode }) => (ThemeMode ? 'black' : 'white')};
    font-family: Century Gothic,Prompt;
    font-style: normal;
    font-size: 50px;
    text-align: center;
    width: auto;
    padding: 10px;
    margin: 0px;
    cursor: default;

    @media (max-width: 768px) {
        font-size: 45px;
        padding: 8px;
    }

    @media (max-width: 480px) {
        font-size: 40px;
        padding: 6px;
    }
`;
export const Text_Black_White_40_Center = styled.h1.withConfig({
    shouldForwardProp: (prop) => prop !== 'ThemeMode',
})`
    color: ${({ ThemeMode }) => (ThemeMode ? 'black' : 'white')};
    font-family: Century Gothic,Prompt;
    font-style: normal;
    font-size: 40px;
    text-align: center;
    width: auto;
    padding: 10px;
    margin: 0px;
    cursor: default;

    @media (max-width: 768px) {
        font-size: 35px;
        padding: 8px;
    }

    @media (max-width: 480px) {
        font-size: 30px;
        padding: 6px;
    }
`;
//---------- BLACK/WHITE
//---------- WHITE/BLACK
export const Text_White_Black_50_Center = styled.h1.withConfig({
    shouldForwardProp: (prop) => prop !== 'ThemeMode',
})`
    color: ${({ ThemeMode }) => (ThemeMode ? 'white' : 'black')};
    font-family: Century Gothic,Prompt;
    font-style: normal;
    font-size: 50px;
    text-align: center;
    width: auto;
    padding: 10px;
    margin: 0px;
    cursor: default;

    @media (max-width: 768px) {
        font-size: 45px;
        padding: 8px;
    }

    @media (max-width: 480px) {
        font-size: 40px;
        padding: 6px;
    }
`;
export const Text_White_Black_40_Center = styled.h1.withConfig({
    shouldForwardProp: (prop) => prop !== 'ThemeMode',
})`
    color: ${({ ThemeMode }) => (ThemeMode ? 'white' : 'black')};
    font-family: Century Gothic,Prompt;
    font-style: normal;
    font-size: 40px;
    text-align: center;
    width: auto;
    padding: 10px;
    margin: 0px;
    cursor: default;

    @media (max-width: 768px) {
        font-size: 35px;
        padding: 8px;
    }

    @media (max-width: 480px) {
        font-size: 30px;
        padding: 6px;
    }
`;
//---------- WHITE/BLACK
//____________COLOR____________
//____________TITLE____________
//---------- CENTER
export const Text_Title_42_Center = styled.h1.withConfig({
    shouldForwardProp: (prop) => prop !== 'ThemeMode',
})`
    color: ${({ ThemeMode }) => (ThemeMode ? 'black' : 'white')};
    font-family: Century Gothic,Prompt;
    font-style: italic;
    font-size: 42px;
    text-align: center;
    width: auto;
    padding: 10px;
    margin: 0px;
    cursor: default;

    @media (max-width: 768px) {
        font-size: 38px;
        padding: 8px;
    }

    @media (max-width: 480px) {
        font-size: 34px;
        padding: 6px;
    }
`;
export const Text_Title_38_Center = styled.h1.withConfig({
    shouldForwardProp: (prop) => prop !== 'ThemeMode',
})`
    color: ${({ ThemeMode }) => (ThemeMode ? 'black' : 'white')};
    font-family: Century Gothic,Prompt;
    font-style: italic;
    font-size: 38px;
    text-align: center;
    width: auto;
    padding: 10px;
    margin: 0px;
    cursor: default;

    @media (max-width: 768px) {
        font-size: 34px;
        padding: 8px;
    }

    @media (max-width: 480px) {
        font-size: 30px;
        padding: 6px;
    }
`;
export const Text_Title_34_Center = styled.h1.withConfig({
    shouldForwardProp: (prop) => prop !== 'ThemeMode',
})`
    color: ${({ ThemeMode }) => (ThemeMode ? 'black' : 'white')};
    font-family: Century Gothic,Prompt;
    font-style: italic;
    font-size: 34px;
    text-align: center;
    width: auto;
    padding: 10px;
    margin: 0px;
    cursor: default;

    @media (max-width: 768px) {
        font-size: 30px;
        padding: 8px;
    }

    @media (max-width: 480px) {
        font-size: 26px;
        padding: 6px;
    }
`;
export const Text_Title_30_Center = styled.h1.withConfig({
    shouldForwardProp: (prop) => prop !== 'ThemeMode',
})`
    color: ${({ ThemeMode }) => (ThemeMode ? 'black' : 'white')};
    font-family: Century Gothic,Prompt;
    font-style: italic;
    font-size: 30px;
    text-align: center;
    width: auto;
    padding: 10px;
    margin: 0px;
    cursor: default;

    @media (max-width: 768px) {
        font-size: 26px;
        padding: 8px;
    }

    @media (max-width: 480px) {
        font-size: 22px;
        padding: 6px;
    }
`;
export const Text_Title_26_Center = styled.h1.withConfig({
    shouldForwardProp: (prop) => prop !== 'ThemeMode',
})`
    color: ${({ ThemeMode }) => (ThemeMode ? 'black' : 'white')};
    font-family: Century Gothic,Prompt;
    font-style: italic;
    font-size: 26px;
    text-align: center;
    width: auto;
    padding: 10px;
    margin: 0px;
    cursor: default;

    @media (max-width: 768px) {
        font-size: 22px;
        padding: 8px;
    }

    @media (max-width: 480px) {
        font-size: 18px;
        padding: 6px;
    }
`;
export const Text_Title_22_Center = styled.h1.withConfig({
    shouldForwardProp: (prop) => prop !== 'ThemeMode',
})`
    color: ${({ ThemeMode }) => (ThemeMode ? 'black' : 'white')};
    font-family: Century Gothic,Prompt;
    font-style: italic;
    font-size: 22px;
    text-align: center;
    width: auto;
    padding: 10px;
    margin: 0px;
    cursor: default;

    @media (max-width: 768px) {
        font-size: 18px;
        padding: 8px;
    }

    @media (max-width: 480px) {
        font-size: 14px;
        padding: 6px;
    }
`;
//---------- CENTER
//---------- JUSTIFY
export const Text_Title_42_Justify = styled.h1.withConfig({
    shouldForwardProp: (prop) => prop !== 'ThemeMode',
})`
    color: ${({ ThemeMode }) => (ThemeMode ? 'black' : 'white')};
    font-family: Century Gothic,Prompt;
    font-style: italic;
    font-size: 42px;
    text-align: justify;
    width: auto;
    padding: 10px;
    margin: 0px;
    cursor: default;

    @media (max-width: 768px) {
        font-size: 38px;
        padding: 8px;
    }

    @media (max-width: 480px) {
        font-size: 34px;
        padding: 6px;
    }
`;
export const Text_Title_38_Justify = styled.h1.withConfig({
    shouldForwardProp: (prop) => prop !== 'ThemeMode',
})`
    color: ${({ ThemeMode }) => (ThemeMode ? 'black' : 'white')};
    font-family: Century Gothic,Prompt;
    font-style: italic;
    font-size: 38px;
    text-align: justify;
    width: auto;
    padding: 10px;
    margin: 0px;
    cursor: default;

    @media (max-width: 768px) {
        font-size: 34px;
        padding: 8px;
    }

    @media (max-width: 480px) {
        font-size: 30px;
        padding: 6px;
    }
`;
export const Text_Title_34_Justify = styled.h1.withConfig({
    shouldForwardProp: (prop) => prop !== 'ThemeMode',
})`
    color: ${({ ThemeMode }) => (ThemeMode ? 'black' : 'white')};
    font-family: Century Gothic,Prompt;
    font-style: italic;
    font-size: 34px;
    text-align: justify;
    width: auto;
    padding: 10px;
    margin: 0px;
    cursor: default;

    @media (max-width: 768px) {
        font-size: 30px;
        padding: 8px;
    }

    @media (max-width: 480px) {
        font-size: 26px;
        padding: 6px;
    }
`;
export const Text_Title_30_Justify = styled.h1.withConfig({
    shouldForwardProp: (prop) => prop !== 'ThemeMode',
})`
    color: ${({ ThemeMode }) => (ThemeMode ? 'black' : 'white')};
    font-family: Century Gothic,Prompt;
    font-style: italic;
    font-size: 30px;
    text-align: justify;
    width: auto;
    padding: 10px;
    margin: 0px;
    cursor: default;

    @media (max-width: 768px) {
        font-size: 26px;
        padding: 8px;
    }

    @media (max-width: 480px) {
        font-size: 22px;
        padding: 6px;
    }
`;
export const Text_Title_26_Justify = styled.h1.withConfig({
    shouldForwardProp: (prop) => prop !== 'ThemeMode',
})`
    color: ${({ ThemeMode }) => (ThemeMode ? 'black' : 'white')};
    font-family: Century Gothic,Prompt;
    font-style: italic;
    font-size: 26px;
    text-align: justify;
    width: auto;
    padding: 10px;
    margin: 0px;
    cursor: default;

    @media (max-width: 768px) {
        font-size: 22px;
        padding: 8px;
    }

    @media (max-width: 480px) {
        font-size: 18px;
        padding: 6px;
    }
`;
export const Text_Title_22_Justify = styled.h1.withConfig({
    shouldForwardProp: (prop) => prop !== 'ThemeMode',
})`
    color: ${({ ThemeMode }) => (ThemeMode ? 'black' : 'white')};
    font-family: Century Gothic,Prompt;
    font-style: italic;
    font-size: 22px;
    text-align: justify;
    width: auto;
    padding: 10px;
    margin: 0px;
    cursor: default;

    @media (max-width: 768px) {
        font-size: 18px;
        padding: 8px;
    }

    @media (max-width: 480px) {
        font-size: 14px;
        padding: 6px;
    }
`;
//---------- JUSTIFY
//---------- LEFT
export const Text_Title_42_Left = styled.h1.withConfig({
    shouldForwardProp: (prop) => prop !== 'ThemeMode',
})`
    color: ${({ ThemeMode }) => (ThemeMode ? 'black' : 'white')};
    font-family: Century Gothic,Prompt;
    font-style: italic;
    font-size: 42px;
    text-align: left;
    width: auto;
    padding: 10px;
    margin: 0px;
    cursor: default;

    @media (max-width: 768px) {
        font-size: 38px;
        padding: 8px;
    }

    @media (max-width: 480px) {
        font-size: 34px;
        padding: 6px;
    }
`;
export const Text_Title_38_Left = styled.h1.withConfig({
    shouldForwardProp: (prop) => prop !== 'ThemeMode',
})`
    color: ${({ ThemeMode }) => (ThemeMode ? 'black' : 'white')};
    font-family: Century Gothic,Prompt;
    font-style: italic;
    font-size: 38px;
    text-align: left;
    width: auto;
    padding: 10px;
    margin: 0px;
    cursor: default;

    @media (max-width: 768px) {
        font-size: 34px;
        padding: 8px;
    }

    @media (max-width: 480px) {
        font-size: 30px;
        padding: 6px;
    }
`;
export const Text_Title_34_Left = styled.h1.withConfig({
    shouldForwardProp: (prop) => prop !== 'ThemeMode',
})`
    color: ${({ ThemeMode }) => (ThemeMode ? 'black' : 'white')};
    font-family: Century Gothic,Prompt;
    font-style: italic;
    font-size: 34px;
    text-align: left;
    width: auto;
    padding: 10px;
    margin: 0px;
    cursor: default;

    @media (max-width: 768px) {
        font-size: 30px;
        padding: 8px;
    }

    @media (max-width: 480px) {
        font-size: 26px;
        padding: 6px;
    }
`;
export const Text_Title_30_Left = styled.h1.withConfig({
    shouldForwardProp: (prop) => prop !== 'ThemeMode',
})`
    color: ${({ ThemeMode }) => (ThemeMode ? 'black' : 'white')};
    font-family: Century Gothic,Prompt;
    font-style: italic;
    font-size: 30px;
    text-align: left;
    width: auto;
    padding: 10px;
    margin: 0px;
    cursor: default;

    @media (max-width: 768px) {
        font-size: 26px;
        padding: 8px;
    }

    @media (max-width: 480px) {
        font-size: 22px;
        padding: 6px;
    }
`;
export const Text_Title_26_Left = styled.h1.withConfig({
    shouldForwardProp: (prop) => prop !== 'ThemeMode',
})`
    color: ${({ ThemeMode }) => (ThemeMode ? 'black' : 'white')};
    font-family: Century Gothic,Prompt;
    font-style: italic;
    font-size: 26px;
    text-align: left;
    width: auto;
    padding: 10px;
    margin: 0px;
    cursor: default;

    @media (max-width: 768px) {
        font-size: 22px;
        padding: 8px;
    }

    @media (max-width: 480px) {
        font-size: 18px;
        padding: 6px;
    }
`;
export const Text_Title_22_Left = styled.h1.withConfig({
    shouldForwardProp: (prop) => prop !== 'ThemeMode',
})`
    color: ${({ ThemeMode }) => (ThemeMode ? 'black' : 'white')};
    font-family: Century Gothic,Prompt;
    font-style: italic;
    font-size: 22px;
    text-align: left;
    width: auto;
    padding: 10px;
    margin: 0px;
    cursor: default;

    @media (max-width: 768px) {
        font-size: 18px;
        padding: 8px;
    }

    @media (max-width: 480px) {
        font-size: 14px;
        padding: 6px;
    }
`;
//---------- LEFT
//---------- RIGHT
export const Text_Title_42_Right = styled.h1.withConfig({
    shouldForwardProp: (prop) => prop !== 'ThemeMode',
})`
    color: ${({ ThemeMode }) => (ThemeMode ? 'black' : 'white')};
    font-family: Century Gothic,Prompt;
    font-style: italic;
    font-size: 42px;
    text-align: right;
    width: auto;
    padding: 10px;
    margin: 0px;
    cursor: default;

    @media (max-width: 768px) {
        font-size: 38px;
        padding: 8px;
    }

    @media (max-width: 480px) {
        font-size: 34px;
        padding: 6px;
    }
`;
export const Text_Title_38_Right = styled.h1.withConfig({
    shouldForwardProp: (prop) => prop !== 'ThemeMode',
})`
    color: ${({ ThemeMode }) => (ThemeMode ? 'black' : 'white')};
    font-family: Century Gothic,Prompt;
    font-style: italic;
    font-size: 38px;
    text-align: right;
    width: auto;
    padding: 10px;
    margin: 0px;
    cursor: default;

    @media (max-width: 768px) {
        font-size: 34px;
        padding: 8px;
    }

    @media (max-width: 480px) {
        font-size: 30px;
        padding: 6px;
    }
`;
export const Text_Title_34_Right = styled.h1.withConfig({
    shouldForwardProp: (prop) => prop !== 'ThemeMode',
})`
    color: ${({ ThemeMode }) => (ThemeMode ? 'black' : 'white')};
    font-family: Century Gothic,Prompt;
    font-style: italic;
    font-size: 34px;
    text-align: right;
    width: auto;
    padding: 10px;
    margin: 0px;
    cursor: default;

    @media (max-width: 768px) {
        font-size: 30px;
        padding: 8px;
    }

    @media (max-width: 480px) {
        font-size: 26px;
        padding: 6px;
    }
`;
export const Text_Title_30_Right = styled.h1.withConfig({
    shouldForwardProp: (prop) => prop !== 'ThemeMode',
})`
    color: ${({ ThemeMode }) => (ThemeMode ? 'black' : 'white')};
    font-family: Century Gothic,Prompt;
    font-style: italic;
    font-size: 30px;
    text-align: right;
    width: auto;
    padding: 10px;
    margin: 0px;
    cursor: default;

    @media (max-width: 768px) {
        font-size: 26px;
        padding: 8px;
    }

    @media (max-width: 480px) {
        font-size: 22px;
        padding: 6px;
    }
`;
export const Text_Title_26_Right = styled.h1.withConfig({
    shouldForwardProp: (prop) => prop !== 'ThemeMode',
})`
    color: ${({ ThemeMode }) => (ThemeMode ? 'black' : 'white')};
    font-family: Century Gothic,Prompt;
    font-style: italic;
    font-size: 26px;
    text-align: right;
    width: auto;
    padding: 10px;
    margin: 0px;
    cursor: default;

    @media (max-width: 768px) {
        font-size: 22px;
        padding: 8px;
    }

    @media (max-width: 480px) {
        font-size: 18px;
        padding: 6px;
    }
`;
export const Text_Title_22_Right = styled.h1.withConfig({
    shouldForwardProp: (prop) => prop !== 'ThemeMode',
})`
    color: ${({ ThemeMode }) => (ThemeMode ? 'black' : 'white')};
    font-family: Century Gothic,Prompt;
    font-style: italic;
    font-size: 22px;
    text-align: right;
    width: auto;
    padding: 10px;
    margin: 0px;
    cursor: default;

    @media (max-width: 768px) {
        font-size: 18px;
        padding: 8px;
    }

    @media (max-width: 480px) {
        font-size: 14px;
        padding: 6px;
    }
`;
//---------- RIGHT
//____________TITLE____________
//______________A______________
//---------- CENTER
export const Text_A_24_Center = styled.a.withConfig({
    shouldForwardProp: (prop) => prop !== 'ThemeMode',
})`
    color: ${({ ThemeMode }) => (ThemeMode ? 'black' : 'white')};
    font-family: Century Gothic,Prompt;
    font-style: normal;
    font-size: 24px;
    text-align: center;
    display: flex;
    justify-content: center;
    padding: 10px;
    width: auto;
    margin: 0px;
    cursor: default;

    @media (max-width: 768px) {
        font-size: 22px;
        padding: 8px;
    }

    @media (max-width: 480px) {
        font-size: 20px;
        padding: 6px;
    }
`;
export const Text_A_20_Center = styled.a.withConfig({
    shouldForwardProp: (prop) => prop !== 'ThemeMode',
})`
    color: ${({ ThemeMode }) => (ThemeMode ? 'black' : 'white')};
    font-family: Century Gothic,Prompt;
    font-style: normal;
    font-size: 20px;
    text-align: center;
    display: flex;
    justify-content: center;
    padding: 10px;
    width: auto;
    margin: 0px;
    cursor: default;

    @media (max-width: 768px) {
        font-size: 18px;
        padding: 8px;
    }

    @media (max-width: 480px) {
        font-size: 16px;
        padding: 6px;
    }
`;
export const Text_A_16_Center = styled.a.withConfig({
    shouldForwardProp: (prop) => prop !== 'ThemeMode',
})`
    color: ${({ ThemeMode }) => (ThemeMode ? 'black' : 'white')};
    font-family: Century Gothic,Prompt;
    font-style: normal;
    font-size: 16px;
    text-align: center;
    display: flex;
    justify-content: center;
    padding: 10px;
    width: auto;
    margin: 0px;
    cursor: default;

    @media (max-width: 768px) {
        font-size: 14px;
        padding: 8px;
    }

    @media (max-width: 480px) {
        font-size: 12px;
        padding: 6px;
    }
`;
export const Text_A_12_Center = styled.a.withConfig({
    shouldForwardProp: (prop) => prop !== 'ThemeMode',
})`
    color: ${({ ThemeMode }) => (ThemeMode ? 'black' : 'white')};
    font-family: Century Gothic,Prompt;
    font-style: normal;
    font-size: 12px;
    text-align: center;
    display: flex;
    justify-content: center;
    padding: 10px;
    width: auto;
    margin: 0px;
    cursor: default;

    @media (max-width: 768px) {
        font-size: 10px;
        padding: 8px;
    }

    @media (max-width: 480px) {
        font-size: 8px;
        padding: 6px;
    }
`;
//---------- CENTER
//---------- JUSTIFY
export const Text_A_24_Justify = styled.a.withConfig({
    shouldForwardProp: (prop) => prop !== 'ThemeMode',
})`
    color: ${({ ThemeMode }) => (ThemeMode ? 'black' : 'white')};
    font-family: Century Gothic,Prompt;
    font-style: normal;
    font-size: 24px;
    text-align: justify;
    display: flex;
    justify-content: center;
    padding: 10px;
    width: auto;
    margin: 0px;
    cursor: default;

    @media (max-width: 768px) {
        font-size: 22px;
        padding: 8px;
    }

    @media (max-width: 480px) {
        font-size: 20px;
        padding: 6px;
    }
`;
export const Text_A_20_Justify = styled.a.withConfig({
    shouldForwardProp: (prop) => prop !== 'ThemeMode',
})`
    color: ${({ ThemeMode }) => (ThemeMode ? 'black' : 'white')};
    font-family: Century Gothic,Prompt;
    font-style: normal;
    font-size: 20px;
    text-align: justify;
    display: flex;
    justify-content: center;
    padding: 10px;
    width: auto;
    margin: 0px;
    cursor: default;

    @media (max-width: 768px) {
        font-size: 18px;
        padding: 8px;
    }

    @media (max-width: 480px) {
        font-size: 16px;
        padding: 6px;
    }
`;
export const Text_A_16_Justify = styled.a.withConfig({
    shouldForwardProp: (prop) => prop !== 'ThemeMode',
})`
    color: ${({ ThemeMode }) => (ThemeMode ? 'black' : 'white')};
    font-family: Century Gothic,Prompt;
    font-style: normal;
    font-size: 16px;
    text-align: justify;
    display: flex;
    justify-content: center;
    padding: 10px;
    width: auto;
    margin: 0px;
    cursor: default;

    @media (max-width: 768px) {
        font-size: 14px;
        padding: 8px;
    }

    @media (max-width: 480px) {
        font-size: 12px;
        padding: 6px;
    }
`;
export const Text_A_12_Justify = styled.a.withConfig({
    shouldForwardProp: (prop) => prop !== 'ThemeMode',
})`
    color: ${({ ThemeMode }) => (ThemeMode ? 'black' : 'white')};
    font-family: Century Gothic,Prompt;
    font-style: normal;
    font-size: 12px;
    text-align: justify;
    display: flex;
    justify-content: center;
    padding: 10px;
    width: auto;
    margin: 0px;
    cursor: default;

    @media (max-width: 768px) {
        font-size: 10px;
        padding: 8px;
    }

    @media (max-width: 480px) {
        font-size: 8px;
        padding: 6px;
    }
`;
//---------- JUSTIFY
//---------- LEFT
export const Text_A_24_Left = styled.a.withConfig({
    shouldForwardProp: (prop) => prop !== 'ThemeMode',
})`
    color: ${({ ThemeMode }) => (ThemeMode ? 'black' : 'white')};
    font-family: Century Gothic,Prompt;
    font-style: normal;
    font-size: 24px;
    text-align: left;
    display: flex;
    justify-content: flex-start;
    padding: 10px;
    width: auto;
    margin: 0px;
    cursor: default;

    @media (max-width: 768px) {
        font-size: 22px;
        padding: 8px;
    }

    @media (max-width: 480px) {
        font-size: 20px;
        padding: 6px;
    }
`;
export const Text_A_20_Left = styled.a.withConfig({
    shouldForwardProp: (prop) => prop !== 'ThemeMode',
})`
    color: ${({ ThemeMode }) => (ThemeMode ? 'black' : 'white')};
    font-family: Century Gothic,Prompt;
    font-style: normal;
    font-size: 20px;
    text-align: left;
    display: flex;
    justify-content: flex-start;
    padding: 10px;
    width: auto;
    margin: 0px;
    cursor: default;

    @media (max-width: 768px) {
        font-size: 18px;
        padding: 8px;
    }

    @media (max-width: 480px) {
        font-size: 16px;
        padding: 6px;
    }
`;
export const Text_A_16_Left = styled.a.withConfig({
    shouldForwardProp: (prop) => prop !== 'ThemeMode',
})`
    color: ${({ ThemeMode }) => (ThemeMode ? 'black' : 'white')};
    font-family: Century Gothic,Prompt;
    font-style: normal;
    font-size: 16px;
    text-align: left;
    display: flex;
    justify-content: flex-start;
    padding: 10px;
    width: auto;
    margin: 0px;
    cursor: default;

    @media (max-width: 768px) {
        font-size: 14px;
        padding: 8px;
    }

    @media (max-width: 480px) {
        font-size: 12px;
        padding: 6px;
    }
`;
export const Text_A_12_Left = styled.a.withConfig({
    shouldForwardProp: (prop) => prop !== 'ThemeMode',
})`
    color: ${({ ThemeMode }) => (ThemeMode ? 'black' : 'white')};
    font-family: Century Gothic,Prompt;
    font-style: normal;
    font-size: 12px;
    text-align: left;
    display: flex;
    justify-content: flex-start;
    padding: 10px;
    width: auto;
    margin: 0px;
    cursor: default;

    @media (max-width: 768px) {
        font-size: 10px;
        padding: 8px;
    }

    @media (max-width: 480px) {
        font-size: 8px;
        padding: 6px;
    }
`;
//---------- LEFT
//---------- RIGHT
export const Text_A_24_Right = styled.a.withConfig({
    shouldForwardProp: (prop) => prop !== 'ThemeMode',
})`
    color: ${({ ThemeMode }) => (ThemeMode ? 'black' : 'white')};
    font-family: Century Gothic,Prompt;
    font-style: normal;
    font-size: 24px;
    text-align: right;
    display: flex;
    justify-content: flex-end;
    padding: 10px;
    width: auto;
    margin: 0px;
    cursor: default;

    @media (max-width: 768px) {
        font-size: 22px;
        padding: 8px;
    }

    @media (max-width: 480px) {
        font-size: 20px;
        padding: 6px;
    }
`;
export const Text_A_20_Right = styled.a.withConfig({
    shouldForwardProp: (prop) => prop !== 'ThemeMode',
})`
    color: ${({ ThemeMode }) => (ThemeMode ? 'black' : 'white')};
    font-family: Century Gothic,Prompt;
    font-style: normal;
    font-size: 20px;
    text-align: right;
    display: flex;
    justify-content: flex-end;
    padding: 10px;
    width: auto;
    margin: 0px;
    cursor: default;

    @media (max-width: 768px) {
        font-size: 18px;
        padding: 8px;
    }

    @media (max-width: 480px) {
        font-size: 16px;
        padding: 6px;
    }
`;
export const Text_A_16_Right = styled.a.withConfig({
    shouldForwardProp: (prop) => prop !== 'ThemeMode',
})`
    color: ${({ ThemeMode }) => (ThemeMode ? 'black' : 'white')};
    font-family: Century Gothic,Prompt;
    font-style: normal;
    font-size: 16px;
    text-align: right;
    display: flex;
    justify-content: flex-end;
    padding: 10px;
    width: auto;
    margin: 0px;
    cursor: default;

    @media (max-width: 768px) {
        font-size: 14px;
        padding: 8px;
    }

    @media (max-width: 480px) {
        font-size: 12px;
        padding: 6px;
    }
`;
export const Text_A_12_Right = styled.a.withConfig({
    shouldForwardProp: (prop) => prop !== 'ThemeMode',
})`
    color: ${({ ThemeMode }) => (ThemeMode ? 'black' : 'white')};
    font-family: Century Gothic,Prompt;
    font-style: normal;
    font-size: 12px;
    text-align: right;
    display: flex;
    justify-content: flex-end;
    padding: 10px;
    width: auto;
    margin: 0px;
    cursor: default;

    @media (max-width: 768px) {
        font-size: 10px;
        padding: 8px;
    }

    @media (max-width: 480px) {
        font-size: 8px;
        padding: 6px;
    }
`;
//---------- RIGHT
//______________A______________
//______________P______________
//---------- CENTER
export const Text_P_24_Center = styled.p.withConfig({
    shouldForwardProp: (prop) => prop !== 'ThemeMode',
})`
    color: ${({ ThemeMode }) => (ThemeMode ? 'black' : 'white')};
    font-family: Century Gothic,Prompt;
    font-style: normal;
    font-size: 24px;
    text-align: center;
    display: flex;
    justify-content: center;
    padding: 10px;
    width: auto;
    margin: 0px;
    cursor: default;

    @media (max-width: 768px) {
        font-size: 22px;
        padding: 8px;
    }

    @media (max-width: 480px) {
        font-size: 20px;
        padding: 6px;
    }
`;
export const Text_P_20_Center = styled.p.withConfig({
    shouldForwardProp: (prop) => prop !== 'ThemeMode',
})`
    color: ${({ ThemeMode }) => (ThemeMode ? 'black' : 'white')};
    font-family: Century Gothic,Prompt;
    font-style: normal;
    font-size: 20px;
    text-align: center;
    display: flex;
    justify-content: center;
    padding: 10px;
    width: auto;
    margin: 0px;
    cursor: default;

    @media (max-width: 768px) {
        font-size: 18px;
        padding: 8px;
    }

    @media (max-width: 480px) {
        font-size: 16px;
        padding: 6px;
    }
`;
export const Text_P_16_Center = styled.p.withConfig({
    shouldForwardProp: (prop) => prop !== 'ThemeMode',
})`
    color: ${({ ThemeMode }) => (ThemeMode ? 'black' : 'white')};
    font-family: Century Gothic,Prompt;
    font-style: normal;
    font-size: 16px;
    text-align: center;
    display: flex;
    justify-content: center;
    padding: 10px;
    width: auto;
    margin: 0px;
    cursor: default;

    @media (max-width: 768px) {
        font-size: 14px;
        padding: 8px;
    }

    @media (max-width: 480px) {
        font-size: 12px;
        padding: 6px;
    }
`;
export const Text_P_12_Center = styled.p.withConfig({
    shouldForwardProp: (prop) => prop !== 'ThemeMode',
})`
    color: ${({ ThemeMode }) => (ThemeMode ? 'black' : 'white')};
    font-family: Century Gothic,Prompt;
    font-style: normal;
    font-size: 12px;
    text-align: center;
    display: flex;
    justify-content: center;
    padding: 10px;
    width: auto;
    margin: 0px;
    cursor: default;

    @media (max-width: 768px) {
        font-size: 10px;
        padding: 8px;
    }

    @media (max-width: 480px) {
        font-size: 8px;
        padding: 6px;
    }
`;
//---------- CENTER
//---------- JUSTIFY
export const Text_P_24_Justify = styled.p.withConfig({
    shouldForwardProp: (prop) => prop !== 'ThemeMode',
})`
    color: ${({ ThemeMode }) => (ThemeMode ? 'black' : 'white')};
    font-family: Century Gothic,Prompt;
    font-style: normal;
    font-size: 24px;
    text-align: justify;
    display: flex;
    justify-content: center;
    padding: 10px;
    width: auto;
    margin: 0px;
    cursor: default;

    @media (max-width: 768px) {
        font-size: 22px;
        padding: 8px;
    }

    @media (max-width: 480px) {
        font-size: 20px;
        padding: 6px;
    }
`;
export const Text_P_20_Justify = styled.p.withConfig({
    shouldForwardProp: (prop) => prop !== 'ThemeMode',
})`
    color: ${({ ThemeMode }) => (ThemeMode ? 'black' : 'white')};
    font-family: Century Gothic,Prompt;
    font-style: normal;
    font-size: 20px;
    text-align: justify;
    display: flex;
    justify-content: center;
    padding: 10px;
    width: auto;
    margin: 0px;
    cursor: default;

    @media (max-width: 768px) {
        font-size: 18px;
        padding: 8px;
    }

    @media (max-width: 480px) {
        font-size: 16px;
        padding: 6px;
    }
`;
export const Text_P_16_Justify = styled.p.withConfig({
    shouldForwardProp: (prop) => prop !== 'ThemeMode',
})`
    color: ${({ ThemeMode }) => (ThemeMode ? 'black' : 'white')};
    font-family: Century Gothic,Prompt;
    font-style: normal;
    font-size: 16px;
    text-align: justify;
    display: flex;
    justify-content: center;
    padding: 10px;
    width: auto;
    margin: 0px;
    cursor: default;

    @media (max-width: 768px) {
        font-size: 14px;
        padding: 8px;
    }

    @media (max-width: 480px) {
        font-size: 12px;
        padding: 6px;
    }
`;
export const Text_P_12_Justify = styled.p.withConfig({
    shouldForwardProp: (prop) => prop !== 'ThemeMode',
})`
    color: ${({ ThemeMode }) => (ThemeMode ? 'black' : 'white')};
    font-family: Century Gothic,Prompt;
    font-style: normal;
    font-size: 12px;
    text-align: justify;
    display: flex;
    justify-content: center;
    padding: 10px;
    width: auto;
    margin: 0px;
    cursor: default;

    @media (max-width: 768px) {
        font-size: 10px;
        padding: 8px;
    }

    @media (max-width: 480px) {
        font-size: 8px;
        padding: 6px;
    }
`;
//---------- JUSTIFY
//---------- LEFT
export const Text_P_24_Left = styled.p.withConfig({
    shouldForwardProp: (prop) => prop !== 'ThemeMode',
})`
    color: ${({ ThemeMode }) => (ThemeMode ? 'black' : 'white')};
    font-family: Century Gothic,Prompt;
    font-style: normal;
    font-size: 24px;
    text-align: left;
    display: flex;
    justify-content: flex-start;
    padding: 10px;
    width: auto;
    margin: 0px;
    cursor: default;

    @media (max-width: 768px) {
        font-size: 22px;
        padding: 8px;
    }

    @media (max-width: 480px) {
        font-size: 20px;
        padding: 6px;
    }
`;
export const Text_P_20_Left = styled.p.withConfig({
    shouldForwardProp: (prop) => prop !== 'ThemeMode',
})`
    color: ${({ ThemeMode }) => (ThemeMode ? 'black' : 'white')};
    font-family: Century Gothic,Prompt;
    font-style: normal;
    font-size: 20px;
    text-align: left;
    display: flex;
    justify-content: flex-start;
    padding: 10px;
    width: auto;
    margin: 0px;
    cursor: default;

    @media (max-width: 768px) {
        font-size: 18px;
        padding: 8px;
    }

    @media (max-width: 480px) {
        font-size: 16px;
        padding: 6px;
    }
`;
export const Text_P_16_Left = styled.p.withConfig({
    shouldForwardProp: (prop) => prop !== 'ThemeMode',
})`
    color: ${({ ThemeMode }) => (ThemeMode ? 'black' : 'white')};
    font-family: Century Gothic,Prompt;
    font-style: normal;
    font-size: 16px;
    text-align: left;
    display: flex;
    justify-content: flex-start;
    padding: 10px;
    width: auto;
    margin: 0px;
    cursor: default;

    @media (max-width: 768px) {
        font-size: 14px;
        padding: 8px;
    }

    @media (max-width: 480px) {
        font-size: 12px;
        padding: 6px;
    }
`;
export const Text_P_12_Left = styled.p.withConfig({
    shouldForwardProp: (prop) => prop !== 'ThemeMode',
})`
    color: ${({ ThemeMode }) => (ThemeMode ? 'black' : 'white')};
    font-family: Century Gothic,Prompt;
    font-style: normal;
    font-size: 12px;
    text-align: left;
    display: flex;
    justify-content: flex-start;
    padding: 10px;
    width: auto;
    margin: 0px;
    cursor: default;

    @media (max-width: 768px) {
        font-size: 10px;
        padding: 8px;
    }

    @media (max-width: 480px) {
        font-size: 8px;
        padding: 6px;
    }
`;
//---------- LEFT
//---------- RIGHT
export const Text_P_24_Right = styled.p.withConfig({
    shouldForwardProp: (prop) => prop !== 'ThemeMode',
})`
    color: ${({ ThemeMode }) => (ThemeMode ? 'black' : 'white')};
    font-family: Century Gothic,Prompt;
    font-style: normal;
    font-size: 24px;
    text-align: right;
    display: flex;
    justify-content: flex-end;
    padding: 10px;
    width: auto;
    margin: 0px;
    cursor: default;

    @media (max-width: 768px) {
        font-size: 22px;
        padding: 8px;
    }

    @media (max-width: 480px) {
        font-size: 20px;
        padding: 6px;
    }
`;
export const Text_P_20_Right = styled.p.withConfig({
    shouldForwardProp: (prop) => prop !== 'ThemeMode',
})`
    color: ${({ ThemeMode }) => (ThemeMode ? 'black' : 'white')};
    font-family: Century Gothic,Prompt;
    font-style: normal;
    font-size: 20px;
    text-align: right;
    display: flex;
    justify-content: flex-end;
    padding: 10px;
    width: auto;
    margin: 0px;
    cursor: default;

    @media (max-width: 768px) {
        font-size: 18px;
        padding: 8px;
    }

    @media (max-width: 480px) {
        font-size: 16px;
        padding: 6px;
    }
`;
export const Text_P_16_Right = styled.p.withConfig({
    shouldForwardProp: (prop) => prop !== 'ThemeMode',
})`
    color: ${({ ThemeMode }) => (ThemeMode ? 'black' : 'white')};
    font-family: Century Gothic,Prompt;
    font-style: normal;
    font-size: 16px;
    text-align: right;
    display: flex;
    justify-content: flex-end;
    padding: 10px;
    width: auto;
    margin: 0px;
    cursor: default;

    @media (max-width: 768px) {
        font-size: 14px;
        padding: 8px;
    }

    @media (max-width: 480px) {
        font-size: 12px;
        padding: 6px;
    }
`;
export const Text_P_12_Right = styled.p.withConfig({
    shouldForwardProp: (prop) => prop !== 'ThemeMode',
})`
    color: ${({ ThemeMode }) => (ThemeMode ? 'black' : 'white')};
    font-family: Century Gothic,Prompt;
    font-style: normal;
    font-size: 12px;
    text-align: right;
    display: flex;
    justify-content: flex-end;
    padding: 10px;
    width: auto;
    margin: 0px;
    cursor: default;

    @media (max-width: 768px) {
        font-size: 10px;
        padding: 8px;
    }

    @media (max-width: 480px) {
        font-size: 8px;
        padding: 6px;
    }
`;
//---------- RIGHT
//______________P______________
//______________SPAN____________
//---------- CENTER
export const Text_Span_24_Center = styled.span`
    color: white;
    font-family: Century Gothic,Prompt;
    font-style: normal;
    font-size: 24px;
    text-align: center;
    width: auto;
    margin: 0px;
    cursor: default;

    @media (max-width: 768px) {
        font-size: 22px;
    }

    @media (max-width: 480px) {
        font-size: 20px;
    }
`;
export const Text_Span_20_Center = styled.span`
    color: white;
    font-family: Century Gothic,Prompt;
    font-style: normal;
    font-size: 20px;
    text-align: center;
    width: auto;
    margin: 0px;
    cursor: default;

    @media (max-width: 768px) {
        font-size: 18px;
    }

    @media (max-width: 480px) {
        font-size: 16px;
    }
`;
export const Text_Span_16_Center = styled.span`
    color: white;
    font-family: Century Gothic,Prompt;
    font-style: normal;
    font-size: 16px;
    text-align: center;
    width: auto;
    margin: 0px;
    cursor: default;

    @media (max-width: 768px) {
        font-size: 14px;
    }

    @media (max-width: 480px) {
        font-size: 12px;
    }
`;
export const Text_Span_12_Center = styled.span`
    color: white;
    font-family: Century Gothic,Prompt;
    font-style: normal;
    font-size: 12px;
    text-align: center;
    width: auto;
    margin: 0px;
    cursor: default;

    @media (max-width: 768px) {
        font-size: 10px;
    }

    @media (max-width: 480px) {
        font-size: 8px;
    }
`;
//---------- CENTER
//---------- JUSTIFY
export const Text_Span_24_Justify = styled.span`
    color: white;
    font-family: Century Gothic,Prompt;
    font-style: normal;
    font-size: 24px;
    text-align: justify;
    width: auto;
    margin: 0px;
    cursor: default;

    @media (max-width: 768px) {
        font-size: 22px;
    }

    @media (max-width: 480px) {
        font-size: 20px;
    }
`;
export const Text_Span_20_Justify = styled.span`
    color: white;
    font-family: Century Gothic,Prompt;
    font-style: normal;
    font-size: 20px;
    text-align: justify;
    width: auto;
    margin: 0px;
    cursor: default;

    @media (max-width: 768px) {
        font-size: 18px;
    }

    @media (max-width: 480px) {
        font-size: 16px;
    }
`;
export const Text_Span_16_Justify = styled.span`
    color: white;
    font-family: Century Gothic,Prompt;
    font-style: normal;
    font-size: 16px;
    text-align: justify;
    width: auto;
    margin: 0px;
    cursor: default;

    @media (max-width: 768px) {
        font-size: 14px;
    }

    @media (max-width: 480px) {
        font-size: 12px;
    }
`;
export const Text_Span_12_Justify = styled.span`
    color: white;
    font-family: Century Gothic,Prompt;
    font-style: normal;
    font-size: 12px;
    text-align: justify;
    width: auto;
    margin: 0px;
    cursor: default;

    @media (max-width: 768px) {
        font-size: 10px;
    }

    @media (max-width: 480px) {
        font-size: 8px;
    }
`;
//---------- JUSTIFY
//---------- LEFT
export const Text_Span_24_Left = styled.span`
    color: white;
    font-family: Century Gothic,Prompt;
    font-style: normal;
    font-size: 24px;
    text-align: left;
    width: auto;
    margin: 0px;
    cursor: default;

    @media (max-width: 768px) {
        font-size: 22px;
    }

    @media (max-width: 480px) {
        font-size: 20px;
    }
`;
export const Text_Span_20_Left = styled.span`
    color: white;
    font-family: Century Gothic,Prompt;
    font-style: normal;
    font-size: 20px;
    text-align: left;
    width: auto;
    margin: 0px;
    cursor: default;

    @media (max-width: 768px) {
        font-size: 18px;
    }

    @media (max-width: 480px) {
        font-size: 16px;
    }
`;
export const Text_Span_16_Left = styled.span`
    color: white;    
    font-family: Century Gothic,Prompt;
    font-style: normal;
    font-size: 16px;
    text-align: left;
    width: auto;
    margin: 0px;
    cursor: default;

    @media (max-width: 768px) {
        font-size: 14px;
    }

    @media (max-width: 480px) {
        font-size: 12px;
    }
`;
export const Text_Span_12_Left = styled.span`
    color: white;
    font-family: Century Gothic,Prompt;
    font-style: normal;
    font-size: 12px;
    text-align: left;
    width: auto;
    margin: 0px;
    cursor: default;

    @media (max-width: 768px) {
        font-size: 10px;
    }

    @media (max-width: 480px) {
        font-size: 8px;
    }
`;
//---------- LEFT
//---------- RIGHT
export const Text_Span_24_Right = styled.span`
    color: white;    
    font-family: Century Gothic,Prompt;
    font-style: normal;
    font-size: 24px;
    text-align: right;
    width: auto;
    margin: 0px;
    cursor: default;

    @media (max-width: 768px) {
        font-size: 22px;
    }

    @media (max-width: 480px) {
        font-size: 20px;
    }
`;
export const Text_Span_20_Right = styled.span`
    color: white;    
    font-family: Century Gothic,Prompt;
    font-style: normal;
    font-size: 20px;
    text-align: right;
    width: auto;
    margin: 0px;
    cursor: default;

    @media (max-width: 768px) {
        font-size: 18px;
    }

    @media (max-width: 480px) {
        font-size: 16px;
    }
`;
export const Text_Span_16_Right = styled.span`
    color: white;
    font-family: Century Gothic,Prompt;
    font-style: normal;
    font-size: 16px;
    text-align: right;
    width: auto;
    margin: 0px;
    cursor: default;

    @media (max-width: 768px) {
        font-size: 14px;
    }

    @media (max-width: 480px) {
        font-size: 12px;
    }
`;
export const Text_Span_12_Right = styled.span`
    color: white;
    font-family: Century Gothic,Prompt;
    font-style: normal;
    font-size: 12px;
    text-align: right;
    width: auto;
    margin: 0px;
    cursor: default;

    @media (max-width: 768px) {
        font-size: 10px;
    }

    @media (max-width: 480px) {
        font-size: 8px;
    }
`;
//---------- RIGHT
//______________SPAN____________
//______________TEXT____________
//---------- CENTER
export const Text_24_Center = styled.span`
    font-family: Century Gothic,Prompt;
    font-style: normal;
    font-size: 24px;
    text-align: center;
    width: auto;
    margin: 0px;
    cursor: default;

    @media (max-width: 768px) {
        font-size: 22px;
    }

    @media (max-width: 480px) {
        font-size: 20px;
    }
`;
export const Text_20_Center = styled.span`
    font-family: Century Gothic,Prompt;
    font-style: normal;
    font-size: 20px;
    text-align: center;
    width: auto;
    margin: 0px;
    cursor: default;

    @media (max-width: 768px) {
        font-size: 18px;
    }

    @media (max-width: 480px) {
        font-size: 16px;
    }
`;
export const Text_16_Center = styled.span`
    font-family: Century Gothic,Prompt;
    font-style: normal;
    font-size: 16px;
    text-align: center;
    width: auto;
    margin: 0px;
    cursor: default;

    @media (max-width: 768px) {
        font-size: 14px;
    }

    @media (max-width: 480px) {
        font-size: 12px;
    }
`;
export const Text_12_Center = styled.span`
    font-family: Century Gothic,Prompt;
    font-style: normal;
    font-size: 12px;
    text-align: center;
    width: auto;
    margin: 0px;
    cursor: default;

    @media (max-width: 768px) {
        font-size: 10px;
    }

    @media (max-width: 480px) {
        font-size: 8px;
    }
`;
//---------- CENTER
//---------- JUSTIFY
export const Text_24_Justify = styled.span`
    font-family: Century Gothic,Prompt;
    font-style: normal;
    font-size: 24px;
    text-align: justify;
    width: auto;
    margin: 0px;
    cursor: default;

    @media (max-width: 768px) {
        font-size: 22px;
    }

    @media (max-width: 480px) {
        font-size: 20px;
    }
`;
export const Text_20_Justify = styled.span`
    font-family: Century Gothic,Prompt;
    font-style: normal;
    font-size: 20px;
    text-align: justify;
    width: auto;
    margin: 0px;
    cursor: default;

    @media (max-width: 768px) {
        font-size: 18px;
    }

    @media (max-width: 480px) {
        font-size: 16px;
    }
`;
export const Text_16_Justify = styled.span`
    font-family: Century Gothic,Prompt;
    font-style: normal;
    font-size: 16px;
    text-align: justify;
    width: auto;
    margin: 0px;
    cursor: default;

    @media (max-width: 768px) {
        font-size: 14px;
    }

    @media (max-width: 480px) {
        font-size: 12px;
    }
`;
export const Text_12_Justify = styled.span`

    font-family: Century Gothic,Prompt;
    font-style: normal;
    font-size: 12px;
    text-align: justify;
    width: auto;
    margin: 0px;
    cursor: default;

    @media (max-width: 768px) {
        font-size: 10px;
    }

    @media (max-width: 480px) {
        font-size: 8px;
    }
`;
//---------- JUSTIFY
//---------- LEFT
export const Text_24_Left = styled.span`
    font-family: Century Gothic,Prompt;
    font-style: normal;
    font-size: 24px;
    text-align: left;
    width: auto;
    margin: 0px;
    cursor: default;

    @media (max-width: 768px) {
        font-size: 22px;
    }

    @media (max-width: 480px) {
        font-size: 20px;
    }
`;
export const Text_20_Left = styled.span`
    font-family: Century Gothic,Prompt;
    font-style: normal;
    font-size: 20px;
    text-align: left;
    width: auto;
    margin: 0px;
    cursor: default;

    @media (max-width: 768px) {
        font-size: 18px;
    }

    @media (max-width: 480px) {
        font-size: 16px;
    }
`;
export const Text_16_Left = styled.span` 
    font-family: Century Gothic,Prompt;
    font-style: normal;
    font-size: 16px;
    text-align: left;
    width: auto;
    margin: 0px;
    cursor: default;

    @media (max-width: 768px) {
        font-size: 14px;
    }

    @media (max-width: 480px) {
        font-size: 12px;
    }
`;
export const Text_12_Left = styled.span`
    font-family: Century Gothic,Prompt;
    font-style: normal;
    font-size: 12px;
    text-align: left;
    width: auto;
    margin: 0px;
    cursor: default;

    @media (max-width: 768px) {
        font-size: 10px;
    }

    @media (max-width: 480px) {
        font-size: 8px;
    }
`;
//---------- LEFT
//---------- RIGHT
export const Text_24_Right = styled.span`  
    font-family: Century Gothic,Prompt;
    font-style: normal;
    font-size: 24px;
    text-align: right;
    width: auto;
    margin: 0px;
    cursor: default;

    @media (max-width: 768px) {
        font-size: 22px;
    }

    @media (max-width: 480px) {
        font-size: 20px;
    }
`;
export const Text_20_Right = styled.span`  
    font-family: Century Gothic,Prompt;
    font-style: normal;
    font-size: 20px;
    text-align: right;
    width: auto;
    margin: 0px;
    cursor: default;

    @media (max-width: 768px) {
        font-size: 18px;
    }

    @media (max-width: 480px) {
        font-size: 16px;
    }
`;
export const Text_16_Right = styled.span`
    font-family: Century Gothic,Prompt;
    font-style: normal;
    font-size: 16px;
    text-align: right;
    width: auto;
    margin: 0px;
    cursor: default;

    @media (max-width: 768px) {
        font-size: 14px;
    }

    @media (max-width: 480px) {
        font-size: 12px;
    }
`;
export const Text_12_Right = styled.span`
    font-family: Century Gothic,Prompt;
    font-style: normal;
    font-size: 12px;
    text-align: right;
    width: auto;
    margin: 0px;
    cursor: default;

    @media (max-width: 768px) {
        font-size: 10px;
    }

    @media (max-width: 480px) {
        font-size: 8px;
    }
`;
//---------- RIGHT
//______________TEXT____________
//______________FADE____________
//-------------- A --------------
//---------- CENTER
export const Text_Fade_A_35_Center = styled.a.withConfig({
    shouldForwardProp: (prop) => prop !== 'ThemeMode',
})`
    color: ${({ ThemeMode }) => (ThemeMode ? 'black' : 'white')};
    font-family: Century Gothic,Prompt;
    font-style: normal;
    font-size: 35px;
    text-align: center;
    display: flex;
    justify-content: center;
    padding: 10px;
    width: auto;
    margin: 0px;
    animation: ${Fade_Animation} 2.5s infinite;
    cursor: default;

    @media (max-width: 768px) {
        font-size: 33px;
        padding: 8px;
    }

    @media (max-width: 480px) {
        font-size: 31px;
        padding: 6px;
    }
`;
export const Text_Fade_A_30_Center = styled.a.withConfig({
    shouldForwardProp: (prop) => prop !== 'ThemeMode',
})`
    color: ${({ ThemeMode }) => (ThemeMode ? 'black' : 'white')};
    font-family: Century Gothic,Prompt;
    font-style: normal;
    font-size: 30px;
    text-align: center;
    display: flex;
    justify-content: center;
    padding: 10px;
    width: auto;
    margin: 0px;
    animation: ${Fade_Animation} 2.5s infinite;
    cursor: default;

    @media (max-width: 768px) {
        font-size: 28px;
        padding: 8px;
    }

    @media (max-width: 480px) {
        font-size: 26px;
        padding: 6px;
    }
`;
export const Text_Fade_A_25_Center = styled.a.withConfig({
    shouldForwardProp: (prop) => prop !== 'ThemeMode',
})`
    color: ${({ ThemeMode }) => (ThemeMode ? 'black' : 'white')};
    font-family: Century Gothic,Prompt;
    font-style: normal;
    font-size: 25px;
    text-align: center;
    display: flex;
    justify-content: center;
    padding: 10px;
    width: auto;
    margin: 0px;
    animation: ${Fade_Animation} 2.5s infinite;
    cursor: default;

    @media (max-width: 768px) {
        font-size: 23px;
        padding: 8px;
    }

    @media (max-width: 480px) {
        font-size: 21px;
        padding: 6px;
    }
`;
export const Text_Fade_A_20_Center = styled.a.withConfig({
    shouldForwardProp: (prop) => prop !== 'ThemeMode',
})`
    color: ${({ ThemeMode }) => (ThemeMode ? 'black' : 'white')};
    font-family: Century Gothic,Prompt;
    font-style: normal;
    font-size: 20px;
    text-align: center;
    display: flex;
    justify-content: center;
    padding: 10px;
    width: auto;
    margin: 0px;
    animation: ${Fade_Animation} 2.5s infinite;
    cursor: default;

    @media (max-width: 768px) {
        font-size: 18px;
        padding: 8px;
    }

    @media (max-width: 480px) {
        font-size: 16px;
        padding: 6px;
    }
`;
export const Text_Fade_A_15_Center = styled.a.withConfig({
    shouldForwardProp: (prop) => prop !== 'ThemeMode',
})`
    color: ${({ ThemeMode }) => (ThemeMode ? 'black' : 'white')};
    font-family: Century Gothic,Prompt;
    font-style: normal;
    font-size: 15px;
    text-align: center;
    display: flex;
    justify-content: center;
    padding: 10px;
    width: auto;
    margin: 0px;
    animation: ${Fade_Animation} 2.5s infinite;
    cursor: default;

    @media (max-width: 768px) {
        font-size: 13px;
        padding: 8px;
    }

    @media (max-width: 480px) {
        font-size: 11px;
        padding: 6px;
    }
`;
//---------- CENTER
//---------- JUSTIFY
export const Text_Fade_A_35_Justify = styled.a.withConfig({
    shouldForwardProp: (prop) => prop !== 'ThemeMode',
})`
    color: ${({ ThemeMode }) => (ThemeMode ? 'black' : 'white')};
    font-family: Century Gothic,Prompt;
    font-style: normal;
    font-size: 35px;
    text-align: justify;
    display: flex;
    justify-content: center;
    padding: 10px;
    width: auto;
    margin: 0px;
    animation: ${Fade_Animation} 2.5s infinite;
    cursor: default;

    @media (max-width: 768px) {
        font-size: 33px;
        padding: 8px;
    }

    @media (max-width: 480px) {
        font-size: 31px;
        padding: 6px;
    }
`;
export const Text_Fade_A_30_Justify = styled.a.withConfig({
    shouldForwardProp: (prop) => prop !== 'ThemeMode',
})`
    color: ${({ ThemeMode }) => (ThemeMode ? 'black' : 'white')};
    font-family: Century Gothic,Prompt;
    font-style: normal;
    font-size: 30px;
    text-align: justify;
    display: flex;
    justify-content: center;
    padding: 10px;
    width: auto;
    margin: 0px;
    animation: ${Fade_Animation} 2.5s infinite;
    cursor: default;

    @media (max-width: 768px) {
        font-size: 28px;
        padding: 8px;
    }

    @media (max-width: 480px) {
        font-size: 26px;
        padding: 6px;
    }
`;
export const Text_Fade_A_25_Justify = styled.a.withConfig({
    shouldForwardProp: (prop) => prop !== 'ThemeMode',
})`
    color: ${({ ThemeMode }) => (ThemeMode ? 'black' : 'white')};
    font-family: Century Gothic,Prompt;
    font-style: normal;
    font-size: 25px;
    text-align: justify;
    display: flex;
    justify-content: center;
    padding: 10px;
    width: auto;
    margin: 0px;
    animation: ${Fade_Animation} 2.5s infinite;
    cursor: default;

    @media (max-width: 768px) {
        font-size: 23px;
        padding: 8px;
    }

    @media (max-width: 480px) {
        font-size: 21px;
        padding: 6px;
    }
`;
export const Text_Fade_A_20_Justify = styled.a.withConfig({
    shouldForwardProp: (prop) => prop !== 'ThemeMode',
})`
    color: ${({ ThemeMode }) => (ThemeMode ? 'black' : 'white')};
    font-family: Century Gothic,Prompt;
    font-style: normal;
    font-size: 20px;
    text-align: justify;
    display: flex;
    justify-content: center;
    padding: 10px;
    width: auto;
    margin: 0px;
    animation: ${Fade_Animation} 2.5s infinite;
    cursor: default;

    @media (max-width: 768px) {
        font-size: 18px;
        padding: 8px;
    }

    @media (max-width: 480px) {
        font-size: 16px;
        padding: 6px;
    }
`;
export const Text_Fade_A_15_Justify = styled.a.withConfig({
    shouldForwardProp: (prop) => prop !== 'ThemeMode',
})`
    color: ${({ ThemeMode }) => (ThemeMode ? 'black' : 'white')};
    font-family: Century Gothic,Prompt;
    font-style: normal;
    font-size: 15px;
    text-align: justify;
    display: flex;
    justify-content: center;
    padding: 10px;
    width: auto;
    margin: 0px;
    animation: ${Fade_Animation} 2.5s infinite;
    cursor: default;

    @media (max-width: 768px) {
        font-size: 13px;
        padding: 8px;
    }

    @media (max-width: 480px) {
        font-size: 11px;
        padding: 6px;
    }
`;
//---------- JUSTIFY
//---------- LEFT
export const Text_Fade_A_35_Left = styled.a.withConfig({
    shouldForwardProp: (prop) => prop !== 'ThemeMode',
})`
    color: ${({ ThemeMode }) => (ThemeMode ? 'black' : 'white')};
    font-family: Century Gothic,Prompt;
    font-style: normal;
    font-size: 35px;
    text-align: left;
    display: flex;
    justify-content: center;
    padding: 10px;
    width: auto;
    margin: 0px;
    animation: ${Fade_Animation} 2.5s infinite;
    cursor: default;

    @media (max-width: 768px) {
        font-size: 33px;
        padding: 8px;
    }

    @media (max-width: 480px) {
        font-size: 31px;
        padding: 6px;
    }
`;
export const Text_Fade_A_30_Left = styled.a.withConfig({
    shouldForwardProp: (prop) => prop !== 'ThemeMode',
})`
    color: ${({ ThemeMode }) => (ThemeMode ? 'black' : 'white')};
    font-family: Century Gothic,Prompt;
    font-style: normal;
    font-size: 30px;
    text-align: left;
    display: flex;
    justify-content: center;
    padding: 10px;
    width: auto;
    margin: 0px;
    animation: ${Fade_Animation} 2.5s infinite;
    cursor: default;

    @media (max-width: 768px) {
        font-size: 28px;
        padding: 8px;
    }

    @media (max-width: 480px) {
        font-size: 26px;
        padding: 6px;
    }
`;
export const Text_Fade_A_25_Left = styled.a.withConfig({
    shouldForwardProp: (prop) => prop !== 'ThemeMode',
})`
    color: ${({ ThemeMode }) => (ThemeMode ? 'black' : 'white')};
    font-family: Century Gothic,Prompt;
    font-style: normal;
    font-size: 25px;
    text-align: left;
    display: flex;
    justify-content: center;
    padding: 10px;
    width: auto;
    margin: 0px;
    animation: ${Fade_Animation} 2.5s infinite;
    cursor: default;

    @media (max-width: 768px) {
        font-size: 23px;
        padding: 8px;
    }

    @media (max-width: 480px) {
        font-size: 21px;
        padding: 6px;
    }
`;
export const Text_Fade_A_20_Left = styled.a.withConfig({
    shouldForwardProp: (prop) => prop !== 'ThemeMode',
})`
    color: ${({ ThemeMode }) => (ThemeMode ? 'black' : 'white')};
    font-family: Century Gothic,Prompt;
    font-style: normal;
    font-size: 20px;
    text-align: left;
    display: flex;
    justify-content: center;
    padding: 10px;
    width: auto;
    margin: 0px;
    animation: ${Fade_Animation} 2.5s infinite;
    cursor: default;

    @media (max-width: 768px) {
        font-size: 18px;
        padding: 8px;
    }

    @media (max-width: 480px) {
        font-size: 16px;
        padding: 6px;
    }
`;
export const Text_Fade_A_15_Left = styled.a.withConfig({
    shouldForwardProp: (prop) => prop !== 'ThemeMode',
})`
    color: ${({ ThemeMode }) => (ThemeMode ? 'black' : 'white')};
    font-family: Century Gothic,Prompt;
    font-style: normal;
    font-size: 15px;
    text-align: left;
    display: flex;
    justify-content: center;
    padding: 10px;
    width: auto;
    margin: 0px;
    animation: ${Fade_Animation} 2.5s infinite;
    cursor: default;

    @media (max-width: 768px) {
        font-size: 13px;
        padding: 8px;
    }

    @media (max-width: 480px) {
        font-size: 11px;
        padding: 6px;
    }
`;
//---------- LEFT
//---------- RIGHT
export const Text_Fade_A_35_Right = styled.a.withConfig({
    shouldForwardProp: (prop) => prop !== 'ThemeMode',
})`
    color: ${({ ThemeMode }) => (ThemeMode ? 'black' : 'white')};
    font-family: Century Gothic,Prompt;
    font-style: normal;
    font-size: 35px;
    text-align: right;
    display: flex;
    justify-content: center;
    padding: 10px;
    width: auto;
    margin: 0px;
    animation: ${Fade_Animation} 2.5s infinite;
    cursor: default;

    @media (max-width: 768px) {
        font-size: 33px;
        padding: 8px;
    }

    @media (max-width: 480px) {
        font-size: 31px;
        padding: 6px;
    }
`;
export const Text_Fade_A_30_Right = styled.a.withConfig({
    shouldForwardProp: (prop) => prop !== 'ThemeMode',
})`
    color: ${({ ThemeMode }) => (ThemeMode ? 'black' : 'white')};
    font-family: Century Gothic,Prompt;
    font-style: normal;
    font-size: 30px;
    text-align: right;
    display: flex;
    justify-content: center;
    padding: 10px;
    width: auto;
    margin: 0px;
    animation: ${Fade_Animation} 2.5s infinite;
    cursor: default;

    @media (max-width: 768px) {
        font-size: 28px;
        padding: 8px;
    }

    @media (max-width: 480px) {
        font-size: 26px;
        padding: 6px;
    }
`;
export const Text_Fade_A_25_Right = styled.a.withConfig({
    shouldForwardProp: (prop) => prop !== 'ThemeMode',
})`
    color: ${({ ThemeMode }) => (ThemeMode ? 'black' : 'white')};
    font-family: Century Gothic,Prompt;
    font-style: normal;
    font-size: 25px;
    text-align: right;
    display: flex;
    justify-content: center;
    padding: 10px;
    width: auto;
    margin: 0px;
    animation: ${Fade_Animation} 2.5s infinite;
    cursor: default;

    @media (max-width: 768px) {
        font-size: 23px;
        padding: 8px;
    }

    @media (max-width: 480px) {
        font-size: 21px;
        padding: 6px;
    }
`;
export const Text_Fade_A_20_Right = styled.a.withConfig({
    shouldForwardProp: (prop) => prop !== 'ThemeMode',
})`
    color: ${({ ThemeMode }) => (ThemeMode ? 'black' : 'white')};
    font-family: Century Gothic,Prompt;
    font-style: normal;
    font-size: 20px;
    text-align: right;
    display: flex;
    justify-content: center;
    padding: 10px;
    width: auto;
    margin: 0px;
    animation: ${Fade_Animation} 2.5s infinite;
    cursor: default;

    @media (max-width: 768px) {
        font-size: 18px;
        padding: 8px;
    }

    @media (max-width: 480px) {
        font-size: 16px;
        padding: 6px;
    }
`;
export const Text_Fade_A_15_Right = styled.a.withConfig({
    shouldForwardProp: (prop) => prop !== 'ThemeMode',
})`
    color: ${({ ThemeMode }) => (ThemeMode ? 'black' : 'white')};
    font-family: Century Gothic,Prompt;
    font-style: normal;
    font-size: 15px;
    text-align: right;
    display: flex;
    justify-content: center;
    padding: 10px;
    width: auto;
    margin: 0px;
    animation: ${Fade_Animation} 2.5s infinite;
    cursor: default;

    @media (max-width: 768px) {
        font-size: 13px;
        padding: 8px;
    }

    @media (max-width: 480px) {
        font-size: 11px;
        padding: 6px;
    }
`;
//---------- RIGHT
//-------------- A --------------
//______________FADE____________