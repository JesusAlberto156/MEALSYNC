import { useContext } from "react";
import { Tooltip } from "@mui/material";

import { typeUserContext } from "../../contexts/TypeUserProvider";
import { navbarContext,sidebarContext } from "../../contexts/ViewsProvider";
import { searchTermContext,selectedRowContext } from "../../contexts/VariablesProvider";
import { permissionContext } from "../../contexts/PermissionsProvider"; 

import { useModal } from '../../hooks/Modal'

import { FcSearch } from "react-icons/fc";
import { FaShoppingCart } from "react-icons/fa";
import { FaUserEdit } from "react-icons/fa";
import { FaUserPlus } from "react-icons/fa6";
import { MdAddModerator } from "react-icons/md";
import { MdRemoveModerator } from "react-icons/md";
import { MdEdit } from "react-icons/md";
import { FaUserSecret } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { IoMdAddCircle } from "react-icons/io";
import { FaUnlock } from "react-icons/fa";
import { FaLock } from "react-icons/fa";
import { FaLockOpen } from "react-icons/fa";

import { Container_Search_Bar,Container_Button_Search_Bar } from "../styled/Containers";
import { Input_Search_Bar_Menu} from '../styled/Inputs'
import { Icon_Search_Menu,Icon_Shopping_Cart_Menu } from "../styled/Icons";
import { Button_Blue_Search_Bar,Button_Green_Search_Bar,Button_Red_Search_Bar,Button_Block_Search_Bar } from "../styled/Buttons";

export default function SearchBar (){
    
    const modal = useModal();
    const [isTypeUser] = useContext(typeUserContext);
    const [isNavbar] = useContext(navbarContext);
    const [isSearchTerm,setIsSearchTerm] = useContext(searchTermContext);
    const [isSidebar] = useContext(sidebarContext);
    const [isSelectedRow] = useContext(selectedRowContext);
    const [isPermission] = useContext(permissionContext);

    return(
        <>
            <Container_Search_Bar>
                <Icon_Search_Menu>
                    <FcSearch/>
                </Icon_Search_Menu>
                <Tooltip title="Buscador" placement="right">
                    <Input_Search_Bar_Menu
                        type="text"
                        placeholder="Buscar..."
                        value={isSearchTerm}
                        onChange={(e) => setIsSearchTerm(e.target.value)}
                    />
                </Tooltip>
                {isTypeUser === 'Cocinero' || isTypeUser === 'Nutriologo' || isTypeUser === 'Medico' ? (
                    <>
                        <Icon_Shopping_Cart_Menu onClick={() => modal('Carro-Compras')}>
                            <FaShoppingCart/>
                        </Icon_Shopping_Cart_Menu>
                    </>
                ):(
                    <></>
                )}
                {isSidebar === 'Usuarios' ? (
                    isNavbar === 'General' ? (
                        isSelectedRow === null ? (
                            <>
                                <Container_Button_Search_Bar>
                                    <Tooltip title="" placement="top">
                                        <Button_Block_Search_Bar><FaUserPlus/></Button_Block_Search_Bar>
                                    </Tooltip>
                                    <Tooltip title="" placement="top">
                                        <Button_Block_Search_Bar><FaUserEdit/></Button_Block_Search_Bar>
                                    </Tooltip>
                                </Container_Button_Search_Bar>
                            </>    
                        ):(
                            <>
                                <Container_Button_Search_Bar>
                                    <Tooltip title="Agregar" placement="top">
                                        <Button_Green_Search_Bar><FaUserPlus/></Button_Green_Search_Bar>
                                    </Tooltip>
                                    <Tooltip title="Editar" placement="top">
                                        <Button_Blue_Search_Bar><FaUserEdit/></Button_Blue_Search_Bar>
                                    </Tooltip>
                                </Container_Button_Search_Bar>
                            </>
                        )
                    ):(
                        isNavbar === 'Permisos' ? (
                            isPermission.superAdmon ? (
                                isSelectedRow === null ? (
                                    <>
                                        <Container_Button_Search_Bar>
                                            <Tooltip title="Agregar" placement="top">
                                                <Button_Green_Search_Bar onClick={() => modal('Agregar-Permisos')}><MdAddModerator/></Button_Green_Search_Bar>
                                            </Tooltip>
                                            <Tooltip title="" placement="top">
                                                <Button_Block_Search_Bar><MdEdit/></Button_Block_Search_Bar>
                                            </Tooltip>
                                            <Tooltip title="" placement="top">
                                                <Button_Block_Search_Bar><MdRemoveModerator/></Button_Block_Search_Bar>
                                            </Tooltip>
                                            <Tooltip title="" placement="top">
                                                <Button_Block_Search_Bar><FaUserSecret/></Button_Block_Search_Bar>
                                            </Tooltip>
                                        </Container_Button_Search_Bar>
                                    </>    
                                ):(
                                    <>
                                        <Container_Button_Search_Bar>
                                            <Tooltip title="" placement="top">
                                                <Button_Block_Search_Bar><MdAddModerator/></Button_Block_Search_Bar>
                                            </Tooltip>
                                            <Tooltip title="Editar" placement="top">
                                                <Button_Blue_Search_Bar id="boton-permisos-editar" onClick={() => modal('Editar-Permisos')}><MdEdit/></Button_Blue_Search_Bar>
                                            </Tooltip>
                                            <Tooltip title="Eliminar" placement="top">
                                                <Button_Red_Search_Bar id="boton-permisos-eliminar" onClick={() => modal('Eliminar-Permisos')}><MdRemoveModerator/></Button_Red_Search_Bar>
                                            </Tooltip>
                                            {isSelectedRow.superAdmon ? (
                                                <Tooltip title="Super Administrador" placement="top">
                                                    <Button_Red_Search_Bar id="boton-permisos-super-administrador" onClick={() => modal('Super-Administrador-Permisos')}><FaUserSecret/></Button_Red_Search_Bar>
                                                </Tooltip>
                                            ):(
                                                <Tooltip title="Super Administrador" placement="top">
                                                    <Button_Green_Search_Bar id="boton-permisos-super-administrador" onClick={() => modal('Super-Administrador-Permisos')}><FaUserSecret/></Button_Green_Search_Bar>
                                                </Tooltip>
                                            )}
                                        </Container_Button_Search_Bar>
                                    </>
                                )
                            ):(
                                isSelectedRow === null ? (
                                    <>
                                        <Container_Button_Search_Bar>
                                            <Tooltip title="Agregar" placement="top">
                                                <Button_Green_Search_Bar onClick={() => modal('Agregar-Permisos')}><MdAddModerator/></Button_Green_Search_Bar>
                                            </Tooltip>
                                            <Tooltip title="" placement="top">
                                                <Button_Block_Search_Bar><MdEdit/></Button_Block_Search_Bar>
                                            </Tooltip>
                                        </Container_Button_Search_Bar>
                                    </>    
                                ):(
                                    <>
                                        <Container_Button_Search_Bar>
                                            <Tooltip title="" placement="top">
                                                <Button_Block_Search_Bar><MdAddModerator/></Button_Block_Search_Bar>
                                            </Tooltip>
                                            <Tooltip title="Editar" placement="top">
                                                <Button_Blue_Search_Bar id="boton-permisos-editar" onClick={() => modal('Editar-Permisos')}><MdEdit/></Button_Blue_Search_Bar>
                                            </Tooltip>
                                        </Container_Button_Search_Bar>
                                    </>
                                )
                            )
                        ):(
                            isNavbar === 'Estatus' ? (
                                isPermission.superAdmon ? (
                                    isSelectedRow === null ? (
                                        <>
                                            <Container_Button_Search_Bar>
                                                <Tooltip title="Agregar" placement="top">
                                                    <Button_Green_Search_Bar onClick={() => modal('Agregar-Estatus')}><IoMdAddCircle/></Button_Green_Search_Bar>
                                                </Tooltip>
                                                <Tooltip title="" placement="top">
                                                    <Button_Block_Search_Bar><FaUnlock/></Button_Block_Search_Bar>
                                                </Tooltip>
                                                <Tooltip title="" placement="top">
                                                    <Button_Block_Search_Bar><MdDelete/></Button_Block_Search_Bar>
                                                </Tooltip>
                                            </Container_Button_Search_Bar>
                                        </>
                                    ):(
                                        <>
                                            <Container_Button_Search_Bar>
                                                <Tooltip title="" placement="top">
                                                    <Button_Block_Search_Bar><IoMdAddCircle/></Button_Block_Search_Bar>
                                                </Tooltip>
                                                {isSelectedRow.habilitado ? (
                                                    <>
                                                        <Tooltip title="Deshabilitar" placement="top">
                                                            <Button_Red_Search_Bar id="Boton-Estatus-Deshabilitar" onClick={() => modal('Habilitar-Estatus')}><FaLock/></Button_Red_Search_Bar>
                                                        </Tooltip>
                                                    </> 
                                                ):(
                                                    <>
                                                        <Tooltip title="Habilitar" placement="top">
                                                            <Button_Green_Search_Bar id="Boton-Estatus-Habilitar" onClick={() => modal('Habilitar-Estatus')}><FaLockOpen/></Button_Green_Search_Bar>
                                                        </Tooltip>
                                                    </>
                                                )}
                                                <Tooltip title="Eliminar" placement="top">
                                                    <Button_Red_Search_Bar id="Boton-Estatus-Eliminar" onClick={() => modal('Eliminar-Estatus')}><MdDelete/></Button_Red_Search_Bar>
                                                </Tooltip>
                                            </Container_Button_Search_Bar>
                                        </>    
                                    )                                    
                                ):(
                                    isSelectedRow === null ? (
                                        <>
                                            <Container_Button_Search_Bar>
                                                <Tooltip title="Agregar" placement="top">
                                                    <Button_Green_Search_Bar id="Boton-Estatus-Agregar" onClick={() => modal('Agregar-Estatus')}><IoMdAddCircle/></Button_Green_Search_Bar>
                                                </Tooltip>
                                            </Container_Button_Search_Bar>
                                        </>
                                    ):(
                                        <>
                                            <Container_Button_Search_Bar>
                                                <Tooltip title="" placement="top">
                                                    <Button_Block_Search_Bar><IoMdAddCircle/></Button_Block_Search_Bar>
                                                </Tooltip>
                                            </Container_Button_Search_Bar>
                                        </>
                                    )
                                )
                            ):(
                                <></>
                            )
                        )
                    )
                ):(
                    <></>
                )}
            </Container_Search_Bar> 
        </>
    );
}