import { useContext } from 'react';
import { viewNavbarContext } from '../../../contexts/SwitchViewNavbarProvider'
import Navbar from "../../navbar/Navbar"
import SearchBar from '../../searchbar/SearchBar'
import TableUsers from "../../tables/TableUsers";
import TablePermissions from '../../tables/TablePermissions';
import TableStatus from '../../tables/TableStatus';

export default function Users(){

    const [viewNavbar] = useContext(viewNavbarContext)

    return(
        <> 
            <Navbar/> 
            <SearchBar/>  
            {viewNavbar === 'General' ? (
                <TableUsers/>
            ):(
                <></>
            )}
            {viewNavbar === 'Permisos' ? (
                <TablePermissions/>
            ):(
                <></>
            )}
            {viewNavbar === 'Estatus' ? (
                <TableStatus/>
            ):(
                <></>
            )}
        </>
    )
}