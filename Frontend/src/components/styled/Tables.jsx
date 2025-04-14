//____________IMPORT/EXPORT____________
// Componentes de React externos
import styled from 'styled-components';
//____________IMPORT/EXPORT____________

export const Table = styled.table`
    border-collapse: collapse;
    width: 90%;
    margin-left: 20px;
    text-align: left;
    font-family: "Prompt", sans-serif;
    font-weight: 300;
    font-style: normal;
    margin-bottom: 0px;

    @media (max-width: 768px) {
        margin-left: 15px; 
    }

    @media (max-width: 480px) {
        margin-left: 10px;
    }
`;
export const Th = styled.th.withConfig({
    shouldForwardProp: (prop) => prop !== 'ThemeMode',
})`
    border: ${({ ThemeMode }) => (ThemeMode ? '2px solid black' : '2px solid white')};
    padding: 10px;
    text-align: center;
    background-color: ${({ ThemeMode }) => (ThemeMode ? 'rgb(20, 165, 76)' : 'rgb(60, 188, 109)')};
    color: ${({ ThemeMode }) => (ThemeMode ? 'black' : 'white')};
    text-align: center;

    @media (max-width: 768px) {
        font-size: 12px; 
        padding: 6px;   
    }

    @media (max-width: 480px) {
        font-size: 10px;  
        padding: 4px;
    }
`;
export const Td = styled.td.withConfig({
    shouldForwardProp: (prop) => prop !== 'ThemeMode',
})`
    border: ${({ ThemeMode }) => (ThemeMode ? '1px solid black' : '1px solid white')};
    padding: 10px;
    text-align: center;
    color: ${({ ThemeMode }) => (ThemeMode ? 'black' : 'white')};

    @media (max-width: 768px) {
        font-size: 12px;    
        padding: 6px;
    }

    @media (max-width: 480px) {
        font-size: 10px; 
        padding: 4px; 
    }
`;
export const Tr = styled.tr`
`;