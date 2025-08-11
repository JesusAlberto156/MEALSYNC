//____________IMPORT/EXPORT____________
// Hooks de React
import { useContext,useEffect,useState } from "react";
import { useNavigate } from "react-router-dom";
// Contextos
import { ModalContext,ModalViewContext,SidebarContext } from "../../../../contexts/ViewsProvider";
import { TextFieldsWarehouseOrderContext } from "../../../../contexts/FormsProvider";
import { ActionBlockContext,KeyboardViewContext,KeyboardContext,TouchContext,IndexCountContext } from "../../../../contexts/VariablesProvider";
import { DeletedCleaningSuppliesContext,CleaningTypesContext,CleaningSuppliesContext,CountCleaningTypesContext } from "../../../../contexts/ExtrasProvider";
import { DeletedSuppliersContext } from "../../../../contexts/SuppliersProvider";
import { CleaningSupplyOrderAddContext,SupplyOrderAddContext } from "../../../../contexts/WarehouseProvider";
import { SuppliesContext,DeletedSuppliesContext,CountSupplyTypesContext } from "../../../../contexts/SuppliesProvider";
import { SearchTerm1Context } from "../../../../contexts/SearchsProvider";
import { SupplyTypesContext } from "../../../../contexts/SuppliesProvider";
import { SocketContext } from "../../../../contexts/SocketProvider";
import { LoggedUserContext } from "../../../../contexts/SessionProvider";
import { SelectedRowContext } from "../../../../contexts/SelectedesProvider";
import { RefKeyboardContext,RefKeyboardTouchContext } from "../../../../contexts/RefsProvider";
// Hooks personalizados
import { FilteredRecordsSuppliers,FilteredRecordsDeletedSuppliers,HandleTextProducts,HandleWarehouseOrderAdd } from "../../../../hooks/warehouse/Forms";
import { HandleModalViewWarehouse } from "../../../../hooks/warehouse/Views";
import { HandleKeyboard } from "../../../../hooks/Views";
//__________IMAGENES__________
import Supply from '../../../imgs/Supply.jpg'
import Cleaning from '../../../imgs/Cleaning.jpg'
//__________IMAGENES__________
//__________ICONOS__________
import { MdDelete } from "react-icons/md";
import { IoIosAddCircle } from "react-icons/io";
import { MdCancel } from "react-icons/md";
import { FcSearch } from "react-icons/fc";
//__________ICONOS__________
// Estilos personalizados
import { Container_Modal_Background_Black,Container_Row_100_Left,Container_Row_100_Center,Container_Row_NG_Auto_Center,Container_Modal_Form_White_600,Container_Modal_Form_White,Container_Modal_Form,Container_Meal_100_Center,Container_Row_100_Right, Container_Order_100_Center } from "../../../styled/Containers";
import { Text_Span_16_Center_Black,Text_Color_Blue_16,Text_Title_28_Black,Text_Color_Green_16,Text_Title_20_Black } from "../../../styled/Text";
import { Label_Button_16_Black,Label_Text_12_Black,Label_Text_16_Black } from "../../../styled/Labels";
import { Icon_Button_Blue_20,Icon_20,Icon_24 } from "../../../styled/Icons";
import { Input_Text_100_Black,Input_Group,Input_Radio_20,Input_Text_60_Black } from "../../../styled/Inputs";
import { Alert_Sonner_Promise } from "../../../styled/Alerts";
import { Modal_Form_Button_Add } from "../../../forms/Button";
// Componetes personalizados
import { Image_Modal,Image_Modal_150 } from "../../../styled/Imgs";
import { Keyboard_Form_Warehouse_Order } from "../../../keyboards/Form";
import { Select_300 } from "../../../styled/Selects";
import { Button_Icon_Green_60, Button_Icon_Red_60 } from "../../../styled/Buttons";
import { Tooltip } from "@mui/material";
//____________IMPORT/EXPORT____________

// Modal para agregar un pedido de almacén
export default function Warehouse_Order_Add(){
    // Constantes con el valor de los contextos
    const [isActionBlock,setIsActionBlock] = useContext(ActionBlockContext);
    const [isModal,setIsModal] = useContext(ModalContext);
    const [currentMView,setCurrentMView] = useContext(ModalViewContext);
    const [isSupplies] = useContext(SuppliesContext);
    const [isCountSupplyTypes] = useContext(CountSupplyTypesContext);
    const [isDeletedSupplies] = useContext(DeletedSuppliesContext);
    const [isDeletedSuppliers] = useContext(DeletedSuppliersContext);
    const [isSupplyOrderAdd,setIsSupplyOrderAdd] = useContext(SupplyOrderAddContext);
    const [isCleaningSupplyOrderAdd,setIsCleaningSupplyOrderAdd] = useContext(CleaningSupplyOrderAddContext);
    const [isSupplyTypes] = useContext(SupplyTypesContext);
    const [isCleaningTypes] = useContext(CleaningTypesContext); 
    const [isCountCleaningTypes] = useContext(CountCleaningTypesContext);
    const [isCleaningSupplies] = useContext(CleaningSuppliesContext);
    const [isDeletedCleaningSupplies] = useContext(DeletedCleaningSuppliesContext);
    const [isSearchTerm1,setIsSearchTerm1] = useContext(SearchTerm1Context);
    const [isSelectedRow,setIsSelectedRow] = useContext(SelectedRowContext);
    const [socket] = useContext(SocketContext);
    const [isTextFieldsWarehouseOrder,setIsTextFieldsWarehouseOrder] = useContext(TextFieldsWarehouseOrderContext);
    const [isLoggedUser] = useContext(LoggedUserContext);
    const [isSidebar,setIsSidebar] = useContext(SidebarContext);
    const [isKeyboard,setIsKeyboard] = useContext(KeyboardContext);
    const [isKeyboardView,setIsKeyboardView] = useContext(KeyboardViewContext);
    const Keyboard = useContext(RefKeyboardContext);
    const isKeyboardTouch = useContext(RefKeyboardTouchContext);
    const [isTouch] = useContext(TouchContext);
    const [isIndexCount,setIsIndexCount] = useContext(IndexCountContext);
    // Constantes con la funcionalidad de los hooks
    const navigate = useNavigate();
    const handleModalViewWarehouse = HandleModalViewWarehouse();
    const handleWarehouseOrderAdd = HandleWarehouseOrderAdd();
    const filteredRecordsSuppliers = FilteredRecordsSuppliers();
    const filteredRecordsDeletedSuppliers = FilteredRecordsDeletedSuppliers();
    const { KeyboardView,KeyboardClick } = HandleKeyboard();
    const { SupplyAdd,SupplyDelete,CleaningSupplyAdd,CleaningSupplyDelete } = HandleTextProducts();
    // Constantes con el valor de useState
    const [isTotalCampus,setIsTotalCampus] = useState(0);
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
            setIsTextFieldsWarehouseOrder((prev) => ({
                ...prev,
                fecha: getFormattedDateTime()
            }));
        }, 1000);

        return () => clearInterval(interval);
    },[])
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
    // UseEffects para el limite de caracteres de los campos del formulario
    useEffect(() => {
        setIsTotalCampus(isTextFieldsWarehouseOrder.campus.length);
    },[isTextFieldsWarehouseOrder.campus]);
    useEffect(() => {
        if(isTextFieldsWarehouseOrder.idproveedor !== 0){
            if(isDeletedSuppliers.some(supplier => supplier.idproveedor === isTextFieldsWarehouseOrder.idproveedor)){
                setIsTextFieldsWarehouseOrder(prev => ({
                    ...prev,
                    idproveedor: 0,
                }));
            }
        }
    },[isDeletedSuppliers]);
    useEffect(() => {
        if(isTextFieldsWarehouseOrder.idproveedor !== 0){
            setIsTextFieldsWarehouseOrder(prev => ({
                ...prev,
                idproveedor: 0,
            }));
        }
    },[isSearchTerm1]);
    useEffect(() => {
        if(isTextFieldsWarehouseOrder.tipo === 'Insumo' && isTextFieldsWarehouseOrder.insumos.length !== 0){
            const updatedInsumos = isTextFieldsWarehouseOrder.insumos.map(insumo => {
                if(isDeletedSupplies.some(supply => supply.idinsumo === insumo.idinsumo)){
                    return {
                        ...insumo,
                        idinsumo: 0,
                    }
                }

                return insumo;
            });

            setIsTextFieldsWarehouseOrder(prev => ({
                ...prev,
                insumos: updatedInsumos
            }));
        }
        if(isTextFieldsWarehouseOrder.tipo === 'Suministro de limpieza' && isTextFieldsWarehouseOrder.suministros.length !== 0){
            const updatedSuministros = isTextFieldsWarehouseOrder.suministros.map(suministro => {
                if(isDeletedCleaningSupplies.some(supply => supply.idsuministro === suministro.idsuministro)){
                    return {
                        ...suministro,
                        idsuministro: 0,
                    }
                }

                return suministro;
            });

            setIsTextFieldsWarehouseOrder(prev => ({
                ...prev,
                suministros: updatedSuministros
            }));
        }
    },[isDeletedSupplies,isDeletedCleaningSupplies]);
    useEffect(() => {
        setIsTextFieldsWarehouseOrder(prev => ({
            ...prev,
            insumos: [{
                idpedidoindividual: 0,
                fecha: '',
                idinsumo: 0,
                idtipo: 0,
                idcategoria: 0,
                cantidadreal: 0,
                cantidad: '',
                preciounitario: '',
                preciototal: '',
                idpedido: '',
                estado: '',
            }],
            suministros: [{
                idpedidoindividual: 0,
                fecha: '',
                idtipo: 0,
                idcategoria: 0,
                cantidadreal: 0,
                idsuministro: 0,
                cantidad: '',
                preciounitario: '',
                preciototal: '',
                idpedido: '',
                estado: '',
            }]
        }));
    },[isTextFieldsWarehouseOrder.tipo,isTextFieldsWarehouseOrder.idproveedor]);
    // UseEffect para agregar datos a la base de datos
    useEffect(() => {
        if(isSupplyOrderAdd){
            const promise = new Promise((resolve,reject) => {
                try{
                    setTimeout(() => {
                        socket.emit('Insert-Supply-Order',isLoggedUser.idusuario,isTextFieldsWarehouseOrder.idpedido.trim(),isTextFieldsWarehouseOrder.campus.trim(),isTextFieldsWarehouseOrder.idproveedor,isLoggedUser.idusuario,isTextFieldsWarehouseOrder.insumos);

                        resolve('¡Agregó al pedido de almacén!');

                        setIsSupplyOrderAdd(false);

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
                    setIsSupplyOrderAdd(false);
                    return reject('¡Ocurrio un error inesperado!');
                }
            });

            return Alert_Sonner_Promise(promise,'¡Agregando al pedido de almacén!','2');
        }
        if(isCleaningSupplyOrderAdd){
            const promise = new Promise((resolve,reject) => {
                try{
                    setTimeout(() => {
                        socket.emit('Insert-Cleaning-Supply-Order',isLoggedUser.idusuario,isTextFieldsWarehouseOrder.idpedido.trim(),isTextFieldsWarehouseOrder.campus.trim(),isTextFieldsWarehouseOrder.idproveedor,isLoggedUser.idusuario,isTextFieldsWarehouseOrder.suministros);

                        resolve('¡Agregó al pedido de almacén!');

                        setIsCleaningSupplyOrderAdd(false);

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
                    setIsCleaningSupplyOrderAdd(false);
                    return reject('¡Ocurrio un error inesperado!');
                }
            });

            return Alert_Sonner_Promise(promise,'¡Agregando al pedido de almacén!','2');
        }
    },[isSupplyOrderAdd,isCleaningSupplyOrderAdd]);
    // Estructura del componente
    return(
        <>
            {isModal ? (
                <>
                    <Container_Modal_Background_Black>
                        <Image_Modal/>
                        <Container_Modal_Form_White_600 className={currentMView === 'Pedido-Almacen-Agregar' ? 'slide-in-container-top' : 'slide-out-container-top'}>
                            <Container_Modal_Form_White>
                                <Container_Modal_Form>
                                    <Text_Title_28_Black>AGREGAR PEDIDO DE ALMACÉN</Text_Title_28_Black>
                                    <Container_Row_NG_Auto_Center>
                                        <Text_Color_Blue_16>MEALSYNC</Text_Color_Blue_16>
                                        <Text_Span_16_Center_Black>: Datos generales</Text_Span_16_Center_Black>
                                    </Container_Row_NG_Auto_Center>
                                    <Container_Row_100_Left>
                                        <Label_Text_16_Black>ID Pedido:</Label_Text_16_Black>
                                        <Input_Group>
                                            <Input_Text_100_Black
                                                id="Input-ID"
                                                placeholder="..."
                                                type="text"
                                                disabled={isActionBlock}
                                                value={isTextFieldsWarehouseOrder.idpedido}
                                                onChange={(e) => {
                                                    if(!isNaN(Number(e.target.value))){
                                                        setIsTextFieldsWarehouseOrder(prev => ({...prev, idpedido: e.target.value}))
                                                    }
                                                }}
                                                onFocus={() => {
                                                    if(isKeyboardTouch.current){
                                                        setIsKeyboard(true);
                                                        setIsKeyboardView('ID-Pedido-Almacen');
                                                    }
                                                }}
                                            />
                                        </Input_Group>
                                        <Icon_Button_Blue_20
                                            onClick={() => {
                                                setIsTextFieldsWarehouseOrder(prev => ({...prev, idpedido: ''}))
                                            }}
                                            disabled={isActionBlock}
                                        >
                                            <MdCancel/>
                                        </Icon_Button_Blue_20>
                                    </Container_Row_100_Left>
                                    <Container_Row_100_Left>
                                        <Label_Text_16_Black>Fecha de inicio:</Label_Text_16_Black>
                                        <Input_Text_100_Black
                                            placeholder="..."
                                            type="text"
                                            value={isTextFieldsWarehouseOrder.fecha}
                                            disabled
                                        />
                                    </Container_Row_100_Left>
                                    <Container_Row_100_Left>
                                        <Label_Text_16_Black>Campus:</Label_Text_16_Black>
                                        <Input_Group>
                                            <Input_Text_100_Black
                                                id="Input-Campus"
                                                placeholder="..."
                                                type="text"
                                                maxLength={50}
                                                disabled={isActionBlock}
                                                value={isTextFieldsWarehouseOrder.campus}
                                                onChange={(e) => setIsTextFieldsWarehouseOrder(prev => ({...prev, campus: e.target.value}))}
                                                onFocus={() => {
                                                    if(isKeyboardTouch.current){
                                                        setIsKeyboard(true);
                                                        setIsKeyboardView('Campus-Pedido-Almacen');
                                                    }
                                                }}
                                            />
                                            <Label_Text_12_Black>{isTotalCampus}/50</Label_Text_12_Black>
                                        </Input_Group>
                                        <Icon_Button_Blue_20
                                            onClick={() => {
                                                setIsTextFieldsWarehouseOrder(prev => ({...prev, campus: ''}))
                                            }}
                                            disabled={isActionBlock}
                                        >
                                            <MdCancel/>
                                        </Icon_Button_Blue_20>
                                    </Container_Row_100_Left>
                                    <Container_Row_NG_Auto_Center>
                                        <Text_Color_Green_16>Proveedor</Text_Color_Green_16>
                                        <Text_Span_16_Center_Black>:</Text_Span_16_Center_Black>
                                    </Container_Row_NG_Auto_Center>
                                    {filteredRecordsDeletedSuppliers.length !== 0 ? (
                                        <>
                                            <Container_Row_100_Center>
                                                <Icon_24><FcSearch/></Icon_24>
                                                <Input_Text_60_Black
                                                    className="Input-Buscador"
                                                    type="text"
                                                    placeholder="Buscar..."
                                                    value={isSearchTerm1}
                                                    onChange={(e) => setIsSearchTerm1(e.target.value)}
                                                    onFocus={() => {
                                                        if(isKeyboardTouch.current){
                                                            setIsKeyboard(true);
                                                            setIsKeyboardView(`Buscador-Proveedor-Pedido-Almacen`);
                                                        }
                                                    }}
                                                    disabled={isActionBlock}
                                                />
                                            </Container_Row_100_Center>
                                            <Select_300
                                                data={filteredRecordsSuppliers.length}
                                                options={filteredRecordsSuppliers.map((supplier) => ({
                                                    value: supplier.idproveedor,
                                                    label: supplier.nombre
                                                }))}
                                                placeholder='Proveedores...'
                                                value={filteredRecordsSuppliers
                                                    .map(supplier => ({ value: supplier.idproveedor, label: supplier.nombre }))
                                                    .find(option => option.value === isTextFieldsWarehouseOrder.idproveedor)
                                                }
                                                onChange={(e) => {
                                                    if (e) {
                                                        setIsTextFieldsWarehouseOrder(prev => ({
                                                            ...prev,
                                                            idproveedor: e.value,
                                                        }));
                                                    } else {
                                                        setIsTextFieldsWarehouseOrder(prev => ({
                                                            ...prev,
                                                            idproveedor: 0,
                                                        }));
                                                    }
                                                }}
                                                isDisabled={isActionBlock}
                                            />
                                        </>
                                    ):(
                                        <Container_Row_100_Center>
                                            <Text_Span_16_Center_Black>¡No hay datos disponibles!</Text_Span_16_Center_Black>
                                        </Container_Row_100_Center>
                                    )}
                                    <Container_Row_NG_Auto_Center>
                                        <Text_Color_Blue_16>MEALSYNC</Text_Color_Blue_16>
                                        <Text_Span_16_Center_Black>: Datos específicos</Text_Span_16_Center_Black>
                                    </Container_Row_NG_Auto_Center>
                                    <Container_Row_NG_Auto_Center>
                                        <Text_Color_Green_16>Tipo de pedido</Text_Color_Green_16>
                                        <Text_Span_16_Center_Black>:</Text_Span_16_Center_Black>
                                    </Container_Row_NG_Auto_Center>
                                    <Container_Row_100_Center>
                                        {['Insumo','Suministro de limpieza'].map((item,index) => (
                                            <Label_Button_16_Black 
                                                Disabled={isActionBlock}
                                                key={index}
                                            >
                                                <Input_Radio_20
                                                    type="radio"
                                                    name="type"
                                                    disabled={isActionBlock}
                                                    value={item}
                                                    checked={isTextFieldsWarehouseOrder.tipo === item}
                                                    onChange={(e) => setIsTextFieldsWarehouseOrder(prev => ({...prev, tipo: e.target.value}))}
                                                />
                                                {item}
                                            </Label_Button_16_Black>
                                        ))}
                                    </Container_Row_100_Center>
                                    <Container_Row_NG_Auto_Center>
                                        <Text_Color_Green_16>Asignación de {isTextFieldsWarehouseOrder.tipo === 'Insumo' ? 'Insumos' : isTextFieldsWarehouseOrder.tipo === 'Suministro de limpieza' ? 'Suministros' : 'Materiales'}</Text_Color_Green_16>
                                        <Text_Span_16_Center_Black>:</Text_Span_16_Center_Black>
                                    </Container_Row_NG_Auto_Center>
                                    {isTextFieldsWarehouseOrder.tipo === '' ? (
                                        <Container_Row_100_Center>
                                            <Text_Span_16_Center_Black>¡No hay selección de tipo!</Text_Span_16_Center_Black>
                                        </Container_Row_100_Center>
                                    ):(
                                        <>
                                            {isTextFieldsWarehouseOrder.tipo === 'Insumo' ? (
                                                <>    
                                                    {isTextFieldsWarehouseOrder.insumos.map((supply,index) => {
                                                        
                                                        const getFilteredSupplies = (index) => {
                                                            return isSupplies.filter((data) => {
                                                                if(data.idproveedor !== isTextFieldsWarehouseOrder.idproveedor) return false;
                                                                const isDeleted = isDeletedSupplies.some(del => del.idinsumo === data.idinsumo);
                                                                const isAlreadySelected = isTextFieldsWarehouseOrder.insumos.some((ing, i) =>
                                                                    i !== index && ing.idinsumo === data.idinsumo
                                                                );
                                                                return !isDeleted && !isAlreadySelected;
                                                            });
                                                        };
                                                        const filteredRecordsSupplies = getFilteredSupplies(index); 
                                                        
                                                        supply.idpedido = isTextFieldsWarehouseOrder.idpedido;
                                                        
                                                        return (
                                                            <Container_Order_100_Center key={index}>
                                                                <Select_300
                                                                    data={filteredRecordsSupplies.length}
                                                                    options={filteredRecordsSupplies.map((s) => ({
                                                                        value: s.idinsumo,
                                                                        label: s.nombre
                                                                    }))}
                                                                    placeholder='Insumos...'
                                                                    value={filteredRecordsSupplies
                                                                        .map(s => ({ value: s.idinsumo, label: s.nombre }))
                                                                        .find(option => option.value === supply.idinsumo)
                                                                    }
                                                                    onChange={(e) => {
                                                                        if(e){
                                                                            setIsTextFieldsWarehouseOrder(prev => {
                                                                                const newSupplies = [...prev.insumos];
                                                                                newSupplies[index] = {
                                                                                    ...newSupplies[index],
                                                                                    idinsumo: e.value
                                                                                };
                                                                                return {
                                                                                    ...prev,
                                                                                    insumos: newSupplies
                                                                                };
                                                                            });
                                                                        }else{
                                                                            setIsTextFieldsWarehouseOrder(prev => {
                                                                                const newSupplies = [...prev.insumos];
                                                                                newSupplies[index] = {
                                                                                    ...newSupplies[index],
                                                                                    idinsumo: 0,
                                                                                };
                                                                                return {
                                                                                    ...prev,
                                                                                    insumos: newSupplies
                                                                                };
                                                                            });
                                                                        }
                                                                    }}
                                                                    isDisabled={isActionBlock}
                                                                />
                                                                <Image_Modal_150 src={isSupplies.find(s => s.idinsumo === supply.idinsumo)?.imagen || Supply}/>
                                                                <Container_Row_NG_Auto_Center>
                                                                    <Text_Color_Green_16>Unidad</Text_Color_Green_16>
                                                                    <Text_Span_16_Center_Black>: {(() => {
                                                                                                const Supply = isSupplies.find(s => s.idinsumo === supply.idinsumo);
                                                                                                if (!Supply) return 'Desconocida';
                                                                                                const count = isCountSupplyTypes.find(count => count.idcantidad === Supply.idcantidad);
                                                                                                const type = isSupplyTypes.find(type => type.idtipo === Supply.idtipo);
                                                                                                if (!count || !type) return 'Desconocida';
                                                                                                const s = count.cantidad !== 1 ? 's' : '';
                                                                                                return `${count.cantidad} ${type.unidad}${s}` || 'Desconocida'
                                                                                            })()}
                                                                    </Text_Span_16_Center_Black>
                                                                </Container_Row_NG_Auto_Center>                           
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
                                                                <Container_Row_100_Center>
                                                                    <Container_Row_100_Left>
                                                                        <Text_Title_20_Black>No. Insumo: {index+1}</Text_Title_20_Black>
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
                                                            </Container_Order_100_Center>
                                                        );
                                                    })}
                                                    {isActionBlock ? (
                                                        <Button_Icon_Green_60 disabled>
                                                            <Icon_20><IoIosAddCircle/></Icon_20>
                                                        </Button_Icon_Green_60>
                                                    ):(
                                                        <Tooltip title='Agregar' placement="top">
                                                            <Button_Icon_Green_60
                                                                onClick={() => SupplyAdd()}
                                                            >
                                                                <Icon_20><IoIosAddCircle/></Icon_20>
                                                            </Button_Icon_Green_60>
                                                        </Tooltip>
                                                    )}
                                                </>
                                            ):(
                                                <></>
                                            )}
                                            {isTextFieldsWarehouseOrder.tipo === 'Suministro de limpieza' ? (
                                                <>
                                                    {isTextFieldsWarehouseOrder.suministros.map((cleaningSupply,index) => {
                                                        
                                                        const getFilteredCleaningSupplies = (index) => {
                                                            return isCleaningSupplies.filter((data) => {
                                                                if(data.idproveedor !== isTextFieldsWarehouseOrder.idproveedor) return false;
                                                                const isDeleted = isDeletedCleaningSupplies.some(del => del.idsuministro === data.idsuministro);
                                                                const isAlreadySelected = isTextFieldsWarehouseOrder.suministros.some((ing, i) =>
                                                                    i !== index && ing.idsuministro === data.idsuministro
                                                                );
                                                                return !isDeleted && !isAlreadySelected;
                                                            });
                                                        };
                                                        const filteredRecordsCleaningSupplies = getFilteredCleaningSupplies(index); 
                                                        
                                                        cleaningSupply.idpedido = isTextFieldsWarehouseOrder.idpedido;
                                                        
                                                        return (
                                                            <Container_Order_100_Center key={index}>
                                                                <Select_300
                                                                    data={filteredRecordsCleaningSupplies.length}
                                                                    options={filteredRecordsCleaningSupplies.map((s) => ({
                                                                        value: s.idsuministro,
                                                                        label: s.nombre
                                                                    }))}
                                                                    placeholder='Suministros...'
                                                                    value={filteredRecordsCleaningSupplies
                                                                        .map(s => ({ value: s.idsuministro, label: s.nombre }))
                                                                        .find(option => option.value === cleaningSupply.idsuministro)
                                                                    }
                                                                    onChange={(e) => {
                                                                        if(e){
                                                                            setIsTextFieldsWarehouseOrder(prev => {
                                                                                const newCleaningSupplies = [...prev.suministros];
                                                                                newCleaningSupplies[index] = {
                                                                                    ...newCleaningSupplies[index],
                                                                                    idsuministro: e.value
                                                                                };
                                                                                return {
                                                                                    ...prev,
                                                                                    suministros: newCleaningSupplies
                                                                                };
                                                                            });
                                                                        }else{
                                                                            setIsTextFieldsWarehouseOrder(prev => {
                                                                                const newCleaningSupplies = [...prev.suministros];
                                                                                newCleaningSupplies[index] = {
                                                                                    ...newCleaningSupplies[index],
                                                                                    idsuministro: 0,
                                                                                };
                                                                                return {
                                                                                    ...prev,
                                                                                    suministros: newCleaningSupplies
                                                                                };
                                                                            });
                                                                        }
                                                                    }}
                                                                    isDisabled={isActionBlock}
                                                                />
                                                                <Image_Modal_150 src={isCleaningSupplies.find(s => s.idsuministro === cleaningSupply.idsuministro)?.imagen || Cleaning}/>
                                                                <Container_Row_NG_Auto_Center>
                                                                    <Text_Color_Green_16>Unidad</Text_Color_Green_16>
                                                                    <Text_Span_16_Center_Black>: {(() => {
                                                                                                const CleaningSupply = isCleaningSupplies.find(s => s.idsuministro === cleaningSupply.idsuministro);
                                                                                                if (!CleaningSupply) return 'Desconocida';
                                                                                                const count = isCountCleaningTypes.find(count => count.idcantidad === CleaningSupply.idcantidad);
                                                                                                const type = isCleaningTypes.find(type => type.idtipo === CleaningSupply.idtipo);
                                                                                                if (!count || !type) return 'Desconocida';
                                                                                                const s = count.cantidad !== 1 ? 's' : '';
                                                                                                return `${count.cantidad} ${type.unidad}${s}` || 'Desconocida'
                                                                                            })()}
                                                                    </Text_Span_16_Center_Black>
                                                                </Container_Row_NG_Auto_Center>                           
                                                                <Container_Row_100_Left>
                                                                    <Label_Text_16_Black>Cantidad:</Label_Text_16_Black>
                                                                    <Input_Group>
                                                                        <Input_Text_100_Black
                                                                            className="Input-Cantidad"
                                                                            placeholder="..."
                                                                            type="text"
                                                                            disabled={isActionBlock}
                                                                            value={cleaningSupply.cantidad}
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
                                                                <Container_Row_100_Center>
                                                                    <Container_Row_100_Left>
                                                                        <Text_Title_20_Black>No. Suministro: {index+1}</Text_Title_20_Black>
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
                                                            </Container_Order_100_Center>
                                                        );
                                                    })}
                                                    {isActionBlock ? (
                                                        <Button_Icon_Green_60 disabled>
                                                            <Icon_20><IoIosAddCircle/></Icon_20>
                                                        </Button_Icon_Green_60>
                                                    ):(
                                                        <Tooltip title='Agregar' placement="top">
                                                            <Button_Icon_Green_60
                                                                onClick={() => CleaningSupplyAdd()}
                                                            >
                                                                <Icon_20><IoIosAddCircle/></Icon_20>
                                                            </Button_Icon_Green_60>
                                                        </Tooltip>
                                                    )}
                                                </>
                                            ):(
                                                <></>
                                            )}
                                        </>
                                    )}
                                    <Modal_Form_Button_Add
                                        onCancel={() => handleModalViewWarehouse('')}
                                        onAction={() => handleWarehouseOrderAdd()}
                                    />
                                </Container_Modal_Form>
                            </Container_Modal_Form_White>
                        </Container_Modal_Form_White_600>
                        <Keyboard_Form_Warehouse_Order/>
                    </Container_Modal_Background_Black>
                </>
            ):(
                <></>
            )}
        </>
    );
}