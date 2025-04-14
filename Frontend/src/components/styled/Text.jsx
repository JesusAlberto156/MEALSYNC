//____________IMPORT/EXPORT____________
// Componentes de React externos
import styled from 'styled-components';
// Estilos personalizados
import { Fade_Animation } from './Animations';
//____________IMPORT/EXPORT____________

//____________TITLE____________
export const Text_Title_40 = styled.h1.withConfig({
    shouldForwardProp: (prop) => prop !== 'ThemeMode',
})`
    color: ${({ ThemeMode }) => (ThemeMode ? 'black' : 'white')};
    font-family: "Prompt", sans-serif;
    font-weight: 700;
    font-style: italic;
    font-size: 40px;
    width: auto;
    margin: 0px;
    
    @media (max-width: 768px) {
        font-size: 38px;
    }

    @media (max-width: 480px) {
        font-size: 36px;
    }
`;
export const Text_Title_35 = styled.h1.withConfig({
    shouldForwardProp: (prop) => prop !== 'ThemeMode',
})`
    color: ${({ ThemeMode }) => (ThemeMode ? 'black' : 'white')};
    font-family: "Prompt", sans-serif;
    font-weight: 700;
    font-style: italic;
    font-size: 35px;
    width: auto;
    margin: 0px;
    
    @media (max-width: 768px) {
        font-size: 33px;
    }

    @media (max-width: 480px) {
        font-size: 31px;
    }
`;
export const Text_Title_30 = styled.h1.withConfig({
    shouldForwardProp: (prop) => prop !== 'ThemeMode',
})`
    color: ${({ ThemeMode }) => (ThemeMode ? 'black' : 'white')};
    font-family: "Prompt", sans-serif;
    font-weight: 700;
    font-style: italic;
    font-size: 30px;
    width: auto;
    margin: 0px;
    
    @media (max-width: 768px) {
        font-size: 28px;
    }

    @media (max-width: 480px) {
        font-size: 22px;
    }
`;
export const Text_Title_25 = styled.h1.withConfig({
    shouldForwardProp: (prop) => prop !== 'ThemeMode',
})`
    color: ${({ ThemeMode }) => (ThemeMode ? 'black' : 'white')};
    font-family: "Prompt", sans-serif;
    font-weight: 700;
    font-style: italic;
    font-size: 25px;
    width: auto;
    margin: 0px;
    
    @media (max-width: 768px) {
        font-size: 23px;
    }

    @media (max-width: 480px) {
        font-size: 21px;
    }
`;
export const Text_Title_20 = styled.h1.withConfig({
    shouldForwardProp: (prop) => prop !== 'ThemeMode',
})`
    color: ${({ ThemeMode }) => (ThemeMode ? 'black' : 'white')};
    font-family: "Prompt", sans-serif;
    font-weight: 700;
    font-style: italic;
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
    font-family: "Prompt", sans-serif;
    font-weight: 700;
    font-style: italic;
    font-size: 30px;
    width: auto;
    margin: 0px;
    
    @media (max-width: 768px) {
        font-size: 28px;
    }

    @media (max-width: 480px) {
        font-size: 22px;
    }
    
    &.text-shadow-pop-bl {
	    -webkit-animation: text-shadow-pop-bl 0.6s both;
	    animation: text-shadow-pop-bl 0.6s both;
    }
    
    @-webkit-keyframes text-shadow-pop-bl {
        0% {
            text-shadow: 0 0 #555555, 0 0 #555555, 0 0 #555555, 0 0 #555555, 0 0 #555555, 0 0 #555555, 0 0 #555555, 0 0 #555555;
            -webkit-transform: translateX(0) translateY(0);
                    transform: translateX(0) translateY(0);
        }
        100% {
            text-shadow: -1px 1px #555555, -2px 2px #555555, -3px 3px #555555, -4px 4px #555555, -5px 5px #555555, -6px 6px #555555, -7px 7px #555555, -8px 8px #555555;
            -webkit-transform: translateX(8px) translateY(-8px);
                    transform: translateX(8px) translateY(-8px);
        }
    }
    @keyframes text-shadow-pop-bl {
        0% {
            text-shadow: 0 0 #555555, 0 0 #555555, 0 0 #555555, 0 0 #555555, 0 0 #555555, 0 0 #555555, 0 0 #555555, 0 0 #555555;
            -webkit-transform: translateX(0) translateY(0);
                    transform: translateX(0) translateY(0);
        }
        100% {
            text-shadow: -1px 1px #555555, -2px 2px #555555, -3px 3px #555555, -4px 4px #555555, -5px 5px #555555, -6px 6px #555555, -7px 7px #555555, -8px 8px #555555;
            -webkit-transform: translateX(8px) translateY(-8px);
                    transform: translateX(8px) translateY(-8px);
        }
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
export const Text_A_24 = styled.a.withConfig({
    shouldForwardProp: (prop) => prop !== 'ThemeMode',
})`
    color: ${({ ThemeMode }) => (ThemeMode ? 'black' : 'white')};
    font-family: "Prompt", sans-serif;
    font-weight: 300;
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
export const Text_A_20 = styled.a.withConfig({
    shouldForwardProp: (prop) => prop !== 'ThemeMode',
})`
    color: ${({ ThemeMode }) => (ThemeMode ? 'black' : 'white')};
    font-family: "Prompt", sans-serif;
    font-weight: 300;
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
export const Text_A_16 = styled.a.withConfig({
    shouldForwardProp: (prop) => prop !== 'ThemeMode',
})`
    color: ${({ ThemeMode }) => (ThemeMode ? 'black' : 'white')};
    font-family: "Prompt", sans-serif;
    font-weight: 300;
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
export const Text_A_12 = styled.a.withConfig({
    shouldForwardProp: (prop) => prop !== 'ThemeMode',
})`
    color: ${({ ThemeMode }) => (ThemeMode ? 'black' : 'white')};
    font-family: "Prompt", sans-serif;
    font-weight: 300;
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
export const Text_Span_24 = styled.span`
    font-family: "Prompt", sans-serif;
    font-weight: 300;
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
export const Text_Span_20 = styled.span`
    font-family: "Prompt", sans-serif;
    font-weight: 300;
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
export const Text_Span_16 = styled.span`
    font-family: "Prompt", sans-serif;
    font-weight: 300;
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
export const Text_Span_12 = styled.span`
    font-family: "Prompt", sans-serif;
    font-weight: 300;
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
//______________SPAN____________