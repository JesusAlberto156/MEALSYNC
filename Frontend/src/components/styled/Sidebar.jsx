import styled from 'styled-components';

export const Title = styled.div`
    color: white;
    padding-top: 10px;
    text-align: center;
    font-size: 1.2rem;
    font-family:Arial, Helvetica, sans-serif;
    margin-bottom: 10px;
    font-weight: bold;

    @media (max-width: 768px) {
        font-size: 1.1rem;
        margin-bottom: 20px;
    }

    @media (max-width: 480px) {
        font-size: 1rem;
        margin-bottom: 15px;
    }
`;
export const Whitespace_100 = styled.div`
    background-color: rgba(255, 255, 255, 0);
    color: white;
    text-align: center;
    position: relative;
    bottom: 0;
    width: 100%;
    height: 100px;
    transition: transform 0.3s ease;

    @media (max-width: 768px) {
        
    }

    @media (max-width: 480px) {
        
    }
`;