//____________IMPORT/EXPORT____________
// Hooks de React
import { useContext,useEffect,useState } from "react";
import { useNavigate } from "react-router-dom";
// Contextos
import { ModalContext,ModalViewContext,SidebarContext } from "../../../contexts/ViewsProvider";
import { ActionBlockContext,KeyboardContext,KeyboardViewContext,TouchContext } from "../../../contexts/VariablesProvider";
import { TextFieldsSupplyCategoryContext,TextFieldsOrderKitchenContext } from "../../../contexts/FormsProvider";
import { SupplyCategoryAddContext } from "../../../contexts/SuppliesProvider";
import { RefKeyboardContext,RefKeyboardTouchContext } from "../../../contexts/RefsProvider";
import { SocketContext } from "../../../contexts/SocketProvider";
import { LoggedUserContext } from "../../../contexts/SessionProvider";
import { SelectedRowContext } from "../../../contexts/SelectedesProvider";
// Hooks personalizados
import { HandleModalViewSupplies } from "../../../hooks/supplies/Views";
import { HandleSupplyCategoryAdd } from "../../../hooks/supplies/Forms";
import { HandleKeyboard } from "../../../hooks/Views";
//__________ICONOS__________
import { MdCancel } from "react-icons/md";
//__________ICONOS__________
// Estilos personalizados
import { Container_Modal_Background_Black,Container_Row_NG_Auto_Center,Container_Modal_Form_White_600,Container_Modal_Form_White,Container_Modal_Form,Container_Row_100_Left, Container_Row_100_Center } from "../../styled/Containers";
import { Text_Span_16_Center_Black,Text_Color_Blue_16,Text_Title_28_Black, Text_Color_Green_16 } from "../../styled/Text";
import { Input_Text_100_Black,Input_Area_100_Black,Input_Group, Input_Radio_20 } from "../../styled/Inputs";
import { Icon_Button_Blue_20 } from "../../styled/Icons";
import { Alert_Sonner_Promise } from "../../styled/Alerts";
import { Label_Area_12_Black,Label_Button_16_Black,Label_Text_12_Black,Label_Text_16_Black } from "../../styled/Labels";
// Componentes personalizados
import { Image_Modal } from "../../styled/Imgs";
import { Keyboard_Form_Supply_Category } from "../../keyboards/Form";
import { Modal_Form_Button_Add, Modal_Form_Button_Return } from "../../forms/Button";
//____________IMPORT/EXPORT____________

// Modal para verificar cirugias disponibles
export default function Alert_Medico(){
    // Constantes con el valor de los contextos
    const [currentMView,setCurrentMView] = useContext(ModalViewContext);
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
    // Constantes con la funcionalidad de los hooks
    const navigate = useNavigate();
    const handleModalViewSupplies = HandleModalViewSupplies();
    const handleSupplyCategoryAdd = HandleSupplyCategoryAdd();
    const { KeyboardView,KeyboardClick } = HandleKeyboard();
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
                    <Container_Modal_Form_White_600 className={currentMView === 'Alerta-Médico' ? 'slide-in-container-top' : 'slide-out-container-top'}>
                        <Container_Modal_Form_White>
                            <Container_Modal_Form>
                                <Text_Title_28_Black>VERIFICACIÓN DE CIRUGÍA</Text_Title_28_Black>
                                <Container_Row_NG_Auto_Center>
                                    <Text_Color_Blue_16>MEALSYNC</Text_Color_Blue_16>
                                    <Text_Span_16_Center_Black>: Datos generales</Text_Span_16_Center_Black>
                                </Container_Row_NG_Auto_Center>
                                <Container_Row_NG_Auto_Center>
                                    <Text_Color_Green_16>Ubicación</Text_Color_Green_16>
                                    <Text_Span_16_Center_Black>:</Text_Span_16_Center_Black>
                                </Container_Row_NG_Auto_Center>
                                <Container_Row_100_Left>
                                    <Label_Text_16_Black>Sala:</Label_Text_16_Black>
                                    <Input_Group>
                                        <Input_Text_100_Black
                                            id="Input-Nombre"
                                            placeholder="..."
                                            type="text"
                                            disabled
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
                                </Container_Row_100_Left>
                                <Container_Row_NG_Auto_Center>
                                    <Text_Color_Green_16>Datos de cirugía</Text_Color_Green_16>
                                    <Text_Span_16_Center_Black>:</Text_Span_16_Center_Black>
                                </Container_Row_NG_Auto_Center>
                                <Container_Row_100_Left>
                                    <Label_Text_16_Black>Médico Tratante:</Label_Text_16_Black>
                                    <Input_Group>
                                        <Input_Text_100_Black
                                            id="Input-Nombre"
                                            placeholder="..."
                                            type="text"
                                            disabled
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
                                </Container_Row_100_Left>
                                <Container_Row_100_Left>
                                    <Label_Text_16_Black>Solicitante:</Label_Text_16_Black>
                                    <Input_Group>
                                        <Input_Text_100_Black
                                            id="Input-Nombre"
                                            placeholder="..."
                                            type="text"
                                            disabled={isActionBlock}
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
                                <Modal_Form_Button_Return/>
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