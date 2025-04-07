//____________IMPORT/EXPORT____________
// Hooks de React
import { useContext,useEffect } from "react"
// Componentes de React externos
import { Tooltip } from "@mui/material"
// Contextos
import { selectedRowContext } from "../../contexts/VariablesProvider"
import { usersContext } from "../../contexts/UsersProvider"
import { permissionContext } from "../../contexts/PermissionsProvider"
import { themeModeContext } from "../../contexts/ViewsProvider"
// Hooks personalizados
import { useTableActions } from "../../hooks/Table"
//__________ICONOS__________
// Iconos utilizados en las tablas
import { FaCheck } from "react-icons/fa"
// Iconos de la paginación
import { GrNext,GrPrevious } from "react-icons/gr";
//__________ICONOS__________
// Estilos personalizados
import { Container_Pagination } from "../styled/Containers"
import { Table,Tr,Th,Td } from "../styled/Tables"
import { Button_Icon_Block_150,Button_Icon_Blue_150 } from "../styled/Buttons"
import { Text_Span_16 } from "../styled/Text";
import { Icon_Green_16,Icon_Red_16 } from "../styled/Icons"
//____________IMPORT/EXPORT____________

// Tabla de los permisos de usuarios
export default function TablePermissions(){
    // Constantes con el valor de los contextos
    const [themeMode] = useContext(themeModeContext);
    const [isSelectedRow,setIsSelectedRow] = useContext(selectedRowContext);
    const [isPermission] = useContext(permissionContext);
    const [isUsers] = useContext(usersContext);
    // UseEffect que determina la selección de la tabla
    useEffect(() => {
        const handleClickOutside = (event) => {
            const table = document.getElementById("Tabla-Permisos");
            const elements = document.querySelectorAll('#Boton-Permisos-Cancelar, #boton-permisos-editar, #boton-permisos-eliminar, #boton-permisos-super-administrador, #Permisos-Editar, #Permisos-Eliminar, #Permisos-Super-Administrador');

            if (table && !table.contains(event.target) &&
            ![...elements].some((btn) => btn.contains(event.target))) {
                setIsSelectedRow(null);
            }
        };
    
        document.addEventListener("click", handleClickOutside);
        return () => document.removeEventListener("click", handleClickOutside);
    }, []);
    // Constantes con la funcionalidad de los hooks
    const {handleRowClick, nextPagePermissions, prevPage, currentRecordsPermissions, currentPage, totalPagesPermissions} = useTableActions();
    // Estructura del componente
    return(
        <>
            <Table ThemeMode={themeMode} id="Tabla-Permisos">
                <thead>
                    <Tr>
                        <Th ThemeMode={themeMode}>Nombre de Usuario</Th>
                        <Th ThemeMode={themeMode}>Administrador</Th>
                        <Th ThemeMode={themeMode}>Chef</Th>
                        <Th ThemeMode={themeMode}>Almacén</Th>
                        <Th ThemeMode={themeMode}>Cocinero</Th>
                        <Th ThemeMode={themeMode}>Nutriologo</Th>
                        <Th ThemeMode={themeMode}>Medico</Th>
                        {isPermission.superadministrador ? (
                            <Th ThemeMode={themeMode}>Super Administrador</Th>
                        ):(
                            <></>
                        )}
                    </Tr>
                </thead>
                <tbody>
                    {isUsers.map((user) => (
                        currentRecordsPermissions.filter((permission) => user.idusuario === permission.idusuario).map((permission) => (
                            <Tr
                                key={permission.idpermiso}
                                onClick={() => handleRowClick(permission)}
                                style={{
                                    backgroundColor: isSelectedRow === permission ? 'rgba(255, 255, 255, 0.7)' : 'transparent',
                                    cursor: 'pointer',
                                    transition: 'background-color 0.5s ease',
                                }}
                            >
                                <Td ThemeMode={themeMode}>{user.nombre}</Td>
                                <Td ThemeMode={themeMode}>{permission.administrador ? <FaCheck style={{color:'rgb(20, 165, 76)'}}/>:(<FaCheck style={{color:'rgb(155, 9, 9)'}}/>)}</Td>
                                <Td ThemeMode={themeMode}>{permission.chef ? <FaCheck style={{color:'rgb(20, 165, 76)'}}/>:(<FaCheck style={{color:'rgb(155, 9, 9)'}}/>)}</Td>
                                <Td ThemeMode={themeMode}>{permission.almacen ? <FaCheck style={{color:'rgb(20, 165, 76)'}}/>:(<FaCheck style={{color:'rgb(155, 9, 9)'}}/>)}</Td>
                                <Td ThemeMode={themeMode}>{permission.cocinero ? <FaCheck style={{color:'rgb(20, 165, 76)'}}/>:(<FaCheck style={{color:'rgb(155, 9, 9)'}}/>)}</Td>
                                <Td ThemeMode={themeMode}>{permission.nutriologo ? <FaCheck style={{color:'rgb(20, 165, 76)'}}/>:(<FaCheck style={{color:'rgb(155, 9, 9)'}}/>)}</Td>
                                <Td ThemeMode={themeMode}>{permission.medico ? <FaCheck style={{color:'rgb(20, 165, 76)'}}/>:(<FaCheck style={{color:'rgb(155, 9, 9)'}}/>)}</Td>
                                {isPermission.superadministrador ? (
                                    <Td ThemeMode={themeMode}>{permission.superadministrador ? <FaCheck style={{color:'rgb(20, 165, 76)'}}/>:(<FaCheck style={{color:'rgb(155, 9, 9)'}}/>)}</Td>
                                ):(
                                    <></>
                                )}
                            </Tr>
                        ))
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
                <Text_Span_16 ThemeMode={themeMode}>Página {currentPage} de {totalPagesPermissions}</Text_Span_16>
                {currentPage === totalPagesPermissions || totalPagesPermissions === 0 ? (
                    <Button_Icon_Block_150 ThemeMode={themeMode}><GrNext/></Button_Icon_Block_150>
                ):(
                    <Tooltip title='Siguiente página' placement="top">
                        <Button_Icon_Blue_150 ThemeMode={themeMode} onClick={nextPagePermissions}><GrNext/></Button_Icon_Blue_150>
                    </Tooltip>
                )} 
            </Container_Pagination>
        </>
    );
}