//____________IMPORT/EXPORT____________
// Hooks de React
import { useContext,useEffect,useState } from "react";
import { useNavigate } from "react-router-dom";
// Contextos
import { ModalContext,ModalViewContext,SidebarContext } from "../../../../contexts/ViewsProvider";
import { SearchTermContext } from "../../../../contexts/SearchsProvider";
import { ActionBlockContext,KeyboardContext,KeyboardViewContext,TouchContext } from "../../../../contexts/VariablesProvider";
import { TextFieldsSupplyTypesContext } from "../../../../contexts/FormsProvider";
import { SupplyTypeEditContext,DeletedSupplyCategoriesContext,SupplyCategoriesContext } from "../../../../contexts/SuppliesProvider";
import { RefKeyboardContext,RefKeyboardTouchContext,RefModalContext,RefFormContext } from "../../../../contexts/RefsProvider";
import { SocketContext } from "../../../../contexts/SocketProvider";
import { LoggedUserContext } from "../../../../contexts/SessionProvider";
import { SelectedRowContext } from "../../../../contexts/SelectedesProvider";
// Hooks personalizados
import { HandleModalViewSupplies } from "../../../../hooks/supplies/Views";
import { FilteredRecordsSupplyCategoriesDeleted,HandleSupplyTypeEdit } from "../../../../hooks/supplies/Forms";
import { HandleKeyboard } from "../../../../hooks/Views";
import { TableActionsSupplyCategories } from "../../../../hooks/supplies/Tables";
//__________ICONOS__________
// Icono para el buscador
import { FcSearch } from "react-icons/fc";
// Icono para realizar la función del modal
import { MdCancel } from "react-icons/md";
//__________ICONOS__________
// Estilos personalizados
import { Container_Modal_Background_Black,Container_Row_100_Left,Container_Row_100_Center,Container_Row_NG_Auto_Center,Container_Modal_Form_White_600,Container_Modal_Form_White,Container_Modal_Form } from "../../../styled/Containers";
import { Text_Span_16_Center_Black,Text_Color_Blue_16,Text_Title_28_Black,Text_Color_Green_16,Text_Span_12_Justify_Black } from "../../../styled/Text";
import { Input_Text_100_Black,Input_Area_100_Black,Input_Group,Input_Radio_20,Input_Text_60_Black } from "../../../styled/Inputs";
import { Icon_24,Icon_Button_Blue_20 } from "../../../styled/Icons";
import { Alert_Sonner_Promise } from "../../../styled/Alerts";
import { Label_Text_12_Black,Label_Area_12_Black,Label_Button_16_Black,Label_Text_16_Black } from "../../../styled/Labels";
// Componentes personalizados
import { Image_Modal } from "../../../styled/Imgs";
import { Select_300 } from "../../../styled/Selects";
import { Modal_Form_Button_Edit } from "../../../forms/Button";
import { Keyboard_Form_Supply_Type } from "../../../keyboards/Form";
import Error_Edit from "../../errors/Edit";
//____________IMPORT/EXPORT____________

// Modal para editar tipos de insumo a su tabla
export default function Supply_Type_Edit(){
    // Constantes con el valor de los contextos
    const [currentMView,setCurrentMView] = useContext(ModalViewContext);
    const [isModal,setIsModal] = useContext(ModalContext);
    const [isActionBlock,setIsActionBlock] = useContext(ActionBlockContext);
    const [isSearchTerm,setIsSearchTerm] = useContext(SearchTermContext);
    const [isSupplyTypeEdit,setIsSupplyTypeEdit] = useContext(SupplyTypeEditContext);
    const [isTextFieldsSupplyType,setIsTextFieldsSupplyType] = useContext(TextFieldsSupplyTypesContext);
    const [socket] = useContext(SocketContext);
    const [isLoggedUser] = useContext(LoggedUserContext);
    const [isKeyboard,setIsKeyboard] = useContext(KeyboardContext);
    const [isKeyboardView,setIsKeyboardView] = useContext(KeyboardViewContext);
    const Keyboard = useContext(RefKeyboardContext);
    const isKeyboardTouch = useContext(RefKeyboardTouchContext);
    const [isTouch] = useContext(TouchContext);
    const [isSidebar,setIsSidebar] = useContext(SidebarContext);
    const [isSelectedRow,setIsSelectedRow] = useContext(SelectedRowContext);
    const Modal = useContext(RefModalContext);
    const isForm = useContext(RefFormContext);
    const [isDeletedSupplyCategories] = useContext(DeletedSupplyCategoriesContext);
    const [isSupplyCategories] = useContext(SupplyCategoriesContext);
    // Constantes con la funcionalidad de los hooks
    const navigate = useNavigate();
    const handleModalViewSupplies = HandleModalViewSupplies();
    const handleSupplyTypeEdit = HandleSupplyTypeEdit();
    const filteredRecordsSupplyCategoriesDeleted = FilteredRecordsSupplyCategoriesDeleted();
    const { filteredRecordsSupplyCategories } = TableActionsSupplyCategories();
    const { KeyboardView,KeyboardClick } = HandleKeyboard();
    // Constantes con el valor de useState
    const [isTotalDescription,setIsTotalDescription] = useState(0)
    const [isTotalType,setIsTotalType] = useState(0)
    // UseEffects para el limite de caracteres de los campos del formulario
    useEffect(() => {
        if (!isSelectedRow) return;
        if(isSelectedRow.idcategoria !== isTextFieldsSupplyType.idcategoria){
            setIsTextFieldsSupplyType(prev => ({
                ...prev,
                idcategoria: 0,
            }));
        }
    },[isSearchTerm]);
    useEffect(() => {
        setIsTotalType(isTextFieldsSupplyType.tipo.length);
    },[isTextFieldsSupplyType.tipo]);
    useEffect(() => {
        setIsTotalDescription(isTextFieldsSupplyType.descripcion.length);
    },[isTextFieldsSupplyType.descripcion]);
    useEffect(() => {
        if (!isSelectedRow) return;
        if(isSelectedRow.idcategoria !== isTextFieldsSupplyType.idcategoria){
            if(isTextFieldsSupplyType.idcategoria !== 0){
                if(isDeletedSupplyCategories.some(deleted => deleted.idcategoria === isTextFieldsSupplyType.idcategoria)){
                    setIsTextFieldsSupplyType(prev => ({
                        ...prev,
                        idcategoria: 0,
                    }));
                }
            }
        }
    },[isDeletedSupplyCategories]);
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
    // UseEffect para editar datos a la base de datos
    useEffect(() => {
        if(isSupplyTypeEdit){
            const promise = new Promise((resolve,reject) => {
                try{
                    setTimeout(() => {
                        socket.emit('Update-Supply-Type',isLoggedUser.idusuario,isTextFieldsSupplyType.idtipo,isTextFieldsSupplyType.tipo.trim(),isTextFieldsSupplyType.descripcion.trim(),isTextFieldsSupplyType.unidad,isTextFieldsSupplyType.idcategoria,Number(isTextFieldsSupplyType.limite));

                        resolve('¡Editó al tipo de insumo!');

                        setIsSupplyTypeEdit(false)

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
                    setIsSupplyTypeEdit(false);
                    return reject('¡Ocurrio un error inesperado!');
                }
            });

            return Alert_Sonner_Promise(promise,'¡Editando un tipo de insumo!','2');
        }
    },[isSupplyTypeEdit]);
    // Estructura del componente
    return(
        <>
            {isModal && isSelectedRow !== null ? (
                <Container_Modal_Background_Black ref={Modal}>
                    <Image_Modal/>
                    <Container_Modal_Form_White_600 ref={isForm} className={currentMView === 'Tipo-Insumo-Editar' ? 'slide-in-container-top' : 'slide-out-container-top'}>
                        <Container_Modal_Form_White>
                            <Container_Modal_Form>
                                <Text_Title_28_Black>EDITAR TIPO DE INSUMO</Text_Title_28_Black>
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
                                            value={isTextFieldsSupplyType.tipo}
                                            onChange={(e) => setIsTextFieldsSupplyType(prev => ({...prev, tipo: e.target.value}))}
                                            onFocus={() => {
                                                if(isKeyboardTouch.current){
                                                    setIsKeyboard(true);
                                                    setIsKeyboardView('Nombre-Tipo-Insumo');
                                                }
                                            }}
                                        />
                                        <Label_Text_12_Black>{isTotalType}/150</Label_Text_12_Black>
                                    </Input_Group>
                                    <Icon_Button_Blue_20
                                        onClick={() => {
                                            setIsTextFieldsSupplyType(prev => ({...prev, tipo: ''}))
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
                                            value={isTextFieldsSupplyType.descripcion}
                                            onChange={(e) => setIsTextFieldsSupplyType(prev => ({...prev, descripcion: e.target.value}))}
                                            onFocus={() => {
                                                if(isKeyboardTouch.current){
                                                    setIsKeyboard(true);
                                                    setIsKeyboardView('Descripcion-Tipo-Insumo');
                                                }
                                            }}
                                        />
                                        <Label_Area_12_Black>{isTotalDescription}/250</Label_Area_12_Black>
                                    </Input_Group>
                                    <Icon_Button_Blue_20
                                        onClick={() => {
                                            setIsTextFieldsSupplyType(prev => ({...prev, descripcion: ''}))
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
                                        <Label_Button_16_Black Disabled={isActionBlock || isTextFieldsSupplyType.unidad !== 'Pieza' && item === 'Pieza' || isTextFieldsSupplyType.unidad === 'Pieza' && item !== 'Pieza'} key={index}>
                                            <Input_Radio_20
                                                type="radio"
                                                name="units"
                                                disabled={isActionBlock ||  isTextFieldsSupplyType.unidad !== 'Pieza' && item === 'Pieza' || isTextFieldsSupplyType.unidad === 'Pieza' && item !== 'Pieza'}
                                                value={item}
                                                checked={isTextFieldsSupplyType.unidad === item}
                                                onChange={(e) => setIsTextFieldsSupplyType(prev => ({...prev, unidad: e.target.value}))}
                                            />
                                            {item}
                                        </Label_Button_16_Black>
                                    ))}
                                </Container_Row_100_Center>
                                {isDeletedSupplyCategories.some(category => category.idcategoria === isTextFieldsSupplyType.idcategoria) ? (
                                    <Container_Row_NG_Auto_Center>
                                        <Text_Color_Green_16>Categoría</Text_Color_Green_16>
                                        <Text_Span_16_Center_Black>: {isSupplyCategories.find(category => category.idcategoria === isTextFieldsSupplyType.idcategoria)?.nombre || 'Desconocida'}</Text_Span_16_Center_Black>
                                    </Container_Row_NG_Auto_Center>            
                                ):(
                                    <>
                                        <Container_Row_NG_Auto_Center>
                                            <Text_Color_Green_16>Categoría</Text_Color_Green_16>
                                            <Text_Span_16_Center_Black>:</Text_Span_16_Center_Black>
                                        </Container_Row_NG_Auto_Center>
                                        {filteredRecordsSupplyCategoriesDeleted.length !== 0 ? (
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
                                                                setIsKeyboardView('Buscador');
                                                            }
                                                        }}
                                                        disabled={isActionBlock}
                                                    />
                                                </Container_Row_100_Center>
                                                <Select_300
                                                    data={filteredRecordsSupplyCategories.length}
                                                    options={filteredRecordsSupplyCategories.map((category) => ({
                                                        value: category.idcategoria,
                                                        label: category.nombre
                                                    }))}
                                                    placeholder='Categorías...'
                                                    value={filteredRecordsSupplyCategories
                                                        .map(category => ({ value: category.idcategoria, label: category.nombre }))
                                                        .find(option => option.value === isTextFieldsSupplyType.idcategoria)
                                                    }
                                                    onChange={(e) => {
                                                        if (e) {
                                                            setIsTextFieldsSupplyType(prev => ({
                                                                ...prev,
                                                                idcategoria: e.value,
                                                            }));
                                                        } else {
                                                            setIsTextFieldsSupplyType(prev => ({
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
                                    </>
                                )}
                                <Container_Row_100_Left>
                                    <Label_Text_16_Black>Cantidad mínima:</Label_Text_16_Black>
                                    <Input_Group>
                                        <Input_Text_100_Black
                                            id="Input-Limite"
                                            placeholder="..."
                                            type="text"
                                            disabled={isActionBlock}
                                            value={isTextFieldsSupplyType.limite}
                                            onChange={(e) => {
                                                if(!isNaN(Number(e.target.value))){
                                                    setIsTextFieldsSupplyType(prev => ({...prev, limite: e.target.value}))
                                                }
                                            }}
                                            onFocus={() => {
                                                if(isKeyboardTouch.current){
                                                    setIsKeyboard(true);
                                                    setIsKeyboardView('Limite');
                                                }
                                            }}
                                        />
                                    </Input_Group>
                                    <Icon_Button_Blue_20
                                        onClick={() => {
                                            setIsTextFieldsSupplyType(prev => ({...prev, limite: ''}))
                                        }}
                                        disabled={isActionBlock}
                                    >
                                        <MdCancel/>
                                    </Icon_Button_Blue_20>
                                </Container_Row_100_Left>
                                <Text_Span_12_Justify_Black>Recuerda que modificar el nombre impacta en la asignación de nuevos insumos, platillos, guarniciones o bebidas; la unidad solo puede cambiarse si era previamente kilogramo o litro; y cambiar el límite puede afectar las alertas de escasez en el inventario.</Text_Span_12_Justify_Black>
                                <Modal_Form_Button_Edit
                                    onCancel={() => handleModalViewSupplies('')}
                                    onAction={() => handleSupplyTypeEdit()}
                                />
                            </Container_Modal_Form>
                        </Container_Modal_Form_White>
                    </Container_Modal_Form_White_600>
                    <Keyboard_Form_Supply_Type/>
                </Container_Modal_Background_Black>
            ):(
                currentMView === 'Tipo-Insumo-Editar' ? (
                    <>
                        <Error_Edit/>
                    </>
                ):(
                    <></>
                )
            )}
        </>
    );
}