import styled from 'styled-components';
import { Rotate } from './Animations';

//--------SPINNER--------
export const Spinner_Blue = styled.div`
    width: 40%;
    padding: 2px;
    margin-left: 30%;
    background-color: transparent;
    color: #0050d0;
    border: none;
    font-size: 19px;
    font-family:Arial, Helvetica, sans-serif;
    text-decoration: underline;
    text-align: center;
    cursor: pointer;
    box-sizing: border-box;
    animation: ${Rotate} 1s linear infinite;

    @media (max-width: 768px) {
        font-size: 17px;
    }

    @media (max-width: 480px) {
        font-size: 15px;
    }
`;
//--------SPINNER--------