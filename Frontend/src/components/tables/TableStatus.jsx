import { useContext,useEffect } from "react"
import { selectedRowContext } from '../../contexts/SelectedRowProvider'
import { permissionContext } from "../../contexts/PermissionProvider"
import { usersContext } from "../../contexts/UsersProvider"

import { Container_Option_Navbar,Pagination } from "../styled/Containers"
import { Table,Tr,Th,Td } from "../styled/Tables"
import { Tooltip } from "@mui/material"

import { GrNext,GrPrevious } from "react-icons/gr";
import { FaCheck } from "react-icons/fa";

import { useTableActions } from "../../hooks/Table"

export default function TableStatus(){

    const [selectedRow,setSelectedRow] = useContext(selectedRowContext);
    const [permissionUser] = useContext(permissionContext);
    const [users] = useContext(usersContext);

    const {handleRowClick, nextPageStatus, prevPage, currentRecordsStatus, currentPage, totalPagesStatus} = useTableActions();

    useEffect(() => {
        const handleClickOutside = (event) => {
            const table = document.getElementById("TableStatus");
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
                <Table id="TableStatus">
                    <thead>
                        <Tr>
                            <Th>Nombre de Usuario</Th>
                            <Th>Habilitado</Th>
                            <Th>Activo</Th>
                        </Tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            currentRecordsStatus.map((status) => (
                                user.idusuario === status.idusuario ? (
                                    <Tr
                                        key={status.idestatus}
                                        onClick={() => handleRowClick(status)}
                                        style={{
                                            backgroundColor: selectedRow === status ? '#e0f7fa' : 'transparent',
                                            cursor: 'pointer',
                                            transition: 'background-color 0.5s ease',
                                        }}
                                    >
                                        <Td>{user.nombre}</Td>
                                        <Td>{status.habilitado ? <FaCheck style={{color:'rgb(20, 165, 76)'}}/>:(<FaCheck style={{color:'rgb(155, 9, 9)'}}/>)}</Td>
                                        <Td>{status.activo ? <FaCheck style={{color:'rgb(20, 165, 76)'}}/>:(<FaCheck style={{color:'rgb(155, 9, 9)'}}/>)}</Td>
                                    </Tr>
                                ):(
                                    <></>
                                )
                            ))
                        ))}
                    </tbody>
                </Table>
                <Pagination>
                    <Tooltip title='Anterior página' placement="top">
                        <button disabled={currentPage === 1} onClick={prevPage}><GrPrevious/></button>
                    </Tooltip>
                    <span>Página {currentPage} de {totalPagesStatus}</span>
                    <Tooltip title='Siguiente página' placement="top">
                        <button disabled={currentPage === totalPagesStatus || totalPagesStatus === 0} onClick={nextPageStatus}><GrNext/></button>
                    </Tooltip>
                </Pagination>
            </Container_Option_Navbar>
        </>
    );
}