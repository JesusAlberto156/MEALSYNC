//____________IMPORT/EXPORT____________
// Hooks de React
import { useContext,useEffect } from "react";
// Contextos
import { ModalContext,ModalViewContext,SidebarContext } from "../../../../../contexts/ViewsProvider";
import { SelectedRowContext } from "../../../../../contexts/SelectedesProvider";
import { TextFieldsWarehouseOrderContext } from "../../../../../contexts/FormsProvider";
import { RefModalContext,RefFormContext,RefKeyboardContext,RefKeyboardTouchContext } from "../../../../../contexts/RefsProvider";
import { CountSupplyTypesContext,SuppliesContext,SupplyTypesContext } from "../../../../../contexts/SuppliesProvider";
import { DeletedOrdersContext } from "../../../../../contexts/WarehouseProvider";
import { SuppliersContext } from "../../../../../contexts/SuppliersProvider";
import { ActionBlockContext,TouchContext,KeyboardContext,KeyboardViewContext,IndexDetailContext } from "../../../../../contexts/VariablesProvider";
import { CleaningSuppliesContext,CountCleaningCategoriesContext,CleaningCategoriesContext } from "../../../../../contexts/ExtrasProvider";
// Hooks personalizados
import { HandleModalViewWarehouse } from "../../../../../hooks/warehouse/Views";
import { HandleKeyboard } from "../../../../../hooks/Views";
import { HandleWarehouseOrderVerificationAdd } from "../../../../../hooks/warehouse/Forms";
//__________IMAGENES__________
import Supply from '../../../../imgs/Supply.jpg'
import Cleaning from '../../../../imgs/Cleaning.jpg'
//__________IMAGENES__________
//__________ICONOS__________
import { MdCancel } from "react-icons/md";
import { BsClipboardPlusFill } from "react-icons/bs";
//__________ICONOS__________
// Estilos personalizados
import { Container_Modal_Background_Black,Container_Row_100_Center,Container_Row_NG_Auto_Center,Container_Modal_Form_White,Container_Modal_Form,Container_Modal_Form_White_600, Container_Column_100_Center, Container_Row_NG_Auto_Left, Container_Column_100_Left, Container_Row_100_Left, Container_Row_100_Right } from "../../../../styled/Containers";
import { Text_Span_16_Center_Black,Text_Color_Blue_16,Text_Title_28_Black,Text_Color_Green_16,Text_Title_20_Black } from "../../../../styled/Text";
import { Label_Button_16_Black,Label_Text_16_Black,Label_Area_12_Black } from "../../../../styled/Labels";
import { Icon_Button_Blue_20 } from "../../../../styled/Icons";
import { Input_Radio_20,Input_Area_100_Black,Input_Group } from "../../../../styled/Inputs";
import { Alert_Sonner_Warning } from "../../../../styled/Alerts";
// Componentes personalizados
import Error_View from "../../../errors/View";
import { Modal_Form_Button_Add } from "../../../../forms/Button";
import { Image_Modal, Image_Modal_150 } from "../../../../styled/Imgs";
import { Keyboard_Form_Warehouse_Order } from "../../../../keyboards/Form";
//____________IMPORT/EXPORT____________

// Modal para visualizar los detalles de los pedidos de almacén de su tabla
export default function Warehouse_Order_Verification_Add(){
    // Constantes con el valor de los contextos
    const [isSelectedRow,setIsSelectedRow] = useContext(SelectedRowContext);
    const [currentMView] = useContext(ModalViewContext);
    const [isModal] = useContext(ModalContext);
    const [isTextFieldsWarehouseOrder,setIsTextFieldsWarehouseOrder] = useContext(TextFieldsWarehouseOrderContext);
    const Modal = useContext(RefModalContext);
    const isForm = useContext(RefFormContext); 
    const [isSidebar,setIsSidebar] = useContext(SidebarContext);
    const [isDeletedOrders] = useContext(DeletedOrdersContext);
    const [isSuppliers] = useContext(SuppliersContext);
    const [isSupplies] = useContext(SuppliesContext);
    const [isCleaningSupplies] = useContext(CleaningSuppliesContext); 
    const [isCountCleaningCategories] = useContext(CountCleaningCategoriesContext);
    const [isCleaningCategories] = useContext(CleaningCategoriesContext);
    const [isCountSupplyTypes] = useContext(CountSupplyTypesContext);
    const [isSupplyTypes] = useContext(SupplyTypesContext); 
    const [isActionBlock] = useContext(ActionBlockContext);
    const [isKeyboard,setIsKeyboard] = useContext(KeyboardContext);
    const [isKeyboardView,setIsKeyboardView] = useContext(KeyboardViewContext);
    const Keyboard = useContext(RefKeyboardContext);
    const isKeyboardTouch = useContext(RefKeyboardTouchContext);
    const [isTouch] = useContext(TouchContext);
    const [isIndexDetail,setIsIndexDetail] = useContext(IndexDetailContext);
    // Constantes con la funcionalidad de los hooks
    const handleModalViewWarehouse = HandleModalViewWarehouse();
    const handleWarehouseOrderVerificationAdd = HandleWarehouseOrderVerificationAdd();
    const { KeyboardView,KeyboardClick } = HandleKeyboard();
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
    // Estructura del componente
    return(
        <>
            {isModal && isSelectedRow !== null ? (
                <Container_Modal_Background_Black ref={Modal}>
                    <Image_Modal/>
                    <Container_Modal_Form_White_600 ref={isForm} className={currentMView === 'Pedido-Almacen-Verificacion-Agregar' ? 'slide-in-container-top' : 'slide-out-container-top'}>
                        <Container_Modal_Form_White>
                            <Container_Modal_Form>
                                <Text_Title_28_Black>REVISIÓN DEL PEDIDO NO. {isTextFieldsWarehouseOrder?.idpedido || 'Desconocido'}</Text_Title_28_Black>
                                <Container_Row_NG_Auto_Center>
                                    <Text_Color_Blue_16>MEALSYNC</Text_Color_Blue_16>
                                    <Text_Span_16_Center_Black>: Datos generales</Text_Span_16_Center_Black>
                                </Container_Row_NG_Auto_Center>
                                <Container_Row_NG_Auto_Center>
                                    <Text_Color_Green_16>Fecha</Text_Color_Green_16>
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
                                                        <Container_Row_NG_Auto_Left>
                                                            <Text_Color_Green_16>Cantidad</Text_Color_Green_16>
                                                            <Text_Span_16_Center_Black>: {supply.cantidad}</Text_Span_16_Center_Black>
                                                        </Container_Row_NG_Auto_Left>
                                                    </Container_Column_100_Left>
                                                    <Image_Modal_150 src={isSupplies.find(s => s.idinsumo === supply.idinsumo)?.imagen || Supply}/>
                                                </Container_Row_100_Center>
                                                <Container_Row_100_Center>
                                                    {['Eliminar','Mantener','Modificar',].map((item,indexR) => (
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
                                                                        newSupplies[index].estado = e.target.value;
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
                                                {supply?.estado === 'Modificar' ? (
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
                                                                const count = isCountCleaningCategories.find(c => c.idcantidad === S.idcantidad);
                                                                const category = isCleaningCategories.find(t => t.idcategoria === S.idcategoria);
                                                                const s = count.cantidad !== 1 ? 's':'';
                                                                if(!count || !category) return;
                                                                return `: ${count.cantidad} ${category.unidad}${s}`
                                                            })()}</Text_Span_16_Center_Black>
                                                        </Container_Row_NG_Auto_Left>
                                                        <Container_Row_NG_Auto_Left>
                                                            <Text_Color_Green_16>Cantidad</Text_Color_Green_16>
                                                            <Text_Span_16_Center_Black>: {supply.cantidad}</Text_Span_16_Center_Black>
                                                        </Container_Row_NG_Auto_Left>
                                                    </Container_Column_100_Left>
                                                    <Image_Modal_150 src={isCleaningSupplies.find(s => s.idsuministro === supply.idsuministro)?.imagen || Cleaning}/>
                                                </Container_Row_100_Center>
                                                <Container_Row_100_Center>
                                                    {['Eliminar','Mantener','Modificar',].map((item,indexR) => (
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
                                                                        newCleaningSupplies[index].estado = e.target.value;
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
                                                {supply?.estado === 'Modificar' ? (
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
                                                <Container_Row_100_Right>
                                                    <Text_Span_16_Center_Black>No. Suministro {index+1}</Text_Span_16_Center_Black>
                                                </Container_Row_100_Right>
                                            </Container_Column_100_Center>
                                        ))}
                                    </>
                                ):(
                                    <></>
                                )}
                                <Modal_Form_Button_Add
                                    icon={<BsClipboardPlusFill/>}
                                    onAction={() => handleWarehouseOrderVerificationAdd()}
                                    onCancel={() => handleModalViewWarehouse('')}
                                />
                            </Container_Modal_Form>
                        </Container_Modal_Form_White>
                    </Container_Modal_Form_White_600>
                    <Keyboard_Form_Warehouse_Order/>
                </Container_Modal_Background_Black>
            ):(
                currentMView === 'Pedido-Almacen-Verificacion-Agregar' ? (
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