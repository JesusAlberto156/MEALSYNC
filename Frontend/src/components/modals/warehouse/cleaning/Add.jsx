//____________IMPORT/EXPORT____________
// Hooks de React
import { useContext,useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// Contextos
import { ModalContext,ModalViewContext,SidebarContext } from "../../../../contexts/ViewsProvider";
import { ActionBlockContext,KeyboardContext,KeyboardViewContext,TouchContext } from "../../../../contexts/VariablesProvider";
import { TextFieldsWarehouseCleaningContext } from "../../../../contexts/FormsProvider";
import { RefKeyboardContext,RefKeyboardTouchContext } from "../../../../contexts/RefsProvider";
import { SocketContext } from "../../../../contexts/SocketProvider";
import { LoggedUserContext } from "../../../../contexts/SessionProvider";
import { SelectedRowContext } from "../../../../contexts/SelectedesProvider";
import { WarehouseCleaningAddContext,WarehouseCleaningTypesContext } from "../../../../contexts/WarehouseProvider";
import { CleaningCategoriesContext,CleaningTypesContext } from "../../../../contexts/ExtrasProvider";
// Hooks personalizados
import { HandleModalViewWarehouse } from "../../../../hooks/warehouse/Views";
import { HandleWarehouseCleaningAdd } from "../../../../hooks/warehouse/Forms";
import { HandleKeyboard } from "../../../../hooks/Views";
//__________ICONOS__________
// Icono para realizar la función del modal
import { MdCancel } from "react-icons/md";
import { MdOutlineAttachMoney } from "react-icons/md";
//__________ICONOS__________
// Estilos personalizados
import { Container_Modal_Background_Black,Container_Row_100_Left,Container_Row_NG_Auto_Center,Container_Modal_Form_White_600,Container_Modal_Form_White,Container_Modal_Form, Container_Row_100_Center } from "../../../styled/Containers";
import { Text_Span_16_Center_Black,Text_Color_Blue_16,Text_Title_28_Black, Text_Color_Green_16, Text_Color_Red_16 } from "../../../styled/Text";
import { Input_Text_100_Black,Input_Group, Input_Radio_20 } from "../../../styled/Inputs";
import { Icon_Button_Blue_20 } from "../../../styled/Icons";
import { Alert_Sonner_Promise } from "../../../styled/Alerts";
import { Label_Button_16_Black, Label_Text_16_Black } from "../../../styled/Labels";
// Componentes personalizados
import { Image_Modal } from "../../../styled/Imgs";
import { Modal_Form_Button_Add } from "../../../forms/Button";
import { Keyboard_Form_Warehouse_Products } from "../../../keyboards/Form";
import { Select_300 } from "../../../styled/Selects";
import { Calendar_Input_100_Black } from "../../../styled/Calendars";
//____________IMPORT/EXPORT____________

// Modal para agregar venta de suministro a su tabla
export default function Warehouse_Cleaning_Supply_Add(){
    // Constantes con el valor de los contextos
    const [currentMView,setCurrentMView] = useContext(ModalViewContext);
    const [isModal,setIsModal] = useContext(ModalContext);
    const [isActionBlock,setIsActionBlock] = useContext(ActionBlockContext);
    const [socket] = useContext(SocketContext);
    const [isLoggedUser] = useContext(LoggedUserContext);
    const [isKeyboard,setIsKeyboard] = useContext(KeyboardContext);
    const [isKeyboardView,setIsKeyboardView] = useContext(KeyboardViewContext);
    const Keyboard = useContext(RefKeyboardContext);
    const isKeyboardTouch = useContext(RefKeyboardTouchContext);
    const [isTouch] = useContext(TouchContext);
    const [isSidebar,setIsSidebar] = useContext(SidebarContext);
    const [isSelectedRow,setIsSelectedRow] = useContext(SelectedRowContext); 
    const [isWarehouseCleaningAdd,setIsWarehouseCleaningAdd] = useContext(WarehouseCleaningAddContext);
    const [isTextFieldsWarehouseCleaning,setIsTextFieldsWarehouseCleaning] = useContext(TextFieldsWarehouseCleaningContext);
    const [isCleaningCategories] = useContext(CleaningCategoriesContext);
    const [isWarehouseCleaningTypes] = useContext(WarehouseCleaningTypesContext); 
    const [isCleaningTypes] = useContext(CleaningTypesContext);
    // Constantes con el valor de los useState
    const [isDateType,setIsDateType] = useState('');
    // Constantes con la funcionalidad de los hooks
    const navigate = useNavigate();
    const handleModalViewWarehouse = HandleModalViewWarehouse();
    const handleWarehouseCleaningAdd = HandleWarehouseCleaningAdd();
    const { KeyboardView,KeyboardClick } = HandleKeyboard();
    // useEffect para obtener los datos del almacén
    useEffect(() => {
        if(isTextFieldsWarehouseCleaning.idtipo !== 0){
            const filteredPurchases = isWarehouseCleaningTypes.filter((data) => {
                if(data.transaccion === 'Consumo') return false;

                return data.idtipo === isTextFieldsWarehouseCleaning.idtipo;
            });
            const totalsPurchases = filteredPurchases.reduce((index,item) => {
                const exist = index.find(type => type.idtipo === item.idtipo);
                if(exist){
                    exist.cantidadreal += item.cantidadreal;
                    exist.precio += item.precio;
                }else{
                    index.push({...item});
                }
                return index;
            },[]);

            const filteredSales = isWarehouseCleaningTypes.filter((data) => {
                if(data.transaccion === 'Compra') return false;

                return data.idtipo === isTextFieldsWarehouseCleaning.idtipo;
            });
            const totalsSales = filteredSales.reduce((index,item) => {
                const exist = index.find(type => type.idtipo === item.idtipo);
                if(exist){
                    exist.cantidadreal += item.cantidadreal;
                    exist.precio += item.precio;
                }else{
                    index.push({...item});
                }
                return index;
            },[]);

            const cantidadTotalCompra = totalsPurchases.reduce((sum, item) => sum + item.cantidadreal, 0);
            const precioTotalCompra = totalsPurchases.reduce((sum, item) => sum + item.precio, 0);

            const cantidadTotalVenta = totalsSales.reduce((sum, item) => sum + item.cantidadreal, 0);
            const precioTotalVenta = totalsSales.reduce((sum, item) => sum + item.precio, 0);

            const cantidadTotal = cantidadTotalCompra - cantidadTotalVenta;
            const precioTotal = precioTotalCompra - precioTotalVenta;

            if(currentMView === 'Almacen-Venta-Suministro-Agregar'){
                const preciounitario = (precioTotal/cantidadTotal)
                
                const precio = (isTextFieldsWarehouseCleaning.cantidadreal * preciounitario)

                setIsTextFieldsWarehouseCleaning(prev => ({
                    ...prev,
                    preciototal: Math.max(precioTotal,0),
                    cantidadtotal: cantidadTotal,
                    preciounitario: Math.max(preciounitario,0),
                    precio: precio,
                }));
            }

            if(currentMView === 'Almacen-Compra-Suministro-Agregar'){
                
                const precio = (isTextFieldsWarehouseCleaning.cantidadreal * isTextFieldsWarehouseCleaning.preciounitario)

                setIsTextFieldsWarehouseCleaning(prev => ({
                    ...prev,
                    preciototal: Math.max(precioTotal,0),
                    cantidadtotal: cantidadTotal,
                    precio: precio,
                }));
            }
        }else{
            setIsTextFieldsWarehouseCleaning(prev => ({
                ...prev,
                preciototal: 0,
                cantidadtotal: 0,
                preciounitario: 0,
                precio: 0,
            }));
        }
    },[isTextFieldsWarehouseCleaning.idtipo]);
    // Useffect para controlar el sidebar
    useEffect(() => {
        if(isSidebar){
            setIsSidebar(false);
        }
    },[]);
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
        if(isDateType === 'Automática'){
            const interval = setInterval(() => {
                setIsTextFieldsWarehouseCleaning((prev) => ({
                    ...prev,
                    fecha: getFormattedDateTime()
                }));
            }, 1000);

            return () => clearInterval(interval);
        }else{
            setIsTextFieldsWarehouseCleaning(prev => ({
                ...prev,
                fecha: '',
            }));
        }
    },[isDateType]);
    useEffect(() => {
        if(isTextFieldsWarehouseCleaning.fecha === null){
            setIsTextFieldsWarehouseCleaning(prev => ({
                ...prev,
                fecha: '',
            }));
        }
    },[isTextFieldsWarehouseCleaning.fecha]);
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
        if(isWarehouseCleaningAdd){
            const promise = new Promise((resolve,reject) => {
                try{
                    setTimeout(() => {
                        socket.emit('Insert-Warehouse-Cleaning',isLoggedUser.idusuario,isTextFieldsWarehouseCleaning.cantidadreal,isTextFieldsWarehouseCleaning.precio,isTextFieldsWarehouseCleaning.fecha,isTextFieldsWarehouseCleaning.idtipo,isTextFieldsWarehouseCleaning.idcategoria,currentMView === 'Almacen-Compra-Suministro-Agregar' ? 'Compra' : 'Consumo',isDateType);

                        if(currentMView === 'Almacen-Compra-Suministro-Agregar'){
                            resolve('¡Agregó la compra de suministro!');
                        }else{
                            resolve('¡Agregó el consumo de suministro!');
                        }

                        setIsWarehouseCleaningAdd(false)

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
                            setIsSelectedRow(null);
                            setIsActionBlock(false);
                            return navigate(route,{ replace: true });
                        },750);
                    },1000);
                }catch(e){
                    setIsActionBlock(false);
                    setIsWarehouseCleaningAdd(false);
                    return reject('¡Ocurrio un error inesperado!');
                }
            });

            Alert_Sonner_Promise(promise,currentMView === 'Almacen-Compra-Suministro-Agregar' ? '¡Agregando una compra de suministro!' : '¡Agregando un consumo de suministro!','2');
        }
    },[isWarehouseCleaningAdd]);
    // Estructura del componente
    return(
        <>
            {isModal ? (
                <Container_Modal_Background_Black>
                    <Image_Modal/>
                    <Container_Modal_Form_White_600 className={currentMView === 'Almacen-Venta-Suministro-Agregar' || currentMView === 'Almacen-Compra-Suministro-Agregar' ? 'slide-in-container-top' : 'slide-out-container-top'}>
                        <Container_Modal_Form_White>
                            <Container_Modal_Form>
                                {currentMView === 'Almacen-Venta-Suministro-Agregar' ? (
                                    <Text_Title_28_Black>AGREGAR CONSUMO DE SUMINISTRO</Text_Title_28_Black>
                                ):(
                                    <></>
                                )}
                                {currentMView === 'Almacen-Compra-Suministro-Agregar' ? (
                                    <Text_Title_28_Black>AGREGAR COMPRA DE SUMINISTRO</Text_Title_28_Black>
                                ):(
                                    <></>
                                )}
                                <Container_Row_NG_Auto_Center>
                                    <Text_Color_Blue_16>MEALSYNC</Text_Color_Blue_16>
                                    <Text_Span_16_Center_Black>: Datos generales</Text_Span_16_Center_Black>
                                </Container_Row_NG_Auto_Center>
                                <Select_300
                                    data={isCleaningTypes.length}
                                    options={isCleaningTypes.map((type) => ({
                                        value: type.idtipo,
                                        label: type.tipo
                                    }))}
                                    placeholder='Sumnistros...'
                                    value={isCleaningTypes
                                        .map(type => ({ value: type.idtipo, label: type.tipo }))
                                        .find(option => option.value === isTextFieldsWarehouseCleaning.idtipo)
                                    }
                                    onChange={(e) => {
                                        if (e) {
                                            setIsTextFieldsWarehouseCleaning(prev => ({
                                                ...prev,
                                                idtipo: e.value,
                                                idcategoria: isCleaningTypes.find(c => c.idtipo === e.value)?.idcategoria,
                                                unidad: isCleaningTypes.find(c => c.idtipo === e.value)?.unidad,
                                            }));
                                        } else {
                                            setIsTextFieldsWarehouseCleaning(prev => ({
                                                ...prev,
                                                idtipo: 0,
                                                idcategoria: 0,
                                                unidad : '',
                                            }));
                                        }
                                    }}
                                    isDisabled={isActionBlock}
                                />  
                                <Container_Row_NG_Auto_Center>
                                    <Text_Color_Green_16>Unidad</Text_Color_Green_16>
                                    <Text_Span_16_Center_Black>: {isTextFieldsWarehouseCleaning.unidad || 'Desconocida'}</Text_Span_16_Center_Black>
                                </Container_Row_NG_Auto_Center>
                                <Container_Row_NG_Auto_Center>
                                    <Text_Color_Green_16>Categoría de suministro</Text_Color_Green_16>
                                    <Text_Span_16_Center_Black>: {isCleaningCategories.find(c => c.idcategoria === isTextFieldsWarehouseCleaning.idcategoria)?.nombre || 'Desconocida'}</Text_Span_16_Center_Black>
                                </Container_Row_NG_Auto_Center>
                                <Container_Row_NG_Auto_Center>
                                    <Text_Color_Green_16>Almacén</Text_Color_Green_16>
                                    <Text_Span_16_Center_Black>:</Text_Span_16_Center_Black>
                                </Container_Row_NG_Auto_Center>
                                <Container_Row_100_Left>
                                    <Text_Color_Red_16>Cantidad</Text_Color_Red_16>
                                    <Text_Span_16_Center_Black>: {isTextFieldsWarehouseCleaning.cantidadtotal || 0}</Text_Span_16_Center_Black>
                                </Container_Row_100_Left>
                                <Container_Row_100_Left>
                                    <Text_Color_Red_16>Valor total</Text_Color_Red_16>
                                    <Text_Span_16_Center_Black>: <MdOutlineAttachMoney/> {isTextFieldsWarehouseCleaning.preciototal || 0} MXN</Text_Span_16_Center_Black>
                                </Container_Row_100_Left>
                                {currentMView === 'Almacen-Venta-Suministro-Agregar' ? (
                                    <Container_Row_100_Left>
                                        <Text_Color_Red_16>Valor unitario</Text_Color_Red_16>
                                        <Text_Span_16_Center_Black>: <MdOutlineAttachMoney/> {isTextFieldsWarehouseCleaning.preciounitario || 0} MXN</Text_Span_16_Center_Black>
                                    </Container_Row_100_Left>
                                ):(
                                    <></>
                                )}
                                <Container_Row_NG_Auto_Center>
                                    <Text_Color_Blue_16>MEALSYNC</Text_Color_Blue_16>
                                    <Text_Span_16_Center_Black>: Datos específicos</Text_Span_16_Center_Black>
                                </Container_Row_NG_Auto_Center>
                                <Container_Row_100_Center>
                                    {['Automática','Personalizada'].map((item,index) => (
                                        <Label_Button_16_Black 
                                            Disabled={isActionBlock}
                                            key={index}
                                        >
                                            <Input_Radio_20
                                                type="radio"
                                                name="type"
                                                disabled={isActionBlock}
                                                value={item}
                                                checked={isDateType === item}
                                                onChange={(e) => setIsDateType(e.target.value)}
                                            />
                                            {item}
                                        </Label_Button_16_Black>
                                    ))}
                                </Container_Row_100_Center>
                                {isDateType === 'Personalizada' ? (
                                    <Container_Row_100_Left>
                                        <Label_Text_16_Black>Fecha de operación:</Label_Text_16_Black>
                                        <Calendar_Input_100_Black
                                            date={isTextFieldsWarehouseCleaning.fecha}
                                            isDateType={isDateType}
                                            onChangeDate={(date) => {
                                                setIsTextFieldsWarehouseCleaning((prev) => ({
                                                    ...prev,
                                                    fecha: date,
                                                }));
                                            }}
                                        />
                                    </Container_Row_100_Left>
                                ):(
                                    <></>
                                )}
                                {isDateType === 'Automática' ? (
                                    <Container_Row_100_Left>
                                        <Label_Text_16_Black>Fecha de operación:</Label_Text_16_Black>
                                        <Input_Text_100_Black
                                            placeholder="..."
                                            type="text"
                                            value={isTextFieldsWarehouseCleaning.fecha}
                                            disabled
                                        />
                                    </Container_Row_100_Left>
                                ):(
                                    <></>
                                )}
                                <Container_Row_100_Left>
                                    <Label_Text_16_Black>Cantidad:</Label_Text_16_Black>
                                    <Input_Group>
                                        <Input_Text_100_Black
                                            className="Input-Cantidad"
                                            placeholder="..."
                                            type="text"
                                            disabled={isActionBlock}
                                            value={isTextFieldsWarehouseCleaning.cantidadreal}
                                            onChange={(e) => {
                                                if(!isNaN(Number(e.target.value))){
                                                    const cantidad = e.target.value;
                                                    const preciounitario = isTextFieldsWarehouseCleaning.preciounitario;
                                                    const precio = (Number(cantidad) * Number(preciounitario)).toFixed(4);

                                                    setIsTextFieldsWarehouseCleaning(prev => ({
                                                        ...prev, 
                                                        cantidadreal: e.target.value,
                                                        precio: precio,
                                                    }))
                                                }
                                            }}
                                            onFocus={() => {
                                                if(isKeyboardTouch.current){
                                                    setIsKeyboard(true);
                                                    setIsKeyboardView('Cantidad-Almacen-Suministro');
                                                }
                                            }}
                                        />
                                    </Input_Group>
                                    <Icon_Button_Blue_20
                                        onClick={() => {
                                            setIsTextFieldsWarehouseCleaning(prev => ({
                                                ...prev, 
                                                cantidadreal: '',
                                                precio: '',
                                            }))
                                        }}
                                        disabled={isActionBlock}
                                    >
                                        <MdCancel/>
                                    </Icon_Button_Blue_20>
                                </Container_Row_100_Left>
                                {currentMView === 'Almacen-Compra-Suministro-Agregar' ? (
                                    <Container_Row_100_Left>
                                        <Label_Text_16_Black>Precio unitario:</Label_Text_16_Black>
                                        <Input_Group>
                                            <Input_Text_100_Black
                                                id="Input-Precio"
                                                placeholder="..."
                                                type="text"
                                                disabled={isActionBlock}
                                                value={isTextFieldsWarehouseCleaning.preciounitario}
                                                onChange={(e) => {
                                                    if(!isNaN(Number(e.target.value))){
                                                        const preciounitario = e.target.value;
                                                        const cantidad = isTextFieldsWarehouseCleaning.cantidadreal;
                                                        const precio = (Number(cantidad) * Number(preciounitario)).toFixed(4);

                                                        setIsTextFieldsWarehouseCleaning(prev => ({
                                                            ...prev, 
                                                            preciounitario: e.target.value,
                                                            precio: precio,
                                                        }))
                                                    }
                                                }}
                                                onFocus={() => {
                                                    if(isKeyboardTouch.current){
                                                        setIsKeyboard(true);
                                                        setIsKeyboardView('Precio-Unitario-Almacen-Suministro');
                                                    }
                                                }}
                                            />
                                        </Input_Group>
                                        <Icon_Button_Blue_20
                                            onClick={() => {
                                                setIsTextFieldsWarehouseCleaning(prev => ({
                                                    ...prev, 
                                                    preciounitario: '',
                                                    precio: '',
                                                }))
                                            }}
                                            disabled={isActionBlock}
                                        >
                                            <MdCancel/>
                                        </Icon_Button_Blue_20>
                                    </Container_Row_100_Left>
                                ):(
                                    <></>
                                )}
                                <Container_Row_100_Left>
                                    <Label_Text_16_Black>Costo total:</Label_Text_16_Black>
                                    <Input_Group>
                                        <Input_Text_100_Black
                                            placeholder="..."
                                            type="text"
                                            disabled
                                            value={isTextFieldsWarehouseCleaning.precio}
                                        />
                                    </Input_Group>
                                </Container_Row_100_Left>
                                <Modal_Form_Button_Add
                                    onCancel={() => handleModalViewWarehouse('')}
                                    onAction={() => handleWarehouseCleaningAdd({isDateType})}
                                />
                            </Container_Modal_Form>
                        </Container_Modal_Form_White>
                    </Container_Modal_Form_White_600>
                    <Keyboard_Form_Warehouse_Products/>
                </Container_Modal_Background_Black>
            ):(
                <></>
            )}
        </>
    );
}