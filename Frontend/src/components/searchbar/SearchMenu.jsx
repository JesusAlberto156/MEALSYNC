import { Tooltip } from "@mui/material";

import { Search_Bar_Menu,Icon_Search_Menu,Search_Menu,Shopping_Cart } from "../styled/Searchbar"
import { FcSearch } from "react-icons/fc";
import { FaShoppingCart } from "react-icons/fa";

export default function SearchMenu ({ isModal }){
    
    const ShoppingCart = async () => {
        isModal(true);
    }

    return(
        <>
            <Search_Bar_Menu>
                <Icon_Search_Menu>
                    <FcSearch/>
                </Icon_Search_Menu>
                <Tooltip title="Buscador" placement="right">
                    <Search_Menu
                        type="text"
                        placeholder="Buscar..."
                    />
                </Tooltip>
                <Shopping_Cart onClick={ShoppingCart}>
                    <FaShoppingCart/>
                </Shopping_Cart>
            </Search_Bar_Menu> 
        </>
    );
}