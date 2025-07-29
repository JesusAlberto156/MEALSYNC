//____________IMPORT/EXPORT____________
// Componentes de React externos
import styled from 'styled-components';
//____________IMPORT/EXPORT____________

//__________CONTAINER____________
export const Table_Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;      
    background: transparent;
    width: 98%;
    height: auto;
    padding-right: 20px;
    padding-left: 20px;
    padding-bottom: 20px;
    max-width: 98%;
    overflow-x: auto;
    overflow-y: auto;

    &::-webkit-scrollbar {
        width: 6px;          
        height: 6px;  
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

    @media (max-width: 768px) {
        padding-bottom: 15px;
        padding-left: 15px;
        padding-right: 15px;
    }

    @media (max-width: 480px) {
        padding-bottom: 10px;
        padding-left: 10px;
        padding-right: 10px;

        &::-webkit-scrollbar {
            width: 4px;          
            height: 4px;  
        }
    }
}
`;
export const Table_Container_Item_Center = styled.div`
    display: flex;
    justify-content: center;    
    align-items: center;
`;
export const Table_Container_Icon_Center = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    white-space: nowrap;
    width: 100%;
    padding-left: 30px;
    padding-right: 30px;
    box-sizing: border-box;

    @media (max-width: 768px) {
        padding-left: 25px;
        padding-right: 25px;   
    }

    @media (max-width: 480px) {
        padding-left: 20px;
        padding-right: 20px;
    }
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
    background: rgba(255, 255, 255, 0.9);
    width: 96%;
    height: auto; 
    padding: 8px;
    padding-left: 30px;
    padding-right: 30px;
    border-bottom-left-radius: 50px;
    border-bottom-right-radius: 50px;
    border: 3px solid black; 
    border-right: 8px solid black;
    border-bottom: 8px solid black;

    @media (max-width: 768px) {
        padding: 6px;
        padding-left: 25px;
        padding-right: 25px;
        border-bottom-left-radius: 30px;
        border-bottom-right-radius: 30px;
        border: 2px solid black; 
        border-right: 7px solid black;
        border-bottom: 7px solid black;
    }

    @media (max-width: 480px) {
        padding: 4px;
        padding-left: 20px;
        padding-right: 20px;
        border-bottom-left-radius: 20px;
        border-bottom-right-radius: 20px;
        border: 1px solid black; 
        border-right: 6px solid black;
        border-bottom: 6px solid black;
    }
}
`;
//__________CONTAINER____________
//__________IMAGE__________
export const Table_Image_Black = styled.img`
    width: 40px; 
    height: 40px;
    border-radius: 50%;
    object-fit: cover;
    border: 2px solid black;
    background-color: white;
    display: flex;
    justify-content: center;
    align-items: center;

    @media (max-width: 768px) {
        width: 35px; 
        height: 35px;    
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
    padding: 6px;
    color: white;
    white-space: nowrap;
    border-top: 3px solid black;
    border-bottom: 3px solid black;
    font-size: 12px; 
    font-family: Century Gothic,Prompt;
    font-weight: bold;

    &:first-child {
        border-top-left-radius: 50px;
        border-left: 3px solid black;
        padding-left: 30px;
    }

    &:last-child {
        border-top-right-radius: 50px;
        border-right: 8px solid black;
        padding-right: 30px;
    }

    @media (max-width: 768px) {
        font-size: 10px; 
        padding: 4px; 
        border-top: 2px solid black;
        border-bottom: 2px solid black;
    
        &:first-child {
            border-top-left-radius: 30px;
            border-left: 2px solid black;
            padding-left: 25px;
        }

        &:last-child {
            border-top-right-radius: 30px;
            border-right: 7px solid black;
            padding-right: 25px;
        }  
    }

    @media (max-width: 480px) {
        font-size: 8px; 
        padding: 2px; 
        border-top: 1px solid black;
        border-bottom: 1px solid black;
    
        &:first-child {
            border-top-left-radius: 20px;
            border-left: 1px solid black;
            padding-left: 20px;
        }

        &:last-child {
            border-top-right-radius: 20px;
            border-right: 6px solid black;
            padding-right: 20px;
        }  
    }
`;
//__________HEAND____________
//__________BODY____________
export const Table_Body_Tbody_White = styled.tbody`
    background-color: rgba(255, 255, 255, 0.90);  

    tr {
        transition: transform 1s ease, box-shadow 1s ease;
    }
    tr:hover {
        transform: scale(1.025);
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.6);
        z-index: 1;
    }
    td {
        border-bottom: 1px solid rgba(0, 0, 0, 0.6);
    }

    td:first-child {
        border-left: 3px solid black;
        padding-left: 30px;
    }

    td:last-child {
        border-right: 8px solid black;
        padding-right: 30px;
    }

    tr:last-child td:first-child {
        border-bottom-left-radius: 50px;
    }

    tr:last-child td:last-child {
        border-bottom-right-radius: 50px;
    }

    tr:last-child td {
        border-bottom: 8px solid black;
    }
    
    @media (max-width: 768px) {
        td:first-child {
            border-left: 2px solid black;
            padding-left: 25px;
        }

        td:last-child {
            border-right: 7px solid black;
            padding-right: 25px;
        }

        tr:last-child td {
            border-bottom: 7px solid black;
        }

        tr:last-child td:first-child {
            border-bottom-left-radius: 30px;
        }

        tr:last-child td:last-child {
            border-bottom-right-radius: 30px;
        }
    }

    @media (max-width: 480px) {
        td:first-child {
            border-left: 1px solid black;
            padding-left: 20px;
        }

        td:last-child {
            border-right: 6px solid black;
            padding-right: 20px;
        }

        tr:last-child td {
            border-bottom: 6px solid black;
        }

        tr:last-child td:first-child {
            border-bottom-left-radius: 20px;
        }

        tr:last-child td:last-child {
            border-bottom-right-radius: 20px;
        }
    }
`;
export const Table_Body_Td = styled.td`
    font-family: Century Gothic,Prompt;
    font-style: normal;
    font-size: 10px;
    text-align: center;
    padding: 8px;
    color: black;

    @media (max-width: 768px) {
        font-size: 8px;    
        padding: 6px;
    }

    @media (max-width: 480px) {
        font-size: 6px; 
        padding: 4px; 
    }
`;
//__________BODY____________


export const TContainer_Center = styled.div`
    display: flex;
    justify-content: center;    
    align-items: center;
    gap: 10px;
    white-space: nowrap;
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