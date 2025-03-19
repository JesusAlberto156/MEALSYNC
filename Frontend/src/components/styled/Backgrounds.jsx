import styled from 'styled-components';

//--------SIDEBAR--------
export const Background_Sidebar = styled.div`
    position: fixed;
    left: 0px;
    top: 0px;
    width: 100%;
    height: 7%;
    gap: 10px;
    opacity: 0.9;
    background: transparent;
    display: flex;            
    justify-content: flex-start;
    align-items: center;
    z-index:1000;
`;
//--------SIDEBAR--------
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
//--------NAVBAR--------
export const Background_Navbar = styled.div`
    width: 100%;
    height: 100%;
    background: rgb(58,93,174);
    border-radius: 20px;
    display: flex;            
    justify-content: flex-start;
    align-items: center; 
    padding: 0 1px; 
    flex-wrap: nowrap;
    overflow-x: auto;
    white-space: nowrap;
    scrollbar-width: thin;
    scrollbar-color: rgba(255, 255, 255, 0.5) transparent;

    @media (max-width: 768px) {
        height: 90%;
    }

    @media (max-width: 480px) {
        height: 75%;
    }
`;
//--------NAVBAR--------
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
export const Background_Modal_Out_Login = styled.div`
    max-height: 90vh;
    max-width: 90vw;
    background: white;
    border: 3px solid black;
    padding: 30px;
    border-radius: 30px;
    box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.1);
`;
export const Background_Modal_Shopping_Cart = styled.div`
    max-height: 90vh;
    max-width: 90vw;
    overflow-y: auto;
    overflow-x: hidden;
    background: white;
    padding: 20px;
    border-radius: 5px;
    box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.1);
`;
export const Background_Modal_Alert_Medico = styled.div`
    max-height: 90vh;
    max-width: 90vw;
    overflow-y: auto;
    overflow-x: hidden;
    background: white;
    padding: 20px;
    border-radius: 5px;
    box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.1);
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
//--------ERROR--------
export const Background_Error = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    position: fixed; 
    justify-content: center; 
    align-items: center;   
    flex-direction: column;
    gap:10px;      
    top: 0; 
    left: 0;
    background: rgb(100, 15, 15);
`;
//--------ERROR--------
//--------LOADING--------
export const Background_Loading = styled.div`
   width: 100%;
    height: 100%;
    display: flex;
    position: fixed; 
    justify-content: center; 
    align-items: center;   
    flex-direction: column;
    gap:10px;      
    top: 0; 
    left: 0; 
    background: rgb(58,93,174)
`;
//--------LOADING--------
//--------ADMINISTRATION--------
export const Background_Administration = styled.div.withConfig({
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
//--------ADMINISTRATION--------