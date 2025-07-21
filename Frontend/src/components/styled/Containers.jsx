//____________IMPORT/EXPORT____________
// Componentes de React externos
import styled from 'styled-components';
//__________IMAGE__________
// Imagenes de fondo para login
import Background_Login from '../imgs/Background-Login.webp';
// AREÁ ADMINISTRATIVA
// Inicio
import Background_Home from '../imgs/Background-Home.jpg';
// Usuarios
import Background_Users from '../imgs/Background-Users.jpg';
// Proveedores
import Background_Suppliers from '../imgs/Background-Suppliers.jpg';
// Menus
import Background_Menus_Menu from '../imgs/Background-Menu-Menu.jpg';
import Background_Menus_Dishes from '../imgs/Background-Menu-Dishes.jpg';
import Background_Menus_Side_Dishes from '../imgs/Background-Menu-Side-Dishes.jpg';
import Background_Menus_Drinks from '../imgs/Background-Menu-Drinks.jpg';
// AREÁ COCINA
//__________IMAGE__________
//____________IMPORT/EXPORT____________

//____________PAGE____________
export const Container_Page = styled.div`
    display: flex;
    justify-content: flex-start;
    width: 100vw;
    min-height: 100vh;
    max-height: none;
`;
export const Container_Page_Login = styled.div`
    background-image: url(${(Background_Login)});
    background-Size: cover;
    background-Position: center;
    background-repeat: no-repeat;
    width: 100%;
    max-height: 100vh;
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-Items: center;
    justify-content: center;
    overflow-y: auto

    &::-webkit-scrollbar {
        width: 6px;          
        height: 6px;  
        background-color:rgb(255, 255, 255);
        border-radius: 20px;
        box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.41);
    }

    &::-webkit-scrollbar-thumb {
        background-color: rgb(58,93,174);
        border-radius: 30px;
        border: 1px solid rgb(255, 255, 255);
        cursor: pointer;
    }

    &::-webkit-scrollbar-thumb:hover {
        background-color: rgb(82, 126, 231);
    }

    @media (max-width: 480px) {
        &::-webkit-scrollbar {
            width: 4px;          
            height: 4px;  
        }
    }
`;
export const Container_Page_Logged = styled.div.withConfig({
    shouldForwardProp: (prop) => prop !== 'TypeUser' && prop !== 'Logged' && prop !== 'Sidebar' && prop !== 'Navbar',
})`
    ${({ TypeUser,Sidebar,Logged }) => (TypeUser === 'Administrador' || TypeUser === 'Chef' || TypeUser === 'Almacenista') && (Sidebar === 'Inicio') && Logged ? 
        `background-image: url(${Background_Home});`:''
    }
    ${({ TypeUser,Sidebar,Logged }) => (TypeUser === 'Administrador' || TypeUser === 'Chef' || TypeUser === 'Almacenista') && (Sidebar === 'Usuarios') && Logged ? 
        `background-image: url(${Background_Users});`:''
    }
    ${({ TypeUser,Sidebar,Logged }) => (TypeUser === 'Administrador' || TypeUser === 'Chef' || TypeUser === 'Almacenista') && (Sidebar === 'Proveedores') && Logged ? 
        `background-image: url(${Background_Suppliers});`:''
    }
    ${({ TypeUser,Sidebar,Navbar,Logged }) => (TypeUser === 'Administrador' || TypeUser === 'Chef' || TypeUser === 'Almacenista') && (Sidebar === 'Menus') && (Navbar === 'Menus') && Logged ? 
        `background-image: url(${Background_Menus_Menu});`:''
    }
    ${({ TypeUser,Sidebar,Navbar,Logged }) => (TypeUser === 'Administrador' || TypeUser === 'Chef' || TypeUser === 'Almacenista') && (Sidebar === 'Menus') && (Navbar === 'Platillos') && Logged ? 
        `background-image: url(${Background_Menus_Dishes});`:''
    }
    ${({ TypeUser,Sidebar,Navbar,Logged }) => (TypeUser === 'Administrador' || TypeUser === 'Chef' || TypeUser === 'Almacenista') && (Sidebar === 'Menus') && (Navbar === 'Guarniciones') && Logged ? 
        `background-image: url(${Background_Menus_Side_Dishes});`:''
    }
    ${({ TypeUser,Sidebar,Navbar,Logged }) => (TypeUser === 'Administrador' || TypeUser === 'Chef' || TypeUser === 'Almacenista') && (Sidebar === 'Menus') && (Navbar === 'Bebidas') && Logged ? 
        `background-image: url(${Background_Menus_Drinks});`:''
    }
    background-Size: cover;
    background-Position: center;
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: flex-start;
    flex-direction: column;
    align-Items: center;
`;
export const Container_Page_Elements = styled.div.withConfig({
    shouldForwardProp: (prop) => prop !== 'sidebarVisible'
})`
    margin-left: ${({ sidebarVisible }) => (sidebarVisible ? "19%" : "0%")};
    width: 100%;
    max-width: ${({ sidebarVisible }) => (sidebarVisible ? "81vw" : "100vw")}; 
    min-height: 100vh;
    overflow-y: auto;
    gap: 20px;
    display: flex;
    flex-direction: column;
    align-Items: center;
    justify-content: flex-start;
    box-sizing: border-box;
    transition: all ${({ sidebarVisible }) => (sidebarVisible ? "0.3s" : "1.0s")} ease;

    &::-webkit-scrollbar {
        width: 6px;          
        height: 6px;  
        background-color:rgb(255, 255, 255);
        border-radius: 20px;
        box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.41);
    }

    &::-webkit-scrollbar-thumb {
        background-color: rgb(58,93,174);
        border-radius: 30px;
        border: 1px solid rgb(255, 255, 255);
        cursor: pointer;
    }

    &::-webkit-scrollbar-thumb:hover {
        background-color: rgb(82, 126, 231);
    }

    @media (max-width: 768px) {
        gap: 15px;
        margin-left: ${({ sidebarVisible }) => (sidebarVisible ? "28%" : "0%")};  
        max-width: ${({ sidebarVisible }) => (sidebarVisible ? "72vw" : "100vw")}; 
    }

    @media (max-width: 480px) {
        gap: 10px;
        margin-left: ${({ sidebarVisible }) => (sidebarVisible ? "38%" : "0%")}; 
        max-width: ${({ sidebarVisible }) => (sidebarVisible ? "62vw" : "100vw")}; 

        &::-webkit-scrollbar {
            width: 4px;          
            height: 4px;  
        }
    }
`;
export const Container_Page_Error = styled.div`
    width: 100%;
    min-height: 100vh;
    display: flex;
    justify-content: Center; 
    align-items: center;   
    flex-direction: column;
    gap: 20px;
    background: rgb(155, 9, 9);

    @media (max-width: 768px) {
        gap: 15px;
    }

    @media (max-width: 480px) {
        gap: 10px;
    }
`;
export const Container_Page_Loading = styled.div`
    width: 100%;
    min-height: 100vh;
    display: flex;
    justify-content: Center; 
    align-items: center;   
    flex-direction: column;     
    background: rgb(58,93,174);
`;
//____________PAGE____________
//____________LOGIN____________
export const Container_Form_500 = styled.div.withConfig({
    shouldForwardProp: (prop) => prop !== 'ThemeMode',
})`
    z-index: 100;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    box-sizing: border-box;
    width: 60vw;
    height: 80vh;
    padding: 20px;
    padding-left: 40px;
    padding-right: 40px;
    gap: 15px;
    border-radius: 50px;
    border: 3px solid black;
    border-right: 7px solid black;
    border-bottom: 7px solid black;
    background-color: rgba(255, 255, 255, 0.85);
    
    @media (max-width: 768px) {
        border: 2px solid black;
        border-right: 6px solid black;
        border-bottom: 6px solid black;
        width: 70vw;
        padding: 15px;
        padding-left: 30px;
        padding-right: 30px;
        gap: 10px;
    }

    @media (max-width: 480px) {
        border: 1px solid black;
        border-right: 5px solid black;
        border-bottom: 5px solid black;
        width: 80vw;
        padding: 10px;
        padding-left: 20px;
        padding-right: 20px;
        gap: 5px;
    }
`;
export const Container_Form_450 = styled.div.withConfig({
    shouldForwardProp: (prop) => prop !== 'ThemeMode',
})`
    z-index: 100;
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    box-sizing: border-box;
    width: 450px;
    max-height: 80vh;
    padding: 20px;
    gap: 14px;
    border-radius: 50px;
    border: ${({ ThemeMode }) => (ThemeMode ? '4px solid black' : '4px solid white')};
    background-color: ${({ ThemeMode }) => (ThemeMode ? 'rgb(255,255,255)' : 'rgb(0,0,0)')};
    overflow-y: auto;
    scrollbar-width: none;
    -ms-overflow-style: none;

    &::-webkit-scrollbar {
        display: none;
    }
    
    @media (max-width: 768px) {
        width: 400px;
        padding: 18px;
        gap: 12px;
    }

    @media (max-width: 480px) {
        width: 350px;    
        padding: 16px;
        gap: 10px;
    }
`;
export const Container_Form_400 = styled.div.withConfig({
    shouldForwardProp: (prop) => prop !== 'ThemeMode',
})`
    z-index: 100;
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    box-sizing: border-box;
    width: 400px;
    max-height: 80vh;
    padding: 20px;
    gap: 14px;
    border-radius: 50px;
    border: ${({ ThemeMode }) => (ThemeMode ? '4px solid black' : '4px solid white')};
    background-color: ${({ ThemeMode }) => (ThemeMode ? 'rgb(255,255,255)' : 'rgb(0,0,0)')};
    overflow-y: auto;
    scrollbar-width: none;
    -ms-overflow-style: none;

    &::-webkit-scrollbar {
        display: none;
    }
    
    @media (max-width: 768px) {
        width: 350px;
        padding: 18px;
        gap: 12px;
    }

    @media (max-width: 480px) {
        width: 300px;    
        padding: 16px;
        gap: 10px;
    }
`;
//____________LOGIN____________
//____________ROW____________
export const Container_Row_100_Center = styled.div` 
    display: flex;
    justify-content: center;
    align-items: center;        
    background: transparent;
    width: 100%;
    height: auto;  
    gap: 20px;
     
    @media (max-width: 768px) {
        gap: 15px;    
    }

    @media (max-width: 480px) {
        gap: 10px;
    }
}
`;
export const Container_Row_Auto_Center = styled.div` 
    display: flex;
    justify-content: center;
    align-items: center;        
    background: transparent;
    width: auto;
    height: auto;  
    gap: 20px;
     
    @media (max-width: 768px) {
        gap: 15px;    
    }

    @media (max-width: 480px) {
        gap: 10px;
    }
}
`;
export const Container_Row_NG_100_Center = styled.div` 
    display: flex;
    justify-content: center;
    align-items: center;        
    background: transparent;
    width: 100%;
    height: auto;  
}
`;
export const Container_Row_NG_Auto_Center = styled.div` 
    display: flex;
    justify-content: center;
    align-items: center;        
    background: transparent;
    width: auto;
    height: auto;  
}
`;
export const Container_Row_100_Left = styled.div` 
    display: flex;
    justify-content: flex-start;
    align-items: center;        
    background: transparent;
    padding-top: 6px;
    padding-bottom: 6px;
    width: 100%;
    height: auto;  
    gap: 20px;
     
    @media (max-width: 768px) {
        padding-top: 5px;
        padding-bottom: 5px;
        gap: 15px;    
    }

    @media (max-width: 480px) {
        padding-top: 4px;
        padding-bottom: 4px;
        gap: 10px;
    }
}
`;
export const Container_Row_Auto_Left = styled.div` 
    display: flex;
    justify-content: flex-start;
    align-items: center;        
    background: transparent;
    padding-top: 6px;
    padding-bottom: 6px;
    width: auto;
    height: auto;  
    gap: 20px;
     
    @media (max-width: 768px) {
        padding-top: 5px;
        padding-bottom: 5px;
        gap: 15px;    
    }

    @media (max-width: 480px) {
        padding-top: 4px;
        padding-bottom: 4px;
        gap: 10px;
    }
}
`;
export const Container_Row_100_Right = styled.div` 
    display: flex;
    justify-content: flex-end;
    align-items: center;        
    background: transparent;
    padding-top: 6px;
    padding-bottom: 6px;
    width: 100%;
    height: auto;  
    gap: 20px;
     
    @media (max-width: 768px) {
        padding-top: 5px;
        padding-bottom: 5px;
        gap: 15px;    
    }

    @media (max-width: 480px) {
        padding-top: 4px;
        padding-bottom: 4px;
        gap: 10px;
    }
}
`;
export const Container_Row_Auto_Right = styled.div` 
    display: flex;
    justify-content: flex-end;
    align-items: center;        
    background: transparent;
    padding-top: 6px;
    padding-bottom: 6px;
    width: auto;
    height: auto;  
    gap: 20px;
     
    @media (max-width: 768px) {
        padding-top: 5px;
        padding-bottom: 5px;
        gap: 15px;    
    }

    @media (max-width: 480px) {
        padding-top: 4px;
        padding-bottom: 4px;
        gap: 10px;
    }
}
`;
//____________ROW____________
//____________COLUMN____________
export const Container_Column_100_Center = styled.div` 
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;        
    background: transparent;
    width: 100%;
    height: auto;  
    gap: 20px;
     
    @media (max-width: 768px) {
        gap: 18px;    
    }

    @media (max-width: 480px) {
        gap: 16px;
    }
}
`;
export const Container_Column_Auto_Center = styled.div` 
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;        
    background: transparent;
    width: auto;
    height: auto;  
    gap: 20px;
     
    @media (max-width: 768px) {
        gap: 18px;    
    }

    @media (max-width: 480px) {
        gap: 16px;
    }
}
`;
export const Container_Column_NG_100_Center = styled.div` 
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;        
    background: transparent;
    width: 100%;
    height: auto;  
}
`;
export const Container_Column_NG_Auto_Center = styled.div` 
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;        
    background: transparent;
    width: auto;
    height: auto;  
}
`;
export const Container_Column_100_Left = styled.div` 
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;        
    background: transparent;
    padding-top: 6px;
    padding-bottom: 6px;
    width: 100%;
    height: auto;  
    gap: 20px;
     
    @media (max-width: 768px) {
        padding-top: 5px;
        padding-bottom: 5px;
        gap: 18px;    
    }

    @media (max-width: 480px) {
        padding-top: 4px;
        padding-bottom: 4px;
        gap: 16px;
    }
}
`;
export const Container_Column_Auto_Left = styled.div` 
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;       
    background: transparent;
    padding-top: 6px;
    padding-bottom: 6px;
    width: auto;
    height: auto;  
    gap: 20px;
     
    @media (max-width: 768px) {
        padding-top: 5px;
        padding-bottom: 5px;
        gap: 18px;    
    }

    @media (max-width: 480px) {
        padding-top: 4px;
        padding-bottom: 4px;
        gap: 16px;
    }
}
`;
export const Container_Column_NG_100_Left = styled.div` 
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;        
    background: transparent;
    padding-top: 6px;
    padding-bottom: 6px;
    width: 100%;
    height: auto;  
     
    @media (max-width: 768px) {
        padding-top: 5px;
        padding-bottom: 5px;   
    }

    @media (max-width: 480px) {
        padding-top: 4px;
        padding-bottom: 4px;
    }
}
`;
export const Container_Column_NG_Auto_Left = styled.div` 
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;        
    background: transparent;
    padding-top: 6px;
    padding-bottom: 6px;
    width: auto;
    height: auto;  
     
    @media (max-width: 768px) {
        padding-top: 5px;
        padding-bottom: 5px;   
    }

    @media (max-width: 480px) {
        padding-top: 4px;
        padding-bottom: 4px;
    }
}
`;
export const Container_Column_100_Right = styled.div` 
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-end;        
    background: transparent;
    padding-top: 6px;
    padding-bottom: 6px;
    width: 100%;
    height: auto;  
    gap: 20px;
     
    @media (max-width: 768px) {
        padding-top: 5px;
        padding-bottom: 5px;
        gap: 18px;    
    }

    @media (max-width: 480px) {
        padding-top: 4px;
        padding-bottom: 4px;
        gap: 16px;
    }
}
`;
export const Container_Column_Auto_Right = styled.div` 
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-end;        
    background: transparent;
    padding-top: 6px;
    padding-bottom: 6px;
    width: auto;
    height: auto;  
    gap: 20px;
     
    @media (max-width: 768px) {
        padding-top: 5px;
        padding-bottom: 5px;
        gap: 18px;    
    }

    @media (max-width: 480px) {
        padding-top: 4px;
        padding-bottom: 4px;
        gap: 16px;
    }
}
`;
//____________COLUMN____________
//____________MODAL____________
export const Container_Modal_Background_Black = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.45);
    display: flex;
    flex-direction: column; 
    justify-content: center;
    align-items: center;
    z-index: 1000;
    overflow-y: auto;
`;
export const Container_Modal_Image = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 15vw;
    height: 15vw;
    background-color: rgba(255, 255, 255, 0.90);
    clip-path: polygon(0 0, 100% 0, 0 100%);
    z-index: 999;

    @media (max-width: 1000px) { 
        width: 20vw;
        height: 20vw;
    }

    @media (max-width: 768px) { 
        width: 25vw;
        height: 25vw;
    }

    @media (max-width: 480px) {
        width: 30vw;
        height: 30vw;
    }
`;
export const Container_Modal_Form_White_600 = styled.div`
    z-index: 100;
    position: relative;
    display: flex;
    justify-content: flex-start;
    width: 600px;
    height: auto;
    max-height: 80vh;
    padding: 20px;
    border-radius: 50px;
    border: 3px solid black;
    border-right: 8px solid black;
    border-bottom: 8px solid black;
    background-color: rgba(255, 255, 255, 0.75);

    @media (max-width: 768px) {
        border-radius: 30px;
        border: 2px solid black;
        border-right: 7px solid black;
        border-bottom: 7px solid black;
        padding: 15px;
        width: 450px;
        max-height: 70vh;
    }

    @media (max-width: 480px) {
        border-radius: 20px;
        border: 1px solid black;
        border-right: 6px solid black;
        border-bottom: 6px solid black;
        padding: 10px;
        width: 300px;
        max-height: 60vh;
    }
`;
export const Container_Modal_Form_White_500 = styled.div`
    z-index: 100;
    position: relative;
    display: flex;
    justify-content: flex-start;
    width: 500px;
    height: auto;
    max-height: 80vh;
    padding: 20px;
    border-radius: 50px;
    border: 3px solid black;
    border-right: 8px solid black;
    border-bottom: 8px solid black;
    background-color: rgba(255, 255, 255, 0.75);

    @media (max-width: 768px) {
        border-radius: 30px;
        border: 2px solid black;
        border-right: 7px solid black;
        border-bottom: 7px solid black;
        padding: 15px;
        width: 400px;
        max-height: 70vh;
    }

    @media (max-width: 480px) {
        border-radius: 20px;
        border: 1px solid black;
        border-right: 6px solid black;
        border-bottom: 6px solid black;
        padding: 10px;
        width: 300px;
        max-height: 60vh;
    }
`;
export const Container_Modal_Form_White = styled.div`
    width: 100%;
    height: auto;
    max-height: 100%;
    padding: 20px;
    padding-right: 10px;
    background: rgb(255,255,255);
    border-radius: 50px;
    display: flex;            
    justify-content: flex-start;
    align-items: flex-start;

    @media (max-width: 768px) { 
        border-radius: 30px;
        padding: 15px;
    }

    @media (max-width: 480px) {
        border-radius: 20px;
        padding: 10px;
    }
`;
export const Container_Modal_Form = styled.div`
    width: 100%;
    height: 100%;
    max-height: 100%;
    gap: 20px;
    padding-right: 10px;
    padding-bottom: 10px;
    padding-top: 10px;
    display: flex;            
    justify-content: flex-start;
    flex-direction: column;
    align-items: center;
    overflow-x: auto;

    &::-webkit-scrollbar {
        width: 6px;          
        height: 6px;  
        background-color:rgb(255, 255, 255);
        border-radius: 20px;
        box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.41);
    }

    &::-webkit-scrollbar-thumb {
        background-color: rgb(58,93,174);
        border-radius: 30px;
        border: 1px solid rgb(255, 255, 255);
        cursor: pointer;
    }

    &::-webkit-scrollbar-thumb:hover {
        background-color: rgb(82, 126, 231);
    }

    @media (max-width: 768px) {
        gap: 15px;
        padding-right: 8px;
        padding-bottom: 8px;
        padding-top: 8px;
    }

    @media (max-width: 480px) {
        gap: 10px;
        padding-right: 6px;
        padding-bottom: 6px;
        padding-top: 6px;

        &::-webkit-scrollbar {
            width: 4px;          
            height: 4px;  
        }
    }
`;
export const Container_Modal_Form_Button = styled.div`
    width: 100%;
    height: auto;
    gap: 30px;
    background: transparent;
    display: flex;            
    justify-content: center;
    align-items: center;

    @media (max-width: 768px) { 
        gap: 25px;
    }

    @media (max-width: 480px) {
        gap: 20px;
    }
`;
//____________MODAL____________
//____________KEYBOARD____________
export const Container_Keyboard_Default = styled.div`
    position: fixed;    
    transform: translateX(-50%);
    display: flex;
    justify-content: center;
    align-items: center;         
    background: transparent;
    width: 60%;
    height: auto;  
    bottom: 8px;
    z-index: 999;

    @media (max-width: 768px) {
        width: 100%;
        padding: 8px;
        bottom: 4px;    
    }

    @media (max-width: 480px) {
        width: 100%;
        padding: 6px;
        bottom: 2px; 
    }
}
`;
export const Container_Keyboard_Numeric = styled.div`
    position: fixed;
    bottom: 20px;    
    transform: translateX(-50%);
    position: relative; 
    display: flex;
    justify-content: center;
    align-items: center;         
    background: transparent;
    width: 40%;
    height: auto;  
    padding: 10px;
    gap: 15px;
    border-radius: 40px;
    z-index: 999;

    @media (max-width: 768px) {
        border-radius: 35px;
        padding: 8px;
        gap: 10px;    
    }

    @media (max-width: 480px) {
        border-radius: 30px;
        padding: 6px;
        gap: 5px;
    }
}
`;
//____________KEYBOARD____________
//____________LOGIN____________
export const Container_Login_Form_White_Auto = styled.div`
    z-index: 100;
    position: relative;
    display: flex;
    justify-content: flex-start;
    width: 35vw;
    height: auto;
    max-height: 70vh;
    padding: 20px;
    border-radius: 50px;
    border: 3px solid black;
    border-right: 7px solid black;
    border-bottom: 7px solid black;
    margin-top: 10vh;
    background-color: rgba(255, 255, 255, 0.75);
    
    @media (max-width: 1200px) {
        width: 39vw;
    }

    @media (max-width: 1100px) {
        width: 43vw;
    }

    @media (max-width: 1000px) {
        width: 47vw;
    }

    @media (max-width: 900px) {
        width: 51vw;
    }

    @media (max-width: 800px) {
        width: 55vw;
    }

    @media (max-width: 768px) {
        border-radius: 30px;
        border: 2px solid black;
        border-right: 6px solid black;
        border-bottom: 6px solid black;
        padding: 15px;
        max-height: 60vh;
        width: 50vw;
        margin-top: 15vh;
    }

    @media (max-width: 700px) {
        width: 54vw;
    }

    @media (max-width: 600px) {
        width: 58vw;
    }

    @media (max-width: 550px) {
        width: 64vw;
    }

    @media (max-width: 500px) {
        width: 70vw;
    }

    @media (max-width: 480px) {
        border-radius: 20px;
        border: 1px solid black;
        border-right: 5px solid black;
        border-bottom: 5px solid black;   
        padding: 10px;
        width: 60vw;
        max-height: 50vh;
        margin-top: 20vh;
    }

    @media (max-width: 400px) {
        width: 70vw;
    }
    
    @media (max-width: 350px) {
        width: 80vw;
    }

    @media (max-width: 300px) {
        width: 85vw;
    }

    @media (max-width: 250px) {
        width: 90vw;
    }
`;
export const Container_Login_Form_White = styled.div`
    width: 100%;
    height: auto;
    max-height: 100%;
    padding: 20px;
    padding-right: 10px;
    background: rgb(255,255,255);
    border-radius: 50px;
    display: flex;            
    justify-content: flex-start;
    align-items: center;

    @media (max-width: 768px) {
        border-radius: 30px;
        padding: 15px;
        padding-right: 8px;
    }

    @media (max-width: 480px) {
        border-radius: 20px;
        padding: 10px;
        padding-right: 6px;
    }
`;
export const Container_Login_Form = styled.div`
    width: 100%;
    height: auto;
    max-height: 100%;
    gap: 20px;
    padding-right: 10px;
    padding-top: 10px;
    padding-bottom: 10px;
    background: rgb(255,255,255);
    display: flex;            
    justify-content: flex-start;
    flex-direction: column;
    align-items: center;
    overflow-x: auto;

    &::-webkit-scrollbar {
        width: 6px;          
        height: 6px;  
        background-color:rgb(255, 255, 255);
        border-radius: 20px;
        box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.41);
    }

    &::-webkit-scrollbar-thumb {
        background-color: rgb(58,93,174);
        border-radius: 30px;
        border: 1px solid rgb(255, 255, 255);
        cursor: pointer;
    }

    &::-webkit-scrollbar-thumb:hover {
        background-color: rgb(82, 126, 231);
    }

    @media (max-width: 768px) {
        gap: 15px;
        padding-right: 8px;
        padding-top: 8px;
        padding-bottom: 8px;
    }

    @media (max-width: 480px) {
        gap: 10px;
        padding-right: 6px;
        padding-top: 6px;
        padding-bottom: 6px;

        &::-webkit-scrollbar {
            width: 4px;          
            height: 4px;  
        }
    }
`;
//____________LOGIN____________
//____________HOME____________
export const Container_Home_Section = styled.div`
    z-index: 10;
    position: relative;
    display: flex;
    justify-content: flex-start;
    width: 100%;
    height: auto;
    max-height: 50vh;
    background-color: transparent;
`;
export const Container_Home_Section_Title = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    box-sizing: border-box;        
    background: rgba(255,255,255,0.85);
    width: auto;
    height: auto; 
    padding: 10px;
    padding-left: 20px;
    padding-right: 20px;
    border-radius: 30px;
    border: 2px solid black; 
    border-right: 6px solid black;
    border-bottom: 6px solid black;
    white-space: nowrap;

    @media (max-width: 768px) {
        padding: 8px;
        padding-left: 15px;
        padding-right: 15px;
        border-radius: 25px;
        border: 2px solid black; 
        border-right: 5px solid black;
        border-bottom: 5px solid black;
    }

    @media (max-width: 480px) {
        padding: 6px;
        padding-left: 10px;
        padding-right: 10px;
        border-radius: 20px;
        border: 1px solid black; 
        border-right: 4px solid black;
        border-bottom: 4px solid black;
    }
}
`;
export const Container_Home_Section_Column_50_Center = styled.div`
    width: 50%;
    height: 100%;
    gap: 10px;
    background: transparent;
    display: flex; 
    flex-direction: column;           
    justify-content: flex-start;
    align-items: center;

    @media (max-width: 768px) {
        gap: 8px;
    }

    @media (max-width: 480px) {
        gap: 6px;
    }
`;
export const Container_Home_Section_Column_50_Left = styled.div`
    width: 50%;
    height: 100%;
    gap: 10px;
    background: transparent;
    display: flex; 
    flex-direction: column;           
    justify-content: flex-start;
    align-items: flex-start;

    @media (max-width: 768px) {
        gap: 8px;
    }

    @media (max-width: 480px) {
        gap: 6px;
    }
`;
export const Container_Home_Section_Row_50_Center = styled.div`
    width: 50%;
    height: 100%;
    gap: 10px;
    background: transparent;
    display: flex;           
    justify-content: flex-start;
    align-items: center;

    @media (max-width: 768px) {
        gap: 8px;
    }

    @media (max-width: 480px) {
        gap: 6px;
    }
`;
export const Container_Home_Section_Row_50_Left = styled.div`
    width: 50%;
    height: 100%;
    gap: 10px;
    background: transparent;
    display: flex;           
    justify-content: flex-start;
    align-items: flex-start;

    @media (max-width: 768px) {
        gap: 8px;
    }

    @media (max-width: 480px) {
        gap: 6px;
    }
`;
export const Container_Home_Section_Header = styled.div`
    width: 100%;
    height: auto;
    padding: 8px;
    padding-left: 20px;
    padding-right: 20px;
    background: rgba(255, 255, 255, 0.85);
    border-top: 2px solid black;
    border-bottom: 6px solid black;
    display: flex;            
    justify-content: center;
    align-items: center;

    @media (max-width: 768px) {
        padding: 6px;
        padding-left: 15px;
        padding-right: 15px;
        border-bottom: 5px solid black;
    }

    @media (max-width: 480px) {
        padding: 4px;
        padding-left: 10px;
        padding-right: 10px;
        border-top: 1px solid black;
        border-bottom: 4px solid black;
    }
`;
export const Container_Home_Section_Body = styled.div`
    width: auto;
    height: auto;
    padding: 8px;
    padding-left: 30px;
    padding-right: 30px;
    background: rgba(255, 255, 255, 0.85);
    border-radius: 30px;
    display: flex;            
    justify-content: center;
    align-items: center;

    @media (max-width: 768px) {
        padding: 6px;
        padding-left: 25px;
        padding-right: 25px;
        border-radius: 25px;
    }

    @media (max-width: 480px) {
        padding: 4px;
        padding-left: 20px;
        padding-right: 20px;
        border-radius: 20px;
    }
`;
//---------- Footer
export const Container_Home_Section_Footer_Left = styled.div`
    width: auto;
    height: auto;
    gap: 10px;
    padding: 10px;
    padding-left: 40px;
    padding-right: 30px;
    border-top-right-radius: 30px;
    border-bottom-right-radius: 30px;
    background: rgba(255, 255, 255, 0.85);
    display: flex;            
    justify-content: center;
    flex-direction: column; 
    align-items: flex-start;

    @media (max-width: 768px) {
        border-top-right-radius: 25px;
        border-bottom-right-radius: 25px;
        padding: 8px;
        padding-left: 35px;
        padding-right: 25px;
        gap: 8px;
    }

    @media (max-width: 480px) {
        border-top-right-radius: 20px;
        border-bottom-right-radius: 20px;
        padding: 6px;
        padding-left: 30px;
        padding-right: 30px;
        gap: 6px;
    }
`;
export const Container_Home_Section_Footer_Right = styled.div`
    width: auto;
    height: auto;
    gap: 10px;
    padding: 10px;
    padding-left: 30px;
    padding-right: 40px;
    border-top-left-radius: 30px;
    border-bottom-left-radius: 30px;
    background: rgba(255, 255, 255, 0.85);
    display: flex;            
    justify-content: center;
    flex-direction: column; 
    align-items: flex-end;

    @media (max-width: 768px) {
        border-top-left-radius: 25px;
        border-bottom-left-radius: 25px;
        padding: 8px;
        padding-left: 25px;
        padding-right: 35px;
        gap: 8px;
    }

    @media (max-width: 480px) {
        border-top-left-radius: 20px;
        border-bottom-left-radius: 20px;
        padding: 6px;
        padding-left: 20px;
        padding-right: 30px;
        gap: 6px;
    }
`;
//---------- Footer
//----------Scroll
export const Container_Home_Section_Column_Scroll_Left = styled.div`
    width: 100%;
    height: 100%;
    max-height: 100%;
    padding-right: 10px;
    padding-left: 10px;
    padding-bottom: 10px;
    gap: 20px;
    background: transparent;
    display: flex;            
    justify-content: flex-start;
    flex-direction: column;
    align-items: flex-start;
    overflow-x: auto;
    overflow-y: auto;

    &::-webkit-scrollbar {
        width: 6px;          
        height: 6px;  
        background-color:rgb(255, 255, 255);
        border-radius: 20px;
        box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.41);
    }

    &::-webkit-scrollbar-thumb {
        background-color: rgb(58,93,174);
        border-radius: 30px;
        border: 1px solid rgb(255, 255, 255);
        cursor: pointer;
    }

    &::-webkit-scrollbar-thumb:hover {
        background-color: rgb(82, 126, 231);
    }

    @media (max-width: 768px) {
        gap: 15px;
        padding-right: 8px;
        padding-left: 8px;
        padding-bottom: 8px;
    }

    @media (max-width: 480px) {
        gap: 10px;
        padding-right: 6px;
        padding-left: 6px;
        padding-bottom: 6px;

        &::-webkit-scrollbar {
            width: 4px;          
            height: 4px;  
        }
    }
`;
export const Container_Home_Section_Row_Scroll_Left = styled.div`
    width: 100%;
    height: 100%;
    max-height: 100%;
    padding-right: 10px;
    padding-left: 10px;
    padding-bottom: 10px;
    gap: 20px;
    background: transparent;
    display: flex;            
    justify-content: flex-start;
    align-items: flex-start;
    overflow-x: auto;
    overflow-y: auto;

    &::-webkit-scrollbar {
        width: 6px;          
        height: 6px;  
        background-color:rgb(255, 255, 255);
        border-radius: 20px;
        box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.41);
    }

    &::-webkit-scrollbar-thumb {
        background-color: rgb(58,93,174);
        border-radius: 30px;
        border: 1px solid rgb(255, 255, 255);
        cursor: pointer;
    }

    &::-webkit-scrollbar-thumb:hover {
        background-color: rgb(82, 126, 231);
    }

    @media (max-width: 768px) {
        gap: 15px;
        padding-right: 8px;
        padding-left: 8px;
        padding-bottom: 8px;
    }

    @media (max-width: 480px) {
        gap: 10px;
        padding-right: 6px;
        padding-left: 6px;
        padding-bottom: 6px;

        &::-webkit-scrollbar {
            width: 4px;          
            height: 4px;  
        }
    }
`;
//----------Scroll
//____________HOME____________
//____________SETTINGBAR____________
export const Container_Settingbar_Row_White = styled.div`
    width: 100%;
    max-width: 100%;
    height: auto;
    gap: 10px;
    background: rgba(255, 255, 255, 0.4);
    display: flex;            
    justify-content: flex-start;
    align-items: center;
    padding: 2px;
    padding-right: 30px;
    padding-left: 30px;

    @media (max-width: 768px) { 
        padding: 2px;
        padding-right: 20px;
        padding-left: 20px;
        gap: 8px;
    }

    @media (max-width: 480px) {
        padding: 2px;
        padding-right: 10px;
        padding-left: 10px;
        gap: 6px;
    }
`;
//____________SETTINGBAR____________
//____________SIDEBAR____________
export const Container_Sidebar_Column_Black = styled.div`
    max-width: 19vw;
    height: 100vh;
    padding-top: 40px;
    gap: 15px;
    background-color:rgba(0, 0, 0, 0.85);
    box-sizing: border-box;
    border-right: 5px solid white;
    position: fixed;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    top: 0;
    left: 0;
    transition: transform 0.3s ease;
    z-index: 100;
    overflow-x: auto;

    &::-webkit-scrollbar {
        width: 6px;          
        height: 6px;  
        background-color:rgb(255, 255, 255);
        border-radius: 20px;
        box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.41);
    }

    &::-webkit-scrollbar-thumb {
        background-color: rgb(58,93,174);
        border-radius: 30px;
        border: 1px solid rgb(255, 255, 255);
        cursor: pointer;
    }

    &::-webkit-scrollbar-thumb:hover {
        background-color: rgb(82, 126, 231);
    }

    @media (max-width: 768px) {
        max-width: 28vw;
        padding-top: 35px;
        gap: 10px;    
    }

    @media (max-width: 480px) {
        max-width: 38vw;
        padding-top: 30px;
        gap: 5px;

        &::-webkit-scrollbar {
            width: 4px;          
            height: 4px;  
        }
    }

    &.hidden {
        transform: translateX(-100%);
    }

    &.visible {
        transform: translateX(0);
    }
`;
export const Container_Sidebar_Column = styled.div`
    max-width: 100%;
    height: auto;
    padding: 25px;
    gap: 15px;
    box-sizing: border-box;
    margin-bottom: auto;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    z-index: 100;
    overflow-x: auto;

    &::-webkit-scrollbar {
        width: 6px;          
        height: 6px;  
        background-color:rgb(255, 255, 255);
        border-radius: 20px;
        box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.41);
    }

    &::-webkit-scrollbar-thumb {
        background-color: rgb(58,93,174);
        border-radius: 30px;
        border: 1px solid rgb(255, 255, 255);
        cursor: pointer;
    }

    &::-webkit-scrollbar-thumb:hover {
        background-color: rgb(82, 126, 231);
    }

    @media (max-width: 768px) {
        max-width: 28vw;
        padding: 20px;
        gap: 10px;   
    }

    @media (max-width: 480px) {
        max-width: 38vw;
        padding: 15px;
        gap: 5px;

        &::-webkit-scrollbar {
            width: 4px;          
            height: 4px;  
        }
    }
`;
//____________SIDEBAR____________
//____________NAVBAR____________
export const Container_Navbar_Row_General_White = styled.div`
    width: 100%;
    max-width: 100%;
    height: auto;
    gap: 10px;
    background: rgb(255, 255, 255);
    display: flex;            
    justify-content: flex-start;
    align-items: center;
    padding: 2px;
    padding-right: 30px;
    padding-left: 30px;

    @media (max-width: 768px) { 
        padding: 2px;
        padding-right: 20px;
        padding-left: 20px;
        gap: 8px;
    }

    @media (max-width: 480px) {
        padding: 2px;
        padding-right: 10px;
        padding-left: 10px;
        gap: 6px;
    }
`;
export const Container_Navbar_Row_General = styled.div`
    width: 100%;
    max-width: 100%;
    height: auto;
    gap: 10px;
    background: transparent;
    display: flex;            
    justify-content: flex-start;
    align-items: center;
    overflow-x: auto;

    &::-webkit-scrollbar {
        width: 6px;          
        height: 6px;  
        background-color:rgb(255, 255, 255);
        border: 1px solid rgba(0, 0, 0, 1);
        border-radius: 20px;
        box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.41);
    }

    &::-webkit-scrollbar-thumb {
        background-color: rgb(58,93,174);
        border-radius: 30px;
        border: 1px solid rgba(0, 0, 0, 1);
        cursor: pointer;
    }

    &::-webkit-scrollbar-thumb:hover {
        background-color: rgb(82, 126, 231);
    }

    @media (max-width: 768px) { 
        gap: 8px;
    }

    @media (max-width: 480px) {
        gap: 6px;

        &::-webkit-scrollbar {
            width: 4px;          
            height: 4px;  
        }
    }
`;
export const Container_Navbar_Row_Function_Blue = styled.div`
    width: auto;
    height: auto;
    gap: 20px;
    background: rgb(58,93,174);
    border-radius: 50px;
    border: 4px solid black; 
    display: flex;            
    justify-content: flex-start;
    align-items: center;
    padding-top: 10px; 
    padding-bottom: 10px;
    padding-right: 20px;
    padding-left: 20px;
    
    @media (max-width: 768px) {
        border-radius: 30px;
        border: 3px solid black;
        padding-top: 8px; 
        padding-bottom: 8px;
        padding-right: 15px;
        padding-left: 15px; 
        gap: 15px;
    }

    @media (max-width: 480px) {
        border-radius: 20px;
        border: 2px solid black;
        padding-top: 6px; 
        padding-bottom: 6px;
        padding-right: 10px;
        padding-left: 10px; 
        gap: 10px;
    }
`;
export const Container_Navbar_Row_Buttom = styled.div`
    position: relative; 
    display: flex;
    justify-content: flex-start;
    align-items: center;           
    background: transparent;
    margin-left: auto;
    width: auto;
    height: auto;  
    padding-right: 10px;     
    gap: 15px;
    
    @media (max-width: 768px) {
        gap: 10px;  
    }

    @media (max-width: 480px) {
        gap: 5px;
    }
}
`;
export const Container_Navbar_Text = styled.div`
    width: auto;
    height: auto;
    gap: 10px;
    display: flex;            
    justify-content: flex-start;
    align-items: center;
    flex-wrap: nowrap;
    white-space: nowrap;
    padding-left: 20px;

    @media (max-width: 768px) {
        padding-left: 15px;
        gap: 8px;
    }

    @media (max-width: 480px) {
        padding-left: 10px;
        gap: 6px;
    }
`;
//____________NAVBAR____________
//____________SEARCHBAR____________
export const Container_Searchbar_Row_General_Black = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;     
    background: rgba(0, 0, 0, 0.35);
    border: none; 
    width: 100%;
    max-width: 100%;
    height: auto;
    padding: 6px;
    gap: 10px;

    @media (max-width: 768px) {
        gap: 8px;  
    }

    @media (max-width: 480px) {
        gap: 6px;
    }
}
`;
export const Container_Searchbar_Row_General = styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: center;     
    background: transparent;
    width: 94%;
    max-width: 94%;
    height: auto;       
    gap: 10px;
    white-space: nowrap;
    overflow-x: auto;

    &::-webkit-scrollbar {
        width: 6px;          
        height: 6px;  
        background-color:rgb(255, 255, 255);
        border-radius: 20px;
        box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.41);
    }

    &::-webkit-scrollbar-thumb {
        background-color: rgb(58,93,174);
        border-radius: 30px;
        border: 1px solid rgb(255, 255, 255);
        cursor: pointer;
    }

    &::-webkit-scrollbar-thumb:hover {
        background-color: rgb(82, 126, 231);
    }

    @media (max-width: 768px) {
        width: 92%;
        max-width: 92%;
        gap: 8px;  
    }

    @media (max-width: 480px) {
        width: 90%;
        max-width: 90%;
        gap: 6px;

        &::-webkit-scrollbar {
            width: 4px;          
            height: 4px;  
        }
    }
}
`;
export const Container_Searchbar_Row_Search_Blue = styled.div`
    width: auto;
    height: auto;
    gap: 16px;
    background: rgb(58,93,174);
    border-radius: 50px;
    border: 4px solid black; 
    display: flex;
    justify-content: flex-start;
    align-items: center;
    margin-bottom: 6px;
    padding: 8px; 
    padding-left: 20px;
    padding-right: 20px;

    @media (max-width: 768px) {
        border-radius: 30px;
        border: 3px solid black;
        margin-bottom: 4px; 
        padding: 6px; 
        padding-left: 15px;
        padding-right: 15px;
        gap: 14px;
    }

    @media (max-width: 480px) {
        border-radius: 20px;
        border: 3px solid black; 
        margin-bottom: 2px; 
        padding: 4px; 
        padding-left: 10px;
        padding-right: 10px;
        gap: 12px;
    }
`;
export const Container_Searchbar_Row_Function = styled.div`
    width: auto;
    height: auto;
    gap: 10px;
    background: transparent;
    margin-left: auto;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    padding: 10px;
    padding-right: 20px;
    padding-left: 20px;

    @media (max-width: 768px) {
        padding: 8px;
        padding-right: 15px;
        padding-left: 15px;
        gap: 8px;
    }

    @media (max-width: 480px) {
        padding: 6px;
        padding-right: 10px;
        padding-left: 10px;
        gap: 6px;
    }
`;
//____________SEARCHBAR____________
//____________FOOTER____________
export const Container_Footer_Column_Black = styled.div`
    position: relative; 
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;          
    background: rgba(0, 0, 0, 0.85);
    border-top: 4px solid rgb(255,255,255);
    color: white;
    width: 100%;
    height: auto; 
    margin-top: auto; 
    padding: 20px;
    gap: 15px;

    @media (max-width: 768px) {
        border-top: 3px solid rgb(255,255,255);
        padding: 18px;
        gap: 10px;    
    }

    @media (max-width: 480px) {
        border-top: 2px solid rgb(255,255,255);
        padding: 16px;
        gap: 5px;
    }
`;
//____________FOOTER____________