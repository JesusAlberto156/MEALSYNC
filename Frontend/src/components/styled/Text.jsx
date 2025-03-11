import styled from 'styled-components';
import { fadeAnimation } from './Animations';

//--------LOGIN--------
export const Title_Fade_Login = styled.div`
    color: black;
    font-size: 1.2rem;
    font-family:Arial, Helvetica, sans-serif;
    margin-bottom: 25px;
    font-weight: bold;
    animation: ${fadeAnimation} 2s infinite;

    @media (max-width: 768px) {
        font-size: 1.1rem;
        margin-bottom: 20px;
    }

    @media (max-width: 480px) {
        font-size: 1rem;
        margin-bottom: 15px;
    }
`;
//--------LOGIN--------
//--------SIDEBAR--------
export const Title_Sidebar = styled.div`
    color: white;
    padding-top: 10px;
    text-align: center;
    font-size: 1.2rem;
    font-family:Arial, Helvetica, sans-serif;
    margin-bottom: 10px;
    font-weight: bold;

    @media (max-width: 768px) {
        font-size: 1.1rem;
        margin-bottom: 20px;
    }

    @media (max-width: 480px) {
        font-size: 1rem;
        margin-bottom: 15px;
    }
`;
//--------SIDEBAR--------
//--------MODAL--------
export const Title_Modal = styled.h1`
    text-align: center;
    position: relative;
    margin-top: 1px;
    font-size: 30px;

    @media (max-width: 768px) {
        font-size: 25px;
    }

    @media (max-width: 480px) {
        font-size: 20px;
    }
`;
export const Text_Modal = styled.p`
    font-size: 22px;

    @media (max-width: 768px) {
        font-size: 18px;
    }

    @media (max-width: 480px) {
        font-size: 14px;
    }
`;
//--------MODAL--------
//--------FOOTER--------
export const Text_Footer = styled.p`
    font-Size: 1.1rem; 
    font-family:Arial, Helvetica, sans-serif;
    transition: transform 0.3s ease;
    margin-top: 30px;

    @media (max-width: 768px) {
        margin-top: 15px;
        font-size: 1rem;
    }

    @media (max-width: 480px) {
        margin-top: 10px;
        font-size: 0.9rem;
    }
`;
//--------FOOTER--------