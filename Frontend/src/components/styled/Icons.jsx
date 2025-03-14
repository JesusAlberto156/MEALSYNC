import styled from 'styled-components';

//--------SEARCH-BAR MENU--------
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
export const Icon_Shopping_Cart_Menu = styled.button`
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
//--------ERROR--------
export const Icon_Warning_Error = styled.div`
    border: none;
    background-color: transparent;
    font-size: 250px; 
    color: rgb(228, 205, 102);
    position: fixed;
    top: 100px;
    right: 40px;

    @media (max-width: 768px) {
        font-size: 200px;
        top: 85px;
        right: 25px;
    }

    @media (max-width: 480px) {
        font-size: 150px;
        top: 85px;
        right: 25px;
    }
`;
//--------ERROR--------