//____________IMPORT/EXPORT____________
// Hooks de React
import { useContext } from "react";
// Componentes de React externos
import { Tooltip } from "@mui/material";
// Servicios

// Rutas

// Contextos
import { navbarViewContext,sidebarViewContext } from "../../contexts/ViewsProvider";
import { typeUserContext,searchTermContext,selectedRowContext } from "../../contexts/VariablesProvider";
import { permissionContext } from "../../contexts/PermissionsProvider"; 
import { searchContext } from "../../contexts/RefsProvider";
// Hooks personalizados
import { useOpenModal } from '../../hooks/Modal'
//__________ICONOS__________

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
import { Button_Icon_Blue_45_Light,Button_Icon_Green_45_Light,Button_Icon_Red_45_Light,Button_Icon_Block_45_Light } from "../styled/Buttons";
// Componentes personalizados

//____________IMPORT/EXPORT____________

export default function SearchBar (){
    // Constantes con el valor de los contextos
    const [isTypeUser] = useContext(typeUserContext);
    const [isNavbar] = useContext(navbarViewContext);
    const [isSearchTerm,setIsSearchTerm] = useContext(searchTermContext);
    const [isSidebar] = useContext(sidebarViewContext);
    const [isSelectedRow] = useContext(selectedRowContext);
    const [isPermission] = useContext(permissionContext);
    const isSearch = useContext(searchContext);
    // Constantes con la funcionalidad de los hooks
    const openModal = useOpenModal();
    // Estructura del componente
    return(
        <>
            <Container_Search_Bar ref={isSearch}>

                
                {isSidebar === 'Users' && isNavbar === 'Permissions' ? (
                    isPermission.superadministrador ? (
                        isSelectedRow === null ? (
                            <>
                                <Tooltip title="Agregar" placement="top">
                                    <Button_Icon_Green_45_Light onClick={() => openModal('Permissions-Add')}><MdAddModerator/></Button_Icon_Green_45_Light>
                                </Tooltip>
                                <Button_Icon_Block_45_Light><AiFillEdit/></Button_Icon_Block_45_Light>
                                <Button_Icon_Block_45_Light><MdAdminPanelSettings/></Button_Icon_Block_45_Light>
                            </>
                        ):(
                            <>
                                <Button_Icon_Block_45_Light><MdAddModerator/></Button_Icon_Block_45_Light>
                                <Tooltip title="Editar" placement="top">
                                    <Button_Icon_Blue_45_Light onClick={() => openModal('Permissions-Edit')}><AiFillEdit/></Button_Icon_Blue_45_Light>
                                </Tooltip>
                                {isSelectedRow.superadministrador ? (
                                    <>
                                        <Tooltip title="Deshabilitar" placement="top">
                                            <Button_Icon_Red_45_Light onClick={() => openModal('Permissions-Super-Administrator')}><MdAdminPanelSettings/></Button_Icon_Red_45_Light>
                                        </Tooltip>
                                    </> 
                                ):(
                                    <>
                                        <Tooltip title="Habilitar" placement="top">
                                            <Button_Icon_Green_45_Light onClick={() => openModal('Permissions-Super-Administrator')}><MdAdminPanelSettings/></Button_Icon_Green_45_Light>
                                        </Tooltip>
                                    </>
                                )}
                            </>    
                        )                                    
                    ):(
                        isSelectedRow === null ? (
                            <>
                                <Tooltip title="Agregar" placement="top">
                                    <Button_Icon_Green_45_Light onClick={() => openModal('Permissions-Add')}><MdAddModerator/></Button_Icon_Green_45_Light>
                                </Tooltip>
                                <Button_Icon_Block_45_Light><AiFillEdit/></Button_Icon_Block_45_Light>
                            </>
                        ):(
                            <>
                                <Button_Icon_Block_45_Light><MdAddModerator/></Button_Icon_Block_45_Light>
                                <Tooltip title="Editar" placement="top">
                                    <Button_Icon_Blue_45_Light onClick={() => openModal('Permissions-Edit')}><AiFillEdit/></Button_Icon_Blue_45_Light>
                                </Tooltip>
                            </>
                        )
                    )
                ):(
                    <></>
                )}
                {isSidebar === 'Users' && isNavbar === 'Status' ? (
                    isPermission.superadministrador ? (
                        isSelectedRow === null ? (
                            <>
                                <Tooltip title="Agregar" placement="top">
                                    <Button_Icon_Green_45_Light onClick={() => openModal('Status-Add')}><FcAddRow/></Button_Icon_Green_45_Light>
                                </Tooltip>
                                <Button_Icon_Block_45_Light><FaUnlock/></Button_Icon_Block_45_Light>
                            </>
                        ):(
                            <>
                                <Button_Icon_Block_45_Light><FcAddRow/></Button_Icon_Block_45_Light>
                                {isSelectedRow.habilitado ? (
                                    <>
                                        <Tooltip title="Deshabilitar" placement="top">
                                            <Button_Icon_Red_45_Light onClick={() => openModal('Status-Enable')}><FaLock/></Button_Icon_Red_45_Light>
                                        </Tooltip>
                                    </> 
                                ):(
                                    <>
                                        <Tooltip title="Habilitar" placement="top">
                                            <Button_Icon_Green_45_Light onClick={() => openModal('Status-Enable')}><FaLockOpen/></Button_Icon_Green_45_Light>
                                        </Tooltip>
                                    </>
                                )}
                            </>    
                        )                                    
                    ):(
                        isSelectedRow === null ? (
                            <>
                                <Tooltip title="Agregar" placement="top">
                                    <Button_Icon_Green_45_Light onClick={() => openModal('Status-Add')}><FcAddRow/></Button_Icon_Green_45_Light>
                                </Tooltip>
                            </>
                        ):(
                            <>
                                <Button_Icon_Block_45_Light><FcAddRow/></Button_Icon_Block_45_Light>
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