//____________IMPORT/EXPORT____________
// Hooks de React
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
// Componentes de React externos
import { Tooltip } from "@mui/material";
// Contextos
import { NavbarViewContext,SidebarViewContext,SidebarContext } from "../../contexts/ViewsProvider";
import { LoggedLoggedContext,LoggedTypeContext } from "../../contexts/SessionProvider";
import { ActionBlockContext } from "../../contexts/VariablesProvider";
// Hooks personalizados
import { HandleNavbarView,ToggleSidebar,HandleModalView } from "../../hooks/Views";
//__________IMAGENES__________
import Logo_Hospital from '../imgs/Logo-Hospital.png'
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
import { FaCashRegister } from "react-icons/fa";
import { FaPlus } from "react-icons/fa";
import { FaMinus } from "react-icons/fa";
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
import { Container_Navbar_Row_General_White,Container_Navbar_Row_General,Container_Navbar_Row_Function_Blue,Container_Navbar_Text,Container_Navbar_Row_Buttom } from "../styled/Containers";
import { Button_Icon_White_100,Button_Icon_Blue_80,Button_Icon_Red_80 } from '../styled/Buttons';
import { Icon_16,Icon_24 } from "../styled/Icons";
import { Text_Title_24_White } from '../styled/Text';
import { Image_Navbar_Fade } from "../styled/Imgs";
//____________IMPORT/EXPORT____________

// Componente para navegar entre las paginas en la parte superior 
export default function Nav_Bar(){
    // Constantes con el valor de los contextos 
    const [currentNView] = useContext(NavbarViewContext);
    const [currentSView] = useContext(SidebarViewContext);
    const [isLogged] = useContext(LoggedLoggedContext);
    const [isTypeUser] = useContext(LoggedTypeContext);
    const [isSidebar] = useContext(SidebarContext);
    const [isActionBlock] = useContext(ActionBlockContext);
    // Constantes con la funcionalidad de los hooks
    const navigate = useNavigate();
    const handleNavbarView = HandleNavbarView();
    const toggleSidebar = ToggleSidebar();
    const handleModalView = HandleModalView();
    // Estructura del componente
    return(
        <>
            <Container_Navbar_Row_General_White>
                <Container_Navbar_Row_General>
                    <Image_Navbar_Fade src={Logo_Hospital}/>  
                    <Container_Navbar_Row_Function_Blue>
                        {currentSView === 'Usuarios' ? (
                            <>
                                <Button_Icon_White_100 
                                    disabled={isActionBlock}
                                    style={{ 
                                        backgroundColor: isActionBlock ? 'rgba(84, 88, 89, 0.5)' : currentNView === 'Usuarios' ? 'rgba(0, 0, 0, 1)' : '',
                                        borderColor: isActionBlock ? 'rgba(255, 255, 255, 0.75)' : currentNView === 'Usuarios' ? 'white' : '',
                                        color: isActionBlock ? 'rgba(255, 255, 255, 0.75)' : currentNView === 'Usuarios' ? 'white' : '',
                                    }}
                                    onClick={() => {
                                        handleNavbarView('Usuarios');
                                        sessionStorage.setItem('Ruta','/Administration/Index/Users/Users');
                                        navigate('/Administration/Index/Users/Users',{ replace: true });
                                    }}
                                >
                                    <Icon_24><FaUser/></Icon_24>
                                </Button_Icon_White_100>
                                <Button_Icon_White_100 
                                    disabled={isActionBlock}
                                    style={{ 
                                        backgroundColor: isActionBlock ? 'rgba(84, 88, 89, 0.5)' : currentNView === 'Permisos' ? 'rgba(0, 0, 0, 1)' : '',
                                        borderColor: isActionBlock ? 'rgba(255, 255, 255, 0.75)' : currentNView === 'Permisos' ? 'white' : '',
                                        color: isActionBlock ? 'rgba(255, 255, 255, 0.75)' : currentNView === 'Permisos' ? 'white' : '',
                                    }}
                                    onClick={() => {
                                        handleNavbarView('Permisos')
                                        sessionStorage.setItem('Ruta','/Administration/Index/Users/Permissions');
                                        navigate('/Administration/Index/Users/Permissions',{ replace: true });
                                    }}
                                >
                                    <Icon_24><IoShieldHalfSharp/></Icon_24>
                                </Button_Icon_White_100>
                                <Button_Icon_White_100 
                                    disabled={isActionBlock}
                                    style={{ 
                                        backgroundColor: isActionBlock ? 'rgba(84, 88, 89, 0.5)' : currentNView === 'Estatus' ? 'rgba(0, 0, 0, 1)' : '',
                                        borderColor: isActionBlock ? 'rgba(255, 255, 255, 0.75)' : currentNView === 'Estatus' ? 'white' : '',
                                        color: isActionBlock ? 'rgba(255, 255, 255, 0.75)' : currentNView === 'Estatus' ? 'white' : '',
                                    }}
                                    onClick={() => {
                                        handleNavbarView('Estatus')
                                        sessionStorage.setItem('Ruta','/Administration/Index/Users/Status');
                                        navigate('/Administration/Index/Users/Status',{ replace: true });
                                    }}
                                >
                                    <Icon_24><IoIosLock/></Icon_24>
                                </Button_Icon_White_100>
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
                                <Button_Icon_White_100 
                                    disabled={isActionBlock}
                                    style={{ 
                                        backgroundColor: isActionBlock ? 'rgba(84, 88, 89, 0.5)' : currentNView === 'Proveedores' ? 'rgba(0, 0, 0, 1)' : '',
                                        borderColor: isActionBlock ? 'rgba(255, 255, 255, 0.75)' : currentNView === 'Proveedores' ? 'white' : '',
                                        color: isActionBlock ? 'rgba(255, 255, 255, 0.75)' : currentNView === 'Proveedores' ? 'white' : '',
                                    }}
                                    onClick={() => {
                                        handleNavbarView('Proveedores');
                                        sessionStorage.setItem('Ruta','/Administration/Index/Suppliers/Suppliers');
                                        navigate('/Administration/Index/Suppliers/Suppliers',{ replace: true });
                                    }}
                                >
                                    <Icon_24><FaStore/></Icon_24>
                                </Button_Icon_White_100>
                                <Button_Icon_White_100 
                                    disabled={isActionBlock}
                                    style={{ 
                                        backgroundColor: isActionBlock ? 'rgba(84, 88, 89, 0.5)' : currentNView === 'Observaciones de proveedores' ? 'rgba(0, 0, 0, 1)' : '',
                                        borderColor: isActionBlock ? 'rgba(255, 255, 255, 0.75)' : currentNView === 'Observaciones de proveedores' ? 'white' : '',
                                        color: isActionBlock ? 'rgba(255, 255, 255, 0.75)' : currentNView === 'Observaciones de proveedores' ? 'white' : '',
                                    }}
                                    onClick={() => {
                                        handleNavbarView('Observaciones de proveedores');
                                        sessionStorage.setItem('Ruta','/Administration/Index/Suppliers/Observations');
                                        navigate('/Administration/Index/Suppliers/Observations',{ replace: true });
                                    }}
                                >
                                    <Icon_24><MdSpeakerNotes/></Icon_24>
                                </Button_Icon_White_100>
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
                                <Button_Icon_White_100 
                                    disabled={isActionBlock}
                                    style={{ 
                                        backgroundColor: isActionBlock ? 'rgba(84, 88, 89, 0.5)' : currentNView === 'Categorias por insumo' ? 'rgba(0, 0, 0, 1)' : '',
                                        borderColor: isActionBlock ? 'rgba(255, 255, 255, 0.75)' : currentNView === 'Categorias por insumo' ? 'white' : '',
                                        color: isActionBlock ? 'rgba(255, 255, 255, 0.75)' : currentNView === 'Categorias por insumo' ? 'white' : '',
                                    }}
                                    onClick={() => {
                                        handleNavbarView('Categorias por insumo');
                                        sessionStorage.setItem('Ruta','/Administration/Index/Supplies/Supply/Categories');
                                        navigate('/Administration/Index/Supplies/Supply/Categories',{ replace: true });
                                    }}
                                >
                                    <Icon_24><GiFruitBowl/><GiMilkCarton/><GiMeat/></Icon_24>
                                </Button_Icon_White_100>
                                <Button_Icon_White_100 
                                    disabled={isActionBlock}
                                    style={{ 
                                        backgroundColor: isActionBlock ? 'rgba(84, 88, 89, 0.5)' : currentNView === 'Tipos de insumo' ? 'rgba(0, 0, 0, 1)' : '',
                                        borderColor: isActionBlock ? 'rgba(255, 255, 255, 0.75)' : currentNView === 'Tipos de insumo' ? 'white' : '',
                                        color: isActionBlock ? 'rgba(255, 255, 255, 0.75)' : currentNView === 'Tipos de insumo' ? 'white' : '',
                                    }}
                                    onClick={() => {
                                        handleNavbarView('Tipos de insumo');
                                        sessionStorage.setItem('Ruta','/Administration/Index/Supplies/Supply/Types');
                                        navigate('/Administration/Index/Supplies/Supply/Types',{ replace: true });
                                    }}
                                >
                                    <Icon_24><FaBoxes/></Icon_24>
                                </Button_Icon_White_100>
                                <Button_Icon_White_100 
                                    disabled={isActionBlock}
                                    style={{ 
                                        backgroundColor: isActionBlock ? 'rgba(84, 88, 89, 0.5)' : currentNView === 'Insumos' ? 'rgba(0, 0, 0, 1)' : '',
                                        borderColor: isActionBlock ? 'rgba(255, 255, 255, 0.75)' : currentNView === 'Insumos' ? 'white' : '',
                                        color: isActionBlock ? 'rgba(255, 255, 255, 0.75)' : currentNView === 'Insumos' ? 'white' : '',
                                    }}
                                    onClick={() => {
                                        handleNavbarView('Insumos');
                                        sessionStorage.setItem('Ruta','/Administration/Index/Supplies/Supplies');
                                        navigate('/Administration/Index/Supplies/Supplies',{ replace: true });
                                    }}
                                >
                                    <Icon_24><FaBoxOpen/></Icon_24>
                                </Button_Icon_White_100>
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
                                <Button_Icon_White_100 
                                    disabled={isActionBlock}
                                    style={{ 
                                        backgroundColor: isActionBlock ? 'rgba(84, 88, 89, 0.5)' : currentNView === 'Categorias de limpieza' ? 'rgba(0, 0, 0, 1)' : '',
                                        borderColor: isActionBlock ? 'rgba(255, 255, 255, 0.75)' : currentNView === 'Categorias de limpieza' ? 'white' : '',
                                        color: isActionBlock ? 'rgba(255, 255, 255, 0.75)' : currentNView === 'Categorias de limpieza' ? 'white' : '',
                                    }}
                                    onClick={() => {
                                        handleNavbarView('Categorias de limpieza');
                                        sessionStorage.setItem('Ruta','/Administration/Index/Extras/Cleaning/Categories');
                                        navigate('/Administration/Index/Extras/Cleaning/Categories',{ replace: true });
                                    }}
                                >
                                    <Icon_24><FaBroom/><GiLiquidSoap/></Icon_24>
                                </Button_Icon_White_100>
                                <Button_Icon_White_100 
                                    disabled={isActionBlock}
                                    style={{ 
                                        backgroundColor: isActionBlock ? 'rgba(84, 88, 89, 0.5)' : currentNView === 'Suministros de limpieza' ? 'rgba(0, 0, 0, 1)' : '',
                                        borderColor: isActionBlock ? 'rgba(255, 255, 255, 0.75)' : currentNView === 'Suministros de limpieza' ? 'white' : '',
                                        color: isActionBlock ? 'rgba(255, 255, 255, 0.75)' : currentNView === 'Suministros de limpieza' ? 'white' : '',
                                    }}
                                    onClick={() => {
                                        handleNavbarView('Suministros de limpieza');
                                        sessionStorage.setItem('Ruta','/Administration/Index/Extras/Cleaning/Supplies');
                                        navigate('/Administration/Index/Extras/Cleaning/Supplies',{ replace: true });
                                    }}
                                >
                                    <Icon_24><FaBoxes/></Icon_24>
                                </Button_Icon_White_100>
                                <Button_Icon_White_100 
                                    disabled={isActionBlock}
                                    style={{ 
                                        backgroundColor: isActionBlock ? 'rgba(84, 88, 89, 0.5)' : currentNView === 'Categorias de gastos fijos' ? 'rgba(0, 0, 0, 1)' : '',
                                        borderColor: isActionBlock ? 'rgba(255, 255, 255, 0.75)' : currentNView === 'Categorias de gastos fijos' ? 'white' : '',
                                        color: isActionBlock ? 'rgba(255, 255, 255, 0.75)' : currentNView === 'Categorias de gastos fijos' ? 'white' : '',
                                    }}
                                    onClick={() => {
                                        handleNavbarView('Categorias de gastos fijos');
                                        sessionStorage.setItem('Ruta','/Administration/Index/Extras/Fixed/Expenses/Categories');
                                        navigate('/Administration/Index/Extras/Fixed/Expenses/Categories',{ replace: true });
                                    }}
                                >
                                    <Icon_24><GiMoneyStack/></Icon_24>
                                </Button_Icon_White_100>
                                <Button_Icon_White_100 
                                    disabled={isActionBlock}
                                    style={{ 
                                        backgroundColor: isActionBlock ? 'rgba(84, 88, 89, 0.5)' : currentNView === 'Articulos de gastos fijos' ? 'rgba(0, 0, 0, 1)' : '',
                                        borderColor: isActionBlock ? 'rgba(255, 255, 255, 0.75)' : currentNView === 'Articulos de gastos fijos' ? 'white' : '',
                                        color: isActionBlock ? 'rgba(255, 255, 255, 0.75)' : currentNView === 'Articulos de gastos fijos' ? 'white' : '',
                                    }}
                                    onClick={() => {
                                        handleNavbarView('Articulos de gastos fijos');
                                        sessionStorage.setItem('Ruta','/Administration/Index/Extras/Fixed/Expenses/Items');
                                        navigate('/Administration/Index/Extras/Fixed/Expenses/Items',{ replace: true });
                                    }}
                                >
                                    <Icon_24><GiMoneyStack/></Icon_24>
                                </Button_Icon_White_100>
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
                                <Button_Icon_White_100 
                                    disabled={isActionBlock}
                                    style={{ 
                                        backgroundColor: isActionBlock ? 'rgba(84, 88, 89, 0.5)' : currentNView === 'Pedidos de insumo' ? 'rgba(0, 0, 0, 1)' : '',
                                        borderColor: isActionBlock ? 'rgba(255, 255, 255, 0.75)' : currentNView === 'Pedidos de insumo' ? 'white' : '',
                                        color: isActionBlock ? 'rgba(255, 255, 255, 0.75)' : currentNView === 'Pedidos de insumo' ? 'white' : '',
                                    }}
                                    onClick={() => {
                                        handleNavbarView('Pedidos de insumo');
                                        sessionStorage.setItem('Ruta','/Administration/Index/Warehouse/Supply/Orders');
                                        navigate('/Administration/Index/Warehouse/Supply/Orders',{ replace: true });
                                    }}
                                >
                                    <Icon_24><MdAssignment/></Icon_24>
                                </Button_Icon_White_100>
                                <Button_Icon_White_100 
                                    disabled={isActionBlock}
                                    style={{ 
                                        backgroundColor: isActionBlock ? 'rgba(84, 88, 89, 0.5)' : currentNView === 'Compras' ? 'rgba(0, 0, 0, 1)' : '',
                                        borderColor: isActionBlock ? 'rgba(255, 255, 255, 0.75)' : currentNView === 'Compras' ? 'white' : '',
                                        color: isActionBlock ? 'rgba(255, 255, 255, 0.75)' : currentNView === 'Compras' ? 'white' : '',
                                    }}
                                    onClick={() => {
                                        handleNavbarView('Compras')
                                        sessionStorage.setItem('Ruta','/Administration/Index/Warehouse/Purchases');
                                        navigate('/Administration/Index/Warehouse/Purchases',{ replace: true });
                                    }}
                                >
                                    <Icon_24><FaCashRegister/><FaPlus/></Icon_24>
                                </Button_Icon_White_100>
                                <Button_Icon_White_100 
                                    disabled={isActionBlock}
                                    style={{ 
                                        backgroundColor: isActionBlock ? 'rgba(84, 88, 89, 0.5)' : currentNView === 'Ventas' ? 'rgba(0, 0, 0, 1)' : '',
                                        borderColor: isActionBlock ? 'rgba(255, 255, 255, 0.75)' : currentNView === 'Ventas' ? 'white' : '',
                                        color: isActionBlock ? 'rgba(255, 255, 255, 0.75)' : currentNView === 'Ventas' ? 'white' : '',
                                    }}
                                    onClick={() => {
                                        handleNavbarView('Ventas')
                                        sessionStorage.setItem('Ruta','/Administration/Index/Warehouse/Sales');
                                        navigate('/Administration/Index/Warehouse/Sales',{ replace: true });
                                    }}
                                >
                                    <Icon_24><FaCashRegister/><FaMinus/></Icon_24>
                                </Button_Icon_White_100>
                                <Button_Icon_White_100 
                                    disabled={isActionBlock}
                                    style={{ 
                                        backgroundColor: isActionBlock ? 'rgba(84, 88, 89, 0.5)' : currentNView === 'Reportes' ? 'rgba(0, 0, 0, 1)' : '',
                                        borderColor: isActionBlock ? 'rgba(255, 255, 255, 0.75)' : currentNView === 'Reportes' ? 'white' : '',
                                        color: isActionBlock ? 'rgba(255, 255, 255, 0.75)' : currentNView === 'Reportes' ? 'white' : '',
                                    }}
                                    onClick={() => {
                                        handleNavbarView('Reportes')
                                        sessionStorage.setItem('Ruta','/Administration/Index/Warehouse/Reports');
                                        navigate('/Administration/Index/Warehouse/Reports',{ replace: true });
                                    }}
                                >
                                    <Icon_24><TbReportAnalytics/></Icon_24>
                                </Button_Icon_White_100>
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
                                <Button_Icon_White_100 
                                    style={{ 
                                        backgroundColor: isActionBlock ? 'rgba(84, 88, 89, 0.5)' : currentNView === 'Menus' ? 'rgba(0, 0, 0, 1)' : '',
                                        borderColor: isActionBlock ? 'rgba(255, 255, 255, 0.75)' : currentNView === 'Menus' ? 'white' : '',
                                        color: isActionBlock ? 'rgba(255, 255, 255, 0.75)' : currentNView === 'Menus' ? 'white' : '',
                                    }}
                                    onClick={() => {
                                        handleNavbarView('Menus');
                                        sessionStorage.setItem('Ruta','/Administration/Index/Menus/Menus');
                                        navigate('/Administration/Index/Menus/Menus',{ replace: true });
                                    }}
                                >
                                    <Icon_24><MdOutlineMenuBook/></Icon_24>
                                </Button_Icon_White_100>
                                <Button_Icon_White_100 
                                    style={{ 
                                        backgroundColor: isActionBlock ? 'rgba(84, 88, 89, 0.5)' : currentNView === 'Platillos' ? 'rgba(0, 0, 0, 1)' : '',
                                        borderColor: isActionBlock ? 'rgba(255, 255, 255, 0.75)' : currentNView === 'Platillos' ? 'white' : '',
                                        color: isActionBlock ? 'rgba(255, 255, 255, 0.75)' : currentNView === 'Platillos' ? 'white' : '',
                                    }}
                                    onClick={() => {
                                        handleNavbarView('Platillos')
                                        sessionStorage.setItem('Ruta','/Administration/Index/Menus/Dishes');
                                        navigate('/Administration/Index/Menus/Dishes',{ replace: true });
                                    }}
                                >
                                    <Icon_24><GiMeal/></Icon_24>
                                </Button_Icon_White_100>
                                <Button_Icon_White_100 
                                    style={{ 
                                        backgroundColor: isActionBlock ? 'rgba(84, 88, 89, 0.5)' : currentNView === 'Guarniciones' ? 'rgba(0, 0, 0, 1)' : '',
                                        borderColor: isActionBlock ? 'rgba(255, 255, 255, 0.75)' : currentNView === 'Guarniciones' ? 'white' : '',
                                        color: isActionBlock ? 'rgba(255, 255, 255, 0.75)' : currentNView === 'Guarniciones' ? 'white' : '',
                                    }}
                                    onClick={() => {
                                        handleNavbarView('Guarniciones')
                                        sessionStorage.setItem('Ruta','/Administration/Index/Menus/Side/Dishes');
                                        navigate('/Administration/Index/Menus/Side/Dishes',{ replace: true });
                                    }}
                                >
                                    <Icon_24><GiBowlOfRice/></Icon_24>
                                </Button_Icon_White_100>
                                <Button_Icon_White_100 
                                    style={{ 
                                        backgroundColor: isActionBlock ? 'rgba(84, 88, 89, 0.5)' : currentNView === 'Bebidas' ? 'rgba(0, 0, 0, 1)' : '',
                                        borderColor: isActionBlock ? 'rgba(255, 255, 255, 0.75)' : currentNView === 'Bebidas' ? 'white' : '',
                                        color: isActionBlock ? 'rgba(255, 255, 255, 0.75)' : currentNView === 'Bebidas' ? 'white' : '',
                                    }}
                                    onClick={() => {
                                        handleNavbarView('Bebidas')
                                        sessionStorage.setItem('Ruta','/Administration/Index/Menus/Drinks');
                                        navigate('/Administration/Index/Menus/Drinks',{ replace: true });
                                    }}
                                >
                                    <Icon_24><GiGlassShot/></Icon_24>
                                </Button_Icon_White_100>
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
                                                navigate(isTypeUser === 'Cocinero' || isTypeUser === 'Nutriólogo' || isTypeUser === 'Médico' ? '/Kitchen/Out_Login' : '/Administration/Out_Login',{ replace: true });
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