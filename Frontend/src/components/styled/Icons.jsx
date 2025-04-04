import styled from 'styled-components';
import { Rotate } from './Animations';

//____________SEARCH____________
export const Icon_Search = styled.div`
    font-size: 25px;
    margin-left: 10px;

    @media (max-width: 768px) {
        font-size: 20px;
        margin-left: 8px;
    }

    @media (max-width: 480px) {
        font-size: 15px;
        margin-left: 6px;
    }
`;
//____________SEARCH____________
//____________TABLE____________
export const Icon_Table_Green = styled.div.withConfig({
    shouldForwardProp: (prop) => prop !== 'ThemeMode',
})`
    font-size: 16px;
    color: ${({ ThemeMode }) => (ThemeMode ? 'rgb(20, 165, 76)' : 'rgb(60, 188, 109)')};

    @media (max-width: 768px) {
        font-size: 14px;
    }

    @media (max-width: 480px) {
        font-size: 12px;
    }
`;
export const Icon_Table_Red = styled.div.withConfig({
    shouldForwardProp: (prop) => prop !== 'ThemeMode',
})`
    font-size: 16px;
    color: ${({ ThemeMode }) => (ThemeMode ? 'rgb(155, 9, 9)' : 'rgb(208, 31, 31)')};

    @media (max-width: 768px) {
        font-size: 14px;
    }

    @media (max-width: 480px) {
        font-size: 12px;
    }
`;
//____________IMAGE____________
export const Icon_Image_Profile_Dark = styled.img`
    width: 80px; 
    height: 80px;
    border-radius: 50%;
    object-fit: contain;
    border: 4px solid white;
    background-color: transparent;

    @media (max-width: 768px) {
        width: 70px; 
        height: 70px;
    }

    @media (max-width: 480px) {
        width: 60px; 
        height: 60px;
    }
`;
export const Icon_Image_Profile_Light = styled.img`
    width: 80px; 
    height: 80px;
    border-radius: 50%;
    object-fit: contain;
    border: 4px solid black;
    background-color: transparent;

    @media (max-width: 768px) {
        width: 70px; 
        height: 70px;
    }

    @media (max-width: 480px) {
        width: 60px; 
        height: 60px;
    }
`;
//____________IMAGE____________
//____________ICON____________
export const Icon_Settings_50_Dark = styled.div`
    width: 50px;
    height: 50px;
    background-color: transparent;
    color:rgb(164, 166, 168);
    border: none;
    font-size: 50px;
    text-align: center;
    box-sizing: border-box;
    animation: ${Rotate} 1s linear infinite;
    transform-origin: center center;

    @media (max-width: 768px) {
        font-size: 40px;
        width: 40px;
        height: 40px;
    }

    @media (max-width: 480px) {
        font-size: 30px;
        width: 30px;
        height: 30px;
    }
`;
export const Icon_Settings_50_Light = styled.div`
    width: 50px;
    height: 50px;
    background-color: transparent;
    color:rgb(92, 93, 94);
    border: none;
    font-size: 50px;
    text-align: center;
    box-sizing: border-box;
    animation: ${Rotate} 1s linear infinite;
    transform-origin: center center;

    @media (max-width: 768px) {
        font-size: 40px;
        width: 40px;
        height: 40px;
    }

    @media (max-width: 480px) {
        font-size: 30px;
        width: 30px;
        height: 30px;
    }
`;
export const Icon_Warning_250_Dark = styled.div`
    border: none;
    background-color: transparent;
    font-size: 250px; 
    color: rgb(194, 161, 15);
    position: fixed;
    top: 80px;
    right: 30px;

    @media (max-width: 768px) {
        font-size: 200px;
        right: 15px;
    }

    @media (max-width: 480px) {
        font-size: 150px;
        top: 85px;
        right: 10px;
    }
`;
export const Icon_Warning_250_Light = styled.div`
    border: none;
    background-color: transparent;
    font-size: 250px; 
    color: rgb(235, 197, 24);
    position: fixed;
    top: 80px;
    right: 30px;

    @media (max-width: 768px) {
        font-size: 200px;
        right: 15px;
    }

    @media (max-width: 480px) {
        font-size: 150px;
        top: 85px;
        right: 10px;
    }
`;
//____________ICON____________
//--------SEARCH-BAR MENU--------
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