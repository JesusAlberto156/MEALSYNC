//____________IMPORT/EXPORT____________
// Hooks de React
import { useContext,useEffect,useState } from "react";
import { useNavigate } from "react-router-dom";
// Contextos
import { ModalContext,ModalViewContext,SidebarContext } from "../../../../contexts/ViewsProvider";
import { SearchTermContext } from "../../../../contexts/SearchsProvider";
import { ActionBlockContext,KeyboardContext,KeyboardViewContext,TouchContext } from "../../../../contexts/VariablesProvider";
import { TextFieldsCleaningTypeContext } from "../../../../contexts/FormsProvider";
import { CleaningTypeAddContext,DeletedCleaningCategoriesContext } from "../../../../contexts/ExtrasProvider";
import { RefKeyboardContext,RefKeyboardTouchContext } from "../../../../contexts/RefsProvider";
import { SocketContext } from "../../../../contexts/SocketProvider";
import { LoggedUserContext } from "../../../../contexts/SessionProvider";
import { SelectedRowContext } from "../../../../contexts/SelectedesProvider";
// Hooks personalizados
import { HandleModalViewExtras } from "../../../../hooks/extras/Views";
import { FilteredRecordsCleaningCategoriesDeleted,HandleCleaningTypeAdd } from "../../../../hooks/extras/Forms";
import { HandleKeyboard } from "../../../../hooks/Views";
import { TableActionsCleaningCategories } from "../../../../hooks/extras/Tables";
//__________ICONOS__________
// Icono para el buscador
import { FcSearch } from "react-icons/fc";
// Icono para realizar la función del modal
import { MdCancel } from "react-icons/md";
//__________ICONOS__________
// Estilos personalizados
import { Container_Modal_Background_Black,Container_Row_100_Left,Container_Row_100_Center,Container_Row_NG_Auto_Center,Container_Modal_Form_White_600,Container_Modal_Form_White,Container_Modal_Form } from "../../../styled/Containers";
import { Text_Span_16_Center_Black,Text_Color_Blue_16,Text_Title_28_Black,Text_Color_Green_16 } from "../../../styled/Text";
import { Input_Text_100_Black,Input_Area_100_Black,Input_Group,Input_Radio_20,Input_Text_60_Black } from "../../../styled/Inputs";
import { Icon_24,Icon_Button_Blue_20 } from "../../../styled/Icons";
import { Alert_Sonner_Promise } from "../../../styled/Alerts";
import { Label_Text_12_Black,Label_Area_12_Black,Label_Button_16_Black,Label_Text_16_Black } from "../../../styled/Labels";
// Componentes personalizados
import { Image_Modal } from "../../../styled/Imgs";
import { Select_300 } from "../../../styled/Selects";
import { Modal_Form_Button_Add } from "../../../forms/Button";
import { Keyboard_Form_Cleaning_Type } from "../../../keyboards/Form";
//____________IMPORT/EXPORT____________

// Modal para agregar tipos de limpieza a su tabla
export default function Cleaning_Type_Add(){
    // Constantes con el valor de los contextos
    const [currentMView,setCurrentMView] = useContext(ModalViewContext);
    const [isModal,setIsModal] = useContext(ModalContext);
    const [isActionBlock,setIsActionBlock] = useContext(ActionBlockContext);
    const [isSearchTerm,setIsSearchTerm] = useContext(SearchTermContext);
    const [isCleaningTypeAdd,setIsCleaningTypeAdd] = useContext(CleaningTypeAddContext);
    const [isDeletedCleaningCategories] = useContext(DeletedCleaningCategoriesContext);
    const [isTextFieldsCleaningType,setIsTextFieldsCleaningType] = useContext(TextFieldsCleaningTypeContext); 
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
    const handleModalViewExtras = HandleModalViewExtras();
    const handleCleaningTypeAdd = HandleCleaningTypeAdd();
    const filteredRecordsCleaningCategoriesDeleted = FilteredRecordsCleaningCategoriesDeleted();
    const { filteredRecordsCleaningCategories } = TableActionsCleaningCategories();
    const { KeyboardView,KeyboardClick } = HandleKeyboard();
    // Constantes con el valor de useState
    const [isTotalDescription,setIsTotalDescription] = useState(0)
    const [isTotalType,setIsTotalType] = useState(0)
    // UseEffects para el limite de caracteres de los campos del formulario
    useEffect(() => {
        setIsTextFieldsCleaningType(prev => ({
            ...prev,
            idcategoria: 0,
        }));
    },[isSearchTerm]);
    useEffect(() => {
        setIsTotalType(isTextFieldsCleaningType.tipo.length);
    },[isTextFieldsCleaningType.tipo]);
    useEffect(() => {
        setIsTotalDescription(isTextFieldsCleaningType.descripcion.length);
    },[isTextFieldsCleaningType.descripcion]);
    useEffect(() => {
        if(isTextFieldsCleaningType.idcategoria !== 0){
            if(isDeletedCleaningCategories.some(deleted => deleted.idcategoria === isTextFieldsCleaningType.idcategoria)){
                setIsTextFieldsCleaningType(prev => ({
                    ...prev,
                    idcategoria: 0,
                }));
            }
        }
    },[isDeletedCleaningCategories]);
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
        if(isCleaningTypeAdd){
            const promise = new Promise((resolve,reject) => {
                try{
                    setTimeout(() => {
                        socket.emit('Insert-Cleaning-Type',isLoggedUser.idusuario,isTextFieldsCleaningType.tipo.trim(),isTextFieldsCleaningType.descripcion.trim(),isTextFieldsCleaningType.unidad,isTextFieldsCleaningType.idcategoria,Number(isTextFieldsCleaningType.limite));

                        resolve('¡Agregó al tipo de limpieza!');

                        setIsCleaningTypeAdd(false)

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
                    setIsCleaningTypeAdd(false);
                    return reject('¡Ocurrio un error inesperado!');
                }
            });

            Alert_Sonner_Promise(promise,'¡Agregando un tipo de limpieza!','2');
        }
    },[isCleaningTypeAdd]);
    // Estructura del componente
    return(
        <>
            {isModal ? (
                <Container_Modal_Background_Black>
                    <Image_Modal/>
                    <Container_Modal_Form_White_600 className={currentMView === 'Tipo-Limpieza-Agregar' ? 'slide-in-container-top' : 'slide-out-container-top'}>
                        <Container_Modal_Form_White>
                            <Container_Modal_Form>
                                <Text_Title_28_Black>AGREGAR TIPO DE LIMPIEZA</Text_Title_28_Black>
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
                                            maxLength={150}
                                            disabled={isActionBlock}
                                            value={isTextFieldsCleaningType.tipo}
                                            onChange={(e) => setIsTextFieldsCleaningType(prev => ({...prev, tipo: e.target.value}))}
                                            onFocus={() => {
                                                if(isKeyboardTouch.current){
                                                    setIsKeyboard(true);
                                                    setIsKeyboardView('Nombre-Tipo-Limpieza');
                                                }
                                            }}
                                        />
                                        <Label_Text_12_Black>{isTotalType}/150</Label_Text_12_Black>
                                    </Input_Group>
                                    <Icon_Button_Blue_20
                                        onClick={() => {
                                            setIsTextFieldsCleaningType(prev => ({...prev, tipo: ''}))
                                        }}
                                        disabled={isActionBlock}
                                    >
                                        <MdCancel/>
                                    </Icon_Button_Blue_20>
                                </Container_Row_100_Left>
                                <Container_Row_100_Left>
                                    <Label_Text_16_Black>Descripción:</Label_Text_16_Black>
                                    <Input_Group>
                                        <Input_Area_100_Black
                                            id="Input-Descripcion"
                                            placeholder="..."
                                            type="text"
                                            maxLength={250}
                                            rows={3}
                                            disabled={isActionBlock}
                                            value={isTextFieldsCleaningType.descripcion}
                                            onChange={(e) => setIsTextFieldsCleaningType(prev => ({...prev, descripcion: e.target.value}))}
                                            onFocus={() => {
                                                if(isKeyboardTouch.current){
                                                    setIsKeyboard(true);
                                                    setIsKeyboardView('Descripcion-Tipo-Limpieza');
                                                }
                                            }}
                                        />
                                        <Label_Area_12_Black>{isTotalDescription}/250</Label_Area_12_Black>
                                    </Input_Group>
                                    <Icon_Button_Blue_20
                                        onClick={() => {
                                            setIsTextFieldsCleaningType(prev => ({...prev, descripcion: ''}))
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
                                <Container_Row_NG_Auto_Center>
                                    <Text_Color_Green_16>Unidad</Text_Color_Green_16>
                                    <Text_Span_16_Center_Black>:</Text_Span_16_Center_Black>
                                </Container_Row_NG_Auto_Center>
                                <Container_Row_100_Center>
                                    {['Kilogramo','Litro','Pieza'].map((item,index) => (
                                        <Label_Button_16_Black Disabled={isActionBlock} key={index}>
                                            <Input_Radio_20
                                                type="radio"
                                                name="units"
                                                disabled={isActionBlock}
                                                value={item}
                                                checked={isTextFieldsCleaningType.unidad === item}
                                                onChange={(e) => setIsTextFieldsCleaningType(prev => ({...prev, unidad: e.target.value}))}
                                            />
                                            {item}
                                        </Label_Button_16_Black>
                                    ))}
                                </Container_Row_100_Center>
                                <Container_Row_NG_Auto_Center>
                                    <Text_Color_Green_16>Categoría</Text_Color_Green_16>
                                    <Text_Span_16_Center_Black>:</Text_Span_16_Center_Black>
                                </Container_Row_NG_Auto_Center>
                                {filteredRecordsCleaningCategoriesDeleted.length !== 0 ? (
                                    <>
                                        <Container_Row_100_Center>
                                            <Icon_24><FcSearch/></Icon_24>
                                            <Input_Text_60_Black
                                                className="Input-Buscador"
                                                type="text"
                                                placeholder="Buscar..."
                                                value={isSearchTerm}
                                                onChange={(e) => setIsSearchTerm(e.target.value)}
                                                onFocus={() => {
                                                    if(isKeyboardTouch.current){
                                                        setIsKeyboard(true);
                                                        setIsKeyboardView('Buscador-Tipo-Limpieza');
                                                    }
                                                }}
                                                disabled={isActionBlock}
                                            />
                                        </Container_Row_100_Center>
                                        <Select_300
                                            data={filteredRecordsCleaningCategories.length}
                                            options={filteredRecordsCleaningCategories.map((category) => ({
                                                value: category.idcategoria,
                                                label: category.nombre
                                            }))}
                                            placeholder='Categorías...'
                                            value={filteredRecordsCleaningCategories
                                                .map(category => ({ value: category.idcategoria, label: category.nombre }))
                                                .find(option => option.value === isTextFieldsCleaningType.idcategoria)
                                            }
                                            onChange={(e) => {
                                                if (e) {
                                                    setIsTextFieldsCleaningType(prev => ({
                                                        ...prev,
                                                        idcategoria: e.value,
                                                    }));
                                                } else {
                                                    setIsTextFieldsCleaningType(prev => ({
                                                        ...prev,
                                                        idcategoria: 0,
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
                                <Container_Row_100_Left>
                                    <Label_Text_16_Black>Cantidad mínima:</Label_Text_16_Black>
                                    <Input_Group>
                                        <Input_Text_100_Black
                                            id="Input-Limite"
                                            placeholder="..."
                                            type="text"
                                            disabled={isActionBlock}
                                            value={isTextFieldsCleaningType.limite}
                                            onChange={(e) => {
                                                if(!isNaN(Number(e.target.value))){
                                                    setIsTextFieldsCleaningType(prev => ({...prev, limite: e.target.value}))
                                                }
                                            }}
                                            onFocus={() => {
                                                if(isKeyboardTouch.current){
                                                    setIsKeyboard(true);
                                                    setIsKeyboardView('Limite-Tipo-Limpieza');
                                                }
                                            }}
                                        />
                                    </Input_Group>
                                    <Icon_Button_Blue_20
                                        onClick={() => {
                                            setIsTextFieldsCleaningType(prev => ({...prev, limite: ''}))
                                        }}
                                        disabled={isActionBlock}
                                    >
                                        <MdCancel/>
                                    </Icon_Button_Blue_20>
                                </Container_Row_100_Left>
                                <Modal_Form_Button_Add
                                    onCancel={() => handleModalViewExtras('')}
                                    onAction={() => handleCleaningTypeAdd()}
                                />
                            </Container_Modal_Form>
                        </Container_Modal_Form_White>
                    </Container_Modal_Form_White_600>
                    <Keyboard_Form_Cleaning_Type/>
                </Container_Modal_Background_Black>
            ):(
                <></>
            )}
        </>
    );
}