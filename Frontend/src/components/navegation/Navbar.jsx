//____________IMPORT/EXPORT____________
// Hooks de React
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
// Componentes de React externos
import { Tooltip } from "@mui/material";
// Contextos
import { ThemeModeContext,NavbarViewContext,SidebarViewContext } from "../../contexts/ViewsProvider";
// Hooks personalizados
import { HandleNavbarView } from "../../hooks/Views";
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
//__________ICONOS__________
// Estilos personalizados
import { Container_Row_White_Width_98_Left,Container_Row_Blue_Width_92_Left } from "../styled/Containers";
import { Img_Logo_Hospital_70 } from '../styled/Imgs';
import { Button_Icon_White_100 } from '../styled/Buttons';
import { Icon_22 } from "../styled/Icons";
import { Text_Title_26_Center } from '../styled/Text';
//____________IMPORT/EXPORT____________

// Componente para navegar entre las paginas en la parte superior 
export default function Nav_Bar(){
    // Constantes con el valor de los contextos 
    const [themeMode] = useContext(ThemeModeContext);
    const [currentNView] = useContext(NavbarViewContext);
    const [currentSView] = useContext(SidebarViewContext);
    // Constantes con la funcionalidad de los hooks
    const navigate = useNavigate();
    const handleNavbarView = HandleNavbarView();
    // Estructura del componente
    return(
        <>
            <Container_Row_White_Width_98_Left ThemeMode={themeMode}> 
                <Img_Logo_Hospital_70 ThemeMode={themeMode}/> 
                <Container_Row_Blue_Width_92_Left ThemeMode={themeMode}>
                    {currentSView === 'Usuarios' ? (
                        <>
                            <Tooltip title='Usuarios' placement="top">
                                <Button_Icon_White_100 ThemeMode={themeMode} onClick={() => {
                                    handleNavbarView('Usuarios');
                                    sessionStorage.setItem('Ruta','/Administration/Index/Users/Users');
                                    navigate('/Administration/Index/Users/Users',{ replace: true });
                                }}>
                                    <Icon_22><FaUser/></Icon_22>
                                </Button_Icon_White_100>
                            </Tooltip>
                            <Tooltip title='Permisos de usuarios' placement="top">
                                <Button_Icon_White_100 ThemeMode={themeMode} onClick={() => {
                                    handleNavbarView('Permisos')
                                    sessionStorage.setItem('Ruta','/Administration/Index/Users/Permissions');
                                    navigate('/Administration/Index/Users/Permissions',{ replace: true });
                                }}>
                                    <Icon_22><IoShieldHalfSharp/></Icon_22>
                                </Button_Icon_White_100>
                            </Tooltip>
                            <Tooltip title='Estatus de usuarios' placement="top">
                                <Button_Icon_White_100 ThemeMode={themeMode} onClick={() => {
                                    handleNavbarView('Estatus')
                                    sessionStorage.setItem('Ruta','/Administration/Index/Users/Status');
                                    navigate('/Administration/Index/Users/Status',{ replace: true });
                                }}>
                                    <Icon_22><IoIosLock/></Icon_22>
                                </Button_Icon_White_100>
                            </Tooltip>
                            {currentNView === 'Usuarios' ? (
                                <Text_Title_26_Center ThemeMode={themeMode}>USUARIOS</Text_Title_26_Center>
                            ):(
                                <></>
                            )}
                            {currentNView === 'Permisos' ? (
                                <Text_Title_26_Center ThemeMode={themeMode}>PERMISOS DE USUARIOS</Text_Title_26_Center>
                            ):(
                                <></>
                            )}
                            {currentNView === 'Estatus' ? (
                                <Text_Title_26_Center ThemeMode={themeMode}>ESTATUS DE USUARIOS</Text_Title_26_Center>
                            ):(
                                <></>
                            )}
                        </>
                    ):(
                        <></>
                    )}
                    {currentSView === 'Proveedores' ? (
                        <>
                            <Tooltip title='Proveedores' placement="top">
                                <Button_Icon_White_100 ThemeMode={themeMode} onClick={() => {
                                    handleNavbarView('Proveedores');
                                    sessionStorage.setItem('Ruta','/Administration/Index/Suppliers/Suppliers');
                                    navigate('/Administration/Index/Suppliers/Suppliers',{ replace: true });
                                }}>
                                    <Icon_22><FaStore/></Icon_22>
                                </Button_Icon_White_100>
                            </Tooltip>
                            <Tooltip title='Observaciones de proveedores' placement="top">
                                <Button_Icon_White_100 ThemeMode={themeMode} onClick={() => {
                                    handleNavbarView('Observaciones de proveedores');
                                    sessionStorage.setItem('Ruta','/Administration/Index/Suppliers/Observations');
                                    navigate('/Administration/Index/Suppliers/Observations',{ replace: true });
                                }}>
                                    <Icon_22><MdSpeakerNotes/></Icon_22>
                                </Button_Icon_White_100>
                            </Tooltip>
                            <Tooltip title='Categorías por insumo' placement="top">
                                <Button_Icon_White_100 ThemeMode={themeMode} onClick={() => {
                                    handleNavbarView('Categorias por insumo');
                                    sessionStorage.setItem('Ruta','/Administration/Index/Suppliers/Supply/Categories');
                                    navigate('/Administration/Index/Suppliers/Supply/Categories',{ replace: true });
                                }}>
                                    <Icon_22><GiFruitBowl/><GiMilkCarton/><GiMeat/></Icon_22>
                                </Button_Icon_White_100>
                            </Tooltip>
                            <Tooltip title='Tipos de insumo' placement="top">
                                <Button_Icon_White_100 ThemeMode={themeMode} onClick={() => {
                                    handleNavbarView('Tipos de insumo');
                                    sessionStorage.setItem('Ruta','/Administration/Index/Suppliers/Supply/Types');
                                    navigate('/Administration/Index/Suppliers/Supply/Types',{ replace: true });
                                }}>
                                    <Icon_22><FaBoxes/></Icon_22>
                                </Button_Icon_White_100>
                            </Tooltip>
                            <Tooltip title='Insumos' placement="top">
                                <Button_Icon_White_100 ThemeMode={themeMode} onClick={() => {
                                    handleNavbarView('Insumos');
                                    sessionStorage.setItem('Ruta','/Administration/Index/Suppliers/Supplies');
                                    navigate('/Administration/Index/Suppliers/Supplies',{ replace: true });
                                }}>
                                    <Icon_22><FaBoxOpen/></Icon_22>
                                </Button_Icon_White_100>
                            </Tooltip>
                            {currentNView === 'Proveedores' ? (
                                <Text_Title_26_Center ThemeMode={themeMode}>PROVEEDORES</Text_Title_26_Center>
                            ):(
                                <></>
                                
                            )}
                            {currentNView === 'Observaciones de proveedores' ? (
                                <Text_Title_26_Center ThemeMode={themeMode}>OBSERVACIONES</Text_Title_26_Center>
                            ):(
                                <></>
                            )}
                            {currentNView === 'Categorias por insumo' ? (
                                <Text_Title_26_Center ThemeMode={themeMode}>CATEGORÍAS POR INSUMO</Text_Title_26_Center>
                            ):(
                                <></>
                            )}
                            {currentNView === 'Tipos de insumo' ? (
                                <Text_Title_26_Center ThemeMode={themeMode}>TIPOS DE INSUMO</Text_Title_26_Center>
                            ):(
                                <></>
                            )}
                            {currentNView === 'Insumos' ? (
                                <Text_Title_26_Center ThemeMode={themeMode}>INSUMOS</Text_Title_26_Center>
                            ):(
                                <></>
                            )}
                        </>
                    ):(
                        <></>
                    )}
                    {currentSView === 'Inventario' ? (
                        <>
                            <Tooltip title='Pedidos de insumo' placement="top">
                                <Button_Icon_White_100 ThemeMode={themeMode} onClick={() => {
                                    handleNavbarView('Pedidos de insumo');
                                    sessionStorage.setItem('Ruta','/Administration/Index/Warehouse/Supply/Orders');
                                    navigate('/Administration/Index/Warehouse/Supply/Orders',{ replace: true });
                                }}>
                                    <Icon_22><MdAssignment/></Icon_22>
                                </Button_Icon_White_100>
                            </Tooltip>
                            <Tooltip title='Compras' placement="top">
                                <Button_Icon_White_100 ThemeMode={themeMode} onClick={() => {
                                    handleNavbarView('Compras')
                                    sessionStorage.setItem('Ruta','/Administration/Index/Warehouse/Purchases');
                                    navigate('/Administration/Index/Warehouse/Purchases',{ replace: true });
                                }}>
                                    <Icon_22><FaCashRegister/><FaPlus/></Icon_22>
                                </Button_Icon_White_100>
                            </Tooltip>
                            <Tooltip title='Ventas' placement="top">
                                <Button_Icon_White_100 ThemeMode={themeMode} onClick={() => {
                                    handleNavbarView('Ventas')
                                    sessionStorage.setItem('Ruta','/Administration/Index/Warehouse/Sales');
                                    navigate('/Administration/Index/Warehouse/Sales',{ replace: true });
                                }}>
                                    <Icon_22><FaCashRegister/><FaMinus/></Icon_22>
                                </Button_Icon_White_100>
                            </Tooltip>
                            <Tooltip title='Reportes' placement="top">
                                <Button_Icon_White_100 ThemeMode={themeMode} onClick={() => {
                                    handleNavbarView('Reportes')
                                    sessionStorage.setItem('Ruta','/Administration/Index/Warehouse/Reports');
                                    navigate('/Administration/Index/Warehouse/Reports',{ replace: true });
                                }}>
                                    <Icon_22><TbReportAnalytics/></Icon_22>
                                </Button_Icon_White_100>
                            </Tooltip>
                            {currentNView === 'Pedidos de insumo' ? (
                                <Text_Title_26_Center ThemeMode={themeMode}>PEDIDOS DE INSUMOS</Text_Title_26_Center>
                            ):(
                                <></>
                                
                            )}
                            {currentNView === 'Compras' ? (
                                <Text_Title_26_Center ThemeMode={themeMode}>COMPRAS</Text_Title_26_Center>
                            ):(
                                <></>
                            )}
                            {currentNView === 'Ventas' ? (
                                <Text_Title_26_Center ThemeMode={themeMode}>VENTAS</Text_Title_26_Center>
                            ):(
                                <></>
                            )}
                            {currentNView === 'Reportes' ? (
                                <Text_Title_26_Center ThemeMode={themeMode}>REPORTES</Text_Title_26_Center>
                            ):(
                                <></>
                            )}
                        </>
                    ):(
                        <></>
                    )}

                    {currentSView === 'Menus' ? (
                        <>
                            <Tooltip title='Menus' placement="top">
                                <Button_Icon_White_100 ThemeMode={themeMode} onClick={() => {
                                    handleNavbarView('Menus');
                                    sessionStorage.setItem('Ruta','/Administration/Index/Menus');
                                    navigate('/Administration/Index/Menus',{ replace: true });
                                }}>
                                    <Icon_22><MdOutlineMenuBook/></Icon_22>
                                </Button_Icon_White_100>
                            </Tooltip>
                            <Tooltip title='Desayunos' placement="top">
                                <Button_Icon_White_100 ThemeMode={themeMode} onClick={() => {
                                    handleNavbarView('Desayunos')
                                    sessionStorage.setItem('Ruta','/Administration/Index/Breakfasts');
                                    navigate('/Administration/Index/Breakfasts',{ replace: true });
                                }}>
                                    <Icon_22><MdFreeBreakfast/></Icon_22>
                                </Button_Icon_White_100>
                            </Tooltip>
                            <Tooltip title='Comidas' placement="top">
                                <Button_Icon_White_100 ThemeMode={themeMode} onClick={() => {
                                    handleNavbarView('Comidas')
                                    sessionStorage.setItem('Ruta','/Administration/Index/Meals');
                                    navigate('/Administration/Index/Meals',{ replace: true });
                                }}>
                                    <Icon_22><GiMeal/></Icon_22>
                                </Button_Icon_White_100>
                            </Tooltip>
                            <Tooltip title='Cenas' placement="top">
                                <Button_Icon_White_100 ThemeMode={themeMode} onClick={() => {
                                    handleNavbarView('Cenas')
                                    sessionStorage.setItem('Ruta','/Administration/Index/Dinners');
                                    navigate('/Administration/Index/Dinners',{ replace: true });
                                }}>
                                    <Icon_22><MdDinnerDining/></Icon_22>
                                </Button_Icon_White_100>
                            </Tooltip>
                            {currentNView === 'Menus' ? (
                                <Text_Title_26_Center ThemeMode={themeMode}>MENÚS</Text_Title_26_Center>
                            ):(
                                <></>
                                
                            )}
                            {currentNView === 'Desayunos' ? (
                                <Text_Title_26_Center ThemeMode={themeMode}>DESAYUNOS</Text_Title_26_Center>
                            ):(
                                <></>
                            )}
                            {currentNView === 'Comidas' ? (
                                <Text_Title_26_Center ThemeMode={themeMode}>COMIDAS</Text_Title_26_Center>
                            ):(
                                <></>
                            )}
                            {currentNView === 'Cenas' ? (
                                <Text_Title_26_Center ThemeMode={themeMode}>CENAS</Text_Title_26_Center>
                            ):(
                                <></>
                            )}
                        </>
                    ):(
                        <></>
                    )}
                </Container_Row_Blue_Width_92_Left>
            </Container_Row_White_Width_98_Left>  
        </>
    );
}