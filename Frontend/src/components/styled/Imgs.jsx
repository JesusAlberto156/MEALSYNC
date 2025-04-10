//____________IMPORT/EXPORT____________
// Componentes de React externos
import styled from 'styled-components';
//__________ICONOS__________

//__________ICONOS__________
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
export const Img_Logo_Verical_Hospital_250 = styled.div.withConfig({
    shouldForwardProp: (prop) => prop !== 'ThemeMode'
})`
    background-image: ${({ ThemeMode }) => (ThemeMode ? `url(${Logo_Vertical_Hospital_Light})` : `url(${Logo_Vertical_Hospital_Dark})`)};
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
export const Img_Logo_Hospital_150 = styled.div.withConfig({
    shouldForwardProp: (prop) => prop !== 'ThemeMode'
})`
    background-image: ${({ ThemeMode }) => (ThemeMode ? `url(${Logo_Hospital_Light})` : `url(${Logo_Hospital_Dark})`)};
    background-size: contain;
    background-repeat: no-repeat;
    width: 150px;
    height: 150px;
    padding: 10px;
    margin-left: 20px;
    margin-bottom: 20px;
    flex-shrink: 0;
    
    @media (max-width: 768px) {
        width: 120px;
        height: 120px;  
        padding: 8px;
        margin-left: 15px;
        margin-bottom: 15px;
    }

    @media (max-width: 480px) {
        width: 90px;
        height: 90px;  
        padding: 6px;
        margin-left: 10px;
        margin-bottom: 10px;
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