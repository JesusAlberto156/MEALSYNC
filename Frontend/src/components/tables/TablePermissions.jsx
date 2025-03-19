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

export default function TablePermissions(){

    const [selectedRow,setSelectedRow] = useContext(selectedRowContext);
    const [permissionUser] = useContext(permissionContext);
    const [users] = useContext(usersContext);

    const {handleRowClick, nextPagePermissions, prevPage, currentRecordsPermissions, currentPage, totalPagesPermissions} = useTableActions();

    useEffect(() => {
        const handleClickOutside = (event) => {
            const table = document.getElementById("TablePermissions");
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
                <Table id="TablePermissions">
                    <thead>
                        <Tr>
                            <Th>Nombre de Usuario</Th>
                            <Th>Administrador</Th>
                            <Th>Chef</Th>
                            <Th>Almacén</Th>
                            <Th>Cocinero</Th>
                            <Th>Nutriologo</Th>
                            <Th>Medico</Th>
                            {permissionUser.superAdmon ? (
                                <Th>Super Administrador</Th>
                            ):(
                                <></>
                            )}
                        </Tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            currentRecordsPermissions.map((permission) => (
                                user.idusuario === permission.idusuario ? (
                                    <Tr
                                        key={permission.idpermiso}
                                        onClick={() => handleRowClick(permission)}
                                        style={{
                                            backgroundColor: selectedRow === permission ? '#e0f7fa' : 'transparent',
                                            cursor: 'pointer',
                                            transition: 'background-color 0.5s ease',
                                        }}
                                    >
                                        <Td>{user.nombre}</Td>
                                        <Td>{permission.administrador ? <FaCheck style={{color:'rgb(20, 165, 76)'}}/>:(<FaCheck style={{color:'rgb(155, 9, 9)'}}/>)}</Td>
                                        <Td>{permission.chef ? <FaCheck style={{color:'rgb(20, 165, 76)'}}/>:(<FaCheck style={{color:'rgb(155, 9, 9)'}}/>)}</Td>
                                        <Td>{permission.almacen ? <FaCheck style={{color:'rgb(20, 165, 76)'}}/>:(<FaCheck style={{color:'rgb(155, 9, 9)'}}/>)}</Td>
                                        <Td>{permission.cocinero ? <FaCheck style={{color:'rgb(20, 165, 76)'}}/>:(<FaCheck style={{color:'rgb(155, 9, 9)'}}/>)}</Td>
                                        <Td>{permission.nutriologo ? <FaCheck style={{color:'rgb(20, 165, 76)'}}/>:(<FaCheck style={{color:'rgb(155, 9, 9)'}}/>)}</Td>
                                        <Td>{permission.medico ? <FaCheck style={{color:'rgb(20, 165, 76)'}}/>:(<FaCheck style={{color:'rgb(155, 9, 9)'}}/>)}</Td>
                                        {permissionUser.superAdmon ? (
                                            <Td>{permission.superAdmon ? <FaCheck style={{color:'rgb(20, 165, 76)'}}/>:(<FaCheck style={{color:'rgb(155, 9, 9)'}}/>)}</Td>
                                        ):(
                                            <></>
                                        )}
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
                    <span>Página {currentPage} de {totalPagesPermissions}</span>
                    <Tooltip title='Siguiente página' placement="top">
                        <button disabled={currentPage === totalPagesPermissions || totalPagesPermissions === 0} onClick={nextPagePermissions}><GrNext/></button>
                    </Tooltip>
                </Pagination>
            </Container_Option_Navbar>
        </>
    );
}