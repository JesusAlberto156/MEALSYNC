import styled from 'styled-components';

//--------LOGIN--------
export const Button_Blue_Login = styled.button`
    width: 60%;
    padding: 6px;
    margin-left: 20%;
    background-color: rgb(58,93,174);
    color: white;
    border: 2px solid white;
    border-radius: 20px;
    font-size: 25px;
    text-align: center;
    cursor: pointer;
    transition: background-color 0.3s, transform 0.3s;
    box-sizing: border-box;
    
    &:hover {
        background-color:rgb(12, 54, 109);
        transform: translateY(-2px);
        transform: scale(1.4);
    }

    @media (max-width: 768px) {
        font-size: 22px;

        &:hover {
            transform: translateY(-2px);
            transform: scale(1.3);
        }
    }

    @media (max-width: 480px) {
        font-size: 20px;

        &:hover {
            transform: translateY(-2px);
            transform: scale(1.2);
        }
    }
`;
export const Button_Block_Login = styled.button`
    width: 60%;
    padding: 6px;
    margin-left: 20%;
    color: white;
    border: 2px solid white;
    border-radius: 20px;
    font-size: 25px;
    text-align: center;
    transition: background-color 0.3s, transform 0.3s;
    box-sizing: border-box;
    cursor: not-allowed;
    pointer-events: none;
    opacity: 0.5;
    background-color: rgb(84,88,89);
    transform: none;

    &:hover {
        transform: translateY(-2px);
        transform: scale(1.4);
    }

    @media (max-width: 768px) {
        font-size: 22px;

        &:hover {
            transform: translateY(-2px);
            transform: scale(1.3);
        }
    }

    @media (max-width: 480px) {
        font-size: 20px;

        &:hover {
            transform: translateY(-2px);
            transform: scale(1.2);
        }
    }
`;
export const Button_Green_Login = styled.button`
    width: 60%;
    padding: 6px;
    margin-left: 20%;
    background-color: rgb(20, 165, 76);
    color: white;
    border: 2px solid white;
    border-radius: 20px;
    font-size: 25px;
    text-align: center;
    cursor: pointer;
    transition: background-color 0.3s, transform 0.3s;
    box-sizing: border-box;
    
    &:hover {
        background-color:rgb(13, 112, 51);
        transform: translateY(-2px);
        transform: scale(1.4);
    }

    @media (max-width: 768px) {
        font-size: 22px;

        &:hover {
            transform: translateY(-2px);
            transform: scale(1.3);
        }
    }

    @media (max-width: 480px) {
        font-size: 20px;

        &:hover {
            transform: translateY(-2px);
            transform: scale(1.2);
        }
    }
`;
//--------LOGIN--------
//--------SIDEBAR---------
export const Button_Blue_Sidebar = styled.button`
    width: 5%;
    padding: 4px;
    background-color: rgb(58,93,174);
    color: white;
    border-radius: 15px;
    font-size: 20px;
    text-align: center;
    border: none;
    cursor: pointer;
    transition: background-color 0.3s, transform 0.3s;
    box-sizing: border-box;
    
    &:hover {
        background-color:rgb(84,88,89);
        transform: translateY(-2px);
        transform: scale(1.2);
    }

    @media (max-width: 768px) {
        font-size: 16px;
        width:7%;

        &:hover {
            transform: translateY(-2px);
        }
    }

    @media (max-width: 480px) {
        font-size: 20px;
        width:10%;

        &:hover {
            transform: translateY(-2px);
        }
    }
`;
export const Button_Red_Sidebar = styled.button`
    width: 5%;
    padding: 4px;
    background-color: rgb(58,93,174);
    color: white;
    border-radius: 15px;
    font-size: 20px;
    text-align: center;
    margin-left: 8%;
    border: none;
    cursor: pointer;
    transition: background-color 0.3s, transform 0.3s;
    box-sizing: border-box;
    
    &:hover {
        background-color:rgb(155, 9, 9);
        transform: translateY(-2px);
        transform: scale(1.2);
    }

    @media (max-width: 768px) {
        font-size: 16px;
        width:7%;
        margin-left: 10%;

        &:hover {
            transform: translateY(-2px);
        }
    }

    @media (max-width: 480px) {
        font-size: 20px;
        width:10%;
        margin-left: 20%;

        &:hover {
            transform: translateY(-2px);
        }
    }
`;
//--------SIDEBAR---------
//--------NAVBAR--------
export const Button_Black_Navbar = styled.button`
    width: 100px;
    padding: 5px;
    margin-left: 10px;
    background-color: black;
    color: white;
    border: 2px solid white;
    border-radius: 15px;
    font-size: 25px;
    text-align: center;
    cursor: pointer;
    transition: background-color 0.3s, transform 0.3s;
    box-sizing: border-box;
    
    &:hover {
        background-color:rgb(84,88,89);
        transform: translateY(-2px);
        transform: scale(1.1);
    }

    @media (max-width: 768px) {
        width: 80px;
        font-size: 20px;

        &:hover {
            transform: translateY(-2px);
            transform: scale(1.2);
        }
    }

    @media (max-width: 480px) {
        width: 60px;
        font-size: 18px;

        &:hover {
            transform: translateY(-2px);
            transform: scale(1.2);
        }
    }
`;
//--------NAVBAR--------
//--------MODAL--------
export const Button_Icon_Cancel_Modal = styled.button`
    width: 100%;
    padding: 6px;
    background-color: rgb(58,93,174);
    color: white;
    border: 2px solid black;
    border-radius: 15px;
    font-size: 25px;
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

        &:hover {
            transform: translateY(-2px);
            transform: scale(1.2);
        }
    }

    @media (max-width: 480px) {
        padding: 2px;
        font-size: 22px;

        &:hover {
            transform: translateY(-2px);
            transform: scale(1.2);
        }
    }
`;
export const Button_Icon_Exit_Modal = styled.button`
    width: 100%;
    padding: 6px;
    background-color: rgb(155, 9, 9);
    color: white;
    border: 2px solid black;
    border-radius: 15px;
    font-size: 25px;
    text-align: center;
    cursor: pointer;
    transition: background-color 0.3s, transform 0.3s;
    box-sizing: border-box;
    
    &:hover {
        background-color:rgb(100, 15, 15);
        transform: translateY(-2px);
        transform: scale(1.2);
    }

    @media (max-width: 768px) {

        &:hover {
            transform: translateY(-2px);
            transform: scale(1.2);
        }
    }

    @media (max-width: 480px) {
        padding: 2px;
        font-size: 22px;

        &:hover {
            transform: translateY(-2px);
            transform: scale(1.2);
        }
    } 
`;
//--------MODAL--------
//--------ERROR--------
export const Button_White_Error = styled.button`
    width: 10%;
    padding: 8px;
    background-color: transparent;
    color: white;
    margin-top: 20px;
    border-radius: 15px;
    font-size: 30px;
    text-align: center;
    border: 2px solid white;
    cursor: pointer;
    transition: background-color 0.3s, transform 0.3s;
    box-sizing: border-box;
    
    &:hover {
        background-color:white;
        color: Black;
        transform: translateY(-2px);
        transform: scale(1.3);
    }

    @media (max-width: 768px) {
        font-size: 25px;
        width: 15%;
        padding: 10px;

        &:hover {
            transform: translateY(-2px);
            transform: scale(1.2);
        }
    }

    @media (max-width: 480px) {
        font-size: 20px;
        width: 20%;
        padding: 12px;

        &:hover {
            transform: translateY(-2px);
            transform: scale(1.1);
        }
    }
`;
//--------ERROR--------

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