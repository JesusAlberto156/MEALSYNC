//____________IMPORT/EXPORT____________
// Hooks de React
import Select from "react-select";
// Estilos personalizados
import { Container_Row_100_Center } from "./Containers";
import { Text_Span_16_Center_Black } from "./Text";
//____________IMPORT/EXPORT____________

export const Select_300 = ({
    data = 0,
    options = [],
    value = null,
    onChange = () => {},
    placeholder = 'Selecciona una opción...',
    isDisabled = false,
}) => {
    // Estructura del componente
    return(
        <>
            {data !== 0 ? (
                <Select
                    options={options}
                    isClearable={true}
                    styles={{
                        control: (provided,state) => ({
                            ...provided,
                            width: '300px',
                            padding: '6px',
                            border: '1px solid black',
                            borderRight: '5px solid black',
                            cursor: 'pointer',
                            borderRadius: '30px',
                            fontFamily: 'Century Gothic',
                            fontStyle: 'normal',
                            fontSize: '16px',
                            justifyContent: 'center',
                            textAlign: 'center',
                            transition: 'all 0.4s ease-in-out',
                            '&:hover': {
                                border: '1px solid rgb(58,93,174)',
                                borderRight: '5px solid rgb(58,93,174)',
                                transform: 'scale(1.1)',
                            },
                            ...(state.isFocused && {
                                border: '1px solid rgb(58,93,174)',
                                borderRight: '5px solid rgb(58,93,174)',
                            }),
                            '@media (max-width: 768px)':{
                                width: '240px',
                                borderRadius: '25px',
                                padding: '4px',
                                fontSize: '14px',
                                border: '1px solid black',
                                borderRight: '4px solid black',
                                '&:hover': {
                                    border: '1px solid rgb(58,93,174)',
                                    borderRight: '4px solid rgb(58,93,174)',
                                },
                                ...(state.isFocused && {
                                    border: '1px solid rgb(58,93,174)',
                                    borderRight: '5px solid rgb(58,93,174)',
                                }),
                            },
                            '@media (max-width: 480px)':{
                                width: '180px',
                                borderRadius: '20px',
                                padding: '2px',
                                fontSize: '12px',
                                border: '1px solid black',
                                borderRight: '3px solid black',
                                '&:hover': {
                                    border: '1px solid rgb(58,93,174)',
                                    borderRight: '3px solid rgb(58,93,174)',
                                },
                                ...(state.isFocused && {
                                    border: '1px solid rgb(58,93,174)',
                                    borderRight: '5px solid rgb(58,93,174)',
                                }),
                            },
                        }),
                        singleValue: (provided) => ({
                            ...provided,
                            textAlign: 'center', 
                            width: '100%',
                        }),
                        option: (provided,state) => ({
                            ...provided,
                            textAlign: 'center',
                            fontFamily: 'Century Gothic',
                            padding: '6px',
                            fontSize: '16px',
                            backgroundColor: state.isSelected ? 'rgb(58,93,174)' : 'white', 
                            color: state.isSelected ? 'white' : 'black',
                            fontWeight: state.isSelected ? 'bold' : 'normal',
                            cursor: 'pointer',
                            ':hover': {
                                backgroundColor: state.isSelected ? 'rgb(12, 54, 109)' : 'rgba(58,93,174,0.2)',
                            },
                            '@media (max-width: 768px)':{
                                padding: '4px',
                                fontSize: '14px',
                            },
                            '@media (max-width: 480px)':{
                                padding: '2px',
                                fontSize: '12px',
                            },
                        }),
                        menu: (provided) => ({
                            ...provided,
                            overflow: 'hidden',
                            borderBottomLeftRadius:'30px',
                            borderBottomRightRadius: '30px',
                            border: '1px solid black',
                            borderRight: '5px solid black',
                            borderBottom: '5px solid black',
                            '@media (max-width: 768px)':{
                                borderBottomLeftRadius:'25px',
                                borderBottomRightRadius: '25px',
                                border: '1px solid black',
                                borderRight: '4px solid black',
                                borderBottom: '4px solid black',
                            },
                            '@media (max-width: 480px)':{
                                borderBottomLeftRadius:'20px',
                                borderBottomRightRadius: '20px',
                                border: '1px solid black',
                                borderRight: '3px solid black',
                                borderBottom: '3px solid black',
                            },
                        }),
                        menuList: (provided) => ({
                            ...provided,
                            maxHeight:175,
                            fontFamily: 'Century Gothic',
                            fontStyle: 'normal',
                            overflowY:'auto',
                            '&::-webkit-scrollbar': {
                                width: '6px',
                                height: '6px',
                                backgroundColor: 'rgb(255, 255, 255)',
                                borderRadius: '20px',
                                boxShadow: 'inset 0 0 5px rgba(0, 0, 0, 0.41)',
                            },
                            '&::-webkit-scrollbar-thumb': {
                                backgroundColor: 'rgb(58,93,174)',
                                borderRadius: '30px',
                                border: '1px solid rgb(255, 255, 255)',
                                cursor: 'pointer',
                            },
                            '&::-webkit-scrollbar-thumb:hover': {
                                backgroundColor: 'rgb(82, 126, 231)',
                            },
                            '@media (max-width: 768px)':{
                                maxHeight:150,
                            },
                            '@media (max-width: 480px)':{
                                maxHeight:125,
                                '&::-webkit-scrollbar': {
                                    width: '4px',
                                    height: '4px',
                                },
                            },
                        })
                    }}
                    placeholder={placeholder}
                    value={value}
                    onChange={onChange}
                    isDisabled={isDisabled || data === 0}
                    isSearchable={false}
                />
            ):(
                <Container_Row_100_Center>
                    <Text_Span_16_Center_Black>¡No hay datos disponibles!</Text_Span_16_Center_Black>
                </Container_Row_100_Center>
            )}  
        </>
    );
}