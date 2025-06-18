//____________IMPORT/EXPORT____________
// Hooks de React
import { useContext,useEffect } from "react"
// Componentes de React externos
import { Tooltip } from "@mui/material"
// Contextos
import { SelectedRowContext,SelectedOptionOrderDirectionContext,SelectedOptionOrderContext,SelectedOptionOrderPlusContext } from "../../../contexts/SelectedesProvider"
import { ThemeModeContext } from "../../../contexts/ViewsProvider"
import { SupplyOrderObservationsContext } from "../../../contexts/WarehouseProvider"
import { TextFieldsSupplyOrderObservationContext,TextFieldsSupplyOrderContext } from "../../../contexts/FormsProvider"
import { RefSupplyOrdersContext } from "../../../contexts/RefsProvider"
import { SuppliesContext } from "../../../contexts/SuppliersProvider"
// Hooks personalizados
import { ResetTextFieldsUser } from "../../../hooks/users/Texts"
import { ResetTextFieldsSupplyOrder,ResetTextFieldsSupplyOrderObservation } from "../../../hooks/warehouse/Texts"
import { TableActionsSupplyOrders } from "../../../hooks/warehouse/Tables"
import { Dates } from "../../../hooks/Dates"
//__________ICONOS__________
// Iconos de las tablas
import { FaSortAlphaDown } from "react-icons/fa";
import { FaSortAlphaDownAlt } from "react-icons/fa";
import { FaLongArrowAltUp } from "react-icons/fa";
import { FaLongArrowAltDown } from "react-icons/fa";
import { MdOutlineAttachMoney } from "react-icons/md";
// Iconos de la paginación
import { GrNext,GrPrevious } from "react-icons/gr";
//__________ICONOS__________
// Estilos personalizados
import { Container_Row_90_Center } from "../../styled/Containers";
import { Table,Thead,Th,Tbody,Td,TContainer_Center } from "../../styled/Tables";
import { Button_Icon_Blue_180 } from "../../styled/Buttons";
import { Text_A_16_Center,Text_Fade_A_30_Center,Text_Background_Blue_12_Center,Text_Background_Green_12_Center,Text_Background_Yellow_12_Center } from "../../styled/Text";
import { Icon_White_18,Icon_Button_Black_14 } from "../../styled/Icons";
//____________IMPORT/EXPORT____________

// Tabla de los usuarios
export default function Table_Purchases(){
    // Constantes con el valor de los contextos
    const [themeMode] = useContext(ThemeModeContext);
    const [isSelectedRow,setIsSelectedRow] = useContext(SelectedRowContext);
    const {Modal_Suppy_Orders,Form_Supply_Orders,Button_Edit_Supply_Orders,Button_Edit_State_Supply_Orders,Button_Add_Supply_Order_Observations,Button_View_Supply_Order_Observations,Button_Delete_Supply_Orders} = useContext(RefSupplyOrdersContext);
    const [isTextFieldsSupplyOrder,setIsTextFieldsSupplyOrder] = useContext(TextFieldsSupplyOrderContext);
    const [isTextFieldsSupplyOrderObservation,setIsTextFieldsSupplyOrderObservation] = useContext(TextFieldsSupplyOrderObservationContext);
    const [isSupplyOrderObservations] = useContext(SupplyOrderObservationsContext);
    const [isSelectedOptionOrderDirection] = useContext(SelectedOptionOrderDirectionContext);
    const [isSelectedOptionOrder] = useContext(SelectedOptionOrderContext);
    const [isSupplies] = useContext(SuppliesContext);
    const [isSelectedOptionOrderPlus] = useContext(SelectedOptionOrderPlusContext);
    // UseEffect que determina la selección de la tabla
    useEffect(() => {
        const handleClickOutside = (event) => {
            const table = document.getElementById("Table-Supply-Orders");
    
            const isClickInsideTable = table && table.contains(event.target);
            const isClickInsideModal = Modal_Suppy_Orders?.current?.contains(event.target);
            const isClickInsideForm = Form_Supply_Orders?.current?.contains(event.target);
            const isClickInsideEdit = Button_Edit_Supply_Orders?.current?.contains(event.target);
            const isClickInsideEditState = Button_Edit_State_Supply_Orders?.current?.contains(event.target);
            const isClickInsideAdd = Button_Add_Supply_Order_Observations?.current?.contains(event.target);
            const isClickInsideView = Button_View_Supply_Order_Observations?.current?.contains(event.target);
            const isClickInsideDelete = Button_Delete_Supply_Orders?.current?.contains(event.target);

            if (!isClickInsideTable && !isClickInsideModal && !isClickInsideForm && !isClickInsideEdit && !isClickInsideEditState && !isClickInsideAdd && !isClickInsideView && !isClickInsideDelete) {
                setIsSelectedRow(null);
            }
        };
    
        document.addEventListener("click", handleClickOutside);
        return () => document.removeEventListener("click", handleClickOutside);
    },[Modal_Suppy_Orders,Form_Supply_Orders,Button_Edit_Supply_Orders,Button_Edit_State_Supply_Orders,Button_Add_Supply_Order_Observations,Button_View_Supply_Order_Observations,Button_Delete_Supply_Orders]);
    // UseEfect para pasar el valor del renglon seleccionado a los input
    useEffect(() => {
        if(isSelectedRow !== null){
            const observacionesFiltradas = isSupplyOrderObservations
            .filter(observation => observation.idpedido === isSelectedRow.idpedido)
            .flatMap(item =>
                (item.observaciones || []).map(o => ({ 
                    idobservacion: o.idobservacion,
                    fechaA: o.fecha,
                    observacion: o.observacion,
                    categoria: o.categoria, 
                }))
            );

            setIsTextFieldsSupplyOrder(prev => ({
                ...prev,
                numeroPedido: isSelectedRow.numeropedido,
                fechaA: isSelectedRow.fecha,
                insumos: [{
                    idpedido: isSelectedRow.idpedido,
                    idinsumo: isSelectedRow.idinsumo,
                    cantidad: isSelectedRow.idcantidad,
                    precioUnitario: isSelectedRow.preciounitario,
                    precioTotal: isSelectedRow.preciototal,
                    estado: isSelectedRow.estado, 
                }]
            }));
            setIsTextFieldsSupplyOrderObservation(prev => ({
                ...prev,
                idpedido: isSelectedRow.idpedido,
                numeroPedido: isSelectedRow.numeropedido,
                observaciones: observacionesFiltradas.length > 0
                    ? observacionesFiltradas
                    : [{ 
                        idobservacion: 0,
                        fechaA: '',
                        observacion: '',
                        categoria: '', 
                    }]
            }));
        }else{
            resetTextFieldsSupplyOrder();
            resetTextFieldsSupplyOrderObservation();
            resetTextFieldsUser();
        }
    },[isSelectedRow])
    // Constantes con la funcionalidad de los hooks
    const { handleRowClick,nextPageSupplyOrders,prevPage,currentRecordsSupplyOrders,currentPage,totalPagesSupplyOrders,ToggleOrder,ToggleOrderDirection } = TableActionsSupplyOrders();
    const resetTextFieldsSupplyOrder = ResetTextFieldsSupplyOrder();
    const resetTextFieldsSupplyOrderObservation = ResetTextFieldsSupplyOrderObservation();
    const resetTextFieldsUser = ResetTextFieldsUser();
    const { getDate } = Dates();
    // Estructura del componente
    return(
        <>
            <Table id="Table-Supply-Orders">
                <Thead ThemeMode={themeMode}>
                    <tr>
                        <Th>
                            <TContainer_Center>
                                {isSelectedOptionOrderPlus === 'Categorías' ? (
                                    <>
                                        <Icon_Button_Black_14 onClick={() => {
                                                ToggleOrder('Categorías')
                                                ToggleOrderDirection()
                                            }}
                                        >
                                            {isSelectedOptionOrderDirection === 'Asc' && isSelectedOptionOrder === 'Categorías' ? <FaSortAlphaDown/> : <FaSortAlphaDownAlt/>} Categoría
                                        </Icon_Button_Black_14>
                                    </>
                                ):(
                                    <>
                                        {isSelectedOptionOrderPlus === 'Tipos de Insumo' ? (
                                            <>
                                                <Icon_Button_Black_14 onClick={() => {
                                                        ToggleOrder('Tipos de Insumo')
                                                        ToggleOrderDirection()
                                                    }}
                                                >
                                                    {isSelectedOptionOrderDirection === 'Asc' && isSelectedOptionOrder === 'Tipos de Insumo' ? <FaSortAlphaDown/> : <FaSortAlphaDownAlt/>} Tipo de Insumo
                                                </Icon_Button_Black_14>
                                            </>
                                        ):(
                                            <>Desconocido</>
                                        )}
                                    </>
                                )}
                            </TContainer_Center>
                        </Th>
                        <Th>
                            <TContainer_Center>
                                <Icon_Button_Black_14 onClick={() => {
                                        ToggleOrder('Fecha')
                                        ToggleOrderDirection()
                                    }}
                                >
                                    {isSelectedOptionOrderDirection === 'Asc' && isSelectedOptionOrder === 'Fecha' ? <FaLongArrowAltUp/> : <FaLongArrowAltDown/>} Fecha
                                </Icon_Button_Black_14>
                            </TContainer_Center>
                        </Th>
                        <Th>
                            <TContainer_Center>
                                <Icon_Button_Black_14 onClick={() => {
                                        ToggleOrder('Cantidad')
                                        ToggleOrderDirection()
                                    }}
                                >
                                    {isSelectedOptionOrderDirection === 'Asc' && isSelectedOptionOrder === 'Cantidad' ? <FaLongArrowAltUp/> : <FaLongArrowAltDown/>} Cantidad (kg/Lt)
                                </Icon_Button_Black_14>
                            </TContainer_Center>
                        </Th>
                        <Th>
                            <TContainer_Center>
                                <Icon_Button_Black_14 onClick={() => {
                                        ToggleOrder('Total')
                                        ToggleOrderDirection()
                                    }}
                                >
                                    {isSelectedOptionOrderDirection === 'Asc' && isSelectedOptionOrder === 'Total' ? <FaLongArrowAltUp/> : <FaLongArrowAltDown/>} Total <MdOutlineAttachMoney/>MXN
                                </Icon_Button_Black_14>
                            </TContainer_Center>
                        </Th>
                    </tr>
                </Thead>
                <Tbody ThemeMode={themeMode}>
                    {currentRecordsSupplyOrders.map((supplyOrder) => (
                        <tr 
                            key={supplyOrder.idpedido}
                            onClick={() => handleRowClick(supplyOrder)}
                            style={{
                                backgroundColor:  isSelectedRow === supplyOrder ? 'rgba(255, 255, 255, 0.7)' : 'transparent',
                                cursor: 'pointer',
                                transition: 'background-color 0.5s ease',
                            }}
                        >
                            <Td ThemeMode={themeMode}>{supplyOrder.numeropedido}</Td>
                            <Td ThemeMode={themeMode}>{() => getDate(supplyOrder.fecha)}</Td>
                            <Td ThemeMode={themeMode}>{isSupplies.find(supply => supply.idinsumo === supplyOrder.idinsumo)?.nombre || 'Desconocido'}</Td>
                            <Td ThemeMode={themeMode}>{supplyOrder.cantidad}</Td>
                            <Td ThemeMode={themeMode}>{supplyOrder.preciounitario}</Td>
                            <Td ThemeMode={themeMode}>{supplyOrder.preciototal}</Td>
                            <Td ThemeMode={themeMode}>{supplyOrder.estado === 'En curso' ? <TContainer_Center><Text_Background_Blue_12_Center>{supplyOrder.estado}</Text_Background_Blue_12_Center></TContainer_Center>:<TContainer_Center><Text_Background_Green_12_Center>{supplyOrder.estado}</Text_Background_Green_12_Center></TContainer_Center>}</Td>
                        </tr>
                    ))}
                </Tbody>
            </Table>
            {currentRecordsSupplyOrders.length !== 0 ? (
                <>
                    <Container_Row_90_Center>
                        <Tooltip title='Página anterior' placement="top">
                            <Button_Icon_Blue_180 ThemeMode={themeMode} className={currentPage === 1 ? 'roll-out-button-left' : 'roll-in-button-left'}
                                onClick={prevPage}>
                                <Icon_White_18><GrPrevious/></Icon_White_18>
                            </Button_Icon_Blue_180>
                        </Tooltip>
                        <Text_A_16_Center ThemeMode={themeMode}>Página {currentPage} de {totalPagesSupplyOrders}</Text_A_16_Center>
                        <Tooltip title='Página siguiente' placement="top">
                            <Button_Icon_Blue_180 ThemeMode={themeMode} className={currentPage === totalPagesSupplyOrders || totalPagesSupplyOrders === 0 ? 'roll-out-button-left' : 'roll-in-button-left'}
                                onClick={nextPageSupplyOrders}>
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