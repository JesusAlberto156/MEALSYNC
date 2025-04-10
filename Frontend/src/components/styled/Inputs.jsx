//____________IMPORT/EXPORT____________
// Componentes de React externos
import styled from 'styled-components';
//__________ICONOS__________

//__________ICONOS__________
//__________IMAGE__________

//__________IMAGE__________
// Estilos personalizados

//____________IMPORT/EXPORT____________

//____________GROUP____________
export const Input_Group_80 = styled.div`
    position: relative;
    height: 80px;
    line-height: 50px;
    outline: none;

    @media (max-width: 768px) {
        
    }
    
    @media (max-width: 480px) {
        
    }
`;
//____________GROUP____________
//____________TEXT____________
export const Input_Text_260 = styled.input.withConfig({
    shouldForwardProp: (prop) => prop !== 'ThemeMode',
})`
    width: 260px;
    height: 15px;
    color: ${({ ThemeMode }) => (ThemeMode ? 'black' : 'white')};
    font-size: 20px;
    border-radius: 8px;
    border: none;
    border-bottom: ${({ ThemeMode }) => (ThemeMode ? '2px solid black' : '2px solid white')};
    background: transparent;
    transition: 0.1s ease;
    outline: none;
    padding-top: 10px;
    cursor: text;
    padding-bottom: 8px;
    padding-left: 14px;

    @media (max-width: 768px) {
        font-size: 18px;
        width: 230px;
        border-radius: 6px;
        padding-left: 8px;
    }
    
    @media (max-width: 480px) {
        font-size: 16px;
        width: 200px;
        border-radius: 4px;
        padding-left: 6px;
    }

    &:focus {
        color: ${({ ThemeMode }) => (ThemeMode ? 'rgb(58,93,174)' : 'rgb(82, 126, 231)')};
        border-color: ${({ ThemeMode }) => (ThemeMode ? 'rgb(58,93,174)' : 'rgb(82, 126, 231)')};
        box-shadow: 0 0 8px ${({ ThemeMode }) => (ThemeMode ? 'rgba(60, 124, 167, 0.3)' : 'rgba(213, 220, 224, 0.3)')};
    }
`;
export const Input_Text_220 = styled.input.withConfig({
    shouldForwardProp: (prop) => prop !== 'ThemeMode',
})`
    width: 220px;
    height: 15px;
    color: ${({ ThemeMode }) => (ThemeMode ? 'black' : 'white')};
    font-size: 20px;
    border-radius: 8px;
    border: none;
    border-bottom: ${({ ThemeMode }) => (ThemeMode ? '2px solid black' : '2px solid white')};
    background: transparent;
    transition: 0.1s ease;
    outline: none;
    padding-top: 30px;
    cursor: text;
    padding-bottom: 8px;
    padding-left: 14px;

    @media (max-width: 768px) {
        font-size: 18px;
        width: 190px;
        border-radius: 6px;
        padding-left: 8px;
    }
    
    @media (max-width: 480px) {
        font-size: 16px;
        width: 160px;
        border-radius: 4px;
        padding-left: 6px;
    }

    &:focus {
        color: ${({ ThemeMode }) => (ThemeMode ? 'rgb(58,93,174)' : 'rgb(82, 126, 231)')};
        border-color: ${({ ThemeMode }) => (ThemeMode ? 'rgb(58,93,174)' : 'rgb(82, 126, 231)')};
        box-shadow: 0 0 8px ${({ ThemeMode }) => (ThemeMode ? 'rgba(60, 124, 167, 0.3)' : 'rgba(213, 220, 224, 0.3)')};
    }
`;
//____________TEXT____________
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
//____________SEARCH____________
export const Input_Search = styled.input`
    padding: 10px;
    font-size: 18px;
    border: none;
    background: transparent;
    border-bottom: 2px solid white;
    color: white;
    border-radius: 6px;
    width: 250px;
    margin-right: auto;

    &::placeholder {
        color: white; 
    }

    @media (max-width: 768px) {
        font-size: 14px;
        width: 175px;
    }

    @media (max-width: 480px) {
        font-size: 10px;
        width: 100px;
    }
`;
//____________SEARCH____________