//____________IMPORT/EXPORT____________
// Componentes de React externos
import styled from 'styled-components';
//____________IMPORT/EXPORT____________

//____________TEXT____________
//---------- CENTER
export const Label_Text_24_Center = styled.label.withConfig({
    shouldForwardProp: (prop) => prop !== 'ThemeMode',
})`
    color: ${({ ThemeMode }) => (ThemeMode ? 'black' : 'white')};
    font-family: Century Gothic,Prompt;
    font-style: normal;
    font-size: 24px;
    display: flex;
    text-align: center;
    gap: 5px;
    cursor: pointer;

    @media (max-width: 768px) {
        font-size: 22px;
        gap: 4px;
    }

    @media (max-width: 480px) {
        font-size: 20px;
        gap: 3px;
    }

`;
export const Label_Text_20_Center = styled.label.withConfig({
    shouldForwardProp: (prop) => prop !== 'ThemeMode',
})`
    color: ${({ ThemeMode }) => (ThemeMode ? 'black' : 'white')};
    font-family: Century Gothic,Prompt;
    font-style: normal;
    font-size: 20px;
    display: flex;
    text-align: center;
    gap: 5px;
    cursor: pointer;

    @media (max-width: 768px) {
        font-size: 18px;
        gap: 4px;
    }

    @media (max-width: 480px) {
        font-size: 16px;
        gap: 3px;
    }

`;
export const Label_Text_16_Center = styled.label.withConfig({
    shouldForwardProp: (prop) => prop !== 'ThemeMode',
})`
    color: ${({ ThemeMode }) => (ThemeMode ? 'black' : 'white')};
    font-family: Century Gothic,Prompt;
    font-style: normal;
    font-size: 16px;
    display: flex;
    text-align: center;
    gap: 5px;
    cursor: pointer;

    @media (max-width: 768px) {
        font-size: 14px;
        gap: 4px;
    }

    @media (max-width: 480px) {
        font-size: 12px;
        gap: 3px;
    }

`;
export const Label_Text_12_Center = styled.label.withConfig({
    shouldForwardProp: (prop) => prop !== 'ThemeMode',
})`
    color: ${({ ThemeMode }) => (ThemeMode ? 'black' : 'white')};
    font-family: Century Gothic,Prompt;
    font-style: normal;
    font-size: 12px;
    display: flex;
    text-align: center;
    gap: 5px;
    cursor: pointer;

    @media (max-width: 768px) {
        font-size: 10px;
        gap: 4px;
    }

    @media (max-width: 480px) {
        font-size: 8px;
        gap: 3px;
    }

`;
//---------- CENTER
//---------- JUSTIFY
export const Label_Text_24_Justify = styled.label.withConfig({
    shouldForwardProp: (prop) => prop !== 'ThemeMode',
})`
    color: ${({ ThemeMode }) => (ThemeMode ? 'black' : 'white')};
    font-family: Century Gothic,Prompt;
    font-style: normal;
    font-size: 24px;
    display: flex;
    text-align: justify;
    gap: 5px;
    cursor: pointer;

    @media (max-width: 768px) {
        font-size: 22px;
        gap: 4px;
    }

    @media (max-width: 480px) {
        font-size: 20px;
        gap: 3px;
    }

`;
export const Label_Text_20_Justify = styled.label.withConfig({
    shouldForwardProp: (prop) => prop !== 'ThemeMode',
})`
    color: ${({ ThemeMode }) => (ThemeMode ? 'black' : 'white')};
    font-family: Century Gothic,Prompt;
    font-style: normal;
    font-size: 20px;
    display: flex;
    text-align: justify;
    gap: 5px;
    cursor: pointer;

    @media (max-width: 768px) {
        font-size: 18px;
        gap: 4px;
    }

    @media (max-width: 480px) {
        font-size: 16px;
        gap: 3px;
    }

`;
export const Label_Text_16_Justify = styled.label.withConfig({
    shouldForwardProp: (prop) => prop !== 'ThemeMode',
})`
    color: ${({ ThemeMode }) => (ThemeMode ? 'black' : 'white')};
    font-family: Century Gothic,Prompt;
    font-style: normal;
    font-size: 16px;
    display: flex;
    text-align: justify;
    gap: 5px;
    cursor: pointer;

    @media (max-width: 768px) {
        font-size: 14px;
        gap: 4px;
    }

    @media (max-width: 480px) {
        font-size: 12px;
        gap: 3px;
    }

`;
export const Label_Text_12_Justify = styled.label.withConfig({
    shouldForwardProp: (prop) => prop !== 'ThemeMode',
})`
    color: ${({ ThemeMode }) => (ThemeMode ? 'black' : 'white')};
    font-family: Century Gothic,Prompt;
    font-style: normal;
    font-size: 12px;
    display: flex;
    text-align: justify;
    gap: 5px;
    cursor: pointer;

    @media (max-width: 768px) {
        font-size: 10px;
        gap: 4px;
    }

    @media (max-width: 480px) {
        font-size: 8px;
        gap: 3px;
    }

`;
//---------- JUSTIFY
//---------- LEFT
export const Label_Text_24_Left = styled.label.withConfig({
    shouldForwardProp: (prop) => prop !== 'ThemeMode',
})`
    color: ${({ ThemeMode }) => (ThemeMode ? 'black' : 'white')};
    font-family: Century Gothic,Prompt;
    font-style: normal;
    font-size: 24px;
    display: flex;
    text-align: left;
    gap: 5px;
    cursor: pointer;

    @media (max-width: 768px) {
        font-size: 22px;
        gap: 4px;
    }

    @media (max-width: 480px) {
        font-size: 20px;
        gap: 3px;
    }

`;
export const Label_Text_20_Left = styled.label.withConfig({
    shouldForwardProp: (prop) => prop !== 'ThemeMode',
})`
    color: ${({ ThemeMode }) => (ThemeMode ? 'black' : 'white')};
    font-family: Century Gothic,Prompt;
    font-style: normal;
    font-size: 20px;
    display: flex;
    text-align: left;
    gap: 5px;
    cursor: pointer;

    @media (max-width: 768px) {
        font-size: 18px;
        gap: 4px;
    }

    @media (max-width: 480px) {
        font-size: 16px;
        gap: 3px;
    }

`;
export const Label_Text_16_Left = styled.label.withConfig({
    shouldForwardProp: (prop) => prop !== 'ThemeMode',
})`
    color: ${({ ThemeMode }) => (ThemeMode ? 'black' : 'white')};
    font-family: Century Gothic,Prompt;
    font-style: normal;
    font-size: 16px;
    display: flex;
    text-align: left;
    gap: 5px;
    cursor: pointer;

    @media (max-width: 768px) {
        font-size: 14px;
        gap: 4px;
    }

    @media (max-width: 480px) {
        font-size: 12px;
        gap: 3px;
    }

`;
export const Label_Text_12_Left = styled.label.withConfig({
    shouldForwardProp: (prop) => prop !== 'ThemeMode',
})`
    color: ${({ ThemeMode }) => (ThemeMode ? 'black' : 'white')};
    font-family: Century Gothic,Prompt;
    font-style: normal;
    font-size: 12px;
    display: flex;
    text-align: left;
    gap: 5px;
    cursor: pointer;

    @media (max-width: 768px) {
        font-size: 10px;
        gap: 4px;
    }

    @media (max-width: 480px) {
        font-size: 8px;
        gap: 3px;
    }

`;
//---------- LEFT
//---------- RIGHT
export const Label_Text_24_Right = styled.label.withConfig({
    shouldForwardProp: (prop) => prop !== 'ThemeMode',
})`
    color: ${({ ThemeMode }) => (ThemeMode ? 'black' : 'white')};
    font-family: Century Gothic,Prompt;
    font-style: normal;
    font-size: 24px;
    display: flex;
    text-align: right;
    gap: 5px;
    cursor: pointer;

    @media (max-width: 768px) {
        font-size: 22px;
        gap: 4px;
    }

    @media (max-width: 480px) {
        font-size: 20px;
        gap: 3px;
    }

`;
export const Label_Text_20_Right = styled.label.withConfig({
    shouldForwardProp: (prop) => prop !== 'ThemeMode',
})`
    color: ${({ ThemeMode }) => (ThemeMode ? 'black' : 'white')};
    font-family: Century Gothic,Prompt;
    font-style: normal;
    font-size: 20px;
    display: flex;
    text-align: right;
    gap: 5px;
    cursor: pointer;

    @media (max-width: 768px) {
        font-size: 18px;
        gap: 4px;
    }

    @media (max-width: 480px) {
        font-size: 16px;
        gap: 3px;
    }

`;
export const Label_Text_16_Right = styled.label.withConfig({
    shouldForwardProp: (prop) => prop !== 'ThemeMode',
})`
    color: ${({ ThemeMode }) => (ThemeMode ? 'black' : 'white')};
    font-family: Century Gothic,Prompt;
    font-style: normal;
    font-size: 16px;
    display: flex;
    text-align: right;
    gap: 5px;
    cursor: pointer;

    @media (max-width: 768px) {
        font-size: 14px;
        gap: 4px;
    }

    @media (max-width: 480px) {
        font-size: 12px;
        gap: 3px;
    }

`;
export const Label_Text_12_Right = styled.label.withConfig({
    shouldForwardProp: (prop) => prop !== 'ThemeMode',
})`
    color: ${({ ThemeMode }) => (ThemeMode ? 'black' : 'white')};
    font-family: Century Gothic,Prompt;
    font-style: normal;
    font-size: 12px;
    display: flex;
    text-align: right;
    gap: 5px;
    cursor: pointer;

    @media (max-width: 768px) {
        font-size: 10px;
        gap: 4px;
    }

    @media (max-width: 480px) {
        font-size: 8px;
        gap: 3px;
    }

`;
//---------- RIGHT
//____________TEXT____________