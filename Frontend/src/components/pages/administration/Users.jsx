import { useContext } from "react";
import { sidebarContext,navbarContext } from "../../../contexts/ViewsProvider";

import Navbar from "../../navbar/Navbar"
import SearchBar from '../../searchbar/SearchBar'
import TableUsers from "../../tables/TableUsers";
import TablePermissions from "../../tables/TablePermissions";
import TableStatus from '../../tables/TableStatus';

export default function Users(){

    const [isSidebar] = useContext(sidebarContext);
    const [isNavbar] = useContext(navbarContext);

    return(
        <> 
            <Navbar/> 
            <SearchBar/>  
            {isSidebar === 'Usuarios' ? (
                isNavbar === 'General' ? (
                    <TableUsers/>
                ):(
                    isNavbar === 'Permisos' ? (
                        <TablePermissions/>
                    ):(
                        isNavbar === 'Estatus' ? (
                            <TableStatus/>
                        ):(
                            <></>
                        )
                    )
                )
            ):(
                <></>
            )}
        </>
    )
}