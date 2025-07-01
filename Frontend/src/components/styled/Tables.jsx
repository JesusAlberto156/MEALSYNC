//____________IMPORT/EXPORT____________
// Componentes de React externos
import styled from 'styled-components';
//____________IMPORT/EXPORT____________

//__________CONTAINER____________
export const Table_Container_Auto = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    box-sizing: border-box;        
    background: transparent;
    width: 95vw;
    height: auto;
    max-width: 95vw; 
    padding: 6px;
    overflow-x: auto;

    &::-webkit-scrollbar {
        width: 8px;          
        height: 8px;  
        background-color:rgb(255, 255, 255);
        border-radius: 20px;
        box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.41);
    }

    &::-webkit-scrollbar-thumb {
        background-color: rgb(58,93,174);
        border-radius: 30px;
        border: 1px solid rgb(255, 255, 255);
        cursor: pointer;
    }

    &::-webkit-scrollbar-thumb:hover {
        background-color: rgb(82, 126, 231);
    }

    @media (max-width: 500px) {
        &::-webkit-scrollbar {
            width: 6px;          
            height: 6px;  
        }
    }
}
`;
export const Table_Container_Item_Center = styled.div`
    display: flex;
    justify-content: center;    
    align-items: center;
`;
export const Table_Container_Pagination = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    box-sizing: border-box;        
    background: white;
    width: auto;
    height: auto; 
    padding: 8px;
    padding-left: 20px;
    padding-right: 20px;
    border-radius: 50px;
    border: 4px solid black; 
    gap: 25px;

    @media (max-width: 768px) {
        border: 3px solid black; 
        border-radius: 30px;
        gap: 20px;
        padding: 6px;
        padding-left: 25px;
        padding-right: 25px;
    }

    @media (max-width: 600px) {
        flex-direction: column;
        justify-content: center;
        gap: 10px;
    }

    @media (max-width: 480px) {
        border: 2px solid black; 
        border-radius: 20px;
        gap: 5px;
        padding: 4px;
        padding-left: 20px;
        padding-right: 20px;
    }
}
`;
export const Table_Container_Data = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    box-sizing: border-box;        
    background: white;
    width: 95%;
    height: auto; 
    padding: 10px;
    padding-left: 20px;
    padding-right: 20px;
    border-bottom-left-radius: 30px;
    border-bottom-right-radius: 30px;
    border: 4px solid black; 
    border-top: 2px solid black;
    gap: 25px;

    @media (max-width: 768px) {
        border: 3px solid black; 
        border-top: 2px solid black;
        gap: 20px;
        padding: 8px;
        padding-left: 20px;
        padding-right: 20px;
    }

    @media (max-width: 480px) {
        border-top: 1px solid black;
        gap: 5px;
        width: 90%;
        padding: 6px;
        padding-left: 15px;
        padding-right: 15px;
    }
}
`;
//__________CONTAINER____________
//__________IMAGE__________
export const Table_Image_Black = styled.img`
    width: 50px; 
    height: 50px;
    border-radius: 50%;
    object-fit: cover;
    border: 3px solid black;
    background-color: white;
    display: flex;
    justify-content: center;
    align-items: center;

    @media (max-width: 768px) {
        width: 40px; 
        height: 40px;    
    }

    @media (max-width: 480px) {
        width: 30px; 
        height: 30px;
    }
`;
//__________IMAGE__________
//______________________
export const Table = styled.table`
    width: 100%;
    height: 100%;
    border-collapse: separate;
    border-spacing: 0;
`;
//______________________
//__________HEAND____________
export const Table_Head_Thead_Blue = styled.thead`
    background-color: rgb(58,93,174);
`;
export const Table_Head_Th = styled.th`
    text-align: center;
    padding: 10px;
    color: white;
    white-space: nowrap;
    border-top: 4px solid black;
    border-bottom: 3px solid black;

    &:first-child {
        border-top-left-radius: 30px;
        border-left: 4px solid black;
    }

    &:last-child {
        border-top-right-radius: 30px;
        border-right: 4px solid black;
    }

    @media (max-width: 768px) {
        font-size: 12px; 
        padding: 6px; 
        border-top: 3px solid black;
        border-bottom: 2px solid rgba(0, 0, 0, 0.3);

        &:first-child {
            border-left: 3px solid black;
        }

        &:last-child {
            border-right: 3px solid black;
        }  
    }

    @media (max-width: 480px) {
        font-size: 10px;  
        padding: 4px;
        border-top: 2px solid black;
        
        &:first-child {
            border-left: 2px solid black;
        }

        &:last-child {
            border-right: 2px solid black;
        }
    }
`;
//__________HEAND____________
//__________BODY____________
export const Table_Body_Tbody_White = styled.tbody`
    background-color: rgb(255, 255, 255);  

    tr {
        transition: transform 0.3s ease, box-shadow 0.3s ease;
    }
    tr:hover {
        transform: scale(1.05);
        box-shadow: 0 4px 8px rgba(0,0,0,0.15);
        z-index: 1;
    }
    td {
        border-bottom: 2px solid rgba(0, 0, 0, 0.3);
    }

    td:first-child {
        border-left: 4px solid black;
    }

    td:last-child {
        border-right: 4px solid black;
    }

    tr:last-child td:first-child {
        border-bottom-left-radius: 30px;
    }

    tr:last-child td:last-child {
        border-bottom-right-radius: 30px;
    }

    tr:last-child td {
        border-bottom: 4px solid black;
    }
    
    @media (max-width: 768px) {
        td:first-child {
            border-left: 3px solid black;
        }

        td:last-child {
            border-right: 3px solid black;
        }

        tr:last-child td {
            border-bottom: 3px solid black;
        }
    }

    @media (max-width: 480px) {
        td:first-child {
            border-left: 2px solid black;
        }

        td:last-child {
            border-right: 2px solid black;
        }

        tr:last-child td {
            border-bottom: 2px solid black;
        }

        td {
            border-bottom: 1px solid rgba(0, 0, 0, 0.3);
        }
    }
`;
export const Table_Body_Td = styled.td`
    font-family: Century Gothic,Prompt;
    font-style: normal;
    font-size: 12px;
    text-align: center;
    padding: 10px;
    color: black;
    white-space: nowrap;

    @media (max-width: 768px) {
        font-size: 10px;    
        padding: 8px;
    }

    @media (max-width: 480px) {
        font-size: 8px; 
        padding: 6px; 
    }
`;
//__________BODY____________

export const Tbody_White = styled.tbody.withConfig({
    shouldForwardProp: (prop) => prop !== 'ThemeMode',
})`
    background-color: ${({ ThemeMode }) => (ThemeMode ?'white':'black')};
    box-shadow: 0 ${({ ThemeMode }) => (ThemeMode ?'8px 10px -4px rgba(0, 0, 0, 0.88)':'2px 14px 2px rgb(255, 255, 255)')};
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

export const Container_Table = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    box-sizing: border-box;        
    background: transparent;
    width: 95%;
    height: auto;
    max-width: 95%; 
    padding: 6px;
    max-height: 60vh;
    overflow-x: auto;

    &::-webkit-scrollbar {
        width: 8px;          
        height: 8px;  
        background-color:rgb(255, 255, 255);
        border-radius: 20px;
        box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.41);
    }

    &::-webkit-scrollbar-thumb {
        background-color: rgb(58,93,174);
        border-radius: 30px;
        border: 1px solid rgb(255, 255, 255);
        cursor: pointer;
    }

    &::-webkit-scrollbar-thumb:hover {
        background-color: rgb(82, 126, 231);
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
export const Thead = styled.thead`
    background-color: rgb(58,93,174);
`;
export const Th = styled.th`
    font-family: Century Gothic,Prompt;
    font-style: normal;
    font-size: 14px;
    text-align: center;
    padding: 10px;
    color: white;
    white-space: nowrap;
    border-top: 4px solid black;
    border-bottom: 3px solid black;

    &:first-child {
        border-top-left-radius: 30px;
        border-left: 4px solid black;
    }

    &:last-child {
        border-top-right-radius: 30px;
        border-right: 4px solid black;
    }

    @media (max-width: 768px) {
        font-size: 12px; 
        padding: 6px; 
        border-top: 3px solid black;
        border-bottom: 2px solid rgba(0, 0, 0, 0.3);

        &:first-child {
            border-left: 3px solid black;
        }

        &:last-child {
            border-right: 3px solid black;
        }  
    }

    @media (max-width: 480px) {
        font-size: 10px;  
        padding: 4px;
        border-top: 2px solid black;
        
        &:first-child {
            border-left: 2px solid black;
        }

        &:last-child {
            border-right: 2px solid black;
        }
    }
`;
export const Tbody = styled.tbody`
    background-color: rgb(255, 255, 255);  

    tr {
        transition: transform 0.3s ease, box-shadow 0.3s ease;
    }
    tr:hover {
        transform: scale(1.05);
        box-shadow: 0 4px 8px rgba(0,0,0,0.15);
        z-index: 1;
    }
    td {
        border-bottom: 2px solid rgba(0, 0, 0, 0.3);
    }

    td:first-child {
        border-left: 4px solid black;
    }

    td:last-child {
        border-right: 4px solid black;
    }

    tr:last-child td:first-child {
        border-bottom-left-radius: 30px;
    }

    tr:last-child td:last-child {
        border-bottom-right-radius: 30px;
    }

    tr:last-child td {
        border-bottom: 4px solid black;
    }
    
    @media (max-width: 768px) {
        td:first-child {
            border-left: 3px solid black;
        }

        td:last-child {
            border-right: 3px solid black;
        }

        tr:last-child td {
            border-bottom: 3px solid black;
        }
    }

    @media (max-width: 480px) {
        td:first-child {
            border-left: 2px solid black;
        }

        td:last-child {
            border-right: 2px solid black;
        }

        tr:last-child td {
            border-bottom: 2px solid black;
        }

        td {
            border-bottom: 1px solid rgba(0, 0, 0, 0.3);
        }
    }
`;
export const Td = styled.td`
    font-family: Century Gothic,Prompt;
    font-style: normal;
    font-size: 12px;
    text-align: center;
    padding: 10px;
    color: black;
    white-space: nowrap;

    @media (max-width: 768px) {
        font-size: 10px;    
        padding: 8px;
    }

    @media (max-width: 480px) {
        font-size: 8px; 
        padding: 6px; 
    }
`;