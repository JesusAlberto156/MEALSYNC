//____________IMPORT/EXPORT____________
// Hooks de React
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
// Componentes de React externos
import { Tooltip } from "@mui/material";
// Contextos
import { ThemeModeContext,NavbarViewContext,SidebarViewContext } from "../../contexts/ViewsProvider";
// Hooks personalizados
import { HandleChangeNavbar } from "../../hooks/Views";
//__________ICONOS__________
// Iconos para la opcion de usuarios del navbar
import { FaUserTag } from "react-icons/fa6";
import { FaUserLock } from "react-icons/fa6";
import { FaUserClock } from "react-icons/fa6";
// Iconos para la opcion de proveedores del navbar
import { FaUserTie } from "react-icons/fa6";
import { MdSpeakerNotes } from "react-icons/md";
// Iconos para la sección de inventario del navbar
import { FaWarehouse } from "react-icons/fa";
import { MdFastfood } from "react-icons/md";

import { RiRecordMailFill } from "react-icons/ri";
//__________ICONOS__________
// Estilos personalizados
import { Container_Nav_Bar,Container_Nav_Bar_Button } from "../styled/Containers";
import { Img_Logo_Hospital_60 } from '../styled/Imgs';
import { Button_Icon_White_100 } from '../styled/Buttons';
import { Text_Title_30_Center } from '../styled/Text';

// Componentes personalizados

//____________IMPORT/EXPORT____________

// Componente para navegar entre las paginas en la parte superior 
export default function Nav_Bar(){
    // Constantes con el valor de los contextos 
    const [themeMode] = useContext(ThemeModeContext);
    const [currentNView] = useContext(NavbarViewContext);
    const [currentSView] = useContext(SidebarViewContext);
    // Constantes con la funcionalidad de los hooks
    const changeNavbarView = HandleChangeNavbar();
    const navigate = useNavigate();
    // Estructura del componente
    return(
        <>
            <Container_Nav_Bar ThemeMode={themeMode}> 
                <Img_Logo_Hospital_60 ThemeMode={themeMode}/> 
                <Container_Nav_Bar_Button ThemeMode={themeMode}>
                    {currentSView === 'Users' ? (
                        <>
                            <Tooltip title='Principal' placement="top">
                                <Button_Icon_White_100 ThemeMode={themeMode} onClick={() => {
                                    changeNavbarView('Principal');
                                    navigate('/Administration/Users/Principal',{ replace: true });
                                }}>
                                    <FaUserTag/>
                                </Button_Icon_White_100>
                            </Tooltip>
                            <Tooltip title='Permisos' placement="top">
                                <Button_Icon_White_100 ThemeMode={themeMode} onClick={() => {
                                    changeNavbarView('Permissions')
                                    navigate('/Administration/Users/Permissions',{ replace: true });
                                }}>
                                    <FaUserLock/>
                                </Button_Icon_White_100>
                            </Tooltip>
                            <Tooltip title='Estatus' placement="top">
                                <Button_Icon_White_100 ThemeMode={themeMode} onClick={() => {
                                    changeNavbarView('Status')
                                    navigate('/Administration/Users/Status',{ replace: true });
                                }}>
                                    <FaUserClock/>
                                </Button_Icon_White_100>
                            </Tooltip>
                            {currentNView === 'Principal' ? (
                                <Text_Title_30_Center ThemeMode={themeMode}>USUARIOS</Text_Title_30_Center>
                            ):(
                                <></>
                                
                            )}
                            {currentNView === 'Permissions' ? (
                                <Text_Title_30_Center ThemeMode={themeMode}>PERMISOS</Text_Title_30_Center>
                            ):(
                                <></>
                            )}
                            {currentNView === 'Status' ? (
                                <Text_Title_30_Center ThemeMode={themeMode}>ESTATUS</Text_Title_30_Center>
                            ):(
                                <></>
                            )}
                        </>
                    ):(
                        <></>
                    )}
                    {currentSView === 'Suppliers' ? (
                        <>
                        <Tooltip title='Proveedores' placement="top">
                            <Button_Icon_White_100 ThemeMode={themeMode} onClick={() => {
                                changeNavbarView('Suppliers');
                                navigate('/Administration/Suppliers/Suppliers',{ replace: true });
                            }}>
                                <FaUserTie/>
                            </Button_Icon_White_100>
                        </Tooltip>
                        <Tooltip title='Observaciones' placement="top">
                            <Button_Icon_White_100 ThemeMode={themeMode} onClick={() => {
                                changeNavbarView('Observations')
                                navigate('/Administration/Suppliers/Observations',{ replace: true });
                            }}>
                                <MdSpeakerNotes/>
                            </Button_Icon_White_100>
                        </Tooltip>
                        {currentNView === 'Suppliers' ? (
                            <Text_Title_30_Center ThemeMode={themeMode}>PROVEEDORES</Text_Title_30_Center>
                        ):(
                            <></>
                            
                        )}
                        {currentNView === 'Observations' ? (
                            <Text_Title_30_Center ThemeMode={themeMode}>OBSERVACIONES</Text_Title_30_Center>
                        ):(
                            <></>
                        )}
                    </>
                    ):(
                        <></>
                    )}
                    {currentSView === 'Inventory' ? (
                        <>
                        <Tooltip title='Inventario' placement="top">
                            <Button_Icon_White_100 ThemeMode={themeMode} onClick={() => {
                                changeNavbarView('Inventory');
                                navigate('/Administration/Inventory/Inventory',{ replace: true });
                            }}>
                                <FaWarehouse/>
                            </Button_Icon_White_100>
                        </Tooltip>
                        <Tooltip title='Insumos' placement="top">
                            <Button_Icon_White_100 ThemeMode={themeMode} onClick={() => {
                                changeNavbarView('Ingredients')
                                navigate('/Administration/Inventory/Ingredients',{ replace: true });
                            }}>
                                <MdFastfood/>
                            </Button_Icon_White_100>
                        </Tooltip>
                        {currentNView === 'Inventory' ? (
                            <Text_Title_30_Center ThemeMode={themeMode}>INVENTARIO</Text_Title_30_Center>
                        ):(
                            <></>
                            
                        )}
                        {currentNView === 'Ingredients' ? (
                            <Text_Title_30_Center ThemeMode={themeMode}>INSUMOS</Text_Title_30_Center>
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
                            <Button_Icon_White_100 ThemeMode={themeMode} onClick={() => {
                                changeNavbarView('General');
                                navigate('/Administration/Record/General',{ replace: true });
                            }}>
                                <RiRecordMailFill/>
                            </Button_Icon_White_100>
                        </Tooltip>
                        <Tooltip title='Inventario' placement="top">
                            <Button_Icon_White_100 ThemeMode={themeMode} onClick={() => {
                                changeNavbarView('Inventory');
                                navigate('/Administration/Record/Inventory',{ replace: true });
                            }}>
                                <FaWarehouse/>
                            </Button_Icon_White_100>
                        </Tooltip>
                        <Tooltip title='Proveedores' placement="top">
                            <Button_Icon_White_100 ThemeMode={themeMode} onClick={() => {
                                changeNavbarView('Suppliers')
                                navigate('/Administration/Record/Suppliers',{ replace: true });
                            }}>
                                <FaUserTie/>
                            </Button_Icon_White_100>
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
                </Container_Nav_Bar_Button>
            </Container_Nav_Bar>  
        </>
    );
}