//____________IMPORT/EXPORT____________
// Hooks de React
import { useContext,useEffect } from "react"
// Componentes de React externos
import { Tooltip } from "@mui/material"
// Contextos
import { SelectedRowContext,SelectedOptionOrderContext,SelectedOptionOrderDirectionContext } from "../../../contexts/SelectedesProvider"
import { UsersContext } from "../../../contexts/UsersProvider"
import { ThemeModeContext } from "../../../contexts/ViewsProvider"
import { RefStatusContext } from "../../../contexts/RefsProvider"
import { TextFieldsStatusContext } from "../../../contexts/FormsProvider"
// Hooks personalizados
import { TableActionsStatus } from "../../../hooks/Table"
import { ResetTextFieldsStatus,ResetTextFieldsUser,ResetTextFieldsPermissions } from "../../../hooks/Texts"
//__________ICONOS__________
// Iconos utilizados en las tablas
import { FaLockOpen } from "react-icons/fa";
import { FaLock } from "react-icons/fa";
import { FaSortAlphaDown } from "react-icons/fa";
import { FaSortAlphaDownAlt } from "react-icons/fa";
import { FaLongArrowAltUp } from "react-icons/fa";
import { FaLongArrowAltDown } from "react-icons/fa";
// Iconos de la paginación
import { GrNext,GrPrevious } from "react-icons/gr";
//__________ICONOS__________
// Estilos personalizados
import { Container_Row_90_Center } from "../../styled/Containers";
import { Table,Thead,Th,Tbody,Td,TContainer_Center } from "../../styled/Tables";
import { Button_Icon_Blue_180 } from "../../styled/Buttons";
import { Text_A_16_Center,Text_Fade_A_30_Center,Text_Background_Red_12_Center,Text_Background_Green_12_Center } from "../../styled/Text";
import { Icon_Green_18,Icon_Red_18,Icon_White_18,Icon_Button_Black_14 } from "../../styled/Icons";
//____________IMPORT/EXPORT____________

// Tabla de los estatus de usuarios
export default function Table_Status(){
    // Constantes con el valor de los contextos
    const [themeMode] = useContext(ThemeModeContext);
    const [isSelectedRow,setIsSelectedRow] = useContext(SelectedRowContext);
    const [isUsers] = useContext(UsersContext);
    const {Modal_Status,Form_Status,Button_Enable_Status} = useContext(RefStatusContext);
    const [isTextFieldsStatus,setIsTextFieldsStatus] = useContext(TextFieldsStatusContext);
    const [isSelectedOptionOrder] = useContext(SelectedOptionOrderContext);
    const [isSelectedOptionOrderDirection] = useContext(SelectedOptionOrderDirectionContext);
    // UseEffect que determina la selección de la tabla
    useEffect(() => {
        const handleClickOutside = (event) => {
            const table = document.getElementById("Table-Status");

            const isClickInsideTable = table && table.contains(event.target);
            const isClickInsideModal = Modal_Status?.current?.contains(event.target);
            const isClickInsideForm = Form_Status?.current?.contains(event.target);
            const isClickInsideEnable = Button_Enable_Status?.current?.contains(event.target);

            if (!isClickInsideTable && !isClickInsideModal && !isClickInsideForm && !isClickInsideEnable) {
                setIsSelectedRow(null);
            }
        };
    
        document.addEventListener("click", handleClickOutside);

        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    },[Modal_Status,Form_Status,Button_Enable_Status]);
    // UseEffect que pasa el valor a un check con la selección de la tabla
    useEffect(() => {
        if(isSelectedRow !== null){
            setIsTextFieldsStatus(prev => ({
                ...prev,
                idusuario: isSelectedRow.idusuario,
                usuario: isUsers.find(user => user.idusuario === isSelectedRow.idusuario)?.usuario || 'Desconocido',
                idestatus: isSelectedRow.idestatus,
                estatus: isSelectedRow.habilitado ? 'Habilitado' : 'Deshabilitado',
            }));

        }else{
            resetTextFieldsUser();
            resetTextFieldsPermissions();
            resetTextFieldsStatus();
        }
    },[isSelectedRow])
    // Constantes con la funcionalidad de los hooks
    const resetTextFieldsUser = ResetTextFieldsUser();
    const resetTextFieldsPermissions = ResetTextFieldsPermissions();
    const resetTextFieldsStatus = ResetTextFieldsStatus();
    const {handleRowClick, nextPageStatus, prevPage, currentRecordsStatus, currentPage, totalPagesStatus, ToggleOrder, ToggleOrderDirection} = TableActionsStatus();
    // Estructura del componente
    return(
        <>
            <Table id="Table-Status">
                <Thead ThemeMode={themeMode}>
                    <tr>
                        <Th>
                            <TContainer_Center>
                                <Icon_Button_Black_14 onClick={() => {
                                        ToggleOrder('Nombre')
                                        ToggleOrderDirection()
                                    }}
                                >
                                    {isSelectedOptionOrderDirection === 'Asc' && isSelectedOptionOrder === 'Nombre' ? <FaSortAlphaDown/> : <FaSortAlphaDownAlt/>} Usuario (nombre completo)
                                </Icon_Button_Black_14>
                            </TContainer_Center>
                        </Th>
                        <Th>
                            <TContainer_Center>
                                <Icon_Button_Black_14 onClick={() => {
                                        ToggleOrder('Habilitado')
                                        ToggleOrderDirection()
                                    }}
                                >
                                    {isSelectedOptionOrderDirection === 'Asc' && isSelectedOptionOrder === 'Habilitado' ? <FaLongArrowAltUp/> : <FaLongArrowAltDown/>} Habilitado
                                </Icon_Button_Black_14>
                            </TContainer_Center>
                        </Th>
                    </tr>
                </Thead>
                <Tbody ThemeMode={themeMode}>
                    {currentRecordsStatus.map((status) => (
                        <tr
                            key={status.idestatus}
                            onClick={() => handleRowClick(status)}
                            style={{
                                backgroundColor: isSelectedRow === status ? 'rgba(255, 255, 255, 0.7)' : 'transparent',
                                cursor: 'pointer',
                                transition: 'background-color 0.5s ease',
                            }}
                        >
                            <Td ThemeMode={themeMode}><TContainer_Center>{status.activo ? <Text_Background_Green_12_Center ThemeMode={themeMode}>{isUsers.find((user) => user.idusuario === status.idusuario)?.nombre || 'Desconocido'}</Text_Background_Green_12_Center>:<Text_Background_Red_12_Center ThemeMode={themeMode}>{isUsers.find((user) => user.idusuario === status.idusuario)?.nombre || 'Desconocido'}</Text_Background_Red_12_Center>}</TContainer_Center></Td>
                            <Td ThemeMode={themeMode}>{status.habilitado ? <Icon_Green_18 ThemeMode={themeMode} className="pulsate-icon"><FaLockOpen/></Icon_Green_18> : <Icon_Red_18 ThemeMode={themeMode} className="pulsate-icon"><FaLock/></Icon_Red_18>}</Td>
                        </tr>
                    ))}
                </Tbody>
            </Table>
            {currentRecordsStatus.length !== 0 ? (
                <>
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
            ):(
                <>
                    <Container_Row_90_Center>
                        <Text_Fade_A_30_Center ThemeMode={themeMode}>No hay datos disponibles</Text_Fade_A_30_Center>
                    </Container_Row_90_Center>
                </>
            )}
        </>
    );
}