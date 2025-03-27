import styled from 'styled-components';

//--------LOGIN--------
export const Input_Group_Login = styled.div`
    position: relative;
    height: 80px;
    line-height: 40px;
    outline: none;

    @media (max-width: 768px) {
        height: 70px;
    }
    
    @media (max-width: 480px) {
        height: 60px;
    }
`;
export const Input_Login = styled.input`
    position: relative;
    z-index: 1;
    width: 100%;
    height: 20%;
    color: black;
    font-size: 1.3rem;
    border-radius: 10px;
    border: none;
    border-bottom: 2px solid white;
    background: transparent;
    transition: 0.1s ease;
    outline: none;
    padding-top: 30px;
    cursor: text;
    padding-bottom: 8px;
    padding-left: 5px;

    @media (max-width: 768px) {
        font-size: 1.2rem;
    }
    
    @media (max-width: 480px) {
        font-size: 1.1rem;
    }

    &:focus {
        border-bottom: 2px solid aqua;
        border-color: rgb(45, 93, 182);
        color: rgb(22, 139, 6);
        box-shadow: 0 0 8px rgba(60, 124, 167, 0.3);
    }
`;
//--------LOGIN--------
//--------SEARCH-BAR MENU--------
export const Input_Search_Bar_Menu = styled.input`
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
//--------SEARCH-BAR MENU--------
//--------MODAL---------
export const Input_Radio_Modal = styled.input`
    width: 18px;
    height: 18px;
    cursor: pointer;
    transition: all 0.2s ease;

    &:checked {
        accent-color: rgb(20, 165, 76);
    }

    @media (max-width: 768px) {
        width: 15px;
        height: 15px;
    }

    @media (max-width: 480px) {
        width: 13px;
        height: 13px;
    }
`;
export const Input_Checkbox_Modal = styled.input`
    width: 15px;
    height: 15px;
    cursor: pointer;

    &:checked {
        accent-color: rgb(20, 165, 76);
    }

    @media (max-width: 768px) {
        width: 14px;
        height: 14px;
    }

    @media (max-width: 480px) {
        width: 13px;
        height: 13px;
    }
`;
//--------MODAL---------