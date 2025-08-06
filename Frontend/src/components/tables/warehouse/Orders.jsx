//____________IMPORT/EXPORT____________
// Hooks de React
import { useContext,useEffect } from "react"
// Contextos
import { SelectedRowContext } from "../../../contexts/SelectedesProvider"
import { UsersContext } from "../../../contexts/UsersProvider"
import { SuppliersContext } from "../../../contexts/SuppliersProvider"
import { SupplyOrdersContext,CleaningSupplyOrdersContext,MessageSupplyOrdersContext,MessageCleaningSupplyOrdersContext } from "../../../contexts/WarehouseProvider"
import { RefModalContext,RefFormContext,RefButtonVerificationBlueContext,RefButtonEditContext,RefButtonVerificationGreenContext,RefButtonVerificationRedContext,RefButtonDetailContext } from "../../../contexts/RefsProvider"
import { TextFieldsWarehouseOrderContext } from "../../../contexts/FormsProvider"
// Hooks personalizados
import { TableActionsWarehouseOrders } from "../../../hooks/warehouse/Tables"
import { ResetTextFieldsWarehouseOrder } from "../../../hooks/warehouse/Texts"
import { ResetTextFieldsUser } from "../../../hooks/users/Texts"
import { Dates } from "../../../hooks/Dates"
//__________ICONOS__________
import { MdOutlineAttachMoney } from "react-icons/md";
//__________ICONOS__________
// Estilos personalizados
import { Table_Container,Table,Table_Head_Thead_Blue,Table_Container_Item_Center,Table_Body_Tbody_White,Table_Body_Td } from "../../styled/Tables"
import { Text_Background_Green_12,Text_Background_Lime_Green_12,Text_Background_Red_12,Text_Background_Blue_12,Text_Background_Yellow_12 } from "../../styled/Text";
// Componentes personalizados
import { Table_Title_Text,Table_Title_Number, Table_Title_Numeric } from "../Titles"
import { Table_Pagination } from "../Pagination"
//____________IMPORT/EXPORT____________

// Tabla de los estatus de pedidos al almacén
export default function Table_Orders(){
    // Constantes con el valor de los contextos
    const [isSelectedRow,setIsSelectedRow] = useContext(SelectedRowContext);
    const [isUsers] = useContext(UsersContext);
    const [isSuppliers] = useContext(SuppliersContext);
    const isModal = useContext(RefModalContext);
    const isForm = useContext(RefFormContext);
    const isButtonEdit = useContext(RefButtonEditContext);
    const isButtonVerificationGreen = useContext(RefButtonVerificationGreenContext);
    const isButtonVerificationBlue = useContext(RefButtonVerificationBlueContext);
    const isButtonVerificationRed = useContext(RefButtonVerificationRedContext);
    const isButtonDetail = useContext(RefButtonDetailContext);
    const [isSupplyOrders] = useContext(SupplyOrdersContext);
    const [isCleaningSupplyOrders] = useContext(CleaningSupplyOrdersContext); 
    const [isTextFieldsWarehouseOrder,setIsTextFieldsWarehouseOrder] = useContext(TextFieldsWarehouseOrderContext); 
    const [isMessageSupplyOrders] = useContext(MessageSupplyOrdersContext); 
    const [isMessageCleaningSupplyOrders] = useContext(MessageCleaningSupplyOrdersContext); 
    // UseEffect que determina la selección de la tabla
    useEffect(() => {
        const handleClickOutside = (event) => {
            const table = document.getElementById("Table-Warehouse-Orders");

            const isClickInsideTable = table && table.contains(event.target);
            const isClickInsideModal = isModal?.current?.contains(event.target);
            const isClickInsideForm = isForm?.current?.contains(event.target);
            const isClickInsideEdit = isButtonEdit?.current?.contains(event.target);
            const isClickInsideDelete = isButtonVerificationRed?.current?.contains(event.target);
            const isClickInsideVerificationBlue = isButtonVerificationBlue?.current?.contains(event.target);
            const isClickInsideVerificationGreen = isButtonVerificationGreen?.current?.contains(event.target);
            const isClickInsideDetail = isButtonDetail?.current?.contains(event.target);

            if (!isClickInsideTable && !isClickInsideModal && !isClickInsideForm && !isClickInsideEdit && !isClickInsideDelete && !isClickInsideVerificationBlue && !isClickInsideVerificationGreen && !isClickInsideDetail) {
                setIsSelectedRow(null);
            }
        };
    
        document.addEventListener("click", handleClickOutside);

        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    },[isModal,isForm,isButtonEdit,isButtonVerificationBlue,isButtonVerificationRed,isButtonVerificationGreen,isButtonDetail]);
    // UseEffect que pasa el valor a un check con la selección de la tabla
    useEffect(() => {
        if(isSelectedRow !== null){
            const insumosFiltrados = isSupplyOrders.filter(supply => supply.idpedido === isSelectedRow.idpedido)
                                                .map(s => { 
                                                    const mensajesFiltrados = isMessageSupplyOrders
                                                        .filter(m => m.idpedidoindividual === s.idpedidoindividual && m.estado === 'Visible')
                                                        .map(m => ({
                                                            idmensaje: m.idmensaje,
                                                            fecha: getDate(m.fecha),
                                                            mensaje: m.mensaje,
                                                            idpedidoindividual: m.idpedidoindividual,
                                                            tipo: m.tipo,
                                                            estado: m.estado,
                                                        }));
                                                    return {
                                                        idpedidoindividual: s.idpedidoindividual,
                                                        fecha: getDate(s.fecha),
                                                        idinsumo: s.idinsumo,
                                                        cantidad: s.cantidad,
                                                        preciounitario: s.preciounitario,
                                                        preciototal: s.preciototal,
                                                        idpedido: s.idpedido,
                                                        estado: s.estado,
                                                        mensajes: mensajesFiltrados.length > 0
                                                                ? mensajesFiltrados
                                                                : [{
                                                                    idmensaje: 0,
                                                                    fecha: '',
                                                                    mensaje: '',
                                                                    idpedidoindividual: s.idpedidoindividual,
                                                                    tipo: '',
                                                                    estado: '',
                                                                }]
                                                    }
                                                })
            const suministrosFiltrados = isCleaningSupplyOrders.filter(supply => supply.idpedido === isSelectedRow.idpedido)
                                                .map(s => { 
                                                    const mensajesFiltrados = isMessageSupplyOrders
                                                        .filter(m => m.idpedidoindividual === s.idpedidoindividual && m.estado === 'Visible')
                                                        .map(m => ({
                                                            idmensaje: m.idmensaje,
                                                            fecha: getDate(m.fecha),
                                                            mensaje: m.mensaje,
                                                            idpedidoindividual: m.idpedidoindividual,
                                                            tipo: m.tipo,
                                                            estado: m.estado,
                                                        }));
                                                    return{     
                                                        idpedidoindividual: s.idpedidoindividual,
                                                        fecha: getDate(s.fecha),
                                                        idsuministro: s.idsuministro,
                                                        cantidad: s.cantidad,
                                                        preciounitario: s.preciounitario,
                                                        preciototal: s.preciototal,
                                                        idpedido: s.idpedido,
                                                        estado: s.estado,
                                                        mensajes: mensajesFiltrados.length > 0
                                                                ? mensajesFiltrados
                                                                : [{
                                                                    idmensaje: 0,
                                                                    fecha: '',
                                                                    mensaje: '',
                                                                    idpedidoindividual: s.idpedidoindividual,
                                                                    tipo: '',
                                                                    estado: '',
                                                                }]
                                                    }
                                                })

            setIsTextFieldsWarehouseOrder(prev => ({
                ...prev,
                idpedido: isSelectedRow.idpedido,
                fecha: getDate(isSelectedRow.fecha),
                campus: isSelectedRow.campus,
                precio: isSelectedRow.precio,
                estado: isSelectedRow.estado,
                idproveedor: isSelectedRow.idproveedor,
                idusuario: isSelectedRow.idusuario,
                tipo: insumosFiltrados.length === 0 ? 'Suministro de limpieza' :
                    suministrosFiltrados.length === 0 ? 'Insumo' : '',
                insumos: insumosFiltrados.length > 0
                    ? insumosFiltrados
                    : [],
                suministros: suministrosFiltrados.length > 0
                    ? suministrosFiltrados
                    : [],
            }));

        }else{
            resetTextFieldsUser();
            resetTextFieldsWarehouseOrder();
        }
    },[isSelectedRow]);
    // Constantes con la funcionalidad de los hooks
    const {getDate} = Dates();
    const resetTextFieldsUser = ResetTextFieldsUser();
    const resetTextFieldsWarehouseOrder = ResetTextFieldsWarehouseOrder();
    const {handleRowClick,nextPageWarehouseOrders,prevPage,currentRecordsWarehouseOrders,currentPage,totalPagesWarehouseOrders} = TableActionsWarehouseOrders();
    // Estructura del componente
    return(
        <>
            <Table_Container>
                <Table id="Table-Warehouse-Orders">
                    <Table_Head_Thead_Blue>
                        <tr>
                            <Table_Title_Numeric
                                title="ID Pedido"
                                order="ID Pedido"
                            />
                            <Table_Title_Number
                                title="Fecha"
                                order="Fecha"
                            />
                            <Table_Title_Text
                                order="Campus"
                                title="Campus"
                            />
                            <Table_Title_Text
                                order="Estado"
                                title="Estado"
                            />
                            <Table_Title_Text
                                title="Proveedor"
                                order="Proveedor"
                            />
                            <Table_Title_Text
                                title="Usuario"
                                order="Usuario"
                            />
                            <Table_Title_Numeric
                                title="Precio Total"
                                order="Precio Total"
                            />
                        </tr>
                    </Table_Head_Thead_Blue>
                    <Table_Body_Tbody_White>
                        {currentRecordsWarehouseOrders.map((order) => (
                            <tr
                                key={order.idpedido}
                                onClick={() => handleRowClick(order)}
                                style={{
                                    backgroundColor: isSelectedRow === order ? 'rgba(0, 0, 0, 0.85)' : 'transparent',
                                    cursor: 'pointer',
                                    transition: 'background-color 1s ease',
                                }}
                            >
                                <Table_Body_Td style={{color: isSelectedRow === order ? 'white' : ''}}>{order.idpedido}</Table_Body_Td>
                                <Table_Body_Td style={{color: isSelectedRow === order ? 'white' : ''}}>{getDate(order.fecha)}</Table_Body_Td>
                                <Table_Body_Td style={{color: isSelectedRow === order ? 'white' : ''}}>{order.campus}</Table_Body_Td>
                                <Table_Body_Td>
                                    <Table_Container_Item_Center>
                                        {order.estado === 'Solicitud' ? 
                                            <Text_Background_Yellow_12 style={{border: isSelectedRow === order ? '2px solid white' : ''}}>{order.estado.toUpperCase()}</Text_Background_Yellow_12>
                                        :<></>}
                                        {order.estado === 'Rechazado' ? 
                                            <Text_Background_Red_12 style={{border: isSelectedRow === order ? '2px solid white' : ''}}>{order.estado.toUpperCase()}</Text_Background_Red_12>
                                        :<></>}
                                        {order.estado === 'Aceptado' ? 
                                            <Text_Background_Lime_Green_12 style={{border: isSelectedRow === order ? '2px solid white' : ''}}>{order.estado.toUpperCase()}</Text_Background_Lime_Green_12>
                                        :<></>}
                                        {order.estado === 'En curso' ? 
                                            <Text_Background_Blue_12 style={{border: isSelectedRow === order ? '2px solid white' : ''}}>{order.estado.toUpperCase()}</Text_Background_Blue_12>
                                        :<></>}
                                        {order.estado === 'Finalizado' ? 
                                            <Text_Background_Green_12 style={{border: isSelectedRow === order ? '2px solid white' : ''}}>{order.estado.toUpperCase()}</Text_Background_Green_12>
                                        :<></>}
                                    </Table_Container_Item_Center>
                                </Table_Body_Td>                                
                                <Table_Body_Td style={{color: isSelectedRow === order ? 'white' : ''}}>{isSuppliers.find(supplier => supplier.idproveedor === order.idproveedor)?.nombre}</Table_Body_Td>
                                <Table_Body_Td style={{color: isSelectedRow === order ? 'white' : ''}}>{isUsers.find(user => user.idusuario === order.idusuario)?.nombrecorto}</Table_Body_Td>
                                <Table_Body_Td style={{color: isSelectedRow === order ? 'white' : ''}}><MdOutlineAttachMoney/> {order.precio || 'Desconocido'} MXN</Table_Body_Td>
                            </tr>
                        ))}
                    </Table_Body_Tbody_White>
                </Table>
            </Table_Container>
            <Table_Pagination
                currentRecords={currentRecordsWarehouseOrders}
                currentPage={currentPage}
                totalPage={totalPagesWarehouseOrders}
                onPrevPage={() => prevPage()}
                onNextPage={() => nextPageWarehouseOrders()}
            />
        </>
    );
}