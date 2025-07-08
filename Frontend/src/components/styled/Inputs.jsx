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
    background:rgb(230, 230, 230);
    transition: 0.6s ease;
    outline: none;
    cursor: text;

    &:placeholder {
        color: black;
    }

    &:not(:disabled):hover {
        transform: scale(1.05);
        color: rgb(58,93,174);
        border-color: rgb(58,93,174);

        &:placeholder {
            color: rgb(58,93,174);
        }
    }

    &:disabled {
        cursor: not-allowed;
        background: rgba(128, 128, 128, 0.6);
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
        box-shadow: 0 0 8px rgb(0, 0, 0);

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
export const Input_Area_Black_100 = styled.textarea.withConfig({
    shouldForwardProp: (prop) => prop !== 'ThemeMode',
})`
    width: 100%;
    height: auto;
    font-family: 'Century Gothic', Prompt, sans-serif;
    color: ${({ ThemeMode }) => (ThemeMode ? 'black' : 'white')};
    font-size: 16px;
    padding: 10px;
    border: ${({ ThemeMode }) => (ThemeMode ? '1px solid black' : '1px solid white')};
    border-radius: 15px;
    border-bottom: ${({ ThemeMode }) => (ThemeMode ? '3px solid black' : '3px solid white')};
    background: ${({ ThemeMode }) => (ThemeMode ? 'rgb(245,250,250)' : 'rgb(120, 121, 121)')};
    transition: 0.1s ease;
    outline: none;
    cursor: text;
    resize: none;
    overflow-y: auto;

    &::placeholder {
        color: ${({ ThemeMode }) => (ThemeMode ? 'black' : 'white')};
    }

    &:disabled {
        cursor: not-allowed;
        opacity: 0.8;
        background: ${({ ThemeMode }) => (ThemeMode ? 'rgb(221, 223, 226)' : 'rgb(85, 85, 85)')};
    }

    @media (max-width: 768px) {
        font-size: 14px;
        padding: 8px;
    }

    @media (max-width: 480px) {
        font-size: 12px;
        padding: 6px;
    }

    &:focus {
        color: ${({ ThemeMode }) => (ThemeMode ? 'rgb(58,93,174)' : 'rgb(255, 255, 255)')};
        border-color: ${({ ThemeMode }) => (ThemeMode ? 'rgb(58,93,174)' : 'rgb(82, 126, 231)')};
        box-shadow: 0 0 8px ${({ ThemeMode }) => (ThemeMode ? 'rgb(0, 0, 0)' : 'rgb(82, 126, 231)')};

        &::placeholder {
            color: ${({ ThemeMode }) => (ThemeMode ? 'rgb(58,93,174)' : 'rgb(255, 255, 255)')};
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
    border-radius: 10px;
    border-bottom: 2px solid white;
    background: transparent;
    transition: 0.1s ease;
    outline: none;
    cursor: text;

    &::placeholder {
        color: white; 
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
    background:rgb(230, 230, 230);
    transition: all 0.8s ease;

    &:not(:checked):not(:disabled):hover {
        border: 1px solid rgb(13, 112, 51);
        border-bottom: 3px solid rgb(13, 112, 51);
        border-right: 3px solid rgb(13, 112, 51);
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
        transform: scale(1.1);
    }

    &:disabled {
        background: rgba(128, 128, 128, 0.6);
        cursor: not-allowed;

        &:checked {
            background: rgba(60, 188, 109, 0.6);
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
    transition: all 0.2s ease;
    
    &:not(:checked):not(:disabled):hover {
        border: 1px solid rgb(13, 112, 51);
        border-bottom: 3px solid rgb(13, 112, 51);
        border-right: 3px solid rgb(13, 112, 51);
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
        transform: scale(1.1);
    }

    &:disabled {
        background: rgba(128, 128, 128, 0.6);
        cursor: not-allowed;

        &:checked {
            background: rgba(60, 188, 109, 0.6);
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