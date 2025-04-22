//____________IMPORT/EXPORT____________
// Componentes de React externos
import styled from 'styled-components';
//____________IMPORT/EXPORT____________

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
    padding: 10px;
    width: auto;
    margin: 0px;

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
    padding: 10px;
    width: auto;
    margin: 0px;

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
    padding: 10px;
    width: auto;
    margin: 0px;

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
    padding: 10px;
    width: auto;
    margin: 0px;

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
    padding: 10px;
    width: auto;
    margin: 0px;

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
    padding: 10px;
    width: auto;
    margin: 0px;

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
    padding: 10px;
    width: auto;
    margin: 0px;

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
    padding: 10px;
    width: auto;
    margin: 0px;

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
    padding: 10px;
    width: auto;
    margin: 0px;

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
    padding: 10px;
    width: auto;
    margin: 0px;

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
    padding: 10px;
    width: auto;
    margin: 0px;

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
    padding: 10px;
    width: auto;
    margin: 0px;

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
    padding: 10px;
    width: auto;
    margin: 0px;

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
    padding: 10px;
    width: auto;
    margin: 0px;

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
    padding: 10px;
    width: auto;
    margin: 0px;

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
    padding: 10px;
    width: auto;
    margin: 0px;

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
    padding: 10px;
    width: auto;
    margin: 0px;

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
    padding: 10px;
    width: auto;
    margin: 0px;

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
    padding: 10px;
    width: auto;
    margin: 0px;

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
    padding: 10px;
    width: auto;
    margin: 0px;

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
    padding: 10px;
    width: auto;
    margin: 0px;

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
    padding: 10px;
    width: auto;
    margin: 0px;

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
    padding: 10px;
    width: auto;
    margin: 0px;

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
    padding: 10px;
    width: auto;
    margin: 0px;

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
    padding: 10px;
    width: auto;
    margin: 0px;

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
    padding: 10px;
    width: auto;
    margin: 0px;

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
    padding: 10px;
    width: auto;
    margin: 0px;

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
    padding: 10px;
    width: auto;
    margin: 0px;

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
    padding: 10px;
    width: auto;
    margin: 0px;

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
    padding: 10px;
    width: auto;
    margin: 0px;

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
    padding: 10px;
    width: auto;
    margin: 0px;

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
    padding: 10px;
    width: auto;
    margin: 0px;

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
    font-family: Century Gothic,Prompt;
    font-style: normal;
    font-size: 24px;
    text-align: center;
    padding: 10px;
    width: auto;
    margin: 0px;

    @media (max-width: 768px) {
        font-size: 22px;
        padding: 8px;
    }

    @media (max-width: 480px) {
        font-size: 20px;
        padding: 6px;
    }
`;
export const Text_Span_20_Center = styled.span`
    font-family: Century Gothic,Prompt;
    font-style: normal;
    font-size: 20px;
    text-align: center;
    padding: 10px;
    width: auto;
    margin: 0px;

    @media (max-width: 768px) {
        font-size: 18px;
        padding: 8px;
    }

    @media (max-width: 480px) {
        font-size: 16px;
        padding: 6px;
    }
`;
export const Text_Span_16_Center = styled.span`
    font-family: Century Gothic,Prompt;
    font-style: normal;
    font-size: 16px;
    text-align: center;
    padding: 10px;
    width: auto;
    margin: 0px;

    @media (max-width: 768px) {
        font-size: 14px;
        padding: 8px;
    }

    @media (max-width: 480px) {
        font-size: 12px;
        padding: 6px;
    }
`;
export const Text_Span_12_Center = styled.span`
    font-family: Century Gothic,Prompt;
    font-style: normal;
    font-size: 12px;
    text-align: center;
    padding: 10px;
    width: auto;
    margin: 0px;

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
export const Text_Span_24_Justify = styled.span`
    font-family: Century Gothic,Prompt;
    font-style: normal;
    font-size: 24px;
    text-align: justify;
    padding: 10px;
    width: auto;
    margin: 0px;

    @media (max-width: 768px) {
        font-size: 22px;
        padding: 8px;
    }

    @media (max-width: 480px) {
        font-size: 20px;
        padding: 6px;
    }
`;
export const Text_Span_20_Justify = styled.span`
    font-family: Century Gothic,Prompt;
    font-style: normal;
    font-size: 20px;
    text-align: justify;
    padding: 10px;
    width: auto;
    margin: 0px;

    @media (max-width: 768px) {
        font-size: 18px;
        padding: 8px;
    }

    @media (max-width: 480px) {
        font-size: 16px;
        padding: 6px;
    }
`;
export const Text_Span_16_Justify = styled.span`
    font-family: Century Gothic,Prompt;
    font-style: normal;
    font-size: 16px;
    text-align: justify;
    padding: 10px;
    width: auto;
    margin: 0px;

    @media (max-width: 768px) {
        font-size: 14px;
        padding: 8px;
    }

    @media (max-width: 480px) {
        font-size: 12px;
        padding: 6px;
    }
`;
export const Text_Span_12_Justify = styled.span`
    font-family: Century Gothic,Prompt;
    font-style: normal;
    font-size: 12px;
    text-align: justify;
    padding: 10px;
    width: auto;
    margin: 0px;

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
export const Text_Span_24_Left = styled.span`
    font-family: Century Gothic,Prompt;
    font-style: normal;
    font-size: 24px;
    text-align: left;
    padding: 10px;
    width: auto;
    margin: 0px;

    @media (max-width: 768px) {
        font-size: 22px;
        padding: 8px;
    }

    @media (max-width: 480px) {
        font-size: 20px;
        padding: 6px;
    }
`;
export const Text_Span_20_Left = styled.span`
    font-family: Century Gothic,Prompt;
    font-style: normal;
    font-size: 20px;
    text-align: left;
    padding: 10px;
    width: auto;
    margin: 0px;

    @media (max-width: 768px) {
        font-size: 18px;
        padding: 8px;
    }

    @media (max-width: 480px) {
        font-size: 16px;
        padding: 6px;
    }
`;
export const Text_Span_16_Left = styled.span`
    font-family: Century Gothic,Prompt;
    font-style: normal;
    font-size: 16px;
    text-align: left;
    padding: 10px;
    width: auto;
    margin: 0px;

    @media (max-width: 768px) {
        font-size: 14px;
        padding: 8px;
    }

    @media (max-width: 480px) {
        font-size: 12px;
        padding: 6px;
    }
`;
export const Text_Span_12_Left = styled.span`
    font-family: Century Gothic,Prompt;
    font-style: normal;
    font-size: 12px;
    text-align: left;
    padding: 10px;
    width: auto;
    margin: 0px;

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
export const Text_Span_24_Right = styled.span`
    font-family: Century Gothic,Prompt;
    font-style: normal;
    font-size: 24px;
    text-align: right;
    padding: 10px;
    width: auto;
    margin: 0px;

    @media (max-width: 768px) {
        font-size: 22px;
        padding: 8px;
    }

    @media (max-width: 480px) {
        font-size: 20px;
        padding: 6px;
    }
`;
export const Text_Span_20_Right = styled.span`
    font-family: Century Gothic,Prompt;
    font-style: normal;
    font-size: 20px;
    text-align: right;
    padding: 10px;
    width: auto;
    margin: 0px;

    @media (max-width: 768px) {
        font-size: 18px;
        padding: 8px;
    }

    @media (max-width: 480px) {
        font-size: 16px;
        padding: 6px;
    }
`;
export const Text_Span_16_Right = styled.span`
    font-family: Century Gothic,Prompt;
    font-style: normal;
    font-size: 16px;
    text-align: right;
    padding: 10px;
    width: auto;
    margin: 0px;

    @media (max-width: 768px) {
        font-size: 14px;
        padding: 8px;
    }

    @media (max-width: 480px) {
        font-size: 12px;
        padding: 6px;
    }
`;
export const Text_Span_12_Right = styled.span`
    font-family: Century Gothic,Prompt;
    font-style: normal;
    font-size: 12px;
    text-align: right;
    padding: 10px;
    width: auto;
    margin: 0px;

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
//______________SPAN____________