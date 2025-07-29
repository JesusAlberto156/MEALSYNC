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
    right: 18px;

    @media (max-width: 768px) {
        font-size: 10px;
        top: 40px;
        right: 16px;
    }

    @media (max-width: 480px) {
        font-size: 8px;
        gap: 3px;
        top: 32px;
        right: 14px;
    }

`;
export const Label_Text_16_Black = styled.label`
    color: black;    
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
//-------- Negro
//____________TEXT____________
//____________AREA____________
//-------- Negro
export const Label_Area_12_Black = styled.label`
    color: black;
    font-family: Century Gothic,Prompt;
    font-style: normal;
    font-size: 12px;
    display: flex;
    text-align: center;
    cursor: default;
    position: absolute;
    top: 88px;
    right: 14px;

    @media (max-width: 768px) {
        font-size: 10px;
        top: 75px;
        right: 12px;
    }

    @media (max-width: 480px) {
        font-size: 8px;
        top: 62px;
        right: 10px;
    }

`;
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
    transition: all 0.4s ease;

    ${({ Disabled }) => (Disabled ? 
        `cursor: not-allowed;
         color: rgba(0, 0, 0, 0.6);` 
        : 
        `&:hover{
            color: rgb(20, 165, 76);
            transform: scale(1.15);
        }`)}

    @media (max-width: 768px) {
        font-size: 14px;
        gap: 4px;
    }

    @media (max-width: 480px) {
        font-size: 12px;
        gap: 2px;
        ${({ Disabled }) => (Disabled ? 
        `cursor: not-allowed;
         color: rgba(0, 0, 0, 0.6);` 
        : 
        `&:hover{
            color: rgb(20, 165, 76);
            transform: scale(1.15);
        }`)}
    }

`;
//-------- Negro
//____________BUTTOM____________