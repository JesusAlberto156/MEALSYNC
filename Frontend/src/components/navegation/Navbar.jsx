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
// Iconos para la sección de inventario del navbar
import { FaWarehouse } from "react-icons/fa";
import { FaBoxes } from "react-icons/fa";
import { FaBoxOpen } from "react-icons/fa";
// Iconos para la seccion de menus del navbar
import { MdOutlineMenuBook } from "react-icons/md";
import { MdFreeBreakfast } from "react-icons/md";
import { GiMeal } from "react-icons/gi";
import { MdDinnerDining } from "react-icons/md";

import { RiRecordMailFill } from "react-icons/ri";
//__________ICONOS__________
// Estilos personalizados
import { Container_Row_White_Width_98_Left,Container_Row_Blue_Width_92_Left } from "../styled/Containers";
import { Img_Logo_Hospital_70 } from '../styled/Imgs';
import { Button_Icon_White_80,Button_Icon_White_100 } from '../styled/Buttons';
import { Icon_22 } from "../styled/Icons";
import { Text_Title_30_Center,Text_Title_26_Center } from '../styled/Text';

// Componentes personalizados

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
                                    sessionStorage.setItem('Ruta','/Administration/Index/Users');
                                    navigate('/Administration/Index/Users',{ replace: true });
                                }}>
                                    <Icon_22><FaUser/></Icon_22>
                                </Button_Icon_White_100>
                            </Tooltip>
                            <Tooltip title='Permisos' placement="top">
                                <Button_Icon_White_100 ThemeMode={themeMode} onClick={() => {
                                    handleNavbarView('Permisos')
                                    sessionStorage.setItem('Ruta','/Administration/Index/Permissions');
                                    navigate('/Administration/Index/Permissions',{ replace: true });
                                }}>
                                    <Icon_22><IoShieldHalfSharp/></Icon_22>
                                </Button_Icon_White_100>
                            </Tooltip>
                            <Tooltip title='Estatus' placement="top">
                                <Button_Icon_White_100 ThemeMode={themeMode} onClick={() => {
                                    handleNavbarView('Estatus')
                                    sessionStorage.setItem('Ruta','/Administration/Index/Status');
                                    navigate('/Administration/Index/Status',{ replace: true });
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
                                <Text_Title_26_Center ThemeMode={themeMode}>PERMISOS</Text_Title_26_Center>
                            ):(
                                <></>
                            )}
                            {currentNView === 'Estatus' ? (
                                <Text_Title_26_Center ThemeMode={themeMode}>ESTATUS</Text_Title_26_Center>
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
                                sessionStorage.setItem('Ruta','/Administration/Index/Suppliers');
                                navigate('/Administration/Index/Suppliers',{ replace: true });
                            }}>
                                <Icon_22><FaStore/></Icon_22>
                            </Button_Icon_White_100>
                        </Tooltip>
                        <Tooltip title='Observaciones' placement="top">
                            <Button_Icon_White_100 ThemeMode={themeMode} onClick={() => {
                                handleNavbarView('Observaciones');
                                sessionStorage.setItem('Ruta','/Administration/Index/Observations');
                                navigate('/Administration/Index/Observations',{ replace: true });
                            }}>
                                <Icon_22><MdSpeakerNotes/></Icon_22>
                            </Button_Icon_White_100>
                        </Tooltip>
                        {currentNView === 'Proveedores' ? (
                            <Text_Title_26_Center ThemeMode={themeMode}>PROVEEDORES</Text_Title_26_Center>
                        ):(
                            <></>
                            
                        )}
                        {currentNView === 'Observaciones' ? (
                            <Text_Title_26_Center ThemeMode={themeMode}>OBSERVACIONES</Text_Title_26_Center>
                        ):(
                            <></>
                        )}
                    </>
                    ):(
                        <></>
                    )}
                    {currentSView === 'Inventario' ? (
                        <>
                            <Tooltip title='Inventario' placement="top">
                                <Button_Icon_White_100 ThemeMode={themeMode} onClick={() => {
                                    handleNavbarView('Inventario');
                                    sessionStorage.setItem('Ruta','/Administration/Index/Warehouse');
                                    navigate('/Administration/Index/Warehouse',{ replace: true });
                                }}>
                                    <Icon_22><FaWarehouse/></Icon_22>
                                </Button_Icon_White_100>
                            </Tooltip>
                            <Tooltip title='Insumos' placement="top">
                                <Button_Icon_White_100 ThemeMode={themeMode} onClick={() => {
                                    handleNavbarView('Insumos')
                                    sessionStorage.setItem('Ruta','/Administration/Index/Supplies');
                                    navigate('/Administration/Index/Supplies',{ replace: true });
                                }}>
                                    <Icon_22><FaBoxes/></Icon_22>
                                </Button_Icon_White_100>
                            </Tooltip>
                            <Tooltip title='Tipos de Insumo' placement="top">
                                <Button_Icon_White_100 ThemeMode={themeMode} onClick={() => {
                                    handleNavbarView('Tipos-Insumo')
                                    sessionStorage.setItem('Ruta','/Administration/Index/Supply-Types');
                                    navigate('/Administration/Index/Supply-Types',{ replace: true });
                                }}>
                                    <Icon_22><FaBoxOpen/></Icon_22>
                                </Button_Icon_White_100>
                            </Tooltip>
                            {currentNView === 'Inventario' ? (
                                <Text_Title_26_Center ThemeMode={themeMode}>INVENTARIO</Text_Title_26_Center>
                            ):(
                                <></>
                                
                            )}
                            {currentNView === 'Insumos' ? (
                                <Text_Title_26_Center ThemeMode={themeMode}>INSUMOS</Text_Title_26_Center>
                            ):(
                                <></>
                            )}
                            {currentNView === 'Tipos-Insumo' ? (
                                <Text_Title_26_Center ThemeMode={themeMode}>TIPOS DE INSUMOS</Text_Title_26_Center>
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

                    {currentSView === 'Record' ? (
                        <>
                        <Tooltip title='General' placement="top">
                            <Button_Icon_White_80 ThemeMode={themeMode} onClick={() => {
                                handleChangeNavbar('General');
                                navigate('/Administration/Record/General',{ replace: true });
                            }}>
                                <RiRecordMailFill/>
                            </Button_Icon_White_80>
                        </Tooltip>
                        <Tooltip title='Inventario' placement="top">
                            <Button_Icon_White_80 ThemeMode={themeMode} onClick={() => {
                                handleChangeNavbar('Inventory');
                                navigate('/Administration/Record/Inventory',{ replace: true });
                            }}>
                                <FaWarehouse/>
                            </Button_Icon_White_80>
                        </Tooltip>
                        <Tooltip title='Proveedores' placement="top">
                            <Button_Icon_White_80 ThemeMode={themeMode} onClick={() => {
                                handleChangeNavbar('Suppliers')
                                navigate('/Administration/Record/Suppliers',{ replace: true });
                            }}>
                                <FaUserTie/>
                            </Button_Icon_White_80>
                        </Tooltip>
                        {currentNView === 'General' ? (
                            <Text_Title_30_Center ThemeMode={themeMode}>GENERAL</Text_Title_30_Center>
                        ):(
                            <></>
                            
                        )}
                        {currentNView === 'Inventory' ? (
                            <Text_Title_30_Center ThemeMode={themeMode}>INVENTARIO</Text_Title_30_Center>
                        ):(
                            <></>
                            
                        )}
                        {currentNView === 'Ingredients' ? (
                            <Text_Title_30_Center ThemeMode={themeMode}>PROVEEDORES</Text_Title_30_Center>
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