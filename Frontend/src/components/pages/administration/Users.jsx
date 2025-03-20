import { useContext } from "react";
import { sidebarContext,navbarContext } from "../../../contexts/ViewsProvider";

import Navbar from "../../navbar/Navbar"
import SearchBar from '../../searchbar/SearchBar'
import TableUsers from "../../tables/TableUsers";
import TablePermissions from "../../tables/TablePermissions";
import TableStatus from '../../tables/TableStatus';

export default function Users(){

    const [sidebar] = useContext(sidebarContext);
    const [navbar] = useContext(navbarContext);

    return(
        <> 
            <Navbar/> 
            <SearchBar/>  
            {sidebar === 'Usuarios' ? (
                navbar === 'General' ? (
                    <TableUsers/>
                ):(
                    navbar === 'Permisos' ? (
                        <TablePermissions/>
                    ):(
                        navbar === 'Estatus' ? (
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