import styled from 'styled-components';

//--------FOOTER--------
export const Background_Footer = styled.div`
    background-color: rgba(0, 0, 0);
    z-index: 11;
    color: white;
    text-align: center;
    padding: 1rem 0;
    position: relative;
    bottom: 0;
    width: 100%;
    height: 100px;
    transition: transform 0.3s ease;
    
    @media (max-width: 768px) {
        height: 90px;
    }
    
    @media (max-width: 480px) {
        height: 80px;
    }
`;
//--------FOOTER--------