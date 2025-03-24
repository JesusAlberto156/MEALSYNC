import { useContext } from "react";
import { sidebarContext,navbarContext } from "../../../contexts/ViewsProvider";
import { modalUserEnableContext } from "../../../contexts/ModalsProvider";

import Navbar from "../../navbar/Navbar"
import SearchBar from '../../searchbar/SearchBar'
import TableUsers from "../../tables/TableUsers";
import TablePermissions from "../../tables/TablePermissions";
import TableStatus from '../../tables/TableStatus';
import UserEnable from "../../modals/UserEnable";

export default function Users(){

    const [sidebar] = useContext(sidebarContext);
    const [navbar] = useContext(navbarContext);
    const [isModalUserEnable] = useContext(modalUserEnableContext);

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
            {isModalUserEnable ? (
                <UserEnable/>
            ):(
                <></>
            )}
        </>
    )
}