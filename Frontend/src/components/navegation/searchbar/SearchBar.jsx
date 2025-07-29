//____________IMPORT/EXPORT____________
// Hooks de React
import { useContext,useEffect } from "react";
import { useNavigate } from "react-router-dom";
// Componentes de React externos
import { Tooltip } from "@mui/material";
// Contextos
import { ThemeModeContext,NavbarViewContext,SidebarViewContext } from "../../../contexts/ViewsProvider";
import { ActionBlockContext,KeyboardViewContext,KeyboardContext,TouchContext } from "../../../contexts/VariablesProvider";
import { SearchTermContext } from "../../../contexts/SearchsProvider";
import { TextFieldsSearchDateContext } from "../../../contexts/FormsProvider";
import { SelectedRowContext,SelectedOptionSearchContext,SelectedOptionOrderPlusContext,SelectedOptionOrderPlusUltraContext } from "../../../contexts/SelectedesProvider";
import { LoggedPermissionsContext,LoggedTypeContext } from "../../../contexts/SessionProvider";
import { UsersViewPasswordContext } from "../../../contexts/UsersProvider";
import { RefKeyboardContext,RefKeyboardTouchContext,RefSupplyOrdersContext } from "../../../contexts/RefsProvider";
// Hooks personalizados
import { HandleModalViewUsers } from "../../../hooks/users/Views";
import { HandleViewPassword } from "../../../hooks/users/Forms";
import { HandleModalViewSuppliers } from "../../../hooks/suppliers/Views";
import { HandleModalViewSupplies } from "../../../hooks/supplies/Views";
import { HandleModalViewMenuTypes } from "../../../hooks/menus/Views";
import { HandleModalViewWarehouse } from "../../../hooks/warehouse/Views";
import { ResetFilteredSearch,ResetFilteredOrder } from "../../../hooks/Texts";
import { HandleKeyboard } from "../../../hooks/Views";
//__________ICONOS__________
// Icono para la seccion del buscador
import { IoSearch } from "react-icons/io5";
import { LuArrowDownUp } from "react-icons/lu";
// Iconos para un crud
import { IoIosAddCircle } from "react-icons/io";
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { FaEye } from "react-icons/fa";
import { IoIosEyeOff } from "react-icons/io";
import { FaUnlock } from "react-icons/fa";
import { FaLock } from "react-icons/fa";
import { FaLockOpen } from "react-icons/fa";
import { FaUserTie } from "react-icons/fa6";
import { FaSyncAlt } from "react-icons/fa";
import { BiSolidMessageAdd } from "react-icons/bi";
import { BiSolidMessageDetail } from "react-icons/bi";
import { MdAddBox } from "react-icons/md";
import { MdOutlineMessage } from "react-icons/md";
//__________ICONOS__________
// Estilos personalizados
import { Container_Searchbar_Row_General_Black,Container_Searchbar_Row_General,Container_Searchbar_Row_Search_Blue,Container_Searchbar_Row_Function } from "../../styled/Containers";
import { Button_Text_Blue_Auto,Button_Icon_Green_60,Button_Icon_Blue_60,Button_Icon_Red_60,Button_Icon_Orange_60,Button_Icon_Blue_140 } from "../../styled/Buttons";
import { Icon_White_20,Icon_Button_White_20,Icon_16 } from "../../styled/Icons";
import { Input_Search_Table_White,Input_Radio_20 } from "../../styled/Inputs";
import { Text_Span_12_Center_White } from "../../styled/Text";
// Componentes personalizados
import { Search_Bar_Button_Search,Search_Bar_Button_Order,Search_Bar_Icon_Button_Order,Search_Bar_Icon_Button_Search,Search_Bar_Icon_Button_Search_Order } from "./Buttons";
import { Search_Bar_Button_Add,Search_Bar_Button_Edit,Search_Bar_Button_Delete,Search_Bar_Button_Enable,Search_Bar_Button_View,Search_Bar_Button_Detail } from "./Buttons";
//____________IMPORT/EXPORT____________

// Componente para buscar elementos o acciones en las tablas
export default function Search_Bar (){
    // Constantes con el valor de los contextos
    const [isActionBlock] = useContext(ActionBlockContext);
    const [themeMode] = useContext(ThemeModeContext);
    const [currentNView] = useContext(NavbarViewContext);
    const [currentSView] = useContext(SidebarViewContext);
    const [isSearchTerm,setIsSearchTerm] = useContext(SearchTermContext);
    const [isSelectedRow] = useContext(SelectedRowContext);
    const [isLoggedPermissions] = useContext(LoggedPermissionsContext);
    const [isUsersViewPassword] = useContext(UsersViewPasswordContext);
    const [isLoggedType] = useContext(LoggedTypeContext);
    const {Modal_Suppy_Orders,Form_Supply_Orders,Button_Edit_Supply_Orders,Button_Edit_State_Supply_Orders,Button_Add_Supply_Order_Observations,Button_View_Supply_Order_Observations,Button_Delete_Supply_Orders} = useContext(RefSupplyOrdersContext);
    const [isSelectedOptionSearch,setIsSelectedOptionSearch] = useContext(SelectedOptionSearchContext);
    const [isSelectedOptionOrderPlus,setIsSelectedOptionOrderPlus] = useContext(SelectedOptionOrderPlusContext);
    const [isSelectedOptionOrderPlusUltra,setIsSelectedOptionOrderPlusUltra] = useContext(SelectedOptionOrderPlusUltraContext); 
    const [isTextFieldsSearchDate,setIsTextFieldsSearchDate] = useContext(TextFieldsSearchDateContext);
    const [isKeyboard,setIsKeyboard] = useContext(KeyboardContext);
    const [isKeyboardView,setIsKeyboardView] = useContext(KeyboardViewContext);
    const Keyboard = useContext(RefKeyboardContext);
    const isKeyboardTouch = useContext(RefKeyboardTouchContext);
    const [isTouch] = useContext(TouchContext);
    // Constante con las opciones de los buscadores
    const isOptionUsers = ['General','Nombre','Nombre corto','Usuario','Tipo de usuario'];
    const isOptionStatusSearch = ['General','Nombre','Usuario'];
    const isOptionStatus = ['Normal','Activo','Inactivo'];
    const isOptionSuppliers = ['General','Nombre','RFC','Domicilio','Teléfono','Correo'];
    const isOptionSupplierObservations = ['General','Proveedor','Fecha','Calificación'];
    const isOptionSupplyTypes = ['General','Tipo','Unidad','Categoría','Cantidad Mínima'];
    const isOptionSupplies = ['General','Nombre','Proveedor','Categoría','Tipo','Cantidad'];
    const isOptionSupplyOrders = ['General','Número de Pedido','Fecha','Insumo','Cantidad','Precio Unitario','Precio Total','Estado'];
    const isOptionPurchases = ['Categorías','Tipos de Insumo'];
    const isOptionSales = ['Categorías','Tipos de Insumo'];
    const isOptionWarehouse = ['Nombre','Fecha'];
    const isOptionsMaelSearch = ['General','Nombre','Tiempo de preparación','Precio','Menú'];
    const isOptionsMaelOrder = ['Desayuno','Comida','Cena'];
    // Constantes con la funcionalidad de los hooks
    const navigate = useNavigate();
    const handleModalViewUsers = HandleModalViewUsers();
    const handleViewPassword = HandleViewPassword();
    const handleModalViewSuppliers = HandleModalViewSuppliers();
    const handleModalViewSupplies = HandleModalViewSupplies();
    const handleModalViewMenuTypes = HandleModalViewMenuTypes();
    const handleModalViewWarehouse = HandleModalViewWarehouse();
    const resetFilteredSearch = ResetFilteredSearch();
    const resetFilteredOrder = ResetFilteredOrder();
    const { KeyboardView,KeyboardClick } = HandleKeyboard();
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
    // UseEffect para reiniciar las opciones
    useEffect(() => {
        setIsSelectedOptionOrderPlusUltra('');
    },[isSelectedOptionOrderPlus]);
    useEffect(() => {
        if(isSelectedOptionSearch === 'Fecha'){
            setIsTextFieldsSearchDate(prev => ({
                ...prev,
                año: new Date().getFullYear(),
                mes: new Date().getMonth() + 1,
            }))
        }
        if(isSelectedOptionSearch === 'Nombre'){
            setIsTextFieldsSearchDate(prev => ({
                ...prev,
                año: 0,
                mes: 0,
            }))
        }
    },[isSelectedOptionSearch])
    // Estructura del componente
    return(
        <>
            <Container_Searchbar_Row_General_Black>
                <Container_Searchbar_Row_General>
                    {currentSView === 'Inventario' && currentNView === 'Compras' || currentNView === 'Ventas' ? (
                        <></>
                    ):(
                        <>
                            <Icon_White_20><IoSearch/></Icon_White_20>
                            <Input_Search_Table_White
                                id="Input-Buscador"
                                type="text"
                                placeholder="Buscar..."
                                value={isSearchTerm}
                                disabled={isActionBlock}
                                onChange={(e) => setIsSearchTerm(e.target.value)}
                                onFocus={() => {
                                    if(isKeyboardTouch.current){
                                        setIsKeyboard(true);
                                        setIsKeyboardView('Buscador');
                                    }
                                }}
                            />  
                        </>
                    )}
                    {currentSView === 'Usuarios' && currentNView === 'Usuarios' ? (
                        <Container_Searchbar_Row_Search_Blue>
                            <Search_Bar_Button_Search
                                options={isOptionUsers}
                            />
                            <Search_Bar_Icon_Button_Search_Order/>
                        </Container_Searchbar_Row_Search_Blue>
                    ):(
                        <></>
                    )}
                    {currentSView === 'Usuarios' && currentNView === 'Permisos' ? (
                        <>
                            <Search_Bar_Icon_Button_Search_Order/>
                        </>
                    ):(
                        <></>
                    )}
                    {currentSView === 'Usuarios' && currentNView === 'Estatus' ? (
                        <Container_Searchbar_Row_Search_Blue>
                            <Search_Bar_Button_Search
                                options={isOptionStatusSearch}
                            />
                            <Search_Bar_Icon_Button_Search/>
                            <Search_Bar_Button_Order
                                options={isOptionStatus}
                            />
                            <Search_Bar_Icon_Button_Order/>
                        </Container_Searchbar_Row_Search_Blue>
                    ):(
                        <></>
                    )}
                    {currentSView === 'Proveedores' && currentNView === 'Proveedores' ? (
                        <Container_Searchbar_Row_Search_Blue>
                            <Search_Bar_Button_Search
                                options={isOptionSuppliers}
                            />
                            <Search_Bar_Icon_Button_Search_Order/>
                        </Container_Searchbar_Row_Search_Blue>
                    ):(
                        <></>
                    )}
                    {currentSView === 'Proveedores' && currentNView === 'Observaciones de proveedores' ? (
                        <Container_Searchbar_Row_Search_Blue>
                            <Search_Bar_Button_Search
                                options={isOptionSupplierObservations}
                            />
                            <Search_Bar_Icon_Button_Search_Order/>
                        </Container_Searchbar_Row_Search_Blue>
                    ):(
                        <></>
                    )}
                    {currentSView === 'Insumos' && currentNView === 'Categorias por insumo' ? (
                        <>
                            <Search_Bar_Icon_Button_Search_Order/>
                        </>
                    ):(
                        <></>
                    )}
                    {currentSView === 'Insumos' && currentNView === 'Tipos de insumo' ? (
                        <Container_Searchbar_Row_Search_Blue>
                            <Search_Bar_Button_Search
                                options={isOptionSupplyTypes}
                            />
                            <Search_Bar_Icon_Button_Search_Order/>
                        </Container_Searchbar_Row_Search_Blue>
                    ):(
                        <></>
                    )}
                    {currentSView === 'Insumos' && currentNView === 'Insumos' ? (
                        <Container_Searchbar_Row_Search_Blue>
                            <Search_Bar_Button_Search
                                options={isOptionSupplies}
                            />
                            <Search_Bar_Icon_Button_Search_Order/>
                        </Container_Searchbar_Row_Search_Blue>
                    ):(
                        <></>
                    )}


                    {currentSView === 'Inventario' && currentNView === 'Pedidos de insumo' ? (
                        <Container_Searchbar_Row_Search_Blue ThemeMode={themeMode}>                   
                            {isOptionSupplyOrders.map((option,index) => (
                                <Button_Icon_Blue_140 ThemeMode={themeMode}
                                    key={index}
                                    onClick={() => setIsSelectedOptionSearch(option)}
                                    style={{
                                        backgroundColor: isSelectedOptionSearch === option ? themeMode ? 'rgb(208, 31, 31)' : 'rgb(155, 9, 9)' : themeMode ? 'rgb(82, 126, 231)' : 'rgb(58,93,174)',
                                        color: isSelectedOptionSearch === option ? 'white' : 'white',
                                    }}
                                >
                                    {option}
                                </Button_Icon_Blue_140>
                            ))}
                            <Icon_16><IoSearch/></Icon_16>
                        </Container_Searchbar_Row_Search_Blue>
                    ):(
                        <></>
                    )}
                    {currentSView === 'Inventario' && currentNView === 'Compras' ? (
                        <Container_Searchbar_Row_Search_Blue>
                            {isOptionWarehouse.map((option,index) => (
                                <Button_Text_Blue_Auto
                                    key={index}
                                    onClick={() => setIsSelectedOptionSearch(option)}
                                    style={{
                                        backgroundColor: isSelectedOptionSearch === option ? 'rgb(12, 54, 109)' : 'rgb(58,93,174)',
                                        color: isSelectedOptionSearch === option ? 'white' : 'white',
                                    }}
                                >
                                    {option}
                                </Button_Text_Blue_Auto>
                            ))}
                            <Tooltip title='Restablecer filtros de búsqueda' placement="top">
                                <Icon_Button_White_20 onClick={() => resetFilteredSearch()}><IoSearch/></Icon_Button_White_20>
                            </Tooltip>
                            {isOptionPurchases.map((option,index) => (
                                <Button_Text_Blue_Auto
                                    key={index}
                                    onClick={() => setIsSelectedOptionOrderPlus(option)}
                                    style={{
                                        backgroundColor: isSelectedOptionOrderPlus === option ? 'rgb(12, 54, 109)' : 'rgb(58,93,174)',
                                        color: isSelectedOptionOrderPlus === option ? 'white' : 'white',
                                    }}
                                >
                                    {option}
                                </Button_Text_Blue_Auto>
                            ))}
                            <Tooltip title='Restablecer filtros de ordenamiento' placement="top">
                                <Icon_Button_White_20 onClick={() => resetFilteredOrder()}><LuArrowDownUp/></Icon_Button_White_20>
                            </Tooltip>
                        </Container_Searchbar_Row_Search_Blue>
                    ):(
                        <></>
                    )}
                    {currentSView === 'Inventario' && currentNView === 'Ventas' ? (
                        <Container_Searchbar_Row_Search_Blue>
                            {isOptionWarehouse.map((option,index) => (
                                <Button_Text_Blue_Auto
                                    key={index}
                                    onClick={() => setIsSelectedOptionSearch(option)}
                                    style={{
                                        backgroundColor: isSelectedOptionSearch === option ? 'rgb(12, 54, 109)' : 'rgb(58,93,174)',
                                        color: isSelectedOptionSearch === option ? 'white' : 'white',
                                    }}
                                >
                                    {option}
                                </Button_Text_Blue_Auto>
                            ))}
                            <Tooltip title='Restablecer filtros de búsqueda' placement="top">
                                <Icon_Button_White_20 onClick={() => resetFilteredSearch()}><IoSearch/></Icon_Button_White_20>
                            </Tooltip>
                            {isOptionSales.map((option,index) => (
                                <Button_Text_Blue_Auto
                                    key={index}
                                    onClick={() => setIsSelectedOptionOrderPlus(option)}
                                    style={{
                                        backgroundColor: isSelectedOptionOrderPlus === option ? 'rgb(12, 54, 109)' : 'rgb(58,93,174)',
                                        color: isSelectedOptionOrderPlus === option ? 'white' : 'white',
                                    }}
                                >
                                    {option}
                                </Button_Text_Blue_Auto>
                            ))}
                            <Tooltip title='Restablecer filtros de ordenamiento' placement="top">
                                <Icon_Button_White_20 onClick={() => resetFilteredOrder()}><LuArrowDownUp/></Icon_Button_White_20>
                            </Tooltip>
                        </Container_Searchbar_Row_Search_Blue>
                    ):(
                        <></>
                    )}
                    {currentSView === 'Inventario' && currentNView === 'Compras' || currentNView === 'Ventas' ? (
                        isSelectedOptionSearch === 'Nombre' ? (
                            <>
                                <Icon_White_20><IoSearch/></Icon_White_20>
                                <Input_Search_Table_White
                                    type="text"
                                    placeholder="Buscar..."
                                    value={isSearchTerm}
                                    onChange={(e) => setIsSearchTerm(e.target.value)}
                                /> 
                            </>
                        ):(
                            isSelectedOptionSearch === 'Fecha' ? (
                                <>
                                    <select
                                        value={isTextFieldsSearchDate.año}
                                        onChange={({ target: { value } }) => setIsTextFieldsSearchDate(prev => ({ ...prev, año: parseInt(value) }))}
                                        style={{
                                            fontFamily: 'Century Gothic',
                                            fontSize: '16px',
                                            borderRadius: '15px',
                                            border: '2px solid black',
                                            padding:'5px',
                                            background: 'white',
                                        }}
                                    >
                                        {Array.from({ length: 51 }, (_, i) => {
                                            const year = new Date().getFullYear() - i;
                                            return <option key={year} value={year}>{year}</option>;
                                        })}
                                    </select>
                                    <select
                                        value={isTextFieldsSearchDate.mes}
                                        onChange={({ target: { value } }) => setIsTextFieldsSearchDate(prev => ({ ...prev, mes: parseInt(value) }))}
                                        style={{
                                            fontFamily: 'Century Gothic',
                                            fontSize: '16px',
                                            borderRadius: '15px',
                                            border: '2px solid black',
                                            padding:'5px',
                                            background: 'white',
                                        }}
                                    >
                                        {Array.from({ length: isTextFieldsSearchDate.año === new Date().getFullYear() ? new Date().getMonth() + 1 : 12 }, (_, i) => (
                                            <option key={i} value={i+1}>
                                                {new Date(0, i).toLocaleString("es", { month: "long" }).toUpperCase()}
                                            </option>
                                        ))}
                                    </select>
                                </>
                            ):(
                                <></>
                            )
                        )
                    ):(
                        <></>
                    )}

                    {currentSView === 'Menus' && currentNView === 'Menus' ? (
                        <>
                            <Search_Bar_Icon_Button_Search_Order/>
                        </>
                    ):(
                        <></>
                    )}
                    {currentSView === 'Menus' && currentNView === 'Platillos' ? (
                        <>
                            <Container_Searchbar_Row_Search_Blue>
                                <Search_Bar_Button_Search
                                    options={isOptionsMaelSearch}
                                />
                                <Search_Bar_Icon_Button_Search/>
                                <Search_Bar_Button_Order
                                    options={isOptionsMaelOrder}
                                />
                                <Search_Bar_Icon_Button_Order/>
                            </Container_Searchbar_Row_Search_Blue>
                        </>
                    ):(
                        <></>
                    )}
                    <Container_Searchbar_Row_Function>
                        {currentSView === 'Usuarios' && currentNView === 'Usuarios' ? (
                            <>
                                <Search_Bar_Button_Add
                                    route="/Administration/Index/Users/Users/Add"
                                    onHandleModalView={() => handleModalViewUsers('Usuario-Agregar')}
                                    row={isSelectedRow}
                                />
                                <Search_Bar_Button_Edit
                                    route="/Administration/Index/Users/Users/Edit"
                                    onHandleModalView={() => handleModalViewUsers('Usuario-Editar')}
                                    row={isSelectedRow}
                                />
                                {isLoggedPermissions?.superadministrador ? (
                                    <Search_Bar_Button_Delete
                                        route="/Administration/Index/Users/Users/Delete"
                                        onHandleModalView={() => handleModalViewUsers('Usuario-Eliminar')}
                                        row={isSelectedRow}
                                    />
                                ):(
                                    <></>
                                )}
                                <Search_Bar_Button_View
                                    title_true="Ocultar contraseñas"
                                    title_false="Mostrar contraseñas"
                                    route="/Administration/Index/Users/Users/View"
                                    onHandleAction_True={() => handleViewPassword()}
                                    onHandleAction_False={() => handleModalViewUsers('Usuario-Ver-Contraseña')}
                                    icon_true={<IoIosEyeOff/>}
                                    icon_false={<FaEye/>}
                                    condition={isUsersViewPassword}
                                />
                            </>
                        ):(
                            <></>
                        )}
                        {currentSView === 'Usuarios' && currentNView === 'Permisos' ? (
                            <>
                                <Search_Bar_Button_Add
                                    route="/Administration/Index/Users/Permissions/Add"
                                    onHandleModalView={() => handleModalViewUsers('Permisos-Agregar')}
                                    row={isSelectedRow}
                                />
                                <Search_Bar_Button_Edit
                                    route="/Administration/Index/Users/Permissions/Edit"
                                    onHandleModalView={() => handleModalViewUsers('Permisos-Editar')}
                                    row={isSelectedRow}
                                />
                                {isLoggedPermissions?.superadministrador ? (
                                    <Search_Bar_Button_Enable
                                        title_true="Deshabilitar"
                                        title_false="Habilitar"
                                        condition={isSelectedRow?.superadministrador}
                                        row={isSelectedRow}
                                        icon={<FaUserTie/>}
                                        icon_true={<FaUserTie/>}
                                        icon_false={<FaUserTie/>}
                                        onHandleModalView={() => handleModalViewUsers('Permiso-Super-Administrador')}
                                        route="/Administration/Index/Users/Permissions/Enable"
                                    />
                                ):(
                                    <></>
                                )}
                            </>
                        ):(
                            <></>
                        )}
                        {currentSView === 'Usuarios' && currentNView === 'Estatus' ? (
                            <>
                                <Search_Bar_Button_Add
                                    onHandleModalView={() => handleModalViewUsers('Estatus-Agregar')}
                                    route="/Administration/Index/Users/Status/Add"
                                    row={isSelectedRow}
                                />
                                <Search_Bar_Button_Enable
                                    title_true="Deshabilitar"
                                    title_false="Habilitar"
                                    icon={<FaUnlock/>}
                                    icon_true={<FaLock/>}
                                    icon_false={<FaLockOpen/>}
                                    row={isSelectedRow}
                                    condition={isSelectedRow?.habilitado}
                                    route="/Administration/Index/Users/Status/Enable"
                                    onHandleModalView={() => handleModalViewUsers('Estatus-Habilitar')}
                                />
                            </>
                        ):(
                            <></>
                        )}
                        {currentSView === 'Proveedores' && currentNView === 'Proveedores' ? (
                            <>
                                {isLoggedType === 'Chef' || isLoggedType === 'Almacenista' ? (
                                    <>
                                        <Search_Bar_Button_Add
                                            onHandleModalView={() => handleModalViewSuppliers('Proveedor-Agregar')}
                                            route="/Administration/Index/Suppliers/Suppliers/Add"
                                            row={isSelectedRow}
                                        />
                                        <Search_Bar_Button_Edit
                                            onHandleModalView={() => handleModalViewSuppliers('Proveedor-Editar')}
                                            route="/Administration/Index/Suppliers/Suppliers/Edit"
                                            row={isSelectedRow}
                                        />
                                    </>
                                ):(
                                    <></>
                                )}
                                {isLoggedPermissions.superadministrador || isLoggedType === 'Chef' ? (
                                    <Search_Bar_Button_Delete
                                        onHandleModalView={() => handleModalViewSuppliers('Proveedor-Eliminar')}
                                        route="/Administration/Index/Suppliers/Suppliers/Delete"
                                        row={isSelectedRow}
                                    />
                                ):(
                                    <></>
                                )}
                            </>
                        ):(
                            <></>
                        )}
                        {currentSView === 'Proveedores' && currentNView === 'Observaciones de proveedores' ? (
                            <Search_Bar_Button_Detail
                                title="Detalles de observaciones"
                                icon={<MdOutlineMessage/>}
                                row={isSelectedRow}
                                route="/Administration/Index/Suppliers/Observations/View"
                                onHandleModalView={() => handleModalViewSuppliers('Observacion-Detalles')}
                            />
                        ):(
                            <></>
                        )}
                        {currentSView === 'Insumos' && currentNView === 'Categorias por insumo' ? (
                            <>
                                {isLoggedType === 'Chef' || isLoggedType === 'Almacenista' ? (
                                    <>
                                        <Search_Bar_Button_Add
                                            onHandleModalView={() => handleModalViewSupplies('Categoria-Agregar')}
                                            row={isSelectedRow}
                                            route="/Administration/Index/Supplies/Supply/Categories/Add"
                                        />
                                        <Search_Bar_Button_Edit
                                            onHandleModalView={() => handleModalViewSupplies('Categoria-Editar')}
                                            row={isSelectedRow}
                                            route="/Administration/Index/Supplies/Supply/Categories/Edit"
                                        />
                                    </>
                                ):(
                                    <></>
                                )}
                                {isLoggedPermissions.superadministrador || isLoggedType === 'Chef' ? (
                                    <Search_Bar_Button_Delete
                                        onHandleModalView={() => handleModalViewSupplies('Categoria-Eliminar')}
                                        route="/Administration/Index/Supplies/Supply/Categories/Delete"
                                        row={isSelectedRow}
                                    />
                                ):(
                                    <></>
                                )}
                            </>
                        ):(
                            <></>
                        )}
                        {currentSView === 'Insumos' && currentNView === 'Tipos de insumo' ? (
                            <>
                                {isLoggedType === 'Chef' || isLoggedType === 'Almacenista' ? (
                                    <>
                                        <Search_Bar_Button_Add
                                            onHandleModalView={() => handleModalViewSupplies('Tipo-Insumo-Agregar')}
                                            route="/Administration/Index/Supplies/Supply/Types/Add"
                                            row={isSelectedRow}
                                        />
                                        <Search_Bar_Button_Edit
                                            onHandleModalView={() => handleModalViewSupplies('Tipo-Insumo-Editar')}
                                            route="/Administration/Index/Supplies/Supply/Types/Edit"
                                            row={isSelectedRow}
                                        />
                                    </>
                                ):(
                                    <></>
                                )}
                                {isLoggedPermissions.superadministrador || isLoggedType === 'Chef' ? (
                                    <Search_Bar_Button_Delete
                                        onHandleModalView={() => handleModalViewSupplies('Tipo-Insumo-Eliminar')}
                                        route="/Administration/Index/Supplies/Supply/Types/Delete"
                                        row={isSelectedRow}
                                    />
                                ):(
                                    <></>
                                )}
                                {isLoggedType === 'Chef' || isLoggedType === 'Almacenista' ? (
                                    <Search_Bar_Button_Add
                                        title="Agregar cantidades"
                                        row={isSelectedRow}
                                        icon={<MdAddBox/>}
                                        route="/Administration/Index/Supplies/Supply/Types/Count/Add"
                                        onHandleModalView={() => handleModalViewSupplies('Tipo-Insumo-Cantidad-Agregar')}
                                        mode={true}
                                    />
                                ):(
                                    <></>
                                )}
                                <Search_Bar_Button_Detail
                                    icon={<MdOutlineMessage/>}
                                    title="Detalles de tipo de insumo"
                                    route="/Administration/Index/Supplies/Supply/Types/Detail"
                                    row={isSelectedRow}
                                    onHandleModalView={() => handleModalViewSupplies('Tipo-Insumo-Detalles')}
                                />
                            </>
                        ):(
                            <></>
                        )}
                        {currentSView === 'Insumos' && currentNView === 'Insumos' ? (
                            <>
                                {isLoggedType === 'Chef' || isLoggedType === 'Almacenista' ? (
                                    <>
                                        <Search_Bar_Button_Add
                                            row={isSelectedRow}
                                            route="/Administration/Index/Supplies/Supplies/Add"
                                            onHandleModalView={() => handleModalViewSupplies('Insumo-Agregar')}
                                        />
                                        <Search_Bar_Button_Edit
                                            row={isSelectedRow}
                                            route="/Administration/Index/Supplies/Supplies/Edit"
                                            onHandleModalView={() => handleModalViewSupplies('Insumo-Editar')}
                                        />
                                    </>
                                ):(
                                    <></>
                                )}
                                {isLoggedPermissions.superadministrador || isLoggedType === 'Chef' ? (
                                    <Search_Bar_Button_Delete
                                        row={isSelectedRow}
                                        route="/Administration/Index/Supplies/Supplies/Delete"
                                        onHandleModalView={() => handleModalViewSupplies('Insumo-Eliminar')}
                                    />
                                ):(
                                    <></>
                                )}
                                <Search_Bar_Button_Detail
                                    icon={<MdOutlineMessage/>}
                                    title="Detalles de insumo"
                                    route="/Administration/Index/Supplies/Supplies/Detail"
                                    row={isSelectedRow}
                                    onHandleModalView={() => handleModalViewSupplies('Insumo-Detalles')}
                                />
                            </>
                        ):(
                            <></>
                        )}


                        {currentSView === 'Inventario' && currentNView === 'Pedidos de insumo' ? (
                            <>
                                {isLoggedType === 'Chef' || isLoggedType === 'Almacenista' ? (
                                    isSelectedRow !== null ? (
                                        <>
                                            {isSelectedRow.insumos.estado !== 'Finalizado' ? (
                                                <>
                                                    <Tooltip title='Ver observaciones' placement="top">
                                                        <Button_Icon_Green_60 ref={Button_View_Supply_Order_Observations} ThemeMode={themeMode} className={isSelectedRow === null ? 'fade-button-in':'fade-button-out'}
                                                        onClick={() => {
                                                            handleModalViewWarehouse('Observaciones-Pedido-Visualizar');
                                                            navigate('/Administration/Index/Warehouse/Supply/Orders/Observation/View',{ replace: true });
                                                        }}>
                                                            <Icon_16><BiSolidMessageDetail/></Icon_16>
                                                        </Button_Icon_Green_60>
                                                    </Tooltip> 
                                                    <Tooltip title='Agregar observación' placement="top">
                                                        <Button_Icon_Green_60 ref={Button_Add_Supply_Order_Observations} ThemeMode={themeMode} className={isSelectedRow === null ? 'fade-button-in':'fade-button-out'}
                                                        onClick={() => {
                                                            handleModalViewWarehouse('Observacion-Pedido-Agregar');
                                                            navigate('/Administration/Index/Warehouse/Supply/Orders/Observation/Add',{ replace: true });
                                                        }}>
                                                            <Icon_16><BiSolidMessageAdd/></Icon_16>
                                                        </Button_Icon_Green_60>
                                                    </Tooltip> 
                                                    <Tooltip title='Editar' placement="top">
                                                        <Button_Icon_Blue_60 ref={Button_Edit_Supply_Orders} ThemeMode={themeMode} className={isSelectedRow !== null ? 'fade-button-in':'fade-button-out'}
                                                        onClick={() => {
                                                            handleModalViewWarehouse('Pedido-Editar');
                                                            navigate('/Administration/Index/Warehouse/Supply/Orders/Edit',{ replace: true });
                                                        }}>
                                                            <Icon_16><MdEdit/></Icon_16>
                                                        </Button_Icon_Blue_60>
                                                    </Tooltip> 
                                                    <Tooltip title='Finalizar' placement="top">
                                                        <Button_Icon_Orange_60 ref={Button_Edit_State_Supply_Orders} ThemeMode={themeMode} className={isSelectedRow !== null ? 'fade-button-in':'fade-button-out'}
                                                        onClick={() => {
                                                            handleModalViewWarehouse('Pedido-Editar-Estado');
                                                            navigate('/Administration/Index/Warehouse/Supply/Orders/State/Edit',{ replace: true });
                                                        }}>
                                                            <Icon_16><FaSyncAlt/></Icon_16>
                                                        </Button_Icon_Orange_60>
                                                    </Tooltip>
                                                </>
                                            ):(
                                                <></>
                                            )}
                                        </>
                                    ):(
                                        <>
                                            <Tooltip title='Agregar' placement="top">
                                                <Button_Icon_Green_60 ThemeMode={themeMode} className={isSelectedRow === null ? 'fade-button-in':'fade-button-out'}
                                                onClick={() => {
                                                    handleModalViewWarehouse('Pedido-Agregar');
                                                    navigate('/Administration/Index/Warehouse/Supply/Orders/Add',{ replace: true });
                                                }}>
                                                    <Icon_16><IoIosAddCircle/></Icon_16>
                                                </Button_Icon_Green_60>
                                            </Tooltip>
                                        </>
                                    )
                                ):(
                                    <></>
                                )}
                                {isLoggedPermissions.superadministrador || isLoggedType === 'Chef' ? (
                                    isSelectedRow !== null && isSelectedRow.insumos.estado !== 'Finalizado' ? (
                                        <>
                                            <Tooltip title='Eliminar' placement="top">
                                                <Button_Icon_Red_60 ref={Button_Delete_Supply_Orders} ThemeMode={themeMode} className={isSelectedRow !== null ? 'fade-button-in':'fade-button-out'}
                                                onClick={() => {
                                                    handleModalViewWarehouse('Pedido-Eliminar');
                                                    navigate('/Administration/Index/Warehouse/Supply/Orders/Delete',{ replace: true });
                                                }}>
                                                    <Icon_16><MdDelete/></Icon_16>
                                                </Button_Icon_Red_60>
                                            </Tooltip>
                                        </>
                                    ):(
                                        <></>
                                    )
                                ):(
                                    <></>
                                )}
                            </>
                        ):(
                            <></>
                        )}
                        {currentSView === 'Inventario' && currentNView === 'Compras' && isSelectedOptionOrderPlus !== 'Normal' ? (
                            ['General','Totales'].map((item,index) => (
                                <Text_Span_12_Center_White ThemeMode={themeMode} key={index}>
                                    <Input_Radio_20 ThemeMode={themeMode}
                                        type="radio"
                                        name="options"
                                        value={item}
                                        checked={isSelectedOptionOrderPlusUltra === item}
                                        onChange={(e) => setIsSelectedOptionOrderPlusUltra(e.target.value)}
                                    />
                                    {item}
                                </Text_Span_12_Center_White>
                            ))
                        ):(
                            <></>
                        )}
                        {currentSView === 'Inventario' && currentNView === 'Ventas' && isSelectedOptionOrderPlus !== 'Normal' ? (
                            ['General','Totales'].map((item,index) => (
                                <Text_Span_12_Center_White ThemeMode={themeMode} key={index}>
                                    <Input_Radio_20 ThemeMode={themeMode}
                                        type="radio"
                                        name="options"
                                        value={item}
                                        checked={isSelectedOptionOrderPlusUltra === item}
                                        onChange={(e) => setIsSelectedOptionOrderPlusUltra(e.target.value)}
                                    />
                                    {item}
                                </Text_Span_12_Center_White>
                            ))
                        ):(
                            <></>
                        )}
                        {currentSView === 'Inventario' && currentNView === 'Ventas' ? (
                            isLoggedType === 'Chef' || isLoggedPermissions.superadministrador ? (
                                isSelectedRow !== null ? (
                                    <></>
                                ):(
                                    <>
                                        <Tooltip title='Agregar' placement="top">
                                            <Button_Icon_Green_60 ThemeMode={themeMode} className={isSelectedRow === null ? 'fade-button-in':'fade-button-out'}
                                            onClick={() => {
                                                handleModalViewWarehouse('Almacen-Tipo-Insumo-Agregar');
                                                navigate('/Administration/Index/Warehouse/Sales/Add',{ replace: true });
                                            }}>
                                                <Icon_16><IoIosAddCircle/></Icon_16>
                                            </Button_Icon_Green_60>
                                        </Tooltip>
                                    </>
                                )
                            ):(
                                <></>
                            )
                        ):(
                            <></>
                        )}

                        {currentSView === 'Menus' && currentNView === 'Menus' ? (
                            <>
                                {isLoggedType === 'Chef' || isLoggedType === 'Almacenista' ? (
                                    <>
                                        <Search_Bar_Button_Add
                                            row={isSelectedRow}
                                            route="/Administration/Index/Menus/Menus/Add"
                                            onHandleModalView={() => handleModalViewMenuTypes('Tipo-Menu-Agregar')}
                                        />
                                        <Search_Bar_Button_Edit
                                            row={isSelectedRow}
                                            route="/Administration/Index/Menus/Menus/Edit"
                                            onHandleModalView={() => handleModalViewMenuTypes('Tipo-Menu-Editar')}
                                        />
                                    </>
                                ):(
                                    <></>
                                )}
                                {isLoggedPermissions.superadministrador || isLoggedType === 'Chef' ? (
                                    <Search_Bar_Button_Delete
                                        row={isSelectedRow}
                                        route="/Administration/Index/Menus/Menus/Delete"
                                        onHandleModalView={() => handleModalViewMenuTypes('Tipo-Menu-Eliminar')}
                                    />
                                ):(
                                    <></>
                                )}
                            </>
                        ):(
                            <></>
                        )}
                    </Container_Searchbar_Row_Function>
                </Container_Searchbar_Row_General>
            </Container_Searchbar_Row_General_Black>
        </>
    );
}