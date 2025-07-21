//____________IMPORT/EXPORT____________
// Hooks personalizados
import { TableActionsPermissions } from "../../../../hooks/users/Tables"
// Estilos personalizados
import { Table,Table_Head_Thead_Blue,Table_Head_Th,Table_Body_Tbody_White,Table_Body_Td } from "../../../styled/Tables"
//____________IMPORT/EXPORT____________

// Tabla de los usuarios totales que cuentan con los permisos del area de cocina
export default function Table_Permissions_Kitchen(){
    // Constantes con la funcionalidad de los hooks
    const { filteredRecordsPermissions } = TableActionsPermissions();
    // Estructura del componente
    return(
        <>
                <Table id="Table-Kitchen">
                    <Table_Head_Thead_Blue>
                        <tr>
                            <Table_Head_Th>
                                Cocineros
                            </Table_Head_Th>
                            <Table_Head_Th>
                                Nutriólogos
                            </Table_Head_Th>
                            <Table_Head_Th>
                                Médicos
                            </Table_Head_Th>
                        </tr>
                    </Table_Head_Thead_Blue>
                    <Table_Body_Tbody_White>
                        <tr>
                            <Table_Body_Td>{filteredRecordsPermissions.filter(item => item.cocinero).length}</Table_Body_Td>
                            <Table_Body_Td>{filteredRecordsPermissions.filter(item => item.nutriologo).length}</Table_Body_Td>
                            <Table_Body_Td>{filteredRecordsPermissions.filter(item => item.medico).length}</Table_Body_Td>
                        </tr>
                    </Table_Body_Tbody_White>
                </Table>
        </>
    );
}