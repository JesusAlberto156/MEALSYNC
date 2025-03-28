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
//--------MODAL--------
export const Icon_Warning_Modal = styled.div`
    position: relative;
    display: inline-block;
    cursor: pointer;
    color: #e74c3c; /* Rojo de advertencia */
    font-size: 20px;

    &:hover > div, &:focus > div {
        visibility: visible;
        opacity: 1;
        transform: translateY(0);
    }

    @media (max-width: 768px) {
        font-size: 15px;
    }

    @media (max-width: 480px) {
        font-size: 10px;
    }
`;
export const Icon_Tooltip_Modal = styled.div`
    visibility: hidden;
    opacity: 0;
    position: absolute;
    left: -1100%;
    top: -180%;
    transform: translateX(-50%) translateY(10px);
    background-color: #333;
    color: #fff;
    text-align: center;
    padding: 8px;
    border-radius: 5px;
    white-space: nowrap;
    z-index: 10;
    transition: opacity 0.3s, transform 0.3s;

    &::after {
        content: '';
        position: absolute;
        top: 50%;
        right: 100%;
        margin-top: -5px;
        border-width: 5px;
        border-style: solid;
        border-color: #333 transparent transparent transparent;
    }
    
    @media (max-width: 768px) {
        left: -1250%;
        top: -220%;
    }

    @media (max-width: 480px) {
        left: -1400%;
        top: -260%;
    }
`;
//--------MODAL--------