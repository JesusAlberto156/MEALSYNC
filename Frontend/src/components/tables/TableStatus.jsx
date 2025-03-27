import { useContext,useEffect } from "react"
import { Tooltip } from "@mui/material"

import { selectedRowContext } from "../../contexts/VariablesProvider"
import { usersContext } from "../../contexts/UsersProvider"

import { useTableActions } from "../../hooks/Table"

import { GrNext,GrPrevious } from "react-icons/gr";
import { FaCheck } from "react-icons/fa";

import { Container_Option_Navbar,Container_Table_Pagination } from "../styled/Containers"
import { Table,Tr,Th,Td } from "../styled/Tables"
import { Button_Block_Pagination,Button_Blue_Pagination } from "../styled/Buttons"
import { Text_Pagination } from "../styled/Text";

export default function TableStatus(){

    const [isSelectedRow,setIsSelectedRow] = useContext(selectedRowContext);
    const [isUsers] = useContext(usersContext);

    const {handleRowClick, nextPageStatus, prevPage, currentRecordsStatus, currentPage, totalPagesStatus} = useTableActions();

    useEffect(() => {
        const handleClickOutside = (event) => {
            const table = document.getElementById("Tabla-Estatus");
            const elements = document.querySelectorAll('#Boton-Estatus-Cancelar, #Boton-Estatus-Habilitar, #Boton-Estatus-Deshabilitar, #Boton-Estatus-Eliminar, #Estatus-Habilitar, #Estatus-Eliminar');

            if (table && !table.contains(event.target) &&
            ![...elements].some((btn) => btn.contains(event.target))) {
                setIsSelectedRow(null);
            }
        };
    
        document.addEventListener("click", handleClickOutside);
        return () => document.removeEventListener("click", handleClickOutside);
    }, []);

    return(
        <>
            <Container_Option_Navbar>
                <Table id="Tabla-Estatus">
                    <thead>
                        <Tr>
                            <Th>Nombre de Usuario</Th>
                            <Th>Habilitado</Th>
                            <Th>Activo</Th>
                        </Tr>
                    </thead>
                    <tbody>
                        {isUsers.map((user) => (
                            currentRecordsStatus.filter((permission) => user.idusuario === permission.idusuario).map((status) => (
                                <Tr
                                    key={status.idestatus}
                                    onClick={() => handleRowClick(status)}
                                    style={{
                                        backgroundColor: isSelectedRow === status ? '#e0f7fa' : 'transparent',
                                        cursor: 'pointer',
                                        transition: 'background-color 0.5s ease',
                                    }}
                                >
                                    <Td>{user.nombre}</Td>
                                    <Td>{status.habilitado ? <FaCheck style={{color:'rgb(20, 165, 76)'}}/>:(<FaCheck style={{color:'rgb(155, 9, 9)'}}/>)}</Td>
                                    <Td>{status.activo ? <FaCheck style={{color:'rgb(20, 165, 76)'}}/>:(<FaCheck style={{color:'rgb(155, 9, 9)'}}/>)}</Td>
                                </Tr>
                            ))
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
                    <Text_Pagination>Página {currentPage} de {totalPagesStatus}</Text_Pagination>
                    {currentPage === totalPagesStatus || totalPagesStatus === 0 ? (
                        <Button_Block_Pagination><GrNext/></Button_Block_Pagination>
                    ):(
                        <Tooltip title='Siguiente página' placement="top">
                            <Button_Blue_Pagination onClick={nextPageStatus}><GrNext/></Button_Blue_Pagination>
                        </Tooltip>
                    )} 
                </Container_Table_Pagination>
            </Container_Option_Navbar>
        </>
    );
}