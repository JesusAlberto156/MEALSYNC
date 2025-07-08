//____________IMPORT/EXPORT____________
// Componentes de React externos
import styled from 'styled-components';
//__________IMAGE__________
//__________IMAGE__________
// Estilos personalizados
import { Fade_Animation } from './Animations';
//____________IMPORT/EXPORT____________

//____________SIDEBAR____________
export const Image_Sidebar_White = styled.img`
    width: 100px; 
    height: 100px;
    border-radius: 50%;
    object-fit: cover;
    border: 3px solid white;
    background-color: white;
    display: flex;
    justify-content: center;
    align-items: center;

    @media (max-width: 768px) {
        width: 90px; 
        height: 90px;    
    }

    @media (max-width: 480px) {
        width: 80px; 
        height: 80px;
    }
`;
//____________SIDEBAR____________
//____________NAVBAR____________
export const Image_Navbar_Fade = styled.img`
    width: auto; 
    height: 80px;
    object-fit: cover;
    background-color: transparent;
    display: flex;
    justify-content: center;
    align-items: center;
    animation: ${Fade_Animation} 2s infinite;

    @media (max-width: 768px) {
        height: 70px;    
    }

    @media (max-width: 480px) {
        height: 60px;
    }
`;
//____________NAVBAR____________
//____________MODAL____________
export const Image_Modal_Fixed = styled.img`
    position: fixed;
    top: 1%;
    left: 2%;
    width: auto; 
    height: 10%;
    object-fit: cover;
    background-color: transparent;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 2000;

    @media (max-width: 768px) {
        height: 9%;
    }

    @media (max-width: 480px) {
        height: 8%;
    }
`;
//____________MODAL____________
//____________LOGIN____________
export const Image_Login_Auto = styled.img`
    width: 250px; 
    height: auto;
    object-fit: cover;
    background-color: transparent;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 2000;

    @media (max-width: 768px) {
        width: 200px;
    }

    @media (max-width: 480px) {
        width: 150px;
    }
`;
//____________LOGIN____________