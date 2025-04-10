//____________IMPORT/EXPORT____________
// Hooks de React
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
// Componentes de React externos
import { Tooltip } from "@mui/material";
// Contextos
import { themeModeContext,navbarViewContext,sidebarViewContext } from "../../contexts/ViewsProvider";
import { typeUserContext,searchTermContext,selectedRowContext,viewPasswordContext } from "../../contexts/VariablesProvider";
import { permissionContext } from "../../contexts/PermissionsProvider"; 
import { refButtonUsersContext,refButtonPermissionsContext,refButtonStatusContext } from "../../contexts/RefsProvider";
// Hooks personalizados
import { useChangeModalView } from "../../hooks/Views";
import { useChangeViewPassword } from "../../hooks/Form";
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
import { FaUnlock } from "react-icons/fa";
import { FaLock } from "react-icons/fa";
import { FaLockOpen } from "react-icons/fa";
//__________ICONOS__________
// Estilos personalizados
import { Container_Search_Bar } from "../styled/Containers";
import { Button_Icon_Green_45,Button_Icon_Blue_45,Button_Icon_Red_45,Button_Icon_Block_45 } from "../styled/Buttons";
import { Icon_25,Icon_Button_25 } from "../styled/Icons";
import { Input_Search } from "../styled/Inputs";
// Componentes personalizados

//____________IMPORT/EXPORT____________

// Componente para buscar elementos o acciones en las tablas
export default function Search_Bar (){
    // Constantes con el valor de los contextos
    const [themeMode] = useContext(themeModeContext);
    const [currentNView] = useContext(navbarViewContext);
    const [currentSView] = useContext(sidebarViewContext);
    const [isSearchTerm,setIsSearchTerm] = useContext(searchTermContext);
    const [isTypeUser] = useContext(typeUserContext);
    const [isSelectedRow] = useContext(selectedRowContext);
    const [isPermission] = useContext(permissionContext);
    const [isViewPassword] = useContext(viewPasswordContext);
    const {Button_Edit_U,Button_Delete_U} = useContext(refButtonUsersContext);
    const {Button_Edit_P,Button_Super_P} = useContext(refButtonPermissionsContext);
    const isButtonS = useContext(refButtonStatusContext);
    // Constantes con la funcionalidad de los hooks
    const changeModalView = useChangeModalView();
    const changeViewPassword = useChangeViewPassword();
    const navigate = useNavigate();
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
                            <Icon_Button_25 ThemeMode={themeMode}><FaShoppingCart/></Icon_Button_25>
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
                                    <Button_Icon_Blue_45 ThemeMode={themeMode} ref={Button_Edit_U}><FaUserEdit/></Button_Icon_Blue_45>
                                </Tooltip>
                                <Tooltip title='Eliminar' placement="top">
                                    <Button_Icon_Red_45 ThemeMode={themeMode} ref={Button_Delete_U}><FaUserMinus/></Button_Icon_Red_45>
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
                                    <Button_Icon_Blue_45 ThemeMode={themeMode} ref={Button_Edit_U}><FaUserEdit/></Button_Icon_Blue_45>
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
                                    <Button_Icon_Blue_45 ref={Button_Edit_P} ThemeMode={themeMode} onClick={() => {
                                        changeModalView('Permissions-Edit')
                                        navigate('/Administration/Users/Permissions/Edit',{ replace: true });
                                    }}>
                                        <AiFillEdit/>
                                    </Button_Icon_Blue_45>
                                </Tooltip>
                                {isSelectedRow.superadministrador ? (
                                    <>
                                        <Tooltip title="Deshabilitar" placement="top">
                                            <Button_Icon_Red_45 ref={Button_Super_P} ThemeMode={themeMode} onClick={() => {
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
                                            <Button_Icon_Green_45 ref={Button_Super_P} ThemeMode={themeMode} onClick={() => {
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
                                    <Button_Icon_Blue_45 ref={Button_Edit_P} ThemeMode={themeMode} onClick={() => {
                                        changeModalView('Permissions-Edit')
                                        navigate('/Administration/Users/Permissions/Edit',{ replace: true });
                                    }}>
                                        <AiFillEdit/>
                                    </Button_Icon_Blue_45>
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
                                            <Button_Icon_Red_45 ref={isButtonS} ThemeMode={themeMode} onClick={() => {
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
                                            <Button_Icon_Green_45 ref={isButtonS} ThemeMode={themeMode} onClick={() => {
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
            </Container_Search_Bar> 
        </>
    );
}