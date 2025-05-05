import { useState,useContext } from "react";

import { UsersContext,PermissionsContext,StatusContext } from "../contexts/UsersProvider";
import { SelectedRowContext,SearchTermContext } from "../contexts/VariablesProvider";


export const TableActions = () => {

    const [isUsers] = useContext(UsersContext);
    const [isPermissions] = useContext(PermissionsContext);
    const [isStatusAll] = useContext(StatusContext);
    const [isSelectedRow,setIsSelectedRow] = useContext(SelectedRowContext);
    const [isSearchTerm] = useContext(SearchTermContext);
    
    const [currentPage, setCurrentPage] = useState(1);
    

    const filteredRecordsUsers = isUsers.filter((data) =>
        Object.values(data).some((value) =>
          value.toString().toLowerCase().includes(isSearchTerm.toLowerCase())
        )
    );
    const filteredRecordsPermissions = isPermissions.filter((data) => {
        const user = isUsers.find(user => user.idusuario === data.idusuario);
        return user && user.nombre.toLowerCase().includes(isSearchTerm.toLowerCase());
    });
    const filteredRecordsStatus = isStatusAll.filter((data) => {
        const user = isUsers.find(user => user.idusuario === data.idusuario);
        return user && user.nombre.toLowerCase().includes(isSearchTerm.toLowerCase());
    });

    const recordsPerPage = 8;

    const indexOfLastRecord = currentPage * recordsPerPage;
    const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
    
    const totalPagesUsers = Math.ceil(filteredRecordsUsers.length / recordsPerPage);
    const totalPagesPermissions = Math.ceil(filteredRecordsPermissions.length / recordsPerPage);
    const totalPagesStatus = Math.ceil(filteredRecordsStatus.length / recordsPerPage);

    const currentRecordsUsers = filteredRecordsUsers.slice(indexOfFirstRecord, indexOfLastRecord);
    const currentRecordsPermissions = filteredRecordsPermissions.slice(indexOfFirstRecord, indexOfLastRecord);
    const currentRecordsStatus = filteredRecordsStatus.slice(indexOfFirstRecord, indexOfLastRecord);

    const handleRowClick = (user) => {
        setIsSelectedRow((prevSelected) => (prevSelected === user ? null : user));
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