//____________IMPORT/EXPORT____________
// Hooks de React
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
// Componentes de React externos
import { Tooltip } from "@mui/material";
// Contextos
import { NavbarViewContext,SidebarViewContext,SidebarContext } from "../../../contexts/ViewsProvider";
import { LoggedLoggedContext,LoggedTypeContext } from "../../../contexts/SessionProvider";
import { ActionBlockContext } from "../../../contexts/VariablesProvider";
// Hooks personalizados
import { ToggleSidebar,HandleModalView } from "../../../hooks/Views";
//__________IMAGENES__________
import Logo_Hospital from '../../imgs/Logo-Hospital.png'
//__________IMAGENES__________
//__________ICONOS__________
// Iconos para la opcion de usuarios del navbar
import { FaUser } from "react-icons/fa6";
import { IoShieldHalfSharp } from "react-icons/io5";
import { IoIosLock } from "react-icons/io";
// Iconos para la opcion de proveedores del navbar
import { FaStore } from "react-icons/fa";
import { MdSpeakerNotes } from "react-icons/md";
// Iconos para la opcion de insumos del navbar
import { GiFruitBowl } from "react-icons/gi";
import { GiMilkCarton } from "react-icons/gi";
import { GiMeat } from "react-icons/gi";
import { FaBoxes } from "react-icons/fa";
import { FaBoxOpen } from "react-icons/fa6";
// Iconos para la opcion de extras del navbar
import { FaBroom } from "react-icons/fa6";
import { GiLiquidSoap } from "react-icons/gi";
import { GiMoneyStack } from "react-icons/gi";
// Iconos para la sección de inventario del navbar
import { MdAssignment } from "react-icons/md";
import { BiListPlus } from "react-icons/bi";
import { BiListMinus } from "react-icons/bi";
import { TbReportAnalytics } from "react-icons/tb";
// Iconos para la seccion de menus del navbar
import { MdOutlineMenuBook } from "react-icons/md";
import { GiMeal } from "react-icons/gi";
import { GiBowlOfRice } from "react-icons/gi";
import { GiGlassShot } from "react-icons/gi";
// Iconos para el toggle
import { BiSolidToggleLeft } from "react-icons/bi";
import { BiSolidToggleRight } from "react-icons/bi";
// Icono para el logout
import { ImExit } from "react-icons/im";
//__________ICONOS__________
// Estilos personalizados
import { Container_Navbar_Row_General_White,Container_Navbar_Row_General,Container_Navbar_Row_Function_Blue,Container_Navbar_Text,Container_Navbar_Row_Buttom } from "../../styled/Containers";
import { Button_Icon_Blue_80,Button_Icon_Red_80 } from '../../styled/Buttons';
import { Icon_16 } from "../../styled/Icons";
import { Text_Title_24_White } from '../../styled/Text';
import { Image_Navbar } from "../../styled/Imgs";
// Componentes personalizados
import { Nav_Bar_Button_White } from "./Buttons";
//____________IMPORT/EXPORT____________

// Componente para navegar entre las paginas en la parte superior 
export default function Nav_Bar(){
    // Constantes con el valor de los contextos 
    const [currentNView] = useContext(NavbarViewContext);
    const [currentSView] = useContext(SidebarViewContext);
    const [isLogged] = useContext(LoggedLoggedContext);
    const [isLoggedType] = useContext(LoggedTypeContext);
    const [isSidebar] = useContext(SidebarContext);
    const [isActionBlock] = useContext(ActionBlockContext);
    // Constantes con la funcionalidad de los hooks
    const navigate = useNavigate();
    const toggleSidebar = ToggleSidebar();
    const handleModalView = HandleModalView();
    // Estructura del componente
    return(
        <>
            <Container_Navbar_Row_General_White>
                <Container_Navbar_Row_General>
                    <Image_Navbar src={Logo_Hospital}/> 
                    {currentSView !== 'Inicio' ? (
                        <Container_Navbar_Row_Function_Blue>
                            {currentSView === 'Usuarios' ? (
                                <>
                                    <Nav_Bar_Button_White
                                        title="Usuarios"
                                        view="Usuarios"
                                        route="/Administration/Index/Users/Users"
                                        icon={<FaUser/>}
                                    />
                                    <Nav_Bar_Button_White
                                        title="Permisos"
                                        view="Permisos"
                                        route="/Administration/Index/Users/Permissions"
                                        icon={<IoShieldHalfSharp/>}
                                    />
                                    <Nav_Bar_Button_White
                                        title="Estatus"
                                        view="Estatus"
                                        route="/Administration/Index/Users/Status"
                                        icon={<IoIosLock/>}
                                    />
                                    {currentNView === 'Usuarios' ? (
                                        <Container_Navbar_Text>
                                            <Text_Title_24_White>USUARIOS</Text_Title_24_White>
                                        </Container_Navbar_Text>
                                    ):(
                                        <></>
                                    )}
                                    {currentNView === 'Permisos' ? (
                                        <Container_Navbar_Text>
                                            <Text_Title_24_White>PERMISOS DE USUARIOS</Text_Title_24_White>
                                        </Container_Navbar_Text>
                                    ):(
                                        <></>
                                    )}
                                    {currentNView === 'Estatus' ? (
                                        <Container_Navbar_Text>
                                            <Text_Title_24_White>ESTATUS DE USUARIOS</Text_Title_24_White>
                                        </Container_Navbar_Text>
                                    ):(
                                        <></>
                                    )}
                                </>
                            ):(
                                <></>
                            )}
                            {currentSView === 'Proveedores' ? (
                                <>
                                    <Nav_Bar_Button_White
                                        title="Proveedores"
                                        view="Proveedores"
                                        route="/Administration/Index/Suppliers/Suppliers"
                                        icon={<FaStore/>}
                                    />
                                    <Nav_Bar_Button_White
                                        title="Observaciones de proveedores"
                                        view="Observaciones de proveedores"
                                        route="/Administration/Index/Suppliers/Observations"
                                        icon={<MdSpeakerNotes/>}
                                    />
                                    {currentNView === 'Proveedores' ? (
                                        <Container_Navbar_Text>
                                            <Text_Title_24_White>PROVEEDORES</Text_Title_24_White>
                                        </Container_Navbar_Text>
                                    ):(
                                        <></>
                                        
                                    )}
                                    {currentNView === 'Observaciones de proveedores' ? (
                                        <Container_Navbar_Text>
                                            <Text_Title_24_White>OBSERVACIONES</Text_Title_24_White>
                                        </Container_Navbar_Text>
                                    ):(
                                        <></>
                                    )}
                                </>
                            ):(
                                <></>
                            )}
                            {currentSView === 'Insumos' ? (
                                <>
                                    <Nav_Bar_Button_White
                                        title="Categorías por insumo"
                                        view="Categorias por insumo"
                                        route="/Administration/Index/Supplies/Supply/Categories"
                                        icon={<><GiFruitBowl/><GiMilkCarton/><GiMeat/></>}
                                    />
                                    <Nav_Bar_Button_White
                                        title="Tipos de insumo"
                                        view="Tipos de insumo"
                                        route="/Administration/Index/Supplies/Supply/Types"
                                        icon={<FaBoxes/>}
                                    />
                                    <Nav_Bar_Button_White
                                        title="Insumos"
                                        view="Insumos"
                                        route="/Administration/Index/Supplies/Supplies"
                                        icon={<FaBoxOpen/>}
                                    />
                                    {currentNView === 'Categorias por insumo' ? (
                                        <Container_Navbar_Text>
                                            <Text_Title_24_White>CATEGORÍAS POR INSUMO</Text_Title_24_White>
                                        </Container_Navbar_Text>
                                    ):(
                                        <></>
                                    )}
                                    {currentNView === 'Tipos de insumo' ? (
                                        <Container_Navbar_Text>
                                            <Text_Title_24_White>TIPOS DE INSUMO</Text_Title_24_White>
                                        </Container_Navbar_Text>
                                    ):(
                                        <></>
                                    )}
                                    {currentNView === 'Insumos' ? (
                                        <Container_Navbar_Text>
                                            <Text_Title_24_White>INSUMOS</Text_Title_24_White>
                                        </Container_Navbar_Text>
                                    ):(
                                        <></>
                                    )}
                                </>
                            ):(
                                <></>
                            )}

                            {currentSView === 'Extras' ? (
                                <>
                                    <Nav_Bar_Button_White
                                        title="Categorías de limpieza"
                                        view="Categorias de limpieza"
                                        route="/Administration/Index/Extras/Cleaning/Categories"
                                        icon={<><FaBroom/><GiLiquidSoap/></>}
                                    />
                                    <Nav_Bar_Button_White
                                        title="Suministros de limpieza"
                                        view="Suministros de limpieza"
                                        route="/Administration/Index/Extras/Cleaning/Supplies"
                                        icon={<FaBoxes/>}
                                    />
                                    <Nav_Bar_Button_White
                                        title="Categorías de gastos fijos"
                                        view="Categorias de gastos fijos"
                                        route="/Administration/Index/Extras/Fixed/Expenses/Categories"
                                        icon={<GiMoneyStack/>}
                                    />
                                    <Nav_Bar_Button_White
                                        title="Artículos de gastos fijos"
                                        view="Articulos de gastos fijos"
                                        route="/Administration/Index/Extras/Fixed/Expenses/Items"
                                        icon={<GiMoneyStack/>}
                                    />
                                    {currentNView === 'Categorias de limpieza' ? (
                                        <Container_Navbar_Text>
                                            <Text_Title_24_White>CATEGORÍAS DE LIMPIEZA</Text_Title_24_White>
                                        </Container_Navbar_Text>
                                    ):(
                                        <></>
                                    )}
                                    {currentNView === 'Suministros de limpieza' ? (
                                        <Container_Navbar_Text>
                                            <Text_Title_24_White>SUMINISTROS DE LIMPIEZA</Text_Title_24_White>
                                        </Container_Navbar_Text>
                                    ):(
                                        <></>
                                    )}
                                    {currentNView === 'Categorias de gastos fijos' ? (
                                        <Container_Navbar_Text>
                                            <Text_Title_24_White>CATEGORÍAS DE GASTOS FIJOS</Text_Title_24_White>
                                        </Container_Navbar_Text>
                                    ):(
                                        <></>
                                    )}
                                    {currentNView === 'Articulos de gastos fijos' ? (
                                        <Container_Navbar_Text>
                                            <Text_Title_24_White>ARTÍCULOS DE GASTOS FIJOS</Text_Title_24_White>
                                        </Container_Navbar_Text>
                                    ):(
                                        <></>
                                    )}
                                </>
                            ):(
                                <></>
                            )}
                            {currentSView === 'Inventario' ? (
                                <>
                                    <Nav_Bar_Button_White
                                        title="Pedidos de insumo"
                                        view="Pedidos de insumo"
                                        route="/Administration/Index/Warehouse/Supply/Orders"
                                        icon={<MdAssignment/>}
                                    />
                                    <Nav_Bar_Button_White
                                        title="Compras"
                                        view="Compras"
                                        route="/Administration/Index/Warehouse/Purchases"
                                        icon={<BiListPlus/>}
                                    />
                                    <Nav_Bar_Button_White
                                        title="Ventas"
                                        view="Ventas"
                                        route="/Administration/Index/Warehouse/Sales"
                                        icon={<BiListMinus/>}
                                    />
                                    <Nav_Bar_Button_White
                                        title="Reportes"
                                        view="Reportes"
                                        route="/Administration/Index/Warehouse/Reports"
                                        icon={<TbReportAnalytics/>}
                                    />
                                    {currentNView === 'Pedidos de insumo' ? (
                                        <Container_Navbar_Text>
                                            <Text_Title_24_White>PEDIDOS DE INSUMOS</Text_Title_24_White>
                                        </Container_Navbar_Text>
                                    ):(
                                        <></>
                                        
                                    )}
                                    {currentNView === 'Compras' ? (
                                        <Container_Navbar_Text>
                                            <Text_Title_24_White>COMPRAS</Text_Title_24_White>
                                        </Container_Navbar_Text>
                                    ):(
                                        <></>
                                    )}
                                    {currentNView === 'Ventas' ? (
                                        <Container_Navbar_Text>
                                            <Text_Title_24_White>VENTAS</Text_Title_24_White>
                                        </Container_Navbar_Text>
                                    ):(
                                        <></>
                                    )}
                                    {currentNView === 'Reportes' ? (
                                        <Container_Navbar_Text>
                                            <Text_Title_24_White>REPORTES</Text_Title_24_White>
                                        </Container_Navbar_Text>
                                    ):(
                                        <></>
                                    )}
                                </>
                            ):(
                                <></>
                            )}

                            {currentSView === 'Menus' ? (
                                <>
                                    {isLoggedType !== 'Almacenista' ? (
                                        <Nav_Bar_Button_White
                                            title="Menús"
                                            view="Menus"
                                            route={isLoggedType === 'Nutriólogo' ? "/Kitchen/Index/Menus/Menus" : "/Administration/Index/Menus/Menus"}
                                            icon={<MdOutlineMenuBook/>}
                                        />
                                    ):(
                                        <></>
                                    )}
                                    <Nav_Bar_Button_White
                                        title="Platillos"
                                        view="Platillos"
                                        route={isLoggedType === 'Nutriólogo' ? "/Kitchen/Index/Menus/Dishes" : "/Administration/Index/Menus/Dishes"}
                                        icon={<GiMeal/>}
                                    />
                                    <Nav_Bar_Button_White
                                        title="Guarniciones"
                                        view="Guarniciones"
                                        route={isLoggedType === 'Nutriólogo' ? "/Kitchen/Index/Menus/Side/Dishes" : "/Administration/Index/Menus/Side/Dishes"}
                                        icon={<GiBowlOfRice/>}
                                    />
                                    <Nav_Bar_Button_White
                                        title="Bebidas"
                                        view="Bebidas"
                                        route={isLoggedType === 'Nutriólogo' ? "/Kitchen/Index/Menus/Drinks" : "/Administration/Index/Menus/Drinks"}
                                        icon={<GiGlassShot/>}
                                    />
                                    {currentNView === 'Menus' ? (
                                        <Container_Navbar_Text>
                                            <Text_Title_24_White>MENÚS</Text_Title_24_White>
                                        </Container_Navbar_Text>
                                    ):(
                                        <></>                                   
                                    )}
                                    {currentNView === 'Platillos' ? (
                                        <Container_Navbar_Text>
                                            <Text_Title_24_White>PLATILLOS</Text_Title_24_White>
                                        </Container_Navbar_Text>
                                    ):(
                                        <></>
                                    )}
                                    {currentNView === 'Guarniciones' ? (
                                        <Container_Navbar_Text>
                                            <Text_Title_24_White>GUARNICIONES</Text_Title_24_White>
                                        </Container_Navbar_Text>
                                    ):(
                                        <></>
                                    )}
                                    {currentNView === 'Bebidas' ? (
                                        <Container_Navbar_Text>
                                            <Text_Title_24_White>BEBIDAS</Text_Title_24_White>
                                        </Container_Navbar_Text>
                                    ):(
                                        <></>
                                    )}
                                </>
                            ):(
                                <></>
                            )}
                        </Container_Navbar_Row_Function_Blue>
                    ):(
                        <></>
                    )} 
                    {isLogged ? (
                        isActionBlock ? (
                            <>
                                <Button_Icon_Red_80 disabled>
                                    <Icon_16><ImExit/></Icon_16>
                                </Button_Icon_Red_80>
                                <Button_Icon_Blue_80 disabled>
                                    {isSidebar ? <Icon_16><BiSolidToggleRight/></Icon_16> : <Icon_16><BiSolidToggleLeft/></Icon_16>}
                                </Button_Icon_Blue_80>
                            </>
                        ):(
                            <>
                                <Container_Navbar_Row_Buttom>
                                    <Tooltip title='Cerrar sesión' placement="bottom">
                                        <Button_Icon_Red_80 
                                            onClick={() => {
                                                handleModalView('Cerrar-Sesión');
                                                navigate(isLoggedType === 'Cocinero' || isLoggedType === 'Nutriólogo' || isLoggedType === 'Médico' ? '/Kitchen/Out_Login' : '/Administration/Out_Login',{ replace: true });
                                            }}
                                        >
                                            <Icon_16><ImExit/></Icon_16>
                                        </Button_Icon_Red_80>
                                    </Tooltip>
                                    <Tooltip title={isSidebar ? 'Ocultar' : 'Mostrar'} placement="bottom">
                                        <Button_Icon_Blue_80
                                            onClick={() => toggleSidebar()}
                                        >
                                            {isSidebar ? <Icon_16><BiSolidToggleRight/></Icon_16> : <Icon_16><BiSolidToggleLeft/></Icon_16>}
                                        </Button_Icon_Blue_80>
                                    </Tooltip>
                                </Container_Navbar_Row_Buttom>
                            </>
                        )
                    ):(
                        <></>
                    )}
                </Container_Navbar_Row_General>
            </Container_Navbar_Row_General_White>  
        </>
    );
}