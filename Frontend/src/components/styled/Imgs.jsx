//____________IMPORT/EXPORT____________
// Componentes de React externos
import styled from 'styled-components';
//__________IMAGE__________
//__________IMAGE__________
// Estilos personalizados
import { Fade_Animation } from './Animations';
//____________IMPORT/EXPORT____________

//____________SIDEBAR____________
export const Image_Sidebar_Black = styled.img`
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
export const Image_Navbar = styled.img`
    width: 80px; 
    height: 80px;
    object-fit: cover;
    background-color: transparent;
    display: flex;
    justify-content: center;
    align-items: center;
    animation: ${Fade_Animation} 2s infinite;

    @media (max-width: 768px) {
        width: 70px; 
        height: 70px;    
    }

    @media (max-width: 480px) {
        width: 60px; 
        height: 60px;
    }
`;
//____________NAVBAR____________
//____________LOGO____________
//---------- HOSPITAL ----------
//-------- HORIZONTAL
export const Img_Logo_Horizontal_Hospital_400 = styled.div.withConfig({
    shouldForwardProp: (prop) => prop !== 'ThemeMode'
})`
    background-size: contain;
    background-repeat: no-repeat;
    width: 400px;
    height: 172px;
    flex-shrink: 0;
    
    @media (max-width: 768px) {
        width: 300px;
        height: 130px;    
    }

    @media (max-width: 480px) {
        width: 200px;
        height: 88px;    
    }
`;
//-------- HORIZONTAL
//-------- VERTICAL
export const Img_Logo_Verical_Hospital_240 = styled.div.withConfig({
    shouldForwardProp: (prop) => prop !== 'ThemeMode'
})`
    background-size: contain;
    background-repeat: no-repeat;
    width: 240px;
    height: 240px;
    flex-shrink: 0;
    
    @media (max-width: 768px) {
        width: 230px;
        height: 230px; 
    }

    @media (max-width: 480px) {
        width: 220px;
        height: 220px;  
    }
`;
//-------- VERTICAL
//-------- PURO LOGO
export const Img_Logo_Hospital_70 = styled.div.withConfig({
    shouldForwardProp: (prop) => prop !== 'ThemeMode'
})`
    background-size: contain;
    background-repeat: no-repeat;
    width: 5%; 
    height: auto;
    animation: ${Fade_Animation} 2s infinite;

    @media (max-width: 768px) {
    }

    @media (max-width: 480px) {
       
    }
`;
//-------- PURO LOGO
//---------- HOSPITAL ----------
//____________LOGO____________