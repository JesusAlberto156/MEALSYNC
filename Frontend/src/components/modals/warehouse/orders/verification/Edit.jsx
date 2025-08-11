//____________IMPORT/EXPORT____________
// Hooks de React
import { useContext,useEffect,useState } from "react";
import { useNavigate } from "react-router-dom";
import { Tooltip } from "@mui/material";
// Contextos
import { ModalContext,ModalViewContext,SidebarContext } from "../../../../../contexts/ViewsProvider";
import { SelectedRowContext } from "../../../../../contexts/SelectedesProvider";
import { TextFieldsWarehouseOrderContext } from "../../../../../contexts/FormsProvider";
import { RefModalContext,RefFormContext,RefKeyboardContext,RefKeyboardTouchContext } from "../../../../../contexts/RefsProvider";
import { CountSupplyTypesContext,SuppliesContext,SupplyTypesContext } from "../../../../../contexts/SuppliesProvider";
import { OrdersContext,SupplyOrderVerificationEditContext,CleaningSupplyOrderVerificationEditContext,CleaningSupplyOrdersContext,SupplyOrdersContext,MessageSupplyOrdersContext,MessageCleaningSupplyOrdersContext } from "../../../../../contexts/WarehouseProvider";
import { SuppliersContext } from "../../../../../contexts/SuppliersProvider";
import { SocketContext } from "../../../../../contexts/SocketProvider";
import { LoggedUserContext } from "../../../../../contexts/SessionProvider";
import { ActionBlockContext,TouchContext,KeyboardContext,KeyboardViewContext,IndexCountContext } from "../../../../../contexts/VariablesProvider";
import { CleaningSuppliesContext,CleaningTypesContext,CountCleaningTypesContext } from "../../../../../contexts/ExtrasProvider";
// Hooks personalizados
import { HandleModalViewWarehouse } from "../../../../../hooks/warehouse/Views";
import { HandleKeyboard } from "../../../../../hooks/Views";
import { HandleWarehouseOrderVerificationEdit,HandleTextProducts } from "../../../../../hooks/warehouse/Forms";
import { Dates } from "../../../../../hooks/Dates";
//__________IMAGENES__________
import Supply from '../../../../imgs/Supply.jpg'
import Cleaning from '../../../../imgs/Cleaning.jpg'
//__________IMAGENES__________
//__________ICONOS__________
import { MdCancel } from "react-icons/md";
import { MdDelete } from "react-icons/md";
//__________ICONOS__________
// Estilos personalizados
import { Container_Modal_Background_Black,Container_Row_100_Center,Container_Row_NG_Auto_Center,Container_Modal_Form_White,Container_Modal_Form,Container_Modal_Form_White_600, Container_Column_100_Center, Container_Row_NG_Auto_Left, Container_Column_100_Left, Container_Row_100_Left, Container_Row_100_Right } from "../../../../styled/Containers";
import { Text_Span_16_Center_Black,Text_Color_Blue_16,Text_Title_28_Black,Text_Color_Green_16,Text_Title_20_Black, Text_Span_16_Justify_Black } from "../../../../styled/Text";
import { Label_Text_16_Black } from "../../../../styled/Labels";
import { Button_Icon_Red_60 } from "../../../../styled/Buttons";
import { Icon_Button_Blue_20,Icon_20 } from "../../../../styled/Icons";
import { Input_Group,Input_Text_100_Black } from "../../../../styled/Inputs";
import { Alert_Sonner_Promise } from "../../../../styled/Alerts";
// Componentes personalizados
import { Modal_Form_Button_Edit } from "../../../../forms/Button";
import { Image_Modal, Image_Modal_150 } from "../../../../styled/Imgs";
import { Keyboard_Form_Warehouse_Order } from "../../../../keyboards/Form";
import Error_Edit from "../../../errors/Edit";
//____________IMPORT/EXPORT____________

// Modal para editar revisión a los pedidos de almacén de su tabla
export default function Warehouse_Order_Verification_Edit(){
    // Constantes con el valor de los contextos
    const [isSelectedRow,setIsSelectedRow] = useContext(SelectedRowContext);
    const [currentMView,setCurrentMView] = useContext(ModalViewContext);
    const [isModal,setIsModal] = useContext(ModalContext);
    const [isTextFieldsWarehouseOrder,setIsTextFieldsWarehouseOrder] = useContext(TextFieldsWarehouseOrderContext);
    const Modal = useContext(RefModalContext);
    const isForm = useContext(RefFormContext); 
    const [isSidebar,setIsSidebar] = useContext(SidebarContext);
    const [isSuppliers] = useContext(SuppliersContext);
    const [isSupplies] = useContext(SuppliesContext);
    const [isCleaningSupplies] = useContext(CleaningSuppliesContext); 
    const [isCleaningTypes] = useContext(CleaningTypesContext);
    const [isCountCleaningTypes] = useContext(CountCleaningTypesContext);
    const [isCountSupplyTypes] = useContext(CountSupplyTypesContext);
    const [isSupplyTypes] = useContext(SupplyTypesContext); 
    const [isActionBlock,setIsActionBlock] = useContext(ActionBlockContext);
    const [isLoggedUser] = useContext(LoggedUserContext);
    const [isKeyboard,setIsKeyboard] = useContext(KeyboardContext);
    const [isKeyboardView,setIsKeyboardView] = useContext(KeyboardViewContext);
    const Keyboard = useContext(RefKeyboardContext);
    const isKeyboardTouch = useContext(RefKeyboardTouchContext);
    const [isTouch] = useContext(TouchContext);
    const [isIndexCount,setIsIndexCount] = useContext(IndexCountContext);
    const [isSupplyOrderVerificationEdit,setIsSupplyOrderVerificationEdit] = useContext(SupplyOrderVerificationEditContext); 
    const [isCleaningSupplyOrderVerificationEdit,setIsCleaningSupplyOrderVerificationEdit] = useContext(CleaningSupplyOrderVerificationEditContext);
    const [socket] = useContext(SocketContext);
    const [isOrders] = useContext(OrdersContext); 
    const [isSupplyOrders] = useContext(SupplyOrdersContext);
    const [isCleaningSupplyOrders] = useContext(CleaningSupplyOrdersContext); 
    const [isMessageSupplyOrders] = useContext(MessageSupplyOrdersContext);
    const [isMessageCleaningSupplyOrders] = useContext(MessageCleaningSupplyOrdersContext);
    // Constantes con la funcionalidad de los hooks
    const handleModalViewWarehouse = HandleModalViewWarehouse();
    const handleWarehouseOrderVerificationEdit = HandleWarehouseOrderVerificationEdit();
    const { KeyboardView,KeyboardClick } = HandleKeyboard();
    const { SupplyDelete,CleaningSupplyDelete } = HandleTextProducts();
    const navigate = useNavigate();
    const {getDate} = Dates();
    // Constantes con el valor de useState
    const [isInsumos,setIsInsumos] = useState(0);
    const [isSuministros,setIsSuministros] = useState(0);
    // useEffect para sobrecargar los datos
    useEffect(() => {
        if(isTextFieldsWarehouseOrder.tipo === 'Insumo'){
            const supply = isSupplyOrders.filter(s => s.idpedido === isSelectedRow.idpedido);

            if(supply.length > 0){
                setIsInsumos(supply.map(s => {
                    const mensajesFiltrados = isMessageSupplyOrders
                        .filter(m => m.idpedidoindividual === s.idpedidoindividual && m.estado === 'Visible')
                        .map(m => ({
                            idmensaje: m.idmensaje,
                            fecha: getDate(m.fecha),
                            mensaje: m.mensaje,
                            idpedidoindividual: m.idpedidoindividual,
                            tipo: m.tipo,
                            estado: m.estado,
                            idusuario: m.idusuario,
                        }));
                    return {
                        idpedidoindividual: s.idpedidoindividual,
                        fecha: getDate(s.fecha),
                        idinsumo: s.idinsumo,
                        cantidad: String(s.cantidad),
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
                                    idusuario: 0,
                                }]
                    }
                }));
            }
        }
        if(isTextFieldsWarehouseOrder.tipo === 'Suministro de limpieza'){
            const supply = isCleaningSupplyOrders.filter(s => s.idpedido === isSelectedRow.idpedido);

            if(supply.length > 0){
                setIsSuministros(supply.map(s => {
                    const mensajesFiltrados = isMessageCleaningSupplyOrders
                        .filter(m => m.idpedidoindividual === s.idpedidoindividual && m.estado === 'Visible')
                        .map(m => ({
                            idmensaje: m.idmensaje,
                            fecha: getDate(m.fecha),
                            mensaje: m.mensaje,
                            idpedidoindividual: m.idpedidoindividual,
                            tipo: m.tipo,
                            estado: m.estado,
                            idusuario: m.idusuario,
                        }));
                    return {
                        idpedidoindividual: s.idpedidoindividual,
                        fecha: getDate(s.fecha),
                        idsuministro: s.idsuministro,
                        cantidad: String(s.cantidad),
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
                                    idusuario: 0,
                                }]
                    }
                }));
            }
        }
    },[])
    // UseEffect para verififcar si el pedido dejo de ser Rechazado 
    useEffect(() => {
        if(isOrders.length !== 0){
            if(isOrders.some(order => order.idpedido === isTextFieldsWarehouseOrder.idpedido && order.estado !== 'Rechazado')){
                setTimeout(() => {
                    setIsSelectedRow(null);
                },1000);
            }
        }
    },[isOrders])
    // Useffect para controlar el sidebar
    useEffect(() => {
        if(isSidebar){
            setIsSidebar(false);
        }
    },[]);
    // UseEffets para controlar el teclado
    useEffect(() => {
        KeyboardView();
    },[]);
    useEffect(() => {
        KeyboardClick();
    },[Keyboard]);
    useEffect(() => {
        isKeyboardTouch.current = isTouch;
    },[isTouch]);
    // UseEffect para agregar datos a la base de datos
    useEffect(() => {
        if(isSupplyOrderVerificationEdit){
            const promise = new Promise((resolve,reject) => {
                try{
                    setTimeout(() => {
                        socket.emit('Update-Supply-Order-Verification',isLoggedUser.idusuario,isTextFieldsWarehouseOrder.idpedido,isTextFieldsWarehouseOrder.estado,isInsumos,isTextFieldsWarehouseOrder.insumos);

                        resolve('¡Editó la revisión al pedido del almacén!');

                        setIsSupplyOrderVerificationEdit(false);

                        const route = sessionStorage.getItem('Ruta');
                        const sidebar = sessionStorage.getItem('Estado del Sidebar');

                        setCurrentMView('');
                        sessionStorage.setItem('Vista del Modal','');
                        setTimeout(() => {
                            if(sidebar === 'true'){
                                setIsSidebar(true);
                            }
                            setIsModal(false);
                            sessionStorage.setItem('Estado del Modal',false);
                            setIsActionBlock(false);
                            setIsSelectedRow(null);
                            return navigate(route,{ replace: true });
                        },750);
                    },1000);
                }catch(e){
                    setIsActionBlock(false);
                    setIsSupplyOrderVerificationEdit(false);
                    return reject('¡Ocurrio un error inesperado!');
                }
            });

            return Alert_Sonner_Promise(promise,'¡Editando la revisión al pedido del almacén!','2');
        }
        if(isCleaningSupplyOrderVerificationEdit){
            const promise = new Promise((resolve,reject) => {
                try{
                    setTimeout(() => {
                        socket.emit('Update-Cleaning-Supply-Order-Verification',isLoggedUser.idusuario,isTextFieldsWarehouseOrder.idpedido,isTextFieldsWarehouseOrder.estado,isSuministros,isTextFieldsWarehouseOrder.suministros);

                        resolve('¡Editó la revisión al pedido del almacén!');

                        setIsCleaningSupplyOrderVerificationEdit(false);

                        const route = sessionStorage.getItem('Ruta');
                        const sidebar = sessionStorage.getItem('Estado del Sidebar');

                        setCurrentMView('');
                        sessionStorage.setItem('Vista del Modal','');
                        setTimeout(() => {
                            if(sidebar === 'true'){
                                setIsSidebar(true);
                            }
                            setIsModal(false);
                            sessionStorage.setItem('Estado del Modal',false);
                            setIsActionBlock(false);
                            setIsSelectedRow(null);
                            return navigate(route,{ replace: true });
                        },750);
                    },1000);
                }catch(e){
                    setIsActionBlock(false);
                    setIsCleaningSupplyOrderVerificationEdit(false);
                    return reject('¡Ocurrio un error inesperado!');
                }
            });

            return Alert_Sonner_Promise(promise,'¡Editando la revisión al pedido del almacén!','2');
        }
    },[isSupplyOrderVerificationEdit,isCleaningSupplyOrderVerificationEdit]);
    // Estructura del componente
    return(
        <>
            {isModal && isSelectedRow !== null ? (
                <Container_Modal_Background_Black ref={Modal}>
                    <Image_Modal/>
                    <Container_Modal_Form_White_600 ref={isForm} className={currentMView === 'Pedido-Almacen-Verificacion-Editar' ? 'slide-in-container-top' : 'slide-out-container-top'}>
                        <Container_Modal_Form_White>
                            <Container_Modal_Form>
                                <Text_Title_28_Black>REVISIÓN DEL PEDIDO NO. {isTextFieldsWarehouseOrder?.idpedido || 'Desconocido'}</Text_Title_28_Black>
                                <Container_Row_NG_Auto_Center>
                                    <Text_Color_Blue_16>MEALSYNC</Text_Color_Blue_16>
                                    <Text_Span_16_Center_Black>: Datos generales</Text_Span_16_Center_Black>
                                </Container_Row_NG_Auto_Center>
                                <Container_Row_NG_Auto_Center>
                                    <Text_Color_Green_16>Fecha de inicio</Text_Color_Green_16>
                                    <Text_Span_16_Center_Black>: {isTextFieldsWarehouseOrder?.fecha || 'Desconocida'}</Text_Span_16_Center_Black>
                                </Container_Row_NG_Auto_Center>
                                <Container_Row_NG_Auto_Center>
                                    <Text_Color_Green_16>Proveedor</Text_Color_Green_16>
                                    <Text_Span_16_Center_Black>: {isSuppliers.find(supplier => supplier.idproveedor === isTextFieldsWarehouseOrder.idproveedor)?.nombre || 'Desconocido'}</Text_Span_16_Center_Black>
                                </Container_Row_NG_Auto_Center>
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
                                                        {supply.estado === 'Modificar' ? (
                                                            <Container_Row_100_Left>
                                                                <Label_Text_16_Black>Cantidad:</Label_Text_16_Black>
                                                                <Input_Group>
                                                                    <Input_Text_100_Black
                                                                        className="Input-Cantidad"
                                                                        placeholder="..."
                                                                        type="text"
                                                                        disabled={isActionBlock}
                                                                        value={supply.cantidad}
                                                                        onChange={(e) => {
                                                                            if(!isNaN(Number(e.target.value))){
                                                                                const newSupplies = [...isTextFieldsWarehouseOrder.insumos];
                                                                                newSupplies[index].cantidad = e.target.value;
                                                                                setIsTextFieldsWarehouseOrder(prev => ({
                                                                                    ...prev,
                                                                                    insumos: newSupplies
                                                                                }));
                                                                            }
                                                                        }}
                                                                        onFocus={() => {
                                                                            if(isKeyboardTouch.current){
                                                                                setIsKeyboard(true);
                                                                                setIsKeyboardView(`Cantidad-Pedido-Almacen-Insumo-${index}`);
                                                                                setIsIndexCount(index)
                                                                            }
                                                                        }}
                                                                    />
                                                                </Input_Group>
                                                                <Icon_Button_Blue_20
                                                                    onClick={() => {
                                                                        const newSupplies = [...isTextFieldsWarehouseOrder.insumos];
                                                                        newSupplies[index].cantidad = '';
                                                                        setIsTextFieldsWarehouseOrder(prev => ({
                                                                            ...prev,
                                                                            insumos: newSupplies
                                                                        }));
                                                                    }}
                                                                    disabled={isActionBlock}
                                                                >
                                                                    <MdCancel/>
                                                                </Icon_Button_Blue_20>
                                                            </Container_Row_100_Left>
                                                        ):(
                                                            <></>
                                                        )}
                                                        {supply.estado === 'Eliminar' || supply.estado === 'Mantener' ? (
                                                            <Container_Row_NG_Auto_Left>
                                                                <Text_Color_Green_16>Cantidad</Text_Color_Green_16>
                                                                <Text_Span_16_Center_Black>: {supply.cantidad}</Text_Span_16_Center_Black>
                                                            </Container_Row_NG_Auto_Left>
                                                        ):(
                                                            <></>
                                                        )}
                                                    </Container_Column_100_Left>
                                                    <Image_Modal_150 src={isSupplies.find(s => s.idinsumo === supply.idinsumo)?.imagen || Supply}/>
                                                </Container_Row_100_Center>
                                                {supply?.estado === 'Modificar' ? (
                                                    <Container_Row_100_Center>
                                                        <Container_Row_100_Left>
                                                            <Text_Span_16_Center_Black>No. Insumo {index+1}</Text_Span_16_Center_Black>
                                                        </Container_Row_100_Left>
                                                        <Container_Row_100_Right>
                                                            <Text_Span_16_Justify_Black>{supply.mensajes[0].mensaje}</Text_Span_16_Justify_Black>
                                                        </Container_Row_100_Right>
                                                    </Container_Row_100_Center>
                                                ):(
                                                    <></>
                                                )}
                                                {supply?.estado === 'Eliminar' ? (
                                                    <Container_Row_100_Center>
                                                        <Container_Row_100_Left>
                                                            <Text_Span_16_Center_Black>No. Insumo {index+1}</Text_Span_16_Center_Black>
                                                        </Container_Row_100_Left>
                                                        <Container_Row_100_Right>
                                                            {isActionBlock ? (
                                                                <Button_Icon_Red_60 disabled>
                                                                    <Icon_20><MdDelete/></Icon_20>
                                                                </Button_Icon_Red_60>
                                                            ):(
                                                                <Tooltip title='Eliminar' placement="top">
                                                                    <Button_Icon_Red_60
                                                                        onClick={() => SupplyDelete(index)}
                                                                    >
                                                                        <Icon_20><MdDelete/></Icon_20>
                                                                    </Button_Icon_Red_60>
                                                                </Tooltip>
                                                            )}
                                                        </Container_Row_100_Right>
                                                    </Container_Row_100_Center>
                                                ):(
                                                    <></>
                                                )}
                                                {supply?.estado === 'Mantener' ? (
                                                    <Container_Row_100_Right>
                                                        <Text_Span_16_Center_Black>No. Insumo {index+1}</Text_Span_16_Center_Black>
                                                    </Container_Row_100_Right>
                                                ):(
                                                    <></>
                                                )}
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
                                                        {supply.estado === 'Modificar' ? (
                                                            <Container_Row_100_Left>
                                                                <Label_Text_16_Black>Cantidad:</Label_Text_16_Black>
                                                                <Input_Group>
                                                                    <Input_Text_100_Black
                                                                        className="Input-Cantidad"
                                                                        placeholder="..."
                                                                        type="text"
                                                                        disabled={isActionBlock}
                                                                        value={supply.cantidad}
                                                                        onChange={(e) => {
                                                                            if(!isNaN(Number(e.target.value))){
                                                                                const newCleaningSupplies = [...isTextFieldsWarehouseOrder.suministros];
                                                                                newCleaningSupplies[index].cantidad = e.target.value;
                                                                                setIsTextFieldsWarehouseOrder(prev => ({
                                                                                    ...prev,
                                                                                    suministros: newCleaningSupplies
                                                                                }));
                                                                            }
                                                                        }}
                                                                        onFocus={() => {
                                                                            if(isKeyboardTouch.current){
                                                                                setIsKeyboard(true);
                                                                                setIsKeyboardView(`Cantidad-Pedido-Almacen-Suministro-${index}`);
                                                                                setIsIndexCount(index)
                                                                            }
                                                                        }}
                                                                    />
                                                                </Input_Group>
                                                                <Icon_Button_Blue_20
                                                                    onClick={() => {
                                                                        const newCleaningSupplies = [...isTextFieldsWarehouseOrder.suministros];
                                                                        newCleaningSupplies[index].cantidad = '';
                                                                        setIsTextFieldsWarehouseOrder(prev => ({
                                                                            ...prev,
                                                                            suministros: newCleaningSupplies
                                                                        }));
                                                                    }}
                                                                    disabled={isActionBlock}
                                                                >
                                                                    <MdCancel/>
                                                                </Icon_Button_Blue_20>
                                                            </Container_Row_100_Left>
                                                        ):(
                                                            <></>
                                                        )}
                                                        {supply.estado === 'Eliminar' || supply.estado === 'Mantener' ? (
                                                            <Container_Row_NG_Auto_Left>
                                                                <Text_Color_Green_16>Cantidad</Text_Color_Green_16>
                                                                <Text_Span_16_Center_Black>: {supply.cantidad}</Text_Span_16_Center_Black>
                                                            </Container_Row_NG_Auto_Left>
                                                        ):(
                                                            <></>
                                                        )}
                                                    </Container_Column_100_Left>
                                                    <Image_Modal_150 src={isCleaningSupplies.find(s => s.idsuministro === supply.idsuministro)?.imagen || Cleaning}/>
                                                </Container_Row_100_Center>
                                                {supply?.estado === 'Modificar' ? (
                                                    <Container_Row_100_Center>
                                                        <Container_Row_100_Left>
                                                            <Text_Span_16_Center_Black>No. Suministro {index+1}</Text_Span_16_Center_Black>
                                                        </Container_Row_100_Left>
                                                        <Container_Row_100_Right>
                                                            <Text_Span_16_Justify_Black>{supply.mensajes[0].mensaje}</Text_Span_16_Justify_Black>
                                                        </Container_Row_100_Right>
                                                    </Container_Row_100_Center>
                                                ):(
                                                    <></>
                                                )}
                                                {supply?.estado === 'Eliminar' ? (
                                                    <Container_Row_100_Center>
                                                        <Container_Row_100_Left>
                                                            <Text_Span_16_Center_Black>No. Suministro {index+1}</Text_Span_16_Center_Black>
                                                        </Container_Row_100_Left>
                                                        <Container_Row_100_Right>
                                                            {isActionBlock ? (
                                                                <Button_Icon_Red_60 disabled>
                                                                    <Icon_20><MdDelete/></Icon_20>
                                                                </Button_Icon_Red_60>
                                                            ):(
                                                                <Tooltip title='Eliminar' placement="top">
                                                                    <Button_Icon_Red_60
                                                                        onClick={() => CleaningSupplyDelete(index)}
                                                                    >
                                                                        <Icon_20><MdDelete/></Icon_20>
                                                                    </Button_Icon_Red_60>
                                                                </Tooltip>
                                                            )}
                                                        </Container_Row_100_Right>
                                                    </Container_Row_100_Center>
                                                ):(
                                                    <></>
                                                )}
                                                {supply?.estado === 'Mantener' ? (
                                                    <Container_Row_100_Right>
                                                        <Text_Span_16_Center_Black>No. Suministro {index+1}</Text_Span_16_Center_Black>
                                                    </Container_Row_100_Right>
                                                ):(
                                                    <></>
                                                )}
                                            </Container_Column_100_Center>
                                        ))}
                                    </>
                                ):(
                                    <></>
                                )}
                                <Modal_Form_Button_Edit
                                    onAction={() => handleWarehouseOrderVerificationEdit(isInsumos,isSuministros)}
                                    onCancel={() => handleModalViewWarehouse('')}
                                />
                            </Container_Modal_Form>
                        </Container_Modal_Form_White>
                    </Container_Modal_Form_White_600>
                    <Keyboard_Form_Warehouse_Order/>
                </Container_Modal_Background_Black>
            ):(
                currentMView === 'Pedido-Almacen-Verificacion-Editar' ? (
                    <>
                        <Error_Edit/>
                    </>
                ):(
                    <></>
                )
            )}
        </>
    );
}