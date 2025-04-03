import styled, { createGlobalStyle } from 'styled-components';
import { FadeAnimation } from './Animations';

export const GlobalStyle = createGlobalStyle`
    @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&display=swap');

    body {
        font-family: 'Playfair Display', serif;
    }
`;
//____________TITLE____________
export const Text_Title_Fade_20_Dark = styled.h1`
    color: white;
    font-size: 20px;
    font-family: "Prompt", sans-serif;
    font-weight: 700;
    font-style: italic;
    animation: ${FadeAnimation} 2s infinite;
    margin-top: 0px;

    @media (max-width: 768px) {
        font-size: 18px;
    }

    @media (max-width: 480px) {
        font-size: 16px;
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
    animation: ${FadeAnimation} 2s infinite;
    margin-top: 0px;

    @media (max-width: 768px) {
        font-size: 20px;
    }

    @media (max-width: 480px) {
        font-size: 18px;
    }
`;

export const Text_Title_Fade_20_Light = styled.h1.withConfig({
    shouldForwardProp: (prop) => prop !== 'ThemeMode',
})`
    color: ${({ ThemeMode }) => (ThemeMode ? 'black' : 'white')};
    font-size: 22px;
    font-family: "Prompt", sans-serif;
    font-weight: 700;
    font-style: italic;
    animation: ${FadeAnimation} 2s infinite;
    margin-top: 0px;

    @media (max-width: 768px) {
        font-size: 20px;
    }

    @media (max-width: 480px) {
        font-size: 18px;
    }
`;
export const Text_Title_Fade_30_Dark = styled.h1`
    color: white;
    font-size: 30px;
    font-family: "Prompt", sans-serif;
    font-weight: 700;
    font-style: italic;
    animation: ${FadeAnimation} 2s infinite;
    margin-top: 0px;
    margin-bottom: 30px;

    @media (max-width: 768px) {
        font-size: 28px;
        margin-bottom: 25px;
    }

    @media (max-width: 480px) {
        font-size: 26px;
        margin-bottom: 20px;
    }
`;
export const Text_Title_Fade_30_Light = styled.h1`
    color: black;
    font-size: 30px;
    font-family: "Prompt", sans-serif;
    font-weight: 700;
    font-style: italic;
    animation: ${FadeAnimation} 2s infinite;
    margin-top: 0px;

    @media (max-width: 768px) {
        font-size: 28px;
    }

    @media (max-width: 480px) {
        font-size: 26px;
    }
`;
export const Text_Title_Fade_30__Dark = styled.h1`
    color: white;
    font-size: 30px;
    font-family: "Prompt", sans-serif;
    font-weight: 700;
    font-style: italic;
    animation: ${FadeAnimation} 2s infinite;
    margin-top: 0px;
    margin-bottom: 0px;

    @media (max-width: 768px) {
        font-size: 25px;
    }

    @media (max-width: 480px) {
        font-size: 20px;
    }
`;
export const Text_Title_Fade_30__Light = styled.h1`
    color: black;
    font-size: 30px;
    font-family: "Prompt", sans-serif;
    font-weight: 700;
    font-style: italic;
    animation: ${FadeAnimation} 2s infinite;
    margin-top: 0px;
    margin-bottom: 0px;
    
    @media (max-width: 768px) {
        font-size: 25px;
    }

    @media (max-width: 480px) {
        font-size: 20px;
    }
`;
export const Text_Title_Fade_50_Dark = styled.h1`
    color: white;
    font-size: 50px;
    font-family: "Prompt", sans-serif;
    font-weight: 700;
    font-style: italic;
    animation: ${FadeAnimation} 2s infinite;
    margin-top: 0px;

    @media (max-width: 768px) {
        font-size: 45px;
    }

    @media (max-width: 480px) {
        font-size: 40px;
    }
`;
export const Text_Title_Fade_50_Light = styled.h1`
    color: black;
    font-size: 50px;
    font-family: "Prompt", sans-serif;
    font-weight: 700;
    font-style: italic;
    animation: ${FadeAnimation} 2s infinite;
    margin-top: 0px;

    @media (max-width: 768px) {
        font-size: 45px;
    }

    @media (max-width: 480px) {
        font-size: 40px;
    }
`;
//____________TITLE____________
//______________A______________
export const Text_A_18_Dark = styled.a`
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
export const Text_A_18_Light = styled.a`
    color: black
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
export const Text_A_25_Dark = styled.a`
    color: white;
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
export const Text_A_25_Light = styled.a`
    color: black;
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
//______________A______________
//______________P______________
export const Text_P_20_Dark = styled.p`
    color: white;
    font-size: 20px;
    font-family: "Prompt", sans-serif;
    font-weight: 400;
    font-style: normal;
    text-align: left;
    margin-top: 0px;
    margin-bottom: 0px;
    margin-left: 30px;

    @media (max-width: 768px) {
        font-size: 18px;
        margin-left: 28px;
    }

    @media (max-width: 480px) {
        font-size: 14px;
        margin-left: 26px;
    }
`;
export const Text_P_20_Light = styled.p`
    color: black;
    font-size: 20px;
    font-family: "Prompt", sans-serif;
    font-weight: 400;
    font-style: normal;
    text-align: left;
    margin-top: 0px;
    margin-bottom: 0px;
    margin-left: 30px;

    @media (max-width: 768px) {
        font-size: 18px;
        margin-left: 28px;
    }

    @media (max-width: 480px) {
        font-size: 14px;
        margin-left: 26px;
    }
`;
//______________P______________

//--------MODAL--------
export const Title_Fade_Modal = styled.h1`
    text-align: center;
    position: relative;
    margin-top: 10px;
    font-size: 30px;

    animation: ${FadeAnimation} 2s infinite;

    @media (max-width: 768px) {
        font-size: 25px;
        margin-top: 8px;
    }

    @media (max-width: 480px) {
        font-size: 20px;
        margin-top: 6px;
    }
`;
//--------MODAL--------
//--------FOOTER--------
export const Text_Footer = styled.p`
    font-Size: 1.1rem; 
    font-family:Arial, Helvetica, sans-serif;
    transition: transform 0.3s ease;
    margin-top: 30px;

    @media (max-width: 768px) {
        margin-top: 15px;
        font-size: 1rem;
    }

    @media (max-width: 480px) {
        margin-top: 10px;
        font-size: 0.9rem;
    }
`;
//--------FOOTER--------
//--------LOADING--------
export const Title_Fade_Loading = styled.div`
    color: white;
    font-size: 4rem;
    font-family:Arial, Helvetica, sans-serif;
    margin-bottom: 25px;
    font-weight: bold;
    animation: ${FadeAnimation} 2s infinite;

    @media (max-width: 768px) {
        font-size: 3.5rem;
    }

    @media (max-width: 480px) {
        font-size: 3rem;
    }
`;
//--------LOADING--------
//--------PAGINATION--------
export const Text_Pagination = styled.span`
    font-size: 16px;

    @media (max-width: 768px) {
        font-size: 12px;
    }

    @media (max-width: 480px) {
        font-size: 10px;
    }
`;
//--------PAGINATION--------