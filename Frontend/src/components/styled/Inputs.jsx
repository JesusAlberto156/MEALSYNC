//____________IMPORT/EXPORT____________
// Componentes de React externos
import styled from 'styled-components';
//____________IMPORT/EXPORT____________

//____________TEXT____________
//-------- Negro
export const Input_Text_100_Black = styled.input`
    width: 100%;
    height: auto;
    font-family: Century Gothic, Prompt;
    color: black;
    font-size: 16px;
    padding: 10px;
    border: 1px solid black;
    border-radius: 50px;
    border-bottom: 4px solid black;
    border-right: 4px solid black;
    background:rgba(255, 255, 255, 1);
    box-shadow: inset 2px 2px 14px rgba(0, 0, 0, 0.4);
    transition: 0.6s ease;
    outline: none;
    cursor: text;
    transition: background-color 0.4s, transform 0.4s;

    &:placeholder {
        color: black;
    }

    &:not(:disabled):hover {
        transform: scale(1.065) translateY(-2px);
        color: rgb(58,93,174);
        border-color: rgb(58,93,174);
        box-shadow: 4px 4px 12px rgba(58, 93, 174, 0.4), inset 2px 2px 14px rgba(58, 93, 174, 0.4);
        
        &:placeholder {
            color: rgb(58,93,174);
        }
    }

    &:disabled {
        cursor: not-allowed;
        background: rgba(84, 88, 89, 0.4);
        color: white;

        &:placeholder {
            color: white;
        }
    }

    @media (max-width: 768px) {
        font-size: 14px;
        border-radius: 30px;
        padding: 8px;
    }
    
    @media (max-width: 480px) {
        font-size: 12px;
        border-radius: 20px;
        border-bottom: 3px solid black;
        border-right: 3px solid black;
        padding: 6px;
    }

    &:focus {
        color: rgb(58,93,174);
        border-color: rgb(58,93,174);
        box-shadow: 4px 4px 12px rgba(58, 93, 174, 0.4), inset 2px 2px 14px rgba(58, 93, 174, 0.4);
        
        &:placeholder {
            color: rgb(58,93,174);
        }
    }
`;
export const Input_Text_60_Black = styled.input`
    width: 60%;
    height: auto;
    font-family: Century Gothic,Prompt;
    color: white;
    font-size: 16px;
    padding: 8px;
    border: none;
    border-radius: 10px;
    border-bottom: 2px solid black;
    background: transparent;
    transition: 0.6s ease;
    outline: none;
    cursor: text;

    &:placeholder {
        color: black; 
    }

    @media (max-width: 768px) {
        width: 250px;
        font-size: 14px;
        padding: 6px;
    }
    
    @media (max-width: 480px) {
        width: 200px;
        font-size: 12px;
        padding: 4px;
    }

    &:focus {
        box-shadow: 0 0 8px rgb(0, 0, 0);
    }
`;
//-------- Negro
//____________TEXT____________
//____________AREA____________
//-------- Negro
export const Input_Area_100_Black = styled.textarea`
    width: 100%;
    height: auto;
    font-family: Century Gothic, Prompt;
    color: black;
    font-size: 16px;
    padding: 10px;
    padding-left: 25px;
    padding-right: 15px;
    border: 1px solid black;
    border-top-left-radius: 50px;
    border-bottom-left-radius: 50px;
    border-bottom: 4px solid black;
    border-right: 4px solid black;
    background:rgba(255, 255, 255, 1);
    box-shadow: inset 2px 2px 14px rgba(0, 0, 0, 0.4);
    transition: 0.6s ease;
    outline: none;
    cursor: text;
    resize: none;
    overflow-y: auto;

    &::-webkit-scrollbar {
        width: 6px;          
        height: 6px;  
        background-color:rgb(255, 255, 255);
        border: 1px solid rgba(0, 0, 0, 0.3);
        box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.3);
    }

    &::-webkit-scrollbar-thumb {
        background-color: rgb(58,93,174);
        border: 1px solid rgba(0, 0, 0, 0.3);
        cursor: pointer;
    }

    &::-webkit-scrollbar-thumb:hover {
        background-color: rgb(82, 126, 231);
    }

    &:placeholder {
        color: black;
    }

    &:not(:disabled):hover {
        transform: scale(1.065) translateY(-2px);
        color: rgb(58,93,174);
        border-color: rgb(58,93,174);
        box-shadow: 4px 4px 12px rgba(58, 93, 174, 0.4), inset 2px 2px 14px rgba(58, 93, 174, 0.4);
        
        &:placeholder {
            color: rgb(58,93,174);
        }
    }

    &:disabled {
        cursor: not-allowed;
        background: rgba(84, 88, 89, 0.4);
        color: white;

        &:placeholder {
            color: white;
        }
    }

    @media (max-width: 768px) {
        font-size: 14px;
        border-top-left-radius: 30px;
        border-bottom-left-radius: 30px;
        padding: 8px;
        padding-left: 20px;
        padding-right: 10px;
    }
    
    @media (max-width: 480px) {
        font-size: 12px;
        border-top-left-radius: 20px;
        border-bottom-left-radius: 20px;
        border-bottom: 3px solid black;
        border-right: 3px solid black;
        padding: 6px;
        padding-left: 15px;
        padding-right: 5px;

        &::-webkit-scrollbar {
            width: 4px;          
            height: 4px;  
        }
    }

    &:focus {
        color: rgb(58,93,174);
        border-color: rgb(58,93,174);
        box-shadow: 4px 4px 12px rgba(58, 93, 174, 0.4), inset 2px 2px 14px rgba(58, 93, 174, 0.4);
        
        &:placeholder {
            color: rgb(58,93,174);
        }
    }
`;
//-------- Negro
//____________AREA____________
//____________GROUP____________
export const Input_Group = styled.div`
    position: relative;
    width: 100%;
`;
//____________GROUP____________
//____________SEARCH____________
export const Input_Search_Table_White = styled.input`
    width: 300px;
    height: auto;
    font-family: 'Century Gothic', Prompt, sans-serif;
    color: white;
    font-size: 16px;
    padding: 8px;
    border: none;
    border-radius: 12px;
    border-bottom: 2px solid white;
    background: transparent;
    transition: 0.4s ease;
    outline: none;
    cursor: text;

    &::placeholder {
        color: white; 
    }

    &:not(:disabled):hover {
        box-shadow: 0 0 8px rgb(255, 255, 255);
    }

    &:disabled {
        cursor: not-allowed;
        border-bottom: 2px dashed rgba(255, 255, 255, 0.80);
        box-shadow: none;
        color: rgba(255, 255, 255, 0.80);

        &::placeholder {
            color: rgba(255, 255, 255, 0.80);
        }
    }

    @media (max-width: 768px) {
        width: 250px;
        font-size: 14px;
        padding: 6px;
        border-radius: 10px;
    }
    
    @media (max-width: 480px) {
        width: 200px;
        font-size: 12px;
        padding: 4px;
        border-radius: 8px;
    }

    &:not(:disabled):focus {
        box-shadow: 0 0 8px rgb(255, 255, 255);
    }
`;
//____________SEARCH____________
//____________RADIO____________
export const Input_Radio_20 = styled.input`
    appearance: none;
    -webkit-appearance: none;
    -moz-appearance: none;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    border: 1px solid black;
    border-bottom: 3px solid black;
    border-right: 3px solid black;
    cursor: pointer;
    position: relative;
    background:rgba(255, 255, 255, 1);
    transition: all 0.4s ease;

    &:not(:checked):not(:disabled):hover {
        border: 1px solid rgb(20, 165, 76);
        border-bottom: 3px solid rgb(20, 165, 76);
        border-right: 3px solid rgb(20, 165, 76);
    }

    &:checked {
        background: rgb(60, 188, 109);
    }

    &:checked::after {
        content: '✔';
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        color: white;
        font-size: 12px;
        font-weight: bold;
    }

    &:not(:disabled):hover{
        transform: scale(1.15);
    }

    &:disabled {
        background: rgba(84, 88, 89, 0.4);
        cursor: not-allowed;

        &:checked {
            background: rgb(13, 112, 51);
        }
    }

    @media (max-width: 768px) {
        width: 18px;
        height: 18px;

        &:checked::after {
            font-size: 10px;
        }
    }

    @media (max-width: 480px) {
        width: 16px;
        height: 16px;

        &:checked::after {
            font-size: 8px;
        }
    }
`;
//____________RADIO____________
//____________CHECK____________
export const Input_Checkbox_16 = styled.input`
    appearance: none;
    -webkit-appearance: none;
    -moz-appearance: none;  
    border: 1px solid black;
    border-bottom: 3px solid black;
    border-right: 3px solid black; 
    width: 16px;
    height: 16px;
    cursor: pointer;
    position: relative;
    transition: all 0.4s ease;
    
    &:not(:checked):not(:disabled):hover {
        border: 1px solid rgb(20, 165, 76);
        border-bottom: 3px solid rgb(20, 165, 76);
        border-right: 3px solid rgb(20, 165, 76);
    }

    &:checked {
        background: rgb(60, 188, 109);
    }

    &:checked::after {
        content: '✔';
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        color: white;
        font-size: 12px;
        font-weight: bold;
    }

    &:not(:disabled):hover{
        transform: scale(1.15);
    }

    &:disabled {
        background: rgba(84, 88, 89, 0.4);
        cursor: not-allowed;

        &:checked {
            background: rgb(13, 112, 51);
        }
    }

    @media (max-width: 768px) {
        width: 14px;
        height: 14px;

        &:checked::after {
            font-size: 10px;
        }
    }

    @media (max-width: 480px) {
        width: 12px;
        height: 12px;

        &:checked::after {
            font-size: 8px;
        }
    }
`;
//____________CHECK____________