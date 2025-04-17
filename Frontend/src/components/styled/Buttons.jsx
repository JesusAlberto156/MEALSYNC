//____________IMPORT/EXPORT____________
// Componentes de React externos
import styled from 'styled-components';
//____________IMPORT/EXPORT____________

//____________ICON____________
// Color Azul
export const Button_Icon_Blue_220 = styled.button.withConfig({
    shouldForwardProp: (prop) => prop !== 'ThemeMode',
})`
    width: 220px;
    height: auto;
    padding: 6px;
    border-radius: 25px;
    border: ${({ ThemeMode }) => (ThemeMode ? '2px solid black' : '2px solid white')};
    background-color: ${({ ThemeMode }) => (ThemeMode ? 'rgb(58,93,174)' : 'rgb(82, 126, 231)')};
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
        padding: 4px;
    }

    @media (max-width: 480px) {
        width: 160px;    
        padding: 2px;
    }
`;
export const Button_Icon_Blue_200 = styled.button.withConfig({
    shouldForwardProp: (prop) => prop !== 'ThemeMode',
})`
    width: 200px;
    height: auto;
    padding: 6px;
    padding-left: 20px;
    border-radius: 25px;
    border: ${({ ThemeMode }) => (ThemeMode ? '2px solid black' : '2px solid white')};
    background-color: ${({ ThemeMode }) => (ThemeMode ? 'rgb(58,93,174)' : 'rgb(82, 126, 231)')};
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
        width: 170px;
        padding: 4px;
    }

    @media (max-width: 480px) {
        width: 140px;    
        padding: 2px;
    }
`;
export const Button_Icon_Blue_190 = styled.button.withConfig({
    shouldForwardProp: (prop) => prop !== 'ThemeMode',
})`
    width: 190px;
    height: auto;
    padding: 6px;
    border-radius: 25px;
    border: ${({ ThemeMode }) => (ThemeMode ? '2px solid black' : '2px solid white')};
    background-color: ${({ ThemeMode }) => (ThemeMode ? 'rgb(58,93,174)' : 'rgb(82, 126, 231)')};
    text-align: center;
    box-sizing: border-box;
    cursor: pointer;
    transition: background-color 0.3s, transform 0.3s;
    
    &:hover {
        background-color: ${({ ThemeMode }) => (ThemeMode ? 'rgb(12, 54, 109)' : 'rgb(58,93,174)')};
        transform: scale(1.1);
    }

    @media (max-width: 768px) {
        width: 160px;
        padding: 4px;
    }

    @media (max-width: 480px) {
        width: 130px;    
        padding: 2px;
    }
`;
export const Button_Icon_Blue_180 = styled.button.withConfig({
    shouldForwardProp: (prop) => prop !== 'ThemeMode',
})`
    width: 180px;
    height: auto;
    padding: 6px;
    border-radius: 25px;
    border: ${({ ThemeMode }) => (ThemeMode ? '2px solid black' : '2px solid white')};
    background-color: ${({ ThemeMode }) => (ThemeMode ? 'rgb(58,93,174)' : 'rgb(82, 126, 231)')};
    text-align: center;
    box-sizing: border-box;
    cursor: pointer;
    transition: background-color 0.3s, transform 0.3s;
    
    &:hover {
        background-color: ${({ ThemeMode }) => (ThemeMode ? 'rgb(12, 54, 109)' : 'rgb(58,93,174)')};
        transform: scale(1.1);
    }

    @media (max-width: 768px) {
        width: 150px;
        padding: 4px;
    }

    @media (max-width: 480px) {
        width: 120px;    
        padding: 2px;
    }
`;
export const Button_Icon_Blue_170 = styled.button.withConfig({
    shouldForwardProp: (prop) => prop !== 'ThemeMode',
})`
    width: 170px;
    height: auto;
    padding: 6px;
    border-radius: 25px;
    border: ${({ ThemeMode }) => (ThemeMode ? '2px solid black' : '2px solid white')};
    background-color: ${({ ThemeMode }) => (ThemeMode ? 'rgb(58,93,174)' : 'rgb(82, 126, 231)')};
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
        padding: 4px;
    }

    @media (max-width: 480px) {
        width: 110px;    
        padding: 2px;
    }
`;
export const Button_Icon_Blue_160 = styled.button.withConfig({
    shouldForwardProp: (prop) => prop !== 'ThemeMode',
})`
    width: 160px;
    height: auto;
    padding: 6px;
    border-radius: 25px;
    border: ${({ ThemeMode }) => (ThemeMode ? '2px solid black' : '2px solid white')};
    background-color: ${({ ThemeMode }) => (ThemeMode ? 'rgb(58,93,174)' : 'rgb(82, 126, 231)')};
    text-align: center;
    box-sizing: border-box;
    cursor: pointer;
    transition: background-color 0.3s, transform 0.3s;
    
    &:hover {
        background-color: ${({ ThemeMode }) => (ThemeMode ? 'rgb(12, 54, 109)' : 'rgb(58,93,174)')};
        transform: scale(1.1);
    }

    @media (max-width: 768px) {
        width: 130px;
        padding: 4px;
    }

    @media (max-width: 480px) {
        width: 100px;    
        padding: 2px;
    }
`;
export const Button_Icon_Blue_150 = styled.button.withConfig({
    shouldForwardProp: (prop) => prop !== 'ThemeMode',
})`
    width: 150px;
    height: auto;
    padding: 6px;
    border-radius: 25px;
    border: ${({ ThemeMode }) => (ThemeMode ? '2px solid black' : '2px solid white')};
    background-color: ${({ ThemeMode }) => (ThemeMode ? 'rgb(58,93,174)' : 'rgb(82, 126, 231)')};
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
        padding: 4px;
    }

    @media (max-width: 480px) {
        width: 90px;    
        padding: 2px;
    }
`;
export const Button_Icon_Blue_140 = styled.button.withConfig({
    shouldForwardProp: (prop) => prop !== 'ThemeMode',
})`
    width: 140px;
    height: auto;
    padding: 6px;
    border-radius: 25px;
    border: ${({ ThemeMode }) => (ThemeMode ? '2px solid black' : '2px solid white')};
    background-color: ${({ ThemeMode }) => (ThemeMode ? 'rgb(58,93,174)' : 'rgb(82, 126, 231)')};
    text-align: center;
    box-sizing: border-box;
    cursor: pointer;
    transition: background-color 0.3s, transform 0.3s;
    
    &:hover {
        background-color: ${({ ThemeMode }) => (ThemeMode ? 'rgb(12, 54, 109)' : 'rgb(58,93,174)')};
        transform: scale(1.1);
    }

    @media (max-width: 768px) {
        width: 110px;
        padding: 4px;
    }

    @media (max-width: 480px) {
        width: 80px;    
        padding: 2px;
    }
`;
export const Button_Icon_Blue_120 = styled.button.withConfig({
    shouldForwardProp: (prop) => prop !== 'ThemeMode',
})`
    width: 120px;
    height: auto;
    padding: 6px;
    border-radius: 25px;
    border: ${({ ThemeMode }) => (ThemeMode ? '2px solid black' : '2px solid white')};
    background-color: ${({ ThemeMode }) => (ThemeMode ? 'rgb(58,93,174)' : 'rgb(82, 126, 231)')};
    text-align: center;
    box-sizing: border-box;
    cursor: pointer;
    transition: background-color 0.3s, transform 0.3s;
    
    &:hover {
        background-color: ${({ ThemeMode }) => (ThemeMode ? 'rgb(12, 54, 109)' : 'rgb(58,93,174)')};
        transform: scale(1.1);
    }

    @media (max-width: 768px) {
        width: 100px;
        padding: 4px;
    }

    @media (max-width: 480px) {
        width: 80px;    
        padding: 2px;
    }
`;
export const Button_Icon_Blue_100 = styled.button.withConfig({
    shouldForwardProp: (prop) => prop !== 'ThemeMode',
})`
    width: 100px;
    height: auto;
    padding: 6px;
    border-radius: 25px;
    border: ${({ ThemeMode }) => (ThemeMode ? '2px solid black' : '2px solid white')};
    background-color: ${({ ThemeMode }) => (ThemeMode ? 'rgb(58,93,174)' : 'rgb(82, 126, 231)')};
    text-align: center;
    box-sizing: border-box;
    cursor: pointer;
    transition: background-color 0.3s, transform 0.3s;
    
    &:hover {
        background-color: ${({ ThemeMode }) => (ThemeMode ? 'rgb(12, 54, 109)' : 'rgb(58,93,174)')};
        transform: scale(1.1);
    }

    @media (max-width: 768px) {
        width: 80px;
        padding: 4px;
    }

    @media (max-width: 480px) {
        width: 60px;    
        padding: 2px;
    }
`;
export const Button_Icon_Blue_80 = styled.button.withConfig({
    shouldForwardProp: (prop) => prop !== 'ThemeMode',
})`
    width: 80px;
    height: auto;
    padding: 6px;
    border-radius: 25px;
    border: ${({ ThemeMode }) => (ThemeMode ? '2px solid black' : '2px solid white')};
    background-color: ${({ ThemeMode }) => (ThemeMode ? 'rgb(58,93,174)' : 'rgb(82, 126, 231)')};
    text-align: center;
    box-sizing: border-box;
    cursor: pointer;
    transition: background-color 0.3s, transform 0.3s;
    
    &:hover {
        background-color: ${({ ThemeMode }) => (ThemeMode ? 'rgb(12, 54, 109)' : 'rgb(58,93,174)')};
        transform: scale(1.1);
    }

    @media (max-width: 768px) {
        width: 70px;
        padding: 4px;
    }

    @media (max-width: 480px) {
        width: 60px;    
        padding: 2px;
    }
`;
export const Button_Icon_Blue_60 = styled.button.withConfig({
    shouldForwardProp: (prop) => prop !== 'ThemeMode',
})`
    width: 60px;
    height: auto;
    padding: 6px;
    border-radius: 25px;
    border: ${({ ThemeMode }) => (ThemeMode ? '2px solid black' : '2px solid white')};
    background-color: ${({ ThemeMode }) => (ThemeMode ? 'rgb(58,93,174)' : 'rgb(82, 126, 231)')};
    text-align: center;
    box-sizing: border-box;
    cursor: pointer;
    transition: background-color 0.3s, transform 0.3s;
    
    &:hover {
        background-color: ${({ ThemeMode }) => (ThemeMode ? 'rgb(12, 54, 109)' : 'rgb(58,93,174)')};
        transform: scale(1.1);
    }

    @media (max-width: 768px) {
        width: 50px;
        padding: 4px;
    }

    @media (max-width: 480px) {
        width: 40px;    
        padding: 2px;
    }
`;
export const Button_Icon_Blue_40 = styled.button.withConfig({
    shouldForwardProp: (prop) => prop !== 'ThemeMode',
})`
    width: 40px;
    height: auto;
    padding: 6px;
    border-radius: 10px;
    border: ${({ ThemeMode }) => (ThemeMode ? '2px solid black' : '2px solid white')};
    background-color: ${({ ThemeMode }) => (ThemeMode ? 'rgb(58,93,174)' : 'rgb(82, 126, 231)')};
    text-align: center;
    box-sizing: border-box;
    cursor: pointer;
    transition: background-color 0.3s, transform 0.3s;
    
    &:hover {
        background-color: ${({ ThemeMode }) => (ThemeMode ? 'rgb(12, 54, 109)' : 'rgb(58,93,174)')};
        transform: scale(1.1);
    }

    @media (max-width: 768px) {
        width: 35px;
        padding: 4px;
    }

    @media (max-width: 480px) {
        width: 30px;    
        padding: 2px;
    }
`;
export const Button_Icon_Blue_40x100 = styled.button.withConfig({
    shouldForwardProp: (prop) => prop !== 'ThemeMode',
})`
    width: 40px;
    height: 100px;
    padding: 6px;
    border-radius: 10px;
    border: ${({ ThemeMode }) => (ThemeMode ? '2px solid black' : '2px solid white')};
    background-color: ${({ ThemeMode }) => (ThemeMode ? 'rgb(58,93,174)' : 'rgb(82, 126, 231)')};
    text-align: center;
    box-sizing: border-box;
    cursor: pointer;
    transition: background-color 0.3s, transform 0.3s;
    
    &:hover {
        background-color: ${({ ThemeMode }) => (ThemeMode ? 'rgb(12, 54, 109)' : 'rgb(58,93,174)')};
        transform: scale(1.1);
    }

    @media (max-width: 768px) {
        width: 35px;
        padding: 4px;
    }

    @media (max-width: 480px) {
        width: 30px;    
        padding: 2px;
    }
`;
// Color Verde
export const Button_Icon_Green_220 = styled.button.withConfig({
    shouldForwardProp: (prop) => prop !== 'ThemeMode',
})`
    width: 220px;
    height: auto;
    padding: 6px;
    border-radius: 25px;
    border: ${({ ThemeMode }) => (ThemeMode ? '2px solid black' : '2px solid white')};
    background-color: ${({ ThemeMode }) => (ThemeMode ? 'rgb(20, 165, 76)' : 'rgb(60, 188, 109)')};
    text-align: center;
    box-sizing: border-box;
    cursor: pointer;
    transition: background-color 0.3s, transform 0.3s;
    
    &:hover {
        background-color: ${({ ThemeMode }) => (ThemeMode ? 'rgb(13, 112, 51)' : 'rgb(20, 165, 76)')};
        transform: scale(1.1);
    }

    @media (max-width: 768px) {
        width: 190px;
        padding: 4px;
    }

    @media (max-width: 480px) {
        width: 160px;    
        padding: 2px;
    }
`;
export const Button_Icon_Green_200 = styled.button.withConfig({
    shouldForwardProp: (prop) => prop !== 'ThemeMode',
})`
    width: 200px;
    height: auto;
    padding: 6px;
    padding-left: 20px;
    border-radius: 25px;
    border: ${({ ThemeMode }) => (ThemeMode ? '2px solid black' : '2px solid white')};
    background-color: ${({ ThemeMode }) => (ThemeMode ? 'rgb(20, 165, 76)' : 'rgb(60, 188, 109)')};
    display: flex;
    align-items: center;
    justify-content: space-between;
    box-sizing: border-box;
    cursor: pointer;
    transition: background-color 0.3s, transform 0.3s;
    
    &:hover {
        background-color: ${({ ThemeMode }) => (ThemeMode ? 'rgb(13, 112, 51)' : 'rgb(20, 165, 76)')};
        transform: scale(1.1);
    }

    @media (max-width: 768px) {
        width: 170px;
        padding: 4px;
    }

    @media (max-width: 480px) {
        width: 140px;    
        padding: 2px;
    }
`;
export const Button_Icon_Green_190 = styled.button.withConfig({
    shouldForwardProp: (prop) => prop !== 'ThemeMode',
})`
    width: 190px;
    height: auto;
    padding: 6px;
    border-radius: 25px;
    border: ${({ ThemeMode }) => (ThemeMode ? '2px solid black' : '2px solid white')};
    background-color: ${({ ThemeMode }) => (ThemeMode ? 'rgb(20, 165, 76)' : 'rgb(60, 188, 109)')};
    text-align: center;
    box-sizing: border-box;
    cursor: pointer;
    transition: background-color 0.3s, transform 0.3s;
    
    &:hover {
        background-color: ${({ ThemeMode }) => (ThemeMode ? 'rgb(13, 112, 51)' : 'rgb(20, 165, 76)')};
        transform: scale(1.1);
    }

    @media (max-width: 768px) {
        width: 160px;
        padding: 4px;
    }

    @media (max-width: 480px) {
        width: 130px;    
        padding: 2px;
    }
`;
export const Button_Icon_Green_180 = styled.button.withConfig({
    shouldForwardProp: (prop) => prop !== 'ThemeMode',
})`
    width: 180px;
    height: auto;
    padding: 6px;
    border-radius: 25px;
    border: ${({ ThemeMode }) => (ThemeMode ? '2px solid black' : '2px solid white')};
    background-color: ${({ ThemeMode }) => (ThemeMode ? 'rgb(20, 165, 76)' : 'rgb(60, 188, 109)')};
    text-align: center;
    box-sizing: border-box;
    cursor: pointer;
    transition: background-color 0.3s, transform 0.3s;
    
    &:hover {
        background-color: ${({ ThemeMode }) => (ThemeMode ? 'rgb(13, 112, 51)' : 'rgb(20, 165, 76)')};
        transform: scale(1.1);
    }

    @media (max-width: 768px) {
        width: 150px;
        padding: 4px;
    }

    @media (max-width: 480px) {
        width: 120px;    
        padding: 2px;
    }
`;
export const Button_Icon_Green_170 = styled.button.withConfig({
    shouldForwardProp: (prop) => prop !== 'ThemeMode',
})`
    width: 170px;
    height: auto;
    padding: 6px;
    border-radius: 25px;
    border: ${({ ThemeMode }) => (ThemeMode ? '2px solid black' : '2px solid white')};
    background-color: ${({ ThemeMode }) => (ThemeMode ? 'rgb(20, 165, 76)' : 'rgb(60, 188, 109)')};
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
        padding: 4px;
    }

    @media (max-width: 480px) {
        width: 110px;    
        padding: 2px;
    }
`;
export const Button_Icon_Green_160 = styled.button.withConfig({
    shouldForwardProp: (prop) => prop !== 'ThemeMode',
})`
    width: 160px;
    height: auto;
    padding: 6px;
    border-radius: 25px;
    border: ${({ ThemeMode }) => (ThemeMode ? '2px solid black' : '2px solid white')};
    background-color: ${({ ThemeMode }) => (ThemeMode ? 'rgb(20, 165, 76)' : 'rgb(60, 188, 109)')};
    text-align: center;
    box-sizing: border-box;
    cursor: pointer;
    transition: background-color 0.3s, transform 0.3s;
    
    &:hover {
        background-color: ${({ ThemeMode }) => (ThemeMode ? 'rgb(13, 112, 51)' : 'rgb(20, 165, 76)')};
        transform: scale(1.1);
    }

    @media (max-width: 768px) {
        width: 130px;
        padding: 4px;
    }

    @media (max-width: 480px) {
        width: 100px;    
        padding: 2px;
    }
`;
export const Button_Icon_Green_150 = styled.button.withConfig({
    shouldForwardProp: (prop) => prop !== 'ThemeMode',
})`
    width: 150px;
    height: auto;
    padding: 6px;
    border-radius: 25px;
    border: ${({ ThemeMode }) => (ThemeMode ? '2px solid black' : '2px solid white')};
    background-color: ${({ ThemeMode }) => (ThemeMode ? 'rgb(20, 165, 76)' : 'rgb(60, 188, 109)')};
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
        padding: 4px;
    }

    @media (max-width: 480px) {
        width: 90px;    
        padding: 2px;
    }
`;
export const Button_Icon_Green_140 = styled.button.withConfig({
    shouldForwardProp: (prop) => prop !== 'ThemeMode',
})`
    width: 140px;
    height: auto;
    padding: 6px;
    border-radius: 25px;
    border: ${({ ThemeMode }) => (ThemeMode ? '2px solid black' : '2px solid white')};
    background-color: ${({ ThemeMode }) => (ThemeMode ? 'rgb(20, 165, 76)' : 'rgb(60, 188, 109)')};
    text-align: center;
    box-sizing: border-box;
    cursor: pointer;
    transition: background-color 0.3s, transform 0.3s;
    
    &:hover {
        background-color: ${({ ThemeMode }) => (ThemeMode ? 'rgb(13, 112, 51)' : 'rgb(20, 165, 76)')};
        transform: scale(1.1);
    }

    @media (max-width: 768px) {
        width: 110px;
        padding: 4px;
    }

    @media (max-width: 480px) {
        width: 80px;    
        padding: 2px;
    }
`;
export const Button_Icon_Green_120 = styled.button.withConfig({
    shouldForwardProp: (prop) => prop !== 'ThemeMode',
})`
    width: 120px;
    height: auto;
    padding: 6px;
    border-radius: 25px;
    border: ${({ ThemeMode }) => (ThemeMode ? '2px solid black' : '2px solid white')};
    background-color: ${({ ThemeMode }) => (ThemeMode ? 'rgb(20, 165, 76)' : 'rgb(60, 188, 109)')};
    text-align: center;
    box-sizing: border-box;
    cursor: pointer;
    transition: background-color 0.3s, transform 0.3s;
    
    &:hover {
        background-color: ${({ ThemeMode }) => (ThemeMode ? 'rgb(13, 112, 51)' : 'rgb(20, 165, 76)')};
        transform: scale(1.1);
    }

    @media (max-width: 768px) {
        width: 100px;
        padding: 4px;
    }

    @media (max-width: 480px) {
        width: 80px;    
        padding: 2px;
    }
`;
export const Button_Icon_Green_100 = styled.button.withConfig({
    shouldForwardProp: (prop) => prop !== 'ThemeMode',
})`
    width: 100px;
    height: auto;
    padding: 6px;
    border-radius: 25px;
    border: ${({ ThemeMode }) => (ThemeMode ? '2px solid black' : '2px solid white')};
    background-color: ${({ ThemeMode }) => (ThemeMode ? 'rgb(20, 165, 76)' : 'rgb(60, 188, 109)')};
    text-align: center;
    box-sizing: border-box;
    cursor: pointer;
    transition: background-color 0.3s, transform 0.3s;
    
    &:hover {
        background-color: ${({ ThemeMode }) => (ThemeMode ? 'rgb(13, 112, 51)' : 'rgb(20, 165, 76)')};
        transform: scale(1.1);
    }

    @media (max-width: 768px) {
        width: 80px;
        padding: 4px;
    }

    @media (max-width: 480px) {
        width: 60px;    
        padding: 2px;
    }
`;
export const Button_Icon_Green_80 = styled.button.withConfig({
    shouldForwardProp: (prop) => prop !== 'ThemeMode',
})`
    width: 80px;
    height: auto;
    padding: 6px;
    border-radius: 25px;
    border: ${({ ThemeMode }) => (ThemeMode ? '2px solid black' : '2px solid white')};
    background-color: ${({ ThemeMode }) => (ThemeMode ? 'rgb(20, 165, 76)' : 'rgb(60, 188, 109)')};
    text-align: center;
    box-sizing: border-box;
    cursor: pointer;
    transition: background-color 0.3s, transform 0.3s;
    
    &:hover {
        background-color: ${({ ThemeMode }) => (ThemeMode ? 'rgb(13, 112, 51)' : 'rgb(20, 165, 76)')};
        transform: scale(1.1);
    }

    @media (max-width: 768px) {
        width: 70px;
        padding: 4px;
    }

    @media (max-width: 480px) {
        width: 60px;    
        padding: 2px;
    }
`;
export const Button_Icon_Green_60 = styled.button.withConfig({
    shouldForwardProp: (prop) => prop !== 'ThemeMode',
})`
    width: 60px;
    height: auto;
    padding: 6px;
    border-radius: 25px;
    border: ${({ ThemeMode }) => (ThemeMode ? '2px solid black' : '2px solid white')};
    background-color: ${({ ThemeMode }) => (ThemeMode ? 'rgb(20, 165, 76)' : 'rgb(60, 188, 109)')};
    text-align: center;
    box-sizing: border-box;
    cursor: pointer;
    transition: background-color 0.3s, transform 0.3s;
    
    &:hover {
        background-color: ${({ ThemeMode }) => (ThemeMode ? 'rgb(13, 112, 51)' : 'rgb(20, 165, 76)')};
        transform: scale(1.1);
    }

    @media (max-width: 768px) {
        width: 50px;
        padding: 4px;
    }

    @media (max-width: 480px) {
        width: 40px;    
        padding: 2px;
    }
`;
export const Button_Icon_Green_40 = styled.button.withConfig({
    shouldForwardProp: (prop) => prop !== 'ThemeMode',
})`
    width: 40px;
    height: auto;
    padding: 6px;
    border-radius: 10px;
    border: ${({ ThemeMode }) => (ThemeMode ? '2px solid black' : '2px solid white')};
    background-color: ${({ ThemeMode }) => (ThemeMode ? 'rgb(20, 165, 76)' : 'rgb(60, 188, 109)')};
    text-align: center;
    box-sizing: border-box;
    cursor: pointer;
    transition: background-color 0.3s, transform 0.3s;
    
    &:hover {
        background-color: ${({ ThemeMode }) => (ThemeMode ? 'rgb(13, 112, 51)' : 'rgb(20, 165, 76)')};
        transform: scale(1.1);
    }

    @media (max-width: 768px) {
        width: 35px;
        padding: 4px;
    }

    @media (max-width: 480px) {
        width: 30px;    
        padding: 2px;
    }
`;
// Color Rojo
export const Button_Icon_Red_220 = styled.button.withConfig({
    shouldForwardProp: (prop) => prop !== 'ThemeMode',
})`
    width: 220px;
    height: auto;
    padding: 6px;
    border-radius: 25px;
    border: ${({ ThemeMode }) => (ThemeMode ? '2px solid black' : '2px solid white')};
    background-color: ${({ ThemeMode }) => (ThemeMode ? 'rgb(155, 9, 9)' : 'rgb(208, 31, 31)')};
    text-align: center;
    box-sizing: border-box;
    cursor: pointer;
    transition: background-color 0.3s, transform 0.3s;
    
    &:hover {
        background-color: ${({ ThemeMode }) => (ThemeMode ? 'rgb(100, 15, 15)' : 'rgb(155, 9, 9)')};
        transform: scale(1.1);
    }

    @media (max-width: 768px) {
        width: 190px;
        padding: 4px;
    }

    @media (max-width: 480px) {
        width: 160px;    
        padding: 2px;
    }
`;
export const Button_Icon_Red_200 = styled.button.withConfig({
    shouldForwardProp: (prop) => prop !== 'ThemeMode',
})`
    width: 200px;
    height: auto;
    padding: 6px;
    padding-left: 20px;
    border-radius: 25px;
    border: ${({ ThemeMode }) => (ThemeMode ? '2px solid black' : '2px solid white')};
    background-color: ${({ ThemeMode }) => (ThemeMode ? 'rgb(155, 9, 9)' : 'rgb(208, 31, 31)')};
    display: flex;
    align-items: center;
    justify-content: space-between;
    box-sizing: border-box;
    cursor: pointer;
    transition: background-color 0.3s, transform 0.3s;
    
    &:hover {
        background-color: ${({ ThemeMode }) => (ThemeMode ? 'rgb(100, 15, 15)' : 'rgb(155, 9, 9)')};
        transform: scale(1.1);
    }

    @media (max-width: 768px) {
        width: 170px;
        padding: 4px;
    }

    @media (max-width: 480px) {
        width: 140px;    
        padding: 2px;
    }
`;
export const Button_Icon_Red_190 = styled.button.withConfig({
    shouldForwardProp: (prop) => prop !== 'ThemeMode',
})`
    width: 190px;
    height: auto;
    padding: 6px;
    border-radius: 25px;
    border: ${({ ThemeMode }) => (ThemeMode ? '2px solid black' : '2px solid white')};
    background-color: ${({ ThemeMode }) => (ThemeMode ? 'rgb(155, 9, 9)' : 'rgb(208, 31, 31)')};
    text-align: center;
    box-sizing: border-box;
    cursor: pointer;
    transition: background-color 0.3s, transform 0.3s;
    
    &:hover {
        background-color: ${({ ThemeMode }) => (ThemeMode ? 'rgb(100, 15, 15)' : 'rgb(155, 9, 9)')};
        transform: scale(1.1);
    }

    @media (max-width: 768px) {
        width: 160px;
        padding: 4px;
    }

    @media (max-width: 480px) {
        width: 130px;    
        padding: 2px;
    }
`;
export const Button_Icon_Red_180 = styled.button.withConfig({
    shouldForwardProp: (prop) => prop !== 'ThemeMode',
})`
    width: 180px;
    height: auto;
    padding: 6px;
    border-radius: 25px;
    border: ${({ ThemeMode }) => (ThemeMode ? '2px solid black' : '2px solid white')};
    background-color: ${({ ThemeMode }) => (ThemeMode ? 'rgb(155, 9, 9)' : 'rgb(208, 31, 31)')};
    text-align: center;
    box-sizing: border-box;
    cursor: pointer;
    transition: background-color 0.3s, transform 0.3s;
    
    &:hover {
        background-color: ${({ ThemeMode }) => (ThemeMode ? 'rgb(100, 15, 15)' : 'rgb(155, 9, 9)')};
        transform: scale(1.1);
    }

    @media (max-width: 768px) {
        width: 150px;
        padding: 4px;
    }

    @media (max-width: 480px) {
        width: 120px;    
        padding: 2px;
    }
`;
export const Button_Icon_Red_170 = styled.button.withConfig({
    shouldForwardProp: (prop) => prop !== 'ThemeMode',
})`
    width: 170px;
    height: auto;
    padding: 6px;
    border-radius: 25px;
    border: ${({ ThemeMode }) => (ThemeMode ? '2px solid black' : '2px solid white')};
    background-color: ${({ ThemeMode }) => (ThemeMode ? 'rgb(155, 9, 9)' : 'rgb(208, 31, 31)')};
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
        padding: 4px;
    }

    @media (max-width: 480px) {
        width: 110px;    
        padding: 2px;
    }
`;
export const Button_Icon_Red_160 = styled.button.withConfig({
    shouldForwardProp: (prop) => prop !== 'ThemeMode',
})`
    width: 160px;
    height: auto;
    padding: 6px;
    border-radius: 25px;
    border: ${({ ThemeMode }) => (ThemeMode ? '2px solid black' : '2px solid white')};
    background-color: ${({ ThemeMode }) => (ThemeMode ? 'rgb(155, 9, 9)' : 'rgb(208, 31, 31)')};
    text-align: center;
    box-sizing: border-box;
    cursor: pointer;
    transition: background-color 0.3s, transform 0.3s;
    
    &:hover {
        background-color: ${({ ThemeMode }) => (ThemeMode ? 'rgb(100, 15, 15)' : 'rgb(155, 9, 9)')};
        transform: scale(1.1);
    }

    @media (max-width: 768px) {
        width: 130px;
        padding: 4px;
    }

    @media (max-width: 480px) {
        width: 100px;    
        padding: 2px;
    }
`;
export const Button_Icon_Red_150 = styled.button.withConfig({
    shouldForwardProp: (prop) => prop !== 'ThemeMode',
})`
    width: 150px;
    height: auto;
    padding: 6px;
    border-radius: 25px;
    border: ${({ ThemeMode }) => (ThemeMode ? '2px solid black' : '2px solid white')};
    background-color: ${({ ThemeMode }) => (ThemeMode ? 'rgb(155, 9, 9)' : 'rgb(208, 31, 31)')};
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
        padding: 4px;
    }

    @media (max-width: 480px) {
        width: 90px;    
        padding: 2px;
    }
`;
export const Button_Icon_Red_140 = styled.button.withConfig({
    shouldForwardProp: (prop) => prop !== 'ThemeMode',
})`
    width: 140px;
    height: auto;
    padding: 6px;
    border-radius: 25px;
    border: ${({ ThemeMode }) => (ThemeMode ? '2px solid black' : '2px solid white')};
    background-color: ${({ ThemeMode }) => (ThemeMode ? 'rgb(155, 9, 9)' : 'rgb(208, 31, 31)')};
    text-align: center;
    box-sizing: border-box;
    cursor: pointer;
    transition: background-color 0.3s, transform 0.3s;
    
    &:hover {
        background-color: ${({ ThemeMode }) => (ThemeMode ? 'rgb(100, 15, 15)' : 'rgb(155, 9, 9)')};
        transform: scale(1.1);
    }

    @media (max-width: 768px) {
        width: 110px;
        padding: 4px;
    }

    @media (max-width: 480px) {
        width: 80px;    
        padding: 2px;
    }
`;
export const Button_Icon_Red_120 = styled.button.withConfig({
    shouldForwardProp: (prop) => prop !== 'ThemeMode',
})`
    width: 120px;
    height: auto;
    padding: 6px;
    border-radius: 25px;
    border: ${({ ThemeMode }) => (ThemeMode ? '2px solid black' : '2px solid white')};
    background-color: ${({ ThemeMode }) => (ThemeMode ? 'rgb(155, 9, 9)' : 'rgb(208, 31, 31)')};
    text-align: center;
    box-sizing: border-box;
    cursor: pointer;
    transition: background-color 0.3s, transform 0.3s;
    
    &:hover {
        background-color: ${({ ThemeMode }) => (ThemeMode ? 'rgb(100, 15, 15)' : 'rgb(155, 9, 9)')};
        transform: scale(1.1);
    }

    @media (max-width: 768px) {
        width: 100px;
        padding: 4px;
    }

    @media (max-width: 480px) {
        width: 80px;    
        padding: 2px;
    }
`;
export const Button_Icon_Red_100 = styled.button.withConfig({
    shouldForwardProp: (prop) => prop !== 'ThemeMode',
})`
    width: 100px;
    height: auto;
    padding: 6px;
    border-radius: 25px;
    border: ${({ ThemeMode }) => (ThemeMode ? '2px solid black' : '2px solid white')};
    background-color: ${({ ThemeMode }) => (ThemeMode ? 'rgb(155, 9, 9)' : 'rgb(208, 31, 31)')};
    text-align: center;
    box-sizing: border-box;
    cursor: pointer;
    transition: background-color 0.3s, transform 0.3s;
    
    &:hover {
        background-color: ${({ ThemeMode }) => (ThemeMode ? 'rgb(100, 15, 15)' : 'rgb(155, 9, 9)')};
        transform: scale(1.1);
    }

    @media (max-width: 768px) {
        width: 80px;
        padding: 4px;
    }

    @media (max-width: 480px) {
        width: 60px;    
        padding: 2px;
    }
`;
export const Button_Icon_Red_80 = styled.button.withConfig({
    shouldForwardProp: (prop) => prop !== 'ThemeMode',
})`
    width: 80px;
    height: auto;
    padding: 6px;
    border-radius: 25px;
    border: ${({ ThemeMode }) => (ThemeMode ? '2px solid black' : '2px solid white')};
    background-color: ${({ ThemeMode }) => (ThemeMode ? 'rgb(155, 9, 9)' : 'rgb(208, 31, 31)')};
    text-align: center;
    box-sizing: border-box;
    cursor: pointer;
    transition: background-color 0.3s, transform 0.3s;
    
    &:hover {
        background-color: ${({ ThemeMode }) => (ThemeMode ? 'rgb(100, 15, 15)' : 'rgb(155, 9, 9)')};
        transform: scale(1.1);
    }

    @media (max-width: 768px) {
        width: 70px;
        padding: 4px;
    }

    @media (max-width: 480px) {
        width: 60px;    
        padding: 2px;
    }
`;
export const Button_Icon_Red_60 = styled.button.withConfig({
    shouldForwardProp: (prop) => prop !== 'ThemeMode',
})`
    width: 60px;
    height: auto;
    padding: 6px;
    border-radius: 25px;
    border: ${({ ThemeMode }) => (ThemeMode ? '2px solid black' : '2px solid white')};
    background-color: ${({ ThemeMode }) => (ThemeMode ? 'rgb(155, 9, 9)' : 'rgb(208, 31, 31)')};
    text-align: center;
    box-sizing: border-box;
    cursor: pointer;
    transition: background-color 0.3s, transform 0.3s;
    
    &:hover {
        background-color: ${({ ThemeMode }) => (ThemeMode ? 'rgb(100, 15, 15)' : 'rgb(155, 9, 9)')};
        transform: scale(1.1);
    }

    @media (max-width: 768px) {
        width: 50px;
        padding: 4px;
    }

    @media (max-width: 480px) {
        width: 40px;    
        padding: 2px;
    }
`;
export const Button_Icon_Red_40 = styled.button.withConfig({
    shouldForwardProp: (prop) => prop !== 'ThemeMode',
})`
    width: 40px;
    height: auto;
    padding: 6px;
    border-radius: 10px;
    border: ${({ ThemeMode }) => (ThemeMode ? '2px solid black' : '2px solid white')};
    background-color: ${({ ThemeMode }) => (ThemeMode ? 'rgb(155, 9, 9)' : 'rgb(208, 31, 31)')};
    text-align: center;
    box-sizing: border-box;
    cursor: pointer;
    transition: background-color 0.3s, transform 0.3s;
    
    &:hover {
        background-color: ${({ ThemeMode }) => (ThemeMode ? 'rgb(100, 15, 15)' : 'rgb(155, 9, 9)')};
        transform: scale(1.1);
    }

    @media (max-width: 768px) {
        width: 35px;
        padding: 4px;
    }

    @media (max-width: 480px) {
        width: 30px;    
        padding: 2px;
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
    height: auto;
    padding: 6px;
    border-radius: 25px;
    border: ${({ ThemeMode }) => (ThemeMode ? '2px solid black' : '2px solid white')};
    background-color: ${({ ThemeMode }) => (ThemeMode ? 'rgb(155, 9, 9)' : 'rgb(208, 31, 31)')};
    color: white;
    text-align: center;
    box-sizing: border-box;
    cursor: not-allowed;
    pointer-events: none;
    transition: background-color 0.3s, transform 0.3s;
    
    &:hover {
        background-color: ${({ ThemeMode }) => (ThemeMode ? 'rgb(100, 15, 15)' : 'rgb(155, 9, 9)')};
        transform: scale(1.1);
    }

    @media (max-width: 768px) {
        width: 120px;
        padding: 4px;
    }

    @media (max-width: 480px) {
        width: 90px;    
        padding: 2px;
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
//____________LINK____________
export const Button_Link_Blue = styled.button`
    width: auto;
    padding: 6px;
    background-color: transparent;
    color: rgb(58,93,174);
    border: none;
    text-align: center;
    cursor: pointer;
    box-sizing: border-box;
    
    &:hover {
        color: rgb(82, 126, 231);
        transform: translateY(-2px);
        text-decoration: underline;
        transform: scale(1.2);
    }

    @media (max-width: 768px) {
        padding: 4px;
    }

    @media (max-width: 480px) {
        padding: 2px;
    }
`;
//____________LINK____________

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