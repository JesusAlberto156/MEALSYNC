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
import { TableActionsStatus } from "../../../hooks/users/Tables"
import { ResetTextFieldsStatus,ResetTextFieldsUser,ResetTextFieldsPermissions } from "../../../hooks/users/Texts"
//__________IMAGENES__________
import User_Enable from '../../imgs/User-Enable.png';
import User_Disable from '../../imgs/User-Disable.png';
//__________IMAGENES__________
//__________ICONOS__________
// Iconos utilizados en las tablas
import { FaSortAlphaDown } from "react-icons/fa";
import { FaSortAlphaDownAlt } from "react-icons/fa";
import { FaLongArrowAltUp } from "react-icons/fa";
import { FaLongArrowAltDown } from "react-icons/fa";
import { CgArrowsV } from "react-icons/cg"
// Iconos de la paginación
import { GrNext,GrPrevious } from "react-icons/gr";
//__________ICONOS__________
// Estilos personalizados
import { Table_Container_Auto,Table,Table_Head_Thead_Blue,Table_Head_Th,Table_Container_Item_Center,Table_Container_Pagination,Table_Container_Data,Table_Image_Black, Table_Body_Tbody_White, Table_Body_Td } from "../../styled/Tables"
import { Button_Icon_Blue_220 } from "../../styled/Buttons";
import { Text_Background_Green_12,Text_Background_Red_12,Text_Fade_Title_32_Black,Text_Span_16_Center_Black } from "../../styled/Text";
import { Icon_20,Icon_Button_White_16 } from "../../styled/Icons";
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
            <Table_Container_Auto>
                <Table id="Table-Status">
                    <Table_Head_Thead_Blue>
                        <tr>
                            <Table_Head_Th>
                                <Table_Container_Item_Center>
                                    <Icon_Button_White_16 onClick={() => {
                                            ToggleOrder('Nombre')
                                            ToggleOrderDirection()
                                        }}
                                    >
                                        {isSelectedOptionOrderDirection === 'Asc' && isSelectedOptionOrder === 'Nombre' ? <FaSortAlphaDown/> : isSelectedOptionOrderDirection === 'Desc' && isSelectedOptionOrder === 'Nombre' ? <FaSortAlphaDownAlt/> : <CgArrowsV/>} Usuario (nombre completo)
                                    </Icon_Button_White_16>
                                </Table_Container_Item_Center>
                            </Table_Head_Th>
                            <Table_Head_Th>
                                <Table_Container_Item_Center>
                                    <Icon_Button_White_16 onClick={() => {
                                            ToggleOrder('Habilitado')
                                            ToggleOrderDirection()
                                        }}
                                    >
                                        {isSelectedOptionOrderDirection === 'Asc' && isSelectedOptionOrder === 'Habilitado' ? <FaLongArrowAltUp/> : isSelectedOptionOrderDirection === 'Desc' && isSelectedOptionOrder === 'Habilitado' ? <FaLongArrowAltDown/> : <CgArrowsV/>} Habilitado
                                    </Icon_Button_White_16>
                                </Table_Container_Item_Center>
                            </Table_Head_Th>
                        </tr>
                    </Table_Head_Thead_Blue>
                    <Table_Body_Tbody_White>
                        {currentRecordsStatus.map((status) => (
                            <tr
                                key={status.idestatus}
                                onClick={() => handleRowClick(status)}
                                style={{
                                    backgroundColor: isSelectedRow === status ? 'rgba(88, 88, 84, 0.8)' : 'transparent',
                                    cursor: 'pointer',
                                    transition: 'background-color 1s ease',
                                }}
                            >
                                <Table_Body_Td><Table_Container_Item_Center>{status.activo ? <Text_Background_Green_12 style={{border: isSelectedRow === status ? '2px solid white' : ''}}>{isUsers.find((user) => user.idusuario === status.idusuario)?.nombre || 'Desconocido'}</Text_Background_Green_12>:<Text_Background_Red_12  style={{border: isSelectedRow === status ? '2px solid white' : ''}}>{isUsers.find((user) => user.idusuario === status.idusuario)?.nombre || 'Desconocido'}</Text_Background_Red_12>}</Table_Container_Item_Center></Table_Body_Td>
                                <Table_Body_Td><Table_Container_Item_Center><Table_Image_Black src={status.habilitado ? User_Enable : User_Disable} style={{border: isSelectedRow === status ? '2px solid white' : ''}}/></Table_Container_Item_Center></Table_Body_Td>
                            </tr>
                        ))}
                    </Table_Body_Tbody_White>
                </Table>
            </Table_Container_Auto>
            {currentRecordsStatus.length !== 0 ? (
                <>
                    <Table_Container_Pagination>
                        <Tooltip title='Página anterior' placement="top">
                            <span>
                                <Button_Icon_Blue_220
                                    disabled={currentPage === 1}
                                    onClick={() => prevPage}
                                >
                                    <Icon_20><GrPrevious/></Icon_20>
                                </Button_Icon_Blue_220>
                            </span>
                        </Tooltip>
                        <Text_Span_16_Center_Black>Página {currentPage} de {totalPagesStatus}</Text_Span_16_Center_Black>
                        <Tooltip title='Página siguiente' placement="top">
                            <span>
                                <Button_Icon_Blue_220
                                    disabled={currentPage === totalPagesStatus || totalPagesStatus === 0}
                                    onClick={() => nextPageStatus}
                                >
                                    <Icon_20><GrNext/></Icon_20>
                                </Button_Icon_Blue_220>
                            </span>
                        </Tooltip>
                    </Table_Container_Pagination>
                </>
            ):(
                <>
                    <Table_Container_Data>
                        <Text_Fade_Title_32_Black>¡No hay datos disponibles!</Text_Fade_Title_32_Black>
                    </Table_Container_Data>
                </>
            )}
        </>
    );
}