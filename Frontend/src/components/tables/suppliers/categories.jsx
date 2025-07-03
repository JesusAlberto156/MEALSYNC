//____________IMPORT/EXPORT____________
// Hooks de React
import { useContext,useEffect } from "react"
// Componentes de React externos
import { Tooltip } from "@mui/material"
// Contextos
import { SelectedRowContext,SelectedOptionOrderDirectionContext,SelectedOptionOrderContext } from "../../../contexts/SelectedesProvider"
import { TextFieldsSupplyCategoryContext } from "../../../contexts/FormsProvider"
import { RefSupplyCategoriesContext } from "../../../contexts/RefsProvider"
// Hooks personalizados
import { ResetTextFieldsUser } from "../../../hooks/users/Texts"
import { ResetTextFieldsSupplyCategory } from "../../../hooks/suppliers/Texts"
import { TableActionsSupplyCategories } from "../../../hooks/suppliers/Tables"
//__________ICONOS__________
// Iconos de las tablas
import { FaSortAlphaDown } from "react-icons/fa";
import { FaSortAlphaDownAlt } from "react-icons/fa";
import { CgArrowsV } from "react-icons/cg";
// Iconos de la paginación
import { GrNext,GrPrevious } from "react-icons/gr";
//__________ICONOS__________
// Estilos personalizados
import { Table_Container_Auto,Table,Table_Head_Thead_Blue,Table_Head_Th,Table_Body_Tbody_White,Table_Body_Td,Table_Container_Item_Center,Table_Container_Pagination,Table_Container_Data } from "../../styled/Tables";
import { Button_Icon_Blue_220 } from "../../styled/Buttons";
import { Text_Fade_Title_32_Black,Text_Span_16_Center_Black,Text_Span_16_Center_White } from "../../styled/Text";
import { Icon_20,Icon_Button_White_16 } from "../../styled/Icons";
//____________IMPORT/EXPORT____________

// Tabla de los usuarios
export default function Table_Supply_Categories(){
    // Constantes con el valor de los contextos
    const [isSelectedRow,setIsSelectedRow] = useContext(SelectedRowContext);
    const {Modal_Supply_Categories,Form_Supply_Categories,Button_Edit_Supply_Categories,Button_Delete_Supply_Categories} = useContext(RefSupplyCategoriesContext);
    const [isTextFieldsSupplyCategory,setIsTextFieldsSupplyCategory] = useContext(TextFieldsSupplyCategoryContext);
    const [isSelectedOptionOrderDirection] = useContext(SelectedOptionOrderDirectionContext);
    const [isSelectedOptionOrder] = useContext(SelectedOptionOrderContext);
    // UseEffect que determina la selección de la tabla
    useEffect(() => {
        const handleClickOutside = (event) => {
            const table = document.getElementById("Table-Supply-Categories");
    
            const isClickInsideTable = table && table.contains(event.target);
            const isClickInsideModal = Modal_Supply_Categories?.current?.contains(event.target);
            const isClickInsideForm = Form_Supply_Categories?.current?.contains(event.target);
            const isClickInsideEdit = Button_Edit_Supply_Categories?.current?.contains(event.target);
            const isClickInsideDelete = Button_Delete_Supply_Categories?.current?.contains(event.target);

            if (!isClickInsideTable && !isClickInsideModal && !isClickInsideForm && !isClickInsideEdit && !isClickInsideDelete) {
                setIsSelectedRow(null);
            }
        };
    
        document.addEventListener("click", handleClickOutside);
        return () => document.removeEventListener("click", handleClickOutside);
    },[Modal_Supply_Categories,Form_Supply_Categories,Button_Edit_Supply_Categories,Button_Delete_Supply_Categories]);
    // UseEfect para pasar el valor del renglon seleccionado a los input
    useEffect(() => {
        if(isSelectedRow !== null){
            setIsTextFieldsSupplyCategory(prev => ({
                ...prev,
                idcategoria: isSelectedRow.idcategoria,
                nombre: isSelectedRow.nombre,
                descripcion: isSelectedRow.descripcion,
            }))
        }else{
            resetTextFieldsSupplyCategory();
            resetTextFieldsUser();
        }
    },[isSelectedRow])
    // Constantes con la funcionalidad de los hooks
    const { handleRowClick,nextPageSupplyCategories,prevPage,currentRecordsSupplyCategories,currentPage,totalPagesSupplyCategories,ToggleOrder,ToggleOrderDirection } = TableActionsSupplyCategories();
    const resetTextFieldsSupplyCategory = ResetTextFieldsSupplyCategory();
    const resetTextFieldsUser = ResetTextFieldsUser();
    // Estructura del componente
    return(
        <>
            <Table_Container_Auto>
                <Table id="Table-Supply-Categories">
                    <Table_Head_Thead_Blue>
                        <tr>
                            <Table_Head_Th>
                                <Table_Container_Item_Center>
                                    <Icon_Button_White_16 
                                        onClick={() => {
                                            ToggleOrder('Nombre')
                                            ToggleOrderDirection()
                                        }}
                                    >
                                        {isSelectedOptionOrderDirection === 'Asc' && isSelectedOptionOrder === 'Nombre' ? <FaSortAlphaDown/> : isSelectedOptionOrderDirection === 'Desc' && isSelectedOptionOrder === 'Nombre' ? <FaSortAlphaDownAlt/> : <CgArrowsV/>} Nombre
                                    </Icon_Button_White_16>
                                </Table_Container_Item_Center>
                            </Table_Head_Th>
                            <Table_Head_Th><Text_Span_16_Center_White>Descripción</Text_Span_16_Center_White></Table_Head_Th>
                        </tr>
                    </Table_Head_Thead_Blue>
                    <Table_Body_Tbody_White>
                        {currentRecordsSupplyCategories.map((category) => (
                            <tr 
                                key={category.idcategoria}
                                onClick={() => handleRowClick(category)}
                                style={{
                                    backgroundColor: isSelectedRow === category ? 'rgba(88, 88, 84, 0.8)' : 'transparent',
                                    cursor: 'pointer',
                                    transition: 'background-color 1s ease',
                                }}
                            >
                                <Table_Body_Td style={{ color: isSelectedRow === category ? 'white' : ''}}>{category.nombre || 'Desconocido...'}</Table_Body_Td>
                                <Table_Body_Td style={{ color: isSelectedRow === category ? 'white' : ''}}>{category.descripcion || 'Desconocida...'}</Table_Body_Td>
                            </tr>
                        ))}
                    </Table_Body_Tbody_White>
                </Table>
            </Table_Container_Auto>
            {currentRecordsSupplyCategories.length !== 0 ? (
                <>
                    <Table_Container_Pagination>
                        <Tooltip title='Página anterior' placement="top">
                            <span>
                                <Button_Icon_Blue_220
                                    disabled={currentPage === 1}
                                    onClick={() => prevPage()}
                                >
                                    <Icon_20><GrPrevious/></Icon_20>
                                </Button_Icon_Blue_220>
                            </span>
                        </Tooltip>
                        <Text_Span_16_Center_Black>Página {currentPage} de {totalPagesSupplyCategories}</Text_Span_16_Center_Black>
                        <Tooltip title='Página siguiente' placement="top">
                            <span>
                                <Button_Icon_Blue_220
                                    disabled={currentPage === totalPagesSupplyCategories || totalPagesSupplyCategories === 0}
                                    onClick={() => nextPageSupplyCategories()}
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