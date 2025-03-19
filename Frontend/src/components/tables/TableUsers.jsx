import { useContext,useEffect } from "react"
import { selectedRowContext } from '../../contexts/SelectedRowProvider'

import { Container_Option_Navbar,Pagination } from "../styled/Containers"
import { Table,Tr,Th,Td } from "../styled/Tables"
import { Tooltip } from "@mui/material"

import { GrNext,GrPrevious } from "react-icons/gr";

import { useTableActions } from "../../hooks/Table"

export default function TableUsers(){

    const [selectedRow,setSelectedRow] = useContext(selectedRowContext);
    
    const {handleRowClick, nextPageUsers, prevPage, currentRecordsUsers, currentPage, totalPagesUsers} = useTableActions();

    useEffect(() => {
        const handleClickOutside = (event) => {
            const table = document.getElementById("TableUsers");
            if (table && !table.contains(event.target)) {
                setSelectedRow(null);
            }
        };
    
        document.addEventListener("click", handleClickOutside);
        return () => document.removeEventListener("click", handleClickOutside);
    }, []);

    return(
        <>
            <Container_Option_Navbar>
                <Table id="TableUsers">
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
                                    backgroundColor: selectedRow === user ? '#e0f7fa' : 'transparent',
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
                <Pagination>
                    <Tooltip title='Anterior página' placement="top">
                        <button disabled={currentPage === 1} onClick={prevPage}><GrPrevious/></button>
                    </Tooltip>
                    <span>Página {currentPage} de {totalPagesUsers}</span>
                    <Tooltip title='Siguiente página' placement="top">
                        <button disabled={currentPage === totalPagesUsers || totalPagesUsers === 0} onClick={nextPageUsers}><GrNext/></button>
                    </Tooltip>
                </Pagination>
            </Container_Option_Navbar>
        </>
    );
}