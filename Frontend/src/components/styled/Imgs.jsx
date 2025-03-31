import styled from 'styled-components';
import Logo_Vertical_Hospital_Dark from '../imgs/Logo-Vertical-Hospital-Dark.png'
import Logo_Vertical_Hospital_Light from '../imgs/Logo-Vertical-Hospital-Light.png'
import Logo_Hospital_Dark from '../imgs/Logo-Hospital-Dark.png';
import Logo_Hospital_Light from '../imgs/Logo-Hospital-Light.png';
import Logo_Error_Dark from '../imgs/Error-Dark.png'
import Logo_Error_Light from '../imgs/Error-Light.webp'
import { FadeAnimation } from './Animations';

//____________LOGO____________
export const Img_Logo_Verical_Hospital_Dark = styled.div`
    background-image: url(${Logo_Vertical_Hospital_Dark});
    background-size: contain;
    background-repeat: no-repeat;
    width: 250px;
    height: 250px;
    margin: 0 auto;
    margin-bottom: 0px;
    flex-shrink: 0;
    
    @media (max-width: 768px) {
        width: 200px;
        height: 200px;    
    }

    @media (max-width: 480px) {
        width: 150px;
        height: 150px;    
    }
`;
export const Img_Logo_Verical_Hospital_Light = styled.div`
    background-image: url(${Logo_Vertical_Hospital_Light});
    background-size: contain;
    background-repeat: no-repeat;
    width: 250px;
    height: 250px;
    margin: 0 auto;
    margin-bottom: 0px;
    flex-shrink: 0;
    
    @media (max-width: 768px) {
        width: 200px;
        height: 200px;    
    }

    @media (max-width: 480px) {
        width: 150px;
        height: 150px;    
    }
`;
export const Img_Logo_Error_Dark = styled.div`
    background-image: url(${Logo_Error_Dark});
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
export const Img_Logo_Error_Light = styled.div`
    background-image: url(${Logo_Error_Light});
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
export const Img_Logo_Hospital_Dark = styled.div`
    background-image: url(${Logo_Hospital_Dark});
    background-size: contain;
    background-repeat: no-repeat;
    width: 60px; 
    height: 60px;
    margin-left: 20px;
    animation: ${FadeAnimation} 2s infinite;

    @media (max-width: 768px) {
        width: 62px; 
        height: 62px;
        margin-left: 15px;
    }

    @media (max-width: 480px) {
        width: 65px; 
        height: 65px;
        margin-left: 10px;
    }
`;
export const Img_Logo_Hospital_Light = styled.div`
    background-image: url(${Logo_Hospital_Light});
    background-size: contain;
    background-repeat: no-repeat;
    width: 60px; 
    height: 60px;
    margin-left: 20px;
    animation: ${FadeAnimation} 2s infinite;

    @media (max-width: 768px) {
        width: 62px; 
        height: 62px;
        margin-left: 15px;
    }

    @media (max-width: 480px) {
        width: 65px; 
        height: 65px;
        margin-left: 10px;
    }
`;
//____________LOGO____________