//____________IMPORT/EXPORT____________
// Hooks de React
import { useContext,useEffect } from "react"
// Componentes de React externos
import { Tooltip } from "@mui/material"
// Contextos
import { SelectedRowContext } from "../../../contexts/VariablesProvider"
import { UsersContext } from "../../../contexts/UsersProvider"
import { ThemeModeContext } from "../../../contexts/ViewsProvider"
import { RefStatusContext } from "../../../contexts/RefsProvider"
import { TextFieldsStatusContext } from "../../../contexts/FormsProvider"
// Hooks personalizados
import { TableActionsStatus } from "../../../hooks/Table"
import { ResetTextFieldsStatus } from "../../../hooks/Texts"
//__________ICONOS__________
// Iconos utilizados en las tablas
import { FaLockOpen } from "react-icons/fa";
import { FaLock } from "react-icons/fa";
// Iconos de la paginación
import { GrNext,GrPrevious } from "react-icons/gr";
//__________ICONOS__________
// Estilos personalizados
import { Container_Row_90_Center } from "../../styled/Containers";
import { Table,Thead,Th,Tbody,Td } from "../../styled/Tables";
import { Button_Icon_Blue_180 } from "../../styled/Buttons";
import { Text_A_16_Center } from "../../styled/Text";
import { Icon_Green_18,Icon_Red_18,Icon_White_18 } from "../../styled/Icons";
//____________IMPORT/EXPORT____________

// Tabla de los estatus de usuarios
export default function Table_Status(){
    // Constantes con el valor de los contextos
    const [themeMode] = useContext(ThemeModeContext);
    const [isSelectedRow,setIsSelectedRow] = useContext(SelectedRowContext);
    const [isUsers] = useContext(UsersContext);
    const {Modal,Form,Button_Enable_S} = useContext(RefStatusContext);
    const [isTextFieldsStatus,setIsTextFieldsStatus] = useContext(TextFieldsStatusContext);
    // UseEffect que determina la selección de la tabla
    useEffect(() => {
        const handleClickOutside = (event) => {
            const table = document.getElementById("Table-Status");

            const isClickInsideTable = table && table.contains(event.target);
            const isClickInsideModal = Modal?.current?.contains(event.target);
            const isClickInsideForm = Form?.current?.contains(event.target);
            const isClickInsideEnable = Button_Enable_S?.current?.contains(event.target);

            if (!isClickInsideTable && !isClickInsideModal && !isClickInsideForm && !isClickInsideEnable) {
                setIsSelectedRow(null);
            }
        };
    
        document.addEventListener("click", handleClickOutside);

        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    },[Modal,Form,Button_Enable_S]);
    // UseEffect que pasa el valor a un check con la selección de la tabla
    useEffect(() => {
        if(isSelectedRow !== null){
            setIsTextFieldsStatus(prev => ({
                ...prev,
                iduser: isSelectedRow.idusuario,
                user: isUsers.find(user => user.idusuario === isSelectedRow.idusuario)?.usuario || 'Desconocido',
                status: isSelectedRow.habilitado ? 'Habilitado' : 'Deshabilitado',
            }));

        }else{
            resetTextFieldsStatus();
        }
    },[isSelectedRow])
    // Constantes con la funcionalidad de los hooks
    const resetTextFieldsStatus = ResetTextFieldsStatus();
    const {handleRowClick, nextPageStatus, prevPage, currentRecordsStatus, currentPage, totalPagesStatus} = TableActionsStatus();
    // Estructura del componente
    return(
        <>
            <Table id="Table-Status">
                <Thead ThemeMode={themeMode}>
                    <tr>
                        <Th>Usuario (nombre completo)</Th>
                        <Th>Habilitado</Th>
                    </tr>
                </Thead>
                <Tbody ThemeMode={themeMode}>
                    {isUsers.map((user) => (
                        currentRecordsStatus.filter((permission) => user.idusuario === permission.idusuario).map((status) => (
                            <tr
                                key={status.idestatus}
                                onClick={() => handleRowClick(status)}
                                style={{
                                    backgroundColor: isSelectedRow === status ? 'rgba(255, 255, 255, 0.7)' : 'transparent',
                                    cursor: 'pointer',
                                    transition: 'background-color 0.5s ease',
                                }}
                            >
                                <Td ThemeMode={themeMode}>{user.nombre}</Td>
                                <Td ThemeMode={themeMode}>{status.habilitado ? <Icon_Green_18 ThemeMode={themeMode} className="pulsate-icon"><FaLockOpen/></Icon_Green_18> : <Icon_Red_18 ThemeMode={themeMode} className="pulsate-icon"><FaLock/></Icon_Red_18>}</Td>
                            </tr>
                        ))
                    ))}
                </Tbody>
            </Table>
            <Container_Row_90_Center>
                <Tooltip title='Página anterior' placement="top">
                    <Button_Icon_Blue_180 ThemeMode={themeMode} className={currentPage === 1 ? 'roll-out-button-left' : 'roll-in-button-left'}
                        onClick={prevPage}>
                        <Icon_White_18><GrPrevious/></Icon_White_18>
                    </Button_Icon_Blue_180>
                </Tooltip>
                <Text_A_16_Center ThemeMode={themeMode}>Página {currentPage} de {totalPagesStatus}</Text_A_16_Center>
                <Tooltip title='Página siguiente' placement="top">
                    <Button_Icon_Blue_180 ThemeMode={themeMode} className={currentPage === totalPagesStatus || totalPagesStatus === 0 ? 'roll-out-button-left' : 'roll-in-button-left'}
                        onClick={nextPageStatus}>
                        <Icon_White_18><GrNext/></Icon_White_18>
                    </Button_Icon_Blue_180>
                </Tooltip>
            </Container_Row_90_Center>
        </>
    );
}