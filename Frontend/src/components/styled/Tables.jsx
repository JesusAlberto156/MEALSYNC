//____________IMPORT/EXPORT____________
// Componentes de React externos
import styled from 'styled-components';
//____________IMPORT/EXPORT____________

export const Container_Table = styled.div.withConfig({
    shouldForwardProp: (prop) => prop !== 'ThemeMode',
})`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    box-sizing: border-box;        
    background: transparent;
    width: 98%;
    height: auto;
    max-width: 98%; 
    padding: 6px;
    max-height: 50vh;
    overflow-x: auto;

    &::-webkit-scrollbar {
        width: 8px;          
        height: 8px;  
        background-color:rgb(255, 255, 255);
        border-radius: 20px;
        box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.41);
    }

    &::-webkit-scrollbar-thumb {
        background-color: ${({ ThemeMode }) => (ThemeMode ? 'rgb(58,93,174)' : 'rgb(82, 126, 231)')};
        border-radius: 30px;
        border: 1px solid rgb(255, 255, 255);
        cursor: pointer;
    }

    /* Scrollbar thumb hover */
    &::-webkit-scrollbar-thumb:hover {
        background-color: ${({ ThemeMode }) => (ThemeMode ? 'rgb(82, 126, 231)' : 'rgb(58,93,174)')};
    }

    @media (max-width: 1000px) {
        max-width: 950px;
    }

    @media (max-width: 950px) {
        max-width: 900px;
    }

    @media (max-width: 900px) {
        max-width: 850px;
    }

    @media (max-width: 850px) {
        max-width: 800px;
    }

    @media (max-width: 800px) {
        max-width: 750px;
    }

    @media (max-width: 750px) {
        max-width: 700px;
    }

    @media (max-width: 700px) {
        max-width: 650px;
    }
    
    @media (max-width: 650px) {
        max-width: 600px;
    }

    @media (max-width: 600px) {
        max-width: 550px;
    }

    @media (max-width: 550px) {
        max-width: 500px;
    }

    @media (max-width: 500px) {
        max-width: 450px;

        &::-webkit-scrollbar {
            width: 6px;          
            height: 6px;  
        }
    }

    @media (max-width: 450px) {
        max-width: 400px;
    }

    @media (max-width: 400px) {
        max-width: 350px;
    }

    @media (max-width: 350px) {
        max-width: 300px;
    }

    @media (max-width: 300px) {
        max-width: 250px;
    }
}
`;
export const Table = styled.table`
    border-collapse: separate;
    border-spacing: 0 15px;
    width: 100%;
    height: 100%;
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
    white-space: nowrap;

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
export const Tbody_White = styled.tbody.withConfig({
    shouldForwardProp: (prop) => prop !== 'ThemeMode',
})`
    background-color: ${({ ThemeMode }) => (ThemeMode ?'white':'black')};
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
export const TContainer_Center = styled.div`
    display: flex;
    justify-content: center;    
    align-items: center;
    gap: 10px;
    white-space: nowrap;
`;
export const TContainer_Icon = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    white-space: nowrap;
    width: 100%;
    padding-left: 20px;
    padding-right: 20px;
    box-sizing: border-box;
`;