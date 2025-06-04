//____________IMPORT/EXPORT____________
// Componentes de React externos
import styled from 'styled-components';
//____________IMPORT/EXPORT____________

export const Chart_400 = styled.button.withConfig({
    shouldForwardProp: (prop) => prop !== 'ThemeMode',
})`
    width: 1100px;
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
        width: 700px:
    }

    @media (max-width: 480px) {
        padding: 10px;
        border-radius: 30px;
         width: 400px:
    }
`;
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