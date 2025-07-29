//____________IMPORT/EXPORT____________
// Hooks de React
import { useContext,useEffect,useState } from "react";
import { useNavigate } from "react-router-dom";
// Contextos
import { SocketContext } from "../../../contexts/SocketProvider";
import { ModalContext,ModalViewContext,SidebarContext } from "../../../contexts/ViewsProvider";
import { TextFieldsUserContext,TextFieldsPermissionsContext,TextFieldsStatusContext,TextFieldsCustomizedContext } from "../../../contexts/FormsProvider";
import { UserTypesContext,UserAddContext } from "../../../contexts/UsersProvider";
import { ActionBlockContext,KeyboardContext,KeyboardViewContext,TouchContext } from "../../../contexts/VariablesProvider";
import { LoggedUserContext } from "../../../contexts/SessionProvider";
import { RefKeyboardContext,RefKeyboardTouchContext } from "../../../contexts/RefsProvider";
import { SelectedRowContext } from "../../../contexts/SelectedesProvider";
import { SupplyCategoriesContext,SupplyTypesContext } from "../../../contexts/SuppliesProvider";
import { SearchTerm1Context,SearchTerm2Context } from "../../../contexts/SearchsProvider";
// Hooks personalizados
import { HandleKeyboard } from "../../../hooks/Views";
import { HandleModalViewUsers } from "../../../hooks/users/Views";
import { HandleUserAdd } from "../../../hooks/users/Forms";
import { NutritionistData } from "../../../hooks/nutritionist/Data";
import { NutritionistFunctions } from "../../../hooks/nutritionist/Functions";
//__________IMAGENES__________
import Logo_Hospital from '../../imgs/Logo-Hospital.png'
//__________IMAGENES__________
//__________ICONOS__________
// Icono para cerrar el modal
import { MdCancel } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { IoSearch } from "react-icons/io5";
import { IoIosAddCircle } from "react-icons/io";
//__________ICONOS__________
// Estilos personalizados
import { Container_Diet_100_Center, Container_Modal_Form_White_80, Container_Row_100_Right } from "../../styled/Containers";
import { Container_Modal_Background_Black,Container_Modal_Form_White_600,Container_Modal_Image,Container_Modal_Form,Container_Modal_Form_White,Container_Row_NG_Auto_Center,Container_Row_100_Left,Container_Row_100_Center,Container_Modal_Form_Button } from "../../styled/Containers";
import { Text_Title_28_Black,Text_Color_Blue_16,Text_Span_16_Center_Black,Text_Color_Green_16, Text_Title_20_White, Text_Title_20_Black } from "../../styled/Text";
import { Icon_Button_Green_24,Icon_Button_Blue_16, Icon_Button_Green_28, Icon_20 } from "../../styled/Icons";
import { Input_Text_100_Black,Input_Radio_20,Input_Checkbox_16,Input_Group, Input_Text_60_Black } from "../../styled/Inputs";
import { Label_Text_12_Black,Label_Text_16_Black } from "../../styled/Labels";
import { Alert_Sonner_Promise } from "../../styled/Alerts";
import { Button_Icon_Red_200 } from "../../styled/Buttons";
// Componentes personalizados
import { Keyboard_Form_User } from "../../keyboards/Form";
import { Modal_Form_Button_Add } from "../../forms/Button";
import { Select_300 } from "../../styled/Selects";
import { Tooltip } from "@mui/material";

//____________IMPORT/EXPORT____________

// Modal para agregar platillos personalizados unicos
export default function Nutritionist_Customized(){
    // Constantes con el valor de los contextos
    const [isModal,setIsModal] = useContext(ModalContext);
    const [currentMView,setCurrentMView] = useContext(ModalViewContext);
    const [isTextFieldsUser,setIsTextFieldsUser] = useContext(TextFieldsUserContext);
    const [isTextFieldsPermissions,setIsTextFieldsPermissions] = useContext(TextFieldsPermissionsContext);
    const [isTextFieldsCustomized,setIsTextFieldsCustomized] = useContext(TextFieldsCustomizedContext);
    const [isTextFieldsStatus,setIsTextFieldsStatus] = useContext(TextFieldsStatusContext);
    const [isUserTypes] = useContext(UserTypesContext);
    const [isSupplyCategories,setIsSupplyCategories] = useContext(SupplyCategoriesContext);
    const [isActionBlock,setIsActionBlock] = useContext(ActionBlockContext);
    const [isUserAdd,setIsUserAdd] = useContext(UserAddContext);
    const [socket] = useContext(SocketContext);
    const [isLoggedUser] = useContext(LoggedUserContext);
    const [isKeyboard,setIsKeyboard] = useContext(KeyboardContext);
    const [isKeyboardView,setIsKeyboardView] = useContext(KeyboardViewContext);
    const Keyboard = useContext(RefKeyboardContext);
    const isKeyboardTouch = useContext(RefKeyboardTouchContext);
    const [isTouch] = useContext(TouchContext);
    const [isSelectedRow,setIsSelectedRow] = useContext(SelectedRowContext);
    const [isSidebar,setIsSidebar] = useContext(SidebarContext);
    const [isSupplyTypes,setIsSupplyTypes] = useContext(SupplyTypesContext);
    const [isSearchTerm1,setIsSearchTerm1] = useContext(SearchTerm1Context); 
    const [isSearchTerm2,setIsSearchTerm2] = useContext(SearchTerm2Context); 
    // Constantes con la funcionalidad de los hooks
    const navigate = useNavigate();
    const handleModalViewUsers = HandleModalViewUsers();
    const handleUserAdd = HandleUserAdd();
    const { KeyboardView,KeyboardClick } = HandleKeyboard();
    const { getFilteredCategories,getFilteredTypes } = NutritionistData();
    const { IngredientAdd,IngredientDelete } = NutritionistFunctions();
    // Constantes con el valor de useState
    const [isTotalUnit,setIsTotalUnit] = useState(0);
    const [isTotalShortName,setIsTotalShortName] = useState(0);
    const [isTotalUser,setIsTotalUser] = useState(0);
    const [isTotalPassword,setIsTotalPassword] = useState(0);
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
        setIsTotalShortName(isTextFieldsUser.nombrecorto.length);
    },[isTextFieldsUser.nombrecorto]);
    useEffect(() => {
        setIsTotalUser(isTextFieldsUser.usuario.length);
    },[isTextFieldsUser.usuario]);
    useEffect(() => {
        setIsTotalPassword(isTextFieldsUser.contrasena.length);
    },[isTextFieldsUser.contrasena]);
    // UseEffects para agregar datos a la base de datos
    useEffect(() => {
        if(isUserAdd){
            const promise = new Promise((resolve,reject) => {
                try{
                    setTimeout(() => {
                        socket.emit('Insert-User',isLoggedUser.idusuario,isTextFieldsUser.nombre.trim(),isTextFieldsUser.nombrecorto.trim(),isTextFieldsUser.usuario.trim(),isTextFieldsUser.contrasena.trim(),isTextFieldsUser.idtipo,isTextFieldsUser.permisos,isTextFieldsPermissions.administrador,isTextFieldsPermissions.chef,isTextFieldsPermissions.almacenista,isTextFieldsPermissions.cocinero,isTextFieldsPermissions.nutriologo,isTextFieldsPermissions.medico,isTextFieldsStatus.estatus)

                        resolve('¡Agregó al usuario!');

                        setIsUserAdd(false);

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
                    setIsUserAdd(false);
                    return reject('¡Ocurrio un error inesperado!');
                }
            });

            return Alert_Sonner_Promise(promise,'¡Agregando un usuario!','2');
        }
    },[isUserAdd]);
    // Estructura del componente
    return(
        <>
            <Container_Modal_Form_White_80>
                <Container_Modal_Form_White>
                    <Container_Modal_Form>
                        <Text_Title_28_Black>DIETA PERSONALIZADA</Text_Title_28_Black>
                        {isTextFieldsCustomized.ingredients.map((ingredient,index) => (
                            <Container_Diet_100_Center key={index}>
                                <Container_Row_100_Left>
                                    <Label_Text_16_Black>Unidad:</Label_Text_16_Black>
                                    <Input_Group>
                                        <Input_Text_100_Black
                                            id="Input-Unidad"
                                            placeholder="..."
                                            type="text"
                                            maxLength={20}
                                            disabled
                                            value={ingredient.unidad}
                                            onChange={(e) => {
                                                const newIngredients = [...isTextFieldsCustomized.ingredients];
                                                newIngredients[index].unidad = e.target.value;
                                                setIsTextFieldsCustomized(prev => ({
                                                    ...prev,
                                                    ingredients: newIngredients
                                                }));
                                            }}
                                        />
                                    </Input_Group>
                                    <Select_300
                                        data={getFilteredCategories(ingredient.searchCategoria).length}
                                        options={getFilteredCategories(ingredient.searchCategoria).map((category) => ({
                                            value: category.idcategoria,
                                            label: category.nombre
                                        }))}
                                        placeholder='Categorías de insumo...'
                                        value={getFilteredCategories(ingredient.searchCategoria)
                                            .map(category => ({ value: category.idcategoria, label: category.nombre }))
                                            .find(option => option.value === ingredient.idcategoria)
                                        }
                                        onChange={(e) => {
                                            const newIngredients = [...isTextFieldsCustomized.ingredients];
                                            if (e) {
                                                newIngredients[index].idcategoria = e.value;
                                            } else {
                                                newIngredients[index].idcategoria = 0;           
                                            }
                                            setIsTextFieldsCustomized(prev => ({
                                                ...prev,
                                                ingredients: newIngredients
                                            }));
                                        }}
                                        isDisabled={isActionBlock}
                                    />
                                    <Icon_20><IoSearch/></Icon_20>
                                    <Input_Text_60_Black
                                        type="text"
                                        placeholder="Buscar..."
                                        value={ingredient.searchCategoria}
                                        disabled={isActionBlock}
                                        onChange={(e) => {
                                            const newIngredients = [...isTextFieldsCustomized.ingredients];
                                            newIngredients[index].searchCategoria = e.target.value;
                                            setIsTextFieldsCustomized(prev => ({
                                                ...prev,
                                                ingredients: newIngredients
                                            }));
                                        }}
                                    />
                                </Container_Row_100_Left>
                                <Container_Row_100_Left>
                                    <Label_Text_16_Black>Cantidad:</Label_Text_16_Black>
                                    <Input_Group>
                                        <Input_Text_100_Black
                                            id="Input-Unidad"
                                            placeholder="..."
                                            type="text"
                                            maxLength={100}
                                            disabled={isActionBlock}
                                            value={ingredient.cantidad}
                                            onChange={(e) => {
                                                const newIngredients = [...isTextFieldsCustomized.ingredients];
                                                newIngredients[index].cantidad = e.target.value;
                                                setIsTextFieldsCustomized(prev => ({
                                                    ...prev,
                                                    ingredients: newIngredients
                                                }));
                                            }}
                                        />
                                        <Label_Text_12_Black>{isTotalUnit}/20</Label_Text_12_Black>
                                    </Input_Group>
                                    <Select_300
                                        data={getFilteredTypes(ingredient.searchTipo,ingredient.idcategoria).length}
                                        options={getFilteredTypes(ingredient.searchTipo,ingredient.idcategoria).map((type) => ({
                                            value: type.idtipo,
                                            label: type.tipo
                                        }))}
                                        placeholder='Tipos de insumo...'
                                        value={getFilteredTypes(ingredient.searchTipo,ingredient.idcategoria)
                                            .map(type => ({ value: type.idtipo, label: type.tipo }))
                                            .find(option => option.value === ingredient.idtipo)
                                        }
                                        onChange={(e) => {
                                            const newIngredients = [...isTextFieldsCustomized.ingredients];
                                            if (e) {
                                                const selectedType = isSupplyTypes.find(type => type.idtipo === e.value);
                                                newIngredients[index].idtipo = e.value;
                                                newIngredients[index].unidad = selectedType?.unidad || '';
                                            } else {
                                                newIngredients[index].idtipo = 0;
                                                newIngredients[index].unidad = '';
                                            }
                                            setIsTextFieldsCustomized(prev => ({
                                                ...prev,
                                                ingredients: newIngredients
                                            }));
                                        }}
                                        isDisabled={isActionBlock}
                                    />
                                    <Icon_20><IoSearch/></Icon_20>
                                    <Input_Text_60_Black
                                        type="text"
                                        placeholder="Buscar..."
                                        value={ingredient.searchTipo}
                                        disabled={isActionBlock || ingredient.idcategoria === 0}
                                        onChange={(e) => {
                                            const newIngredients = [...isTextFieldsCustomized.ingredients];
                                            newIngredients[index].searchTipo = e.target.value;
                                            setIsTextFieldsCustomized(prev => ({
                                                ...prev,
                                                ingredients: newIngredients
                                            }));
                                        }}
                                    />
                                </Container_Row_100_Left>
                                <Container_Row_100_Left>
                                    <Container_Row_100_Left>
                                        <Text_Title_20_Black>No. Ingrediente: {index+1}</Text_Title_20_Black>
                                    </Container_Row_100_Left>
                                    <Container_Row_100_Right>
                                        <Button_Icon_Red_200
                                            onClick={() => IngredientDelete(index)}
                                        >
                                            <Icon_20><MdDelete/></Icon_20>
                                        </Button_Icon_Red_200>
                                    </Container_Row_100_Right>
                                </Container_Row_100_Left>
                            </Container_Diet_100_Center>
                        ))}
                        {isActionBlock ? (
                            <Icon_Button_Green_28 disabled>
                                <IoIosAddCircle/>
                            </Icon_Button_Green_28>
                        ):(
                            <Tooltip title='Agregar' placement="top">
                                <Icon_Button_Green_28
                                    onClick={() => IngredientAdd()}
                                >
                                    <IoIosAddCircle/>
                                </Icon_Button_Green_28>
                            </Tooltip>
                        )}
                    </Container_Modal_Form>
                </Container_Modal_Form_White>
            </Container_Modal_Form_White_80>
            <Keyboard_Form_User/>
        </>
    );
}