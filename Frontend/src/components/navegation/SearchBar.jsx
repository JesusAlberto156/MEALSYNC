//____________IMPORT/EXPORT____________
// Hooks de React
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// Componentes de React externos
import { Tooltip } from "@mui/material";
// Contextos
import { ThemeModeContext,NavbarViewContext,SidebarViewContext } from "../../contexts/ViewsProvider";
import { SearchTermContext,SelectedRowContext,ViewPasswordContext } from "../../contexts/VariablesProvider";
import { LoggedPermissionsContext,LoggedTypeContext } from "../../contexts/SessionProvider";
import { RefUsersContext,RefPermissionsContext,RefStatusContext,RefSuppliersContext,RefSuppliesContext } from "../../contexts/RefsProvider";
// Hooks personalizados
import { HandleModalView } from "../../hooks/Views";
import { HandleViewPassword } from "../../hooks/Form";
//__________ICONOS__________
// Icono para la seccion del buscador
import { FcSearch } from "react-icons/fc";
import { FaShoppingCart } from "react-icons/fa";
// Iconos para un crud
import { IoIosAddCircle } from "react-icons/io";
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { FaEye } from "react-icons/fa";
import { IoIosEyeOff } from "react-icons/io";
import { FaLock } from "react-icons/fa";
import { FaLockOpen } from "react-icons/fa";
import { FaUserTie } from "react-icons/fa6";
//__________ICONOS__________
// Estilos personalizados
import { Container_Row_100_Left,Container_Row_80_Right,Container_Row_Blue_Width_92_Left } from "../styled/Containers";
import { Button_Icon_Green_60,Button_Icon_Blue_60,Button_Icon_Red_60,Button_Icon_Blue_140 } from "../styled/Buttons";
import { Icon_26,Icon_Button_Black_30,Icon_White_18 } from "../styled/Icons";
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
    const [isViewPassword] = useContext(ViewPasswordContext);
    const {Modal_U,Form_U,Button_Edit_U,Button_Delete_U} = useContext(RefUsersContext);
    const {Modal_P,Form_P,Button_Edit_P,Button_Enable_P} = useContext(RefPermissionsContext);
    const {Modal_S,Form_S,Button_Enable_S} = useContext(RefStatusContext);
    const {Button_Edit_S,Button_Delete_S,Button_Details_S} = useContext(RefSuppliersContext);
    const {Modal_Su,Form_Su,Button_Edit_Su,Button_Delete_Su} = useContext(RefSuppliesContext);
    // Constantes con valores de useState
    const [isSelectedUsers,setIsSelectedUsers] = useState('General');
    // Constante con las opciones de los buscadores
    const isOptionUsers = ['General','Nombre','Nombre corto','Usuario','Tipo de usuario'];
    // Constantes con la funcionalidad de los hooks
    const navigate = useNavigate();
    const handleModalView = HandleModalView();
    const handleViewPassword = HandleViewPassword();
    useEffect(() => {
        console.log(isSelectedUsers)
    },[isSelectedUsers])
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
                <Container_Row_Blue_Width_92_Left ThemeMode={themeMode}>
                    {currentSView === 'Users' && currentNView === 'Users' ? (
                        isOptionUsers.map((option,index) => (
                            <Button_Icon_Blue_140 ThemeMode={themeMode}
                                key={index}
                                onClick={() => setIsSelectedUsers(option)}
                                style={{
                                    backgroundColor: isSelectedUsers === option ? themeMode ? 'rgb(208, 31, 31)' : 'rgb(155, 9, 9)' : themeMode ? 'rgb(82, 126, 231)' : 'rgb(58,93,174)',
                                    color: isSelectedUsers === option ? 'white' : 'white',
                                }}
                            >
                                <Text_Span_12_Center>{option}</Text_Span_12_Center>
                            </Button_Icon_Blue_140>
                        ))
                    ):(
                        <></>
                    )}
                </Container_Row_Blue_Width_92_Left>
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
                                        navigate('/Administration/Users/Add',{ replace: true });
                                    }}>
                                        <Icon_White_18><IoIosAddCircle/></Icon_White_18>
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
                                                navigate('/Administration/Users/Edit',{ replace: true });
                                            }
                                        }}>
                                            <Icon_White_18><MdEdit/></Icon_White_18>
                                        </Button_Icon_Blue_60>
                                        <Button_Icon_Red_60 ref={Button_Delete_U} ThemeMode={themeMode} className={isSelectedRow === null ? 'roll-out-button-left':'roll-in-button-left'}
                                        disabled={isSelectedRow === null}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            if (isSelectedRow !== null) {
                                                handleModalView('User-Delete');
                                                navigate('/Administration/Users/Delete',{ replace: true });
                                            }
                                        }}>
                                            <Icon_White_18><MdDelete/></Icon_White_18>
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
                                                    navigate('/Administration/Users/Edit',{ replace: true });
                                                }
                                            }}>
                                                <Icon_White_18><MdEdit/></Icon_White_18>
                                            </Button_Icon_Blue_60>
                                        </Tooltip>
                                        <Tooltip title='Eliminar' placement="top">
                                            <Button_Icon_Red_60 ref={Button_Delete_U} ThemeMode={themeMode} className={isSelectedRow === null ? 'roll-out-button-left':'roll-in-button-left'}
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                if (isSelectedRow !== null) {
                                                    handleModalView('User-Delete');
                                                    navigate('/Administration/Users/Delete',{ replace: true });
                                                }
                                            }}>
                                                <Icon_White_18><MdDelete/></Icon_White_18>
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
                                                navigate('/Administration/Users/View',{ replace: true });
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
                                        navigate('/Administration/Users/Add',{ replace: true });
                                    }}>
                                        <Icon_White_18><IoIosAddCircle/></Icon_White_18>
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
                                                navigate('/Administration/Users/Edit',{ replace: true });
                                            }
                                        }}>
                                            <Icon_White_18><MdEdit/></Icon_White_18>
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
                                                    navigate('/Administration/Users/Edit',{ replace: true });
                                                }
                                            }}>
                                                <Icon_White_18><MdEdit/></Icon_White_18>
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
                                                navigate('/Administration/Users/View',{ replace: true });
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
                                        navigate('/Administration/Permissions/Add',{ replace: true });
                                    }}>
                                        <Icon_White_18><IoIosAddCircle/></Icon_White_18>
                                    </Button_Icon_Green_60>
                                </Tooltip>
                                {isSelectedRow === null ? (
                                    <>
                                        <Button_Icon_Blue_60 ref={Button_Edit_P} ThemeMode={themeMode} className={isSelectedRow === null ? 'roll-out-button-left':'roll-in-button-left'}
                                        disabled={isSelectedRow === null}
                                        onClick={() => {
                                            handleModalView('Permissions-Edit');
                                            navigate('/Administration/Permissions/Edit',{ replace: true });
                                        }}>
                                            <Icon_White_18><MdEdit/></Icon_White_18>
                                        </Button_Icon_Blue_60>
                                    </>
                                ):(
                                    <>
                                        <Tooltip title='Editar' placement="top">
                                            <Button_Icon_Blue_60 ref={Button_Edit_P} ThemeMode={themeMode} className={isSelectedRow === null ? 'roll-out-button-left':'roll-in-button-left'}
                                            onClick={() => {
                                                handleModalView('Permissions-Edit');
                                                navigate('/Administration/Permissions/Edit',{ replace: true });
                                            }}>
                                                <Icon_White_18><MdEdit/></Icon_White_18>
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
                                                    navigate('/Administration/Permissions/Enable',{ replace: true });
                                                }}>
                                                    <Icon_White_18><FaUserTie/></Icon_White_18>
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
                                                    navigate('/Administration/Permissions/Enable',{ replace: true });
                                                }}>
                                                    <Icon_White_18><FaUserTie/></Icon_White_18>
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
                                        navigate('/Administration/Permissions/Add',{ replace: true });
                                    }}>
                                        <Icon_White_18><IoIosAddCircle/></Icon_White_18>
                                    </Button_Icon_Green_60>
                                </Tooltip>
                                {isSelectedRow === null ? (
                                    <>
                                        <Button_Icon_Blue_60 ref={Button_Edit_P} ThemeMode={themeMode} className={isSelectedRow === null ? 'roll-out-button-left':'roll-in-button-left'}
                                        disabled={isSelectedRow === null}
                                        onClick={() => {
                                            handleModalView('Permissions-Edit');
                                            navigate('/Administration/Permissions/Edit',{ replace: true });
                                        }}>
                                            <Icon_White_18><MdEdit/></Icon_White_18>
                                        </Button_Icon_Blue_60>
                                    </>
                                ):(
                                    <>
                                        <Tooltip title='Editar' placement="top">
                                            <Button_Icon_Blue_60 ref={Button_Edit_P} ThemeMode={themeMode} className={isSelectedRow === null ? 'roll-out-button-left':'roll-in-button-left'}
                                            onClick={() => {
                                                handleModalView('Permissions-Edit');
                                                navigate('/Administration/Permissions/Edit',{ replace: true });
                                            }}>
                                                <Icon_White_18><MdEdit/></Icon_White_18>
                                            </Button_Icon_Blue_60>
                                        </Tooltip>
                                    </>
                                )}
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
                                        navigate('/Administration/Status/Add',{ replace: true });
                                    }}>
                                        <Icon_White_18><IoIosAddCircle/></Icon_White_18>
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
                                                    navigate('/Administration/Status/Enable',{ replace: true });
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
                                                    navigate('/Administration/Status/Enable',{ replace: true });
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
                                        navigate('/Administration/Status/Add',{ replace: true });
                                    }}>
                                        <Icon_White_18><IoIosAddCircle/></Icon_White_18>
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
                                        navigate('/Administration/Suppliers/Add',{ replace: true });
                                    }}>
                                        <Icon_White_18><IoIosAddCircle/></Icon_White_18>
                                    </Button_Icon_Green_60>
                                </Tooltip>
                                {isSelectedRow === null ? (
                                    <>
                                        <Button_Icon_Blue_60 ref={Button_Edit_S} ThemeMode={themeMode} className={isSelectedRow !== null ? 'roll-in-button-left':'roll-out-button-left'}
                                        disabled={isSelectedRow === null}
                                        onClick={() => {
                                            handleModalView('Supplier-Edit');
                                            navigate('/Administration/Suppliers/Edit',{ replace: true });
                                        }}>
                                            <Icon_White_18><MdEdit/></Icon_White_18>
                                        </Button_Icon_Blue_60>
                                        <Button_Icon_Red_60 ref={Button_Delete_S} ThemeMode={themeMode} className={isSelectedRow !== null ? 'roll-in-button-left':'roll-out-button-left'}
                                        disabled={isSelectedRow === null}
                                        onClick={() => {
                                            handleModalView('Supplier-Delete');
                                            navigate('/Administration/Suppliers/Delete',{ replace: true });
                                        }}>
                                            <Icon_White_18><MdDelete/></Icon_White_18>
                                        </Button_Icon_Red_60>
                                        <Button_Icon_Green_60 ref={Button_Details_S} ThemeMode={themeMode} className={isSelectedRow !== null ? 'roll-in-button-left':'roll-out-button-left'}
                                        disabled={isSelectedRow === null}
                                        onClick={() => {
                                            handleModalView('Supplier-Details');
                                            navigate('/Administration/Suppliers/Details',{ replace: true });
                                        }}>
                                            <Icon_White_18><FaEye/></Icon_White_18>
                                        </Button_Icon_Green_60>
                                    </>
                                ):(
                                    <>
                                        <Tooltip title='Editar' placement="top">
                                            <Button_Icon_Blue_60 ref={Button_Edit_S} ThemeMode={themeMode} className={isSelectedRow !== null ? 'roll-in-button-left':'roll-out-button-left'}
                                            onClick={() => {
                                                handleModalView('Supplier-Edit');
                                                navigate('/Administration/Suppliers/Edit',{ replace: true });
                                            }}>
                                                <Icon_White_18><MdEdit/></Icon_White_18>
                                            </Button_Icon_Blue_60>
                                        </Tooltip>
                                        <Tooltip title='Eliminar' placement="top">
                                            <Button_Icon_Red_60 ref={Button_Delete_S} ThemeMode={themeMode} className={isSelectedRow !== null ? 'roll-in-button-left':'roll-out-button-left'}
                                            onClick={() => {
                                                handleModalView('Supplier-Delete');
                                                navigate('/Administration/Suppliers/Delete',{ replace: true });
                                            }}>
                                                <Icon_White_18><MdDelete/></Icon_White_18>
                                            </Button_Icon_Red_60>
                                        </Tooltip>
                                        <Tooltip title='Ver Detalles' placement="top">
                                            <Button_Icon_Green_60 ref={Button_Details_S} ThemeMode={themeMode} className={isSelectedRow !== null ? 'roll-in-button-left':'roll-out-button-left'}
                                            onClick={() => {
                                                handleModalView('Supplier-Details');
                                                navigate('/Administration/Suppliers/Details',{ replace: true });
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
                                        handleModalView('Supplier-Add');
                                        navigate('/Administration/Suppliers/Add',{ replace: true });
                                    }}>
                                        <Icon_White_18><IoIosAddCircle/></Icon_White_18>
                                    </Button_Icon_Green_60>
                                </Tooltip>
                                {isSelectedRow === null ? (
                                    <>
                                        <Button_Icon_Blue_60 ref={Button_Edit_S} ThemeMode={themeMode} className={isSelectedRow !== null ? 'roll-in-button-left':'roll-out-button-left'}
                                        disabled={isSelectedRow === null}
                                        onClick={() => {
                                            handleModalView('Supplier-Edit');
                                            navigate('/Administration/Suppliers/Edit',{ replace: true });
                                        }}>
                                            <Icon_White_18><MdEdit/></Icon_White_18>
                                        </Button_Icon_Blue_60>
                                        <Button_Icon_Green_60 ref={Button_Details_S} ThemeMode={themeMode} className={isSelectedRow !== null ? 'roll-in-button-left':'roll-out-button-left'}
                                        disabled={isSelectedRow === null}
                                        onClick={() => {
                                            handleModalView('Supplier-Details');
                                            navigate('/Administration/Suppliers/Details',{ replace: true });
                                        }}>
                                            <Icon_White_18><FaEye/></Icon_White_18>
                                        </Button_Icon_Green_60>
                                    </>
                                ):(
                                    <>
                                        <Tooltip title='Editar' placement="top">
                                            <Button_Icon_Blue_60 ref={Button_Edit_S} ThemeMode={themeMode} className={isSelectedRow !== null ? 'roll-in-button-left':'roll-out-button-left'}
                                            onClick={() => {
                                                handleModalView('Supplier-Edit');
                                                navigate('/Administration/Suppliers/Edit',{ replace: true });
                                            }}>
                                                <Icon_White_18><MdEdit/></Icon_White_18>
                                            </Button_Icon_Blue_60>
                                        </Tooltip>
                                        <Tooltip title='Ver Detalles' placement="top">
                                            <Button_Icon_Green_60 ref={Button_Details_S} ThemeMode={themeMode} className={isSelectedRow !== null ? 'roll-in-button-left':'roll-out-button-left'}
                                            onClick={() => {
                                                handleModalView('Supplier-Details');
                                                navigate('/Administration/Suppliers/Details',{ replace: true });
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
                    {currentSView === 'Warehouse' && currentNView === 'Warehouse' ? (
                        isPermission.superadministrador ? (
                            <>
                                <Tooltip title='Agregar' placement="top">
                                    <Button_Icon_Green_60 ThemeMode={themeMode} className={isSelectedRow === null ? 'roll-in-button-left':'roll-out-button-left'}
                                    onClick={() => {
                                        handleModalView('Warehouse-Add');
                                        navigate('/Administration/Warehouse/Add',{ replace: true });
                                    }}>
                                        <Icon_White_18><IoIosAddCircle/></Icon_White_18>
                                    </Button_Icon_Green_60>
                                </Tooltip>
                            </>
                        ):(
                            <></>
                        )
                    ):(
                        <></>
                    )}
                    {currentSView === 'Warehouse' && currentNView === 'Supplies' ? (
                        isPermission.superadministrador ? (
                            <>
                                <Tooltip title='Agregar' placement="top">
                                    <Button_Icon_Green_60 ThemeMode={themeMode} className={isSelectedRow === null ? 'roll-in-button-left':'roll-out-button-left'}
                                    onClick={() => {
                                        handleModalView('Supply-Add');
                                        navigate('/Administration/Supplies/Add',{ replace: true });
                                    }}>
                                        <Icon_White_18><IoIosAddCircle/></Icon_White_18>
                                    </Button_Icon_Green_60>
                                </Tooltip>
                                {isSelectedRow === null ? (
                                    <>
                                        <Button_Icon_Blue_60 ref={Button_Edit_Su} ThemeMode={themeMode} className={isSelectedRow !== null ? 'roll-in-button-left':'roll-out-button-left'}
                                        disabled={isSelectedRow === null}
                                        onClick={() => {
                                            handleModalView('Supply-Edit');
                                            navigate('/Administration/Supplies/Edit',{ replace: true });
                                        }}>
                                            <Icon_White_18><MdEdit/></Icon_White_18>
                                        </Button_Icon_Blue_60>
                                        <Button_Icon_Red_60 ref={Button_Delete_Su} ThemeMode={themeMode} className={isSelectedRow !== null ? 'roll-in-button-left':'roll-out-button-left'}
                                        disabled={isSelectedRow === null}
                                        onClick={() => {
                                            handleModalView('Supply-Delete');
                                            navigate('/Administration/Supplies/Delete',{ replace: true });
                                        }}>
                                            <Icon_White_18><MdDelete/></Icon_White_18>
                                        </Button_Icon_Red_60>
                                    </>
                                ):(
                                    <>
                                        <Tooltip title='Editar' placement="top">
                                            <Button_Icon_Blue_60 ref={Button_Edit_Su} ThemeMode={themeMode} className={isSelectedRow !== null ? 'roll-in-button-left':'roll-out-button-left'}
                                            onClick={() => {
                                                handleModalView('Supply-Edit');
                                                navigate('/Administration/Supplies/Edit',{ replace: true });
                                            }}>
                                                <Icon_White_18><MdEdit/></Icon_White_18>
                                            </Button_Icon_Blue_60>
                                        </Tooltip>
                                        <Tooltip title='Eliminar' placement="top">
                                            <Button_Icon_Red_60 ref={Button_Delete_Su} ThemeMode={themeMode} className={isSelectedRow !== null ? 'roll-in-button-left':'roll-out-button-left'}
                                            onClick={() => {
                                                handleModalView('Supply-Delete');
                                                navigate('/Administration/Supplies/Delete',{ replace: true });
                                            }}>
                                                <Icon_White_18><MdDelete/></Icon_White_18>
                                            </Button_Icon_Red_60>
                                        </Tooltip>
                                    </>
                                )}
                            </>
                        ):(
                            <></>
                        )
                    ):(
                        <></>
                    )}
                </Container_Row_80_Right>
            </Container_Row_100_Left> 
        </>
    );
}