//____________IMPORT/EXPORT____________
// Componentes de React externos
import styled from 'styled-components';
//____________IMPORT/EXPORT____________

export const Table = styled.table`
    border-collapse: separate;
    border-spacing: 0 15px;
    width: 100%;
`;
export const Thead = styled.thead.withConfig({
    shouldForwardProp: (prop) => prop !== 'ThemeMode',
})`
    background-color: ${({ ThemeMode }) => (ThemeMode ? 'rgb(58,93,174)' : 'rgb(82, 126, 231)')};
    box-shadow: 0 ${({ ThemeMode }) => (ThemeMode ?'8px 10px -4px rgba(0, 0, 0, 0.88)':'2px 14px 2px rgb(255, 255, 255)')};
`;
export const Th = styled.th`
    font-family: Century Gothic,Prompt;
    font-style: normal;
    font-size: 14px;
    text-align: center;
    padding: 10px;
    color: white;

    @media (max-width: 768px) {
        font-size: 12px; 
        padding: 6px;   
    }

    @media (max-width: 480px) {
        font-size: 10px;  
        padding: 4px;
    }
`;
export const Tbody = styled.tbody.withConfig({
    shouldForwardProp: (prop) => prop !== 'ThemeMode',
})`
    background-color: transparent;    
    box-shadow: 0 ${({ ThemeMode }) => (ThemeMode ?'8px 10px -4px rgba(0, 0, 0, 0.88)':'2px 14px 2px rgb(255, 255, 255)')};
`;
export const Td = styled.td.withConfig({
    shouldForwardProp: (prop) => prop !== 'ThemeMode',
})`
    font-family: Century Gothic,Prompt;
    font-style: normal;
    font-size: 12px;
    text-align: center;
    padding: 10px;
    color: ${({ ThemeMode }) => (ThemeMode ? 'black' : 'white')};

    @media (max-width: 768px) {
        font-size: 10px;    
        padding: 8px;
    }

    @media (max-width: 480px) {
        font-size: 8px; 
        padding: 6px; 
    }
`;