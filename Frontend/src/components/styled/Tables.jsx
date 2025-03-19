import styled from 'styled-components';

export const Table = styled.table`
    border-collapse: collapse;
    width: 90%;
    margin-top: 2%;
    text-align: left;
    font-family: Arial, sans-serif;
    margin-bottom: 0px;
`;

export const Th = styled.th`
    border: 1px solid #ddd;
    padding: 10px;
    text-align: center;
    background-color: rgb(20, 165, 76);
    color: white;
    text-align: center;

    @media (max-width: 768px) {
        font-size: 12px; 
        padding: 6px;   
    }

    @media (max-width: 480px) {
        font-size: 12px;  
        padding: 4px;
    }
`;

export const Td = styled.td`
    border: 1px solid #ddd;
    padding: 10px;
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

export const Tr = styled.tr`
    &:nth-child(even){
        background-color: #f2f2f2;
    }
    
    &:hover{
        background-color: #ddd;
    }
`;