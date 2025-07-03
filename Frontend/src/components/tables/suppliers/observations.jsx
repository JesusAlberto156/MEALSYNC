//____________IMPORT/EXPORT____________
// Hooks de React
import { useContext,useEffect } from "react"
// Componentes de React externos
import { Tooltip } from "@mui/material"
// Contextos
import { SelectedRowContext,SelectedOptionOrderDirectionContext,SelectedOptionOrderContext } from "../../../contexts/SelectedesProvider"
import { TextFieldsObservationContext } from "../../../contexts/FormsProvider"
import { RefSupplierObservationsContext } from "../../../contexts/RefsProvider"
import { SuppliersContext } from "../../../contexts/SuppliersProvider"
// Hooks personalizados
import { ResetTextFieldsObservation } from "../../../hooks/suppliers/Texts"
import { TableActionsObservations } from "../../../hooks/suppliers/Tables"
import { Dates } from "../../../hooks/Dates"
//__________ICONOS__________
// Iconos de las tablas
import { FaSortAlphaDown } from "react-icons/fa";
import { FaSortAlphaDownAlt } from "react-icons/fa";
import { FaLongArrowAltUp } from "react-icons/fa";
import { FaLongArrowAltDown } from "react-icons/fa";
import { FaSortNumericUp } from "react-icons/fa";
import { FaSortNumericUpAlt } from "react-icons/fa";
import { CgArrowsV } from "react-icons/cg";
// Iconos de la paginación
import { GrNext,GrPrevious } from "react-icons/gr";
//__________ICONOS__________
// Estilos personalizados
import { Table_Container_Auto,Table,Table_Head_Thead_Blue,Table_Head_Th,Table_Body_Tbody_White,Table_Body_Td,Table_Container_Pagination,Table_Container_Item_Center,Table_Container_Data } from "../../styled/Tables"
import { Button_Icon_Blue_220 } from "../../styled/Buttons";
import { Text_Span_16_Center_Black,Text_Fade_Title_32_Black,Text_Background_Green_12,Text_Background_Lime_Green_12,Text_Background_Yellow_12,Text_Background_Orange_12,Text_Background_Red_12,Text_Background_Blue_12 } from "../../styled/Text";
import { Icon_20,Icon_Button_White_16 } from "../../styled/Icons";
//____________IMPORT/EXPORT____________

// Tabla de los usuarios
export default function Table_Supplier_Observations(){
    // Constantes con el valor de los contextos
    const [isSelectedRow,setIsSelectedRow] = useContext(SelectedRowContext);
    const {Modal_Supplier_Observations,Form_Supplier_Observations,Button_Detail_Supplier_Observations} = useContext(RefSupplierObservationsContext);
    const [isTextFieldsObservation,setIsTextFieldsObservation] = useContext(TextFieldsObservationContext);
    const [isSelectedOptionOrderDirection] = useContext(SelectedOptionOrderDirectionContext);
    const [isSelectedOptionOrder] = useContext(SelectedOptionOrderContext);
    const [isSuppliers] = useContext(SuppliersContext);
    // UseEffect que determina la selección de la tabla
    useEffect(() => {
        const handleClickOutside = (event) => {
            const table = document.getElementById("Table-Supplier-Observations");
    
            const isClickInsideTable = table && table.contains(event.target);
            const isClickInsideModal = Modal_Supplier_Observations?.current?.contains(event.target);
            const isClickInsideForm = Form_Supplier_Observations?.current?.contains(event.target);
            const isClickInsideDetail = Button_Detail_Supplier_Observations?.current?.contains(event.target);
    
            if (!isClickInsideTable && !isClickInsideModal && !isClickInsideForm && !isClickInsideDetail) {
                setIsSelectedRow(null);
            }
        };
    
        document.addEventListener("click", handleClickOutside);
        return () => document.removeEventListener("click", handleClickOutside);
    },[Modal_Supplier_Observations,Form_Supplier_Observations,Button_Detail_Supplier_Observations]);
    // UseEfect para pasar el valor del renglon seleccionado a los input
    useEffect(() => {
        if(isSelectedRow !== null){
            setIsTextFieldsObservation(prev => ({
                ...prev,
                idobservacion: isSelectedRow.idobservacion,
                observacion: isSelectedRow.observacion,
                calificacion: isSelectedRow.calificacion,
                fecha: isSelectedRow.fecha,
                idproveedor: isSelectedRow.idproveedor,
            }))
        }else{
            resetTextFieldsObservation();
        }
    },[isSelectedRow])
    // Constantes con la funcionalidad de los hooks
    const { handleRowClick,nextPageObservations,prevPage,currentRecordsObservations,currentPage,totalPagesObservations,ToggleOrder,ToggleOrderDirection } = TableActionsObservations();
    const { getDate } = Dates();
    const resetTextFieldsObservation = ResetTextFieldsObservation();
    // Estructura del componente
    return(
        <>
            <Table_Container_Auto>
                <Table id="Table-Supplier-Observations">
                    <Table_Head_Thead_Blue>
                        <tr>
                            <Table_Head_Th>
                                <Table_Container_Item_Center>
                                    <Icon_Button_White_16 
                                        onClick={() => {
                                            ToggleOrder('Proveedor')
                                            ToggleOrderDirection()
                                        }}
                                    >
                                        {isSelectedOptionOrderDirection === 'Asc' && isSelectedOptionOrder === 'Proveedor' ? <FaSortAlphaDown/> : isSelectedOptionOrderDirection === 'Desc' && isSelectedOptionOrder === 'Proveedor' ? <FaSortAlphaDownAlt/> : <CgArrowsV/>} Proveedor
                                    </Icon_Button_White_16>
                                </Table_Container_Item_Center>
                            </Table_Head_Th>
                            <Table_Head_Th>
                                <Table_Container_Item_Center>
                                    <Icon_Button_White_16 
                                        onClick={() => {
                                            ToggleOrder('Fecha')
                                            ToggleOrderDirection()
                                        }}
                                    >
                                        {isSelectedOptionOrderDirection === 'Asc' && isSelectedOptionOrder === 'Fecha' ? <FaLongArrowAltUp/> : isSelectedOptionOrderDirection === 'Desc' && isSelectedOptionOrder === 'Fecha' ? <FaLongArrowAltDown/> : <CgArrowsV/>} Fecha
                                    </Icon_Button_White_16>
                                </Table_Container_Item_Center>
                            </Table_Head_Th>
                            <Table_Head_Th>
                                <Table_Container_Item_Center>
                                    <Icon_Button_White_16 
                                        onClick={() => {
                                            ToggleOrder('Calificación')
                                            ToggleOrderDirection()
                                        }}
                                    >
                                        {isSelectedOptionOrderDirection === 'Asc' && isSelectedOptionOrder === 'Calificación' ? <FaSortNumericUp/> : isSelectedOptionOrderDirection === 'Desc' && isSelectedOptionOrder === 'Calificación' ? <FaSortNumericUpAlt/> : <CgArrowsV/>} Calificación
                                    </Icon_Button_White_16>
                                </Table_Container_Item_Center>
                            </Table_Head_Th>
                        </tr>
                    </Table_Head_Thead_Blue>
                    <Table_Body_Tbody_White>
                        {currentRecordsObservations.map((observation) => (
                            <tr 
                                key={observation.idobservacion}
                                onClick={() => handleRowClick(observation)}
                                style={{
                                    backgroundColor: isSelectedRow === observation ? 'rgba(88, 88, 84, 0.8)' : 'transparent',
                                    cursor: 'pointer',
                                    transition: 'background-color 1s ease',
                                }}
                            >
                                <Table_Body_Td>
                                    {observation.calificacion === 0 ? (
                                        <>
                                            <Table_Container_Item_Center><Text_Background_Blue_12 style={{ border: isSelectedRow === observation ? '2px solid white' : ''}}>{isSuppliers.find(supplier => supplier.idproveedor === observation.idproveedor)?.nombre || 'Desconocido...'}</Text_Background_Blue_12></Table_Container_Item_Center>
                                        </>
                                    ):(
                                        observation.calificacion <= 1 ? (
                                            <>
                                                <Table_Container_Item_Center><Text_Background_Red_12 style={{ border: isSelectedRow === observation ? '2px solid white' : ''}}>{isSuppliers.find(supplier => supplier.idproveedor === observation.idproveedor)?.nombre || 'Desconocido...'}</Text_Background_Red_12></Table_Container_Item_Center>
                                            </>
                                        ):(
                                            observation.calificacion <= 2 ? (
                                                <>
                                                    <Table_Container_Item_Center><Text_Background_Orange_12 style={{ border: isSelectedRow === observation ? '2px solid white' : ''}}>{isSuppliers.find(supplier => supplier.idproveedor === observation.idproveedor)?.nombre || 'Desconocido...'}</Text_Background_Orange_12></Table_Container_Item_Center>
                                                </>
                                            ):(
                                                observation.calificacion <= 3 ? (
                                                    <>
                                                        <Table_Container_Item_Center><Text_Background_Yellow_12 style={{ border: isSelectedRow === observation ? '2px solid white' : ''}}>{isSuppliers.find(supplier => supplier.idproveedor === observation.idproveedor)?.nombre || 'Desconocido...'}</Text_Background_Yellow_12></Table_Container_Item_Center>
                                                    </>
                                                ):(
                                                    observation.calificacion <= 4 ? (
                                                        <>
                                                            <Table_Container_Item_Center><Text_Background_Lime_Green_12 style={{ border: isSelectedRow === observation ? '2px solid white' : ''}}>{isSuppliers.find(supplier => supplier.idproveedor === observation.idproveedor)?.nombre || 'Desconocido...'}</Text_Background_Lime_Green_12></Table_Container_Item_Center>
                                                        </>
                                                    ):(
                                                        observation.calificacion <= 5 ? (
                                                            <>
                                                                <Table_Container_Item_Center><Text_Background_Green_12 style={{ border: isSelectedRow === observation ? '2px solid white' : ''}}>{isSuppliers.find(supplier => supplier.idproveedor === observation.idproveedor)?.nombre || 'Desconocido...'}</Text_Background_Green_12></Table_Container_Item_Center>
                                                            </>
                                                        ):(
                                                            <></>
                                                        )
                                                    )
                                                )
                                            )
                                        )
                                    )}
                                </Table_Body_Td>
                                <Table_Body_Td style={{ color: isSelectedRow === observation ? 'white' : ''}}>{getDate(observation.fecha) || 'Desconocida...'}</Table_Body_Td>
                                <Table_Body_Td style={{ color: isSelectedRow === observation ? 'white' : ''}}>{observation.calificacion || 'Desconocida...'}</Table_Body_Td>
                            </tr>
                        ))}
                    </Table_Body_Tbody_White>
                </Table>
            </Table_Container_Auto>
            {currentRecordsObservations.length !== 0 ? (
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
                        <Text_Span_16_Center_Black>Página {currentPage} de {totalPagesObservations}</Text_Span_16_Center_Black>
                        <Tooltip title='Página siguiente' placement="top">
                            <span>
                                <Button_Icon_Blue_220
                                    disabled={currentPage === totalPagesObservations || totalPagesObservations === 0}
                                    onClick={() => nextPageObservations()}
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