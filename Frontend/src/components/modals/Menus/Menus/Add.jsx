//____________IMPORT/EXPORT____________
// Hooks de React
import { useContext,useEffect,useState } from "react";
import { useNavigate } from "react-router-dom";
// Contextos
import { ModalContext,ModalViewContext,SidebarContext } from "../../../../contexts/ViewsProvider";
import { TextFieldsMenuTypeContext } from "../../../../contexts/FormsProvider";
import { ActionBlockContext,KeyboardViewContext,KeyboardContext,TouchContext } from "../../../../contexts/VariablesProvider";
import { MenuTypeAddContext } from "../../../../contexts/MenusProvider";
import { SocketContext } from "../../../../contexts/SocketProvider";
import { LoggedUserContext } from "../../../../contexts/SessionProvider";
import { SelectedRowContext } from "../../../../contexts/SelectedesProvider";
import { RefKeyboardContext,RefKeyboardTouchContext } from "../../../../contexts/RefsProvider";
// Hooks personalizados
import { HandleModalViewMenuTypes } from "../../../../hooks/menus/Views";
import { HandleMenuTypeAdd } from "../../../../hooks/menus/Forms";
import { HandleKeyboard } from "../../../../hooks/Views";
//__________IMAGENES__________
import Logo_Hospital from '../../../imgs/Logo-Hospital.png'
//__________IMAGENES__________
//__________ICONOS__________
// Icono para cerrar el modal
import { MdCancel } from "react-icons/md";
//__________ICONOS__________
// Estilos personalizados
import { Container_Modal_Background_Black,Container_Modal_Image,Container_Row_100_Left,Container_Row_100_Center,Container_Row_NG_Auto_Center,Container_Modal_Form_White_600,Container_Modal_Form_White,Container_Modal_Form } from "../../../styled/Containers";
import { Text_Span_16_Center_Black,Text_Color_Blue_16,Text_Title_28_Black,Text_Color_Green_16,Text_Span_16_Left_Black } from "../../../styled/Text";
import { Label_Button_16_Black,Label_Text_12_Black } from "../../../styled/Labels";
import { Icon_Button_Blue_20 } from "../../../styled/Icons";
import { Input_Text_100_Black,Input_Checkbox_16,Input_Group } from "../../../styled/Inputs";
import { Alert_Sonner_Promise } from "../../../styled/Alerts";
import { Modal_Form_Button_Add } from "../../../forms/Button";
import { Image_Modal_Fixed } from "../../../styled/Imgs";
// Componetes personalizados
import { Keyboard_Form_Menu } from "../../../keyboards/Form";
//____________IMPORT/EXPORT____________

// Modal para agregar un menú
export default function Menu_Add(){
    // Constantes con el valor de los contextos
    const [isActionBlock,setIsActionBlock] = useContext(ActionBlockContext);
    const [isModal,setIsModal] = useContext(ModalContext);
    const [currentMView,setCurrentMView] = useContext(ModalViewContext);
    const [isMenuTypeAdd,setIsMenuTypeAdd] = useContext(MenuTypeAddContext);
    const [socket] = useContext(SocketContext);
    const [isTextFieldsMenuType,setIsTextFieldsMenuType] = useContext(TextFieldsMenuTypeContext); 
    const [isLoggedUser] = useContext(LoggedUserContext);
    const [isSidebar,setIsSidebar] = useContext(SidebarContext);
    const [isSelectedRow,setIsSelectedRow] = useContext(SelectedRowContext);
    const [isKeyboard,setIsKeyboard] = useContext(KeyboardContext);
    const [isKeyboardView,setIsKeyboardView] = useContext(KeyboardViewContext);
    const Keyboard = useContext(RefKeyboardContext);
    const isKeyboardTouch = useContext(RefKeyboardTouchContext);
    const [isTouch] = useContext(TouchContext);
    // Constantes con la funcionalidad de los hooks
    const navigate = useNavigate();
    const handleModalViewMenuTypes = HandleModalViewMenuTypes();
    const handleMenuTypeAdd = HandleMenuTypeAdd();
    const { KeyboardView,KeyboardClick } = HandleKeyboard();
    // Constantes con el valor de useState
    const [isTotalName,setIsTotalName] = useState(0);
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
        setIsTotalName(isTextFieldsMenuType.nombre.length);
    },[isTextFieldsMenuType.nombre]);
    // UseEffect para agregar datos a la base de datos
    useEffect(() => {
        if(isMenuTypeAdd){
            const promise = new Promise((resolve,reject) => {
                try{
                    setTimeout(() => {
                        socket.emit('Insert-Menu-type',isLoggedUser.idusuario,isTextFieldsMenuType.nombre,isTextFieldsMenuType.cocina,isTextFieldsMenuType.nutriologia,isTextFieldsMenuType.areaMedica);

                        resolve('¡Agregó al menú!');

                        setIsMenuTypeAdd(false);

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
                    setIsMenuTypeAdd(false);
                    return reject('¡Ocurrio un error inesperado!');
                }
            });

            return Alert_Sonner_Promise(promise,'¡Agregando al menú!','2');
        }
    },[isMenuTypeAdd]);
    // Estructura del componente
    return(
        <>
            {isModal ? (
                <>
                    <Container_Modal_Background_Black>
                        <Container_Modal_Image>
                            <Image_Modal_Fixed src={Logo_Hospital}/>
                        </Container_Modal_Image>
                        <Container_Modal_Form_White_600 className={currentMView === 'Tipo-Menu-Agregar' ? 'slide-in-container-top' : 'slide-out-container-top'}>
                            <Container_Modal_Form_White>
                                <Container_Modal_Form>
                                    <Text_Title_28_Black>AGREGAR MENÚ</Text_Title_28_Black>
                                    <Container_Row_NG_Auto_Center>
                                        <Text_Color_Blue_16>MEALSYNC</Text_Color_Blue_16>
                                        <Text_Span_16_Center_Black>: Datos generales</Text_Span_16_Center_Black>
                                    </Container_Row_NG_Auto_Center>
                                    <Container_Row_100_Left>
                                        <Text_Span_16_Left_Black>Nombre:</Text_Span_16_Left_Black>
                                        <Input_Group>
                                            <Input_Text_100_Black
                                                id="Input-Nombre-Menu"
                                                placeholder="..."
                                                type="text"
                                                maxLength={100}
                                                disabled={isActionBlock}
                                                value={isTextFieldsMenuType.nombre}
                                                onChange={(e) => setIsTextFieldsMenuType(prev => ({...prev, nombre: e.target.value}))}
                                                onFocus={() => {
                                                    if(isKeyboardTouch.current){
                                                        setIsKeyboard(true);
                                                        setIsKeyboardView('Nombre-Menu');
                                                    }
                                                }}
                                            />
                                            <Label_Text_12_Black>{isTotalName}/100</Label_Text_12_Black>
                                        </Input_Group>
                                        <Icon_Button_Blue_20
                                            onClick={() => {
                                                setIsTextFieldsMenuType(prev => ({...prev, nombre: ''}))
                                            }}
                                            disabled={isActionBlock}
                                        >
                                            <MdCancel/>
                                        </Icon_Button_Blue_20>
                                    </Container_Row_100_Left>
                                    
                                    <Container_Row_NG_Auto_Center>
                                        <Text_Color_Blue_16>MEALSYNC</Text_Color_Blue_16>
                                        <Text_Span_16_Center_Black>: Datos específicos</Text_Span_16_Center_Black>
                                    </Container_Row_NG_Auto_Center>
                                    <Container_Row_100_Center>
                                        <Text_Color_Green_16>Ubicaciones</Text_Color_Green_16>
                                    </Container_Row_100_Center>
                                    <Container_Row_100_Center>
                                        <Label_Button_16_Black Disabled={isActionBlock}>
                                            <Input_Checkbox_16
                                                disabled={isActionBlock}
                                                checked={isTextFieldsMenuType.cocina}
                                                onChange={(e) => setIsTextFieldsMenuType(prev => ({...prev, cocina: e.target.checked ? 1 : 0}))}
                                                type="checkbox"
                                            />
                                            Cocina
                                        </Label_Button_16_Black>
                                        <Label_Button_16_Black Disabled={isActionBlock}>
                                            <Input_Checkbox_16
                                                disabled={isActionBlock}
                                                checked={isTextFieldsMenuType.nutriologia}
                                                onChange={(e) => setIsTextFieldsMenuType(prev => ({...prev, nutriologia: e.target.checked ? 1 : 0}))}
                                                type="checkbox"
                                            />
                                            Nutriólogia
                                        </Label_Button_16_Black>
                                        <Label_Button_16_Black Disabled={isActionBlock}>
                                            <Input_Checkbox_16
                                                type="checkbox"
                                                disabled={isActionBlock}
                                                checked={isTextFieldsMenuType.areaMedica}
                                                onChange={(e) => setIsTextFieldsMenuType(prev => ({...prev, areaMedica: e.target.checked ? 1 : 0}))}
                                            />
                                            Área médica
                                        </Label_Button_16_Black>
                                    </Container_Row_100_Center>
                                    <Modal_Form_Button_Add
                                        onCancel={() => handleModalViewMenuTypes('')}
                                        onAction={() => handleMenuTypeAdd()}
                                    />
                                </Container_Modal_Form>
                            </Container_Modal_Form_White>
                        </Container_Modal_Form_White_600>
                        <Keyboard_Form_Menu/>
                    </Container_Modal_Background_Black>
                </>
            ):(
                <></>
            )}
        </>
    );
}