//____________IMPORT/EXPORT____________
// Hooks de React
import { useContext,useEffect } from "react";
import { useNavigate } from "react-router-dom";
// Contextos
import { ModalContext,ModalViewContext,SidebarContext } from "../../../../contexts/ViewsProvider";
import { SelectedRowContext } from "../../../../contexts/SelectedesProvider";
import { TextFieldsWarehouseOrderContext,TextFieldsObservationContext } from "../../../../contexts/FormsProvider";
import { RefModalContext,RefFormContext,RefKeyboardContext,RefKeyboardTouchContext } from "../../../../contexts/RefsProvider";
import { CountSupplyTypesContext,SuppliesContext,SupplyTypesContext } from "../../../../contexts/SuppliesProvider";
import { OrdersContext,SupplyOrderEndContext,CleaningSupplyOrderEndContext,SupplyOrdersContext,CleaningSupplyOrdersContext } from "../../../../contexts/WarehouseProvider";
import { SuppliersContext } from "../../../../contexts/SuppliersProvider";
import { SocketContext } from "../../../../contexts/SocketProvider";
import { LoggedUserContext } from "../../../../contexts/SessionProvider";
import { ActionBlockContext,TouchContext,KeyboardContext,KeyboardViewContext,IndexDetailContext,IndexCountContext } from "../../../../contexts/VariablesProvider";
import { CleaningSuppliesContext,CleaningTypesContext,CountCleaningTypesContext } from "../../../../contexts/ExtrasProvider";
// Hooks personalizados
import { HandleModalViewWarehouse } from "../../../../hooks/warehouse/Views";
import { HandleKeyboard } from "../../../../hooks/Views";
import { HandleWarehouseOrderEnd } from "../../../../hooks/warehouse/Forms";
//__________IMAGENES__________
import Supply from '../../../imgs/Supply.jpg'
import Cleaning from '../../../imgs/Cleaning.jpg'
//__________IMAGENES__________
//__________ICONOS__________
import { MdCancel } from "react-icons/md";
import { MdOutlineAttachMoney } from "react-icons/md";
import { FaStar } from "react-icons/fa6";
//__________ICONOS__________
// Estilos personalizados
import { Container_Modal_Background_Black,Container_Row_100_Center,Container_Row_NG_Auto_Center,Container_Modal_Form_White,Container_Modal_Form,Container_Modal_Form_White_600, Container_Column_100_Center, Container_Row_NG_Auto_Left, Container_Column_100_Left, Container_Row_100_Left, Container_Row_100_Right } from "../../../styled/Containers";
import { Text_Span_16_Center_Black,Text_Color_Blue_16,Text_Title_28_Black,Text_Color_Green_16,Text_Title_20_Black, Text_Span_16_Justify_Black } from "../../../styled/Text";
import { Label_Button_16_Black,Label_Text_16_Black,Label_Area_12_Black } from "../../../styled/Labels";
import { Icon_Black_28, Icon_Blue_28, Icon_Button_Blue_20, Icon_Green_28, Icon_Lime_Green_28, Icon_Orange_28, Icon_Red_28, Icon_Yellow_28 } from "../../../styled/Icons";
import { Input_Radio_20,Input_Area_100_Black,Input_Group,Input_Text_100_Black } from "../../../styled/Inputs";
import { Alert_Sonner_Promise } from "../../../styled/Alerts";
// Componentes personalizados
import { Modal_Form_Button_End } from "../../../forms/Button";
import { Image_Modal, Image_Modal_150 } from "../../../styled/Imgs";
import { Keyboard_Form_Warehouse_Order } from "../../../keyboards/Form";
import Error_Edit from "../../errors/Edit";
//____________IMPORT/EXPORT____________

// Modal para finalizar a los pedidos de almacén de su tabla
export default function Warehouse_Order_End(){
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
    const [isIndexDetail,setIsIndexDetail] = useContext(IndexDetailContext);
    const [isIndexCount,setIsIndexCount] = useContext(IndexCountContext);
    const [socket] = useContext(SocketContext);
    const [isOrders] = useContext(OrdersContext);
    const [isTextFieldsObservation,setIsTextFieldsObservation] = useContext(TextFieldsObservationContext);
    const [isSupplyOrders] = useContext(SupplyOrdersContext);
    const [isCleaningSupplyOrders] = useContext(CleaningSupplyOrdersContext);
    const [isCleaningSupplyOrderEnd,setIsCleaningSupplyOrderEnd] = useContext(CleaningSupplyOrderEndContext);
    const [isSupplyOrderEnd,setIsSupplyOrderEnd] = useContext(SupplyOrderEndContext);
    // Constantes con la funcionalidad de los hooks
    const handleModalViewWarehouse = HandleModalViewWarehouse();
    const handleWarehouseOrderEnd = HandleWarehouseOrderEnd();
    const { KeyboardView,KeyboardClick } = HandleKeyboard();
    const navigate = useNavigate();
    // useEffect para reiniciar valores 
    useEffect(() => {
        const allFinished = isTextFieldsWarehouseOrder.insumos.every(
            ing => ing.estado === 'Aceptado' || ing.estado === 'Cancelado'
        );

        if (!allFinished) {
            setIsTextFieldsObservation({
                ...isTextFieldsObservation,
                observacion: '',
                calificacion: 0,
                // cualquier otro campo que quieras resetear
            });
            setIsTextFieldsWarehouseOrder({
                ...isTextFieldsWarehouseOrder,
                estado: 'En curso',
            })
        }else{
            setIsTextFieldsWarehouseOrder({
                ...isTextFieldsWarehouseOrder,
                estado: 'Finalizado',
            })
        }
    }, [isTextFieldsWarehouseOrder.insumos]);
    useEffect(() => {
        const allFinished = isTextFieldsWarehouseOrder.suministros.every(
            ing => ing.estado === 'Aceptado' || ing.estado === 'Cancelado'
        );

        if (!allFinished) {
            setIsTextFieldsObservation({
                ...isTextFieldsObservation,
                observacion: '',
                calificacion: 0,
            });
                // cualquier otro campo que quieras resetear
                setIsTextFieldsWarehouseOrder({
                ...isTextFieldsWarehouseOrder,
                estado: 'En curso',
            })
        }else{
            setIsTextFieldsWarehouseOrder({
                ...isTextFieldsWarehouseOrder,
                estado: 'Finalizado',
            })
        }
    }, [isTextFieldsWarehouseOrder.suministros]);
    // useEffect para controlar el precio 
    useEffect(() => {
        const totalPedido = isTextFieldsWarehouseOrder.insumos.reduce((acc, insumo) => {
            const precio = Number(insumo.preciototal);
            return acc + (isNaN(precio) ? 0 : precio);
        }, 0);

        setIsTextFieldsWarehouseOrder(prev => ({
            ...prev,
            precio: totalPedido // asegúrate de que este campo exista
        }));
    }, [isTextFieldsWarehouseOrder.insumos]);
    useEffect(() => {
        const totalPedido = isTextFieldsWarehouseOrder.suministros.reduce((acc, suministro) => {
            const precio = Number(suministro.preciototal);
            return acc + (isNaN(precio) ? 0 : precio);
        }, 0);

        setIsTextFieldsWarehouseOrder(prev => ({
            ...prev,
            precio: totalPedido // asegúrate de que este campo exista
        }));
    }, [isTextFieldsWarehouseOrder.suministros]);
    // Funcion para formatear la fecha
    function getFormattedDateTime() {
        const now = new Date();
        const pad = (n) => n.toString().padStart(2, '0');
        const year = now.getFullYear();
        const month = pad(now.getMonth() + 1);
        const day = pad(now.getDate());
        const hours = pad(now.getHours());
        const minutes = pad(now.getMinutes());
        const seconds = pad(now.getSeconds());
    
        return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    }
    // UseEffect para obtener la hora a tiepo real
    useEffect(() => {
        const interval = setInterval(() => {
            setIsTextFieldsObservation((prev) => ({
                ...prev,
                fecha: getFormattedDateTime()
            }));
        }, 1000);

        return () => clearInterval(interval);
    },[])
    // UseEffect para verififcar si el pedido se finalizo  
    useEffect(() => {
        if(isOrders.length !== 0){
            if(isOrders.some(order => order.idpedido === isTextFieldsWarehouseOrder.idpedido && order.estado === 'Finalizado')){
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
        if(isSupplyOrderEnd){
            const promise = new Promise((resolve,reject) => {
                try{
                    setTimeout(() => {
                        socket.emit('Update-Supply-Order-End',isLoggedUser.idusuario,isTextFieldsWarehouseOrder.idpedido,isTextFieldsWarehouseOrder.estado,isTextFieldsWarehouseOrder.precio,isTextFieldsWarehouseOrder.insumos,isTextFieldsObservation.observacion,isTextFieldsObservation.calificacion,isTextFieldsObservation.idproveedor);

                        if(isTextFieldsWarehouseOrder.estado === 'Finalizado'){
                            resolve('¡Finalizó al pedido del almacén!');
                        }else{
                            resolve('¡No es posible finalizar al pedido del almacén!');
                        }
                        
                        setIsSupplyOrderEnd(false);

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
                    setIsSupplyOrderEnd(false);
                    return reject('¡Ocurrio un error inesperado!');
                }
            });

            return Alert_Sonner_Promise(promise,'¡Finalizando al pedido del almacén!','2');
        }
         if(isCleaningSupplyOrderEnd){
            const promise = new Promise((resolve,reject) => {
                try{
                    setTimeout(() => {
                        socket.emit('Update-Cleaning-Supply-Order-End',isLoggedUser.idusuario,isTextFieldsWarehouseOrder.idpedido,isTextFieldsWarehouseOrder.estado,isTextFieldsWarehouseOrder.precio,isTextFieldsWarehouseOrder.suministros,isTextFieldsObservation.observacion,isTextFieldsObservation.calificacion,isTextFieldsObservation.idproveedor);

                        if(isTextFieldsWarehouseOrder.estado === 'Finalizado'){
                            resolve('¡Finalizó al pedido del almacén!');
                        }else{
                            resolve('¡No es posible finalizar al pedido del almacén!');
                        }
                        
                        setIsCleaningSupplyOrderEnd(false);

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
                    setIsCleaningSupplyOrderEnd(false);
                    return reject('¡Ocurrio un error inesperado!');
                }
            });

            return Alert_Sonner_Promise(promise,'¡Finalizando al pedido del almacén!','2');
        }
    },[isSupplyOrderEnd,isCleaningSupplyOrderEnd]);
    // Estructura del componente
    return(
        <>
            {isModal && isSelectedRow !== null ? (
                <Container_Modal_Background_Black ref={Modal}>
                    <Image_Modal/>
                    <Container_Modal_Form_White_600 ref={isForm} className={currentMView === 'Pedido-Almacen-Finalizar' ? 'slide-in-container-top' : 'slide-out-container-top'}>
                        <Container_Modal_Form_White>
                            <Container_Modal_Form>
                                <Text_Title_28_Black>FINALIZAR PEDIDO NO. {isTextFieldsWarehouseOrder?.idpedido || 'Desconocido'}</Text_Title_28_Black>
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
                                    <Text_Color_Green_16>Precio Total</Text_Color_Green_16>
                                    <Text_Span_16_Center_Black>: <MdOutlineAttachMoney/> {isTextFieldsWarehouseOrder?.precio || '0'} MXN</Text_Span_16_Center_Black>
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
                                                        <Container_Row_NG_Auto_Left>
                                                            <Text_Color_Green_16>Cantidad</Text_Color_Green_16>
                                                            <Text_Span_16_Center_Black>: {supply.cantidad}</Text_Span_16_Center_Black>
                                                        </Container_Row_NG_Auto_Left>
                                                    </Container_Column_100_Left>
                                                    <Image_Modal_150 src={isSupplies.find(s => s.idinsumo === supply.idinsumo)?.imagen || Supply}/>
                                                </Container_Row_100_Center>
                                                {isSupplyOrders.find(s => s.idpedidoindividual === supply.idpedidoindividual)?.estado === 'En curso' ? (
                                                    <>
                                                        <Container_Row_100_Center>
                                                            {['Aceptado','Cancelado','Devolución',].map((item,indexR) => (
                                                                <Label_Button_16_Black 
                                                                    Disabled={isActionBlock}
                                                                    key={indexR}
                                                                >
                                                                    <Input_Radio_20
                                                                        type="radio"
                                                                        name={`type-${index}-${indexR}`}
                                                                        disabled={isActionBlock}
                                                                        value={item}
                                                                        checked={supply.estado === item}
                                                                        onChange={(e) => {
                                                                                const newSupplies = [...isTextFieldsWarehouseOrder.insumos];
                                                                                newSupplies[index] = {
                                                                                ...newSupplies[index],
                                                                                estado: e.target.value,
                                                                                preciounitario: '',
                                                                                preciototal: '',
                                                                                mensajes: [
                                                                                    {
                                                                                    ...newSupplies[index].mensajes[0],
                                                                                    mensaje: ''
                                                                                    }
                                                                                ]
                                                                                };
                                                                                setIsTextFieldsWarehouseOrder(prev => ({
                                                                                    ...prev,
                                                                                    insumos: newSupplies
                                                                                }));
                                                                            }
                                                                        }
                                                                    />
                                                                    {item}
                                                                </Label_Button_16_Black>
                                                            ))}
                                                        </Container_Row_100_Center>
                                                        {supply?.estado === 'Cancelado' || supply?.estado === 'Devolución' ? (
                                                            <Container_Row_100_Left>
                                                                <Label_Text_16_Black>Detalle:</Label_Text_16_Black>
                                                                <Input_Group>
                                                                    <Input_Area_100_Black
                                                                        className="Input-Detalle"
                                                                        placeholder="..."
                                                                        type="text"
                                                                        maxLength={500}
                                                                        rows={3}
                                                                        disabled={isActionBlock}
                                                                        value={supply.mensajes[0].mensaje}
                                                                        onChange={(e) => {
                                                                            const newInsumos = [...isTextFieldsWarehouseOrder.insumos];
                                                                            newInsumos[index] = {
                                                                                ...newInsumos[index],
                                                                                mensajes: [
                                                                                    {
                                                                                        ...newInsumos[index].mensajes[0],
                                                                                        mensaje: e.target.value
                                                                                    },
                                                                                    ...newInsumos[index].mensajes.slice(1)
                                                                                ]
                                                                            };
                                                                            setIsTextFieldsWarehouseOrder(prev => ({
                                                                                ...prev,
                                                                                insumos: newInsumos
                                                                            }));
                                                                        }}
                                                                        onFocus={() => {
                                                                            if(isKeyboardTouch.current){
                                                                                setIsKeyboard(true);
                                                                                setIsKeyboardView(`Detalle-Pedido-Almacen-Insumo-${index}`);
                                                                                setIsIndexDetail(index);
                                                                            }
                                                                        }}
                                                                    />
                                                                    <Label_Area_12_Black>{isTextFieldsWarehouseOrder.insumos[index].mensajes[0].mensaje.length}/500</Label_Area_12_Black>
                                                                </Input_Group>
                                                                <Icon_Button_Blue_20
                                                                    onClick={() => {
                                                                        const newInsumos = [...isTextFieldsWarehouseOrder.insumos];
                                                                        newInsumos[index] = {
                                                                            ...newInsumos[index],
                                                                            mensajes: [
                                                                                {
                                                                                    ...newInsumos[index].mensajes[0],
                                                                                    mensaje: ''
                                                                                },
                                                                                ...newInsumos[index].mensajes.slice(1)
                                                                            ]
                                                                        };
                                                                        setIsTextFieldsWarehouseOrder(prev => ({
                                                                            ...prev,
                                                                            insumos: newInsumos
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
                                                        {supply?.estado === 'Aceptado' ? (
                                                            <>
                                                                <Container_Row_100_Left>
                                                                    <Label_Text_16_Black>Precio unitario:</Label_Text_16_Black>
                                                                    <Input_Group>
                                                                        <Input_Text_100_Black
                                                                            className="Input-Cantidad"
                                                                            placeholder="..."
                                                                            type="text"
                                                                            disabled={isActionBlock}
                                                                            value={supply.preciounitario ?? ''}
                                                                            onChange={(e) => {
                                                                                if(!isNaN(Number(e.target.value))){
                                                                                    const newSupplies = [...isTextFieldsWarehouseOrder.insumos];
                                                                                    const unitPrice = Number(e.target.value);
                                                                                    const quantity = Number(newSupplies[index].cantidad); 

                                                                                    newSupplies[index] = {
                                                                                        ...newSupplies[index],
                                                                                        preciounitario: e.target.value,
                                                                                        preciototal: unitPrice * quantity,
                                                                                    };
                                                                                    setIsTextFieldsWarehouseOrder(prev => ({
                                                                                        ...prev,
                                                                                        insumos: newSupplies
                                                                                    }));
                                                                                }
                                                                            }}
                                                                            onFocus={() => {
                                                                                if(isKeyboardTouch.current){
                                                                                    setIsKeyboard(true);
                                                                                    setIsKeyboardView(`Precio-Pedido-Almacen-Insumo-${index}`);
                                                                                    setIsIndexCount(index);
                                                                                }
                                                                            }}
                                                                        />
                                                                    </Input_Group>
                                                                    <Icon_Button_Blue_20
                                                                        onClick={() => {
                                                                            const newSupplies = [...isTextFieldsWarehouseOrder.insumos];
                                                                            const unitPrice = Number(0);
                                                                            const quantity = Number(newSupplies[index].cantidad); 

                                                                            newSupplies[index] = {
                                                                                ...newSupplies[index],
                                                                                preciounitario: '',
                                                                                preciototal: unitPrice * quantity,
                                                                            };
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
                                                                <Container_Row_100_Left>
                                                                    <Label_Text_16_Black>Precio total:</Label_Text_16_Black>
                                                                    <Input_Group>
                                                                        <Input_Text_100_Black
                                                                            placeholder="..."
                                                                            type="text"
                                                                            disabled
                                                                            value={supply.preciototal ?? ''}
                                                                        />
                                                                    </Input_Group>
                                                                </Container_Row_100_Left>
                                                            </>
                                                        ):(
                                                            <></>
                                                        )}
                                                    </>
                                                ):(
                                                    <>
                                                        {isSupplyOrders.find(s => s.idpedidoindividual === supply.idpedidoindividual)?.estado === 'Devolución' ? (
                                                            <>
                                                                <Container_Row_100_Center>
                                                                    {['Aceptado','Cancelado','Devolución',].map((item,indexR) => (
                                                                        <Label_Button_16_Black 
                                                                            Disabled={isActionBlock}
                                                                            key={indexR}
                                                                        >
                                                                            <Input_Radio_20
                                                                                type="radio"
                                                                                name={`type-${index}-${indexR}`}
                                                                                disabled={isActionBlock}
                                                                                value={item}
                                                                                checked={supply.estado === item}
                                                                                onChange={(e) => {
                                                                                        const newSupplies = [...isTextFieldsWarehouseOrder.insumos];
                                                                                        newSupplies[index] = {
                                                                                        ...newSupplies[index],
                                                                                        estado: e.target.value,
                                                                                        preciounitario: '',
                                                                                        preciototal: '',
                                                                                        mensajes: [
                                                                                            {
                                                                                            ...newSupplies[index].mensajes[0],
                                                                                            mensaje: ''
                                                                                            }
                                                                                        ]
                                                                                        };
                                                                                        setIsTextFieldsWarehouseOrder(prev => ({
                                                                                            ...prev,
                                                                                            insumos: newSupplies
                                                                                        }));
                                                                                    }
                                                                                }
                                                                            />
                                                                            {item}
                                                                        </Label_Button_16_Black>
                                                                    ))}
                                                                </Container_Row_100_Center>
                                                                {supply?.estado === 'Cancelado' || supply?.estado === 'Devolución' ? (
                                                                    <Container_Row_100_Left>
                                                                        <Label_Text_16_Black>Detalle:</Label_Text_16_Black>
                                                                        <Input_Group>
                                                                            <Input_Area_100_Black
                                                                                className="Input-Detalle"
                                                                                placeholder="..."
                                                                                type="text"
                                                                                maxLength={500}
                                                                                rows={3}
                                                                                disabled={isActionBlock}
                                                                                value={supply.mensajes[0].mensaje}
                                                                                onChange={(e) => {
                                                                                    const newInsumos = [...isTextFieldsWarehouseOrder.insumos];
                                                                                    newInsumos[index] = {
                                                                                        ...newInsumos[index],
                                                                                        mensajes: [
                                                                                            {
                                                                                                ...newInsumos[index].mensajes[0],
                                                                                                mensaje: e.target.value
                                                                                            },
                                                                                            ...newInsumos[index].mensajes.slice(1)
                                                                                        ]
                                                                                    };
                                                                                    setIsTextFieldsWarehouseOrder(prev => ({
                                                                                        ...prev,
                                                                                        insumos: newInsumos
                                                                                    }));
                                                                                }}
                                                                                onFocus={() => {
                                                                                    if(isKeyboardTouch.current){
                                                                                        setIsKeyboard(true);
                                                                                        setIsKeyboardView(`Detalle-Pedido-Almacen-Insumo-${index}`);
                                                                                        setIsIndexDetail(index);
                                                                                    }
                                                                                }}
                                                                            />
                                                                            <Label_Area_12_Black>{isTextFieldsWarehouseOrder.insumos[index].mensajes[0].mensaje.length}/500</Label_Area_12_Black>
                                                                        </Input_Group>
                                                                        <Icon_Button_Blue_20
                                                                            onClick={() => {
                                                                                const newInsumos = [...isTextFieldsWarehouseOrder.insumos];
                                                                                newInsumos[index] = {
                                                                                    ...newInsumos[index],
                                                                                    mensajes: [
                                                                                        {
                                                                                            ...newInsumos[index].mensajes[0],
                                                                                            mensaje: ''
                                                                                        },
                                                                                        ...newInsumos[index].mensajes.slice(1)
                                                                                    ]
                                                                                };
                                                                                setIsTextFieldsWarehouseOrder(prev => ({
                                                                                    ...prev,
                                                                                    insumos: newInsumos
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
                                                                {supply?.estado === 'Aceptado' ? (
                                                                    <>
                                                                        <Container_Row_100_Left>
                                                                            <Label_Text_16_Black>Precio unitario:</Label_Text_16_Black>
                                                                            <Input_Group>
                                                                                <Input_Text_100_Black
                                                                                    className="Input-Cantidad"
                                                                                    placeholder="..."
                                                                                    type="text"
                                                                                    disabled={isActionBlock}
                                                                                    value={supply.preciounitario ?? ''}
                                                                                    onChange={(e) => {
                                                                                        if(!isNaN(Number(e.target.value))){
                                                                                            const newSupplies = [...isTextFieldsWarehouseOrder.insumos];
                                                                                            const unitPrice = Number(e.target.value);
                                                                                            const quantity = Number(newSupplies[index].cantidad); 

                                                                                            newSupplies[index] = {
                                                                                                ...newSupplies[index],
                                                                                                preciounitario: e.target.value,
                                                                                                preciototal: unitPrice * quantity,
                                                                                            };
                                                                                            setIsTextFieldsWarehouseOrder(prev => ({
                                                                                                ...prev,
                                                                                                insumos: newSupplies
                                                                                            }));
                                                                                        }
                                                                                    }}
                                                                                    onFocus={() => {
                                                                                        if(isKeyboardTouch.current){
                                                                                            setIsKeyboard(true);
                                                                                            setIsKeyboardView(`Precio-Pedido-Almacen-Insumo-${index}`);
                                                                                            setIsIndexCount(index);
                                                                                        }
                                                                                    }}
                                                                                />
                                                                            </Input_Group>
                                                                            <Icon_Button_Blue_20
                                                                                onClick={() => {
                                                                                    const newSupplies = [...isTextFieldsWarehouseOrder.insumos];
                                                                                    const unitPrice = Number(0);
                                                                                    const quantity = Number(newSupplies[index].cantidad); 

                                                                                    newSupplies[index] = {
                                                                                        ...newSupplies[index],
                                                                                        preciounitario: '',
                                                                                        preciototal: unitPrice * quantity,
                                                                                    };
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
                                                                        <Container_Row_100_Left>
                                                                            <Label_Text_16_Black>Precio total:</Label_Text_16_Black>
                                                                            <Input_Group>
                                                                                <Input_Text_100_Black
                                                                                    placeholder="..."
                                                                                    type="text"
                                                                                    disabled
                                                                                    value={supply.preciototal ?? ''}
                                                                                />
                                                                            </Input_Group>
                                                                        </Container_Row_100_Left>
                                                                    </>
                                                                ):(
                                                                    <></>
                                                                )}
                                                            </>
                                                        ):(
                                                            <>
                                                            </>
                                                        )}
                                                        {isSupplyOrders.find(s => s.idpedidoindividual === supply.idpedidoindividual)?.estado === 'Cancelado' ? (
                                                            <Container_Row_100_Center>
                                                                <Text_Span_16_Justify_Black>{supply.mensajes[0].mensaje}</Text_Span_16_Justify_Black>
                                                            </Container_Row_100_Center>
                                                        ):(
                                                            <>
                                                            </>
                                                        )}
                                                        {isSupplyOrders.find(s => s.idpedidoindividual === supply.idpedidoindividual)?.estado === 'Aceptado' ? (
                                                            <>
                                                                <Container_Row_NG_Auto_Left>
                                                                    <Text_Color_Green_16>Precio unitario</Text_Color_Green_16>
                                                                    <Text_Span_16_Center_Black>: {supply.preciounitario}</Text_Span_16_Center_Black>
                                                                </Container_Row_NG_Auto_Left>
                                                                <Container_Row_NG_Auto_Left>
                                                                    <Text_Color_Green_16>Precio total</Text_Color_Green_16>
                                                                    <Text_Span_16_Center_Black>: {supply.preciototal}</Text_Span_16_Center_Black>
                                                                </Container_Row_NG_Auto_Left>
                                                            </>
                                                        ):(
                                                            <>
                                                            </>
                                                        )}
                                                    </>
                                                )}
                                                <Container_Row_100_Right>
                                                    <Text_Span_16_Center_Black>No. Insumo {index+1}</Text_Span_16_Center_Black>
                                                </Container_Row_100_Right>
                                            </Container_Column_100_Center>
                                        ))}
                                        {isTextFieldsWarehouseOrder.insumos.every(ing => ing.estado === 'Aceptado' || ing.estado === 'Cancelado') ? (
                                            <>
                                                <Container_Row_100_Left>
                                                    <Label_Text_16_Black>Fecha de finalización:</Label_Text_16_Black>
                                                    <Input_Text_100_Black
                                                        placeholder="..."
                                                        type="text"
                                                        value={isTextFieldsObservation.fecha}
                                                        disabled
                                                    />
                                                </Container_Row_100_Left>
                                                <Container_Row_100_Left>
                                                    <Label_Text_16_Black>Observación al proveedor:</Label_Text_16_Black>
                                                    <Input_Group>
                                                        <Input_Area_100_Black
                                                            id="Input-Observacion"
                                                            placeholder="..."
                                                            type="text"
                                                            maxLength={250}
                                                            rows={3}
                                                            disabled={isActionBlock}
                                                            value={isTextFieldsObservation.observacion}
                                                            onChange={(e) => setIsTextFieldsObservation(prev => ({...prev, observacion: e.target.value}))}
                                                            onFocus={() => {
                                                                if(isKeyboardTouch.current){
                                                                    setIsKeyboard(true);
                                                                    setIsKeyboardView(`Observacion-Pedido-Almacen`);
                                                                }
                                                            }}
                                                        />
                                                        <Label_Area_12_Black>{isTextFieldsObservation.observacion.length}/250</Label_Area_12_Black>
                                                    </Input_Group>
                                                    <Icon_Button_Blue_20
                                                        onClick={() => setIsTextFieldsObservation(prev => ({...prev, observacion: ''}))}
                                                        disabled={isActionBlock}
                                                    >
                                                        <MdCancel/>
                                                    </Icon_Button_Blue_20>
                                                </Container_Row_100_Left>
                                                <Container_Row_NG_Auto_Center>
                                                    <Text_Color_Green_16>Calificación</Text_Color_Green_16>
                                                    <Text_Span_16_Center_Black>:</Text_Span_16_Center_Black>
                                                </Container_Row_NG_Auto_Center>
                                                <Container_Row_100_Center>
                                                    {[1,2,3,4,5].map((item,indexC) => (
                                                        <Label_Button_16_Black 
                                                            Disabled={isActionBlock}
                                                            key={indexC}
                                                        >
                                                            <Input_Radio_20
                                                                type="radio"
                                                                name={`Califiaction`}
                                                                disabled={isActionBlock}
                                                                value={item}
                                                                checked={isTextFieldsObservation.calificacion === item}
                                                                onChange={(e) => setIsTextFieldsObservation(prev => ({ ...prev, calificacion: Number(e.target.value)}))}
                                                            />
                                                            {item}
                                                        </Label_Button_16_Black>
                                                    ))}
                                                </Container_Row_100_Center>
                                                <Container_Row_100_Center>
                                                    {isTextFieldsObservation.calificacion === 0 ? (
                                                        <>
                                                            <Icon_Blue_28 className='pulsate-icon-fwd-0'><FaStar/></Icon_Blue_28>
                                                            <Icon_Blue_28 className='pulsate-icon-fwd-1'><FaStar/></Icon_Blue_28>
                                                            <Icon_Blue_28 className='pulsate-icon-fwd-2'><FaStar/></Icon_Blue_28>
                                                            <Icon_Black_28 className='pulsate-icon-fwd-3'><FaStar/></Icon_Black_28>
                                                            <Icon_Black_28 className='pulsate-icon-fwd-4'><FaStar/></Icon_Black_28>
                                                        </>
                                                    ):(
                                                        isTextFieldsObservation.calificacion <= 1 ? (
                                                            <>
                                                                <Icon_Red_28 className='pulsate-icon-fwd-0'><FaStar/></Icon_Red_28>
                                                                <Icon_Black_28 className='pulsate-icon-fwd-1'><FaStar/></Icon_Black_28>
                                                                <Icon_Black_28 className='pulsate-icon-fwd-2'><FaStar/></Icon_Black_28>
                                                                <Icon_Black_28 className='pulsate-icon-fwd-3'><FaStar/></Icon_Black_28>
                                                                <Icon_Black_28 className='pulsate-icon-fwd-4'><FaStar/></Icon_Black_28>
                                                            </>
                                                        ):(
                                                            isTextFieldsObservation.calificacion <=2 ? (
                                                                <>
                                                                    <Icon_Orange_28 className='pulsate-icon-fwd-0'><FaStar/></Icon_Orange_28>
                                                                    <Icon_Orange_28 className='pulsate-icon-fwd-1'><FaStar/></Icon_Orange_28>
                                                                    <Icon_Black_28 className='pulsate-icon-fwd-2'><FaStar/></Icon_Black_28>
                                                                    <Icon_Black_28 className='pulsate-icon-fwd-3'><FaStar/></Icon_Black_28>
                                                                    <Icon_Black_28 className='pulsate-icon-fwd-4'><FaStar/></Icon_Black_28>
                                                                </>
                                                            ):(
                                                                isTextFieldsObservation.calificacion <=3 ? (
                                                                    <>
                                                                        <Icon_Yellow_28 className='pulsate-icon-fwd-0'><FaStar/></Icon_Yellow_28>
                                                                        <Icon_Yellow_28 className='pulsate-icon-fwd-1'><FaStar/></Icon_Yellow_28>
                                                                        <Icon_Yellow_28 className='pulsate-icon-fwd-2'><FaStar/></Icon_Yellow_28>
                                                                        <Icon_Black_28 className='pulsate-icon-fwd-3'><FaStar/></Icon_Black_28>
                                                                        <Icon_Black_28 className='pulsate-icon-fwd-4'><FaStar/></Icon_Black_28>
                                                                    </>
                                                                ):(
                                                                    isTextFieldsObservation.calificacion <=4 ? (
                                                                        <>
                                                                            <Icon_Lime_Green_28 className='pulsate-icon-fwd-0'><FaStar/></Icon_Lime_Green_28>
                                                                            <Icon_Lime_Green_28 className='pulsate-icon-fwd-1'><FaStar/></Icon_Lime_Green_28>
                                                                            <Icon_Lime_Green_28 className='pulsate-icon-fwd-2'><FaStar/></Icon_Lime_Green_28>
                                                                            <Icon_Lime_Green_28 className='pulsate-icon-fwd-3'><FaStar/></Icon_Lime_Green_28>
                                                                            <Icon_Black_28 className='pulsate-icon-fwd-4'><FaStar/></Icon_Black_28>
                                                                        </>
                                                                    ):(
                                                                        isTextFieldsObservation.calificacion <=5 ? (
                                                                            <>
                                                                                <Icon_Green_28 className='pulsate-icon-fwd-0'><FaStar/></Icon_Green_28>
                                                                                <Icon_Green_28 className='pulsate-icon-fwd-1'><FaStar/></Icon_Green_28>
                                                                                <Icon_Green_28 className='pulsate-icon-fwd-2'><FaStar/></Icon_Green_28>
                                                                                <Icon_Green_28 className='pulsate-icon-fwd-3'><FaStar/></Icon_Green_28>
                                                                                <Icon_Green_28 className='pulsate-icon-fwd-4'><FaStar/></Icon_Green_28>
                                                                            </>
                                                                        ):(
                                                                            <></>
                                                                        )
                                                                    )
                                                                )
                                                            )
                                                        )
                                                    )}
                                                </Container_Row_100_Center>
                                            </> 
                                        ):(
                                            <></>
                                        )}
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
                                                    </Container_Column_100_Left>
                                                    <Image_Modal_150 src={isCleaningSupplies.find(s => s.idsuministro === supply.idsuministro)?.imagen || Cleaning}/>
                                                </Container_Row_100_Center>
                                                {isCleaningSupplyOrders.find(s => s.idpedidoindividual === supply.idpedidoindividual)?.estado === 'En curso' ? (
                                                    <>
                                                        <Container_Row_100_Center>
                                                            {['Aceptado','Cancelado','Devolución',].map((item,indexR) => (
                                                                <Label_Button_16_Black 
                                                                    Disabled={isActionBlock}
                                                                    key={indexR}
                                                                >
                                                                    <Input_Radio_20
                                                                        type="radio"
                                                                        name={`type-${index}-${indexR}`}
                                                                        disabled={isActionBlock}
                                                                        value={item}
                                                                        checked={supply.estado === item}
                                                                        onChange={(e) => {
                                                                                const newCleaningSupplies = [...isTextFieldsWarehouseOrder.suministros];
                                                                                newCleaningSupplies[index] = {
                                                                                ...newCleaningSupplies[index],
                                                                                estado: e.target.value,
                                                                                preciounitario: '',
                                                                                preciototal: '',
                                                                                mensajes: [
                                                                                    {
                                                                                    ...newCleaningSupplies[index].mensajes[0],
                                                                                    mensaje: ''
                                                                                    }
                                                                                ]
                                                                                };
                                                                                setIsTextFieldsWarehouseOrder(prev => ({
                                                                                    ...prev,
                                                                                    suministros: newCleaningSupplies
                                                                                }));
                                                                            }
                                                                        }
                                                                    />
                                                                    {item}
                                                                </Label_Button_16_Black>
                                                            ))}
                                                        </Container_Row_100_Center>
                                                        {supply?.estado === 'Cancelado' || supply?.estado === 'Devolución' ? (
                                                            <Container_Row_100_Left>
                                                                <Label_Text_16_Black>Detalle:</Label_Text_16_Black>
                                                                <Input_Group>
                                                                    <Input_Area_100_Black
                                                                        className="Input-Detalle"
                                                                        placeholder="..."
                                                                        type="text"
                                                                        maxLength={500}
                                                                        rows={3}
                                                                        disabled={isActionBlock}
                                                                        value={supply.mensajes[0].mensaje}
                                                                        onChange={(e) => {
                                                                            const newSuministros = [...isTextFieldsWarehouseOrder.suministros];
                                                                            newSuministros[index] = {
                                                                                ...newSuministros[index],
                                                                                mensajes: [
                                                                                    {
                                                                                        ...newSuministros[index].mensajes[0],
                                                                                        mensaje: e.target.value
                                                                                    },
                                                                                    ...newSuministros[index].mensajes.slice(1)
                                                                                ]
                                                                            };
                                                                            setIsTextFieldsWarehouseOrder(prev => ({
                                                                                ...prev,
                                                                                suministros: newSuministros
                                                                            }));
                                                                        }}
                                                                        onFocus={() => {
                                                                            if(isKeyboardTouch.current){
                                                                                setIsKeyboard(true);
                                                                                setIsKeyboardView(`Detalle-Pedido-Almacen-Sumnistro-${index}`);
                                                                                setIsIndexDetail(index);
                                                                            }
                                                                        }}
                                                                    />
                                                                    <Label_Area_12_Black>{isTextFieldsWarehouseOrder.suministros[index].mensajes[0].mensaje.length}/500</Label_Area_12_Black>
                                                                </Input_Group>
                                                                <Icon_Button_Blue_20
                                                                    onClick={() => {
                                                                        const newSuministros = [...isTextFieldsWarehouseOrder.suministros];
                                                                        newSuministros[index] = {
                                                                            ...newSuministros[index],
                                                                            mensajes: [
                                                                                {
                                                                                    ...newSuministros[index].mensajes[0],
                                                                                    mensaje: ''
                                                                                },
                                                                                ...newSuministros[index].mensajes.slice(1)
                                                                            ]
                                                                        };
                                                                        setIsTextFieldsWarehouseOrder(prev => ({
                                                                            ...prev,
                                                                            suministros: newSuministros
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
                                                        {supply?.estado === 'Aceptado' ? (
                                                            <>
                                                                <Container_Row_100_Left>
                                                                    <Label_Text_16_Black>Precio unitario:</Label_Text_16_Black>
                                                                    <Input_Group>
                                                                        <Input_Text_100_Black
                                                                            className="Input-Cantidad"
                                                                            placeholder="..."
                                                                            type="text"
                                                                            disabled={isActionBlock}
                                                                            value={supply.preciounitario ?? ''}
                                                                            onChange={(e) => {
                                                                                if(!isNaN(Number(e.target.value))){
                                                                                    const newCleaningSupplies = [...isTextFieldsWarehouseOrder.suministros];
                                                                                    const unitPrice = Number(e.target.value);
                                                                                    const quantity = Number(newCleaningSupplies[index].cantidad); 

                                                                                    newCleaningSupplies[index] = {
                                                                                        ...newCleaningSupplies[index],
                                                                                        preciounitario: e.target.value,
                                                                                        preciototal: unitPrice * quantity,
                                                                                    };
                                                                                    setIsTextFieldsWarehouseOrder(prev => ({
                                                                                        ...prev,
                                                                                        suministros: newCleaningSupplies
                                                                                    }));
                                                                                }
                                                                            }}
                                                                            onFocus={() => {
                                                                                if(isKeyboardTouch.current){
                                                                                    setIsKeyboard(true);
                                                                                    setIsKeyboardView(`Precio-Pedido-Almacen-Suministro-${index}`);
                                                                                    setIsIndexCount(index);
                                                                                }
                                                                            }}
                                                                        />
                                                                    </Input_Group>
                                                                    <Icon_Button_Blue_20
                                                                        onClick={() => {
                                                                            const newCleaningSupplies = [...isTextFieldsWarehouseOrder.suministros];
                                                                            const unitPrice = Number(0);
                                                                            const quantity = Number(newCleaningSupplies[index].cantidad); 

                                                                            newCleaningSupplies[index] = {
                                                                                ...newCleaningSupplies[index],
                                                                                preciounitario: '',
                                                                                preciototal: unitPrice * quantity,
                                                                            };
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
                                                                <Container_Row_100_Left>
                                                                    <Label_Text_16_Black>Precio total:</Label_Text_16_Black>
                                                                    <Input_Group>
                                                                        <Input_Text_100_Black
                                                                            placeholder="..."
                                                                            type="text"
                                                                            disabled
                                                                            value={supply.preciototal ?? ''}
                                                                        />
                                                                    </Input_Group>
                                                                </Container_Row_100_Left>
                                                            </>
                                                        ):(
                                                            <></>
                                                        )}
                                                    </>
                                                ):(
                                                    <>
                                                        {isCleaningSupplyOrders.find(s => s.idpedidoindividual === supply.idpedidoindividual)?.estado === 'Devolución' ? (
                                                            <>
                                                                <Container_Row_100_Center>
                                                                    {['Aceptado','Cancelado','Devolución',].map((item,indexR) => (
                                                                        <Label_Button_16_Black 
                                                                            Disabled={isActionBlock}
                                                                            key={indexR}
                                                                        >
                                                                            <Input_Radio_20
                                                                                type="radio"
                                                                                name={`type-${index}-${indexR}`}
                                                                                disabled={isActionBlock}
                                                                                value={item}
                                                                                checked={supply.estado === item}
                                                                                onChange={(e) => {
                                                                                        const newCleaningSupplies = [...isTextFieldsWarehouseOrder.suministros];
                                                                                        newCleaningSupplies[index] = {
                                                                                        ...newCleaningSupplies[index],
                                                                                        estado: e.target.value,
                                                                                        preciounitario: '',
                                                                                        preciototal: '',
                                                                                        mensajes: [
                                                                                            {
                                                                                            ...newCleaningSupplies[index].mensajes[0],
                                                                                            mensaje: ''
                                                                                            }
                                                                                        ]
                                                                                        };
                                                                                        setIsTextFieldsWarehouseOrder(prev => ({
                                                                                            ...prev,
                                                                                            suministros: newCleaningSupplies
                                                                                        }));
                                                                                    }
                                                                                }
                                                                            />
                                                                            {item}
                                                                        </Label_Button_16_Black>
                                                                    ))}
                                                                </Container_Row_100_Center>
                                                                {supply?.estado === 'Cancelado' || supply?.estado === 'Devolución' ? (
                                                                    <Container_Row_100_Left>
                                                                        <Label_Text_16_Black>Detalle:</Label_Text_16_Black>
                                                                        <Input_Group>
                                                                            <Input_Area_100_Black
                                                                                className="Input-Detalle"
                                                                                placeholder="..."
                                                                                type="text"
                                                                                maxLength={500}
                                                                                rows={3}
                                                                                disabled={isActionBlock}
                                                                                value={supply.mensajes[0].mensaje}
                                                                                onChange={(e) => {
                                                                                    const newSuministros = [...isTextFieldsWarehouseOrder.suministros];
                                                                                    newSuministros[index] = {
                                                                                        ...newSuministros[index],
                                                                                        mensajes: [
                                                                                            {
                                                                                                ...newSuministros[index].mensajes[0],
                                                                                                mensaje: e.target.value
                                                                                            },
                                                                                            ...newSuministros[index].mensajes.slice(1)
                                                                                        ]
                                                                                    };
                                                                                    setIsTextFieldsWarehouseOrder(prev => ({
                                                                                        ...prev,
                                                                                        suministros: newSuministros
                                                                                    }));
                                                                                }}
                                                                                onFocus={() => {
                                                                                    if(isKeyboardTouch.current){
                                                                                        setIsKeyboard(true);
                                                                                        setIsKeyboardView(`Detalle-Pedido-Almacen-Sumnistro-${index}`);
                                                                                        setIsIndexDetail(index);
                                                                                    }
                                                                                }}
                                                                            />
                                                                            <Label_Area_12_Black>{isTextFieldsWarehouseOrder.suministros[index].mensajes[0].mensaje.length}/500</Label_Area_12_Black>
                                                                        </Input_Group>
                                                                        <Icon_Button_Blue_20
                                                                            onClick={() => {
                                                                                const newSuministros = [...isTextFieldsWarehouseOrder.suministros];
                                                                                newSuministros[index] = {
                                                                                    ...newSuministros[index],
                                                                                    mensajes: [
                                                                                        {
                                                                                            ...newSuministros[index].mensajes[0],
                                                                                            mensaje: ''
                                                                                        },
                                                                                        ...newSuministros[index].mensajes.slice(1)
                                                                                    ]
                                                                                };
                                                                                setIsTextFieldsWarehouseOrder(prev => ({
                                                                                    ...prev,
                                                                                    suministros: newSuministros
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
                                                                {supply?.estado === 'Aceptado' ? (
                                                                    <>
                                                                        <Container_Row_100_Left>
                                                                            <Label_Text_16_Black>Precio unitario:</Label_Text_16_Black>
                                                                            <Input_Group>
                                                                                <Input_Text_100_Black
                                                                                    className="Input-Cantidad"
                                                                                    placeholder="..."
                                                                                    type="text"
                                                                                    disabled={isActionBlock}
                                                                                    value={supply.preciounitario ?? ''}
                                                                                    onChange={(e) => {
                                                                                        if(!isNaN(Number(e.target.value))){
                                                                                            const newCleaningSupplies = [...isTextFieldsWarehouseOrder.suministros];
                                                                                            const unitPrice = Number(e.target.value);
                                                                                            const quantity = Number(newCleaningSupplies[index].cantidad); 

                                                                                            newCleaningSupplies[index] = {
                                                                                                ...newCleaningSupplies[index],
                                                                                                preciounitario: e.target.value,
                                                                                                preciototal: unitPrice * quantity,
                                                                                            };
                                                                                            setIsTextFieldsWarehouseOrder(prev => ({
                                                                                                ...prev,
                                                                                                suministros: newCleaningSupplies
                                                                                            }));
                                                                                        }
                                                                                    }}
                                                                                    onFocus={() => {
                                                                                        if(isKeyboardTouch.current){
                                                                                            setIsKeyboard(true);
                                                                                            setIsKeyboardView(`Precio-Pedido-Almacen-Suministro-${index}`);
                                                                                            setIsIndexCount(index);
                                                                                        }
                                                                                    }}
                                                                                />
                                                                            </Input_Group>
                                                                            <Icon_Button_Blue_20
                                                                                onClick={() => {
                                                                                    const newCleaningSupplies = [...isTextFieldsWarehouseOrder.suministros];
                                                                                    const unitPrice = Number(0);
                                                                                    const quantity = Number(newCleaningSupplies[index].cantidad); 

                                                                                    newCleaningSupplies[index] = {
                                                                                        ...newCleaningSupplies[index],
                                                                                        preciounitario: '',
                                                                                        preciototal: unitPrice * quantity,
                                                                                    };
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
                                                                        <Container_Row_100_Left>
                                                                            <Label_Text_16_Black>Precio total:</Label_Text_16_Black>
                                                                            <Input_Group>
                                                                                <Input_Text_100_Black
                                                                                    placeholder="..."
                                                                                    type="text"
                                                                                    disabled
                                                                                    value={supply.preciototal ?? ''}
                                                                                />
                                                                            </Input_Group>
                                                                        </Container_Row_100_Left>
                                                                    </>
                                                                ):(
                                                                    <></>
                                                                )}
                                                            </>
                                                        ):(
                                                            <>
                                                            </>
                                                        )}
                                                        {isCleaningSupplyOrders.find(s => s.idpedidoindividual === supply.idpedidoindividual)?.estado === 'Cancelado' ? (
                                                            <Container_Row_100_Center>
                                                                <Text_Span_16_Justify_Black>{supply.mensajes[0].mensaje}</Text_Span_16_Justify_Black>
                                                            </Container_Row_100_Center>
                                                        ):(
                                                            <>
                                                            </>
                                                        )}
                                                        {isCleaningSupplyOrders.find(s => s.idpedidoindividual === supply.idpedidoindividual)?.estado === 'Aceptado' ? (
                                                            <>
                                                                <Container_Row_NG_Auto_Left>
                                                                    <Text_Color_Green_16>Precio unitario</Text_Color_Green_16>
                                                                    <Text_Span_16_Center_Black>: {supply.preciounitario}</Text_Span_16_Center_Black>
                                                                </Container_Row_NG_Auto_Left>
                                                                <Container_Row_NG_Auto_Left>
                                                                    <Text_Color_Green_16>Precio total</Text_Color_Green_16>
                                                                    <Text_Span_16_Center_Black>: {supply.preciototal}</Text_Span_16_Center_Black>
                                                                </Container_Row_NG_Auto_Left>
                                                            </>
                                                        ):(
                                                            <>
                                                            </>
                                                        )}
                                                    </>
                                                )}
                                                <Container_Row_100_Right>
                                                    <Text_Span_16_Center_Black>No. Suministro {index+1}</Text_Span_16_Center_Black>
                                                </Container_Row_100_Right>
                                            </Container_Column_100_Center>
                                        ))}
                                        {isTextFieldsWarehouseOrder.suministros.every(ing => ing.estado === 'Aceptado' || ing.estado === 'Cancelado') ? (
                                            <>
                                                <Container_Row_100_Left>
                                                    <Label_Text_16_Black>Fecha de finalización:</Label_Text_16_Black>
                                                    <Input_Text_100_Black
                                                        placeholder="..."
                                                        type="text"
                                                        value={isTextFieldsObservation.fecha}
                                                        disabled
                                                    />
                                                </Container_Row_100_Left>
                                                <Container_Row_100_Left>
                                                    <Label_Text_16_Black>Observación al proveedor:</Label_Text_16_Black>
                                                    <Input_Group>
                                                        <Input_Area_100_Black
                                                            id="Input-Observacion"
                                                            placeholder="..."
                                                            type="text"
                                                            maxLength={250}
                                                            rows={3}
                                                            disabled={isActionBlock}
                                                            value={isTextFieldsObservation.observacion}
                                                            onChange={(e) => setIsTextFieldsObservation(prev => ({...prev, observacion: e.target.value}))}
                                                            onFocus={() => {
                                                                if(isKeyboardTouch.current){
                                                                    setIsKeyboard(true);
                                                                    setIsKeyboardView(`Observacion-Pedido-Almacen`);
                                                                }
                                                            }}
                                                        />
                                                        <Label_Area_12_Black>{isTextFieldsObservation.observacion.length}/250</Label_Area_12_Black>
                                                    </Input_Group>
                                                    <Icon_Button_Blue_20
                                                        onClick={() => setIsTextFieldsObservation(prev => ({...prev, observacion: ''}))}
                                                        disabled={isActionBlock}
                                                    >
                                                        <MdCancel/>
                                                    </Icon_Button_Blue_20>
                                                </Container_Row_100_Left>
                                                <Container_Row_NG_Auto_Center>
                                                    <Text_Color_Green_16>Calificación</Text_Color_Green_16>
                                                    <Text_Span_16_Center_Black>:</Text_Span_16_Center_Black>
                                                </Container_Row_NG_Auto_Center>
                                                <Container_Row_100_Center>
                                                    {[1,2,3,4,5].map((item,indexC) => (
                                                        <Label_Button_16_Black 
                                                            Disabled={isActionBlock}
                                                            key={indexC}
                                                        >
                                                            <Input_Radio_20
                                                                type="radio"
                                                                name={`Califiaction`}
                                                                disabled={isActionBlock}
                                                                value={item}
                                                                checked={isTextFieldsObservation.calificacion === item}
                                                                onChange={(e) => setIsTextFieldsObservation(prev => ({ ...prev, calificacion: Number(e.target.value)}))}
                                                            />
                                                            {item}
                                                        </Label_Button_16_Black>
                                                    ))}
                                                </Container_Row_100_Center>
                                                <Container_Row_100_Center>
                                                    {isTextFieldsObservation.calificacion === 0 ? (
                                                        <>
                                                            <Icon_Blue_28 className='pulsate-icon-fwd-0'><FaStar/></Icon_Blue_28>
                                                            <Icon_Blue_28 className='pulsate-icon-fwd-1'><FaStar/></Icon_Blue_28>
                                                            <Icon_Blue_28 className='pulsate-icon-fwd-2'><FaStar/></Icon_Blue_28>
                                                            <Icon_Black_28 className='pulsate-icon-fwd-3'><FaStar/></Icon_Black_28>
                                                            <Icon_Black_28 className='pulsate-icon-fwd-4'><FaStar/></Icon_Black_28>
                                                        </>
                                                    ):(
                                                        isTextFieldsObservation.calificacion <= 1 ? (
                                                            <>
                                                                <Icon_Red_28 className='pulsate-icon-fwd-0'><FaStar/></Icon_Red_28>
                                                                <Icon_Black_28 className='pulsate-icon-fwd-1'><FaStar/></Icon_Black_28>
                                                                <Icon_Black_28 className='pulsate-icon-fwd-2'><FaStar/></Icon_Black_28>
                                                                <Icon_Black_28 className='pulsate-icon-fwd-3'><FaStar/></Icon_Black_28>
                                                                <Icon_Black_28 className='pulsate-icon-fwd-4'><FaStar/></Icon_Black_28>
                                                            </>
                                                        ):(
                                                            isTextFieldsObservation.calificacion <=2 ? (
                                                                <>
                                                                    <Icon_Orange_28 className='pulsate-icon-fwd-0'><FaStar/></Icon_Orange_28>
                                                                    <Icon_Orange_28 className='pulsate-icon-fwd-1'><FaStar/></Icon_Orange_28>
                                                                    <Icon_Black_28 className='pulsate-icon-fwd-2'><FaStar/></Icon_Black_28>
                                                                    <Icon_Black_28 className='pulsate-icon-fwd-3'><FaStar/></Icon_Black_28>
                                                                    <Icon_Black_28 className='pulsate-icon-fwd-4'><FaStar/></Icon_Black_28>
                                                                </>
                                                            ):(
                                                                isTextFieldsObservation.calificacion <=3 ? (
                                                                    <>
                                                                        <Icon_Yellow_28 className='pulsate-icon-fwd-0'><FaStar/></Icon_Yellow_28>
                                                                        <Icon_Yellow_28 className='pulsate-icon-fwd-1'><FaStar/></Icon_Yellow_28>
                                                                        <Icon_Yellow_28 className='pulsate-icon-fwd-2'><FaStar/></Icon_Yellow_28>
                                                                        <Icon_Black_28 className='pulsate-icon-fwd-3'><FaStar/></Icon_Black_28>
                                                                        <Icon_Black_28 className='pulsate-icon-fwd-4'><FaStar/></Icon_Black_28>
                                                                    </>
                                                                ):(
                                                                    isTextFieldsObservation.calificacion <=4 ? (
                                                                        <>
                                                                            <Icon_Lime_Green_28 className='pulsate-icon-fwd-0'><FaStar/></Icon_Lime_Green_28>
                                                                            <Icon_Lime_Green_28 className='pulsate-icon-fwd-1'><FaStar/></Icon_Lime_Green_28>
                                                                            <Icon_Lime_Green_28 className='pulsate-icon-fwd-2'><FaStar/></Icon_Lime_Green_28>
                                                                            <Icon_Lime_Green_28 className='pulsate-icon-fwd-3'><FaStar/></Icon_Lime_Green_28>
                                                                            <Icon_Black_28 className='pulsate-icon-fwd-4'><FaStar/></Icon_Black_28>
                                                                        </>
                                                                    ):(
                                                                        isTextFieldsObservation.calificacion <=5 ? (
                                                                            <>
                                                                                <Icon_Green_28 className='pulsate-icon-fwd-0'><FaStar/></Icon_Green_28>
                                                                                <Icon_Green_28 className='pulsate-icon-fwd-1'><FaStar/></Icon_Green_28>
                                                                                <Icon_Green_28 className='pulsate-icon-fwd-2'><FaStar/></Icon_Green_28>
                                                                                <Icon_Green_28 className='pulsate-icon-fwd-3'><FaStar/></Icon_Green_28>
                                                                                <Icon_Green_28 className='pulsate-icon-fwd-4'><FaStar/></Icon_Green_28>
                                                                            </>
                                                                        ):(
                                                                            <></>
                                                                        )
                                                                    )
                                                                )
                                                            )
                                                        )
                                                    )}
                                                </Container_Row_100_Center>
                                            </> 
                                        ):(
                                            <></>
                                        )}
                                    </>
                                ):(
                                    <></>
                                )}
                                <Modal_Form_Button_End
                                    onAction={() => handleWarehouseOrderEnd()}
                                    onCancel={() => handleModalViewWarehouse('')}
                                />
                            </Container_Modal_Form>
                        </Container_Modal_Form_White>
                    </Container_Modal_Form_White_600>
                    <Keyboard_Form_Warehouse_Order/>
                </Container_Modal_Background_Black>
            ):(
                currentMView === 'Pedido-Almacen-Finalizar' ? (
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