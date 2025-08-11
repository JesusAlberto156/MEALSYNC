//____________IMPORT/EXPORT____________
// Hooks de React
import { useContext,useEffect } from "react";
// Contextos
import { ModalContext,ModalViewContext,SidebarContext } from "../../../../contexts/ViewsProvider";
import { SelectedRowContext } from "../../../../contexts/SelectedesProvider";
import { TextFieldsWarehouseOrderContext,TextFieldsObservationContext } from "../../../../contexts/FormsProvider";
import { RefModalContext,RefFormContext } from "../../../../contexts/RefsProvider";
import { CountSupplyTypesContext,SuppliesContext,SupplyTypesContext } from "../../../../contexts/SuppliesProvider";
import { DeletedOrdersContext } from "../../../../contexts/WarehouseProvider";
import { SuppliersContext } from "../../../../contexts/SuppliersProvider";
import { CleaningSuppliesContext,CleaningTypesContext,CountCleaningTypesContext } from "../../../../contexts/ExtrasProvider";
// Hooks personalizados
import { HandleModalViewWarehouse } from "../../../../hooks/warehouse/Views";
//__________IMAGENES__________
import Supply from '../../../imgs/Supply.jpg'
import Cleaning from '../../../imgs/Cleaning.jpg'
//__________IMAGENES__________
//__________ICONOS__________
import { MdOutlineAttachMoney } from "react-icons/md";
//__________ICONOS__________
// Estilos personalizados
import { Container_Modal_Background_Black,Container_Row_100_Center,Container_Row_NG_Auto_Center,Container_Modal_Form_White,Container_Modal_Form,Container_Modal_Form_White_600, Container_Column_100_Center, Container_Row_NG_Auto_Left, Container_Column_100_Left, Container_Row_100_Left, Container_Row_100_Right } from "../../../styled/Containers";
import { Text_Span_16_Center_Black,Text_Background_Red_12,Text_Background_Lime_Green_12,Text_Color_Blue_16,Text_Title_28_Black,Text_Color_Green_16,Text_Background_Blue_12,Text_Background_Green_12,Text_Background_Yellow_12, Text_Title_20_Black, Text_Span_16_Justify_Black } from "../../../styled/Text";
// Componentes personalizados
import Error_View from "../../errors/View";
import { Modal_Form_Button_Return } from "../../../forms/Button";
import { Image_Modal, Image_Modal_150 } from "../../../styled/Imgs";
//____________IMPORT/EXPORT____________

// Modal para visualizar los detalles de los pedidos de almacén de su tabla
export default function Warehouse_Order_Details(){
    // Constantes con el valor de los contextos
    const [isSelectedRow,setIsSelectedRow] = useContext(SelectedRowContext);
    const [currentMView] = useContext(ModalViewContext);
    const [isModal] = useContext(ModalContext);
    const [isTextFieldsWarehouseOrder] = useContext(TextFieldsWarehouseOrderContext);
    const Modal = useContext(RefModalContext);
    const isForm = useContext(RefFormContext); 
    const [isSidebar,setIsSidebar] = useContext(SidebarContext);
    const [isDeletedOrders] = useContext(DeletedOrdersContext);
    const [isSuppliers] = useContext(SuppliersContext);
    const [isSupplies] = useContext(SuppliesContext);
    const [isCleaningSupplies] = useContext(CleaningSuppliesContext); 
    const [isCleaningTypes] = useContext(CleaningTypesContext);
    const [isCountCleaningTypes] = useContext(CountCleaningTypesContext); 
    const [isCountSupplyTypes] = useContext(CountSupplyTypesContext);
    const [isSupplyTypes] = useContext(SupplyTypesContext); 
    const [isTextFieldsObservation] = useContext(TextFieldsObservationContext);
    // Constantes con la funcionalidad de los hooks
    const handleModalViewWarehouse = HandleModalViewWarehouse();
    // UseEffct para verificar la eliminacion del pedido de almacén
    useEffect(() => {
        if(isDeletedOrders.length !== 0){
            if(isDeletedOrders.some(order => order.idpedido === isTextFieldsWarehouseOrder.idpedido)){
                setIsSelectedRow(null);
            }
        }
    },[isDeletedOrders]);
    // Useffect para controlar el sidebar
    useEffect(() => {
        if(isSidebar){
            setIsSidebar(false);
        }
    },[]);
    // Estructura del componente
    return(
        <>
            {isModal && isSelectedRow !== null ? (
                <Container_Modal_Background_Black ref={Modal}>
                    <Image_Modal/>
                    <Container_Modal_Form_White_600 ref={isForm} className={currentMView === 'Pedido-Almacen-Detalles' ? 'slide-in-container-top' : 'slide-out-container-top'}>
                        <Container_Modal_Form_White>
                            <Container_Modal_Form>
                                <Text_Title_28_Black>DETALLES DEL PEDIDO NO. {isTextFieldsWarehouseOrder?.idpedido || 'Desconocido'}</Text_Title_28_Black>
                                <Container_Row_NG_Auto_Center>
                                    <Text_Color_Blue_16>MEALSYNC</Text_Color_Blue_16>
                                    <Text_Span_16_Center_Black>: Datos generales</Text_Span_16_Center_Black>
                                </Container_Row_NG_Auto_Center>
                                <Container_Row_NG_Auto_Center>
                                    <Text_Color_Green_16>Fecha de inicio</Text_Color_Green_16>
                                    <Text_Span_16_Center_Black>: {isTextFieldsWarehouseOrder?.fecha || 'Desconocida'}</Text_Span_16_Center_Black>
                                </Container_Row_NG_Auto_Center>
                                <Container_Row_NG_Auto_Center>
                                    <Text_Color_Green_16>Fecha de finalización</Text_Color_Green_16>
                                    <Text_Span_16_Center_Black>: {isTextFieldsObservation.fecha}</Text_Span_16_Center_Black>
                                </Container_Row_NG_Auto_Center>
                                <Container_Row_NG_Auto_Center>
                                    <Text_Color_Green_16>Proveedor</Text_Color_Green_16>
                                    <Text_Span_16_Center_Black>: {isSuppliers.find(supplier => supplier.idproveedor === isTextFieldsWarehouseOrder.idproveedor)?.nombre || 'Desconocido'}</Text_Span_16_Center_Black>
                                </Container_Row_NG_Auto_Center>
                                <Container_Row_NG_Auto_Center>
                                    <Text_Color_Green_16>Precio Total</Text_Color_Green_16>
                                    <Text_Span_16_Center_Black>: <MdOutlineAttachMoney/> {isTextFieldsWarehouseOrder?.precio || '0'} MXN</Text_Span_16_Center_Black>
                                </Container_Row_NG_Auto_Center>
                                <Container_Row_NG_Auto_Center>
                                    <Text_Color_Green_16>Estado</Text_Color_Green_16>
                                    <Text_Span_16_Center_Black>: </Text_Span_16_Center_Black>
                                </Container_Row_NG_Auto_Center>
                                {isTextFieldsWarehouseOrder.estado === 'Solicitud' ? (
                                    <Text_Background_Yellow_12> {isTextFieldsWarehouseOrder?.estado.toUpperCase() || 'Desconocido'}</Text_Background_Yellow_12>
                                ):(
                                    <></>
                                )}
                                {isTextFieldsWarehouseOrder.estado === 'Rechazado' ? (
                                    <Text_Background_Red_12> {isTextFieldsWarehouseOrder?.estado.toUpperCase() || 'Desconocido'}</Text_Background_Red_12>
                                ):(
                                    <></>
                                )}
                                {isTextFieldsWarehouseOrder.estado === 'Aceptado' ? (
                                    <Text_Background_Lime_Green_12> {isTextFieldsWarehouseOrder?.estado.toUpperCase() || 'Desconocido'}</Text_Background_Lime_Green_12>
                                ):(
                                    <></>
                                )}
                                {isTextFieldsWarehouseOrder.estado === 'En curso' ? (
                                    <Text_Background_Blue_12> {isTextFieldsWarehouseOrder?.estado.toUpperCase() || 'Desconocido'}</Text_Background_Blue_12>
                                ):(
                                    <></>
                                )}
                                {isTextFieldsWarehouseOrder.estado === 'Finalizado' ? (
                                    <Text_Background_Green_12> {isTextFieldsWarehouseOrder?.estado.toUpperCase() || 'Desconocido'}</Text_Background_Green_12>
                                ):(
                                    <></>
                                )}
                                <Container_Row_NG_Auto_Center>
                                    <Text_Color_Blue_16>MEALSYNC</Text_Color_Blue_16>
                                    <Text_Span_16_Center_Black>: Datos específicos</Text_Span_16_Center_Black>
                                </Container_Row_NG_Auto_Center>
                                {isTextFieldsWarehouseOrder.tipo === 'Insumo' ? (
                                    <>
                                        <Container_Row_NG_Auto_Center>
                                            <Text_Color_Green_16>Insumos</Text_Color_Green_16>
                                            <Text_Span_16_Center_Black>:</Text_Span_16_Center_Black>
                                        </Container_Row_NG_Auto_Center>
                                        {isTextFieldsWarehouseOrder.insumos.map((supply,index) => (
                                            <Container_Column_100_Center key={index}>
                                                <Text_Title_20_Black>{isSupplies.find(s => s.idinsumo === supply.idinsumo)?.nombre || 'Desconocido'}</Text_Title_20_Black>
                                                <Container_Row_100_Center>
                                                    <Container_Column_100_Left>
                                                        <Container_Row_NG_Auto_Left>
                                                            <Text_Color_Green_16>Código</Text_Color_Green_16>
                                                            <Text_Span_16_Center_Black>: {isSupplies.find(s => s.idinsumo === supply.idinsumo)?.codigo || 'Desconocido'}</Text_Span_16_Center_Black>
                                                        </Container_Row_NG_Auto_Left>    
                                                        <Container_Row_NG_Auto_Left>
                                                            <Text_Color_Green_16>Unidad</Text_Color_Green_16>
                                                            <Text_Span_16_Center_Black>: {(() => {
                                                                const S = isSupplies.find(s => s.idinsumo === supply.idinsumo);
                                                                if(!S) return;
                                                                const count = isCountSupplyTypes.find(c => c.idcantidad === S.idcantidad);
                                                                const type = isSupplyTypes.find(t => t.idtipo === S.idtipo);
                                                                const s = count.cantidad !== 1 ? 's':'';
                                                                if(!count || !type) return;
                                                                return `: ${count.cantidad} ${type.unidad}${s}`
                                                            })()}</Text_Span_16_Center_Black>
                                                        </Container_Row_NG_Auto_Left>
                                                        <Container_Row_NG_Auto_Left>
                                                            <Text_Color_Green_16>Cantidad</Text_Color_Green_16>
                                                            <Text_Span_16_Center_Black>: {supply.cantidad}</Text_Span_16_Center_Black>
                                                        </Container_Row_NG_Auto_Left>
                                                        <Container_Row_100_Left>
                                                            <Text_Color_Green_16>Estado:</Text_Color_Green_16>
                                                            {supply.estado === 'En espera' ? (
                                                                <Text_Background_Blue_12>{supply.estado.toUpperCase()}</Text_Background_Blue_12>
                                                            ):(
                                                                <></>
                                                            )}
                                                            {supply.estado === 'Eliminar' ? (
                                                                <Text_Background_Red_12>{supply.estado.toUpperCase()}</Text_Background_Red_12>
                                                            ):(
                                                                <></>
                                                            )}
                                                            {supply.estado === 'Mantener' ? (
                                                                <Text_Background_Lime_Green_12>{supply.estado.toUpperCase()}</Text_Background_Lime_Green_12>
                                                            ):(
                                                                <></>
                                                            )}
                                                            {supply.estado === 'Modificar' ? (
                                                                <Text_Background_Yellow_12>{supply.estado.toUpperCase()}</Text_Background_Yellow_12>
                                                            ):(
                                                                <></>
                                                            )}
                                                            {supply.estado === 'En curso' ? (
                                                                <Text_Background_Blue_12>{supply.estado.toUpperCase()}</Text_Background_Blue_12>
                                                            ):(
                                                                <></>
                                                            )}
                                                            {supply.estado === 'Cancelado' ? (
                                                                <Text_Background_Red_12>{supply.estado.toUpperCase()}</Text_Background_Red_12>
                                                            ):(
                                                                <></>
                                                            )}
                                                            {supply.estado === 'Aceptado' ? (
                                                                <Text_Background_Green_12>{supply.estado.toUpperCase()}</Text_Background_Green_12>
                                                            ):(
                                                                <></>
                                                            )}
                                                            {supply.estado === 'Devolución' ? (
                                                                <Text_Background_Yellow_12>{supply.estado.toUpperCase()}</Text_Background_Yellow_12>
                                                            ):(
                                                                <></>
                                                            )}
                                                        </Container_Row_100_Left>
                                                    </Container_Column_100_Left>
                                                    <Image_Modal_150 src={isSupplies.find(s => s.idinsumo === supply.idinsumo)?.imagen || Supply}/>
                                                </Container_Row_100_Center>
                                                {supply.estado === 'Modificar' || supply.estado === 'Cancelado' || supply.estado === 'Devolución' ? (
                                                    <Container_Row_100_Center>
                                                        <Text_Span_16_Justify_Black>{supply.mensajes[0].mensaje}</Text_Span_16_Justify_Black>
                                                    </Container_Row_100_Center>
                                                ):(
                                                    <></>
                                                )}
                                                {supply.estado === 'Aceptado' ? (
                                                    <>
                                                        <Container_Column_100_Left>
                                                            <Container_Row_NG_Auto_Left>
                                                                <Text_Color_Green_16>Precio unitario</Text_Color_Green_16>
                                                                <Text_Span_16_Center_Black>: {supply.preciounitario}</Text_Span_16_Center_Black>
                                                            </Container_Row_NG_Auto_Left>
                                                            <Container_Row_NG_Auto_Left>
                                                                <Text_Color_Green_16>Precio total</Text_Color_Green_16>
                                                                <Text_Span_16_Center_Black>: {supply.preciototal}</Text_Span_16_Center_Black>
                                                            </Container_Row_NG_Auto_Left>
                                                        </Container_Column_100_Left>
                                                    </>
                                                ):(
                                                    <></>
                                                )}
                                                <Container_Row_100_Right>
                                                    <Text_Span_16_Center_Black>No. Insumo {index+1}</Text_Span_16_Center_Black>
                                                </Container_Row_100_Right>
                                            </Container_Column_100_Center>
                                        ))}
                                    </>
                                ):(
                                    <></>
                                )}
                                {isTextFieldsWarehouseOrder.tipo === 'Suministro de limpieza' ? (
                                    <>
                                        <Container_Row_NG_Auto_Center>
                                            <Text_Color_Green_16>Suministros</Text_Color_Green_16>
                                            <Text_Span_16_Center_Black>:</Text_Span_16_Center_Black>
                                        </Container_Row_NG_Auto_Center>
                                        {isTextFieldsWarehouseOrder.suministros.map((supply,index) => (
                                            <Container_Column_100_Center key={index}>
                                                <Text_Title_20_Black>{isCleaningSupplies.find(s => s.idsuministro === supply.idsuministro)?.nombre || 'Desconocido'}</Text_Title_20_Black>
                                                <Container_Row_100_Center>
                                                    <Container_Column_100_Left>
                                                        <Container_Row_NG_Auto_Left>
                                                            <Text_Color_Green_16>Código</Text_Color_Green_16>
                                                            <Text_Span_16_Center_Black>: {isCleaningSupplies.find(s => s.idsuministro === supply.idsuministro)?.codigo || 'Desconocido'}</Text_Span_16_Center_Black>
                                                        </Container_Row_NG_Auto_Left>    
                                                        <Container_Row_NG_Auto_Left>
                                                            <Text_Color_Green_16>Unidad</Text_Color_Green_16>
                                                            <Text_Span_16_Center_Black>: {(() => {
                                                                const S = isCleaningSupplies.find(s => s.idsuministro === supply.idsuministro);
                                                                if(!S) return;
                                                                const count = isCountCleaningTypes.find(c => c.idcantidad === S.idcantidad);
                                                                const type = isCleaningTypes.find(t => t.idtipo === S.idtipo);
                                                                const s = count.cantidad !== 1 ? 's':'';
                                                                if(!count || !type) return;
                                                                return `: ${count.cantidad} ${type.unidad}${s}`
                                                            })()}</Text_Span_16_Center_Black>
                                                        </Container_Row_NG_Auto_Left>
                                                        <Container_Row_NG_Auto_Left>
                                                            <Text_Color_Green_16>Cantidad</Text_Color_Green_16>
                                                            <Text_Span_16_Center_Black>: {supply.cantidad}</Text_Span_16_Center_Black>
                                                        </Container_Row_NG_Auto_Left>
                                                        <Container_Row_100_Left>
                                                            <Text_Color_Green_16>Estado:</Text_Color_Green_16>
                                                            {supply.estado === 'En espera' ? (
                                                                <Text_Background_Blue_12>{supply.estado.toUpperCase()}</Text_Background_Blue_12>
                                                            ):(
                                                                <></>
                                                            )}
                                                            {supply.estado === 'Eliminar' ? (
                                                                <Text_Background_Red_12>{supply.estado.toUpperCase()}</Text_Background_Red_12>
                                                            ):(
                                                                <></>
                                                            )}
                                                            {supply.estado === 'Mantener' ? (
                                                                <Text_Background_Lime_Green_12>{supply.estado.toUpperCase()}</Text_Background_Lime_Green_12>
                                                            ):(
                                                                <></>
                                                            )}
                                                            {supply.estado === 'Modificar' ? (
                                                                <Text_Background_Yellow_12>{supply.estado.toUpperCase()}</Text_Background_Yellow_12>
                                                            ):(
                                                                <></>
                                                            )}
                                                            {supply.estado === 'En curso' ? (
                                                                <Text_Background_Blue_12>{supply.estado.toUpperCase()}</Text_Background_Blue_12>
                                                            ):(
                                                                <></>
                                                            )}
                                                            {supply.estado === 'Cancelado' ? (
                                                                <Text_Background_Red_12>{supply.estado.toUpperCase()}</Text_Background_Red_12>
                                                            ):(
                                                                <></>
                                                            )}
                                                            {supply.estado === 'Aceptado' ? (
                                                                <Text_Background_Green_12>{supply.estado.toUpperCase()}</Text_Background_Green_12>
                                                            ):(
                                                                <></>
                                                            )}
                                                            {supply.estado === 'Devolución' ? (
                                                                <Text_Background_Yellow_12>{supply.estado.toUpperCase()}</Text_Background_Yellow_12>
                                                            ):(
                                                                <></>
                                                            )}
                                                        </Container_Row_100_Left>
                                                    </Container_Column_100_Left>
                                                    <Image_Modal_150 src={isCleaningSupplies.find(s => s.idsuministro === supply.idsuministro)?.imagen || Cleaning}/>
                                                </Container_Row_100_Center>
                                                {supply.estado === 'Modificar' || supply.estado === 'Cancelado' || supply.estado === 'Devolución' ? (
                                                    <Container_Row_100_Center>
                                                        <Text_Span_16_Justify_Black>{supply.mensajes[0].mensaje}</Text_Span_16_Justify_Black>
                                                    </Container_Row_100_Center>
                                                ):(
                                                    <></>
                                                )}
                                                {supply.estado === 'Aceptado' ? (
                                                    <>
                                                        <Container_Column_100_Left>
                                                            <Container_Row_NG_Auto_Left>
                                                                <Text_Color_Green_16>Precio unitario</Text_Color_Green_16>
                                                                <Text_Span_16_Center_Black>: {supply.preciounitario}</Text_Span_16_Center_Black>
                                                            </Container_Row_NG_Auto_Left>
                                                            <Container_Row_NG_Auto_Left>
                                                                <Text_Color_Green_16>Precio total</Text_Color_Green_16>
                                                                <Text_Span_16_Center_Black>: {supply.preciototal}</Text_Span_16_Center_Black>
                                                            </Container_Row_NG_Auto_Left>
                                                        </Container_Column_100_Left>
                                                    </>
                                                ):(
                                                    <></>
                                                )}
                                                <Container_Row_100_Right>
                                                    <Text_Span_16_Center_Black>No. Suministro {index+1}</Text_Span_16_Center_Black>
                                                </Container_Row_100_Right>
                                            </Container_Column_100_Center>
                                        ))}
                                    </>
                                ):(
                                    <></>
                                )}
                                <Modal_Form_Button_Return
                                    onHandleModalView={() => handleModalViewWarehouse('')}
                                />
                            </Container_Modal_Form>
                        </Container_Modal_Form_White>
                    </Container_Modal_Form_White_600>
                </Container_Modal_Background_Black>
            ):(
                currentMView === 'Pedido-Almacen-Detalles' ? (
                    <>
                        <Error_View/>
                    </>
                ):(
                    <></>
                )
            )}
        </>
    );
}