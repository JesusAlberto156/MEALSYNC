import styled from 'styled-components';

//--------LOGIN--------
export const Label_Login = styled.label.withConfig({
    shouldForwardProp: (prop) => prop !== 'isLabelUp' && prop !== 'isFocused',
})`
    z-index: 0;
    position: absolute;
    top: 14px;
    left: 7px;
    font-size: 1.2rem;
    font-family:Arial, Helvetica, sans-serif;
    color: #000000;
    background-color: transparent;
    transition: 0.2s ease;
    white-space: nowrap;

    ${(props) =>  props.isLabelUp && `
        top: -10px;
        font-size: 0.9rem;
    `}

    ${(props) => props.isFocused && `
        color: rgb(45, 93, 182);
    `}

    @media (max-width: 768px) {
        font-size: 1.1rem;
        top: 14px;
        left: 5px;

        ${(props) => props.isLabelUp && `
            top: -8px;
            font-size: 0.8rem;
        `}

        ${(props) => props.isFocused && `
            rgb(45, 93, 182);
        `}
    }
    
    @media (max-width: 480px) {
        font-size: 1rem;
        top: 12px;
        left: 3px;

        ${(props) => props.isLabelUp && `
            top: -6px;
            font-size: 0.9rem;
        `}

        ${(props) => props.isFocused && `
            color: rgb(45, 93, 182);
        `}
    }

`;
export const Label_Popup_Login = styled.p`
    color: rgb(9, 55, 73);; 
    text-Align: left; 
    font-Size: 0.9rem; 
    font-family:Arial, Helvetica, sans-serif;
    left: 7px;
    position: absolute;
    transform: translateY(-25px);
    transition: transform 0.3s ease;

    @media (max-width: 768px) {
        font-size: 0.9rem;
        transform: translateY(-25px);
        left: 5px;
    }

    @media (max-width: 480px) {
        font-size: 0.8rem;
        transform: translateY(-25px);
        left: 3px;
    }
`;
//--------LOGIN--------
//--------MODAL--------
export const Label_Checkbox_Modal = styled.label`
    display: flex;
    align-items: center;
    cursor: pointer;
    font-Size: 1.2rem; 
    font-family:Arial, Helvetica, sans-serif;
    gap: 5px;
    margin-bottom: 20px;

    @media (max-width: 768px) {
        font-Size: 1rem; 
        gap: 4px;
        margin-bottom: 15px;
    }

    @media (max-width: 480px) {
        font-Size: 0.8rem; 
        gap: 3px;
        margin-bottom: 10px;
    }
`;