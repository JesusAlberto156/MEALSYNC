//____________IMPORT/EXPORT____________
// Hooks de React
import { useContext,useEffect } from "react"
// Componentes de React externos
import { Tooltip } from "@mui/material"
// Contextos
import { SelectedRowContext,SelectedOptionOrderDirectionContext,SelectedOptionOrderContext } from "../../../contexts/SelectedesProvider"
import { UsersViewPasswordContext } from "../../../contexts/UsersProvider"
import { ThemeModeContext } from "../../../contexts/ViewsProvider"
import { TextFieldsUserContext } from "../../../contexts/FormsProvider"
import { UserTypesContext } from "../../../contexts/UsersProvider"
// Hooks personalizados

//__________ICONOS__________
// Iconos de las tablas
import { FaSortAlphaDown } from "react-icons/fa";
import { FaSortAlphaDownAlt } from "react-icons/fa";
// Iconos de la paginación
import { GrNext,GrPrevious } from "react-icons/gr";
//__________ICONOS__________
// Estilos personalizados
import { Container_Row_100_Center } from "../../styled/Containers";
import { Table,Thead,Th,Tbody,Td,TContainer_Center } from "../../styled/Tables";
import { Button_Icon_Blue_160 } from "../../styled/Buttons";
import { Text_Span_16_Center_Black,Text_Fade_Title_32_Black } from "../../styled/Text";
import { Icon_20,Icon_Button_White_16 } from "../../styled/Icons";
import { Alert_Sonner_Promise } from "../../styled/Alerts"
//____________IMPORT/EXPORT____________

// Tabla de los usuarios
export default function Table_Breakfasts(){
    // Constantes con el valor de los contextos
    const [themeMode] = useContext(ThemeModeContext);
    // Estructura del componente
    return(
        <>
            
        </>
    );
}