//____________IMPORT/EXPORT____________
// Hooks de React
import { useContext,useEffect,useState } from "react";
import { useNavigate } from "react-router-dom";
// Contextos
import { ModalContext,ModalViewContext,SidebarContext } from "../../../../contexts/ViewsProvider";
import { SearchTerm1Context,SearchTerm2Context,SearchTerm3Context } from "../../../../contexts/SearchsProvider";
import { ActionBlockContext,KeyboardContext,KeyboardViewContext,TouchContext } from "../../../../contexts/VariablesProvider";
import { TextFieldsSupplyContext } from "../../../../contexts/FormsProvider";
import { SuppliersContext,DeletedSuppliersContext } from "../../../../contexts/SuppliersProvider";
import { SupplyCategoriesContext,SupplyTypesContext,SupplyEditContext,DeletedSupplyCategoriesContext,DeletedSuppliesContext,DeletedSupplyTypesContext } from "../../../../contexts/SuppliesProvider";
import { RefKeyboardContext,RefModalContext,RefFormContext,RefKeyboardTouchContext } from "../../../../contexts/RefsProvider";
import { SocketContext } from "../../../../contexts/SocketProvider";
import { LoggedUserContext } from "../../../../contexts/SessionProvider";
import { SelectedRowContext } from "../../../../contexts/SelectedesProvider";
// Hooks personalizados
import { HandleModalViewSupplies } from "../../../../hooks/supplies/Views";
import { HandleSupplyEdit,FilteredRecordsSuppliers,FilteredRecordsSuppliersDeleted,FilteredRecordsSupplyCategoriesDeleted,FilteredRecordsSupplyCategories,FilteredRecordsSupplyTypes,FilteredRecordsCountSupplyTypes } from "../../../../hooks/supplies/Forms";
import { HandleKeyboard } from "../../../../hooks/Views";
//__________IMAGENES__________
import Supply from '../../../imgs/Supply.jpg'
//__________IMAGENES__________
//__________ICONOS__________
// Icono para el buscador
import { FcSearch } from "react-icons/fc";
// Icono para realizar la función del modal
import { MdCancel } from "react-icons/md";
//__________ICONOS__________
// Estilos personalizados
import { Container_Modal_Background_Black,Container_Row_100_Center,Container_Row_100_Left,Container_Row_NG_Auto_Center,Container_Modal_Form_White_600,Container_Modal_Form_White,Container_Modal_Form } from "../../../styled/Containers";
import { Text_Span_16_Center_Black,Text_Color_Green_16,Text_Color_Blue_16,Text_Span_12_Justify_Black,Text_Title_28_Black } from "../../../styled/Text";
import { Input_Text_100_Black,Input_Area_100_Black,Input_Group,Input_Text_60_Black } from "../../../styled/Inputs";
import { Icon_24,Icon_Button_Blue_20 } from "../../../styled/Icons";
import { Button_Text_Blue_Auto } from "../../../styled/Buttons";
import { Alert_Sonner_Promise } from "../../../styled/Alerts";
import { Label_Text_12_Black,Label_Area_12_Black,Label_Text_16_Black } from "../../../styled/Labels";
// Componentes personalizados
import Error_Edit from "../../errors/Edit";
import { Image_Modal,Image_Modal_150 } from "../../../styled/Imgs";
import { Keyboard_Form_Supply } from "../../../keyboards/Form";
import { Modal_Form_Button_Edit } from "../../../forms/Button";
import { Select_300 } from "../../../styled/Selects";
//____________IMPORT/EXPORT____________

// Modal para editar insumos a su tabla
export default function Supply_Edit(){
    // Constantes con el valor de los contextos
    const [currentMView,setCurrentMView] = useContext(ModalViewContext);
    const [isModal,setIsModal] = useContext(ModalContext);
    const [isActionBlock,setIsActionBlock] = useContext(ActionBlockContext);
    const [isSearchTerm1,setIsSearchTerm1] = useContext(SearchTerm1Context);
    const [isSearchTerm2,setIsSearchTerm2] = useContext(SearchTerm2Context);
    const [isSearchTerm3,setIsSearchTerm3] = useContext(SearchTerm3Context);
    const Modal = useContext(RefModalContext);
    const isForm = useContext(RefFormContext);
    const [isSuppliers] = useContext(SuppliersContext);
    const [isDeletedSuppliers] = useContext(DeletedSuppliersContext);
    const [isDeletedSupplyCategories] = useContext(DeletedSupplyCategoriesContext);
    const [isDeletedSupplyTypes] = useContext(DeletedSupplyTypesContext);
    const [isSupplyCategories] = useContext(SupplyCategoriesContext);
    const [isSupplyTypes] = useContext(SupplyTypesContext);
    const [isSupplyEdit,setIsSupplyEdit] = useContext(SupplyEditContext);
    const [isTextFieldsSupply,setIsTextFieldsSupply] = useContext(TextFieldsSupplyContext);
    const [socket] = useContext(SocketContext);
    const [isLoggedUser] = useContext(LoggedUserContext);
    const [isKeyboard,setIsKeyboard] = useContext(KeyboardContext);
    const [isKeyboardView,setIsKeyboardView] = useContext(KeyboardViewContext);
    const Keyboard = useContext(RefKeyboardContext);
    const isKeyboardTouch = useContext(RefKeyboardTouchContext);
    const [isTouch] = useContext(TouchContext);
    const [isSidebar,setIsSidebar] = useContext(SidebarContext);
    const [isSelectedRow,setIsSelectedRow] = useContext(SelectedRowContext);
    const [isDeletedSupplies] = useContext(DeletedSuppliesContext);
    // Constantes con la funcionalidad de los hooks
    const navigate = useNavigate();
    const handleModalViewSupplies = HandleModalViewSupplies();
    const handleSupplyEdit = HandleSupplyEdit();
    const filteredRecordsSupplyCategoriesDeleted = FilteredRecordsSupplyCategoriesDeleted();
    const filteredRecordsSuppliersDeleted = FilteredRecordsSuppliersDeleted();
    const filteredRecordsSuppliers = FilteredRecordsSuppliers();
    const filteredRecordsSupplyCategories = FilteredRecordsSupplyCategories();
    const filteredRecordsSupplyTypes = FilteredRecordsSupplyTypes();
    const filteredRecordsCountSupplyTypes = FilteredRecordsCountSupplyTypes();
    const { KeyboardView,KeyboardClick } = HandleKeyboard();
    // Constantes con el valor de useState
    const [isTotalCode,setIsTotalCode] = useState(0)
    const [isTotalDescription,setIsTotalDescription] = useState(0)
    const [isTotalName,setIsTotalName] = useState(0)
    const [isTotalImage,setIsTotalImage] = useState(0)
    const [isImage,setIsImage] = useState('');
    // UseEffct para verificar la eliminacion del insumo
    useEffect(() => {
        if(isDeletedSupplies.length !== 0){
            if(isDeletedSupplies.some(supply => supply.idinsumo === isTextFieldsSupply.idinsumo)){
                setIsSelectedRow(null);
            }
        }
    },[isDeletedSupplies]);
    // useEffect para resetiar los select
    useEffect(() => {
        if (!isSelectedRow) return;
        if(isSelectedRow.idproveedor !== isTextFieldsSupply.idproveedor){
            setIsTextFieldsSupply(prev => ({
                ...prev,
                idproveedor: 0,
            }));
        }
    },[isSearchTerm1]);
    useEffect(() => {
        if (!isSelectedRow) return;
        if(isSelectedRow.idcategoria !== isTextFieldsSupply.idcategoria){
            setIsTextFieldsSupply(prev => ({
                ...prev,
                idcategoria: 0,
            }));
        }
    },[isSearchTerm2]);
    useEffect(() => {
        if (!isSelectedRow) return;
        if(isSelectedRow.idtipo !== isTextFieldsSupply.idtipo){
            setIsTextFieldsSupply(prev => ({
                ...prev,
                idtipo: 0,
                idcantidad: 0,
            }));
        }
    },[isSearchTerm3]);
    useEffect(() => {
        if (!isSelectedRow) return;
        if(isSelectedRow.idcategoria !== isTextFieldsSupply.idcategoria){
            setIsTextFieldsSupply(prev => ({
                ...prev,
                idtipo: 0,
                idcantidad: 0,
            }));
        }
    },[isTextFieldsSupply.idcategoria]);
    useEffect(() => {
        if (!isSelectedRow) return;
        if(isSelectedRow.idtipo !== isTextFieldsSupply.idtipo){
            setIsTextFieldsSupply(prev => ({
                ...prev,
                idcantidad: 0,
            }));
        }
    },[isTextFieldsSupply.idtipo]);
    useEffect(() => {
        if (!isSelectedRow) return;
        if(isSelectedRow.idproveedor !== isTextFieldsSupply.idproveedor){
            if(isTextFieldsSupply.idproveedor !== 0){
                if(isDeletedSuppliers.some(deleted => deleted.idproveedor === isTextFieldsSupply.idproveedor)){
                    setIsTextFieldsSupply(prev => ({
                        ...prev,
                        idproveedor: 0,
                    }));
                }
            }
        }
    },[isDeletedSuppliers]);
    useEffect(() => {
        if (!isSelectedRow) return;
        if(isSelectedRow.idcategoria !== isTextFieldsSupply.idcategoria){
            if(isTextFieldsSupply.idcategoria !== 0){
                if(isDeletedSupplyCategories.some(deleted => deleted.idcategoria === isTextFieldsSupply.idcategoria)){
                    setIsTextFieldsSupply(prev => ({
                        ...prev,
                        idcategoria: 0,
                    }));
                }
            }
        }
    },[isDeletedSupplyCategories]);
    useEffect(() => {
        if (!isSelectedRow) return;
        if(isSelectedRow.idtipo !== isTextFieldsSupply.idtipo){
            if(isTextFieldsSupply.idtipo !== 0){
                if(isDeletedSupplyTypes.some(deleted => deleted.idtipo === isTextFieldsSupply.idtipo)){
                    setIsTextFieldsSupply(prev => ({
                        ...prev,
                        idtipo: 0,
                        idcantidad: 0,
                    }));
                }
            }
        }
    },[isDeletedSupplyTypes]);
    // UseEffects para el limite de caracteres de los campos del formulario
    useEffect(() => {
        setIsTotalCode(isTextFieldsSupply.codigo.length);
    },[isTextFieldsSupply.codigo]);
    useEffect(() => {
        setIsTotalName(isTextFieldsSupply.nombre.length);
    },[isTextFieldsSupply.nombre]);
    useEffect(() => {
        setIsTotalDescription(isTextFieldsSupply.descripcion.length);
    },[isTextFieldsSupply.descripcion]);
    useEffect(() => {
        setIsTotalImage(isTextFieldsSupply.imagen.length);
    },[isTextFieldsSupply.imagen]);
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
        if(isSupplyEdit){
            const promise = new Promise((resolve,reject) => {
                try{
                    setTimeout(() => {
                        socket.emit('Update-Supply',isLoggedUser.idusuario,isTextFieldsSupply.idinsumo,isTextFieldsSupply.codigo.trim(),isTextFieldsSupply.nombre.trim(),isTextFieldsSupply.descripcion.trim(),isTextFieldsSupply.imagen,isTextFieldsSupply.idproveedor,isTextFieldsSupply.idtipo,isTextFieldsSupply.idcategoria,isTextFieldsSupply.idcantidad);
                        
                        resolve('¡Editó al insumo!');

                        setIsSupplyEdit(false);

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
                    setIsSupplyEdit(false);
                    return reject('¡Ocurrio un error inesperado!');
                }
            });

            return Alert_Sonner_Promise(promise,'¡Editando un insumo!','2');
        }
    },[isSupplyEdit]);
    // Estructura del componente
    return(
        <>
            {isModal && isSelectedRow !== null ? (
                <Container_Modal_Background_Black ref={Modal}>
                    <Image_Modal/>
                    <Container_Modal_Form_White_600 ref={isForm} className={currentMView === 'Insumo-Editar' ? 'slide-in-container-top' : 'slide-out-container-top'}>
                        <Container_Modal_Form_White>
                            <Container_Modal_Form>
                                <Text_Title_28_Black>EDITAR INSUMO</Text_Title_28_Black>
                                <Container_Row_NG_Auto_Center>
                                    <Text_Color_Blue_16>MEALSYNC</Text_Color_Blue_16>
                                    <Text_Span_16_Center_Black>: Datos generales</Text_Span_16_Center_Black>
                                </Container_Row_NG_Auto_Center>
                                <Container_Row_100_Left>
                                    <Label_Text_16_Black>Código:</Label_Text_16_Black>
                                    <Input_Group>
                                        <Input_Text_100_Black
                                            id="Input-Codigo"
                                            placeholder="..."
                                            type="text"
                                            maxLength={20}
                                            disabled={isActionBlock}
                                            value={isTextFieldsSupply.codigo}
                                            onChange={(e) => setIsTextFieldsSupply(prev => ({...prev, codigo: e.target.value}))}
                                            onFocus={() => {
                                                if(isKeyboardTouch.current){
                                                    setIsKeyboard(true);
                                                    setIsKeyboardView('Codigo-Insumo');
                                                }
                                            }}
                                        />
                                        <Label_Text_12_Black>{isTotalCode}/20</Label_Text_12_Black>
                                    </Input_Group>
                                    <Icon_Button_Blue_20
                                        onClick={() => {
                                            setIsTextFieldsSupply(prev => ({...prev, codigo: ''}))
                                        }}
                                        disabled={isActionBlock}
                                    >
                                        <MdCancel/>
                                    </Icon_Button_Blue_20>
                                </Container_Row_100_Left>
                                <Container_Row_100_Left>
                                    <Label_Text_16_Black>Nombre:</Label_Text_16_Black>
                                    <Input_Group>
                                        <Input_Text_100_Black
                                            id="Input-Nombre"
                                            placeholder="..."
                                            type="text"
                                            maxLength={150}
                                            disabled={isActionBlock}
                                            value={isTextFieldsSupply.nombre}
                                            onChange={(e) => setIsTextFieldsSupply(prev => ({...prev, nombre: e.target.value}))}
                                            onFocus={() => {
                                                if(isKeyboardTouch.current){
                                                    setIsKeyboard(true);
                                                    setIsKeyboardView('Nombre-Insumo');
                                                }
                                            }}
                                        />
                                        <Label_Text_12_Black>{isTotalName}/150</Label_Text_12_Black>
                                    </Input_Group>
                                    <Icon_Button_Blue_20
                                        onClick={() => {
                                            setIsTextFieldsSupply(prev => ({...prev, nombre: ''}))
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
                                            value={isTextFieldsSupply.descripcion}
                                            onChange={(e) => setIsTextFieldsSupply(prev => ({...prev, descripcion: e.target.value}))}
                                            onFocus={() => {
                                                if(isKeyboardTouch.current){
                                                    setIsKeyboard(true);
                                                    setIsKeyboardView('Descripcion-Insumo');
                                                }
                                            }}
                                        />
                                        <Label_Area_12_Black>{isTotalDescription}/250</Label_Area_12_Black>
                                    </Input_Group>
                                    <Icon_Button_Blue_20
                                        onClick={() => {
                                            setIsTextFieldsSupply(prev => ({...prev, descripcion: ''}))
                                        }}
                                        disabled={isActionBlock}
                                    >
                                        <MdCancel/>
                                    </Icon_Button_Blue_20>
                                </Container_Row_100_Left>
                                <Container_Row_100_Left>
                                    <Label_Text_16_Black>Imagen (URL):</Label_Text_16_Black>
                                    <Input_Group>
                                        <Input_Text_100_Black
                                            id="Input-Imagen"
                                            placeholder="..."
                                            type="text"
                                            maxLength={10000}
                                            disabled={isActionBlock}
                                            value={isTextFieldsSupply.imagen}
                                            onChange={(e) => setIsTextFieldsSupply(prev => ({...prev, imagen: e.target.value}))}
                                            onFocus={() => {
                                                if(isKeyboardTouch.current){
                                                    setIsKeyboard(true);
                                                    setIsKeyboardView('Imagen-Insumo');
                                                }
                                            }}
                                        />
                                        <Label_Text_12_Black>{isTotalImage}/10000</Label_Text_12_Black>
                                    </Input_Group>
                                    <Button_Text_Blue_Auto
                                        onClick={() => setIsImage(isTextFieldsSupply.imagen)}
                                        disabled={isActionBlock}
                                    >
                                        Verificar
                                    </Button_Text_Blue_Auto>
                                    <Icon_Button_Blue_20
                                        onClick={() => {
                                            setIsTextFieldsSupply(prev => ({...prev, imagen: ''}))
                                        }}
                                        disabled={isActionBlock}
                                    >
                                        <MdCancel/>
                                    </Icon_Button_Blue_20>
                                </Container_Row_100_Left>
                                <Image_Modal_150 src={isImage || Supply}/>
                                <Container_Row_NG_Auto_Center>
                                    <Text_Color_Blue_16>MEALSYNC</Text_Color_Blue_16>
                                    <Text_Span_16_Center_Black>: Datos específicos</Text_Span_16_Center_Black>
                                </Container_Row_NG_Auto_Center>
                                {isDeletedSuppliers.some(supplier => supplier.idproveedor === isTextFieldsSupply.idproveedor) ? (
                                    <Container_Row_NG_Auto_Center>
                                        <Text_Color_Green_16>Proveedor</Text_Color_Green_16>
                                        <Text_Span_16_Center_Black>: {isSuppliers.find(supplier => supplier.idproveedor === isTextFieldsSupply.idproveedor)?.nombre || 'Desconocido'}</Text_Span_16_Center_Black>
                                    </Container_Row_NG_Auto_Center>
                                ):(
                                    <>
                                        <Container_Row_NG_Auto_Center>
                                            <Text_Color_Green_16>Proveedor</Text_Color_Green_16>
                                            <Text_Span_16_Center_Black>:</Text_Span_16_Center_Black>
                                        </Container_Row_NG_Auto_Center>
                                        {filteredRecordsSuppliersDeleted.length !== 0 ? (
                                            <>
                                                <Container_Row_100_Center>
                                                    <Icon_24><FcSearch/></Icon_24>
                                                    <Input_Text_60_Black
                                                        id="Input-Buscador-1"
                                                        type="text"
                                                        placeholder="Buscar..."
                                                        value={isSearchTerm1}
                                                        onChange={(e) => setIsSearchTerm1(e.target.value)}
                                                        onFocus={() => {
                                                            if(isKeyboardTouch.current){
                                                                setIsKeyboard(true);
                                                                setIsKeyboardView('Buscador-Proveedor');
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
                                                        .find(option => option.value === isTextFieldsSupply.idproveedor)
                                                    }
                                                    onChange={(e) => {
                                                        if (e) {
                                                            setIsTextFieldsSupply(prev => ({
                                                                ...prev,
                                                                idproveedor: e.value,
                                                            }));
                                                        } else {
                                                            setIsTextFieldsSupply(prev => ({
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
                                    </>
                                )}
                                {isDeletedSupplyCategories.some(category => category.idcategoria === isTextFieldsSupply.idcategoria) ? (
                                    <Container_Row_NG_Auto_Center>
                                        <Text_Color_Green_16>Categoría</Text_Color_Green_16>
                                        <Text_Span_16_Center_Black>: {isSupplyCategories.find(category => category.idcategoria === isTextFieldsSupply.idcategoria)?.nombre || 'Desconocida'}</Text_Span_16_Center_Black>
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
                                                        id="Input-Buscador-2"
                                                        type="text"
                                                        placeholder="Buscar..."
                                                        value={isSearchTerm2}
                                                        onChange={(e) => setIsSearchTerm2(e.target.value)}
                                                        onFocus={() => {
                                                            if(isKeyboardTouch.current){
                                                                setIsKeyboard(true);
                                                                setIsKeyboardView('Buscador-Categoria');
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
                                                        .find(option => option.value === isTextFieldsSupply.idcategoria)
                                                    }
                                                    onChange={(e) => {
                                                        if (e) {
                                                            setIsTextFieldsSupply(prev => ({
                                                                ...prev,
                                                                idcategoria: e.value,
                                                            }));
                                                        } else {
                                                            setIsTextFieldsSupply(prev => ({
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
                                {isDeletedSupplyTypes.some(type => type.idtipo === isTextFieldsSupply.idtipo) ? (
                                    <Container_Row_NG_Auto_Center>
                                        <Text_Color_Green_16>Tipo de insumo</Text_Color_Green_16>
                                        <Text_Span_16_Center_Black>: {isSupplyTypes.find(type => type.idtipo === isTextFieldsSupply.idtipo)?.tipo || 'Desconocido'}</Text_Span_16_Center_Black>
                                    </Container_Row_NG_Auto_Center>
                                ):(
                                    <>
                                        <Container_Row_NG_Auto_Center>
                                            <Text_Color_Green_16>Tipo de insumo</Text_Color_Green_16>
                                            <Text_Span_16_Center_Black>:</Text_Span_16_Center_Black>
                                        </Container_Row_NG_Auto_Center>
                                        {isTextFieldsSupply.idcategoria !== 0 ? (
                                            <>
                                                <Container_Row_100_Center>
                                                    <Icon_24><FcSearch/></Icon_24>
                                                    <Input_Text_60_Black
                                                        id="Input-Buscador-3"
                                                        type="text"
                                                        placeholder="Buscar..."
                                                        value={isSearchTerm3}
                                                        onChange={(e) => setIsSearchTerm3(e.target.value)}
                                                        onFocus={() => {
                                                            if(isKeyboardTouch.current){
                                                                setIsKeyboard(true);
                                                                setIsKeyboardView('Buscador-Tipo');
                                                            }
                                                        }}
                                                        disabled={isActionBlock}
                                                    />
                                                </Container_Row_100_Center>
                                                <Select_300
                                                    data={filteredRecordsSupplyTypes.length}
                                                    options={filteredRecordsSupplyTypes.map((type) => ({
                                                        value: type.idtipo,
                                                        label: type.tipo
                                                    }))}
                                                    placeholder='Tipos de insumo...'
                                                    value={filteredRecordsSupplyTypes
                                                        .map(type => ({ value: type.idtipo, label: type.tipo }))
                                                        .find(option => option.value === isTextFieldsSupply.idtipo)
                                                    }
                                                    onChange={(e) => {
                                                        if (e) {
                                                            setIsTextFieldsSupply(prev => ({
                                                                ...prev,
                                                                idtipo: e.value,
                                                            }));
                                                        } else {
                                                            setIsTextFieldsSupply(prev => ({
                                                                ...prev,
                                                                idtipo: 0,
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
                                <Container_Row_NG_Auto_Center>
                                    <Text_Color_Green_16>Cantidad</Text_Color_Green_16>
                                    <Text_Span_16_Center_Black>:</Text_Span_16_Center_Black>
                                </Container_Row_NG_Auto_Center>
                                {isTextFieldsSupply.idtipo !== 0 ? (
                                    <Select_300
                                        data={filteredRecordsCountSupplyTypes.length}
                                        options={filteredRecordsCountSupplyTypes.map((count) => ({
                                            value: count.idcantidad,
                                            label: `${count.cantidad} ${isSupplyTypes.find(type => type.idtipo === isTextFieldsSupply.idtipo)?.unidad}${count.cantidad !== 1 ? 's' : ''}`
                                        }))}
                                        placeholder='Cantidades de los tipos de insumo...'
                                        value={filteredRecordsCountSupplyTypes.filter(count => count.idtipo === isTextFieldsSupply.idtipo)
                                            .map(c => ({ value: c.idcantidad, label: `${c.cantidad} ${isSupplyTypes.find(type => type.idtipo === isTextFieldsSupply.idtipo)?.unidad}${c.cantidad !== 1 ? 's' : ''}` }))
                                            .find(option => option.value === isTextFieldsSupply.idcantidad) || null
                                        }
                                        onChange={(e) => {
                                            if (e) {
                                                setIsTextFieldsSupply(prev => ({
                                                    ...prev,
                                                    idcantidad: e.value,
                                                }));
                                            } else {
                                                setIsTextFieldsSupply(prev => ({
                                                    ...prev,
                                                    idcantidad: 0,
                                                }));
                                            }
                                        }}
                                        isDisabled={isActionBlock}
                                    />
                                ):(
                                    <Container_Row_100_Center>
                                        <Text_Span_16_Center_Black>¡No hay datos disponibles!</Text_Span_16_Center_Black>
                                    </Container_Row_100_Center>
                                )}
                                <Text_Span_12_Justify_Black>Es importante recordar la modificación del nombre, ya que este se emplea para identificar los pedidos del inventario o para registrar nuevos pedidos del inventario a su nombre. La modificación de la categoría, el tipo de insumo o la cantidad puede afectar los resultados finales del inventario. La modificación del proveedor puede afectar a futuras solicitudes para el inventario.</Text_Span_12_Justify_Black>
                                <Modal_Form_Button_Edit
                                    onCancel={() => handleModalViewSupplies('')}
                                    onAction={() => handleSupplyEdit()}
                                />
                            </Container_Modal_Form>
                        </Container_Modal_Form_White>
                    </Container_Modal_Form_White_600>
                    <Keyboard_Form_Supply/>
                </Container_Modal_Background_Black>
            ):(
                currentMView === 'Insumo-Editar' ? (
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