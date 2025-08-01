//____________IMPORT/EXPORT____________
// Hooks de React
import { useContext,useEffect,useState } from "react";
import { useNavigate } from "react-router-dom";
// Contextos
import { ModalContext,ModalViewContext,SidebarContext } from "../../../../contexts/ViewsProvider";
import { MenusContext,MenuTypesContext,DeletedMenuTypesContext } from "../../../../contexts/MenusProvider";
import { TextFieldsSideDishContext } from "../../../../contexts/FormsProvider";
import { ActionBlockContext,KeyboardViewContext,KeyboardContext,TouchContext,IndexSearchContext,IndexCountContext } from "../../../../contexts/VariablesProvider";
import { SideDishEditContext,WarehouseSideDishesContext,MenuTypeSideDishesContext,DeletedSideDishesContext } from "../../../../contexts/SideDishesProvider";
import { SupplyTypesContext } from "../../../../contexts/SuppliesProvider";
import { WarehouseSupplyTypesContext } from "../../../../contexts/WarehouseProvider";
import { SocketContext } from "../../../../contexts/SocketProvider";
import { LoggedUserContext } from "../../../../contexts/SessionProvider";
import { RefKeyboardContext,RefKeyboardTouchContext,RefModalContext,RefFormContext } from "../../../../contexts/RefsProvider";
import { SelectedRowContext } from "../../../../contexts/SelectedesProvider";
// Hooks personalizados
import { HandleModalViewSideDishes } from "../../../../hooks/sideDishes/Views";
import { HandleTextSideDishes } from "../../../../hooks/sideDishes/Forms";
import { HandleSideDishEdit } from "../../../../hooks/sideDishes/Forms";
import { HandleKeyboard } from "../../../../hooks/Views";
//____________IMAGENES______________
import SideDish from '../../../imgs/Side-Dish.jpg'
//____________IMAGENES______________
//__________ICONOS__________
import { MdDelete, MdOutlineAttachMoney } from "react-icons/md";
import { IoIosAddCircle } from "react-icons/io";
import { MdCancel } from "react-icons/md";
import { FcSearch } from "react-icons/fc";
//__________ICONOS__________
// Estilos personalizados
import { Container_Modal_Background_Black,Container_Row_100_Left,Container_Row_100_Center,Container_Row_NG_Auto_Center,Container_Modal_Form_White_600,Container_Modal_Form_White,Container_Modal_Form,Container_Meal_100_Center,Container_Row_100_Right } from "../../../styled/Containers";
import { Text_Span_16_Center_Black,Text_Color_Blue_16,Text_Title_28_Black,Text_Color_Green_16,Text_Title_20_Black, Text_Span_12_Justify_Black } from "../../../styled/Text";
import { Label_Area_12_Black, Label_Text_12_Black,Label_Text_16_Black } from "../../../styled/Labels";
import { Icon_Button_Blue_20,Icon_Black_20,Icon_20,Icon_24 } from "../../../styled/Icons";
import { Input_Text_100_Black,Input_Group,Input_Area_100_Black,Input_Text_60_Black } from "../../../styled/Inputs";
import { Alert_Sonner_Promise } from "../../../styled/Alerts";
import { Modal_Form_Button_Edit } from "../../../forms/Button";
// Componetes personalizados
import { Image_Modal, Image_Modal_150 } from "../../../styled/Imgs";
import { Keyboard_Form_Side_Dish } from "../../../keyboards/Form";
import { Select_300 } from "../../../styled/Selects";
import { Button_Icon_Green_60, Button_Icon_Red_60, Button_Text_Blue_Auto } from "../../../styled/Buttons";
import { Tooltip } from "@mui/material";
import Error_Edit from "../../errors/Edit";
//____________IMPORT/EXPORT____________

// Modal para editar una guarnición
export default function Side_Dish_Edit(){
    // Constantes con el valor de los contextos
    const [isActionBlock,setIsActionBlock] = useContext(ActionBlockContext);
    const [isModal,setIsModal] = useContext(ModalContext);
    const [currentMView,setCurrentMView] = useContext(ModalViewContext);
    const [isMenus] = useContext(MenusContext);
    const [isSideDishEdit,setIsSideDishEdit] = useContext(SideDishEditContext);
    const [isSelectedRow,setIsSelectedRow] = useContext(SelectedRowContext);
    const [isSupplyTypes] = useContext(SupplyTypesContext); 
    const [isWarehouseSupplyTypes] = useContext(WarehouseSupplyTypesContext); 
    const [socket] = useContext(SocketContext);
    const [isTextFieldsSideDish,setIsTextFieldsSideDish] = useContext(TextFieldsSideDishContext);
    const [isLoggedUser] = useContext(LoggedUserContext);
    const [isSidebar,setIsSidebar] = useContext(SidebarContext);
    const [isKeyboard,setIsKeyboard] = useContext(KeyboardContext);
    const [isKeyboardView,setIsKeyboardView] = useContext(KeyboardViewContext);
    const Keyboard = useContext(RefKeyboardContext);
    const isKeyboardTouch = useContext(RefKeyboardTouchContext);
    const [isTouch] = useContext(TouchContext);
    const [isIndexSearch,setIsIndexSearch] = useContext(IndexSearchContext);
    const [isIndexCount,setIsIndexCount] = useContext(IndexCountContext);
    const Modal = useContext(RefModalContext); 
    const isForm = useContext(RefFormContext);
    const [isMenuTypes] = useContext(MenuTypesContext);
    const [isWarehouseSideDishes] = useContext(WarehouseSideDishesContext);
    const [isMenuTypeSideDishes] = useContext(MenuTypeSideDishesContext);
    const [isDeletedSideDishes] = useContext(DeletedSideDishesContext);
    const [isDeletedMenuTypes] = useContext(DeletedMenuTypesContext);
    // Constantes con el valor de useState
    const [isTotalName,setIsTotalName] = useState(0);
    const [isTotalImage,setIsTotalImage] = useState(0);
    const [isTotalDescription,setIsTotalDescription] = useState(0);
    const [isImage,setIsImage] = useState('');
    const [isTypes,setIsTypes] = useState([]);
    const [isIngredients,setIsIngredients] = useState([]);
    // Constantes con la funcionalidad de los hooks
    const navigate = useNavigate();
    const handleModalViewSideDishes = HandleModalViewSideDishes();
    const handleSideDishEdit = HandleSideDishEdit();
    const { KeyboardView,KeyboardClick } = HandleKeyboard();
    const { MenuAdd,MenuDelete,IngredientAdd,IngredientDelete } = HandleTextSideDishes();
    // Useffect para controlar el sidebar
    useEffect(() => {
        if(isSidebar){
            setIsSidebar(false);
        }
    },[]);
    // UseEffct para verificar la eliminacion de la guarnición
    useEffect(() => {
        if(isDeletedSideDishes.length !== 0){
            if(isDeletedSideDishes.some(dish => dish.idguarnicion === isTextFieldsSideDish.idguarnicion)){
                setIsSelectedRow(null);
            }
        }
    },[isDeletedSideDishes]);
    // UseEffect para cargar los datos 
    useEffect(() => {
        const types = isMenuTypeSideDishes.filter(type => type.idguarnicion === isSelectedRow.idguarnicion);
        const ingredients = isWarehouseSideDishes.filter(warehouse => warehouse.idguarnicion === isSelectedRow.idguarnicion);

        if(types.length > 0){
            setIsTypes(types.map(type => ({ idtipo: type.idtipo })))
        } 

        if(ingredients.length > 0){
            setIsIngredients(ingredients.map(ingredient => ({ 
                                idalmacen: ingredient.idalmacen,
                                idguarnicion: ingredient.idguarnicion,
                                cantidad: ingredient.cantidad,
                                idtipo: isWarehouseSupplyTypes.find(warehouse => warehouse.idalmacen === ingredient.idalmacen)?.idtipo,
                                unidad: isSupplyTypes.find(type => type.idtipo === isWarehouseSupplyTypes.find(warehouse => warehouse.idalmacen === ingredient.idalmacen)?.idtipo)?.unidad,
                                buscador: '',
                            })));
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
        setIsTotalName(isTextFieldsSideDish.nombre.length);
    },[isTextFieldsSideDish.nombre]);
    useEffect(() => {
        setIsTotalImage(isTextFieldsSideDish.imagen.length);
    },[isTextFieldsSideDish.imagen]);
    useEffect(() => {
        setIsTotalDescription(isTextFieldsSideDish.descripcion.length);
    },[isTextFieldsSideDish.descripcion]);
    useEffect(() => {
        if(isTextFieldsSideDish.tipos.length !== 0){
            isTextFieldsSideDish.tipos.map(tipo => {
                if(isTypes.some(type => type.idtipo === tipo.idtipo)) return tipo;

                if(isDeletedMenuTypes.some(type => type.idtipo === tipo.idtipo)) {
                    return {...tipo, idtipo: 0};
                }

                return tipo;
            });
        }
    },[isDeletedMenuTypes]);
    // UseEffect para editar datos a la base de datos
    useEffect(() => {
        if(isSideDishEdit){
            const promise = new Promise((resolve,reject) => {
                try{
                    setTimeout(() => {
                        socket.emit('Update-Side-Dish',isLoggedUser.idusuario,isTextFieldsSideDish.idguarnicion,isTextFieldsSideDish.idespecificacion,isTextFieldsSideDish.nombre.trim(),isTextFieldsSideDish.idmenu,isTextFieldsSideDish.descripcion.trim(),isTextFieldsSideDish.precio,isTextFieldsSideDish.preparacion,isTextFieldsSideDish.imagen,isTypes,isTextFieldsSideDish.tipos,isIngredients,isTextFieldsSideDish.ingredientes);

                        resolve('¡Editó la guarnición!');

                        setIsSideDishEdit(false);

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
                    setIsSideDishEdit(false);
                    return reject('¡Ocurrio un error inesperado!');
                }
            });

            return Alert_Sonner_Promise(promise,'¡Editando la guarnición!','2');
        }
    },[isSideDishEdit]);
    // Estructura del componente
    return(
        <>
            {isModal && isSelectedRow !== null ? (
                <>
                    <Container_Modal_Background_Black ref={Modal}>
                        <Image_Modal/>
                        <Container_Modal_Form_White_600 ref={isForm} className={currentMView === 'Bebida-Editar' ? 'slide-in-container-top' : 'slide-out-container-top'}>
                            <Container_Modal_Form_White>
                                <Container_Modal_Form>
                                    <Text_Title_28_Black>EDITAR BEBIDA</Text_Title_28_Black>
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
                                                value={isTextFieldsSideDish.nombre}
                                                onChange={(e) => setIsTextFieldsSideDish(prev => ({...prev, nombre: e.target.value}))}
                                                onFocus={() => {
                                                    if(isKeyboardTouch.current){
                                                        setIsKeyboard(true);
                                                        setIsKeyboardView('Nombre-Guarnicion');
                                                    }
                                                }}
                                            />
                                            <Label_Text_12_Black>{isTotalName}/100</Label_Text_12_Black>
                                        </Input_Group>
                                        <Icon_Button_Blue_20
                                            onClick={() => {
                                                setIsTextFieldsSideDish(prev => ({...prev, nombre: ''}))
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
                                                value={isTextFieldsSideDish.imagen}
                                                onChange={(e) => setIsTextFieldsSideDish(prev => ({...prev, imagen: e.target.value}))}
                                                onFocus={() => {
                                                    if(isKeyboardTouch.current){
                                                        setIsKeyboard(true);
                                                        setIsKeyboardView('Imagen-Guarnicion');
                                                    }
                                                }}
                                            />
                                            <Label_Text_12_Black>{isTotalImage}/10000</Label_Text_12_Black>
                                        </Input_Group>
                                        <Button_Text_Blue_Auto
                                            onClick={() => setIsImage(isTextFieldsSideDish.imagen)}
                                            disabled={isActionBlock}
                                        >
                                            Verificar
                                        </Button_Text_Blue_Auto>
                                        <Icon_Button_Blue_20
                                            onClick={() => {
                                                setIsTextFieldsSideDish(prev => ({...prev, imagen: ''}))
                                            }}
                                            disabled={isActionBlock}
                                        >
                                            <MdCancel/>
                                        </Icon_Button_Blue_20>
                                    </Container_Row_100_Left>
                                    <Image_Modal_150 src={isImage || SideDish}/>
                                    <Select_300
                                        data={isMenus.length}
                                        options={isMenus.map((menu) => ({
                                            value: menu.idmenu,
                                            label: menu.nombre
                                        }))}
                                        placeholder='Tiempo de guarnición...'
                                        value={isMenus
                                            .map(menu => ({ value: menu.idmenu, label: menu.nombre }))
                                            .find(option => option.value === isTextFieldsSideDish.idmenu)
                                        }
                                        onChange={(e) => {
                                            if (e) {
                                                setIsTextFieldsSideDish(prev => ({
                                                    ...prev,
                                                    idmenu: e.value,
                                                }));
                                            } else {
                                                setIsTextFieldsSideDish(prev => ({
                                                    ...prev,
                                                    idmenu: 0,
                                                }));
                                            }
                                        }}
                                        isDisabled={isActionBlock}
                                    />
                                    <Container_Row_NG_Auto_Center>
                                        <Text_Color_Blue_16>MEALSYNC</Text_Color_Blue_16>
                                        <Text_Span_16_Center_Black>: Datos específicos</Text_Span_16_Center_Black>
                                    </Container_Row_NG_Auto_Center>
                                    <Container_Row_100_Left>
                                        <Label_Text_16_Black>Descripción:</Label_Text_16_Black>
                                        <Input_Group>
                                            <Input_Area_100_Black
                                                id="Input-Descripcion"
                                                placeholder="..."
                                                type="text"
                                                maxLength={500}
                                                rows={3}
                                                disabled={isActionBlock}
                                                value={isTextFieldsSideDish.descripcion}
                                                onChange={(e) => setIsTextFieldsSideDish(prev => ({...prev, descripcion: e.target.value}))}
                                                onFocus={() => {
                                                    if(isKeyboardTouch.current){
                                                        setIsKeyboard(true);
                                                        setIsKeyboardView('Descripcion-Guarnicion');
                                                    }
                                                }}
                                            />
                                            <Label_Area_12_Black>{isTotalDescription}/500</Label_Area_12_Black>
                                        </Input_Group>
                                        <Icon_Button_Blue_20
                                            onClick={() => {
                                                setIsTextFieldsSideDish(prev => ({...prev, descripcion: ''}))
                                            }}
                                            disabled={isActionBlock}
                                        >
                                            <MdCancel/>
                                        </Icon_Button_Blue_20>
                                    </Container_Row_100_Left>
                                    <Container_Row_100_Left>
                                        <Label_Text_16_Black>Precio:</Label_Text_16_Black>
                                        <Icon_Black_20><MdOutlineAttachMoney/></Icon_Black_20>
                                        <Input_Group>
                                            <Input_Text_100_Black
                                                id="Input-Precio"
                                                placeholder="..."
                                                type="text"
                                                disabled={isActionBlock}
                                                value={isTextFieldsSideDish.precio}
                                                onChange={(e) => {
                                                    if(!isNaN(Number(e.target.value))){
                                                        setIsTextFieldsSideDish(prev => ({...prev, precio: e.target.value}))
                                                    }
                                                }}
                                                onFocus={() => {
                                                    if(isKeyboardTouch.current){
                                                        setIsKeyboard(true);
                                                        setIsKeyboardView('Precio-Guarnicion');
                                                    }
                                                }}
                                            />
                                        </Input_Group>
                                        <Label_Text_16_Black>MXN</Label_Text_16_Black>
                                        <Icon_Button_Blue_20
                                            onClick={() => {
                                                setIsTextFieldsSideDish(prev => ({...prev, precio: ''}))
                                            }}
                                            disabled={isActionBlock}
                                        >
                                            <MdCancel/>
                                        </Icon_Button_Blue_20>
                                    </Container_Row_100_Left>
                                    <Container_Row_100_Left>
                                        <Label_Text_16_Black>Tiempo de preparación:</Label_Text_16_Black>
                                        <Input_Group>
                                            <Input_Text_100_Black
                                                id="Input-Preparacion"
                                                placeholder="..."
                                                type="text"
                                                disabled={isActionBlock}
                                                value={isTextFieldsSideDish.preparacion}
                                                onChange={(e) => {
                                                    if(!isNaN(Number(e.target.value))){
                                                        setIsTextFieldsSideDish(prev => ({...prev, preparacion: e.target.value}))
                                                    }
                                                }}
                                                onFocus={() => {
                                                    if(isKeyboardTouch.current){
                                                        setIsKeyboard(true);
                                                        setIsKeyboardView('Preparacion-Guarnicion');
                                                    }
                                                }}
                                            />
                                        </Input_Group>
                                        <Label_Text_16_Black>minuto(s)</Label_Text_16_Black>
                                        <Icon_Button_Blue_20
                                            onClick={() => {
                                                setIsTextFieldsSideDish(prev => ({...prev, preparacion: ''}))
                                            }}
                                            disabled={isActionBlock}
                                        >
                                            <MdCancel/>
                                        </Icon_Button_Blue_20>
                                    </Container_Row_100_Left>
                                    <Container_Row_NG_Auto_Center>
                                        <Text_Color_Green_16>Asignación de menús</Text_Color_Green_16>
                                        <Text_Span_16_Center_Black>:</Text_Span_16_Center_Black>
                                    </Container_Row_NG_Auto_Center>
                                    {isTextFieldsSideDish.tipos.length !== 0 ? (
                                        isTextFieldsSideDish.tipos.map((menu,index) => {
                                            const filteredRecordsMenuTypes = isMenuTypes.filter((data) => {
                                                const isDeleted = isDeletedMenuTypes.some(type => type.idtipo === data.idtipo);
                                                
                                                const isAlreadySelected = isTextFieldsSideDish.tipos.some((ing, i) => 
                                                    i !== index && ing.idtipo === data.idtipo
                                                );

                                                return (
                                                    !isDeleted &&
                                                    !isAlreadySelected
                                                );
                                            });
                                            
                                            return (
                                                    <Container_Meal_100_Center key={index}>
                                                    {isTypes.some(type => type.idtipo === menu.idtipo) ? (
                                                        <Text_Span_16_Center_Black>{isMenuTypes.find(type => type.idtipo === menu.idtipo)?.nombre || 'Desconocido'}</Text_Span_16_Center_Black>
                                                    ):(
                                                        <Select_300
                                                            data={filteredRecordsMenuTypes.length}
                                                            options={filteredRecordsMenuTypes.map((menu) => ({
                                                                value: menu.idtipo,
                                                                label: menu.nombre
                                                            }))}
                                                            placeholder='Menus...'
                                                            value={filteredRecordsMenuTypes
                                                                .map(menu => ({ value: menu.idtipo, label: menu.nombre }))
                                                                .find(option => option.value === menu.idtipo)
                                                            }
                                                            onChange={(e) => {
                                                                const newMenus = [...isTextFieldsSideDish.tipos];
                                                                if (e) {
                                                                    newMenus[index].idtipo = e.value;
                                                                } else {
                                                                    newMenus[index].idtipo = 0;           
                                                                }
                                                                setIsTextFieldsSideDish(prev => ({
                                                                    ...prev,
                                                                    tipos: newMenus
                                                                }));
                                                            }}
                                                            isDisabled={isActionBlock}
                                                        />
                                                    )}
                                                    <Container_Row_100_Center>
                                                        <Container_Row_100_Left>
                                                            <Text_Title_20_Black>No. Menú: {index+1}</Text_Title_20_Black>
                                                        </Container_Row_100_Left>
                                                        <Container_Row_100_Right>
                                                            {isActionBlock ? (
                                                                <Button_Icon_Red_60 disabled>
                                                                    <Icon_20><MdDelete/></Icon_20>
                                                                </Button_Icon_Red_60>
                                                            ):(
                                                                <Tooltip title='Eliminar' placement="top">
                                                                    <Button_Icon_Red_60
                                                                        onClick={() => MenuDelete(index)}
                                                                    >
                                                                        <Icon_20><MdDelete/></Icon_20>
                                                                    </Button_Icon_Red_60>
                                                                </Tooltip>
                                                            )}
                                                        </Container_Row_100_Right>
                                                    </Container_Row_100_Center>
                                                </Container_Meal_100_Center>
                                            )
                                        })
                                    ):(
                                        <Container_Row_100_Center>
                                            <Text_Span_16_Center_Black>¡No hay asignaciones!</Text_Span_16_Center_Black>
                                        </Container_Row_100_Center>
                                    )}
                                    {isActionBlock ? (
                                        <Button_Icon_Green_60 disabled>
                                            <Icon_20><IoIosAddCircle/></Icon_20>
                                        </Button_Icon_Green_60>
                                    ):(
                                        <Tooltip title='Agregar' placement="top">
                                            <Button_Icon_Green_60
                                                onClick={() => MenuAdd()}
                                            >
                                                <Icon_20><IoIosAddCircle/></Icon_20>
                                            </Button_Icon_Green_60>
                                        </Tooltip>
                                    )}
                                    <Container_Row_NG_Auto_Center>
                                        <Text_Color_Green_16>Asignación de ingredientes</Text_Color_Green_16>
                                        <Text_Span_16_Center_Black>:</Text_Span_16_Center_Black>
                                    </Container_Row_NG_Auto_Center>
                                    {isTextFieldsSideDish.ingredientes.length !== 0 ? (
                                        isTextFieldsSideDish.ingredientes.map((ingredient,index) => {
                                            const filteredRecordsWarehouse = isWarehouseSupplyTypes.filter((data) => {
                                                const typeName = isSupplyTypes.find(type => type.idtipo === data.idtipo)?.tipo?.toLowerCase() || '';
                                                const search = ingredient.buscador.toLowerCase();

                                                const isAlreadySelected = isTextFieldsSideDish.ingredientes.some((ing, i) => 
                                                    i !== index && ing.idalmacen === data.idalmacen
                                                );

                                                return (
                                                    data.transaccion === 'Inicial' &&
                                                    typeName.includes(search) &&
                                                    !isAlreadySelected
                                                );
                                            });
                                            return(
                                                <Container_Meal_100_Center key={index}>
                                                    {isIngredients.some(i => i.idalmacen === ingredient.idalmacen) ? (
                                                        <Text_Span_16_Center_Black>{isSupplyTypes.find(type => type.idtipo === ingredient.idtipo)?.tipo || 'Desconocido'}</Text_Span_16_Center_Black>
                                                    ):(
                                                        <>
                                                            <Container_Row_100_Center>
                                                                <Icon_24><FcSearch/></Icon_24>
                                                                <Input_Text_60_Black
                                                                    className="Input-Buscador"
                                                                    type="text"
                                                                    placeholder="Buscar..."
                                                                    value={ingredient.buscador}
                                                                    onChange={(e) => {
                                                                        const newIngredients = [...isTextFieldsSideDish.ingredientes];
                                                                        newIngredients[index].buscador = e.target.value;
                                                                        setIsTextFieldsSideDish(prev => ({
                                                                            ...prev,
                                                                            ingredientes: newIngredients
                                                                        }));
                                                                    }}
                                                                    onFocus={() => {
                                                                        if(isKeyboardTouch.current){
                                                                            setIsKeyboard(true);
                                                                            setIsKeyboardView(`Buscador-Guarnicion-${index}`);
                                                                            setIsIndexSearch(index);
                                                                        }
                                                                    }}
                                                                    disabled={isActionBlock}
                                                                />
                                                            </Container_Row_100_Center>
                                                            <Select_300
                                                                data={filteredRecordsWarehouse.length}
                                                                options={filteredRecordsWarehouse.map((warehouse) => ({
                                                                    value: warehouse.idalmacen,
                                                                    label: `${isSupplyTypes.find(type => type.idtipo === warehouse.idtipo)?.tipo}`
                                                                }))}
                                                                placeholder='Insumos...'
                                                                value={filteredRecordsWarehouse
                                                                    .map(warehouse => ({ value: warehouse.idalmacen, label: `${isSupplyTypes.find(type => type.idtipo === warehouse.idtipo)?.tipo}` }))
                                                                    .find(option => option.value === ingredient.idalmacen)
                                                                }
                                                                onChange={(e) => {
                                                                    if(e){
                                                                        setIsTextFieldsSideDish(prev => {
                                                                            const newIngredients = [...prev.ingredientes];
                                                                            const warehouse = isWarehouseSupplyTypes.find(warehouse => warehouse.idalmacen === e.value)
                                                                            newIngredients[index] = {
                                                                                ...newIngredients[index],
                                                                                idalmacen: e.value,
                                                                                idtipo: warehouse.idtipo,
                                                                                unidad: isSupplyTypes.find(type => type.idtipo === warehouse.idtipo)?.unidad,
                                                                            };
                                                                            return {
                                                                                ...prev,
                                                                                ingredientes: newIngredients
                                                                            };
                                                                        });
                                                                    }else{
                                                                        setIsTextFieldsSideDish(prev => {
                                                                            const newIngredients = [...prev.ingredientes];
                                                                            newIngredients[index] = {
                                                                                ...newIngredients[index],
                                                                                idalmacen: 0,
                                                                                idtipo: 0,
                                                                                unidad: '',
                                                                            };
                                                                            return {
                                                                                ...prev,
                                                                                ingredientes: newIngredients
                                                                            };
                                                                        });
                                                                    }
                                                                }}
                                                                isDisabled={isActionBlock}
                                                            />
                                                        </>
                                                    )}
                                                    <Container_Row_100_Left>
                                                        <Label_Text_16_Black>Cantidad:</Label_Text_16_Black>
                                                        <Input_Group>
                                                            <Input_Text_100_Black
                                                                className="Input-Cantidad"
                                                                placeholder="..."
                                                                type="text"
                                                                disabled={isActionBlock}
                                                                value={ingredient.cantidad}
                                                                onChange={(e) => {
                                                                    if(!isNaN(Number(e.target.value))){
                                                                        const newIngredients = [...isTextFieldsSideDish.ingredientes];
                                                                        newIngredients[index].cantidad = e.target.value;
                                                                        setIsTextFieldsSideDish(prev => ({
                                                                            ...prev,
                                                                            ingredientes: newIngredients
                                                                        }));
                                                                    }
                                                                }}
                                                                onFocus={() => {
                                                                    if(isKeyboardTouch.current){
                                                                        setIsKeyboard(true);
                                                                        setIsKeyboardView(`Cantidad-Guarnicion-${index}`);
                                                                        setIsIndexCount(index)
                                                                    }
                                                                }}
                                                            />
                                                        </Input_Group>
                                                        <Label_Text_16_Black>{`${ingredient.unidad || '...'}(s)`}</Label_Text_16_Black>
                                                        <Icon_Button_Blue_20
                                                            onClick={() => {
                                                                const newIngredients = [...isTextFieldsSideDish.ingredientes];
                                                                newIngredients[index].cantidad = '';
                                                                setIsTextFieldsSideDish(prev => ({
                                                                    ...prev,
                                                                    ingredientes: newIngredients
                                                                }));
                                                            }}
                                                            disabled={isActionBlock}
                                                        >
                                                            <MdCancel/>
                                                        </Icon_Button_Blue_20>
                                                    </Container_Row_100_Left>
                                                    <Container_Row_100_Center>
                                                        <Container_Row_100_Left>
                                                            <Text_Title_20_Black>No. Ingrediente: {index+1}</Text_Title_20_Black>
                                                        </Container_Row_100_Left>
                                                        <Container_Row_100_Right>
                                                            {isActionBlock ? (
                                                                <Button_Icon_Red_60 disabled>
                                                                    <Icon_20><MdDelete/></Icon_20>
                                                                </Button_Icon_Red_60>
                                                            ):(
                                                                <Tooltip title='Eliminar' placement="top">
                                                                    <Button_Icon_Red_60
                                                                        onClick={() => IngredientDelete(index)}
                                                                    >
                                                                        <Icon_20><MdDelete/></Icon_20>
                                                                    </Button_Icon_Red_60>
                                                                </Tooltip>
                                                            )}
                                                        </Container_Row_100_Right>
                                                    </Container_Row_100_Center>
                                                </Container_Meal_100_Center>
                                            )
                                        })
                                    ):(
                                        <Container_Row_100_Center>
                                            <Text_Span_16_Center_Black>¡No hay asignaciones!</Text_Span_16_Center_Black>
                                        </Container_Row_100_Center>
                                    )}
                                    {isActionBlock ? (
                                        <Button_Icon_Green_60 disabled>
                                            <Icon_20><IoIosAddCircle/></Icon_20>
                                        </Button_Icon_Green_60>
                                    ):(
                                        <Tooltip title='Agregar' placement="top">
                                            <Button_Icon_Green_60
                                                onClick={() => IngredientAdd()}
                                            >
                                                <Icon_20><IoIosAddCircle/></Icon_20>
                                            </Button_Icon_Green_60>
                                        </Tooltip>
                                    )}
                                    <Text_Span_12_Justify_Black>Recuerde que los datos editados pueden afectar directamente el funcionamiento del sistema, incluyendo el control de inventario y la gestión de pedidos. Verifique cuidadosamente antes de guardar los cambios.</Text_Span_12_Justify_Black>
                                    <Modal_Form_Button_Edit
                                        onCancel={() => handleModalViewSideDishes('')}
                                        onAction={() => handleSideDishEdit()}
                                    />
                                </Container_Modal_Form>
                            </Container_Modal_Form_White>
                        </Container_Modal_Form_White_600>
                        <Keyboard_Form_Side_Dish/>
                    </Container_Modal_Background_Black>
                </>
            ):(
                currentMView === 'Guarnicion-Editar' ? (
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