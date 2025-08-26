//____________IMPORT/EXPORT____________
// Componentes de React externos
import styled from 'styled-components';
//__________IMAGENES__________
import Logo_Hospital from '../imgs/Logo-Hospital.png'
//__________IMAGENES__________

import { Container_Modal_Image } from './Containers';
//____________IMPORT/EXPORT____________

//____________SIDEBAR____________
export const Image_Sidebar_White = styled.img`
    width: 120px; 
    height: 120px;
    border-radius: 50%;
    object-fit: cover;
    border: 5px solid black;
    background-color: black;
    display: flex;
    justify-content: center;
    align-items: center;

    @media (max-width: 768px) {
        width: 90px; 
        height: 90px;    
        border: 4px solid black;
    }

    @media (max-width: 480px) {
        width: 60px; 
        height: 60px;
        border: 3px solid black;
    }
`;
//____________SIDEBAR____________
//____________NAVBAR____________
export const Image_Navbar = styled.img`
    width: auto; 
    height: 80px;
    object-fit: cover;
    background-color: transparent;
    display: flex;
    justify-content: center;
    align-items: center;

    @media (max-width: 768px) {
        height: 70px;    
    }

    @media (max-width: 480px) {
        height: 60px;
    }
`;
//____________NAVBAR____________
//____________MODAL____________
const Image_Modal_Fixed = styled.img`
    width: auto; 
    height: 50%;
    margin-top: 5%;
    margin-left: 10%;
    object-fit: cover;
    background-color: transparent;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 2000;

    @media (max-width: 768px) {

    }

    @media (max-width: 480px) {

    }
`;
export function Image_Modal(){
    return(
        <Container_Modal_Image>
            <Image_Modal_Fixed src={Logo_Hospital}/>
        </Container_Modal_Image>
    )
}
export const Image_Modal_150 = styled.img`
    width: auto; 
    height: 150px;
    object-fit: cover;
    background-color: white;
    border: 2px solid black;
    border-right: 6px solid black;
    border-bottom: 6px solid black;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 0;

    @media (max-width: 768px) {
        height: 110px;
        border-right: 5px solid black;
        border-bottom: 5px solid black;
    }

    @media (max-width: 480px) {
        height: 70px;
        border: 1px solid black;
        border-right: 4px solid black;
        border-bottom: 4px solid black;
    }
`;
export const Image_Modal_100 = styled.img`
    width: auto; 
    height: 100px;
    object-fit: cover;
    background-color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 0;

    @media (max-width: 768px) {
        height: 80px;
    }

    @media (max-width: 480px) {
        height: 60px;
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
//____________MENU____________
export const Image_Menu_100 = styled.img`
    width: 100%; 
    height: auto;
    object-fit: cover;
    background-color: white;
    border: 2px solid black;
    border-right: 6px solid black;
    border-bottom: 6px solid black;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 2000;

    @media (max-width: 768px) {
        border-right: 5px solid black;
        border-bottom: 5px solid black;
    }

    @media (max-width: 480px) {
        border: 1px solid black;
        border-right: 4px solid black;
        border-bottom: 4px solid black;
    }
`;
//____________MENU____________