import { useContext,useEffect } from "react"
import { Tooltip } from "@mui/material"

import { selectedRowContext } from "../../contexts/VariablesProvider"

import { useTableActions } from "../../hooks/Table"

import { GrNext,GrPrevious } from "react-icons/gr";

import { Container_Option_Navbar,Container_Table_Pagination } from "../styled/Containers"
import { Table,Tr,Th,Td } from "../styled/Tables"
import { Button_Block_Pagination,Button_Blue_Pagination } from "../styled/Buttons"
import { Text_Pagination } from "../styled/Text";

export default function TableUsers(){

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
            <Container_Option_Navbar>
                <Table id="Tabla-Usuarios">
                    <thead>
                        <Tr>
                            <Th>ID Usuario</Th>
                            <Th>Nombre</Th>
                            <Th>Nombre Corto</Th>
                            <Th>Usuario</Th>
                            <Th>Contraseña</Th>
                        </Tr>
                    </thead>
                    <tbody>
                        {currentRecordsUsers.map((user) => (
                            <Tr 
                                key={user.idusuario}
                                onClick={() => handleRowClick(user)}
                                style={{
                                    backgroundColor: isSelectedRow === user ? '#e0f7fa' : 'transparent',
                                    cursor: 'pointer',
                                    transition: 'background-color 0.5s ease',
                                }}
                            >
                                <Td>{user.idusuario}</Td>
                                <Td>{user.nombre}</Td>
                                <Td>{user.nombrecorto}</Td>
                                <Td>{user.usuario}</Td>
                                <Td>{user.contrasena}</Td>
                            </Tr>
                        ))}

                    </tbody>
                </Table>
                <Container_Table_Pagination>
                    {currentPage === 1 ? (
                        <Button_Block_Pagination><GrPrevious/></Button_Block_Pagination>
                    ):(
                        <Tooltip title='Anterior página' placement="top">
                            <Button_Blue_Pagination onClick={prevPage}><GrNext/></Button_Blue_Pagination>
                        </Tooltip>
                    )}
                    <Text_Pagination>Página {currentPage} de {totalPagesUsers}</Text_Pagination>
                    {currentPage === totalPagesUsers || totalPagesUsers === 0 ? (
                        <Button_Block_Pagination><GrNext/></Button_Block_Pagination>
                    ):(
                        <Tooltip title='Siguiente página' placement="top">
                            <Button_Blue_Pagination onClick={nextPageUsers}><GrNext/></Button_Blue_Pagination>
                        </Tooltip>
                    )} 
                </Container_Table_Pagination>
            </Container_Option_Navbar>
        </>
    );
}