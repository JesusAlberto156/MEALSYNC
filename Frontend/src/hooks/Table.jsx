//____________IMPORT/EXPORT____________
// Hooks de React
import { useState,useContext,useEffect } from "react";
// Contextos
import { UsersContext,PermissionsContext,StatusContext } from "../contexts/UsersProvider";
import { SuppliesContext } from "../contexts/WarehouseProvider";
import { SelectedRowContext,SearchTermContext } from "../contexts/VariablesProvider";
//____________IMPORT/EXPORT____________

// Hook para realizar las acciones de la tabla de usuarios
export const TableActionsUsers = () => {
    // Constantes con el valor de los contextos 
    const [isUsers] = useContext(UsersContext);
    const [isSelectedRow,setIsSelectedRow] = useContext(SelectedRowContext);
    const [isSearchTerm] = useContext(SearchTermContext);
    // Paginación de la tabla
    const [currentPage, setCurrentPage] = useState(1);
    // Filtrado de datos
    const filteredRecordsUsers = isUsers.filter((data) =>
        Object.values(data).some((value) =>
          value.toString().toLowerCase().includes(isSearchTerm.toLowerCase())
        )
    );
    // Total de registros visibles de la tabla
    const recordsPerPage = 8;
    // Indices de los registros
    const indexOfLastRecord = currentPage * recordsPerPage;
    const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
    // Total de páginas 
    const totalPagesUsers = Math.ceil(filteredRecordsUsers.length / recordsPerPage);
    // Filtrado de datos por página
    const currentRecordsUsers = filteredRecordsUsers.slice(indexOfFirstRecord, indexOfLastRecord);
    // Función de selección de los renglones de la tabla
    const handleRowClick = (user) => {
        setIsSelectedRow((prevSelected) => {
            if (prevSelected === user) {
                // Retrasa el deseleccionado
                setTimeout(() => setIsSelectedRow(null), 700);
                return prevSelected; // mantener el estado actual mientras tanto
            } else {
                // Selección inmediata
                return user;
            }
        });
    };
    // Función de siguiente de registros de la tabla
    const nextPageUsers = () => {
        if (currentPage < totalPagesUsers) setCurrentPage(currentPage + 1);
    };
    // Función de retroceso de registros de la tabla
    const prevPage = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1);
    };
    // UseEffect para actualizar la paginación
    useEffect(() => {
        if(currentPage > totalPagesUsers){
            setCurrentPage(1);
        }
    },[isSearchTerm])
    // Retorno de la función del hook
    return { handleRowClick, prevPage, currentPage,
             nextPageUsers,
             currentRecordsUsers,
             totalPagesUsers}
}
// Hook para realizar las acciones de la tabla de permisos
export const TableActionsPermissions = () => {
    // Constantes con el valor de los contextos 
    const [isUsers] = useContext(UsersContext);
    const [isPermissions] = useContext(PermissionsContext);
    const [isSelectedRow,setIsSelectedRow] = useContext(SelectedRowContext);
    const [isSearchTerm] = useContext(SearchTermContext);
    // Paginación de la tabla
    const [currentPage, setCurrentPage] = useState(1);
    // Filtrado de datos
    const filteredRecordsPermissions = isPermissions.filter((data) => {
        const user = isUsers.find(user => user.idusuario === data.idusuario);
        return user && user.nombre.toLowerCase().includes(isSearchTerm.toLowerCase());
    });
    // Total de registros visibles de la tabla
    const recordsPerPage = 8;
    // Indices de los registros
    const indexOfLastRecord = currentPage * recordsPerPage;
    const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
    // Total de páginas
    const totalPagesPermissions = Math.ceil(filteredRecordsPermissions.length / recordsPerPage);
    // Filtrado de datos por página
    const currentRecordsPermissions = filteredRecordsPermissions.slice(indexOfFirstRecord, indexOfLastRecord);
    // Función de selección de los renglones de la tabla
    const handleRowClick = (permissions) => {
        setIsSelectedRow((prevSelected) => {
            if (prevSelected === permissions) {
                // Retrasa el deseleccionado
                setTimeout(() => setIsSelectedRow(null), 700);
                return prevSelected; // mantener el estado actual mientras tanto
            } else {
                // Selección inmediata
                return permissions;
            }
        });
    };
    // Función de siguiente de registros de la tabla
    const nextPagePermissions = () => {
        if (currentPage < totalPagesPermissions) setCurrentPage(currentPage + 1);
    };
    // Función de retroceso de registros de la tabla
    const prevPage = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1);
    };
    // UseEffect para actualizar la paginación
    useEffect(() => {
        if(currentPage > totalPagesPermissions){
            setCurrentPage(1);
        }
    },[isSearchTerm])
    // Retorno de la función del hook
    return { handleRowClick, prevPage, currentPage,
             nextPagePermissions,
             currentRecordsPermissions,
             totalPagesPermissions }
}
// Hook para realizar las acciones de la tabla de estatus
export const TableActionsStatus = () => {
    // Constantes con el valor de los contextos
    const [isUsers] = useContext(UsersContext);
    const [isStatusAll] = useContext(StatusContext);
    const [isSelectedRow,setIsSelectedRow] = useContext(SelectedRowContext);
    const [isSearchTerm] = useContext(SearchTermContext);
    // Paginación de la tabla
    const [currentPage, setCurrentPage] = useState(1);
    // Filtrado de datos
    const filteredRecordsStatus = isStatusAll.filter((data) => {
        const user = isUsers.find(user => user.idusuario === data.idusuario);
        return user && user.nombre.toLowerCase().includes(isSearchTerm.toLowerCase());
    });
    // Total de registros visibles de la tabla
    const recordsPerPage = 8;
    // Indices de los registros
    const indexOfLastRecord = currentPage * recordsPerPage;
    const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
    // Total de páginas
    const totalPagesStatus = Math.ceil(filteredRecordsStatus.length / recordsPerPage);
    // Filtrado de datos por página
    const currentRecordsStatus = filteredRecordsStatus.slice(indexOfFirstRecord, indexOfLastRecord);
    // Función de selección de los renglones de la tabla
    const handleRowClick = (status) => {
        setIsSelectedRow((prevSelected) => {
            if (prevSelected === status) {
                // Retrasa el deseleccionado
                setTimeout(() => setIsSelectedRow(null), 700);
                return prevSelected; // mantener el estado actual mientras tanto
            } else {
                // Selección inmediata
                return status;
            }
        });
    };
    // Función de siguiente de registros de la tabla
    const nextPageStatus = () => {
        if (currentPage < totalPagesStatus) setCurrentPage(currentPage + 1);
    };
    // Función de retroceso de registros de la tabla
    const prevPage = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1);
    };
    // UseEffect para actualizar la paginación
    useEffect(() => {
        if(currentPage > totalPagesStatus){
            setCurrentPage(1);
        }
    },[isSearchTerm])
    // Retorno de la función del hook
    return { handleRowClick, prevPage, currentPage,
             nextPageStatus,
             currentRecordsStatus,
             totalPagesStatus}
}
// Hook para realizar las acciones de la tabla de estatus
export const TableActionsSupplies = () => {
    // Constantes con el valor de los contextos
    const [isUsers] = useContext(UsersContext);
    const [isSupplies,setIsSupplies] = useContext(SuppliesContext);
    const [isStatusAll] = useContext(StatusContext);
    const [isSelectedRow,setIsSelectedRow] = useContext(SelectedRowContext);
    const [isSearchTerm] = useContext(SearchTermContext);
    // Paginación de la tabla
    const [currentPage, setCurrentPage] = useState(1);
    // Filtrado de datos
    const filteredRecordsStatus = isSupplies.filter((data) => {
        const supplies = isSupplies.find(supply => supply.idinsumo === data.idinsumo);
        return supplies && supplies.nombre.toLowerCase().includes(isSearchTerm.toLowerCase());
    });
    // Total de registros visibles de la tabla
    const recordsPerPage = 8;
    // Indices de los registros
    const indexOfLastRecord = currentPage * recordsPerPage;
    const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
    // Total de páginas
    const totalPagesStatus = Math.ceil(filteredRecordsStatus.length / recordsPerPage);
    // Filtrado de datos por página
    const currentRecordsStatus = filteredRecordsStatus.slice(indexOfFirstRecord, indexOfLastRecord);
    // Función de selección de los renglones de la tabla
    const handleRowClick = (status) => {
        setIsSelectedRow((prevSelected) => {
            if (prevSelected === status) {
                // Retrasa el deseleccionado
                setTimeout(() => setIsSelectedRow(null), 700);
                return prevSelected; // mantener el estado actual mientras tanto
            } else {
                // Selección inmediata
                return status;
            }
        });
    };
    // Función de siguiente de registros de la tabla
    const nextPageStatus = () => {
        if (currentPage < totalPagesStatus) setCurrentPage(currentPage + 1);
    };
    // Función de retroceso de registros de la tabla
    const prevPage = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1);
    };
    // UseEffect para actualizar la paginación
    useEffect(() => {
        if(currentPage > totalPagesStatus){
            setCurrentPage(1);
        }
    },[isSearchTerm])
    // Retorno de la función del hook
    return { handleRowClick, prevPage, currentPage,
             nextPageStatus,
             currentRecordsStatus,
             totalPagesStatus}
}