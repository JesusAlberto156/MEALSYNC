//____________IMPORT/EXPORT____________
// Componentes de React externos
import styled from 'styled-components';
//__________IMAGE__________
// Imagenes de fondo para login
import Background_Login from '../imgs/Background-Login.jpg';
// AREÁ ADMINISTRATIVA
// Inicio
import Background_Home from '../imgs/Background-Home.webp';
// Usuarios
import Background_Users from '../imgs/Background-Users.jpg';

// AREÁ COCINA
//__________IMAGE__________
//____________IMPORT/EXPORT____________

//____________PAGE____________
export const Container_Page = styled.div`
    background-color:aliceblue;
    display: flex;
    height: auto;
    flex-direction: column; 
    overflow-x: auto;
    overflow-y: auto;

    &::-webkit-scrollbar {
        width: 8px;          
        height: 8px;  
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
`;
export const Container_Page_Login = styled.div.withConfig({
    shouldForwardProp: (prop) => prop !== 'ThemeMode',
})`
    background-image: url(${(Background_Login)});
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
    padding-top: 40px;
    gap: 40px; 

    &.bg-pan-bl {
        -webkit-animation: bg-pan-bl 4s infinite both alternate;
        animation: bg-pan-bl 4s infinite both alternate;
        background-size: 125% 125%;
    }

    @-webkit-keyframes bg-pan-bl {
        0% {
            background-position: 100% 0%;
        }
        100% {
            background-position: 0% 100%;
        }
    }
    @keyframes bg-pan-bl {
        0% {
            background-position: 100% 0%;
        }
        100% {
            background-position: 0% 100%;
        }
    }
`;
export const Container_Page_Logged = styled.div.withConfig({
    shouldForwardProp: (prop) => prop !== 'TypeUser' && prop !== 'Logged' && prop !== 'Sidebar',
})`
    ${({ TypeUser,Sidebar,Logged }) => (TypeUser === 'Administrador' || TypeUser === 'Chef' || TypeUser === 'Almacenista') && (Sidebar === 'Inicio') && Logged ? 
        `background-image: url(${Background_Home});`:''
    }
    ${({ TypeUser,Sidebar,Logged }) => (TypeUser === 'Administrador' || TypeUser === 'Chef' || TypeUser === 'Almacenista') && (Sidebar === 'Usuarios') && Logged ? 
        `background-image: url(${Background_Users});`:''
    }
    background-Size: cover;
    background-Position: center;
    width: 100vw;
    height: 100vh;
    max-height: none;
    display: flex;
    justify-content: flex-start;
    flex-direction: column;
    align-Items: center;
`;
export const Container_Page_Elements = styled.div.withConfig({
    shouldForwardProp: (prop) => prop !== 'sidebarVisible'
})`
    position: fixed;
    top: 0%;
    left: ${({ sidebarVisible }) => (sidebarVisible ? "16%" : "0%")};
    width: 100%;
    height: auto;
    max-width: ${({ sidebarVisible }) => (sidebarVisible ? "80vw" : "100vw")}; 
    max-height: 100vh;
    margin: 0px;
    gap: 15px;
    padding: 10px;
    padding-top: 30px;
    padding-bottom: 30px;
    background-color: transparent;
    display: flex;
    flex-direction: column;
    align-Items: center;
    justify-content: flex-start;
    box-sizing: border-box;
    transition: all ${({ sidebarVisible }) => (sidebarVisible ? "0.3s" : "1.0s")} ease;

    @media (max-width: 768px) {
        padding: 8px;
        padding-top: 25px;
        padding-bottom: 25px;
        gap: 10px;
        left: ${({ sidebarVisible }) => (sidebarVisible ? "30%" : "0%")};  
        max-width: ${({ sidebarVisible }) => (sidebarVisible ? "70vw" : "100vw")}; 
    }

    @media (max-width: 480px) {
        padding: 6px;
        padding-top: 20px;
        padding-bottom: 20px;
        gap: 5px;
        left: ${({ sidebarVisible }) => (sidebarVisible ? "38%" : "0%")}; 
        max-width: ${({ sidebarVisible }) => (sidebarVisible ? "62vw" : "100vw")}; 
    }
`;
export const Container_Page_Error = styled.div.withConfig({
    shouldForwardProp: (prop) => prop !== 'ThemeMode',
})`
    width: 100%;
    height: 100%;
    display: flex;
    position: fixed; 
    justify-content: flex-start; 
    align-items: center;   
    flex-direction: column;
    gap:10px;      
    top: 0; 
    left: 0;
    padding-top: 60px;
    background: ${({ ThemeMode }) => (ThemeMode ? 'rgb(233, 23, 23)' : 'rgb(155, 9, 9)')};
`;
export const Container_Page_Loading = styled.div.withConfig({
    shouldForwardProp: (prop) => prop !== 'ThemeMode',
})`
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
    background: ${({ ThemeMode }) => (ThemeMode ? 'rgb(58,93,174);' : 'rgb(82, 126, 231)')};
`;
//____________PAGE____________
//____________FORM____________
export const Container_Form_500 = styled.div.withConfig({
    shouldForwardProp: (prop) => prop !== 'ThemeMode',
})`
    z-index: 100;
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    box-sizing: border-box;
    width: 500px;
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
        width: 450px;
        padding: 18px;
        gap: 12px;
    }

    @media (max-width: 480px) {
        width: 400px;    
        padding: 16px;
        gap: 10px;
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
export const Container_Form_350 = styled.div.withConfig({
    shouldForwardProp: (prop) => prop !== 'ThemeMode',
})`
    z-index: 100;
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    box-sizing: border-box;
    width: 350px;
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
        width: 300px;
        padding: 18px;
        gap: 12px;
    }

    @media (max-width: 480px) {
        width: 250px;    
        padding: 16px;
        gap: 10px;
    }
`;
//____________FORM____________
//____________ROW____________
//-------- CENTER --------
export const Container_Row_100_Center = styled.div`
    position: relative; 
    display: flex;
    justify-content: center;
    align-items: center;        
    background: transparent;
    width: 100%;
    height: auto;  
    padding: 10px;
    gap: 15px;
    border-radius: 40px;

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
export const Container_Row_NG_100_Center = styled.div`
    position: relative; 
    display: flex;
    justify-content: center;
    align-items: center;        
    background: transparent;
    width: 100%;
    height: auto;  
    padding: 10px;
    border-radius: 40px;

    @media (max-width: 768px) {
        border-radius: 35px;
        padding: 8px;   
    }

    @media (max-width: 480px) {
        border-radius: 30px;
        padding: 6px;
    }
}
`;
export const Container_Row_95_Center = styled.div`
    position: relative; 
    display: flex;
    justify-content: center;
    align-items: center;        
    background: transparent;
    width: 95%;
    height: auto;  
    padding: 10px;
    gap: 15px;
    border-radius: 40px;

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
export const Container_Row_NG_95_Center = styled.div`
    position: relative; 
    display: flex;
    justify-content: center;
    align-items: center;        
    background: transparent;
    width: 95%;
    height: auto;  
    padding: 10px;
    border-radius: 40px;

    @media (max-width: 768px) {
        border-radius: 35px;
        padding: 8px; 
    }

    @media (max-width: 480px) {
        border-radius: 30px;
        padding: 6px;
    }
}
`;
export const Container_Row_90_Center = styled.div`
    position: relative; 
    display: flex;
    justify-content: center;
    align-items: center;        
    background: transparent;
    width: 90%;
    height: auto;  
    padding: 10px;
    gap: 15px;
    border-radius: 40px;

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
export const Container_Row_NG_90_Center = styled.div`
    position: relative; 
    display: flex;
    justify-content: center;
    align-items: center;        
    background: transparent;
    width: 90%;
    height: auto;  
    padding: 10px;
    border-radius: 40px;

    @media (max-width: 768px) {
        border-radius: 35px;
        padding: 8px;   
    }

    @media (max-width: 480px) {
        border-radius: 30px;
        padding: 6px;
    }
}
`;
export const Container_Row_80_Center = styled.div`
    position: relative; 
    display: flex;
    justify-content: center;
    align-items: center;         
    background: transparent;
    width: 80%;
    height: auto;  
    padding: 10px;
    gap: 15px;
    border-radius: 40px;

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
export const Container_Row_NG_80_Center = styled.div`
    position: relative; 
    display: flex;
    justify-content: center;
    align-items: center;         
    background: transparent;
    width: 80%;
    height: auto;  
    padding: 10px;
    border-radius: 40px;

    @media (max-width: 768px) {
        border-radius: 35px;
        padding: 8px;  
    }

    @media (max-width: 480px) {
        border-radius: 30px;
        padding: 6px;
    }
}
`;
export const Container_Row_15_Center = styled.div`
    position: relative; 
    display: flex;
    justify-content: center;
    align-items: center;         
    background: transparent;
    width: 15%;
    height: auto;  
    padding: 10px;
    gap: 15px;
    border-radius: 40px;

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
//-------- CENTER --------
//-------- RIGHT --------
export const Container_Row_100_Right = styled.div`
    position: relative; 
    display: flex;
    justify-content: flex-end;
    align-items: center;           
    background: transparent;
    width: 100%;
    height: auto;       
    padding: 10px;
    padding-right: 30px;
    gap: 15px;
    border-radius: 40px;

    @media (max-width: 768px) {
        border-radius: 35px;
        padding: 8px;
        padding-right: 25px;
        gap: 10px;  
    }

    @media (max-width: 480px) {
        border-radius: 30px;
        padding: 6px;
        padding-right: 20px;
        gap: 5px;
    }
}
`;
export const Container_Row_NG_100_Right = styled.div`
    position: relative; 
    display: flex;
    justify-content: flex-end;
    align-items: center;           
    background: transparent;
    width: 100%;
    height: auto;       
    padding: 10px;
    padding-right: 30px;
    border-radius: 40px;

    @media (max-width: 768px) {
        border-radius: 35px;
        padding: 8px;
        padding-right: 25px; 
    }

    @media (max-width: 480px) {
        border-radius: 30px;
        padding: 6px;
        padding-right: 20px;
    }
}
`;
export const Container_Row_95_Right = styled.div`
    position: relative; 
    display: flex;
    justify-content: flex-end;
    align-items: center;           
    background: transparent;
    width: 95%;
    height: auto;       
    padding: 10px;
    padding-right: 30px;
    gap: 15px;
    border-radius: 40px;

    @media (max-width: 768px) {
        border-radius: 35px;
        padding: 8px;
        padding-right: 25px;
        gap: 10px;  
    }

    @media (max-width: 480px) {
        border-radius: 30px;
        padding: 6px;
        padding-right: 20px;
        gap: 5px;
    }
}
`;
export const Container_Row_NG_95_Right = styled.div`
    position: relative; 
    display: flex;
    justify-content: flex-end;
    align-items: center;           
    background: transparent;
    width: 95%;
    height: auto;       
    padding: 10px;
    padding-right: 30px;
    border-radius: 40px;

    @media (max-width: 768px) {
        border-radius: 35px;
        padding: 8px;
        padding-right: 25px; 
    }

    @media (max-width: 480px) {
        border-radius: 30px;
        padding: 6px;
        padding-right: 20px;
    }
}
`;
export const Container_Row_90_Right = styled.div`
    position: relative; 
    display: flex;
    justify-content: flex-end;
    align-items: center;           
    background: transparent;
    width: 90%;
    height: auto;       
    padding: 10px;
    padding-right: 30px;
    gap: 15px;
    border-radius: 40px;

    @media (max-width: 768px) {
        border-radius: 35px;
        padding: 8px;
        padding-right: 25px;
        gap: 10px;  
    }

    @media (max-width: 480px) {
        border-radius: 30px;
        padding: 6px;
        padding-right: 20px;
        gap: 5px;
    }
}
`;
export const Container_Row_NG_90_Right = styled.div`
    position: relative; 
    display: flex;
    justify-content: flex-end;
    align-items: center;           
    background: transparent;
    width: 90%;
    height: auto;       
    padding: 10px;
    padding-right: 30px;
    border-radius: 40px;

    @media (max-width: 768px) {
        border-radius: 35px;
        padding: 8px;
        padding-right: 25px;
    }

    @media (max-width: 480px) {
        border-radius: 30px;
        padding: 6px;
        padding-right: 20px;
    }
}
`;
export const Container_Row_80_Right = styled.div`
    position: relative; 
    display: flex;
    justify-content: flex-end;
    align-items: center;           
    background: transparent;
    width: 80%;
    height: auto;       
    padding: 10px;
    padding-right: 30px;
    gap: 15px;
    border-radius: 40px;

    @media (max-width: 768px) {
        border-radius: 35px;
        padding: 8px;
        padding-right: 25px;
        gap: 10px;  
    }

    @media (max-width: 480px) {
        border-radius: 30px;
        padding: 6px;
        padding-right: 20px;
        gap: 5px;
    }
}
`;
export const Container_Row_NG_80_Right = styled.div`
    position: relative; 
    display: flex;
    justify-content: flex-end;
    align-items: center;           
    background: transparent;
    width: 80%;
    height: auto;       
    padding: 10px;
    padding-right: 30px;
    border-radius: 40px;

    @media (max-width: 768px) {
        border-radius: 35px;
        padding: 8px;
        padding-right: 25px; 
    }

    @media (max-width: 480px) {
        border-radius: 30px;
        padding: 6px;
        padding-right: 20px;
    }
}
`;
//-------- RIGHT --------
//-------- LEFT --------
export const Container_Row_Left = styled.div`
    position: relative; 
    display: flex;
    justify-content: flex-start;
    align-items: center;           
    background: transparent;
    width: auto;
    height: auto;       
    padding: 10px;
    padding-left: 30px;
    gap: 15px;

    @media (max-width: 768px) {
        padding: 8px;
        padding-left: 25px;
        gap: 10px;  
    }

    @media (max-width: 480px) {
        padding: 6px;
        padding-left: 20px;
        gap: 5px;
    }
}
`;
export const Container_Row_100_Left = styled.div`
    position: relative; 
    display: flex;
    justify-content: flex-start;
    align-items: center;           
    background: transparent;
    width: 100%;
    height: auto;       
    padding: 10px;
    padding-left: 30px;
    gap: 15px;
    border-radius: 40px;

    @media (max-width: 768px) {
        border-radius: 35px;
        padding: 8px;
        padding-left: 25px;
        gap: 10px;  
    }

    @media (max-width: 480px) {
        border-radius: 30px;
        padding: 6px;
        padding-left: 20px;
        gap: 5px;
    }
}
`;
export const Container_Row_NG_100_Left = styled.div`
    position: relative; 
    display: flex;
    justify-content: flex-start;
    align-items: center;           
    background: transparent;
    width: 100%;
    height: auto;       
    padding: 10px;
    padding-left: 30px;
    border-radius: 40px;

    @media (max-width: 768px) {
        border-radius: 35px;
        padding: 8px;
        padding-left: 25px; 
    }

    @media (max-width: 480px) {
        border-radius: 30px;
        padding: 6px;
        padding-left: 20px;
    }
}
`;
export const Container_Row_95_Left = styled.div`
    position: relative; 
    display: flex;
    justify-content: flex-start;
    align-items: center;           
    background: transparent;
    width: 95%;
    height: auto;       
    padding: 10px;
    padding-left: 30px;
    gap: 15px;
    border-radius: 40px;

    @media (max-width: 768px) {
        border-radius: 35px;
        padding: 8px;
        padding-left: 25px;
        gap: 10px;  
    }

    @media (max-width: 480px) {
        border-radius: 30px;
        padding: 6px;
        padding-left: 20px;
        gap: 5px;
    }
}
`;
export const Container_Row_NG_95_Left = styled.div`
    position: relative; 
    display: flex;
    justify-content: flex-start;
    align-items: center;           
    background: transparent;
    width: 95%;
    height: auto;       
    padding: 10px;
    padding-left: 30px;
    border-radius: 40px;

    @media (max-width: 768px) {
        border-radius: 35px;
        padding: 8px;
        padding-left: 25px;
    }

    @media (max-width: 480px) {
        border-radius: 30px;
        padding: 6px;
        padding-left: 20px;
    }
}
`;
export const Container_Row_90_Left = styled.div`
    position: relative; 
    display: flex;
    justify-content: flex-start;
    align-items: center;           
    background: transparent;
    width: 90%;
    height: auto;       
    padding: 10px;
    padding-left: 30px;
    gap: 15px;
    border-radius: 40px;

    @media (max-width: 768px) {
        border-radius: 35px;
        padding: 8px;
        padding-left: 25px;
        gap: 10px;  
    }

    @media (max-width: 480px) {
        border-radius: 30px;
        padding: 6px;
        padding-left: 20px;
        gap: 5px;
    }
}
`;
export const Container_Row_NG_90_Left = styled.div`
    position: relative; 
    display: flex;
    justify-content: flex-start;
    align-items: center;           
    background: transparent;
    width: 90%;
    height: auto;       
    padding: 10px;
    padding-left: 30px;
    border-radius: 40px;

    @media (max-width: 768px) {
        border-radius: 35px;
        padding: 8px;
        padding-left: 25px; 
    }

    @media (max-width: 480px) {
        border-radius: 30px;
        padding: 6px;
        padding-left: 20px;
    }
}
`;
export const Container_Row_80_Left = styled.div`
    position: relative; 
    display: flex;
    justify-content: flex-start;
    align-items: center;           
    background: transparent;
    width: 80%;
    height: auto;       
    padding: 10px;
    padding-left: 30px;
    gap: 15px;
    border-radius: 40px;

    @media (max-width: 768px) {
        border-radius: 35px;
        padding: 8px;
        padding-left: 25px;
        gap: 10px;  
    }

    @media (max-width: 480px) {
        border-radius: 30px;
        padding: 6px;
        padding-left: 20px;
        gap: 5px;
    }
}
`;
export const Container_Row_NG_80_Left = styled.div`
    position: relative; 
    display: flex;
    justify-content: flex-start;
    align-items: center;           
    background: transparent;
    width: 80%;
    height: auto;       
    padding: 10px;
    padding-left: 30px;
    border-radius: 40px;

    @media (max-width: 768px) {
        border-radius: 35px;
        padding: 8px;
        padding-left: 25px;
    }

    @media (max-width: 480px) {
        border-radius: 30px;
        padding: 6px;
        padding-left: 20px;
    }
}
`;
//-------- White
//____________COLUMN____________
//-------- CENTER --------
export const Container_Column_100_Center = styled.div`
    position: relative; 
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;     
    text-align: center;     
    background: transparent;
    width: 100%;
    height: auto;  
    padding: 20px;
    gap: 15px;
    border-radius: 40px;

    @media (max-width: 768px) {
        border-radius: 35px;
        padding: 15px;
        gap: 10px;    
    }

    @media (max-width: 480px) {
        border-radius: 30px;
        padding: 10px;
        gap: 5px;
    }
}
`;
export const Container_Column_NG_100_Center = styled.div`
    position: relative; 
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;         
    background: transparent;
    width: 100%;
    height: auto;  
    padding: 10px;
    border-radius: 40px;

    @media (max-width: 768px) {
        border-radius: 35px;
        padding: 8px;  
    }

    @media (max-width: 480px) {
        border-radius: 30px;
        padding: 6px;
    }
}
`;
export const Container_Column_95_Center = styled.div`
    position: relative; 
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;  
    text-align: center;        
    background: transparent;
    width: 95%;
    height: auto;  
    padding: 20px;
    gap: 15px;
    border-radius: 40px;

    @media (max-width: 768px) {
        border-radius: 35px;
        padding: 15px;
        gap: 10px;    
    }

    @media (max-width: 480px) {
        border-radius: 30px;
        padding: 10px;
        gap: 5px;
    }
}
`;
export const Container_Column_NG_95_Center = styled.div`
    position: relative; 
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;         
    background: transparent;
    width: 95%;
    height: auto;  
    padding: 10px;
    border-radius: 40px;

    @media (max-width: 768px) {
        border-radius: 35px;
        padding: 8px;  
    }

    @media (max-width: 480px) {
        border-radius: 30px;
        padding: 6px;
    }
}
`;
export const Container_Column_90_Center = styled.div`
    position: relative; 
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;  
    text-align: center;        
    background: transparent;
    width: 90%;
    height: auto;  
    padding: 20px;
    gap: 15px;
    border-radius: 40px;

    @media (max-width: 768px) {
        border-radius: 35px;
        padding: 15px;
        gap: 10px;    
    }

    @media (max-width: 480px) {
        border-radius: 30px;
        padding: 10px;
        gap: 5px;
    }
}
`;
export const Container_Column_NG_90_Center = styled.div`
    position: relative; 
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;         
    background: transparent;
    width: 90%;
    height: auto;  
    padding: 10px;
    border-radius: 40px;

    @media (max-width: 768px) {
        border-radius: 35px;
        padding: 8px;  
    }

    @media (max-width: 480px) {
        border-radius: 30px;
        padding: 6px;
    }
}
`;
export const Container_Column_80_Center = styled.div`
    position: relative; 
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;   
    text-align: center;       
    background: transparent;
    width: 80%;
    height: auto;  
    padding: 20px;
    gap: 15px;
    border-radius: 40px;

    @media (max-width: 768px) {
        border-radius: 35px;
        padding: 15px;
        gap: 10px;    
    }

    @media (max-width: 480px) {
        border-radius: 30px;
        padding: 10px;
        gap: 5px;
    }
}
`;
export const Container_Column_NG_80_Center = styled.div`
    position: relative; 
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;         
    background: transparent;
    width: 80%;
    height: auto;  
    padding: 10px;
    border-radius: 40px;

    @media (max-width: 768px) {
        border-radius: 35px;
        padding: 8px;  
    }

    @media (max-width: 480px) {
        border-radius: 30px;
        padding: 6px;
    }
}
`;
//-------- CENTER --------
//-------- RIGHT --------
export const Container_Column_100_Right = styled.div`
    position: relative;     
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: center;           
    background: transparent;
    width: 100%;
    height: auto;      
    padding: 10px;
    padding-right: 30px;
    gap: 15px;
    border-radius: 40px;

    @media (max-width: 768px) {
        border-radius: 35px;
        padding: 8px;
        padding-right: 25px;
        gap: 10px;  
    }

    @media (max-width: 480px) {
        border-radius: 30px;
        padding: 6px;
        padding-right: 20px;
        gap: 5px;
    }
}
`;
export const Container_Column_NG_100_Right = styled.div`
    position: relative;     
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: center;           
    background: transparent;
    width: 100%;
    height: auto;      
    padding: 10px;
    padding-right: 30px;
    border-radius: 40px;

    @media (max-width: 768px) {
        border-radius: 35px;
        padding: 8px;
        padding-right: 25px;
    }

    @media (max-width: 480px) {
        border-radius: 30px;
        padding: 6px;
        padding-right: 20px;
    }
}
`;
export const Container_Column_95_Right = styled.div`
    position: relative;     
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: center;           
    background: transparent;
    width: 95%;
    height: auto;      
    padding: 10px;
    padding-right: 30px;
    gap: 15px;
    border-radius: 40px;

    @media (max-width: 768px) {
        border-radius: 35px;
        padding: 8px;
        padding-right: 25px;
        gap: 10px;  
    }

    @media (max-width: 480px) {
        border-radius: 30px;
        padding: 6px;
        padding-right: 20px;
        gap: 5px;
    }
}
`;
export const Container_Column_NG_95_Right = styled.div`
    position: relative;     
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: center;           
    background: transparent;
    width: 95%;
    height: auto;      
    padding: 10px;
    padding-right: 30px;
    border-radius: 40px;

    @media (max-width: 768px) {
        border-radius: 35px;
        padding: 8px;
        padding-right: 25px;
    }

    @media (max-width: 480px) {
        border-radius: 30px;
        padding: 6px;
        padding-right: 20px;
    }
}
`;
export const Container_Column_90_Right = styled.div`
    position: relative;     
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: center;           
    background: transparent;
    width: 90%;
    height: auto;      
    padding: 10px;
    padding-right: 30px;
    gap: 15px;
    border-radius: 40px;

    @media (max-width: 768px) {
        border-radius: 35px;
        padding: 8px;
        padding-right: 25px;
        gap: 10px;  
    }

    @media (max-width: 480px) {
        border-radius: 30px;
        padding: 6px;
        padding-right: 20px;
        gap: 5px;
    }
}
`;
export const Container_Column_90_NG_Right = styled.div`
    position: relative;     
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: center;           
    background: transparent;
    width: 90%;
    height: auto;      
    padding: 10px;
    padding-right: 30px;
    border-radius: 40px;

    @media (max-width: 768px) {
        border-radius: 35px;
        padding: 8px;
        padding-right: 25px; 
    }

    @media (max-width: 480px) {
        border-radius: 30px;
        padding: 6px;
        padding-right: 20px;
    }
}
`;
export const Container_Column_80_Right = styled.div`
    position: relative;     
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: center;           
    background: transparent;
    width: 80%;
    height: auto;      
    padding: 10px;
    padding-right: 30px;
    gap: 15px;
    border-radius: 40px;

    @media (max-width: 768px) {
        border-radius: 35px;
        padding: 8px;
        padding-right: 25px;
        gap: 10px;  
    }

    @media (max-width: 480px) {
        border-radius: 30px;
        padding: 6px;
        padding-right: 20px;
        gap: 5px;
    }
}
`;
export const Container_Column_80_NG_Right = styled.div`
    position: relative;     
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: center;           
    background: transparent;
    width: 80%;
    height: auto;      
    padding: 10px;
    padding-right: 30px;
    border-radius: 40px;

    @media (max-width: 768px) {
        border-radius: 35px;
        padding: 8px;
        padding-right: 25px; 
    }

    @media (max-width: 480px) {
        border-radius: 30px;
        padding: 6px;
        padding-right: 20px;
    }
}
`;
//-------- RIGHT --------
//-------- LEFT --------
export const Container_Column_100_Left = styled.div`
    position: relative;     
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;           
    background: transparent;
    width: 100%;
    height: auto;      
    padding: 10px;
    padding-left: 30px;
    gap: 15px;
    border-radius: 40px;

    @media (max-width: 768px) {
        border-radius: 35px;
        padding: 8px;
        padding-left: 25px;
        gap: 10px;  
    }

    @media (max-width: 480px) {
        border-radius: 30px;
        padding: 6px;
        padding-left: 20px;
        gap: 5px;
    }
}
`;
export const Container_Column_100_NG_Left = styled.div`
    position: relative;     
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;           
    background: transparent;
    width: 100%;
    height: auto;      
    padding: 10px;
    padding-left: 30px;
    border-radius: 40px;

    @media (max-width: 768px) {
        border-radius: 35px;
        padding: 8px;
        padding-left: 25px; 
    }

    @media (max-width: 480px) {
        border-radius: 30px;
        padding: 6px;
        padding-left: 20px;
    }
}
`;
export const Container_Column_95_Left = styled.div`
    position: relative;     
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;           
    background: transparent;
    width: 95%;
    height: auto;      
    padding: 10px;
    padding-left: 30px;
    gap: 15px;
    border-radius: 40px;

    @media (max-width: 768px) {
        border-radius: 35px;
        padding: 8px;
        padding-left: 25px;
        gap: 10px;  
    }

    @media (max-width: 480px) {
        border-radius: 30px;
        padding: 6px;
        padding-left: 20px;
        gap: 5px;
    }
}
`;
export const Container_Column_95_NG_Left = styled.div`
    position: relative;     
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;           
    background: transparent;
    width: 95%;
    height: auto;      
    padding: 10px;
    padding-left: 30px;
    border-radius: 40px;

    @media (max-width: 768px) {
        border-radius: 35px;
        padding: 8px;
        padding-left: 25px; 
    }

    @media (max-width: 480px) {
        border-radius: 30px;
        padding: 6px;
        padding-left: 20px;
    }
}
`;
export const Container_Column_90_Left = styled.div`
    position: relative;     
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;           
    background: transparent;
    width: 90%;
    height: auto;      
    padding: 10px;
    padding-left: 30px;
    gap: 15px;
    border-radius: 40px;

    @media (max-width: 768px) {
        border-radius: 35px;
        padding: 8px;
        padding-left: 25px;
        gap: 10px;  
    }

    @media (max-width: 480px) {
        border-radius: 30px;
        padding: 6px;
        padding-left: 20px;
        gap: 5px;
    }
}
`;
export const Container_Column_90_NG_Left = styled.div`
    position: relative;     
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;           
    background: transparent;
    width: 90%;
    height: auto;      
    padding: 10px;
    padding-left: 30px;
    border-radius: 40px;

    @media (max-width: 768px) {
        border-radius: 35px;
        padding: 8px;
        padding-left: 25px;
    }

    @media (max-width: 480px) {
        border-radius: 30px;
        padding: 6px;
        padding-left: 20px;
    }
}
`;
export const Container_Column_80_Left = styled.div`
    position: relative;     
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;           
    background: transparent;
    width: 80%;
    height: auto;      
    padding: 10px;
    padding-left: 30px;
    gap: 15px;
    border-radius: 40px;

    @media (max-width: 768px) {
        border-radius: 35px;
        padding: 8px;
        padding-left: 25px;
        gap: 10px;  
    }

    @media (max-width: 480px) {
        border-radius: 30px;
        padding: 6px;
        padding-left: 20px;
        gap: 5px;
    }
}
`;
export const Container_Column_80_NG_Left = styled.div`
    position: relative;     
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;           
    background: transparent;
    width: 80%;
    height: auto;      
    padding: 10px;
    padding-left: 30px;
    border-radius: 40px;

    @media (max-width: 768px) {
        border-radius: 35px;
        padding: 8px;
        padding-left: 25px;  
    }

    @media (max-width: 480px) {
        border-radius: 30px;
        padding: 6px;
        padding-left: 20px;
    }
}
`;
//-------- LEFT --------
//____________COLUMN____________
//____________MODAL____________
export const Container_Modal = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    flex-direction: column; 
    justify-content: center;
    align-items: center;
    z-index: 1000;
    overflow-y: auto;
`;
//____________MODAL____________
//____________KEYBOARD____________
export const Container_Keyboard_Default = styled.div`
    position: fixed;
    bottom: 20px;    
    transform: translateX(-50%);
    position: relative; 
    display: flex;
    justify-content: center;
    align-items: center;         
    background: transparent;
    width: 80%;
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
//____________SIDEBAR____________
export const Container_Sidebar_Column_White = styled.div`
    width: 250px;
    height: 100vh;
    padding: 10px;
    padding-top: 40px;
    gap: 15px;
    background-color:rgb(255, 255, 255);
    border: 5px solid black;
    box-sizing: border-box;
    position: fixed;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    top: 0;
    left: 0;
    transition: transform 0.3s ease;
    z-index: 100;

    @media (max-width: 768px) {
        width: 215px;
        padding: 8px;
        padding-top: 35px;
        gap: 10px;    
    }

    @media (max-width: 480px) {
        width: 180px;
        padding: 6px;
        padding-top: 30px;
        gap: 5px;
    }

    &.hidden {
        transform: translateX(-100%);
    }

    &.visible {
        transform: translateX(0);
    }
`;
//____________SIDEBAR____________
//____________NAVBAR____________
export const Container_Navbar_Row_General_White = styled.div`
    width: 94%;
    max-width: 94%;
    height: 70px;
    gap: 10px;
    background: rgb(255, 255, 255);
    border-radius: 50px;
    border: 4px solid black; 
    display: flex;            
    justify-content: flex-start;
    align-items: center;
    padding-top: 6px; 
    padding-bottom: 10px;
    padding-right: 30px;
    padding-left: 30px;

    @media (max-width: 768px) { 
        width: 92%;
        max-width: 92%;
        height: 65px;
        border-radius: 30px;
        border: 3px solid black;
        padding-top: 4px; 
        padding-bottom: 8px;
        padding-right: 20px;
        padding-left: 20px;
        gap: 8px;
    }

    @media (max-width: 480px) {
        width: 90%;
        max-width: 90%;
        height: 60px;
        border-radius: 20px;
        border: 2px solid black;
        padding-top: 2px;
        padding-bottom: 6px; 
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
        width: 8px;          
        height: 8px;  
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
        gap: 8px;
    }

    @media (max-width: 480px) {
        gap: 6px;
    }
`;
export const Container_Navbar_Row_Function_Blue = styled.div`
    width: 90%;
    height: 60px;
    gap: 10px;
    background: rgb(58,93,174);
    border-radius: 50px;
    border: 3px solid black; 
    display: flex;            
    justify-content: flex-start;
    align-items: center;
    padding-top: 2px; 
    padding-bottom: 2px;
    padding-right: 30px;
    padding-left: 30px;
    
    @media (max-width: 768px) {
        width: 85%;
        height: 55px;
        border-radius: 30px;
        border: 2px solid black;
        padding-top: 2px; 
        padding-bottom: 2px;
        padding-right: 20px;
        padding-left: 20px; 
        gap: 8px;
    }

    @media (max-width: 480px) {
        width: 80%;
        height: 45px;
        border-radius: 20px;
        border: 1px solid black;
        padding-top: 2px; 
        padding-bottom: 2px;
        padding-right: 10px;
        padding-left: 10px; 
        gap: 6px;
    }
`;
export const Container_Navbar_Row_Function = styled.div`
    width: 100%;
    height: 55px;
    gap: 10px;
    padding-left: 10px;
    background: transparent;
    display: flex;            
    justify-content: flex-start;
    align-items: center;
    overflow-x: auto;

    &::-webkit-scrollbar {
        width: 8px;          
        height: 8px;  
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
        height: 50px;
        gap: 8px;
    }

    @media (max-width: 480px) {
        height: 45px;
        gap: 6px;
    }
`;
export const Container_Navbar_Row_Buttom = styled.div`
    position: relative; 
    display: flex;
    justify-content: flex-start;
    align-items: center;           
    background: transparent;
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
export const Container_Searchbar_Row_General_Blue = styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: center;     
    background: rgb(58,93,174);
    border-radius: 50px;
    border: 4px solid black; 
    width: 94%;
    max-width: 94%;
    height: auto;
    padding: 6px;
    padding-left: 30px;
    padding-right: 30px;
    gap: 10px;

    @media (max-width: 768px) {
        width: 92%;
        max-width: 92%;
        border: 3px solid black;
        border-radius: 30px;
        padding: 4px;
        padding-left: 20px;
        padding-right: 20px;
        gap: 8px;  
    }

    @media (max-width: 480px) {
        width: 90%;
        max-width: 90%;
        border: 2px solid black;
        border-radius: 20px;
        padding: 2px;
        padding-left: 15px;
        padding-right: 15px;
        gap: 6px;
    }
}
`;
export const Container_Searchbar_Row_General = styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: center;     
    background: transparent;
    width: 100%;
    max-width: 100%;
    height: auto;       
    gap: 10px;
    white-space: nowrap;
    overflow-x: auto;

    &::-webkit-scrollbar {
        width: 8px;          
        height: 8px;  
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
        gap: 8px;  
    }

    @media (max-width: 480px) {
        gap: 6px;
    }
}
`;
export const Container_Searchbar_Row_Search_Gray = styled.div`
    width: auto;
    height: auto;
    gap: 16px;
    background: rgb(88,88,84);
    border-radius: 50px;
    border: 3px solid white; 
    display: flex;
    justify-content: flex-start;
    align-items: center;
    margin-bottom: 6px;
    padding: 8px; 
    padding-left: 20px;
    padding-right: 20px;

    @media (max-width: 768px) {
        border-radius: 30px;
        border: 2px solid white;
        margin-bottom: 4px; 
        padding: 6px; 
        padding-left: 15px;
        padding-right: 15px;
        gap: 14px;
    }

    @media (max-width: 480px) {
        border-radius: 20px;
        border: 1px solid white; 
        margin-bottom: 2px; 
        padding: 4px; 
        padding-left: 10px;
        padding-right: 10px;
        gap: 12px;
    }
`;
export const Container_Searchbar_Row_Function = styled.div`
    width: 500px;
    height: auto;
    gap: 10px;
    background: transparent;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    padding: 10px;
    padding-right: 20px;

    @media (max-width: 768px) {
        width: 450px;
        padding: 8px;
        padding-right: 15px;
        gap: 8px;
    }

    @media (max-width: 480px) {
        width: 400px;
        padding: 6px;
        padding-right: 10px;
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
    background: rgb(0,0,0);
    color: white;
    border: 4px solid white;
    width: 100%;
    height: auto;  
    padding: 20px;
    gap: 15px;

    @media (max-width: 768px) {
        width: 96%;
        padding: 18px;
        gap: 10px;    
    }

    @media (max-width: 480px) {
        width: 92%;
        padding: 16px;
        gap: 5px;
    }
`;
//____________FOOTER____________