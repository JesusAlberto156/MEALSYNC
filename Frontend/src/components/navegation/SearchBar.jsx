//____________IMPORT/EXPORT____________
// Hooks de React
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
// Componentes de React externos
import { Tooltip } from "@mui/material";
import Select from "react-select";
// Contextos
import { ThemeModeContext,NavbarViewContext,SidebarViewContext } from "../../contexts/ViewsProvider";
import { SuppliersContext } from "../../contexts/SuppliersProvider";
import { SearchTermContext,SelectedRowContext,ViewPasswordContext } from "../../contexts/VariablesProvider";
import { LoggedPermissionsContext,LoggedTypeContext } from "../../contexts/SessionProvider";
import { SelectContext } from "../../contexts/FormsProvider";
// Hooks personalizados
import { HandleChangeModal } from "../../hooks/Views";
import { useChangeViewPassword } from "../../hooks/Form";
import { useHandleSelectChange } from "../../hooks/Form";
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
import { MdAddModerator, MdDelete, MdEdit } from "react-icons/md";
import { AiFillEdit } from "react-icons/ai";
import { MdAdminPanelSettings } from "react-icons/md";
// Iconos para la sección de estatus
import { FcAddRow } from "react-icons/fc";
import { FaUnlock } from "react-icons/fa";
import { FaLock } from "react-icons/fa";
import { FaLockOpen } from "react-icons/fa";
// Icon para la seccion de proveedores
import { FaPlus } from "react-icons/fa";
//__________ICONOS__________
// Estilos personalizados
import { Container_Search_Bar } from "../styled/Containers";
import { Button_Icon_Green_45,Button_Icon_Green_40,Button_Icon_Blue_40,Button_Icon_Blue_60,Button_Icon_Red_40,Button_Icon_Red_45,Button_Icon_Block_45 } from "../styled/Buttons";
import { Icon_25,Icon_Button_Black_30,Icon_White_14 } from "../styled/Icons";
import { Input_Search } from "../styled/Inputs";
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
    const [isSuppliers] = useContext(SuppliersContext);
    const [isSelect] = useContext(SelectContext);
    // Constantes con la funcionalidad de los hooks
    const changeModalView = HandleChangeModal();
    const changeViewPassword = useChangeViewPassword();
    const navigate = useNavigate();
    const handleSelectChange = useHandleSelectChange();
    // Estructura del componente
    return(
        <>
            <Container_Search_Bar>
                <Icon_25><FcSearch/></Icon_25>
                <Input_Search
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
                {currentSView === 'Users' && currentNView === 'Principal' ? (
                    isPermission.superadministrador ? (
                        isSelectedRow === null ? (
                            <>
                                <Tooltip title='Agregar' placement="top">
                                    <Button_Icon_Green_45 ThemeMode={themeMode} onClick={() => {
                                        changeModalView('Users-Add')
                                        navigate('/Administration/Users/Principal/Add',{ replace: true });
                                    }}>
                                        <FaUserPlus/>
                                    </Button_Icon_Green_45>
                                </Tooltip>
                                <Button_Icon_Block_45 ThemeMode={themeMode}><FaUserEdit/></Button_Icon_Block_45>
                                <Button_Icon_Block_45 ThemeMode={themeMode}><FaUserMinus/></Button_Icon_Block_45>
                                {isViewPassword ? (
                                    <>
                                        <Tooltip title='Ocultar' placement="top">
                                            <Button_Icon_Red_45 ThemeMode={themeMode} onClick={() => changeViewPassword()}><IoIosEyeOff/></Button_Icon_Red_45>
                                        </Tooltip>
                                    </>
                                ):(
                                    <>
                                        <Tooltip title='Ver' placement="top">
                                            <Button_Icon_Green_45 ThemeMode={themeMode} onClick={() => {
                                                changeModalView('Users-View')
                                                navigate('/Administration/Users/Principal/View',{ replace: true });
                                            }}>
                                                <FaEye/>
                                            </Button_Icon_Green_45>
                                        </Tooltip> 
                                    </>
                                )}
                            </>
                        ):(
                            <>
                                <Button_Icon_Block_45><FaUserPlus/></Button_Icon_Block_45>
                                <Tooltip title='Editar' placement="top">
                                    <Button_Icon_Blue_60 ThemeMode={themeMode}><FaUserEdit/></Button_Icon_Blue_60>
                                </Tooltip>
                                <Tooltip title='Eliminar' placement="top">
                                    <Button_Icon_Red_45 ThemeMode={themeMode}><FaUserMinus/></Button_Icon_Red_45>
                                </Tooltip>
                                <Button_Icon_Block_45><FaEye/></Button_Icon_Block_45>
                            </>
                        )
                    ):(
                        isSelectedRow === null ? (
                            <>
                                <Tooltip title='Agregar' placement="top">
                                    <Button_Icon_Green_45 ThemeMode={themeMode} onClick={() => {
                                        changeModalView('Users-Add')
                                        navigate('/Administration/Users/Principal/Add',{ replace: true });
                                    }}>
                                        <FaUserPlus/>
                                    </Button_Icon_Green_45>
                                </Tooltip>
                                <Button_Icon_Block_45 ThemeMode={themeMode}><FaUserEdit/></Button_Icon_Block_45>
                                {isViewPassword ? (
                                    <>
                                        <Tooltip title='Ocultar' placement="top">
                                            <Button_Icon_Red_45 ThemeMode={themeMode} onClick={() => changeViewPassword()}><IoIosEyeOff/></Button_Icon_Red_45>
                                        </Tooltip>
                                    </>
                                ):(
                                    <>
                                        <Tooltip title='Ver' placement="top">
                                            <Button_Icon_Green_45 ThemeMode={themeMode} onClick={() => {
                                                changeModalView('Users-View')
                                                navigate('/Administration/Users/Principal/View',{ replace: true });
                                            }}>
                                                <FaEye/>
                                            </Button_Icon_Green_45>
                                        </Tooltip> 
                                    </>
                                )}
                            </>
                        ):(
                            <>
                                <Button_Icon_Block_45><FaUserPlus/></Button_Icon_Block_45>
                                <Tooltip title='Editar' placement="top">
                                    <Button_Icon_Blue_60 ThemeMode={themeMode}><FaUserEdit/></Button_Icon_Blue_60>
                                </Tooltip>
                                <Button_Icon_Block_45><FaEye/></Button_Icon_Block_45>
                            </>
                        )
                    )
                ):(
                    <></>
                )}
                {currentSView === 'Users' && currentNView === 'Permissions' ? (
                    isPermission.superadministrador ? (
                        isSelectedRow === null ? (
                            <>
                                <Tooltip title="Agregar" placement="top">
                                    <Button_Icon_Green_45 ThemeMode={themeMode} onClick={() => {
                                        changeModalView('Permissions-Add')
                                        navigate('/Administration/Users/Permissions/Add',{ replace: true });
                                    }}>
                                        <MdAddModerator/>
                                    </Button_Icon_Green_45>
                                </Tooltip>
                                <Button_Icon_Block_45 ThemeMode={themeMode}><AiFillEdit/></Button_Icon_Block_45>
                                <Button_Icon_Block_45 ThemeMode={themeMode}><MdAdminPanelSettings/></Button_Icon_Block_45>
                            </>
                        ):(
                            <>
                                <Button_Icon_Block_45 ThemeMode={themeMode}><MdAddModerator/></Button_Icon_Block_45>
                                <Tooltip title="Editar" placement="top">
                                    <Button_Icon_Blue_60 ThemeMode={themeMode} onClick={() => {
                                        changeModalView('Permissions-Edit')
                                        navigate('/Administration/Users/Permissions/Edit',{ replace: true });
                                    }}>
                                        <AiFillEdit/>
                                    </Button_Icon_Blue_60>
                                </Tooltip>
                                {isSelectedRow.superadministrador ? (
                                    <>
                                        <Tooltip title="Deshabilitar" placement="top">
                                            <Button_Icon_Red_45 ThemeMode={themeMode} onClick={() => {
                                                changeModalView('Permissions-Super-Administrator')
                                                navigate('/Administration/Users/Permissions/Enable',{ replace: true });
                                            }}>
                                                <MdAdminPanelSettings/>
                                            </Button_Icon_Red_45>
                                        </Tooltip>
                                    </> 
                                ):(
                                    <>
                                        <Tooltip title="Habilitar" placement="top">
                                            <Button_Icon_Green_45 ThemeMode={themeMode} onClick={() => {
                                                changeModalView('Permissions-Super-Administrator')
                                                navigate('/Administration/Users/Permissions/Enable',{ replace: true });
                                            }}>
                                                <MdAdminPanelSettings/>
                                            </Button_Icon_Green_45>
                                        </Tooltip>
                                    </>
                                )}
                            </>    
                        )                                    
                    ):(
                        isSelectedRow === null ? (
                            <>
                                <Tooltip title="Agregar" placement="top">
                                    <Button_Icon_Green_45 ThemeMode={themeMode} onClick={() => {
                                        changeModalView('Permissions-Add')
                                        navigate('/Administration/Users/Permissions/Add',{ replace: true });
                                    }}>
                                        <MdAddModerator/>
                                    </Button_Icon_Green_45>
                                </Tooltip>
                                <Button_Icon_Block_45 ThemeMode={themeMode}><AiFillEdit/></Button_Icon_Block_45>
                            </>
                        ):(
                            <>
                                <Button_Icon_Block_45 ThemeMode={themeMode}><MdAddModerator/></Button_Icon_Block_45>
                                <Tooltip title="Editar" placement="top">
                                    <Button_Icon_Blue_60 ThemeMode={themeMode} onClick={() => {
                                        changeModalView('Permissions-Edit')
                                        navigate('/Administration/Users/Permissions/Edit',{ replace: true });
                                    }}>
                                        <AiFillEdit/>
                                    </Button_Icon_Blue_60>
                                </Tooltip>
                            </>
                        )
                    )
                ):(
                    <></>
                )}
                {currentSView === 'Users' && currentNView === 'Status' ? (
                    isPermission.superadministrador ? (
                        isSelectedRow === null ? (
                            <>
                                <Tooltip title="Agregar" placement="top">
                                    <Button_Icon_Green_45 ThemeMode={themeMode} onClick={() => {
                                        changeModalView('Status-Add');
                                        navigate('/Administration/Users/Status/Add',{ replace: true });
                                    }}>
                                        <FcAddRow/>
                                    </Button_Icon_Green_45>
                                </Tooltip>
                                <Button_Icon_Block_45 ThemeMode={themeMode}><FaUnlock/></Button_Icon_Block_45>
                            </>
                        ):(
                            <>
                                <Button_Icon_Block_45 ThemeMode={themeMode}><FcAddRow/></Button_Icon_Block_45>
                                {isSelectedRow.habilitado ? (
                                    <>
                                        <Tooltip title="Deshabilitar" placement="top">
                                            <Button_Icon_Red_45 ThemeMode={themeMode} onClick={() => {
                                                changeModalView('Status-Enable')
                                                navigate('/Administration/Users/Status/Enable',{ replace: true });
                                            }}>
                                                <FaLock/>
                                            </Button_Icon_Red_45>
                                        </Tooltip>
                                    </> 
                                ):(
                                    <>
                                        <Tooltip title="Habilitar" placement="top">
                                            <Button_Icon_Green_45 ThemeMode={themeMode} onClick={() => {
                                                changeModalView('Status-Enable')
                                                navigate('/Administration/Users/Status/Enable',{ replace: true });
                                            }}>
                                                <FaLockOpen/>
                                            </Button_Icon_Green_45>
                                        </Tooltip>
                                    </>
                                )}
                            </>    
                        )                                    
                    ):(
                        isSelectedRow === null ? (
                            <>
                                <Tooltip title="Agregar" placement="top">
                                    <Button_Icon_Green_45 ThemeMode={themeMode} onClick={() => {
                                        changeModalView('Status-Add')
                                        navigate('/Administration/Users/Status/Add',{ replace: true });
                                    }}>
                                        <FcAddRow/>
                                    </Button_Icon_Green_45>
                                </Tooltip>
                            </>
                        ):(
                            <>
                                <Button_Icon_Block_45 ThemeMode={themeMode}><FcAddRow/></Button_Icon_Block_45>
                            </>
                        )
                    )
                ):(
                    <></>
                )}
                {currentSView === 'Suppliers' && currentNView === 'Suppliers' ? (
                    
                    <>
                        <Tooltip title='Agregar' placement="top">
                            <Button_Icon_Green_40 ThemeMode={themeMode}>
                                <Icon_White_14>
                                    <FaPlus/>
                                </Icon_White_14>
                            </Button_Icon_Green_40>
                        </Tooltip>
                        <Select
                            options={isSuppliers.map((supplier) => ({
                                value: supplier.idproveedor,
                                label: supplier.nombre
                            }))}
                            styles={{
                                control: (provided) => ({
                                    ...provided,
                                    width: '300px',
                                    padding: '6px',
                                    border: '2px solid black',
                                    cursor: 'pointer',
                                    borderRadius: '15px',
                                    fontFamily: 'Prompt, sans-serif',
                                    fontWeight: 300,
                                    fontStyle: 'normal',
                                    fontSize: '16px',
                                    '@media (max-width: 768px)':{
                                        width: '250px',
                                        padding: '4px',
                                        fontSize: '14px',
                                    },
                                    '@media (max-width: 480px)':{
                                        width: '100px',
                                        padding: '2px',
                                        fontSize: '8px',
                                    },
                                }),
                                menu: (provided) => ({
                                    ...provided,
                                    zIndex: 9999,
                                    overflow: 'hidden',
                                    borderRadius:'15px',
                                    position: 'relative',
                                }),
                                menuList: (provided) => ({
                                    ...provided,
                                    maxHeight:175,
                                    fontFamily: 'Prompt, sans-serif',
                                    fontWeight: 300,
                                    fontStyle: 'normal',
                                    overflowY:'auto',
                                    scrollbarWidth: 'none',
                                    '&::-webkit-scrollbar': {
                                        display:'none',
                                    },
                                    '@media (max-width: 768px)':{
                                        maxHeight:150,
                                    },
                                    '@media (max-width: 480px)':{
                                        maxHeight:125,
                                    },
                                })
                            }}
                            placeholder='Seleccione uno...'
                            value={isSelect}
                            onChange={handleSelectChange}
                        />
                        <Tooltip title='Ver' placement="top">
                            <Button_Icon_Green_40 ThemeMode={themeMode} className={isSelect.length === 0 ? 'roll-out-left' : 'roll-in-left'}>
                                <Icon_White_14>
                                    <FaEye/>
                                </Icon_White_14>
                            </Button_Icon_Green_40>
                        </Tooltip>
                        <Tooltip title='Editar' placement="top">
                            <Button_Icon_Blue_40 ThemeMode={themeMode} className={isSelect.length === 0 ? 'roll-out-left' : 'roll-in-left'}>
                                <Icon_White_14>
                                    <MdEdit/>
                                </Icon_White_14>
                            </Button_Icon_Blue_40>
                        </Tooltip>
                        <Tooltip title='Eliminar' placement="top">
                            <Button_Icon_Red_40 ThemeMode={themeMode} className={isSelect.length === 0 ? 'roll-out-left' : 'roll-in-left'}>
                                <Icon_White_14>
                                    <MdDelete/>
                                </Icon_White_14>
                            </Button_Icon_Red_40>
                        </Tooltip>
                    </>
                ):(
                    <></>
                )}
            </Container_Search_Bar> 
        </>
    );
}