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
import { RefUsersContext } from "../../../contexts/RefsProvider"
import { UserTypesContext } from "../../../contexts/UsersProvider"
// Hooks personalizados
import { ResetTextFieldsUser,ResetTextFieldsPermissions,ResetTextFieldsStatus } from "../../../hooks/Texts"
import { TableActionsUsers } from "../../../hooks/Table"
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
import { Button_Icon_Blue_180 } from "../../styled/Buttons";
import { Text_Span_16_Center_Black,Text_Fade_Title_32_Black } from "../../styled/Text";
import { Icon_20,Icon_Button_Black_14 } from "../../styled/Icons";
import { Alert_Sonner_Promise } from "../../styled/Alerts"
//____________IMPORT/EXPORT____________

// Tabla de los usuarios
export default function Table_Menus(){
    // Constantes con el valor de los contextos
    const [themeMode] = useContext(ThemeModeContext);
    // Estructura del componente
    return(
        <>
            <Table id="Table-Menus">
                <Thead ThemeMode={themeMode}>
                    <tr>
                        <Th>Nombre</Th>
                        <Th>Categoria</Th>
                        <Th>Ubicación</Th>
                    </tr>
                </Thead>
                <Tbody ThemeMode={themeMode}>
                    <tr>
                        <Td ThemeMode={themeMode}>Colaboradores</Td>
                        <Td ThemeMode={themeMode}>Desayuno</Td>
                        <Td ThemeMode={themeMode}>Cocina</Td>
                    </tr>
                    <tr>
                        <Td ThemeMode={themeMode}>Colaboradores</Td>
                        <Td ThemeMode={themeMode}>Comida</Td>
                        <Td ThemeMode={themeMode}>Cocina</Td>
                    </tr>
                    <tr>
                        <Td ThemeMode={themeMode}>Colaboradores</Td>
                        <Td ThemeMode={themeMode}>Cena</Td>
                        <Td ThemeMode={themeMode}>Cocina</Td>
                    </tr>
                </Tbody>
            </Table>
        </>
    );
}