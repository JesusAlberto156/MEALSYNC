//____________IMPORT/EXPORT____________
// Componentes de React externos
import styled from 'styled-components';
//____________IMPORT/EXPORT____________
export const Chart_90 = styled.button.withConfig({
    shouldForwardProp: (prop) => prop !== 'ThemeMode',
})`
    width: 90%;
    height: auto;
    border: ${({ ThemeMode }) => (ThemeMode ? '4px solid black' : '4px solid white')};
    border-radius: 40px;
    background: ${({ ThemeMode }) => (ThemeMode ? 'rgba(255, 255, 255)' : 'rgba(0, 0, 0)')};
    position: relative;
    padding: 20px;
    z-index: 40;

    @media (max-width: 768px) {
        padding: 15px;
        border-radius: 35px;
    }

    @media (max-width: 480px) {
        padding: 10px;
        border-radius: 30px;
    }
`;
//____________CONTAINER____________
//---------- Blanco
export const Chart_Container_White_800x500 = styled.button.withConfig({
    shouldForwardProp: (prop) => prop !== 'ThemeMode',
})`
    width: 800px;
    height: 500px;
    border: ${({ ThemeMode }) => (ThemeMode ? '2px solid black' : '2px solid white')};
    border-radius: 40px;
    background: ${({ ThemeMode }) => (ThemeMode ? 'rgb(255, 255, 255)' : 'rgb(0, 0, 0)')};
    position: relative;
    padding: 20px;
    z-index: 40;

    @media (max-width: 768px) {
        padding: 15px;
        border-radius: 35px;
        width: 600px;
        height: 350px;
    }

    @media (max-width: 480px) {
        padding: 10px;
        border-radius: 30px;
        width: 400px;
        height: 200px;
    }
`;
//---------- Blanco
//____________CONTAINER____________
//____________TOOLTIP____________
export const Chart_Tooltip_Custom_Name_Value = ({ active,payload,themeMode }) => {
    if (active && payload && payload.length) {
        return (
        <div
            style={{
                backgroundColor: themeMode ? 'white' : 'black',
                border: themeMode ? '1px solid black' : '1px solid white',
                padding: '10px',
                color: themeMode ? 'black' : 'white',
                fontFamily: 'Century Gothic',
                fontSize: '1.2vw',
                borderRadius: '30px',
            }}
        >
            <p>{payload[0].name}: {payload[0].value}</p>
        </div>
        );
    }

    return null;
};
//____________TOOLTIP____________