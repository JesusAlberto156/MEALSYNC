//____________IMPORT/EXPORT____________
// Hooks de React
import { useContext,useEffect } from "react";
// Contextos
import { NavbarViewContext,SidebarViewContext } from "../../../contexts/ViewsProvider";
import { ActionBlockContext,KeyboardViewContext,KeyboardContext,TouchContext } from "../../../contexts/VariablesProvider";
import { SearchTermContext } from "../../../contexts/SearchsProvider";
import { TextFieldsSearchDateContext,TextFieldsSearchOrdersContext } from "../../../contexts/FormsProvider";
import { SelectedRowContext,SelectedOptionSearchContext,SelectedOptionOrderPlusContext,SelectedOptionOrderPlusUltraContext } from "../../../contexts/SelectedesProvider";
import { LoggedPermissionsContext,LoggedTypeContext } from "../../../contexts/SessionProvider";
import { UsersViewPasswordContext } from "../../../contexts/UsersProvider";
import { RefKeyboardContext,RefKeyboardTouchContext } from "../../../contexts/RefsProvider";
// Hooks personalizados
import { HandleModalViewUsers } from "../../../hooks/users/Views";
import { HandleViewPassword } from "../../../hooks/users/Forms";
import { HandleModalViewSuppliers } from "../../../hooks/suppliers/Views";
import { HandleModalViewSupplies } from "../../../hooks/supplies/Views";
import { HandleModalViewExtras } from "../../../hooks/extras/Views";
import { HandleModalViewMenuTypes } from "../../../hooks/menus/Views";
import { HandleModalViewWarehouse } from "../../../hooks/warehouse/Views";
import { HandleKeyboard } from "../../../hooks/Views";
import { HandleWarehouseOrderStart } from "../../../hooks/warehouse/Forms";
import { HandleModalViewOrderKitchen } from "../../../hooks/orders/Views";
//__________ICONOS__________
// Icono para la seccion del buscador
import { IoSearch } from "react-icons/io5";
// Iconos para un crud
import { MdDelete } from "react-icons/md";
import { FaEye } from "react-icons/fa";
import { IoIosEyeOff } from "react-icons/io";
import { FaUnlock } from "react-icons/fa";
import { FaLock } from "react-icons/fa";
import { FaLockOpen } from "react-icons/fa";
import { FaUserTie } from "react-icons/fa6";
import { MdAddBox } from "react-icons/md";
import { MdOutlineMessage } from "react-icons/md";
import { MdOutlineShoppingCartCheckout } from "react-icons/md";
//__________ICONOS__________
// Estilos personalizados
import { Container_Searchbar_Row_General_Black,Container_Searchbar_Row_General,Container_Searchbar_Row_Search_Blue,Container_Searchbar_Row_Function, Container_Row_100_Center } from "../../styled/Containers";
import { Icon_White_20 } from "../../styled/Icons";
import { Input_Search_Table_White,Input_Radio_20 } from "../../styled/Inputs";
import { Label_Button_16_White } from "../../styled/Labels";
import { Text_Title_20_White,Text_Background_Green_12,Text_Title_16_White,Text_Background_Yellow_12,Text_Background_Red_12 } from "../../styled/Text";
// Componentes personalizados
import { Search_Bar_Button_Search,Search_Bar_Button_Order,Search_Bar_Button_End_Condition,Search_Bar_Icon_Button_Order,Search_Bar_Icon_Button_Search,Search_Bar_Icon_Button_Search_Order,Search_Bar_Button_Verification_Green_Download } from "./Buttons";
import { Search_Bar_Button_Add,Search_Bar_Button_Verification_Blue,Search_Bar_Button_Verification_Red,Search_Bar_Button_Edit,Search_Bar_Button_Verification_Green,Search_Bar_Button_Delete,Search_Bar_Button_Enable,Search_Bar_Button_View,Search_Bar_Button_Detail } from "./Buttons";
import { Keyboard_Form_Search } from "../../keyboards/Form";
//____________IMPORT/EXPORT____________

// Componente para buscar elementos o acciones en las tablas
export default function Search_Bar (){
    // Constantes con el valor de los contextos
    const [isActionBlock] = useContext(ActionBlockContext);
    const [currentNView] = useContext(NavbarViewContext);
    const [currentSView] = useContext(SidebarViewContext);
    const [isSearchTerm,setIsSearchTerm] = useContext(SearchTermContext);
    const [isSelectedRow] = useContext(SelectedRowContext);
    const [isLoggedPermissions] = useContext(LoggedPermissionsContext);
    const [isUsersViewPassword] = useContext(UsersViewPasswordContext);
    const [isLoggedType] = useContext(LoggedTypeContext);
    const [isSelectedOptionSearch] = useContext(SelectedOptionSearchContext);
    const [isSelectedOptionOrderPlus,setIsSelectedOptionOrderPlus] = useContext(SelectedOptionOrderPlusContext);
    const [isSelectedOptionOrderPlusUltra,setIsSelectedOptionOrderPlusUltra] = useContext(SelectedOptionOrderPlusUltraContext);
    const [isTextFieldsSearchDate,setIsTextFieldsSearchDate] = useContext(TextFieldsSearchDateContext);
    const [isKeyboard,setIsKeyboard] = useContext(KeyboardContext);
    const [isKeyboardView,setIsKeyboardView] = useContext(KeyboardViewContext);
    const Keyboard = useContext(RefKeyboardContext);
    const isKeyboardTouch = useContext(RefKeyboardTouchContext);
    const [isTextFieldsSearchOrders,setIsTextFieldsSearchOrders] = useContext(TextFieldsSearchOrdersContext);
    const [isTouch] = useContext(TouchContext);
    // Constante con las opciones de los buscadores
    const isOptionUsers = ['General','Nombre','Nombre corto','Usuario','Tipo de usuario'];
    const isOptionStatusSearch = ['General','Nombre','Usuario'];
    const isOptionStatus = ['Normal','Activo','Inactivo'];
    const isOptionSuppliers = ['General','Nombre','RFC','Domicilio','Teléfono','Correo'];
    const isOptionSupplierObservations = ['General','Proveedor','Fecha','Calificación','ID Pedido'];
    const isOptionSupplyTypes = ['General','Nombre','Unidad','Categoría','Cantidad Mínima'];
    const isOptionSupplies = ['General','Código','Nombre','Proveedor','Categoría','Tipo','Cantidad'];
    const isOptionCleaningTypes = ['General','Nombre','Unidad','Categoría','Cantidad Mínima'];
    const isOptionCleaningSupplies = ['General','Código','Nombre','Proveedor','Categoría','Cantidad'];
    const isOptionOrders = ['General','ID Pedido','Fecha','Campus','Estado','Proveedor','Usuario','Precio Total'];
    const isOptionWarehouse = ['Nombre','Fecha'];
    const isOptionWarehouseViewPurchases = ['Insumos','Suministros','Gastos fijos'];
    const isOptionWarehouseViewSales = ['Insumos','Suministros'];
    const isOptionWarehouseReports = ['Categorías de insumos','Categorías de limpieza','Gastos fijos'];
    const isOptionsMaelSearch = ['General','Nombre','Tiempo de preparación','Precio','Menú'];
    const isOptionsMaelOrder = ['Normal','Desayuno','Comida','Cena'];
    const isOptionsOrder = ['Platillos','Guarniciones','Bebidas'];
    // Constantes con la funcionalidad de los hooks
    const handleModalViewUsers = HandleModalViewUsers();
    const handleViewPassword = HandleViewPassword();
    const handleModalViewSuppliers = HandleModalViewSuppliers();
    const handleModalViewSupplies = HandleModalViewSupplies();
    const handleModalViewExtras = HandleModalViewExtras();
    const handleModalViewMenuTypes = HandleModalViewMenuTypes();
    const handleModalViewWarehouse = HandleModalViewWarehouse();
    const { KeyboardView,KeyboardClick } = HandleKeyboard();
    const handleWarehouseOrderStart = HandleWarehouseOrderStart();
    const handleModalViewOrderKitchen = HandleModalViewOrderKitchen();
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
    useEffect(() => {
        if(currentNView === 'Reportes'){
            setIsTextFieldsSearchDate(prev => ({
                ...prev,
                año: new Date().getFullYear(),
                mes: new Date().getMonth() + 1,
            }))
        }
    },[currentNView])
    // useEffect para definir la hora del sistema 
    useEffect(() => {
        if (!isTextFieldsSearchOrders.fecha) return;

        const currentHour = new Date(isTextFieldsSearchOrders.fecha).getHours();

        if (currentHour >= 4 && currentHour < 12) {
            setIsTextFieldsSearchOrders(prev => ({
                ...prev,
                tiempo: 'Desayuno',
            }));
        } else if (currentHour >= 12 && currentHour < 20) {
            setIsTextFieldsSearchOrders(prev => ({
                ...prev,
                tiempo: 'Comida',
            }));
        } else {
            setIsTextFieldsSearchOrders(prev => ({
                ...prev,
                tiempo: 'Cena',
            }));
        }
    },[isTextFieldsSearchOrders.fecha]);
    // useEffect para cargar los platillos en los pedidos
    useEffect(() => {
        if(currentSView === 'Pedidos'){
            setIsSelectedOptionOrderPlus('Platillos');
        }
    },[]);
    // Estructura del componente
    return(
        <>
            <Container_Searchbar_Row_General_Black>
                <Container_Searchbar_Row_General>
                    {currentSView === 'Inventario' && currentNView === 'Compras' || currentNView === 'Ventas' || currentNView === 'Reportes' ? (
                        <></>
                    ):(
                        <>
                            <Icon_White_20><IoSearch/></Icon_White_20>
                            <Input_Search_Table_White
                                className="Input-Buscador"
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
                    {currentSView === 'Extras' && currentNView === 'Categorias de limpieza' ? (
                        <Search_Bar_Icon_Button_Search_Order/>
                    ):(
                        <></>
                    )}
                    {currentSView === 'Extras' && currentNView === 'Tipos de limpieza' ? (
                        <Container_Searchbar_Row_Search_Blue>
                            <Search_Bar_Button_Search
                                options={isOptionCleaningTypes}
                            />
                            <Search_Bar_Icon_Button_Search_Order/>
                        </Container_Searchbar_Row_Search_Blue>
                    ):(
                        <></>
                    )}
                    {currentSView === 'Extras' && currentNView === 'Suministros de limpieza' ? (
                        <Container_Searchbar_Row_Search_Blue>
                            <Search_Bar_Button_Search
                                options={isOptionCleaningSupplies}
                            />
                            <Search_Bar_Icon_Button_Search_Order/>
                        </Container_Searchbar_Row_Search_Blue>
                    ):(
                        <></>
                    )}
                    {currentSView === 'Extras' && currentNView === 'Gastos fijos' ? (
                        <Search_Bar_Icon_Button_Search_Order/>
                    ):(
                        <></>
                    )}
                    {currentSView === 'Inventario' && currentNView === 'Pedidos de almacen' ? (
                        <Container_Searchbar_Row_Search_Blue>
                            <Search_Bar_Button_Search
                                options={isOptionOrders}
                            /> 
                            <Search_Bar_Icon_Button_Search_Order/>
                        </Container_Searchbar_Row_Search_Blue>
                    ):(
                        <></>
                    )}
                    {currentSView === 'Inventario' && currentNView === 'Compras' ? (
                        <Container_Searchbar_Row_Search_Blue>
                            <Search_Bar_Button_Search
                                options={isOptionWarehouse}
                            />
                            <Search_Bar_Icon_Button_Search/>
                            <Search_Bar_Button_Order
                                options={isOptionWarehouseViewPurchases}
                            />
                            <Search_Bar_Icon_Button_Order/>
                        </Container_Searchbar_Row_Search_Blue>
                    ):(
                        <></>
                    )}
                    {currentSView === 'Inventario' && currentNView === 'Ventas' ? (
                        <Container_Searchbar_Row_Search_Blue>
                            <Search_Bar_Button_Search
                                options={isOptionWarehouse}
                            />
                            <Search_Bar_Icon_Button_Search/>
                            <Search_Bar_Button_Order
                                options={isOptionWarehouseViewSales}
                            />
                            <Search_Bar_Icon_Button_Order/>
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
                    {currentSView === 'Inventario' && currentNView === 'Reportes' ? (
                        <Container_Searchbar_Row_Search_Blue>
                            <Text_Title_20_White>
                                REPORTE DE INVENTARIOS Y COSTOS DEL MES DE 
                            </Text_Title_20_White>
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
                            <Text_Title_20_White>
                                DEL 
                            </Text_Title_20_White>
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
                            <Search_Bar_Icon_Button_Search/>
                            <Search_Bar_Button_Order
                                options={isOptionWarehouseReports}
                            />
                            <Search_Bar_Icon_Button_Order/>
                        </Container_Searchbar_Row_Search_Blue>
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
                    {currentSView === 'Menus' && currentNView === 'Guarniciones' ? (
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
                    {currentSView === 'Menus' && currentNView === 'Bebidas' ? (
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
                    {currentSView === 'Pedidos' ? (
                        <Container_Searchbar_Row_Search_Blue>
                            <Search_Bar_Icon_Button_Search/>
                            <Text_Title_16_White>Tiempo de </Text_Title_16_White>
                            {isTextFieldsSearchOrders.tiempo === 'Desayuno' ? (
                                <Text_Background_Red_12>{isTextFieldsSearchOrders?.tiempo.toUpperCase() || 'DESCONOCIDO'}</Text_Background_Red_12>
                            ):(
                                <></>
                            )}
                            {isTextFieldsSearchOrders.tiempo === 'Comida' ? (
                                <Text_Background_Yellow_12>{isTextFieldsSearchOrders?.tiempo.toUpperCase() || 'DESCONOCIDO'}</Text_Background_Yellow_12>
                            ):(
                                <></>
                            )}
                            {isTextFieldsSearchOrders.tiempo === 'Cena' ? (
                                <Text_Background_Green_12>{isTextFieldsSearchOrders?.tiempo.toUpperCase() || 'DESCONOCIDO'}</Text_Background_Green_12>
                            ):(
                                <></>
                            )}
                            <Search_Bar_Button_Order
                                options={isOptionsOrder}
                            />
                        </Container_Searchbar_Row_Search_Blue>
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
                        {currentSView === 'Extras' && currentNView === 'Categorias de limpieza' ? (
                            <>
                                {isLoggedType === 'Chef' || isLoggedType === 'Almacenista' ? (
                                    <>
                                        <Search_Bar_Button_Add
                                            row={isSelectedRow}
                                            route="/Administration/Index/Extras/Cleaning/Categories/Add"
                                            onHandleModalView={() => handleModalViewExtras('Categoria-Limpieza-Agregar')}
                                        />
                                        <Search_Bar_Button_Edit
                                            row={isSelectedRow}
                                            route="/Administration/Index/Extras/Cleaning/Categories/Edit"
                                            onHandleModalView={() => handleModalViewExtras('Categoria-Limpieza-Editar')}
                                        />
                                    </>
                                ):(
                                    <></>
                                )}
                                {isLoggedPermissions.superadministrador || isLoggedType === 'Chef' ? (
                                    <Search_Bar_Button_Delete
                                        row={isSelectedRow}
                                        route="/Administration/Index/Extras/Cleaning/Categories/Delete"
                                        onHandleModalView={() => handleModalViewExtras('Categoria-Limpieza-Eliminar')}
                                    />
                                ):(
                                    <></>
                                )}
                            </>
                        ):(
                            <></>
                        )}
                        {currentSView === 'Extras' && currentNView === 'Tipos de limpieza' ? (
                            <>
                                {isLoggedType === 'Chef' || isLoggedType === 'Almacenista' ? (
                                    <>
                                        <Search_Bar_Button_Add
                                            row={isSelectedRow}
                                            route="/Administration/Index/Extras/Cleaning/Types/Add"
                                            onHandleModalView={() => handleModalViewExtras('Tipo-Limpieza-Agregar')}
                                        />
                                        <Search_Bar_Button_Edit
                                            row={isSelectedRow}
                                            route="/Administration/Index/Extras/Cleaning/Types/Edit"
                                            onHandleModalView={() => handleModalViewExtras('Tipo-Limpieza-Editar')}
                                        />
                                    </>
                                ):(
                                    <></>
                                )}
                                {isLoggedPermissions.superadministrador || isLoggedType === 'Chef' ? (
                                    <Search_Bar_Button_Delete
                                        row={isSelectedRow}
                                        route="/Administration/Index/Extras/Cleaning/Types/Delete"
                                        onHandleModalView={() => handleModalViewExtras('Tipo-Limpieza-Eliminar')}
                                    />
                                ):(
                                    <></>
                                )}
                                {isLoggedType === 'Chef' || isLoggedType === 'Almacenista' ? (
                                    <Search_Bar_Button_Add
                                        title="Agregar cantidades"
                                        row={isSelectedRow}
                                        icon={<MdAddBox/>}
                                        route="/Administration/Index/Extras/Cleaning/Types/Count/Add"
                                        onHandleModalView={() => handleModalViewExtras('Tipo-Limpieza-Cantidad-Agregar')}
                                        mode={true}
                                    />
                                ):(
                                    <></>
                                )}
                                <Search_Bar_Button_Detail
                                    icon={<MdOutlineMessage/>}
                                    title="Detalles de tipo de limpieza"
                                    route="/Administration/Index/Extras/Cleaning/Types/Detail"
                                    row={isSelectedRow}
                                    onHandleModalView={() => handleModalViewExtras('Tipo-Limpieza-Detalles')}
                                />
                            </>
                        ):(
                            <></>
                        )}
                        {currentSView === 'Extras' && currentNView === 'Suministros de limpieza' ? (
                            <>
                                {isLoggedType === 'Chef' || isLoggedType === 'Almacenista' ? (
                                    <>
                                        <Search_Bar_Button_Add
                                            row={isSelectedRow}
                                            route="/Administration/Index/Extras/Cleaning/Supplies/Add"
                                            onHandleModalView={() => handleModalViewExtras('Suministro-Limpieza-Agregar')}
                                        />
                                        <Search_Bar_Button_Edit
                                            row={isSelectedRow}
                                            route="/Administration/Index/Extras/Cleaning/Supplies/Edit"
                                            onHandleModalView={() => handleModalViewExtras('Suministro-Limpieza-Editar')}
                                        />
                                    </>
                                ):(
                                    <></>
                                )}
                                {isLoggedPermissions.superadministrador || isLoggedType === 'Chef' ? (
                                    <Search_Bar_Button_Delete
                                        row={isSelectedRow}
                                        route="/Administration/Index/Extras/Cleaning/Supplies/Delete"
                                        onHandleModalView={() => handleModalViewExtras('Suministro-Limpieza-Eliminar')}
                                    />
                                ):(
                                    <></>
                                )}
                                <Search_Bar_Button_Detail
                                    icon={<MdOutlineMessage/>}
                                    title="Detalles de suministro de limpieza"
                                    route="/Administration/Index/Extras/Cleaning/Supplies/Detail"
                                    row={isSelectedRow}
                                    onHandleModalView={() => handleModalViewExtras('Suministro-Limpieza-Detalles')}
                                />
                            </>
                        ):(
                            <></>
                        )}
                        {currentSView === 'Extras' && currentNView === 'Gastos fijos' ? (
                            <>
                                {isLoggedType === 'Chef' || isLoggedType === 'Almacenista' ? (
                                    <>
                                        <Search_Bar_Button_Add
                                            row={isSelectedRow}
                                            route="/Administration/Index/Extras/Fixed/Expenses/Add"
                                            onHandleModalView={() => handleModalViewExtras('Gasto-Fijo-Agregar')}
                                        />
                                        <Search_Bar_Button_Edit
                                            row={isSelectedRow}
                                            route="/Administration/Index/Extras/Fixed/Expenses/Edit"
                                            onHandleModalView={() => handleModalViewExtras('Gasto-Fijo-Editar')}
                                        />
                                    </>
                                ):(
                                    <></>
                                )}
                                {isLoggedPermissions.superadministrador || isLoggedType === 'Chef' ? (
                                    <Search_Bar_Button_Delete
                                        row={isSelectedRow}
                                        route="/Administration/Index/Extras/Fixed/Expenses/Delete"
                                        onHandleModalView={() => handleModalViewExtras('Gasto-Fijo-Eliminar')}
                                    />
                                ):(
                                    <></>
                                )}
                            </>
                        ):(
                            <></>
                        )}
                        {currentSView === 'Inventario' && currentNView === 'Pedidos de almacen' ? (
                            <>
                                {isLoggedType === 'Almacenista' ? (
                                    <>
                                        <Search_Bar_Button_Add
                                            row={isSelectedRow}
                                            route="/Administration/Index/Warehouse/Orders/Add"
                                            onHandleModalView={() => handleModalViewWarehouse('Pedido-Almacen-Agregar')}
                                        />
                                    </>
                                ):(
                                    <></>
                                )}
                                {isLoggedPermissions.superadministrador || isLoggedType === 'Chef' || isLoggedType === 'Almacenista' ? (
                                    <Search_Bar_Button_Verification_Red
                                            title="Eliminar"
                                            icon={<MdDelete/>}
                                            row={isSelectedRow}
                                            route="/Administration/Index/Warehouse/Orders/Delete"
                                            onHandleAction={() => handleModalViewWarehouse('Pedido-Almacen-Eliminar')}
                                            condition={isSelectedRow?.estado === 'Solicitud'}
                                        />
                                ):(
                                    <></>
                                )}
                                {isLoggedType === 'Almacenista' ? (
                                    <>
                                        <Search_Bar_Button_Verification_Blue
                                            title="Editar revisión"
                                            row={isSelectedRow}
                                            route="/Administration/Index/Warehouse/Orders/Verification/Edit"
                                            onHandleAction={() => handleModalViewWarehouse('Pedido-Almacen-Verificacion-Editar')}
                                            condition={isSelectedRow?.estado === 'Rechazado'}
                                        />
                                        <Search_Bar_Button_Verification_Green_Download
                                            title="Iniciar operación"
                                            row={isSelectedRow}
                                            onHandleAction={() => handleWarehouseOrderStart()}
                                            condition={isSelectedRow?.estado === 'Aceptado'}
                                        />
                                        <Search_Bar_Button_End_Condition
                                            title="Finalizar operación"
                                            row={isSelectedRow}
                                            route="/Administration/Index/Warehouse/Orders/End"
                                            onHandleAction={() => handleModalViewWarehouse('Pedido-Almacen-Finalizar')}
                                            condition={isSelectedRow?.estado === 'En curso'}
                                        />
                                    </>
                                ):(
                                    <></>
                                )}
                                {isLoggedType === 'Chef' ? (
                                    <Search_Bar_Button_Verification_Green
                                        title="Agregar revisión"
                                        row={isSelectedRow}
                                        route="/Administration/Index/Warehouse/Orders/Verification/Add"
                                        onHandleAction={() => handleModalViewWarehouse('Pedido-Almacen-Verificacion-Agregar')}
                                        condition={isSelectedRow?.estado === 'Solicitud'}
                                    />
                                ):(
                                    <></>
                                )}
                                <Search_Bar_Button_Detail
                                    icon={<MdOutlineMessage/>}
                                    title="Detalles de pedido de almacén"
                                    route="/Administration/Index/Warehouse/Orders/Detail"
                                    row={isSelectedRow}
                                    onHandleModalView={() => handleModalViewExtras('Pedido-Almacen-Detalles')}
                                />
                            </>
                        ):(
                            <></>
                        )}
                        {currentSView === 'Inventario' && (currentNView === 'Compras' || currentNView === 'Ventas') ? (
                            <Container_Row_100_Center>
                                {['General','Totales',].map((item,index) => (
                                    <Label_Button_16_White 
                                        Disabled={isActionBlock}
                                        key={index}
                                    >
                                        <Input_Radio_20
                                            type="radio"
                                            name={'options'}
                                            disabled={isActionBlock}
                                            value={item}
                                            checked={isSelectedOptionOrderPlusUltra === item}
                                            onChange={(e) => setIsSelectedOptionOrderPlusUltra(e.target.value)}
                                        />
                                        {item}
                                    </Label_Button_16_White>
                                ))}
                            </Container_Row_100_Center>
                        ):(
                            <></>
                        )}
                        {currentSView === 'Inventario' && currentNView === 'Compras' && isSelectedOptionOrderPlus === 'Gastos fijos' ? (
                            isLoggedType === 'Chef' || isLoggedPermissions.superadministrador ? (
                                <Search_Bar_Button_Add
                                    row={isSelectedRow}
                                    route="/Administration/Index/Warehouse/Purchases/Fixed/Expanses/Add"
                                    onHandleModalView={() => handleModalViewWarehouse('Almacen-Compra-Gasto-Fijo-Agregar')}
                                />
                            ):(
                                <></>
                            )
                        ):(
                            <></>
                        )}
                        {currentSView === 'Inventario' && currentNView === 'Ventas' && isSelectedOptionOrderPlus === 'Insumos' ? (
                            isLoggedType === 'Chef' || isLoggedPermissions.superadministrador ? (
                                <Search_Bar_Button_Add
                                    row={isSelectedRow}
                                    route="/Administration/Index/Warehouse/Sales/Supplies/Add"
                                    onHandleModalView={() => handleModalViewWarehouse('Almacen-Venta-Insumo-Agregar')}
                                />
                            ):(
                                <></>
                            )
                        ):(
                            <></>
                        )}
                        {currentSView === 'Inventario' && currentNView === 'Ventas' && isSelectedOptionOrderPlus === 'Suministros' ? (
                            isLoggedType === 'Chef' || isLoggedPermissions.superadministrador ? (
                                <Search_Bar_Button_Add
                                    row={isSelectedRow}
                                    route="/Administration/Index/Warehouse/Sales/Cleaning/Supplies/Add"
                                    onHandleModalView={() => handleModalViewExtras('Almacen-Venta-Suministro-Agregar')}
                                />
                            ):(
                                <></>
                            )
                        ):(
                            <></>
                        )}
                        {currentSView === 'Menus' && currentNView === 'Menus' ? (
                            <>
                                {isLoggedType === 'Chef' || isLoggedType === 'Nutriólogo' ? (
                                    <>
                                        <Search_Bar_Button_Add
                                            row={isSelectedRow}
                                            route={isLoggedType === 'Nutriólogo' ? "/Kitchen/Index/Menus/Menus/Add" : "/Administration/Index/Menus/Menus/Add"}
                                            onHandleModalView={() => handleModalViewMenuTypes('Tipo-Menu-Agregar')}
                                        />
                                        <Search_Bar_Button_Edit
                                            row={isSelectedRow}
                                            route={isLoggedType === 'Nutriólogo' ? "/Kitchen/Index/Menus/Menus/Edit" : "/Administration/Index/Menus/Menus/Edit"}
                                            onHandleModalView={() => handleModalViewMenuTypes('Tipo-Menu-Editar')}
                                        />
                                    </>
                                ):(
                                    <></>
                                )}
                                {isLoggedType === 'Chef' || (isLoggedPermissions.superadministrador && isLoggedType !== 'Nutriólogo') ? (
                                    <Search_Bar_Button_Delete
                                        row={isSelectedRow}
                                        route={isLoggedType === 'Nutriólogo' ? "/Kitchen/Index/Menus/Menus/Delete" : "/Administration/Index/Menus/Menus/Delete"}
                                        onHandleModalView={() => handleModalViewMenuTypes('Tipo-Menu-Eliminar')}
                                    />
                                ):(
                                    <></>
                                )}
                            </>
                        ):(
                            <></>
                        )}
                        {currentSView === 'Pedidos' ? (
                            <>
                                {isLoggedType === 'Cocinero' ? (
                                    <Search_Bar_Button_Add
                                        row={isSelectedRow}
                                        icon={<MdOutlineShoppingCartCheckout/>}
                                        route="/Kitchen/Index/Orders/Kitchen/Add"
                                        onHandleModalView={() => handleModalViewOrderKitchen('Pedido-Cocina-Agregar')}
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
                <Keyboard_Form_Search/>
            </Container_Searchbar_Row_General_Black>
        </>
    );
}