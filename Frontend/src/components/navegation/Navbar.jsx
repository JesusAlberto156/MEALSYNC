//____________IMPORT/EXPORT____________
// Hooks de React
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
// Componentes de React externos
import { Tooltip } from "@mui/material";
// Contextos
import { NavbarViewContext,SidebarViewContext,SidebarContext } from "../../contexts/ViewsProvider";
import { LoggedLoggedContext,LoggedTypeContext } from "../../contexts/SessionProvider";
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
import { GiFruitBowl } from "react-icons/gi";
import { GiMilkCarton } from "react-icons/gi";
import { GiMeat } from "react-icons/gi";
import { FaBoxes } from "react-icons/fa";
import { FaBoxOpen } from "react-icons/fa6";
// Iconos para la sección de inventario del navbar
import { MdAssignment } from "react-icons/md";
import { FaCashRegister } from "react-icons/fa";
import { FaPlus } from "react-icons/fa";
import { FaMinus } from "react-icons/fa";
import { TbReportAnalytics } from "react-icons/tb";
// Iconos para la seccion de menus del navbar
import { MdOutlineMenuBook } from "react-icons/md";
import { MdFreeBreakfast } from "react-icons/md";
import { GiMeal } from "react-icons/gi";
import { MdDinnerDining } from "react-icons/md";
// Iconos para el toggle
import { BiSolidToggleLeft } from "react-icons/bi";
import { BiSolidToggleRight } from "react-icons/bi";
// Icono para el logout
import { ImExit } from "react-icons/im";
//__________ICONOS__________
// Estilos personalizados
import { Container_Navbar_Row_General_White,Container_Navbar_Row_General,Container_Navbar_Row_Function_Blue,Container_Navbar_Row_Function,Container_Navbar_Text,Container_Navbar_Row_Buttom } from "../styled/Containers";
import { Button_Icon_Gray_100,Button_Icon_Blue_80,Button_Icon_Red_80 } from '../styled/Buttons';
import { Icon_16,Icon_24 } from "../styled/Icons";
import { Text_Title_24_White } from '../styled/Text';
import { Image_Navbar } from "../styled/Imgs";
//____________IMPORT/EXPORT____________

// Componente para navegar entre las paginas en la parte superior 
export default function Nav_Bar(){
    // Constantes con el valor de los contextos 
    const [currentNView] = useContext(NavbarViewContext);
    const [currentSView] = useContext(SidebarViewContext);
    const [isLogged] = useContext(LoggedLoggedContext);
    const [isTypeUser] = useContext(LoggedTypeContext);
    const [isSidebar] = useContext(SidebarContext);
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
                    <Image_Navbar src={Logo_Hospital}/>  
                    <Container_Navbar_Row_Function_Blue>
                        <Container_Navbar_Row_Function>
                            {currentSView === 'Usuarios' ? (
                                <>
                                    <Tooltip title='Usuarios' placement="bottom">
                                        <Button_Icon_Gray_100 onClick={() => {
                                            handleNavbarView('Usuarios');
                                            sessionStorage.setItem('Ruta','/Administration/Index/Users/Users');
                                            navigate('/Administration/Index/Users/Users',{ replace: true });
                                        }}>
                                            <Icon_24><FaUser/></Icon_24>
                                        </Button_Icon_Gray_100>
                                    </Tooltip>
                                    <Tooltip title='Permisos de usuarios' placement="bottom">
                                        <Button_Icon_Gray_100 onClick={() => {
                                            handleNavbarView('Permisos')
                                            sessionStorage.setItem('Ruta','/Administration/Index/Users/Permissions');
                                            navigate('/Administration/Index/Users/Permissions',{ replace: true });
                                        }}>
                                            <Icon_24><IoShieldHalfSharp/></Icon_24>
                                        </Button_Icon_Gray_100>
                                    </Tooltip>
                                    <Tooltip title='Estatus de usuarios' placement="bottom">
                                        <Button_Icon_Gray_100 onClick={() => {
                                            handleNavbarView('Estatus')
                                            sessionStorage.setItem('Ruta','/Administration/Index/Users/Status');
                                            navigate('/Administration/Index/Users/Status',{ replace: true });
                                        }}>
                                            <Icon_24><IoIosLock/></Icon_24>
                                        </Button_Icon_Gray_100>
                                    </Tooltip>
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
                                    <Tooltip title='Proveedores' placement="bottom">
                                        <Button_Icon_Gray_100 onClick={() => {
                                            handleNavbarView('Proveedores');
                                            sessionStorage.setItem('Ruta','/Administration/Index/Suppliers/Suppliers');
                                            navigate('/Administration/Index/Suppliers/Suppliers',{ replace: true });
                                        }}>
                                            <Icon_24><FaStore/></Icon_24>
                                        </Button_Icon_Gray_100>
                                    </Tooltip>
                                    <Tooltip title='Observaciones de proveedores' placement="bottom">
                                        <Button_Icon_Gray_100 onClick={() => {
                                            handleNavbarView('Observaciones de proveedores');
                                            sessionStorage.setItem('Ruta','/Administration/Index/Suppliers/Observations');
                                            navigate('/Administration/Index/Suppliers/Observations',{ replace: true });
                                        }}>
                                            <Icon_24><MdSpeakerNotes/></Icon_24>
                                        </Button_Icon_Gray_100>
                                    </Tooltip>
                                    <Tooltip title='Categorías por insumo' placement="bottom">
                                        <Button_Icon_Gray_100 onClick={() => {
                                            handleNavbarView('Categorias por insumo');
                                            sessionStorage.setItem('Ruta','/Administration/Index/Suppliers/Supply/Categories');
                                            navigate('/Administration/Index/Suppliers/Supply/Categories',{ replace: true });
                                        }}>
                                            <Icon_24><GiFruitBowl/><GiMilkCarton/><GiMeat/></Icon_24>
                                        </Button_Icon_Gray_100>
                                    </Tooltip>
                                    <Tooltip title='Tipos de insumo' placement="bottom">
                                        <Button_Icon_Gray_100 onClick={() => {
                                            handleNavbarView('Tipos de insumo');
                                            sessionStorage.setItem('Ruta','/Administration/Index/Suppliers/Supply/Types');
                                            navigate('/Administration/Index/Suppliers/Supply/Types',{ replace: true });
                                        }}>
                                            <Icon_24><FaBoxes/></Icon_24>
                                        </Button_Icon_Gray_100>
                                    </Tooltip>
                                    <Tooltip title='Insumos' placement="bottom">
                                        <Button_Icon_Gray_100 onClick={() => {
                                            handleNavbarView('Insumos');
                                            sessionStorage.setItem('Ruta','/Administration/Index/Suppliers/Supplies');
                                            navigate('/Administration/Index/Suppliers/Supplies',{ replace: true });
                                        }}>
                                            <Icon_24><FaBoxOpen/></Icon_24>
                                        </Button_Icon_Gray_100>
                                    </Tooltip>
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
                            {currentSView === 'Inventario' ? (
                                <>
                                    <Tooltip title='Pedidos de insumo' placement="bottom">
                                        <Button_Icon_Gray_100 onClick={() => {
                                            handleNavbarView('Pedidos de insumo');
                                            sessionStorage.setItem('Ruta','/Administration/Index/Warehouse/Supply/Orders');
                                            navigate('/Administration/Index/Warehouse/Supply/Orders',{ replace: true });
                                        }}>
                                            <Icon_24><MdAssignment/></Icon_24>
                                        </Button_Icon_Gray_100>
                                    </Tooltip>
                                    <Tooltip title='Compras' placement="bottom">
                                        <Button_Icon_Gray_100 onClick={() => {
                                            handleNavbarView('Compras')
                                            sessionStorage.setItem('Ruta','/Administration/Index/Warehouse/Purchases');
                                            navigate('/Administration/Index/Warehouse/Purchases',{ replace: true });
                                        }}>
                                            <Icon_24><FaCashRegister/><FaPlus/></Icon_24>
                                        </Button_Icon_Gray_100>
                                    </Tooltip>
                                    <Tooltip title='Ventas' placement="bottom">
                                        <Button_Icon_Gray_100 onClick={() => {
                                            handleNavbarView('Ventas')
                                            sessionStorage.setItem('Ruta','/Administration/Index/Warehouse/Sales');
                                            navigate('/Administration/Index/Warehouse/Sales',{ replace: true });
                                        }}>
                                            <Icon_24><FaCashRegister/><FaMinus/></Icon_24>
                                        </Button_Icon_Gray_100>
                                    </Tooltip>
                                    <Tooltip title='Reportes' placement="bottom">
                                        <Button_Icon_Gray_100 onClick={() => {
                                            handleNavbarView('Reportes')
                                            sessionStorage.setItem('Ruta','/Administration/Index/Warehouse/Reports');
                                            navigate('/Administration/Index/Warehouse/Reports',{ replace: true });
                                        }}>
                                            <Icon_24><TbReportAnalytics/></Icon_24>
                                        </Button_Icon_Gray_100>
                                    </Tooltip>
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
                                    <Tooltip title='Menus' placement="bottom">
                                        <Button_Icon_Gray_100 onClick={() => {
                                            handleNavbarView('Menus');
                                            sessionStorage.setItem('Ruta','/Administration/Index/Menus');
                                            navigate('/Administration/Index/Menus',{ replace: true });
                                        }}>
                                            <Icon_24><MdOutlineMenuBook/></Icon_24>
                                        </Button_Icon_Gray_100>
                                    </Tooltip>
                                    <Tooltip title='Desayunos' placement="bottom">
                                        <Button_Icon_Gray_100 onClick={() => {
                                            handleNavbarView('Desayunos')
                                            sessionStorage.setItem('Ruta','/Administration/Index/Breakfasts');
                                            navigate('/Administration/Index/Breakfasts',{ replace: true });
                                        }}>
                                            <Icon_24><MdFreeBreakfast/></Icon_24>
                                        </Button_Icon_Gray_100>
                                    </Tooltip>
                                    <Tooltip title='Comidas' placement="bottom">
                                        <Button_Icon_Gray_100 onClick={() => {
                                            handleNavbarView('Comidas')
                                            sessionStorage.setItem('Ruta','/Administration/Index/Meals');
                                            navigate('/Administration/Index/Meals',{ replace: true });
                                        }}>
                                            <Icon_24><GiMeal/></Icon_24>
                                        </Button_Icon_Gray_100>
                                    </Tooltip>
                                    <Tooltip title='Cenas' placement="bottom">
                                        <Button_Icon_Gray_100 onClick={() => {
                                            handleNavbarView('Cenas')
                                            sessionStorage.setItem('Ruta','/Administration/Index/Dinners');
                                            navigate('/Administration/Index/Dinners',{ replace: true });
                                        }}>
                                            <Icon_24><MdDinnerDining/></Icon_24>
                                        </Button_Icon_Gray_100>
                                    </Tooltip>
                                    {currentNView === 'Menus' ? (
                                        <Container_Navbar_Text>
                                            <Text_Title_24_White>MENÚS</Text_Title_24_White>
                                        </Container_Navbar_Text>
                                    ):(
                                        <></>
                                        
                                    )}
                                    {currentNView === 'Desayunos' ? (
                                        <Container_Navbar_Text>
                                            <Text_Title_24_White>DESAYUNOS</Text_Title_24_White>
                                        </Container_Navbar_Text>
                                    ):(
                                        <></>
                                    )}
                                    {currentNView === 'Comidas' ? (
                                        <Container_Navbar_Text>
                                            <Text_Title_24_White>COMIDAS</Text_Title_24_White>
                                        </Container_Navbar_Text>
                                    ):(
                                        <></>
                                    )}
                                    {currentNView === 'Cenas' ? (
                                        <Container_Navbar_Text>
                                            <Text_Title_24_White>CENAS</Text_Title_24_White>
                                        </Container_Navbar_Text>
                                    ):(
                                        <></>
                                    )}
                                </>
                            ):(
                                <></>
                            )}
                        </Container_Navbar_Row_Function>
                    </Container_Navbar_Row_Function_Blue>
                    {isLogged ? (
                        <>  
                            <Container_Navbar_Row_Buttom>
                                <Tooltip title='Cerrar sesión' placement="bottom">
                                    <Button_Icon_Red_80 onClick={() => {
                                        handleModalView('Cerrar-Sesión');
                                        navigate(isTypeUser === 'Cocinero' || isTypeUser === 'Nutriólogo' || isTypeUser === 'Médico' ? '/Kitchen/Out_Login' : '/Administration/Out_Login',{ replace: true });
                                    }}>
                                        <Icon_16><ImExit/></Icon_16>
                                    </Button_Icon_Red_80>
                                </Tooltip>
                                <Tooltip title={isSidebar ? 'Ocultar' : 'Mostrar'} placement="bottom">
                                    <Button_Icon_Blue_80 onClick={() => toggleSidebar()}>
                                        {isSidebar ? <Icon_16><BiSolidToggleRight/></Icon_16> : <Icon_16><BiSolidToggleLeft/></Icon_16>}
                                    </Button_Icon_Blue_80>
                                </Tooltip>
                            </Container_Navbar_Row_Buttom>
                        </>
                    ):(
                        <></>
                    )}
                </Container_Navbar_Row_General>
            </Container_Navbar_Row_General_White>  
        </>
    );
}