import styled from 'styled-components';

export const Background = styled.div`
    position: fixed;
    top: 0%;
    left: ${({ sidebarVisible }) => (sidebarVisible ? "16.2%" : "4%")};
    z-index: 9;
    width: ${({ sidebarVisible }) => (sidebarVisible ? "84%" : "96%")};
    height: 100%;
    max-width: 100%;
    max-height: 100vh;
    overflow-y: scroll; 
    overflow-x: auto;
    scrollbar-width: none;
    -ms-overflow-style: none;
    margin: 0px auto;
    padding: 20px;
    border-radius: 4px;
    background-color:rgba(252, 252, 252, 0.39);
    text-align: center;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    gap: 20px;
    transition: all 0.3s ease;

    &::-webkit-scrollbar {
        display: none;
    }
    
    @media (max-width: 768px) {
        padding: 15px;
        gap: 15px;
        left: ${({ sidebarVisible }) => (sidebarVisible ? "27%" : "8%")}; 
        width: ${({ sidebarVisible }) => (sidebarVisible ? "73%" : "92%")};
    }

    @media (max-width: 480px) {
        padding: 10px;
        gap: 10px;
        left: ${({ sidebarVisible }) => (sidebarVisible ? "45%" : "9.4%")}; 
        width: ${({ sidebarVisible }) => (sidebarVisible ? "55%" : "92%")}; 
    }
`;
export const Background_Menu = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;           
    background: transparent;
    width: 100%;
    height: 100%;  
    border-radius: 10px;       
    position: relative; 
    top: 0%;   
    left: 2%;

    @media (max-width: 768px) {
        
    }

    @media (max-width: 480px) {
        
    }
`;