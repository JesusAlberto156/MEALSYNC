import { useContext } from "react";
import { Tooltip } from "@mui/material";

import { typeUserContext } from "../../contexts/TypeUserProvider";
import { navbarContext,sidebarContext } from "../../contexts/ViewsProvider";
import { searchTermContext,selectedRowContext } from "../../contexts/VariablesProvider";
import { permissionContext } from "../../contexts/PermissionsProvider"; 

import { useModal } from '../../hooks/Modal'

import { FcSearch } from "react-icons/fc";
import { FaShoppingCart } from "react-icons/fa";
import { FaUserPen } from "react-icons/fa6";
import { FaUserPlus } from "react-icons/fa6";
import { FaUserXmark } from "react-icons/fa6";
import { FaUserCheck } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import { FaUserMinus } from "react-icons/fa";
import { FaUserTie } from "react-icons/fa6";

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
                        <>
                            <Container_Button_Search_Bar>
                                <Tooltip title="Crear" placement="top">
                                    <Button_Green_Search_Bar><FaUserPlus/></Button_Green_Search_Bar>
                                </Tooltip>
                                <Tooltip title="Editar" placement="top">
                                    <Button_Blue_Search_Bar><FaUserPen/></Button_Blue_Search_Bar>
                                </Tooltip>
                            </Container_Button_Search_Bar>
                        </>
                    ):(
                        isNavbar === 'Permisos' ? (
                            isPermission.superAdmon ? (
                                isSelectedRow === null ? (
                                    <>
                                        <Container_Button_Search_Bar>
                                            <Tooltip title="" placement="top">
                                                <Button_Block_Search_Bar><FaUserPlus/></Button_Block_Search_Bar>
                                            </Tooltip>
                                            <Tooltip title="" placement="top">
                                                <Button_Block_Search_Bar><FaUserPen/></Button_Block_Search_Bar>
                                            </Tooltip>
                                            <Tooltip title="" placement="top">
                                                <Button_Block_Search_Bar><FaUserMinus/></Button_Block_Search_Bar>
                                            </Tooltip>
                                            <Tooltip title="" placement="top">
                                                <Button_Block_Search_Bar><FaUserTie/></Button_Block_Search_Bar>
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
                                                <Button_Blue_Search_Bar><FaUserPen/></Button_Blue_Search_Bar>
                                            </Tooltip>
                                            <Tooltip title="Eliminar" placement="top">
                                                <Button_Red_Search_Bar><FaUserMinus/></Button_Red_Search_Bar>
                                            </Tooltip>
                                            {isSelectedRow.superAdmon ? (
                                                <Tooltip title="Super Administrador" placement="top">
                                                    <Button_Red_Search_Bar><FaUserTie/></Button_Red_Search_Bar>
                                                </Tooltip>
                                            ):(
                                                <Tooltip title="Super Administrador" placement="top">
                                                    <Button_Green_Search_Bar><FaUserTie/></Button_Green_Search_Bar>
                                                </Tooltip>
                                            )}
                                        </Container_Button_Search_Bar>
                                    </>
                                )
                            ):(
                                isSelectedRow === null ? (
                                    <>
                                        <Container_Button_Search_Bar>
                                            <Tooltip title="" placement="top">
                                                <Button_Block_Search_Bar><FaUserPen/></Button_Block_Search_Bar>
                                            </Tooltip>
                                        </Container_Button_Search_Bar>
                                    </>    
                                ):(
                                    <>
                                        <Container_Button_Search_Bar>
                                            <Tooltip title="Editar" placement="top">
                                                <Button_Blue_Search_Bar><FaUserPen/></Button_Blue_Search_Bar>
                                            </Tooltip>
                                        </Container_Button_Search_Bar>
                                    </>
                                )
                            )
                        ):(
                            isNavbar === 'Estatus' && isPermission.superAdmon ? (
                                isSelectedRow === null ? (
                                    <>
                                        <Container_Button_Search_Bar>
                                            <Tooltip title="" placement="top">
                                                <Button_Block_Search_Bar><FaUser/></Button_Block_Search_Bar>
                                            </Tooltip>
                                        </Container_Button_Search_Bar>
                                    </>
                                ):(
                                    isSelectedRow.habilitado ? (
                                        <>
                                            <Container_Button_Search_Bar>
                                                <Tooltip title="Deshabilitar" placement="top">
                                                    <Button_Red_Search_Bar onClick={() => modal('Habilitar-Usuario')} id="Deshabilitar"><FaUserXmark/></Button_Red_Search_Bar>
                                                </Tooltip>
                                            </Container_Button_Search_Bar>
                                        </>    
                                    ):(
                                        <>
                                            <Container_Button_Search_Bar>
                                                <Tooltip title="Habilitar" placement="top">
                                                    <Button_Green_Search_Bar onClick={() => modal('Habilitar-Usuario')} id="Habilitar"><FaUserCheck/></Button_Green_Search_Bar>
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