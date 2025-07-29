//____________IMPORT/EXPORT____________
// Hooks de React
import { useContext,useEffect,useState } from "react";
import { useNavigate } from "react-router-dom";
// Contextos
import { ModalContext,ModalViewContext,SidebarContext } from "../../../../contexts/ViewsProvider";
import { SearchTerm1Context,SearchTerm2Context,SearchTerm3Context } from "../../../../contexts/SearchsProvider";
import { ActionBlockContext,KeyboardContext,KeyboardViewContext,TouchContext } from "../../../../contexts/VariablesProvider";
import { TextFieldsSupplyContext } from "../../../../contexts/FormsProvider";
import { DeletedSuppliersContext } from "../../../../contexts/SuppliersProvider";
import { SupplyTypesContext,SupplyAddContext,DeletedSupplyCategoriesContext,DeletedSupplyTypesContext } from "../../../../contexts/SuppliesProvider";
import { RefKeyboardContext,RefKeyboardTouchContext } from "../../../../contexts/RefsProvider";
import { SocketContext } from "../../../../contexts/SocketProvider";
import { LoggedUserContext } from "../../../../contexts/SessionProvider";
import { SelectedRowContext } from "../../../../contexts/SelectedesProvider";
// Hooks personalizados
import { HandleModalViewSupplies } from "../../../../hooks/supplies/Views";
import { HandleKeyboard } from "../../../../hooks/Views";
import { HandleSupplyAdd,FilteredRecordsSupplyCategoriesDeleted,FilteredRecordsSuppliersDeleted,FilteredRecordsSuppliers,FilteredRecordsSupplyCategories,FilteredRecordsSupplyTypes,FilteredRecordsCountSupplyTypes } from "../../../../hooks/supplies/Forms";
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
import { Label_Text_12_Black,Label_Area_12_Black,Label_Text_16_Black } from "../../../styled/Labels";
// Componentes personalizados
import { Select_300 } from "../../../styled/Selects";
import { Modal_Form_Button_Add } from "../../../forms/Button";
import { Keyboard_Form_Supply } from "../../../keyboards/Form";
import { Image_Modal } from "../../../styled/Imgs";
//____________IMPORT/EXPORT____________

// Modal para agregar insumos a su tabla
export default function Supply_Add(){
    // Constantes con el valor de los contextos
    const [currentMView,setCurrentMView] = useContext(ModalViewContext);
    const [isModal,setIsModal] = useContext(ModalContext);
    const [isActionBlock,setIsActionBlock] = useContext(ActionBlockContext);
    const [isSearchTerm1,setIsSearchTerm1] = useContext(SearchTerm1Context);
    const [isSearchTerm2,setIsSearchTerm2] = useContext(SearchTerm2Context);
    const [isSearchTerm3,setIsSearchTerm3] = useContext(SearchTerm3Context);
    const [isSupplyTypes] = useContext(SupplyTypesContext); 
    const [isDeletedSuppliers] = useContext(DeletedSuppliersContext);
    const [isDeletedSupplyCategories] = useContext(DeletedSupplyCategoriesContext);
    const [isDeletedSupplyTypes] = useContext(DeletedSupplyTypesContext);
    const [isSupplyAdd,setIsSupplyAdd] = useContext(SupplyAddContext);
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
    // Constantes con la funcionalidad de los hooks
    const navigate = useNavigate();
    const handleModalViewSupplies = HandleModalViewSupplies();
    const handleSupplyAdd = HandleSupplyAdd();
    const filteredRecordsSupplyCategoriesDeleted = FilteredRecordsSupplyCategoriesDeleted();
    const filteredRecordsSuppliersDeleted = FilteredRecordsSuppliersDeleted();
    const filteredRecordsSuppliers = FilteredRecordsSuppliers();
    const filteredRecordsSupplyCategories = FilteredRecordsSupplyCategories();
    const filteredRecordsSupplyTypes = FilteredRecordsSupplyTypes();
    const filteredRecordsCountSupplyTypes = FilteredRecordsCountSupplyTypes();
    const { KeyboardView,KeyboardClick } = HandleKeyboard();
    // Constantes con el valor de useState
    const [isTotalDescription,setIsTotalDescription] = useState(0)
    const [isTotalName,setIsTotalName] = useState(0)
    const [isTotalImage,setIsTotalImage] = useState(0)
    // useEffect para resetiar los select
    useEffect(() => {
        setIsTextFieldsSupply(prev => ({
            ...prev,
            idproveedor: 0,
        }));
    },[isSearchTerm1]);
    useEffect(() => {
        setIsTextFieldsSupply(prev => ({
            ...prev,
            idcategoria: 0,
        }));
    },[isSearchTerm2]);
    useEffect(() => {
        setIsTextFieldsSupply(prev => ({
            ...prev,
            idtipo: 0,
            idcantidad: 0,
        }));
    },[isSearchTerm3]);
    useEffect(() => {
        setIsTextFieldsSupply(prev => ({
            ...prev,
            idtipo: 0,
            idcantidad: 0,
        }));
    },[isTextFieldsSupply.idcategoria]);
    useEffect(() => {
        setIsTextFieldsSupply(prev => ({
            ...prev,
            idcantidad: 0,
        }));
    },[isTextFieldsSupply.idtipo]);
    useEffect(() => {
        if(isTextFieldsSupply.idproveedor !== 0){
            if(isDeletedSuppliers.some(deleted => deleted.idproveedor === isTextFieldsSupply.idproveedor)){
                setIsTextFieldsSupply(prev => ({
                    ...prev,
                    idproveedor: 0,
                }));
            }
        }
    },[isDeletedSuppliers]);
    useEffect(() => {
        if(isTextFieldsSupply.idcategoria !== 0){
            if(isDeletedSupplyCategories.some(deleted => deleted.idcategoria === isTextFieldsSupply.idcategoria)){
                setIsTextFieldsSupply(prev => ({
                    ...prev,
                    idcategoria: 0,
                }));
            }
        }
    },[isDeletedSupplyCategories]);
    useEffect(() => {
        if(isTextFieldsSupply.idtipo !== 0){
            if(isDeletedSupplyTypes.some(deleted => deleted.idtipo === isTextFieldsSupply.idtipo)){
                setIsTextFieldsSupply(prev => ({
                    ...prev,
                    idtipo: 0,
                    idcantidad: 0,
                }));
            }
        }
    },[isDeletedSupplyTypes]);
    // UseEffects para el limite de caracteres de los campos del formulario
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
    // UseEffect para agregar datos a la base de datos
    useEffect(() => {
        if(isSupplyAdd){
            const promise = new Promise((resolve,reject) => {
                try{
                    setTimeout(() => {
                        socket.emit('Insert-Supply',isLoggedUser.idusuario,isTextFieldsSupply.nombre.trim(),isTextFieldsSupply.descripcion.trim(),isTextFieldsSupply.imagen,isTextFieldsSupply.idproveedor,isTextFieldsSupply.idtipo,isTextFieldsSupply.idcategoria,isTextFieldsSupply.idcantidad);

                        resolve('¡Agregó al insumo!');

                        setIsSupplyAdd(false)

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
                    setIsSupplyAdd(false);
                    return reject('¡Ocurrio un error inesperado!');
                }
            });

            return Alert_Sonner_Promise(promise,'¡Agregando un insumo!','2');
        }
    },[isSupplyAdd]);
    // Estructura del componente
    return(
        <>
            {isModal ? (
                <Container_Modal_Background_Black>
                    <Image_Modal/>
                    <Container_Modal_Form_White_600 className={currentMView === 'Insumo-Agregar' ? 'slide-in-container-top' : 'slide-out-container-top'}>
                        <Container_Modal_Form_White>
                            <Container_Modal_Form>
                                <Text_Title_28_Black>AGREGAR INSUMO</Text_Title_28_Black>
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
                                    <Icon_Button_Blue_20
                                        onClick={() => {
                                            setIsTextFieldsSupply(prev => ({...prev, imagen: ''}))
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
                                <Modal_Form_Button_Add
                                    onCancel={() => handleModalViewSupplies('')}
                                    onAction={() => handleSupplyAdd()}
                                />
                            </Container_Modal_Form>
                        </Container_Modal_Form_White>
                    </Container_Modal_Form_White_600>
                    <Keyboard_Form_Supply/>
                </Container_Modal_Background_Black>
            ):(
                <></>
            )}
        </>
    );
}