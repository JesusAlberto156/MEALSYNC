//____________IMPORT/EXPORT____________
// Hooks de React
import { useContext,useEffect } from "react"
// Componentes de React externos
import { Tooltip } from "@mui/material"
// Contextos
import { SelectedRowContext,ViewPasswordContext } from "../../contexts/VariablesProvider"
import { ThemeModeContext } from "../../contexts/ViewsProvider"
// Hooks personalizados
import { useTableActions } from "../../hooks/Table"
//__________ICONOS__________
// Iconos de la paginación
import { GrNext,GrPrevious } from "react-icons/gr";
//__________ICONOS__________
// Estilos personalizados
import { Container_Row_90_Center } from "../styled/Containers"
import { Table,Tr,Th,Td } from "../styled/Tables"
import { Button_Icon_Block_150,Button_Icon_Blue_150 } from "../styled/Buttons"
import { Text_Span_16_Center } from "../styled/Text";
//____________IMPORT/EXPORT____________

// Tabla de los usuarios
export default function TableUsers(){
    // Constantes con el valor de los contextos
    const [themeMode] = useContext(ThemeModeContext);
    const [isSelectedRow,setIsSelectedRow] = useContext(SelectedRowContext);
    const [isViewPassword] = useContext(ViewPasswordContext);
    // UseEffect que determina la selección de la tabla
    useEffect(() => {
        const handleClickOutside = (event) => {
            const table = document.getElementById("Table-Users");

            if (table && !table.contains(event.target)
            ) {
                setIsSelectedRow(null);
            }
        };
    
        document.addEventListener("click", handleClickOutside);
        return () => document.removeEventListener("click", handleClickOutside);
    }, [Modal,Form,Button_Edit_U,Button_Delete_U]);
    // Constantes con la funcionalidad de los hooks
    const {handleRowClick, nextPageUsers, prevPage, currentRecordsUsers, currentPage, totalPagesUsers} = useTableActions();
    // Estructura del componente
    return(
        <>
            <Table id="Table-Users">
                <thead>
                    <Tr>
                        <Th ThemeMode={themeMode}>ID Usuario</Th>
                        <Th ThemeMode={themeMode}>Nombre</Th>
                        <Th ThemeMode={themeMode}>Nombre Corto</Th>
                        <Th ThemeMode={themeMode}>Usuario</Th>
                        <Th ThemeMode={themeMode}>Contraseña</Th>
                    </Tr>
                </thead>
                <tbody>
                    {currentRecordsUsers.map((user) => (
                        <Tr 
                            key={user.idusuario}
                            onClick={() => handleRowClick(user)}
                            style={{
                                backgroundColor:  isSelectedRow === user ? 'rgba(255, 255, 255, 0.7)' : 'transparent',
                                cursor: 'pointer',
                                transition: 'background-color 0.5s ease',
                            }}
                        >
                            <Td ThemeMode={themeMode}>{user.idusuario}</Td>
                            <Td ThemeMode={themeMode}>{user.nombre}</Td>
                            <Td ThemeMode={themeMode}>{user.nombrecorto}</Td>
                            <Td ThemeMode={themeMode}>{user.usuario}</Td>
                            <Td ThemeMode={themeMode}>{isViewPassword ? user.contrasena : '•'.repeat(user.contrasena.length)}</Td>
                        </Tr>
                    ))}

                </tbody>
            </Table>
            <Container_Row_90_Center>
                {currentPage === 1 ? (
                    <Button_Icon_Block_150 ThemeMode={themeMode}><GrPrevious/></Button_Icon_Block_150>
                ):(
                    <Tooltip title='Anterior página' placement="top">
                        <Button_Icon_Blue_150 ThemeMode={themeMode} onClick={prevPage}><GrNext/></Button_Icon_Blue_150>
                    </Tooltip>
                )}
                <Text_Span_16_Center ThemeMode={themeMode}>Página {currentPage} de {totalPagesUsers}</Text_Span_16_Center>
                {currentPage === totalPagesUsers || totalPagesUsers === 0 ? (
                    <Button_Icon_Block_150 ThemeMode={themeMode}><GrNext/></Button_Icon_Block_150>
                ):(
                    <Tooltip title='Siguiente página' placement="top">
                        <Button_Icon_Blue_150 ThemeMode={themeMode} onClick={nextPageUsers}><GrNext/></Button_Icon_Blue_150>
                    </Tooltip>
                )} 
            </Container_Row_90_Center>
        </>
    );
}