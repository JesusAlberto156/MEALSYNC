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
export const Chart_Container_White_45 = styled.div`
    width: 45vw;
    height: 50vh;
    position: relative;
    border: 3px solid black;
    border-top-right-radius: 50px;
    border-bottom-right-radius: 50px;
    border-right: 6px solid black;
    border-bottom: 6px solid black;
    background: rgb(255, 255, 255);
    display: flex;            
    justify-content: center;
    align-items: center;

    @media (max-width: 768px) {
        width: 55vw;
        height: 40vh;
        border-top-right-radius: 30px;
        border-bottom-right-radius: 30px;
        border: 2px solid black;
        border-right: 5px solid black;
        border-bottom: 5px solid black;
    }

    @media (max-width: 480px) {
        width: 65vw;
        height: 30vh;
        border-top-right-radius: 20px;
        border-bottom-right-radius: 20px;
        border: 1px solid black;
        border-right: 4px solid black;
        border-bottom: 4px solid black;
    }
`;
//---------- Blanco
//____________CONTAINER____________
//____________TOOLTIP____________
export const Chart_Tooltip_16 = styled.div`
    width: auto;
    height: auto;
    background-color: rgba(0, 0, 0, 0.85);
    border: 4px solid rgba(255, 255, 255, 0.75);
    padding: 10px;
    padding-left: 20px;
    padding-right: 20px;
    color: rgb(255,255,255);
    font-family: Century Gothic;
    font-size: 16px;
    border-radius: 50px;

    @media (max-width: 768px) {
        border: 3px solid rgba(255,255,255,0.75);
        padding: 8px;
        padding-left: 15px;
        padding-right: 15px;
        fontSize: 14px;
        border-radius: 30px;
    }

    @media (max-width: 480px) {
        border: 2px solid rgba(255,255,255,0.65);
        padding: 6px;
        padding-left: 10px;
        padding-right: 10px;
        fontSize: 12px;
        border-radius: 20px;
    }
`;
export const Chart_Tooltip_Value_Black = ({ active,payload }) => {
    if (active && payload && payload.length) {
        return (
            <Chart_Tooltip_16>
                <p>{payload[0].name}: {payload[0].value}</p>
            </Chart_Tooltip_16>
        );
    }

    return null;
};
export const Chart_Legend_Value = ({ payload }) => {
    return (
        <Chart_Legend_Fixed>
            {payload.map((entry, index) => (
                <Chart_Legend_Span_16 key={`item-${index}`} style={{ color: entry.color}}>⬤ {entry.value}</Chart_Legend_Span_16>
            ))}
        </Chart_Legend_Fixed>
    );
};
//____________TOOLTIP____________
//____________LEGEND____________
export const Chart_Legend_Fixed = styled.div`
    position: absolute;
    left: 5%;
    bottom: 80px;
    gap: 4px;
    display: flex; 
    flex-direction: column;           
    justify-content: center;

    @media (max-width: 1000px) {
        left: 2%;
        bottom: 10px;
    }

    @media (max-width: 768px) {
        bottom: 6px;
        gap: 3px;
    }

    @media (max-width: 480px) {
        bottom: 2px;
        gap: 2px;
    }
`;
export const Chart_Legend_Span_16 = styled.span`
    font-size: 16px;
    font-family: Century Gothic;

    @media (max-width: 768px) {
        font-size: 14px;
    }

    @media (max-width: 480px) {
        font-size: 12px;
    }
`;
//____________LEGEND____________