//____________IMPORT/EXPORT____________
// Componentes de React externos
import styled from 'styled-components';
//____________IMPORT/EXPORT____________

//____________MENU____________
export const Card_Menu_White_300_Button = styled.button`
    border: 3px solid black;
    border-right: 7px solid black;
    border-bottom: 7px solid black;
    border-radius: 50px;
    padding: 10px;
    width: 300px;
    height: 400px;
    background-color: rgba(255, 255, 255, 0.75);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.6);
    transition: transform 0.4s, box-shadow 0.4s;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    transition: 
        background-color 0.5s ease,
        box-shadow 0.5s ease,
        transform 0.4s ease,
        filter 0.4s ease,
        opacity 0.4s ease;
    
    &:not(:disabled):hover {
        transform: translateY(-10px);
        box-shadow: 0 6px 16px rgba(0, 0, 0, 0.6);
    }

    &:disabled {
        cursor: not-allowed;
        background: rgba(84, 88, 89, 0.5);
    }
    
    @media (max-width: 768px) {
        border: 2px solid black;
        border-right: 6px solid black;
        border-bottom: 6px solid black;
        border-radius: 30px;
        padding: 8px;
        width: 225px;
        height: 300px;
    }

    @media (max-width: 480px) {
        border: 1px solid black;
        border-right: 5px solid black;
        border-bottom: 5px solid black;
        border-radius: 20px;
        padding: 6px;
        width: 150px;
        height: 200px;
    }
`;
export const Card_Menu_White_300 = styled.div.withConfig({
    shouldForwardProp: (prop) => prop !== 'isDisabled',
})`
    border: ${({ isDisabled }) => isDisabled ? '3px solid white' : '3px solid black'};
    border-right: ${({ isDisabled }) => isDisabled ? '7px solid white' : '7px solid black'};
    border-bottom: ${({ isDisabled }) => isDisabled ? '7px solid white' : '7px solid black'};
    border-radius: 50px;
    padding: 10px;
    width: 300px;
    height: 400px;
    background-color: ${({ isDisabled }) => isDisabled ? 'rgba(84, 88, 89, 0.5)' : 'rgba(255, 255, 255, 0.75)'};
    box-shadow: 0 4px 12px ${({ isDisabled }) => isDisabled ? 'rgba(255, 255, 255, 0.6)' : 'rgba(0, 0, 0, 0.6)'};
    transition: transform 0.4s, box-shadow 0.4s;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: ${({ isDisabled }) => isDisabled ? 'not-allowed' : 'pointer'};
    
    &:hover {
        ${({ isDisabled }) => !isDisabled && `
            transform: translateY(-10px);
            box-shadow: 0 6px 16px rgba(0, 0, 0, 0.6);
        `}
    }
    
    @media (max-width: 768px) {
        border: ${({ isDisabled }) => isDisabled ? '2px solid white' : '2px solid black'};
        border-right: ${({ isDisabled }) => isDisabled ? '6px solid white' : '6px solid black'};
        border-bottom: ${({ isDisabled }) => isDisabled ? '6px solid white' : '6px solid black'};
        border-radius: 30px;
        padding: 8px;
        width: 225px;
        height: 300px;
    }

    @media (max-width: 480px) {
        border: ${({ isDisabled }) => isDisabled ? '1px solid white' : '1px solid black'};
        border-right: ${({ isDisabled }) => isDisabled ? '5px solid white' : '5px solid black'};
        border-bottom: ${({ isDisabled }) => isDisabled ? '5px solid white' : '5px solid black'};
        border-radius: 20px;
        padding: 6px;
        width: 150px;
        height: 200px;
    }
`;
export const Card_Menu_White = styled.div.withConfig({
    shouldForwardProp: (prop) => prop !== 'isDisabled',
})`
    border: none;
    border-radius: 50px;
    padding: 20px;
    width: 100%;
    height: 100%;
    background-color: ${({ isDisabled }) => isDisabled ? 'rgba(84, 88, 89, 0.5)' : 'rgba(255, 255, 255, 1)'};
    box-shadow: 0 2px 16px ${({ isDisabled }) => isDisabled ? 'rgba(255, 255, 255, 0.8)' : 'rgba(0, 0, 0, 0.8)'};
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: ${({ isDisabled }) => isDisabled ? 'not-allowed' : 'pointer'};

    @media (max-width: 768px) {
        padding: 15px;
        border-radius: 30px;
    }

    @media (max-width: 480px) {
        padding: 10px;
        border-radius: 20px;
    }
`;
export const Card_Menu_Functions = styled.div`
    border: none;
    width: 100%;
    height: 100%;
    background-color: transparent;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    gap: 10px;
`;
//____________MENU____________