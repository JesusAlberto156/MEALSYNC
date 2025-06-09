//____________IMPORT/EXPORT____________
// Hooks de React
import { useContext } from "react"

import { ThemeModeContext } from "../../contexts/ViewsProvider";
import { Container_Column_100_Center, Container_Row_100_Center,Container_Row_Blue_Width_2000_Left } from "../styled/Containers";
import { Button_Icon_Blue_140 } from "../styled/Buttons";
import { Text_Span_12_Center } from "../styled/Text";
import { Icon_White_18 } from "../styled/Icons";

import { IoSearch } from "react-icons/io5";
//__________ICONOS__________
// Estilos personalizados
import Card_Add from "../cards/CardAdd";
import Card_Dish from "../cards/CardMenuOptions";
//____________IMPORT/EXPORT____________

// Tabla de los usuarios
export default function Menu_Breakfasts(){
    // Constantes con el valor de los contextos
    const [themeMode] = useContext(ThemeModeContext);
    // Constante con las opciones de los buscadores
    const isObtionDishes = ['General','Platillos','Guarniciones','Bebidas'];
     const isObtionMenus = ['General','Colaboradores'];
    // Estructura del componente
    return(
        <>
            <Container_Column_100_Center>
                <Container_Row_100_Center>
                    <Container_Row_Blue_Width_2000_Left ThemeMode={themeMode}>
                        {isObtionDishes.map((option,index) => (
                            <Button_Icon_Blue_140 ThemeMode={themeMode}
                                key={index}
                                
                            >
                                <Text_Span_12_Center>{option}</Text_Span_12_Center>
                            </Button_Icon_Blue_140>
                        ))}
                        <Icon_White_18><IoSearch/></Icon_White_18>
                    </Container_Row_Blue_Width_2000_Left>
                </Container_Row_100_Center>
                <Container_Row_100_Center>
                    <Container_Row_Blue_Width_2000_Left ThemeMode={themeMode}>
                        {isObtionMenus.map((option,index) => (
                            <Button_Icon_Blue_140 ThemeMode={themeMode}
                                key={index}
                                
                            >
                                <Text_Span_12_Center>{option}</Text_Span_12_Center>
                            </Button_Icon_Blue_140>
                        ))}
                        <Icon_White_18><IoSearch/></Icon_White_18>
                    </Container_Row_Blue_Width_2000_Left>
                </Container_Row_100_Center>
                <Container_Row_100_Center>
                    <Card_Add/>
                    <Card_Dish/>
                </Container_Row_100_Center>
            </Container_Column_100_Center>
        </>
    );
}