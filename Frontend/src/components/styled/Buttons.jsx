import styled from 'styled-components';

//____________ICON____________
export const Button_Icon_Dark = styled.button`
    position: absolute;
    top: 15px;
    right: 50px;
    width: 30px;
    padding: 6px;
    font-size: 30px;
    background-color: transparent;
    color: white;
    border: none;
    text-align: center;
    cursor: pointer;
    transition: background-color 0.3s, transform 0.3s;
    box-sizing: border-box;
    z-index: 2000;
    
    &:hover {
        transform: scale(1.1);
    }

    @media (max-width: 768px) {
        padding: 4px;
        width: 25px;
        font-size: 25px;
    }

    @media (max-width: 480px) {
        padding: 2px;
        width: 20px;
        font-size: 20px;
    }
`;
export const Button_Icon_Light = styled.button`
    position: absolute;
    top: 15px;
    right: 50px;
    width: 30px;
    padding: 6px;
    font-size: 30px;
    background-color: transparent;
    color: black;
    border: none;
    text-align: center;
    cursor: pointer;
    transition: background-color 0.3s, transform 0.3s;
    box-sizing: border-box;
    z-index: 2000;
    
    &:hover {
        transform: scale(1.1);
    }

    @media (max-width: 768px) {
        padding: 4px;
        width: 25px;
        font-size: 25px;
    }

    @media (max-width: 480px) {
        padding: 2px;
        width: 20px;
        font-size: 20px;
    }
`;
export const Button_Icon_Toggle_Dark = styled.button`   
    width: 50%;
    font-size: 30px;
    border-radius: 50px;
    background-color:rgb(82, 126, 231);
    color: white;
    border: 2px solid white;
    text-align: center;
    cursor: pointer;
    transition: background-color 0.3s, transform 0.3s;
    box-sizing: border-box;
    z-index: 30;

    &:hover {
        background-color: rgb(58,93,174);
        transform: scale(1.1);
    }

    @media (max-width: 768px) {
        font-size: 20px;
    }

    @media (max-width: 480px) {
        font-size: 12px;
    }
`;
export const Button_Icon_Toggle_Light = styled.button`   
    width: 50%;
    font-size: 30px;
    border-radius: 50px;
    background-color: rgb(58,93,174);
    color: white;
    border: 2px solid black;
    text-align: center;
    cursor: pointer;
    transition: background-color 0.3s, transform 0.3s;
    box-sizing: border-box;
    z-index: 30;

    &:hover {
        background-color: rgb(12, 54, 109);
        transform: scale(1.1);
    }

    @media (max-width: 768px) {
        font-size: 20px;
    }

    @media (max-width: 480px) {
        font-size: 12px;
    }
`;
export const Button_Icon_Logout_Dark = styled.button`
    width: 50%;
    padding: 6px;
    font-size: 20px;
    border-radius: 50px;
    background-color: rgb(82, 126, 231);
    color: white;
    border: 2px solid white;
    text-align: center;
    cursor: pointer;
    transition: background-color 0.3s, transform 0.3s;
    box-sizing: border-box;
    z-index: 30;

    &:hover {
        background-color: rgb(208, 31, 31);
        transform: scale(1.1);
    }

    @media (max-width: 768px) {
        padding: 4px;
        font-size: 15px;
    }

    @media (max-width: 480px) {
        padding: 2px;
        font-size: 10px;
    }
`;
export const Button_Icon_Logout_Light = styled.button`
    width: 50%;
    padding: 6px;
    font-size: 20px;
    border-radius: 50px;
    background-color: rgb(58,93,174);
    color: white;
    border: 2px solid black;
    text-align: center;
    cursor: pointer;
    transition: background-color 0.3s, transform 0.3s;
    box-sizing: border-box;
    z-index: 30;

    &:hover {
        background-color: rgb(155, 9, 9);
        transform: scale(1.1);
    }

    @media (max-width: 768px) {
        padding: 4px;
        font-size: 15px;
    }

    @media (max-width: 480px) {
        padding: 2px;
        font-size: 10px;
    }
`;
export const Button_Icon_Blue_50_Dark = styled.button`
    width: 50%;
    padding: 6px;
    font-size: 30px;
    border-radius: 50px;
    background-color: rgb(82, 126, 231);
    color: white;
    border: 2px solid white;
    text-align: center;
    cursor: pointer;
    transition: background-color 0.3s, transform 0.3s;
    box-sizing: border-box;
    
    &:hover {
        background-color:rgb(58,93,174);
        transform: scale(1.1);
    }

    @media (max-width: 768px) {
        padding: 4px;
        font-size: 25px;
    }

    @media (max-width: 480px) {
        padding: 2px;
        font-size: 20px;
    }
`;
export const Button_Icon_Blue_50_Light = styled.button`
    width: 50%;
    padding: 6px;
    font-size: 30px;
    border-radius: 50px;
    background-color: rgb(58,93,174);
    color: white;
    border: 2px solid black;
    text-align: center;
    cursor: pointer;
    transition: background-color 0.3s, transform 0.3s;
    box-sizing: border-box;
    
    &:hover {
        background-color: rgb(12, 54, 109);
        transform: scale(1.1);
    }

    @media (max-width: 768px) {
        padding: 4px;
        font-size: 25px;
    }

    @media (max-width: 480px) {
        padding: 2px;
        font-size: 20px;
    }
`;
export const Button_Icon_Blue_80_Dark = styled.button`
    width: 80%;
    padding: 6px;
    font-size: 30px;
    border-radius: 50px;
    background-color: rgb(82, 126, 231);
    color: white;
    border: 2px solid white;
    text-align: center;
    cursor: pointer;
    transition: background-color 0.3s, transform 0.3s;
    box-sizing: border-box;
    
    &:hover {
        background-color:rgb(58,93,174);
        transform: scale(1.1);
    }

    @media (max-width: 768px) {
        padding: 4px;
        font-size: 25px;
    }

    @media (max-width: 480px) {
        padding: 4px;
        font-size: 20px;
    }
`;
export const Button_Icon_Blue_80_Light = styled.button`
    width: 80%;
    padding: 6px;
    font-size: 30px;
    border-radius: 50px;
    background-color: rgb(58,93,174);
    color: white;
    border: 2px solid black;
    text-align: center;
    cursor: pointer;
    transition: background-color 0.3s, transform 0.3s;
    box-sizing: border-box;
    
    &:hover {
        background-color: rgb(12, 54, 109);
        transform: scale(1.1);
    }

    @media (max-width: 768px) {
        padding: 4px;
        font-size: 25px;
    }

    @media (max-width: 480px) {
        padding: 2px;
        font-size: 20px;
    }
`;
export const Button_Icon_Blue_95_Dark = styled.button`
    width: 95%;
    padding: 6px;
    font-size: 25px;
    border-radius: 50px;
    background-color: rgb(82, 126, 231);
    color: white;
    border: 2px solid white;
    text-align: center;
    cursor: pointer;
    transition: background-color 0.3s, transform 0.3s;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: space-between;

    &:hover {
        background-color: rgb(58,93,174);
        transform: scale(1.1);
    }

    @media (max-width: 768px) {
        padding: 4px;
        font-size: 25px;
    }

    @media (max-width: 480px) {
        padding: 2px;
        font-size: 20px;
    }
`;
export const Button_Icon_Blue_95_Light = styled.button`
    width: 95%;
    padding: 6px;
    font-size: 25px;
    border-radius: 50px;
    background-color: rgb(58,93,174);
    color: white;
    border: 2px solid black;
    text-align: center;
    cursor: pointer;
    transition: background-color 0.3s, transform 0.3s;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: space-between;

    &:hover {
        background-color: rgb(12, 54, 109);
        transform: scale(1.1);
    }

    @media (max-width: 768px) {
        padding: 4px;
        font-size: 25px;
    }

    @media (max-width: 480px) {
        padding: 2px;
        font-size: 20px;
    }
`;
export const Button_Icon_Red_50_Dark = styled.button`
    width: 50%;
    padding: 6px;
    font-size: 30px;
    border-radius: 50px;
    background-color: rgb(208, 31, 31);
    color: white;
    border: 2px solid white;
    text-align: center;
    cursor: pointer;
    transition: background-color 0.3s, transform 0.3s;
    box-sizing: border-box;
    
    &:hover {
        background-color:rgb(155, 9, 9);
        transform: scale(1.1);
    }

    @media (max-width: 768px) {
        padding: 4px;
        font-size: 25px;
    }

    @media (max-width: 480px) {
        padding: 2px;
        font-size: 20px;
    }
`;
export const Button_Icon_Red_50_Light = styled.button`
    width: 50%;
    padding: 6px;
    font-size: 30px;
    border-radius: 50px;
    background-color:rgb(155, 9, 9);
    color: white;
    border: 2px solid black;
    text-align: center;
    cursor: pointer;
    transition: background-color 0.3s, transform 0.3s;
    box-sizing: border-box;
    
    &:hover {
        background-color: rgb(100, 15, 15);
        transform: scale(1.1);
    }

    @media (max-width: 768px) {
        padding: 4px;
        font-size: 25px;
    }

    @media (max-width: 480px) {
        padding: 2px;
        font-size: 20px;
    }
`;
export const Button_Icon_Red_80_Dark = styled.button`
    width: 80%;
    padding: 6px;
    font-size: 30px;
    border-radius: 50px;
    background-color: rgb(208, 31, 31);
    color: white;
    border: 2px solid white;
    text-align: center;
    cursor: pointer;
    transition: background-color 0.3s, transform 0.3s;
    box-sizing: border-box;
    
    &:hover {
        background-color:rgb(155, 9, 9);
        transform: scale(1.1);
    }

    @media (max-width: 768px) {
        padding: 4px;
        font-size: 25px;
    }

    @media (max-width: 480px) {
        padding: 2px;
        font-size: 20px;
    }
`;
export const Button_Icon_Red_80_Light = styled.button`
    width: 80%;
    padding: 6px;
    font-size: 30px;
    border-radius: 50px;
    background-color:rgb(155, 9, 9);
    color: white;
    border: 2px solid black;
    text-align: center;
    cursor: pointer;
    transition: background-color 0.3s, transform 0.3s;
    box-sizing: border-box;
    
    &:hover {
        background-color:rgb(100, 15, 15);
        transform: scale(1.1);
    }

    @media (max-width: 768px) {
        padding: 4px;
        font-size: 25px;
    }

    @media (max-width: 480px) {
        padding: 2px;
        font-size: 20px;
    }
`;
export const Button_Icon_Green_50_Dark = styled.button`
    width: 50%;
    padding: 6px;
    font-size: 30px;
    border-radius: 50px;
    background-color: rgb(60, 188, 109);
    color: white;
    border: 2px solid white;
    text-align: center;
    cursor: pointer;
    transition: background-color 0.3s, transform 0.3s;
    box-sizing: border-box;
    
    &:hover {
        background-color:rgb(20, 165, 76);
        transform: scale(1.1);
    }

    @media (max-width: 768px) {
        padding: 4px;
        font-size: 25px;
    }

    @media (max-width: 480px) {
        padding: 2px;
        font-size: 20px;
    }
`;
export const Button_Icon_Green_50_Light = styled.button`
    width: 50%;
    padding: 6px;
    font-size: 30px;
    border-radius: 50px;
    background-color:rgb(20, 165, 76);
    color: white;
    border: 2px solid black;
    text-align: center;
    cursor: pointer;
    transition: background-color 0.3s, transform 0.3s;
    box-sizing: border-box;
    
    &:hover {
        background-color:rgb(13, 112, 51);
        transform: scale(1.1);
    }

    @media (max-width: 768px) {
        padding: 4px;
        font-size: 25px;
    }

    @media (max-width: 480px) {
        padding: 2px;
        font-size: 20px;
    }
`;
export const Button_Icon_Green_80_Dark = styled.button`
    width: 80%;
    padding: 6px;
    font-size: 30px;
    border-radius: 50px;
    background-color: rgb(60, 188, 109);
    color: white;
    border: 2px solid white;
    text-align: center;
    cursor: pointer;
    transition: background-color 0.3s, transform 0.3s;
    box-sizing: border-box;
    
    &:hover {
        background-color:rgb(20, 165, 76);
        transform: scale(1.1);
    }

    @media (max-width: 768px) {
        padding: 4px;
        font-size: 25px;
    }

    @media (max-width: 480px) {
        padding: 2px;
        font-size: 20px;
    }
`;
export const Button_Icon_Green_80_Light = styled.button`
    width: 80%;
    padding: 6px;
    font-size: 30px;
    border-radius: 50px;
    background-color:rgb(20, 165, 76);
    color: white;
    border: 2px solid black;
    text-align: center;
    cursor: pointer;
    transition: background-color 0.3s, transform 0.3s;
    box-sizing: border-box;
    
    &:hover {
        background-color:rgb(13, 112, 51);
        transform: scale(1.1);
    }

    @media (max-width: 768px) {
        padding: 4px;
        font-size: 25px;
    }

    @media (max-width: 480px) {
        padding: 2px;
        font-size: 20px;
    }
`;
export const Button_Icon_White_100_Dark = styled.button`
    width: 100px;
    padding: 4px;
    font-size: 30px;
    border-radius: 15px;
    background-color:rgb(0, 0, 0);
    color: white;
    border: 2px solid white;
    text-align: center;
    cursor: pointer;
    transition: background-color 0.3s, transform 0.3s;
    box-sizing: border-box;
    
    &:hover {
        background-color: rgb(255, 255, 255);
        color: black;
        border: 2px solid black;
        transform: scale(1.1);
    }

    @media (max-width: 768px) {
        padding: 8px;
        font-size: 25px;
    }

    @media (max-width: 480px) {
        padding: 12px;
        font-size: 20px;
        width: 80px;
    }
`;
export const Button_Icon_White_100_Light = styled.button`
    width: 100px;
    padding: 4px;
    font-size: 30px;
    border-radius: 15px;
    background-color:rgb(255, 255, 255);
    color: black;
    border: 2px solid black;
    text-align: center;
    cursor: pointer;
    transition: background-color 0.3s, transform 0.3s;
    box-sizing: border-box;
    
    &:hover {
        background-color: rgb(0, 0, 0);
        color: white;
        border: 2px solid white;
        transform: scale(1.1);
    }

    @media (max-width: 768px) {
        padding: 8px;
        font-size: 25px;
    }

    @media (max-width: 480px) {
        padding: 12px;
        font-size: 20px;
        width: 80px;
    }
`;
export const Button_Icon_White_200_Dark = styled.button`
    width: 200px;
    padding: 6px;
    font-size: 30px;
    border-radius: 50px;
    background-color: transparent;
    color: white;
    border: 2px solid white;
    text-align: center;
    cursor: pointer;
    transition: background-color 0.3s, transform 0.3s;
    box-sizing: border-box;
    
    &:hover {
        background-color: black;
        transform: scale(1.1);
    }

    @media (max-width: 768px) {
        padding: 4px;
        font-size: 25px;
        width: 150px;
    }

    @media (max-width: 480px) {
        padding: 2px;
        font-size: 20px;
        width: 100px;
    }
`;
export const Button_Icon_White_200_Light = styled.button`
    width: 200px;
    padding: 6px;
    font-size: 30px;
    border-radius: 50px;
    background-color: transparent;
    color: black;
    border: 2px solid black;
    text-align: center;
    cursor: pointer;
    transition: background-color 0.3s, transform 0.3s;
    box-sizing: border-box;
    
    &:hover {
        background-color: white;
        transform: scale(1.1);
    }

    @media (max-width: 768px) {
        padding: 4px;
        font-size: 25px;
        width: 150px;
    }

    @media (max-width: 480px) {
        padding: 2px;
        font-size: 20px;
        width: 100px;
    }
`;
export const Button_Icon_Block_50_Dark = styled.button`
    width: 50%;
    padding: 6px;
    font-size: 30px;
    border-radius: 50px;
    background-color:rgb(157, 159, 159);
    color: white;
    border: 2px solid white;
    text-align: center;
    cursor: not-allowed;
    pointer-events: none;
    transition: background-color 0.3s, transform 0.3s;
    box-sizing: border-box;

    @media (max-width: 768px) {
        padding: 4px;
        font-size: 25px;
    }

    @media (max-width: 480px) {
        padding: 2px;
        font-size: 20px;
    }
`;
export const Button_Icon_Block_50_Light = styled.button`
    width: 50%;
    padding: 6px;
    font-size: 30px;
    border-radius: 50px;
    background-color:rgb(121, 125, 125);
    color: white;
    border: 2px solid black;
    text-align: center;
    cursor: not-allowed;
    pointer-events: none;
    transition: background-color 0.3s, transform 0.3s;
    box-sizing: border-box;

    @media (max-width: 768px) {
        padding: 4px;
        font-size: 25px;
    }

    @media (max-width: 480px) {
        padding: 2px;
        font-size: 20px;
    }
`;
export const Button_Icon_Block_80_Dark = styled.button`
    width: 80%;
    padding: 6px;
    font-size: 30px;
    border-radius: 50px;
    background-color:rgb(157, 159, 159);
    color: white;
    border: 2px solid white;
    text-align: center;
    cursor: not-allowed;
    pointer-events: none;
    transition: background-color 0.3s, transform 0.3s;
    box-sizing: border-box;

    @media (max-width: 768px) {
        padding: 4px;
        font-size: 25px;
    }

    @media (max-width: 480px) {
        padding: 2px;
        font-size: 20px;
    }
`;
export const Button_Icon_Block_80_Light = styled.button`
    width: 80%;
    padding: 6px;
    font-size: 30px;
    border-radius: 50px;
    background-color:rgb(121, 125, 125);
    color: white;
    border: 2px solid black;
    text-align: center;
    cursor: not-allowed;
    pointer-events: none;
    transition: background-color 0.3s, transform 0.3s;
    box-sizing: border-box;

    @media (max-width: 768px) {
        padding: 4px;
        font-size: 25px;
    }

    @media (max-width: 480px) {
        padding: 2px;
        font-size: 20px;
    }
`;
//____________ICON____________

export const Button_Icon_Exit = styled.button`
    width: 200px;
    padding: 10px;
    font-size: 30px;
    border-radius: 30px;
    background-color: rgb(155, 9, 9);
    color: white;
    border: 2px solid white;
    text-align: center;
    cursor: pointer;
    transition: background-color 0.3s, transform 0.3s;
    box-sizing: border-box;
    
    &:hover {
        background-color:rgb(100, 15, 15);
        transform: translateY(-2px);
        transform: scale(1.1);
    }

    @media (max-width: 768px) {
        width: 160px;
        padding: 8px;
        font-size: 25px;
        border-radius: 30px;

        &:hover {
            transform: translateY(-2px);
            transform: scale(1.1);
        }
    }

    @media (max-width: 480px) {
        width: 120px;
        padding: 6px;
        font-size: 20px;
        border-radius: 30px;

        &:hover {
            transform: translateY(-2px);
            transform: scale(1.1);
        }
    } 
`;
export const Button_Icon_Green = styled.button`
    width: 200px;
    padding: 10px;
    font-size: 30px;
    border-radius: 30px;
    background-color: rgb(20, 165, 76);
    color: white;
    border: 2px solid white;
    text-align: center;
    cursor: pointer;
    transition: background-color 0.3s, transform 0.3s;
    box-sizing: border-box;
    
    &:hover {
        background-color:rgb(13, 112, 51);
        transform: translateY(-2px);
        transform: scale(1.1);
    }

    @media (max-width: 768px) {
        width: 160px;
        padding: 8px;
        font-size: 25px;
        border-radius: 30px;
        
        &:hover {
            transform: translateY(-2px);
            transform: scale(1.1);
        }
    }

    @media (max-width: 480px) {
        width: 120px;
        padding: 6px;
        font-size: 20px;
        border-radius: 30px;

        &:hover {
            transform: translateY(-2px);
            transform: scale(1.1);
        }
    } 
`;
export const Button_Icon_Block = styled.button`
    width: 200px;
    padding: 10px;
    font-size: 30px;
    border-radius: 30px;
    background-color: rgb(84,88,89);
    color: white;
    border: 2px solid white;
    text-align: center;
    cursor: not-allowed;
    pointer-events: none;
    transition: background-color 0.3s, transform 0.3s;
    box-sizing: border-box;
    
    &:hover {
        transform: translateY(-2px);
        transform: scale(1.1);
    }

    @media (max-width: 768px) {
        width: 160px;
        padding: 8px;
        font-size: 25px;
        border-radius: 30px;
        
        &:hover {
            transform: translateY(-2px);
            transform: scale(1.1);
        }
    }

    @media (max-width: 480px) {
        width: 120px;
        padding: 6px;
        font-size: 20px;
        border-radius: 30px;

        &:hover {
            transform: translateY(-2px);
            transform: scale(1.1);
        }
    } 
`;

//--------MODAL--------
export const Button_Icon_Cancel_Modal = styled.button`
    width: 200px;
    padding: 10px;
    font-size: 30px;
    border-radius: 30px;
    background-color: rgb(58,93,174);
    color: white;
    border: 2px solid white;
    text-align: center;
    cursor: pointer;
    transition: background-color 0.3s, transform 0.3s;
    box-sizing: border-box;
    
    &:hover {
        background-color:rgb(12, 54, 109);
        transform: translateY(-2px);
        transform: scale(1.1);
    }

    @media (max-width: 768px) {
        width: 160px;
        padding: 8px;
        font-size: 25px;
        border-radius: 30px;

        &:hover {
            transform: translateY(-2px);
            transform: scale(1.1);
        }
    }

    @media (max-width: 480px) {
        width: 120px;
        padding: 6px;
        font-size: 20px;
        border-radius: 30px;

        &:hover {
            transform: translateY(-2px);
            transform: scale(1.1);
        }
    }
`;
export const Button_Icon_Exit_Modal = styled.button`
    width: 200px;
    padding: 10px;
    font-size: 30px;
    border-radius: 30px;
    background-color: rgb(155, 9, 9);
    color: white;
    border: 2px solid white;
    text-align: center;
    cursor: pointer;
    transition: background-color 0.3s, transform 0.3s;
    box-sizing: border-box;
    
    &:hover {
        background-color:rgb(100, 15, 15);
        transform: translateY(-2px);
        transform: scale(1.1);
    }

    @media (max-width: 768px) {
        width: 160px;
        padding: 8px;
        font-size: 25px;
        border-radius: 30px;

        &:hover {
            transform: translateY(-2px);
            transform: scale(1.1);
        }
    }

    @media (max-width: 480px) {
        width: 120px;
        padding: 6px;
        font-size: 20px;
        border-radius: 30px;

        &:hover {
            transform: translateY(-2px);
            transform: scale(1.1);
        }
    } 
`;
export const Button_Icon_Green_Modal = styled.button`
    width: 200px;
    padding: 10px;
    font-size: 30px;
    border-radius: 30px;
    background-color: rgb(20, 165, 76);
    color: white;
    border: 2px solid white;
    text-align: center;
    cursor: pointer;
    transition: background-color 0.3s, transform 0.3s;
    box-sizing: border-box;
    
    &:hover {
        background-color:rgb(13, 112, 51);
        transform: translateY(-2px);
        transform: scale(1.1);
    }

    @media (max-width: 768px) {
        width: 160px;
        padding: 8px;
        font-size: 25px;
        border-radius: 30px;
        
        &:hover {
            transform: translateY(-2px);
            transform: scale(1.1);
        }
    }

    @media (max-width: 480px) {
        width: 120px;
        padding: 6px;
        font-size: 20px;
        border-radius: 30px;

        &:hover {
            transform: translateY(-2px);
            transform: scale(1.1);
        }
    } 
`;
export const Button_Icon_Block_Modal = styled.button`
    width: 200px;
    padding: 10px;
    font-size: 30px;
    border-radius: 30px;
    background-color: rgb(84,88,89);
    color: white;
    border: 2px solid white;
    text-align: center;
    cursor: not-allowed;
    pointer-events: none;
    transition: background-color 0.3s, transform 0.3s;
    box-sizing: border-box;
    
    &:hover {
        transform: translateY(-2px);
        transform: scale(1.1);
    }

    @media (max-width: 768px) {
        width: 160px;
        padding: 8px;
        font-size: 25px;
        border-radius: 30px;
        
        &:hover {
            transform: translateY(-2px);
            transform: scale(1.1);
        }
    }

    @media (max-width: 480px) {
        width: 120px;
        padding: 6px;
        font-size: 20px;
        border-radius: 30px;

        &:hover {
            transform: translateY(-2px);
            transform: scale(1.1);
        }
    } 
`;
//--------MODAL--------
//--------SEARCH BAR--------
export const Button_Blue_Search_Bar = styled.button`
    width: 10%;
    padding: 4px;
    background-color: rgb(58,93,174);
    color: white;
    border-radius: 10px;
    font-size: 20px;
    text-align: center;
    border: none;
    cursor: pointer;
    transition: background-color 0.3s, transform 0.3s;
    box-sizing: border-box;
    
    &:hover {
        background-color:rgb(12, 54, 109);
        transform: translateY(-2px);
        transform: scale(1.2);
    }

    @media (max-width: 768px) {
        font-size: 16px;
        width:20%;

        &:hover {
            transform: translateY(-2px);
        }
    }

    @media (max-width: 480px) {
        font-size: 20px;
        width:40%;

        &:hover {
            transform: translateY(-2px);
        }
    }
`;
export const Button_Block_Search_Bar = styled.button`
    width: 10%;
    padding: 4px;
    background-color: rgb(84,88,89);
    cursor: not-allowed;
    pointer-events: none;
    opacity: 0.5;
    color: white;
    border-radius: 10px;
    font-size: 20px;
    text-align: center;
    border: none;
    transform: none;
    transition: background-color 0.3s, transform 0.3s;
    box-sizing: border-box;
    
    &:hover {
        transform: translateY(-2px);
        transform: scale(1.2);
    }

    @media (max-width: 768px) {
        font-size: 16px;
        width:20%;

        &:hover {
            transform: translateY(-2px);
        }
    }

    @media (max-width: 480px) {
        font-size: 20px;
        width:40%;

        &:hover {
            transform: translateY(-2px);
        }
    }
`;
export const Button_Green_Search_Bar = styled.button`
    width: 10%;
    padding: 4px;
    background-color: rgb(20, 165, 76);
    color: white;
    border-radius: 10px;
    font-size: 20px;
    text-align: center;
    border: none;
    cursor: pointer;
    transition: background-color 0.3s, transform 0.3s;
    box-sizing: border-box;
    
    &:hover {
        background-color:rgb(13, 112, 51);
        transform: translateY(-2px);
        transform: scale(1.2);
    }

    @media (max-width: 768px) {
        font-size: 16px;
        width:20%;

        &:hover {
            transform: translateY(-2px);
        }
    }

    @media (max-width: 480px) {
        font-size: 20px;
        width:40%;

        &:hover {
            transform: translateY(-2px);
        }
    }
`;
export const Button_Red_Search_Bar = styled.button`
    width: 10%;
    padding: 4px;
    background-color: rgb(155, 9, 9);
    color: white;
    border-radius: 10px;
    font-size: 20px;
    text-align: center;
    border: none;
    cursor: pointer;
    transition: background-color 0.3s, transform 0.3s;
    box-sizing: border-box;
    
    &:hover {
        background-color:rgb(87, 7, 7);
        transform: translateY(-2px);
        transform: scale(1.2);
    }

    @media (max-width: 768px) {
        font-size: 16px;
        width:20%;

        &:hover {
            transform: translateY(-2px);
        }
    }

    @media (max-width: 480px) {
        font-size: 20px;
        width:40%;

        &:hover {
            transform: translateY(-2px);
        }
    }
`;
//--------SEARCH BAR--------
//--------PAGINATION--------
export const Button_Block_Pagination = styled.button`
    width: 14%;
    padding: 6px;
    color: white;
    border: 2px solid white;
    border-radius: 15px;
    font-size: 20px;
    text-align: center;
    transition: background-color 0.3s, transform 0.3s;
    box-sizing: border-box;
    cursor: not-allowed;
    pointer-events: none;
    opacity: 0.7;
    background-color: rgb(84,88,89);
    transform: none;

    @media (max-width: 768px) {
        font-size: 14px;
    }

    @media (max-width: 480px) {
        font-size: 8px;
    }
`;
export const Button_Blue_Pagination = styled.button`
    width: 14%;
    padding: 6px;
    background-color: rgb(58,93,174);
    color: white;
    border: 2px solid white;
    border-radius: 15px;
    font-size: 20px;
    text-align: center;
    cursor: pointer;
    transition: background-color 0.3s, transform 0.3s;
    box-sizing: border-box;
    
    &:hover {
        background-color:rgb(12, 54, 109);
        transform: translateY(-2px);
        transform: scale(1.2);
    }

    @media (max-width: 768px) {
        font-size: 14px;
        
        &:hover {
            transform: translateY(-2px);
            transform: scale(1.3);
        }
    }

    @media (max-width: 480px) {
        font-size: 8px;
        
        &:hover {
            transform: translateY(-2px);
            transform: scale(1.3);
        }
    }
`;
//--------PAGINATION--------

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