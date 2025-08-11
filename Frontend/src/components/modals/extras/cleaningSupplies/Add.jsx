//____________IMPORT/EXPORT____________
// Hooks de React
import { useContext,useEffect,useState } from "react";
import { useNavigate } from "react-router-dom";
// Contextos
import { ModalContext,ModalViewContext,SidebarContext } from "../../../../contexts/ViewsProvider";
import { SearchTerm1Context,SearchTerm2Context,SearchTerm3Context } from "../../../../contexts/SearchsProvider";
import { ActionBlockContext,KeyboardContext,KeyboardViewContext,TouchContext } from "../../../../contexts/VariablesProvider";
import { TextFieldsCleaningSupplyContext } from "../../../../contexts/FormsProvider";
import { DeletedSuppliersContext } from "../../../../contexts/SuppliersProvider";
import { DeletedCleaningCategoriesContext,CleaningTypesContext,DeletedCleaningTypesContext,CleaningSupplyAddContext } from "../../../../contexts/ExtrasProvider";
import { RefKeyboardContext,RefKeyboardTouchContext } from "../../../../contexts/RefsProvider";
import { SocketContext } from "../../../../contexts/SocketProvider";
import { LoggedUserContext } from "../../../../contexts/SessionProvider";
import { SelectedRowContext } from "../../../../contexts/SelectedesProvider";
// Hooks personalizados
import { HandleModalViewExtras } from "../../../../hooks/extras/Views";
import { HandleCleaningSupplyAdd,FilteredRecordsCleaningTypes,FilteredRecordsCountCleaningTypes,FilteredRecordsSuppliers,FilteredRecordsSuppliersDeleted,FilteredRecordsCleaningCategories,FilteredRecordsCleaningCategoriesDeleted } from "../../../../hooks/extras/Forms";
import { HandleKeyboard } from "../../../../hooks/Views";
//__________IMAGENES__________
import Cleaning from '../../../imgs/Cleaning.jpg'
//__________IMAGENES__________
//__________ICONOS__________
// Icono para el buscador
import { FcSearch } from "react-icons/fc";
// Icono para realizar la función del modal
import { MdCancel } from "react-icons/md";
//__________ICONOS__________
// Estilos personalizados
import { Container_Modal_Background_Black,Container_Row_100_Left,Container_Row_100_Center,Container_Row_NG_Auto_Center,Container_Modal_Form_White_600,Container_Modal_Form_White,Container_Modal_Form } from "../../../styled/Containers";
import { Text_Span_16_Center_Black,Text_Color_Blue_16,Text_Title_28_Black,Text_Color_Green_16 } from "../../../styled/Text";
import { Input_Text_100_Black,Input_Area_100_Black,Input_Group,Input_Text_60_Black } from "../../../styled/Inputs";
import { Icon_24,Icon_Button_Blue_20 } from "../../../styled/Icons";
import { Alert_Sonner_Promise } from "../../../styled/Alerts";
import { Button_Text_Blue_Auto } from "../../../styled/Buttons";
import { Label_Text_12_Black,Label_Area_12_Black,Label_Text_16_Black } from "../../../styled/Labels";
// Componentes personalizados
import { Select_300 } from "../../../styled/Selects";
import { Modal_Form_Button_Add } from "../../../forms/Button";
import { Keyboard_Form_Cleaning_Supply } from "../../../keyboards/Form";
import { Image_Modal,Image_Modal_150 } from "../../../styled/Imgs";
//____________IMPORT/EXPORT____________

// Modal para agregar suministro de limpieza a su tabla
export default function Cleaning_Supply_Add(){
    // Constantes con el valor de los contextos
    const [currentMView,setCurrentMView] = useContext(ModalViewContext);
    const [isModal,setIsModal] = useContext(ModalContext);
    const [isActionBlock,setIsActionBlock] = useContext(ActionBlockContext);
    const [isSearchTerm1,setIsSearchTerm1] = useContext(SearchTerm1Context);
    const [isSearchTerm2,setIsSearchTerm2] = useContext(SearchTerm2Context);
    const [isSearchTerm3,setIsSearchTerm3] = useContext(SearchTerm3Context);
    const [isDeletedSuppliers] = useContext(DeletedSuppliersContext);
    const [isDeletedCleaningCategories] = useContext(DeletedCleaningCategoriesContext);
    const [isCleaningSupplyAdd,setIsCleaningSupplyAdd] = useContext(CleaningSupplyAddContext);
    const [isTextFieldsCleaningSupply,setIsTextFieldsCleaningSupply] = useContext(TextFieldsCleaningSupplyContext);
    const [socket] = useContext(SocketContext);
    const [isLoggedUser] = useContext(LoggedUserContext);
    const [isKeyboard,setIsKeyboard] = useContext(KeyboardContext);
    const [isKeyboardView,setIsKeyboardView] = useContext(KeyboardViewContext);
    const Keyboard = useContext(RefKeyboardContext);
    const isKeyboardTouch = useContext(RefKeyboardTouchContext);
    const [isTouch] = useContext(TouchContext);
    const [isSidebar,setIsSidebar] = useContext(SidebarContext);
    const [isSelectedRow,setIsSelectedRow] = useContext(SelectedRowContext);
    const [isDeletedCleaningTypes] = useContext(DeletedCleaningTypesContext);
    const [isCleaningTypes] = useContext(CleaningTypesContext);
    // Constantes con la funcionalidad de los hooks
    const navigate = useNavigate();
    const handleModalViewExtras = HandleModalViewExtras();
    const handleCleaningSupplyAdd = HandleCleaningSupplyAdd();
    const filteredRecordsSuppliersDeleted = FilteredRecordsSuppliersDeleted();
    const filteredRecordsSuppliers = FilteredRecordsSuppliers();
    const filteredRecordsCleaningCategories = FilteredRecordsCleaningCategories();
    const filteredRecordsCleaningCategoriesDeleted = FilteredRecordsCleaningCategoriesDeleted();
    const filteredRecordsCountCleaningTypes = FilteredRecordsCountCleaningTypes();
    const filteredRecordsCleaningTypes = FilteredRecordsCleaningTypes();
    const { KeyboardView,KeyboardClick } = HandleKeyboard();
    // Constantes con el valor de useState
    const [isTotalCode,setIsTotalCode] = useState(0)
    const [isTotalDescription,setIsTotalDescription] = useState(0)
    const [isTotalName,setIsTotalName] = useState(0)
    const [isTotalImage,setIsTotalImage] = useState(0)
    const [isImage,setIsImage] = useState('');
    // useEffect para resetiar los select
    useEffect(() => {
        setIsTextFieldsCleaningSupply(prev => ({
            ...prev,
            idproveedor: 0,
        }));
    },[isSearchTerm1]);
    useEffect(() => {
        setIsTextFieldsCleaningSupply(prev => ({
            ...prev,
            idcategoria: 0,
        }));
    },[isSearchTerm2]);
    useEffect(() => {
        setIsTextFieldsCleaningSupply(prev => ({
            ...prev,
            idtipo: 0,
            idcantidad: 0,
        }));
    },[isSearchTerm3]);
    useEffect(() => {
        setIsTextFieldsCleaningSupply(prev => ({
            ...prev,
            idtipo: 0,
            idcantidad: 0,
        }));
    },[isTextFieldsCleaningSupply.idcategoria]);
    useEffect(() => {
        setIsTextFieldsCleaningSupply(prev => ({
            ...prev,
            idcantidad: 0,
        }));
    },[isTextFieldsCleaningSupply.idtipo]);
    useEffect(() => {
        if(isTextFieldsCleaningSupply.idproveedor !== 0){
            if(isDeletedSuppliers.some(deleted => deleted.idproveedor === isTextFieldsCleaningSupply.idproveedor)){
                setIsTextFieldsCleaningSupply(prev => ({
                    ...prev,
                    idproveedor: 0,
                }));
            }
        }
    },[isDeletedSuppliers]);
    useEffect(() => {
        if(isTextFieldsCleaningSupply.idcategoria !== 0){
            if(isDeletedCleaningCategories.some(deleted => deleted.idcategoria === isTextFieldsCleaningSupply.idcategoria)){
                setIsTextFieldsCleaningSupply(prev => ({
                    ...prev,
                    idcategoria: 0,
                }));
            }
        }
    },[isDeletedCleaningCategories]);
    useEffect(() => {
        if(isTextFieldsCleaningSupply.idtipo !== 0){
            if(isDeletedCleaningTypes.some(deleted => deleted.idtipo === isTextFieldsCleaningSupply.idtipo)){
                setIsTextFieldsCleaningSupply(prev => ({
                    ...prev,
                    idtipo: 0,
                    idcantidad: 0,
                }));
            }
        }
    },[isDeletedCleaningTypes]);
    // UseEffects para el limite de caracteres de los campos del formulario
    useEffect(() => {
        setIsTotalCode(isTextFieldsCleaningSupply.codigo.length);
    },[isTextFieldsCleaningSupply.codigo]);
    useEffect(() => {
        setIsTotalName(isTextFieldsCleaningSupply.nombre.length);
    },[isTextFieldsCleaningSupply.nombre]);
    useEffect(() => {
        setIsTotalDescription(isTextFieldsCleaningSupply.descripcion.length);
    },[isTextFieldsCleaningSupply.descripcion]);
    useEffect(() => {
        setIsTotalImage(isTextFieldsCleaningSupply.imagen.length);
    },[isTextFieldsCleaningSupply.imagen]);
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
        if(isCleaningSupplyAdd){
            const promise = new Promise((resolve,reject) => {
                try{
                    setTimeout(() => {
                        socket.emit('Insert-Cleaning-Supply',isLoggedUser.idusuario,isTextFieldsCleaningSupply.codigo.trim(),isTextFieldsCleaningSupply.nombre.trim(),isTextFieldsCleaningSupply.descripcion.trim(),isTextFieldsCleaningSupply.imagen,isTextFieldsCleaningSupply.idproveedor,isTextFieldsCleaningSupply.idcategoria,isTextFieldsCleaningSupply.idcantidad,isTextFieldsCleaningSupply.idtipo);

                        resolve('¡Agregó al suministro de limpieza!');

                        setIsCleaningSupplyAdd(false)

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
                    setIsCleaningSupplyAdd(false);
                    return reject('¡Ocurrio un error inesperado!');
                }
            });

            return Alert_Sonner_Promise(promise,'¡Agregando un suministro de limpieza!','2');
        }
    },[isCleaningSupplyAdd]);
    // Estructura del componente
    return(
        <>
            {isModal ? (
                <Container_Modal_Background_Black>
                    <Image_Modal/>
                    <Container_Modal_Form_White_600 className={currentMView === 'Suministro-Limpieza-Agregar' ? 'slide-in-container-top' : 'slide-out-container-top'}>
                        <Container_Modal_Form_White>
                            <Container_Modal_Form>
                                <Text_Title_28_Black>AGREGAR SUMINISTRO DE LIMPIEZA</Text_Title_28_Black>
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
                                            value={isTextFieldsCleaningSupply.codigo}
                                            onChange={(e) => setIsTextFieldsCleaningSupply(prev => ({...prev, codigo: e.target.value}))}
                                            onFocus={() => {
                                                if(isKeyboardTouch.current){
                                                    setIsKeyboard(true);
                                                    setIsKeyboardView('Codigo-Suministro');
                                                }
                                            }}
                                        />
                                        <Label_Text_12_Black>{isTotalCode}/20</Label_Text_12_Black>
                                    </Input_Group>
                                    <Icon_Button_Blue_20
                                        onClick={() => {
                                            setIsTextFieldsCleaningSupply(prev => ({...prev, codigo: ''}))
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
                                            value={isTextFieldsCleaningSupply.nombre}
                                            onChange={(e) => setIsTextFieldsCleaningSupply(prev => ({...prev, nombre: e.target.value}))}
                                            onFocus={() => {
                                                if(isKeyboardTouch.current){
                                                    setIsKeyboard(true);
                                                    setIsKeyboardView('Nombre-Suministro');
                                                }
                                            }}
                                        />
                                        <Label_Text_12_Black>{isTotalName}/150</Label_Text_12_Black>
                                    </Input_Group>
                                    <Icon_Button_Blue_20
                                        onClick={() => {
                                            setIsTextFieldsCleaningSupply(prev => ({...prev, nombre: ''}))
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
                                            value={isTextFieldsCleaningSupply.descripcion}
                                            onChange={(e) => setIsTextFieldsCleaningSupply(prev => ({...prev, descripcion: e.target.value}))}
                                            onFocus={() => {
                                                if(isKeyboardTouch.current){
                                                    setIsKeyboard(true);
                                                    setIsKeyboardView('Descripcion-Suministro');
                                                }
                                            }}
                                        />
                                        <Label_Area_12_Black>{isTotalDescription}/250</Label_Area_12_Black>
                                    </Input_Group>
                                    <Icon_Button_Blue_20
                                        onClick={() => {
                                            setIsTextFieldsCleaningSupply(prev => ({...prev, descripcion: ''}))
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
                                            value={isTextFieldsCleaningSupply.imagen}
                                            onChange={(e) => setIsTextFieldsCleaningSupply(prev => ({...prev, imagen: e.target.value}))}
                                            onFocus={() => {
                                                if(isKeyboardTouch.current){
                                                    setIsKeyboard(true);
                                                    setIsKeyboardView('Imagen-Suministro');
                                                }
                                            }}
                                        />
                                        <Label_Text_12_Black>{isTotalImage}/10000</Label_Text_12_Black>
                                    </Input_Group>
                                    <Button_Text_Blue_Auto
                                        onClick={() => setIsImage(isTextFieldsCleaningSupply.imagen)}
                                        disabled={isActionBlock}
                                    >
                                        Verificar
                                    </Button_Text_Blue_Auto>
                                    <Icon_Button_Blue_20
                                        onClick={() => {
                                            setIsTextFieldsCleaningSupply(prev => ({...prev, imagen: ''}))
                                        }}
                                        disabled={isActionBlock}
                                    >
                                        <MdCancel/>
                                    </Icon_Button_Blue_20>
                                </Container_Row_100_Left>
                                <Image_Modal_150 src={isImage || Cleaning}/>
                                <Container_Row_NG_Auto_Center>
                                    <Text_Color_Blue_16>MEALSYNC</Text_Color_Blue_16>
                                    <Text_Span_16_Center_Black>: Datos específicos</Text_Span_16_Center_Black>
                                </Container_Row_NG_Auto_Center>
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
                                                        setIsKeyboardView('Buscador-Proveedor-Suministro');
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
                                                .find(option => option.value === isTextFieldsCleaningSupply.idproveedor)
                                            }
                                            onChange={(e) => {
                                                if (e) {
                                                    setIsTextFieldsCleaningSupply(prev => ({
                                                        ...prev,
                                                        idproveedor: e.value,
                                                    }));
                                                } else {
                                                    setIsTextFieldsCleaningSupply(prev => ({
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
                                <Container_Row_NG_Auto_Center>
                                    <Text_Color_Green_16>Categoría de limpieza</Text_Color_Green_16>
                                    <Text_Span_16_Center_Black>:</Text_Span_16_Center_Black>
                                </Container_Row_NG_Auto_Center>
                                {filteredRecordsCleaningCategoriesDeleted.length !== 0 ? (
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
                                                        setIsKeyboardView('Buscador-Categoria-Suministro');
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
                                                .find(option => option.value === isTextFieldsCleaningSupply.idcategoria)
                                            }
                                            onChange={(e) => {
                                                if (e) {
                                                    setIsTextFieldsCleaningSupply(prev => ({
                                                        ...prev,
                                                        idcategoria: e.value,
                                                    }));
                                                } else {
                                                    setIsTextFieldsCleaningSupply(prev => ({
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
                                <Container_Row_NG_Auto_Center>
                                    <Text_Color_Green_16>Tipo de limpieza</Text_Color_Green_16>
                                    <Text_Span_16_Center_Black>:</Text_Span_16_Center_Black>
                                </Container_Row_NG_Auto_Center>
                                {isTextFieldsCleaningSupply.idcategoria !== 0 ? (
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
                                                        setIsKeyboardView('Buscador-Tipo-Suministro');
                                                    }
                                                }}
                                                disabled={isActionBlock}
                                            />
                                        </Container_Row_100_Center>
                                        <Select_300
                                            data={filteredRecordsCleaningTypes.length}
                                            options={filteredRecordsCleaningTypes.map((type) => ({
                                                value: type.idtipo,
                                                label: type.tipo
                                            }))}
                                            placeholder='Tipos de limpieza...'
                                            value={filteredRecordsCleaningTypes
                                                .map(type => ({ value: type.idtipo, label: type.tipo }))
                                                .find(option => option.value === isTextFieldsCleaningSupply.idtipo)
                                            }
                                            onChange={(e) => {
                                                if (e) {
                                                    setIsTextFieldsCleaningSupply(prev => ({
                                                        ...prev,
                                                        idtipo: e.value,
                                                    }));
                                                } else {
                                                    setIsTextFieldsCleaningSupply(prev => ({
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
                                <Container_Row_NG_Auto_Center>
                                    <Text_Color_Green_16>Cantidad</Text_Color_Green_16>
                                    <Text_Span_16_Center_Black>:</Text_Span_16_Center_Black>
                                </Container_Row_NG_Auto_Center>
                                {isTextFieldsCleaningSupply.idtipo !== 0 ? (
                                    <Select_300
                                        data={filteredRecordsCountCleaningTypes.length}
                                        options={filteredRecordsCountCleaningTypes.map((count) => ({
                                            value: count.idcantidad,
                                            label: `${count.cantidad} ${isCleaningTypes.find(type => type.idtipo === isTextFieldsCleaningSupply.idtipo)?.unidad}${count.cantidad !== 1 ? 's' : ''}`
                                        }))}
                                        placeholder='Cantidades de los tipos de limpieza...'
                                        value={filteredRecordsCountCleaningTypes.filter(count => count.idtipo === isTextFieldsCleaningSupply.idtipo)
                                            .map(c => ({ value: c.idcantidad, label: `${c.cantidad} ${isCleaningTypes.find(type => type.idtipo === isTextFieldsCleaningSupply.idtipo)?.unidad}${c.cantidad !== 1 ? 's' : ''}` }))
                                            .find(option => option.value === isTextFieldsCleaningSupply.idcantidad) || null
                                        }
                                        onChange={(e) => {
                                            if (e) {
                                                setIsTextFieldsCleaningSupply(prev => ({
                                                    ...prev,
                                                    idcantidad: e.value,
                                                }));
                                            } else {
                                                setIsTextFieldsCleaningSupply(prev => ({
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
                                <Modal_Form_Button_Add
                                    onCancel={() => handleModalViewExtras('')}
                                    onAction={() => handleCleaningSupplyAdd()}
                                />
                            </Container_Modal_Form>
                        </Container_Modal_Form_White>
                    </Container_Modal_Form_White_600>
                    <Keyboard_Form_Cleaning_Supply/>
                </Container_Modal_Background_Black>
            ):(
                <></>
            )}
        </>
    );
}