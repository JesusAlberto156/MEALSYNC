import styled from 'styled-components';

export const Title = styled.h1`
    text-align: center;
    position: relative;
    top: 1px;

    @media (max-width: 768px) {
        font-size: 25px;
    }

    @media (max-width: 480px) {
        font-size: 20px;
    }
`;
export const Content_Button = styled.div`
    display: flex;
    gap: 15px; 
    justifyContent: center; 
    alignItems: center;

    @media (max-width: 768px) {
        gap: 10px;
    }

    @media (max-width: 480px) {
        gap: 5px;
    }
`;
export const Button_Icon_Cancel = styled.button`
    width: 100%;
    padding: 6px;
    background-color: transparent;
    color: black;
    border: 2px solid black;
    border-radius: 10px;
    font-size: 25px;
    text-align: center;
    cursor: pointer;
    transition: background-color 0.3s, transform 0.3s;
    box-sizing: border-box;
    
    &:hover {
        background-color:rgb(13, 60, 122);
        color: white;
        border: 2px solid white;
        transform: translateY(-2px);
        transform: scale(1.2);
    }

    @media (max-width: 768px) {
        background-color:rgb(13, 60, 122);
        color: white;
        border: 2px solid white;

        &:hover {
            background-color:rgb(13, 96, 122);
            transform: translateY(-2px);
            transform: scale(1.2);
        }
    }

    @media (max-width: 480px) {
        background-color:rgb(13, 60, 122);
        color: white;
        border: 2px solid white;

        &:hover {
            background-color:rgb(13, 96, 122);
            transform: translateY(-2px);
            transform: scale(1.2);
        }
    }
`;
export const Button_Icon_Exit = styled.button`
    width: 100%;
    padding: 6px;
    background-color: transparent;
    color: black;
    border: 2px solid black;
    border-radius: 10px;
    font-size: 25px;
    text-align: center;
    cursor: pointer;
    transition: background-color 0.3s, transform 0.3s;
    box-sizing: border-box;
    
    &:hover {
        background-color:rgb(122, 13, 13);
        color: white;
        border: 2px solid white;
        transform: translateY(-2px);
        transform: scale(1.2);
    }

    @media (max-width: 768px) {
        background-color:rgb(122, 13, 13);
        color: white;
        border: 2px solid white;

        &:hover {
            background-color:rgb(122, 62, 13);
            transform: translateY(-2px);
            transform: scale(1.2);
        }
    }

    @media (max-width: 480px) {
        background-color:rgb(122, 13, 13);
        color: white;
        border: 2px solid white;

        &:hover {
            background-color:rgb(122, 62, 13);
            transform: translateY(-2px);
            transform: scale(1.2);
        }
    }    
`;
export const Text = styled.p`
    font-size: 22px;

    @media (max-width: 768px) {
        font-size: 18px;
    }

    @media (max-width: 480px) {
        font-size: 14px;
    }
`;
/*--------OUT-LOGIN--------*/ 
export const Modal_Container_Out_Login = styled.div`
    position: relative;
`;

export const Modal_Out_Login = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
    overflow-y: auto;
`;
export const Modal_Content_Out_Login = styled.div`
    max-height: 90vh;
    max-width: 90vw;
    overflow-y: auto;
    overflow-x: hidden;
    background: white;
    padding: 20px;
    border-radius: 5px;
    box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.1);
`;
/*--------OUT-LOGIN--------*/
/*--------SHOPPING-CART--------*/
export const Modal_Container_Shopping_Cart = styled.div`
    position: relative;
`;
export const Modal_Shopping_Cart = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
    overflow-y: auto;
`;
export const Modal_Content_Shopping_Cart = styled.div`
    max-height: 90vh;
    max-width: 90vw;
    overflow-y: auto;
    overflow-x: hidden;
    background: white;
    padding: 20px;
    border-radius: 5px;
    box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.1);
`;
/*--------SHOPPING-CART--------*/
/*--------MEDICO--------*/
export const Modal_Container_Medico = styled.div`
    position: relative;
`;
export const Modal_Medico = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
    overflow-y: auto;
`;
export const Modal_Content_Medico = styled.div`
    max-height: 90vh;
    max-width: 90vw;
    overflow-y: auto;
    overflow-x: hidden;
    background: white;
    padding: 20px;
    border-radius: 5px;
    box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.1);
`;
/*--------MEDICO--------*/