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
    border-bottom: 3px solid black;
    background:rgb(230, 230, 230);
    transition: 0.2s ease;
    outline: none;
    cursor: text;

    &::placeholder {
        color: black;
    }

    &:disabled {
        cursor: not-allowed;
        opacity: 0.8;
        background: rgb(221, 223, 226);
    }

    @media (max-width: 768px) {
        font-size: 14px;
        border-radius: 30px;
        padding: 8px;
    }
    
    @media (max-width: 480px) {
        font-size: 12px;
        border-radius: 20px;
        padding: 6px;
    }

    &:focus {
        color: rgb(58,93,174);
        border-color: rgb(58,93,174);
        box-shadow: 0 0 8px rgb(0, 0, 0);

        &::placeholder {
            color: rgb(58,93,174);
        }
    }
`;
//-------- Negro

//-------- Black
export const Input_Text_Black_100 = styled.input.withConfig({
    shouldForwardProp: (prop) => prop !== 'ThemeMode',
})`
    width: 100%;
    height: auto;
    font-family: Century Gothic, Prompt;
    color: black' : 'white')};
    font-size: 16px;
    padding: 10px;
    border: 1px solid black;
    border-radius: 50px;
    border-bottom: 3px solid black;
    background:rgb(230, 230, 230);
    transition: 0.2s ease;
    outline: none;
    cursor: text;

    &::placeholder {
        color: black;
    }

    &:disabled {
        cursor: not-allowed;
        opacity: 0.8;
        background: ${({ ThemeMode }) => (ThemeMode ? 'rgb(221, 223, 226)' : 'rgb(85, 85, 85)')};
    }

    @media (max-width: 768px) {
        font-size: 14px;
        border-radius: 30px;
        padding: 8px;
    }
    
    @media (max-width: 480px) {
        font-size: 12px;
        border-radius: 20px;
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
export const Input_Text_Black_50 = styled.input.withConfig({
    shouldForwardProp: (prop) => prop !== 'ThemeMode',
})`
    width: 50%;
    height: auto;
    font-family: 'Century Gothic', Prompt, sans-serif;
    color: ${({ ThemeMode }) => (ThemeMode ? 'rgb(0, 0, 0)' : 'rgb(255, 255, 255)')};
    font-size: 16px;
    padding: 8px;
    border: none;
    border-radius: 10px;
    border-bottom: ${({ ThemeMode }) => (ThemeMode ? '2px solid black' : '2px solid white')};
    background: transparent;
    transition: 0.1s ease;
    outline: none;
    cursor: text;

    &::placeholder {
        ${({ ThemeMode }) => (ThemeMode ? 'white' : 'black')}; 
    }

    &:disabled {
        opacity: 0.8;
        cursor: not-allowed;
        border-bottom: ${({ ThemeMode }) => (ThemeMode ? '2px dashed gray' : '2px dashed lightgray')};
    }
        
    @media (max-width: 768px) {
        font-size: 14px;
        padding: 6px;
    }
    
    @media (max-width: 480px) {
        font-size: 12px;
        padding: 4px;
    }

    &:focus {
        box-shadow: 0 0 8px ${({ ThemeMode }) => (ThemeMode ? 'rgb(0, 0, 0)' : 'rgb(255, 255, 255)')};
    }
`;
//-------- Black
//-------- White
export const Input_Text_White_50 = styled.input`
    width: 50%;
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
        font-size: 14px;
        padding: 6px;
    }
    
    @media (max-width: 480px) {
        font-size: 12px;
        padding: 4px;
    }

    &:focus {
        box-shadow: 0 0 8px rgb(255, 255, 255);
    }
`;
//-------- White
//____________TEXT____________
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
export const Input_Radio_16 = styled.input.withConfig({
    shouldForwardProp: (prop) => prop !== 'ThemeMode',
})`
    width: 16px;
    height: 16px;
    cursor: pointer;
    transition: all 0.2s ease;

    &:checked {
        accent-color: ${({ ThemeMode }) => (ThemeMode ? 'rgb(20, 165, 76)' : 'rgb(60, 188, 109)')};
    }

    &:disabled {
        cursor: not-allowed;
        opacity: 0.8;
        accent-color: ${({ ThemeMode }) => (ThemeMode ? 'rgb(60, 188, 109)' : 'rgb(20, 165, 76)')};
    }

    @media (max-width: 768px) {
        width: 14px;
        height: 14px;
    }

    @media (max-width: 480px) {
        width: 12px;
        height: 12px;
    }
`;
//____________RADIO____________
//____________CHECK____________
export const Input_Checkbox_16 = styled.input.withConfig({
    shouldForwardProp: (prop) => prop !== 'ThemeMode',
})`
    width: 16px;
    height: 16px;
    cursor: pointer;
    transition: all 0.2s ease;
    
    &:checked {
        accent-color: ${({ ThemeMode }) => (ThemeMode ? 'rgb(20, 165, 76)' : 'rgb(60, 188, 109)')};
    }

    &:disabled {
        cursor: not-allowed;
        opacity: 0.8;
        accent-color: ${({ ThemeMode }) => (ThemeMode ? 'rgb(60, 188, 109)' : 'rgb(20, 165, 76)')};
    }

    @media (max-width: 768px) {
        width: 14px;
        height: 14px;
    }

    @media (max-width: 480px) {
        width: 12px;
        height: 12px;
    }
`;
//____________CHECK____________
//____________AREA____________
//-------- Black
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
//-------- Black
//____________AREA____________
//____________GROUP____________
export const Input_Group = styled.div`
    position: relative;
    width: 100%;
`;
//____________GROUP____________