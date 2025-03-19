import { useState,useContext } from "react";
import { usersContext } from "../contexts/UsersProvider";
import { selectedRowContext } from "../contexts/SelectedRowProvider";
import { searchTermContext } from '../contexts/SearchTermProvider';
import { permissionsContext } from "../contexts/PermissionsProvider";
import { statusUsersContext } from "../contexts/StatusUsersProvider";

export const useTableActions = () => {

    const [users,setUsers] = useContext(usersContext);
    const [permissions,setPermissions] = useContext(permissionsContext);
    const [statusUsers,setStatusUsers] = useContext(statusUsersContext);
    const [selectedRow,setSelectedRow] = useContext(selectedRowContext);
    const [searchTerm, setSearchTerm] = useContext(searchTermContext);
    
    const [currentPage, setCurrentPage] = useState(1);
    

    const filteredRecordsUsers = users.filter((data) =>
        Object.values(data).some((value) =>
          value.toString().toLowerCase().includes(searchTerm.toLowerCase())
        )
    );
    const filteredRecordsPermissions = permissions.filter((data) => {
        const user = users.find(user => user.idusuario === data.idusuario);
        return user && user.nombre.toLowerCase().includes(searchTerm.toLowerCase());
    });
    const filteredRecordsStatus = statusUsers.filter((data) => {
        const user = users.find(user => user.idusuario === data.idusuario);
        return user && user.nombre.toLowerCase().includes(searchTerm.toLowerCase());
    });

    const recordsPerPage = 10;

    const indexOfLastRecord = currentPage * recordsPerPage;
    const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
    
    const totalPagesUsers = Math.ceil(filteredRecordsUsers.length / recordsPerPage);
    const totalPagesPermissions = Math.ceil(filteredRecordsPermissions.length / recordsPerPage);
    const totalPagesStatus = Math.ceil(filteredRecordsStatus.length / recordsPerPage);

    const currentRecordsUsers = filteredRecordsUsers.slice(indexOfFirstRecord, indexOfLastRecord);
    const currentRecordsPermissions = filteredRecordsPermissions.slice(indexOfFirstRecord, indexOfLastRecord);
    const currentRecordsStatus = filteredRecordsStatus.slice(indexOfFirstRecord, indexOfLastRecord);

    const handleRowClick = (user) => {
        setSelectedRow((prevSelected) => (prevSelected === user ? null : user));
    };

    const nextPageUsers = () => {
        if (currentPage < totalPagesUsers) setCurrentPage(currentPage + 1);
    };
    const nextPagePermissions = () => {
        if (currentPage < totalPagesPermissions) setCurrentPage(currentPage + 1);
    };
    const nextPageStatus = () => {
        if (currentPage < totalPagesStatus) setCurrentPage(currentPage + 1);
    };

    const prevPage = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1);
    };
    
    return { handleRowClick, prevPage, currentPage,
             nextPageUsers, nextPagePermissions, nextPageStatus,
             currentRecordsUsers, currentRecordsPermissions, currentRecordsStatus,
             totalPagesUsers, totalPagesPermissions, totalPagesStatus}
}