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

//---------- JUSTIFY
//---------- LEFT

//---------- LEFT
//---------- RIGHT

//---------- RIGHT
//____________TEXT____________


//____________POPUP____________
export const Label_Popup_14 = styled.p.withConfig({
    shouldForwardProp: (prop) => prop !== 'ThemeMode',
})`
    color: ${({ ThemeMode }) => (ThemeMode ? 'rgb(137, 58, 174)' : 'rgb(147, 82, 231)')};
    text-Align: left; 
    font-Size: 14px; 
    font-family: "Prompt", sans-serif;
    font-weight: 300;
    font-style: normal;
    left: 14px;
    position: absolute;
    transform: translateY(-35px);
    transition: transform 0.3s ease;

    @media (max-width: 768px) {
        font-size: 12PX;
        transform: translateY(-30px);
        left: 10px;
    }

    @media (max-width: 480px) {
        font-size: 10px;
        transform: translateY(-25px);
        left: 8px;
    }
`;
//____________POPUP____________
//____________CHECK____________
export const Label_Check_18 = styled.label.withConfig({
    shouldForwardProp: (prop) => prop !== 'ThemeMode',
})`
    display: flex;
    align-items: center;
    cursor: pointer;
    color: ${({ ThemeMode }) => (ThemeMode ? 'black' : 'white')};
    font-family: "Prompt", sans-serif;
    font-weight: 300;
    font-style: normal;
    font-Size: 18px; 
    gap: 5px;
    

    @media (max-width: 768px) {
        font-Size: 16px; 
        gap: 4px;
    }

    @media (max-width: 480px) {
        font-Size: 14px; 
        gap: 3px;
    }
`;
//____________CHECK____________
