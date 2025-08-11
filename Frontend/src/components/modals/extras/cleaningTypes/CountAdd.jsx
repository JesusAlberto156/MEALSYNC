//____________IMPORT/EXPORT____________
// Hooks de React
import { useContext,useEffect } from "react";
import { useNavigate } from "react-router-dom";
// Contextos
import { ModalContext,ModalViewContext,SidebarContext } from "../../../../contexts/ViewsProvider";
import { SelectedRowContext } from "../../../../contexts/SelectedesProvider";
import { ActionBlockContext,KeyboardContext,KeyboardViewContext,TouchContext } from "../../../../contexts/VariablesProvider";
import { TextFieldsCleaningTypeContext } from "../../../../contexts/FormsProvider";
import { DeletedCleaningTypesContext,CountCleaningTypeAddContext,CleaningCategoriesContext } from "../../../../contexts/ExtrasProvider";
import { RefKeyboardContext,RefKeyboardTouchContext,RefModalContext,RefFormContext } from "../../../../contexts/RefsProvider";
import { SocketContext } from "../../../../contexts/SocketProvider";
import { LoggedUserContext } from "../../../../contexts/SessionProvider";
// Hooks personalizados
import { HandleModalViewExtras } from "../../../../hooks/extras/Views";
import { HandleCountCleaningTypeAdd } from "../../../../hooks/extras/Forms";
import { HandleKeyboard } from "../../../../hooks/Views";
//__________ICONOS__________
// Icono para realizar la función del modal
import { MdCancel } from "react-icons/md";
import { MdAddBox } from "react-icons/md";
//__________ICONOS__________
// Estilos personalizados
import { Container_Modal_Background_Black,Container_Row_100_Left,Container_Row_NG_Auto_Center,Container_Modal_Form_White_600,Container_Modal_Form_White,Container_Modal_Form } from "../../../styled/Containers";
import { Text_Span_16_Center_Black,Text_Color_Blue_16,Text_Title_28_Black,Text_Color_Green_16 } from "../../../styled/Text";
import { Input_Text_100_Black,Input_Group } from "../../../styled/Inputs";
import { Icon_Button_Blue_20 } from "../../../styled/Icons";
import { Alert_Sonner_Promise } from "../../../styled/Alerts";
import { Label_Text_16_Black } from "../../../styled/Labels";
// Componentes personalizados
import Error_Add from "../../errors/Add";
import { Modal_Form_Button_Add } from "../../../forms/Button";
import { Image_Modal } from "../../../styled/Imgs";
import { Keyboard_Form_Cleaning_Type } from "../../../keyboards/Form";
//____________IMPORT/EXPORT____________

// Modal para agregar cantidades a los tipos de limpieza a su tabla
export default function Count_Cleaning_Type_Add(){
    // Constantes con el valor de los contextos
    const [currentMView,setCurrentMView] = useContext(ModalViewContext);
    const [isModal,setIsModal] = useContext(ModalContext);
    const [isActionBlock,setIsActionBlock] = useContext(ActionBlockContext);
    const [isSelectedRow,setIsSelectedRow] = useContext(SelectedRowContext);
    const [isCleaningCategories] = useContext(CleaningCategoriesContext);
    const [isCleaningTypeCountAdd,setIsCleaningTypeCountAdd] = useContext(CountCleaningTypeAddContext);
    const [isTextFieldsCleaningType,setIsTextFieldsCleaningType] = useContext(TextFieldsCleaningTypeContext); 
    const [socket] = useContext(SocketContext);
    const [isLoggedUser] = useContext(LoggedUserContext);
    const [isKeyboard,setIsKeyboard] = useContext(KeyboardContext);
    const [isKeyboardView,setIsKeyboardView] = useContext(KeyboardViewContext);
    const Keyboard = useContext(RefKeyboardContext);
    const isKeyboardTouch = useContext(RefKeyboardTouchContext);
    const [isTouch] = useContext(TouchContext);
    const Modal = useContext(RefModalContext);
    const isForm = useContext(RefFormContext);
    const [isSidebar,setIsSidebar] = useContext(SidebarContext);
    const [isDeletedCleaningTypes] = useContext(DeletedCleaningTypesContext);
    // Constantes con la funcionalidad de los hooks
    const navigate = useNavigate();
    const handleModalViewExtras = HandleModalViewExtras();
    const handleCountCleaningTypeAdd = HandleCountCleaningTypeAdd();
    const { KeyboardView,KeyboardClick } = HandleKeyboard();
    // UseEffct para verificar la eliminacion del tipo de limpieza
    useEffect(() => {
        if(isDeletedCleaningTypes.length !== 0){
            if(isDeletedCleaningTypes.some(type => type.idtipo === isTextFieldsCleaningType.idtipo)){
                setIsSelectedRow(null);
            }
        }
    },[isDeletedCleaningTypes]);
    // Useffect para controlar el sidebar
    useEffect(() => {
        if(isSidebar){
            setIsSidebar(false);
        }
    },[]);
    // UseEffect para reiniciar los valores 
    useEffect(() => {
        setIsTextFieldsCleaningType(prev => ({...prev, cantidades: [{ cantidad: '' }]}))
    },[])
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
        if(isCleaningTypeCountAdd){
            const promise = new Promise((resolve,reject) => {
                try{
                    setTimeout(() => {
                        socket.emit('Insert-Count-Cleaning-Type',isLoggedUser.idusuario,Number(isTextFieldsCleaningType.cantidades[0].cantidad),isTextFieldsCleaningType.idtipo);

                        resolve('¡Agregó una cantidad al tipo de limpieza!');

                        setIsCleaningTypeCountAdd(false)

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
                    setIsCleaningTypeCountAdd(false);
                    return reject('¡Ocurrio un error inesperado!');
                }
            });

            return Alert_Sonner_Promise(promise,'¡Agregando una cantidad al tipo de limpieza!','2');
        }
    },[isCleaningTypeCountAdd]);
    // Estructura del componente
    return(
        <>
            {isModal && isSelectedRow !== null ? (
                <Container_Modal_Background_Black ref={Modal}>
                    <Image_Modal/>
                    <Container_Modal_Form_White_600 ref={isForm} className={currentMView === 'Tipo-Limpieza-Cantidad-Agregar' ? 'slide-in-container-top' : 'slide-out-container-top'}>
                        <Container_Modal_Form_White>
                            <Container_Modal_Form>
                                <Text_Title_28_Black>AGREGAR CANTIDAD AL TIPO DE LIMPIEZA</Text_Title_28_Black>
                                <Container_Row_NG_Auto_Center>
                                    <Text_Color_Blue_16>MEALSYNC</Text_Color_Blue_16>
                                    <Text_Span_16_Center_Black>: Datos generales</Text_Span_16_Center_Black>
                                </Container_Row_NG_Auto_Center>
                                <Container_Row_NG_Auto_Center>
                                    <Text_Color_Green_16>Tipo de Limpieza</Text_Color_Green_16>
                                    <Text_Span_16_Center_Black>: {isTextFieldsCleaningType.tipo || 'Desconocido'}</Text_Span_16_Center_Black>
                                </Container_Row_NG_Auto_Center>
                                <Container_Row_NG_Auto_Center>
                                    <Text_Color_Blue_16>MEALSYNC</Text_Color_Blue_16>
                                    <Text_Span_16_Center_Black>: Datos específicos</Text_Span_16_Center_Black>
                                </Container_Row_NG_Auto_Center>
                                <Container_Row_NG_Auto_Center>
                                    <Text_Color_Green_16>Unidad</Text_Color_Green_16>
                                    <Text_Span_16_Center_Black>: {isTextFieldsCleaningType.unidad || 'Desconocida'}</Text_Span_16_Center_Black>
                                </Container_Row_NG_Auto_Center>
                                <Container_Row_NG_Auto_Center>
                                    <Text_Color_Green_16>Categoría</Text_Color_Green_16>
                                    <Text_Span_16_Center_Black>: {isCleaningCategories.find(category => category.idcategoria === isTextFieldsCleaningType.idcategoria)?.nombre || 'Desconocida'}</Text_Span_16_Center_Black>
                                </Container_Row_NG_Auto_Center>
                                <Container_Row_100_Left>
                                    <Label_Text_16_Black>Cantidad:</Label_Text_16_Black>
                                    <Input_Group>
                                        <Input_Text_100_Black
                                            className="Input-Cantidad"
                                            placeholder="..."
                                            type="text"
                                            disabled={isActionBlock}
                                            value={isTextFieldsCleaningType.cantidades?.[0]?.cantidad ?? ''}
                                            onChange={(e) => {
                                                if(!isNaN(Number(e.target.value))){
                                                    setIsTextFieldsCleaningType(prev => ({...prev, cantidades: [{ cantidad: e.target.value }]}))
                                                }
                                            }}
                                            onFocus={() => {
                                                if(isKeyboardTouch.current){
                                                    setIsKeyboard(true);
                                                    setIsKeyboardView('Cantidad-Tipo-Limpieza');
                                                }
                                            }}
                                        />
                                    </Input_Group>
                                    <Icon_Button_Blue_20
                                        onClick={() => {
                                            setIsTextFieldsCleaningType(prev => ({...prev, cantidades: [{ cantidad: '' }]}))
                                        }}
                                        disabled={isActionBlock}
                                    >
                                        <MdCancel/>
                                    </Icon_Button_Blue_20>
                                </Container_Row_100_Left>
                                <Modal_Form_Button_Add
                                    onCancel={() => handleModalViewExtras('')}
                                    onAction={() => handleCountCleaningTypeAdd()}
                                    icon={<MdAddBox/>}
                                />
                            </Container_Modal_Form>
                        </Container_Modal_Form_White>
                    </Container_Modal_Form_White_600>
                    <Keyboard_Form_Cleaning_Type/>
                </Container_Modal_Background_Black>
            ):(
                currentMView === 'Tipo-Limpieza-Cantidad-Agregar' ? (
                    <>
                        <Error_Add/>
                    </>
                ):(
                    <></>
                )
            )}
        </>
    );
}