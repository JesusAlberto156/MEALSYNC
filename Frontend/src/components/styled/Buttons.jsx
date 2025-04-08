import styled from 'styled-components';

//____________ICON____________
// Ocultar/Mostrar Sidebar
export const Button_Icon_Toggle = styled.button.withConfig({
    shouldForwardProp: (prop) => prop !== 'ThemeMode',
})`
    width: 70px;
    padding: 6px;
    font-size: 20px;
    border-radius: 50px;
    background-color: ${({ ThemeMode }) => (ThemeMode ? 'rgb(58,93,174)' : 'rgb(82, 126, 231)')};
    color: white;
    border: ${({ ThemeMode }) => (ThemeMode ? '2px solid black' : '2px solid white')};
    text-align: center;
    cursor: pointer;
    transition: background-color 0.3s, transform 0.3s;
    box-sizing: border-box;
    z-index: 40;

    &:hover {
        background-color: ${({ ThemeMode }) => (ThemeMode ? 'rgb(12, 54, 109)' : 'rgb(58,93,174)')};
        transform: scale(1.1);
    }

    @media (max-width: 768px) {
        padding: 4px;
        font-size: 15px;
        width: 50px;
    }

    @media (max-width: 480px) {
        padding: 2px;
        font-size: 10px;
        width: 30px;
    }
`;
// Cerrar sesión
export const Button_Icon_Logout = styled.button.withConfig({
    shouldForwardProp: (prop) => prop !== 'ThemeMode',
})`
    width: 70px;
    padding: 6px;
    font-size: 20px;
    border-radius: 50px;
    background-color: ${({ ThemeMode }) => (ThemeMode ? 'rgb(58,93,174)' : 'rgb(82, 126, 231)')};
    color: white;
    border: ${({ ThemeMode }) => (ThemeMode ? '2px solid black' : '2px solid white')};
    text-align: center;
    cursor: pointer;
    transition: background-color 0.3s, transform 0.3s;
    box-sizing: border-box;
    margin-right: auto;
    z-index: 40;

    &:hover {
        background-color: ${({ ThemeMode }) => (ThemeMode ? 'rgb(155, 9, 9)' : 'rgb(208, 31, 31)')};
        transform: scale(1.1);
    }

    @media (max-width: 768px) {
        padding: 4px;
        font-size: 15px;
        width: 50px;
    }

    @media (max-width: 480px) {
        padding: 2px;
        font-size: 10px;
        width: 30px;
    }
`;
// Color Azul
export const Button_Icon_Blue_220 = styled.button.withConfig({
    shouldForwardProp: (prop) => prop !== 'ThemeMode',
})`
    width: 220px;
    padding: 6px;
    font-size: 30px;
    border-radius: 50px;
    border: ${({ ThemeMode }) => (ThemeMode ? '2px solid black' : '2px solid white')};
    background-color: ${({ ThemeMode }) => (ThemeMode ? 'rgb(58,93,174)' : 'rgb(82, 126, 231)')};
    color: white;
    text-align: center;
    box-sizing: border-box;
    cursor: pointer;
    transition: background-color 0.3s, transform 0.3s;
    
    &:hover {
        background-color: ${({ ThemeMode }) => (ThemeMode ? 'rgb(12, 54, 109)' : 'rgb(58,93,174)')};
        transform: scale(1.1);
    }

    @media (max-width: 768px) {
        width: 190px;
        padding: 5px;
        font-size: 25px;
    }

    @media (max-width: 480px) {
        width: 160px;    
        padding: 4px;
        font-size: 20px;
    }
`;
export const Button_Icon_Blue_210 = styled.button.withConfig({
    shouldForwardProp: (prop) => prop !== 'ThemeMode',
})`
    width: 210px;
    padding: 6px;
    font-size: 18px;
    border-radius: 50px;
    border: ${({ ThemeMode }) => (ThemeMode ? '2px solid black' : '2px solid white')};
    background-color: ${({ ThemeMode }) => (ThemeMode ? 'rgb(58,93,174)' : 'rgb(82, 126, 231)')};
    color: white;
    display: flex;
    align-items: center;
    justify-content: space-between;
    box-sizing: border-box;
    cursor: pointer;
    transition: background-color 0.3s, transform 0.3s;
    
    &:hover {
        background-color: ${({ ThemeMode }) => (ThemeMode ? 'rgb(12, 54, 109)' : 'rgb(58,93,174)')};
        transform: scale(1.1);
    }

    @media (max-width: 768px) {
        width: 180px;
        padding: 5px;
        font-size: 16px;
    }

    @media (max-width: 480px) {
        width: 150px;    
        padding: 4px;
        font-size: 14px;
    }
`;
export const Button_Icon_Blue_170 = styled.button.withConfig({
    shouldForwardProp: (prop) => prop !== 'ThemeMode',
})`
    width: 170px;
    padding: 6px;
    font-size: 30px;
    border-radius: 50px;
    border: ${({ ThemeMode }) => (ThemeMode ? '2px solid black' : '2px solid white')};
    background-color: ${({ ThemeMode }) => (ThemeMode ? 'rgb(58,93,174)' : 'rgb(82, 126, 231)')};
    color: white;
    text-align: center;
    box-sizing: border-box;
    cursor: pointer;
    transition: background-color 0.3s, transform 0.3s;
    
    &:hover {
        background-color: ${({ ThemeMode }) => (ThemeMode ? 'rgb(12, 54, 109)' : 'rgb(58,93,174)')};
        transform: scale(1.1);
    }

    @media (max-width: 768px) {
        width: 140px;
        padding: 5px;
        font-size: 25px;
    }

    @media (max-width: 480px) {
        width: 110px;    
        padding: 4px;
        font-size: 20px;
    }
`;
export const Button_Icon_Blue_150 = styled.button.withConfig({
    shouldForwardProp: (prop) => prop !== 'ThemeMode',
})`
    width: 150px;
    padding: 6px;
    font-size: 30px;
    border-radius: 50px;
    border: ${({ ThemeMode }) => (ThemeMode ? '2px solid black' : '2px solid white')};
    background-color: ${({ ThemeMode }) => (ThemeMode ? 'rgb(58,93,174)' : 'rgb(82, 126, 231)')};
    color: white;
    text-align: center;
    box-sizing: border-box;
    cursor: pointer;
    transition: background-color 0.3s, transform 0.3s;
    
    &:hover {
        background-color: ${({ ThemeMode }) => (ThemeMode ? 'rgb(12, 54, 109)' : 'rgb(58,93,174)')};
        transform: scale(1.1);
    }

    @media (max-width: 768px) {
        width: 120px;
        padding: 5px;
        font-size: 25px;
    }

    @media (max-width: 480px) {
        width: 90px;    
        padding: 4px;
        font-size: 20px;
    }
`;
export const Button_Icon_Blue_45 = styled.button.withConfig({
    shouldForwardProp: (prop) => prop !== 'ThemeMode',
})`
    width: 45px;
    padding: 5px;
    font-size: 30px;
    border-radius: 15px;
    border: ${({ ThemeMode }) => (ThemeMode ? '2px solid black' : '2px solid white')};
    background-color: ${({ ThemeMode }) => (ThemeMode ? 'rgb(58,93,174)' : 'rgb(82, 126, 231)')};
    color: white;
    text-align: center;
    box-sizing: border-box;
    cursor: pointer;
    transition: background-color 0.3s, transform 0.3s;
    
    &:hover {
        background-color: ${({ ThemeMode }) => (ThemeMode ? 'rgb(12, 54, 109)' : 'rgb(58,93,174)')};
        transform: scale(1.1);
    }

    @media (max-width: 768px) {
        width: 40px;
        padding: 4px;
        font-size: 25px;
    }

    @media (max-width: 480px) {
        width: 35px;    
        padding: 3px;
        font-size: 20px;
    }
`;
// Color Verde
export const Button_Icon_Green_170 = styled.button.withConfig({
    shouldForwardProp: (prop) => prop !== 'ThemeMode',
})`
    width: 170px;
    padding: 6px;
    font-size: 30px;
    border-radius: 50px;
    border: ${({ ThemeMode }) => (ThemeMode ? '2px solid black' : '2px solid white')};
    background-color: ${({ ThemeMode }) => (ThemeMode ? 'rgb(20, 165, 76)' : 'rgb(60, 188, 109)')};
    color: white;
    text-align: center;
    box-sizing: border-box;
    cursor: pointer;
    transition: background-color 0.3s, transform 0.3s;
    
    &:hover {
        background-color: ${({ ThemeMode }) => (ThemeMode ? 'rgb(13, 112, 51)' : 'rgb(20, 165, 76)')};
        transform: scale(1.1);
    }

    @media (max-width: 768px) {
        width: 140px;
        padding: 5px;
        font-size: 25px;
    }

    @media (max-width: 480px) {
        width: 110px;    
        padding: 4px;
        font-size: 20px;
    }
`;
export const Button_Icon_Green_150 = styled.button.withConfig({
    shouldForwardProp: (prop) => prop !== 'ThemeMode',
})`
    width: 150px;
    padding: 6px;
    font-size: 30px;
    border-radius: 50px;
    border: ${({ ThemeMode }) => (ThemeMode ? '2px solid black' : '2px solid white')};
    background-color: ${({ ThemeMode }) => (ThemeMode ? 'rgb(20, 165, 76)' : 'rgb(60, 188, 109)')};
    color: white;
    text-align: center;
    box-sizing: border-box;
    cursor: pointer;
    transition: background-color 0.3s, transform 0.3s;
    
    &:hover {
        background-color: ${({ ThemeMode }) => (ThemeMode ? 'rgb(13, 112, 51)' : 'rgb(20, 165, 76)')};
        transform: scale(1.1);
    }

    @media (max-width: 768px) {
        width: 120px;
        padding: 5px;
        font-size: 25px;
    }

    @media (max-width: 480px) {
        width: 90px;    
        padding: 4px;
        font-size: 20px;
    }
`;
export const Button_Icon_Green_45 = styled.button.withConfig({
    shouldForwardProp: (prop) => prop !== 'ThemeMode',
})`
    width: 45px;
    padding: 5px;
    font-size: 30px;
    border-radius: 15px;
    border: ${({ ThemeMode }) => (ThemeMode ? '2px solid black' : '2px solid white')};
    background-color: ${({ ThemeMode }) => (ThemeMode ? 'rgb(20, 165, 76)' : 'rgb(60, 188, 109)')};
    color: white;
    text-align: center;
    box-sizing: border-box;
    cursor: pointer;
    transition: background-color 0.3s, transform 0.3s;
    
    &:hover {
        background-color: ${({ ThemeMode }) => (ThemeMode ? 'rgb(13, 112, 51)' : 'rgb(20, 165, 76)')};
        transform: scale(1.1);
    }

    @media (max-width: 768px) {
        width: 40px;
        padding: 4px;
        font-size: 25px;
    }

    @media (max-width: 480px) {
        width: 35px;    
        padding: 3px;
        font-size: 20px;
    }
`;
// Color Rojo
export const Button_Icon_Red_170 = styled.button.withConfig({
    shouldForwardProp: (prop) => prop !== 'ThemeMode',
})`
    width: 170px;
    padding: 6px;
    font-size: 30px;
    border-radius: 50px;
    border: ${({ ThemeMode }) => (ThemeMode ? '2px solid black' : '2px solid white')};
    background-color: ${({ ThemeMode }) => (ThemeMode ? 'rgb(155, 9, 9)' : 'rgb(208, 31, 31)')};
    color: white;
    text-align: center;
    box-sizing: border-box;
    cursor: pointer;
    transition: background-color 0.3s, transform 0.3s;
    
    &:hover {
        background-color: ${({ ThemeMode }) => (ThemeMode ? 'rgb(100, 15, 15)' : 'rgb(155, 9, 9)')};
        transform: scale(1.1);
    }

    @media (max-width: 768px) {
        width: 140px;
        padding: 5px;
        font-size: 25px;
    }

    @media (max-width: 480px) {
        width: 110px;    
        padding: 4px;
        font-size: 20px;
    }
`;
export const Button_Icon_Red_150 = styled.button.withConfig({
    shouldForwardProp: (prop) => prop !== 'ThemeMode',
})`
    width: 150px;
    padding: 6px;
    font-size: 30px;
    border-radius: 50px;
    border: ${({ ThemeMode }) => (ThemeMode ? '2px solid black' : '2px solid white')};
    background-color: ${({ ThemeMode }) => (ThemeMode ? 'rgb(155, 9, 9)' : 'rgb(208, 31, 31)')};
    color: white;
    text-align: center;
    box-sizing: border-box;
    cursor: pointer;
    transition: background-color 0.3s, transform 0.3s;
    
    &:hover {
        background-color: ${({ ThemeMode }) => (ThemeMode ? 'rgb(100, 15, 15)' : 'rgb(155, 9, 9)')};
        transform: scale(1.1);
    }

    @media (max-width: 768px) {
        width: 120px;
        padding: 5px;
        font-size: 25px;
    }

    @media (max-width: 480px) {
        width: 90px;    
        padding: 4px;
        font-size: 20px;
    }
`;
export const Button_Icon_Red_45 = styled.button.withConfig({
    shouldForwardProp: (prop) => prop !== 'ThemeMode',
})`
    width: 45px;
    padding: 5px;
    font-size: 30px;
    border-radius: 15px;
    border: ${({ ThemeMode }) => (ThemeMode ? '2px solid black' : '2px solid white')};
    background-color: ${({ ThemeMode }) => (ThemeMode ? 'rgb(155, 9, 9)' : 'rgb(208, 31, 31)')};
    color: white;
    text-align: center;
    box-sizing: border-box;
    cursor: pointer;
    transition: background-color 0.3s, transform 0.3s;
    
    &:hover {
        background-color: ${({ ThemeMode }) => (ThemeMode ? 'rgb(100, 15, 15)' : 'rgb(155, 9, 9)')};
        transform: scale(1.1);
    }

    @media (max-width: 768px) {
        width: 40px;
        padding: 4px;
        font-size: 25px;
    }

    @media (max-width: 480px) {
        width: 35px;    
        padding: 3px;
        font-size: 20px;
    }
`;
// Color Blanco
export const Button_Icon_White_200 = styled.button.withConfig({
    shouldForwardProp: (prop) => prop !== 'ThemeMode',
})`
    width: 200px;
    padding: 4px;
    font-size: 30px;
    border-radius: 15px;
    border: ${({ ThemeMode }) => (ThemeMode ? '2px solid black' : '2px solid white')};
    background-color: ${({ ThemeMode }) => (ThemeMode ? 'white' : 'black')};
    color: ${({ ThemeMode }) => (ThemeMode ? 'black' : 'white')};
    text-align: center;
    box-sizing: border-box;
    cursor: pointer;
    transition: background-color 0.3s, transform 0.3s;
    
    &:hover {
        background-color: ${({ ThemeMode }) => (ThemeMode ? 'black' : 'white')};
        border: ${({ ThemeMode }) => (ThemeMode ? '2px solid white' : '2px solid black')};
        color: ${({ ThemeMode }) => (ThemeMode ? 'white' : 'black')};
        transform: scale(1.1);
    }

    @media (max-width: 768px) {
        width: 170px;
        padding: 3px;
        font-size: 25px;
    }

    @media (max-width: 480px) {
        width: 140px;    
        padding: 2px;
        font-size: 20px;
    }
`;
export const Button_Icon_White_100 = styled.button.withConfig({
    shouldForwardProp: (prop) => prop !== 'ThemeMode',
})`
    width: 100px;
    padding: 4px;
    font-size: 30px;
    border-radius: 15px;
    border: ${({ ThemeMode }) => (ThemeMode ? '2px solid black' : '2px solid white')};
    background-color: ${({ ThemeMode }) => (ThemeMode ? 'white' : 'black')};
    color: ${({ ThemeMode }) => (ThemeMode ? 'black' : 'white')};
    text-align: center;
    box-sizing: border-box;
    cursor: pointer;
    transition: background-color 0.3s, transform 0.3s;
    
    &:hover {
        background-color: ${({ ThemeMode }) => (ThemeMode ? 'black' : 'white')};
        border: ${({ ThemeMode }) => (ThemeMode ? '2px solid white' : '2px solid black')};
        color: ${({ ThemeMode }) => (ThemeMode ? 'white' : 'black')};
        transform: scale(1.1);
    }

    @media (max-width: 768px) {
        width: 80px;
        padding: 3px;
        font-size: 25px;
    }

    @media (max-width: 480px) {
        width: 60px;    
        padding: 2px;
        font-size: 20px;
    }
`;
// Bloqueado
export const Button_Icon_Block_220 = styled.button.withConfig({
    shouldForwardProp: (prop) => prop !== 'ThemeMode',
})`
    width: 220px;
    padding: 6px;
    font-size: 30px;
    border-radius: 50px;
    background-color: ${({ ThemeMode }) => (ThemeMode ? 'rgb(121, 125, 125)' : 'rgb(157, 159, 159)')};
    color: white;
    text-align: center;
    box-sizing: border-box;
    cursor: not-allowed;
    pointer-events: none;
    transition: background-color 0.3s, transform 0.3s;

    @media (max-width: 768px) {
        width: 190px;
        padding: 5px;
        font-size: 25px;
    }

    @media (max-width: 480px) {
        width: 160px;    
        padding: 4px;
        font-size: 20px;
    }
`;
export const Button_Icon_Block_170 = styled.button.withConfig({
    shouldForwardProp: (prop) => prop !== 'ThemeMode',
})`
    width: 170px;
    padding: 6px;
    font-size: 30px;
    border-radius: 50px;
    background-color: ${({ ThemeMode }) => (ThemeMode ? 'rgb(121, 125, 125)' : 'rgb(157, 159, 159)')};
    color: white;
    text-align: center;
    box-sizing: border-box;
    cursor: not-allowed;
    pointer-events: none;
    transition: background-color 0.3s, transform 0.3s;

    @media (max-width: 768px) {
        width: 140px;
        padding: 5px;
        font-size: 25px;
    }

    @media (max-width: 480px) {
        width: 110px;    
        padding: 4px;
        font-size: 20px;
    }
`;
export const Button_Icon_Block_150 = styled.button.withConfig({
    shouldForwardProp: (prop) => prop !== 'ThemeMode',
})`
    width: 150px;
    padding: 6px;
    font-size: 30px;
    border-radius: 50px;
    background-color: ${({ ThemeMode }) => (ThemeMode ? 'rgb(121, 125, 125)' : 'rgb(157, 159, 159)')};
    color: white;
    text-align: center;
    box-sizing: border-box;
    cursor: not-allowed;
    pointer-events: none;
    transition: background-color 0.3s, transform 0.3s;

    @media (max-width: 768px) {
        width: 120px;
        padding: 5px;
        font-size: 25px;
    }

    @media (max-width: 480px) {
        width: 90px;    
        padding: 4px;
        font-size: 20px;
    }
`;
export const Button_Icon_Block_45 = styled.button.withConfig({
    shouldForwardProp: (prop) => prop !== 'ThemeMode',
})`
    width: 45px;
    padding: 5px;
    font-size: 30px;
    border-radius: 15px;
    background-color: ${({ ThemeMode }) => (ThemeMode ? 'rgb(121, 125, 125)' : 'rgb(157, 159, 159)')};
    color: white;
    text-align: center;
    box-sizing: border-box;
    cursor: not-allowed;
    pointer-events: none;
    transition: background-color 0.3s, transform 0.3s;

    @media (max-width: 768px) {
        width: 40px;
        padding: 4px;
        font-size: 25px;
    }

    @media (max-width: 480px) {
        width: 35px;    
        padding: 3px;
        font-size: 20px;
    }
`;
//____________ICON____________

export const Link = styled.button`
    width: 25%;
    padding: 2px;
    background-color: transparent;
    color:rgb(58,93,174);
    border: none;
    font-size: 15px;
    font-family:Arial, Helvetica, sans-serif;
    text-align: center;
    cursor: pointer;
    box-sizing: border-box;
    
    &:hover {
        color:rgb(160, 198, 236);
        transform: translateY(-2px);
        text-decoration: underline;
        transform: scale(1.2);
    }

    @media (max-width: 768px) {
        font-size: 12px;
        width: 40%;
        
        &:hover {
            transform: translateY(-2px);
            transform: scale(1.1);
        }
    }

    @media (max-width: 480px) {
        font-size: 12px;
        width: 60%;

        &:hover {
            transform: translateY(-2px);
            transform: scale(1.1);
        }
    }
`;