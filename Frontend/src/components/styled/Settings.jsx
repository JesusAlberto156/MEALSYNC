import styled from 'styled-components';
import { Rotate } from './Animations';

//--------SETTINGS--------
export const Settings_Rotate = styled.div`
    width: 70px;
    height: 70px;
    display: flex; 
    justify-content: center;
    align-items: center;
    background-color: transparent;
    color:rgb(116, 118, 121);
    border: none;
    font-size: 70px;
    text-align: center;
    box-sizing: border-box;
    animation: ${Rotate} 1s linear infinite;
    transform-origin: center center;

    @media (max-width: 768px) {
        font-size: 60px;
    }

    @media (max-width: 480px) {
        font-size: 50px;
    }
`;
//--------SETTINGS--------