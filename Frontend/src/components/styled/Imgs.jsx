import styled from 'styled-components';
import Logo_Hospital from '../imgs/Logo-Digital.png';
import Logo_People_Error from '../imgs/Error.webp'
import { fadeAnimation } from './Animations';

//--------NAVBAR--------
export const Logo_Navbar = styled.div`
    background-image: url(${Logo_Hospital});
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
//--------NAVBAR--------
//--------NAVBAR--------
export const Logo_Error = styled.div`
    background-image: url(${Logo_People_Error});
    background-size: contain;
    background-repeat: no-repeat;
    width: 30%; 
    height: 30%;
    position: fixed;
    top: 65%;
    left: 10%;

    @media (max-width: 768px) {
        width: 40%; 
        height: 40%;
        top: 68%;
        left: 8%;
    }

    @media (max-width: 480px) {
        width: 50%; 
        height: 50%;
        top: 75%;
        left: 5%;
    }
`;
//--------NAVBAR--------