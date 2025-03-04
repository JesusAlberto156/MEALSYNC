import styled, { keyframes } from 'styled-components';

//--------ANIMATION--------
const Rotate = keyframes`
    from {
        transform: rotate(0deg);
    }
    to {
        transform: rotate(360deg);
    }
`;
const fadeAnimation = keyframes`
  0% { opacity: 1; }
  50% { opacity: 0; }
  100% { opacity: 1; }
`;
//--------ANIMATION--------
//--------LOGIN--------
export const Form = styled.div`
    position: fixed;
    top: 5%;
    z-index: 10;
    width: 100%;
    max-width: 25%;
    max-height: 79vh;
    overflow-y: scroll; 
    scrollbar-width: none;
    -ms-overflow-style: none;
    margin: 30px auto;
    padding: 20px;
    border-radius: 10px;
    background-color:rgba(19, 18, 18, 0.8);
    text-align: center;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    gap: 20px;

    &::-webkit-scrollbar {
        display: none;
    }
    
    @media (max-width: 768px) {
        max-width: 50%;
        max-height: 78vh;
        padding: 15px;
        gap: 15px;
    }

    @media (max-width: 480px) {
        max-width: 90%;
        max-height: 75vh;
        padding: 10px;
        gap: 10px;
    }
`;
export const Title_Fade = styled.div`
    color: white;
    font-size: 1.2rem;
    font-family:Arial, Helvetica, sans-serif;
    margin-bottom: 25px;
    font-weight: bold;
    animation: ${fadeAnimation} 2s infinite;

    @media (max-width: 768px) {
        font-size: 1.1rem;
        margin-bottom: 20px;
    }

    @media (max-width: 480px) {
        font-size: 1rem;
        margin-bottom: 15px;
    }
`;
export const Input_Group = styled.div`
    position: relative;
    height: 80px;
    line-height: 40px;
    outline: none;

    @media (max-width: 768px) {
        height: 70px;
    }
    
    @media (max-width: 480px) {
        height: 60px;
    }
`;
export const Input = styled.input`
    position: relative;
    z-index: 1;
    width: 100%;
    height: 20%;
    color: #fff;
    font-size: 1.3rem;
    border-radius: 5px;
    border: none;
    border-bottom: 2px solid white;
    background: transparent;
    transition: 0.1s ease;
    outline: none;
    padding-top: 30px;
    cursor: text;

    @media (max-width: 768px) {
        font-size: 1.2rem;
    }
    
    @media (max-width: 480px) {
        font-size: 1.1rem;
    }

    &:focus {
        border-bottom: 2px solid aqua;
        border-color: aqua;
        color: aqua;
        box-shadow: 0 0 8px rgba(52, 152, 219, 0.3);
    }
`;
export const Label = styled.label.withConfig({
    shouldForwardProp: (prop) => prop !== 'isLabelUp' && prop !== 'isFocused',
})`
    z-index: 0;
    position: absolute;
    top: 14px;
    left: 7px;
    font-size: 1.2rem;
    font-family:Arial, Helvetica, sans-serif;
    color: #ffffff;
    background-color: transparent;
    transition: 0.2s ease;
    white-space: nowrap;

    ${(props) =>  props.isLabelUp && `
        top: -10px;
        font-size: 0.9rem;
    `}

    ${(props) => props.isFocused && `
        color: aqua;
    `}

    @media (max-width: 768px) {
        font-size: 1.1rem;
        top: 14px;
        left: 5px;

        ${(props) => props.isLabelUp && `
            top: -8px;
            font-size: 0.8rem;
        `}

        ${(props) => props.isFocused && `
            color: aqua;
        `}
    }
    
    @media (max-width: 480px) {
        font-size: 1rem;
        top: 12px;
        left: 3px;

        ${(props) => props.isLabelUp && `
            top: -6px;
            font-size: 0.7rem;
        `}

        ${(props) => props.isFocused && `
            color: aqua;
        `}
    }

`;
export const Label_Popup = styled.p`
    color: #00FFAA; 
    text-Align: left; 
    font-Size: 0.9rem; 
    font-family:Arial, Helvetica, sans-serif;
    left: 7px;
    position: absolute;
    transform: translateY(-30px);
    transition: transform 0.3s ease;

    @media (max-width: 768px) {
        font-size: 0.8rem;
        transform: translateY(-30px);
        left: 5px;
    }

    @media (max-width: 480px) {
        font-size: 0.7rem;
        transform: translateY(-30px);
        left: 3px;
    }
`;
export const Whitespace = styled.div`
    @media (max-width: 768px) {
        margin-Bottom: 5px;
    }

    @media (max-width: 480px) {
        margin-Bottom: 1px;
    }
`;
export const Button_Blue = styled.button`
    width: 60%;
    padding: 6px;
    margin-left: 20%;
    background-color: transparent;
    color: white;
    border: 2px solid white;
    border-radius: 10px;
    font-size: 25px;
    text-align: center;
    cursor: pointer;
    transition: background-color 0.3s, transform 0.3s;
    box-sizing: border-box;
    
    &:hover {
        background-color:rgb(13, 60, 122);
        transform: translateY(-2px);
        transform: scale(1.1);
    }

    &:disabled {
        cursor: not-allowed;
        opacity: 0.5;
        background-color: gray;
        border-color: gray;
        transform: none;
    }

    @media (max-width: 768px) {
        background-color:rgb(13, 60, 122);
        font-size: 22px;

        &:hover {
            background-color:rgb(13, 96, 122);
            transform: translateY(-2px);
            transform: scale(1.1);
        }
    }

    @media (max-width: 480px) {
        background-color:rgb(13, 60, 122);
        font-size: 20px;

        &:hover {
            background-color:rgb(13, 96, 122);
            transform: translateY(-2px);
            transform: scale(1.1);
        }
    }
`;
export const Button_Block = styled.button`
    width: 60%;
    padding: 6px;
    margin-left: 20%;
    color: white;
    border: 2px solid white;
    border-radius: 10px;
    font-size: 25px;
    text-align: center;
    transition: background-color 0.3s, transform 0.3s;
    box-sizing: border-box;
    cursor: not-allowed;
    pointer-events: none;
    opacity: 0.5;
    background-color: gray;
    border-color: gray;
    transform: none;

    &:hover {
        transform: translateY(-2px);
        transform: scale(1.1);
    }

    @media (max-width: 768px) {
        font-size: 22px;

        &:hover {
            transform: translateY(-2px);
            transform: scale(1.1);
        }
    }

    @media (max-width: 480px) {
        font-size: 20px;

        &:hover {
            transform: translateY(-2px);
            transform: scale(1.1);
        }
    }
`;
export const Button_Green = styled.button`
    width: 60%;
    padding: 6px;
    margin-left: 20%;
    background-color: transparent;
    color: white;
    border: 2px solid white;
    border-radius: 10px;
    font-size: 25px;
    text-align: center;
    cursor: pointer;
    transition: background-color 0.3s, transform 0.3s;
    box-sizing: border-box;
    
    &:hover {
        background-color:rgb(13, 122, 55);
        transform: translateY(-2px);
        transform: scale(1.1);
    }

    @media (max-width: 768px) {
        background-color:rgb(13, 122, 55);
        font-size: 22px;

        &:hover {
            background-color:rgb(10, 92, 42);
            transform: translateY(-2px);
            transform: scale(1.1);
        }
    }

    @media (max-width: 480px) {
        background-color:rgb(13, 122, 55);
        font-size: 20px;

        &:hover {
            background-color:rgb(10, 92, 42);
            transform: translateY(-2px);
            transform: scale(1.1);
        }
    }
`;
export const Link = styled.button`
    width: 40%;
    padding: 2px;
    margin-left: 30%;
    background-color: transparent;
    color: #0050d0;
    border: none;
    font-size: 19px;
    font-family:Arial, Helvetica, sans-serif;
    text-decoration: underline;
    text-align: center;
    cursor: pointer;
    box-sizing: border-box;
    
    &:hover {
        color: #0080ff;
        transform: translateY(-2px);
        transform: scale(1.1);
    }

    @media (max-width: 768px) {
        color: #0050d0;
        font-size: 17px;

        &:hover {
            color: #0080ff;
            transform: translateY(-2px);
            transform: scale(1.1);
        }
    }

    @media (max-width: 480px) {
        color: #0050d0;
        font-size: 15px;

        &:hover {
            color: #0080ff;
            transform: translateY(-2px);
            transform: scale(1.1);
        }
    }
`;
export const Spinner_Blue = styled.div`
    width: 40%;
    padding: 2px;
    margin-left: 30%;
    background-color: transparent;
    color: #0050d0;
    border: none;
    font-size: 19px;
    font-family:Arial, Helvetica, sans-serif;
    text-decoration: underline;
    text-align: center;
    cursor: pointer;
    box-sizing: border-box;
    animation: ${Rotate} 1s linear infinite;

    @media (max-width: 768px) {
        font-size: 17px;
    }

    @media (max-width: 480px) {
        font-size: 15px;
    }
`;
//--------LOGIN--------