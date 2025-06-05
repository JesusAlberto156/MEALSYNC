//____________IMPORT/EXPORT____________
// Hooks de React
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
// Componentes de React externos
import { Tooltip } from "@mui/material";
// Contextos
import { ThemeModeContext,NavbarViewContext,SidebarViewContext } from "../../contexts/ViewsProvider";
import { SearchTermContext } from "../../contexts/SearchsProvider";
import { SelectedRowContext,SelectedOptionSearchContext,SelectedOptionOrderContext,SelectedOptionOrderPlusContext } from "../../contexts/SelectedesProvider";
import { LoggedPermissionsContext,LoggedTypeContext } from "../../contexts/SessionProvider";
import { UserViewPasswordContext } from "../../contexts/UsersProvider";
import { RefUsersContext,RefPermissionsContext,RefStatusContext,RefSuppliersContext,RefSuppliesContext } from "../../contexts/RefsProvider";
// Hooks personalizados
import { HandleModalView } from "../../hooks/Views";
import { HandleViewPassword } from "../../hooks/Form";
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
//__________ICONOS__________
// Estilos personalizados
import { Container_Row_100_Left,Container_Row_80_Right,Container_Row_Blue_Width_2000_Left } from "../styled/Containers";
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
    const [isUserViewPassword] = useContext(UserViewPasswordContext);
    const {Modal_Users,Form_Users,Button_Edit_Users,Button_Delete_Users} = useContext(RefUsersContext);
    const {Modal_Permissions,Form_Permissions,Button_Edit_Permissions,Button_Enable_Permissions} = useContext(RefPermissionsContext);
    const {Modal_Status,Form_Status,Button_Enable_Status} = useContext(RefStatusContext);1
    const {Button_Edit_S,Button_Delete_S,Button_Details_S} = useContext(RefSuppliersContext);
    const {Modal_Su,Form_Su,Button_Edit_Su,Button_Delete_Su} = useContext(RefSuppliesContext);
    const [isSelectedOptionSearch,setIsSelectedOptionSearch] = useContext(SelectedOptionSearchContext);
    const [isSelectedOptionOrderPlus,setIsSelectedOptionOrderPlus] = useContext(SelectedOptionOrderPlusContext);
    // Constante con las opciones de los buscadores
    const isOptionUsers = ['General','Nombre','Nombre corto','Usuario','Tipo de usuario'];
    const isOptionStatus = ['Normal','Activo','Inactivo'];
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
                {currentSView === 'Users' && currentNView === 'Users' ? (
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
                {currentSView === 'Users' && currentNView === 'Status' ? (
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
                        <>
                            {isSelectedRow !== null ? (
                                <>
                                    <Tooltip title='Editar' placement="top">
                                        <Button_Icon_Blue_60 ref={Button_Edit_Users} ThemeMode={themeMode} className={isSelectedRow === null ? 'fade-button-out':'fade-button-in'}
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
                            ):(
                                <>
                                    <Tooltip title='Agregar' placement="top">
                                        <Button_Icon_Green_60 ThemeMode={themeMode} className={isSelectedRow === null ? 'fade-button-in':'fade-button-out'}
                                            onClick={() => {
                                                handleModalView('User-Add');
                                                navigate('/Administration/Users/Add',{ replace: true });
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
                                                    handleModalView('User-Delete');
                                                    navigate('/Administration/Users/Delete',{ replace: true });
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
                            {isUserViewPassword ? (
                                <>
                                    <Tooltip title='Ocultar contraseñas' placement="top">
                                        <Button_Icon_Red_60 ThemeMode={themeMode} className={isUserViewPassword ? 'fade-button-in':'fade-button-out'} 
                                        onClick={() => handleViewPassword()}>
                                            <Icon_White_18><IoIosEyeOff/></Icon_White_18>
                                        </Button_Icon_Red_60>
                                    </Tooltip>
                                </>
                            ):(
                                <>
                                    <Tooltip title='Mostrar contraseñas' placement="top">
                                        <Button_Icon_Green_60 ThemeMode={themeMode}  className={!isUserViewPassword ? 'fade-button-in':'fade-button-out'}
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
                        <></>
                    )}
                    {currentSView === 'Users' && currentNView === 'Permissions' ? (
                        <>
                            {isSelectedRow !== null ? (
                                <>
                                    <Tooltip title='Editar' placement="top">
                                        <Button_Icon_Blue_60 ref={Button_Edit_Permissions} ThemeMode={themeMode} className={isSelectedRow === null ? 'fade-button-out':'fade-button-in'}
                                        onClick={() => {
                                            handleModalView('Permissions-Edit');
                                            navigate('/Administration/Permissions/Edit',{ replace: true });
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
                                            handleModalView('Permissions-Add');
                                            navigate('/Administration/Permissions/Add',{ replace: true });
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
                                                <Button_Icon_Green_60 ref={Button_Enable_Permissions} ThemeMode={themeMode} className={isSelectedRow === null ? 'fade-button-out':'fade-button-in'}
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
                                )                               
                            ):(
                                <></>
                            )}
                        </>
                    ):(
                        <></>
                    )}
                    {currentSView === 'Users' && currentNView === 'Status' ? (
                        <>
                            {isSelectedRow !== null ? (
                                isSelectedRow.habilitado ? (
                                    <>
                                        <Tooltip title='Deshabilitar' placement="top">
                                            <Button_Icon_Red_60 ref={Button_Enable_Status} ThemeMode={themeMode} className={isSelectedRow === null ? 'fade-button-out':'fade-button-in'}
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
                                            <Button_Icon_Green_60 ref={Button_Enable_Status} ThemeMode={themeMode} className={isSelectedRow === null ? 'fade-button-out':'fade-button-in'}
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
                                <>
                                    <Tooltip title='Agregar' placement="top">
                                        <Button_Icon_Green_60 ThemeMode={themeMode} className={isSelectedRow === null ? 'fade-button-in':'fade-button-out'}
                                        onClick={() => {
                                            handleModalView('Status-Add');
                                            navigate('/Administration/Status/Add',{ replace: true });
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