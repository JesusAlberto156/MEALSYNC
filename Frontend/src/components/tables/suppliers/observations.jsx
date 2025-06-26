//____________IMPORT/EXPORT____________
// Hooks de React
import { useContext,useEffect } from "react"
// Componentes de React externos
import { Tooltip } from "@mui/material"
// Contextos
import { SelectedRowContext,SelectedOptionOrderDirectionContext,SelectedOptionOrderContext } from "../../../contexts/SelectedesProvider"
import { ThemeModeContext } from "../../../contexts/ViewsProvider"
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
import { Container_Row_90_Center } from "../../styled/Containers";
import { Table,Thead,Th,Tbody,Td,TContainer_Center } from "../../styled/Tables";
import { Button_Icon_Blue_180 } from "../../styled/Buttons";
import { Text_A_16_Center,Text_Fade_A_30_Center,Text_Background_Blue_12_Center,Text_Background_Red_12_Center,Text_Background_Orange_12_Center,Text_Background_Yellow_12_Center,Text_Background_Lime_Green_12_Center,Text_Background_Green_12_Center } from "../../styled/Text";
import { Icon_White_18,Icon_Button_Black_14 } from "../../styled/Icons";
//____________IMPORT/EXPORT____________

// Tabla de los usuarios
export default function Table_Supplier_Observations(){
    // Constantes con el valor de los contextos
    const [themeMode] = useContext(ThemeModeContext);
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
            <Table id="Table-Supplier-Observations">
                <Thead ThemeMode={themeMode}>
                    <tr>
                        <Th>
                            <TContainer_Center>
                                <Icon_Button_Black_14 onClick={() => {
                                        ToggleOrder('Proveedor')
                                        ToggleOrderDirection()
                                    }}
                                >
                                    {isSelectedOptionOrderDirection === 'Asc' && isSelectedOptionOrder === 'Proveedor' ? <FaSortAlphaDown/> : isSelectedOptionOrderDirection === 'Desc' && isSelectedOptionOrder === 'Proveedor' ? <FaSortAlphaDownAlt/> : <CgArrowsV/>} Proveedor
                                </Icon_Button_Black_14>
                            </TContainer_Center>
                        </Th>
                        <Th>
                            <TContainer_Center>
                                <Icon_Button_Black_14 onClick={() => {
                                        ToggleOrder('Fecha')
                                        ToggleOrderDirection()
                                    }}
                                >
                                    {isSelectedOptionOrderDirection === 'Asc' && isSelectedOptionOrder === 'Fecha' ? <FaLongArrowAltUp/> : isSelectedOptionOrderDirection === 'Desc' && isSelectedOptionOrder === 'Fecha' ? <FaLongArrowAltDown/> : <CgArrowsV/>} Fecha
                                </Icon_Button_Black_14>
                            </TContainer_Center>
                        </Th>
                        <Th>
                            <TContainer_Center>
                                <Icon_Button_Black_14 onClick={() => {
                                        ToggleOrder('Calificación')
                                        ToggleOrderDirection()
                                    }}
                                >
                                    {isSelectedOptionOrderDirection === 'Asc' && isSelectedOptionOrder === 'Calificación' ? <FaSortNumericUp/> : isSelectedOptionOrderDirection === 'Desc' && isSelectedOptionOrder === 'Calificación' ? <FaSortNumericUpAlt/> : <CgArrowsV/>} Calificación
                                </Icon_Button_Black_14>
                            </TContainer_Center>
                        </Th>
                    </tr>
                </Thead>
                <Tbody ThemeMode={themeMode}>
                    {currentRecordsObservations.map((observation) => (
                        <tr 
                            key={observation.idobservacion}
                            onClick={() => handleRowClick(observation)}
                            style={{
                                backgroundColor:  isSelectedRow === observation ? 'rgba(255, 255, 255, 0.7)' : 'transparent',
                                cursor: 'pointer',
                                transition: 'background-color 0.5s ease',
                            }}
                        >
                            <Td ThemeMode={themeMode}>
                                {observation.calificacion === 0 ? (
                                    <>
                                        <TContainer_Center><Text_Background_Blue_12_Center ThemeMode={themeMode}>{isSuppliers.find(supplier => supplier.idproveedor === observation.idproveedor)?.nombre || 'Desconocido...'}</Text_Background_Blue_12_Center></TContainer_Center>
                                    </>
                                ):(
                                    observation.calificacion <= 1 ? (
                                        <>
                                            <TContainer_Center><Text_Background_Red_12_Center ThemeMode={themeMode}>{isSuppliers.find(supplier => supplier.idproveedor === observation.idproveedor)?.nombre || 'Desconocido...'}</Text_Background_Red_12_Center></TContainer_Center>
                                        </>
                                    ):(
                                        observation.calificacion <= 2 ? (
                                            <>
                                                <TContainer_Center><Text_Background_Orange_12_Center ThemeMode={themeMode}>{isSuppliers.find(supplier => supplier.idproveedor === observation.idproveedor)?.nombre || 'Desconocido...'}</Text_Background_Orange_12_Center></TContainer_Center>
                                            </>
                                        ):(
                                            observation.calificacion <= 3 ? (
                                                <>
                                                    <TContainer_Center><Text_Background_Yellow_12_Center ThemeMode={themeMode}>{isSuppliers.find(supplier => supplier.idproveedor === observation.idproveedor)?.nombre || 'Desconocido...'}</Text_Background_Yellow_12_Center></TContainer_Center>
                                                </>
                                            ):(
                                                observation.calificacion <= 4 ? (
                                                    <>
                                                        <TContainer_Center><Text_Background_Lime_Green_12_Center ThemeMode={themeMode}>{isSuppliers.find(supplier => supplier.idproveedor === observation.idproveedor)?.nombre || 'Desconocido...'}</Text_Background_Lime_Green_12_Center></TContainer_Center>
                                                    </>
                                                ):(
                                                    observation.calificacion <= 5 ? (
                                                        <>
                                                            <TContainer_Center><Text_Background_Green_12_Center ThemeMode={themeMode}>{isSuppliers.find(supplier => supplier.idproveedor === observation.idproveedor)?.nombre || 'Desconocido...'}</Text_Background_Green_12_Center></TContainer_Center>
                                                        </>
                                                    ):(
                                                        <></>
                                                    )
                                                )
                                            )
                                        )
                                    )
                                )}
                            </Td>
                            <Td ThemeMode={themeMode}>{getDate(observation.fecha) || 'Desconocida...'}</Td>
                            <Td ThemeMode={themeMode}>{observation.calificacion || 'Desconocida...'}</Td>
                        </tr>
                    ))}
                </Tbody>
            </Table>
            {currentRecordsObservations.length !== 0 ? (
                <>
                    <Container_Row_90_Center>
                        <Tooltip title='Página anterior' placement="top">
                            <Button_Icon_Blue_180 ThemeMode={themeMode} className={currentPage === 1 ? 'roll-out-button-left' : 'roll-in-button-left'}
                                onClick={prevPage}>
                                <Icon_White_18><GrPrevious/></Icon_White_18>
                            </Button_Icon_Blue_180>
                        </Tooltip>
                        <Text_A_16_Center ThemeMode={themeMode}>Página {currentPage} de {totalPagesObservations}</Text_A_16_Center>
                        <Tooltip title='Página siguiente' placement="top">
                            <Button_Icon_Blue_180 ThemeMode={themeMode} className={currentPage === totalPagesObservations || totalPagesObservations === 0 ? 'roll-out-button-left' : 'roll-in-button-left'}
                                onClick={nextPageObservations}>
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