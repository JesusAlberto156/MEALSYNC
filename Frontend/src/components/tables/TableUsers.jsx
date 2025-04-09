import { useContext,useEffect } from "react"
import { Tooltip } from "@mui/material"

import { selectedRowContext } from "../../contexts/VariablesProvider"
import { themeModeContext } from "../../contexts/ViewsProvider"
import { useTableActions } from "../../hooks/Table"

import { GrNext,GrPrevious } from "react-icons/gr";

// Estilos personalizados
import { Container_Pagination } from "../styled/Containers"
import { Table,Tr,Th,Td } from "../styled/Tables"
import { Button_Icon_Block_150,Button_Icon_Blue_150 } from "../styled/Buttons"
import { Text_Span_16 } from "../styled/Text";
//____________IMPORT/EXPORT____________

export default function TableUsers(){

    const [themeMode] = useContext(themeModeContext);
    const [isSelectedRow,setIsSelectedRow] = useContext(selectedRowContext);
    
    const {handleRowClick, nextPageUsers, prevPage, currentRecordsUsers, currentPage, totalPagesUsers} = useTableActions();

    useEffect(() => {
        const handleClickOutside = (event) => {
            const table = document.getElementById("Tabla-Usuarios");
            if (table && !table.contains(event.target)) {
                setIsSelectedRow(null);
            }
        };
    
        document.addEventListener("click", handleClickOutside);
        return () => document.removeEventListener("click", handleClickOutside);
    }, []);

    return(
        <>
            <Table id="Tabla-Usuarios">
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
                            <Td ThemeMode={themeMode}>{'•'.repeat(user.contrasena.length)}</Td>
                        </Tr>
                    ))}

                </tbody>
            </Table>
            <Container_Pagination>
                {currentPage === 1 ? (
                    <Button_Icon_Block_150 ThemeMode={themeMode}><GrPrevious/></Button_Icon_Block_150>
                ):(
                    <Tooltip title='Anterior página' placement="top">
                        <Button_Icon_Blue_150 ThemeMode={themeMode} onClick={prevPage}><GrNext/></Button_Icon_Blue_150>
                    </Tooltip>
                )}
                <Text_Span_16 ThemeMode={themeMode}>Página {currentPage} de {totalPagesUsers}</Text_Span_16>
                {currentPage === totalPagesUsers || totalPagesUsers === 0 ? (
                    <Button_Icon_Block_150 ThemeMode={themeMode}><GrNext/></Button_Icon_Block_150>
                ):(
                    <Tooltip title='Siguiente página' placement="top">
                        <Button_Icon_Blue_150 ThemeMode={themeMode} onClick={nextPageUsers}><GrNext/></Button_Icon_Blue_150>
                    </Tooltip>
                )} 
            </Container_Pagination>
        </>
    );
}