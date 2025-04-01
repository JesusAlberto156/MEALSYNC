import styled from 'styled-components';

//____________GROUP____________
export const Input_Group_80 = styled.div`
    position: relative;
    height: 80px;
    line-height: 50px;
    outline: none;

    @media (max-width: 768px) {
        
    }
    
    @media (max-width: 480px) {
        
    }
`;
//____________GROUP____________
//____________TEXT____________
export const Input_Text_280_Dark = styled.input`
    width: 280px;
    height: 15px;
    color: white;
    font-size: 20px;
    border-radius: 10px;
    border: none;
    border-bottom: 2px solid white;
    background: transparent;
    transition: 0.1s ease;
    outline: none;
    padding-top: 30px;
    cursor: text;
    padding-bottom: 8px;
    padding-left: 14px;

    @media (max-width: 768px) {
        font-size: 18px;
        width: 250px;
        border-radius: 12px;
        padding-left: 8px;
    }
    
    @media (max-width: 480px) {
        font-size: 16px;
        width: 220px;
        border-radius: 9px;
        padding-left: 6px;
    }

    &:focus {
        color:rgb(82, 126, 231);
        border-color: rgb(82, 126, 231);
        box-shadow: 0 0 8px rgba(60, 124, 167, 0.3);
    }
`;
export const Input_Text_280_Light = styled.input`
    width: 280px;
    height: 15px;
    color: black;
    font-size: 20px;
    border-radius: 10px;
    border: none;
    border-bottom: 2px solid black;
    background: transparent;
    transition: 0.1s ease;
    outline: none;
    padding-top: 30px;
    cursor: text;
    padding-bottom: 8px;
    padding-left: 14px;

    @media (max-width: 768px) {
        font-size: 18px;
        width: 250px;
        border-radius: 12px;
        padding-left: 8px;
    }
    
    @media (max-width: 480px) {
        font-size: 16px;
        width: 220px;
        border-radius: 9px;
        padding-left: 6px;
    }

    &:focus {
        color: rgb(58,93,174);
        border-color: rgb(58,93,174);
        box-shadow: 0 0 8px rgba(60, 124, 167, 0.3);
    }
`;
//____________TEXT____________
//____________RADIO____________
export const Input_Radio_16_Dark = styled.input`
    width: 16px;
    height: 16px;
    cursor: pointer;
    transition: all 0.2s ease;

    &:checked {
        accent-color: rgb(60, 188, 109);
    }

    @media (max-width: 768px) {
        width: 14px;
        height: 14px;
    }

    @media (max-width: 480px) {
        width: 12px;
        height: 12px;
    }
`;
export const Input_Radio_16_Light = styled.input`
    width: 16px;
    height: 16px;
    cursor: pointer;
    transition: all 0.2s ease;

    &:checked {
        accent-color: rgb(20, 165, 76);
    }

    @media (max-width: 768px) {
        width: 14px;
        height: 14px;
    }

    @media (max-width: 480px) {
        width: 12px;
        height: 12px;
    }
`;
//____________RADIO____________
//____________CHECK____________

//____________CHECK____________
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
export const Input_Checkbox_Modal = styled.input`
    width: 15px;
    height: 15px;
    cursor: pointer;
    transition: all 0.2s ease;
    
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