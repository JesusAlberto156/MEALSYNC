//____________IMPORT/EXPORT____________
// Hooks de React
import { useContext,useEffect,useState } from "react";
import { useNavigate } from "react-router-dom";
// Contextos
import { ModalContext,ModalViewContext,SidebarContext } from "../../../../contexts/ViewsProvider";
import { ActionBlockContext,KeyboardContext,KeyboardViewContext,TouchContext } from "../../../../contexts/VariablesProvider";
import { TextFieldsSupplyCategoryContext,TextFieldsOrderKitchenContext,TextFieldsOrderDoctorContext } from "../../../../contexts/FormsProvider";
import { SupplyCategoryAddContext } from "../../../../contexts/SuppliesProvider";
import { RefKeyboardContext,RefKeyboardTouchContext } from "../../../../contexts/RefsProvider";
import { SocketContext } from "../../../../contexts/SocketProvider";
import { LoggedUserContext } from "../../../../contexts/SessionProvider";
import { SelectedRowContext } from "../../../../contexts/SelectedesProvider";
import { DishesContext } from "../../../../contexts/DishesProvider";
// Hooks personalizados
import { HandleModalViewSupplies } from "../../../../hooks/supplies/Views";
import { HandleSupplyCategoryAdd } from "../../../../hooks/supplies/Forms";
import { HandleKeyboard } from "../../../../hooks/Views";
import { TableActionsDrinks,TableActionsSideDishes } from "../../../../hooks/orders/Tables";
import { HandleTextDishesDoctor } from "../../../../hooks/orders/Forms";
import { HandleModalViewOrderKitchen } from "../../../../hooks/orders/Views";
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
import { Select_300 } from "../../../styled/Selects";
import { Button_Icon_Red_80 } from "../../../styled/Buttons";
import { FaMinus } from "react-icons/fa6";
//____________IMPORT/EXPORT____________

// Modal para agregar pedidos de medico
export default function Order_Doctor_Add(){
    // Constantes con el valor de los contextos
    const [currentMView,setCurrentMView] = useContext(ModalViewContext);
    const [isModal,setIsModal] = useContext(ModalContext);
    const [isActionBlock,setIsActionBlock] = useContext(ActionBlockContext);
    const [isSupplyCategoryAdd,setIsSupplyCategoryAdd] = useContext(SupplyCategoryAddContext);
    const [isTextFieldsSupplyCategory,setIsTextFieldsSupplyCategory] = useContext(TextFieldsSupplyCategoryContext);
    const [isTextFieldsOrderKitchen,setIsTextFieldsOrderKitchen] = useContext(TextFieldsOrderKitchenContext); 
    const [isTextFieldsOrderDoctor,setIsTextFieldsOrderDoctor] = useContext(TextFieldsOrderDoctorContext); 
    const [socket] = useContext(SocketContext);
    const [isLoggedUser] = useContext(LoggedUserContext);
    const [isKeyboard,setIsKeyboard] = useContext(KeyboardContext);
    const [isKeyboardView,setIsKeyboardView] = useContext(KeyboardViewContext);
    const Keyboard = useContext(RefKeyboardContext);
    const isKeyboardTouch = useContext(RefKeyboardTouchContext);
    const [isTouch] = useContext(TouchContext);
    const [isSidebar,setIsSidebar] = useContext(SidebarContext);
    const [isSelectedRow,setIsSelectedRow] = useContext(SelectedRowContext);
    const [isDishes] = useContext(DishesContext);
    // Constantes con la funcionalidad de los hooks
    const navigate = useNavigate();
    const handleModalViewSupplies = HandleModalViewSupplies();
    const handleSupplyCategoryAdd = HandleSupplyCategoryAdd();
    const { KeyboardView,KeyboardClick } = HandleKeyboard();
    const { filteredRecordsSideDishes } = TableActionsSideDishes();
    const { filteredRecordsDrinks } = TableActionsDrinks();
    const { DishDelete } = HandleTextDishesDoctor();
    const handleModalViewOrderKitchen = HandleModalViewOrderKitchen()
    // Constantes con el valor de useState
    const [isTotalDescription,setIsTotalDescription] = useState(0)
    const [isTotalName,setIsTotalName] = useState(0)
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
            setIsTextFieldsOrderDoctor((prev) => ({
                ...prev,
                fecha: getFormattedDateTime()
            }));
        }, 1000);

        return () => clearInterval(interval);
    },[])
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
                    <Container_Modal_Form_White_600 className={currentMView === 'Pedido-Medico-Agregar' ? 'slide-in-container-top' : 'slide-out-container-top'}>
                        <Container_Modal_Form_White>
                            <Container_Modal_Form>
                                <Text_Title_28_Black>SOLICITUD DE COMANDA DEL ESTAR MÉDICO</Text_Title_28_Black>
                                <Container_Row_NG_Auto_Center>
                                    <Text_Color_Blue_16>MEALSYNC</Text_Color_Blue_16>
                                    <Text_Span_16_Center_Black>: Datos generales</Text_Span_16_Center_Black>
                                </Container_Row_NG_Auto_Center>
                                <Container_Row_100_Left>
                                    <Label_Text_16_Black>Sala:</Label_Text_16_Black>
                                    <Input_Group>
                                        <Input_Text_100_Black
                                            id="Input-Nombre"
                                            placeholder="..."
                                            type="text"
                                            disabled
                                            value={isTextFieldsOrderDoctor.sala}
                                        />
                                        <Label_Text_12_Black>{isTextFieldsOrderDoctor.sala.length}/10</Label_Text_12_Black>
                                    </Input_Group>
                                </Container_Row_100_Left>
                                <Container_Row_100_Left>
                                    <Label_Text_16_Black>Cirugía o procedimiento:</Label_Text_16_Black>
                                    <Input_Group>
                                        <Input_Text_100_Black
                                            id="Input-Nombre"
                                            placeholder="..."
                                            type="text"
                                            disabled
                                            value={isTextFieldsOrderDoctor.cirugia}
                                        />
                                        <Label_Text_12_Black>{isTextFieldsOrderDoctor.cirugia.length}/100</Label_Text_12_Black>
                                    </Input_Group>
                                </Container_Row_100_Left>
                                <Container_Row_100_Left>
                                    <Label_Text_16_Black>Fecha:</Label_Text_16_Black>
                                    <Input_Text_100_Black
                                        placeholder="..."
                                        type="text"
                                        value={isTextFieldsOrderDoctor.fecha}
                                        disabled
                                    />
                                </Container_Row_100_Left>
                                {isTextFieldsOrderDoctor.pedidos.map((pedido,index) => (
                                    <Container_Order_100_Center key={index}>
                                        <Container_Row_NG_Auto_Center>
                                            <Text_Color_Green_16>Platillo</Text_Color_Green_16>
                                            <Text_Span_16_Center_Black>: {isDishes.find(d => d.idplatillo === pedido.idplatillo)?.nombre}</Text_Span_16_Center_Black>
                                        </Container_Row_NG_Auto_Center>
                                        <Select_300
                                            data={filteredRecordsSideDishes.length}
                                            options={filteredRecordsSideDishes.map((s) => ({
                                                value: s.idguarnicion,
                                                label: s.nombre
                                            }))}
                                            placeholder='Guarniciones...'
                                            value={filteredRecordsSideDishes
                                                .map(s => ({ value: s.idguarnicion, label: s.nombre }))
                                                .find(option => option.value === pedido.idguarnicion)
                                            }
                                            onChange={(e) => {
                                                if(e){
                                                    setIsTextFieldsOrderDoctor(prev => {
                                                        const newGuarnicion = [...prev.pedidos];
                                                        newGuarnicion[index] = {
                                                            ...newGuarnicion[index],
                                                            idgaurnicion: e.value
                                                        };
                                                        return {
                                                            ...prev,
                                                            pedidos: newGuarnicion
                                                        };
                                                    });
                                                }else{
                                                    setIsTextFieldsOrderDoctor(prev => {
                                                        const newGuarnicion = [...prev.pedidos];
                                                        newGuarnicion[index] = {
                                                            ...newGuarnicion[index],
                                                            idguarnicion: 0,
                                                        };
                                                        return {
                                                            ...prev,
                                                            pedidos: newGuarnicion
                                                        };
                                                    });
                                                }
                                            }}
                                            isDisabled={isActionBlock}
                                        />
                                        <Select_300
                                            data={filteredRecordsDrinks.length}
                                            options={filteredRecordsDrinks.map((s) => ({
                                                value: s.idbebida,
                                                label: s.nombre
                                            }))}
                                            placeholder='Bebidas...'
                                            value={filteredRecordsDrinks
                                                .map(s => ({ value: s.idbebida, label: s.nombre }))
                                                .find(option => option.value === pedido.idbebida)
                                            }
                                            onChange={(e) => {
                                                if(e){
                                                    setIsTextFieldsOrderDoctor(prev => {
                                                        const newGuarnicion = [...prev.pedidos];
                                                        newGuarnicion[index] = {
                                                            ...newGuarnicion[index],
                                                            idbebida: e.value
                                                        };
                                                        return {
                                                            ...prev,
                                                            pedidos: newGuarnicion
                                                        };
                                                    });
                                                }else{
                                                    setIsTextFieldsOrderDoctor(prev => {
                                                        const newGuarnicion = [...prev.pedidos];
                                                        newGuarnicion[index] = {
                                                            ...newGuarnicion[index],
                                                            idbebida: 0,
                                                        };
                                                        return {
                                                            ...prev,
                                                            pedidos: newGuarnicion
                                                        };
                                                    });
                                                }
                                            }}
                                            isDisabled={isActionBlock}
                                        />
                                        <Container_Row_100_Left>
                                            <Label_Text_16_Black>Opciones:</Label_Text_16_Black>
                                            <Input_Group>
                                                <Input_Text_100_Black
                                                    placeholder="..."
                                                    type="text"
                                                    maxLength={100}
                                                    disabled={isActionBlock}
                                                    value={pedido.comentario}
                                                    onChange={(e) => {
                                                        setIsTextFieldsOrderDoctor(prev => {
                                                            const newGuarnicion = [...prev.pedidos];
                                                            newGuarnicion[index] = {
                                                                ...newGuarnicion[index],
                                                                comentario: e.value
                                                            };
                                                            return {
                                                                ...prev,
                                                                pedidos: newGuarnicion
                                                            };
                                                        });
                                                    }}
                                                />
                                            </Input_Group>
                                            <Icon_Button_Blue_20
                                                onClick={() => {
                                                    setIsTextFieldsOrderDoctor(prev => {
                                                        const newGuarnicion = [...prev.pedidos];
                                                        newGuarnicion[index] = {
                                                            ...newGuarnicion[index],
                                                            comentario: ''
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
                                        <Container_Row_100_Left>
                                            <Button_Icon_Red_80
                                                disabled={isActionBlock}
                                                onClick={() => DishDelete(pedido.idplatillo)}
                                            >
                                                <Icon_20><FaMinus/></Icon_20>
                                            </Button_Icon_Red_80>
                                            <Container_Row_100_Right>
                                                <Text_Title_20_Black>No. Platillo: {index+1}</Text_Title_20_Black>
                                            </Container_Row_100_Right>
                                        </Container_Row_100_Left>  
                                    </Container_Order_100_Center>
                                ))}
                                <Container_Row_100_Left>
                                    <Label_Text_16_Black>Solicitante:</Label_Text_16_Black>
                                    <Input_Group>
                                        <Input_Text_100_Black
                                            placeholder="..."
                                            type="text"
                                            value={isTextFieldsOrderDoctor.solicitante}
                                            disabled
                                        />
                                        <Label_Text_12_Black>{isTextFieldsOrderDoctor.solicitante.length}/150</Label_Text_12_Black>
                                    </Input_Group>    
                                </Container_Row_100_Left>
                                <Container_Row_100_Left>
                                    <Label_Text_16_Black>Médico Tratante:</Label_Text_16_Black>
                                    <Input_Group>
                                        <Input_Text_100_Black
                                            placeholder="..."
                                            type="text"
                                            value={isTextFieldsOrderDoctor.medico}
                                            disabled
                                        />
                                        <Label_Text_12_Black>{isTextFieldsOrderDoctor.medico.length}/150</Label_Text_12_Black>
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