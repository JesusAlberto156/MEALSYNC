import { Container_Menu } from "../styled/Containers";
import { Whitespace_Menu } from '../styled/Whitespaces'

import SearchBar from "../searchbar/SearchBar";
import Navbar from "../navbar/Navbar";

export default function OptionsMenu({ isModalShoppingCart }){

    return(
        <>
            <Navbar/>
            <SearchBar/> 
            <Container_Menu>

            </Container_Menu> 
            <Whitespace_Menu/>           
        </>
    )
}