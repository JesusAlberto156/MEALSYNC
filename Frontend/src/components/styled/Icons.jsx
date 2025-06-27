//____________IMPORT/EXPORT____________
// Componentes de React externos
import styled from 'styled-components';
// Estilos personalizados
import { Rotate_Animation } from './Animations';
//____________IMPORT/EXPORT____________

//____________IMAGE____________
//---------- Black/White
export const Icon_Image_Black_90 = styled.img.withConfig({
    shouldForwardProp: (prop) => prop !== 'ThemeMode',
})`
    width: 90px; 
    height: 90px;
    border-radius: 50%;
    object-fit: cover;
    border: ${({ ThemeMode }) => (ThemeMode ? '4px solid black' : '4px solid white')};
    background-color: ${({ ThemeMode }) => (ThemeMode ? 'white' : 'black')};;
    display: flex;
    justify-content: center;
    align-items: center;

    @media (max-width: 768px) {
        width: 80px; 
        height: 80px;
    }

    @media (max-width: 480px) {
        width: 70px; 
        height: 70px;
    }
`;
export const Icon_Image_Black_60 = styled.img.withConfig({
    shouldForwardProp: (prop) => prop !== 'ThemeMode',
})`
    width: 60px; 
    height: 60px;
    border-radius: 50%;
    object-fit: cover;
    border: ${({ ThemeMode }) => (ThemeMode ? '3px solid black' : '3px solid white')};
    background-color: ${({ ThemeMode }) => (ThemeMode ? 'white' : 'black')};;
    display: flex;
    justify-content: center;
    align-items: center;

    @media (max-width: 768px) {
        width: 50px; 
        height: 50px;
    }

    @media (max-width: 480px) {
        width: 40px; 
        height: 40px;
    }
`;
export const Icon_Image_90 = styled.img.withConfig({
    shouldForwardProp: (prop) => prop !== 'ThemeMode',
})`
    width: 90%; 
    height: auto;
    border-radius: 10%;
    object-fit: cover;
    border: ${({ ThemeMode }) => (ThemeMode ? '2px solid black' : '2px solid white')};
    background-color: ${({ ThemeMode }) => (ThemeMode ? 'white' : 'black')};
    display: flex;
    justify-content: center;
    align-items: center;
`;
//---------- Black/White
//____________IMAGE____________
//____________BUTTON____________
//---------- White
export const Icon_Button_White_30 = styled.button`
    font-size: 30px;
    border: none;
    background-color: transparent;
    cursor: pointer;
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;

    @media (max-width: 768px) {
        font-size: 28px;
    }

    @media (max-width: 480px) {
        font-size: 26px;
    }
`;
export const Icon_Button_White_26 = styled.button`
    font-size: 26px;
    border: none;
    background-color: transparent;
    cursor: pointer;
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;

    @media (max-width: 768px) {
        font-size: 24px;
    }

    @media (max-width: 480px) {
        font-size: 22px;
    }
`;
export const Icon_Button_White_22 = styled.button`
    font-size: 22px;
    border: none;
    background-color: transparent;
    cursor: pointer;
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;

    @media (max-width: 768px) {
        font-size: 20px;
    }

    @media (max-width: 480px) {
        font-size: 18px;
    }
`;
export const Icon_Button_White_18 = styled.button`
    font-size: 18px;
    border: none;
    background-color: transparent;
    cursor: pointer;
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;

    @media (max-width: 768px) {
        font-size: 16px;
    }

    @media (max-width: 480px) {
        font-size: 14px;
    }
`;
export const Icon_Button_White_14 = styled.button`
    font-size: 14px;
    border: none;
    background-color: transparent;
    cursor: pointer;
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;

    @media (max-width: 768px) {
        font-size: 12px;
    }

    @media (max-width: 480px) {
        font-size: 10px;
    }
`;
//---------- White
//---------- Black/White
export const Icon_Button_Black_30 = styled.button.withConfig({
    shouldForwardProp: (prop) => prop !== 'ThemeMode',
})`
    font-size: 30px;
    border: none;
    background-color: transparent;
    cursor: pointer;
    color: ${({ ThemeMode }) => (ThemeMode ? 'black' : 'white')};
    display: flex;
    justify-content: center;
    align-items: center;

    @media (max-width: 768px) {
        font-size: 28px;
    }

    @media (max-width: 480px) {
        font-size: 26px;
    }
`;
export const Icon_Button_Black_26 = styled.button.withConfig({
    shouldForwardProp: (prop) => prop !== 'ThemeMode',
})`
    font-size: 26px;
    border: none;
    background-color: transparent;
    cursor: pointer;
    color: ${({ ThemeMode }) => (ThemeMode ? 'black' : 'white')};
    display: flex;
    justify-content: center;
    align-items: center;

    @media (max-width: 768px) {
        font-size: 24px;
    }

    @media (max-width: 480px) {
        font-size: 22px;
    }
`;
export const Icon_Button_Black_22 = styled.button.withConfig({
    shouldForwardProp: (prop) => prop !== 'ThemeMode',
})`
    font-size: 22px;
    border: none;
    background-color: transparent;
    cursor: pointer;
    color: ${({ ThemeMode }) => (ThemeMode ? 'black' : 'white')};
    display: flex;
    justify-content: center;
    align-items: center;

    @media (max-width: 768px) {
        font-size: 20px;
    }

    @media (max-width: 480px) {
        font-size: 18px;
    }
`;
export const Icon_Button_Black_18 = styled.button.withConfig({
    shouldForwardProp: (prop) => prop !== 'ThemeMode',
})`
    font-size: 18px;
    border: none;
    background-color: transparent;
    cursor: pointer;
    color: ${({ ThemeMode }) => (ThemeMode ? 'black' : 'white')};
    display: flex;
    justify-content: center;
    align-items: center;

    @media (max-width: 768px) {
        font-size: 16px;
    }

    @media (max-width: 480px) {
        font-size: 14px;
    }
`;
export const Icon_Button_Black_14 = styled.button.withConfig({
    shouldForwardProp: (prop) => prop !== 'ThemeMode',
})`
    font-size: 14px;
    border: none;
    background-color: transparent;
    cursor: pointer;
    color: ${({ ThemeMode }) => (ThemeMode ? 'black' : 'white')};
    display: flex;
    justify-content: center;
    align-items: center;

    @media (max-width: 768px) {
        font-size: 12px;
    }

    @media (max-width: 480px) {
        font-size: 10px;
    }
`;
//---------- Black/White
//---------- Blue
export const Icon_Button_Blue_30 = styled.button.withConfig({
    shouldForwardProp: (prop) => prop !== 'ThemeMode',
})`
    font-size: 30px;
    border: none;
    background-color: transparent;
    cursor: pointer;
    color: ${({ ThemeMode }) => (ThemeMode ? 'rgb(58,93,174)' : 'rgb(82, 126, 231)')};
    display: flex;
    justify-content: center;
    align-items: center;

    @media (max-width: 768px) {
        font-size: 28px;
    }

    @media (max-width: 480px) {
        font-size: 26px;
    }
`;
export const Icon_Button_Blue_26 = styled.button.withConfig({
    shouldForwardProp: (prop) => prop !== 'ThemeMode',
})`
    font-size: 26px;
    border: none;
    background-color: transparent;
    cursor: pointer;
    color: ${({ ThemeMode }) => (ThemeMode ? 'rgb(58,93,174)' : 'rgb(82, 126, 231)')};
    display: flex;
    justify-content: center;
    align-items: center;

    @media (max-width: 768px) {
        font-size: 24px;
    }

    @media (max-width: 480px) {
        font-size: 22px;
    }
`;
export const Icon_Button_Blue_22 = styled.button.withConfig({
    shouldForwardProp: (prop) => prop !== 'ThemeMode',
})`
    font-size: 22px;
    border: none;
    background-color: transparent;
    cursor: pointer;
    color: ${({ ThemeMode }) => (ThemeMode ? 'rgb(58,93,174)' : 'rgb(82, 126, 231)')};
    display: flex;
    justify-content: center;
    align-items: center;

    @media (max-width: 768px) {
        font-size: 20px;
    }

    @media (max-width: 480px) {
        font-size: 18px;
    }
`;
export const Icon_Button_Blue_18 = styled.button.withConfig({
    shouldForwardProp: (prop) => prop !== 'ThemeMode',
})`
    font-size: 18px;
    border: none;
    background-color: transparent;
    cursor: pointer;
    color: ${({ ThemeMode }) => (ThemeMode ? 'rgb(58,93,174)' : 'rgb(82, 126, 231)')};
    display: flex;
    justify-content: center;
    align-items: center;

    @media (max-width: 768px) {
        font-size: 16px;
    }

    @media (max-width: 480px) {
        font-size: 14px;
    }
`;
export const Icon_Button_Blue_14 = styled.button.withConfig({
    shouldForwardProp: (prop) => prop !== 'ThemeMode',
})`
    font-size: 14px;
    border: none;
    background-color: transparent;
    cursor: pointer;
    color: ${({ ThemeMode }) => (ThemeMode ? 'rgb(58,93,174)' : 'rgb(82, 126, 231)')};
    display: flex;
    justify-content: center;
    align-items: center;

    @media (max-width: 768px) {
        font-size: 12px;
    }

    @media (max-width: 480px) {
        font-size: 10px;
    }
`;
//---------- Blue
//____________BUTTON____________
//____________ROTATE____________
//---------- Gray
export const Icon_Rotate_Gray_50 = styled.div`
    width: 50px;
    height: 50px;    
    font-size: 50px;
    color:rgb(164, 166, 168);
    text-align: center;
    box-sizing: border-box;
    animation: ${Rotate_Animation} 1s linear infinite;
    transform-origin: center center;
    display: flex;
    justify-content: center;
    align-items: center;

    @media (max-width: 768px) {
        width: 40px;
        height: 40px;
        font-size: 40px;
    }

    @media (max-width: 480px) {
        width: 30px;
        height: 30px;    
        font-size: 30px;
    }
`;
//---------- Gray
//____________ROTATE____________
//____________COLOR____________
//---------- Sin color
export const Icon_30 = styled.div`
    font-size: 30px;
    display: flex;
    justify-content: center;
    align-items: center;

    @media (max-width: 768px) {
        font-size: 28px;
    }

    @media (max-width: 480px) {
        font-size: 26px;
    }
`;
export const Icon_26 = styled.div`
    font-size: 26px;
    display: flex;
    justify-content: center;
    align-items: center;

    @media (max-width: 768px) {
        font-size: 24px;
    }

    @media (max-width: 480px) {
        font-size: 22px;
    }
`;
export const Icon_22 = styled.div`
    font-size: 22px;
    display: flex;
    justify-content: center;
    align-items: center;

    @media (max-width: 768px) {
        font-size: 20px;
    }

    @media (max-width: 480px) {
        font-size: 18px;
    }
`;
export const Icon_18 = styled.div`
    font-size: 18px;
    display: flex;
    justify-content: center;
    align-items: center;

    @media (max-width: 768px) {
        font-size: 16px;
    }

    @media (max-width: 480px) {
        font-size: 14px;
    }
`;
//---------- Sin color
//---------- White
export const Icon_White_30 = styled.div`
    font-size: 30px;
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;

    @media (max-width: 768px) {
        font-size: 28px;
    }

    @media (max-width: 480px) {
        font-size: 26px;
    }
`;
export const Icon_White_26 = styled.div`
    font-size: 26px;
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;

    @media (max-width: 768px) {
        font-size: 24px;
    }

    @media (max-width: 480px) {
        font-size: 22px;
    }
`;
export const Icon_White_22 = styled.div`
    font-size: 22px;
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;

    @media (max-width: 768px) {
        font-size: 20px;
    }

    @media (max-width: 480px) {
        font-size: 18px;
    }
`;
export const Icon_White_18 = styled.div`
    font-size: 18px;
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;

    @media (max-width: 768px) {
        font-size: 16px;
    }

    @media (max-width: 480px) {
        font-size: 14px;
    }
`;
export const Icon_White_14 = styled.div`
    font-size: 14px;
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;

    @media (max-width: 768px) {
        font-size: 12px;
    }

    @media (max-width: 480px) {
        font-size: 10px;
    }
`;
//---------- White
//---------- Black
export const Icon_Black_30 = styled.div`
    font-size: 30px;
    color: black;
    display: flex;
    justify-content: center;
    align-items: center;

    @media (max-width: 768px) {
        font-size: 28px;
    }

    @media (max-width: 480px) {
        font-size: 26px;
    }
`;
export const Icon_Black_26 = styled.div`
    font-size: 26px;
    color: black;
    display: flex;
    justify-content: center;
    align-items: center;

    @media (max-width: 768px) {
        font-size: 24px;
    }

    @media (max-width: 480px) {
        font-size: 22px;
    }
`;
export const Icon_Black_22 = styled.div`
    font-size: 22px;
    color: black;
    display: flex;
    justify-content: center;
    align-items: center;

    @media (max-width: 768px) {
        font-size: 20px;
    }

    @media (max-width: 480px) {
        font-size: 18px;
    }
`;
export const Icon_Black_18 = styled.div`
    font-size: 18px;
    color: black;
    display: flex;
    justify-content: center;
    align-items: center;

    @media (max-width: 768px) {
        font-size: 16px;
    }

    @media (max-width: 480px) {
        font-size: 14px;
    }
`;
//---------- Black
//---------- White/Black
export const Icon_White_Black_30 = styled.div.withConfig({
    shouldForwardProp: (prop) => prop !== 'ThemeMode',
})`
    font-size: 30px;
    color: ${({ ThemeMode }) => (ThemeMode ? 'white' : 'black')};
    display: flex;
    justify-content: center;
    align-items: center;

    @media (max-width: 768px) {
        font-size: 28px;
    }

    @media (max-width: 480px) {
        font-size: 26px;
    }
`;
export const Icon_White_Black_26 = styled.div.withConfig({
    shouldForwardProp: (prop) => prop !== 'ThemeMode',
})`
    font-size: 26px;
    color: ${({ ThemeMode }) => (ThemeMode ? 'white' : 'black')};
    display: flex;
    justify-content: center;
    align-items: center;

    @media (max-width: 768px) {
        font-size: 24px;
    }

    @media (max-width: 480px) {
        font-size: 22px;
    }
`;
export const Icon_White_Black_22 = styled.div.withConfig({
    shouldForwardProp: (prop) => prop !== 'ThemeMode',
})`
    font-size: 22px;
    color: ${({ ThemeMode }) => (ThemeMode ? 'white' : 'black')};
    display: flex;
    justify-content: center;
    align-items: center;

    @media (max-width: 768px) {
        font-size: 20px;
    }

    @media (max-width: 480px) {
        font-size: 18px;
    }
`;
export const Icon_White_Black_18 = styled.div.withConfig({
    shouldForwardProp: (prop) => prop !== 'ThemeMode',
})`
    font-size: 18px;
    color: ${({ ThemeMode }) => (ThemeMode ? 'white' : 'black')};
    display: flex;
    justify-content: center;
    align-items: center;

    @media (max-width: 768px) {
        font-size: 16px;
    }

    @media (max-width: 480px) {
        font-size: 14px;
    }
`;
//---------- White/Black
//---------- Black/White
export const Icon_Black_White_30 = styled.div.withConfig({
    shouldForwardProp: (prop) => prop !== 'ThemeMode',
})`
    font-size: 30px;
    color: ${({ ThemeMode }) => (ThemeMode ? 'black' : 'white')};
    display: flex;
    justify-content: center;
    align-items: center;

    @media (max-width: 768px) {
        font-size: 28px;
    }

    @media (max-width: 480px) {
        font-size: 26px;
    }
`;
export const Icon_Black_White_26 = styled.div.withConfig({
    shouldForwardProp: (prop) => prop !== 'ThemeMode',
})`
    font-size: 26px;
    color: ${({ ThemeMode }) => (ThemeMode ? 'black' : 'white')};
    display: flex;
    justify-content: center;
    align-items: center;

    @media (max-width: 768px) {
        font-size: 24px;
    }

    @media (max-width: 480px) {
        font-size: 22px;
    }
`;
export const Icon_Black_White_22 = styled.div.withConfig({
    shouldForwardProp: (prop) => prop !== 'ThemeMode',
})`
    font-size: 22px;
    color: ${({ ThemeMode }) => (ThemeMode ? 'black' : 'white')};
    display: flex;
    justify-content: center;
    align-items: center;

    @media (max-width: 768px) {
        font-size: 20px;
    }

    @media (max-width: 480px) {
        font-size: 18px;
    }
`;
export const Icon_Black_White_18 = styled.div.withConfig({
    shouldForwardProp: (prop) => prop !== 'ThemeMode',
})`
    font-size: 18px;
    color: ${({ ThemeMode }) => (ThemeMode ? 'black' : 'white')};
    display: flex;
    justify-content: center;
    align-items: center;

    @media (max-width: 768px) {
        font-size: 16px;
    }

    @media (max-width: 480px) {
        font-size: 14px;
    }
`;
//---------- Black/White
//---------- Blue
export const Icon_Blue_30 = styled.div.withConfig({
    shouldForwardProp: (prop) => prop !== 'ThemeMode',
})`
    font-size: 30px;
    color: ${({ ThemeMode }) => (ThemeMode ? 'rgb(58,93,174)' : 'rgb(82, 126, 231)')};
    display: flex;
    justify-content: center;
    align-items: center;

    @media (max-width: 768px) {
        font-size: 28px;
    }

    @media (max-width: 480px) {
        font-size: 26px;
    }
`;
export const Icon_Blue_26 = styled.div.withConfig({
    shouldForwardProp: (prop) => prop !== 'ThemeMode',
})`
    font-size: 26px;
    color: ${({ ThemeMode }) => (ThemeMode ? 'rgb(58,93,174)' : 'rgb(82, 126, 231)')};
    display: flex;
    justify-content: center;
    align-items: center;

    @media (max-width: 768px) {
        font-size: 24px;
    }

    @media (max-width: 480px) {
        font-size: 22px;
    }
`;
export const Icon_Blue_22 = styled.div.withConfig({
    shouldForwardProp: (prop) => prop !== 'ThemeMode',
})`
    font-size: 22px;
    color: ${({ ThemeMode }) => (ThemeMode ? 'rgb(58,93,174)' : 'rgb(82, 126, 231)')};
    display: flex;
    justify-content: center;
    align-items: center;

    @media (max-width: 768px) {
        font-size: 20px;
    }

    @media (max-width: 480px) {
        font-size: 18px;
    }
`;
export const Icon_Blue_18 = styled.div.withConfig({
    shouldForwardProp: (prop) => prop !== 'ThemeMode',
})`
    font-size: 18px;
    color: ${({ ThemeMode }) => (ThemeMode ? 'rgb(58,93,174)' : 'rgb(82, 126, 231)')};
    display: flex;
    justify-content: center;
    align-items: center;

    @media (max-width: 768px) {
        font-size: 16px;
    }

    @media (max-width: 480px) {
        font-size: 14px;
    }
`;
//---------- Blue
//---------- Green
export const Icon_Green_100 = styled.div.withConfig({
    shouldForwardProp: (prop) => prop !== 'ThemeMode',
})`
    font-size: 100px;
    color: ${({ ThemeMode }) => (ThemeMode ? 'rgb(20, 165, 76)' : 'rgb(60, 188, 109)')};
    display: flex;
    justify-content: center;
    align-items: center;

    @media (max-width: 768px) {
        font-size: 28px;
    }

    @media (max-width: 480px) {
        font-size: 26px;
    }
`;
export const Icon_Green_30 = styled.div.withConfig({
    shouldForwardProp: (prop) => prop !== 'ThemeMode',
})`
    font-size: 30px;
    color: ${({ ThemeMode }) => (ThemeMode ? 'rgb(20, 165, 76)' : 'rgb(60, 188, 109)')};
    display: flex;
    justify-content: center;
    align-items: center;

    @media (max-width: 768px) {
        font-size: 28px;
    }

    @media (max-width: 480px) {
        font-size: 26px;
    }
`;
export const Icon_Green_26 = styled.div.withConfig({
    shouldForwardProp: (prop) => prop !== 'ThemeMode',
})`
    font-size: 26px;
    color: ${({ ThemeMode }) => (ThemeMode ? 'rgb(20, 165, 76)' : 'rgb(60, 188, 109)')};
    display: flex;
    justify-content: center;
    align-items: center;

    @media (max-width: 768px) {
        font-size: 24px;
    }

    @media (max-width: 480px) {
        font-size: 22px;
    }
`;
export const Icon_Green_22 = styled.div.withConfig({
    shouldForwardProp: (prop) => prop !== 'ThemeMode',
})`
    font-size: 22px;
    color: ${({ ThemeMode }) => (ThemeMode ? 'rgb(20, 165, 76)' : 'rgb(60, 188, 109)')};
    display: flex;
    justify-content: center;
    align-items: center;

    @media (max-width: 768px) {
        font-size: 20px;
    }

    @media (max-width: 480px) {
        font-size: 18px;
    }
`;
export const Icon_Green_18 = styled.div.withConfig({
    shouldForwardProp: (prop) => prop !== 'ThemeMode',
})`
    font-size: 18px;
    color: ${({ ThemeMode }) => (ThemeMode ? 'rgb(20, 165, 76)' : 'rgb(60, 188, 109)')};
    display: flex;
    justify-content: center;
    align-items: center;

    @media (max-width: 768px) {
        font-size: 16px;
    }

    @media (max-width: 480px) {
        font-size: 14px;
    }
`;
export const Icon_Green_14 = styled.div.withConfig({
    shouldForwardProp: (prop) => prop !== 'ThemeMode',
})`
    font-size: 14px;
    color: ${({ ThemeMode }) => (ThemeMode ? 'rgb(20, 165, 76)' : 'rgb(60, 188, 109)')};
    display: flex;
    justify-content: center;
    align-items: center;

    @media (max-width: 768px) {
        font-size: 12px;
    }

    @media (max-width: 480px) {
        font-size: 10px;
    }
`;
//---------- Green
//---------- Red
export const Icon_Red_30 = styled.div.withConfig({
    shouldForwardProp: (prop) => prop !== 'ThemeMode',
})`
    font-size: 30px;
    color: ${({ ThemeMode }) => (ThemeMode ? 'rgb(155, 9, 9)' : 'rgb(208, 31, 31)')};
    display: flex;
    justify-content: center;
    align-items: center;

    @media (max-width: 768px) {
        font-size: 28px;
    }

    @media (max-width: 480px) {
        font-size: 26px;
    }
`;
export const Icon_Red_26 = styled.div.withConfig({
    shouldForwardProp: (prop) => prop !== 'ThemeMode',
})`
    font-size: 26px;
    color: ${({ ThemeMode }) => (ThemeMode ? 'rgb(155, 9, 9)' : 'rgb(208, 31, 31)')};
    display: flex;
    justify-content: center;
    align-items: center;

    @media (max-width: 768px) {
        font-size: 24px;
    }

    @media (max-width: 480px) {
        font-size: 22px;
    }
`;
export const Icon_Red_22 = styled.div.withConfig({
    shouldForwardProp: (prop) => prop !== 'ThemeMode',
})`
    font-size: 22px;
    color: ${({ ThemeMode }) => (ThemeMode ? 'rgb(155, 9, 9)' : 'rgb(208, 31, 31)')};
    display: flex;
    justify-content: center;
    align-items: center;

    @media (max-width: 768px) {
        font-size: 20px;
    }

    @media (max-width: 480px) {
        font-size: 18px;
    }
`;
export const Icon_Red_18 = styled.div.withConfig({
    shouldForwardProp: (prop) => prop !== 'ThemeMode',
})`
    font-size: 18px;
    color: ${({ ThemeMode }) => (ThemeMode ? 'rgb(155, 9, 9)' : 'rgb(208, 31, 31)')};
    display: flex;
    justify-content: center;
    align-items: center;

    @media (max-width: 768px) {
        font-size: 16px;
    }

    @media (max-width: 480px) {
        font-size: 14px;
    }
`;
export const Icon_Red_14 = styled.div.withConfig({
    shouldForwardProp: (prop) => prop !== 'ThemeMode',
})`
    font-size: 14px;
    color: ${({ ThemeMode }) => (ThemeMode ? 'rgb(155, 9, 9)' : 'rgb(208, 31, 31)')};
    display: flex;
    justify-content: center;
    align-items: center;

    @media (max-width: 768px) {
        font-size: 12px;
    }

    @media (max-width: 480px) {
        font-size: 10px;
    }
`;
//---------- Red
//---------- Yellow
export const Icon_Yellow_250 = styled.div.withConfig({
    shouldForwardProp: (prop) => prop !== 'ThemeMode',
})`
    font-size: 250px;
    color: ${({ ThemeMode }) => (ThemeMode ? 'rgb(245, 223, 31)' : 'rgb(255, 210, 10)')};
    display: flex;
    justify-content: center;
    align-items: center;

    @media (max-width: 768px) {
        font-size: 200px;
    }

    @media (max-width: 480px) {
        font-size: 150px;
    }
`;
export const Icon_Yellow_30 = styled.div.withConfig({
    shouldForwardProp: (prop) => prop !== 'ThemeMode',
})`
    font-size: 30px;
    color: ${({ ThemeMode }) => (ThemeMode ? 'rgb(250, 207, 66)' : 'rgb(235, 191, 71)')};
    display: flex;
    justify-content: center;
    align-items: center;

    @media (max-width: 768px) {
        font-size: 28px;
    }

    @media (max-width: 480px) {
        font-size: 26px;
    }
`;
export const Icon_Yellow_26 = styled.div.withConfig({
    shouldForwardProp: (prop) => prop !== 'ThemeMode',
})`
    font-size: 26px;
    color: ${({ ThemeMode }) => (ThemeMode ? 'rgb(250, 207, 66)' : 'rgb(235, 191, 71)')};
    display: flex;
    justify-content: center;
    align-items: center;

    @media (max-width: 768px) {
        font-size: 24px;
    }

    @media (max-width: 480px) {
        font-size: 22px;
    }
`;
export const Icon_Yellow_22 = styled.div.withConfig({
    shouldForwardProp: (prop) => prop !== 'ThemeMode',
})`
    font-size: 22px;
    color: ${({ ThemeMode }) => (ThemeMode ? 'rgb(250, 207, 66)' : 'rgb(235, 191, 71)')};
    display: flex;
    justify-content: center;
    align-items: center;

    @media (max-width: 768px) {
        font-size: 20px;
    }

    @media (max-width: 480px) {
        font-size: 18px;
    }
`;
export const Icon_Yellow_18 = styled.div.withConfig({
    shouldForwardProp: (prop) => prop !== 'ThemeMode',
})`
    font-size: 18px;
    color: ${({ ThemeMode }) => (ThemeMode ? 'rgb(250, 207, 66)' : 'rgb(235, 191, 71)')};
    display: flex;
    justify-content: center;
    align-items: center;

    @media (max-width: 768px) {
        font-size: 16px;
    }

    @media (max-width: 480px) {
        font-size: 14px;
    }
`;
//---------- Yellow
//---------- Orange
export const Icon_Orange_30 = styled.div.withConfig({
    shouldForwardProp: (prop) => prop !== 'ThemeMode',
})`
    font-size: 30px;
    color: ${({ ThemeMode }) => (ThemeMode ? 'rgb(235, 108, 23)' : 'rgb(207, 122, 52)')};
    display: flex;
    justify-content: center;
    align-items: center;

    @media (max-width: 768px) {
        font-size: 28px;
    }

    @media (max-width: 480px) {
        font-size: 26px;
    }
`;
export const Icon_Orange_26 = styled.div.withConfig({
    shouldForwardProp: (prop) => prop !== 'ThemeMode',
})`
    font-size: 26px;
    color: ${({ ThemeMode }) => (ThemeMode ? 'rgb(235, 108, 23)' : 'rgb(207, 122, 52)')};
    display: flex;
    justify-content: center;
    align-items: center;

    @media (max-width: 768px) {
        font-size: 24px;
    }

    @media (max-width: 480px) {
        font-size: 22px;
    }
`;
export const Icon_Orange_22 = styled.div.withConfig({
    shouldForwardProp: (prop) => prop !== 'ThemeMode',
})`
    font-size: 22px;
    color: ${({ ThemeMode }) => (ThemeMode ? 'rgb(235, 108, 23)' : 'rgb(207, 122, 52)')};
    display: flex;
    justify-content: center;
    align-items: center;

    @media (max-width: 768px) {
        font-size: 20px;
    }

    @media (max-width: 480px) {
        font-size: 18px;
    }
`;
export const Icon_Orange_18 = styled.div.withConfig({
    shouldForwardProp: (prop) => prop !== 'ThemeMode',
})`
    font-size: 18px;
    color: ${({ ThemeMode }) => (ThemeMode ? 'rgb(235, 108, 23)' : 'rgb(207, 122, 52)')};
    display: flex;
    justify-content: center;
    align-items: center;

    @media (max-width: 768px) {
        font-size: 16px;
    }

    @media (max-width: 480px) {
        font-size: 14px;
    }
`;
//---------- Orange
//---------- Lime Green 
export const Icon_Lime_Green_30 = styled.div.withConfig({
    shouldForwardProp: (prop) => prop !== 'ThemeMode',
})`
    font-size: 30px;
    color: ${({ ThemeMode }) => (ThemeMode ? 'rgb(160, 187, 39)' : 'rgb(174, 190, 100)')};
    display: flex;
    justify-content: center;
    align-items: center;

    @media (max-width: 768px) {
        font-size: 28px;
    }

    @media (max-width: 480px) {
        font-size: 26px;
    }
`;
export const Icon_Lime_Green_26 = styled.div.withConfig({
    shouldForwardProp: (prop) => prop !== 'ThemeMode',
})`
    font-size: 26px;
    color: ${({ ThemeMode }) => (ThemeMode ? 'rgb(160, 187, 39)' : 'rgb(174, 190, 100)')};
    display: flex;
    justify-content: center;
    align-items: center;

    @media (max-width: 768px) {
        font-size: 24px;
    }

    @media (max-width: 480px) {
        font-size: 22px;
    }
`;
export const Icon_Lime_Green_22 = styled.div.withConfig({
    shouldForwardProp: (prop) => prop !== 'ThemeMode',
})`
    font-size: 22px;
    color: ${({ ThemeMode }) => (ThemeMode ? 'rgb(160, 187, 39)' : 'rgb(174, 190, 100)')};
    display: flex;
    justify-content: center;
    align-items: center;

    @media (max-width: 768px) {
        font-size: 20px;
    }

    @media (max-width: 480px) {
        font-size: 18px;
    }
`;
export const Icon_Lime_Green_18 = styled.div.withConfig({
    shouldForwardProp: (prop) => prop !== 'ThemeMode',
})`
    font-size: 18px;
    color: ${({ ThemeMode }) => (ThemeMode ? 'rgb(160, 187, 39)' : 'rgb(174, 190, 100)')};
    display: flex;
    justify-content: center;
    align-items: center;

    @media (max-width: 768px) {
        font-size: 16px;
    }

    @media (max-width: 480px) {
        font-size: 14px;
    }
`;
//---------- Lime Green 
//____________COLOR____________