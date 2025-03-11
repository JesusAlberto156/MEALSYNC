import styled from 'styled-components';

//--------MENU--------
export const Container_Menu = styled.div`
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
`;
//--------MENU--------
//--------NAVBAR--------
export const Container_Navbar = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;           
    background: transparent;
    width: 100%;
    height: 10%;  
    border-radius: 10px;       
    position: relative; 
    top: 5%;   
    left: 1%;
    opacity:0.9;

    @media (max-width: 768px) {
        height: 12%;
    }

    @media (max-width: 480px) {
        height: 14%;
        padding: 10px;
    }
`;
//--------NAVBAR--------
//--------SEARCH-BAR--------
export const Container_Search_Bar = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;           
    background: transparent;
    width: 100%;
    height: 4%;  
    border-radius: 10px;       
    position: relative; 
    top: 6%;   
    left: 1%;
    display: flex;            
    justify-content: flex-start;
    z-index: 1000;
    @media (max-width: 768px) {
        height: 8%;
    }

    @media (max-width: 480px) {
        height: 10%;
        top: 4%; 
    }
`;
//--------SEARCH-BAR--------
//--------MODAL---------
export const Container_Modal = styled.div`
    position: relative;
`;
export const Container_Button_Modal = styled.div`
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
//--------MODAL---------
//--------FOOTER--------
export const Container_Button_Footer = styled.div`
    margin-left: 35%;
    width: 30%;
    display: flex;
    gap: 20px; 
    justify-content: center; 
    align-items: center;

    @media (max-width: 768px) {
        gap: 10px;
        margin-left: 25%;
        width: 50%;
    }

    @media (max-width: 480px) {
        gap: 5px;
        margin-left: 20%;
        width: 60%;
    }
`;
//--------FOOTER--------