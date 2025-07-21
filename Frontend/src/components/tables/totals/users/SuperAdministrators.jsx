//____________IMPORT/EXPORT____________
// Hooks personalizados
import { TableActionsPermissions } from "../../../../hooks/users/Tables"
//__________ICONOS__________
// Iconos utilizados en las tablas
import { FaUserTie } from "react-icons/fa"
//__________ICONOS__________
// Estilos personalizados
import { Table_Container_Icon_Center,Table,Table_Head_Thead_Blue,Table_Head_Th,Table_Body_Tbody_White,Table_Body_Td } from "../../../styled/Tables"
import { Icon_Blue_16 } from "../../../styled/Icons"
//____________IMPORT/EXPORT____________

// Tabla de los usuarios totales que cuentan con el permiso de super administrador
export default function Table_Permissions_Super_Administrators(){
    // Constantes con la funcionalidad de los hooks
    const { filteredRecordsPermissions } = TableActionsPermissions();
    // Estructura del componente
    return(
        <>
                <Table id="Table-Super-Administrators">
                    <Table_Head_Thead_Blue>
                        <tr>
                            <Table_Head_Th>
                                Super Administradores
                            </Table_Head_Th>
                        </tr>
                    </Table_Head_Thead_Blue>
                    <Table_Body_Tbody_White>
                        <tr>
                            <Table_Body_Td><Table_Container_Icon_Center>{filteredRecordsPermissions.filter(item => item.superadministrador).length}<Icon_Blue_16><FaUserTie/></Icon_Blue_16></Table_Container_Icon_Center></Table_Body_Td>
                        </tr>
                    </Table_Body_Tbody_White>
                </Table>
        </>
    );
}