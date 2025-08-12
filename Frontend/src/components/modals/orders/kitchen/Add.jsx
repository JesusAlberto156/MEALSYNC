//____________IMPORT/EXPORT____________
// Hooks de React
import { useContext,useEffect,useState } from "react";
import { useNavigate } from "react-router-dom";
// Contextos
import { ModalContext,ModalViewContext,SidebarContext } from "../../../../contexts/ViewsProvider";
import { ActionBlockContext,KeyboardContext,KeyboardViewContext,TouchContext } from "../../../../contexts/VariablesProvider";
import { TextFieldsSupplyCategoryContext,TextFieldsOrderKitchenContext } from "../../../../contexts/FormsProvider";
import { SupplyCategoryAddContext } from "../../../../contexts/SuppliesProvider";
import { RefKeyboardContext,RefKeyboardTouchContext } from "../../../../contexts/RefsProvider";
import { SocketContext } from "../../../../contexts/SocketProvider";
import { DrinksContext,DrinkSpecificationsContext } from "../../../../contexts/DrinksProvider";
import { DishesContext,DishSpecificationsContext } from "../../../../contexts/DishesProvider";
import { SideDishesContext,SideDishSpecificationsContext } from "../../../../contexts/SideDishesProvider";
import { LoggedUserContext } from "../../../../contexts/SessionProvider";
import { SelectedRowContext } from "../../../../contexts/SelectedesProvider";
// Hooks personalizados
import { HandleModalViewSupplies } from "../../../../hooks/supplies/Views";
import { HandleModalViewOrderKitchen } from "../../../../hooks/orders/Views";
import { HandleSupplyCategoryAdd } from "../../../../hooks/supplies/Forms";
import { HandleKeyboard } from "../../../../hooks/Views";
import { HandleTextDishesKitchen } from "../../../../hooks/orders/Forms";
//__________ICONOS__________
import { MdCancel } from "react-icons/md";
//__________ICONOS__________
// Estilos personalizados
import { Container_Modal_Background_Black,Container_Row_NG_Auto_Center,Container_Modal_Form_White_600,Container_Modal_Form_White,Container_Modal_Form,Container_Row_100_Left, Container_Row_100_Center, Container_Order_100_Center, Container_Row_100_Right } from "../../../styled/Containers";
import { Text_Span_16_Center_Black,Text_Color_Blue_16,Text_Title_28_Black, Text_Color_Green_16, Text_Title_20_Black } from "../../../styled/Text";
import { Input_Text_100_Black,Input_Area_100_Black,Input_Group, Input_Radio_20 } from "../../../styled/Inputs";
import { Icon_20, Icon_Button_Blue_20 } from "../../../styled/Icons";
import { Alert_Sonner_Promise } from "../../../styled/Alerts";
import { Label_Area_12_Black,Label_Button_16_Black,Label_Text_12_Black,Label_Text_16_Black } from "../../../styled/Labels";
// Componentes personalizados
import { Image_Modal } from "../../../styled/Imgs";
import { Keyboard_Form_Supply_Category } from "../../../keyboards/Form";
import { Modal_Form_Button_Add } from "../../../forms/Button";
import { FaMinus } from "react-icons/fa6";
import { Button_Icon_Red_80 } from "../../../styled/Buttons";
//____________IMPORT/EXPORT____________

// Modal para agregar pedidos de cocina
export default function Order_Kitchen_Add(){
    // Constantes con el valor de los contextos
    const [currentMView,setCurrentMView] = useContext(ModalViewContext);
    const [iSidesDishes] = useContext(SideDishesContext); 
    const [isDishes] = useContext(DishesContext);
    const [isDrinks] = useContext(DrinksContext);
    const [isModal,setIsModal] = useContext(ModalContext);
    const [isActionBlock,setIsActionBlock] = useContext(ActionBlockContext);
    const [isSupplyCategoryAdd,setIsSupplyCategoryAdd] = useContext(SupplyCategoryAddContext);
    const [isTextFieldsSupplyCategory,setIsTextFieldsSupplyCategory] = useContext(TextFieldsSupplyCategoryContext);
    const [isTextFieldsOrderKitchen,setIsTextFieldsOrderKitchen] = useContext(TextFieldsOrderKitchenContext); 
    const [socket] = useContext(SocketContext);
    const [isLoggedUser] = useContext(LoggedUserContext);
    const [isKeyboard,setIsKeyboard] = useContext(KeyboardContext);
    const [isKeyboardView,setIsKeyboardView] = useContext(KeyboardViewContext);
    const Keyboard = useContext(RefKeyboardContext);
    const isKeyboardTouch = useContext(RefKeyboardTouchContext);
    const [isTouch] = useContext(TouchContext);
    const [isSidebar,setIsSidebar] = useContext(SidebarContext);
    const [isSelectedRow,setIsSelectedRow] = useContext(SelectedRowContext);
    const [isDrinkSpecifications] = useContext(DrinkSpecificationsContext);
    const [isDishSpecifications] = useContext(DishSpecificationsContext);
    const [isSideDishSpecifications] = useContext(SideDishSpecificationsContext);
    // Constantes con la funcionalidad de los hooks
    const navigate = useNavigate();
    const handleModalViewSupplies = HandleModalViewSupplies();
    const handleSupplyCategoryAdd = HandleSupplyCategoryAdd();
    const { KeyboardView,KeyboardClick } = HandleKeyboard();
    const handleModalViewOrderKitchen = HandleModalViewOrderKitchen();
    const { SideDishDeleteCook,DrinkDeleteCook,DishDeleteCook} = HandleTextDishesKitchen();
    // Constantes con el valor de useState
    const [isTotalDescription,setIsTotalDescription] = useState(0)
    const [isTotalName,setIsTotalName] = useState(0)
    // UseEffects para el limite de caracteres de los campos del formulario
    useEffect(() => {
        setIsTotalName(isTextFieldsSupplyCategory.nombre.length);
    },[isTextFieldsSupplyCategory.nombre]);
    useEffect(() => {
        setIsTotalDescription(isTextFieldsSupplyCategory.descripcion.length);
    },[isTextFieldsSupplyCategory.descripcion]);
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

    useEffect(() => {
        const totalPrecio = isTextFieldsOrderKitchen.pedidos.reduce((acc, pedido) => {
            const cantidad = Number(pedido.cantidad) || 0;
            
            const precioUnitario =
                Number(isDishSpecifications.find(d => d.idplatillo === pedido.idplatillo)?.precio) ||
                Number(isSideDishSpecifications.find(d => d.idguarnicion === pedido.idguarnicion)?.precio) ||
                Number(isDrinkSpecifications.find(d => d.idbebida === pedido.idbebida)?.precio) ||
                0;

            return acc + (cantidad * precioUnitario);
        }, 0);

        setIsTextFieldsOrderKitchen(prev => {
            if (prev.precio === totalPrecio) return prev;
            return { ...prev, precio: totalPrecio };
        });
    }, [isTextFieldsOrderKitchen.pedidos, isDishSpecifications, isSideDishSpecifications, isDrinkSpecifications]);

    // UseEffect para agregar datos a la base de datos
    useEffect(() => {
        if(isSupplyCategoryAdd){
            const promise = new Promise((resolve,reject) => {
                try{
                    setTimeout(() => {
                        socket.emit('Insert-Supply-Category',isLoggedUser.idusuario,isTextFieldsSupplyCategory.nombre.trim(),isTextFieldsSupplyCategory.descripcion.trim());

                        resolve('¡Agregó la categoría!');

                        setIsSupplyCategoryAdd(false)

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
                    setIsSupplyCategoryAdd(false);
                    return reject('¡Ocurrio un error inesperado!');
                }
            });

            return Alert_Sonner_Promise(promise,'¡Agregando una categoría!','2');
        }
    },[isSupplyCategoryAdd]);
    // Estructura del componente
    return(
        <>
            {isModal ? (
                <Container_Modal_Background_Black>
                    <Image_Modal/>
                    <Container_Modal_Form_White_600 className={currentMView === 'Pedido-Cocina-Agregar' ? 'slide-in-container-top' : 'slide-out-container-top'}>
                        <Container_Modal_Form_White>
                            <Container_Modal_Form>
                                <Text_Title_28_Black>RESTAURANT COMANDA</Text_Title_28_Black>
                                <Container_Row_NG_Auto_Center>
                                    <Text_Color_Blue_16>MEALSYNC</Text_Color_Blue_16>
                                    <Text_Span_16_Center_Black>: Datos generales</Text_Span_16_Center_Black>
                                </Container_Row_NG_Auto_Center>
                                <Container_Row_NG_Auto_Center>
                                    <Text_Color_Green_16>Ubicación</Text_Color_Green_16>
                                    <Text_Span_16_Center_Black>:</Text_Span_16_Center_Black>
                                </Container_Row_NG_Auto_Center>
                                <Container_Row_100_Center>
                                    {['UTI','PISO 2','PISO 3','OTRO'].map((item,index) => (
                                        <Label_Button_16_Black Disabled={isActionBlock} key={index}>
                                            <Input_Radio_20
                                                type="radio"
                                                name="units"
                                                disabled={isActionBlock}
                                                value={item}
                                                checked={isTextFieldsOrderKitchen.tipoubicacion === item}
                                                onChange={(e) => setIsTextFieldsOrderKitchen(prev => ({...prev, tipoubicacion: e.target.value}))}
                                            />
                                            {item}
                                        </Label_Button_16_Black>
                                    ))}
                                </Container_Row_100_Center>
                                {isTextFieldsOrderKitchen.tipoubicacion === 'UTI' ? (
                                    <>
                                        <select value={isTextFieldsOrderKitchen.ubicacion} onChange={(e) => setIsTextFieldsOrderKitchen(prev => ({...prev, ubicacion: e.target.value}))}>
                                            <option value="">Seleccione una sala</option>
                                            <option value="UTI 1">UTI 1</option>
                                            <option value="UTI 2">UTI 2</option>
                                            <option value="UTI 3">UTI 3</option>
                                            <option value="U.INTER">U.INTER</option>
                                            <option value="U.HEMO">U.HEMO</option>
                                        </select>
                                    </>
                                ):(
                                    <></>
                                )}
                                {isTextFieldsOrderKitchen.tipoubicacion === 'PISO 2' ? (
                                    <>
                                        <select value={isTextFieldsOrderKitchen.ubicacion} onChange={(e) => setIsTextFieldsOrderKitchen(prev => ({...prev, ubicacion: e.target.value}))}>
                                            <option value="">Seleccione una sala</option>
                                            <option value="201">201</option>
                                            <option value="202">202</option>
                                            <option value="203">203</option>
                                            <option value="204">204</option>
                                            <option value="205">205</option>
                                            <option value="206">206</option>
                                            <option value="207">207</option>
                                            <option value="208">208</option>
                                            <option value="209">209</option>
                                            <option value="210">210</option>
                                            <option value="211">211</option>
                                            <option value="212">212</option>
                                            <option value="213">213</option>
                                            <option value="214">214</option>
                                            <option value="215">215</option>
                                            <option value="216">216</option>
                                        </select>
                                    </>
                                ):(
                                    <></>
                                )}
                                {isTextFieldsOrderKitchen.tipoubicacion === 'PISO 3' ? (
                                    <>
                                        <select value={isTextFieldsOrderKitchen.ubicacion} onChange={(e) => setIsTextFieldsOrderKitchen(prev => ({...prev, ubicacion: e.target.value}))}>
                                            <option value="">Seleccione una sala</option>
                                            <option value="301">301</option>
                                            <option value="302">302</option>
                                            <option value="303">303</option>
                                            <option value="304">304</option>
                                            <option value="305">305</option>
                                            <option value="306">306</option>
                                            <option value="307">307</option>
                                            <option value="308">308</option>
                                            <option value="309">309</option>
                                            <option value="310">310</option>
                                            <option value="311">311</option>
                                            <option value="312">312</option>
                                            <option value="313">313</option>
                                            <option value="314">314</option>
                                            <option value="315">315</option>
                                            <option value="316">316</option>
                                        </select>
                                    </>
                                ):(
                                    <></>
                                )}
                                {isTextFieldsOrderKitchen.tipoubicacion === 'OTRO' ? (
                                    <Container_Row_100_Left>
                                        <Label_Text_16_Black>Ubicación exacta:</Label_Text_16_Black>
                                        <Input_Group>
                                            <Input_Text_100_Black
                                                id="Input-Nombre"
                                                placeholder="..."
                                                type="text"
                                                maxLength={150}
                                                disabled={isActionBlock || isTextFieldsOrderKitchen.tipoubicacion !== 'OTRO'}
                                                value={isTextFieldsOrderKitchen.ubicacion}
                                                onChange={(e) => setIsTextFieldsOrderKitchen(prev => ({...prev, ubicacion: e.target.value}))}
                                                onFocus={() => {
                                                    if(isKeyboardTouch.current){
                                                        setIsKeyboard(true);
                                                        setIsKeyboardView('Nombre-Categoria-Insumo');
                                                    }
                                                }}
                                            />
                                            <Label_Text_12_Black>{isTotalName}/150</Label_Text_12_Black>
                                        </Input_Group>
                                        <Icon_Button_Blue_20
                                            onClick={() => {
                                                setIsTextFieldsOrderKitchen(prev => ({...prev, ubicacion: ''}))
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
                                    <Label_Text_16_Black>Encargado:</Label_Text_16_Black>
                                    <Input_Group>
                                        <Input_Text_100_Black
                                            id="Input-Nombre"
                                            placeholder="..."
                                            type="text"
                                            maxLength={150}
                                            disabled={isActionBlock}
                                            value={isTextFieldsOrderKitchen.encargado}
                                            onChange={(e) => setIsTextFieldsOrderKitchen(prev => ({...prev, encargado: e.target.value}))}
                                            onFocus={() => {
                                                if(isKeyboardTouch.current){
                                                    setIsKeyboard(true);
                                                    setIsKeyboardView('Nombre-Categoria-Insumo');
                                                }
                                            }}
                                        />
                                        <Label_Text_12_Black>{isTotalName}/150</Label_Text_12_Black>
                                    </Input_Group>
                                    <Icon_Button_Blue_20
                                        onClick={() => {
                                            setIsTextFieldsOrderKitchen(prev => ({...prev, encargado: ''}))
                                        }}
                                        disabled={isActionBlock}
                                    >
                                        <MdCancel/>
                                    </Icon_Button_Blue_20>
                                </Container_Row_100_Left>
                                {isTextFieldsOrderKitchen.pedidos.map((pedido,index) => (
                                    <Container_Order_100_Center key={index}>
                                        {pedido.idplatillo !== 0 ? (
                                            <>
                                                <Container_Row_NG_Auto_Center>
                                                    <Text_Color_Green_16>Platillo</Text_Color_Green_16>
                                                    <Text_Span_16_Center_Black>: {isDishes.find(d => d.idplatillo === pedido.idplatillo)?.nombre}</Text_Span_16_Center_Black>
                                                </Container_Row_NG_Auto_Center>
                                                <Container_Row_100_Left>
                                                    <Label_Text_16_Black>Cantidad:</Label_Text_16_Black>
                                                    <Input_Group>
                                                        <Input_Text_100_Black
                                                            placeholder="..."
                                                            type="text"
                                                            maxLength={100}
                                                            disabled={isActionBlock}
                                                            value={pedido.cantidad}
                                                            onChange={(e) => {
                                                                if(!isNaN(Number(e.target.value))){
                                                                    setIsTextFieldsOrderKitchen(prev => {
                                                                        const newGuarnicion = [...prev.pedidos];
                                                                        newGuarnicion[index] = {
                                                                            ...newGuarnicion[index],
                                                                            cantidad: e.target.value
                                                                        };
                                                                        return {
                                                                            ...prev,
                                                                            pedidos: newGuarnicion
                                                                        };
                                                                    });
                                                                }
                                                            }}
                                                        />
                                                    </Input_Group>
                                                    <Icon_Button_Blue_20
                                                        onClick={() => {
                                                            setIsTextFieldsOrderKitchen(prev => {
                                                                const newGuarnicion = [...prev.pedidos];
                                                                newGuarnicion[index] = {
                                                                    ...newGuarnicion[index],
                                                                    cantidad: ''
                                                                };
                                                                return {
                                                                    ...prev,
                                                                    pedidos: newGuarnicion
                                                                };
                                                            });
                                                        }}
                                                        disabled={isActionBlock}
                                                    >
                                                        <MdCancel/>
                                                    </Icon_Button_Blue_20>
                                                </Container_Row_100_Left>  
                                                <Container_Row_100_Center>
                                                    <Text_Span_16_Center_Black>Costo: $ {isDishSpecifications.find(d => d.idplatillo === pedido.idplatillo)?.precio} MXN</Text_Span_16_Center_Black>
                                                </Container_Row_100_Center>
                                                <Container_Row_100_Left>
                                                    <Button_Icon_Red_80
                                                        disabled={isActionBlock}
                                                        onClick={() => DishDeleteCook(pedido.idplatillo)}
                                                    >
                                                        <Icon_20><FaMinus/></Icon_20>
                                                    </Button_Icon_Red_80>
                                                    <Container_Row_100_Right>
                                                        <Text_Title_20_Black>No. Platillo: {index+1}</Text_Title_20_Black>
                                                    </Container_Row_100_Right>
                                                </Container_Row_100_Left>  
                                            </>
                                        ):(
                                            <></>
                                        )} 
                                         
                                    </Container_Order_100_Center>
                                ))}
                                 <Container_Row_100_Left>
                                    <Label_Text_16_Black>Precio Total:</Label_Text_16_Black>
                                    <Input_Group>
                                        <Input_Text_100_Black
                                            placeholder="..."
                                            type="text"
                                            value={isTextFieldsOrderKitchen.precio}
                                            disabled
                                        />
                                    </Input_Group>    
                                </Container_Row_100_Left>
                                <Modal_Form_Button_Add
                                    onCancel={() => handleModalViewOrderKitchen('')}
                                    onAction={() => handleSupplyCategoryAdd()}
                                />
                            </Container_Modal_Form>
                        </Container_Modal_Form_White>
                    </Container_Modal_Form_White_600>
                    <Keyboard_Form_Supply_Category/>
                </Container_Modal_Background_Black>
            ):(
                <></>
            )}
        </>
    );
}