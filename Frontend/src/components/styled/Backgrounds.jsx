import styled from 'styled-components';

//--------MENU--------
export const Background_Menu = styled.div.withConfig({
    shouldForwardProp: (prop) => prop !== 'sidebarVisible'
  })`
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
//--------MENU--------
//--------MODAL--------
export const Background_Modal = styled.div`
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
export const Background_Modal_Componets = styled.div`
    max-height: 90vh;
    width: 40vw;
    overflow-y: auto;
    overflow-x: hidden;
    border: 2px solid white;
    background-color:rgba(204, 203, 198, 0.8);
    padding: 20px;
    border-radius: 35px;
    box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.1);

    @media (max-width: 768px) {
        padding: 18px;
        width: 60vw;
    }
    
    @media (max-width: 480px) {
        padding: 16px;
        width: 65vw;
    }
`;
//--------MODAL--------
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