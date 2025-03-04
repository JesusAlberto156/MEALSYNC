import { Tooltip } from "@mui/material";
import { useState } from "react";

import { Card_Menu } from "../cards/CardMenuOptions";
import { Background_Menu } from "../styled/Menu";
import { Whitespace_100 } from "../styled/Sidebar";

import SearchMenu from "../searchbar/SearchMenu";
import ShoppingCart from"../modals/ShoppingCart";

export default function OptionsMenu(){
    
    const [modalShopping,setModalShopping] = useState(false);

    return(
        <>
            <SearchMenu isModal={setModalShopping}/> 
            {modalShopping ? (
                <ShoppingCart isModal={setModalShopping}/>
            ):(
                <></>
            )}
            <Background_Menu>

            </Background_Menu> 
            <Whitespace_100/>           
        </>
    )
}