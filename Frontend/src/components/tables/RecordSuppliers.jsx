//____________IMPORT/EXPORT____________
// Hooks de React
import { useContext,useEffect } from "react"
// Componentes de React externos
import { Tooltip } from "@mui/material"
// Contextos
import { selectedRowContext } from "../../contexts/VariablesProvider"
import { usersContext } from "../../contexts/UsersProvider"
import { refFormStatusContext,refButtonStatusContext } from '../../contexts/RefsProvider'
import { themeModeContext } from "../../contexts/ViewsProvider"
// Hooks personalizados
import { useTableActions } from "../../hooks/Table"
//__________ICONOS__________
// Iconos utilizados en las tablas
import { FaUserLock } from "react-icons/fa";
import { FaUserClock } from "react-icons/fa6";
// Iconos de la paginación
import { GrNext,GrPrevious } from "react-icons/gr";
//__________ICONOS__________
// Estilos personalizados
import { Container_90_Center } from "../styled/Containers"
import { Table,Tr,Th,Td } from "../styled/Tables"
import { Button_Icon_Block_150,Button_Icon_Blue_150 } from "../styled/Buttons"
import { Text_Span_16 } from "../styled/Text";
import { Icon_Green_16,Icon_Red_16 } from "../styled/Icons"
//____________IMPORT/EXPORT____________

// Tabla de los estatus de usuarios
export default function Table_Record_Suppliers(){
    // Constantes con el valor de los contextos
    const [themeMode] = useContext(themeModeContext);
    const [isSelectedRow,setIsSelectedRow] = useContext(selectedRowContext);
    const [isUsers] = useContext(usersContext);
    const {Modal,Form} = useContext(refFormStatusContext);
    const isButtonS = useContext(refButtonStatusContext);
    // UseEffect que determina la selección de la tabla
    useEffect(() => {
        const handleClickOutside = (event) => {
            const table = document.getElementById("Table-Status");

            const clickedInsideModal = Modal.current && Modal.current.contains(event.target);
            const clickedInsideForm = Form.current && Form.current.contains(event.target);
            const clickedInsideButton = isButtonS.current && isButtonS.current.contains(event.target);

            if (table && !table.contains(event.target) &&
                !clickedInsideButton && 
                !clickedInsideModal &&
                !clickedInsideForm
            ) {
                setIsSelectedRow(null);
            }
        };
    
        document.addEventListener("click", handleClickOutside);

        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, [Modal,Form,isButtonS]);
    // Constantes con la funcionalidad de los hooks
    const {handleRowClick, nextPageStatus, prevPage, currentRecordsStatus, currentPage, totalPagesStatus} = useTableActions();
    // Estructura del componente
    return(
        <>
            <Table id="Table-Status">
                <thead>
                    <Tr>
                        <Th ThemeMode={themeMode}>Proveedor</Th>
                        <Th ThemeMode={themeMode}>Insumo</Th>
                        <Th ThemeMode={themeMode}>Precio</Th>
                        <Th ThemeMode={themeMode}>Fecha</Th>
                    </Tr>
                </thead>
                <tbody>

                </tbody>
            </Table>
        </>
    );
}