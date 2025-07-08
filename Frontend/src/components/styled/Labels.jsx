//____________IMPORT/EXPORT____________
// Componentes de React externos
import styled from 'styled-components';
//____________IMPORT/EXPORT____________

//____________TEXT____________
//-------- Negro
export const Label_Text_12_Black = styled.label`
    color: black;
    font-family: Century Gothic,Prompt;
    font-style: normal;
    font-size: 12px;
    cursor: default;
    position: absolute;
    top: 46px;
    right: 20px;

    @media (max-width: 768px) {
        font-size: 10px;
        gap: 4px;
        top: 39px;
        right: 18px;
    }

    @media (max-width: 480px) {
        font-size: 8px;
        gap: 3px;
        top: 32px;
        right: 16px;
    }

`;
//-------- Negro
//____________TEXT____________
//____________AREA____________
//-------- Negro

//-------- Negro
//____________AREA____________
//____________BUTTOM____________
//-------- Negro
export const Label_Button_16_Black = styled.label.withConfig({
    shouldForwardProp: (prop) => prop !== 'Disabled',
})`
    color: black;
    background: transparent;
    border: none;
    font-family: Century Gothic,Prompt;
    font-style: normal;
    font-size: 16px;
    cursor: pointer;
    display: flex;
    justify-content: center;
    gap: 6px;
    transition: all 0.8s ease;

    ${({ Disabled }) => (Disabled ? 
        `cursor: not-allowed;` 
        : 
        `&:hover{
            color: rgb(13, 112, 51);
            transform: scale(1.1);
        }`)}

    @media (max-width: 768px) {
        font-size: 14px;
        gap: 4px;
    }

    @media (max-width: 480px) {
        font-size: 12px;
        gap: 2px;
        ${({ Disabled }) => (Disabled ? 
        `cursor: not-allowed;` 
        : 
        `&:hover{
            color: rgb(13, 112, 51);
            transform: scale(1.05);
        }`)}
    }

`;
//-------- Negro
//____________BUTTOM____________
//____________TOTAL____________
//---------- CENTER
export const Label_Total_Area_12_Center = styled.label.withConfig({
    shouldForwardProp: (prop) => prop !== 'ThemeMode',
})`
    color: ${({ ThemeMode }) => (ThemeMode ? 'black' : 'white')};
    font-family: Century Gothic,Prompt;
    font-style: normal;
    font-size: 12px;
    display: flex;
    text-align: center;
    gap: 5px;
    cursor: default;
    position: absolute;
    top: 90px;
    right: 5px;

    @media (max-width: 768px) {
        font-size: 10px;
        gap: 4px;
        top: 72px;
        right: 10px;
    }

    @media (max-width: 480px) {
        font-size: 8px;
        gap: 3px;
        top: 62px;
        right: 15px;
    }

`;
//---------- CENTER
//____________TOTAL____________