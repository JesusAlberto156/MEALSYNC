import { useContext } from "react";
import { Tooltip } from "@mui/material";

import { typeUserContext } from "../../contexts/TypeUserProvider";
import { navbarContext,sidebarContext } from "../../contexts/ViewsProvider";
import { searchTermContext } from "../../contexts/VariablesProvider";

import { useModalShoppingCart } from '../../hooks/Modals'

import { FcSearch } from "react-icons/fc";
import { FaShoppingCart } from "react-icons/fa";
import { FaUserPen } from "react-icons/fa6";
import { FaUserPlus } from "react-icons/fa6";
import { FaUserXmark } from "react-icons/fa6";

import { Container_Search_Bar,Container_Button_Search_Bar } from "../styled/Containers";
import { Input_Search_Bar_Menu} from '../styled/Inputs'
import { Icon_Search_Menu,Icon_Shopping_Cart_Menu } from "../styled/Icons";
import { Button_Blue_Search_Bar,Button_Green_Search_Bar,Button_Red_Search_Bar } from "../styled/Buttons";

export default function SearchBar (){
    
    const modalShoppingCart = useModalShoppingCart();
    const [typeUser] = useContext(typeUserContext);
    const [navbar] = useContext(navbarContext);
    const [searchTerm,setSearchTerm] = useContext(searchTermContext);
    const [sidebar] = useContext(sidebarContext);

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
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </Tooltip>
                {typeUser === 'Cocinero' || typeUser === 'Nutriologo' || typeUser === 'Medico' ? (
                    <>
                        <Icon_Shopping_Cart_Menu onClick={modalShoppingCart}>
                            <FaShoppingCart/>
                        </Icon_Shopping_Cart_Menu>
                    </>
                ):(
                    <></>
                )}
                {sidebar === 'Usuarios' ? (
                    navbar === 'General' ? (
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
                        navbar === 'Permisos' ? (
                            <>
                                <Container_Button_Search_Bar>
                                    <Tooltip title="Editar" placement="top">
                                        <Button_Blue_Search_Bar><FaUserPen/></Button_Blue_Search_Bar>
                                    </Tooltip>
                                </Container_Button_Search_Bar>
                            </>
                        ):(
                            navbar === 'Estatus' ? (
                                <>
                                    <Container_Button_Search_Bar>
                                        <Tooltip title="Habilitar/Deshabilitar" placement="right">
                                            <Button_Red_Search_Bar><FaUserXmark/></Button_Red_Search_Bar>
                                        </Tooltip>
                                    </Container_Button_Search_Bar>
                                </>
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