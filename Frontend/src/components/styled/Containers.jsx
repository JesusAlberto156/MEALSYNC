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
        height: 14%;
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
export const Container_Button_Search_Bar = styled.div`
    display: flex;
    width: 50%;
    gap: 20px; 
    justify-content: flex-end; 
    alignItems: center;


    @media (max-width: 768px) {
        width: 65%;
        gap: 15px;
    }

    @media (max-width: 480px) {
        width: 80%;
        gap: 10px;
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
    justify-content: center; 
    align-items: center;

    @media (max-width: 768px) {
        gap: 10px;
    }

    @media (max-width: 480px) {
        gap: 5px;
    }
`;
export const Container_Select_Modal = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center; 
    align-items: center;
    gap: 15px;

    @media (max-width: 768px) {
        gap: 10px;
    }

    @media (max-width: 480px) {
        gap: 5px;
    }
`;
export const Container_Checkbox_Modal = styled.div`
    display: flex;
    justify-content: center; 
    align-items: center;
    gap: 15px;

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
//--------ERROR--------
export const Container_Title_Error = styled.div`
    width: 20%;
    display: flex;
    gap: 20px; 
    justify-content: center; 
    align-items: center;

    @media (max-width: 768px) {
        gap: 10px;
        width: 50%;
    }

    @media (max-width: 480px) {
        gap: 5px;
        width: 60%;
    }
`;
//--------ERROR--------
//--------LOADING--------
export const Container_Title_Loading = styled.div`
    width: 20%;
    display: flex;
    gap: 20px; 
    justify-content: center; 
    align-items: center;

    @media (max-width: 768px) {
        gap: 10px;
        width: 50%;
    }

    @media (max-width: 480px) {
        gap: 5px;
        width: 60%;
    }
`;
//--------LOADING--------
//--------OPTION NAVBAR--------
export const Container_Option_Navbar = styled.div`
    display: flex;    
    flex-direction: column;                
    justify-content: flex-start;     
    align-items: center;      
    background: transparent;
    width: 100%;
    height: auto;   
    border-radius: 10px;       
    position: relative; 
    top: 6%;   
    left: 1%;        
    z-index: 1000;
    @media (max-width: 768px) {
        top: 5%;   
        left: 3%;    
    }

    @media (max-width: 480px) {
        top: 4%;
        left: 5%;  
    }
`
//--------OPTION NAVBAR--------
//--------TABLE PAGINATION--------
export const Container_Table_Pagination = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 2%;
    margin-top: 3%;
    width: 80%;
`;
//--------TABLE PAGINATION--------