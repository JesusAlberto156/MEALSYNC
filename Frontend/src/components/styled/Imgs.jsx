import styled from 'styled-components';
import Logo_Hospital from '../imgs/Logo-Digital.png';
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