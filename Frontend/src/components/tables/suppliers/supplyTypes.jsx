//____________IMPORT/EXPORT____________
// Hooks de React
import { useContext,useEffect } from "react"
// Componentes de React externos
import { Tooltip } from "@mui/material"
// Contextos
import { SelectedRowContext,SelectedOptionOrderDirectionContext,SelectedOptionOrderContext } from "../../../contexts/SelectedesProvider"
import { TextFieldsSupplyTypesContext } from "../../../contexts/FormsProvider"
import { RefSupplyTypesContext } from "../../../contexts/RefsProvider"
import { CountSupplyTypesContext,SupplyCategoriesContext } from "../../../contexts/SuppliersProvider"
// Hooks personalizados
import { ResetTextFieldsUser } from "../../../hooks/users/Texts"
import { ResetTextFieldsSupplyType } from "../../../hooks/suppliers/Texts"
import { TableActionsSupplyTypes } from "../../../hooks/suppliers/Tables"
//__________ICONOS__________
// Iconos de las tablas
import { FaSortAlphaDown } from "react-icons/fa";
import { FaSortAlphaDownAlt } from "react-icons/fa";
import { FaSortNumericUp } from "react-icons/fa";
import { FaSortNumericUpAlt } from "react-icons/fa";
import { CgArrowsV } from "react-icons/cg";
// Iconos de la paginación
import { GrNext,GrPrevious } from "react-icons/gr";
//__________ICONOS__________
// Estilos personalizados
import { Table_Container,Table,Table_Head_Thead_Blue,Table_Head_Th,Table_Body_Tbody_White,Table_Body_Td,Table_Container_Item_Center,Table_Container_Pagination,Table_Container_Data } from "../../styled/Tables"
import { Button_Icon_Blue_200 } from "../../styled/Buttons";
import { Text_Fade_Title_32_Black,Text_Span_16_Center_Black,Text_Span_16_Center_White } from "../../styled/Text";
import { Icon_20,Icon_Button_White_16 } from "../../styled/Icons";
//____________IMPORT/EXPORT____________

// Tabla de los usuarios
export default function Table_Supply_Types(){
    // Constantes con el valor de los contextos
    const [isSelectedRow,setIsSelectedRow] = useContext(SelectedRowContext);
    const {Modal_Supply_Types,Form_Supply_Types,Button_Edit_Supply_Types,Button_Add_Supply_Types,Button_Delete_Supply_Types,Button_Count_Supply_Types} = useContext(RefSupplyTypesContext);
    const [isTextFieldsSupplyType,setIsTextFieldsSupplyType] = useContext(TextFieldsSupplyTypesContext);
    const [isSelectedOptionOrderDirection] = useContext(SelectedOptionOrderDirectionContext);
    const [isSelectedOptionOrder] = useContext(SelectedOptionOrderContext);
    const [isCountSupplyTypes] = useContext(CountSupplyTypesContext);
    const [isSupplyCategories] = useContext(SupplyCategoriesContext); 
    // UseEffect que determina la selección de la tabla
    useEffect(() => {
        const handleClickOutside = (event) => {
            const table = document.getElementById("Table-Supply-Types");
    
            const isClickInsideTable = table && table.contains(event.target);
            const isClickInsideModal = Modal_Supply_Types?.current?.contains(event.target);
            const isClickInsideForm = Form_Supply_Types?.current?.contains(event.target);
            const isClickInsideEdit = Button_Edit_Supply_Types?.current?.contains(event.target);
            const isClickInsideAdd = Button_Add_Supply_Types?.current?.contains(event.target);
            const isClickInsideDelete = Button_Delete_Supply_Types?.current?.contains(event.target);
            const isClickInsideDetail = Button_Count_Supply_Types?.current?.contains(event.target);

            if (!isClickInsideTable && !isClickInsideModal && !isClickInsideForm && !isClickInsideEdit && !isClickInsideAdd && !isClickInsideDelete && !isClickInsideDetail) {
                setIsSelectedRow(null);
            }
        };
    
        document.addEventListener("click", handleClickOutside);
        return () => document.removeEventListener("click", handleClickOutside);
    },[Modal_Supply_Types,Form_Supply_Types,Button_Edit_Supply_Types,Button_Add_Supply_Types,Button_Delete_Supply_Types,Button_Count_Supply_Types]);
    // UseEfect para pasar el valor del renglon seleccionado a los input
    useEffect(() => {
        if(isSelectedRow !== null){
            const cantidadesFiltradas = isCountSupplyTypes.filter(count => count.idtipo === isSelectedRow.idtipo).map(count => ({ cantidad: count.cantidad}))
            setIsTextFieldsSupplyType(prev => ({
            ...prev,
                idtipo: isSelectedRow.idtipo,
                tipo: isSelectedRow.tipo,
                descripcion: isSelectedRow.descripcion,
                unidad: isSelectedRow.unidad,
                idcategoria: isSelectedRow.idcategoria,
                limite: isSelectedRow.limite,
                cantidades: cantidadesFiltradas.length > 0
                    ? cantidadesFiltradas
                    : [{ cantidad: 0 }]
            }));
        }else{
            resetTextFieldsSupplyType();
            resetTextFieldsUser();
        }
    },[isSelectedRow])
    // Constantes con la funcionalidad de los hooks
    const { handleRowClick,nextPageSupplyTypes,prevPage,currentRecordsSupplyTypes,currentPage,totalPagesSupplyTypes,ToggleOrder,ToggleOrderDirection } = TableActionsSupplyTypes();
    const resetTextFieldsSupplyType = ResetTextFieldsSupplyType();
    const resetTextFieldsUser = ResetTextFieldsUser();
    // Estructura del componente
    return(
        <>
            <Table_Container>
                <Table id="Table-Supply-Types">
                    <Table_Head_Thead_Blue>
                        <tr>
                            <Table_Head_Th>
                                <Table_Container_Item_Center>
                                    <Icon_Button_White_16 
                                        onClick={() => {
                                            ToggleOrder('Tipo')
                                            ToggleOrderDirection()
                                        }}
                                    >
                                        {isSelectedOptionOrderDirection === 'Asc' && isSelectedOptionOrder === 'Tipo' ? <FaSortAlphaDown/> : isSelectedOptionOrderDirection === 'Desc' && isSelectedOptionOrder === 'Tipo' ? <FaSortAlphaDownAlt/> : <CgArrowsV/>} Nombre
                                    </Icon_Button_White_16>
                                </Table_Container_Item_Center>
                            </Table_Head_Th>
                            <Table_Head_Th><Text_Span_16_Center_White>Descripción</Text_Span_16_Center_White></Table_Head_Th>
                            <Table_Head_Th>
                                <Table_Container_Item_Center>
                                    <Icon_Button_White_16 
                                        onClick={() => {
                                            ToggleOrder('Unidad')
                                            ToggleOrderDirection()
                                        }}
                                    >
                                        {isSelectedOptionOrderDirection === 'Asc' && isSelectedOptionOrder === 'Unidad' ? <FaSortAlphaDown/> : isSelectedOptionOrderDirection === 'Desc' && isSelectedOptionOrder === 'Unidad' ? <FaSortAlphaDownAlt/> : <CgArrowsV/>} Unidad
                                    </Icon_Button_White_16>
                                </Table_Container_Item_Center>
                            </Table_Head_Th>
                            <Table_Head_Th>
                                <Table_Container_Item_Center>
                                    <Icon_Button_White_16 
                                        onClick={() => {
                                            ToggleOrder('Categoría')
                                            ToggleOrderDirection()
                                        }}
                                    >
                                        {isSelectedOptionOrderDirection === 'Asc' && isSelectedOptionOrder === 'Categoría' ? <FaSortAlphaDown/> : isSelectedOptionOrderDirection === 'Desc' && isSelectedOptionOrder === 'Categoría' ? <FaSortAlphaDownAlt/> : <CgArrowsV/>} Categoría
                                    </Icon_Button_White_16>
                                </Table_Container_Item_Center>
                            </Table_Head_Th>
                            <Table_Head_Th>
                                <Table_Container_Item_Center>
                                    <Icon_Button_White_16 
                                        onClick={() => {
                                            ToggleOrder('Cantidad Mínima')
                                            ToggleOrderDirection()
                                        }}
                                    >
                                        {isSelectedOptionOrderDirection === 'Asc' && isSelectedOptionOrder === 'Cantidad Mínima' ? <FaSortNumericUp/> : isSelectedOptionOrderDirection === 'Desc' && isSelectedOptionOrder === 'Cantidad Mínima' ? <FaSortNumericUpAlt/> : <CgArrowsV/>} Cantidad Mínima (Kg/Lt)
                                    </Icon_Button_White_16>
                                </Table_Container_Item_Center>
                            </Table_Head_Th>
                        </tr>
                    </Table_Head_Thead_Blue>
                    <Table_Body_Tbody_White>
                        {currentRecordsSupplyTypes.map((type) => (
                            <tr 
                                key={type.idtipo}
                                onClick={() => handleRowClick(type)}
                                style={{
                                    backgroundColor: isSelectedRow === type ? 'rgba(88, 88, 84, 0.8)' : 'transparent',
                                    cursor: 'pointer',
                                    transition: 'background-color 1s ease',
                                }}
                            >
                                <Table_Body_Td style={{ color: isSelectedRow === type ? 'white' : ''}}>{type.tipo || 'Desconocido...'}</Table_Body_Td>
                                <Table_Body_Td style={{ color: isSelectedRow === type ? 'white' : ''}}>{type.descripcion || 'Desconocida...'}</Table_Body_Td>
                                <Table_Body_Td style={{ color: isSelectedRow === type ? 'white' : ''}}>{type.unidad || 'Desconocida...'}</Table_Body_Td>
                                <Table_Body_Td style={{ color: isSelectedRow === type ? 'white' : ''}}>{isSupplyCategories.find(category => category.idcategoria === type.idcategoria)?.nombre || 'Desconocida...'}</Table_Body_Td>
                                <Table_Body_Td style={{ color: isSelectedRow === type ? 'white' : ''}}>{type.limite || 'Desconocido...'}</Table_Body_Td>
                            </tr>
                        ))}
                    </Table_Body_Tbody_White>
                </Table>
            </Table_Container>
            {currentRecordsSupplyTypes.length !== 0 ? (
                <>
                    <Table_Container_Pagination>
                        <Tooltip title='Página anterior' placement="top">
                            <span>
                                <Button_Icon_Blue_200
                                    disabled={currentPage === 1}
                                    onClick={() => prevPage()}
                                >
                                    <Icon_20><GrPrevious/></Icon_20>
                                </Button_Icon_Blue_200>
                            </span>
                        </Tooltip>
                        <Text_Span_16_Center_Black>Página {currentPage} de {totalPagesSupplyTypes}</Text_Span_16_Center_Black>
                        <Tooltip title='Página siguiente' placement="top">
                            <span>
                                <Button_Icon_Blue_200
                                    disabled={currentPage === totalPagesSupplyTypes || totalPagesSupplyTypes === 0}
                                    onClick={() => nextPageSupplyTypes()}
                                >
                                    <Icon_20><GrNext/></Icon_20>
                                </Button_Icon_Blue_200>
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