//____________IMPORT/EXPORT____________
// Hooks de React
import { useContext } from "react"
// Contextos
import { ThemeModeContext } from "../../../../contexts/ViewsProvider"
// Hooks personalizados
import { TableActionsPermissions } from "../../../../hooks/users/Tables"
//__________ICONOS__________
// Iconos utilizados en las tablas
import { FaShieldAlt } from "react-icons/fa"
//__________ICONOS__________
// Estilos personalizados
import { Table,Td,Th,Tbody_White,Thead,TContainer_Icon } from "../../../styled/Tables"
import { Icon_Blue_18 } from "../../../styled/Icons"
//____________IMPORT/EXPORT____________

// Tabla de los usuarios totales que cuentan con el permiso de administrador
export default function Table_Permissions_Administrators(){
    // Constantes con el valor de los contextos
    const [themeMode] = useContext(ThemeModeContext);
    // Constantes con la funcionalidad de los hooks
    const { filteredRecordsPermissions } = TableActionsPermissions();
    // Estructura del componente
    return(
        <>
            <Table id="Table-Administrators">
                <Thead ThemeMode={themeMode}>
                    <tr>
                        <Th>
                            Administradores
                        </Th>
                    </tr>
                </Thead>
                <Tbody_White ThemeMode={themeMode}>
                    <tr>
                        <Td ThemeMode={themeMode}><TContainer_Icon>{filteredRecordsPermissions.filter(item => item.administrador).length}<Icon_Blue_18 ThemeMode={themeMode}><FaShieldAlt/></Icon_Blue_18></TContainer_Icon></Td>
                    </tr>
                </Tbody_White>
            </Table>
        </>
    );
}