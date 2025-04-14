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
import Logo_Error_Dark from '../imgs/Error-Dark.png'
import Logo_Error_Light from '../imgs/Error-Light.webp'
//__________IMAGE__________
// Estilos personalizados
import { Fade_Animation } from './Animations';
//____________IMPORT/EXPORT____________

//____________LOGO____________
export const Img_Logo_Horizontal_Hospital_450 = styled.div.withConfig({
    shouldForwardProp: (prop) => prop !== 'ThemeMode'
})`
    background-image: ${({ ThemeMode }) => (ThemeMode ? `url(${Logo_Horizontal_Hospital_Light})` : `url(${Logo_Horizontal_Hospital_Dark})`)};
    background-size: contain;
    background-repeat: no-repeat;
    width: 450px;
    height: 300px;
    margin: 0 auto;
    margin-bottom: 0px;
    flex-shrink: 0;
    
    @media (max-width: 768px) {
        width: 350px;
        height: 250px;    
    }

    @media (max-width: 480px) {
        width: 250px;
        height: 200px;    
    }
`;
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
export const Img_Logo_Verical_Hospital_200 = styled.div.withConfig({
    shouldForwardProp: (prop) => prop !== 'ThemeMode'
})`
    background-image: ${({ ThemeMode }) => (ThemeMode ? `url(${Logo_Vertical_Hospital_Light})` : `url(${Logo_Vertical_Hospital_Dark})`)};
    background-size: contain;
    background-repeat: no-repeat;
    width: 200px;
    height: 200px;
    flex-shrink: 0;
    
    @media (max-width: 768px) {
        width: 190px;
        height: 190px; 
    }

    @media (max-width: 480px) {
        width: 180px;
        height: 180px;  
    }
`;
export const Img_Logo_Verical_Hospital_160 = styled.div.withConfig({
    shouldForwardProp: (prop) => prop !== 'ThemeMode'
})`
    background-image: ${({ ThemeMode }) => (ThemeMode ? `url(${Logo_Vertical_Hospital_Light})` : `url(${Logo_Vertical_Hospital_Dark})`)};
    background-size: contain;
    background-repeat: no-repeat;
    width: 160px;
    height: 160px;
    flex-shrink: 0;
    
    @media (max-width: 768px) {
        width: 150px;
        height: 150px; 
    }

    @media (max-width: 480px) {
        width: 140px;
        height: 140px;  
    }
`;
export const Img_Logo_Hospital_140 = styled.div.withConfig({
    shouldForwardProp: (prop) => prop !== 'ThemeMode'
})`
    background-image: ${({ ThemeMode }) => (ThemeMode ? `url(${Logo_Hospital_Light})` : `url(${Logo_Hospital_Dark})`)};
    background-size: contain;
    background-repeat: no-repeat;
    width: 140px;
    height: 140px;
    margin-left: 20px;
    flex-shrink: 0;
    
    @media (max-width: 768px) {
        width: 130px;
        height: 130px; 
    }

    @media (max-width: 480px) {
        width: 120px;
        height: 120px;  
    }
`;
export const Img_Logo_Hospital_100 = styled.div.withConfig({
    shouldForwardProp: (prop) => prop !== 'ThemeMode'
})`
    background-image: ${({ ThemeMode }) => (ThemeMode ? `url(${Logo_Hospital_Light})` : `url(${Logo_Hospital_Dark})`)};
    background-size: contain;
    background-repeat: no-repeat;
    width: 100px;
    height: 100px;
    margin-left: 20px;
    flex-shrink: 0;
    
    @media (max-width: 768px) {
        width: 90px;
        height: 90px; 
    }

    @media (max-width: 480px) {
        width: 80px;
        height: 80px;  
    }
`;
export const Img_Logo_Hospital_60 = styled.div.withConfig({
    shouldForwardProp: (prop) => prop !== 'ThemeMode'
})`
    background-image: ${({ ThemeMode }) => (ThemeMode ? `url(${Logo_Hospital_Light})` : `url(${Logo_Hospital_Dark})`)};
    background-size: contain;
    background-repeat: no-repeat;
    width: 60px; 
    height: 60px;
    margin-left: 20px;
    animation: ${Fade_Animation} 2s infinite;

    @media (max-width: 768px) {
        width: 55px; 
        height: 55px;
        margin-left: 15px;
    }

    @media (max-width: 480px) {
        width: 50px; 
        height: 50px;
        margin-left: 10px;
    }
`;
export const Img_Logo_Error = styled.div.withConfig({
    shouldForwardProp: (prop) => prop !== 'ThemeMode'
})`
    background-image: ${({ ThemeMode }) => (ThemeMode ? `url(${Logo_Error_Light})` : `url(${Logo_Error_Dark})`)};
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
//____________LOGO____________