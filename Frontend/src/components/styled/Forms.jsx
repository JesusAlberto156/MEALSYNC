import styled from 'styled-components';

//--------LOGIN--------
export const Form_Login = styled.div`
    position: fixed;
    top: 5%;
    z-index: 10;
    width: 100%;
    max-width: 30%;
    max-height: 79vh;
    overflow-y: scroll; 
    scrollbar-width: none;
    -ms-overflow-style: none;
    margin: 30px auto;
    padding: 20px;
    border-radius: 30px;
    border: 2px solid white;
    background-color:rgba(204, 203, 198, 0.8);
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
        gap: 19px;
    }

    @media (max-width: 480px) {
        max-width: 70%;
        max-height: 75vh;
        padding: 10px;
        gap: 18px;
    }
`;
//--------LOGIN--------