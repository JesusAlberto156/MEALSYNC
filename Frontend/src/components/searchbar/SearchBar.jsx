import { useContext } from "react";
import { typeUserContext } from "../../contexts/TypeUserProvider";
import { useModalShoppingCart } from '../../hooks/Modals'

import { Tooltip } from "@mui/material";

import { Container_Search_Bar } from "../styled/Containers";
import { Input_Search_Bar_Menu} from '../styled/Inputs'
import { Icon_Search_Menu,Icon_Shopping_Cart_Menu } from "../styled/Icons";

import { FcSearch } from "react-icons/fc";
import { FaShoppingCart } from "react-icons/fa";

export default function SearchBar (){
    
    const modalShoppingCart = useModalShoppingCart();
    const [typeUser] = useContext(typeUserContext);

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
            </Container_Search_Bar> 
        </>
    );
}