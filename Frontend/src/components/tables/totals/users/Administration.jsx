//____________IMPORT/EXPORT____________
// Hooks personalizados
import { TableActionsPermissions } from "../../../../hooks/users/Tables"
// Estilos personalizados
import { Table,Table_Head_Thead_Blue,Table_Head_Th,Table_Body_Tbody_White,Table_Body_Td } from "../../../styled/Tables"
//____________IMPORT/EXPORT____________

// Tabla de los usuarios totales que cuentan con los permisos del area de administración
export default function Table_Permissions_Administration(){
    // Constantes con la funcionalidad de los hooks
    const { filteredRecordsPermissions } = TableActionsPermissions();
    // Estructura del componente
    return(
        <>
                <Table id="Table-Administration">
                    <Table_Head_Thead_Blue>
                        <tr>
                            <Table_Head_Th>
                                Administradores
                            </Table_Head_Th>
                            <Table_Head_Th>
                                Chefs
                            </Table_Head_Th>
                            <Table_Head_Th>
                                Almacenistas
                            </Table_Head_Th>
                        </tr>
                    </Table_Head_Thead_Blue>
                    <Table_Body_Tbody_White>
                        <tr>
                            <Table_Body_Td>{filteredRecordsPermissions.filter(item => item.administrador).length}</Table_Body_Td>
                            <Table_Body_Td>{filteredRecordsPermissions.filter(item => item.chef).length}</Table_Body_Td>
                            <Table_Body_Td>{filteredRecordsPermissions.filter(item => item.almacenista).length}</Table_Body_Td>
                        </tr>
                    </Table_Body_Tbody_White>
                </Table>
        </>
    );
}