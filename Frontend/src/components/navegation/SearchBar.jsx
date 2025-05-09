//____________IMPORT/EXPORT____________
// Hooks de React
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
// Componentes de React externos
import { Tooltip } from "@mui/material";
// Contextos
import { ThemeModeContext,NavbarViewContext,SidebarViewContext } from "../../contexts/ViewsProvider";
import { SearchTermContext,SelectedRowContext,ViewPasswordContext } from "../../contexts/VariablesProvider";
import { LoggedPermissionsContext,LoggedTypeContext } from "../../contexts/SessionProvider";
import { RefUsersContext,RefPermissionsContext,RefStatusContext,RefSuppliersContext } from "../../contexts/RefsProvider";
// Hooks personalizados
import { HandleModalView } from "../../hooks/Views";
import { HandleViewPassword } from "../../hooks/Form";
//__________ICONOS__________
// Icono para la seccion del buscador
import { FcSearch } from "react-icons/fc";
import { FaShoppingCart } from "react-icons/fa";
// Iconos para la seccion de usuarios
import { FaUserPlus } from "react-icons/fa";
import { FaUserEdit } from "react-icons/fa";
import { FaUserMinus } from "react-icons/fa";
import { FaEye } from "react-icons/fa";
import { IoIosEyeOff } from "react-icons/io";
// Iconos para la sección de permisos
import { MdAddModerator } from "react-icons/md";
import { AiFillEdit } from "react-icons/ai";
import { MdAdminPanelSettings } from "react-icons/md";
// Iconos para la sección de estatus
import { FcAddRow } from "react-icons/fc";
import { FaLock } from "react-icons/fa";
import { FaLockOpen } from "react-icons/fa";
// Icon para la seccion de proveedores
import { ImUserPlus } from "react-icons/im";
import { RiEditFill } from "react-icons/ri";
import { ImUserMinus } from "react-icons/im";
import { BiSolidUserDetail } from "react-icons/bi";
//__________ICONOS__________
// Estilos personalizados
import { Container_Row_100_Left,Container_Row_80_Right } from "../styled/Containers";
import { Button_Icon_Green_60,Button_Icon_Blue_60,Button_Icon_Red_60 } from "../styled/Buttons";
import { Icon_26,Icon_Button_Black_30,Icon_White_18 } from "../styled/Icons";
import { Input_Text_White_20 } from "../styled/Inputs";
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
    const [isViewPassword] = useContext(ViewPasswordContext);
    const {Modal_U,Form_U,Button_Edit_U,Button_Delete_U} = useContext(RefUsersContext);
    const {Modal_P,Form_P,Button_Edit_P,Button_Enable_P} = useContext(RefPermissionsContext);
    const {Modal,Form,Button_Enable_S} = useContext(RefStatusContext);
    const {Button_Edit_S,Button_Delete_S,Button_Details_S} = useContext(RefSuppliersContext);
    // Constantes con la funcionalidad de los hooks
    const navigate = useNavigate();
    const handleModalView = HandleModalView();
    const handleViewPassword = HandleViewPassword();
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
                {isTypeUser === 'Cook' || isTypeUser === 'Nutritionist' || isTypeUser === 'Doctor' ? (
                    <>
                        <Tooltip title='Pedidos' placement="top">
                            <Icon_Button_Black_30 ThemeMode={themeMode}><FaShoppingCart/></Icon_Button_Black_30>
                        </Tooltip>  
                    </>
                ):(
                    <></>
                )}
                <Container_Row_80_Right>    
                    {currentSView === 'Users' && currentNView === 'Users' ? (
                        isPermission.superadministrador ? (
                            <>
                                <Tooltip title='Agregar' placement="top">
                                    <Button_Icon_Green_60 ThemeMode={themeMode} className={isSelectedRow === null ? 'roll-in-button-left':'roll-out-button-left'}
                                    onClick={() => {
                                        handleModalView('User-Add');
                                        navigate('/Administration/Users/Users/Add',{ replace: true });
                                    }}>
                                        <Icon_White_18><FaUserPlus/></Icon_White_18>
                                    </Button_Icon_Green_60>
                                </Tooltip>
                                {isSelectedRow === null ? (
                                    <>
                                        <Button_Icon_Blue_60 ref={Button_Edit_U} ThemeMode={themeMode} className={isSelectedRow === null ? 'roll-out-button-left':'roll-in-button-left'}
                                        disabled={isSelectedRow === null}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            if (isSelectedRow !== null) {
                                                handleModalView('User-Edit');
                                                navigate('/Administration/Users/Users/Edit',{ replace: true });
                                            }
                                        }}>
                                            <Icon_White_18><FaUserEdit/></Icon_White_18>
                                        </Button_Icon_Blue_60>
                                        <Button_Icon_Red_60 ref={Button_Delete_U} ThemeMode={themeMode} className={isSelectedRow === null ? 'roll-out-button-left':'roll-in-button-left'}
                                        disabled={isSelectedRow === null}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            if (isSelectedRow !== null) {
                                                handleModalView('User-Delete');
                                                navigate('/Administration/Users/Users/Delete',{ replace: true });
                                            }
                                        }}>
                                            <Icon_White_18><FaUserMinus/></Icon_White_18>
                                        </Button_Icon_Red_60>
                                    </>
                                ):(
                                    <>
                                        <Tooltip title='Editar' placement="top">
                                            <Button_Icon_Blue_60 ref={Button_Edit_U} ThemeMode={themeMode} className={isSelectedRow === null ? 'roll-out-button-left':'roll-in-button-left'}
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                if (isSelectedRow !== null) {
                                                    handleModalView('User-Edit');
                                                    navigate('/Administration/Users/Users/Edit',{ replace: true });
                                                }
                                            }}>
                                                <Icon_White_18><FaUserEdit/></Icon_White_18>
                                            </Button_Icon_Blue_60>
                                        </Tooltip>
                                        <Tooltip title='Eliminar' placement="top">
                                            <Button_Icon_Red_60 ref={Button_Delete_U} ThemeMode={themeMode} className={isSelectedRow === null ? 'roll-out-button-left':'roll-in-button-left'}
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                if (isSelectedRow !== null) {
                                                    handleModalView('User-Delete');
                                                    navigate('/Administration/Users/Users/Delete',{ replace: true });
                                                }
                                            }}>
                                                <Icon_White_18><FaUserMinus/></Icon_White_18>
                                            </Button_Icon_Red_60>
                                        </Tooltip>  
                                    </>
                                )}
                                {isViewPassword ? (
                                    <>
                                        <Tooltip title='Ocultar contraseñas' placement="top">
                                            <Button_Icon_Red_60 ThemeMode={themeMode} className={isViewPassword ? 'roll-in-button-left':'roll-out-button-left'} 
                                            onClick={() => handleViewPassword()}>
                                                <Icon_White_18><IoIosEyeOff/></Icon_White_18>
                                            </Button_Icon_Red_60>
                                        </Tooltip>
                                    </>
                                ):(
                                    <>
                                        <Tooltip title='Mostrar contraseñas' placement="top">
                                            <Button_Icon_Green_60 ThemeMode={themeMode}  className={!isViewPassword ? 'roll-in-button-left':'roll-out-button-left'}
                                            onClick={() => {
                                                handleModalView('User-View');
                                                navigate('/Administration/Users/Users/View',{ replace: true });
                                            }}>
                                                <Icon_White_18><FaEye/></Icon_White_18>
                                            </Button_Icon_Green_60>
                                        </Tooltip>
                                    </>
                                )}
                            </>
                        ):(
                            <>
                                <Tooltip title='Agregar' placement="top">
                                    <Button_Icon_Green_60 ThemeMode={themeMode} className={isSelectedRow === null ? 'roll-in-button-left':'roll-out-button-left'}
                                    onClick={() => {
                                        handleModalView('User-Add');
                                        navigate('/Administration/Users/Users/Add',{ replace: true });
                                    }}>
                                        <Icon_White_18><FaUserPlus/></Icon_White_18>
                                    </Button_Icon_Green_60>
                                </Tooltip>
                                {isSelectedRow === null ? (
                                    <>
                                        <Button_Icon_Blue_60 ref={Button_Edit_U} ThemeMode={themeMode} className={isSelectedRow === null ? 'roll-out-button-left':'roll-in-button-left'}
                                        disabled={isSelectedRow === null}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            if (isSelectedRow !== null) {
                                                handleModalView('User-Edit');
                                                navigate('/Administration/Users/Users/Edit',{ replace: true });
                                            }
                                        }}>
                                            <Icon_White_18><FaUserEdit/></Icon_White_18>
                                        </Button_Icon_Blue_60>
                                    </>
                                ):(
                                    <>
                                        <Tooltip title='Editar' placement="top">
                                            <Button_Icon_Blue_60 ref={Button_Edit_U} ThemeMode={themeMode} className={isSelectedRow === null ? 'roll-out-button-left':'roll-in-button-left'}
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                if (isSelectedRow !== null) {
                                                    handleModalView('User-Edit');
                                                    navigate('/Administration/Users/Users/Edit',{ replace: true });
                                                }
                                            }}>
                                                <Icon_White_18><FaUserEdit/></Icon_White_18>
                                            </Button_Icon_Blue_60>
                                        </Tooltip> 
                                    </>
                                )}
                                {isViewPassword ? (
                                    <>
                                        <Tooltip title='Ocultar contraseñas' placement="top">
                                            <Button_Icon_Red_60 ThemeMode={themeMode} className={isViewPassword ? 'roll-in-button-left':'roll-out-button-left'} 
                                            onClick={() => handleViewPassword()}>
                                                <Icon_White_18><IoIosEyeOff/></Icon_White_18>
                                            </Button_Icon_Red_60>
                                        </Tooltip>
                                    </>
                                ):(
                                    <>
                                        <Tooltip title='Mostrar contraseñas' placement="top">
                                            <Button_Icon_Green_60 ThemeMode={themeMode}  className={!isViewPassword ? 'roll-in-button-left':'roll-out-button-left'}
                                            onClick={() => {
                                                handleModalView('User-View');
                                                navigate('/Administration/Users/Users/View',{ replace: true });
                                            }}>
                                                <Icon_White_18><FaEye/></Icon_White_18>
                                            </Button_Icon_Green_60>
                                        </Tooltip>
                                    </>
                                )}
                            </>
                        )
                    ):(
                        <></>
                    )}
                    {currentSView === 'Users' && currentNView === 'Permissions' ? (
                        isPermission.superadministrador ? (
                            <>
                                <Tooltip title='Agregar' placement="top">
                                    <Button_Icon_Green_60 ThemeMode={themeMode} className={isSelectedRow === null ? 'roll-in-button-left':'roll-out-button-left'}
                                    onClick={() => {
                                        handleModalView('Permissions-Add');
                                        navigate('/Administration/Users/Permissions/Add',{ replace: true });
                                    }}>
                                        <Icon_White_18><MdAddModerator/></Icon_White_18>
                                    </Button_Icon_Green_60>
                                </Tooltip>
                                {isSelectedRow === null ? (
                                    <>
                                        <Button_Icon_Blue_60 ref={Button_Edit_P} ThemeMode={themeMode} className={isSelectedRow === null ? 'roll-out-button-left':'roll-in-button-left'}
                                        disabled={isSelectedRow === null}
                                        onClick={() => {
                                            handleModalView('Permissions-Edit');
                                            navigate('/Administration/Users/Permissions/Edit',{ replace: true });
                                        }}>
                                            <Icon_White_18><AiFillEdit/></Icon_White_18>
                                        </Button_Icon_Blue_60>
                                    </>
                                ):(
                                    <>
                                        <Tooltip title='Editar' placement="top">
                                            <Button_Icon_Blue_60 ref={Button_Edit_P} ThemeMode={themeMode} className={isSelectedRow === null ? 'roll-out-button-left':'roll-in-button-left'}
                                            onClick={() => {
                                                handleModalView('Permissions-Edit');
                                                navigate('/Administration/Users/Permissions/Edit',{ replace: true });
                                            }}>
                                                <Icon_White_18><AiFillEdit/></Icon_White_18>
                                            </Button_Icon_Blue_60>
                                        </Tooltip>
                                    </>
                                )}
                                {isSelectedRow !== null ? (
                                    isSelectedRow.superadministrador ? (
                                        <>
                                            <Tooltip title='Deshabilitar' placement="top">
                                                <Button_Icon_Red_60 ref={Button_Enable_P} ThemeMode={themeMode} className={isSelectedRow === null ? 'roll-out-button-left':'roll-in-button-left'}
                                                disabled={isSelectedRow === null}
                                                onClick={() => {
                                                    handleModalView('Permissions-Enable');
                                                    navigate('/Administration/Users/Permissions/Enable',{ replace: true });
                                                }}>
                                                    <Icon_White_18><MdAdminPanelSettings/></Icon_White_18>
                                                </Button_Icon_Red_60>
                                            </Tooltip>
                                        </>
                                    ):(
                                        <>
                                            <Tooltip title='Habilitar' placement="top">
                                                <Button_Icon_Green_60 ref={Button_Enable_P} ThemeMode={themeMode} className={isSelectedRow === null ? 'roll-out-button-left':'roll-in-button-left'}
                                                disabled={isSelectedRow === null}
                                                onClick={() => {
                                                    handleModalView('Permissions-Enable');
                                                    navigate('/Administration/Users/Permissions/Enable',{ replace: true });
                                                }}>
                                                    <Icon_White_18><MdAdminPanelSettings/></Icon_White_18>
                                                </Button_Icon_Green_60>
                                            </Tooltip>
                                        </>
                                    )
                                ):(
                                    <></>
                                )}
                            </>                                 
                        ):(
                            <>
                                <Tooltip title='Agregar' placement="top">
                                    <Button_Icon_Green_60 ThemeMode={themeMode} className={isSelectedRow === null ? 'roll-in-button-left':'roll-out-button-left'}
                                    onClick={() => {
                                        handleModalView('Permissions-Add');
                                        navigate('/Administration/Users/Permissions/Add',{ replace: true });
                                    }}>
                                        <Icon_White_18><MdAddModerator/></Icon_White_18>
                                    </Button_Icon_Green_60>
                                </Tooltip>
                                <Tooltip title='Editar' placement="top">
                                    <Button_Icon_Blue_60 ref={Button_Edit_P} ThemeMode={themeMode} className={isSelectedRow === null ? 'roll-out-button-left':'roll-in-button-left'}
                                    disabled={isSelectedRow === null}
                                    onClick={() => {
                                        handleModalView('Permissions-Edit');
                                        navigate('/Administration/Users/Permissions/Edit',{ replace: true });
                                    }}>
                                        <Icon_White_18><AiFillEdit/></Icon_White_18>
                                    </Button_Icon_Blue_60>
                                </Tooltip>
                            </>
                        )
                    ):(
                        <></>
                    )}
                    {currentSView === 'Users' && currentNView === 'Status' ? (
                        isPermission.superadministrador ? (
                            <>
                                <Tooltip title='Agregar' placement="top">
                                    <Button_Icon_Green_60 ThemeMode={themeMode} className={isSelectedRow === null ? 'roll-in-button-left':'roll-out-button-left'}
                                    onClick={() => {
                                        handleModalView('Status-Add');
                                        navigate('/Administration/Users/Status/Add',{ replace: true });
                                    }}>
                                        <Icon_White_18><FcAddRow/></Icon_White_18>
                                    </Button_Icon_Green_60>
                                </Tooltip>
                                {isSelectedRow !== null ? (
                                    isSelectedRow.habilitado ? (
                                        <>
                                            <Tooltip title='Deshabilitar' placement="top">
                                                <Button_Icon_Red_60 ref={Button_Enable_S} ThemeMode={themeMode} className={isSelectedRow === null ? 'roll-out-button-left':'roll-in-button-left'}
                                                disabled={isSelectedRow === null}
                                                onClick={() => {
                                                    handleModalView('Status-Enable');
                                                    navigate('/Administration/Users/Status/Enable',{ replace: true });
                                                }}>
                                                    <Icon_White_18><FaLock/></Icon_White_18>
                                                </Button_Icon_Red_60>
                                            </Tooltip>
                                        </>
                                    ):(
                                        <>
                                            <Tooltip title='Habilitar' placement="top">
                                                <Button_Icon_Green_60 ref={Button_Enable_S} ThemeMode={themeMode} className={isSelectedRow === null ? 'roll-out-button-left':'roll-in-button-left'}
                                                disabled={isSelectedRow === null}
                                                onClick={() => {
                                                    handleModalView('Status-Enable');
                                                    navigate('/Administration/Users/Status/Enable',{ replace: true });
                                                }}>
                                                    <Icon_White_18><FaLockOpen/></Icon_White_18>
                                                </Button_Icon_Green_60>
                                            </Tooltip>
                                        </>
                                    )
                                ):(
                                    <></>
                                )}
                            </>                                 
                        ):(
                            <>
                                <Tooltip title='Agregar' placement="top">
                                    <Button_Icon_Green_60 ThemeMode={themeMode} className={isSelectedRow === null ? 'roll-in-button-left':'roll-out-button-left'}
                                    onClick={() => {
                                        handleModalView('Status-Add');
                                        navigate('/Administration/Users/Status/Add',{ replace: true });
                                    }}>
                                        <Icon_White_18><FcAddRow/></Icon_White_18>
                                    </Button_Icon_Green_60>
                                </Tooltip>
                            </>
                        )
                    ):(
                        <></>
                    )}
                    {currentSView === 'Suppliers' && currentNView === 'Suppliers' ? (
                        isPermission.superadministrador ? (
                            <>
                                <Tooltip title='Agregar' placement="top">
                                    <Button_Icon_Green_60 ThemeMode={themeMode} className={isSelectedRow === null ? 'roll-in-button-left':'roll-out-button-left'}
                                    onClick={() => {
                                        handleModalView('Supplier-Add');
                                        navigate('/Administration/Suppliers/Suppliers/Add',{ replace: true });
                                    }}>
                                        <Icon_White_18><ImUserPlus/></Icon_White_18>
                                    </Button_Icon_Green_60>
                                </Tooltip>
                                {isSelectedRow === null ? (
                                    <>
                                        <Button_Icon_Blue_60 ref={Button_Edit_S} ThemeMode={themeMode} className={isSelectedRow !== null ? 'roll-in-button-left':'roll-out-button-left'}
                                        disabled={isSelectedRow === null}
                                        onClick={() => {
                                            handleModalView('Supplier-Edit');
                                            navigate('/Administration/Suppliers/Suppliers/Edit',{ replace: true });
                                        }}>
                                            <Icon_White_18><RiEditFill/></Icon_White_18>
                                        </Button_Icon_Blue_60>
                                        <Button_Icon_Red_60 ref={Button_Delete_S} ThemeMode={themeMode} className={isSelectedRow !== null ? 'roll-in-button-left':'roll-out-button-left'}
                                        disabled={isSelectedRow === null}
                                        onClick={() => {
                                            handleModalView('Supplier-Delete');
                                            navigate('/Administration/Suppliers/Suppliers/Delete',{ replace: true });
                                        }}>
                                            <Icon_White_18><ImUserMinus/></Icon_White_18>
                                        </Button_Icon_Red_60>
                                        <Button_Icon_Green_60 ref={Button_Details_S} ThemeMode={themeMode} className={isSelectedRow !== null ? 'roll-in-button-left':'roll-out-button-left'}
                                        disabled={isSelectedRow === null}
                                        onClick={() => {
                                            handleModalView('Supplier-Details');
                                            navigate('/Administration/Suppliers/Suppliers/Details',{ replace: true });
                                        }}>
                                            <Icon_White_18><BiSolidUserDetail/></Icon_White_18>
                                        </Button_Icon_Green_60>
                                    </>
                                ):(
                                    <>
                                        <Tooltip title='Editar' placement="top">
                                            <Button_Icon_Blue_60 ref={Button_Edit_S} ThemeMode={themeMode} className={isSelectedRow !== null ? 'roll-in-button-left':'roll-out-button-left'}
                                            onClick={() => {
                                                handleModalView('Supplier-Edit');
                                                navigate('/Administration/Suppliers/Suppliers/Edit',{ replace: true });
                                            }}>
                                                <Icon_White_18><RiEditFill/></Icon_White_18>
                                            </Button_Icon_Blue_60>
                                        </Tooltip>
                                        <Tooltip title='Eliminar' placement="top">
                                            <Button_Icon_Red_60 ref={Button_Delete_S} ThemeMode={themeMode} className={isSelectedRow !== null ? 'roll-in-button-left':'roll-out-button-left'}
                                            onClick={() => {
                                                handleModalView('Supplier-Delete');
                                                navigate('/Administration/Suppliers/Suppliers/Delete',{ replace: true });
                                            }}>
                                                <Icon_White_18><ImUserMinus/></Icon_White_18>
                                            </Button_Icon_Red_60>
                                        </Tooltip>
                                        <Tooltip title='Ver Detalles' placement="top">
                                            <Button_Icon_Green_60 ref={Button_Details_S} ThemeMode={themeMode} className={isSelectedRow !== null ? 'roll-in-button-left':'roll-out-button-left'}
                                            onClick={() => {
                                                handleModalView('Supplier-Details');
                                                navigate('/Administration/Suppliers/Suppliers/Details',{ replace: true });
                                            }}>
                                                <Icon_White_18><BiSolidUserDetail/></Icon_White_18>
                                            </Button_Icon_Green_60>
                                        </Tooltip>
                                    </>
                                )}
                            </>
                        ):(
                            <>
                                <Tooltip title='Agregar' placement="top">
                                    <Button_Icon_Green_60 ThemeMode={themeMode} className={isSelectedRow === null ? 'roll-in-button-left':'roll-out-button-left'}
                                    onClick={() => {
                                        handleModalView('Supplier-Add');
                                        navigate('/Administration/Suppliers/Suppliers/Add',{ replace: true });
                                    }}>
                                        <Icon_White_18><ImUserPlus/></Icon_White_18>
                                    </Button_Icon_Green_60>
                                </Tooltip>
                                {isSelectedRow === null ? (
                                    <>
                                        <Button_Icon_Blue_60 ref={Button_Edit_S} ThemeMode={themeMode} className={isSelectedRow !== null ? 'roll-in-button-left':'roll-out-button-left'}
                                        disabled={isSelectedRow === null}
                                        onClick={() => {
                                            handleModalView('Supplier-Edit');
                                            navigate('/Administration/Suppliers/Suppliers/Edit',{ replace: true });
                                        }}>
                                            <Icon_White_18><RiEditFill/></Icon_White_18>
                                        </Button_Icon_Blue_60>
                                        <Button_Icon_Green_60 ref={Button_Details_S} ThemeMode={themeMode} className={isSelectedRow !== null ? 'roll-in-button-left':'roll-out-button-left'}
                                        disabled={isSelectedRow === null}
                                        onClick={() => {
                                            handleModalView('Supplier-Details');
                                            navigate('/Administration/Suppliers/Suppliers/Details',{ replace: true });
                                        }}>
                                            <Icon_White_18><BiSolidUserDetail/></Icon_White_18>
                                        </Button_Icon_Green_60>
                                    </>
                                ):(
                                    <>
                                        <Tooltip title='Editar' placement="top">
                                            <Button_Icon_Blue_60 ref={Button_Edit_S} ThemeMode={themeMode} className={isSelectedRow !== null ? 'roll-in-button-left':'roll-out-button-left'}
                                            onClick={() => {
                                                handleModalView('Supplier-Edit');
                                                navigate('/Administration/Suppliers/Suppliers/Edit',{ replace: true });
                                            }}>
                                                <Icon_White_18><RiEditFill/></Icon_White_18>
                                            </Button_Icon_Blue_60>
                                        </Tooltip>
                                        <Tooltip title='Ver Detalles' placement="top">
                                            <Button_Icon_Green_60 ref={Button_Details_S} ThemeMode={themeMode} className={isSelectedRow !== null ? 'roll-in-button-left':'roll-out-button-left'}
                                            onClick={() => {
                                                handleModalView('Supplier-Details');
                                                navigate('/Administration/Suppliers/Suppliers/Details',{ replace: true });
                                            }}>
                                                <Icon_White_18><BiSolidUserDetail/></Icon_White_18>
                                            </Button_Icon_Green_60>
                                        </Tooltip>
                                    </>
                                )}
                            </>
                        )
                    ):(
                        <></>
                    )}
                </Container_Row_80_Right>
            </Container_Row_100_Left> 
        </>
    );
}