import styled from 'styled-components';

export const Background = styled.div`
    background-color: rgba(0, 0, 0);
    color: white;
    text-align: center;
    padding: 1rem 0;
    position: relative;
    bottom: 0;
    width: 100%;
    height: 100px;
    transition: transform 0.3s ease;
    
    @media (max-width: 768px) {
        height: 60px;
    }
    
    @media (max-width: 480px) {
        height: 55px;
    }
`;
export const Whitespace = styled.div`
    background-color: rgba(255, 255, 255,0.8);
    color: white;
    text-align: center;
    position: relative;
    bottom: 0;
    width: 100%;
    height: 1px;
    transition: transform 0.3s ease;
`;
export const Label = styled.p`
    font-Size: 0.9rem; 
    font-family:Arial, Helvetica, sans-serif;
    transition: transform 0.3s ease;
    margin-top: 60px;

    @media (max-width: 768px) {
        margin-top: 25px;
        font-size: 0.75rem;
    }

    @media (max-width: 480px) {
        margin-top: 20px;
        font-size: 0.6rem;
    }
`;