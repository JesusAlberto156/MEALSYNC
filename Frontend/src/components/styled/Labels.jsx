import styled from 'styled-components';

//____________TEXT____________
export const Label_Text_20 = styled.label.withConfig({
    shouldForwardProp: (prop) => prop !== 'isLabelUp' && prop !== 'isFocused' && prop !== 'ThemeMode',
})`
    position: absolute;
    top: 12px;
    left: 14px;
    font-size: 20px;
    font-family: "Prompt", sans-serif;
    font-weight: 300;
    font-style: normal;
    color: ${({ ThemeMode }) => (ThemeMode ? 'black' : 'white')};
    background-color: transparent;
    transition: 0.2s ease;
    white-space: nowrap;

    ${(props) =>  props.isLabelUp && `
        top: -10px;
        font-size: 14px;
    `}

    ${(props, ThemeMode) => props.isFocused && `
        color: ${ ThemeMode ? 'rgb(58,93,174)' : 'rgb(82, 126, 231)'};
    `}

    @media (max-width: 768px) {
        font-size: 18px;
        top: 14px;
        left: 11px;

        ${(props) => props.isLabelUp && `
            top: -9px;
            font-size: 12px;
        `}

        ${(props, ThemeMode) => props.isFocused && `
           color: ${ ThemeMode ? 'rgb(58,93,174)' : 'rgb(82, 126, 231)'};
        `}
    }
    
    @media (max-width: 480px) {
        font-size: 16px;
        left: 9px;

        ${(props) => props.isLabelUp && `
            top: -7px;
            font-size: 10px;
        `}

        ${(props, ThemeMode) => props.isFocused && `
            color: ${ ThemeMode ? 'rgb(58,93,174)' : 'rgb(82, 126, 231)'};
        `}
    }

`;

export const Label_Text_20_Dark = styled.label.withConfig({
    shouldForwardProp: (prop) => prop !== 'isLabelUp' && prop !== 'isFocused',
})`
    position: absolute;
    top: 12px;
    left: 14px;
    font-size: 20px;
    font-family: "Prompt", sans-serif;
    font-weight: 300;
    font-style: normal;
    color: white;
    background-color: transparent;
    transition: 0.2s ease;
    white-space: nowrap;

    ${(props) =>  props.isLabelUp && `
        top: -10px;
        font-size: 14px;
    `}

    ${(props) => props.isFocused && `
        color: rgb(82, 126, 231);
    `}

    @media (max-width: 768px) {
        font-size: 18px;
        top: 14px;
        left: 11px;

        ${(props) => props.isLabelUp && `
            top: -9px;
            font-size: 12px;
        `}

        ${(props) => props.isFocused && `
            color: rgb(82, 126, 231);
        `}
    }
    
    @media (max-width: 480px) {
        font-size: 16px;
        left: 9px;

        ${(props) => props.isLabelUp && `
            top: -7px;
            font-size: 10px;
        `}

        ${(props) => props.isFocused && `
            color: rgb(82, 126, 231);
        `}
    }

`;
export const Label_Text_20_Light = styled.label.withConfig({
    shouldForwardProp: (prop) => prop !== 'isLabelUp' && prop !== 'isFocused' && prop !== 'ThemeMode',
})`
    position: absolute;
    top: 12px;
    left: 14px;
    font-size: 20px;
    font-family: "Prompt", sans-serif;
    font-weight: 300;
    font-style: normal;
    color: ${({ ThemeMode }) => (ThemeMode ? 'black' : 'white')};
    background-color: transparent;
    transition: 0.2s ease;
    white-space: nowrap;

    ${(props) =>  props.isLabelUp && `
        top: -10px;
        font-size: 14px;
    `}

    ${(props, ThemeMode) => props.isFocused && `
        color: ${ ThemeMode ? 'rgb(58,93,174)' : 'rgb(82, 126, 231)'};
    `}

    @media (max-width: 768px) {
        font-size: 18px;
        top: 14px;
        left: 11px;

        ${(props) => props.isLabelUp && `
            top: -9px;
            font-size: 12px;
        `}

        ${(props, ThemeMode) => props.isFocused && `
           color: ${ ThemeMode ? 'rgb(58,93,174)' : 'rgb(82, 126, 231)'};
        `}
    }
    
    @media (max-width: 480px) {
        font-size: 16px;
        left: 9px;

        ${(props) => props.isLabelUp && `
            top: -7px;
            font-size: 10px;
        `}

        ${(props, ThemeMode) => props.isFocused && `
            color: ${ ThemeMode ? 'rgb(58,93,174)' : 'rgb(82, 126, 231)'};
        `}
    }

`;
//____________TEXT____________
//____________POPUP____________
export const Label_Popup_14 = styled.p.withConfig({
    shouldForwardProp: (prop) => prop !== 'ThemeMode',
})`
    color: ${({ ThemeMode }) => (ThemeMode ? 'rgb(137, 58, 174)' : 'rgb(147, 82, 231)')};
    text-Align: left; 
    font-Size: 14px; 
    font-family: "Prompt", sans-serif;
    font-weight: 300;
    font-style: normal;
    left: 14px;
    position: absolute;
    transform: translateY(-35px);
    transition: transform 0.3s ease;

    @media (max-width: 768px) {
        font-size: 12PX;
        transform: translateY(-30px);
        left: 10px;
    }

    @media (max-width: 480px) {
        font-size: 10px;
        transform: translateY(-25px);
        left: 8px;
    }
`;


export const Label_Popup_16_Dark = styled.p`
    color: rgb(147, 82, 231);
    text-Align: left; 
    font-Size: 16px; 
    font-family: "Prompt", sans-serif;
    font-weight: 300;
    font-style: normal;
    left: 14px;
    position: absolute;
    transform: translateY(-35px);
    transition: transform 0.3s ease;

    @media (max-width: 768px) {
        font-size: 12PX;
        transform: translateY(-30px);
        left: 12px;
    }

    @media (max-width: 480px) {
        font-size: 10px;
        transform: translateY(-25px);
        left: 10px;
    }
`;
export const Label_Popup_16_Light = styled.p.withConfig({
    shouldForwardProp: (prop) => prop !== 'ThemeMode',
})`
    color: ${({ ThemeMode }) => (ThemeMode ? 'rgb(137, 58, 174)' : 'rgb(147, 82, 231)')};
    text-Align: left; 
    font-Size: 14px; 
    font-family: "Prompt", sans-serif;
    font-weight: 300;
    font-style: normal;
    left: 14px;
    position: absolute;
    transform: translateY(-35px);
    transition: transform 0.3s ease;

    @media (max-width: 768px) {
        font-size: 12PX;
        transform: translateY(-30px);
        left: 10px;
    }

    @media (max-width: 480px) {
        font-size: 10px;
        transform: translateY(-25px);
        left: 8px;
    }
`;
//____________POPUP____________
//____________CHECK____________
export const Label_Check_18_Dark = styled.label`
    display: flex;
    align-items: center;
    cursor: pointer;
    color: white;
    font-family: "Prompt", sans-serif;
    font-weight: 300;
    font-style: normal;
    font-Size: 18px; 
    gap: 5px;
    

    @media (max-width: 768px) {
        font-Size: 16px; 
        gap: 4px;
    }

    @media (max-width: 480px) {
        font-Size: 14px; 
        gap: 3px;
    }
`;
export const Label_Check_18_Light = styled.label`
    display: flex;
    align-items: center;
    cursor: pointer;
    color: black;
    font-family: "Prompt", sans-serif;
    font-weight: 300;
    font-style: normal;
    font-Size: 18px; 
    gap: 5px;
    

    @media (max-width: 768px) {
        font-Size: 16px; 
        gap: 4px;
    }

    @media (max-width: 480px) {
        font-Size: 14px; 
        gap: 3px;
    }
`;
//____________CHECK____________
