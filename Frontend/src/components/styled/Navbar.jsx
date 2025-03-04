import styled, { keyframes } from 'styled-components';
import logo from '../imgs/Logo-Digital.png';

//--------ANIMATION--------
const fadeAnimation = keyframes`
  0% { opacity: 1; }
  50% { opacity: 0; }
  100% { opacity: 1; }
`;
//--------ANIMATION--------
export const Container = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;           
    background: transparent;
    width: 100%;
    height: 10%;  
    border-radius: 10px;       
    position: relative; 
    top: 3%;   
    left: 1%;

    @media (max-width: 768px) {
        height: 12%;
    }

    @media (max-width: 480px) {
        height: 14%;
        padding: 10px;
    }
`;
export const Background = styled.div`
    width: 100%;
    height: 95%;
    background: rgb(41,91,180);
    border-radius: 15px;
    display: flex;            
    justify-content: flex-start;
    align-items: center; 
    padding: 0 1px; 
    flex-wrap: nowrap;
    overflow-x: auto;
    white-space: nowrap;
    scrollbar-width: thin;
    scrollbar-color: rgba(255, 255, 255, 0.5) transparent;

     @media (max-width: 768px) {
        height: 85%;
    }

    @media (max-width: 480px) {
        height: 75%;
    }
`;
export const Logo = styled.div`
    background-image: url(${logo});
    background-size: contain;
    background-repeat: no-repeat;
    width: 7%; 
    height: 100%;
    margin-left: 2%;
    animation: ${fadeAnimation} 2s infinite;

    @media (max-width: 768px) {
        width: 25%;
    }

    @media (max-width: 480px) {
        width: 40%;
    }
`;
export const Button_Aqua = styled.button`
    width: 100px;
    padding: 5px;
    margin-left: 5px;
    background-color: transparent;
    color: white;
    border: 2px solid white;
    border-radius: 10px;
    font-size: 25px;
    text-align: center;
    cursor: pointer;
    transition: background-color 0.3s, transform 0.3s;
    box-sizing: border-box;
    
    &:hover {
        background-color:rgb(19, 161, 138);
        transform: translateY(-2px);
        transform: scale(1.1);
    }

    @media (max-width: 768px) {
        width: 80px;
        font-size: 20px;
        background-color:rgb(19, 161, 138);

        &:hover {
            transform: translateY(-2px);
            transform: scale(1.2);
            background-color:rgb(19, 133, 161);
        }
    }

    @media (max-width: 480px) {
        width: 60px;
        font-size: 18px;
        background-color:rgb(19, 161, 138);

        &:hover {
            transform: translateY(-2px);
            transform: scale(1.2);
            background-color:rgb(19, 133, 161);
        }
    }
`;