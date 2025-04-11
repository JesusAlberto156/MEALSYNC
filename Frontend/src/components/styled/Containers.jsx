//____________IMPORT/EXPORT____________
// Componentes de React externos
import styled from 'styled-components';
//__________ICONOS__________

//__________ICONOS__________
//__________IMAGE__________
// Imagenes de fondo para login
import Background_Login_Dark from '../imgs/Background-Login-Dark.jpeg';
import Background_Login_Light from '../imgs/Background-Login-Light.jpg';
// Imagenes de fondo para cocina
import Background_Menu_Dark from '../imgs/Background-Menu-Dark.jpg';
import Background_Menu_Light from '../imgs/Background-Menu-Light.jpg';
// Imagenes de fondo para administración
import Background_Administration_Dark from '../imgs/Background-Administration-Dark.jpeg';
import Background_Administration_Light from '../imgs/Background-Administration-Light.jpg'
//__________IMAGE__________
// Estilos personalizados

//____________IMPORT/EXPORT____________

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
export const Container_Page_Background = styled.div.withConfig({
    shouldForwardProp: (prop) => prop !== 'ThemeMode' && prop !== 'TypeUser' && prop !== 'Logged',
})`
    ${({ TypeUser,ThemeMode,Logged }) => (TypeUser === 'Administrator' || TypeUser === 'Chef' || TypeUser === 'Storekeeper') && Logged ? 
        `background-image: url(${ ThemeMode ? Background_Administration_Light : Background_Administration_Dark});` : 
        ''
    }
    ${({ TypeUser,ThemeMode,Logged }) => (TypeUser === 'Cook' || TypeUser === 'Nutritionist' || TypeUser === 'Doctor') && Logged ?
        `background-image: url(${ ThemeMode ? Background_Menu_Light : Background_Menu_Dark});`:
        ''
    }
    ${({ Logged,ThemeMode }) => (!Logged) ?
        `background-image: url(${ ThemeMode ? Background_Login_Light : Background_Login_Dark});`:
        ''
    }
    background-Size: cover;
    background-Position: center;
    width: 100vw;
    height: 100vh;
    max-height: none;
    position: relative;
    display: flex;
    justify-content: ${({ Logged }) => (Logged ? 'center' : 'flex-start')};
    align-Items: center;
    ${({ Logged }) => (!Logged ? 'flex-direction: column;' : '')}
    ${({ Logged }) => (!Logged ? 'padding-top: 40px;' : '')}
    ${({ Logged }) => (!Logged ? 'gap: 40px;' : '')}
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
    padding-top: 80px;
    background: ${({ ThemeMode }) => (ThemeMode ? 'rgb(229, 44, 44);' : 'rgb(125, 27, 27)')};

    @media (max-width: 768px) {
        gap:8px;
    }

    @media (max-width: 480px) {    
        gap:6px;
    }
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
    background: ${({ ThemeMode }) => (ThemeMode ? 'rgb(82, 126, 231);' : 'rgb(58,93,174)')};
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
export const Container_Form_80 = styled.div.withConfig({
    shouldForwardProp: (prop) => prop !== 'ThemeMode',
})`
    z-index: 4000;
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
    width: 80%;
    max-height: auto;
    padding: 20px;
    border-radius: 50px;
    border: ${({ ThemeMode }) => (ThemeMode ? '4px solid black' : '4px solid white')};
    background-color: ${({ ThemeMode }) => (ThemeMode ? 'rgba(204, 203, 198, 0.7)' : 'rgba(41, 41, 40, 0.8)')};
    overflow-y: auto;
    scrollbar-width: none;
    -ms-overflow-style: none;

    &::-webkit-scrollbar {
        display: none;
    }
    
    @media (max-width: 768px) {
        padding: 15px;
    }

    @media (max-width: 480px) {    
        padding: 10px;
    }
`;
export const Container_Form_450 = styled.div.withConfig({
    shouldForwardProp: (prop) => prop !== 'ThemeMode',
})`
    z-index: 40;
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
    width: 450px;
    max-height: 80vh;
    padding: 20px;
    border-radius: 50px;
    border: ${({ ThemeMode }) => (ThemeMode ? '4px solid black' : '4px solid white')};
    background-color: ${({ ThemeMode }) => (ThemeMode ? 'rgba(204, 203, 198, 0.7)' : 'rgba(41, 41, 40, 0.8)')};
    overflow-y: auto;
    scrollbar-width: none;
    -ms-overflow-style: none;

    &::-webkit-scrollbar {
        display: none;
    }
    
    @media (max-width: 768px) {
        width: 400px;
        padding: 15px;
        margin-left: 25px;
    }

    @media (max-width: 480px) {
        width: 350px;    
        padding: 10px;
        margin-left: 20px;
    }
`;
export const Container_Form_400 = styled.div.withConfig({
    shouldForwardProp: (prop) => prop !== 'ThemeMode',
})`
    z-index: 40;
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
    width: 400px;
    max-height: 80vh;
    padding: 20px;
    border-radius: 50px;
    border: ${({ ThemeMode }) => (ThemeMode ? '4px solid black' : '4px solid white')};
    background-color: ${({ ThemeMode }) => (ThemeMode ? 'rgba(204, 203, 198, 0.7)' : 'rgba(41, 41, 40, 0.8)')};
    overflow-y: auto;
    scrollbar-width: none;
    -ms-overflow-style: none;

    &::-webkit-scrollbar {
        display: none;
    }
    
    @media (max-width: 768px) {
        width: 350px;
        padding: 15px;
        margin-left: 25px;
    }

    @media (max-width: 480px) {
        width: 300px;    
        padding: 10px;
        margin-left: 20px;
    }
`;
export const Container_Form_350 = styled.div.withConfig({
    shouldForwardProp: (prop) => prop !== 'ThemeMode',
})`
    z-index: 40;
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
    width: 350px;
    max-height: 80vh;
    padding: 20px;
    border-radius: 50px;
    border: ${({ ThemeMode }) => (ThemeMode ? '4px solid black' : '4px solid white')};
    background-color: ${({ ThemeMode }) => (ThemeMode ? 'rgba(204, 203, 198, 0.7)' : 'rgba(41, 41, 40, 0.8)')};
    overflow-y: auto;
    scrollbar-width: none;
    -ms-overflow-style: none;

    &::-webkit-scrollbar {
        display: none;
    }
    
    @media (max-width: 768px) {
        width: 300px;
        padding: 15px;
    }

    @media (max-width: 480px) {
        width: 250px;    
        padding: 10px;
    }
`;
//____________FORM____________
//____________ROW____________
// Center
export const Container_Row_100_Center = styled.div`
    position: relative; 
    display: flex;
    justify-content: center;
    align-items: center;          
    background: transparent;
    width: 100%;
    height: auto;  
    padding: 20px;
    gap: 15px;

    @media (max-width: 768px) {
        width: 96%;
        padding: 15px;
        gap: 10px;    
    }

    @media (max-width: 480px) {
        width: 92%;
        padding: 10px;
        gap: 5px;
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
    padding: 20px;
    gap: 15px;

    @media (max-width: 768px) {
        width: 86%;
        padding: 15px;
        gap: 10px;    
    }

    @media (max-width: 480px) {
        width: 82%;
        padding: 10px;
        gap: 5px;
    }
}
`;
export const Container_Row_Border_90_Center = styled.div.withConfig({
    shouldForwardProp: (prop) => prop !== 'ThemeMode',
})`
    position: relative;     
    display: flex;
    justify-content: center;
    align-items: center;          
    background: transparent;
    width: 90%;
    height: auto;  
    padding: 20px;
    border: ${({ ThemeMode }) => (ThemeMode ? '2px solid black' : '2px solid white')};
    border-radius: 40px;
    gap: 15px;

    @media (max-width: 768px) {
        width: 86%;
        padding: 15px;
        gap: 10px;    
    }

    @media (max-width: 480px) {
        width: 82%;
        padding: 10px;
        gap: 5px;
    }
}
`;
export const Container_Row_Border_80_Center = styled.div.withConfig({
    shouldForwardProp: (prop) => prop !== 'ThemeMode',
})`
    position: relative;     
    display: flex;
    justify-content: center;
    align-items: center;          
    background: transparent;
    width: 80%;
    height: auto;  
    padding: 20px;
    border: ${({ ThemeMode }) => (ThemeMode ? '2px solid black' : '2px solid white')};
    border-radius: 40px;
    gap: 15px;

    @media (max-width: 768px) {
        width: 76%;
        padding: 15px;
        gap: 10px;    
    }

    @media (max-width: 480px) {
        width: 72%;
        padding: 10px;
        gap: 5px;
    }
}
`;
// Right
export const Container_Row_100_Right = styled.div`
    position: relative;     
    display: flex;
    justify-content: flex-end;
    align-items: center;           
    background: transparent;
    width: 100%;
    height: auto;      
    padding: 10px;
    padding-right: 40px;
    gap: 15px;

    @media (max-width: 768px) {
        width: 96%;
        padding: 8px;
        padding-right: 38px;
        gap: 10px;     
    }

    @media (max-width: 480px) {
        width: 92%;
        padding: 6px;
        padding-right: 36px;
        gap: 5px;
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
    padding-right: 40px;
    gap: 15px;

    @media (max-width: 768px) {
        width: 86%;
        padding: 8px;
        padding-right: 38px;
        gap: 10px;     
    }

    @media (max-width: 480px) {
        width: 82%;
        padding: 6px;
        padding-right: 36px;
        gap: 5px;
    }
}
`;
// Left
export const Container_Row_100_Left = styled.div`
    position: relative;     
    display: flex;
    justify-content: flex-start;
    align-items: center;           
    background: transparent;
    width: 100%;
    height: auto;      
    padding: 10px;
    padding-left: 40px;
    gap: 15px;

    @media (max-width: 768px) {
        width: 96%;
        padding: 8px;
        padding-left: 38px;
        gap: 10px;     
    }

    @media (max-width: 480px) {
        width: 92%;
        padding: 6px;
        padding-left: 36px;
        gap: 5px;
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
    padding-left: 40px;
    gap: 15px;

    @media (max-width: 768px) {
        width: 86%;
        padding: 8px;
        padding-left: 38px;
        gap: 10px;  
    }

    @media (max-width: 480px) {
        width: 82%;
        padding: 6px;
        padding-left: 36px;
        gap: 5px;
    }
}
`;
//____________ROW____________
//____________COLUMN____________
// Center
export const Container_Column_100_Center = styled.div`
    position: relative; 
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;          
    background: transparent;
    width: 100%;
    height: auto;  
    padding: 20px;
    gap: 15px;

    @media (max-width: 768px) {
        width: 96%;
        padding: 15px;
        gap: 10px;    
    }

    @media (max-width: 480px) {
        width: 92%;
        padding: 10px;
        gap: 5px;
    }
}
`;
export const Container_Column_90_Center = styled.div`
    position: relative; 
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;          
    background: transparent;
    width: 90%;
    height: auto;  
    padding: 20px;
    gap: 15px;

    @media (max-width: 768px) {
        width: 86%;
        padding: 15px;
        gap: 10px;    
    }

    @media (max-width: 480px) {
        width: 82%;
        padding: 10px;
        gap: 5px;
    }
}
`;
export const Container_Column_Border_90_Center = styled.div.withConfig({
    shouldForwardProp: (prop) => prop !== 'ThemeMode',
})`
    position: relative; 
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;          
    background: transparent;
    width: 90%;
    height: auto;  
    padding: 20px;
    border: ${({ ThemeMode }) => (ThemeMode ? '2px solid black' : '2px solid white')};
    border-radius: 40px;
    gap: 15px;

    @media (max-width: 768px) {
        width: 86%;
        padding: 15px;
        gap: 10px;    
    }

    @media (max-width: 480px) {
        width: 82%;
        padding: 10px;
        gap: 5px;
    }
}
`;
export const Container_Column_Border_80_Center = styled.div.withConfig({
    shouldForwardProp: (prop) => prop !== 'ThemeMode',
})`
    position: relative; 
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;          
    background: transparent;
    width: 80%;
    height: auto;  
    padding: 20px;
    border: ${({ ThemeMode }) => (ThemeMode ? '2px solid black' : '2px solid white')};
    border-radius: 40px;
    gap: 15px;

    @media (max-width: 768px) {
        width: 76%;
        padding: 15px;
        gap: 10px;    
    }

    @media (max-width: 480px) {
        width: 72%;
        padding: 10px;
        gap: 5px;
    }
}
`;
// Right
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
    padding-right: 40px;
    gap: 15px;

    @media (max-width: 768px) {
        width: 96%;
        padding: 8px;
        padding-right: 38px;
        gap: 10px;     
    }

    @media (max-width: 480px) {
        width: 92%;
        padding: 6px;
        padding-right: 36px;
        gap: 5px;
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
    padding-right: 40px;
    gap: 15px;

    @media (max-width: 768px) {
        width: 86%;
        padding: 8px;
        padding-right: 38px;
        gap: 10px;     
    }

    @media (max-width: 480px) {
        width: 82%;
        padding: 6px;
        padding-right: 36px;
        gap: 5px;
    }
}
`;
// Left
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
    padding-left: 40px;
    gap: 15px;

    @media (max-width: 768px) {
        width: 96%;
        padding: 8px;
        padding-left: 38px;
        gap: 10px;     
    }

    @media (max-width: 480px) {
        width: 92%;
        padding: 6px;
        padding-left: 36px;
        gap: 5px;
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
    padding-left: 40px;
    gap: 15px;

    @media (max-width: 768px) {
        width: 86%;
        padding: 8px;
        padding-left: 38px;
        gap: 10px;     
    }

    @media (max-width: 480px) {
        width: 82%;
        padding: 6px;
        padding-left: 36px;
        gap: 5px;
    }
}
`;
//____________COLUMN____________


export const Container_100_Center = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;          
    background: transparent;
    width: 100%;
    height: auto;  
    border: none;      
    position: relative; 
    padding: 20px;
    gap: 15px;

    @media (max-width: 768px) {
        padding: 15px;
        gap: 10px;    
    }

    @media (max-width: 480px) {
        padding: 10px;
        gap: 5px;
    }
}
`;
export const Container_90_Center = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;          
    background: transparent;
    width: 90%;
    height: auto;  
    border: none;      
    position: relative; 
    padding: 20px;
    gap: 15px;

    @media (max-width: 768px) {
        padding: 15px;
        gap: 10px;    
    }

    @media (max-width: 480px) {
        padding: 10px;
        gap: 5px;
    }
}
`;
export const Container_100_Right = styled.div`
    display: flex;
    justify-content: flex-end;
    align-items: center;           
    background: transparent;
    width: 100%;
    height: auto;  
    border: none;      
    position: relative; 
    padding: 10px;
    padding-right: 200px;
    gap: 15px;

    @media (max-width: 768px) {
        padding: 8px;
        padding-right: 175px;
        gap: 10px;    
    }

    @media (max-width: 480px) {
        padding: 6px;
        padding-right: 150px;
        gap: 5px;
    }
}
`;
export const Container_90_Right = styled.div`
    display: flex;
    justify-content: flex-end;
    align-items: center;           
    background: transparent;
    width: 90%;
    height: auto;  
    border: none;      
    position: relative; 
    padding: 10px;
    padding-right: 200px;
    gap: 15px;

    @media (max-width: 768px) {
        padding: 8px;
        padding-right: 175px;
        gap: 10px;    
    }

    @media (max-width: 480px) {
        padding: 6px;
        padding-right: 150px;
        gap: 5px;
    }
}
`;
export const Container_100_Left = styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: center;           
    background: transparent;
    width: 100%;
    height: auto;  
    border: none;      
    position: relative; 
    padding: 10px;
    padding-left: 200px;
    gap: 15px;

    @media (max-width: 768px) {
        padding: 8px;
        padding-left: 175px;
        gap: 10px;    
    }

    @media (max-width: 480px) {
        padding: 6px;
        padding-left: 150px;
        gap: 5px;
    }
}
`;
export const Container_90_Left = styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: center;           
    background: transparent;
    width: 90%;
    height: auto;  
    border: none;      
    position: relative; 
    padding: 10px;
    padding-left: 200px;
    gap: 15px;

    @media (max-width: 768px) {
        padding: 8px;
        padding-left: 175px;
        gap: 10px;    
    }

    @media (max-width: 480px) {
        padding: 6px;
        padding-left: 150px;
        gap: 5px;
    }
}
`;
//________________________
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
export const Container_Button_Border_Column_400 = styled.div.withConfig({
    shouldForwardProp: (prop) => prop !== 'ThemeMode',
})`
    position: relative;    
    display: flex;
    flex-direction: column;
    justify-content: center; 
    align-items: center;
    height: auto;
    width: 400px;
    border-radius: 30px;
    border: ${({ ThemeMode }) => (ThemeMode ? '2px solid black' : '2px solid white')};
    padding: 10px;
    gap: 20px;

    @media (max-width: 768px) {
        width: 350px;
        padding: 8px;
        gap: 15px;
    }

    @media (max-width: 480px) {
        width: 300px;
        padding: 6px;
        gap: 10px;
    }
`;
export const Container_Button_Border_Column_350 = styled.div.withConfig({
    shouldForwardProp: (prop) => prop !== 'ThemeMode',
})`
    position: relative;    
    display: flex;
    flex-direction: column;
    justify-content: center; 
    align-items: center;
    height: auto;
    width: 350px;
    border-radius: 30px;
    border: ${({ ThemeMode }) => (ThemeMode ? '2px solid black' : '2px solid white')};
    padding: 10px;
    gap: 20px;

    @media (max-width: 768px) {
        width: 300px;
        padding: 8px;
        gap: 15px;
    }

    @media (max-width: 480px) {
        width: 250px;
        padding: 6px;
        gap: 10px;
    }
`;
export const Container_Button_Border_Column_300 = styled.div.withConfig({
    shouldForwardProp: (prop) => prop !== 'ThemeMode',
})`
    position: relative;    
    display: flex;
    flex-direction: column;
    justify-content: center; 
    align-items: center;
    height: auto;
    width: 300px;
    border-radius: 30px;
    border: ${({ ThemeMode }) => (ThemeMode ? '2px solid black' : '2px solid white')};
    padding: 10px;
    gap: 20px;

    @media (max-width: 768px) {
        width: 250px;
        padding: 8px;
        gap: 15px;
    }

    @media (max-width: 480px) {
        width: 200px;
        padding: 6px;
        gap: 10px;
    }
`;
export const Container_Button_Border_Column_250 = styled.div.withConfig({
    shouldForwardProp: (prop) => prop !== 'ThemeMode',
})`
    position: relative;    
    display: flex;
    flex-direction: column;
    justify-content: center; 
    align-items: center;
    height: auto;
    width: 250px;
    border-radius: 30px;
    border: ${({ ThemeMode }) => (ThemeMode ? '2px solid black' : '2px solid white')};
    padding: 10px;
    gap: 20px;

    @media (max-width: 768px) {
        width: 200px;
        padding: 8px;
        gap: 15px;
    }

    @media (max-width: 480px) {
        width: 150px;
        padding: 6px;
        gap: 10px;
    }
`;
export const Container_Button_Border_Row_400 = styled.div.withConfig({
    shouldForwardProp: (prop) => prop !== 'ThemeMode',
})`
    position: relative;    
    display: flex;
    justify-content: center; 
    align-items: center; 
    height: auto;
    width: 400px;
    border-radius: 30px;
    border: ${({ ThemeMode }) => (ThemeMode ? '2px solid black' : '2px solid white')};
    padding: 10px;
    gap: 20px;

    @media (max-width: 768px) {
        width: 350px;
        padding: 8px;
        gap: 15px;
    }

    @media (max-width: 480px) {
        width: 300px;
        padding: 6px;
        gap: 10px;
    }
`;
export const Container_Button_Border_Row_350 = styled.div.withConfig({
    shouldForwardProp: (prop) => prop !== 'ThemeMode',
})`
    position: relative;    
    display: flex;
    justify-content: center; 
    align-items: center; 
    height: auto;
    width: 350px;
    border-radius: 30px;
    border: ${({ ThemeMode }) => (ThemeMode ? '2px solid black' : '2px solid white')};
    padding: 10px;
    gap: 20px;

    @media (max-width: 768px) {
        width: 300px;
        padding: 8px;
        gap: 15px;
    }

    @media (max-width: 480px) {
        width: 250px;
        padding: 6px;
        gap: 10px;
    }
`;
export const Container_Button_Border_Row_300 = styled.div.withConfig({
    shouldForwardProp: (prop) => prop !== 'ThemeMode',
})`
    position: relative;    
    display: flex;
    justify-content: center; 
    align-items: center; 
    height: auto;
    width: 300px;
    border-radius: 30px;
    border: ${({ ThemeMode }) => (ThemeMode ? '2px solid black' : '2px solid white')};
    padding: 10px;
    gap: 20px;

    @media (max-width: 768px) {
        width: 250px;
        padding: 8px;
        gap: 15px;
    }

    @media (max-width: 480px) {
        width: 200px;
        padding: 6px;
        gap: 10px;
    }
`;
export const Container_Button_Border_Row_250 = styled.div.withConfig({
    shouldForwardProp: (prop) => prop !== 'ThemeMode',
})`
    position: relative;    
    display: flex;
    justify-content: center; 
    align-items: center; 
    height: auto;
    width: 250px;
    border-radius: 30px;
    border: ${({ ThemeMode }) => (ThemeMode ? '2px solid black' : '2px solid white')};
    padding: 10px;
    gap: 20px;

    @media (max-width: 768px) {
        width: 200px;
        padding: 8px;
        gap: 15px;
    }

    @media (max-width: 480px) {
        width: 150px;
        padding: 6px;
        gap: 10px;
    }
`;
export const Container_Button_Column_300 = styled.div`
    position: relative;    
    display: flex;
    flex-direction: column;
    justify-content: center; 
    align-items: center;
    height: auto;
    width: 300px;
    padding: 10px;
    gap: 20px;

    @media (max-width: 768px) {
        width: 250px;
        padding: 8px;
        gap: 15px;
    }

    @media (max-width: 480px) {
        width: 200px;
        padding: 6px;
        gap: 10px;
    }
`;
export const Container_Button_Row_300 = styled.div`
    position: relative;    
    display: flex;
    justify-content: center; 
    align-items: center;
    height: auto;
    width: 300px;
    padding: 10px;
    gap: 20px;

    @media (max-width: 768px) {
        width: 250px;
        padding: 8px;
        gap: 15px;
    }

    @media (max-width: 480px) {
        width: 200px;
        padding: 6px;
        gap: 10px;
    }
`;
//____________BUTTOM____________
//____________ICON____________
export const Container_Icon_60 = styled.div`
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
//____________ICON____________
//____________NAVEGATION____________
export const Container_Side_Bar = styled.div.withConfig({
    shouldForwardProp: (prop) => prop !== 'ThemeMode',
})`
    width: 260px;
    padding: 5px;
    background-color: ${({ ThemeMode }) => (ThemeMode ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.8)')};
    height: 100vh;
    border: ${({ ThemeMode }) => (ThemeMode ? '4px solid black' : '4px solid white')};
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
    z-index: 40;

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
export const Container_Nav_Bar = styled.div.withConfig({
    shouldForwardProp: (prop) => prop !== 'ThemeMode',
})`
    display: flex;
    justify-content: space-between;
    align-items: center;           
    background: ${({ ThemeMode }) => (ThemeMode ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.8)')};
    width: 90%;
    height: 60px;  
    border-radius: 50px; 
    border: ${({ ThemeMode }) => (ThemeMode ? '4px solid black' : '4px solid white')};   
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
export const Container_Nav_Bar_Button = styled.div.withConfig({
    shouldForwardProp: (prop) => prop !== 'ThemeMode',
})`
    width: 90%;
    height: 55px;
    gap: 7px;
    background: ${({ ThemeMode }) => (ThemeMode ? 'rgb(58,93,174)' : 'rgb(82, 126, 231)')};
    border-radius: 50px;
    border: ${({ ThemeMode }) => (ThemeMode ? '2px solid black' : '2px solid white')}; 
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
export const Container_Search_Bar = styled.div`  
    display: flex;            
    align-items: center;
    justify-content: flex-end;         
    background: transparent;
    width: 90%;
    height: 60px;       
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
export const Container_Footer = styled.div.withConfig({
    shouldForwardProp: (prop) => prop !== 'ThemeMode',
})`  
display: flex;  
flex-direction: column;          
align-items: center;
justify-content: flex-start;         
background: ${({ ThemeMode }) => (ThemeMode ? 'rgba(255, 255, 255, 0.8)' : 'rgba(0, 0, 0, 0.9)')};
border: ${({ ThemeMode }) => (ThemeMode ? '2px solid black' : '2px solid white')};
width: 100%;
height: auto;       
position: relative; 
padding: 20px;
gap: 10px;

@media (max-width: 768px) {
    padding: 15px;
    gap: 8px;   
}

@media (max-width: 480px) {
    padding: 10px;
    gap: 6px;
}
`;
//____________NAVEGATION____________
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