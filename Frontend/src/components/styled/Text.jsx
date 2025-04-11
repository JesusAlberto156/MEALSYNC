//____________IMPORT/EXPORT____________
// Componentes de React externos
import styled from 'styled-components';
//__________ICONOS__________

//__________ICONOS__________
//__________IMAGE__________

//__________IMAGE__________
// Estilos personalizados
import { Fade_Animation } from './Animations';
//____________IMPORT/EXPORT____________

//____________TITLE____________
export const Text_Title_Fade_50 = styled.h1.withConfig({
    shouldForwardProp: (prop) => prop !== 'ThemeMode',
})`
    color: ${({ ThemeMode }) => (ThemeMode ? 'black' : 'white')};
    font-size: 50px;
    font-family: "Prompt", sans-serif;
    font-weight: 700;
    font-style: italic;
    animation: ${Fade_Animation} 2s infinite;
    margin-top: 0px;
    margin-bottom: 0px;

    @media (max-width: 768px) {
        font-size: 45px;
    }

    @media (max-width: 480px) {
        font-size: 40px;
    }
`;
export const Text_Title_Fade_30 = styled.h1.withConfig({
    shouldForwardProp: (prop) => prop !== 'ThemeMode',
})`
    color: ${({ ThemeMode }) => (ThemeMode ? 'black' : 'white')};
    font-size: 30px;
    font-family: "Prompt", sans-serif;
    font-weight: 700;
    font-style: italic;
    animation: ${Fade_Animation} 2s infinite;
    margin-top: 0px;
    margin-bottom: 0px;

    @media (max-width: 768px) {
        font-size: 25px;
    }

    @media (max-width: 480px) {
        font-size: 20px;
    }
`;
export const Text_Title_Fade_22 = styled.h1.withConfig({
    shouldForwardProp: (prop) => prop !== 'ThemeMode',
})`
    color: ${({ ThemeMode }) => (ThemeMode ? 'black' : 'white')};
    font-size: 22px;
    font-family: "Prompt", sans-serif;
    font-weight: 700;
    font-style: italic;
    animation: ${Fade_Animation} 2s infinite;
    margin-top: 0px;

    @media (max-width: 768px) {
        font-size: 20px;
    }

    @media (max-width: 480px) {
        font-size: 18px;
    }
`;
export const Text_Title_Fade_20 = styled.h1.withConfig({
    shouldForwardProp: (prop) => prop !== 'ThemeMode',
})`
    color: ${({ ThemeMode }) => (ThemeMode ? 'black' : 'white')};
    font-size: 20px;
    font-family: "Prompt", sans-serif;
    font-weight: 700;
    font-style: italic;
    animation: ${Fade_Animation} 2s infinite;
    margin-top: 0px;

    @media (max-width: 768px) {
        font-size: 18px;
    }

    @media (max-width: 480px) {
        font-size: 16px;
    }
`;
//____________TITLE____________
//______________A______________
export const Text_A_Left_25 = styled.a.withConfig({
    shouldForwardProp: (prop) => prop !== 'ThemeMode',
})`
    color: ${({ ThemeMode }) => (ThemeMode ? 'black' : 'white')};
    font-size: 25px;
    margin-left: 40px;
    font-family: "Prompt", sans-serif;
    font-weight: 300;
    font-style: normal;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 2px;
    transition: background-color 0.3s;

    @media (max-width: 768px) {
        font-size: 20px;
        margin-left: 25px;
    }

    @media (max-width: 480px) {
        font-size: 15px;
        margin-left: 15px;
    }
`;
export const Text_A_Left_18 = styled.a`
    color: white;
    font-size: 18px;
    margin-left: 10px;
    font-family: "Prompt", sans-serif;
    font-weight: 300;
    font-style: normal;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 2px;
    transition: background-color 0.3s;

    @media (max-width: 768px) {
        font-size: 16px;
        margin-left: 12px;
    }

    @media (max-width: 480px) {
        font-size: 14px;
        margin-left: 14px;
    }
`;
export const Text_A_Center_16 = styled.a.withConfig({
    shouldForwardProp: (prop) => prop !== 'ThemeMode',
})`
    color: ${({ ThemeMode }) => (ThemeMode ? 'black' : 'white')};
    font-size: 16px;
    font-family: "Prompt", sans-serif;
    font-weight: 300;
    font-style: normal;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 2px;
    transition: background-color 0.3s;

    @media (max-width: 768px) {
        font-size: 14px;
    }

    @media (max-width: 480px) {
        font-size: 12px;
    }
`;
//______________A______________
//______________P______________
export const Text_P_24 = styled.p.withConfig({
    shouldForwardProp: (prop) => prop !== 'ThemeMode',
})`
    color: ${({ ThemeMode }) => (ThemeMode ? 'black' : 'white')};
    font-family: "Prompt", sans-serif;
    font-weight: 400;
    font-style: normal;
    font-size: 24px;
    width: auto;
    margin: 0px;

    @media (max-width: 768px) {
        font-size: 22px;
    }

    @media (max-width: 480px) {
        font-size: 20px;
    }
`;
export const Text_P_20 = styled.p.withConfig({
    shouldForwardProp: (prop) => prop !== 'ThemeMode',
})`
    color: ${({ ThemeMode }) => (ThemeMode ? 'black' : 'white')};
    font-family: "Prompt", sans-serif;
    font-weight: 400;
    font-style: normal;
    font-size: 20px;
    width: auto;
    margin: 0px;

    @media (max-width: 768px) {
        font-size: 18px;
    }

    @media (max-width: 480px) {
        font-size: 16px;
    }
`;
export const Text_P_16 = styled.p.withConfig({
    shouldForwardProp: (prop) => prop !== 'ThemeMode',
})`
    color: ${({ ThemeMode }) => (ThemeMode ? 'black' : 'white')};
    font-family: "Prompt", sans-serif;
    font-weight: 400;
    font-style: normal;
    font-size: 16px;
    width: auto;
    margin: 0px;

    @media (max-width: 768px) {
        font-size: 14px;
    }

    @media (max-width: 480px) {
        font-size: 12px;
    }
`;
export const Text_P_12 = styled.p.withConfig({
    shouldForwardProp: (prop) => prop !== 'ThemeMode',
})`
    color: ${({ ThemeMode }) => (ThemeMode ? 'black' : 'white')};
    font-family: "Prompt", sans-serif;
    font-weight: 400;
    font-style: normal;
    font-size: 12px;
    width: auto;
    margin: 0px;

    @media (max-width: 768px) {
        font-size: 10px;
    }

    @media (max-width: 480px) {
        font-size: 8px;
    }
`;

export const Text_P_Left_20 = styled.p.withConfig({
    shouldForwardProp: (prop) => prop !== 'ThemeMode',
})`
    color: ${({ ThemeMode }) => (ThemeMode ? 'black' : 'white')};
    font-size: 20px;
    font-family: "Prompt", sans-serif;
    font-weight: 400;
    font-style: normal;
    text-align: left;
    width: 250px;
    margin-top: 0px;
    margin-bottom: 0px;
    margin-left: 30px;
    margin-right: auto;

    @media (max-width: 768px) {
        width: 200px;
        font-size: 18px;
        margin-left: 25px;
    }

    @media (max-width: 480px) {
        width: 150px;
        font-size: 16px;
        margin-left: 20px;
    }
`;
export const Text_P_Left_16 = styled.p.withConfig({
    shouldForwardProp: (prop) => prop !== 'ThemeMode',
})`
    color: ${({ ThemeMode }) => (ThemeMode ? 'black' : 'white')};
    font-size: 16px;
    font-family: "Prompt", sans-serif;
    font-weight: 400;
    font-style: normal;
    text-align: left;
    width: 250px;
    margin-top: 0px;
    margin-bottom: 0px;
    margin-left: 30px;
    margin-right: auto;

    @media (max-width: 768px) {
        width: 200px;
        font-size: 14px;
        margin-left: 25px;
    }

    @media (max-width: 480px) {
        width: 150px;
        font-size: 12px;
        margin-left: 20px;
    }
`;
//______________P______________
//______________SPAN____________
export const Text_Span_16 = styled.span.withConfig({
    shouldForwardProp: (prop) => prop !== 'ThemeMode',
})`
    color: ${({ ThemeMode }) => (ThemeMode ? 'black' : 'white')};    
    font-size: 16px;
    font-family: "Prompt", sans-serif;
    font-weight: 300;
    font-style: normal;

    @media (max-width: 768px) {
        font-size: 13px;
    }

    @media (max-width: 480px) {
        font-size: 10px;
    }
`;
//______________SPAN____________