//____________IMPORT/EXPORT____________
// Componentes de React externos
import styled from 'styled-components';
//____________IMPORT/EXPORT____________

export const Chart_850x500 = styled.button.withConfig({
    shouldForwardProp: (prop) => prop !== 'ThemeMode',
})`
    width: 850px;
    height: 500px;
    border: ${({ ThemeMode }) => (ThemeMode ? '4px solid black' : '4px solid white')};
    border-radius: 50px;
    background: ${({ ThemeMode }) => (ThemeMode ? 'rgba(255, 255, 255)' : 'rgba(0, 0, 0)')};
    position: relative;
    z-index: 40;

    @media (max-width: 768px) {
        width: 600px;
        height: 400px;
        border-radius: 45px;
    }

    @media (max-width: 480px) {
        width: 300px;
        height: 250px;
        border-radius: 40px;
    }
`;