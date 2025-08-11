//____________IMPORT/EXPORT____________
// Hooks de React
import { useContext,useEffect,useState } from "react";
import { useNavigate } from "react-router-dom";
// Contextos
import { ModalContext,ModalViewContext,SidebarContext } from "../../../../contexts/ViewsProvider";
import { MenusContext,MenuTypesContext,DeletedMenuTypesContext,MenuTypeUbicationsContext } from "../../../../contexts/MenusProvider";
import { TextFieldsDrinkContext } from "../../../../contexts/FormsProvider";
import { ActionBlockContext,KeyboardViewContext,KeyboardContext,TouchContext,IndexSearchContext,IndexCountContext } from "../../../../contexts/VariablesProvider";
import { DrinkAddContext } from "../../../../contexts/DrinksProvider";
import { SupplyTypesContext } from "../../../../contexts/SuppliesProvider";
import { WarehouseSupplyTypesContext } from "../../../../contexts/WarehouseProvider";
import { SocketContext } from "../../../../contexts/SocketProvider";
import { LoggedUserContext,LoggedTypeContext } from "../../../../contexts/SessionProvider";
import { SelectedRowContext } from "../../../../contexts/SelectedesProvider";
import { RefKeyboardContext,RefKeyboardTouchContext } from "../../../../contexts/RefsProvider";
// Hooks personalizados
import { HandleModalViewDrinks } from "../../../../hooks/drinks/Views";
import { HandleTextDrinks } from "../../../../hooks/drinks/Forms";
import { HandleDrinkAdd } from "../../../../hooks/drinks/Forms";
import { HandleKeyboard } from "../../../../hooks/Views";
//____________IMAGENES______________
import Drink from '../../../imgs/Drink.jpg'
//____________IMAGENES______________
//__________ICONOS__________
import { MdDelete, MdOutlineAttachMoney } from "react-icons/md";
import { IoIosAddCircle } from "react-icons/io";
import { MdCancel } from "react-icons/md";
import { FcSearch } from "react-icons/fc";
//__________ICONOS__________
// Estilos personalizados
import { Container_Modal_Background_Black,Container_Row_100_Left,Container_Row_100_Center,Container_Row_NG_Auto_Center,Container_Modal_Form_White_600,Container_Modal_Form_White,Container_Modal_Form,Container_Meal_100_Center,Container_Row_100_Right } from "../../../styled/Containers";
import { Text_Span_16_Center_Black,Text_Color_Blue_16,Text_Title_28_Black,Text_Color_Green_16,Text_Title_20_Black } from "../../../styled/Text";
import { Label_Area_12_Black, Label_Text_12_Black,Label_Text_16_Black } from "../../../styled/Labels";
import { Icon_Button_Blue_20,Icon_Black_20,Icon_20,Icon_24 } from "../../../styled/Icons";
import { Input_Text_100_Black,Input_Group,Input_Area_100_Black,Input_Text_60_Black } from "../../../styled/Inputs";
import { Alert_Sonner_Promise } from "../../../styled/Alerts";
import { Modal_Form_Button_Add } from "../../../forms/Button";
// Componetes personalizados
import { Image_Modal, Image_Modal_150 } from "../../../styled/Imgs";
import { Keyboard_Form_Drink } from "../../../keyboards/Form";
import { Select_300 } from "../../../styled/Selects";
import { Button_Icon_Green_60, Button_Icon_Red_60, Button_Text_Blue_Auto } from "../../../styled/Buttons";
import { Tooltip } from "@mui/material";
//____________IMPORT/EXPORT____________

// Modal para agregar una bebida
export default function Drink_Add(){
    // Constantes con el valor de los contextos
    const [isActionBlock,setIsActionBlock] = useContext(ActionBlockContext);
    const [isModal,setIsModal] = useContext(ModalContext);
    const [currentMView,setCurrentMView] = useContext(ModalViewContext);
    const [isMenus] = useContext(MenusContext);
    const [isDrinkAdd,setIsDrinkAdd] = useContext(DrinkAddContext);
    const [isSupplyTypes] = useContext(SupplyTypesContext); 
    const [isWarehouseSupplyTypes] = useContext(WarehouseSupplyTypesContext); 
    const [isSelectedRow,setIsSelectedRow] = useContext(SelectedRowContext);
    const [socket] = useContext(SocketContext);
    const [isLoggedType] = useContext(LoggedTypeContext);
    const [isMenuTypeUbications] = useContext(MenuTypeUbicationsContext); 
    const [isTextFieldsDrink,setIsTextFieldsDrink] = useContext(TextFieldsDrinkContext);
    const [isLoggedUser] = useContext(LoggedUserContext);
    const [isSidebar,setIsSidebar] = useContext(SidebarContext);
    const [isKeyboard,setIsKeyboard] = useContext(KeyboardContext);
    const [isKeyboardView,setIsKeyboardView] = useContext(KeyboardViewContext);
    const Keyboard = useContext(RefKeyboardContext);
    const isKeyboardTouch = useContext(RefKeyboardTouchContext);
    const [isTouch] = useContext(TouchContext);
    const [isIndexSearch,setIsIndexSearch] = useContext(IndexSearchContext);
    const [isIndexCount,setIsIndexCount] = useContext(IndexCountContext);
    const [isMenuTypes] = useContext(MenuTypesContext);
    const [isDeletedMenuTypes] = useContext(DeletedMenuTypesContext); 
    // Constantes con la funcionalidad de los hooks
    const navigate = useNavigate();
    const handleModalViewDrinks = HandleModalViewDrinks();
    const handleDrinkAdd = HandleDrinkAdd();
    const { KeyboardView,KeyboardClick } = HandleKeyboard();
    const { MenuAdd,MenuDelete,IngredientAdd,IngredientDelete } = HandleTextDrinks();
    // Constantes con el valor de useState
    const [isTotalName,setIsTotalName] = useState(0);
    const [isTotalImage,setIsTotalImage] = useState(0);
    const [isTotalDescription,setIsTotalDescription] = useState(0);
    const [isImage,setIsImage] = useState('');
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
        setIsTotalName(isTextFieldsDrink.nombre.length);
    },[isTextFieldsDrink.nombre]);
    useEffect(() => {
        setIsTotalImage(isTextFieldsDrink.imagen.length);
    },[isTextFieldsDrink.imagen]);
    useEffect(() => {
        setIsTotalDescription(isTextFieldsDrink.descripcion.length);
    },[isTextFieldsDrink.descripcion]);
    useEffect(() => {
        if(isTextFieldsDrink.tipos.length !== 0){
            isTextFieldsDrink.tipos.map(tipo => {
                if(isDeletedMenuTypes.some(type => type.idtipo === tipo.idtipo)) {
                    return {...tipo, idtipo: 0};
                }

                return tipo;
            });
        }
    },[isDeletedMenuTypes]);
    // UseEffect para agregar datos a la base de datos
    useEffect(() => {
        if(isDrinkAdd){
            const promise = new Promise((resolve,reject) => {
                try{
                    setTimeout(() => {
                        socket.emit('Insert-Drink',isLoggedUser.idusuario,isTextFieldsDrink.nombre.trim(),isTextFieldsDrink.idmenu,isTextFieldsDrink.descripcion.trim(),isTextFieldsDrink.precio,isTextFieldsDrink.preparacion,isTextFieldsDrink.imagen,isTextFieldsDrink.tipos,isTextFieldsDrink.ingredientes);

                        resolve('¡Agregó la bebida!');

                        setIsDrinkAdd(false);

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
                    setIsDrinkAdd(false);
                    return reject('¡Ocurrio un error inesperado!');
                }
            });

            return Alert_Sonner_Promise(promise,'¡Agregando la bebida!','2');
        }
    },[isDrinkAdd]);
    // Estructura del componente
    return(
        <>
            {isModal ? (
                <>
                    <Container_Modal_Background_Black>
                        <Image_Modal/>
                        <Container_Modal_Form_White_600 className={currentMView === 'Bebida-Agregar' ? 'slide-in-container-top' : 'slide-out-container-top'}>
                            <Container_Modal_Form_White>
                                <Container_Modal_Form>
                                    <Text_Title_28_Black>AGREGAR BEBIDA</Text_Title_28_Black>
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
                                                value={isTextFieldsDrink.nombre}
                                                onChange={(e) => setIsTextFieldsDrink(prev => ({...prev, nombre: e.target.value}))}
                                                onFocus={() => {
                                                    if(isKeyboardTouch.current){
                                                        setIsKeyboard(true);
                                                        setIsKeyboardView('Nombre-Bebida');
                                                    }
                                                }}
                                            />
                                            <Label_Text_12_Black>{isTotalName}/100</Label_Text_12_Black>
                                        </Input_Group>
                                        <Icon_Button_Blue_20
                                            onClick={() => {
                                                setIsTextFieldsDrink(prev => ({...prev, nombre: ''}))
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
                                                value={isTextFieldsDrink.imagen}
                                                onChange={(e) => setIsTextFieldsDrink(prev => ({...prev, imagen: e.target.value}))}
                                                onFocus={() => {
                                                    if(isKeyboardTouch.current){
                                                        setIsKeyboard(true);
                                                        setIsKeyboardView('Imagen-Bebida');
                                                    }
                                                }}
                                            />
                                            <Label_Text_12_Black>{isTotalImage}/10000</Label_Text_12_Black>
                                        </Input_Group>
                                        <Button_Text_Blue_Auto
                                            onClick={() => setIsImage(isTextFieldsDrink.imagen)}
                                            disabled={isActionBlock}
                                        >
                                            Verificar
                                        </Button_Text_Blue_Auto>
                                        <Icon_Button_Blue_20
                                            onClick={() => {
                                                setIsTextFieldsDrink(prev => ({...prev, imagen: ''}))
                                            }}
                                            disabled={isActionBlock}
                                        >
                                            <MdCancel/>
                                        </Icon_Button_Blue_20>
                                    </Container_Row_100_Left>
                                    <Image_Modal_150 src={isImage || Drink}/>
                                    <Select_300
                                        data={isMenus.length}
                                        options={isMenus.map((menu) => ({
                                            value: menu.idmenu,
                                            label: menu.nombre
                                        }))}
                                        placeholder='Tiempo de bebida...'
                                        value={isMenus
                                            .map(menu => ({ value: menu.idmenu, label: menu.nombre }))
                                            .find(option => option.value === isTextFieldsDrink.idmenu)
                                        }
                                        onChange={(e) => {
                                            if (e) {
                                                setIsTextFieldsDrink(prev => ({
                                                    ...prev,
                                                    idmenu: e.value,
                                                }));
                                            } else {
                                                setIsTextFieldsDrink(prev => ({
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
                                        <Label_Text_16_Black>Preparación:</Label_Text_16_Black>
                                        <Input_Group>
                                            <Input_Area_100_Black
                                                id="Input-Descripcion"
                                                placeholder="..."
                                                type="text"
                                                maxLength={500}
                                                rows={3}
                                                disabled={isActionBlock}
                                                value={isTextFieldsDrink.descripcion}
                                                onChange={(e) => setIsTextFieldsDrink(prev => ({...prev, descripcion: e.target.value}))}
                                                onFocus={() => {
                                                    if(isKeyboardTouch.current){
                                                        setIsKeyboard(true);
                                                        setIsKeyboardView('Descripcion-Bebida');
                                                    }
                                                }}
                                            />
                                            <Label_Area_12_Black>{isTotalDescription}/500</Label_Area_12_Black>
                                        </Input_Group>
                                        <Icon_Button_Blue_20
                                            onClick={() => {
                                                setIsTextFieldsDrink(prev => ({...prev, descripcion: ''}))
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
                                                value={isTextFieldsDrink.precio}
                                                onChange={(e) => {
                                                    if(!isNaN(Number(e.target.value))){
                                                        setIsTextFieldsDrink(prev => ({...prev, precio: e.target.value}))
                                                    }
                                                }}
                                                onFocus={() => {
                                                    if(isKeyboardTouch.current){
                                                        setIsKeyboard(true);
                                                        setIsKeyboardView('Precio-Bebida');
                                                    }
                                                }}
                                            />
                                        </Input_Group>
                                        <Label_Text_16_Black>MXN</Label_Text_16_Black>
                                        <Icon_Button_Blue_20
                                            onClick={() => {
                                                setIsTextFieldsDrink(prev => ({...prev, precio: ''}))
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
                                                value={isTextFieldsDrink.preparacion}
                                                onChange={(e) => {
                                                    if(!isNaN(Number(e.target.value))){
                                                        setIsTextFieldsDrink(prev => ({...prev, preparacion: e.target.value}))
                                                    }
                                                }}
                                                onFocus={() => {
                                                    if(isKeyboardTouch.current){
                                                        setIsKeyboard(true);
                                                        setIsKeyboardView('Preparacion-Bebida');
                                                    }
                                                }}
                                            />
                                        </Input_Group>
                                        <Label_Text_16_Black>minuto(s)</Label_Text_16_Black>
                                        <Icon_Button_Blue_20
                                            onClick={() => {
                                                setIsTextFieldsDrink(prev => ({...prev, preparacion: ''}))
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
                                    {isTextFieldsDrink.tipos.length !== 0 ? (
                                        isTextFieldsDrink.tipos.map((menu,index) => {
                                            const filteredRecordsMenuTypes = isMenuTypes.filter((data) => {
                                                const isDeleted = isDeletedMenuTypes.some(type => type.idtipo === data.idtipo);
                                                if (isDeleted) return false;
                                                
                                                if(isTextFieldsDrink.tipos.some((ing, i) => i !== index && ing.idtipo === data.idtipo)) return false

                                                if(isLoggedType == 'Nutriólogo'){
                                                    if(isMenuTypeUbications.some(s => s.idubicacion !== 2 && s.idtipo === data.idtipo)) return false
                                                }

                                                return true;
                                            });

                                            return (
                                                <Container_Meal_100_Center key={index}>
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
                                                            const newMenus = [...isTextFieldsDrink.tipos];
                                                            if (e) {
                                                                newMenus[index].idtipo = e.value;
                                                            } else {
                                                                newMenus[index].idtipo = 0;           
                                                            }
                                                            setIsTextFieldsDrink(prev => ({
                                                                ...prev,
                                                                tipos: newMenus
                                                            }));
                                                        }}
                                                        isDisabled={isActionBlock}
                                                    />
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
                                            );
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
                                    {isTextFieldsDrink.ingredientes.length !== 0 ? (
                                        isTextFieldsDrink.ingredientes.map((ingredient,index) => {
                                            const filteredRecordsWarehouse = isWarehouseSupplyTypes.filter((data) => {
                                                const typeName = isSupplyTypes.find(type => type.idtipo === data.idtipo)?.tipo?.toLowerCase() || '';
                                                const search = ingredient.buscador.toLowerCase();

                                                const isAlreadySelected = isTextFieldsDrink.ingredientes.some((ing, i) => 
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
                                                    <Container_Row_100_Center>
                                                        <Icon_24><FcSearch/></Icon_24>
                                                        <Input_Text_60_Black
                                                            className="Input-Buscador"
                                                            type="text"
                                                            placeholder="Buscar..."
                                                            value={ingredient.buscador}
                                                            onChange={(e) => {
                                                                const newIngredients = [...isTextFieldsDrink.ingredientes];
                                                                newIngredients[index].buscador = e.target.value;
                                                                setIsTextFieldsDrink(prev => ({
                                                                    ...prev,
                                                                    ingredientes: newIngredients
                                                                }));
                                                            }}
                                                            onFocus={() => {
                                                                if(isKeyboardTouch.current){
                                                                    setIsKeyboard(true);
                                                                    setIsKeyboardView(`Buscador-Bebida-${index}`);
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
                                                                setIsTextFieldsDrink(prev => {
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
                                                                setIsTextFieldsDrink(prev => {
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
                                                                        const newIngredients = [...isTextFieldsDrink.ingredientes];
                                                                        newIngredients[index].cantidad = e.target.value;
                                                                        setIsTextFieldsDrink(prev => ({
                                                                            ...prev,
                                                                            ingredientes: newIngredients
                                                                        }));
                                                                    }
                                                                }}
                                                                onFocus={() => {
                                                                    if(isKeyboardTouch.current){
                                                                        setIsKeyboard(true);
                                                                        setIsKeyboardView(`Cantidad-Bebida-${index}`);
                                                                        setIsIndexCount(index)
                                                                    }
                                                                }}
                                                            />
                                                        </Input_Group>
                                                        <Label_Text_16_Black>{`${ingredient.unidad || '...'}(s)`}</Label_Text_16_Black>
                                                        <Icon_Button_Blue_20
                                                            onClick={() => {
                                                                const newIngredients = [...isTextFieldsDrink.ingredientes];
                                                                newIngredients[index].cantidad = '';
                                                                setIsTextFieldsDrink(prev => ({
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
                                    <Modal_Form_Button_Add
                                        onCancel={() => handleModalViewDrinks('')}
                                        onAction={() => handleDrinkAdd()}
                                    />
                                </Container_Modal_Form>
                            </Container_Modal_Form_White>
                        </Container_Modal_Form_White_600>
                        <Keyboard_Form_Drink/>
                    </Container_Modal_Background_Black>
                </>
            ):(
                <></>
            )}
        </>
    );
}