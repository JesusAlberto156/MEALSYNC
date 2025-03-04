import styled from 'styled-components';
//--------SEARCH-BAR MENU--------
export const Search_Bar_Menu = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;           
    background: transparent;
    width: 100%;
    height: 4%;  
    border-radius: 10px;       
    position: relative; 
    top: 4%;   
    left: 1%;
    display: flex;            
    justify-content: flex-start;

    @media (max-width: 768px) {
        height: 8%;
    }

    @media (max-width: 480px) {
        height: 10%;
    }
`;
export const Icon_Search_Menu = styled.div`
    font-size: 20px;
    margin-left: 8%;

    @media (max-width: 768px) {
        margin-left: 18%;
    }

    @media (max-width: 480px) {
        margin-left: 10%;
    }
`;
export const Search_Menu = styled.input`
    padding: 10px;
    font-size: 18px;
    border: none;
    background: transparent;
    border-bottom: 2px solid #000;
    border-radius: 6px;
    width: 250px;

    @media (max-width: 480px) {
        width: 200px;
    }
`;
export const Shopping_Cart = styled.button`
    border: none;
    background-color: transparent;
    font-size: 30px; 
    cursor: pointer;
    margin-left: 55%;

    @media (max-width: 768px) {
        margin-left: 20%;   
    }

    @media (max-width: 480px) {
        margin-left: 10%;
    }
`;
//--------SEARCH-BAR MENU--------