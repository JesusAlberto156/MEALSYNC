import { Container_Menu } from "../../styled/Containers";
import { Whitespace_Menu } from '../../styled/Whitespaces'

import SearchBar from "../../navegation/SearchBar";
import Navbar from "../../navegation/Navbar";

export default function OptionsMenu(){

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