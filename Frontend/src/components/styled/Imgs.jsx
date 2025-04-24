//____________IMPORT/EXPORT____________
// Componentes de React externos
import styled from 'styled-components';
//__________IMAGE__________
import Logo_Horizontal_Hospital_Light from '../imgs/Logo-Horizontal-Hospital-Light.png'
import Logo_Horizontal_Hospital_Dark from '../imgs/Logo-Horizontal-Hospital-Light.png'
import Logo_Vertical_Hospital_Dark from '../imgs/Logo-Vertical-Hospital-Dark.png'
import Logo_Vertical_Hospital_Light from '../imgs/Logo-Vertical-Hospital-Light.png'
import Logo_Hospital_Dark from '../imgs/Logo-Hospital-Dark.png';
import Logo_Hospital_Light from '../imgs/Logo-Hospital-Light.png';
//__________IMAGE__________
// Estilos personalizados
import { Fade_Animation } from './Animations';
//____________IMPORT/EXPORT____________

//____________LOGO____________
//---------- HOSPITAL ----------
//-------- HORIZONTAL
export const Img_Logo_Horizontal_Hospital_400 = styled.div.withConfig({
    shouldForwardProp: (prop) => prop !== 'ThemeMode'
})`
    background-image: ${({ ThemeMode }) => (ThemeMode ? `url(${Logo_Horizontal_Hospital_Light})` : `url(${Logo_Horizontal_Hospital_Dark})`)};
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
    background-image: ${({ ThemeMode }) => (ThemeMode ? `url(${Logo_Vertical_Hospital_Light})` : `url(${Logo_Vertical_Hospital_Dark})`)};
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
    background-image: ${({ ThemeMode }) => (ThemeMode ? `url(${Logo_Hospital_Light})` : `url(${Logo_Hospital_Dark})`)};
    background-size: contain;
    background-repeat: no-repeat;
    width: 70px; 
    height: 70px;
    animation: ${Fade_Animation} 2s infinite;

    @media (max-width: 768px) {
        width: 60px; 
        height: 60px;
    }

    @media (max-width: 480px) {
        width: 50px; 
        height: 50px;
    }
`;
//-------- PURO LOGO
//---------- HOSPITAL ----------
//____________LOGO____________