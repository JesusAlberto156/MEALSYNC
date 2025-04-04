//____________IMPORT/EXPORT____________
// Hooks de React
import { useContext } from "react";
// Componentes de React externos
import { Tooltip } from "@mui/material";
// Contextos
import { themeModeContext,navbarViewContext,sidebarViewContext } from "../../contexts/ViewsProvider";
import { typeUserContext,searchTermContext,selectedRowContext } from "../../contexts/VariablesProvider";
import { permissionContext } from "../../contexts/PermissionsProvider"; 
import { searchContext } from "../../contexts/RefsProvider";
// Hooks personalizados
import { useChangeModalView } from "../../hooks/Views";
//__________ICONOS__________
// Icono para la el buscador
import { FcSearch } from "react-icons/fc";
// Iconos para la seccion de usuarios

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
import { Container_Searchbar } from "../styled/Containers";
import { Button_Icon_Green_45,Button_Icon_Blue_45,Button_Icon_Red_45,Button_Icon_Block_45 } from "../styled/Buttons";
import { Icon_Search } from "../styled/Icons";
import { Input_Search } from "../styled/Inputs";
// Componentes personalizados

//____________IMPORT/EXPORT____________

// Componente para buscar elementos o acciones en las tablas
export default function SearchBar (){
    // Constantes con el valor de los contextos
    const [themeMode] = useContext(themeModeContext);
    const [currentNView] = useContext(navbarViewContext);
    const [currentSView] = useContext(sidebarViewContext);
    const [isSearchTerm,setIsSearchTerm] = useContext(searchTermContext);
    const [isTypeUser] = useContext(typeUserContext);
    const [isSelectedRow] = useContext(selectedRowContext);
    const [isPermission] = useContext(permissionContext);
    const isSearch = useContext(searchContext);
    // Constantes con la funcionalidad de los hooks
    const changeModalView = useChangeModalView();
    // Estructura del componente
    return(
        <>
            <Container_Searchbar ref={isSearch}>
                <Icon_Search>
                    <FcSearch/>
                </Icon_Search>
                <Input_Search
                    type="text"
                    placeholder="Buscar..."
                    value={isSearchTerm}
                    onChange={(e) => setIsSearchTerm(e.target.value)}
                />
                
                {currentSView === 'Users' && currentNView === 'Permissions' ? (
                    isPermission.superadministrador ? (
                        isSelectedRow === null ? (
                            <>
                                <Tooltip title="Agregar" placement="top">
                                    <Button_Icon_Green_45 ThemeMode={themeMode} onClick={() => changeModalView('Permissions-Add')}><MdAddModerator/></Button_Icon_Green_45>
                                </Tooltip>
                                <Button_Icon_Block_45 ThemeMode={themeMode}><AiFillEdit/></Button_Icon_Block_45>
                                <Button_Icon_Block_45 ThemeMode={themeMode}><MdAdminPanelSettings/></Button_Icon_Block_45>
                            </>
                        ):(
                            <>
                                <Button_Icon_Block_45 ThemeMode={themeMode}><MdAddModerator/></Button_Icon_Block_45>
                                <Tooltip title="Editar" placement="top">
                                    <Button_Icon_Blue_45 ThemeMode={themeMode} onClick={() => changeModalView('Permissions-Edit')}><AiFillEdit/></Button_Icon_Blue_45>
                                </Tooltip>
                                {isSelectedRow.superadministrador ? (
                                    <>
                                        <Tooltip title="Deshabilitar" placement="top">
                                            <Button_Icon_Red_45 ThemeMode={themeMode} onClick={() => changeModalView('Permissions-Super-Administrator')}><MdAdminPanelSettings/></Button_Icon_Red_45>
                                        </Tooltip>
                                    </> 
                                ):(
                                    <>
                                        <Tooltip title="Habilitar" placement="top">
                                            <Button_Icon_Green_45 ThemeMode={themeMode} onClick={() => changeModalView('Permissions-Super-Administrator')}><MdAdminPanelSettings/></Button_Icon_Green_45>
                                        </Tooltip>
                                    </>
                                )}
                            </>    
                        )                                    
                    ):(
                        isSelectedRow === null ? (
                            <>
                                <Tooltip title="Agregar" placement="top">
                                    <Button_Icon_Green_45 ThemeMode={themeMode} onClick={() => changeModalView('Permissions-Add')}><MdAddModerator/></Button_Icon_Green_45>
                                </Tooltip>
                                <Button_Icon_Block_45 ThemeMode={themeMode}><AiFillEdit/></Button_Icon_Block_45>
                            </>
                        ):(
                            <>
                                <Button_Icon_Block_45 ThemeMode={themeMode}><MdAddModerator/></Button_Icon_Block_45>
                                <Tooltip title="Editar" placement="top">
                                    <Button_Icon_Blue_45 ThemeMode={themeMode} onClick={() => changeModalView('Permissions-Edit')}><AiFillEdit/></Button_Icon_Blue_45>
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
                                    <Button_Icon_Green_45 ThemeMode={themeMode} onClick={() => changeModalView('Status-Add')}><FcAddRow/></Button_Icon_Green_45>
                                </Tooltip>
                                <Button_Icon_Block_45 ThemeMode={themeMode}><FaUnlock/></Button_Icon_Block_45>
                            </>
                        ):(
                            <>
                                <Button_Icon_Block_45 ThemeMode={themeMode}><FcAddRow/></Button_Icon_Block_45>
                                {isSelectedRow.habilitado ? (
                                    <>
                                        <Tooltip title="Deshabilitar" placement="top">
                                            <Button_Icon_Red_45 ThemeMode={themeMode} onClick={() => changeModalView('Status-Enable')}><FaLock/></Button_Icon_Red_45>
                                        </Tooltip>
                                    </> 
                                ):(
                                    <>
                                        <Tooltip title="Habilitar" placement="top">
                                            <Button_Icon_Green_45 ThemeMode={themeMode} onClick={() => changeModalView('Status-Enable')}><FaLockOpen/></Button_Icon_Green_45>
                                        </Tooltip>
                                    </>
                                )}
                            </>    
                        )                                    
                    ):(
                        isSelectedRow === null ? (
                            <>
                                <Tooltip title="Agregar" placement="top">
                                    <Button_Icon_Green_45 ThemeMode={themeMode} onClick={() => changeModalView('Status-Add')}><FcAddRow/></Button_Icon_Green_45>
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
            </Container_Searchbar> 
        </>
    );
}