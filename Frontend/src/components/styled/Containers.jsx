import styled from 'styled-components';
import Background_Login_Dark from '../imgs/Background-Administration-Dark.jpeg'
import Background_Login_Light from '../imgs/Background-Administration-Light.jpg';
import Background_Menu_Dark from '../imgs/Background-Menu-Dark.jpg';
import Background_Menu_Light from '../imgs/Background-Menu-Light.jpg';
import Background_Administration_Dark from '../imgs/Background-Administration-Dark.jpeg';
import Background_Administration_Light from '../imgs/Background-Administration-Light.jpg'

//____________PAGE____________
export const Container_Page = styled.div`
    background-color:aliceblue;
    display: flex;
    height: auto;
    flex-direction: column;
    overflow-y: scroll;   
    scrollbar-width: none;
    -ms-overflow-style: none;

    ::-webkit-scrollbar {
        display: none;
    }
`;
export const Container_Page_Login_Dark = styled.div`
    background-image: url(${Background_Login_Dark});    
    background-Size: cover;
    background-Position: center;
    width: 100vw;
    height: 100vh;
    max-height: none;
    position: relative;
    display: flex;
    justify-content: flex-start;
    align-Items: center;
    flex-direction: column;
    padding-top: 60px;
`;
export const Container_Page_Login_Light = styled.div`
    background-image: url(${Background_Login_Light});    
    background-Size: cover;
    background-Position: center;
    width: 100vw;
    height: 100vh;
    max-height: none;
    position: relative;
    display: flex;
    justify-content: flex-start;
    align-Items: center;
    flex-direction: column;
    padding-top: 60px;
`;
export const Container_Page_Menu_Dark = styled.div`
    background-image: url(${Background_Menu_Dark});    
    background-Size: cover;
    background-Position: center;
    width: 100vw;
    height: 100vh;
    max-height: none;
    position: relative;
    display: flex;
    justify-content: center;
    align-Items: center;
`;
export const Container_Page_Menu_Light = styled.div`
    background-image: url(${Background_Menu_Light});    
    background-Size: cover;
    background-Position: center;
    width: 100vw;
    height: 100vh;
    max-height: none;
    position: relative;
    display: flex;
    justify-content: center;
    align-Items: center;
`;
export const Container_Page_Administration_Dark = styled.div`
    background-image: url(${Background_Administration_Dark});    
    background-Size: cover;
    background-Position: center;
    width: 100vw;
    height: 100vh;
    max-height: none;
    position: relative;
    display: flex;
    justify-content: center;
    align-Items: center;
`;
export const Container_Page_Administration_Light = styled.div`
    background-image: url(${Background_Administration_Light});    
    background-Size: cover;
    background-Position: center;
    width: 100vw;
    height: 100vh;
    max-height: none;
    position: relative;
    display: flex;
    justify-content: center;
    align-Items: center;
`;
export const Container_Page_Error_Dark = styled.div`
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
    background:rgb(125, 27, 27);
`;
export const Container_Page_Error_Light = styled.div`
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
    background: rgb(229, 44, 44);
`;
export const Container_Page_Loading_Dark = styled.div`
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
    background:rgb(58,93,174);
`;
export const Container_Page_Loading_Light = styled.div`
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
    background: rgb(82, 126, 231);
`;
export const Container_Page_Elements = styled.div.withConfig({
    shouldForwardProp: (prop) => prop !== 'sidebarVisible'
  })`
    position: fixed;
    top: 0%;
    left: ${({ sidebarVisible }) => (sidebarVisible ? "21.2%" : "5%")};
    width: ${({ sidebarVisible }) => (sidebarVisible ? "83%" : "100%")};
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
    background-color:transparent;
    text-align: center;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    gap: 15px;
    padding-top: 30px;
    transition: all 0.3s ease;

    &::-webkit-scrollbar {
        display: none;
    }
    
    @media (max-width: 768px) {
        padding: 15px;
        padding-top: 15px;
        gap: 10px;
        left: ${({ sidebarVisible }) => (sidebarVisible ? "32%" : "6%")}; 
        width: ${({ sidebarVisible }) => (sidebarVisible ? "70%" : "100%")};
    }

    @media (max-width: 480px) {
        padding: 10px;
        padding-top: 10px;
        gap: 5px;
        left: ${({ sidebarVisible }) => (sidebarVisible ? "42%" : "8%")}; 
        width: ${({ sidebarVisible }) => (sidebarVisible ? "60%" : "98%")}; 
    }
`;
//____________PAGE____________
//____________FORM____________
export const Container_Form_350_Dark = styled.div`
    position: relative;
    z-index: 40;
    width: 350px;
    max-height: 72vh;
    margin: 30px auto;
    padding: 10px;
    border-radius: 50px;
    border: 4px solid white;
    background-color:rgba(41, 41, 40, 0.8);
    text-align: center;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    overflow-y: auto;
    scrollbar-width: none;
    -ms-overflow-style: none;
    margin-top: 15px;

    &::-webkit-scrollbar {
        display: none;
    }
    
    @media (max-width: 768px) {
        width: 300px;
        padding: 8px;
    }

    @media (max-width: 480px) {
        width: 250px;    
        padding: 6px;
    }
`;
export const Container_Form_350_Light = styled.div`
    position: relative;
    z-index: 40;
    width: 350px;
    max-height: 72vh;
    margin: 30px auto;
    padding: 10px;
    border-radius: 50px;
    border: 4px solid black;
    background-color:rgba(204, 203, 198, 0.7);
    text-align: center;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    overflow-y: auto;
    scrollbar-width: none;
    -ms-overflow-style: none;
    margin-top: 15px;
    
    &::-webkit-scrollbar {
        display: none;
    }
    
    @media (max-width: 768px) {
        width: 300px;
        padding: 8px;
    }

    @media (max-width: 480px) {
        width: 250px;    
        padding: 6px;
    }
`;
export const Container_Form_400_Dark = styled.div`
    position: relative;
    z-index: 40;
    width: 400px;
    max-height: 72vh;
    margin-left: 30px;
    padding: 10px;
    border-radius: 50px;
    border: 4px solid white;
    background-color:rgba(41, 41, 40, 0.8);
    text-align: center;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    overflow-y: auto;
    scrollbar-width: none;
    -ms-overflow-style: none;

    &::-webkit-scrollbar {
        display: none;
    }
    
    @media (max-width: 768px) {
        width: 350px;
        padding: 8px;
        margin-left: 25px;
    }

    @media (max-width: 480px) {
        width: 300px;    
        padding: 6px;
        margin-left: 20px;
    }
`;
export const Container_Form_400_Light = styled.div`
    position: relative;
    z-index: 40;
    width: 400px;
    max-height: 72vh;
    margin-left: 30px;
    padding: 10px;
    border-radius: 50px;
    border: 4px solid black;
    background-color:rgba(204, 203, 198, 0.7);
    text-align: center;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    overflow-y: auto;
    scrollbar-width: none;
    -ms-overflow-style: none;
    
    &::-webkit-scrollbar {
        display: none;
    }
    
    @media (max-width: 768px) {
        width: 350px;
        padding: 8px;
        margin-left: 25px;
    }

    @media (max-width: 480px) {
        width: 300px;    
        padding: 6px;
        margin-left: 20px;
    }
`;
//____________FORM____________
//____________MODAL____________
export const Container_Modal = styled.div`
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
//____________MODAL____________
//____________BUTTOM____________
export const Container_Button = styled.div`
    display: flex;
    gap: 15px; 
    justify-content: center; 
    align-items: center;
    height: 60px;
    width: 94%;
    padding: 10px;
    margin-top: 0px;
    margin-bottom: 5px;

    @media (max-width: 768px) {
        gap: 10px;
        padding: 8px;
        height: 50px;
    }

    @media (max-width: 480px) {
        gap: 5px;
        padding: 6px;
        height: 40px;
    }
`;
export const Container_Button_Border_Dark = styled.div`
    display: flex;
    gap: 15px; 
    justify-content: center; 
    align-items: center;
    border: 2px solid white;
    border-radius: 50px;
    height: 60px;
    width: 94%;
    padding: 10px;
    margin-top: 0px;
    margin-bottom: 5px;

    @media (max-width: 768px) {
        gap: 10px;
        padding: 8px;
        height: 50px;
    }

    @media (max-width: 480px) {
        gap: 5px;
        padding: 6px;
        height: 40px;
    }
`;
export const Container_Button_Border_Light = styled.div`
    display: flex;
    gap: 15px; 
    justify-content: center; 
    align-items: center;
    border: 2px solid black;
    border-radius: 50px;
    height: 60px;
    width: 94%;
    padding: 10px;
    margin-top: 0px;
    margin-bottom: 5px;

    @media (max-width: 768px) {
        gap: 10px;
        padding: 8px;
        height: 50px;
    }

    @media (max-width: 480px) {
        gap: 5px;
        padding: 6px;
        height: 40px;
    }
`;
export const Container_Setting_Dark = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;           
    background: transparent;
    width: 90%;
    height: 40px;  
    border-radius: 50px; 
    border: none;      
    position: relative; 
    padding: 4px;
    gap: 15px;
    margin-left: 15px;
    padding-left: 40px;

    @media (max-width: 768px) {
        height: 50px;
        padding: 3px;
        gap: 10px;  
        margin-left: 10px;
        padding-left: 30px;  
    }

    @media (max-width: 480px) {
        height: 40px;
        padding: 2px;
        gap: 5px;
        margin-left: 5px;
        padding-left: 20px;
    }
`;
export const Container_Setting_Light = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;           
    background: transparent;
    width: 90%;
    height: 40px;  
    border-radius: 50px; 
    border: none;      
    position: relative; 
    padding: 4px;
    gap: 15px;
    margin-left: 15px;
    padding-left: 40px;

    @media (max-width: 768px) {
        height: 50px;
        padding: 3px;
        gap: 10px;    
        margin-left: 10px;
        padding-left: 30px;
    }

    @media (max-width: 480px) {
        height: 40px;
        padding: 2px;
        gap: 5px;
        margin-left: 5px;
        padding-left: 20px;
    }
}
`;
//____________BUTTOM____________
//____________SIDEBAR____________
export const Container_Sidebar_Dark = styled.div`
    width: 260px;
    padding: 5px;
    background-color: rgba(0, 0, 0, 0.8);
    height: 100vh;
    border: 4px solid white;
    box-sizing: border-box;
    position: fixed;
    top: 0;
    left: 0;
    transition: transform 0.3s ease;
    overflow-y: auto;
    scrollbar-width: none;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    gap: 14px;
    z-index: 30;

    &.visible {
        transform: translateX(0);
    }

    &.hidden {
        transform: translateX(-78%);
    }

    @media (max-width: 768px) {
        gap: 12px;
        padding: 4px;
        width: 240px;
    }

    @media (max-width: 480px) {
        gap: 10px;
        padding: 3px;
        width: 200px;
    }
}
`;
export const Container_Sidebar_Light = styled.div`
    width: 260px;
    padding: 5px;
    background-color: rgba(255, 255, 255, 0.7);
    height: 100vh;
    border: 4px solid black;
    box-sizing: border-box;
    position: fixed;
    top: 0;
    left: 0;
    transition: transform 0.3s ease;
    overflow-y: auto;
    scrollbar-width: none;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    gap: 14px;
    z-index: 30;

    &.visible {
        transform: translateX(0);
    }

    &.hidden {
        transform: translateX(-78%);
    }

    @media (max-width: 768px) {
        gap: 12px;
        padding: 4px;
        width: 240px;
    }

    @media (max-width: 480px) {
        gap: 10px;
        padding: 3px;
        width: 200px;
    }
}
`;
export const Container_Icon = styled.div`
    text-align: center;
    margin-top: 60px;

    @media (max-width: 768px) {
        margin-top: 50px;
    }

    @media (max-width: 480px) {
        margin-top: 40px;
    }
}
`;
//____________SIDEBAR____________
//____________NAVBAR____________
export const Container_Navbar_Dark = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;           
    background: black;
    width: 90%;
    height: 60px;  
    border-radius: 50px; 
    border: 4px solid white;      
    position: relative; 
    opacity:0.9;
    padding: 4px;
    gap: 15px;
    margin-left: 15px;

    @media (max-width: 768px) {
        height: 50px;
        padding: 3px;
        gap: 10px;  
        margin-left: 10px;  
    }

    @media (max-width: 480px) {
        height: 40px;
        padding: 2px;
        gap: 5px;
        margin-left: 5px;
    }
`;
export const Container_Navbar_Light = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;           
    background: white;
    width: 90%;
    height: 60px;  
    border-radius: 50px; 
    border: 4px solid black;      
    position: relative; 
    opacity:0.9;
    padding: 4px;
    gap: 15px;
    margin-left: 15px;

    @media (max-width: 768px) {
        height: 50px;
        padding: 3px;
        gap: 10px;    
        margin-left: 10px;
    }

    @media (max-width: 480px) {
        height: 40px;
        padding: 2px;
        gap: 5px;
        margin-left: 5px;
    }
`;
export const Container_Navbar_Button_Dark = styled.div`
    width: 90%;
    height: 55px;
    gap: 7px;
    background: rgb(82, 126, 231);
    border-radius: 50px;
    border: 2px solid white; 
    display: flex;            
    justify-content: flex-start;
    align-items: center; 
    padding-left: 25px; 
    flex-wrap: nowrap;
    overflow-x: auto;
    scrollbar-width: none;
    -ms-overflow-style: none;
    white-space: nowrap;

    &::-webkit-scrollbar {
        display: none;
    }

    @media (max-width: 768px) {
        height: 45px;
        padding-left: 20px;
        gap: 6px;
    }

    @media (max-width: 480px) {
        height: 35px;
        padding-left: 15px;
        gap: 5px;
    }
`;
export const Container_Navbar_Button_Light = styled.div`
    width: 90%;
    height: 55px;
    gap: 7px;
    background: rgb(58,93,174);
    border-radius: 50px;
    border: 2px solid black; 
    display: flex;            
    justify-content: flex-start;
    align-items: center; 
    padding-left: 25px; 
    flex-wrap: nowrap;
    overflow-x: auto;
    scrollbar-width: none;
    -ms-overflow-style: none;
    white-space: nowrap;

    &::-webkit-scrollbar {
        display: none;
    }

    @media (max-width: 768px) {
        height: 45px;
        padding-left: 20px;
        gap: 6px;
    }

    @media (max-width: 480px) {
        height: 35px;
        padding-left: 15px;
        gap: 5px;
    }
`;
//____________NAVBAR____________
//____________SEARCHBAR____________
export const Container_Search_Bar = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;  
    display: flex;            
    justify-content: flex-end;         
    background: black;
    width: 90%;
    height: 60px;  
    border-radius: 50px; 
    border: 4px solid white;      
    position: relative; 
    opacity:0.9;
    padding: 4px;
    gap: 8px;
    margin-left: 15px;

    @media (max-width: 768px) {
        height: 50px;
        padding: 3px;
        gap: 6px;  
        margin-left: 10px;  
    }

    @media (max-width: 480px) {
        height: 40px;
        padding: 2px;
        gap: 4px;
        margin-left: 5px;
    }
`;
//____________SEARCHBAR____________
//____________TEXT____________
export const Container_Text_20 = styled.div`
    width: 20%;
    display: flex;
    gap: 15px; 
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
//____________TEXT____________
//____________INPUT____________
export const Container_Input_Border_Dark = styled.div`
    display: flex;
    gap: 20px;
    flex-direction: column; 
    justify-content: center; 
    align-items: center;
    border: 2px solid white;
    border-radius: 30px;
    height: 220px;
    width: 96%;
    padding: 5px;
    padding-bottom: 20px;
    padding-top: 20px;

    @media (max-width: 768px) {
        gap: 15px;
        padding: 4px;
        padding-bottom: 15px;
        padding-top: 15px;
    }

    @media (max-width: 480px) {
        gap: 10px;
        padding: 4px;
        padding-bottom: 10px;
        padding-top: 10px;
    }
`;
export const Container_Input_Border_Light = styled.div`
    display: flex;
    gap: 20px;
    flex-direction: column; 
    justify-content: center; 
    align-items: center;
    border: 2px solid black;
    border-radius: 30px;
    height: 220px;
    width: 96%;
    padding: 5px;
    padding-bottom: 20px;
    padding-top: 20px;

    @media (max-width: 768px) {
        gap: 15px;
        padding: 4px;
        padding-bottom: 15px;
        padding-top: 15px;
    }

    @media (max-width: 480px) {
        gap: 10px;
        padding: 4px;
        padding-bottom: 10px;
        padding-top: 10px;
    }
`;
//____________INPUT____________
//____________SELECT____________
export const Container_Select_Dark = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center; 
    align-items: center;
    gap: 15px;
    border: 2px solid white;
    border-radius: 50px;
    max-height: 20vh;
    max-width: 90vw;
    padding: 10px;
    margin-bottom: 10px;

    @media (max-width: 768px) {
        gap: 10px;
        margin-bottom: 10px;
    }

    @media (max-width: 480px) {
        gap: 5px;
        margin-bottom: 10px;
    }
`;
export const Container_Select_Light = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center; 
    align-items: center;
    gap: 15px;
    border: 2px solid black;
    border-radius: 50px;
    max-height: 20vh;
    max-width: 90vw;
    padding: 10px;
    margin-bottom: 10px;

    @media (max-width: 768px) {
        gap: 10px;
        margin-bottom: 10px;
    }

    @media (max-width: 480px) {
        gap: 5px;
        margin-bottom: 10px;
    }
`;
//____________SELECT____________
//____________CHECK____________
export const Container_Check_Dark = styled.div`
    display: flex;
    justify-content: center; 
    align-items: center;
    border: 2px solid white;
    border-radius: 50px;
    max-height: 20vh;
    max-width: 90vw;
    gap: 15px;
    padding: 10px;
    margin-bottom: 10px;

    @media (max-width: 768px) {
        gap: 10px;
        margin-bottom: 10px;
    }

    @media (max-width: 480px) {
        gap: 5px;
        margin-bottom: 10px;
    }
`;
export const Container_Check_Light = styled.div`
    display: flex;
    justify-content: center; 
    align-items: center;
    border: 2px solid black;
    border-radius: 50px;
    max-height: 20vh;
    max-width: 90vw;
    gap: 15px;
    padding: 10px;
    margin-bottom: 10px;

    @media (max-width: 768px) {
        gap: 10px;
        margin-bottom: 10px;
    }

    @media (max-width: 480px) {
        gap: 5px;
        margin-bottom: 10px;
    }
`;
//____________CHECK____________
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
//--------MODAL---------
export const Container_Button_Modal = styled.div`
    display: flex;
    gap: 15px; 
    justify-content: center; 
    align-items: center;
    border: 2px solid white;
    border-radius: 30px;
    max-height: 20vh;
    max-width: 90vw;
    padding: 10px;
    margin-top: 10px;

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