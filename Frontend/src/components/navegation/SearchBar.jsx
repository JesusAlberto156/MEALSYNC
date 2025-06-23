//____________IMPORT/EXPORT____________
// Hooks de React
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
// Componentes de React externos
import { Tooltip } from "@mui/material";
// Contextos
import { ThemeModeContext,NavbarViewContext,SidebarViewContext } from "../../contexts/ViewsProvider";
import { SearchTermContext } from "../../contexts/SearchsProvider";
import { SelectedRowContext,SelectedOptionSearchContext,SelectedOptionOrderPlusContext } from "../../contexts/SelectedesProvider";
import { LoggedPermissionsContext,LoggedTypeContext } from "../../contexts/SessionProvider";
import { UsersViewPasswordContext } from "../../contexts/UsersProvider";
import { RefUsersContext,RefPermissionsContext,RefStatusContext,RefSuppliersContext,RefSupplierObservationsContext,RefSupplyCategoriesContext,RefSupplyTypesContext,RefSuppliesContext,RefSupplyOrdersContext } from "../../contexts/RefsProvider";
// Hooks personalizados
import { HandleModalViewUsers } from "../../hooks/users/Views";
import { HandleViewPassword } from "../../hooks/users/Forms";
import { HandleModalViewSuppliers } from "../../hooks/suppliers/Views";
import { HandleModalViewWarehouse } from "../../hooks/warehouse/Views";
//__________ICONOS__________
// Icono para la seccion del buscador
import { FcSearch } from "react-icons/fc";
import { IoSearch } from "react-icons/io5";
import { FaShoppingCart } from "react-icons/fa";
import { LuArrowDownUp } from "react-icons/lu";
// Iconos para un crud
import { IoIosAddCircle } from "react-icons/io";
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { FaEye } from "react-icons/fa";
import { IoIosEyeOff } from "react-icons/io";
import { FaLock } from "react-icons/fa";
import { FaLockOpen } from "react-icons/fa";
import { FaUserTie } from "react-icons/fa6";
import { FaCubes } from "react-icons/fa6";
import { FaSyncAlt } from "react-icons/fa";
import { BiSolidMessageAdd } from "react-icons/bi";
import { BiSolidMessageDetail } from "react-icons/bi";
//__________ICONOS__________
// Estilos personalizados
import { Container_Row_100_Left,Container_Row_80_Right,Container_Row_Blue_Width_2000_Left } from "../styled/Containers";
import { Button_Icon_Green_60,Button_Icon_Blue_60,Button_Icon_Red_60,Button_Icon_Orange_60,Button_Icon_White_60,Button_Icon_Blue_140 } from "../styled/Buttons";
import { Icon_26,Icon_Button_Black_30,Icon_White_18,Icon_18 } from "../styled/Icons";
import { Input_Text_White_20 } from "../styled/Inputs";
import { Text_Span_12_Center } from "../styled/Text";
// Componentes personalizados

//____________IMPORT/EXPORT____________

// Componente para buscar elementos o acciones en las tablas
export default function Search_Bar (){
    // Constantes con el valor de los contextos
    const [themeMode] = useContext(ThemeModeContext);
    const [currentNView] = useContext(NavbarViewContext);
    const [currentSView] = useContext(SidebarViewContext);
    const [isSearchTerm,setIsSearchTerm] = useContext(SearchTermContext);
    const [isTypeUser] = useContext(LoggedTypeContext);
    const [isSelectedRow] = useContext(SelectedRowContext);
    const [isPermission] = useContext(LoggedPermissionsContext);
    const [isUsersViewPassword] = useContext(UsersViewPasswordContext);
    const [isLoggedType] = useContext(LoggedTypeContext);
    const {Modal_Users,Form_Users,Button_Edit_Users,Button_Delete_Users} = useContext(RefUsersContext);
    const {Modal_Permissions,Form_Permissions,Button_Edit_Permissions,Button_Enable_Permissions} = useContext(RefPermissionsContext);
    const {Modal_Status,Form_Status,Button_Enable_Status} = useContext(RefStatusContext);
    const {Modal_Suppliers,Form_Suppliers,Button_Edit_Suppliers,Button_Delete_Suppliers} = useContext(RefSuppliersContext);
    const {Modal_Supplier_Observations,Form_Supplier_Observations,Button_Detail_Supplier_Observations} = useContext(RefSupplierObservationsContext);
    const {Modal_Supply_Categories,Form_Supply_Categories,Button_Edit_Supply_Categories,Button_Delete_Supply_Categories} = useContext(RefSupplyCategoriesContext);
    const {Modal_Supply_Types,Form_Supply_Types,Button_Edit_Supply_Types,Button_Add_Supply_Types,Button_Delete_Supply_Types,Button_Count_Supply_Types} = useContext(RefSupplyTypesContext);
    const {Modal_Supplies,Form_Supplies,Button_Edit_Supplies,Button_Delete_Supplies} = useContext(RefSuppliesContext);
    const {Modal_Suppy_Orders,Form_Supply_Orders,Button_Edit_Supply_Orders,Button_Edit_State_Supply_Orders,Button_Add_Supply_Order_Observations,Button_View_Supply_Order_Observations,Button_Delete_Supply_Orders} = useContext(RefSupplyOrdersContext);
    const [isSelectedOptionSearch,setIsSelectedOptionSearch] = useContext(SelectedOptionSearchContext);
    const [isSelectedOptionOrderPlus,setIsSelectedOptionOrderPlus] = useContext(SelectedOptionOrderPlusContext);
    // Constante con las opciones de los buscadores
    const isOptionUsers = ['General','Nombre','Nombre corto','Usuario','Tipo de usuario'];
    const isOptionStatus = ['Normal','Activo','Inactivo'];
    const isOptionSuppliers = ['General','Nombre','RFC','Domicilio','Teléfono','Correo'];
    const isOptionSupplierObservations = ['General','Proveedor','Fecha','Calificación'];
    const isOptionSupplyTypes = ['General','Tipo','Unidad','Categoría','Cantidad Mínima'];
    const isOptionSupplies = ['General','Nombre','Proveedor','Categoría','Tipo','Cantidad'];
    const isOptionSupplyOrders = ['General','Número de Pedido','Fecha','Insumo','Cantidad','Precio Unitario','Precio Total','Estado'];
    const isOptionPurchases = ['Categorías','Tipos de Insumo'];
    const isOptionSales = ['Categorías','Tipos de Insumo'];
    const isOptionWarehouse = ['General','Nombre','Fecha']
    // Constantes con la funcionalidad de los hooks
    const navigate = useNavigate();
    const handleModalViewUsers = HandleModalViewUsers();
    const handleViewPassword = HandleViewPassword();
    const handleModalViewSuppliers = HandleModalViewSuppliers();
    const handleModalViewWarehouse = HandleModalViewWarehouse();
    // Estructura del componente
    return(
        <>
            <Container_Row_100_Left>
                <Icon_26><FcSearch/></Icon_26>
                <Input_Text_White_20
                    type="text"
                    placeholder="Buscar..."
                    value={isSearchTerm}
                    onChange={(e) => setIsSearchTerm(e.target.value)}
                />
                {currentSView === 'Usuarios' && currentNView === 'Usuarios' ? (
                    <Container_Row_Blue_Width_2000_Left ThemeMode={themeMode}>
                        {isOptionUsers.map((option,index) => (
                            <Button_Icon_Blue_140 ThemeMode={themeMode}
                                key={index}
                                onClick={() => setIsSelectedOptionSearch(option)}
                                style={{
                                    backgroundColor: isSelectedOptionSearch === option ? themeMode ? 'rgb(208, 31, 31)' : 'rgb(155, 9, 9)' : themeMode ? 'rgb(82, 126, 231)' : 'rgb(58,93,174)',
                                    color: isSelectedOptionSearch === option ? 'white' : 'white',
                                }}
                            >
                                <Text_Span_12_Center>{option}</Text_Span_12_Center>
                            </Button_Icon_Blue_140>
                        ))}
                        <Icon_White_18><IoSearch/></Icon_White_18>
                    </Container_Row_Blue_Width_2000_Left>
                ):(
                    <></>
                )}
                {currentSView === 'Usuarios' && currentNView === 'Estatus' ? (
                    <Container_Row_Blue_Width_2000_Left ThemeMode={themeMode}>
                        {isOptionStatus.map((option,index) => (
                            <Button_Icon_Blue_140 ThemeMode={themeMode}
                                key={index}
                                onClick={() => setIsSelectedOptionOrderPlus(option)}
                                style={{
                                    backgroundColor: isSelectedOptionOrderPlus === option ? themeMode ? 'rgb(208, 31, 31)' : 'rgb(155, 9, 9)' : themeMode ? 'rgb(82, 126, 231)' : 'rgb(58,93,174)',
                                    color: isSelectedOptionOrderPlus === option ? 'white' : 'white',
                                }}
                            >
                                <Text_Span_12_Center>{option}</Text_Span_12_Center>
                            </Button_Icon_Blue_140>
                        ))}
                        <Icon_White_18><LuArrowDownUp/></Icon_White_18>
                    </Container_Row_Blue_Width_2000_Left>
                ):(
                    <></>
                )}
                {currentSView === 'Proveedores' && currentNView === 'Proveedores' ? (
                    <Container_Row_Blue_Width_2000_Left ThemeMode={themeMode}>
                        {isOptionSuppliers.map((option,index) => (
                            <Button_Icon_Blue_140 ThemeMode={themeMode}
                                key={index}
                                onClick={() => setIsSelectedOptionSearch(option)}
                                style={{
                                    backgroundColor: isSelectedOptionSearch === option ? themeMode ? 'rgb(208, 31, 31)' : 'rgb(155, 9, 9)' : themeMode ? 'rgb(82, 126, 231)' : 'rgb(58,93,174)',
                                    color: isSelectedOptionSearch === option ? 'white' : 'white',
                                }}
                            >
                                <Text_Span_12_Center>{option}</Text_Span_12_Center>
                            </Button_Icon_Blue_140>
                        ))}
                        <Icon_White_18><IoSearch/></Icon_White_18>
                    </Container_Row_Blue_Width_2000_Left>
                ):(
                    <></>
                )}
                {currentSView === 'Proveedores' && currentNView === 'Observaciones de proveedores' ? (
                    <Container_Row_Blue_Width_2000_Left ThemeMode={themeMode}>
                        {isOptionSupplierObservations.map((option,index) => (
                            <Button_Icon_Blue_140 ThemeMode={themeMode}
                                key={index}
                                onClick={() => setIsSelectedOptionSearch(option)}
                                style={{
                                    backgroundColor: isSelectedOptionSearch === option ? themeMode ? 'rgb(208, 31, 31)' : 'rgb(155, 9, 9)' : themeMode ? 'rgb(82, 126, 231)' : 'rgb(58,93,174)',
                                    color: isSelectedOptionSearch === option ? 'white' : 'white',
                                }}
                            >
                                <Text_Span_12_Center>{option}</Text_Span_12_Center>
                            </Button_Icon_Blue_140>
                        ))}
                        <Icon_White_18><IoSearch/></Icon_White_18>
                    </Container_Row_Blue_Width_2000_Left>
                ):(
                    <></>
                )}
                {currentSView === 'Proveedores' && currentNView === 'Tipos de insumo' ? (
                    <Container_Row_Blue_Width_2000_Left ThemeMode={themeMode}>
                        {isOptionSupplyTypes.map((option,index) => (
                            <Button_Icon_Blue_140 ThemeMode={themeMode}
                                key={index}
                                onClick={() => setIsSelectedOptionSearch(option)}
                                style={{
                                    backgroundColor: isSelectedOptionSearch === option ? themeMode ? 'rgb(208, 31, 31)' : 'rgb(155, 9, 9)' : themeMode ? 'rgb(82, 126, 231)' : 'rgb(58,93,174)',
                                    color: isSelectedOptionSearch === option ? 'white' : 'white',
                                }}
                            >
                                <Text_Span_12_Center>{option}</Text_Span_12_Center>
                            </Button_Icon_Blue_140>
                        ))}
                        <Icon_White_18><IoSearch/></Icon_White_18>
                    </Container_Row_Blue_Width_2000_Left>
                ):(
                    <></>
                )}
                {currentSView === 'Proveedores' && currentNView === 'Insumos' ? (
                    <Container_Row_Blue_Width_2000_Left ThemeMode={themeMode}>
                        {isOptionSupplies.map((option,index) => (
                            <Button_Icon_Blue_140 ThemeMode={themeMode}
                                key={index}
                                onClick={() => setIsSelectedOptionSearch(option)}
                                style={{
                                    backgroundColor: isSelectedOptionSearch === option ? themeMode ? 'rgb(208, 31, 31)' : 'rgb(155, 9, 9)' : themeMode ? 'rgb(82, 126, 231)' : 'rgb(58,93,174)',
                                    color: isSelectedOptionSearch === option ? 'white' : 'white',
                                }}
                            >
                                <Text_Span_12_Center>{option}</Text_Span_12_Center>
                            </Button_Icon_Blue_140>
                        ))}
                        <Icon_White_18><IoSearch/></Icon_White_18>
                    </Container_Row_Blue_Width_2000_Left>
                ):(
                    <></>
                )}
                {currentSView === 'Inventario' && currentNView === 'Pedidos de insumo' ? (
                    <Container_Row_Blue_Width_2000_Left ThemeMode={themeMode}>                   
                        {isOptionSupplyOrders.map((option,index) => (
                            <Button_Icon_Blue_140 ThemeMode={themeMode}
                                key={index}
                                onClick={() => setIsSelectedOptionSearch(option)}
                                style={{
                                    backgroundColor: isSelectedOptionSearch === option ? themeMode ? 'rgb(208, 31, 31)' : 'rgb(155, 9, 9)' : themeMode ? 'rgb(82, 126, 231)' : 'rgb(58,93,174)',
                                    color: isSelectedOptionSearch === option ? 'white' : 'white',
                                }}
                            >
                                <Text_Span_12_Center>{option}</Text_Span_12_Center>
                            </Button_Icon_Blue_140>
                        ))}
                        <Icon_White_18><IoSearch/></Icon_White_18>
                    </Container_Row_Blue_Width_2000_Left>
                ):(
                    <></>
                )}
                {currentSView === 'Inventario' && currentNView === 'Compras' ? (
                    <Container_Row_Blue_Width_2000_Left ThemeMode={themeMode}>
                        {isOptionWarehouse.map((option,index) => (
                            <Button_Icon_Blue_140 ThemeMode={themeMode}
                                key={index}
                                onClick={() => setIsSelectedOptionSearch(option)}
                                style={{
                                    backgroundColor: isSelectedOptionSearch === option ? themeMode ? 'rgb(208, 31, 31)' : 'rgb(155, 9, 9)' : themeMode ? 'rgb(82, 126, 231)' : 'rgb(58,93,174)',
                                    color: isSelectedOptionSearch === option ? 'white' : 'white',
                                }}
                            >
                                <Text_Span_12_Center>{option}</Text_Span_12_Center>
                            </Button_Icon_Blue_140>
                        ))}
                        <Icon_White_18><IoSearch/></Icon_White_18>
                        {isOptionPurchases.map((option,index) => (
                            <Button_Icon_Blue_140 ThemeMode={themeMode}
                                key={index}
                                onClick={() => setIsSelectedOptionOrderPlus(option)}
                                style={{
                                    backgroundColor: isSelectedOptionOrderPlus === option ? themeMode ? 'rgb(208, 31, 31)' : 'rgb(155, 9, 9)' : themeMode ? 'rgb(82, 126, 231)' : 'rgb(58,93,174)',
                                    color: isSelectedOptionOrderPlus === option ? 'white' : 'white',
                                }}
                            >
                                <Text_Span_12_Center>{option}</Text_Span_12_Center>
                            </Button_Icon_Blue_140>
                        ))}
                        <Icon_White_18><LuArrowDownUp/></Icon_White_18>
                    </Container_Row_Blue_Width_2000_Left>
                ):(
                    <></>
                )}
                {currentSView === 'Inventario' && currentNView === 'Ventas' ? (
                    <Container_Row_Blue_Width_2000_Left ThemeMode={themeMode}>
                        {isOptionWarehouse.map((option,index) => (
                            <Button_Icon_Blue_140 ThemeMode={themeMode}
                                key={index}
                                onClick={() => setIsSelectedOptionSearch(option)}
                                style={{
                                    backgroundColor: isSelectedOptionSearch === option ? themeMode ? 'rgb(208, 31, 31)' : 'rgb(155, 9, 9)' : themeMode ? 'rgb(82, 126, 231)' : 'rgb(58,93,174)',
                                    color: isSelectedOptionSearch === option ? 'white' : 'white',
                                }}
                            >
                                <Text_Span_12_Center>{option}</Text_Span_12_Center>
                            </Button_Icon_Blue_140>
                        ))}
                        <Icon_White_18><IoSearch/></Icon_White_18>
                        {isOptionSales.map((option,index) => (
                            <Button_Icon_Blue_140 ThemeMode={themeMode}
                                key={index}
                                onClick={() => setIsSelectedOptionOrderPlus(option)}
                                style={{
                                    backgroundColor: isSelectedOptionOrderPlus === option ? themeMode ? 'rgb(208, 31, 31)' : 'rgb(155, 9, 9)' : themeMode ? 'rgb(82, 126, 231)' : 'rgb(58,93,174)',
                                    color: isSelectedOptionOrderPlus === option ? 'white' : 'white',
                                }}
                            >
                                <Text_Span_12_Center>{option}</Text_Span_12_Center>
                            </Button_Icon_Blue_140>
                        ))}
                        <Icon_White_18><LuArrowDownUp/></Icon_White_18>
                    </Container_Row_Blue_Width_2000_Left>
                ):(
                    <></>
                )}
                <Container_Row_80_Right>    
                    {currentSView === 'Usuarios' && currentNView === 'Usuarios' ? (
                        <>
                            {isSelectedRow !== null ? (
                                <>
                                    <Tooltip title='Editar' placement="top">
                                        <Button_Icon_Blue_60 ref={Button_Edit_Users} ThemeMode={themeMode} className={isSelectedRow === null ? 'fade-button-out':'fade-button-in'}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            if (isSelectedRow !== null) {
                                                handleModalViewUsers('Usuario-Editar');
                                                navigate('/Administration/Index/Users/Users/Edit',{ replace: true });
                                            }
                                        }}>
                                            <Icon_White_18><MdEdit/></Icon_White_18>
                                        </Button_Icon_Blue_60>
                                    </Tooltip> 
                                </>
                            ):(
                                <>
                                    <Tooltip title='Agregar' placement="top">
                                        <Button_Icon_Green_60 ThemeMode={themeMode} className={isSelectedRow === null ? 'fade-button-in':'fade-button-out'}
                                            onClick={() => {
                                                handleModalViewUsers('Usuario-Agregar');
                                                navigate('/Administration/Index/Users/Users/Add',{ replace: true });
                                            }}
                                        >
                                            <Icon_White_18><IoIosAddCircle/></Icon_White_18>
                                        </Button_Icon_Green_60>
                                    </Tooltip>
                                </>
                            )}
                            {isPermission.superadministrador ? (
                                isSelectedRow !== null ? (
                                    <>
                                        <Tooltip title='Eliminar' placement="top">
                                            <Button_Icon_Red_60 ref={Button_Delete_Users} ThemeMode={themeMode} className={isSelectedRow === null ? 'fade-button-out':'fade-button-in'}
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                if (isSelectedRow !== null) {
                                                    handleModalViewUsers('Usuario-Eliminar');
                                                    navigate('/Administration/Index/Users/Users/Delete',{ replace: true });
                                                }
                                            }}>
                                                <Icon_White_18><MdDelete/></Icon_White_18>
                                            </Button_Icon_Red_60>
                                        </Tooltip>  
                                    </>
                                ):(
                                    <></>
                                )
                            ):(
                                <></>
                            )}
                            {isUsersViewPassword ? (
                                <>
                                    <Tooltip title='Ocultar contraseñas' placement="top">
                                        <Button_Icon_Red_60 ThemeMode={themeMode} className={isUsersViewPassword ? 'fade-button-in':'fade-button-out'} 
                                        onClick={() => handleViewPassword()}>
                                            <Icon_White_18><IoIosEyeOff/></Icon_White_18>
                                        </Button_Icon_Red_60>
                                    </Tooltip>
                                </>
                            ):(
                                <>
                                    <Tooltip title='Mostrar contraseñas' placement="top">
                                        <Button_Icon_Green_60 ThemeMode={themeMode}  className={!isUsersViewPassword ? 'fade-button-in':'fade-button-out'}
                                        onClick={() => {
                                            handleModalViewUsers('Usuario-Ver-Contraseña');
                                            navigate('/Administration/Index/Users/Users/View',{ replace: true });
                                        }}>
                                            <Icon_White_18><FaEye/></Icon_White_18>
                                        </Button_Icon_Green_60>
                                    </Tooltip>
                                </>
                            )}
                        </>
                    ):(
                        <></>
                    )}
                    {currentSView === 'Usuarios' && currentNView === 'Permisos' ? (
                        <>
                            {isSelectedRow !== null ? (
                                <>
                                    <Tooltip title='Editar' placement="top">
                                        <Button_Icon_Blue_60 ref={Button_Edit_Permissions} ThemeMode={themeMode} className={isSelectedRow === null ? 'fade-button-out':'fade-button-in'}
                                        onClick={() => {
                                            handleModalViewUsers('Permisos-Editar');
                                            navigate('/Administration/Index/Users/Permissions/Edit',{ replace: true });
                                        }}>
                                            <Icon_White_18><MdEdit/></Icon_White_18>
                                        </Button_Icon_Blue_60>
                                    </Tooltip>
                                </>
                            ):(
                                <>
                                    <Tooltip title='Agregar' placement="top">
                                        <Button_Icon_Green_60 ThemeMode={themeMode} className={isSelectedRow === null ? 'fade-button-in':'fade-button-out'}
                                        onClick={() => {
                                            handleModalViewUsers('Permisos-Agregar');
                                            navigate('/Administration/Index/Users/Permissions/Add',{ replace: true });
                                        }}>
                                            <Icon_White_18><IoIosAddCircle/></Icon_White_18>
                                        </Button_Icon_Green_60>
                                    </Tooltip>      
                                </>
                            )}
                            {isPermission.superadministrador ? (
                                isSelectedRow !== null ? (
                                    isSelectedRow.superadministrador ? (
                                        <>
                                            <Tooltip title='Deshabilitar' placement="top">
                                                <Button_Icon_Red_60 ref={Button_Enable_Permissions} ThemeMode={themeMode} className={isSelectedRow === null ? 'fade-button-out':'fade-button-in'}
                                                disabled={isSelectedRow === null}
                                                onClick={() => {
                                                    handleModalViewUsers('Permiso-Super-Administrador');
                                                    navigate('/Administration/Index/Users/Permissions/Enable',{ replace: true });
                                                }}>
                                                    <Icon_White_18><FaUserTie/></Icon_White_18>
                                                </Button_Icon_Red_60>
                                            </Tooltip>
                                        </>
                                    ):(
                                        <>
                                            <Tooltip title='Habilitar' placement="top">
                                                <Button_Icon_Green_60 ref={Button_Enable_Permissions} ThemeMode={themeMode} className={isSelectedRow === null ? 'fade-button-out':'fade-button-in'}
                                                disabled={isSelectedRow === null}
                                                onClick={() => {
                                                    handleModalViewUsers('Permiso-Super-Administrador');
                                                    navigate('/Administration/Index/Users/Permissions/Enable',{ replace: true });
                                                }}>
                                                    <Icon_White_18><FaUserTie/></Icon_White_18>
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
                        </>
                    ):(
                        <></>
                    )}
                    {currentSView === 'Usuarios' && currentNView === 'Estatus' ? (
                        <>
                            {isSelectedRow !== null ? (
                                isSelectedRow.habilitado ? (
                                    <>
                                        <Tooltip title='Deshabilitar' placement="top">
                                            <Button_Icon_Red_60 ref={Button_Enable_Status} ThemeMode={themeMode} className={isSelectedRow === null ? 'fade-button-out':'fade-button-in'}
                                            disabled={isSelectedRow === null}
                                            onClick={() => {
                                                handleModalViewUsers('Estatus-Habilitar');
                                                navigate('/Administration/Index/Users/Status/Enable',{ replace: true });
                                            }}>
                                                <Icon_White_18><FaLock/></Icon_White_18>
                                            </Button_Icon_Red_60>
                                        </Tooltip>
                                    </>
                                ):(
                                    <>
                                        <Tooltip title='Habilitar' placement="top">
                                            <Button_Icon_Green_60 ref={Button_Enable_Status} ThemeMode={themeMode} className={isSelectedRow === null ? 'fade-button-out':'fade-button-in'}
                                            disabled={isSelectedRow === null}
                                            onClick={() => {
                                                handleModalViewUsers('Estatus-Habilitar');
                                                navigate('/Administration/Index/Users/Status/Enable',{ replace: true });
                                            }}>
                                                <Icon_White_18><FaLockOpen/></Icon_White_18>
                                            </Button_Icon_Green_60>
                                        </Tooltip>
                                    </>
                                )
                            ):(
                                <>
                                    <Tooltip title='Agregar' placement="top">
                                        <Button_Icon_Green_60 ThemeMode={themeMode} className={isSelectedRow === null ? 'fade-button-in':'fade-button-out'}
                                        onClick={() => {
                                            handleModalViewUsers('Estatus-Agregar');
                                            navigate('/Administration/Index/Users/Status/Add',{ replace: true });
                                        }}>
                                            <Icon_White_18><IoIosAddCircle/></Icon_White_18>
                                        </Button_Icon_Green_60>
                                    </Tooltip>
                                </>
                            )}
                        </>   
                    ):(
                        <></>
                    )}
                    {currentSView === 'Proveedores' && currentNView === 'Proveedores' ? (
                        <>
                            {isLoggedType === 'Chef' || isLoggedType === 'Almacenista' ? (
                                isSelectedRow !== null ? (
                                    <>
                                        <Tooltip title='Editar' placement="top">
                                            <Button_Icon_Blue_60 ref={Button_Edit_Suppliers} ThemeMode={themeMode} className={isSelectedRow !== null ? 'fade-button-in':'fade-button-out'}
                                            onClick={() => {
                                                handleModalViewSuppliers('Proveedor-Editar');
                                                navigate('/Administration/Index/Suppliers/Suppliers/Edit',{ replace: true });
                                            }}>
                                                <Icon_White_18><MdEdit/></Icon_White_18>
                                            </Button_Icon_Blue_60>
                                        </Tooltip>
                                    </>
                                ):(
                                    <>
                                        <Tooltip title='Agregar' placement="top">
                                            <Button_Icon_Green_60 ThemeMode={themeMode} className={isSelectedRow === null ? 'fade-button-in':'fade-button-out'}
                                            onClick={() => {
                                                handleModalViewSuppliers('Proveedor-Agregar');
                                                navigate('/Administration/Index/Suppliers/Suppliers/Add',{ replace: true });
                                            }}>
                                                <Icon_White_18><IoIosAddCircle/></Icon_White_18>
                                            </Button_Icon_Green_60>
                                        </Tooltip>
                                    </>
                                )
                            ):(
                                <></>
                            )}
                            {isPermission.superadministrador || isLoggedType === 'Chef' ? (
                                isSelectedRow !== null ? (
                                    <>
                                        <Tooltip title='Eliminar' placement="top">
                                            <Button_Icon_Red_60 ref={Button_Delete_Suppliers} ThemeMode={themeMode} className={isSelectedRow !== null ? 'fade-button-in':'fade-button-out'}
                                            onClick={() => {
                                                handleModalViewSuppliers('Proveedor-Eliminar');
                                                navigate('/Administration/Index/Suppliers/Suppliers/Delete',{ replace: true });
                                            }}>
                                                <Icon_White_18><MdDelete/></Icon_White_18>
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
                    {currentSView === 'Proveedores' && currentNView === 'Observaciones de proveedores' ? (
                        isSelectedRow !== null ? (
                            <>
                                <Tooltip title='Ver detalles' placement="top">
                                    <Button_Icon_Green_60 ThemeMode={themeMode} ref={Button_Detail_Supplier_Observations} className={isSelectedRow !== null ? 'fade-button-in':'fade-button-out'}
                                    onClick={() => {
                                        handleModalViewSuppliers('Observacion-Detalles');
                                        navigate('/Administration/Index/Suppliers/Observations/View',{ replace: true });
                                    }}>
                                        <Icon_White_18><FaEye/></Icon_White_18>
                                    </Button_Icon_Green_60>
                                </Tooltip>
                            </>
                        ):(
                            <></>
                        )
                    ):(
                        <></>
                    )}
                    {currentSView === 'Proveedores' && currentNView === 'Categorias por insumo' ? (
                        <>
                            {isLoggedType === 'Chef' || isLoggedType === 'Almacenista' ? (
                                isSelectedRow !== null ? (
                                    <>
                                        <Tooltip title='Editar' placement="top">
                                            <Button_Icon_Blue_60 ref={Button_Edit_Supply_Categories} ThemeMode={themeMode} className={isSelectedRow !== null ? 'fade-button-in':'fade-button-out'}
                                            onClick={() => {
                                                handleModalViewSuppliers('Categoria-Editar');
                                                navigate('/Administration/Index/Suppliers/Supply/Categories/Edit',{ replace: true });
                                            }}>
                                                <Icon_White_18><MdEdit/></Icon_White_18>
                                            </Button_Icon_Blue_60>
                                        </Tooltip>
                                    </>
                                ):(
                                    <>
                                        <Tooltip title='Agregar' placement="top">
                                            <Button_Icon_Green_60 ThemeMode={themeMode} className={isSelectedRow === null ? 'fade-button-in':'fade-button-out'}
                                            onClick={() => {
                                                handleModalViewSuppliers('Categoria-Agregar');
                                                navigate('/Administration/Index/Suppliers/Supply/Categories/Add',{ replace: true });
                                            }}>
                                                <Icon_White_18><IoIosAddCircle/></Icon_White_18>
                                            </Button_Icon_Green_60>
                                        </Tooltip>
                                    </>
                                )
                            ):(
                                <></>
                            )}
                            {isPermission.superadministrador || isLoggedType === 'Chef' ? (
                                isSelectedRow !== null ? (
                                    <>
                                        <Tooltip title='Eliminar' placement="top">
                                            <Button_Icon_Red_60 ref={Button_Delete_Supply_Categories} ThemeMode={themeMode} className={isSelectedRow !== null ? 'fade-button-in':'fade-button-out'}
                                            onClick={() => {
                                                handleModalViewSuppliers('Categoria-Eliminar');
                                                navigate('/Administration/Index/Suppliers/Supply/Categories/Delete',{ replace: true });
                                            }}>
                                                <Icon_White_18><MdDelete/></Icon_White_18>
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
                    {currentSView === 'Proveedores' && currentNView === 'Tipos de insumo' ? (
                        <>
                            {isLoggedType === 'Chef' || isLoggedType === 'Almacenista' ? (
                                isSelectedRow !== null ? (
                                    <>
                                        <Tooltip title='Editar' placement="top">
                                            <Button_Icon_Blue_60 ref={Button_Edit_Supply_Types} ThemeMode={themeMode} className={isSelectedRow !== null ? 'fade-button-in':'fade-button-out'}
                                            onClick={() => {
                                                handleModalViewSuppliers('Tipo-Insumo-Editar');
                                                navigate('/Administration/Index/Suppliers/Supply/Types/Edit',{ replace: true });
                                            }}>
                                                <Icon_White_18><MdEdit/></Icon_White_18>
                                            </Button_Icon_Blue_60>
                                        </Tooltip>
                                        <Tooltip title='Agregar cantidades' placement="top">
                                            <Button_Icon_White_60 ref={Button_Add_Supply_Types} ThemeMode={themeMode} className={isSelectedRow !== null ? 'fade-button-in':'fade-button-out'}
                                            onClick={() => {
                                                handleModalViewSuppliers('Tipo-Insumo-Cantidad-Agregar');
                                                navigate('/Administration/Index/Suppliers/Supply/Types/Count/Add',{ replace: true });
                                            }}>
                                                <Icon_18><IoIosAddCircle/></Icon_18>
                                            </Button_Icon_White_60>
                                        </Tooltip>
                                    </>
                                ):(
                                    <>
                                        <Tooltip title='Agregar' placement="top">
                                            <Button_Icon_Green_60 ThemeMode={themeMode} className={isSelectedRow === null ? 'fade-button-in':'fade-button-out'}
                                            onClick={() => {
                                                handleModalViewSuppliers('Tipo-Insumo-Agregar');
                                                navigate('/Administration/Index/Suppliers/Supply/Types/Add',{ replace: true });
                                            }}>
                                                <Icon_White_18><IoIosAddCircle/></Icon_White_18>
                                            </Button_Icon_Green_60>
                                        </Tooltip>
                                    </>
                                )
                            ):(
                                <></>
                            )}
                            {isPermission.superadministrador || isLoggedType === 'Chef' ? (
                                isSelectedRow !== null ? (
                                    <>
                                        <Tooltip title='Eliminar' placement="top">
                                            <Button_Icon_Red_60 ref={Button_Delete_Supply_Types} ThemeMode={themeMode} className={isSelectedRow !== null ? 'fade-button-in':'fade-button-out'}
                                            onClick={() => {
                                                handleModalViewSuppliers('Tipo-Insumo-Eliminar');
                                                navigate('/Administration/Index/Suppliers/Supply/Types/Delete',{ replace: true });
                                            }}>
                                                <Icon_White_18><MdDelete/></Icon_White_18>
                                            </Button_Icon_Red_60>
                                        </Tooltip>
                                    </>
                                ):(
                                    <></>
                                )
                            ):(
                                <></>
                            )}
                            {isSelectedRow !== null ? (
                                <>
                                    <Tooltip title='Detalles' placement="top">
                                        <Button_Icon_Orange_60 ref={Button_Count_Supply_Types} ThemeMode={themeMode} className={isSelectedRow !== null ? 'fade-button-in':'fade-button-out'}
                                        onClick={() => {
                                            handleModalViewSuppliers('Tipo-Insumo-Detalles');
                                            navigate('/Administration/Index/Suppliers/Supply/Types/Detail',{ replace: true });
                                        }}>
                                            <Icon_White_18><FaCubes/></Icon_White_18>
                                        </Button_Icon_Orange_60>
                                    </Tooltip>
                                </>
                            ):(
                                <></>
                            )}
                        </>
                    ):(
                        <></>
                    )}
                    {currentSView === 'Proveedores' && currentNView === 'Insumos' ? (
                        <>
                            {isLoggedType === 'Chef' || isLoggedType === 'Almacenista' ? (
                                isSelectedRow !== null ? (
                                    <>
                                        <Tooltip title='Editar' placement="top">
                                            <Button_Icon_Blue_60 ref={Button_Edit_Supplies} ThemeMode={themeMode} className={isSelectedRow !== null ? 'fade-button-in':'fade-button-out'}
                                            onClick={() => {
                                                handleModalViewSuppliers('Insumo-Editar');
                                                navigate('/Administration/Index/Suppliers/Supplies/Edit',{ replace: true });
                                            }}>
                                                <Icon_White_18><MdEdit/></Icon_White_18>
                                            </Button_Icon_Blue_60>
                                        </Tooltip>
                                    </>
                                ):(
                                    <>
                                        <Tooltip title='Agregar' placement="top">
                                            <Button_Icon_Green_60 ThemeMode={themeMode} className={isSelectedRow === null ? 'fade-button-in':'fade-button-out'}
                                            onClick={() => {
                                                handleModalViewSuppliers('Insumo-Agregar');
                                                navigate('/Administration/Index/Suppliers/Supplies/Add',{ replace: true });
                                            }}>
                                                <Icon_White_18><IoIosAddCircle/></Icon_White_18>
                                            </Button_Icon_Green_60>
                                        </Tooltip>
                                    </>
                                )
                            ):(
                                <></>
                            )}
                            {isPermission.superadministrador || isLoggedType === 'Chef' ? (
                                isSelectedRow !== null ? (
                                    <>
                                        <Tooltip title='Eliminar' placement="top">
                                            <Button_Icon_Red_60 ref={Button_Delete_Supplies} ThemeMode={themeMode} className={isSelectedRow !== null ? 'fade-button-in':'fade-button-out'}
                                            onClick={() => {
                                                handleModalViewSuppliers('Insumo-Eliminar');
                                                navigate('/Administration/Index/Suppliers/Supplies/Delete',{ replace: true });
                                            }}>
                                                <Icon_White_18><MdDelete/></Icon_White_18>
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
                                                        <Icon_White_18><BiSolidMessageDetail/></Icon_White_18>
                                                    </Button_Icon_Green_60>
                                                </Tooltip> 
                                                <Tooltip title='Agregar observación' placement="top">
                                                    <Button_Icon_Green_60 ref={Button_Add_Supply_Order_Observations} ThemeMode={themeMode} className={isSelectedRow === null ? 'fade-button-in':'fade-button-out'}
                                                    onClick={() => {
                                                        handleModalViewWarehouse('Observacion-Pedido-Agregar');
                                                        navigate('/Administration/Index/Warehouse/Supply/Orders/Observation/Add',{ replace: true });
                                                    }}>
                                                        <Icon_White_18><BiSolidMessageAdd/></Icon_White_18>
                                                    </Button_Icon_Green_60>
                                                </Tooltip> 
                                                <Tooltip title='Editar' placement="top">
                                                    <Button_Icon_Blue_60 ref={Button_Edit_Supply_Orders} ThemeMode={themeMode} className={isSelectedRow !== null ? 'fade-button-in':'fade-button-out'}
                                                    onClick={() => {
                                                        handleModalViewWarehouse('Pedido-Editar');
                                                        navigate('/Administration/Index/Warehouse/Supply/Orders/Edit',{ replace: true });
                                                    }}>
                                                        <Icon_White_18><MdEdit/></Icon_White_18>
                                                    </Button_Icon_Blue_60>
                                                </Tooltip> 
                                                <Tooltip title='Finalizar' placement="top">
                                                    <Button_Icon_Orange_60 ref={Button_Edit_State_Supply_Orders} ThemeMode={themeMode} className={isSelectedRow !== null ? 'fade-button-in':'fade-button-out'}
                                                    onClick={() => {
                                                        handleModalViewWarehouse('Pedido-Editar-Estado');
                                                        navigate('/Administration/Index/Warehouse/Supply/Orders/State/Edit',{ replace: true });
                                                    }}>
                                                        <Icon_White_18><FaSyncAlt/></Icon_White_18>
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
                                                <Icon_White_18><IoIosAddCircle/></Icon_White_18>
                                            </Button_Icon_Green_60>
                                        </Tooltip>
                                    </>
                                )
                            ):(
                                <></>
                            )}
                            {isPermission.superadministrador || isLoggedType === 'Chef' ? (
                                isSelectedRow !== null && isSelectedRow.insumos.estado !== 'Finalizado' ? (
                                    <>
                                        <Tooltip title='Eliminar' placement="top">
                                            <Button_Icon_Red_60 ref={Button_Delete_Supply_Orders} ThemeMode={themeMode} className={isSelectedRow !== null ? 'fade-button-in':'fade-button-out'}
                                            onClick={() => {
                                                handleModalViewWarehouse('Pedido-Eliminar');
                                                navigate('/Administration/Index/Warehouse/Supply/Orders/Delete',{ replace: true });
                                            }}>
                                                <Icon_White_18><MdDelete/></Icon_White_18>
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
                    {currentSView === 'Inventario' && currentNView === 'Ventas' ? (
                        <>
                            {isLoggedType === 'Chef' || isPermission.superadministrador ? (
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
                                                <Icon_White_18><IoIosAddCircle/></Icon_White_18>
                                            </Button_Icon_Green_60>
                                        </Tooltip>
                                    </>
                                )
                            ):(
                                <></>
                            )}
                        </>
                    ):(
                        <></>
                    )}
                </Container_Row_80_Right>
            </Container_Row_100_Left> 
        </>
    );
}