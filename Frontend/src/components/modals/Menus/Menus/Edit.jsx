//____________IMPORT/EXPORT____________
// Hooks de React
import { useContext,useEffect,useState } from "react";
import { useNavigate } from "react-router-dom";
// Contextos
import { ModalContext,ModalViewContext,SidebarContext } from "../../../../contexts/ViewsProvider";
import { TextFieldsMenuTypeContext } from "../../../../contexts/FormsProvider";
import { ActionBlockContext,KeyboardViewContext,KeyboardContext,TouchContext } from "../../../../contexts/VariablesProvider";
import { MenuTypeEditContext,DeletedMenuTypesContext } from "../../../../contexts/MenusProvider";
import { SocketContext } from "../../../../contexts/SocketProvider";
import { LoggedUserContext } from "../../../../contexts/SessionProvider";
import { SelectedRowContext } from "../../../../contexts/SelectedesProvider";
import { RefKeyboardContext,RefKeyboardTouchContext } from "../../../../contexts/RefsProvider";
// Hooks personalizados
import { HandleModalViewMenuTypes } from "../../../../hooks/menus/Views";
import { HandleMenuTypeEdit } from "../../../../hooks/menus/Forms";
import { HandleKeyboard } from "../../../../hooks/Views";
//__________ICONOS__________
// Icono para cerrar el modal
import { MdCancel } from "react-icons/md";
//__________ICONOS__________
// Estilos personalizados
import { Container_Modal_Background_Black,Container_Row_100_Left,Container_Row_100_Center,Container_Row_NG_Auto_Center,Container_Modal_Form_White_600,Container_Modal_Form_White,Container_Modal_Form } from "../../../styled/Containers";
import { Text_Span_16_Center_Black,Text_Color_Blue_16,Text_Title_28_Black,Text_Color_Green_16,Text_Span_12_Justify_Black } from "../../../styled/Text";
import { Label_Button_16_Black,Label_Text_12_Black,Label_Text_16_Black } from "../../../styled/Labels";
import { Icon_Button_Blue_20 } from "../../../styled/Icons";
import { Input_Text_100_Black,Input_Checkbox_16,Input_Group } from "../../../styled/Inputs";
import { Alert_Sonner_Promise } from "../../../styled/Alerts";
// Componetes personalizados
import { Image_Modal } from "../../../styled/Imgs";
import { Keyboard_Form_Menu } from "../../../keyboards/Form";
import { Modal_Form_Button_Edit } from "../../../forms/Button";
import Error_Edit from "../../errors/Edit";
//____________IMPORT/EXPORT____________

// Modal para agregar un menú
export default function Menu_Edit(){
    // Constantes con el valor de los contextos
    const [isActionBlock,setIsActionBlock] = useContext(ActionBlockContext);
    const [isModal,setIsModal] = useContext(ModalContext);
    const [currentMView,setCurrentMView] = useContext(ModalViewContext);
    const [isMenuTypeEdit,setIsMenuTypeEdit] = useContext(MenuTypeEditContext);
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
    const [isDeletedMenuTypes] = useContext(DeletedMenuTypesContext);
    // Constantes con la funcionalidad de los hooks
    const navigate = useNavigate();
    const handleModalViewMenuTypes = HandleModalViewMenuTypes();
    const handleMenuTypeEdit = HandleMenuTypeEdit();
    const { KeyboardView,KeyboardClick } = HandleKeyboard();
    // Constantes con el valor de useState
    const [isTotalName,setIsTotalName] = useState(0);
    // UseEffct para verificar la eliminacion del menú
    useEffect(() => {
        if(isDeletedMenuTypes.length !== 0){
            if(isDeletedMenuTypes.some(type => type.idtipo === isTextFieldsMenuType.idtipo)){
                setIsSelectedRow(null);
            }
        }
    },[isDeletedMenuTypes]);
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
        if(isMenuTypeEdit){
            const promise = new Promise((resolve,reject) => {
                try{
                    setTimeout(() => {
                        socket.emit('Update-Menu-Type',isLoggedUser.idusuario,isTextFieldsMenuType.idtipo,isTextFieldsMenuType.nombre.trim(),isTextFieldsMenuType.cocina,isTextFieldsMenuType.nutriologia,isTextFieldsMenuType.areaMedica);

                        resolve('¡Editó al menú!');

                        setIsMenuTypeEdit(false);

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
                    setIsMenuTypeEdit(false);
                    return reject('¡Ocurrio un error inesperado!');
                }
            });

            return Alert_Sonner_Promise(promise,'¡Editando al menú!','2');
        }
    },[isMenuTypeEdit]);
    // Estructura del componente
    return(
        <>
            {isModal && isSelectedRow !== null ? (
                <>
                    <Container_Modal_Background_Black>
                        <Image_Modal/>
                        <Container_Modal_Form_White_600 className={currentMView === 'Tipo-Menu-Editar' ? 'slide-in-container-top' : 'slide-out-container-top'}>
                            <Container_Modal_Form_White>
                                <Container_Modal_Form>
                                    <Text_Title_28_Black>EDITAR MENÚ</Text_Title_28_Black>
                                    <Container_Row_NG_Auto_Center>
                                        <Text_Color_Blue_16>MEALSYNC</Text_Color_Blue_16>
                                        <Text_Span_16_Center_Black>: Datos generales</Text_Span_16_Center_Black>
                                    </Container_Row_NG_Auto_Center>
                                    <Container_Row_100_Left>
                                        <Label_Text_16_Black>Nombre:</Label_Text_16_Black>
                                        <Input_Group>
                                            <Input_Text_100_Black
                                                id="Input-Nombre"
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
                                    <Text_Span_12_Justify_Black>Cualquier modificación en el nombre del menú debe ser registrada, ya que este valor se utiliza como criterio para filtrar platillos, guarniciones y bebidas durante la realización de pedidos. Asimismo, cualquier cambio en la ubicación asociada al menú puede afectar directamente el correcto funcionamiento de dicho filtrado y el flujo de pedidos.</Text_Span_12_Justify_Black>
                                    <Modal_Form_Button_Edit
                                        onCancel={() => handleModalViewMenuTypes('')}
                                        onAction={() => handleMenuTypeEdit()}
                                    />
                                </Container_Modal_Form>
                            </Container_Modal_Form_White>
                        </Container_Modal_Form_White_600>
                        <Keyboard_Form_Menu/>
                    </Container_Modal_Background_Black>
                </>
            ):(
                currentMView === 'Tipo-Menu-Editar' ? (
                    <Error_Edit/>
                ):(
                    <></>
                )
            )}
        </>
    );
}